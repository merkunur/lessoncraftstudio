# Plan — nt10-D: FINISH the batch — get all 11 locales published and visible under their type on `/[locale]/worksheets`

## Where this stands (2026-09-22)

**Phases 0-5 are DONE.** 652 decks across 11 locales are generated, gated, pooled and rendered
(en 59 · de 60 · es 59 · pt 60 · fr 60 · it 60 · nl 59 · sv 59 · da 58 · no 60 · fi 58; every gap a
recorded refusal). All ten family gates pass. Baseline 0 unaccounted drift.

**Nothing is deployed and nothing is pushed.** Verified against the server: no nt10-D staging dir,
no decks matching the b4 slugs. Everything is on this PC — ZIPs at `out/upload/wave-b4-<loc>-all/`,
renders at `out/b4-sweep/<loc>/`, and **64 unpushed commits** on `pivot/printable-business-toolkit`.

**Why it stalled.** The four Nordic landing panels returned real defects in shipped pages, so I
fixed those before running the remaining seven — correct, since the seven would have audited pages
about to change. But the fix work then consumed the session and I never returned to the critical
path. Five defects fixed and committed (`c269d44c`, `80ebc6e1`, `5e88c471`).

**What the fixes cost.** Eight faces changed, so their decks and renders are stale, and the four
completed landing drafts now describe pages that moved — measured: the sv and no G1-369 landings
quote *tolv* (twelve), a pile size that no longer exists after the range change to [5,10].

**Decision (not a question for the operator):** follow Phase 7 as written — push per locale at the
moment that locale publishes and deploys. Never push a half-landed batch to a branch a later
unrelated `deploy.sh` would carry.

## Remaining work — Phases R, 6, 7, 8 below. Phases 0-5 are history, kept for reference.

## Context
The DESIGN phase closed 2026-09-21 (commit `151bce7d`): ten final design files in `docs/worksheet-gen/b4-designs/` (7 sections each; `_work/` pedagogy/design/critic beside them), the README with the 12-step recipe, six open items, the cross-type rulings, and the hub-gate expectation matrix (656 of 660; every gap a recorded refusal: recycling en F4 · cloze da F3 · pronouns es + fi F3), exported to `hub-expectations.json`. The operator's trigger "build the last batch of 10 worksheet types and their expansion" starts the BUILD. Nothing is re-designed: each design file §2/§3 is the spec, §4/§5 the data + gate contract, §6 the SEO copy pattern, §7 the hub row expectation. The proven build is nt20-C's (plan `purring-discovering-floyd.md`, memory `project_nt20c_worksheet_types.md`, `b3-designs/README.md` steps 1-12); this plan re-points it to b4 names (the tooling survey below lists every b3-hard-coded literal) and folds in the b4 rulings. The batch spans several sessions; memory `project_nt10d_worksheet_types.md` (NEW) carries the resume pointer per phase.

**Scale:** 10 families · 60 faces · 11 locales · one d2 deck per shipped face per locale = 656 decks + 656 landings. Bases: tangram K-353 · human-body K-354 · five-senses K-355 · weather K-356 · recycling K-357 · cloze G1-350 · odd-and-even G1-351 · pronouns G1-352 · question-words G1-353 · rounding G2-346. Faces from **K-358 · G1-354 · G2-347 · G3-385** (allocated by content band in README order).

## Non-negotiables
- Nothing re-designed; README cross-type rulings override per-file naming. Design-file numbers are contracts; where a build measurement disagrees, fix the layout to the RULE (722/677 stacks, floors), never silently move the number, and record it in `_work/<ID>-build.md`.
- **0 drift on everything published**: `tools/b3-baseline.js --capture` (it hashes EVERY spec + wave on disk, so no b4 clone is needed; re-capture after the accepted edits) before any shared edit; `--check` after every shared-file edit; 0 drift is the release condition.
- Never edit `templates/components.js` / `components-b2.js` / `components-b3*` / `types/_shared/science-*.js` / `image-vocabulary.js` / `interactive-exercise-types.ts`. Additive options on `primitives/thermometer.js` (`bands`, `numerals`) MUST keep G3-345 byte-identical (baseline check is the proof).
- Panels ≤4 in flight, locale-scoped scratch, the EN handed over as a SOURCE TO AUDIT (`enAudit`); check disk before relaunching (session-limit trap; the Fable limit kills agents at their first step → relaunch on the current model).
- Every gate poison-tested both directions; never move a threshold to pass; a filtered run that matches nothing is not a pass.
- Themes off `cli.js generate --dry-run`, never a hand map; `themeOverrides` is the only source of the shipped theme.
- Description window 120-170 measured per locale; the instruction is the child's sentence and names only apparatus on the page.
- **Printable decks ship NO answer key**: validator ban on "with answers / mit Lösungen / lösning / com respostas / avec corrigé …" in every title/meta/landing string.
- "Free" in SEO metadata only, never visible (`scripts/lib/free-claim.js` reused in `qa/lints.js` + the landing generator).
- Commits per phase with explicit paths; `git add -f` the generated `data/b4/*`; push only when a phase deploys; `bash deploy.sh > log 2>&1; echo EXIT=$?`; scripts written to files.
- The `/worksheets` rail contract: `apps.<key>` + `axes['exercise-type'].<key>.{slug,name}` ×11 + one landing per shipped face per locale with `coordinate.type === <key>` + commit + deploy + `verify-hub-type-rows.js` reading the b4 expectations.

## Phase 0 — prerequisites (b4 tooling; nothing type-specific)
0.0 **Baseline**: `node scripts/worksheet-gen/tools/b3-baseline.js --capture` (full; ~7 min) = the release baseline. `--quick --check` after every shared edit in later phases.
0.1 **Registrars**: `tools/register-b4-taxonomy.js` (clone of `register-b3-taxonomy.js`; `NEW_FAMILIES` = the 10 keys with subject/age/EN name from each final §1: tangram spatial-reasoning 5-7 · human-body science 5-7 · five-senses science 5-7 · weather science 5-7 · recycling science 5-7 · cloze letters 6-8 · odd-and-even math 6-8 · pronouns letters 6-8 · question-words letters 6-8 · rounding math 7-9) + `tools/register-b4-en-content.js` (`SKILLS` full 60-180 / short 15-90 + `TOPIC_META` ≥50 per key, from each final §6; `\bfree\b` banned). Run both; assert `apps`/`axes` 125 keys.
0.2 **Science strand row**: add `'Science': { en: 'Science', de: 'Sachunterricht', es: 'Conocimiento del Medio', pt: 'Ciências', fr: 'Questionner le monde', it: 'Scienze', nl: 'Oriëntatie op jezelf en de wereld', sv: 'Naturorienterande ämnen', da: 'Natur/teknologi', no: 'Naturfag', fi: 'Ympäristöoppi' }` to `frontend/lib/seo/strand-names.ts` (the Geometry row shape; the four science finals' table B are the source). Odd-and-even / rounding per-locale strand literals are emitted by the landing generator from a per-type map (their OA/NBT rows misrender), not by editing those rows.
0.3 **Spine**: `tools/gen-b4var-specs.js` (`FAMILIES` = the 10 `[id, key]`; `ROWS_DIR = tools/b4var-rows/`; `ALLOC` = `b4-designs/_records/b4var-id-allocation.json`) · `tools/alloc-b4var-ids.js` (DESIGNS = `b4-designs`; `NEXT = {K:358, G1:354, G2:347, G3:385}`; exactly 50 faces from the `### F1..F5 : Title (band, …)` headings) · `lib/b4-common.js` (clone of `b3-common.js` over `data/b4/` + `data/b4/locales/`, env `B4_LOCALES_DIR`; drop `ordinalFor`) · `templates/components-b4.js` barrel + `templates/components-b4/_index.js` · `tools/b4-probe-child.js` + `tools/validate-b4-draft.js` (+ `.test.js`) + `tools/apply-b4-locale.js` (`.draft-b4-`, `data/b4/locales`, `b4-designs/_records/refusals.<loc>.json`, comment `nt10-D panel (tools/apply-b4-locale.js)`; `BANK_OF` map for any bank named differently from its key) · `tools/gen-b4-waves.js` (`wave-b4-`/`wave-b4var-`; counts 10/50; PREF/HARD theme maps per the finals' §1 theme rulings: weather FIXED `weather`; tangram/human-body/rounding/pronouns/question-words/cloze/five-senses/recycling themeless; odd-and-even F2/F5 themed) · `tools/gen-b4-probe-jobs.js` + `tools/gen-b4-faces-table.js` (`b4-sweep`, `b4-faces.`) · `publish-readiness.js` `PATHS.b4` · `gate-variation-distinct.js` `--batch=b4` branch (+ `batch !== 'b2'` on the three pairwise checks) · `i18n/lint-locale.js` reads refusals from BOTH `b3-designs` and `b4-designs` `_records` · `scripts/verify-hub-type-rows.js` gains `--expect=<file>` (default unchanged) and `deploy.sh` gets a second call `--expect=docs/worksheet-gen/b4-designs/hub-expectations.json --warn-missing-keys` (drop the flag at Phase 8) · `scripts/publish-cli/b4-publish-locale.sh` (`_staging/b4-$LOC`, `/root/staging/b4`, `--batch-id b4-$LOC`) · `scripts/seo-landing/gen-b4-landings.js` (`STANDARD` for 60 ids from the finals' §6; `b4`/`b4var` waves; 60-id count).
0.4 **Baseline `--check`** after 0.1-0.3 (registrars touch the taxonomy, not specs → 0 drift expected). Commit Phase 0.

## Phase 1 — EN base specs (10; ≤4 build agents in flight, one per family; `_BUILD-BRIEF.md` cloned from b3 with b4 paths)
Per family, from the final's §2 + §5: `types/<band>/<ID>-<slug>.js` · `templates/components-b4/<key>.js` · NEW primitives only where the final says NEW (`primitives/tangram.js` + `data/b4/tangram-figures.js` + `tools/gate-tangram-figures.js`; `primitives/body-figure.js` + `data/b4/body-facts.json`; `primitives/water-cycle.js`; `primitives/bin.js`; additive `bands`/`numerals` on `thermometer.js`) · `data/b4/<bank>.js` en block (+ `data/science/five-senses.json`, `data/b4/recycling.json`) · `qa/verify-b4-<key>.js` (bank validator `validateBank`, render sweep at 722 AND 677 chrome, floors, the §5 poison list with control) · `render/one.js <ID> <theme|null> 2 en` at d1-d3, PNGs read by me + the visual-critic agent · `_work/<ID>-build.md` (deviations measured). Build order = dependency order: pronouns bank before question-words (shared portraits/names); the science strand row before any science type. `node i18n/build-en.js` after each; `b3-baseline --quick --check` after each shared edit. One commit per family.

## Phase 2 — EN variation faces (50)
`tools/alloc-b4var-ids.js` → `_records/b4var-id-allocation.json`; per family `tools/b4var-rows/<key>.js` (PARAM rows spread the base d2 + overrides; CODE faces hand-written with the additive knob stamped only when declared) → `tools/gen-b4var-specs.js` → `gate-variation-distinct.js --batch=b4` (resolved d2 must differ from the base and pairwise within the family) → `gen-b4-probe-jobs.js` → `render/batch.js` → contact sheets read by me + critic → `_work/<ID>-faces.md` (per-locale refusals visible from the bank shape). `build-en.js` (band title uniqueness); baseline re-capture at the close (the 60 new ids are the only accepted drift). Commit per family.

## Phase 3 — EN waves + generation
`tools/gen-b4-waves.js --locales=en` (every themed spec pinned by a MEASURED build(); refusals in `_refused`) → `waves/wave-b4-en.json` + `wave-b4var-en.json` → `node cli.js generate --wave …` (lints + verify gate, else no ZIP) → `scan-staged-desc-band.js` + `gate-deck-title-similarity.js` → `publish-readiness.js --batch=b4 --locales=en` → `tools/measure-instruction-window.js` (the panels' input). Pool to `out/upload/wave-b4-en-all`. Commit.

## Phase 4 — native panels ×10 (base + faces together; ≤4 in flight)
`docs/worksheet-gen/b4-panel-brief.md` (clone of b3's: deliver ONE `i18n/.draft-b4-<loc>.json` = types 60 × {title, instruction}; families 10 × {slug, name}; skills 10; topicMeta 10; banks per the finals' §4-§5 (weather nouns, five-senses verbs + starters, recycling bins/materials/starters, cloze frames + fits, odd-and-even literals, pronouns tables + name genders + frames, question-words chips + frames, rounding literals, human-body labels/facts, tangram titles); refusals with reasons; strandNames (the Science row); `enAudit`) → `tools/validate-b4-draft.js <loc>` (+ probe) → `tools/apply-b4-locale.js <loc>` → `i18n/lint-locale.js <loc>` = 0. Every panel OPENS every picture its faces keep; the six `[NSR-FLAG]`s are its decisions (da stedord · no "Kroppen vår" · fi "Säätilat" · fi hän/se · sv "hen" · no glass+metal). Commit per locale.

## Phase 5 — per-locale waves + generation + critic round
`gen-b4-waves.js --locales=<loc>` → generate → desc band + title similarity → `gen-b4-probe-jobs.js` → `render/batch.js` → `gen-b4-faces-table.js` → contact sheets: I read de/pt/fi myself, visual-critic agents for the other 8, native fix panels where a string names apparatus not on the page (the nt20-C lesson: ~40 such defects). Baseline `--check` after every string fix; `_records/*-expected-drift.txt`. `publish-readiness.js --batch=b4 --locales=<all>` 11 of 11 READY. Commit per locale.

## Phase R — repair what the five fixes made stale (do FIRST; nothing downstream is valid without it)

**R1. Regenerate the changed faces.** Eight faces moved across three fix commits:

| Face | What changed | Locales to regenerate |
|---|---|---|
| G1-353 · G1-374 · G2-356 | mark span takes no layout width | all 11 (visual only) |
| G1-356 (write) · K-361 (colour) | nested-region fence — hair/head can no longer co-occur | all 11 |
| G1-369 | perRow 6→5, range [5,12]→[5,10] | all 11 |
| G2-349 | sv "Många" frames pinned `clones:3` | sv only |
| G2-348 | `milk` dropped as a misread | no, sv |

Delete those ZIPs from `out/staging/wave-b4*-<loc>/` and `out/upload/wave-b4-<loc>-all/`, re-run
`cli.js generate --wave waves/wave-b4var-<loc>.json --types=<ids>` per locale, re-pool, then re-run
`scan-staged-desc-band.js` + `gate-deck-title-similarity.js` on each pool (0 FAIL).

**R2. Re-render + rebuild the face tables** for the changed ids into `out/b4-sweep/<loc>/`, then
`gen-b4-faces-table.js <loc>` for all 11 so every row again points at a current PNG.

**R3. Repair the four Nordic landing drafts.** Only the CONTENT-changed faces need it — G1-369,
G1-356, K-361 (all four locales), G2-349 (sv), G2-348 (no, sv). G1-353 / G1-374 / G2-356 changed
visually only, so their prose is still true. Use `SendMessage` to the four panels that are still
alive with full context (they have already opened every render) rather than re-running them: hand
each the corrected PNGs and ask it to re-verify and rewrite only those entries, then re-run
`gen-b4-landings.js <loc> --dry-run` to `dry-run ok`.

## Phase 6 — landings ×11
**DONE: sv · no · da · fi** (each dry-run clean; repaired in Phase R). **REMAINING: en · de · es · pt ·
fr · it · nl** — seven panels, run ≤4 in flight, two waves.

Brief is written: `docs/worksheet-gen/b4-landing-brief.md` — it briefs each panel as an **AUDIT of
the render**, and carries the refusal map, the strand rules, the no-answer-key rule (now actually
enforced in the generator) and the instruction to resolve every quoted number against the face's own
`b4var-rows` entry rather than the base's difficulty table. Inputs per locale are already built:
`out/b4-faces.<loc>.json` + the sweep PNGs.

Per locale: panel writes `i18n/.landing-b4-<loc>.json` (60 × 9 fields + `findings`) → `gen-b4-landings.js
<loc> --dry-run` to `dry-run ok` → `scripts/seo-landing/gate.js` 0 FAIL → commit.

⭐ **Expect defects and triage them the same way**: the four Nordic panels filed 34/48/40/45 findings
and six carried triple or quadruple corroboration. Reproduce before fixing (two panel claims were
rejected on measurement), and **measure the COST of a fix, not just its effect** — three of the five
fixes so far were too wide on the first attempt and only the cost measurement caught it. Fix defects
that are answer-affecting or locale-neutral; record design trade-offs rather than unilaterally
changing design-file numbers a second time.

## Phase 7 — publish ×11 + repoint (Hetzner)
Per locale: scp the pooled ZIPs to `/var/www/lcs-media/_staging/b4-<loc>/` → `b4-publish-locale.sh <loc>` (dry-run ok=N/0/0) → `--confirm` (OG ×11, hreflang ×11, audit N/N). Commit landing JSON → push → `bash deploy.sh > log 2>&1; echo EXIT=$?` → `repoint-deck-canonical.js --types=<10 keys> --locale=<loc>` → `refresh-deck-noindex-exempt.sh` → `indexnow-submit.js`. Remove server staging after (pools live on the PC).

## Phase 8 — hub verification + close-out
`verify-hub-type-rows.js --expect=<b4 json>` HARD in `deploy.sh` (drop `--warn-missing-keys`), `verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js --locales=<11>`; real-browser check of `/<loc>/worksheets?type=<key>` for de/fi/pt on the All tab. Close-out: memory `project_nt10d_worksheet_types.md` + MEMORY.md pointer; CLAUDE.md §26 → BUILT + LIVE, §14.10 115 → 125; README status; honest click math.

## Exit condition — how I know it is actually finished

The batch is done when **all four hold**, not when the decks exist:
1. `verify-hub-type-rows.js --expect=docs/worksheet-gen/b4-designs/hub-expectations.json` reports
   **0 warnings** (it reports 110 today — 10 keys × 11 locales, "not landed yet") and runs HARD in
   `deploy.sh` with `--warn-missing-keys` dropped.
2. 652 decks live, each repointed to its landing, IndexNow submitted.
3. A real browser shows `/<loc>/worksheets?type=<key>` populated for de, fi and pt on the All tab.
4. CLAUDE.md §26 reads BUILT + LIVE and §14.10 reads 125 keys; memory resume pointer updated.

## Verification (per phase, the gates above; the standing ones)
- Baseline 0 drift at every commit; `b3-baseline --check --expect=<accepted list>` where drift is intended.
- Per family: `qa/verify-b4-<key>.js` green with every poison killed; `render/one.js` PNGs read; `_work/<ID>-build.md`.
- Per locale: `validate-b4-draft` + probe, `lint-locale` 0, desc band N/N, title similarity 0 FAIL, contact sheets read, `publish-readiness` READY.
- Landings: `gate.js` 0 FAIL, `verify-hub-type-rows.js --expect=<b4>` = the matrix (656).
- Live: publish audit N/N, repoint 0 missing, hub gate HARD, real-browser samples.

## Hand-over
Memory `project_nt10d_worksheet_types.md` = the RESUME POINTER per phase (commits, which families/locales are done, the traps bought); CLAUDE.md §26 status line updated at each phase boundary that changes the resume point.
