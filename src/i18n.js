import i18n from 'i18next';
import ICU from 'i18next-icu'
import { initReactI18next } from 'react-i18next';

import homeEn from './locales/en/home.json'
import aboutEn from './locales/en/about.json'
import eventsEn from './locales/en/events.json'
import classesEn from './locales/en/classes.json'
import contactEn from './locales/en/contact.json'
import navEn from './locales/en/nav.json'
import faqEn from './locales/en/faq.json'

import homeFr from './locales/fr/home.json'
import aboutFr from './locales/fr/about.json'
import eventsFr from './locales/fr/events.json'
import classesFr from './locales/fr/classes.json'
import contactFr from './locales/fr/contact.json'
import navFr from './locales/fr/nav.json'
import faqFr from './locales/fr/faq.json'

// Define your translations here
const resources = {
    en: {
        home: homeEn,
        events: eventsEn,
        about: aboutEn,
        contact: contactEn,
        classes: classesEn,
        nav: navEn,
        faq: faqEn,
    },
    fr: {
        home: homeFr,
        events: eventsFr,
        about: aboutFr,
        contact: contactFr,
        classes: classesFr,
        nav: navFr,
        faq: faqFr,
    },
};

i18n
    .use(ICU)
    .use(initReactI18next) // connect with React
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'en',
        ns: ['home', 'events', 'about', 'classes', 'contact', 'nav'],
        defaultNS: 'home',
        interpolation: {
            escapeValue: false, // React already escapes by default
        },
    });

export default i18n;
