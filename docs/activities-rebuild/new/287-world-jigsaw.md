# New 287 — The Globe That Pours Into the Map (Social Studies · continents and oceans)

## 0. Identity
- id `world-jigsaw.play.continents-and-oceans` · grade 2 (the grade-3 "World Jigsaw" row is merged in as the *Continents and oceans* setting) · Social Studies — geography: name and locate the continents (and the five oceans) on a world map (framework entry via `frontend/lib/frameworks.ts`) · strand Social Studies · files `mini tools/world-jigsaw-core.js`, `world-jigsaw-activity.js`, `world-jigsaw-activity.html`, `world-jigsaw-activities.json` + one generated geometry module `mini tools/world-geo.js` (§12). Title: **"The Globe and the Map — The Continents"** (the key stays `world-jigsaw`; the instrument is not a jigsaw — see §11).
- worksheets it covers: **G2-370** Label the Continents (write the name of each numbered continent, names in a box) → *Name it* mode; **G3-396** Continents and Oceans (find each continent and ocean, write its number by its name) → *Find it* mode with the *Continents and oceans* set. Merged grade-3 row: "locate the seven continents and five oceans" → the same setting.
- new instrument (no old activity). It reuses the shipped, opened, native-signed printable data: the Natural Earth 1:110m world (public domain) already projected and region-tagged in `scripts/worksheet-gen/data/b5/world-map.js` (47 rings tagged northAmerica · southAmerica · europe · asia · africa · oceania · antarctica, the Europe/Asia cut, label anchors, ocean anchors), and each locale's continent SET and names in `data/b5/locales/maps.<loc>.json`.

## 1. The pitch
"A real globe turns to show you one continent glowing — find the same land on the flat map, and the globe pours its colour down into it; give a continent the wrong name and the globe spins round to show you where that name really lives."

## 2. Why a child will want it again (the fun)
- **A globe you can spin with a finger.** Top-left sits a round globe (drawn from the real coastlines in an orthographic view, blue sea, sand land, a soft highlight and shadow). Drag across it and it spins with inertia and a gentle tick of an axle; drag up/down to tilt it (±35°) and peek at the poles. It is the classroom globe children always want to touch.
- **The pour.** When the child taps the right continent on the flat map, a ribbon of that continent's colour arcs out of the globe and pours into the flat map's outline, which fills from the bottom up (500 ms) with a liquid *glug*; its name tag then floats down and settles on it. Wrong: the colour splashes on the wrong land and runs off it in drips (no shame sound, just a soft *plip*).
- **The peel band.** While the globe turns, a soft light band slides across the flat map showing exactly the part of the world the globe is showing — the child literally sees that the flat map is the globe unpeeled. The Pacific shows up at BOTH edges of the flat map and lights at both edges when the globe faces it.
- **End-of-pass show.** When every continent has been found once, all of them pour in at once in their colours, the names settle, and the globe makes one slow full turn while the peel band sweeps the whole map from left to right and wraps round.
- **Free play.** Between rounds the globe spins freely; tapping any land on the globe lights the same land on the map (and the other way round).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** name the continents (7, or the locale's own set — §9) and find each one on a world map; in the grade-3 setting also name and find the five oceans. Underneath: a flat map and a globe show the same Earth.
- **Misconception 1 — North and South America swapped (and "America" as one blob).** Pushback: the globe always shows the asked continent from its own side (North America with the North Pole above it, South America with the equator above it), and a wrong tap on the other America makes the globe tilt to show the tapped one in its place below/above with the equator drawn as a gold line between them. In the six-continent locales (America as one continent, §9) both halves pour together — the child sees why their school calls it one.
- **Misconception 2 — Europe and Asia confused.** Pushback: on the globe Europe is the small coloured western end of one big landmass; tapping Asia for Europe splashes on Asia, and the miss-2 help draws the Europe/Asia line (the data's `cuts.europeAsia`) as a dashed boundary on both globe and map.
- **Misconception 3 — Australia is "only a country".** The locale names the continent its schools use (en *Oceania*, region = Australia + New Zealand + New Guinea, per the en panel; de *Australien*). The globe shows the whole region glowing, islands included, so the continent is visibly more than one country's shape.
- **Misconception 4 — the map and the globe are different worlds** (the Pacific "is two oceans"). The peel band and the two-edged Pacific pour make the link concrete.
- Not a shape-matching task: the globe's view distorts shapes (orthographic) and the flat map's are Natural Earth I, so the child must recognise a continent by WHERE it is and what it touches, not by tracing an identical outline.

## 4. The stage
`layout:'split'` at ≥ 700 px.

**At 704 px**
- **Globe** (top-left of the stage, 250 × 250, drawn): ocean `#7FB8DD`, land sand `#E9D9B0`, the asked continent in its colour, 2 px ink coast for the glowing continent only, a terminator shadow on the lower right, a soft white highlight top-left; a thin gold equator line. A drawn axle stand (two arcs and a foot) under it.
- **Flat map** (right of / below the globe, 470 × 206 — the world-map aspect 2000 : 875): ocean blue, land sand, every continent outlined 1.5 px; NO names, NO numbers in Find mode; Antarctica as the white band at the bottom. Hit areas: tapping land selects the continent region of that ring; small islands select their continent; any tap on water in a continents round is ignored (no miss).
- **Name tags / name bank:** Find mode — the asked continent's NAME is shown on a tag under the globe (Baloo 2, 22 px) — the child learns name + place together. Name mode — the name bank: all of the locale's continent tags (+ ocean tags in that set) in a row/grid, 120 × 44 each, Nunito 18 px; the target continent on the map glows with a number disc (40 px).
- **Found row** (bottom, 40 px): one coloured chip per continent found this pass (drawn chip with the name, no position).
- **Animal helper** (miss help only, §7): one library picture 96 × 96 appears on the globe panel.
- **Task line (≤ 24 px):** Find "Find {name} on the flat map." · Name "What is the glowing place called?"
- **The globe glow fades out by pass (Find mode).** Pass 1: the globe turns to the asked place AND glows it, so the child learns name + place together. From pass 2 on, the globe turns to a neutral view (0°, +10°) with every land plain sand; only the NAME asks (G3-396 is "find each continent from its name") — the glow becomes the miss-1 help. The found-row chips carry over between passes so the child sees the switch is earned.

**At 360 px** (stacked): globe 170 × 170 centred; flat map 340 × 149 (continents remain tappable: each continent's hit area is its land PLUS a 14 px snap halo, resolved to the nearest continent label anchor, so Europe — ~36 px wide at this size — still gives a ≥ 44 px target); name bank 2 columns of 160 × 44. Animal helper 64 × 64 beside the globe. Check bottom at 360 × 740: header 56 + task 52 + globe 178 + map 157 + bank (4 rows × 52 = 208) + Check 52 → 703 ≤ 740; at 320 × 640 the bank becomes 3 columns of 100 × 44 (Nunito 16, names wrap to 2 lines in fi/es) → ≤ 636.
- Everything on the board is drawn geometry from public-domain coastline data; the only library pictures are the animal helpers and the intro cue space/earth (96 px on the start card). Names are the content.

## 5. The hand
- **Spin the globe:** drag horizontally = longitude (1 px = 0.6°), vertically = tilt (clamped ±35°); release keeps spinning with friction (decay 0.92 per frame); a soft axle tick every 30°. Keyboard: arrow keys spin 15°. Spinning is free and never a move.
- **Find mode — tap the flat map:** the tapped continent outline thickens to 3 px and gets a faint wash (120 ms); tap another to change; Check pours (§7). Keyboard: Tab cycles the continents on the flat map in west→east order (aria announces "a continent" — no names), Enter selects.
- **Name mode — choose a name:** drag a tag onto the glowing continent or tap a tag (it lifts and flies to the number disc, 200 ms). Tap the docked tag to send it back.
- **Oceans (setting):** a water tap selects the ocean basin under the finger (basin map §12); the whole basin washes faintly — the Pacific washes at both map edges at once.
- **Free play:** §2 (tap land on either globe or map, the other lights).

## 6. The rounds
**Sets per locale** (from `maps.<loc>.json`, native-signed): **7 continents** in en, de, nl, sv, da, no, fi (North America, South America, Europe, Asia, Africa, Oceania/Australien/Oceanien/Oseania, Antarctica); **6** in fr, es, pt, it (America as one continent; the native panels ruled it). **5 oceans** in every locale (Pacific, Atlantic, Indian, Arctic, Southern).

**Find it — Continents (≥ 7 rounds a pass):**
| # | globe faces (lon, tilt) | asked (7-set) | 6-set locales ask |
|---|---|---|---|
| 1 | 20°E, +5° | Africa | Africa |
| 2 | 100°W, +30° | North America | America (seen from the north) |
| 3 | 90°E, +25° | Asia | Asia |
| 4 | 60°W, −15° | South America | America (seen from the south) |
| 5 | 15°E, +35° | Europe | Europe |
| 6 | 140°E, −25° | Oceania | Oceania |
| 7 | 0°, −35° | Antarctica | Antarctica |
In the 6-set locales "America" is asked twice in a pass from two globe views (rows 2 and 4) — both accept a tap anywhere on the America region and both pour into both halves — so every locale has 7 rounds a pass. Order shuffled per pass; never the previous pass's order; never two Americas back to back.

**Find it — Continents and oceans (grade 3; 12 rounds a pass in 7-set locales, 11 + one America repeat = 12 in 6-set):** the 7 continent rounds above + Pacific (globe 160°W, 0°), Atlantic (30°W, +10°), Indian (75°E, −20°), Arctic (0°, +35°, looking over the pole), Southern (90°E, −35°).

**Name it — Continents:** 7 rounds a pass; the map glows one continent with a number 1–7 (numbers as on the G2-370 sheet: North America 1, South America 2, Europe 3, Africa 4, Asia 5, Oceania 6, Antarctica 7 — in 6-set locales America 1 … Antarctica 6, and the 7th round is America again from the other half's glow); the child chooses its name from the bank of all the set's names.
**Name it — Continents and oceans:** 12 rounds; the bank holds all 12 (or 11) names.

**Answer position.** Find mode: the answer's place is geography — that is the skill, so it is not balanced; measured shortcuts instead (critic, from `world-map.js` label anchors): any constant-tap bot wins exactly the rounds of its one continent — "tap the biggest land" (Asia) 1 of 7, "tap the land nearest the map centre" (Africa, anchor 60 px from centre; Europe is 320 px away) 1 of 7; in the 6-set locales "always tap America" wins 2 of 7 (America is asked twice), still below chance-by-guess for a 6-land map; "tap the land under the globe's centre longitude" works only in pass 1 — the very pass whose job is to teach the pairing — and from pass 2 the globe no longer turns to the answer. Name mode: the bank order is re-dealt every round from a balanced deck so the right tag occupies each slot equally often per pass (7 names × 7 rounds → each slot exactly once per pass; with oceans 12 × 12 → once each); the gate asserts it. Elimination is removed: after Next, the flat map returns to plain sand (found continents are recorded only as chips in the found row), so the last round of a pass is as hard as the first.

**Pictures** (miss-1 animal helpers, colour themes, all labelled ×11, seen on contact sheets): zoo-animals/bison (North America), farm-animals/llama (South America), forest-creatures/hedgehog (Europe), zoo-animals/panda (Asia), zoo-animals/lion (Africa), zoo-animals/kangaroo (Oceania), winter/penguin (Antarctica); oceans use none. space/earth only on the start card. Not used: zoo-animals/cheetah/jaguar/leopard (near-twins), animals/elephant (a chibi baby, and lives on two continents), zoo-animals/moose (two continents).

## 7. Check, the misses, the success
- **Check with nothing chosen** → hint, no miss: Find "Tap the land on the flat map where {name} is." · Name "Drag a name onto the glowing place."
- **Find — Miss 1:** the colour pours, splashes on the wrong land and drips off; the globe then turns slowly to show the TAPPED place glowing in grey with its name ("That is {tapped}."), holds 1 s, and turns back to the asked continent; the animal helper for the asked continent appears beside the globe (96/64 px). Hint: "That is {tapped}. Find {asked} — the kangaroo/lion/… lives there." (the animal named by image-vocabulary in the locale).
- **Find — Miss 2:** the peel band appears and stays on the flat map at the globe's current view, and inside it the asked continent's coast pulses once (the child still taps). For Europe/Asia the dashed Europe–Asia line is drawn on both. Hint: "Look inside the light band."
- **Name — Miss 1:** the tag flies up into the globe, the globe spins to the continent that name really belongs to and glows it ("This is {name}."), then the tag drifts back to the bank and the globe returns to the asked place. Hint: "That name lives over there. Which name is this place's?"
- **Name — Miss 2:** two of the wrong tags in the bank fade to 30 % (the right tag and one other stay bright). Hint: "It is one of the bright names."
- A new move clears the help until the next Check (spinning the globe is not a move).
- **Success:** the pour and the name tag settle; bubble: "This is {name}." (Name mode adds the number: "Number {n} is {name}."). After the last round of a pass: the full-world show and "You found every continent!" (with oceans: "You found every continent and every ocean!").

## 8. Settings (each visibly changes the board at rest)
1. **Mode:** *Find it* (the name tag under the globe, no bank) / *Name it* (numbered glow + name bank). Default: Find it.
2. **Set:** *Continents* / *Continents and oceans* (adds the ocean names to the tags/bank and the gold-edged basins become tappable). Default: Continents.

## 9. Words (EN source)
- Title "The Globe and the Map" · instruction "Spin the globe. Find each glowing place on the flat map, or give it its name."
- Task lines: Find "Find {name} on the flat map." · Name "What is the glowing place called?"
- Hints: `findFirst` "Tap the land on the flat map where {name} is." · `nameFirst` "Drag a name onto the glowing place." · `find1` "That is {tapped}. Find {asked} — the {animal} lives there." · `find2` "Look inside the light band." · `name1` "That name lives over there. Which name is this place's?" · `name2` "It is one of the bright names."
- Success: `ok` "This is {name}." · `okNum` "Number {n} is {name}." · `allCont` "You found every continent!" · `allBoth` "You found every continent and every ocean!"
- Settings: "Mode" — "Find it" / "Name it"; "Set" — "Continents" / "Continents and oceans".
- **Locale traps.** (1) **The continent set is a curriculum fact per locale**, not a translation: fr/es/pt/it teach *America* as one continent (6), the others 7; the data already encodes it (`continentSet`), the design adds the two-view America round so every locale has 7 rounds. (2) Names from `maps.<loc>.json` only: de *Australien* (German school usage) vs en *Oceania*, sv *Oceanien*, no/fi *Oseania*; fi *Etelämanner* (Antarctica); ocean names differ in kind (es *Océano Glacial Ártico*, sv *Norra ishavet*, nl *Stille Oceaan* for the Pacific) — long names wrap to two lines on tags (tag height grows to 64, never shrinks the font). (3) "This is {name}." needs no article in most locales, but fr/it/es/pt continent names take articles in running text ("C'est l'Afrique", "È l'Africa", "Es África", "É a África") — the native author writes `ok` as a per-name sentence table (12 strings), not a template. (4) Finnish/German compound and case: "{animal} lives there" is authored as a per-continent sentence too (fi "Siellä asuu leijona."). (5) The animal labels come from image-vocabulary (es *León*, pt *Lhama*, de *Igel*), sentence-cased by the author.

## 10. Sound off, access, phones
- Every outcome is visible (pour, splash, globe turn, band, fade); TTS optional reads the name tag.
- Keyboard: arrows spin; Tab cycles map continents west→east and bank tags; Enter selects/docks. aria: the globe "globe showing {asked name}" (Find) / "globe" (Name, where the name is the answer); map continents "land 1 … land 7" in west→east order (never the name in Name mode).
- Taps: continent halos ≥ 44 px; tags 44 tall; globe drag area = its full disc.
- Pictures: animal helpers 96 / 64 px; nothing smaller.
- Phone: §4.

## 11. Distinct from
- **New 274 The Shadow Table — the Sinking Inlay** (a piece only sinks into the hollow it lies exactly inside) and **Row 38 Professor Pip's Museum** (clasps close round their own shape): shape-locked placement. This instrument has no pieces and no sockets: the child recognises a continent across two different projections and the material answers by pouring and by turning the globe to where a name truly lives. (That is why the planned "jigsaw" — pieces that seat only in their own outline — was dropped: it would reuse 274's mechanic and would test outline matching, not geography.)
- **New 244 The Camera That Climbs** (points of view), **New 266 The Map Key** (symbols), **#286 The Turntable Map** (batch sibling: a local map turned on a turntable; here the turning thing is a globe and the link is globe ↔ flat map).
- Premium tools: none has a globe.

## 12. Build plan
- **Geometry:** extend `scripts/worksheet-gen/tools/build-world-map.js` (it already reads `ne_110m_land.geojson`, sha256 pinned) to also emit `mini tools/world-geo.js`: (a) the same 47 rings in **lon/lat** with the same region tags and the same Douglas-Peucker simplification (for the globe), (b) the projected rings (the flat map, identical to the printable's — screen and sheet match), (c) the Europe/Asia cut, label anchors, and (d) a coarse **ocean basin raster** (2° cells, each water cell tagged pacific/atlantic/indian/arctic/southern by the rule: lat ≥ 66 → arctic; lat ≤ −60 → southern (the IHO 2000 limit of the Southern Ocean, 60° S — not 55°, which would hand the Drake Passage and the tip of South America's waters to the wrong ocean); the Mediterranean, Baltic, Caribbean and Hudson Bay stay with their parent ocean (Atlantic) by the flood fill; there is no arctic or southern seed in world-map.js (only pacific ×2, atlantic, indian), so those two basins come from the latitude rule alone; otherwise flood-fill from the `oceans` seed points of world-map.js with land as walls and the meridians 20°E (Atlantic|Indian, south of Africa), 147°E (Indian|Pacific, south of Australia) and 68°W (Atlantic|Pacific, Drake Passage) as cuts). Taps within 2 cells of a basin border are ignored (no miss). Public-domain Natural Earth data: licence line carried in the module header; operator ruling needed only for using drawn map geometry in an activity — the same geometry already ships in G1-379/G2-370 printables.
- **Globe render:** orthographic projection of lon/lat rings each frame (≤ 2,000 points → cheap SVG path), back-face points clipped at the horizon (dot < 0), land fill; peel band = the set of flat-map raster cells whose lon/lat is within 90° of the view centre, drawn as a soft white 25 % overlay.
- **Model (core):** `state = {mode, set, round:{kind:'continent'|'ocean', id, view:{lon,tilt}}, chosen, missStage, bankOrder}`; `regionAt(mapX,mapY)`, `basinAt(mapX,mapY)`, `check()`, `dealBank(pass)`, `viewFor(id)`; America handling: `idsFor(locale, id)` maps `america` → ['northAmerica','southAmerica'].
- **Gate (`verify-world-jigsaw-core.js`):** every ring's region equals the printable data; the projected rings hash equals world-map.js's geometry hash; for each continent, its label anchor resolves (regionAt) to itself; each ocean seed resolves (basinAt) to its ocean; the Pacific resolves at both map edges; every locale's set and names equal maps.<loc>.json; every globe view `viewFor(id)` puts ≥ 60 % of that continent's land on the visible hemisphere; 6-set locales get 7 rounds with two America views; bank slot balance exact per pass; after Next the map shows no colour; Check with nothing chosen is not a miss; Name-mode aria never contains the answer.
- **Mutations:** accept a tap on a neighbour continent · keep found continents coloured (elimination returns) · bank always in the same order · America split in a 6-set locale · peel band ignores tilt · globe faces the wrong continent for one id · name-miss globe spins to the asked continent instead of the named one · ocean basin of the Pacific only on one edge · miss-2 band shows without a miss · aria names the continent in Name mode.
- **Pictures to verify:** the seven animal helpers + space/earth (labels ×11 checked; seen on zoo-animals, farm-animals, forest-creatures, winter, space sheets).
- **Risks / blocked:** *Not blocked by art* — the continents and basins are drawable apparatus generated from the public-domain coastline data the printables already ship (the dossier's "blocked on art" is resolved by reuse); the only open item is the operator's general ruling that map geometry from public-domain data may appear in activities (same data, already in printables). If that ruling is refused, the honest fallback is NOT a hand-drawn map: it is the printable's own rendered world-map PNG (`out/dev/G1-379-world-map-colour.png`, opened 2026-09-23) used as a static flat map with the same hit regions, and the globe dropped (Find mode then shows the name only).
- **Locale data gap:** da has no mnemonic (unused here) — nothing else missing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** A spinnable globe is irresistible, the pour is satisfying, and the light band that slides over the map is a small wonder.
2. **Would a teacher put it on the board?** Yes — it is the globe-and-map lesson in one instrument, it honours each country's own continent set, it catches the America and Europe/Asia confusions by showing them, and elimination is designed out.
3. **Would a parent trust it?** Real coastlines from public data, calm colours, no score, the child's own country's names.
4. **The invention in one sentence:** the globe glows a continent, and when you find that same land on the flat map the globe pours its colour into it — a wrong name sends the globe spinning to where that name really lives.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Find mode never asked the child to find a continent from its NAME (the globe always glowed the answer, so pass after pass it was glow-matching) — G3-396 is find-by-name. Added the glow fade: pass 1 glows (learn the pairing), from pass 2 the globe sits neutral and only the name asks; the glow is the miss-1 help. Task line is now "Find {name} on the flat map."
- Southern Ocean limit corrected to 60° S (IHO 2000; 55° was wrong); noted that world-map.js has NO arctic/southern seeds (checked: pacific ×2, atlantic, indian), so those basins come from the latitude rule; marginal seas stay with the Atlantic.
- Shortcut numbers re-measured from the real anchors: the "nearest the centre" bot is 1/7 (it always picks Africa), not 2/7; added the 6-set "always America" bot = 2/7.
- Verified every locale's `continentSet` in `maps.<loc>.json`: 7 (en de nl sv da no fi) / 6 with one America (fr es pt it) — matches each school convention (fr cycle 2, Brazilian BNCC, Italian primaria and Mexican SEP books count America as one); names de Australien, sv/da Oceanien, no/fi Oseania, nl Oceanië. The seven animal helpers + space/earth are labelled ×11. Natural Earth is public domain (licence line kept in the module header); the BLOCKED art is genuinely resolved by reusing the shipped printable geometry.
