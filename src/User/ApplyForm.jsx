import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Upload,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  Building2,
  Clock,
  Award,
  TrendingUp,
  Users,
  Coffee
} from 'lucide-react';
import httpClient from '../Api/axios';

function ApplyForm() {
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

  // Fetch job positions from API
  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        setIsLoadingPositions(true);
        const response = await httpClient.get('/get__all__job');
        
        if (response.data.status === true && response.data.data) {
          const jobTitles = response.data.data.map(job => job.jobTitle);
          setPositions(jobTitles);
        } else {
          setPositions([
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
          ]);
          console.error('Failed to fetch job positions from API');
        }
      } catch (error) {
        console.error('Error fetching job positions:', error);
        setPositions([
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
        ]);
      } finally {
        setIsLoadingPositions(false);
      }
    };

    fetchJobPositions();
  }, []);

  // Pre-fill position from sessionStorage if available
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('selectedPosition');
    if (savedPosition) {
      setFormData(prev => ({ ...prev, position: savedPosition }));
      sessionStorage.removeItem('selectedPosition');
    }
  }, []);

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

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

  // Upload resume to API
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

      // Expected response structure for upload-resume API
      // {
      //   "status": true,
      //   "fileUrl": "https://res.cloudinary.com/.../aaa.pdf"
      // }
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

  // Create candidate with resume URL
  const createCandidate = async (candidateData) => {
    try {
      const response = await httpClient.post('/create__candidate', candidateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Expected response structure for create__candidate API
      // {
      //   "status": true,
      //   "message": "Application submitted successfully",
      //   "data": {
      //     "name": "Amol Patil",
      //     "email": "amol@gmail.com",
      //     "contact": "9876543210",
      //     "position": "Frontend Developer",
      //     "employment": "Full-time",
      //     "availabilityDate": "2026-05-01",
      //     "resume": "https://res.cloudinary.com/artnstockimg/raw/upload/v1777296308/Accuon/Resumes/aaa.pdf"
      //   }
      // }
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

    // Validate email
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

    // Validate phone number
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
      // Step 1: Upload resume first
      let resumeUrl;
      try {
        resumeUrl = await uploadResume(formData.resume);
        console.log('Resume uploaded successfully:', resumeUrl);
      } catch (uploadError) {
        throw new Error(`Resume upload failed: ${uploadError.message}`);
      }

      // Step 2: Create candidate with resume URL
      const candidateData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        position: formData.position,
        employment: formData.employment,
        availabilityDate: formData.availabilityDate,
        resume: resumeUrl // Use the URL from upload-resume API
      };

      console.log('Submitting candidate data:', candidateData);

      const candidateResponse = await createCandidate(candidateData);

      // Success - both APIs successful
      if (candidateResponse.status === true) {
        // Store the submitted data in localStorage for reference if needed
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

        // Redirect to career page after 2 seconds with success message
        setTimeout(() => {
          window.location.href = '/career?application_success=true';
        }, 2000);
      } else {
        throw new Error(candidateResponse.message || 'Application submission failed');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      
      let errorMessage = error.message || 'Sorry, there was an error submitting your application. Please try again later.';
      
      // Check for specific error messages
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
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // AlertCircleIcon component
  const AlertCircleIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-red-100 rounded-full mb-4">
            <Briefcase className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our <span className="text-red-600">Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take the next step in your career. We're looking for talented individuals who are passionate about making a difference.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-8 sm:px-8">
              <h2 className="text-2xl font-bold text-white">Application Form</h2>
              <p className="text-gray-300 mt-1">Please fill out all required fields (*)</p>
            </div>

            {/* Form Body */}
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

      <style>{`
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

export default ApplyForm;