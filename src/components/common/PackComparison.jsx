"use client";

import React from "react";
import { Check, X } from "lucide-react";

const PackComparison = ({className, heading, subheading, event_category}) => {
  const features = [
    { name: "ATS Resume Score", free: true, premium: true },
    { name: "AI Resume Enhancement", free: false, premium: true },
    { name: "Download Premium Templates", free: false, premium: true },
    { name: "AI Based Smart Job Matching", free: true, premium: true },
    // { name: "Interview Question Predictions", free: false, premium: true },
    { name: "Application Tracking", free: true, premium: true },
    { name: "Real-time WhatsApp Alerts", free: false, premium: true },
    // { name: "Resume Review by Experts", free: false, premium: true },
    { name: "Priority Customer Support", free: false, premium: true },
    { name: "Insights: CV vs JD*", free: true, premium: true },
    // { name: "Career Coaching", free: false, premium: true },
    // { name: "Personalized Job Alerts", free: false, premium: true },
    // { name: "New Feature Example", free: true, premium: false },
  ];

  return (
    <section className={`w-full px-6 ${className || ""}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          {heading || "Pricing and Plan"}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {subheading || "Compare Free vs Premium to unlock AI tools for your resume and job search."}
        </p>

        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Standard Pack Card */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-8 relative text-center hover:shadow-xl transition-all">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                💎 Premium
              </span>
            </div>

            <h3 className="text-2xl font-semibold mt-6 text-black">Premium Pack</h3>
            <p className="text-gray-600 mt-2">
              Get AI-powered features for resumes, jobs & more.
            </p>

            <div className="mt-6">
              <span className="text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
                🎉 40% OFF — Limited Time Offer
              </span>
            </div>

            <div className="mt-6 flex justify-center items-baseline gap-2">
              <span className="text-gray-400 line-through text-lg">₹999</span>
              <span className="text-4xl font-bold text-gray-900">₹599</span>
            </div>
            <p className="text-gray-500 text-sm">for 1000 AI Credits</p>

            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "ClickBuyCreditsButton", {
                  event_category: `${event_category}`
                });
                }
                window.open("http://jansuraajapp.wisowl.com/resume-builder", "_blank")}
              }
              className="mt-8 bg-brand-gold text-black font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Buy AI Credits
            </button>

            <p className="text-xs text-gray-500 mt-4">
              By clicking "Buy AI Credits", you agree to our{" "}
              <a href="/terms-of-service" target="_blank" className="text-blue-600 underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/cancellation-and-refund" target="_blank" className="text-blue-600 underline">
                Cancellation Policy
              </a>
              .
            </p>
          </div>

          {/* Features Table */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-8 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-gray-600 font-medium text-sm uppercase tracking-wide py-3">
                    Features
                  </th>
                  <th className="text-center text-gray-800 font-semibold">
                    Free
                  </th>
                  <th className="text-center text-indigo-600 font-semibold">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr
                    key={i}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 text-gray-800">{f.name}</td>
                    <td className="text-center">
                      {f.free ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="text-center">
                      {f.premium ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackComparison;