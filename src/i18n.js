import i18n from 'i18next';
import ICU from 'i18next-icu'
import { initReactI18next } from 'react-i18next';

import homeEn from './locales/en/home.json'
import eventsEn from './locales/en/events.json'
import aboutEn from './locales/en/about.json'
import contactEn from './locales/en/contact.json'
import navEn from './locales/en/nav.json'

import homeFr from './locales/fr/home.json'
import eventsFr from './locales/fr/events.json'
import aboutFr from './locales/fr/about.json'
import contactFr from './locales/fr/contact.json'
import navFr from './locales/fr/nav.json'

// Define your translations here
const resources = {
    en: {
        home: homeEn,
        events: eventsEn,
        about: aboutEn,
        contact: contactEn,
        nav: navEn,
    },
    fr: {
        home: homeFr,
        events: eventsFr,
        about: aboutFr,
        contact: contactFr,
        nav: navFr,
    },
};

i18n
    .use(ICU)
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
