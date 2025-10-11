import React from 'react';
import { FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EventListTable = ({ events, onDoubleClick, onDelete }) => {
  return (
    <table className="cms-list-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Start Date/Time</th>
          <th>Location</th>
          <th>Status</th>
          <th>Public</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr 
            key={event.id} 
            onDoubleClick={() => onDoubleClick(event.id)}
            className="cms-list-row"
          >
            <td>{event.title}</td>
            <td>{new Date(event.datetime_start).toLocaleString()}</td>
            <td>{event.location}</td>
            <td>
              <span className={`event-status status-${event.status.toLowerCase().replace(' ', '-')}`}>
                {event.status}
              </span>
            </td>
            <td>
              {event.is_public ? 
                <FaCheckCircle className="status-icon-public" title="Publicly Visible" /> : 
                <FaTimesCircle className="status-icon-draft" title="Hidden from Public" />
              }
            </td>
            <td>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onDelete(event.id, event.title); 
                }}
                className="cms-delete-btn"
                title="Delete Event"
              >
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventListTable;