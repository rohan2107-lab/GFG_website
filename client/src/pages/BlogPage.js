import React from 'react';
import BlogCard from '../components/Blogs/BlogCard';
import { mockBlogs } from '../mockData'; 

const BlogPage = () => {
  return (
    <div className="blogs-page-container">
      <section className="blogs-hero">
        <h1>GFG IKGPTU <span className="highlight">Tech Insights</span></h1>
        <p>Your source for cutting-edge coding tutorials, competitive programming strategies, and career advice.</p>
      </section>

      <section className="all-blogs-section">
        <div className="blogs-grid">
          {mockBlogs.length > 0 ? (
            mockBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="no-blogs">No blogs published yet. Check back soon!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;