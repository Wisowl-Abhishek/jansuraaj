"use client";

import React, { useEffect } from 'react';

interface JobDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: {
        id: string;
        role: string;
        company: string;
        location?: string;
        salary?: string;
        experience: string;
        tags: string[];
        description?: string;
    };
}

export function JobDetailsModal({ isOpen, onClose, job }: JobDetailsModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all animate-in fade-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {/* Header */}
                <div className="sticky top-0 bg-brand-indigo z-10 border-b border-white/10 flex items-start justify-between p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{job.role}</h2>
                        <p className="text-base font-medium text-white/90">{job.company}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-8">
                    {/* Key Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Salary</span>
                            <span className="text-sm font-bold text-gray-900">{job.salary || 'Not Disclosed'}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Experience</span>
                            <span className="text-sm font-bold text-gray-900">{job.experience}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Location</span>
                            <span className="text-sm font-bold text-gray-900">{job.location || 'Remote'}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Job Mode</span>
                            <span className="text-sm font-bold text-gray-900">
                                {job.location?.toLowerCase().includes('remote') ? 'Remote' : 'On-site'}
                            </span>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Job Description</h3>
                        <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                            {job.description || `We are looking for a talented and passionate ${job.role} to join our growing team at ${job.company}.

Key Responsibilities:
• Collaborate with cross-functional teams to define, design, and ship new features.
• Write clean, maintainable, and efficient code.
• Participate in code reviews and advocate for best practices.
• Troubleshoot and resolve technical issues.

Requirements:
• Proven experience as a ${job.role} or similar role.
• Strong understanding of relevant technologies and frameworks.
• Excellent problem-solving and communication skills.
• Ability to work independently and as part of a team.`}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Skills & Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer / Apply Button */}
                <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={() => {
                            const queryParams = new URLSearchParams(window.location.search);
                            
                            // Fallback to UTM cookie if URL parameters are missing UTMs
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

                            // 1. Set a shared-domain cookie to help the app maintain context 
                            // through any internal redirects (since pSEO and app share .wisowl.com)
                            const utmData: Record<string, string> = {};
                            const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
                            utmKeys.forEach(key => {
                                if (queryParams.has(key)) utmData[key] = queryParams.get(key) as string;
                            });
                            // Add current job_id as well
                            utmData["job_id"] = job.id;
                            utmData["applied_from"] = "pseo";

                            try {
                                const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
                                const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".wisowl.com";
                                const domainAttr = isLocalhost ? "" : `;domain=${cookieDomain}`;
                                
                                document.cookie = `utm_data=${encodeURIComponent(JSON.stringify(utmData))}${domainAttr};path=/;max-age=2592000`;
                                document.cookie = `applied_job_id=${job.id}${domainAttr};path=/;max-age=1800`;
                            } catch (e) {
                                console.error("Failed to set cookies", e);
                            }

                            // 2. Redirect to the direct job URL on the main application.
                            // The app's internal middleware will handle auth states (logged-in, guest, new user).
                            let appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wisowl.com";
                            if (appUrl.endsWith('/')) appUrl = appUrl.slice(0, -1);
                            
                            const jobUrl = new URL(`${appUrl}/jobs/${job.id}`);
                            
                            // Propagate all current query params (UTMs, etc.)
                            queryParams.forEach((value, key) => {
                                jobUrl.searchParams.set(key, value);
                            });

                            window.location.href = jobUrl.toString();
                        }}
                        className="bg-brand-indigo hover:bg-brand-slate text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        Apply Now
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
