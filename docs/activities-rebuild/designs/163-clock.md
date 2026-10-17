# Row 163 — Tell Time to the Nearest 5 Minutes (Set the Clock) → THE RUN-ON TEST (2.MD.C.7)

## 0. Identity
- id `clock.tell-time-5-min.2-md-c-7` (KEPT; slugs/metadata frozen in all 11 locales) · grade 2 · CCSS 2.MD.C.7 (tell and write time from analog and digital clocks to the nearest five minutes) · strand Measurement & Data · own files `run-on-core.js`, `run-on-activity.js`, `run-on-activity.html`, `run-on-activities.json` (this row leaves `clock-activities.json`, which keeps row 104's id until row 104 is rebuilt; 0 lines to `clock-core.js` and `lcs-shell.*`).
- page title (frozen): "Tell Time to the Nearest 5 Minutes — Set the Clock (Grade 2)"; intro (frozen) promises: **read the time, drag the analog clock hands to show it, to the nearest 5 minutes (quarter past, quarter to, ten past and more), with a digital readout.** All kept.
- worksheets also covered (as levels, §6): **G1-233** Draw the Hands: O'Clock · **G1-234** Half Past · **G1-235** Quarter Hours · **G1-236** Five Minutes · **G1-237** Mixed Times · **G1-212** Draw the Clock Hands · **G2-249** What Time Is It? · **G2-250** Quarter Hours.
- what the old activity did: a digital target, two draggable hands; the hour hand **snapped to whole hours and was coupled** to the minute hand (it crept by itself), and a **live digital readout** echoed the hands' time while dragging — so a child could drag until the readout's digits matched the target's digits without reading the clock, and never placed the short hand's creep. **Kept**: all eight targets (3:15, 7:45, 6:10, 9:20, 4:40, 1:50, 10:05, 12:25), drag-the-hands, five-minute snapping of the long hand, the digital readout (now shown at Check). **Changed**: both hands are free and un-geared while the child sets them; the readout no longer gives the answer away; the short hand must be placed where it really is (part-way past the hour); four levels cover the six draw-the-hands worksheets.
- the critic replaced this row's first invention (numeral flip-tiles with the minutes on their backs) because it was row 161's Flip Tiles in another dress; nothing of it remains.

## 1. The pitch
"You set the two hands yourself — then Check slips the clock's gear in and it runs on to the next o'clock: a clock you set right arrives exactly on the hour, short hand square on its number; set the short hand in the wrong place and it arrives crooked."

## 2. Why a child will want it again
- **A clock that tests itself.** While the child sets the time, the two hands are loose — each one moves alone. Press Check: a little brass gear slides into the centre with a *clack*, the hands lock together, and the clock **whirs forward** to the next o'clock (one five-minute step every 120 ms, a ticking run). A right clock arrives with the long hand on the 12 and the short hand **square on its number** — the number lights up and the bell on top strikes the hour: one ripple ring per stroke (7 o'clock = seven rings), so you can count it with the sound off. Then the clock runs back to your time.
- **Crooked is funny and fair.** A wrong short hand arrives *between* two numbers at "o'clock" — an impossible clock. The bell clanks once, flat, the gap between the hand and its number is ringed, and the clock sags back to your time. Children quickly learn that the only way to make the bell strike properly is to put the short hand where the minutes say.
- **Free play**: after each success both hands are free and a **Run** toggle sets the clock going for real (one lap = 6 s), geared, the bell striking every o'clock — the only time the hands are geared outside a Check, and only after the round, so it can never do the child's work.
- No score, no timer, no lives.

## 3. The skill and the misconception
- Skill (2.MD.C.7; the G1 draw-the-hands sheets): given a digital time, **set the long hand** to the minutes (counting by fives round the clock; quarter past on the 3, half past on the 6, quarter to on the 9) and **set the short hand** in the gap after the hour, as far along the gap as the minutes say (just past for :05, a quarter of the way at :15, halfway at :30, nearly at the next number at :55).
- Misconceptions and how the material pushes back:
  1. **Short hand left exactly on the hour number at :20 or later** (9:20 with the short hand on the 9) → the digital readout would even say 9:20, but the run-on exposes it: 40 more minutes move the short hand only two thirds of a gap, so at "10 o'clock" it stops short of the 10 — crooked. (This is the error a readout-only check can never catch; the gear catches it every time.)
  2. **Short hand at the NEXT number for "quarter to"/":50"** (7:45 with the short hand on the 8) → the readout says 8:45, and the run-on carries the short hand a quarter of a gap PAST the 8 at "9 o'clock" — crooked the other way.
  3. **Long hand on the number that matches the minutes** (6:10 with the long hand on the 10) → the readout flips to "6:50" beside the target "6:10": the long hand has counted 50 minutes, and the rim's minute marks counted by fives (miss 2) show 10 is the 2. If the child also set the short hand for "6:50" (nearly at the 7), the clock runs on square — it IS a real time — and the bubble says so: right clock, wrong time.
  4. **Hands swapped** (long hand on the hour, short on the minutes) → the readout reads the swapped time ("12:15" for a 3:00 attempt), and the run-on sends the long hand (the hand that counts minutes) round from the 3 — the short hand ends far from any number.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704 (stacked, stage ≈ 648 × 470):
- **Left: the clock** (drawn apparatus), face 330 px across, cream #FFF8E7, 6 px teal rim, numerals 1–12 Baloo 2 30 px ink, 60 minute ticks (every fifth bold). **Long hand** teal 6 px to 86 % radius with a 26 px round grip at its tip; **short hand** coral 12 px to 55 % with a 30 px grip in its middle third; brass centre 16 px. **The gear**: a 34 px brass gear drawn beside the centre at rest (disengaged, slightly faded); at Check it slides into the centre. **The bell**: a small brass bell 40 px on top of the case; its strokes are drawn as expanding ripple rings (one per stroke). No minute numbers round the rim unless the "Minute ring" setting is on.
- **Right column (300 px), top to bottom**:
  - **the target card**: a flip-clock card 220 × 110, digits Baloo 2 56 px (hour on coral-cream, minutes on mint), and under it the locale's spoken phrase in 20 px ink (e.g. "ten past six") — the phrase is content;
  - **the readout**: an empty flip-clock 220 × 84 showing "– – : – –" (grey) until Check; at Check it flips to the time the child's hands make;
  - bubble.
- Task line above (≤ 24 px, ≤ 2 lines): **"Set the clock to this time. Move both hands."**

At 360 (stacked): target card + phrase on top (300 × 76, digits 40 px, phrase 16 px) → clock 288 px (numerals 24 px; bell 32 px) → readout 200 × 56 → bubble. Heights: 76 + 8 + 288 + 8 + 56 = 436, + header 56, task line 52, bubble 44, Check 56 → 644 < 740. At 320 × 640: card 64, clock 262, readout 50 → 64 + 262 + 50 + 16 = 392 + 208 = 600 < 640.

No library pictures (a clock face is apparatus; nothing would be ≥ 96 px without crowding the clock). Everything is drawn geometry; numerals and the time phrase are content.

## 5. The hand
- **Drag the long hand** (grip at the tip, or anywhere on the hand): it follows the pointer angle, snapping to the 12 five-minute positions on release (a soft tick at each five-minute mark while held). The short hand does NOT move with it. Answers within 50 ms of the pointer move.
- **Drag the short hand** (grip in its middle third — the grips never overlap except when the hands lie together; then the first touch picks the hand whose grip is nearer, and a second tap on the same spot within 400 ms picks the other — the chosen hand lifts with a 3 px shadow): it turns freely and **snaps to 2.5° steps** (each step is five minutes of short-hand travel: 12 steps per gap).
- **Check** → the readout flips (250 ms), then the gear slides in (150 ms) and the run-on plays (§7): (60 − m)/5 steps of 120 ms, the bell's strokes (h + 1 rings, 180 ms apart) or the flat clank, then the run back (400 ms).
- **Keyboard**: Tab selects a hand (long → short); ← / → turn the long hand by five minutes, the short hand by one step; Shift+arrows turn the short hand by a whole hour.
- **Free play**: between rounds (after success) the Run toggle in the readout corner (§2).
- Sound (optional): ticks, gear clack, bell strokes or a flat clank. TTS (optional): tapping the target phrase reads it.

## 6. The rounds
One round = a target time; both hands start at a **rest pose** that is never right: the long hand on a five-minute mark ≥ 20 minutes away from the target's minutes, the short hand at a whole hour ≥ 3 hours from the target hour (drawn from a per-round seed, so a reload shows the same start). The old start (long hand on 12) made every o'clock target half-done; this one never is.

**Level "O'clock & half past"** (G1-233, G1-234, G1-212) — 8 rounds: 4:00 · 9:30 · 12:00 · 6:30 · 2:00 · 11:30 · 7:00 · 1:30
**Level "Quarter hours"** (G1-235, G2-250) — 8 rounds: 5:15 · 10:45 · 2:15 · 8:45 · 11:15 · 3:45 · 6:15 · 12:45
**Level "Five minutes"** (default; G1-236, G2-249; the eight kept targets + two) — 10 rounds: 3:15 · 7:45 · 6:10 · 9:20 · 4:40 · 1:50 · 10:05 · 12:25 · 2:35 · 11:55
**Level "Mixed"** (G1-237) — 10 rounds: 8:00 · 5:30 · 3:45 · 10:15 · 6:25 · 1:40 · 12:05 · 9:50 · 4:35 · 7:10

Balance (asserted by the gate): every level has distinct hours; in the five-minute and mixed levels minutes < 30 in exactly half the rounds; every long-hand position used at most twice per level; the ":55 / :50 / :45" near-the-next-number cases appear in every level that allows them (they carry misconception 3); the ":20 and later" cases (misconception 2) are 7 of 10 in "Five minutes", 6 of 10 in "Mixed" and the four :45 rounds in "Quarter hours".

**How the hands are graded** (the gate implements this independently):
- long hand: exactly at 6·m degrees (it snaps, so no tolerance).
- short hand: angle `a` (snapped to 2.5°) is right iff |a − (30h + 0.5m)| ≤ 5° **and** the hand has passed h but not reached h + 1: for m = 0, `a` within ±5° of 30h; for m > 0, 30h ≤ a < 30h + 30 (mod 360). So at :15 the hand ON the hour numeral (7.5° short) is refused; at :55 the hand touching the next numeral is refused; at :05/:10 the hand on the numeral is accepted (it really has hardly moved). 
- the order of hands does not matter; nothing else is graded.

Answer position does not apply (the child builds the answer); what can be guessed is measured instead: a random-drag bot (uniform long-hand mark, uniform short-hand step) succeeds ≤ 1 in 400 rounds; a "short hand exactly on the hour" bot succeeds only on o'clock targets and :05/:10 targets (≤ 25 % of the five-minute level, measured by the gate on the round set: 2 of 10).
**Order**: order-only reshuffle per pass (`nextTask`), never the same order twice in a row.

## 7. Check, the misses, the success
- **Check with neither hand moved** → both grips pulse once; bubble: "Drag the long hand to the minutes and the short hand to the hour." (no miss)
- **Every Check** (right or wrong) shows the same two things in the same order: the readout flips to the time the hands make (minutes from the long hand, hour = the last number the short hand has passed), then the run-on to the next o'clock. Success needs readout = target **and** a square arrival (the two are the §6 grading rules, enacted). On an o'clock pose (:00) there is nothing to run: the gear clacks in and the bell strikes {h} at once (and a short hand that is not on its number is already crooked).
- **Miss 1** → after the run-on returns:
  - long hand wrong (readout minutes ≠ target minutes): the readout's minute digits are outlined coral beside the target's; the rim mark where the long hand should be gets a teal ring — "{mm} minutes is the long hand on the {n}." If the pose was otherwise a real time (it ran on square): "Your clock shows a real time — {readout}. Now make it {time}."
  - short hand wrong (crooked arrival): the arrival gap stays ringed for a moment, then the right gap (between h and h + 1) shades pale coral with its 12 tiny step dots — "At {mm} minutes past, the short hand has left the {h}: it is part of the way to the {h1}." (o'clock target: "At {h} o'clock the short hand is right on the {h}.")
  - both: both showings; bubble "Set the long hand first, then the short hand."
- **Miss 2** → **the slots**: the child's hands fade to 30 %; a minute ring appears for 3 s outside the numerals (05, 10, 15 … 55 counting round from the 12 to the target, each appearing 150 ms after the last), the target's long-hand mark gets a dashed teal **slot** (a notch in the rim) and the right short-hand step in the gap gets a dashed coral **slot**. The child drags each real hand into its slot (it clicks in when within one step). Bubble: "Count by fives to {mm}. Then the short hand goes {where}."
- Any new drag removes the readout, rings, shading and slots until the next Check.
- **Success** → the readout flips to the target's digits and both glow; the run-on arrives square: the {h1} lights and the bell strikes {h1} times (ripples); the clock runs back; bubble: "**6:10 — ten past six. The long hand is on the 2, the short hand just past the 6.**" (whole sentences per case, §9).

## 8. Settings
1. **Times**: O'clock & half past / Quarter hours / Five minutes (default) / Mixed — the round set changes and the rim changes at rest: "O'clock & half past" bolds only the 12 and 6 marks, "Quarter hours" the 12, 3, 6, 9 marks, the others every five-minute mark.
2. **Minute ring**: Off (default) / On — with "On", the numbers 05 … 55 sit in a thin ring outside the numerals at rest (the scaffold for children new to five-minute time; Check still runs on).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (frozen h1 kept: "Set the Clock") · instruction: "Set the clock to this time. Move both hands."
- check-empty: "Drag the long hand to the minutes and the short hand to the hour."
- miss1-long: "{mm} minutes is the long hand on the {n}." · miss1-real-time: "Your clock shows a real time — {readout}. Now make it {time}." · miss1-short: "At {mm} minutes past, the short hand has left the {h}: it is part of the way to the {h1}." · miss1-short-oclock: "At {h} o'clock the short hand is right on the {h}." · miss1-both: "Set the long hand first, then the short hand."
- miss2: "Count by fives to {mm}. Then the short hand goes {where}." — authored as six whole sentences (no {where} token): ":00" "… Then the short hand goes on the {h}." · ":05/:10" "… just past the {h}." · ":15" "… a quarter of the way to the {h1}." · ":30" "… halfway to the {h1}." · ":35–:50" "… more than halfway to the {h1}." · ":55" "… nearly to the {h1}."
- success (one whole sentence per case): ":00" "{time} — {phrase}. The long hand is on the 12, the short hand on the {h}." · ":05/:10" "… the short hand just past the {h}." · ":15" "… the short hand a quarter of the way to the {h1}." · ":30" "… the short hand halfway to the {h1}." · ":35–:50" "… the short hand more than halfway to the {h1}." · ":55" "… the short hand nearly at the {h1}."
- settings: "Times" — "O'clock & half past" / "Quarter hours" / "Five minutes" / "Mixed"; "Minute ring" — "Off" / "On".
- aria: long hand "Long hand, pointing at {n}: {mm} minutes"; short hand "Short hand, between {h} and {h1}" (or "on {h}"); readout "Your clock says {time}"; run-on result "The clock ran on to {h1} o'clock: the short hand is on the {h1}" / "… the short hand stopped between the {a} and the {b}".
- **Locale traps**:
  - **{phrase}** = the locale's spoken time, copied from the native-reviewed `positions` tables in `mini tools/learning-clock.js` (11 locales, every five minutes) — never rebuilt: de "zehn nach sechs", "Viertel vor acht", "fünf vor halb eins" (12:25 — the half-relative phrases in de/nl/sv/da/no/fi name the NEXT hour: nl "vijf voor half een", sv "fem i halv ett", da "fem i halv et", no "fem på halv ett", fi "viittä vaille puoli yksi"); fr "six heures dix", "huit heures moins le quart"; es "las seis y diez", "las ocho menos cuarto"; it "le sei e dieci", "le otto meno un quarto"; pt "seis e dez", "quinze para as oito". The phrase sits under the digits so a child in a half-relative locale sees that "halb acht"/"half acht" is 7:30, not 8:30.
  - **the bell strikes the hour it arrives at** ({h1}); the success sentence names {h} (the digits' hour) and the hour the short hand moves toward ({h1}) separately — in half-relative locales this is the same pair the spoken phrase uses.
  - **12-hour face, colon form** in all locales for the target and readout (the 24-hour form is row 159's job); fr success sentence uses "6 h 10".
  - "the hand" is gendered in fr/es/it/pt/de/nl and the Scandinavian definite forms differ (sv visaren, da viseren, no viseren); every sentence is authored whole, no {hand} token; fi needs the elative/illative ("kuudesta", "seitsemään") — the {h}/{h1} slots in fi come from a per-number case table (1–12 × elative, illative, adessive) authored by the fi native, never a suffix rule.

## 10. Sound off, access, phones
- Silent-legible: every state is visible (readout flips, gear slides, hands run, the number lights, ripple rings count the strokes, the crooked gap is ringed).
- Keyboard path in §5; aria-live announces each hand's position on release, the run-on result and the miss bubble.
- Taps: hand grips 44 px (long-hand tip grip 26 px drawn, 44 px hit; short-hand grip 30 px drawn, 44 px hit); the two hit areas never overlap by more than 8 px except when the hands coincide (rule in §5).
- No pictures (nothing below a picture floor).
- Check above the fold at 360 × 740 (644) and 320 × 640 (600).
- Phone: stacked target → clock → readout → bubble; the target phrase drops to one line (font steps 16 → 14 px if needed, gated).

## 11. Distinct from
- **Row 161 Flip Tiles** (two-sided numerals walked from the 12 to read five-minute times) — nothing on this clock flips; the invention here is a CHECK by gearing, not a minute display.
- **Row 104 Echo Slice** (set hours and half hours; the swept wedge shrinks into the hour's slice) — no wedge or slice is ever painted here; the short hand is proven by where it ARRIVES.
- **Row 103 Pull-Back Key** (a reading activity: hold a key and the clock winds BACK to the hour it is in) — here the child builds the pose, nothing is held, and the clock runs FORWARD as a test of the child's own pose.
- **Row 162 Hour Ball** (reading cards; a ball drops at the 12 as the record of the hour) — reading vs setting; no balls here, no gear there.
- **Rows 101, 102, 158, 159, 160** — none sets both hands freely and none tests a pose by running it on.
- **Learning Clock** (premium tool): its hands are geared all the time and it draws an arc; here the hands are loose while the child works and geared only for the test, and no arc is drawn.
- Built registry #1–#22: no clocks.

## 12. Build plan
- **Core state** `{ level, round, target:{h,m}, long:{deg}, short:{deg}, rest:{longDeg, shortDeg}, misses, ringOn }`. Functions: `restPose(seed, target)`, `snapLong(deg)` (12 marks), `snapShort(deg)` (2.5°), `passedHour(shortDeg)`, `readout(longDeg, shortDeg)` (minutes from long, hour = passedHour), `runOn(longDeg, shortDeg)` → `{steps (0 at :00), arriveShortDeg, square: |arriveShortDeg − nearest 30k| ≤ 5°, struck (h at :00, else h + 1)}`, `gradeLong`, `gradeShort` (the rule in §6), `slots(target)`, `nextTask`.
- **Gate's own ground truth** (`verify-run-on-core.js`): angle formulas re-implemented; for every round the right pose reads the target AND runs on square to h + 1; these are refused: short hand on the numeral when m ≥ 15 (runs on crooked short), short hand at the next numeral when m ≥ 45 (crooked past), long hand on numeral = minutes/5 swapped (readout wrong), hands swapped; a consistent but wrong pose (e.g. 6:50 for 6:10) runs on square and is refused by the readout alone; rest pose never right and ≥ 20 min / ≥ 3 h away; the two bots' success rates as in §6; level balance rules; the equivalence "square arrival ⇔ |a − (30h + 0.5m)| ≤ 5°" asserted for every pose of every round.
- **Mutations**: short-hand tolerance widened to ±15° · run-on skipped (readout-only check — must fail the 9:20-on-the-9 pose) · hands geared while setting · live readout before Check · run-on moving the short hand 6° per minute (wrong gear ratio) · bell striking {h} instead of {h1} · rest pose allowed to equal target · level "O'clock" rim bolding all twelve marks · short hand snapping to whole hours (old behaviour) · square tolerance 0° (refuses every right pose because of the 2.5° snap).
- **Local test**: real pointer drags on both hands at 320 · 360 · 412 · 704 · 768 · 1024 · 1366, every round; the 9:20-on-the-9 pose must fail by the run-on with the readout reading 9:20; coinciding-hands pick rule; keyboard path.
- **Pictures**: none. **Risks**: grip overlap on small screens (rule + gate); the fi case table (native-authored). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — the gear clacking in, the clock whirring forward and the bell striking the hour (or clanking at a crooked clock) is a reveal every round, and the Run toggle is a toy.
2. **Would a teacher put it on the board?** Yes — it catches the classic grade-2 error no readout can see (short hand left on the hour at 9:20) by the clock's own gearing, refutes "ten past = the 10" with the readout, and maps the six draw-the-hands sheets onto four levels.
3. **Would a parent trust it?** Yes — no answer-echoing readout while setting, calm, numerals only, works on a phone with the sound off.
4. **The invention in one sentence:** set the hands loose, then the clock gears up and runs on to the next o'clock — a right clock arrives square on the hour, a wrong short hand arrives crooked.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 1→5 · reality 5→5
What changed:
- **Invention replaced.** The flip-tile rim (numerals with the minutes on their backs, flipped by the long hand's sweep) was row 161's Flip Tiles — the same two-sided numeral tiles teaching the same "the 4 says 20". The new invention, the Run-On Test, checks the child's pose by gearing the hands and running on to the next o'clock: it catches the short-hand-on-the-hour error even when the digital readout matches (the error the old readout-only check, and every readout, misses).
- §6 rounds and the short-hand grading rule kept and re-measured (`work-c31/clock.js`): distinct hours per level; five-minute and mixed levels split 5/5 around :30 (0 counted below); ":20 and later" 7/10 and 6/10; the on-the-hour bot wins 2 of 10 in "Five minutes".
- New miss 2 "slots" (dashed notches the hands click into) instead of the tile demonstration; setting 2 is now a minute ring visible at rest; phrase source pointed at the reviewed `learning-clock.js` tables (da 12:25 corrected to "fem i halv et").
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
