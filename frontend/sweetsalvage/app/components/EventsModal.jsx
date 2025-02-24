import React from 'react';

const EventsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {event.start && (
            <div>
              <p className="text-sm font-medium text-gray-500">Start Time</p>
              <p>{new Date(event.start).toLocaleString()}</p>
            </div>
          )}
          
          {event.end && (
            <div>
              <p className="text-sm font-medium text-gray-500">End Time</p>
              <p>{new Date(event.end).toLocaleString()}</p>
            </div>
          )}

          {event.description && (
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p>{event.description}</p>
            </div>
          )}

          {event.location && (
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p>{event.location}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsModal;