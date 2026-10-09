# nt2-G (b7) — the two FLAGSHIP printable types × (1 base + 10 variations) × 11 locales = 242 (operator /goal 2026-10-09)

**Status: PHASE E NATIVE PANELS IN PROGRESS (2026-10-09)** - en/de/fr/es-MX/pt-BR applied and green (each: 22/22 ZIPs, `check-b7-zips` PASS, robot `verify-interactive` 11 played 0 failed, 22 sweep renders clean); it + nl panels running; sv/da/no/fi next (<= 2 in flight). The de/fr/es/pt audits of the EN source were fixed at the ENGINES and committed (`190be707`, `86471ad4`): how-to-draw shape guides fitted FILLED (the dog's head), the finish face omits a VISIBLE step (never the details), a true grey trace, the scene face names the pond; find-the-differences `WORD_FAMILY`/`clashKeys` (a generic word beside its hyponym is never changed nor listed; no add/swap into a present family), word faces re-pinned on RICH scenes (what-changed `kangaroo-rich`, write `elephant-rich`, 400/400) with a 6-word strip cap, the write face at 280 px pictures / 40 px rows, tick boxes named on the colour + mirror faces, pairs = 'the one place', EN 'Color' spelling, a solid ledger on the missing face. Phase D record (2026-10-09): Phases A-C closed (both FINALs, ids allocated); how-to-draw K-396 + 10 faces built, gate PASS (78 assertions, 31/31 poisons), committed `82260cba`; find-the-differences K-395 + 10 faces built (print + tap screen + answer key from ONE instance), every pin RE-MEASURED by `qa/fd-unit-sweep.js` (base `heroFront 0.5`; ten-pairs -> kite-rich + ladybug-rich with a recorded hero waiver; missing -> night-owl-rich; pairs -> garden-ladybug-rich), family gate `qa/verify-b7-find-the-differences.js` PASS (78 assertions, 24/24 poisons). METHOD sections 5-9 written for both (+ the Phase E traps). NEXT: the remaining panels, then landings (`b7-landing-brief.md`), reviews, publish (frontend config + taxonomy first), CLAUDE.md section 29 + section 14.10 140 -> 142, the baseline recapture.

Operator brief (verbatim essentials): design + build "find the differences" and "how to draw", 10 top-quality pedagogically meaningful variations each, the flagship of the website, art ONLY from the image library ("in the past you always failed in drawing good quality child friendly images"; B&W for how-to-draw, colour + B&W for find-the-differences), perfectly native ×11, expert pedagogy / content / several design agents, SEO very strong (≥ 500 clicks/day from 242 worksheets; no SEO data from the operator), and **document the method in detail as a template for future expansions** (→ `METHOD-find-the-differences.md`, `METHOD-how-to-draw.md`, written at close-out).

## Files
- `_PANEL-FINDINGS.md` — THE LOCK (keys, ids, rail names, per-locale heads ×11 from the harvest, the eleven faces per type, cross-panel rulings, the honest click model). Sources: `_records/candidate-seeds.json`, `harvest-candidates.<loc>.json` ×11, `harvest-candidates-summary.md`, `harvest-dump.txt`.
- `_STUDIO-BRIEF.md` · `_SUBSTRATE.md` (measured delta over the nt5-F sheet + the two engines) · `_ROLE-{PEDAGOGY,DESIGN,CRITIC}.md` · `_BUILD-BRIEF.md` — the studio and build contracts.
- `<ID>-<key>.md` × 2 — the FINAL design files (the contract; 7 sections each). `_work/<ID>-{pedagogy,design-A,design-B,critic,build,faces}.md` — provenance.
- `hub-expectations.json` — exported from the matrix below by `node scripts/worksheet-gen/tools/export-hub-expectations.js --batch=b7` (never hand-edit).
- `METHOD-find-the-differences.md` · `METHOD-how-to-draw.md` — the operator's requested method record (close-out).

## The 2 types and their ids
| # | id | family key | subject | base band | EN rail name | format |
|---|---|---|---|---|---|---|
| 1 | K-395 | `find-the-differences` | spatial-reasoning | K | Find the Differences | PDF + tap-the-differences screen + answer key on EVERY deck |
| 2 | K-396 | `how-to-draw` | spatial-reasoning | K | How to Draw | PDF only (fine-motor exemption; no key, no screen) |

Variation faces take the next free ids by CONTENT band: **K-397+ · G1-412+ · G2-388+ · G3-402+** (`tools/alloc-b7var-ids.js`, TEN faces per family, README order).

## Build recipe (clone of nt5-F; tooling = the `*b7*` files from `tools/_clone-b7-spine.js`)
0. Engines + pools (DONE / in progress): `node tools/fd-build.js` (all 200 scenes → `data/fd/`), `node tools/fd-sheets.js [--mode=colour]`; `node tools/htd-build.js` (every hero drawing → `data/htd/`), `node tools/htd-sheets.js`; the human read decides `data/fd/review.js` + `data/htd/review.js` (refusals + overrides; committed).
1. Registration: `tools/register-b7-taxonomy.js` (DONE EN) → non-EN slug/name via `apply-b7-locale.js`; `tools/register-b7-en-content.js` (skill sentences + `topicMeta`); strand rows additive in `frontend/lib/seo/strand-names.ts` if a final asks; `frontend/config/interactive-exercise-types.ts` `INTERACTIVE_PRINTABLE_FAMILIES` + `scripts/audit-worksheet-formats.js` + `scripts/verify-hub-type-rows.js` (deployed BEFORE the first publish).
2. Design studio (2 families × 4 agents, sequential pairs): `_work/<ID>-pedagogy.md` → `_work/<ID>-design-{A,B}.md` → critic → `<ID>-<key>.md`.
3. EN bases + faces (me): spec + `templates/components-b7/<key>.js` + primitives with render-measuring verifies + `data/b7/<key>.js` + `qa/verify-b7-<key>.js` (+ poisons); `alloc-b7var-ids` → `b7var-rows/<key>.js` → `gen-b7var-specs` → `gate-variation-distinct --batch=b7`; `b3-baseline --check` PASS; every render READ.
4. Native panels ×10 (≤ 2 in flight): `b7-panel-brief.md` → `.draft-b7-<loc>.json` → `validate-b7-draft` → `apply-b7-locale` → `lint-locale` → `check-b7-string-parity`.
5. Waves + generate + measure ×11: `gen-b7-waves` (units pinned per face; `interactive: true` for find-the-differences) → `cli.js generate` → ZIP checks (title ≤ 70, description 120–170 on the PC, thumbnails distinct, FD ring-position tell pooled) → `verify-interactive.js` (+ `--poison`) → sweep renders.
6. Landings ×11 (≤ 2 in flight): `b7-landing-brief.md` (an AUDIT of the render) → `gen-b7-landings.js --dry-run` → `seo-landing/gate.js` 0 FAIL → compose; `export-hub-expectations --batch=b7`.
7. Independent review (rule #2): one native + pedagogy reviewer over a compact dump of all 11 locales; one visual reviewer per family over the final sheets. Every finding fixed at the source.
8. Publish ×11: frontend config + taxonomy deployed first (the nt10-D English-slug trap) → `b7-prepare-upload.js <loc>` → scp `/var/www/lcs-media/_staging/b7-<loc>/` → `b7-publish-locale.sh <loc>` dry-run → `--confirm` → deploy → `repoint-deck-canonical.js --types=find-the-differences,how-to-draw --locale=<loc>` → `refresh-deck-noindex-exempt.sh` → `meter-deck-downloads.js --check` → `indexnow-submit.js`.
9. Hub gate HARD in `deploy.sh` + `audit-worksheet-formats.js` + real-browser sidebar clicks; delete server staging.
10. Close-out: the two METHOD files, memory, CLAUDE.md §29, §14.10 count 140 → 142.

## Hub-gate expectation matrix (design-time; each final's §7 is the SoT)
| key | en | de | es | pt | fr | it | nl | sv | da | no | fi | total | refusals / contingencies |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| find-the-differences | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 121 | none at design |
| how-to-draw | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 11 | 121 | none at design; the word face (F5) contingent on the drawing's vocab word per locale |
| **design total** | 22 | 22 | 22 | 22 | 22 | 22 | 22 | 22 | 22 | 22 | 22 | **242** | every gap a recorded refusal, never a filler |

## Honest click model
`_PANEL-FINDINGS.md` — batch ≈ 310 · 590 · 880 /day at 9–15 months (low · mid · high); the ≥ 500 target sits below the mid band; the 121 interactive find-the-differences deck pages are an uncounted extra surface.

## Open items
1. ~~The human read of every FD scene sheet and every HTD lesson sheet~~ - done for the pinned units through the face renders + keys (every ringed change named); the per-scene sheets stay the rule for any re-pin.
2. The Nordic re-probe of the heads (`_records/v2/`) before titles are final.
3. The K-061 June type keeps its titles; the new EN base head is "Find 5 Differences" (never "Spot the Differences" as a title).
4. **Pins moved on the rebuilt scenes (2026-10-09; the bank records each reason):** ten-pairs is kite + ladybug "in the Garden" (the EN title changed from the FINAL's beach; every locale's panel titles its own theme word) with the hero waived (`heroWaived` on the row: 0 of 831 same-theme pairs compose 5 + 5 at the G2 floor without the hero); the picture-pairs face has ONE in-band unit (garden-ladybug-rich) - the FINAL's first-to-cut face ships on its measured pool and is the first to re-sweep if the scene data changes.
5. The how-many screen is tap-select over four chips (one stamped) rather than the FINAL's tap-choice: one `interactive` contract per family (the emitted faces share the base's); the interaction is the same single answer.
6. `frontend/lib/seo/strand-names.ts` carries the new `Visual Perception` and `Art` rows with EN only - each locale's literal comes from its panel through `apply-b7-locale.js`.
