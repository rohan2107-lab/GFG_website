import React from 'react';

const AnnouncementAdmin = () => {
  // Mock data for demonstration
  const mockAnnouncements = [
    { id: 1, message: 'Hackathon registration deadline is next week!', platform: 'All', date: '2025-10-10' },
    { id: 2, message: 'Follow us on Instagram for live updates.', platform: 'Social Media', date: '2025-09-01' },
  ];

  return (
    <div className="admin-panel">
      <h2>Announcements & Updates 📢</h2>
      <p>This panel is for the **Social Media Admin** to push important messages and event updates to the website and social channels.</p>
      
      <button className="admin-cta-button">+ Schedule New Announcement</button>

      <div className="admin-data-list">
        <h3>Current and Scheduled Posts</h3>
        <ul>
          {mockAnnouncements.map(announcement => (
            <li key={announcement.id} className="admin-list-item">
              <span className="announcement-message">{announcement.message}</span>
              <span className="announcement-platform">({announcement.platform})</span>
              <button className="admin-edit-btn">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnnouncementAdmin;