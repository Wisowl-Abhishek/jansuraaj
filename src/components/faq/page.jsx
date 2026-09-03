import React, {useEffect} from "react";
import MainLayout from "../../MainLayout";
import {
  UserCircle,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  Mail,
  Eye,
  FileText,
  ArrowRightLeft,
  Bug,
} from "lucide-react";

const FAQ = () => {

useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // or "smooth"
}, []);

  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-12 text-black">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center  mb-2">
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-center  text-lg mb-12">
            Everything you need to know about using WisOwl
          </p>

          {/* For Job Seekers */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold  flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
              <UserCircle className="w-6 h-6" /> For Job Seekers
            </h2>
            <ul className="space-y-6">
              {[
                ["What is WisOwl?", "WisOwl is an AI-powered job search platform that matches you with jobs that suit your skills and preferences — without the endless scrolling."],
                ["How is WisOwl different from other job portals?", "WisOwl uses AI to personalize job recommendations, enhance your resume, connect you with recruiters, and offer valuable feedback."],
                ["Is WisOwl free for job seekers?", "Yes, it’s 100% free to search and apply for jobs, and use our AI tools."],
                ["How does the AI match me with jobs?", "By analyzing your resume, experience, goals, and skills to recommend the most relevant roles."],
                ["Can WisOwl help improve my resume?", "Yes! The Resume Enhancer tool gives real-time AI suggestions to improve your CV."],
                ["Do I need to upload a resume?", "Uploading a resume is recommended but you can also manually build your profile."],
                ["Will recruiters see my profile?", "Yes, if your profile is completed and set to 'visible'."],
                ["How do I apply to jobs?", "Click 'Apply Now' on a listing. Our tracker keeps you updated on progress."],
                ["Is my personal data safe?", "Yes. We follow strict security protocols and never share your data without consent."],
                ["Is WisOwl available on mobile?", "Yes, on mobile browsers. A mobile app is coming soon!"],
                ["How do I reset my password?", "Use the 'Forgot Password' link on the login page."],
                ["How do I report a bug?", "Report it on our Contact Us page or email support@wisowl.com."],
                ["How do I delete my account?", "Request account deletion by emailing support@wisowl.com or using the Contact page."],
              ].map(([q, a], i) => (
                <li key={i}>
                  <h3 className="mb-1 font-semibold">Q{i + 1}. {q}</h3>
                  <p className="text-gray-600">{a}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold  flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
              <Briefcase className="w-6 h-6" /> For Employers & Recruiters
            </h2>
            <ul className="space-y-6">
              {[
                ["Why should I hire through WisOwl?", "You get AI-powered candidate shortlisting, active verified talent, and faster hiring decisions."],
                ["How do I post a job?", "Sign up as a Recruiter, complete your profile, and use our quick job posting tool or sync your career page."],
                ["Is there a cost to post jobs?", "Basic job posts are free. Premium features include highlighted listings and AI tools."],
                ["What kind of candidates are on WisOwl?", "From fresh graduates to experienced professionals across multiple domains."],
                ["Can WisOwl screen candidates for me?", "Yes, our AI ranks candidates based on fit and behavior patterns."],
                ["How do I contact a candidate?", "Use our secure messaging system or request callbacks directly via the dashboard."],
                ["How can I track performance of job posts?", "Your dashboard shows views, applications, and AI match scores."],
                ["Is WisOwl available on mobile?", "Yes, and our dedicated app is coming soon."],
                ["How do I reset my password?", "Click 'Forgot Password' on the login screen."],
                ["How do I report a bug?", "Use our Contact page or email support@wisowl.com."],
                ["How do I delete my account?", "Contact us via email or the Contact page to delete your account."],
              ].map(([q, a], i) => (
                <li key={i}>
                  <h3 className="font-semibold  mb-1">Q{i + 1}. {q}</h3>
                  <p className="text-gray-600">{a}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Note */}
          <div className="text-center mt-16">
            <p>
              Didn’t find your question?{" "}
              <a href="/contact" className=" hover:underline">
                Contact us here
              </a>{" "}
              or email us at{" "}
              <a href="mailto:support@wisowl.com" className=" hover:underline">
                support@wisowl.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FAQ;
