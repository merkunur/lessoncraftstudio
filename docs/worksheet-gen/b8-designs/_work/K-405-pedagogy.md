# K-405 `maze-puzzles`: PEDAGOGY + CONTENT (studio work file, 2026-10-11)

Role: PEDAGOGY + CONTENT (`_ROLES.md`). Read: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md`, `_ROLES.md`, `../b7-designs/K-395-find-the-differences.md` (house standard), `scripts/worksheet-gen/types/k/K-242-maze.js` + `K-270/271/272` (the grid neighbour: square-cell perfect maze, teal walls, two theme icons, d1 7x8 / d2 9x11 / d3 11x13; K-270/271/272 are the same build pinned to one size).

(m) = measured 2026-10-11 by read-only node. Scratch (session scratchpad): `b8-onsets.js` (onset classes per locale over the COLOUR library), `b8-onsets-k-run.js` (same, K-unsafe themes dropped), `b8-onsets2.js` (letter breakdown + singleton onsets), `b8-theme.js` (per-theme counts), `b8-hero.js` (heroes whose onset is safe in all 11 locales). Inputs: `image-cache/resolve.js manifest()` (100 themes; colour = `bw:false` and name not matching `/\bbw(\s+\d+)?$/i`), `publish-cli/deck-rich-alt.js loadVocab()` (= `REFERENCE TRANSLATIONS/image-vocabulary.js`), `lib/picture-refusals.js refusedPicture`, `lib/b2-common.js excluded` (B2_EXCLUDE), `data/b2/collation.js` (per-locale ORDER alphabets), `data/tracing/letter-sets.js`, `assets/fonts/cursive-fonts.css` (15 vendored cursive units), `_records/harvest-candidates.<loc>.json` ×11. Sheets OPENED: `zoo_animals.png`, `farm_animals.png`. Curriculum bands (section 6) are a framework reading, not a measurement: each panel confirms its row.

---

## 0 Cross-face rulings (load-bearing; every face below obeys them)

**P1. On a LABEL face the label must be the only thing that solves the page.** A tree maze has one physical route, so letters, numbers, sums or pictures printed on it are decoration: a child who solves the maze by eye never reads a label. Every label face (11 12 13 14 15 16 17 18 19, and the rule faces 9 10 6) is built on a graph WITH CYCLES, and three gates hold at d2:
- (a) `labelBlind`: the number of distinct simple start→goal paths ≥ 4 (d2), of which exactly ONE satisfies the face's label rule (proved by exhaustive simple-path search, not by construction).
- (b) `shortestIsWrong`: the physically shortest start→goal path (by node count) is NOT the label route, and the label route is ≥ 3 nodes longer than it. A child who heads straight for the goal must fail.
- (c) `decoysLive`: ≥ 50 % of the wrong branches leaving a route junction physically reach the goal (they are not dead ends). Otherwise "avoid the dead end" solves the page without reading.

**P2. On a CORRIDOR face (1-8, 20) the maze is a tree** (brief Rule 2) and its quality is in the dead ends: ≥ 1/3 of dead ends of depth ≥ 3 nodes; ≥ 2 dead ends whose first 2 nodes move TOWARD the goal (Euclidean distance shrinks) before failing; correct branch side at route junctions balanced (left/right/straight shares each ≤ 60 %, Designer B measures); wall-follower solve share Designer B measures and caps.

**P3. Lane width is a fine-motor floor, not a style choice** (page px; 1 px = 0.265 mm on the 703 px / 186 mm page): PreK ≥ 72 px (19 mm); K ≥ 44 px (11.7 mm); G1 ≥ 36 px (9.5 mm); G2 ≥ 32 px (8.5 mm). A pencil line by a 5-year-old wanders ±3-4 mm; a K lane under 10 mm turns the page into a frustration test of motor control instead of planning. Label stones obey the substrate floors: K element 56 px with glyph ≥ 30 px; G1 44 / 26; G2 36 / 22.

**P4. The story frame is pedagogy.** Every instruction states WHO travels and WHERE ("Help the bee reach the flowers."), then the ONE action ("Draw a line along the way."), then the face's rule if any. ≤ 150 chars. The instruction never names a corridor, colour, letter or number that is not printed, and never states the answer (no "the path with the red flowers").

**P5. One rule per face, stated once.** The child must hold ONE rule in working memory (K working-memory span ≈ 2-3 chunks): "next letter", "pictures that start like lion", "sums that make 10". Never two rules on one page.

**P6. Locale-neutral maze, locale-specific labels.** The scene, the graph and the label SLOTS (which node is route, which is decoy, which decoy class) are one seed for all 11 locales. Only label CONTENT changes (letters from the locale's alphabet, pictures from the locale's sound pool). Exception, measured: full-alphabet faces need a route as long as the alphabet, and alphabets have four lengths (21 it · 26 en de fr pt nl · 27 es · 29 sv da no fi, from `data/b2/collation.js strip`, m), so faces 11 and 12 build ONE maze per length class from the same scene and seed family (4 graphs, not 11).

**P7. The answer is never printed**; the key draws the route in coral; the child's checkable product is the drawn line (plus, on faces 6, 8, 19, small numeral boxes).

**P8. Standards (en only; non-EN prose names the framework NAME, never a code).** Claimed only where the face instantiates the code at d2: 11 + 12 RF.K.1.d (all letters of one case appear and must be identified); 14 K.CC.A.1 (d3 adds K.CC.A.2); 15 2.NBT.A.2 (by 5s and 10s only: 2s are NOT in 2.NBT.A.2, so d2 never skip-counts by 2); 16 + 17 1.OA.C.6; 18 RF.K.2.d; 19 (replacement) 2.NBT.B.5. Faces 1-10, 13, 20: readiness, no code (13 is alphabet ORDER from a mid-point; no K-2 CCSS code names alphabet order, so it is not claimed).

---

## 1 The base and the nineteen faces

Format per face: **Move** · **Child** (en candidate; panels rewrite natively) · **Skill + standard** · **Band** · **d1 / d2 (ships) / d3** · **Why it is right** · **Tells + misconceptions to design out** · **Locale notes** · **Query face**. Hero and goal nouns in the Child lines are placeholders for Designer A's scene; the sentence SHAPE is the ruling.

### F1 BASE: picture maze, help the hero reach the goal
- **Move:** plan a route through a branching corridor maze inside a scene, draw it.
- **Child:** "Help the bee reach the flowers. Draw a line along the way." (≤ 60 chars en; story frame + one action.)
- **Skill:** visual-spatial planning + visual-motor integration. Readiness, no code.
- **Band:** K. Every locale has it at K (de Vorschule/Kindergarten, fr GS, nl kleuters, fi esikoulu).
- **d1:** tree on a jittered 4x5 node grid (20 nodes); route 7-9 nodes; 3-4 dead ends, depth ≤ 2; lane 56. **d2:** 5x6 (30 nodes); route 11-15 nodes; 6-8 dead ends, ≥ 3 of depth ≥ 3; ≥ 4 route junctions; lane 44. **d3:** 6x7 (42 nodes, the prototype); route 16-22; 10-12 dead ends; lane 40.
- **Why:** maze tracing is a classic planning measure (Porteus Maze, WISC Mazes): the child must look ahead and inhibit the impulsive first turn. Drawing within a lane is visual-motor integration, which predicts early handwriting and maths (fine-motor + executive function both carry kindergarten achievement).
- **Tells:** goal must not be visible along a straight corridor from the start; the route must not hug the page border (border-following solves it); start and goal not on the same corridor chain; no dead end visible as a stub (< 1 node deep) at its junction.
- **Locale:** only the sentence; hero/goal nouns from vocab per locale, panel writes the whole sentence (gender, article, case).
- **Query face:** picture maze / "maze activity sheets" + the scene ("bee maze"); never bare "maze worksheet" (grid family).

### F2 my first maze (PreK)
- **Move:** stay inside ONE very wide road; only 2 short choices. Control, not planning.
- **Child:** "Help the duckling get to the pond. Draw a line. Stay on the road."
- **Skill:** visual-motor control (pencil within a band), first left/right choice. Readiness.
- **Band:** PreK (preschool / Kita / preescolar / educação infantil / MS / infanzia / peuters / förskola / børnehave / barnehage / varhaiskasvatus).
- **d1:** 3x3 nodes; route 5-6; 1 dead end depth 1; lane 80. **d2:** 3x4 (12 nodes); route 5-7; exactly 2 dead ends, depth 1-2; lane 72. **d3:** 4x4; route 7-9; 3 dead ends; lane 64.
- **Why:** 3-4-year-olds' pencil control is the limiting factor; a wide lane lets the page reward intention. Two choices are enough to introduce "this way ends".
- **Tells:** both dead ends at the FIRST two junctions (a long dead end later reads as a second maze); route turns ≥ 3 times (a straight road is a tracing page, not a maze); start upper-left, goal lower-right is allowed here (PreK reading direction support).
- **Query face:** "mazes for toddlers / preschoolers", pt "coordenação motora labirinto", es "laberintos para preescolar", nl "doolhof peuters".

### F3 big picture maze (G1)
- **Move:** long route with deep dead ends that require backtracking; plan before drawing.
- **Child:** "Help the explorer find the treasure. Look first, then draw the way."
- **Skill:** planning ahead, backtracking, persistence. Readiness.
- **Band:** G1 (en "maze for 1st graders", de "Labyrinth 1. Klasse", fr CP, nl groep 3).
- **d1:** 6x7; route 18-22; 10 dead ends; lane 40. **d2:** 7x8 (56 nodes); route 24-32; 14-18 dead ends, ≥ 3 of depth ≥ 5, ≥ 2 deep ones heading toward the goal for their first 3 nodes; lane 36. **d3:** 8x9; route 32-40; 20+ dead ends; lane 34.
- **Why:** "look first" builds the plan-then-act habit (executive function); deep tempting dead ends make backtracking necessary and visible.
- **Tells:** solving backward from the goal must not be trivially shorter (goal sits on a junction of degree ≥ 3 at d2); no deep dead end may start within 2 nodes of the goal.
- **Query face:** "maze puzzles for kids", "maze for 1st graders"; never "hard maze" (grid family).

### F4 river maze
- **Move:** long CURVED strokes inside a curved band; few choices, long smooth arcs. Differs from F1 in config: curvature high, chains long, junctions few.
- **Child:** "Help the boat sail to the dock. Keep the boat in the water."
- **Skill:** curved-path visual tracking + continuous curved stroke (pre-writing curves of c, s, o). Readiness.
- **Band:** K.
- **d1:** 3 junctions, 2 dead-end inlets; lane 60. **d2:** 4-5 junctions, 3-4 dead-end inlets each ≥ 1.5 cell long; no straight run > 1.2 cell; mean chain length ≥ 2.5 cells; lane 52. **d3:** 6 junctions, 5 inlets, an island loop is FORBIDDEN (still a tree); lane 46.
- **Why:** continuous curved strokes without lifting the pencil are a recognised pre-writing step after straight strokes; a river reads as "stay in the water" with no extra rule.
- **Tells:** inlets (dead ends) must look like river arms of the same width, not narrow creeks (a width difference tells); the dock must not be reachable by following the widest channel.
- **Query face:** the scene (boat / river maze); "boat maze".

### F5 burrow maze (underground levels)
- **Move:** route must go DOWN and UP between 3 levels through vertical shafts; positional language carries the plan.
- **Child:** "Help the rabbit go down to its bed under the ground. Draw the way."
- **Skill:** spatial levels and positional language (down, up, under, above). Readiness.
- **Band:** G1 (3 levels + reversals of direction); K at d1.
- **d1:** 2 levels, 2 shafts, 3 dead ends; lane 48. **d2:** 3 horizontal levels (surface, middle, deep), 5-6 shafts of which 2-3 are dead-end shafts; route changes level ≥ 3 times including ≥ 1 UP move; 6-8 dead ends; lane 40. **d3:** 4 levels, route changes level ≥ 5 times, 2 UP moves.
- **Why:** spatial language (up/down/under) predicts spatial reasoning; a route that must go UP before it can go further down breaks the "always go down" heuristic.
- **Tells:** no shaft straight from start level to goal level; goal not directly below start (horizontal offset ≥ 1/3 page width); the shortest-looking descent (fewest shafts) is a dead end.
- **Query face:** the scene (underground / burrow maze).

### F6 town maze: the shortest way (move sharpened, scene kept)
- **Move:** streets have loops; several routes reach the goal; the child picks the SHORTEST and writes how many blocks it is. Not "drive through streets" (that is F1 with a road paint, a theme swap).
- **Child:** "The fire truck must hurry! Draw the shortest way to the fire. How many blocks? Write the number."
- **Skill:** comparing route lengths by counting units (measurement readiness), route planning. Readiness (1.MD.A.1 not claimed: it orders objects, not routes).
- **Band:** G1.
- **d1:** 3x3 block lattice, 2 candidate routes, length difference ≥ 3 blocks. **d2:** 5x4 block lattice with 4-6 missing street segments (cul-de-sacs); exactly ONE shortest route (search), next-shortest ≥ shortest + 2 blocks; shortest = 6-9 blocks; ≥ 3 distinct simple routes; lane 40; one numeral box (G1 44 px). **d3:** 6x5, next-shortest = shortest + 1 (fine discrimination), ≥ 5 routes.
- **Why:** comparing lengths by counting equal units is the bridge from "looks shorter" to measuring.
- **Tells (misconception "fewer turns = shorter"):** at d2 the shortest route has MORE turns than ≥ 1 longer route; the straightest-looking street is never the answer.
- **Query face:** the scene (city / town maze, fire truck maze).

### F7 babies to mothers (several starts)
- **Move:** 3 separate routes in one interleaved network; each baby reaches exactly one mother. Choices at junctions, three times, with 1-to-1 matching.
- **Child:** "Help each baby find its mother. Draw a line for each one."
- **Skill:** 1-to-1 correspondence along routes + planning. Readiness.
- **Band:** K.
- **d1:** 2 babies, 2 components; lane 48. **d2:** 3 babies; forest of 3 trees (Rule 2), each tree 1 start + 1 goal, 3-4 dead ends each; component bounding boxes overlap pairwise ≥ 40 % (interleaved, no region tell); lane 44. **d3:** 4 babies.
- **Why:** matching by tracing (not by look) is a K one-to-one task; three short mazes keep effort per route low.
- **Tells:** no baby's mother in the same column band (the start→goal permutation is a derangement in left-to-right order); a region tell is the top risk (each tree in its own third of the page solves it by eye): the overlap gate above kills it. Pairs must be same-species and the baby visibly smaller (m, `farm_animals.png`): hen + chick, sheep + lamb, cow + calf, horse + foal. **Refused pair: duck + duckling** (both drawn yellow and near-identical on the sheet; a yellow mother duck is also false).
- **Query face:** "animal babies and mothers maze" (en harvest: no measured hits; the scene query carries it).

### F8 tangled lines: which line leads where
- **Move:** no junctions, no choices: follow ONE line through crossings to its end; write the start's number in the goal's box. Pure tracking, the opposite of F7's choosing.
- **Child:** "Follow each line with your finger. Write the number of the animal in the box at the end of its line."
- **Skill:** visual tracking through crossings (smooth pursuit, figure-ground, good continuation). Readiness.
- **Band:** G1 (K at d1).
- **d1:** 2 lines, 2-3 crossings. **d2:** 4 lines, 8-10 crossings total, each line crosses ≥ 2 others; crossing angle ≥ 50° (a shallow "kiss" is genuinely ambiguous); line stroke 10-12 px, all the same ink; 4 numeral boxes (G1 44 px). **d3:** 5 lines, 12-14 crossings, angle ≥ 40°.
- **Why:** sustained visual tracking across distractor lines is a reading-readiness skill (return sweeps, line tracking).
- **Tells:** permutation is a derangement and no line ends in its own column; lines never run parallel within 14 px for > 40 px (a merge tell); no line is visibly shorter (the "obvious" one); no colour coding (the key may colour; the page must not).
- **Query face:** "tangled lines puzzle" (no measured maze-head hits; it carries the generic head + its tail).

### F9 collect on the way
- **Move:** reach the goal passing EVERY item, never using a road twice. Multi-goal planning.
- **Child:** "Help the squirrel pick up all 4 acorns on the way home. Do not go on a road twice."
- **Skill:** multi-step planning with subgoals (executive function). Readiness.
- **Band:** G1.
- **d1:** 2 items, cycle graph (tree + 2 extra edges). **d2:** 4 items (legend strip shows the item picture + numeral 4); tree + 3-5 extra edges; exactly ONE simple start→goal path through all items (search); ≥ 1 shorter simple path misses ≥ 1 item (P1b form); items not all on one straight chain. **d3:** 5 items, 6-7 extra edges.
- **Why:** sequencing subgoals is harder than reaching one goal; "never twice" makes the plan checkable.
- **Tells:** an item in a dead-end spur forces a retrace and breaks the rule: items sit on cycle edges only; items are the same picture (4 acorns), counted with a numeral, never named on the page.
- **Query face:** "collect the items maze" (scene + "collect").

### F10 avoid the obstacles
- **Move:** several roads reach the goal; only one avoids every obstacle. Constraint routing + inhibition.
- **Child:** "Help the cat get to the fish. Do not walk past a dog!"
- **Skill:** constraint routing, inhibitory control. Readiness.
- **Band:** G1.
- **d1:** 2 obstacles, 2 alternative routes. **d2:** 4-5 obstacles sitting ON corridors; ≥ 4 simple start→goal paths; exactly one obstacle-free (search); the shortest physical path passes ≥ 1 obstacle; ≥ 1 obstacle sits within 2 nodes of a junction where the safe branch also starts (the choice is made AT the obstacle, not before). **d3:** 6-7 obstacles, safe route ≥ shortest + 5 nodes.
- **Why:** choosing the longer safe way over the short tempting one is the inhibition step young children find hardest.
- **Tells:** obstacles never block a corridor fully at a narrow point in a way that reads as a wall; the obstacle picture is one repeated picture; the legend shows it once with a "not" mark (crossed circle apparatus), no word.
- **Query face:** scene + "avoid" ("avoid the obstacles maze").

### F11 ABC maze: capitals in order
- **Move:** at every junction choose the branch whose stone carries the NEXT capital letter; the whole alphabet is on the route.
- **Child:** "Help the knight get to the castle. Follow the letters from A to Z." (sv/da/no/fi: "...from A to Ö / Å", panel writes.)
- **Skill:** recognise and name all capitals, in order. **RF.K.1.d** (all capitals appear and each must be identified to choose).
- **Band:** K (en, es MX preescolar, pt, fr GS capitales, sv förskoleklass, da 0. kl, no 1. trinn, fi esikoulu); **de 1. Klasse, it classe prima, nl groep 3** (formal letter teaching starts there).
- **d1:** A→M only (13 stones), no RF claim. **d2:** full locale alphabet (P6: 21 / 26 / 27 / 29-node routes, one maze per length class); decoy stones = route-length × 0.6 (en: 16); stones 56 px, glyph ≥ 30 px Baloo 2 caps. **d3:** full alphabet + decoys × 0.9, ≥ 6 cycle edges.
- **Why:** letter-name knowledge is the strongest single predictor of early reading (NELP 2008); choosing the next letter makes recall active, not sung.
- **Tells:** decoy letters at a route junction are near-misses: next+1 (skip), the previous letter (backtrack), a look-alike (E/F, M/N, O/Q, P/R, C/G, U/V); every decoy branch is live (P1c); the label route is not the shortest (P1b); the goal is not reachable by following decoys that happen to be in order (search proves exactly ONE valid sequence, including sequences that skip a letter).
- **Locale:** alphabet = `COLLATION[loc].strip` uppercased (de 26, no umlauts in the ORDER, the collation folds them; it 21, no J K W X Y; es 27 with Ñ after N; sv/fi ...Z Å Ä Ö; da/no ...Z Æ Ø Å; nl 26, IJ not a separate ORDER letter). Specials (Ñ, Å Ä Ö, Æ Ø Å) are on the route, never decoys of themselves.
- **Query face:** "alphabet maze", "ABC maze" (capitals); fr "labyrinthe des lettres capitales"; es "laberinto del abecedario"; pt "labirinto do alfabeto".

### F12 abc maze: lowercase in order
- **Move:** same choose-the-next-letter move, lowercase, with REVERSAL decoys: the extra discrimination is b/d/p/q, n/u, m/w.
- **Child:** "Help the snail reach its leaf. Follow the small letters from a to z."
- **Skill:** recognise and name all lowercase letters in order, discriminate mirror letters. **RF.K.1.d.**
- **Band:** K (same locale shifts as F11). **fr: re-target to minuscules CURSIVES (CP)** using the vendored `LCS Cursive fr-moderne` (m, `cursive-fonts.css`): the harvest asks "labyrinthe lettres cursives" / "labyrinthe alphabet cursive" (m, fr + de harvest files) and cursive is the French school hand. fr band = CP.
- **d1:** a→m, 13 stones. **d2:** full alphabet (P6 length classes); ≥ 4 reversal decoys placed at the junction where their mirror is the correct next letter (d where b is next, q where p is next, u where n is next, w where m is next); lowercase glyph ≥ 30 px. **d3:** + i/j, h/n, f/t decoys.
- **Why:** lowercase carries most print; mirror-letter confusion is the K-1 error class; placing the mirror at the decision point makes the discrimination necessary, not incidental.
- **Tells:** stones are upright (a rotated stone turns d into p); school letterforms: single-storey a and g where the locale's school print uses them. UNKNOWN: engineer checks Baloo 2's a/g and reuses the lowercase-tracing family's glyph decision (`data/tracing/letter-sets.js` lowercase sets, K-278 family).
- **Query face:** "letter maze" (lowercase), "abc order maze"; fr "labyrinthe des lettres cursives"; de "Buchstaben-Labyrinth" (de capitals-vs-lowercase: de school print is mixed case; panel decides whether de F12 says "kleine Buchstaben").

### F13 letter hop: continue the alphabet from the middle
- **Move:** no corridors: a grid of stones; hop to an orthogonal neighbour carrying the next letter, starting at a seeded MID letter; colour each stone stepped on.
- **Child:** "Help the frog hop from H to W. Colour the stones in ABC order."
- **Skill:** alphabet order retrieved from a mid-point (no reciting from A), adjacency. Readiness for alphabetizing; no CCSS code (none names alphabet order K-2).
- **Band:** G1 (de 1. Klasse "ABC-Reihenfolge", fr CP/CE1, nl groep 3-4).
- **d1:** run of 8 from A, 5x5 grid. **d2:** run of 14 starting at index 4..(len-14); 6x6 grid (36 stones, 84 px, glyph ≥ 40 px); every route step has ≥ 2 neighbours that are decoys (next+1, previous, a look-alike); exactly one valid run (DFS over all start-letter stones). sv/da/no/fi seed the run to END on the locale's last letter so Å Ä Ö / Æ Ø Å are practised (labels only; the grid is neutral). **d3:** run of 14 BACKWARD (from W down to H).
- **Why:** children who know the alphabet only as a song must restart from A to find "what comes after H"; a mid-point start isolates the order knowledge alphabetizing needs.
- **Tells:** the run is not a straight line or a snake along rows (≥ 5 direction changes at d2); the letter after the run's end is NOT adjacent to it (no "keep going" tell); decoys of the right letter in a dead corner do not count as "live".
- **Query face:** "ABC order maze", nl "letterdoolhof", en "a to z alphabet maze" (the hop form).

### F14 number maze 1 to 20
- **Move:** choose the branch carrying the next number, 1 → 20.
- **Child:** "Help the train get to the station. Follow the numbers from 1 to 20."
- **Skill:** counting sequence and numeral recognition. **K.CC.A.1** (d3 adds K.CC.A.2: start from a number other than 1).
- **Band:** K (en, es, pt, fr GS, nl kleuters "tellen tot 20", sv, da, no, fi); **de 1. Klasse** (Zahlenraum 20), **it classe prima** (infanzia stops at ~10).
- **d1:** 1→10, 10 stones, decoys 6. **d2:** 1→20, 20 route stones + 12 decoys, numerals ≥ 30 px in 56 px stones. **d3:** start at a seeded 6-12, count 20 steps (to 25-31).
- **Why:** reading numerals in order is the bridge from rote counting to the number line; teen numbers are where K counting breaks.
- **Tells:** decoys concentrate at 11-19: digit reversals (12/21, 13/31, 15/51, 17/71), skip (n+2), repeat (n-1); no decoy equals the correct next number; the goal is not visible from 19 (20 sits behind a turn).
- **Query face:** "number maze 1 to 20", es "laberinto de números del 1 al 20", nl "cijferdoolhof tot 20", fr "labyrinthe des nombres".

### F15 skip-counting maze
- **Move:** choose the next multiple; the step is the rule.
- **Child:** "Help the kangaroo jump to its home. Count by 5s and follow the numbers."
- **Skill:** skip counting. **2.NBT.A.2** (by 5s and 10s within 1000).
- **Band:** G2.
- **d1:** by 10s, 10→100 (10 stops). **d2:** by 5s, 5→100 (20 stops), decoys 12. **d3:** by 10s from an off-decade start within 1000 (e.g. 235→425, 20 stops).
- **Why:** skip counting is the precursor to multiplication facts and to counting money and minutes.
- **Tells:** decoys: off-by-one (24 for 25), wrong step (n+10 when counting by 5s, n+2), the hundred transition (95 → 110 / 1000); the decoy set uses the same last digits as the route (all end in 0 or 5) so "ends in 5 or 0" does not solve it alone.
- **Locale note:** en harvest also asks "skip counting by 2 / 3 maze" (m): by 2s is legitimate content but NOT 2.NBT.A.2, so it never ships as d2.
- **Query face:** "skip counting maze" (en, the strongest single math head: 9 distinct suggestions, m); de "Zählen in Schritten / Mathe-Labyrinth 2. Klasse".

### F16 addition maze: sums that make 10
- **Move:** step only on stones whose sum equals the hero's number (10); compute at each junction.
- **Child:** "Help the bee get to the hive. Step only on sums that make 10."
- **Skill:** make-ten facts. **1.OA.C.6** (making ten is named in it). en d1 also fits K.OA.A.4 (not claimed for d2).
- **Band:** G1 in every locale (de "verliebte Zahlen" 1. Klasse, fr compléments à 10 CP, nl "verliefde harten" groep 3, sv "tiokamrater" åk 1, da/no "tiervenner", fi "kymppiparit" 1. luokka, es primer grado, pt 1º ano, it classe prima).
- **d1:** route 6 stones, decoys 6. **d2:** route 10 stones all "a + b" = 10, decoys 12 = sums 9 or 11 sharing an addend with a true pair (4+5, 3+8) so "has a 7" does not solve it; addends 0-10, never "10 + 0" twice. **d3:** target 12-15 (within 20), route 12.
- **Why:** fluent tens-complements are the hinge of later mental addition (bridging through 10).
- **Tells:** route and decoys use identical expression shapes and font; commuted duplicates (3+7 and 7+3) count as distinct true stones; no decoy sum equals the target.
- **Query face:** "math maze 1st grade", de "Rechenlabyrinth 1. Klasse", es "laberinto de sumas para primer grado" (m), fr "labyrinthe maths CP".

### F17 subtraction maze within 20
- **Move:** step only on differences equal to the hero's number.
- **Child:** "Help the mouse reach the cheese. Step only on the take-aways that make 7."
- **Skill:** subtraction facts within 20. **1.OA.C.6.**
- **Band:** G1 in every locale.
- **d1:** within 10, route 6. **d2:** minuend 11-20, subtrahend 2-9, difference = a seeded target 5-9; route 10; decoys 12 with difference target ± 1 and the digit-swap error (14 − 6 written as "12": a decoy whose ONES-subtracted-the-wrong-way value equals the target). **d3:** route 12, two-step "18 − 5 − 4".
- **Why:** bridging-down through 10 is the G1 subtraction strategy; the swap error is the dominant one.
- **Tells:** as F16; the target is printed once (on the hero's flag), never on stones.
- **Locale:** minus = U+2212 in every locale; "take-away" wording is en-only: panels write their own (de "Minusaufgaben", fr "soustractions").
- **Query face:** "subtraction maze", es "laberinto de restas", de "Rechenlabyrinth Minus".

### F18 first-sound maze
- **Move:** step only on picture cards whose name starts with the same SOUND as the hero's name. No words on the cards.
- **Child:** "Help the lion get to its cave. Step only on pictures that start like lion."
- **Skill:** isolate the initial phoneme. **RF.K.2.d.**
- **Band:** K in every locale (phonological awareness is Vorschule / GS / groep 2 / förskoleklass / esikoulu content).
- **Hero ruling (m, `b8-hero.js`):** **`zoo animals/lion`** (opened, `zoo_animals.png`: clear lion, unmistakable): its name starts with **L in all 11 locales** (Lion, Löwe, León, Leão, Lion, Leone, Leeuw, Lejon, Løve, Løve, Leijona), and /l/ is a continuant (continuant onsets are easier to isolate than stops). One hero = one locale-neutral scene. d3 hero **`zoo animals/panda`** (P in all 11, a stop: harder) with b-decoys (voicing contrast).
- **d1:** route 6 /l/ cards, decoys 8, all decoys stops (maximal contrast). **d2:** route 8-10 /l/ cards, decoys 14, ≥ 3 decoys whose word CONTAINS l later (ball, apple, Ball, ballena…) so letter-spotting in a word fails; cards 72 px pictures on cream stone discs. **d3:** panda, /p/ route 10, /b/ decoys ≥ 4.
- **Pools (m), see section 3.** L-words per locale after K-safe filters: en 29 · de 26 · es 28 · pt 30 · fr 30 · it 32 · nl 24 · sv 25 · da 30 · no 29 · fi 60. All ≥ 24 > the 10 a page needs. 
- **Tells:** a card picture must be NAMED by a 5-year-old with the vocab word (cards whose spontaneous name differs are refused per locale: e.g. en "lifeguard", de "Lichterketten", sv "läsk" need a panel read); a card must not show text; no two route cards share a theme cluster that reads as a group (all fruit) while decoys are another group.
- **Style family (OPEN for the critic):** one theme holds at most 4-7 singleton L/M/B words (m, `b8-theme.js`: en M max 4 per theme, es P max 12, fi K max 14), so a page's 24 cards must come from several themes. Pedagogical ruling: cards are APPARATUS (uniform cream disc, like the picture cards of the sound faces), not the scene's cast; Designer A/critic confirms or restricts to a style family once `data/hm/catalog.js` exists (UNKNOWN: engineer measures pool per family).
- **Query face:** "beginning sounds maze" (no measured maze-head hits; the face rides the generic + "first sounds").

### F19 REPLACED: math maze within 100 (G2), running total
- **Replaced:** the lock's "arrow code maze" (follow arrows). **Why:** zero demand in the harvest: across all 11 files, no suggestion with a maze head contains code/coding/arrow/flèche/Pfeil/pijl (m, regex scan); the move sits next to the `treasure-hunt` grid-directions app; and the G2 band otherwise carries only one face (F15) while G2 math maze demand is measured in 5 markets: en "math maze 2nd grade", de "mathe labyrinth 2 klasse" / "rechenlabyrinth 2 klasse", es "laberinto de sumas y restas para segundo grado", fr "labyrinthe maths ce1", nl "doolhof groep 4" (m). The G2 head also has to say "math" (the DIBELS "maze" trap, lock).
- **Move:** start with a number; each stone on a road is an operation (+10, −1, +5 …); keep a running total; only one route lands exactly on the goal's number. Mixed operations in one chain: different from F16/F17 (one fact per stone, same answer).
- **Child:** "Start at 34. Add or take away on each stone. Find the way that ends at 60."
- **Skill:** add and subtract within 100 mentally (+/− 10, +/− 1, bridging). **2.NBT.B.5** (d1 is 2.NBT.B.8-like: ±10 only).
- **Band:** G2 in every locale (de 2. Klasse Zahlenraum 100, fr CE1, nl groep 4, sv åk 2, da 2. kl, no 3. trinn, fi 2. luokka, es segundo, pt 2º ano, it seconda).
- **d1:** ±10 only, route 4 ops, start 20-50. **d2:** ops from {+10, −10, +1, −1, +5, −5, +2, −2}; start 20-60; route 6 ops; a small numeral circle (G2 36 px) beside each op stone for the running total; every intermediate total within 0-100; ≥ 4 simple routes; exactly one ends on the goal (search over simple paths). **d3:** + {+20, −20, +9, −9}, route 8.
- **Tells:** the shortest route ends on goal ± 1 or ± 10 (a near miss); no route reaches the goal "early" and continues; op labels identical in style on route and decoys.
- **Boundary:** Mental Math Level Set (a + b − c, no route) and `number-walls`: neither chooses a route by its total.
- **Query face:** "math maze 2nd grade", de "Rechenlabyrinth 2. Klasse", es "laberinto de sumas y restas para segundo grado", fr "labyrinthe maths CE1", pt "labirinto matemático", it "labirinto matematico".

### F20 maze + colouring page
- **Move:** solve a wide B&W maze, then COLOUR the whole correct road inside its edges, then colour the picture. Two motor tasks: route, then fill within a band.
- **Child:** "Help the fox get home. Colour the road it takes. Then colour the picture."
- **Skill:** visual-motor control (colouring within boundaries), planning. Readiness.
- **Band:** K.
- **d1:** route 7-9, 3 dead ends, lane 64. **d2:** tree, route 9-12, 4-5 dead ends, lane 56 (15 mm: a crayon fits); B&W library art only (substrate). **d3:** route 13-16, 6 dead ends, lane 48.
- **Why:** colouring a long band is sustained fine-motor work with a purpose (the colour IS the answer); the harvest asks for it in four markets (en "easy maze coloring pages", es "laberintos para colorear preescolar", nl "doolhof kleurplaat kleuters", fi "sokkelo värityskuva", pt "labirinto para imprimir e colorir", it "labirinto da stampare e colorare", m).
- **Tells:** dead ends as wide as the route (a narrower dead end tells); the key fills the route coral.
- **Query face:** "maze coloring page", nl "doolhof kleurplaat", fi "sokkelo värityskuva", es "laberinto para colorear".

---

## 2 Rejected non-moves (do not ship as faces)
- Same maze, different scene (forest / beach / space maze): a theme swap (Rule 3). Scenes ride Designer A's per-face originality, not new faces.
- Easy / hard / giant sizes: the grid family's heads and a pure size change.
- Timed maze, "fastest", score: competition is out of house rules.
- Maze with an arrow code the child FOLLOWS (old F19): no demand (above); kept as a d3 idea nowhere.
- Two-case letter maze (A a B b …): two rules on one page (P5).
- Even / odd path ("step on even numbers"): the classification lives in `odd-and-even` G1-351.
- Word maze (step on sight words): reading content, a separate family; no demand measured.
- Initial-letter maze with words printed on cards: the letter is printed, so it becomes letter matching, not sound isolation.
- Dot-to-dot letter path: owned by `dot-to-dot`; the move here is CHOOSING a branch.

---

## 3 Initial-sound pools (face 18), measured

Population (m): colour pictures with a vocab key, minus `picture-refusals.js`, minus B2_EXCLUDE per locale, minus K-unsafe themes (emotions, colors, shapes, weather, activities, dinosaurs, miscellaneous, 4th of July, thanksgivinng: adjectives, abstractions, species names no 5-year-old says, US-only holidays) = **1,010 pictures**, distinct words per locale ≈ 620-644. A picture qualifies only by FIRST SOUND (rules in `b8-onsets.js`): en sh ch th wh ph kn wr qu out, c/g split by the next vowel; de Sch/Sp/St/Ch/Pf/Ph out, V = f or w (ambiguous, out); es ch ll qu gu out, h silent, c/z/s one sound (seseo), b/v one sound, g/j one sound, y = ll; pt ch lh nh qu gu out, h silent, c/ç/s one sound, g/j one sound, every vowel out (nasal and reduced vowels); fr ch ph qu gn out, h out, vowel groups ou oi au an en in on un out, c/s, g/j; it ch gh gl gn sc+e/i out, soft c and g out, h out; nl sch ch out (g = ch sound), v/f and z/s ambiguous (out); sv sj skj stj tj kj, k and sk before e i y ä ö out, g before soft vowel = j sound; da hv (= v) hj (= j) out of their letters; no sj skj kj tj, k/sk before i y ei øy out, g before i y ei øy = j sound, hv hj; fi sh and loan onsets b c f g z out.

Counts are distinct words with that letter AND a singleton onset (letter + vowel; clusters like bl- st- are harder to segment at K). Recommended target letters, safest first:

| loc | words | recommended targets (count / singleton) | avoid (measured reason) |
|---|---|---|---|
| en | 644 | M 32/32 · L 30/29 · S 76/28 · B 64/52 · P 50/45 · T 39/31 · D 24/19 · R 21/21 · H 28/28 · F 29/22 | C/K (85 /k/ words split c 75 + k 10), G (soft g 6 ambiguous), every vowel (short/long), F has 3 ph- confusers (drop them from decoys), H: no silent-h words found but panel reads |
| de | 625 | M 30/30 · L 26/26 · R 30/30 · H 36/36 · B 55/36 · T 35/28 · S 33/29 (= /z/; Sp/St/Sch excluded) · N 15/15 | Sch 60 words, Sp/St, Pf 9, V (f or w), F/W (9 V-words confuse), D only 11 |
| es (MX) | 625 | M 41/41 · P 80/71 · T 44/32 · L 28/28 · D 16/15 · N 9/9 | S/C/Z (one sound), B/V (one sound), C/K/Qu, G/J, Y/LL, H (silent), F only 8 singletons; vowels clean (A 44, E 25) but RF.K.2.d pages prefer consonants |
| pt (BR) | 624 | M 45/45 · P 91/76 · B 53/48 · T 38/29 · L 30/30 · F 29/20 · V 17/17 · D 11/10 | C/K/Qu, S/C/Ç, G/J, X/Ch, H (silent), all vowels (nasal) |
| fr | 631 | M 37/37 · P 72/65 · B 65/52 · T 44/35 · L 30/30 · R 22/22 · V 16/16 · D 12/11 | C/K/Qu, S/C/Ç, G/J, H (16, silent), Ch 27, vowel groups 20, F (5 ph- confusers) |
| it | 625 | M 35/35 · P 84/80 · B 51/43 · T 42/34 · L 32/32 · F 42/35 · R 22/22 · V 13/13 | soft C 15 / soft G 11, Ch Gh Gl Gn Sc, S (s/z voicing before voiced consonants; only 26 singletons), J K W X Y |
| nl | 629 | M 28/28 · B 57/37 · P 44/37 · T 38/30 · H 32/32 · R 25/25 · L 24/24 · K 73/55 | G/Ch (one sound), V/F (42 ambiguous), Z/S (27 ambiguous), Sch 13, C 10 |
| sv | 620 | M 30/29 · B 54/38 · P 41/38 · H 32/32 · L 25/25 · V 20/20 · R 17/17 · F 36/21 | K (kj/k+soft: 16 tj-class), S (sj/sk+soft 16), G (= j before soft vowel), J (spelled g/hj/dj/lj) |
| da | 621 | M 24/24 · B 57/39 · P 37/36 · H 38/38 · L 30/30 · S 91/33 · T 40/31 · F 33/19 | V (hv- 4 words), J (hj- 3), C 7; soft d/g inside words do not affect onsets |
| no | 621 | M 28/28 · B 59/39 · P 38/37 · H 32/32 · L 29/29 · R 20/20 · F 33/20 · T 36/26 | K (kj/k+soft 13), S (sj/skj 18), G (gj/g+soft), J, V (hv-) |
| fi | 622 | M 45/45 · S 57/54 · L 60/60 · T 43/39 · P 79/78 · K 106/103 · V 40/40 · H 47/47 · R 27/27 | B G C F Z (loan onsets, 19 words), Sh; vowels clean (A 31) |

**Ship:** d2 = L in all 11 (hero lion), d3 = P in all 11 (hero panda). Both letters are in every locale's safe list above (es L 28 / P 71; nl L 24; sv L 25: the smallest pools still give ≥ 2× a page's 10 route cards). The decoy pool is ≥ 590 words in every locale (m: "safe distractors" column in `b8-onsets.json`), minus words the panel refuses.

---

## 4 Alphabets (faces 11, 12, 13), from the repo's SoT

ORDER faces read `data/b2/collation.js COLLATION[loc].strip` (m), the hand-authored ×11 order table already used by `alphabetical-order` G1-245. Not `data/tracing/letter-sets.js` (a TRACING set: it adds de Ä Ö Ü and nl IJ, which are letters to write but not positions in the ABC order).

| loc | ORDER alphabet (length) | F11 case | F12 | notes for the panel |
|---|---|---|---|---|
| en | A-Z (26) | capitals | lowercase print | single-storey a/g check |
| de | A-Z (26); Ä Ö Ü ß NOT in the order (collation folds them) | capitals | lowercase | band 1. Klasse; panel may add one Ä/Ö/Ü stone as a d3 decoy only |
| es (MX) | A-N Ñ O-Z (27) | capitals | lowercase | Ñ on the route between N and O; CH/LL are not letters (RAE 2010) |
| pt (BR) | A-Z (26, K W Y included since 2009) | capitals | lowercase | no Ç as a letter |
| fr | A-Z (26) | capitales d'imprimerie (GS) | **minuscules cursives (CP)**, font `LCS Cursive fr-moderne` | cursive glyphs joined? NO: single letters on stones, the cursive letterform only; band CP |
| it | A-Z without J K W X Y (21) | capitals | lowercase | the 21-letter school alphabet; band classe prima |
| nl | A-Z (26) | capitals | lowercase | IJ not an order position; band groep 3 |
| sv | A-Z Å Ä Ö (29) | capitals | lowercase | specials after Z; ends "från A till Ö" |
| da | A-Z Æ Ø Å (29) | capitals | lowercase | ends "fra A til Å" |
| no | A-Z Æ Ø Å (29) | capitals | lowercase | ends "fra A til Å" |
| fi | A-Z Å Ä Ö (29) | capitals | lowercase | ends "A:sta Ö:hön" (panel writes the case forms) |

Route-length classes for F11/F12 d2: **21 (it), 26 (en de pt fr nl), 27 (es), 29 (sv da no fi)**. F13 is length-neutral (run of 14).

---

## 5 Number bands (faces 14-17, 19), framework reading (panel confirms)

| loc | K (F14 1-20) | G1 (F16/F17 within 20) | G2 (F15 by 5s/10s; F19 within 100) |
|---|---|---|---|
| en | K counts to 100, writes to 20 (CCSS) | 1.OA.C.6 within 20 | 2.NBT.A.2, 2.NBT.B.5 |
| de | **Vorschule ~10 → F14 = 1. Klasse** (Zahlenraum 20) | 1. Klasse Zahlenraum 20 | 2. Klasse Zahlenraum 100, Kernreihen 2/5/10 |
| es MX | preescolar: colecciones hasta 20 | primer grado | segundo grado |
| pt BR | educação infantil (BNCC campo "Espaços, tempos, quantidades"), to 20 | 1º ano | 2º ano |
| fr | GS: suite orale jusqu'à 30, quantités jusqu'à 10 | CP, compléments à 10 | CE1 (jusqu'à 1000) |
| it | infanzia ~10 → **F14 = classe prima** | classe prima entro il 20 | classe seconda entro il 100 |
| nl | groep 2: tellen tot 20 | groep 3 tot 20 | groep 4 tot 100, sprongen |
| sv | förskoleklass 0-20 | åk 1 (tiokamrater) | åk 2 0-100 |
| da | 0. klasse 0-20 | 1. klasse (tiervenner) | 2. klasse |
| no | 1. trinn 0-20 | 2. trinn (tiervenner) | 3. trinn |
| fi | esikoulu 0-10/20 | 1. luokka (kymppiparit) | 2. luokka 0-100 |

Numerals only on the apparatus; no number words on stones. Thousands separators never occur (≤ 1000, d3 of F15 at most 3 digits).

---

## 6 Native rebuild table (what each panel authors)

Every panel writes: the 20 titles from the lock's heads (never the bare grid-family heads, never the worksheet word, ≤ 70 chars, G2 titles always say math/skip counting); 20 instructions as WHOLE sentences (story nouns from `image-vocabulary.js` for that locale with correct article/case, never templated); the hero/goal nouns per scene; refusals.

| loc | alphabet + case (F11-13) | F18 pool (L / P) | number + operator words | traps |
|---|---|---|---|---|
| en | A-Z; caps / lower | L 29 / P 45 | "count by 5s", "make 10", "take away" | never "easy/hard/giant/animal/fruit maze"; G2 must say math; "a to z" |
| de | A-Z (26) caps / Kleinbuchstaben; F11/F12 band 1. Klasse | L 26 / P 18 (smallest P: d3 check) | "in Fünferschritten", "verliebte Zahlen", "Minusaufgaben" | no "Arbeitsblatt"; not "einfaches Labyrinth"; capital nouns in instructions; V is not a sound target |
| es (MX) | A-Z + Ñ (27) | L 28 / P 71 | "de 5 en 5", "sumas que dan 10", "restas" | MX register (preescolar, primer grado); no "ficha", not "fácil"; b/v, s/z/c never targets |
| pt (BR) | A-Z (26) | L 30 / P 76 | "de 5 em 5", "somas que dão 10", "subtrações" | BR register; "atividade" may lead; no vowel targets |
| fr | caps (GS) / **cursives (CP)** | L 30 / P 65 | "de 5 en 5", "compléments à 10", "soustractions" | no "fiche"; silent h; F12 says "lettres cursives" |
| it | 21 letters | L 32 / P 80 | "contare di 5 in 5", "amici del 10", "sottrazioni" | no "schede"; soft c/g never targets; letter faces = classe prima |
| nl | A-Z (26), IJ not an order letter | L 24 / P 37 | "sprongen van 5", "verliefde harten", "minsommen" | no "werkblad"; g/ch, v/f, z/s never targets; letter faces groep 3 |
| sv | A-Ö (29) | L 25 / P 38 | "hoppa 5 steg", "tiokamrater", "minus" | no alphabet/number demand: generic head + face tail; k/g/s/j never targets; "grupp" unusable |
| da | A-Å (29, Æ Ø Å) | L 30 / P 36 | "5-tabellen", "tiervenner", "minus" | generic head + tail; hv/hj words not V/J targets |
| no | A-Å (29, Æ Ø Å) | L 29 / P 37 | "telle med 5", "tiervenner", "minus" | bokmål; generic head + tail; kj/sj/gj classes never targets |
| fi | A-Ö (29) | L 60 / P 78 | "viiden välein", "kymppiparit", "vähennyslaskut" | case agreement: panel writes "A:sta Ö:hön", numbers in elative/illative; loan onsets b/g/f never targets; "sokkelo värityskuva" is F20's head |

Per-locale refusals recorded now: none whole-face. Re-targets: fr F12 → cursive (CP); de F11 F12 F14 → 1. Klasse; it F11 F12 F14 → classe prima; nl F11 F12 → groep 3. Card-level refusals for F18 are the panel's (open each card picture on a contact sheet; refuse, never rename).

---

## 7 OPEN for the critic
1. F18 card style family: cards as apparatus (my ruling) vs one style family (Rule 1). Pool per family UNKNOWN until `data/hm/catalog.js`.
2. F11/F12 four route-length classes (21/26/27/29): Designer B confirms a 29-node label route + ~17 decoys fits 675 × 620-740 at 56 px stones.
3. Lowercase letterforms (a, g) in Baloo 2: UNKNOWN, engineer inspects.
4. F19 replacement of the arrow face: needs the critic's sign-off against the lock.
5. F6, F9, F10, all label faces depend on cycle graphs (P1): Designer B's engine adds a cycle-edge knob; the tree-only proof of Rule 2 becomes "exactly one VALID route by search" on these faces.
