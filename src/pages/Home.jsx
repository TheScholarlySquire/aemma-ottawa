import { useTranslation } from 'react-i18next';

export default function Home() {
const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">{t('welcome')}</h1>
            <p className="text-gray-700">
                We study historical European martial arts with a focus on Dall'Aggochie's Bolognese sidesword.
            </p>
        </div>
    );
}
