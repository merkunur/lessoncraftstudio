# New 306 — The Fence Loop: the corner that slides along its own track (3.MD.D.8)

## 0. Identity
- id `fence-loop.play.3-md-d-8` · grade 3 · CCSS 3.MD.D.8 (the "same perimeter, different areas / same area, different perimeters" clause) · strand Measurement & Data · files `mini tools/fence-loop-core.js`, `fence-loop-activity.js`, `fence-loop-activity.html`, `fence-loop-activities.json` (key `fence-loop`; scaffold `node scripts/new-activity.js --num=306`).
- worksheets it covers: **G3-339 "Same Fence, New Yard"** (circle the rectangle with the SAME distance around) — directly, as the "try the fence on" rounds; it also gives the mirror (same grass, new fence) that G3-338 asks.
- new instrument (no old activity). Sibling care: Row 203 *Mending Fences* (batch 38) finds ONE perimeter of a given fence; this instrument holds one measure fixed and lets the other move under the child's hand.

## 1. The pitch
"The pen's fence is one closed loop of rails nailed down at one corner — drag the far corner and it can only slide along a slanted track, because every rail you take off one side has to go onto the other: the fence never changes, but the grass inside does."

## 2. Why a child will want it again (the fun)
- **The click-clack.** Every peg-step of the corner handle moves exactly one rail round the corner: a wooden *clack*, and the rail visibly travels round the post from the short side to the long side. Children drag back and forth just to watch rails hop.
- **The grass grows and shrinks live.** Grass tiles sprout (scale 0 → 1 in 120 ms, a green ripple) as the pen widens and fold away as it thins — while the big rail number on the gate sign sits perfectly still. That contrast is the surprise: "I didn't change the fence and I got eight more squares!"
- **The pen log.** Every pen the child rests on for 400 ms drops a little bar into a log beside the field: one fence, a row of grass bars of different heights. After a minute of play the log is a chart of the whole family of pens.
- **The earned show.** On success the waiting library farm animal walks into the pen, the gate swings shut (clack), and the grass ripples once tile by tile in reading order, so the area is counted in front of the child (no voice needed).
- In "try the fence on" rounds the fence visibly *fails* on the wrong yard — it stops k rails short with a gap at the last corner, or ends with a coil of spare rails at the gate. A wrong answer is a funny little catastrophe, never a red cross.

## 3. The skill and the misconception
- **Skill (3.MD.D.8):** rectangles with the same perimeter can have different areas; rectangles with the same area can have different perimeters; find a rectangle with a given perimeter and area; pick the yard with the same distance around (G3-339).
- **Misconception 1 — "same fence, same space."** *Push-back:* the rail number cannot change (the loop is one piece, nailed at the near corner, padlock on its sign); dragging the corner changes only the grass. The log shows 7, 12, 15, 16 under one 16-rail fence.
- **Misconception 2 — "longer fence = more grass."** *Push-back:* in keep-the-grass rounds the grass is a fixed number of turf tiles; the corner can only rest on the "seed pegs" where that many tiles make a rectangle; the rail number jumps (26, 16, 14) while the grass sign never moves. The longest fence holds the same 12 squares as the shortest.
- **Misconception 3 — counting squares for the fence (or edges for the grass).** In try-on rounds the fence lays its *rails* round the yard edge by edge; a yard with the start's area but a different fence visibly leaves a gap or a coil.
- **Misconception 4 — counting posts as rails.** Rails are planks *between* posts; numbering (miss 1/2) goes on planks only, and a 1×7 pen visibly has 16 planks.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 (iframe width) — left column 448 px, right column 224 px:**
- **The field (left):** a peg board. **Small field 12 columns × 8 rows**, cell 36 px (432 × 288); **Big field 14 × 10**, cell 30 px (420 × 300). Pegs: 6 px teal-ink dots at every grid corner; cells pale earth `#F3E7CF`. The pen's **near corner post** is fixed at the bottom-left peg (a 14 px post with a drawn nail-head; never moves).
- **The fence:** each unit edge of the pen is one **rail** — a 7 px brown plank (`#8A5A2B`, 2 px ink outline) between two 8 px posts. Geometry only.
- **The corner handle:** at the far corner of the pen, a 44 px round grip (coral `#F2784B`, white ring) — the only draggable thing on the field. A faint **slide track** (dashed teal line through the pegs where the corner may rest) is drawn while the handle is held, in keep-the-fence rounds only (it is the visible rule: every resting place has w + h = half the rails).
- **Seed pegs** (keep-the-grass rounds): the pegs where the fixed grass makes a rectangle carry 18 px green sprouts (geometry); the handle snaps only to them.
- **Grass:** each enclosed cell holds a grass tile (rounded square `#7CC36B`, two darker blade strokes, inset 3 px).
- **The signs (right column, top):** two drawn signboards 200 × 64, numerals Baloo 2 40 px:
  - **rails:** plank icon + numeral;
  - **grass:** grass-tile icon + numeral.
  - A drawn padlock sits on the sign that cannot change this round.
- **The order card (right column):** the round's **library farm animal at 112 px** (sheep, goat, cow, horse, llama, donkey, pig — one per round) beside the target as a numeral badge with its icon (grass icon + "15", or plank icon + "14", or a "most" badge = grass icon with an up-arrow / "shortest" = plank icon with a down-arrow). In try-on rounds the card shows the three **yard tabs** (§5).
- **The pen log (right column, bottom):** 200 × 120 mini bar chart; each bar = one pen rested on (height = grass in keep-the-fence rounds, = rails in keep-the-grass rounds), foot labelled w×h in 14 px numerals. Max 8 bars; the oldest leaves on the left.
- **The task line** above the field, ≤ 2 lines, 22 px Nunito, speaker 36 px inline. Check / Next: the shell's buttons under the right column (≥ 48 px tall).

**At 360 (phone) — stacked:** task line (2 lines) · readout strip: animal 64 px + target badge, then the rails sign and the grass sign (each 132 × 52, numerals 30 px) · the field full width: Small 12 × 8 at cell 26 px (312 × 208), Big 14 × 10 at cell 22 px (308 × 220); the handle stays 44 px · Check row · the pen log collapses to one row of up to 6 thin bars (40 px tall) under Check. Check sits at y ≈ 560 at 360 × 740 and ≈ 590 at 320 × 640 (at 320 cells become 23 / 20 px).

No words on the apparatus: only numerals, plank/grass icons, arrows and padlocks.

**Task lines (EN):**
- keep fence: "Use all {rails} rails. Make a pen with {grass} squares of grass."
- keep fence, most: "Use all {rails} rails. Make the pen with the most grass."
- keep grass: "Use all {grass} squares of grass. Make a pen with {rails} rails."
- keep grass, shortest: "Use all {grass} squares of grass. Make the pen with the shortest fence."
- try-on fence: "Which yard has the same fence as this pen? Pick a yard, then try the fence on."
- try-on grass: "Which yard holds the same grass as this pen? Pick a yard, then try the grass on."

## 5. The hand
- **Drag the corner handle** (pointer events; 44 px grip, hit area 56 px).
  - *Keep the fence:* the drag is projected onto the anti-diagonal of pegs w + h = s (s = rails ÷ 2), clamped to w ≥ 1, h ≥ 1 and the field. Crossing into a new peg (≤ 16 ms): one rail swings round the far corner (180 ms ease-out arc), a *clack* (wood block, 90 ms), a grass row/column sprouts or folds (120 ms), the grass numeral updates at once.
  - *Keep the grass:* the handle snaps between seed pegs only; arriving at another sprout re-shapes the turf (each tile slides to its new cell, 260 ms; the count never changes) and the rails numeral counts up/down rail by rail (25 ms per rail, soft tick).
  - Release = settle on the peg.
- **Keyboard:** the handle is a focusable slider (`role="slider"`): ←/↓ and →/↑ move one peg along the track (or to the previous/next sprout); Home/End go to the ends.
- **The log:** resting 400 ms on a pen not yet logged adds its bar (grows in 200 ms). Tapping a bar jumps the handle back to that pen.
- **Try-on rounds:** the start pen is fenced and locked (no handle). Under the order card are **three yard tabs**, 64 × 52, in three colours (plum, teal, mustard — the colour is the tab's name; no letters). Tapping a tab draws that yard on the field as a dashed outline in its colour, **full size on the same grid**, anchored at the near post, with a tick on every unit edge and its squares faintly hatched, so the child can count either. The selected tab is the choice; another tap switches (180 ms cross-fade). Nothing is graded until Check.
- **Undo:** everything is reversible by dragging back; Check grades the current pen.
- **Free play:** after the success show the handle stays live; the child can keep sliding and filling the log until Next.

## 6. The rounds
One round = one order. A fix round is right when the pen's unordered pair {w,h} equals the target pair (either orientation is the same pen); a try-on round when the chosen tab is the right yard. Starting pens are never the answer. Computed in `work-39/fence.js` and `work-39/yard.js`.

**Small field (12 × 8) — "Keep the fence" pool (8 rounds):**

| # | kind | rails | start pen (grass) | target | the only pen | animal |
|---|---|---|---|---|---|---|
| 1 | fix | 16 | 1×7 (7) | grass 15 | 3×5 | sheep |
| 2 | fix | 14 | 3×4 (12) | grass 10 | 2×5 | goat |
| 3 | fix | 18 | 4×5 (20) | grass 14 | 2×7 | cow |
| 4 | fix | 20 | 1×9 (9) | most grass | 5×5 (25) | horse |
| 5 | fix | 12 | 1×5 (5) | grass 8 | 2×4 | llama |
| 6 | fix | 20 | 5×5 (25) | grass 21 | 3×7 | donkey |
| 7 | try-on | 16 | 2×6 (12) | yards 3×5 · 3×4 · 2×7 | 3×5 | pig |
| 8 | try-on | 16 | 4×4 (16) | yards 1×7 · 2×8 · 2×5 | 1×7 | sheep |

**Small field — "Keep the grass" pool (8 rounds):**

| # | kind | grass | start pen (rails) | target | the only pen | animal |
|---|---|---|---|---|---|---|
| 1 | fix | 12 | 1×12 (26) | rails 14 | 3×4 | goat |
| 2 | fix | 12 | 3×4 (14) | rails 26 | 1×12 | cow |
| 3 | fix | 24 | 4×6 (20) | rails 22 | 3×8 | horse |
| 4 | fix | 24 | 3×8 (22) | rails 28 | 2×12 | llama |
| 5 | fix | 36 | 3×12 (30) | shortest fence | 6×6 (24) | donkey |
| 6 | fix | 36 | 6×6 (24) | rails 26 | 4×9 | pig |
| 7 | try-on | 12 | 2×6 (16) | yards 1×12 · 3×5 · 2×5 | 1×12 | sheep |
| 8 | try-on | 24 | 3×8 (22) | yards 4×6 · 5×6 · 3×7 | 4×6 | goat |

(Seed pegs on both fields: 12 → 1×12, 2×6, 3×4; 24 → 2×12, 3×8, 4×6; 36 → 3×12, 4×9, 6×6 — only these three grass totals give three rectangles on a 12- or 14-column field, so fix-grass rounds use only them and the target is never simply "the other sprout". Areas with two rectangles (16, 18, 20, 40, 48 …) appear only as try-on yards.)

**Big field (14 × 10) — "Keep the fence" pool (8 rounds):**

| # | kind | rails | start (grass) | target | the only pen | animal |
|---|---|---|---|---|---|---|
| 1 | fix | 22 | 1×10 (10) | grass 24 | 3×8 | cow |
| 2 | fix | 24 | 1×11 (11) | grass 35 | 5×7 | horse |
| 3 | fix | 26 | 6×7 (42) | grass 30 | 3×10 | sheep |
| 4 | fix | 28 | 1×13 (13) | most grass | 7×7 (49) | llama |
| 5 | fix | 24 | 6×6 (36) | grass 20 | 2×10 | goat |
| 6 | fix | 26 | 2×11 (22) | grass 40 | 5×8 | pig |
| 7 | try-on | 24 | 2×10 (20) | yards 5×7 · 4×5 · 4×7 | 5×7 | donkey |
| 8 | try-on | 24 | 6×6 (36) | yards 3×9 · 4×9 · 2×9 | 3×9 | cow |

**Big field — "Keep the grass" pool (8 rounds):**

| # | kind | grass | start (rails) | target | the only pen | animal |
|---|---|---|---|---|---|---|
| 1 | fix | 24 | 2×12 (28) | rails 20 | 4×6 | sheep |
| 2 | fix | 36 | 6×6 (24) | rails 30 | 3×12 | horse |
| 3 | fix | 36 | 3×12 (30) | rails 26 | 4×9 | goat |
| 4 | fix | 12 | 1×12 (26) | rails 16 | 2×6 | llama |
| 5 | fix | 36 | 4×9 (26) | shortest fence | 6×6 (24) | cow |
| 6 | fix | 24 | 4×6 (20) | rails 28 | 2×12 | donkey |
| 7 | try-on | 40 | 4×10 (28) | yards 5×8 · 5×9 · 6×7 | 5×8 | pig |
| 8 | try-on | 36 | 3×12 (30) | yards 6×6 · 5×10 · 4×8 | 6×6 | sheep |

Every rectangle fits its field in at least one orientation (the core picks w ≤ columns; the gate asserts fit). Grass is never 0; the track ends at w = 1, never 0 × n. In every try-on round one decoy has the start's OTHER measure (same grass in a same-fence round: 3×4 has the 12 squares of 2×6 but 14 rails) — the trap that the misconception falls into.

**"Take turns" (default):** the field's two pools interleave (fence 1, grass 1, fence 2, …) — 16 rounds a pass, so both halves of the standard meet in one sitting.

**Answer position.** Fix rounds have none (the child builds). Try-on rounds: the right yard's tab slot over the 8 try-on rounds is L, M, R, M, R, L, R, M (2/3/3), and the runtime permutes the tabs per pass (never the previous pass's slots). Measured on the 8 try-on rounds (`work-39/yard.js`): **largest grass 2/8, smallest grass 2/8, longest fence 2/8, shortest fence 0/8, squarest 1/8, thinnest 1/8, "same other measure as the start" 0/8, slot L 2 · M 3 · R 3** (re-measured by the critic, `work-c39/fence.js`, every round re-solved: each fix target has exactly one pen on its track/seed list, every start pen is legal and not the answer, every try-on round has exactly one yard with the kept measure and exactly one decoy with the start's other measure, every rectangle fits its field). No bot wins more than half of any pool's try-on rounds.

**Order:** order-only reshuffle per pass (Fisher–Yates, never the previous order); the interleave is redone after each shuffle.

## 7. Check, the misses, the success
- **Check with nothing done** (still the start pen / no tab chosen) → hint, no miss: "Drag the coral corner first." / "Pick a yard tab first."
- **Miss 1 (fix rounds)** → the grass tiles number themselves 1…n in reading order (180 ms per row), the target badge pulses beside the grass sign; in keep-the-fence rounds the slide track stays drawn until the next move. Hint: "This pen has {have} squares of grass. You need {need}. Slide the corner along the track." (keep-the-grass: "This pen has {have} rails. You need {need}. Try another green sprout.")
- **Miss 2 (fix rounds)** → the pen log fills itself with every pen on the track / every sprout (bars drop one by one, 150 ms each) and the bar that matches the target glows coral; the child still drags there. Hint: "Every pen is in the log now. Find the bar with {need} and drag the corner to that pen."
- **Miss 1 (try-on)** → the fence (or turf) really tries the chosen yard: rails walk round the outline one by one, each numbered as it lands (120 ms per rail). Too big a yard: the rails run out and a **gap of k rail-lengths** stays open at the last corner, the missing edges flashing coral; too small: the outline closes and **k spare rails pile in a coil** at the gate. Grass rounds: turf fills the yard and leaves k hatched empty cells, or k tiles on a pile. Hint: "The fence was {k} rails short." / "There were {k} rails left over." / "{k} squares stayed empty." / "{k} squares of grass were left over."
- **Miss 2 (try-on)** → the start pen's rails number themselves 1…{rails} round its loop, then each yard outline shows its edge ticks numbered every 2 (2, 4, 6, …) in its own colour (grass rounds: each yard's squares number themselves). Hint: "Count the rails round each yard. Which one makes {rails}?" / "Count the squares in each yard. Which one makes {grass}?"
- A new drag or a new tab takes the help away until the next Check.
- **Success** → the gate swings shut (clack), the animal walks from the order card onto the pen (picture translates 600 ms, bobs twice at 1.04), the grass ripples once in reading order, both signs flash gold together. Bubble — keep fence: "{rails} rails and {grass} squares of grass. The same fence can hold different grass!" · keep grass: "{grass} squares of grass and {rails} rails. The same grass can need a different fence!" · try-on fence: "Yes! {rails} rails go all the way round that yard too, but it holds {grass} squares." · try-on grass: "Yes! That yard holds the same {grass} squares, but its fence has {rails} rails."

## 8. Settings
1. **Keep the same: the fence · the grass · take turns (default).** Visible at rest: the padlock moves between the two signs; sprouts appear on the field in "the grass".
2. **Field: small (12 × 8) — the signs count for you · big (14 × 10) — count it yourself.** Visible at rest: the peg board's size and cell size change, and on the big field the sign of the measure that moves shows a drawn seed-packet flap with "?" instead of a numeral. On the big field the child must count the tiles (or rows × columns) / the rails (or 2 × (w + h)) to know when the target is reached; the padlocked sign and the target badge still show their numerals, the log bars still rise (heights, no numerals), and miss 1 still numbers the tiles/rails. The flap opens at Check and on success. (This is the reasoning level: on the small field the live numeral shows the law; on the big field the child computes it — a live readout must not do the 3.MD.D.8 arithmetic for a grade-3 child all the time.)

## 9. Words (EN source)
- title: "The Fence Loop" · instruction: "Drag the coral corner. One thing stays the same — watch what changes."
- prompts: the six task lines in §4 · hints and celebrations: §7 · settings: "Keep the same", "the fence", "the grass", "take turns", "Field", "small", "big — count it yourself". aria for the flap: "Hidden: count the {squares|rails} yourself".
- aria: handle "Fence corner. The pen is {w} by {h}: {rails} rails, {grass} squares of grass." · tab "Yard {n} of 3, {colour}" · log bar "Pen {w} by {h}: {value}".
- **Locale traps:**
  - "rail" = the ordinary fence-board word (de *Zaunlatte*, fr *planche*, es *tabla*, it *asse*, pt *tábua*, nl *plank*, sv *bräda*, da *planke*, no *planke*, fi *aitalauta*), never the word "perimeter" in prompts — that concept is meant to be *seen*; the landing copy may use *Umfang / périmètre / perímetro / perimetro / perímetro / omtrek / omkrets / omkreds / omkrets / piiri*.
  - Numeral + noun strings are authored per numeral class, never concatenated: fi takes the partitive after numerals ("15 nurmiruutua", "16 aitalautaa"); de "16 Zaunlatten / 15 Rasenquadrate"; the singular never occurs (minimum 5 squares, 12 rails).
  - Animal names come from `image-vocabulary.js`; the card prints no article and no animal word at all (picture + numeral only), so gender agreement never arises.
  - Yard colours are spoken in aria only (authored colour words per locale).
  - "w by h" in aria: de "3 mal 5", fr "3 sur 5", es/pt "3 por 5", it "3 per 5", nl "3 bij 5", sv "3 gånger 5", da "3 gange 5", no "3 ganger 5", fi "3 kertaa 5".

## 10. Sound off, access, phones
- Legible with the sound off: rails and grass are numerals on signs with icons; the target is a numeral badge; the misses SHOW gaps, coils, numbered rails and tiles. TTS reads the task line and bubble as a bonus.
- Keyboard: task line → handle (slider) → log bars → yard tabs → Check; Space/Enter selects a tab. Aria-live polite on the signs ("16 rails, 15 squares").
- Taps: handle 44 px (hit 56), tabs 64 × 52, log bars ≥ 44 px hit areas, Check 48 px.
- Pictures: the animal at 112 px (704) / 64 px (360); on success it keeps its size and stands *on* the pen, overlapping the fence (a thin pen is smaller than the animal — intended: it is a visitor). No picture is ever shrunk into a cell.
- Check above the fold at 360 × 740 and 320 × 640 (target ≤ 610 px).

## 11. Distinct from
- **Row 203 Mending Fences** (batch 38): one fixed shape, find its perimeter or a missing board. The Fence Loop never asks for a single perimeter; it holds one measure while the other moves.
- **Premium `unroll-tape`** (a strand round a shape laid straight on a scale) and **`shape-stretcher`** (equal sides / square corners): neither conserves a fence while the area changes.
- **New 212 The Geoboard Band** (K.G.B.5, a free band peg to peg): here the loop's *length* is the constraint and the corner rides a track.
- **New 305 Tile Roller** and **Rows 201/202** (area by tiling): area only.
- Registry: no built or designed invention conserves a perimeter by moving rails round a corner.

## 12. Build plan
**Core (`FenceLoopCore`, pure):** `fitOrient(w,h,field)` · `trackPegs(rails,field)` (w + h = rails/2, w,h ≥ 1, fitting) · `seedPegs(grass,field)` (w·h = grass, fitting) · `perimeter`, `area`, `samePen(a,b)` (unordered) · `project(pointer, round, field)` → nearest legal peg · `tryOn(start, yard, keep)` → `{fits, short:k, spare:k}` · `grade(round, state)` → `{ok, have, need}` · `buildPool(field, keep)`, `interleave(a,b)`, order-only shuffle (not the previous order).

**Gate (`scripts/verify-fence-loop-core.js`, own ground truth — recomputes from w,h only, never from stored answers):** (A) every fix target maps to exactly ONE unordered pair on its track / seed list, and the start pen is legal and is not it; (B) every try-on round has exactly one yard with the kept measure, exactly one decoy with the start's OTHER measure, and a third decoy that differs in the kept measure; (C) every rectangle fits its field; (D) keep-the-grass rounds have ≥ 3 seed pegs; (E) the bot table of §6 is recomputed and no bot wins > ½ of any pool's try-on rounds; (F) `tryOn` returns the k each hint will print; (G) every number in an EN bubble/hint, filled with round data, equals the model; (H) no zero area, side or grass < 5.

**Mutations (one per rule, all killed):** track allows w + h ≠ s · seed peg not a divisor · `samePen` orientation-sensitive · a start pen equal to its answer · two yards sharing the kept measure · `tryOn` short ↔ spare swapped · grade reading a stored target · interleave dropping a round · shuffle repeating the previous order · padlock on the wrong sign · log bar using the other measure · a rectangle that does not fit · the big-field flap shows the moving numeral during a drag (must stay "?" until Check).

**Local test:** real pointer drags along the track at 320 · 360 · 412 · 704 · 768 · 1024 · 1366, every round, both settings; sampled every frame: the rails numeral never changes during a keep-the-fence drag, the grass numeral never during a keep-the-grass drag.

**Pictures:** farm-animals sheep, goat, cow, horse, llama, donkey, pig — seen on the farm-animals contact sheet and present in `farm-animals.json`. Not used: calf (reads as a cow), lamb/foal (near-copies), duck/duckling, hen/chicken (rulings). Facing does not matter (the animal walks straight down onto the pen).
**Risks:** density at 320 on the Big field (cells 20 px) — Big is a setting, Small is the default; the handle hit area stays 56 px. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — the rail-hop clack and the breathing grass are a fidget toy; the try-on gap and coil are funny.
2. **Teacher on the board?** Yes — it is the exact 3.MD.D.8 contrast in both directions, and the slanted track is a picture a teacher can point at: "every pen whose corner is on this line has 16 rails."
3. **Parent trust?** Calm, library animals only, no words on the apparatus, nothing scored.
4. **The invention:** the far corner of a nailed-down fence loop can only slide along a slanted track, so every rail that leaves one side lands on the other — same fence, different grass.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-solved every table with my own oracle (`work-c39/fence.js`): all 24 fix targets unique on their track / seed list, starts legal and never the answer, every try-on round has exactly one right yard + exactly one "same other measure" decoy, every rectangle fits its field; the "only 12/24/36 give three seed pegs" claim holds on both fields.
- Corrected one measured bot ("thinnest" wins 1/8, not 2/8).
- **Reasoning level added without a new setting:** the big field now covers the sign of the moving measure with a "?" flap, so on the big field the child counts or computes area/perimeter to reach the target instead of sliding until a live numeral matches; the small field keeps the live numeral that shows the law. New mutation for it.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
