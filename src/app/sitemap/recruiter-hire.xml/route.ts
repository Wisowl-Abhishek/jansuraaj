import { NextResponse } from "next/server";
import { getAllRecruiterSlugs } from "@/lib/recruiter-pseo-data";

export const dynamic = "force-static";

const BASE_URL = "https://www.wisowl.com";
const TODAY = new Date().toISOString().split("T")[0];

export async function GET() {
  const slugs = getAllRecruiterSlugs();

  const urls = slugs
    .map(
      (slug) => `  <url>
    <loc>${BASE_URL}/hire/${slug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
