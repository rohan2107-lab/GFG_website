import React, { useState } from 'react'; // ADD useState
import { Link, useLocation } from 'react-router-dom';
// ADD FaAngleDoubleLeft/Right for the collapse button
import { FaTachometerAlt, FaBullhorn, FaBlog, FaSignOutAlt, FaCalendarAlt, FaUsers, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'; 
import { useAuth } from '../../context/AuthContext'; 

const AdminSidebar = () => {
    const { getUserRole, signOut } = useAuth();
    const userRole = getUserRole() || 'user';
    const location = useLocation();
    
    // NEW STATE: Manages whether the sidebar is collapsed
    const [isCollapsed, setIsCollapsed] = useState(false); 

    const navItems = [
        // ... (navItems array remains the same)
        { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt, roles: ['super_admin', 'social_media_admin', 'events_admin', 'tech_admin', 'user', 'campus_mantri'] },
        { name: 'Announcements', path: '/admin/announcements', icon: FaBullhorn, roles: ['super_admin', 'social_media_admin', 'events_admin', 'tech_admin', 'campus_mantri'] },
        { name: 'Blog Management', path: '/admin/blogs', icon: FaBlog, roles: ['super_admin', 'social_media_admin'] },
        { name: 'Event Management', path: '/admin/events', icon: FaCalendarAlt, roles: ['super_admin', 'events_admin'] },
        { name: 'User & Roles', path: '/admin/users', icon: FaUsers, roles: ['super_admin'] },
    ];

    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

    return (
        // Apply collapsed class based on state
        <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}> 
            
            <div className="sidebar-header-group">
                <h2>GFG Admin</h2>
                <div className="admin-role-tag">ROLE: {userRole.replace('_', ' ').toUpperCase()}</div>
            </div>
            
            <button 
                className="collapse-toggle-btn"
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
            >
                {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
            </button>
            
            <ul>
                {filteredNavItems.map((item) => (
                    <li key={item.path}>
                        <Link 
                            to={item.path} 
                            className={`sidebar-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                        >
                            <item.icon className="sidebar-icon" />
                            {/* Hide text when collapsed */}
                            <span className="link-text">{item.name}</span> 
                        </Link>
                    </li>
                ))}
            </ul>
            
            <div className="sidebar-footer"> 
                <button onClick={signOut} className="sidebar-link logout-btn">
                    <FaSignOutAlt className="sidebar-icon" /> 
                    {/* Hide text when collapsed */}
                    <span className="link-text">Log Out</span> 
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;