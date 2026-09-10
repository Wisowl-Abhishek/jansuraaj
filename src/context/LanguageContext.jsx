"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";

const STORAGE_KEY = "jansuraaj_lang";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState("hi");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "hi" || stored === "en") {
        setLanguageState(stored);
      }
    } catch (e) {
      // localStorage unavailable — stick with default
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {
      // ignore write failures (private browsing, etc.)
    }
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === "hi" || lang === "en") setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
