import React, { useState, useEffect } from 'react';
import EventCard from '../components/Events/EventCard';
import { supabase } from '../api/supabaseClient'; 

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicEvents();
  }, []);

  const fetchPublicEvents = async () => {
    setLoading(true);
    
    // Fetch all events approved for public viewing (is_public = true)
    const { data, error } = await supabase
      .from('events')
      .select('*') 
      .eq('is_public', true) // Only show events marked as publicly visible by admin
      .order('datetime_start', { ascending: false }); // Show most recent/upcoming events first

    if (error) {
      console.error('Error fetching public events:', error.message);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  // Filter events based on status and date for front-end display
  const now = new Date();
  
  // Upcoming events must have status 'Upcoming' AND a start date in the future
  const upcomingEvents = events.filter(event => 
    event.status === 'Upcoming' && new Date(event.datetime_start) >= now
  );
  
  // Past events include all 'Completed' events AND 'Upcoming' events that have passed their start date
  const pastEvents = events.filter(event => 
    event.status === 'Completed' || (event.status === 'Upcoming' && new Date(event.datetime_start) < now)
  );

  return (
    <div className="events-page-container">
      <section className="events-hero">
        <h1>GFG IKGPTU <span className="highlight">Events Calendar</span></h1>
        <p>Your gateway to workshops, hackathons, and learning opportunities on campus.</p>
      </section>

      {loading ? (
        <div className="events-loading">Loading events calendar...</div>
      ) : (
        <>
          {/* Upcoming Events Section */}
          <section className="events-section events-upcoming">
            <h2 className="section-title upcoming-title">Upcoming Events</h2>
            <div className="event-compact-list"> 
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => <EventCard key={event.id} event={event} />)
              ) : (
                <p className="no-events">Stay tuned! We're planning exciting new events soon.</p>
              )}
            </div>
          </section>

          {/* Past Events Section */}
          <section className="events-section events-past">
            <h2 className="section-title past-title">Past Events & Archive</h2>
            <div className="event-compact-list"> 
              {pastEvents.length > 0 ? (
                pastEvents.map(event => <EventCard key={event.id} event={event} />)
              ) : (
                <p className="no-events">No archived events yet. Start scheduling new ones!</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default EventsPage;