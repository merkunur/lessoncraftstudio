# New 222 — The Pencil Path (readiness: pre-writing strokes)

## 0. Identity
- id `pencil-path.play.pre-writing-strokes` · grade K · framework READINESS (pre-writing strokes; `alignment.framework` from `frontend/lib/frameworks.ts`) · strand Handwriting · files `pencil-path-core.js`, `pencil-path-activity.js`, `pencil-path-activity.html`, `pencil-path-activities.json` (scaffold `--num=222`).
- Worksheets covered: K-236 Pencil Path Practice · K-244 Straight Lines and Zigzags · K-385 Down Lines, Slants and Crosses (family "lines & slants" + zigzags) · K-245 Wavy Lines and Curves (family "zigzags & waves") · K-246 Loops, Eights and Spirals (family "loops & spirals") · K-386 Circles, Squares and More Shapes (family "shapes") · K-387 Picture to Picture (family "picture to picture") · K-247 Advanced Pencil Paths + K-248 Pencil Path Review (family "mixed review", narrow road).
- New instrument.

## 1. The pitch
"The car only drives where the road goes and only forwards — so your finger has to draw the stroke from the orange dot, the right way, without jumping."

## 2. Why a child will want it again
Each stroke is a little road with somewhere to go: a mountain road that zigzags up to a haystack, a wavy sea lane to an island, a loop-the-loop track for an aeroplane to its cloud, a spiral snail-shell road that winds into the middle where a leaf waits. The child puts a finger on the vehicle at the orange dot and drives. The vehicle follows the finger like it is pulled on a string, leaving a pencil line behind it on the road. Wander off the road and the vehicle simply waits at the edge, wheels spinning on the spot, until the finger comes back to it; nothing is lost and nothing restarts. At the goal the passenger arrives, both pictures do a happy hop, and a bright spark runs along the child's own pencil line from the start dot to the end — "this is the line you drew, in the way you drew it". Nine roads per family, each a different stroke, and the vehicle changes every road.

## 3. The skill and the misconception
- **Skill:** pencil (finger) control for pre-writing: trace straight lines (across, down), slants, crosses, zigzags, waves, bumps, loops, eights, spirals and shapes, starting at the start dot and moving in the stroke's direction in one continuous movement.
- **Misconceptions / habits and how the road pushes back:**
  1. *Starting at the wrong end.* The vehicle sits on the orange start dot and only the vehicle can be picked up; touching the goal end does nothing.
  2. *Going the wrong way.* Progress only counts forwards along the road: dragging backwards leaves the vehicle where it is (it faces forward and shuffles), so direction is felt, not told.
  3. *Lifting and jumping.* A lift-off is allowed (small hands get tired) but the next touch must pick the vehicle up where it stopped — a jump to a later part of the road does nothing (the vehicle stays; a soft ring pulses on it). On self-crossing roads (eights, springs, loops, stars) the road is followed by arc length, never by "nearest point", so a finger cannot shortcut across a crossing.
  4. *Scribbling outside the line.* Off the road the vehicle stalls at the edge; the pencil line is only ever drawn inside the road, so the trace that stays is a clean stroke in the child's own wobble.
  5. *Habit, not reading.* Start sides vary (left, top, top-right, centre, bottom-left), so the start is read from the dot and the arrows each time.

## 4. The stage
Layout stacked (the road needs the full width); bubble under the road.

**At 704 px:** the **road card** 640 × 380, cream paper with a faint grid.
- **The road:** a grey-blue lane drawn along the stroke's centreline, width 56 px (wide) / 34 px (narrow), soft white edge lines, small white chevrons every 60 px pointing the way (the arrows of the worksheets).
- **Start dot:** an orange 28 px disc at the road's start, with the **mover** standing on it: a library picture 96 px (upright, never rotated; mirrored horizontally when travelling right-to-left so it faces the way it moves).
- **Goal:** a library picture 96 px just beyond the end, on a small teal end pad (24 px).
- **Pencil line:** the child's trace, 4 px graphite grey, drawn inside the road.
- Two-stroke roads (crosses "+" and "×"): the second road appears dashed until the first is finished, then its start dot lights up and the mover hops to it.

**At 360 px:** road card 336 × 300 (portrait-leaning paths are laid out to fit: zigzags wrap to three peaks, spirals shrink); road width floors: wide 44 px, narrow 30 px; mover and goal 64 px; chevrons every 44 px. At 320: card 300 × 280, same width floors.

**Task line** (≤ 24 px): "Start at the orange dot. Drive the {mover} to the {goal}." (picture-to-picture: "Drive the {mover} all the way to the {goal}.")

No words on the apparatus. Library pictures (verified in `mini tools/pictures/*.json`, seen on contact sheets): movers — toys/car, toys/train, vehicles/tractor, vehicles/sailboat, vehicles/airplane, space/rocket, spring/bee, spring/snail, spring/frog, spring/bunny, insects-and-bugs/ladybug, farm-animals/duck; goals — around-the-house/garage, thanksgivinng/haystack, beach/island, beach/lighthouse, spring/cloud, spring/flower, spring/leaf, spring/puddle, vegetables/carrot, space/moon. Each mover's resting facing (`faces: 'left'|'right'`) is recorded from the contact sheet at build (vehicles/airplane and toys/train face left; vehicles/tractor faces left-front) so mirroring is right.

## 5. The hand
- **Pick up the mover** (pointerdown within 48 px of it): it lifts 4 px and grows 1.05 (< 50 ms); a faint dashed preview of the next 80 px of road brightens.
- **Drive:** each pointermove projects the finger onto the road centreline **inside a window of arc length** [s − 24 px, s + 28 px] around the mover's position s (28 px ≈ one fingertip: wide enough that a normal finger speed never outruns the window at 60 fps, narrow enough that the mover cannot be dragged past a bend or across a crossing in one jump). ⚠ **Two radii, two jobs** — the lesson of `stroke-trace-core.js` (its predecessor autocompleted letters because ONE radius served as both corridor and capture): the CORRIDOR (half-width + slack) only answers "is the finger on the road?"; the ADVANCE is only ever to the projection, never "snap to the next checkpoint within reach". Arrival needs s = the road's full length, not "within reach of the end". If the finger is within road-half-width + slack (wide: +14 px, narrow: +8 px) and the projection is ahead of s, the mover moves to the projection (render in the same frame, < 16 ms) and the pencil line extends along the finger's own path (clamped into the road). The mover turns only by mirroring (left/right), never rotates.
- **Pointer faster than the window** (a projection ahead of s + 28 px): treated as off the road — the mover waits; the child slows down and catches it up. Never an advance.
- **Off the road:** the mover stops at s, gives a two-frame wobble ("wheels spinning") and a thin coral glow marks the road edge nearest the finger (300 ms). Moving back onto the road ahead of the mover resumes; the line never breaks.
- **Backwards:** projections behind s are ignored; the mover keeps facing forward.
- **Lift-off:** the mover stays. A touch elsewhere does nothing except a soft pulse ring on the mover (where to pick up again).
- **Arrive:** when s reaches the road's end, the mover glides onto the end pad (200 ms), both pictures hop twice, the spark runs along the pencil line from start to end (speed 600 px/s), and the line darkens to "ink".
- **Rub out** (a 48 px eraser control): clears the pencil line and returns the mover to the start dot.
- **Free play:** after success the road can be driven again any number of times ("again" restarts the mover; the old line stays faint under the new one so the child can compare).
- Sound (optional): a soft engine purr or buzz while moving (pitch rises with speed), a gentle "bump" when stalled, a chime at the goal; TTS reads the task line.

## 6. The rounds
One round = one road (two strokes for the crosses). Completion only by driving the full path from the start dot — one right result. Paths are defined as centrelines in a 640 × 380 design space (scaled per layout).

**Family 1 — lines & slants**
| # | stroke | start | mover → goal |
|---|---|---|---|
| 1 | straight across | left | car → garage |
| 2 | straight down | top | ladybug → leaf |
| 3 | slant down to the right | top-left | bee → flower |
| 4 | slant down to the left | top-right | duck → puddle |
| 5 | slant up to the right (ramp) | bottom-left | airplane → cloud |
| 6 | cross "+": down, then across | top, then left | bunny → carrot |
| 7 | cross "×": slant down-right, then slant down-left | top-left, then top-right | ladybug → leaf |
| 8 | "V": down to the right, then up to the right | top-left | bee → flower |
| 9 | stairs: across, down, across, down, across | top-left | car → garage |

**Family 2 — zigzags & waves**
| # | stroke | start | mover → goal |
|---|---|---|---|
| 1 | zigzag, 3 peaks | left | tractor → haystack |
| 2 | tall zigzag, 5 peaks | left | car → garage |
| 3 | zigzag going down | top | ladybug → leaf |
| 4 | gentle wave | left | sailboat → island |
| 5 | tall wave | left | sailboat → lighthouse |
| 6 | bumps (hills ∩∩∩) | left | bunny → carrot |
| 7 | cups (∪∪∪) | left | frog → puddle |
| 8 | castle wall (up, across, down, across …) | left | snail → leaf |
| 9 | wave, then zigzag | left | bee → flower |

**Family 3 — loops & spirals**
| # | stroke | start | mover → goal |
|---|---|---|---|
| 1 | tall loops (cursive l l l) | left | airplane → cloud |
| 2 | circle, anticlockwise from the top | top | ladybug → leaf |
| 3 | small lying loops (e e e) | left | snail → leaf |
| 4 | figure eight (top loop anticlockwise, bottom loop clockwise) | top centre | bee → flower |
| 5 | spiral in (snail-shell road), anticlockwise | outside, left | snail → leaf (in the centre) |
| 6 | spiral out, anticlockwise | centre | bee → flower |
| 7 | springs (overlapping loops along a line) | left | frog → puddle |
| 8 | infinity ∞ | left | airplane → cloud |
| 9 | loops going down (a hanging chain) | top | ladybug → leaf |

**Family 4 — shapes**
| # | shape | start and direction | mover → goal |
|---|---|---|---|
| 1 | circle | top, anticlockwise | ladybug → leaf |
| 2 | square | top-left, across → down → back → up | car → garage |
| 3 | triangle | top point, down-left → across → back up | bee → flower |
| 4 | rectangle | top-left, across → down → back → up | train → haystack |
| 5 | oval | top, anticlockwise | duck → puddle |
| 6 | diamond | top point, down-left → down-right → up-right → up-left | frog → puddle |
| 7 | star (one stroke, 5 points) | top point, down-left first | rocket → moon |
| 8 | heart | the top dip, left lobe anticlockwise → down to the point → up the right lobe | bee → flower |
| 9 | house (pentagon) | bottom-left, up → roof up → roof down → down → back | car → garage |

**Family 5 — picture to picture** (a meandering road between two big pictures; both 96/64 px)
| # | path | start | from → to |
|---|---|---|---|
| 1 | one gentle S | left | bee → flower |
| 2 | climb and dive (one hill) | left | rocket → moon |
| 3 | two S bends | left | sailboat → island |
| 4 | hairpin up and back | bottom-left | tractor → haystack |
| 5 | one loop in the middle | left | frog → puddle |
| 6 | spiral finish (ends in a small curl) | left | snail → leaf |
| 7 | long zigzag lane | top-left | car → garage |
| 8 | a big U from top-left round to top-right | top-left | bunny → carrot |
| 9 | wave with a loop | left | airplane → cloud |

**Family 6 — mixed review** (narrow road by default; K-247/K-248): 1:9 stairs · 2:5 tall wave · 2:8 castle wall · 3:4 figure eight · 3:5 spiral in · 3:8 infinity · 4:7 star · 4:8 heart · 4:9 house.

- **Answer position:** there is no choice to guess; the variation that matters is the start side, which differs within every family (family 1: left 2, top 4, top-right 1, bottom-left 1, top-left-then-right 1; shapes start at five different places) so "always start at the left" fails on purpose.
- **Order:** order-only reshuffle per pass (`nextTask`); two-stroke roads keep their stroke order.

## 7. Check, the misses, the success
The round ends itself on arrival; Check exists for the shell.
- **Check before arriving** (no miss): "Drive all the way to the {goal}." — the mover pulses.
- Misses are counted as **stalls** (leaving the road while driving) — never as errors shown to the child; the ladder:
  - **help 1 (after 3 stalls in this road):** the road's edges thicken and glow softly and the chevrons ahead of the mover march (move along) slowly · hint "Stay on the road. Follow the arrows."
  - **help 2 (after 6 stalls):** a small guide spark runs 120 px ahead of the mover along the road and waits for it, again and again · hint "Follow the little light. Go slowly round the bends."
  - A wrong-end touch or a backwards drag shows the start pulse once (no count) · hint "Start at the orange dot — the {mover} is waiting there."
- Arriving takes the help away for the next road.
- **Success:** mover to the end pad, both pictures hop, the spark runs along the child's own pencil line start → end, the line inks. Bubble: "You drove the {mover} all the way to the {goal}!" (shapes: "You drew a {shape} in one go!").

## 8. Settings
1. **Strokes:** lines & slants / zigzags & waves / loops & spirals / shapes / picture to picture / mixed review — the road at rest changes.
2. **Road:** wide / narrow — visible at rest (56 → 34 px at 704; 44 → 30 px at 360). Narrow tightens the slack too.

## 9. Words (EN source)
- title "The Pencil Path" · instruction "Put your finger on the orange dot and drive along the road to the picture. Stay on the road!"
- prompt "Start at the orange dot. Drive the {mover} to the {goal}." · promptP2P "Drive the {mover} all the way to the {goal}." · promptCross "Start at the orange dot. Drive the {mover} down, then across." (and "… down this way, then down that way." for ×) — each stored per round as a full sentence.
- hints: hintFinish "Drive all the way to the {goal}." · hintRoad "Stay on the road. Follow the arrows." · hintLight "Follow the little light. Go slowly round the bends." · hintStart "Start at the orange dot — the {mover} is waiting there."
- celebrations: "You drove the {mover} all the way to the {goal}!" · "You drew a {shape} in one go!"
- controls: rubOut "Rub out" · again "Again".
- settings: setStrokes "Strokes" · fLines "Lines and slants" · fZig "Zigzags and waves" · fLoops "Loops and spirals" · fShapes "Shapes" · fP2P "Picture to picture" · fMixed "Mixed review" · setRoad "Road" · roadWide "Wide" · roadNarrow "Narrow".
- {mover}/{goal} with articles from `image-vocabulary.js` stored in whole sentences per round per locale (never concatenated): de "Fahre das Auto zur Garage" (dative after *zu*: *zum / zur* by gender), fr "Conduis la voiture jusqu'au garage" (*au/à la/à l'*), es "Lleva el coche hasta el garaje" (the noun always as `image-vocabulary.js` gives it), it "Porta la macchina fino al garage", pt "Leve o carro até a garagem", nl "Rijd de auto naar de garage", sv "Kör bilen till garaget" (definite suffix forms!), da "Kør bilen hen til garagen", no "Kjør bilen til garasjen", fi "Aja auto autotalliin" (illative on the goal). A bee/snail/frog does not "drive": the verb per mover type is stored (de *fliegen* for bee/plane/rocket, *kriechen* for snail, *hüpfen* for frog/bunny, *schwimmen/segeln* for duck/sailboat; fr *voler, ramper, sauter, nager, naviguer*); EN source (one stored sentence per round, verb by mover): car/train/tractor "Drive the {mover} to the {goal}." · airplane/rocket/bee "Fly the {mover} to the {goal}." · ladybug "Help the ladybug walk to the {goal}." · snail "Help the snail crawl to the {goal}." · frog/bunny "Help the {mover} hop to the {goal}." · duck "Help the duck swim to the {goal}." · sailboat "Sail the boat to the {goal}." The celebration follows the same verb ("You flew the bee all the way to the flower!"). ⚠ The ladybug, frog and bunny never "drive" in any locale. **Direction conventions** follow each locale's school script, but the strokes here are pre-writing shapes, not letters; the circle starts at the top anticlockwise in all 11 (the shared *c/o* start of every Latin school script); reviewer confirms none of the 11 school traditions teaches the circle clockwise (if one does, that locale's circle and oval flip).

## 10. Sound off, access, phones
- Legible with sound off: start dot, chevrons, stall wobble and edge glow, the spark — all visual.
- Keyboard: arrow keys drive the mover forwards along the road by 12 px of arc length per press in the road's local direction (only the key whose direction is within 60° of the road's tangent advances it); a keyboard child completes every road. Screen readers: aria-live announces progress quarters ("half way") and arrival.
- Taps: the mover hit zone 96 px (≥ 44); controls 48 px.
- Precision floors (measured by the gate on real pointer paths): wide road ≥ 44 px at 360 and 320, narrow ≥ 30 px, slack ≥ 8 px; the tightest CURVE radius on any road is ≥ 1.2 × road width so a fat finger can follow it. Sharp CORNERS (zigzag peaks, the star's points, the square's and diamond's corners, the stairs) are corners on purpose — they are the stroke — and are drawn as two straight lanes joined with a round join, so the corridor at a corner is the union of both lanes and the turn is always followable; the gate drives every corner at both road widths.
- Pictures ≥ 96 px at 704, 64 px at 360.
- Check above the fold: header 56 + task 52 + card 300 + controls 52 → Check at ≈ 470 px at 360; ≈ 450 at 320.

## 11. Distinct from
- #5 Digby's Number Trace (the Fading Line): numeral formation with a guide that fades across three boxes and an arc-length judge; this is pre-writing strokes driven as a vehicle along a road to a goal, with direction enforced by forward-only progress — different content, different apparatus, no fading scaffold.
- Tool `letter-studio` (letter tracing on lined guides) — letters, not strokes.
- #21 Creek Map (a boat chooses channels) — a choice of route, not a traced stroke.
- The `trace-path` maze screen (deck screen) is a precedent for path following only; this core is its own (windowed arc-length projection, stalls, lift-resume).

## 12. Build plan
- **Core state** `{family, road, roundIdx, strokeIdx, s, line:[points], stalls, help, arrived}`. Functions: `roadFor(round, layout)` → polyline (≥ 1 px sampling) with cumulative arc length; `project(point, s)` → `{s', dist}` restricted to [s − 24, s + 64] px; `move(point)` → advance | stall | ignore; `pickUp(point)` → ok if within 48 px of the mover; `arrive()`; `rubOut()`; `helpLevel()`; `hintKey()`; `layout(width)`.
- **Gate's own truth (verify):** for every road at every width: the ideal centreline path driven in 4 px steps arrives (solvable); the same path reversed never advances; a path that starts at the goal never moves the mover; on every self-crossing road a finger jump across the crossing to a later arc never advances (window holds); a path displaced by road-half + slack + 1 px stalls; road width floors (44/30 at 360) and bend radius ≥ 1.2 × width; every family has 9 roads with ≥ 3 different start sides (family 4: ≥ 4); the mover's mirror state matches its travel direction for `faces`; every picture key exists in `mini tools/pictures`.
- **Mutations:** window widened so a 60 px finger jump advances (the stroke-trace autocomplete class) · arrival accepted within reach of the end instead of at full length · global nearest-point projection (crossing shortcut) · backwards progress allowed · pick-up allowed anywhere · off-road movement allowed · pencil line drawn outside the road · mover rotated instead of mirrored · stall not counted · help kept after arrival · narrow road wider than wide · start dot at the goal end on one road · second stroke of "+" enabled before the first is finished.
- **Pictures to verify:** vehicles (airplane, sailboat, tractor), toys (car, train), space (rocket, moon), spring (bee, snail, frog, bunny, cloud, flower, leaf, puddle), insects-and-bugs/ladybug, farm-animals/duck, around-the-house/garage, thanksgivinng/haystack, beach (island, lighthouse), vegetables/carrot — record each mover's facing.
- **Risks:** finger occludes the mover on phones — the mover is drawn 12 px ahead-and-above the projection point when the pointer is touch (offset rendered, not projected). Not blocked.

## 13. The four questions
1. **Would a child choose it again?** Yes — driving a vehicle to its goal on a mountain road, a sea lane, a loop-the-loop and a snail-shell spiral; a spark runs along the line they drew.
2. **Would a teacher put it on the board?** Yes — the start dot, forward-only progress and lift-resume enforce exactly what the worksheets ask (start at the dot, follow the arrow, one continuous stroke); all the stroke families of the pre-writing sequence are here.
3. **Would a parent trust it?** Library pictures, drawn roads, nothing scored, nothing timed; the child's own line is kept, never corrected for them.
4. **The invention:** a road shaped like the stroke, where the vehicle only goes forwards and only while the finger stays on the road — and waits patiently when it doesn't.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **Correctness:** the look-ahead window was s + 64 px, which let a finger skip a short bend or hop part of a loop, the exact autocomplete class that `stroke-trace-core.js` documents. It is now s + 28 px. A pointer faster than the window waits instead of advancing, and arrival needs the full arc length. The two-radii rule is written into the design, with two new mutations.
- The rule "bend radius ≥ 1.2 × width" contradicted the zigzags, the star, the square and the stairs, whose corners ARE the stroke. It now applies to curves only. Corners are joined lanes with a round join, and the gate drives every corner.
- **Words:** the EN verb is now decided for every mover (fly / walk / crawl / hop / swim / sail / drive), with matching celebrations. The old prompt "Drive the {mover}" would have made the ladybug drive.
- Checked every picture key against the theme JSONs (all present). The garage and faucet were seen on the around-the-house contact sheet. The mover facings are still recorded at build.
