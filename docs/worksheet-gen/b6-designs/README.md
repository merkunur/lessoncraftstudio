# nt5-F — 5 new printable worksheet types × (1 base + 5 variations) × 11 locales (operator /goal 2026-09-23)

**Status: DESIGN IN PROGRESS 2026-09-23.** Selection locked by the operator (cursive-writing · story-sequencing · healthy-habits · habitats · sink-or-float); four panels + two harvest rounds done (`_PANEL-FINDINGS.md`); design studio running (`_work/<ID>-{pedagogy,design-A,design-B}.md` → critic → final `<ID>-<key>.md`). Phase C spine cloned (`tools/_clone-b6-spine.js`, baseline 0 drift), five keys registered EN (taxonomy 140). Cursive fonts vendored (`scripts/worksheet-gen/assets/fonts/cursive/`, OFL). Plan: `C:\Users\rkgen\.claude\plans\lovely-crafting-summit.md`. Memory: `project_nt5f_worksheet_types.md`.

Operator brief (verbatim essentials): design + build 5 new types after analysing the existing ones, 5 pedagogically meaningful variations each, perfectly native in all 11 languages (rebuilt, never translated), top quality in every sense, expert pedagogy / content / several design agents, SEO ≥ 400 clicks/day (330 worksheets), and **when the user clicks the type in the /worksheets sidebar, all its worksheets must show.**

## Files
- `_PANEL-FINDINGS.md` — THE lock (types, keys, ids, rail names, faces, cross-panel rulings, click model). Sources: `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `_records/` (harvest round 1 ×11, round 2 `v2/`, `cursive-font-probe.png`).
- `_STUDIO-BRIEF.md` · `_SUBSTRATE.md` · `_ROLE-{PEDAGOGY,DESIGN,CRITIC}.md` · `_FACE-BRIEF.md` · `_BUILD-BRIEF.md` — the studio and build contracts (cloned from nt10-E + the nt10-E landing-audit lessons).
- `<ID>-<key>.md` × 5 — the FINAL design files (the contract).
- `hub-expectations.json` — exported from the matrix below by `node scripts/worksheet-gen/tools/export-hub-expectations.js --batch=b6` (`--check` diffs README vs JSON; never hand-edit).

## The 5 types and their ids
| # | id | family key | subject | base band | EN rail name |
|---|---|---|---|---|---|
| 1 | K-379 | `story-sequencing` | letters | K | Story Sequencing |
| 2 | K-380 | `healthy-habits` | science | K | Healthy Habits and Hygiene |
| 3 | G1-398 | `habitats` | science | G1 | Animal Habitats |
| 4 | G1-399 | `sink-or-float` | science | G1 | Sink or Float |
| 5 | G2-377 | `cursive-writing` | letters | G2 | Cursive Writing |

Variation faces take the next free ids by CONTENT band: **K-381+ · G1-400+ · G2-378+ · G3-400+** (`tools/alloc-b6var-ids.js`).

## Build recipe (clone of nt10-E; tooling = the `*b6*` files from `tools/_clone-b6-spine.js`)
Same eleven steps as `../b5-designs/README.md` with b6 names: baseline 0 drift → registration (DONE EN) → EN bases → EN faces → native panels ×11 (≤4 in flight) → waves + generate + critic → landings ×11 in THREE passes (audit of the render → fix rounds → touch-up) → publish ×11 (`b6-publish-locale.sh`, which runs the beacon + site-chrome steps) → hub gate (4th `deploy.sh` call, warn until landed, then HARD) + real-browser sidebar clicks → close-out (memory, CLAUDE.md §28, §14.10 135 → 140). Plus: republish the G1-204 decks in place (plastic spoon → bolt, `data/science/sink-vs-float.json`).

## Hub-gate expectation matrix (design-time; each final's §7 is the SoT)
| key | en | de | es | pt | fr | it | nl | sv | da | no | fi | total | refusals / contingencies |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| story-sequencing | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none |
| healthy-habits | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none |
| habitats | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none at design; per-locale habitat set is data |
| sink-or-float | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none |
| cursive-writing | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 0 | 6 | 6 | 0 | 54 | sv + fi REFUSED whole-type (no joined school script in Lgr22 / OPS 2014; no Playwrite SE/FI); it/es F2 capitals contingent on the native panel |
| **design total** | 30 | 30 | 30 | 30 | 30 | 30 | 30 | 24 | 30 | 30 | 24 | **318 (ceiling 330)** | every gap a recorded refusal, never a filler |

## Honest click model
Panels' midpoints at 9-15-month maturity (near-zero for the first 2-3 months): Germanic 155 · 231 · 309 · Romance 204 · 337 · 474 · Nordic 22 · 42 · 62 → **batch ≈ 381 · 610 · 845 /day** (low · mid · high). Round-2 re-probe (`_records/v2/`) confirmed the strongest sub-queries: tooth brushing and hand washing (healthy-habits), specific habitats (rainforest, arctic, pond, ocean, animal adaptations), "images séquentielles" / "beginning middle end" (story-sequencing). Deck pages are an additional surface not counted.

## Open items
1. Cursive: native panels confirm the script unit per locale (fr-moderne vs fr-trad; it-moderna vs it-trad; da default; de VA + LA both published, SAS after a native check; no = the løkkeskrift/stavskrift the glyphs actually show).
2. Every new primitive needs a human-eye print check (story panels, habit pictograms, habitat tiles, animal homes, clay forms, tank).
3. Printable decks ship NO answer key: no title/meta/landing may promise one.
4. es-MX register: the worksheet noun is appended by the engine; titles carry the genre head only.
