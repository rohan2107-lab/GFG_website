import React from 'react';
import { FaImage } from 'react-icons/fa';

const PostFormat = ({ post, setPost }) => {
  const isPublished = post.status === 'Published';
  const displayDate = isPublished 
    ? new Date(post.published_at || post.created_at).toLocaleDateString()
    : new Date().toLocaleDateString();

  const handleFileChange = (e) => {
    // In a real app, you would handle the file upload to Supabase storage here
    alert("Photo upload logic needs to be implemented with Supabase Storage!");
    // For now, just setting a mock URL
    setPost({ ...post, photo_url: 'MOCK_UPLOADED_URL' });
  };

  return (
    <div className="post-format-fields">
      <div className="post-meta-info">
        <span className={`status-tag status-${post.status.toLowerCase()}`}>{post.status}</span>
        <span className="date-tag">Date: {displayDate}</span>
      </div>

      <div className="photo-upload-area">
        {post.photo_url ? (
          <img src={post.photo_url} alt="Blog Thumbnail" className="uploaded-photo-preview" />
        ) : (
          <div className="photo-placeholder">
            <FaImage />
            <span>No Photo Uploaded</span>
          </div>
        )}
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="file-input"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="upload-label">
          {post.photo_url ? 'Change Photo' : 'Upload Photo'}
        </label>
      </div>

      <input 
        type="text" 
        placeholder="Blog Title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className="blog-title-input"
      />
      
      <textarea
        placeholder="Actual blog post content goes here..."
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        className="blog-content-textarea"
      />
    </div>
  );
};

export default PostFormat;