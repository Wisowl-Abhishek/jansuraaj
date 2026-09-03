"use client";

import React, { useEffect } from "react";
import MainLayout from "@/MainLayout";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-12 text-black">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="mb-10">
            If you have any questions or concerns about our privacy policy or your personal data, feel free to reach out:
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-8 text-left space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6  mt-1" />
              <div>
                <h2 className="text-lg font-semibold ">Email</h2>
                <a
                  href="mailto:support@wisowl.com"
                  className=" hover:underline block"
                >
                  support@wisowl.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6  mt-1" />
              <div>
                <h2 className="text-lg font-semibold ">Support Phone No</h2>
                <p>+91 7428524200, +91 9999059763</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6  mt-1" />
              <div>
                <h2 className="text-lg font-semibold ">Address</h2>
                <p>TOWER- C, UNIT NO- 1205, PLOT NO- 1 BHUTANI INFRA, Nepz Post Office, Noida, Gautam Buddha Nagar, UP - 201305</p>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6  mt-1" />
              <div>
                <h2 className="text-lg font-semibold ">Website</h2>
                <a
                  href="/"
                  rel="noopener noreferrer"
                  className=" hover:underline block"
                >
                  www.wisowl.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
