import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle, FaArchive } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const isUpcoming = event.status === 'Upcoming';
  const buttonText = isUpcoming ? 'Register Now' : 'View Details';
  const cardClass = `event-compact-card ${isUpcoming ? 'card-upcoming' : 'card-past'}`;

  // Format date and time
  const startTime = new Date(event.datetime_start);
  const formattedDate = startTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cardClass}>
      {/* 1. Status Indicator Bar */}
      <div className="card-status-indicator">
        {isUpcoming ? 
          <FaCheckCircle className="status-icon upcoming-icon" title="Upcoming" /> : 
          <FaArchive className="status-icon past-icon" title="Archived" />
        }
      </div>

      {/* 2. Main Details (Title and Description) */}
      <div className="card-main-details">
        <h4 className="event-title-compact">{event.title}</h4>
        <p className="event-description-compact">{event.description.substring(0, 80)}...</p>
      </div>

      {/* 3. Metadata (Date, Time, Location) */}
      <div className="card-metadata-group">
        <div className="meta-item">
          <FaCalendarAlt className="meta-icon" />
          <span>{formattedDate}</span>
        </div>
        <div className="meta-item">
          <FaClock className="meta-icon" />
          <span>{formattedTime}</span>
        </div>
        <div className="meta-item location-item">
          <FaMapMarkerAlt className="meta-icon" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* 4. Action Button */}
      <a 
        href={isUpcoming ? event.registration_link : `#details-${event.id}`} 
        className={`event-action-button ${isUpcoming ? 'btn-upcoming' : 'btn-past'}`}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {buttonText} <FaExternalLinkAlt />
      </a>
    </div>
  );
};

export default EventCard;