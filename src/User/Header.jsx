import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse enter with delay
  const handleMouseEnter = (itemName) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeout = setTimeout(() => {
      setActiveDropdown(itemName);
    }, 200);
    setHoverTimeout(timeout);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Industries data from the image
  const industriesDropdown = [
    { name: 'Biotech / Pharma', href: '/biotech-pharma' },
    { name: 'Chemicals & API', href: '/chemicals-api' },
    { name: 'Food & Beverage Automation', href: '/dairy-brewery-food-beverage' },
    // { name: 'Chimney Aviation Light ', href: '/mmm-cement' },
    { name: 'Sugar, Ethanol, Distillery & Oil & Gas', href: '/sugar-ethanol-distillery-oil-gas' },
    // { name: 'Renewable Energy', href: '/renewable-energy' },
    // { name: 'Pulp & Paper / Textile', href: '/pulp-paper-textile' },
    { name: 'Water and Wastewater Treatment', href: '/water-and-wastewater-treatment' },
    { name: 'Chimney Aviation Light', href: '/Chimney-Aviation-Light' },

  ];

  // Navigation items - Removed "Our Clients" and added "Industries We Serve"
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { 
      name: 'Services', 
      href: '#',
      dropdown: [
        { name: 'Turnkey Solutions - E&I', href: '/turnkey-solution' },
        { name: 'Engineering Services - E&I', href: '/engineering-service-solution' },
        { name: 'Field Instrumentation', href: '/field-instrumentation-solution' },
        { name: 'Electrical Control Panel', href: '/electrical-control-panel-solution' },
        { name: 'Automation Services', href: '/automation-service' },
      ]
    },
    { 
      name: 'Industry', 
      href: '#',
      dropdown: industriesDropdown
    },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Careers', href: '/career' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Handle click on nav items (for mobile)
  const handleNavClick = (item) => {
    if (item.dropdown) {
      setActiveDropdown(activeDropdown === item.name ? null : item.name);
    } else if (item.href && item.href !== '#') {
      setIsOpen(false);
      window.location.href = item.href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg py-4'
          : 'bg-white py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <a href="/" className="flex items-center group">
            <div className="flex flex-col items-center space-y-1">
              <img 
                src="/assets/punch.png" 
                alt="AccuOn Logo" 
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 md:h-16"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={() => item.dropdown && handleMouseLeave()}
              >
                {item.dropdown ? (
                  <button
                    className={`flex items-center px-4 py-2.5 text-lg font-semibold rounded-lg transition-all duration-200 xl:px-5 ${
                      activeDropdown === item.name
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1.5 h-5 w-5 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-2.5 text-lg font-semibold rounded-lg transition-all duration-200 xl:px-5 ${
                      activeDropdown === item.name
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </a>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn z-50"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <div className="py-2 max-h-80 overflow-y-auto">
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Get Started Button */}
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-blue-600 rounded-lg hover:from-red-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get Started
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-1 pb-4 border-t border-gray-100 pt-4">
            {navItems.map((item) => (
              <div key={item.name}>
                <div
                  className="flex items-center justify-between px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  onClick={() => handleNavClick(item)}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
                {item.dropdown && activeDropdown === item.name && (
                  <div className="ml-4 pl-4 border-l-2 border-red-200 space-y-1 mt-1 max-h-60 overflow-y-auto">
                    {item.dropdown.map((dropItem) => (
                      <a
                        key={dropItem.name}
                        href={dropItem.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile Get Started Button */}
            <a
              href="/contact"
              className="mt-3 mx-4 px-5 py-3.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-blue-600 rounded-lg hover:from-red-700 hover:to-blue-700 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      </div>

      {/* Add custom animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;