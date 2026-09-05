import React, {useEffect} from "react";
import MainLayout from "../../MainLayout";
import {
  ShieldCheck,
  User,
  Globe,
  Clock,
  ServerCog,
  Mail,
  FileText,
  Lock,
  Settings2,
  Trash2,
  AlertTriangle,
  Globe2,
  RefreshCcw,
} from "lucide-react";

function PrivacyPolicy() {
useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // or "smooth"
}, []);
  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-12 text-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 ">
            <ShieldCheck className="inline-block w-6 h-6 mr-2 " />
            Privacy Policy
          </h1>
          <p className="text-center text-sm  mb-8">
            Effective Date: <span className="">23rd July 2025</span>
          </p>

          <p className="mb-6 ">
            At <strong className="">Jan Suraaj</strong> ("we", "our", or "us"), your
            privacy is important to us. This Privacy Policy outlines how we
            collect, use, share, and protect your personal information when you
            use our AI-powered job search platform.
          </p>

          <div className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <User className="w-5 h-5 " /> Information We Collect
              </h2>
              <ul className="list-disc pl-6  mt-3 space-y-1">
                <li>Full name, Email address, Phone number</li>
                <li>Location, Resume, Employment & Education background</li>
                <li>Skills, Certifications, Social profiles (optional)</li>
                <li>Device info, IP, Pages viewed, Referrer, etc.</li>
                <li>Recruiter details like Company Name, Contact Person</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <Settings2 className="w-5 h-5 " /> How We Use Information
              </h2>
              <ul className="list-disc pl-6  mt-3 space-y-1">
                <li>AI-based job matching</li>
                <li>Improve and personalize the experience</li>
                <li>Send job alerts, notifications</li>
                <li>Connect employers with candidates</li>
                <li>Platform security and analytics</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <Globe className="w-5 h-5 " /> Sharing Your Information
              </h2>
              <p className=" mt-2">
                We do not sell your data. We may share it:
              </p>
              <ul className="list-disc pl-6  mt-2 space-y-1">
                <li>With employers when you apply or set visibility to public</li>
                <li>With service providers (e.g., hosting, analytics)</li>
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <Lock className="w-5 h-5 " /> Data Security
              </h2>
              <p className=" mt-2">
                We apply standard security practices including SSL, secure
                servers, role-based access, and vulnerability scans. However,
                no system is 100% secure.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <Clock className="w-5 h-5 " /> Data Retention
              </h2>
              <p className=" mt-2">
                We retain your data as long as needed for services or legal
                compliance. You can request deletion anytime.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <User className="w-5 h-5 " /> Your Rights & Choices
              </h2>
              <ul className="list-disc pl-6  mt-2 space-y-1">
                <li>Edit your profile, Opt-out of communications</li>
                <li>Set profile visibility</li>
                <li>Request data deletion or export</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <ServerCog className="w-5 h-5 " /> Cookies & Tracking
              </h2>
              <p className=" mt-2">
                We use cookies to remember you, personalize experience, and
                track performance. You can disable cookies in browser settings.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 " /> Children's Privacy
              </h2>
              <p className=" mt-2">
                Jan Suraaj is not intended for users under 16. We don’t knowingly
                collect data from children.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <Globe2 className="w-5 h-5 " /> International Users
              </h2>
              <p className=" mt-2">
                By using our platform outside India, you agree to transfer and
                storage of your data in India or other jurisdictions.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 " /> Policy Updates
              </h2>
              <p className=" mt-2">
                We may update this policy. Please check back periodically. Last
                updated on 01 July 2025.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <Mail className="w-5 h-5 " /> Contact Us
              </h2>
              <ul className="mt-2  space-y-1">
                <li>Email: <a href="mailto:support@wisowl.com" className=" hover:underline">support@wisowl.com</a></li>
                <li>Address: TOWER- C, UNIT NO- 1205, PLOT NO- 1 BHUTANI INFRA, Nepz Post Office, Noida, Gautam Buddha Nagar, UP - 201305</li>
                <li>Website: <a href="https://www.wisowl.com" className=" hover:underline" target="_blank">www.wisowl.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default PrivacyPolicy;
