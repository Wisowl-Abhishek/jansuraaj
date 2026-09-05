import { NextResponse } from "next/server";

export const dynamic = "force-static";

const BASE_URL = "https://wisowl.com";
const TODAY = new Date().toISOString().split("T")[0];

const PAGES = [
  { path: "/",              changefreq: "daily", priority: "1.0" },
  { path: "/recruiter-lp",  changefreq: "weekly", priority: "0.9" },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(({ path, changefreq, priority }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
