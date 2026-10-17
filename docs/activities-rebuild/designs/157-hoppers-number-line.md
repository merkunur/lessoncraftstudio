# Row 157 — Hopper's Number Line → THE SPRING AND THE LANDING PAD (2.MD.B.6)

## 0. Identity
- id `hoppers-number-line.jump-sums.2-md-b-6` (frozen) · Grade 2 · CCSS 2.MD.B.6 · Measurement & Data · own files `landing-pad-core.js`, `landing-pad-activity.js`, `landing-pad-activity.html`, `landing-pad-activities.json` (row leaves `hoppers-number-line-activities.json`, emptied to `[]`). Title/intro frozen en..sv (pt mascot name "Saltão" stays); da/no/fi metadata new at build.
- worksheets covered: **G1-116 Count On!**, **G1-117 Count Back!**, **G1-118 Hop Along the Line!**, **G1-119 Hop Back and Subtract**, **G1-294 Dot-to-Dot: Count Back from 20**, **G2-305 Where on the Number Line? 40 to 60**, **G2-310 Where on the Number Line? 60 to 100**, **G3-308 Multiplication Hops**, **G3-310 Hop Down to Zero**.
- the old activity: tap the start, choose ▶/◀, pick a hop-size chip (with two decoy sizes), dial the landing number, "Hop!". Kept: Hopper the frog and his lily-pad world, the story line "Hopper sits on 6 and hops forward 8", all nine old rounds' numbers (6+8, 9+12, 16−6, 24−9, 15+20, 45−20, 30+40, 80−50, 40+30 — re-homed into the levels below), the per-locale story translations for de/fr/es/pt/it/nl/sv, the four parts of the model (start, direction, size, landing). New: the hop size is LOADED as tens and ones into a spring, and the landing is a PREDICTION the child floats on the water — if it is not there, Hopper splashes in.

## 1. The pitch
"Load Hopper's spring with tens and ones, point him the right way, and float a lily pad where you think he'll land — then let go: he hops one arc per coil, and if your pad isn't there, he splashes into the pond."

## 2. Why a child will want it again
- **Hopper is the library frog** (pets/frog, side view), sitting on a row of small round stepping stones across a pond — the stones ARE the number line, equally spaced, some with numbers.
- **The spring**: under the pond sits a coil box. Tapping the big coil button adds a fat "ten" coil, the small button adds a thin "one" coil; the coils stack and squash Hopper's spring visibly lower with each tap — a toy you load.
- **Turning him**: tap Hopper and he turns round with a little hop on the spot (he hops the way his nose points).
- **The landing pad**: one big lily pad floats at the edge of the pond; the child drags it out onto the water and parks it over a stone.
- **Let go** (Check): the spring releases — Hopper hops one long arc for each ten coil and one short arc for each one coil, every arc landing on a stone with a *plip*, the coils un-squashing one by one so the child sees each hop spend one coil. If the pad is under his last landing he lands on it, the pad bobs, a library lotus flower opens beside it and he croaks once. If not — *SPLASH*: he plops into the water, bobs up grinning, and the ripples spread between where he is and where the pad is.
- Splashing is funny, never shameful; children often splash him on purpose once — and then want the pad landing.
- No timer, no score, no streak.

## 3. The skill and the misconception
- **Skill (2.MD.B.6 + the worksheets):** represent sums and differences within 100 as lengths on a number line diagram with equally spaced points — a hop is a length (a number of spaces), forward is add, back is subtract; count on/back from a start; locate numbers on a line that starts at 40 or 60 and labels only some points (G2-305/310); equal hops from 0 as multiplication and equal hops back to 0 as division (G3-308/310).
- **Misconceptions and the pushback:**
  1. **Counting the start stone as "1"** (6 + 8 lands on 13). The spring spends one coil per arc and every arc goes from a stone to the NEXT stone; the first coil already moves him off the start. His real landing is one stone past the child's pad — splash, and the ripples cover exactly one space.
  2. **Wrong direction for take-away.** Hopper only hops the way his nose points; pointed forward on a "hops back" story he sails off the other way — the gap between him and the pad is the size of two hops, obvious.
  3. **Counting a big hop in ones** (or not knowing 12 is 10 + 2). The spring makes the child build 12 as one ten-coil and two one-coils; Hopper's arcs show the jump-ten-then-ones strategy every time.
  4. **Locating a number between labels** (G2-305/310). With labels only every 5 (or every 10), the pad shows no number; the child must count stones from a label. A pad one stone off means a splash one space from it.
  5. **Equal hops** (G3): building 4 × 5 as "hop 4, five times" — the spring reloads the same coils for each hop; for "how many hops of 3 back to 0", too few hops leave him in the water short of the bank, too many and he bounces off the bank.

## 4. The stage (what is on the screen)
At **704 px** (stage 660 × 560):
- **Story ticket** (top, 620 × 64): a paper strip with the story, Nunito 18 px, one line in EN ("Hopper sits on 43. He hops 12 forward. Where does he land?"). Tap = TTS where available.
- **Pond** (620 × 250): a blue water band (drawn), the **stones**: 21 small grey ovals (L1 0–20, L2 windows 40–60 / 60–80 / 80–100), 25 in L3 (0–24), or 11 in the tens line (0–100 by tens); equally spaced; spacing 29 px (21 stones) / 25 px (25) / 58 px (11). Numerals under the stones, Baloo 2 800 16 px, on every stone / every 5th / every 10th (setting). A small "bank" (drawn sand edge) at the left end in L3.
- **Hopper**: pets/frog, 96 px, sitting ON his stone (his feet on its top) — he sits above the row, so the numerals under the stones stay visible; a small coral foot-dot (drawn) on his stone marks exactly which stone he is on, because at 96 px he is wider than three stones. He starts on the far-left bank at round start and the child drags him to the start stone (in L1 with every label shown this takes one drag; in partial labels the child must count to it).
- **Landing pad**: a drawn lily pad (green ellipse 52 × 26 with a notch), parked at the pond's right edge; drag out onto any stone; it snaps under the stone. It shows NO number.
- **Spring box** (under the pond, 300 × 150): Hopper's spring drawn as a vertical coil whose coils fill as you load: fat teal ten-coils (each 14 px tall) and thin coral one-coils (6 px). Two buttons: **[ ⦾ ten ]** drawn as a fat coil icon, **[ ○ one ]** as a thin coil icon (72 × 56 each), and a small **undo coil** button (44 × 44, a curved arrow). The coils themselves are the record (no numeral printed: the child counts coils).
- **Hop count** (L3 only): a row of 1–9 small hop marks under the spring box; tap to set how many times Hopper hops (default 1, hidden in L1/L2).
- **Task line** (22 px): "Put Hopper on his start, load his spring, and float the pad where he'll land."
- Bubble under the pond.

At **360 px**: ticket full width (15 px text, 2 lines); pond 340 × 180 with stones spaced 15.5 px (21) / 13 px (25) / 31 px (11); numerals 12 px on every 5th even when the setting says "every number" (in L1 at 360, every number is shown at 11 px alternating above/below the stones so they never collide); Hopper 64 px; pad 40 × 20 drawn with a 56 × 56 drag handle (the pad has a stem knob sticking up that is the grab point); spring box 330 × 110 with buttons 64 × 52. Check above the 360 × 740 fold; at 320 × 640 the spring box goes beside the coil count in a single 96 px row.

## 5. The hand (every interaction)
- **Drag Hopper** from the bank onto a stone: he snaps onto the nearest stone with a tiny hop (120 ms). Tap a stone with Hopper selected → he hops there. Arrow keys move him one stone.
- **Tap Hopper** (not dragging): he turns round (180 ms flip with a hop). His facing IS the direction.
- **Load**: tap ten → a fat coil drops onto the spring (80 ms squash, low *boing*); tap one → thin coil (higher *boing*); undo removes the top coil. Max 9 ones and 9 tens (the box refuses with a bump past that). On the tens line (L2 rows 10–11, one stone = 10) the one-coil button is drawn shut — a ten-coil is one stone there, and a one-coil would land between stones.
- **Drag the pad** onto a stone; it snaps under the stone with a ripple (100 ms). Arrow keys move it one stone. It can be dragged back to the edge.
- **L3 hop count**: tap a mark → that many marks light.
- **Free play — only between rounds**: after success (and on the first screen before round 1 starts) the "test hop" lily (a 44 px button beside the spring box) is open: the child loads any spring and Hopper hops it for real with no pad and no grading, then returns. **During a round the test lily is closed** (drawn shut, not tappable). (Critic: the first draft kept it open until the pad was placed — so a child could load the spring, test-hop, watch where Hopper lands and only THEN float the pad, which turned the prediction into copying. The only hop inside a round is the graded one.)
- **Undo**: everything until Check.

## 6. The rounds
One round = one story. The child places Hopper on the start, turns him, loads the hop, (L3: sets the count), floats the pad (L3 division: the pad is fixed at the bank — the unknown is the count), presses Check.

**Level 1 — line 0–20, counting on and back** (labels default: every number):

| # | story | load | landing |
|---|---|---|---|
| 1 | Hopper sits on 6. He hops 8 forward. | 8 ones | 14 |
| 2 | Hopper sits on 16. He hops 6 back. | 6 ones | 10 |
| 3 | Hopper sits on 3. He hops 9 forward. | 9 ones | 12 |
| 4 | Hopper sits on 18. He hops 9 back. | 9 ones | 9 |
| 5 | Hopper sits on 11. He hops 7 forward. | 7 ones | 18 |
| 6 | Hopper sits on 14. He hops 8 back. | 8 ones | 6 |
| 7 | Hopper sits on 4. He hops 12 forward. | 1 ten + 2 ones | 16 |
| 8 | Hopper sits on 20. He hops 13 back. | 1 ten + 3 ones | 7 |
| 9 | Hopper sits on 8. He hops 5 forward. | 5 ones | 13 |

**Level 2 — within 100** (decade windows, labels default every 5; the tens line for the last two):

| # | window | story | load | landing |
|---|---|---|---|---|
| 1 | 40–60 | Hopper sits on 43. He hops 12 forward. | 1 ten + 2 | 55 |
| 2 | 40–60 | Hopper sits on 58. He hops 14 back. | 1 ten + 4 | 44 |
| 3 | 60–80 | Hopper sits on 62. He hops 15 forward. | 1 ten + 5 | 77 |
| 4 | 60–80 | Hopper sits on 79. He hops 16 back. | 1 ten + 6 | 63 |
| 5 | 80–100 | Hopper sits on 81. He hops 13 forward. | 1 ten + 3 | 94 |
| 6 | 80–100 | Hopper sits on 97. He hops 11 back. | 1 ten + 1 | 86 |
| 7 | 40–60 | Hopper sits on 47. He hops 9 forward. | 9 ones | 56 |
| 8 | 60–80 | Hopper sits on 76. He hops 8 back. | 8 ones | 68 |
| 9 | 80–100 | Hopper sits on 83. He hops 10 forward. | 1 ten | 93 |
| 10 | tens 0–100 | Hopper sits on 30. He hops 40 forward. | 4 tens | 70 |
| 11 | tens 0–100 | Hopper sits on 80. He hops 50 back. | 5 tens | 30 |

(The old rounds 9+12, 15+20, 45−20, 40+30, 24−9 are covered by these shapes; 30+40 and 80−50 are kept verbatim.)

**Level 3 — equal hops, line 0–24** (labels default every 2):

| # | kind | story | load × count | answer |
|---|---|---|---|---|
| 1 | × | Hopper starts at 0. He makes 4 hops of 3. Where does he land? | 3 ones × 4 | land 12 |
| 2 | ÷ | Hopper is on 12. He hops back 3 at a time. How many hops to the bank? | 3 ones × ? | 4 hops |
| 3 | × | Hopper starts at 0. He makes 5 hops of 4. | 4 × 5 | 20 |
| 4 | ÷ | Hopper is on 20. He hops back 4 at a time. | 4 × ? | 5 |
| 5 | × | Hopper starts at 0. He makes 7 hops of 2. | 2 × 7 | 14 |
| 6 | ÷ | Hopper is on 18. He hops back 6 at a time. | 6 × ? | 3 |
| 7 | × | Hopper starts at 0. He makes 3 hops of 5. | 5 × 3 | 15 |
| 8 | ÷ | Hopper is on 16. He hops back 2 at a time. | 2 × ? | 8 |
| 9 | × | Hopper starts at 0. He makes 3 hops of 6. | 6 × 3 | 18 |
| 10 | ÷ | Hopper is on 24. He hops back 4 at a time. | 4 × ? | 6 |
| 11 | × | Hopper starts at 0. He makes 7 hops of 3. | 3 × 7 | 21 |
| 12 | × | Hopper starts at 0. He makes 6 hops of 4. | 4 × 6 | 24 |

- **Answer position (measured):** no options — the pad is placed on a continuous row of stones. Directions: L1 forward 5 / back 4; L2 forward 6 / back 5. Landings sit in the left half of their line in 3/9 (L1) and 5/11 (L2) rounds; landings on a LABELLED stone (every-5 setting) are only 55, 70, 30 in L2 (3/11), so a child cannot win by parking the pad on printed numbers. Starts in L2 are never on a label except 30 and 80 (tens line). All landings distinct within L1 and within L2's windows. No 0 landing except the bank in L3 division (where 0 is the given target, not the answer). In L3 the × answers are 12, 20, 14, 15, 18, 21, 24 and the ÷ answers 4, 5, 3, 8, 6.
- **Order:** order-only reshuffle per pass within each level; L3 (7 ×, 5 ÷) never puts three rounds of one kind in a row (the reshuffle rejects orders that do).

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss, naming the first missing part: "Put Hopper on the stone he starts on." · "Load his spring." · "Float the lily pad where he'll land." · (L3) "How many hops? Tap the hop marks."
- **Hopper on the wrong start** (graded first): he does not hop; his stone wobbles and the story's start number on the ticket gets a coral underline; the true start stone is NOT ringed (a ring would give the location away). Hint: **"Hopper starts on {start}. Count the stones from {nearestLabel}."** (with every-number labels: "Find {start} on the stones.")
- **Miss 1** (start right): the spring releases and Hopper hops EXACTLY what the child built (their direction, their coils, their count). Wherever he ends: if the pad is there and the build was right → success; if the pad is not there → splash, ripples spread between him and the pad, and each stone between them gets one ripple ring (the distance, shown, not said); if the pad IS there but the build was wrong (a self-consistent wrong model, e.g. 7 ones for "hops 8"), he lands, the pad slowly sinks, and the ticket's hop number gets a coral underline. Hint, by case: wrong direction → **"Hopper hops the way his nose points. Which way does this story go?"** · wrong load → **"Count the coils. Does the spring hold {size}?"** · pad off by the hop → **"Hopper landed {there}. Where is your pad?"** (no numbers: "there" is pointed at by the ripples; the EN string is "Look where Hopper is — and where your pad is.").
- **Miss 2**: dotted ghost arcs from the true start, in the true direction, one per coil of the true load, stop over the true landing stone — but the final stone gets no ring and no number; the child still has to move the pad (or the coils) to where the ghost path ends. Hint: **"Follow the dotted hops, one stone at a time."**
- A new move (Hopper, coil, pad, count) clears the ripples, underlines and ghost arcs.
- **Success**: arcs with *plips*, he lands on the pad, the pad bobs, a flowers/lotus picture opens beside it (96 px / 64 px, 400 ms grow), one croak. Bubble: L1/L2 **"6 + 8 = 14 — Hopper landed on 14!"** / "16 − 6 = 10 — Hopper landed on 10!" · L3 × **"4 hops of 3: 3 + 3 + 3 + 3 = 12. That's 4 × 3 = 12!"** · L3 ÷ **"From 12, hops of 3 reach 0 in 4 hops!"**

## 8. Settings
1. **Line**: within 20 (Level 1) · within 100 (Level 2) · equal hops (Level 3) — the stones, windows and spring change.
2. **Numbers on the stones**: every number · every 5 · only every 10 (L2 default every 5, L1 default every number, L3 default every 2 which this setting replaces with every number / every 5 / ends only). At rest the line visibly loses labels.

## 9. Words
- title: "Hopper's Number Line" (frozen)
- task line: "Put Hopper on his start, load his spring, and float the pad where he'll land."
- prompt: "Where will Hopper land?" (L3 ÷: "How many hops to the bank?")
- stories: as tabled; patterns "Hopper sits on {s}. He hops {n} forward. Where does he land?" · "…He hops {n} back. Where does he land?" · "Hopper starts at 0. He makes {k} hops of {n}. Where does he land?" · "Hopper is on {s}. He hops back {n} at a time. How many hops to the bank?" — authored per locale; the seven existing translations are the starting point (they use "Where does it/he land?" — keep each locale's existing pronoun or the name).
- hints: as in §7, plus "Put Hopper on the stone he starts on." · "Load his spring." · "Float the lily pad where he'll land." · "How many hops? Tap the hop marks."
- celebrations: the four patterns in §7.
- settings: "Line" · "Within 20" · "Within 100" · "Equal hops" · "Numbers on the stones" · "Every number" · "Every 5" · "Every 10"
- aria: "Hopper on {n}" · "Hopper faces forward/back" · "spring: {t} tens, {o} ones" · "lily pad on a stone" (never its number) · "{k} hops"
- **Locale traps:** "forward/back" on a number line is right/left in all 11 locales (all read left-to-right); the existing strings use "nach vorne / zurück", « en avant / en arrière », «hacia adelante/atrás», «para frente/para trás», «avanti/indietro», "vooruit/achteruit", "framåt/bakåt" — keep. pt mascot name is «Saltão» (frozen). The equation lines use "×" (U+00D7) in en/nl/sv/da/no/fi/fr/it/es/pt but de uses "·" for multiplication in Grundschule (Malpunkt) — de celebrations write "4 · 3 = 12". Division as "hops to 0" avoids ":"/"÷" differences entirely. es says «brinca» (MX register, keep), pt-BR «pula». fi needs case on the number: "kivellä 6" style is avoided by writing "Hopper istuu kivellä, jossa on 6" or simply "Hopper on luvun 6 kohdalla" — authored, never templated. No decimals, no money, no dates.

## 10. Sound off, access, phones
- Sound off: the coils, arcs, splash, ripples, sinking pad and ghost arcs carry everything; plips/croaks/boings are decoration; the ticket is on screen.
- Keyboard: Tab → Hopper (arrows move, Space turns) → ten / one / undo → (L3 hop marks) → pad (arrows) → Check.
- Taps: buttons ≥ 64 × 52; pad handle 56 × 56; Hopper 64–96 px; stones are not tap targets on phones (only drag/arrow), because 13–16 px stones cannot be 44 px targets — the drag snap does the precision.
- Pictures: pets/frog 96 / 64 px, flowers/lotus 96 / 64 px.
- Check above both folds.

## 11. Distinct from
- **open-number-line** tool (draw your own jumps on an empty line) — here the line is fixed and equally spaced (2.MD.B.6), the hop is LOADED, and the landing is a prediction tested by a splash.
- **number-line** tool, **#141 Hopper's Lily Hops** (skip-counting fill), **New 205 Hopscotch Court** (a hopper that must turn around to go "before"), **New 252 Washing Line** (bags as lengths) — none has the spring of tens/ones coils or the float-the-pad prediction.
- Built registry: #3 Peek Path (next number), #19 elevator (vertical line) — different skill and mechanic.

## 12. Build plan
- **Core state:** `{round, frogAt:null|int, facing:+1|-1, coils:{t,o}, count:1, padAt:null|int, miss}`; `run()` → list of stops (start, then one stop per coil per hop) and final position; `grade()` → `{ok, kind:'incomplete'|'start'|'direction'|'load'|'count'|'pad', final}`. Truth derived from the story numbers (`start ± size`, `k × n`, `s / n`).
- **Gate truth (verify):** recompute every landing/count; assert each landing lies inside its window; loads decompose the size (tens = ⌊size/10⌋, ones = size mod 10); direction balance within 40–60 % per level; labelled-landing share ≤ 30 % in L2 with every-5 labels; landings distinct per level; L3 × answers ≤ 24 and ÷ counts integer; pets/frog and flowers/lotus present in their JSONs.
- **Mutations:** test-hop open during a round (before the pad is placed); one-coil allowed on the tens line; start stone counted as hop 1; facing ignored (always forward); coils counted as 1 each regardless of size; a self-consistent wrong build accepted; test-hop still enabled after the pad is placed (subsumed by the first mutation); pad shows its number in partial-label mode; L3 count ignored; ÷ round accepts a count that overshoots the bank; labels "every 5" draws every number; reshuffle repeats.
- **Pictures:** pets/frog (side view, faces LEFT — mirrored when facing forward/right, mirroring allowed: no text), flowers/lotus (seen on the flowers contact sheet).
- **Risks:** the 25-stone L3 line at 320 px is 12 px spacing — the drag snap plus an enlarged "lens" (a 3× zoomed strip of the five stones around the pad, shown only while dragging, numerals only where the line has labels) keeps it precise. The lens never shows a number the line doesn't show.
- **Blocked:** nothing.

## 13. The four questions
1. **Choose it again?** Yes — a spring you squash with coils, a frog you turn round, a pad you float, and the splash.
2. **Teacher on the board?** Yes — one model for count on/back, the jump-ten-then-ones strategy, partially labelled lines, and equal hops; the off-by-one error splashes by exactly one stone.
3. **Parent trust?** Library frog and lotus only, drawn stones and coils, numerals as content, nothing scolds.
4. **Invention:** load the hop as tens-and-ones coils and float the landing pad first — Hopper splashes in wherever your prediction isn't.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **The prediction leaked:** the "test hop" was open until the pad was placed, so a child could load the spring, test-hop, see the landing and copy it onto the pad — the whole invention (predict, then let go) collapsed. Test hops now exist only between rounds; the one hop inside a round is the graded one. Mutation added.
- Re-solved every table (script): L1 9 distinct landings, 5 fwd / 4 back; L2 all landings inside their windows, 6 / 5, labelled landings 55, 70, 30 only (3/11); L3 × products and ÷ counts exact.
- The tens line (one stone = 10) now shuts the one-coil button — a one-coil there had no stone to land on.
- L3 "keeps alternating" was impossible with 7 × and 5 ÷: now "never three of one kind in a row".
- A 96 px frog covers three 29 px stones: a drawn foot-dot marks his exact stone; he sits above the row so the numerals stay readable.
