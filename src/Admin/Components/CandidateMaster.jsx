import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Download, FileText, User, Mail, Phone, Briefcase, Calendar, Users, AlertCircle, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../Api/axios';

function CandidateMaster() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');

  // Fetch all applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications when search term or filters change
  useEffect(() => {
    let filtered = [...applications];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.name?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.contact?.includes(term) ||
        app.position?.toLowerCase().includes(term) ||
        app.employment?.toLowerCase().includes(term)
      );
    }
    
    // Apply position filter
    if (positionFilter !== 'all') {
      filtered = filtered.filter(app => app.position === positionFilter);
    }
    
    setFilteredApplications(filtered);
  }, [searchTerm, positionFilter, applications]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/get__all__candidate');
      
      if (response.data.status && response.data.data) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map((item, index) => ({
          id: item._id,
          sno: index + 1,
          name: item.name || '',
          email: item.email || '',
          contact: item.contact || '',
          position: item.position || '',
          employment: item.employment || '',
          availabilityDate: item.availabilityDate || '',
          resumeUrl: item.resume || '',
          fileName: item.resume ? decodeURIComponent(item.resume.split('/').pop()) : 'No Resume',
          appliedDate: item.createdAt || new Date().toISOString(),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
        setApplications(transformedData);
        setFilteredApplications(transformedData);
      } else {
        toast.error('Failed to fetch applications');
        setApplications([]);
        setFilteredApplications([]);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Error loading applications');
      setApplications([]);
      setFilteredApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      setLoading(true);
      try {
        const response = await httpClient.delete(`/delete__candidate/${itemToDelete}`);
        
        if (response.data.status) {
          toast.success('Candidate deleted successfully!');
          fetchApplications(); // Refresh the list
        } else {
          toast.error(response.data.message || 'Failed to delete candidate');
        }
      } catch (error) {
        console.error('Error deleting candidate:', error);
        if (error.response) {
          toast.error(error.response.data?.message || 'Error deleting candidate');
        } else {
          toast.error('Network error. Please try again.');
        }
      } finally {
        setLoading(false);
        setShowConfirmDialog(false);
        setItemToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setItemToDelete(null);
  };

  const getDownloadFileName = (contentDisposition, fallbackName) => {
    if (!contentDisposition) {
      return fallbackName;
    }

    const utfMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utfMatch?.[1]) {
      return decodeURIComponent(utfMatch[1]);
    }

    const asciiMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
    if (asciiMatch?.[1]) {
      return asciiMatch[1];
    }

    return fallbackName;
  };

  const handleDownloadResume = async (application) => {
    try {
      if (application.resumeUrl && application.resumeUrl.trim() !== '') {
        setDownloadingId(application.id);

        const response = await httpClient.get(`/download__candidate__resume/${application.id}`, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], {
          type: response.headers['content-type'] || 'application/pdf',
        });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = getDownloadFileName(
          response.headers['content-disposition'],
          application.fileName || `resume-${application.id}.pdf`
        );

        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

        toast.success('Resume downloaded successfully');
      } else {
        toast.info('No resume available for this candidate');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      if (error.response?.data instanceof Blob) {
        try {
          const errorText = await error.response.data.text();
          const parsed = JSON.parse(errorText);
          toast.error(parsed.message || 'Error downloading resume');
        } catch {
          toast.error('Error downloading resume');
        }
      } else {
        toast.error(error.response?.data?.message || 'Error downloading resume');
      }
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="candidate-master-container">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Header Section */}
      <div className="candidate-header">
        <div>
          <h2 className="candidate-title">Candidate Applications</h2>
          <p className="candidate-subtitle">Manage and review job applications submitted through the career portal</p>
        </div>
      </div>

      {/* Applications Table */}
      {loading && applications.length === 0 ? (
        <div className="no-data">
          <div className="loading-spinner"></div>
          <p>Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="no-data">
          <AlertCircle size={48} strokeWidth={1.5} />
          <p>No applications found</p>
          {searchTerm || positionFilter !== 'all' ? (
            <button className="clear-filters-btn" onClick={() => {
              setSearchTerm('');
              setPositionFilter('all');
            }}>
              Clear Filters
            </button>
          ) : (
            <p className="no-data-sub">Job applications submitted through the form will appear here</p>
          )}
        </div>
      ) : (
        <div className="table-container">
          <table className="candidate-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Candidate Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Position</th>
                <th>Employment Type</th>
                <th>Availability Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application, idx) => (
                <tr key={application.id}>
                  <td data-label="S.No">{idx + 1}</td>
                  <td data-label="Candidate Name">
                    <div className="candidate-info">
                      <div className="candidate-name">{application.name}</div>
                    </div>
                  </td>
                  <td data-label="Email">
                    <div className="email-info">
                      <Mail size={12} />
                      <span>{application.email}</span>
                    </div>
                  </td>
                  <td data-label="Contact">
                    <div className="contact-info">
                      <div><Phone size={12} /> {application.contact}</div>
                    </div>
                  </td>
                  <td data-label="Position">
                    <div className="position-badge">{application.position}</div>
                  </td>
                  <td data-label="Employment Type">
                    <span className="employment-badge">{application.employment}</span>
                  </td>
                  <td data-label="Availability Date">
                    {formatDate(application.availabilityDate)}
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewDetails(application)}
                        title="View Details"
                        disabled={loading}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="action-btn download-btn"
                        onClick={() => handleDownloadResume(application)}
                        title={application.resumeUrl && application.resumeUrl.trim() !== '' ? "Download Resume" : "No Resume Available"}
                        disabled={loading || downloadingId === application.id || !application.resumeUrl || application.resumeUrl.trim() === ''}
                      >
                        <Download size={18} />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteClick(application.id)}
                        title="Delete Application"
                        disabled={loading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Application Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Application Details</h3>
              <button className="close-btn" onClick={() => setShowDetailModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="detail-content">
              <div className="detail-section">
                <h4>Personal Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <User size={16} />
                    <span className="detail-label">Full Name:</span>
                    <span className="detail-value">{selectedApplication.name}</span>
                  </div>
                  <div className="detail-item">
                    <Mail size={16} />
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedApplication.email}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={16} />
                    <span className="detail-label">Contact:</span>
                    <span className="detail-value">{selectedApplication.contact}</span>
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <h4>Professional Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <Briefcase size={16} />
                    <span className="detail-label">Position:</span>
                    <span className="detail-value">{selectedApplication.position}</span>
                  </div>
                  <div className="detail-item">
                    <Users size={16} />
                    <span className="detail-label">Employment Type:</span>
                    <span className="detail-value">{selectedApplication.employment}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span className="detail-label">Availability Date:</span>
                    <span className="detail-value">{formatDate(selectedApplication.availabilityDate)}</span>
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <h4>Application Metadata</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <FileText size={16} />
                    <span className="detail-label">Resume:</span>
                    {selectedApplication.resumeUrl && selectedApplication.resumeUrl.trim() !== '' ? (
                      <button 
                        className="resume-link"
                        onClick={() => handleDownloadResume(selectedApplication)}
                      >
                        {selectedApplication.fileName}
                      </button>
                    ) : (
                      <span className="detail-value no-resume">No resume uploaded</span>
                    )}
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span className="detail-label">Applied On:</span>
                    <span className="detail-value">{formatDateTime(selectedApplication.appliedDate)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowDetailModal(false)}>
                Close
              </button>
              <button 
                className="download-resume-btn"
                onClick={() => handleDownloadResume(selectedApplication)}
                disabled={downloadingId === selectedApplication.id || !selectedApplication.resumeUrl || selectedApplication.resumeUrl.trim() === ''}
              >
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirm Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-dialog-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="confirm-dialog-body">
              <p>Are you sure you want to delete this application?</p>
              <p className="confirm-warning">This action cannot be undone.</p>
            </div>
            <div className="confirm-dialog-footer">
              <button className="confirm-cancel-btn" onClick={handleCancelDelete} disabled={loading}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={handleConfirmDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .candidate-master-container {
          animation: fadeIn 0.5s ease;
          padding: 24px;
          background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
          min-height: 100vh;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header Styles */
        .candidate-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .candidate-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }

        .candidate-subtitle {
          color: #718096;
          font-size: 14px;
        }

        /* Table Styles */
        .table-container {
          background: white;
          border-radius: 20px;
          overflow-x: auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .candidate-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px;
        }

        .candidate-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        .candidate-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1a1f2e;
          font-size: 13px;
          border-bottom: 2px solid #e2e8f0;
        }

        .candidate-table td {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
          font-size: 14px;
        }

        .candidate-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .candidate-table tbody tr:hover {
          background-color: #f8fafc;
        }

        .candidate-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .candidate-name {
          font-weight: 600;
          color: #1a1f2e;
        }

        .email-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4a5568;
          font-size: 13px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
          color: #718096;
        }

        .contact-info div {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .position-badge {
          background: #e0e7ff;
          color: #4338ca;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .employment-badge {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .table-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 8px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .view-btn {
          color: #4338ca;
        }

        .view-btn:hover:not(:disabled) {
          background: #e0e7ff;
          transform: scale(1.05);
        }

        .download-btn {
          color: #059669;
        }

        .download-btn:hover:not(:disabled) {
          background: #d1fae5;
          transform: scale(1.05);
        }

        .delete-btn {
          color: #991b1b;
        }

        .delete-btn:hover:not(:disabled) {
          background: #fee2e2;
          transform: scale(1.05);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .detail-modal {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 650px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 24px 24px 0 0;
        }

        .modal-header h3 {
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #a0aec0;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .close-btn:hover {
          color: #1a1f2e;
        }

        .detail-content {
          padding: 24px;
        }

        .detail-section {
          margin-bottom: 24px;
        }

        .detail-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1f2e;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2e8f0;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          padding: 12px 16px;
          border-radius: 12px;
          flex-wrap: wrap;
        }

        .detail-label {
          font-weight: 500;
          color: #64748b;
          min-width: 100px;
          font-size: 13px;
        }

        .detail-value {
          color: #1a1f2e;
          font-size: 14px;
        }

        .no-resume {
          color: #ef4444;
          font-style: italic;
        }

        .resume-link {
          background: none;
          border: none;
          color: #6366f1;
          cursor: pointer;
          font-size: 14px;
          text-decoration: underline;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 0 0 24px 24px;
        }

        .cancel-btn {
          padding: 10px 20px;
          background: #f1f5f9;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .cancel-btn:hover {
          background: #e2e8f0;
        }

        .download-resume-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .download-resume-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .download-resume-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        /* Confirm Dialog */
        .confirm-dialog {
          background: white;
          border-radius: 20px;
          padding: 28px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        }

        .confirm-dialog-header h3 {
          font-size: 22px;
          font-weight: 600;
          color: #1a1f2e;
          margin-bottom: 16px;
        }

        .confirm-dialog-body {
          margin-bottom: 24px;
        }

        .confirm-dialog-body p {
          color: #4a5568;
          font-size: 15px;
          margin-bottom: 8px;
        }

        .confirm-warning {
          color: #e53e3e;
          font-size: 13px;
        }

        .confirm-dialog-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .confirm-cancel-btn {
          padding: 10px 20px;
          background: #f1f5f9;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
        }

        .confirm-cancel-btn:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .confirm-delete-btn {
          padding: 10px 20px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
        }

        .confirm-delete-btn:hover:not(:disabled) {
          background: #b91c1c;
        }

        .confirm-cancel-btn:disabled,
        .confirm-delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* No Data State */
        .no-data {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 20px;
          color: #718096;
          font-size: 16px;
        }

        .no-data svg {
          margin-bottom: 16px;
          color: #cbd5e0;
        }

        .no-data-sub {
          font-size: 13px;
          margin-top: 8px;
          color: #a0aec0;
        }

        .clear-filters-btn {
          margin-top: 16px;
          padding: 8px 20px;
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .candidate-master-container {
            padding: 16px;
          }
          
          .candidate-title {
            font-size: 24px;
          }
          
          .table-container {
            border-radius: 16px;
          }
          
          .candidate-table th,
          .candidate-table td {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default CandidateMaster;