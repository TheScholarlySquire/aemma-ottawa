import React, { forwardRef } from 'react';

// Forward the ref to the actual DOM element inside the component
const EventCard = forwardRef(({ name, date, location, description, highlight = false }, ref) => (
    <div
        ref={ref}
        className={`p-4 mb-4 rounded shadow ${highlight ? 'bg-yellow-100 border-l-4 border-yellow-500' : 'bg-white'}`}
    >
        <h3 className={`text-xl font-semibold ${highlight ? 'text-yellow-800' : 'text-gray-900'}`}>{name}</h3>
        <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</p>
        <p className="text-gray-700">{location}</p>
        <p className="mt-2">{description}</p>
    </div>
));

export default EventCard;
