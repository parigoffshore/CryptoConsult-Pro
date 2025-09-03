"use client";

import { create } from 'zustand';

export type Language = "en" | "es" | "fr";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: "fr",
  setLanguage: (language) => set({ language }),
}));
