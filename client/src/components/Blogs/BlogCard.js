import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card-page">
      <div className="blog-image-container">
        <img src={blog.image} alt={blog.title} className="blog-image" />
      </div>
      <div className="blog-content-details">
        <h3>{blog.title}</h3>
        
        <div className="blog-meta-data">
          <span><FaUser /> {blog.author}</span>
          <span><FaCalendarAlt /> {blog.date}</span>
        </div>

        <p className="blog-excerpt">{blog.content}</p>
        
        {/* Placeholder link for the actual blog post */}
        <Link to={`/blogs/${blog.id}`} className="blog-read-more-button">
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;