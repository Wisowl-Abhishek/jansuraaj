import React, {useEffect} from "react";
import MainLayout from "../../MainLayout";
import {
  UserPlus,
  Sparkles,
  FileText,
  Send,
  Search,
  Upload,
  Users,
  MessageSquare,
  GaugeCircle,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

import { UserAuth } from "../../context/AuthContext";

function HIW() {
const { appUrl } = UserAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // or "smooth"
  }, []);

  return (
    <MainLayout>
      <section className="min-h-screen  px-6 py-12 text-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl font-bold text-center mb-2">How It Works</h1>
          <p className="text-xl text-center mb-6">Smarter. Simpler. Faster.</p>
          <p className=" mb-12 text-center max-w-2xl mx-auto">
            Jan Suraaj uses the power of AI to connect the right candidates with the right jobs —
            without the noise, guesswork, or endless scrolling.
          </p>

          {/* Side-by-side section */}
          {/* Side-by-side section */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Job Seekers */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-6 space-y-4 transition hover:scale-[1.01]">
              <div className="mb-4 pb-3 border-b border-white/10 flex items-center gap-3">
                <UserPlus className="w-6 h-6 " />
                <h2 className="text-2xl font-thin ">
                  For Job Seekers
                </h2>
              </div>
              <p className=" mb-4 text-lg">
                Land your dream job — without the job hunt burnout.
              </p>
              <div className="space-y-4">
                {[
                  [<UserPlus className="w-5 h-5" />, "Create Your Profile: Sign up and complete your profile. Upload your resume or build one from scratch."],
                  [<Sparkles className="w-5 h-5" />, "Get AI-Powered Matches: Get role suggestions based on your skills, experience, and goals."],
                  [<FileText className="w-5 h-5" />, "Enhance Your Resume: Receive personalized suggestions to improve your CV with our Resume Enhancer."],
                  [<Send className="w-5 h-5" />, "Apply in One Click: Easily apply and track applications directly on Jan Suraaj."],
                  [<Search className="w-5 h-5" />, "Get Discovered by Recruiters: Make your profile public to be contacted by top recruiters."],
                ].map(([Icon, text], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className=" mt-1">{Icon}</div>
                    <p className="text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiters */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-6 space-y-4 transition hover:scale-[1.01]">
              <div className="mb-4 pb-3 border-b border-white/10 flex items-center gap-3">
                <Users className="w-6 h-6 " />
                <h2 className="text-2xl font-thin ">
                  For Recruiters & Employers
                </h2>
              </div>
              <p className=" mb-4 text-lg">
                Find top talent in less time — powered by AI.
              </p>
              <div className="space-y-4">
                {[
                  [<Upload className="w-5 h-5" />, "Post a Job or Sync Career Page: Start posting jobs or auto-import from your site."],
                  [<GaugeCircle className="w-5 h-5" />, "Let AI Do the Heavy Lifting: Our engine ranks candidates based on skills and role-fit."],
                  [<FileText className="w-5 h-5" />, "Review Smart Shortlists: Get curated profiles with compatibility scores and resume analytics."],
                  [<MessageSquare className="w-5 h-5" />, "Engage and Hire: Message candidates, schedule interviews, and manage all in one place."],
                ].map(([Icon, text], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className=" mt-1">{Icon}</div>
                    <p className="text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Why It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-thin mb-4">Why It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                [<GaugeCircle className="w-6 h-6 " />, "AI Matching Engine", "Replaces guesswork with precision."],
                [<LayoutDashboard className="w-6 h-6 " />, "Dynamic Profiles", "Gives recruiters a complete picture of each candidate."],
                [<Sparkles className="w-6 h-6 " />, "Real-Time Updates", "Keeps both sides informed during every stage."],
                [<ShieldCheck className="w-6 h-6 " />, "Secure & Scalable", "Built to grow with your career or your company."],
              ].map(([Icon, title, desc], i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-md hover:shadow-xl transition">
                  <div className="flex items-center gap-2 mb-2">{Icon}<h3 className="text-lg font-semibold ">{title}</h3></div>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10 border-t border-dashed border-blue-500/20 pt-10">
            <h3 className="text-3xl mb-4 font-thin pb-2">Start Your Jan Suraaj Journey Today</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
              <a
                href={`${appUrl}/signup`}
                target="_blank"
                className="px-6 py-3 bg-brand-indigo text-white  hover:text-white hover:bg-brand-slate rounded-lg  hover font-medium transition"
              >
                For Job Seekers: Create Your Profile
              </a>
              <a
                href={`${appUrl}/recruiter/signup`}
                target="_blank"
                className="px-6 py-3 bg-brand-indigo  text-white hover:text-white hover:bg-brand-slate rounded-lg hover font-medium transition"
              >
                For Employers: Post a Job / Request a Demo
              </a>
            </div>
            <p className="">
              Need help?{" "}
              <a href="mailto:support@wisowl.com" className=" hover:underline">
                support@wisowl.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default HIW;
