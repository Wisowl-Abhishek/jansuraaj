"use client";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import Hero from "./components/homepage/Hero";
import FooterNext from "@/components/FooterNext";

const MainLayout = ({
  children
}) => {
  // const currentPath = headers().get("x-pathname");
  const currentPath = usePathname();
  return (
    <>
      <div className={`${currentPath != "/" && "min-h-screen inner-page"}`}>
      {/* {currentPath} */}
      {/* bg-gradient-to-br from-orange-500 via-blue-800 to-[#0b2252] */}
      <div className={`gap-10 relative overflow-hidden ${currentPath == '/' ? "home-gradient pb-[70px] sm:pb-[70px] pt-[100px] sm:pt-[160px]" : "pt-[60px] sm:pt-[120px]"} ${(currentPath == '/resume-builder' || currentPath == '/resume-builder/' || currentPath == '/recruiter-lp/' || currentPath.startsWith('/hire/'))  && '!p-0'}`}>
      
      <Header />
      {currentPath == '/' && <Hero /> }
      </div>
        <main>{children}</main>
      </div>
      <FooterNext />
    </>
  );
};

export default MainLayout;