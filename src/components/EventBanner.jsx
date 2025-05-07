import { useTranslation } from 'react-i18next';
import { differenceInCalendarDays, parseISO, isToday } from 'date-fns';
import { Link } from 'react-router-dom'

export default function EventBanner({ events }) {
    const { t } = useTranslation('events');
    const today = new Date();

    // Add parsed date objects
    const parsedEvents = events.map((e) => ({
        ...e,
        dateObj: parseISO(e.date),
    }));

    // Separate events into today and soon
    const eventsToday = parsedEvents.filter((e) => isToday(e.dateObj));
    const eventsSoon = parsedEvents
        .filter((e) => {
            const daysUntil = differenceInCalendarDays(e.dateObj, today);
            return daysUntil > 0 && daysUntil <= 3;
        })
        .sort((a, b) => a.dateObj - b.dateObj); // Soonest first

    // Don't render anything if no relevant events
    if (eventsToday.length === 0 && eventsSoon.length === 0) return null;

    return (
        <div className="space-y-4 mb-8">
            {/* Render today's events */}
            {eventsToday.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`}>
                    <div className="rounded-lg px-6 py-4 shadow-md bg-yellow-200 border-yellow-400 border-2">
                        <div className="flex items-center gap-3">
                            <span role="img" aria-label="celebration" className="text-3xl">🎉</span>
                            <div>
                                <p className="font-bold text-lg">
                                    {t('eventTodayBanner', { eventTitle: event.name })}
                                </p>
                                <p className="text-sm">
                                    {event.date} — {event.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

            {/* Render upcoming soon events */}
            {eventsSoon.map((event) => {
                const daysUntil = differenceInCalendarDays(event.dateObj, today);
                return (
                    <Link key={event.id} to={`/events/${event.id}`}>
                        <div className="rounded-lg px-6 py-4 shadow-md bg-blue-100 border-blue-300 border">
                            <div className="flex items-center gap-3">
                                <span role="img" aria-label="calendar" className="text-2xl">📅</span>
                                <div>
                                    <p className="font-bold text-lg">
                                        {t('eventSoonBanner', {
                                            eventTitle: event.name,
                                            count: daysUntil,
                                        })}
                                    </p>
                                    <p className="text-sm">
                                        {event.date} — {event.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
