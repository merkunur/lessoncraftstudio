# Row 171 — Same Size, Different Shape: THE DOUGH PRESS — squash every piece into a round patty, and equal shares make equal patties whatever shape they were (2.G.A.3)

## 0. Identity
- id `choice-board.fraction-noncongruent.2-g-a-3` (KEPT; slugs, titles, intros frozen in all 11 locales) · grade 2 · CCSS 2.G.A.3 · strand Geometry.
- own files at rebuild (the row leaves the shared choice board; `choice-board-activities.json` keeps its other rows): `dough-press-core.js`, `dough-press-activity.js`, `dough-press-activity.html`, `dough-press-activities.json`. 0 lines to `choice-board-core.js`, `lcs-shell.*` or any shared core.
- page title (frozen): "Same Size, Different Shape — Equal Shares Can Look Different | Grade 2 Geometry"; intro (frozen): "See a shape split into equal parts, then tap another that shows the same equal parts even when the pieces look different." — kept exactly as the match board.
- worksheets it covers (shared with row 172; this row carries the RECOGNISING faces, 172 the MAKING faces): **G2-232** Fair Shares? and **G3-343** Equal Pieces ("circle every shape cut into EQUAL parts": the fair-shares board) · **G2-230** Find the Fraction and **G2-234** Cut It Right ("circle the shape that shows the fraction": the which-shows board) · **G2-231** Fraction Friends (picture ↔ fraction, incl. 2/3, 3/4, 2/4: which-shows rounds W6–W9) · **G2-228/G2-229** recognise one half / thirds / quarters (inside every board).
- old activity: a model shape split into equal parts + 4 tiles; tap the tile that shows the same equal parts a different way. **Kept:** all 12 old rounds with their figure ids, the 4-tile choice, the distractor families (unequal parts / a different number of equal parts / not split). **Changed:** each round now ends with the press (§5) proving the answer; four new rounds whose equal pieces are NOT the same shape even inside one figure. **Dropped:** nothing.

## 1. The pitch
"Every piece is a slab of dough: put it under the press and it squashes into a round patty with exactly the same amount of dough — so halves that were triangles and halves that were rectangles come out as the very same patty, and an unfair cut comes out as a big patty and a small one."

## 2. Why a child will want it again
- **Squish.** The press is a big wooden lever press. A piece of cut-up dough slides under it, the press comes down *SQUISH*, and out wobbles a perfectly round patty, jiggling like jelly for a moment. It never gets old.
- **The magic of "same amount".** A long thin strip and a fat triangle go in — and two identical patties come out. Children gasp at it every time; it is the conservation surprise, and it is exactly what the standard means.
- **The stack test.** The model's patties are already sitting in a neat stack on the left platter. The child's chosen pieces become patties on the right platter, then the right stack slides across and sits on the left one: equal patties vanish into each other perfectly (*fwump*), a bigger one shows a fat rim, a smaller one shows a gap of the patty under it, an extra one has nothing to land on.
- **Earned show per round:** the matching stack rises, a glossy glaze pours over it, and the model and the matching tile slide together onto the display shelf under a little bell jar — "same size, different shape" — the shelf filling up through the session. No timer, score, streak or lives.
- **Free play:** after the round, every tile can be pressed; the child can test the unfair ones for fun and watch the lopsided patties.

## 3. The skill and the misconception
- **Skill (2.G.A.3 + the worksheets):** recognise when a shape is cut into equal shares (halves, thirds, fourths); recognise that equal shares of identical wholes need NOT have the same shape; recognise unequal shares even when the count is right; match a shaded share to its fraction (1/2, 1/3, 1/4, 2/3, 3/4, 2/4) by its share of the whole, not by counting pieces.
- **Misconceptions and the push-back:**
  1. **"Equal parts must look the same"** (the row's title misconception): pieces of different shape but the same amount make identical patties — seen, not told.
  2. **"Two pieces are halves"** (counting without equality): an off-centre cut makes a big patty and a small one; stacked, the rim shows.
  3. **"Four equal pieces are halves too" / naming by number of pieces:** a fourths tile makes four small patties against the model's two big ones — the stack test leaves two loose patties and two that are too small.
  4. **"Shaded 2 of 3 pieces = 2/3" even when the pieces are unequal** (which-shows): the patties come out unequal, and the fraction card's patty row (three equal patty outlines) does not match them.
  5. **"2/4 is more than 1/2 — it has more pieces":** in the which-shows rounds the press's "lump" step (§5) rolls the shaded patties together into one lump, and two fourth-patties lump into exactly the outline of one half-patty.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 — stacked layout:**
- **Task line** (20 px, ≤ 2 lines).
- **Left column (300 px):**
  - **The model board** (a wooden board 280 × 220): the model shape (whole fitted in 180 × 180) cut along its lines; its pieces carry a dough texture (warm #F4D9A8 with a soft speckle and a 3 px ink outline; the cut lines are 3 px darker seams). In the which-shows board this is replaced by the **fraction card** (a cream card: "one third" or "1/3" per setting, 40 px, plus a row of empty patty outlines showing the card: 1 coral outline + 2 teal outlines for 1/3).
  - **The press** (under the model, 280 × 150): a wooden lever press drawn as apparatus (a frame, a round press plate, a lever); a **left platter** and a **right platter** (each a cream disc 120 px) either side of the press foot.
- **Right column (340 px): the tiles** — 4 tiles in a 2 × 2 grid (each 160 × 160 cream card, the shape whole drawn at the SAME scale as the model so all wholes are identical in size; pieces in dough texture; shaded pieces in which-shows rounds coral-glazed #F2784B over dough). The fair-shares board shows 6 tiles in a 3 × 2 grid (each 108 × 108) with a ribbon toggle under each.
- **Bubble** under the press; Check at the right (shell).

**Patty scale:** a piece of area A becomes a patty of radius `r = sqrt(0.30·A/π)` (the same factor for every piece in a round), so a half of the 180 px square becomes a patty ≈ 79 px across, a third ≈ 64 px, a fourth ≈ 56 px. Stacks are drawn as discs with a 4 px side band (a little 3D thickness), offset 3 px per layer.

**At 360 — stacked:** task · model board 328 × 180 (shape 150) · press row 328 × 120 (platters 96) · tiles 2 × 2 at 156 × 156 (fair board 3 × 2 at 104 × 104) · bubble · Check. At 320: tiles 140, model shape 132. All wholes keep one scale per round.

**Pictures:** none — dough pieces, press, platters, cards are drawn apparatus. (Food pictures from the library — pizza, cake — would carry a real object's own uneven toppings and are owned by the fraction-kitchen tool's world; plain dough keeps area the only thing to see.)

## 5. The hand
- **Round start:** the model's pieces slide one at a time under the press (180 ms each), *squish*, and their patties stack on the LEFT platter (the demonstration: "this is how much dough each share is"). Which-shows board: the card's outline row is the reference instead.
- **Tap a tile** → it lifts 6 px with a shadow (selected); tapping another swaps; tapping it again puts it down. (Fair board: tap a tile's ribbon toggle → a green ribbon ties round it = "fair"; tap again to untie.)
- **Check** (see §7) runs the press on the selection.
- **Free play after success:** tapping any tile presses it onto the right platter (the old patties clear first) — no judgement, just the squish and the stack test.
- **"Lump" step** (which-shows, EVERY round): after pressing, the coral patties roll together into one coral lump and the teal ones into one teal lump, and the two lumps sit in the card's two outlines (the card's shaded amount and the rest). This makes the press judge by amount in every round — W9's four quarter-patties lump into two half-lumps that fill a 1/2 card exactly — and, because no distractor's shaded share is within 0.08 of its card (measured, §6), the lump verdict is always the same as the equal-parts verdict.
- **Keyboard:** arrow keys move a focus ring over the tiles, Enter selects (fair: Enter toggles the ribbon), Tab to Check.

## 6. The rounds
**Figure catalogue** (all wholes in a 100-unit box; the gate computes every piece's area):
- square (sq) 100 × 100 and rectangle (rect) 100 × 60, cut as: `-halves-v` (vertical middle) · `-halves-h` · `-halves-diag` · `-halves-uneq` (cut at 34 %) · `-thirds-v` / `-thirds-h` (strips at 1/3, 2/3) · `-thirds-uneq` (strips at 24 %, 60 % → pieces 24 · 36 · 40 % of the whole) · `-fourths-grid` (both middles) · `-fourths-strips` (vertical quarters) · `-fourths-uneq` (vertical at 14 %, 38 %, 66 % → pieces 14 · 24 · 28 · 34 %) · `-fourths-diag` (both diagonals; square only) · `-notsplit`.
- **new, unequal-looking equal shares inside ONE figure:**
  - `sq-fourths-mixed`: top half split by a vertical middle into 2 rectangles (each 1/4); bottom half split by its diagonal into 2 right triangles (each 1/4).
  - `rect-thirds-mixed`: left third a vertical strip (1/3); the right two-thirds split by its diagonal into 2 triangles (each 1/3).
  - `rect-halves-step`: a staircase cut through the centre along (30,0)→(30,20)→(50,20)→(50,40)→(70,40)→(70,60) — pieces (0,0)(30,0)(30,20)(50,20)(50,40)(70,40)(70,60)(0,60) and its 180° turn; each exactly 3000 = 1/2 of 6000 (measured). The two step-shapes are congruent to EACH OTHER (central symmetry) but not to the model's two straight strips — that is the round's point.
- **Why the uneven cuts were moved (critic, measured 2026-10-17, `work-c26/f171.js`):** the draft's `-fourths-uneq` (15/40/70) had a second piece of EXACTLY 25 % and its `-thirds-uneq` (22/61) two equal 39 % pieces. With the shaded piece unspecified, W3 and W5 could shade that 25 % strip — a tile the press would prove is one fourth: two right answers. The new cuts have no piece equal to 1/2, 1/3 or 1/4 and no shaded combination used below within 0.04 of any card.
  - `rect-fourths-mixed`: left half cut into 2 vertical strips (1/4 each), right half cut by its horizontal middle into 2 rectangles (1/4 each).

**Board MATCH (16 rounds; old 1–12 kept, 13–16 new):**
| # | model | ✓ tile | distractor tiles |
|---|---|---|---|
| 1 | sq-halves-diag | sq-halves-v | sq-halves-uneq · sq-fourths-grid · sq-notsplit |
| 2 | rect-halves-v | rect-halves-h | rect-halves-uneq · rect-fourths-grid · rect-notsplit |
| 3 | sq-halves-v | sq-halves-diag | sq-halves-uneq · sq-fourths-strips · sq-notsplit |
| 4 | rect-halves-diag | rect-halves-v | rect-halves-uneq · rect-fourths-strips · rect-notsplit |
| 5 | rect-fourths-grid | rect-fourths-strips | rect-fourths-uneq · rect-halves-v · rect-notsplit |
| 6 | sq-fourths-grid | sq-fourths-strips | sq-fourths-uneq · sq-halves-v · sq-notsplit |
| 7 | rect-fourths-strips | rect-fourths-grid | rect-fourths-uneq · rect-halves-h · rect-notsplit |
| 8 | rect-thirds-v | rect-thirds-h | rect-thirds-uneq · rect-halves-v · rect-notsplit |
| 9 | sq-thirds-v | sq-thirds-h | sq-thirds-uneq · sq-fourths-grid · sq-notsplit |
| 10 | rect-thirds-h | rect-thirds-v | rect-thirds-uneq · rect-fourths-grid · rect-notsplit |
| 11 | sq-halves-h | sq-halves-diag | sq-halves-uneq · sq-thirds-v · sq-notsplit |
| 12 | sq-thirds-h | sq-thirds-v | sq-thirds-uneq · sq-halves-v · sq-notsplit |
| 13 | sq-fourths-grid | sq-fourths-mixed | sq-fourths-uneq · sq-thirds-v · sq-notsplit |
| 14 | rect-thirds-v | rect-thirds-mixed | rect-thirds-uneq · rect-fourths-strips · rect-notsplit |
| 15 | rect-halves-h | rect-halves-step | rect-halves-uneq · rect-thirds-h · rect-notsplit |
| 16 | sq-fourths-diag | sq-fourths-grid | sq-fourths-uneq · sq-halves-diag · sq-notsplit |
Every round: exactly one tile has the model's number of pieces AND all pieces equal in area (the gate checks area equality to 0.1 %).

**Board FAIR SHARES (8 rounds, 6 tiles each; ✓ = fair):**
| # | tiles (✓ fair) |
|---|---|
| F1 | sq-halves-v ✓ · sq-halves-uneq · rect-halves-diag ✓ · rect-halves-uneq · sq-halves-diag ✓ · rect-thirds-uneq |
| F2 | rect-fourths-grid ✓ · rect-fourths-uneq · sq-fourths-diag ✓ · sq-fourths-uneq · rect-halves-h ✓ · sq-thirds-uneq |
| F3 | sq-thirds-v ✓ · sq-thirds-uneq · rect-thirds-h ✓ · rect-halves-uneq · sq-fourths-strips ✓ · rect-fourths-uneq |
| F4 | sq-fourths-mixed ✓ · sq-fourths-uneq · rect-halves-step ✓ · rect-halves-uneq · sq-halves-uneq · rect-thirds-uneq |
| F5 | rect-thirds-mixed ✓ · rect-thirds-uneq · sq-halves-h ✓ · sq-thirds-uneq · rect-fourths-mixed ✓ · rect-fourths-uneq |
| F6 | sq-halves-diag ✓ · rect-halves-uneq · sq-fourths-uneq · rect-fourths-strips ✓ · sq-thirds-uneq · rect-halves-uneq |
| F7 | rect-fourths-mixed ✓ · sq-fourths-mixed ✓ · rect-thirds-mixed ✓ · sq-halves-uneq · rect-fourths-uneq · sq-thirds-uneq |
| F8 | sq-thirds-h ✓ · rect-thirds-uneq · rect-halves-v ✓ · sq-fourths-uneq · sq-halves-uneq · rect-fourths-grid ✓ |
Fair count per round 2–3; the unequal tiles are the "almost" kind (right number of pieces, wrong sizes). (F6 has two `rect-halves-uneq` drawn at different seeded offsets 34 % / 28 % — both unfair.)

**Board WHICH SHOWS (9 rounds; card + 4 tiles; ✓ = shows the card):**
| # | card | ✓ tile (shaded pieces) | distractor tiles |
|---|---|---|---|
| W1 | 1/2 | rect-halves-diag, 1 shaded | rect-halves-uneq 1 shaded · rect-thirds-v 1 shaded · rect-fourths-grid 1 shaded |
| W2 | 1/3 | sq-thirds-h, 1 | sq-thirds-uneq 1 · sq-fourths-strips 1 · sq-halves-v 1 |
| W3 | 1/4 | sq-fourths-diag, 1 | sq-fourths-uneq, the 34 % strip · sq-thirds-v 1 · sq-fourths-grid 3 shaded |
| W4 | 1/3 | rect-thirds-mixed, the strip | rect-thirds-uneq 1 · rect-thirds-v 2 · rect-fourths-strips 1 |
| W5 | 1/4 | sq-fourths-mixed, 1 triangle | sq-fourths-uneq, the 14 % strip · sq-halves-diag 1 · sq-thirds-h 1 |
| W6 | 2/3 | rect-thirds-v, 2 | rect-thirds-uneq, the 36 % + 40 % strips · rect-thirds-h 1 · rect-fourths-grid 2 |
| W7 | 3/4 | sq-fourths-grid, 3 | sq-fourths-uneq, the 24 + 28 + 34 % strips · sq-fourths-strips 1 · sq-thirds-v 2 |
| W8 | 2/4 | rect-fourths-strips, 2 | rect-fourths-uneq, the 14 + 24 % strips · rect-fourths-grid 3 · rect-thirds-h 2 |
| W9 | 1/2 | sq-fourths-mixed, 2 (the two triangles) | sq-halves-uneq 1 · sq-thirds-v 1 · sq-fourths-grid 1 |
(W9 is the hardest and best: the two triangle quarters ARE one half — the press lumps them into exactly the card's half-patty outline. No tile shades an unequal partition that happens to be correct by area; every distractor is wrong by count, by equality, or by number shaded. **Measured shaded shares (✓ first):** W1 .500 | .340 .333 .250 · W2 .333 | .240 .250 .500 · W3 .250 | .340 .333 .750 · W4 .333 | .240 .667 .250 · W5 .250 | .140 .500 .333 · W6 .667 | .760 .333 .500 · W7 .750 | .860 .250 .667 · W8 .500 | .380 .750 .667 · W9 .500 | .340 .333 .250 — the closest distractor is .083 from its card (W2/W3/W6/W7), so the press verdict and the counting verdict always agree.)

- **Answer position:** MATCH: the ✓ tile stands in slots 1/2/3/4 exactly 4 times each over the 16 rounds (seeded per pass), never in the same slot 3 rounds running; FAIR: the fair tiles' slots are spread so no row or column of the grid holds all of a round's fair tiles; WHICH SHOWS: ✓ in slots 1/2/3/4 → 2/2/2/3 per pass, rotated per pass. The gate also asserts the ✓ tile is not always the one with the most (or fewest) pieces: in MATCH it ties or differs from the distractor counts in every pattern across the set.
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with nothing selected** → MATCH/WHICH "Tap the shape you think is right." · FAIR "Tie a ribbon on every fair shape." (no miss).
- **The press is the verdict** (it runs on Check): MATCH — the chosen tile's pieces go under the press one by one (*squish*), their patties stack on the right platter, then the right stack slides onto the left stack (300 ms). FAIR — every ribboned tile is pressed in turn, its patties stacked on its own little plate under the tile. WHICH — the chosen tile's pieces are pressed; shaded ones become coral patties, unshaded teal; they slide into the card's outline row.
- **Miss 1** (the press shows it): MATCH — the stacks disagree visibly: an over-size patty shows its rim in coral, an under-size one shows the patty below as a pale gap, extra patties slide off and wobble beside the platter, missing ones leave an empty ring outline. FAIR — an unfair ribboned tile's plate shows patties of different sizes side by side, the ribbon slips off. WHICH — the patties do not fill the card's outlines (too big, too small, wrong number coral). Hint: MATCH "Look at the patties. Are they the same size as the model's? Are there as many?" · FAIR "A fair shape makes patties that are all the same size." · WHICH "The card needs {n} equal patties with {k} coral."
- **Miss 2** (the press shows MORE): MATCH — every tile is pressed in a row of small previews under its card (patties only, no stacks), so the child can compare all four — the ✓ tile is the one whose patties equal the model's. FAIR — every tile shows its patties on its plate (the fair ones even, the unfair ones lopsided). WHICH — the card's outline row grows next to each tile. Hint: "Compare the patties, then choose again."
- **A new selection** clears the help until the next Check.
- **Success:** the glaze pour and the bell jar (§2). Bubble: MATCH "Yes — {fraction plural}! Different shapes, the same amount of dough." (e.g. "Yes — fourths! Different shapes, the same amount of dough.") · FAIR "Yes — these {k} are fair: every patty the same size." · WHICH "Yes — {fraction}: {k} of {n} equal parts."

## 8. Settings (each visibly changes the board at rest)
1. **Board:** match the model / fair shares / which shows the fraction — the left column shows the model on its board, or a shelf of six tiles with ribbons, or the fraction card.
2. **Fractions read as:** words ("one third", "halves") / numbers ("1/3") — the fraction card and the celebration change (the task line wording too). Grade-2 classrooms in de/fr/nl/sv/da/no/fi name fractions in words before symbols; numbers is offered for the US/es/pt/it worksheets (Fraction Friends uses 1/2 … 3/4).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (in-tool): "The Dough Press"
- instruction: "Squash the pieces into patties. Equal shares make equal patties."
- task lines: MATCH "These are {fractionPlural}. Find another shape cut into {fractionPlural} — the pieces may look different." · FAIR "Tie a ribbon on every shape cut into equal parts." · WHICH "Which shape shows {fraction}?"
- fraction words: halves / one half · thirds / one third / two thirds · fourths / one fourth / two fourths / three fourths (en uses "fourths" as the live activities do; "quarters" is the UK word — the en copy keeps one word).
- hints: hintPick "Tap the shape you think is right." · hintRibbon "Tie a ribbon on every fair shape." · hintPatties "Look at the patties. Are they the same size as the model's? Are there as many?" · hintFair "A fair shape makes patties that are all the same size." · hintCard "The card needs {n} equal patties with {k} coral." · hintCompare "Compare the patties, then choose again."
- celebrations: as §7.
- settings: "Board" · "match the model" · "fair shares" · "which shows the fraction" · "Fractions read as" · "words" · "numbers"
- aria: tiles "shape {k} of {n}, cut into {p} pieces" — the piece COUNT is visible information and fine; never "equal" or "unequal"; patties "patty {i}, {same size as the model | bigger | smaller}" only after the press has run.
- **Locale traps:**
  - **Fraction nouns:** de *Hälften / Drittel / Viertel*; fr *moitiés / tiers / quarts*; es *mitades / tercios / cuartos*; it *metà / terzi / quarti*; pt *metades / terços / quartos*; nl *helften / derde delen / kwarten*; sv *halvor / tredjedelar / fjärdedelar*; da *halvdele / tredjedele / fjerdedele*; no *halvdeler / tredeler / firedeler*; fi *puolikkaat / kolmasosat / neljäsosat*. "Two thirds": de *zwei Drittel*, fr *deux tiers*, fi *kaksi kolmasosaa* (partitive), nl *twee derde* (no plural), es *dos tercios*, pt *dois terços*, it *due terzi*, sv *två tredjedelar*, da *to tredjedele*, no *to tredeler*.
  - **Gender/agreement:** fr *une moitié* (f) vs *un tiers, un quart* (m); es *un medio / la mitad*; it *un mezzo / la metà*; pt *um meio / a metade* — the "one half" card uses the noun form the curriculum uses (fr *une moitié*, es *un medio* in symbol readings, *la mitad* in prose — native picks per frame).
  - **Fraction symbols:** written as a stacked fraction (numerator over a bar), never "1/3" on one line in the rendered card (the slash form is aria only); fi/sv/da/no grade-2 copy defaults to words.
  - **dough / patty:** the word must mean "a flat round piece of raw dough" — not a pancake, not a baked biscuit. Starting proposals for the native panel: de *Teigfladen*, fr *galette de pâte*, es *disco de masa*, it *disco di pasta*, pt *disco de massa*, nl *deegrondje*, sv *degplatta*, da *dejklat*, no *deigklatt*, fi *taikinalätty*. ("Dough" itself: de *Teig*, fr *pâte*, es/pt *masa/massa*, it *pasta* — in it *pasta* is ambiguous with noodles, so the it panel may prefer *impasto*.)
  - fr U+202F before ! ? : ;
- **Sound off:** the press, the stacks and the outline rows show every verdict; the card is the only reading (and it carries patty outlines).

## 10. Sound off, access, phones
- Keyboard path §5; tiles are focusable buttons (fair: toggle buttons with aria-pressed).
- Taps: tiles ≥ 104 px; ribbon toggles 44 × 44 under each fair tile.
- Fold: 360 × 740 → task 48 + model 180 + press 120 + tiles 2 rows 320 + bubble/Check 60 = 728 — tight; at 360 the press row is merged into the model board (platters either side of the model shape, 76 px) → 608. 320 × 640: model+press 160, tiles 2 × 140 = 288, task 48, Check 60 → 556. Check above both folds.
- Phone layout: tiles under the model; the press foot hides until Check, then rises over the model board (the model's stack is kept to its left as a 76 px platter).

## 11. Distinct from
- **Row 107 (grade 1) — the mobile:** fair shares hang level, by weight. **Row 108 — the glass stamp:** a copy of one piece is stamped on the others, so it proves equality only for CONGRUENT pieces (108's own design says so). This row exists precisely for the shares that are equal but NOT congruent — which neither the stamp nor the mobile's hook-count addresses directly — and turns them into identical round patties: area made visible by conservation.
- **Row 172 (sibling) — the rain table:** the child MAKES thirds and rain measures the parts. Here the child RECOGNISES equal shares in given pictures, the press measures them.
- **Tool fraction-kitchen** cuts pizza/chocolate with a knife and shares slices; here nothing is cut by the child and the instrument's whole job is to compare amounts across different shapes.

## 12. Build plan
- **Core state:** `{board:'match'|'fair'|'which', read:'words'|'numbers', round, sel:null|i, ribbons:Set, pressed:[{tile, patties:[{r, shaded}]}], miss, help}`.
- **Core functions:** `figure(id)` → polygons (exact rational vertices) · `area(poly)` (shoelace) · `patties(fig, shaded)` → radii by `sqrt(k·A/π)` · `isEqualShares(fig, n)` (n pieces, all areas within 0.1 %) · `shows(fig, shaded, card)` (equal shares AND count n AND shaded k) · `stackFit(left, right)` → per layer `{ok|over|under|extra|missing}` · `morph(poly, steps)` → point list for the squash animation (resample the outline to 64 points, interpolate to a circle of equal area) · `check()`.
- **Gate's own ground truth (verify-dough-press-core.js):** recomputes every figure's piece areas from vertices with its own shoelace; per MATCH round exactly one tile is equal-shares with the model's n; per FAIR round the ✓ set = exactly the equal-share tiles; per WHICH round exactly one tile shows the card; each "mixed" figure has equal areas but NOT all pieces congruent (sq-fourths-mixed: 2 squares + 2 triangles; rect-thirds-mixed: 1 strip + 2 triangles; rect-fourths-mixed: 2 strips + 2 rectangles), and rect-halves-step's two pieces are congruent to each other but not to rect-halves-h's; no `-uneq` figure has a piece equal to 1/n of its own n and no WHICH distractor's shaded share is within 0.04 of its card; patty radii equal ⇔ areas equal; the morph preserves area within 0.5 % at every step; slot balance of §6.
- **Mutations:** equality judged by shape (congruence) instead of area (kills on sq-fourths-mixed) · patty radius ∝ area instead of √area (the stack test lies about size) · count only, not equality (halves-uneq accepted) · equality only, not count (fourths accepted for halves) · WHICH accepts 2 shaded of unequal 3 · the ✓ tile always in slot 1 · help survives a new selection · the morph changes the amount (area drift 10 %).
- **Pictures to verify:** none.
- **Risks:** the morph must look like dough squashing (ease-out, slight overshoot wobble), not like a vector tween; stacks need clear 3D thickness so "rim" and "gap" read at 70 px.
- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — squishing dough under a press and watching odd-shaped pieces become identical jiggly patties is pure delight, and the stack test is a satisfying "fwump".
2. **Would a teacher put it on the board?** Yes — it is the clearest possible demonstration that equal shares need not have the same shape, it catches "two pieces = halves" and "count the shaded pieces" errors, and it carries the which-shows and fair-shares worksheets.
3. **Would a parent trust it?** Yes — calm, no score, mathematically exact (every patty is the piece's true amount), no words on the apparatus.
4. **The invention, in one sentence:** every piece is squashed into a round patty with exactly its amount of dough, so equal shares give identical patties whatever their shape and unequal shares show a fat rim on the stack.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Two-right-answers defect fixed: the uneven fourths (15/40/70) had a piece of exactly 25 %, and W3/W5 shaded "1" piece unspecified — the press would have proved that distractor is one fourth. New cuts 14/38/66 (14·24·28·34 %) and 24/60 (24·36·40 %), every shaded piece named; measured shaded shares for all W rounds, closest distractor 0.083 from its card.
- The lump step now runs in every WHICH round (amount-based verdict = equal-parts verdict, proved by the measured gap); W9 works by it.
- rect-halves-step given exact vertices (3000 each, measured); the gate's "pairwise non-congruent" claim corrected (mixed figures are not ALL congruent; the step's two pieces are congruent to each other).
- Distinct from 107 (weight), 108 (congruent copy) and the fraction-kitchen tool (knife/food) — kept.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
