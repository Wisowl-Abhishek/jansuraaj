import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { parseSlug, getJobsWithFallback, getJobStats } from '@/lib/supabase-replica';
import { RightSidebar } from '@/components/pseo/RightSidebar';
import { FloatingSearchBar } from '@/components/pseo/FloatingSearchBar';
import Header from '@/components/Header';
import { JobFeed, JobForFeed } from '@/components/pseo/JobFeed';
import MainLayout from "@/MainLayout";
import pSEOData from '@/lib/pseo-slugs.json';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const slugSet = new Set([
        ...pSEOData.trendingJobs.map(({ path }) => path),
        ...pSEOData.jobsByLocation.map(({ path }) => path),
        ...pSEOData.education.map(({ path }) => path),
        ...pSEOData.pSEOSlugs,
    ]);
    return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const { role, location } = parseSlug(slug);
    const stats = await getJobStats(role, location);

    const locationSuffix = location ? ` in ${location}` : '';
    const rolePrefix = role ? `${role} ` : '';
    
    const title = `${rolePrefix}Jobs${locationSuffix} | WisOwl — ${stats.total_count}+ Openings`;
    const description = stats.total_count > 0
        ? `Find ${stats.total_count}+ ${rolePrefix}jobs${locationSuffix}. ${stats.avg_salary_max > 0 ? `Average salary: ₹${stats.avg_salary_min}–₹${stats.avg_salary_max}.` : ''} Apply now on WisOwl.`
        : `Search for ${rolePrefix}jobs${locationSuffix} on WisOwl.`;

    return {
        title,
        description,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.wisowl.com'}/jobs/${slug}`,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const { role, location } = parseSlug(slug);

    // Use multi-level fallback instead of hard 404
    const fallbackResult = await getJobsWithFallback(role, location, 20);

    if (fallbackResult.jobs.length === 0) {
        notFound();
    }

    const jobs = fallbackResult.jobs;
    const stats = fallbackResult.stats;

    const locationSuffix = location ? ` in ${location}` : '';

    const formatSalary = (min: number, max: number) => {
        if (min === 0 && max === 0) return 'Not Disclosed';
        if (min === 0) return `Up to ₹${max.toLocaleString('en-IN')}`;
        if (max === 0) return `₹${min.toLocaleString('en-IN')}+`;
        return `₹${min.toLocaleString('en-IN')} – ₹${max.toLocaleString('en-IN')}`;
    };

    const formatExperience = (min: number, max: number) => {
        if (min === 0 && (!max || max === 0)) return 'Fresher';
        if (!max || max === 0) return `${min}+ Yrs`;
        return `${min}–${max} Yrs`;
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: role ? `${role} Jobs${locationSuffix}` : `Jobs${locationSuffix}`,
        numberOfItems: stats.total_count,
        itemListElement: jobs.slice(0, 5).map((job, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'JobPosting',
                title: job.role,
                hiringOrganization: {
                    '@type': 'Organization',
                    name: job.company,
                },
                jobLocation: {
                    '@type': 'Place',
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: job.location,
                    },
                },
                description: job.text?.slice(0, 200),
                url: job.external_link || `https://wisowl.ai/jobs/${slug}`,
            },
        })),
    };

    const salaryRange = stats.avg_salary_max > 0
        ? { low: String(stats.avg_salary_min), high: String(stats.avg_salary_max) }
        : { low: 'N/A', high: 'N/A' };

    // Serialize jobs for the client-side JobFeed component (includes raw DB fields for filtering)
    const jobsForFeed: JobForFeed[] = jobs.map((job, idx) => ({
        id: job.id,
        role: job.role,
        company: job.company || 'Company',
        location: job.location,
        salary: formatSalary(Number(job.salary_min), Number(job.salary_max)),
        experience: formatExperience(Number(job.min_experience_years), Number(job.max_experience_years)),
        tags: job.skills ? job.skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 5) : [job.role],
        isNew: idx < 3,
        description: job.text,
        matchScore: job.match_score,
        companyLogo: job.company_logo_url || undefined,
        createdAt: job.created_at,
        work_type: job.work_type || '',
        min_experience_years: Number(job.min_experience_years) || 0,
        max_experience_years: Number(job.max_experience_years) || 0,
        role_category: (job as any).role_category || '',
        functional_area: (job as any).functional_area || '',
    }));

    return (
        <MainLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-7xl mx-auto py-6 px-5">
                {/* Fallback banner removed as requested */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT + CENTER: Filters + Job Feed (Client Component) */}
                    <JobFeed
                        jobs={jobsForFeed}
                        totalCount={stats.total_count}
                        role={fallbackResult.effectiveRole || role}
                        locationSuffix={locationSuffix}
                    />

                    {/* RIGHT COLUMN: Widgets */}
                    <div className="col-span-1 lg:col-span-3">
                        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                            <RightSidebar
                                salaryRange={salaryRange}
                                jobCount={stats.total_count}
                                role={role}
                                location={location}
                            />
                        </div>
                    </div>
                </div>
                {/* <FloatingSearchBar /> */}
            </div>
        </MainLayout>
    );
}