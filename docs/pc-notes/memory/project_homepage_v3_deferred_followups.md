---
name: project-homepage-v3-deferred-followups
description: Queue of deferred commissions surfaced during the homepage-v3 promotion arc (2026-05-24). Each is non-blocking but worth picking up in future sessions.
metadata: 
  node_type: memory
  type: project
  originSessionId: 0c75407d-d747-4855-9a05-93b0e6f6f123
---

The homepage-v3 promotion shipped to live on 2026-05-24 with intentional deferred cleanups. These are non-blocking — the live site works correctly — but are queued for future commissions in roughly priority order.

## 1. Nordic+Finnic native-speaker review (NSR)

**Scope**: SV, DA, NO, FI homepageV3 namespace + worksheetsPage namespace strings.

**Why**: CLAUDE.md §17.5.1 — Nordic+Finnic Claude-quality is weaker than Romance/Germanic. Ships at correct-enough state with `[NSR-FLAG][SV|DA|NO|FI]` in commit messages; deferred review queued post-deploy.

**Source commits**: `430167f7` (SV), `d05cd47f` (DA), `aec03810` (NO), `eed808ff` (FI) for homepageV3; `3dc57dfe` for worksheetsPage (all 11 in single batch with NSR-flag for the 4 Nordic+Finnic).

**How to commission**: hire a native SV/DA/NO/FI K-3 EdTech reviewer; have them flag any awkward phrasing, register issues, brand-voice misses, or pedagogical-term improvements. Apply corrections per locale; commit per locale with `[FIX][NSR][<locale>]` tag.

## 2. Homepage-v2 component cleanup

**Scope**: delete `frontend/components/homepage-v2/*` files (6 components: Hero, FourCardGrid, BreadthGrid, AllExerciseModesGrid, EmbedViralityCTA, SubscriptionSection).

**Why**: They were preserved on disk for rollback safety post-v3-promotion (commit `bc215a5c`). The promotion is stable; rollback unlikely. They're unused at runtime (no consumers in current code).

**Blocker**: NONE for the components themselves. Need to verify no straggler imports first via grep before deletion.

**Sub-task**: also delete `homepage.*` i18n namespace entries from `frontend/messages/*.json` — BUT only AFTER `worksheet-makers` page migrates to its own namespace (currently `worksheet-makers/page.tsx` consumes `homepage.fourCardGrid.apps`). Migrate that first, then namespace + components together.

## 3. `/[locale]/preview/homepage-v3/` route deletion

**Scope**: delete `frontend/app/[locale]/preview/homepage-v3/{page.tsx,layout.tsx,homepage-v3.css}`.

**Why**: Was the preview route during the prototype period. Now that v3 IS the live homepage, the preview is redundant. Currently kept as a visual-diff safety net with `robots: { index: false, follow: false }`.

**Blocker**: the live homepage's `page.tsx` imports `./preview/homepage-v3/homepage-v3.css` (relative path). Need to either MOVE the CSS file out of the preview directory before deletion, OR copy it into the live page's directory. Easiest: move to `frontend/app/[locale]/homepage-v3.css` and update import paths in both places.

## 4. `/[locale]/activities/` index UX

**Scope**: examine `frontend/app/[locale]/activities/page.tsx` — the activities index.

**Why**: 3 v3 components (HeroV3 primary, PillarActivities, SignupV3) now all target `/[locale]/activities`. The index needs to be a credible landing for that traffic. Currently it lists activities filtered by `slug[locale]` + `page_title[locale]` — works for all 11 locales per `TOPIC_ENABLED_LOCALES` but may have thin content for locales with few translated activities.

**Action**: review the activities index UX per locale; consider a "Coming soon" empty-state or cross-locale recommendation if a locale has <N activities.

## 5. OG image v3 redesign

**Scope**: replace `/de/decks/picture-path/og-image.png` (1200×630, locale-independent) with a v3-design-matching OG image.

**Why**: Carried over from v2; generic enough for current launch but doesn't visually represent the new v3 design (deep teal + cream + elephant mascot + endpaper pattern).

**Action**: design a new 1200×630 OG image matching v3 brand. Place at `/og-images/homepage-v3.png` or similar. Update `OG_IMAGE_PATH` constant in `frontend/app/[locale]/page.tsx`.

## 6. Per-locale card1 tile recreation

**Scope**: `PillarActivities.tsx` card1 tiles are hardcoded `['gat', 'to']` (Italian "gat-to" syllabification). All 11 locales' card1SubjectAlt is locale-specific (cat in their language), but the visible tiles stay Italian.

**Why**: Per-locale card1 tiles would require either (a) extending the existing `card3ByLocale` map pattern to card1 OR (b) generalizing both to a single `cardSubjects` map.

**Blocker**: design decision needed — does FI's "kissa" (kis-sa, 2-syll match) get its own tiles, or do all locales keep the Italian tiles as a "demonstration of multilingual platform" feature? Operator-strategic call.

**Cross-ref**: CLAUDE.md §A.13.51 documents the current hardcoded pattern.

## 7. Sitemap shard images for homepage

**Scope**: `frontend/app/sitemap.ts` shard 3 includes `/[locale]/` but doesn't have `<image:image>` entries for homepage assets.

**Why**: Per CLAUDE.md §A.14.10 image-SEO infrastructure shipped 2026-05-19, deck pages have image-sitemap entries. Homepage doesn't — Google's image-search can't find the homepage OG image without it.

**Action**: add `<image:image>` entries to homepage sitemap rows. Use the OG image (or a hero-illustration) as the image URL. Probably small-but-meaningful SEO win.

## 8. Activities slug per-locale translation

**Scope**: the activities manifest (`frontend/public/mini-tools/*-activities.json`) has slugs in EN; need per-locale slug translations so non-EN users can deep-link to specific activities.

**Why**: Currently if a user shares `/en/activities/count-to-10-with-animals/` to a German visitor, the German visitor lands on a 404. The English-only slug is a barrier.

**Blocker**: each activity needs operator-curated locale slugs (e.g., `count-to-10-with-animals` → `bis-10-zaehlen-mit-tieren` for DE). This is per-activity content authoring work.

**Cross-ref**: Bug 2 from session-end commit `69d7cfdb` was a workaround for this — SignupV3 CTA now lands on the activities index instead of a specific activity slug. Index works; deep links to specific activities still need per-locale slug fan-out.

---

**Priority ranking (operator-strategic)**:
1. NSR review (quality assurance for SV/DA/NO/FI)
2. v2 component + namespace cleanup (technical debt; low effort once `worksheet-makers` migrates)
3. Activities slug fan-out (UX improvement; per-activity content work)
4. OG image v3 redesign (SEO + brand polish)
5. Preview route deletion + CSS file relocation (cleanup)
6. Activities index UX (per-locale empty-state polish)
7. Card1 tile per-locale recreation (operator-strategic design call)
8. Homepage sitemap image entries (small SEO win)
