import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabaseClient'; 

const AnnouncementEditor = ({ onComplete }) => {
    const { announcementId } = useParams();
    const navigate = useNavigate();
    
    const initialAnnouncementState = {
        message: '',
        platform: 'Website',
        schedule_date: new Date().toISOString().slice(0, 16), // Current date/time
        status: 'Draft',
        is_active: false,
    };

    const [announcement, setAnnouncement] = useState(initialAnnouncementState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (announcementId) {
            loadAnnouncement(announcementId);
        } else {
            setAnnouncement(initialAnnouncementState);
        }
    }, [announcementId]);

    const loadAnnouncement = async (id) => {
        setLoading(true);
        const { data, error } = await supabase.from('announcements').select('*').eq('id', id).single();
        if (data) {
            // Format date for datetime-local input
            data.schedule_date = data.schedule_date ? new Date(data.schedule_date).toISOString().slice(0, 16) : initialAnnouncementState.schedule_date;
            setAnnouncement(data);
        }
        setLoading(false);
    };

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
        
        // Logic to set status and active flag on save
        const newStatus = announcement.status === 'Draft' && announcement.is_active ? 'Scheduled' : announcement.status;
        const payload = { ...announcement, status: newStatus };
        delete payload.id; // Ensure we don't send the ID back for update/insert

        let result;

        if (announcementId) {
            result = await supabase.from('announcements').update(payload).eq('id', announcementId).select().single();
        } else {
            result = await supabase.from('announcements').insert([payload]).select();
        }

        if (result.error) {
            console.error('Save error:', result.error.message);
            alert(`Error saving announcement: ${result.error.message}`);
        } else {
            alert(`Announcement saved successfully! Status: ${newStatus}`);
            // Redirect back to the main list after saving
            navigate('/admin/announcements', { replace: true });
        }
        setLoading(false);
    };

    return (
        <div className="admin-panel announcement-editor">
            <h2>{announcementId ? 'Edit Announcement' : 'Schedule New Announcement'}</h2>
            <p className="panel-subtitle">This message will be pushed to the website ticker or social channels.</p>
            
            <form onSubmit={handleSave} className="announcement-form-grid">
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