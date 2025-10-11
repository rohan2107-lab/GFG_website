import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ManageEvents from './EventCMS/ManageEvents';
import EventEditor from './EventCMS/EventEditor';
import { FaPlus, FaListAlt } from 'react-icons/fa';

const EventAdmin = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState('manage'); // Default to list view

  const navItems = [
    { key: 'create', name: 'Create Event', icon: FaPlus, path: 'create' },
    { key: 'manage', name: 'Manage Events', icon: FaListAlt, path: '/' },
  ];

  const handleNavClick = (key, path) => {
    setSelectedView(key);
    navigate(`/admin/events/${path}`);
  };

  return (
    <div className="event-cms-container">
      {/* Event CMS Sub-Navigation */}
      <div className="event-cms-subnav">
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

      {/* Main Panel Content */}
      <div className="cms-main-panel">
        <Routes>
          {/* Default view shows the list of events */}
          <Route index element={<ManageEvents setSelectedView={setSelectedView} />} />
          
          {/* Event Editor for creating a new event */}
          <Route path="create" element={<EventEditor />} /> 
          
          {/* Event Editor for editing an existing event */}
          <Route path="edit/:eventId" element={<EventEditor />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default EventAdmin;