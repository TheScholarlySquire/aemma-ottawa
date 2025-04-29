import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation('home');

    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">{t('heading')}</h1>
            <p className="text-gray-700">{t('intro')}</p>
        </div>
    );
}
