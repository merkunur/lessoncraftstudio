# Performance Baseline (Part 13)

Date: 2026-02-20

## Core Web Vitals Targets

| Metric | Target | Notes |
|--------|--------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero section text or first clipart image |
| INP (Interaction to Next Paint) | < 100ms | Minimal client JS (1 client component) |
| CLS (Cumulative Layout Shift) | < 0.1 | All images have explicit width/height |

## Architecture Analysis

### LCP Candidates
- **Theme hub pages**: Hero `<h1>` text or first clipart image (96x96)
- **Grade pages**: Same pattern — hero text or first clipart
- Hero images use `loading="eager"` + `fetchPriority="high"` (first image only)
- All images have `decoding="async"` to offload decode from main thread

### Client JS Budget
- **1 client component** out of 17 theme-page components: `ThemeLearningObjectives.tsx`
- All other components are server components (zero client JS)
- Fonts self-hosted via `next/font` (no external requests)

### Image Strategy
- Hero clipart: `loading="eager"`, `fetchPriority="high"` (1st), `decoding="async"`
- Below-fold previews: `loading="lazy"`, `decoding="async"`
- All images have explicit `width`/`height` attributes (prevents CLS)
- Next.js image optimization: WebP + AVIF formats configured
- Sample images served directly by nginx (bypasses Next.js)

### Rendering Strategy
- Server-side rendering (RSC) for all landing pages
- `contentVisibility: 'auto'` + `containIntrinsicSize` on below-fold sections
- CSS-only animations (no Framer Motion `initial={{ opacity: 0 }}`)
- Standalone output mode for optimized bundle size

## Optimizations Applied in Part 13

| Change | File | Purpose |
|--------|------|---------|
| `fetchPriority="high"` on 1st hero image | theme hub `page.tsx` | Prioritize LCP candidate |
| `fetchPriority="high"` on 1st hero image | grade `page.tsx` | Prioritize LCP candidate |
| `decoding="async"` on hero images | theme hub `page.tsx` | Offload decode from main thread |
| `decoding="async"` on hero images | grade `page.tsx` | Offload decode from main thread |
| `decoding="async"` on preview images | `ThemeSamplePreviews.tsx` | Offload decode from main thread |

## Pre-existing Optimizations (No Changes Needed)

- Font loading: `next/font/google` with `display:'swap'`, `preload:true`
- contentVisibility on all below-fold sections
- Only 1 client component (ThemeLearningObjectives)
- Image formats: WebP + AVIF in next.config.js
- DNS prefetch: `X-DNS-Prefetch-Control: on`
- CSS: Tailwind purging + CSS-only animations
- No external domains = no preconnect needed
- `trailingSlash: false` (no duplicate URLs)

## Known Non-Issues

- **Unoptimized clipart thumbnails**: Clipart PNGs served directly without Next.js `<Image>` — intentional, as they're small (96x96) and self-hosted
- **No preconnect hints**: All resources are same-origin, preconnect not needed
- **No `<link rel="preload">` for hero images**: Images are inline `<img>` tags in SSR HTML, browser discovers them immediately during parse

## Static Audit Results

```
Script: node scripts/performance-audit.js

1. Image Attribute Audit .............. 9/9 PASS
2. Client Component Audit ............ 1/1 PASS
3. Content Visibility Audit ........... 4/4 PASS
4. Font Loading Audit ................. 3/3 PASS
5. Next.js Config Audit ............... 4/4 PASS

Total: 21 PASS, 0 WARN, 0 FAIL
```

## Live TTFB Results

```
Script: node scripts/performance-audit.js --live

Theme Hub Pages (target: < 800ms TTFB, < 200KB HTML):
  /en/worksheets/animals          294ms   63KB  gzip
  /en/worksheets/food             160ms   61KB  gzip
  /en/worksheets/transportation   157ms   63KB  gzip
  /en/worksheets/seasons          178ms   61KB  gzip
  /en/worksheets/sports           154ms   61KB  gzip

Grade Pages (target: < 800ms TTFB, < 200KB HTML):
  /en/worksheets/animals/kindergarten         157ms   45KB  gzip
  /en/worksheets/food/first-grade             183ms   45KB  gzip
  /en/worksheets/transportation/preschool     170ms   46KB  gzip
  /en/worksheets/seasons/second-grade         116ms   46KB  gzip
  /en/worksheets/sports/third-grade           168ms   46KB  gzip

All 10 URLs: PASS (TTFB 109-316ms, HTML 45-63KB, gzip compression)
Total: 51 PASS, 0 WARN, 0 FAIL
```

## Audit Script Usage

```bash
# Static analysis only (no network)
node scripts/performance-audit.js

# Static + live URL checks
node scripts/performance-audit.js --live

# JSON output for CI
node scripts/performance-audit.js --json
node scripts/performance-audit.js --live --json
```
