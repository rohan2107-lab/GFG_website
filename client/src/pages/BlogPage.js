import React, { useState, useEffect } from 'react';
import BlogCard from '../components/Blogs/BlogCard';
import { supabase } from '../api/supabaseClient'; // Ensure this path is correct

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPublishedBlogs();
  }, []);

  const fetchPublishedBlogs = async () => {
    setLoading(true);
    
    // FETCH ONLY posts where status is 'Published', ordered by published_at date
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, created_at, published_at, content, photo_url') // Select necessary fields
      .eq('status', 'Published') // Crucial filter for public view
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching public blogs:', error.message);
    } else {
      setBlogs(data);
    }
    setLoading(false);
  };

  return (
    <div className="blogs-page-container">
      <section className="blogs-hero">
        <h1>GFG IKGPTU <span className="highlight">Tech Insights</span></h1>
        <p>Your source for cutting-edge coding tutorials, competitive programming strategies, and career advice.</p>
      </section>

      <section className="all-blogs-section">
        <div className="blogs-grid">
          {loading ? (
            <p className="loading-message">Loading the latest articles...</p>
          ) : blogs.length > 0 ? (
            blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="no-blogs">No articles have been published yet. Check back soon!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;