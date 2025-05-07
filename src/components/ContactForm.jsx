import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
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
            "service_nbp8fpd", //EmailJS service ID
            "template_h7ne5tb", //Template ID
            formData,
            'gynnxssIw1L6xhHTT', //EmailJS public key
        )
        .then(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setStatus({ submitted: true, error: false, message: 'Thank you! Your message has been sent.' });
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            setStatus({ submitted: false, error: true, message: 'Oops! Something went wrong. Please try again later.' });
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
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
                <label className="block text-sm font-medium text-gray-700">Email</label>
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
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Send Message
            </button>

            {status.message && (
                <p className={`mt-2 text-sm ${status.error ? 'text-red-600' : 'text-green-600'}`}>
                    {status.message}
                </p>
            )}
        </form>
    );
}
