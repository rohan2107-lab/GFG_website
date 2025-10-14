import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient'; 
import { FaCalendarAlt } from 'react-icons/fa'; 

const BlogSection = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    // Fetch top 6 published posts including the necessary photo_url
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, content, published_at, photo_url')
      .eq('status', 'Published')
      .order('published_at', { ascending: false })
      .limit(6); 

    if (error) {
      console.error('Error fetching recent blogs:', error.message);
    } else {
      setRecentBlogs(data);
    }
    setLoading(false);
  };

  const defaultImageUrl = 'https://via.placeholder.com/400x250/34495e/ecf0f1?text=GFG+Blog';

  return (
    <section className="blog-section">
      <h2>Recent Insights & Tutorials</h2>
      
      {loading ? (
        <p>Loading recent posts...</p>
      ) : recentBlogs.length > 0 ? (
        
        <div className="blog-scroll-container"> {/* Container for horizontal scrolling */}
          <div className="blog-list-h"> {/* Inner flex container holds the cards horizontally */}
            {recentBlogs.map(blog => (
              <div key={blog.id} className="blog-card-h"> {/* Individual blog card */}
                
                {/* 1. FIXED IMAGE SECTION */}
                <div className="blog-card-h-image-container">
                  <img 
                    src={blog.photo_url || defaultImageUrl} 
                    alt={blog.title} 
                    className="blog-card-h-image"
                  />
                </div>
                
                {/* 2. CONTENT SECTION */}
                <div className="blog-card-h-content">
                  <h3 title={blog.title}>{blog.title}</h3>
                  <p>{blog.content.substring(0, 80)}...</p> {/* Truncated content */}
                  
                  <div className="blog-card-h-footer">
                    <span className="blog-date-h">
                        <FaCalendarAlt /> {new Date(blog.published_at).toLocaleDateString()}
                    </span>
                    <Link to={`/blogs/${blog.id}`} className="read-more-h">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      ) : (
        <p>No recent articles published yet. Check back soon!</p>
      )}
      
      <div className="cta-all-blogs">
          <Link to="/blogs" className="cta-button-home">View All Blogs</Link>
      </div>
    </section>
  );
};

export default BlogSection;