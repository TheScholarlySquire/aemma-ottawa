import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

export default function SignUpModal({ isOpen, onClose, selectedCourseIndex }) {
    const { t } = useTranslation('classes');
    const courses = t('courseList', { returnObjects: true });
    const modals = t('modal', { returnObjects: true });

    const selectedCourse = selectedCourseIndex != null ? courses[selectedCourseIndex] : null;
    const modalTitle = selectedCourse?.modalTitle || t('courseList.modalTitle', 'Class Sign-Up');


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        hasExperience: false,
        experienceDetails: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition transition-discrete duration-300" aria-hidden="true" />

                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto z-50 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-bold">{modalTitle}</Dialog.Title>
                        <button onClick={onClose}>
                            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 hover:cursor-pointer" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium">{modals.nameTitle}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block font-medium">{modals.emailTitle}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">{modals.textTitle}</label>
                            <div className="flex gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="hasExperience"
                                        value="yes"
                                        checked={formData.hasExperience === true}
                                        onChange={() => setFormData((prev) => ({ ...prev, hasExperience: true }))}
                                    />
                                    <span className="ml-2">{modals.textYes}</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="hasExperience"
                                        value="no"
                                        checked={formData.hasExperience === false}
                                        onChange={() => setFormData((prev) => ({ ...prev, hasExperience: false, experienceDetails: '' }))}
                                    />
                                    <span className="ml-2">{modals.textNo}</span>
                                </label>
                            </div>
                        </div>

                        {formData.hasExperience && (
                            <div>
                                <label className="block font-medium">{modals.textField}</label>
                                <textarea
                                    name="experienceDetails"
                                    value={formData.experienceDetails}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                    rows={3}
                                />
                            </div>
                        )}

                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
                            >
                                {modals.submitBtn}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
}
