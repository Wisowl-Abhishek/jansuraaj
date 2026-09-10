"use client";

import { useLanguage } from "@/context/LanguageContext";

const LanguageSwitcher = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  const activeClass = "bg-brand-gold text-brand-midnight";
  const inactiveClass = "text-white/70 hover:text-white";

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full bg-white/10 p-0.5 text-[11px] font-bold ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        aria-pressed={language === "hi"}
        className={`px-2 py-1 rounded-full transition ${language === "hi" ? activeClass : inactiveClass}`}
      >
        हिं
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`px-2 py-1 rounded-full transition ${language === "en" ? activeClass : inactiveClass}`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
