"use client";

import { useState, useEffect } from 'react';

interface LocationResult {
    city: string;
    state: string;
    loading: boolean;
    error: string | null;
}

// Major cities with jobs in the database — these are the only valid location values
const MAJOR_CITIES = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Vadodara',
    'Surat', 'Noida', 'Gurugram', 'Chandigarh', 'Kochi',
    'Coimbatore', 'Madurai', 'Mysore', 'Mangalore',
    'Visakhapatnam', 'Patna', 'Ranchi', 'Bhubaneswar',
    'Guwahati', 'Dehradun', 'Thiruvananthapuram',
];

// Map state names to nearest major job hub city in that state
const STATE_TO_CITY: Record<string, string> = {
    'karnataka': 'Bangalore',
    'maharashtra': 'Mumbai',
    'delhi': 'Delhi',
    'new delhi': 'Delhi',
    'telangana': 'Hyderabad',
    'andhra pradesh': 'Hyderabad',
    'tamil nadu': 'Chennai',
    'west bengal': 'Kolkata',
    'gujarat': 'Ahmedabad',
    'rajasthan': 'Jaipur',
    'uttar pradesh': 'Noida',
    'madhya pradesh': 'Indore',
    'haryana': 'Gurugram',
    'punjab': 'Chandigarh',
    'kerala': 'Kochi',
    'odisha': 'Bhubaneswar',
    'bihar': 'Patna',
    'jharkhand': 'Ranchi',
    'assam': 'Guwahati',
    'uttarakhand': 'Dehradun',
    'goa': 'Pune',
    'chhattisgarh': 'Nagpur',
};

/**
 * Resolves a detected city/state to the nearest major city that
 * actually has jobs in our database.
 */
function resolveToKnownCity(detectedCity: string, detectedState: string): string {
    // 1. Check if the detected city itself is a known major city (fuzzy match)
    const cityLower = detectedCity.toLowerCase().trim();
    for (const major of MAJOR_CITIES) {
        const majorLower = major.toLowerCase();
        if (
            cityLower === majorLower ||
            cityLower.includes(majorLower) ||
            majorLower.includes(cityLower) ||
            // Handle common aliases
            (cityLower === 'bengaluru' && majorLower === 'bangalore') ||
            (cityLower === 'gurugram' && majorLower === 'gurugram') ||
            (cityLower === 'gurgaon' && majorLower === 'gurugram') ||
            (cityLower === 'mysuru' && majorLower === 'mysore')
        ) {
            return major;
        }
    }

    // 2. Fall back to the state's major job hub
    const stateLower = detectedState.toLowerCase().trim();
    if (STATE_TO_CITY[stateLower]) {
        return STATE_TO_CITY[stateLower];
    }

    // 3. Last resort: return Bangalore as the default metro
    return 'Bangalore';
}

/**
 * Custom hook that requests browser geolocation permission and
 * reverse-geocodes coordinates into a known major city name.
 * Only triggers when `enabled` is true (e.g. when search bar is expanded).
 */
export function useUserLocation(enabled: boolean): LocationResult {
    const [result, setResult] = useState<LocationResult>({
        city: '',
        state: '',
        loading: false,
        error: null,
    });

    useEffect(() => {
        if (!enabled) return;
        if (result.city) return;
        if (!navigator.geolocation) {
            setResult(prev => ({ ...prev, error: 'Geolocation not supported' }));
            return;
        }

        setResult(prev => ({ ...prev, loading: true }));

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
                        {
                            headers: {
                                'Accept-Language': 'en',
                                'User-Agent': 'WisOwl-JobSearch/1.0',
                            },
                        }
                    );
                    const data = await response.json();

                    const rawCity =
                        data.address?.city ||
                        data.address?.town ||
                        data.address?.village ||
                        data.address?.county ||
                        '';
                    const rawState = data.address?.state || '';

                    // Resolve to a known major city with actual job listings
                    const resolvedCity = resolveToKnownCity(rawCity, rawState);

                    setResult({ city: resolvedCity, state: rawState, loading: false, error: null });
                } catch {
                    setResult(prev => ({ ...prev, loading: false, error: 'Failed to detect location' }));
                }
            },
            (err) => {
                setResult(prev => ({
                    ...prev,
                    loading: false,
                    error: err.code === 1 ? 'Location permission denied' : 'Location unavailable',
                }));
            },
            { timeout: 8000, enableHighAccuracy: false }
        );
    }, [enabled, result.city]);

    return result;
}
