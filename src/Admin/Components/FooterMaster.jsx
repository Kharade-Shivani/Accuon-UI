import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Phone, Mail, MapPin } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../Api/axios';

const FooterMaster = () => {
  const [footerItems, setFooterItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: ['', ''],
    email: ['', ''],
    address: ''
  });

  // Fetch all footer items on component mount
  useEffect(() => {
    fetchFooterItems();
  }, []);

  const fetchFooterItems = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/get__all__footer');
      if (response.data.status) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map((item) => ({
          id: item._id,
          phone: item.phone || ['', ''],
          email: item.email || ['', ''],
          address: item.address || ''
        }));
        setFooterItems(transformedData);
      } else {
        toast.error('Failed to fetch footer items');
      }
    } catch (error) {
      console.error('Error fetching footer items:', error);
      toast.error('Error loading footer items');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...formData.phone];
    updatedPhones[index] = value;
    setFormData({
      ...formData,
      phone: updatedPhones
    });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...formData.email];
    updatedEmails[index] = value;
    setFormData({
      ...formData,
      email: updatedEmails
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate at least one phone number
    const hasValidPhone = formData.phone.some(phone => phone.trim() !== '');
    if (!hasValidPhone) {
      toast.error('Please enter at least one phone number');
      return;
    }

    // Validate at least one email
    const hasValidEmail = formData.email.some(email => email.trim() !== '');
    if (!hasValidEmail) {
      toast.error('Please enter at least one email address');
      return;
    }

    if (!formData.address.trim()) {
      toast.error('Please enter an address');
      return;
    }

    setLoading(true);
    
    try {
      if (editingItem) {
        // Update existing footer item
        const response = await httpClient.put(`/update__footer/${editingItem.id}`, {
          phone: formData.phone.filter(p => p.trim() !== ''),
          email: formData.email.filter(e => e.trim() !== ''),
          address: formData.address
        });
        
        if (response.data.status) {
          toast.success('Footer updated successfully!');
          fetchFooterItems(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to update footer');
        }
      } else {
        // Add new footer item
        const response = await httpClient.post('/create__footer__', {
          phone: formData.phone.filter(p => p.trim() !== ''),
          email: formData.email.filter(e => e.trim() !== ''),
          address: formData.address
        });
        
        if (response.data.status) {
          toast.success('Footer added successfully!');
          fetchFooterItems(); // Refresh the list
          resetForm();
        } else {
          toast.error('Failed to add footer');
        }
      }
    } catch (error) {
      console.error('Error submitting footer:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    // Ensure we have 2 phone and 2 email slots
    const phones = [...item.phone];
    const emails = [...item.email];
    
    while (phones.length < 2) phones.push('');
    while (emails.length < 2) emails.push('');
    
    setEditingItem(item);
    setFormData({
      phone: phones,
      email: emails,
      address: item.address
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
        const response = await httpClient.delete(`/delete__footer/${itemToDelete}`);
        
        if (response.data.status) {
          toast.success('Footer deleted successfully!');
          fetchFooterItems(); // Refresh the list
        } else {
          toast.error('Failed to delete footer');
        }
      } catch (error) {
        console.error('Error deleting footer:', error);
        toast.error('Error deleting footer');
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
      phone: ['', ''],
      email: ['', ''],
      address: ''
    });
  };

  return (
    <div className="gallery-master-container">
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
      
      <div className="gallery-header">
        <div>
          <h2 className="gallery-title">Footer Master</h2>
          <p className="gallery-subtitle">Manage footer contact information</p>
        </div>
        <button 
          className="add-photo-btn"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <Plus size={20} />
          Add New Footer
        </button>
      </div>

      {/* Add/Edit Footer Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Footer Information' : 'Add New Footer'}</h3>
              <button className="close-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Phone Numbers * (at least one required)</label>
                <div className="phone-group">
                  <div className="phone-input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      name="phone_0"
                      value={formData.phone[0]}
                      onChange={(e) => handlePhoneChange(0, e.target.value)}
                      placeholder="Enter primary phone number"
                    />
                  </div>
                  <div className="phone-input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      name="phone_1"
                      value={formData.phone[1]}
                      onChange={(e) => handlePhoneChange(1, e.target.value)}
                      placeholder="Enter secondary phone number (optional)"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Email Addresses * (at least one required)</label>
                <div className="email-group">
                  <div className="email-input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      name="email_0"
                      value={formData.email[0]}
                      onChange={(e) => handleEmailChange(0, e.target.value)}
                      placeholder="Enter primary email address"
                    />
                  </div>
                  <div className="email-input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      name="email_1"
                      value={formData.email[1]}
                      onChange={(e) => handleEmailChange(1, e.target.value)}
                      placeholder="Enter secondary email address (optional)"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Address *</label>
                <div className="address-input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter complete address"
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Processing...' : (editingItem ? 'Update Footer' : 'Add Footer')}
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
              <p>Are you sure you want to delete this footer information?</p>
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

      {/* Footer Table */}
      {loading && footerItems.length === 0 ? (
        <div className="no-data">
          <p>Loading footer items...</p>
        </div>
      ) : footerItems.length === 0 ? (
        <div className="no-data">
          <p>No footer items found. Click "Add New Footer" to create one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="gallery-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Phone Numbers</th>
                <th>Email Addresses</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {footerItems.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Phone Numbers">
                    <div className="contact-list">
                      {item.phone && item.phone.map((phone, phoneIndex) => (
                        <div key={phoneIndex} className="contact-item">
                          <Phone size={14} />
                          <span>{phone}</span>
                        </div>
                      ))}
                      {(!item.phone || item.phone.length === 0) && (
                        <span className="no-data-text">No phone numbers</span>
                      )}
                    </div>
                  </td>
                  <td data-label="Email Addresses">
                    <div className="contact-list">
                      {item.email && item.email.map((email, emailIndex) => (
                        <div key={emailIndex} className="contact-item">
                          <Mail size={14} />
                          <span>{email}</span>
                        </div>
                      ))}
                      {(!item.email || item.email.length === 0) && (
                        <span className="no-data-text">No email addresses</span>
                      )}
                    </div>
                  </td>
                  <td data-label="Address">
                    <div className="address-display">
                      <MapPin size={14} />
                      <span>{item.address || 'No address provided'}</span>
                    </div>
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
        .gallery-master-container {
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

        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .gallery-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .gallery-subtitle {
          color: #718096;
          font-size: 14px;
        }

        .add-photo-btn {
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

        .add-photo-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
        }

        .add-photo-btn:disabled {
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

        .phone-group,
        .email-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .phone-input-wrapper,
        .email-input-wrapper,
        .address-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #a0aec0;
        }

        .phone-input-wrapper input,
        .email-input-wrapper input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .address-input-wrapper textarea {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          font-family: inherit;
          resize: vertical;
        }

        .phone-input-wrapper input:focus,
        .email-input-wrapper input:focus,
        .address-input-wrapper textarea:focus {
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

        .gallery-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .gallery-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        .gallery-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1a1f2e;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
        }

        .gallery-table td {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        .gallery-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .gallery-table tbody tr:hover {
          background-color: #f8fafc;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #2d3748;
        }

        .contact-item svg {
          color: #6366f1;
          flex-shrink: 0;
        }

        .address-display {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
          color: #2d3748;
          line-height: 1.5;
        }

        .address-display svg {
          color: #6366f1;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .no-data-text {
          color: #a0aec0;
          font-style: italic;
          font-size: 13px;
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
          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .gallery-title {
            font-size: 24px;
          }

          .table-container {
            border-radius: 12px;
          }

          .gallery-table th {
            padding: 12px;
            font-size: 12px;
          }

          .gallery-table td {
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
          .add-photo-btn {
            width: 100%;
            justify-content: center;
          }

          .table-container {
            border-radius: 12px;
          }

          .gallery-table {
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

export default FooterMaster;