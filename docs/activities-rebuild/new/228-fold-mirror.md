# New 228 — The Fold Mirror (READINESS · symmetry-reflection)

## 0. Identity
- **id** `fold-mirror.play.symmetry-reflection` · **grade** K (the "same on both sides" rounds reach the G2-248 face) · **framework** readiness — reflection and line symmetry (`alignment.framework` from `frontend/lib/frameworks.ts`) · **strand** Logic & Visual Thinking · **files** `mini tools/fold-mirror-core.js`, `fold-mirror-activity.js`, `fold-mirror-activity.html`, `fold-mirror-activities.json` · **key** `fold-mirror`
- **worksheets covered:** K-063 Mirror, Mirror (circle the mirror image) · G2-248 pick the symmetric picture. The absorbed G3 "The Fold Mirror" proposal (count the mirror lines of a shape) is **not** built here — that skill lives in **#285 The Fold Press** (its how-many-lines mode, same 8-notch fold); coordinator ruling 2026-10-17, see §11.
- All 11 locales; wordless apparatus.

## 1. The pitch
"The picture lies on the left page of a book; put a candidate on the right page and close the book — only the true mirror image lands exactly on the picture."

## 2. Why a child will want it again (the fun)
- **A book that closes.** Two cream pages joined by a shiny hinge. The original picture lies on the left page; the right page is empty with a dotted landing frame. Drop a candidate on it, and the right page swings over the hinge (a 600 ms 3-D page turn with a paper shadow and a soft "fwump") and lands on the left page.
- **Lands exactly — or does not.** The true reflection lands outline-on-outline: the two pictures merge into one and a silver **shine runs down the hinge** with a bright little chord. The copy or the turned picture lands crooked: the parts that do not match stay visible in a second tint (the duck's head pokes out on the wrong side, the train's chimney floats at the bottom). Then the page swings back open.
- **The magic page (free play).** Between rounds the right page becomes a live mirror: drag any library picture from the shelf of the round's pictures onto the left page and its reflection appears on the right page instantly; slide it toward the hinge and the reflection slides toward the hinge too, until they kiss at the edge. Children slide things back and forth for minutes.
- **The water mirror.** In the water setting the hinge lies flat like a pond's edge; the page swings **up**, and the right answer is the upside-down reflection a duck sees in a pond.
- **The earned show.** After each right round the merged picture and its reflection open out side by side as a symmetric "butterfly print" (the picture + its mirror, touching at the hinge) and slide into a strip of prints at the bottom; nine prints by the end of the pass.

## 3. The skill and the misconception
- **Skill.** A reflection is flipped across the mirror line, not turned and not copied; a picture is symmetric when one half folds exactly onto the other.
- **Misconception 1: the same picture (a copy) is the mirror image.** Pushback by physics: closing the book is a fold, and a fold flips. A copy folded over the hinge becomes the mirror of itself and lands visibly wrong (facing the other way); only the true reflection, folded, becomes the original.
- **Misconception 2: a turned picture is the mirror image.** The turned candidate (half-turn, or a quarter turn in some rounds) also lands crooked — upside down or sideways — and its mismatched parts glow in the second tint.
- **Misconception 3: a picture that "looks" symmetric is symmetric.** Pictures are measured (left–right mask IoU ≥ 0.97 counts as symmetric; ≤ 0.70 as clearly not; everything between is **refused**), so a front-facing cartoon that is almost-but-not-quite symmetric never appears, and the overhang the fold shows is always real.

## 4. The stage
Apparatus geometry: the book (two pages, the hinge as a silver bar with a highlight), the landing frame, the candidate tray, the prints strip. Library pictures only; reflections and turns are transforms of the same picture (scaleX(−1), scaleY(−1), rotate(180°/90°)).

**704 px (content ≈ 656):**
- **Task line** (20 px).
- **The book** (centred, y 56): two pages **264×264** each, hinge 10 px between (538 px wide). Original picture box **200 px** on the left page, placed so its ink box touches 16 px from the hinge (so a reflection really meets it at the mirror). The right page shows the dotted landing frame at the mirror position.
- **Water setting:** pages stacked: top page 300×210 (picture 170), a horizontal hinge styled as a pond edge (a 10 px blue-grey bar with two ripple lines), bottom page 300×210; candidates in a column at the right (`layout:'split'`).
- **Candidate tray** (below the book, side setting): 3 (or 2) cards **150 px** (picture **120 px**) in a row.
- **Same on both sides:** three pictures in a row, **176 px** cards (picture 150), each with a dashed vertical line through its ink-box centre; the book is replaced by these three "small books" (each picture folds about its own line).
- **Prints strip** (bottom, 64 tall): nine 56 px slots.

**360 px (content ≈ 328):**
- Book pages **156×156** each + hinge 8 = 320; original picture **128 px**.
- Candidates row 3 × 100 (picture **88 px**).
- Water: pages 300×140 stacked (picture 110), candidates in a row below (3 × 96).
- Same on both sides: three cards 104 px (picture **88**), dashed lines.
- Fold: task 40 + book 156 + 12 + candidates 100 + prints 48 = **356 px**; water 40 + 2×140 + 10 + 96 + 48 = **474 px** (< 640 at 320, where pages are 140).

**Words on the apparatus:** none.

## 5. The hand
- **Drop a candidate on the right page:** drag a tray card (lifts 1.06 with a shadow); over the right page the landing frame brightens; drop → the card snaps to the mirror position (150 ms), then the page turns over the hinge (600 ms, perspective rotateY about the hinge axis; water: rotateX), the candidate's image visibly flipping as the page turns — the fold IS the reflection, drawn honestly.
- **The landing:** the folded candidate is compared with the original by alpha masks (< 50 ms): equal (IoU ≥ 0.97) → merge, hinge shine, chord (C–E–G); not equal → original in ink, folded candidate in plum #8E5A9B at 70 %, the non-overlapping regions glow (plum where the fold sticks out, teal outline where the original is uncovered) for 1.4 s; then the page swings back (400 ms) and the card returns to the tray.
- **Tap-tap / keyboard:** Tab to a card, Enter lifts it, Enter again places it and closes the book; Left/Right move between cards.
- **Same on both sides:** tap (or drag the right half of) a picture → its right half folds over its dashed line onto its left half (500 ms): symmetric → the halves close with no overhang and a shine runs down its line; not → the overhang shows in plum. Folding a picture is the answer try.
- **Free play — the magic page:** after a right round, drag any picture from the prints strip onto the left page; the right page shows its live reflection, mirroring every drag.

## 6. The rounds
One right answer per round; candidates/pictures in each slot ≤ 3 of 9 per pass (33 %); order-only reshuffle per pass. Asymmetry is **measured** on the alpha mask fitted to a 64×64 square: a reflection round's picture has left–right IoU ≤ 0.65 (side mirror) or top–bottom IoU ≤ 0.65 (water), so copy, turn and reflection always differ visibly. Values below are the measured IoUs.

**Side mirror — find the reflection** (candidates: reflection · copy · turned; "copy only" drops the turned card)

| # | picture (LR IoU) | turned card |
|---|---|---|
| 1 | farm-animals/duck (0.46) | half-turn |
| 2 | farm-animals/horse (0.36) | quarter-turn |
| 3 | animals/giraffe (0.42) | half-turn |
| 4 | animals/camel (0.32) | quarter-turn |
| 5 | clothing/shoe (0.49) | half-turn |
| 6 | vehicles/train (0.56) | half-turn |
| 7 | animals/whale (0.56) | quarter-turn |
| 8 | animals/zebra (0.26) | half-turn |
| 9 | kitchen-tools/jug (0.54) | quarter-turn |

**Water mirror** (true = upside-down reflection; copy; half-turn — which is the reflection *also* mirrored left–right, the subtle lure)

| # | picture (TB IoU) |
|---|---|
| 1 | farm-animals/duck (0.46) |
| 2 | animals/swan (0.42) |
| 3 | farm-animals/horse (0.46) |
| 4 | vehicles/sailboat (0.29) |
| 5 | animals/giraffe (0.45) |
| 6 | animals/camel (0.35) |
| 7 | animals/seagull (0.35) |
| 8 | animals/turtle (0.60) |
| 9 | animals/zebra (0.25) |

**Same on both sides** (one symmetric picture, LR IoU ≥ 0.97; two clearly not, ≤ 0.70)

| # | symmetric | not symmetric |
|---|---|---|
| 1 | shapes/heart (0.98) | farm-animals/duck (0.46) · shapes/moon (0.17) |
| 2 | shapes/triangle (1.00) | clothing/shoe (0.49) · shapes/parallelogram (0.67) |
| 3 | animals/owl (0.99) | farm-animals/horse (0.36) · animals/fox (0.54) |
| 4 | shapes/hexagon (1.00) | animals/giraffe (0.42) · shapes/moon (0.17) |
| 5 | toys/ball (1.00) | kitchen-tools/jug (0.54) · animals/dolphin (0.53) |
| 6 | shapes/pentagon (1.00) | shapes/parallelogram (0.67) · animals/camel (0.32) |
| 7 | shapes/trapezoid (1.00) | animals/fish (0.64) · animals/zebra (0.26) |
| 8 | farm-animals/owl (0.99) | farm-animals/pig (0.57) · animals/seagull (0.34) |
| 9 | shapes/diamond (0.99) | animals/whale (0.56) · shapes/parallelogram (0.67) |

**Refused after measuring:** shapes/star (0.95 — drawn slightly irregular), toys/kite (0.84), animals/cat and panda (0.84), vehicles/taxi (0.88), toys/car (0.81), vehicles/bus (0.79), kitchen-tools/teapot (0.75), fruits/strawberry (0.87), fruits/pear (0.97 — borderline, left out). They look symmetric or nearly so, and a picture that is "almost" symmetric would make the fold's verdict look unfair.

**Answer position:** reflection rounds — the true card sits in each tray slot 3 times per pass; same-on-both-sides — the symmetric picture in each slot 3 times. The gate measures "always slot 1" and "always the middle card" ≤ 33 %.

## 7. Check, the misses, the success
The drop / fold is the try (no Check button).
- **Nothing for 10 s** → the right page's landing frame pulses: "Put a picture on the empty page and close the book." (same on both sides: the dashed lines shimmer: "Fold each picture on its line.")
- **Miss 1** → the crooked landing with the plum / teal regions, then the page re-opens. Hint: "Look what sticks out. A mirror flips the picture — it does not turn it."
- **Miss 2** → after the crooked landing, a **faint true reflection** (25 % ink) appears in the right page's landing frame for 2 s and stays as a dotted outline until the next drop. Hint: "This is what a mirror shows. Which card looks like it?" · same on both sides: the overhang of the folded picture blinks and the two unfolded pictures show their dashed lines thicker. Hint: "Fold another one."
- A new drop / fold clears the help (taken away until the next try).
- **Success** → merge + hinge shine; the butterfly print slides into the strip. Bubble: side "A mirror flips it — that's its reflection!" · water "Just like in a pond!" · symmetric "Both halves are the same — it is symmetric!"

## 8. Settings
1. **Task:** side mirror / water mirror / same on both sides — the board changes at rest (book across, book down, three pictures with dashed lines).
2. **Choices:** 3 (copy and turned) / 2 (copy only) — the tray (or the row of pictures) shows three or two at rest.

## 9. Words (EN source)
- title "The Fold Mirror" · instruction "Close the book to see which picture is the mirror image."
- task: side "Which picture is the mirror image? Put it on the page and close the book." · water "Which picture is its reflection in the water?" · symmetric "Which picture is the same on both sides? Fold it on its line."
- hints: hintIdle "Put a picture on the empty page and close the book." · hintIdleSym "Fold each picture on its line." · hintMiss1 "Look what sticks out. A mirror flips the picture — it does not turn it." · hintMiss2 "This is what a mirror shows. Which card looks like it?" · hintSym2 "Fold another one."
- celebrate: side "A mirror flips it — that's its reflection!" · water "Just like in a pond!" · symmetric "Both halves are the same — it is symmetric!"
- aria: bookLabel "book: the picture on the left page, an empty page on the right" · cardLabel "card {i}: {picture}" (cards are never described as flipped or turned — that is the answer) · resultLabel "it lands exactly" / "it does not match: different at the {regions}".
- settings: "Task" — "Side mirror" / "Water mirror" / "Same on both sides" · "Choices" — "3" / "2".
- **Locale traps:** "mirror image / reflection / symmetric" in school words per locale (de *Spiegelbild / spiegelsymmetrisch*, fr *image dans le miroir / symétrique*, sv *spegelbild / symmetrisk*, fi *peilikuva / symmetrinen*); "water mirror" phrased as reflection in water, not a literal compound where unnatural.

## 10. Sound off, access, phones
- Sound off: the merge, the shine, the coloured overhangs and the faint true reflection are visual.
- Keyboard path (§5); screen reader gets "lands exactly" / "different at the top-left".
- Colour-blind safety: overhang = solid plum fill, uncovered = teal dotted outline (pattern + colour).
- Taps: cards ≥ 96 px.
- Pictures: original 200 px at 704, 128 at 360; candidates 120 / 88 px.
- Phone layout: book pages 156 px side by side; water pages stacked.

## 11. Distinct from
- **Folding Sheet** tool (colour grid squares, fold at a crease to test symmetry) and **#285 The Fold Press** (G2 wet-paint: complete a half-painted grid; is-it-a-mirror-line; how many lines): both work on painted grid squares. The Fold Mirror works on **library pictures** and is built around choosing the reflection among a copy and a turned picture — the K-063 misconception neither tool addresses. **Fold lines removed (ruling 2026-10-17):** the coverage plan had merged the G3 "how many mirror lines" proposal here, but #285's HOW-MANY-LINES mode teaches exactly that with the same 8-notch fold, so the setting, its round table, its numeral strip and its strings were deleted from this file — the skill lives only in #285. **G2-248** is touched by both: #285 judges whether a *given dashed line* is a mirror line (tick/cross on grid pictures and shapes); here the child *chooses which of three library pictures* is symmetric by folding each — a choice among pictures, not a verdict on a line. **#224 Tile Twin** (batch sibling) slides, never flips — a deliberate opposite. **#227 Shadow Lamp** projects without flipping. Registry #1–#22: none.

## 12. Build plan
- **Core state:** `{ task, choices, rounds, r, picture, cards:[{xf:'mirror'|'copy'|'turn180'|'turn90'}], misses, prints }`. Functions: `mask(noun)`, `transform(mask, xf)`, `fold(maskOnRight, axis)` (reflect across the hinge), `lands(card)` → `{equal, extra, missing}`, `symmetricLR(mask)` (fold IoU about the vertical centre line), `nextRound()`.
- **Gate's own truth (`verify-fold-mirror-core.js`):** recomputes masks from the library alpha with its own code; asserts reflection-round pictures LR (or TB) IoU ≤ 0.65; only the mirror card lands equal (IoU ≥ 0.97) and copy/turned cards land < 0.80; symmetric pictures ≥ 0.97 and their distractors ≤ 0.70, nothing in between used; answer slot ≤ 3 of 9 per slot; colour themes only.
- **Mutations:** accept the copy as the reflection · water mirror accepts the half-turn · a 0.84 "symmetric" picture admitted · fold without flipping (translation) · faint hint shows the copy · answer always in slot 1 · the dolphin swapped back to the koala (0.69 — looks symmetric to a child; the gate's 0.70 ceiling must stay strict).
- **local-test:** real drags of every card in every round, both mirrors, 2/3 choices, folds of every picture in the symmetric task, 7 widths; screenshots of a crooked landing at 704 and 360.
- **Pictures:** every noun in the tables on one contact sheet with their mirrored copies; the shapes theme pictures are used only by their alpha mask (their different colours do not matter to a fold). **Nothing blocked.**

## 13. The four questions
1. **Choose it again?** Yes — a book that closes on its picture, a hinge that shines when it is right, a pond reflection, and a magic page that mirrors everything you drag.
2. **Teacher on the board?** Yes — the K "mirror image" task with its two misconceptions (copy, turn) refuted by the physics of a fold, plus symmetry and mirror lines on the same apparatus.
3. **Parent trust?** Wordless, library pictures, measured honesty (no almost-symmetric pictures), no score.
4. **The invention:** close the book — a fold flips — and only the true mirror image lands exactly on the picture.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 3→5 · reality 4→5
What changed:
- Ruling applied: the "fold lines / how many mirror lines" setting duplicated #285 The Fold Press (its how-many-lines mode, same 8-notch fold). Removed from this file — the setting, its round table (incl. shapes/octogon, a noun that does not exist in the library), the numeral strip, the Fold button, the strings, the state, the gate rules and mutations; §0 and §11 say the skill lives in #285, and §11 explains how this file's G2-248 face differs from #285's (choose the symmetric picture vs judge a given line).
- Reality: animals/koala (LR IoU 0.69) was a "not symmetric" picture — a front-facing koala looks symmetric to a child, a hair under the 0.70 ceiling. Replaced by animals/dolphin (0.53, re-measured); the swap back is now a mutation.
- Verified the core physics: the true reflection, folded across the hinge, becomes the original; a copy folded becomes its mirror and misses; the water half-turn lure is the reflection also mirrored left–right — all correct.
