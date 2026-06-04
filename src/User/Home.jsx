import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight,
  Headphones,
  CheckCircle, 
  Clock, 
  Users, 
  Award, 
  Zap, 
  Shield,
  ChevronRight,
  Star,
  Quote,
  Calendar,
  TrendingUp,
  Briefcase,
  Settings,
  Cpu,
  Factory,
  HardHat,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  User,
  Video,
  Image as ImageIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import httpClient from '../Api/axios';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Map controller component to set view
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const Home = () => {
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  
  // New state for banners
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(80); // Default header height

  // New state for testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState(null);

  // New state for news & announcements
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);
  
  // New state for video controls
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef({});

  // New state for fullscreen modal
  const [fullscreenMedia, setFullscreenMedia] = useState(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // New state for certifications master
  const [certificationsMaster, setCertificationsMaster] = useState([]);
  const [loadingCertifications, setLoadingCertifications] = useState(true);
  const [certificationsError, setCertificationsError] = useState(null);

  // New state for About Us data
  const [aboutData, setAboutData] = useState(null);
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [aboutError, setAboutError] = useState(null);

  // New state for clients
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [clientsError, setClientsError] = useState(null);

  // New state for Why Choose Us
  const [whyChooseUsData, setWhyChooseUsData] = useState([]);
  const [loadingWhyChooseUs, setLoadingWhyChooseUs] = useState(true);
  const [whyChooseUsError, setWhyChooseUsError] = useState(null);

  // New state for Accreditations
  const [accreditationsData, setAccreditationsData] = useState([]);
  const [loadingAccreditations, setLoadingAccreditations] = useState(true);
  const [accreditationsError, setAccreditationsError] = useState(null);

 // Project locations
const projectLocations = [
  {
    company: "INDORAMA CORPORATION",
    country: "RUSSIA",
    lat: 55.7558,
    lng: 37.6173,
    isSpecial: false
  },
  {
    company: "INDORAMA CORPORATION",
    country: "GEORGIA",  // Fixed spelling from "GEROGIA"
    lat: 41.7151,
    lng: 44.8271,
    isSpecial: false
  },
  {
    company: "TACO.CO",
    country: "TURKEY",
    lat: 39.9334,
    lng: 32.8597,
    isSpecial: false
  },
  {
    company: "GCI",
    country: "SAUDI ARABIA",
    lat: 24.7136,
    lng: 46.6753,
    isSpecial: false
  },
  {
    company: "FARABI",
    country: "SAUDI ARABIA",
    lat: 21.4858,
    lng: 39.1925,
    isSpecial: false
  },
  {
    company: "JOSEPH",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    isSpecial: false
  },
  {
    company: "KEYBOUT",
    country: "TANZANIA",  // Fixed spelling from "TANZANIYA"
    lat: -6.7924,
    lng: 39.2083,
    isSpecial: false
  },
  {
    company: "SENGENG",
    country: "SINGAPORE",
    lat: 1.3521,
    lng: 103.8198,
    isSpecial: false
  },
  // New India location with 100+ projects
  {
    company: "ACCUON PROJECTS & ENGINEERS",
    country: "INDIA",
    city: "Pune, Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    isSpecial: true,
    projectsCount: "100+"
  }
];

  // Get header height dynamically
  useEffect(() => {
    const getHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    
    getHeaderHeight();
    window.addEventListener('resize', getHeaderHeight);
    return () => window.removeEventListener('resize', getHeaderHeight);
  }, []);

  // Services Data
  const services = [
    {
      icon: Settings,
      title: 'Turnkey Projects',
      description: 'Complete end-to-end project execution from concept to commissioning',
      subtext: 'Electrical • Instrumentation • Automation',
      color: 'red'
    },
    {
      icon: Cpu,
      title: 'Industrial Automation',
      description: 'PLC, DCS, SCADA systems for process optimization',
      color: 'blue'
    },
    {
      icon: Factory,
      title: 'Control Panel Manufacturing',
      description: 'Customized control panels as per industry standards (PCC,MCC,PLC,DCS,VFD & APFC) Panels.',
      color: 'red'
    },
    {
      icon: HardHat,
      title: 'Engineering Services',
      description: 'Design, Engineering and Technical Consultancy for E&I, Industrial Automation',
      color: 'blue'
    }
  ];

  // Partner Logos Data
  const partners = [
    { name: 'ABB', logo: '/assets/partners/abb.jpg' },
    { name: 'Emerson', logo: '/assets/partners/emerson.jpg' },
    { name: 'Honeywell', logo: '/assets/partners/honeywell.jpg' },
    { name: 'Lautriz Knudsen', logo: '/assets/partners/lautriz-knudsen.png' },
    { name: 'Mitsubishi Electric', logo: '/assets/partners/mitsubishi-electric.jpg' },
    { name: 'Pneucon', logo: '/assets/partners/pneucon.jpg' },
    { name: 'Rittal', logo: '/assets/partners/rittal.jpg' },
    { name: 'Rockwell Automation', logo: '/assets/partners/rockwell-automation.jpg' },
    { name: 'Schneider Electric', logo: '/assets/partners/scheinder.jpg' },
    { name: 'Siemens', logo: '/assets/partners/siemens.jpg' },
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];
  const row1Partners = duplicatedPartners.slice(0, Math.ceil(duplicatedPartners.length / 2));
  const row2Partners = duplicatedPartners.slice(Math.ceil(duplicatedPartners.length / 2));

  // Fetch Why Choose Us data from API
  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      try {
        setLoadingWhyChooseUs(true);
        setWhyChooseUsError(null);
        
        const response = await httpClient.get('/get__all__why__choose__us__master');
        
        if (response.data && response.data.status === true && response.data.data) {
          setWhyChooseUsData(response.data.data);
        } else {
          setWhyChooseUsData([]);
          setWhyChooseUsError('No why choose us data received from API');
        }
      } catch (error) {
        console.error('Error fetching why choose us data:', error);
        setWhyChooseUsError(error.message || 'Failed to load why choose us data');
        setWhyChooseUsData([]);
      } finally {
        setLoadingWhyChooseUs(false);
      }
    };

    fetchWhyChooseUs();
  }, []);

  // Fetch Accreditations data from API
  useEffect(() => {
    const fetchAccreditations = async () => {
      try {
        setLoadingAccreditations(true);
        setAccreditationsError(null);
        
        const response = await httpClient.get('/get__all__accreditations__master');
        
        if (response.data && response.data.status === true && response.data.data) {
          setAccreditationsData(response.data.data);
        } else {
          setAccreditationsData([]);
          setAccreditationsError('No accreditations data received from API');
        }
      } catch (error) {
        console.error('Error fetching accreditations data:', error);
        setAccreditationsError(error.message || 'Failed to load accreditations data');
        setAccreditationsData([]);
      } finally {
        setLoadingAccreditations(false);
      }
    };

    fetchAccreditations();
  }, []);

  // Fetch About Us data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoadingAbout(true);
        setAboutError(null);
        
        const response = await httpClient.get('/get__all__aboutus');
        
        if (response.data && response.data.status === true && response.data.data) {
          const activeData = response.data.data.find(
            item => item.status === 'Active' || 
            (item.description && item.description.trim() !== '') ||
            (item.About_us_description && item.About_us_description.trim() !== '')
          );
          
          const dataToUse = activeData || response.data.data[0];
          
          if (dataToUse) {
            setAboutData({
              title: dataToUse.title || dataToUse.About_us_title || "Engineering Excellence Since 2017",
              description: dataToUse.description || dataToUse.About_us_description || "",
              image: dataToUse.image || dataToUse.About_us_image || "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop"
            });
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
        setAboutError(error.message);
      } finally {
        setLoadingAbout(false);
      }
    };
    
    fetchAboutData();
  }, []);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoadingBanners(true);
        const response = await httpClient.get('/get__all__banner');
        
        if (response.data && response.data.status === true && response.data.data) {
          const activeBanners = response.data.data.filter(banner => banner.status === 'active');
          setBanners(activeBanners);
          
          if (activeBanners.length > 0) {
            setCurrentBannerIndex(0);
          }
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        setTestimonialsError(null);
        
        const response = await httpClient.get('/Get__ByAll__testimonial');
        
        if (response.data && response.data.status === true && response.data.data) {
          const formattedTestimonials = response.data.data.map(testimonial => ({
            id: testimonial._id,
            name: testimonial.client_name,
            position: testimonial.client_designation || 'Client',
            company: testimonial.company_name || '',
            content: testimonial.testimonial_text || testimonial.description,
            rating: testimonial.rating || 5,
            image: testimonial.client_image || testimonial.image || null
          }));
          setTestimonials(formattedTestimonials);
        } else {
          setTestimonials([]);
          setTestimonialsError('No testimonials data received from API');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonialsError(error.message || 'Failed to load testimonials');
        
        const fallbackTestimonials = [
          {
            id: 1,
            name: 'Rajesh Sharma',
            position: 'Plant Head',
            company: 'Kia Motors',
            content: 'Accuon delivered exceptional automation solutions that improved our production efficiency by 30%. Their team is highly professional and technically sound.',
            rating: 5,
            image: null
          },
          {
            id: 2,
            name: 'Priya Mehta',
            position: 'Operations Director',
            company: 'Emcure Pharmaceuticals',
            content: 'Outstanding turnkey project execution. Completed ahead of schedule with excellent quality standards. Highly recommended for industrial projects.',
            rating: 5,
            image: null
          },
          {
            id: 3,
            name: 'Anil Kumar',
            position: 'Project Manager',
            company: 'Godrej',
            content: 'Very reliable partner for control panel manufacturing and automation. Their technical expertise and customer support are commendable.',
            rating: 5,
            image: null
          },
          {
            id: 4,
            name: 'Sneha Patil',
            position: 'Engineering Head',
            company: 'Bosch',
            content: 'Accuon has been our trusted engineering partner for years. Their commitment to quality and timely delivery is unmatched.',
            rating: 5,
            image: null
          }
        ];
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Fetch News & Announcements from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        setNewsError(null);
        
        const response = await httpClient.get('/api/news/get__all__news');
        
        if (response.data && response.data.status === true && response.data.data) {
          const formattedNews = response.data.data.map(news => ({
            id: news._id,
            title: news.title,
            description: news.description,
            video: news.video || null,
            image: news.image || null,
            createdAt: news.createdAt,
            type: news.video ? 'video' : (news.image ? 'image' : 'text')
          }));
          setNewsUpdates(formattedNews);
          
          const initialVideoStates = {};
          formattedNews.forEach(news => {
            if (news.type === 'video') {
              initialVideoStates[news.id] = {
                isPlaying: false,
                isMuted: true
              };
            }
          });
          setVideoStates(initialVideoStates);
        } else {
          setNewsUpdates([]);
          setNewsError('No news data received from API');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsError(error.message || 'Failed to load news');
        
        const fallbackNews = [
          {
            id: 1,
            date: 'March 15, 2026',
            title: 'New Office Inauguration',
            description: 'Accuon expands operations with new state-of-the-art facility in Pune.',
            type: 'text'
          },
          {
            id: 2,
            date: 'February 10, 2026',
            title: 'Strategic Partnership',
            description: 'Partnered with leading automation technology providers for advanced solutions.',
            type: 'text'
          },
          {
            id: 3,
            date: 'January 20, 2026',
            title: 'ISO Certification Renewed',
            description: 'Successfully renewed ISO 9001:2015 certification with zero non-conformities.',
            type: 'text'
          }
        ];
        setNewsUpdates(fallbackNews);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  // Fetch Certifications Master from API
  useEffect(() => {
    const fetchCertificationsMaster = async () => {
      try {
        setLoadingCertifications(true);
        setCertificationsError(null);
        
        const response = await httpClient.get('/get__all__certification');
        
        if (response.data && response.data.status === true && response.data.data) {
          setCertificationsMaster(response.data.data);
        } else {
          setCertificationsMaster([]);
          setCertificationsError('No certifications data received from API');
        }
      } catch (error) {
        console.error('Error fetching certifications:', error);
        setCertificationsError(error.message || 'Failed to load certifications');
        setCertificationsMaster([]);
      } finally {
        setLoadingCertifications(false);
      }
    };

    fetchCertificationsMaster();
  }, []);

  // Fetch Clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoadingClients(true);
        setClientsError(null);
        
        const response = await httpClient.get('/get__all__client');
        
        if (response.data && response.data.status === true && response.data.data) {
          setClients(response.data.data);
        } else {
          setClients([]);
          setClientsError('No clients data received from API');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        setClientsError(error.message || 'Failed to load clients');
        setClients([]);
      } finally {
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  const togglePlayPause = (newsId) => {
    const video = videoRefs.current[newsId];
    if (video) {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setVideoStates(prev => ({ 
              ...prev, 
              [newsId]: { 
                ...prev[newsId], 
                isPlaying: true
              } 
            }));
          }).catch(error => {
            console.log("Playback prevented:", error);
          });
        }
      } else {
        video.pause();
        setVideoStates(prev => ({ 
          ...prev, 
          [newsId]: { 
            ...prev[newsId], 
            isPlaying: false 
          } 
        }));
      }
    }
  };

  const toggleMute = (newsId) => {
    const video = videoRefs.current[newsId];
    if (video) {
      video.muted = !video.muted;
      setVideoStates(prev => ({ ...prev, [newsId]: { ...prev[newsId], isMuted: video.muted } }));
    }
  };

  // Fullscreen functions
  const openFullscreen = (news) => {
    setFullscreenMedia(news);
    setIsFullscreenOpen(true);
    document.body.style.overflow = 'hidden';
    
    // If it's a video, pause the original video when opening fullscreen
    if (news.type === 'video' && videoRefs.current[news.id]) {
      const originalVideo = videoRefs.current[news.id];
      if (originalVideo && !originalVideo.paused) {
        originalVideo.pause();
        setVideoStates(prev => ({ 
          ...prev, 
          [news.id]: { 
            ...prev[news.id], 
            isPlaying: false 
          } 
        }));
      }
    }
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
    setTimeout(() => {
      setFullscreenMedia(null);
    }, 300);
    document.body.style.overflow = 'auto';
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isFullscreenOpen) {
        closeFullscreen();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isFullscreenOpen]);

  // Format date for news items
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  // Handle image error
  const handleImageError = (clientName) => {
    setImageErrors(prev => ({ ...prev, [clientName]: true }));
  };

  // Handle testimonial image error
  const handleTestimonialImageError = (testimonialId) => {
    setImageErrors(prev => ({ ...prev, [`testimonial_${testimonialId}`]: true }));
  };

  // Handle banner image error
  const handleBannerError = (index) => {
    console.error(`Banner ${index} failed to load`);
  };

  // Auto-play for testimonial slider
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Banner navigation functions
  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Function to get icon for why choose us based on title
  const getWhyChooseUsIcon = (title) => {
    const iconMap = {
      '9+ Years of Excellence': TrendingUp,
      'Quality Assured': Shield,
      'Expert Team': Users,
      'Timely Delivery': Clock,
      'On Time Service Support': Headphones,
      'Cutting-Edge Innovation': Cpu
    };
    return iconMap[title] || Award;
  };

  // Function to get gradient color for why choose us based on title
  const getWhyChooseUsGradient = (title) => {
    const gradientMap = {
      '9+ Years of Excellence': 'from-red-500 to-red-600',
      'Quality Assured': 'from-blue-500 to-blue-600',
      'Expert Team': 'from-green-500 to-teal-600',
      'Timely Delivery': 'from-orange-500 to-yellow-600',
      'On Time Service Support': 'from-purple-500 to-pink-600',
      'Cutting-Edge Innovation': 'from-cyan-500 to-blue-600'
    };
    return gradientMap[title] || 'from-red-500 to-red-600';
  };

  // Function to get hover gradient for why choose us
  const getWhyChooseUsHoverGradient = (title) => {
    const gradientMap = {
      '9+ Years of Excellence': 'from-red-50 to-blue-50',
      'Quality Assured': 'from-blue-50 to-red-50',
      'Expert Team': 'from-green-50 to-teal-50',
      'Timely Delivery': 'from-orange-50 to-yellow-50',
      'On Time Service Support': 'from-purple-50 to-pink-50',
      'Cutting-Edge Innovation': 'from-cyan-50 to-blue-50'
    };
    return gradientMap[title] || 'from-red-50 to-blue-50';
  };

  // Function to get text color for why choose us
  const getWhyChooseUsTextColor = (title) => {
    const colorMap = {
      '9+ Years of Excellence': 'text-red-600',
      'Quality Assured': 'text-blue-600',
      'Expert Team': 'text-green-600',
      'Timely Delivery': 'text-orange-600',
      'On Time Service Support': 'text-purple-600',
      'Cutting-Edge Innovation': 'text-cyan-600'
    };
    return colorMap[title] || 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Banner Slider Section */}
      {!loadingBanners && banners.length > 0 && (
        <section 
          className="relative w-full"
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <div className="relative w-full">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`w-full transition-all duration-1000 ease-in-out ${
                  index === currentBannerIndex 
                    ? 'block opacity-100' 
                    : 'hidden opacity-0'
                }`}
              >
                <img
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-auto object-cover"
                  onError={() => handleBannerError(index)}
                />
              </div>
            ))}
          </div>

          {banners.length > 1 && (
            <>
              <button
                onClick={prevBanner}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                aria-label="Previous banner"
                style={{ top: `calc(50% + ${headerHeight / 2}px)` }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextBanner}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                aria-label="Next banner"
                style={{ top: `calc(50% + ${headerHeight / 2}px)` }}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}

          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`transition-all duration-300 ${
                    currentBannerIndex === index
                      ? 'w-10 h-2 bg-red-600 rounded-full'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Hero Text Section */}
      {(!loadingBanners && banners.length > 0) && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6 animate-fade-in">
                <Shield className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">ISO 9001:2015 Certified</span>
              </div>
              
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
                Engineering Excellence for
                <span className="text-red-600"> Industrial Growth</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in">
                We Provide Engineering services to various clients and is a major Engineering consultant for Electrical Instrumentation & Automation Field in Pune, Maharashtra, India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback Static Hero Banner */}
      {(!loadingBanners && banners.length === 0) && (
        <>
          <section 
            className="relative w-full"
            style={{ paddingTop: `${headerHeight}px` }}
          >
            <div className="w-full">
              <img 
                src="/assets/hero-banner.jpg" 
                alt="Industrial Banner" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
                  e.target.parentElement.style.height = '400px';
                }}
              />
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6">
                  <Shield className="h-5 w-5 text-white" />
                  <span className="text-sm font-semibold text-white">ISO 9001:2015 Certified</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
                  Engineering Excellence for
                  <span className="text-red-600"> Industrial Growth</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  We Provide Engineering services to various clients and is a major Engineering consultant in Pune, Maharashtra, India.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href="/services"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-all duration-300"
                  >
                    Explore Services
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Loading State for Banners */}
      {loadingBanners && (
        <section 
          className="relative h-96 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700"
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            <p className="text-white mt-4">Loading...</p>
          </div>
        </section>
      )}

      {/* What We Do Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <img 
              src="/assets/grey.jpg" 
              alt="Background"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
              }}
            />
            <div className="absolute inset-0 bg-white/80"></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Zap className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">What We Do</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive <span className="text-red-600">Engineering Solutions</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Accuon Projects & Engineers India Pvt Ltd provides end-to-end Electrical, Instrumentation and Automation solutions. Including design, engineering, supply, installation, testing and commissioning of industrial projects. We ensure safe, reliable and timely execution of projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const serviceImages = {
                'Turnkey Projects': '/assets/turnkeyproject.jpeg',
                'Industrial Automation': '/assets/industrial-automation.jpeg',
                'Control Panel Manufacturing': '/assets/control.jpeg',
                'Engineering Services': '/assets/ees.jpeg'
              };
              
              const serviceImage = serviceImages[service.title];
              
              return (
                <div
                  key={index}
                  className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:bg-white overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={serviceImage}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className={`inline-flex p-3 rounded-xl ${service.color === 'red' ? 'bg-red-50' : 'bg-blue-50'} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${service.color === 'red' ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    {service.subtext && (
                      <p className="text-red-600 text-sm font-medium mt-3 pt-2 border-t border-gray-100">
                        {service.subtext}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-blue-50 px-4 py-2 rounded-full mb-6 shadow-sm">
              <Award className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Setting New Standards in{" "}
              <span className="text-red-600">
                Engineering Excellence
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Discover what makes Accuon the preferred choice for industry leaders
            </p>
          </div>

          {loadingWhyChooseUs ? (
            <div className="flex justify-center items-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
          ) : whyChooseUsError ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-base">{whyChooseUsError}</p>
              </div>
            </div>
          ) : whyChooseUsData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {whyChooseUsData.map((item, index) => {
                const Icon = getWhyChooseUsIcon(item.title);
                const gradient = getWhyChooseUsGradient(item.title);
                const hoverGradient = getWhyChooseUsHoverGradient(item.title);
                const textColor = getWhyChooseUsTextColor(item.title);
                
                return (
                  <div
                    key={item._id || index}
                    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hoverGradient} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                      <div className={`mt-4 flex items-center ${textColor} font-semibold`}>
                        <span className="text-sm">
                          {item.title.includes('Years') ? 'Trusted since 2017' : 
                           item.title.includes('Quality') ? 'International Standards' :
                           item.title.includes('Expert') ? 'Certified Professionals' :
                           item.title.includes('Timely') ? 'Guaranteed Deadlines' :
                           item.title.includes('Service') ? 'Always Available' :
                           item.title.includes('Innovation') ? 'Industry 4.0 Ready' : 'Excellence Assured'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex flex-col items-center gap-3 text-gray-500">
                <Award className="w-12 h-12" />
                <p className="text-lg">No why choose us data available at the moment.</p>
                <p className="text-sm">Please check back later.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/img6.jpg" 
            alt="Certifications Background"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-white/80"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Award className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Accreditations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Accreditations</span>
            </h2>
            <p className="text-black">
              Recognized for maintaining highest quality and industry standards
            </p>
          </div>

          {loadingAccreditations ? (
            <div className="flex justify-center items-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
          ) : accreditationsError ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-base">{accreditationsError}</p>
              </div>
            </div>
          ) : accreditationsData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {accreditationsData.map((item, index) => (
                <div
                  key={item._id || index}
                  className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white"
                >
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-10 w-10 text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex flex-col items-center gap-3 text-gray-500">
                <Award className="w-12 h-12" />
                <p className="text-lg">No accreditations available at the moment.</p>
                <p className="text-sm">Please check back later.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Clients Logo Slider */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
              <Users className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Our Clients</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry <span className="text-red-600">Leaders</span>
            </h2>
            <p className="text-gray-600">
              We are proud to work with world-leading companies
            </p>
          </div>

          {loadingClients ? (
            <div className="flex justify-center items-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
          ) : clientsError ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-base">{clientsError}</p>
              </div>
            </div>
          ) : clients.length > 0 ? (
            <>
              {(() => {
                const duplicatedClients = [...clients, ...clients, ...clients];
                const row1Clients = duplicatedClients.slice(0, Math.ceil(duplicatedClients.length / 2));
                const row2Clients = duplicatedClients.slice(Math.ceil(duplicatedClients.length / 2));
                
                return (
                  <>
                    <div className="mb-10">
                      <div className="relative overflow-hidden">
                        <div className="flex animate-marquee-left-slow">
                          {row1Clients.map((client, index) => (
                            <div
                              key={`row1-${client._id || index}`}
                              className="flex-shrink-0 w-56 mx-5"
                            >
                              <div className="bg-gray-50 hover:bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl border border-gray-100 group min-h-[180px] flex flex-col items-center justify-center">
                                <div className="h-28 flex items-center justify-center">
                                  {!imageErrors[client.title] ? (
                                    <img
                                      src={client.image}
                                      alt={client.title}
                                      className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                                      onError={() => handleImageError(client.title)}
                                    />
                                  ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-blue-50 rounded-full flex items-center justify-center">
                                      <Briefcase className="h-10 w-10 text-red-600" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          {row1Clients.map((client, index) => (
                            <div
                              key={`row1-duplicate-${client._id || index}`}
                              className="flex-shrink-0 w-56 mx-5"
                            >
                              <div className="bg-gray-50 hover:bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl border border-gray-100 group min-h-[180px] flex flex-col items-center justify-center">
                                <div className="h-28 flex items-center justify-center">
                                  {!imageErrors[client.title] ? (
                                    <img
                                      src={client.image}
                                      alt={client.title}
                                      className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                                      onError={() => handleImageError(client.title)}
                                    />
                                  ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-blue-50 rounded-full flex items-center justify-center">
                                      <Briefcase className="h-10 w-10 text-red-600" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <div className="relative overflow-hidden">
                        <div className="flex animate-marquee-right-slow">
                          {row2Clients.map((client, index) => (
                            <div
                              key={`row2-${client._id || index}`}
                              className="flex-shrink-0 w-56 mx-5"
                            >
                              <div className="bg-gray-50 hover:bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl border border-gray-100 group min-h-[180px] flex flex-col items-center justify-center">
                                <div className="h-28 flex items-center justify-center">
                                  {!imageErrors[client.title] ? (
                                    <img
                                      src={client.image}
                                      alt={client.title}
                                      className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                                      onError={() => handleImageError(client.title)}
                                    />
                                  ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-blue-50 rounded-full flex items-center justify-center">
                                      <Briefcase className="h-10 w-10 text-red-600" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          {row2Clients.map((client, index) => (
                            <div
                              key={`row2-duplicate-${client._id || index}`}
                              className="flex-shrink-0 w-56 mx-5"
                            >
                              <div className="bg-gray-50 hover:bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl border border-gray-100 group min-h-[180px] flex flex-col items-center justify-center">
                                <div className="h-28 flex items-center justify-center">
                                  {!imageErrors[client.title] ? (
                                    <img
                                      src={client.image}
                                      alt={client.title}
                                      className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                                      onError={() => handleImageError(client.title)}
                                    />
                                  ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-blue-50 rounded-full flex items-center justify-center">
                                      <Briefcase className="h-10 w-10 text-red-600" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex flex-col items-center gap-3 text-gray-500">
                <Users className="w-12 h-12" />
                <p className="text-lg">No clients available at the moment.</p>
                <p className="text-sm">Please check back later.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Certification Master Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-red-50 px-4 py-2 rounded-full mb-6 shadow-sm">
              <Award className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Certification Master</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Certifications & Awards</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Recognized for excellence in engineering and quality management
            </p>
          </div>

          {loadingCertifications ? (
            <div className="flex justify-center items-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
          ) : certificationsError ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-base">{certificationsError}</p>
              </div>
            </div>
          ) : certificationsMaster.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {certificationsMaster.map((cert) => (
                <div
                  key={cert._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-white"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center">
                              <div class="text-center">
                                <svg class="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <p class="text-gray-500 text-sm">Image not available</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">No image available</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                          {cert.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-50 to-yellow-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Award className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex flex-col items-center gap-3 text-gray-500">
                <Award className="w-12 h-12" />
                <p className="text-lg">No certifications available at the moment.</p>
                <p className="text-sm">Please check back later.</p>
              </div>
            </div>
          )}
        </div>
      </section>

     {/* Latest News & Updates Section with Fullscreen */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
        <Calendar className="h-5 w-5 text-red-600" />
        <span className="text-sm font-semibold text-red-600">Latest Updates</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        News & <span className="text-red-600">Updates</span>
      </h2>
      <p className="text-gray-600">
        Stay updated with our latest achievements and company news
      </p>
    </div>

    {loadingNews ? (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    ) : newsError ? (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-base">{newsError}</p>
        </div>
      </div>
    ) : newsUpdates.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {newsUpdates.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Media Content (Video or Image) - Clickable for fullscreen */}
            {news.type === 'video' && news.video && (
              <div className="relative aspect-video bg-gray-900 overflow-hidden cursor-pointer">
                {/* Clickable fullscreen layer - behind controls */}
                <div 
                  className="absolute inset-0 z-10"
                  onClick={() => openFullscreen(news)}
                />
                
                <video
                  ref={el => videoRefs.current[news.id] = el}
                  src={news.video}
                  className="w-full h-full object-cover"
                  loop
                  muted={videoStates[news.id]?.isMuted !== undefined ? videoStates[news.id].isMuted : true}
                  playsInline
                  poster={news.thumbnail || "/assets/video-poster.jpg"}
                />
                
                {/* Video Controls - z-20 so they're above the fullscreen click layer */}
                <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause(news.id);
                    }}
                    className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label={videoStates[news.id]?.isPlaying ? "Pause" : "Play"}
                  >
                    {videoStates[news.id]?.isPlaying ? (
                      <Pause className="h-6 w-6 text-gray-800" />
                    ) : (
                      <Play className="h-6 w-6 text-gray-800 ml-0.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(news.id);
                    }}
                    className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label={videoStates[news.id]?.isMuted ? "Unmute" : "Mute"}
                  >
                    {videoStates[news.id]?.isMuted ? (
                      <VolumeX className="h-6 w-6 text-gray-800" />
                    ) : (
                      <Volume2 className="h-6 w-6 text-gray-800" />
                    )}
                  </button>

                  {/* Fullscreen hint icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openFullscreen(news);
                    }}
                    className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label="Open fullscreen"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
                
                <div className="absolute top-3 left-3 z-30 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  <span>Video</span>
                </div>
              </div>
            )}
            
            {news.type === 'image' && news.image && (
              <div 
                className="relative aspect-video overflow-hidden cursor-pointer group"
                onClick={() => openFullscreen(news)}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/70 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  <span>Image</span>
                </div>
              </div>
            )}

            {/* Content - Date removed */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  {news.type === 'video' ? (
                    <Video className="h-5 w-5 text-red-600" />
                  ) : news.type === 'image' ? (
                    <ImageIcon className="h-5 w-5 text-red-600" />
                  ) : (
                    <Calendar className="h-5 w-5 text-red-600" />
                  )}
                </div>
                {/* Date div removed */}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {news.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {news.description}
              </p>
              
              {news.description && news.description.length > 120 && (
                <button 
                  onClick={() => {
                    alert(`Full announcement:\n\nTitle: ${news.title}\n\nDescription: ${news.description}`);
                  }}
                  className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors inline-flex items-center gap-1"
                >
                  Read More
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="inline-flex flex-col items-center gap-3 text-gray-500">
          <Calendar className="w-12 h-12" />
          <p className="text-lg">No news updates available at the moment.</p>
          <p className="text-sm">Please check back later.</p>
        </div>
      </div>
    )}
  </div>
</section>

      {/* Fullscreen Modal - Working for both images and videos */}
      {isFullscreenOpen && fullscreenMedia && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-300"
            aria-label="Close fullscreen"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="relative max-w-7xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
           {fullscreenMedia.type === 'video' && fullscreenMedia.video ? (
  <div className="relative">
    <video
      key={`fullscreen-${fullscreenMedia.id}`}
      src={fullscreenMedia.video}
      className="w-full max-h-[85vh] object-contain rounded-lg"
      controls
      autoPlay
      muted={false}
      playsInline
      controlsList="nodownload"
      onCanPlay={(e) => e.target.play().catch(() => {})}
    />
  </div>
) : fullscreenMedia.type === 'image' && fullscreenMedia.image ? (
  <img
    src={fullscreenMedia.image}
    alt={fullscreenMedia.title}
    className="w-full max-h-[85vh] object-contain rounded-lg"
  />
) : null}
            
            {/* Title and description overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-xl font-bold mb-2">
                {fullscreenMedia.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {fullscreenMedia.description}
              </p>
              {fullscreenMedia.createdAt && (
                <p className="text-gray-400 text-xs mt-2">
                  {formatDate(fullscreenMedia.createdAt)}
                </p>
              )}
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
            Click outside to close • ESC to exit
          </div>
        </div>
      )}

      {/* Interactive Leaflet Map Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-blue-50 px-4 py-2 rounded-full mb-6 shadow-sm">
              <MapPin className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">
                Global Footprint
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Projects <span className="text-red-600">Completed At</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Our global presence spans across continents, delivering excellence worldwide
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white h-[600px] z-10">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                scrollWheelZoom={true}
                doubleClickZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <MapController center={[20, 0]} zoom={2} />
                
               {projectLocations.map((location, index) => (
  <Marker
    key={index}
    position={[location.lat, location.lng]}
    icon={redIcon}
  >
    <Popup>
      <div className="text-center min-w-[200px]">
        <div className="font-bold text-red-600 text-lg mb-1">
          {location.company}
        </div>
        <div className="text-gray-700 font-medium">
          {location.country}
        </div>
        {location.city && (
          <div className="text-gray-500 text-sm mt-1">
            {location.city}
          </div>
        )}
        {/* Special display for India location */}
        {location.isSpecial && location.projectsCount && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              <span>{location.projectsCount} Projects Completed</span>
            </div>
          </div>
        )}
      </div>
    </Popup>
  </Marker>
))}
              </MapContainer>
            </div>
            
           
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <img 
              src="/assets/testimonial-bg.jpg" 
              alt="Testimonials Background"
              className="object-cover w-full h-full opacity-10"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-white/50"></div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
                <Star className="h-5 w-5 text-red-600" />
                <span className="text-sm font-semibold text-red-600">Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-red-600">Clients Say</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Hear from our valued clients about their experience working with Accuon
              </p>
            </div>

            {loadingTestimonials ? (
              <div className="flex justify-center items-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
              </div>
            ) : testimonialsError ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-base">{testimonialsError}</p>
                </div>
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
                <div className="flex flex-col items-center text-center lg:items-center lg:text-center">
                  <div className="mb-6 md:mb-8">
                    <div className="mb-6">
                      <img 
                        src="/assets/punch.png" 
                        alt="AccuOn Logo" 
                        className="w-38 h-38 md:w-44 md:h-44 object-contain mx-auto"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Engineering Excellence
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                      Delivering quality and innovation since 2017
                    </p>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => {
                          if (i < 4) {
                            return (
                              <svg key={i} className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            );
                          } else {
                            return (
                              <div key={i} className="relative">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '70%' }}>
                                  <svg className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-full mt-6 lg:mt-0">
                  {testimonials.length > 1 && (
                    <>
                      <button
                        onClick={prevTestimonial}
                        className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-red-50 group"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-red-50 group"
                      >
                        <ChevronRightIcon className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
                      </button>
                    </>
                  )}

                  <div className="overflow-hidden rounded-2xl">
                    <div
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}
                    >
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={testimonial.id || index}
                          className="w-full flex-shrink-0"
                        >
                          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-xl border border-gray-100 flex flex-col">
                            <div className="flex flex-col items-center text-center mb-6">
                              <div className="mb-4">
                                {testimonial.image && !imageErrors[`testimonial_${testimonial.id}`] ? (
                                  <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-red-100"
                                    onError={() => handleTestimonialImageError(testimonial.id)}
                                  />
                                ) : (
                                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center border-4 border-red-100">
                                    <User className="h-10 w-10 text-red-600" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900">{testimonial.name}</h4>
                                {testimonial.position && (
                                  <p className="text-gray-500 text-base">
                                    {testimonial.position}
                                    {testimonial.company && `, ${testimonial.company}`}
                                  </p>
                                )}
                                <div className="flex justify-center items-center mt-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < testimonial.rating 
                                          ? 'text-yellow-400 fill-current' 
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm font-medium text-gray-600">
                                    {testimonial.rating}/5
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="relative flex-grow">
                              <Quote className="absolute -top-2 -left-2 h-8 w-8 text-red-200 opacity-50" />
                              <p className="text-gray-700 italic text-base md:text-lg leading-relaxed px-4 pt-4 text-center">
                                "{testimonial.content}"
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex flex-col items-center gap-3 text-gray-500">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <p className="text-lg">No testimonials available at the moment.</p>
                  <p className="text-sm">Please check back later.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how Accuon can help you achieve your industrial engineering and automation goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Contact Us Today
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        
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
        
        @keyframes marquee-left-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-right-slow {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        
        .animate-marquee-left-slow {
          animation: marquee-left-slow 60s linear infinite;
        }
        
        .animate-marquee-right-slow {
          animation: marquee-right-slow 60s linear infinite;
        }
        
        .animate-marquee-left:hover,
        .animate-marquee-right:hover,
        .animate-marquee-left-slow:hover,
        .animate-marquee-right-slow:hover {
          animation-play-state: paused;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;