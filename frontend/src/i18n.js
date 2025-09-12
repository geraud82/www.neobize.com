import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English translations
import translationEN from './locales/en/translation.json';

const resources = {
  en: {
    translation: translationEN
  }
};

i18n
  // Integration with React
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    lng: 'en', // Set default language to English
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for React
    }
  });

export default i18n;
