import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

// Forward the ref to the actual DOM element inside the component
const EventCard = forwardRef(({ name, datetime, location, description, highlight = false }, ref) => {
    const { i18n } = useTranslation();

    const locale = i18n.language === 'fr' ? 'fr-CA' : 'en-CA';

    const localDateTime = new Date(datetime).toLocaleString(locale, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });

    return (
        <div
            ref={ref}
            className={`p-4 mb-4 rounded shadow ${highlight ? 'bg-yellow-100 border-l-4 border-yellow-500' : 'bg-white'}`}
        >
            <h3 className={`text-xl font-semibold ${highlight ? 'text-yellow-800' : 'text-gray-900'}`}>{name}</h3>
            <p className="text-sm text-gray-600">{localDateTime}</p>
            <p className="text-gray-700">{location}</p>
            <p className="mt-2">{description}</p>
        </div>
    )
});

export default EventCard;
