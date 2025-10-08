import React from 'react';
import EventCard from '../components/Events/EventCard';
import { mockEvents } from '../mockData';

const EventsPage = () => {
  const upcomingEvents = mockEvents.filter(event => event.status === 'Upcoming');
  const pastEvents = mockEvents.filter(event => event.status === 'Past');

  return (
    <div className="events-page-container">
      <section className="events-hero">
        <h1>GFG IKGPTU <span className="highlight">Events Calendar</span></h1>
        <p>Your gateway to workshops, hackathons, and learning opportunities on campus.</p>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="events-grid upcoming-grid">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="no-events">Stay tuned! We're planning exciting new events soon.</p>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="events-section events-past">
        <h2 className="section-title">Past Events Gallery</h2>
        <div className="events-grid past-grid">
          {pastEvents.length > 0 ? (
            pastEvents.map(event => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="no-events">No archived events yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;