import React, { useEffect, useState } from 'react';
import { 
  Settings, 
  Cpu, 
  Cloud, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Briefcase,
  Target,
  Award,
  Users,
  Clock,
  BarChart3,
  Laptop,
  Server,
  Database,
  Globe,
  Lock,
  Smartphone,
  TrendingUp,
  Sparkles,
  ChevronRight,
  PenTool,
  Layout,
  Wrench,
  HardDrive,
  Activity,
  FileText
} from 'lucide-react';
import httpClient from '../Api/axios';

function EngineeringService() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [selectedService, setSelectedService] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: ''
  });
  
  // State for API data
  const [engineeringServiceData, setEngineeringServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch engineering services data from API
  useEffect(() => {
    const fetchEngineeringData = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__service__subcategory');
        
        if (response.data && response.data.status && response.data.data) {
          // Find the specific service with title "Engineering services - E&I"
          const engineeringService = response.data.data.find(
            item => item.title === "Engineering services - E&I"
          );
          
          if (engineeringService) {
            setEngineeringServiceData(engineeringService);
          } else {
            setError("Engineering services data not found");
          }
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching engineering data:", err);
        setError("Failed to load engineering services data");
      } finally {
        setLoading(false);
      }
    };

    fetchEngineeringData();
  }, []);

  // Get header height dynamically for responsive padding
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! Our team will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      service: ''
    });
  };

  // Engineering Services Static Data
  const engineeringData = {
    hero: {
      bannerImage: "/assets/engineerbanner.jpg"
    },
   
    services: [
      {
        id: "system-design",
        title: "System Design & Architecture",
        description: "Comprehensive electrical and instrumentation system design including load calculations, circuit design, and system architecture.",
        icon: PenTool,
        features: [
          "Electrical load calculations and analysis",
          "Single Line Diagrams (SLD) development",
          "Control system architecture design",
          "Instrumentation selection and sizing",
          "Power distribution planning"
        ],
        longDescription: "Our system design service provides complete electrical and instrumentation engineering solutions. We develop detailed system architectures, perform load calculations, and create comprehensive design documentation. From conceptual design to detailed engineering, we ensure your systems are efficient, reliable, and compliant with industry standards."
      },
      {
        id: "instrumentation",
        title: "Instrumentation Engineering",
        description: "Selection, sizing, and integration of field instruments for precise process measurement and control.",
        icon: Activity,
        features: [
          "Instrument selection and sizing",
          "P&amp;ID development",
          "Instrument data sheets preparation",
          "Loop diagrams and wiring schematics",
          "Control valve sizing and selection"
        ],
        longDescription: "Our instrumentation engineering services ensure accurate measurement and control of process parameters. We handle instrument selection, sizing, and integration for pressure, temperature, flow, and level measurements. Our team develops comprehensive documentation including P&amp;IDs, loop diagrams, and instrument data sheets for seamless implementation."
      },
      {
        id: "control-panel",
        title: "Control Panel Design",
        description: "Custom control panel design including layout, component selection, and wiring diagrams for various applications.",
        icon: Layout,
        features: [
          "Panel layout and mechanical design",
          "Component selection and sizing",
          "Wiring diagram development",
          "Heat load calculations",
          "Protection and safety integration"
        ],
        longDescription: "We design custom control panels tailored to your specific requirements. Our services include panel layout design, component selection, wiring schematics, and thermal management. We ensure panels are optimized for space, accessibility, and safety while meeting all relevant standards and regulations."
      },
      {
        id: "automation-engineering",
        title: "Automation Engineering",
        description: "PLC, SCADA, and DCS system design including control logic development and HMI design.",
        icon: Cpu,
        features: [
          "PLC hardware configuration",
          "Control logic development",
          "SCADA/HMI screen design",
          "Communication network design",
          "Database and reporting systems"
        ],
        longDescription: "Our automation engineering services cover the complete design of control systems. We develop PLC configurations, create control logic, design intuitive HMI screens, and establish communication networks. Our solutions are scalable, reliable, and optimized for your specific process requirements."
      },
      {
        id: "electrical-engineering",
        title: "Electrical Engineering",
        description: "Complete electrical system design including power distribution, lighting, and emergency systems.",
        icon: Zap,
        features: [
          "Power distribution design",
          "Lighting and small power layout",
          "Emergency power systems",
          "Cable sizing and routing",
          "Earthing and lightning protection"
        ],
        longDescription: "Our electrical engineering services cover all aspects of power systems. We design efficient power distribution networks, lighting systems, emergency power solutions, and protection systems. Our designs focus on safety, reliability, and energy efficiency while complying with electrical codes and standards."
      },
      {
        id: "documentation",
        title: "Engineering Documentation",
        description: "Comprehensive technical documentation including drawings, specifications, and engineering reports.",
        icon: FileText,
        features: [
          "Technical specification development",
          "Engineering drawings and schematics",
          "Bill of Materials (BOM) preparation",
          "Installation and commissioning procedures",
          "Operation and maintenance manuals"
        ],
        longDescription: "We provide complete engineering documentation services to support your projects. Our documentation includes detailed drawings, technical specifications, BOMs, installation procedures, and O&M manuals. We ensure all documentation is accurate, well-organized, and compliant with project requirements."
      }
    ],
    whyChooseUs: [
      {
        title: "Expert Engineering Team",
        description: "Our engineers hold advanced degrees and professional certifications in electrical and instrumentation engineering.",
        icon: Award
      },
      {
        title: "Industry Standards Compliance",
        description: "All designs comply with IEC, NEC, ISA, and other relevant industry standards and regulations.",
        icon: Shield
      },
      {
        title: "Advanced Design Tools",
        description: "We use latest engineering software including AutoCAD Electrical, EPLAN, and SPEL for precision design.",
        icon: Settings
      },
      {
        title: "Quality Assurance",
        description: "Multi-level design reviews and quality checks ensure error-free documentation and designs.",
        icon: CheckCircle
      },
      {
        title: "Cost Optimization",
        description: "Value engineering and optimization techniques reduce costs without compromising quality.",
        icon: BarChart3
      },
      {
        title: "Timely Delivery",
        description: "Structured project management ensures on-time delivery of engineering deliverables.",
        icon: Clock
      }
    ],
    process: [
      {
        step: "01",
        title: "Requirements Analysis",
        description: "We gather and analyze project requirements, technical specifications, and operational needs.",
        duration: "1-2 weeks"
      },
      {
        step: "02",
        title: "Conceptual Design",
        description: "Development of preliminary designs, system architecture, and technology selection.",
        duration: "1-3 weeks"
      },
      {
        step: "03",
        title: "Detailed Engineering",
        description: "Creation of detailed drawings, calculations, specifications, and engineering documents.",
        duration: "2-6 weeks"
      },
      {
        step: "04",
        title: "Design Review",
        description: "Multi-level review and validation of all engineering deliverables.",
        duration: "1-2 weeks"
      },
      {
        step: "05",
        title: "Quality Assurance",
        description: "Final quality checks, standards compliance verification, and documentation finalization.",
        duration: "1 week"
      },
      {
        step: "06",
        title: "Deliverable Submission",
        description: "Submission of all engineering documents, drawings, and technical specifications.",
        duration: "3-5 days"
      }
    ],
    technologies: [
      { name: "Design Software", items: ["AutoCAD Electrical", "EPLAN", "SolidWorks Electrical", "SPEL"] },
      { name: "Instrumentation", items: ["Emerson", "Yokogawa", "Honeywell", "Siemens", "ABB"] },
      { name: "PLC Systems", items: ["Siemens S7", "Rockwell", "Schneider Electric", "Mitsubishi"] },
      { name: "SCADA Systems", items: ["WinCC", "FactoryTalk", "Citect", "Ignition", "Wonderware"] },
      { name: "Analytical Tools", items: ["ETAP", "SKM", "DIALux", "MATLAB/Simulink"] },
      { name: "Documentation", items: ["MS Office", "SharePoint", "Bluebeam", "Adobe Acrobat"] }
    ],
    capabilities: [
      {
        title: "Feasibility Studies",
        description: "We provide comprehensive Electrical Engineering Feasibility Studies to evaluate technical, economic, operational, safety and timeline aspects of projects. Our structured approach helps identify risks, optimize designs and ensure compliance. These studies support better decision-making, cost control, improved efficiency and successful project execution.",
        icon: Target
      },
      {
        title: "Detailed Engineering",
        description: "We offer comprehensive Detailed Engineering services in Electrical Engineering converting concepts into construction-ready solutions. Our scope includes electrical design, SLDs, wiring diagrams, load calculations, cable sizing, equipment selection, protection and control engineering and layout design. We ensure compliance with IEC/IS standards, delivering accurate, safe and efficient engineering for reliable project execution and performance.",
        icon: PenTool
      },
      {
        title: "Technical Specifications",
        description: "We provide detailed Technical Specifications in Electrical Engineering defining clear requirements for equipment, systems and execution. Our scope includes equipment specifications, performance parameters, design standards, materials, control and protection requirements and testing criteria. These ensure compliance, accuracy and consistency across engineering, procurement and installation activities for safe and reliable project delivery.",
        icon: FileText
      },
      {
        title: "Value Engineering",
        description: "We offer Value Engineering services in Electrical Engineering to optimize design, reduce costs and enhance performance without compromising quality or safety. Our scope includes design optimization, cost analysis, material and equipment alternatives, installation simplification and energy efficiency improvements. We focus on delivering practical solutions that improve ROI, reliability and overall project efficiency.",
        icon: TrendingUp
      }
    ],
  };

  // Get category name from API data
  const categoryName = engineeringServiceData?.categoryId?.name || "Engineering services - E&I";
  // Get capability image from API data
  const capabilityImage = engineeringServiceData?.capabilityImage || "/assets/ENGINEERING-SERVICES.webp";

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic padding based on header height */}
      <div style={{ paddingTop: `${headerHeight}px` }}>
        
        {/* Hero Banner Section - Only category name centered on image */}
        <div className="relative w-full h-[400px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${engineeringData.hero.bannerImage})`,
              backgroundColor: '#1a1a2e'
            }}
          >
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/80"></div>
          </div>
          
          {/* Centered Title Only */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                {categoryName}
              </h1>
            </div>
          </div>
        </div>

        {/* Dynamic API Section - Engineering Services in 2 Column Format */}
        {loading ? (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading engineering services...</p>
              </div>
            </div>
          </section>
        ) : error ? (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-red-600">
                <p>{error}</p>
              </div>
            </div>
          </section>
        ) : engineeringServiceData && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* 2 Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Left Column - Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <img 
                    src={engineeringServiceData.image} 
                    alt={engineeringServiceData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Column - Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {engineeringServiceData.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {engineeringServiceData.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Capabilities Section - Two Column Layout: Left Column Dropdown, Right Column Image (DYNAMIC IMAGE) */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Overall Section Title - Centered */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                Our <span className="text-red-600">Capabilities</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3 max-w-2xl mx-auto">
                Comprehensive engineering expertise delivered with precision
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left Column - Dropdown Accordion */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <div className="space-y-3">
                  {engineeringData.capabilities.map((capability, index) => (
                    <details 
                      key={index} 
                      className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-red-200 transition-all duration-200"
                    >
                      <summary className="flex items-center justify-between cursor-pointer list-none p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <capability.icon className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="font-semibold text-gray-800">{capability.title}</span>
                        </div>
                        <span className="text-red-500 text-lg group-open:rotate-180 transition-transform duration-200">
                          +
                        </span>
                      </summary>
                      <div className="px-4 pb-4 pt-1">
                        <p className="text-gray-600 text-sm leading-relaxed pl-11">
                          {capability.description}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Right Column - Dynamic Image from API capabilityImage field */}
              <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
                {loading ? (
                  <div className="w-full h-full min-h-[400px] bg-gray-100 flex items-center justify-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  </div>
                ) : (
                  <img 
                    src={capabilityImage} 
                    alt="Engineering Capabilities"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/ENGINEERING-SERVICES.webp";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Service Modals */}
        {engineeringData.services.map((service) => (
          <div
            key={`modal-${service.id}`}
            id={`modal-${service.id}`}
            className="fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                e.currentTarget.style.display = 'none';
              }
            }}
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <service.icon className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <button
                  onClick={() => {
                    const modal = document.getElementById(`modal-${service.id}`);
                    if (modal) modal.style.display = 'none';
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6">{service.longDescription}</p>
                <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, service: service.title }));
                    document.getElementById(`modal-${service.id}`).style.display = 'none';
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Request This Service
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Why Choose Us Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                Why Choose <span className="text-red-600">Our Engineering Services</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3 md:mt-4">
                Technical excellence backed by experience and innovation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {engineeringData.whyChooseUs.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Consultation Section */}
        <section id="contact" className="py-12 md:py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Centered Content */}
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Ready to Start Your Engineering Project?
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                  Let our expert engineering team bring your vision to life with precision and innovation.
                </p>
                <button 
                  onClick={() => {
                    alert('Contact us form will open here');
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default EngineeringService;