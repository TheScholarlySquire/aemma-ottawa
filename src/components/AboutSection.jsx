import { useTranslation } from 'react-i18next'

export default function AboutSection() {
    const { t } = useTranslation('home');
    const aboutCards = t('aboutCards', { returnObjects: true });

    const isOdd = aboutCards.length % 2 !== 0;
    const lastIndex = aboutCards.length - 1;


    return (
        <section id="aboutSection">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid gap-6 grid-rows-2 md:grid-cols-3 sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] justify-items-center">
                    {aboutCards.map((aboutCard, index) => {

                        return (
                            <div
                                key={index}
                                className={`aboutCard p-6 rounded-2xl shadow hover:shadow-lg transition`}
                            >
                                <h3 className="text-xl font-semibold mb-2 text-center">{aboutCard.heading}</h3>
                                <p className="text-gray-600">{aboutCard.p1}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
