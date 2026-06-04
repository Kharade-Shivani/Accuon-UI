import React, { useEffect, useState } from 'react';
import {
  FlaskConical,
  Microscope,
  Dna,
  Beaker,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Leaf,
  TestTube,
  Pill,
  Shield,
  Target,
  Eye,
  Award,
  Users,
  Clock,
  TrendingUp,
  Globe,
  Zap,
  GraduationCap,
  Calendar,
  Building2,
  Star,
  Sparkles,
  Briefcase,
  Settings
} from 'lucide-react';

function Sugar() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Get the header element height dynamically
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
    
    // Update header height on resize
    const handleResize = () => {
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic spacer div that matches exact header height */}
      <div style={{ height: `${headerHeight}px` }}></div>
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src="assets/clientbanner.png"
          alt="Sugar Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
           Sugar, Ethanol, Distillery & Oil & Gas
          </h1>
        </div>
      </div>

      {/* Title and Paragraph Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Explore Our Expertise in <span className="text-red-600">Sugar, Ethanol, Distillery & Oil & Gas Automation</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              At Accuon Projects & Engineers India Pvt. Ltd,  we  proven excellence in delivering end-to-end process automation and turnkey E&IC solutions tailored for the Sugar, Ethanol, Distillery and Oil & Gas industries. Our deep domain knowledge, global execution experience and cutting-edge technologies empower clients to optimize operations, enhance safety and drive sustainable growth.
            </p>
          </div>
        </div>
      </section>

  {/* Two Column Grid - Right side image, Left side text */}
<section className="py-12 md:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
      {/* Left side - Card with Red Background */}
      <div className="bg-red-600 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl">
        <div className="space-y-5">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight">
            Our Capabilities Include
          </h3>
          <ul className="space-y-3">
            {[
              'DCS/PLC-based automation for process control and monitoring',
              'Batch and continuous process automation for fermentation and distillation',
              'Energy management systems for cogeneration and steam optimization',
              'Field instrumentation and electrical panels for Zone-I/II hazardous areas',
              'Remote monitoring and diagnostics for predictive maintenance'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white text-xs md:text-sm lg:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Card with Image */}
      <div className="bg-red-600 rounded-2xl overflow-hidden shadow-xl">
        <img
          src="assets/Industries/sugar.jpeg"
          alt="Sugar Processing Facility"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

   {/* Support & Services Section */}
<section className="py-12 md:py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Main Wrapper */}
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

      {/* Left Image */}
      <div className="rounded-2xl overflow-hidden shadow-md">
        <img
          src="assets/Industries/sugarR.jpg"
          alt="Support Services"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="px-2 md:px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
          Key Benefits
        </h2>

        <div className="space-y-5">
          {[
            "Improved throughput and yield",
            "Reduced downtime and manual intervention",
            "Compliance with FDA, GMP and environmental norms",
            "Seamless integration with MES and ERP systems"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">

              {/* Check Icon */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <p className="text-base md:text-lg text-black leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

    {/* Sugar, Ethanol & Distillery Automation Section */}
<section className="py-12 md:py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
      
      {/* Left Content Card */}
      <div className="bg-red-600 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl min-h-[320px] flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
          Sugar, Ethanol & Distillery Automation
        </h2>

        <p className="text-white text-base md:text-lg leading-relaxed max-w-xl">
          From cane yard to crystallization, fermentation to distillation,
          we provide <span className="font-bold">comprehensive automation solutions</span> that
          ensure consistent product quality, energy efficiency and
          regulatory compliance.
        </p>
      </div>

      {/* Right Image Card */}
      <div className="bg-red-600 rounded-2xl p-4 md:p-5 shadow-xl">
        <img
          src="assets/industries/sugarrr.jpeg"
          alt="Sugar Ethanol Distillery Automation"
          className="w-full h-[260px] md:h-[320px] object-cover rounded-md"
        />
      </div>

    </div>
  </div>
</section>


{/* Oil & Gas Automation Solutions Section */}
<section className="py-12 md:py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-10 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
        Oil & Gas Automation Solutions
      </h2>

      <p className="text-sm md:text-base lg:text-lg text-black max-w-5xl mx-auto leading-relaxed">
        We serve upstream, midstream and downstream segments with robust,
        scalable and secure automation systems designed for harsh
        environments and mission-critical operations.
      </p>
    </div>

    {/* Two Column Layout */}
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">

      {/* Left Card */}
      <div className="bg-red-600 rounded-2xl p-6 md:p-8 shadow-xl min-h-[400px] flex flex-col justify-center">

        <h3 className="text-xl md:text-2xl font-bold text-white mb-7">
          Our Offerings Cover
        </h3>

        <div className="space-y-5">

          {/* Item 1 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              SIL2/SIL3-certified safety systems for critical process
              protection
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Pipeline SCADA and RTU integration
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Tank farm automation and custody transfer systems
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Compressor, pump and turbine control systems
            </p>
          </div>

          {/* Item 5 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Cybersecure remote operations and asset management
            </p>
          </div>

        </div>
      </div>

      {/* Right Image Card */}
      <div className="bg-red-600 rounded-2xl p-4 shadow-xl">
        <img
          src="assets/industries/sug.jpeg"
          alt="Oil & Gas Automation"
          className="w-full h-[300px] md:h-[400px] object-cover rounded-md"
        />
      </div>

    </div>
  </div>
</section>

      

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
            Join the Future of Sugar Industry
          </h2>
          <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-4">
            Join businesses and innovators who trust Accuon to build smarter, faster and more impactful solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 text-base md:text-lg shadow-lg hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Sugar;