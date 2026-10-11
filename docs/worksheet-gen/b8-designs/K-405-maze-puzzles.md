# K-405 `maze-puzzles` (PreK/K/G1/G2) : FINAL design (editor merge, 2026-10-11)

Merged from `_work/K-405-pedagogy.md` (rulings P1-P8, the nineteen moves, bands, standards, the F18 sound pools, the alphabets), `_work/K-405-design-A-scenes.md` (twenty scenes, style families CR / FN / FO / BW, the refused-on-sight list), `_work/K-405-design-B-topology.md` (route-first engine, looped graphs, the measured gates, the raster oracle v2, the poisons, the `trace-path` contract), `_work/K-405-design-C-page.md` (the window page, four templates, markers, stones, strips, screen, key) and `_work/K-405-lead-notes.md` (binding: F19 = running total within 100, looped label faces, school letterforms from `letter-strokes.js`, fr cursive, F18 cards as apparatus from CR + FN, answer-free pages, one `trace-path` kind, written boxes paper-only). Every ruling and why: `_work/K-405-critic.md`. Rule of the merge: measured buildability > preference; the brief and the lead notes > every input.

(m) = measured. (mB) = measured by Designer B (`%TEMP%\hm\proto\b_*.js`), (mC) = re-measured by the editor 2026-10-11 with read-only node (scratch `crit_exp5_h.js`, `crit_f5.js`, `crit_f7.js` wrapping B's `b_lib.js` / `b_braid.js` / `b_exp3.js` / `b_exp7.js`). Sheets OPENED by the editor: `zoo_animals`, `At_the_Supermarket`, `forest_creatures`, `Things_That_Fly`, `spring`, `beach`, `toys`, `summer`, `insects_and_bugs`, `farm_animals`, `fruits`, `vehicles`. Checked in the repo: `data/b2/collation.js` (alphabet lengths en de fr pt nl 26, es 27, it 21, sv da no fi 29, m), `data/tracing/letter-strokes.js glyphFor` (A-Z a-z Ñ Å Ä Ö Æ Ø ñ å ä ö æ ø all resolve, m), `data/fdx/catalog.js` (all ten F20 B&W srcs present, m), `frontend/config/topics-taxonomy.json` (142 exercise-type keys; no `maze-puzzles` yet; `mazes` slugs ×11, m), landing `coordinate.level` keys ×11 (m), `frontend/lib/seo/strand-names.ts` rows (m), `INTERACTIVE_PRINTABLE_FAMILIES` = {'find-the-differences'} (m). No text width on this page is measured; every text width is *est.* and the engineer measures. No em-dashes.

**Boundary (load-bearing).** The catalogue owns neighbouring MOVES; this family is separated from each by what the child DOES. **The grid `mazes` family** (K-242 base + K-270 `maze-easy` + K-271 `maze-hard` + K-272 `maze-giant`, `lib/maze.js` square-cell perfect maze in teal lines, two theme icons; EN landings `maze-worksheet`, `easy-maze`, `hard-maze`, `giant-maze`, `animal-maze`, `fruit-maze`; rail slugs `mazes` / `labyrinthe` / `laberintos` / `labyrinthes` / `labirintos` / `labirinti` / `doolhoven` / `labyrinter` ×3 / `labyrintit`, m): it owns the bare heads "maze worksheet", "easy maze", "hard maze", "giant maze", "animal maze", "fruit maze" and their locale twins; NO title here contains one of them, and no title is the bare locale maze word. **`dot-to-dot` K-285** (ordered dots: here the move is CHOOSING a branch by the next label) · **`alphabetical-order` G1-245** (sorting words: here the child walks the letter order through a graph) · **`odd-and-even` G1-351** (no parity path here) · **`number-walls`** and the **Mental Math Level Set** (a + b − c, no route: F19 chooses a ROUTE by its total) · the **`treasure-hunt`** and **`picture-path`** apps (grid drag and grid directions: no arrow-code face here, lead note 1). **This family owns only:** a hand-drawn corridor (or strand, or hex) graph inside an original colour scene, proved correct by search and by a raster oracle, where the child draws a route on paper, drags it on the `trace-path` screen, and the key draws it in coral. **Visual signature:** one big framed picture, light curvy roads through it, a teal start disc with a white triangle at one mouth and a coral flag at the other. From across the room: a story picture with a road to follow.

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `K-405` / `maze-puzzles` / base **K**. Faces (expected ids, `tools/alloc-b8var-ids.js`, cloned from `alloc-b7var-ids.js`, allocates in §3 file order by content band): K-406 F2 (PreK) · K-407 F4 · K-408 F7 · K-409 F11 · K-410 F12 · K-411 F14 · K-412 F18 · K-413 F20 · G1-420 F3 · G1-421 F5 · G1-422 F6 · G1-423 F8 · G1-424 F9 · G1-425 F10 · G1-426 F13 · G1-427 F16 · G1-428 F17 · G2-392 F15 · G2-393 F19. |
| subject | `apps['maze-puzzles'] = {default_subject:'spatial-reasoning', default_age_range:'5-7', exercise_type_axis_key:'maze-puzzles'}` (ABSENT today, m: added by `tools/register-b8-taxonomy.js`). `axes['exercise-type']['maze-puzzles']` slug + name ×11 (table B). `exerciseType:'maze-puzzles'`, `assetClass:'icon-placement'` (inline SVG, library drawings as `<image>` data, the b7 precedent). |
| theme axis | **OFF** on all twenty faces: `themeAxis:{applicable:false}`, `coordinate.theme:''`. The scene is fixed per face (Rule 1: one scene, all 11 locales). |
| unitAxis | **OFF** at ship (one pinned scene per face). Reserved for the Level Set expansion (per-season scenes), not this batch. |
| CCSS en (honest, d2) | F11 + F12 **RF.K.1.d** · F14 **K.CC.A.1** (d3 K.CC.A.2) · F15 **2.NBT.A.2** (by 5s; by 2s never ships) · F16 + F17 **1.OA.C.6** · F18 **RF.K.2.d** · F19 **2.NBT.B.5**. Base, F2-F10, F13, F20: NONE (readiness: visual-motor integration, planning; F13 alphabet order from a mid-point has no K-2 code). JSON-LD `educationalAlignment` only on those 8, no `targetUrl`. Non-EN prose names the framework NAME only. |
| strand chip (existing rows in `strand-names.ts`, m) | readiness faces `'Visual Perception'` · F11 F12 F13 `'Reading: Foundational Skills'` · F14 `'Counting & Cardinality'` · F15 F19 `'Number & Operations in Base Ten'` · F16 F17 `'Operations & Algebraic Thinking'` · F18 `'Phonological Awareness'`. No new row. |
| interactive | EVERY deck: PDF + `trace-path` screen + answer key. NEW kind `trace-path` in `emit/interactive-runtime.js` (KINDS set + a JS_TRACE runtime from `%TEMP%\hm\proto\trace-runtime.html`); `'maze-puzzles'` joins `INTERACTIVE_PRINTABLE_FAMILIES` (`frontend/config/interactive-exercise-types.ts:99`); `manifest.printable_only` stays true. |
| new code / data | `lib/hm-graph.js` (Poisson, Gabriel, route-first tree, braid, lattice, layers, strands, hex: ported from `b_lib.js` `b_tree2.js` `b_braid.js`) · `lib/hm-gates.js` (§5 metrics) · `lib/hm-oracle.js` (raster oracle v2) · `lib/hm-scene.js` (scenery fills on `lib/fdx-scenery.js` shapes + library `<image>` placement on islands, distance field, keep-outs) · `templates/components-b8/maze-puzzles.js` behind `templates/components-b8/_index.js` · `data/b8/maze-puzzles.js` + `data/b8/locales/maze-puzzles.<loc>.json` via `lib/b8-common.js bank()` (cloned from `b7-common.js`) · `data/hm/catalog.js` (each colour drawing's style family CR / FN / FO, Phase 3) · `data/hm/scenes.js` (the twenty pinned scenes below, hand-authored). No new primitive outside these. |

**Table B (the panels confirm; rail names are THE LOCK).**

| loc | rail name | rail slug (ASCII; checked against every `axes.*` slug, m) | alphabet (F11/F12 route length) | level keys PreK→K / K / G1 / G2 (landing `coordinate.level`, m) | genre heads the titles use |
|---|---|---|---|---|---|
| en | Maze Puzzles | `maze-puzzles` | A-Z (26) | `preschool` / `kindergarten` / `grade-1` / `grade-2` | picture maze · maze puzzles for kids · mazes for preschoolers · alphabet / ABC / letter maze · number / counting / skip counting / math maze |
| de | Labyrinth-Rätsel | `labyrinth-raetsel` | A-Z (26, umlauts folded) | `vorschule` / `vorschule` / `1-klasse` / `2-klasse` | Labyrinth-Rätsel · Labyrinth für Kinder · Buchstaben-Labyrinth · ABC-Labyrinth · Zahlenlabyrinth · Rechenlabyrinth · Labyrinth Vorschule |
| es (MX) | Juegos de laberinto | `juegos-de-laberinto` | A-N Ñ O-Z (27) | `preescolar` / `preescolar` / `primer-grado` / `segundo-grado` | laberintos para niños · laberinto del abecedario · laberinto de letras · laberinto de números · laberinto de sumas / de restas · laberintos para preescolar |
| pt (BR) | Atividades de labirinto | `atividades-de-labirinto` (the theme slug `atividades` is a PREFIX of it; it prefixes nothing, m: OPEN 6) | A-Z (26) | `educacao-infantil` ×2 / `1o-ano` / `2o-ano` | atividades de labirinto · labirinto infantil · labirinto do alfabeto · labirinto dos números · labirinto matemático · coordenação motora |
| fr | Jeux de labyrinthe | `jeux-de-labyrinthe` | A-Z (26) | `maternelle` ×2 / `cp` / `ce1` | jeu de labyrinthe · labyrinthe maternelle · labyrinthe des lettres · labyrinthe des nombres · labyrinthe maths CP / CE1 |
| it | Percorsi e labirinti | `percorsi-e-labirinti` | A-Z without J K W X Y (21) | `infanzia` ×2 / `classe-prima` / `classe-seconda` | labirinti per bambini · percorsi e labirinti · labirinto dell'alfabeto · labirinto dei numeri · labirinto matematico |
| nl | Doolhofpuzzels | `doolhofpuzzels` | A-Z (26, IJ not an order letter) | `kleuters` ×2 / `groep-3` / `groep-4` | doolhofpuzzel · doolhof kinderen · letterdoolhof · cijferdoolhof tot 20 · rekendoolhof · doolhof kleuters / peuters · doolhof kleurplaat |
| sv | Labyrintpyssel | `labyrintpyssel` | A-Z Å Ä Ö (29) | `forskola` ×2 / `ak-1` / `ak-2` | labyrint för barn · labyrintpyssel · labyrint förskola + the face's tail (no alphabet / number demand) |
| da | Labyrintopgaver | `labyrintopgaver` | A-Z Æ Ø Å (29) | `boernehaveklasse` ×2 / `1-klasse` / `2-klasse` | labyrint for børn · labyrint opgaver · alfabet labyrint · matematik labyrint · labyrint børnehave |
| no | Labyrintoppgaver | `labyrintoppgaver` | A-Z Æ Ø Å (29) | `1-trinn` ×2 / `2-trinn` / `3-trinn` (Nordic +1) | labyrint for barn · labyrint oppgaver · alfabet labyrint · matte labyrint · labyrint barnehage |
| fi | Labyrinttitehtävät | `labyrinttitehtavat` | A-Z Å Ä Ö (29) | `esikoulu` ×2 / `1-luokka` / `2-luokka` | labyrinttitehtäviä lapsille · labyrintti tulostettava · sokkelo · sokkelo värityskuva (F20) |

Locale level shifts (pedagogy, framework reading; the panel confirms its row): **F11 F12 F14** de `1-klasse`, it `classe-prima`; **F11 F12** nl `groep-3`; **F12** fr `cp` (cursive). PreK (F2) has no own key outside en: it takes the locale's K key and the title carries the PreK word (Kita, peuters, barnehage, varhaiskasvatus...).

**The rule that locks the type.** A maze exists only as a declared graph (`nodes`, `edges`, `routes`, `rule`) built by `lib/hm-graph.js` from the face's resolved config and seed, accepted only when every §5 gate passes (the engine tries K = 150 builds per seed, then seed + 1; B1 route-first: random-then-reject passed 0 of 300, mB). Tree faces have exactly one route per start (|E| = |V| − 1, connected); looped faces have exactly ONE simple path that obeys the face's rule, proved by exhaustive simple-path search (cap 300,000; largest page seen 112 paths, mB). The rendered page is re-proved by the raster oracle v2 (the page draws exactly the declared graph). The printed page carries no answer. **Quality test:** a five-year-old knows WHO travels and WHERE before reading a word, and a teacher can say in one sentence what each face teaches that the base does not.

## 2 The base page

**Concept.** "Picture Maze: Help the Hedgehog Reach the Apple Tree" (K). An autumn orchard at golden hour; a hedgehog at the bottom-left mouth, a tall apple tree at the top-right; light straw roads curl through the orchard, with little garden creatures sitting on the grassy islands between them. The child plans, then draws one line from the teal disc to the coral flag. Six to nine dead ends, the deeper ones leading TOWARD the tree before they stop.

**Chrome budget.** Body 733 at the tallest shipped chrome (2-line title + 3-line instruction, b7 measure), 766 ordinary. **Every face's stack = 716** (620 ≤ 716 ≤ 740; 716/733 = 97.7 % page use, 17 px slack for an instruction that wraps one more line in fr / fi; 716/766 = 93.5 %). A 3-line title is shortened by the panel, never accommodated.

**Layout d2 (template T1, scene-band variant)**
```
.ws-page inner 675 : root <div class="hm-page" data-ws-content data-lcs-hm-mode="base">
y=0   +-----------------------------------------------------+  frame 675 x 716, r 18, stroke 3 teal #146B5E
      | scenery band 76: sky #DDEEF5, far hill #C9D98F       |  (no corridor in the band; tree crown may rise into it)
y=76  |-----------------------------------------------------|
      | maze box 675 x 640 (B's measured box, margin 24)     |  orchard ground #E6D49A, edge #C9B474
      |   corridors W 44 (fill #FFF5DC, edge #C8A45C *est.*) |  ~31 nodes, route 11-15 (mB)
      |   islands: mouse, ladybug, snail, butterfly,          |
      |   buttercup, dandelion, mushroom (44-80 px)           |
      | >o [hedgehog 96]                [apple tree 150] F    |
y=716 +-----------------------------------------------------+
stack 716 = 76 + 640
```
- **Graph (B 3.1):** organic tree, Poisson r 90, Gabriel + angle prune 55°, route-first, W 44, route 11-15 nodes, branches 6 (size 3-5), fill 1, wobble 0.25, keep-outs [[30,610,62],[612,52,88]] (box coords; hedgehog, tree). Mouths BL → TR.
- **Measured d2 (mB, 75/100 seeds):** nodes 31.2, route 12.6 (11-15) nodes / 1,312 px, dead ends 6.5 (6-8), depth ≥ 3: 3.1, route junctions 4.5, tempting 2.4, clearance p5 67.5 (gate ≥ 61), islands r ≥ 28 (56 px art) 13.3, r ≥ 40 (80 px art) 4.2 (2-6).
- **Scene (A §1, CR + FN):** start `forest creatures/hedgehog` h 96 outside the BL mouth, facing right; goal `tree/apple` h 150, trunk base on the hill line at the TR mouth. Islanders (size by real-world class, never by island; noun once per scene): `forest creatures/mouse`, `forest creatures/ladybug`, `forest creatures/snail`, `forest creatures/butterfly`, `flowers/buttercup`, `flowers/dandelion`, `vegetables/mushroom`, `tree/birch` (90 px in the band's left behind the hill). 6-10 fallen-leaf dots `#E69A4A` / `#D9773A` (8-12 px) on islands. At most 2-6 drawings at 80 px (mB island count); the rest 44-56.
- **Markers (C 1.4, language-free):** start disc teal Ø 44 with a white 18 px triangle pointing along the first chain's tangent into the mouth (it is the screen's first tip); goal = coral pennant 30 × 22 on a 3 × 46 pole `#8A8276` + a dashed coral ring Ø 52 round the goal node. Disc and flag are drawn unclipped on top of the frame clip. The first 40 px of the route from the disc is shared with no dead end.
- **Paint (C 1.9, gated on the PNG):** corridor fill luminance L ≥ 0.88; fill vs field ΔL ≥ 0.10; edge vs fill ΔL ≥ 0.25 (A's `#D7B977` measures ≈ 0.22 *est.*: the engineer darkens in 6 % steps, `#C8A45C` *est.*); mean ink of the frame ≤ 0.30.
- **Instruction (en candidate, ≤ 150):** "Help the hedgehog get to the apple tree. Draw a line along the way." The panel writes the whole sentence natively (article, case).

**Screen (`trace-path`, C §3 + B §6, accepted).** The screen page = the same render with paper-only elements removed and the tap string `mz-base` replacing the instruction. Ink SVG `viewBox 0 0 675 716`, `preserveAspectRatio xMidYMid meet` (the prototype's `0 0 100 100 none` anisotropic stroke is fixed). **Snap radius, not corridor width:** a press counts within max(44 css px, 90 page px) of the active tip; ink projects only onto edges incident to the tip; passing 92 % of an edge advances the tip; moving back retracts (measured with real drags at 360 and 768, `trace-robot.js`). A node already on the ink stack is entered only by retracting. Ink `#2F5BD3`, width max(12, 0.42 × W) page px, round caps, partial ink at 0.55 opacity. Toolbar `.lcs-btn` 48 css px: Check (`runtimeCheckAnswers`) · Go back (`mzGoBack`) · Start again (`runtimeTryAgain`). Check: tip = goal → ink green `#2E9E5B`, the hero glides along the drawn route (1.6 s; reduced motion: jump), star burst, house celebration card; tip short → red ring at the tip + `mzKeepGoing`. Keyboard / screen reader: a junction button row (one arrow-glyph button per way forward from the tip; a press walks the whole chain), `aria-live` `mzAt` / `mzDeadEnd` / `mzAtGoal`.

**Key.** The print page + a coral `#F2784B` route stroke, width 0.45 × W (min 10), opacity 0.85, on the edge samples (the same polyline the screen snaps to), ending in a 14 px arrowhead at the goal.

**Risks.** (1) Edge contrast on straw (ΔL < 0.25 *est.*): gated, darkened. (2) Scenery band vs field join: the band is drawn behind the maze box, never under a corridor (the maze box starts at y 76).

## 3 The nineteen faces

Every face carries a `mode` string (the landing coordinate) and a resolved d2 config that differs from the base and from every other face (§3 end table; `tools/gate-variation-distinct.js --batch=b8`). **PARAM faces** (the base generator with other knobs, no `verify()` branch): F2, F3. **CODE faces** (a `mode` knob + a `verify()` branch): all others. Every face's stack is 716; frame / box per the §3 end table. Mouth slots after B 2.6 (no two faces share generator family + mouth pair; no ordered pair used more than twice); A's scenes are MIRRORED to match, art unchanged.

### F2 : My First Maze (PreK, PARAM, `mode:'first-maze'`, K-406)
**Move:** stay inside ONE very wide road; only two short choices at the first two junctions. Control, not planning.
**Scene (A §2, CR + FN props):** spring park. Start `pets/dog` h 100 at the L mouth (mid-height); goal `toys/ball` h 70 on a drawn grass mound at the R mouth. Islanders (big islands only): `pets/cat`, `spring/butterfly`, `spring/bird`, `tree/cherry` (130 px), `flowers/tulip` ×1 (noun once). Drawn: sky `#E4F3FB` band 76; lawn `#C8E6A0` edge `#A6CB7A`; 2 flower beds `#F7C9D6`. Corridor sand `#FBEFD0` / edge `#D9BE84`. (A's `pets/rabbit` islander dropped: the rabbit is F9's hero.)
**Topology (B 3.2):** organic tree, r 150, minAngle 60, W **72**, route 5-7, branches 2 (size 2-3, depth 1-2; stubs allowed at PreK), fill 0, roots on route positions 1-3.
**Layout:** T1 band variant (band 76 + box 640); start disc **Ø 56** (PreK); goal flag as base.
**Config d2** `{mode:'first-maze', gen:'tree', r:150, W:72, route:[5,7], branches:2, dead:2, minAngle:60, mouths:['L','R'], disc:56}`; d1 `{r:175, W:80, route:[5,6], dead:1}` (mB 79/100); d3 `{r:135, W:64, route:[7,9], dead:3}` (mB 68/100).
**Verify:** dead = 2, both rooted within the first two route junctions; route turns ≥ 3; wf ≤ 0.80; tort ≥ 1.3; lane = 72 on the rendered page. mB d2 84/100: route 6.3, wf 0.59 / 0.61, clearance p5 123, largest island r 116.
**Query face:** mazes for preschoolers / toddlers; pt "coordenação motora"; es "laberintos para preescolar"; nl "doolhof peuters".

### F3 : Big Picture Maze (G1, PARAM, `mode:'big-maze'`, G1-420)
**Move:** a long route with deep dead ends that need backtracking; plan before drawing ("Look first, then draw").
**Scene (A §3, CR + FN):** rainforest floor. Start `zoo animals/orangutan` h 90 at **BR**; goal `tree/banana` h 140 at **TL** (mirrored from A). Islanders 44-56 px only (mB islands r ≥ 40: 0.7): `birds/toucan`, `birds/macaw`, `zoo animals/sloth`, `reptiles and Amphibians/chameleon`, `insects and bugs/butterfly`, `flowers/hibiscus`, `flowers/orchid`, `forest creatures/frog`; `tree/palm` in the band, top-right. (A's `zoo animals/gorilla` dropped: two apes beside each other read as one twice.) Canopy band 76 `#4F8F55` with leaf scallops; floor lifted to **`#86BE77`** (A's own fallback; `#6FAF66` fails the print rule, C 1.9).
**Topology (B 3.3, re-based):** dense organic tree, r 66, W **36**, route **22-28**, branches 11 (size 3-6), bNewest 0.5, fill 1.
**Layout:** T1 band variant.
**Config d2** `{mode:'big-maze', gen:'tree', r:66, W:36, route:[22,28], branches:11, mouths:['BR','TL']}`; d1 `{r:74, W:40, route:[18,22], branches:9}` (mB 44/100); d3 `{r:64, W:34, route:[24,30], branches:12, K:600}` (UNKNOWN acceptance: the engineer measures; B's r 62 / route 26-34 gave 2/100).
**Verify:** route 22-28 · dead 11-18 · junctions ≥ 6 · stubs ≤ 1 · tempting ≥ 2 · depth ≥ 3 share ≥ 0.30 · side ≤ 0.60 · same-run ≤ 3 · wf ≤ 0.50 · tort ≥ 2.0 · maxRun ≤ 250 · clearance ≥ 53 · goal on a node of degree ≥ 3 · no deep dead end rooted within 2 nodes of the goal. mB d2 59/100: route 23.7, dead 11.9, junctions 6.8, tempting 3.4, wf 0.41, tort 2.71, clearance p5 53.1 (tight: the gate decides).
**Query face:** maze puzzles for kids / maze for 1st graders; de "Labyrinth 1. Klasse"; fr "labyrinthe CP". Never "hard maze".

### F4 : River Maze (K, CODE `mode:'river'`, K-407)
**Move:** long curved strokes inside a curved band of water; few junctions, long smooth arcs (pre-writing curves).
**Scene (A §4, CR + toys):** a garden stream; the corridors ARE water, the islands are banks. Start `toys/boat` h 80 on the water at the TL mouth; goal `toys/teddy_bear` h 90 sitting on a drawn dock (3 planks `#D9A86A`, 120 × 46, the flag on the end plank) at the BR mouth. Islanders: `forest creatures/frog`, `forest creatures/dragonfly`, `animals/duck`, `animals/swan`, `forest creatures/turtle`, `flowers/water_lily` (on a bank edge), `tree/elm`. Banks `#A9D27E`; reed tufts `#7FAF57`. Corridor water `#D3EEF8` / edge `#73B7D3`, 3-5 wave ticks only inside straight runs.
**Topology (B 3.4):** organic tree with long chains: r 104, minAngle 65, W **52**, wobble 0.42, route 10-15, branches 4 (size 3-4), bNewest 1 (inlets are single long fingers), fill 0. Every edge one width: an inlet is never narrower (no width tell).
**Config d2** `{mode:'river', gen:'tree', r:104, W:52, wobble:0.42, minAngle:65, route:[10,15], branches:4, bNewest:1, chainMin:2.5, paint:'water', mouths:['TL','BR']}`; d1 `{r:120, W:60, route:[8,11], branches:2}` (mB 83/100); d3 `{r:92, W:46, route:[13,18], branches:5}` (mB 11/100).
**Verify (the branch):** mean chain length ≥ 2.5 edges · dead 3-5 · junctions ≥ 3 · stubs 0 · tempting ≥ 1 · depth ≥ 3 share ≥ 0.5 · side ≤ 0.67 · wf ≤ 0.60 · tort ≥ 1.7 · maxRun ≤ 260 · paint = water. mB d2 32/100 (chain 2.81, maxRun p95 259).
**Query face:** river maze / boat maze (the scene).

### F5 : Underground Maze (G1, CODE `mode:'burrow'`, G1-421)
**Move:** the route goes DOWN and UP between three soil levels through vertical shafts; the shortest-looking descent is a dead end; positional language carries the plan.
**Scene (A §5 re-cast, CR + FN):** an ant colony in cross-section. Start `forest creatures/ant` h 64 at the nest hole on the surface **TR**; goal **`fruits/raspberry`** h 60 (the ants' store) in the deepest chamber **BL**. Only ONE ant on the page (the editor ruling on A's two ants: one noun once per scene; A's second ant `insects and bugs/ant` is dropped). Surface (straddling the grass line, nothing masked): `flowers/dandelion`, `forest creatures/ladybug`, `vegetables/carrot`, `vegetables/radish`. Dead-end chambers Ø 60-80 `#E9CBA6`, one bug each: `insects and bugs/worm`, `insects and bugs/centipede`, `Things That Fly/beetle`, `forest creatures/spider`. Sky `#E2F1F6` 0-60, grass line y 76 `#9CCB6E`; soil strata `#C99A6B` / `#B88559` / `#A47149`; tunnel fill `#F4E1C6` / edge `#B9895B`.
**Topology (B 3.5):** layered lattice tree, C 10 columns × 3 levels, horizontal tunnels + vertical shafts, route-first, bNewest 1, wobble 0.18, W **40**, route 12-17, branches 6 (size 2-4). Levels at frame y 156 / 396 / 636 (B's 120 / 360 / 600 translated + 36); a shaft joins the nest hole on the grass line to level 1.
**Config d2** `{mode:'burrow', gen:'layers', C:10, levels:3, W:40, route:[12,17], branches:6, mouths:['TR','BL']}`; d1 `{C:8, levels:2, route:[8,11], dead:[2,4]}` (mC 300/300); d3 `{C:10, levels:4, route:[16,22], lc:5, up:2}` (mC 15/300).
**Verify:** level changes ≥ 3 with ≥ 1 UP · shafts 5-7 · **dead-end shafts ≥ 1** · dead 6-8 · stubs ≤ 1 · side ≤ 0.67 · wf ≤ 0.60 · longest same-level run ≤ 5 edges · goal ≥ 1/3 frame horizontally from the start. **mC d2: 33/300 seeds accepted without the shaft gate; 16/300 with ≥ 1 dead-end shaft, 4/300 with ≥ 2** (the pedagogy's 2-3 is not reachable; the engineer scans seeds, expect a first pass within ~19 seeds).
**Query face:** underground maze / burrow maze / ant maze.

### F6 : Town Maze: the Shortest Way (G1, CODE `mode:'shortest-way'`, G1-422)
**Move:** the streets have loops; several routes reach the goal; the child picks the SHORTEST and writes how many street pieces it is (the misconception "fewer turns = shorter" is designed in).
**Scene (A §6, FO, no critters):** a small town from a three-quarter top view. Start `vehicles/tow_truck` h 70 at the L mouth; goal `vehicles/car` (green) h 60 parked at the R mouth. One object per lawn block: `around the house/garage`, `winter/cabin`, `camping/cabin`, `around the house/gate`, `around the house/mailbox`, `around the house/fence`, `tree/poplar`, `tree/oak`, `vehicles/bicycle`, `vehicles/scooter`. Lawn blocks `#BFDB98` r 12 with a 4 px pavement rim; streets `#E4E2DE` / edge `#A9A49C`, dashed white centre line only on runs ≥ 60 px.
**The unit (editor addition, the ambiguity fix):** every street piece between two crossings carries ONE drawn round cover (manhole) Ø 12 `#B9B4AB` at its midpoint, on EVERY piece (route and not), so "how many" means "how many covers did the truck drive over", never "how many lawns did it pass". The strip shows one street piece with its cover and "= 1".
**Topology (B 3.6):** street lattice 6 × 5 intersections (5 × 4 blocks), x step 125, **y step 140** (frame 640: 4 × 140 = 560 + margins), remove 4-6 segments (a degree-1 end gets a drawn barrier), W **40**, straight streets, corners r W/2. Mouths L → R.
**Layout:** T2: frame 675 × 640 + gap 12 + strip 64 = 716. Strip: [street piece with cover] `= 1` · [answer box 56 × 56 dashed, `data-lcs-paper-only`].
**Config d2** `{mode:'shortest-way', gen:'lattice', C:6, R:5, remove:[4,6], W:40, shortest:[6,9], unitMark:'cover', strip:'count-box'}`; d1 `{C:4, R:4, remove:[1,2], shortest:[4,6], turnGate:false}` (mB 100/100); d3 `{C:7, R:6, remove:[6,9], longerStraighter:≥2}` (mB 72/100).
**Verify:** exactly ONE shortest route (BFS count) · next-shortest = shortest + 2 (bipartite lattice: + 1 is impossible, mB 100 %) · shortest 6-9 · ≥ 1 longer route with FEWER turns · ≥ 3 distinct simple routes · one cover per segment. mB d2 69/100: shortest 7.1, next 9.1, routes within + 4: 134. Step change 148 → 140 is geometric only (the gates are topological).
**Screen:** Check = tip = goal AND inked edges = the shortest length (lead note 7: the box is paper-only). Not shortest → ink stays blue, goal ring amber, `mzShorter`.
**Query face:** town maze / city maze / shortest way (the scene + "shortest").

### F7 : Babies and Mothers (K, CODE `mode:'babies-mothers'`, K-408)
**Move:** three separate routes in one interleaved network; each baby reaches exactly one mother (1-to-1 along routes, choices on each).
**Scene (A §7, CR farm sheet + FN):** a summer hayfield. **d2 pairs (editor ruling, sheet `farm_animals` read):** `farm animals/chick` ↔ `farm animals/hen`, `farm animals/calf` ↔ `farm animals/cow`, `farm animals/foal` ↔ `farm animals/horse`. `farm animals/lamb` ↔ `farm animals/sheep` moves to d3 (on the sheet the sheep is drawn as a small round lamb-like animal; the pair reads as two lambs at d2). Never `duck` ↔ `duckling` (near-identical, pedagogy); never `chicken` with `hen`. Babies drawn ≤ 0.75 × the mother's height. Babies stand along the top under a fence rail `#D9B07C`; mothers in mown paddock discs Ø 120 `#D7EBAE` near the bottom. Islanders: `flowers/cornflower`, `flowers/buttercup`, `insects and bugs/butterfly`, `farm animals/bee`. Field `#EED58A`; lanes `#F3F8E4` / `#A9C979`.
**Topology (B 3.7):** forest of k vertex-disjoint trees, Poisson r 84 minus paddock discs (r 58, y 540), route-first with a derangement π (no baby above its own mother).
**Layout:** T3 (frame 716; the forest field 675 × 676 under a 30 px fence band). Start discs carry white numerals 1-3 (Baloo 2 26), each ringed in its route colour on the screen; one flag per mother, unnumbered.
**Config d2** `{mode:'babies-mothers', gen:'forest', k:3, r:84, W:44, dead:[2,4], pairs:['chick-hen','calf-cow','foal-horse']}`; d1 `{k:2, r:104}` (mB 98/100); d3 `{k:4, r:74, routeCap:30, K:600, pairs:+['lamb-sheep']}` (UNKNOWN: B's cap 22 gave 0/100; fallback d3 = k 3, r 74, dead 3-5 per tree, recorded).
**Verify:** π derangement in left-to-right order · each tree 2-4 dead ends · each route ≥ 1 junction · pairwise bounding-box overlap ≥ 0.40 · trees never touch (oracle) · clearance ≥ 61 between trees · **shortest route ≥ 0.5 × longest (NEW, mC: 62 of 105 accepted builds pass, ≈ 31 % of seeds; ≥ 0.6 passes 7 of 105, too strict).** mB d2 45/100.
**Screen:** k routes, ink colours blue / purple / amber; Check = every baby's tip = its own mother; a route at the wrong home turns red + `mzWrongHome`.
**Query face:** baby animals and mothers maze (never "animal maze").

### F8 : Tangled Lines: Whose Kite? (G1, CODE `mode:'tangled-lines'`, G1-423)
**Move:** no junctions, no choices: follow ONE line through crossings to its end and write the holder's number in the box at the kite. Pure visual tracking, the opposite of F7's choosing.
**Scene (A §8 completed, editor ruling on conflict 3; sheets read):** a windy hilltop. Holders (bottom, string ends, CR forest creatures): **`forest creatures/fox`, `forest creatures/raccoon`, `forest creatures/squirrel`, `forest creatures/badger`** (d2); d3 adds **`forest creatures/beaver`**. A's `forest creatures/rabbit` is dropped (F9's hero is a rabbit). Goals (top): **`spring/kite`** (red / yellow diamond), **`beach/kite`** (navy / red, bunting tail), **`Things That Fly/kite`** (blue / yellow), **`Things That Fly/balloon`** (red) (d2); d3 adds **`toys/balloon`** (green). Refused: `toys/kite` (too close to `spring/kite`), `summer/kite` (too close to `beach/kite`). Supporting: `weather/cloud` ×1, `Things That Fly/bird`, `flowers/clover` (hilltop). Sky `#CFE6F5`; hill `#9FCF7C` bottom band.
**Topology (B 3.8, geometry re-cut by the editor):** strands: k lines, M levels of disjoint adjacent swaps (each swap = one crossing), Catmull-Rom through (slot x ± 20 wobble, level y); no junctions (each line one edge). **Vertical span y 160 → 578 (418 px), M 6 → dy 69.7; slot 140 (span 420 for 4 lines).** Acute crossing angle = 180° − 2·atan(slot/dy) = **53°** (≥ 50 gate; B's slot 160 at this dy gives 47°, which FAILS, mC arithmetic; at B's dy 82 it was 54.1°, mB). d3 k 5, M 7, slot 140: dy 59.7 → 46° (d3 gate ≥ 40). Crossings drawn over/under (the lower line's outline breaks 6 px each side).
**Layout (T3, frame 716):** answer boxes 48 × 48 dashed white y 20-68 (paper-only) · kites / balloon h 70-84 at y 76-150, pitch 140 (x 127 / 267 / 407 / 547) · string knot at each goal's tail y ≈ 156 · strands 160-578 · numbered start discs Ø 44 at y 600 · holders h 72 at y 628-700 on the hill band.
**Config d2** `{mode:'tangled-lines', gen:'strands', k:4, M:6, slot:140, stroke:[10,12], crossings:[8,10], boxes:'goal', angleMin:50}`; d1 `{k:3, M:4, crossings:[3,4]}` (mB 200/200); d3 `{k:5, M:7, crossings:[12,14], angleMin:40}` (mB 84/200 at span 520 = slot 130; the engineer re-measures at slot 140 and the 418 px span).
**Verify:** crossings 8-10 · final permutation a derangement · each line crosses ≥ 2 others · never the same partner twice in a row · every level ≥ 1 crossing · length ratio min/max ≥ 0.80 · render-level (on the drawn polylines): crossing angle ≥ 50°, crossing points ≥ 30 px apart, no two lines within 14 px for > 40 px outside 20 px of a crossing · all lines one ink colour on paper. mB schedule 194/200, length ratio 0.96.
**Screen:** 4 routes (blue / purple / amber / brown); Check = every line inked to its end (lead note 7: the boxes are paper-only; the key fills them).
**Query face:** tangled lines puzzle / which line leads where (generic maze head + its tail).

### F9 : Collect on the Way (G1, CODE `mode:'collect'`, G1-424)
**Move:** reach the goal passing EVERY item, never using a road twice. Multi-goal planning with subgoals.
**Scene (A §9, CR + FN):** a vegetable garden of raised beds. Start `farm animals/rabbit` h 84 BL; goal `summer/bucket` (yellow) h 70 TR. Items (one repeated picture per page, counted, never named): **`vegetables/carrot` ×4** at d2 (A's four different vegetables would make the legend a list, not a count; pedagogy P5 one rule: "all 4 carrots"). Bed islanders: `spring/watering_can`, `vegetables/lettuce`, `vegetables/pumpkin`, `forest creatures/snail`, `insects and bugs/caterpillar`. Beds `#9C6E4A` with sprout dots; grass `#CFE5A8`; stone path `#F1EEE6` / `#B5AD9C`.
**Topology (B 3.9):** looped: route-first tree + 5 loop edges (never route-to-route, degree ≤ 4), r 90, W **36**, route 14 interior nodes, branches 8 (size 1-3), fill 1. Items on route nodes that lie on a cycle (a simple path avoiding them exists); no item on a dead-end spur.
**Layout:** T2: frame 640 + gap 12 + strip 64. Items = the picture 52 on a white disc Ø 56 IN the corridor. Strip: [carrot 52] · "4" Baloo 2 30 teal · 4 tick circles Ø 30.
**Config d2** `{mode:'collect', gen:'braid', r:90, W:36, route:14, branches:8, loops:5, items:4, item:'vegetables/carrot', strip:'legend-count'}`; d1 `{items:2, loops:2}`; d3 `{items:5, loops:7}` (d1/d3 UNKNOWN acceptance).
**Verify:** exactly 1 valid simple path through every item · ≥ 4 simple paths · the shortest path is not valid · rule route ≥ shortest + 3 nodes · live wrong exits ≥ 0.50 · no item on a spur · items not all on one chain. **mC at the shipped 640 frame: 65/100** (B's 78/100 was at 700; mC reproduces 78/100 at 700).
**Screen:** Check = goal AND every item node visited; missed items get the dashed red ring + `mzMissed`; a re-entered node is impossible (retract only).
**Query face:** collect-the-items maze / garden maze.

### F10 : Avoid the Walruses (G1, CODE `mode:'avoid'`, G1-425)
**Move:** several roads reach the goal; only one passes no obstacle. Constraint routing and inhibition (the short way is the blocked way).
**Scene (A §10, winter sheet, one family):** Arctic sea ice. Start `winter/polar_bear` h 84 at **BL**; goal `winter/igloo` h 100 at **R** mid (B's corners). Obstacles ON corridors: `winter/walrus` (sleeping, drawn ≤ 0.8 W tall, never wider than lane + 24) and drawn thin-ice holes (dark water ovals `#5E9FC0`, 48 × 28); the greedy hitting set decides how many of each (the legend shows each kind once). Supporting: `winter/seal`, `winter/snowflake` ×1, `winter/icicle`, `winter/ice`. Not used: `winter/penguin` (wrong pole), `winter/snowman`. Ice `#CFE3EF`; drifts `#F4F9FC`; trail `#FFFFFF` / edge `#8FB3CB`.
**Topology (B 3.10):** looped, r 90, W **36**, route 14, loops 6; obstacles = greedy hitting set over alternative paths + a minimality pass (every obstacle necessary).
**Layout:** T2: frame 640 + strip 64. Strip: each obstacle kind once inside a coral "not" ring (circle Ø 60, 4 px, diagonal bar at 70 % opacity over the picture). No word.
**Config d2** `{mode:'avoid', gen:'braid', r:90, W:36, route:14, loops:6, obstacles:[4,5], kinds:['winter/walrus','hole'], strip:'not-legend', mouths:['BL','R']}`; d1 `{obstacles:2, loops:2}`; d3 `{obstacles:[6,7], safeExtra:5}` (d1/d3 UNKNOWN).
**Verify:** obstacles 4-5 · exactly 1 obstacle-free simple path · ≥ 4 simple paths · the shortest path hits an obstacle · ≥ 1 obstacle within 2 nodes of a route junction · every obstacle necessary · ≥ 1 of each kind. **mC at 640: 99/100** (mB 100/100 at 700).
**Screen:** Check = goal AND no obstacle node inked; a passed obstacle gets a red ring + `mzAvoid`.
**Query face:** avoid-the-obstacles maze / polar bear maze.

### F11 : ABC Maze, Capitals (K, CODE `mode:'abc-capitals'`, K-409)
**Move:** at every junction choose the branch whose stone carries the NEXT capital; the whole alphabet is on the route.
**Scene (A §11, FO):** night sky. Start `vehicles/rocket` h 90 tilted 30° at **BL**; goal `space/moon` h 110 at **TC**. Islanders: `space/saturn`, `space/planet`, `space/earth`, `space/satellite`, `space/comet`, `space/asteroid`; drawn stars 6-10 px `#FFE9A8`. **Sky ships print-toned `#6E7CB8` / `#8794C6`** (A's own fallback; `#3E4C86` fails mean ink ≤ 0.30, C 1.9); the start disc gets a 3 px white halo. Trail `#FFF8E6` / `#C8B98A`.
**Topology (B 3.11):** looped station graph, every node a stone Ø **56**, r 76, W **44**, maze box 675 × 700, route = start + N letters + goal, branches 11-12 (size 1-3), fill 1 (leftovers become decoys), loops 7. **One graph per alphabet length class from one scene + seed family: L21 (it), L26 (en de pt fr nl), L27 (es), L29 (sv da no fi).**
**Labels:** route stones = `COLLATION[loc].strip` uppercased, in order, glyphs from `data/tracing/letter-strokes.js textGlyphs` as a SOLID round-capped 4.5 px ink stroke, cap height 30 (lead note 3; unknown glyph THROWS). Decoys prefer a NEAR MISS (next + 1, previous, look-alike of the next: E/F, M/N/W, O/Q, P/R/B, C/G, U/V, I/J, Å/Ä/Ö ↔ A/O) under the **forward rule** (no stone carries the successor of a neighbour's letter unless both are consecutive route stones; no decoy carries the first letter). Specials (Ñ, Å Ä Ö, Æ Ø Å) sit on the route, never as their own decoys.
**Layout:** T1 (frame 716 = maze box 700 + 8 + 8). Stones white, teal 2.5 px edge, identical for route and decoys (one style object), centred on the node, upright.
**Config d2** `{mode:'abc-capitals', gen:'braid-stations', r:76, W:44, stone:56, glyph:30, loops:7, alphabet:'collation', case:'upper', decoyMin:0.55, mouths:['BL','TC']}`; d1 `{letters:'A-M', r:84, loops:4}` (no RF claim; UNKNOWN acceptance); d3 `{stone:50, r:70, decoyMin:0.9}` (UNKNOWN: 57 stones do not fit at Ø 56, mB).
**Verify:** exactly 1 valid run (DFS over the declared graph) · ≥ 4 simple paths · the shortest physical path is not the letter route · letter route ≥ shortest + 3 · live wrong exits ≥ 0.50 · forward lint 0 · decoys ≥ 0.55 × N (L21 12 · L26 14 · L27 15 · L29 16) · near-miss share ≥ 0.9 · stone-on-corridor clearance ≥ stoneR + W/2 + 8 · glyph bbox route vs decoy ± 2 px. mB d2: L21 100/100, L26 100/100, L27 99/100, L29 88/100 (decoys 17.4, paths 56, shortest 16.9 vs route 31, live 0.68).
**Query face:** alphabet maze / ABC maze (capitals); fr "labyrinthe des lettres capitales"; es "laberinto del abecedario"; pt "labirinto do alfabeto".

### F12 : abc Maze, Small Letters (K; fr CP cursive; CODE `mode:'abc-lowercase'`, K-410)
**Move:** the same choose-the-next-letter move in lowercase, with REVERSAL decoys placed where their mirror is the right next letter (d where b is next, q where p is next, u where n is next, w where m is next).
**Scene (A §12, CR ocean subset):** a coral reef; the corridor is a bubble channel. Start `ocean life/clownfish` h 70 at TL; goal `ocean life/coral` h 110 at BR on the sand strip. Islanders: `ocean life/octopus`, `ocean life/jellyfish`, `ocean life/starfish`, `ocean life/crab`, `ocean life/seaweed`, `ocean life/pufferfish`, `ocean life/ray`, `ocean life/sea_horse` (tuna / shark / orca / whale excluded as semi-real). Water `#7FCBD5` / `#69BBC7`; sand `#F2DFAE`; channel `#EAF8FA` / `#5FAFBC`.
**Topology:** F11's engine and length classes, mouths TL → BR.
**Labels:** `letter-strokes.js` lowercase (single-storey a and g, b/d-safe forms), x-height 22, ascender 30; **fr: `LCS Cursive fr-moderne` 34 px, single letters, not joined** (lead note 4; judged on the PC). Reversal decoys tried first when the next letter ∈ {b, d, p, q, m, n, u, w}.
**Config d2** `{mode:'abc-lowercase', ...F11, case:'lower', reversalMin:4, mouths:['TL','BR'], font:{fr:'cursive-fr-moderne'}}`; d1 `{letters:'a-m'}`; d3 `{+decoys:['i/j','h/n','f/t']}`.
**Verify:** F11's list + ≥ 4 reversal decoys at the junction where their mirror is next (**UNKNOWN, the engineer measures**; same engine and near-miss share 0.98-0.99, mB) + stones never rotated.
**Query face:** letter maze (lowercase) / abc order maze; fr "labyrinthe des lettres cursives"; de "Buchstaben-Labyrinth" (the de panel decides "kleine Buchstaben").

### F13 : Letter Hop from the Middle (G1, CODE `mode:'letter-hop'`, G1-426)
**Move:** no corridors: a honeycomb of hexagon cells; start at a seeded MID letter and colour each next letter in a neighbouring cell. Alphabet order retrieved from a mid-point, not recited from A.
**Scene (A §13, CR + FN):** a giant honeycomb in a summer meadow. `forest creatures/bear` h 96 beside the start disc; `breakfast/honey` h 70 at the comb's top-right corner as the story goal (decoration, NOT a marker on a cell). `insects and bugs/bee` ×1 flying, `flowers/sunflower`, `flowers/clover`. Meadow `#F3DE95`; cells `#FFF6D6` edge 3 px `#E0B44E`; comb silhouette `#F7D27A`.
**Topology (B 3.13):** pointy-top hex grid **7 × 7 = 49 cells** (cell width 85, side 49, row pitch 74; grid 640 × 542), adjacency = shared edge. Run of 14 from a seeded start index 4 … (len − 14); sv da no fi runs END on the last letter (Å / Ö). Self-avoiding walk from a bottom-row cell.
**Layout:** T4 (frame 716; grid centred at y 87-629). Start disc teal Ø 44 directly below the run's first cell, pointing into it, no letter on the disc; the bear beside the disc on the side with room. **No flag on any cell** (editor ruling: a flag on the last cell would mark the run's end; the instruction names the last letter, which also appears as a decoy elsewhere).
**Config d2** `{mode:'letter-hop', gen:'hex', cols:7, rows:7, run:14, startIndex:[4,'len-14'], glyph:40}`; d1 `{cols:5, rows:5, run:8, from:'A'}` (mB 200/200); d3 `{run:14, direction:'backward'}` (UNKNOWN).
**Verify:** exactly 1 valid run (DFS from every cell holding the first letter) · ≥ 5 direction changes · ≥ 1 near-miss decoy beside EVERY step and ≥ 2 beside ≥ 50 % of steps (≥ 2 at every step is impossible on any grid, mB 0/200) · the letter after the run's end is not adjacent to the last cell · up-moves ≤ 0.65 of steps · polygon adjacency recomputed from the drawn hexes = declared. mB: hex 7 × 7 26-letter 195/200, 29-letter 183/200.
**Screen:** Check = the ink starts on the first cell and visits the run cells in order; edges = straight segments between adjacent cell centres; each stepped cell filled `#2F5BD3` at 18 %.
**Query face:** ABC order maze / a to z alphabet maze (the hop form); nl "letterdoolhof".

### F14 : Number Maze 1 to 20 (K; de it G1; CODE `mode:'numbers-20'`, K-411)
**Move:** choose the branch carrying the next number, 1 → 20.
**Scene (A §14, FO hero + camping props):** an alpine valley; the lanes are railway tracks. Start `vehicles/train` h 72 at **L**; goal `camping/cabin` h 90 by a drawn platform at **TR**. Islanders: `camping/mountain` (backdrop 140), `tree/pine`, `tree/spruce`, `camping/deer`, `camping/rabbit` (a camping-sheet rabbit, an islander, not a hero), `flowers/bluebell`. Peaks `#B7C7D6`; meadow `#B9DB8C`; rail bed `#F5EDDF` / `#A88C6A`, sleepers every 22 px (skipped inside stones).
**Topology (B 3.14):** looped station graph, stones Ø 56, r 84, W **44**, box 675 × 700, route 20 + 2 mouths, branches 9, loops 6.
**Labels:** numerals Baloo 2 700 30 px. Decoys: n + 2 (skip), n − 1 (repeat), digit reversal of the next (12↔21, 13↔31, 15↔51, 17↔71, always forward-safe), concentrated at 11-19; 20 sits behind a turn from 19.
**Config d2** `{mode:'numbers-20', gen:'braid-stations', r:84, W:44, stone:56, seq:[1,20], step:1, loops:6, decoyMin:12, mouths:['L','TR']}`; d1 `{seq:[1,10], decoyMin:6, r:96}`; d3 `{seq:'start 6-12, 20 steps'}` (d1/d3 UNKNOWN).
**Verify:** F11's P1 list + decoys ≥ 12. mB d2 100/100: decoys 15.6, paths 30, shortest 13.4 vs route 22, live 0.73.
**Query face:** number maze 1 to 20; es "laberinto de números del 1 al 20"; nl "cijferdoolhof tot 20"; fr "labyrinthe des nombres".

### F15 : Skip-Counting Maze by 5s (G2, CODE `mode:'skip-5'`, G2-392)
**Move:** choose the next multiple of 5 from 5 to 100; the step is the rule.
**Scene (A §15, FO / FN fly):** a dawn sky; the path is a chain of clouds. Start `Things That Fly/hot_air_balloon` h 100 at **BC**; goal `weather/rainbow` h 90 at **TR**. Islanders: `Things That Fly/paper_airplane`, `Things That Fly/helicopter`, `Things That Fly/airplane`, `Things That Fly/swan`, `Things That Fly/seagull`, `weather/sun`. Sky bands `#FCE6D8` / `#E9E3F6` / `#D8E7FA`; cloud road `#FFFFFF` / `#9DB8D8`, scalloped outline.
**Topology:** F14's engine, W **32** (G2 floor), stones as pills 64 × 48.
**Labels:** numerals Baloo 2 700 26 px ("100" ≈ 45 px wide *est.*). Decoys: n + 10 (wrong step), n + 15 (skip), n − 5 (repeat), n ± 1 (off by one), 105 / 110 at the hundred; ≥ 60 % of decoys end in 0 or 5 (so "ends in 0 or 5" does not solve it).
**Config d2** `{mode:'skip-5', gen:'braid-stations', W:32, pill:[64,48], seq:[5,100], step:5, decoyMin:12, zeroFiveShare:0.6, mouths:['BC','TR']}`; d1 `{step:10, seq:[10,100]}`; d3 `{step:10, seq:'off-decade start within 1000, 20 stops'}`. **By 2s never ships** (not 2.NBT.A.2).
**Verify:** F14's list + 0/5 share ≥ 0.60 (**UNKNOWN, the engineer measures**). mB d2 100/100: decoys 15.7, live 0.73.
**Query face:** skip counting maze (en's strongest math head); de "Mathe-Labyrinth 2. Klasse"; title always says skip counting / math (DIBELS trap).

### F16 : Addition Maze: Sums That Make 10 (G1, CODE `mode:'make-10'`, G1-427)
**Move:** step only on stones whose sum is 10; compute at each junction.
**Scene (A §16, CR zoo + FN):** a dusty savanna with sandstone slabs. Start `zoo animals/giraffe` h 110 at **BR**; goal `tree/baobab` h 150 at **TL**. Islanders: `zoo animals/zebra`, `zoo animals/elephant`, `zoo animals/rhinoceros`, `zoo animals/meerkat`, `birds/ostrich`, `zoo animals/gazelle`. Sky band `#FBEBD0`; ground `#E9C98A`; clay track `#F6D9BE` / `#C88E5F`.
**Topology (B 3.16):** looped, PREDICATE stones = slabs **96 × 52** (C), r 104, W **36**, route 10 + 2 mouths, branches 8, loops 5.
**Labels:** "a + b" Baloo 2 700 28 px, thin spaces round +. Route = true facts (a + b = 10, a, b ∈ 0-10, commuted pairs distinct, never 10 + 0 twice); decoys = sums 9 or 11 sharing an addend with a true pair. Rule badge: teal disc Ø 56 with "10" white 30 px beside the start disc, printed once.
**Config d2** `{mode:'make-10', gen:'braid-pred', r:104, W:36, slab:[96,52], route:10, loops:5, target:10, decoyMin:10, mouths:['BR','TL']}`; d1 `{route:6, decoyMin:6}`; d3 `{target:[12,15], route:12}`.
**Verify:** decoys ≥ 10 · P1 a/b/c · no decoy sum = target · route and decoy glyph boxes ± 2 px · clearance ≥ 53. mB d2 97/100: decoys 13.3, paths 16.4, shortest 8.6 vs 12, live 0.71.
**Query face:** math maze 1st grade / addition maze; de "Rechenlabyrinth 1. Klasse"; es "laberinto de sumas para primer grado"; fr "labyrinthe maths CP".

### F17 : Subtraction Maze Within 20 (G1, CODE `mode:'subtract-20'`, G1-428)
**Move:** step only on differences equal to the target number (seeded 5-9).
**Scene (A §17, FN only):** a candy land. Start `bakery/gingerbread_man` h 90 at **BC**; goal `desserts and sweets/cake` h 90 at **TL**. Islanders: `desserts and sweets/cupcake`, `donut`, `lollipop`, `ice_cream`, `candy_cane`, `macaron`, `popsicle` (all `desserts and sweets/`; one gingerbread on the page). Ground `#CDEEDF`; icing drips `#F9D3E0`; ribbon `#FDE6EE` / `#E5A2BA`.
**Topology:** F16's engine; stones as pills 104 × 52.
**Labels:** "a − b" with U+2212, a 11-20, b 2-9; decoys = target ± 1 and the ones-swap error. Rule badge with the target, printed once.
**Config d2** `{mode:'subtract-20', ...F16, slab:[104,52], target:[5,9], minuend:[11,20], subtrahend:[2,9], mouths:['BC','TL']}`; d1 `{within:10, route:6}`; d3 `{route:12, twoStep:true}`.
**Verify:** F16's list with the subtraction predicate. mB: same topology as F16.
**Query face:** subtraction maze; es "laberinto de restas"; de "Rechenlabyrinth Minus".

### F18 : First-Sound Maze (K, CODE `mode:'first-sound'`, K-412)
**Move:** step only on picture cards whose name starts with the same SOUND as the hero's name. No words on the cards.
**Scene (editor ruling on conflict 2):** a market square from above. **Hero `zoo animals/lion` in all 11 locales** (pedagogy, m: L in all 11, a continuant; sheet read: rosy-cheeked CR, the same family as A's critters). A's per-locale pet rotation is dropped (it breaks "one scene in all 11 locales"). Start TR (B), goal `At the Supermarket/basket` h 72 at **BL**. Scene cast = lion + basket + drawn awnings (rect + 5 scallops `#F28A72` / `#FFF1E6`) and tiles `#E8C9A7` / `#E2BF9A`; no islander drawings (the cards ARE the page's pictures). Cards (lead note 5): apparatus, cream discs Ø 72 `#FFF9EF`, picture 56, from CR + FN families only (never FO machines or house objects), no picture with text (`At the Supermarket/salt`, `cereal` (a face), any refused-on-sight item).
**Topology (B 3.18):** looped PREDICATE cards, r 98, W **44**, route 9 good cards + 2 mouths, branches 9, loops 5, decoys ≥ 12.
**Labels:** route cards = words from the locale's L pool (pedagogy §3: en 29 · de 26 · es 28 · pt 30 · fr 30 · it 32 · nl 24 · sv 25 · da 30 · no 29 · fi 60); decoys from the safe-distractor pool with ≥ 3 words that CONTAIN the sound later (ball, Ball, ballena) so letter-spotting in a word fails; all decoys stop-consonant or vowel onsets.
**Layout:** T2: frame 640 + gap 12 + strip 64. Strip: the lion card (Ø 64, teal edge) · a mouth-and-sound glyph (3 nested arcs 4 px teal). **No letter chip at d2** (editor: RF.K.2.d is a sound task and P5 keeps one cue; d1 adds the chip "L l" as support).
**Config d2** `{mode:'first-sound', gen:'braid-pred', r:98, W:44, card:72, route:9, loops:5, decoyMin:12, hero:'zoo animals/lion', sound:'L', containsLater:3, mouths:['TR','BL'], strip:'sound'}`; d1 `{route:6, decoyMin:8, chip:true}`; d3 `{hero:'zoo animals/panda', sound:'P', bDecoys:4}`.
**Verify:** exactly 1 valid path (every interior card in the L set) · P1 a/b/c · ≥ 3 contains-later decoys · every card picture in `data/hm/catalog.js` family CR or FN · no text pictures · per-locale card refusals applied. **mC at the shipped 640 frame with B's TR → BL mouths: 71/100** (mC at 700: 44/100; mB 49/100 at 700 with other mouths).
**Screen:** Check = goal AND every inked interior card in the set; the first wrong card ringed red + `mzLookAtRing`.
**Query face:** beginning sounds maze (generic head + "first sounds").

### F19 : Math Maze Within 100: Running Total (G2, CODE `mode:'running-total'`, G2-393)
**Move (lead note 1, replaces the lock's arrow face):** start with a number; every sign on the road changes it (+10, −5 …); keep a running total; only one route brings exactly the goal number.
**Scene (editor ruling on conflict 1: A's building site KEPT, story re-cut for a running total):** a building site with dirt roads. Start **`vehicles/dump_truck`** h 72 at **R** with a start badge "34" (teal disc Ø 52, 26 px white); goal **`vehicles/crane`** h 90 at **L** with a goal badge "60". The total is the truck's load of bricks: each sign is a stop that loads (+) or unloads (−); the crane needs exactly 60. Islanders: `vehicles/excavator`, `vehicles/cement_mixer`, `vehicles/forklift`, `vehicles/bulldozer`, `camping/log`, `camping/rock`; 3 gravel heaps `#BDB4A6`, a striped barrier rail `#F2B13A`. Road `#F7EBD3` / `#B48F5C`. (A's teal arrows are gone; FO vehicles only, no critters.)
**Topology (B 3.19):** looped OP stones (pills 68 × 44) + a dashed total circle Ø 38 beside each (paper-only), r 104, W **32**, route **8 ops** + 2 mouths (6 ops pass 9/100, 8 ops 79/100, mB), branches 7, loops 5.
**Labels:** start 20-60; route ops from {+10, −10, +5, −5, +2, −2, +1, −1}, every running total within 0-100; off-route stones random ops in the same style.
**Config d2** `{mode:'running-total', gen:'braid-ops', r:104, W:32, pill:[68,44], ops:8, opSet:'±10±5±2±1', start:[20,60], range:[0,100], loops:5, totals:'paper', mouths:['R','L']}`; d1 `{ops:4, opSet:'±10'}`; d3 `{ops:8, opSet:+'±20±9'}` (d1/d3 UNKNOWN).
**Verify:** exactly 1 simple path ends on T · ≥ 4 paths · P1 b/c · no path hits T before its last stone · **the shortest path ends within ±1/±2/±5/±10 of T (a near miss; mB 19 % of accepted builds ≈ 15 % of seeds: a seed-scan gate)** · out-of-range paths ≤ 2 %. mB d2 79/100.
**Screen:** Check = goal AND the running total of inked ops = T (the circles are paper-only).
**Query face:** math maze 2nd grade; de "Rechenlabyrinth 2. Klasse"; es "laberinto de sumas y restas para segundo grado"; fr "labyrinthe maths CE1"; nl "rekendoolhof groep 4".

### F20 : Maze Colouring Page (K, CODE `mode:'maze-colouring'`, K-413)
**Move:** solve a wide B&W maze, colour the whole correct road inside its edges, then colour the picture. Route, then fill within a band.
**Scene (A §20, B&W only, `data/fdx/catalog.js`, all srcs present, m):** a beach. Start `beach bw 2/crab` h 70 at **BC**; goal `beach bw 2/sandcastle` h 140 standing on the sand at **TR**, just under the sea band. Supporting: `beach bw/parasol`, `beach bw/beach_ball`, `beach bw/bucket`, `beach bw/palm_tree` (scaled 170), `beach bw/sun` (sky), `beach bw/starfish`, `beach bw 2/boat` (afloat on the sea band), `sea life bw/fish` (in the sea band). Never colour art on this page (never mix B&W and colour). Excluded by catalog flags: `beach bw/seashell*`, `beach bw/anchor`.
**Drawn (line only, ink `#3A3530` 2.5 px, no fills):** sea band 76 at the top with 3 wave lines; sand = blank paper + 12-16 dot triplets; corridor = two parallel ink lines W 56 apart, rounded joins, interior blank. Markers drawn as 2.5 px ink outlines (colourable).
**Topology (B 3.20):** organic tree, r 104, W **56** (a crayon fits), route 9-12, branches 4 (size 2-4), fill 0; dead ends at full W.
**Config d2** `{mode:'maze-colouring', gen:'tree', r:104, W:56, route:[9,12], branches:4, art:'bw', paint:'outline', mouths:['BC','TR']}`; d1 `{r:135, W:64, route:[7,9]}` (mB 68/100); d3 `{r:92, W:48, route:[13,16]}` (mB 30/100).
**Verify:** dead 4-5 · tempting ≥ 1 · wf ≤ 0.60 · tort ≥ 1.5 · no colour fill on the page · every art src in `data/fdx/catalog.js` and none flagged · the goal sprite below the sea band. mB d2 73/100: route 10.3, wf 0.46 / 0.47.
**Key:** the route band filled coral at 55 % between its ink lines.
**Query face:** maze colouring page; nl "doolhof kleurplaat"; fi "sokkelo värityskuva"; es "laberinto para colorear".

### Dissimilarity proof (every face: own setting, hero, layout, d2 config, query face)

| # | mode | setting | hero → goal | gen · mouths | frame / box | W | d2 signature | query face |
|---|---|---|---|---|---|---|---|---|
| 1 | base | autumn orchard | hedgehog → apple tree | tree · BL→TR | 716 = 76 + 640 | 44 | route 11-15, 6-9 dead | picture maze |
| 2 | first-maze | spring park | puppy → ball | tree · L→R | 76 + 640 | 72 | route 5-7, 2 dead | mazes for preschoolers |
| 3 | big-maze | rainforest floor | orangutan → banana tree | tree · BR→TL | 76 + 640 | 36 | route 22-28, 11-18 dead | maze puzzles for 1st grade |
| 4 | river | garden stream | toy boat → teddy on dock | tree · TL→BR | 76 + 640 | 52 | chain ≥ 2.5, water | river maze |
| 5 | burrow | ant colony underground | ant → berry store | layers · TR→BL | 716 | 40 | 3 levels, ≥ 1 up, ≥ 1 dead shaft | underground maze |
| 6 | shortest-way | small town | tow truck → green car | lattice · L→R | 640 + strip | 40 | unique shortest + box | town / shortest way |
| 7 | babies-mothers | summer hayfield | chick, calf, foal → mothers | forest · top×3→bottom×3 | 716 | 44 | 3 trees, derangement | babies and mothers |
| 8 | tangled-lines | windy hilltop | fox, raccoon, squirrel, badger → kites | strands · bottom×4→top×4 | 716 | 10-12 | 8-10 crossings, boxes | tangled lines |
| 9 | collect | vegetable garden | rabbit → bucket | braid · BL→TR | 640 + strip | 36 | 4 items on cycles | collect the items |
| 10 | avoid | Arctic sea ice | polar bear → igloo | braid · BL→R | 640 + strip | 36 | 4-5 obstacles, hitting set | avoid the obstacles |
| 11 | abc-capitals | night space | rocket → moon | stations · BL→TC | 700 | 44 | A-Z caps, 4 length classes | alphabet / ABC maze |
| 12 | abc-lowercase | coral reef | clownfish → coral | stations · TL→BR | 700 | 44 | a-z lower, reversals | letter maze |
| 13 | letter-hop | meadow honeycomb | bear → honey | hex 7×7 · free | 716 | n/a | run of 14 from mid | ABC order maze |
| 14 | numbers-20 | alpine valley | train → cabin | stations · L→TR | 700 | 44 | 1-20 | number maze 1-20 |
| 15 | skip-5 | dawn sky | hot-air balloon → rainbow | stations · BC→TR | 700 | 32 | 5-100 by 5s | skip counting maze |
| 16 | make-10 | savanna | giraffe → baobab | predicate · BR→TL | 700 | 36 | sums = 10 | addition / math maze G1 |
| 17 | subtract-20 | candy land | gingerbread man → cake | predicate · BC→TL | 700 | 36 | differences = target | subtraction maze |
| 18 | first-sound | market square | lion → basket | predicate · TR→BL | 640 + strip | 44 | L cards | beginning sounds maze |
| 19 | running-total | building site | dump truck → crane | ops · R→L | 700 | 32 | 8 ops, total = T | math maze 2nd grade |
| 20 | maze-colouring | beach (line art) | crab → sandcastle | tree · BC→TR | 76 + 640 | 56 | B&W outline corridors | maze colouring page |

Twenty settings, twenty start heroes (no species twice as a hero: the only rabbit hero is F9; F14's camping rabbit is an islander), twenty goals. Mouth pairs: BL→TR ×2 (tree, braid), L→R ×2 (tree, lattice), TL→BR ×2 (tree, stations), BR→TL ×2 (tree, predicate), TR→BL ×2 (layers, predicate), BC→TR ×2 (stations, tree); every other pair once.

## 4 Native rebuild plan x11

Per locale the panel authors: **20 titles + 20 instructions** (whole sentences, story nouns from `image-vocabulary.js` with the locale's article and case; nothing templated) · **20 tap instructions** `mz-<mode>` (in `i18n/interactive-instructions.json` AND the bank, the b7 two-places trap; the parity gate checks both) · **13 runtime chrome strings** `mzGoBack`, `mzKeepGoing`, `mzLookAtRing`, `mzMissed`, `mzTwice`, `mzAvoid`, `mzShorter`, `mzWrongHome`, `mzWaysHere`, `mzPathN` ({n}), `mzAt` ({n}), `mzDeadEnd`, `mzAtGoal` (fi / de write case-safe whole frames, e.g. fi "Perillä!" rather than a templated illative) · rail `slug` + `name` · `topicMeta['maze-puzzles']` ≥ 50 chars · skill `full` + `short`. Strand literals: the rows already exist (§1). **Alphabets** come from `COLLATION[loc].strip` (no authoring; the panel confirms its row). **F18:** the panel OPENS every card picture of its L pool on a contact sheet and refuses (never renames) any card a five-year-old would name otherwise (`REFUSED_CARDS[loc]`), and confirms the decoy pool. **Numbers** are numerals only; no number words on the apparatus.

| loc | alphabet / case (F11 F12 F13) | F18 L pool (m, pedagogy) | operator / rule words the instructions need | traps |
|---|---|---|---|---|
| en | A-Z; caps / print lowercase | 29 | "count by 5s", "make 10", "take away" | never "easy / hard / giant / animal / fruit maze", never "maze worksheet"; G2 titles say math / skip counting (DIBELS "maze"); "a to z" |
| de | A-Z (26); caps / Kleinbuchstaben; F11 F12 F14 band 1. Klasse | 26 | "in Fünferschritten", "verliebte Zahlen", "Minusaufgaben" | no "Arbeitsblatt"; not "einfaches Labyrinth"; nouns capitalised; V never a sound target |
| es (MX) | A-Z + Ñ (27) | 28 | "de 5 en 5", "sumas que dan 10", "restas" | MX register (preescolar, primer grado); no "ficha"; not "fácil" as a head; b/v, s/z/c never targets |
| pt (BR) | A-Z (26) | 30 | "de 5 em 5", "somas que dão 10", "subtrações" | BR register; "atividade" may lead, "folha" never; no vowel targets |
| fr | caps (GS) / **cursives (CP)** | 30 | "de 5 en 5", "compléments à 10", "soustractions" | no "fiche"; silent h; F12 says "lettres cursives"; NBSP before `:` `?` `!` |
| it | 21 letters; F11 F12 F14 classe prima | 32 | "di 5 in 5", "amici del 10", "sottrazioni" | no "schede"; soft c / g never targets |
| nl | A-Z (26), IJ not an order letter; F11 F12 groep 3 | 24 | "sprongen van 5", "verliefde harten", "minsommen" | no "werkblad"; g/ch, v/f, z/s never targets |
| sv | A-Ö (29) | 25 | "hoppa 5 steg", "tiokamrater", "minus" | no alphabet / number demand: generic head + face tail; k/g/s/j never targets; «grupp» unusable [NSR] |
| da | A-Å (29: Æ Ø Å) | 30 | "5-tabellen", "tiervenner", "minus" | generic head + tail; hv / hj words never V / J targets [NSR] |
| no | A-Å (29: Æ Ø Å) | 29 | "telle med 5", "tiervenner", "minus" | bokmål; kj / sj / gj never targets; F2 level key `1-trinn` with "barnehage" in the title [NSR] |
| fi | A-Ö (29) | 60 | "viiden välein", "kymppiparit", "vähennyslaskut" | case agreement: the panel writes "A:sta Ö:hön"; loan onsets b g f never targets; "sokkelo värityskuva" is F20's head [NSR] |

Every panel OPENS one render of every face in its locale (print + screen + key) and signs, per face: (a) the instruction names only what is on the page; (b) the hero and goal nouns are what a child in that country calls the pictures; (c) on F11 / F12 / F13 the alphabet order is the school's; (d) on F18 every route card starts with the hero's sound and no decoy does. **Recorded refusals at design time: none.** Re-targets: fr F12 → cursive (CP); de F11 F12 F14 → 1. Klasse; it F11 F12 F14 → classe prima; nl F11 F12 → groep 3.

## 5 Data + gates

`data/b8/maze-puzzles.js` (locale-neutral, hand-authored) + `data/b8/locales/maze-puzzles.<loc>.json` GENERATED from `i18n/.draft-b8-<loc>.json` by `tools/apply-b8-locale.js` after `tools/validate-b8-draft.js` (both cloned from b7 by `tools/_clone-b7-spine.js`), read through `lib/b8-common.js bank('maze-puzzles', loc)` (throws on a missing literal, never an en fallback). `apply-b8-locale.js` writes BOTH `strings.<mode>` AND `i18n/strings.<loc>.json[<ID>]`; `tools/check-b8-string-parity.js` asserts they are identical. `data/` is gitignored: `git add -f`.
```
// data/b8/maze-puzzles.js
module.exports = {
  MODES: ['base','first-maze','big-maze','river','burrow','shortest-way','babies-mothers','tangled-lines','collect','avoid',
          'abc-capitals','abc-lowercase','letter-hop','numbers-20','skip-5','make-10','subtract-20','first-sound','running-total','maze-colouring'],
  LANE_FLOOR: { PreK:72, K:44, G1:36, G2:32 },                    // page px
  STACK: 716, FRAME: { T1:716, T2:640 }, STRIP: 64, GAP: 12,       // body 733 at the tallest chrome
  SNAP_PAGE_PX: 90, ADVANCE: 0.92, K_BUILDS: 150,
  SCENES: { /* per mode: start, goal, islanders[], scenery fills, corridor paint, mouths, keep-outs: data/hm/scenes.js */ },
  CONFIG: { /* per mode: d1, d2, d3 exactly as §2 / §3 */ },
  F7_PAIRS: { d2:['chick-hen','calf-cow','foal-horse'], d3:['lamb-sheep'] },
  F8: { holders:['fox','raccoon','squirrel','badger'], holderD3:'beaver',
        goals:['spring/kite','beach/kite','Things That Fly/kite','Things That Fly/balloon'], goalD3:'toys/balloon' },
  F18: { hero:'zoo animals/lion', sound:'L', heroD3:'zoo animals/panda', soundD3:'P', cardFamilies:['CR','FN'] },
};
// data/hm/review.js (committed, human): { REFUSED_DRAWINGS: [...A's refused-on-sight list], REFUSED_CARDS: { <loc>: [vocabKey] } }
// data/b8/locales/maze-puzzles.<loc>.json
{ "rail": {"slug":"…","name":"…"}, "topicMeta": "…", "skill": {"full":"…","short":"…"},
  "strings": { "<mode>": {"title":"…","instruction":"…"} ×20 },
  "tap": { "mz-<mode>": "…" ×20 }, "runtime": { "mzGoBack":"…", … 13 } }
```

**`tools/validate-b8-draft.js` (`maze-puzzles` block; exit 1 on any):**
1. `strings` keys === the 20 MODES; every title ≤ 70, no worksheet word (`Arbeitsblatt`, `ficha`, `fiche`, `folha`, `schede`, `werkblad`, `worksheet`, …), no free-claim (`scripts/lib/free-claim.js` MUST_FIRE), unique within the locale against EXISTING strings incl. the grid family K-242 / K-270 / K-271 / K-272 titles.
2. **Grid-head ban:** no title contains the locale's twin of "easy / hard / giant / animal / fruit maze" or equals the bare maze word or "maze worksheet" (per-locale pattern list in the validator, each poison-tested both ways: "Baby Animals Maze" FIRES on "animals maze", "Babies and Mothers on the Farm" PASSES). Letter-boundary regex `(?<!\p{L})…(?!\p{L})`, never `\b`.
3. G2 titles (skip-5, running-total) contain the locale's math / skip-count word; the en base and F3 titles do not contain "maze worksheet".
4. Instruction ≤ 150, at most two short sentences, names the hero (vocab form), names only apparatus on the face (stones, cards, items, signs, boxes, the colour task only on F20), never names a letter / number that is the answer, never "the path with …".
5. `tap` 20 keys, each ≤ 150 and containing the locale's drag / draw verb; `runtime` 13 keys non-empty; `{n}` / `{goal}` slots only where declared.
6. `rail.slug` ASCII `^[a-z0-9-]+$`, not equal to and not prefixing any `axes.*` slug (incl. `mazes` ×11); `rail.name` ≠ the grid family's rail name.
7. F11 F12 F13: the locale's `COLLATION[loc].strip` length ∈ {21, 26, 27, 29} and every letter resolves in `letter-strokes.js glyphFor` (fr F12: the cursive font carries it); F18: the L pool after `REFUSED_CARDS` ≥ 2 × route (≥ 18) and the decoy pool ≥ 3 × decoys.
8. Scene-level (over `data/hm/scenes.js`): every drawing exists in `cache/themes/<theme>/<noun>@3x.webp` (colour faces) or `data/fdx/catalog.js` (F20); no drawing in `REFUSED_DRAWINGS`; no noun twice in one scene; every colour face's cast in ONE style family + FN props (`data/hm/catalog.js`); F20 only B&W srcs, every colour face no B&W src (BW test `bw(\s+\d+)?$`, never bare `bw$`).
9. Hero / goal pairs pairwise distinct across the 20 modes; no two modes share (gen, start slot, goal slot); no ordered mouth pair > 2 times.
10. No visible free-word; no string promises an answer key on the print page.

**`qa/verify-b8-maze-puzzles.js` (render-measuring; base + 19 faces × 11 locales × d2 × 20 seeds + the shipped seed, through `render/render-instance.js` with `interactive:true`, at the 733 tallest-chrome body):**
- (a) `verify()` empty; `qa/lints.js` clean (no overflow, no text < 9 px, palette); print page, screen page and key built from one meta (`sameAs`).
- (b) **Structure:** tree faces |E| = |V| − 1 and connected per start; looped faces: exhaustive simple-path search, exactly 1 valid; F8 schedule gates; F13 hex adjacency recomputed from the polygons = declared.
- (c) **Raster oracle v2 (B 5.1):** analytic clearance (non-adjacent centrelines ≥ W + 17; stones ≥ stoneR + W/2 + 8 from non-incident corridors); rendered corridor mask vs declared mask (no region > 20 px outside a 2 px dilation, none missing inside a 2 px erosion); flood fill start → goal on the mask; stones on their own layer.
- (d) **Quality gates (§3 per face):** stubs, depth share, tempting, side share ≤ 0.60 and same-run ≤ 2, wall-follower (worst hand) per band, tortuosity, max straight run, start and goal on different chains, P1 a/b/c on looped faces, decoy floors, near-miss share.
- (e) **Floors:** lane ≥ `LANE_FLOOR[band]` measured on the rendered page; stones K Ø 56 / glyph 30, G1 slabs 52 tall / glyph 28, G2 pills 44-48 / glyph 22-26; library art the child must recognise ≥ 56 px; nothing < 9 px.
- (f) **Print:** corridor L ≥ 0.88; fill vs field ΔL ≥ 0.10; edge vs fill ΔL ≥ 0.25; mean frame ink ≤ 0.30 (F11 measured on the toned sky); F20 no fill pixel other than paper and ink.
- (g) **No answer printed:** 0 route marks on print and screen; boxes (F6, F8) and total circles (F19) empty; no letter / numeral / card styled differently on the route (glyph box ± 2 px, one style object); the key carries exactly the route (coral, on the edge samples), ringed route stones, filled boxes and totals, route colours on F7 / F8.
- (h) **Interactive:** `trace-path` bundle = the declared graph (nodes, edges with ≈ 11 samples of the DRAWN curve, routes, rule); the robot (`trace-robot.js` promoted to `qa/verify-trace.js`) at 360 / 768 / 1024: CONTROL solution → pass; straight drag across walls → fail; dead end → fail; dead end + retract + finish → pass; per-face rule violation → fail (F9 skip an item, F10 through an obstacle, F11 a decoy stone, F19 a wrong total, F6 a longer route); multi-start tips ≥ 140 px apart.
- (i) **Stack:** 716 on every face; ≤ 733 with the tallest locale chrome; the title strip ≤ 2 lines in de / fi / pt / fr.
- (j) **Pooled at 400 seeds per face** (raise the sample, never the threshold): correct-branch side share per side within 0.25-0.60; route length and dead-end counts inside the face's band on ≥ 95 % of accepted seeds; the shipped seed listed with its full metric row in `_work/K-405-build.md`.

**Poisons (each must FAIL for its OWN reason; the accepted build / the correct EN draft is the control):**

| # | poison | caught by | evidence |
|---|---|---|---|
| T0 | control: accepted base tree | must PASS oracle A + B | mB 78/78 |
| R1 | page draws an undeclared corridor between two close non-adjacent nodes | oracle B | mB 78/78 |
| R2 | page omits one route corridor | oracle B + reachability | mB 78/78 |
| R3 | corridors × 2.3 wide (walls merge) | oracle B | mB 78/78 |
| R4 | scene art in corridor colour bridging two corridors | oracle B | mB 78/78 |
| R5 | looped page with an extra drawn shortcut | oracle B | mB 100/100 |
| R6 | declared geometry too tight (clearance W + 30 spacing removed) | oracle A | mB 78/78 |
| L1 | every left branch pruned (one-sided maze) | side / wall-follower gates | mB 78/78 |
| L2 | a 1-edge leaf hung on a route junction | stub gate | mB 34/34 |
| L3 | a decoy carries the NEXT letter beside a route stone | forward lint | mB 99/99 |
| L4 | two route letters swapped | DFS (0 valid runs) | mB 100/100 |
| L5 | all loop edges removed | P1 a/b | mB 100/100 |
| L6 | all loop edges removed | P1 c (live < 0.5) | mB 100/100 |
| L7 | a stone drawn on another corridor | oracle B stone layer | mB 99/99 |
| F6p | a removed street restored giving a second shortest | BFS count | mB 100/100 (control 100/100) |
| F9p | an item moved onto a dead-end spur | search (0 valid) | mB 84/84 |
| F10p | one obstacle removed | search (2 safe paths) | mB 86/100 pre-minimality, 100 after |
| F19p | an off-route op retuned so a second path lands on T | search | mB 60/60 (control 72) |
| F8p1 / F8p2 | identity permutation / same pair crosses twice in a row | schedule gates | mB caught |
| F5p | all shafts on the route point down (no UP move) | level-change gate | to measure (engineer) |
| F7p | the derangement replaced by identity (each baby above its mother) | derangement gate | to measure |
| F13p | the run's next letter placed beside a route cell | forward lint | to measure |
| S1 | en F7 title "Baby Animals Maze on the Farm" | validator 2 (grid head "animal maze") | draft control |
| S2 | de F1 title "Labyrinth-Rätsel Arbeitsblatt: Igel" | validator 1 (worksheet word) | draft control |
| S3 | en F15 title "Skip Counting by 2s Maze" with config step 2 | validator 3 + config (2s never ships) | draft control |
| S4 | sv F11 alphabet given as 26 letters | validator 7 (length class) | draft control |
| S5 | F18 card `At the Supermarket/salt` (baked text) | validator 8 (REFUSED_DRAWINGS) | draft control |
| S6 | F20 scene with a colour `beach/crab` | validator 8 (BW / colour mix) | draft control |
| S7 | F3 scene with `zoo animals/gorilla` next to the orangutan AND F8 holder `forest creatures/rabbit` | validator 8 (noun) / 9 (hero repeat across modes) | draft control |
| S8 | F19 instruction "Follow the path that ends at 60: +10, −1, +5 …" | validator 4 (prints the route) | draft control |

**Page reads:** `data/hm/scenes.js`, `data/hm/catalog.js`, `data/hm/review.js`, `bank('maze-puzzles', loc)`, `COLLATION`, `letter-strokes.js`, `vocab()` + `excluded` + `displayWord` (`b2-common.js`), `picture-refusals.js`, `data/fdx/catalog.js` (F20 only). NEVER `entriesFor(theme)` for scene casts, `b3-picture-index`, or any picture outside the pinned scene and the F18 pool.

## 6 SEO plan

Titles: the panels rewrite from the §1 heads, ≤ 70 chars, no worksheet word, no "free", never a grid-family head; non-EN never a translation of the en title. Candidates below (Germanic en / de / nl · Romance es / pt / fr / it · Nordic sv / da / no + fi). Meta MIDDLE (en) = the child's task; the whole meta measured into 120-170 by `tools/measure-instruction-window.js`.

| face | title candidates | meta MIDDLE (en) | level (en) |
|---|---|---|---|
| base | Picture Maze: Help the Hedgehog Reach the Apple Tree · Labyrinth-Rätsel: Der Igel und der Apfelbaum · Doolhofpuzzel: help de egel naar de appelboom · Laberinto para niños: el erizo y el manzano · Labirinto infantil: o ouriço e a macieira · Jeu de labyrinthe : le hérisson et le pommier · Labirinto per bambini: il riccio e il melo · Labyrint för barn: igelkotten och äppelträdet · Labyrint for børn: pindsvinet og æbletræet · Labyrint for barn: pinnsvinet og epletreet · Labyrintti lapsille: siili ja omenapuu | Help the hedgehog through the autumn orchard: plan the way past six dead ends and draw one line from the start to the apple tree | kindergarten |
| F2 | My First Maze for Preschoolers: Puppy and Ball · Mein erstes Labyrinth: Kita und Vorschule · Mijn eerste doolhof voor peuters · Mi primer laberinto para preescolar · Labirinto de coordenação motora: o cachorrinho · Mon premier labyrinthe : maternelle MS · Il mio primo labirinto: scuola dell'infanzia · Min första labyrint: förskola · Min første labyrint: børnehave · Min første labyrint: barnehage · Ensimmäinen labyrinttini: varhaiskasvatus | One very wide road and only two wrong turns: the puppy runs to its ball while small hands practise drawing inside the lines | preschool |
| F3 | Big Maze Puzzle for 1st Grade: Jungle Explorer · Großes Labyrinth-Rätsel 1. Klasse: Dschungel · Grote doolhofpuzzel groep 3: de jungle · Laberinto grande para primer grado: la selva · Labirinto grande 1º ano: a floresta · Grand labyrinthe CP : la jungle · Labirinto grande classe prima: la giungla · Stor labyrint åk 1: djungeln · Stor labyrint 1. klasse: junglen · Stor labyrint 2. trinn: jungelen · Iso labyrintti 1. luokka: viidakko | A long jungle route with deep dead ends that need backtracking: look first, then draw the orangutan's way to the banana tree | grade-1 |
| F4 | River Maze: Sail the Boat to the Teddy Bear · Fluss-Labyrinth: Das Boot zum Teddy · Rivierdoolhof: vaar de boot naar de teddybeer · Laberinto del río: el barquito y el osito · Labirinto do rio: o barquinho e o ursinho · Labyrinthe de la rivière : le bateau et l'ourson · Labirinto del fiume: la barchetta e l'orsetto · Flodlabyrint: båten och nallen · Flodlabyrint: båden og bamsen · Elvelabyrint: båten og bamsen · Jokilabyrintti: vene ja nalle | Keep the boat in the water: follow the curving stream past its side arms to the dock where the teddy bear waits | kindergarten |
| F5 | Underground Maze: The Ant's Tunnels · Labyrinth unter der Erde: Ameisengänge · Doolhof onder de grond: de mierengangen · Laberinto bajo tierra: los túneles de la hormiga · Labirinto subterrâneo: os túneis da formiga · Labyrinthe souterrain : les galeries de la fourmi · Labirinto sotterraneo: le gallerie della formica · Labyrint under jorden: myrans gångar · Labyrint under jorden: myrens gange · Labyrint under jorden: mauregangene · Maanalainen labyrintti: muurahaisen käytävät | Go down, up and down again through three levels of tunnels to bring the ant to its berry store deep under the ground | grade-1 |
| F6 | Town Maze: Find the Shortest Way · Stadt-Labyrinth: Finde den kürzesten Weg · Stadsdoolhof: zoek de kortste weg · Laberinto de la ciudad: el camino más corto · Labirinto da cidade: o caminho mais curto · Labyrinthe de la ville : le plus court chemin · Labirinto della città: la strada più breve · Stadslabyrint: hitta kortaste vägen · Bylabyrint: find den korteste vej · Bylabyrint: finn den korteste veien · Kaupunkilabyrintti: lyhin reitti | Many streets lead to the green car: draw the shortest one for the tow truck and count how many street pieces it drives | grade-1 |
| F7 | Babies and Mothers Maze on the Farm · Labyrinth: Tierkinder finden ihre Mütter · Doolhof: jonge dieren zoeken hun moeder · Laberinto: las crías buscan a su mamá · Labirinto: os filhotes e suas mães · Labyrinthe : les bébés retrouvent leur maman · Labirinto: i cuccioli e le loro mamme · Labyrint: ungarna hittar sin mamma · Labyrint: ungerne finder deres mor · Labyrint: ungene finner mammaen sin · Labyrintti: poikaset etsivät emonsa | Three farm babies, three tangled roads: draw a line from each baby to its own mother without mixing them up | kindergarten |
| F8 | Tangled Lines Puzzle: Whose Kite Is It? · Verflixte Schnüre: Wem gehört der Drachen? · Warrige lijnen: van wie is de vlieger? · Líneas enredadas: ¿de quién es el papalote? · Linhas emaranhadas: de quem é a pipa? · Fils emmêlés : à qui est le cerf-volant ? · Fili aggrovigliati: di chi è l'aquilone? · Trassliga snören: vems drake är det? · Filtrede snore: hvis drage er det? · Floker: hvem eier dragen? · Sotkuiset narut: kenen leija? | Follow each string through the crossings with a finger and write the animal's number in the box beside its kite | grade-1 |
| F9 | Collect-the-Carrots Maze: The Rabbit's Garden · Labyrinth: Sammle alle Karotten · Doolhof: verzamel alle wortels · Laberinto: recoge todas las zanahorias · Labirinto: pegue todas as cenouras · Labyrinthe : ramasse toutes les carottes · Labirinto: raccogli tutte le carote · Labyrint: plocka alla morötter · Labyrint: saml alle gulerødder · Labyrint: plukk alle gulrøttene · Labyrintti: kerää kaikki porkkanat | Plan a way through the vegetable garden that picks up all four carrots and never uses the same path twice | grade-1 |
| F10 | Avoid the Walruses: Polar Bear Maze · Labyrinth: Weiche den Walrossen aus · Doolhof: ontwijk de walrussen · Laberinto: esquiva a las morsas · Labirinto: desvie das morsas · Labyrinthe : évite les morses · Labirinto: evita i trichechi · Labyrint: undvik valrossarna · Labyrint: undgå hvalrosserne · Labyrint: unngå hvalrossene · Labyrintti: väistä mursut | Several trails cross the sea ice, but only one gets the polar bear home without passing a sleeping walrus or thin ice | grade-1 |
| F11 | Alphabet Maze A to Z: Rocket to the Moon · ABC-Labyrinth: Mit der Rakete zum Mond · Letterdoolhof A tot Z: de raket naar de maan · Laberinto del abecedario: el cohete a la luna · Labirinto do alfabeto: o foguete até a lua · Labyrinthe des lettres capitales : la fusée · Labirinto dell'alfabeto: il razzo verso la luna · Labyrint från A till Ö: raketen till månen · Alfabet labyrint fra A til Å: raketten · Alfabet labyrint fra A til Å: raketten · Labyrintti A:sta Ö:hön: raketti kuuhun | At every fork choose the stone with the next capital letter, from A to Z, to fly the rocket to the moon | kindergarten |
| F12 | Lowercase Letter Maze a to z: Under the Sea · Buchstaben-Labyrinth: Kleine Buchstaben im Meer · Letterdoolhof met kleine letters: de zee · Laberinto de letras minúsculas: el mar · Labirinto das letras minúsculas: o fundo do mar · Labyrinthe des lettres cursives : la mer · Labirinto delle lettere minuscole: il mare · Labyrint med små bokstäver: havet · Labyrint med små bogstaver: havet · Labyrint med små bokstaver: havet · Pienten kirjainten labyrintti: meri | Swim the clownfish home by choosing the next small letter at every fork; watch out for b and d, p and q | kindergarten |
| F13 | ABC Order Letter Hop: The Bear's Honeycomb · ABC-Reihenfolge: Buchstaben-Hüpfspiel · Letterdoolhof: de ABC-volgorde vanaf het midden · Salta las letras en orden: el panal · Pule as letras em ordem: a colmeia · Labyrinthe de l'ordre alphabétique : la ruche · Salta le lettere in ordine: il favo · Hoppa i bokstavsordning: bikakan · Hop i alfabetisk rækkefølge: bikagen · Hopp i alfabetisk rekkefølge: bikaken · Hypi aakkosjärjestyksessä: hunajakenno | Start at a letter in the middle of the alphabet and colour the next letter in a touching cell until the run ends | grade-1 |
| F14 | Number Maze 1 to 20: The Little Train · Zahlenlabyrinth bis 20: Die kleine Eisenbahn · Cijferdoolhof tot 20: het treintje · Laberinto de números del 1 al 20: el tren · Labirinto dos números de 1 a 20: o trem · Labyrinthe des nombres de 1 à 20 : le train · Labirinto dei numeri da 1 a 20: il trenino · Labyrint räkna 1-20: tåget · Labyrint med tal 1-20: toget · Labyrint med tall 1-20: toget · Labyrintti numerot 1-20: juna | Count along the railway from 1 to 20, choosing the next number at every fork, to bring the train to the cabin | kindergarten |
| F15 | Skip Counting Maze by 5s: Balloon to the Rainbow · Mathe-Labyrinth 2. Klasse: In Fünferschritten · Rekendoolhof groep 4: tellen met sprongen van 5 · Laberinto de números: cuenta de 5 en 5 · Labirinto matemático: conte de 5 em 5 · Labyrinthe maths CE1 : compter de 5 en 5 · Labirinto matematico: conta di 5 in 5 · Mattelabyrint åk 2: hoppa 5 steg · Matematik labyrint: tæl 5 ad gangen · Mattelabyrint: tell med 5 · Matematiikkalabyrintti: viiden välein | Hop from cloud to cloud counting by 5s from 5 to 100; the wrong steps and off-by-one numbers lead the balloon astray | grade-2 |
| F16 | Addition Maze for 1st Grade: Sums That Make 10 · Rechenlabyrinth 1. Klasse: Verliebte Zahlen · Rekendoolhof groep 3: verliefde harten · Laberinto de sumas para primer grado: dan 10 · Labirinto matemático 1º ano: somas que dão 10 · Labyrinthe maths CP : les compléments à 10 · Labirinto matematico classe prima: amici del 10 · Mattelabyrint åk 1: tiokamrater · Matematik labyrint 1. klasse: tiervenner · Mattelabyrint 2. trinn: tiervenner · Matematiikkalabyrintti 1. luokka: kymppiparit | Help the giraffe across the savanna by stepping only on the sums that make 10; sums of 9 and 11 are traps | grade-1 |
| F17 | Subtraction Maze Within 20: Gingerbread Man · Rechenlabyrinth: Minusaufgaben bis 20 · Rekendoolhof: minsommen tot 20 · Laberinto de restas hasta 20 · Labirinto de subtração até 20 · Labyrinthe des soustractions jusqu'à 20 · Labirinto delle sottrazioni entro il 20 · Mattelabyrint: minus inom 20 · Matematik labyrint: minus til 20 · Mattelabyrint: minus til 20 · Vähennyslaskulabyrintti 20 asti | The gingerbread man may only step on take-aways with the same answer; compute each one within 20 to reach the cake | grade-1 |
| F18 | Beginning Sounds Maze: Start Like Lion · Anlaut-Labyrinth: Wie Löwe · Doolhof met beginklanken: zoals leeuw · Laberinto de sonidos iniciales: como león · Labirinto dos sons iniciais: como leão · Labyrinthe des sons : comme lion · Labirinto dei suoni iniziali: come leone · Labyrint första ljudet: som lejon · Labyrint forlyd: som løve · Labyrint første lyd: som løve · Alkuäännelabyrintti: kuin leijona | Say each picture aloud and step only on the ones that start with the same sound as lion, all the way to the basket | kindergarten |
| F19 | Math Maze for 2nd Grade: Add and Subtract Within 100 · Rechenlabyrinth 2. Klasse: Plus und Minus bis 100 · Rekendoolhof groep 4: plus en min tot 100 · Laberinto de sumas y restas para segundo grado · Labirinto matemático 2º ano: até 100 · Labyrinthe maths CE1 : additions et soustractions · Labirinto matematico classe seconda: entro il 100 · Mattelabyrint åk 2: plus och minus till 100 · Matematik labyrint 2. klasse: til 100 · Mattelabyrint 3. trinn: pluss og minus til 100 · Matematiikkalabyrintti 2. luokka: 100 asti | Keep a running total on every sign the truck passes and find the one road that delivers exactly the crane's number | grade-2 |
| F20 | Maze Colouring Page: Crab at the Beach · Labyrinth zum Ausmalen: Krabbe am Strand · Doolhof kleurplaat: krab op het strand · Laberinto para colorear: el cangrejo en la playa · Labirinto para colorir: o caranguejo na praia · Labyrinthe à colorier : le crabe à la plage · Labirinto da colorare: il granchio in spiaggia · Labyrint att färglägga: krabban på stranden · Labyrint til farvelægning: krabben på stranden · Labyrint til fargelegging: krabben på stranden · Sokkelo värityskuva: rapu rannalla | Draw the crab's way to the sandcastle, colour the whole road, then colour the beach picture | kindergarten |

`coordinate` = `{type:'maze-puzzles', mode:<mode>, theme:'', level:<§1 key per locale with the locale shifts>}`; slug unique per locale; `canonicalDeckSlug` = the deck. h1 = title; strand chip = §1 strand localised; non-EN prose names the framework NAME only (Lehrplan, SEP/NEM, BNCC, programmes officiels, Indicazioni nazionali, SLO kerndoelen, Lgr22, Fælles Mål, LK20, OPS 2014). Every landing says the page has a draw-the-way screen version and an answer key with the route in colour. No visible "free". `topicMeta['maze-puzzles']` ≥ 50 chars ×11.

**Non-cannibalisation** (whole-landing 3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL ≥ 0.80 / WARN 0.65; all *est.*, measured at landing time):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs grid `maze-worksheet` (K-242) | a story scene, curvy roads, a hero with a reason vs a square-cell maze between two icons | 0.10 |
| F2 vs grid `easy-maze` (K-270) | one wide road + 2 wrong turns, pencil control for preschool vs a small square grid | 0.12 |
| F3 vs grid `hard-maze` / `giant-maze` | backtracking through a jungle picture vs a larger square grid | 0.10 |
| F7 vs grid `animal-maze` | three babies, three routes, matching vs one animal icon at each end | 0.09 |
| base vs F3 | 6-9 dead ends, K vs deep dead ends, backtracking, G1 | 0.22 (highest within the corridor faces: keep F3 on BACKTRACKING) |
| base vs F4 / F5 / F20 | orchard vs water arms vs three levels vs colour the road | 0.15-0.18 |
| F11 vs F12 vs F13 | capitals A-Z vs small letters with mirror decoys vs from the middle, colour cells | 0.20 (F11-F12: keep F12 on b/d/p/q) |
| F11 / F13 vs `alphabetical-order` G1-245 | choose a road by the next letter vs sort words | 0.06 |
| F14 vs `dot-to-dot` K-285 | choose a branch by the next number vs join ordered dots | 0.07 |
| F16 vs F17 vs F19 | sums = 10 vs differences = target vs a running total across signs | 0.18 |
| F19 vs Mental Math Level Set / `number-walls` | choose a route by its total vs compute a + b − c / a wall | 0.08 |
| F15 vs F14 | by 5s to 100, G2 vs 1-20, K | 0.14 |
| F8 vs F7 | trace through crossings, no choices vs choose at junctions | 0.16 |
| F9 vs F10 | pass every item vs pass no obstacle | 0.20 (keep the verbs collect / avoid in the h1) |
| F20 vs b7 / colouring families | colour the solved road vs colour a picture | 0.08 |

Boundary sentence on every landing: "These are picture mazes with a story; square-grid mazes, dot-to-dot and word sorting have their own pages."

## 7 Hub visibility contract

A face appears under `maze-puzzles` on `/[locale]/worksheets` IFF all four hold: (1) `apps['maze-puzzles']` exists in `frontend/config/topics-taxonomy.json` with `default_subject:'spatial-reasoning'` (ABSENT today, m); (2) `axes['exercise-type']['maze-puzzles']` has `slug` + `name` in all 11 locales (table B rail slugs and names; ABSENT today, m); (3) exactly one landing per face per locale with `coordinate.type === 'maze-puzzles'` verbatim, `mode` per §3, `theme:''`, the §1 level key, a unique slug and `canonicalDeckSlug` = the deck; (4) deployed. The family joins `INTERACTIVE_PRINTABLE_FAMILIES`.

Gate: `node scripts/verify-hub-type-rows.js --expect=docs/worksheet-gen/b8-designs/hub-expectations.json` HARD in `deploy.sh` (expectations exported by `tools/export-hub-expectations.js --batch=b8`; poison = drop one landing / drop `apps['maze-puzzles']` must FAIL).

**Expected rows per locale:** en 20 · de 20 · es 20 · pt 20 · fr 20 · it 20 · nl 20 · sv 20 · da 20 · no 20 · fi 20 = **220**. No face is refused at design time: the scenes are locale-neutral, every alphabet resolves in `letter-strokes.js` (m), every F18 L pool ≥ 24 (m), fr F12 has its cursive font. Recorded contingencies, each lowering the matrix explicitly if it fires, never padded: (a) a locale whose F18 pool after `REFUSED_CARDS` falls under 18 REFUSES F18 there; (b) if the fr cursive renders a letter illegibly on the PC check, fr F12 re-targets to print lowercase (band stays CP), not a refusal; (c) if L29 (sv da no fi) F11 / F12 cannot meet decoys ≥ 0.55 × N on the shipped seed, the decoy floor for L29 is recorded at the measured value with the critic's sign-off, never silently lowered.
