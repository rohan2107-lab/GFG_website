import React from 'react';

const BlogAdmin = () => {
  // Mock data for demonstration
  const mockBlogs = [{ id: 1, title: 'MERN Stack Guide', status: 'Published' }, { id: 2, title: 'Contest Tips', status: 'Draft' }];

  return (
    <div className="admin-panel">
      <h2>Blog Management 📝</h2>
      <p>This is the control panel for the **Blog Admin** (part of the Social Media Team). Manage drafts, publishing, and scheduled posts here.</p>
      
      <button className="admin-cta-button">+ Create New Blog Post</button>

      <div className="admin-data-list">
        <h3>Existing Posts</h3>
        <ul>
          {mockBlogs.map(blog => (
            <li key={blog.id} className="admin-list-item">
              <span>{blog.title}</span>
              <span className={`blog-status status-${blog.status.toLowerCase()}`}>{blog.status}</span>
              <button className="admin-edit-btn">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogAdmin;