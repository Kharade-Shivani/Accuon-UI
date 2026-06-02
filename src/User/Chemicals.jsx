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

function Chemicals() {
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
          alt="Chemicals Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Chemicals & API
          </h1>
        </div>
      </div>

      {/* Title and Paragraph Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Turnkey Process Automation Solutions for <span className="text-red-600">Chemicals & Pharmaceuticals</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              As a trusted turnkey process automation solutions company, we specialize in delivering comprehensive, end-to-end automation systems for the Pharma, API, Chemicals, and Specialty manufacturing sectors. Our solutions are designed to meet the industry's stringent regulatory requirements while enhancing operational efficiency, product quality, and scalability. From conceptual design and engineering to deployment, validation, and support, we provide a seamless automation experience tailored to the unique needs of chemical and pharmaceutical enterprises. Our expertise ensures faster time-to-market, reduced operational risks, and sustainable growth.
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
                Industry-Specific Expertise
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Proven experience in chemical, pharmaceutical, and specialty manufacturing environments.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Compliance-Ready Architecture
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Solutions built to meet FDA, GMP, GAMP, and 21 CFR Part 11 standards.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                End-to-End Turnkey Delivery
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                From design and engineering to commissioning, validation, and support.
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
                Integrated Technology Stack
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Seamless integration with PLC, DCS, SCADA, MES, LIMS, and ERP systems.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Scalable & Modular Solutions
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Designed to grow with your operations and adapt to evolving technologies.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Rapid Deployment & ROI Focus
              </h3>
              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                Accelerated implementation with measurable performance improvements.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

     

{/* Electrical Systems Package Section */}
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
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Reactor Automation
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              Temperature, pressure, and flow control.
              <br />
              Batch recipe execution and safety interlocks.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Distillation Unit Automation
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              Column control, reflux ratio management, and energy optimization.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Centrifuge & Filtration Systems
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              Speed control, vibration monitoring, and automated discharge.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Dryers (Tray, Fluid Bed, Spray)
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              Moisture control, temperature profiling, and batch tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-7">
        
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Utility Systems
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              Boiler, chiller, HVAC, and compressed air system automation.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Effluent Treatment Plant (ETP)
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              pH control, flow balancing, and compliance monitoring.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Warehouse & Material Handling
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              RFID/barcode integration, automated inventory tracking.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0 fill-black" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-1">
              Quality Control Labs
            </h3>
            <p className="text-gray-800 text-sm md:text-[15px] leading-7">
              LIMS integration, sample tracking, and automated reporting.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
            Join the Future of Chemicals Industry
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

export default Chemicals;