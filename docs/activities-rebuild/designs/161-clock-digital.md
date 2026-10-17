# Row 161 — Sprocket's Clock: Read the Clock to Five Minutes → THE MINUTE TRAIN (2.MD.C.7)

## 0. Identity
- id `clock-digital.read-five-minute.2-md-c-7` (frozen) · Grade 2 · CCSS 2.MD.C.7 · Measurement & Data · own files `minute-train-core.js`, `minute-train-activity.js`, `minute-train-activity.html`, `minute-train-activities.json` (row leaves `clock-digital-activities.json`; the read-quarter-hour row #162 and the others stay with their own rows). Title/intro frozen en, fr; the other 9 locales' metadata new at build.
- worksheets covered: **G2-249 "What Time Is It?"** (to five minutes), **G2-250 "Quarter Hours"**.
- the old activity: read an analog clock, tap the matching digital time among three near neighbours (3:20 / 3:15 / 3:25). Kept: all nine old times (3:20, 7:05, 10:40, 2:25, 5:50, 8:10, 12:35, 4:55, 9:05) as Level 2, the counting-by-fives idea the page intro names ("the long hand on the 4 means 20, on the 7 means 35"). Changed: the minutes are MEASURED round the rim in five-minute carriages, and the answer is written (no three-option tap).
- **Critic rewrite (2026-10-17):** the first draft's numeral flip-tiles round the rim and its split-flap answer are owned by row 163 ("the flip-tile rim") and row 162's drum numerals; its shaded hour wedge is row 104's / the learning clock's device. The rounds, traps and locale idioms are kept; the instrument is new.

## 1. The pitch
"Just inside the numbers runs a little railway — every carriage is exactly five minutes long, so you send carriages out of the tunnel at the 12 until the train reaches the long hand, and the number on the last roof is the minutes."

## 2. Why a child will want it again
- A big clock with a **toy railway** laid round the inside of its rim: two rails and sleepers in a ring, a **tunnel mouth** at the top just under the 12.
- **Tap the tunnel** and a carriage *chuffs* out and rolls clockwise into place, exactly one number-gap long; the next one couples behind it with a *clunk*. Each new carriage lights a number on its roof — 5, 10, 15, 20 — so the train counts by fives as it grows.
- **The long hand is a level-crossing barrier** (red-and-white stripes where it crosses the rails). When the train's nose reaches it, the next carriage bumps the barrier with a *clank*, shakes and rolls back into the tunnel — the train cannot go further than the long hand.
- **Free play (between rounds) is the best toy of all — the train PUSHES the clock:** every carriage sent out pushes the long hand on five minutes, the short hand creeps, and when the twelfth carriage closes the ring at the top, the whole train toots, empties back into the tunnel, and **the short hand steps into the next number** — an hour has passed. Children run the day round just to see the short hand step.
- Success: the train toots and does one lap of honour round the ring, the digital card glows, Sprocket (farm-animals/rooster) bounces and crows.
- No timer, no score, no streak.

## 3. The skill and the misconception
- **Skill:** read an analog clock to the nearest five minutes (G2-249) and to the quarter hour (G2-250): the minutes are how far the long hand has gone round from the 12, five for every number; the hour is the number the short hand has passed; write the time digitally.
- **Misconceptions and the pushback:**
  1. **Reading the long hand's numeral as minutes** (long hand on the 4 → "3:04"). Four carriages reach the 4 and the last roof says 20; the minute box accepts any number, so "04" is graded and then shown: the train for 4 minutes is not even one carriage.
  2. **Mis-counting by fives** (on the 7 → "30"). Carriages are one number-gap each and couple in order; the roof under the long hand says 35.
  3. **Taking the hour from the number the short hand is NEAREST** (4:55 → "5:55"; 9:45 → "10:45"). On a miss the train **finishes the lap**: pale carriages run on from the long hand to the 12 (one carriage at 4:55, three at 9:45) and only when the ring closes does the short hand step onto the next number — so before that it had not got there.
  4. **Swapping the hands** (reading the long hand as the hour). The short hand gets a thick ink outline and the train shows what the long hand really measures.

## 4. The stage (what is on the screen)
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At **704 px** (stage 660 × 520):
- **Clock** (left, 400 × 400): face 380 px cream, teal rim 8 px; numerals 1–12 Baloo 2 800 30 px; minute ticks. **Railway**: a ring of track (two 2 px ink rails, sleepers every 6°) on a circle 74 % of the face radius (≈ 140 px), i.e. just inside the numerals. **Carriages**: arc-shaped blocks exactly 30° of the ring each (≈ 70 px of track, 26 px deep), teal `#146B5E` with 3 px ink outline and two wheel dots; roof numeral white Baloo 2 800 16 px (5, 10 … 55); the first carriage has a rounded nose. **Tunnel**: a drawn stone arch over the track just clockwise of the 12 (54 × 40), the start of the line. Hour hand coral 12 px wide, 100 px long (it ends inside the ring); minute hand teal 7 px, 165 px long, crossing the rails, with a red-and-white striped band (the barrier) where it crosses them.
- **Train buttons** under the clock: **[+ carriage]** (the tunnel icon, 72 × 56) and **[− carriage]** (72 × 56; sends the last carriage back). Tapping the tunnel itself = +.
- **The card** (right column, 230 × 220): a digital-clock card with an hour box and a minute box (72 × 72 each, 40 px digits) and the locale's separator drawn between them; a number pad (3 × 4, 0–9 + ⌫, 56 × 48 keys) under it. Both boxes start EMPTY.
- **Task line** (22 px): "What time is it? Write it on the card."
- Bubble under the clock.

At **360 px**: clock 320 px face (numerals 24 px; track radius ≈ 118 px, carriages ≈ 60 px of track × 22 px, roof numerals 13 px); train buttons in a row under the clock (64 × 48); card under them with boxes 60 × 60 and the pad 4 × 3 keys 52 × 44. Check above 360 × 740; at 320 × 640 the face is 280 px (carriages ≈ 52 px, roof numerals 12 px) and the pad sits beside the card.

## 5. The hand (every interaction)
- **+ carriage / tap the tunnel**: a carriage rolls out and couples (300 ms roll, *chuff* then *clunk*); its roof numeral lights as it couples. If the next carriage would pass the long hand, it bumps the barrier (120 ms shake, *clank*) and rolls back — the train never passes the long hand in a round. When the long hand is on the 12, the very first carriage bumps (zero minutes).
- **− carriage**: the last carriage uncouples and rolls back into the tunnel.
- The train is a help, not a requirement: the child may write the time without sending a single carriage.
- **Card**: tap a box (or Tab) to focus it; the pad types (two digits; a third replaces); ⌫ deletes. Physical digit keys work.
- **Free play (only between rounds):** the train pushes the clock — each + moves the long hand on five minutes (and the short hand one twelfth of a number-gap); the twelfth carriage closes the ring, the train toots and empties, and the short hand steps to the next number. During a round the hands never move.
- **Undo**: everything until Check.

## 6. The rounds
One round = one clock time. The child reads it (with or without the train), writes the hour and the minutes, presses Check.

**Level 1 — quarter hours (G2-250):**

| # | time | long hand on | short hand between | trap |
|---|---|---|---|---|
| 1 | 3:15 | 3 | 3 and 4 (a quarter of the way) | long hand on the 3 = "3"? |
| 2 | 9:45 | 9 | 9 and 10 (almost 10) | hour read as 10 |
| 3 | 6:30 | 6 | 6 and 7 (halfway) | "6:06" |
| 4 | 12:15 | 3 | 12 and 1 | hands swapped → 3:00 |
| 5 | 4:45 | 9 | 4 and 5 (almost 5) | hour read as 5 |
| 6 | 8:00 | 12 | on the 8 | "8:12" |
| 7 | 11:30 | 6 | 11 and 12 (halfway) | hour read as 12 |
| 8 | 2:45 | 9 | 2 and 3 (almost 3) | hour read as 3 |
| 9 | 7:15 | 3 | 7 and 8 | "7:03" |

**Level 2 — five minutes (G2-249; the old nine):**

| # | time | long hand on | short hand | trap |
|---|---|---|---|---|
| 1 | 3:20 | 4 | a third past 3 | "3:04" |
| 2 | 7:05 | 1 | just past 7 | "7:01" |
| 3 | 10:40 | 8 | two-thirds past 10 | "10:08" |
| 4 | 2:25 | 5 | under halfway past 2 | "2:05" |
| 5 | 5:50 | 10 | almost 6 | hour read as 6 |
| 6 | 8:10 | 2 | just past 8 | "8:02" |
| 7 | 12:35 | 7 | past halfway to 1 | hour read as 1 |
| 8 | 4:55 | 11 | almost 5 | hour read as 5 |
| 9 | 9:05 | 1 | just past 9 | "9:01" |

- **Answer position:** none — two boxes typed from empty. Measured (critic's script, hour-hand angle = 30h + m/2): rounds where the short hand is at or past halfway to the next number are 5/9 in L1 (9:45, 6:30, 4:45, 11:30, 2:45) and 4/9 in L2 (10:40, 5:50, 12:35, 4:55), so "the number the short hand is nearest" fails exactly in those rounds and "always the number before" never wins by itself either (8:00 sits ON its number). The long hand's number differs in every L2 round except the 1 (7:05, 9:05), so the train length varies from 1 to 11 carriages. L1 train lengths: 3, 9, 6, 3, 9, 0, 6, 9, 3 (the 0 is the o'clock round — the first carriage bumps; this is the minutes being 00, not a count).
- **Order:** order-only reshuffle per pass within each level.

## 7. Check, the misses, the success
- **Check with an empty box** → hint, no miss: "Write the hour and the minutes."
- **Miss 1** — what the clock SHOWS depends on which part is wrong:
  - minutes wrong: the train rebuilds itself to the CHILD's minutes — if they are a multiple of five, that many carriages run out and stop with the child's number on the last roof, short of or past the barrier (here, once, it may pass the long hand, drawn pale, to show the overshoot); if not a multiple of five ("04"), a single carriage rolls out only part-way and stops, visibly not a whole carriage. The barrier pulses. Hint: **"Your minutes stop here. Where is the long hand?"**
  - hour wrong (the next hour): **the train finishes the lap** — pale carriages run on from the long hand to the 12 (one per remaining number) and, only when the ring closes, the short hand slides onto the next number for one second, then everything rolls back. Hint: **"The short hand gets to the next number only when the train goes all the way round. Which number has it passed?"**
  - hour wrong (any other number) or hands swapped (hour = the long hand's number): the short hand gets a thick ink outline and blinks twice. Hint: **"The short hand shows the hour."**
- **Miss 2**: the right train builds itself carriage by carriage from the tunnel to the barrier with the counting notes, every roof lit except the LAST, which shows "?" — the child reads 5, 10, 15 … and says the next; the short hand is outlined and the number it has passed is bold. The card stays as the child left it.
- A new move (train or card) clears the help.
- **Success**: the train toots and runs one lap of honour, the card glows, Sprocket bounces and crows. Bubble: **"3:20 — the long hand is on the 4: 5, 10, 15, 20 minutes!"** · L1 quarter: **"9:45 — quarter to 10, and the short hand has passed the 9."** (each line authored per round; the quarter phrase is the locale's own idiom, §9).

## 8. Settings
1. **Times**: quarter hours (Level 1) · five minutes (Level 2).
2. **Roof numbers**: shown (default — each carriage lights 5, 10, 15 …) · hidden (plain carriages; the child counts them by fives) — at rest the railway visibly shows or hides the roof number slots.

## 9. Words
- title: "Sprocket's Clock" (frozen)
- task line: "What time is it? Write it on the card."
- prompt: "Write the hour and the minutes."
- hints: "Write the hour and the minutes." · "Your minutes stop here. Where is the long hand?" · "The short hand gets to the next number only when the train goes all the way round. Which number has it passed?" · "The short hand shows the hour." · (a carriage bumps the barrier, no miss, shown once) "The train can't go past the long hand."
- celebrations: 18 authored lines (pattern above).
- settings: "Times" · "Quarter hours" · "Five minutes" · "Roof numbers" · "Shown" · "Hidden"
- aria: "carriage {k}, {5k} minutes" · "the train reaches the long hand at {5k} minutes" (spoken only when the train touches the barrier — which is the child's own work) · "hour box {h}" · "minute box {mm}" · "long hand on the {n}; short hand between {a} and {b}" (a reading description for screen-reader users — it describes the hands, it does not state the time).
- **Locale traps:** the card separator per locale (en/es/pt/it/de ":", nl/sv/da/no/fi ".", fr « h »: « 3 h 20 »). **The quarter/half idioms are the trap in the celebration lines:** de "Viertel vor zehn" (9:45; regional "dreiviertel zehn"), "halb sieben" = 6:30; nl "kwart voor tien", "half zeven" = 6:30; sv "kvart i tio", "halv sju" = 6:30; da "kvart i ti", "halv syv"; no "kvart på ti", "halv sju"; fi "varttia vaille kymmenen", "puoli seitsemän" = 6:30; fr « dix heures moins le quart », « six heures et demie »; es «las diez menos cuarto», «las seis y media»; pt-BR «quinze para as dez», «seis e meia»; it «le dieci meno un quarto», «le sei e mezza». The success line always leads with the digits so the idiom is only the second half; where an idiom names the NEXT hour (halb, half, halv, puoli, menos, para, moins), the explanatory clause still says the short hand has passed the CURRENT hour — authored per locale with the reviewer. Hour box 1–12 only (no 24-hour on an analog face; a 13 is graded as a wrong hour). The hint "train" word: every locale has a plain word (Zug, trein, tåg, tog, juna, train, tren, trem, treno) — and "carriage" is the toy-train word (Wagen, wagon, vagn, vogn, vaunu, wagon, vagón, vagão, vagone).

## 10. Sound off, access, phones
- Sound off: the carriages, roof numbers, the barrier bump, the pale lap-finish and the stepping short hand carry it; chuffs, clunks, toots and the crow decorate.
- Keyboard: Tab → + carriage → − carriage → hour box → minute box → pad (or digit keys) → Check; boxes `role="textbox"` with `inputmode="numeric"`.
- Taps: train buttons 72 × 56 / 64 × 48, tunnel 64 px hit circle, boxes 72 / 60, pad keys ≥ 44; carriages are not tap targets. Rooster 96 / 64 px (the only library picture). Check above both folds.

## 11. Distinct from
- **#163 Flip-Tile Rim** and **#162 Carry Drums**: no numeral flips, no drums — the minutes are a measured LENGTH of track, built from five-minute units.
- **#104 Echo Slice** and the **learning-clock** (painted swept wedge / arc): nothing is painted; the carriages are countable units the child adds and removes.
- **#101 Hour Road** (the rim unrolled into a straight road of hours; a marker walks it): here the track stays on the clock and measures minutes; the hour is read from the short hand.
- **#103 Pull-Back Key** (wind back to the hour) and **#102** (digits ride the hands): different mechanisms.
- **#10 Animal Train** (counting animals on a train): there a train carries objects to count; here a carriage IS a unit of length (five minutes) on a circular track — the mechanic is measuring, not counting objects.
- **#157 / #160** (siblings): no spring or switchboard.

## 12. Build plan
- **Core state:** `{round:{h,m}, cars:0..11, box:{h:null|int, m:null|int}, miss, free:false}`; `maxCars = m/5`; `addCar()` refuses when `cars === maxCars` (bump); in free play `addCar()` advances the clock 5 minutes and wraps the hour at 12 cars; `grade()` → `{ok, kind:'blank'|'minutes'|'nextHour'|'hour'|'swap'}`; hour truth = h (the last-passed numeral), minute truth = m.
- **Gate truth (verify):** hand angles (hour 30h + m/2, minute 6m) for every round; carriage k spans exactly [30(k−1)°, 30k°]; the nose at `maxCars` carriages lies under the minute hand; roof k = 5k; at-or-past-halfway counts 5/9 (L1) and 4/9 (L2); long-hand numbers in L2 distinct but the 1; boxes start empty; the lap-finish adds exactly 12 − m/5 pale carriages and moves the short hand to h + 1 only at the closing carriage; free play is off during a round.
- **Mutations:** a carriage passes the barrier in a round; roof shows k instead of 5k; hour graded as the NEAREST numeral; hour hand drawn on the hour at :45; free-play pushing active during a round; lap-finish steps the short hand before the ring closes; boxes start with a value; "roof numbers hidden" still lights numbers; aria states the time; reshuffle repeats.
- **Pictures:** farm-animals/rooster (seen). Everything else is apparatus (track, carriages, tunnel, barrier).
- **Risks:** at 320 px a carriage is ≈ 52 px of curved track with a 12 px roof numeral — legible; checked against the hierarchy floor. The "04" partial-carriage animation must be visibly a fraction (stop at 4/5 of one carriage).
- **Blocked:** nothing.

## 13. The four questions
1. **Choose it again?** Yes — a toy railway round a clock, carriages that chuff out and count, a barrier that clanks, and a free-play train that pushes the clock round until an hour pops.
2. **Teacher on the board?** Yes — minutes become a measured distance in fives from the 12, and the next-hour error is answered by finishing the lap: the short hand only reaches the next number when the train closes the ring.
3. **Parent trust?** Calm, honest clock geometry, one library picture, works on a phone.
4. **Invention:** five-minute carriages on a railway round the rim, stopped by the long hand's barrier — the last roof number is the minutes, and finishing the lap is what moves the hour.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 5→5 · correctness 5→5 · distinctness 1→5 · reality 5→5
What changed:
- **Distinctness:** the draft's flip-tile numerals round the rim are row 163's invention, its split-flap answer is flip numerals (#162/#163 territory), and its shaded hour wedge is #104's / the learning clock's device. Rebuilt as THE MINUTE TRAIN: five-minute carriages on a railway inside the rim, the long hand as a barrier, a written answer.
- The next-hour misconception now has a physical answer: the train finishes the lap, and only the closing carriage moves the short hand onto the next number.
- Free play became a real toy (the train pushes the clock round and an hour pops), and is locked during rounds so it cannot be used to find the answer.
- Rounds kept and re-measured (halfway counts 5/9 and 4/9; L2 long-hand numbers distinct except the 1).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
