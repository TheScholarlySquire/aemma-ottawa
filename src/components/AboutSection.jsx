import { useTranslation } from 'react-i18next'

export default function AboutSection() {
    const { t } = useTranslation('home');
    const aboutCards = t('aboutCards', { returnObjects: true });

    const isOdd = aboutCards.length % 2 !== 0;
    const lastIndex = aboutCards.length - 1;


    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] justify-items-center">
                    {aboutCards.map((aboutCard, index) => {
                        const isLast = index === lastIndex;
                        const extraClass =
                            isOdd && isLast ? 'sm:col-span-full' : '';

                        return (
                            <div
                                key={index}
                                className={`bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition ${extraClass}`}
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
