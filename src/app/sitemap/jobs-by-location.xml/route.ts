import { NextResponse } from "next/server";
import pSEOData from "@/lib/pseo-slugs.json";

export const dynamic = "force-static";

const TODAY = new Date().toISOString().split("T")[0];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pSEOData.jobsByLocation.map((job) => `  <url>
    <loc>https://wisowl.com/jobs/${job.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
