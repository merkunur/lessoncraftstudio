# nt10-E — 10 new printable worksheet types × (1 base + 5 variations) × 11 locales (operator /goal 2026-09-23)

**Status: DESIGN COMPLETE 2026-09-23** (10 of 10 final design files + `_work` provenance; hub matrix **626 of 660**, every gap a recorded refusal). **BUILD IN PROGRESS** — Phase C spine `83556185` (b5 tools cloned from b4, ten keys registered EN, baseline 0 drift); Phase D EN base builders running. Resume pointer: memory `project_nt10e_worksheet_types.md`. Plan: `C:\Users\rkgen\.claude\plans\lively-wishing-teacup.md`.

Operator brief (verbatim essentials): design + build 10 new types after analysing the existing ones, 5 pedagogically meaningful variations each, perfectly native in all 11 languages (rebuilt, never translated), top quality in every sense, expert pedagogy / content / several design agents, SEO ≥ 1,000 clicks/day, and **when the user clicks the type in the /worksheets sidebar, all its worksheets must show.**

## Files
- `_PANEL-FINDINGS.md` — THE selection record (the lock, the rankings of four panels, the raw harvest table, cross-panel rulings, honest click model, open items). Sources: `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `_records/` (harvest round 1 ×11, Nordic round 2 `v2/`, word-parts `wordparts/`).
- `_STUDIO-BRIEF.md` · `_SUBSTRATE.md` (nt10-D sheet + 2026-09-23 delta) · `_ROLE-{PEDAGOGY,DESIGN,CRITIC}.md` — the studio briefs (TWO independent designers per type, then a critic merge).
- `<ID>-<key>.md` × 10 — the FINAL design files (the contract; 7 sections each).
- `_work/<ID>-{pedagogy,design-A,design-B,critic}.md` — provenance; never brief a builder or panel from them.
- `_BUILD-BRIEF.md` — the per-family build contract (nt10-D brief + nt10-E additions: primitives first, the art is the product, locale-convention data, world-map data pipeline).
- `hub-expectations.json` — exported from the matrix below by `node scripts/worksheet-gen/tools/export-hub-expectations.js --batch=b5` (`--check` diffs README vs JSON; never hand-edit).

## The 10 types and their ids
| # | id | family key | subject | base band | EN rail name | naming rule |
|---|---|---|---|---|---|---|
| 1 | K-368 | `2d-shapes` | math | K | 2D Shapes | compound head ×11 (`shapes` is a theme slug); de adds "benennen" (live geometry title "Geometrische Formen") |
| 2 | K-369 | `road-safety` | science | K | Road Safety | never the bare sign word (driving-test intent) |
| 3 | K-370 | `family` | letters | K | Family Members | fi avoids "sukupuu"; never "Word Families" |
| 4 | G1-376 | `plants` | science | G1 | Parts of a Plant | never the bare `flowers`/`tree` theme word |
| 5 | G1-377 | `animal-life-cycles` | science | G1 | Animal Life Cycles | animal-specific heads; never the science-sequence label |
| 6 | G1-378 | `earth-and-space` | science | G1 | Sun, Moon and Planets | compound head ×11 (`space` is a theme slug) |
| 7 | G1-379 | `maps` | spatial-reasoning | G1 | Map Skills | no "compass" in titles (treasure-hunt's live compass mode) |
| 8 | G1-380 | `digraphs` | letters | G1 | Digraphs | es/it/sv/da/no REFUSED whole-family |
| 9 | G2-358 | `synonyms` | letters | G2 | Synonyms | never "and antonyms" (opposites owns it) |
| 10 | G2-359 | `word-parts` | letters | G2 | Prefixes, Suffixes and Root Words | never "word families" (syllable-reading's name); es/fr/it/pt heads avoid compound-words' localized names |

Variation faces take the next free ids by CONTENT band: **K-371+ · G1-381+ · G2-360+ · G3-392+** (`tools/alloc-b5var-ids.js` → `_records/b5var-id-allocation.json`, this table's order).

## Build recipe (clone of nt10-D; tooling = the `*b5*` files from `tools/_clone-b5-spine.js`)
1. `tools/b3-baseline.js --check` 0 drift before/after every shared edit (baseline recaptured at Phase C: `out/b3-baseline.b5-phase0.json`).
2. Registration: `tools/register-b5-taxonomy.js` (DONE EN) → non-EN slug/name ×10 via `apply-b5-locale.js`; `tools/register-b5-en-content.js` (skill sentences + `topicMeta`); strand rows additive in `frontend/lib/seo/strand-names.ts` (a Social Studies row for maps/road-safety where the finals ask).
3. EN bases (Phase D): one builder agent per family under `_BUILD-BRIEF.md` → spec + components-b5/<key>.js + NEW primitives with render-measuring verifies + `data/b5/<key>.js` + `qa/verify-b5-<key>.js`; I read every render.
4. EN faces (Phase E): `alloc-b5var-ids` → `b5var-rows/<key>.js` → `gen-b5var-specs` → `gate-variation-distinct --batch=b5`; baseline recapture.
5. Native panels ×10 (Phase F; ≤4 in flight): `b5-panel-brief.md` (clone of b4; the EN is a SOURCE TO AUDIT; every panel OPENS pictures and renders a sample) → `.draft-b5-<loc>.json` → `validate-b5-draft` → `apply-b5-locale` → `lint-locale` → `check-b5-string-parity`.
6. Waves + generate + critic ×11 (Phase G): `gen-b5-waves` → `cli.js generate` → desc band + title similarity → pool `out/upload/wave-b5-<loc>-all/` → sweep renders; answer-position tells measured both ways on the SHIPPED instance.
7. Landings ×11 (Phase H): `b5-landing-brief.md` (AUDIT of the render) → `gen-b5-landings.js` → `seo-landing/gate.js` 0 FAIL.
8. Publish ×11 (Phase I): `git status` clean + server taxonomy carries the locale → `b5-publish-locale.sh` → deploy → repoint → IndexNow. Plus the K-205 republish (the caterpillar/butterfly fix, `f2a3a084`).
9. Hub (Phase J): third `deploy.sh` call `verify-hub-type-rows.js --expect=docs/worksheet-gen/b5-designs/hub-expectations.json` (warn mode until landed, then HARD) + render/order verifiers + a real-browser click on each sidebar entry.
10. Close-out (Phase K): memory, CLAUDE.md §27, §14.10 count 125 → 135.

## Why the hub failed before, and the contract that prevents it
The sidebar is built from the landing corpus grouped by taxonomy subject: a key with no `apps.<key>` renders nowhere; labels use `name.<locale>` with no en fallback; rows = landings with exact `coordinate.type`; the landing cache refreshes on deploy. So: `apps.<key>` + slug/name ×11 + exactly the expected landings per key per locale + commit + deploy, enforced by `verify-hub-type-rows.js` reading `hub-expectations.json` (a 0 cell means the rail must show NOTHING for that key in that locale — the refused digraphs locales).

## Hub-gate expectation matrix (design-time; each file's §7 is the SoT)
| key | en | de | es | pt | fr | it | nl | sv | da | no | fi | total | refusals / contingencies (see the file) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2d-shapes | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none |
| road-safety | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none at design; every locale's sign table must be panel-signed before build of that locale |
| family | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none at design; F4 riddles contingent per locale |
| plants | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none (per-item celery fallback) |
| animal-life-cycles | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none |
| earth-and-space | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none; above-band stated per locale; pt moon mirrored |
| maps | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none; continent/ocean counts are locale data |
| digraphs | 6 | 6 | 0 | 5 | 6 | 0 | 6 | 0 | 0 | 0 | 6 | 35 | es/it/sv/da/no REFUSED (inventory owned by spelling-rules/syllable-reading or < 3 teams × 6 pictured words, measured); pt F4 refused (no word-final team); fi F4 contingent on `uuni` |
| synonyms | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 66 | none at design; F1 per-locale lexicon floor (es/de at risk) |
| word-parts | 6 | 6 | 5 | 6 | 5 | 6 | 6 | 6 | 6 | 6 | 5 | 63 | es F4 + fr F4 refused (compound-words owns the agent nouns), fi F3 refused (no prefixes); sv F3 / da F4 at risk |
| **design total** | | | | | | | | | | | | **626 (ceiling 660)** | every gap a recorded refusal, never a filler |

## Honest click model
From the three SEO panels' midpoints at 9-15-month maturity (near-zero for the first 2-3 months): Germanic ≈ 340-500/day · Romance ≈ 350-650/day · Nordic ≈ 90-230/day → **batch ≈ 780-1,380/day, midpoint ≈ 1,080** (the digraphs refusals fall in es/it/sv/da/no where digraph demand was weakest). Deck pages are an additional indexable surface not counted here.

## Open items
1. Subject bucket for family / road-safety / maps (no social-studies subject; defaults recorded in `_PANEL-FINDINGS.md`).
2. Six+ new primitives need a human-eye print check before their locales ship (the finals name them: family figures three-adult read test, the synonyms sock, the road-sign greyscale set).
3. Printable decks ship NO answer key: no title/meta/landing may promise one.
4. es/pt worksheet-word register (nt10-D open item 2) still stands.
