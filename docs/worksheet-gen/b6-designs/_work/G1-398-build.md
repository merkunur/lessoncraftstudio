# G1-398 `habitats` — base build record (2026-09-23)

Contract: `docs/worksheet-gen/b6-designs/G1-398-habitats.md` §2 (base) + §5 (data + gates). Faces (§3) NOT built (Phase E); the knobs the base carries for them are listed under "Open items".

## Files (all new, type-scoped; nothing shared edited; nothing staged or committed)
| file | what |
|---|---|
| `scripts/worksheet-gen/primitives/habitat-tile.js` | NEW primitive: 7 cut-away diorama windows (ocean, pond, forest, meadow, polar, savanna, rainforest), viewBox 300 x 136, strokes in PAGE px (px / scale), no text / image / coral / animal |
| `scripts/worksheet-gen/primitives/animal-home.js` | NEW primitive: 6 cut-away homes (nest, hive, web, burrow, anthill, lodge), viewBox 120, px >= 72; stamps `data-lcs-mound`, `data-lcs-chamber`, `data-lcs-trunk` for the gate |
| `scripts/worksheet-gen/templates/components-b6/habitats.js` | `hbWindow`, `hbWall`, `hbSpecimenCard`, `hbDrawer`, `hbSpacer` (the barrel `components-b6.js` auto-discovers the file; no registration line was needed; `_index.js` untouched) |
| `scripts/worksheet-gen/data/b6/habitats.js` | `HABITATS_LOC` (en block, first export) + `HABITATS` (locale-free truth: keys, NEAR / FAR, the 42-animal claim table, EXCLUDED, HOMES, ADAPT, NEEDS, FOOD_PICS). `data/` is gitignored: **force-add** |
| `scripts/worksheet-gen/types/g1/G1-398-animal-habitats.js` | the spec (slug `animal-habitats`), composer, `pageOracle`, `drawerTells`, `verify()` |
| `scripts/worksheet-gen/qa/verify-habitat-tile.js` | primitive gate (emitted + rendered + poisons + sheet) |
| `scripts/worksheet-gen/qa/verify-animal-home.js` | primitive gate |
| `scripts/worksheet-gen/qa/verify-b6-habitats.js` | family gate; exports `validateBank(block, loc)` for `tools/validate-b6-draft.js` |
| `scripts/worksheet-gen/qa/b6-habitats-harness.js` | clone of `b5-maps-harness.js` (G1-398 prefix; `__raster`, colour + grey sheets) |

## Gate results (final run)
- `node qa/verify-b6-habitats.js` → **PASS (4920 assertions, 22/22 poisons killed)**; sweep 20 seeds x d2 = 20 distinct verify-clean pages; per-position letter share max |dev| 4.1 points (n 400); habitat -> letter max |dev| 6.4 points from 25 %; shipped instance (seedEpoch 1) `A=pond B=ocean C=savanna D=rainforest`, drawer `DBADBDAC`.
- `node qa/verify-habitat-tile.js` → **PASS (1320 assertions, 3/3 poisons killed)**. Near pairs at w 196 (mean |Δgrey|, threshold = the measured poison distance): ocean/pond 24.97 vs poison 22.45 (margin 2.51) · forest/rainforest 55.53 vs 44.73 (10.80) · savanna/meadow 31.48 vs 22.90 (8.58). White: ocean 32 · pond 36 · forest 35 · meadow 52 · polar 58 · savanna 49 · rainforest 2 %; rainforest is the darkest (mean luma 186).
- `node qa/verify-animal-home.js` → **PASS (57 assertions, 3/3 poisons killed)**; mound tops burrow 26 / anthill 10 units; chambers 1 / 4; dark-mask IoU max 0.21 @72, 0.17 @88.
- `render/one.js G1-398 null <d> en` d1/d2/d3: lints clean, verify clean.
- `i18n/build-en.js` buildEn(): clean (title unique in G1).
- `node tools/b3-baseline.js --check --quick` → `checked build 3896 + enum 299 in 26s: 0 drifted (0 expected), 0 missing` **PASS**.

Poisons killed (each for its own reason): P1 penguin + walrus · P2 duck + ocean · P3 squid · P4 frog + rainforest · P5 jaguar · P6 hump stores water · P7 claim names giraffe · P11 bee's own food as distractor · P12 toys/ball food · P13 polar_bear (vocab NULL + EXCLUDED) · P14 cat from pets · P15 woodpecker ↔ tree hole · P16 pt-region page with gorilla · P17 the G1-202 instruction · P18 no "sjø" · P19 fi "Eläinten kodit" · PR1 ABCDABCD · PR2 counts 2,2,2,2 · PR5 animal name in body · PR7 window as library `<img>` · PR8 answerBox (stamps "undefined") · PR9 plaque > 280 at 17 px. Primitive poisons: pond as a full-width band, meadow with creamDeep ground + teal tree, forest with white conifers + tealSoft background; anthill one tunnel one room, hive as a hanging teardrop comb, nest with a bird.

⭐ PR5 first came back WRONG REASON: `root.textContent` glues the disc letter to the plaque ("BWhale Ocean"), so a letter-boundary name match could not see a printed name. `verify()` now joins every text node with a space. A real hole the poison found.

## Stack arithmetic (measured in the real render)
d2: wall 2 x (148 card + 13 plaque overhang) + 14 = 336 · spacer 18..60 · drawer 2 x 150 + 12 = 312 → 666 minimum. en body 766: stack 708 (spacer at its 60 cap, 58 px below). Four-line-title chrome test (fi-length title + instruction): body **667**, stack 667 (spacer 19), drawer above the footer, lints clean. d1 (3 windows, 2 + 1 centred): 708 @766. d3: 684 @766.

## PNGs for the reviewer
- base d1/d2/d3: `scripts/worksheet-gen/out/dev/G1-398-null-d1-en.png`, `…-d2-en.png`, `…-d3-en.png`; mono proxy `…/G1-398-null-d2-en-grey.png`; 667 chrome `…/G1-398-gate-chrome677.png`
- tiles at 196 + 639, colour + grey: `…/out/dev/G1-398-tiles-colour.png`, `…/G1-398-tiles-grey.png` (300 + 639 working sheets: `G1-398-tiles-w300-*.png`, `G1-398-tiles-w639-*.png`, `G1-398-tiles-w196-*.png`)
- homes at 72 / 88 / 176, colour + grey: `…/out/dev/G1-398-homes-colour.png`, `…/G1-398-homes-grey.png`
- the opened library pictures (all 42 claim-table animals at 84 px): scratchpad `G1-398-pics.png`

## What I saw and fixed (art iterations)
- rainforest v1 read sparse with leaves floating off the vines → added a canopy of hanging leaves, leaves grown OUT of the vine curve, a seventh / eighth leaf; now the darkest window and reads as a jungle wall at 196.
- snowflakes read as asterisks → V barbs on every arm.
- acacia trunk stopped short of the crown (a floating umbrella) → forked trunk reaching into the crown + two branches.
- hive v1 (a rect with an oval) read as a phone / a sealed box at 72 px → a TREE: scalloped crown on top, roots and ground below, the trunk opened to show honeycomb.
- nest v1 too small in its box → bigger bowl, eggs sit IN it (front wall over their lower halves).
- lodge dome narrowed so water shows on both sides.
- pond: grass on both banks.
Every library animal placed on the base was OPENED (scratchpad `G1-398-pics.png`): all read as the claim table says; the squirrel is orange and fox-like but has the squirrel tail; the moose is `animals/moose` (antlers); the macaw reads as "parrot"; the orangutan and monkey look alike (the `group:'ape'` <= 1 rule covers it).

## Deviations from the design (each measured)
1. **Ocean surface 34 → 50.** The table's own rule (white sky >= 30 % except rainforest) fails at 34 (25 % of the area); measured white 28 % at 44, **32 % at 50**.
2. **Polar second floe = a tall iceberg peak** (x 240..296, most of it below the waterline) instead of a flat floe; the waterline is solid over open water and dashed across the ice so the submerged bulk is legible.
3. **Savanna carries a sun** (hot, dry; the meadow does not) and the acacia trunk is forked into the crown.
4. **Pond reeds on BOTH banks**, the left pair short (tops y 38+): the page's letter disc covers card (0..41, 0..41) = tile x 0..35, y 0..35 at w 300, and would have hidden the design's y 14..22 cattails. The gate's cattail signature counts dark vertical blobs on either bank (>= 2) instead of "left of x 40" only.
5. **Forest has two small light background spruces** (a forest is many trees; unchanged greyscale identity: two scalloped crowns + one dark spire).
6. **Tile/card frame:** card = teal 3 border + 3 px white mat + the tile's own teal 3 frame (3 + 3 + 300 + 3 + 3 = 312; 148 high) — the design's "pad 6" read as a mat inside a frame.
7. **Drawer card padding 6, not 8:** the design's 150 = 8 + 84 + 6 + 44 + 8 leaves the 2 px border out; 2 + 6 + 84 + 6 + 44 + 6 + 2 = 150.
8. **d1 = 3 windows as 2 + 1 (centred), pictures 84 (design 96).** A 2 x 2 wall with two rows of 96 px cards = 690 > 677; a one-row wall of 191 px tiles let the letter disc cover a quarter of each place (rendered and seen). d1 `minRowDistinct` 2 (a 3-card row with 3 windows and >= 3 distinct letters per row forces counts 2,2,2 = all-equal).
9. **Instruction "Look at the four habitats" → "Look at the habitats."** d1 draws three; a number in the instruction names apparatus that is not on every page (nt10-E lesson). en string 88 → 83 chars.
10. **Antarctic plaque = `tileLabel.polar` ("Polar Ice"); Arctic = `tileLabel['polar-arctic']`** ("Arctic"). The block shape has no `polar-antarctic` literal; recorded so the panels know which literal lands where.
11. **Added optional `rainforestRegion` to the locale block** (pt: `'americas'`): §4/§5 rule 4 name the rule (pt Amazônia never an ape) but the block had no field for it. The composer, `pageOracle` and `verify()` (via `data-lcs-region`) enforce it; P16 proves it.
12. **`HABITATS.EXTRA_LIVES: ['desert']`** so the camel (F3 only) passes rule 2 without a desert window existing.
13. Base-only page rules encoded as data: `notWithWindow` (seal-grey/polar, moose/pond, frog/rainforest, elephant + rhino/rainforest, monkey/savanna), `coastal`, `faces` (narwhal + white seal = F2 only; camel = F3 only), `group:'ape'`, `region`. Consequence (by design, now visible): the base polar window always holds exactly ONE animal (walrus or penguin).
14. Plaque fallback 17 → 15 px is chosen by a conservative width estimate in build (Baloo 2 700 ~0.6 em a grapheme + padding); the gate measures the real overflow (PR9) — no further shrink ever.

## Open items (faces / panels)
- **Phase E components** named by the design and NOT built: `hbHomeMatch` (F1), `hbStrangerRow` (F2), `hbAdaptBank` / `hbAdaptRow` (F3), `hbNeedsRow` / `hbNeedsHead` (F4), `hbReport` (F5); the face branch of `_buildWith` throws on any `d.layout` today. Face poisons P8-P10, PR3, PR4, PR6, PR10 arrive with them. The bank already carries HOMES / HOME_PICS / ADAPT / NEEDS / FOOD_PICS and the en face strings (keyed by layout until `alloc-b6var-ids.js` runs).
- F2 needs `habitatTile({w:196})` — gated and legible at 196 (sheet). F5 needs w 639 — gated.
- `animalHome` art is gated but only seen on sheets; the F1/F4 faces must read it at 88 / 76 px on a page (76 is above the 72 floor).
- **Panels:** `names` per locale is required for every animal (rule 1) incl. nicknames a child would write; `tileLabel` 8 literals; decide which label the Antarctic page prints (item 10); pt sets `rainforestRegion:'americas'`; the ocean/pond greyscale margin is the thinnest (2.5): pond identity in mono is carried by the bowl outline + cattails, not by value (tealSoft 230 vs creamDeep 234 grey) — the print check should confirm on paper.
- `i18n/strings.en.json` shows G1-398 already added by another builder's `build-en` run (current instruction text); I did not write the file.
- The walrus on a page with an ocean window is the design's accepted one-per-page case (a walrus swims in the Arctic sea); worth a native-panel glance.
