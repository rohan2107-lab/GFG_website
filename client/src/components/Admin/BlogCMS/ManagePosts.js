import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabaseClient'; 
import BlogPostList from './BlogPostList';

const ManagePosts = ({ setSelectedView }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // (fetchPosts function is unchanged)
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        id, 
        title, 
        created_at, 
        status, 
        author_id 
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error.message);
    } else {
      setPosts(data);
    }
    setLoading(false);
  }, []);

  // NEW: Function to handle deletion
  const deletePost = async (postId, postTitle) => {
    if (window.confirm(`Are you sure you want to permanently delete the post: "${postTitle}"?`)) {
      setLoading(true);
      
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Delete error:', error.message);
        alert(`Error deleting post: ${error.message}`);
      } else {
        alert(`Post "${postTitle}" deleted successfully.`);
        
        // OPTIMIZED FIX: Update the UI locally without re-fetching all data
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDoubleClick = (postId) => {
    setSelectedView('create'); // Switch the sidebar state
    navigate(`/admin/blogs/edit/${postId}`);
  };

  if (loading) {
    return <div className="cms-loading">Loading Posts...</div>;
  }

  return (
    <div className="manage-posts-panel">
      <h3>Manage All Blog Posts</h3>
      <p>Double-click a post to open the editor.</p>
      
      {posts.length === 0 ? (
        <div className="no-posts-found">No blog posts found. Click 'Create Post' to begin!</div>
      ) : (
        // 2. Pass the deletePost function to BlogPostList
        <BlogPostList 
          posts={posts} 
          onDoubleClick={handleDoubleClick} 
          onDelete={deletePost} 
        />
      )}
    </div>
  );
};

export default ManagePosts;