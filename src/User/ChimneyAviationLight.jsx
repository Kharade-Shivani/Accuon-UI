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

function ChimneyAviationLight() {
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
  Industrial Chimney Aviation Light Automation
          </h1>
        </div>
      </div>

      {/* Title and Paragraph Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
           
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              We are a globally trusted partner in delivering cutting-edge solutions across the Mining, Minerals, Metal/Steel & Cement industry. With a proven track record of successful project execution, our team combines deep domain expertise with advanced technologies to optimize operations, enhance safety and ensure compliance with international standards. We don’t just automate processes—we transform industries.
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
  'Cement Plants',
  'Thermal Power Plants',
  'Float Glass / Fiber Glass Plants',
  'Steel & Metal Processing Plants',
  'Pharmaceutical Manufacturing Plants'
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
     src="assets/Industries/chimney.jpeg"
     alt="Dairy Processing Facility"
     className="w-full h-full object-cover"
   />
   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
 </div>
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

export default ChimneyAviationLight;