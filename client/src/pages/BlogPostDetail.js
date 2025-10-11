import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';

const BlogPostDetail = () => {
  const { blogId } = useParams(); // Gets the dynamic ID from the URL (/blogs/UUID)
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      
      // Fetch the specific published post by ID
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          id, 
          title, 
          content, 
          published_at, 
          photo_url,
          author_id,
          profiles (username) /* Attempt to join for author name */
        `)
        .eq('id', blogId)
        .eq('status', 'Published') // Crucial: Only show published posts publicly
        .single();
      
      if (error || !data) {
        // If error is PGRST116 (no rows found), it means the post doesn't exist or isn't published.
        console.error('Error fetching blog detail or post not found:', error ? error.message : 'Post not found/not published');
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    if (blogId) {
      fetchPost();
    }
  }, [blogId]);

  /* ---------------------- Loading and Error States ---------------------- */

  if (loading) {
    return (
      <div className="blog-detail-container">
        <h2 className="loading-message">Loading article...</h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-container">
        <h2 className="error-title">404! Blog Post Not Found or Not Published.</h2>
        <p className="error-message">The article you requested may have been deleted or is still in draft mode.</p>
        <Link to="/blogs" className="back-to-blogs-btn">
          <FaArrowLeft /> Back to All Articles
        </Link>
      </div>
    );
  }
  
  /* ---------------------- Rendering the Blog Post ---------------------- */
  
  const authorName = post.profiles ? post.profiles.username : 'GFG IKGPTU Admin';
  const publishedDate = post.published_at ? new Date(post.published_at).toLocaleDateString() : 'N/A';


  return (
    <div className="blog-detail-container">
      <Link to="/blogs" className="back-to-blogs-link">
        <FaArrowLeft /> Back to All Articles
      </Link>
      
      <header className="blog-detail-header">
        <h1>{post.title}</h1>
        
        <div className="blog-meta-info">
          <span className="blog-meta-author"><FaUser /> {authorName}</span>
          <span className="blog-meta-date"><FaCalendarAlt /> {publishedDate}</span>
        </div>
      </header>

      {/* Featured Image/Media */}
      {post.photo_url && (
        <div className="blog-featured-media">
          <img src={post.photo_url} alt={post.title} />
        </div>
      )}

      {/* Content Area */}
      <div className="blog-detail-content">
        {/* IMPORTANT: If your blog content is plain text, use <p> */}
        <p>{post.content}</p> 
        
        {/* If you implement a Rich Text Editor and save HTML, use this: */}
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
      </div>
    </div>
  );
};

export default BlogPostDetail;