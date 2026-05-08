# [FIX][SEO] H1 — es deck-page title + meta-description localization

**Status:** DEFERRED — queued in audit-results/ for surfacing at the next es deck-publish wave moment.
**Type:** `[FIX][SEO]` — small commission extending publish-cli's `buildSeoHead` helper with locale-aware app-name + worksheet-name substitution.
**Priority gate:** **ship BEFORE next es deck-publish wave.** Operator-strategic ordering directive (2026-05-08): doesn't block Arc 7+ lesson-plan authoring (different layer); commissions when es deck-publish work returns to Track C.
**Source:** `docs/audit-results/deck-page-indexability.md` §H1 finding (audit commit `4f920f91`, 2026-05-08).

## Problem

9 of 11 sampled es deck pages have English app-name/worksheet-name text intermixed in their `<title>` and `<meta name="description">`:

| Slug | Current es title | Issue |
|---|---|---|
| matching-letter | "Match Up Worksheet — Jardín de infancia" | English app-name |
| chart-count | "Picture Graph Worksheet — Jardín de infancia" | English |
| odd-one-out | "Odd One Out Worksheet — Animales — Jardín de infancia" | English |
| math-worksheet | "Math Worksheet Practice Worksheet — Jardín de infancia" | English (+ awkward doubling) |
| bingo | "Picture Bingo Worksheet — Animales — Jardín de infancia" | English |
| pattern-train | "Pattern Train Practice Worksheet — Jardín de infancia" | English |
| sudoku | "Picture Sudoku Worksheet — Jardín de infancia" | English |
| word-guess | "Word Guess Practice Worksheet — Animales — Jardín de infancia" | English |
| word-scramble | "Word Scramble Practice Worksheet — 1.º de primaria" | English |

Only 2 of 11 are fully Spanish:
- `addition-image-image`: "Suma Divertida Ficha — Animales — Jardín de infancia" ✓
- `wordsearch`: "Sopa de Letras Hoja de ejercicios — 1.º de primaria" ✓

Same intermixing in `<meta name="description">`: "Free interactive [English app-name] for [Spanish level]. Print or play online." → English-Spanish intermix.

**Source of mismatch:** publish-cli's `buildSeoHead` helper (per CLAUDE.md §17.8.5) substitutes `__EDUCATIONAL_LEVEL_LOCALIZED__` correctly (Spanish levels render: "Jardín de infancia," "1.º de primaria"). But app-name and worksheet-name are NOT locale-aware — they use English strings even on es pages.

**SEO impact:** title + meta-description are LOAD-BEARING signals for locale-relevance ranking in Google's per-locale search. Mixed-locale text confuses Google's per-locale ranking algorithm; reduces SERP click-through for Spanish-search users. Per CLAUDE.md §17.4 doctrine, native-language slugs principle generalizes from URL slugs to title + description content.

## Scope

**Files to touch:**
- `REFERENCE TRANSLATIONS/catalog-export.js` — extend `buildSeoHead` helper (or `LCSCatalogExport.export`) with per-locale app-name + worksheet-name lookup.
- `REFERENCE TRANSLATIONS/translations-shared.js` — add per-locale `seo.appName.<app>` + `seo.worksheetWord` keys (or similar shape; pick canonical key shape consistent with existing `seo.educational_level.*` pattern).
- Per-locale string population × 11 locales × ~30 strings (29 §14.10 apps + "Worksheet" word + "Practice Worksheet" variants + "Free interactive" description-prefix + "Print or play online" description-suffix).
- Estimated ~30 strings × 11 locales = ~330 translation entries.

**Per CLAUDE.md §17.8.1 spec — title pattern:**
```
<Exercise type, capitalized> Worksheet — <Theme, capitalized> — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio
```

The fix substitutes the bracketed segments with locale-aware lookups:
- `<Exercise type, capitalized>` → `seo.appName.<app>.<locale>` (e.g., `picture-sudoku.es = "Sudoku con imágenes"`)
- `Worksheet` → `seo.worksheetWord.<locale>` (e.g., `es = "Hoja de ejercicios"` / `pt = "Folha de exercícios"`)
- `<Theme, capitalized>` → already localized via `topics-taxonomy.json axes.theme.<key>.name.<locale>` (existing infrastructure per §16.5.1; already correctly Spanish on es pages).

**Per CLAUDE.md §17.8.1 description pattern:**
```
Free interactive <exercise type> worksheet <theme phrase> for __EDUCATIONAL_LEVEL_LOCALIZED__. <Activity instruction sentence>. Print or play online.
```

Description segments:
- `Free interactive` → `seo.descPrefix.<locale>` (e.g., `es = "Hoja de ejercicios interactiva gratuita de"`)
- `<exercise type>` → same `seo.appName.<app>.<locale>` lookup as title
- `<theme phrase>` → existing localized theme name
- `Print or play online` → `seo.descSuffix.<locale>` (e.g., `es = "Imprime o juega en línea"`)

The `<Activity instruction sentence>` is per-app already-localized text (existing infrastructure per §17.8.1; already correctly Spanish on the 2 fully-Spanish es decks like wordsearch — "¡Encuentra y rodea las palabras escondidas!").

## Verification at ship

- Re-fetch the 11 es deck pages; all 11 should have fully-Spanish title + description.
- Spot-check 3 other locales (en, de, pt) — title + description should remain locale-correct (en stays English; de gets "Arbeitsblatt"; pt gets "Folha de exercícios" or BR-canonical equivalent).
- Schema.org JSON-LD `name` + `description` fields automatically inherit the fix (they mirror title + meta description per §17.8.1).
- Run quick deck.html SEO grep: `curl -s https://www.lessoncraftstudio.com/es/decks/<slug>/ | grep -E 'title|description'` for spot-check.

## Out of scope

- Hreflang activation (M1 from same audit) — separate commission, waits for v2 translate-this-deck workflow OR inferred-hreflang amendment.
- Open Graph metadata addition (M2 from same audit) — separate small `[FIX][SEO]` commission; can ship in any order.
- Cloudflare AI-bot policy verification (M3) — operator-side Cloudflare config check; not code.
- hreflang-symmetry.json re-baseline (M4) — separate small `[CHORE]`.

## Estimated effort

**Small commission.** ~330 string entries (small extension of existing translations-shared.js authoring patterns) + helper extension at `buildSeoHead` (1 of 2 functions in `catalog-export.js`) + per-locale verification.

**Estimated CC sessions:** 1 session to author the strings + helper extension + run validator + verify against the 11 es deck pages. Pre-commit hooks enforce normal authoring discipline.

**Per-locale string authoring effort:** for the ~30 strings × 11 locales = ~330 entries:
- en: source language; ~30 entries authored once.
- de + es + nl + it + fr + pt: Romance + Germanic Tier per CLAUDE.md §17.5; CC quality assessment strong.
- sv + da + no + fi: Nordic Tier; per §17.5 NSR-flag-at-ship discipline applies; flag for native-speaker review.

**NSR-flag at ship:** per CLAUDE.md §17.5.1: SEO strings for sv/da/no/fi should be authored at best-effort quality + NSR-flagged for review at launch (Pillar 1 NSR-resolution gate per v3 SUBSCRIPTION-SCOPE.md §1 Condition 3).

## When to commission

**Ship-before-next-es-publish-wave gate:** when operator's worksheet-deck Track C extends to es-side publishing OR the operator commissions a fresh es-deck-publish wave (currently 11 es decks shipped; next wave would add more). This commission ships BEFORE that wave to prevent further accumulation of English-intermixed es titles + descriptions.

**Other-locale benefit:** the fix improves ALL non-English locale deck-page titles + descriptions automatically (de, nl, pt, fr, it, sv, da, no, fi); not just es. Audit only sampled es; same fix benefits all 10 non-English locales.

## Cross-references

- Audit document: `docs/audit-results/deck-page-indexability.md` §H1
- CLAUDE.md §17.8.1 deck.html SEO surface spec
- CLAUDE.md §17.8.5 publish-cli substitution responsibility
- CLAUDE.md §17.4 native-language doctrine
- CLAUDE.md §17.5 keyword research workflow + locale tier posture
- CLAUDE.md §A.13.7 first-publish-verification cadence (post-fix verification gate)
