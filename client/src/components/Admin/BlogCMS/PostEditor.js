import React, { useState, useEffect, useCallback, useMemo } from 'react'; // ADDED useMemo
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabaseClient';
import ActionButtons from './ActionButtons';
import PostFormat from './PostFormat';

const PostEditor = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    
    // FIX: Wrap initialPostState definition in useMemo to stabilize the object identity
    const initialPostState = useMemo(() => ({
        title: '',
        content: '',
        status: 'Draft',
        photo_url: '',
        author_id: 'MOCK_USER_ID', // Used only for initial state
        published_at: null,
    }), []); // Empty dependency array ensures the object is stable across renders

    const [post, setPost] = useState(initialPostState);
    const [loading, setLoading] = useState(false);

    // loadPost is wrapped in useCallback
    const loadPost = useCallback(async (id) => {
        setLoading(true);
        const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
        
        if (data) {
            setPost(data);
        } else if (error && error.code !== 'PGRST116') {
            console.error('Error loading post:', error.message);
        }
        setLoading(false);
    }, []); 

    // FIX: useEffect now correctly depends on a stable initialPostState object
    useEffect(() => {
        if (postId) {
            loadPost(postId);
        } else {
            // Reset the form completely
            setPost(initialPostState);
        }
    }, [postId, loadPost, initialPostState]); // Dependency is now satisfied

    const handleSave = async (newStatus) => {
        setLoading(true);

        const isPublishing = newStatus === 'Published';
        
        const payload = { 
            ...post, 
            status: newStatus || post.status,
            published_at: (isPublishing && !post.published_at) ? new Date().toISOString() : post.published_at,
        };
        
        delete payload.author_id;
        delete payload.id; 
        delete payload.created_at; 

        let result;

        if (postId) {
            result = await supabase
                .from('blogs')
                .update(payload)
                .eq('id', postId)
                .select()
                .single(); 
        } else {
            result = await supabase
                .from('blogs')
                .insert([payload])
                .select(); 
        }

        const { error: saveError } = result;

        if (saveError) {
            console.error('Save error:', saveError.message);
            alert(`Error saving post: ${saveError.message}`);
        } else {
            alert(`Post saved successfully as ${newStatus || post.status}!`);
            
            if (!postId && result.data && result.data.length > 0) {
                const newPost = result.data[0];
                setPost(newPost);
                navigate(`/admin/blogs/edit/${newPost.id}`, { replace: true }); 
            } else if (postId && result.data) {
                setPost(result.data[0]); 
            }

            navigate('/admin/blogs', { replace: true });
        }
        setLoading(false);
    };

    const handleSaveWrapper = (newStatus) => handleSave(newStatus);
    
    if (loading && postId) {
        return <div className="cms-loading">Loading Post...</div>;
    }

    return (
        <div className="post-editor-panel">
            <h2>{postId ? `Edit Post: ${post.title.substring(0, 30)}...` : 'Create New Blog Post'}</h2>
            
            <ActionButtons postStatus={post.status} onSave={handleSaveWrapper} />
            
            <PostFormat post={post} setPost={setPost} />
            
            {loading && <div className="cms-saving-overlay">Saving...</div>}
        </div>
    );
};

export default PostEditor;