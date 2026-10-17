# Row 87 — Addition & Subtraction Pairs → THE RUNG LADDER (1.OA.D.7)

## 0. Identity
- id `match-pairs.addition-and-subtraction-pairs.1-oa-d-7` (KEPT; slugs/metadata frozen in all 11 locales) · grade 1 · CCSS 1.OA.D.7 · Operations & Algebraic Thinking · own files `rung-ladder-core.js`, `rung-ladder-activity.js`, `rung-ladder-activity.html`, `rung-ladder-activities.json` (the row leaves `match-pairs-activities.json`; the id is unchanged; the other match-pairs rows are untouched).
- page title (frozen): "Addition & Subtraction Pairs". Page intro (frozen) stays true: the child works out each card, then matches the addition to the subtraction with the same answer — tap one card, then its match — and the pair links (the two cards become the two rails of ONE ladder); every round has two answers to find (two pairs; three in the bigger rounds).
- worksheets covered: **G1-113** Fact Families · **G1-209** Fact Family Houses · **G1-219** Fact Families to 10 · **G1-220** Fact Family Houses to 20 · **G1-221** Fact House Practice to 10 · **G1-222** Fact Families: Missing Partners (level "Undo it": each addition is paired with the subtraction from the same three numbers that undoes it).
- old activity: 18 rounds of 4 or 6 expression cards (half additions, half subtractions); tap one card, tap its equal-value partner; the pair links; number-free celebration. **Kept:** all 18 card sets (one card changed: "0 + 3" → "2 + 1", same value, no zero), tap-then-tap, the link, two (or three) answers per round. **Added:** the ladder (the link becomes a proof), the equation tag that writes "2 + 3 = 9 − 4", an "Undo it" level for fact families.

## 1. The pitch
"Every card becomes one rail of a ladder with a hole for each one it is worth — the squirrel can only climb all the way to the acorn if both rails are the same height, so a finished ladder IS the equals sign."

## 2. Why a child will want it again (the fun)
- **The rails are built by the sums, in front of you.** An addition's rail is two short rails clicking together end to end (2 holes + 3 holes, a little brass collar at the joint). A subtraction's rail stands up 9 holes tall — then a tiny saw zips through it and the top 4 holes fall off with a clatter. The child watches each expression DO what it says.
- **A squirrel climbs YOUR ladder.** Drag the squirrel up (or tap it): every step it takes drops a rung across the two rails with a wooden "tok", a note higher each time. If one rail ends early, the squirrel's paw reaches into empty air — it stops, wobbles, looks up at the rail that kept going. If the rails are equal, it scrambles onto the gold top rung, grabs the acorn and gives a happy flick of its tail.
- **A rack of finished ladders.** Each finished pair folds into a little ladder tag ("2 + 3 = 9 − 4") and hangs on the rack. After the round the tags swing in turn — the child's own collection of true equations.
- **Free play ("Ladder yard"):** make any two rails with dials (a + b and c − d) and send the squirrel up; find as many partner rails for one card as you can.

## 3. The skill and the misconception
- **Skill (1.OA.D.7):** understand the meaning of the equal sign — two expressions can be equal (2 + 3 = 9 − 4); determine whether equations involving addition and subtraction are true. Fact families (Undo it): three related numbers make additions and subtractions that undo each other (3 + 5 = 8 and 8 − 5 = 3).
- **Misconception 1 — "=" means "the answer comes next", so an equation with an operation on both sides looks wrong:** **Push back:** the finished ladder's tag reads "2 + 3 = 9 − 4" — work on both sides, proved true by two rails the squirrel climbed rung for rung. The equals sign is the finished ladder, not an arrow to an answer.
- **Misconception 2 — matching by surface (same numbers, same look):** "2 + 3" with "3 − 2". **Push back:** the subtraction rail is 1 hole tall; the squirrel takes one step and its paw finds air, while 4 holes of the addition rail stand empty above it.
- **Misconception 3 — miscomputing subtraction (9 − 4 = 6):** **Push back:** the subtraction rail is sawn in front of the child — 9 holes, 4 fall off — and it is exactly as tall as 2 + 3; against a 6-hole rail the squirrel would stop one rung short.
- **Undo it — misconception: any subtraction with the same whole undoes the addition (3 + 5 with 8 − 3):** **Push back:** in Undo it all four rails are 8 holes tall, so height cannot decide — instead each rail is two colours (the first part coral, the second part teal; a subtraction's sawn-off part stays as a hollow teal outline, so you can see what was taken away), and a rung only clicks in where BOTH rails are the same colour. 3 + 5 changes colour after 3 holes; 8 − 3 after 5: the squirrel stops at the 4th rung, a coral hole facing a teal one.

## 4. The stage
Split layout at ≥ 700 px (cards left, ladder yard right); stacked below 700.

**At 704 px (content 672):**
- **Task line** 22 px: "Tap an addition and the subtraction worth the same. Then send the squirrel up!"
- **Cards (left, 380 px):** a 2-column grid of 4 (or 6) cards, each 176 × 96 px, cream with a 3 px rim (teal rim for additions, coral rim for subtractions — the operation is content; positions in the grid are shuffled so additions and subtractions are mixed), expression 36 px Baloo 2 with a true minus "−". A selected card lifts 6 px with a gold rim. Paired cards fade to 30 % and show a tiny ladder icon.
- **Ladder yard (right, 270 × 440):** a cream panel with a grass strip (#CFE3B5, 20 px) at the bottom. When a pair is chosen, two rails stand on the grass 64 px apart: wooden bars 22 px wide (#D9B98A, 2 px ink outline) with round holes (12 px) at 20 px pitch — left rail = the addition, right rail = the subtraction, each with its card's expression on a 20 px header plate at the foot. A subtraction rail is briefly as tall as its starting number (up to 14 holes = 280 px) before the saw; every finished rail is ≤ 10 holes (Undo it to 20: up to 16 holes at 16 px pitch = 256 px; there the sawn part stays as a hollow outline). **The squirrel** (library forest-creatures/squirrel, 96 × 96) sits on the grass at the ladder's foot; **the acorn** (library miscellaneous/acorn, 96 × 96) waits above the ladder and settles on the gold cap rung when the rails are equal. Above the yard, the **ladder rack** (270 × 64) where finished pairs hang as 40 × 60 tags (tag text 16 px).
- **Bubble** under the yard (≤ 2 lines, 18 px). No Check button: the climb is the check (the shell's Check is hidden for this activity; the round completes when all pairs are climbed).

**At 360 px (content 336):** task line 20 px (2 lines) → cards in a 2 × 2 (2 × 3) grid of 160 × 72 px (30 px expressions) → ladder yard 336 × 330 below (rails 18 px wide, holes 10 px at 18 px pitch — 14 holes = 252 px; Undo it 14 px pitch; squirrel and acorn 64 × 64), ladder rack above the yard as a horizontal strip of tags (scrolls if needed) → bubble. The yard's bottom ≈ 700 px at 360 × 740 (6-card rounds: the grid is 3 rows, the yard ≈ 730 — the page scrolls the yard into view when a pair is chosen). At 320 × 640: cards 146 × 64, hole pitch 16 px (Undo it 12 px), squirrel 64 px → the yard's bottom ≈ 620 px for 4-card rounds.

**Pictures (colour themes, verified in the JSONs and on the forest-creatures / miscellaneous contact sheets 2026-10-17):** forest-creatures/squirrel (side view, bushy tail — reads as a climber), miscellaneous/acorn. Never shrunk: 96 px at 704, 64 px at 360. Everything else — cards, rails, holes, rungs, saw, rack — is apparatus geometry.
**Words on the apparatus:** none; expressions only (they are the content).

## 5. The hand
- **Tap a card:** it lifts within 50 ms with a soft tick; tapping it again drops it. Tap a second card: if both are additions or both subtractions, the first drops and the second lifts (no miss). An addition + a subtraction → both cards slide to the yard (300 ms) and shrink into the header plates at the foot of their rails.
- **The rails build** (≈ 1 s): addition a + b — an a-hole rail rises from the grass, then a b-hole rail drops onto it and clicks (a brass collar; Undo it: a coral holes, b teal holes); subtraction c − d — a c-hole rail rises, a small saw zips across it below its top d holes and those holes fall off and roll away (Same answer) / turn into a hollow teal outline that stays (Undo it).
- **Climb:** drag the squirrel upward (it follows the finger within 30 ms, one rung per 20 px of drag), or tap it and it climbs by itself at 220 ms per rung. Each rung height that has a hole on BOTH rails (and, in Undo it, the same colour on both) gets a rung: it slides in from the side with a "tok", the note rising per rung. At the first height that fails — one rail has ended (Same answer) or the colours differ (Undo it) — the squirrel's front paw reaches into air (or bumps the mismatched hole), it stops, wobbles (3 × 60 ms), and the unmatched holes above glow amber.
- **A finished ladder:** both rails end at the same height: a gold cap rung clicks across the top, the acorn drops onto it, the squirrel climbs onto the cap, grabs the acorn and flicks its tail (300 ms); then the ladder folds (rails swing together, 400 ms) into a tag "2 + 3 = 9 − 4" that flies to the rack; the two cards fade in the grid.
- **A stopped climb:** after 1 s the squirrel slides back down, the rungs drop out, the rails sink back into their cards and the cards return to the grid (a miss is counted).
- **Undo a finished pair:** tap a tag on the rack → it unfolds back into its cards (allowed any time before the round completes).
- **Free play "Ladder yard":** two rail blanks with dials (a + b, c − d; values 1–10), climb freely; no misses.

## 6. The rounds
One round = 4 (or 6) cards → 2 (or 3) ladders. The round completes when every card is in a finished ladder.

**Level "Same answer" (default) — 18 rounds** (the old card sets; one card changed):

| # | cards (additions · subtractions) | pairs (value) |
|---|---|---|
| 1 | 2 + 3 · 3 + 4 · 9 − 4 · 9 − 2 | 5, 7 |
| 2 | 1 + 3 · 2 + 6 · 5 − 1 · 10 − 2 | 4, 8 |
| 3 | 1 + 2 · 2 + 4 · 6 − 3 · 8 − 2 | 3, 6 |
| 4 | 4 + 5 · 1 + 4 · 10 − 1 · 7 − 2 | 9, 5 |
| 5 | 1 + 5 · 4 + 6 · 9 − 3 · 12 − 2 | 6, 10 |
| 6 | 2 + 5 · 2 + 2 · 10 − 3 · 7 − 3 | 7, 4 |
| 7 | 2 + 1 · 3 + 5 · 3 + 7 · 5 − 2 · 9 − 1 · 13 − 3 | 3, 8, 10 |
| 8 | 4 + 1 · 3 + 3 · 3 + 6 · 8 − 3 · 10 − 4 · 12 − 3 | 5, 6, 9 |
| 9 | 4 + 4 · 2 + 1 (was 0 + 3) · 12 − 4 · 4 − 1 | 8, 3 |
| 10 | 5 + 5 · 1 + 6 · 13 − 3 · 8 − 1 | 10, 7 |
| 11 | 2 + 7 · 4 + 2 · 11 − 2 · 10 − 4 | 9, 6 |
| 12 | 1 + 3 · 5 + 2 · 6 + 3 · 9 − 5 · 12 − 5 · 13 − 4 | 4, 7, 9 |
| 13 | 8 + 2 · 2 + 3 · 14 − 4 · 6 − 1 | 10, 5 |
| 14 | 1 + 7 · 2 + 4 · 11 − 3 · 7 − 1 | 8, 6 |
| 15 | 1 + 4 · 2 + 6 · 1 + 2 · 10 − 5 · 10 − 2 · 8 − 5 | 5, 8, 3 |
| 16 | 4 + 3 · 4 + 5 · 9 − 2 · 10 − 1 | 7, 9 |
| 17 | 5 + 1 · 6 + 4 · 8 − 2 · 12 − 2 | 6, 10 |
| 18 | 2 + 2 · 3 + 4 · 5 + 4 · 6 − 2 · 10 − 3 · 11 − 2 | 4, 7, 9 |

**Level "Undo it" — 10 rounds** (fact families; each round is ONE family's four facts, so every card has the same whole and only the seam decides):
{3, 5, 8}: 3 + 5 · 5 + 3 · 8 − 5 · 8 − 3 → pairs (3 + 5 ↔ 8 − 5), (5 + 3 ↔ 8 − 3) · {4, 6, 10} · {2, 7, 9} · {1, 6, 7} · {3, 4, 7} · {2, 6, 8} (to 10) · {6, 8, 14} · {7, 9, 16} · {5, 8, 13} · {4, 7, 11} (to 20). No doubles family (it has only two facts). The pair rule: a + b ↔ (a + b) − b (the subtraction that takes away the part that was added last). Each finished ladder's tag reads the two facts, e.g. **"3 + 5 = 8 · 8 − 5 = 3"**.

**One right answer each:** every card has exactly one partner in its round (gate: in Same answer the values in a round are distinct pair by pair; in Undo it the seams differ because a ≠ b). **No zero anywhere** (the old "0 + 3" replaced).
**Answer position:** the grid order is shuffled per round so additions and subtractions are mixed and a partner is never fixed beside or below its card; measured over 10 000 shuffles: a card's partner is its grid neighbour (same row) in ≈ the chance rate (1/3 of 4-card rounds), never more than 40 %. "Match the card with the same first number" scores ≤ 20 % (gate: rounds 1–18 contain such surface traps — 9 − 2 vs 2 + … — computed). "Match the biggest with the biggest" is measured and must fail in ≥ 6 rounds.
**Order:** order-only reshuffle of rounds per pass; never the same order twice; the grid positions are reshuffled every time a round appears.

## 7. Check, the misses, the success
- **Tapping two additions (or two subtractions):** not a miss; bubble: **"Pick one addition and one subtraction."**
- **Miss 1 (a climb stops):** the stop itself is the showing — the squirrel hangs at the last rung, and before the rails sink the unmatched holes glow amber and get small numerals 1…k (how many more one rail has). Bubble: **"The squirrel can't reach the top — one side has {k} more."** (Undo it: **"The colours don't meet — try the other subtraction."**)
- **Miss 2 (a second stop in the round):** every unpaired card shows a ghost rail standing beside it (its holes, dim, no numerals) for 3 s, so the child can compare heights by eye. Bubble: **"Look at the rails. Which are the same height?"** (Undo it: **"Find where the colour changes on each rail."**)
- **A new tap takes the help away.**
- **Success (each ladder):** the squirrel takes the acorn, the ladder folds onto the rack, its tag writes the equation: **"2 + 3 = 9 − 4"**; bubble: **"2 + 3 and 9 − 4 are worth the same!"** **Round complete:** the tags swing in turn, each tag's "=" glints (left to right) and the squirrel runs along the top of the rack once. Bubble: **"Every addition found its subtraction!"** (Undo it: **"One family: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}."**)

## 8. Settings
1. **Pairs:** Same answer / Undo it (default Same answer) — at rest the cards are mixed sums with different answers, or the four facts of one family.
2. **Show rails:** After I choose / On the cards (default After I choose) — On the cards: every card shows its little rail (the holes, unnumbered) beside the expression from the start, a support for children still building the facts; visibly different at rest.

## 9. Words (EN source)
- on-screen title: **The Rung Ladder**
- instruction: **Work out each card. Tap an addition, then the subtraction that is worth the same. They become the two sides of a ladder — the squirrel can only climb to the acorn if both sides are the same height.**
- task line: **Tap an addition and the subtraction worth the same. Then send the squirrel up!**
- task line (Undo it): **Tap an addition and the subtraction that undoes it. Then send the squirrel up!**
- hints: **Pick one addition and one subtraction.** · **The squirrel can't reach the top — one side has {k} more.** · **The colours don't meet — try the other subtraction.** · **Look at the rails. Which are the same height?** · **Find where the colour changes on each rail.**
- success: **{L} and {R} are worth the same!** · **Every addition found its subtraction!** · **One family: {a} + {b}, {b} + {a}, {w} − {b}, {w} − {a}.** · tags: **{L} = {R}** / **{a} + {b} = {w} · {w} − {b} = {a}**
- free play: **Ladder yard**
- settings: **Pairs** — **Same answer** / **Undo it** · **Show rails** — **After I choose** / **On the cards**

**Locale traps:**
- **"Worth the same"** — use the natural school phrase for equal value: de "gleich viel", fr "qui vaut autant / le même résultat", es "que vale lo mismo", pt "que vale o mesmo", it "che vale lo stesso", nl "evenveel", sv "lika mycket", da "lige meget", no "like mye", fi "yhtä paljon".
- **"Undo"** (the inverse): de "Umkehraufgabe" (the school word — "die Umkehraufgabe finden"), nl "de omgekeerde som", fr "l'opération inverse", es "la operación inversa", pt "a operação inversa", it "l'operazione inversa", sv "motsatt räknesätt", da "den omvendte regneopgave", no "omvendt regnestykke", fi "käänteinen lasku". Fact family words as in row 84 (de Rechenhaus/Aufgabenfamilie…).
- **Squirrel / acorn** come from `image-vocabulary.js` labels (aria and instruction only). **"Ladder"** is chrome only: de "Leiter", fr "échelle", es "escalera (de mano)", pt "escada", it "scala", nl "ladder", sv "stege", da "stige", no "stige", fi "tikkaat" (a plural noun — fi agreement "tikkaat ovat"). In hints the rails are "sides": de "Seite", fr "côté", fi "puoli" — never a technical word like Holm/montant.
- **"one side has {k} more"**: fi "toisella puolella on {k} enemmän"; de "eine Seite hat {k} mehr".
- Expressions use the true minus "−" and are identical in every locale.

## 10. Sound off, access, phones
- Legible silent: building the rails, the saw, the rungs appearing, the stop with the paw in the air, and the tags carry everything.
- Keyboard: arrows move between cards, Enter selects; Enter on the squirrel climbs (↑ one rung at a time); Tab to a rack tag + Enter unfolds it.
- aria: cards "9 minus 4"; the result is announced ("The squirrel reached the acorn — 2 plus 3 equals 9 minus 4." / "The squirrel stopped — one side has 1 more."); live region for the tags.
- Taps: cards ≥ 146 × 64; the squirrel is the drag handle (≥ 64 px); tags 40 × 60.
- Reduced motion: rails appear complete; the squirrel moves to its final rung in one step with a fade.

## 11. Distinct from
- **Row 68 The Story Zipper (RL.K.9, designed):** the first draft of this row was a zipper — the critic replaced it, because a chunky zipper "zzzip" is already that row's toy. Here the object is a ladder whose rails are BUILT by the operations, and a climber who needs a rung on both sides at every height.
- **Row 27 The Two-Ended Lantern String (K.OA.A.3):** two numbers light one fixed string from both ends to make a target. Here there is no target — two expressions are compared with each other, and each rail is constructed by its operation (joined or sawn).
- **Row 88 Numbers Court (this batch):** rules one claim TRUE/FALSE on the equal-sign beam (weight and tilt); here the child SEARCHES for equal partners, and equality is rung-for-rung correspondence, not a balance.
- **Row 84 The Turning Domino (this batch):** one object generates a family's four facts; here the facts are separate cards and the child finds the inverse partner of each.
- **#17 Partner Bows / #20 Block Towers:** compare two groups or two towers of one number; here each side is an EXPRESSION whose rail is built by adding or sawing off.
- **number-balance (tool):** both sides on a beam, level = same. No balance here.

## 12. Build plan
- **Core state:** `{ level, showRails, order[], idx, round:{cards:[{id, kind:'add'|'sub', a, b}]}, grid:[cardId], selected:null|id, climbed:[[addId, subId]], misses, help }`.
- **Functions:** `value(card)` (a + b / a − b), `rail(card, level)` → holes array (Same answer: n holes of one kind; Undo it: [a coral, b teal] for a + b, [(w − d) coral, d hollow teal] for w − d), `climb(addId, subId)` → `{done, rungs, open:k, side}`, `select(id)`, `unfold(pairIdx)`, `partnerOf(id)`, `roundDone()`, `nextTask(index)`.
- **Gate `verify-rung-ladder-core.js` (own oracle):** (1) every card's value recomputed; no card has a 0 operand; every subtraction ≥ 1; (2) in every Same answer round each addition has exactly one subtraction of equal value; (3) `climb` finishes iff values equal (Same answer) / iff the colour-change heights match (Undo it), and otherwise reports rungs = the first failing height − 1 and open = |difference| (or the seam index) — for all add × sub pairs of every round; (4) Undo it rounds: four cards of one family, a ≠ b, all rails the same height w, pairs a + b ↔ w − b; (5) answer-position: partner-is-row-neighbour ≤ 40 % over 10 000 shuffles; "same first number" ≤ 20 %; "biggest with biggest" fails in ≥ 6 rounds; (6) the round completes only when all cards are in finished ladders; (7) the tag text equals "{add} = {sub}" for each finished ladder; (8) round order never repeats a pass; (9) forest-creatures/squirrel and miscellaneous/acorn exist in their colour theme JSONs.
- **Mutations:** a ladder finishes on unequal values; Undo it ignores the colours (height only); a subtraction's sawn holes stay (Same answer); a round with two partners for one card; "0 + 3" restored; grid not reshuffled on reappearance; tag writes the addition's answer instead of the subtraction expression; two additions can be climbed; a stopped climb does not count a miss; round completes with a card left.
- **Pictures:** forest-creatures/squirrel, miscellaneous/acorn (contact sheets seen). **Risks:** the tallest rails — a 14-hole subtraction before sawing and 16 holes in Undo it to 20 (16 px pitch at 704, 12 px at 320 — `visual-qa-activity.js` measures holes ≥ 10 px and the squirrel handle ≥ 44 px); the shell's hidden Check (the activity completes through `roundDone()` — the shell contract with `answerType:'state'` is kept). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — rails that click together and get sawn in front of them, a squirrel that climbs their own ladder to an acorn (or gets stuck with a paw in the air), and a rack of finished ladders to collect.
2. **Would a teacher put it on the board?** Yes — "can the squirrel climb 2 + 3 and 9 − 4?" makes the relational equal sign concrete, the tag writes the equation with work on both sides, and Undo it shows why 3 + 5 goes with 8 − 5 and not 8 − 3.
3. **Would a parent trust it?** Clean apparatus, two library pictures, no score or timer, mistakes show "one side has 1 more" instead of a cross.
4. **The invention:** each expression builds one rail of a ladder (joined for adding, sawn off for taking away), and the squirrel reaches the acorn only if both rails are the same height — the finished ladder is the equals sign.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 3→5 · reality 5→5
What changed:
- **Replaced the zipper.** Row 68 (The Story Zipper, RL.K.9, designed in another batch) already owns the chunky-zipper toy — its fun section was nearly word for word this one's. The equal-value mechanic is kept intact (rails built by the operations: joined for +, sawn off for −; one-to-one correspondence; the two-colour seam for Undo it), but the object is now a ladder with a library squirrel climbing to a library acorn: a character who climbs the child's own proof, gets stuck with a paw in the air when the sides differ, and collects the acorn on success. Every section (stage, hand, misses, words, locale traps, gate, mutations) rewritten for the ladder.
- Re-computed all 18 Same-answer card sets with my own oracle: each addition has exactly one equal subtraction, no value repeats within a round, values 3–10 are spread (4–6 cards each across the level), the tallest pre-saw rail is 14 holes (13 − 3, 14 − 4); sizes set for 704 / 360 / 320.
- Undo it: confirmed every family has a ≠ b and all four rails are the same height, so only the colour seam decides; the pairing rule (a + b ↔ w − b) is stated and gated. Honest note: the partner always ends in the same number — that IS the inverse — and the seam shows WHY.
