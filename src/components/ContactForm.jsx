import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
    const { t } = useTranslation('contact');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({submitted: false, error: false, message: ''});

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            "service_nbp8fpd", //EmailJS service ID nbp8fpd
            "template_h7ne5tb", //Template ID
            formData,
            'gynnxssIw1L6xhHTT', //EmailJS public key
        )
        .then(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setStatus({ submitted: true, error: false, message: t('formSuccess') });
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            setStatus({
                submitted: false,
                error: true,
                message: 'formFailure'
            });
        });
    };

    return (
        <form onSubmit={handleSubmit} id="contactForm" className="space-y-6 max-w-xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">{t('name')}</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <button
                type="submit"
                className="siteBtn px-4 py-2 rounded hover:cursor-pointer transition"
            >
                {t('sentMsg')}
            </button>

            {status.message && (
                <p className={`mt-2 text-sm ${status.error ? 'text-red-600' : 'text-green-600'}`}>
                {status.message === 'formFailure' ? (
                    <Trans i18nKey="formFailure" ns="contact">
                        Oops! Something went wrong. Please try again later, or feel free to email us at <a href="mailto:ottawa@aemma.org" className="underline text-blue-600">ottawa@aemma.org</a>.
                    </Trans>
                ) : (
                    status.message
                )}
                </p>
            )}
        </form>
    );
}
