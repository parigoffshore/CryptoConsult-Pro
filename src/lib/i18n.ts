import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { consultation: "Consultation", services: "Services", blog: "Blog", contact: "Contact" } },
    fr: { translation: { consultation: "Consultation", services: "Services", blog: "Blog", contact: "Contact" } },
    es: { translation: { consultation: "Consulta", services: "Servicios", blog: "Blog", contact: "Contacto" } },
  },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

export default i18n;