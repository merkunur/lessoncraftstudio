/**
 * Single sitewide Organization JSON-LD source.
 *
 * One Organization @id (`${CANONICAL_HOST}/#organization`) is the canonical
 * publisher entity. All emitters build it from `buildOrganizationSchema` here
 * (never hand-author the properties) so every emission of the @id is byte-
 * consistent. Pages that only need to point at the publisher reference it by
 * @id (e.g. `publisher`/`isPartOf`/`creator` → { '@id': ORGANIZATION_ID }).
 *
 * Identity-emission doctrine (updated 2026-07-21, seller-era-confusion fix):
 * the FULL Organization + WebSite node is emitted not only on the homepage but
 * ALSO on the high-crawl SSR surfaces (topic hubs + activity pages) via
 * `components/seo/PublisherJsonLd`. Rationale: the homepage is crawled rarely,
 * so an @id-only reference on the pages Googlebot actually fetches daily left
 * the current identity un-reaffirmed while the stale seller-era index lingered.
 * All full emissions pass `ORGANIZATION_DESCRIPTION` (below) so the merged @id
 * carries one consistent description regardless of which page Google re-crawls.
 *
 * Consumers:
 *   - frontend/app/[locale]/page.tsx                 (homepage; full object)
 *   - frontend/components/seo/PublisherJsonLd.tsx    (topic hubs + activities; full object)
 *   - frontend/app/[locale]/about/page.tsx           (references @id only)
 *
 * TODO(operator): supply real `sameAs` social-profile URLs before lifting
 * this from a single YouTube entry to the full identity-aligned set. Never
 * fabricate social URLs — see docs/SEO/off-site-identity-audit.md.
 */

import { CANONICAL_HOST } from './url';

export const ORGANIZATION_ID = `${CANONICAL_HOST}/#organization`;
export const WEBSITE_ID = `${CANONICAL_HOST}/#website`;
export const LOGO_ID = `${CANONICAL_HOST}/#logo`;

// Canonical, stable Organization/WebSite description. Used by every FULL
// emission of the @id (homepage passes its own localized homepage.meta copy;
// the high-crawl PublisherJsonLd emissions pass THIS constant) so the merged
// entity description stays consistent. Mirrors the root layout brand description.
export const ORGANIZATION_DESCRIPTION =
  'Free K-3 worksheets and interactive activities in 11 languages. Built for dual-language, bilingual, and international-school classrooms.';

// Real social-profile URLs for Organization.sameAs — operator-verified only,
// NEVER fabricated (a wrong sameAs harms entity disambiguation more than an
// absent one). YouTube channel supplied by the operator 2026-06-14 (tutorials
// for each worksheet generator). Add more as the operator confirms them.
// Operator's YouTube channel (tutorials for each worksheet generator).
// Named so consumers (e.g. the About page tutorials link) reference one SoT.
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@LessonCraftStudioApps';

export const ORGANIZATION_SAME_AS: string[] = [
  YOUTUBE_CHANNEL_URL,
];

export function buildOrganizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'LessonCraftStudio',
    // Brand-disambiguation (SEO RESCUE 2026-06-14): explicitly mark this as the
    // K-3 printable-worksheets publisher so search engines don't conflate it
    // with the similarly-named AI lesson-planning tools (LessonCraft Pro /
    // Lesson Craft AI / GetLessonCraft). alternateName = the spaced brand form;
    // slogan + knowsAbout pin the topical identity. All factual — no fabrication.
    alternateName: 'LessonCraft Studio',
    url: CANONICAL_HOST,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: `${CANONICAL_HOST}/logo-lcs.png`,
      width: 600,
      height: 600,
    },
    description,
    slogan: 'Free printable and interactive K-3 worksheets and worksheet makers in 11 languages.',
    knowsAbout: [
      'printable worksheets', 'worksheet makers', 'kindergarten worksheets',
      'early math', 'phonics', 'reading readiness', 'preschool learning',
      'K-3 education', 'bilingual classrooms', 'multilingual education',
    ],
    areaServed: 'Worldwide',
    availableLanguage: [
      'English', 'German', 'French', 'Spanish', 'Portuguese', 'Italian',
      'Dutch', 'Swedish', 'Danish', 'Norwegian', 'Finnish',
    ],
    // Emit sameAs only when populated (omit-on-empty). Populate ORGANIZATION_SAME_AS
    // with real profiles to enable. Do NOT fabricate.
    ...(ORGANIZATION_SAME_AS.length ? { sameAs: ORGANIZATION_SAME_AS } : {}),
  };
}

export function buildWebSiteSchema(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: CANONICAL_HOST,
    name: 'LessonCraftStudio',
    description,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: locale,
  };
}
