import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Briefcase, DollarSign } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../Api/axios'; // Adjust the path as needed

const JobMaster = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    experience: '',
    salary: ''
  });

  // Fetch all jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/get__all__job');
      if (response.data.status) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map((item) => ({
          id: item._id,
          jobTitle: item.jobTitle,
          department: item.department,
          experience: item.experience,
          salary: item.salary,
          createdAt: item.createdAt
        }));
        setJobs(transformedData);
      } else {
        toast.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Error loading jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.jobTitle || !formData.department || !formData.experience || !formData.salary) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate experience format (supports numbers, decimals, and ranges like "2-7", "2-7 years", "5+ years")
    const experiencePattern = /^(\d+(\.\d+)?)(\s*-\s*\d+(\.\d+)?)?(\s*(years?|yrs?))?$/i;
    if (!experiencePattern.test(formData.experience.trim())) {
      toast.error('Please enter a valid experience (e.g., 5, 2-7, 5+ years, 2-7 Years)');
      return;
    }

    setLoading(true);
    
    try {
      // Format the experience properly
      let formattedExperience = formData.experience.trim();
      
      // Add "Years" suffix if not present
      if (!formattedExperience.toLowerCase().includes('year') && !formattedExperience.toLowerCase().includes('yr')) {
        formattedExperience = formattedExperience + ' Years';
      }
      
      const payload = {
        jobTitle: formData.jobTitle,
        department: formData.department,
        experience: formattedExperience,
        salary: formData.salary
      };
      
      if (editingItem) {
        // Update existing job
        const response = await httpClient.put(`/update__job/${editingItem.id}`, payload);
        
        if (response.data.status) {
          toast.success('Job updated successfully!');
          fetchJobs(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to update job');
        }
      } else {
        // Add new job
        const response = await httpClient.post('/create__job', payload);
        
        if (response.data.status) {
          toast.success('Job posted successfully!');
          fetchJobs(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to post job');
        }
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    // Extract the experience value without the "Years" suffix for editing
    let experienceValue = job.experience || '';
    
    // Remove "Years", "Year", "Yrs", "Yr" suffixes (case insensitive)
    experienceValue = experienceValue.replace(/\s*(years?|yrs?)\s*$/i, '').trim();
    
    setEditingItem(job);
    setFormData({
      jobTitle: job.jobTitle,
      department: job.department,
      experience: experienceValue,
      salary: job.salary
    });
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      setLoading(true);
      try {
        const response = await httpClient.delete(`/delete__job/${itemToDelete}`);
        
        if (response.data.status) {
          toast.success('Job deleted successfully!');
          fetchJobs(); // Refresh the list
        } else {
          toast.error('Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error('Error deleting job');
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

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      jobTitle: '',
      department: '',
      experience: '',
      salary: ''
    });
  };

  return (
    <div className="job-master-container">
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
      
      <div className="job-header">
        <div>
          <h2 className="job-title">Job Master</h2>
          <p className="job-subtitle">Manage job postings for your career page</p>
        </div>
        <button 
          className="add-job-btn"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <Plus size={20} />
          Post New Job
        </button>
      </div>

      {/* Add/Edit Job Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Job Posting' : 'Post New Job'}</h3>
              <button className="close-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h4 className="section-title">Job Information</h4>
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Frontend Developer"
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., IT, Marketing, Sales"
                  />
                </div>

                <div className="form-group">
                  <label>Experience (in years) *</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 5, 2-7, 5+ years, 2-7 Years"
                  />
                  <small className="helper-text">
                    Examples: 5, 2-7, 5+ years, 0-2 Years, Fresher
                  </small>
                </div>

                <div className="form-group">
                  <label>Salary *</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., ₹10-6 LPA"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Processing...' : (editingItem ? 'Update Job' : 'Post Job')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-dialog-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="confirm-dialog-body">
              <p>Are you sure you want to delete this job posting?</p>
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

      {/* Jobs Table */}
      {loading && jobs.length === 0 ? (
        <div className="no-data">
          <div className="loading-spinner"></div>
          <p>Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="no-data">
          <p>No jobs found. Click "Post New Job" to create one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Experience Level</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Job Title">
                    <div className="job-title-cell">
                      <Briefcase size={16} className="job-icon" />
                      <div className="job-title-text">{job.jobTitle}</div>
                    </div>
                  </td>
                  <td data-label="Department">{job.department}</td>
                  <td data-label="Experience Level">{job.experience}</td>
                  <td data-label="Salary">
                    <div className="salary-cell">
                      <DollarSign size={14} />
                      <span>{job.salary}</span>
                    </div>
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(job)}
                        title="Edit Job"
                        disabled={loading}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteClick(job.id)}
                        title="Delete Job"
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

      <style jsx>{`
        .job-master-container {
          animation: fadeIn 0.5s ease;
          padding: 24px;
          background: #f8fafc;
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

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .job-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .job-subtitle {
          color: #718096;
          font-size: 14px;
        }

        .add-job-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-job-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
        }

        .add-job-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 32px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }

        .modal-header h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1a1f2e;
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

        .form-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #2d3748;
        }

        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-group input[type="number"] {
          -moz-appearance: textfield;
        }

        .form-group input[type="number"]::-webkit-inner-spin-button,
        .form-group input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .form-group input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .helper-text {
          display: block;
          margin-top: 6px;
          font-size: 12px;
          color: #718096;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }

        .cancel-btn {
          padding: 10px 20px;
          background: #f1f5f9;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .cancel-btn:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .submit-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
        }

        .submit-btn:disabled,
        .cancel-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Confirm Dialog */
        .confirm-dialog {
          background: white;
          border-radius: 20px;
          padding: 32px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        }

        .confirm-dialog-header h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1a1f2e;
          margin-bottom: 16px;
        }

        .confirm-dialog-body {
          margin-bottom: 24px;
        }

        .confirm-dialog-body p {
          color: #4a5568;
          font-size: 16px;
          margin-bottom: 8px;
        }

        .confirm-warning {
          color: #e53e3e;
          font-size: 14px;
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
          transition: all 0.2s;
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
          transition: all 0.2s;
        }

        .confirm-delete-btn:hover:not(:disabled) {
          background: #b91c1c;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
        }

        /* Table Styles */
        .table-container {
          background: white;
          border-radius: 16px;
          overflow-x: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .jobs-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .jobs-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        .jobs-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1a1f2e;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
        }

        .jobs-table td {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        .jobs-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .jobs-table tbody tr:hover {
          background-color: #f8fafc;
        }

        .job-title-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .job-icon {
          color: #6366f1;
          flex-shrink: 0;
        }

        .job-title-text {
          font-weight: 500;
          color: #1a1f2e;
        }

        .salary-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4a5568;
        }

        .table-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 8px;
          border: none;
          border-radius: 8px;
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

        .edit-btn {
          color: #4338ca;
        }

        .edit-btn:hover:not(:disabled) {
          background: #e0e7ff;
          transform: scale(1.05);
        }

        .delete-btn {
          color: #991b1b;
        }

        .delete-btn:hover:not(:disabled) {
          background: #fee2e2;
          transform: scale(1.05);
        }

        .no-data {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          color: #718096;
          font-size: 16px;
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
          to { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .job-master-container {
            padding: 16px;
          }

          .job-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .job-title {
            font-size: 24px;
          }

          .modal-content {
            padding: 24px;
            margin: 20px;
          }

          .modal-header h3 {
            font-size: 20px;
          }

          .section-title {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .add-job-btn {
            width: 100%;
            justify-content: center;
          }

          .jobs-table {
            min-width: 600px;
          }
        }

        /* Scrollbar Styling */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        .table-container::-webkit-scrollbar {
          height: 8px;
        }

        .table-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .table-container::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default JobMaster;