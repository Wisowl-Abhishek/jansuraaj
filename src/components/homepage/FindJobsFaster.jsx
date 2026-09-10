import React from 'react';
import {
  Briefcase,
  Sparkles,
  LifeBuoy,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const icons = [Briefcase, Sparkles, LifeBuoy];

const FindJobsFaster = () => {
  const { t } = useLanguage();
  const steps = t.features.cards.map((card, i) => ({
    ...card,
    icon: icons[i],
  }));

  return (
    <section className="bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl sm:text-4xl font-bold text-center leading-tight">
          {t.features.heading}
        </h2>
        <p className="mt-3 text-gray-600 text-center text-lg">
          {t.features.subheading}
        </p>

        {/* ✅ Icon Cards */}
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={i}
                className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all p-8 w-full max-w-sm text-center"
              >
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-orange-40 mb-5">
                  <Icon className="w-10 h-10 text-brand-amber" />
                </div>

                <p className="text-xl font-semibold text-gray-900">{step.title}</p>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
};

export default FindJobsFaster;
