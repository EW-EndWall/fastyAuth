import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

await i18n
  .use(resourcesToBackend((lng, ns) => import(`./locales/${lng}/${ns}.json`))) // * Load translations with loadPath
  .use(LanguageDetector) // * Language detection
  .init({
    fallbackLng: "en", // * Default language
    ns: ["translation"], // * Namespace defaults to "translation"
    defaultNS: "translation", //*  Default namespace
    interpolation: {
      escapeValue: false, // ? No need for Vue.js
    },
  });

export { i18n };
