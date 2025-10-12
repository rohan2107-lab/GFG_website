import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../api/supabaseClient';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AnnouncementList = ({ navigateToEditor }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    // ... (rest of fetchAnnouncements, deleteAnnouncement, and useEffect remain the same)

    const fetchAnnouncements = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .order('schedule_date', { ascending: false });

        if (error) {
            console.error('Error fetching announcements:', error.message);
        } else {
            setAnnouncements(data);
        }
        setLoading(false);
    }, []);

    const deleteAnnouncement = async (id, message) => {
        if (window.confirm(`Are you sure you want to delete the announcement: "${message.substring(0, 30)}..."?`)) {
            const { error } = await supabase.from('announcements').delete().eq('id', id);
            if (error) {
                alert(`Error deleting: ${error.message}`);
            } else {
                // Update UI instantly
                setAnnouncements(prev => prev.filter(ann => ann.id !== id));
            }
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    if (loading) {
        return <div className="cms-loading">Loading Announcements...</div>;
    }

    return (
        <div className="announcement-list-container">
            {/* Removed the <h3>Current and Scheduled Posts</h3> as the main dashboard wrapper provides the title */}
            <table className="announcement-table">
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Message</th>
                        <th>Platform</th>
                        <th>Scheduled Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.length === 0 ? (
                        <tr><td colSpan="5" className="no-data-cell">No announcements have been scheduled.</td></tr>
                    ) : (
                        announcements.map(ann => (
                            <tr key={ann.id} className={`announcement-row status-${ann.status.toLowerCase()}`}>
                                <td className="message-cell">{ann.message}</td>
                                <td><span className="platform-tag">{ann.platform}</span></td>
                                <td>{new Date(ann.schedule_date).toLocaleString()}</td>
                                <td><span className={`status-tag status-${ann.status.toLowerCase()}`}>{ann.status}</span></td>
                                <td>
                                    <div className="action-btn-group">
                                        <button onClick={() => navigateToEditor(ann.id)} className="action-btn edit-btn" title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => deleteAnnouncement(ann.id, ann.message)} className="action-btn delete-btn" title="Delete">
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementList;