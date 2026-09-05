/**
 * Jan Suraaj Brand Color System — single source of truth.
 *
 * To retheme the entire app, change values here only.
 * CSS custom properties are defined in src/index.css (@theme / :root).
 * Tailwind utilities (bg-brand-*, text-brand-*, border-brand-*) are
 * generated from the @theme block in src/index.css.
 */

export const brandColors = {
  /** Primary brand dark — backgrounds, bars, panels */
  indigo: '#1a1a1a',
  /** Hover / lighter dark */
  violet: '#2b2b2b',
  /** Muted dark — pattern overlays, grid lines */
  slate: '#242424',
  /** Dark — cinematic / dramatic backgrounds */
  navy: '#171717',
  /** Darkest — ultra-dark backgrounds with vignette */
  midnight: '#0a0a0a',
  /** Accent 1 — Jan Suraaj Gold — CTA highlights, arrow icons */
  gold: '#fdd34e',
  /** Accent 2 — Deeper Gold — hover states, badges, starburst, star icons */
  amber: '#e8bd42',
  /** Accent 3 — Cream — light surfaces, section backgrounds, soft badges */
  cream: '#fdf2d3',
  /** Text on dark surfaces */
  white: '#ffffff',
} as const;

export type BrandColor = keyof typeof brandColors;

/** Inline-style helpers for gradients / shadows that can't use Tailwind utilities */
export const brandGradients = {
  /** Main hero background */
  hero: `linear-gradient(315deg, ${brandColors.midnight} 33%, ${brandColors.indigo} 0%, ${brandColors.violet} 100%)`,
  /** Inner-page navigation bar */
  nav: `linear-gradient(300deg, ${brandColors.midnight} 22%, ${brandColors.indigo} 0%, ${brandColors.violet} 100%)`,
  /** Stats / big-number text gradient */
  statsText: `linear-gradient(135deg, ${brandColors.indigo}, ${brandColors.gold})`,
  /** Decorative avatar / step-circle gradient */
  avatarBg: `linear-gradient(135deg, ${brandColors.midnight}, ${brandColors.indigo})`,
  /** Final CTA section background */
  ctaSection: `linear-gradient(315deg, ${brandColors.indigo} 33%, ${brandColors.gold} 100%)`,
} as const;

/** Box-shadow helpers */
export const brandShadows = {
  goldCta: `0 8px 32px rgba(253,211,78,.40)`,
  indigoCta: `0 8px 32px rgba(26,26,26,.35)`,
  goldButton: `0 4px 20px rgba(253,211,78,0.30)`,
} as const;
