"use client";

import { create } from "zustand";
import { useTranslation } from "react-i18next";
import React from "react";


export type Language = "en" | "es" | "fr";


interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

const useLanguageStore = create<LanguageStore>((set) => ({
  language: "fr",
  setLanguage: (language: Language) => set({ language }),
}));

export function useLanguage() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();


  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return {
    t,
    language,
    setLanguage, 
  };
}