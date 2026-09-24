---
name: project-homepage-v3-live
description: "Homepage-v3 was promoted from preview to live on 2026-05-24 — `/[locale]/page.tsx` now renders the 9-section v3 stack across all 11 locales. Future sessions MUST NOT rewrite the homepage using homepage-v2 components."
metadata: 
  node_type: memory
  type: project
  originSessionId: 0c75407d-d747-4855-9a05-93b0e6f6f123
---

The live homepage at `https://www.lessoncraftstudio.com/[locale]/` is **homepage-v3** (was homepage-v2 until commit `bc215a5c` on 2026-05-24).

## Promotion commits (chronological this session)
- `bc215a5c` — `[FEATURE][PROMOTE]` Replace live homepage with v3 design — 11-locale launch + HeroV3 secondary CTA → /worksheets/
- `3dc57dfe` — `[FEATURE][LOCALIZATION][NSR-FLAG][SV,DA,NO,FI]` /worksheets chrome localized in all 11 languages
- `69d7cfdb` — `[FIX][NAVIGATION]` Dropdown "Browse all" → /[locale]/worksheets/ + SignupV3 CTA → /[locale]/activities (fixes non-EN 404)
- `94da0254` — `[FIX][PROTOTYPE]` Homepage v3 TierTransition line2 clipping — symmetric translate-Y to clear cream/teal seam

## Live structure

**Page file**: `frontend/app/[locale]/page.tsx`

**9 v3 components** (in render order):
1. `HeroV3`
2. `PillarActivities`
3. `PillarInteractive`
4. `PillarPrintables`
5. `TierTransition`
6. `PillarMakers`
7. `PillarTools`
8. `EmbedShareV3`
9. `SignupV3`

All under `frontend/components/homepage-v3/`. See [[reference-homepage-v3-file-paths]] for full file index.

**Wrapping**: `<main className="hv3 ${baloo2.variable} ${nunito.variable} font-lcsBody text-lcs-cream min-h-screen">`. The `.hv3` class scopes all v3-specific CSS in `frontend/app/[locale]/preview/homepage-v3/homepage-v3.css` (imported via relative path from the live page.tsx).

**Fonts**: Direction A typography pairing locked at CLAUDE.md §A.13.47 — Baloo 2 (display) + Nunito (body), latin-ext subset for all 11 locales.

**Body bg**: deep teal `#0E544A` + chalk-on-teal endpaper SVG pattern. Set via inline `<style>` in page.tsx — scoped to the live homepage; reverts when user navigates away.

**Metadata**: Comprehensive `generateMetadata()` preserved from v2 — canonical, hreflang × 11, OG image (`/de/decks/picture-path/og-image.png`), Twitter card, Schema.org JSON-LD (Organization + WebSite). Uses `homepage.meta` namespace (brand-level copy, not v2-design-specific; reused intentionally).

**ISR**: 3600s (1 hour) — same as before promotion.

## i18n namespaces in use
- **Page metadata**: `homepage.meta` (title, description, ogTitle, ogDescription, ogAlt) — all 11 locales already populated; not touched this session
- **Component content**: `homepageV3.*` (hero, pillar01-05, transition, embedShare, signup, featuredTile, mascot, metadata) — all 11 locales populated this session via 10-commission recreation arc; see [[feedback-11-locale-recreation-discipline]]

## CTA targets locked

| Component | CTA | href |
|---|---|---|
| HeroV3 primary | "Start an activity" | `/[locale]/activities` |
| HeroV3 secondary | "Browse the catalog" | `/[locale]/worksheets/` |
| PillarActivities | "Start an activity" | `/[locale]/activities` |
| PillarInteractive | "Browse the catalog" | `/[locale]/worksheets/` |
| PillarPrintables | "See printable worksheets" | `/[locale]/worksheets/` |
| SignupV3 primary | "Start an activity" | `/[locale]/activities` (was hardcoded EN slug; fixed in `69d7cfdb`) |

## What is NOT changed

- **homepage-v2 components** at `frontend/components/homepage-v2/*` — preserved on disk for rollback safety; cleanup deferred per [[project-homepage-v3-deferred-followups]]
- **`homepage.*` i18n namespace** in `frontend/messages/*.json` — preserved; `worksheet-makers` page still consumes `homepage.fourCardGrid.apps`
- **`/[locale]/preview/homepage-v3/` route** — kept in place with `robots: { index: false, follow: false }` layout; serves as visual-diff safety net
- **Sitemap** — `/[locale]/` already in shard 3 of `frontend/app/sitemap.ts`; preview not in sitemap; no change needed
- **Middleware** — no routing changes; URLs unchanged from end-user perspective

## Per-locale state of homepage v3 content

All 11 locales fully recreated. Per-locale curriculum framework squiggle locked per CLAUDE.md §A.13.49 — see that section for the canonical table. NSR-flag deferred review queued for `sv` / `da` / `no` / `fi` per CLAUDE.md §17.5.1 Nordic+Finnic doctrine.

## What to check first in a future session

1. **Don't re-explore the homepage swap**: this memory + CLAUDE.md §4.3 (amended this session) document it.
2. **Live homepage state**: `git log frontend/app/[locale]/page.tsx` will show commit `bc215a5c` as the v3 promotion commit.
3. **Deferred follow-up queue**: see [[project-homepage-v3-deferred-followups]].
4. **11-locale recreation pattern**: see [[feedback-11-locale-recreation-discipline]] before starting any new all-11-locale namespace work.
