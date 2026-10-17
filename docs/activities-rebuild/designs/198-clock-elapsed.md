# Row 198 — Sprocket's Clock (add & subtract time): THE O'CLOCK POSTS (3.MD.A.1)

## 0. Identity
- id `clock-elapsed.add-subtract.3-md-a-1` (KEPT; slugs/metadata frozen en/de/fr/es/pt/it/nl; sv/da/no/fi slug, title and intro new at build, grade 3) · grade 3 · CCSS 3.MD.A.1 (solve problems adding and subtracting time intervals in minutes, e.g. on a number line diagram) · strand Measurement & Data.
- own files at rebuild: `clock-posts-core.js`, `clock-posts-activity.js`, `.html`, `clock-posts-activities.json` (this row leaves `clock-elapsed-activities.json`; row 199 leaves it too, see `199-clock-elapsed.md`). 0 lines to `clock-elapsed-core.js` or `lcs-shell.*`.
- worksheets it covers: **G3-356 "Add and Subtract Time"** ("Start at the time shown, then add or subtract. Write the new time" — level 1 whole hours, level 3 quarter hours that always cross an hour: our level 2) and **G3-344 "How Much Time Passed?"** (two clocks, whole hours — covered here by the hour hops of level 2, and fully by row 199).
- **old activity:** a start clock, "what time will it be in N minutes / was it N minutes ago?", tap one of three digital times. **Kept:** the nine old start/change pairs' spirit (3:00 + 30, 12:10 − 20, 2:15 + 45, 9:05 − 25, 1:05 − 10, 8:40 − 30 survive verbatim; 7:20 + 15, 5:10 + 40, 3:30 − 30 are re-cut to cross the hour), the clock, Sprocket. **Changed:** the options are gone — the right one was the middle time in 8 of 9 rounds (measured), so a "pick the middle" bot nearly always won. The child now makes the change as hops on a time line and writes the new time. **Added:** hours-and-minutes changes (G3-356).

## 1. The pitch
"The time line has a post at every o'clock, and a minute hop can never jump a post — so 10:50 plus 20 minutes is always 10 to the post, then 10 more: 11:10."

## 2. Why a child will want it again
- **Hops that bonk.** You drag a hop out of Sprocket's marker along the line; it stretches as a springy arc, ticking every 5 minutes. Drag it past an o'clock post and the arc *bonks* into the post — the post wobbles, the arc can't stretch further. Children try to sneak past it once and laugh when it refuses. Let go, start a new hop from the post, and off you go.
- **The clock rides along.** Above the line, Sprocket's clock follows every hop: the long hand sweeps, and at a post it passes the 12 while the short hand clicks onto the next number. The line and the clock are visibly the same thing.
- **The change card fills up.** The "+ 20 min" card has four little 5-minute boxes; each hop fills its boxes teal. Overshoot and extra boxes pop out in coral beside the card.
- **Earned moment:** Sprocket (library farm-animals/rooster) hops along the arcs once from start to end and crows; the posts you used ring like wind chimes.
- **Free play:** after a round the marker can hop anywhere on the line; the clock follows — a sandbox for "what happens after 12?".
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (3.MD.A.1):** add or subtract a time interval to/from a clock time, including across the hour (and across 12), using a number-line diagram — the standard's own model.
- **Misconceptions and the pushback:**
  1. *Minutes go past 60* ("10:50 + 20 = 10:70") or *the minutes wrap but the hour stays* ("10:10"). The post physically stops the hop at 11:00 — the hour changes at the post, and the clock above passes the 12. A "add minutes, keep the hour" bot finishes 3 of 10 level-1 rounds (only the ones that do not cross).
  2. *Counting back across the hour* ("12:10 − 20 = 12:−10 / 12:50"). Backward hops bonk the 12:00 post too: 10 back to the post, then 10 more → 11:50, and the post labels show 11:00 BEFORE 12:00.
  3. *12 comes after 12* — the posts read "11:00, 12:00, 1:00": rounds 1:05 − 10 → 12:55 and 11:45 + 25 → 12:10 sit right on that wrap.
  4. *Adding hours changes the minutes* (level 2): an hour hop is a big arc over the top that lands at the SAME minutes one post further on — 9:30 + 1 h lands on 10:30.

## 4. The stage
**At 704 (stacked — the line needs the full width).**
- **Top row** (672 × 210): Sprocket's clock (190 px; numerals 20 px, minute marks, short teal / long coral hands) at left; the **change card** in the middle (200 × 120: an arrow glyph → for add / ← for subtract, the change in numerals "20 min" or "1 h 30 min", and under it the 5-minute boxes (level 1) or 15-minute boxes plus hour blocks (level 2)); Sprocket (farm-animals/rooster, 96 px) at right.
- **The time line** (672 × 170): a cream rail with ticks every 5 minutes (level 1: a 2-hour window, 28 px per 5 minutes) or every 15 minutes (level 2: a window of up to 4 hours, 42 px per quarter hour). **O'clock posts:** wooden posts 72 px tall with the time on a cap ("11:00") at 16 px. **Start marker:** a drawn round token (36 px, teal ring) with the start time on a tag above ("10:50"). Forward hop arcs above the rail (teal), backward hops below (coral), each labelled with its size in numerals ("+10", "−15") at 15 px.
- **The answer ticket** (under the line, 300 × 110): an hour wheel (1–12) and a minute wheel (00–55 in fives at level 1, 00/15/30/45 at level 2), ▲▼ buttons 44 px, digits 36 px. Beside it the bubble.
- **Task line** (20 px): "Hop the change along the line, then set the new time."
- No words on the apparatus; times and minute numbers are the content.

**At 360 (stacked).** Top row 328 × 150 (clock 130 px, card 140 × 100, Sprocket 64 px); line 328 × 150 (level 1: 13.7 px per 5 minutes, posts 164 px apart; level 2: 20 px per quarter hour, posts 82 px apart; post caps 13 px); ticket 328 × 100 (wheels with 44 px ▲▼); Check at ≈ 640 (360 × 740 ✓). At 320 × 640: line 300 wide, ticket 92 tall → Check ≈ 610 ✓. Hop snapping on phones uses a 1.5× magnified drag (the arc tip moves at 2/3 finger speed past half a tick), so 5-minute steps are reachable with a finger.

## 5. The hand
- **Make a hop:** press on the marker (or the end of the last hop) and drag along the line. An arc grows from there to the finger, snapping every 5 (level 1) / 15 (level 2) minutes with a *tick*; its size label updates live; the clock's hands follow the arc tip (≤ 16 ms per frame). If the arc reaches a post it stops there: further dragging only bends the arc against the post (*bonk*, post wobbles 6°). Release → the hop is laid; the marker jumps to its end (150 ms); the change card fills the boxes the hop covers.
- **Direction:** dragging right makes a forward (+) hop above the rail; left makes a backward (−) hop below. The card's arrow says which way the story goes; a hop in the other direction is allowed (and is a miss on Check).
- **Hour hops (level 2):** the card's hour blocks ("1 h") are draggable chips; drop one on the line to the right (forward) or left (back) of the marker → a big arc over the top lands at the same minutes one hour on, flying over the post (hour hops are never stopped by posts). Each block can be used once.
- **Undo:** tap the last arc to take it back (marker returns); a "start again" icon (44 px, circular arrow) clears all hops.
- **Ticket:** wheels as described; start blank ("–"); first touch → middle value (6 / 30).
- **Keyboard:** Tab to the marker; →/← lays a 5- (or 15-) minute hop per press (Shift+→ lays an hour hop in level 2); Backspace removes the last hop; Tab to the wheels, ↑/↓.

## 6. The rounds
**Level 1 — minutes within and across the hour (10 rounds; 5 add, 5 subtract):**

| # | start | change | new time | what happens at a post |
|---|---|---|---|---|
| 1 | 3:00 | + 30 min | 3:30 | starts on a post, no crossing |
| 2 | 7:35 | − 15 min | 7:20 | no crossing |
| 3 | 10:50 | + 20 min | 11:10 | 10 to the 11:00 post, then 10 |
| 4 | 2:15 | + 45 min | 3:00 | lands exactly on the 3:00 post |
| 5 | 5:40 | + 35 min | 6:15 | 20 to the 6:00 post, then 15 |
| 6 | 12:10 | − 20 min | 11:50 | 10 back to the 12:00 post, then 10 |
| 7 | 9:05 | − 25 min | 8:40 | 5 back to the 9:00 post, then 20 |
| 8 | 1:05 | − 10 min | 12:55 | 5 back to 1:00, then 5 — across 1 → 12 |
| 9 | 8:40 | − 30 min | 8:10 | no crossing |
| 10 | 11:45 | + 25 min | 12:10 | 15 to 12:00, then 10 — across 11 → 12 |

**Level 2 — hours and minutes (G3-356; 10 rounds; 5 add, 5 subtract; quarter-hour steps):**

| # | start | change | new time |
|---|---|---|---|
| 1 | 2:00 | + 3 h | 5:00 |
| 2 | 9:30 | + 1 h 30 min | 11:00 |
| 3 | 6:15 | − 2 h 30 min | 3:45 |
| 4 | 10:45 | + 1 h 30 min | 12:15 |
| 5 | 11:30 | + 2 h 45 min | 2:15 |
| 6 | 6:00 | − 2 h | 4:00 |
| 7 | 3:15 | − 1 h 30 min | 1:45 |
| 8 | 1:30 | − 45 min | 12:45 |
| 9 | 12:15 | − 1 h 30 min | 10:45 |
| 10 | 7:45 | + 45 min | 8:30 |

**Line window per round:** a fixed length — 2 h at level 1 (24 five-minute ticks × 28 px = 672) and 4 h at level 2 (16 quarter ticks × 42 px = 672) — centred on the midpoint of start and end, snapped to 15 minutes. Because the longest change is 45 min (L1) and 2 h 45 min (L2), start and end always sit ≥ 30 min from both window edges and every post the change crosses is on screen. (The designer's rule — "from the earlier time's hour" — put the start ON the left edge whenever it was an o'clock, e.g. 2:00 + 3 h and 3:00 + 30 min, and made level 2 up to 4½ h for 11:30 + 2 h 45, which overflows 672 px at 42 px per quarter.)

**Answer position:** nothing is chosen from options; the hops are made and the time is set on blank wheels. Measured bots (`work-37/clock198.js`): "add the minutes, keep the hour" (the classic no-carry error) finishes 3/10 at level 1 (only rounds 1, 2, 9, which cross nothing) and 2/10 at level 2 (only the whole-hour rounds 1 and 6); 7 of 10 level-1 and 8 of 10 level-2 rounds carry the minutes across an hour. "Always move the hour by one" fails every round that crosses no post. The direction is balanced 5/5 per level and the crossing rounds are spread through the shuffle.
**Order:** order-only reshuffle per pass, never the same twice.

## 7. Check, the misses, the success
- **Check with no hops, or with blank wheels:** hint "Hop the change first." / "Set the new time on the ticket." No miss.
- **Miss 1:**
  - hops don't add up to the change → the card's boxes show it: empty boxes outlined and pulsing (too little) or coral boxes outside the card (too much). Hint: "Your hops make {made} minutes. The change is {change}."
  - hops go the wrong way → all arcs flip sides with a *whoop* and the card's arrow flashes. Hint: "{add: Later means forward — hop to the right. | subtract: Earlier means back — hop to the left.}"
  - hops right, ticket wrong → the last post the marker passed (or reached) rings and its cap glows, and the hops after it are summed on a small chip above them ("+10"). Hint: "From the {post} post, {count on | count back} {n} more minutes."
- **Miss 2:** every tick on the line gets its minutes-past-the-post label (05, 10 … 55, or 15/30/45 at level 2), and the clock above shows the marker's time with a faint digital tag. Hint: "Read the line: the post, then the minutes after it."
- A new hop or wheel turn clears the miss marks until the next Check.
- **Success:** Sprocket hops along every arc from start to end (300 ms per hop), each used post chimes; the clock's hands sweep the journey once. Sentence: "Yes! {start} {+|−} {change} = {end}." plus, when a post was crossed: "You hopped to the {post} post, then {n} more." e.g. "Yes! 10:50 + 20 min = 11:10. You hopped to the 11:00 post, then 10 more."

## 8. Settings
1. **Changes:** *minutes* (level 1: 5-minute ticks, 2-hour window) / *hours and minutes* (level 2: 15-minute ticks, hour blocks on the card). Visible at rest.
2. **Line labels:** *posts only* / *every 5 minutes* (all ticks carry minutes-past labels from the start — the scaffold children may need first). Visible at rest.

## 9. Words (EN source)
- title (frozen en): "Sprocket's Clock — Time Addition & Subtraction"; header short "Sprocket's Clock".
- task line: "Hop the change along the line, then set the new time."
- change card (aria + success line): "{n} minutes later" / "{n} minutes earlier" (the card itself shows only the arrow and "20 min" — numerals + the locale's minute/hour abbreviation, which is content).
- hints / success: as §7.
- settings: "Changes" — "minutes" / "hours and minutes"; "Line labels" — "posts only" / "every 5 minutes".
- aria: line "time line from {a} to {b}"; marker "{time}"; hop "{+|−}{n} minutes".

**Locale traps.**
- **Abbreviations on the card:** en *min / h*, de *Min. / Std.*, fr *min / h*, es *min / h*, pt *min / h*, it *min / h* (*ora/ore* in prose), nl *min / u* (*uur*), sv *min / tim*, da *min / t* (*time(r)*), no *min / t* (*time(r)*), fi *min / h* (*tunti* in prose; *t* also used — reviewer picks one). Plural in prose: fi *30 minuuttia* (partitive), de *1 Stunde 30 Minuten*.
- **Time format on post caps and the ticket:** each locale's school format (de *11.00 Uhr* in books, but caps show *11:00*? — the de/sv/da/no/fi reviewer decides colon vs dot; the separator is one field used everywhere in the activity). fr caps *11 h* (and *11 h 10* for times). 12-hour times throughout (the frozen titles are 12-hour; 24-hour is row 159).
- **"Later / earlier" wording:** "in 20 minutes" / "20 minutes ago" (old strings kept: de *in 20 Minuten* / *vor 20 Minuten*, fr *dans 20 minutes* / *il y a 20 minutes*).
- **12 → 1 wrap:** every locale's posts read 11, 12, 1 — no "13" (24-hour locales' children know 13:00 from daily life; the success sentence never says 13).

## 10. Sound off, access, phones
- Sound off: hops, bonks (post wobble), boxes, flipping arcs and chiming posts are all drawn. TTS reads the success sentence only.
- Keyboard path §5; aria-live announces each hop ("+10, now 11:00 — the post") and the miss reasons.
- Taps: marker 44 px hit circle; wheels' ▲▼ 44 px; hour chips 64 × 44; undo 44 px.
- Pictures: Sprocket 96 / 64 px ✓.
- Phone layout §4; magnified drag for 5-minute snapping.

## 11. Distinct from
- **Row 86 Sunken Stones** (1.OA.C.6) shares the STRATEGY — a jump past ten must stop at ten first — because bridging through the hour IS bridging through ten in base 60; it is the strategy grade-3 time asks for. The apparatus differs: there one golden stone in a sum within 20; here a post at every o'clock, the minute ticks after each post restart at 05 (each hour is its own 0–55 ruler, the base-60 idea made visible), backward hops bonk the posts from the other side, and hour hops fly over the posts keeping the minutes. Kept deliberately; the builder must not copy #86's stones, water or Lily.
- **Row 155 Snip-Out Tape** (snip the gap between two marks on a measuring tape — length differences); **New 269 Tick Comb** (reading an unlabelled number line); **Row 205 Hopscotch** (counting hops before/after); **Row 135 Leapfrog** (commutativity). None has posts that stop a hop, which is the whole lesson of crossing the hour.
- **Row 162 Carry Drums** (an hour drum clicks over when the minute drum passes a peg — reading, not adding); **Row 101 Hour Road** (the rim unrolled for reading hours).
- **Row 199** (this batch, same Sprocket clock): the sand-timer shelf runs the clock forward by chosen 1 h / 15 min / 5 min timers to count on and measure how much time passed; this row adds AND subtracts on a straight post line.
- **Premium tools:** Class Timer (a shrinking wedge), Learning Clock (drag hands) — no line, no hops.
- Not in REGISTRY-BUILT.

## 12. Build plan
- **Core state:** `{ level, labels, round:{start:{h,m}, delta:min (±)}, window:{from,to}, hops:[{kind:'min'|'hour', size:±min}], wheels:{h,m}, misses }`.
- **Core functions:** `toLine(time)` / `fromLine(x)` (12-hour wrap handled by working in minutes from the window start); `posts(window)`; `maxHop(at, dir)` → minutes to the next post in that direction (0 means: at a post, the next hop may start); `layHop(at, size)` → clamps to `maxHop`; `total(hops)`; `endTime(start, hops)`; `grade()` → `{sumOK, dirOK, timeOK}`; `windowFor(round)`.
- **verify gate (own oracle):** recomputes every round's new time with its own 12-hour arithmetic; asserts 5 add / 5 subtract per level; ≥ 7 minute-crossing rounds in level 1 and ≥ 8 in level 2; at least one 12 → 1 and one 1 → 12 crossing; windows (2 h / 4 h, centred, snapped to 15 min) contain start, end and every crossed post with ≥ 30 minutes margin; `layHop` never returns a minute hop that passes a post (property test over every start minute and size); hour hops keep the minutes; the "keep the hour" bot finishes ≤ 3/10 per level (measured 3 and 2).
- **Mutations:** minute hop allowed through a post · hour hop changes the minutes · backward hops ignore posts · 12 followed by 13 on posts · end time computed with no wrap at 12 · direction not graded · change card boxes count 10-minute boxes at level 1 · ticket minute wheel allows 60 · wheels start on the answer · reshuffle repeats a pass.
- **Local test:** real drags for every round's correct hop sequence and a sequence that tries to pass a post (asserts the bonk clamp), all widths; phone magnified drag reaches every 5-minute tick at 320; Check above the fold.
- **Pictures:** farm-animals/rooster (Sprocket).
- **Risks:** drag precision on phones (handled by the magnified drag and keyboard); clock-follow must use the same time function as the line (one source).
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — springy hops that bonk into posts, a clock that rides along, a rooster that hops the whole way.
2. **Would a teacher put it on the board?** Yes — it is the open number line every teacher draws for elapsed time, with the one rule that matters built in: you always go through the o'clock.
3. **Would a parent trust it?** Calm, exact, no guessing between options, local time formats.
4. **The invention:** a time line whose o'clock posts stop every minute hop — so crossing the hour is always "to the post, then the rest".

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→4 · reality 5→5
What changed:
- Re-solved all 20 rounds with my own 12-hour arithmetic: every new time is right; 5 add / 5 subtract per level; 7 (L1) and 8 (L2) rounds carry across an hour; the "add the minutes, keep the hour" bot finishes 3/10 and 2/10 as claimed.
- Fixed the time-line window: the old rule put an o'clock start on the window's edge and overflowed the line at level 2; now a fixed 2 h / 4 h window centred on the change, ≥ 30 min margins.
- Distinctness kept at 4 on purpose and said so: the "stop at the boundary" strategy is Row 86's (bridging ten). The time-specific apparatus (posts every 60, restarting minute rulers, backward bonks, hour hops over the posts, the riding clock) is new, and the strategy is the one the standard wants; recorded in §11 so the builder does not import #86's look.
- Clock idioms checked per locale: the "in 20 minutes / 20 minutes ago" wording kept from the old strings (de in/vor, fr dans/il y a); 12-hour posts with no "13"; separator one field per locale.
