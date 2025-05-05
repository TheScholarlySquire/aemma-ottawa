import { useTranslation } from 'react-i18next'

export default function AboutSection() {
    const { t } = useTranslation('home');

    return (
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('about.heading')}</h2>
            <p className="text-gray-700 mb-4">{t('about.p1')}</p>
            <p className="text-gray-700">{t('about.p2')}</p>
        </div>
    );
}
