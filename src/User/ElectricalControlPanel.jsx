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
  Power,
  Box,
  Wifi,
  AlertTriangle,
  Layers,
  Gauge
} from 'lucide-react';
import httpClient from '../Api/axios';

function ElectricalControlPanel() {
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
  const [electricalPanelData, setElectricalPanelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch electrical control panel data from API
  useEffect(() => {
    const fetchElectricalPanelData = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__service__subcategory');
        
        if (response.data && response.data.status && response.data.data) {
          // Find the specific service with title "Electrical control panel"
          const electricalPanel = response.data.data.find(
            item => item.title === "Electrical control panel"
          );
          
          if (electricalPanel) {
            setElectricalPanelData(electricalPanel);
          } else {
            setError("Electrical control panel data not found");
          }
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching electrical control panel data:", err);
        setError("Failed to load electrical control panel data");
      } finally {
        setLoading(false);
      }
    };

    fetchElectricalPanelData();
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

  // Electrical Control Panel Static Data
  const electricalPanelStaticData = {
    hero: {
      bannerImage: "/assets/electricalcontrolbanner.webp"
    },
   
    services: [
      {
        id: "pcc-panels",
        title: "PCC Panels (Power Control Center)",
        description: "Heavy-duty power control panels for main power distribution and motor control in industrial applications.",
        icon: Power,
        features: [
          "Main power distribution up to 11kV",
          "Motor control centers (MCC)",
          "Feeder protection systems",
          "Busbar arrangement and sizing",
          "Short circuit protection"
        ],
        longDescription: "Power Control Center (PCC) panels are the backbone of industrial electrical distribution. Our PCC panels are designed for heavy-duty applications, providing reliable power distribution, motor control, and protection for large industrial facilities. These panels feature high short-circuit withstand capacity, modular construction, and advanced protection relays. We customize PCC panels to meet your specific load requirements, from 415V to 11kV systems."
      },
      {
        id: "mcc-panels",
        title: "MCC Panels (Motor Control Center)",
        description: "Comprehensive motor control solutions with starters, VFDs, and soft starters for industrial motors.",
        icon: Settings,
        features: [
          "DOL and star-delta starters",
          "VFD and soft starter integration",
          "Motor protection relays",
          "Remote monitoring capability",
          "Energy efficiency optimization"
        ],
        longDescription: "Motor Control Center (MCC) panels provide centralized control and protection for electric motors in industrial processes. Our MCC panels feature modular draw-out construction, making maintenance easy and safe. We integrate various starter types including DOL, star-delta, auto-transformer, VFDs, and soft starters. Each motor feeder includes comprehensive protection against overload, short circuit, phase failure, and ground faults."
      },
      {
        id: "apfc-panels",
        title: "APFC Panels",
        description: "Automatic Power Factor Correction panels to optimize power quality and reduce electricity costs.",
        icon: Gauge,
        features: [
          "Automatic capacitor bank switching",
          "Real-time power factor monitoring",
          "Harmonic filtering options",
          "Intelligent controller with display",
          "Up to 0.99 power factor maintenance"
        ],
        longDescription: "Automatic Power Factor Correction (APFC) panels help industries reduce electricity bills and improve power quality. Our APFC panels continuously monitor the power factor and automatically switch capacitor banks to maintain optimal power factor (typically 0.95-0.99). This reduces reactive power demand from the utility, lowers kVA charges, and reduces line losses. We also offer harmonic filter integration for VFD-heavy installations."
      },
      {
        id: "control-panels",
        title: "PLC Control Panels",
        description: "Custom control panels integrating PLC, HMI, and SCADA systems for process automation.",
        icon: Cpu,
        features: [
          "PLC and HMI integration",
          "SCADA connectivity",
          "Remote I/O modules",
          "Industrial communication protocols",
          "Custom programming"
        ],
        longDescription: "Our PLC control panels serve as the brain of your automated processes. We design and build custom control panels integrating PLCs from leading brands (Siemens, Allen Bradley, Schneider, Mitsubishi) with HMI touch screens and SCADA connectivity. These panels control complex industrial processes with precision, providing real-time monitoring, data logging, and remote access capabilities."
      },
      {
        id: "distribution-boards",
        title: "Distribution Boards (DB)",
        description: "LV distribution boards and final distribution panels for commercial and industrial applications.",
        icon: Layers,
        features: [
          "Single and three-phase distribution",
          "Modular MCB/MCCB configuration",
          "Surge protection devices",
          "Energy metering options",
          "Compact, space-saving design"
        ],
        longDescription: "Distribution Boards (DB) are essential for final power distribution within facilities. Our DBs range from small single-phase boards for commercial buildings to large three-phase distribution panels for industrial plants. Each board is built with high-quality MCBs, MCCBs, RCCBs, and surge protection devices. We offer both flush-mount and surface-mount enclosures with options for transparent doors and energy metering."
      },
      {
        id: "custom-panels",
        title: "Custom & Special Purpose Panels",
        description: "Tailor-made electrical panels for unique applications including synchronizing, automatic transfer switches, and more.",
        icon: Zap,
        features: [
          "Automatic transfer switches (ATS)",
          "Generator synchronizing panels",
          "Pump control panels",
          "Lighting control panels",
          "HVAC control panels"
        ],
        longDescription: "Not every application fits standard panel designs. Our custom panel service delivers solutions for unique requirements including automatic transfer switches (ATS) for backup power, generator synchronizing panels for parallel operation, pump control panels with level sensors, lighting control systems, and HVAC control panels. We work closely with you to understand your specific needs and deliver a perfectly matched solution."
      }
    ],
    whyChooseUs: [
      {
        title: "Design Expertise",
        description: "Our engineers have deep expertise in electrical panel design and standards compliance.",
        icon: Target
      },
      {
        title: "Quality Components",
        description: "We use only premium components from trusted brands like Siemens, Schneider, ABB, and L&T.",
        icon: Shield
      },
      {
        title: "Factory Testing",
        description: "Every panel undergoes rigorous factory acceptance testing before delivery.",
        icon: CheckCircle
      },
      {
        title: "IS/IEC Compliance",
        description: "All panels comply with relevant Indian and international standards (IS, IEC, NEMA).",
        icon: Award
      },
      {
        title: "Quick Turnaround",
        description: "Efficient manufacturing processes ensure timely delivery without quality compromise.",
        icon: Clock
      },
      {
        title: "On-site Support",
        description: "Professional installation, commissioning, and maintenance services available.",
        icon: Settings
      }
    ],
    process: [
      {
        step: "01",
        title: "Requirement Analysis",
        description: "We analyze your load requirements, environmental conditions, and application needs.",
        duration: "1 week"
      },
      {
        step: "02",
        title: "Design & Engineering",
        description: "Detailed design including single line diagrams, GA drawings, schematics, and component selection.",
        duration: "1-2 weeks"
      },
      {
        step: "03",
        title: "Component Procurement",
        description: "Sourcing of high-quality components from approved vendors.",
        duration: "1-3 weeks"
      },
      {
        step: "04",
        title: "Fabrication & Assembly",
        description: "Panel fabrication, component mounting, busbar fabrication, and wiring.",
        duration: "2-4 weeks"
      },
      {
        step: "05",
        title: "Testing & Quality Control",
        description: "Comprehensive testing including insulation resistance, continuity, and functional testing.",
        duration: "1 week"
      },
      {
        step: "06",
        title: "Delivery & Commissioning",
        description: "Safe delivery, installation, and on-site commissioning support.",
        duration: "1 week"
      }
    ],
    technologies: [
      { name: "Switchgear", items: ["Circuit Breakers", "Contactors", "Relays", "Fuses"] },
      { name: "Protection Devices", items: ["MCB", "MCCB", "ACB", "RCCB", "MPCB"] },
      { name: "Control Components", items: ["PLCs", "HMIs", "Timers", "Relays"] },
      { name: "Power Components", items: ["Busbars", "Cables", "Terminals", "CTs/VTs"] },
      { name: "Metering", items: ["Energy Meters", "Power Meters", "Transducers", "Ampere/Volt Meters"] }
    ],
    capabilities: [
      {
        title: "Design",
        description: "We provide end-to-end Electrical Control Panel solutions including design, engineering, manufacturing support, testing, installation and commissioning for industrial automation and power systems. Our scope covers MCC, PCC, PLC, VFD panels and distribution boards with detailed GA drawings, wiring schematics and component integration. We ensure IEC/IS compliance, reliable performance, and safe, efficient operation for industrial applications.",
        icon: Settings
      },
      {
        title: "Fabrication",
        description: "We provide high-quality Fabrication services for industrial electrical, instrumentation and structural needs. Our scope includes cable trays, supports, frames, platforms, control panel enclosures and cable management systems. We also offer site fabrication, modifications and surface treatments like painting and galvanizing, ensuring strong, durable and precise solutions that meet industrial standards and project requirements.",
        icon: Box
      },
      {
        title: "Assembly & Wiring",
        description: "We provide precise Assembly & Wiring services for electrical control panels and automation systems. Our scope includes panel assembly, internal wiring of MCC/PCC/PLC/VFD panels, cable termination, and wiring as per approved schematics. We ensure proper labeling, testing, continuity checks, and compliance with IEC/IS standards for safe, reliable, and efficient system operation.",
        icon: Zap
      },
      {
        title: "Testing",
        description: "We provide comprehensive Electrical & Instrumentation Testing to ensure safe, reliable, and compliant system performance before commissioning. Our scope includes pre-commissioning checks, insulation and continuity testing, functional and protection system testing and instrumentation loop checks. We also support FAT and SAT activities, ensuring accurate validation, improved safety and dependable long-term operation of industrial systems. ",
        icon: CheckCircle
      }
    ],
  };

  // Get category name from API data
  const categoryName = electricalPanelData?.categoryId?.name || "Electrical Control Panel";
  // Get capability image from API data
  const capabilityImage = electricalPanelData?.capabilityImage || "/assets/controlpanel.webp";

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
              backgroundImage: `url(${electricalPanelStaticData.hero.bannerImage})`,
              backgroundColor: '#1a1a2e'
            }}
          >
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70"></div>
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

        {/* Dynamic API Section - Electrical Control Panel in 2 Column Format */}
        {loading ? (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading electrical control panel data...</p>
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
        ) : electricalPanelData && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* 2 Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Left Column - Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <img 
                    src={electricalPanelData.image} 
                    alt={electricalPanelData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Column - Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {electricalPanelData.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {electricalPanelData.description !== "Electrical control panel" 
                      ? electricalPanelData.description 
                      : "Electrical control panels are the nerve centers of industrial power distribution and control systems. We design, manufacture, and supply high-quality electrical panels including PCC, MCC, APFC, PLC control panels, and distribution boards. Our panels are built with premium components, comply with international standards, and undergo rigorous testing to ensure safety, reliability, and optimal performance for your industrial applications."}
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
                End-to-end electrical panel manufacturing with precision and quality
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left Column - Dropdown Accordion */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <div className="space-y-3">
                  {electricalPanelStaticData.capabilities.map((capability, index) => (
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
                    alt="Electrical Panel Capabilities"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/controlpanel.webp";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Service Modals */}
        {electricalPanelStaticData.services.map((service) => (
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
                We deliver excellence through quality, reliability, and customer-centric approach
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {electricalPanelStaticData.whyChooseUs.map((item, index) => (
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
                  Power Your Operations with Reliable Control Panels.
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                  Get customized, high-quality electrical control panels designed to meet your specific industrial requirements.
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

export default ElectricalControlPanel;