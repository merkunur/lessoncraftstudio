# Row 199 — Sprocket's Clock (what time will it be? how much time passed?): THE SAND-TIMER SHELF (3.MD.A.1)

## 0. Identity
- id `clock-elapsed.what-time.3-md-a-1` (KEPT; slugs/metadata frozen en/de/fr/es/pt/it/nl; sv/da/no/fi slug, title and intro new at build, grade 3) · grade 3 · CCSS 3.MD.A.1 (measure time intervals in minutes; solve elapsed-time problems) · strand Measurement & Data.
- own files at rebuild: `clock-sand-core.js`, `clock-sand-activity.js`, `.html`, `clock-sand-activities.json` (the row leaves `clock-elapsed-activities.json`, which is then empty — `[]` — once row 198 also moves). 0 lines to `clock-elapsed-core.js` or `lcs-shell.*`.
- worksheets it covers: **G3-344 "How Much Time Passed?"** ("Compare the two clocks. Write how many hours passed" — level 1 whole hours up to 3, level 3 starts at :00/:30, up to 5 hours, two cards past 12 o'clock): level 2 here, with whole-hour, hour-and-minute and minute-only gaps, four of them past 12.
- **old activity:** a start clock, "what time will it be in N minutes?", tap one of three digital times. **Kept:** the nine old rounds' start/duration pairs (3:00+30, 3:45+30, 10:50+20, 2:15+45, 8:30+25, 11:40+30, 1:05+50 verbatim; 7:20+15 → 7:50+15 and 5:10+40 → 5:35+40 so they cross the hour), Sprocket, the clock face. **Changed:** no options — the right one was the middle time in 9 of 9 rounds (measured); the child runs the clock with sand timers and writes the result. **Added:** "how much time passed?" (the teaching point this row carries and G3-344).
- **Critic note (2026-10-17):** the first design here was a measuring tape wound round the rim, one lap per hour — a twin of New 303 The Time Ribbon (a ribbon knotted at the start, one loop per hour, same standard, same worksheet). Re-designed from §1 on; the rounds and the locale work are kept.

## 1. The pitch
"Three sand timers on Sprocket's shelf — an hour, a quarter of an hour and five minutes: flip one onto the clock and the hands run exactly as long as its sand, so what time it will be is the clock after your timers, and how much time passed is the timers it took."

## 2. Why a child will want it again
- **Sand timers are irresistible.** A tall hour glass, a middle quarter glass and a small five glass stand on a wooden shelf (drawn apparatus: two glass bulbs, a waist, flat sand colour). Drag one onto the clock — or tap it — and it flips into the cradle above the 12 with a *clunk*; the sand pours with a soft hiss, and while it pours Sprocket's hands run: the long hand sweeps, the short hand creeps. The hour glass sends the long hand all the way round. Children pour a five glass just to watch the long hand step from one number to the next.
- **The shelf trades up.** Empty glasses stand in a row on the used shelf. Three five glasses side by side slide together and *clink* into one quarter glass; four quarter glasses clink into one hour glass. Children pour fives on purpose to watch them trade up — and see that four quarters ARE an hour.
- **The chase.** In "how much time passed?" a second clock shows where to go. Pour, pour, pour — the moment the hands match it, the second clock glows and rings. Overshoot and its hands appear as a dashed ghost behind you; tap your last glass to un-pour it.
- **Earned moment:** on success every used glass flips upright in a wave (the sand runs back up — time wound back) and Sprocket (library farm-animals/rooster) crows.
- **Free play:** after a round the shelf stays live: pour anything, un-pour, watch the hands and the trades.
- No timer, score, streak or lives (the sand timers measure the CLOCK's time, never the child's; nothing ever counts down at the child).

## 3. The skill and the misconception
- **Skill (3.MD.A.1):** count on from a start time to find an end time (level 1), and measure the time between two times in hours and minutes (level 2), across the hour and across 12 — by chunking: whole hours, quarters, fives.
- **Misconceptions and the pushback:**
  1. *Subtract the digits* ("8:40 to 9:10 is 1 hour −30"; "11 to 2 is −9 hours"). The timers never subtract: they run the clock forward from the start until it matches, so 8:40 → 9:10 takes two quarter glasses (30 min) and 11:00 → 2:00 takes three hour glasses. A "subtract the digits" bot is right in 3/10 level-2 rounds only (the three that cross nothing).
  2. *The hour does not change when the minutes pass 12* ("3:45 + 30 = 3:15"). While the sand runs, the long hand passes the 12 and the short hand visibly passes the next number. A "no-carry" bot is right in 3/10 level-1 rounds.
  3. *60 minutes is not an hour / minutes above 59* ("1 h 60 min"). Four quarter glasses trade into one hour glass on the shelf, three fives into a quarter; the ticket's minute wheel stops at 55.
  4. *12 → 1 is a step back.* Crossing 12 is just more sand (rounds 11:40 + 30, 12:30 → 1:45, 11:20 → 12:05, 9:30 → 2:30, 11:00 → 2:00).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 (stacked layout).** Apparatus column 452, side column 200 beside it inside the stage, bubble under the stage.
- **The question card** (level 1, above the clock, 452 × 44): "in 30 min" with a forward arrow glyph (numerals + abbreviation — content).
- **The clock** (300 px face, cream, teal rim 6 px; numerals 26 px; 60 minute marks; short teal / long coral hands) with the **cradle** above its 12: a wooden bracket 70 × 120 where a flipped timer pours.
- **The source shelf** (under the clock, 452 × 130): three timers, drawn glasses 64 × 118 (hour), 54 × 96 (quarter), 46 × 78 (five), each value printed on its wooden base in numerals + abbreviation ("1 h", "15 min", "5 min" — content). Sizes differ AND the bases are labelled — size alone never carries the value.
- **The used shelf** (452 × 92): emptied timers stand left to right in pour order at 0.65 scale; after every trade the row re-packs. Capacity: the trades keep it canonical — at most 5 hour + 3 quarter + 2 five glasses = 10 (the longest round is 5 h), ≤ 42 px each → fits.
- **Side column:** level 2's **end clock** (140 px, same style, no cradle); Sprocket (96 px); **the ticket** (200 × 130): level 1 = new time (hour wheel 1–12, minute wheel 00–55 in fives); level 2 = time passed (hours wheel 0–5, minutes wheel 00–55 in fives) with the locale's h / min abbreviations as wheel captions; ▲▼ 44 px; digits 34 px. Then the bubble.
- **Task line** (20 px): L1 "Run the clock with the sand timers. What time will it be?" · L2 "Run the clock to the second clock's time. How much time passed?"
- No words on the apparatus besides numerals and the h / min abbreviations (content).

**At 360 (stacked).** Level 1: card 328 × 36, clock 220 (numerals 20 px) with the cradle at its top right; level 2: clock 190 + end clock 110 side by side (302 px); source shelf 328 × 104 (timers 58 × 100, 50 × 84, 44 × 70 — every one ≥ 44 wide); used shelf 328 × 64 (0.5 scale; the last glass has a 44 px tap zone for un-pour); Sprocket 64 px beside the ticket (328 × 100); Check. Budget L1: header 50 + task 44 + card 36 + clock 220 + source 104 + used 64 + ticket 100 + Check 52 = 670 ✓ (360 × 740); L2: 50 + 44 + 190 + 104 + 64 + 100 + 52 = 604 ✓. At 320 × 640: clock 190 / 170 + 96, timers 52 / 46 / 44 wide → Check ≈ 625 ✓.

## 5. The hand
- **Pour:** drag a source timer onto the clock (or tap it; Enter on focus) → it flips into the cradle (180 ms) and pours: hour 900 ms, quarter 450 ms, five 250 ms. The hands run in step with the sand (long hand +6° per minute, short hand +0.5°), from one source of truth: the core's `handsAt(start, minutes)`. The emptied timer drops onto the used shelf (150 ms). Pours queue; a second tap on the cradle completes the current pour at once.
- **Trade up:** after a pour, three five glasses on the used shelf slide together and become one quarter glass (*clink*, 400 ms); four quarter glasses become one hour glass. The shelf is always hours · quarters · fives. The total never changes (the hands do not move during a trade).
- **Un-pour:** tap the last timer on the used shelf → it flips back into the cradle, the sand runs up and the hands run back by its value. Un-pouring a traded glass first un-trades it (the hour glass splits back into four quarters, the last of which un-pours).
- **Overshoot (level 2):** when the run passes the end clock's time, the end time's hands appear as a dashed ghost on the big clock and the passed-over arc is shaded coral — nothing blocks; un-pour fixes it. Match → the end clock glows and rings once.
- **Ticket wheels:** start blank; first touch → middle value (6 / 30, or 2 / 30 for durations); ▲▼ detents.
- **Keyboard:** Tab to a source timer, Enter pours; Backspace un-pours; Tab to the wheels, ↑/↓.
- **Free play:** after a round, pour and un-pour freely.

## 6. The rounds
**Level 1 — "What time will it be?" (10 rounds; count on):**

| # | start | in | new time | crosses | fewest timers |
|---|---|---|---|---|---|
| 1 | 3:00 | 30 min | 3:30 | — | 15 + 15 |
| 2 | 3:45 | 30 min | 4:15 | the 12 | 15 + 15 |
| 3 | 7:50 | 15 min | 8:05 | the 12 | 15 |
| 4 | 10:50 | 20 min | 11:10 | the 12 | 15 + 5 |
| 5 | 2:15 | 45 min | 3:00 | lands on the 12 | 15 + 15 + 15 |
| 6 | 5:35 | 40 min | 6:15 | the 12 | 15 + 15 + 5 + 5 |
| 7 | 8:30 | 25 min | 8:55 | — | 15 + 5 + 5 |
| 8 | 11:40 | 30 min | 12:10 | the 12, 11 → 12 | 15 + 15 |
| 9 | 1:05 | 50 min | 1:55 | — | 15 + 15 + 15 + 5 |
| 10 | 9:55 | 15 min | 10:10 | the 12 | 15 |

**Level 2 — "How much time passed?" (10 rounds; two clocks):**

| # | start | end | time passed | fewest timers |
|---|---|---|---|---|
| 1 | 2:00 | 5:00 | 3 h | 3 × 1 h |
| 2 | 11:00 | 2:00 | 3 h (past 12) | 3 × 1 h |
| 3 | 7:30 | 9:00 | 1 h 30 min | 1 h + 15 + 15 |
| 4 | 10:30 | 12:30 | 2 h | 2 × 1 h |
| 5 | 4:15 | 4:50 | 35 min | 15 + 15 + 5 |
| 6 | 8:40 | 9:10 | 30 min | 15 + 15 |
| 7 | 12:30 | 1:45 | 1 h 15 min (past 12) | 1 h + 15 |
| 8 | 3:50 | 4:15 | 25 min | 15 + 5 + 5 |
| 9 | 11:20 | 12:05 | 45 min (past 12) | 15 + 15 + 15 |
| 10 | 9:30 | 2:30 | 5 h (past 12) | 5 × 1 h |

Measured (critic, own 12-hour arithmetic): every end time and duration is right; level 1 — 7 of 10 rounds carry across or land on an hour (2, 3, 4, 5, 6, 8, 10); the no-carry bot ("add the minutes, keep the hour") finishes 3/10 (1, 7, 9). Level 2 — hours passed 0/1/2/3/5 = 4/2/1/2/1 rounds; the "subtract the digits" bot finishes 3/10 (1, 4, 5); rounds 1 and 2 are the same 3 hours on purpose (one inside the morning, one past 12 — the comparison G3-344 makes). Every round is reachable with ≤ 5 timers; any pouring order works (the shelf trades to the same canonical row).

**Answer position:** answers are built on blank wheels — nothing to choose, no position. The source shelf is three fixed timers (a tool, not options). **Order:** order-only reshuffle per pass, never the same twice.

## 7. Check, the misses, the success
- **Check with blank wheels:** hint "Set the ticket's wheels." (the timers are a tool — Check is allowed without pouring). No miss.
- **Miss 1:**
  - level 1, the timers poured do not make the card's minutes → the card's arrow glows and a strip under it shows the poured total against the asked total as two rows of five-minute cells (teal poured, dashed asked). Hint: "Your timers ran {made} minutes. The card says {n}."
  - level 1, timers right but ticket wrong → every used timer but the LAST gets a small tag with the time it ran out (e.g. 5:50, 6:05, 6:10) and the last shows "?"; the number the short hand has passed glows. Hint: "{lastTag}, and {lastValue} more minutes."
  - level 2, the big clock does not match the end clock → the end time's ghost hands and the gap arc (still to go: teal dashed; too far: coral). Hint: "Pour until the two clocks match."
  - level 2, clocks match but ticket wrong → the hour glasses lift one by one with a dot under each; the small glasses tilt toward each other. Hint: "Count the hour glasses for the hours. Then add the small glasses' minutes."
- **Miss 2:** level 1 — the last timer's run replays slowly (1.5×) with the long hand's path drawn; crossing rounds hint "The long hand went past the 12, so the hour moved on to {h}." otherwise "Read the hour the short hand has passed, then the minutes." · level 2 — the small glasses show their minutes large and a running sum under them (15, 30, 35); hint "{hours} h, then {minutes} min more."
- A pour, un-pour or wheel turn clears the miss marks until the next Check.
- **Success:** the wave (every used glass flips upright, sand back up, 60 ms apart), Sprocket crows. Sentences: L1 "Yes! {start} + {n} min = {end}." · L2 "Yes! From {start} to {end} is {duration}." e.g. "Yes! From 12:30 to 1:45 is 1 h 15 min."

## 8. Settings
1. **Question:** *what time will it be?* (level 1: the question card + end-time ticket) / *how much time passed?* (level 2: the end clock + duration ticket). Visible at rest.
2. **While the sand runs:** *watch the hands* / *frosted clock* — a frosted dome covers the big clock's hands while pouring and nothing glows on a match; the child plans and counts on in their head from the timers on the shelf, and Check lifts the frost (the step after counting-on is reliable). Visible at rest: the frosted dome over the face.

## 9. Words (EN source)
- title (frozen en): "Sprocket's Clock — Elapsed Time: What Time Will It Be?"; header short "Sprocket's Clock".
- task lines: as §4.
- question card: "in {n} min"; timer bases: "1 h" · "15 min" · "5 min"; ticket captions: "h" / "min".
- hints / success: as §7.
- settings: "Question" — "what time will it be?" / "how much time passed?"; "While the sand runs" — "watch the hands" / "frosted clock".
- aria: timers "sand timer, 1 hour" / "sand timer, 15 minutes" / "sand timer, 5 minutes"; used shelf "used: {h} hour timers, {q} quarter timers, {f} five-minute timers"; big clock "the clock shows {time}"; end clock "the second clock shows {time}".

**Locale traps.**
- **Abbreviations** (timer bases, ticket captions, success): en *h / min*, de *Std. / Min.* (base "1 Std."), fr *h / min*, es *h / min*, pt *h / min*, it *h / min* (prose *ora/ore*), nl *u / min*, sv *tim / min*, da *t / min*, no *t / min*, fi *h / min* (prose *tunti/tuntia*; partitive after numbers: *3 tuntia 15 minuuttia*). The five-glass base is 46 px at its narrowest — de "5 Min." fits at 13 px; the base widens to a pill if a reviewer's form is longer.
- **"Sand timer"** (aria/hints only): de *Sanduhr*, fr *sablier*, es *reloj de arena*, pt *ampulheta*, it *clessidra*, nl *zandloper*, sv *timglas*, da *timeglas*, no *timeglass*, fi *tiimalasi* — the sv/da/no/fi words literally say "hour glass" for every size, so the aria always adds the minutes ("timglas, 15 minuter").
- **Time format** on the ticket and in sentences: each locale's school separator (de/sv/da/no/fi books often use a dot; fr *12 h 30*; colon elsewhere) — one field per locale.
- **"Time passed" phrasing:** de *Wie viel Zeit ist vergangen?*, fr *Combien de temps s'est écoulé ?*, es (MX) *¿Cuánto tiempo pasó?*, pt *Quanto tempo passou?*, it *Quanto tempo è passato?*, nl *Hoeveel tijd is er voorbij?*, sv *Hur lång tid har gått?*, da *Hvor lang tid er der gået?*, no *Hvor lang tid har gått?*, fi *Kuinka paljon aikaa kului?* — reviewer confirms grade-3 wording. "In 30 minutes": de *in 30 Minuten*, fr *dans 30 minutes*, sv *om 30 minuter*, fi *30 minuutin päästä* — never a to-the-hour idiom (de *halb vier*, nl *kwart over*), because the activity counts on in minutes.
- 12-hour faces only (24-hour is row 159); "past 12" is said "past 12 o'clock" in prose, never "13".

## 10. Sound off, access, phones
- Sound off: the pour, the running hands, the trades, the end clock's glow, the ghost hands and the wave are all drawn; the hiss/clink/ring are extra. TTS reads the success sentence only.
- Keyboard path §5; aria-live reads the clock time after every pour and every trade.
- Taps: timers ≥ 44 wide; last used timer 44 px zone; ▲▼ 44 px.
- Pictures: Sprocket 96 / 64 ✓; everything else is drawn apparatus (glass bulbs, sand, shelves, clocks).
- `prefers-reduced-motion`: pours are instant (the hands jump, the sand fades), trades cross-fade.

## 11. Distinct from
- **New 303 The Time Ribbon** (a ribbon knotted to the minute hand, one loop per hour slipping onto a peg) — the twin this row's first design was. Here nothing is wound round the rim and no hand is dragged: the interval is composed from three fixed durations the child chooses, and the trades (3 fives = a quarter, 4 quarters = an hour) are content a ribbon cannot show.
- **Row 198** (this batch): hops on a straight time line stopped by o'clock posts (add AND subtract); here the clock itself is run forward by timers (count on, elapsed).
- **Row 104 Echo Slice** (paints the swept part of the hour), **Row 101 Hour Road**, **Row 103 Pull-Back Key**, **Row 158 Day Wheel**, **Row 159 Second Ring**, **Row 160 Drive Cables**, **Row 161 Minute Train**, **Row 162 Carry Drums**, **Row 163 Flip-Tile Rim** — reading or setting a time; none measures an interval with chosen durations.
- **Premium tools:** Learning Clock (drag geared hands — here the hands are never dragged), Class Timer (one shrinking wedge counting the class's real time — here no real time passes and nothing counts down).
- **Row 94 Bundle Bot / Row 145 Trading Scale** trade tens; the shelf's trades are base-60 time (3 × 5, 4 × 15) and a side rule of the shelf, not the invention.
- Not in REGISTRY-BUILT.

## 12. Build plan
- **Core state:** `{ level, frost, round, poured:[60|15|5 …] (pour order, for un-pour), shelf:{h,q,f} (canonical), wheels:{a,b}, misses }`.
- **Core functions:** `handsAt(start, minutes)` → angles (long = 6·(m+minutes), short = 30·h + 0.5·(m+minutes)); `total(poured)`; `canonical(minutes)` → {h,q,f} (the trade rule); `pour(v)` / `unpour()`; `endTime(start, n)`; `duration(start, end)` (12-hour wrap); `tags(start, poured)` → each timer's run-out time; `grade(wheels)`; `overshoot(start, poured, end)`.
- **verify gate (own oracle):** recomputes end times and durations with its own 12-hour arithmetic; asserts ≥ 7 level-1 rounds cross or land on the hour, no-carry bot ≤ 3/10, ≥ 4 level-2 rounds past 12, subtract-digits bot ≤ 3/10, hours passed include 0 and ≥ 3; for every total 0..300 the canonical shelf has ≤ 10 glasses and the trades preserve the total (property test over random pour sequences); the hands after any pour sequence equal `handsAt(start, total)`; every round reachable with ≤ 5 timers; level-1 miss-1 tags never include the final time.
- **Mutations:** short hand not geared (stays) · trades change the total · 4 quarters do not trade · 2 fives trade into a quarter · duration computed by digit subtraction · un-pour removes the wrong glass after a trade · level 2 accepts minutes-only for a whole-hour round · miss-1 tags show the last glass's time · wheels start on the answer · frosted setting still glows on a match · reshuffle repeats a pass.
- **Local test:** real drags and taps of every timer, un-pours across trades, every round's fewest-timer solution and an overshoot-then-un-pour path, all widths; the used shelf never overflows (10 glasses at 320); Check above the fold.
- **Pictures:** farm-animals/rooster (Sprocket).
- **Risks:** a long pour queue (5 hour glasses = 4.5 s) — the cradle tap completes a pour at once; the sand must stay apparatus (two triangles and a waist, flat colour), never an illustration.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — sand timers to flip, hands that run while the sand pours, glasses that clink and trade up, a clock to chase.
2. **Would a teacher put it on the board?** Yes — it is the chunking strategy for elapsed time (hours, then quarters, then fives) made into objects, and "four quarters make an hour" is seen, not told; 11 → 2 being three hours is three hour glasses, not "−9".
3. **Would a parent trust it?** One calm clock, exact counting, nothing counts down at the child, no options to guess.
4. **The invention:** three sand timers — an hour, a quarter, five minutes — that run the clock exactly as long as their sand, so an elapsed time is the timers it took, and the shelf trades four quarters into an hour.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 1→5 · reality 5→5
What changed:
- The winding-tape design was a twin of New 303 The Time Ribbon (start knot, one loop/lap per hour, geared short hand, same standard and worksheet). Replaced by THE SAND-TIMER SHELF: the interval is composed from chosen 1 h / 15 min / 5 min timers that run the clock, with base-60 trades on the shelf — distinct from 303, 198, 101–104, 158–163 and the premium Learning Clock / Class Timer. (Old text kept at `scratchpad/des/work-c37/199-before.md`.)
- Kept every round (re-solved with my own arithmetic — all right; no-carry bot 3/10, subtract-digits bot 3/10, hours passed 0/1/2/3/5 = 4/2/1/2/1) and added the fewest-timer pour per round (≤ 5).
- Miss 1 never gives the answer (the last timer's run-out tag stays "?"); a "frosted clock" setting moves the counting-on into the child's head.
- Locale traps kept and extended (sv/da/no/fi "timglas/timeglas/timeglass/tiimalasi" say "hour glass" for every size — the aria adds the minutes).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
