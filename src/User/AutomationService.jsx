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
  Activity,
  Wifi,
  HardDrive,
  Radio,
  GitBranch
} from 'lucide-react';
import httpClient from '../Api/axios';

function AutomationService() {
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
  const [automationServiceData, setAutomationServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch automation services data from API
  useEffect(() => {
    const fetchAutomationData = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__service__subcategory');
        
        if (response.data && response.data.status && response.data.data) {
          // Find the specific service with title "Automation services"
          const automationService = response.data.data.find(
            item => item.title === "Automation services"
          );
          
          if (automationService) {
            setAutomationServiceData(automationService);
          } else {
            setError("Automation services data not found");
          }
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching automation data:", err);
        setError("Failed to load automation services data");
      } finally {
        setLoading(false);
      }
    };

    fetchAutomationData();
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

  // Automation Services Static Data
  const automationStaticData = {
    hero: {
      bannerImage: "/assets/auomationbanner.webp"
    },
    
    services: [
      {
        id: "plc-programming",
        title: "PLC Programming & Integration",
        description: "Expert PLC programming, configuration, and integration for industrial process automation.",
        icon: Cpu,
        features: [
          "Ladder logic, FBD, and STL programming",
          "PLC hardware selection and configuration",
          "Communication protocol integration",
          "Legacy system migration",
          "Remote PLC access and monitoring"
        ],
        longDescription: "Programmable Logic Controllers (PLCs) are the backbone of industrial automation. Our PLC programming services cover all major brands including Siemens, Allen Bradley, Schneider Electric, Mitsubishi, and Omron. We develop efficient, well-documented control logic using ladder logic, function block diagrams, and structured text. Our team ensures seamless integration with your existing systems and provides comprehensive testing and validation before deployment."
      },
      {
        id: "scada-systems",
        title: "SCADA Systems Development",
        description: "Comprehensive SCADA system design, development, and implementation for real-time process monitoring.",
        icon: Laptop,
        features: [
          "Custom HMI/SCADA development",
          "Real-time data visualization",
          "Alarm management systems",
          "Historical data logging and trending",
          "Web-based remote access"
        ],
        longDescription: "Supervisory Control and Data Acquisition (SCADA) systems provide the window into your automated processes. We develop intuitive, powerful SCADA solutions using platforms like Wonderware, Ignition, iFix, WinCC, and Citect. Our systems offer real-time visualization, alarm management, trend analysis, reporting, and remote access capabilities. We ensure your operators have the information they need to make quick, informed decisions."
      },
      {
        id: "hmi-design",
        title: "HMI Design & Development",
        description: "User-friendly Human-Machine Interface design for efficient operator interaction and process control.",
        icon: Smartphone,
        features: [
          "Intuitive screen navigation",
          "Graphical process representation",
          "Data entry and control interfaces",
          "Multi-language support",
          "Mobile and tablet compatibility"
        ],
        longDescription: "Human-Machine Interfaces (HMIs) are critical for operator efficiency. Our HMI design philosophy focuses on clarity, consistency, and ease of use. We develop HMIs for panel-mounted touch screens, desktop computers, tablets, and mobile devices. Our designs follow ISA-101 standards for HMI design, ensuring operators can quickly understand process status and respond effectively to alarms and abnormal conditions."
      },
      {
        id: "dcs-integration",
        title: "DCS Integration",
        description: "Distributed Control System integration for complex, continuous process automation.",
        icon: GitBranch,
        features: [
          "DCS architecture design",
          "Control loop optimization",
          "Advanced process control (APC)",
          "System migration and upgrades",
          "Integration with PLC networks"
        ],
        longDescription: "For complex, continuous processes like chemical plants, refineries, and power generation, Distributed Control Systems (DCS) provide superior control. We work with leading DCS platforms including Yokogawa Centum, Honeywell Experion, Emerson DeltaV, and ABB 800xA. Our services include system design, configuration, loop tuning, advanced process control implementation, and seamless integration with existing PLC and SCADA systems."
      },
      {
        id: "industrial-iot",
        title: "Industrial IoT Solutions",
        description: "Industry 4.0 solutions enabling data-driven decision making and predictive maintenance.",
        icon: Wifi,
        features: [
          "IIoT sensor integration",
          "Edge computing devices",
          "Cloud-based analytics",
          "Predictive maintenance algorithms",
          "Digital twin development"
        ],
        longDescription: "Industrial Internet of Things (IIoT) is transforming manufacturing through data-driven insights. Our IIoT solutions connect your machines and processes to the cloud, enabling predictive maintenance, performance optimization, and real-time analytics. We implement edge devices, wireless sensors, and cloud platforms (AWS IoT, Azure IoT) to collect and analyze production data, helping you reduce downtime and improve overall equipment effectiveness (OEE)."
      },
      {
        id: "automation-audit",
        title: "Automation Audit & Optimization",
        description: "Comprehensive assessment and optimization of existing automation systems for improved performance.",
        icon: BarChart3,
        features: [
          "Control system performance assessment",
          "Code review and optimization",
          "Cycle time reduction analysis",
          "Energy efficiency recommendations",
          "Upgrade roadmap development"
        ],
        longDescription: "Is your automation system performing at its best? Our automation audit service provides a comprehensive assessment of your existing control systems. We analyze PLC code efficiency, SCADA performance, network architecture, and operator effectiveness. Based on our findings, we provide actionable recommendations for optimization, including code improvements, hardware upgrades, and operator training. Many clients achieve 15-30% performance improvements after our audit."
      }
    ],
    whyChooseUs: [
      {
        title: "Multi-Brand Expertise",
        description: "We work with all major automation brands including Siemens, Allen Bradley, Schneider, and Mitsubishi.",
        icon: Award
      },
      {
        title: "Industry 4.0 Ready",
        description: "Future-proof solutions with IIoT, cloud connectivity, and data analytics capabilities.",
        icon: TrendingUp
      },
      {
        title: "Proven Methodology",
        description: "Structured approach including FAT, SAT, and comprehensive documentation.",
        icon: Settings
      },
      {
        title: "On Time Support",
        description: "Round-the-clock remote monitoring and support for critical automation systems.",
        icon: Clock
      },
      {
        title: "Custom Training",
        description: "Comprehensive operator and maintenance training programs tailored to your needs.",
        icon: Users
      },
      {
        title: "Scalable Solutions",
        description: "Systems designed to grow with your business and adapt to changing requirements.",
        icon: BarChart3
      }
    ],
    process: [
      {
        step: "01",
        title: "Requirement Analysis",
        description: "Detailed analysis of your process requirements, control objectives, and integration needs.",
        duration: "1-2 weeks"
      },
      {
        step: "02",
        title: "System Design",
        description: "Architecture design, hardware selection, network planning, and I/O allocation.",
        duration: "1-3 weeks"
      },
      {
        step: "03",
        title: "Programming & Configuration",
        description: "PLC programming, HMI development, SCADA configuration, and database setup.",
        duration: "2-6 weeks"
      },
      {
        step: "04",
        title: "Factory Acceptance Test (FAT)",
        description: "Thorough testing in our facility with client participation and approval.",
        duration: "1 week"
      },
      {
        step: "05",
        title: "Installation & Commissioning",
        description: "On-site installation, integration, loop checking, and system startup.",
        duration: "1-3 weeks"
      },
      {
        step: "06",
        title: "Training & Handover",
        description: "Operator training, documentation handover, and post-commissioning support.",
        duration: "1 week"
      }
    ],
    technologies: [
      { name: "PLC Platforms", items: ["Siemens S7", "Allen Bradley ControlLogix", "Schneider Modicon", "Mitsubishi", "Omron"] },
      { name: "SCADA/HMI", items: ["Wonderware", "Ignition", "WinCC", "iFix", "Citect", "VTScada"] },
      { name: "Communication", items: ["Profinet", "EtherNet/IP", "Modbus TCP/RTU", "Profibus", "OPC UA"] },
      { name: "IIoT Platforms", items: ["AWS IoT", "Azure IoT", "ThingsBoard", "PTC ThingWorx"] },
      { name: "Programming", items: ["Ladder Logic", "FBD", "STL", "SCL", "C#", "Python"] }
    ],
    capabilities: [
      {
        title: "PLC Programming",
        description: "We provide advanced PLC Programming for industrial automation systems. Our expertise includes PLC software development, control logic design, HMI & SCADA integration, process automation, troubleshooting and communication protocol configuration. We deliver reliable, scalable, and efficient automation solutions that improve productivity, reduce errors and ensure smooth industrial operations.",
        icon: Cpu
      },
      {
        title: "SCADA/HMI",
        description: "We provide advanced SCADA and HMI solutions for industrial automation, enabling real-time monitoring, control and process visualization. Our services include SCADA system design, HMI screen development, PLC integration, alarm management, data logging, reporting and remote monitoring. We deliver reliable, user-friendly systems that improve efficiency, safety and overall plant performance.",
        icon: Laptop
      },
      {
        title: "System Integration",
        description: "We provide comprehensive System Integration ensuring seamless coordination between electrical, instrumentation, PLC, SCADA, HMI and control systems. Our expertise includes multi-vendor integration, communication setup, process automation, testing, commissioning and retrofit solutions. We deliver reliable, scalable and centralized automation systems that improve efficiency, communication and overall plant performance.",
        icon: GitBranch
      },
      {
        title: "Commissioning",
        description: "We provide complete Electrical and Instrumentation Commissioning to ensure safe testing, verification and readiness of all systems for operation. Our scope includes pre-commissioning checks, loop testing, functional verification, system energization, control and interlock testing, start-up assistance and performance validation. We ensure smooth, safe and reliable plant commissioning with improved efficiency and reduced operational risks.",
        icon: Zap
      }
    ],
  };

  // Get category name from API data
  const categoryName = automationServiceData?.categoryId?.name || "Automation Services";
  // Get capability image from API data
  const capabilityImage = automationServiceData?.capabilityImage || "/assets/automation.jpg";

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
              backgroundImage: `url(${automationStaticData.hero.bannerImage})`,
              backgroundColor: '#1a1a2e'
            }}
          >
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
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

        {/* Dynamic API Section - Automation Services in 2 Column Format */}
        {loading ? (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading automation services data...</p>
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
        ) : automationServiceData && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* 2 Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Left Column - Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <img 
                    src={automationServiceData.image} 
                    alt={automationServiceData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Column - Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {automationServiceData.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {automationServiceData.description}
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
                Comprehensive automation expertise from programming to commissioning
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left Column - Dropdown Accordion */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <div className="space-y-3">
                  {automationStaticData.capabilities.map((capability, index) => (
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
                    alt="Automation Capabilities"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/automation.jpg";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Service Modals */}
        {automationStaticData.services.map((service) => (
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
                Why Businesses <span className="text-red-600">Trust Us</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3 md:mt-4">
                We deliver excellence through expertise, innovation, and customer-centric approach
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {automationStaticData.whyChooseUs.map((item, index) => (
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
                  Automate Your Success with Industry 4.0 Solutions.
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                  Transform your manufacturing with cutting-edge automation solutions that boost productivity, quality, and efficiency.
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

export default AutomationService;