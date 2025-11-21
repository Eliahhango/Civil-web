import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ProjectIcon } from '../components/Icons'
import ProjectImage from '../components/ProjectImage'
import SearchBar from '../components/SearchBar'
import LoadingSkeleton from '../components/LoadingSkeleton'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchParams] = useSearchParams()

  const categories = ['All', 'Commercial', 'Transportation', 'Water Infrastructure', 'Bridge Engineering', 'Industrial', 'Infrastructure']

  // Category images mapping - each category has a representative image
  const categoryImages = {
    'All': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    'Commercial': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    'Transportation': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'Water Infrastructure': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'Bridge Engineering': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    'Industrial': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    'Infrastructure': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
  }

  const filterProjects = (projectsList, search = searchTerm, category = selectedCategory) => {
    let filtered = projectsList

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category)
    }

    // Filter by search term
    if (search) {
      const lowerSearch = search.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch) ||
        (p.location && p.location.toLowerCase().includes(lowerSearch)) ||
        (p.category && p.category.toLowerCase().includes(lowerSearch))
      )
    }

    setFilteredProjects(filtered)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterProjects(projects, term, selectedCategory)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    filterProjects(projects, searchTerm, category)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects')
        setProjects(response.data)
        
        // Check for search param
        const search = searchParams.get('search')
        if (search) {
          setSearchTerm(search)
          filterProjects(response.data, search, selectedCategory)
        } else {
          setFilteredProjects(response.data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [searchParams])

  if (loading) {
    return (
      <div>
        <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white section-padding overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container-custom relative z-10">
            <div className="h-12 bg-white/20 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded w-96 animate-pulse"></div>
          </div>
        </section>
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LoadingSkeleton key={i} type="project" />
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Showcasing our portfolio of successful engineering projects that demonstrate innovation, quality, and excellence.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative overflow-hidden rounded-xl font-semibold transition-all duration-300 group ${
                  selectedCategory === category
                    ? 'ring-4 ring-primary-500 ring-offset-2 shadow-2xl transform scale-105'
                    : 'hover:shadow-xl hover:scale-[1.02]'
                }`}
              >
                <div className="relative w-40 h-32 md:w-48 md:h-36">
                  {/* Category Image */}
                  <img
                    src={categoryImages[category]}
                    alt={category}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
                    }}
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-600/90'
                      : 'bg-gray-900/60 group-hover:bg-gray-900/70'
                  }`} />
                  {/* Category Name */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-white font-bold text-sm md:text-base px-4 text-center ${
                      selectedCategory === category ? 'drop-shadow-lg' : ''
                    }`}>
                      {category}
                    </span>
                  </div>
                  {/* Selected Indicator */}
                  {selectedCategory === category && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Results count */}
          {(searchTerm || selectedCategory !== 'All') && (
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <ProjectIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'No projects found matching your criteria.' 
                  : 'No projects available at the moment.'}
              </p>
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                    setFilteredProjects(projects)
                  }}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="h-72 relative overflow-hidden">
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
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      {project.location && (
                        <div className="flex items-center text-gray-500 text-sm">
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
                          Completed {project.year}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Have a Project in Mind?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your engineering vision to reality with innovative solutions and proven expertise.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default Projects
