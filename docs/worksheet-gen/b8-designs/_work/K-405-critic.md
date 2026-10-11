# K-405 `maze-puzzles`: CRITIC record (2026-10-11)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md`, `_ROLES.md`, `_work/K-405-pedagogy.md`, `_work/K-405-design-A-scenes.md`, `_work/K-405-design-B-topology.md`, `_work/K-405-design-C-page.md`, `_work/K-405-lead-notes.md` (binding). Exemplar: `../b7-designs/K-395-find-the-differences.md`. Output: `../K-405-maze-puzzles.md`. Merge rule: measured buildability > preference; the brief and the lead notes > all inputs. No em-dashes.

## 1 Contradictions and rulings

| # | conflict | inputs | ruling | why |
|---|---|---|---|---|
| 1 | F19 setting after the arrow face was replaced | A: building site + teal arrows (lock's arrow face); pedagogy + lead note 1: running total within 100; C: kept the site, arrows → op pills | **Building site KEPT; story re-cut: start `vehicles/dump_truck` (R) carrying "34" bricks, goal `vehicles/crane` (L) needing "60"; every sign loads (+) or unloads (−).** A's bulldozer → islander. | A running total needs a quantity that changes along the road; a truck's load is that quantity, so the scene now explains the maths instead of decorating it. No other face uses a building site; FO vehicles only, one family. |
| 2 | F18 hero | pedagogy: `zoo animals/lion` (L in all 11, measured); A: per-locale pet rotation (hamster, mouse, guinea pig ...) | **Lion in all 11 locales; market square kept; goal `At the Supermarket/basket`.** | Rule 1 + substrate: one scene serves all 11 locales; a per-locale hero breaks it and A itself had to refuse hamster in es / fr. The lion sheet (opened) is the rosy-cheeked CR family; A's own mix rule allows CR character + FN food props; lead note 5 makes the cards apparatus from CR + FN. A lion shopping is odd but readable as a picture-book scene, and it is the only hero whose name gives the same continuant onset in all 11 languages. |
| 3 | F8 needs 4 lines at d2 (5 at d3); A gave 3 holders | pedagogy / B / C: 4; A: 3 + d3 squirrel / balloon | **d2 holders `forest creatures/fox`, `raccoon`, `squirrel`, `badger`; goals `spring/kite`, `beach/kite`, `Things That Fly/kite`, `Things That Fly/balloon` (red). d3 + `forest creatures/beaver` and `toys/balloon` (green).** All opened on the sheets. | `toys/kite` and `summer/kite` duplicate `spring/kite` and `beach/kite` in shape and colour (A's own refusal, confirmed on the sheets); the green toy balloon differs from the red one in colour, and the boxes, not the shapes, carry the answer. The four holders differ in silhouette and colour (orange fox, grey raccoon, orange-bushy squirrel, black-white badger). |
| 4 | B moved start / goal corners on nine faces | A: corners per scene; B 2.6: no two faces share gen + mouth pair, no pair > 2× | **B's corners accepted on all nine; A's scenes mirrored, art unchanged.** F20's sandcastle stands on the sand just under the sea band at the TR mouth (it cannot sit in the band). | The corner rule is what prevents "repeated layout" (Rule 1); mirroring costs nothing. Checked: every ordered pair is used at most twice, each time by a different generator family. |
| 5 | Maze frame height | B: 640 trees / 700 label faces; C: one 716 stack, T2 = 640 + 12 + 64 | **Every stack 716 (≤ 733 tallest chrome, 17 px slack). Tree faces: 76 scenery band + B's 640 box. Label faces: B's 700 box in the 716 frame. T2 faces (6, 9, 10, 18): frame 640 + gap 12 + strip 64. F5: B's levels + 36 px. F7: B's 676 field + fence band. F8, F13: arithmetic in §3.** | Every ruling keeps a face on the exact box B measured, except T2, which I RE-MEASURED at 640 (below). The scenery band is where A wanted sky / canopy / sea anyway. |
| 6a | F3 numbers | pedagogy: route 24-32, dead 14-18; B: route 22-28, dead 11-18 | **B's values.** d3 re-specified (r 64, route 24-30, K 600, UNKNOWN acceptance). | Measured infeasibility (a 28-node route in 56 nodes leaves 16 dead ends that would be stubs; denser grids fail clearance). |
| 6b | F5 dead-end shafts | pedagogy: 2-3; B: ≥ 1 (mean 0.88) | **≥ 1, a seed-scan gate.** | Re-measured: 33/300 seeds pass B's other gates, 16/300 also have ≥ 1 dead-end shaft, 4/300 have ≥ 2. Two is a 1 % event; one is a ~5 % seed scan. |
| 6c | F13 near-miss rule | pedagogy: ≥ 2 near-miss decoys at every step, orthogonal 6 × 6; B: impossible, hex 7 × 7, ≥ 1 every step + ≥ 2 on ≥ 50 % | **B.** | B's proof is structural (a skip decoy touching cell i + 1 is forbidden by the forward rule) and measured 0/200 on every grid; hex 7 × 7 accepts 195/200. |
| 6d | F6 d3 parity | pedagogy: next-shortest = shortest + 1; B: impossible on a lattice | **B: + 2 always; d3 = bigger lattice, more routes within + 4.** | Bipartite graph: every route between two fixed corners has one parity. |
| 7a | Two ants (F5) | A: `forest creatures/ant` start + `insects and bugs/ant` goal | **One ant only; goal = `fruits/raspberry` (the store) in the deepest chamber.** | Substrate lesson (f): no noun twice in one scene; two near-identical red ants read as a duplicate, and one ant is not "its family". |
| 7b | Two rabbits (F8 / F9) | A: F8 holder `forest creatures/rabbit`, F9 hero `farm animals/rabbit` | **F9 keeps its rabbit hero; F8 drops the rabbit (badger replaces it); F2 drops its `pets/rabbit` islander.** F14's `camping/rabbit` islander stays (not a hero). | Twenty different heroes; a rabbit holder next to a rabbit hero two faces later is exactly the sameness the operator named. |
| 8 | Distinctness | brief Rule 3 + 5 | **§3 end table: twenty settings, heroes, goals, gen + mouth pairs, d2 signatures and query faces, all distinct; grid-family heads banned by validator rule 2 with both-direction poisons.** F7's title avoids "animal maze" ("Babies and Mothers Maze"). | |
| 9 | F7 pairs | A: chick/hen, calf/cow, lamb/sheep (d2) | **d2 chick/hen, calf/cow, foal/horse; lamb/sheep → d3.** | On the opened sheet `farm animals/sheep` is drawn as a small round lamb-like animal; next to `lamb` the pair reads as two lambs. Foal/horse is unmistakable. |
| 10 | F7 route balance (B's open flag) | B: shortest route 6.8 vs longest 13.9 | **NEW gate: shortest ≥ 0.5 × longest.** | Re-measured: 62 of 105 accepted builds pass at 0.5 (≈ 31 % of seeds); 0.6 passes 7/105 (too strict). One baby with a 6-node walk while another walks 14 is a K fairness tell. |
| 11 | F8 geometry | B: slot 160, dy 82 → 54°; C: kites + boxes at the top, strands from y 160 | **Slot 140 with C's layout.** | C's layout shortens the strand span to 418 px (dy 69.7); at B's slot 160 the acute angle is 180 − 2·atan(160/69.7) = 47° < 50 (FAIL). Slot 140 gives 53°. Arithmetic, then the render-level gate measures it. |
| 12 | F6 "how many blocks" | pedagogy / B / C: count blocks | **Each street piece carries one drawn cover (manhole) at its midpoint, on every piece; the child counts covers; the strip shows one piece = 1.** | "Block" is ambiguous to a six-year-old (lawns passed vs street pieces driven). A visible unit on every piece removes the ambiguity without marking the route. |
| 13 | F6 / F8 / F19 screen check | B: F6 checks the typed count | **Lead note 7: the route only; boxes and total circles are paper-only.** | Binding input. |
| 14 | F9 items | A: four different vegetables | **One repeated picture ×4 (carrot), counted in the strip.** | Pedagogy F9 + P5: "all 4 acorns", a count, never a shopping list of names. |
| 15 | F13 goal flag | C: flag beside the run's last cell | **No flag on any cell; honey is decoration at the comb's corner.** | A flag on the last cell marks where the run ends and lets the child walk backward to it. |
| 16 | F18 letter chip | C: "L l" chip in the strip | **No chip at d2; d1 only.** | RF.K.2.d is a sound task; the chip adds a letter cue (P5 one cue). |
| 17 | F3 gorilla + orangutan | A: both in the jungle | **Gorilla dropped.** | Two great apes side by side read as one animal twice. |
| 18 | Dark scenes | A: F3 `#6FAF66`, F11 `#3E4C86` with fallbacks | **The fallbacks SHIP (`#86BE77`; `#6E7CB8` / `#8794C6`).** | C 1.9 print rules; the dark values fail mean ink ≤ 0.30 and pencil visibility *est.*; the gate measures. |
| 19 | Family key | brief header `scene-mazes`; lock `maze-puzzles` | **`maze-puzzles`.** | THE LOCK + the task. |
| 20 | PreK level key | brief band table PreK words | **en `preschool`; every other locale takes its K key (no PreK landing key exists outside en, m); the PreK word goes in the title.** | Measured: landing `coordinate.level` values ×11. |

## 2 Claims removed or marked unverified
- A's "dissimilarity" claim that the three earth-tone paths differ enough: kept as stated, but the greyscale separation of every face is UNMEASURED (C *est.*); the print gate decides.
- A's heights per drawing are targets, not webp-aspect measurements (A said so); kept as targets.
- C's per-face luminance values (L ≈ 0.60, 0.31, ΔL 0.22) are estimates from hex; marked *est.* in the final.
- C's F13 grid 6 × 6 (520 × 437): replaced by B's measured 7 × 7 (640 × 542).
- C's F19 "route 6 ops + decoys ~8": replaced by B's measured 8 ops.
- B's F8 d3 "84/200" was at a different span; the final says it must be re-measured at the shipped geometry.
- B's d1 / d3 acceptance where "not run" (F11, F14, F9, F10, F19 d1/d3, F12 reversal count, F15 0/5 share): all marked UNKNOWN in the final, none presented as fact.
- The pedagogy's "F18 cards from several themes" pool counts are measured over the whole K-safe colour library; the CR + FN restriction (lead note 5) shrinks them by an amount not yet measured (needs `data/hm/catalog.js`): OPEN 2.
- No title in §6 is measured for width or harvest-checked by me beyond `_PANEL-FINDINGS.md` heads; they are candidates the panels rewrite.

## 3 Numbers re-measured (read-only node, scratch `crit_exp5_h.js`, `crit_f5.js`, `crit_f7.js`, wrapping B's proto libs)
| what | B (input) | editor (re-measured) |
|---|---|---|
| F18 acceptance | 49/100 at frame 700 | **71/100 at the shipped 640 frame** (TR → BL); 44/100 at 700 with the same mouths |
| F9 acceptance | 78/100 at 700 | **65/100 at 640**; 78/100 at 700 (reproduced) |
| F10 acceptance | 100/100 at 700 | **99/100 at 640**; 100/100 at 700 (reproduced) |
| F5 d1 / d2 / d3 | 100 / 8 / 7 per 100 (the cached `b_exp3.txt` showed 0 / 8 / 0, stale) | **300/300 · 33/300 · 15/300**; d2 with ≥ 1 dead-end shaft 16/300, ≥ 2 4/300 |
| F7 route balance | not measured | 105/200 accepted; shortest ≥ 0.5 × longest in 62, ≥ 0.6 in 7, ≥ 0.7 in 2 |
| F8 angle at the final layout | 54.1° (slot 160, dy 82) | 47° at slot 160 / dy 69.7 (fails); **53° at slot 140** (arithmetic) |
| repo facts | | alphabet lengths ×11; all 58 letters resolve in `letter-strokes.js`; 10 F20 srcs in `data/fdx/catalog.js`; taxonomy has no `maze-puzzles`; rail slugs collision check (pt `atividades` prefixes ours) |

## 4 OPEN items (the build session clears these first)
1. `data/hm/catalog.js` (style family per colour drawing) does not exist: validator rule 8 depends on it; the F18 card pool per locale must be re-counted under CR + FN only (fail threshold 18).
2. F18 per-locale `REFUSED_CARDS` (panel read of every L card on a contact sheet).
3. Acceptance UNKNOWN: F3 d3, F7 d3 (k 4 with route cap 30), F11 / F12 d1 and d3, F14 / F15 d1 and d3, F9 / F10 / F19 d1 and d3, F13 d3 backward; F12 reversal decoys ≥ 4; F15 0/5-ending share ≥ 0.60; F8 render-level crossing geometry; F5 / F7 / F13 own-rule poisons.
4. Greyscale and ink gates per face on real renders (C 1.9), especially F1 edge contrast, F10 white-on-ice, F11 toned sky.
5. `trace-path` runtime: port `trace-runtime.html` with the page-px viewBox fix, the retract-only rule, the junction button row, multi-route colours; robot gate at 360 / 768 / 1024.
6. pt rail slug `atividades-de-labirinto` has the theme slug `atividades` as its prefix; it passes the b7 rule (ours prefixes nothing). The engineer confirms the topic router matches exact slugs; otherwise the pt panel picks another slug.
7. fr F12 cursive legibility on the PC render (b6 rule).
8. Island art at d2 on F3: only 44-56 px fits (mB r ≥ 40 islands 0.7); A's list is already 44-56 except the band palm.
9. Title strip ≤ 2 lines in de / fi / pt / fr for the longest titles (F19 en is 52 chars; fi and de compounds unmeasured).

## 5 Verdict (first person, as a critical K-2 teacher)

Would I print all twenty? Eighteen without hesitation, two with care.

The base, the river, the burrow, the babies, the tangled kites and the colouring page are the mazes I already print from a dozen sites, except these have a reason on every page and a road a five-year-old can actually stay inside: 44 px at K, 72 at preschool. The letter and number faces are the ones I cannot find elsewhere done properly. Most "ABC mazes" online are a tree with letters glued on, so my quick readers solve them by eye and never read a letter. Here the label is the only thing that solves the page, and the shortest road is a trap. That is the face I would photocopy for the whole class. The make-10 and running-total pages give me real fact practice dressed as a game, with the target printed once and nowhere else.

What would embarrass me:
- **A defect that only a teacher sees on paper**: a dead end that is visibly a stub, a letter stone that is one pixel bolder than its decoys, a printed route mark. All are gated now; I would still read the first printed copy of every face before trusting the gates.
- **F6's "blocks"**: before the cover marks, half my class would have counted lawns. Keep the covers.
- **F18's lion at a market**: the children will ask why a lion is shopping. That is fine. A card picture they name differently is not: "läsk" vs "saft", "lifeguard" as a person. The per-locale card read is not optional.
- **F7 with two lambs**: I would have been asked which one is the mother. Moved to d3 for that reason.
- **F19 for 7-year-olds**: eight signs with mixed ± 1 / 2 / 5 / 10 and a total to keep in the head is the top of grade 2. I would print it for my strong group and for the end of the year; the total circles on paper are what make it fair.
- **F8 on the tablet**: tracing a line with a finger is fine, but the screen does not check who belongs to which kite (the boxes are paper-only). The paper page is the real task; the landing must not promise more.
- **The Nordic alphabet mazes** have 29 stones and are the longest pages in the batch; the K child who knows A-Z but not Å-Ö will stop at Z. That is honest to the curriculum, but the sv / da / no / fi panels should say so in the landing.

Nothing here teaches a thing it does not claim, and no face is a theme swap. If the OPEN items close and the gates stay green on the shipped seeds, I would print the set.
