import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { enTranslations } from "../locales/en";
import { nlTranslations } from "../locales/nl";
import { getDefaultLanguage } from "./AccessToken";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    nl: {
      translation: nlTranslations,
    },
  },
  fallbackLng: getDefaultLanguage() || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
