# New 309 — The Corner Card: THE CARD THAT HIDES, FITS OR LEAKS LIGHT (4.G.A.1, taught in grade 3)

## 0. Identity
- id `corner-card.play.4-g-a-1` · grade 3 · CCSS 4.G.A.1 (right angles, met in grade 3 with "square corner") · strand Geometry · key `corner-card` → `mini tools/corner-card-core.js`, `corner-card-activity.js`, `corner-card-activity.html`, `corner-card-activities.json`. 0 lines to `lcs-shell.*` or shared cores.
- worksheets it covers: **G3-341 "Right-Angle Hunt"** ("Circle every right angle (a square corner)") — the hunt mode is that sheet; the sort mode adds its level-3 near misses (70–80°, 100–110°) and names the other two kinds.
- new instrument. New metadata for all 11 locales at build (grade 3).

## 1. The pitch
"A stiff card with one perfect square corner: lay it into any corner — a right angle fits it flush, a smaller angle tucks its side under the card, and a bigger one leaks a wedge of light."

## 2. Why a child will want it again
- **A real thing in the hand.** The corner card is the trick every teacher uses with a folded paper corner, made perfect: a cream index card with a coral square corner. Drag it near a corner and it *snaps* point to point and swings round until one edge lies along a side — a satisfying magnetic *clack*.
- **Three different reactions, all physical.** Flush: the card's edge and the second side become one line and a teal glow runs along it with a soft *ting*. Smaller: the second side disappears under the card (you see its end peeking out beyond the card if it is long). Bigger: a bright wedge of light opens between the card and the side — the wider the angle, the fatter the wedge.
- **Flip it.** Tap the card's little hinge and it flips to lay along the OTHER side of the same corner — same verdict, which children love to check.
- **Earned show.** When every right angle in a shape is found, the shape's square corners each get a tiny coral square stamp and the shape gives a little wobble-bow. In sort mode the trays fill like drawers that click shut.
- **Free play:** a "loose angle" (two rods on a hinge) sits at the side of the bench between rounds; drag its free rod to open and close it and test it with the card — the wedge grows and shrinks live, and the card *ting*s at exactly the square corner.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a right angle is a square corner; every other angle is smaller (narrower) or bigger (wider) than it — 3.G.A.1's "square corner" vocabulary and 4.G.A.1's right / acute / obtuse, said in plain words.
- **Misconceptions and the pushback:**
  1. *Long arms make a big angle.* The card only meets the corner; arm length changes nothing about flush / under / wedge. Arms in every round vary 2–5 units independently of the angle (measured: mean arm sum 7.5 for smaller, 7.0 for right, 7.0 for bigger angles), and a "longest arms = bigger" bot scores 3 of 13.
  2. *A right angle must stand upright (one side flat, one side up).* The card rotates to the corner however it points; "any turn" rounds show right angles at 30°, 100°, 135°, 215°… and they fit flush exactly the same.
  3. *Nearly square is square.* Near misses (75–80°, 100–105°) show a slim wedge or a hidden sliver — at 704 a 10° difference on a 4-unit arm is a 17 px gap at the arm's end, visible; the card never "rounds up".
  4. *Counting corners instead of judging them* (hunt mode): a shape with four corners need not have four right angles — right trapezoids (2), a house pentagon (2), a kite (1).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 (stacked layout).** Apparatus 452 px, bubble under the stage.
- **The bench** (452 × 380), a pale wood-grain rectangle (flat colour, no texture images). On it:
  - **Hunt mode:** one shape, drawn in one fill with 3 px ink edges, at unit u = 30 px (largest shape 15 × 12 u scaled to fit 360 × 300). Each corner has an invisible 48 px tap disc.
  - **Sort mode:** four loose angle chips (two rods meeting at a vertex dot), each in a 150 × 150 cell of a 2 × 2 grid; arm lengths 2–5 units at u = 26 px (52–130 px).
  - **The corner card** (rests at the bench's bottom-right, 120 × 90 px cream card, the square corner at its top-left, coral corner triangle 16 px, hinge dot 20 px on its long edge). Drag handle = the whole card (min 44 px everywhere).
  - **The loose angle** (free play, bench top-right, 90 × 90, hidden while a task is unanswered in sort mode).
- **Sort trays** (sort mode only, under the bench, 452 × 110): three drawer fronts, 140 × 96 each: **smaller** (mark: a narrow drawn angle with the card's corner outline over it, the side tucked inside), **right** (mark: a square corner with the little square), **bigger** (mark: a wide angle with a wedge shaded). Drawers open to receive chips (chips drop in at 0.5 scale; the drawn mark is never a word).
- **Bubble column:** feedback sentence; in hunt mode a counter row of small drawn rings — one per corner the child has MARKED (never per right angle found: a counter that only grows on a correct mark would grade every tap live and turn the hunt into tap-and-watch; never shows how many exist).
- **Task line** (20 px): hunt "Find every square corner. Tap each one." · sort "Test each corner with the card, then put it in its drawer."
- No words on the apparatus.

**At 360 (stacked).** Bench 328 × 300 (shape unit 20 px; angle cells 150 × 140 in 2 × 2, arms 18 px/unit → 36–90 px); card 96 × 72 (resting at the bench's right edge, never covering a corner); trays 328 × 92 (three drawers 104 × 84). Check under the trays at y ≈ 560 — above the 360 × 740 fold; at 320 × 640 the trays drop to 76 px tall and Check sits at ≈ 548.

**Pictures:** none. The coverage plan's optional "library objects with corners (book, window, envelope)" is REFUSED, checked on the contact sheets: classroom/book is drawn in perspective (its drawn corners are not right angles), around-the-house/window has an arched top, and post-office/envelope has rounded corners — a card laid on any of them would give a false or fuzzy verdict. (Recorded in PICTURE-RULINGS.)

## 5. The hand
- **Drag the card** (pointer): it follows the finger (no lag); when its corner comes within 36 px of a vertex it snaps: corner on vertex, then rotates (180 ms ease-out) so one card edge lies on the SHORTER arm and the verdict is read along the longer one (the longer arm makes the bigger gap). Every arm is also drawn as a ray continued dashed to the card's full edge length (120 px at 704, 96 at 360), so the wedge or the tucked sliver is measured over the card's length, never over a short arm: a 10° near miss opens 21 px at 704 and 17 px at 360 at the card's end. *Clack.*
  - Then the verdict draws within 100 ms: flush → the far edge and second arm overlap, a teal glow travels along them (400 ms), *ting*; smaller → the second arm is clipped by the card (drawn under it; its end visible beyond the card only if longer than the card edge) and the card's edge tints coral-light where the arm vanished; bigger → a wedge polygon between the card's far edge and the second arm fills with pale yellow light (exact geometry), *whoosh* soft.
- **Flip** (tap the hinge dot or press F): the card turns over and lays along the other arm (220 ms); the verdict re-draws (it is always the same — a fact the child can check).
- **Lift away:** drag off; the verdict fades in 150 ms.
- **Hunt — mark a corner:** tap a corner → a coral ring (28 px) marks it; tap again → unmark. The card is not required to mark, but every corner tested with the card keeps a faint memory dot (teal = flush, coral = not) so the child can see what they tried.
- **Sort — file a chip:** drag an angle chip into a drawer → it drops in (drawer *click*); drag it out again to change. Testing a chip: drag the card onto its vertex exactly as in hunt.
- **Keyboard:** Tab to the card, arrow keys cycle it through vertices (it snaps); F flips; Tab to corners / chips, Space marks; 1/2/3 files a focused chip into smaller/right/bigger.
- **Loose angle (free play):** drag the free rod's end (44 px grip) round the hinge; angle snaps to 5°; the card tests it live.

## 6. The rounds
**Hunt mode — "right angle or not?" (10 rounds; right-angle counts 0,0,1,1,2,2,3,3,4,4 — the hunt's answer is a SET of corners):**

| # | shape | vertices (grid) | square corners |
|---|---|---|---|
| H1 | sharp triangle | (0,5)(3,0)(6,5) | 0 |
| H2 | parallelogram | (0,3)(2,0)(7,0)(5,3) | 0 |
| H3 | right triangle, turned | (0,2)(4,0)(5,2) | 1 |
| H4 | kite lying on its side | (0,2)(2,0)(6,2)(2,4) | 1 |
| H5 | right trapezoid | (0,0)(5,0)(5,3)(2,3) | 2 |
| H6 | house pentagon | (0,5)(0,2)(3,0)(6,2)(6,5) | 2 |
| H7 | pentagon with three square corners | (0,0)(5,0)(5,2)(2,5)(0,5) | 3 |
| H8 | the same pentagon tilted (×√5 rotation) | (0,0)(10,5)(8,9)(−1,12)(−5,10) | 3 |
| H9 | rectangle tilted | (0,2)(4,0)(5,2)(1,4) | 4 |
| H10 | square turned | (1,0)(4,1)(3,4)(0,3) | 4 |

(Counts recomputed in `work-37/corner.js` / `corner2.js` from integer dot products; H8's three right angles sit at none of the four screen directions.)
- **Orientation "upright":** every shape is drawn turned so its longest side is horizontal (a float rotation for drawing only — every verdict is computed from the ORIGINAL integer vectors, and turning changes no angle); **"any turn"** draws the table's vertices as they are.
- The number of square corners is never shown before Check. Where they sit varies: in H5 they are both on the right-hand side (bottom-right and top-right), in H6 both at the bottom, in H7 three in a row, in H9/H10 all — so "the bottom corners" is no strategy (it gets only H6 right). (H4 and H5 were the same kite and trapezoid as #308's L2-8/L2-7; changed so the two sibling instruments never show the same figure.)

**Sort mode — "smaller · right · bigger" (9 rounds of 4 chips; 36 chips: 13 smaller, 10 right, 13 bigger; right angles per round 0,0,1,1,1,1,2,2,2 → a child cannot assume "there's always one"):**

| # | the four angles (° , arm a, arm b, turn) |
|---|---|
| S1 | 90 (3,5, 30°) · 40 (5,2, 0°) · 140 (2,4, 200°) · 90 (2,2, −60°) |
| S2 | 60 (5,5, 90°) · 150 (4,2, 155°) · 120 (3,5, 10°) · 35 (2,4, 250°) |
| S3 | 150 (5,3, −20°) · 90 (5,5, 100°) · 50 (3,2, 190°) · 130 (2,2, 75°) |
| S4 | 90 (2,4, 215°) · 90 (5,3, 350°) · 45 (4,4, 120°) · 155 (3,5, 40°) |
| S5 | 78 (5,3, −10°) · 110 (4,4, 160°) · 90 (3,3, 60°) · 125 (5,2, 265°) |
| S6 | 30 (3,5, 135°) · 102 (5,4, 300°) · 55 (2,3, 20°) · 90 (4,5, 185°) |
| S7 | 90 (5,2, 95°) · 135 (3,3, 225°) · 76 (4,5, 320°) · 90 (2,5, 5°) |
| S8 | 45 (5,4, 270°) · 104 (3,4, 10°) · 160 (4,2, 110°) · 80 (4,2, 245°) |
| S9 | 120 (4,4, 340°) · 75 (2,5, 200°) · 90 (2,3, 135°) · 50 (5,5, 60°) |

- Rounds S1–S4 are clear (25–60° / 120–160°); S5–S9 each carry one or two near misses (75–80°, 100–105°) — the sheet's level 3.
- Orientation "upright" maps each chip's turn to the nearest of 0/90/180/270°; "any turn" uses the table.
- **Answer position:** chips are placed into the 2 × 2 cells in a per-pass shuffled order (right angles fell in cells 1–4 as 3/2/2/3 in the authored order — the shuffle removes even that); drawers are fixed places, balanced by count (13/10/13).
- **Order:** order-only reshuffle per pass (rounds and chip cells), never the same twice.

## 7. Check, the misses, the success
- **Check with nothing done:** the card nudges toward the first corner (a 12 px hop) — hint "Lay the card's coral corner into a corner." No miss.
- **Hunt, miss 1** (a right angle unmarked, or a non-right corner marked): every corner the child got wrong gets the card's *ghost* (a dotted outline of the card laid into that corner) showing its true verdict: on a missed right angle the ghost lies flush with the teal glow; on a wrong mark the ghost shows its wedge or hidden side. Right marks stay. Hint: "Look where the card's ghost fits — and where it doesn't."
- **Hunt, miss 2:** the ghosts stay and each corner shows a tiny arc for non-right and a tiny square for right — the standard drawing symbol. Hint: "The little square means a square corner. Mark every one."
- **Sort, miss 1:** wrongly filed chips jump half out of their drawers; the card's ghost lies into each one showing flush / tucked / wedge. Hint: "Test the ones that jumped out with the card."
- **Sort, miss 2:** the jumped-out chips show their verdict permanently (wedge shaded / hidden part dotted / square symbol). Hint: "A wedge of light means bigger. A side under the card means smaller."
- A new mark or move hides the ghosts until the next Check.
- **Success (hunt):** every square corner gets a coral square stamp in turn (one *tik* each), the shape wobble-bows. "Yes! {n} square corners." / for 0: "Yes! This shape has no square corners." / for 1: "Yes! 1 square corner."
- **Success (sort):** the drawers click shut one by one. "Yes! {s} smaller, {r} right, {b} bigger." (counts with plural forms authored per locale).

## 8. Settings
1. **Mode:** *right angle or not* (hunt: one shape) / *smaller, right, bigger* (sort: four chips + three drawers). Visible at rest.
2. **Orientation:** *upright* / *any turn*. Visible at rest: the shapes/chips sit square to the bench or turned.

## 9. Words (EN source)
- title: "The Corner Card"
- task lines: "Find every square corner. Tap each one." · "Test each corner with the card, then put it in its drawer."
- hints and successes: as §7.
- drawer aria labels (no text on drawers): "smaller than a square corner" · "a square corner" · "bigger than a square corner".
- settings: "Mode" — "right angle or not" / "smaller, right, bigger"; "Orientation" — "upright" / "any turn".
- aria for the card: "corner card"; verdict announcements: "fits exactly — a square corner" / "the side hides under the card — smaller" / "light shows between — bigger".

**Locale traps.**
- "Square corner" is English classroom talk; every locale uses its own grade-3 term and the hints are authored, not translated: de *rechter Winkel* ("Ecke wie beim Geodreieck" is a good gloss), fr *angle droit* (tested with the *équerre* — the card may be called *gabarit d'angle droit* in the bubble), es (MX) *ángulo recto* (*escuadra*), pt-BR *ângulo reto* (*esquadro*), it *angolo retto* (*squadra*), nl *rechte hoek* (*geodriehoek*), sv *rät vinkel*, da *ret vinkel*, no *rett vinkel*, fi *suora kulma*.
- "Smaller / bigger" for angles: fr *plus petit / plus grand qu'un angle droit* (aigu/obtus belong to CM1 — keep plain), de *kleiner / größer als ein rechter Winkel* (*spitz / stumpf* optional in the bubble only), fi *pienempi / suurempi kuin suora kulma*. The drawers carry no words, so long phrases never crowd the apparatus.
- Plurals in success lines ("1 square corner" / "3 square corners"): authored per locale with the locale's plural rule (fi partitive after numbers: *3 suoraa kulmaa*).

## 10. Sound off, access, phones
- Sound off: flush/hidden/wedge are all drawn; glow, tint and light are shapes and shading, never colour alone (the wedge is a filled polygon; the hidden arm is drawn dotted under the card).
- Keyboard path as §5; aria-live announces each verdict.
- Taps: corners 48 px discs (adjacent corners in the smallest shape are ≥ 60 px apart at 360 — H3's acute corner and right corner are 2 units = 40 px apart at u = 20, so on phones H3 is drawn at u = 26 and centred), drawers ≥ 104 × 76, card ≥ 72 px.
- No library pictures (floors n/a).
- Phone layout: the bench stacks above the drawers; the card rests in a 72 px strip at the bench's right that never overlaps a shape (the shape area is inset by the card strip).

## 11. Distinct from
- **Row 37 paint / Row 38 clasps / Row 105 take-apart / Row 169 trundle wheel / New 212 geoboard:** shape identity and side counting; none judges a single angle against a square corner.
- **New 308 Shape Sieve** (this batch): set-squares are an automatic test inside a category cascade the child bets on; here the child carries the card and judges every corner by hand, and sorts angles by size.
- **Premium tools:** Shape Stretcher's "square corners" tag is a property of a whole shape the teacher deforms; Upright-and-Flat turns an instrument. No tool lays a template into an angle.
- Not in REGISTRY-BUILT.

## 12. Build plan
- **Core state:** `{ mode, orientation, round, card:{vertex:null|i, arm:0|1}, marks:Set, filing:{chip→tray}, misses }`.
- **Core functions:** `angleAt(verts,i)` (exact from integers: `dot==0` → right; otherwise sign of dot → smaller (dot>0) / bigger (dot<0)); `verdict(angleDeg)` for chips (`<90`/`=90`/`>90`, integers only); `cardGeometry(vertex, arm)` → card polygon + the wedge polygon or the clipped arm segment (pure, so the renderer and the gate share no hidden logic); `gradeHunt(marks)`; `gradeSort(filing)`; `pose(round, orientation)`.
- **verify gate:** its own angle computation (cross/dot of the integer vectors, never `angleAt`); asserts hunt counts 0,0,1,1,2,2,3,3,4,4 (the design's list said 2,2,2,3 — H8 is the tilted H7 and has 3); ≥ 1 shape per count 0–4; sort totals 13/10/13 and per-round right counts include 0 twice; arm-sum means per class within 1.0 of each other; longest-arms bot ≤ 4/13; near misses appear only in S5–S9; `cardGeometry` wedge area > 0 iff angle > 90, hidden-arm length > 0 iff angle < 90, both zero iff 90; the upright pose is drawing-only (verdicts and the oracle read the integer vectors).
- **Mutations:** right angle by `|deg−90|<10` · wedge drawn for smaller angles · arm length used in verdict · flip changes the verdict · hunt grade ignores extra marks · sort accepts a 78° chip in "right" · verdict computed from the rotated float drawing instead of the integer vectors · ghost shows the child's verdict instead of the truth · round order repeats.
- **Local test:** real drags of the card onto every vertex of every round at all widths; snap within 36 px; flip; marking; drawer drops; tap targets ≥ 44; the card never covers a corner at rest.
- **Counter honesty:** a mutation "counter counts correct marks" must be killed (local test marks a wrong corner and asserts the counter still grows by one).
- **Risks:** snapping must choose the corner nearest the card's corner, not the pointer; in H8 two vertices are 2.2 u apart — snap radius shrinks to 0.45 of the nearest-vertex distance.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a snapping card that hides, fits or leaks light, plus a hinge to wiggle against it.
2. **Would a teacher put it on the board?** Yes — it is the folded-paper-corner trick done perfectly: "is it smaller or bigger than a square corner?" gets a visible answer, and long arms or a tipped shape fool nobody.
3. **Would a parent trust it?** Exact geometry, no pictures that lie, calm feedback, school terms in every language.
4. **The invention:** a card with one perfect square corner that fits a right angle flush, tucks a smaller angle's side underneath and leaks a wedge of light from a bigger one.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-solved every corner from integer vectors (`work-c37/corner.js`): the hunt counts are 0,0,1,1,2,2,3,3,4,4 — the design's list and its gate line (2,2,2,3) were wrong; sort totals 13/10/13, right-angle counts per round {0,0,1,1,1,1,2,2,2}, arm-sum means 7.5/7.0/7.0 and the longest-arms bot 3/13 all confirmed.
- Removed a live answer tell: the hunt counter grew only on a CORRECT mark, which graded every tap. It now counts marks.
- Near misses were not guaranteed visible: the card now lies on the shorter arm and every arm is continued as a dashed ray to the card's length, so a 10° miss opens ≥ 17 px at 360 (the old reading along a 2-unit arm gave 6 px).
- H4/H5 were the same kite and right trapezoid as sibling #308 — replaced (re-measured: 1 and 2 square corners).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
