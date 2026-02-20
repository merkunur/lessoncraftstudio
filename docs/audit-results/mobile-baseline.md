# Mobile Design Baseline - Part 14

**Date:** 2026-02-20
**Scope:** All 17 theme-page components + 2 page templates (~3,663 landing pages)

## Mobile Design Standards

| Standard | Target | Rationale |
|----------|--------|-----------|
| Grid breakpoints | Start at 1-2 cols on mobile | Prevents cramped layout on 320px screens |
| Tap targets | >= 32px (non-interactive), >= 48px (interactive) | WCAG / Google guidelines |
| Body text | >= text-sm (14px) | Readable without zooming |
| Padding | Responsive variants for large values | Prevent text squeeze on mobile |
| Containers | `container mx-auto px-4` | Consistent horizontal padding |

## Fixes Applied in Part 14

### 1. ThemeSamplePreviews grid (ThemeSamplePreviews.tsx:18)
- **Before:** `grid-cols-3 md:grid-cols-4` (3 cols on 320px with col-span-2 first image)
- **After:** `grid-cols-2 sm:grid-cols-3 md:grid-cols-4` (2 cols on mobile, first image full width)

### 2. ThemeTeachingTips title padding (ThemeTeachingTips.tsx:78)
- **Before:** `pr-20` (80px fixed right padding for audience badge)
- **After:** `pr-16 sm:pr-20` (64px on mobile, 80px on sm+)

### 3. ThemeHowTo step badges (ThemeHowTo.tsx:34)
- **Before:** `w-8 h-8` (32px)
- **After:** `w-9 h-9` (36px, closer to tap-target guideline)

### 4. GradeEducationalContent step badges (GradeEducationalContent.tsx:146)
- **Before:** `w-7 h-7` (28px)
- **After:** `w-8 h-8` (32px, consistent with HowTo pattern)

### 5. ThemeComparisons VS badge (ThemeComparisons.tsx:51)
- **Before:** `px-2.5 py-1`
- **After:** `px-3 py-1` (more comfortable reading on mobile)

## Static Audit Results

```
PASS: 14  WARN: 1  FAIL: 0
```

### All Checks

| Category | Result | Details |
|----------|--------|---------|
| Grid: hero grids | PASS | grid-cols-3 with w-20 items (240px + gaps fits 320px) |
| Grid: all components | PASS | All grids use mobile-first breakpoints |
| Padding | PASS | No oversized fixed padding without responsive variants |
| Badge: GradeEducationalContent | PASS | w-8 h-8 (32px) meets threshold |
| Badge: ThemeAppGrid | PASS | w-10 h-10 (40px) meets threshold |
| Badge: ThemeHowTo | PASS | w-9 h-9 (36px) meets threshold |
| Text sizes | PASS | No body text below text-sm (14px) |
| Text readability | PASS | 7 components use text-sm with leading-relaxed |
| Containers: components | PASS | All sections use container mx-auto px-4 |
| Containers: theme hub | PASS | Uses container pattern |
| Containers: grade page | PASS | Uses container pattern |
| Responsive stacking | PASS | flex-col -> flex-row pattern used |
| Fixed widths | PASS | No fixed-width containers |
| ThemeAssessment scroll | WARN | Expected: responsive table with overflow-x-auto fallback |

### WARN Explanation
ThemeAssessment.tsx uses `overflow-x-auto` for its responsive table pattern. This is the gold-standard approach: the table displays normally on desktop and scrolls horizontally on small screens as a graceful degradation. No fix needed.

## Positive Findings (No Changes Needed)

- All sections use `container mx-auto px-4` for consistent horizontal padding
- Hero grids: `w-20 h-20 md:w-24 md:h-24` fits 320px screens (3 x 80px = 240px + gaps)
- ThemeAssessment: gold-standard responsive table with mobile card fallback
- ThemeActivities: `flex flex-col sm:flex-row` proper mobile stacking
- All headings use responsive text sizing (`text-3xl md:text-4xl`)
- App grid: `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` proper progression
- Grade nav: `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5` proper progression
- Related themes: `flex flex-wrap` for natural wrapping
- No `<table>` layout abuse (only semantic table in Assessment with mobile fallback)
- No fixed-width containers anywhere

## Audit Script

Run: `node scripts/mobile-audit.js`
JSON: `node scripts/mobile-audit.js --json`
