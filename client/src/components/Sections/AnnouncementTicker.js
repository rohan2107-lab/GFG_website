import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient'; 
import { FaBullhorn } from 'react-icons/fa';

const AnnouncementTicker = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveAnnouncements();
  }, []);

  const fetchActiveAnnouncements = async () => {
    // Fetch only active announcements ordered by schedule date
    const { data, error } = await supabase
      .from('announcements')
      .select('message') 
      .eq('is_active', true) 
      .order('schedule_date', { ascending: false })
      .limit(5); // Limit to a few recent announcements

    if (error) {
      console.error('Error fetching announcements for ticker:', error.message);
    } else {
      setAnnouncements(data || []);
    }
    setLoading(false);
  };

  if (loading || announcements.length === 0) {
    // Hide the ticker if loading or no announcements are active
    return null; 
  }

  // Combine all messages into a single string for the scrolling effect
  const tickerText = announcements
    .map(ann => `📢 ${ann.message} | `)
    .join('');

  return (
    <section className="announcement-ticker-section">
      <div className="ticker-content-wrapper">
        <div className="ticker-icon-static">
          <FaBullhorn />
          <span className="ticker-label">LIVE UPDATE:</span>
        </div>
        
        {/* The scrolling text element */}
        <div className="ticker-scroll-text">
          <div className="ticker-inner-text">
            {/* Repeat the text twice to ensure seamless looping transition */}
            <span>{tickerText}</span>
            <span>{tickerText}</span> 
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementTicker;