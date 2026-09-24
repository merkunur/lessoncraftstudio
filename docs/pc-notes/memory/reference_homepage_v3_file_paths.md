---
name: reference-homepage-v3-file-paths
description: "Canonical file path index for homepage-v3 (live homepage as of commit `bc215a5c`, 2026-05-24). Use for fast navigation in future sessions."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 0c75407d-d747-4855-9a05-93b0e6f6f123
---

Live homepage as of 2026-05-24 (commit `bc215a5c`). All paths relative to `C:\Users\rkgen\lessoncraftstudio\`.

## Page entry point

- `frontend/app/[locale]/page.tsx` — live homepage. Imports 9 v3 components; preserves comprehensive `generateMetadata()` from v2 swap (canonical, hreflang × 11, OG, JSON-LD).

## 14 v3 components (all under `frontend/components/homepage-v3/`)

**Rendered in `frontend/app/[locale]/page.tsx` (9 sections in order):**
- `HeroV3.tsx` — hero + 2 CTAs + mascot + trust pills
- `PillarActivities.tsx` — Pillar 01 (3 activity card previews — card3 has per-locale image+tiles map)
- `PillarInteractive.tsx` — Pillar 02 (interactive worksheets + live sample play)
- `PillarPrintables.tsx` — Pillar 03 (paper stack visual + 4 list items)
- `TierTransition.tsx` — diagonal cream→teal seam + "And if you're / the one teaching" + bridge mascot
- `PillarMakers.tsx` — Pillar 04 (generator panel mockup)
- `PillarTools.tsx` — Pillar 05 (3 manipulative tools: Ten-frame / Number line / Ruler)
- `EmbedShareV3.tsx` — embed acquisition CTA + iframe snippet mockup
- `SignupV3.tsx` — bottom signup section + primary/secondary CTAs

**Internal sub-components used by the above:**
- `ActivityCardPreview.tsx` — used by PillarActivities (3 card previews)
- `BreadthThumbV3.tsx` — thumbnail tile used by PillarInteractive
- `DoodleAccents.tsx` — DoodleBullet + Arrow SVG primitives used across pillars
- `FeaturedDeckTileV3.tsx` — modal-style featured deck (used by PillarInteractive)
- `MascotPlaceholder.tsx` — elephant mascot SVG component (with `poseHint` prop)

## Preview route (safety net — kept, marked noindex)

- `frontend/app/[locale]/preview/homepage-v3/page.tsx` — preview homepage (calls same 9 v3 components)
- `frontend/app/[locale]/preview/homepage-v3/layout.tsx` — Baloo 2 + Nunito fonts, `robots: { index: false, follow: false }`, body bg + endpaper override
- `frontend/app/[locale]/preview/homepage-v3/homepage-v3.css` — `.hv3`-scoped CSS (also imported by live `page.tsx` via relative path)

## i18n namespaces

- `frontend/messages/<locale>.json` for all 11 locales (en, de, fr, es, pt, it, nl, sv, da, no, fi)
- Live homepage uses 2 namespaces:
  - `homepage.meta` — page-level metadata (title, description, ogTitle, ogDescription, ogAlt). Already populated in all 11 locales pre-session; reused from v2 because brand-level copy isn't v2-design-specific.
  - `homepageV3.*` — all visible content (hero / pillar01-05 / transition / embedShare / signup / featuredTile / mascot / metadata). Populated this session via 11-locale recreation arc.
- Catalog hub at `/[locale]/worksheets/` uses `worksheetsPage.*` namespace (added this session, 10 keys × 11 locales). See `frontend/app/[locale]/worksheets/page.tsx`.

## CTA target patterns

| Component | CTA | href pattern |
|---|---|---|
| HeroV3 primary | "Start an activity" | `/${locale}/activities` |
| HeroV3 secondary | "Browse the catalog" | `/${locale}/worksheets/` |
| PillarActivities | "Start an activity" | `/${locale}/activities` |
| PillarInteractive | "Browse the catalog" | `/${locale}/worksheets/` |
| PillarPrintables | "See printable worksheets" | `/${locale}/worksheets/` |
| SignupV3 primary | "Start an activity" | `/${locale}/activities` |
| SignupV3 secondary | "Make an account" | `/${locale}/auth/signup` |

## Card3 per-locale image+tiles map

In `frontend/components/homepage-v3/PillarActivities.tsx` (look for `card3ByLocale` const). 11 entries:

- 9 locales use elephant image + 3-syll local word: en (`['ca','ba','llo']` horse + Spanish caballo demo), de (Elefant), fr (éléphant), nl (olifant), sv (elefant), da (elefant), no (elefant), es (caballo), pt (cavalo), it (cavallo)
- 1 locale uses giraffe image: fi (`['ki','rah','vi']` kirahvi — only locale requiring image swap because "elefantti" is 4 syll in FI)

## Component-Tailwind / CSS conventions

- `.hv3` class scope — all v3-specific Tailwind utilities + custom CSS in `homepage-v3.css` are scoped under `.hv3` to avoid bleed into other site pages
- Font variables: `--font-baloo-2`, `--font-nunito` (set via `next/font/google` at the page level)
- Color tokens: `lcs-cream` (`#FBF3E4`), `lcs-coral` (`#F2784B`), `lcs-coral-deep` (`#D14F1F`), `lcs-teal` (`#146B5E`), `lcs-teal-deep` (`#0E544A`)

## Navigation (CategoryNav)

- `frontend/components/layout/CategoryNav.tsx` — client component (`'use client'`) with hover/click dropdowns
- `frontend/lib/category-nav-data.ts` — `buildCategories()` function constructing dropdown structure
- 6 dropdowns: Worksheets / Activities / Manipulatives / Topics / Apps / Interactive
- "Browse all" for Worksheets + Interactive both land on `/[locale]/worksheets/` (changed this session per commit `69d7cfdb`)

## Verification helpers

To quickly verify homepage-v3 is live on all 11 locales (curl):

```bash
for loc in en de fr es pt it nl sv da no fi; do
  framework=$(curl -sL "https://www.lessoncraftstudio.com/$loc/?nc=$(date +%s%N)" | \
    grep -oE '(SLO Kerndoelen|Lgr22|Lehrplan|BNCC|Indicazioni nazionali|programmes officiels|los planes de estudio|Fælles Mål|LK20|OPS 2014|Common Core)' | head -1)
  echo "$loc: $framework"
done
```

Expected: each locale returns its locale-credible curriculum framework name (per CLAUDE.md §A.13.49 taxonomy).

## Cross-references

- [[project-homepage-v3-live]] — what's live + what was preserved
- [[feedback-11-locale-recreation-discipline]] — how the 11-locale recreation arc worked
- [[project-homepage-v3-deferred-followups]] — what's queued post-session
- CLAUDE.md §4.3, §A.13.48, §A.13.49, §A.13.50, §A.13.51 — doctrine references
