import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ events = [] }) {
    const [value, setValue] = useState(new Date());

    // Build a Set of string dates (YYYY-MM-DD) for efficient lookup
    const eventDateSet = new Set(
        events
            .map(e => e.date)
            .filter(date => !isNaN(Date.parse(date))) // filter valid dates
    );

    // Function to check if a date has an event
    const isEventDate = (date) => {
        const iso = date.toISOString().split('T')[0];
        return eventDateSet.has(iso);
    };

    return (
        <div className="max-w-md mx-auto mb-12">
            <h2 className="text-xl font-bold mb-4">Calendar View</h2>
            <Calendar
                onChange={setValue}
                value={value}
                className="w-full bg-white rounded-lg shadow-md p-4
                    [&_.react-calendar__tile--now]:bg-yellow-200
                    [&_.react-calendar__tile--active]:bg-blue-500
                    [&_.react-calendar__tile--active]:text-white
                    [&_.react-calendar__tile--hasActive]:bg-blue-100
                    [&_.react-calendar__tile--weekend]:!text-black"
                tileClassName={({ date, view }) =>
                    view === 'month' && isEventDate(date)
                        ? 'bg-blue-500 text-white rounded-full'
                        : ''
                }
            />
        </div>
    );
}
