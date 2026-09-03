import React, { useEffect } from "react";
import MainLayout from "../../MainLayout";
import {
  FileText,
  User,
  LogIn,
  BadgeCheck,
  XOctagon,
  ShieldCheck,
  Eye,
  AlertTriangle,
  Ban,
  Lock,
  RefreshCcw,
  Gavel,
  Mail,
} from "lucide-react";

function TermsOfService() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-12 text-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            <FileText className="inline-block w-6 h-6 mr-2" />
            Terms of Service
          </h1>
          <p className="text-center text-sm mb-8">
            Effective Date: <span>23rd July 2025</span> | Last Updated:{" "}
            <span>23rd July 2025</span>
          </p>

          <div className="space-y-8">
            {/* Welcome */}
            <div>
              <p>
                Welcome to <strong>WisOwl</strong>. By accessing or using our
                website (<a
                  href="https://www.wisowl.com"
                  className="hover:underline"
                  target="_blank"
                >
                  www.wisowl.com
                </a>
                ), mobile interface, or services ("Platform"), you agree to
                comply with and be bound by these Terms of Service ("Terms"). If
                you do not agree to these Terms, please do not use the Platform.
              </p>
              <p className="mt-3">
                These Terms constitute a legally binding agreement between{" "}
                <strong>WisOwl Technologies Pvt. Ltd.</strong> ("WisOwl", "we",
                "our", "us") and you ("you", "user", "job seeker", or
                "recruiter").
              </p>
            </div>

            {/* 1. Eligibility */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <User className="w-5 h-5" /> 1. Eligibility
              </h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You must be at least 16 years old to use WisOwl.</li>
                <li>
                  You are legally eligible to enter into this agreement.
                </li>
                <li>The information you provide is accurate and complete.</li>
                <li>
                  You will not use the platform for any illegal or unauthorized
                  purpose.
                </li>
              </ul>
            </div>

            {/* 2. Account Registration */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <LogIn className="w-5 h-5" /> 2. Account Registration
              </h2>
              <p className="mt-2">
                To access certain features, you must create an account and
                provide accurate, current, and complete information.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your login credentials.
                </li>
                <li>
                  You are responsible for all activities under your account.
                </li>
                <li>
                  Notify us immediately of any unauthorized access or use.
                </li>
              </ul>
              <p className="mt-2">
                WisOwl reserves the right to suspend or delete accounts found to
                be in violation of these Terms.
              </p>
            </div>

            {/* 3. Use of Platform */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BadgeCheck className="w-5 h-5" /> 3. Use of the Platform
              </h2>
              <h3 className="font-medium mt-2">For Job Seekers:</h3>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Provide truthful details in your profile and resume.</li>
                <li>Apply only to roles you are genuinely interested in.</li>
                <li>
                  Use the platform for personal career advancement purposes
                  only.
                </li>
              </ul>

              <h3 className="font-medium mt-4">For Recruiters:</h3>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Post accurate, non-deceptive job descriptions.</li>
                <li>
                  Do not charge candidates any fees outside approved channels.
                </li>
                <li>
                  Use candidate information only for hiring-related purposes.
                </li>
              </ul>
              <p className="mt-2">
                Misuse of user data or spamming candidates is strictly
                prohibited.
              </p>
            </div>

            {/* 4. Prohibited Conduct */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <XOctagon className="w-5 h-5" /> 4. Prohibited Conduct
              </h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use the platform for any unlawful purpose.</li>
                <li>Impersonate any person or entity.</li>
                <li>Scrape, crawl, or use bots to extract data.</li>
                <li>Post harmful, misleading, or infringing content.</li>
                <li>Violate any applicable laws or regulations.</li>
              </ul>
              <p className="mt-2">
                We reserve the right to remove content or restrict access for
                violations and pursue legal action if needed.
              </p>
            </div>

            {/* 5. Intellectual Property */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> 5. Intellectual Property
              </h2>
              <p className="mt-2">
                All content on the Platform — including logos, text, graphics,
                AI algorithms, and software — is the property of WisOwl or its
                licensors.
              </p>
              <p className="mt-2">
                You may not copy, modify, distribute, sell, or lease any part of
                our platform or content without written permission.
              </p>
            </div>

            {/* 6. Privacy Policy */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5" /> 6. Privacy Policy
              </h2>
              <p className="mt-2">
                Your use of WisOwl is also governed by our{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
                , which outlines how we collect, use, and protect your data.
              </p>
            </div>

            {/* 7. Disclaimers */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> 7. Disclaimers
              </h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  We do not guarantee job offers or hiring outcomes from
                  platform use.
                </li>
                <li>
                  We don’t guarantee accuracy of user-generated content or job
                  listings.
                </li>
                <li>
                  Platform is provided "as-is" and "as-available" without
                  warranties.
                </li>
              </ul>
            </div>

            {/* 8. Limitation of Liability */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Ban className="w-5 h-5" /> 8. Limitation of Liability
              </h2>
              <p className="mt-2">
                WisOwl shall not be liable for indirect, incidental,
                consequential damages, or loss of profits, data, or goodwill.
              </p>
              <p className="mt-2">
                Our total liability will not exceed the amount paid (if any) by
                you for using our services.
              </p>
            </div>

            {/* 9. Termination */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5" /> 9. Termination
              </h2>
              <p className="mt-2">
                We may suspend or terminate your access for violations or harmful
                conduct, with or without notice.
              </p>
              <p className="mt-2">
                You may also deactivate your account via settings or by
                contacting support.
              </p>
            </div>

            {/* 10. Modifications */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <RefreshCcw className="w-5 h-5" /> 10. Modifications
              </h2>
              <p className="mt-2">
                We may update these Terms from time to time. Continued use after
                changes means you accept the revised Terms.
              </p>
            </div>

            {/* 11. Governing Law */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Gavel className="w-5 h-5" /> 11. Governing Law
              </h2>
              <p className="mt-2">
                These Terms are governed by the laws of India. Any disputes will
                be subject to the jurisdiction of courts located in New Delhi.
              </p>
            </div>

            {/* 12. Contact */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5" /> 12. Contact Us
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:support@wisowl.com"
                    className="hover:underline"
                  >
                    support@wisowl.com
                  </a>
                </li>
                <li>Address: TOWER- C, UNIT NO- 1205, PLOT NO- 1 BHUTANI INFRA, Nepz Post Office, Noida, Gautam Buddha Nagar, UP - 201305</li>
                <li>
                  Website:{" "}
                  <a
                    href="https://www.wisowl.com"
                    className="hover:underline"
                    target="_blank"
                  >
                    www.wisowl.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default TermsOfService;
