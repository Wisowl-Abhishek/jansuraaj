import { useEffect, useContext, useState } from "react";
import DashboardOverview from "./components/homepage/DashboardOverview";
import MakeLifeEasy from "./components/homepage/MakeLifeEasy";
import FindJobsFaster from "./components/homepage/FindJobsFaster";
import MainLayout from "./MainLayout";
import Button from "./components/common/Button";
import { Link } from "lucide-react";
import TopCompaniesSection from "./components/homepage/TopCompaniesSection";
import TestimonialsSection from "./components/homepage/TestimonialsSection";
import RecruiterSection from "./components/homepage/RecruiterSection";

function App() {

  return (
    <>
      <MainLayout>
        {/* <DashboardOverview /> */}
        <TopCompaniesSection />
        {/* <RecruiterSection /> */}
        <FindJobsFaster />
        <TestimonialsSection />
        <MakeLifeEasy />
        
      </MainLayout>
    </>
  );
}

export default App;
