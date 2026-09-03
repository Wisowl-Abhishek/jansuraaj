'use client';

import React from 'react';
import {
  Check,
  X
} from 'lucide-react';
import MainLayout from '../../MainLayout';
import TopCompaniesSection from '../homepage/TopCompaniesSection';
import PackComparison from '../common/PackComparison';

const features = [
  { name: "All Jobs at One Place", free: true, premium: true },
  { name: "AI Based Smart Job Matching", free: true, premium: true },
  { name: "Auto-Apply*", free: true, premium: true },
  { name: "Resume Enhancer", free: false, premium: true },
  { name: "Live ATS Score", free: false, premium: true },
  { name: "Dedicated Support", free: false, premium: true },
  { name: "Real Time Application Tracking", free: false, premium: true },
  { name: "Real-time WhatsApp Alerts", free: false, premium: true },
  { name: "Insights: CV vs JD*", free: false, premium: true },
];

const PricingPlans = () => {
  return (
    <MainLayout>
       <div className="min-h-screen py-16 px-6">
        <PackComparison event_category="LP-Pricing" />
      </div>
      <TopCompaniesSection />
    </MainLayout>
  );
};

export default PricingPlans;
