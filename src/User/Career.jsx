import React, { useEffect, useState, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2,
  ChevronRight,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Calendar,
  Send,
  Filter,
  Search,
  User,
  Mail,
  Phone,
  Upload,
  AlertCircle
} from 'lucide-react';
import httpClient from '../Api/axios';

function Career() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    position: '',
    employment: '',
    availabilityDate: '',
    resume: null,
    fileName: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const fileInputRef = useRef(null);

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

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

  // Check for success message from URL params (after form submission)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const applicationSuccess = urlParams.get('application_success');
    if (applicationSuccess === 'true') {
      setSuccessMessage('Your application has been sent successfully! We will review your resume and get back to you soon.');
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, []);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/get__all__job');
        
        if (response.data.status === true && response.data.data) {
          setJobs(response.data.data);
        } else {
          setJobs([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job openings. Please try again later.');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch job positions for dropdown
  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        setIsLoadingPositions(true);
        const response = await httpClient.get('/get__all__job');
        
        if (response.data.status === true && response.data.data) {
          const jobTitles = response.data.data.map(job => job.jobTitle);
          setPositions(jobTitles);
        } else {
          setPositions(defaultPositions);
        }
      } catch (error) {
        console.error('Error fetching job positions:', error);
        setPositions(defaultPositions);
      } finally {
        setIsLoadingPositions(false);
      }
    };

    fetchJobPositions();
  }, []);

  const defaultPositions = [
    'Software Engineer',
    'Senior Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Project Manager',
    'QA Engineer',
    'DevOps Engineer',
    'Data Scientist',
    'Business Analyst',
    'Technical Writer',
    'Web Development Intern',
    'General Application'
  ];

  // Get unique departments for filter
  const departments = ['all', ...new Set(jobs.map(job => job.department).filter(Boolean))];

  // Filter jobs based on department and search term
  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesSearch = searchTerm === '' || 
      job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.experience?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch && job.status === 'active';
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Handle Apply button click - scroll to form and set position
  const handleApplyClick = (jobTitle) => {
    setFormData(prev => ({ ...prev, position: jobTitle }));
    // Scroll to form smoothly
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle General Application
  const handleGeneralApplication = () => {
    setFormData(prev => ({ ...prev, position: 'General Application' }));
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please upload a valid file (PDF, DOC, DOCX, or TXT)'
      });
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 3000);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'File size must be less than 5MB'
      });
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 3000);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      resume: file,
      fileName: file.name
    }));
  };

  const uploadResume = async (file) => {
    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('resume', file);

      const response = await httpClient.post('/upload-resume', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === true && response.data.fileUrl) {
        return response.data.fileUrl;
      } else {
        throw new Error(response.data.message || 'Resume upload failed');
      }
    } catch (error) {
      console.error('Resume upload error:', error);
      let errorMessage = 'Failed to upload resume. Please try again.';
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 413) {
          errorMessage = 'File size too large. Please upload a smaller file (max 5MB).';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const createCandidate = async (candidateData) => {
    try {
      const response = await httpClient.post('/create__candidate', candidateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === true) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Candidate creation failed');
      }
    } catch (error) {
      console.error('Candidate creation error:', error);
      let errorMessage = 'Failed to submit application. Please try again.';
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid input. Please check your information and try again.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      throw new Error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ submitted: false, error: false, message: '' });

    // Validation
    if (!formData.name || !formData.email || !formData.contact || !formData.position || !formData.employment || !formData.availabilityDate || !formData.resume) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all required fields and upload your resume.'
      });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please enter a valid email address.'
      });
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
    if (!phoneRegex.test(formData.contact)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please enter a valid phone number.'
      });
      setIsLoading(false);
      return;
    }

    try {
      let resumeUrl;
      try {
        resumeUrl = await uploadResume(formData.resume);
      } catch (uploadError) {
        throw new Error(`Resume upload failed: ${uploadError.message}`);
      }

      const candidateData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        position: formData.position,
        employment: formData.employment,
        availabilityDate: formData.availabilityDate,
        resume: resumeUrl
      };

      const candidateResponse = await createCandidate(candidateData);

      if (candidateResponse.status === true) {
        localStorage.setItem('lastApplication', JSON.stringify({
          ...candidateData,
          submittedAt: new Date().toISOString()
        }));

        setFormData({
          name: '',
          email: '',
          contact: '',
          position: '',
          employment: '',
          availabilityDate: '',
          resume: null,
          fileName: ''
        });
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        setFormStatus({
          submitted: true,
          error: false,
          message: candidateResponse.message || 'Thank you for your application! We will review your resume and get back to you soon.'
        });

        setSuccessMessage('Your application has been sent successfully! We will review your resume and get back to you soon.');
        
        setTimeout(() => {
          setFormStatus({ submitted: false, error: false, message: '' });
        }, 5000);
      } else {
        throw new Error(candidateResponse.message || 'Application submission failed');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      
      let errorMessage = error.message || 'Sorry, there was an error submitting your application. Please try again later.';
      
      if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
        errorMessage = 'You have already applied for this position. We will review your application and get back to you soon.';
      } else if (errorMessage.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (errorMessage.includes('server')) {
        errorMessage = 'Server error. Please try again after some time.';
      }
      
      setFormStatus({
        submitted: false,
        error: true,
        message: errorMessage
      });
      
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const AlertCircleIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white">
      <div style={{ paddingTop: `${headerHeight}px` }}>
        
        {/* Hero Banner Section */}
        <div className="relative w-full h-[400px] overflow-hidden">
          <img
            src="assets/careerbanner.webp"
            alt="Careers Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Careers
            </h1>
          </div>
        </div>

        {/* Success Message Toast */}
        {successMessage && (
          <div className="fixed top-20 right-4 z-50" style={{ animation: 'slide-down 0.3s ease-out' }}>
            <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-green-800 text-sm font-medium">{successMessage}</p>
                </div>
                <button 
                  onClick={() => setSuccessMessage(null)}
                  className="flex-shrink-0 text-green-500 hover:text-green-700 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Openings Section */}
        <section id="openings" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Current <span className="text-red-600">Openings</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-3 md:mt-4">
                Find your perfect role and take the next step in your career journey
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, department, or experience..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-white appearance-none cursor-pointer"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12">
                <div className="inline-flex p-4 bg-red-50 rounded-full mb-4">
                  <AlertCircleIcon className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-gray-600">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* No Results */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                  <Briefcase className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No job openings match your criteria</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter</p>
              </div>
            )}

            {/* Job Cards Grid */}
            {!loading && !error && filteredJobs.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-blue-100 rounded-lg flex items-center justify-center">
                              <Briefcase className="h-4 w-4 text-red-600" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                            {job.jobTitle}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {job.department && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm">{job.department} Department</span>
                          </div>
                        )}
                        {job.experience && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Experience: {job.experience}</span>
                          </div>
                        )}
                        {job.salary && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-sm">Salary: {job.salary}</span>
                          </div>
                        )}
                        {job.createdAt && (
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>Posted on {formatDate(job.createdAt)}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleApplyClick(job.jobTitle)}
                        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        Apply Now
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Application Form Section - Directly on the page */}
        <section id="application-form" className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-2 bg-red-100 rounded-full mb-4">
                  <Briefcase className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Apply <span className="text-red-600">Now</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Take the next step in your career. Fill out the form below to apply.
                </p>
              </div>

              {/* Main Form Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-8 sm:px-8">
                  <h3 className="text-2xl font-bold text-white">Application Form</h3>
                  <p className="text-gray-300 mt-1">Please fill out all required fields (*)</p>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Status Message */}
                  {formStatus.message && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      formStatus.error 
                        ? 'bg-red-50 border border-red-200' 
                        : 'bg-green-50 border border-green-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        {formStatus.error ? (
                          <AlertCircleIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <p className={`text-sm ${formStatus.error ? 'text-red-700' : 'text-green-700'}`}>
                          {formStatus.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold text-sm">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                          placeholder="Amol Patil"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold text-sm">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                          placeholder="amol@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold text-sm">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                          placeholder="9876543210"
                          required
                        />
                      </div>
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold text-sm">
                        Position Applying For <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all appearance-none"
                          required
                          disabled={isLoadingPositions}
                        >
                          <option value="">
                            {isLoadingPositions ? 'Loading positions...' : 'Select a position'}
                          </option>
                          {positions.map(pos => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>
                        {isLoadingPositions && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Employment Type */}
                    <div>
                      <label className="block text-gray-700 mb-3 font-semibold text-sm">
                        Employment Type <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {employmentTypes.map(type => (
                          <label
                            key={type}
                            className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.employment === type
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="employment"
                              value={type}
                              checked={formData.employment === type}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Availability Date */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold text-sm">
                        Available Start Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          name="availabilityDate"
                          value={formData.availabilityDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold text-sm">
                        Upload Your Resume <span className="text-red-500">*</span>
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                          formData.fileName
                            ? 'border-green-400 bg-green-50'
                            : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50/30'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                        />
                        {isUploading ? (
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <p className="text-gray-600">Uploading resume...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                            {formData.fileName ? (
                              <>
                                <p className="text-green-600 font-medium">{formData.fileName}</p>
                                <p className="text-xs text-gray-500 mt-1">Click or drag to change file</p>
                              </>
                            ) : (
                              <>
                                <p className="text-gray-600">Choose files or drag here</p>
                                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, TXT (Max 5MB)</p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || isUploading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - General Application */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={handleGeneralApplication}
                className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 text-sm md:text-base"
              >
                Send General Application
                <Send className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </section>
      </div>

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
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.5;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default Career;