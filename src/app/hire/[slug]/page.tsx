import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import MainLayout from '@/MainLayout';
import {
  parseRecruiterSlug,
  getAllRecruiterSlugs,
  RECRUITER_ROLES,
  RECRUITER_CITIES,
} from '@/lib/recruiter-pseo-data';
import {
  Rocket,
  TrendingUp,
  Crown,
  Handshake,
  AlignJustify,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Plus,
  Check
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllRecruiterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseRecruiterSlug(slug);
  if (!parsed) return {};

  const { role, city } = parsed;
  const locationSuffix = city ? ` in ${city.label}` : ' Across India';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.wisowl.com';

  return {
    title: `Hire ${role.label}${locationSuffix} | WisOwl`,
    description: `Find and hire pre-vetted ${role.label}${locationSuffix} with AI-powered matching. Get 10+ ranked candidates in under 30 seconds. No manual resume sifting. Starting at ₹999/month.`,
    alternates: {
      canonical: `${BASE_URL}/hire/${slug}`,
    },
  };
}

// ─── Sub-components (server) ──────────────────────────────────────────────────

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RecruiterHireDLP({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseRecruiterSlug(slug);
  if (!parsed) notFound();

  const { role, city } = parsed;
  const locationText = city ? `in ${city.label}` : 'Across India';
  const locationSuffix = city ? ` in ${city.label}` : '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.wisowl.com';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.wisowl.com';

  // Related role links (other roles for the same city, up to 6)
  const relatedRoles = RECRUITER_ROLES.filter((r) => r.slug !== role.slug)
    .slice(0, 6)
    .map((r) => ({
      label: r.label,
      href: city ? `/hire/${r.slug}-in-${city.slug}` : `/hire/${r.slug}`,
    }));

  // Related city links (same role, other cities, up to 6)
  const relatedCities = city
    ? RECRUITER_CITIES.filter((c) => c.slug !== city.slug)
        .slice(0, 6)
        .map((c) => ({
          label: c.label,
          href: `/hire/${role.slug}-in-${c.slug}`,
        }))
    : RECRUITER_CITIES.slice(0, 6).map((c) => ({
        label: c.label,
        href: `/hire/${role.slug}-in-${c.slug}`,
      }));

  const faqs = [
    {
      q: `How quickly can I find ${role.label}${locationSuffix}?`,
      a: `WisOwl's AI matching engine delivers 10+ pre-ranked ${role.singular} profiles in under 30 seconds after you post a job. Most recruiters complete their first shortlist within minutes.`,
    },
    {
      q: 'Do I need a credit card to get started?',
      a: 'No. You can sign up and explore the platform for free. A credit card is only required when you choose a paid plan — all plans include a 14-day free trial.',
    },
    {
      q: 'How does the AI matching work?',
      a: `Our semantic matching engine uses embeddings to understand the context and intent behind job descriptions and candidate profiles — not just keywords. This means your ${role.singular} matches are far more relevant than a traditional keyword search.`,
    },
    {
      q: 'Can I upgrade or downgrade my plan anytime?',
      a: 'Yes. Upgrades take effect immediately. Downgrades apply at the end of your billing cycle. No lock-in contracts, no cancellation fees.',
    },
    {
      q: `What makes WisOwl different from other hiring platforms for ${role.label}?`,
      a: `WisOwl is purpose-built for recruiters — not repurposed from a job board. You get AI-ranked candidates, a pipeline CRM, transparent usage meters, and pricing that scales from solo recruiters to enterprises. All in one platform.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const steps = [
    { num: '1', title: 'Sign Up Free', text: 'Create your recruiter account in under 2 minutes. No credit card needed.' },
    { num: '2', title: 'Post a Job', text: `Describe your ${role.singular} requirements. AI suggests job description improvements on the fly.` },
    { num: '3', title: 'Get AI Matches', text: `Receive 10+ ranked ${role.singular} profiles in seconds, scored by skill and experience fit.` },
    { num: '4', title: 'Hire Faster', text: 'Review, shortlist, and run AI-powered screening interviews before your first call.' },
  ];

  const benefits = [
    {
      icon: '🤖',
      title: `AI-Matched ${role.label}`,
      text: `Semantic matching understands your job requirements in context — not just keywords. Every ${role.singular} profile is ranked by fit score before you see it.`,
    },
    {
      icon: '⚡',
      title: 'Shortlist in 30 Seconds',
      text: `Stop spending 72 hours on manual resume screening. WisOwl delivers a ready-to-review shortlist for ${role.label}${locationSuffix} the moment you post.`,
    },
    {
      icon: '📊',
      title: 'Transparent Pricing',
      text: 'No hidden fees, no surprise overage charges. Real-time usage meters keep you in control of your budget at every step.',
    },
  ];

 const plans = [
    {
      name: "Base",
      icon: AlignJustify, // hamburger/menu icon
      iconBg: "bg-gray-100",
      desc: "For independent recruiters and small teams getting started with AI hiring.",
      monthly: "14,999",
      annual: "14,999",
      annualBilled: "₹1,79,988 billed annually · valid 12 months",
      annualTotal: null,
      popular: false,
      dark: false,
      btnStyle: "bg-brand-indigo text-white hover:bg-brand-slate",
      btnText: "Get Started",
      stats: [
        { label: "Job posts", value: "Unlimited" },
        { label: "Candidate search", value: "Unlimited" },
        { label: "Contact views", value: "400 / month", fullWidth: true },
      ],
      features: [
        { has: true, text: "Unlimited job posts" },
        { has: true, text: "Unlimited candidate search" },
        { has: true, text: "AI sourcing — auto-match candidates per JD" },
        { has: true, text: "Full ATS / CRM — pipeline & tracking" },
        { has: true, text: "Email + WhatsApp — 1 messaging account" },
        { has: true, text: "Analytics dashboard" },
        { has: true, text: "Email support · 7-day free trial" },
      ],
      addon: "Add-on: AI first-round interview + scorecard",
    },
    {
      name: "Pro",
      icon: Users, // group/team icon
      iconBg: "bg-brand-indigo",
      desc: "For growing recruitment teams who need more reach and higher volume hiring.",
      monthly: "49,999",
      annual: "49,999",
      annualBilled: "₹5,99,988 billed annually · valid 12 months",
      annualTotal: null,
      popular: true,
      dark: true,
      btnStyle: "text-brand-midnight bg-brand-gold hover:border-transparent border border-brand-gold py-2 px-5 rounded-lg font-semibold",
      btnText: "Get Started",
      stats: [
        { label: "Job posts", value: "Unlimited" },
        { label: "Candidate search", value: "Unlimited" },
        { label: "Contact views", value: "1,600 / month", fullWidth: true },
      ],
      features: [
        { has: true, text: "Everything in Base" },
        { has: true, text: "3 messaging accounts — Email + WA + LinkedIn" },
        { has: true, text: "Multi-channel outreach sequences" },
        { has: true, text: "Advanced analytics — team & pipeline reports" },
        { has: true, text: "Up to 5 user seats" },
        { has: true, text: "Priority support + dedicated onboarding" },
      ],
      addon: "Add-on: AI first-round interview + scorecard",
    },
    {
      name: "Enterprise",
      icon: ShoppingBag, // lock/briefcase icon
      iconBg: "bg-gray-100",
      desc: "For large staffing firms and enterprises with high-volume or multi-location hiring needs.",
      monthly: null,
      annual: null,
      annualBilled: "Annual contract · volume pricing · negotiated SLA",
      annualTotal: null,
      popular: false,
      dark: false,
      btnStyle: "bg-brand-indigo text-white hover:bg-brand-slate",
      btnText: "Contact Sales",
      stats: [
        { label: "Job posts", value: "Unlimited" },
        { label: "Candidate search", value: "Unlimited" },
        { label: "Contact views", value: "Negotiated", fullWidth: true },
      ],
      features: [
        { has: true, text: "Everything in Pro" },
        { has: true, text: "Unlimited user seats" },
        { has: true, text: "ATS / HRMS integration" },
        { has: true, text: "White-label option" },
        { has: true, text: "API access" },
        { has: true, text: "Dedicated success team + custom SLA" },
        { has: true, text: "AI first-round interview included" },
      ],
      addon: null,
    },
  ];

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══ HERO ═══ */}
      <section className="pt-26 sm:pt-36 pb-20 relative overflow-hidden home-gradient">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(26,13,171,0.03) 0%, transparent 40%, rgba(255,184,0,0.03) 100%)' }}
        />
        <div className="max-w-6xl mx-auto px-6 relative mt-0 sm:mt-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
                AI-Powered Hiring — Now Live
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-none mb-5 tracking-tight text-white">
                Hire Top<br />
                <em className="text-green-500 font-medium italic">{role.label}</em>
                <br />
                <span className="text-4xl md:text-5xl">{locationText}</span>
              </h1>
              <p className="text-lg text-gray-100 leading-relaxed mb-9 max-w-lg">
                Post a job and get AI-matched {role.singular} profiles in under 30 seconds.
                No manual resume sifting. No hidden fees. Built for recruiters across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={`${appUrl}/recruiter/signup`}
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-midnight px-8 py-4 rounded-xl text-base font-bold no-underline transition-all hover:bg-brand-amber hover:-translate-y-0.5"
                  style={{ boxShadow: '0 4px 20px rgba(255,222,89,0.30)' }}
                >
                  Post a Job <Arrow />
                </a>
                <a
                  href="https://calendar.app.google/kqHPJE7mcKG9PB9g8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-indigo px-8 py-4 rounded-xl text-base font-semibold border-2 border-transparent no-underline transition-all hover:bg-brand-indigo/5 hover:-translate-y-0.5"
                >
                  Book a Demo
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                <span>✓ 14-day free trial</span>
                <span>✓ No credit card required</span>
                <span>✓ Setup in 5 minutes</span>
              </div>
            </div>

            {/* Stats card */}
            <div
              className="hidden md:block bg-white rounded-2xl border border-gray-200 p-6"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                animation: 'float 6s ease-in-out infinite',
              }}
            >
              <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-5">
                <h4 className="text-sm font-semibold text-brand-indigo">AI Matching — Live Preview</h4>
                <span className="bg-green-100 text-green-600 px-2.5 py-0.5 rounded-full text-xs font-semibold">● Live</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { n: '<30s', l: 'Match Time' },
                  { n: '94%', l: 'Accuracy' },
                  { n: '10+', l: 'Profiles/Post' },
                ].map((s) => (
                  <div key={s.l} className="bg-gray-50 rounded-xl p-3.5 text-center">
                    <div className="text-xl font-bold text-brand-indigo">{s.n}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-4 font-medium">
                Top matches for: <span className="text-brand-indigo">{role.singular}{locationSuffix}</span>
              </p>
              <div className="space-y-2.5">
                {[
                  { i: 'RK', n: 'Rahul Kumar', r: `Sr. ${role.singular} • 6 yrs`, s: '97%', c: 'bg-blue-500' },
                  { i: 'PM', n: 'Priya Menon', r: `${role.singular} • 4 yrs`, s: '93%', c: 'bg-violet-500' },
                  { i: 'AS', n: 'Aditya Sharma', r: `${role.singular} • 5 yrs`, s: '89%', c: 'bg-pink-500' },
                ].map((c) => (
                  <div key={c.i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                    <div className={`w-8 h-8 ${c.c} rounded-lg flex items-center justify-center text-xs font-bold text-white`}>{c.i}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{c.n}</div>
                      <div className="text-xs text-gray-400">{c.r}</div>
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2.5 py-0.5 rounded-full">{c.s} match</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">
            <span>✳</span> Why WisOwl
          </div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            The Smarter Way to Hire {role.label}{locationSuffix}
          </h2>
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed mb-12">
            Stop guessing. AI-powered matching delivers the right {role.singular} profiles — fast.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all h-full"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-xl mb-5">{b.icon}</div>
                <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 justify-center">
            <span>✳</span> How It Works
          </div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Live in Under 5 Minutes</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-12">
            From signup to your first AI-matched {role.singular} — faster than making a cup of chai.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center group relative">
                {i < 3 && (
                  <span className="hidden md:block absolute -right-5 top-7 text-xl text-gray-300">→</span>
                )}
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center text-xl font-bold text-brand-indigo group-hover:bg-brand-gold group-hover:text-brand-midnight group-hover:border-brand-gold group-hover:scale-110 transition-all">
                  {s.num}
                </div>
                <h4 className="text-sm font-bold mb-1">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECRUITER HELPLINE ═══ */}
      <section className="py-0 bg-white border-t border-gray-100">
        <div className="bg-gradient-to-r from-brand-midnight to-brand-indigo">
          <div className="max-w-6xl text-white p-8 md:p-12 relative overflow-hidden mx-auto">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  ✳ Recruiter Helpline
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Need Help Hiring {role.label}?
                </h2>
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  Speak directly with our onboarding team for quick account setup, plan guidance,
                  {role.singular} candidate search strategy, or any hiring-related queries.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-lg font-semibold">
                    <span className="text-2xl">📞</span>
                    <a href="tel:+917982085915" className="text-white no-underline hover:text-brand-gold">
                      +91 7982085915
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <span>🕒</span> Monday - Saturday | 9:00 AM - 7:00 PM IST
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <span>⚡</span> Fast onboarding • Hiring support • Plan consultation
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-bold mb-3">Quick Assistance</h3>
                <p className="text-sm text-white/75 mb-5">
                  Our team helps you find {role.label}{locationSuffix} faster with AI-powered candidate matching.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+917982085915"
                    className="inline-flex justify-center items-center gap-2 bg-brand-gold text-brand-midnight px-6 py-3 rounded-xl font-bold no-underline hover:bg-brand-amber transition-all"
                  >
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/917982085915"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center items-center gap-2 bg-white text-brand-indigo px-6 py-3 rounded-xl font-semibold no-underline hover:bg-brand-indigo/5 transition-all"
                  >
                    WhatsApp Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 justify-center">
              <span>✳</span> Pricing
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              No hidden fees. Upgrade or downgrade anytime. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 shadow-xl">
            {plans.map((plan, i) => {
                const Icon = plan.icon;
                return (
                  <div key={i}>
                    <div
                      className={`p-8 relative h-full flex flex-col transition-all
            ${
              plan.dark
                ? "bg-brand-indigo text-white"
                : "bg-white text-gray-900 border-x border-gray-100"
            }
            ${i === 0 ? "rounded-l-2xl" : ""}
            ${i === plans.length - 1 ? "rounded-r-2xl" : ""}
          `}
                    >
                      {/* Most Popular Badge */}
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-midnight px-4 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap shadow-md">
                          Most Popular
                        </span>
                      )}
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 ${plan.dark ? "bg-brand-violet" : plan.iconBg} rounded-xl flex items-center justify-center mb-5`}
                      >
                        <Icon
                          size={22}
                          className={
                            plan.dark ? "text-amber-400" : "text-gray-600"
                          }
                        />
                      </div>

                      {/* Name & Desc */}
                      <div
                        className={`text-2xl font-extrabold mb-2 ${plan.dark ? "text-white" : "text-brand-indigo"}`}
                      >
                        {plan.name}
                      </div>
                      <p
                        className={`text-sm mb-6 leading-snug ${plan.dark ? "text-white/70" : "text-gray-500"}`}
                      >
                        {plan.desc}
                      </p>

                      {/* Price */}
                      {plan.monthly ? (
                        <>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span
                              className={`text-4xl font-black leading-none ${plan.dark ? "text-white" : "text-brand-midnight"}`}
                            >
                              ₹ {plan.monthly}
                              {/* {isAnnual && plan.annual !== plan.monthly
                                ? plan.annual
                                : plan.monthly} */}
                            </span>
                            <span
                              className={`text-sm ml-1 ${plan.dark ? "text-white/50" : "text-gray-400"}`}
                            >
                              /month
                            </span>
                          </div>
                          <p
                            className={`text-xs mb-6 ${plan.dark ? "text-white/50" : "text-gray-400"}`}
                          >
                            {plan.annualBilled}
                          </p>
                        </>
                      ) : (
                        <>
                          <div
                            className={`text-4xl font-black mb-1 leading-none ${plan.dark ? "text-white" : "text-brand-midnight"}`}
                          >
                            Custom
                          </div>
                          <p
                            className={`text-xs mb-6 ${plan.dark ? "text-white/50" : "text-gray-400"}`}
                          >
                            {plan.annualBilled}
                          </p>
                        </>
                      )}

                      {/* Stats Box */}
                      <div
                        className={`rounded-xl p-4 mb-6 grid grid-cols-2 gap-x-4 gap-y-3
            ${plan.dark ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}
                      >
                        {plan.stats.map((s, si) => (
                          <div
                            key={si}
                            className={s.fullWidth ? "col-span-2" : ""}
                          >
                            <div
                              className={`text-xs mb-0.5 ${plan.dark ? "text-white/50" : "text-gray-400"}`}
                            >
                              {s.label}
                            </div>
                            <div
                              className={`font-extrabold text-sm ${plan.dark ? "text-brand-gold" : "text-brand-indigo"}`}
                            >
                              {s.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <a
                        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 mb-6 text-center ${plan.btnStyle}`}
                        href='https://calendar.app.google/kqHPJE7mcKG9PB9g8'
                        target='_blank'
                      >
                        {plan.btnText}
                      </a>

                      {/* Features */}
                      <div
                        className={`border-t pt-5 flex-1 ${plan.dark ? "border-white/20" : "border-gray-100"}`}
                      >
                        <ul className="space-y-0">
                          {plan.features.map((f, fi) => (
                            <li
                              key={fi}
                              className={`flex items-start gap-2.5 py-1.5 text-sm ${plan.dark ? "text-white/90" : "text-gray-600"}`}
                            >
                              <Check width={12} />
                              <span>{f.text}</span>
                            </li>
                          ))}
                          {plan.addon && (
                            <li
                              className={`flex items-start gap-2.5 py-1.5 text-sm ${plan.dark ? "text-brand-gold" : "text-brand-amber"}`}
                            >
                              <Plus className="mt-0.5 shrink-0" size={15} />
                              <span>{plan.addon}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <p className="text-center text-sm text-gray-400 mt-8">
            Need more? See{' '}
            <a href="/recruiter-lp#pricing" className="text-brand-indigo underline">
              all plans including Premium &amp; Custom
            </a>.
          </p> */}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 justify-center">
              <span>✳</span> FAQ
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-gray-300 transition-all"
              >
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-sm list-none hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="text-xl text-brand-gold ml-4 flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTERNAL LINKS ═══ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Related roles */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Also Hiring{locationSuffix || ' Across India'}
              </h3>
              <ul className="space-y-2">
                {relatedRoles.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} className="text-sm text-brand-indigo hover:underline">
                      Hire {r.label}{locationSuffix}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Related cities */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Hire {role.label} in Other Cities
              </h3>
              <ul className="space-y-2">
                {relatedCities.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="text-sm text-brand-indigo hover:underline">
                      Hire {role.label} in {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fefcf5 0%, #f9fafb 100%)' }}
      >
        <span className="absolute top-10 left-16 text-5xl text-brand-gold opacity-10">✳</span>
        <span className="absolute bottom-10 right-16 text-3xl text-brand-gold opacity-10">✳</span>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Hire {role.label}{locationSuffix}?
          </h2>
          <p className="text-lg text-gray-500 mb-9 leading-relaxed">
            Start for free today — no credit card required. Post your first job and let AI find
            the right {role.label} for you in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <a
              href={`${appUrl}/recruiter/signup`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-midnight px-8 py-4 rounded-xl text-base font-bold no-underline hover:bg-brand-amber hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 4px 20px rgba(255,222,89,0.30)' }}
            >
              Post a Job <Arrow />
            </a>
            <a
              href="https://calendar.app.google/kqHPJE7mcKG9PB9g8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-indigo px-8 py-4 rounded-xl text-base font-semibold border-2 border-brand-indigo no-underline hover:bg-brand-indigo/5 transition-all"
            >
              Book a Demo
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 flex-wrap">
            <span>🔒 256-bit encryption</span>
            <span>⚡ Setup in 5 min</span>
            <span>💳 No credit card required</span>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
