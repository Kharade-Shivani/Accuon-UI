import React, { useState, useEffect, useRef } from 'react';

function WhatsAppIcon() {
  const [isPulsing, setIsPulsing] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // Pulsing animation every 3 seconds
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleIconClick = () => {
    // Directly open WhatsApp with the number (with +91 country code)
    window.open("https://wa.me/918669688650", "_blank");
  };

  // Get localized notification number
  const getLocalizedNotificationNumber = () => {
    return "2";
  };

  return (
    <div 
      className="fixed bottom-6 right-24 z-40 flex flex-col items-end gap-4 font-['Segoe_UI',_Arial,_sans-serif']"
    >
      {/* WhatsApp Icon */}
      <div
        ref={tooltipRef}
        className={`
          relative w-12 h-12 rounded-full flex items-center justify-center
          cursor-pointer transition-all duration-300
          bg-gradient-to-br from-green-500 to-green-700
          shadow-md border-2 border-white
          ${isHovered ? 'scale-110 -translate-y-0.5' : 'scale-100'}
          ${isPulsing ? 'animate-pulse' : ''}
          hover:shadow-lg hover:shadow-green-500/25
        `}
        onClick={handleIconClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full  
                        w-4 h-4 flex items-center justify-center text-[9px] font-bold
                        shadow-sm">
          <span>{getLocalizedNotificationNumber()}</span>
        </div>

        {/* WhatsApp SVG Icon */}
        <svg 
          viewBox="0 0 32 32" 
          width="22"
          height="22"
          className="drop-shadow-sm"
        >
          <path 
            fill="#FFFFFF" 
            d="M16 0C7.163 0 0 7.163 0 16c0 3.093.876 6.067 2.537 8.663L.672 31.33l6.7-1.86C9.933 31.124 12.907 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0z"
          />
          <path 
            fill="#25D366" 
            d="M23.9 22.4c-.3.9-1.6 1.6-2.6 1.8-.7.2-1.6.3-4.8-1.2-4.1-1.9-6.8-6.3-7-6.6-.2-.3-1.6-2.2-1.6-4.2 0-2 .8-3.1 1.1-3.5.3-.3.7-.4 1-.4h.8c.3 0 .6 0 .8.4.3.3 1 1.4 1.1 1.5.2.3.3.6.1 1-.1.3-.3.6-.5.9-.2.3-.4.5-.6.8-.2.3-.4.6-.2 1 .2.3 1.1 1.6 2.4 2.6 1.6 1.3 2.9 1.7 3.3 1.9.4.2.6.2 1-.2.3-.3 1.2-1.4 1.5-1.9.3-.5.6-.4 1-.2.4.2 2.5 1.2 2.9 1.4.4.2.7.3.8.5.1.2.1 1.1-.3 2z"
          />
        </svg>

        {/* Floating label */}
        <div className={`
          absolute top-1/2 -translate-y-1/2 right-14
          bg-white text-green-600 px-2.5 py-1 rounded-full
          text-xs font-medium whitespace-nowrap shadow-md
          transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          WhatsApp
        </div>
      </div>
    </div>
  );
}

export default WhatsAppIcon;