import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import httpClient from '../Api/axios';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare, ChevronRight } from 'lucide-react';

const GlobalEnquiryIcon = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showAutoPopup, setShowAutoPopup] = useState(false);
  const [isAutoPopupClosed, setIsAutoPopupClosed] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  // Service options matching Contact Us form
  const serviceOptions = [
    'Turnkey solutions - E&I',
    'Engineering services - E&I',
    'Field instrumentation',
    'Electrical control panel',
    'Automation services'
  ];

  // Handle click outside to close form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleCloseForm();
      }
    };

    if (showEnquiryForm || showAutoPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [showEnquiryForm, showAutoPopup]);

  // Auto-hide thank you message after 3 seconds
  useEffect(() => {
    if (showThankYouMessage) {
      const timer = setTimeout(() => {
        setShowThankYouMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showThankYouMessage]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form to backend API (matching Contact Us functionality)
  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the request body according to API specification (matching Contact Us)
      const requestBody = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not Provided',
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
          company: '',
          phone: '',
          subject: '',
          message: ''
        });

        // Show thank you message instead of navigating away
        setShowThankYouMessage(true);
        
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your enquiry! We will get back to you soon.'
        });

        // Close form after 2 seconds
        setTimeout(() => {
          handleCloseForm();
          setSubmitStatus(null);
        }, 2000);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle different types of errors (matching Contact Us)
      let errorMessage = 'Sorry, there was an error submitting your enquiry. Please try again later.';
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid input. Please check your information and try again.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear error message after 5 seconds (but keep success message)
      setTimeout(() => {
        if (submitStatus?.type === 'error') {
          setSubmitStatus(null);
        }
      }, 5000);
    }
  };

  // Handle enquiry icon click
  const handleEnquiryClick = () => {
    setShowEnquiryForm(true);
    setShowAutoPopup(false);
    // Clear any previous status
    setSubmitStatus(null);
  };

  // Close form
  const handleCloseForm = () => {
    if (!isSubmitting) {
      setShowEnquiryForm(false);
      setShowAutoPopup(false);
      setSubmitStatus(null);
    }
  };

  // Close auto popup
  const handleCloseAutoPopup = () => {
    setShowAutoPopup(false);
    setIsAutoPopupClosed(true);
    localStorage.setItem('autoPopupClosed', 'true');
  };

  // Render enquiry form
  const renderEnquiryForm = (isAutoPopup = false) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-3 bg-black/60 backdrop-blur-sm"
      onClick={isAutoPopup ? handleCloseAutoPopup : handleCloseForm}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
        ref={formRef}
      >
        <div className="bg-gradient-to-br from-white via-white to-red-50 rounded-xl shadow-xl overflow-hidden border border-gray-200 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isAutoPopup ? "We'd love to help you!" : "Get in Touch"}
                </h3>
                <p className="text-red-100 text-xs sm:text-sm mt-1">
                  {isAutoPopup 
                    ? "Fill out the form and our team will contact you shortly" 
                    : "Fill out the form below and we'll get back to you"}
                </p>
              </div>
              <button
                onClick={isAutoPopup ? handleCloseAutoPopup : handleCloseForm}
                className="text-white hover:text-gray-200 transition-colors p-1"
                disabled={isSubmitting}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitEnquiry} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {/* Status Message */}
              {submitStatus && (
                <div className={`p-3 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {submitStatus.type === 'error' ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <p className={`text-sm ${
                      submitStatus.type === 'error' ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={isSubmitting}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={isSubmitting}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={isSubmitting}
                    placeholder="Your Company Name"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={isSubmitting}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Service Required
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none cursor-pointer bg-white"
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-gray-500 transform rotate-90" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  disabled={isSubmitting}
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="text-sm">Submit Enquiry</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Floating Thank You Message Toast */}
      <AnimatePresence>
        {showThankYouMessage && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-32 right-6 z-[9999] bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-xl p-4 max-w-sm"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-white" />
              <div>
                <p className="font-semibold text-sm">Thank You!</p>
                <p className="text-xs text-green-100">Your enquiry has been submitted successfully.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Enquiry Icon - Position unchanged */}
      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={handleEnquiryClick}
        className="fixed bottom-20 right-4 sm:right-6 md:right-8 z-[9998] w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 group"
        style={{ boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4)' }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            !
          </span>
        </div>
      </motion.button>

      {/* Manual Enquiry Form */}
      <AnimatePresence>
        {showEnquiryForm && renderEnquiryForm(false)}
      </AnimatePresence>
    </>
  );
};

export default GlobalEnquiryIcon;