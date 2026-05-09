# `[ARC][SEO][DECK-PAGE]` Phase 3a.3 — 11-locale baseline curl sweep

**Type:** docs-only deliverable per Phase 3a.3 plan; pre-Phase-4a-retrofit "before" measurement substrate
**Generated:** 2026-05-09
**Predecessor:** Phase 3a.2 emission surface deploy at `b8a0f9a3`

---

## Purpose

Documents the existing-deck baseline state across all 11 platform locales. Existing already-published decks (Phase 3a.1 baseline; predates Phase 3a.2 emission-side activation) retain pre-fix state until Phase 4a retrofit's `republish-seo` mode re-emits the SEO block via the `<!-- SEO_INSERTION_POINT_START/END -->` marker pair shipped at Phase 3a.2.

Phase 3a.3 sweep establishes the "before" measurement that Phase 4a retrofit refreshes.

---

## Sample selection

1 representative published deck per locale across 11 platform locales. Slug `sudoku` used as canonical sample where present (10/11 locales); `no` (Norwegian) sampled with `pattern-worksheet` (sudoku not yet published in `no` per sitemap shard 1 enumeration).

---

## Baseline measurements (2026-05-09)

| Locale | Slug | HTTP | Redirects | h1 count | OG+Twitter count | SEO_INSERTION_POINT count | Canonical |
|---|---|---|---|---|---|---|---|
| en | `/en/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/en/decks/sudoku/` |
| de | `/de/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/de/decks/sudoku/` |
| es | `/es/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/es/decks/sudoku/` |
| nl | `/nl/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/nl/decks/sudoku/` |
| pt | `/pt/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/pt/decks/sudoku/` |
| it | `/it/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/it/decks/sudoku/` |
| fr | `/fr/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/fr/decks/sudoku/` |
| sv | `/sv/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/sv/decks/sudoku/` |
| da | `/da/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/da/decks/sudoku/` |
| no | `/no/decks/pattern-worksheet/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/no/decks/pattern-worksheet/` |
| fi | `/fi/decks/sudoku/` | 200 | 0 | **2** | **0** | **0** | `https://www.lessoncraftstudio.com/fi/decks/sudoku/` |

**Aggregate:** 11/11 locales cleanly sampled. All baseline state matches pre-Phase-4a-retrofit expectation.

---

## Per-locale title strings (F3+H1 broader-observation reproduction)

The title strings reveal the empirical pattern Phase 0 §6 documented as F3+H1 root-cause:

| Locale | Title |
|---|---|
| en | `Picture Sudoku Worksheet — Kindergarten \| LessonCraftStudio` |
| de | `Picture Sudoku Worksheet — Kindergarten \| LessonCraftStudio` |
| es | `Picture Sudoku Worksheet — Jardín de infancia \| LessonCraftStudio` |
| nl | `Picture Sudoku Worksheet — Kleuterschool \| LessonCraftStudio` |
| pt | `Picture Sudoku Worksheet — Jardim de infância \| LessonCraftStudio` |
| it | `Picture Sudoku Worksheet — Scuola materna \| LessonCraftStudio` |
| fr | `Picture Sudoku Worksheet — Grande section \| LessonCraftStudio` |
| sv | `Picture Sudoku Worksheet — Förskoleklass \| LessonCraftStudio` |
| da | `Picture Sudoku Worksheet — Børnehaveklasse \| LessonCraftStudio` |
| no | `Complete the Pattern Worksheet — 1. trinn \| LessonCraftStudio` |
| fi | `Picture Sudoku Worksheet — Esikoulu \| LessonCraftStudio` |

### Pattern observations

**Working correctly (per §17.8.6 mapping):**
- Educational-level segment localized cleanly across all 11 locales:
  - `Kindergarten` / `Jardín de infancia` / `Kleuterschool` / `Jardim de infância` / `Scuola materna` / `Grande section` / `Förskoleklass` / `Børnehaveklasse` / `Esikoulu` / `1. trinn`
  - Confirms `__EDUCATIONAL_LEVEL_LOCALIZED__` substitution per Phase 3a.1 Checkpoint 1's substitute.js shipped state

**F3+H1 broader observation reproduced:**
- Worksheet-name segment STILL ENTIRELY ENGLISH across non-English locales: `Picture Sudoku Worksheet`, `Complete the Pattern Worksheet`
- Per Phase 0 §5 root-cause-located-at: `catalog-export.js:268 buildSeoHead` opts caller-side passes `worksheetWord` / `freeInteractive` / etc. as English literals via per-app `t()` resolution divergence per §17.8.14 srLang-keyed lookup

This is the LOCALE_RESIDUE_DETECTED predicate's halt-class signal. Phase 3b path-(b) trace fixes the root cause; Phase 4a retrofit then refreshes existing decks. Phase 3a.1 Checkpoint 1 lexicon-fallback path-(a) catches the residue; Phase 3a Resolution prevents new publishes from the existing template's English chrome. The 11 sampled decks predate Phase 3a.1 — they ship the literal English chrome unchecked.

---

## Anomaly detection

Per Phase 3a.3 plan Sub-step 1 verification — surface ANY divergence from baseline expectation. Result:

**Zero anomalies detected.** All 11 locale baselines match pre-Phase-4a expectation:
- Canonical URLs resolve direct HTTP 200 (per §A.10 routing-contract preserved)
- Multi-h1 violation present (2 `<h1>`) reproduces Phase 0 finding 2 across all 11 locales
- OG-tag absence reproduces Phase 0 F5 across all 11 locales
- Educational-level localization works per §17.8.6 mapping

No deck shows post-fix state (which would suggest a Phase 3a.2-window re-publish that I'd need to investigate). The baseline is structurally pristine.

---

## Sample-selection note: norwegian sudoku absence

`no` locale lacks a published `sudoku` deck (sitemap shard 1 enumeration confirmed). Baseline sample fell through to `pattern-worksheet` instead. This is informational; doesn't affect Phase 4a retrofit (which operates on every published deck regardless of slug).

`no` was at Track A + Wave 1 substrate-only state at Phase 0 audit (per CLAUDE.md §6 + §19.5 launch-state). First Track C deck-publish in `no` would be a separate operator-side initiative; not gated by Phase 3a.

---

## Phase 4a retrofit measurement target

After Phase 4a retrofit completes, this baseline document re-runs against the same 11 sampled URLs. Expected POST-retrofit state:

| Locale | h1 count | OG+Twitter count | SEO_INSERTION_POINT count |
|---|---|---|---|
| All 11 | **1** (down from 2) | **14** (up from 0) | **2** (one START + one END marker) |

The delta is the Phase 4a retrofit's empirical signature. If any locale doesn't reach 1/14/2 post-retrofit, the retrofit script (`republish-seo` mode) failed for that deck → diagnose + re-run.

---

## Cross-references

- Phase 0 substrate audit: `docs/SEO/deck-page-arc-phase-0-substrate.md` (`ad0e49c7`) — original empirical findings
- Phase 1 finding-class taxonomy: `docs/SEO/deck-page-arc-phase-1-taxonomy.md` (`ac9109c7`) — F3+H1 root cause analysis
- Phase 2 doctrinal extension: `docs/SEO/deck-page-arc-phase-2-doctrine-draft.md` (`ac9109c7`) — invariants + predicates
- Phase 3a.1 Checkpoint 1 (`0f459e4d`): schema + 7 gate predicates + lexicon
- Phase 3a.1 Checkpoint 2 (`276a79b8`): wire-in + count-inbound helper
- Phase 3a.2 (`b8a0f9a3`): emission surface + 29-app multi-h1 fan-out + §14.6 TWO-STEP deploy
- §17.8.1 deck.html SEO surface spec
- §17.8.6 age-range to educational-level mapping
- §17.8.14 srLang-keyed lookup convention
- §A.10 origin nginx www-canonicalization

*End of Phase 3a.3 baseline. Phase 4a retrofit measurement target documented; retrofit's `republish-seo` mode re-runs against this baseline to confirm post-fix state.*
