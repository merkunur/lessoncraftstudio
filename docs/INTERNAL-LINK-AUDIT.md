# Internal Link Audit — Part 158

**Date:** 2026-02-22
**Scope:** Full-site internal linking topology vs `link-equity-map.ts` design

## Link Topology Matrix

| Source Page | Links To | Status |
|-------------|----------|--------|
| **Footer** (global) | 10 apps, 8 categories, 5 grades, 50 themes, support/legal | OK |
| **Navigation** (global) | Home, Apps, Pricing, Blog, Dashboard | OK |
| **Grade hubs** (`/worksheets/grade/*`) | Products (app grid), Apps hub, 50 theme+grade pages | OK |
| **Category hubs** (`/worksheets/category/*`) | Products (app grid + table), Apps hub, 50 theme hubs | OK |
| **Theme hubs** (`/worksheets/*`) | 5 grade sub-pages, 8-15 products, 5 related themes, 3 blog posts | OK |
| **Theme+grade** (`/worksheets/*/grade/*`) | Products, 4 same-theme grades, 5 same-grade themes, blog, grade hub | OK |
| **Blog posts** (`/blog/*`) | 4 products, theme pills, 5 grade hubs, auto-keyword links, 3 blog-to-blog | OK |
| **Product pages** (`/apps/*`) | Related products (4-6), Related blog posts (3), **Related themes (3)** | FIXED |

## Gap Found

**Product pages -> theme hubs** was missing. The `link-equity-map.ts` specifies product pages should link to `theme-hub` (max 3), but only related products and blog posts were rendered.

### Fix Applied

Added `getThemesForApp()` reverse-lookup in `theme-app-mapping.ts` and rendered the existing `RelatedThemes` pill component on all 33 product pages (both content-registry and legacy code paths).

**Result:** 33 product pages x 3 theme links = up to 99 new bidirectional equity connections.

## Anchor Text Variety

- **50 unique theme names** used as anchor text for theme links
- **33 unique app names** for product cross-links
- **Blog post titles** (unique per post) for blog links
- **Auto-keyword links** in blog body text add natural variation

No anchor text over-optimization detected.

## Recommendations

No critical gaps remain. The site's internal linking topology now matches the `link-equity-map.ts` design. Future considerations:

1. Monitor crawl stats to verify Googlebot follows the new product->theme links
2. Consider adding theme links to the Strapi-sourced product pages (line 3687+) if those are still in use
