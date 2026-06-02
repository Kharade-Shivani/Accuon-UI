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

function Biotech() {
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
          alt="Biotechnology Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            BioTech/Pharma
          </h1>
        </div>
      </div>

      {/* Title and Paragraph Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              BioTech/Pharma <span className="text-red-600">Automation Solutions</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              At Accuon Projects & Engineers India Pvt. Ltd, we offer end-to-end solutions, for Industrial Field Instrumentation To design, engineer, install, and validate comprehensive Electrical, Instrumentation & Control (E&IC) systems for a biotech/pharmaceutical facility that supports production, purification, filling, packaging, and/or R&D processes, ensuring high operational efficiency, compliance, and data integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Grid - Right side image, Left side text */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Left side - Card 1 with Red Background */}
            <div className="bg-red-600 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl">
              <div className="space-y-6">
                <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">
  A typical electrical and instrumentation equipment, software and automation package would include:
</h3>
                <p className="text-red-100 text-base md:text-lg leading-relaxed">
                  We provide end-to-end services encompassing:
                </p>
                <ul className="space-y-4">
                  {[
                    'Engineering & Design',
                    'Procurement',
                    'Installation & Field Cabling',
                    'Testing & Commissioning',
                    'Validation Support (IQ/OQ/PQ)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm md:text-base lg:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

           {/* Right side - Full Image */}
<div className="bg-red-600 rounded-2xl overflow-hidden shadow-xl h-full">
  <img
    src="assets/Industries/IMG1.jpg"
    alt="Biotechnology Laboratory"
    className="w-full h-full object-cover"
  />
</div>
          </div>
        </div>
      </section>

      {/* Support & Services Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Support & Services
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                title: "On-site commissioning & startup",
                description: "Professional on-site commissioning and startup services to ensure your systems are operational quickly and efficiently.",
                icon: <Zap className="h-8 w-8 text-red-600" />
              },
              {
                title: "Maintenance and troubleshooting",
                description: "Comprehensive maintenance programs and rapid troubleshooting to minimize downtime and maximize productivity.",
                icon: <Settings className="h-8 w-8 text-red-600" />
              },
              {
                title: "Periodic calibration and testing",
                description: "Regular calibration and testing services to maintain accuracy, compliance, and optimal system performance.",
                icon: <Target className="h-8 w-8 text-red-600" />
              },
              {
                title: "Operator and maintenance staff train",
                description: "Expert training programs for operators and maintenance staff to ensure safe, efficient, and effective system operation.",
                icon: <GraduationCap className="h-8 w-8 text-red-600" />
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lighting Systems & Automation System Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Lighting Systems</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Automation System */}
            <div className="bg-red-600 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">Automation System</h3>
              <ul className="space-y-3 md:space-y-4">
                {[
                  'Distributed Control Systems (DCS)',
                  'Programmable Logic Controllers (PLC)',
                  'SCADA/HMI solution',
                  'PLC/DCS configuration & programming',
                  'Alarm and event management',
                  'Data logging and historian systems',
                  '21 CFR Part 11 compliance (electronic records & signature)'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm md:text-base lg:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Field Instruments */}
            <div className="bg-red-600 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">Field Instruments</h3>
              <ul className="space-y-3 md:space-y-4">
                {[
                  'Instrumentation Cables & Glands',
                  'Erection Of Instrumentation Package (instruments & cables)',
                  'Cable Reeling Drum',
                  'Erection & Earthing Materials',
                  'Miscellaneous items including Light Fittings, Power & Control Junction Boxes, Welding & Hand, Lamp Power Supply Sockets'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm md:text-base lg:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Electrical Systems Package Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl order-1 md:order-none">
              <img
                src="assets/Industries/img2.jpg"
                alt="Biotechnology Research"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Right side - Text Content */}
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Electrical Systems Package
              </h3>
              <ul className="space-y-3">
                {[
                  'State-of-the-art research laboratories and facilities',
                  'Collaborative partnerships with leading academic institutions',
                  'Accelerated drug discovery using AI and machine learning',
                  'Comprehensive preclinical and clinical development programs'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
            Join the Future of Biotech-Pharma
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

export default Biotech;