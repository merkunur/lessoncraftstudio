# New #267 — The One-Digit Box → THE ONE-DIGIT BOXES (2.NBT.B.7)

## 0. Identity
- **id** `carry-chute.play.2-nbt-b-7` · grade 2 · CCSS 2.NBT.B.7 · strand Number & Operations in Base Ten · new files `carry-chute-core.js`, `carry-chute-activity.js`, `carry-chute-activity.html`, `carry-chute-activities.json` (scaffold: `node scripts/new-activity.js --num=267`, then `NEW-RECIPE.md`). Working title **"The One-Digit Box — Column Addition and Subtraction"**; all 11 slugs, titles and intros new (grade 2; the de/sv/nl pages may say *Klasse 2–3 / åk 2–3 / groep 4–5* — the written algorithm sits a year later there, the native reviewer sets it).
- **Worksheets covered:** G2-251, G2-255, G2-256, G2-257, G2-258, G2-259 (column add/subtract, 2- and 3-digit, "one place at a time, start with the ones"), G3-357, G3-359, G3-360, G3-361, G3-362, G3-363 (carrying, borrowing, across zeros, review). **Merged:** grade 3 "The Carry Chute" — it lives on as the **counter lanes** under the paper (§4–5), which move only as the shadow of what the child writes.
- **New instrument** (no old activity). Kept from the coverage review: the one-digit box, the carry hat, the refusing ones box, tapping the digit above to borrow, the across-zero chain, the counter lanes.

## 1. The pitch
"Every answer box under a column holds exactly one digit — type 13 into the ones box and it keeps the 3 and spits the 1 out, and you carry that little 1 up to the next column's hat yourself."

## 2. Why a child will want it again
- **The box has a personality.** It is a little square mouth on squared paper. Type one digit: it gulps it. Type a second: the box is full, so the first digit pops out of its top with a *pip!*, bounces once, and sits on the paper as a small coral tag, waiting to be carried. Children type 13 again just to see it spit.
- **Carrying is a real carry.** Drag the tag up and over to the dashed hat on top of the next column; it lands with a click and becomes a neat small "1". Only then does that column's box open its lid.
- **Borrowing is a real borrow.** In subtraction, a ones box with too little on top keeps its shutter closed (a tiny striped blind). Put a finger on the tens digit above and pull: a little 1 peels off it as it ticks down like a counter (5 → 4, a pencil stroke through the 5), rides your finger, and tucks in front of the ones digit where you drop it — 2 becomes 12 — and the blind rolls up. Carrying pushes a 1 up and left; borrowing pulls a 1 down and right: the same little 1, travelling the other way.
- **The zero that cannot give.** Pull at a 0 and your finger slides off it — it shrugs (a sideways wiggle, nothing to give). The hundreds must give first: pull a 1 off the hundreds onto the 0 and it becomes a 10 — which you can now pull from.
- **Finished sums glow.** When the last box is filled correctly the answer reads itself right to left and the whole sum gets a gold underline on the paper; the paper slides up into a growing stack of solved sheets at the side (a drawn pile, one sheet per round).

## 3. The skill and the misconception
- **Skill:** add and subtract 2- and 3-digit numbers in written columns, one place at a time, **ones first**, writing the carried ten above the next column and the borrowed ten in front of the ones digit — including borrowing across a zero (2.NBT.B.7; the G2/G3 column sheets).
- **Misconception 1 — writing 13 in the ones place / losing the carry:** **pushback:** the instruction asks for each column's *whole* total, and the box physically holds one digit — so typing 13 ejects the 1 as a tag that must go somewhere, and the next column's box stays closed until the tag sits in the hat. The box cannot know a total the child never typed: a child who types only the 3 has kept the ones and dropped the ten, so on Check **that** column (not the next one) is the first wrong column — it is read as "{x} + {y}" with no tag, and miss 2's ten-frame shows a full frame and three more, the ten that never popped out.
- **Misconception 2 — starting at the left:** **pushback:** only the ones box is open at the start; the others have lids (a frosted lid with a tiny hinge). Lids open right to left as each column is done.
- **Misconception 3 — "smaller from bigger" regardless of position** (52 − 27 → 35): **pushback:** when the top digit is smaller, the ones box's blind stays down — no digit can be typed. The only way to open it is to borrow from the tens digit above.
- **Misconception 4 — borrowing from a zero / skipping a zero** (503 − 168): **pushback:** the 0 refuses to tick; the hundreds must tick first, turning the 0 into a 10, which then gives one ten to the ones and becomes 9.
- **Misconception 5 — the carried 1 forgotten when adding the next column:** the hat's "1" sits in plain sight on top of the column; on a wrong tens digit, the miss ladder makes the column count all three of its numbers (§7).

## 4. The stage
**At 704 px (stacked; the paper is the hero):**
- **Task line** (≤ 24 px): see §9.
- **The paper** (600 × 340): squared paper (faint 20 px grid). The sum in big digits, 48 px Baloo 2, one digit per column cell (64 px wide columns), right-aligned; the operator sign (+ or U+2212) left of the second line; a ruled answer line 3 px.
  - **Hats:** a dashed square 30 × 30 above each column's top digit (except the ones), coral dashes. **de:** the hat sits in the *Übertragszeile* — a slim row just above the answer line, under the next column (row 96 §9c); every other locale above the top digit.
  - **Answer boxes:** one per column under the line, 56 × 64, white with a 2.5 px teal outline; closed boxes carry a frosted lid (hinge at the top); a refusing box shows a striped blind.
  - **Borrow marks:** a ticked digit gets a pencil stroke and its new value written small (24 px) above it; the hopped 1 sits small (24 px) at the upper left of the receiving digit.
- **The keypad** (own, docked under the paper): 0–9 and ⌫, keys 52 × 52; it types into the open box.
- **Counter lanes** (help toggle, a 44 px button with a counters icon at the paper's right edge): under the paper, one lane per column (lane 180 × 120 for 3 columns, 270 × 120 for 2), aligned under its column. Each lane holds the column's counters: for addition the top digit's counters (coral) and the bottom digit's (teal) side by side in rows of five; small chutes (drawn funnels) between neighbouring lanes. Hundreds counters are large discs (26 px), tens medium (20 px), ones small (16 px) — size marks the place.
- **Solved stack** (top-right corner, 64 × 64): a pile of drawn paper sheets, one more per solved round.
- **Feedback bubble** under the paper, 18 px. **No words on the apparatus** — digits, signs, boxes and hats only.

**At 360 px:** task line → paper 328 × 260 (digits 40 px, columns 56 px for three columns; boxes 48 × 56; hats 26 × 26) → keypad (keys 44 × 44, two rows of six: 1–6 / 7–9, 0, ⌫) → bubble. Counter lanes, when on, replace the bubble area with lanes 100 × 90 (counters 12 / 15 / 20 px) and the keypad slides up over them while a box is open. Height ≈ 44 + 260 + 100 + 30 + header/Check → Check above the 740 fold; at 320 × 640 digits 36 px, columns 50 px → fits.

## 5. The hand
- **Type into the open box:** first digit → the box gulps it (≤ 100 ms, 120 ms scale-in). A second digit → the box keeps the new digit and **ejects the old one** as a coral tag (pops 24 px up, bounces, 260 ms; *pip*). Typing a third digit ejects again — the box always holds exactly the last digit typed; a second tag replaces the first (only one tag can be waiting).
  - **Typing order is honest:** 1 then 3 → "3" stays, "1" is ejected (right); 3 then 1 → "1" stays, "3" is ejected — the box always holds the last digit typed, and the check (§7) reads what the box holds. ⌫ brings a waiting tag back in.
- **Carry:** drag the tag onto the hat of the next column (or tap the tag: it flies to the only hat it can go to, 300 ms) → it lands, shrinks to a small 1 in the hat. The next column's lid opens only when (a) the current box holds a digit and (b) any ejected tag has been carried. A tag dropped anywhere else floats back to its waiting spot.
- **Subtraction — the blind:** when the open column's top digit (after any borrow marks) is smaller than its bottom digit, the box shows its blind; keypad presses do nothing (a soft dull key sound, the blind shivers).
- **Borrow (a drag, the mirror of the carry):** press the top digit of the column to the left and pull down-right:
  - not 0 → a small coral 1 peels off it (≤ 100 ms) while the digit ticks down (pencil stroke, new digit written small above, 220 ms); the 1 rides the finger and, dropped on the blind column's top digit, tucks in at its upper left (2 → 12, 180 ms); the blind rolls up (200 ms). Dropped anywhere else, the 1 flies back and the digit ticks up again — nothing is half-borrowed.
  - 0 → the finger slides off: a sideways shrug (3 px × 2, 200 ms), nothing peels. Pull from the hundreds digit instead → a 1 peels off it (5 → 4) and must be dropped on the 0 of the tens, which becomes a small **10** written above it; now pull from that 10 → it ticks to 9 and its 1 goes to the ones. Two drags, in the order the written marks are made.
  - A borrow can start only where it is needed: from the digit left of a blind column, or — across a zero — from the hundreds when the tens top is 0 and the ones are blind. Any other top digit gives a gentle no-wiggle. This keeps every mark meaningful.
  - Tapping a borrowable digit (or Enter on it from the keyboard) does the same drag for the child who cannot drag — the assistive path, not the main gesture.
- **Counter lanes (help on):** the lanes are the shadow of the paper. When a tag is ejected, ten counters of that lane gather (180 ms) and slide down the chute into the next lane as one bigger counter, landing as the tag lands in the hat. When a digit ticks down to lend, one counter of that lane slides down the chute the other way and breaks into ten small counters on landing. Across a zero, the break happens twice, lane to lane. The child never moves counters directly — they follow the pencil.
- **Undo:** ⌫ in a box clears its digit (an ejected tag in waiting is pulled back in); a carried hat can be tapped to send the 1 back as a waiting tag (and the next column's lid closes again if its box was empty); a borrow can be undone by tapping the small 1 (it hops back and the digit ticks up again).
- **Keyboard:** digits type; Tab moves focus to the waiting tag (Enter carries it) and to the borrowable digit (Enter borrows); Shift+Tab back.

## 6. The rounds
One round = one written sum. Every result ≥ 24; 3-digit results ≥ 100; no 0 as a count (0 *digits* are content).

**Two digits — add**
- none: 34+25=59 · 52+36=88 · 41+27=68 · 63+24=87 · 26+43=69 · 71+18=89 · 45+32=77 · 13+54=67
- one place (ones carry): 37+46=83 · 28+35=63 · 19+54=73 · 66+27=93 · 48+18=66 · 55+29=84 · 24+36=60 (ones exactly ten → 0) · 17+65=82

**Two digits — take away**
- none: 58−23=35 · 87−45=42 · 69−37=32 · 96−52=44 · 78−16=62 · 45−21=24 · 99−47=52 · 64−33=31
- one place: 52−27=25 · 63−29=34 · 81−46=35 · 74−38=36 · 45−18=27 · 90−34=56 (top ones is 0) · 62−15=47 · 83−57=26

**Three digits — add**
- none: 234+152=386 · 412+365=777 · 523+241=764 · 147+620=767 · 316+213=529 · 650+238=888 · 271+405=676 · 143+532=675
- one place (alternating ones / tens): 247+135=382 (ones) · 452+173=625 (tens) · 368+217=585 (ones) · 361+284=645 (tens) · 529+146=675 (ones) · 384+251=635 (tens) · 618+137=755 (ones) · 270+590=860 (tens)
- two places: 389+247=636 · 478+165=643 · 296+138=434 · 567+258=825 · 349+187=536 · 655+179=834 · 199+302=501 · 186+526=712

**Three digits — take away**
- none: 586−243=343 · 798−465=333 · 659−127=532 · 874−351=523 · 945−632=313 · 768−506=262 · 497−183=314 · 839−418=421
- one place (alternating ones / tens): 452−127=325 (ones) · 634−281=353 (tens) · 781−345=436 (ones) · 915−372=543 (tens) · 563−229=334 (ones) · 728−465=263 (tens) · 846−519=327 (ones) · 507−263=244 (tens, from a 0 tens)
- two places: across a zero — 503−168=335 · 400−156=244 · 702−345=357 · 605−278=327; no zero — 721−345=376 · 832−467=365 · 614−258=356 · 923−457=466

Every table recomputed by script: answers distinct within each table; each "none" table has no carry/borrow, each "one place" exactly one, each "two places" exactly two; the across-zero flag holds for exactly the four marked rounds.

**A pass (8 rounds) is drawn from the tables by the settings:**
| Sums × Size | a pass is |
|---|---|
| add · two digits | 2 none + 6 one place |
| take away · two digits | 2 none + 6 one place |
| both · two digits | 4 add (1 none, 3 one) + 4 take away (1 none, 3 one), alternating, never three of a kind in a row |
| add · three digits | 2 none + 3 one place + 3 two places |
| take away · three digits | 2 none + 3 one place + 3 two places (≥ 2 across a zero) |
| both · three digits | 4 + 4 as above |
Successive passes rotate through the tables so a child sees new sums before any repeats; answers never repeat inside a pass.

- **Answer position:** typed digit by digit — nothing to guess by place. **Measured shortcut bots** (gate recomputes): "smaller digit from bigger" solves 0 of the 24 borrow rounds and all 16 no-borrow rounds (where it is the honest method); "add columns without carrying" 0 of the 24 carry rounds (and all 16 no-carry rounds, honestly); "work left to right" is impossible (lids). The first round of a pass is never a "none" round.
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check** is available once every box holds a digit (before that it is dimmed; pressing it pulses the open box: "Start with the ones box." — no miss).
- **Check with a tag still waiting** → the tag bounces and its hat glows; bubble "Carry the little 1 to its hat." (no miss).
- **Miss 1** (a wrong digit, or a missing carry — a column whose total is ten or more that sent no tag up counts as wrong even when its ones digit is right) → the first wrong column (from the right) lights; its numbers (top, bottom, and the hat's 1 or the borrow marks) each get a small halo in turn (180 ms), and the bubble reads them as a sum. EN **"{x} + {y} + {c} in this column — what do you write?"** (no carry: "{x} + {y}"; subtraction: **"{x} take away {y} in this column."**, with x being the borrowed value, e.g. 12).
- **Miss 2** → beside the column a two-row ten-frame appears holding that column's counters (top digit coral, bottom teal, carried 1 as a third colour; subtraction: the top's counters with the bottom's crossed out), so the child counts the column's own total; the counter lanes switch on for this look if they were off. EN **"Count the column's counters. Ten or more? Keep the ones, carry the ten."** (subtraction: **"Count what is left in the column."**)
- A new keystroke or move takes the help away until the next Check.
- **Success** → the answer digits light right to left (one per 160 ms), the carried 1s and borrow marks flash once, a gold underline draws under the answer, the paper slides onto the solved stack. EN **"{a} + {b} = {c} — one column at a time, ones first!"** · with a carry: **"{a} + {b} = {c} — you carried the ten!"** · borrow: **"{a} − {b} = {c} — you borrowed a ten!"** · across a zero: **"{a} − {b} = {c} — the hundred helped across the zero!"**

## 8. Settings
1. **Sums:** add / take away / both (default both) — the first sum's sign and the hats (add) or the blind-ready columns (take away) at rest.
2. **Size:** two digits (default) / three digits — the paper shows two or three columns at rest.
(The counter lanes are a help button on the stage, not a setting: any child can switch them on at any time.)

## 9. Words (EN source)
- title: **"The One-Digit Box"** · page title (new): **"The One-Digit Box — Column Addition and Subtraction (Grade 2)"**
- instruction: **"One column at a time, starting with the ones. Type the column's whole answer — each box keeps just one digit."**
- prompts: `{a} + {b}` · `{a} − {b}` (the sum itself)
- hints: hintStart **"Start with the ones box."** · hintCarry **"Carry the little 1 to its hat."** · hintColumn **"{x} + {y} + {c} in this column — what do you write?"** / **"{x} + {y} in this column — what do you write?"** / **"{x} take away {y} in this column."** · hintCounters **"Count the column's counters. Ten or more? Keep the ones, carry the ten."** / **"Count what is left in the column."** · hintBlind (bubble when typing into a blind) **"Not enough on top. Ask the digit next door."** · hintZero (bubble on a zero shrug) **"Zero has nothing to give. Try the next digit along."**
- celebrations as §7. settings: **"Sums"**: "add" / "take away" / "both" · **"Size"**: "two digits" / "three digits". Help button aria: **"Show the counters"** / **"Hide the counters"**.
- **Locale traps:**
  - (a) **Where the carry is written:** de in the *Übertragszeile* (above the answer line, under the next column); all others above the top digit (row 96 §9c). Mutation-tested.
  - (b) **Borrow notation:** strike-and-rewrite in all eleven (row 96 §9b). de: *Abziehverfahren mit Entbündeln* — the boxes cannot enact the older *Ergänzungsverfahren mit Erweitern* (a 1 written under the subtrahend), and the de copy never says *borgen / ergänzen*; it says *entbündeln*. fr: the classic French method (*par compensation*: add ten to the top ones AND one to the bottom tens) is a different algorithm — the fr copy uses *casser une dizaine* / *emprunter*, which the boxes enact; the native reviewer confirms that cycle-2 textbooks accept the *cassage* layout. nl: *cijferend* (never *kolomsgewijs*). it: *prestito / cambio*. es-MX: *pedir prestado / llevar*. pt: *empresta / vai um*. sv: *växla / minnessiffra*. da: *låne / mente*. no: *låne / minnetall*. fi: *lainata / muistinumero*.
  - (c) **Signs:** minus U+2212; plus U+002B; no equals sign on the paper (a column sum has a rule, not =).
  - (d) **Digits only on the apparatus** — no number words, so de/nl/da ones-before-tens names never meet the right-to-left order.
  - (e) **Grade placement:** written column subtraction is grade 2 in the US but grade 3 in de/sv/nl/no — the slug and intro of those locales name their own grade (the reviewer decides).

## 10. Sound off, access, phones
- Legible with the sound off: lids, the blind, the ejected tag, the hats, pencil strokes and the ten-frame show everything; *pip*, ticks and clicks are bonus.
- Keyboard path in §5. aria: box **"ones answer, open"**, **"tens answer, closed until the ones are done"**, **"ones answer: not enough on top — borrow from the tens"**; tag **"a carried 1 waiting for the tens hat"**.
- Taps: boxes ≥ 48 × 56, tag 44 px hit circle, hats 44 px hit areas, borrowable digits 44 px hit areas (the digit cell), keypad ≥ 44 px, help button 44 px. No pictures (paper, digits and boxes are the content). Check above the folds (§4).
- Reduced motion: ejection, hop and tick become instant changes with a 150 ms colour flash.

## 11. Distinct from
- **Row 96 Roll-Up Mats:** blocks first, the written strip as their shadow; the tenth well covers the box. Here the **written digits are the apparatus** and the counters (optional) are their shadow — the step after the blocks, which every column worksheet drills.
- **Rows 145 / 146 / 147 (siblings — Trading Scale, Nested Crates, Take-Away Scoop):** blocks with an optional written sum. Here no blocks at all.
- **exchange-machine (tool):** a tap on a column trades automatically and writes the mark. Here nothing is a tap-to-trade: the child types the column total and the box's one-digit capacity ejects the ten, the child drags the carry up and drags the borrowed 1 down, and the counters never move by themselves.
- **Row 141 Flip Pads / Row 148 Glass Stack:** a digit changing in place; no written algorithm.

## 12. Build plan
- **Core state:** `{ op:'+'|'−', size:2|3, a, b, cols:[{top, bot, hat:0|1, borrowedIn:0|10, lentOut:0|1, box:null|digit, lid:'closed'|'open'|'blind'}], tag:null|{fromCol}, lanes:bool }`.
- **Functions:** `typeDigit(d)` → if box empty: fill; else eject old as tag (replacing any waiting tag) · `carry()` (refused unless a tag waits) → next col's hat = 1 · `canOpen(i)` ⇔ box(i−1) filled ∧ no waiting tag · `isBlind(i)` ⇔ op = '−' ∧ effectiveTop(i) < bot(i) · `peel(j)` (refused unless the column right of j is blind, or j is the hundreds with tens top 0 and ones blind; if the effective top(j) = 0 → refused with `'zero'`; else top(j)−1 and a 1 rides the finger) · `drop(target)` (accepted only on col(j−1)'s top digit → its borrowedIn += 10; elsewhere the 1 returns and top(j)+1) · `effectiveTop(i)` = top − lentOut + borrowedIn · `check()` → `{ok, firstWrongCol}` where a column with total ≥ 10 that sent no tag counts as wrong · `nextTask` with the pass rules of §6.
- **Gate's own truth (`verify-carry-chute-core.js`):** a from-scratch column oracle (digit by digit with carries/borrows) gives the expected boxes, hats and marks for all 80 table rounds; a scripted solver using only public functions reaches them; it is impossible to type into a closed box or a blind box (exhaustive over each round's states); `borrow` on a 0 never succeeds; across-zero rounds need exactly two borrow drags in the right order (hundreds → the 0, then the 10 → the ones); a 1 dropped off-target returns and restores the digit; the box never holds two digits; a waiting tag blocks the next lid; every table's carry/borrow classification is re-derived; pass composition holds over 1 000 generated passes (counts, alternation, ≥ 2 across-zero in 3-digit take-away passes, first round never "none", no repeated answers).
- **Mutations:** box keeps two digits · eject keeps the first digit instead of the last · next lid opens with a tag waiting · lids open left to right · blind not shown when top < bottom · blind shown when top ≥ bottom · borrow allowed from a 0 · borrow allowed with no blind · a dropped-off-target 1 kept by the ones · check passes a ones column of 13 typed as 3 with no tag · borrowed 1 not added to the ones (12 shown, 2 used) · lending digit not decreased · de hat drawn above the top digit · counters move without the paper · Check accepted with a waiting tag · same order twice · celebration with the previous round's numbers.
- **Pictures:** none.
- **Risks:** typing order ambiguity (3 then 1 → box 1) is intentional and documented in §5; the gate asserts the eject keeps the *last* digit. Counter lanes at 360 with up to 18 ones counters (9 + 9) → rows of five at 12 px fit 100 × 90. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a box that spits its extra digit, a 0 that shrugs, a digit that ticks down like a counter; the paper pile grows.
2. **Would a teacher put it on the board?** Yes — it is exactly the written method of every column sheet, and the three classic errors (13 in the ones, starting left, smaller-from-bigger) are made physically impossible rather than corrected afterwards; the counters show what the digits mean on demand.
3. **Would a parent trust it?** Calm, digits only, the school's own layout per locale, no timer or score.
4. **The invention in one sentence:** each answer box holds exactly one digit, so a two-digit column total ejects its ten as a tag you must carry up to the next column's hat — and a box with too little on top won't open until you borrow.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- All 80 table sums re-solved by an independent column oracle (`work-c33/verify.js`): every answer right, answers distinct inside every table, every "none" table has no regroup, every "one place" exactly one (three-digit ones/tens alternating as labelled), every "two places" exactly two, the across-zero flag on exactly 503−168, 400−156, 702−345, 605−278. Bots re-measured: smaller-from-bigger right on 0 of the 24 borrow rounds, no-carry right on 0 of the 24 carry rounds.
- **An overclaim fixed:** "the carry cannot be forgotten" was false — a child who types only the 3 of 13 never makes a tag, so the next lid opened and the carry was lost silently. Now the instruction asks for each column's *whole* answer (that is what makes the box eject), and Check counts a column of total ≥ 10 that sent no tag up as the first wrong column, so the ladder lands on the column where the ten was dropped, not one column later.
- **Borrow is now a drag, not a tap** — a 1 peels off the digit on the left and is dropped in front of the short digit, the exact mirror of dragging the carry up. The old tap-a-digit-and-it-trades was the premium exchange-machine's interaction on digits; across a zero it is now two drags in the order the marks are written. The borrow rule also gained its missing across-zero case (the hundreds may lend when the tens top is 0 and the ones are blind — the old rule refused it).
- Notation re-checked against row 96 §9: hat in the de *Übertragszeile*, above the top digit elsewhere; strike-and-rewrite in all eleven; de *entbündeln*, nl *cijferend*; the fr *compensation* method named as a different algorithm.
