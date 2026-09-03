import { MetadataRoute } from 'next';

export const revalidate = 86400; // 24 hours (ISR)

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.wisowl.com'}/sitemap.xml`,
    };
}
