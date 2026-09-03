import { useState, useEffect, useRef } from "react";
import MainLayout from "../../MainLayout";
import { LayoutDashboard } from "lucide-react";
import { UserAuth } from "../../context/AuthContext";
import { Rocket, TrendingUp, Crown, Handshake } from "lucide-react";

const Recruiter = () => {
  const { appUrl } = UserAuth();
  const [isAnnual, setIsAnnual] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade-up observer
  const FadeUp = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setVisible(true); },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
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

  const Check = () => <span className="text-brand-indigo font-bold flex-shrink-0 mt-0.5">✓</span>;
  const Na = () => <span className="text-gray-300 flex-shrink-0">✕</span>;
  const GoldFlower = () => <span className="text-brand-gold">✳</span>;

  const plans = [
    {
      name: "Startup",
      icon: Rocket,
      iconBg: "bg-blue-50",
      desc: "Perfect for freelance recruiters and solo operators.",
      monthly: "999",
      annual: "999",
      annualTotal: null,
      btnStyle: "border border-gray-300 text-gray-900 hover:border-gray-900 hover:shadow-md",
      btnText: "Get Started",
      features: [
        { has: true, text: <><strong>1</strong> active/editable job post</> },
        { has: true, text: <><strong>25</strong> recommended candidates/job</> },
        { has: true, text: <><strong>20</strong> searchable candidates (max)</> },
        { has: false, text: "AI Interview & Screening" },
        { has: false, text: "Dedicated Account Manager" },
        { has: true, text: "Email + chat support" },
        { has: true, text: "Basic analytics dashboard" },
      ],
    },
    {
      name: "Growth",
      icon: TrendingUp,
      iconBg: "bg-brand-indigo text-white",
      desc: "For growing agencies handling multiple clients.",
      monthly: "2,599",
      annual: "1,667",
      annualTotal: "₹20,000/year",
      popular: true,
      btnStyle: "bg-brand-gold text-brand-midnight font-bold shadow-lg shadow-brand-gold/25 hover:bg-brand-amber hover:shadow-brand-gold/40",
      btnText: "Start Free Trial",
      features: [
        { has: true, text: <><strong>3</strong> active/editable job posts</> },
        { has: true, text: <><strong>50</strong> recommended candidates/job</> },
        { has: true, text: <><strong>50</strong> searchable candidates (max)</> },
        { has: true, text: <><strong>AI Interview & Screening</strong></> },
        { has: true, text: <><strong>Dedicated Account Manager</strong></> },
        { has: true, text: "Priority support" },
        { has: true, text: "Advanced analytics + reports" },
      ],
    },
    {
      name: "Premium",
      icon: Crown,
      iconBg: "bg-amber-50",
      desc: "For high-volume teams with demanding SLAs.",
      monthly: "4,599",
      annual: "3,333",
      annualTotal: "₹40,000/year",
      btnStyle: "bg-brand-indigo text-white shadow-lg shadow-brand-indigo/20 hover:bg-brand-slate hover:shadow-brand-indigo/30",
      btnText: "Start Free Trial",
      features: [
        { has: true, text: <><strong>5</strong> active/editable job posts</> },
        { has: true, text: <><strong>100</strong> recommended candidates/job</> },
        { has: true, text: <><strong>100</strong> searchable candidates (max)</> },
        { has: true, text: <><strong>AI Interview & Screening</strong></> },
        { has: true, text: <><strong>Dedicated Account Manager</strong></> },
        { has: true, text: "Priority support + SLA" },
        { has: true, text: "Custom reporting + API access" },
      ],
    },
    {
      name: "Custom / Assisted",
      icon: Handshake,
      iconBg: "bg-gray-100",
      desc: "Tailored for enterprises needing custom infrastructure.",
      monthly: null,
      annual: null,
      annualTotal: null,
      btnStyle: "bg-gray-900 text-white hover:bg-gray-700",
      btnText: "Contact Sales",
      features: [
        { has: true, text: <><strong>Unlimited</strong> job posts</> },
        { has: true, text: <><strong>Unlimited</strong> recommended candidates</> },
        { has: true, text: <><strong>Unlimited</strong> searchable candidates</> },
        { has: true, text: <><strong>AI Interview & Screening</strong></> },
        { has: true, text: <><strong>Dedicated Account Manager</strong></> },
        { has: true, text: "Custom integrations + webhooks" },
        { has: true, text: "24/7 phone + Slack support" },
      ],
    },
  ];

  const faqs = [
    { q: "Is there a free trial?", a: "Yes! All paid plans include a 14-day free trial with full access to every feature in that tier. No credit card required to start exploring." },
    { q: "What happens when I hit my usage limits?", a: "You'll receive alerts at 80% and 95% of your quota. When you hit the cap, you can instantly upgrade or wait for the next cycle. No hidden overage charges." },
    { q: "Can I upgrade or downgrade anytime?", a: "Absolutely. Upgrade instantly from your dashboard with new limits applying immediately. Downgrades take effect at end of billing cycle." },
    { q: "What payment methods do you accept?", a: "We use Razorpay — UPI, credit/debit cards, net banking, and wallets. All payment data is securely handled. We never store card details." },
    { q: "How does AI matching work?", a: "Our proprietary semantic engine uses embeddings to understand context and intent behind job descriptions and candidate profiles — far beyond keyword matching." },
    { q: "What is AI Interview & Screening?", a: "Available on Growth and Premium plans, AI Interview automates first-round screening. It evaluates candidates on skills and competencies before your team reviews." },
    { q: "Can I cancel my subscription?", a: "Yes, self-serve cancellation anytime from your dashboard. No lock-in contracts, no cancellation fees. Data remains available for 30 days." },
    { q: "Do you offer discounts for startups or NGOs?", a: "Yes! Special pricing for early-stage startups, educational institutions, and non-profits. Contact our sales team to discuss eligibility." },
  ];

  const comparisonData = [
    { cat: "Pricing" },
    { label: "Price per Month", vals: ["₹999", "₹2,599", "₹4,599", "Talk to Sales"] },
    { label: "Price per Year", vals: ["NA", "₹20,000", "₹40,000", "Talk to Sales"] },
    { cat: "Job Posting" },
    { label: "Number of Active/Editable Jobs per Month", vals: ["1", "3", "5", "Talk to Sales"] },
    { cat: "Candidate Search" },
    { label: "Number of Recommended Candidates per Job (max)", vals: ["25", "50", "100", "Talk to Sales"] },
    { label: "Number of Searchable Candidates (max)", vals: ["20", "50", "100", "Talk to Sales"] },
    { cat: "AI Features" },
    { label: "AI Interview and Screening", vals: ["—", "✓", "✓", "Talk to Sales"] },
    { cat: "Support" },
    { label: "Dedicated Account Manager", vals: ["—", "✓", "✓", "✓"] },
    { label: "Email + Chat Support", vals: ["✓", "✓", "✓", "✓"] },
    { label: "Priority Support + SLA", vals: ["—", "—", "✓", "✓"] },
  ];

  const painPoints = [
    { icon: "⏳", title: "72 Hours to Find a Match", text: "Average time recruiters spend manually screening resumes for a single role. That's 3 days of lost productivity — per job posting.", solution: "WisOwl: AI matches in under 30 seconds" },
    { icon: "📊", title: "No Visibility on Usage Limits", text: "Hidden caps and surprise overages make budgeting impossible. You hit a wall mid-hiring cycle with no warning.", solution: "WisOwl: Transparent limits + real-time meters" },
    { icon: "💸", title: "Enterprise Pricing, Freelancer Needs", text: "Bloated platforms charge ₹50K/month for features you'll never use. One-size-fits-all pricing punishes small teams.", solution: "WisOwl: Plans starting at ₹999/month" },
  ];

  const features = [
    { tag: "Core Engine", title: "AI-Powered Smart Matching", text: "Our proprietary embedding-based engine understands context, skills, and intent — not just keywords. Get relevant candidates ranked by fit in seconds.", highlight: true, metrics: [{ val: "94%", desc: "Match accuracy" }, { val: "<30s", desc: "Avg. match time" }, { val: "3x", desc: "Faster than keywords" }] },
    { tag: "Sourcing", title: "Smart Job Posting", text: "Post jobs with AI-suggested descriptions. Track applications and get AI recommendations for each posting — all within your usage limits." },
    { tag: "Pipeline", title: "Candidate Pipeline CRM", text: "Real time pipeline management built for recruiting. Track every candidate from sourced to placed with customizable stages." },
    { tag: "AI Interview", title: "AI Interview & Screening", text: "Automated first-round screening powered by AI. Evaluate candidates on skills, culture fit, and role-specific competencies before your team reviews." },
    { tag: "Analytics", title: "Real-Time Usage Dashboard", text: "Live meters for job posts, candidate searches, and AI recommendations — with smart alerts before you hit any cap." },
  ];

  const steps = [
    { num: "1", title: "Sign Up", text: "Email or Google login. No credit card required to explore." },
    { num: "2", title: "Pick Your Plan", text: "Transparent pricing. Choose Startup to Custom based on volume." },
    { num: "3", title: "Post Your First Job", text: "One-click posting with AI-suggested descriptions." },
    { num: "4", title: "Get AI Matches", text: "Ranked candidates scored by AI match to your requirements." },
  ];

  const testimonials = [
    { stars: 5, text: "We went from screening 200 resumes manually to getting 10 shortlisted candidates in under a minute. The AI matching is a game-changer for our agency.", name: "Sarah Rajan", role: "Head of Recruitment, Solutions", color: "bg-blue-500", initials: "SR" },
    { stars: 5, text: "Transparent pricing was the #1 reason I switched. With WisOwl I know exactly what I'm paying for and never worry about hidden caps killing my workflow.", name: "Arun Verma", role: "Freelance IT Recruiter, Bengaluru", color: "bg-violet-500", initials: "AV" },
    { stars: 5, text: "As an HR manager handling 50+ openings, the AI screening and pipeline CRM give me complete visibility. Onboarding took less than 5 minutes.", name: "Sonu Sharma", role: "HR Manager, ScaleUp Fintech", color: "bg-pink-500", initials: "NK" },
  ];

  const Arrow = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );

  return (
    <MainLayout>
    <div className="min-h-screen bg-white text-gray-900">
      {/* ═══ Google Fonts ═══ */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet" />

      {/* ═══ HERO ═══ */}
      <section className="pt-26 sm:pt-36 pb-20 relative overflow-hidden home-gradient">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(26,13,171,0.03) 0%, transparent 40%, rgba(255,184,0,0.03) 100%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative mt-0 sm:mt-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
                AI-Powered Recruiting — Now Live
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-none mb-5 tracking-tight text-white">
                Stop Searching.<br />Start <em className="text-green-500 font-medium italic">Matching.</em>
              </h1>
              <p className="text-lg text-gray-100 leading-relaxed mb-9 max-w-lg">
                The recruiter CRM that uses AI to match candidates to jobs in seconds — not days. Built for agencies, HR teams, and freelance recruiters across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">

                <a href={`${appUrl}/recruiter/signup`} className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-midnight px-8 py-4 rounded-xl text-base font-bold no-underline transition-all hover:bg-brand-amber hover:-translate-y-0.5" style={{ boxShadow: "0 4px 20px rgba(255,222,89,0.35)" }}>
                  Post a Job <Arrow />
                </a>
                <a href="https://calendar.app.google/kqHPJE7mcKG9PB9g8" target="_blank" className="inline-flex items-center justify-center gap-2 bg-white text-brand-indigo px-8 py-4 rounded-xl text-base font-semibold border-2 border-transparent no-underline transition-all hover:bg-brand-indigo/5 hover:-translate-y-0.5">
                  Book a Demo
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex">
                  {["bg-brand-indigo", "bg-violet-500", "bg-pink-500", "bg-brand-gold"].map((c, i) => (
                    <span key={i} className={`w-9 h-9 rounded-full border-2 border-white/30 ${c} flex items-center justify-center text-xs font-bold text-white ${i > 0 ? "-ml-2.5" : ""}`} style={c === "bg-brand-gold" ? { color: "#03051a" } : {}}>
                      {["AR", "PK", "SM", "VJ"][i]}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white">Trusted by a growing community of recruiters and recruitment agencies.</p>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-200 p-6 animate-bounce-slow" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)", animation: "float 6s ease-in-out infinite" }}>
              <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-5">
                <h4 className="text-sm font-semibold text-brand-indigo flex gap-2"><LayoutDashboard className="h-5 w-5" /> Recruiter Dashboard</h4>
                <span className="bg-green-100 text-green-600 px-2.5 py-0.5 rounded-full text-xs font-semibold">● Live</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ n: "142", l: "Active Jobs" }, { n: "3.8K", l: "Candidates" }, { n: "94%", l: "Match Rate" }].map(s => (
                  <div key={s.l} className="bg-gray-50 rounded-xl p-3.5 text-center">
                    <div className="text-2xl font-bold text-brand-indigo">{s.n}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {[{ i: "RK", n: "Rahul Kumar", r: "Sr. React Developer • 6 yrs", s: "97%", c: "bg-blue-500" }, { i: "PM", n: "Priya Menon", r: "Full Stack Engineer • 4 yrs", s: "93%", c: "bg-violet-500" }, { i: "AS", n: "Aditya Sharma", r: "Backend Developer • 5 yrs", s: "89%", c: "bg-pink-500" }].map(c => (
                  <div key={c.i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                    <div className={`w-8 h-8 ${c.c} rounded-lg flex items-center justify-center text-xs font-bold text-white`}>{c.i}</div>
                    <div className="flex-1"><div className="text-sm font-semibold">{c.n}</div><div className="text-xs text-gray-400">{c.r}</div></div>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2.5 py-0.5 rounded-full">{c.s} match</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOGOS ═══ */}
      <section className="py-12 border-t border-b border-gray-200 bg-gray-50 hidden">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-12 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Trusted by teams at</span>
          {["TechHire", "RecruitX", "TalentBridge", "HireWise", "PeopleFirst"].map(l => (
            <span key={l} className="text-xl font-bold text-gray-300 hover:text-gray-400 transition-colors">{l}</span>
          ))}
        </div>
      </section>

      {/* ═══ PAIN POINTS ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3"><GoldFlower /> The Problem</div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Recruiting Shouldn't Feel Like Guesswork</h2>
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed mb-12">Most CRMs were built for sales teams, not recruiters. You deserve tools designed for how hiring actually works.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-xl mb-5">{p.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.text}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-semibold text-brand-indigo flex items-center gap-1.5"><GoldFlower /> {p.solution}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3"><GoldFlower /> Platform</div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Everything You Need to Hire Faster</h2>
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed mb-12">Recruitment-first CRM — purpose-built for hiring success.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 80} className={f.highlight ? "md:col-span-2" : ""}>
                <div className={`p-9 rounded-2xl border transition-all h-full ${f.highlight ? "bg-brand-navy text-white border-transparent" : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg"}`}>
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-4 border ${f.highlight ? "bg-brand-gold/20 text-brand-gold border-brand-gold/30" : "bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20"}`}>{f.tag}</span>
                  <h3 className="text-xl font-bold mb-2.5">{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${f.highlight ? "text-white/75" : "text-gray-500"}`}>{f.text}</p>
                  {f.metrics && (
                    <div className="flex gap-8 mt-6">
                      {f.metrics.map(m => (
                        <div key={m.desc}>
                          <div className="text-3xl font-bold text-brand-gold">{m.val}</div>
                          <div className="text-xs text-white/50">{m.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20" style={{ background: "#fefcf5" }} id="how-it-works">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 justify-center"><GoldFlower /> How It Works</div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Live in Under 5 Minutes</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">From signup to your first AI-matched candidate — faster than making a cup of chai.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {steps.map((s, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="text-center group relative">
                  {i < 3 && <span className="hidden md:block absolute -right-5 top-7 text-xl text-gray-300">→</span>}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center text-xl font-bold text-brand-indigo group-hover:bg-brand-gold group-hover:text-brand-midnight group-hover:border-brand-gold group-hover:scale-110 transition-all">{s.num}</div>
                  <h4 className="text-sm font-bold mb-1">{s.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECRUITER HELPLINE ═══ */}
      <section className="py-0 bg-white border-t border-gray-100">
        <div className="bg-gradient-to-r from-brand-midnight to-brand-indigo">
          <FadeUp>
            <div className="max-w-6xl text-white p-8 md:p-12 relative overflow-hidden mx-auto">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
              <div className="grid md:grid-cols-2 gap-8 items-center relative">
                
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    ✳ Recruiter Helpline
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Need Help Getting Started?
                  </h2>

                  <p className="text-white/80 text-base leading-relaxed mb-6">
                    Speak directly with our onboarding team for quick account setup, plan guidance,
                    candidate search strategy, or any hiring-related queries.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <span className="text-2xl">📞</span>
                      <a
                        href="tel:+917982085915"
                        className="text-white no-underline hover:text-brand-gold"
                      >
                        +91 7982085915
                      </a>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <span>🕒</span>
                      Monday - Saturday | 9:00 AM - 7:00 PM IST
                    </div>

                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <span>⚡</span>
                      Fast onboarding • Hiring support • Plan consultation
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="text-xl font-bold mb-3">Quick Assistance</h3>
                  <p className="text-sm text-white/75 mb-5">
                    Our team helps recruiters activate faster and improve hiring efficiency from day one.
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
          </FadeUp>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 justify-center"><GoldFlower /> Pricing</div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">No hidden fees. No surprises. Upgrade or downgrade anytime.</p>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 my-10">
            <span className={`text-sm font-medium ${!isAnnual ? "text-gray-900 font-bold" : "text-gray-400"}`}>Monthly</span>
            <button onClick={() => setIsAnnual(!isAnnual)} className={`w-12 h-6.5 rounded-full relative cursor-pointer transition-colors ${isAnnual ? "bg-brand-gold" : "bg-brand-indigo"}`} style={{ width: 48, height: 26 }}>
              <span className={`absolute top-[3px] w-5 h-5 bg-white rounded-full transition-transform ${isAnnual ? "left-[25px]" : "left-[3px]"}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-gray-900 font-bold" : "text-gray-400"}`}>Annual</span>
            <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Save up to 28%</span>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-4 gap-4 items-start">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
              <FadeUp key={i} delay={i * 80}>
                <div className={`bg-white rounded-2xl p-7 relative transition-all hover:shadow-xl hover:-translate-y-1 ${plan.popular ? "border-2 border-brand-indigo md:scale-[1.03] z-10" : "border border-gray-200"}`} style={plan.popular ? { boxShadow: "0 0 0 1px rgba(24,0,173,1), 0 12px 40px rgba(24,0,173,0.12)" } : {}}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-indigo text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">Most Popular</span>
                  )}
                  <div className={`w-10 h-10 ${plan.iconBg} rounded-xl flex items-center justify-center text-lg mb-4`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-xl font-bold mb-1">{plan.name}</div>
                  <p className="text-sm text-gray-400 mb-5 leading-snug">{plan.desc}</p>

                  {plan.monthly ? (
                    <>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-lg font-semibold text-gray-400">₹</span>
                        <span className="text-5xl font-bold leading-none">
                          {isAnnual && plan.annual !== plan.monthly ? plan.annual : plan.monthly}
                        </span>
                        <span className="text-sm text-gray-400">/month</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-6">
                        {plan.annualTotal ? (
                          <>Billed {isAnnual ? "annually" : "monthly"} · <span className={isAnnual ? "font-bold text-gray-600" : ""}>{plan.annualTotal}</span></>
                        ) : (
                          <>Monthly only — no annual plan</>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-bold mb-1 leading-none">Let's Talk</div>
                      <p className="text-xs text-gray-400 mb-6">Custom billing arrangements</p>
                    </>
                  )}

                  <button className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 mb-6 ${plan.btnStyle}`} onClick={() => {
                    window.open("https://calendar.app.google/kqHPJE7mcKG9PB9g8", "_blank")
                  }}>{plan.btnText}</button>

                  <div className="border-t border-gray-100 pt-5">
                    <ul className="space-y-0">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-600">
                          {f.has ? <Check /> : <Na />}
                          <span className={!f.has ? "text-gray-400" : ""}>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
              
            )})}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <button onClick={() => setShowComparison(!showComparison)} className="border-2 border-brand-indigo text-brand-indigo font-semibold text-sm px-7 py-3 rounded-xl hover:bg-brand-indigo/5 transition-all">
              📊 Compare All Plans Side by Side
            </button>
          </div>
          {showComparison && (
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-bold min-w-[240px]">Feature</th>
                    <th className="text-left p-4 font-bold">Startup</th>
                    <th className="text-left p-4 font-bold bg-brand-indigo/10 text-brand-indigo">Growth ⭐</th>
                    <th className="text-left p-4 font-bold">Premium</th>
                    <th className="text-left p-4 font-bold">Custom / Assisted</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) =>
                    row.cat ? (
                      <tr key={i}><td colSpan={5} className="p-4 font-bold text-xs uppercase tracking-widest text-amber-700" style={{ background: "#fefcf5" }}>{row.cat}</td></tr>
                    ) : (
                      <tr key={i} className="border-t border-gray-50">
                        <td className="p-4 font-semibold text-gray-900">{row.label}</td>
                        {row.vals.map((v, vi) => (
                          <td key={vi} className={`p-4 text-gray-600 ${vi === 1 ? "bg-brand-indigo/[0.02]" : ""}`}>{v}</td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-20 bg-brand-navy text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3"><GoldFlower /> What Recruiters Say</div>
          <h2 className="text-4xl font-bold mb-12 tracking-tight">Trusted by India's Hiring Community</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="p-7 rounded-xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 h-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="text-amber-400 mb-4 tracking-wider text-sm">{"★".repeat(t.stars)}</div>
                  <p className="text-sm leading-relaxed italic mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${t.color} rounded-xl flex items-center justify-center text-sm font-bold`}>{t.initials}</div>
                    <div><div className="text-sm font-bold">{t.name}</div><div className="text-xs text-white/50">{t.role}</div></div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 justify-center"><GoldFlower /> FAQ</div>
            <h2 className="text-4xl font-bold mb-10 tracking-tight">Common Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-sm hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className={`text-xl text-brand-gold transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48 pb-5 px-6" : "max-h-0"}`}>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fefcf5 0%, #f9fafb 100%)" }}>
        <span className="absolute top-10 left-16 text-5xl text-brand-gold opacity-10">✳</span>
        <span className="absolute bottom-10 right-16 text-3xl text-brand-gold opacity-10">✳</span>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <FadeUp>
            <h2 className="text-4xl font-bold mb-4">Ready to Hire Smarter?</h2>
            <p className="text-lg text-gray-500 mb-9 leading-relaxed">Be part of the growing community of recruiters transforming their hiring workflow. <br />Try it free for 14 days — no credit card needed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">

              <a href={`${appUrl}/recruiter/signup`} target="_blank" className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-midnight px-8 py-4 rounded-xl text-base font-bold no-underline hover:bg-brand-amber hover:-translate-y-0.5 transition-all" style={{ boxShadow: "0 4px 20px rgba(255,222,89,0.35)" }}>
                Post a Job <Arrow />
              </a>
              <a href="https://calendar.app.google/kqHPJE7mcKG9PB9g8" target="_blank" className="inline-flex items-center justify-center gap-2 bg-white text-brand-indigo px-8 py-4 rounded-xl text-base font-semibold border-2 border-brand-indigo no-underline hover:bg-brand-indigo/5 transition-all">
                Book a Demo
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span>🔒 256-bit encryption</span>
              <span>⚡ Setup in 5 min</span>
              <span>💳 No credit card required</span>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
    </MainLayout>
  );
};

export default Recruiter;
