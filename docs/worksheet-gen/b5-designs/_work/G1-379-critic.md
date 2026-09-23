# G1-379 `maps` : EDITOR-CRITIC record (2026-09-23)

Inputs: `G1-379-pedagogy.md`, `G1-379-design-A.md` ("the park map on the wall", every face a printed map sheet), `G1-379-design-B.md` ("the Island Atlas"). Output: `../G1-379-maps.md`. Rule: measured buildability > preference; the brief > both. Pictures opened by the editor this session: `camping/compass`, `camping/map`, `classroom/map` @3x (contact sheet `scratchpad/G1-379-crit-pics.png`); the pedagogy agent opened those plus `classroom/globe`, `camping/{lake,river,mountain,trail,forest,tent,cabin,pine_tree}`, `miscellaneous/house`, `christmas/church`, `beach/{island,lighthouse}`; A and B opened none (used none). Scratch (all `G1-379-` prefixed): `proj.js` (Natural Earth I extents), `isle.js` (B's island area + slot capacity), `f5crit.js`, `f5b-crit.js`, `f5c-crit.js`, `f5e-crit.js` (F5 feasibility). No render was possible (no primitive exists yet); every px stack is arithmetic from the measured component code.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base: a park plan, key column right, rows below | A: park in a framed sheet, legend docked inside the frame at the right, 5-card count strip. B: an invented island full width, a tabbed key box below, 3+2 rows | **B's island inside A's sheet chrome** (double frame + neat line, legend band INSIDE the frame under the island, north arrow; A's count strip) | the island is a complete place with water on plate 1 (prepares F4's land / sea), is never a street grid (G2-279 fence), is locale-neutral and deterministic; A's chrome is what makes the page read as a real map rather than a worksheet about maps |
| 2 | key column 200 wide | A: legend 172 wide, words 102, title 152. B: key 3 x 2 below, words 145, tab up to 260 | **legend band below the field, 3 x 2, words 134, tab <= 260** | A's 152 px title reserve does not hold da "Signaturforklaring" at 18 px (18 chars x ~8.6-9 = 155-162 *est.*) and a 102 px column wraps most non-EN key words; a band inside the frame keeps A's signature with B's widths |
| 3 | tent = coral triangle | A: dome tent from above (coral disc + white X). B: ridge tent from above (coral / coralSoft halves + guy lines) | **A's dome** | the triangle is a SIDE view on a page that teaches top views (both designers). B's half-split coral rectangle collides in greyscale with the half-split teal house (two-tone rectangles, 0.33 / 0.9 vs 0.12 / 0.9 luminance): the dome is the only disc-with-X |
| 4 | house = square with a diagonal cross (hip roof) | A: solid teal + white ridge. B: gable halves teal / tealSoft | **B's two-tone gable** | the map symbol must BE the F1 house model's top view (`gableY`), and it is the only dark-light two-tone shape in greyscale |
| 5 | bush = 0.6 x tree | A: small blob ~24 px drawn. B: 3-circle clump filling the 44 box | **B** | 0.6 x 44 = 26 px is under the G1 44 floor, and a size difference is a cue that bypasses the key; the near-miss must be carried by outline so the key is what separates them |
| 6 | tree scalloped, no detail | A: scallop ring + ink trunk dot. B: scallop ring + inner texture | **B** | a trunk is hidden under a crown from above (both designers' own F1 rule); a dot would teach a hidden part |
| 7 | bench, flowerBed | A: ink bar with white slats; flowerBed with an outer circle. B: white seat with an ink back bar; dot ring without outer circle | **A's bench, B's flowerBed** | A's bench is the darkest thin bar (unique value); B's flowerBed avoids a fifth circular outline |
| 8 | placed <= 20 | A: <= 20 (40 % density claim). B: placedMax 20, footpaths 0..2, slot capacity UNKNOWN | **d2 placed <= 16, footpaths 0..1** | measured on B's geometry at the in-sheet scale: capacity 29 (no footpath) / 23 (one) / 17 (both); 20 with both footpaths is unbuildable, and the slot gate demands capacity >= placed + 4 |
| 9 | F1 64 px views, "all views fit the same box" | A: 80 px views, 5 rows x 100, stack 640. B: one scale per model, box 96 x 84, stack 680 | **A's frame (rows 100) with B's one-scale-per-model primitive at box 84; stack 652** | B's 680 > 677 (fi 4-line title) fails; one shared scale is honest orthography and keeps the pair provably one object; every view's larger side >= 56 at box 84 (arithmetic from B's solids); width is an honest, mostly uninformative cue (six models are width-limited at 84) |
| 10 | F1 table top with "4 corner dots" | A + B: legs hidden | **hidden** | a table top hides its legs from above; drawing them would teach a false view |
| 11 | F2 2 x 3 at d2 | A: 3 x 2 cards, rose 196, stack 460. B: 2 x 3, rose 216, stack 696 | **A** | B's 696 > 677 fails the fi case; at 196 the letter is 25.5 px and the box 39.2 (G2 floors 22 / 36); slack is whitespace |
| 12 | world map equirectangular, 10° E, crop 75 N | A + B: Natural Earth I, 11° E, crop 84 N | **Natural Earth I, 11° E, 84 N** | equirectangular inflates Greenland and turns Antarctica into a bar; 75 N clips Greenland's north (83.6 N); 11° E puts the seam (169 W) in the Bering Strait between Cape Dezhnev and Cape Prince of Wales (10° E cuts Chukotka) |
| 13 | source "Natural Earth 1:110m, simplified" | A: `ne_110m_land` (+ lakes only for the Caspian), regions by cut polylines + raster flood fill. B: `ne_110m_admin_0_countries` fills + `ne_110m_coastline`, regions by NE `CONTINENT` tags with overrides | **A** | one land layer draws no political border and no anti-alias seam between country fills; the cut-polyline flood fill needs no country attribute table and still needs the Ural / Caspian line either way (B must split Russia and Kazakhstan by it too) |
| 14 | simplify "tolerance by the engineer" | A: DP 0.8 px at 639. B: DP 0.9 units at 1000 (0.58 px) | **0.8 px** | both are under the 1.5 px coast stroke (visually lossless); 0.8 keeps the module smaller; the Hausdorff <= 1.0 px checkpoint is the real guard |
| 15 | crop south: 56 S without Antarctica | A: 58 S. B: 57 S | **58 S** | Cape Horn is 55.98 S: 2° margin; 279.7 px (m) |
| 16 | Arctic anchor north of 70 N | A: in-map anchors (Barents 75.5 N; Southern at -60). B: leaders into two 34 px tag bands outside the map | **leaders, from the projection's CORNER VOIDS (editor)** | measured bands are too thin for a 36 px disc (Arctic water 69-84 N = 23.2 px, Southern -60..-67 = 12.8 px, Antarctica = 31.4 px), so A's in-map polar anchors cannot be built; B's leaders are right but its bands cost 34-68 px and push F3 / F4 past 677. The Natural Earth outline leaves four empty corners (115.9 px wide at 84 N, 143.6 at -90), which hold the tags for free |
| 17 | F3 map + bank + N_loc writing lines | A: stack 641, `cycleLabels` laneW 262, "2 x 316 + 7 = 639". B: stack 706 (tag band + lines) | **laneW 257, laneH 44, gap 15, bank budgeted 2 rows; stack 662** | A's width assumes gap 7 while `cycleLabels` defaults to 15 (2 x 316 + 15 = 647 > 639, m code) and A budgets a one-row bank that does not hold en's 7 names; B's 706 fails the fi case |
| 18 | F5: hidden 3 x 3 lattice, 6 questions, no start twice, exactly one place in the ±45° sector | A: strict < 45° on the lattice. B: measured infeasible; relaxed to >= 4 starts, <= 2 per start, 8° margin, seed search | **three-chip relation: exactly one CHIP within <= 30° of the direction, both other chips >= 90° off; six DISTINCT starts; all 4 directions; seed search on island slots** | B's finding re-measured and confirmed for the whole-sector rule (0 / 4000 random layouts reach 6 distinct starts; max 5; a lattice subset never passes B's relaxed rule either, 0 / 36). But a 1° boundary is not something a 7-year-old can judge, so the clarity margin is the real requirement; with it, the whole-sector rule fails even relaxed (0 / 20,000 at 30 / 60 margins). The child circles a CHIP, so uniqueness only has to hold among the three chips: under that rule 2,256 / 5,000 draws on the island slot lattice pass with the pedagogy's no-start-twice rule restored |
| 19 | F4 writes 12 names | A: atlas index, write the NUMBER (560). B: name rows, write the number (702 with tag bands) | **A's 3-column index** | 12 handwritten names + a map exceed 722 (both measured); F3 owns writing; the numeral answer separates F4's config from F3's; A's index fits at 564 without bands |
| 20 | `Ø Ö Ä` in Baloo 2 | A + B: UNKNOWN | **covered** | `assets/fonts/fonts.css` Baloo 2 700 latin face has `unicode-range: U+0000-00FF` (m); the render gate still measures the letter boxes |
| 21 | F5 rose "in a corner of the plan" | A: rose 120 on the right of the sheet. B: rose 96 in the island's top-right sea | **rose 96 OUTSIDE the plate, right margin (533 + 10 + 96 = 639)** | at w 533 the island's top-right sea is ~33 px wide (coast at viewBox x 548-596): a 96 px rose would sit on land |
| 22 | base title "Map Skills: Read the Map Key" with rail "Map Skills" | none | **type name "Map Skills", base title "Read the Map Key"** | the pedagogy's own flag; the base owns the map-key head, the rail names the family |
| 23 | F5 instruction "Circle the place you find there" | A + B: same | **"... Circle the one of the three pictures that lies that way."** | the construction (row 18) makes the chips the answer surface; the old sentence invited circling on the map, where other places may lie in the same direction |
| 24 | boundary: treasure-hunt `compass` | none named `cardinal-arrows` | **both modes fenced** | `axes['exercise-mode']['cardinal-arrows']` (Up/Down/Left/Right) is live in all 11 locales (45-48 landings each, m); no face uses up / down / left / right |

## 2 Claims removed or downgraded as unverified

- A's "Europe ≈ 62 px wide" (an equirectangular estimate): replaced by the Natural Earth I measurement, 108.9 px at 50 N; the gate band is 95..125 px.
- A's in-map Arctic (Barents, 75.5 N) and Southern (-60) anchors: removed (bands measured too thin, row 16).
- A's "20 symbols = 40 % density, sampling feasible" and B's "slots >= 30": downgraded; B's own geometry holds 17-29 slots at the in-sheet scale depending on footpaths (row 8). The engineer re-measures on the committed slot file.
- B's F5 "133 / 20,000 feasible under the relaxed rule with an 8° margin": not reproduced (my margin reading, applied to every non-answer place, gives 0); moot, since the chip rule replaces it.
- B's "F3 706, F4 702 <= 722" were true at 722 but FAIL the 677 fi case B itself flagged; both re-laid out (rows 16, 17, 19).
- A's F3 "2 x 316 + 7 = 639": the component's default gap is 15; corrected with laneW 257.
- The pedagogy's "Antarctica drawn iff in set, crop 75 N" and "anchors >= 26 px": crop corrected (row 12); markers stay 36 px with 20 px numerals (G2-G3 element floor 36).
- All title / meta lengths and Jaccards remain *est.* (the gates measure). Europe's anchor clearance (~17 px) is *est.*: no Natural Earth data is in the repo (A measured; the editor did not download it).

## 3 Numbers re-measured (which won)

| number | input(s) | re-measured | winner |
|---|---|---|---|
| NE I scale at 639 | B 116.80 | 116.803 px/rad | B |
| map height with / without Antarctica | A 328 / ~280 (58 S); B 327.6 / 277.8 (57 S) | 327.6 / 279.7 (58 S) | A's crop, B's number style |
| Europe width 10 W..60 E at 50 N | A ~62; B 108.9 | 108.9 | B |
| polar bands | B: Arctic 18, Southern 14.9, Antarctica 34.9 | Arctic 69-84 N 23.2, 70-84 N 21.4; Southern -60..-67 12.8; Antarctica -67..-90 31.4 | B's conclusion (no disc fits) |
| corner voids | none | 115.9 px at 84 N, 79.0 at 70 N, 39.6 at 50 N; 143.6 at -90, 79.0 at -70 | editor |
| island area | B: none | 148,133 units² | editor |
| island slot capacity (44 px at scale 0.961) | B: UNKNOWN (gate >= 30) | none 29 · P1 23 · P2 23 · both 17 (at scale 1: 31 / 26 / 23 / 18) | editor (d2 caps) |
| F5 whole-sector rule, 6 distinct starts | ped: feasible; B: infeasible | 0 / 4000 per region (max 5 starts); lattice 7-of-9: max 4 starts, relaxed 0 / 36 | B |
| F5 chip rule, 6 distinct starts, 4 dirs | none | 2,256 / 5,000 on island slots at F5 scale (18 slots) | editor |
| base stack | A 588 (side legend); B 651 | sheet 12 + 346 + 8 + 146 + 12 = 524; + 20 + 112 = 656 | editor |
| F1 stack | A 640; B 680 | 40 + 12 + 500 + 88 + 12 = 652 | A frame |
| F2 stack | A 460; B 696 | 460 at minimum rows | A |
| F3 stack | A 641; B 706 | 332 + 12 + 118 + 200 = 662 | editor |
| F4 stack | A 560; B 702 | 332 + 16 + 216 = 564 | A |
| F5 stack | A 670; B 656 | 300 + 14 + 312 + 30 = 656 | B |
| `cycleLabels` item width | A 316 x 2 + 7 | chip 44 + 10 + laneW, default gap 15 (`weather-symbols.js:245`) | code |
| Baloo 2 Ø Ö | A + B UNKNOWN | latin face `U+0000-00FF` (`fonts.css`) | editor |
| treasure-hunt compass landings | ped 374 (8 locales) | pt 43 · fr 45 · it 47 · nl 48 · sv 48 · da 48 · no 48 · fi 47; en / de / es 0 | ped |
| treasure-hunt cardinal-arrows landings | none | en 48 de 48 es 46 pt 45 fr 48 it 47 nl 48 sv 48 da 48 no 48 fi 47 = 521 | editor |
| compass-mode names | ped | en "Compass Directions", de Himmelsrichtungen, fr Points cardinaux, ... (taxonomy) | ped |
| `apps.maps` / axis | all: absent | absent; 125 keys | all |
| `LEVEL_KEYS` | all | `gen-b3-landings.js:98-110`; no K = `1-trinn` | all |
| type slugs x11 | none | 0 exact collisions against every `axes.*.*.slug` | editor |
| opened pictures | ped | compass = baked English N E S W; camping map = side-view trees + red pin; classroom map = colour-coded continents | ped |

## 4 OPEN items

1. Subject bucket (`spatial-reasoning` default vs a future social-studies subject): `_PANEL-FINDINGS.md` open item 1, decided at Phase C with a measurement of what a sixth subject renders.
2. The NEW strand row in `strand-names.ts` (per-locale literals, table B; da "Natur/teknologi" vs a samfundsfag literal is the panel's call).
3. Each locale's continent set and count (es 5 / 6, fr 5 / 6, it 5 / 6, nl 6 / 7, fi 6 / 7), "Australia" vs "Oceania", the ocean set (de 3 vs 5, en 4 vs 5), each with a cited `setSource`.
4. Whether `ne_110m_land` carries the Caspian as a hole (engineer; fallback: punch it from `ne_110m_lakes`).
5. Europe's real anchor clearance and the Pacific twin positions (engineer, from the data; *est.* ~17 px).
6. The island's real slot capacity and the F5 seed-search hit rate on the committed slot file (engineer; the editor's numbers are a reconstruction of B's geometry).
7. es-MX este / oeste vs oriente / poniente (panel; the page uses the pair whose initials are the rose letters).

## 5 Quality verdict

Yes, I would print this for my class, and I would print the whole set in order: our island, the things seen from above, the rose, the directions on our island, then the world. What sells it is that every page looks like a real map, not a worksheet about maps: a framed sheet with its legend inside the frame, an arrow with our own N letter, land and water, and not one clip-art picture drawn from the side. The base is honest work for a six-year-old: the key is the only way from the word to the symbol, and the tree / bush pair makes a careless reader count wrong in a way I can spot in two seconds. What would have embarrassed me is exactly what this merge removed: a tent drawn as a triangle on a page that preaches "from above", a table with its legs showing through its top, an English "N E S W" compass on a Finnish sheet where E means south, a world map with Greenland sliced off and Antarctica stretched into a bar, and a directions page where "the place to the east" was really two places, one of them a degree off the line. The one thing I will still check on paper is the world map at 639 px: if Europe's disc sits on the Ural line or New Zealand vanishes on a cheap printer, the page goes back.
