import { useTranslation } from 'react-i18next';
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import ImageCarousel from '../components/ImageCarousel';
import InfoCards from '../components/InfoCards';
import EventBanner from '../components/EventBanner';
import EmbeddedMap from '../components/EmbeddedMap';

export default function Home() {
    const { t: tHome } = useTranslation('home');
    const { t: tEvents } = useTranslation('events');
    const allEvents = tEvents('eventList', { returnObjects: true }) || [];

    // Only show EventBanner instance(s) if any events are today or within 3 days
    const hasRelevantEvents = allEvents.some((event) => {
        const eventDate = new Date(event.datetime);
        const today = new Date();
        const diffInDays = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
        return diffInDays >= 0 && diffInDays <= 3;
    });

    return (
        <div>
            <HeroBanner />
            {hasRelevantEvents > 0 && <EventBanner events={allEvents} />}
            <AboutSection />
            <section className="relative w-full h[400px] my-8 py-8">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('./img/group1.jpg')" }}
                ></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/10 z-10"></div>

                {/* Content */}
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-4xl font-bold mb-4">Join AEMMA Ottawa with our $20 intake class</h1>
                    <a
                        href="/your-target-page"
                        className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                    >
                        Join now
                    </a>
                    <p className="text-lg mt-4">Next Ottawa intake: [mm-dd-yyyy]</p>
                </div>
            </section>
            <InfoCards />
            <EmbeddedMap />
        </div>
    );
}
