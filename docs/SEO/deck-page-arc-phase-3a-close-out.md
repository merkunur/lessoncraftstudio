# `[ARC][SEO][DECK-PAGE]` Phase 3a — close-out summary

**Type:** docs-only deliverable per Phase 3a.3 plan; aggregate close-out across Phase 3a.1 Checkpoint 1 + Checkpoint 2 + Phase 3a.2 + Phase 3a.3
**Generated:** 2026-05-09
**Phase 3a status:** CLOSED — gate fully operational; emission-side activated; rhythm-pause window closed; existing-deck baseline measured

---

## Scope summary

Phase 3a delivers the **publish-cli SEO reconciliation gate + emission-side activation + multi-h1 fix** per the [ARC][SEO][DECK-PAGE] commission spec § Phase 3 substantive code-work scope. After Phase 3a close, every new deck publish hits structural validation at the publish-cli boundary; emission-side ships the SEO surface (canonical + JSON-LD + 14 OG/Twitter tags + SEO_INSERTION_POINT marker pair + 1 `<h1>`). Existing already-published decks retain pre-fix state until Phase 4a retrofit.

---

## Commit history

| Commit | Phase | Title |
|---|---|---|
| `ad0e49c7` | Phase 0 | substrate audit |
| `ac9109c7` | Phase 1+2 | taxonomy + doctrinal-extension working draft |
| `0f459e4d` | Phase 3a.1 Checkpoint 1 | gate predicates + schema + ogLocaleMap |
| `276a79b8` | Phase 3a.1 Checkpoint 2 | gate wire-in + count-inbound helper |
| `b8a0f9a3` | Phase 3a.2 | emission surface + 29-app h1→h2 mechanical fan-out |
| (this commit) | Phase 3a.3 | verification + Phase 3a close-out summary |

Phase 3a substantive code-work commits: 3 (Checkpoint 1 + Checkpoint 2 + Phase 3a.2). Plus 2 docs-only commits (Phase 0 audit, Phase 1+2 doctrine) preceded; this Phase 3a.3 commit closes Phase 3a.

---

## Phase 3a.1 Checkpoint 1 deliverables (`0f459e4d`)

**6 files changed, 1362 insertions:**

- `frontend/prisma/schema.prisma` — Added `Deck.titleHash String?` + `Deck.descriptionHash String?` columns + `@@unique([language, titleHash])` compound constraint per Phase 2 doctrine §1+§2 uniqueness invariants
- `frontend/prisma/migrations/20260509083000_add_seo_hash_columns/migration.sql` — Additive ALTER TABLE + CREATE UNIQUE INDEX
- `frontend/lib/schema-generator.ts` — `ogLocaleMap` revision: `es: 'es_ES'` → `es: 'es_MX'` per Phase 0 D7 Mexican-Spanish register evidence (chabacano / pay de manzana / carriola / aguacate)
- `scripts/publish-cli/seo-reconciliation.js` (NEW; 794 LoC) — 7 gate predicates per Phase 2 doctrine §1-§7 + `reconcileDeckPageSEO` orchestrator. Mirrors slug.js sibling pattern + `{category, ...metadata}` return shape
- `scripts/publish-cli/seo-reconciliation-exceptions.json` (NEW; 64 lines) — Per-locale loanword exception list for path-(a) lexicon-fallback
- `scripts/publish-cli/seo-reconciliation.test.js` (NEW; 474 LoC; 31 tests passing) — Unit coverage including F3+H1 reproduction test

Schema migration applied to production at deploy verify; `\d decks` confirmed `title_hash` + `description_hash` columns + `decks_language_title_hash_key` UNIQUE INDEX present. ogLocaleMap es_MX revision propagated to `/es` homepage via Next.js metadata API.

## Phase 3a.1 Checkpoint 2 deliverables (`276a79b8`)

**6 files changed, 612 insertions:**

- `scripts/publish-cli/bulk.js` — Wired `dryRunOneZip` Step 5b (logical Step 1d) SEO reconciliation invocation; extended `writeBatchArtifacts` `_reconciliation.txt` with Section 3 (per-category tally + per-app + per-deck table); ctx callbacks for `findExistingByTitleHash` / `findExistingByDescriptionHash` / `countInboundFn`
- `scripts/publish-cli/publish.js` — Single-deck Step 2b SEO reconciliation parity per §15.16 single-vs-batch contract; INSERT/UPDATE persists `titleHash` + `descriptionHash` from seoRecon predicates
- `scripts/publish-cli/db.js` — `findExistingByTitleHash` + `findExistingByDescriptionHash` helpers; extended `insertDeck` + `updateDeck` to accept SEO hash params
- `scripts/publish-cli/substitute.js` — 5 new OG placeholder substitutions (`__OG_TITLE__` / `__OG_DESCRIPTION__` / `__OG_IMAGE__` / `__OG_LOCALE__` / `__OG_IMAGE_ALT__`) + composition logic; forward-compatible no-ops until Phase 3a.2 emission-side ships
- `scripts/publish-cli/reconciliation.integration.test.js` — 2 new SEO Section 3 tests (4-deck mixed CLEAN/HALT/WARN + all-CLEAN batch); 7/7 integration tests passing
- `frontend/lib/seo/count-inbound-surfaces.ts` (NEW; 145 LoC) — 8-surface inbound-link counter; flips reconcileInboundLinkSurface predicate from stub → real (cross-boundary TS/CJS integration deferred to Phase 4b adjudication)

Tests: 31 unit + 7 integration (38 total green). No deploy required (publish-cli operator-side).

## Phase 3a.2 deliverables (`b8a0f9a3`)

**30 files changed, 61 insertions, 30 deletions:**

- `REFERENCE TRANSLATIONS/catalog-export.js` (+32 lines) — `buildSeoHead` extension: emit OG tag block (10 og:* + 4 twitter:*) AFTER JSON-LD; wrap entire SEO block with `<!-- SEO_INSERTION_POINT_START -->` / `<!-- SEO_INSERTION_POINT_END -->` marker pair (Phase 4a retrofit foundation per concern 3 Option A lock)
- `REFERENCE APPS/*.html` (29 catalog apps; 1 line each) — Mechanical h1→h2 fan-out on celebration template per (B1) Resolution A. Sed line-context approach handled `shadow-match.html` `T_()` outlier cleanly

§14.6 TWO-STEP deploy executed:
- Step 1: deploy.sh (git pull + build + smoke; smoke clean with 2 pre-existing nginx warnings unrelated)
- Step 2: 30 served-copy syncs via `update-worksheet.sh` loop (1 catalog-export.js + 29 app HTMLs); chattr +i re-applied per file

Production verification clean: SEO_INSERTION_POINT marker count = 2 in served catalog-export.js; 14 OG/Twitter meta tags emitted; sudoku/shadow-match/addition all show h2 celebration.

**Empirical recalibration story:**
- Phase 1 §5 + Phase 2 §7 doctrine assumed celebration template was a single shared site at catalog-export.js
- Phase 3a.2 Sub-step 0 empirical verification per §A.13.6 surfaced Outcome B (per-app emission across 29 REFERENCE APPS/*.html)
- Cost recalibration per §A.13.8: original (B1) projected ~4350 LoC multi-session; empirical actual is 29 single-line edits = single short session
- Operator ratified (B1) lock; trade-off inverted ((B2) deferral would HALT every new publish for entire Phase 3b multi-session wave)

## Phase 3a.3 deliverables (this commit)

**2 files changed, ~270 insertions:**

- `docs/SEO/deck-page-arc-phase-3a.3-baseline.md` (NEW) — 11-locale curl sweep findings; pre-Phase-4a-retrofit "before" measurement substrate
- `docs/SEO/deck-page-arc-phase-3a-close-out.md` (NEW; this file) — aggregate Phase 3a close-out

11-locale baseline empirical findings:
- All 11 locales: HTTP 200 direct (no redirect chain) ✓
- All 11 locales: 2 `<h1>` elements (multi-h1 baseline; pre-Phase-4a) ✓
- All 11 locales: 0 OG/Twitter tags (pre-Phase-4a) ✓
- All 11 locales: 0 SEO_INSERTION_POINT markers (pre-Phase-4a) ✓
- All 11 locales: canonical correctly self-referential www-form trailing-slash ✓
- All 11 locales: educational-level correctly localized in title (per §17.8.6 mapping working) ✓
- All 11 locales: main worksheet name still entirely English (F3+H1 broader finding reproduced) ✓
- Zero anomalies detected

---

## Aggregate metrics

| Metric | Value |
|---|---|
| Substantive code-work commits | 3 (Checkpoint 1 + Checkpoint 2 + Phase 3a.2) |
| Total files changed | ~42 across the 3 substantive commits |
| Total LoC inserted | ~2035 (Phase 3a.1: 1974 + Phase 3a.2: 61) |
| Total LoC deleted | ~32 (Phase 3a.1: 2 + Phase 3a.2: 30) |
| Unit tests | 31 passing |
| Integration tests | 7 passing |
| Schema migrations applied | 1 (`20260509083000_add_seo_hash_columns`) |
| Production deploys | 2 (Phase 3a.1 Checkpoint 1 deploy + Phase 3a.2 §14.6 TWO-STEP) |
| Locales with new ogLocaleMap | 11 (es revised; pt locked at pt_BR; others preserved) |
| Apps with multi-h1 fix | 29 (all §14.10 catalog apps; 4 PDF-only correctly excluded) |

---

## Phase 4a retrofit scope (next for existing-deck refresh)

**Scope:** Re-emit SEO block in already-published deck.html files via `republish-seo` mode in publish-cli. Operates between `<!-- SEO_INSERTION_POINT_START -->` + `<!-- SEO_INSERTION_POINT_END -->` markers shipped at Phase 3a.2.

**Implementation:**
- New publish-cli mode: `node scripts/publish-cli/index.js republish-seo <slug> [--all-locales | --language <locale>]`
- Reads existing deck.html from `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/deck.html`
- Re-runs `buildSeoHead` against the deck's manifest to generate new SEO block
- Replaces content between SEO_INSERTION_POINT markers; preserves all other deck.html bytes
- Atomic symlink-swap per §15.5 publish.js precedent
- Backfills `Deck.titleHash` + `Deck.descriptionHash` from re-emitted strings

**Expected delta vs Phase 3a.3 baseline (per the 11-locale sample):**
- h1 count: 2 → 1
- OG+Twitter count: 0 → 14
- SEO_INSERTION_POINT count: 0 → 2

**Trigger:** operator-strategic; commission shape ~150-300 LoC for `republish-seo` mode + walk-and-rewrite logic. Phase 4a retrofit deferred per commission spec §2 ordering; substantively independent of Phase 3b.

## Phase 4b inbound-link uplift scope

Per Phase 0 §6 D5 + Phase 1 §3 + Phase 2 §5: inbound-link surface uplift across hub authority surfaces (homepage / topic / locale / BreadthGrid / sitemap) targeting N≥3 non-sitemap floor per concern 4 lock.

**Cross-boundary TS/CJS integration adjudication deferred per Checkpoint 2 close** — Phase 4b ratifies whether `frontend/lib/seo/count-inbound-surfaces.ts` (TypeScript) compiles into JS at build time for publish-cli (Node-CJS) consumption (CC pre-recommendation), OR alternative cross-boundary approach.

Phase 4b also flips `INBOUND_LINK_COUNT_BELOW_TARGET` predicate from WARN-class (pre-Phase-5) to HALT-class (post-Phase-5) per concern 4 escalation lock.

## Phase 5 NSR review scope

Per Phase 1 §6.6 + Phase 2 §6 + concern 5: NSR-flag entries in `seo-reconciliation-exceptions.json` pending native-speaker validation per §17.5.1 Nordic + Tier 4 Danish posture. Locales with NSR-flag at ship: sv, fi, no, da. Romance Tier 4 (fr, it, pt) authored without NSR.

Phase 5 commission shape: small native-speaker review pass; ~5-10 strings reviewed per Nordic locale; sustains exception list curation against false-positive emergence.

## Phase 6 fold-queue accumulation

Doctrinal items accumulated through Phase 3a for next [DOCS] cycle absorption:

### Item 1 — Mechanical-fan-out vs architectural-sweep distinction at 29-app scope

**Operator-surfaced at Phase 3a.2 (B1) recalibration.** Two structurally different patterns share the "29-app" prefix:

- **Mechanical fan-out** (Phase 3a.2 multi-h1): per-app diff identical bytes; no per-app architectural decisions; no Shape A discipline territory; sed-style replace; single commit; single deploy; single short session
- **Architectural sweep** (Phase 3b path-(b) trace; Shape A precedents `44cbdda1` / `05d0940e` / `109a91d4`): per-app instrumentation requires structural extension; per-app architectural decisions; Shape A discipline territory per §A.13.5; multi-commit; multi-session; requires §A.13.7 first-publish-verification cadence

**Planning-time predicate:** does per-app diff vary structurally?
- If no → fan-out class; bundle into nearest gate-paired authoring complement
- If yes → sweep class; standalone Phase

**Phase 1 §5 + Phase 2 §7 doctrine collapsed both classes** under same "29-app coordination cost" rubric; Outcome B recalibration at Phase 3a.2 Sub-step 0 surfaced the conflation. Likely lands as new §A.13.X subsection sibling to §A.13.4.

### Item 2 — Fan-out verification-hygiene step at mechanical-fan-out execution

**Operator-surfaced at Phase 3a.3 commencement turn.** Sub-pattern of mechanical-fan-out class:

> "Run sed across N files and trust exit code" is insufficient — substrate may not be uniform across the N. The discipline is: post-apply, verify all N files reflect the fix (not just that sed succeeded). Outliers surface at verification step + drive pattern-revision before re-apply.

**Empirical anchor:** Phase 3a.2 `shadow-match.html` `T_()` outlier. Initial `<h1 class="lcs-celebration__title">` pattern matched 28/29 apps. Switch to line-context pattern `/lcs-celebration__title/{s|<h1 |<h2 |; s|</h1>|</h2>|}` (independent of `T()`/`T_()` variation) achieved 29/29.

Sibling to §A.13.10 manifest-as-schema-contract discipline. Adds to Phase 6 fold-queue alongside Item 1.

### Item 3 — §A.13.6 + §A.13.8 paired discipline canonical reference

**Phase 3a.2 Sub-step 0 saved 100×+ overestimate** via empirical recon before applying. Discipline pair:
- §A.13.6 spec-vs-shipped-contract validation: halt before apply when doctrine assumes a substrate shape
- §A.13.8 adjudication-reversal: when recon surfaces a cost dimension the original adjudication didn't account for, recalibrate before executing

Worth keeping prominent as a canonical reference in CLAUDE.md doctrine. Possibly cross-link the two existing subsections to highlight their paired application.

### Item 4 — Phase 4a mutable-regions contract extension via SEO_INSERTION_POINT marker pair

**Resolution Option A locked at concern 3.** Phase 3a.2 ships the markers; Phase 4a uses them for `republish-seo` mode. The marker pair is the FIRST extension to §17.8's "deck.html bytes are immutable post-publish except HREFLANG_INSERTION_POINT" doctrine.

New §17.8 doctrinal subsection capturing the contract extension + retrofit pathway. Likely lands as §17.8.20 (or next available) at fold-cycle.

### Item 5 — Phase 2 §1-§7 invariants

Each Phase 2 doctrine §1-§7 invariant (title uniqueness, description uniqueness, canonical direct-resolution, OG tag enumeration, inbound-link minimum, locale-correctness path-(a)/path-(b), multi-h1) becomes a new §17.8.16-§17.8.X subsection at fold-cycle.

Section-numbering hygiene: Phase 6 fold-cycle verifies highest §17.8.X at fold-time per concern 6 + SESSION-STATE reminder #8 (snapshot-vs-canonical drift discipline).

---

## Phase 3b commencement readiness

Phase 3b path-(b) trace work cleared to commence per locked structure:

**Scope:**
- 29-app emit-site sweep extending `extractDeckBundle()` + `LCSCatalogExport.export()` for path-(b) trace emission
- Predicate flip lexicon-fallback → trace at 3b close
- Per-app first-publish-verification cadence per §A.13.7
- Lexicon exception list deprecation post-3b

**Cost projection (per Phase 1 §6.6 Shape A precedent data):**
- ~32 LoC/app × 29 apps ≈ ~928 LoC
- 1-2 batched commits per Shape A cadence (e.g., `05d0940e` covered 10 apps in 1 commit)
- ~2-3 sessions

**Concurrent-arc state:** Stream A Arc 2 coordination point reserved at Phase 3b commencement (path-(b) trace work); if Stream A Arc 2 ratifies concurrent, Phase 3b Phase 1 inventory cross-references its territory.

**Cost-balloon escape hatch (per concern 3 + Phase 2 §8):** if Phase 3b empirical work surfaces (a) deeper-than-projected `t()` helper architectural divergence per §17.8.14, OR (b) translation-surface gaps requiring Stream A Arc 2 commencement, OR (c) per-app divergence in extractDeckBundle structure, fallback to path-(a) lexicon. CC at Phase 3b mid-execution surfaces if any condition fires.

**Phase 3a → Phase 3b operator-attention surface point:** Phase 3b commencement signal at operator's convenience.

---

## Concurrent-arc state

Sole-arc verified throughout Phase 3a. No concurrent commencements. Stream A Arc 2 coordination point reserved at Phase 3b commencement.

---

## Phase 3a close

Phase 3a — gate (predicates + wire-in + helper) + emission-side activation + multi-h1 fix — CLOSED.

Standing by for Phase 3b commencement signal at operator's convenience.

*End of Phase 3a close-out summary.*
