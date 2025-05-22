import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t: tHome } = useTranslation('home');

    return (
        <section className="embeddedMap">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl mb-6 text-center">
                    {tHome('mapSectionTitle') || 'Where to Find Us'}
                </h2>
                <div className="relative aspect-square w-full h-60 rounded-xl overflow-hidden shadow-lg group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.463901439256!2d-75.710246!3d45.359633099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce06444a775601%3A0x7d4fac45993c26f1!2s1606%20Fisher%20Ave%2C%20Ottawa%2C%20ON%20K2C%201X6!5e0!3m2!1sen!2sca!4v1746753617567!5m2!1sen!2sca"
                        className="w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="absolute inset-0 bg-[#113250]/30 group-hover:bg-transparent transition duration-300 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
