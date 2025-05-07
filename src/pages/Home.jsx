import { useTranslation } from 'react-i18next';
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import ImageCarousel from '../components/ImageCarousel';
import InfoCards from '../components/InfoCards';
import EventBanner from '../components/EventBanner';

export default function Home() {
    const { t: tHome } = useTranslation('home');
    const { t: tEvents } = useTranslation('events');
    const allEvents = tEvents('eventList', { returnObjects: true }) || [];

    // Only show EventBanner instance(s) if any events are today or within 3 days
    const hasRelevantEvents = allEvents.some((event) => {
        const eventDate = new Date(event.date);
        const today = new Date();
        const diffInDays = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
        return diffInDays >= 0 && diffInDays <= 3;
    });

    return (
        <div>
            <HeroBanner />
            {hasRelevantEvents > 0 && <EventBanner events={allEvents} />}
            <AboutSection />
            <ImageCarousel />
            <InfoCards />
        </div>
    );
}
