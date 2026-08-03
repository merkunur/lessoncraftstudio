/**
 * Workspace tuning constants.
 *
 * Page sizes are client-side slice sizes: every list is fetched once in full
 * (the server caps are 300 hosted worksheets, 500 shared activities, 500
 * favorites) and paginated in memory, so these only affect how much is painted.
 */

export const WORKSPACE_TABS = [
  'overview',
  'worksheets',
  'activities',
  'collections',
  'favorites',
] as const;

export type WorkspaceTab = (typeof WORKSPACE_TABS)[number];

export const PAGE_SIZE = {
  worksheets: 12, // single-column rows
  activities: 12, // single-column rows
  collections: 12, // 3-col grid → 4 clean rows
  favorites: 24, // 2-col compact links → 12 rows
} as const;

/** How many rows each type previews on the overview tab. */
export const OVERVIEW_PREVIEW = {
  worksheets: 3,
  activities: 3,
  collections: 3,
  favorites: 4,
} as const;

export type SortKey = 'newest' | 'alphaAsc' | 'alphaDesc' | 'views';
