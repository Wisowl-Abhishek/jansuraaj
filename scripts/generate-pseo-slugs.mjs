/**
 * generate-pseo-slugs.mjs
 *
 * Pre-build script: writes src/lib/pseo-slugs.json which is the single
 * source of truth for ALL pSEO slugs and nav items.
 *
 * Consumed by:
 *   - src/components/Header.jsx          → nav dropdowns (label + path)
 *   - src/app/jobs/[slug]/page.tsx       → generateStaticParams (SSG)
 *   - src/app/sitemap/trending-jobs.xml  → sitemap
 *   - src/app/sitemap/jobs-by-location.xml
 *   - src/app/sitemap/education-jobs.xml
 *
 * Run: node scripts/generate-pseo-slugs.mjs
 */
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const { Pool } = pg;

// ─── Nav items (shown in header dropdowns) ────────────────────────────────────
const TRENDING_JOBS = [
  { label: 'Software Developer',   path: 'software-developer' },
  { label: 'Data Analyst',         path: 'data-analyst' },
  { label: 'Product Manager',      path: 'product-manager' },
  { label: 'DevOps Engineer',      path: 'devops-engineer' },
  { label: 'Full Stack Developer', path: 'full-stack-developer' },
];

const JOBS_BY_LOCATION = [
  { label: 'Jobs in Bangalore', path: 'jobs-in-bangalore' },
  { label: 'Jobs in Mumbai',    path: 'jobs-in-mumbai' },
  { label: 'Jobs in Delhi',     path: 'jobs-in-delhi' },
  { label: 'Jobs in Hyderabad', path: 'jobs-in-hyderabad' },
  { label: 'Jobs in Chennai',   path: 'jobs-in-chennai' },
];

const EDUCATION = [
  { label: 'Fresher Jobs',      path: 'fresher-jobs' },
  { label: 'Graduate Trainee',  path: 'graduate-trainee' }
];

// ─── pSEO: trending roles to generate long-tail pages for ─────────────────────
const TRENDING_ROLES = [
  { label: 'python developer',               slug: 'python-developer' },
  { label: 'java developer',                 slug: 'java-developer' },
  { label: 'react developer',                slug: 'react-developer' },
  { label: 'node js developer',              slug: 'node-js-developer' },
  { label: 'angular developer',              slug: 'angular-developer' },
  { label: 'full stack developer',           slug: 'full-stack-developer' },
  { label: 'backend developer',              slug: 'backend-developer' },
  { label: 'frontend developer',             slug: 'frontend-developer' },
  { label: 'software engineer',              slug: 'software-engineer' },
  { label: 'software developer',             slug: 'software-developer' },
  { label: 'devops engineer',                slug: 'devops-engineer' },
  { label: 'cloud engineer',                 slug: 'cloud-engineer' },
  { label: 'data scientist',                 slug: 'data-scientist' },
  { label: 'data analyst',                   slug: 'data-analyst' },
  { label: 'machine learning engineer',      slug: 'machine-learning-engineer' },
  { label: 'qa engineer',                    slug: 'qa-engineer' },
  { label: 'business analyst',               slug: 'business-analyst' },
  { label: 'product manager',                slug: 'product-manager' },
  { label: 'project manager',                slug: 'project-manager' },
  { label: 'sales executive',                slug: 'sales-executive' },
  { label: 'business development executive', slug: 'business-development-executive' },
  { label: 'digital marketing',              slug: 'digital-marketing' },
  { label: 'hr manager',                     slug: 'hr-manager' },
  { label: 'accountant',                     slug: 'accountant' },
  { label: 'financial analyst',              slug: 'financial-analyst' },
  { label: 'operations manager',             slug: 'operations-manager' },
];

// ─── Target cities for role+city combinations ─────────────────────────────────
const TARGET_CITIES = [
  // Tier 1
  { slug: 'bangalore',          dbPattern: '%bangalore%' },
  { slug: 'mumbai',             dbPattern: '%mumbai%' },
  { slug: 'delhi',              dbPattern: '%delhi%' },
  { slug: 'hyderabad',          dbPattern: '%hyderabad%' },
  { slug: 'chennai',            dbPattern: '%chennai%' },
  { slug: 'pune',               dbPattern: '%pune%' },
  { slug: 'noida',              dbPattern: '%noida%' },
  { slug: 'gurgaon',            dbPattern: '%gurgaon%' },
  { slug: 'kolkata',            dbPattern: '%kolkata%' },
  { slug: 'ahmedabad',          dbPattern: '%ahmedabad%' },
  // Tier 2
  { slug: 'jaipur',             dbPattern: '%jaipur%' },
  { slug: 'lucknow',            dbPattern: '%lucknow%' },
  { slug: 'chandigarh',         dbPattern: '%chandigarh%' },
  { slug: 'coimbatore',         dbPattern: '%coimbatore%' },
  { slug: 'kochi',              dbPattern: '%kochi%' },
  { slug: 'indore',             dbPattern: '%indore%' },
  { slug: 'bhopal',             dbPattern: '%bhopal%' },
  { slug: 'nagpur',             dbPattern: '%nagpur%' },
  { slug: 'surat',              dbPattern: '%surat%' },
  { slug: 'vadodara',           dbPattern: '%vadodara%' },
  { slug: 'vizag',              dbPattern: '%visakhapatnam%' },
  { slug: 'mysore',             dbPattern: '%mysore%' },
  { slug: 'patna',              dbPattern: '%patna%' },
  { slug: 'bhubaneswar',        dbPattern: '%bhubaneswar%' },
  { slug: 'dehradun',           dbPattern: '%dehradun%' },
  { slug: 'ranchi',             dbPattern: '%ranchi%' },
  { slug: 'vijayawada',         dbPattern: '%vijayawada%' },
  { slug: 'thiruvananthapuram', dbPattern: '%thiruvananthapuram%' },
  { slug: 'nashik',             dbPattern: '%nashik%' },
  { slug: 'agra',               dbPattern: '%agra%' },
];

function makeRolePattern(label) {
  return `%${label.toLowerCase().split(/\s+/).join('%')}%`;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn('[pseo-slugs] DATABASE_URL not set — writing nav-only slugs file');
    write([]);
    return;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
    connectionTimeoutMillis: 30000,
  });

  const pSEOSlugs = [];

  try {
    for (const role of TRENDING_ROLES) {
      const rolePattern = makeRolePattern(role.label);

      // Role-only slug: python-developer-jobs
      const roleCountRes = await pool.query(
        `SELECT COUNT(*) AS cnt FROM jobs WHERE status = 'open' AND LOWER(role) LIKE $1`,
        [rolePattern]
      );
      if (parseInt(roleCountRes.rows[0].cnt, 10) > 0) {
        pSEOSlugs.push(`${role.slug}-jobs`);
      }

      // Role + city slugs: python-developer-jobs-in-bangalore
      for (const city of TARGET_CITIES) {
        const cityCountRes = await pool.query(
          `SELECT COUNT(*) AS cnt FROM jobs WHERE status = 'open' AND LOWER(role) LIKE $1 AND LOWER(location) LIKE $2`,
          [rolePattern, city.dbPattern]
        );
        if (parseInt(cityCountRes.rows[0].cnt, 10) > 0) {
          pSEOSlugs.push(`${role.slug}-jobs-in-${city.slug}`);
        }
      }

      console.log(`  ✓ ${role.label} — ${pSEOSlugs.filter(s => s.startsWith(role.slug)).length} slugs`);
    }
  } finally {
    await pool.end();
  }

  write(pSEOSlugs);
  console.log(`[pseo-slugs] Done — ${pSEOSlugs.length} pSEO slugs written`);
}

function write(pSEOSlugs) {
  const output = {
    trendingJobs: TRENDING_JOBS,
    jobsByLocation: JOBS_BY_LOCATION,
    education: EDUCATION,
    pSEOSlugs,
  };
  const outputPath = path.resolve(__dirname, '..', 'src', 'lib', 'pseo-slugs.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error('[pseo-slugs] Fatal error:', err);
  write([]);
  process.exit(0);
});
