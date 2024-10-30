import React from 'react';


const EventsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{event.title}</h2>
        <p>Start: {moment(event.start).format('MMMM Do YYYY, h:mm a')}</p>
        <p>End: {moment(event.end).format('MMMM Do YYYY, h:mm a')}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventsModal;
