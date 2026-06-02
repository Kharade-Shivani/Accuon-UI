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
  Server,
  Globe,
  Lock,
  TrendingUp,
} from 'lucide-react';
import httpClient from '../Api/axios';

function TurnkeySolutions() {
  const [headerHeight, setHeaderHeight] = useState(0);
  // State for API data
  const [turnkeyServiceData, setTurnkeyServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch turnkey solutions data from API
  useEffect(() => {
    const fetchTurnkeyData = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__service__subcategory');
        
        if (response.data && response.data.status && response.data.data) {
          // Find the specific service with title "Turnkey solutions - E&I"
          const turnkeyService = response.data.data.find(
            item => item.title === "Turnkey solutions - E&I"
          );
          
          if (turnkeyService) {
            setTurnkeyServiceData(turnkeyService);
          } else {
            setError("Turnkey solutions data not found");
          }
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching turnkey data:", err);
        setError("Failed to load turnkey solutions data");
      } finally {
        setLoading(false);
      }
    };

    fetchTurnkeyData();
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

  // Turnkey Solutions Data (Static data remains as is)
  const turnkeyData = {
    hero: {
      bannerImage: "/assets/turnkeybanner.jpg"
    },
   
    services: [
      {
        id: "it-infrastructure",
        title: "IT Infrastructure Setup",
        description: "Complete hardware and software installation, configuration, and deployment for optimal performance.",
        icon: Server,
        features: [
          "Server deployment and configuration",
          "Network setup and optimization",
          "Workstation installation",
          "Cabling and physical infrastructure",
          "Hardware procurement and setup"
        ],
        longDescription: "Our IT infrastructure setup service provides end-to-end solutions for businesses of all sizes. From planning and procurement to installation and configuration, we ensure your IT environment is robust, secure, and scalable. We handle everything from server rooms to individual workstations, ensuring seamless integration with your existing systems."
      },
      {
        id: "cloud-solutions",
        title: "Cloud Solutions",
        description: "Seamless cloud migration, hybrid cloud setup, and cloud-native application deployment.",
        icon: Cloud,
        features: [
          "Cloud migration strategy",
          "AWS/Azure/Google Cloud setup",
          "Hybrid cloud architecture",
          "Cloud security implementation",
          "Cost optimization"
        ],
        longDescription: "Transform your business with our comprehensive cloud solutions. We help you leverage the power of cloud computing through strategic migration, modern architecture design, and ongoing management. Whether you're moving to public cloud, private cloud, or a hybrid approach, our team ensures a smooth transition with minimal disruption to your operations."
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity Implementation",
        description: "Comprehensive security solutions including firewalls, endpoint protection, and compliance setup.",
        icon: Shield,
        features: [
          "Network security configuration",
          "Endpoint protection deployment",
          "Security audit and compliance",
          "Data encryption setup",
          "Threat monitoring systems"
        ],
        longDescription: "Protect your digital assets with our enterprise-grade cybersecurity solutions. We implement layered security architectures that defend against modern threats while ensuring regulatory compliance. From initial assessment to ongoing monitoring, we provide complete protection for your IT infrastructure, data, and users."
      },
      {
        id: "network-solutions",
        title: "Network Solutions",
        description: "End-to-end networking solutions including LAN/WAN, wireless, and SD-WAN implementation.",
        icon: Globe,
        features: [
          "LAN/WAN design and setup",
          "Wireless network deployment",
          "SD-WAN implementation",
          "Network security integration",
          "Performance monitoring"
        ],
        longDescription: "Our network solutions ensure reliable, high-performance connectivity across your organization. We design and implement robust network architectures that support your business operations, from local area networks to wide area connections. With advanced security features and monitoring tools, we keep your network running smoothly On Time."
      },
      {
        id: "software-solutions",
        title: "Software Integration",
        description: "Custom software deployment, ERP implementation, and third-party integration services.",
        icon: Cpu,
        features: [
          "ERP and CRM implementation",
          "Custom software deployment",
          "API integration services",
          "Legacy system migration",
          "Application testing and QA"
        ],
        longDescription: "Streamline your business operations with our software integration expertise. We help you select, deploy, and integrate the right software solutions for your unique needs. From enterprise resource planning to customer relationship management, we ensure seamless integration between all your business applications."
      },
      {
        id: "digital-transformation",
        title: "Digital Transformation",
        description: "Complete digital transformation roadmap and implementation for modern business operations.",
        icon: TrendingUp,
        features: [
          "Digital strategy development",
          "Process automation",
          "Legacy system modernization",
          "Employee training programs",
          "Change management support"
        ],
        longDescription: "Future-proof your business with our digital transformation services. We help you leverage modern technologies to optimize operations, enhance customer experiences, and drive innovation. Our comprehensive approach includes strategy development, technology selection, implementation, and organizational change management."
      }
    ],
    whyChooseUs: [
      {
        title: "End-to-End Solutions",
        description: "We manage everything from planning and procurement to deployment and ongoing support.",
        icon: Target
      },
      {
        title: "Certified Experts",
        description: "Our team holds top certifications from leading technology vendors and industry bodies.",
        icon: Award
      },
      {
        title: "Proven Methodology",
        description: "Our structured approach ensures timely delivery, quality assurance, and minimal disruption.",
        icon: Settings
      },
      {
        title: "On Time Support",
        description: "Round-the-clock technical support and monitoring for your critical infrastructure.",
        icon: Clock
      },
      {
        title: "Scalable Solutions",
        description: "Solutions designed to grow with your business, adapting to changing needs.",
        icon: BarChart3
      },
      {
        title: "Security First",
        description: "Security built into every layer of our solutions, from design to deployment.",
        icon: Lock
      }
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Assessment",
        description: "We analyze your current infrastructure, business goals, and requirements to create a tailored solution plan.",
        duration: "1-2 weeks"
      },
      {
        step: "02",
        title: "Solution Design",
        description: "Our architects design a comprehensive solution including hardware, software, and network specifications.",
        duration: "1-3 weeks"
      },
      {
        step: "03",
        title: "Procurement & Setup",
        description: "We source all necessary components and begin the initial setup in our lab environment.",
        duration: "2-4 weeks"
      },
      {
        step: "04",
        title: "Deployment & Integration",
        description: "Seamless on-site deployment and integration with your existing systems and processes.",
        duration: "1-3 weeks"
      },
      {
        step: "05",
        title: "Testing & Optimization",
        description: "Rigorous testing, performance tuning, and security validation before go-live.",
        duration: "1-2 weeks"
      },
      {
        step: "06",
        title: "Training & Handover",
        description: "Comprehensive training for your team and detailed documentation for ongoing management.",
        duration: "1 week"
      }
    ],
    technologies: [
      { name: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud", "Oracle Cloud"] },
      { name: "Networking", items: ["Cisco", "Juniper", "Aruba", "Fortinet"] },
      { name: "Security", items: ["Palo Alto", "CrowdStrike", "McAfee", "Symantec"] },
      { name: "Virtualization", items: ["VMware", "Hyper-V", "KVM", "Nutanix"] },
      { name: "Databases", items: ["Oracle", "SQL Server", "MySQL", "MongoDB"] },
      { name: "Monitoring", items: ["SolarWinds", "Nagios", "Zabbix", "Datadog"] }
    ],
    capabilities: [
      {
        title: "Design",
        description: "We deliver innovative engineering design solutions for industrial automation and electrical systems. Our expertise includes electrical system design, MCC/PCC/APFC/PLC panel design, PLC & SCADA development, VFD applications, SLD & GA drawings, wiring schematics, cable sizing and instrumentation design. We also provide BOM preparation, technical documentation and AutoCAD-based drawings. Our focus is on delivering safe, efficient, and customized solutions that meet industry standards and client requirements with reliability and precision.",
        icon: Settings
      },
      {
        title: "Engineering",
        description: "We provide reliable and customized engineering solutions for industrial and automation applications. Our expertise includes electrical and automation Engineering, PLC, SCADA & VFD systems, MCC/PCC/APFC panel engineering, instrumentation and process control solutions. We also specialize in system integration, electrical design, technical documentation, testing, commissioning, retrofit projects and energy-efficient solutions. With a focus on quality, innovation, and performance, we deliver efficient systems that meet diverse industrial requirements.",
        icon: Cpu
      },
      {
        title: "Supply",
        description: "We supply reliable industrial electrical and automation products including VFDs, PLC/SCADA systems, panels, switchgear, sensors, cables and control devices. We deliver complete, high-quality solutions tailored to project requirements for efficient industrial operations.",
        icon: Briefcase
      },
      {
        title: "Installation & Erection",
        description: "We provide professional installation and erection services for industrial electrical and automation systems. Our expertise includes panel installation, PLC/SCADA/VFD setup, cable laying, field instrumentation, wiring, motor integration, earthing, testing, commissioning and retrofit support with a strong focus on safety and quality.",
        icon: Zap
      }
    ],
  };

  // Get category name from API data
  const categoryName = turnkeyServiceData?.categoryId?.name || "Turnkey solutions - E&I";
  // Get capability image from API data
  const capabilityImage = turnkeyServiceData?.capabilityImage || "/assets/turnkey.jpg";

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
              backgroundImage: `url(${turnkeyData.hero.bannerImage})`,
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

        {/* Dynamic API Section - Turnkey Solutions - E&I in 2 Column Format (KEPT) */}
        {loading ? (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading turnkey solutions...</p>
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
        ) : turnkeyServiceData && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* 2 Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Left Column - Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <img 
                    src={turnkeyServiceData.image} 
                    alt={turnkeyServiceData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Column - Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {turnkeyServiceData.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {turnkeyServiceData.description}
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
                End-to-end solutions delivered with precision and expertise
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left Column - Dropdown Accordion */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <div className="space-y-3">
                  {turnkeyData.capabilities.map((capability, index) => (
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
                    alt="Our Capabilities"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/turnkey.jpg";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Service Modals */}
        {turnkeyData.services.map((service) => (
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
                We deliver excellence through expertise, reliability, and customer-centric approach
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {turnkeyData.whyChooseUs.map((item, index) => (
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
                  Transforming Ideas Into Digital Power.
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                  Join businesses and innovators who trust Accuon to build smarter, faster, and more impactful solutions.
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

export default TurnkeySolutions;