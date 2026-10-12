# METHOD — Handmade Mazes (`maze-puzzles`): the template for every future maze expansion

The operator's /goal of 2026-10-11 was the flagship: hand-drawn-looking scene mazes, base + 19 faces × 11 locales = 220, each a
printable PDF + a draw-the-way screen + an answer key, original scenes built from the image library, native in every locale,
every page read before publishing, documented as the template for future expansions. This file is that record. The design
contract is `K-405-maze-puzzles.md`; the lock and click model is `_PANEL-FINDINGS.md`; the per-locale text records are
`_records/landings.<loc>.json` (landing prose) and `scripts/worksheet-gen/i18n/panels-b8/<loc>.json` (the deck text).

## 1 What a page is
A picture scene (sky / ground band + a maze box) in which the ROADS are part of the picture: sand paths in an orchard, water in a
garden, tunnels in soil, streets in a town, a cloud road in the sky. The hero (a library drawing) sits at the start beside a teal
start disc with an arrow; the goal (a library drawing) stands at the end beside a coral flag. A face may add a strip under the maze
(the town's "one street piece = 1" + answer box, the carrots' count and tick circles, the crossed-out obstacles) — only when the
strip carries the face's rule. One instruction line under the heading. The page body fills the measured shell body (stack 716 ±).
Three outputs from ONE instance: the print page, the screen (`trace-path`: drag along the roads, Check, Go back, Start again) and
the key (the route in coral, per-route colours on multi-route faces, totals filled in).

## 2 Where the art comes from
Colour library drawings only (`cache/themes/<theme>/<noun>@3x.webp` for measuring, `cache/themes-512/…` EMBEDDED in the page —
the 1536 px source made every PDF 5.7 MB; the 512 copy is ~300 dpi at the printed size, PDFs 0.4-1.5 MB, the first-sound page
3.7 MB because it carries ~40 picture cards). Every drawing's ink box is measured once (`tools/hm-ink-boxes.js` →
`data/hm/ink-boxes.json`) and pictures are sized and placed by their INK, not their square canvas (a wide picture fits by its ink
diagonal at 0.95). The background (sky, hills, soil strata, water, streets, icing drips) is drawn as flat strokes in the library's
palette. The colouring face uses B&W drawings only (never mixed with colour). Picture cards for the first-sound face come only from
`image-vocabulary.js` words of each locale (`tools/hm-sound-pools.js`), filtered by a HUMAN READ of every card picture
(`data/hm/sound-review.js REFUSED_CARDS`: a picture a five-year-old names differently is refused, never renamed; es refused the
parrot — "perico" in Mexico; fi refused the generic bird — named by its kind).

## 3 The engine
- `lib/hm-graph.js` Poisson + Gabriel graph over the maze box, route-first trees (the solution is grown first, then dead-end
  branches), a refill pass for dead stubs, loops where a face needs choices.
- `lib/hm-maze.js` one generator per topology: `generateTree` (picture mazes), `generateLooped` (collect / avoid / letters /
  numbers / sums, exactly ONE valid route proved by search), `generateLayers` (underground: a C × L soil lattice, shafts), 
  `generateStreets` (town: one shortest way by BFS count, the next way = shortest + 2, a straighter longer route, detour gate),
  `generateForest` (babies and mothers: k trees, a derangement so no baby is above its mother, randomized routing over all pair
  orders, paddock stations), `generateStrands` (tangled lines: a swap schedule, never the same partner twice in a row, straight
  runs with rounded corners so crossings stay ≈ 53°), `generateHexHop` (letter hop: a 7 × 7 pointy-top honeycomb, a run from a
  mid-alphabet letter, Nordic runs end on the last letter, exactly one valid run by DFS, near-miss decoys spread).
- `lib/hm-scene.js` composes the picture: hero and goal placed FIRST and claimed, a frame guard, then the cast on the islands; stones,
  pills, cards and signs on the roads; strips; per-route colours. `composeStrands` / `composeHex` for the two non-corridor faces.
- `lib/hm-verify.js` the raster ORACLE on the rendered page, independent of the generator: flood the road colour from the start —
  the goal must be reached; UNIQUE = the walkable road encloses no field patch (a hole test; art and stand footprints excluded);
  multi-route: each baby reaches only its own mother; strands: each string continuous within its own stroke; hex: a ring inside each
  cell shows the cell fill. Poisoned both ways (`hm-scene-poison.js`: a leak, a second way, a join, a strand gap, a covered cell).
- Instance tokens: `build()` returns `tokens:{LAST}`; render-instance fills `{LAST}` in the instruction and refuses any unfilled token.
- Reliability is a bar, not luck: `tools/hm-reliability.js` drives `build()` (incl. the composer) N/N over seeds for every scene
  and, for label faces, every locale. Each scene has its own `tries`; `build()` gets 12 compose attempts.

## 4 The twenty faces (mode → scene, band)
base K-405 orchard hedgehog (K) · first-maze K-406 park puppy (PreK, W 72, 2 short stubs) · big-maze G1-420 jungle orangutan (G1,
deep dead ends, Go back) · river K-407 stream boat → teddy (K, long curves) · burrow G1-421 underground ant (G1, 3 levels, an UP
move) · shortest-way G1-422 town tow truck (G1, count the covers, shortest ≠ fewest turns) · babies-mothers K-408 farm (K, 3 routes,
derangement) · tangled-lines G1-423 hilltop kites (G1, 4 strings, 3 kites + a balloon, a box above EACH) · collect G1-424 garden
rabbit (G1, 4 carrots, a simple path) · avoid G1-425 sea-ice polar bear (G1, walruses and holes ON the trails) · abc-capitals K-409
rocket (K; de it nl G1; the locale's own alphabet: it 21, es Ñ, sv fi ÅÄÖ, da no ÆØÅ) · abc-lowercase K-410 reef clownfish (K, b/d
p/q traps; fr print lowercase, not cursive) · letter-hop G1-426 honeycomb bear (G1) · numbers-20 K-411 valley train (K; de it G1) ·
skip-5 G2-392 dawn balloon (G2, 5…100, wrong clouds still end in 0/5) · make-10 G1-427 savanna giraffe (G1, decoys 9/11) ·
subtract-20 G1-428 candy gingerbread (G1, target badge) · first-sound K-412 market lion (K, the lion is the cue, no strip) ·
running-total G2-393 building site dump truck → crane (G2, a write box INSIDE each sign, inline totals) · maze-colouring K-413 B&W
beach crab (K, wide road to colour). Deviations from the design are recorded in the README and in `project_b8_handmade_mazes.md`.

## 5 Native text
Each locale's text is a panel record `i18n/panels-b8/<loc>.json` (titles from the locked heads, never translations of English;
printTitle, instruction, tap string, the 13 screen messages, rail name, skill sentences, topic meta) → `tools/b8-draft-from-panel.js`
→ `tools/validate-b8-draft.js` (with a build probe and the family gate's `validateBank`) → `tools/apply-b8-locale.js` (writes every
string file, the taxonomy, the tap strings), ONE locale at a time; `tools/check-b8-string-parity.js --all` must be 0.
⚠ The deck SEO description is assembled by the emitter from the title + level + instruction or a skill sentence: a long title can
leave NO middle that fits 120-170 (fi G2-393: the bare core was 118). Shorten the family's SHORT skill sentence until it fits
(fi: 38 chars), and run `tools/check-b8-zips.js` on every pool BEFORE upload.

## 6 Gates (all run before publish)
`qa/verify-b8-maze-puzzles.js` (bank rules ×11, 9 poisons) · `tools/hm-reliability.js` (N/N) · render QA in `cli.js generate` (lints,
the oracle, screen/key lints — a deck that fails is not written) · `qa/verify-interactive.js <pool> --poison` (the robot draws the
oracle's route to the celebration at 360 px, poisons: wrong route, no targets, a runtime that accepts everything, one-of-k routes
must not celebrate) · `tools/check-b8-zips.js <loc>` (title ≤ 70, description 120-170, distinct thumbnails, key + screen + route
graph, variant_id = the bare id so the deck slug is `<family-slug>-<id>`, 20 per locale) · `tools/check-b8-string-parity.js` ·
`scripts/seo-landing/gen-b8-landings.js` validation (≥ 200 words, title ≤ 75, meta 120-170, no visible "free") ·
`verify-hub-type-rows.js --expect=…b8-designs/hub-expectations.json` HARD in deploy.sh.

## 7 The human read and the review rounds
I read every EN print page on contact sheets (`zip-sheets` reads the SHIPPED ZIPs: thumbnail + title + h1 + description) before
writing a word of landing text, and corrected the draft against them (no mountains in the train valley, no sun on the beach, no
strip on the lion page, houses at the map edges, not on the blocks). Then ONE native + pedagogy reviewer over a compact dump of the
deck text (48 findings) and ONE over all 200 non-EN landings (98 findings). Both found source defects that every locale had
inherited from English: the kite strings that end at a BALLOON ("to its kite" was false for one animal), "do not pass a walrus"
(= do not walk near one), n/u called mirror letters, and the carrot rule the key depends on but the page never printed ("without
using a path twice"). Every finding was fixed at the source and every affected deck regenerated.

## 8 SEO
Landings written from the render, per locale, from the locked heads (`_PANEL-FINDINGS.md`): `_records/landings.<loc>.json` →
`gen-b8-landings.js <loc> <file>`; slug = native descriptive; `canonicalDeckSlug` = `<family-slug>-<id>`; levels per locale incl.
the shifts (de/it/nl letter faces first grade; no +1 trinn); standard-bearing faces carry the no-targetUrl CCSS anchor in JSON-LD;
every landing ends with the boundary sentence against the grid-maze family. Click model: low 330 · mid 620 · high 940 /day at
9-15 months (the 500 target sits in the mid band, conditional on indexation).

## 9 Traps paid for
- A wave that writes `unitOverrides: {}` for a family with no unit axis is refused by cli (write it only when non-empty).
- `b8-prepare-upload` regenerates everything; for a re-check of fresh staging, pool the ZIPs and run `check-b8-zips.js`.
- The robot reads `out/upload/wave-b8-<loc>-all`; never regenerate a pool while the robot plays it.
- Tool-layer: Bash commands lose one level of backslashes; edit text containing `\r\n`-style escapes with the Edit tool.
- `gen-b8var-specs.js` skips existing specs: after any EN string change run it with `--overwrite`.
- A word review cannot see a picture: the card pools were read on contact sheets, and per-locale refusals added after the native
  review (the parrot, the bird); the Norwegian vocabulary "Piggsvin" (= porcupine) was corrected to "Pinnsvin" in image-vocabulary.js.

## 10 Publish
(filled at publish: per-locale `b8-prepare-upload` / scp / `b8-publish-locale.sh` dry-run → predicted slugs = landing
`canonicalDeckSlug` → `--confirm`, deploy, repoint, IndexNow, live checks.)
