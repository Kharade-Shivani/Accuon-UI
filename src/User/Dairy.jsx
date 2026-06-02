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

function Dairy() {
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
          alt="Dairy Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
          Dairy, Brewery, Food & Beverage Automation Solutions
          </h1>
        </div>
      </div>

      {/* Title and Paragraph Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Dairy <span className="text-red-600">Automation Solutions</span>
            </h2> */}
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
             Dairy Plant Automation enhances efficiency, safety, and product quality by integrating advanced technologies across the production process. We Automated systems manage everything from milk reception and testing to processing, packaging, and cleaning. This ensures consistent product standards, reduces human error, and improves hygiene through systems like Clean-in-Place (CIP). Real-time monitoring and control via PLCs and SCADA help optimize operations, while integration with ERP and MES platforms enables better traceability and compliance. Automation also reduces operational costs, supports scalability, and allows dairy plants to meet growing demand with minimal downtime and maximum reliability.
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
    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
      Plants covered in automation
    </h3>
    <ul className="space-y-3">
      {[
        'Raw Milk Handling (RMRD)',
        'Raw Milk Storage (RMST)',
        'Recon Section',
        'Milk Process',
        'Evaporation and Dryer',
        'CIP'
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
<div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
  <img
    src="assets/Industries/dairy.jpeg"
    alt="Dairy Processing Facility"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
</div>
          </div>
        </div>
      </section>

     
{/* Our USP – What Sets Us Apart Section */}
<section className="py-12 md:py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Heading */}
    <div className="text-center mb-8 md:mb-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
        Our USP – What Sets Us Apart
      </h2>
    </div>

    {/* Two Column Layout */}
    <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch">
      
      {/* Left Side Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg h-full">
        <img
          src="assets/Industries/dairy2.jpg"
          alt="Edible Oil Plant Automation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Content */}
      <div className="h-full flex flex-col justify-center">
        <p className="text-gray-900 text-xs md:text-sm lg:text-[15px] leading-7">
          <span className="font-bold">
            Edible Oil Plant Automation
          </span>{" "}
          we offer comprehensive automation solutions for edible oil
          processing plants, designed to optimize production, enhance
          product quality, and ensure operational consistency. Our
          automation systems cover the entire production chain—from seed
          preparation, oil extraction, and refining to packaging and
          utility management—integrating advanced PLC/DCS, SCADA, and IoT
          technologies for real-time control and monitoring. Automated
          systems support traceability, inventory management, and
          sustainable practices, making edible oil plants more
          competitive, environmentally friendly, and scalable to meet
          growing market demands.
        </p>

        {/* Plants Covered */}
        <div className="mt-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-5">
            Plants covered in Automation
          </h3>

          <ul className="space-y-3">
            {[
              "BLEACHER",
              "DEO",
              "CRYSTALISER",
              "FILTER PRESS",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3"
              >
                <CheckCircle className="h-4 w-4 text-black fill-black flex-shrink-0" />

                <span className="text-sm md:text-[15px] font-medium text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Lighting Systems & Automation System Section */}
<section className="py-10 md:py-16 bg-[#f3f3f3]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
      
      {/* Left Content */}
      <div>
        <p className="text-sm md:text-base lg:text-lg leading-7 text-black">
          <span className="font-bold">
         Brewery Plant Automation
          </span>{' '}
         we provide end-to-end brewery plant automation solutions designed to improve consistency, increase efficiency, and support scalable growth. Our systems cover the entire brewing process—from raw material handling and mash preparation to fermentation control, cleaning (CIP), packaging, and data analytics. With advanced PLC/DCS and SCADA integration, We can easily manage recipes, monitor tank conditions in real-time, automate cleaning cycles. —all from a centralized interface.
        </p>
      </div>

      {/* Right Content */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-black mb-5">
          Plants covered in Automation
        </h3>

        <ul className="space-y-3">
          {[
  'Grain Milling',
  'Malt Handling',
  'Mash Kettle',
  'Lauter tun',
  'Whirlpool',
  'Wort Cool',
  'Yeast section',
  'Uni Tank',
  'BBT',
  'Utilities Process water & CIP'
].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-black mt-1 flex-shrink-0" />
              <span className="text-xs md:text-sm text-black">
                {item}
              </span>
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
            Join the Future of Dairy Industry
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

export default Dairy;