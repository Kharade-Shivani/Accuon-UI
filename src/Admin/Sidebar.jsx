import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Contact, 
  ChevronLeft, 
  ChevronRight,
  Image,
  Users,
  Images,
  Quote,
  Footprints,
  Award,
  Newspaper,
  Layers,
  FolderTree,
   Cpu,
  PanelTop,
  Factory,
  Briefcase,
  UserCheck,
    HardDrive,
     BadgeCheck,
  BarChart3,
  Image as ImageIcon,
  
  Menu as MenuIcon,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsMinimized(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsMinimized(!isMinimized);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
const menuItems = [
  { path: "/admin", name: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/aboutus-master", name: "About US Master", icon: Image },

  { path: "/admin/gallery-master", name: "Gallery Master", icon: Image },
  { path: "/admin/banner-master", name: "Banner Master", icon: Images },
  { path: "/admin/testimonial-master", name: "Testimonial Master", icon: Quote },
  { path: "/admin/client-master", name: "Client Master", icon: Users },
  { path: "/admin/footer-master", name: "Footer Master", icon: Footprints },
  { path: "/admin/certification-master", name: "Certification Master", icon: Award },
  { path: "/admin/news-master", name: "News Master", icon: Newspaper },
   { path: "/admin/job-master", name: "Job Master", icon: Briefcase },
  { path: "/admin/candidate-master", name: "Candidate Master", icon: UserCheck },

  
  { path: "/admin/category-master", name: "ServiceList Master", icon: Layers },
  { path: "/admin/service-master", name: "Service Master", icon: Layers },

  { path: "/admin/whychooseus-master", name: "WhyChooseUs Master", icon: BadgeCheck },
  { path: "/admin/stats-master", name: "Stats Master", icon: BarChart3 },
  // { path: "/admin/image-master", name: "Image Master", icon: ImageIcon },
  { path: "/admin/accrediation-master", name: "Accrediation Master", icon: Award},



  // { path: "/admin/turnkey-master", name: "Turnkey Solutions - E&I Master", icon: Factory },
  // { path: "/admin/engineering-master", name: "Engineering Services - E&I Master", icon: HardDrive },
  // { path: "/admin/fieldinstrument-master", name: "Field Instrumentation Master", icon: Cpu },
  // { path: "/admin/controlpanel-master", name: "Electrical Control Panel Master", icon: PanelTop },
  // { path: "/admin/automation-master", name: "Automation Services Master", icon: PanelTop },

  
];

  return (
    <div className="admin-container">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
        >
          <MenuIcon size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`sidebar 
        ${isMinimized ? 'minimized' : ''} 
        ${isMobile ? 'mobile' : ''} 
        ${isMobileMenuOpen ? 'mobile-open' : ''}
      `}>
        <div className="sidebar-header">
          {(!isMinimized || isMobile) && (
            <div className="logo-area">
              <img 
                src="/assets/logo.jpeg" 
                alt="Logo" 
                className="sidebar-logo"
              />
              <span className="logo-text">Admin Panel</span>
            </div>
          )}
          {!isMobile && (
            <button 
              className="toggle-btn"
              onClick={toggleSidebar}
              title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
            >
              {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          )}
          {isMobile && (
            <button 
              className="close-mobile-btn"
              onClick={closeMobileMenu}
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="sidebar-nav-wrapper">
          <nav className="sidebar-nav">
            <ul className="nav-menu">
              {menuItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink 
                    to={item.path}
                    end={item.path === "/admin"}   
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => {
                      if (isMobile) {
                        closeMobileMenu();
                      }
                    }}
                  >
                    <item.icon size={20} className="nav-icon" />
                    {(!isMinimized || isMobile) && <span className="nav-text">{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Main Content */}
      <main className={`main-content 
        ${isMinimized ? 'expanded' : ''} 
        ${isMobile ? 'mobile' : ''}
      `}>
        <div className="top-bar">
          <div className="top-bar-left">
            {isMobile && (
              <button 
                className="mobile-menu-trigger"
                onClick={toggleMobileMenu}
              >
                <MenuIcon size={24} />
              </button>
            )}
            <h1 className="page-title">Dashboard</h1>
          </div>
          <div className="top-bar-right">
            <div className="admin-profile">
              <span className="admin-name">Admin</span>
              <div className="admin-avatar">A</div>
            </div>
          </div>
        </div>
        <div className="content-area">
          <Outlet />
        </div>
      </main>

      <style jsx>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1001;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          color: white;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1a1f2e 0%, #131724 100%);
          backdrop-filter: blur(10px);
          color: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 1000;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar.minimized {
          width: 80px;
        }

        /* Mobile Sidebar Styles */
        .sidebar.mobile {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .sidebar.mobile.mobile-open {
          transform: translateX(0);
        }

        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          flex-shrink: 0;
        }

        .sidebar.minimized .sidebar-header {
          justify-content: center;
          padding: 24px 12px;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sidebar-logo {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          object-fit: contain;  
          background-color: #fff; 
          padding: 4px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff 0%, #a0aec0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.5px;
        }

        .toggle-btn, .close-mobile-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }

        .toggle-btn:hover, .close-mobile-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        /* Sidebar Navigation Wrapper with Scrollbar */
        .sidebar-nav-wrapper {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
          min-height: 0; /* Critical for flex scrolling */
          -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
        }

        /* Custom scrollbar for sidebar - Desktop */
        .sidebar-nav-wrapper::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .sidebar-nav-wrapper::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        .sidebar-nav-wrapper::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }

        /* Firefox scrollbar - Desktop */
        .sidebar-nav-wrapper {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 rgba(255, 255, 255, 0.05);
        }

        /* Mobile specific scrollbar styles - More visible */
        .sidebar.mobile .sidebar-nav-wrapper {
          scrollbar-width: auto;
          scrollbar-color: #6366f1 rgba(255, 255, 255, 0.2);
        }

        .sidebar.mobile .sidebar-nav-wrapper::-webkit-scrollbar {
          width: 6px; /* Thicker scrollbar for mobile */
        }

        .sidebar.mobile .sidebar-nav-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }

        .sidebar.mobile .sidebar-nav-wrapper::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        .sidebar-nav {
          padding: 24px 16px;
        }

        .sidebar.minimized .sidebar-nav {
          padding: 24px 8px;
        }

        .nav-menu {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          width: 100%;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #a0aec0;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s ease;
          font-weight: 500;
          position: relative;
          overflow: hidden;
        }

        .sidebar.minimized .nav-link {
          justify-content: center;
          padding: 12px;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          transform: scaleY(0);
          transition: transform 0.2s ease;
        }

        .nav-link:hover::before,
        .nav-link.active::before {
          transform: scaleY(1);
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
          color: #ffffff;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .nav-icon {
          flex-shrink: 0;
        }

        .nav-text {
          white-space: nowrap;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content.expanded {
          margin-left: 80px;
        }

        .main-content.mobile {
          margin-left: 0 !important;
        }

        .top-bar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 99;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-menu-trigger {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          color: white;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .mobile-menu-trigger:hover {
          transform: scale(1.05);
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-name {
          font-weight: 500;
          color: #2d3748;
        }

        .admin-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        .content-area {
          flex: 1;
          padding: 32px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }

          .mobile-menu-trigger {
            display: flex;
          }

          .top-bar {
            padding: 12px 20px;
          }
          
          .page-title {
            font-size: 20px;
          }
          
          .content-area {
            padding: 20px;
          }

          .sidebar-header {
            padding: 20px 16px;
          }

          .logo-text {
            font-size: 16px;
          }

          .sidebar-logo {
            width: 36px;
            height: 36px;
          }

          /* Ensure sidebar takes full height */
          .sidebar.mobile {
            height: 100vh;
            max-height: 100vh;
          }

          /* Make nav items larger for touch */
          .nav-link {
            padding: 14px 16px;
          }

          .close-mobile-btn {
            padding: 10px;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        /* Scrollbar Styling for main content */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;