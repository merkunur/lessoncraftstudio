# Row 160 — Sprocket's Clock: Match Analog and Digital → THE DRIVE CABLES (2.MD.C.7)

## 0. Identity
- id `clock-digital.match-clocks.2-md-c-7` (frozen) · Grade 2 · CCSS 2.MD.C.7 · Measurement & Data · own files `drive-cables-core.js`, `drive-cables-activity.js`, `drive-cables-activity.html`, `drive-cables-activities.json` (the row leaves `clock-digital-activities.json`; the other rows of that manifest — read-hour, read-half-hour, read-quarter-hour, read-five-minute, read-minute — stay with their own rows). Title/intro frozen en, fr; de/es/pt/it/nl/sv/da/no/fi metadata new at build.
- worksheets covered: **G1-148 "On the Hour"**, **G1-149 "Half Past What?"**, **G1-150 "Clock Partners"** (match analog and digital).
- the old activity: read one digital time, tap the matching analog clock among three. Kept: every old target and its distractors (3:00 vs 3:30/9:00, 7:30 vs 7:00/2:30, 10:15 vs 10:45, 1:45 vs 1:15, 5:20 vs 5:40, 8:00, 2:30, 11:15, 6:45 — re-homed below), the digital-to-analog direction, Sprocket's clock family look. New: several pairs per round on a switchboard, and a card DRIVES the hands of the clock it is plugged into, so a wrong pair shows its own error.

## 1. The pitch
"Every digital card has a cable — plug it into the clock you think it matches, power the board, and the card drives a ghost pair of hands to its own time on that clock: the lamp only lights if the ghost hands land exactly on the hands already painted there."

## 2. Why a child will want it again
- A **switchboard**: four round analog clocks in a row (2 × 2 on phones), each with a brass socket and a little lamp, and three digital cards along the bottom, each with a curly cable ending in a plug.
- Dragging a plug stretches its cable across the board; dropping it in a socket gives a satisfying *chunk* and the cable sags into a curve. Cables can be pulled out and re-plugged.
- **Check = the big lever**: the board powers up; each plugged card sends a ghost pair of hands sweeping round its clock from 12:00 to the card's time (fast, with a whirr). Where the ghost hands settle exactly on the painted hands, the lamp lights warm yellow and the clock's numbers glow; where they don't, you see two sets of hands on one face — the card's time and the clock's time, side by side.
- When all three lamps light, the fourth clock (the one nobody needed) gives a shy little wobble, the cables glow in a chase, and Sprocket (farm-animals/rooster) peeks over the board.
- No timer, no score, no streak.

## 3. The skill and the misconception
- **Skill:** tell and write time from analog and digital clocks — to the hour and half hour (G1-148/149/150) and, in Level 2, to the quarter hour and five minutes (2.MD.C.7) — by reading each hand for its own job.
- **Misconceptions and the pushback:**
  1. **Swapping the hands** (3:00 read as 12:15). The ghost for 3:00 puts its SHORT hand on 3 and its long hand on 12 — on the swapped clock the two short hands point to different numbers.
  2. **Half past: the hour hand sits ON the hour** (7:30 matched to a clock whose hour hand is between 6 and 7). The ghost hour hand for 7:30 settles halfway between 7 and 8 — a visible gap of one hour-space from the painted one.
  3. **":15 and :45 look alike"** (10:15 vs 10:45). The ghost long hand goes to the 3; the painted one is on the 9 — opposite sides.
  4. **Five-minute times near the next hour** (2:55 matched to a clock showing 3:55). The ghost hour hand settles just before the 3; the painted one is just before the 4.
  5. **"30 means the 3"** (Level 2 lure readings: 5:20 vs 5:40 = the 4 vs the 8). Two long hands on one face, one on the 4 and one on the 8.

## 4. The stage (what is on the screen)
At **704 px** (stage 660 × 520):
- **Four clocks** in a row, each 148 px face (cream, teal rim 6 px, numerals 1–12 Baloo 2 800 18 px, minute ticks, hour hand coral 7 px / 42 px, minute hand teal 4 px / 60 px — the same colours as the card's hour and minute digits; the draft had them the other way round, which made the card's colour code lie), a socket (28 px brass ring) under each, a lamp (20 px) above each.
- **Three digital cards** along the bottom (160 × 76 each): an LCD-style window with the time in Baloo 2 800 40 px — hours coral, minutes teal (the colour of the hand that shows them), separator per locale; a cable 2.5 px ink, ending in a plug 36 px (hit area 52 × 52).
- **The lever** is the shell's Check (styled as normal; the board's power-up is the animation).
- **Task line** (22 px): "Plug each card into the clock that shows the same time."
- Bubble under the board.

At **360 px**: clocks 2 × 2, each 140 px face (numerals 16 px), sockets 26 px with 48 px hit circles; cards in one row of three 104 × 60 px (time 28 px); plugs 44 × 44 hit areas. Check above 360 × 740; at 320 × 640 clocks 124 px.

## 5. The hand (every interaction)
- **Drag a plug** from a card to a socket: the cable follows as a Bézier sag; on release over a socket (48 px snap radius) it clicks in (*chunk*, 100 ms). Tap a card then tap a clock = the same (no-drag path).
- **A socket holds one plug.** Dropping a second plug into a full socket swaps: the first plug springs back to its card.
- **Pull out** by dragging the plug away or tapping the plugged card twice.
- Keyboard: Tab to a card, Enter, arrows choose a clock, Enter plugs.
- **Free play**: tapping a clock (not plugging) makes its hands "tick" once forward and back, a small toy; the clocks never change their time.

## 6. The rounds
One round = three cards + four clocks (three matches + one lure). All three cards must be plugged before Check grades (Check with fewer → hint).

**Level 1 — o'clock and half past (G1-148/149/150):**

| # | cards (left → right) | lure clock (what it shows · the error it baits) | clock slots A B C D |
|---|---|---|---|
| 1 | 3:00 · 7:30 · 11:00 | 6:30 · hour hand between 6 and 7 for 7:30 | lure · 3:00 · 7:30 · 11:00 |
| 2 | 9:00 · 2:30 · 5:00 | 1:30 · hour hand for 2:30 | 9:00 · lure · 5:00 · 2:30 |
| 3 | 12:00 · 4:30 · 8:00 | 4:00 · "it says 4" | 8:00 · 4:30 · lure · 12:00 |
| 4 | 6:00 · 10:30 · 1:00 | 12:30 · 6:00 with the hands swapped | 6:00 · lure · 10:30 · 1:00 |
| 5 | 2:00 · 8:30 · 11:30 | 7:30 · hour hand for 8:30 | 8:30 · 11:30 · 2:00 · lure |
| 6 | 7:00 · 3:30 · 10:00 | 3:00 · "it says 3" | 10:00 · 3:30 · 7:00 · lure |
| 7 | 5:30 · 9:30 · 4:00 | 12:20 · 4:00 with the hands swapped | lure · 9:30 · 5:30 · 4:00 |
| 8 | 1:30 · 6:30 · 12:00 | 6:00 · "it says 6" | 6:30 · 12:00 · lure · 1:30 |

**Level 2 — quarter hours and five minutes (2.MD.C.7):**

| # | cards | lure | slots A B C D |
|---|---|---|---|
| 1 | 10:15 · 5:20 · 8:00 | 10:45 · :15 vs :45 | 5:20 · lure · 8:00 · 10:15 |
| 2 | 1:45 · 7:30 · 11:15 | 1:15 · :45 vs :15 | 7:30 · 11:15 · 1:45 · lure |
| 3 | 6:45 · 2:30 · 4:05 | 6:15 · :45 vs :15 | lure · 2:30 · 6:45 · 4:05 |
| 4 | 9:40 · 12:15 · 3:25 | 9:20 · the 8 vs the 4 | lure · 3:25 · 12:15 · 9:40 |
| 5 | 11:15 · 3:50 · 7:10 | 11:45 · :15 vs :45 | 7:10 · 11:15 · lure · 3:50 |
| 6 | 4:45 · 1:20 · 8:35 | 5:45 · hour hand nearly at 5 | 1:20 · lure · 4:45 · 8:35 |
| 7 | 2:55 · 10:25 · 4:15 | 3:55 · hour hand nearly at 3 | 2:55 · lure · 4:15 · 10:25 |
| 8 | 12:45 · 9:05 · 5:35 | 1:45 · hour hand nearly at 1 | 12:45 · 9:05 · lure · 5:35 |
| 9 | 3:00 · 8:20 · 11:40 | 12:15 · 3:00 with the hands swapped | 11:40 · 3:00 · 8:20 · lure |

- Every lure differs from ONE card by exactly the error it baits; the other two cards have no near twin on the board. Lures always draw the hour hand at its true position for their own time (e.g. 6:30's hour hand halfway between 6 and 7), so they are honest clocks.
- **Answer position (measured by the critic's script, `work-c30/c160.js` + `c160b.js`):** the draft's layouts passed its own test (card i in slot i only 3/24) but hid a worse tell: card 1 was NEVER in slot A and card 3 sat in slot A 5 of 8 times, so the fixed shift "slot = card + 2" was right 13/24 times (54 %). The slot columns above are re-laid by a search: lure slot A/B/C/D = 2/2/2/2 (L1) and 2/3/2/2 (L2); every card position lands in every slot 1–3 times per level; every shift k (slot − card mod 4) is right 6/24 (L1) and 6–7/27 (L2) — chance level, so no "plug straight across" or "plug one over" strategy beats guessing. The gate asserts: per-shift share ≤ 30 %, per (card, slot) count ≤ 3, lure per slot 2–3. The last cable is never forced, because four clocks remain for three cards.
- **Order:** order-only reshuffle of rounds per pass; within a round the table's slot layout is kept (it is the measured balance).

## 7. Check, the misses, the success
- **Check with fewer than three cards plugged** → hint, no miss: "Plug in all three cards."
- **Miss 1**: power-up — every plugged card drives its ghost hands (dashed, card colours) round its clock to the card's time. Right pairs: ghost merges with the painted hands, lamp on. Wrong pairs: the ghost stays on the face beside the painted hands; the hand that disagrees (hour, minute, or both) gets a soft pulse. Right pairs STAY plugged and lit (they are done). Hint, by the first wrong pair's error: hands swapped → **"The short hand shows the hour, the long hand shows the minutes."** · hour hand → **"At half past, the short hand is halfway to the next number."** · quarter → **"Quarter past: the long hand points to the 3. Quarter to: to the 9."** · five minutes → **"Count by fives from the 12 to the long hand."** · otherwise → **"Look at both hands. Which clock looks like the dashed hands?"**
- **Miss 2**: on each still-wrong pair, the ghost minute hand leaves a trail of small dots every five minutes from the 12 (count by fives), and the two numbers the ghost hour hand sits between are bolded. No clock is pointed at; the child finds it.
- A new plug move clears ghosts on the moved pair only.
- **Success**: all three lamps lit, the cables glow in a chase, the lure clock wobbles, the rooster peeks over. Bubble lists the three pairs: **"3:00, 7:30 and 11:00 — all matched! At 7:30 the long hand is on the 6 and the short hand is halfway between 7 and 8."** (the second sentence explains the trickiest card of the round, authored per round).

## 8. Settings
1. **Times**: o'clock and half past (Level 1) · quarter hours and five minutes (Level 2).
2. **Numbers on the clocks**: all twelve (default) · only 12, 3, 6, 9 — at rest the faces visibly lose eight numerals (ticks stay).

## 9. Words
- title: "Sprocket's Clock" (frozen)
- task line: "Plug each card into the clock that shows the same time."
- prompt: "Plug in all three cards."
- hints: "Plug in all three cards." · "The short hand shows the hour, the long hand shows the minutes." · "At half past, the short hand is halfway to the next number." · "Quarter past: the long hand points to the 3. Quarter to: to the 9." · "Count by fives from the 12 to the long hand." · "Look at both hands. Which clock looks like the dashed hands?"
- celebrations: one authored line per round (17).
- settings: "Times" · "O'clock and half past" · "Quarter hours and five minutes" · "Numbers on the clocks" · "All twelve" · "Only 12, 3, 6, 9"
- aria: "card {time}" · "clock {n}, its hands show {time}" (spoken only after success — before, the clock is described as "clock {n}" so the screen reader does not read the answer; screen-reader users get a reading mode: "short hand between {a} and {b}, long hand on {c}") · "lamp on/off"
- **Locale traps:** the digital cards use the locale's separator (en/es/pt/it/de ":", nl/sv/da/no/fi ".", fr « h » — « 7 h 30 »); digits only, no "a.m./p.m." (the face cannot show it). The quarter/half hint is the dangerous one: **de** "halb acht" = 7:30 (half TO eight) — the de hint must say „Bei halb steht der kleine Zeiger zwischen zwei Zahlen" and never translate "half past seven" literally; **nl** "half acht" = 7:30 likewise; **sv/da/no** "halv åtta / halv otte / halv åtte" = 7:30; **fi** "puoli kahdeksan" = 7:30; **de** regional "Viertel nach / Viertel acht / dreiviertel acht" — the hint names the 3 and the 9 positions only, never "Viertel" phrases; **fr** « et quart / moins le quart », **es** «y cuarto / menos cuarto», **pt** «e quinze / quinze para», **it** «e un quarto / meno un quarto». The celebrations' explanatory sentence names the hand positions (on the 6, halfway between 7 and 8), which is locale-neutral; the spoken time phrase (TTS) uses each locale's own idiom.

## 10. Sound off, access, phones
- Sound off: ghost hands, pulses, lamps, dots and bolded numerals carry everything; *chunk*, whirr and crow decorate.
- Keyboard path in §5; aria above.
- Plugs 52 / 44 px hit areas; sockets 48 px snap; clock faces 148 / 140 / 124 px (apparatus, no picture floor applies); the rooster 96 / 64 px.
- Check above both folds.

## 11. Distinct from
- **#162 Carry Drums** (a card loads into ONE odometer clock and ghost hands swing over its hands): the ghost-hands check is shared feedback, not the invention; here the invention is the switchboard — three cards and four clocks wired at once, a lure clock that baits a named error, and process of elimination. No drums, no flip numerals (owned by #162/#163).
- **#102 Digits Ride the Hands** (one card at a time; its hour digit rides out along the short hand to land on a number): here several pairs are wired at once on a switchboard, and the test is a full ghost pair of hands sweeping to the card's time and merging (or not) with the painted hands — the error shows as two hand-sets on one face.
- **#101 Hour Road**, **#103 Pull-Back Key**, **#104 Echo Slice**, **#161 Flip Tiles** (sibling: reading ONE clock to five minutes and dialing the digital), **New 232 Sense Face** (plugging senses — different domain).

## 12. Build plan
- **Core state:** `{round, plugs:{card0:null|slot, card1, card2}, miss}`; `grade()` → per card `{ok, error:'swap'|'hour'|'quarter'|'five'|'other'}` by comparing the card's (h,m) with the slot's (h,m) (error classified from the difference: swapped hands = the clock shows (m/5, h·5); hour off by one with same minutes = 'hour'; minutes differ by 30 at :15/:45 = 'quarter'; …).
- **Gate truth (verify):** recompute hand angles (hour = 30h + m/2, minute = 6m) for every clock; each card matches exactly one clock; the lure matches no card and differs from its baited card by the labelled error; lure slot counts within 2–3; card i ↔ slot i ≤ 25 %; no two clocks on a board show the same time; L1 times only :00/:30.
- **Mutations:** hour hand drawn ON the hour at :30; ghost hands use the clock's time instead of the card's; a socket accepts two plugs; Check grades with two plugs; right pairs unplugged after a miss; aria reads the clock's time before success; numbers-setting hides ticks too; lure equal to a card; reshuffle repeats.
- **Pictures:** farm-animals/rooster (seen). Everything else is apparatus.
- **Risks:** at 360 four 140 px faces + cards must fit above the fold — 2 × 2 grid (296 px) + cards (60) + task line + Check ≈ 560 px; verified in the layout budget.
- **Blocked:** nothing.

## 13. The four questions
1. **Choose it again?** Yes — curly cables, chunky plugs, a power-up, lamps that light.
2. **Teacher on the board?** Yes — every lure is a named misconception, and a wrong pair displays its own error as two hand-sets on one face.
3. **Parent trust?** Calm, clean, numerals as content, one library picture.
4. **Invention:** a digital card drives ghost hands on whatever clock you plug it into; the lamp lights only if they land on the painted hands.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- **A hidden answer-position tell, measured:** the draft's own check (card i in slot i 3/24) passed, but card 1 was never in slot A and card 3 sat in slot A 5/8 times — "plug two over" won 54 % of L1. All 17 slot layouts re-laid by search: every shift at chance (6/24; 6–7/27), every card in every slot 1–3 times, lures 2/2/2/2 and 2/3/2/2. The gate now asserts per-shift ≤ 30 %.
- **The colour code lied:** the card's hour digits are coral and minutes teal, but the draft drew the hour hand teal and the minute hand coral. Hands now match the digits (hour coral, minute teal).
- Verified every lure differs from its baited card by exactly the named error and matches no card; no two clocks on a board share a time.
- Distinctness vs #162 recorded: ghost hands are shared feedback; the switchboard (3 cards × 4 clocks + a named-error lure) is the invention. No odometer drums and no flip numerals.
