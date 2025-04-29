// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define your translations here
const resources = {
    en: {
        translation: {
            welcome: "Welcome to AEMMA Ottawa",
            about: "About",
            contact: "Contact",
        },
    },
    fr: {
        translation: {
            welcome: "Bienvenue à AEMMA Ottawa",
            about: "À propos",
            contact: "Contactez-nous",
        },
    },
};

i18n
.use(initReactI18next) // connect with React
.init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // React already escapes by default
    },
});

export default i18n;
