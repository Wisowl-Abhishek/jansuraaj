// "use client";

// import Link from 'next/link';
// import React, { useState, useRef, useEffect } from 'react';

// // Dropdown data — 5 items each
// // const TRENDING_JOBS = [
// //     { label: 'Software Developer', path: '/jobs/software-developer' },
// //     { label: 'Data Analyst', path: '/jobs/data-analyst' },
// //     { label: 'Product Manager', path: '/jobs/product-manager' },
// //     { label: 'DevOps Engineer', path: '/jobs/devops-engineer' },
// //     { label: 'Full Stack Developer', path: '/jobs/full-stack-developer' },
// // ];

// // const JOBS_BY_LOCATION = [
// //     { label: 'Jobs in Bangalore', path: '/jobs/jobs-bangalore' },
// //     { label: 'Jobs in Mumbai', path: '/jobs/jobs-mumbai' },
// //     { label: 'Jobs in Delhi', path: '/jobs/jobs-delhi' },
// //     { label: 'Jobs in Hyderabad', path: '/jobs/jobs-hyderabad' },
// //     { label: 'Jobs in Chennai', path: '/jobs/jobs-chennai' },
// // ];

// // const EDUCATION = [
// //     { label: 'Fresher Jobs', path: '/jobs/fresher-jobs' },
// //     { label: 'Internships', path: '/jobs/internships' },
// //     { label: 'Graduate Trainee', path: '/jobs/graduate-trainee' },
// //     { label: 'MBA Jobs', path: '/jobs/mba-jobs' },
// //     { label: 'BCA Jobs', path: '/jobs/bca-jobs' },
// // ];

// export function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const wrapperRef = useRef<HTMLDivElement>(null);
//     const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     // Single hover zone: trigger + dropdown are inside the same wrapper
//     const handleEnter = () => {
//         if (timeoutRef.current) clearTimeout(timeoutRef.current);
//         setIsOpen(true);
//     };

//     const handleLeave = () => {
//         timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
//     };

//     // Close on Escape key
//     useEffect(() => {
//         const handleKey = (e: KeyboardEvent) => {
//             if (e.key === 'Escape') setIsOpen(false);
//         };
//         document.addEventListener('keydown', handleKey);
//         return () => document.removeEventListener('keydown', handleKey);
//     }, []);

//     return (
//         <div className="w-full bg-gradient-to-r from-[#d97c48] via-[#a85a6a] to-[#1e3a8a] py-6 px-4 sm:px-6 lg:px-8 relative z-50">
//             <nav className="max-w-7xl mx-auto bg-[#2a1b1b]/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl px-6 py-3 flex items-center justify-between relative">

//                 {/* Left: Logo */}
//                 <Link href="https://www.wisowl.com/" className="flex items-center gap-3 group">
//                     <img src="/wisowl.svg" alt="WisOwl Logo" className="w-8 h-8 object-contain brightness-0 invert" />
//                     <span className="text-2xl font-bold text-white tracking-tight">WisOwl</span>
//                 </Link>

//                 {/* Center: Navigation Links */}
//                 <div className="hidden md:flex items-center gap-8">

//                     {/* Jobs trigger + dropdown wrapper — single hover zone */}
//                     <div
//                         ref={wrapperRef}
//                         className="relative"
//                         onMouseEnter={handleEnter}
//                         onMouseLeave={handleLeave}
//                     >
//                         <button
//                             className="text-sm font-bold text-white/90 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
//                             onClick={() => setIsOpen(prev => !prev)}
//                         >
//                             Jobs
//                             <svg
//                                 className={`w-3 h-3 text-white/50 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`}
//                                 fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>

//                         {/* Invisible bridge zone — fills the gap between button and dropdown */}
//                         {isOpen && <div className="absolute left-0 right-0 h-6 top-full" />}

//                         {/* Dropdown panel */}
//                         {isOpen && (
//                             <div
//                                 className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-[9999]"
//                                 style={{ isolation: 'isolate' }}
//                             >
//                                 {/* Arrow */}
//                                 <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 rounded-sm shadow-sm" />

//                                 <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 w-[560px]">
//                                     <div className="grid grid-cols-3 gap-6">

//                                         {/* Column 1 */}
//                                         <div>
//                                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Trending Jobs</h4>
//                                             <ul className="space-y-1">
//                                                 {/* {TRENDING_JOBS.map((item) => (
//                                                     <li key={item.path}>
//                                                         <Link
//                                                             href={item.path}
//                                                             className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 block rounded-md px-2 py-1.5 -mx-2 transition-colors"
//                                                             onClick={() => setIsOpen(false)}
//                                                         >
//                                                             {item.label}
//                                                         </Link>
//                                                     </li>
//                                                 ))} */}
//                                             </ul>
//                                         </div>

//                                         {/* Column 2 */}
//                                         <div>
//                                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Jobs by Location</h4>
//                                             <ul className="space-y-1">
//                                                 {/* {JOBS_BY_LOCATION.map((item) => (
//                                                     <li key={item.path}>
//                                                         <Link
//                                                             href={item.path}
//                                                             className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 block rounded-md px-2 py-1.5 -mx-2 transition-colors"
//                                                             onClick={() => setIsOpen(false)}
//                                                         >
//                                                             {item.label}
//                                                         </Link>
//                                                     </li>
//                                                 ))} */}
//                                             </ul>
//                                         </div>

//                                         {/* Column 3 */}
//                                         <div>
//                                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Education</h4>
//                                             <ul className="space-y-1">
//                                                 {/* {EDUCATION.map((item) => (
//                                                     <li key={item.path}>
//                                                         <Link
//                                                             href={item.path}
//                                                             className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 block rounded-md px-2 py-1.5 -mx-2 transition-colors"
//                                                             onClick={() => setIsOpen(false)}
//                                                         >
//                                                             {item.label}
//                                                         </Link>
//                                                     </li>
//                                                 ))} */}
//                                             </ul>
//                                         </div>
//                                     </div>

//                                     {/* Footer */}
//                                     <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
//                                         <span className="text-xs text-gray-400">Explore 4L+ jobs on WisOwl</span>
//                                         <button
//                                             className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 setIsOpen(false);
                                                
//                                                 const queryParams = new URLSearchParams(window.location.search);
//                                                 if (!queryParams.has("utm_source")) {
//                                                     try {
//                                                         const cookieMatch = document.cookie.match(/utm_data=([^;]+)/);
//                                                         if (cookieMatch) {
//                                                             const utmData = JSON.parse(decodeURIComponent(cookieMatch[1]));
//                                                             Object.entries(utmData).forEach(([key, value]) => {
//                                                                 if (typeof value === "string") queryParams.set(key, value);
//                                                             });
//                                                         }
//                                                     } catch (err) {
//                                                         console.error("Failed to parse utm_data cookie", err);
//                                                     }
//                                                 }
//                                                 if (!queryParams.has("utm_source")) {
//                                                     queryParams.set("utm_source", "wisowl_pso");
//                                                 }
//                                                 const utmData: Record<string, string> = {};
//                                                 const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
//                                                 utmKeys.forEach(key => {
//                                                     if (queryParams.has(key)) utmData[key] = queryParams.get(key) as string;
//                                                 });
//                                                 utmData["applied_from"] = "pseo";
                                                
//                                                 try {
//                                                     const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
//                                                     const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".wisowl.com";
//                                                     const domainAttr = isLocalhost ? "" : `;domain=${cookieDomain}`;
//                                                     document.cookie = `utm_data=${encodeURIComponent(JSON.stringify(utmData))}${domainAttr};path=/;max-age=2592000`;
//                                                 } catch (err) {}
                                                
//                                                 let targetAppUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wisowl.com";
//                                                 if (targetAppUrl.endsWith('/')) targetAppUrl = targetAppUrl.slice(0, -1);
//                                                 const targetUrl = new URL(`${targetAppUrl}/jobs`);
//                                                 queryParams.forEach((value, key) => {
//                                                     targetUrl.searchParams.set(key, value);
//                                                 });
//                                                 window.location.href = targetUrl.toString();
//                                             }}
//                                         >
//                                             View all jobs →
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <Link href="https://www.wisowl.com/" className="text-sm font-bold text-white/90 hover:text-white transition-colors">
//                         Resume Builder
//                     </Link>
//                     <Link href="https://www.wisowl.com/contact" className="text-sm font-bold text-white/90 hover:text-white transition-colors">
//                         Contact
//                     </Link>
//                 </div>

//                 {/* Right: Auth Buttons */}
//                 <div className="flex items-center gap-4">
//                     <Link href="https://www.wisowl.com/" className="px-5 py-2 rounded-lg border border-white/30 text-white text-sm font-bold hover:bg-white/10 transition-colors">
//                         Login
//                     </Link>
//                     <Link href="https://www.wisowl.com/" className="px-6 py-2 bg-[#ffcc80] hover:bg-[#ffb74d] text-gray-900 text-sm font-bold rounded-lg shadow-md transition-all duration-200">
//                         Register
//                     </Link>
//                 </div>
//             </nav>
//         </div>
//     );
// }
