import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // загружает переводы через http (подумайте о структуре папок)
  .use(LanguageDetector) // определяет язык пользователя
  .use(initReactI18next) // инициализирует react-i18next
  .init({
    lng: 'kz',
    fallbackLng: 'kz', // язык по умолчанию, на случай если текущий язык не доступен
    debug: true,
    interpolation: {
      escapeValue: false, // не требуется для react, так как он уже защищает от XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // Убедитесь, что путь корректен
    }
  });

export default i18n;
