# Row 34 — The Drop-Down Stands (K.MD.A.2)

## 0. Identity
- id `choice-board.compare-length.k-md-2` (KEPT; slugs, titles, intros frozen in all 11 locales) · grade K · CCSS K.MD.A.2 · Measurement & Data · own files `drop-stands-core.js`, `drop-stands-activity.js`, `drop-stands-activity.html`, `drop-stands-activities.json` (the row leaves `choice-board-activities.json`).
- worksheets covered: K-035 Tall and Short · K-037 Long and Short · K-032 Big and Small · K-079 Big Shapes, Small Shapes (the biggest in a row) · K-040 Big Ones Only is owned by #32's size window.
- old activity: the same noun at two sizes, tap the taller / longer / shorter. **Kept**: same-noun pairs, the three questions (taller, longer, shorter), the round list pencil, candle, carrot, giraffe, crayon, ruler, marker, sunflower, cucumber, corn. **Fixed**: tree/pine and tree/palm do not exist in the library (`mini tools/pictures/tree.json` holds only fruit trees) — replaced by tree/coconut (a palm) and beach/lighthouse. **New**: the stands, the start wall, the level beam, the rows of 3–4.

## 1. The pitch
"Things stand on stands of different heights, so their tops lie — bring them down to the same floor (or push them to the same wall) and a level beam shows which really is taller or longer."

## 2. Why a child will want it again
- The stands are a toy: drag a picture down and its stand folds away under it with a satisfying "clack-clack" like a camping stool; the picture lands on the floor with a little bounce.
- The trick is fun to discover: in many rounds the SHORTER thing is on the higher stand, so its top looks higher. The first time the stands drop on Check and the "tall" one turns out short, children shriek; after that they love bringing everything down to the floor first — they are doing the measuring move on their own.
- The level beam is the reveal: a long golden bar glides down from above and rests — "tok" — on the tallest top; the shorter one is left with a glowing gap under the beam. For lengths, a beam slides in from the right and stops at the longest end.
- Rows of four are a little race to the beam. No timer, no score.
- Free play: after a round, the stands can be folded and unfolded and the pictures dragged up and down to fool yourself.

## 3. The skill and the misconception
- Skill (K.MD.A.2; K-035, K-037, K-032, K-079): directly compare two objects with a measurable attribute in common — taller/shorter, longer/shorter, bigger — and find the tallest, shortest, longest or biggest in a row. Direct comparison means lining up the ends.
- Misconceptions: (a) comparing tops (or right-hand ends) without a common base line — the single most common K length error; (b) "the higher one is taller"; (c) judging length by where the far end sits rather than by end-to-end; (d) in a row, comparing only neighbours.
- Push-back by the material: the stands are honest objects — a picture on a stand is the same height as on the floor, but its top is lifted. Check folds every stand, so all pictures stand on ONE floor (or slide to ONE wall), and the level beam touches only the true tallest/longest. The child sees with their own eyes that the start of the measurement decides — and is free to align first.

## 4. The stage
**Height rounds** at 704 (stacked, stage ≈ 660 × 440):
- **Floor line**: drawn, 6 px #0F4A40, across the stage at y = 400.
- **Stands**: drawn pedestals — a top plate 120 × 10 with two folding legs (3 px ink, cream fill #FFF3DA), heights 0 / 40 / 80 / 120 px. Folding animates the legs flat (200 ms).
- **Pictures** standing on their stands (or on the floor): two things in columns 230 px wide at x = 200 / 460; pictures up to 220 px tall (fitted by ink box; the BOTTOM of the ink box sits exactly on the plate or floor — no whitespace gap). Rows of 3–4: columns 150 px, pictures ≤ 200 px tall.
- **The level beam**: a drawn golden bar 600 × 12 (#E0A400, ink edge) parked above the top of the stage, visible only during the reveal.
- **Check** under the floor, right, 48 px.
**Length rounds** at 704: two (or 3–4) drawn **shelves** (rails 600 × 8) stacked 110 px apart; a **start wall** (a 12 × 80 block) at the left end of each rail; objects lie along the rails (laid flat by a per-noun angle — the library pencil, ruler and marker are drawn diagonally), up to 520 px long, starting 0–110 px away from the wall. The beam for lengths is vertical (12 × 330), parked off the right edge.
At 360 (stage ≈ 336 wide): height — two columns 160 px, pictures ≤ 150 px tall, stands 0 / 26 / 52 / 78 px; rows of 4 in 82 px columns (picture width ≤ 78, height ≤ 140; the whole column is the tap target). Length — rails 320 px, objects ≤ 260 px, offsets ≤ 56 px, rails 72 px apart. Stage ≈ 330 px tall, Check under it → above the 360 × 740 and 320 × 640 folds (at 320: rails 288, objects ≤ 232).

Library pictures (verified in `mini tools/pictures/*.json`, contact sheets 2026-10-17): tree/coconut, beach/lighthouse, zoo-animals/giraffe, flowers/sunflower, christmas/candle, vegetables/corn, tools/ladder, kitchen-tools/bottle, classroom/crayon (standing stub) · classroom/pencil, classroom/ruler, classroom/marker, vegetables/carrot, vegetables/cucumber, bakery/baguette (lying). Shapes for "biggest" rows are drawn SVG (circle, square) in one fill. No words on the apparatus.

Task line (EN): "Which one is taller?" · "Which one is longer?" · "Which one is shorter?" · rows: "Which one is the tallest?" · "…the longest?" · "…the shortest?" · "…the biggest?"

## 5. The hand
- **Drag a picture down to the floor** (height) → its stand folds (legs swing flat, 200 ms, "clack-clack" two 600 Hz ticks) and the picture drops onto the floor line (bounce 2 px, 120 ms). Or **tap a stand** to fold it. Dragging a floor picture UP onto its folded stand unfolds it again (free play / undo).
- **Drag a picture left to the wall** (length) → it slides along its rail and stops against the start wall ("tok", 300 Hz). Drag it away again to undo.
- **Tap a picture** → choose it (teal ring 4 px, 80 ms); tap another → the ring moves. In rows, one choice.
- **Check** → the reveal (§7).
- Keyboard: Tab across pictures; ArrowDown (height) / ArrowLeft (length) aligns the focused one; Space chooses; Tab to Check.
- Free play after success: stands and slides stay live; the beam can be re-run by tapping it.
- Optional TTS: the task line speaker reads the question.

## 6. The rounds
Sizes are uniform scales of one library picture, measured on the ink box (`scripts/worksheet-gen/data/art-extents.json` gives each picture's ink bounds; tops and ends are computed from it, never from the image box). Every pair differs by ≥ 15 % of the larger; in rows consecutive sizes differ by ≥ 15 %. "Lure" = the stands/offsets make the WRONG answer look right (the shorter top sits higher, or the shorter one's end reaches further right).

**Compare two** (the old 12, kept and repaired). Stand heights in 704 px (phones × 0.65); offsets in px from the wall.
| # | noun | question | sizes (left / right) | right answer | stands or offsets (left / right) | lure |
|---|---|---|---|---|---|---|
| 1 | tree/coconut | taller | 1.00 / 0.78 | left | 0 / 80 | yes |
| 2 | classroom/pencil | longer | 0.80 / 1.00 | right | 90 / 0 | no |
| 3 | christmas/candle | shorter | 1.00 / 0.74 | right | 0 / 120 | yes |
| 4 | vegetables/carrot | longer | 1.00 / 0.82 | left | 0 / 110 | yes |
| 5 | zoo-animals/giraffe | taller | 0.80 / 1.00 | right | 120 / 0 | yes |
| 6 | classroom/crayon | shorter | 0.70 / 1.00 | left | 40 / 0 | no |
| 7 | beach/lighthouse | taller | 1.00 / 0.84 | left | 0 / 80 | yes |
| 8 | classroom/ruler | longer | 0.82 / 1.00 | right | 110 / 0 | yes |
| 9 | classroom/marker | shorter | 1.00 / 0.76 | right | 0 / 0 | no (lined up) |
| 10 | flowers/sunflower | taller | 0.82 / 1.00 | right | 120 / 40 | yes |
| 11 | vegetables/cucumber | longer | 1.00 / 0.80 | left | 0 / 0 | no (lined up) |
| 12 | vegetables/corn | shorter | 1.00 / 0.72 | right | 40 / 120 | yes |
Right answer left 6 / right 6; lure in 8 of 12; lined up (no stands, no offsets) in 2 — the gate computes every top/end WITH its stand or offset (700 px scale: height 220 px, length 520 px) and asserts that judging the question by the tops/ends as they stand is right in exactly the 4 unlured rounds (2, 6, 9, 11) and wrong in the 8 lured ones — only aligning works every time.

Note the marker is lying (length → "shorter" means less long) and the crayon and candle and corn are standing (height → "shorter" means less tall): K.MD.A.2's "shorter" works for both, which is why both appear.

**A whole row** (K-035, K-037, K-079). Sizes listed slot 1 → 4; stands/offsets in px.
| # | noun | question | sizes | right slot | stands / offsets |
|---|---|---|---|---|---|
| R1 | zoo-animals/giraffe | tallest | 0.66 / 1.00 / 0.82 | 2 | 80 / 0 / 120 |
| R2 | classroom/pencil | longest | 0.82 / 0.56 / 0.68 / 1.00 | 4 | 0 / 110 / 60 / 30 |
| R3 | beach/lighthouse | shortest | 1.00 / 0.56 / 0.82 / 0.68 | 2 | 0 / 120 / 40 / 80 |
| R4 | circle | biggest | 0.68 / 0.82 / 0.56 / 1.00 | 4 | 120 / 40 / 80 / 0 |
| R5 | vegetables/carrot | shortest | 0.82 / 1.00 / 0.66 | 3 | 60 / 0 / 0 |
| R6 | tools/ladder | tallest | 1.00 / 0.82 / 0.56 / 0.68 | 1 | 0 / 80 / 120 / 40 |
| R7 | square | biggest | 0.56 / 1.00 / 0.68 / 0.82 | 2 | 120 / 0 / 80 / 40 |
| R8 | bakery/baguette | longest | 0.68 / 0.82 / 1.00 | 3 | 60 / 110 / 0 |
| R9 | kitchen-tools/bottle | shortest | 0.82 / 1.00 / 0.66 | 3 | 40 / 0 / 120 |
Right slot: 1 ×1, 2 ×3, 3 ×3, 4 ×2 — gated: no slot > 40 % of a pass; the lured slot (highest top / furthest end) is the right one in ≤ 2 of 9.

**Start: on the floor** setting: the same rounds with every stand height 0 and every offset 0 (the alignment is done for the child — the gentle level for the youngest).
- **Answer position**: balanced as listed; the reshuffle mirrors left↔right (and reverses rows) on alternate passes, re-deriving the right slot from the sizes, never from a stored index.
- **Order**: order-only reshuffle per pass (`nextTask`), never the same sequence twice.

## 7. Check, the misses, the success
- Check with nothing chosen → bubble "Tap the one you think is {taller/longer/shorter}." (no miss)
- **The reveal (every Check)**: any stand still up folds (pictures drop, 220 ms, staggered 80 ms) or any object still off the wall slides to it; then the beam glides in (height: down from above; length: in from the right; 500 ms ease-out) and rests on the tallest top / longest end ("tok"). For "shorter"/"shortest" the beam still rests on the tallest/longest, and every shorter one shows its gap under the beam (coral, 50 %) — the shortest has the biggest gap.
- **right** → the chosen picture's ring turns gold and it does a small hop; bubble: "Yes — on the same floor, this one is taller!" · "Yes — from the same wall, this one is longer!" · "Yes — this one is shorter!" · rows: "Yes — this one is the tallest!" / "…the longest!" / "…the shortest!" / "…the biggest!"
- **miss 1** (wrong choice): the reveal already shows the truth; the gap between the beam and the chosen picture's top/end pulses coral. Hint: "Down on the same floor, look where the beam rests." (length: "Pushed to the same wall, look where the beam stops.")
- **miss 2**: the right picture gets a soft gold halo; hint "This one reaches the beam." (shorter questions: "This one is furthest from the beam.")
- choosing again takes the halo away; the pictures STAY aligned after miss 1 (the child now compares fairly).
- After success: the stands spring back up (free play) and a tiny gold tick appears under the floor line of the round's chip in the progress chip — no score.

## 8. Settings
1. **Compare**: Two things / A whole row — the stage changes at rest (2 columns or 3–4).
2. **Start**: On stands / On the floor — at rest the pictures stand on uneven stands (or sit away from the wall) vs all lined up.

## 9. Words (EN source)
- title (instrument) "The Drop-Down Stands"
- instruction "Things on stands can trick you. Bring them down to the same floor — or the same wall — then choose."
- prompts: "Which one is taller?" · "Which one is longer?" · "Which one is shorter?" · "Which one is the tallest?" · "Which one is the longest?" · "Which one is the shortest?" · "Which one is the biggest?"
- hints: "Tap the one you think is taller." (/longer/shorter, ×7 with the row forms) · "Down on the same floor, look where the beam rests." · "Pushed to the same wall, look where the beam stops." · "This one reaches the beam." · "This one is furthest from the beam."
- celebrations: "Yes — on the same floor, this one is taller!" · "Yes — from the same wall, this one is longer!" · "Yes — this one is shorter!" · "Yes — this one is the tallest!" · "…the longest!" · "…the shortest!" · "…the biggest!"
- settings: "Compare" — "Two things" / "A whole row" · "Start" — "On stands" / "On the floor"
- aria: "Stand, up" / "Stand, folded"; "Start wall"; "Level beam"; pictures "{noun}, {position}".

Locale traps:
- **taller vs longer is split differently in every language** (see #32): the vertical comparative for things is de "höher/größer" (a giraffe "größer", a lighthouse "höher" — the reviewer picks per noun or uses "größer" for all upright things), fr "plus haut/plus grand", es "más alto", pt "mais alto", it "più alto", nl "hoger" (not "langer"), sv "högre", da "højere", no "høyere", fi "korkeampi"; horizontal: de "länger", fr "plus long", es "más largo", pt "mais comprido", it "più lungo", nl "langer", sv "längre", da "længere", no "lengre", fi "pidempi". **"shorter" splits too** (key `shorterHeight` vs `shorterLength`): de "niedriger/kleiner" vs "kürzer", fr "moins haut / plus petit" vs "plus court", es "más bajo" vs "más corto", pt "mais baixo" vs "mais curto", it "più basso" vs "più corto", nl "lager" vs "korter", sv "lägre" vs "kortare", da "lavere" vs "kortere", no "lavere" vs "kortere", fi "matalampi" vs "lyhyempi". The round table marks each "shorter" round as height (candle, crayon, corn, lighthouse, bottle) or length (marker, carrot).
- Comparative vs superlative with two: en "taller", most languages comparative; rows use the superlative (de "am höchsten", fr "le plus haut", fi "korkein").
- "this one" is gender-neutral in en; fr "celui-ci/celle-ci", es "este/esta", it "questo/questa", pt "este/esta", de "dieses" (neutral for "Bild") — anchor to a fixed neuter/feminine noun per locale ("das Bild", "l'image" → "celle-ci", "la imagen", "l'immagine", "a imagem"), the house pattern for gender-safe prompts.
- No noun appears in any sentence (pictures carry the noun) — no article/definiteness trap.

## 10. Sound off, access, phones
- Silent-legible: folding stands, the floor, the wall, the beam and the coral gap show everything.
- Keyboard path in §5; aria-live announces "All on the floor" / "Beam rests on picture 2".
- Taps: whole columns are targets (≥ 78 px wide at 360); stands ≥ 44 px wide; Check 48 px.
- Pictures ≥ 96 px at 704 (smallest row size 0.56 × 200 = 112 px tall) and ≥ 64 px on phones for the two-thing level (0.70 × 150 = 105); in rows of 4 at 360 the smallest picture is 0.56 × 140 = 78 px tall.
- Phone: stage ≈ 330 px; Check visible at 360 × 740 and 320 × 640.
- prefers-reduced-motion: stands fold instantly; the beam appears in place.

## 11. Distinct from
- #32 The Measuring Stations: what long/tall/heavy MEAN (one object); here comparing two or more.
- #208 The Marble Stairs: putting 3–5 in order; here choosing the tallest/longest of a set and the alignment principle.
- #19 The Number Elevator / #20 Block Towers: number comparison by height.
- `comparison-planks` tool: two planks already sharing a line, the overhang is moved to the short one (difference). Here nothing is moved but the starts — the invention is the honest stand and the common floor/wall, and the beam only touches.
- Registry: no built activity uses stands, a start wall or a level beam.

## 12. Build plan
- **Core state**: `{round, mode:'height'|'length', items:[{size, stand|offset, aligned}], choice, misses}`; functions `topOf(item)` (stand + ink height × size), `trueAnswer(round)` (from sizes only), `align(i)`, `unalign(i)`, `reveal()` → `{beamAt, gaps[]}`, `judge(choice)`, `nextTask` (mirror on alternate passes).
- **Gate's own ground truth** (`verify-drop-stands-core.js`): re-derives the right slot from the size literals and the question word; asserts ≥ 15 % size separation; every "lure" round's lured slot (highest top including stand / furthest end including offset) is wrong; "pick the higher top" scores 4/12 and "pick the lower top" 8/12; slot balance in rows; the ink bottom of each picture sits on its plate (art-extents); no tree/pine or tree/palm; each "shorter" round carries the right height/length key.
- **Mutations**: answer from top including stand · beam rests on the chosen one · stands not folded on Check · length offsets ignored in reveal · mirror pass keeps the old index · shorterHeight word used on a length round · ink box ignored (picture floats above plate) · ring allows two choices · lined-up setting leaves a stand up.
- **Local test**: real pointer: drag down, tap stand, drag to wall, choose, Check (right, miss 1, miss 2), both settings, every round, 7 widths × 11 locales; asserts geometric beam contact on the true slot.
- **Contact sheet at build**: laid-flat renders of pencil, ruler, marker, carrot, cucumber, baguette (lie angle); coconut tree, candle, corn, crayon standing on a plate with no whitespace gap.
- **Risks**: whitespace at the bottom of library art (solved by art-extents); lie angles for the diagonal classroom art.
- Nothing BLOCKED.

## 13. The four questions
1. Yes — folding stands, the trick of the high stand, a golden beam that drops onto the winner.
2. Yes — it teaches the one rule of direct comparison (same start line), puts the common K error on screen, and covers four worksheets.
3. Yes — library pictures, drawn stands and beam, no numbers, no words on the stage, nothing scored.
4. Things stand on stands of different heights so their tops lie — bring them to the same floor or wall and a level beam shows which is really taller or longer.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→5 · reality 4→5
What changed:
- Row R9's space/rocket is drawn diagonally (contact sheet), so its "top" on a stand reads as a tilted nose, not a height — replaced by kitchen-tools/bottle (upright, same sizes and stands).
- Re-computed every lure claim at the 704 scale (height 220, length 520, stands/offsets included): the 8 lured compare-two rounds really make the wrong one look right and the 4 unlured ones do not; in rows the lured slot is right only in R2 and R5 (2 of 9, as gated); no lying object overruns its 600 px rail (furthest end 536 px).
- Checked on the contact sheets: tree/coconut is a palm (the old "palm" kept in spirit), christmas/candle, vegetables/corn and classroom/crayon stand upright; the pencil, ruler, marker, carrot and cucumber need the per-noun lie angle already planned.
