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

function Cements() {
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
          alt="Cements Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center px-4">
          Smart Mining, Mineral & Cement Automation Solutions with Honeywell
          </h1>
        </div>
      </div>

      {/* Title and Paragraph Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Elevate Your Smart Mining, Mineral & Cement Operations with Honeywell  <span className="text-red-600">Cement Operations with Honeywell</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              We are a globally trusted partner in delivering cutting-edge solutions across the Mining, Minerals, Metal/Steel & Cement industry. With a proven track record of successful project execution, our team combines deep domain expertise with advanced technologies to optimize operations, enhance safety, and ensure compliance with international standards. We don’t just automate processes—we transform industries.
            </p>
          </div>
        </div>
      </section>

     {/* USP Section */}
<section className="py-12 md:py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Title */}
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
        Our USP – What Sets Us Apart
      </h2>
    </div>

    {/* Two Column Grid */}
    <div className="grid md:grid-cols-2 gap-5 lg:gap-7">
      
      {/* Left Card */}
      <div className="bg-red-600 rounded-2xl p-5 md:p-7 lg:p-8 shadow-lg">
        <div className="space-y-6">

          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Industry Leadership
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Recognized pioneers in process automation for Steel & Cement Industry with a portfolio of high-impact projects.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Process-Centric Engineering
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Deep knowledge of process automation solutions
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Global Standards Compliance
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Solutions aligned with ISO, IEC.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Card */}
      <div className="bg-red-600 rounded-2xl p-5 md:p-7 lg:p-8 shadow-lg">
        <div className="space-y-6">

          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Advanced Tech Solutions
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                DCS, PLC, SCADA, IoT, AI, and Cloud platforms.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Sustainability & Safety First
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Automation that supports green operations and workforce protection.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

{/* Plant Automation Section */}
<section className="py-12 md:py-20 bg-[#f3f3f3]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Heading */}
    <h2 className="text-2xl md:text-3xl font-bold text-black mb-10">
      Plant Automation – Unit Packages We Deliver
    </h2>

    {/* Two Column Layout */}
    <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
      
      {/* Left Side */}
      <div className="space-y-7">
        
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Iron Ore Plant
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Pellet Plant
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Grinding Unit
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Slurry Pipeline
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Real-Time Production Dashboards
            </h3>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-7">
        
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Integrated Steel Plant
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Alumina Refinery
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Smelting & Refining Plant
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Energy Monitoring & Load Optimization
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Predictive Maintenance & Asset Health
            </h3>
          </div>
        </div>
      </div>

    </div>

    {/* Bottom Note */}
    <div className="text-center mt-12">
      <p className="text-gray-700 text-sm md:text-base italic">
        Each package is designed for seamless integration, high reliability, and measurable ROI.
      </p>
    </div>
  </div>
</section>

      

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
            Join the Future of Cement Industry
          </h2>
          <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-4">
            Join businesses and innovators who trust Accuon to build smarter, faster, and more impactful solutions.
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

export default Cements;