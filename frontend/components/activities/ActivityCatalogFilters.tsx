/**
 * ActivityCatalogFilters — thin re-export shim. The facet/sort/chips/empty
 * components were generalized 2026-07-06 into the shared catalog module
 * (components/catalog/CatalogFilters.tsx) when the worksheets hub adopted the
 * same faceted-catalog design. This shim keeps the activities page's imports
 * (and any future ones) stable; the rendered markup is byte-identical.
 */
export {
  CatalogSidebar as ActivitySidebar,
  CatalogMobileFilters as ActivityMobileFilters,
  CatalogSortControl as ActivitySortControl,
  CatalogActiveChips as ActivityActiveChips,
  CatalogEmptyState as ActivityEmptyState,
} from '@/components/catalog/CatalogFilters';
export type { FacetGroupVM, FacetItemVM } from '@/components/catalog/CatalogFilters';
