# PATTERNS — the twelve ways a child can act

Every one of the 200 games uses exactly one primary pattern from this list (a spec may name a secondary pattern for a sub-step, e.g. P1 to choose then P3 to count). Variety comes from content, presentation and difficulty, never from novel controls (brief §5.1): a child who has played one P2 game already knows how to play every P2 game.

Each pattern states: what the child does · which bands it suits · which subjects it fits · accessibility (touch, keyboard, colour) · how it is built from `GameCore.makeTile` / `makeButton` · the standard feedback shape · typical item count · and the FINDINGS it rests on. Band codes: **5-6**, **6-8**, **8-9**. Common rules for all patterns are in `BUILD-CONVENTIONS.md` (tap floors §3, ART §4, ANIM §5, zones §7, adaptive template §8).

The evidence that shapes the whole list: touch-first with drag-and-drop reserved for 6-9 (F-49, F-68), tap targets ≥ 80 logical px for 5-6 (F-49, F-69), cued recognition/completion formats for 5-6 (F-40), invalid moves refused not punished (F-61, F-210), the learning object as the game object (F-63, F-203), and brute-force protection (F-65).

---

## P1 — Tap one of N (choose)

**What.** A prompt (picture, numeral, word, sound cue) in zone A; 2-4 candidate tiles in zone B; the child taps the one that answers the prompt.
**Bands.** 5-6 (2-3 tiles, 80 px, picture or numeral tiles), 6-8 (3-4 tiles), 8-9 (4 tiles, may be words/expressions).
**Subjects.** Everything: counting (how many?), numeral recognition, compare (which has more?), shapes, letter recognition, initial sound, rhyme odd-one-out, vocabulary, living/non-living, materials.
**Accessibility.** The simplest pattern; one tap completes an item. Keyboard: Tab/arrows between tiles, Enter taps. Colour never the only cue: tiles differ by content, and the chosen state adds a thicker outline (§7.2).
**Build.** N × `makeTile`, laid out by BUILD-CONVENTIONS §7.1; the prompt drawn from ART. Correct tile position shuffled per item, never the same slot twice running (§13).
**Feedback shape.** Correct: tile pops, `tone("correct")`, praise, dot fills. Not yet: tile nudges, `tone("nudge")`, tile de-selects and stays enabled; the spec's misconception hint appears on the PROMPT (e.g. objects recount themselves); 3rd wrong → show-me pulse on the correct tile.
**Brute-force guard (F-65).** After each wrong tap the remaining tiles re-shuffle position (5-6: stay, but the item counts as retried); an item solved after any wrong tap never counts as first-try.
**Items.** 8-10 (5-6), 10-12 (6-8), 12-15 (8-9).
**Rests on.** F-40 (cued recognition), F-43 (enacted feedback), F-61, F-65, F-69, F-101–F-136 as content.

## P2 — Tap to place (select, then destination)

**What.** The 5-6-safe alternative to drag-and-drop. The child taps a source tile (it lifts and stays selected), then taps a destination slot; the tile glides there (`ANIM.glide`). Tapping the placed tile again returns it to the tray. Tapping a second source before a destination switches the selection.
**Bands.** 5-6, 6-8, 8-9 (all).
**Subjects.** Build a ten-frame, complete a pattern, fill number-line gaps, place letters into sound boxes, compose a word from syllables, put coins into a purse, place objects into a scene (position words), assemble a life-cycle wheel.
**Accessibility.** Two taps replace one precise drag (F-49); source and slot are both ≥ band floor. Keyboard: Tab to a source, Enter selects; Tab to a slot, Enter places. A selected tile shows selection by outline + lift (not colour alone).
**Build.** Sources and slots are both `makeTile`; slots use `fill: surface2` with a dashed `line` stroke when empty. The game keeps `selectedSource`; a slot's `onTap` calls the place logic.
**Feedback shape.** A valid placement always succeeds visually (the tile lands). Whether it is CORRECT is judged either per placement (immediate: wrong slot → tile glides back with `nudge`, the hint appears) or on a Check tile when the whole arrangement matters (the spec says which). An invalid placement (slot full, tile not allowed there) is refused: the tile springs back, no message (F-61).
**Items.** 8-10 (5-6), 10-12 (6-8), 10-12 (8-9), each item = one arrangement of 2-6 placements.
**Rests on.** F-49 (drag is 6-9), F-61, F-48 (manipulative structures), F-104, F-124.

## P3 — Tap to count (enumerate)

**What.** A set of objects in zone A; the child taps each object once; each tap greys it, shows the running numeral on it and plays one rising tone; a second tap on a counted object does nothing. When the child thinks the count is done they tap the answer (P1 tiles) or the big "done" tile, as the spec says.
**Bands.** 5-6 (sets to 10), 6-8 (sets to 20, groups for skip counting), 8-9 (arrays for multiplication).
**Subjects.** Counting, cardinality, subitising (with a brief flash variant), skip counting (tap each GROUP), arrays (tap each row), unit iteration (tap each unit chip under the object), syllables (tap a drum per syllable).
**Accessibility.** Objects are `makeTile` with the ART emoji as label and a transparent fill so the scene reads as a scene; objects ≥ band floor and ≥ 12 px apart. Keyboard: Tab walks objects in row order, Enter counts one.
**Build.** Objects arranged in a row or ten-frame (never irregular — F-105). The count is state on the game; the numeral is drawn ON the object (integrated, F-42).
**Feedback shape.** Double-tap does nothing (one-to-one is enforced by the object, F-101). A wrong final answer replays the count: objects light in turn with the numeral, the last numeral pulses ("last number = how many", F-101).
**Items.** 8 (5-6), 10 (6-8), 10-12 (8-9).
**Rests on.** F-101, F-105, F-109, F-110, F-114, F-126, F-70 (one tone per counted object), F-213.

## P4 — Tap in order (sequence)

**What.** 3-6 tiles shown scattered or in a row; the child taps them in the correct order (numbers ascending, story panels first-to-last, letters alphabetically, days of the week, size order). Each tapped tile moves to the next free slot in an ordered rail (`ANIM.glide`) and shows its position number. Tapping a rail tile returns it.
**Bands.** 5-6 (3-4 tiles, numbers to 10), 6-8 (4-5), 8-9 (5-6, may be two-digit or sentence words).
**Subjects.** Number order, count back, size/length seriation, story sequencing, alphabetical order, sentence word order (per-locale sets), life-cycle stages, daily routine/time order.
**Accessibility.** Pure taps. Keyboard: Tab/arrows between remaining tiles, Enter sends to rail. The rail position number is the second cue beside position.
**Build.** Tiles + rail slots are `makeTile`; a Check tile (`makeButton "ok"`) judges when the rail is full, OR per-tap judgement (the spec says which; 5-6 default = per-tap so an error is caught at once).
**Feedback shape.** Per-tap: a tile tapped out of turn nudges and stays (with the hint: the correct next tile gains a soft outline on 2nd error). Whole-rail: wrong pairs swap places with `glide` as the enacted correction.
**Items.** 8 (5-6), 10 (6-8), 10 (8-9).
**Rests on.** F-101 (stable order), F-102, F-129 (sequencing), F-128 (sentence order, per-locale), F-116.

## P5 — Drag and drop (6-9 only; P2 fallback built in)

> **Catalogue outcome (2026-09-05): no game is classified P5.** Every row that could have used a drag chose P2 (tap source, tap destination) as its primary pattern, because the tap-first evidence (F-49, F-68) applied to all of them and P2 is strictly more accessible. P5 therefore survives only as an OPTIONAL accelerator that a 6-8 / 8-9 P2 build MAY add on top of the specified tap-tap path (BUILD-CONVENTIONS §3): a drag that starts on a source tile and ends on a slot behaves exactly like the two taps; a drag that ends anywhere else springs back. No spec depends on it.

**What.** The child presses a tile, drags it (it follows the pointer, lifted, drop zones highlight on hover) and releases on a zone; it snaps in or springs back. **Every P5 game also accepts the P2 tap-tap path** on the same tiles, so a child who cannot drag can still play.
**Bands.** 6-8, 8-9. **Never 5-6** (F-49).
**Subjects.** Measuring by laying units end to end, placing a marker on a number line, arranging shapes to compose, balancing a scale, partitioning with a cut line handle, moving hands on a clock (see P9), sorting when the bins are far apart.
**Accessibility.** Drop zones ≥ 2× the object with a snap radius of 40 logical px; continuous feedback during drag (F-49). Keyboard: the P2 path (Tab/Enter select, Tab/Enter place). Pointer events only.
**Build.** `makeTile` for the object; `scene.input.setDraggable(api.container)`; `drag` handler moves the container; `dragend` tests zones by distance; a tap without movement (< 8 px) is treated as the P2 select.
**Feedback shape.** Invalid drop springs back (`glide` to origin, `nudge`), no message. Correct drop settles with `pop`. The spec judges per drop or on Check.
**Items.** 10-12.
**Rests on.** F-49, F-68, F-61, F-114, F-107.

## P6 — Build on a grid (compose)

**What.** A fixed grid of cells (ten-frame 2×5, twenty-frame, array R×C, hundred-square section, sound boxes, calendar week). Each tap toggles a cell filled/empty (or cycles through 2-3 states the spec names). The child builds a quantity, an array, a shape on a peg grid, or a pattern row.
**Bands.** 5-6 (ten-frame, ≤ 10 cells, 80 px cells), 6-8 (twenty-frame, small arrays), 8-9 (arrays to 10×10 with 56 px cells, hundred-square).
**Subjects.** Ten-frame quantities, number bonds (fill to 10), teen numbers (a full ten + ones), arrays for multiplication, area by tiling, symmetry (complete the mirror half), pattern rows, bar charts (fill columns), hundred-square skip-count trails.
**Accessibility.** Each cell is a `makeTile`; filled state = solid `structure` fill AND a dot glyph (ART) so the state is not colour-only. Keyboard: arrows move between cells (row-major), Enter toggles.
**Build.** Grid drawn from a single cell ART entry repeated; fill conventions mirror the physical manipulative (ten-frame fills top row left→right, F-48/F-50). A readout numeral ON the frame shows the current count when the spec allows (not when counting is the objective).
**Feedback shape.** On Check: the correct cells are compared; missing cells pulse an outline, extra cells nudge and un-fill (enacted, F-43). For bonds: the frame shows the two parts in two glyphs.
**Items.** 8 (5-6), 10 (6-8), 10-12 (8-9).
**Rests on.** F-48, F-50, F-104, F-105, F-108, F-110, F-118, F-115.

## P7 — Trace a path (draw)

**What.** Large waypoints (≥ band floor) drawn on a shape, a letter, a numeral, a number line or a maze; the child drags a finger (or taps waypoints in order — the built-in fallback) through them; the path draws itself as a thick stroke as each waypoint is reached in order.
**Bands.** 5-6 (3-5 waypoints, tap-fallback default), 6-8 (5-8), 8-9 (8-12, can be a freehand cut line).
**Subjects.** Letter and numeral formation (print only; cursive is BR/IT practice — F-25/F-38 when present), connect-the-dots counting, number-line jumps (count on/back), tracing a shape's sides (counting sides), drawing a line of symmetry, cutting a shape into halves.
**Accessibility.** Waypoint order is shown by numbered glyphs AND a faint guide stroke; reaching a waypoint pops it. Keyboard: Tab through waypoints in order, Enter reaches the next (the path draws the same). No precision required: the hit radius is the waypoint tile.
**Build.** Waypoints are `makeTile` (transparent fill, numeral label); a `Graphics` line is redrawn each time a waypoint is reached; pointer `pointermove` while down checks the next waypoint only (so order is enforced by construction).
**Feedback shape.** Touching a later waypoint first does nothing (refused, F-61); after 2 s idle the next waypoint pulses. Completed path glows `structure`; the letter/shape "sets" with `pop`.
**Items.** 8 (5-6), 10 (6-8), 10 (8-9).
**Rests on.** F-49, F-102, F-121, F-115, F-106 (number-line jumps), F-112.

## P8 — Sort into bins (classify)

**What.** A stream of items appears one at a time (or a tray of 4-8); 2-4 bins across zone B, each labelled by an ART icon (never by colour alone). The child taps the item then a bin (P2 two-tap) or, 6-9, drags it. The item glides into the bin and the bin's count glyph grows.
**Bands.** 5-6 (2 bins, one item at a time), 6-8 (3 bins), 8-9 (4 bins, may be word/number cards).
**Subjects.** Odd/even, 2D vs 3D, shape families, living/non-living, animal features, materials by property, seasons, rhyming families, initial-sound families, syllable count (1/2/3 bins), noun/verb (per-locale), greater/less than a target, coin values.
**Accessibility.** Bins ≥ 100 × 80 px; icon label drawn from ART; keyboard: Tab item → Enter → Tab bin → Enter.
**Build.** Item tile + bin tiles (`makeTile` with an ART icon label and a count sub-label).
**Feedback shape.** Per item: a wrong bin refuses gently — the item glides back to centre with `nudge` and the bin's rule icon pulses (the hint names the feature to look at: "legs?", "does it grow?"); 3rd wrong → the correct bin pulses (show-me). Counts on bins are the live progress.
**Items.** 8-10 (5-6), 12 (6-8), 12-15 (8-9).
**Rests on.** F-103, F-115, F-131, F-133, F-136, F-126, F-122, F-117.

## P9 — Set a value (dial, hands, stepper, slider)

**What.** The child sets a continuous or stepped value: turn clock hands (drag the hand tip or tap the ring hour marks), move a marker along a number line (drag or tap the target tick), press big +/− tiles to set a counter, fill a jug to a line. Zone A shows the target (a digital time, a numeral, a pointer); zone B holds the control; a Check tile commits.
**Bands.** 5-6 only in the +/− stepper form (two 80 px tiles); 6-8 and 8-9 for hands, markers and sliders (with a tap-the-tick fallback).
**Subjects.** Telling time (set the hands), number line (place a number, count on/back), estimation (set your guess), measurement (read a scale), place-value (tens/ones steppers), fractions (fill to ½).
**Accessibility.** Every control has a discrete tap alternative: the clock's 12 hour marks and 12 five-minute marks are tiles; number-line ticks are tiles; +/− steppers are tiles. Keyboard: arrows change the value by one step, Enter checks. Hands differ in length AND shape AND colour (F-113).
**Build.** Marks as `makeTile` (transparent fill); the hand/marker is an ART shape re-drawn from the current value; +/− are `makeTile` with `+`/`−` text labels from ART.
**Feedback shape.** On Check: correct → the value locks, `pop`. Wrong → the control stays where the child left it and the hint enacts the misconception: hour-hand sector shades (F-113), the number-line jumps replay, the scale's intervals highlight (F-114). The child adjusts and checks again.
**Items.** 8 (5-6 stepper), 10 (6-8), 10-12 (8-9).
**Rests on.** F-113, F-114, F-106, F-102, F-46 (support ladder).

## P10 — Predict then reveal

**What.** Something is hidden or uncertain: a covered set, a jar of objects, an unknown addend under a cup, a covered part of a word, a hidden shape behind a shutter. The child commits a prediction (P1 tap or P9 set) BEFORE the reveal; the reveal then enacts the truth (the cup lifts and the objects are counted out; the shutter slides).
**Bands.** 5-6 (2-3 choices, immediate reveal), 6-8, 8-9 (estimation with a number line, missing addend, "what is under the cup").
**Subjects.** Missing addend / subtrahend (cover a part), estimation (jar), subitising (flash then hide), part-whole (how many are hidden?), the equals sign (predict which pan drops), which letter is hidden (partial word), what comes next in a pattern, what happens when (materials: floats? melts?).
**Accessibility.** The commit is a plain P1/P9 control; the reveal is animation the child watches. Keyboard identical to P1/P9.
**Build.** A cover ART element over the hidden content; `appear`/`rise` animations for the reveal; the count-out uses the P3 highlight sequence so the reveal itself teaches.
**Feedback shape.** The reveal is the feedback — right or wrong, the truth is shown and enacted. A wrong prediction gets the misconception hint on the revealed state ("look: 4 and 2 more"), then the same or a mirrored item re-queues later (F-41).
**Items.** 8 (5-6), 10 (6-8), 10-12 (8-9).
**Rests on.** F-40 (retrieval before showing), F-46, F-101 (subitising/cardinality), F-104, F-107, F-116, F-136, F-131.

## P11 — Keypad entry

**What.** A large on-screen keypad (digits 0-9 plus backspace and OK, each ≥ 56 px, or a small letter bank for literacy) in zone B; the child types the answer into a display ON the prompt object (integrated, F-42).
**Bands.** 8-9 primarily; 6-8 for one- or two-digit answers only. Never 5-6.
**Subjects.** Times tables, two-digit addition/subtraction, counting on from a covered number, reading a scale/clock into digits, spelling a heard/pictured word (letter bank), number words → numerals (per-locale words).
**Accessibility.** Keypad keys are `makeTile`; physical keyboard digits also work (the game listens to `keydown` for 0-9, Backspace, Enter). Display font ≥ 40 px.
**Build.** A `KEYS` array of `makeTile`; the display is a text drawn on the ART prompt object.
**Feedback shape.** Wrong: the display clears with `nudge` and the enacted hint shows the structure (array rotates for commutativity F-110; base-ten blocks regroup F-106/F-108). 3rd wrong → the answer builds itself digit by digit on the display and the child re-types it (show-me).
**Items.** 12 (6-8), 12-15 (8-9).
**Rests on.** F-2 (tables demand), F-106, F-108, F-110, F-127, F-40.

## P12 — Match pairs

**What.** 6-12 tiles in a grid (visible or face-down); the child taps two; if they pair (numeral↔quantity, upper↔lower case, word↔picture, shape↔name, fact↔answer, clock↔time) both lock in place with `pop`; if not, both flip back / de-select with `nudge`.
**Bands.** 5-6 (6 tiles, all VISIBLE — memory load is not the objective), 6-8 (8-10, may be face-down), 8-9 (10-12, face-down allowed).
**Subjects.** Numeral↔set, tens-and-ones↔number, doubles, bonds to 10 (pairs that make ten), analogue↔digital clock, shape↔name, upper↔lowercase, rhyming pairs, word↔picture, synonyms/antonyms (per-locale), animal↔habitat, object↔material.
**Accessibility.** All taps; a selected tile lifts + outlines; locked pairs dim AND show a link glyph. Keyboard: arrows across the grid, Enter selects. Face-down tiles show a large ART back glyph.
**Build.** Grid of `makeTile`; the game keeps `first` selection; a pair test is a spec-supplied predicate over tile data (never string equality on labels — the same numeral can appear twice).
**Feedback shape.** Non-pair: both nudge, de-select; on the 2nd non-pair involving the same tile the correct partner gains a soft outline (hint); the board never resets. Finish = all pairs locked (F-46 success certain).
**Items.** One board = one "item" of N pairs; sessions run 2-3 boards: 5-6 (2 × 3 pairs), 6-8 (2 × 5), 8-9 (3 × 6).
**Rests on.** F-102, F-104, F-108, F-113, F-121, F-126, F-40.

---

## Pattern × band × subject quick map

| Pattern | 5-6 | 6-8 | 8-9 | Maths | Literacy | Science |
|---|---|---|---|---|---|---|
| P1 choose | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| P2 tap-to-place | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| P3 tap-to-count | ✔ | ✔ | ✔ | ✔ | (syllables) | — |
| P4 tap-in-order | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| P5 drag-and-drop | — | ✔ | ✔ | ✔ | ✔ | ✔ |
| P6 build on a grid | ✔ | ✔ | ✔ | ✔ | (sound boxes) | — |
| P7 trace a path | ✔ | ✔ | ✔ | ✔ | ✔ | — |
| P8 sort into bins | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| P9 set a value | stepper only | ✔ | ✔ | ✔ | — | (thermometer) |
| P10 predict-reveal | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| P11 keypad | — | small | ✔ | ✔ | (spelling) | — |
| P12 match pairs | visible only | ✔ | ✔ | ✔ | ✔ | ✔ |

## Rejected as core patterns (and why)

- **Swipe / flick / pinch** — gesture accuracy below 6 is poor and iframes intercept some gestures (F-49).
- **Typing words on a full keyboard** — 8-9 only and needs per-locale keyboards; folded into P11 as a small letter bank.
- **Voice / microphone** — no audio files, no permissions flow, unreliable in iframes; out of scope.
- **Two-player / turn-taking** — competition evidence for this age is negative (F-45); a partner character may appear inside P1-P12 but never as a second input.
- **Timed rhythm tapping** — a timer in disguise (F-45, F-64); skip-count rhythm is expressed through P3 with a steady optional metronome that never ends the item.
