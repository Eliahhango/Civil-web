import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Admin = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    location: '',
    year: '',
    image: '',
    images: ''
  })
  const [editingProject, setEditingProject] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  const categories = ['Commercial', 'Transportation', 'Water Infrastructure', 'Bridge Engineering', 'Industrial', 'Infrastructure']

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchData()
    }
  }, [user, activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'projects') {
        const response = await axios.get('/api/projects')
        setProjects(response.data)
      } else if (activeTab === 'contacts') {
        const response = await axios.get('/api/contacts')
        setContacts(response.data)
      } else if (activeTab === 'users') {
        const response = await axios.get('/api/users')
        setUsers(response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      showMessage('error', 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    try {
      // Process images - convert comma-separated string to array
      const formData = { ...projectForm }
      if (formData.images) {
        formData.images = formData.images
          .split(',')
          .map(url => url.trim())
          .filter(url => url.length > 0)
      }
      // If no images array but has main image, use that as first image
      if (!formData.images || formData.images.length === 0) {
        if (formData.image) {
          formData.images = [formData.image]
        }
      }
      // Ensure main image is set
      if (!formData.image && formData.images && formData.images.length > 0) {
        formData.image = formData.images[0]
      }

      if (editingProject) {
        await axios.put(`/api/projects/${editingProject.id}`, formData)
        showMessage('success', 'Project updated successfully!')
      } else {
        await axios.post('/api/projects', formData)
        showMessage('success', 'Project added successfully!')
      }
      setProjectForm({ title: '', description: '', shortDescription: '', category: '', location: '', year: '', image: '', images: '' })
      setEditingProject(null)
      fetchData()
    } catch (error) {
      console.error('Error saving project:', error)
      showMessage('error', 'Failed to save project')
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      await axios.delete(`/api/projects/${id}`)
      showMessage('success', 'Project deleted successfully!')
      fetchData()
    } catch (error) {
      console.error('Error deleting project:', error)
      showMessage('error', 'Failed to delete project')
    }
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      shortDescription: project.shortDescription || '',
      category: project.category || '',
      location: project.location || '',
      year: project.year || '',
      image: project.image || '',
      images: project.images ? (Array.isArray(project.images) ? project.images.join(', ') : project.images) : ''
    })
  }

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return
    try {
      await axios.delete(`/api/contacts/${id}`)
      showMessage('success', 'Contact message deleted!')
      fetchData()
    } catch (error) {
      console.error('Error deleting contact:', error)
      showMessage('error', 'Failed to delete contact')
    }
  }

  const handleMarkContactRead = async (id, read) => {
    try {
      await axios.put(`/api/contacts/${id}`, { read })
      fetchData()
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  if (authLoading) {
    return (
      <div className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="container-custom py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage projects, customers, and contact submissions</p>
        </div>
      </section>

      {/* Message Alert */}
      {message.text && (
        <div className="container-custom mt-4">
          <div className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        </div>
      )}

      {/* Tabs */}
      <section className="bg-white border-b">
        <div className="container-custom">
          <div className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'contacts'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact Messages ({contacts.filter(c => !c.read).length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'users'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Customers
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short Description
                      </label>
                      <textarea
                        rows="2"
                        value={projectForm.shortDescription}
                        onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Brief project summary (shown on detail page)"
                      />
                      <p className="text-xs text-gray-500 mt-1">Brief summary for project detail page</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description *
                      </label>
                      <textarea
                        required
                        rows="4"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Detailed project description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Image URL
                      </label>
                      <input
                        type="url"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://images.unsplash.com/..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Primary image for project card</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Images (Gallery)
                      </label>
                      <textarea
                        rows="3"
                        value={projectForm.images}
                        onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://image1.com, https://image2.com, https://image3.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">Comma-separated image URLs for project detail gallery</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 2024"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button type="submit" className="btn-primary flex-1">
                        {editingProject ? 'Update' : 'Add'} Project
                      </button>
                      {editingProject && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(null)
                            setProjectForm({ title: '', description: '', shortDescription: '', category: '', location: '', year: '', image: '', images: '' })
                          }}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Projects List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">All Projects ({projects.length})</h2>
                    <button
                      onClick={fetchData}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Refresh
                    </button>
                  </div>
                  {loading ? (
                    <div className="p-6 text-center text-gray-600">Loading...</div>
                  ) : (
                    <div className="divide-y max-h-[800px] overflow-y-auto">
                      {projects.map((project) => (
                        <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                              <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                                {project.shortDescription || project.description}
                              </p>
                              {project.images && Array.isArray(project.images) && (
                                <p className="text-xs text-gray-500 mt-1 flex items-center">
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {project.images.length} image{project.images.length !== 1 ? 's' : ''}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {project.category && (
                                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                    {project.category}
                                  </span>
                                )}
                                {project.location && (
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                    📍 {project.location}
                                  </span>
                                )}
                                {project.year && (
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                    📅 {project.year}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2 flex-shrink-0">
                              <button
                                onClick={() => handleEditProject(project)}
                                className="text-primary-600 hover:text-primary-700 px-3 py-1 rounded text-sm font-medium"
                                title="Edit project"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 hover:text-red-700 px-3 py-1 rounded text-sm font-medium"
                                title="Delete project"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {projects.length === 0 && (
                        <div className="p-6 text-center text-gray-600">No projects yet. Add your first project!</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Contact Form Submissions ({contacts.length})
                </h2>
                <button
                  onClick={fetchData}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Refresh
                </button>
              </div>
              {loading ? (
                <div className="p-6 text-center text-gray-600">Loading...</div>
              ) : (
                <div className="divide-y max-h-[800px] overflow-y-auto">
                  {contacts.map((contact) => (
                    <div 
                      key={contact.id} 
                      className={`p-6 hover:bg-gray-50 transition-colors ${!contact.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                            {!contact.read && (
                              <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">New</span>
                            )}
                          </div>
                          <p className="text-gray-600">
                            <a href={`mailto:${contact.email}`} className="hover:text-primary-600">
                              📧 {contact.email}
                            </a>
                          </p>
                          {contact.phone && (
                            <p className="text-gray-600">
                              <a href={`tel:${contact.phone}`} className="hover:text-primary-600">
                                📞 {contact.phone}
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-sm text-gray-500">
                            {new Date(contact.date).toLocaleDateString()} {new Date(contact.date).toLocaleTimeString()}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMarkContactRead(contact.id, !contact.read)}
                              className={`text-xs px-3 py-1 rounded ${
                                contact.read 
                                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                              }`}
                            >
                              {contact.read ? 'Mark Unread' : 'Mark Read'}
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="text-red-600 hover:text-red-700 text-xs px-3 py-1 rounded bg-red-50 hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mt-3">
                        <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="p-6 text-center text-gray-600">No contact messages yet</div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Registered Customers ({users.filter(u => u.role === 'client').length})
                </h2>
                <button
                  onClick={fetchData}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Refresh
                </button>
              </div>
              {loading ? (
                <div className="p-6 text-center text-gray-600">Loading...</div>
              ) : (
                <div className="divide-y max-h-[800px] overflow-y-auto">
                  {users.filter(u => u.role === 'client').map((user) => (
                    <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{user.username || 'User'}</h3>
                          <p className="text-gray-600">
                            <a href={`mailto:${user.email}`} className="hover:text-primary-600">
                              📧 {user.email}
                            </a>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">Customer ID: {user.id}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {users.filter(u => u.role === 'client').length === 0 && (
                    <div className="p-6 text-center text-gray-600">No registered customers yet</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Admin
