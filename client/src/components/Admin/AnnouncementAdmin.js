import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AnnouncementEditor from './AnnouncementCMS/AnnouncementEditor';
import AnnouncementList from './AnnouncementCMS/AnnouncementList';
import { FaPlus, FaListAlt } from 'react-icons/fa';

const AnnouncementAdmin = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState('manage'); // Default to list view

  const navItems = [
    { key: 'create', name: 'Create Announcement', icon: FaPlus, path: 'create' },
    { key: 'manage', name: 'Manage Announcements', icon: FaListAlt, path: '/' },
  ];

  const handleNavClick = (key, path) => {
    setSelectedView(key);
    navigate(`/admin/announcements/${path}`);
  };

  // Component that wraps the list and the 'Create' button (similar to ManageEvents)
  const AnnouncementDashboard = ({ navigateToEditor }) => (
    <div className="admin-panel">
      <h2>Announcements & Updates 📢</h2>
      <p className="panel-subtitle">This panel is for the Social Media Admin to push important messages and event updates to the website and social channels.</p>
      
      <div className="event-cms-subnav"> {/* Reusing Event CMS Subnav Styles */}
        {navItems.map(item => (
          <button
            key={item.key}
            className={`cms-nav-button ${selectedView === item.key ? 'active' : ''}`}
            onClick={() => handleNavClick(item.key, item.path)}
          >
            <item.icon className="cms-nav-icon" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      
      {/* The button is now moved into the navItems above, but we still need the list:
      The list itself will be rendered below the sub-navigation. 
      */}
      <AnnouncementList navigateToEditor={navigateToEditor} />
    </div>
  );
  
  return (
    <div className="announcement-cms-container">
      <div className="cms-main-panel" style={{ padding: 0 }}> {/* Remove extra padding */}
        <Routes>
          {/* Default view shows the list of announcements */}
          <Route 
            index 
            element={<AnnouncementDashboard navigateToEditor={(id) => navigate(`edit/${id}`)} />} 
          />
          
          {/* Create New Announcement */}
          <Route path="create" element={<AnnouncementEditor />} />
          
          {/* Edit Existing Announcement */}
          <Route path="edit/:announcementId" element={<AnnouncementEditor />} />
          
          {/* Fallback to dashboard for any unmatched path within /admin/announcements */}
          <Route path="*" element={<AnnouncementDashboard navigateToEditor={(id) => navigate(`edit/${id}`)} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AnnouncementAdmin;