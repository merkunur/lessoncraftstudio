# Phase 6 recon — Commission B deck-end suggestion strip

**Type:** `[FEATURE][CATALOG-VARIETY]` Phase 6 recon (post-deploy retrospective).
**Generated:** 2026-05-08
**Commission:** Commission B per operator commission spec 2026-05-08.
**Branch:** `pivot/printable-business-toolkit`
**Phase 1 commit:** `174ceb4a` (recon)
**Phase 2 commit:** `9dd7b7de` (algorithm + helper + substitute extension)
**Phase 3 commit:** `f817bf6c` (i18n × 11 locales)
**Phase 4 commit:** `c2662966` (per-app fan-out × 29 + publish.js wiring)
**Deploy:** Hetzner `deploy.sh` PASSED + 29× `update-worksheet.sh` 29/29 OK + js/ helper updates.

## Commission completion summary

All 6 phases of Commission B closed:

| Phase | Status | Output |
|---|---|---|
| 1 — Recon | ✓ | `docs/lesson-plans/deck-end-strip-recon.md` (per-app integration matrix + helper-callability verification) |
| 2 — Algorithm + helper + substitute | ✓ | `scripts/publish-cli/deck-end-suggestions.js` (~265 lines; 4-strategy reweighting) + 14-test unit-test suite + `buildDeckEndSuggestionsPlaceholder` in catalog-export.js + 19-placeholder substitute.js extension |
| 3 — i18n × 11 locales | ✓ | `deckEndSuggestionsHeader` key authored in all 11 platform locales; Nordic 4-locale (sv/da/no/fi) NSR-flagged per §17.5.1 |
| 4 — Per-app fan-out + deploy | ✓ | 29 apps × 3 edits each via idempotent fan-out script (`scripts/fan-out-deck-end-strip.js`); 29/29 APPLIED 3/3 edits; §14.6 TWO-STEP deploy clean (deploy.sh PASSED + update-worksheet.sh 29/29 OK + shared JS files refreshed origin-side) |
| 5 — Verification | ✓ | Production curl spot-checks: 5 sampled apps show 5+ deck-end-strip refs each; catalog-export.js helper at origin (2 refs); translations-shared.js i18n at origin (11 refs, one per locale) |
| 6 — Recon | ✓ (this document) | What worked / what surprised / follow-on candidates |

## What worked

1. **Phase 1 recon's "single-line per-app fan-out" prediction held.** Verified in Phase 1 across 5 sampled apps; uniform pattern confirmed; Phase 4 fan-out script applied 3/3 edits to all 29 apps via single-Edit-script-execution. No per-app variation required custom integration. Pattern uniformity is a genuine architectural property of the 29 §14.10 apps' renderStandaloneHTML() shape.

2. **publish-cli has Prisma access via `scripts/publish-cli/db.js`** — confirmed in Phase 1; enabled Phase 2's selectDeckEndSuggestions to import Prisma directly without architectural change. publish-cli's CommonJS world + Next.js's TypeScript world share the same Prisma client per Phase 3 v4 architecture.

3. **Idempotent warmUpIndices() pattern** — module-level cache; `if (_indices !== null) return _indices;` early-return makes warm-once-per-batch behavior natural without callers needing to coordinate. Bulk publishes warm once + share across N publish() calls.

4. **selfMeta new-publish-context fallback** — clean architectural seam for the chicken-and-egg problem (deck-being-published not yet in DB; selectDeckEndSuggestions needs context). Caller constructs selfMeta from manifest at publish time; passes to selector. Strategies' id-based exclusion still works because new slug isn't in any indexed pool (slug.js collision-resolution + deck not yet inserted).

5. **Pre-rendered static `<section class="lcs-deckend-suggestions" hidden>` + runtime modal-append guard** — solves SEO-vs-celebration tension. Strip lives in deck.html source HTML at generation time (Google crawler sees the 6 outbound `<a href>` anchors without JS execution per spec); at runtime, `showCelebration()` un-hides + appends to `lcs-celebration__inner` so it renders co-located with celebration content. Graceful degradation guard checks `__SUGGESTION_` placeholder substring — if unsubstituted (direct-download flow), strip stays hidden.

6. **14-test unit-test suite covered all hard contracts** — deduplication / locale-match / completed-deck-exclusion / strategy 1 + 2 separation / empty-result / thin-substrate / count-parameter / 3 input-validation cases / canonical-URL form / themeless-deck / rotating-cursor. ALL 14 PASS post-Phase-2 + post-Phase-4 selfMeta + idempotent-warmUp changes; no regressions.

7. **Idempotent fan-out script** — `scripts/fan-out-deck-end-strip.js` detects already-applied edits + skips. Re-running across all 29 apps confirmed 29/29 SKIP (already applied). Safety net for accidental re-execution + future architectural changes that touch the same anchor patterns.

8. **§14.6 TWO-STEP deploy cleanly executed** — deploy.sh on Hetzner (PASSED smoke tests) + update-worksheet.sh × 29 (29/29 OK) + shared JS files refreshed via update-worksheet.sh on js/ subdirectory. Total deploy time ~2 minutes; no failures.

## What surprised

1. **Cloudflare cache state for shared JS files.** catalog-export.js + translations-shared.js are served at /worksheet-generators/js/ with `Cache-Control: max-age=14400` (4-hour TTL) — substantially longer than deck.html's 5-min TTL per CLAUDE.md §15.8. Production curl-via-Cloudflare initially showed 0 refs (cache HIT serving old version); cache-buster query at origin confirmed 2 refs (file is updated; cache will expire in up to 4 hours). For Phase 5 verification, cache-buster query bypassed cache cleanly. For first-time real users, cache propagation takes up to 4 hours — acceptable for v1; document for future reference.

2. **Existing-decks-need-republish surface.** The strip activates ONLY for NEW publishes after this commit. Already-published decks (~906 per the Phase 1 recon SEO-audit sitemap reference) have static deck.html files predating this commit; their `<section class="lcs-deckend-suggestions">` placeholder doesn't exist in the deck.html source. Existing decks need republish to get the strip. **Republishing all 906 existing decks is a substantial operator-side action** — see "Follow-on candidates" §F1 below for queueing options.

3. **dry-run-vs-real publish parity affected.** Per CLAUDE.md §15.13, dry-run + real-mode bulk batches produce byte-identical per-deck staging artifacts. Phase 4 substitute.js extension means dry-run output now contains either substituted suggestions (if dry-run path warms indices + fetches) OR raw `__SUGGESTION_*__` placeholders (if dry-run skips). My Phase 4 wiring updated only publish.js (single-publish + bulk delegation path); did NOT update bulk.js dry-run path or index.js dry-run path. Dry-run output therefore preserves raw placeholders — acceptable for preview purposes but means dry-run-vs-real-publish parity is NOT byte-identical for the strip placeholders. Surface as Phase 6 finding; future-arc commission to extend dry-run if parity becomes load-bearing.

4. **Idempotent-fan-out test on first run AND second run.** Wrote idempotency in the fan-out script (already-applied detection) and verified BOTH first-run (29/29 APPLIED) and second-run (29/29 SKIP). Re-execution safety is a genuine property of well-designed fan-out tooling; surfaces as a generalizable pattern for future fan-out commissions.

## Follow-on candidates

### F1. Existing-decks republish strategy (operator-strategic)

The strip activates only for NEW publishes. Existing 906 decks have no strip in their static deck.html until republished. Three paths:

**(a) No action — strip ships with new publishes only.** Existing decks remain stripless. Acceptable trade-off if the catalog will continue growing past 906 and the strip's SEO benefit accrues incrementally with new publishes. Operator-strategic for slow-growth catalogs.

**(b) Republish-all-existing-decks via publish-bulk.** Operator runs `publish-bulk` against all existing decks (or against staged ZIPs for them). 906 decks × per-deck publish-cli time (~59ms per CLAUDE.md §A.14.1) = ~54 seconds. Single-batch operation; clean. Recommended if the operator wants the strip to retroactively apply.

**(c) Lazy-rebuild on next publish-cli access.** Future commission could add a flag to publish-bulk that detects deck.html files lacking the strip placeholder + re-substitutes. Architectural complexity; deferred unless (a) becomes unsatisfactory.

**Recommended priority:** filed; operator decides at convenience. NOT a blocker for Commission B closure.

### F2. dry-run-vs-real-publish parity restoration

Per CLAUDE.md §15.13, dry-run output is currently NOT byte-identical to real-mode for strip placeholders (dry-run skips suggestion fetch). Two paths to restore parity:

**(a) Extend dry-run to fetch suggestions.** dry-run-batch path warms indices + fetches per-deck suggestions same as real-mode. Side effect: dry-run requires DB access; previously DB-optional for some preview workflows.

**(b) Document divergence in dry-run output.** dry-run continues to produce raw `__SUGGESTION_*__` placeholders; documentation makes clear that dry-run is preview-only and substituted output requires real publish.

**Recommended priority:** LOW — dry-run preview is structural-validation, not content-validation. Strip content authenticity isn't load-bearing for dry-run's purpose.

### F3. Cloudflare cache-purge integration for shared JS deploys

Shared JS files (catalog-export.js + translations-shared.js) have 4-hour Cloudflare TTL. Future updates to these files should ideally trigger cache-purge to make changes propagate faster. Per CLAUDE.md §15.8: "No Cloudflare API integration in publish-cli; no purge-API calls." Current architecture intentionally avoids Cloudflare API integration; deploys propagate via TTL expiry.

**Recommended priority:** LOW — 4-hour propagation is acceptable for shared-JS infrastructure changes. If future commissions ship shared JS changes that need faster propagation, scope a separate `[FIX][OPS]` commission.

### F4. Strip personalization (out-of-scope for v1; future v2 candidate)

Per Commission B spec §"What's NOT in scope": "Personalization (showing different suggestions to repeat visitors based on history). Stateless v1; same suggestions for same input regardless of session state."

Future v2 could extend the strip with session-state-aware personalization (track which decks the kid has played; surface unplayed decks). Requires:
- Session state mechanism (cookie / localStorage / server-side session — privacy implications for K-3 audience).
- Strip-rendering at request time (not deck.html-generation time) — breaks the static-deck.html caching contract.

**Recommended priority:** DEFERRED — privacy + caching trade-offs make personalization a substantial v2 commission; not load-bearing for v1 SEO + retention benefits.

### F5. Tracking/analytics on suggestion clicks (out-of-scope for v1)

Per Commission B spec §"What's NOT in scope": "Tracking/analytics on suggestion clicks. v1 ships untracked. Add later if retention metrics need empirical analysis."

**Recommended priority:** DEFERRED — empirical retention measurement requires analytics infrastructure (currently absent per CLAUDE.md §11 deliberately-not-in-scope items). Add when broader analytics infrastructure ships.

### F6. Pillar 2 bundle integration (out-of-scope for v1; v3 §6 trigger)

Per Commission B spec §"What's NOT in scope": "Pillar 2 bundle integration. Suggestion algorithm doesn't reference teaching-package bundles in v1. When Pillar 2 matures (v3 §6 conditions), suggestion algorithm can extend to surface bundle-related decks."

Per v3 SUBSCRIPTION-SCOPE.md §6 condition: ≥N bundles spanning ≥M themes. Pillar 2 50-master-package gate already crossed at Arc 7 Phase 1 close (per Arc 7 recon); operator-strategic timing controls when Pillar 2 commissions. When Pillar 2 ships, suggestion algorithm could extend strategy 5+ to surface bundle-related decks.

**Recommended priority:** DEFERRED — natural future-arc-pairing with Pillar 2 commissioning.

## Verification status

- All 4 Commission B commits push to origin clean (`174ceb4a`, `9dd7b7de`, `f817bf6c`, `c2662966`).
- Pre-commit hooks pass (no [SCHEMA] commits; Commission B was content + tooling + deploy).
- Phase 2 unit tests: 14/14 PASS post-Phase-4 selfMeta + idempotent-warmUp changes.
- Phase 4 fan-out: 29/29 apps APPLIED 3/3 edits; idempotent re-run shows 29/29 SKIP.
- §14.6 TWO-STEP deploy: deploy.sh PASSED smoke tests + update-worksheet.sh 29/29 OK + shared JS files refreshed.
- Phase 5 production verification: 5 sampled apps show 5+ deck-end-strip refs each; helper at origin (2 refs); i18n at origin (11 refs).
- Cloudflare cache: shared JS 4-hour TTL; cache-buster confirmed origin-side updates; full propagation within 4 hours.
- No regressions in existing apps' completion celebration UX (deploy.sh smoke tests passed).

## Operator next-action surface

**Strip is live for new publishes.** No additional operator action required for v1.

If operator wants the strip to retroactively apply to the 906 existing decks, run `publish-bulk` against staged ZIPs of existing decks (operator-strategic timing per F1 above).

If the §A.13.7 first-publish-verification cadence applies, the next deck publish (whenever operator triggers one) is the natural verification trigger — confirm the strip surfaces with substituted real deck-suggestions.

## Cross-references

- Commission spec: operator commission 2026-05-08 (re-pasted at Phase 4 commencement)
- Phase 1 recon: `docs/lesson-plans/deck-end-strip-recon.md`
- Algorithm: `scripts/publish-cli/deck-end-suggestions.js` (4-strategy reweighting + 14-test suite)
- Helper: `REFERENCE TRANSLATIONS/catalog-export.js` `buildDeckEndSuggestionsPlaceholder()`
- Substitute: `scripts/publish-cli/substitute.js` (19-placeholder extension)
- Fan-out script: `scripts/fan-out-deck-end-strip.js`
- i18n: `REFERENCE TRANSLATIONS/translations-shared.js` `deckEndSuggestionsHeader.<locale>`
- §1 SEO + embed-virality flywheel (Commission B operationalizes deck-page contribution)
- §14.6 TWO-STEP deploy mechanism
- §17.8.1 deck.html SEO surface spec
- §17.10.1 sitemap shard architecture (deck-page sitemap inclusion already shipped)
- §A.13 verification hygiene
- §A.13.7 first-publish-verification cadence

Commission B closes here. Phase 6 recon shipped.
