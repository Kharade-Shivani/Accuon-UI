import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../Api/axios';

const ServiceMaster = () => {
  const [serviceItems, setServiceItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingCapability, setUploadingCapability] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    image: '',
    capabilityImage: ''
  });

  // Fetch all service subcategory items on component mount
  useEffect(() => {
    fetchServiceItems();
    fetchCategories();
  }, []);

  const fetchServiceItems = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/get__all__service__subcategory');
      if (response.data.status) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map((item) => ({
          id: item._id,
          categoryId: item.categoryId,
          title: item.title,
          description: item.description,
          image: item.image,
          capabilityImage: item.capabilityImage,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
        setServiceItems(transformedData);
      } else {
        toast.error('Failed to fetch service items');
      }
    } catch (error) {
      console.error('Error fetching service items:', error);
      toast.error('Error loading service items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Assuming you have a get all categories API
      const response = await httpClient.get('/get__all__service__category');
      if (response.data.status) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageUpload = async (file, type = 'image') => {
    if (type === 'image') {
      setUploading(true);
    } else {
      setUploadingCapability(true);
    }
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await httpClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.status) {
        toast.success(`${type === 'image' ? 'Image' : 'Capability Image'} uploaded successfully!`);
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
      if (type === 'image') {
        setUploading(false);
      } else {
        setUploadingCapability(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      // Handle main image upload
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        // First show preview
        setFormData({
          ...formData,
          imagePreview: reader.result,
        });
        
        // Upload to server
        const uploadedUrl = await handleImageUpload(file, 'image');
        if (uploadedUrl) {
          setFormData({
            ...formData,
            image: uploadedUrl,
            imagePreview: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    } else if (name === 'capabilityImage' && files && files[0]) {
      // Handle capability image upload
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        // First show preview
        setFormData({
          ...formData,
          capabilityImagePreview: reader.result,
        });
        
        // Upload to server
        const uploadedUrl = await handleImageUpload(file, 'capability');
        if (uploadedUrl) {
          setFormData({
            ...formData,
            capabilityImage: uploadedUrl,
            capabilityImagePreview: reader.result,
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
      toast.error('Please upload a service image');
      return;
    }

    if (!formData.capabilityImage) {
      toast.error('Please upload a capability image');
      return;
    }

    if (!formData.title) {
      toast.error('Please enter a title');
      return;
    }

    if (!formData.categoryId) {
      toast.error('Please select a category');
      return;
    }

    setLoading(true);
    
    try {
      if (editingItem) {
        // Update existing service subcategory
        const response = await httpClient.put(`/update__service__subcategory/${editingItem.id}`, {
          categoryId: formData.categoryId,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          capabilityImage: formData.capabilityImage
        });
        
        if (response.data.status) {
          toast.success('Service item updated successfully!');
          fetchServiceItems(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to update service item');
        }
      } else {
        // Add new service subcategory
        const response = await httpClient.post('/create__service__subcategory', {
          categoryId: formData.categoryId,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          capabilityImage: formData.capabilityImage
        });
        
        if (response.data.status) {
          toast.success('Service item added successfully!');
          fetchServiceItems(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to add service item');
        }
      }
    } catch (error) {
      console.error('Error submitting service item:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      categoryId: typeof item.categoryId === 'object' ? item.categoryId._id : item.categoryId,
      title: item.title,
      description: item.description || '',
      image: item.image,
      capabilityImage: item.capabilityImage || '',
      imagePreview: item.image,
      capabilityImagePreview: item.capabilityImage,
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
        const response = await httpClient.delete(`/delete__service__subcategory/${itemToDelete}`);
        
        if (response.data.status) {
          toast.success('Service item deleted successfully!');
          fetchServiceItems(); // Refresh the list
        } else {
          toast.error('Failed to delete service item');
        }
      } catch (error) {
        console.error('Error deleting service item:', error);
        toast.error('Error deleting service item');
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
      categoryId: '',
      title: '',
      description: '',
      image: '',
      capabilityImage: '',
      imagePreview: '',
      capabilityImagePreview: ''
    });
  };

  return (
    <div className="service-master-container">
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
      
      <div className="service-header">
        <div>
          <h2 className="service-title">Service Master</h2>
          <p className="service-subtitle">Manage your service subcategories</p>
        </div>
        <button 
          className="add-service-btn"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      {/* Add/Edit Service Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Service' : 'Add New Service'}</h3>
              <button className="close-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Service Image *</label>
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
                    <img src={formData.imagePreview || formData.image} alt="Service Preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Capability Image *</label>
                <input
                  type="file"
                  name="capabilityImage"
                  accept="image/*"
                  onChange={handleInputChange}
                  required={!editingItem}
                  disabled={uploadingCapability}
                />
                {uploadingCapability && <p style={{color: '#6366f1', marginTop: '8px'}}>Uploading capability image...</p>}
                {(formData.capabilityImagePreview || formData.capabilityImage) && (
                  <div className="image-preview">
                    <img src={formData.capabilityImagePreview || formData.capabilityImage} alt="Capability Preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Service Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter service title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter service description"
                  rows="4"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading || uploading || uploadingCapability}>
                  {loading ? 'Processing...' : (editingItem ? 'Update Service' : 'Add Service')}
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
              <p>Are you sure you want to delete this service?</p>
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

      {/* Service Table */}
      {loading && serviceItems.length === 0 ? (
        <div className="no-data">
          <p>Loading service items...</p>
        </div>
      ) : serviceItems.length === 0 ? (
        <div className="no-data">
          <p>No service items found. Click "Add New Service" to create one.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="service-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Service Image</th>
                <th>Capability Image</th>
                <th>Category</th>
                <th>Service Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceItems.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="Sr. No.">{index + 1}</td>
                  <td data-label="Service Image">
                    <div className="table-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </td>
                  <td data-label="Capability Image">
                    <div className="table-image">
                      <img src={item.capabilityImage} alt={`${item.title} capability`} />
                    </div>
                  </td>
                  <td data-label="Category">
                    <span className="category-name">
                      {typeof item.categoryId === 'object' ? item.categoryId.name : item.categoryId}
                    </span>
                  </td>
                  <td data-label="Service Title">
                    <span className="service-title-text">{item.title}</span>
                  </td>
                  <td data-label="Description">
                    <span className="service-description">{item.description || '—'}</span>
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
        .service-master-container {
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

        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .service-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .service-subtitle {
          color: #718096;
          font-size: 14px;
        }

        .add-service-btn {
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

        .add-service-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
        }

        .add-service-btn:disabled {
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
        .form-group textarea,
        .form-group select {
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
        .form-group textarea:focus,
        .form-group select:focus {
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

        .service-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .service-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 2px solid #e2e8f0;
        }

        .service-table th {
          text-align: left;
          padding: 16px 20px;
          font-weight: 600;
          color: #1a1f2e;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .service-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          color: #2d3748;
          vertical-align: middle;
        }

        .service-table tbody tr {
          transition: all 0.3s ease;
        }

        .service-table tbody tr:hover {
          background: #f8fafc;
          transform: scale(1.01);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .table-image {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 12px;
          overflow: hidden;
        }

        .table-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .category-name {
          font-weight: 500;
          color: #6366f1;
          background: #e0e7ff;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          font-size: 12px;
        }

        .service-title-text {
          font-weight: 500;
          color: #1a1f2e;
        }

        .service-description {
          color: #718096;
          font-size: 13px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 200px;
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
          .service-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .service-title {
            font-size: 24px;
          }

          .service-table thead {
            display: none;
          }

          .service-table,
          .service-table tbody,
          .service-table tr,
          .service-table td {
            display: block;
            width: 100%;
          }

          .service-table tr {
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            background: white;
          }

          .service-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #e2e8f0;
          }

          .service-table td:last-child {
            border-bottom: none;
          }

          .service-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #1a1f2e;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .table-image {
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
        }

        @media (max-width: 480px) {
          .add-service-btn {
            width: 100%;
            justify-content: center;
          }

          .table-image {
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

export default ServiceMaster;