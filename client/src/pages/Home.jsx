import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BuildingIcon, WaterIcon, BridgeIcon, RoadIcon, DocumentIcon, ChartIcon, ProjectIcon } from '../components/Icons'
import Testimonials from '../components/Testimonials'
import Statistics from '../components/Statistics'
import ProjectImage from '../components/ProjectImage'

const Home = () => {
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])

  const iconMap = {
    building: BuildingIcon,
    water: WaterIcon,
    bridge: BridgeIcon,
    road: RoadIcon,
    document: DocumentIcon,
    chart: ChartIcon
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, servicesRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/services')
        ])
        setProjects(projectsRes.data.slice(0, 6))
        setServices(servicesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="container-custom section-padding relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <p className="text-primary-100 text-sm font-semibold">Premier Engineering Solutions</p>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Building Tomorrow's
              <span className="block text-primary-300">Infrastructure Today</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Nexus Engineering Partners delivers innovative engineering solutions that shape the future of infrastructure. With cutting-edge technology and proven expertise, we transform visions into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="btn-primary bg-white text-primary-700 hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all">
                Explore Our Services
              </Link>
              <Link to="/projects" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-primary-700 shadow-xl transform hover:scale-105 transition-all">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive engineering consulting services designed to meet the most demanding project requirements with precision and excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || BuildingIcon
              return (
                <div
                  key={service.id}
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-300 transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Link
                    to="/services"
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center group-hover:gap-2 gap-1"
                  >
                    Learn more
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose Nexus Engineering Partners?</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We combine decades of engineering excellence with innovative solutions to deliver projects that exceed expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Our multidisciplinary team of certified engineers brings together decades of combined experience across all engineering disciplines.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest international standards, ensuring every project meets rigorous quality benchmarks and regulatory compliance.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Timely Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Our proven project management methodologies ensure on-time delivery without compromising quality or safety standards.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-br from-primary-600 to-primary-800 text-white px-12 py-8 rounded-2xl shadow-2xl">
              <p className="text-6xl font-bold mb-2">25+</p>
              <p className="text-2xl font-semibold">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover our portfolio of successful engineering projects that showcase innovation, quality, and excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="h-64 relative overflow-hidden">
                  <ProjectImage project={project} className="h-full w-full" />
                  {project.category && (
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary-700 px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                      {project.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    <Link to={`/projects/${project.id}`} className="hover:text-primary-600 transition-colors">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.shortDescription || project.description}
                  </p>
                  {project.location && (
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {project.year}
                    </div>
                  )}
                  <Link
                    to={`/projects/${project.id}`}
                    className="block mt-4 text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  )
}

export default Home
