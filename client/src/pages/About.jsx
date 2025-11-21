const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Discover the story behind Nexus Engineering Partners and our unwavering commitment to engineering excellence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Nexus Engineering Partners was founded with a vision to revolutionize engineering consulting through innovation, expertise, and unwavering commitment to excellence. Since our establishment, we have been at the forefront of delivering cutting-edge engineering solutions that shape the future of infrastructure.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                With over 25 years of combined experience, our team has successfully completed hundreds of projects across diverse sectors including commercial construction, transportation infrastructure, water systems, and sustainable development. Our commitment to quality, innovation, and client satisfaction has established us as a trusted partner for both public and private sector clients worldwide.
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-16">Our Mission</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                To deliver world-class engineering consulting services that drive sustainable development and infrastructure excellence. We are committed to providing innovative solutions that meet the highest standards of quality, safety, and environmental responsibility while creating lasting value for our clients and communities.
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-16">Our Vision</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                To be recognized as the premier engineering consulting firm globally, known for our technical excellence, innovative methodologies, and transformative impact on infrastructure development. We envision a future where engineering excellence drives sustainable progress and improves lives.
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-16">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Excellence</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We pursue excellence in every project, ensuring the highest quality standards in all our deliverables and maintaining rigorous quality assurance processes.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Integrity</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We conduct our business with the utmost integrity, maintaining transparency, ethical practices, and accountability in all our professional relationships.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We embrace innovative solutions and cutting-edge technology to solve complex engineering challenges, continuously advancing our methodologies and capabilities.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Client Focus</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our clients are at the heart of everything we do. We are committed to understanding their unique needs and exceeding their expectations through exceptional service.
                  </p>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-16">Certifications & Standards</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Nexus Engineering Partners maintains all necessary professional certifications and licenses. We comply with international engineering standards including ISO 9001 quality management systems, and adhere to local and international building codes, safety regulations, and environmental standards. Our team members hold professional engineering licenses and continuously engage in professional development to stay current with industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform">
              <p className="text-6xl font-bold mb-2">25+</p>
              <p className="text-xl font-semibold">Years of Excellence</p>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <p className="text-6xl font-bold mb-2">200+</p>
              <p className="text-xl font-semibold">Projects Completed</p>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <p className="text-6xl font-bold mb-2">60+</p>
              <p className="text-xl font-semibold">Expert Engineers</p>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <p className="text-6xl font-bold mb-2">24/7</p>
              <p className="text-xl font-semibold">Client Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
