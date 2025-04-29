import { useTranslation } from 'react-i18next'

export default function About() {
    const { t } = useTranslation('about');

    return (
        <div>
            <h1 className="text-2xl font-semibold text-blue-700 mb-4">{t('heading')}</h1>
            <p className="text-gray-700">{t('intro')}</p>
        </div>
    );
}
