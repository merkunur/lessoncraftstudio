# New 297 — The Spring Grasshopper → THE TAUT STRING: a pattern with one rule is a staircase with equal steps, and a string pulled tight touches every stair only if every step is the same (3.OA.D.9)

## 0. Identity
- **id** `spring-frog.play.3-oa-d-9` · grade 3 · CCSS 3.OA.D.9 · strand Operations & Algebraic Thinking · key `spring-frog` → `spring-frog-core.js`, `spring-frog-activity.js`, `spring-frog-activity.html`, `spring-frog-activities.json`. Scaffold: `node scripts/new-activity.js --num=297`. The page title stays "The Spring Grasshopper" (the grasshopper is the hopper of the end-of-round show; the invention is the string).
- **Worksheets covered:** G3-326 "Crack the Pattern" (growing, steps 3/6/9, ≤ 120, 7 terms, 2–3 blanks) · G3-327 "Going Down!" (shrinking, steps 4/7/11, ≤ 130) · G3-329 "Big Skip Counting" (steps 25/50/100, ≤ 1000). All three are *find the rule, write the missing numbers* on a strip of 7 — this instrument asks exactly that: type the rule, type the blanks.
- New instrument; no old activity. Sibling for the same code: New 295 The Number Machine (input → output rules, G3-328) — different object (unordered pairs through a machine); see §11.

## 1. The pitch
"Every number in the pattern is a stair, and every step of the pattern is the same rise of stair — a pattern with one rule climbs (or comes down) in equal steps, so when you pull the string tight across the stair tops it touches every single one; type a wrong number and its stair pokes up into the string or leaves a gap under it, right where the mistake is."

## 2. Why a child will want it again
- **The bars grow when you type.** A blank is a flat, dashed outline on the floor. Type 22 into it and a wooden stair shoots up to exactly 22's height with a soft "thock" and a 120 ms overshoot-and-settle. Type 220 by mistake and the stair races up out of the frame and shows a jagged broken top — children try silly numbers on purpose just to see the stair crash through the ceiling, and that is fine: the bar is honest about every number.
- **The string is a toy.** A red cord hangs slack between two brass pegs at the stage's left and right walls. Pressing Check *is* pulling the cord: the right peg's handle winds, the cord straightens with a rising "zzzip" and a 6 px vibration that settles in 400 ms (a plucked-string twang). Between rounds the child can pluck it with a finger and it hums. When everything is right, the tight string lies across every stair top like a ruler and **the stair tops glow one after another along it**.
- **It finds the mistake for you, physically.** A stair that is too tall *holds the string up* — the cord bends over it in a visible kink. A stair that is too short leaves a gap, and a plumb bob drops from the string to the stair top so the gap is a hanging line you can see. No message, no red cross: the string just cannot lie straight.
- **The end-of-round show — the grasshopper's climb.** The library grasshopper sits on a start block left of the stairs. When the round is right, it hops onto the first stair and then from top to top — every hop the *same* arc, because every step is the same — and on the last stair it makes one long leap off the end of the row and lands on the next round's start block. On a falling pattern it hops *down*. Children watch for the equal hops; a teacher can say "see? same jump every time — that's the rule".
- **Free play:** between rounds the stairs stay live: type any number into a blank and watch the stair and the string react; pluck the string; tap the grasshopper and it hops along the finished stairs again.

## 3. The skill and the misconception
- **Skill (3.OA.D.9, as the worksheets mean it):** a 7-term arithmetic pattern, growing or shrinking by a constant step, some terms missing; find the rule (+n or −n) and write the missing terms. Steps include ones that are *not* 2, 5 or 10 (3, 4, 6, 7, 8, 9, 11) and the big skip counts 25, 50, 100 up to 1000.
- **Misconception 1 — taking the difference of the first two numbers you can see when they are not neighbours** (in `12 · □ · 20 · 24`, "the rule is +8"). **Pushback:** the rule plate's riser block (§5) is exactly one step tall and is laid on the stairs between the first two *neighbouring* shown numbers — a +8 block on a +4 riser sticks up a whole extra step. And if the child fills the blank with 20 + 8 thinking, the string kinks. The stairs *are* evenly spaced in position, so a blank between 12 and 20 visibly sits halfway up: the picture argues for half of 8.
- **Misconception 2 — adding when the pattern shrinks** (writing 87 + 4 = 91 into a falling row). **Pushback:** in a falling staircase a too-big number makes its stair stick up *above* its left neighbour, the string is lifted into a hump, and the plus plate's riser block points *up* where the stairs go *down*.
- **Misconception 3 — every pattern grows by 1, 2, 5 or 10.** **Pushback:** no small-step round uses 2, 5 or 10 (steps are 3, 4, 6, 7, 8, 9, 11), so the habit fails in every round; and the bot "assume +10 / +5 / +2" solves 0 of 40 rounds (measured, §6).
- **Misconception 4 — "the pattern only continues to the right".** Blanks sit at the *start* in 8 of 40 rounds (rounds 3 and 7 of every table) (`□ · 11 · 17 …`), so the child must run the rule backwards.

## 4. The stage
**At 704 px (stacked; the staircase is the hero, ≥ 70 % of the stage height):**
- **Task line** (≤ 24 px, ≤ 2 lines): **"Find the rule. Type it, then type each missing number."**
- **The staircase frame:** a cream panel 660 × 330 px with a pale grid line every step (no numerals on the grid). Left: the **start block** (96 × 40, a drawn wooden block) with the **grasshopper** on it (`forest-creatures/grasshopper`, 96 px wide, drawn facing left in the library → mirrored with `scaleX(-1)` so it faces the stairs; no text in the picture, mirroring is safe). Then **7 stairs**, pitch 80 px, each 60 px wide, rising from the floor.
- **Stair height:** base = (smallest term − step), so the smallest stair is exactly one step tall and the tallest is seven steps; the step height is 300 / 7 ≈ 42 px. **The floor is NOT zero** — it stands for `base` (e.g. 725 on the 750…900 row), so the floor line carries the standard axis-break mark (two short parallel slashes, 2 px ink, at its left end) and every stair foot shows a small zig-zag cut: the stairs are honest about their *differences* (what the rule is about), never about their whole size — a child is never shown 750 drawn as a seventh of 900. No number is written on the floor. The tallest stair therefore reaches 300 px, leaving a 30 px headroom band for the string's pegs and the broken-top of an absurd number.
- **Shown stairs:** solid honey wood (2 px ink outline), the number **inside the top of the stair** on a white tag (52 × 34, Baloo 2 700, 22 px; 4-digit numbers 18 px).
- **Blank stairs:** a dashed outline flat on the floor (60 × 10) with an empty white tag above it marked by a pulsing teal ring; once typed, it grows to its height in the same wood with the typed number on its tag, the tag edged teal so the child's numbers stay recognisable.
- **The string:** a 3 px coral-red cord, slack at rest (a catenary sagging 40 px below the pegs), pegs = brass discs 16 px on the frame's left and right walls at the headroom band; the right peg has a 44 × 44 winding handle.
- **The rule plate** (left of the keypad, under the frame): a sign toggle 52 × 52 showing **+** or **−** (U+2212), and a number box 84 × 52. The plate's riser block (a 60 px-wide translucent teal block exactly one typed step tall) appears on Check (§5).
- **Keypad:** 0–9 and ⌫ in one row, keys 52 × 52 (11 keys = 612 px), under the rule plate row. **Check** 128 × 52 at the right end of the rule plate row.
- **No words on the apparatus** — numerals, the + / − sign, wood, cord.

**At 360 px:**
- Frame 328 × 230. **No start block at rest** (the grasshopper appears only for the show, at 64 px, then leaves): 7 stairs at pitch 46, 40 px wide; step height 200 / 7 ≈ 28.6 px, so the smallest stair (one step) carries a 26 px tag with 15 px numerals; "1000" at 14 px is 32 px wide — fits the 40 px stair.
- Tap a blank stair (the whole 46 × 230 column is its hit area, ≥ 44 px) to select it; the keypad types into the selected stair. The first blank is selected on round start.
- Rule plate row: sign 48 × 48 + box 72 × 48 + Check 112 × 48 (one row, 248 px). Keypad below: two rows of six (0–5 / 6–9, ⌫), keys 50 × 46.
- **Fold budget 360 × 740:** header 56 + task 52 + frame 230 + gap 12 + rule row 48 + gap 10 + keypad 100 = 508 px. **At 320 × 640:** frame 296 × 210 (pitch 41, stairs 36 px), keys 44 × 44 → 470 px. Check is in the rule row, so it is above both folds.

## 5. The hand
- **Select & type:** tap a blank stair (or its tag); type up to 4 digits; ⌫ erases. On every digit the stair re-grows to the current number in 120 ms (ease-out, 6 % overshoot). A typed number ≤ base draws a 10 px stub with a small downward chevron (honest "too small to stand"); a number that would exceed the frame draws to the ceiling with a jagged top (honest "too big").
- **The rule plate:** tap the sign to flip + / −; tap the box and type the step (up to 3 digits). The plate is *not* applied to the stairs until Check — the child's own numbers are what the string tests.
- **Check = pull the string:** the handle winds (300 ms), the cord straightens through the **guide eyelets** — small brass rings on the tops of the two outermost *shown* stairs (the line through two true terms is the pattern's line). Then, left to right, each stair top is compared with the cord (60 ms per stair): a stair on the line glows teal; a too-tall stair lifts the cord into a kink over its top; a too-short stair gets a plumb bob dropping from the cord to its top. **Minimum visible error:** the comparison is exact (any difference ≠ 0 is off the line), but on big steps the true gap is tiny (one off on a +100 row is 0.4 px; on +25, 1.7 px; on +11, 3.9 px), so a kink or bob is drawn at max(true gap, 12 px) at 704 / max(true gap, 8 px) at 360, and the off stair's tag rim turns coral; above the floor the drawing is to scale, below it the error is still unmistakable. The stair itself always stands at its true height.
- **The riser block** (only if a rule was typed): a translucent teal block one typed-step tall slides along the stair edge from the first *neighbouring* pair of shown stairs; on a true riser it fits flush (a soft click); on a wrong one it sticks up or falls short by the error, and a − plate on a rising row hangs *downwards* from the top.
- **Undo:** any key, sign flip or stair selection after a Check lets the cord go slack again (250 ms) and removes kinks, bobs and the block.
- **Keyboard:** Tab cycles blank stairs → sign → step box → Check; digits type; Backspace erases; ←/→ moves between blanks; Space flips the sign when the sign has focus; Enter = Check.
- **Sound (bonus, never needed):** "thock" on growth (pitch rises with the stair's height), the string's zip and hum, a soft wooden "tok" per glowing stair top; TTS reads the finished row in the 5 voiced locales.

## 6. The rounds
One round = one 7-term pattern with 2–3 blanks; the child types the rule (sign + step) and every blank. Never 0, never negative, never above 130 (small steps) or 1000 (big steps). Blanks at varied positions — never only the last; the first two shown numbers are **not neighbours** in 4 rounds of every level. All 40 rounds written out and measured (`work-42/frog.js`):

**Growing · small steps** (step, row; □ = blank → answers)

| # | row | rule | answers |
|---|---|---|---|
| 1 | 7 · 10 · □ · 16 · 19 · □ · 25 | +3 | 13, 22 |
| 2 | 14 · □ · 22 · 26 · □ · 34 · □ | +4 | 18, 30, 38 |
| 3 | □ · 11 · 17 · □ · 29 · 35 · 41 | +6 | 5, 23 |
| 4 | 19 · 26 · □ · □ · 47 · 54 · □ | +7 | 33, 40, 61 |
| 5 | 11 · □ · 29 · 38 · 47 · □ · 65 | +9 | 20, 56 |
| 6 | 23 · 31 · 39 · 47 · □ · 63 · □ | +8 | 55, 71 |
| 7 | □ · 17 · □ · 39 · 50 · □ · 72 | +11 | 6, 28, 61 |
| 8 | 38 · 41 · 44 · □ · 50 · 53 · □ | +3 | 47, 56 |
| 9 | 9 · □ · □ · 30 · 37 · 44 · 51 | +7 | 16, 23 |
| 10 | 27 · 33 · 39 · 45 · 51 · □ · □ | +6 | 57, 63 |

**Shrinking · small steps**

| # | row | rule | answers |
|---|---|---|---|
| 1 | 95 · 91 · □ · 83 · 79 · □ · 71 | −4 | 87, 75 |
| 2 | 118 · □ · 104 · 97 · □ · 83 · □ | −7 | 111, 90, 76 |
| 3 | □ · 74 · 68 · □ · 56 · 50 · 44 | −6 | 80, 62 |
| 4 | 123 · 112 · □ · □ · 79 · 68 · □ | −11 | 101, 90, 57 |
| 5 | 71 · □ · 65 · 62 · 59 · □ · 53 | −3 | 68, 56 |
| 6 | 102 · 93 · 84 · 75 · □ · 57 · □ | −9 | 66, 48 |
| 7 | □ · 80 · □ · 64 · 56 · □ · 40 | −8 | 88, 72, 48 |
| 8 | 130 · 119 · 108 · □ · 86 · 75 · □ | −11 | 97, 64 |
| 9 | 64 · □ · □ · 52 · 48 · 44 · 40 | −4 | 60, 56 |
| 10 | 99 · 92 · 85 · 78 · 71 · □ · □ | −7 | 64, 57 |

**Growing · 25, 50, 100**

| # | row | rule | answers |
|---|---|---|---|
| 1 | 125 · 150 · □ · 200 · 225 · □ · 275 | +25 | 175, 250 |
| 2 | 150 · □ · 250 · 300 · □ · 400 · □ | +50 | 200, 350, 450 |
| 3 | □ · 330 · 430 · □ · 630 · 730 · 830 | +100 | 230, 530 |
| 4 | 75 · 100 · □ · □ · 175 · 200 · □ | +25 | 125, 150, 225 |
| 5 | 310 · □ · 410 · 460 · 510 · □ · 610 | +50 | 360, 560 |
| 6 | 40 · 140 · 240 · 340 · □ · 540 · □ | +100 | 440, 640 |
| 7 | □ · 450 · □ · 500 · 525 · □ · 575 | +25 | 425, 475, 550 |
| 8 | 260 · 360 · 460 · □ · 660 · 760 · □ | +100 | 560, 860 |
| 9 | 175 · □ · □ · 325 · 375 · 425 · 475 | +50 | 225, 275 |
| 10 | 350 · 375 · 400 · 425 · 450 · □ · □ | +25 | 475, 500 |

**Shrinking · 25, 50, 100**

| # | row | rule | answers |
|---|---|---|---|
| 1 | 900 · 875 · □ · 825 · 800 · □ · 750 | −25 | 850, 775 |
| 2 | 850 · □ · 750 · 700 · □ · 600 · □ | −50 | 800, 650, 550 |
| 3 | □ · 870 · 770 · □ · 570 · 470 · 370 | −100 | 970, 670 |
| 4 | 475 · 450 · □ · □ · 375 · 350 · □ | −25 | 425, 400, 325 |
| 5 | 760 · □ · 660 · 610 · 560 · □ · 460 | −50 | 710, 510 |
| 6 | 880 · 780 · 680 · 580 · □ · 380 · □ | −100 | 480, 280 |
| 7 | □ · 575 · □ · 525 · 500 · □ · 450 | −25 | 600, 550, 475 |
| 8 | 730 · 630 · 530 · □ · 330 · 230 · □ | −100 | 430, 130 |
| 9 | 525 · □ · □ · 375 · 325 · 275 · 225 | −50 | 475, 425 |
| 10 | 1000 · 975 · 950 · 925 · 900 · □ · □ | −25 | 875, 850 |

- **"Both" direction:** the level plays rounds 1, 3, 5, 7, 9 of the growing table and 2, 4, 6, 8, 10 of the shrinking table (same step setting) — 10 rounds, 5 up, 5 down, interleaved by the pass shuffle.
- **Measured (all four tables identical in shape):** blanks by position 1…7 = 2 / 3 / 4 / 3 / 2 / 4 / 5 (every position is blank in ≥ 2 rounds; the last is never the only blank); rounds whose first two shown numbers are not neighbours = 4 of 10; bots solved: *"step = difference of the first two shown numbers"* 6/10 (it fails exactly on the 4 non-neighbour rounds, which is the misconception's footprint), *"+10" / "+5" / "+2"* 0/10, *"add on a falling row"* 0/10. Big-step starts include numbers off the hundreds (40, 230, 260, 310 …) so "the answer ends in 00" fails.
- **Answer position:** answers are typed, so position cannot be tapped; what can leak is *which* stair is blank — spread as measured above — and the stair heights (a blank never has a height until the child types; shown stairs are true heights, which is the pattern's honest picture, not a tell — the child still has to compute the exact number: 23 vs 24 differ by 1/7 of a step).
- **Order:** order-only reshuffle per pass (never the same order twice); the round's content never changes.

## 7. Check, the misses, the success
- **Check with nothing typed** → bubble **"Type the rule first: is it + or −, and how much?"** (no miss). **Rule typed, a blank empty** → the empty stair's ring pulses, **"Type a number for every empty stair."** (no miss).
- **Miss 1 — the string shows where:** the cord is pulled tight through the eyelets; kinks over too-tall stairs, plumb bobs under too-short ones; the riser block shows whether the rule fits a true riser. Shown stairs and right stairs glow teal. Hint EN (chosen by the first problem from the left): kink → **"This stair pushes the string up — its number is too big."** · bob → **"The string doesn't reach this stair — its number is too small."** · rule only → **"Your rule doesn't fit the step between two numbers that stand side by side."**
- **Miss 2 — the steps get their numbers:** a bracket appears on each riser between two *neighbouring* shown stairs with its difference written in it ("+4"); where two shown stairs have a blank between them, one bracket spans both risers and shows the difference with a divider tick in the middle: **"8 = 2 steps"** drawn as "+8" over two half-brackets each marked "?". Hint EN: **"Look at two numbers that stand side by side. How far is one step?"**
- A new key, sign flip or stair tap takes the help away until the next Check.
- **Success:** the cord lies straight, the stair tops glow left to right with rising tones, every riser gets its rule tag ("+6"), and the grasshopper climbs (or descends) the stairs with equal hops and leaps off the end. Bubble EN: **"The rule is {rule}: {row}!"** e.g. "The rule is +6: 5, 11, 17, 23, 29, 35, 41!"

## 8. Settings
1. **Direction:** growing (default) / shrinking / both — changes the staircase's slope at rest.
2. **Steps:** 3 to 11 (default) / 25, 50, 100 — changes the numbers on the stairs at rest.

## 9. Words (EN source)
- title **"The Spring Grasshopper"**
- instruction **"Find the rule. Type it, then type each missing number."**
- hints **"Type the rule first: is it + or −, and how much?"** · **"Type a number for every empty stair."** · **"This stair pushes the string up — its number is too big."** · **"The string doesn't reach this stair — its number is too small."** · **"Your rule doesn't fit the step between two numbers that stand side by side."** · **"Look at two numbers that stand side by side. How far is one step?"**
- celebration **"The rule is {rule}: {row}!"**
- settings **"Direction"**: "growing" / "shrinking" / "both" · **"Steps"**: "3 to 11" / "25, 50, 100"
- aria: frame `"staircase of 7 numbers: {list with 'empty' for blanks}"`; stair `"stair {i}, {n | empty}"`; string `"string: {k} stairs on the line, {j} too tall, {m} too short"`.
- **Locale traps:** (a) **"rule"** is the textbook word, not "law": de *Regel*, fr *règle*, es *regla*, pt *regra*, it *regola*, nl *regel*, sv *regel*, da *regel*, no *regel*, fi *sääntö* (fi needs case in "Your rule doesn't fit…": author the sentence whole). (b) **The minus sign** on the plate and in the celebration is U+2212; the celebration's list separator is ", " in all locales (numbers ≤ 1000 carry **no thousands separator**: "1000", never "1 000" or "1.000"). (c) **"growing / shrinking"** must be the arithmetic register (de *steigend / fallend*, fr *croissante / décroissante*, sv *växande / minskande*, fi *kasvava / pienenevä*), not "getting fat". (d) **"stair"** — the panel picks the natural word for a single step of a staircase (de *Stufe*, fr *marche*, sv *trappsteg*, fi *porras*); never "level". (e) The **celebration's {rule}** is written "+6" / "−7" in every locale (no word for plus).

## 10. Sound off, access, phones
- Sound off: growth, the cord's kink, bobs, the riser block, glowing tops, rule tags and the grasshopper's equal hops are all visible.
- Keyboard path §5; focus ring 3 px teal; aria-live polite on the bubble.
- Taps: stair columns ≥ 46 × 200 px; keys ≥ 44; sign 48; Check 112 × 48.
- Picture: the grasshopper 96 px at 704, 64 px at 360 (only during the show at 360) — floors met.
- Check above the 360 × 740 and 320 × 640 folds (§4 budget).

## 11. Distinct from
- **Row 157 Hopper's spring and landing pad** (load a spring, predict the landing pad) and **Row 141 Flip Pads**: a hopper on a number line with a *given* jump. Here nothing hops until the round is solved; the instrument is the string across bar heights.
- **New 295 The Number Machine** (same code): rule from unordered input/output pairs through a machine. Here the terms are ordered and the rule is a constant difference read as equal steps.
- **New 208 The Marble Stairs** (order sizes; a marble rolls down and sticks where a step goes up): ordering by size, any step sizes. Here the steps must be *equal* and the test is a straight line, not monotonic descent.
- **New 252 Washing Line, New 269 Tick Comb, tools number-line / choral-counting:** skip counting with the step given or labelled. Here the step is the unknown.
- No reuse of a built invention (§ REGISTRY-BUILT).

## 12. Build plan
- **Core state:** `{ start, step, len:7, blanks:[i], typed:{i:n}, rule:{sign, n}|null, sel:i, checks, help }`.
- **Functions:** `term(i) = start + step·i`; `base() = min(terms) − |step|`; `heightOf(v) = (v − base)/|step|` (in step units, clamped to [0.25, 7.6]); `line(i)` = value through the two outermost shown stairs (= term(i) for a true pattern); `stringReport()` → per stair `on | tall | short`; `riserFit(rule)` → `fit | high | low | flipped` against the first neighbouring shown pair; `check()` → `{ok}` | `{miss, first:{kind, i}}`; `celebration()`.
- **Gate's own truth (`verify-spring-frog-core.js`, independent arithmetic):** for every round, typing (answer + 1) into each blank reports that stair off the line with a drawn kink ≥ 12 px; every one of the 40 rows is arithmetic with the stated step; no term ≤ 0, > 130 (small) or > 1000 (big); 2–3 blanks; never only the last; ≥ 4 non-neighbour rounds per table; small steps ∉ {1, 2, 5, 10}; bots (+10, +5, +2, add-on-falling) solve 0; first-two-shown bot fails exactly on the non-neighbour rounds; for every round and every blank, typing answer ± step marks that stair `tall`/`short` and only that stair; the line through the outermost shown stairs equals term(i) at every i; a −step rule on a growing row returns `flipped`.
- **Mutations (each killed):** an off-by-one on a +100 row drawing no visible kink (the 12 px floor removed) · the floor drawn without its axis-break mark · the string anchored on the first two shown stairs instead of the outermost (a non-neighbour round still passes with a wrong blank) · base = smallest term (smallest stair has height 0) · a too-small stair reported `tall` · riser block measured against the first two *shown* stairs instead of the first neighbouring pair · sign ignored in `riserFit` · a 1000 shown with a thousands separator · blanks only at the end in any round · a small-step round with step 10 · same order twice in a pass · the stair grows to the rule's prediction instead of the typed number.
- **Pictures to verify:** `forest-creatures/grasshopper` (seen on the contact sheet: green, side view, head on the LEFT → mirrored to face right; no text).
- **Risks:** 4-digit tags on 40 px phone stairs (sized above); one native check of "rule / stair / growing". Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — stairs that shoot up to any number you type, a string you pluck, and a grasshopper whose equal hops are the reward.
2. **Teacher on the board?** Yes — "a rule means every step is the same" becomes something the whole class can *see*: the string is straight or it isn't, and it points at the stair that is wrong. The non-neighbour rounds and the steps that are not 2/5/10 hit the named misconceptions directly.
3. **Parent trust?** Calm, numbers only, no timer, nothing sold; works on a phone.
4. **Invention:** a pattern drawn as a staircase of number-high stairs, tested by a taut string that touches every stair top only when every step is equal.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-solved all 40 rows with an independent script (`work-c42/c-frog.js`): every row arithmetic, answers right, blanks per position 2/3/4/3/2/4/5 per table, 4 non-neighbour rounds per table, first-two-shown bot 6/10, +10/+5/+2 bots 0/10, no term ≤ 0 or above 130 / 1000, no round with only the last blank. Fixed the false "6 of 40" start-blank count (it is 8).
- **The string could not see the errors the big-step rounds are about:** one off on a +100 row is a 0.4 px kink, on +25 1.7 px — invisible, so "the string finds the mistake" was false on half the levels. The comparison stays exact; the kink/bob now has a 12 px (704) / 8 px (360) visible floor with a coral tag rim, gated and mutation-killed.
- **The stairs lied about size:** the floor is `base`, not 0, so 750 was drawn as a seventh of 900 while the pitch said "a stair as tall as the number". The floor now carries the axis-break mark, the pitch says what is true (equal rise per step), and the stairs are honest about differences only.
- Distinct from designs/157 (a hopper *spends* a given jump on a number line; here the step is the unknown and the test is a straight string over bar heights) and new/269 (counting ticks of 1 from a label; here constant differences of 3–11 and 25/50/100). No collision.
