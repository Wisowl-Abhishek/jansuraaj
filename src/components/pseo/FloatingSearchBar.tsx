"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUserLocation } from '@/hooks/useUserLocation';

export function FloatingSearchBar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [locationAutoFilled, setLocationAutoFilled] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const userLocation = useUserLocation(isExpanded);

    // Hold the pre-built semantic index of valid static routes
    const [searchIndex, setSearchIndex] = useState<{ role: string, location: string, slug: string }[]>([]);

    const [knownLocations, setKnownLocations] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (searchIndex.length > 0) {
            const locs = new Set(searchIndex.map(i => i.location.toLowerCase()));
            setKnownLocations(locs);
        }
    }, [searchIndex]);

    // Fetch the index precisely once the search bar expands
    // useEffect(() => {
    //     if (isExpanded && searchIndex.length === 0) {
    //         fetch('/search-index.json')
    //             .then(res => res.json())
    //             .then(data => setSearchIndex(data))
    //             .catch(err => console.warn('Semantic search index not found, falling back to basic route interpolation', err));
    //     }
    // }, [isExpanded, searchIndex.length]);

    // Handle click outside to collapse
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        }

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded]);

    const cleanSlug = (s: string) => {
        return s.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleSearch = () => {
        if (!keyword.trim() && !locationInput.trim()) return;

        // Normalize inputs
        let k = keyword.trim().toLowerCase();
        let l = locationInput.trim().toLowerCase();

        // Smart Split: If location is empty, check if keyword contains a known city
        if (!l && k) {
            const words = k.split(/\s+/);
            for (const word of words) {
                if (knownLocations.has(word)) {
                    l = word;
                    // Remove the location name from the keyword
                    k = k.replace(new RegExp(`\\b${word}\\b`, 'gi'), '').replace(/\s+/g, ' ').trim();
                    break;
                }
            }
        }

        let targetSlug = '';

        if (searchIndex.length > 0) {
            // Priority 1: Exact Semantic match on both Role + Location
            if (l && k) {
                const exact = searchIndex.find(i => i.role.toLowerCase() === k && i.location.toLowerCase() === l);
                if (exact) targetSlug = exact.slug;

                if (!targetSlug) {
                    const partial = searchIndex.find(i => i.role.toLowerCase().includes(k) && i.location.toLowerCase().includes(l));
                    if (partial) targetSlug = partial.slug;
                }
            }

            // Priority 2: Semantic match on Role only (ONLY if no location typed OR no match found with location)
            if (!targetSlug && k) {
                const exactRole = searchIndex.find(i => i.role.toLowerCase() === k);
                if (exactRole) targetSlug = exactRole.slug;

                if (!targetSlug) {
                    // Refined partial role matching - Avoid matching roles where input is too short or greedy
                    const partialRole = searchIndex.find(i => i.role.toLowerCase().includes(k));
                    if (partialRole) targetSlug = partialRole.slug;
                }
            }

            // Priority 3: Semantic match on Location only (if they typed no role)
            if (!targetSlug && !k && l) {
                const exactLoc = searchIndex.find(i => i.location.toLowerCase() === l);
                if (exactLoc) targetSlug = exactLoc.slug;

                if (!targetSlug) {
                    const partialLoc = searchIndex.find(i => i.location.toLowerCase().includes(l));
                    if (partialLoc) targetSlug = partialLoc.slug;
                }
            }
        }

        // Priority 4: Ultimate fallback to hardcoded string interpolation
        if (!targetSlug) {
            const rolePart = cleanSlug(k);
            const locPart = cleanSlug(l);
            targetSlug = locPart ? (rolePart ? `${rolePart}-${locPart}` : locPart) : rolePart;
        }

        // PARANOID FINAL SAFETY: Ensure even if targetSlug came from the index, it's URL-safe (no spaces from DB rows)
        const finalSlug = cleanSlug(targetSlug);

        // Limit length for Windows safety
        const truncatedSlug = finalSlug.length > 200
            ? finalSlug.substring(0, 200).replace(/-+$/, '')
            : finalSlug;

        router.push(`/jobs/${truncatedSlug}`);
        setIsExpanded(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div
            className={`sticky bottom-22 sm:bottom-4 mx-auto transition-all duration-500 ease-in-out ${isExpanded ? 'w-[95%] max-w-4xl' : 'w-[90%] max-w-[380px]'}`}
        >
            <div
                ref={searchBarRef}
                className={`shadow-2xl transition-all duration-500 ease-in-out relative overflow-hidden bg-gradient-to-r from-[#fdf2f8] via-[#e0e7ff] to-[#e0e7ff] ${isExpanded ? 'rounded-full p-2' : 'rounded-full cursor-pointer hover:scale-105'}`}
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                {/* Collapsed State */}
                <div className={`flex items-center gap-4 pl-6 pr-2 py-2 transition-opacity duration-300 ${!isExpanded ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                    <span className="text-gray-500 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">Enter keyword / designation</span>
                    <div className="w-10 h-10 bg-brand-indigo rounded-full flex items-center justify-center text-white shadow-lg shrink-0 ml-auto">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Expanded State */}
                <div className={`flex items-center justify-between w-full transition-opacity duration-500 delay-100 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}>

                    {/* 1. Keyword Input */}
                    <div className="flex-1 flex items-center gap-3 px-4 border-r border-gray-300/50">
                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Role, Company or Skills"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
                        />
                    </div>

                    {/* 2. Experience (Dropdown/Input) */}
                    <div className="flex-[0.6] hidden md:flex items-center gap-3 px-4 border-r border-gray-300/50">
                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <select className="bg-transparent border-none outline-none text-sm text-gray-500 w-full cursor-pointer appearance-none">
                            <option>Select Experience</option>
                            <option>Fresher</option>
                            <option>1-3 Years</option>
                            <option>3-5 Years</option>
                            <option>5+ Years</option>
                        </select>
                    </div>

                    {/* 3. Location Input */}
                    <div className="flex-[0.8] hidden sm:flex items-center gap-3 px-4">
                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder={userLocation.loading ? 'Detecting...' : 'Location'}
                            value={locationInput}
                            onChange={(e) => { setLocationInput(e.target.value); setLocationAutoFilled(false); }}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="flex items-center gap-2 pl-2 pr-1">
                        <button
                            onClick={handleSearch}
                            className="w-10 h-10 bg-brand-indigo rounded-full flex items-center justify-center text-white shadow-lg hover:bg-brand-slate transition-colors transform active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
