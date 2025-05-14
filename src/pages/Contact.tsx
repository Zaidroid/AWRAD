
import React from 'react';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Get in touch with our team for research collaborations, media inquiries, or general questions
              about our work and publications.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information and Form */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="mb-6">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                We welcome inquiries from organizations, researchers, policymakers, and
                media interested in our work or potential collaborations.
              </p>
              
              <div className="space-y-6 mb-8">
                {/* Location Image */}
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/location.jpeg" 
                    alt="AWRAD Center Location" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-awrad-lightgray rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-awrad-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Our Location</h4>
                    <address className="text-gray-600 not-italic">
                      Arab World for Research & Development<br />
                      Al-Masayef, Kamal Nasser St., Building #43<br />
                      P.O. Box: 2238<br />
                      Ramallah - Palestine
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-awrad-lightgray rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-awrad-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Phone Contact</h4>
                    <p className="text-gray-600">Tele-fax: 00972 2 2950957/8</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-awrad-lightgray rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-awrad-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className="text-gray-600">E-mail: awrad@awrad.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-awrad-lightgray rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5 text-awrad-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Working Hours</h4>
                    <p className="text-gray-600">Monday - Thursday: 8:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Friday: 8:00 AM - 12:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="mb-6">Send Us a Message</h2>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Contact;
