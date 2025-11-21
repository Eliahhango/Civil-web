import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import ImageGallery from '../components/ImageGallery'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`)
        setProject(response.data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  // Get project-specific images
  const getProjectImages = () => {
    if (!project) return []
    
    // If project has specific images array, use those
    if (project.images && Array.isArray(project.images) && project.images.length > 0) {
      return project.images
    }
    
    // Fallback to main image if available
    if (project.image) {
      return [project.image]
    }
    
    // Last resort: return empty array (will show placeholder)
    return []
  }

  const projectImages = getProjectImages()

  if (loading) {
    return (
      <div className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-xl text-gray-600 mt-4">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="section-padding bg-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  // Get short description or use first part of full description
  const shortDescription = project.shortDescription || project.description?.split('.')[0] + '.' || project.description

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <Link to="/projects" className="inline-flex items-center text-primary-200 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{project.title}</h1>
          {project.category && (
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {project.category}
            </span>
          )}
          {shortDescription && (
            <p className="text-xl text-primary-100 max-w-3xl mt-4 leading-relaxed">
              {shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* Image Gallery */}
      {projectImages.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <ImageGallery images={projectImages} title={project.title} />
          </div>
        </section>
      )}

      {/* Project Details */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{project.description}</p>
                
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">State-of-the-art engineering solutions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Sustainable and environmentally responsible design</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Completed on time and within budget</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Exceeded client expectations and quality standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Information</h3>
                <div className="space-y-4">
                  {project.location && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <p className="text-gray-900 font-semibold flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {project.location}
                      </p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Year Completed</p>
                      <p className="text-gray-900 font-semibold flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {project.year}
                      </p>
                    </div>
                  )}
                  {project.category && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Category</p>
                      <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Interested in Similar Projects?</h3>
                <p className="mb-6 text-primary-100">Let's discuss how we can help bring your vision to life.</p>
                <Link to="/contact" className="btn-primary bg-white text-primary-700 hover:bg-gray-100 w-full text-center block">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
