import React from "react";
import { Target, FileCheck2, Mic, BarChart3 } from "lucide-react";
import Button from "../common/Button";
import { UserAuth } from "../../context/AuthContext";

const MakeLifeEasy = () => {
  const { appUrl } = UserAuth();

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,115,0,0.2),transparent)]"></div>

      <div className="container relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Transform your career and find new opportunities with Jan Suraaj AI.
        </p>

        <div className="max-w-xl mx-auto mt-10 space-y-5 text-left">
          <div className="flex items-start gap-3">
            <Target className="text-brand-gold h-6 w-6 mt-1" />
            <p className="text-lg">
              Get matched with jobs that fit your skills.
            </p>
          </div>

          {/* <div className="flex items-start gap-3">
            <FileCheck2 className="text-brand-gold h-6 w-6 mt-1" />
            <p className="text-lg">
              AI-optimized resumes that pass ATS filters
            </p>
          </div> */}

          {/* <div className="flex items-start gap-3">
            <Mic className="text-brand-gold h-6 w-6 mt-1" />
            <p className="text-lg">Interview prep with predicted questions</p>
          </div> */}

          <div className="flex items-start gap-3">
            <BarChart3 className="text-brand-gold h-6 w-6 mt-1" />
            <p className="text-lg">
              Track all your applications in one dashboard
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Button
            label="Start My Job Search Free"
            className="bg-brand-gold text-brand-midnight px-8 py-3 text-lg font-semibold rounded-full hover:bg-brand-amber transition"
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "ClickSignupButtonBottom", {
                  event_category: "LandingPage",
                });
              }
              window.open(`${appUrl}/signup`, "_blank");
            }}
          />
          <p className="mt-4 text-sm text-gray-400">
          No Upfront Payment • Free Forever • Unlimited Jobs
          </p>
        </div>

        {/* <div className="mt-12 flex justify-center gap-12 text-center">
          <div>
            <h3 className="text-3xl font-bold text-brand-gold">5000+</h3>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-brand-gold">3x</h3>
            <p className="text-gray-400">Faster Hiring</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-brand-gold">95%</h3>
            <p className="text-gray-400">Success Rate</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default MakeLifeEasy;
