/**
 * State-City Mapping for India
 * Maps cities to their respective states for hierarchical sitemap generation
 */

export const CITY_TO_STATE_MAP: Record<string, string> = {
    // Karnataka
    'bangalore': 'karnataka',
    'bengaluru': 'karnataka',
    'mysore': 'karnataka',
    'mysuru': 'karnataka',
    'mangalore': 'karnataka',
    'hubli': 'karnataka',
    'belgaum': 'karnataka',

    // Maharashtra
    'mumbai': 'maharashtra',
    'pune': 'maharashtra',
    'nagpur': 'maharashtra',
    'nashik': 'maharashtra',
    'aurangabad': 'maharashtra',
    'thane': 'maharashtra',

    // Tamil Nadu
    'chennai': 'tamil-nadu',
    'coimbatore': 'tamilnadu',
    'madurai': 'tamil-nadu',
    'tiruchirappalli': 'tamil-nadu',
    'tiruchirapalli': 'tamil-nadu',
    'trichy': 'tamil-nadu',
    'salem': 'tamil-nadu',

    // Delhi NCR
    'delhi': 'delhi-ncr',
    'new delhi': 'delhi-ncr',
    'noida': 'delhi-ncr',
    'gurgaon': 'delhi-ncr',
    'gurugram': 'delhi-ncr',
    'faridabad': 'delhi-ncr',
    'ghaziabad': 'delhi-ncr',

    // Telangana
    'hyderabad': 'telangana',
    'secunderabad': 'telangana',
    'warangal': 'telangana',

    // Andhra Pradesh
    'visakhapatnam': 'andhra-pradesh',
    'vijayawada': 'andhra-pradesh',
    'guntur': 'andhra-pradesh',
    'tirupati': 'andhra-pradesh',

    // Gujarat
    'ahmedabad': 'gujarat',
    'surat': 'gujarat',
    'vadodara': 'gujarat',
    'rajkot': 'gujarat',

    // West Bengal
    'kolkata': 'west-bengal',
    'howrah': 'west-bengal',
    'durgapur': 'west-bengal',

    // Rajasthan
    'jaipur': 'rajasthan',
    'jodhpur': 'rajasthan',
    'udaipur': 'rajasthan',
    'kota': 'rajasthan',

    // Uttar Pradesh
    'lucknow': 'uttar-pradesh',
    'kanpur': 'uttar-pradesh',
    'agra': 'uttar-pradesh',
    'varanasi': 'uttar-pradesh',

    // Kerala
    'kochi': 'kerala',
    'thiruvananthapuram': 'kerala',
    'kozhikode': 'kerala',
    'thrissur': 'kerala',

    // Madhya Pradesh
    'indore': 'madhya-pradesh',
    'bhopal': 'madhya-pradesh',
    'jabalpur': 'madhya-pradesh',

    // Punjab
    'chandigarh': 'punjab-chandigarh',
    'ludhiana': 'punjab-chandigarh',
    'amritsar': 'punjab-chandigarh',
    'jalandhar': 'punjab-chandigarh',
};

/**
 * State display names for URLs and titles
 */
export const STATE_NAMES: Record<string, string> = {
    'karnataka': 'Karnataka',
    'maharashtra': 'Maharashtra',
    'tamil-nadu': 'Tamil Nadu',
    'delhi-ncr': 'Delhi NCR',
    'telangana': 'Telangana',
    'andhra-pradesh': 'Andhra Pradesh',
    'gujarat': 'Gujarat',
    'west-bengal': 'West Bengal',
    'rajasthan': 'Rajasthan',
    'uttar-pradesh': 'Uttar Pradesh',
    'kerala': 'Kerala',
    'madhya-pradesh': 'Madhya Pradesh',
    'punjab-chandigarh': 'Punjab & Chandigarh',
};

/**
 * Get state slug for a given city name
 * @param city - City name (case insensitive)
 * @returns State slug or 'other' if not found
 */
export function getStateForCity(city: string): string {
    const normalizedCity = city.toLowerCase().trim();
    return CITY_TO_STATE_MAP[normalizedCity] || 'other';
}

/**
 * Get all cities grouped by state
 * @returns Map of state slug to array of city names
 */
export function getCitiesByState(): Map<string, string[]> {
    const stateMap = new Map<string, string[]>();

    Object.entries(CITY_TO_STATE_MAP).forEach(([city, state]) => {
        if (!stateMap.has(state)) {
            stateMap.set(state, []);
        }
        // Capitalize city name for display
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);
        stateMap.get(state)!.push(cityName);
    });

    return stateMap;
}

/**
 * Get all unique state slugs
 * @returns Array of state slugs
 */
export function getAllStates(): string[] {
    return Array.from(new Set(Object.values(CITY_TO_STATE_MAP))).sort();
}

/**
 * Normalize city name for URL slugs
 * @param city - City name
 * @returns Normalized city slug
 */
export function normalizeCityForUrl(city: string): string {
    return city.toLowerCase().trim().replace(/\s+/g, '-');
}
