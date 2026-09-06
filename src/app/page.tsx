"use client";

import TopCompaniesSection from "@/components/homepage/TopCompaniesSection";
import FindJobsFaster from "@/components/homepage/FindJobsFaster";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import MakeLifeEasy from "@/components/homepage/MakeLifeEasy";
import MainLayout from "@/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      {/* <TopCompaniesSection /> */}
      <FindJobsFaster />
      {/* <TestimonialsSection /> */}
      <MakeLifeEasy />
    </MainLayout>
  );
}
