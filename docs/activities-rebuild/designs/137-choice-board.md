# Row 137 — Even or Odd? → THE CHIMNEY ROOF: every brick rolls into the lower column of a two-wide tower, so a flat top takes the flat roof (even) and a lone brick needs the chimney roof (odd) (2.OA.C.3)

## 0. Identity
- **id** `choice-board.even-odd.2-oa-c-3` (kept; slugs, titles and intros frozen in all 11 locales) · grade 2 · CCSS 2.OA.C.3 · strand Operations & Algebraic Thinking · own files `chimney-roof-core.js`, `chimney-roof-activity.js`, `chimney-roof-activity.html`, `chimney-roof-activities.json` (the row leaves `choice-board-activities.json`; register the manifest in `frontend/lib/activities.ts MANIFEST_FILES`; 0 lines to `choice-board-core.js` and `lcs-shell.*`).
- **Page intro (frozen):** "Look at each number and tap whether it is even or odd. Aligned to Common Core 2.OA.C.3 — determine whether a group of objects has an odd or even number of members." Kept: every round shows a number and the child decides even or odd — by choosing the roof marked *even* or *odd* (a tap on a roof places it); the group of objects is the tower of bricks.
- **Worksheets it must also cover:** K-016 "Odd or Even?" (pair them up; one left over means odd) and G1-370 "Count the Pictures in Pairs" → the tower itself (pairs = layers) · G1-369 "Can Two Friends Share Fairly?" → the two columns are the two shares · G1-351 "Odd House, Even House" → the two roofs · G2-351 "Write Two Equal Addends" → the equation step · G2-352 "Look at the Ones Box" and G2-218 "Odd Number Hunt" (circle the odd numbers to 99) → the **to 99** setting (tens arrive as finished slabs) · G3-386 "Odd or Even Sum? Decide Without Adding" → **handed to New 296 The Odd Bump** (critic 2026-10-17: sum parity is 3.OA.D.9 and 296 is the instrument built for it — two towers tipping together would have been the same lesson as two bumps locking; this row keeps every 2.OA.C.3 face and nothing of 3.OA.D.9).
- **What the old activity did:** a numeral 1–20 and two text buttons, Even / Odd — a 50 % guess with nothing to look at. **Kept:** the numbers 2–20 (1 is dropped: "1 = 0 + 0 + 1" would put 0 into a counting activity), the prompt meaning, the words even/odd in every locale (`labelEven`/`labelOdd` text reused on the roofs).
- **Merged:** "The Chairlift" (seats of two; tens as full gondolas) — its two ideas live on: a tower layer seats exactly two, and the tens arrive already paired as slabs.

## 1. The pitch
"Pour the bricks into a tower two bricks wide — each brick rolls into the lower side — then roof it: an even number ends flat and takes the flat roof, an odd number leaves one brick sticking up that only the chimney roof can cover; the two columns are the two equal parts, and the chimney is the +1."

## 2. Why a child will want it again
- **Bricks that find their own place.** The tower is a glass shaft two bricks wide with a little V-shaped floor. Tap the brick bag and a brick drops in and *rolls* to whichever side is lower — left, right, left, right — clicking into place. Hold the bag and they pour, *clack-clack-clack*, building layer after layer.
- **Two roofs, real physics.** One roof is a flat plank with a little flag; the other is a stepped roof with a chimney exactly one brick wide. Put the flat roof on a lone brick and it tips like a seesaw and slides off; put the chimney roof on a flat top and its chimney side has nothing to rest on, so it rocks over and slides off. The right roof settles with a solid *tock* and the chimney puffs a little cloud of smoke rings (drawn circles).
- **Slabs for big numbers.** For numbers to 99 the tens arrive as finished slabs — two columns of five, always flat — that thump down as the foundation; only the loose ones are poured on top. Children discover they can call the roof before the ones are even poured.
- **The hunt.** In the to-99 setting four sacks wait on a shelf; the child roofs each one before it is poured, then watches the four houses go up one after another — a little street, some chimneys smoking, some roofs flat. Getting the whole street right on the first pour is the quiet challenge.
- **The earned show:** the roof settles, the house's two columns light up and count themselves up together ("1, 2, 3 … 7" on each side), the chimney brick glows as the "+1", and the equation writes itself under the house.
- **Free play:** after a round, pour any number of bricks (1–20) and try both roofs.

## 3. The skill and the misconception
- **Skill (2.OA.C.3; K-016, G1-351/369/370, G2-218/351/352):** a group has an even number of members when it can be paired off (or shared between two) with none left, odd when one is left; an even number is a sum of two equal addends (n = a + a), an odd one is a + a + 1; for numbers to 99 only the ones decide (every ten pairs off). (The parity of a SUM — G3-386 — is New 296's job.)
- **Misconception 1 — guessing by size or by rote** ("big numbers are even", "15 sounds even"). **Pushback:** the roof is not chosen from a list — it must physically *fit*; the wrong roof falls off. Measured: "bigger half of the range = even" is right 5/9 (chance).
- **Misconception 2 — the tens digit decides** ("30 is odd because 3 is odd", "47 is even because 4 is even"). **Pushback:** the slabs are always flat — the tens never leave a lone brick — so only the poured ones can make a chimney. Measured: in the to-99 rounds the tens digit's parity matches the number's in **17 of 36** (a tens-digit rule is right 47 %, chance).
- **Misconception 3 — an odd number can be shared fairly by cutting the last one** (G1-369). **Pushback:** bricks don't cut; the lone brick needs its own chimney.
- **Misconception 4 — an odd number written as "two equal addends"** (15 = 7 + 8). **Pushback:** the two equation boxes must hold the SAME number and each box counts its own column, so 7 + 8 never passes; the chimney brick clips on as the "+ 1".

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout):**
- **Task line** (≤ 24 px): build — **"Pour {n} bricks. Which roof fits?"** · to 99 — **"The tens are already built. Choose the roof, then pour the ones."**
- **The bag** (top of the left area, 140 × 90): a drawn sack with the numeral **{n}** on a tag (36 px); its face is the pour button.
- **The shaft** (left, 160 × 440): a glass frame, two columns of bricks 72 × 40 (bricks drawn as two-tone rounded blocks in the place colours of the left/right column — left teal, right gold — with a 2 px ink outline), a V-floor; up to 10 layers (20 bricks) = 400 px. In the to-99 setting the foundation zone holds **slabs**: each a compact 2 × 5 brick block (144 × 40 at 704, the five layers drawn as thin lines), up to 9 slabs = 360, with at most 9 loose ones above (5 layers × 40 = 200); the shaft scales to 0.85 when a round needs more (max 9 slabs + 5 layers).
- **The roof rack** (right, 220 × 180): the two roofs side by side, 150 × 70 each, the word **even** on the flat roof and **odd** on the chimney roof (the content words, 22 px, from `labelEven` / `labelOdd`), their left/right order varying by round (§6).
- **The equation strip** (right, under the rack, 260 × 80): **"{n} = [ ] + [ ]"** with a "+ 1" card that appears only after the chimney roof fits; boxes 64 × 56 (digits 34 px); a compact digit strip 0–9 (2 rows of 5 keys, 48 × 44) under it.
- **To-99 setting:** the single bag becomes a **shelf of four bags** (each 110 × 80, numeral 30 px) above the shaft; each bag has a roof seat on top, and the rack's roofs are dragged (or tapped, then a bag tapped) onto the bags. Check pours the bags one after another into the shaft (slabs first, then ones), the bag's roof lands, and the shaft empties for the next (1.2 s per bag). Phones: four bags 76 × 64.
- Vertical budget: task 56 + bag 90 + shaft 440 + gaps 24 = **610** (rack, equation and keys sit in the right column).

**At 360 px (stacked):** task 52 · a row with the bag (100 × 64, numeral 28 px) and the roof rack (two roofs 104 × 52) · the shaft 120 × 300 (bricks 54 × 30; slabs 108 × 30) centred · the equation strip 328 × 64 · digit strip 2 × 5 keys (62 × 44) = 92 · Check 48. Budget: header 56 + 52 + 64 + 300 + 64 + 92 + 48 + gaps 48 = **724 ≤ 740**.
**At 320 px:** bricks 48 × 28 (shaft 280), keys 56 × 44 → **≈ 636 ≤ 640**.
No library pictures: the bricks are the countable things (drawn apparatus, never pictures — 20 pictures in a two-wide tower would break the picture floor).

## 5. The hand
- **Pour:** tap the bag → one brick drops (220 ms) and rolls into the lower column (if equal, the left), with a *clack*; hold ≥ 350 ms → one every 150 ms until the bag is empty. The bag holds exactly n; its tag counts down. First motion within 60 ms. In the to-99 setting the slabs thump in first by themselves (one per 200 ms) when the round starts; the bag then holds only the ones and its tag shows the whole number, never the ones digit alone.
- **Roof:** drag a roof onto the tower top, or tap it (it flies there, 300 ms). A roof dropped on the finished tower **is the verdict** (it acts as Check for the roof decision): it lands and physics decides in 400 ms — fits → *tock*, stays, smoke rings; does not fit → tips 20°, slides off and back to the rack (600 ms) and counts as a miss (§7). There is no free second try, so the choice is a real decision. Before the tower is poured (the *before* setting, and always in to 99) the chosen roof hovers above the shaft — it can still be swapped — and its verdict comes when the child pours (or tips the towers together) and the roof lands.
- **Equation:** digit keys fill the focused box (tap a box to focus); ⌫ deletes. The "+ 1" card is not typed — it clips on with the chimney.
- **Undo:** a hovering roof (before the pour) can be swapped; poured bricks can be sent back by tapping the shaft (they rise into the bag) until a roof lands. After a roof falls, the round continues with the other roof, then the equation.
- **Keyboard:** Tab → bag → roofs → equation boxes → Check; Space pours / places.

## 6. The rounds
**To 10 (build, roof after the tower):** **2, 3, 4, 5, 6, 7, 8, 9, 10** — even 5, odd 4.
**To 20:** **11, 12, 13, 14, 15, 16, 17, 19, 20** — even 4, odd 5.
**To 99** (tens as slabs; roof before the ones pour — G2-218 asks the child to *hunt* the odd ones, so each round holds **four bags** in a row; the child roofs each bag, then the four are poured in turn):

| Round | Bags (left → right) | Even |
|---|---|---|
| 1 | 50 · 49 · 42 · 93 | 2 |
| 2 | 99 · 81 · 44 · 83 | 1 |
| 3 | 88 · 84 · 91 · 30 | 3 |
| 4 | 52 · 75 · 47 · 56 | 2 |
| 5 | 78 · 20 · 65 · 36 | 3 |
| 6 | 69 · 58 · 87 · 35 | 1 |
| 7 | 59 · 38 · 71 · 46 | 2 |
| 8 | 34 · 43 · 40 · 27 | 2 |
| 9 | 37 · 85 · 86 · 82 | 2 |

Measured (`work-34/g137.js`, re-run by the critic in `work-c34`): 18 even / 18 odd; even bags per shelf position **5 / 4 / 4 / 5** (the designer's order had the rightmost bag odd in 7 of 9 shelves — "the last sack is odd" was a 78 % tell; the bags were re-ordered inside their rounds, values unchanged) and no shelf has three same-parity bags in a row; every ones digit 0–9 appears 3–4 times; no round repeats a ones digit; the tens digit agrees with the number's parity in 17/36 (a tens-digit rule is right 47 %); "the number of evens is always 2" is false in 4 of 9 rounds.
- **Equation step** (to 10 and to 20 only; G2-351): after the roof, "{n} = [a] + [a]" (+ 1 with the chimney): e.g. 14 = 7 + 7, 15 = 7 + 7 + 1. The two boxes must hold the same number; unequal boxes (7 + 8) are a miss (§7).
- **Answer position:** the roof rack's order (even roof left / right) is shuffled per round, balanced 50 / 50 per pass and never the same side three rounds running; the right roof is even in 40–60 % of every pass and never three times running; the equation is typed (no position).
- **Order:** order-only reshuffle per pass; the never-three-same-verdict rule is checked after the reshuffle.

## 7. Check, the misses, the success
- **Check before pouring** → "Pour the bricks first." · **no roof** → "Put a roof on the tower." · **roof fits, equation empty** → "Write the two equal columns." (no misses).
- **Miss 1 — wrong roof** (it slides off): the tower's top layer flashes — a flat top glows along its whole width, a lone brick glows alone — **"Look at the top: is every brick paired, or is one alone?"** (to 99: **"The slabs are always flat — look at the ones."**)
- **Miss 2:** the bricks pair up visibly — a thin bracket joins each layer's two bricks, layer by layer from the bottom (120 ms each), the unpaired brick (if any) left without a bracket and ringed — **"Every pair has a partner. Is anyone left over?"**
- **Equation miss 1:** the two columns count themselves up side by side with numerals at their tops; the chimney brick is not counted — **"Each column is one of the equal parts."** **Miss 2:** the box whose number differs from its column shakes and its column's numeral pulses.
- A new move takes the help away until the next Check.
- **Success:** the roof settles with a *tock*, the chimney (if any) puffs smoke rings, the columns count up together, and the equation writes itself (or confirms the child's): **"{n} = {a} + {a}: every brick has a partner. {n} is even."** / **"{n} = {a} + {a} + 1: one brick is left over. {n} is odd."** (to 99: **"The tens are all pairs, and {o} ones leave {one|none} over: {n} is {even|odd}."**)

## 8. Settings
1. **Numbers:** to 10 · to 20 · to 99 — changes the board at rest (one bag over an empty shaft / one bag / a shelf of four sacks over a slab foundation).
2. **Roof:** after the tower · before the tower — the roof is placed on the finished tower, or chosen while the bricks are still in the bag (to 99 is always "before"; the chip greys out there).

## 9. Words (EN source)
- title (frozen) **Even or Odd? — Number Sense for Grade 2** · instruction **"Pour the bricks into the tower and find the roof that fits."**
- prompts, hints, success as in §4 and §7; roof words reuse `labelEven` / `labelOdd`.
- settings **Numbers** — to 10 / to 20 / to 99 · **Roof** — after the tower / before the tower.
- **Locale traps:**
  - The roof words must be the school words for even/odd numbers: de *gerade / ungerade*, fr *pair / impair*, es *par / impar*, it *pari / dispari*, pt *par / ímpar*, nl *even / oneven*, sv *jämnt / udda*, da *lige / ulige*, no *partall / oddetall* (nouns — the roof says "partall", the sentence "{n} er et partall"), fi *parillinen / pariton*. On the roofs the words stand alone (no article, no agreement); in sentences the adjective agrees where needed (sv "talet är jämnt", fr "{n} est pair").
  - "two equal parts": de "zwei gleiche Teile", fr "deux parts égales", fi "kaksi yhtä suurta osaa" (partitive).
  - Numerals only; no number words. Equations use "+" and "=" (universal).
  - "brick" and "roof" in the instruction: de *Stein / Dach*, fr *brique / toit*, es *ladrillo / techo*, it *mattoncino / tetto*, pt *tijolo / telhado*, nl *blokje / dak*, sv *kloss / tak*, da *klods / tag*, no *kloss / tak*, fi *palikka / katto* — LEGO-neutral words for toy bricks.

## 10. Sound off, access, phones
- Legible with the sound off: rolling bricks, a roof that tips off, smoke rings — the physics carries the verdict; sounds are a bonus.
- aria: bag "Pour one — {left} left"; shaft "Tower: {k} layers, {lone|no} brick alone"; roofs "Flat roof, even" / "Chimney roof, odd"; equation boxes "First part" / "Second part".
- Taps: bag ≥ 64 tall, roofs ≥ 104 × 52, keys ≥ 48 × 44.
- No pictures. Check above the fold: 724 at 360 × 740, ≈ 636 at 320 × 640.

## 11. Distinct from
- **Pair Gate** (tool: a parade marches in ranks of two through an arch) and **Doubling Mirror** (tool: close the tray, nine leaves one without a partner) — no tower, no roof test, no slabs, no merging.
- **New 249 The Fair Tug** (doubles and halves on a tug-of-war rope; odd leaves a referee) — doubles/halves fluency; here parity, equal addends, the ones-digit rule and sum parity.
- **New 296 The Odd Bump** (planned, 3.OA.D.9: odd plates carry a bump, two bumps lock flat, tens are flat bars) — **the sum-parity skill (G3-386) belongs to 296 alone; this row never joins two numbers.** Both rows know that tens are always even, but here it is ONE number's parity — finished slabs at the foot of a gravity tower and a roof that must fit; there it is the reason a SUM's parity can be read off the ones plates. (296's old working name "Spare Sock" is retired.)
- **Row 268 The Dealing Tray** (this batch) — dealing into b parts for fractions; no gravity, no roofs.
- **#18 Friendship Bridge** — fair share between two plates of a K quantity; no parity rule.

## 12. Build plan
- **Core state:** `{ setting, n | bags:[…], slabs, ones, columns:[L,R], roof: null | 'flat' | 'chimney', eq:[a,b] }`. Functions: `pour()` (adds to the lower column; ties left), `placeRoof(kind)` → `fits = (L === R) === (kind === 'flat')` (with the odd brick always in the left column), `typeEq(i, d)`, `check()` → `{ ok, kind: 'notPoured' | 'noRoof' | 'roof' | 'eqEmpty' | 'eqUnequal' | 'eqWrong' }`.
- **The gate's own ground truth (`verify-chimney-roof-core.js`):** for any pour order |L − R| ≤ 1 and the lone brick (if any) is left; `fits` ⇔ parity; slabs add 5 to each column; to-99 rounds: 18/18 parity, ones digits spread 3–4, tens-digit rule 17/36, even bags per shelf position 4–5 of 9, no three same-parity bags in a row; roof side balanced 50/50 and never 3 in a row; no 0 or 1 anywhere; equation accepts only a = ⌊n/2⌋ twice.
- **Mutations:** let bricks stack on the higher column · accept the flat roof on a lone brick · let the slabs leave a lone brick when the tens digit is odd · show the ones digit on the bag · make the rightmost sack odd in ≥ 7 of 9 shelves · accept unequal equal-addends · put the even roof always left · allow 1 as a round · allow three same verdicts in a row.
- **Local test:** real pours and roof drags at 320·360·412·704·768·1024·1366, every round, 11 locales; assert the 9-slab + 5-layer tower fits the shaft, roofs never cover the equation strip, Check above the fold.
- **Pictures:** none. **Risks:** a fallen roof is a miss on the first try — the bubble explains it as "Let's look at the top" (no shaming tone); the predict setting is a two-way choice by nature (prediction is the G2-352 task), balanced and measured. Nothing BLOCKED.
- **Current-activity notes:** the old board was a bare two-button choice (Even / Odd in a fixed order) on numbers 1–20 — a child could pass by guessing half the time, and nothing on the screen showed *why* a number is even.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — pouring bricks that roll into place, roofs that slide off when they don't fit, a chimney that puffs, a street of houses to roof.
2. **Would a teacher put it on the board?** Yes — pairing, sharing between two, equal addends and the ones-digit rule are all one picture: a two-wide tower and whether it ends flat.
3. **Would a parent trust it?** Calm, drawn apparatus, the school words for even and odd, no timer.
4. **The invention:** every brick rolls into the lower column, so a number becomes a two-wide tower, and only an even number takes the flat roof — an odd one needs the chimney that covers its lone brick.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 2→5 · reality 5→5
What changed:
- **Collision with New 296 The Odd Bump resolved.** 137's "two numbers" setting (tip one tower into another, two chimney bricks pair up) was the same lesson as 296's two bumps locking flat, for the same worksheet G3-386. Sum parity is handed to 296 alone (3.OA.D.9, its own instrument); 137 drops the setting, its rounds, hints, mutations and claims, and both files say so in §11.
- **Positional tell in the to-99 hunt:** the rightmost of the four sacks was odd in 7 of 9 shelves (a 78 % "the last one is odd" tell). The bags were re-ordered inside their rounds (values unchanged): even bags per position 5/4/4/5, no three same-parity bags in a row (`work-c34`).
- Re-measured: 18 even / 18 odd, every ones digit 3–4 times, the tens-digit rule 17/36.
- New misconception 4 (an odd number written as two "equal" addends, 7 + 8) replaces the removed sum-parity one.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
