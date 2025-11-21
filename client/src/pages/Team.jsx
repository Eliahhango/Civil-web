import { PersonIcon } from '../components/Icons'

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. James Mitchell',
      position: 'Chief Executive Officer',
      expertise: 'Structural Engineering & Leadership',
      experience: '28+ years',
      bio: 'Ph.D. in Civil Engineering with extensive experience in large-scale infrastructure projects.'
    },
    {
      id: 2,
      name: 'Eng. Sarah Williams',
      position: 'Senior Project Director',
      expertise: 'Water Infrastructure & Environmental',
      experience: '22+ years',
      bio: 'Leading expert in water resource management and sustainable infrastructure development.'
    },
    {
      id: 3,
      name: 'Eng. Michael Chen',
      position: 'Principal Bridge Engineer',
      expertise: 'Bridge Engineering & Transportation',
      experience: '20+ years',
      bio: 'Specialized in complex bridge design, seismic analysis, and infrastructure rehabilitation.'
    },
    {
      id: 4,
      name: 'Eng. Aisha Hassan',
      position: 'Senior Civil Engineer',
      expertise: 'Project Management & Quality Control',
      experience: '18+ years',
      bio: 'Expert in project administration, construction supervision, and quality assurance systems.'
    },
    {
      id: 5,
      name: 'Eng. David Thompson',
      position: 'Procurement Specialist',
      expertise: 'Tender Management & Contracts',
      experience: '15+ years',
      bio: 'Specialized in procurement strategies, contract administration, and vendor management.'
    },
    {
      id: 6,
      name: 'Eng. Fatima Al-Mansouri',
      position: 'Quality Assurance Manager',
      expertise: 'Quality Control & Testing',
      experience: '12+ years',
      bio: 'Expert in quality management systems, material testing, and compliance verification.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Meet the accomplished professionals who drive innovation and excellence at Nexus Engineering Partners.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Expert Engineers & Consultants</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our multidisciplinary team brings together decades of combined experience, delivering exceptional engineering solutions across all project phases.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-primary-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
              >
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <PersonIcon className="w-20 h-20 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.position}</p>
                <p className="text-gray-700 mb-3 font-medium">{member.expertise}</p>
                <p className="text-sm text-gray-500 mb-4">{member.experience} experience</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">Why Our Team Stands Out</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Highly Qualified</h3>
                <p className="text-gray-700 leading-relaxed">
                  All our engineers hold advanced degrees and professional certifications, with continuous professional development to stay current with industry standards.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Experience</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our team has successfully delivered projects across multiple continents, bringing international best practices and innovative solutions.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  We work seamlessly with clients, contractors, and stakeholders, fostering partnerships that ensure project success and client satisfaction.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Innovation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our team stays at the forefront of engineering technology, continuously learning and adopting cutting-edge tools and methodologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Work With Our Expert Team</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Partner with us for your next engineering project and experience the difference that expertise, innovation, and dedication make.
          </p>
          <a href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}

export default Team
