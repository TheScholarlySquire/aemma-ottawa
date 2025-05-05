import { useTranslation } from 'react-i18next'

const cards = [
    {
        key: 'training',
        icon: '⚔️',
    },
    {
        key: 'history',
        icon: '📜',
    },
    {
        key: 'community',
        icon: '🤝',
    },
];

export default function InfoCards() {
    const { t } = useTranslation('home');

    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-3">
                    {cards.map(({ key, icon }) => (
                        <div
                            key={key}
                            className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
                        >
                            <div className="text-4xl mb-4">{icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{t(`cards.${key}.title`)}</h3>
                            <p className="text-gray-600">{t(`cards.${key}.text`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
