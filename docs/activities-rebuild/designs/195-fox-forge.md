# Row 195 — Pip's Chocolate Forge → THE SELF-WRITING TICKET (3.NF.A.1)

## 0. Identity
- id `fox-forge.fraction.3-nf-a-1` (kept; title "Pip's Chocolate Forge — Build Fractions" and intros frozen en…nl; sv/da/no/fi metadata new at build) · grade 3 · CCSS 3.NF.A.1 · strand Number & Operations—Fractions · own files `fox-forge-core.js` (rewritten), `fox-forge-activity.js`, html, manifest row; 0 lines to shared engines (the E14 `fractions-core.js` stays untouched).
- worksheets it covers: **G3-315 Name That Fraction** (write the fraction the shaded parts show) · **G3-316 Shade the Fraction** (colour the right number of parts) · **G3-321 Find the Whole** (the small bar is one part — which bar is the whole?).
- what the old activity did: Pip the fox forges chocolate orders — pick the unlabelled unit mould by its SIZE, forge it a times, hand it over once; round types build, name-unit, equal-parts (one unfair mould), denominator (3/4 then 3/8), magnitude (a/b of THIS bar), the-whole (3/4 of a big vs a small bar), cross-shape (half a pizza). **Kept:** Pip, the forge, unlabelled moulds chosen by size, a copies of 1/b, the fair-mould round, the "still three pieces — but eighths" round, the "of THIS bar" rounds and the big-bar/small-bar 3/4 round, every round's fraction. **Dropped:** the pizza round (a library pizza is not cut into exactly equal parts — the shape cannot carry "equal"; circles appear only as drawn geometry in Row 196). **Fixed:** the pt prompts of the two name-unit rounds read "Toque em UM terço (1/3)" / "UM oitavo (1/8)" — they printed the answer of the question they asked.

## 1. The pitch
"You forge the chocolate, and Pip's ticket writes itself: at Check, copies of your piece fill the rest of the bar as chocolate outlines — how many fit the whole bar becomes the bottom number, how many you forged becomes the top — so the ticket prints the fraction you actually made, right beside the one that was ordered."

## 2. Why a child will want it again (the fun)
- **Forging is a toy.** Pull the forge lever: molten chocolate pours into the chosen mould (a glossy brown fill, 300 ms, a gentle *gloop*), the piece pops out (*pop*) and slides along the bar to snap against the last one (*clack*). Each press adds one piece; a little tray of steam wisps rises.
- **The ticket prints itself.** At Check, the receipt printer on the counter whirrs; outline copies of the child's piece march along the empty rest of the bar one by one (*tick, tick*), counting up the bottom number; then the forged pieces count up the top number — the ticket rolls out with *the child's own fraction* printed on it. If it matches the order, Pip stamps it with a paw-print stamp (a drawn stamp shape) and the order slides away in a box.
- **Wrong is funny, not bad.** Forge with the eighth mould for a fourths order and the ticket prints "3/8" next to "3/4" — the child *sees* what they made. An unfair mould's outlines won't line up: they overlap or leave a gap, and the printer stutters and prints "?" on the bottom.
- **The earned show:** the finished bar gets a foil wrapper that folds round it, Pip (the library fox picture) does a little hop, and the order ticket flies onto Pip's spike with the others — a growing spike of completed orders across the session.

## 3. The skill and the misconception
- **Skill (3.NF.A.1):** 1/b is one part when a whole is partitioned into b equal parts; a/b is a parts of size 1/b. Name a shaded fraction (G3-315), shade a fraction (G3-316), and find the whole from one unit part (G3-321).
- **Misconception 1 — counting pieces, not the size of the piece** ("3/4 is any three pieces"). *Push-back:* forging three eighths for a 3/4 order prints "3/8" — the bottom number comes from how many of *that* piece fill the bar.
- **Misconception 2 — unequal parts still count** ("4 pieces = fourths"). *Push-back:* the unfair mould's outline copies cannot tile the bar (an overlap or a gap is drawn and the bottom prints "?").
- **Misconception 3 — the denominator is the number of shaded parts / numerator and denominator swapped** (naming 1 shaded out of 3 as "3/1" or "1/2" from "1 shaded, 2 not"). *Push-back:* in name rounds the miss shows the bar counting all its parts for the bottom (1…3) and the shaded ones for the top.
- **Misconception 4 — the whole is always the longest bar / the same length every time.** *Push-back:* in find-the-whole rounds the wrappers vary and the piece's screen size changes every round; only b copies of the piece fill the right wrapper exactly (a short wrapper overflows, a long one leaves a gap).
- **Misconception 5 — 3/4 of any bar is the same amount.** *Push-back (bar changes size):* two bars both stamped 3/4 — the bigger bar's 3/4 is visibly more chocolate.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40. The bars, moulds, pieces and ticket are drawn apparatus (chocolate browns `#6B4A2B` bar / `#5A3A1E` pieces, 2 px ink, groove lines only where parts are pre-cut); the only picture is Pip.

**At 704 — left 460 px (the forge), right 212 px (the counter):**
- **The bar (left, centred):** an empty chocolate-bar tray — a rounded rectangle, its length = the round's `wholeLen` in units mapped to px (120 units = 420 px; the "changes size" setting uses 96–150 units → 336–525 px, capped to 440 px by scaling the whole forge), 64 px tall, a thin gold rim. Forged pieces fill from the left.
- **The moulds (below the bar):** 3 moulds (4 in two rounds) in a row, each a tray-shaped hollow whose inner length is the piece size it makes (1/b of this round's bar), 56 px tall, no labels; the unfair mould (equal-parts rounds) makes pieces that alternate long/short (drawn as a mould with two hollows of different lengths that are used in turn). Tapping a mould selects it (raised, teal outline).
- **The forge lever:** a 56 × 96 drawn lever to the right of the moulds.
- **Pip's counter (right column):** the library **forest-creatures/fox** at 96 px; the **order ticket** (a paper slip 180 × 96: the ordered fraction in Baloo 2 40 px, stacked numerator over denominator with a bar) and, beneath it, the **printed ticket** slot (same size, empty until Check). The spike of completed orders is a small drawn spike with paper slips (one per solved round, max 8 visible).
- **Name rounds:** the bar arrives pre-cut into b equal parts (grooves) with a parts filled; the printed ticket becomes two typeable fields (top / bottom, 64 × 48 each) with the shell keypad.
- **Shade rounds:** the bar is pre-cut into b equal empty parts; tapping a part fills it with chocolate.
- **Find-the-whole rounds:** one single forged piece sits on the counter with its order label "1/b"; under the forge three empty **wrappers** (gold foil outlines of different lengths, 48 px tall) replace the bar; tapping a wrapper selects it.
- **Task line** above the forge, ≤ 2 lines, 22 px.

**At 360 — stacked:** task line · Pip 64 px with the order ticket (150 × 80) and printed slot side by side · the bar full width (≤ 330 px; 120 units = 300 px) · moulds row (3 × 96 px) + lever (48 × 80) · Check (≈ y 560) · name rounds: keypad as a sheet. Check above the fold at 360 × 740 and 320 × 640.

No words on the apparatus: the fractions are numerals; moulds and wrappers carry no labels.

**Task lines (EN):**
- build: "Forge {frac} for Pip. Choose the piece by its size, then forge it."
- build (bar changes size): "Forge {frac} of THIS bar. Choose the piece that fits this bar."
- equal parts: "One mould makes pieces that are not equal. Forge {frac} with a fair mould."
- name: "What fraction of the bar is chocolate? Write it on the ticket."
- shade: "Fill {frac} of the bar with chocolate."
- whole: "This piece is {unit} of a bar. Which wrapper fits the whole bar?"
- two bars: "Forge {frac} on the big bar. The small bar already has {frac}."

({frac} is shown as a stacked fraction in the line, e.g. ¾ typeset; the spoken/aria form is the locale's fraction words.)

## 5. The hand
- **Choose a mould:** tap (≤ 100 ms: raises 4 px, teal outline). Changing the mould after forging is allowed — pieces already forged stay (they may be of a different size; the ticket will reflect the last state honestly: mixed pieces print "?" on the bottom because no single piece's copies tile the bar).
- **Forge:** pull the lever down (drag 40 px, or tap) → pour 300 ms → piece slides to the bar end (240 ms) → *clack*. A piece that would stick out past the bar's end is still forged and overhangs (the child sees it doesn't fit).
- **Remove a piece:** tap the last forged piece → it melts back into the mould (200 ms). Only the last piece can be removed (a stack).
- **Shade:** tap a part to fill / tap again to empty (each 120 ms pour).
- **Name:** tap a field, type with the keypad.
- **Whole:** tap a wrapper (selected = gold, raised).
- **Keyboard:** Tab → moulds (←/→, Enter selects) → lever (Enter forges, Backspace removes the last) → parts (Space toggles) → fields → wrappers → Check.
- **Free play:** after success, the forge stays live; the child can forge any mould onto a fresh bar and press the printer button (a small drawn printer key) to have the ticket print what they built — a fraction-naming toy with no order.

## 6. The rounds
Units: the bar's `wholeLen`; a 1/b piece is wholeLen ÷ b. Moulds list the denominators of the pieces they make (unlabelled on screen); their left-to-right order is shuffled per mount.

**Pool "halves, thirds, fourths" (10 rounds):**

| # | kind | order | detail | right answer |
|---|---|---|---|---|
| 1 | build | 1/2 | moulds 1/2 · 1/4 · 1/3 | the 1/2 mould, 1 piece |
| 2 | build | 3/4 | moulds 1/4 · 1/2 · 1/3 | 1/4 mould × 3 |
| 3 | name | — | 3 equal parts, 1 filled | 1/3 |
| 4 | shade | 2/3 | 3 equal parts | any 2 parts filled |
| 5 | equal parts | 3/4 | moulds unfair-four · 1/4 · 1/2 | 1/4 mould × 3 |
| 6 | whole | piece 1/3 | wrappers 3 · 4 · 5 pieces long | the 3-piece wrapper (the shortest) |
| 7 | name | — | 4 equal parts, 3 filled | 3/4 |
| 8 | build | 2/3 | moulds 1/3 · 1/4 · 1/2 | 1/3 mould × 2 |
| 9 | whole | piece 1/4 | wrappers 2 · 3 · 4 pieces long | the 4-piece wrapper (the longest) |
| 10 | shade | 1/4 | 4 equal parts | any 1 part |

**Pool "up to eighths" (10 rounds):**

| # | kind | order | detail | right answer |
|---|---|---|---|---|
| 1 | build | 3/4 | moulds 1/4 · 1/6 · 1/8 | 1/4 × 3 |
| 2 | build | 3/8 | moulds 1/8 · 1/4 · 1/6 ("still three pieces — but eighths") | 1/8 × 3 |
| 3 | build | 5/6 | moulds 1/6 · 1/3 · 1/8 | 1/6 × 5 |
| 4 | name | — | 8 equal parts, 1 filled | 1/8 |
| 5 | name | — | 6 equal parts, 5 filled | 5/6 |
| 6 | shade | 3/8 | 8 equal parts | any 3 |
| 7 | shade | 4/6 | 6 equal parts | any 4 |
| 8 | equal parts | 3/4 | moulds unfair-four · 1/4 · 1/8 | 1/4 × 3 |
| 9 | whole | piece 1/6 | wrappers 4 · 6 · 8 pieces long | the 6-piece wrapper (the middle) |
| 10 | whole | piece 1/8 | wrappers 6 · 8 · 10 pieces long | the 8-piece wrapper (the middle) |

**Setting "the bar changes size":** the same 20 rounds with wholeLen per round drawn from {96, 108, 120, 132, 150} (never the same twice running), plus two rounds of the old content added to each pool: **"Forge 2/3 of THIS bar"** (wholeLen 108, moulds 1/3 · 1/6 · 1/2) and **two bars** (small bar 90 already holds 3/4 pre-forged; forge 3/4 on the big bar 144, moulds 1/4 · 1/2; the success line adds "Both are 3/4 — but 3/4 of the big bar is more chocolate."). In this setting the find-the-whole piece is drawn at a different px size every round (a 1/2 piece in one round may be shorter on screen than a 1/4 piece in another).

**Answer position (measured).**
- Build rounds (6, both pools): the right mould's size rank among the three — pool 1: largest (1/2), smallest (3/4), middle (2/3); pool 2: largest (3/4), smallest (3/8), middle (5/6). "Always the smallest mould", "always the largest" and "always the middle" each pick right 2/6 — and every build round also needs the right *number* of presses, so a mould bot alone never completes an order. Equal-parts rounds: the right mould is the smaller fair one in pool 1 and the larger fair one in pool 2. Slot order is shuffled per mount (never the previous slot).
- Name rounds: typed. Shade rounds: any a parts are right (no position).
- Find-the-whole: the right wrapper is the shortest (1), longest (1) and middle (2) of the four rounds; "always the longest" and "always the shortest" each win 1/4, "always the middle" 2/4; wrapper slots shuffled per mount.

**Order:** order-only reshuffle per pass; in pass 1 each pool opens with its round 1 (a plain build) so the forge is learnt before naming.

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: "Choose a mould and pull the lever." / "Tap parts of the bar to fill them." / "Write both numbers." / "Tap a wrapper first."
- **Miss 1 — the self-writing ticket prints what was made:**
  - build: outline copies of the chosen piece tile the rest of the bar (each numbered as it lands); the ticket prints {made top}/{made bottom} beside the order; the wrong number on the printed ticket is coral. Hints: wrong piece size — "Your pieces are {madeUnit}s: {k} of them fill the bar. The order needs pieces that fit the bar {b} times." · right size, wrong count — "Right piece! You forged {a'}. The order needs {a}." · unfair mould — "These pieces are not all the same size, so they can't name a fraction. Use a fair mould." · overhang — "The pieces stick out past the end of the bar."
  - name: the bar counts its parts 1…b along the bottom edge (bottom number) and its chocolate parts 1…a along the top edge (top number). Hint: "Count all the parts for the bottom number, and the chocolate parts for the top."
  - shade: the filled parts number themselves. Hint: "You filled {k} parts. The order says {a}."
  - whole: outline copies of the piece fill the chosen wrapper; too short → the last copy sticks out past the foil; too long → a gap of foil stays. Hint: "{b} copies of this piece make the whole bar — this wrapper holds {k}."
- **Miss 2 — the whole is shown in the piece's units:** build/shade: a ghost ruler of b equal outline parts lies on the bar (grooves drawn), the first a outlined in coral — the child forges/fills to match. Name: the fraction is written under the bar as "{a} out of {b} equal parts", with the a and b as the counted numerals. Whole: a ghost row of b copies of the piece lies above the wrappers so the matching length can be read off. Hint: "One {unit} fits the bar {b} times. {a} of them make {frac}."
- A new move takes the help away until the next Check.
- **Success** → paw-print stamp on the printed ticket, the foil wraps the bar, Pip hops (picture translates 8 px up and back, 300 ms), the ticket flies to the spike. Bubble: build/shade "{frac} — {a} pieces of one {unit} each." · name "Yes! {a} of the {b} equal parts: {frac}." · whole "Yes! {b} pieces of one {unit} make the whole bar." · two bars "Both are 3/4 — but 3/4 of the big bar is more chocolate."

## 8. Settings
1. **Fractions: halves, thirds, fourths · up to eighths.** Visible at rest: the moulds/parts on the first board change (eighth and sixth moulds appear).
2. **The bar: same size · changes size.** Visible at rest: the bar's length differs from round to round (and the two old "of THIS bar" rounds join).

## 9. Words (EN source)
- title (shell): "Pip's Chocolate Forge" · instruction: "Forge pieces of the right size. Pip's ticket writes the fraction you made."
- prompts: seven task lines (§4) · hints: §7 (empty ×4, miss 1 ×9, miss 2 ×1) · celebrations: four · settings: "Fractions", "halves, thirds, fourths", "up to eighths", "The bar", "same size", "changes size".
- aria: mould "Mould {n} of 3" (no size words — size is the task) · lever "Forge a piece" · part "Part {n} of {b}, {chocolate | empty}" · wrapper "Wrapper {n} of 3" · tickets "Order: {fracWords}" / "Your ticket: {fracWords}".
- **Locale traps:** fraction words are a real trap and the old file's per-locale helpers are the starting point: de neuter invariant nouns *ein Drittel, drei Viertel, ein Achtel* — and **"ein Halb" is wrong** (the old de prompt "Gieße ein Halb"): use *ein Halbes* / *eine Hälfte*; fr *un demi / un tiers / trois quarts / trois huitièmes* (tiers invariable); es *un medio, tres cuartos, cinco sextos* (es-MX same); pt *um meio, dois terços, três quartos*; it *un mezzo, due terzi, tre quarti*; nl *een half, twee derde, drie kwart* (nl schools say *driekwart / drie vierde* both; the nl panel chooses); sv *en halv, två tredjedelar, tre fjärdedelar*; da *en halv, to tredjedele, tre fjerdedele*; no *en halv, to tredjedeler, tre firedeler*; fi *puoli/yksi kahdesosa, kaksi kolmasosaa* (partitive after numerals), *kolme neljäsosaa*. The visible fractions are numerals (stacked a/b, never "a/b" with a slash in the apparatus — the stacked form is universal); words appear only in aria and bubbles. The unit noun in bubbles ("one fourth" piece) is authored per locale (de *Viertel-Stück*, fr *morceau d'un quart*, …) — the old per-locale prompts are the base text.

## 10. Sound off, access, phones
- Legible with the sound off: the printed ticket, outline copies, overhangs, gaps and counted parts carry everything.
- Keyboard path in §5; aria-live reads the printed ticket.
- Taps: moulds ≥ 96 × 56, lever 56 × 96 (48 × 80 on phones), bar parts ≥ 37 px wide even in eighths at 300 px (37.5 px) — at 320 px eighths are 34 px wide, so on ≤ 340 px the parts take a taller 56 px hit band; wrappers 48 px tall full width; keypad 48 px.
- Pictures: Pip (forest-creatures/fox) 96 px / 64 px.
- Check above the fold at 360 × 740 and 320 × 640.

## 11. Distinct from
- **New 300 The Spyglass** (batch 40; formerly "The Piece Stamp"): pull out spyglass tubes, each as long as the unit piece, until the far animal comes into focus at exactly one whole — the child BUILDS the whole. Here the whole is never built by the child: the forge prints a name for what was built, and the find-the-whole rounds choose among wrappers, the copies filling only at Check.
- **Premium `fraction-kitchen`** (drag a knife to cut pizza/chocolate/cake, share slices): no cutting here; pieces are chosen by size and forged.
- **Row 108 The One-Piece Stamp** (stamp a glass copy of one piece on every other piece to check equal parts, 1.G.A.3) and **Row 107 The Fair Mobile**: equal-parts checks, not naming a/b.
- **Row 196 (sibling) The Crumb Line:** equivalence and comparison; this is the unit-fraction-and-naming instrument.
- Registry: no built or designed invention prints a fraction from what was built.

## 12. Build plan
- **Core (`FoxForgeCore`, rewritten pure):** `pieceLen(wholeLen, b)` · `tile(wholeLen, pieceLens)` → {b' | null, overlap, gap} (null for unequal or mixed pieces) · `printTicket(state)` → {top, bottom | '?'} · `gradeBuild`, `gradeName`, `gradeShade`, `gradeWhole` · `wrapperFill(pieceLen, wrapperLen)` → {copies, overhang, gap}.
- **Gate (`verify-fox-forge-core.js`, own oracle):** recompute every right answer from (a, b, wholeLen) only; assert in every build round exactly one mould has b' = b; assert the unfair mould never tiles; assert each find-the-whole round has exactly one wrapper of length b·pieceLen; assert wrapper lengths and mould sizes in "changes size" scale with wholeLen; assert the size-rank tallies of §6; assert every name/shade round has 1 ≤ a < b; assert every EN string's fraction equals the model; assert no locale string in name rounds contains the answer (the pt defect class — a test that the prompt template has no {frac} slot in name rounds).
- **Mutations:** printTicket bottom = number of forged pieces · tile accepts the unfair mould · grade accepts any 3 pieces for 3/4 · wrapperFill off by one · shade accepts a + 1 · name accepts swapped fields · "changes size" keeps px size of pieces constant across rounds · remove takes the first piece not the last · mould order not shuffled · a name prompt carrying the answer.
- **Local test:** real lever pulls / mould taps / part taps / wrapper taps for every round, 7 widths, both settings, 11 locales; the printed ticket text compared to the model after each Check.
- **Pictures:** forest-creatures/fox (front-facing; facing irrelevant). **Risks:** eighth parts at 320 px (34 px wide) — the taller hit band covers it. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — a lever, pouring chocolate, a ticket that prints itself, a spike of finished orders.
2. **Teacher on the board?** Yes — the denominator is literally "how many of this piece fill the whole", the numerator "how many you made"; unequal parts cannot be named; the whole is found by fitting copies.
3. **Parent trust?** Calm, one library picture, nothing scored, the old answer-giving pt prompts gone.
4. **The invention:** Pip's ticket writes itself — copies of your piece fill the bar to make the bottom number, your pieces make the top — so you see the fraction you actually forged next to the one ordered.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-checked every fraction: each build round has exactly one mould whose piece fits the bar b times; each find-the-whole round exactly one wrapper of b pieces; name/shade rounds 1 ≤ a < b; denominators stay in the grade-3 set (2, 3, 4, 6, 8).
- **Size-rank bots balanced.** "Always the middle mould" won 3/6 build rounds and "always the shortest wrapper" 2/4 whole rounds. Pool 2 round 1 now offers 1/4 · 1/6 · 1/8 (the right piece is the largest, and "still pieces — but which size?" is sharper with three small moulds), pool 2 round 10 offers wrappers 6 · 8 · 10: every size-rank bot now wins exactly 2/6 build rounds and at most 2/4 whole rounds.
- Distinctness confirmed: New 300 (The Spyglass, also 3.NF.A.1) BUILDS the whole by pulling out tubes; here the whole is chosen among wrappers and the copies appear only at Check — the self-writing ticket is the invention, and it is not in any registry.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
