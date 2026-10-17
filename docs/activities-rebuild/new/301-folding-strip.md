# New 301 — The Folding Strip: the fold makes the spaces, the sleeve counts them (3.NF.A.2)

## 0. Identity
- id `folding-strip.play.3-nf-a-2` · grade 3 · CCSS 3.NF.A.2 (a and b) · strand Number & Operations—Fractions · files `mini tools/folding-strip-core.js`, `folding-strip-activity.js`, `folding-strip-activity.html`, `folding-strip-activities.json` (scaffold `node scripts/new-activity.js --num=301`).
- worksheets covered: **G3-317 "Fractions on the Line"** (the dot marks a fraction — name it; level 1 thirds/fourths with any numerator, level 2 the published page, level 3 sixths/eighths with inner numerators).
- a new instrument (no old activity).

## 1. The pitch
"Fold the paper strip from 0 to 1 into equal panels — the creases are the tick marks — then slide the sleeve over panels from 0: the fraction is where the sleeve ends, so you count spaces, never marks."

## 2. Why a child will want it again (the fun)
- **The fold.** Press the fold button and the cream paper strip really folds: it concertinas into a zig-zag stack of panels at 0 (a crisp paper *fwip* per layer, 450 ms in all), then springs open flat with the new creases pressed in. Pressing again folds it into one more panel. Children fold and unfold it just to watch — and it never makes unequal panels, because a fold can't.
- **The sleeve.** A translucent teal sleeve hugs the strip from 0. Dragging its edge, it *clicks* panel by panel; each covered panel shows a small number inside the sleeve (1, 2, 3 …) — the spaces counting themselves.
- **The visitor.** Every round a library bug (ladybug, bee, butterfly, snail …) is the point's owner. On success the bug hops onto the sleeve's end, the edge presses a permanent tick with its fraction printed under it, and the strip folds itself away leaving a clean number line with one labelled point — a little "finished page" moment.
- **Free play:** fold and unfold, slide the sleeve anywhere; nothing is judged until Check.

## 3. The skill and the misconception
- **Skill (3.NF.A.2):** (a) 1/b on a line is the length from 0 to the first of b equal spaces into which 0–1 is cut; (b) a/b is a such lengths marked off from 0 — its END locates a/b. G3-317 asks the reverse: a dot is on a line of b equal spaces — name its fraction.
- **Misconceptions and how the material pushes back:**
  1. *Counting tick marks instead of spaces* (calling the third mark 3/4 because 0 is "mark 1"; or naming a quarter-line "fifths" because it has 5 marks). The sleeve can only cover PANELS, and it numbers the panels it covers — 0 is a wall, never a panel. In name mode a denominator that counts marks (5 for quarters) re-folds the strip into 5 panels on Check: the creases visibly slide away from the bug, which is left sitting between two creases.
  2. *Unequal parts.* Impossible by construction: the fold makes the panels. A child who wants to "draw" ticks cannot — the creases come only from folding.
  3. *Fractions stop at 1.* On the 0–2 line both wholes fold together and the sleeve carries on past 1 (5/4 is five quarter-panels from 0).

## 4. The stage
**Stacked layout** (no `layout:'split'`: a split column is ~350 px at 704 and the line needs 600). Bubble under the apparatus; stage 620 px wide at 704, 318 at 360.

| element | 704 px | 360 px | kind |
|---|---|---|---|
| task line | 22 px, ≤ 2 lines | 18 px | text |
| **number line**: thick teal baseline, end numerals 0 and 1 (and 2) | 600 px long; numerals 24 px | 300 px; numerals 20 px | drawn line |
| **paper strip** lying on the line, cream with a 2 px ink edge, from 0 to the line's end | 600 × 56 px | 300 × 48 px | drawn bar |
| **creases**: dashed 2 px ticks across the strip, extending 10 px below the baseline | — | — | drawn ticks |
| **sleeve**: translucent teal band over the strip from 0, with a grip on its right edge; panel numbers inside (1, 2, 3…) | grip 44 × 72 px; panel numerals 18 px | grip 44 × 60 px; numerals 14 px | drawn band |
| **fold control** left of the line: a pleated paper icon with − and + buttons and the panel count numeral | buttons 48 px; numeral 28 px | 44 px; 22 px | drawn control |
| **the bug** (the point's owner) above the line with a 2 px teal pointer stem down to the exact point | picture 96 px | picture 64 px | library picture |
| **fraction card** — place mode: shows the target (e.g. 3/4); name mode: two wheels (top, bottom) with ▲ ▼ | card 120 × 150 px; numerals 34 px; wheel buttons 48 px | 96 × 128; 28 px; 44 px | content numerals |
| Check | shell button | above the 360×740 fold | shell |

- On the 0–2 line each whole is 300 px at 704 / 150 px at 360, so an eighth is 37.5 / 18.75 px wide — the sleeve grip (not the panel) is the tap target, so this is fine.
- Bugs: ladybug, bee, butterfly, caterpillar, ant, dragonfly, snail, worm — all in `insects-and-bugs.json`, looked at on `contact/insects-and-bugs.png`; the wasp is left out (near-twin of the bee); no "beetle" (it reads as a ladybug). Bugs are a decoration of the point and are never the answer.
- No words on the apparatus: only 0, 1, 2, the panel numbers and fraction numerals.
- **Task lines (EN):** place — "Fold the strip and slide the sleeve so it ends at {frac}." · name — "Where is the {bug}? Set the fraction on the card."

## 5. The hand
- **Fold + / −:** each press re-folds the strip into one more / one fewer panel (1–8): the strip concertinas into a stack at 0 (folds 40 ms apart, paper *fwip* 520 Hz noise burst) and springs open (200 ms); the creases appear at k/n positions. Response starts < 50 ms. The sleeve, if already out, shrinks to 0 while folding and stays at 0 after (so a fold never leaves a stale sleeve).
- **Drag the sleeve grip:** the edge follows the finger; within half a panel of a crease it snaps (100 ms) and the newly covered panel gets its number with a soft tick (700 Hz). The sleeve cannot pass the line's end. Tap the grip = one more panel; tap inside the sleeve = one fewer.
- **Wheels (name mode):** ▲ / ▼ step the top (1–16) and bottom (1–8) numbers; both start blank ("?") so a starting value is never a hint. Nothing on the strip moves while the wheels change — the wheels are a prediction.
- **Check** — place mode: the target card's pin flies from the card to the target's true point on the line (400 ms arc) and drops there. Name mode: the strip re-folds to the bottom wheel's number (only if it differs from the current creases — the creases visibly slide), then the sleeve glides out over the top wheel's number of panels.
- Undo: fold and sleeve are free until Check; after a miss the child changes them.

## 6. The rounds
One round = one fraction. Modes alternate in each table (P = place, N = name); the pass order is reshuffled order-only, never the same order twice and never the same denominator three times running.

**Denominators 2, 3, 4 · line 0–1** (7 rounds — every fraction of b ≤ 4 except two of the three wholes; ≥ 7 is the floor because only 9 such fractions exist):
| # | mode | fraction | point | bug |
|---|---|---|---|---|
| 1 | P | 1/2 | 0.500 | ladybug |
| 2 | N | 1/3 | 0.333 | bee |
| 3 | P | 2/3 | 0.667 | snail |
| 4 | N | 1/4 | 0.250 | butterfly |
| 5 | N | 2/4 | 0.500 | ant (an equivalent name, 1/2, is accepted — section 6) |
| 6 | P | 3/4 | 0.750 | caterpillar |
| 7 | P | 4/4 | 1.000 | dragonfly |

**Denominators 2, 3, 4, 6, 8 · line 0–1** (9): 1/6 P · 2/8 N · 1/3 P · 3/8 N · 1/2 P · 4/6 N · 3/4 P · 5/6 N · 8/8 P.

**Denominators 2, 3, 4 · line 0–2** (9): 1/4 P · 2/3 N · 1/2 P · 4/4 N · 5/4 P · 4/3 N · 3/2 P · 7/4 N · 5/3 P.

**Denominators 2, 3, 4, 6, 8 · line 0–2** (10): 1/8 P · 2/6 N · 3/4 P · 6/6 N · 9/8 P · 4/3 N · 11/8 P · 10/6 N · 7/4 P · 1/2 N.

Bugs rotate through the 8 in table order, never the same bug twice running.

**Measured by the critic** (own script `work-c40/c301.js`; the gate re-measures):
- *Where the point is* (thirds of the line; a point exactly on 1/3 or 2/3 of the line counts in the upper third): 1 / 3 / 3 · 2 / 3 / 4 · 2 / 3 / 4 · 3 / 3 / 4. Position is not an answer channel here anyway: in place mode the child moves the sleeve, in name mode the child sets numbers on wheels — there is nothing to pick by place. (The designer's 2/3/2 · 3/3/3 … counts were not reproducible: they depended on where boundary points were filed.)
- *Modes:* P/N = 4/3 · 5/4 · 5/4 · 5/5. In the first table 1/2 (place) and 2/4 (name) share a point and are in DIFFERENT modes — fixed by the critic; the draft had both in place mode.
- Exactly one whole per table (a = b), at least 3 fractions > 1 on each 0–2 table (5 and 5).
- No fraction repeats inside a table; two different fractions share a point only once (1/2 and 2/4 in the first table).
- *Slips are diagnosable:* the mark-counting name of every name-round point ((a+1)/b, counting 0 as a mark) is a real, different point on the same line in every round (never past the line's end), so the refold/sleeve shows exactly where the slip would sit. (The draft's "slips never equal a/b" was true by arithmetic and measured nothing.)
- *One right answer:* place mode — one point; name mode — one point, so an EQUIVALENT name is right too: a bug at 2/4 on a strip creased in quarters, named 1/2, makes the Check re-fold the strip into 2 panels and slide the sleeve over 1 — and the sleeve ends exactly at the bug. The success line names both (section 7). This is the true mathematics of a point on a line, not a second answer.

## 7. Check, the misses, the success
- **Check with nothing done** (place: no fold or no sleeve; name: a blank wheel) → hint, no miss: place — "First fold the strip into equal panels." / "Now slide the sleeve over the panels." · name — "Turn both wheels on the card."
- **Miss 1 — the apparatus shows the spaces.**
  - place, wrong panel count: the pin lands BETWEEN two creases (or past the sleeve), and the creases wobble once. Hint: "The bottom number tells how many equal panels 0 to 1 needs."
  - place, wrong numerator: the pin lands on a crease beyond (or before) the sleeve's end; the panels under the sleeve light up in turn, 1, 2, 3, with their numbers enlarged. Hint: "Count the panels under the sleeve — panels, not marks."
  - name, wrong bottom number: the refold leaves the bug between creases; the original creases ghost back for 1 s. Hint: "Count the equal spaces between 0 and 1 — that's the bottom number."
  - name, wrong top number: the sleeve ends short of or past the bug; the panels it covered light up and count. Hint: "Count the spaces from 0 to the {bug}."
- **Miss 2 — the spaces are numbered on the line.** Every panel from 0 to the line's end shows its running fraction under the baseline (1/4, 2/4, 3/4, 4/4 …) in 14 px grey, and the 0-wall gets a small shaded block that says "start" by colour only (no word). Hint: "Each space is one {unit}. Count spaces from 0."
- Any new fold, sleeve move or wheel step clears the miss showing.
- **Success:** the bug hops onto the end of the sleeve (scale 1 → 1.15 → 1, 300 ms), the sleeve's edge stamps a permanent tick with the fraction under it, a two-note chime plays, and the strip folds itself away leaving the labelled point on a clean line. Bubble EN: "{frac} is {a} spaces of {unit} from 0." · equivalent name accepted — "{frac} — the same point as {other}." · > 1 — "{frac} is {a} spaces of {unit}: one whole and {rest} more."

## 8. Settings
1. **Denominators:** 2, 3, 4 / 2, 3, 4, 6, 8. At rest: the target card and the strip's initial creases (name rounds) change.
2. **Line:** 0 to 1 / 0 to 2. At rest: the line grows a second whole with a seam at 1 and the numeral 2.

## 9. Words (EN source)
- title **The Folding Strip** · instruction "Fold the strip into equal panels, then count panels from 0 with the sleeve."
- prompts `promptPlace` "Fold the strip and slide the sleeve so it ends at {frac}." · `promptName` "Where is the {bug}? Set the fraction on the card."
- hints `hintFoldFirst` · `hintSleeve` · `hintWheels` · `hintPlaceDen` · `hintPlaceNum` · `hintNameDen` · `hintNameNum` · `hintStrong` (section 7).
- celebrations `win` · `winSame` · `winOver` (section 7).
- settings "Denominators" — "2, 3, 4" / "2, 3, 4, 6, 8"; "Line" — "0 to 1" / "0 to 2".
- aria `srStrip` "The strip is folded into {n} equal panels." · `srSleeve` "The sleeve covers {k} panels." · `srBug` "The {bug} is on the line." (never its position).
- **Locale traps:**
  - *Bug names* come from `image-vocabulary.js` labels with the right article/case per locale for "Where is the {bug}?": de "Wo ist der Marienkäfer / die Biene / die Raupe / die Schnecke / der Schmetterling / die Ameise / die Libelle / der Wurm?" (gender from the label's third field), fr "Où est la coccinelle / l'abeille / le papillon" (elision before a vowel: l'abeille, l'escargot — the frame takes a pre-elided article per noun), es-MX "catarina" for ladybug (the library label already says Catarina), sv/da/no use the definite suffix form ("nyckelpigan", "mariehønen", "marihøna" — no bokmål allows marihøne → "marihøna"/"marihøne"; the reviewer picks), fi "Missä leppäkerttu on?" (nominative, no article). The build stores a per-locale definite form per bug rather than building it.
  - *Fraction words* are never printed; TTS reads them from a reviewed per-locale fraction-word table (fr "trois quarts", de "drei Viertel", sv "tre fjärdedelar", fi "kolme neljäsosaa").
  - *The 0–2 line:* in fr/es/pt/it the improper fraction is the norm in CE2/3º (5/4); no locale wants mixed numbers here — the bubble's "one whole and {rest} more" is prose, the label stays 5/4.
  - No decimals, no decimal comma; stacked fractions everywhere.

## 10. Sound off, access, phones
- Sound off: creases, panel numbers, the pin and the refold carry everything.
- Keyboard: Tab → fold −/+ (Enter), → sleeve grip (← → one panel), → wheels (↑ ↓), → Check.
- aria-live reads `srStrip` after a fold and `srSleeve` after a snap.
- Taps ≥ 44 px (fold buttons 48/44, grip 44 wide, wheel buttons 48/44).
- Bug picture 96 px at 704 / 64 px at 360 — at the floors.
- Phones: the fraction card moves above the line (left of the task line), the fold control under the line's left end; on the 0–2 line at 320 px each whole is 135 px and an eighth 17 px — the panel numbers inside the sleeve drop to every other panel when a panel is under 20 px (the count still shows at the sleeve's end). Check above the 320×640 fold (stage 380 px).

## 11. Distinct from
- **folding-sheet** (tool) folds to test SYMMETRY; **New 285 The Fold Press**, **New 228 The Fold Mirror** — mirror folds. Here a fold is a partition tool: n layers make n equal spaces.
- **number-line / open-number-line** (tools) — whole-number jumps; no partition, no fractions.
- **#300 The Kite Tail** (this batch) grows an unknown whole from a piece; this strip keeps the whole fixed and divides it. **#302 The Sunny Blinds** compares two fractions; **#288 The Walking Dividers** walks whole-number steps.
- **Row 196 The Crumb Line / Row 195 The Self-Writing Ticket** (equivalence / building a/b in a given bar), **Rows 107/108/170/171/172** (fair mobile, one-piece stamp, stamp sheet, dough press, rain table — equal parts of a shape) and **fraction-kitchen** (premium: a knife cuts food) — none puts a fraction on a number line, and none makes the parts by folding: here the number of LAYERS in a concertina is the denominator.

## 12. Build plan
- **Core state:** `{ max (1|2), panels (1..8), sleeve (0..panels*max), mode, target {a,b}, wheels {top,bottom}, misses }`. Functions `fold(n)`, `creases() → k/n positions`, `setSleeve(k)`, `sleeveEnd() → value`, `pinPoint() → a/b`, `predictCheck() → refold(bottom), setSleeve(top), hit = |top/bottom − a/b| < ε`, `verdict()`.
- **Verify gate** (`verify-folding-strip-core.js`, own oracle): creases are exactly equal for n = 1..8 on both lines; the sleeve can only end on creases; every round's fraction is reachable (b ≤ 8, a ≤ b·max); thirds balance ≤ 40% per table; one whole per table; ≥ 3 fractions > 1 per 0–2 table; slips (a+1)/b and a/(b+1) never equal a/b; name mode accepts exactly the values equal to a/b; no fraction repeats; reshuffle never puts the same b three times running (1,000 shuffles); wheels start blank.
- **Mutations:** creases at k/(n+1) (mark-counting fold) → equal-crease rule; sleeve stops between creases → snap rule; name mode accepts (a+1)/b → slip rule; wheels start at the answer → blank rule; a table with two wholes → whole rule; sleeve passes the line end → bound rule; bug position announced in aria → aria rule.
- **Local test:** real fold presses, sleeve drags, wheel steps at the seven widths, every round, both modes, the whole miss ladder; the refold animation ends with the creases at the bottom wheel's positions.
- **Pictures:** the 8 bugs above (seen). **Risks:** an eighth on the 0–2 line at 320 px (17 px) — handled by the every-other numbering. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — folding paper that really concertinas, a sleeve that clicks, and a different bug to find each time.
2. **Would a teacher put it on the board?** Yes — it is the paper-strip fold teachers already do, made exact; the sleeve counts SPACES, and the refold shows a mark-counted denominator failing.
3. **Would a parent trust it?** Calm, library bugs, no words on the apparatus, nothing scored.
4. **The invention:** the fold makes the equal spaces, and the sleeve can only count spaces, so a fraction is where the sleeve ends.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Layout: the design asked for `layout:'split'` with a 600 px line — the split stage column is ~350 px at 704; now stacked (stage 620).
- Round table 1: 1/2 and 2/4 (same point) were BOTH place rounds although the text said "different modes"; 2/4 is now a name round (and it carries the equivalent-name acceptance), 3/4 becomes place — P/N 4/3.
- Re-measured with my own script: thirds counts restated with an explicit boundary rule (the draft's counts were not reproducible), mode split per table, ≥ 1 whole and ≥ 3 values > 1 per 0–2 table confirmed.
- Replaced a vacuous "slip ≠ answer" claim with a real check: every name-round mark-counting slip lands on a real point of the same line, so the refold can show it.
- Distinct-from extended to the sibling fraction designs (107/108/170–172/195/196) and fraction-kitchen.
