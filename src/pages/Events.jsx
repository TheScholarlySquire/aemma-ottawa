import { useTranslation } from 'react-i18next';
import EventCard from '../components/EventCard';
import CalendarView from '../components/CalendarView';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import '../styles/events.css'

export default function Events() {
    const { t } = useTranslation('events');
    const { eventId } = useParams(); // Get eventId from the URL
    const eventRef = useRef(null);

    // Get localized events list
    const rawEvents = t('eventList', { returnObjects: true }) || [];

    const now = new Date();

    // Clone and sort events
    const upcomingEvents = rawEvents
        .filter(e => new Date(e.datetime) >= now)
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    const pastEvents = rawEvents
        .filter(e => new Date(e.datetime) < now)
        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    const todayEvents = rawEvents
        .filter(e => {
            const eventDate = new Date(e.datetime);
            return eventDate.toDateString() === now.toDateString();
        })
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    useEffect(() => {
        if (eventRef.current) {
            eventRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [eventId]); // Trigger scroll when eventId changes

    // If an eventId is provided, show that specific event's details
    const eventDetails = eventId ? rawEvents.find(event => event.id === eventId) : null;

    return (
        <div id="eventsContainer">
            <div id="eventsPlus">
                <div>
                    <h1 className="text-4xl font-semibold mb-4">{t('title')}</h1>

                    {/*
                        To add Calendar View component, add < CalendarView events=upcomingEvents / >
                    */}

                    {/* Today Events */}
                    {todayEvents.length > 0 && (
                        <div className="todayEvent borderGold mb-10 p-6 border-l-4 bg-yellow-50 rounded shadow-md">
                            <h2 className="text-2xl text-yellow-700 flex items-center gap-2 mb-3">
                                <span role="img" aria-label="celebration">🎉</span>
                                {t('titleToday')}
                            </h2>
                            {todayEvents.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    highlight={event.id === eventId} // Highlight if the event matches the eventId
                                    ref={event.id === eventId ? eventRef : null} // Scroll into view if it's the current event
                                />
                            ))}
                        </div>
                    )}

                    {/* Event details for specific event */}
                    {eventDetails && (
                        <div ref={eventRef} className="mb-12 p-6 border-l-4 border-yellow-400 bg-yellow-50 rounded shadow-md">
                            <h2 className="text-3xl text-yellow-700">{eventDetails.name}</h2>
                            <p>{eventDetails.date}</p>
                            <p>{eventDetails.location}</p>
                            <p>{eventDetails.description}</p>
                            {/* Add any additional event-specific content */}
                        </div>
                    )}

                    {/* Upcoming Events */}
                    <div id="upcomingEvents">
                        <h2 className="text-3xl mb-3">{t('titleUpcoming')}</h2>
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    highlight={event.id === eventId} // Highlight if the event matches the eventId
                                    ref={event.id === eventId ? eventRef : null} // Scroll into view if it's the current event
                                    isUpcoming={true}
                                />
                            ))
                        ) : (
                            <p>No upcoming events at this time.</p>
                        )}
                    </div>
                </div>
            </div>

            <div id="eventsMinus">
                <div className="topChevron"></div>
                {/* Past Events */}
                <div className="topCurved"></div>
                <div id="pastEvents">
                    <h2 className="text-3xl mb-3">{t('titlePast')}</h2>
                    {pastEvents.length > 0 ? (
                        pastEvents.map((event, index) => (
                            <EventCard key={index} event={event} />
                        ))
                    ) : (
                        <p>No past events at this time.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
