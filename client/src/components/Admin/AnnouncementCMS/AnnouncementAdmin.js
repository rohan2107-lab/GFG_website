import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AnnouncementEditor from './AnnouncementEditor';
import AnnouncementList from './AnnouncementList'; // Create this component next

const AnnouncementAdmin = () => {
    const navigate = useNavigate();

    return (
        <div className="announcement-cms-container">
            <Routes>
                {/* Main List View */}
                <Route 
                    index 
                    element={<AnnouncementList navigateToEditor={(id) => navigate(`edit/${id}`)} />} 
                />
                
                {/* Create New Announcement */}
                <Route path="create" element={<AnnouncementEditor />} />
                
                {/* Edit Existing Announcement */}
                <Route path="edit/:announcementId" element={<AnnouncementEditor />} />

                {/* Redirect "Schedule New Announcement" button to the create path */}
                <Route 
                    path="/" 
                    element={
                        <div className="admin-panel">
                            <h2>Announcements & Updates 📢</h2>
                            <p className="panel-subtitle">This panel is for the Social Media Admin to push important messages and event updates to the website and social channels.</p>
                            <button 
                                className="admin-cta-button" 
                                onClick={() => navigate('create')}
                            >
                                + Schedule New Announcement
                            </button>
                            <AnnouncementList navigateToEditor={(id) => navigate(`edit/${id}`)} />
                        </div>
                    } 
                />
            </Routes>
        </div>
    );
};

export default AnnouncementAdmin;