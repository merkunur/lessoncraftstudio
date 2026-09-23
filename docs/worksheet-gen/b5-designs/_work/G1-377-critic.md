# G1-377 `animal-life-cycles` : EDITOR-CRITIC record (2026-09-23)

Inputs: `_work/G1-377-pedagogy.md`, `_work/G1-377-design-A.md` ("The Ring and the Table"), `_work/G1-377-design-B.md` ("Field-Guide Plate"). Output: `../G1-377-animal-life-cycles.md`. Re-measurements by read-only node and by opening designer B's renders (`scratchpad/G1-377-B-stages.png`, `G1-377-B-zoom.png`, `G1-377-B-plate.png`). No em-dashes.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base = egg-anchored wheel, 3 lettered bank cards, letters into boxes | A: 636 px ring, cards lying in the hub (letters). B: host plant at real scale, tethered lenses, numerals 2-4 + a loop box asking what comes after the butterfly | **B's plate**, merged with A's magnified egg | B is the only concept that ASKS the cycle (loop box: 1 = cycle, 5 = "life is a line") instead of printing the return arrow, keeps scale honest (the lock's quality rule), and gives 4 legal arrangements instead of 1; it also leaves the family with ONE ring (F1), where a ring base would put three rings on the hub with G1-376 F2 |
| 2 | egg height <= 8 % of the leaf | A: true-scale dot + a magnifier lens with an enlarged ribbed egg. B: true scale INSIDE the lens too (7.9 px at 132, 5.4 at 90; "do not enlarge it") | scene at true scale (6 px ringed speck), lens MAGNIFIED (66 units: 30 px at 90, 44 at 132) on a leaf SURFACE, no whole leaf in that lens | I opened B's stage sheet: the egg lens is a speck on a leaf, unreadable as an egg at both sizes. B magnifies every other stage in its lens, so keeping only the egg at true scale was inconsistent. A lens is a magnifier; scale honesty lives in the plate. Gate: magnified egg >= 28 px at 92 |
| 3 | n/a | A: its hub tell rule leaves exactly ONE legal card placement (A chrysalis, B butterfly, C caterpillar) | A rejected for the base | editor re-enumerated: 1 legal assignment (m). A fixed placement is the same page in every locale and every regeneration, a memorisable tell across the catalogue; it is over-constraint, not uniqueness |
| 4 | n/a | B: 7 lens arrangements survive the tell test | **4 survive** (frozen `ARRANGEMENTS`) | editor enumerated all 24 (m): B's reading-order set omitted the bottom-up column and reversed-row reads; on a PLANT, "growing" reads upward, so bottom-up is a real tell. 3 of B's 7 read egg, larva, pupa, adult bottom-up |
| 5 | primitive viewBox 200, stage 72 px floor in F5 chips | A: `MIN_SIZE 72`, recipes never rendered. B: `MIN_SIZE 90`, every recipe drawn and looked at at 260/132/90 colour + grey | **B's recipes, `MIN_SIZE 90`** | measured buildability > preference: B's geometry has been rendered and I opened it; A's is unrendered |
| 6 | F5 8 rows, 2 columns | A: 8 rows in one column at 72 px chips. B: 6 rows, one column, chips 92 | **6 rows** | at the 90 px floor two columns do not fit (420 > 319 per column, arithmetic); 6 meets the G1 item floor [6, 12]; each slot twice |
| 7 | F2 complete wheel with writing lines | A: 2 x 2 square loop, lane under each drawing. B: lettered plate + a separate label card | **A's loop + B's lenses** | the name goes directly under its picture (no letter indirection, which B itself criticised on the base); a distinct look from the base plate on the hub |
| 8 | F1 wheel, glue | A: pentagon of square stations + cut strip. B: pond ellipse of lily pads + square lens tiles | **B's pond ring**; do NOT import G1-376's `cycleRing` (its critic left this to us) | A's pentagon of squares + a 4-card strip is G1-376 F2's page with a frog; B's pads on an ellipse are a different apparatus; importing another family's component couples two families with no shared geometry |
| 9 | F3 d2 6 cards, caps 2/2/2 | A and B: 6 cards | **8 cards (all `YOUNG`), caps 2 / 4 / 2** (the pedagogy's d3 promoted) | 6 < the G2 item floor 8 (brief density); equal caps let the two hardest cards (ladybird larva, pupa) be placed by elimination; 8 cards meet the floor and break the symmetry |
| 10 | chrysalis hangs from a twig | B: lens shows a twig, the plate hangs the pupa under a LEAF | lens substrate = `LEAF_OVER` (a leaf underside), geometry given | one stage, one substrate on one page; the plate and its lens must agree |
| 11 | F4 statement "It spends one stage inside a chrysalis." | A/B copied it | "It spends one stage **as** a chrysalis." | biology: the pupa IS the chrysalis; "inside" is the cocoon misconception in another dress |
| 12 | base instruction 2 sentences (112) | B: 3 sentences (139) | one sentence, 134 chars (m) | brief: ONE sentence <= ~150; B's "number of the picture" guard kept verbatim |
| 13 | meta MIDDLEs 116-142 chars | A/B none | middles 83-90 chars (m) | the whole meta is 120-170 INCLUDING the "Free printable <title> ... <level>." lead (~55-90); a 140-char middle can never be chosen |
| 14 | fr "œuf" Œ glyph UNKNOWN | A/B UNKNOWN | resolved: U+0152-0153 is in the declared `unicode-range` of `nunito-800-latin.woff2` (m `assets/fonts/fonts.css:14`); engineer confirms the rendered glyph | measured, not assumed |
| 15 | modes `base / frog-cut-and-paste / label-the-stages / ...`, layout `glue / label / ...` | A/B same | `coordinate.mode` = the `layout` string (`frog-cut-paste`, `label`, `metamorphosis`, `compare`, `next`) | one string, the G1-376 final's convention; fewer mapping bugs |
| 16 | plate scenery is not the plants family | B: plant outline teal 3 | scenery outline teal **2**, no roots, no soil, no tags | G1-376's base is a teal 3 px plant with coral tags on threads; our tethered plate must read as scenery with lenses in front, not a second plant diagram |
| 17 | F3 head "Metamorphosis" (critic to rule) | A/B kept | allowed | the lock bans the `science-sequence` genre word without an animal; "Metamorphosis" is a different head with en demand ("metamorphosis worksheet") |
| 18 | K-205 inverted caterpillar/butterfly (LIVE defect) | B repeated it | no action here | re-measured: `data/science/baby-animals.json` now stores `left: butterfly, right: caterpillar` (m), fixed in commit f2a3a084 |
| 19 | hub rail name not addressed | A/B not addressed | a species-free `familyName` literal per locale, validator-checked against the `science-sequence` name | the rail shows `axes['exercise-type'].<key>.name`; titles are species-compound, but the family label must exist and must not collide |
| 20 | pt frog noun + spawn | pedagogy: `spawnForm:'string'` knob, no geometry | geometry given (14 spheres on a sine path, all within r 86); default clump; pt only | a panel data decision must not become a code change |

## 2 Claims removed or downgraded as unverified

- B's "7 arrangements" (downgraded to 4, m).
- B's "every stage within r 88" for the pupa: B's twig pupa satisfied it; the relocated `LEAF_OVER` pupa was re-checked (bottom (100,186) = 86 from centre).
- A's clearances in the hub and its `MIN_SIZE 72` legibility claims: withdrawn with the concept (never rendered).
- The pedagogy's F2 Jaccard 0.22 and every other Jaccard in all three inputs remain *est.* (the gate measures).
- The pedagogy's "Œ glyph UNKNOWN" (resolved by the font-face declaration; rendered glyph still for the engineer to confirm).
- F4 fi "two-line rows 72" (A) replaced by B's `minmax(58px,1fr)` stack, minimum 624 <= 677 (arithmetic).
- "Monarch-type butterfly has four legs" risk: kept the `fourlegs` statement (frog only): all butterflies have six legs anatomically; recorded as a panel note, not a claim.

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | re-measured | won |
|---|---|---|---|---|---|
| legal base placements | n/a | 1 | 7 | 1 (A's rule) / 4 (full tell rule) | 4, B's concept with the stricter rule |
| butterfly egg in the lens at 90 / 132 px | <= 8 % leaf | 25 px at 96 (unrendered) | 5.4 / 7.9 px (rendered; opened: illegible) | magnified recipe: 30 / 44 px (arithmetic 66 units) | magnified |
| base stack | 670 *est.* | 656 | 662 | 528 + 18 + 116 = 662 | B |
| F1 stack | 588 *est.* | 602 | 624 | 500 + 16 + 108 = 624; pad centres and gaps re-run (m) | B |
| F2 stack | 629 *est.* | 509 | 635 / 646 | 509 (560 with a 2-row bank) | A |
| F3 stack | 336 *est.* | 395 | 498 | 226 + 30 + 66 + 214 = 536 (8 cards) | editor |
| F4 stack | 638 *est.* | 650 (682 fi) | 672 (624 min) | 624 min, 672 at 722 | B |
| F5 rows / stack | 8 / 436 | 8 / 664 | 6 / 640 | 6 / 640 | B |
| instruction (base, en) | 112 | n/a | 139 (3 sentences) | 134, one sentence | editor |
| meta MIDDLEs | 116-142 | n/a | n/a | 83-90 | editor |
| vocab stage keys | no tadpole/chrysalis/cocoon/larva/pupa/frogspawn | same | same | confirmed (m, `lib/b2-common.js vocab()`: 1,263 keys) | all |
| taxonomy | key absent | absent | absent | absent; 125 exercise-type keys (m) | all |

## 4 OPEN items

1. pt frog noun "sapo" vs "rã" and `spawnForm` (native panel).
2. de base head: "Die Entwicklung des Schmetterlings" (contract default) vs "Vom Ei zum Schmetterling" (re-probe both; panel).
3. sv F2 head "Fjärilens utvecklingsstadier": only "grodans utvecklingsstadier" was harvested (panel re-probe).
4. The rendered Œ glyph in one fr F2 render (the declaration covers it).
5. Tether and spot-ring clearances for the 4 arrangements are computed by the gate on the first render (the geometry is fixed; the sweep proves it).
6. Whether a G1 child reads the ringed 6 px speck as "where the egg is" and the 104 px caterpillar as a caterpillar, not a worm: the engineer's mono print test with one real class, the only check no gate can do.

## 5 Quality verdict

I would print the base for my first graders and I would be proud of it: one calm plate, a real plant with the butterfly's whole life on it, four big magnified pictures, and a last box that tells me in one glance which child thinks the butterfly is the end. What would have embarrassed me was already in the inputs: an "egg" that was a dot nobody could see, a chrysalis that hung from a twig in the lens and from a leaf on the plant, a statement that put the caterpillar "inside" its chrysalis, a meta description that could never fit, and a hub where our frog page was the plant page with a frog pasted in. Those are fixed in the contract. What still worries me is the drawing, not the design: if the caterpillar reads as a worm or the froglet as the grown-up frog at 92 px, no rule saves the page, so the print test with a real class is not optional.
