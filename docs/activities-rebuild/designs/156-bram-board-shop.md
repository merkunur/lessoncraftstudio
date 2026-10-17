# Row 156 — Bram's Board Shop → THE SPIRIT LEVEL (2.MD.B.5)

## 0. Identity
- id `bram-board-shop.length-word-problems.2-md-b-5` (frozen) · Grade 2 · CCSS 2.MD.B.5 · Measurement & Data · own files `spirit-bench-core.js`, `spirit-bench-activity.js`, `spirit-bench-activity.html`, `spirit-bench-activities.json` (row leaves `bram-board-shop-activities.json`, emptied to `[]`). Title/intro frozen en..nl; sv/da/no/fi metadata new at build. Bram stays a name in the title and prose; no beaver is drawn.
- worksheets covered: none mapped (2.MD.B.5 word problems).
- the old activity: an order ticket, tap a length tile, tap a tape segment to place it, mark "?", leave the decoy tile, dial the answer, "Measure it". Kept: the order-ticket story format, all nine story shapes and their numbers' spirit (rope 45 + 20 (now a scarf), board 40 − 15, shelf 60 vs desk 45, plank 50 → 32…), the magnitude decoy board, the proportional tape model ("a drawing of a ruler" as the standard says), the dial. New: the boards are real things on two rails, and the answer is CUT and dropped in, so a wrong number shows itself physically.

## 1. The pitch
"Every length story is two rails that must end together: put the longest length on the top rail and the pieces on the bottom rail, dial the mystery board, and Bram's saw cuts exactly that board and drops it in — the spirit level across the ends only shows its bubble in the middle when the story balances."

## 2. Why a child will want it again
- A wooden workbench with two rails, a rack of three real-looking boards (drawn wood with grain stripes, each with its length burned on its end), a dial, and a big brass spirit level resting at the right-hand end.
- Dragging a board onto a rail makes a solid *thunk*; it slides along to its stop.
- The dial is a two-wheel counter (tens and ones) that clicks like a combination lock.
- **The cut**: Check sends a board out of the saw slot — whir, a puff of sawdust, the new board slides into the empty space exactly as long as the child's number.
- **The spirit level** then lowers across the two rail ends. If they end together it lies flat, its green bubble rolls to the middle and *ding* — the order ticket gets a stamp. If not, it tilts and the bubble runs to the end that is too long. Children love making the bubble sit.
- Success show: the two rails slide together, Bram's shop stamps the order ticket, and the finished job (scarf, shelf, board) slides off to a "done" peg at the side, where finished tickets collect for the session.
- No timer, no score, no streak.

## 3. The skill and the misconception
- **Skill (2.MD.B.5):** add and subtract within 100 to solve length word problems with the unknown in every position (add to, take from, put together/take apart, compare — result, change, start, difference, bigger, smaller), using a drawing of a ruler (the bench) and an equation (the success line).
- **Misconceptions and the pushback:**
  1. **Keyword operation** — "longer" means add, "cut" means subtract, whatever the structure. The decoy board in the rack is exactly the keyword answer (e.g. 65 + 15 = 80 for "the board is 65; it is 15 longer than the plank"). If the child builds with it or dials it, the cut board makes the rails end apart and the level tilts hard.
  2. **Not knowing which length is the whole.** The bench has one rule the child can see and feel: the top rail holds ONE board — the longest length in the story; the bottom rail holds the two pieces end to end. A board in the wrong rail produces a bench whose rails cannot end together with any sensible cut; the level shows it.
  3. **Start-unknown and change-unknown feel impossible** ("Bram cut 20 off; now it is 35 — how long was it?"). The bench makes them the same as every other story: the empty slot can be on the top rail or on the bottom rail; you dial whatever fills it.
  4. **Arithmetic slips** (regrouping errors in Level 2): the cut board is exactly the dialed length, so a slip of 10 shows as a big gap or overhang at the level, a slip of 1 as a small one.

## 4. The stage (what is on the screen)
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At **704 px** (stage 660 × 560):
- **Order ticket** (right column, 230 × 210): paper card, story text Nunito 17 px (≤ 3 lines in EN), one library picture 96 px in its corner naming the job (table §6). Tap = TTS of the story where available.
- **Bench** (left column, 400 × 470): a bench top with
  - **the bench ruler** along its front edge (0–80 Level 1, 0–100 Level 2), ticks every 5, numerals every 10 (16 px), "cm" at the end;
  - **top rail** (one slot) and **bottom rail** (two slots end to end), each 40 px deep, 3 px ink outlines, starting at the bench ruler's zero (a stop block at the left);
  - an empty slot shows as a dashed outline with "?" (the classic tape-diagram blank), sized to scale only AFTER the child has placed the two known boards (before that, the slots are neutral).
  - **Saw slot**: a dark slot at the far left of the bench where cut boards come out.
  - **Spirit level**: a brass bar 34 × 120 px (standing upright) with a horizontal glass vial (green bubble) in its head, parked to the right of the rails. At a test or a Check it slides left and stands against the two rail end-faces, the way a carpenter checks that two boards end flush: ends together → it stands plumb and the bubble sits between its two lines; ends apart → it leans over the step between them (a fixed 6°) and the bubble runs off-centre.
  - **Rack** (under the rails, inside the bench, 380 × 120 — moved here by the critic: drawn at bench scale a 65 cm board is 309 px and a 96 cm decoy 365 px, which never fit the 230 px right column): three boards stacked, each drawn at bench scale (so a 25 board is visibly shorter than a 45), 30 px thick, its length burned in at its left end (Baloo 2 800 18 px, ink `#5A3A1A` on `#E3C38E`). Order of the three boards per round = table §6. Bench scale: 4.75 px/cm on 0–80, 3.8 px/cm on 0–100.
- **Dial** (right column, under the rack): two wheels (tens 0–9, ones 0–9), each 64 × 96 px, with ▲/▼ tap zones of 64 × 48; the number shows in the window at 40 px.
- **Bubble line** under the bench.
- **Task line** (22 px): "Put the boards on the bench, then dial the mystery board."

At **360 px**: stacked — ticket (full width, picture 64 px, text 15 px, max 4 lines), rack as a single row of three boards scaled to the bench (the bench is 330 px wide; 0–80 → 4 px/cm; a 5-cm board is 20 px long, so every board gets a fixed 44 px tall grab tab under its numeral, and the board itself is drawn at scale behind the tab), bench 330 × 220 (rails 34 px), dial 2 wheels 56 × 84 side by side next to the shell's Check. Check above 360 × 740; at 320 × 640 the ticket text drops to 14 px and the picture moves inline left of the text.

## 5. The hand (every interaction)
- **Drag a board** from the rack to a rail slot (or tap the board, then tap the slot). It snaps into the slot within 100 ms (thunk, 160 ms slide to the stop). A placed board can be dragged back to the rack or to another slot. Any slot accepts any board — the bench never refuses; it only tells at Check.
- When two known boards are on the bench, the remaining slot becomes the mystery slot (dashed "?", now sized to fit the space the two boards leave). If that space is zero or negative (a shorter board on the top rail than on the bottom), the slot stays a neutral 60 px "?" and nothing is sized — the bench cannot be built that way, and Check shows it (wrong rail). If the child put two boards on the bottom rail, the top slot is the mystery; if one on top and one at the bottom, the other bottom slot is the mystery.
- **Dial**: tap ▲/▼ (or swipe the wheel); each step clicks (40 ms). The wheel never auto-carries (the child sets tens and ones). Arrow keys on a focused wheel.
- **Undo**: everything until Check; a new move after a miss clears the help.
- **Free play**: the spirit level can be tapped any time to "test" — it lowers and tilts according to the boards currently on the bench (without a cut board it tilts toward whichever rail is longer). This is a real investigative tool, not a hint: it never shows a number.

## 6. The rounds
One round = one order. The rack always holds the two lengths the story gives + one decoy (the keyword answer where it fits the bench, otherwise the "other operation" answer).

**Level 1 — within 80, multiples of 5, bench 0–80** (rack order = slot 1, 2, 3; D = decoy):

| # | shape | story (EN) | rack | answer | top rail · bottom rail | picture |
|---|---|---|---|---|---|---|
| 1 | add to · result ? | Bram's scarf is 25 cm. Grandma knits 20 cm more. How long is the scarf now? | D5, 25, 20 | 45 | ? · 25 + 20 | clothing/scarf |
| 2 | add to · change ? | Bram has a 20 cm board. He glues on another piece. Now it is 35 cm. How long was the piece? | 20, 35, D55 | 15 | 35 · 20 + ? | tools/hammer |
| 3 | add to · start ? | Bram glued 15 cm onto a stick. Now the stick is 40 cm. How long was the stick at first? | 40, D55, 15 | 25 | 40 · ? + 15 | tools/hammer |
| 4 | take from · result ? | A board is 45 cm. Bram saws off 15 cm. How long is the board now? | D60, 15, 45 | 30 | 45 · 15 + ? | tools/handsaw |
| 5 | take from · change ? | Bram has a 35 cm plank. He saws a bit off. Now it is 25 cm. How long was the bit? | 25, D60, 35 | 10 | 35 · 25 + ? | tools/handsaw |
| 6 | take from · start ? | Bram saws 20 cm off a board. Now it is 35 cm. How long was the board before? | 35, 20, D15 | 55 | ? · 35 + 20 | tools/handsaw |
| 7 | take apart · part ? | Bram cuts a 50 cm board into two pieces. One piece is 30 cm. How long is the other piece? | 50, 30, D80 | 20 | 50 · 30 + ? | tools/handsaw |
| 8 | compare · difference ? | Bram's shelf is 55 cm long. His stool is 20 cm long. How much longer is the shelf than the stool? | D75, 55, 20 | 35 | 55 · 20 + ? | furniture/shelf |
| 9 | compare · bigger ? | Bram's stool is 25 cm long. His shelf is 15 cm longer than the stool. How long is the shelf? | 15, D10, 25 | 40 | ? · 25 + 15 | furniture/stool |
| 10 | compare · smaller ? | Bram's board is 65 cm. It is 15 cm longer than his plank. How long is the plank? | 65, 15, D80 | 50 | 65 · 15 + ? | tools/handsaw |
| 11 | put together · total ? | Bram glues a 35 cm board and a 30 cm board end to end. How long is the new board? | 35, D5, 30 | 65 | ? · 35 + 30 | tools/hammer |

**Level 2 — within 100, any numbers, regrouping, bench 0–100:**

| # | shape | story (EN) | rack | answer | top · bottom | picture |
|---|---|---|---|---|---|---|
| 1 | add to · result ? | Bram's scarf is 38 cm. Grandma knits 27 cm more. How long is the scarf now? | 38, D11, 27 | 65 | ? · 38 + 27 | clothing/scarf |
| 2 | add to · change ? | Bram has a 34 cm board. He glues on another piece. Now it is 62 cm. How long was the piece? | D96, 62, 34 | 28 | 62 · 34 + ? | tools/hammer |
| 3 | add to · start ? | Bram glued 26 cm onto a stick. Now the stick is 64 cm. How long was the stick at first? | 26, 64, D90 | 38 | 64 · ? + 26 | tools/hammer |
| 4 | take from · result ? | A board is 52 cm. Bram saws off 35 cm. How long is the board now? | 35, D87, 52 | 17 | 52 · 35 + ? | tools/handsaw |
| 5 | take from · change ? | Bram has a 58 cm plank. He saws a bit off. Now it is 39 cm. How long was the bit? | D97, 39, 58 | 19 | 58 · 39 + ? | tools/handsaw |
| 6 | take from · start ? | Bram saws 27 cm off a board. Now it is 48 cm. How long was the board before? | 48, D21, 27 | 75 | ? · 48 + 27 | tools/handsaw |
| 7 | take apart · part ? | Bram cuts a 61 cm board into two pieces. One piece is 24 cm. How long is the other piece? | 24, 61, D85 | 37 | 61 · 24 + ? | tools/handsaw |
| 8 | compare · difference ? | Bram's shelf is 63 cm long. His stool is 29 cm long. How much longer is the shelf than the stool? | 63, D92, 29 | 34 | 63 · 29 + ? | furniture/shelf |
| 9 | compare · bigger ? | Bram's stool is 47 cm long. His shelf is 36 cm longer than the stool. How long is the shelf? | D11, 47, 36 | 83 | ? · 47 + 36 | furniture/stool |
| 10 | compare · smaller ? | Bram's board is 64 cm. It is 29 cm longer than his plank. How long is the plank? | 29, 64, D93 | 35 | 64 · 29 + ? | tools/handsaw |
| 11 | put together · total ? | Bram glues a 46 cm board and a 39 cm board end to end. How long is the new board? | D7, 46, 39 | 85 | ? · 46 + 39 | tools/hammer |

- **Desk → stool (critic):** furniture/desk is a full office desk with a computer on it; a "20 cm desk" is absurd. furniture/stool (seen on the furniture contact sheet; de Hocker) is a real thing of 20–47 cm.
- **Put together · total (critic):** the first draft had no total-unknown put-together story although the frozen intro promises "glue two boards together" — row 11 in each level.
- Answers are all different within a level (L1: 45,15,25,30,10,55,20,35,40,50,65; L2: 65,28,38,17,19,75,37,34,83,35,85). No length is 0. Every L2 sum/difference regroups (measured).
- **Answer position (measured, critic's script):** the answer is dialed, so there is no option position. The decoy sits in rack slot 1/2/3 = 3/4/4 times (L1) and 4/4/3 (L2). The empty slot is on the top rail in 4/11 rounds per level (result-unknown add, start-unknown take, bigger-unknown compare, total-unknown put together) — exactly where the story's longest length is unknown; it is never on the same rail in more than two consecutive rounds of the reshuffled order (the reshuffle rejects orders that break this). The decoy is never the answer and never equal to a known.
- In the bottom rail the two pieces may go in either order (both slots accept both); the core grades by the rail, not the slot.
- **Order:** order-only reshuffle per pass within each level; the constraint above is checked on each new order.

## 7. Check, the misses, the success
- **Check with nothing done** (fewer than two boards on the bench, or the dial untouched) → hint, no miss: "Put the two boards from the order on the bench." / "Now dial the mystery board."
- **Miss 1**: the cut always happens — the saw slides out a board exactly as long as the dial says and drops it in the mystery slot; the spirit level lowers across the rail ends and tilts; the overhang (or the gap) between the two rail ends is shaded lemon. If the decoy is on the bench, the decoy board additionally gives one wobble. If a known board is on the wrong rail (the top rail holds a board shorter than one on the bottom rail), the top rail's outline flashes once. Hint (one of): **"The bubble is not in the middle — the rails don't end together. Which one is too long?"** · decoy on bench: **"Read the order again — is that board in the story?"** · wrong rail: **"The top rail holds the longest length in the story. Which length is the longest?"**
- **Miss 2**: the bench ruler lights the two rail ends (a coral tick at the top rail's end, a teal tick at the bottom rail's end, each with its numeral bold), and the mystery slot's own start and end on the ruler are bold too. Hint: **"The mystery board starts at {s} and has to reach {e}. Count up from {s} to {e}."** ({s}, {e} are the ruler positions of the empty slot's ends in the CORRECT model — the bench shows the model, the child still counts.) If the model itself is wrong, miss 2 instead slides the known boards to their correct rails (with a soft *thunk* each) and leaves the dial for the child.
- A new move removes the shading, the bold ticks and the slid boards stay where the child moves them.
- **Success**: the level lies flat, bubble to the middle, *ding*; the rails close together; the ticket is stamped and slides to the "done" peg. Bubble line = the equation in the story's own shape, e.g. **"45 − 15 = 30. The board is 30 cm now!"** · "25 + 20 = 45. The scarf is 45 cm now!" · "55 − 20 = 35. The shelf is 35 cm longer!" · "20 + ? = 35, so the piece was 15 cm!" (the change/start-unknown rounds show the equation with the unknown, then its value: "? + 15 = 40, so the stick was 25 cm at first!").

## 8. Settings
1. **Numbers**: within 80, in fives (Level 1) · within 100 (Level 2) — bench ruler and board lengths visibly change.
2. **Bench ruler**: shown (default) · hidden — hidden removes the numbered ruler along the bench edge (boards stay to scale), so the child must compute rather than count up on the ruler. Miss 2 then shows only the rail-end ticks without numerals.

## 9. Words
- title: "Bram's Board Shop" (frozen)
- task line: "Put the boards on the bench, then dial the mystery board."
- prompt: "Dial the mystery board."
- stories: the 22 EN stories in §6 (exact).
- hints: "Put the two boards from the order on the bench." · "Now dial the mystery board." · "The bubble is not in the middle — the rails don't end together. Which one is too long?" · "Read the order again — is that board in the story?" · "The top rail holds the longest length in the story. Which length is the longest?" · "The mystery board starts at {s} and has to reach {e}. Count up from {s} to {e}."
- celebrations (exact EN, one per round):
  - L1: "25 + 20 = 45. The scarf is 45 cm now!" · "20 + ? = 35, so the piece was 15 cm!" · "? + 15 = 40, so the stick was 25 cm at first!" · "45 − 15 = 30. The board is 30 cm now!" · "35 − ? = 25, so the bit was 10 cm!" · "? − 20 = 35, so the board was 55 cm before!" · "50 − 30 = 20. The other piece is 20 cm!" · "55 − 20 = 35. The shelf is 35 cm longer!" · "25 + 15 = 40. The shelf is 40 cm long!" · "65 − 15 = 50. The plank is 50 cm long!" · "35 + 30 = 65. The new board is 65 cm long!"
  - L2: "38 + 27 = 65. The scarf is 65 cm now!" · "34 + ? = 62, so the piece was 28 cm!" · "? + 26 = 64, so the stick was 38 cm at first!" · "52 − 35 = 17. The board is 17 cm now!" · "58 − ? = 39, so the bit was 19 cm!" · "? − 27 = 48, so the board was 75 cm before!" · "61 − 24 = 37. The other piece is 37 cm!" · "63 − 29 = 34. The shelf is 34 cm longer!" · "47 + 36 = 83. The shelf is 83 cm long!" · "64 − 29 = 35. The plank is 35 cm long!" · "46 + 39 = 85. The new board is 85 cm long!"
- settings: "Numbers" · "Within 80, in fives" · "Within 100" · "Bench ruler" · "Shown" · "Hidden"
- aria: "board {n} centimetres" · "top rail" · "bottom rail, left" · "bottom rail, right" · "mystery board" · "tens wheel {d}" · "ones wheel {d}" · "spirit level: level" / "tilted left" / "tilted right"
- **Locale traps:** the stool compare stories: de „Hocker“ m., fr « tabouret » m. vs « étagère » f., es «taburete» m. vs «estante» m., it «sgabello» m. vs «mensola» f., pt «banquinho» m. vs «prateleira» f. — the comparative agrees with the subject noun of each sentence. Stories are authored per locale, never templated (the unknown position must stay; verb tenses for "glued/sawed" differ). Compare sentences: de „Das Regal ist 15 cm länger als der Tisch", fr « 15 cm de plus que » (avoid « plus long que » agreement problems by keeping the noun gender right per noun: l'étagère f., le bureau m., la planche f.), es «15 cm más largo que» (agreement with tabla f. → «más larga»), it «più lunga/lungo», pt «mais comprida/comprido», nl "15 cm langer dan", sv/da/no "15 cm längre/længere/lengre enn/end/än", fi "15 cm pidempi kuin". Keyword traps must survive translation: the compare-smaller story MUST contain the word for "longer" in every locale (that is the trap). Number words are never used — numerals only. Decimal comma irrelevant (whole cm). "cm" identical. fr U+202F before "?" "!".

## 10. Sound off, access, phones
- Sound off: the cut board, the tilt, the bubble, the lemon gap and the bold ticks carry everything; the ticket text is always on screen (TTS optional).
- Keyboard: Tab → rack boards (Enter picks) → slots (Enter drops) → dial wheels (arrows) → level (Enter = test) → Check.
- Board grab targets ≥ 44 × 44 at every width (the 360 tab); slots 44 px tall hit areas; dial zones 64 × 48 / 56 × 42.
- Picture 96 px at 704 / 64 px at 360 (clothing/scarf, tools/hammer, tools/handsaw, furniture/shelf, furniture/stool — all seen on contact sheets and present in their JSONs; the hammer and saw are job icons for "join" and "cut"; camping/rope is drawn in the cache but has NO lcs-pictures label, so the old rope stories became a scarf that grows).
- Check above both folds.

## 11. Distinct from
- **#82 Vet Diagnosis** (bar-model on a vet card), **#24 Story Stage** (each sentence acts), **#155 Snip-Out Tape** (measure two things), **number-balance** tool (a balance for =): here the equality is between two RAILS of length, tested by a spirit level, and the unknown is a board that is physically cut to the dialed length. **#34 Drop-Down Stands** uses a level beam to compare heights of objects; this level tests whether a length equation balances.
- Not in the built registry.

## 12. Build plan
- **Core state:** `{round, slots:{top:null|id, b1:null|id, b2:null|id}, dial:{t,o}, miss}`; `mysterySlot()` = the empty slot once two boards are placed; `railLengths(cut)` → `{top, bottom}`; `grade()` → `{ok, kind:'incomplete'|'decoy'|'wrongRail'|'number', overhang}`. Truth: `answer` is derived from the story numbers by its shape (`whole − part`, `a + b`, `bigger − smaller`, …), never stored as a field.
- **Gate truth (verify):** for each round, solve independently by shape; assert the derived answer equals the tabled answer; the decoy ≠ answer, ≠ knowns, and equals the keyword trap (sum for take-from/compare-smaller/take-apart/change, difference for add-result/compare-bigger/start-take/put-together-total) whenever ≤ bench max; every length ≤ bench max; rack decoy slot counts within 3–4 per level; empty-on-top count = 4 per level; answers distinct within a level; stories contain their numbers in the table order.
- **Mutations:** grade accepts the decoy; grade ignores which rail a board is on; mystery slot sized before two boards are placed (would give the answer by sight in "ruler hidden"); dial auto-carries; cut board drawn at the correct length instead of the dialed one; a story whose answer is stored instead of derived drifts; reshuffle repeats; check-with-nothing counts a miss; level shows flat when rails differ by 1 cm.
- **Risks:** at 360, 0–100 is 3.3 px/cm — a 1 cm overhang is 3 px. Miss shading therefore draws the overhang strip at least 10 px wide with a numeral-free bracket, and the level's tilt is a fixed 6° for any nonzero difference (direction only), so small slips are still visible.
- **Blocked:** nothing.

## 13. The four questions
1. **Choose it again?** Yes — thunking boards, a lock-click dial, a saw that cuts YOUR board and a bubble you want to see in the middle.
2. **Teacher on the board?** Yes — one model (whole on top, pieces below) for all eleven story shapes; the keyword decoy is in every rack; the equation is shown in the story's own shape.
3. **Parent trust?** Calm, drawn wood and five library job pictures, numerals only on the boards, no timer.
4. **Invention:** the mystery board is cut to the number you dial and dropped in, and a spirit level across the two rails tells whether the story balances.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 3→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Re-solved all 22 stories by shape (script): every answer, decoy (= the keyword-operation answer) and regrouping claim holds; decoy rack slots now 3/4/4 and 4/4/3, empty-on-top 4/11 per level.
- Added the missing **put-together · total unknown** story to both levels (the frozen intro promises "glue two boards together"; the first draft had only take-apart).
- **Desk → stool**: furniture/desk is a full office desk with a computer — a 20 cm desk was absurd; furniture/stool is real at 20–47 cm.
- The rack could not physically fit: drawn at bench scale a 65 cm board is 309 px in a 230 px column. The rack now lives under the rails inside the bench.
- The spirit level's physics was impossible as written (a horizontal level "across" two horizontally offset ends): it now stands upright against the two end-faces and leans over the step — how a carpenter actually checks a flush end.
- Defined the mystery slot when the top board is shorter than the bottom one (neutral, unsized), and wrote all 22 celebration lines in exact EN (the draft said "authored per round" and gave none).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
