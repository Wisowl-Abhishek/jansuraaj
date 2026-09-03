import pg from 'pg';
import { cache } from 'react';

const { Pool } = pg;

// Singleton pool for the read replica
let pool: pg.Pool | null = null;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function getPool(): pg.Pool {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
            // max: 1 prevents each build worker from opening multiple PgBouncer
            // sessions simultaneously. Next.js spawns N workers (one per CPU core),
            // so total connections = N × max. Session-mode PgBouncer has a hard cap
            // on total clients, so keeping max=1 is the safest setting for SSG builds.
            max: 1,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 60000,
            maxUses: 7500,
        });
    }
    return pool;
}

// ---------- Slug Parsing ----------

// Known Indian city names for slug splitting
const KNOWN_CITIES = new Set([
    'bangalore', 'bengaluru', 'mumbai', 'delhi', 'hyderabad', 'chennai',
    'kolkata', 'pune', 'ahmedabad', 'jaipur', 'lucknow', 'kanpur',
    'nagpur', 'indore', 'thane', 'bhopal', 'visakhapatnam', 'vadodara',
    'ghaziabad', 'ludhiana', 'agra', 'nashik', 'faridabad', 'rajkot',
    'varanasi', 'srinagar', 'aurangabad', 'coimbatore', 'madurai',
    'gurgaon', 'gurugram', 'noida', 'chandigarh', 'mysore', 'mysuru',
    'mangalore', 'hubli', 'belgaum', 'kochi', 'thiruvananthapuram',
    'kozhikode', 'thrissur', 'surat', 'jodhpur', 'udaipur', 'kota',
    'howrah', 'durgapur', 'jabalpur', 'amritsar', 'jalandhar', 'salem',
    'trichy', 'tiruchirappalli', 'secunderabad', 'warangal', 'vijayawada',
    'guntur', 'tirupati', 'hosur', 'marhowrah', 'patna', 'ranchi',
    'bhubaneswar', 'guwahati', 'dehradun', 'shimla', 'jammu',
]);

export interface ParsedSlug {
    role: string;
    location: string;
}


/**
 * Splits a pSEO slug like "python-developer-bengaluru" into { role, location }.
 * Strategy: walk from the end of the hyphenated segments and check for known cities.
 * Multi-word cities like "new-delhi" are handled by checking 2-segment combos.
 */
export function parseSlug(slug: string): ParsedSlug {
    const decoded = decodeURIComponent(slug);
    const parts = decoded.toLowerCase().split('-');

    let role = '';
    let location = '';

    // Try 2-word city match from the end first (e.g. "new-delhi")
    if (parts.length >= 3) {
        const twoWordCity = parts.slice(-2).join('-');
        const twoWordCityNoHyphen = parts.slice(-2).join('');
        if (KNOWN_CITIES.has(twoWordCity) || KNOWN_CITIES.has(twoWordCityNoHyphen)) {
            role = parts.slice(0, -2).join(' ');
            location = parts.slice(-2).join(' ');
        }
    }

    // Try 1-word city match from the end if not found yet
    if (!location && parts.length >= 2) {
        const oneWordCity = parts[parts.length - 1];
        if (KNOWN_CITIES.has(oneWordCity)) {
            role = parts.slice(0, -1).join(' ');
            location = oneWordCity;
        }
    }

    // Fallback: treat entire slug as role
    if (!location) {
        role = parts.join(' ');
    }

    return {
        role: toTitleCase(stripNoiseWords(role)),
        location: toTitleCase(location),
    };
}

// Noise words to strip from parsed roles (e.g., "sales job" → "sales")
const NOISE_WORDS = new Set([
    'job', 'jobs', 'vacancy', 'vacancies', 'hiring', 'openings', 'opening',
    'careers', 'career', 'work', 'position', 'positions', 'for', 'in', 'at', 'the', 'a', 'an',
]);

function stripNoiseWords(role: string): string {
    const cleaned = role
        .split(/\s+/)
        .filter(w => !NOISE_WORDS.has(w.toLowerCase()))
        .join(' ')
        .trim();
    // Do NOT fallback to original if everything was stripped (e.g., "jobs" -> "")
    return cleaned;
}

function toTitleCase(str: string): string {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------- Fallback Result Type ----------

export interface FallbackResult {
    jobs: JobRow[];
    stats: JobStats;
    isFallback: boolean;
    fallbackMessage: string;
    effectiveRole: string;
    effectiveLocation: string;
}

/**
 * Multi-level fallback job search. Tries progressively broader queries:
 * 1. Exact role + location
 * 2. Cleaned role (noise words stripped) + location
 * 3. Role only (no location filter)
 * 4. Individual keywords via OR matching
 * 5. Location only
 * Never returns a 404 — always finds something to show.
 */
export async function getJobsWithFallback(
    rawRole: string,
    rawLocation: string,
    limit: number = 20
): Promise<FallbackResult> {
    const cleanedRole = stripNoiseWords(rawRole);

    // Level 1: Exact role + location
    if (rawLocation) {
        const jobs = await getJobsByRoleAndLocation(cleanedRole, rawLocation, limit);
        if (jobs.length > 0) {
            const stats = await getJobStats(cleanedRole, rawLocation);
            return { jobs, stats, isFallback: false, fallbackMessage: '', effectiveRole: cleanedRole, effectiveLocation: rawLocation };
        }
    }

    // Level 2: Role only (drop location)
    {
        const jobs = await getJobsByRoleAndLocation(cleanedRole, '', limit);
        if (jobs.length > 0) {
            const stats = await getJobStats(cleanedRole, '');
            const msg = rawLocation
                ? `No exact match for "${rawRole} in ${rawLocation}"`
                : '';
            return { jobs, stats, isFallback: !!rawLocation, fallbackMessage: msg, effectiveRole: cleanedRole, effectiveLocation: '' };
        }
    }

    // Level 3: Try individual keywords via OR (e.g., "sales executive" → sales OR executive)
    const keywords = cleanedRole.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    if (keywords.length > 1) {
        const db = getPool();
        const orConditions = keywords.map((_, i) => `LOWER(role) LIKE $${i + 1}`).join(' OR ');
        const patterns = keywords.map(k => `%${k}%`);
        const locationClause = rawLocation ? ` AND LOWER(location) LIKE $${keywords.length + 1}` : '';
        const allParams = rawLocation ? [...patterns, `%${rawLocation.toLowerCase()}%`, limit] : [...patterns, limit];

        const query = `
            SELECT id, role, company, location, salary_min, salary_max,
                   employment_type, work_type, skills, min_experience_years,
                   max_experience_years, text, external_link, company_logo_url,
                   status, created_at, role_category, functional_area
            FROM jobs
            WHERE status = 'open' AND (${orConditions})${locationClause}
            ORDER BY created_at DESC
            LIMIT $${allParams.length}
        `;

        const result = await db.query(query, allParams);
        if (result.rows.length > 0) {
            const stats: JobStats = { total_count: result.rows.length, avg_salary_min: 0, avg_salary_max: 0 };
            return {
                jobs: result.rows,
                stats,
                isFallback: true,
                fallbackMessage: `No exact match for "${rawRole}"`,
                effectiveRole: cleanedRole,
                effectiveLocation: rawLocation,
            };
        }
    }

    // Level 4: Location only
    if (rawLocation) {
        const db = getPool();
        const result = await db.query(
            `SELECT id, role, company, location, salary_min, salary_max,
                    employment_type, work_type, skills, min_experience_years,
                    max_experience_years, text, external_link, company_logo_url,
                    status, created_at, role_category, functional_area
             FROM jobs WHERE status = 'open' AND LOWER(location) LIKE $1
             ORDER BY created_at DESC LIMIT $2`,
            [`%${rawLocation.toLowerCase()}%`, limit]
        );
        if (result.rows.length > 0) {
            const stats: JobStats = { total_count: result.rows.length, avg_salary_min: 0, avg_salary_max: 0 };
            return {
                jobs: result.rows,
                stats,
                isFallback: true,
                fallbackMessage: `No exact match for "${rawRole}"`,
                effectiveRole: cleanedRole,
                effectiveLocation: rawLocation,
            };
        }
    }

    // Level 5: Nothing matched at all — return empty
    return {
        jobs: [],
        stats: { total_count: 0, avg_salary_min: 0, avg_salary_max: 0 },
        isFallback: true,
        fallbackMessage: `No exact match for "${rawRole}"${rawLocation ? ` in ${rawLocation}` : ''}`,
        effectiveRole: cleanedRole,
        effectiveLocation: rawLocation,
    };
}

// ---------- Database Queries ----------

export interface JobRow {
    id: string;
    role: string;
    company: string;
    location: string;
    salary_min: number;
    salary_max: number;
    employment_type: string;
    work_type: string;
    skills: string;
    min_experience_years: number;
    max_experience_years: number;
    text: string;
    external_link: string | null;
    company_logo_url: string | null;
    status: string;
    created_at: string;
    role_category: string;
    functional_area: string;
    match_score?: number;
}

export interface JobStats {
    total_count: number;
    avg_salary_min: number;
    avg_salary_max: number;
}

/**
 * Fetch jobs matching a role and location via ILIKE text search.
 * Returns up to `limit` open jobs, ordered by recency.
 * A text-based match_score (0-100) is computed as a relevance heuristic.
 */
export async function getJobsByRoleAndLocation(
    role: string,
    location: string,
    limit: number = 20
): Promise<JobRow[]> {
    let retries = 3;
    while (retries > 0) {
        try {
            const db = getPool();
            // Stagger queries significantly to prevent connection bursting from Next.js workers
            await delay(Math.random() * 250);

            // Build a search pattern from the role: "Python Developer" → "%python%developer%"
            const rolePattern = `%${role.toLowerCase().split(/\s+/).join('%')}%`;

            let query: string;
            let params: (string | number)[];

            if (location) {
                query = `
            SELECT id, role, company, location, salary_min, salary_max,
                   employment_type, work_type, skills, min_experience_years,
                   max_experience_years, text, external_link, company_logo_url,
                   status, created_at, role_category, functional_area
            FROM jobs
            WHERE status = 'open'
              AND LOWER(role) LIKE $1
              AND LOWER(location) LIKE $2
            ORDER BY created_at DESC
            LIMIT $3
        `;
                params = [rolePattern, `%${location.toLowerCase()}%`, limit];
            } else {
                query = `
            SELECT id, role, company, location, salary_min, salary_max,
                   employment_type, work_type, skills, min_experience_years,
                   max_experience_years, text, external_link, company_logo_url,
                   status, created_at
            FROM jobs
            WHERE status = 'open'
              AND LOWER(role) LIKE $1
            ORDER BY created_at DESC
            LIMIT $2
        `;
                params = [rolePattern, limit];
            }

            const result = await db.query(query, params);

            // Compute a simple text-based match score
            return result.rows.map((row: JobRow) => ({
                ...row,
                match_score: computeMatchScore(role, location, row),
            }));
        } catch (error) {
            console.error(`DB Query Error for ${role} in ${location}, retries left: ${retries - 1}`, error);
            retries -= 1;
            if (retries === 0) throw error;
            await delay(2000); // Backoff before retry
        }
    }
    return [];
}

/**
 * Text-based relevance score (0–100).
 * Higher if role words appear in the job title, and location is an exact match.
 */
function computeMatchScore(searchRole: string, searchLocation: string, job: JobRow): number {
    let score = 0;

    // Role matching (up to 70 points)
    const searchWords = searchRole.toLowerCase().split(/\s+/);
    const jobRole = (job.role || '').toLowerCase();
    const matchedWords = searchWords.filter((w) => jobRole.includes(w));
    score += Math.round((matchedWords.length / searchWords.length) * 70);

    // Location matching (up to 20 points)
    if (searchLocation) {
        const jobLoc = (job.location || '').toLowerCase();
        const searchLoc = searchLocation.toLowerCase();
        if (jobLoc === searchLoc) {
            score += 20;
        } else if (jobLoc.includes(searchLoc) || searchLoc.includes(jobLoc)) {
            score += 12;
        }
    } else {
        score += 10; // No location filter = partial credit
    }

    // Recency bonus (up to 10 points)
    const daysSincePosted = (Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSincePosted < 7) score += 10;
    else if (daysSincePosted < 30) score += 5;
    else if (daysSincePosted < 90) score += 2;

    return Math.min(score, 100);
}

/**
 * Get aggregate stats for a role+location combo (for SEO metadata).
 */
export const getJobStats = cache(async function getJobStats(role: string, location: string): Promise<JobStats> {
    let retries = 3;
    while (retries > 0) {
        try {
            const db = getPool();
            await delay(Math.random() * 250); // Additional throttle
            const rolePattern = `%${role.toLowerCase().split(/\s+/).join('%')}%`;

            let query: string;
            let params: string[];

            if (location) {
                query = `
            SELECT COUNT(*) as total_count,
                   COALESCE(AVG(NULLIF(salary_min, 0)), 0) as avg_salary_min,
                   COALESCE(AVG(NULLIF(salary_max, 0)), 0) as avg_salary_max
            FROM jobs
            WHERE status = 'open'
              AND LOWER(role) LIKE $1
              AND LOWER(location) LIKE $2
        `;
                params = [rolePattern, `%${location.toLowerCase()}%`];
            } else {
                query = `
            SELECT COUNT(*) as total_count,
                   COALESCE(AVG(NULLIF(salary_min, 0)), 0) as avg_salary_min,
                   COALESCE(AVG(NULLIF(salary_max, 0)), 0) as avg_salary_max
            FROM jobs
            WHERE status = 'open'
              AND LOWER(role) LIKE $1
        `;
                params = [rolePattern];
            }

            const result = await db.query(query, params);
            const row = result.rows[0];

            return {
                total_count: parseInt(row.total_count, 10) || 0,
                avg_salary_min: Math.round(parseFloat(row.avg_salary_min) || 0),
                avg_salary_max: Math.round(parseFloat(row.avg_salary_max) || 0),
            };
        } catch (error) {
            console.error(`DB Stats Error for ${role} in ${location}, retries left: ${retries - 1}`, error);
            retries -= 1;
            if (retries === 0) return { total_count: 0, avg_salary_min: 0, avg_salary_max: 0 };
            await delay(2000);
        }
    }
    return { total_count: 0, avg_salary_min: 0, avg_salary_max: 0 };
});

/**
 * Fetch jobs for sitemap generation — distinct role+location combos.
 */
export async function getSitemapJobs(location?: string): Promise<{ slug: string; location: string }[]> {
    const db = getPool();

    let query: string;
    let params: string[];

    if (location) {
        query = `
            SELECT role, location
            FROM jobs
            WHERE status = 'open'
              AND role IS NOT NULL
              AND location IS NOT NULL
              AND LOWER(location) LIKE $1
            GROUP BY role, location
            ORDER BY 
              CASE WHEN LOWER(role) LIKE '%python%' THEN 0 ELSE 1 END,
              COUNT(*) DESC
            LIMIT 5000
        `;
        params = [`%${location.toLowerCase()}%`];
    } else {
        query = `
            SELECT role, location
            FROM jobs
            WHERE status = 'open'
              AND role IS NOT NULL
              AND location IS NOT NULL
            GROUP BY role, location
            ORDER BY 
              CASE WHEN LOWER(role) LIKE '%python%' THEN 0 ELSE 1 END,
              COUNT(*) DESC
            LIMIT 5000
        `;
        params = [];
    }

    const result = await db.query(query, params);

    return result.rows.map((row: { role: string; location: string }) => ({
        slug: `${row.role.toLowerCase().replace(/[\s/]+/g, '-')}-${row.location.toLowerCase().replace(/[\s/]+/g, '-')}`,
        location: row.location,
    }));
}
