import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import httpClient from '../Api/axios';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // State for footer data
  const [footerData, setFooterData] = useState({
    address: '',
    emails: [],
    phones: [],
    loading: true,
    error: null
  });

  // Navigation structure matching header
  const navSections = [
    {
      title: 'Services',
      links: [
        { name: 'Turnkey Solutions - E&I', href: '/turnkey-solution' },
        { name: 'Engineering Services - E&I', href: '/engineering-service-solution' },
        { name: 'Field Instrumentation', href: '/field-instrumentation-solution' },
        { name: 'Electrical Control Panel', href: '/electrical-control-panel-solution' },
        { name: 'Automation Services', href: '/automation-service' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Our Clients', href: '/clients' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setFooterData(prev => ({ ...prev, loading: true, error: null }));
        const response = await httpClient.get('/get__all__footer');
        
        if (response.data && response.data.status === true && response.data.data.length > 0) {
          const data = response.data.data[0];
          setFooterData({
            address: data.address || '',
            emails: data.email || [],
            phones: data.phone || [],
            loading: false,
            error: null
          });
        } else {
          setFooterData(prev => ({
            ...prev,
            loading: false,
            error: 'No footer data found'
          }));
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setFooterData(prev => ({
          ...prev,
          loading: false,
          error: err.message || 'Failed to load contact information'
        }));
      }
    };

    fetchFooterData();
  }, []);

  // Fallback contact information in case API fails
  const fallbackContactInfo = {
    address: 'Bhumkar Estate Sr. No. 14/7, Behind Swami Narayan Temple and Krushna Kunj Phase 2, Nr. JSPM College Narhe, Pune – 411041',
    emails: ['samadhan.g@accuonproject.in', 'rahul.a@accuonproject.in'],
    phones: ['+91-8669688650', '+91-8669688651'],
  };

  // Use API data if available, otherwise use fallback
  const contactInfo = {
    address: footerData.address || fallbackContactInfo.address,
    emails: footerData.emails.length > 0 ? footerData.emails : fallbackContactInfo.emails,
    phones: footerData.phones.length > 0 ? footerData.phones : fallbackContactInfo.phones,
  };

  // Show loading skeleton while fetching data
  if (footerData.loading) {
    return (
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Loading skeletons */}
            <div className="lg:col-span-4 space-y-4">
              <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            {[1, 2, 3].map((item) => (
              <div key={item} className="lg:col-span-2 space-y-4">
                <div className="h-6 w-24 bg-gray-800 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column - Logo and Description */}
          <div className="lg:col-span-4 space-y-4">
        <div className="flex items-center space-x-3">
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <img
      src="/assets/punch.png"
      alt="AccuOn Logo"
      className="h-20 w-auto object-contain"
    />
  </div>
</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Industrial Engineering & Automation solutions provider specializing in Turnkey Projects, 
              Engineering Services and Control Panel Manufacturing with global standards and excellence.
            </p>
            
            {/* Optional: Show error message if API failed but we're using fallback data */}
            {footerData.error && (
              <p className="text-xs text-yellow-500 mt-2">
                Using cached contact information. Please refresh.
              </p>
            )}
          </div>

          {/* Navigation Links Columns */}
          {navSections.map((section, idx) => (
            <div key={idx} className="lg:col-span-2">
              <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
                {section.title}
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-1.5 h-0.5 group-hover:h-1.5 bg-red-500 rounded-full transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

         {/* Contact Information Column */}
<div className="lg:col-span-4">
  <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
    Contact Info
    <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></span>
  </h3>

  <div className="space-y-4">
    {/* Address */}
    <div className="flex space-x-3 group">
      <div className="flex-shrink-0 mt-1">
        <MapPin className="h-5 w-5 text-red-500 group-hover:text-red-400 transition-colors" />
      </div>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
        {contactInfo.address}
      </p>
    </div>

    {/* Phone Numbers */}
    <div className="space-y-2">
      {contactInfo.phones.map((phone, idx) => (
        <div key={idx} className="flex items-center space-x-3 group">
          <Phone className="h-4 w-4 text-blue-500 group-hover:text-blue-400 transition-colors" />
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            {phone}
          </a>
        </div>
      ))}
    </div>

    {/* Emails */}
    <div className="space-y-2">
      {contactInfo.emails.map((email, idx) => (
        <div key={idx} className="flex items-center space-x-3 group">
          <Mail className="h-4 w-4 text-red-500 group-hover:text-red-400 transition-colors" />
          <a
            href={`mailto:${email}`}
            className="text-gray-400 text-sm hover:text-white transition-colors break-all"
          >
            {email}
          </a>
        </div>
      ))}
    </div>

    {/* Social Media Links */}
    <div className="pt-4">
      <h4 className="text-white text-sm font-medium mb-3">Follow Us</h4>

      <div className="flex items-center gap-4">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/accuon-project-solutions-pune/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.059-1.865-3.059-1.867 0-2.154 1.459-2.154 2.967v5.696h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.003 3.604 4.604v5.592z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918669688650"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-500 flex items-center justify-center transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
          >
            <path d="M20.52 3.48a11.79 11.79 0 0 0-16.67 0 11.79 11.79 0 0 0-2.77 12.3L0 24l8.43-2.2a11.79 11.79 0 0 0 12.09-2.93 11.79 11.79 0 0 0 0-16.67zm-8.49 18.3a9.74 9.74 0 0 1-4.96-1.36l-.36-.21-5 .99 1.06-4.87-.24-.38a9.73 9.73 0 1 1 9.5 5.83zm5.36-7.29c-.29-.14-1.7-.84-1.97-.93-.26-.1-.45-.14-.64.14s-.73.93-.9 1.12c-.17.19-.33.21-.62.07a7.94 7.94 0 0 1-2.34-1.44 8.78 8.78 0 0 1-1.62-2c-.17-.29 0-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36s-1 1-.1 2.43c.9 1.43 1.57 2.1 3.14 3.35 1.57 1.26 2.9 1.65 3.94 1.78 1.04.12 1.98.08 2.72-.09.45-.1 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
        </div>

        {/* Bottom Bar - Copyright and Legal */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          <p>
            &copy; {currentYear} Accuon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 