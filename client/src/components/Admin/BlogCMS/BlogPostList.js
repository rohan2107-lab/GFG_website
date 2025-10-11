import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon

const BlogPostList = ({ posts, onDoubleClick, onDelete }) => { // 1. Accept onDelete prop
  return (
    <table className="blog-list-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date Posted</th>
          <th>Status</th>
          <th>Created By</th>
          <th>Actions</th> {/* NEW COLUMN */}
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr 
            key={post.id} 
            onDoubleClick={() => onDoubleClick(post.id)}
            className="blog-list-row"
          >
            <td>{post.title}</td>
            <td>{new Date(post.created_at).toLocaleDateString()}</td>
            <td>
              <span className={`post-status status-${post.status.toLowerCase()}`}>
                {post.status}
              </span>
            </td>
            <td>{post.author_id ? 'Admin User' : 'N/A (No User Set)'}</td>
            
            {/* ACTIONS COLUMN */}
            <td>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); // Prevents double-click event from firing
                  onDelete(post.id, post.title); 
                }}
                className="delete-btn"
                title="Delete Post"
              >
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogPostList;