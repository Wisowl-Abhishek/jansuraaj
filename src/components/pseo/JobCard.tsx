"use client";

import React, { useState } from 'react';
import { JobDetailsModal } from './JobDetailsModal';

interface JobCardProps {
    id: string;
    role: string;
    company: string;
    location?: string;
    salary?: string;
    experience: string;
    tags: string[];
    description?: string;
    matchScore?: number;
    externalLink?: string;
    companyLogo?: string;
    createdAt?: string;
}

export function JobCard({ id, role, company, location, salary, experience, tags, description, matchScore, externalLink, companyLogo, createdAt }: JobCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate time ago and early applicant status
    const getTimeAgo = (dateStr?: string) => {
        if (!dateStr) return null;
        const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const isEarlyApplicant = (dateStr?: string) => {
        if (!dateStr) return false;
        const diffInHours = (new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60);
        return diffInHours < 24;
    };

    const timeAgo = getTimeAgo(createdAt);
    const earlyApplicant = isEarlyApplicant(createdAt);

    // Determine match score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (score >= 60) return 'text-brand-indigo bg-brand-indigo/10 border-brand-indigo/20';
        if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-gray-500 bg-gray-50 border-gray-200';
    };

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden cursor-pointer"
            >
                {/* Left Access: Color Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-brand-indigo transition-colors duration-200 rounded-l-xl"></div>

                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-1">
                            {companyLogo && (
                                <img
                                    src={companyLogo}
                                    alt={`${company} logo`}
                                    className="w-8 h-8 rounded object-contain border border-gray-100"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            )}
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-indigo transition-colors">
                                {role}
                            </h3>
                        </div>

                        <p className="text-sm font-medium text-gray-600 mb-3">{company}</p>

                        {/* Metadata Row */}
                        <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span>{experience}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{salary || 'Not Disclosed'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{location}</span>
                            </div>
                        </div>


                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Status Tags (Time Ago & Early Applicant) - Moved to bottom */}
                        {timeAgo && (
                            <div className="flex items-center gap-3 mt-4">
                                <div className="px-3 py-1 rounded-full bg-gray-100/50 border border-gray-200/50 flex items-center gap-1.5">
                                    <span className="text-[11px] font-medium text-gray-500 tracking-wide">
                                        {timeAgo}
                                    </span>
                                </div>
                                
                                {earlyApplicant && (
                                    <div className="px-3 py-1 rounded-full bg-brand-indigo/5 border border-brand-indigo/10 flex items-center gap-1.5 group/tag transition-all duration-300">
                                        <svg 
                                            className="w-3.5 h-3.5 text-amber-500 animate-pulse" 
                                            fill="currentColor" 
                                            viewBox="0 0 20 20"
                                        >
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[11px] font-bold text-indigo-600 tracking-wide">
                                            Be an early applicant
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Side: Match Score */}
                    <div className="flex flex-col items-center gap-4 ml-4">
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 min-w-[110px] bg-gray-50/80 cursor-default">
                            <div className="mb-2 p-2.5 rounded-full bg-white shadow-sm border border-gray-100">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-gray-500 mb-2.5">Match Score</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
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

                                    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://jansuraajapp.wisowl.com";
                                    const baseUrl = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl;
                                    window.location.href = `${baseUrl}/jobs/${id}?${queryParams.toString()}`;
                                }}
                                className="text-[11px] font-bold text-white bg-gray-900 rounded-full px-5 py-2 shadow-sm hover:bg-gray-800 hover:shadow-md hover:scale-105 transition-all duration-200 whitespace-nowrap block text-center w-full"
                            >
                                Login to Check
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 flex items-center justify-end">
                    <button className="text-brand-indigo text-sm font-semibold hover:underline flex items-center gap-1">
                        View Details
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <JobDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                job={{ id, role, company, location, salary, experience, tags, description }}
            />
        </>
    );
}
