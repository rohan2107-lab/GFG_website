import React, { useState } from 'react'; // Removed unused 'useEffect'
import { FaUsers, FaBlog, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa'; // Removed unused 'FaBullhorn'
import { useAuth } from '../../context/AuthContext'; 

const AdminDashboard = () => {
    const { user, getUserRole } = useAuth();
    const userRole = getUserRole();

    // Mock data for key statistics
    // Removed unused setter 'setStats'
    const [stats] = useState({ 
        totalUsers: '145',
        totalBlogs: '24',
        upcomingEvents: '3',
        pendingDrafts: '7',
    });

    // Mock data for recent activity
    // Removed unused setter 'setRecentActivity'
    const [recentActivity] = useState([ 
        { id: 1, type: 'Blog', title: 'MERN Stack Guide', status: 'Published', user: 'Tech Admin' },
        { id: 2, type: 'Event', title: 'Hackathon 4.0', status: 'Scheduled', user: 'Events Admin' },
        { id: 3, type: 'User', title: 'New Registration', status: 'Confirmed', user: 'New User' },
    ]);

    // Define dashboard cards
    const statCards = [
        { title: 'Total Members', value: stats.totalUsers, icon: FaUsers, color: '#3498db' },
        { title: 'Published Blogs', value: stats.totalBlogs, icon: FaBlog, color: '#2ecc71' },
        { title: 'Upcoming Events', value: stats.upcomingEvents, icon: FaCalendarAlt, color: '#f39c12' },
        { title: 'Drafts in Review', value: stats.pendingDrafts, icon: FaCheckCircle, color: '#9b59b6' },
    ];
    
    /* The commented-out useEffect block is fine to leave commented out, 
     as it is ignored by the compiler.
    */

    return (
        <div className="admin-dashboard-container">
            <header className="dashboard-header">
                {/* Fixed user display: only show part before '@' */}
                <h2>Welcome back, {user ? user.email.split('@')[0] : 'Admin'}!</h2> 
                <p className="panel-subtitle">
                    Quick overview of {userRole.replace('_', ' ').toUpperCase()} activity and site health.
                </p>
            </header>

            {/* 1. Statistics Cards Grid */}
            <section className="stats-grid">
                {statCards.map(card => (
                    <div className="stat-card" key={card.title} style={{ borderLeftColor: card.color }}>
                        <div className="stat-content">
                            <span className="stat-value">{card.value}</span>
                            <span className="stat-title">{card.title}</span>
                        </div>
                        <card.icon className="stat-icon" style={{ color: card.color }} />
                    </div>
                ))}
            </section>

            {/* 2. Recent Activity Log */}
            <section className="activity-section">
                <h3>Recent Activity Log</h3>
                <div className="activity-list">
                    {recentActivity.map(activity => (
                        <div key={activity.id} className={`activity-item activity-${activity.type.toLowerCase()}`}>
                            <span className="activity-type-badge">{activity.type}</span>
                            <span className="activity-title">{activity.title}</span>
                            <span className="activity-user">by {activity.user}</span>
                            <span className="activity-status status-tag status-published">{activity.status}</span>
                        </div>
                    ))}
                </div>
                <button className="view-all-btn">View Full Logs</button>
            </section>
        </div>
    );
};

export default AdminDashboard;