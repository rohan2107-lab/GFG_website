import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabaseClient'; 
import EventListTable from './EventListTable';
import { FaCalendarPlus } from 'react-icons/fa';

const ManageEvents = ({ setSelectedView }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    
    // Fetch all events, including Drafts and Completed, for the admin view
    const { data, error } = await supabase
      .from('events')
      .select(`
        id, 
        title, 
        datetime_start, 
        status, 
        is_public,
        location 
      `)
      .order('datetime_start', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error.message);
    } else {
      setEvents(data);
    }
    setLoading(false);
  }, []);

  const deleteEvent = async (eventId, eventTitle) => {
    if (window.confirm(`Are you sure you want to permanently delete the event: "${eventTitle}"?`)) {
      setLoading(true);
      
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) {
        console.error('Delete error:', error.message);
        alert(`Error deleting event: ${error.message}`);
      } else {
        alert(`Event "${eventTitle}" deleted successfully.`);
        // Update the UI locally without re-fetching all data
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDoubleClick = (eventId) => {
    setSelectedView('create'); // Update sidebar state
    navigate(`/admin/events/edit/${eventId}`);
  };

  if (loading) {
    return <div className="cms-loading">Loading Events...</div>;
  }

  return (
    <div className="manage-events-panel admin-panel">
      <h2>Event Management System 📅</h2>
      <p>Manage scheduling, visibility, and archiving of all GFG IKGPTU events.</p>
      
      <button 
        className="admin-cta-button"
        onClick={() => {setSelectedView('create'); navigate(`/admin/events/create`);}}
      >
        <FaCalendarPlus style={{marginRight: '8px'}} /> Schedule New Event
      </button>

      <div className="admin-data-list">
        <h3>Events List</h3>
        {events.length === 0 ? (
          <div className="no-data-found">No events found. Click 'Schedule New Event' to begin!</div>
        ) : (
          <EventListTable 
            events={events} 
            onDoubleClick={handleDoubleClick} 
            onDelete={deleteEvent} 
          />
        )}
      </div>
    </div>
  );
};

export default ManageEvents;