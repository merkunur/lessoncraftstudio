/**
 * Single sitewide Organization JSON-LD source.
 *
 * One Organization @id (`${CANONICAL_HOST}/#organization`) referenced from
 * every page that needs to identify the publisher. Pages MUST NOT redefine
 * Organization properties — they reference the canonical entity by @id.
 *
 * Consumers:
 *   - frontend/app/[locale]/page.tsx  (homepage emits the full object)
 *   - frontend/app/[locale]/about/page.tsx  (references @id only)
 *   - frontend/app/[locale]/topic/[slug]/page.tsx  (isPartOf → @id)
 *
 * TODO(operator): supply real `sameAs` social-profile URLs before lifting
 * this from `[]` to a populated array. Never fabricate social URLs.
 */

import { CANONICAL_HOST } from './url';

export const ORGANIZATION_ID = `${CANONICAL_HOST}/#organization`;
export const WEBSITE_ID = `${CANONICAL_HOST}/#website`;
export const LOGO_ID = `${CANONICAL_HOST}/#logo`;

// Real social-profile URLs for Organization.sameAs. EMPTY until the operator
// supplies verified profiles — NEVER fabricate (a wrong sameAs harms entity
// disambiguation more than an absent one). Populate this array to enable it.
export const ORGANIZATION_SAME_AS: string[] = [];

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
