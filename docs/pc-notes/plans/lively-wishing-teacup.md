# nt10-E (b5): 10 new printable worksheet types × (1 base + 5 variations) × 11 locales = 660

## Context
The operator wants 10 new K-3 printable types that fill real gaps in the catalogue (125 exercise-type keys; 95 printable families across 690 specs). Each type gets a base page plus 5 pedagogically distinct variations, rebuilt natively in all 11 locales. That is 60 specs → up to 660 decks and 660 landings. The SEO target is at least 1,000 clicks/day at maturity. **Every type must appear in the /worksheets sidebar, and clicking it must list all of its worksheets.** Earlier batches failed on that twice.

CLAUDE.md §26 called nt10-D "the LAST batch". This request overrides that, so this is batch **b5 (nt10-E)**. It reuses the proven nt10-D pipeline (design 09-21 → live 09-23) and clones every `b4` tool to `b5`. Nothing about the doctrine is re-invented.

Scale: this is multi-session work. The resume pointer lives in memory `project_nt10e_worksheet_types.md`, updated at every phase end, and in `docs/worksheet-gen/b5-designs/README.md`.

## What the survey found (2026-09-23)
- **Saturated:** maths (counting, place value, operations, fractions, time, money, measurement, graphing, geometry attributes G2+) and most phonics/grammar. **No new maths family** unless a panel finds a real gap.
- **Missing or thin:**
  - Science: parts of a plant and plant life cycle; animal life cycles (only the chicken exists, G1-203); materials and their properties (only G1-364 and K-214 touch it); magnets; space (sun/earth/moon/planets).
  - Literacy: colour words (K), digraphs/grapheme combinations, synonyms (only as one face, G1-337), homophones.
  - K geometry: 2D shape naming and recognition (the `geometry` family is G2+ attributes).
  - Social studies: road safety and signs, maps/continents, family members.
- **Rejected before; do not re-propose without a new argument:** dominoes, cube-nets, finger-counting, spelling-practice, comparatives, daily-routine/time of day, number-sequences, copywork, word snake, units conversion, sequencing (asset-blocked), cursive.
- **Assets:** the library holds object pictures only (~1,500, 50 colour themes; no scenes, no recolouring). Well stocked: flowers 38, tree 34, insects 15, space (8 planets + moon, rocket; `space/sun` is blocked), colors 19 swatches, shapes theme (2D + 3D), occupations 49, vehicles 39. Materials have **no attribute data**; `object-attributes.json` is 456/933 reviewed and has no material field. Life-cycle stages, a plant figure, road signs and a world map therefore need new SVG primitives, measured-gated like `body-figure.js`.
- **Next free ids:** K-368 · G1-376 · G2-358 · G3-392.

## Longlist for the selection panels (12 → lock 10, 2 spares)
| candidate | subject | band | why it fills a gap | new primitive? |
|---|---|---|---|---|
| plants (parts of a plant + plant life cycle) | science | K-G2 | universal K-2 science unit (BNCC EF02CI, NGSS 1-LS1, Sachunterricht, SEP) | `plant-figure.js` + growth stages |
| life-cycles (butterfly, frog, ladybug, bean) | science | G1-G2 | only chicken exists; huge en/es/de/it demand | `life-cycle.js` stage art |
| materials (materials + properties + magnetic) | science | G1-G2 | NGSS 2-PS1-1, BNCC EF01CI01, every curriculum | material data per opened picture |
| space (sun-earth-moon, moon phases, planets) | science | G1-G3 | high demand + child appeal; 8 planet pictures | `moon-phase.js` |
| colors (colour words and recognition) | letters | Pre-K/K | K staple in all 11; no family owns it | none (swatch chips) |
| 2d-shapes (name, trace, find, sort shapes) | math/spatial | Pre-K/K | giant K demand; `geometry` is G2+ | reuse shape paths |
| digraphs (native grapheme combos: sh/ch · sch/ei · ou/on · ch/ll/rr · gn/gl/sc · nh/lh · ui/ei · sj/tj · kj/skj · long vowels in fi) | letters | K-G1 | a genuine K-1 phonics unit in every locale | none |
| synonyms | letters | G1-G2 | fr/es/it/pt/de strong; only one face today | none |
| homophones (fr a/à, it è/e, es hay/ahí, de das/dass, en there/their) | letters | G2-G3 | Romance demand very strong | none; expect Nordic/fi refusals |
| road-safety (traffic lights, signs, crossing) | social/science | K-G2 | Verkehrserziehung / educación vial / verkeer: strong EU demand, genuinely national | `road-sign.js` (geometric, per-locale convention) |
| maps (continents, compass directions, map key) | social | G1-G3 | continents with per-locale conventions (7 vs 5/6) | `world-map.js` (simplified public-domain polygons) |
| family (family members, family tree) | social | Pre-K/K | Nordic kin terms (farmor/mormor) = native rebuild | portrait bank (check the library) |

The panels decide on harvest numbers, curriculum fit, buildability ×11 and the variation doctrine ("a face changes what the child DOES or LEARNS; content swaps are not faces"). Spares go to the backlog with their numbers.

## Plan, by phase (each phase ends with a commit + a resume-pointer update)

**Phase A: selection (research only).**
- Seeded 11-locale autocomplete harvest for the 12 candidates: `scripts/seo-research/harvest-candidates.js` with `_records/candidate-seeds.json` → `summarize-candidate-harvest.js`, plus a Nordic school-register re-probe.
- Four expert panels, ≤4 agents in flight: pedagogy (11 curricula) · SEO Germanic en/de/nl · SEO Romance es/pt/fr/it · SEO Nordic sv/da/no/fi.
- Output: `docs/worksheet-gen/b5-designs/_PANEL-FINDINGS.md` holding the lock, per-locale heads ×11 with tier/SERP/harvest counts, and the honest click model per locale. Base ids are assigned.

**Phase B: design studio (10 final design files).**
- Per type, run a pedagogy agent, then **two independent design agents** (the operator asked for creativity; the stronger concept wins, or they are merged), then a critic.
- Each writes `b5-designs/<ID>-<key>.md` with 7 sections: identity · base page · faces 2-6 · native rebuild ×11 · data + gates · SEO · hub contract.
- Clone `_STUDIO-BRIEF.md` / `_ROLE-*.md` / `_SUBSTRATE.md` from b4 and re-measure the substrate.
- README: hub-expectation matrix, then `tools/export-hub-expectations.js --batch=b5` → `hub-expectations.json`.

**Phase C: spine + registration.**
- Clone the b4 spine to b5 with `tools/_clone-b4-spine.js` as the template, asserting every literal it substitutes: gen-b5var-specs, alloc-b5var-ids, lib/b5-common, templates/components-b5 barrel, b5-probe-child, validate/apply-b5, gen-b5-waves/probe-jobs/faces-table, gate-variation-distinct b5, check-b5-string-parity, gen-b5-landings, b5-publish-locale.sh.
- `register-b5-taxonomy.js`: `apps.<key>` (default_subject, age), exercise-type slug/name. It guards theme-key collisions (the `weather-symbols` precedent).
- Strand rows in `frontend/lib/seo/strand-names.ts`, additive (Science exists; social studies needs a row ×11).
- `b3-baseline.js --capture` before any shared edit; 0 drift outside the new ids.

**Phase D: EN base specs + NEW primitives.**
- Write `types/<band>/<ID>-<slug>.js` and `templates/components-b5/<key>.js`.
- Each new SVG primitive gets a verify that measures the RENDER.
- Art quality: `render/one.js` → contact sheet → visual-critic agent on every PNG → I read the renders myself (the "nobody looked at the art" lesson).

**Phase E: EN variation faces (50).**
- `alloc-b5var-ids` → `b5var-rows/<key>.js` → `gen-b5var-specs` → `gate-variation-distinct --batch=b5`; re-capture the baseline.

**Phase F: native panels ×10 locales.**
- One panel per locale; the brief says **rebuild, never translate, and audit the EN source**. Each panel OPENS every picture it keeps and renders a sample in its own language.
- Per locale: `.draft-b5-<loc>.json` → `validate-b5-draft` (poisoned both ways) → `apply-b5-locale` → `lint-locale` = 0 → `check-b5-string-parity`.
- Refusals are recorded, never padded; the matrix is corrected from the shipped waves.

**Phase G: waves + generation + critic ×11.**
- `gen-b5-waves` → `cli.js generate` (QA gate) → desc band + title-similarity gates → pool to `out/upload/wave-b5-<loc>-all/` → sweep renders → read de/pt/fi myself; critic agents for the rest.
- Answer-position tells are measured in both directions on the SHIPPED instance.

**Phase H: landings ×11.**
- `b5-landing-brief.md` briefs each panel as an **AUDIT of the render**.
- `gen-b5-landings.js` enforces: ≥200 words, meta 120-170, title ≤75, no visible free claim, no answer-key promise (printables ship no key), and the STANDARD map per face.
- `seo-landing/gate.js` 0 FAIL.

**Phase I: publish ×11 (Hetzner).**
- **First `git status` and confirm the server taxonomy carries the locale's slugs** (both nt10-D traps).
- `b5-publish-locale.sh <loc>` (dry-run → confirm → OG → hreflang ×11 → audit N/N) → commit + push → `deploy.sh > log 2>&1; echo EXIT=$?` → `repoint-deck-canonical.js` (missing=0) → `refresh-deck-noindex-exempt.sh` → `indexnow-submit.js`.
- Remove the server staging; the pools stay on the PC.

**Phase J: the hub OBS gate (this phase is what makes the sidebar work).**
- Add a third `deploy.sh` call: `verify-hub-type-rows.js --expect=docs/worksheet-gen/b5-designs/hub-expectations.json`. It runs with `--warn-missing-keys` until the landings exist, then HARD.
- It checks, per key × locale, through the hub's own code: `apps.<key>` present · `default_subject` valid · the key sits in a subject bucket · name ×11 · rows == expected slugs exactly · `coordinate.type === key` · `coordinate.mode` non-empty.
- Then run `verify-worksheets-hub-order.js` and `verify-worksheets-hub-render.js --locales=<11>`, and open `https://www.lessoncraftstudio.com/<loc>/worksheets?type=<key>` in a real browser on the **All** tab by clicking the sidebar entry (not a typed URL). Minimum: every key in en/de/fi, plus a sample across the other locales.

**Phase K: close-out.**
- Memory file + MEMORY.md pointer; CLAUDE.md new §27 (and §26 no longer "the last"); §14.10 count 125 → 135; honest click math against the model.

## SEO approach (no operator data needed)
- Demand is measured by the seeded autocomplete harvest per locale, which is the only way to see novel genre heads.
- Titles lead with the native head teachers type: compound heads where the head is a theme slug (e.g. `space`, `colors`, `shapes`, `flowers` are theme slugs, so `space`/`colors`/`2d-shapes` get compound heads), plus a grade qualifier where it fires.
- Face titles target the winnable long tail (en heads are HARD everywhere). "Free printable" goes in metadata only.
- JSON-LD `LearningResource` + educationalAlignment only where a real code exists; exact hreflang siblings (a Swedish page leaking into da/no SERPs is a known risk); IndexNow.
- Internal links: the hub rail plus topic end-links.
- Click model per panel tiers (A 3-8 / B 1-3 / C <1 per landing per day; Nordic scaled). **The 1,000/day target is plausible at 9-15-month maturity, with near-zero clicks for the first 2-3 months.** This will be stated honestly at close-out.

## Critical files (existing, reused)
- Designs: `docs/worksheet-gen/b4-designs/{README,_STUDIO-BRIEF,_ROLE-*,_SUBSTRATE,_FACE-BRIEF,_BUILD-BRIEF}.md`, `b4-panel-brief.md`, `b4-landing-brief.md`: all cloned to b5.
- Tools: `scripts/worksheet-gen/tools/*b4*` (list above), `tools/b3-baseline.js`, `tools/export-hub-expectations.js`, `lib/b3-picture-index.js`, `lib/unit-axis.js`, `primitives/body-figure.js` (pattern for new figures), `qa/verify-ruling-starters.js`, `render/{one,batch}.js`, `qa/contact-sheet.js`.
- SEO: `scripts/seo-research/harvest-candidates.js`, `scripts/seo-landing/{gen-b4-landings,gate,repoint-deck-canonical}.js`, `scripts/publish-cli/b4-publish-locale.sh`.
- Hub: `scripts/verify-hub-type-rows.js`, `frontend/lib/worksheets-catalog.ts`, `frontend/config/topics-taxonomy.json`, `frontend/lib/seo/strand-names.ts`, `deploy.sh` (lines 317-319).

## Verification (definition of done)
1. `verify-hub-type-rows.js --expect=…b5…/hub-expectations.json` is HARD in deploy.sh and PASSES; its `--poison` run catches all mutations.
2. In a real browser, clicking each new type in the sidebar lists all its worksheets (6 minus recorded refusals) in every locale sampled.
3. Publish audit N/N per locale; repoint missing=0; IndexNow 200s; `gate.js` 0 FAIL; title similarity 0 FAIL; string parity 0.
4. Every new primitive's render-verify is green, and every shipped PNG has been read by a critic agent, with de/pt/fi also read by me.
5. `b3-baseline --check` shows 0 drift outside the b5 ids; there are 0 edits to `components.js` / b2 / b3 components / protected cores.
