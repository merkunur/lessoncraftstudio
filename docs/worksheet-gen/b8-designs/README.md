# b8 — Handmade Mazes (`maze-puzzles`): base K-405 + 19 faces × 11 locales = 220

**STATUS: BUILT + LIVE 2026-10-12 — 220 decks (PDF + screen + key) + 220 landings, hub gate HARD. Method record: `METHOD-maze-puzzles.md`.**

The flagship scene-maze family (operator /goal 2026-10-11): curving roads through a picture built from the image
library, the start character and the goal drawn whole inside the frame, every page PDF + a draw-the-way screen
(`trace-path`) + an answer key. A NEW family, separate from the grid `mazes` family (K-242 / K-270-272).

| file | what |
|---|---|
| `K-405-maze-puzzles.md` | the FINAL design contract (§1 identity + table B, §2 base, §3 the 19 faces, §4 native plan, §5 gates, §6 SEO, §7 hub) |
| `_PANEL-FINDINGS.md` | the lock: family key, rail names ×11, the harvested heads, the honest click model |
| `_STUDIO-BRIEF.md`, `_ROLES.md`, `_SUBSTRATE.md`, `_work/` | the studio inputs and the pedagogy / design / critic records |
| `_records/` | id allocation (`b8var-id-allocation.json`), harvests, per-locale refusals |
| `METHOD-maze-puzzles.md` | the method record — the template for future expansions (written at close) |

## Faces (ids from `_records/b8var-id-allocation.json`; mode → scene in `scripts/worksheet-gen/data/b8/maze-puzzles.js` FACES)

K-405 base (orchard hedgehog) · K-406 first maze (park puppy, PreK) · G1-420 big maze (jungle) · K-407 river · G1-421
underground (ant, layered tunnels) · G1-422 town shortest way (street lattice) · K-408 babies and mothers (3 trees,
derangement) · G1-423 tangled lines (strings, crossings) · G1-424 collect the carrots · G1-425 avoid the walruses ·
K-409 ABC capitals · K-410 lowercase · G1-426 letter hop (honeycomb) · K-411 numbers 1-20 · G2-392 skip by 5s ·
G1-427 sums that make 10 · G1-428 subtraction within 20 · K-412 first sound (lion) · G2-393 running total within 100 ·
K-413 maze colouring page.

## Hub-gate expectation matrix

| key | en | de | es | pt | fr | it | nl | sv | da | no | fi | note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| maze-puzzles | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 20 | no refusals |

## Engine (scripts/worksheet-gen)

`lib/hm-graph.js` (Poisson + Gabriel, route-first trees, looped graphs, metrics) · `lib/hm-maze.js` (generateTree,
generateLooped, generateLayers, generateStreets, generateForest, generateStrands, generateHexHop) · `lib/hm-scene.js`
(composeScene / composeStrands / composeHex) · `lib/hm-verify.js` (the raster oracle on the rendered page) ·
`lib/hm-rules.js` (label rules) · `lib/hm-slots.js` · `data/hm/scenes.js` (the 20 scenes) · `types/k/K-405-maze-puzzles.js`
· `emit/interactive-runtime.js` JS_TRACE · `qa/verify-b8-maze-puzzles.js` (family gate) · `tools/hm-reliability.js`.
