"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { getDictionary, Locale } from "../lib/dictionary";

type LanguageContextType = {
  lang: Locale;
  toggleLanguage: () => void;
  t: ReturnType<typeof getDictionary>; // "t" stands for "translation"
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>('bs'); // Default to Bosnian ('bs')
  
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'bs' : 'en'));
  };

  const t = getDictionary(lang);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}