import { NextResponse } from "next/server";

export const dynamic = "force-static";

const BASE_URL = "https://wisowl.com";
const TODAY = new Date().toISOString().split("T")[0];

const STATIC_PAGES = [
  { path: "/",                          changefreq: "daily",   priority: "1.0" },
  { path: "/about",                     changefreq: "monthly", priority: "0.7" },
  { path: "/contact",                   changefreq: "monthly", priority: "0.6" },
  { path: "/pricing",                   changefreq: "weekly",  priority: "0.8" },
  { path: "/hiw",                       changefreq: "monthly", priority: "0.7" },
  { path: "/resume-builder",            changefreq: "weekly",  priority: "0.8" },
  { path: "/recruiter-lp",             changefreq: "weekly",  priority: "0.7" },
  { path: "/faq",                       changefreq: "monthly", priority: "0.6" },
  { path: "/refer",                     changefreq: "monthly", priority: "0.5" },
  { path: "/privacy-policy",           changefreq: "yearly",  priority: "0.3" },
  { path: "/terms-of-service",         changefreq: "yearly",  priority: "0.3" },
  { path: "/cancellation-and-refund",  changefreq: "yearly",  priority: "0.3" },
  { path: "/shipping-delivery-policy", changefreq: "yearly",  priority: "0.3" },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.map(({ path, changefreq, priority }) => `  <url>
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
