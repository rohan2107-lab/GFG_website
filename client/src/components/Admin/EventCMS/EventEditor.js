import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabaseClient';

const EventEditor = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    datetime_start: '', // Date object or ISO string
    datetime_end: '',
    location: '',
    registration_link: '',
    status: 'Draft', // Draft, Upcoming, Completed
    is_public: false,
    featured_image_url: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventId) {
      loadEvent(eventId);
    }
  }, [eventId]);

  const loadEvent = async (id) => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (data) {
        // Convert ISO date strings back to local format for the input fields
        data.datetime_start = data.datetime_start ? new Date(data.datetime_start).toISOString().slice(0, 16) : '';
        data.datetime_end = data.datetime_end ? new Date(data.datetime_end).toISOString().slice(0, 16) : '';
        setEventData(data);
    }
    setLoading(false);
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // IMPORTANT: Ensure is_public is true if status is Upcoming
    const finalPayload = { 
        ...eventData, 
        is_public: eventData.status === 'Upcoming' ? true : eventData.is_public
    };
    
    // Clean up unnecessary fields for Supabase
    delete finalPayload.author_id;
    delete finalPayload.created_at;

    let result;
    
    if (eventId) {
      // UPDATE
      result = await supabase.from('events').update(finalPayload).eq('id', eventId).select().single();
    } else {
      // CREATE
      result = await supabase.from('events').insert([finalPayload]).select(); 
    }

    if (result.error) {
      console.error('Save error:', result.error.message);
      alert(`Error saving event: ${result.error.message}`);
    } else {
      alert(`Event saved successfully as ${eventData.status}!`);
      // Navigate back to the list to see the updated event
      navigate('/admin/events', { replace: true });
    }
    setLoading(false);
  };

  const archiveEvent = async () => {
      if (window.confirm("Are you sure you want to mark this event as Completed/Archived?")) {
        setLoading(true);
        const { error } = await supabase
            .from('events')
            .update({ status: 'Completed', is_public: true })
            .eq('id', eventId);
            
        if (!error) {
            alert("Event archived successfully!");
            navigate('/admin/events', { replace: true });
        }
        setLoading(false);
      }
  };

  if (loading) {
    return <div className="cms-loading">Loading Event Form...</div>;
  }
  
  const isEditing = eventId !== undefined;

  return (
    <div className="admin-panel">
      <h2>{isEditing ? `Edit Event: ${eventData.title}` : 'Schedule New Event'}</h2>
      <p>Set all details for your event, including status and visibility.</p>

      <form onSubmit={handleSave} className="event-form-grid">
        {/* Row 1 */}
        <div className="form-group-full">
            <label htmlFor="title">Event Title *</label>
            <input type="text" id="title" name="title" value={eventData.title} onChange={handleChange} required className="input-full" />
        </div>

        {/* Row 2 */}
        <div className="form-group-half">
            <label htmlFor="datetime_start">Start Date/Time *</label>
            <input type="datetime-local" id="datetime_start" name="datetime_start" value={eventData.datetime_start} onChange={handleChange} required className="input-full" />
        </div>
        <div className="form-group-half">
            <label htmlFor="datetime_end">End Date/Time</label>
            <input type="datetime-local" id="datetime_end" name="datetime_end" value={eventData.datetime_end} onChange={handleChange} className="input-full" />
        </div>

        {/* Row 3 */}
        <div className="form-group-full">
            <label htmlFor="location">Location (Room/Link) *</label>
            <input type="text" id="location" name="location" value={eventData.location} onChange={handleChange} required className="input-full" />
        </div>

        {/* Row 4 */}
        <div className="form-group-full">
            <label htmlFor="registration_link">Registration Link (URL)</label>
            <input type="url" id="registration_link" name="registration_link" value={eventData.registration_link} onChange={handleChange} className="input-full" />
        </div>

        {/* Row 5 */}
        <div className="form-group-full">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={eventData.description} onChange={handleChange} required className="textarea-full" rows="6"></textarea>
        </div>
        
        {/* Row 6: Status & Visibility */}
        <div className="form-group-half">
            <label htmlFor="status">Event Status</label>
            <select id="status" name="status" value={eventData.status} onChange={handleChange} className="input-full">
                <option value="Draft">Draft (Hidden)</option>
                <option value="Upcoming">Upcoming (Public)</option>
                <option value="Completed">Completed (Archive/Past)</option>
            </select>
        </div>
        <div className="form-group-half checkbox-group">
            <input type="checkbox" id="is_public" name="is_public" checked={eventData.is_public} onChange={handleChange} disabled={eventData.status === 'Upcoming'} />
            <label htmlFor="is_public">Publicly Visible (Automatically checked for Upcoming)</label>
        </div>
        
        {/* Submission Buttons */}
        <div className="form-group-full form-actions">
            <button type="submit" className="admin-cta-button">
                {isEditing ? 'Save Changes' : 'Schedule Event'}
            </button>
            {isEditing && eventData.status !== 'Completed' && (
                <button 
                    type="button" 
                    onClick={archiveEvent} 
                    className="admin-edit-btn archive-btn" 
                    disabled={loading}
                >
                    Mark as Completed
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default EventEditor;