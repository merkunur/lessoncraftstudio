/**
 * Link Equity Map — declarative page-type hierarchy for internal linking.
 *
 * Defines the 8 page types, their hub status, URL patterns, and
 * outbound-link priorities.  Consumed by cross-theme-links, RelatedResources,
 * and audit scripts.
 */

// ── Page type enum ──────────────────────────────────────────────────────────

export type PageType =
  | 'homepage'
  | 'worksheets-hub'
  | 'theme-hub'
  | 'grade-page'
  | 'product-page'
  | 'blog-index'
  | 'blog-post'
  | 'grade-hub';

// ── Configuration per page type ─────────────────────────────────────────────

export interface PageTypeConfig {
  /** Whether this page acts as a hub (passes equity down) */
  isHub: boolean;
  /** URL pattern (uses Next.js-style bracket notation) */
  urlPattern: string;
  /** Outbound link targets in priority order (highest first) */
  linksTo: PageType[];
  /** Max outbound links per target page type */
  maxOutboundByType: Partial<Record<PageType, number>>;
}

const PAGE_TYPE_MAP: Record<PageType, PageTypeConfig> = {
  homepage: {
    isHub: true,
    urlPattern: '/[locale]',
    linksTo: ['worksheets-hub', 'blog-index', 'product-page'],
    maxOutboundByType: { 'worksheets-hub': 1, 'blog-index': 1, 'product-page': 6 },
  },
  'worksheets-hub': {
    isHub: true,
    urlPattern: '/[locale]/worksheets',
    linksTo: ['theme-hub', 'grade-hub'],
    maxOutboundByType: { 'theme-hub': 50, 'grade-hub': 5 },
  },
  'theme-hub': {
    isHub: true,
    urlPattern: '/[locale]/worksheets/[theme]',
    linksTo: ['grade-page', 'product-page', 'theme-hub', 'blog-post'],
    maxOutboundByType: { 'grade-page': 5, 'product-page': 15, 'theme-hub': 5, 'blog-post': 3 },
  },
  'grade-page': {
    isHub: false,
    urlPattern: '/[locale]/worksheets/[theme]/[grade]',
    linksTo: ['product-page', 'grade-page', 'theme-hub', 'blog-post', 'grade-hub'],
    maxOutboundByType: { 'product-page': 12, 'grade-page': 8, 'theme-hub': 3, 'blog-post': 2, 'grade-hub': 1 },
  },
  'product-page': {
    isHub: false,
    urlPattern: '/[locale]/apps/[slug]',
    linksTo: ['product-page', 'theme-hub', 'blog-post'],
    maxOutboundByType: { 'product-page': 4, 'theme-hub': 3, 'blog-post': 2 },
  },
  'blog-index': {
    isHub: true,
    urlPattern: '/[locale]/blog',
    linksTo: ['blog-post', 'theme-hub', 'product-page'],
    maxOutboundByType: { 'blog-post': 20, 'theme-hub': 5, 'product-page': 3 },
  },
  'blog-post': {
    isHub: false,
    urlPattern: '/[locale]/blog/[slug]',
    linksTo: ['product-page', 'theme-hub', 'blog-post', 'grade-page'],
    maxOutboundByType: { 'product-page': 3, 'theme-hub': 3, 'blog-post': 3, 'grade-page': 2 },
  },
  'grade-hub': {
    isHub: true,
    urlPattern: '/[locale]/apps/grades/[grade]',
    linksTo: ['grade-page', 'product-page', 'theme-hub'],
    maxOutboundByType: { 'grade-page': 50, 'product-page': 8, 'theme-hub': 5 },
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get the full config for a page type */
export function getPageTypeConfig(pageType: PageType): PageTypeConfig {
  return PAGE_TYPE_MAP[pageType];
}

/** Check whether a page type is a hub */
export function isHubPage(pageType: PageType): boolean {
  return PAGE_TYPE_MAP[pageType].isHub;
}

/** Get the max outbound links for a specific target type */
export function getMaxOutbound(from: PageType, to: PageType): number {
  return PAGE_TYPE_MAP[from].maxOutboundByType[to] ?? 0;
}

/** Get ordered link-target page types for a given source */
export function getLinkTargets(pageType: PageType): PageType[] {
  return PAGE_TYPE_MAP[pageType].linksTo;
}
