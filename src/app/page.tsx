"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TopCompaniesSection from "@/components/homepage/TopCompaniesSection";
import FindJobsFaster from "@/components/homepage/FindJobsFaster";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import MakeLifeEasy from "@/components/homepage/MakeLifeEasy";
import MainLayout from "@/MainLayout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("v") === "r") {
      router.replace("/recruiter-lp");
    }
  }, [router]);

  return (
    <MainLayout>
      {/* <TopCompaniesSection /> */}
      <FindJobsFaster />
      {/* <TestimonialsSection /> */}
      <MakeLifeEasy />
    </MainLayout>
  );
}
