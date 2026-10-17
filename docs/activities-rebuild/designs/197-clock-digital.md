# Row 197 — Sprocket's Clock (to the minute): THE CLOCK LOUPE AND THE THREE-WHEEL TICKET (3.MD.A.1)

## 0. Identity
- id `clock-digital.read-minute.3-md-a-1` (KEPT; slugs/metadata frozen en, fr; de/es/pt/it/nl/sv/da/no/fi need new slug, title and intro at build, grade 3) · grade 3 · CCSS 3.MD.A.1 (tell and write time to the nearest minute) · strand Measurement & Data.
- own files at rebuild: `clock-loupe-core.js`, `clock-loupe-activity.js`, `.html`, `clock-loupe-activities.json` (this row moves out of `clock-digital-activities.json`; the other clock-digital rows stay there). 0 lines to `clock-digital-core.js`, `lcs-shell.*` or any shared core.
- worksheets it covers: **G3-354 "To the Minute"** ("Read each clock. Circle the matching time") — every round is a clock to read to the minute; the sheet's foils (hour one off, hands swapped, minute one five-mark off) are exactly the wrong tickets the misses diagnose (§7).
- **old activity:** an analog clock with minute marks; tap one of three digital times. **Kept:** all nine old times (3:23, 7:47, 10:08, 2:34, 5:52, 8:17→8:19, 12:41, 4:06, 9:28), the minute-marked face, Sprocket. **Changed:** the child builds the time instead of choosing it — the old three options always shared the hour (so the hour was never read) and the right one was always the middle time (measured 9/9: a "pick the middle" bot was perfect). **Dropped:** the options.

## 1. The pitch
"Slide the loupe onto a hand and the gap it points into grows big under the glass — then set the ticket's three wheels: the hour the short hand has passed, the fives up to the number the long hand has passed, and the little marks after it."

## 2. Why a child will want it again
- **A jeweller's loupe.** A round brass-rimmed magnifier (drawn apparatus) rests beside the clock. Drag it anywhere round the rim and the rim under the glass swells to 1.5× — numerals, little minute marks, the hand's tip. Sliding it round a clock is irresistible; children hunt for the hands with it.
- **The ticket with three wheels.** Sprocket's time ticket is a little machine: an hour wheel, a fives wheel and a ones wheel, each a rolling drum you flick up or down with a satisfying detent *tick*. The minutes are literally built as fives + ones — the way a reader counts.
- **The count-through.** On a right answer the loupe glides round the rim from the 12 by itself, stopping at each number with a soft *tock* while the fives wheel rolls 5, 10, 15 … in step, then creeps mark by mark (*tik, tik*) while the ones wheel rolls — and lands exactly on the long hand. Sprocket (the library farm-animals/rooster) crows (a hop and wing-flap bounce).
- **Free play:** the loupe can roam the rim between rounds; a second tap on the loupe's handle flips it to "x-ray": it shows the five-count under each numeral it passes.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (3.MD.A.1):** tell and write time to the nearest minute from an analog clock: the hour is the number the short hand has passed; the minutes are the fives up to the last number the long hand has passed, plus one for each small mark after it.
- **Misconceptions and the pushback:**
  1. *Hour = the nearest number* (7:47 read as 8:47). The loupe on the short hand shows it plainly *between* 7 and 8, not yet on 8. A ticket with 8 fails the count-through: the loupe lands on the long hand but the hour stop lands on the 8 with the short hand visibly short of it (§7). Rounds: 5 of 10 at level 2 have the short hand past halfway to the next number (2:34, 12:41, 7:47, 5:52, 6:58), and 4 of 9 at level 1.
  2. *Minutes = nearest number × 5* (3:23 read as 3:25). The ones wheel only goes 0–4: the child has to count the marks after the passed number, and the loupe makes the marks big enough to count. "Nearest numeral" bot: 0/9 and 0/10.
  3. *Reading the numeral itself as minutes* (the long hand on 4 read as "4 minutes"). The fives wheel shows 00…55, not 1…12; the count-through visibly rolls 5, 10, 15, 20 at the 1, 2, 3, 4.
  4. *Swapping the hands.* The loupe tags whichever hand it docks on by its shape (short & thick vs long & thin), and the ticket wheels are colour- and shape-linked (hour wheel teal like the short hand; fives+ones coral like the long hand).

## 4. The stage
**At 704 (layout `split`).** Apparatus column 452 px, side column 200 px.
- **The clock** (380 px diameter, centred in the apparatus): cream face, teal rim 6 px; numerals 1–12 at 30 px Baloo; 60 minute marks (every fifth long, 14 px; others 8 px, 2.5 px ink); short hand teal, thick (9 px, 34% of radius → 65 px); long hand coral, thin (5 px, 88% → 167 px); centre cap 14 px. When the "five-counts on the rim" setting is on, a faint outer ring shows 05, 10 … 55 and 00 in 14 px teal-grey outside each numeral.
- **The loupe** (lens 150 px, brass ring 8 px, handle 60 px) resting at the clock's lower right. Docked on a hand it shows the rim around the hand's tip at 1.5× (for the short hand: the arc between the two numerals it lies between). Why 1.5× and not more: one number-gap (30°) at the mark radius (≈ 175 px) is 92 px of rim; at 1.5× that is 137 px and fits the 150 px lens with both numerals in view — at 3× (the designer's figure) it is 275 px and the lens would show one numeral and a stretch of marks with no landmark.
- **Side column:** Sprocket (farm-animals/rooster, 96 px) above **the ticket** (200 × 170): three wheel windows side by side — hour (56 px wide, teal frame), a colon, fives (64 px, coral frame), a small "+" glyph, ones (48 px, coral frame) — digits 40 px; ▲/▼ buttons (44 × 44) above and below each wheel. Under the ticket, the **readout** (a digital-clock strip 180 × 52) that shows the time the wheels make, e.g. "7:47" (fives + ones added; blank until all three wheels are set). Then the bubble.
- **Task line** (20 px): "What time is it? Set the ticket's wheels."
- No words on the apparatus; numerals are the content.

**At 360 (stacked).** Clock 300 px (numerals 24 px, marks 7/12 px, long hand 132 px); loupe lens 116 px (1.5×: a number-gap at the 138 px mark radius is 72 px → 108 px in the lens) resting under the clock's right edge (never covering a hand at rest); ticket row full width 328 × 140 (wheels 64/72/56 wide, ▲▼ 44 px); readout strip 160 × 44 to the right of Sprocket (64 px). Check at ≈ 690 (360 × 740 ✓). At 320 × 640: clock 260 px, ticket 120 tall → Check ≈ 610 ✓.

## 5. The hand
- **Drag the loupe:** it follows the finger, magnifying live (60 fps, CSS transform of a cloned face — not a bitmap). Near a hand (within 30°) it docks with a *click* onto that hand's tip and labels nothing in words — the lens frame turns teal for the short hand and coral for the long hand.
- **Inside the docked loupe:** the two numerals around the tip, the four small marks between them and the tip itself, at 1.5×; each tap anywhere on the lens lights the NEXT mark after the passed numeral (tik, 1, 2, 3 …), so the child counts by tapping without having to hit a 2.5 px mark; a fifth tap (or a tap past the tip) clears them. A counting aid, not an answer — the ticket is the answer, and the lit marks never stop at the tip by themselves.
- **Wheels:** tap ▲/▼ or swipe the drum; each detent *tick* within 50 ms; hour wheel 1–12 (wraps), fives 00–55 in steps of 5 (wraps), ones 0–4 (wraps). Each wheel starts blank ("–"); the first touch sets it to its middle value (6, 30, 2) so the start value never hints.
- **Readout:** updates as soon as all three are set (hour : fives + ones).
- **Keyboard:** Tab to each wheel, ↑/↓ to roll; L to bring the loupe to the next hand (cycles short → long → rest).
- **Free play:** loupe roams; handle double-tap = x-ray (five-counts under numerals in the lens).

## 6. The rounds
**Level "near a number" (9 rounds; minutes always 1–2 marks past a number):** 3:21 · 10:07 · 6:32 · 1:16 · 8:42 · 11:51 · 4:26 · 9:02 · 12:47.
**Level "any minute" (10 rounds; 1–4 marks past, near-the-hour and just-past-the-hour times):** 3:23 · 7:47 · 10:08 · 2:34 · 5:52 · 8:19 · 12:41 · 4:06 · 9:28 · 6:58.

Measured (`work-37/clock197.js`): every hour 1–12 appears across the 19 rounds at most twice; minutes fall in all four quarters of the dial (near: 2/3/2/2, any: 2/3/2/3); ones counts at level 2 spread 1/2/3/4 = 2/2/4/2 rounds; the "nearest numeral" reader gets 0/9 and 0/10 exactly right and reads the hour wrong in 4 of 9 and 5 of 10 (every time after half past). 9:02 is the "the long hand has only passed the 12 → 00 + 2" case; 6:58 has the short hand almost on the 7.

**Answer position:** no options — the ticket is built from wheels whose start state is blank, so there is no position to learn. **Order:** order-only reshuffle per pass, never the same twice.

## 7. Check, the misses, the success
- **Check with a wheel blank:** the blank wheel wiggles; hint "Set all three wheels first." No miss.
- **Miss 1 — the apparatus replays the child's own ticket** (the count-through, but for the WRONG ticket): the loupe glides from 12 counting the child's fives to the numeral they implied, then their ones; it stops where their minutes are — and that spot is visibly off the long hand (a gap drawn between loupe centre and tip), or the hour stop lands on a numeral the short hand has not reached. Only the wrong part replays:
  - hour wrong → the loupe docks on the short hand, the arc from the passed numeral to the tip glows teal, the next numeral is outlined dashed: hint "The short hand has passed the {h} but not reached the {h+1} yet."
  - fives wrong → the loupe counts fives from 12 and stops on the numeral the long hand has passed, the fives wheel rolling alongside to the right value — then rolls back to the child's value: hint "Count by fives up to the last number the long hand has passed."
  - ones wrong → in the docked loupe the marks light one by one from the passed numeral to the tip: hint "Count the little marks after that number, one by one."
- **Miss 2:** the five-count ring appears on the rim (if off) and the docked loupe keeps its lit marks; hint "Fives to the {numeral}, then the little marks: {fivesValue} and {ones} more." (still the child sets the wheels).
- A wheel change clears the replay marks until the next Check.
- **Success:** the count-through (§2) runs with the RIGHT ticket and ends on the hand; Sprocket crows; sentence "Yes! It is {h}:{mm}. The short hand has passed the {h}; the long hand has gone {fives} + {ones} = {m} minutes." e.g. "Yes! It is 7:47. The short hand has passed the 7; the long hand has gone 45 + 2 = 47 minutes." (No "past/to" idiom in any locale — de *dreizehn vor acht*, sv *tretton i åtta*, nl *dertien voor acht*, fr *huit heures moins treize*, no *tretten på åtte* all read 7:47 relative to the NEXT hour and would contradict the counting method; the sentence is arithmetic, which every locale says the same way.)

## 8. Settings
1. **Times:** *near a number* / *any minute*. Visible at rest: in *near a number* the ones wheel has only three detents (0, 1, 2) drawn on its drum; in *any minute* five (0–4).
2. **Five-counts:** *on the rim* (outer ring 05 … 55) / *hidden*. Visible at rest.

## 9. Words (EN source)
- title (frozen en): "Sprocket's Clock — Read the Clock to the Minute"; header short: "Sprocket's Clock".
- task line: "What time is it? Set the ticket's wheels."
- hints / success: as §7.
- settings: "Times" — "near a number" / "any minute"; "Five-counts" — "on the rim" / "hidden".
- aria: clock "The short hand is between the {h} and the {h+1}. The long hand is {ones} marks past the {n}." (kept idea from the old `srReadOffMark`); wheels "hour", "fives of minutes", "extra minutes".

**Locale traps.**
- **Digital format:** de/da/no/sv/fi/nl write times with a dot or colon by convention (de *7.47 Uhr* in many books, sv *07.47*, fi *7.47*); fr *7 h 47*; es/pt/it *7:47*. The readout and success line use each locale's school format (author per locale; the separator glyph is a field, not a hard-coded ":"); 12-hour face everywhere (no a.m./p.m. here — that is Row 158).
- **Time words differ wildly** (de *dreizehn vor acht*, nl *dertien voor acht*, sv *tretton i åtta* for 7:47; fr *huit heures moins treize*). The success line uses the DIGITAL form plus "{fives} and {ones} more minutes past {h}" in plain counting words — never the locale's "to the hour" idiom, which would contradict the counting method and differs per country. Native reviewers check that "minutes past" is said naturally (de *Minuten nach 7*, fr *minutes après 7 h*, fi *minuuttia yli 7*).
- **Short/long hand names:** de *kleiner/großer Zeiger*, fr *petite/grande aiguille*, es *manecilla corta/larga* (MX also *horario/minutero*), sv *timvisare/minutvisare*, fi *tuntiviisari/minuuttiviisari* — kept from the old strings where they exist.
- Numerals: Arabic digits everywhere; the fives ring uses two-digit "05".

## 10. Sound off, access, phones
- Sound off: everything is drawn (loupe docking colour, lit marks, rolling wheels, count-through). TTS (5 locales) reads only the success time.
- Keyboard path §5; aria-live reads the clock description and each wheel value.
- Taps: ▲▼ 44 × 44; loupe handle ≥ 60 px; marks are never tap targets (one minute is 6° = 14 px of rim on the 300 px clock, 22 px in the loupe — below 44): the whole 116/150 px lens is one tap target that lights the next mark.
- Pictures: Sprocket (farm-animals/rooster) 96 px at 704, 64 px at 360 ✓. No other pictures.
- Phone layout: stacked; ticket full width; the loupe rests below the clock.

## 11. Distinct from
- **Row 161 Flip Tiles / Row 163 Flip-Tile Rim** (fives printed on the backs of numeral tiles, flipped in order); **Row 101 Hour Road** (rim unrolled); **Row 102 Digits That Ride the Hands**; **Row 160 Drive Cables** (a chosen card drives ghost hands); **Row 162 Carry Drums** (an odometer geared to the hands). Here nothing is chosen and nothing is printed on the numerals: the child magnifies the gap a hand points into and composes the minutes as fives + ones on wheels whose ranges (00–55, 0–4) ARE the method.
- **Rows 198 / 199** (this batch) use the same Sprocket clock face but other inventions (o'clock posts on a time line; the sand-timer shelf) and other skills (adding/subtracting and measuring intervals, not reading).
- **Premium tool Learning Clock** (drag geared hands, it speaks the time) — here the hands never move; the child reads them.
- Not in REGISTRY-BUILT.

## 12. Build plan
- **Core state:** `{ level, ring, round:{h,m}, wheels:{h:null|1..12, f:null|0..55, o:null|0..4}, loupe:{dock:null|'short'|'long', lit:Set}, misses }`.
- **Core functions:** `handAngles(h,m)` (short = 30h + 0.5m, long = 6m); `passed(h,m)` → `{hourNum:h, fiveNum:floor(m/5), ones:m%5}`; `ticketTime(wheels)` → minutes; `grade(wheels)` → `{hour:ok, fives:ok, ones:ok}`; `countThrough(wheels)` → the list of stops the loupe animates (so the replay of a wrong ticket and the success are one function); `loupeView(angle)` → which numerals/marks the lens shows.
- **verify gate (own oracle):** recomputes every round's correct wheels with its own arithmetic; asserts level 1 ones ∈ {1,2}; level 2 ones span 1–4; ≥ 3 level-2 rounds with m ≥ 45; each hour ≤ 2 times overall; nearest-numeral bot 0 per level; `countThrough` of the right ticket ends within 0.5° of the long hand and of a wrong-hour ticket at a numeral ≠ the passed one; ones wheel cannot exceed 4.
- **Mutations:** hour graded by nearest numeral · fives wheel accepts the numeral (1–12) · ones wheel allows 5–9 · count-through ends on the child's ticket on success (instead of the hand) · wheels start pre-set to the answer · loupe docks on the wrong hand · readout adds fives and ones wrongly when ones = 0 · near-a-number rounds include 3–4 marks · reshuffle repeats a pass.
- **Local test:** every round, real pointer on every ▲▼ at all widths; loupe drag-docks on both hands; ticket never overflows at 320; Check above the fold.
- **Pictures:** farm-animals/rooster (Sprocket; seen on farm-animals sheet).
- **Risks:** the 1.5× lens must render crisp (draw the face as SVG twice, the lens copy scaled inside a circular clipPath) — never a scaled bitmap.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a magnifying loupe to slide round a clock, rolling ticket wheels, and a count-through that lands exactly on the hand.
2. **Would a teacher put it on the board?** Yes — it is the reading method made visible: hour passed, fives to the last number, marks after it; and the half-past hour trap is shown, not lectured.
3. **Would a parent trust it?** One calm clock, Sprocket from the library, no options to guess, school time formats per country.
4. **The invention:** a loupe that makes the gap a hand points into big enough to read, and a ticket whose three wheels — hour, fives, ones — are the reading method itself.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- The loupe's numbers were impossible: a 3× view of one number-gap is 275 px in a 140 px lens, and the design's "one minute = 3.9 px at the rim" is wrong (it is 14 px on a 300 px clock). Re-solved: 1.5×, lens 150 / 116, both numerals in view; marks lit by successive taps on the whole lens (no 2.5 px targets).
- The success line no longer uses "minutes past {h}" — the to-the-next-hour idioms of de/nl/sv/da/no/fr contradict it; it now states the arithmetic (45 + 2 = 47).
- Re-measured every round (`work-c37` by hand + script): ones counts 1/2 only in "near a number", 1–4 spread 2/2/4/2 in "any minute", each hour ≤ 2 times, the nearest-numeral reader 0/9 and 0/10 and wrong on the hour in every after-half round (4 and 5). The old live activity's middle-option tell (9/9) is real and is why the options are gone.
- Distinct from the clocks designed in rows 101–104 and 158–163 and from the premium Learning Clock (hands are never moved here; nothing is printed on the numerals; the wheels are inputs, not drums geared to the hands as in 162).
