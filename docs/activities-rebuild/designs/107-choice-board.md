# Row 107 — Equal Halves and Fourths → THE FAIR MOBILE (1.G.A.3)

## 0. Identity
- id `choice-board.fraction-equal-shares.1-g-a-3` (KEPT; slugs, titles and intros frozen in all 11 locales) · grade 1 · CCSS 1.G.A.3 (partition circles and rectangles into two and four equal shares; describe the shares as halves, fourths/quarters; understand that the shares must be equal) · Geometry · own files `fair-mobile-core.js`, `fair-mobile-activity.js`, `fair-mobile-activity.html`, `fair-mobile-activities.json` (this row moves out of `choice-board-activities.json`; the choice-board engine and its other rows stay untouched).
- worksheets it covers: G2-228 Half and Half (L1) · G2-229 Thirds and Quarters (L2) · G2-230 Find the Fraction and G2-231 Fraction Friends (L3 — match a picture to its fraction) · G2-232 Fair Shares? (L1/L2 — equal vs unequal) · G2-234 Cut It Right (L1/L2 — which cut is right) · G3-343 Equal Pieces (L3 — equal pieces named as a unit fraction).
- old activity: 12 rounds of four tiles (a correct equal split, an unequal split, the other fraction, a not-split whole) for circles, squares and rectangles; tap the equal halves/fourths. **Kept**: all 12 rounds' tile sets verbatim (the figure ids `circle-halves-v`, `circle-halves-uneq`, `circle-fourths`, `circle-notsplit`, `sq-halves-v`, `sq-halves-uneq`, `sq-fourths-grid`, `sq-fourths-uneq`, `rect-halves-h`, `rect-halves-uneq`, `rect-fourths-strips`, `rect-notsplit`, `circle-halves-diag`, `circle-fourths-uneq`, `sq-notsplit`, `rect-fourths-grid`, `rect-fourths-uneq`, `rect-halves-v`, `circle-halves-h`, `sq-halves-diag`, `sq-halves-h`) as L1 and their well-chosen distractor logic (unequal / wrong count / not split). **Changed**: the answer is no longer just tapped and judged — it is HUNG on a mobile that tests it by weight; the old fixed "correct tile first" order is dealt. **Added**: thirds (L2) and naming the share (L3).

## 1. The pitch
"Hang the cut-up shape on a mobile with one hook per share: fair shares hang perfectly level — an unfair cut tips, and the wrong number of pieces can't all find a hook."

## 2. Why a child will want it again
- **A mobile you load yourself.** Above the stage hangs a real-looking mobile: a slim wooden bar on a string, with one hook for each share. Under every hook hangs a little brass **spring**. The child chooses a cut-out shape and clips it on; the latch pin pulls out and the mobile swings, bobs, and settles. Mobiles are hypnotic — the swinging is a little show every time.
- **The tipping truth.** An unfair cut makes the bar tip down on the heavy side, the little bubble in the spirit level on the bar slides off-centre, and the heavy piece's spring stretches longer than its neighbour's. A fair cut hangs dead level, the bubble sits in the middle, every spring stretches to exactly the same length, and the mobile turns slowly round and round.
- **One chord.** Each spring is also a chime: a piece rings a note set by its weight (heavier = lower). A fair mobile rings ONE clear chord — every share the same note — while an unfair one rings a sour mix. (Sound is a bonus; the equal springs say the same thing silently.)
- **The spare-pieces tray.** A shape cut into four on a two-hook mobile: two pieces have no hook and drop into the little spare tray below with a clatter. A whole, uncut shape hangs all its weight on one hook and the bar swings right down.
- **Free play**: after a round the child can hang any of the round's cards on the mobile, one after another, and watch each one swing — guessing first.

## 3. The skill and the misconception
- Skill (1.G.A.3 and the mapped worksheets): a shape is in halves when it is cut into 2 EQUAL shares, in fourths when 4 equal shares, in thirds when 3 equal shares; equal shares are equal in size even when they look different; one share of n equal shares is "one half / one third / one fourth" of the whole.
- Misconceptions made visible:
  1. **"Two pieces = halves"** (count without equality): the unequal halves tip the bar. The truth is weight — cardboard of the same thickness weighs by its area — so the mobile measures exactly what "equal" means.
  2. **"Any 4 pieces are fourths"** / **"4 pieces are halves too"**: the hooks count. A shape cut in 4 on the halves mobile leaves 2 pieces with no hook (they drop into the spare tray); halves on the fourths mobile leave 2 hooks empty and the bar tips.
  3. **"Equal parts must look the same"** (L2/L3): a square cut by its diagonals and a square cut into a grid both hang level — different-looking shares, same size.
  4. **"Thirds = cut parallel to the base"** on a triangle (L2 #4): the three strips hang very unevenly; the three pieces from the centre to the corners hang level.
  5. **Naming by the number of cuts** (L3): one cut makes halves, but two cuts across a circle make fourths, not thirds — the shaded share only balances on the mobile whose hook count is the number of equal shares.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 480):
- **The mobile** (top centre, 420 × 230): a ceiling hook (drawn, 20 px) at the top, a string (2 px) down to the pivot, and the **bar** (a drawn wooden rod, 300 × 10 px, #C99A6B with a 2 px ink edge) with a **spirit level** in its middle (a 56 × 14 px glass vial, a 10 px bubble; when level the bubble sits between two tick marks). One **hook** per share at the bar's ends (halves: 2 hooks at ± 140 px; fourths: a top bar with a sub-bar (140 px) hanging from each end, each sub-bar with 2 hooks at ± 60 px; thirds: the 2:1 mobile — the bar's pivot sits at one third of its length, a single hook on the long arm (2 parts away), a sub-bar with 2 hooks on the short arm (1 part away) — which is level only when all three pieces weigh the same, §12). A **latch pin** (a 14 px brass pin through the bar into a bracket) holds the bar level until Check. Pieces hang from hooks by short strings attached at each piece's centroid.
- **The springs** (between each hook and its piece): a drawn coil 10 px wide, 24 px at rest; after release each stretches by 40 px × (its piece's weight ÷ the equal share's weight), so a fair share stretches exactly 40 px. A dashed **fair line** (teal, 2 px) is drawn across all the springs at the equal-share length once the pin is out. The springs never change the bar's torque (they hang below the hook point).
- **The spare tray** (bottom right of the mobile area, 120 × 40): a small drawn tray where hook-less pieces fall.
- **The card shelf** (bottom, 660 × 150): four cut-out cards — the round's split shapes, each in a 128 × 128 box — standing on a drawn shelf (#C99A6B, 3 px ink). Each shape is drawn as a cardboard cut-out (#FBE7C6 fill, 3 px ink outline, cut lines 3 px dashed-then-solid ink — the "scissor line"), shares lightly alternating in two cream tints so the parts read; L3 cards have one share shaded teal.
- L3: **three mobiles** side by side instead of one (each 200 × 210, bars 160 px): a ½ mobile (2 hooks), a ⅓ mobile (2:1 build) and a ¼ mobile (two-level), each with a **name plate** hanging under its pivot showing the fraction (content: "1/2", "1/3", "1/4" as stacked fractions, 22 px) and the word beneath in the page locale ("one half", "one third", "one fourth").
- Task line above (≤ 24 px). Check button and bubble under the shelf.

At 360 (stacked, stage ≈ 336 × 640): the mobile 336 × 210 (bar 260 px, sub-bars 110 px, spirit level 48 × 12; springs 8 px wide, 18 px at rest + 30 px for a fair share), spare tray 96 × 32, the card shelf as a 2 × 2 grid of 140 × 140 boxes (shapes ≥ 110 px). L3: the three mobiles stack as a horizontal row of three narrow mobiles (each 108 × 190, bars 90 px, name plates 18 px) — the plate is the target. Check at y ≈ 600 at 360 × 740; at 320 × 640 card boxes 130 × 130, Check y ≈ 575.

**No library pictures** — the mobile, bar, level, hooks, springs, pin, tray, shelf and the cut-out shapes are drawn geometry; the shapes ARE the mathematics (the first draft's animal "friends" waiting under the hooks were removed: receiving equal slices on friends' plates is the premium fraction-kitchen tool's ending, and decorative pictures under a weighing apparatus only competed with the springs). **No words on the apparatus** except the L3 name plates, which ARE the content (the fraction and its name).

## 5. The hand
1. **Drag a card** from the shelf (lifts 1.1× with a shadow within 50 ms) **onto the mobile** (drop zone: the bar's area + 40 px) → the card's pieces separate (a 200 ms "pop" along the cut lines, pieces drifting 6 px apart) and fly to the hooks — one piece per hook, in order of position (left pieces to left hooks); pieces beyond the hook count tumble into the spare tray (400 ms, a cardboard clatter); hooks with no piece stay bare. The latch pin holds the bar level. Tap-tap also works (tap a card, tap the mobile). Drag a hanging piece (or tap the mobile) → all pieces fly back and re-join on the card on the shelf (undo).
2. **Check** pulls the latch pin (a little *tick*, the pin slides out 150 ms) → the mobile swings to its balance: a damped pendulum (≈ 3 visible swings, 1.6 s) settling at the true tilt; the spirit level's bubble slides with it. Level: the mobile then turns slowly (a gentle 3D-ish scale-X oscillation of the whole mobile, 4 s per turn) with a soft wind-chime.
3. **L3**: drag the shaded card to ONE of the three mobiles; Check releases that mobile's pin.
4. **Free play** (after success): any card can be hung and released (no judging); the latch pin re-inserts itself when a new card is hung.
- **Physics (core)**: **bars and springs are massless in the model** (the drawn thirds bar, pivoted at ⅓, would otherwise be pulled down on its long arm by its own wood — the drawing keeps the bar slim and the model ignores it, so an empty mobile hangs level). Pieces are assigned to hooks left to right by centroid x (ties broken by centroid y, top first); a card with FEWER pieces than hooks fills hooks 1, 2, … in order and leaves the last hooks bare, so the bar always tips (on the fourths mobile a halves card fills sub-bar 1 — which hangs level — and the top bar tips 2 : 0). The level chime and success sound play only when every hook holds exactly one piece AND the spare tray is empty: two equal pieces of a fourths card on the halves mobile DO hang level, but their two spare pieces clatter into the tray and the chord does not ring. Each piece's weight = its exact area (polygon area; circle sectors and segments by formula); torque about each pivot; the bar hangs from a point 18 px ABOVE its centre line so it settles at a definite tilt θ with tan θ = (Σ torques)/(W · 18 px-equivalent) — clamped to ± 28°; equal weights give exactly 0°. Sub-bars tilt on their own pivots by the same law. The tilt for every distractor in the round tables is ≥ 6° (gate), so no "nearly level" ambiguity is shown to a child.

## 6. The rounds
One round = four cards on the shelf; exactly one card is cut into the asked number of EQUAL shares (L1/L2); the child hangs a card and presses Check. A card is right when the mobile hangs level with every hook holding exactly one piece and nothing in the spare tray. L3: one shaded card; right when it is hung on the mobile whose hook count equals its number of equal shares.

**Level 1 — Halves and fourths** (the old 12 rounds; mobile: halves = 2 hooks, fourths = 4 hooks)
| # | shape | asked | the four cards (the equal one first; shelf order dealt) |
|---|---|---|---|
| 1 | circle | halves | circle-halves-v · circle-halves-uneq · circle-fourths · circle-notsplit |
| 2 | square | halves | sq-halves-v · sq-halves-uneq · sq-fourths-grid · sq-fourths-uneq |
| 3 | rectangle | halves | rect-halves-h · rect-halves-uneq · rect-fourths-strips · rect-notsplit |
| 4 | circle | halves | circle-halves-diag · circle-halves-uneq · circle-fourths · circle-fourths-uneq |
| 5 | square | fourths | sq-fourths-grid · sq-fourths-uneq · sq-halves-v · sq-notsplit |
| 6 | rectangle | fourths | rect-fourths-grid · rect-fourths-uneq · rect-halves-v · rect-halves-uneq |
| 7 | circle | fourths | circle-fourths · circle-fourths-uneq · circle-halves-h · circle-notsplit |
| 8 | square | halves | sq-halves-diag · sq-halves-uneq · sq-fourths-grid · sq-fourths-uneq |
| 9 | rectangle | halves | rect-halves-v · rect-halves-uneq · rect-fourths-strips · rect-fourths-uneq |
| 10 | circle | fourths | circle-fourths · circle-fourths-uneq · circle-halves-v · circle-notsplit |
| 11 | square | fourths | sq-fourths-grid · sq-fourths-uneq · sq-halves-h · sq-halves-uneq |
| 12 | rectangle | halves | rect-halves-h · rect-halves-uneq · rect-fourths-grid · rect-notsplit |

Figure definitions (exact, for the core and the gate): `*-halves-v/h` = one cut through the centre, vertical/horizontal; `*-halves-diag` = one cut along a diagonal (square, rectangle) or a 45° diameter (circle); `*-halves-uneq` = one cut parallel to the halves cut at 32 % / 68 % (circle: a chord at 0.4 r from the centre — areas 25 % / 75 %); `*-fourths` (circle) = two perpendicular diameters; `*-fourths-grid` = a centred cross; `*-fourths-strips` = three parallel cuts at 25/50/75 %; `*-fourths-uneq` = a cross through the point (35 %, 40 %) of the box (circle: two perpendicular chords crossing at (−0.3 r, −0.25 r)); `*-notsplit` = no cut. All unequal pieces differ from their siblings by ≥ 20 % of the larger piece (gate) — every unfair card tips ≥ 6°.

**Level 2 — Thirds and fair shares** (mobile per the asked number)
| # | shape | asked | the four cards (equal one first) | the trap |
|---|---|---|---|---|
| 1 | circle | thirds | circle-thirds (three 120° sectors) · circle-thirds-uneq (sectors 90°/120°/150°) · circle-halves-v · circle-fourths | — |
| 2 | rectangle | thirds | rect-thirds-strips (cuts at ⅓, ⅔) · rect-thirds-uneq (cuts at 25 %, 60 %) · rect-halves-v · rect-fourths-strips | — |
| 3 | square | thirds | sq-thirds-strips · sq-thirds-y (a "Y" from the centre to the top corners and the bottom mid-point — 25 % / 37.5 % / 37.5 %) · sq-halves-diag · sq-fourths-grid | the Y looks like a "fair" peace-sign cut |
| 4 | triangle (equilateral) | thirds | tri-thirds-centre (three lines from the centre to the corners) · tri-thirds-bands (two cuts parallel to the base at ⅓ and ⅔ of the height — areas 11 %, 33 %, 56 %) · tri-halves (the altitude) · tri-notsplit | "thirds of the height" are not thirds of the triangle |
| 5 | square | fourths | sq-fourths-diag (both diagonals: 4 triangles) · sq-fourths-uneq · sq-thirds-strips · sq-notsplit | equal shares that are triangles, not little squares |
| 6 | rectangle | fourths | rect-fourths-strips · rect-fourths-uneq · rect-thirds-strips · rect-halves-h | — |
| 7 | hexagon (regular) | thirds | hex-thirds-rhombi (three rhombi from the centre) · hex-thirds-bands (two cuts parallel to a side through the 1/3-points of the height — the middle band is the biggest — the gate computes the exact areas and asserts the ≥ 1.25 ratio) · hex-halves · hex-sixths (six triangles) | sixths are 6 equal pieces, not thirds |
| 8 | circle | fourths | circle-fourths-diag (two diameters at 45°) · circle-fourths-uneq · circle-thirds · circle-halves-h | — |

**Level 3 — Name the share** (one card, one share shaded; three mobiles ½ ⅓ ¼ in dealt order)
| # | card (all shares equal) | right mobile | the look that tempts |
|---|---|---|---|
| 1 | circle-halves-v, 1 shaded | ½ | — |
| 2 | sq-fourths-grid, 1 shaded | ¼ | — |
| 3 | rect-thirds-strips, 1 shaded | ⅓ | — |
| 4 | tri-halves, 1 shaded | ½ | a triangle-shaped share looks like "a third" to some children |
| 5 | hex-thirds-rhombi, 1 shaded | ⅓ | three cuts from the centre ("3 cuts" ≠ the name) |
| 6 | circle-fourths, 1 shaded | ¼ | two cuts → "one half"? |
| 7 | sq-fourths-diag, 1 shaded | ¼ | triangle shares |
| 8 | sq-halves-diag, 1 shaded | ½ | triangle share |

- **Answer position**: shelf slots are dealt fresh per pass; over a pass of L1 the equal card occupies each of the 4 slots exactly 3 times; L2 each slot twice; L3 the right mobile is each of the 3 mobile positions 2–3 times per pass. Distractor kinds are spread so no slot holds "not split" more than ⌈n/4⌉ times. **Gate**: over 2,000 passes P(equal card in slot s) = 0.25 ± 0.03; a "most pieces" bot, a "fewest cuts" bot and a "symmetric-looking" bot (picks the card whose cut lines are mirror-symmetric) each succeed in < 60 % of rounds (L2 #3/#4/#7 are designed to defeat the symmetry bot).
- **Order**: order-only reshuffle per pass; L1 #1 always opens.

## 7. Check, the misses, the success
- **Check with nothing on the mobile** → no miss; the hooks wiggle; bubble: "Hang a card on the mobile first."
- **Miss 1** → the mobile shows the truth: it swings and settles tipped (or with empty hooks / pieces in the spare tray). The heaviest hanging piece gets a soft coral glow, the lightest a soft teal glow, so the child sees which is too big. Bubble by cause:
  - unequal: "It tips! One share is bigger than the others — that's not fair."
  - too many pieces: "{extra} pieces have no hook — this card has {k} shares, not {n}."
  - too few / not split: "Some hooks are empty — this card has only {k} share(s)."
  - L3 wrong mobile: "This mobile has {n} hooks, but the card has {k} equal shares."
- **Miss 2** → the stronger showing: the bar is held level by the pin again and **the springs are measured**: each piece drops to its own spring length, the dashed fair line lights, and every piece hanging below the line has the extra length of its spring outlined coral (above the line: teal) — the child sees exactly which share is too big and which too small, in the same unit (weight) the mobile used. For a wrong-count card, a ghost of the right number of hooks flickers on the bar. L3: the card's shares are counted aloud and in numerals (1, 2, 3, 4 appear on the shares, 300 ms apart) and the mobile with that many hooks bobs. Bubble: "Look at the springs — the big share pulls its spring past the line. Fair shares all stop on the line." (L3: "Count the equal shares, then find that many hooks.")
- A new move (hanging another card, or taking it down) clears the glows and the stacks (help taken away until the next Check).
- **Success** → the mobile settles level, the bubble centres between its ticks (*ting*), every spring stops on the fair line, the chimes ring one chord, and the mobile turns slowly; then each piece lights its own fraction label ("1/4" in stacked notation on every share, 300 ms apart). Bubble: L1/L2 "Level! {n} equal shares: each share is one {unitWord}." (e.g. "Level! 4 equal shares: each share is one fourth.") · L3 "Yes — the shaded share is one {unitWord} of the {shape}: {fraction}."

## 8. Settings (each visibly changes the board at rest)
1. **Spirit level**: on (default; the bubble vial on the bar) · off (the bar is plain wood — the child reads only the tilt of the mobile and the springs; for later practice).
2. **Fourths word**: fourths (default for en-US) · quarters — visibly changes the L1/L3 name plates and the success line ("one quarter"). (Only shown in en; other locales use their single school word, §9.)
Level picker (shell): Halves and fourths · Thirds and fair shares · Name the share.

## 9. Words (EN source)
- title (frozen): Equal Halves and Fourths — Find the Fair Shares / Grade 1 Geometry
- instruction: "Hang a card on the mobile. Fair shares hang level!"
- task lines: L1 "Which card is cut into {n} equal shares? Hang it on the mobile." · L2 the same with thirds/fourths · L3 "Which mobile matches the shaded share?"
- unit words: one half / halves · one third / thirds · one fourth / fourths (setting: one quarter / quarters); shapes: circle, square, rectangle, triangle, hexagon.
- name plates (L3): "1/2" one half · "1/3" one third · "1/4" one fourth.
- hints and celebrations: §7.
- settings labels: "Spirit level" — "on" / "off"; "Fourths word" — "fourths" / "quarters"; levels as above.

**Locale traps**:
- **Unit-fraction words**: de *ein Halb* / *die Hälfte*, *ein Drittel*, *ein Viertel*; fr *un demi* / *une moitié*, *un tiers*, *un quart* (school says *la moitié*, *un quart*); es *un medio* / *la mitad*, *un tercio*, *un cuarto*; pt *um meio* / *a metade*, *um terço*, *um quarto*; it *un mezzo* / *la metà*, *un terzo*, *un quarto*; nl *een half* / *de helft*, *een derde*, *een vierde* / *een kwart*; sv *en halv* / *hälften*, *en tredjedel*, *en fjärdedel*; da *en halv* / *halvdelen*, *en tredjedel*, *en fjerdedel*; no *en halv* / *halvparten*, *en tredjedel*, *en fjerdedel*; fi *puolikas* / *puolet*, *kolmasosa*, *neljäsosa*. The "fourths/quarters" setting exists only in en; every other locale uses its one school word (and nl chooses *vierde* vs *kwart* by the national grade-1 materials — the reviewer decides).
- **Fraction notation**: a stacked fraction (numerator over a bar over the denominator) is universal in school; never a slash in the rendered plate (the "1/2" above is the source key only).
- **"Equal shares / fair"**: de *gleich große Teile* / *gerecht*, fr *parts égales* / *équitable*, fi *yhtä suuret osat* / *reilu* — the instruction's "fair" is the child word in each locale.
- **Plural and number agreement** in "{n} equal shares" (fi partitive *4 yhtä suurta osaa*; de *4 gleich große Teile*; fr *4 parts égales* f.).
- Gendered numerals in pt/es/it: *uma* vs *um*, *una* vs *un* follow the noun "share/part" (*parte* f.).
- The chime chord is a bonus (TTS-free, a pure tone); nothing on the apparatus is language.

## 10. Sound off, access, phones
- Sound off: the tilt, the bubble, the empty hooks, the spare tray, the spring lengths against the fair line and the per-share labels carry everything.
- Keyboard: Tab to a card, Enter hangs it on the mobile (L3: Left/Right choose the mobile, Enter hangs); Enter on Check releases the pin; Delete takes the card down.
- aria: cards `aria-label="card {n}: a {shape} cut into {k} pieces"` (NOT whether equal — that is the question); after release the live region announces "the mobile hangs level" / "the mobile tips to the {left|right}" / "{x} pieces have no hook".
- Taps: cards 128 px (phone 140), mobiles ≥ 108 px wide, Check ≥ 44 px.
- Pictures: none (all drawn geometry).
- Check above the fold: y ≈ 600 at 360 × 740, y ≈ 575 at 320 × 640.

## 11. Distinct from
- **Row 108 THE ONE-PIECE STAMP** (the sibling fraction row): there the child CUTS and tests congruence by stamping a copy of one piece; here the child CHOOSES among cut cards and tests equality by weight on a mobile. Different hand, different test.
- **fraction-kitchen tool** (drag a knife along guide lines to cut foods; unequal pieces seesaw and heal; share slices onto friends' plates; two fourths fill a half): there the child CUTS food and the wobble is a momentary verdict on one cut. Here nothing is cut and nothing is shared out: the child chooses among already-cut cards and LOADS a hierarchical mobile whose hook count is the denominator, and the evidence that stays on screen is the bar's tilt and the spring lengths against a fair line. No plates, no friends, no food (deliberately removed from the first draft).
- **number-balance tool** and **New 209 The Bet Pan** (pan balances comparing two loads): a two-pan comparison of two things. The mobile has one hook per share, hangs a single partitioned whole, and its hook count is the denominator — a hierarchical mobile that is level only when ALL shares are equal.
- No built invention reused.

## 12. Build plan
- **Core** `FairMobileCore`: figures as exact geometry (`polygon` pieces; circle sectors/segments as `{type:'sector'|'segment', …}`); `areas(figure)` exact; `centroid(piece)`; mobile builds: `halves` (bar, 2 hooks at ±a), `thirds` (pivot at ⅓: one hook at distance 2d on one side, a sub-bar of two hooks at ±e on the other side at distance d), `fourths` (top bar with two sub-bars); `hang(figure, mobile)` → `{assigned:[pieceIdx per hook], spare:[…], empty:[hookIdx]}` (assignment left to right by centroid x); `settle(mobile, weights)` → angles per bar via `tan θ = torque / (W · h)` with h = the pivot height above the bar, clamped ±28°; `isLevel(angles)` (all |θ| < 0.5°); `isRight(round, hung)`.
- **Proof that the mobiles are honest** (in the gate): halves level ⇔ w1 = w2; fourths level ⇔ w1 = w2 (sub-bar 1) ∧ w3 = w4 (sub-bar 2) ∧ w1 + w2 = w3 + w4 (top) ⇔ all four equal; thirds level ⇔ w2 = w3 (sub-bar) ∧ 2d · w1 = d · (w2 + w3) (top) ⇔ w1 = w2 = w3. The gate checks these equivalences symbolically and numerically (10,000 random weight sets).
- **Gate's own ground truth** (`verify-fair-mobile-core.js`): its own area computation for every figure from the definitions in §6 (independent formulas); asserts (a) exactly one card per L1/L2 round is equal-with-the-asked-count; (b) every unequal card's largest/smallest piece ratio ≥ 1.25 and its settled tilt ≥ 6°; (c) wrong-count cards produce spares or empty hooks on the asked mobile; (d) L3: every card's shares are equal and exactly one mobile matches; (e) the bots and balance (§6); (f) the stacking help (miss 2) aligns by centroid and shows a non-empty overhang for every unequal card.
- **Mutations**: bar given mass (empty thirds mobile tips) · chord plays with pieces in the spare tray · springs stretch by piece count · weight = piece count instead of area · fourths mobile level when only pairs balance (top-bar check removed) · thirds mobile built as a symmetric 3-hook bar (level for w1 = w3 only) · spare pieces hung anyway · empty hooks ignored · tilt clamp hides a 6° tilt (threshold raised to 7°) · L3 accepts a card on the mobile with the right number of CUTS · equal card always in slot 0 · help persists after a new move · Check with an empty mobile counts a miss.
- **No pictures.** Spring gate: a spring's stretch is weight ÷ (whole ÷ n) × 40 px exactly; on every right card all springs end on the fair line within 0.5 px; on every unfair card at least one spring ends ≥ 8 px off the line (the ≥ 1.25 ratio guarantees ≥ 10 px).
- **Risks**: (1) a pendulum animation that never quite settles — damping is computed, final angle snapped at 1.6 s; (2) the thirds mobile looks lopsided by construction (its pivot is off-centre) — the bubble level is the child's reference, and a spring hangs under every hook so the lopsided bar reads as "built for three"; (3) the en-only fourths/quarters setting — hidden in other locales by the settings schema.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a swinging mobile, a bubble that slides, springs that stretch, a chord that rings, and pieces clattering into a spare tray.
2. **Would a teacher put it on the board?** Yes — it makes "equal shares" literally measurable (same area = same weight = level), turns the number of hooks into the denominator, and includes the misconception cards (unequal halves, thirds of the height, triangle-shaped fourths) with a stacking help that shows the extra bit.
3. **Would a parent trust it?** Calm, honest physics, no pictures to get wrong, no score.
4. **The invention in one sentence:** hang the cut-up shape on a mobile with one hook per share — fair shares hang perfectly level, an unfair cut tips, and the wrong number of pieces can't all find a hook.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 3→5 · reality 4→5
What changed:
- **Physics verified and closed.** Halves level ⇔ w1 = w2; fourths ⇔ both sub-bars level and the top balanced ⇔ all four equal; thirds (pivot at ⅓, one hook at 2d, a two-hook sub-bar at d) ⇔ w2 = w3 and 2w1 = w2 + w3 ⇔ all three equal. Two holes fixed: the bar's own mass would have tipped the empty ⅓ mobile (bars now massless in the model), and the hook-fill order for cards with too few/too many pieces was unspecified (now left-to-right by centroid, ties by y; too few pieces always tip). The level chord only rings with every hook filled and nothing in the spare tray — a fourths card on the halves mobile hangs level but is not a success.
- Every unfair card is ≥ 1.25 largest/smallest (checked: chord 25/75, Y 25/37.5/37.5, triangle bands 1/9-3/9-5/9, hexagon bands ratio 1.375, sectors 90/120/150), so with the 18 px pivot every distractor reaches the 28° clamp — no "nearly level" picture.
- **Distinct from fraction-kitchen:** the animal friends receiving equal pieces (kitchen's friends-and-plates ending) are gone; the success and the miss-2 help are now **springs under the hooks** with a fair line — weight shown in the mobile's own unit, a stronger and more honest second showing than the old "stack the pieces by centroid" (which could not even cover rotated equal sectors, and imitated Row 108's stamp).
- No library pictures remain, so nothing can be the wrong picture.
