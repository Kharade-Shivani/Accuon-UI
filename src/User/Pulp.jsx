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

function Pulp() {
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
          alt="Pulp & Paper Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Pulp & Paper / Textile
          </h1>
        </div>
      </div>

      {/* Title and Paragraph Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
             Process Automation for Pulp & <span className="text-red-600">Paper and Textile Industries</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              At Accuon Projects & Engineers India Pvt. Ltd, we deliver intelligent, reliable, and scalable turnkey process automation solutions for the Pulp & Paper and Textile industries. With over 30 years of experience and 700+ Honeywell Experion DCS/PLC installations, we empower manufacturers to optimize production, reduce downtime, and meet global quality standards.
            </p>
          </div>
        </div>
      </section>

     {/* Pulp & Paper Industry Automation Section */}
<section className="py-12 md:py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Two Column Grid */}
    <div className="grid md:grid-cols-2 gap-5 lg:gap-6">

      {/* Left Card */}
      <div className="bg-red-600 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-center min-h-[340px]">

        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-6">
          Pulp & Paper Industry Automation
        </h2>

        <p className="text-sm md:text-base text-white leading-relaxed">
          From raw material handling to finishing and packaging, our
          automation systems streamline every stage of the paper-making
          process.
        </p>

      </div>

      {/* Right Card */}
      <div className="bg-red-600 rounded-2xl p-6 md:p-8 shadow-xl min-h-[340px]">

        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">
          Our Capabilities Include
        </h3>

        <div className="space-y-4">

          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              DCS/PLC-based control for pulping, bleaching, drying, and calendaring
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Energy management and steam optimization for cogeneration systems
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Integration of field instrumentation and electrical panels for Zone-I/II areas
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Real-time monitoring and analytics for predictive maintenance
            </p>
          </div>

          {/* Item 5 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Seamless connectivity with MES and ERP systems
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

{/* Benefits Section */}
<section className="py-12 md:py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Main Grid */}
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

      {/* Left Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src="assets/industries/pulp.png"
          alt="Benefits"
          className="w-full h-[240px] md:h-[340px] object-cover"
        />
      </div>

      {/* Right Content */}
      <div>

        <h2 className="text-xl md:text-2xl font-bold text-black mb-7">
          Benefits
        </h2>

        <div className="space-y-4">

          {/* Item 1 */}
          <div className="flex items-start gap-3">

            <div className="flex-shrink-0 mt-1">
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
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

            <p className="text-sm md:text-base text-black leading-relaxed">
              Improved process stability and product consistency
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">

            <div className="flex-shrink-0 mt-1">
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
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

            <p className="text-sm md:text-base text-black leading-relaxed">
              Reduced energy consumption and operational costs
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">

            <div className="flex-shrink-0 mt-1">
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
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

            <p className="text-sm md:text-base text-black leading-relaxed">
              Enhanced safety and environmental compliance
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-3">

            <div className="flex-shrink-0 mt-1">
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
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

            <p className="text-sm md:text-base text-black leading-relaxed">
              Scalable solutions for greenfield and modernization projects
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

{/* Textile Industry Process Automation Section */}
<section className="py-12 md:py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-10 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
        Textile Industry Process Automation
      </h2>

      <p className="text-sm md:text-base lg:text-lg text-black max-w-5xl mx-auto leading-relaxed">
        We support textile manufacturers with automation solutions that
        enhance precision, productivity, and sustainability across
        spinning, weaving, dyeing, and finishing operations.
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
              DCS/PLC systems for batch and continuous process control
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Temperature, pressure, and flow instrumentation for dyeing
              and drying
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Electrical panel design and commissioning for textile
              machinery
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Integration with quality control and traceability systems
            </p>
          </div>

          {/* Item 5 */}
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1 flex-shrink-0">
              <span className="text-sky-700 text-xs font-bold">✓</span>
            </div>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Remote diagnostics and performance dashboards
            </p>
          </div>

        </div>
      </div>

      {/* Right Image Card */}
      <div className="bg-red-600 rounded-2xl p-4 shadow-xl">
        <img
          src="assets/industries/paper.png"
          alt="Textile Industry Process Automation"
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
            Join the Future of Pulp & Paper Industry
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

export default Pulp;