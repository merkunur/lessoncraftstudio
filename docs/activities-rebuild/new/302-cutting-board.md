# New 302 — The Sunny Blinds: more slats means thinner slats, and the sun shows which window lets in more (3.NF.A.3.d)

> The working title was "The Cutting Board". A knife that cuts a bar into b pieces is the premium tool **fraction-kitchen**'s own interaction ("drag a knife to really cut"), so the invention is replaced. The planned key and files stay `cutting-board`; the page title and the invention are **The Sunny Blinds**.

## 0. Identity
- id `cutting-board.play.3-nf-a-3-d` · grade 3 · CCSS 3.NF.A.3.d · strand Number & Operations—Fractions · files `mini tools/cutting-board-core.js`, `cutting-board-activity.js`, `cutting-board-activity.html`, `cutting-board-activities.json` (scaffold `node scripts/new-activity.js --num=302`).
- worksheets covered: **G3-319 "Which Is Bigger?"** (both bars shaded — circle the bigger fraction; level 3 `sameParts` = same numerator or same denominator).
- a new instrument (no old activity).

## 1. The pitch
"Two identical windows with blinds: tug one cord to split a window into more slats — and watch every slat get thinner — tug the other to open slats; then let the sun out and the floor shows which fraction lets in more light."

## 2. Why a child will want it again (the fun)
- **Two cords, like real blinds.** Each window has a slat cord and a tilt cord with wooden beads. A tug on the slat cord makes the window re-divide into one more equal slat with a shutter *clack-clack-clack* — and every slat visibly squeezes thinner. A tug on the tilt cord flips the next slat open with a *flip*. Children tug the slat cord up to 8 just to see the slats get skinny.
- **The sun.** A library sun peeks from the corner. On Check it slides out from behind a cloud band, and warm yellow light pours through the open slats onto the floor under each window, as bright bands that grow downwards in 600 ms. The longer band glows and a soft "aah" chord plays. Sunshine is the most natural "more" there is.
- **The fairness surprise** (the "different windows" setting): a little window's half lets in LESS sun than a big window's quarter — and then the little window stretches to full size and its half floods the floor. A real "oh!" moment.
- **Free play:** cords can be tugged at any time before Check; a missed pair comes back once at the end of the pass with the windows swapped.

## 3. The skill and the misconception
- **Skill (3.NF.A.3.d, G3-319):** compare two fractions with the same numerator or the same denominator by reasoning about the SIZE of the parts (same top number: more parts → smaller parts) or the NUMBER of parts (same bottom number: more parts → more); and know that a comparison is only fair when both fractions are of the same whole.
- **Misconceptions and how the material pushes back:**
  1. *"A bigger bottom number means a bigger fraction"* (1/8 > 1/4). Tugging the slat cord to 8 shrinks every slat in front of the child's eyes; opening 1 of 8 lets a thin sliver of light fall; 1 of 4 a band twice as wide. The light is physics, not a message.
  2. *"Bigger numbers win"* (3/8 > 3/4 because 8 > 4). Same-numerator rounds are at least 3 of 9 in every table and 9 of 9 in the "same top number" table; the light refutes "bigger numbers" every time.
  3. *Comparing fractions of different wholes.* In the "sometimes different" setting a small window's 1/2 lets in less sun than a big window's 1/4. The child is asked whether 1/4 is bigger than 1/2; the right answer is "No — the windows are different", and the small window then grows to the big one's size and its 1/2 band overtakes.

## 4. The stage
**Stacked layout** (no `layout:'split'`: the split stage column is ~350 px at 704 — too narrow for card + window + cords). Bubble under the apparatus; stage 620 px wide at 704, 318 at 360.

| element | 704 px | 360 px | kind |
|---|---|---|---|
| task line | 22 px | 18 px | text |
| **sun** in the top-right corner, half behind a cloud band (drawn cream band) | picture 96 px | 64 px | library `beach/sun` |
| **window A** (top) and **window B** (below): teal frame, sky-blue glass, slats as cream vertical bars that re-space equally | 450 × 96 px each, 64 px apart (card 72 + gap 16 + window 450 + cords 64 = 602 of 620) | 300 × 80 px, 60 px apart | drawn frame + bars |
| **floor strip** under each window, where its light lands; both strips start at the same left line | 450 × 26 px | 300 × 22 px | drawn band |
| **fraction card** beside each window (left at 704, above the window at 360): stacked fraction | 72 px wide, numerals 30 px | numerals 24 px, card 56 px | content numerals |
| **two cords** at each window's right end: slat cord (square bead) and tilt cord (round bead), each with a small − chip | beads 48 px, − chips 44 px | 44 px / 44 px | drawn controls |
| **predict tap**: the whole window + its card is the target (outline lights teal when chosen) | ≥ 96 px tall | ≥ 80 px | — |
| **fairness card** (only in fairness rounds): two buttons "Yes" / "No — the windows are different" | 48 px tall | 48 px tall, full width | shell-styled buttons |
| Check | shell button | above the 360×740 fold | shell |

- Slats are never tapped (the cords do everything), so a slat 37 px wide at 360 (b = 8) has no tap floor to meet; the cords' beads are the 44–48 px targets.
- Slats open from the left, so the light on each floor strip is one band starting at the shared left line — the two bands compare directly, like bars on a rail.
- No words on the apparatus: only the fraction numerals on the cards. The sun is the only picture (96/64 — at the floors).
- **Task lines (EN):** build-and-predict — "Make each window show its fraction. Which window will let in more sun?" · fairness — "Make each window show its fraction, then let the sun in." (the question card appears after the sun).

## 5. The hand
- **Slat cord** (tap the bead, or drag it down one notch): the window re-divides into n + 1 equal slats (the slats slide to their new widths, 250 ms, clack per slat); open slats stay open counted from the left (if the new n is smaller than the open count, the extra open slats vanish with it). − chip: one slat fewer. Range 1–8.
- **Tilt cord**: the next slat from the left flips edge-on (180 ms flip, 600 Hz *tk*), showing blue sky through the gap; − chip closes the rightmost open slat. Range 0–n.
- **Card feedforward:** the card's bottom numeral turns teal when the slat count equals it; the top numeral turns teal when the open count equals it. No penalty — it just helps the child read the window.
- **Predict:** enabled when both windows match their cards; the child taps window A or B (the outline lights). Changing a window again un-chooses.
- **Check (the sun):** the sun slides out of the cloud (400 ms), beams fall through every open slat onto the floor (600 ms), the longer floor band glows. The prediction is then judged (section 7).
- **Fairness rounds:** after the sun the fairness card slides up; tapping a button is the answer.
- Before Check everything is undoable.

## 6. The rounds
One round = a pair of fractions, one in each window. Order-only reshuffle per pass; a missed pair returns ONCE at the end of the pass with A and B swapped (the pass still never repeats its order).

**Compare = same bottom number** (9; bigger fraction on top in 4/9):
3/4 v 2/4 · 1/3 v 2/3 · 3/8 v 5/8 · 5/6 v 2/6 · 2/5 v 4/5 · 6/7 v 3/7 · 1/2 v 2/2 · 7/8 v 2/8 · 1/5 v 3/5

**Compare = same top number** (9; bigger on top in 5/9):
1/8 v 1/4 · 1/3 v 1/2 · 2/6 v 2/3 · 3/8 v 3/4 · 2/4 v 2/5 · 1/2 v 1/6 · 4/5 v 4/6 · 3/5 v 3/7 · 1/3 v 1/8

**Compare = mixed** (9: 5 same-top, 4 same-bottom; bigger on top in 4/9):
1/6 v 1/3 · 3/4 v 1/4 · 2/8 v 2/3 · 2/6 v 5/6 · 3/4 v 3/5 · 4/8 v 7/8 · 1/2 v 1/5 · 3/7 v 3/4 · 5/6 v 4/6

**Windows = sometimes different** (uses the mixed pool; 9 rounds = 3 predict + 3 fair-and-same + 3 different):
- predict (same windows): 3/4 v 1/4 · 1/6 v 1/3 · 3/7 v 3/4
- fairness, same windows (answer **Yes**): "5/8 let in more sun than 3/8. Is 5/8 bigger than 3/8?" · "1/3 … than 1/6" · "4/5 … than 4/6"
- fairness, different windows (answer **No**): small window (45% of the width) shows 1/2, big shows 1/4 → light 0.225 v 0.250 · small (60%) 2/3 v big 2/4 → 0.40 v 0.50 · small (55%) 3/4 v big 3/6 → 0.41 v 0.50. In each, the big window's band is longer although its fraction is smaller — the question (`fairQ`): "{fBigWin} let in more sun than {fSmallWin}. Is {fBigWin} bigger than {fSmallWin}?" — e.g. "1/4 let in more sun than 1/2. Is 1/4 bigger than 1/2?" → **No — the windows are different**.
- the small window is A (top) in 2 of 3 and B in 1 of 3.

**Measured by the critic** (own script `work-c40/c302.js`; the gate re-measures):
- *Answer position (top window right):* 4/9 · 5/9 · 4/9 — inside 40–60%. An always-top bot scores 44–56%.
- *Number bots* (a tie — the bot's numbers are equal — is scored as a coin flip, i.e. ½): same-top table — "bigger denominator wins" **0/9**, "bigger total wins" **0/9** (that table exists to break "bigger numbers win"); same-bottom table — "bigger denominator wins" 4.5/9; mixed table — "bigger denominator wins" 2/9 + ties, "bigger total wins" 4/9, "smaller total wins" 5/9, "bigger numerator wins" 4 + 2.5 = 6.5/9 (it is the right rule on the 4 same-bottom pairs and a coin flip on the 5 same-top pairs — unavoidable, and it fails every same-top pair in the same-top table). The designer's "every number bot 4/9 on mixed" did not survive measurement; the conclusion (no shortcut beats the skill) does. The only bot that scores 9/9 everywhere is the rule itself: same top → smaller bottom; same bottom → bigger top.
- *Fairness buttons:* Yes is right in 3, No in 3 of the 6 fairness rounds; the longer label ("No — the windows are different") is right exactly half the time — no length tell. Button order fixed (Yes left) so position is not a cue either way.
- *One right answer:* no pair is equal in value (checked); each different-window pair makes the light disagree with the fraction (checked) so the question has one answer.

## 7. Check, the misses, the success
- **Check before the windows match their cards** → hint, no miss: "Make both windows match their cards first — the slat cord, then the tilt cord." · **Check with no window chosen** → "Tap the window you think will let in more sun."
- **Miss 1 (wrong prediction):** the sun still shines — the truth lands on the floor. Each OPEN slat then shows its unit fraction in small numerals (1/8 on thin slats, 1/4 on wide), and a bracket compares the two bands' ends. The child taps the brighter window to close the round; the pair returns once at the end of the pass, swapped. Hint EN, same top: "Both open {a} slats — but whose slats are wider?" · same bottom: "The slats are the same size — who opened more?"
- **Miss 2 (the returning pair missed again):** the open slats drop down onto the floor as loose pieces under each band (thin pieces under one, wide under the other), lined up end to end, then rise back. Hint EN: "More slats in the same window means thinner slats: 1/{b1} is smaller than 1/{b2}."
- **Fairness, wrong answer:** the windows still resize/compare (section 2), the pair returns once. Hint EN: "Look at the windows. Are they the same size?"
- **Success:** the brighter band glows gold, the sun gives a 6 px bounce, and both bands slide together onto one rail for a last look. Bubble EN: "{big} is more than {small}." + same top: "Same number of slats open, but {small}'s slats are thinner." · same bottom: "Same size slats, and {big} has more of them open." · fairness No: "Not fair! A small window's {fSmallWin} lets in less. In windows of the same size, {fSmallWin} is more than {fBigWin}." · fairness Yes: "Yes — same windows, so {fBigWin} is more." ({big}/{small} = the bigger/smaller fraction; {fBigWin}/{fSmallWin} = the fraction in the bigger/smaller window.)

## 8. Settings
1. **Compare:** same bottom number / same top number / mixed. At rest: the two cards change.
2. **Windows:** always the same size / sometimes different. At rest: in different rounds one window is visibly narrower; the fairness card appears after the sun.

## 9. Words (EN source)
- title **The Sunny Blinds** · instruction "Make each window show its fraction, then guess which one lets in more sun."
- prompts `promptPredict`, `promptFair` (section 4) · fairness question `fairQ` "{fBigWin} let in more sun than {fSmallWin}. Is {fBigWin} bigger than {fSmallWin}?" ({fBigWin} = the fraction shown in the bigger window — in a fair round both windows are the same size and {fBigWin} is simply the fraction whose band is longer) · buttons `yes` "Yes" · `noDifferent` "No — the windows are different".
- hints `hintMatch` · `hintChoose` · `hintSameTop` · `hintSameBottom` · `hintStrong` · `hintFair` (section 7).
- celebrations `win` + `winSameTop` / `winSameBottom` · `winFairNo` · `winFairYes`.
- settings "Compare" — "same bottom number" / "same top number" / "mixed"; "Windows" — "always the same size" / "sometimes different".
- aria `srWindow` "Window {i}: {n} slats, {k} open." · `srLight` "Window {i} lets in a band of light {k} of {n} slats long." (after Check).
- **Locale traps:**
  - *"Top number / bottom number"* — every locale has a school word: de "Zähler / Nenner", fr "numérateur / dénominateur" (CE2 uses them), es "numerador / denominador", pt "numerador / denominador", it "numeratore / denominatore", nl "teller / noemer", sv "täljare / nämnare", da "tæller / nævner", no "teller / nevner", fi "osoittaja / nimittäjä". Settings labels use them (grade 3 knows them in all 11); EN keeps "top/bottom number" (the CCSS-classroom word at grade 3).
  - *Blind words:* de "Jalousie" with "Lamellen", fr "store vénitien / lamelles", es "persiana / tablillas" (es-MX "persiana"), pt "persiana / lâminas", it "veneziana / lamelle", nl "jaloezie / lamellen", sv "persienn / lameller", da/no "persienne / lameller", fi "sälekaihdin / säleet". They appear only in hints.
  - *Comparatives with fractions:* de "Ist 5/8 größer als 3/8?", fr "5/8 est-il plus grand que 3/8 ?" (inverted question with a pronoun; or "Est-ce que 5/8 est plus grand que 3/8 ?"), fi "Onko 5/8 suurempi kuin 3/8?". Fractions stay numerals inside sentences.
  - *"let in more sun"* — the verb differs (de "lässt mehr Sonne herein", sv "släpper in mer sol", fi "päästää sisään enemmän aurinkoa"); written by hand per locale.
  - No decimals; stacked fractions.

## 10. Sound off, access, phones
- Sound off: slat widths, the light bands and the glow carry everything; the clacks and chord are extra.
- Keyboard: Tab → A slat bead (Enter = +1, Shift+Enter = −1) → A tilt bead → B beads → window A / window B (Space = choose) → Check; fairness buttons by Tab.
- aria-live: `srWindow` after each cord change; `srLight` after the sun.
- Taps: beads 48/44 px; − chips 44 px; windows ≥ 80 px tall; fairness buttons 48 px.
- Sun picture 96/64 px — at the floors.
- Phones: cards move above their windows; cords stay at the right end (stacked vertically, 4 × 44 px). Stage 520 px tall at 360 keeps Check above the 360×740 fold; at 320×640 the gap between windows shrinks to 44 px and the floor strips to 18 px.

## 11. Distinct from
- **fraction-kitchen** (tool): a knife cuts food; here no cutting at all — a window divides itself and light measures the amount.
- **Row 106 The Light-Leak Lantern** (gaps leak beams = a geometry seal) and **New 243 The Window-Sill Pot** (a sunbeam reaching a plant) use light for other ideas; nothing there compares fractions.
- **Row 172 The Rain Table** (equal parts fill tubes) and **comparison-planks** (two planks from one line) — no fractions of a whole compared by part size.
- **Rows 107/108/170/171/172, Row 195, Row 196, New 285** — making or checking equal parts, building a/b in a bar, equivalence by a crumb line, mirror folds; none compares two fractions by part size, none tests whether the wholes are fair.
- **This batch:** #300 builds a whole from a piece (the kite tail); #301 places a fraction on a line; the blinds compare two fractions and test fairness of the whole.

## 12. Build plan
- **Core state:** `{ windows: [{width (1 or w), n, open, card {a,b}}], kind ('predict'|'fairYes'|'fairNo'), chosen, fairAnswer, misses, returned }`. Functions `setSlats(i, n)`, `setOpen(i, k)`, `matches(i)`, `light(i) = width × open / n`, `bigger() → i`, `judge()`, `requeueSwapped(round)`.
- **Verify gate** (own oracle): every pair unequal in value; same-top table all a1 = a2; same-bottom table all b1 = b2; mixed 5/4 split; bigger-on-top 40–60% per table; the four number bots measured and same-top bot scores 0/9; fairness rounds 3 Yes / 3 No and in every No round `light(big) > light(small)` while `small value > big value`; requeue swaps A/B and happens at most once per pair per pass; the reshuffle never repeats a pass order (1,000 shuffles).
- **Mutations:** slats unequal (n slats of random widths) → equal-slat rule; open slats counted from the right → shared-left-line rule (bands no longer compare); bigger always on top → position rule; a No round where the small window's light is longer → fairness-truth rule; predict enabled before the windows match → feedforward rule; requeue without swap → swap rule; light computed as open × n → light oracle.
- **Local test:** real cord taps/drags, predict taps, sun, fairness buttons, at the seven widths, every round of every setting, misses and the requeue.
- **Pictures:** `beach/sun` (the rulings: `weather/sun` has no label; use beach/sun). **Risks:** none BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — cords that clack, slats that squeeze thinner, and sunshine pouring onto the floor.
2. **Would a teacher put it on the board?** Yes — "same top number: whose slats are thinner?" is the 3.NF.A.3.d reasoning, the number-bots fail by design, and the fairness rounds teach the "same whole" condition the standard names.
3. **Would a parent trust it?** Calm, one library sun, no score, no words on the apparatus.
4. **The invention:** a window that divides itself into equal slats — more slats, thinner slats — and the sun measures how much each fraction lets in.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Layout: `layout:'split'` with 520 px windows + a 72 px card cannot fit the ~350 px split column at 704; now stacked, windows 450 px (card + window + cords = 602 of 620).
- Re-measured every table with my own script: bigger-on-top 4/9 · 5/9 · 4/9 confirmed; the number bots restated honestly (the draft's "4/9 for every bot on mixed" was wrong — "bigger numerator" reaches 6.5/9 there, unavoidably, while the same-top table drives every "bigger numbers" bot to 0/9); fairness No rounds verified (light 0.225/0.25, 0.40/0.50, 0.41/0.50 — the band disagrees with the fraction every time).
- Placeholder ambiguity removed: the fairness strings used {big}/{small} for the window size while the normal bubbles used them for the fraction size — split into {fBigWin}/{fSmallWin}, with a worked EN example.
- Distinct-from extended to the sibling fraction designs.
- Kept: the slat cord (more slats → thinner, visibly) and the sun as the measuring instrument are the right invention; the knife (fraction-kitchen) stays out.
