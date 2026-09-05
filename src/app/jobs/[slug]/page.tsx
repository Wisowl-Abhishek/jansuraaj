import RedirectToHome from '@/components/common/RedirectToHome';
import pSEOData from '@/lib/pseo-slugs.json';

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

export default function Page() {
    return <RedirectToHome />;
}
