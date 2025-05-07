import { useTranslation } from 'react-i18next'
import EventCard from '../components/EventCard'
import CalendarView from '../components/CalendarView'
import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function Events() {
    const { t } = useTranslation('events');
    const { eventId } = useParams();
    const eventRef = useRef(null);

    // Get localized events list
    const rawEvents = t('eventList', { returnObjects: true }) || [];
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();

    // Clone and sort events
    const upcomingEvents = rawEvents
        .filter(e => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const todayEvents = rawEvents
        .filter(e => e.date === todayStr)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const pastEvents = rawEvents
        .filter(e => new Date(e.date) < now)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        if (eventRef.current) {
            eventRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [eventId]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

            {/* Calendar View */}
            <CalendarView events={upcomingEvents} />

            {/* Today */}
            {todayEvents.length > 0 && (
                <div className="mb-12 p-6 border-l-4 border-yellow-400 bg-yellow-50 rounded shadow-md">
                    <h2 className="text-3xl font-extrabold text-yellow-700 flex items-center gap-2 mb-4">
                        <span role="img" aria-label="celebration">🎉</span>
                        {t('titleToday')}
                    </h2>
                    {todayEvents.map((event, index) => (
                        <EventCard
                            key={event.id}
                            {...event}
                            highlight={event.id === eventId}
                            ref={event.id === eventId ? eventRef : null}
                        />
                    ))}
                </div>
            )}

            {/* Upcoming */}
            <div>
                <h2 className="text-2xl font-bold mb-8">{t('titleUpcoming')}</h2>
                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, index) => (
                        <EventCard
                            key={event.id}
                            {...event}
                            highlight={event.id === eventId}
                            ref={event.id === eventId ? eventRef : null}
                        />
                    ))
                ) : (
                    <p>No upcoming events at this time.</p>
                )}
            </div>

            {/* Past */}
            <div>
                <h2 className="text-2xl font-bold mb-8">{t('titlePast')}</h2>
                {pastEvents.length > 0 ? (
                    pastEvents.map((event, index) => (
                        <EventCard key={index} {...event} />
                    ))
                ) : (
                    <p>No past events at this time.</p>
                )}
            </div>
        </div>
    );
}
