import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Briefcase, Award, Target, BarChart, Check } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-20 md:py-28"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl text-center mx-auto"
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">About AWRAD</h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              Learn about our organization, experts, services, and commitment to research and development in Palestine and the Arab region.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main About Content */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section bg-white py-16"
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-awrad-blue">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Arab World for Research and Development (AWRAD) is a pioneering research, consulting and development firm. Based in Palestine, AWRAD is one of the Arab region's leading firms providing our partners and clients with a full range of consulting and technical services for sustainable development and state building.
            </p>
            <p className="text-gray-700 mb-6">
              We have a diverse and dynamic team including individuals with expertise in research, economic and institutional development, program and performance management. Our strength is in providing flexible, responsive and integrated services – delivering the best solutions to meet our clients and partners' needs.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Experts Widget */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="section bg-gray-50 py-16"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-md"
            >
              <Users className="text-awrad-blue h-10 w-10" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-awrad-blue">Our Experts</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AWRAD works with leading international, regional and national experts across various fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* International Experts */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Globe className="text-awrad-blue mr-3" /> International Experts
              </h3>
              <ul className="space-y-3">
                <li>Dominique Lallelment, France</li>
                <li>Nilanj Desai, USA</li>
                <li>Owen Kirby, USA</li>
                <li>Peter Laban, The Netherlands</li>
                <li>Collin Irwin, Great Britain</li>
                <li>David Williams, USA</li>
              </ul>
            </motion.div>

            {/* Regional Experts */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Globe className="text-awrad-blue mr-3" /> Regional Experts
              </h3>
              <ul className="space-y-3">
                <li>Abdallah Hadeed, Libya</li>
                <li>Mohammad El Dhahiri, Yemen</li>
                <li>Mohammad Ikbal El Loumi, Tunisia</li>
                <li>Mounira Khalil, Lebanon</li>
                <li>Rula El Sa'di, Jordan & Egypt</li>
                <li>Sana Hussein, Lebanon</li>
                <li>Dr. Walid Salhi, Libya & Maghreb, Turkey</li>
              </ul>
            </motion.div>

            {/* National Experts */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Users className="text-awrad-blue mr-3" /> National Experts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">West Bank</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Dr. Abdel Rahman Tamimi</li>
                    <li>Amal Daraghmeh Al Masri</li>
                    <li>Dr. Basim Zubeidi</li>
                    <li>Laila Atshan</li>
                    <li>Nibal Thawabteh</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Gaza</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Abdel Rahman Migdad</li>
                    <li>Dr. Ali Abu Zeid</li>
                    <li>Ghassan Abu Hatab</li>
                    <li>Dr. Mohammad el Eileh</li>
                    <li>Rami El Wihidi</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Overview Widget */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section bg-white py-16"
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center mb-12"
            >
              <div className="w-14 h-14 bg-awrad-lightblue bg-opacity-20 rounded-full flex items-center justify-center mr-6">
                <Target className="text-awrad-blue h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold text-awrad-blue">Mission & Vision</h2>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gray-50 p-8 rounded-xl mb-12 shadow-inner"
            >
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Inspired to promote democracy, effective institutions and sustainable development in the Arab region, we devote our resources to the development of a scientific and professional research culture that informs progressive and forward-looking social development and state building.
              </p>
              <p className="text-gray-700">
                We are a leading independent research and development firm creating knowledge that shapes thinking around public and social policies, strategies and plans which partners and clients value and the community trusts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-awrad-lightblue bg-opacity-10 p-8 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-bold mb-6 text-awrad-blue">Core Principles</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="text-awrad-blue h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Putting clients first with practical solutions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-awrad-blue h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Technical capability and excellence in quality</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-awrad-blue h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Commitment to staff development</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-awrad-lightblue bg-opacity-10 p-8 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-bold mb-6 text-awrad-blue">Technical Areas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-sm">Social & Economic Development</span>
                  <span className="text-sm">Politics & Elections</span>
                  <span className="text-sm">Public Sector Reform</span>
                  <span className="text-sm">Human Rights</span>
                  <span className="text-sm">Education</span>
                  <span className="text-sm">Health</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Widget */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section bg-gray-50 py-16"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-md"
            >
              <Briefcase className="text-awrad-blue h-10 w-10" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-awrad-blue">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AWRAD offers a comprehensive range of research and consulting services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <BarChart className="text-awrad-blue h-10 w-10 mb-6" />
              <h3 className="text-xl font-bold mb-6 text-awrad-blue">Research Services</h3>
              <ul className="space-y-3">
                <li>Advanced Statistical Analysis</li>
                <li>Analytics</li>
                <li>Public Opinion Polling</li>
                <li>Social, Economic & Political Research</li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Award className="text-awrad-blue h-10 w-10 mb-6" />
              <h3 className="text-xl font-bold mb-6 text-awrad-blue">Development Services</h3>
              <ul className="space-y-3">
                <li>Capacity Development & Training</li>
                <li>Policy Research & Development</li>
                <li>Public Sector Reform</li>
                <li>Project & Program Design</li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Briefcase className="text-awrad-blue h-10 w-10 mb-6" />
              <h3 className="text-xl font-bold mb-6 text-awrad-blue">Consulting Services</h3>
              <ul className="space-y-3">
                <li>Project Management</li>
                <li>Performance Monitoring & Evaluation</li>
                <li>Data Collection & Management</li>
                <li>Technical Consulting</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
