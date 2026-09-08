"use client";
import Header from "./components/Header";
import Hero from "./components/homepage/Hero";
import FooterNext from "@/components/FooterNext";

const MainLayout = ({
  children
}) => {
  return (
    <>
      <div className="gap-10 relative overflow-hidden home-gradient pb-[120px] sm:pb-[120px] pt-[140px] sm:pt-[140px]">
        <div className='absolute bottom-0 right-0'>
            <img src="/pk1.png" alt="hero-owl" className='w-[750px] opacity-20' />
        </div>
        <Header />
        <Hero />
      </div>
      <main>{children}</main>
      <FooterNext />
    </>
  );
};

export default MainLayout;
