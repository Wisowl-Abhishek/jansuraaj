"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Building,
  IndianRupee,
  Phone,
  Compass,
  File,
  Bot
} from "lucide-react";
import Button from "./common/Button";
import { UserAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import pSEOData from "@/lib/pseo-slugs.json";
const { trendingJobs: TRENDING_JOBS, jobsByLocation: JOBS_BY_LOCATION, education: EDUCATION } = pSEOData;

const shimmerButtonClass =
  "before:absolute before:inset-0 before:rounded-[inherit] " +
  "before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] " +
  "dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] " +
  "before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] " +
  "before:bg-no-repeat before:[transition:background-position_0s_ease] " +
  "hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[4500ms]";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [mobileJobsOpen, setMobileJobsOpen] = useState(false);
  const timeoutRef = useRef(null);

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

  useEffect(() => {
    if (drawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [drawerOpen]);

  const pathname = usePathname();
  const currentPath = (pathname || "").replace(/\/$/, "") || "/";

  const context = UserAuth();
  const appUrl = context?.appUrl || "https://app.wisowl.com/";

  const handleJobsEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setJobsOpen(true);
  };

  const handleJobsLeave = () => {
    timeoutRef.current = setTimeout(() => setJobsOpen(false), 150);
  };

  const isRecruiterPage = currentPath === "/recruiter-lp";

  const navLinks = [
    { label: "About Us", href: "/about", icon: <Building className="w-5 h-5" /> },
    { label: "How It Works", href: isRecruiterPage ? "#workflow" : "/hiw", icon: <Compass className="w-5 h-5" /> },
    { label: "Resume Builder", href: "/resume-builder", icon: <File className="w-5 h-5" /> },
    { label: "Pricing", href: isRecruiterPage ? "#pricing" : "/pricing", icon: <IndianRupee className="w-5 h-5" /> },
    { label: "Contact", href: "/contact", icon: <Phone className="w-5 h-5" /> },
    { label: "WisOwl Agents", href: "#agents", icon: <Bot className="w-5 h-5" /> },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    if (isRecruiterPage) {
      return (
        link.label !== "Resume Builder" &&
        link.label !== "Contact" &&
        link.label !== "About Us" &&
        link.label !== "Pricing"
      );
    } else {
        return link.label !== "WisOwl Agents";
    }
    return true;
  });

  const handleNavClick = (label) => {
    if (typeof window !== "undefined" && window.gtag) {
      switch (label) {
        case "Home":
          window.gtag("event", "ClickHomeLinkNav", { event_category: "LandingPage" });
          break;
        case "About Us":
          window.gtag("event", "ClickAboutUsLinkNav", { event_category: "LandingPage" });
          break;
        case "How It Works":
          window.gtag("event", "ClickHowitWorksNav", { event_category: "LandingPage" });
          break;
        case "Contact":
          window.gtag("event", "ClickContactNav", { event_category: "LandingPage" });
          break;
        case "Pricing":
          window.gtag("event", "ClickPricingNav", { event_category: "LandingPage" });
          break;
        case "Resume Builder":
          window.gtag("event", "ClickResumeBuilderNav", { event_category: "LandingPage" });
          break;
      }
    }
  };

  const GAHandleClick = (action, category) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, { event_category: category });
    }
  };

  return (
    <>
      <header
        id="header_navbar"
        className={`text-white py-2 sm:py-4 px-4 pr-2 sm:px-6 shadow-md z-30 bg-black/20 backdrop-blur rounded-none sm:rounded-xl flex flex-col lg:flex-row items-center justify-center max-w-[1240px] mx-auto fixed top-0 md:top-10 left-[50%] translate-x-[-50%] w-full ${shimmerButtonClass} ${currentPath === "/" || currentPath === "/recruiter-lp" ? "" : "innerpage-nav"}`}
      >
        <div className="flex flex-row md:items-center justify-between max-w-7xl mx-auto gap-4 w-full relative z-20">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center justify-between w-full md:w-auto px-0 sm:px-0 gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden bg-black/10 p-2 rounded"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>

              <a
                href={isRecruiterPage ? "/recruiter-lp" : "/?v=c"}
                className="border-r border-transparent sm:border-gray-50/10 pr-0 sm:pr-6"
              >
                {isRecruiterPage ? 
                <><div className="relative -top-2"><img
                  src="/wisowl-withtext-white.svg"
                  alt="WisOwl Logo"
                  width="130"
                  className="h-auto"
                /> <span className="text-sm ml-2 text-white absolute -bottom-4 right-0">Recruiter</span></div></>
                 : <img
                  src="/wisowl-withtext-white.svg"
                  alt="WisOwl Logo"
                  width="130"
                  className="h-auto"
                />}
                
              </a>
            </div>

            {/* Center: Desktop nav */}
            <nav className="hidden lg:flex gap-4 items-center">
              {filteredNavLinks.map(({ label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  onClick={() => handleNavClick(label)}
                  className={`text-md transition text-shadow-2xs py-1 px-2 ${
                    currentPath === href
                      ? "text-white hover:text-brand-gold bg-black/20 rounded-md"
                      : "text-white hover:text-brand-gold"
                  } ${currentPath === "/" ? "" : ":text-brand-gold"}`}
                >
                  {label}
                </a>
              ))}

              {!isRecruiterPage &&
              <div
                className="relative"
                onMouseEnter={handleJobsEnter}
                onMouseLeave={handleJobsLeave}
              >
                <button
                  className={`text-md transition py-1 px-2 flex items-center gap-1 cursor-pointer ${
                    jobsOpen
                      ? "text-white bg-black/20 rounded-md"
                      : "text-white hover:text-brand-gold"
                  }`}
                  onClick={() => setJobsOpen((prev) => !prev)}
                >
                  Jobs
                  <ChevronDown
                    className={`w-4 h-4 text-white/40 transition-transform duration-200 ${
                      jobsOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {/* Invisible bridge zone */}
                {jobsOpen && <div className="absolute left-0 right-0 h-4 top-full" />}

                {/* Dropdown panel */}
                {jobsOpen && (
                  <div
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-[9999]"
                    style={{ isolation: "isolate" }}
                  >
                    {/* Arrow */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-sm shadow-sm" />

                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 w-[560px] text-gray-600 text-sm">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Column 1 */}
                        <div>
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                            Trending Jobs
                          </h4>
                          <ul className="space-y-1">
                           {TRENDING_JOBS.map((item) => (
                              <li key={item.path}>
                                <a href={`/jobs/${item.path}`}>
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 2 */}
                        <div>
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                            Jobs by Location
                          </h4>
                          <ul className="space-y-1">
                            {JOBS_BY_LOCATION.map((item) => (
                              <li key={item.path}>
                                <a href={`/jobs/${item.path}`}>
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                            Education
                          </h4>
                          <ul className="space-y-1">
                            {EDUCATION.map((item) => (
                              <li key={item.path}>
                                <a href={`/jobs/${item.path}`}>
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-medium">
                          Explore 4L+ jobs on WisOwl
                        </span>
                        <a
                          href="/"
                          className="text-[11px] font-bold text-brand-indigo hover:text-brand-slate transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setJobsOpen(false);
                            const queryParams = new URLSearchParams(window.location.search);
                            // Fallback to UTM cookie
                            if (!queryParams.has("utm_source")) {
                                try {
                                    const cookieMatch = document.cookie.match(/utm_data=([^;]+)/);
                                    if (cookieMatch) {
                                        const utmData = JSON.parse(decodeURIComponent(cookieMatch[1]));
                                        Object.entries(utmData).forEach(([key, value]) => {
                                            if (typeof value === "string") queryParams.set(key, value);
                                        });
                                    }
                                } catch (e) {
                                    console.error("Failed to parse utm_data cookie", e);
                                }
                            }
                            if (!queryParams.has("utm_source")) {
                                queryParams.set("utm_source", "wisowl_pso");
                            }
                            const utmData = {};
                            const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
                            utmKeys.forEach(key => {
                                if (queryParams.has(key)) utmData[key] = queryParams.get(key);
                            });
                            utmData["applied_from"] = "pseo";
                            try {
                                const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
                                const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".wisowl.com";
                                const domainAttr = isLocalhost ? "" : `;domain=${cookieDomain}`;
                                document.cookie = `utm_data=${encodeURIComponent(JSON.stringify(utmData))}${domainAttr};path=/;max-age=2592000`;
                            } catch (e) {
                                console.error("Failed to set cookies", e);
                            }
                            let targetAppUrl = process.env.NEXT_PUBLIC_APP_URL || appUrl || "https://app.wisowl.com";
                            if (targetAppUrl.endsWith('/')) targetAppUrl = targetAppUrl.slice(0, -1);
                            const viewJobsUrl = new URL(`${targetAppUrl}/jobs`);
                            queryParams.forEach((value, key) => {
                                viewJobsUrl.searchParams.set(key, value);
                            });
                            window.location.href = viewJobsUrl.toString();
                          }}
                        >
                          View all jobs →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              }
            </nav>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-row gap-1 sm:gap-2 items-center justify-start md:justify-end rounded p-0 sm:p-1 bg-transparent md:rounded-none md:p-0">
            <Button
              className="text-white outline-none border border-white/50 bg-transparent hover:border-white/30 py-2 px-5 rounded-lg"
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
              className="text-brand-midnight bg-brand-gold hover:border-transparent border border-brand-gold py-2 px-5 rounded-lg font-semibold"
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
                className="text-white outline-none border bg-transparent border-none hover:border-white/30 py-2 px-2 rounded-lg hidden sm:block"
                label="For Recruiters"
                onClick={() => {
                  GAHandleClick("ClickEmployerButtonNav", "LandingPage");
                  window.open(`/recruiter-lp`, "_self");
                }}
              />
            ) : (
              <Button
                className="text-white outline-none border bg-transparent border-none hover:border-white/30 py-2 px-2 rounded-lg hidden sm:block"
                label="For Candidates"
                onClick={() => {
                  GAHandleClick("ClickCandidateButtonNav", "LandingPage");
                  window.open(`/?v=c`, "_self");
                }}
              />
            )}
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-brand-midnight text-white p-6 transition-transform duration-300 z-50 shadow-xl ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button + Logo */}
        <div className="flex justify-between items-center mb-6 border-b border-brand-indigo/30 pb-4">
          <img
              src="/wisowl-withtext-white.svg"
              alt="WisOwl Logo"
              width="100"
              className="h-auto"
            />
          <button
            onClick={() => setDrawerOpen(false)}
            className="bg-brand-indigo/10 p-1 rounded"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 text-sm overflow-y-auto h-[80vh]">
          {/* Mobile Jobs accordion */}
          {!isRecruiterPage &&
          <div className="border-b border-white/10 pb-2">
            <button
              onClick={() => setMobileJobsOpen(!mobileJobsOpen)}
              className="flex items-center justify-between w-full py-3 text-white hover:text-brand-gold transition"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5" />
                <span className="font-medium">Jobs</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileJobsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileJobsOpen && (
              <div className="pl-0 py-2 space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Trending
                  </h4>
                  <ul className="space-y-2">
                    {TRENDING_JOBS.map((item) => (
                      <li key={item.path}>
                        <a href={`/jobs/${item.path}`}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Location
                  </h4>
                  <ul className="space-y-2">
                    {JOBS_BY_LOCATION.map((item) => (
                      <li key={item.path}>
                        <a href={`/jobs/${item.path}`}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Education
                  </h4>
                  <ul className="space-y-2">
                    {EDUCATION.map((item) => (
                      <li key={item.path}>
                        <a href={`/jobs/${item.path}`}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          }

          {filteredNavLinks.map(({ label, href, icon }, i) => (
            <a
              key={i}
              href={href}
              onClick={() => {
                setDrawerOpen(false);
                handleNavClick(label);
              }}
              className="flex items-center gap-3 py-3 border-b border-white/10 hover:text-brand-gold transition"
            >
              {icon}
              {label}
            </a>
          ))}

          <Button
            className="relative inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-brand-midnight bg-brand-gold shadow w-full"
            label="Login"
            onClick={() => {
              GAHandleClick("ClickLoginButtonMobileMenu", "LandingPage");
              if (isRecruiterPage) {
                window.open(`${appUrl}/recruiter/signin`, "_blank");
              } else {
                window.open(`${appUrl}/signin`, "_blank");
              }
            }}
          />
          <Button
            className="relative inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-brand-midnight bg-brand-gold shadow w-full"
            label="Sign up"
            onClick={() => {
              GAHandleClick("ClickSignupButtonMobileMenu", "LandingPage");
              if (isRecruiterPage) {
                window.open(`${appUrl}/recruiter/signup`, "_blank");
              } else {
                window.open(`${appUrl}/signup`, "_blank");
              }
            }}
          />
          {!isRecruiterPage ? (
            <Button
              className="relative inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white bg-transparent shadow border border-white/30 w-full"
              label="For Recruiters"
              onClick={() => {
                GAHandleClick("ClickEmployerButtonMobileMenu", "LandingPage");
                window.open(`/recruiter-lp`, "_self");
              }}
            />
          ) : (
            <Button
              className="relative inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white bg-transparent shadow border border-white/30 w-full"
              label="For Candidates"
              onClick={() => {
                GAHandleClick("ClickCandidateButtonMobileMenu", "LandingPage");
                window.open(`/?v=c`, "_self");
              }}
            />
          )}
        </nav>
      </div>

      {/* Blurred Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Header;