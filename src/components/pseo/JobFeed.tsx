"use client";

import React, { useState, useMemo } from 'react';
import { JobCard } from './JobCard';

export interface JobForFeed {
    id: string;
    role: string;
    company: string;
    location: string;
    salary: string;
    experience: string;
    tags: string[];
    isNew: boolean;
    description: string;
    createdAt?: string;
    matchScore?: number;
    companyLogo?: string;
    // Raw DB fields for filtering
    work_type: string;
    min_experience_years: number;
    max_experience_years: number;
    role_category: string;
    functional_area: string;
}

interface Filters {
    workMode: string[];
    experience: string[];
    department: string[];
}

interface JobFeedProps {
    jobs: JobForFeed[];
    totalCount: number;
    role: string;
    locationSuffix: string;
}

// Map filter checkbox labels to DB work_type values
const WORK_MODE_MAP: Record<string, string[]> = {
    'Remote': ['Remote', 'Work From Home', 'WFH'],
    'On-site': ['On-Site', 'On Site', 'Onsite'],
    'Hybrid': ['Hybrid'],
};

// Map experience filter ranges to min/max year ranges
const EXPERIENCE_MAP: Record<string, { min: number; max: number }> = {
    '0-2 Yrs': { min: 0, max: 2 },
    '3-5 Yrs': { min: 3, max: 5 },
    '6-10 Yrs': { min: 6, max: 10 },
    '10+ Yrs': { min: 10, max: 99 },
};

// Map department filters to DB role_category / functional_area values
const DEPARTMENT_MAP: Record<string, string[]> = {
    'Engineering': ['Engineering', 'Software Engineering', 'IT', 'Technology', 'Software Development'],
    'Product': ['Product', 'Product Management', 'Project Management'],
    'Design': ['Design', 'UX', 'UI', 'Creative'],
    'Marketing': ['Marketing', 'Sales', 'Digital Marketing', 'Business Development'],
};

export function JobFeed({ jobs, totalCount, role, locationSuffix }: JobFeedProps) {
    const [filters, setFilters] = useState<Filters>({
        workMode: [],
        experience: [],
        department: [],
    });

    const toggleFilter = (category: keyof Filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(v => v !== value)
                : [...prev[category], value],
        }));
    };

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // Work Mode filter
            if (filters.workMode.length > 0) {
                const jobWorkType = (job.work_type || '').toLowerCase();
                const matchesWorkMode = filters.workMode.some(mode => {
                    const dbValues = WORK_MODE_MAP[mode] || [];
                    return dbValues.some(v => jobWorkType.includes(v.toLowerCase()));
                });
                if (!matchesWorkMode) return false;
            }

            // Experience filter
            if (filters.experience.length > 0) {
                const jobMinExp = Number(job.min_experience_years) || 0;
                const matchesExp = filters.experience.some(exp => {
                    const range = EXPERIENCE_MAP[exp];
                    if (!range) return false;
                    return jobMinExp >= range.min && jobMinExp <= range.max;
                });
                if (!matchesExp) return false;
            }

            // Department filter
            if (filters.department.length > 0) {
                const jobCategory = (job.role_category || '').toLowerCase();
                const jobFuncArea = (job.functional_area || '').toLowerCase();
                const matchesDept = filters.department.some(dept => {
                    const dbValues = DEPARTMENT_MAP[dept] || [];
                    return dbValues.some(v => {
                        const lv = v.toLowerCase();
                        return jobCategory.includes(lv) || jobFuncArea.includes(lv);
                    });
                });
                if (!matchesDept) return false;
            }

            return true;
        });
    }, [jobs, filters]);

    const activeFilterCount = filters.workMode.length + filters.experience.length + filters.department.length;

    return (
        <>
            {/* LEFT COLUMN: Filters (Sticky) - spans 2 cols */}
            <div className="hidden lg:block lg:col-span-2">
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                        <div className="mb-4 min-h-[56px]">
                            <h3 className="font-bold text-gray-900 text-lg">All Filters</h3>
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={() => setFilters({ workMode: [], experience: [], department: [] })}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-200 rounded-full px-3 py-1.5 mt-2 hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear all
                                </button>
                            )}
                        </div>

                        <hr className="border-gray-100 mb-5" />

                        {/* Work Mode Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-3 text-sm">Work mode</h4>
                            <div className="space-y-2">
                                {Object.keys(WORK_MODE_MAP).map((mode) => (
                                    <label key={mode} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.workMode.includes(mode)}
                                                onChange={() => toggleFilter('workMode', mode)}
                                                className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer"
                                            />
                                        </div>
                                        <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">{mode}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Experience Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-3 text-sm">Experience</h4>
                            <div className="space-y-2">
                                {Object.keys(EXPERIENCE_MAP).map((exp) => (
                                    <label key={exp} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.experience.includes(exp)}
                                                onChange={() => toggleFilter('experience', exp)}
                                                className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer"
                                            />
                                        </div>
                                        <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">{exp}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Department Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-3 text-sm">Department</h4>
                            <div className="space-y-2">
                                {Object.keys(DEPARTMENT_MAP).map((dept) => (
                                    <label key={dept} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.department.includes(dept)}
                                                onChange={() => toggleFilter('department', dept)}
                                                className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer"
                                            />
                                        </div>
                                        <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">{dept}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CENTER COLUMN: Job Feed - spans 7 cols */}
            <div className="col-span-1 lg:col-span-7 space-y-4 pb-8">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl font-bold text-gray-900">
                        {role} Jobs{locationSuffix}
                    </h1>
                    <span className="text-sm text-gray-500">
                        {activeFilterCount > 0
                            ? `${filteredJobs.length} of ${totalCount.toLocaleString('en-IN')}+ Jobs`
                            : `${totalCount > 20 ? '1–20' : `1–${jobs.length}`} of ${totalCount.toLocaleString('en-IN')}+ Jobs`
                        }
                    </span>
                </div>

                {/* Active filters indicator */}
                {activeFilterCount > 0 && filteredJobs.length === 0 && (
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-700">
                        No jobs match the selected filters. Try removing some filters.
                    </div>
                )}

                {/* Real Job Listings */}
                {filteredJobs.map((job, idx) => (
                    <JobCard
                        key={job.id}
                        id={job.id}
                        role={job.role}
                        company={job.company}
                        location={job.location}
                        experience={job.experience}
                        salary={job.salary}
                        tags={job.tags}
                        description={job.description}
                        createdAt={job.createdAt}
                        matchScore={job.matchScore}
                        companyLogo={job.companyLogo}
                    />
                ))}
            </div>
        </>
    );
}
