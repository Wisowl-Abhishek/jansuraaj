"use client";
import React, { useEffect } from "react";
import Button from "./common/Button";
import { UserAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

const shimmerButtonClass =
  "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none " +
  "before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] " +
  "dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] " +
  "before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] " +
  "before:bg-no-repeat before:[transition:background-position_0s_ease] " +
  "hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[4500ms]";

const Header = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header_navbar = document.getElementById("header_navbar");
      if (!header_navbar) return;
      if (window.scrollY > 850) {
        header_navbar.classList.add("bg-black/50", "text-white");
      } else {
        header_navbar.classList.remove("bg-black/50", "text-white");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const currentPath = (pathname || "").replace(/\/$/, "") || "/";

  const context = UserAuth();
  const appUrl = context?.appUrl || "https://app.wisowl.com/";

  const isRecruiterPage = currentPath === "/recruiter-lp";

  const GAHandleClick = (action, category) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, { event_category: category });
    }
  };

  return (
    <header
      id="header_navbar"
      className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/20 backdrop-blur shadow-md ${shimmerButtonClass} ${currentPath === "/" || currentPath === "/recruiter-lp" ? "" : "innerpage-nav"}`}
    >
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
      <Button
        className="text-white outline-none border border-white/50 bg-transparent hover:border-white/30 py-2 px-3 sm:px-5 rounded-lg text-xs sm:text-sm"
        label="Login"
        onClick={() => {
          GAHandleClick("ClickLoginButtonNav", "LandingPage");
          if (isRecruiterPage) {
            window.open(`${appUrl}/recruiter/signin`, "_blank");
          } else {
            window.open(`${appUrl}/signin`, "_blank");
          }
        }}
      />
      <Button
        className="text-brand-midnight bg-brand-gold hover:border-transparent border border-brand-gold py-2 px-3 sm:px-5 rounded-lg font-semibold text-xs sm:text-sm"
        label="Register"
        onClick={() => {
          GAHandleClick("ClickSignupButtonNav", "LandingPage");
          if (isRecruiterPage) {
            window.open(`${appUrl}/recruiter/signup`, "_blank");
          } else {
            window.open(`${appUrl}/signup`, "_blank");
          }
        }}
      />
      {!isRecruiterPage ? (
        <Button
          className="text-white outline-none border border-white/30 bg-transparent hover:border-white/50 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm"
          label="For Recruiters"
          onClick={() => {
            GAHandleClick("ClickEmployerButtonNav", "LandingPage");
            window.open(`${appUrl}/recruiter/signup`, "_blank");
          }}
        />
      ) : (
        <Button
          className="text-white outline-none border border-white/30 bg-transparent hover:border-white/50 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm"
          label="For Candidates"
          onClick={() => {
            GAHandleClick("ClickCandidateButtonNav", "LandingPage");
            window.open(`/?v=c`, "_self");
          }}
        />
      )}
      </div>
    </header>
  );
};

export default Header;
