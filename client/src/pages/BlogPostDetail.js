import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';

const BlogPostDetail = () => {
    const { blogId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    // State to hold the specific error message for display
    const [fetchError, setFetchError] = useState(null); 

    // Use useCallback for stability
    const fetchPost = useCallback(async (id) => {
        setLoading(true);
        setFetchError(null); // Clear previous errors

        // Query: Select all fields from the blog, but ONLY if it is marked 'Published'
        const { data, error } = await supabase
            .from('blogs')
            .select(`
                id, 
                title, 
                content, 
                published_at, 
                photo_url 
            `)
            .eq('id', id)
            .eq('status', 'Published') // This MUST match the stored status exactly
            .single();

        if (error && error.code !== 'PGRST116') {
            // Log real API errors (excluding the "no rows found" error)
            console.error('API Error fetching blog detail:', error.message);
            setFetchError('A database error occurred while fetching the article.');
            setPost(null);
        } else if (!data) {
            // Case 1: Post is not found, deleted, or NOT 'Published'
            // To provide a clear error message, we don't set the post state
            setPost(null); 
            setFetchError("The article you requested may have been deleted or is still in draft mode.");
        } else {
            // Case 2: Success
            setPost(data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (blogId) {
            fetchPost(blogId);
        }
    }, [blogId, fetchPost]);

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
                <p className="error-message">
                    {fetchError || "The article you requested may have been deleted or does not exist."}
                </p>
                <Link to="/blogs" className="back-to-blogs-btn">
                    <FaArrowLeft /> Back to All Articles
                </Link>
            </div>
        );
    }
    
    /* ---------------------- Rendering the Blog Post ---------------------- */
    
    const authorName = 'GFG IKGPTU Admin'; // Placeholder name
    const publishedDate = post.published_at 
        ? new Date(post.published_at).toLocaleDateString() 
        : 'N/A';


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
                <p>{post.content}</p> 
            </div>
        </div>
    );
};

export default BlogPostDetail;