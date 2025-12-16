import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "../../../../public/locales/ru/translation.json";
import en from "../../../../public/locales/en/translation.json";

export const LANG_KEY = "app_language";

i18n.use(initReactI18next).init({
  backend: {
    loadPath: "/locales/{{lng}}/translation.json",
  },
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: "ru",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANG_KEY, lng);
});

export default i18n;
