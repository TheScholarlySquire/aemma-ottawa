import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { differenceInCalendarDays } from 'date-fns'; //compares only calendar days (not time of day) to account for fringe cases on EventBanner
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import ImageCarousel from '../components/ImageCarousel';
import InfoCards from '../components/InfoCards';
import SignUpModal from '../components/SignUpModal'
import EventBanner from '../components/EventBanner';
import EmbeddedMap from '../components/EmbeddedMap';

export default function Home() {
    const { t: tHome } = useTranslation('home');
    const { t: tEvents } = useTranslation('events');
    const { t: tClasses } = useTranslation('classes');

    const intakeCourse = tClasses('courseList', { returnObjects: true })[0];
    const allEvents = tEvents('eventList', { returnObjects: true }) || [];
    const [modalOpen, setModalOpen] = useState(false);

    // Only show EventBanner instance(s) if any events are today or within 3 days
    const hasRelevantEvents = allEvents.some((event) => {
        const eventDate = new Date(event.datetime);
        const today = new Date();
        const diffInDays = differenceInCalendarDays(eventDate, today); //removes need for manual math each time (protects against daylight savings and timezone offsets)
        return diffInDays >= 0 && diffInDays <= 3;
    });

    return (
        <div>
            <HeroBanner />
            {hasRelevantEvents && <EventBanner events={allEvents} />}
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
                    <h1 className="text-4xl font-bold mb-4">{tHome('classSections.intakeHeader')}</h1>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition hover:cursor-pointer"
                    >
                        {intakeCourse.signupBtn}
                    </button>

                    {/*
                        <Link
                            to="/classes"
                            className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                        >
                            {tHome('classSections.intakeBtn')}
                        </Link>
                    */}

                    <p className="text-lg mt-4">{tHome('classSections.nextIntake')} [mm-dd-yyyy]</p>
                </div>
            </section>
            <SignUpModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                selectedCourseIndex={0}
            />
            <InfoCards />
            <EmbeddedMap />
        </div>
    );
}
