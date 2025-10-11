import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabaseClient';
import ActionButtons from './ActionButtons';
import PostFormat from './PostFormat';

const PostEditor = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    
    // Define the initial state structure
    const initialPostState = {
        title: '',
        content: '',
        status: 'Draft',
        photo_url: '',
        author_id: 'MOCK_USER_ID', // Used only for initial state
        published_at: null,
    };

    const [post, setPost] = useState(initialPostState);
    const [loading, setLoading] = useState(false);

    // Load post data on mount or when postId changes (e.g., navigating from edit/1 to edit/2)
    useEffect(() => {
        if (postId) {
            loadPost(postId);
        } else {
            // When navigating to /create, reset the form completely
            setPost(initialPostState);
        }
    }, [postId]);

    const loadPost = async (id) => {
        setLoading(true);
        const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
        
        if (data) {
            setPost(data);
        } else if (error && error.code !== 'PGRST116') {
            console.error('Error loading post:', error.message);
        }
        setLoading(false);
    };

    const handleSave = async (newStatus) => {
        setLoading(true);

        const isPublishing = newStatus === 'Published';
        
        // 1. Prepare the data payload, setting published_at only if status changes to Published
        const payload = { 
            ...post, 
            status: newStatus || post.status,
            published_at: (isPublishing && !post.published_at) ? new Date().toISOString() : post.published_at,
        };
        
        // IMPORTANT: Remove RLS/Auth-handled fields before sending payload
        delete payload.author_id;
        delete payload.id; // Avoid sending the ID back in the payload
        delete payload.created_at; // Avoid sending created_at back in the payload

        let result;

        if (postId) {
            // 2. UPDATE existing post: Stay on the edit page
            result = await supabase
                .from('blogs')
                .update(payload)
                .eq('id', postId)
                .select() // Select the updated row to refresh local state
                .single(); 
        } else {
            // 3. CREATE new post: Redirect to the edit view
            result = await supabase
                .from('blogs')
                .insert([payload])
                .select(); 
        }

        if (result.error) {
            console.error('Save error:', result.error.message);
            alert(`Error saving post: ${result.error.message}`);
        } else {
            alert(`Post saved successfully as ${newStatus || post.status}!`);
            
            // UX IMPROVEMENT: If creating a new post, update state with returned data and redirect to /edit
            if (!postId && result.data && result.data.length > 0) {
                const newPost = result.data[0];
                setPost(newPost); // Update state with complete data (including ID)
                navigate(`/admin/blogs/edit/${newPost.id}`, { replace: true }); 
            } else if (postId) {
                 // UX IMPROVEMENT: If updating, set the state with the returned updated data
                 setPost(result.data[0]); 
            }

            // After saving/updating, force a navigation back to the list
            // This is a common pattern to ensure the list component refreshes properly.
            navigate('/admin/blogs', { replace: true });
        }
        setLoading(false);
    };

    // ... rest of the component remains the same ...

    if (loading && postId) {
        return <div className="cms-loading">Loading Post...</div>;
    }

    return (
        <div className="post-editor-panel">
            <h2>{postId ? `Edit Post: ${post.title.substring(0, 30)}...` : 'Create New Blog Post'}</h2>
            
            <ActionButtons postStatus={post.status} onSave={handleSave} />
            
            <PostFormat post={post} setPost={setPost} />
            
            {loading && <div className="cms-saving-overlay">Saving...</div>}
        </div>
    );
};

export default PostEditor;