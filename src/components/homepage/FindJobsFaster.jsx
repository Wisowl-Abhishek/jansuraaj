import React from 'react';
import {
  Briefcase,
  Sparkles,
  FileText,
  Rocket,
  Bell,
  LifeBuoy,
} from "lucide-react";

const steps = [
  {
    title: "All Jobs in One Place",
    desc: "Aggregates 100K+ jobs daily from top portals — no more jumping between tabs.",
    icon: <Briefcase className="w-10 h-10 text-brand-amber" />,
  },
  {
    title: "Smarter Job Matching",
    desc: "AI surfaces jobs that actually fit your skills, not just keywords.",
    icon: <Sparkles className="w-10 h-10 text-brand-amber" />,
  },
  {
    title: "Resume Builder",
    desc: "Optimize your resume to stand out — with AI-powered suggestions.",
    icon: <FileText className="w-10 h-10 text-brand-amber" />,
  },
  {
    title: "Auto Apply (Coming Soon)",
    desc: "Apply to multiple matched jobs in seconds, automatically.",
    icon: <Rocket className="w-10 h-10 text-brand-amber" />,
  },
  {
    title: "Daily Job Alerts",
    desc: "Daily personalized alerts so you never miss a high-match opportunity.",
    icon: <Bell className="w-10 h-10 text-brand-amber" />,
  },
  {
    title: "Dedicated Support",
    desc: "Get guidance for interviews, resumes, job search decisions and more.",
    icon: <LifeBuoy className="w-10 h-10 text-brand-amber" />,
  },
];

const FindJobsFaster = () => (
  <section className="bg-white text-black py-16">
    <div className="max-w-7xl mx-auto px-4">
      
      <h2 className="text-3xl sm:text-4xl font-bold text-center leading-tight">
        Find Jobs Faster and Smarter with WisOwl
      </h2>
      <p className="mt-3 text-gray-600 text-center text-lg">
        Speed Up Your Search. Land the Right Job.
      </p>

      {/* ✅ Icon Cards */}
      <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {steps.map((step, i) => (
          <li
            key={i}
            className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all p-8 w-full max-w-sm text-center"
          >
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-orange-40 mb-5">
              {step.icon}
            </div>

            <p className="text-xl font-semibold text-gray-900">{step.title}</p>
            <p className="text-gray-600 mt-2">{step.desc}</p>
          </li>
        ))}
      </ul>

    </div>
  </section>
);

export default FindJobsFaster;
