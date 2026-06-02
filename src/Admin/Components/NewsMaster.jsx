import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../Api/axios';

const NewsMaster = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    video: ''
  });

  // Fetch all news items on component mount
  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/api/news/get__all__news');
      if (response.data.status) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map((item) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          image: item.image || '',
          video: item.video || ''
        }));
        setNewsItems(transformedData);
      } else {
        toast.error('Failed to fetch news items');
      }
    } catch (error) {
      console.error('Error fetching news items:', error);
      toast.error('Error loading news items');
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
      // Check for 'image' field first, then fallback to other fields
      let imageUrl = response.data.image || response.data.imageUrl || response.data.url || response.data.fileUrl;
      
      if (imageUrl) {
        toast.success('Image uploaded successfully!');
        return imageUrl;
      } else {
        toast.error('Image upload failed - no URL returned');
        return null;
      }
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
 const handleVideoUpload = async (file) => {
  setUploading(true);
  const formData = new FormData();
  formData.append('video', file);

  try {
    const response = await httpClient.post('/api/news/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Video upload full response:', response.data);
    
    if (response.data.status) {
      // Fix: Look for 'video' field instead of other fields
      let videoUrl = null;
      
      if (response.data.video) {
        videoUrl = response.data.video;
      } else if (response.data.image) {
        videoUrl = response.data.image;
      } else if (response.data.url) {
        videoUrl = response.data.url;
      } else if (response.data.fileUrl) {
        videoUrl = response.data.fileUrl;
      } else if (response.data.data && response.data.data.url) {
        videoUrl = response.data.data.url;
      }
      
      if (videoUrl) {
        toast.success('Video uploaded successfully!');
        return videoUrl;
      } else {
        console.error('No URL found in response:', response.data);
        toast.error('Video uploaded but no URL returned');
        return null;
      }
    } else {
      toast.error(response.data.message || 'Video upload failed');
      return null;
    }
  } catch (error) {
    console.error('Error uploading video:', error);
    toast.error(error.response?.data?.message || 'Error uploading video');
    return null;
  } finally {
    setUploading(false);
  }
};
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        imagePreview: reader.result
      }));
    };
    reader.readAsDataURL(file);

    // Upload to server
    const uploadedUrl = await handleImageUpload(file);
    if (uploadedUrl) {
      setFormData(prev => ({
        ...prev,
        image: uploadedUrl
      }));
      console.log('Image URL saved:', uploadedUrl);
    } else {
      // Clear preview if upload failed
      setFormData(prev => ({
        ...prev,
        imagePreview: null
      }));
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        videoPreview: reader.result
      }));
    };
    reader.readAsDataURL(file);

    // Upload to server
    const uploadedUrl = await handleVideoUpload(file);
    if (uploadedUrl) {
      setFormData(prev => ({
        ...prev,
        video: uploadedUrl
      }));
      console.log('Video URL saved:', uploadedUrl);
      toast.success('Video ready to save');
    } else {
      // Clear preview if upload failed
      setFormData(prev => ({
        ...prev,
        videoPreview: null
      }));
      toast.error('Video upload failed. Please try again.');
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
    
    console.log('Form data before submit:', {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      video: formData.video
    });
    
    if (!formData.title) {
      toast.error('Please enter a title');
      return;
    }

    // Check if either image or video has a URL
    const hasImage = formData.image && formData.image.trim() !== '';
    const hasVideo = formData.video && formData.video.trim() !== '';
    
    if (!hasImage && !hasVideo) {
      toast.error('Please upload at least one media (image or video)');
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
      };
      
      // Only include image and video if they have values
      if (hasImage) payload.image = formData.image;
      if (hasVideo) payload.video = formData.video;
      
      console.log('Submitting payload:', payload);
      
      if (editingItem) {
        // Update existing news item
        const response = await httpClient.put(`/api/news/update__news/${editingItem.id}`, payload);
        
        if (response.data.status) {
          toast.success('News item updated successfully!');
          fetchNewsItems();
          resetForm();
        } else {
          toast.error(response.data.message || 'Failed to update news item');
        }
      } else {
        // Add new news item
        const response = await httpClient.post('/api/news/create__news__', payload);
        
        if (response.data.status) {
          toast.success('News item added successfully!');
          fetchNewsItems();
          resetForm();
        } else {
          toast.error(response.data.message || 'Failed to add news item');
        }
      }
    } catch (error) {
      console.error('Error submitting news item:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image || '',
      video: item.video || '',
      imagePreview: item.image || '',
      videoPreview: item.video || ''
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
        const response = await httpClient.delete(`/api/news/delete__news/${itemToDelete}`);
        
        if (response.data.status) {
          toast.success('News item deleted successfully!');
          fetchNewsItems();
        } else {
          toast.error('Failed to delete news item');
        }
      } catch (error) {
        console.error('Error deleting news item:', error);
        toast.error('Error deleting news item');
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
      video: '',
      imagePreview: '',
      videoPreview: ''
    });
  };

  // Helper function to check if media is video based on URL or file type
  const isVideoFile = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || 
           url.includes('video') || 
           url.includes('youtube') || 
           url.includes('vimeo');
  };

  // Helper function to render media preview
  const renderMediaPreview = (item) => {
    if (item.video && isVideoFile(item.video)) {
      return (
        <div className="table-media video-preview">
          <video src={item.video} controls className="media-video" />
          <div className="media-badge video-badge">
            <Video size={12} />
            <span>Video</span>
          </div>
        </div>
      );
    } else if (item.image) {
      return (
        <div className="table-media image-preview">
          <img src={item.image} alt={item.title} />
          <div className="media-badge image-badge">
            <ImageIcon size={12} />
            <span>Image</span>
          </div>
        </div>
      );
    }
    return (
      <div className="table-media no-media">
        <FileText size={24} />
        <span>No Media</span>
      </div>
    );
  };

  return (
    <div className="news-master-container">
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
      
      <div className="news-header">
        <div>
          <h2 className="news-title">News Master</h2>
          <p className="news-subtitle">Manage your news with images and videos</p>
        </div>
        <button 
          className="add-news-btn"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <Plus size={20} />
          Add News
        </button>
      </div>

      {/* Add/Edit News Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit News Item' : 'Add News'}</h3>
              <button className="close-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter news title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter news description"
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
                {(formData.imagePreview || formData.image) && (
                  <div className="media-preview">
                    <img src={formData.imagePreview || formData.image} alt="Preview" />
                    <button 
                      type="button"
                      className="remove-media-btn"
                      onClick={() => setFormData(prev => ({...prev, image: '', imagePreview: ''}))}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Video</label>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleVideoChange}
                  disabled={uploading}
                />
                {uploading && <p style={{color: '#6366f1', marginTop: '8px'}}>Uploading media...</p>}
                {(formData.videoPreview || formData.video) && (
                  <div className="media-preview video-preview">
                    <video src={formData.videoPreview || formData.video} controls />
                    <button 
                      type="button"
                      className="remove-media-btn"
                      onClick={() => setFormData(prev => ({...prev, video: '', videoPreview: ''}))}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading || uploading}>
                  {loading ? 'Processing...' : (editingItem ? 'Update News' : 'Add News')}
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
              <p>Are you sure you want to delete this news item?</p>
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

      {/* News Table */}
      {loading && newsItems.length === 0 ? (
        <div className="no-data">
          <p>Loading news items...</p>
        </div>
      ) : newsItems.length === 0 ? (
        <div className="no-data">
          <p>No news items found. Click "Add News" to create one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="news-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Media</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Media">
                    {renderMediaPreview(item)}
                  </td>
                  <td data-label="Title">
                    <div className="table-title">{item.title}</div>
                  </td>
                  <td data-label="Description">
                    <div className="table-description">{item.description || 'No description'}</div>
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
        .news-master-container {
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

        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .news-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1f2e, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .news-subtitle {
          color: #718096;
          font-size: 14px;
        }

        .add-news-btn {
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

        .add-news-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
        }

        .add-news-btn:disabled {
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

        .media-preview {
          margin-top: 12px;
          position: relative;
          display: inline-block;
        }

        .media-preview img,
        .media-preview video {
          max-width: 100%;
          max-height: 150px;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
        }

        .media-preview video {
          max-width: 200px;
        }

        .remove-media-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .remove-media-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
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

        .news-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .news-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        .news-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1a1f2e;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
        }

        .news-table td {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        .news-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .news-table tbody tr:hover {
          background-color: #f8fafc;
        }

        .table-media {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .table-media img,
        .table-media .media-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .table-media .media-video {
          object-fit: cover;
        }

        .table-media.no-media {
          flex-direction: column;
          gap: 4px;
          color: #94a3b8;
          font-size: 10px;
        }

        .media-badge {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          backdrop-filter: blur(2px);
        }

        .video-preview {
          background: #0f172a;
        }

        .table-title {
          font-weight: 500;
          color: #1a1f2e;
          max-width: 200px;
        }

        .table-description {
          color: #718096;
          font-size: 14px;
          max-width: 300px;
          line-height: 1.5;
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
          .news-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .news-title {
            font-size: 24px;
          }

          .table-container {
            border-radius: 12px;
          }

          .news-table th {
            padding: 12px;
            font-size: 12px;
          }

          .news-table td {
            padding: 12px;
          }

          .modal-content {
            padding: 24px;
            margin: 20px;
          }

          .modal-header h3 {
            font-size: 20px;
          }

          .table-media {
            width: 60px;
            height: 60px;
          }

          .table-description {
            max-width: 200px;
          }
        }

        @media (max-width: 480px) {
          .add-news-btn {
            width: 100%;
            justify-content: center;
          }

          .table-container {
            border-radius: 12px;
          }

          .news-table {
            min-width: 600px;
          }

          .table-description {
            max-width: 150px;
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

export default NewsMaster;