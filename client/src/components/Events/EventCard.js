import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const isUpcoming = event.status === 'Upcoming';
  const buttonText = isUpcoming ? 'Register Now' : 'View Details';
  const cardClass = `event-card ${isUpcoming ? 'card-upcoming' : 'card-past'}`;

  return (
    <div className={cardClass}>
      <div className="event-image-container">
        <img src={event.image} alt={event.title} className="event-image" />
      </div>
      <div className="event-details">
        <h3>{event.title}</h3>
        <p className="event-description">{event.description}</p>
        
        <div className="event-meta">
          <p><FaCalendarAlt /> {event.date}</p>
          <p><FaClock /> {event.time}</p>
          <p><FaMapMarkerAlt /> {event.location}</p>
        </div>

        <a href={event.link} className="event-cta-button" target="_blank" rel="noopener noreferrer">
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default EventCard;