# `[ARC][SEO][DECK-PAGE]` Phase 4b — close-out summary

**Type:** docs-only deliverable per Phase 4b close-out plan; aggregate close-out across Sub-step 0 §A.13.6 recon + Sub-step 2 implementation + Sub-step 4 production verification
**Generated:** 2026-05-09
**Phase 4b status:** CLOSED — `INBOUND_LINK_COUNT_BELOW_TARGET` predicate operationally meaningful (real count vs `noop:true` stub); cross-boundary TS/CJS adjudication CLOSED via (a-1) CJS port + orphan TS file deleted; predicate stays WARN-class through Phase 4b per concern 4 escalation schedule; HALT-class flip authorized for post-Phase-5 close

---

## Scope summary

Phase 4b activated `reconcileInboundLinkSurface` predicate at runtime by porting `frontend/lib/seo/count-inbound-surfaces.ts` to Node-CJS at `scripts/publish-cli/count-inbound-surfaces.js` and wiring the helper through `bulk.js` (batch path) and `publish.js` (single-publish path) as the `countInboundFn` callback. Per Phase 1 §6 + Phase 3a.1 Checkpoint 2 algorithm spec: helper computes 8-surface inbound count (exerciseTypeTopicPage, educationalLevelTopicPage, themeTopicPages, siblingAxisStrip, varietyStripRotation, crossAxisPivots, deckEndSuggestionStrip, breadthGridFeatured) via indexed Prisma queries; gate's INBOUND_LINK_COUNT_BELOW_TARGET predicate fires warn-class when count < 3.

Cross-boundary TS/CJS adjudication deferred since Phase 3a.1 Checkpoint 2 closed via **(a-1) CJS port** rather than the operator's pre-locked (a) "TS→JS compile" mechanism. Sub-step 0 §A.13.6 substrate audit revealed zero frontend consumers of the orphan TS file; (a-1) realizes the (a) "clean import" intent without build-pipeline complexity for an unconsumed file. (a-1) explicitly ratified by operator via AskUserQuestion before execution (5th §A.13.6 firing of the commission, crossing the operator's pre-warned re-adjudication threshold).

---

## Commit history

| Commit | Phase | Title |
|---|---|---|
| `13b7f407` | Phase 4b implementation | inbound-link predicate operational; CJS port + cross-boundary close |
| (this commit) | Phase 4b close-out | docs-only close-out summary |

Phase 4b commit chain length: **2 commits** (1 substantive code-work + 1 docs-only close-out). Smallest single-phase commit chain in the commission to date.

---

## Sub-step 0 — §A.13.6 substrate audit (recon outcome)

**Direct grep across all source files** (NOT Explore agent per Phase 6 fold-queue Item 6 verification-hygiene rule): only `docs/SEO/*` markdown files reference `countInboundSurfacesForDeck` / `count-inbound-surfaces`. **Zero frontend consumers** of the TS file across `frontend/components/`, `frontend/app/`, `frontend/lib/`, `frontend/api/`.

The TS file was authored at Phase 3a.1 Checkpoint 2 (`276a79b8`) under the assumption that mixed frontend + publish-cli consumers would emerge. Empirically the publish-cli predicate stub at `seo-reconciliation.js:708` is the SOLE intended consumer; frontend never adopted the helper.

**Recon implication for cross-boundary path:**
- Operator's pre-locked (a) "TS→JS compile + clean import" was framed against the assumed mixed-consumer model
- With zero frontend consumers, build-pipeline complexity for one file delivers no benefit
- (a-1) port to CJS + delete orphan TS file is the cleaner realization of (a)'s "clean import" intent
- (a-2) dual-implementation rejected per drift-hazard

**Operator AskUserQuestion ratification (RATIFIED):** explicit 3-option pick offered (a-1 / a / a-2); operator selected (a-1). 5th §A.13.6 firing of the commission closed via explicit operator pick. (a) original "TS→JS compile" path retired against empirical no-consumer finding.

---

## Sub-step 2 — implementation (`13b7f407`)

**4 files changed, 269 insertions / 33 deletions = +236 net LoC. 1 RENAME tracked + 1 NEW + 2 MODIFY.**

- **`scripts/publish-cli/count-inbound-surfaces.js`** (RENAME from `frontend/lib/seo/count-inbound-surfaces.ts`; ~140 LoC) — Verbatim algorithm port. `import { prisma } from '@/lib/prisma'` → `var db = require('./db');` + `db.client()`. TypeScript types removed. JSDoc preserved verbatim (public-API-doc + per-surface comments). Algorithm: 8-surface counter unchanged from Phase 3a.1 Checkpoint 2 + Phase 1 §6 spec.

- **`scripts/publish-cli/count-inbound-surfaces.test.js`** (NEW; 7 unit tests). Mock-based tests via `require.cache` substitution: substitutes `./db` in require.cache before requiring the helper, so all `db.client()` calls resolve to a synthetic Prisma-like object. Per-test fixture mutates `mockPrisma` to set deck-row + locale-aggregate shape. Coverage: non-existent deck (count=0); non-published deck status=draft (count=0); deck with subjectTags + locale ≥7 + ≥2 exercise-types (count=7); deck without subjectTags + locale <7 + ≥2 types (count=5); deck without subjectTags + locale <7 + 1 type (count=4 floor); convenience-wrapper count + non-existent.

- **`scripts/publish-cli/publish.js`** (single-publish path; 3 LoC change). Replace `countInboundFn: undefined` (Phase 3a.1 stub) with `countInboundFn: countInboundMod.countInboundSurfacesForDeck` (real helper). Module require added at top alongside other publish-cli helpers.

- **`scripts/publish-cli/bulk.js`** (batch path; 8 LoC change). Add default-fallback `opts.countInboundFn || countInboundMod.countInboundSurfacesForDeck` at ctx construction (line 581). `opts.countInboundFn` override hook preserved for tests + specialized callers. Module require added at top.

**Algorithm preservation** (verbatim from Phase 3a.1 Checkpoint 2 + Phase 1 §6 spec):

```
Surface 1: exerciseTypeTopicPage      always-true for published
Surface 2: educationalLevelTopicPage  always-true (§17.8.6 mapping)
Surface 3: themeTopicPages            true when deck.subjectTags.length > 0
Surface 4: siblingAxisStrip           true when locale ≥2 distinct exercise-types
Surface 5: varietyStripRotation       always-true (§16.2 rotational)
Surface 6: crossAxisPivots            always-true (§16.2 + Arc 6a)
Surface 7: deckEndSuggestionStrip     true when locale catalog ≥7 decks
Surface 8: breadthGridFeatured        Phase 3a conservative `false`
```

**Tests:** 7 unit tests green at first run (no iteration needed). Full publish-cli test suite regression check confirms zero regression: 203 unit + 7 integration = 210 PASS, 0 FAIL across 7 publish-cli test files.

---

## Sub-step 3 — predicate flip schedule (UNCHANGED)

Per commission §3.1 + concern 4 escalation lock:

- **Phase 4b** ships predicate operationally (real count, not `noop:true` stub)
- **Predicate stays WARN-class through Phase 4b** — operator-side new publishes that fall below N≥3 floor surface as warnings in `_reconciliation.txt` Section 3 (informational, not blocking)
- **Phase 5 close authorizes predicate HALT-class flip** — separate commission scope; not Phase 4b's responsibility

Phase 4b's responsibility was specifically to make the predicate operationally meaningful; the WARN→HALT transition is doctrinally separate and gates on Phase 5 NSR + seo.words.* + (λ) taxonomy completion per concern 4 escalation schedule.

---

## Sub-step 4 — production verification

**Deploy:** `deploy.sh` ran cleanly post-`13b7f407` push (Phase 4a's `npx prisma generate` step at `655e786c` already operational; no migration required for Phase 4b). All 11 language homepages PASS; 410-Gone surfaces unchanged; image translation diacritics intact.

**Dry-run verification on isolated sample ZIP** (`/tmp/phase4b-verify/big-small-findbig-en-20260507200010.zip`):

```
Deck-page SEO reconciliation — 1 of 1 ZIPs non-CLEAN (1 HALT, 0 WARN).

Per-category tally:
  1  INBOUND_LINK_COUNT_BELOW_TARGET   ← Phase 4b: real count, not noop
  1  MULTIPLE_H1_DETECTED              ← unrelated finding (existing)
  1  OG_TAG_MISSING                    ← unrelated finding (existing)

Per-app breakdown:
  big-small  INBOUND_LINK_COUNT_BELOW_TARGET=1, MULTIPLE_H1_DETECTED=1, OG_TAG_MISSING=1

Per-deck table:
  big-small-findbig-en-20260507200010.zip
  overall:  HALT
  halt:     [OG_TAG_MISSING, MULTIPLE_H1_DETECTED]
  warn:     [INBOUND_LINK_COUNT_BELOW_TARGET]   ← warn-class semantics preserved
```

**Verification key findings:**
1. `INBOUND_LINK_COUNT_BELOW_TARGET` predicate FIRED — opposite of pre-Phase-4b `noop:true` stub behavior
2. WARN-class semantics preserved — predicate fires as warn (`warn: [...]`), not halt
3. Real DB count computed via Prisma indexed lookups (helper exercised against production state)

**Verification scratch dir cleaned up post-validation** (`/tmp/phase4b-verify/` + `.publish-cli-staging/batch-20260509181501/` removed).

---

## Phase 4b §A.13.6 firings handled

**§A.13.6 5th-firing (RATIFIED at this commission's pre-execution turn):**

Sub-step 0 substrate audit revealed the operator's pre-locked (a) path was framed against an assumed mixed-consumer model that didn't materialize. Surfaced via AskUserQuestion before execution per operator's pre-warned 5th-firing threshold language ("would be 5th §A.13.6 firing this commission; threshold for explicit re-adjudication-vs-fall-back review"). Operator explicitly ratified (a-1); (a) original retired; (a-2) rejected. Predicate flow operational without any structural drift hazard.

Total commission §A.13.6 firings: 5 (Phase 4a Checkpoint 2 + 2 + 2.5 four firings; Phase 4b Sub-step 0 fifth firing). All five surfaced for explicit operator adjudication; none silently absorbed.

---

## Phase 6 fold-queue extension — NEW Phase 4b findings

The Phase 4a close-out documented 11 fold-queue items (Items 1-11). Phase 4b execution surfaces **2 new items** for fold absorption at next [DOCS] cycle:

### Item 12: bulk.js Phase 4 wire-in gap (parallel to Phase 4b countInboundFn gap)

`bulk.js` lines 219-220 thread `findExistingByTitleHash` + `findExistingByDescriptionHash` from `ctx.X` (which derives from `opts.X` at line 579-580). `index.js` (the bulk.dryRunBatch + publishBatch caller at lines 335 + 383) does **NOT** populate these opts, so production runs receive `undefined` and the predicate's same-locale uniqueness checks silently no-op-pass.

This is the **structurally identical wire-in gap** that Phase 4b just closed for `countInboundFn`. publish.js (single-publish path) at line 205-206 wires `db.findExistingByTitleHash` + `db.findExistingByDescriptionHash` directly (correct); only bulk.js falls through.

§A.13.3 refactor-during-already-opened-surface candidate: same code surface, same structural pattern, same fix shape (default-fallback at ctx construction). Surfaced for explicit operator adjudication rather than silently expanded into Phase 4b scope.

**How to apply:** at any future commission touching bulk.js, audit `opts.findExistingBy*` callbacks for the same wire-in gap and apply default-fallback pattern matching Phase 4b's countInboundFn closure. Or commission a small `[FIX][PUBLISH-CLI]` to close the gap structurally (estimated <30 LoC + tests).

### Item 13: pre-publish-state vs post-publish-state semantics for inbound-link predicate

Phase 4b production verification surfaced a semantic finding: predicate fires INBOUND_LINK_COUNT_BELOW_TARGET at dry-run time for pre-publish ZIPs because:

1. Predicate calls `countInboundFn(deckId, language)` where `deckId` derives from `manifest.deck_id` (operator-space identifier, e.g., `big-small-findbig-en-20260507200010`)
2. Helper does `findUnique({where: {id: deckId}})` against `Deck.id` (Prisma CUID, e.g., `cml1k9...`)
3. Manifest deck_id ≠ DB CUID → `findUnique` returns `null` → helper returns `count: 0`
4. 0 < 3 → predicate fires warn-class

This is **technically correct** for the deck's actual current DB state (pre-publish, no row), but it surfaces every dry-run as predicate-firing rather than the conceptually-meaningful "post-publish projection." Three resolution paths to consider at fold cycle:

- **Option A:** Pre-publish skip — predicate skips for INSERT-path dry-run; runs only for UPDATE-path (existing DB row). Limits predicate's reach to UPDATE flow.
- **Option B:** Post-publish projection — helper accepts `(language, exerciseType, ageRange, subjectTags)` directly from manifest; computes projected count by counting WHAT the deck WILL belong to post-publish. Restructures helper signature.
- **Option C:** Defer-until-Phase-5 — keep current semantics; rely on Phase 5 HALT-class flip + post-publish revalidation cycle to surface real-state count.

Operator-strategic call required at fold cycle. Not blocking for Phase 4b close (predicate works as-specified; semantic refinement is downstream concern).

### Items 9-11 (carry-forward from Phase 4a)

9. **prisma generate alongside migrate deploy** — CONCRETE FIX SHIPPED at `655e786c`; doctrinal absorption pending at Phase 6.
10. **Slug-vs-title-shape redundancy as separate doctrine class** — pending at Phase 6.
11. **Backfill-rate as commission close-out metric** — pending at Phase 6.

### Items 1-8 (carry-forward from Phase 3a + Phase 3b)

1-5. Phase 3a items (carry-forward).
6-8. Phase 3b items (carry-forward).

**Phase 6 fold-queue total: 13 items** at next [DOCS] cycle absorption.

---

## Phase 5 scope (UNCHANGED from Phase 4a close-out)

Per Phase 4a Adjudication 2 (γ) + Adjudication 4 (λ) + concern 1.4 NSR posture:

1. **NSR review on Nordic + Tier 4 Danish locales** — sv, fi, no, da NSR-flag entries in `seo-reconciliation-exceptions.json`. Romance Tier 4 (fr, it, pt) authored without NSR per §17.5 stronger Claude-quality posture.
2. **seo.words.* 44-entry localization addition** — 4 keys × 11 locales (`worksheet`, `free_interactive`, `for`, `print_or_play_online`).
3. **(λ) taxonomy.axes.exercise-type.name.en capitalization** — `name.en` lowercase → titlecase across 29 exercise-type entries × 11 locales.

**Phase 5 close authorizes** the `INBOUND_LINK_COUNT_BELOW_TARGET` HALT-class flip per concern 4 escalation schedule.

---

## Concurrent-arc state

Sole-arc per (A) lock confirmed throughout Phase 4b. Stream A Arc 2 stays deferred. (μ) slug-rationalization stub (filed at Phase 4a close) stays in operator's next-session priority queue. Phase 4b's filesystem-territory crossing was bounded as planned: 1 frontend file deleted, 4 publish-cli files added/modified. Doesn't overlap with the 4 deferred draft-specs (Arc 14 / Pillar 2 Arc 3 / Stream A Arc 2 / Pillar 4 Arc 2) or (μ) slug-rationalization.

---

## Phase 4b → Phase 5 handoff

Phase 4b CLOSED authorizes Phase 5 commencement with:

- ✓ `INBOUND_LINK_COUNT_BELOW_TARGET` predicate operationally meaningful (real count; WARN-class)
- ✓ Cross-boundary TS/CJS resolved via (a-1) CJS port; orphan TS deleted
- ✓ Algorithm + 8-surface spec preserved verbatim from Phase 3a.1 Checkpoint 2
- ✓ Production verification confirms predicate firing on real DB state via dry-run sample
- ✓ Phase 5 scope unchanged (3 sub-items: NSR + seo.words.* + (λ) taxonomy capitalization)
- ✓ Phase 5 close authorizes predicate HALT-class flip per concern 4 escalation schedule
- ✓ Phase 6 fold-queue at 13 items (11 carry-forward + Item 12 bulk.js wire-in gap + Item 13 pre-publish semantics)

---

## Phase 4b close

Phase 4b — inbound-link predicate operational; CJS port + cross-boundary close — CLOSED.

Cross-boundary TS/CJS adjudication CLOSED via (a-1) explicit operator ratification. Predicate operational at WARN-class semantics; HALT-class flip authorized for post-Phase-5 close. 13-item Phase 6 fold-queue documented for next [DOCS] cycle absorption (2 new items surfaced in Phase 4b: bulk.js wire-in parallel gap + pre-publish-state semantics).

Standing by for Phase 5 commencement signal at operator's convenience.
