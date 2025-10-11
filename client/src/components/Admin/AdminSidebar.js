import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBullhorn, FaBlog, FaUsers, FaCalendarAlt, FaPalette } from 'react-icons/fa'; 

const AdminSidebar = () => {
  // ----------------------------------------------------------------
  // MOCK LOGIC: Simulate the logged-in user's role for frontend development
  // CHANGE THIS ROLE to test the different visibility settings:
  // 'super_admin', 'social_media_admin', 'events_admin', 'tech_admin', 'creative_admin'
  const mockUserRole = 'super_admin'; 
  // ----------------------------------------------------------------

  // Expanded navItems with required roles for each link
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: FaTachometerAlt, 
      roles: ['super_admin', 'tech_admin', 'social_media_admin', 'events_admin', 'creative_admin'] 
    },
    
    // Social Media Team (Handles Announcements & Blogs)
    { 
      name: 'Announcements', 
      path: '/admin/announcements', 
      icon: FaBullhorn, 
      roles: ['super_admin', 'social_media_admin'] 
    },
    { 
      name: 'Blog Management', 
      path: '/admin/blogs', 
      icon: FaBlog, 
      roles: ['super_admin', 'social_media_admin', 'tech_admin'] 
    },
    
    // Event Team
    { 
      name: 'Event Management', 
      path: '/admin/events', 
      icon: FaCalendarAlt, 
      roles: ['super_admin', 'events_admin'] 
    },
    
    // Creative & Design Team (Adding the icon for completeness)
    { 
      name: 'Design Assets', 
      path: '/admin/design', 
      icon: FaPalette, 
      roles: ['super_admin', 'creative_admin'] 
    },

    // Super Admin Only
    { 
      name: 'User & Roles', 
      path: '/admin/users', 
      icon: FaUsers, 
      roles: ['super_admin'] 
    },
  ];

  // Filter the navigation items based on the mockUserRole
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(mockUserRole)
  );

  return (
    <div className="admin-sidebar">
      <h2>GFG Admin</h2>
      {/* Display the current mock role for testing purposes */}
      <div className="admin-role-tag">Role: {mockUserRole.replace('_', ' ').toUpperCase()}</div>
      
      <ul>
        {/* Use the filtered list for rendering */}
        {filteredNavItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="sidebar-link">
              <item.icon className="sidebar-icon" />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;