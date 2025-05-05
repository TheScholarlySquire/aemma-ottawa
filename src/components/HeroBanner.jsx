import { useTranslation } from 'react-i18next'

export default function HeroBanner () {
    const {t} = useTranslation('home');

    return (
        <section className="bg-blue-100 text-center py-16 px-4 rounded-lg shadow-md mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">{t('hero.title')}</h1>
            <p className="text-lg text-blue-700 mb-6">{t('hero.subtitle')}</p>
            <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
                {t('hero.ctaButton')}
            </button>
        </section>
    );
}
