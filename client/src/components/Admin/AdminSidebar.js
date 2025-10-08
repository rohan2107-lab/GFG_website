import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBullhorn, FaBlog, FaUsers } from 'react-icons/fa';

const AdminSidebar = () => {
  // In a real app, this list would be filtered based on the logged-in user's role.
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
    { name: 'Announcements', path: '/admin/announcements', icon: FaBullhorn },
    { name: 'Blog Management', path: '/admin/blogs', icon: FaBlog },
    { name: 'User Roles', path: '/admin/users', icon: FaUsers }, // Placeholder for Super Admin
  ];

  return (
    <div className="admin-sidebar">
      <h2>GFG Admin</h2>
      <ul>
        {navItems.map((item) => (
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