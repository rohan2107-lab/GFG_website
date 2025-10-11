import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ManagePosts from './BlogCMS/ManagePosts';
import PostEditor from './BlogCMS/PostEditor';
import SettingsCMS from './BlogCMS/SettingsCMS';
import { FaPlus, FaListAlt, FaCog, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const BlogAdmin = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // MOCK: The currently selected view key
  const [selectedView, setSelectedView] = useState('manage');

  const navItems = [
    { key: 'create', name: 'Create Post', icon: FaPlus, path: 'create' },
    { key: 'manage', name: 'Manage Posts', icon: FaListAlt, path: '/' },
    { key: 'settings', name: 'Settings', icon: FaCog, path: 'settings' },
  ];

  const handleNavClick = (key, path) => {
    setSelectedView(key);
    navigate(`/admin/blogs/${path}`);
  };

  return (
    <div className="blog-cms-container">
      {/* 1. Left Panel (LP) */}
      <div className={`cms-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="collapse-toggle-btn" 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? 'Expand' : 'Collapse'}
        >
          {isSidebarCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>

        <div className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`cms-nav-button ${selectedView === item.key ? 'active' : ''}`}
              onClick={() => handleNavClick(item.key, item.path)}
            >
              <item.icon className="cms-nav-icon" />
              {!isSidebarCollapsed && <span>{item.name}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Panel */}
      <div className="cms-main-panel">
        <Routes>
          {/* Default view shows the list of posts */}
          <Route index element={<ManagePosts setSelectedView={setSelectedView} />} />
          
          {/* Post Editor for creating a new post */}
          <Route path="create" element={<PostEditor />} /> 
          
          {/* Post Editor for editing an existing post (passed post ID) */}
          <Route path="edit/:postId" element={<PostEditor />} /> 

          {/* Settings View */}
          <Route path="settings" element={<SettingsCMS />} />
        </Routes>
      </div>
    </div>
  );
};

export default BlogAdmin;