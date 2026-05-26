/**
 * BreadcrumbList JSON-LD builder.
 *
 * Used on topic single-axis + intersection pages (and any future page that
 * renders a visible breadcrumb trail). The schema must mirror the visible
 * breadcrumb in the page body — same order, same labels, same URLs — or
 * Google flags it as a structured-data mismatch.
 *
 * Pair this with the `Breadcrumbs` component at
 * `frontend/components/catalog/Breadcrumbs.tsx`. Both should derive from
 * the same source data when refactored further; for now they're called
 * separately with matching arguments.
 */

import { canonicalUrl } from './url';

export interface BreadcrumbCrumb {
  /** Visible label (already localized). */
  name: string;
  /** Path relative to canonical host (e.g. "/en", "/en/topic/animals"). */
  path: string;
}

/**
 * Build a BreadcrumbList JSON-LD object from a trail of crumbs. The trail
 * MUST be ordered root-first; the final crumb is the current page.
 */
export function buildBreadcrumbSchema(trail: BreadcrumbCrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  };
}
