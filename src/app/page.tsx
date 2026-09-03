"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import TopCompaniesSection from "@/components/homepage/TopCompaniesSection";
import FindJobsFaster from "@/components/homepage/FindJobsFaster";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import MakeLifeEasy from "@/components/homepage/MakeLifeEasy";
import MainLayout from "@/MainLayout";

import { Sparkles, BriefcaseBusiness, ArrowUpRight } from "lucide-react";

function RoleSelector() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden home-gradient">
      <div
        className="pointer-events-none absolute -top-32 -right-2 h-[1000px] w-[1000px] rounded-full opacity-30 z-10"
        style={{
          background: "radial-gradient(circle, #ffde59 0%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 -left-24 h-[1000px] w-[1000px] rounded-full opacity-20 z-10"
        style={{
          background: "radial-gradient(circle, #ffde59 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-4 py-12 w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/wisowl-withtext-white.svg"
            alt="WisOwl"
            width={180}
            height={52}
            priority
          />
        </div>

        {/* Headline */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-gold mb-5">
            <span className="w-8 h-px bg-brand-gold block" />
            Welcome
            <span className="w-8 h-px bg-brand-gold block" />
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Who are you here as?
          </h1>
          <p className="text-white/90 text-lg max-w-md mx-auto">
            Choose your path and we'll tailor the experience just for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-12">
          {/* Job Seeker Card */}
          <button
            onClick={() => router.push("/?v=c")}
            className="group relative overflow-hidden rounded-3xl p-[1px] text-left transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]"
          >
            {/* Gradient Border */}
            {/* <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(254,211,96,.8), rgba(254,211,96,.08), transparent)",
              }}
            /> */}

            <div
              className="relative h-full rounded-[23px] p-6 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 transition-all duration-500 group-hover:opacity-50"
                style={{ background: "#FED360" }}
              />

              {/* Watermark */}
              <Sparkles
                className="absolute bottom-2 right-2 w-24 h-24 opacity-[0.04]"
                strokeWidth={1}
              />

              {/* Badge */}
              <span
                className="inline-flex px-3 py-1 rounded-full text-[11px] font-medium mb-5"
                style={{
                  background: "rgba(254,211,96,.12)",
                  color: "#FED360",
                  border: "1px solid rgba(254,211,96,.15)",
                }}
              >
                AI Career Assistant
              </span>

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(254,211,96,.12)",
                    border: "1px solid rgba(254,211,96,.2)",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-[#FED360]" />
                </div>

                <h2 className="text-2xl font-bold text-white">Job Seeker</h2>
              </div>

              {/* Description */}
              <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-sm">
                Discover jobs faster with AI-powered matching, personalized
                recommendations, and career guidance.
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-[#FED360] transition-all duration-300 group-hover:gap-3">
                Explore Jobs
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Recruiter Card */}
          <button
            onClick={() => router.push("/recruiter-lp")}
            className="group relative overflow-hidden rounded-3xl p-[1px] text-left transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]"
          >
            {/* Gradient Border */}
            {/* <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,.8), rgba(255, 255, 255, 0.08), transparent)",
              }}
            /> */}

            <div
              className="relative h-full rounded-[23px] p-6 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 transition-all duration-500 group-hover:opacity-50"
                style={{ background: "#8B5CF6" }}
              />

              {/* Watermark */}
              <BriefcaseBusiness
                className="absolute bottom-2 right-2 w-24 h-24 opacity-[0.04]"
                strokeWidth={1}
              />

              {/* Badge */}
              <span
                className="inline-flex px-3 py-1 rounded-full text-[11px] font-medium mb-5"
                style={{
                  background: "rgba(139,92,246,.12)",
                  color: "#A78BFA",
                  border: "1px solid rgba(139,92,246,.15)",
                }}
              >
                AI Recruiting Platform
              </span>

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(139,92,246,.12)",
                    border: "1px solid rgba(139,92,246,.2)",
                  }}
                >
                  <BriefcaseBusiness className="w-6 h-6 text-[#A78BFA]" />
                </div>

                <h2 className="text-2xl font-bold text-white">Recruiter</h2>
              </div>

              {/* Description */}
              <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-sm">
                Source, engage, and hire top talent faster with AI-powered
                candidate matching and outreach.
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-[#A78BFA] transition-all duration-300 group-hover:gap-3">
                Start Hiring
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>
        {/* Footer note */}
        <p className="text-white/30 text-xs mt-10">
          © {new Date().getFullYear()} WisOwl · AI-powered recruitment platform
        </p>
      </div>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const isCandidate = searchParams.get("v") === "c";

  if (isCandidate) {
    return (
      <MainLayout>
        <TopCompaniesSection />
        <FindJobsFaster />
        <TestimonialsSection />
        <MakeLifeEasy />
      </MainLayout>
    );
  }

  return <RoleSelector />;
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
