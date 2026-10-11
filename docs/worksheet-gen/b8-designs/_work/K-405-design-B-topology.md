# K-405 `maze-puzzles` DESIGNER B: MAZE TOPOLOGY + DIFFICULTY (2026-10-11)

Read: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md`, `_ROLES.md`, `_work/K-405-design-A-scenes.md`, `_work/K-405-pedagogy.md` (P1-P8 folded in). Looked at `p7.png`, `o4.png` (stubs at the left wall and the bottom-left are exactly the "visible stub" defect this file gates out).

**(m) = measured 2026-10-11 by read-only node scripts over ≥ 100 seeds.** Scripts (out of tree, the engineer ports them into `scripts/worksheet-gen/lib/hm-*.js`): `%TEMP%\hm\proto\b_lib.js` (Poisson, Gabriel, metrics, hand-rule walk, islands), `b_tree2.js` (route-first tree), `b_braid.js` (looped graph + simple-path search), `b_oracle.js` (raster graph oracle v2), `b_exp2.js` (organic trees F1 F2 F3 F4 F20), `b_exp3.js` (F5), `b_exp4.js` (sequence label faces), `b_exp5.js` (F9 F10 F16-F19), `b_exp6.js` (F6), `b_exp7.js` (F7), `b_exp8.js` (F8), `b_exp9.js` (F13), `b_poison.js` + `b_poison2.js` (poisons). Frame used in every measurement: scene 675 × 640 (trees) or 675 × 700 (looped / label faces), 24 px margin. Numbers are page px (703 px page width).

---

## 0. Rulings (load-bearing)

**B1. Random-then-reject does not work; ROUTE FIRST.** gen2 (Poisson + Gabriel + growing tree, as prototyped) at base d2 settings passed **0 of 300** seeds against the quality gates (m: stubs mean 1.35/page, tempting dead ends 0.56, worst wall-follower ratio p95 1.00 = one hand solves it outright, side share 0.66). The engine is therefore: (1) candidate graph = Poisson points + Gabriel edges + angle prune; (2) **route search** = biased random self-avoiding DFS from the start node to the goal node with a target node count, scored for turn variety and no long straight run; (3) **branches** = side-balanced subtrees rooted on route nodes (reserve all roots first, then grow round-robin; the first 2 nodes of a branch step TOWARD the goal = tempting); (4) leftovers attach to branches only, never to the route, or stay unused (bigger islands); (5) gates. Per seed the engine tries **K = 150** builds (alternating reserve/plain branch mode) and keeps the first that passes; if none passes, seed + 1. Measured cost: ≤ 2 s per accepted build in node.

**B2. Two topology classes.** TREE faces (1, 2, 3, 4, 5, 7, 20; 8 is strands) have exactly one physical route per start. LOOPED faces (6, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19) add `loops` extra Gabriel edges after the tree is built, so the label / rule alone solves the page (pedagogy P1). Loop edges never join two route nodes (the rule route stays an INDUCED path: no chord can skip a label) and never raise a node above degree 4. Face 13 is a hex cell grid (no corridors).

**B3. Corridor = lane width floor (pedagogy P3), page px:** PreK 72 · K 44 · G1 36 · G2 32. Clearance between centrelines of any two corridors that share no node ≥ **W + 17** (W + 7 outline + 10 px island), measured on the sampled curves, not the straight edges.

**B4. Screen snap.** Every W here is < 90, so the screen uses the SNAP RADIUS rule: the press must land within **max(44 css px, 90 page px)** of the active route tip; ink then moves only along edges incident to the tip (projection onto the edge polyline). Never a corridor-width rule.

**B5. Faces 11 / 12 build one maze per alphabet length class from the same scene and seed family:** L21 (it) · L26 (en de pt fr nl) · L27 (es) · L29 (sv da no fi). Same keep-outs, same stone size, same seed; the engine re-solves the route for the class. 4 graphs, not 11 (pedagogy P6 confirmed feasible, section 3.4).

**B6. Face 19 is the pedagogy replacement (running total, 2.NBT.B.5)**, built on the looped engine; the lock's arrow face is kept in section 3.19b as an alternative topology (one-way streets) in case the critic rejects the replacement. Route = **8 ops, not 6** (m: 6 ops pass 9 / 100 seeds because the rule route cannot be ≥ 3 nodes longer than a 3-op shortest path across a 600 px field; 8 ops pass 79 / 100).

---

## 1. The generator: knobs (one engine, per-face config)

| knob | meaning | range used |
|---|---|---|
| `frame` | scene box the maze fills (Designer C sets the final height inside 620-740) | 675 × 640 trees, 675 × 700 label faces |
| `r` | Poisson min spacing between nodes (stations) | 66 (F3) … 150 (F2) |
| `minAngle` | prune Gabriel edges meeting at a node below this angle | 55° (65° river, 60° PreK) |
| `keep[]` | keep-out discs [x, y, radius] for hero, goal, big art (A's 150 px trees, the 120 px paddocks) | per face, section 3 |
| `start`, `goal` | mouth points; nearest Poisson node becomes the mouth node; the hero sprite sits outside the frame edge at that mouth | section 2.6 table |
| `route` | target node count [lo, hi] (incl. both mouth nodes) | per face |
| `branches`, `size` | number of branch roots on the route, nodes per branch subtree | per face |
| `bNewest` | branch growth: 1 = one long finger, 0.5 = forked | 0.5-1 |
| `fill` | leftover nodes attach to branch nodes (1) or stay unused (0 = bigger islands) | per face |
| `noNearGoal` | no branch root in the last N route nodes before the goal | 1 |
| `loops` | extra Gabriel edges after the tree (LOOPED faces only), never route-route, degree cap 4 | 5-7 |
| `wobble` | midpoint offset × edge length (Catmull-Rom chains as gen.js) | 0.18 burrow · 0.25 default · 0.42 river |
| `K` | build attempts per seed before seed + 1 | 150 |

---

## 2. Quality rules (measured thresholds)

All metrics are computed on the declared graph + the wobbled midpoints (direction of an edge at a node = toward its midpoint).

### 2.1 Correct-branch side balance (position tell)
At every route junction the exits other than the incoming one are ranked by signed turn angle; the correct exit is L (most-left), R (most-right) or M. **Gate: share of the most frequent letter ≤ 0.60 when the route has ≥ 3 junctions (≤ 0.67 on PreK/K pages with 3 junctions); longest run of the same letter ≤ 2 (≤ 3 on F3).** m (accepted d2): F1 side share mean 0.54 (max 0.60), F3 0.53, F20 0.55, F4 0.63 (gate 0.67).

### 2.2 Wall-follower solve share
Left-hand and right-hand walks on the planar embedding (exit with the most-left / most-right turn; U-turn only at a dead end), counted in edges until the goal. Ratio = route edges / walk edges (1.0 = that hand solves it with no detour). **Gate, worst of the two hands:** PreK ≤ 0.80 · K d2 ≤ 0.50 (river 0.60, colouring 0.60) · G1 ≤ 0.50 · d3 ≤ 0.45. m (raw gen2, 120 seeds): wfL mean 0.48, p95 1.00. m (accepted d2): F1 L 0.40 / R 0.39 (p95 0.48 / 0.50); F3 0.41 / 0.42; F20 0.46 / 0.47; F4 0.51 / 0.49; F2 0.59 / 0.61.

### 2.3 No dead end visible as a stub
A STUB = a branch hanging on a route junction that is a single edge ending in a leaf (its end is visible from the junction). **Gate: 0 stubs at K/G1 d2** (PreK d2 allows them: the pedagogy wants 2 short dead ends at the first two junctions). Plus: **≥ 1/3 of dead ends have depth ≥ 3 edges** (F3 ≥ 0.30). m: raw gen2 1.35 stubs/page (p95 3); route-first accepted 0 by construction (failed roots are pruned, and the gate re-checks).

### 2.4 Tempting dead ends
A branch is TEMPTING when its first node AND its second node are each closer (Euclidean) to the goal than the junction. **Gate: ≥ 2 tempting branches at K/G1 d2** (river ≥ 1, colouring ≥ 1, F3 d3 ≥ 3). m (accepted d2): F1 2.36 (2-4), F3 3.41 (2-6), F20 1.44, F4 1.30.

### 2.5 Goal not visible along a straight line
**(a) Tortuosity** = route px / straight start-goal distance: gate ≥ 1.6 base (PreK 1.3, F3 2.0, river 1.7, colouring 1.5). **(b) Longest straight run** on the route (consecutive route edges with |turn| < 25°): gate ≤ 300 px base, ≤ 250 F3, ≤ 260 river. **(c) Start and goal never on the same chain** (a chain = path between nodes of degree ≠ 2). m (accepted d2): F1 tort 2.01 (p5 1.67), maxRun 186 (p95 262); F3 2.71 / 170; F4 1.96 / 195; F20 1.93 / 203; F2 1.97 / 263.

### 2.6 Start / goal mouth variety across the 20 faces
Rule: no two faces share (generator family, start slot, goal slot); no ordered mouth pair is used more than twice in the batch. Slots: BL BC BR L R TL TC TR. This changes Designer A's corners on 3, 5, 10, 14, 16, 17, 18, 19, 20 (flag for A / critic: mirror the scene; no art changes).

| face | gen | start → goal | | face | gen | start → goal |
|---|---|---|---|---|---|---|
| 1 | ORG tree | BL → TR | | 11 | LOOP | BL → TC (A's own advice) |
| 2 | ORG tree | L → R | | 12 | LOOP | TL → BR |
| 3 | ORG tree | **BR → TL** | | 13 | HEX | run starts bottom row, ends free |
| 4 | ORG tree | TL → BR | | 14 | LOOP | **L → TR** |
| 5 | LAYER | **TR → BL** (surface right, family deep left) | | 15 | LOOP | BC → TR (A's advice) |
| 6 | LATTICE | L → R | | 16 | LOOP | **BR → TL** |
| 7 | FOREST | top × 3 → interior-bottom × 3 | | 17 | LOOP | **BC → TL** |
| 8 | STRANDS | bottom × 4 → top × 4 | | 18 | LOOP | **TR → BL** |
| 9 | LOOP | BL → TR | | 19 | LOOP | **R → L** |
| 10 | LOOP | **BL → R** | | 20 | ORG tree | **BC → TR** |

---

## 3. Per face (d2 ships; d1 / d3 for the levels)

Tables give config and the MEASURED values of accepted builds (mean, p5-p95). "accept" = share of seeds yielding an accepted build within K = 150 attempts.

### 3.1 BASE K-405 (K): organic tree
- **Config d2:** r 90, minAngle 55, W **44**, route 11-15 nodes, branches 6, size 3-5, fill 1, wobble 0.25, keep [[30,610,62],[612,52,88]] (hedgehog, apple tree 150 px).
- **Gates d2:** route 11-15 · dead 6-9 · junctions ≥ 4 · stubs 0 · tempting ≥ 2 · depth ≥ 3 share ≥ 1/3 · side ≤ 0.60 · same-run ≤ 2 · wf ≤ 0.50 · tort ≥ 1.6 · maxRun ≤ 300 · clearance ≥ 61.
- **m d2 (75 / 100 accept):** nodes used 31.2 (27-34) · route 12.6 (11-15) nodes, 1,312 px (1,113-1,558) · dead 6.5 (6-8) · depth ≥ 3: 3.1 · junctions 4.5 (4-5) · tempting 2.4 · clearance 76.6 (p5 67.5 ≥ 61) · chain length 2.18 edges · islands for art: r ≥ 22 (44 px art) 21.0 (17-25), r ≥ 28 (56 px) 13.3 (10-17), r ≥ 40 (80 px) 4.2 (2-6), largest 58 r. A's 8 islanders at 44-80 px fit; at most 2-6 of them at 80 px.
- **d1:** r 128, W 56, route 7-9, branches 3 (depth 1-2), wf ≤ 0.75. m: 91 / 100; route 8.0, dead 3.1, junctions 3, wf 0.54.
- **d3:** r 74, W 40, route 16-22, branches 9, size 3-5. m: 41 / 100; route 17.3, dead 9.8, junctions 6.2, wf 0.37.

### 3.2 F2 my first maze (PreK): organic tree, sparse
- **Config d2:** r 150, W **72**, route 5-7, branches 2 (size 2-3, depth 1-2 allowed), fill 0, minAngle 60, mouths L → R mid-height, keep [[30,320,64],[645,330,64]].
- **Gates d2:** dead exactly 2 · junctions 2 · wf ≤ 0.80 · tort ≥ 1.3 · route turns ≥ 3 (pedagogy) · the 2 dead ends sit at the first two junctions (pedagogy; enforce `branches` roots on route positions 1-3).
- **m d2 (84 / 100):** nodes used 10.0 · route 6.3 (5-7), 983 px · dead 2 · junctions 2 · wf 0.59 / 0.61 (p95 0.75) · clearance 144.5 (p5 123) · largest island r 116 (232 px art: room for A's 130 px cherry tree). Side balance trivially 0.5 (2 junctions).
- **d1:** r 175, W 80, route 5-6, 1 dead end. m 79 / 100. **d3:** r 135, W 64, route 7-9, 3 dead ends. m 68 / 100.

### 3.3 F3 big picture maze (G1): dense organic tree
- **Config d2:** r 66, W **36**, route 22-28, branches 11, size 3-6, bNewest 0.5, fill 1, keep [[28,612,52],[618,42,74]] mirrored for BR → TL.
- **Gates d2 (re-based on measurement):** route 22-28 · dead 11-18 · junctions ≥ 6 · stubs ≤ 1 · tempting ≥ 2 · depth ≥ 3 share ≥ 0.30 · side ≤ 0.60 · same-run ≤ 3 · wf ≤ 0.50 · tort ≥ 2.0 · maxRun ≤ 250 · clearance ≥ 53.
- **m d2 (59 / 100):** nodes 56.6 · route 23.7 (22-27), 1,861 px · dead 11.9 (11-14) · depth ≥ 3: 4.6 · junctions 6.8 (6-8) · tempting 3.4 · wf 0.41 / 0.42 (p95 0.49) · tort 2.71 · clearance 55.8 (p5 53.1, tight) · islands r ≥ 22: 14.2 (9-19), r ≥ 28: 5.9, r ≥ 40: 0.7. **A's 10 islanders must be 44-56 px; nothing above 56 px except in keep-outs.**
- **Pedagogy numbers not reachable (flag):** pedagogy d2 asked route 24-32 + 14-18 dead ends in 56 nodes; a tree with route 28 leaves 28 nodes, so 16 dead ends would be mostly stubs. m: at r 64 / 62 (denser) acceptance fell to 0-2 / 100 and clearance failed (W 36 needs 53). Ruling: route 22-28, dead 11-18, junctions ≥ 6.
- **d1:** r 74, W 40, route 18-22, branches 9. m 44 / 100: route 19.5, dead 9.3, junctions 6.2. **d3:** r 62, W 34, route 26-34: m 2 / 100 (does not ship; engineer may raise K to 600 or drop d3 to route 24-30).

### 3.4 F4 river maze (K): organic tree, long chains
- **Config d2:** r 104, minAngle 65, W **52**, wobble 0.42, route 10-15, branches 4, size 3-4, bNewest 1 (inlets are long single fingers, never forked), fill 0, keep [[30,30,55],[620,610,80]] (boat, dock 120 × 46).
- **Gates d2:** dead 3-5 · junctions ≥ 3 · stubs 0 · tempting ≥ 1 · depth ≥ 3 share ≥ 0.5 · side ≤ 0.67 · wf ≤ 0.60 · tort ≥ 1.7 · maxRun ≤ 260 · **mean chain length ≥ 2.5 edges** (pedagogy "long smooth arcs").
- **m d2 with the chain gate (32 / 100):** dead 3.1 · junctions 3.1 · chain length 2.81 (2.56-3.14) · maxRun 201 (p95 259). Without the chain gate 50 / 100: route 11.1, 1,309 px, islands r ≥ 40: 7.4 (5-10).
- **Inlets same width as the river:** the engine draws every edge at one W; a dead-end inlet is never narrower (pedagogy tell). **Not the widest channel:** n/a (constant width).
- **d1:** r 120, W 60, route 8-11, 2 inlets: m 83 / 100. **d3:** r 92, W 46, route 13-18, 5-6 inlets: m 11 / 100.

### 3.5 F5 burrow (G1): LAYERED LATTICE tree
- **Graph:** `levels` horizontal rows of nodes (y = 120 … 600, jitter ± 13), C columns (x step 600 / (C-1), jitter ± 15 %); candidate edges = horizontal neighbours in a level (tunnels) + vertical neighbours between adjacent levels (shafts). Route-first as B1, bNewest 1, wobble 0.18 (tunnels nearly level). Dead ends render as round chambers Ø 60 (Designer A).
- **Config d2:** C 10, levels 3, W **40**, route 12-17, branches 6, size 2-4, mouths: surface hole top-right → deep chamber bottom-left.
- **Gates d2:** level changes on the route ≥ 3 incl. ≥ 1 UP move · shafts (vertical edges in the tree) 5-7 · dead 6-8 · stubs ≤ 1 · side ≤ 0.67 · wf ≤ 0.60 · longest same-level run ≤ 5 edges · goal horizontal offset ≥ 1/3 frame (mouth placement guarantees 600 px).
- **m d2 (8 / 100 seeds within K 150; engineer scans seeds, expected first pass ≤ 13 seeds):** route 16, 1,755 px · dead 6.0 · junctions 5.3 · level changes 4.3 (4-6) · UP moves 1.13 · shafts 7 · dead-end shafts 0.88 · tempting 2.5 · wf 0.53 / 0.55.
- **Flag:** pedagogy asked 2-3 dead-END shafts; measured 0.88. Ruling: dead-end shafts ≥ 1 (gate), dead-end rooms otherwise sit at tunnel ends.
- **d1 (K):** C 8, 2 levels, route 8-11, dead 2-4, wf ≤ 0.80: m 100 / 100. **d3:** C 10, 4 levels, ≥ 5 changes, 2 UP: m 7 / 100.

### 3.6 F6 town, the shortest way (G1): STREET LATTICE, looped
- **Graph:** C × R intersections on a regular grid (x step 125, y step 148 at d2: blocks big enough for A's lawn art), all 4-neighbour street segments, minus `rm` removed segments (a removed segment that leaves a degree-1 node is a cul-de-sac with a drawn barrier). Streets straight, corners rounded (radius W/2), wobble 0. Mouths: left edge (random row) → right edge (random row).
- **Rule:** the child draws the SHORTEST route and writes its length in blocks (1 numeral box, G1 44 px).
- **Config d2:** 6 × 5 intersections (5 × 4 blocks), remove 4-6, W **40**.
- **Gates d2:** shortest length 6-9 blocks · exactly ONE shortest route (BFS path count = 1) · next-shortest ≥ shortest + 2 · ≥ 1 longer route with FEWER turns than the shortest (the misconception "fewer turns = shorter") · graph connected.
- **m d2 (69 / 100):** shortest 7.1 (7-8) · next 9.1 · routes within shortest + 4 blocks: 134 (67-226) · turns on the shortest 3.2 vs fewest-turn route 2.1 · longer-but-straighter routes 1.9 (1-7) · cul-de-sacs 1.1 · removed 5.2.
- **Parity fact (flag):** a grid is bipartite, so every route between two fixed corners has the same parity: next-shortest is ALWAYS shortest + 2 (m: 100 % of accepted). Pedagogy d3 "next-shortest = shortest + 1" is impossible on a lattice; d3 keeps + 2 and raises the lattice (7 × 6, remove 6-9: m 72 / 100, shortest 8.2, 260 routes within + 4).
- **d1:** 4 × 4, remove 1-2, shortest 4-6, no turn gate: m 100 / 100 (shortest 4.0, next 6.0).

### 3.7 F7 babies to mothers (K): FOREST of k disjoint trees, route-first
- **Graph:** Poisson r 84 over 675 × 676 minus k paddock discs (r 58, centres y 540, evenly spaced: the mother sits in the disc; her node is the disc's top rim) so corridors CAN pass below a paddock: the goals are not on the outer face, which is what makes a crossing assignment drawable on a planar page. Starts = the k nodes nearest y 30 under the babies.
- **Build:** pick a uniformly random DERANGEMENT π (baby i never goes to the paddock below it); route each baby i to mother π(i) by biased DFS over unclaimed nodes (≤ 22 nodes), in random order, vertex-disjoint; then grow the k trees round-robin (bNewest 0.6) over the rest; prune non-route leaves until each tree has ≤ 4 dead ends.
- **Gates d2 (k 3):** π derangement in left-to-right order · each tree 2-4 dead ends · each route ≥ 1 junction · pairwise bounding-box overlap ≥ 0.40 of the smaller box (no region tell, pedagogy) · trees never touch (raster oracle, section 5) · W **44**, clearance ≥ 61 between edges of DIFFERENT trees too.
- **m d2 (45 / 100):** route lengths min 6.8 / max 13.9 nodes · dead per tree 2.0-3.3 · minimum pairwise overlap 0.49 (0.40-0.70) · junctions per route ≥ 1.6 · nodes used 42.
- **d1 (k 2, r 104):** m 98 / 100, overlap 0.86. **d3 (k 4, r 74):** m 0 / 100 at route cap 22 (does not ship; engineer raises the cap or drops d3 to k 3 + more dead ends).
- **Flag:** the shortest of the 3 routes averages 6.8 nodes vs 13.9 for the longest: the critic decides whether a `routeMin ≥ 0.6 × routeMax` gate is wanted (not measured).

### 3.8 F8 tangled lines (G1): STRANDS (a crossing schedule)
- **Model:** k lines, bottom slots x_i (spacing `span/(k-1)`), M levels between y 580 and y 90; at each level a random set of DISJOINT adjacent swaps (each swap = one crossing of the two lines in those slots); lines are Catmull-Rom curves through (slot x ± 20 px wobble, level y). No junctions: each line is its own chain; crossings are never nodes. Final slot of line i = its goal box (top).
- **Config d2:** k 4, M 6, span 480 (slot 160 px), stroke 10-12 px (pedagogy), crossing over/under drawn by alternating which line paints on top.
- **Gates d2 (schedule level):** total crossings 8-10 · final permutation a derangement (no line ends above its own start) · every line crosses ≥ 2 different lines · no line crosses the same partner twice in a row · every level has ≥ 1 crossing · line-length ratio min/max ≥ 0.80 (no visibly short "obvious" line) · acute crossing angle ≥ 50°.
- **m d2 (194 / 200):** crossings 8.4 (8-9) · crossings per line ≥ 4 · partners per line 3 (each line crosses all others) · acute angle **54.1°** (analytic: 2·atan(slot/dy) folded to acute; slot 160, dy 82) · length ratio 0.96 (0.90-1.00).
- **Geometry knob found:** slot 185 / dy 70 (k 4, M 7) gives 41° < 50°: span must stay ≤ 480 for 4 lines.
- **Render-level gates (engineer measures on the drawn polylines, UNKNOWN until built):** measured crossing angle ≥ 50° · distance between any two crossing points ≥ 30 px (no triple point) · two lines never within 14 px of each other for > 40 px outside a 20 px radius of a crossing.
- **d1:** k 3, M 4, span 400, 3-4 crossings: m 200 / 200, angle 63°. (k 2 is impossible under "not the same partner twice in a row": with one partner every second crossing repeats it.) **d3:** k 5, M 7, span 520, 12-14 crossings, angle ≥ 40°: m 84 / 200, angle 56.6°.

### 3.9 F9 collect on the way (G1): looped, items on the route
- **Config d2:** r 90, W **36**, route 14 interior nodes (+ 2 mouths), branches 8, size 1-3, fill 1, loops 5. Items (4, one repeated picture) on route nodes 2, 5, 8, 11 that lie on a cycle (a simple start → goal path exists that avoids the node).
- **Rule check:** valid = simple start → goal path passing every item. **Gates:** exactly 1 valid (search) · ≥ 4 simple paths · the shortest path is not valid · rule route ≥ shortest + 3 nodes · live wrong exits ≥ 0.50 · no item on a dead-end spur.
- **m d2 (78 / 100):** simple paths 15.4 (7-24) · shortest 10.5 nodes vs rule route 16 (extra 5.5) · live 0.68 · dead ends 3.5 · route junctions 5.2 · clearance 79.2.
- **Poison:** moving one item onto a dead-end spur → 0 valid routes, caught 84 / 84 (m).

### 3.10 F10 avoid the obstacles (G1): looped, obstacles on corridors
- **Config d2:** as F9 but loops 6. Obstacles = a greedy HITTING SET: repeatedly place an obstacle on the off-route node shared by most remaining alternative paths until no alternative path survives, then a MINIMALITY pass (remove any obstacle whose removal keeps exactly one safe path).
- **Gates:** obstacles 4-5 · exactly 1 obstacle-free simple path · ≥ 4 simple paths · shortest path hits an obstacle · ≥ 1 obstacle within 2 nodes of a route junction · every obstacle necessary.
- **m d2 (100 / 100):** obstacles 4.1 (4-5) · paths 34.1 (19-48) · shortest 10.9 vs route 16 · live 0.78 · obstacle at a junction 100 %. Before the minimality pass 14 % of pages had a redundant obstacle (m: removing one obstacle still left one safe route in 14 / 100), hence the pass.
- **Obstacle never reads as a wall:** it sits at an edge's middle on the corridor, drawn ≤ 0.8 W tall so the corridor stays visibly open around it (Designer C).

### 3.11 F11 ABC maze (K) / 3.12 F12 abc maze (K): looped STATION graph, sequence labels
- **Graph:** every Poisson node is a STONE (Ø **56**, glyph ≥ 30 px); r **76** (stone gap 20 px of visible corridor); frame 675 × **700**; W **44**; route = start mouth + N letters + goal mouth (N = class length); branches 11-12, size 1-3, fill 1 (every leftover node becomes a decoy stone), loops 7, start BL, goal TC.
- **Labels:** route stones carry the alphabet in order. Decoys: for a decoy adjacent to route stone i the engine prefers a NEAR MISS: next + 1 (skip), previous, look-alike of the next (caps E/F, M/N/W, O/Q, P/R/B, C/G, U/V, I/J; lowercase b/d/p/q, n/u, m/w, i/j, h/n, f/t; Nordic Å/Ä/Ö ↔ A/O). Every decoy obeys the **FORWARD RULE**: no stone may carry the successor of a neighbouring stone's letter unless both are consecutive route stones (decoy-before-route adjacency is allowed: an "F" beside the route's "G" is unreachable because nothing forward-points into it), and no decoy carries the first letter.
- **Uniqueness search:** DFS from the start mouth over stones whose label equals the next expected symbol; count complete runs ending at a stone adjacent to the goal mouth. Gate = exactly 1. The forward rule makes it 1 by construction; the DFS proves it.
- **Not guessable by shape (P1 gates):** ≥ 4 simple paths · the shortest physical path is not the letter route · letter route ≥ shortest + 3 nodes · ≥ 50 % of wrong exits at route junctions still reach the goal.
- **Fit question answered (pedagogy OPEN 2):** total stones the frame holds at r 76: 44.5 (42-48) in 675 × 640, **48.6 (46-52) in 675 × 700** (m, 40 seeds). So 29 route stones + ≥ 16 decoys fit only in the 700 frame; the pedagogy's 0.6 × N decoys (17 for N 29) is NOT reliably reachable. **Ruling: decoys ≥ 0.55 × N** (L21 12, L26 14, L27 15, L29 16).
- **m d2 per class (stone gap 20 px, W 44, clearance gate ≥ 61, stone-on-corridor gate):**

| class | accept | stones used | decoys | route junctions | dead ends | simple paths | shortest vs route | live | near-miss share | clearance p5 |
|---|---|---|---|---|---|---|---|---|---|---|
| L21 (it) | 100 / 100 | 44.7 | 21.3 (13-27) | 7.1 | 4.9 | 29 (13-52) | 14.8 vs 23 | 0.70 | 0.99 | 61.7 |
| L26 (en de pt fr nl) | 100 / 100 | 45.7 | 18.2 (14-23) | 8.8 | 3.8 | 52 (24-80) | 15.9 vs 28 | 0.75 | 0.99 | 61.6 |
| L27 (es) | 99 / 100 | 45.1 | 18.1 (15-22) | 9.7 | 4.0 | 52 (24-88) | 16.1 vs 29 | 0.71 | 0.98 | 61.7 |
| L29 (sv da no fi) | 88 / 100 | 48.3 | 17.4 (16-20) | 11.2 | 4.3 | 56 (28-88) | 16.9 vs 31 | 0.68 | 0.99 | 61.3 |

  (near-miss share = decoys adjacent to the route that carry a near-miss letter.)
- **F12 reversal decoys (pedagogy: ≥ 4 at the junction where the mirror is next):** the engine tries LOOK candidates first when the next letter ∈ {b, d, p, q, m, n, u, w}. Count achieved: **UNKNOWN, engineer measures** (same engine and near-miss share 0.98-0.99, so the slots exist; the count depends on how many of those 8 letters' junctions have a free decoy neighbour).
- **d1:** A → M (13 stones), decoys ≥ 0.55 × 13, r 84, loops 4 (UNKNOWN acceptance, not run). **d3:** full alphabet + decoys 0.9 × N needs ~57 stones: does not fit at Ø 56 (frame holds 48.6): d3 = stones Ø 50, r 70 (UNKNOWN, engineer measures).

### 3.13 F13 letter hop (G1): HEX cell grid
- **Grid:** pointy-top hexagons, **7 columns × 7 rows = 49 cells** (cell width 85 px, side 49, row pitch 74; grid 640 × 542, fits the 640 frame), adjacency = shared hex edge (6 neighbours). Not the pedagogy's orthogonal 6 × 6: measured below.
- **Run:** 14 letters from a seeded start index 4 … (len-14); sv da no fi runs END on the last letter (Å/Ö). Route = self-avoiding cell walk from a bottom-row cell, never stuck.
- **Labels:** forward rule as F11 on cell adjacency (window letters only); decoys never carry the run's first letter; the letter AFTER the run's last letter is never adjacent to the last cell; near-miss preference; the decoy assignment is repeated 30 times per route and the best kept.
- **Gates:** exactly 1 valid run (DFS from every cell holding the first letter) · ≥ 5 direction changes · ≥ 1 near-miss decoy beside EVERY route step · ≥ 50 % of steps with ≥ 2 near-miss decoys · share of steps moving up ≤ 0.65 (no "climb straight to the honey").
- **m (200 seeds each):**

| grid | alphabet | accept | turns | steps with ≥ 2 near-miss |
|---|---|---|---|---|
| hex 7 × 7 | 26, run 14 | **195 / 200** | 10.0 | 0.59 |
| hex 7 × 7 | 29, run 14 ending on Ö/Å | **183 / 200** | 9.9 | 0.58 |
| square 7 × 7 | 26, run 14 | 59 / 200 | 5.9 | 0.57 |
| hex 6 × 6 | 26, run 14 | 49 / 200 | 9.6 | 0.56 |
| hex 5 × 5 (d1) | 26, run 8 | 200 / 200 | 5.4 | 0.63 |

- **Why near-miss "≥ 2 at EVERY step" (pedagogy) is impossible (m: 0 / 200 on every grid):** a skip decoy (next + 1) beside route cell i is forbidden wherever it also touches route cell i + 1 (that would be a forward successor), and in a hex grid 2 of cell i's 4 free neighbours touch cell i + 1. Ruling: ≥ 1 per step + ≥ 50 % with ≥ 2.
- **d1:** hex 5 × 5, run 8 from A. **d3:** run 14 backward (W → H): same grid, reversed successor relation (UNKNOWN acceptance; mirror of the forward case).

### 3.14 F14 number maze 1-20 (K): looped station graph, sequence
- **Config d2:** stones Ø 56, numerals ≥ 30 px, r **84** (gap 28), frame 675 × 700, W 44, route 20 + 2 mouths, branches 9, fill 1, loops 6, start L, goal TR.
- **Decoys:** near-miss = n + 2 (skip), n − 1 (repeat), digit reversal of the next (12→21, 13→31, 15→51, 17→71): reversals are never in 1-20, so always forward-safe.
- **m d2 (100 / 100):** stones 37.7 · decoys 15.6 (12-19; gate ≥ 12 = 0.6 × 20) · junctions 7.2 · dead 3.3 · paths 30 (14-44) · shortest 13.4 vs 22 · live 0.73 · near-miss 0.99 · clearance 72.1.
- **d1:** 1-10, decoys 6, r 96 (UNKNOWN acceptance). **d3:** start at a seeded 6-12, 20 steps (same engine).

### 3.15 F15 skip-counting maze (G2): looped station graph, sequence
- **Config d2:** as F14 with W **32**, by 5s 5 → 100 (20 stones), stones Ø 56 hold "100" at 22 px (G2 floor).
- **Decoys:** n + 10 (wrong step), n + 15 (skip), n − 5 (repeat), n ± 1 (off by one), 110 / 105 at the hundred (pedagogy). Pedagogy wants the decoy set to end mostly in 0 / 5: **gate ≥ 60 % of decoys end in 0 or 5: UNKNOWN, engineer measures** (the engine orders the 0/5-ending candidates first).
- **m d2 (100 / 100):** decoys 15.7 (12-20) · junctions 7.6 · paths 32 · shortest 13.5 vs 22 · live 0.73 · clearance 72.3.

### 3.16 F16 sums that make 10 (G1) / 3.17 F17 differences (G1): looped, PREDICATE stones
- **Graph:** stones are slabs 88 × 54 (A) → r **104**; W **36**; frame 675 × 700; route = 10 good stones + 2 mouths; branches 8, fill 1, loops 5.
- **Labels:** route stones = true expressions (F16 a + b = 10; F17 a − b = target 5-9, a 11-20); every other stone = a near miss (F16 sums 9 / 11 sharing an addend with a true pair; F17 difference target ± 1 and the ones-swap error). Valid = every interior stone of the path is true. The route is an induced path and the only true stones, so validity is unique by construction; the search proves it.
- **Gates:** decoys ≥ 10 · P1 a/b/c · clearance ≥ 53.
- **m d2 F16 (97 / 100):** stones 25.3 · decoys 13.3 (10-16) · decoys touching the route 5.0 · junctions 5.3 · dead 2.8 · paths 16.4 (10-23) · shortest 8.6 vs 12 (extra 3.5) · live 0.71 · clearance 91.8. F17 = same topology (same config, same measurements); only labels differ.

### 3.18 F18 first-sound maze (K): looped, PREDICATE picture cards
- **Config d2:** cards 72 px on cream discs (pedagogy) → r **98**; W **44**; route 9 good (/l/) cards + 2 mouths; branches 9, fill 1, loops 5; decoys ≥ 12.
- **m d2 (49 / 100 at K 150):** cards 26.7 · decoys 15.8 (12-19) · junctions 5.3 · dead 3.6 · paths 14.7 · shortest 7.9 vs 11 · live 0.67 · clearance 87.6. Main rejection = rule route only 2 nodes longer than the shortest (51 / 100 fails): mouths TR → BL across the full diagonal keep the shortest at ~8 hops.

### 3.19 F19 running total within 100 (G2, pedagogy replacement): looped, OP stones
- **Config d2:** op stones Ø 56 + a 36 px total circle beside each → r **104**; W **32**; route **8 ops** + 2 mouths; branches 7, fill 1, loops 5; mouths R → L.
- **Labels:** start S0 ∈ 20-60; route ops drawn from {+10, −10, +5, −5, +2, −2, +1, −1} keeping every running total within 0-100; goal T = final total; other stones random ops.
- **Gates:** exactly 1 simple path ends on T (search) · ≥ 4 paths · P1 b/c · **no path hits T before its last stone** (no "arrived early").
- **m d2 (79 / 100):** paths 9.6 (4-18) · shortest 6.6 vs 10 · live 0.68 · early hits 0 · shortest path ends within ±1/±2/±5/±10 of T in 19 % (pedagogy wants it a near miss: an engine repair loop on the shortest path's off-route ops is possible, **UNKNOWN, not built**) · paths with a total outside 0-100 1 %.
- **6 ops (pedagogy d2): 9 / 100** (m) → d2 = 8 ops; d1 = 4 ops ±10 only with mouths 300 px apart (UNKNOWN acceptance).

### 3.19b (alternative if the critic keeps the lock's arrow face) one-way streets
Street lattice as F6 (6 × 5), every segment ONE-WAY (an arrow painted on it). Exactly one directed simple path start → goal; the undirected lattice has ~10^2-10^3 routes, so the shape cannot solve it. **Not measured** (the replacement is the pedagogy ruling); a build would need the same acceptance + poison proof as F6.

### 3.20 F20 maze + colouring (K): organic tree, wide
- **Config d2:** r 104, W **56** (crayon lane), route 9-12, branches 4, size 2-4, fill 0, keep [[30,610,55],[600,60,95]] mirrored for BC → TR.
- **m d2 (73 / 100):** route 10.3, 1,205 px · dead 4.2 (4-5) · junctions 3.7 · tempting 1.4 · wf 0.46 / 0.47 · islands r ≥ 40: 6.4 (4-9), largest r 81 · clearance 93.9. Dead ends drawn at full W (same width as the route: pedagogy tell).
- **d1:** r 135, W 64, route 7-9, 3 dead ends: m 68 / 100. **d3:** r 92, W 48, route 13-16: m 30 / 100.

---

## 4. Label placement (faces 11-19)
- Labels sit on STONES at graph nodes, never on corridor midpoints: a node is a decision point, so the child reads the next label exactly where the choice is made. The stone is centred on the node; the corridor runs under it; stones are opaque.
- Stone-on-corridor gate: every stone keeps ≥ stoneR + W/2 + 8 px from every corridor not incident to its node (m: 0 violations in accepted F11-F15 builds; the poison harness shows 15 / 100 raw builds that this gate and the clearance gate reject).
- Start and goal mouths carry no label (the hero and the goal stand there).
- Distractor classes per face: F11 caps skip / back / look-alike; F12 + mirror (b d p q, m w, n u); F13 as F11 on cells; F14 skip / repeat / digit reversal; F15 wrong step / skip / back / off-by-one / hundred transition; F16 sum ± 1 sharing an addend; F17 difference ± 1 + ones-swap; F18 stop-consonant onsets + ≥ 3 words with the target sound later in the word (pedagogy); F19 random ops (the topology, not the labels, carries the decoy work).
- Every label face proves uniqueness by exhaustive search over the declared graph (simple-path enumeration, cap 300,000 paths; m: the largest page had 112 paths, never capped).

---

## 5. Oracles and poisons

### 5.1 The raster graph oracle v2 (all corridor faces, trees AND loops)
The bridge test of `oracle.js` proves uniqueness only on trees. v2 proves **"the rendered page has exactly the declared graph"**, for any graph:
- **A. Declared geometry (analytic):** centreline distance between any two corridors that share no node ≥ W + 17; every stone ≥ stoneR + W/2 + 8 from every non-incident corridor. With A, the union of declared corridors has exactly the graph's connectivity.
- **B. Rendered page vs declared (raster):** M = corridor-fill pixels of the rendered page; D = the declared corridors rasterised at W. Fail if `M \ dilate(D, 2 px)` or `erode(D, 2 px) \ M` holds a connected region > 20 px. Stones are compared on their own layer (stone fill colour) the same way. Plus flood fill start → goal on M (reachability).
- **C. Rule:** tree faces: |E| = |V| − 1 and connected (one route); looped faces: the label / rule search of section 3.

### 5.2 The F8 / F13 oracles
- F8: per-line render masks; crossings counted by polyline intersection = schedule count; crossing angle, triple points and parallel runs as section 3.8 (render-level, UNKNOWN until built).
- F13: hexes rendered from the declared cell list; adjacency recomputed from the polygons (two cells adjacent iff they share an edge of length ≥ 0.9 side) must equal the declared adjacency; then the run DFS.

### 5.3 Poisons, MEASURED (control = must pass; poison = must be caught)

| # | poison | layer | result (m) |
|---|---|---|---|
| T0 | control: accepted base tree | oracle A+B | passes 78 / 78 |
| R1 | page draws an undeclared corridor between the two closest non-adjacent nodes | B | caught 78 / 78 |
| R2 | page omits one route corridor | B + reachability | caught 78 / 78 |
| R3 | page draws corridors × 2.3 wide (walls merge) | B | caught 78 / 78 |
| R4 | scene art in corridor colour bridging two corridors (page only) | B | caught 78 / 78 |
| R6 | declared geometry too tight (W + 30) | A | caught 78 / 78 |
| L1 | every left branch pruned (one-sided maze) | side / wall-follower gates | caught 78 / 78 |
| L2 | a 1-edge leaf hung on a route junction | stub gate | caught 34 / 34 |
| T1 | control: accepted looped letter maze (L26) | forward lint + DFS | passes 100 / 100 |
| L3 | a decoy carries the NEXT letter beside a route stone | forward lint | caught 99 / 99 |
| L4 | two route letters swapped | DFS (0 valid runs) | caught 100 / 100 |
| L5 | all loop edges removed | P1 a/b (paths < 4 or shortest = rule route) | caught 100 / 100 |
| L6 | all loop edges removed | P1 c (live share < 0.5) | caught 100 / 100 |
| T2 | control: looped page, geometry-clean builds | oracle A+B+stones | passes 85 / 85 (15 raw builds rejected by A first, as designed) |
| L7 | page draws a stone on another corridor | B stone layer | caught 99 / 99 |
| R5 | looped page with an extra drawn shortcut | B | caught 100 / 100 |
| F10c / F10p | control 1 safe route / one obstacle removed | search | passes 100 / caught 86 of 100 before the minimality pass (100 after, by construction) |
| F19c / F19p | control / one off-route op retuned so a 2nd path lands on T | search | passes 72 / caught 60 of 60 |
| F9p | an item on a dead-end spur | search (0 valid) | caught 84 / 84 |
| F6c / F6p | control / a removed street restored giving a 2nd shortest | BFS count | passes 100 / caught 100 of 100 |
| F8p1 | identity permutation | derangement gate | caught |
| F8p2 | same pair crosses twice in a row | schedule gate | caught |
| F8c | valid 4-line schedule | gates | passes |

The family gate `qa/verify-b8-maze-puzzles.js` carries all of them plus, per face, a poison of its OWN rule (e.g. F13: a next letter placed beside a route cell → forward lint).

---

## 6. `trace-path` screen: graph contract + Check rule

**Bundle:** `{ nodes: [{id, x, y (% of stage), kind: 'mouth'|'junction'|'stone'|'cell', label?, item?, obstacle?}], edges: [{a, b, pts: ≈ 11 samples of the DRAWN curve (getPointAtLength), directed?: false}], routes: [{start, goal, colour}], rule: {...} }`. Edges are the declared graph; on F8 each line is ONE edge from its start node to its goal node (crossings are not nodes, so the ink cannot switch lines at a crossing).

**Runtime (as proven in `trace-runtime.html`):** press within max(44 css px, 90 page px) of an active tip; ink advances along incident edges, passing 92 % of an edge advances the tip; moving back along the last edge retracts. **New for looped faces: a node already on the ink stack can be entered only by retracting** (no self-crossing route, which is what "do not use a road twice" means on F9 and what makes every rule search over SIMPLE paths match the screen).

| face | routes on screen | Check passes when |
|---|---|---|
| 1-5, 20 | 1 | tip = goal |
| 6 | 1 | tip = goal AND ink length (edges) = shortest AND the typed block count = shortest |
| 7 | 3 (d2) | every baby's tip = its own mother |
| 8 | 4 | every line inked to its end (the boxes' numbers are the printed product; the screen checks the tracing) |
| 9 | 1 | tip = goal AND ink visits every item node |
| 10 | 1 | tip = goal AND ink visits no obstacle node |
| 11, 12, 14, 15 | 1 | tip = goal AND ink node labels = the sequence in order |
| 13 | 1 (cells) | ink starts on the start letter's cell, visits the run cells in order, ends on the last cell (edges = straight segments between adjacent cell centres, 85 px) |
| 16, 17, 18 | 1 | tip = goal AND every inked interior node is a true / target-sound stone |
| 19 | 1 | tip = goal AND the running total of inked ops = T |

Snap radius on dense faces: stones 76 px apart (F11-F13) are closer than 90 page px; harmless because only the TIP accepts a press, and on multi-route faces (7, 8) the starting tips are ≥ 160 px apart (m: 535/3 = 178 px on F7, 160 px on F8).

---

## 7. OPEN for the critic / other roles
1. Corner changes on faces 3, 5, 10, 14, 16, 17, 18, 19, 20 (section 2.6): Designer A mirrors the scene.
2. Label faces need a **675 × 700 maze frame** (29-letter class); Designer C confirms 700 fits 620-740 with the tallest chrome, else L29 drops to decoys ≥ 0.45 × N.
3. F3 d2 re-based (route 22-28, dead 11-18) vs pedagogy 24-32 / 14-18: infeasible as asked (section 3.3).
4. F6 d3 "next-shortest = shortest + 1" impossible on a lattice (parity).
5. F13: hex 7 × 7 replaces the pedagogy's orthogonal 6 × 6 (square grids accept ≤ 30 %); "≥ 2 near-miss at every step" impossible, replaced by ≥ 1 every step + ≥ 50 % with ≥ 2.
6. F19 replacement needs the critic's sign-off; if refused, 3.19b one-way streets needs its own measurement.
7. UNKNOWN, engineer measures: F12 reversal-decoy count, F15 0/5-ending decoy share, F8 render-level crossing geometry, F11/F14 d1 and d3 acceptance, F7 route-length balance gate, F5 dead-end shafts ≥ 2.
