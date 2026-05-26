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

export function buildOrganizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'LessonCraftStudio',
    url: CANONICAL_HOST,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: `${CANONICAL_HOST}/logo-lcs.png`,
      width: 600,
      height: 600,
    },
    description,
    areaServed: 'Worldwide',
    availableLanguage: [
      'English', 'German', 'French', 'Spanish', 'Portuguese', 'Italian',
      'Dutch', 'Swedish', 'Danish', 'Norwegian', 'Finnish',
    ],
    // TODO(operator): populate with real social-profile URLs when available.
    // Leaving as empty array (omit-on-empty pattern). Do NOT fabricate.
    sameAs: [] as string[],
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
