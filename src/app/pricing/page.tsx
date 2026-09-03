"use client";

import React, { useEffect } from "react";
import MainLayout from "@/MainLayout";
import TopCompaniesSection from "@/components/homepage/TopCompaniesSection";
import PackComparison from "@/components/common/PackComparison";

export default function PricingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
   <MainLayout>
       <div className="min-h-screen py-16 px-6">
        <PackComparison className="" heading="" subheading="" event_category="LP-Pricing" />
      </div>
      <TopCompaniesSection />
    </MainLayout>
  );
}
