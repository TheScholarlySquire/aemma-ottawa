import { useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'

export default function Contact() {
    const { t } = useTranslation('contact');

    return (
        <div>
            <h1 className="text-2xl font-semibold text-blue-700 mb-4">{t('heading')}</h1>
            <p className="text-gray-700">{t('intro')}</p>
            <p className="mt-2 text-sm text-gray-500">
                We'd love to hear from you! Whether you’re interested in joining or have questions about historical martial arts, feel free to reach out.
            </p>
            <ContactForm />
        </div>
    );
}
