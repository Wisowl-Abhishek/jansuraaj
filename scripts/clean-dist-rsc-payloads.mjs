/**
 * clean-dist-rsc-payloads.mjs
 *
 * Post-build script: Next.js App Router's static export (output: 'export')
 * writes an RSC prefetch payload (.txt) alongside every route's index.html
 * — e.g. about/index.txt, about/__next._full.txt, about/__next._tree.txt.
 * These exist purely to let the client router soft-navigate between pages;
 * this site relies on hard navigation (window.open / full redirects), so
 * they're dead weight (~30MB+ across the pSEO routes) with no functional
 * loss if removed — the resulting 404 on a prefetch attempt is silently
 * swallowed by the router.
 *
 * Deletes every *.txt file under distDir except the real robots.txt.
 *
 * Run: node scripts/clean-dist-rsc-payloads.mjs
 */
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "dist";

function walk(dir) {
  let removed = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      removed += walk(full);
    } else if (entry.endsWith(".txt") && entry !== "robots.txt") {
      unlinkSync(full);
      removed++;
    }
  }
  return removed;
}

try {
  const count = walk(DIST_DIR);
  console.log(`[clean-dist-rsc-payloads] removed ${count} RSC payload .txt files from ${DIST_DIR}/`);
} catch (err) {
  console.error(`[clean-dist-rsc-payloads] skipped — ${err.message}`);
}
