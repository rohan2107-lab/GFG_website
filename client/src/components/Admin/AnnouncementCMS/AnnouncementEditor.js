import React, { useState, useEffect, useCallback, useMemo } from 'react'; // ADDED useMemo
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabaseClient'; 

const AnnouncementEditor = () => {
    const { announcementId } = useParams();
    const navigate = useNavigate();
    
    // FIX 1: Wrap initial state definition in useMemo to stabilize the object identity
    // This removes the dependency warning by ensuring the object only changes when dependencies change (none here).
    const initialAnnouncementState = useMemo(() => ({
        message: '',
        platform: 'Website',
        schedule_date: new Date().toISOString().slice(0, 16),
        status: 'Draft',
        is_active: false,
    }), []); // Empty dependency array means this object is created only once.

    const [announcement, setAnnouncement] = useState(initialAnnouncementState);
    const [loading, setLoading] = useState(false);

    // loadAnnouncement is wrapped in useCallback and uses _error for clean code
    const loadAnnouncement = useCallback(async (id) => {
        setLoading(true);
        // FIX 2: Rename 'error' to '_error' to indicate it's deliberately ignored/unused
        const { data, error: _error } = await supabase.from('announcements').select('*').eq('id', id).single();
        if (_error) { // CHECK IF AN ERROR OCCURRED
    // FIX: Use the '_error' variable here to silence the warning
    console.error('Error loading announcement:', _error.message); 
} 
        
        if (data) {
            // Format date for datetime-local input
            data.schedule_date = data.schedule_date ? new Date(data.schedule_date).toISOString().slice(0, 16) : initialAnnouncementState.schedule_date;
            setAnnouncement(data);
        }
        setLoading(false);
    }, [initialAnnouncementState.schedule_date]); 

    // FINAL FIX: Dependencies are clean because initialAnnouncementState is stable (useMemo).
    useEffect(() => {
        if (announcementId) {
            loadAnnouncement(announcementId);
        } else {
            setAnnouncement(initialAnnouncementState);
        }
    }, [announcementId, loadAnnouncement, initialAnnouncementState]); // Dependencies are now clean

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAnnouncement(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const newStatus = announcement.status === 'Draft' && announcement.is_active ? 'Scheduled' : announcement.status;
        const payload = { ...announcement, status: newStatus };
        delete payload.id; 
        delete payload.author_id;

        let result;

        if (announcementId) {
            result = await supabase.from('announcements').update(payload).eq('id', announcementId).select().single();
        } else {
            result = await supabase.from('announcements').insert([payload]).select();
        }
        
        // Use saveError for clean error handling
        const { error: saveError } = result;

        if (saveError) {
            console.error('Save error:', saveError.message);
            alert(`Error saving announcement: ${saveError.message}`);
        } else {
            alert(`Announcement saved successfully! Status: ${newStatus}`);
            navigate('/admin/announcements', { replace: true });
        }
        setLoading(false);
    };

    return (
        <div className="admin-panel announcement-editor">
            <h2>{announcementId ? 'Edit Announcement' : 'Schedule New Announcement'}</h2>
            <p className="panel-subtitle">This message will be pushed to the website ticker or social channels.</p>
            
            <form onSubmit={handleSave} className="announcement-form-grid">
                
                {/* Message Field */}
                <div className="form-group-full">
                    <label htmlFor="message">Announcement Message *</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={announcement.message} 
                        onChange={handleChange} 
                        required 
                        className="textarea-full" 
                        rows="4"
                        placeholder="E.g., Hackathon registration closes Friday at midnight!"
                    ></textarea>
                </div>
                
                {/* Schedule Date/Time */}
                <div className="form-group-half">
                    <label htmlFor="schedule_date">Schedule Date/Time</label>
                    <input 
                        type="datetime-local" 
                        id="schedule_date" 
                        name="schedule_date" 
                        value={announcement.schedule_date} 
                        onChange={handleChange} 
                        className="input-full"
                    />
                </div>

                {/* Target Platform */}
                <div className="form-group-half">
                    <label htmlFor="platform">Target Platform</label>
                    <select 
                        id="platform" 
                        name="platform" 
                        value={announcement.platform} 
                        onChange={handleChange} 
                        className="input-full"
                    >
                        <option value="Website">Website Ticker</option>
                        <option value="Social Media">Social Media Post</option>
                        <option value="All">All Channels</option>
                    </select>
                </div>

                {/* Active/Publish Checkbox */}
                <div className="form-group-half checkbox-group">
                    <input 
                        type="checkbox" 
                        id="is_active" 
                        name="is_active" 
                        checked={announcement.is_active} 
                        onChange={handleChange} 
                    />
                    <label htmlFor="is_active">Ready to Publish/Schedule (Set Active)</label>
                </div>
                
                {/* Submission Buttons */}
                <div className="form-group-full form-actions">
                    <button type="submit" className="admin-cta-button" disabled={loading}>
                        {loading ? 'Saving...' : (announcementId ? 'Save Changes' : 'Schedule Announcement')}
                    </button>
                    {announcementId && (
                        <button type="button" className="admin-edit-btn" onClick={() => navigate('/admin/announcements')}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AnnouncementEditor;