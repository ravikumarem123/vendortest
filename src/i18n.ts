import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationKN from './locales/kn.json';

const resources = {
    en: {
        translation: translationEN,
    },
    kn: {
        translation: translationKN,
    },
};

declare module 'i18next' {
    interface CustomTypeOptions {
        returnNull: false;
    }
}

i18n.use(initReactI18next).init({
    resources,
    returnNull: false,
    lng: 'en', // default language
    interpolation: {
        escapeValue: false,
    },
    debug: process.env.NODE_ENV === 'development', // enable debug mode
});

export default i18n;
