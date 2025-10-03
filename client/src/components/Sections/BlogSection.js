import React from 'react';
import { Link } from 'react-router-dom';

const BlogSection = ({ blogs }) => {
  return (
    <section className="blog-section">
      <h2>Latest Blogs</h2>
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} />
            <div className="blog-card-content">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <Link to={`/blogs/${blog.id}`} className="read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;