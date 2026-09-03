/**
 * recruiter-pseo-data.ts
 *
 * Static data for recruiter-side Dynamic Landing Pages (DLPs).
 * URL pattern: /hire/{role-slug}-in-{city-slug}  (role + city)
 *              /hire/{role-slug}                  (role only)
 *
 * Example: /hire/software-developers-in-bangalore
 *
 * This file is consumed by:
 *   - src/app/hire/[slug]/page.tsx  → generateStaticParams + page rendering
 *   - src/app/sitemap/recruiter-hire.xml/route.ts → sitemap
 */

export type RecruiterRole = {
  /** Plural display label, e.g. "Software Developers" */
  label: string;
  /** URL slug (plural, hyphenated), e.g. "software-developers" */
  slug: string;
  /** Singular display label, e.g. "Software Developer" */
  singular: string;
};

export type RecruiterCity = {
  /** Display label, e.g. "Bangalore" */
  label: string;
  /** URL slug, e.g. "bangalore" */
  slug: string;
};

// ─── Roles ────────────────────────────────────────────────────────────────────

export const RECRUITER_ROLES: RecruiterRole[] = [
  { label: 'Software Developers',        slug: 'software-developers',        singular: 'Software Developer' },
  { label: 'HTML Developers',          slug: 'html-developers',          singular: 'HTML Developer' },
  { label: 'Python Developers',          slug: 'python-developers',          singular: 'Python Developer' },
  { label: 'Java Developers',            slug: 'java-developers',            singular: 'Java Developer' },
  { label: 'React Developers',           slug: 'react-developers',           singular: 'React Developer' },
  { label: 'Node.js Developers',         slug: 'nodejs-developers',          singular: 'Node.js Developer' },
  { label: 'Full Stack Developers',      slug: 'full-stack-developers',      singular: 'Full Stack Developer' },
  { label: 'Backend Developers',         slug: 'backend-developers',         singular: 'Backend Developer' },
  { label: 'Frontend Developers',        slug: 'frontend-developers',        singular: 'Frontend Developer' },
  { label: 'DevOps Engineers',           slug: 'devops-engineers',           singular: 'DevOps Engineer' },
  { label: 'Cloud Engineers',            slug: 'cloud-engineers',            singular: 'Cloud Engineer' },
  { label: 'Data Scientists',            slug: 'data-scientists',            singular: 'Data Scientist' },
  { label: 'Data Analysts',              slug: 'data-analysts',              singular: 'Data Analyst' },
  { label: 'Machine Learning Engineers', slug: 'machine-learning-engineers', singular: 'Machine Learning Engineer' },
  { label: 'QA Engineers',              slug: 'qa-engineers',               singular: 'QA Engineer' },
  { label: 'Product Managers',          slug: 'product-managers',           singular: 'Product Manager' },
  { label: 'Business Analysts',         slug: 'business-analysts',          singular: 'Business Analyst' },
  { label: 'UI/UX Designers',           slug: 'ui-ux-designers',            singular: 'UI/UX Designer' },
  { label: 'Angular Developers',        slug: 'angular-developers',         singular: 'Angular Developer' },
  { label: 'iOS Developers',            slug: 'ios-developers',             singular: 'iOS Developer' },
  { label: 'Android Developers',        slug: 'android-developers',         singular: 'Android Developer' },
];

// ─── Cities ───────────────────────────────────────────────────────────────────

export const RECRUITER_CITIES: RecruiterCity[] = [
  { label: 'Bangalore', slug: 'bangalore' },
  { label: 'Mumbai',    slug: 'mumbai'    },
  { label: 'Delhi',     slug: 'delhi'     },
  { label: 'Hyderabad', slug: 'hyderabad' },
  { label: 'Chennai',   slug: 'chennai'   },
  { label: 'Pune',      slug: 'pune'      },
  { label: 'Noida',     slug: 'noida'     },
  { label: 'Gurgaon',   slug: 'gurgaon'   },
  { label: 'Kolkata',   slug: 'kolkata'   },
  { label: 'Ahmedabad', slug: 'ahmedabad' },
  { label: 'Lucknow',   slug: 'lucknow'   },
  { label: 'Chandigarh', slug: 'chandigarh' },
  { label: 'Coimbatore', slug: 'coimbatore' },
  { label: 'Kochi',      slug: 'kochi'      },
  { label: 'Indore',     slug: 'indore'     },
  { label: 'Bhopal',     slug: 'bhopal'     },
  { label: 'Nagpur',     slug: 'nagpur'     },
  { label: 'Surat',      slug: 'surat'      },
  { label: 'Vadodara',   slug: 'vadodara'   },
  { label: 'Vizag',      slug: 'vizag'      },
  { label: 'Mysore',     slug: 'mysore'     },
  { label: 'Patna',      slug: 'patna'      },
  { label: 'Bhubaneswar', slug: 'bhubaneswar' },
  { label: 'Dehradun',   slug: 'dehradun'   },
  { label: 'Ranchi',     slug: 'ranchi'     },
  { label: 'Vijayawada', slug: 'vijayawada' },
  { label: 'Thiruvananthapuram', slug: 'thiruvananthapuram' },
  { label: 'Nashik',     slug: 'nashik'     },
  { label: 'Agra',       slug: 'agra'       },
];

// ─── Slug helpers ─────────────────────────────────────────────────────────────

/**
 * Parses a recruiter DLP slug into its role and optional city components.
 * Returns null if the slug doesn't match any known role.
 *
 * Examples:
 *   "software-developers-in-bangalore" → { role: {...}, city: {...} }
 *   "software-developers"              → { role: {...}, city: null }
 *   "unknown-slug"                     → null
 */
export function parseRecruiterSlug(
  slug: string,
): { role: RecruiterRole; city: RecruiterCity | null } | null {
  // Try role + city first (scan all cities for a matching suffix)
  for (const city of RECRUITER_CITIES) {
    const suffix = `-in-${city.slug}`;
    if (slug.endsWith(suffix)) {
      const roleSlug = slug.slice(0, slug.length - suffix.length);
      const role = RECRUITER_ROLES.find((r) => r.slug === roleSlug);
      if (role) return { role, city };
    }
  }

  // Try role-only
  const role = RECRUITER_ROLES.find((r) => r.slug === slug);
  if (role) return { role, city: null };

  return null;
}

/**
 * Returns every valid recruiter DLP slug:
 *   - role-only  (20 slugs)
 *   - role + city (20 × 10 = 200 slugs)
 * Total: 220 slugs
 */
export function getAllRecruiterSlugs(): string[] {
  const slugs: string[] = [];
  for (const role of RECRUITER_ROLES) {
    slugs.push(role.slug);
    for (const city of RECRUITER_CITIES) {
      slugs.push(`${role.slug}-in-${city.slug}`);
    }
  }
  return slugs;
}
