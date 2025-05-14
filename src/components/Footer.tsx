import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.footer 
      className="bg-awrad-blue text-white pt-12 pb-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px 0px' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {/* About Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-white mb-4">AWRAD</h4>
            <p className="text-sm text-gray-200 mb-4">
              The Arab World for Research and Development (AWRAD) is a leading research and consulting firm 
              focused on high-quality independent research and policy solutions for the Arab region.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-white hover:text-awrad-accent transition-colors" 
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-white hover:text-awrad-accent transition-colors" 
                aria-label="Twitter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-white hover:text-awrad-accent transition-colors" 
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <motion.li variants={itemVariants}><Link to="/" className="hover:text-awrad-accent transition-colors">Home</Link></motion.li>
              <motion.li variants={itemVariants}><Link to="/about" className="hover:text-awrad-accent transition-colors">About Us</Link></motion.li>
              <motion.li variants={itemVariants}><Link to="/research" className="hover:text-awrad-accent transition-colors">Research</Link></motion.li>
              <motion.li variants={itemVariants}><Link to="/publications" className="hover:text-awrad-accent transition-colors">Publications</Link></motion.li>
              <motion.li variants={itemVariants}><Link to="/team" className="hover:text-awrad-accent transition-colors">Our Team</Link></motion.li>
              <motion.li variants={itemVariants}><Link to="/contact" className="hover:text-awrad-accent transition-colors">Contact</Link></motion.li>
            </ul>
          </motion.div>
          
          {/* Research Areas */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-white mb-4">Research Areas</h4>
            <ul className="space-y-2 text-sm">
              <motion.li variants={itemVariants}><a href="/research#public-opinion" className="hover:text-awrad-accent transition-colors">Public Opinion</a></motion.li>
              <motion.li variants={itemVariants}><a href="/research#economic-development" className="hover:text-awrad-accent transition-colors">Economic Development</a></motion.li>
              <motion.li variants={itemVariants}><a href="/research#gender-studies" className="hover:text-awrad-accent transition-colors">Gender Studies</a></motion.li>
              <motion.li variants={itemVariants}><a href="/research#health" className="hover:text-awrad-accent transition-colors">Health Studies</a></motion.li>
              <motion.li variants={itemVariants}><a href="/research#social-development" className="hover:text-awrad-accent transition-colors">Social Development</a></motion.li>
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <motion.li variants={itemVariants} className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Ramallah, Palestine</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+972 (0) 2 XXX XXXX</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>info@awrad.org</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-600 text-center text-sm text-gray-300"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} AWRAD. All rights reserved.</p>
          <p className="mt-2">Quality Research Matters</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
