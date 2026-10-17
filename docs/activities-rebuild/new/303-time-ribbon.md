# New 303 — The Time Ribbon → THE HOUR STICK: a stiff stick exactly one hour long is laid end to end along the ribbon from the start knot — what is left before the end knot is the minutes (3.MD.A.1)

## 0. Identity
- **id** `time-ribbon.play.3-md-a-1` · grade 3 · CCSS 3.MD.A.1 (time intervals in minutes; elapsed time on a number-line diagram) · Measurement & Data · key `time-ribbon` → `time-ribbon-core.js`, `time-ribbon-activity.js`, `time-ribbon-activity.html`, `time-ribbon-activities.json` (start with `node scripts/new-activity.js --num=303`). Own clock and ribbon drawing — 0 lines to the clock cores or `lcs-shell.*`.
- **Worksheets covered:** G3-344 "How Much Time Passed?" (compare the two clocks; write how many hours passed — on the hour or half hour, up to 5 hours, some passing 12 o'clock): the "whole hours" setting is that sheet; the default goes on to hours-and-minutes as 3.MD.A.1 asks.
- New instrument; no old activity. (Critic, 2026-10-17: the first draft tied a ribbon to the minute hand and dropped a loop per full turn — the same invention as Row 199's Winding Tape, laps of tape round the clock = hours, which already covers G3-344. Rebuilt around a different idea: the hour as a rigid UNIT laid along the standard's own number-line diagram.)

## 1. The pitch
"The ribbon runs from the start knot to the end knot; lay hour sticks — each exactly one hour long — end to end from the start knot: as many as lie flat are the hours, a stick that sticks out past the end knot will not lie down, and the little minute comb measures what is left."

## 2. Why a child will want it again
- **Sticks that clack into place.** Pull an hour stick out of the pot and drop it on the ribbon: it slides to the knot (or to the last stick's end) and lands with a wooden *clack*. The start clock above answers at once — its long hand sweeps one whole turn and the short hand steps on one number, the readout flipping 3:45 → 4:45. One stick = one turn of the long hand, every time.
- **The stick that won't lie down.** Try one stick too many and it cannot lie flat: its far end props up on the end knot like a plank on a step, wobbles, and slides back into the pot. Children try it on purpose — the ribbon is simply too short for another hour.
- **The minute comb.** From the last stick's end pull the little comb (a strip with a tick per minute, numbered every 5). It slides out and stops by itself against the end knot with a soft *tock*; a loupe pops up over the knot to show exactly which tick it stopped on. The start clock's long hand follows the comb's tip and, at the knot, the two clocks match and glow.
- **What happened in between.** A library picture hangs on the ribbon between the knots like a charm — the piano practice, the bike ride, the baking — so every round is a little story told without words: *the baking took this long.*
- **End of pass (the show):** the pass's ribbons hang one under another as a day chart, sticks and combs still on them, each with its picture — a 3-hour theatre afternoon is visibly three sticks, a 25-minute read is a short comb. No score.
- **Free play:** between rounds, drag either knot along the ribbon and lay sticks and the comb freely; the clocks follow.

## 3. The skill and the misconception
- **Skill (3.MD.A.1):** find the time interval between a start and an end time in hours and minutes by counting on whole hours from the start, then the remaining minutes — on a number-line diagram, as the standard says — including intervals under an hour, exact hours, intervals that pass an hour number, and (cross-noon setting) morning to afternoon.
- **Misconception 1 — subtract the clock numbers** (3:45 to 5:15 → "5 − 3 = 2 h, 45 − 15 = 30 min"). **Pushback:** the second stick will not lie flat — it sticks out 30 minutes past the 5:15 knot. An hour that starts at 3:45 ends at 4:45, and the stick is rigid: it cannot be squeezed to end at 5:00.
- **Misconception 2 — count the hour numbers passed** (8:40 to 9:05 → "1 hour" because the 9 is crossed). **Pushback:** the ribbon from 8:40 to 9:05 is shorter than ONE stick; the stick props up over the knot at once. The printed 9 on the ribbon is crossed, but no hour fits.
- **Misconception 3 — passing 12 breaks the count** (10:00 to 1:00 → "9 hours" in en). **Pushback:** three sticks lie down end to end across the "12, 1" labels; the ribbon does not care what the labels say.
- **Misconception 4 — minutes counted from the o'clock, not from the last stick** (3:45 → 5:15 as "1 h 15 min"). **Pushback:** the comb can only be pulled from the end of the last stick, never from a printed o'clock label.

## 4. The stage
**At 704 px (one column, full width 680):**
- **Task line** (20 px): **"How much time passes? Lay hour sticks from the start knot, then measure the rest."**
- **The two clocks** (top row, drawn, tool-grade): start clock left and end clock right, each **150 px** face, cream with a teal rim, numerals 1–12 (Baloo 2 18 px), 60 minute ticks (5-minute ticks longer), hour hand coral 7 px, minute hand teal 5 px; a dark digital readout plate under each (Baloo 2 26 px). A coral knot icon beside the start clock, a teal one beside the end clock (apparatus geometry — two small loops), so each clock is paired with its knot by colour. The start clock is the **travelling clock**: it shows the time at the far end of whatever is laid on the ribbon.
- **The context charm** (between the clocks): a library picture at **96 px** (§6), hanging from a short cord that clips onto the ribbon midway between the knots.
- **The ribbon** (middle): a gold satin band 640 × 28 px. Its window runs from the start's o'clock to the hour after the end (3 h for most rounds, 4 h at most in the default, 6 h in whole hours), so 1 h = 160–213 px (default) and 107 px (whole hours, 6-h window). Printed along its lower edge: a short tick every 5 minutes and a small o'clock label (Baloo 2 15 px: "3", "4", "5" in en; "15", "16", "17" in 24-hour locales). The **start knot** (coral bow, 30 px) and the **end knot** (teal bow, 30 px) are tied onto the ribbon at their times when the round begins (the ribbon unspools from the start clock to the end clock in 600 ms and knots itself — the child watches where the knots land).
- **The stick pot** (bottom left, 120 × 110): six identical hour sticks standing in a pot — pale wood, 14 px thick, each exactly one hour long at the round's scale, a small coral cap at one end (the end that goes toward the start). No numbers on the sticks.
- **The minute comb** (parked under the ribbon at the left, tab 44 × 44): a cream strip 14 px tall with a tick per minute and numerals every 5 (Baloo 2 12 px); it slides out from the last stick's end.
- **The knot loupe**: an 96 px round lens that pops above the end knot when the comb stops, magnifying ×4.
- **Answer row** (bottom right): two boxes **[ __ ] h** and **[ __ ] min** (88 × 56 each, the locale's unit after each box), keypad 3 × 4 keys 52 × 48, Check 140 × 56, bubble 18 px.
- No words on the apparatus: numerals on the clocks, ribbon and comb; unit labels only after the answer boxes.

**At 360 px (stacked):** clocks 2 × **112 px** side by side with readouts (22 px) and the charm (**64 px**) between them; ribbon 328 × 24 (1 h = 82 px default at a 4-h window, 109 px at a 3-h window; whole hours 55 px at a 6-h window); o'clock labels 13 px, 5-minute ticks; comb numerals only at 15, 30, 45 (12 px), ticks every 5, minute ticks shown only inside the loupe; stick pot 96 × 80 (each stick a 44 px tall hit band); comb tab 44 × 44; loupe 88 px; answer boxes 2 × 80 × 52; keypad 4 × 3 keys 76 × 46; Check full width 52. Budget 360 × 740: header 56 + task 48 + clocks row 150 + ribbon band (ribbon + labels + comb) 80 + pot/answer row 96 + keypad 100 + Check 52 = 582 ✓. At 320 × 640: clocks 100 px, keys 70 × 44 → 560 ✓.

## 5. The hand
- **Lay a stick:** drag a stick out of the pot (it follows within 16 ms, tilted 8°) and drop it anywhere over the ribbon → it slides to the first free end (the start knot, or the end of the last stick) in 180 ms and lands with a clack. **Tap the pot** = lay the next stick (motor / keyboard path). Each landing: the travelling clock's long hand sweeps one full turn (600 ms) and the short hand steps one number; its readout counts on one hour.
- **The stick that does not fit:** if a stick's far end would pass the end knot, it lands propped on the knot at 12° with a 2-cycle wobble (500 ms), the overhang shown dashed, then slides back into the pot (400 ms). No miss is counted — it is the apparatus answering.
- **Lift a stick:** tap the last laid stick → it goes back to the pot (the clock turns back an hour). Only the last one can be lifted (they are end to end).
- **The comb:** drag its tab right from the end of the last stick (or from the start knot if no stick fits); the comb's tip follows the finger and **stops at the end knot** — it cannot pass it (an 4 px bump). If the gap is a whole number of hours there is nothing to measure: the comb stays parked and the knot glows "nothing left" (a teal ring). When the comb stops, the loupe opens over the knot; the travelling clock's long hand has followed the tip and now matches the end clock (both clocks glow).
- **Type:** the boxes wake once the comb has stopped at the knot (or the last stick has reached it exactly); keypad digits — hours ≤ 1 digit, minutes ≤ 2 digits.
- **Keyboard:** Space/Enter on the pot lays a stick; Backspace lifts the last; → pulls the comb to the knot; Tab to the boxes; Enter = Check.
- **Sound** (bonus): clack per stick, the propped stick's wooden knock, the comb's tock, a bell when the clocks match.

## 6. The rounds
Start → end; the analog faces in 12-hour form; the readouts and ribbon labels in each locale's clock (§9). Each round has one context charm.

**5 minutes (default), cross noon "never", 10 rounds** (a = morning, p = afternoon; 24-hour readouts in brackets):
1. 3:45 p → 5:15 p (15:45 → 17:15) = **1 h 30 min** — `activities/baking`
2. 9:10 a → 9:50 a = **40 min** — `activities/piano`
3. 1:20 p → 4:20 p (13:20 → 16:20) = **3 h** — `activities/theater`
4. 12:40 p → 2:05 p (12:40 → 14:05) = **1 h 25 min** — `activities/puzzle`
5. 8:40 a → 9:05 a = **25 min** — `activities/reading`
6. 2:15 p → 4:45 p (14:15 → 16:45) = **2 h 30 min** — `activities/hiking`
7. 6:55 a → 8:10 a = **1 h 15 min** — `activities/biking`
8. 4:30 p → 6:30 p (16:30 → 18:30) = **2 h** — `activities/playground`
9. 7:05 p → 7:35 p (19:05 → 19:35) = **30 min** — `activities/dancing`
10. 11:05 a → 11:50 a = **45 min** — `activities/violin`
**Cross noon "sometimes"** replaces 4 with **11:30 a → 1:15 p (11:30 → 13:15) = 1 h 45 min** (`activities/camping`) and 10 with **10:50 a → 12:10 p (10:50 → 12:10) = 1 h 20 min** (`activities/gymnastics`); en shows "a.m."/"p.m." on both readouts in these two rounds only.

**Whole hours, 9 rounds** (G3-344 — starts on the hour or half hour, up to 5 h; the comb is hidden and the minutes box shows 0, locked): 1:00 → 4:00 (**3 h**, theater) · 9:30 → 11:30 (**2 h**, hiking) · 2:30 → 7:30 (**5 h**, camping) · 6:00 → 8:00 (**2 h**, playground) · 3:30 → 4:30 (**1 h**, baking) · 8:00 → 11:00 (**3 h**, biking) · 12:30 → 5:30 (**5 h**; in en the labels run 12, 1, 2 …, which is where "5 − 12" breaks; camping) · 7:30 → 9:30 (**2 h**, puzzle) · 4:00 → 8:00 (**4 h**, theater). Cross noon "sometimes" replaces 8:00 → 11:00 with **10:00 → 1:00 (3 h)** and 4:00 → 8:00 with **11:30 → 2:30 (3 h)**.

**To the minute, 9 rounds** (the comb's minute ticks matter; the loupe shows the last ones): 3:47 → 5:12 (**1 h 25 min**) · 9:08 → 9:51 (**43 min**) · 1:26 → 4:26 (**3 h**) · 8:43 → 9:07 (**24 min**) · 2:14 → 3:59 (**1 h 45 min**) · 6:52 → 8:09 (**1 h 17 min**) · 4:38 → 6:38 (**2 h**) · 10:56 → 11:33 (**37 min**) · 12:21 → 1:48 (**1 h 27 min**); charms as in the 5-minute table, by position.

**Measured (critic's solver `work-c38/c303.js`, recomputed from 24-hour minutes):** each 5-minute and to-the-minute table has under-an-hour, exact-hour and hours-and-minutes durations (default 4 / 2 / 4; cross noon 3 / 2 / 5; to the minute 3 / 2 / 4), all durations distinct inside those tables. The **subtract-the-numbers bot** (12-hour hour difference and minute difference without regrouping) is wrong in 4 / 10 (default), 5 / 10 (cross noon) and 5 / 9 (to the minute: the four minute-wraps plus 12:21 → 1:48); the **hours-passed bot** (count the o'clocks crossed as hours) is wrong in 8 / 10, 8 / 10 and 7 / 9. Whole hours: the bot is wrong only where the en labels wrap past 12 (12:30 → 5:30 and, in cross noon, 10:00 → 1:00 and 11:30 → 2:30); in 24-hour locales whole-hour subtraction is honestly right — the sheet's lesson there is reading the two analog clocks. Sticks never exceed 5 (the pot holds 6, so the extra stick is always there to try).
**Answer position:** answers are typed; no position. **Order:** order-only reshuffle per pass, never the same order twice; two under-an-hour rounds never adjacent.

## 7. Check, the misses, the success
- **Check before anything reaches the end knot** → the end knot pulses; bubble **"Lay hour sticks, then pull the comb to the end knot."** (no miss). **Boxes empty** → **"Count the sticks, then read the comb."** (no miss).
- **Miss 1** — each laid stick gets a number badge on its cap (1, 2 …) and the comb's numerals light up to the knot. Bubble **"Each stick is one hour. The comb shows the minutes left over."**
- **Miss 2** — the clocks replay the interval as counting on: the sticks lift and are laid again one by one, the travelling clock's readout stepping 3:45 → 4:45 (one full sweep each), then the comb slides out in 5-minute steps (4:45 → 4:50 → … → 5:15) while a count-on strip under the readouts writes "+1 h", "+30 min". Bubble **"From {start}: count on whole hours, then the minutes."**
- A new key, stick or comb move takes the help away.
- **Success** — the sticks and comb glow, the ribbon ties itself into a bow round the charm, the answer boxes lock in gold. EN: **"From {start} to {end} is {h} h {m} min."** (whole hours: **"…is {h} hours."** / one hour: **"…is 1 hour."**; under an hour: **"…is {m} minutes."**). End of pass: the day chart (§2), **"One stick is one hour — from wherever you start."**

## 8. Settings
1. **Steps:** whole hours / 5 minutes (default) / to the minute — at rest the comb disappears (whole hours), shows 5-minute numerals (default) or gains its minute ticks and the knot loupe (to the minute); the clock faces' minute ticks follow.
2. **Cross noon:** never (default) / sometimes — in "sometimes" two rounds per table pass noon; at rest the ribbon gains a warm afternoon tint to the right of its 12 label (a colour, no picture, no word).

## 9. Words (EN source)
- title **"The Time Ribbon"**
- task **"How much time passes? Lay hour sticks from the start knot, then measure the rest."**
- unit labels after the boxes **"h"**, **"min"**
- hints **"Lay hour sticks, then pull the comb to the end knot."** · **"Count the sticks, then read the comb."** · **"Each stick is one hour. The comb shows the minutes left over."** · **"From {start}: count on whole hours, then the minutes."**
- celebrations **"From {start} to {end} is {h} h {m} min."** · **"From {start} to {end} is {h} hours."** · **"From {start} to {end} is 1 hour."** · **"From {start} to {end} is {m} minutes."** · **"One stick is one hour — from wherever you start."**
- settings **"Steps"**: "whole hours" / "5 minutes" / "to the minute" · **"Cross noon"**: "never" / "sometimes"
- **Locale traps:** (a) **Digital readouts and ribbon labels:** en 12-hour ("3:45"; a.m./p.m. only in cross-noon rounds; ribbon labels 11, 12, 1); de/fr/es/pt/it/nl/sv/da/no/fi 24-hour ("15:45"; ribbon labels 11, 12, 13). The readout imitates a digital display and uses a colon everywhere; **prose** {start}/{end} use the locale's own form (fi/da/no/sv "15.45", fr "15 h 45", de/nl/es/pt/it "15:45"). (b) **Unit abbreviations:** de *Std.*/*Min.*, fr *h*/*min*, es/pt/it *h*/*min*, nl *u*/*min*, sv *tim*/*min*, da *t*/*min*, no *t*/*min*, fi *t*/*min* — reviewer confirms the school form. (c) **Plural with numbers:** the whole-hours celebrations are authored as a "1 hour" string and a "{h} hours" string per locale (fi *1 tunti* / *3 tuntia* — partitive), never pluralised at runtime. (d) **a.m./p.m.** is never translated; the afternoon tint carries the cue in 24-hour locales. (e) **"half past"/"quarter"** are never used (de/nl/sv/da/no/fi "half four" = 3:30 points to the NEXT hour). (f) **"stick", "comb", "knot"** never appear on the apparatus; in the task line the reviewer picks the plainest school word (de *Stundenstab*, fr *baguette d'une heure*, fi *tuntikeppi* …) — the build keeps them out of every other string. (g) The charm pictures are never named in text, so no label/article issue.

## 10. Sound off, access, phones
- Sound off: knots, sticks (and the propped one), the travelling clock, the comb, the loupe and the replay are all visible.
- Keyboard path §5. aria: start clock `"start {start}; the clock now shows {now}"` (live), end clock `"end {end}"`, pot `"hour sticks: {k} laid"`, comb `"minute comb"` (never its reading); answer boxes labelled hours / minutes.
- Taps: pot and comb tab ≥ 44 px; sticks have 44 px hit bands; keys ≥ 46 × 44; boxes ≥ 80 × 52. Charm pictures 96 px at 704 / 64 px at 360 (floors met); everything else is apparatus.
- Check above the fold (§4).

## 11. Distinct from
- **Row 199 The Winding Tape** (G3-344's other home): a tape pulled round the clock face, hours as laps. Here nothing goes round the clock — the time is laid out flat on a ribbon and measured with a rigid one-hour unit, the way a length is measured with a ruler; the clock only reports where the sticks end.
- **Row 198 The O'Clock Posts:** hops on a time line that stop at every o'clock (the "to the next hour" strategy). Here there are no posts at all — the o'clock labels are only print, and a stick laid from 3:45 passes the 4 without stopping. Two different strategies for one standard: 198 decomposes at the o'clock, 303 counts whole hours from the start.
- **Row 101 The Hour Road**, **Row 162 The Carry Drums**, **Row 158 The Day Wheel**, **New 273 The Week-Drop Calendar**, **New 218 The Word Ribbon** (a writing ribbon). **tool `open-number-line`** (free jumps the child draws; the +10 writes itself) — here the unit is rigid and given, and the misfit is the lesson. **tool `learning-clock`**, **tool `class-timer`** — no interval measured.

## 12. Build plan
- **Core state:** `{ steps, noon, round:{start, end, charm}, window:{from, to}, sticks, combMin, typedH, typedM, misses }`.
- **Functions:** `duration(start, end)` (mod 720, > 0); `windowFor(round)` (start's o'clock → hour after end); `minToX(min)`; `laySticks()` → succeeds iff `(sticks + 1) × 60 ≤ duration`, else returns `{fits:false, overhang: (sticks + 1) × 60 − duration}`; `liftStick()`; `pullComb()` → `combMin = duration − 60 × sticks` (only when the next stick does not fit); `travelling()` = start + 60 × sticks + combMin; `matches()` = travelling() === end (going forward); `formatTime(t, locale)`; `check()`.
- **Gate (own truth):** durations recomputed from 24-hour minutes; a stick lies flat only while it fits; the comb only pulls when no further stick fits and stops exactly at duration; after a complete measurement sticks = floor(duration / 60) and comb = duration mod 60; the bots (§6) wrong as counted; every 5-minute and to-the-minute table has < 1 h, exact-hour and mixed durations; cross-noon rounds exactly the two named per table; readout and label formats per locale (24-hour outside en; a.m./p.m. only in en cross-noon rounds); charm pictures ≥ 96 / 64 px; the ribbon window ≤ 4 h (default) / 6 h (whole hours).
- **Mutations (each killed):** a stick laid from the o'clock label instead of the start knot · a stick allowed to overhang the end knot · the comb pulled from an o'clock label · the comb passing the knot · the travelling clock not turning a full sweep per stick · boxes awake before the knot is reached · 24-hour readout in en · a.m./p.m. outside en · "half past" phrasing anywhere · same order twice.
- **Pictures:** `activities/baking, piano, theater, puzzle, reading, hiking, biking, playground, dancing, violin, camping, gymnastics` (all in activities.json; seen on the contact sheet — baking is a girl baker, theater a stage with curtains). Not used: `activities/picnic`, `painting`, `swimming`, `singing` (unlabelled). Clock, ribbon, knots, sticks, comb are apparatus. **Risks:** the 360 ribbon puts 5 minutes at 6.8 px — the comb stops itself at the knot and the loupe does the fine reading, so no 5-minute precision is ever demanded of a finger. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — clacking hour sticks onto a ribbon, watching the clock spin a whole turn for each, and finding the one that refuses to lie down is a toy; the charm makes every round a tiny story.
2. **Teacher on the board?** Yes — elapsed time on the standard's number-line diagram, counting on whole hours from the start and then minutes; "subtract the numbers" and "count the hours crossed" refuted by a rigid stick that does not fit.
3. **Parent trust?** Calm, clean tool-grade clocks, library pictures only, no timer, no score.
4. **Invention:** an hour is a stiff stick exactly one hour long, laid from the start knot — however many lie flat are the hours, and the comb measures what is left.

## 14. Critic review (2026-10-17)
Scores before → after: invention 3→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 1→5 · reality 5→5
What changed:
- **Distinctness:** the first draft's ribbon-on-the-minute-hand-dropping-a-loop-per-turn was Row 199's Winding Tape (laps of tape round the clock = hours) in a new colour, for the same worksheet. Rebuilt as THE HOUR STICK: a rigid one-hour unit iterated along a flat time ribbon from the start knot (CCSS's own number-line model), with a minute comb that stops itself at the end knot — distinct from 199 (laps) and 198 (o'clock posts).
- The misconceptions are now refuted by physics: the extra stick props up over the end knot and slides back; the comb cannot be pulled from an o'clock label.
- Added a context charm (library activity picture) per round so the interval is a story legible with the sound off; all twelve verified in activities.json.
- Round tables re-solved (`work-c38/c303.js`); the to-the-minute subtract-bot count corrected (5 / 9, not 4); whole-hour subtraction is honestly right in 24-hour locales and this is now stated rather than claimed as a trap.
