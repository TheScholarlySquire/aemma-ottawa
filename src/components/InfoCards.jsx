import { useTranslation } from 'react-i18next'

export default function InfoCards() {
    const { t } = useTranslation('home');
    const cards = t('cards', { returnObjects: true });

    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-3">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
                        >
                            <div className="text-4xl mb-4 text-center">{card.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-center">{card.title}</h3>
                            <p className="text-gray-600">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
