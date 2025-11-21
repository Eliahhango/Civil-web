import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Nexus Engineering Partners</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Services
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Projects
            </Link>
            <Link to="/team" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Team
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-primary-600 hover:text-primary-700 font-medium">
                    Admin
                  </Link>
                )}
                <span className="text-gray-700">Welcome, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-4">
                Client Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600">Home</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-primary-600">About</Link>
            <Link to="/services" className="block py-2 text-gray-700 hover:text-primary-600">Services</Link>
            <Link to="/projects" className="block py-2 text-gray-700 hover:text-primary-600">Projects</Link>
            <Link to="/team" className="block py-2 text-gray-700 hover:text-primary-600">Team</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-primary-600">Contact</Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block py-2 text-primary-600">Admin</Link>
                )}
                <span className="block py-2 text-gray-700">Welcome, {user.email}</span>
                <button onClick={handleLogout} className="btn-secondary w-full text-sm py-2">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary w-full text-sm py-2 block text-center">
                Client Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

