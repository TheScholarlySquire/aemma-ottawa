import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import ContactForm from '../components/ContactForm'
import EmbeddedMap from '../components/EmbeddedMap'

import '../styles/contact.css'

export default function Contact() {
    const { t } = useTranslation('contact');
    const chapters = t('chapters', { returnObjects: true });
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div id="contactContainer">
            <div id="formContainer">
                <div className="mb-5">
                    <h1 className="text-3xl text-black mb-4">{t('heading')}</h1>
                    <p className="text-gray-700">{t('intro')}</p>
                </div>

                <ContactForm />
            </div>

            <div id="contactBottom">
                <EmbeddedMap />

                <div className="topChevron"></div>

                <section className="chapters">
                    <h2 className="text-2xl mb-3 text-center">{t('otherChapters')}</h2>

                    {/* Tab container */}
                    <div className="flex border-b border-gray-300 justify-center">
                        {chapters.map((chapter, index) => (
                            <button
                                key={chapter.name}
                                onClick={() => setActiveIndex(index)}
                                className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors duration-300 hover:cursor-pointer ${
                                    index === activeIndex
                                    ? 'border-blue-700 text-blue-700'
                                    : 'border-transparent text-gray-500 hover:text-blue-700 hover:border-blue-300'
                                }`}
                            >
                                {chapter.name}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="bg-gray-50 p-6 rounded-br-xl rounded-bl-xl shadow sm:block md:flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{chapters[activeIndex].name}</h3>
                            <ul>
                                <li className="text-gray-700"><strong>{t('address')}:</strong> {chapters[activeIndex].address}</li>
                                <li className="text-gray-700"><strong>{chapters[activeIndex].place}</strong></li>
                                <li className="text-gray-700"><strong>{t('email')}:</strong> {chapters[activeIndex].contact}</li>
                            </ul>
                        </div>
                        <figure className="relative sm:w-100 md:aspect-square md:w-90 h-60 rounded-xl overflow-hidden shadow-lg group mx-auto">
                            <iframe
                                title={`Map location of ${chapters[activeIndex].name}`}
                                src={chapters[activeIndex].mapUrl}
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-300 pointer-events-none"></div>
                        </figure>
                    </div>
                </section>
            </div>
        </div>
    );
}
