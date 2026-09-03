"use client";

import React, { useEffect } from "react";
import MainLayout from "@/MainLayout";
import { Check, X, Sparkles, File, FileText, Wand2, Zap, Star, ShieldCheck, Lock, Rocket, TrendingUp, Clock, User } from "lucide-react";
// @ts-ignore
import {
    SiTcs,
    SiPaypal,
    // SiAmazon,
    SiFlipkart,
    SiNetflix,
    SiWalmart,
    SiAccenture
  } from "react-icons/si";

import PackComparison from "@/components/common/PackComparison";
import Button from "@/components/common/Button";
import Image from "next/image";


declare global {
  interface Window {
    gtag: any;
  }
}

export default function ResumeBuilderPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const GAHandleClick = (action: string, category: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", action, { event_category: category });
    }
  };

  return (
   <MainLayout>
      <div className="min-h-screen  flex flex-col items-center text-gray-800">
        {/* HERO SECTION */}
        <section className="w-full home-gradient text-white py-16 px-6 text-center pt-[100px] sm:pt-[180px] ">
          <div className="flex gap-12 max-w-6xl mx-auto align-baseline flex-col md:flex-row items-center">
            <div className="flex-[1.5] text-center">
                {/* <FileText size={128} className="mx-auto mb-4 text-white" /> */}
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 sm:!leading-[60px]">
                Build your perfect Resume in 5 Mins ✨
              </h1>
              <p className="max-w-2xl mx-auto text-lg opacity-90">

              {/* Get noticed with AI-powered resume upgrades that land interviews. Perfect your tone, structure, and keywords in seconds — plus get <strong className="text-green-400">100 free credits</strong> when you sign up. */}

              Make your resume stand out and get more interviews. Our AI improves your wording, format, and keywords in seconds — <br /> Get <strong className="text-green-400 uppercase">100 free AI credits</strong> when you <span className="uppercase font-bold">sign up</span>.
              </p>
              <div className="mt-8 flex justify-center gap-4">
              <Button
                className="bg-brand-gold text-gray-800 font-semibold rounded-full shadow hover:bg-brand-amber transition-all px-9 py-4 text-lg"
                label="Build My Resume Now"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "ClickGetStartedButton", {
                    event_category: "RELandingPage",
                   });
                  }
                  window.open("https://app.wisowl.com/resume-builder", "_blank")}
                }
                 />
              </div>
              <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-300 text-sm">
      
                {/* 🌈 Soft gradient glow behind items */}
                <div className="absolute inset-0 -z-10 opacity-40 blur-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />

                    {/* Feature 1 */}
                    <div className="flex items-center gap-2">
                        <Zap size={18} className="text-yellow-400" />
                        <span>Quick Onboarding</span>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-green-400" />
                        <span>Powered by AI</span>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center gap-2">
                        <Lock size={18} className="text-cyan-400" />
                        <span>100% privacy protected</span>
                    </div>
                </div>
            </div>
            <img
              src="/resume-hero-final.png"
              alt="Resume Enhancer Hero"
              width={500}
              className="relative z-10"
            />
          </div>
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section className="w-full max-w-6xl mx-auto py-16 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
                Why 5000+ Job Seekers Choose WisOwl
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                {
                    icon: FileText,
                    title: "Professional Templates",
                    desc: "Choose from beautifully crafted ATS-friendly templates.",
                    bg: "bg-blue-50",
                },
                {
                    icon: Wand2,
                    title: "AI Resume Enhancer",
                    desc: "Create resumes quickly using AI and make every line impactful.",
                    bg: "bg-blue-50",
                },
                {
                    icon: Zap,
                    title: "Instant ATS Score",
                    desc: "Become visible to recruiters by creating ATS friendly resumes.",
                    bg: "bg-blue-50",
                },
                ].map((item, idx) => (
                <div
                    key={idx}
                    className={`rounded-2xl p-8 shadow-md hover:shadow-xl transition-all bg-gradient-to-br ${item.bg} border border-white/30`}
                >
                    <item.icon className="h-10 w-10 mx-auto text-indigo-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                </div>
                ))}
            </div>
        </section>

        {/* Our Users */}
        <section className="w-full px-6 pt-12 pb-16 text-center border-t border-b border-dashed border-gray-300">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                    Our Users Now Work At
                </h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Thousands of job seekers used AI-powered resume enhancement to land interviews at top global companies.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">

                    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-center hover:shadow-xl transition-all border border-gray-100">
                        <SiTcs className="text-red-600 w-8 h-8" />
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-center hover:shadow-xl transition-all border border-gray-100">
                        <SiPaypal className="text-blue-600 w-8 h-8" />
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-center hover:shadow-xl transition-all border border-gray-100">
                        <SiFlipkart className="text-yellow-500 w-8 h-8" />
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-center hover:shadow-xl transition-all border border-gray-100">
                        <SiNetflix className="text-red-600 w-8 h-8" />
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-center hover:shadow-xl transition-all border border-gray-100">
                        <SiAccenture className="text-indigo-600 w-8 h-8" />
                    </div>

                </div>
            </div>
        </section>

        {/* AI ENHANCER PREVIEW */}
        <section className="w-full max-w-6xl mx-auto py-16 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                See How AI Enhances Your Resume
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-10">
                Upload your existing resume, and watch AI optimize tone, structure,
                and keyword strength for maximum recruiter attention.
            </p>

            <div className="relative bg-white shadow-xl rounded-2xl overflow-none sm:overflow-hidden max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2">
                {/* Original */}
                <div className="p-6 border-r border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3">Before</h3>
                    <ul className="text-left space-y-2 list-outside list-disc p-4">
                        <li className="text-gray-500 text-sm">Led a team of 5 developers in project execution.</li>
                        <li className="text-gray-500 text-sm">Responsible for social media</li>
                        <li className="text-gray-500 text-sm">Helped increase engagement</li>
                        <li className="text-gray-500 text-sm">Good team player</li>
                    </ul>
                </div>

                {/* Enhanced */}
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100">
                    <h3 className="font-semibold text-gray-800 mb-3">
                    After (AI Enhanced)
                    </h3>
                    <ul className="text-left space-y-2 list-outside list-disc p-4">
                        <li className="text-indigo-700 text-sm font-medium">Spearheaded a cross-functional team of 5 engineers to deliver
                        high-impact projects on time, boosting productivity by 30%.</li>
                        <li className="text-indigo-700 text-sm font-medium">Orchestrated social media strategy across 5 platforms, growing followers by 340%</li>
                        <li className="text-indigo-700 text-sm font-medium">Drove customer engagement metrics up 65% through data-driven content optimization</li>
                        <li className="text-indigo-700 text-sm font-medium">Collaborated with cross-functional teams to deliver projects 20% ahead of deadlines</li>
                    </ul>
                   
                </div>
                </div>

                <div className="absolute -top-2 sm:top-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Sparkles className="h-4 w-4" /> Powered by AI
                </div>
            </div>

            {/* ✅ Added Enhancements List */}
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-sm font-medium">
                <div className="bg-indigo-50 text-indigo-700 py-3 rounded-lg shadow-sm">
                Weak verb → Action verb
                </div>
                <div className="bg-indigo-50 text-indigo-700 py-3 rounded-lg shadow-sm">
                Added measurable impact
                </div>
                <div className="bg-indigo-50 text-indigo-700 py-3 rounded-lg shadow-sm">
                ATS-optimized keywords
                </div>
                <div className="bg-indigo-50 text-indigo-700 py-3 rounded-lg shadow-sm">
                Quantified achievements
                </div>
            </div>
        </section>

        {/* PRICING SECTION */}
        <PackComparison className="pt-12 pb-16 bg-blue-100" heading="Start Free. Upgrade When You're Ready." subheading="Experience the power of AI resume enhancement risk-free" event_category="RELandingPage" />

        {/* TESTIMONIALS */}
        <section className="w-full bg-gray-100 py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Job Seekers Landing Roles at Top Companies</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Anjali Sharma",
                role: "Software Engineer",
                text: "The AI Enhancer helped me reframe my resume to land my dream job. My ATS score jumped from 65 to 92!",
              },
              {
                name: "Rohit Mehta",
                role: "Marketing Manager",
                text: "Beautiful templates and instant keyword suggestions made a huge difference!",
              },
              {
                name: "Priya Verma",
                role: "Data Analyst",
                text: "Resume Builder is sleek and intuitive. Got interview calls within a week!",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <User className="h-20 w-20 text-gray-400 mx-auto mb-3 rounded-full p-6 border" />
                <div className="flex justify-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500" fill="#eab308" />
                    <Star className="h-5 w-5 text-yellow-500" fill="#eab308" />
                    <Star className="h-5 w-5 text-yellow-500" fill="#eab308"  />
                    <Star className="h-5 w-5 text-yellow-500" fill="#eab308" />
                    <Star className="h-5 w-5 text-yellow-500" fill="#eab308" />
                </div>
                <p className="text-gray-600 mb-4 italic">“{t.text}”</p>
                <h4 className="font-semibold text-indigo-700">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-4xl mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is Resume Enhancer?",
                a: "It's an AI-powered tool that analyzes and improves your resume for tone, keywords, and readability.",
              },
              {
                q: "Are templates ATS friendly?",
                a: "Yes! All templates are optimized to pass applicant tracking systems used by top recruiters.",
              },
              {
                q: "Can I try it for free?",
                a: "Yes, you can try basic features for free before upgrading to Premium.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CTA */}
        <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 text-white relative overflow-hidden w-full">
        
        {/* Decorative gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-purple-600/40 blur-2xl opacity-30"></div>

        <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Build Your Perfect Resume?
            </h2>

            <p className="text-white/80 mb-10 mx-auto">
            Join thousands who've already enhanced their resumes and landed their dream jobs.
            </p>

            {/* ✅ Stats with Lucide Icons */}
            <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto mb-10 text-white">
            <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur border border-white/10">
                <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-extrabold mt-3">5000+</h3>
                <p className="text-white/80 text-sm">Resumes Enhanced</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur border border-white/10">
                <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-extrabold mt-3">78%</h3>
                <p className="text-white/80 text-sm">More Interview Callbacks</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur border border-white/10">
                <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-extrabold mt-3">4 Hours</h3>
                <p className="text-white/80 text-sm">Average Time Saved</p>
            </div>
            </div>

            <button className="bg-brand-gold text-gray-800 font-semibold rounded-full shadow hover:bg-brand-amber transition-all px-9 py-4 text-lg" 
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "ClickGetStartedNowButton", {
                event_category: "RELandingPage",
               });
              }
              window.open("https://app.wisowl.com/resume-builder", "_blank")}
              }
              >
            Get Started Now
            </button>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,115,0,0.2),transparent)]"></div>
        </footer>

      </div>
    </MainLayout>
  );
}
