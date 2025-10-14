import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  // Format date for readability
  const formattedDate = new Date(blog.published_at || blog.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="blog-card-page">
      <div className="blog-image-container">
        {/* ✅ Corrected field name from blog.image → blog.photo_url */}
        <img 
          src={blog.photo_url} 
          alt={blog.title} 
          className="blog-image" 
          onError={(e) => { e.target.src = '/fallback.jpg'; }} // optional fallback
        />
      </div>

      <div className="blog-content-details">
        <h3>{blog.title}</h3>

        <div className="blog-meta-data">
          {/* Supabase may not have an author field, so you can hide it or add manually */}
          <span><FaCalendarAlt /> {formattedDate}</span>
        </div>

        <p className="blog-excerpt">
          {blog.content?.slice(0, 150)}...
        </p>

        <Link to={`/blogs/${blog.id}`} className="blog-read-more-button">
          Read Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
