# Row 196 — Crumb's Same-Amount Bakery → THE CRUMB LINE (3.NF.A.3)

## 0. Identity
- id `fraction-equiv.same-amount.3-nf-a-3` (kept; title "Crumb's Same-Amount Bakery — Equivalent Fractions (Grade 3)" and intros frozen en…nl; sv/da/no/fi metadata new at build) · grade 3 · CCSS 3.NF.A.3 (a, b, d) · strand Number & Operations—Fractions · own files `fraction-equiv-core.js` (rewritten), `fraction-equiv-activity.js`, html, manifest row; 0 lines to shared engines.
- worksheets it covers: **G3-318 Twin Fractions** and **G3-322 Equal Partners** (match each picture to the fraction that shows the same amount) · **G3-319 Which Is Bigger?** (two bars, circle the bigger fraction — same numerator or same denominator).
- what the old activity did: Crumb the mouse shows a reference fraction (numerals + shaded bar); the child taps the one of three candidates with the same amount. **Kept:** Crumb, the bakery, the reference with numerals and a shaded model, every reference/candidate pair (1/2 = 2/4 = 3/6 = 4/8, 1/3 = 2/6, 2/3 = 4/6, 3/4 = 6/8, 1/4 = 2/8, 2/4 = 1/2) and the "same amount, just more/fewer pieces" message. **Changed:** the child no longer picks one of three ready-shaded cards (a look-alike match) — they fill a tray cut a different way until it holds the same amount, and Crumb's crumb line proves it; "which is bigger" (G3-319) is added.

## 1. The pitch
"Crumb drops a straight line of crumbs from the end of the first fraction down across the second tray — fill the second tray until a piece ends exactly on the crumbs and it's the same amount; if every piece jumps over the line, that tray can't make it at all."

## 2. Why a child will want it again (the fun)
- **Filling the tray.** The second tray is cut into its own pieces (sixths, eighths…). Tap a piece and dough fills the tray from the left up to that piece (a soft *plop* per piece, 120 ms each) — tap a later piece to fill further, an earlier one to take back.
- **The crumb drop.** At Check, Crumb (the library mouse) scurries along the top of the first tray, stops exactly at the end of its filled part and drops a line of crumbs straight down (crumbs fall and bounce, 400 ms, little *tik-tik* sounds) across the second tray. If the second tray's filling ends exactly on the crumbs, the crumbs settle neatly in the groove and Crumb does a happy spin; if not, the crumbs land on dough or on empty tray, showing how far off it is.
- **"It can't be done" is a real answer.** Some trays can't make the amount (halves in thirds). A child who taps Crumb's "no piece fits" stamp and is right gets the special show: the crumbs fall straight through the middle of a piece, and Crumb shrugs (a little side-to-side wobble).
- **Circles.** In the circle setting the trays are round tarts cut into sectors, and the crumbs fall along a straight ray from the centre — the same idea in a new shape.
- **The earned show:** the two trays slide into the oven (a drawn oven door opens and closes), come out golden, and the ticket shows the two names of one amount side by side: "1/2 = 3/6".

## 3. The skill and the misconception
- **Skill (3.NF.A.3):** (a) two fractions are equivalent if they are the same size; (b) recognise and generate equivalent fractions (1/2 = 2/4, 4/6 = 2/3) and explain them with a model; (d) compare two fractions with the same numerator or the same denominator by reasoning about their size, recording with >, <, = (here: tap the bigger, the trays show why).
- **Misconception 1 — the same numerator means the same amount** (1/2 = 1/4) or "bigger numbers, bigger fraction" (3/6 > 1/2). *Push-back:* filling one sixth-tray piece leaves the crumbs far to the right; filling three lands on them.
- **Misconception 2 — every fraction has a twin in every cut.** *Push-back:* 1/2 in thirds, 3/6 in thirds and 2/3 in fourths: the crumbs fall through the middle of a piece whatever the child fills.
- **Misconception 3 — a bigger denominator is a bigger fraction** (1/6 > 1/4). *Push-back (which is more):* filled to their fractions, the 1/6 tray's dough stops short of the 1/4 tray's; the crumb lines show it.
- **Misconception 4 — comparing fractions of different wholes:** the trays are always the same length / same diameter (drawn from one template, the gate checks it), and the success line says "of the same tray".

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40. Trays and tarts are drawn apparatus (cream tray `#FBF3E4`, dough `#E9B872`, 2 px ink outlines, piece grooves 2 px); the only picture is Crumb.

**At 704 — left 470 px (the trays), right 202 px (Crumb's counter):**
- **Bars setting:** two trays 420 × 64 px stacked 56 px apart, left edges aligned (the crumbs need that):
  - the **first tray** (reference) is pre-filled to its fraction and grooved into its own pieces;
  - the **second tray** is empty and grooved into its own pieces (in which-is-more rounds both trays start empty).
  - Each tray has its **ticket** at its left end: a small paper tag 64 × 72 with the stacked fraction (Baloo 2 30 px); the second tray's ticket shows "?" over its denominator until filled, then its own numerator.
- **Circles setting:** two tarts, diameter 200, side by side (ref left, target right), sectors fill clockwise from 12 o'clock; the crumb ray is drawn on both tarts at the same angle.
- **Crumb's counter (right column):** the library **forest-creatures/mouse** at 96 px; below it the **"no piece fits" stamp** — a round 72 px button showing a drawn groove line crossing the middle of a piece with a small cross (icon, no words); in which-is-more rounds two **prediction tickets** (the two fractions, 88 × 72 each) replace the stamp. Check/Next under it.
- **Task line** above, ≤ 2 lines, 22 px.

**At 360 — stacked:** task line · Crumb 64 px + the stamp/prediction tickets in one row · trays 300 × 56 (eighths are 37 px wide; the tap band per piece is 56 px tall) with their tickets (48 × 56) riding above each tray's left end, so the trays keep the full 300 px · circles 150 px side by side · Check at ≈ y 520. Check above the fold at 360 × 740 and 320 × 640 (at 320, trays 280 px: eighths 35 px).

No words on the apparatus: numerals on tickets, crumbs, the stamp icon.

**Task lines (EN):**
- same amount: "Fill the second tray with the same amount as {ref}."
- same amount (first round only): "Fill the second tray. Crumb will drop crumbs from the end of the first one to check."
- which is more: "Which is more, {a} or {b}? Tap your guess, then fill both trays."

## 5. The hand
- **Fill:** tap piece k of the second tray (bars) / sector k (circles) → pieces 1…k fill (contiguous from the left / from 12 o'clock), 120 ms per piece, *plop*. Tapping the last filled piece empties it (and only it). The ticket's numerator updates live (it counts the child's pieces, never judges).
- **The stamp:** tap "no piece fits" → it presses down and stays pressed (outlined); tapping a piece releases it (the child can change their mind).
- **Which-is-more:** tap a prediction ticket first (it lifts, outlined; the trays unlock), then fill both trays (each to its own fraction).
- **Keyboard:** Tab → pieces (←/→ move, Enter fills to here, Backspace empties the last) → stamp → prediction tickets → Check.
- **Free play:** after success, both trays become free: fill anything and press the crumb button (a small drawn salt-shaker of crumbs) to drop a crumb line from any tray's end onto the other — a sandbox for finding twins.

## 6. The rounds
Computed and bot-measured with `work-39` scripts (fractions with denominators 2, 3, 4, 6, 8 — the grade-3 set).

**Pool "same amount" (12 rounds):** first tray {ref}, second tray cut into {d} pieces.

| # | ref | second tray | right answer | relation |
|---|---|---|---|---|
| 1 | 1/2 | fourths | 2/4 | more, smaller pieces |
| 2 | 1/2 | sixths | 3/6 | × 3 |
| 3 | 1/2 | eighths | 4/8 | × 4 |
| 4 | 1/3 | sixths | 2/6 | × 2 |
| 5 | 3/4 | eighths | 6/8 | × 2 |
| 6 | 2/4 | halves | 1/2 | fewer, bigger pieces |
| 7 | 6/8 | fourths | 3/4 | ÷ 2 |
| 8 | 2/8 | fourths | 1/4 | ÷ 2 |
| 9 | 4/6 | thirds | 2/3 | ÷ 2 |
| 10 | 1/2 | thirds | no piece fits | — |
| 11 | 3/6 | thirds | no piece fits | — |
| 12 | 2/3 | fourths | no piece fits | — |

**Pool "which is more" (10 rounds):** left tray first, right tray second.

| # | left | right | bigger | kind |
|---|---|---|---|---|
| 1 | 2/3 | 2/8 | left | same numerator |
| 2 | 1/6 | 1/4 | right | same numerator |
| 3 | 3/4 | 3/6 | left | same numerator |
| 4 | 1/3 | 1/2 | right | same numerator |
| 5 | 5/8 | 5/6 | right | same numerator |
| 6 | 3/8 | 5/8 | right | same denominator |
| 7 | 3/4 | 1/4 | left | same denominator |
| 8 | 4/6 | 2/6 | left | same denominator |
| 9 | 1/3 | 2/3 | right | same denominator |
| 10 | 7/8 | 6/8 | left | same denominator |

(No pair is equal — the equal case belongs to the same-amount pool. In the circle setting the left tray is the left tart.)

**Answer position and shortcut bots (measured).**
- Same amount (building; the "position" is the number filled). Over the 12 rounds: "copy the first numerator" 0/12; "fill half the tray" 4/12 (the three 1/2 rounds and 2/4 → 1/2); "double the numerator" 3/12; "halve the numerator" 4/12; "always press no piece fits" 3/12; no bot exceeds 4/12. Rounds 6–9 make the child go to FEWER pieces, so "more pieces" is never a rule.
- Which is more: bigger left 5 / right 5; "bigger numerator wins" 5/10 (right in all same-denominator rounds, undecided in all same-numerator rounds); "bigger denominator wins" 0/10; "smaller denominator wins" 5/10 — the same-numerator rule, correct only where it applies. A child must notice which kind of pair it is.

**Order:** order-only reshuffle per pass; in pass 1 the same-amount pool opens with round 1 and keeps the three "no piece fits" rounds out of the first four.

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: "Tap the pieces of the second tray to fill it — or press the stamp if no piece fits." / "Tap your guess first."
- **Miss 1 — the crumb line falls and stays:**
  - filled too little / too much: the crumbs land on empty tray (too little) or on dough (too much); the stretch between the dough's end and the crumbs is outlined in coral. Hint: "The crumbs fall {more | less} than your dough. Fill {more | less}."
  - stamp pressed but a piece does fit: the crumbs fall exactly on a groove (that groove glows). Hint: "Look — a groove sits right under the crumbs. Fill up to it."
  - filled, but no piece can fit (impossible rounds): the crumbs fall through the middle of a piece; every groove near them shows a little gap mark. Hint: "The crumbs land in the middle of a piece. Can any number of these pieces end on the crumbs?"
  - which-is-more wrong guess: the two crumb lines fall from both trays' dough ends onto a shared ruler strip between the trays; the further one glows. Hint: "{bigger} reaches further along the same tray." (fills wrong: as the first case, per tray.)
- **Miss 2 — the pieces are compared one by one:** the first tray's pieces are re-cut faintly into the second tray's pieces where possible (dashed grooves on the first tray: 1/2 shows 3 dashed sixths), so the child can count how many second-tray pieces make the first tray's dough; for impossible rounds the dashed grooves visibly cannot line up with the first tray's end. Which-is-more: each tray's pieces are numbered and the sentence frame appears: "{n} pieces of size 1/{d}" for both. Hint: "Each {unitA} is the same as {k} {unitB}s." / "Same top number: the bigger pieces make more." / "Same pieces: more of them make more."
- A new move takes the help away until the next Check.
- **Success** → Crumb's happy spin, the trays go into the oven and come out golden, the ticket reads the equality. Bubble: same amount (more pieces) "Yes! {ref} and {ans} — the same amount, just more pieces!" · (fewer) "Yes! {ref} and {ans} — the same amount, just fewer pieces!" · no piece fits "Right — no number of {unit}s makes exactly {ref}." · which is more "{bigger} is more than {smaller} of the same tray." For which-is-more the comparison is also written with a sign, e.g. "3/4 > 3/6".

## 8. Settings
1. **Job: same amount · which is more.** Visible at rest: one pre-filled tray + the stamp, or two empty trays + two prediction tickets.
2. **Shape: bars · circles.** Visible at rest: rectangular trays or round tarts.

## 9. Words (EN source)
- title (shell): "Crumb's Same-Amount Bakery" · instruction: "Fill the second tray until it holds the same amount. Crumb's crumbs will check it."
- prompts: three task lines (§4) · hints: §7 (empty ×2, miss 1 ×4, miss 2 ×3) · celebrations: four · settings: "Job", "same amount", "which is more", "Shape", "bars", "circles".
- aria: piece "Piece {n} of {d}, {filled | empty}" · stamp "No piece fits" · tickets "{fracWords}" · Crumb's line "The crumbs fall at the end of {ref}".
- **Locale traps:** fraction words (see Row 195 — the same per-locale helpers; de *ein Halbes* not *ein Halb*; fr *tiers* invariable; fi partitive after numerals "kolme kuudesosaa"); "the same amount" — de *gleich viel*, fr *la même quantité*, es *la misma cantidad*, it *la stessa quantità*, pt *a mesma quantidade*, nl *evenveel*, sv *lika mycket*, da *lige meget*, no *like mye*, fi *yhtä paljon* (the old de/fr/es strings are kept). "more pieces / fewer pieces": English *fewer* vs *less* has no counterpart problem in the other locales but each picks its count word (de *mehr/weniger Stücke*). Comparison signs ">" "<" are universal; Nordic and German classrooms read "3/4 > 3/6" naturally. Circle wording: "tart" (de *Kuchen*, fr *tarte*, es *tarta*, it *crostata*, pt *torta*, nl *taart*, sv *paj/tårta*, da *tærte*, no *terte*, fi *piirakka*) appears only in aria — the apparatus is wordless.

## 10. Sound off, access, phones
- Legible with the sound off: dough levels, crumbs, coral gaps, dashed re-cuts, tickets and the written comparison carry everything.
- Keyboard path in §5; aria-live reads the ticket and the crumb result.
- Taps: tray pieces ≥ 35 px wide with 56 px tall hit bands; sectors ≥ 44 px of arc at the rim; stamp 72 px; tickets 88 × 72; Check 48.
- Pictures: Crumb (forest-creatures/mouse) 96 px / 64 px.
- Check above the fold at 360 × 740 and 320 × 640.

## 11. Distinct from
- **New 302 The Sunny Blinds** (batch 40; formerly "The Cutting Board", 3.NF.A.3.d): tug a cord to split a window into more, thinner slats, open slats, and the sunlight on the floor compares two fractions. Here nothing is split by the child (the trays come cut), the comparison is proved by filling the same tray and dropping a crumb line straight across, and the row's main job — generating an equivalent fraction, including the honest "no piece fits" — is not in 302 at all.
- **Premium `fraction-kitchen`** (cut food with a knife, two fourths fill one half), **premium `comparison-planks`** (overhang moves from the long plank to the short one): different mechanics.
- **Row 171 The Dough Press** (equal shares squashed into equal patties) and **Row 172 The Rain Table** (equal parts fill tubes): equal-share checks, not equivalent names.
- **Row 195 (sibling) The Self-Writing Ticket:** naming and unit fractions; this is equivalence and comparison.
- Registry: no built or designed invention drops a line from one model across another.

## 12. Build plan
- **Core (`FractionEquivCore`, rewritten pure):** `fillTo(state, tray, k)` · `crumbAt(ref)` = ref.num / ref.den (a position 0…1; for circles the same fraction of a turn) · `landsOn(crumb, d)` → integer k if crumb·d is an integer, else null · `gradeSame(round, k | 'none')` · `gradeMore(round, guess, fills)` · `dashedRecut(ref, d)` → groove positions or null.
- **Gate (`verify-fraction-equiv-core.js`, own oracle, exact rational arithmetic — never floats):** recompute every right answer as the integer k with k/d = ref (cross-multiplication), or none; assert the three impossible rounds have none and the nine others exactly one k; assert which-is-more rounds never equal and the stored "bigger" matches cross-multiplication; assert both trays share one length/diameter constant; assert the bot tallies of §6; assert every EN template fraction equals the model.
- **Mutations:** `landsOn` with floating comparison (0.333… × 3 ≠ 1 trap) · fill not contiguous · stamp accepted when a k exists · "bigger" by numerator only · trays of different lengths in one round · crumb ray measured counter-clockwise in circles · dashed re-cut drawn for an impossible pair · prediction not required before filling in which-is-more · numerator on the ticket judged instead of counted · "no piece fits" rounds in the first four of pass 1.
- **Local test:** real taps filling every k for every round (asserting only the right k passes), stamp in every round, both settings, 7 widths, 11 locales.
- **Pictures:** forest-creatures/mouse (seen on the contact sheet; listed in the theme JSON). **Risks:** sector taps for eighths at 150 px tarts on phones (arc 59 px at the rim, hit sectors extend 20 px outside the rim). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — filling dough, Crumb's crumb drop, the oven, and the honest "it can't be done" shrug.
2. **Teacher on the board?** Yes — equivalence is "ends at the same place", generated by the child, with the important non-examples, and comparison is reasoned (guess first) then proved on the same whole.
3. **Parent trust?** Calm, one library picture, drawn trays, nothing scored.
4. **The invention:** Crumb drops a straight line of crumbs from the end of the first fraction across the second tray — a piece ending on the crumbs is the same amount, and if none can, that cut can't make it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-solved every round with exact rationals: the nine same-amount rounds have exactly one k (2/4, 3/6, 4/8, 2/6, 6/8, 1/2, 3/4, 1/4, 2/3), the three "no piece fits" rounds have none (1/2 and 3/6 in thirds, 2/3 in fourths); the ten which-is-more pairs are never equal, the bigger side is 5 left / 5 right, half same-numerator and half same-denominator; the bot tallies of §6 are right (no bot above 4/12; "smaller denominator wins" and "bigger numerator wins" each 5/10, correct only on their own kind of pair).
- §11 corrected: New 302 is now The Sunny Blinds (a comparison by slats and sunlight), not the knife "Cutting Board" it described — the two remain distinct (no cutting, a crumb line across one shared tray, and the equivalence/"no piece fits" job).
- Distinct from Rows 107/108/170–172 (equal-part checks: mobile, stamp, perforation, dough press, rain table) and from premium fraction-kitchen (cutting with a knife) — confirmed.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
