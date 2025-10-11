import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient'; // Ensure this path is correct

const BlogSection = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    // Fetch only the TOP 3 published posts
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, content, published_at')
      .eq('status', 'Published')
      .order('published_at', { ascending: false })
      .limit(3); // Limit to 3 posts for the homepage view

    if (error) {
      console.error('Error fetching recent blogs:', error.message);
    } else {
      setRecentBlogs(data);
    }
    setLoading(false);
  };

  return (
    <section className="blog-section">
      <h2>Recent Insights & Tutorials</h2>
      
      {loading ? (
        <p>Loading recent posts...</p>
      ) : recentBlogs.length > 0 ? (
        <div className="blog-list">
          {recentBlogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <div className="blog-card-content">
                <h3>{blog.title}</h3>
                <p>{blog.content.substring(0, 100)}...</p> {/* Truncate content for preview */}
                <span className="blog-date">{new Date(blog.published_at).toLocaleDateString()}</span>
                <Link to={`/blogs/${blog.id}`} className="read-more">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recent articles published yet. Check back soon!</p>
      )}
      
      <div className="cta-all-blogs">
          <Link to="/blogs" className="cta-button-home">View All Articles</Link>
      </div>
    </section>
  );
};

export default BlogSection;