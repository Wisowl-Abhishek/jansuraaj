"use client";
import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, ArrowRight,  Target,
  Zap,
  Brain,
  TrendingUp,
  Globe,
  Search,
  MessageSquare,
  Mic, } from "lucide-react";
import MainLayout from "@/MainLayout";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface SecLabelProps {
  children: React.ReactNode;
  center?: boolean;
}

/* ── FADE-UP ANIMATION WRAPPER ── */
const FadeUp = ({ children, className = "", delay = 0 }: FadeUpProps) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


/* ── SECTION LABEL (matches HTML .sec-label style) ── */
const SecLabel = ({ children, center = false }: SecLabelProps) => (
  <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-black mb-4 ${center ? "justify-center" : ""}`}>
    <span className="w-5 h-px bg-brand-gold block" />
    {children}
    <span className="w-5 h-px bg-brand-gold block" />
  </div>
);

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
const Recruiter = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [cookieDismissed, setCookieDismissed] = useState(false);

  const openDemo = () => window.open("https://calendar.app.google/kqHPJE7mcKG9PB9g8", "_blank");

  /* ─── DATA — exact from HTML ─── */

  const stats = [
    { val: "10k+", label: "Roles filled" },
    { val: "20+",  label: "Countries served" },
    { val: "3×",   label: "Faster placements" },
    { val: "4.8★", label: "Recruiter satisfaction" },
    { val: "50+",  label: "ATS integrations" },
  ];

  const sourceBullets = [
    "Our AI searches on your behalf the moment a role is created",
    "We understand what you need — not just the keywords in the JD",
    "We rank and deliver, so you only review the people worth your time",
    "AI-driven — works across every sector, region, and seniority level",
  ];

  const sourceTiles = [
    { n: "42M+", l: "Tech" },
    { n: "18M+", l: "Finance" },
    { n: "14M+", l: "Healthcare" },
    { n: "9M+",  l: "Ops & Logistics" },
    { n: "8M+",  l: "Sales & GTM" },
    { n: "9M+",  l: "Other" },
  ];

  const agents = [
    {
      emoji: "🔍",
      status: "live",
      title: "Sourcing — AI finds them before anyone else does",
      desc: "The moment you post a role, our AI searches 100M+ global profiles across public and proprietary sources — finding people who fit the role in depth, not just on paper.",
      outcome: "You get a ranked list of the most relevant talent in the market — ready to review.",
      accentBg: "bg-yellow-50",
      accentBorder: "border-yellow-200",
      accentText: "text-yellow-800",
      iconBg: "bg-yellow-50 border border-yellow-200",
      hoverBorder: "hover:border-yellow-300 hover:shadow-yellow-50",
    },
    {
      emoji: "🎯",
      status: "live",
      title: "Matching — AI tells you exactly who's worth your time",
      desc: "Every candidate is evaluated against your role requirements and labelled High, Medium, or Low match — so you stop reviewing blind and start reviewing with intention.",
      outcome: "You open your dashboard to a sorted, prioritised shortlist — no guesswork, no wasted reviews.",
      accentBg: "bg-orange-50",
      accentBorder: "border-orange-200",
      accentText: "text-orange-800",
      iconBg: "bg-orange-50 border border-orange-200",
      hoverBorder: "hover:border-orange-300 hover:shadow-orange-50",
    },
    {
      emoji: "💬",
      status: "live",
      title: "Outreach — AI reaches out, follows up, and books the call",
      desc: "Our AI contacts top matches via Email and WhatsApp with personalised messages, handles every reply, and keeps candidates warm until they're ready to speak — with zero manual input.",
      outcome: "You get booked conversations with pre-warmed candidates — no chasing, no no-shows.",
      accentBg: "bg-blue-50",
      accentBorder: "border-blue-200",
      accentText: "text-blue-800",
      iconBg: "bg-blue-50 border border-blue-200",
      hoverBorder: "hover:border-blue-300 hover:shadow-blue-50",
    },
    {
      emoji: "🎙️",
      status: "soon",
      title: "Screening — AI runs first-round conversations for you",
      desc: "Our AI will conduct structured voice and chat screenings, evaluate competencies in real time, and deliver a full scorecard — so your first human conversation is never a cold one.",
      outcome: "You'll receive a scored, pre-screened shortlist — ready to take straight to final round.",
      accentBg: "bg-purple-50",
      accentBorder: "border-purple-200",
      accentText: "text-purple-800",
      iconBg: "bg-purple-50 border border-purple-200",
      hoverBorder: "hover:border-purple-300 hover:shadow-purple-50",
    },
  ];

  const flowChips = [
    { label: "AI sources",  color: "bg-yellow-100 text-yellow-800 border border-yellow-200" },
    { label: "AI scores",   color: "bg-orange-100 text-orange-700 border border-orange-200" },
    { label: "AI engages",  color: "bg-blue-100 text-blue-600 border border-blue-200" },
    { label: "AI screens",  color: "bg-purple-100 text-purple-700 border border-purple-200", soon: true },
    { label: "You place",   color: "bg-brand-indigo text-white" },
  ];

  const workflowSteps = [
    {
      num: "1",
      tag: "You", tagColor: "bg-red-100 text-red-700",
      title: "Tell us what you need",
      desc: "Post a role or drop in a brief. That's your entire job at this stage. Jan Suraaj takes it from here.",
      mini: null,
    },
    {
      num: "2",
      tag: "AI sources", tagColor: "bg-yellow-100 text-yellow-800",
      title: "Our AI searches 100M+ profiles — immediately",
      desc: "Our AI scans global talent across public sources and our own network, finding people who match your role in depth — not just on the surface.",
      mini: (
        <div className="mt-4 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
          <span className="text-xs font-semibold text-gray-600">Senior Data Engineer · Global</span>
          <span className="text-xs font-extrabold bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full">312 found</span>
        </div>
      ),
    },
    {
      num: "3",
      tag: "AI scores", tagColor: "bg-orange-100 text-orange-700",
      title: "Our AI tells you exactly who's worth your attention",
      desc: "Every candidate is evaluated and labelled. You open your dashboard and the work is already sorted — High, Medium, or Low match. No guesswork, no wasted reviews.",
      mini: (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
            <span className="text-xs text-gray-600">Jamie Lee · Data Engineer · Singapore</span>
            <span className="text-xs font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">HIGH MATCH</span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
            <span className="text-xs text-gray-600">Marcus Reid · Data Eng · London</span>
            <span className="text-xs font-extrabold bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full">MED MATCH</span>
          </div>
        </div>
      ),
    },
    {
      num: "4",
      tag: "AI engages", tagColor: "bg-blue-100 text-blue-600",
      title: "Our AI reaches out, follows up, and books the call",
      desc: "Our AI contacts your top candidates with personalised messages, handles every reply, and keep them warm until they're ready to speak — across Email and WhatsApp.",
      mini: null,
    },
    {
      num: "5",
      tag: "You", tagColor: "bg-red-100 text-red-700",
      title: "You meet the shortlist. You make the placement.",
      desc: "Every candidate handed to you is already sourced, scored, and warmed up. Your first conversation is never a cold one.",
      mini: null,
    },
  ];

  const matchCandidates = [
    { av: "JL", avBg: "bg-yellow-100 text-yellow-700", name: "Jamie Lee",      role: "6 yrs · Product · Singapore",   badge: "High Match", badgeCls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { av: "MR", avBg: "bg-blue-100 text-blue-600",     name: "Marcus Reid",    role: "5 yrs · Fintech · London",       badge: "High Match", badgeCls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { av: "SA", avBg: "bg-orange-100 text-orange-700", name: "Sofia Alvarez",  role: "4 yrs · E-commerce · Toronto",   badge: "Med Match",  badgeCls: "bg-yellow-100 text-yellow-700 border-yellow-200"    },
    { av: "TN", avBg: "bg-pink-100 text-pink-600",     name: "Tomás Navarro",  role: "2 yrs · B2C · Dubai",            badge: "Low Match",  badgeCls: "bg-red-100 text-red-600 border-red-200"             },
  ];

  const bentoCards = [
    { icon: "🎯", title: "AI-powered sourcing, done for you",             desc: "No Boolean searches. No portal hunting. Tell us the role — our AI searches 100M+ profiles and bring you the people worth talking to.",                                                                     span: "md:col-span-4", bigNum: null },
    { icon: "⚡", title: "Shortlists in hours, not weeks",                 desc: "What takes a recruiter days of manual work, Jan Suraaj delivers the same morning. Pre-matched, pre-warmed, ready to meet.",                                                                                     span: "md:col-span-4", bigNum: null },
    { icon: "🔄", title: "AI that gets smarter with every placement",      desc: "Every hire you make teaches our AI more about what good looks like for your roles. The service improves the more you use it.",                                                                               span: "md:col-span-4", bigNum: null },
    { icon: null, title: "Faster placements, consistently",                 desc: "Teams running Jan Suraaj fill roles three times faster — because they spend their time on conversations that matter, not work that should've been automated.",                                                   span: "md:col-span-6", bigNum: "3×"  },
    { icon: "🌍", title: "AI outreach across every market you serve",       desc: "Multi-language, timezone-aware — our AI engages candidates across every region — without you managing a thing.",                                                                                             span: "md:col-span-6", bigNum: null },
  ];

  const testimonials = [
    {
      quote: '"I briefed Jan Suraaj on a difficult niche role Monday morning. By Tuesday afternoon I had a shortlist of six warm candidates, two of whom we placed. That used to take us three weeks."',
      initials: "SC", name: "Sophie C.", role: "Head of Talent Acquisition · Berlin, Germany",
    },
    {
      quote: '"We stopped doing outreach manually entirely. Jan Suraaj handles the full conversation — sourcing, messaging, follow-ups — and our team steps in only when a candidate is warm and ready."',
      initials: "JB", name: "James B.", role: "Founder, Executive Search Firm · New York, USA",
    },
    {
      quote: '"The match scoring is the thing I didn\'t know I needed. My team no longer wastes the first 15 minutes of a call figuring out if someone is even relevant. That work is done before we pick up the phone."',
      initials: "LT", name: "Lena T.", role: "VP People & Talent · Amsterdam, Netherlands",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white text-gray-900 relative">
        
        {/* ══════════════════════════════
            HERO — home-gradient
        ══════════════════════════════ */}
        <section
          className="relative pt-15 sm:pt-12 pb-24 overflow-hidden home-gradient">
            <div
                className="pointer-events-none absolute -top-32 -right-2 h-[1000px] w-[1000px] rounded-full opacity-30 z-10"
                style={{
                background:
                    "radial-gradient(circle, #fdd34e 0%, transparent 70%)",
                }}
            />

            <div
                className="pointer-events-none absolute bottom-0 -left-24 h-[1000px] w-[1000px] rounded-full opacity-20 z-10"
                style={{
                background:
                    "radial-gradient(circle, #fdd34e 0%, transparent 70%)",
                }}
            />
          <div className="absolute right-0 bottom-0 hidden lg:flex">
            <img
              src="/hero_recruiter_lp.png"
              alt="Resume Enhancer Hero"
              width={1000}
              className="relative z-10"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 z-10 pt-2 md:pt-10">
            {/* logo */}
            <img
              src="/jansuraajlogo.png"
              alt="Jan Suraaj Logo"
              className="h-30 rounded-full mb-6"
            />

            {/* tag */}
            <div className="inline-flex items-center gap-2 border border-white/25 text-white/90 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
              Agentic Recruitment Platform
            </div>

            {/* headline */}
            <h1 className="font-extrabold leading-none tracking-tight mb-6 text-white text-6xl md:text-7xl">
              <span className="block text-white">Post a role.</span>
              <span className="block text-brand-gold drop-shadow-sm">Wake up to a shortlist.</span>
            </h1>

            {/* sub */}
            <p className="text-base text-white/80 leading-relaxed mb-8 max-w-[520px]">
              Describe the role. Our AI handles everything else — sourcing, scoring, outreach, and first-round screening — and hands you a shortlist of warm, pre-qualified candidates ready to interview.
            </p>

            {/* agent pills */}
            <div className="flex flex-wrap items-center gap-3 mb-9">
              {[
                { label: "AI Sources",  dot: "#fdd34e", border: "rgba(253,211,78,.35)",  bg: "rgba(253,211,78,.12)",  text: "#fdf2d3" },
                { label: "AI Matches",  dot: "#fdd34e", border: "rgba(253,211,78,.35)",  bg: "rgba(253,211,78,.12)",  text: "#fdf2d3" },
                { label: "AI Engages",  dot: "#7eb8ff", border: "rgba(126,184,255,.35)", bg: "rgba(126,184,255,.12)", text: "#c5deff" },
                { label: "AI Screens",  dot: "#c4b5fd", border: "rgba(196,181,253,.3)",  bg: "rgba(196,181,253,.10)", text: "#ddd6fe", soon: true },
              ].map((p, i) => (
                <span key={i}
                  className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-full"
                  style={{ color: p.text, border: `1px solid ${p.border}`, background: p.bg, backdropFilter: "blur(6px)" }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: p.dot, boxShadow: `0 0 8px ${p.dot}`, animation: "pulse 2s ease-in-out infinite" }} />
                  {p.label}
                  {p.soon && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)" }}>
                      Soon
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <button
                onClick={openDemo}
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-midnight px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:bg-brand-amber hover:-translate-y-0.5"
                style={{ boxShadow: "0 8px 32px rgba(253,211,78,.40)" }}
              >
                Book a Demo <ArrowRight size={15} />
              </button>
              <a href="#workflow"
                className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold no-underline border-b border-white/40 hover:text-white hover:border-white transition-all pb-0.5">
                See How It Works
              </a>
            </div>

            <p className="text-xs text-white/40 tracking-wide">No commitment required · Trusted by teams in 20+ countries</p>
          </div>
          
        </section>

        {/* ══════════════════════════════
            STATS BAR — commented out
        ══════════════════════════════ */}
        {false && (
        <section className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
              Trusted by recruitment teams across India &amp; beyond
            </p>
            <div className="flex flex-wrap items-center justify-between gap-y-8 gap-x-4">
              {stats.map((s, i) => (
                <FadeUp key={i} delay={i * 70} className="flex-1 min-w-[100px] text-center">
                  <div className="text-3xl font-extrabold mb-1"
                    style={{ background: "linear-gradient(135deg, #ffffff, #fdd34e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {s.val}
                  </div>
                  <div className="text-xs text-gray-100 uppercase tracking-wider font-medium">{s.label}</div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* ══════════════════════════════
            SOURCING SECTION
        ══════════════════════════════ */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* left */}
              <FadeUp>
                <div className="inline-flex items-center gap-2 bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  AI-Powered Sourcing
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 mb-4">
                  Our AI finds candidates{" "}
                  <span className="text-brand-indigo">your team would never reach.</span>
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Most recruiters spend 60% of their time just looking. We eliminate that entirely. Jan Suraaj's AI searches across 100M+ verified global profiles on your behalf — passive talent, hard-to-reach specialists, and candidates already being chased by your competition.
                </p>
                <ul className="space-y-3 mb-8">
                  {sourceBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-brand-indigo/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-brand-indigo" strokeWidth={3} />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openDemo}
                  className="inline-flex items-center gap-2 bg-brand-indigo text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-slate transition-all hover:-translate-y-0.5 shadow-lg shadow-brand-indigo/20"
                >
                  Book a Demo <ArrowRight size={14} />
                </button>
              </FadeUp>

              {/* right — profile globe panel */}
              <FadeUp delay={120}>
                <div className="rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-900/8 p-6">
                  {/* header */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Our Reach — By Industry</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Always On
                    </span>
                  </div>
                  {/* tiles grid */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {sourceTiles.map((t, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                        <div className="font-extrabold text-base text-brand-indigo mb-0.5">{t.n}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.l}</div>
                      </div>
                    ))}
                  </div>
                  {/* total */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
                    <div>
                      <div className="text-xs text-gray-500 font-semibold mb-1">Profiles we search on your behalf</div>
                      <div className="text-2xl font-extrabold text-brand-indigo">100 Million+</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-brand-indigo flex items-center justify-center shadow-lg shadow-brand-indigo/25">
                      <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
                        <path d="M6 18 Q18 6 30 18 Q18 30 6 18Z" stroke="rgba(253,211,78,.8)" strokeWidth="1.2" fill="none" />
                        <circle cx="18" cy="18" r="3" fill="rgba(253,211,78,.9)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* ══════════════════════════════
            AGENTS
        ══════════════════════════════ */}
        <section id="agents" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="text-center mb-12">
                <SecLabel center>Your AI Recruitment Team</SecLabel>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
                  While you sleep, travel, or take a break —<br />
                  <span className="text-brand-indigo">our AI is already working your roles.</span>
                </h2>
                <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                  Post a role and walk away. Our AI agents handle every step of the recruitment pipeline on your behalf — around the clock, without a single manual prompt.
                </p>
              </div>
            </FadeUp>

            {/* 2×2 agent grid */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {agents.map((a, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div className={`group bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${a.hoverBorder} h-full flex flex-col`}>
                    {/* top row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${a.iconBg}`}>
                        {a.emoji}
                      </div>
                      {a.status === "live" ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Running now
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-purple-600 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-base text-gray-900 mb-2 leading-snug tracking-tight">{a.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{a.desc}</p>
                    {/* outcome strip */}
                    <div className={`flex items-start gap-2.5 p-3.5 rounded-xl text-xs font-semibold leading-relaxed ${a.accentBg} border ${a.accentBorder} ${a.accentText}`}>
                      <span className="flex-shrink-0 mt-0.5">✦</span>
                      {a.outcome}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* flow bar */}
            <FadeUp delay={200}>
              <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                {flowChips.map((chip, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-gray-300 font-bold text-sm">→</span>}
                    <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 ${chip.color}`}>
                      {chip.label}
                      {chip.soon && (
                        <span className="text-[9px] font-bold uppercase opacity-60 bg-white/20 px-1 rounded">Soon</span>
                      )}
                    </span>
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* ══════════════════════════════
            WORKFLOW
        ══════════════════════════════ */}
        <section id="workflow" className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <FadeUp>
              <div className="text-center mb-14">
                <SecLabel center>How It Works</SecLabel>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                  You brief us.{" "}
                  <span className="text-brand-indigo">Our AI delivers the shortlist.</span>
                </h2>
                <p className="text-sm text-gray-500">One input from you. Everything else is handled by AI.</p>
              </div>
            </FadeUp>

            <div className="relative">
              {/* connector line */}
              <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-orange-200 via-blue-200 to-blue-300 hidden md:block" />
              <div className="space-y-5">
                {workflowSteps.map((step, i) => (
                  <FadeUp key={i} delay={i * 70}>
                    <div className="flex items-start gap-5">
                      {/* circle */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full text-white font-extrabold text-sm flex items-center justify-center shadow-lg z-10 relative"
                        style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", boxShadow: "0 4px 16px rgba(26,26,26,.35)" }}
                      >
                        {step.num}
                      </div>
                      {/* card */}
                      <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block ${step.tagColor}`}>
                          {step.tag}
                        </span>
                        <h4 className="font-extrabold text-base text-gray-900 mb-1.5 mt-1 tracking-tight">{step.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                        {step.mini}
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* ══════════════════════════════
            MATCH SECTION
        ══════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* left */}
              <FadeUp>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                  <span className="w-5 h-px bg-gray-300" />
                  AI-Powered Matching
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-5">
                  Our AI tells you who's worth the call.
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  The moment a candidate comes in, our AI evaluates their fit and give you a clear signal — High, Medium, or Low match. No more opening profiles blind. No more wasted first-round conversations. Just clarity, delivered.
                </p>
                <button
                  onClick={openDemo}
                  className="inline-flex items-center gap-2 bg-brand-indigo text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-slate transition-all hover:-translate-y-0.5 shadow-lg shadow-brand-indigo/20"
                >
                  Book a Demo <ArrowRight size={14} />
                </button>
              </FadeUp>

              {/* right — match panel */}
              <FadeUp delay={120}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/60 p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Applicants · Senior PM</span>
                    <span className="text-xs font-semibold text-gray-400">14 applied</span>
                  </div>
                  <div className="space-y-2.5 mb-4">
                    {matchCandidates.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/60 hover:border-gray-200 hover:bg-gray-50 transition-all">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 ${c.avBg}`}>
                          {c.av}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-gray-900">{c.name}</div>
                          <div className="text-xs text-gray-400 truncate">{c.role}</div>
                        </div>
                        <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full flex-shrink-0 border ${c.badgeCls}`}>
                          {c.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-5 pt-3 border-t border-gray-100">
                    {[
                      { dot: "bg-emerald-500", label: "High Match"   },
                      { dot: "bg-yellow-400",  label: "Medium Match" },
                      { dot: "bg-red-400",     label: "Low Match"    },
                    ].map((l, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <div className={`w-2 h-2 rounded-full ${l.dot}`} />
                        {l.label}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* ══════════════════════════════
            WHY JAN SURAAJ — BENTO
        ══════════════════════════════ */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="text-center mb-12">
                <SecLabel center>The Jan Suraaj Difference</SecLabel>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                  You focus on closing.{" "}
                  <span className="text-brand-indigo">We handle everything before that.</span>
                </h2>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {bentoCards.map((card, i) => (
                <FadeUp key={i} delay={i * 60} className={card.span}>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full hover:-translate-y-1 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
                    {card.bigNum ? (
                      <div
                        className="text-5xl font-extrabold mb-3 leading-none"
                        style={{ background: "linear-gradient(135deg, #1a1a1a, #fdd34e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                      >
                        {card.bigNum}
                      </div>
                    ) : (
                      <div className="text-2xl mb-4">{card.icon}</div>
                    )}
                    <h4 className="font-extrabold text-sm text-gray-900 mb-2 leading-snug tracking-tight">{card.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            TESTIMONIALS — commented out
        ══════════════════════════════ */}
        {false && (
        <>
        <div className="h-px bg-gray-100" />

        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="text-center mb-12">
                <SecLabel center>What Our Clients Say</SecLabel>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                  Teams that let us{" "}
                  <span className="text-brand-indigo">do the heavy lifting.</span>
                </h2>
              </div>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
                    {/* stars */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, si) => (
                        <span key={si} className="text-brand-amber text-base">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic leading-relaxed flex-1 mb-6">{t.quote}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)" }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />
        </>
        )}

        {/* ══════════════════════════════
            FINAL CTA
        ══════════════════════════════ */}
        <section
          className="py-28 relative overflow-hidden text-center bg-brand-midnight">
          {/* orb */}
          

            <div
                className="pointer-events-none absolute bottom-0 -left-24 h-[1000px] w-[1000px] rounded-full opacity-20 z-10"
                style={{
                background:
                    "radial-gradient(circle, #fdd34e 0%, transparent 70%)",
                }}
            />
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[400px] rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,.15) 0%, transparent 65%)", filter: "blur(60px)" }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 z-10">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                Brief us on a role.<br />
                <span className="text-brand-gold">Our AI handles the rest.</span>
              </h2>
              <p className="text-white/75 text-base mb-10 max-w-md mx-auto leading-relaxed">
                AI sourcing. AI scoring. AI outreach. All handled. You walk into every conversation with a warm, pre-qualified candidate — and focus entirely on closing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={openDemo}
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-midnight px-9 py-4 rounded-xl text-base font-extrabold transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{ boxShadow: "0 8px 32px rgba(255,255,255,.25)" }}
                >
                  Book a Demo <ArrowRight size={16} />
                </button>
              </div>
              <p className="text-xs text-white/40 tracking-wide">No commitment · Teams in 20+ countries · GDPR compliant</p>
            </FadeUp>
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default Recruiter;