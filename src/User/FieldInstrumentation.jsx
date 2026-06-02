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
  Gauge,
  Thermometer,
  Droplet,
  Activity,
  Radio,
  Wrench
} from 'lucide-react';
import httpClient from '../Api/axios';

function FieldInstrumentation() {
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
  const [fieldInstrumentationData, setFieldInstrumentationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch field instrumentation data from API
  useEffect(() => {
    const fetchFieldInstrumentationData = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__service__subcategory');
        
        if (response.data && response.data.status && response.data.data) {
          // Find the specific service with title "Field instrumentation"
          const fieldInstrumentation = response.data.data.find(
            item => item.title === "Field instrumentation"
          );
          
          if (fieldInstrumentation) {
            setFieldInstrumentationData(fieldInstrumentation);
          } else {
            setError("Field instrumentation data not found");
          }
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching field instrumentation data:", err);
        setError("Failed to load field instrumentation data");
      } finally {
        setLoading(false);
      }
    };

    fetchFieldInstrumentationData();
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

  // Field Instrumentation Static Data
  const fieldInstrumentationStaticData = {
    hero: {
      bannerImage: "/assets/fieldbanner.webp"
    },
    
    services: [
      {
        id: "pressure-instrumentation",
        title: "Pressure Measurement",
        description: "Precision pressure measurement solutions including transmitters, gauges, and switches for critical applications.",
        icon: Gauge,
        features: [
          "Pressure transmitter installation",
          "Digital pressure gauges",
          "Pressure switches and controllers",
          "Differential pressure measurement",
          "Vacuum pressure monitoring"
        ],
        longDescription: "Our pressure measurement solutions provide accurate, reliable data for critical process control. We supply and install a complete range of pressure instrumentation including smart transmitters, pressure gauges, switches, and differential pressure transmitters. These devices are essential for monitoring and controlling pressure in pipelines, vessels, tanks, and various industrial equipment."
      },
      {
        id: "temperature-instrumentation",
        title: "Temperature Measurement",
        description: "Comprehensive temperature sensing solutions using thermocouples, RTDs, and thermal imaging.",
        icon: Thermometer,
        features: [
          "RTD and thermocouple installation",
          "Temperature transmitters",
          "Infrared temperature sensors",
          "Thermal imaging cameras",
          "Temperature switches and controllers"
        ],
        longDescription: "Temperature measurement is critical for process efficiency and product quality. We provide end-to-end temperature instrumentation solutions including thermocouples, RTDs, thermowells, temperature transmitters, and infrared sensors. Our solutions ensure precise temperature monitoring from -200°C to 2000°C, suitable for industrial furnaces, reactors, HVAC systems, and storage facilities."
      },
      {
        id: "flow-instrumentation",
        title: "Flow Measurement",
        description: "Advanced flow metering solutions for liquids, gases, and steam with high accuracy.",
        icon: Droplet,
        features: [
          "Electromagnetic flow meters",
          "Ultrasonic flow meters",
          "Coriolis mass flow meters",
          "Vortex and turbine meters",
          "Thermal mass flow meters"
        ],
        longDescription: "Our flow measurement solutions help optimize process efficiency and reduce waste. We offer a comprehensive range of flow meters including electromagnetic, ultrasonic, Coriolis, vortex, and thermal mass flow meters suitable for various applications. From water and chemicals to oil and gas, our solutions ensure accurate flow measurement for both liquids and gases."
      },
      {
        id: "level-instrumentation",
        title: "Level Measurement",
        description: "Reliable level monitoring solutions for solids, liquids, and interface detection.",
        icon: Activity,
        features: [
          "Radar level transmitters",
          "Ultrasonic level sensors",
          "Guided wave radar",
          "Capacitance level switches",
          "Hydrostatic level measurement"
        ],
        longDescription: "Accurate level measurement is essential for inventory management and process control. We provide advanced level instrumentation including radar, ultrasonic, guided wave radar, capacitance, and hydrostatic level transmitters. Our solutions work for both liquids and solids, handling challenging conditions like high temperature, high pressure, corrosive media, and dusty environments."
      },
      {
        id: "analytical-instrumentation",
        title: "Analytical Instrumentation",
        description: "Process analysis solutions including pH, conductivity, dissolved oxygen, and turbidity measurement.",
        icon: Radio,
        features: [
          "pH and ORP analyzers",
          "Conductivity meters",
          "Dissolved oxygen sensors",
          "Turbidity analyzers",
          "Gas analyzers"
        ],
        longDescription: "Analytical instrumentation ensures product quality and regulatory compliance. We offer process analyzers for pH, ORP, conductivity, dissolved oxygen, turbidity, and gas analysis. These instruments are critical in water treatment, pharmaceutical manufacturing, food and beverage production, chemical processing, and power generation applications."
      },
      {
        id: "calibration-services",
        title: "Calibration Services",
        description: "ISO-compliant calibration services for all field instruments ensuring accuracy and reliability.",
        icon: Wrench,
        features: [
          "On-site calibration services",
          "Laboratory calibration",
          "Calibration certification",
          "Loop checking and validation",
          "Calibration management software"
        ],
        longDescription: "Regular calibration is essential for maintaining instrument accuracy and process reliability. Our calibration services are performed using NIST-traceable standards in our ISO-certified lab or on-site at your facility. We provide complete calibration documentation, asset management, and scheduling services to ensure your instruments always perform within specified tolerances."
      }
    ],
    whyChooseUs: [
      {
        title: "Precision & Accuracy",
        description: "We deliver the highest level of measurement accuracy for critical process control.",
        icon: Target
      },
      {
        title: "Certified Experts",
        description: "Our technicians are certified in instrument calibration and troubleshooting.",
        icon: Award
      },
      {
        title: "Leading Brands",
        description: "We partner with world-class manufacturers like Emerson, Yokogawa, Endress+Hauser.",
        icon: Shield
      },
      {
        title: "On Time Support",
        description: "Round-the-clock technical support for emergency field service needs.",
        icon: Clock
      },
      {
        title: "Comprehensive Solutions",
        description: "From installation to calibration and maintenance, we do it all.",
        icon: Settings
      },
      {
        title: "Industry Compliance",
        description: "All services comply with ISA, IEC, and ATEX standards.",
        icon: Lock
      }
    ],
    process: [
      {
        step: "01",
        title: "Site Assessment",
        description: "We evaluate your process conditions and measurement requirements to recommend optimal instruments.",
        duration: "1 week"
      },
      {
        step: "02",
        title: "Instrument Selection",
        description: "Selection of appropriate instruments based on accuracy, range, material compatibility, and environmental factors.",
        duration: "1-2 weeks"
      },
      {
        step: "03",
        title: "Installation",
        description: "Professional installation including mounting, piping, wiring, and proper grounding.",
        duration: "1-3 weeks"
      },
      {
        step: "04",
        title: "Configuration & Calibration",
        description: "Parameter configuration, range setting, and initial calibration for optimal performance.",
        duration: "1 week"
      },
      {
        step: "05",
        title: "Loop Checking",
        description: "Complete loop verification from sensor to control system to ensure proper communication.",
        duration: "1 week"
      },
      {
        step: "06",
        title: "Documentation & Training",
        description: "Comprehensive documentation including as-built drawings, calibration certificates, and operator training.",
        duration: "1 week"
      }
    ],
    technologies: [
      { name: "Pressure", items: ["Smart Pressure Transmitters", "Differential Pressure", "Absolute Pressure", "Vacuum Gauges"] },
      { name: "Temperature", items: ["RTD", "Thermocouple", "Infrared", "Fiber Optic"] },
      { name: "Flow", items: ["Magnetic", "Ultrasonic", "Coriolis", "Vortex", "Turbine"] },
      { name: "Level", items: ["Radar", "Ultrasonic", "Guided Wave Radar", "Capacitance", "Hydrostatic"] },
      { name: "Analytical", items: ["pH/ORP", "Conductivity", "DO", "Turbidity", "Gas Analyzers"] },
      { name: "Communication", items: ["4-20mA", "HART", "Foundation Fieldbus", "Profibus", "Modbus"] }
    ],
    capabilities: [
      {
        title: "Installation",
        description: "We provide specialized Field Instrument Installation services for industrial automation and process control systems. Our scope includes installation of transmitters, sensors, flow and level instruments, impulse tubing, cable laying and termination. We also support calibration, loop checking and integration with PLC/SCADA systems, ensuring accurate measurement, reliable control and efficient plant operation.",
        icon: Settings
      },
      {
        title: "Calibration",
        description: "We provide professional Field Instrument Calibration services to ensure accuracy and reliable performance of industrial measurement systems. Our scope includes on-site and bench calibration of transmitters, sensors, flow and level instruments along with loop checking, testing and adjustment. We also provide calibration certificates and traceable documentation, ensuring compliance, improved accuracy and safe efficient plant operations.",
        icon: Target
      },
      {
        title: "Maintenance",
        description: "We provide comprehensive Field Instrument Maintenance to ensure reliable and continuous operation of industrial instrumentation systems. Our scope includes preventive and corrective maintenance, routine inspections, calibration support, loop checking, signal verification, and spare replacement. We focus on minimizing downtime, improving accuracy, and enhancing system performance for safe and efficient plant operations.",
        icon: Wrench
      },
      {
        title: "Troubleshooting",
        description: "We provide specialized Field Instrumentation Troubleshooting services to quickly identify and resolve issues in industrial control systems. Our scope includes signal fault diagnosis, instrument failure analysis, loop and wiring checks, PLC/DCS/SCADA interface troubleshooting and calibration error detection. We ensure rapid root-cause identification to minimize downtime, improve reliability and maintain safe and efficient plant operations. ",
        icon: Zap
      }
    ],
  };

  // Get category name from API data
  const categoryName = fieldInstrumentationData?.categoryId?.name || "Field Instrumentation";
  // Get capability image from API data
  const capabilityImage = fieldInstrumentationData?.capabilityImage || "/assets/field instrumentation.webp";

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
              backgroundImage: `url(${fieldInstrumentationStaticData.hero.bannerImage})`,
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

        {/* Dynamic API Section - Field Instrumentation in 2 Column Format */}
        {loading ? (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading field instrumentation data...</p>
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
        ) : fieldInstrumentationData && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* 2 Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Left Column - Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <img 
                    src={fieldInstrumentationData.image} 
                    alt={fieldInstrumentationData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Column - Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {fieldInstrumentationData.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {fieldInstrumentationData.description}
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
                Comprehensive field instrumentation expertise from installation to maintenance
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left Column - Dropdown Accordion */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <div className="space-y-3">
                  {fieldInstrumentationStaticData.capabilities.map((capability, index) => (
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
                    alt="Field Instrumentation Capabilities"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/field instrumentation.webp";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Service Modals */}
        {fieldInstrumentationStaticData.services.map((service) => (
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
                We deliver excellence through precision, reliability, and customer-centric approach
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {fieldInstrumentationStaticData.whyChooseUs.map((item, index) => (
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
                  Precision Measurement for Peak Performance.
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                  Trust our instrumentation experts to deliver accurate, reliable, and compliant field measurement solutions for your critical processes.
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

export default FieldInstrumentation;