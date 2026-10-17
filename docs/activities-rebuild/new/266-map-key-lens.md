# New 266 — The Map Key → THE KEY THAT TURNS SYMBOLS INTO THINGS (maps: symbols)

## 0. Identity
- **id** `map-key-lens.play.maps-symbols` (planned key kept: `map-key-lens`) · grade 1 · Social Studies, maps-symbols (framework via `frontend/lib/frameworks.ts`; national maps strands: de Sachunterricht "Karten lesen", sv "kartor och kartsymboler", fi "kartan merkit") · own files `map-key-lens-core.js`, `map-key-lens-activity.js`, `map-key-lens-activity.html`, `map-key-lens-activities.json`.
- **Worksheets covered:** G1-379 "Read the Map Key" (find each thing from the map key on the map, then write how many there are in its box) → FIND & COUNT; its "where on the map" faces → WHERE IS IT.
- **Reused apparatus:** the plan symbols are the reviewed worksheet top-view symbols of `scripts/worksheet-gen/primitives/map-symbol.js` (house, tree, bush, pond, bench, tent — top views, no text, greyscale-safe, the tent's old "X" seam already removed after a native review) re-drawn in the activity's own SVG at ≥ 40 px. They are apparatus geometry (map signs), never drawings of objects.

## 1. The pitch
"On a map, a symbol stands for a thing: pin every symbol the key shows and count your pins — then press Check and the key turns each real symbol back into the thing it stands for, popping up out of the map one by one."

## 2. Why a child will want it again
- **A little town from above.** Paths, a river with a bridge, grass and squares; dotted over it, small map signs — a scalloped circle for a tree, a two-tone roof for a house, a panelled disc for a tent, a blue blob for a lake, a slatted bar for a bench — and a smooth bumpy shape (a bush) that is NOT in the key.
- **Pins.** Tap a key card to pick its pin colour, then tap the map: a pin with a round head drops onto the sign with a tiny *tick*, numbered 1, 2, 3… as you go. Tap a pin to pull it out (the numbers close up). It feels like planning a treasure hunt.
- **The key's magic (the earned show).** On Check, the key "reads" the map: each real sign of that kind lifts off the map and turns into its library picture (a 96 px apple tree pops up out of the tree sign, a tent out of the tent disc), counted aloud on screen 1, 2, 3, 4 — then sinks back into a sign. The map really IS a picture of the town.
- **Bush jokes.** A pin on a bush falls over with a soft *boing* and the bush wiggles: it is not a tree, and it is not in the key.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a map uses symbols; the key says what each symbol means; use the key to find things on the map and count them (G1-379); find a thing by the key AND its place on the map (where-is-it faces).
- **Misconception 1 — "the symbol looks like the thing from the side".** The tent sign is a disc (a tent seen from above), the tree sign a scalloped circle; children look for a triangle. The key pairs each sign with its picture, and the Check turns signs into pictures, so top view = thing.
- **Misconception 2 — similar signs are the same** (tree vs bush; lake vs a round flower bed is NOT used to keep it fair). The bush is the decoy: same green, smooth bumps instead of scallops, not in the key; a pin on it falls over.
- **Misconception 3 — counting the key itself** (the key's sign as one more tree). Pins cannot go on the key: a tap on a key card selects it, and the key's own sign is drawn in a frame with a label, never on the map ground.
- **Misconception 5 — size or shade is the meaning** (the dossier's named misconception, missing from the draft): on every map each kind appears at TWO sizes and in TWO shades of its own colour (a big dark-green tree sign and a small light-green one; a big and a small house) while the key shows one; both count. A child who pins only the signs that look exactly like the key misses some, and miss 1 blinks exactly such a sign. The shapes never change — only size and shade — so the honest rule "same SHAPE = same thing" always works.
- **Misconception 4 — counting a pin twice / losing count.** Pins are numbered as placed, so the last pin's number is the count — and taking one out renumbers.
- **How the material pushes back:** a pin only stands up in a sign of its own key; the key only raises its own kind.

## 4. The stage
**At 704 px (stage 672 × ≈ 560), stacked map-over-key** (a key reads best as a strip under the map, like a printed map):
- **The map** (centre, 448 × 320): a 7 × 5 grid of 64 px cells (grid lines invisible; ground drawn underneath): grass (#CFE7B5), cream paths 22 px wide, a blue river (#8CC8E8) 40 px wide running across between rows 2 and 3 with one bridge (the map-symbol bridge form) — the river is ground, not a symbol. Signs on cell centres at two sizes — 40 px and 56 px — and two shades (the kind's colour at 100 % and at a lighter tint; greyscale contrast kept ≥ 3:1 against the grass), from the reviewed set: house, tree, tent, pond (key word: lake), bench, plus the decoy bush. A thin compass-free frame (no N/E/S/W letters — the camping compass is refused anyway).
- **The key strip** (under the map, 640 × 172): a cream card titled by its shape only (a small key icon, geometry), holding **key cards** side by side — 3 or 5 cards, each 120 × 160: the sign (44 px) in a little framed square, the thing's **library picture** (96 px), the key word (15 px, content), and a **count box** (52 × 40) with − / + buttons (44 px) and the numeral (24 px). The active card (whose pin colour is selected) is raised 4 px with a coloured top band (each key a different pin colour: coral, teal, gold, plum, blue).
- **Pins:** round head 18 px in the key's colour with a white numeral (12 px), on a 2 px needle; drawn over the sign's top-right corner so the sign stays visible.
- **Task line** above the map (≤ 24 px).
- No words on the apparatus except key words and count numerals (content).

**At 360 px:** map 336 × 240 (cells 48, signs 40 px and 46 px — never below the 40 px activity floor; the map-symbol worksheet floor is 36); key strip below as cards 104 × 112 WITHOUT pictures (sign + word + count box, 3 per row; 5 symbols → 3 + 2 rows); a tap-and-hold on a key card shows its library picture as a 64 px pop-up above it. Check at ≈ 640 px (3 symbols) / ≈ 690 (5 symbols → on phones the 5-symbol setting collapses the count boxes into the cards' word line to stay ≤ 650). **320 × 640:** map 300 × 214, signs 40 px (cells 43 — signs fill cells), cards 96 × 104, Check ≈ 600.

## 5. The hand
- **Tap a key card** → it becomes active (raise 80 ms, a soft click); its pin colour is armed. The card's sign gives a single pulse — never the map's signs (no hint by default).
- **Tap a sign on the map** → a pin drops onto it (120 ms, *tick*), numbered next (1, 2, 3…) for the active key. Tap a pinned sign again → the pin pops out (100 ms) and that key's pins renumber in placing order.
- **Pins on any sign are allowed** (the child's judgement); pins on empty ground or the river are refused (the pin bounces back, no count).
- **Count box** − / + → the numeral changes (1–9; never 0 — the box starts empty "–" and + gives 1). The count is the child's answer; pins are working marks (like ticks on paper). There are no hidden gestures: the child reads the last pin's number and sets the box.
- **WHERE IS IT:** no pins; the child taps ONE sign; it gets a ring (selected); tapping another moves the ring.
- **Keyboard:** Tab cycles key cards → map cells (row by row) → count boxes; Enter places/removes a pin; ←/→ in a count box changes it.
- **Free play:** after a solved round, pressing any key card raises all its signs as pictures again (1.5 s) — the child can "read" the map with each key.

## 6. The rounds
Signs per map are placed on authored cells (stored per round so the gate can check them); counts per key are DISTINCT within a map (2–6) so no count can be copied from a neighbour; bushes (0–3) are decoys. **Every kind present appears at both sizes and both shades on every map** (a count of 2 = one big dark + one small light; 3+ adds the mix), so no round can be solved by matching the key's exact look.

### FIND & COUNT, 5 symbols (house · tree · tent · lake · bench) — 9 maps (each a permutation of counts 2–6)
| map | house | tree | tent | lake | bench | bush (decoy) |
|---|---|---|---|---|---|---|
| M1 | 4 | 6 | 2 | 3 | 5 | 2 |
| M2 | 2 | 3 | 5 | 6 | 4 | 3 |
| M3 | 6 | 4 | 3 | 2 | 5 | 0 |
| M4 | 5 | 2 | 6 | 4 | 3 | 2 |
| M5 | 3 | 6 | 4 | 5 | 2 | 1 |
| M6 | 4 | 5 | 2 | 3 | 6 | 3 |
| M7 | 2 | 4 | 5 | 6 | 3 | 0 |
| M8 | 6 | 3 | 2 | 5 | 4 | 2 |
| M9 | 5 | 2 | 3 | 4 | 6 | 1 |
20 signs + decoys ≤ 23 of 35 cells; the bridge and river cells stay free. Trees and bushes are never more than 2 cells apart in maps with bushes (the comparison must be made).

### FIND & COUNT, 3 symbols (house · tree · tent) — 9 maps
| map | house | tree | tent | bush |
|---|---|---|---|---|
| T1 | 3 | 5 | 2 | 0 |
| T2 | 4 | 2 | 6 | 1 |
| T3 | 6 | 3 | 4 | 1 |
| T4 | 2 | 6 | 5 | 2 |
| T5 | 5 | 4 | 3 | 1 |
| T6 | 3 | 2 | 6 | 2 |
| T7 | 4 | 6 | 2 | 1 |
| T8 | 6 | 5 | 3 | 2 |
| T9 | 2 | 3 | 4 | 2 |

### WHERE IS IT — 8 maps (5 symbols present, few of each); "next to" = the orthogonally adjacent cell; "between" = the cell in the same row or column between the two landmarks
| # | the child taps | the asked kind appears | landmark(s) |
|---|---|---|---|
| W1 | the tent next to the lake | 3 tents, 1 next to the lake | 1 lake |
| W2 | the bench next to the house | 3 benches | 1 house |
| W3 | the tree between the two houses | 3 trees | 2 houses (same row, one cell apart) |
| W4 | the tent next to the bench | 3 tents | 1 bench |
| W5 | the lake between the two trees | 3 lakes | 2 trees (same column) |
| W6 | the bench next to the lake | 3 benches | 1 lake |
| W7 | the house next to the tent | 3 houses | 1 tent |
| W8 | the tree between the tent and the bench | 3 trees | 1 tent, 1 bench |
In every WHERE map, the two lures of the asked kind each sit next to a DIFFERENT landmark of a confusable kind (a tent next to a bush; a tent diagonal — not orthogonal — to the lake), so "near-ish" never passes.

- **Answer position.** COUNT: counts are permutations, so no key is always the biggest — counted by the critic: 5-symbol maps give the max to house 2 · tree 2 · tent 1 · lake 2 · bench 2; 3-symbol maps to house 3 · tree 3 · tent 3 (the draft's "≤ 2 of 9" gate is impossible with 3 keys over 9 maps; the gate asserts ≤ ⌈9 / keys⌉); "always guess the middle count" is right for one key per map only; the key-card order itself is fixed (a key is furniture) but the map layouts mirror/rotate between passes. WHERE: the answer sign sits in each map quadrant twice per pass; never in the same cell two rounds running.
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with no count set and no pins** → no miss. Hint: "Tap a key card, then pin its symbols on the map."
- **Check with some count boxes empty** → no miss; the empty boxes wobble. Hint: "Write how many in every box."
- **Miss 1 (the key shows a little):** pins on wrong signs fall over (*boing*) and lie flat beside them; a wrong count box shakes; **one** missed sign of that key blinks twice (if any were missed). Right boxes lock green-edged (they stay locked). Hint: "Some pins fell over — that's not the key's symbol. Look again and count."
- **Miss 2 (stronger):** for each still-wrong key, its real signs rise briefly as their pictures (1.5 s, no numbers) and sink back — the child still does the counting. Hint: "Watch which symbols turn into {plural}. Count them."
- **WHERE miss 1:** the tapped sign rises as its picture; the landmark gets a dotted "next to" frame (its four neighbour cells, or the between cell) — the tapped sign is visibly outside it. Hint: "Look for the {kind} right next to the {landmark}." **Miss 2:** the frame glows and the three signs of the asked kind pulse once.
- A new move takes the help away.
- **Success:** the key's magic — key by key, each real sign rises as its library picture, numbered as it rises (the numerals count up on screen), then sinks; bubble: "The key says what each symbol means: {n1} {plural1}, {n2} {plural2}, …" (3 or 5 entries). WHERE: the answer rises as its picture next to the landmark's picture; "Here it is — the {kind} next to the {landmark}!"

## 8. Settings
1. **Symbols:** 3 / 5 (key cards and map density change at rest).
2. **Task:** find and count / where is it.

## 9. Words (EN source)
- title "The Map Key" (page "Read the Map Key — Map Symbols for Grade 1")
- instructions: COUNT "Use the key: pin each thing on the map, then write how many." · WHERE "Use the key: tap the {kind} {relation}." (whole sentence per round, e.g. "Tap the tent next to the lake.")
- key words (content, from `image-vocabulary.js` labels): house (miscellaneous/house) · tree (the key picture is tree/apple — the word is the generic "tree" authored per locale, since the picture's vocab label is the FRUIT ("Apple" / "Omena"), not the tree) · tent (camping/tent) · lake (camping/lake) · bench (furniture/bench).
- hints and celebrations: §7.
- aria: "Map, row {r}, column {c}: {kind} symbol{, pinned {n}}" · "Key card: {kind}, count {n}" · "Pin {n}".
- settings: "Symbols" · "3" · "5" · "Task" · "Find and count" · "Where is it".
- **Locale traps.** Numerals with nouns: fi partitive after numbers ("4 puuta", "2 telttaa"), pl/sing agreement elsewhere; the celebration avoids "{n} {plural}" assembly in fi by a list form ("puut: 4") — every locale's celebration frame chosen by the reviewer from {"n plural", "plural: n"}. Prepositions with case: de "neben dem See / zwischen den zwei Häusern" (dative), fi postpositions with genitive ("järven vieressä", "kahden talon välissä"), Romance contractions (fr "à côté du lac", it "accanto al lago") — every WHERE task line is authored whole per round per locale, never assembled. "Lake" vs "pond": the key word follows the picture's vocab label (lake / See / lac / lago / meer / sjö / sø / innsjø / järvi); nl "meer" is fine. No compass letters anywhere (camping/compass is refused for printed English N E S W).

## 10. Sound off, access, phones
- Legible with sound off: pins, numbers, falling pins, rising pictures — all visual.
- Keyboard path §5; announcements ("Pin 3 on a tree symbol", "Tree count 4").
- Taps ≥ 44 px (map cells 64/48/43 — signs 40–44 px are drawn with a full-cell hit area; ± buttons 44; key cards ≥ 96).
- Pictures 96 px in the key at 704; phones show the key picture as a 64 px pop-up and in the success rise (64 px).
- Check above the fold at 360 × 740 (≈ 640) and 320 × 640 (≈ 600).

## 11. Distinct from
- **#244 The Rising Camera** (points of view: a camera climbs and objects become their top views) — that teaches WHAT a top view is; this teaches the KEY: symbols stand for things, find and count with it.
- **#036 Bramble's Parking Tower / #211 Toy Box Room** — position words with gravity and lifts; WHERE IS IT uses place only as a map-reading filter.
- **#230 The Search Lens** (frosting what you have searched) — visual scanning; here the search is by a legend, with pins and a count.
- No other map activity exists.

## 12. Build plan
- **Core** `MapKeyCore`: `newRound(row)` → cells `{r, c, kind}`; `pin(state, cell, key)` (refuses ground/river); `unpin`; `pinsOf(state, key)` renumbered by placing order; `setCount(state, key, n)`; `countGrade(state)` → per key `{ok, wrongPins, missed}`; `whereGrade(cell, row)` from adjacency/between computed on the grid.
- **Gate's own truth** (`verify-map-key-lens-core.js`): recounts every map from its cells (its own counter); counts distinct per map and within 2–6; bushes never in the key; the WHERE answer is unique by the gate's own adjacency rule and each lure fails it; no sign on a river or bridge cell; the answer quadrant balance; the key strip never shows a sign on the map ground.
- **Mutations (each killed):** a kind drawn at only one size/shade on a map · a big sign counted and the small one refused · a bush counts as a tree · a pin accepted on the key card · counts accept 0 · the WHERE answer accepts a diagonal neighbour · two keys share a count in one map · the success rise shows a picture for a bush · pins renumber out of order after removal · the count graded from pins instead of the box.
- **Pictures (seen this session):** miscellaneous/house (a cream house with a red roof), tree/apple (an apple tree), camping/tent (red dome tent), camping/lake (a lake landscape), furniture/bench (wooden bench).
- **Risks:** the map-symbol bush and tree must stay distinguishable at 40 px in greyscale (the worksheet gate measured it at ≥ 40 px; the activity keeps 40 px as its floor). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — pins, a little town, and a key that makes the map pop up into real things.
2. **Teacher on the board?** Yes — "what does this symbol mean? how many?" is the whole map-key lesson, with the bush and the top-view tent as the classic traps.
3. **Parent trust?** Reviewed map signs, library pictures, no compass English, no scores.
4. **Invention:** pin the symbols the key shows, and on Check the key turns every real symbol back into the thing it stands for, counting as they rise.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- The dossier's named misconception (size or colour taken for meaning) had no material in the draft — every sign was one 44 px size. Now every kind appears at two sizes and two shades on every map, the key shows one, and miss 1 blinks exactly the look-alike the child skipped; shape alone decides.
- The answer-balance gate was impossible as written for 3 keys (≤ 2 of 9 max-holders); counted both tables and restated it as ≤ ⌈9 / keys⌉ (5 keys: 2/2/1/2/2; 3 keys: 3/3/3).
- Phone sign sizes set to 40/46 px (never below the activity's 40 px floor); mutations added for the size/shade rule. Pictures confirmed in the theme JSONs (miscellaneous/house, tree/apple with the authored word "tree", camping/tent, camping/lake, furniture/bench).
