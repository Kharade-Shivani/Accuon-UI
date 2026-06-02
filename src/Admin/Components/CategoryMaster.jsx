import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../Api/axios';

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: ''
  });

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/get__all__service__category');
      if (response.data.status) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map((item) => ({
          id: item._id,
          name: item.name
        }));
        setCategories(transformedData);
        toast.success('Categories loaded successfully!');
      } else {
        toast.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error loading categories');
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
    
    if (!formData.name.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        name: formData.name
      };
      
      if (editingItem) {
        // Update existing category
        const response = await httpClient.put(`/update__service__category/${editingItem.id}`, {
          _id: editingItem.id,
          name: formData.name
        });
        
        if (response.data.status) {
          toast.success(response.data.message || 'Category updated successfully!');
          fetchCategories();
          resetForm();
        } else {
          toast.error(response.data.message || 'Failed to update category');
        }
      } else {
        // Add new category
        const response = await httpClient.post('/create__service__category', payload);
        
        if (response.data.status) {
          toast.success('Category created successfully!');
          fetchCategories();
          resetForm();
        } else {
          toast.error(response.data.message || 'Failed to create category');
        }
      }
    } catch (error) {
      console.error('Error submitting category:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name
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
        const response = await httpClient.delete(`/delete__service__category/${itemToDelete}`);
        
        if (response.data.status) {
          toast.success('Category deleted successfully!');
          fetchCategories();
        } else {
          toast.error(response.data.message || 'Failed to delete category');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error(error.response?.data?.message || 'Error deleting category');
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
      name: ''
    });
  };

  return (
    <div className="category-master-container">
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
      
      <div className="category-header">
        <div>
          <h2 className="category-title">Service Category Master</h2>
          <p className="category-subtitle">Manage your service categories</p>
        </div>
        <button 
          className="add-category-btn"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Add/Edit Category Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Category' : 'Add Category'}</h3>
              <button className="close-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Processing...' : (editingItem ? 'Update Category' : 'Add Category')}
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
              <p>Are you sure you want to delete this category?</p>
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

      {/* Categories Table */}
      {loading && categories.length === 0 ? (
        <div className="no-data">
          <p>Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="no-data">
          <p>No categories found. Click "Add Category" to create one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Category Name">
                    <div className="table-name">{item.name}</div>
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
        .category-master-container {
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

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .category-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .category-subtitle {
          color: #718096;
          font-size: 14px;
        }

        .add-category-btn {
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

        .add-category-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
        }

        .add-category-btn:disabled {
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
          max-width: 500px;
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

        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-group input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
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
        .table-container {
          background: white;
          border-radius: 16px;
          overflow-x: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .category-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .category-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        .category-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1a1f2e;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
        }

        .category-table td {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        .category-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .category-table tbody tr:hover {
          background-color: #f8fafc;
        }

        .table-name {
          font-weight: 500;
          color: #1a1f2e;
          max-width: 200px;
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .category-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .category-title {
            font-size: 24px;
          }

          .table-container {
            border-radius: 12px;
          }

          .category-table th {
            padding: 12px;
            font-size: 12px;
          }

          .category-table td {
            padding: 12px;
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
          .add-category-btn {
            width: 100%;
            justify-content: center;
          }

          .table-container {
            border-radius: 12px;
          }

          .category-table {
            min-width: 500px;
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

export default CategoryMaster;