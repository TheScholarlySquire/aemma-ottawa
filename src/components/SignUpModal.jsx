import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

    export default function SignUpModal({ isOpen, onClose }) {
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
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true" />

                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto z-50 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-bold">Class Sign-Up</Dialog.Title>
                        <button onClick={onClose}>
                            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium">Name</label>
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
                            <label className="block font-medium">Email</label>
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
                            <label className="block font-medium mb-1">Do you have fencing experience?</label>
                            <div className="flex gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="hasExperience"
                                        value="yes"
                                        checked={formData.hasExperience === true}
                                        onChange={() => setFormData((prev) => ({ ...prev, hasExperience: true }))}
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="hasExperience"
                                        value="no"
                                        checked={formData.hasExperience === false}
                                        onChange={() => setFormData((prev) => ({ ...prev, hasExperience: false, experienceDetails: '' }))}
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                            </div>
                        </div>

                        {formData.hasExperience && (
                            <div>
                                <label className="block font-medium">Please describe your experience</label>
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
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
}
