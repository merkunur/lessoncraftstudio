# Row 155 — The Snip-Out Tape (2.MD.A.4)

## 0. Identity
- id `span-length-gap.how-much-longer.2-md-a-4` (frozen) · Grade 2 · CCSS 2.MD.A.4 · Measurement & Data · own files `snip-tape-core.js`, `snip-tape-activity.js`, `snip-tape-activity.html`, `snip-tape-activities.json` (the row leaves `span-length-gap-activities.json`, which is emptied to `[]`). Page title and intro stay frozen ("Span the inchworm measures the gap…"); Span stays a NAME in the title and the prose only. The old hand-drawn inchworm SVG is removed (LAW rule 5).
- worksheets covered: **G2-236 "How Much Longer?"** (measure both objects in units, write how many units longer).
- the old activity: two coloured bars with their lengths already printed on them ("8 cm", "5 cm"), type the difference on the keypad. Nothing was measured, so the "measure" half of 2.MD.A.4 was missing. Kept: the families of the old pairs (pencil/crayon, snake/worm, branch/twig → real library pictures of comparable things), "type how much longer", cm as the unit, a keypad answer, the frozen metadata.

## 1. The pitch
"Mark where each thing ends on one shared tape, then snip the tape between your two marks — the piece you cut out IS the gap, and it counts itself from zero."

## 2. Why a child will want it again
- Two real library things lie on two lanes — a caterpillar and a centipede, a goldfish and a fish, a toy plane and a toy car — pushed against a wooden **zero wall**. Under them runs one yellow tape measure the child can actually handle.
- Two clothes-peg **clips** (coral and teal) ride the tape. They click from centimetre to centimetre under the finger and drop a dashed plumb line up through the lane, so the child sees the line touch the caterpillar's nose.
- The moment both clips are on, the stretch of tape between them glows like a highlighter: the gap already exists as a THING you can see before you have a number for it.
- The earned show: after Check two zig-zag snips appear at the clips, the glowing piece of tape lifts off and floats up into the gap tray, and its own numbers count up from 0 with one soft pop per centimetre — "1… 2… 3… 4!" — then it flips over and shows the child's typed number on its back.
- Free play: before the first Check and after success the clips slide anywhere and the glow stretches and shrinks with them; in "loose starts" the child also gets to shove things against the wall with a wooden *clack*.
- No timer, no score, no streak.

## 3. The skill and the misconception
- **Skill (2.MD.A.4):** measure two objects in a standard unit (cm) and express how much longer one is than the other in that unit. G2-236 does it with unit squares; the screen does it with a centimetre tape. The answer is a length, so the hand that finds it is a measuring hand.
- **Misconceptions the apparatus makes visible, and how it pushes back:**
  1. **Answering with the longer length** ("11"). The snipped piece is physically only 5 long; on a miss a ghost strip of the child's number is laid under it from the same zero and sticks out far past it.
  2. **Adding the two lengths** ("16"). The ghost strip is longer than either thing; when the sum is longer than the tray (14 cm at 0–12, 22 cm at 0–20) it runs into the tray's right wall and buckles.
  3. **Counting tick lines instead of spaces** ("6" for a 5 cm gap). The piece has 6 tick lines but 5 spaces; miss 2 puts one dot in each SPACE, so dots and lines visibly disagree by one.
  4. **Comparing ends that do not start together** (setting "loose starts"). The clips would happily mark the two ends, but then the snipped piece would be the difference of the ENDS, not of the lengths. The core refuses to grade until both things touch the zero wall — the push is the lesson: lengths are compared from the same start.

## 4. The stage (what is on the screen)
Stacked layout (the instrument is wide; the bubble sits under it).

At **704 px** (stage ≈ 660 × 600):
- **Zero wall**: a 14 × 440 px wooden post (drawn, `#C9A86B`, 3 px ink outline) at the left edge of the board.
- **Lane A (top) and lane B (bottom)**: each 184 px tall, cream `#FBF3E4` shelves with a 2 px teal underline, from the wall to the right end of the tape. On each lane lies ONE library picture, scaled so that its alpha bounding box is exactly `len × u` px long and registered with its left edge on the wall (the worksheet's artExtent zero registration, `measuredObject`). `u` = 46 px on ruler 0–12, 28.6 px on ruler 0–20. Every picture's short side is between 96 and 180 px (measured per round, §6).
- **The tape**: between the lanes, 52 px tall, yellow `#F2C14E`, 2 px ink border; ticks 12 px (cm), 20 px (5s), 26 px (10s); numerals Baloo 2 800 18 px on every cm at 0–12, 14 px on every cm at 0–20; the unit "cm" printed once at the right end (the unit is content). The tape runs 0 … max + 1.
- **Clips**: coral clip (belongs to lane A) and teal clip (lane B), drawn pegs 34 × 58 px with 48 × 64 px hit areas, parked off the right end of the tape. A coral stripe on lane A's left end and a teal stripe on lane B's tell the child which clip is whose. A dashed 2 px plumb line in the clip's colour runs from the clip to its own lane.
- **The glow**: when both clips are on the tape, the tape between them takes a 40 % lemon overlay with diagonal hatching, and a small flag on it shows "?" (then the typed number).
- **Gap tray**: a shallow drawn tray (660 × 70) above lane A, empty at rest, with its own tiny zero mark at the left. The snipped piece lands here.
- **Answer**: the shell keypad (`answerType:'number'`, 1–20) under the board; Check is the shell's.
- **Bubble**: one line under the board.
- **Task line** (≤ 2 lines, 22 px): "Clip where each thing ends. How much longer is the long one? Type it." No other words on the apparatus.

At **360 px** (stage ≈ 340 wide): same order (tray 44 px, lane A 104 px, tape 40 px with 13 px numerals — every cm at 0–12, every 2nd cm at 0–20 — lane B 104 px), wall 10 px, `u` = 24.8 px (0–12: 13 × 24.8 = 322 + 10 = 332 ≤ 340) / 15.3 px (0–20: 21 × 15.3 = 321 + 10 = 331). (The first draft's 25.4 / 15.7 px made the tape 330 px + a 14 px wall = 344 px — 4 px wider than the stage; measured by the critic.) Every picture ≥ 64 px short side (§6; the tightest is the crayon at 11 cm: 11 × 24.8 / 4.24 = 64.3 px). Clips 30 × 50 drawn, 44 × 60 hit areas; when the clips would overlap (gap ≤ 2 cm on 0–20) the teal clip hangs below the tape instead of above so both stay grabbable. Check above the 360 × 740 fold; at 320 × 640 the tray shrinks to 34 px and the lanes to 96 px; there u = 22 px (0–12) / 13.6 px (0–20), so the thinnest pictures (crayon, tie, shovel) fall to 57–58 px short side — the 64 px floor is the orchestrator's 360 px rule; at 320 the gate asserts ≥ 56 px and that nothing overlaps.

## 5. The hand (every interaction)
- **Drag a clip** along the tape: horizontal only, snaps to whole cm on release (120 ms ease), a dry *tick* per cm crossed (optional). The plumb line follows within one frame. Tap a clip, then tap a spot on the tape → it jumps there (no-drag path). Arrow keys move the focused clip 1 cm, Shift+Arrow 5 cm.
- **Drag a thing** (loose starts only): the picture slides along its lane; when its left edge meets the wall it locks on with a wooden *clack* (60 ms squash). It cannot leave the right end. With "lined up" the pictures are fixed.
- **Keypad**: the shell's; the typed number also appears on the glow's flag, so the answer lives ON the gap.
- **Undo**: everything moves until Check; after a miss any move clears the help.
- **Free play**: clips move freely before the first Check and after success; after success the tray piece can be tapped to replay its count.

## 6. The rounds
One round = one pair of things. The child places both clips (and pushes the things, in loose starts), types the gap, presses Check.

**Level 1 — ruler 0–12** (u 46 px at 704 / 25.4 px at 360; short sides from each picture's measured alpha box):

| # | lane A (top) | lane B (bottom) | gap | short side A · B (704/360) |
|---|---|---|---|---|
| 1 | insects-and-bugs/caterpillar 4 | insects-and-bugs/centipede 7 | 3 | 144/78 · 178/96 |
| 2 | clothing/shoe 6 | classroom/crayon 11 (turned 90°) | 5 | 157/87 · 119/66 |
| 3 | toys/airplane 8 | toys/car 6 | 2 | 175/96 · 177/98 |
| 4 | vegetables/parsnip 11 (turned 90°) | forest-creatures/lizard 5 | 6 | 170/93 · 176/97 |
| 5 | pets/goldfish 4 | pets/fish 5 | 1 | 150/83 · 154/85 |
| 6 | accessories/wand 10 (turned 90°) | classroom/stapler 6 | 4 | 164/90 · 140/77 |
| 7 | toys/train 5 | classroom/crayon 12 (turned 90°) | 7 | 171/94 · 130/72 |
| 8 | vegetables/celery 9 (turned 90°) | toys/truck 5 | 4 | 145/80 · 154/85 |
| 9 | vehicles/canoe 8 | toys/airplane 6 | 2 | 171/94 · 131/72 |

**Level 2 — ruler 0–20** (u 28.6 / 15.7):

| # | lane A | lane B | gap | short side (704/360) |
|---|---|---|---|---|
| 1 | accessories/tie 17 (turned 90°) | insects-and-bugs/centipede 9 | 8 | 134/74 · 142/78 |
| 2 | insects-and-bugs/caterpillar 6 | vegetables/parsnip 17 (turned 90°) | 11 | 134/74 · 162/89 |
| 3 | toys/skateboard 16 | toys/airplane 11 | 5 | 141/77 · 149/82 |
| 4 | vegetables/celery 15 (turned 90°) | pets/fish 8 | 7 | 150/82 · 152/84 |
| 5 | pets/goldfish 6 | around-the-house/shovel 19 (turned 90°) | 13 | 139/77 · 149/82 |
| 6 | accessories/wand 13 (turned 90°) | classroom/stapler 10 | 3 | 132/72 · 144/79 |
| 7 | toys/car 8 | tools/hammer 12 (turned 90°) | 4 | 147/81 · 161/88 |
| 8 | vegetables/leek 12 (turned 90°) | toys/truck 8 | 4 | 160/88 · 152/84 |
| 9 | forest-creatures/lizard 7 | accessories/tie 20 (turned 90°) | 13 | 153/84 · 157/86 |

- (The 360 column above was computed with the first draft's u = 25.4 / 15.7; at the corrected u = 24.8 / 15.3 every 360 value drops by 2.4 % — the minimum is the crayon at 11 cm, 64.3 px; re-measured by the critic's script `work-c30/c155.js` from `scripts/worksheet-gen/data/art-extents.json`.)
- **Only exact 90° turns or none.** Pictures drawn standing upright are laid down by exactly 90°; pictures drawn lying flat are used as drawn. No diagonal drawing (pencil, pen, marker, carrot, cucumber, spoon, comb, flashlight) is used: a slanted picture measured horizontally lies about its length. Measured aspect ratios (long/short side of the alpha box): goldfish 1.23, caterpillar 1.28, lizard 1.31, train 1.35, truck/fish 1.50, car 1.56, shoe 1.76, centipede 1.81, stapler 1.98, airplane 2.11, hammer 2.13, leek 2.14, canoe 2.16, wand 2.82, celery 2.86, parsnip 2.99, skateboard 3.25, tie 3.63, shovel 3.64, crayon 4.25. Each object's length sits inside the band where its short side stays 96–180 px at 704 and 64–104 px at 360, so a picture is never tiny and never towers over its lane. This is also why the lengths look "right" — a caterpillar is 4–6, a shovel 19.
- **Answer balance (measured):** the longer thing is on top in 5/9 (L1) and 5/9 (L2). The gap never equals either length (every row checked), so a number read straight off one clip is never right. Gaps L1 = 3,5,2,6,1,4,7,4,2 (1–7); L2 = 8,11,5,7,13,3,4,4,13 (3–13). No equal lengths; no 0 anywhere.
- **Loose starts:** each thing starts `s` cm from the wall, `s` from {1,2,3} with `s + len ≤ max + 1`; A and B never share the same `s` (otherwise the ends would tell the truth by luck); the thing with the longer length gets the SMALLER `s` in about half the rounds, so the visibly further-reaching end is the longer thing only half the time.
- **Order:** an order-only reshuffle per pass within each level (`nextTask`, never the same order twice in a row); lane assignment stays as tabled so the measured balance holds.

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: no clip on the tape → "Clip the end of each thing first."; clips on, nothing typed → "Now type how much longer."; loose starts with a thing off the wall → "Push both things against the wall first." (that thing gives a small shake toward the wall).
- **A clip in the wrong place** (graded first — it is a measuring error, a miss): the object's real end gets a small ink notch and the strip of lane between the plumb line and the notch is shaded in that clip's colour. Hint: "Slide the coral clip to the very end of its thing." / "Slide the teal clip to the very end of its thing."
- **Miss 1** (clips right, number wrong): the snip happens; the piece lifts into the tray WITHOUT its numbers, and directly under it a dashed ghost strip exactly as long as the child's number is laid from the tray's zero. Too long → the ghost sticks out past the piece (a sum hits the tray wall and buckles). Too short → the piece sticks out. Hint: **"Your number is the dashed strip. Is it as long as the gap?"**
- **Miss 2**: one dot in every centimetre SPACE of the piece (never on the lines), pulsing left to right once. Hint: **"Count the spaces on the piece — one dot is one centimetre."**
- Any new move (clip, keypad, push) removes the notch shading, the ghost and the dots until the next Check.
- **Success**: snip, lift, the piece counts up 0 → gap (one pop per cm, 120 ms each), flips to show the typed number; each thing glows in its own clip's colour for 600 ms, and the longer one's overhang past the shorter one's end flashes lemon — the same length as the piece in the tray. Bubble: **"The top one is 11 cm, the bottom one is 5 cm — 11 − 5 = 6. It is 6 cm longer!"** (mirror string when the bottom one is longer).

## 8. Settings
1. **Ruler**: 0–12 cm (Level 1, default) · 0–20 cm (Level 2) — the tape visibly changes scale and numbering.
2. **Starts**: lined up at the wall (default) · loose, push them to the wall — at rest the two things visibly sit away from the wall.

## 9. Words
- title: "Span's Length Gap" (frozen)
- task line: "Clip where each thing ends. How much longer is the long one? Type it."
- prompt (shell): "Type how many cm longer."
- hints: "Clip the end of each thing first." · "Now type how much longer." · "Push both things against the wall first." · "Slide the coral clip to the very end of its thing." · "Slide the teal clip to the very end of its thing." · "Your number is the dashed strip. Is it as long as the gap?" · "Count the spaces on the piece — one dot is one centimetre."
- celebration (two strings): "The top one is {a} cm, the bottom one is {b} cm — {a} − {b} = {gap}. It is {gap} cm longer!" · "The bottom one is {a} cm, the top one is {b} cm — {a} − {b} = {gap}. It is {gap} cm longer!"
- settings: "Ruler" · "0–12 cm" · "0–20 cm" · "Starts" · "Lined up" · "Loose — push them to the wall"
- aria: "coral clip at {n} centimetres" · "teal clip at {n} centimetres" · "top thing" · "bottom thing" · "the gap is {n} centimetres" (after success)
- **Locale traps:** "cm" is the same in all 11; minus U+2212 with spaces; fr needs U+202F before "!" and ":". The comparative agrees with a noun in fr/es/pt/it/de, so the strings never name the object — they use a fixed "the top one / the bottom one" per locale (fr « celui du haut », es «el de arriba», pt «o de cima», it «quello in alto», de „das obere", nl "de bovenste", sv "den övre", da/no "den øverste", fi "ylempi") and the grammar agrees with that fixed noun. fi "6 cm pidempi" (cm uninflected); de "6 cm länger". Picture names never appear, so the library's label quirks cannot leak. The old sv labels "Sugrör"/"Nyckel" disappear with the bars. da/no/fi metadata is written new at build.

## 10. Sound off, access, phones
- Sound off: glow, plumb lines, notch shading, ghost strip, dots and the count-up all show; ticks and pops only decorate.
- Keyboard: Tab → coral clip → teal clip → (loose: top thing, bottom thing) → keypad → Check; arrows move the focused clip/thing.
- Clips are `role="slider"` with `aria-valuenow` in cm; the bubble is aria-live.
- Taps ≥ 44 px; pictures 96–180 px short side at 704, 64–104 at 360 (gated per round). Check above the fold at 360 × 740 and 320 × 640.

## 11. Distinct from
- **comparison-planks** (premium tool): there the long plank's overhang comes off and lands on the end of the short one so both reach the same. Here nothing is added to the short thing — the GAP is cut out of the shared ruler and counts itself; the measuring is done by clipping one tape.
- **#99 Travelling Cord** (shorter/longer tags, no units), **#100 One-Hop Helpers** (laying units), **unit-handle / unroll-tape / ruler** (one object), **#152–154** (reading a ruler, estimating): none measures two things on one tape and cuts the difference out.
- Built registry: no clip-and-snip mechanic.

## 12. Build plan
- **Core state:** `{round, clipA:null|int, clipB:null|int, startA, startB, typed:null|int, miss:0}`; `endA = startA + lenA`. Functions: `placeClip(which, cm)` (clamped 0..max+1), `pushToWall(which)`, `ready()`, `grade()` → `{ok, kind:'notWall'|'clipA'|'clipB'|'number', ghost, gap}`; clip A is right ⇔ `clipA === lenA` with `startA === 0`.
- **Gate's own truth (verify):** recompute every gap from the table; assert gap ≥ 1, ≠ lenA, ≠ lenB; longer-on-top share in [0.4, 0.6] per level; every picture's short side (artExtent box × u) in [96, 184] at 704, [64, 104] at 360 and ≥ 56 at 320; the tape + wall ≤ the stage width at 704, 360 and 320 (the first draft overflowed 360 by 4 px); every theme/noun present in `mini tools/pictures/<theme>.json`, colour theme only, on the 20-noun allow-list (the nouns in §6 only) (no diagonal drawings); loose starts unequal and `s + len ≤ max + 1`.
- **Mutations (each killed):** grade accepts `typed === lenA`; grade accepts `lenA + lenB`; grade ignores clip position; loose mode grades before the push; dots drawn on the lines (gap + 1 dots); ghost strip drawn from the clip instead of the tray zero; picture scaled by image box instead of alpha extent; a round where gap = shorter length; reshuffle repeats the previous order; Check with nothing typed counts a miss.
- **Pictures:** all 20 nouns were seen on contact sheets and confirmed present in their `mini tools/pictures/<theme>.json` (insects-and-bugs caterpillar/centipede; classroom crayon/stapler; clothing shoe; toys car/train/truck/airplane/skateboard; vehicles canoe; pets goldfish/fish; forest-creatures lizard; vegetables parsnip/celery/leek; accessories tie/wand; tools hammer; around-the-house shovel); aspects measured from the cache. NOT used although drawn: insects-and-bugs millipede and slug and classroom eraser exist in the image cache but have no lcs-pictures label. The build re-measures artExtent and fails if a short side leaves its band.
- **Risks:** the hammer is T-shaped — its measured length is handle-to-head, which is what a child measures; keep. The tie at 90° points right; fine.
- **Blocked:** nothing.
- **The old content kept:** the old pairs' families survive as real pictures (pencil/crayon → crayon; snake/worm → centipede/caterpillar; branch/twig → celery/leek; ribbon/scarf → tie). The old "blue bar 20 / red bar 8" (gap 12) round is dropped with the bars.

## 13. The four questions
1. **Choose it again?** Yes — clips that click along a real tape, things to shove against a wall, a piece of ruler that flies up and counts itself.
2. **Teacher on the board?** Yes — exactly "measure both, then find how much longer"; the snipped piece is the subtraction bar made of ruler, and the four classic errors each get a physical answer.
3. **Parent trust?** Library pictures only, honest scale, no words on the apparatus, calm, works on a phone.
4. **Invention:** the gap between two clips on one tape is snipped out and counts itself from zero.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Measured every row with my own script (art-extents.json × u): all 20 pictures exist in their theme JSONs, gaps 1–7 / 3–13, gap never equals a length, longer-on-top 5/9 per level — the designer's claims hold.
- Found the 360 px tape overflowing the stage (13 × 25.4 + 14 = 344 > 340): u is now 24.8 / 15.3 px with a 10 px wall; the minimum short side is 64.3 px (crayon 11 cm). The 320 px claim "pictures still ≥ 64" was false (57 px) — now an honest ≥ 56 at 320 gate; the 64 floor is a 360 rule.
- "A sum buckles at the tray wall" was only true for sums longer than the tray — corrected.
- Success colours no longer imply the longer thing is always coral (coral is lane A's clip); the overhang flashes the same length as the snipped piece.
- Recorded which old pairs survive and which old round is dropped.
