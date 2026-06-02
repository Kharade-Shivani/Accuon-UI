import React, { useEffect, useState, useRef } from 'react';
import { 
  Shield, 
  Target, 
  Eye, 
  Briefcase, 
  Award, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  ChevronRight,
  GraduationCap,
  Calendar,
  Building2,
  Star,
  Sparkles,
  ChevronLeft,
  FileText,
  BookOpen,
  ThumbsUp
} from 'lucide-react';
import httpClient from '../Api/axios';

const About = () => {
  const [counts, setCounts] = useState({});
  const [statisticsData, setStatisticsData] = useState([]);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);
  const [imageErrors, setImageErrors] = useState({});
  
  // State for API data
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Partner Logos Data - Same as Home page
  const partners = [
    { name: 'Honeywell', logo: '/assets/partners/honeywell.jpg' },
    { name: 'Emerson', logo: '/assets/partners/emerson.jpg' },
     { name: 'Siemens', logo: '/assets/partners/siemens.jpg' },
      { name: 'Pneucon', logo: '/assets/partners/pneucon.jpg' },
    { name: 'Rittal', logo: '/assets/partners/rittal.jpg' },
      { name: 'Rockwell Automation', logo: '/assets/partners/rockwell-automation.jpg' },
    { name: 'Schneider Electric', logo: '/assets/partners/scheinder.jpg' },
    { name: 'ABB', logo: '/assets/partners/abb.jpg' },
    { name: 'Lautriz Knudsen', logo: '/assets/partners/lautriz-knudsen.png' },
    { name: 'Mitsubishi Electric', logo: '/assets/partners/mitsubishi-electric.jpg' },
   ];

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  // Split partners into two rows
  const row1Partners = duplicatedPartners.slice(0, Math.ceil(duplicatedPartners.length / 2));
  const row2Partners = duplicatedPartners.slice(Math.ceil(duplicatedPartners.length / 2));

  // Icon mapping based on description
  const getIconForStat = (description) => {
    const iconMap = {
      'Years of Excellence': TrendingUp,
      'Projects Completed': Briefcase,
      'Happy Clients': Users,
      'Expert Team': Award
    };
    return iconMap[description] || TrendingUp;
  };

  const getColorForStat = (description) => {
    const colorMap = {
      'Years of Excellence': 'red',
      'Projects Completed': 'blue',
      'Happy Clients': 'red',
      'Expert Team': 'blue'
    };
    return colorMap[description] || 'red';
  };

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

  // Handle image error
  const handleImageError = (partnerName) => {
    setImageErrors(prev => ({ ...prev, [partnerName]: true }));
  };

  // Fetch About Us data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__aboutus');
        
        if (response.data.status && response.data.data && response.data.data.length > 0) {
          // Find active/about data
          const activeData = response.data.data.find(
            item => item.status === 'Active' || 
            (item.description && item.description.trim() !== '') ||
            (item.About_us_description && item.About_us_description.trim() !== '')
          );
          
          // Use the first valid data item
          const dataToUse = activeData || response.data.data[0];
          
          if (dataToUse) {
            setAboutData({
              title: dataToUse.title || dataToUse.About_us_title || "",
              description: dataToUse.description || dataToUse.About_us_description || "",
              image: dataToUse.image || dataToUse.About_us_image || ""
            });
          }
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAboutData();
  }, []);

  // Fetch Statistics data from API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await httpClient.get('/get__all__stat__master');
        
        if (response.data.status && response.data.data && response.data.data.length > 0) {
          setStatisticsData(response.data.data);
          
          // Initialize counts state with zeros for each stat
          const initialCounts = {};
          response.data.data.forEach(stat => {
            initialCounts[stat._id] = 0;
          });
          setCounts(initialCounts);
        }
      } catch (err) {
        console.error("Error fetching statistics:", err);
      }
    };
    
    fetchStatistics();
  }, []);

  // Counter animation for statistics
  useEffect(() => {
    if (statisticsData.length === 0) return;
    
    const duration = 2000;
    const steps = 60;
    const intervals = {};
    
    statisticsData.forEach((stat) => {
      const targetValue = stat.title;
      const stepValue = targetValue / steps;
      let current = 0;
      
      intervals[stat._id] = setInterval(() => {
        current += stepValue;
        if (current >= targetValue) {
          setCounts(prev => ({ ...prev, [stat._id]: targetValue }));
          clearInterval(intervals[stat._id]);
        } else {
          setCounts(prev => ({ ...prev, [stat._id]: Math.floor(current) }));
        }
      }, duration / steps);
    });
    
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [statisticsData]);

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(3);
      } else if (window.innerWidth < 1280) {
        setItemsPerSlide(4);
      } else {
        setItemsPerSlide(5);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total slides based on items per slide
  const totalSlides = Math.ceil(partners.length / itemsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Core values data
  const coreValues = [
    { title: 'Quality First', description: 'ISO 9001:2015 certified with uncompromising quality standards', icon: Shield },
    { title: 'Customer Focus', description: 'Client-centric approach with tailored solutions', icon: Users },
    { title: 'Integrity', description: 'Transparent operations and ethical business practices', icon: CheckCircle },
    { title: 'Innovation', description: 'Continuous improvement through cutting-edge technology', icon: Zap },
  ];

  // Milestones
  const milestones = [
    { year: '2017', title: 'Company Founded', description: 'Started operations with a vision for engineering excellence' },
    { year: '2018', title: 'First Major Project', description: 'Completed first turnkey automation project' },
    { year: '2020', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded services to international clients' },
  ];

  // Parse description text from API into paragraphs
  const parseDescriptionParagraphs = (description) => {
    if (!description) return [];
    
    // If description contains newlines, split by them
    if (description.includes('\n')) {
      return description.split('\n').filter(p => p.trim().length > 0);
    }
    
    // Otherwise, return as single paragraph
    return [description];
  };

  // Function to render description with HTML
  const renderDescriptionWithHtml = (text) => {
    if (!text) return null;
    return { __html: text };
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div style={{ paddingTop: `${headerHeight}px` }}>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !aboutData) {
    return (
      <div className="min-h-screen bg-white">
        <div style={{ paddingTop: `${headerHeight}px` }}>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-600 text-lg">Failed to load content. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic padding based on header height - this prevents overlapping */}
      <div style={{ paddingTop: `${headerHeight}px` }}>
        
        {/* Banner Section - with fixed height 400px, overlay, and centered text */}
        <div className="relative w-full h-[400px] overflow-hidden">
          {/* Background Image */}
          <img 
            src="assets/aboutbanner.webp" 
            alt="About Us Banner" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
          {/* Centered Title Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              About Us
            </h1>
          </div>
        </div>

        {/* Hero Section - Content Section */}
        <section className="relative min-h-[400px] md:min-h-[450px] py-8 md:py-10 flex items-center justify-center overflow-hidden bg-white">
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                <span className="text-red-600">Engineering</span>{' '}
                <span className="text-gray-800">Trust in the</span>{' '}
                <span className="text-red-600">Industrial Sector</span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-4 md:px-0">
               Accuon is a trusted Industrial Engineering and Automation partner. We blend deep technical domain expertise with an intimate understanding of complex operational demands.
              </p>
              
              {/* Optional CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-6 md:px-8 py-2.5 md:py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section - Dynamic from API */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {statisticsData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {statisticsData.map((stat, index) => {
                  const StatIcon = getIconForStat(stat.description);
                  const colorType = getColorForStat(stat.description);
                  return (
                    <div
                      key={stat._id}
                      className="text-center p-4 md:p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    >
                      <div className={`inline-flex p-2 md:p-3 rounded-full ${colorType === 'red' ? 'bg-red-50' : 'bg-blue-50'} mb-2 md:mb-4`}>
                        <StatIcon className={`h-5 w-5 md:h-8 md:w-8 ${colorType === 'red' ? 'text-red-600' : 'text-blue-600'}`} />
                      </div>
                      <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${colorType === 'red' ? 'text-red-600' : 'text-blue-600'} mb-1`}>
                        {counts[stat._id] || 0}+
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">{stat.description}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading statistics...</p>
              </div>
            )}
          </div>
        </section>

        {/* Company Overview Section - WITH API INTEGRATION */}
        <section className="py-12 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                  {aboutData.title}
                </h2>
                
                <div className="space-y-3 md:space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                  {aboutData.description && parseDescriptionParagraphs(aboutData.description).map((paragraph, idx) => (
                    <p 
                      key={idx}
                      dangerouslySetInnerHTML={renderDescriptionWithHtml(paragraph)}
                      className="mb-3 md:mb-4"
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative mt-8 lg:mt-0">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-blue-600/10 z-10"></div>
                  <img 
                    src={aboutData.image} 
                    alt="Industrial Engineering"
                    className="w-full h-auto object-cover min-h-[300px] md:min-h-[400px]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Quality Policy Section - Added here */}
        <section className="py-12 md:py-20 bg-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header with gradient border */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
             
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Quality <span className="text-red-600">Policy</span>
              </h2>
              
             
              
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Our unwavering commitment to excellence in every project, every solution, and every client interaction.
              </p>
            </div>

            {/* Main Quality Policy Card */}
            <div className="max-w-5xl mx-auto">
              {/* Company Header with Logo area */}
              <div className="text-center mb-8 md:mb-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Accuon Projects and Engineers India Pvt. Ltd.
                </h3>
                <p className="text-red-600 font-medium mt-1">ISO 9001:2015 Certified</p>
              </div>

              {/* Core Statement Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 mb-8 md:mb-12 text-center shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex p-3 bg-white/10 rounded-full mb-4">
                    <Shield className="h-8 w-8 md:h-10 md:w-10 text-red-400" />
                  </div>
                  <p className="text-white text-lg md:text-xl lg:text-2xl font-medium italic leading-relaxed">
                    "Quality is not just our commitment — it is the foundation of every project we deliver."
                  </p>
                  <div className="mt-4 text-red-400 text-sm">— Management & Leadership Team</div>
                </div>
              </div>

              {/* Policy Points Grid */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                {[
                  { icon: Shield, text: "Delivering reliable, safe, and cost-effective project solutions.", color: "red" },
                  { icon: CheckCircle, text: "Maintaining the highest standards of quality in execution and services.", color: "blue" },
                  { icon: Globe, text: "Ensuring compliance with applicable statutory, regulatory, and client requirements.", color: "red" },
                  { icon: TrendingUp, text: "Continuously improving our processes, systems, and employee competencies.", color: "blue" },
                  { icon: Users, text: "Promoting a culture of safety, innovation, teamwork, and customer satisfaction.", color: "red" },
                  { icon: Handshake, text: "Building long-term relationships with clients, vendors, and stakeholders through trust and professionalism.", color: "blue" }
                ].map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start gap-3 p-4 rounded-xl border-l-4 border-${item.color}-600 bg-gray-50 hover:bg-white transition-all duration-300 hover:shadow-md group`}
                    >
                      <div className={`p-2 rounded-lg bg-${item.color}-50 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`h-5 w-5 text-${item.color}-600`} />
                      </div>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Footer Commitment */}
              <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-5 md:p-6 text-center border border-gray-100">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-red-600" />
                    <span className="text-sm md:text-base font-semibold text-gray-800">Management Commitment</span>
                  </div>
                  <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm md:text-base font-semibold text-gray-800">Employee Dedication</span>
                  </div>
                  <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                    <span className="text-sm md:text-base font-semibold text-gray-800">Continual Improvement</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-4">
                  Our management and employees are dedicated to continual improvement and the effective implementation of the Quality Management System to achieve sustainable growth and operational excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section - Increased font sizes */}
        <section className="py-12 md:py-20 relative overflow-hidden">
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Vision Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl transform transition-all duration-300 hover:scale-105">
                <div className="inline-flex p-2 md:p-3 bg-red-50 rounded-xl mb-4 md:mb-6">
                  <Eye className="h-7 w-7 md:h-9 md:w-9 text-red-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Our Vision</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  To expand our presence across India and international markets by consistently delivering high-quality turnkey solutions and building long-term client partnerships.
                </p>
              </div>
              
              {/* Mission Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl transform transition-all duration-300 hover:scale-105">
                <div className="inline-flex p-2 md:p-3 bg-blue-50 rounded-xl mb-4 md:mb-6">
                  <Target className="h-7 w-7 md:h-9 md:w-9 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Our Mission</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                 To deliver reliable, innovative and cost-effective engineering solutions by combining technical excellence, quality workmanship and customer-focused service. We are committed to building long-term partnerships, ensuring safety, maintaining the highest standards of integrity and contributing to the sustainable growth of industries and infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="relative py-12 md:py-20 overflow-hidden bg-cover bg-center bg-no-repeat">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/img6.jpg" 
              alt="Core values background"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/80 z-0"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-red-50 px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                <span className="text-xs md:text-sm font-semibold text-red-600">Core Values</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                What Drives <span className="text-red-600">Accuon</span>
              </h2>
              <p className="text-sm md:text-base text-gray-300 mt-3 md:mt-4">
                Our guiding principles that shape every decision and action
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100"
                  >
                    <div className="inline-flex p-2 md:p-3 bg-gradient-to-br from-red-50 to-blue-50 rounded-xl mb-3 md:mb-4">
                      <Icon className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
{/* Our Partners Section - Complete card size with maximum logo visibility */}
<section className="py-20 bg-white overflow-hidden">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
        <Users className="h-5 w-5 text-red-600" />
        <span className="text-sm font-semibold text-red-600">Our Partners</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Trusted by Industry <span className="text-red-600">Partners</span>
      </h2>
      <p className="text-gray-600">
        We are proud to partner with world-leading technology providers
      </p>
    </div>

    {/* Row 1 - Sliding Left to Right */}
    <div className="mb-12">
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-left">
          {row1Partners.map((partner, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 w-64 mx-6"
            >
              <div className="bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-200 group overflow-hidden h-48 flex items-center justify-center hover:scale-105 transform">
                <div className="w-full h-full flex items-center justify-center p-4">
                  {!imageErrors[partner.name] ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(partner.name)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center rounded-xl">
                      <Briefcase className="h-20 w-20 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {row1Partners.map((partner, index) => (
            <div
              key={`row1-duplicate-${index}`}
              className="flex-shrink-0 w-64 mx-6"
            >
              <div className="bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-200 group overflow-hidden h-48 flex items-center justify-center hover:scale-105 transform">
                <div className="w-full h-full flex items-center justify-center p-4">
                  {!imageErrors[partner.name] ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(partner.name)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center rounded-xl">
                      <Briefcase className="h-20 w-20 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Row 2 - Sliding Right to Left */}
    <div className="mt-12">
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-right">
          {row2Partners.map((partner, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 w-64 mx-6"
            >
              <div className="bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-200 group overflow-hidden h-48 flex items-center justify-center hover:scale-105 transform">
                <div className="w-full h-full flex items-center justify-center p-4">
                  {!imageErrors[partner.name] ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(partner.name)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center rounded-xl">
                      <Briefcase className="h-20 w-20 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {row2Partners.map((partner, index) => (
            <div
              key={`row2-duplicate-${index}`}
              className="flex-shrink-0 w-64 mx-6"
            >
              <div className="bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-200 group overflow-hidden h-48 flex items-center justify-center hover:scale-105 transform">
                <div className="w-full h-full flex items-center justify-center p-4">
                  {!imageErrors[partner.name] ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(partner.name)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center rounded-xl">
                      <Briefcase className="h-20 w-20 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Leadership Section - With Director Photos */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Meet Our <span className="text-red-600">Directors</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3 md:mt-4">
                Visionary leaders driving engineering excellence
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Director 1 - Samadhan Gadade */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-2 bg-gradient-to-r from-red-600 to-blue-600"></div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Director Photo */}
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
                      <img 
                        src="/assets/Directors/samadhan sir.jpeg" 
                        alt="Mr. Samadhan Gadade"
                        className="w-full h-full object-cover"
                       
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Mr. Samadhan Gadade</h3>
                      <p className="text-red-600 font-semibold text-sm md:text-base">Director & Founder</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-gray-600 text-sm md:text-base">
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Education:</span>
                        <p className="text-gray-600">Diploma and B.E in Electronics & Telecommunication Engineering from Pune University, Maharashtra (2012)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <Briefcase className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Initial Experience:</span>
                        <p className="text-gray-600">6 years managing Engineering and projects operations in various companies (2012-2017)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Current Role:</span>
                        <p className="text-gray-600">Overseeing Marketing, Projects, Planning & Finance operations since 2017</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
                      <Award className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Overall Experience:</span>
                        <p className="text-gray-700 font-medium">14+ years in Electrical, Instrumentation and Automation projects</p>
                        <p className="text-xs text-gray-500 mt-1">Designated as Director & Founder since 2017</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Director 2 - Rahul Auti */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-2 bg-gradient-to-r from-red-600 to-blue-600"></div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Director Photo */}
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
                      <img 
                         src="/assets/Directors/rahul-sir.jpeg" 
                        alt="Mr. Rahul Auti"
                        className="w-full h-full object-cover"
                       
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Mr. Rahul Auti</h3>
                      <p className="text-red-600 font-semibold text-sm md:text-base">Director & Founder</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-gray-600 text-sm md:text-base">
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Education:</span>
                        <p className="text-gray-600">B.E Instrumentation & Control from Pune University, Maharashtra (2010)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <Briefcase className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Initial Experience:</span>
                        <p className="text-gray-600">7 years managing purchases and project operations in various companies (2011-2017)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Current Role:</span>
                        <p className="text-gray-600">Managing Project Planning, Accounts & Purchase operations since 2017</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
                      <Award className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-800">Overall Experience:</span>
                        <p className="text-gray-700 font-medium">15+ years in E&I Project Field</p>
                        <p className="text-xs text-gray-500 mt-1">Designated as Director & Founder since 2017</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
              Ready to Partner with Excellence?
            </h2>
            <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-4">
              Let's discuss how Accuon can help you achieve your industrial engineering and automation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 text-sm md:text-base"
              >
                Contact Us Today
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>
        </section>
      </div>

   {/* Add CSS animations for marquee effect with zoom */}
<style jsx>{`
  @keyframes marquee-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  @keyframes marquee-right {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }
  
  .animate-marquee-left {
    animation: marquee-left 30s linear infinite;
  }
  
  .animate-marquee-right {
    animation: marquee-right 30s linear infinite;
  }
  
  /* Pause animation on hover - cards freeze */
  .animate-marquee-left:hover,
  .animate-marquee-right:hover {
    animation-play-state: paused;
  }
  
  /* Smooth zoom effect on cards */
  .group:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
    z-index: 10;
    position: relative;
  }
`}</style>
    </div>
  );
};

// Add Handshake icon if not already imported
const Handshake = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 11.5C18 14 16 16 13 16H8c-3 0-5-2-5-5s2-5 5-5h4c3 0 5 2 5 5z" />
    <path d="M9 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    <path d="M18 11.5c0 2-1 4-3 4" />
    <path d="M21 11.5c0 3-2 5-5 5" />
    <path d="m17 7.5 2 2" />
    <path d="m19 6.5 2 2" />
    <circle cx="19" cy="15" r="1" />
    <circle cx="21" cy="12" r="1" />
  </svg>
);

export default About;