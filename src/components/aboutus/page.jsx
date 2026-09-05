import React, {useEffect} from "react";
import MainLayout from "../../MainLayout";
import {
  Users,
  Briefcase,
  Sparkles,
  Target,
  BarChart3,
  ShieldCheck,
  Mail,
  Phone,
  Globe,
  Bot,
  LineChart,
  UserSquare
  // MousePointerSquare
} from "lucide-react";

function AboutUs() {
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // or "smooth"
  }, []);
  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-12 text-black">
        <div className="max-w-5xl mx-auto space-y-5">

          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className=" max-w-3xl mx-auto">
              Jan Suraaj is your AI-powered career companion — combining smart tech with human insight to reshape how people and companies connect.
            </p>
          </div>

          {/* Vision + What We Do */}
          <div className="grid space-y-8 pt-10">
            {/* Our Vision */}
            <div className="rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6" />
                <h2 className="text-2xl font-thin">Our Vision</h2>
              </div>
              <p>
              Our mission is to empower individuals to find meaningful and fulfilling work that aligns with their skills and passions. At the same time, we help organizations streamline their hiring processes to find the right talent more efficiently. All of this is made possible through the power of advanced AI technology.
              </p>
            </div>

            {/* What We Do */}
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-2xl font-thin">What We Do</h2>
              </div>
              <p className="mb-6">
                Jan Suraaj is an AI-driven job and talent platform. We streamline job discovery and candidate search — reducing friction for both job seekers and recruiters.
              </p>

              {/* Nested Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Job Seekers */}
                <div className="bg-white backdrop-blur-md rounded-xl border border-black/10 p-4 hover:scale-[1.01] transition">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5" />
                    <h3 className="font-medium text-lg">Job Seekers</h3>
                  </div>
                  <ul className="text-md text-black list-disc list-inside space-y-1">
                    <li>All jobs at 1 Place</li>
                    <li>AI Based Smart Job Matching</li>
                    <li>Resume Builder</li>
                    <li>Real Time Job Alerts</li>
                    <li>One Click Application</li>
                    <li>Real Time Tracking</li>
                    <li>Dedicated Support</li>
                  </ul>
                </div>

                {/* Employers */}
                <div className="bg-white backdrop-blur-md rounded-xl border border-black/10 p-4 hover:scale-[1.01] transition">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="font-medium text-lg">Recruiters & Employers</h3>
                  </div>
                  <ul className="text-md text-black list-disc list-inside space-y-1">
                    <li>AI shortlisting & ranking</li>
                    <li>Career page sync</li>
                    <li>Advanced filters</li>
                    <li>Verified talent pool</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Why Jan Suraaj */}
          <div className="pt-6">
            {/* Section Heading */}
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6" />
              <h2 className="text-2xl font-thin">Why Jan Suraaj?</h2>
            </div>

            {/* Feature List */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Bot className=" w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium ">AI at the Core</h3>
                  <p className="text-md ">Precision search, smart screening, job alerts & deep analytics.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserSquare className=" w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium ">Human-Centered Design</h3>
                  <p className="text-md ">Crafted UX for both job seekers and recruiters for effortless use.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LineChart className=" w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium ">Data Insights</h3>
                  <p className="text-md ">Understand hiring trends and performance beyond job listings.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className=" w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium ">Secure & Transparent</h3>
                  <p className="text-md ">Privacy-first platform with full control over your data.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="py-6">
            <div className="flex items-center gap-3  mb-3">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-2xl font-thin">Our Commitment</h2>
            </div>
            <p className="">
              We're building a smarter hiring ecosystem — where opportunity meets potential at the perfect time.
            </p>
          </div>

          {/* Get in Touch */}
          <div className="p-6 rounded-2xl shadow-md bg-gray-100">
            <div className="flex items-center gap-3 text-black mb-5 pb-3 border-b border-b-1 border-black/20">
              <Mail className="w-6 h-6" />
              <h2 className="text-2xl font-thin text-black">Get in Touch</h2>
            </div>
            <ul className="flex flex-column md:flex-row md gap-5 text-black align-middle">
              <li className="flex gap-2 items-center">
                <Mail className="w-5 h-5 text-black hover:text-black" />
                <span>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@wisowl.com" className="text-black hover:text-black hover:underline">
                    support@wisowl.com
                  </a>
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-5 h-5 text-black hover:text-black" />
                <span><strong>Support:</strong> +91 7428524200</span>,<span>+91 7428524200</span>
              </li>
              <li className="flex gap-2 items-center">
                <Globe className="w-5 h-5 text-black hover:text-black" />
                <span>
                  <strong>Website:</strong>{" "}
                  <a href="https://www.wisowl.com" className="text-black hover:text-black hover:underline" target="_blank">
                    www.wisowl.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default AboutUs;
