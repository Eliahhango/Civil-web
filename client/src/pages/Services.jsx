import { useEffect, useState } from 'react'
import axios from 'axios'
import { BuildingIcon, WaterIcon, BridgeIcon, RoadIcon, DocumentIcon, ChartIcon } from '../components/Icons'

const Services = () => {
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
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services')
        setServices(response.data)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchServices()
  }, [])

  const serviceDetails = {
    1: {
      features: [
        'Advanced structural analysis and design',
        'Seismic and wind load calculations',
        'Reinforced concrete and steel structures',
        'Building information modeling (BIM)',
        'Code compliance and regulatory approval',
        'Retrofit and rehabilitation services',
        'Value engineering solutions',
        'Construction support and supervision'
      ]
    },
    2: {
      features: [
        'Water supply system design and optimization',
        'Wastewater treatment plant engineering',
        'Water distribution network analysis',
        'Pumping station design and automation',
        'Water quality monitoring systems',
        'Sustainable water resource management',
        'Infrastructure master planning',
        'Maintenance and operations consulting'
      ]
    },
    3: {
      features: [
        'Bridge structural design and analysis',
        'Load rating and capacity assessment',
        'Material specification and selection',
        'Construction engineering and inspection',
        'Bridge health monitoring systems',
        'Rehabilitation and strengthening',
        'Seismic retrofit design',
        'Long-term maintenance planning'
      ]
    },
    4: {
      features: [
        'Highway and roadway geometric design',
        'Traffic impact analysis and modeling',
        'Drainage and stormwater management',
        'Pavement design and evaluation',
        'Road safety audits and improvements',
        'Intelligent transportation systems',
        'Construction management',
        'Asset management and maintenance'
      ]
    },
    5: {
      features: [
        'Comprehensive tender document preparation',
        'Technical specification development',
        'Bid evaluation and assessment',
        'Contract administration support',
        'Procurement strategy development',
        'Vendor qualification and selection',
        'Compliance verification and auditing',
        'Documentation and record management'
      ]
    },
    6: {
      features: [
        'Integrated project management services',
        'Financial planning and cost control',
        'Quality assurance and quality control',
        'Construction supervision and monitoring',
        'Risk assessment and mitigation',
        'Schedule development and tracking',
        'Stakeholder coordination',
        'Project closeout and handover'
      ]
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Comprehensive engineering consulting services designed to deliver exceptional results for your most challenging projects.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || BuildingIcon
              return (
                <div
                  key={service.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-primary-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-xl flex-shrink-0">
                      <IconComponent className="w-10 h-10 text-primary-700" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
                      <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                      {serviceDetails[service.id] && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Capabilities:</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {serviceDetails[service.id].features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our engineering expertise can bring your vision to life with innovative solutions and proven methodologies.
          </p>
          <a href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}

export default Services
