import React, { useState, useEffect, useCallback } from 'react';
import { 
  Image, 
  ChevronRight, 
  Eye,
  AlertCircle,
  X
} from 'lucide-react';
import httpClient from '../Api/axios';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Fetch gallery from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__gallery');
        if (response.data.status) {
          setGalleryItems(response.data.data);
        } else {
          setError('Failed to fetch gallery data');
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Unable to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  // Navigate to previous image - defined before openModal to avoid hoisting issues
  const prevImage = useCallback(() => {
    setSelectedImage(prevSelected => {
      if (!prevSelected || galleryItems.length === 0) return prevSelected;
      const currentIdx = galleryItems.findIndex(item => item._id === prevSelected._id);
      const newIndex = currentIdx === 0 ? galleryItems.length - 1 : currentIdx - 1;
      return galleryItems[newIndex];
    });
  }, [galleryItems]);

  // Navigate to next image
  const nextImage = useCallback(() => {
    setSelectedImage(prevSelected => {
      if (!prevSelected || galleryItems.length === 0) return prevSelected;
      const currentIdx = galleryItems.findIndex(item => item._id === prevSelected._id);
      const newIndex = currentIdx === galleryItems.length - 1 ? 0 : currentIdx + 1;
      return galleryItems[newIndex];
    });
  }, [galleryItems]);

  // Open modal with selected image
  const openModal = useCallback((item) => {
    setSelectedImage(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, prevImage, nextImage, closeModal]);

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic padding based on header height - prevents overlapping with fixed header */}
      <div style={{ paddingTop: `${headerHeight}px` }}>
        
        {/* Banner Section - with fixed height 400px, overlay, and centered text */}
        <div className="relative w-full h-[400px] overflow-hidden">
          {/* Background Image */}
          <img 
            src="assets/gallerybanner.webp" 
            alt="Gallery Banner" 
            className="w-full h-full object-cover"
           
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Centered Title Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Gallery
            </h1>
          </div>
        </div>

        {/* Gallery Grid Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Our <span className="text-red-600">Moments</span> in Focus
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3 md:mt-4">
                A glimpse into our world of engineering excellence and successful collaborations
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
                  <AlertCircle className="h-8 w-8 text-red-600" />
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

            {/* Gallery Grid - Display from API */}
            {!loading && !error && galleryItems.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                  {galleryItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                          }}
                        />
                        
                        {/* View Button Overlay - Visible Only on Hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(item);
                            }}
                            className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-black rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <Eye className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="text-sm md:text-base font-semibold">View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* No Gallery Items Message */}
            {!loading && !error && galleryItems.length === 0 && (
              <div className="text-center py-12 md:py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No gallery items available at the moment.</p>
              </div>
            )}
          </div>
        </section>

      

        {/* CTA Section - Matching About page theme */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-4">
              Let's collaborate and write the next chapter of engineering excellence together.
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

      {/* Modal - Clean Square Design with White Background and Black Text */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          {/* Modal Container - Square Shape */}
          <div 
            className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            {/* Modal Content - Square Layout */}
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Left side */}
              <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                />
              </div>

              {/* Details Section - Right side */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {selectedImage.title}
                </h2>

                {/* Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-full mb-6"></div>

                {/* Description */}
                {selectedImage.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>
                )}

                {/* Close Button at Bottom */}
                <button
                  onClick={closeModal}
                  className="mt-6 w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
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

export default Gallery;