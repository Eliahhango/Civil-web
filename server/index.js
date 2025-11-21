const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { firestoreHelpers } = require('./firebase');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data storage paths (kept for uploads directory)
const DATA_DIR = path.join(__dirname, 'data');

// Initialize Firebase and ensure default data exists
async function initializeFirebase() {
  try {
    await fs.mkdir(path.join(__dirname, 'uploads'), { recursive: true });
    
    // Check if admin user exists, if not create it
    const adminUser = await firestoreHelpers.getUserByEmail('admin@nexusengineering.co.tz');
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await firestoreHelpers.createUser({
        username: 'admin',
        email: 'admin@nexusengineering.co.tz',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created in Firebase');
    }
    
    // Check if projects exist, if not initialize with default projects
    const projects = await firestoreHelpers.getProjects();
    if (projects.length === 0) {
      // Load default projects from JSON file if it exists, otherwise use hardcoded
      let defaultProjects = [];
      try {
        const projectsData = await fs.readFile(path.join(__dirname, 'data', 'projects.json'), 'utf8');
        defaultProjects = JSON.parse(projectsData);
      } catch (error) {
        // If JSON file doesn't exist, use minimal default
        defaultProjects = [{
          id: 1,
          title: 'Central Business District Tower',
          description: 'Design and engineering of a 25-story commercial complex featuring sustainable building practices and modern structural systems.',
          shortDescription: 'A 25-story commercial complex with sustainable building practices.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
          images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop'],
          category: 'Commercial',
          location: 'Dar es Salaam',
          year: '2023'
        }];
      }
      
      // Add projects to Firebase
      for (const project of defaultProjects) {
        await firestoreHelpers.createProject(project);
      }
      console.log(`Initialized ${defaultProjects.length} projects in Firebase`);
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

// Old ensureDataDir function - kept for reference but not used
async function ensureDataDir() {
  try {
    await fs.mkdir(path.join(__dirname, 'uploads'), { recursive: true });
  } catch (error) {
    console.error('Error setting up directories:', error);
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await firestoreHelpers.getUserByEmail(email);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await firestoreHelpers.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await firestoreHelpers.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'client'
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Projects Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await firestoreHelpers.getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await firestoreHelpers.getProjectById(parseInt(req.params.id));
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    const newProject = await firestoreHelpers.createProject(req.body);
    res.json(newProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    const project = await firestoreHelpers.updateProject(parseInt(req.params.id), req.body);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    await firestoreHelpers.deleteProject(parseInt(req.params.id));
    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Contact Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const newContact = await firestoreHelpers.createContact({
      name,
      email,
      phone,
      message
    });

    // Send email notification (optional)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'support@nexusengineering.co.tz',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    const contacts = await firestoreHelpers.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    const contact = await firestoreHelpers.updateContact(req.params.id, req.body);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    await firestoreHelpers.deleteContact(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Users Routes (for customer management)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    const users = await firestoreHelpers.getUsers();
    // Don't send passwords
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Services Routes
app.get('/api/services', (req, res) => {
  const services = [
      {
        id: 1,
        title: 'Structural Design',
        description: 'Advanced structural engineering solutions for residential, commercial, industrial, and institutional buildings.',
        icon: 'building'
      },
      {
        id: 2,
        title: 'Water Infrastructure',
        description: 'Complete water supply systems, wastewater treatment, and sustainable water resource management.',
        icon: 'water'
      },
      {
        id: 3,
        title: 'Bridge Engineering',
        description: 'Comprehensive bridge design, analysis, inspection, and rehabilitation services.',
        icon: 'bridge'
      },
      {
        id: 4,
        title: 'Transportation Engineering',
        description: 'Highway design, traffic engineering, and comprehensive road infrastructure solutions.',
        icon: 'road'
      },
      {
        id: 5,
        title: 'Tender Management',
        description: 'Professional tender documentation, evaluation, and procurement management services.',
        icon: 'document'
      },
      {
        id: 6,
        title: 'Project Management',
        description: 'End-to-end project administration, quality control, and construction supervision.',
        icon: 'chart'
      }
  ];
  res.json(services);
});

// Start server
initializeFirebase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Firebase Firestore initialized and ready');
  });
}).catch((error) => {
  console.error('Failed to initialize Firebase:', error);
  console.log('Server will still start, but Firebase operations may fail.');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

