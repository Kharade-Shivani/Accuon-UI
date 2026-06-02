import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronRight, Sparkles, Users, Award, Star, Shield, Clock } from 'lucide-react';
import httpClient from '../Api/axios';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Get header height dynamically for responsive padding to avoid overlap
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__client');
        if (response.data.status) {
          setClients(response.data.data);
        } else {
          setError('Failed to fetch clients data');
        }
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Unable to load clients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic padding based on header height - prevents overlapping with fixed header */}
      <div style={{ paddingTop: `${headerHeight}px` }}>
        
        {/* Banner Section - with fixed height 400px, overlay, and centered text */}
        <div className="relative w-full h-[400px] overflow-hidden">
          {/* Background Image */}
          <img 
            src="assets/clientbanner.png" 
            alt="Our Clients Banner" 
            className="w-full h-full object-cover"
            
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/80"></div>
          {/* Centered Title Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Our Clients
            </h1>
          </div>
        </div>

        {/* Clients Grid Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Trusted by Industry <span className="text-red-600">Leaders</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3 md:mt-4">
                We are proud to partner with some of the most respected organizations across various sectors
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-spin border-t-red-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12 md:py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Clients Grid - Display from API */}
            {!loading && !error && clients.length > 0 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                  {clients.map((client, index) => (
                    <div
                      key={client._id}
                      className="group bg-gray-50 hover:bg-white rounded-xl p-4 md:p-6 text-center transition-all duration-500 hover:shadow-xl border border-gray-100 hover:border-red-200 transform hover:-translate-y-2 animate-fadeInUp"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Client Logo */}
                      <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-3 md:mb-4 flex items-center justify-center bg-white rounded-lg p-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                        <img
                          src={client.image}
                          alt={client.title}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Fallback icon if logo doesn't load */}
                        <div className="w-full h-full bg-gradient-to-br from-red-50 to-blue-50 rounded-lg items-center justify-center hidden">
                          <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-red-600" />
                        </div>
                      </div>
                      
                      {/* Client Name */}
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base lg:text-lg mb-1 group-hover:text-red-600 transition-colors duration-300">
                        {client.title}
                      </h3>
                      
                      {/* Decorative line on hover */}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 mx-auto transition-all duration-300 group-hover:w-8"></div>
                    </div>
                  ))}
                </div>

               
              </>
            )}

            {/* No Clients Message */}
            {!loading && !error && clients.length === 0 && (
              <div className="text-center py-12 md:py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No clients data available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonial / Trust Section - Optional but adds value */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-red-50 px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                <span className="text-xs md:text-sm font-semibold text-red-600">Why Choose Us</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                What Makes <span className="text-red-600">Clients</span> Trust Us
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp">
                <div className="inline-flex p-3 bg-red-50 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quality First</h3>
                <p className="text-sm text-gray-600">ISO 9001:2015 certified with uncompromising quality standards</p>
              </div>
              
              <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp animation-delay-100">
                <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">On-Time Delivery</h3>
                <p className="text-sm text-gray-600">Committed to delivering projects within agreed timelines</p>
              </div>
              
              <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp animation-delay-200">
                <div className="inline-flex p-3 bg-red-50 rounded-full mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Focus</h3>
                <p className="text-sm text-gray-600">Client-centric approach with tailored solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Matching About page theme */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
              Ready to Partner with Excellence?
            </h2>
            <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-4">
              Join our growing list of satisfied clients. Let's discuss how Accuon can help you achieve your industrial engineering and automation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 text-sm md:text-base"
              >
                Contact Us Today
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </a>
             
            </div>
          </div>
        </section>
      </div>

      {/* Add custom animation keyframes */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          opacity: 0;
          animation: scaleIn 0.4s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default Clients;