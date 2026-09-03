import React from "react";
import { Briefcase, Users, Sparkles } from "lucide-react";

export default function RecruiterSection() {
  return (
    <section class="w-full bg-gradient-to-br from-slate-900 to-slate-950 text-white py-20 px-6">
        <div class="max-w-7xl mx-auto">
            
            <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
                Welcome! Hire Smarter & Faster with AI
            </h1>
            <p class="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                Smart hiring tools designed to help recruiters find the right talent faster,
                reduce manual effort, and make confident hiring decisions.
            </p>

            <a
                href="/recruiter/signup"
                class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white
                    hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
                    focus:ring-offset-slate-900 transition"
            >
                Sign up as Recruiter
            </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/40 transition">
                <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
                🤖 <span>AI-Powered Job Matching</span>
                </h3>
                <p class="text-slate-400 leading-relaxed">
                Instantly discover highly relevant candidates based on skills, experience,
                and job requirements — no more manual screening.
                </p>
            </div>

            <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/40 transition">
                <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
                📝 <span>Smart Job Posting & Hiring Tools</span>
                </h3>
                <p class="text-slate-400 leading-relaxed">
                Create and manage job listings with AI-assisted descriptions that attract
                the right talent and improve response quality.
                </p>
            </div>

            <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/40 transition">
                <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
                📊 <span>End-to-End Recruitment Dashboard</span>
                </h3>
                <p class="text-slate-400 leading-relaxed">
                Track applicants, review resumes, and manage your hiring pipeline in one place —
                never miss a strong candidate again.
                </p>
            </div>
            </div>
        </div>
        </section>
  );
}
