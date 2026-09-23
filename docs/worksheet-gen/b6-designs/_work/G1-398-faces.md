# G1-398 `habitats` — the five faces (Phase E, 2026-09-23)

Contract: `G1-398-habitats.md` §3 + `_FACE-BRIEF.md`. All five are **CODE** faces on ONE additive knob `layout` in `types/g1/G1-398-animal-habitats.js` (`_buildFace` / `_composeHomes|Odd|Adapt|Needs` / `_verifyFace`; `_buildWith` dispatches on `d.layout`, the base path is untouched). Rows: `scripts/worksheet-gen/tools/b6var-rows/habitats.js` → `node tools/gen-b6var-specs.js` (emitter NOT edited: it already skips absent families — "10 faces from 2/5 families"). New components appended to `templates/components-b6/habitats.js` (`hbGap hbPlaque hbHomeMatch hbStrangerRow hbAdaptBank hbAdaptRow hbNeedsHead hbNeedsRow hbReport`). Nothing committed.

## Per face
| id | layout · row override | what the child does | PNG (d2 en) |
|---|---|---|---|
| **K-383** Animal Homes (K) | `{layout:'homes', pairs:6, pic:80, homePx:88}` | draws a line from each of six animals (bird, bee, spider, rabbit, ant, beaver) to the DRAWN cut-away home it builds or uses; no word anywhere | `scripts/worksheet-gen/out/dev/K-383-null-d2-en.png` |
| **G1-406** Who Does Not Live Here? (G1) | `{layout:'odd', rows:4, perRow:4, winW:196, pic:76, nearPairs:1}` | four habitat windows, each beside three residents + one stranger from a FAR habitat; crosses the stranger out | `…/G1-406-null-d2-en.png` |
| **G2-380** How Animals Adapt (G2) | `{layout:'adapt', items:6, bank:7, pic:64, textPx:17, maxLines:3}` | reads six body-feature sentences, writes the letter of the one bank animal each is true of (one decoy) | `…/G2-380-null-d2-en.png` |
| **G1-407** What Animals Need (G1) | `{layout:'needs', rows:4, foodPair:true, homePair:true, pic:84, chip:96}` | for four animals circles its food and its home; every distractor is ANOTHER row's need this animal never uses; water taught once in the head line | `…/G1-407-null-d2-en.png` |
| **G2-381** My Habitat Report (G2, open) | `{layout:'report', animalRows:3, plantRows:1, chipPairs:2}` | draws three animals into one big empty window (the locale's `sets.base[0]`, en = ocean), writes their names and a plant, circles hot/cold, wet/dry | `…/G2-381-null-d2-en.png` |

Greyscale and worst-chrome (fi-length, body 667) renders: `out/dev/<id>-null-d2-en-grey.png`, `out/dev/<id>-null-d2-en-fi677.png` (all five read by me; montages in the session scratchpad `G1-398-grey-montage.png`, `G1-398-fi677-montage.png`). All fit at 667 and fill 93–100 % at the 811 one-line body; nothing under the footer.

Gate assertions each face owns (qa/b6-habitats-faces.js, called by qa/verify-b6-habitats.js):
- **F1** bijection with HOMES, every right item an `animal-home` svg (no `<img>`), no word at all, derangement + not reversed + no rotation (on every page), home-in-row share 13.3–21.5 % pooled 400 (16.7 ± 6), pictures ≥ 80 / homes ≥ 88 measured. Poisons: PR3 rotation, SP/FL, P15 (bank rule 8), IA (instruction "write the letter").
- **F2** row oracle (residents live there; polar row = the Arctic trio; stranger single-habitat, from FAR, not a near pair, not the row), no Arctic+Antarctic, look-alikes, no duplicate animal, stranger place never repeated in consecutive rows / ≥ 3 distinct / not monotone; pooled column share 24.4–25.3 %. Poisons P9 (elephant = multi), P10 (penguin in the Arctic row), PR4 (always place 3), SP/FL.
- **F3** claim oracle (each sentence true of EXACTLY one bank animal and that animal is one of the claim's `answers`), decoy in no page claim and never letter A / last, answers never in bank order, sentence text === bank literal, ≤ 3 lines, box 56 × 48 empty, no animal name printed; max row-letter cell 19.8 % pooled. Poisons P6, P7 (bank rule 6), P8 (duck-feet with duck AND swan).
- **F4** one correct food + one correct home per row, distractor ∈ never-list AND another row's need, food chips are food pictures, home chips are the primitive, correct side never constant / strictly alternating; pooled left share food 51.4 %, home 51.2 %. Poisons PR6 (correct food always left), P11, P12 (bank rule 7), IA (instruction "toy").
- **F5** `data-lcs-open`, the window is the tile primitive of a `sets.base` habitat, no picture on the page, ≥ 4 writing lanes, pills ≥ 48 and === the bank words. Poison PR10 (an animal picture in the window).
- All: SPARSE (every band between vertically overlapping `data-lcs-block`s ≤ 40, top band ≤ 40) and FILL (≥ 85 % at the 814 chrome, inside at 677), each poisoned both ways per face (SP = a 150 px band, FL = every band closed at 814); refusal (bank `refuse:[layout|id]` THROWS; unauthored `de` REFUSES); no shipped row carries a `force*` seam; the rendered instruction === i18n.en.

## Deviations from §3 (measured)
1. **F2 cards are a 2 × 2 grid beside each window, not a row of four.** A row of four 96 px cards caps a row at ~114 px (window 196 + 4 × 96 + gaps = 639): 4 × 114 + 3 × 40 = 576 = 72 % of the 811 body — the FILL rule (≥ 85 %) is unreachable by construction. The 2 × 2 grid lets each row grow with the body (rows `minmax(150px,1fr)`, a size container): the window grows to a 132 px-high tile (~291 wide at 811; 196+ at 667 — the gate asserts ≥ 196) and the pictures to ~88 px (at 667 ≈ 60 px; the design's 76 is not reached at the four-line chrome, G1 floor 44 held and asserted ≥ 56). Stranger "column" becomes place 1–4 (reading order); the rules are unchanged.
2. **F1 items stretch** (130 wide, 100–130 high, art sized by container units) instead of 120 × 92 fixed: FILL; measured pictures ≥ 88 and homes ≥ 92 at 667. Gap 10 (design 14): 6 × 100 + 5 × 14 + 12 = 682 > 667.
3. **F3 rows are fixed 80 px strips with flexible ≤ 40 px bands; bank cards 120 high, pictures 76** (design 104 / 64): FILL at 814.
4. **F4 rows are 132 px creamDeep strips with flexible bands; chips 108 (design 96), animal card 108**: FILL at 814; strip width budget 12 + 108 + 16 + 226 + 24 + 226 + 12 = 624 ≤ 639.
5. **F5 lanes stacked full width (3 × 639) instead of side by side (3 × 203)**; flexible bands between blocks: FILL (side by side the page ended at ~64 % of the 814 body); more writing room per name.
6. **Claim table** (hand-read, conservative): `fish-gills` trueOf + octopus, crab (they breathe with gills too); `toucan-beak` trueOf + macaw (a macaw also picks fruit with a big beak). New `answers` field: the animals a claim may be ASKED about (`fish-gills` → clownfish/shark/ray, `toucan-beak` → toucan), trueOf stays the exclusivity set. Found by reading the first F3 render: the toucan claim had been answered by the macaw.
7. **`oddRow` field** on narwhal + white seal (F2 Arctic row only) — the design's rule, as data.
8. **Lodge redrawn** (v1 read as a haystack at 115 px on the F1 page): a heap of teal-rimmed logs, several poking out, standing in wide open water, the dry chamber and the underwater tunnel. `verify-animal-home.js` still PASS.
9. Bank `strings` now keyed by the allocated ids (K-383, G1-406, G2-380, G1-407, G2-381); validateBank rule 10/12 map id → layout.

## Refusals visible from the bank shape
None for any face in any locale at design (§7: 66 rows). Per-item data drops only: F3 needs 6 of 13 claims (`refuseClaims`), F4 needs 4 of 5 animals. pt: `rainforestRegion:'americas'` must be set in the pt block (no apes on any face; F2 rainforest row = sloth, toucan, macaw exactly). If the pt panel drops Polo (OPEN 3), F2 has 3 rows (`min(rows, set.length)`) — still a face; a set of < 3 members would refuse F2.

## Open items for the panels
- F2 row labels use `tileLabel` (the Arctic row `tileLabel['polar-arctic']`); F5 plaque `tileLabel[sets.base[0]]` (Baloo 20, max 360).
- F4 head line + two column heads must fit one line each (gated: `the head line does not fit one line`).
- F1 is wordless: the K title carries the home words; no home word is printed on any page.
- rabbit neverHome includes `nest` (the drawn nest is a bird's nest on a branch); the panels may flag "a rabbit makes a nest" — it is the design's hand-read table.

## Proof lines
- Base byte-identity (G1-398 d1/d2/d3 en + the fi-length 677 chrome render saved BEFORE any edit, re-rendered after): `d1 en IDENTICAL · d2 en IDENTICAL · d3 en IDENTICAL · chrome677 (fi-length) IDENTICAL · fi refusal IDENTICAL` (md5 33117944… / 00c00f58… / 67c5abab…; fi has no bank block, the refusal message is unchanged).
- Distinctness: `node tools/gate-variation-distinct.js --batch=b6 --diffs=2 --family=habitats` → `[b6:habitats] compared 15 pairs over 5 faces against their bases + pairwise within family` / `every variation differs from the deck its base publishes and from its siblings`.
- Baseline: `node tools/b3-baseline.js --check --quick` → `checked build 3940 + enum 299 in 23s: 0 drifted (0 expected), 0 missing` **PASS**.
- `node i18n/build-en.js` → `733 types … (title lint clean)` (strings.en.json regenerated as the brief says).
- Family gate: see below.
- Family gate (full, with sweeps): `node qa/verify-b6-habitats.js` → **PASS (5058 assertions, 41/41 poisons killed)** (22 base + 19 face poisons: P8 P9 P10 PR3 PR4 PR6 PR10, 2 × IA, 5 × SP, 5 × FL); render sweeps 10 seeds per face, 10 distinct pages each (F5 is open and deterministic per locale: 1 distinct by design). Primitive gates re-run after the lodge redraw: `verify-animal-home.js` PASS (57, 3/3), `verify-habitat-tile.js` PASS (1320, 3/3).

## Round 2 — the lead's G1-406 defect + the generalist audit (2026-09-23)
**Defect (lead):** the G1-406 Rainforest row showed gorilla · parrot · orangutan · **butterfly** as the stranger. Butterflies live in rainforests: no single stranger, and a child crossing the butterfly would be right and marked wrong. Root cause was DATA (`butterfly lives: ['meadow']`), and it was a class, not one animal.

**Generalist audit of the claim table** (every insect, bird and wide-ranging mammal, read as a K-3 teacher answers "does it also live there?"; recorded in `data/b6/habitats.js` above ANIMALS):
| animal | lives before | lives now |
|---|---|---|
| butterfly | meadow | meadow, forest, rainforest, savanna, pond |
| bee | meadow | meadow, forest, rainforest, savanna |
| ladybug | meadow | meadow, forest |
| grasshopper | meadow | meadow, savanna |
| woodpecker | forest | forest, rainforest |
| deer | forest | forest, meadow |
| badger | forest | forest, meadow |
| frog | pond (+ notWithWindow rainforest) | pond, rainforest (the honest `lives` entry replaces the rule) |
Kept narrow, with the reason: dragonfly, duck, swan, heron = pond (but `noStranger`: a dragonfly hunts over every wet meadow and waterhole; water birds live wherever there is water, swans breed on the Arctic tundra, herons fish in savanna and rainforest waters); beaver = pond (the lodge stands IN the pond; widening it to forest would leave the es base (selva, bosque, mar, lago) with no pond animal); squirrel forest; ostrich / lion / zebra / giraffe savanna; sloth / toucan / macaw / gorilla / orangutan rainforest; the sea animals ocean. New field `kind: 'insect' | 'bird'` names the generalists.

**Rules added (code + gate):**
1. **F2 stranger:** EVERY habitat it lives in must be in the row's FAR list (was: its one habitat), it is single-habitat, it is never an insect, never `noStranger`. Oracle message names a generalist ("a generalist insect"). Poisons **PG** (the lead's page: butterfly as the Rainforest stranger) KILLED, **PF** (zebra = savanna, not far from a meadow row) KILLED, **PH** (heron as a savanna stranger) KILLED. The 400-seed sweep asserts 0 not-far strangers and reports the generalist strangers used: only birds whose whole range is far (penguin, ostrich, toucan, macaw); 0 insects.
2. **F2 residents:** a resident stands only in its PRIMARY habitat (`lives[0]`; the Arctic trio excepted) — seed 3 had put a badger and a deer in the Meadow row, where a child may take a forest animal for the stranger. Poison **PS** KILLED.
3. **Base:** an animal answers only through its PRIMARY habitat (a ladybug is never sent to the forest window because the meadow is missing; the d2 render had a woodpecker answering "rainforest"). Oracle + composer; poison **PP** KILLED. P4 now fails for the honest reason (`frog: lives [pond,rainforest] meets 2 windows`).
4. **Pre-existing bug found by the new locale-set sweep:** F2 applied the ≤ 1 near-pair cap to a FIXED set too, so es (selva + bosque AND mar + lago) could never compose (0 / 200). The cap now applies only when rows are sampled from a larger set, as the base already did.
5. **Locale-set sweep** (gate, 200 seeds each, the en block with each §1 set swapped in): de/sv/da/no/fi, es, pt (Amazônia + americas region), pt without Polo — base AND F2 legal on every seed after the widening; the table prints the fewest animals any window gets.

**Base re-check.** F3 (claims use `trueOf`) and F4 (the NEEDS table) do not read `lives` — unchanged. With the primary-habitat rule the base's d1/d2/d3 en pages are **the same pages as the accepted base**: d2 is byte-identical to the pre-edit snapshot; d1 and d3 differ ONLY in the `data-lcs-lives` ground-truth stamp (deer / badger / frog / woodpecker now carry their widened lists) — the windows, animals, letters and positions are identical (diffed). Re-rendered and re-read: `out/dev/G1-398-null-d{1,2,3}-en.png`.

**G1-406 re-rendered and READ** at seedEpoch 1 (shipped) + 2, 3, 4 — every row has exactly one far stranger and only primary residents:
- s1 Arctic [walrus narwhal seal] x macaw · Ocean [ray octopus starfish] x lion · Pond [swan beaver duck] x sloth · Rainforest [orangutan toucan gorilla] x dolphin — `out/dev/G1-406-null-d2-en.png` (= `-s1.png`)
- s2 Meadow [grasshopper ladybug butterfly] x gorilla · Pond [beaver swan heron] x ostrich · Ocean [crab clownfish whale] x macaw · Forest [squirrel badger deer] x dolphin — `out/dev/G1-406-null-d2-en-s2.png`
- s3 Arctic x sloth · Savanna [zebra lion ostrich] x dolphin · Pond [duck swan heron] x macaw · Meadow [butterfly bee ladybug] x orangutan — `out/dev/G1-406-null-d2-en-s3.png`
- s4 Savanna [giraffe zebra ostrich] x dolphin · Meadow [grasshopper ladybug bee] x orangutan · Arctic x macaw · Rainforest [toucan sloth gorilla] x whale — `out/dev/G1-406-null-d2-en-s4.png`
Panel note: the dolphin as a Rainforest / Savanna stranger is honest for the picture (a sea dolphin); the Amazon river dolphin exists — a panel may prefer to bar it from the rainforest row.

**Round-2 proof lines:** distinct `every variation differs from the deck its base publishes and from its siblings`; baseline `checked build 4000 + enum 299 in 26s: 0 drifted (0 expected), 0 missing` PASS; primitives PASS (57, 3/3) and (1320, 3/3); family gate — see the final line below.
- Base tells re-measured after the widening: at n 400 one cell read "forest is letter B 35.0 %" — sampling noise (a habitat drawn on ~60 pages, 28 cells); the sample was RAISED to n 2000, never the ± 8 threshold: per-position max |dev| 2.4 points, habitat → letter max |dev| 4.2 points.
- **Family gate (full, round 2): `node qa/verify-b6-habitats.js` → PASS (5059 assertions, 46/46 poisons killed)** (round 1's 41 + PF, PG, PH, PS, PP).

## Round 3 — cetaceans never the Rainforest stranger (lead ruling, 2026-09-23)
Brazilian children know the boto cor-de-rosa (the Amazon river dolphin), so a dolphin "stranger" in an Amazônia / selva / Rainforest row has two defensible answers. One global rule (cheaper than per-locale): new data fields `cetacean: true` + `notStrangerIn: ['rainforest']` on whale, dolphin and narwhal; the F2 composer skips them for a rainforest row and the row oracle fails "`<x>` is never the stranger of a rainforest row (a cetacean: the Amazon river dolphin lives there)". Poison **PD** (dolphin as the Rainforest stranger) KILLED; the 400-seed sweep asserts 0 cetacean rainforest strangers.
Re-rendered and READ: shipped `out/dev/G1-406-null-d2-en.png` (= `-s1`) — Rainforest [orangutan toucan gorilla] x **shark** (was dolphin); `-s2` Forest x dolphin, `-s3` Savanna x dolphin (neither a rainforest row); `-s4` Rainforest [toucan sloth gorilla] x **octopus** (was whale). Every row one far stranger, only primary residents; lints clean, verify clean.
- **Family gate (full, round 3): `node qa/verify-b6-habitats.js` → PASS (5060 assertions, 47/47 poisons killed)**; locale sets de/sv/da/no/fi, es, pt, pt-without-Polo: base 200/200 + F2 200/200 legal.
- Distinct: `every variation differs from the deck its base publishes and from its siblings`.
- Baseline: `checked build 4000 + enum 299 in 24s: 0 drifted (0 expected), 0 missing` → PASS.
G1-398 Phase E is DONE.
