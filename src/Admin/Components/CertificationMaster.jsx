import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../Api/axios';

const CertificationMaster = () => {
  const [certificationItems, setCertificationItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  // Fetch all certification items on component mount
  useEffect(() => {
    fetchCertificationItems();
  }, []);

  const fetchCertificationItems = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/get__all__certification');
      if (response.data.status) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map((item) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          image: item.image
        }));
        setCertificationItems(transformedData);
      } else {
        toast.error('Failed to fetch certification items');
      }
    } catch (error) {
      console.error('Error fetching certification items:', error);
      toast.error('Error loading certification items');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await httpClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.status) {
        toast.success('Image uploaded successfully!');
        return response.data.imageUrl;
      } else {
        toast.error('Image upload failed');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      // Handle file upload
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        // First show preview
        setFormData({
          ...formData,
          imagePreview: reader.result,
        });
        
        // Upload to server
        const uploadedUrl = await handleImageUpload(file);
        if (uploadedUrl) {
          setFormData({
            ...formData,
            image: uploadedUrl,
            imagePreview: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    if (!formData.title) {
      toast.error('Please enter a title');
      return;
    }

    if (!formData.description) {
      toast.error('Please enter a description');
      return;
    }

    setLoading(true);
    
    try {
      if (editingItem) {
        // Update existing certification item
        const response = await httpClient.put(`/update__certification/${editingItem.id}`, {
          image: formData.image,
          title: formData.title,
          description: formData.description
        });
        
        if (response.data.status) {
          toast.success('Certification updated successfully!');
          fetchCertificationItems(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to update certification');
        }
      } else {
        // Add new certification item
        const response = await httpClient.post('/create__certification__', {
          image: formData.image,
          title: formData.title,
          description: formData.description
        });
        
        if (response.data.status) {
          toast.success('Certification added successfully!');
          fetchCertificationItems(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to add certification');
        }
      }
    } catch (error) {
      console.error('Error submitting certification:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      imagePreview: item.image,
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
        const response = await httpClient.delete(`/delete__certification/${itemToDelete}`);
        
        if (response.data.status) {
          toast.success('Certification deleted successfully!');
          fetchCertificationItems(); // Refresh the list
        } else {
          toast.error('Failed to delete certification');
        }
      } catch (error) {
        console.error('Error deleting certification:', error);
        toast.error('Error deleting certification');
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
      title: '',
      description: '',
      image: '',
      imagePreview: '',
    });
  };

  return (
    <div className="certification-master-container">
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
      
      <div className="certification-header">
        <div>
          <h2 className="certification-title">Certification Master</h2>
          <p className="certification-subtitle">Manage your certifications</p>
        </div>
        <button 
          className="add-certification-btn"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <Plus size={20} />
          Add New Certification
        </button>
      </div>

      {/* Add/Edit Certification Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Certification' : 'Add New Certification'}</h3>
              <button className="close-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Certification Logo *</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  required={!editingItem}
                  disabled={uploading}
                />
                {uploading && <p style={{color: '#6366f1', marginTop: '8px'}}>Uploading...</p>}
                {(formData.imagePreview || formData.image) && (
                  <div className="image-preview">
                    <img src={formData.imagePreview || formData.image} alt="Preview" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Certification Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter certification title"
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter certification description"
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading || uploading}>
                  {loading ? 'Processing...' : (editingItem ? 'Update Certification' : 'Add Certification')}
                </button>
              </div>
            </form>
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
              <p>Are you sure you want to delete this certification?</p>
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

      {/* Certification Table */}
      {loading && certificationItems.length === 0 ? (
        <div className="no-data">
          <p>Loading certification items...</p>
        </div>
      ) : certificationItems.length === 0 ? (
        <div className="no-data">
          <p>No certification items found. Click "Add New Certification" to create one.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="certification-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Certification Logo</th>
                <th>Certification Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificationItems.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="Sr. No.">{index + 1}</td>
                  <td data-label="Certification Logo">
                    <div className="table-logo">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </td>
                  <td data-label="Certification Name">
                    <span className="certification-name">{item.title}</span>
                  </td>
                  <td data-label="Description">
                    <span className="certification-description">{item.description}</span>
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(item)}
                        title="Edit"
                        disabled={loading}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteClick(item.id)}
                        title="Delete"
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
        .certification-master-container {
          animation: fadeIn 0.5s ease;
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

        .certification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .certification-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .certification-subtitle {
          color: #718096;
          font-size: 14px;
        }

        .add-certification-btn {
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

        .add-certification-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
        }

        .add-certification-btn:disabled {
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

        /* Confirm Dialog Styles */
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

        .confirm-cancel-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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

        .confirm-delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #2d3748;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-group input[type="file"] {
          padding: 8px;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .image-preview {
          margin-top: 12px;
        }

        .image-preview img {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
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

        .cancel-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Table Styles */
        .table-responsive {
          overflow-x: auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .certification-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .certification-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 2px solid #e2e8f0;
        }

        .certification-table th {
          text-align: left;
          padding: 16px 20px;
          font-weight: 600;
          color: #1a1f2e;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .certification-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          color: #2d3748;
          vertical-align: middle;
        }

        .certification-table tbody tr {
          transition: all 0.3s ease;
        }

        .certification-table tbody tr:hover {
          background: #f8fafc;
          transform: scale(1.01);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .table-logo {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 12px;
          overflow: hidden;
        }

        .table-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .certification-name {
          font-weight: 500;
          color: #1a1f2e;
        }

        .certification-description {
          color: #4a5568;
          font-size: 13px;
          line-height: 1.4;
          display: block;
          max-width: 250px;
        }

        .table-actions {
          display: flex;
          gap: 12px;
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
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .certification-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .certification-title {
            font-size: 24px;
          }

          .certification-table thead {
            display: none;
          }

          .certification-table,
          .certification-table tbody,
          .certification-table tr,
          .certification-table td {
            display: block;
            width: 100%;
          }

          .certification-table tr {
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            background: white;
          }

          .certification-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #e2e8f0;
          }

          .certification-table td:last-child {
            border-bottom: none;
          }

          .certification-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #1a1f2e;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .table-logo {
            width: 50px;
            height: 50px;
          }

          .table-actions {
            justify-content: flex-end;
          }

          .modal-content {
            padding: 24px;
            margin: 20px;
          }

          .modal-header h3 {
            font-size: 20px;
          }

          .certification-description {
            max-width: none;
            text-align: right;
          }
        }

        @media (max-width: 480px) {
          .add-certification-btn {
            width: 100%;
            justify-content: center;
          }

          .table-logo {
            width: 40px;
            height: 40px;
          }

          .action-btn {
            padding: 6px;
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

        .table-responsive::-webkit-scrollbar {
          height: 8px;
        }

        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .table-responsive::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CertificationMaster;