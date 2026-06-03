import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  ChevronRight
} from 'lucide-react';
import httpClient from '../Api/axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '' // Added company field
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    header: false,
    leftImage: false,
    rightForm: false,
    leftAddress: false,
    rightOfficeImage: false
  });

  const headerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightFormRef = useRef(null);
  const leftAddressRef = useRef(null);
  const rightOfficeImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (headerRef.current) {
      headerRef.current.dataset.section = 'header';
      observer.observe(headerRef.current);
    }
    if (leftImageRef.current) {
      leftImageRef.current.dataset.section = 'leftImage';
      observer.observe(leftImageRef.current);
    }
    if (rightFormRef.current) {
      rightFormRef.current.dataset.section = 'rightForm';
      observer.observe(rightFormRef.current);
    }
    if (leftAddressRef.current) {
      leftAddressRef.current.dataset.section = 'leftAddress';
      observer.observe(leftAddressRef.current);
    }
    if (rightOfficeImageRef.current) {
      rightOfficeImageRef.current.dataset.section = 'rightOfficeImage';
      observer.observe(rightOfficeImageRef.current);
    }

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (leftImageRef.current) observer.unobserve(leftImageRef.current);
      if (rightFormRef.current) observer.unobserve(rightFormRef.current);
      if (leftAddressRef.current) observer.unobserve(leftAddressRef.current);
      if (rightOfficeImageRef.current) observer.unobserve(rightOfficeImageRef.current);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ submitted: false, error: false, message: '' });

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      setIsLoading(false);
      return;
    }

    try {
      // Prepare the request body according to API specification
      const requestBody = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not Provided', // Default if not provided
        phone: formData.phone || 'Not Provided',
        service: formData.subject || 'General Inquiry',
        message: formData.message
      };

      // Make POST API call
      const response = await httpClient.post('/api/Enquiry', requestBody);

      // Success - API call successful
      if (response.status === 200 || response.status === 201) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          company: ''
        });

        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you! Your enquiry has been submitted successfully. We will get back to you soon.'
        });
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle different types of errors
      let errorMessage = 'Sorry, there was an error submitting your enquiry. Please try again later.';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid input. Please check your information and try again.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      setFormStatus({
        submitted: false,
        error: true,
        message: errorMessage
      });
    } finally {
      setIsLoading(false);
      
      // Clear success/error message after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" dir="ltr">
      {/* Banner Section - with top padding to account for fixed header */}
      {/* Fixed header height compensation: pt-16 on mobile, pt-20 on desktop */}
      <div className="pt-16 md:pt-20 lg:pt-24">
        <div className="relative w-full h-[400px] overflow-hidden">
          {/* Background Image */}
          <img
            src="assets/contactbanner.webp"
            alt="Contact Us Banner"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Centered Title Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      {/* Background Image for the Entire Content Section */}
      <div className="relative min-h-screen">
       

        {/* Two Column Layout: Image on Left, Form on Right */}
        <section id="contact-form" className="relative py-12 md:py-16 lg:py-20 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Header Text */}
            <div
              ref={headerRef}
              className={`text-center mb-8 md:mb-10 lg:mb-12 transition-all duration-1000 ${
                isVisible.header
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-[30px] md:text-[36px] lg:text-[42px] font-bold text-black mb-2">
                Get In <span className="text-red-600">Touch</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-gray-900 max-w-2xl mx-auto leading-relaxed">
                Have a question or want to work with us? Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column: Image - using imhg9.jpg from public folder, slides in from LEFT */}
              <div
                ref={leftImageRef}
                className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
                  isVisible.leftImage
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
                  <img
                    src="assets/contact us.png"
                    alt="Contact Us"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Column: Contact Form - Slides in from RIGHT */}
              <div
                ref={rightFormRef}
                className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
                  isVisible.rightForm
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 lg:p-12 border-2 border-white/40 shadow-2xl">
                  {formStatus.message && (
                    <div className={`p-3 md:p-4 rounded-lg mb-4 md:mb-6 ${
                      formStatus.error 
                        ? 'bg-red-50 border border-red-200' 
                        : 'bg-green-50 border border-green-200'
                    }`}>
                      <div className="flex items-center space-x-2 md:space-x-3">
                        {formStatus.error ? (
                          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                        )}
                        <p className={`text-sm md:text-base ${
                          formStatus.error ? 'text-red-700' : 'text-green-700'
                        }`}>
                          {formStatus.message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">
                          Company Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="Your Company Name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">
                        Service Required
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500 pointer-events-none" />
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base appearance-none cursor-pointer"
                        >
                          <option value="">Select a service...</option>
                          <option value="Turnkey solutions - E&I">Turnkey solutions - E&I</option>
                          <option value="Engineering services - E&I">Engineering services - E&I</option>
                          <option value="Field instrumentation">Field instrumentation</option>
                          <option value="Electrical control panel">Electrical control panel</option>
                          <option value="Automation services">Automation services</option>
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronRight className="w-4 h-4 text-gray-500 transform rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full px-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none text-sm md:text-base"
                        placeholder="Tell us about your project or inquiry..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 md:py-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 md:space-x-3 group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm md:text-base">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm md:text-base">Send Message</span>
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

          {/* Location Map Section */}
<div className="mt-16 md:mt-20 lg:mt-24">
  <div className="text-center mb-8">
    <h2 className="text-[32px] md:text-[36px] lg:text-[42px] font-bold text-black">
      Find <span className="text-red-600">Us</span>
    </h2>
    <p className="text-gray-700 text-base md:text-lg mt-2">
      Visit our office location in Pune
    </p>
  </div>

  <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16">
  <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.919453064346!2d73.83019517701729!3d18.441965926824302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295ce5b4adf15%3A0xac4e8d363b96ddd7!2sAccuon%20Projects%20%26%20Engineers%20(I)%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1780472050467!5m2!1sen!2sin"

    width="100%"
    height="500"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Accuon Projects Location"
  />
</div>
</div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .form-success {
          animation: fadeIn 0.5s ease-in;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

export default Contact;