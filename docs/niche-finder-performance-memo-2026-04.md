# Niche Finder Performance Memo — April 2026

**Scope:** Static code review of `/en/tools/niche-finder` as part of the SEO
refresh (Phase 8). No Lighthouse run — to be done against production after
deploy.

## Current architecture

| File | Lines | Role |
|------|------:|------|
| `frontend/app/[locale]/tools/niche-finder/page.tsx` | 551 | Server component. Renders prose hero, SEO schemas (BreadcrumbList, WebApplication, FAQPage, ItemList), static FAQ, and mounts the client NicheFinder. |
| `frontend/app/[locale]/tools/niche-finder/NicheFinder.tsx` | 1,429 | **Client component** (`'use client'`). Hosts the filter panel, sort logic, and the full grid of 50+ niche cards. |
| `frontend/app/[locale]/tools/niche-finder/niches-database.ts` | 1,732 | Module of static niche records (names, demand/competition/opportunity scores, platforms, tags, etc.). Imported into NicheFinder so it ships in the client bundle. |

## Observations

1. **No image loading concern.** The niche grid is text-only (icons/badges, no
   `<img>` or `next/image` tags). LCP / CLS risk from images is zero.

2. **The niche data ships to the browser.** Because `NicheFinder` is a client
   component and imports `niches-database` directly, the ~1.7k-line static
   data file is serialized into the JS bundle. Every visitor downloads the
   full dataset regardless of the filter state they eventually apply.

3. **No server-rendered card list.** Without JavaScript, users see the prose
   intro and FAQ but no niche grid at all — the main value of the page is
   locked behind client-side hydration.

4. **Filter panel UX is stateful.** 11 interactive filters (categories,
   platforms, demand/competition/opportunity sliders, seasonality, age,
   languages, bundle potential, quick filters) plus sort, all driven by
   `useState` with `useMemo` filtering. This is legitimate client-side work.

## Recommendations

### Short-term (safe, modest payoff)

- **Verify LCP/INP live.** Run PageSpeed Insights against
  `https://www.lessoncraftstudio.com/en/tools/niche-finder` after deploy
  and capture baseline scores. If LCP is slow, the culprit is likely the
  JS bundle size from `niches-database.ts` rather than anything rendered.

### Medium-term (real win if LCP is slow)

- **Split rendering into SSR initial list + client filter layer.**
  - Refactor `NicheFinder.tsx` so the server component (`page.tsx`)
    renders a default-sorted, unfiltered card grid using the same
    `niches-database` data.
  - Keep a much smaller client component (~200 lines) that mounts the
    filter panel and, on interaction, hides/shows the SSR-rendered cards
    (or re-renders a subset).
  - Net effect: page is readable immediately, JS only adds filter
    interactivity, and search engines see the full card list in the
    initial HTML.

- **Server-import the niche data.** If the refactor above lands, the
  server component can import `niches-database.ts` at build time and
  embed only the rendered HTML. The client component no longer needs the
  full dataset.

- **Shrink the data ship.** If the client component still needs the
  data (for client-side filtering), pick just the fields the filter
  depends on and serialize a compact JSON (`{id, cat, dem, comp, opp,
  plats}` rather than the full record). Reduces bundle size meaningfully.

### Long-term (probably not worth it)

- **URL-state the filter.** Encode the current filter+sort in the URL
  (`?cat=kids&plat=kdp&sort=demand`) so filtered views can be bookmarked
  and crawled. Adds SEO surface but requires URL → state sync.

## Decision

No code changes in this round. The refactor is non-trivial (1,500+ LOC
restructure) and has real UX risk if the filter interactivity breaks.
Baseline the production Lighthouse score first; refactor only if LCP,
INP, or bundle size metrics are materially below 90.

## What to run after deploy

```
# Lighthouse against production
npx lighthouse https://www.lessoncraftstudio.com/en/tools/niche-finder \
  --output=json --output-path=niche-finder-lighthouse.json \
  --preset=desktop --only-categories=performance,seo

# Then same URL with --preset=mobile to catch mobile-specific issues
```

Report LCP, INP, CLS, TBT, and "Total Byte Weight" back into the
translation queue or a follow-up doc.
