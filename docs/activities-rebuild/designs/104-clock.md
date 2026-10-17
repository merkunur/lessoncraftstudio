# Row 104 — Set the Clock: THE ECHO SLICE (1.MD.B.3)

## 0. Identity
- id `clock.set-clock.1-md-b-3` (KEPT; slugs/metadata frozen in all 11 locales) · grade 1 · CCSS 1.MD.B.3 · strand Measurement & Data · own files at rebuild: `set-clock-core.js`, `set-clock-activity.js`, `set-clock-activity.html`, `set-clock-activities.json` (all new).
- ⚠ **The shared manifest, decided (no branching inside one wrapper):** `mini tools/clock-activities.json` today holds TWO rows on one wrapper (`tool: "clock-activity"` → `clock-activity.html` + `clock-activity.js` + `clock-core.js`): `clock.set-clock.1-md-b-3` (this row) and `clock.tell-time-5-min.2-md-c-7` (2.MD.C.7, its own later ORDER row). The split, in ONE commit: (1) cut the `clock.set-clock.1-md-b-3` object out of `clock-activities.json` and paste it into the new `mini tools/set-clock-activities.json` with `id`, `alignment`, `slug` (all 11), `page_title`, `page_intro`, `theme`, `kid_prompt_template` byte-identical, `tool` changed to `"set-clock-activity"`, `task_template` `"set-clock-echo"`, and `params` = the §6 round lists; (2) register `'set-clock-activities.json'` in `frontend/lib/activities.ts` `MANIFEST_FILES` directly after `'clock-activities.json'`; (3) `clock-activities.json` keeps only `clock.tell-time-5-min.2-md-c-7`, and `clock-activity.html`, `clock-activity.js`, `clock-core.js` change by 0 lines (git diff proves it); (4) `node scripts/preflight-activity-routes.js` must report each of the two ids exactly once, and both pages (all 11 slugs of each) return 200 in local-test. The preview webp follows the id, so it is regenerated for this id only.
- frozen page title "Set the Clock — Tell Time to the Hour & Half-Hour (Grade 1)"; the frozen intro promises reading a time, dragging the analog hands to show it, hours and half-hours, and a digital readout — all kept (the readout becomes the clock's printed receipt, §5).
- worksheets it covers: **G1-212** Draw the Clock Hands · **G1-233** Draw the Hands: O'Clock · **G1-234** Draw the Hands: Half Past · **G1-235** Draw the Hands: Quarter Hours · **G1-236** Draw the Hands: Five Minutes · **G1-237** Draw the Hands: Mixed Times.
- old activity: a set-the-clock board on the shared clock core — a worded time, radial drag of both hands (discrete steps), coupled render, a live digital readout, 8 rounds (3:00, 7:30, 9:00, 6:30, 12:00, 4:30, 10:00, 1:30). **Kept:** those 8 times as the default level, dragging the hands, the worded time from the per-locale idiom tables (`ClockCore.strings.timeExpr`, copied as data), the digital readout. **Changed:** the hands are no longer geared — the child places each hand, as on the paper worksheet, and a live readout no longer gives the answer away while setting (it prints after Check).

## 1. The pitch
"Draw the two hands yourself — then the clock paints the part of the hour the long hand has swept, shrinks that same slice into the hour's own slice, and the short hand has to point at its leading edge."

## 2. Why a child will want it again
- **Building a clock.** Each round starts with an empty face and the two hands lying in a little tray: the child picks up the short hand, clicks it onto the hub, swings it; then the long hand. It is the worksheet's "draw the hands", made with real parts that click.
- **The slice show.** On Check, a coral wedge sweeps out from 12 to the long hand like a pie being cut — then a copy of that wedge shrinks, flies, and drops into the hour's slice between two numbers. When the short hand points right at its edge, the two wedges light together, a brass bell on top of the clock rings three little arcs, and a paper receipt slides out under the clock with the time printed on it.
- **A receipt for everything.** The receipt always prints what the hands REALLY say — a child who builds 7:50 instead of 7:10 gets a receipt saying 7:50, and immediately wants to fix it.
- **Free play:** after success the hands stay movable and the slices follow live, so the child can sweep the long hand round and watch the echo creep through the hour's slice — the relationship between the hands as a toy.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** show a given time on an analog clock by drawing (placing) the hour hand and the minute hand: o'clock, half past, quarter hours, five-minute times and a mix (G1-233…237); the hour hand's position must agree with the minutes.
- **Misconceptions and the push-back:**
  - *Hands swapped* (long hand on the hour): the receipt reads the long hand as minutes and the short as the hour — 3:00 built swapped prints "12:15" — and the echo lands in lane 12 with a quarter wedge that the short hand cannot reach.
  - *Half past: the short hand ON the number* (7:30 with the short hand exactly on 7) or *on the next number* (on 8): the long hand's slice is half the face; its echo fills HALF of an hour slice and the true short hand points at the echo's LEADING edge (half-way through the slice). A short hand exactly on 7 puts the echo in the 7-to-8 slice with the hand on its back edge (receipt "7:30" with a pulsing "?" over the 7); a short hand exactly on 8 puts the echo in the 8-to-9 slice (h′ = round(8 − 0.5) = 8), again with the hand on its back edge, and the receipt prints "8:30" with the "?" — the number the child built, plainly not 7:30. Either way the hand is visibly at the start of the echo, never at its leading edge.
  - *Minutes written as the number pointed at* (7:10 → long hand on the 10): the slice from 12 to 10 is almost the whole face; the receipt prints "7:50" — the clock says what the hand says.
  - *Quarter to: the short hand still on the hour before or on the coming hour*: the echo fills three quarters of the lane — the short hand must sit near the end, not at either number.
  - *O'clock with the short hand "between"*: at :00 there is no slice at all, so the echo is a single line on the number — the short hand must be on it.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 (stacked layout):**
- **Left, the clock (the hero):** a face 380 px across inside a 12 px wooden rim (#E9D3B0, 3 px ink edge), cream #FBF3E4; numerals 1–12 Baloo 2 34 px; 60 ticks (5-minute 3 × 14 px, minute 1 × 7 px); hub 20 px. The 12 **hour slices** are drawn faintly (alternate slices in #F6EAD5, 1 px dotted lines from hub to the numerals' outer edge) — the lanes the echo lands in. On top of the rim a small brass **bell** (drawn dome, 44 × 30 px). Below the clock the **receipt slot** (a 200 × 8 px dark slit).
- **The hand tray** (left of the clock at 704, a rounded trough 92 × 300 px): the **short hand** (teal #146B5E, 100 px long, 14 px wide, rounded tip) and the **long hand** (coral #F2784B, 160 px, 8 px wide) lie in it; each is a 92 × 60 px tap target (the visible hand inside). On the clock: short hand length 0.50 r, long hand 0.84 r.
- **Right column (≥ 260 px), the time card:** the target — digital time in Baloo 2 56 px (locale format) and the worded time in 22 px under it (e.g. "half past seven"); below it the receipt after Check (paper strip 180 × 70 px, monospace-free Baloo 2 34 px digits); the bubble (18 px) under the receipt.
- **Task line** (20 px) above.
- No words on the apparatus: numerals on the face and the target/receipt times are the content.

**At 360 (stacked):** time card on top (digital 40 px, words 18 px, one line) → clock 300 px face (numerals 24 px, rim 8 px, bell 34 × 24) → the hand tray becomes a horizontal trough under the clock, 300 × 76 px, hands lying side by side (short 70 px, long 110 px; targets 140 × 64 each) → receipt slides out to the right of the tray's spot (the tray empties once both hands are on the clock). At 320: face 268 px, numerals 22 px.

Pictures: none — the clock is apparatus; the subject is time itself, and every element is drawn geometry. (Library `around-the-house/clock` is NOT used: its hands are fixed at one time.)

## 5. The hand
- **Pick up a hand:** tap a hand in the tray → it flies onto the hub (220 ms) pointing at 12, selected (glow ring at its tip). The other hand stays in the tray until picked.
- **Point it:** with a hand selected, tap anywhere on the face → the hand swings to that angle (160 ms, ease-out, a soft tick); or drag anywhere on the face (the selected hand follows the finger's angle from the hub; first response < 30 ms). Snaps: long hand every 6° (1 minute) visually, settling on 30° steps (5 minutes) on release; short hand settles on 2.5° steps (one "five-minute" step of the hour hand), so every consistent clock state is exactly reachable.
- **Switch hands:** tap the other hand (in the tray or on the clock) to select it; a tap on the hub swaps selection between the two hands. A hand dragged back into the tray comes off the clock.
- **Keyboard:** Tab selects short/long hand; ← → rotate by one snap step (Shift = 30°/one numeral); Enter = Check.
- **After Check (success):** both hands stay draggable; in free play the echo and receipt follow live (§7) and the bell rings at every o'clock reached.
- No sound is needed; ticks and the bell are optional tones (bell: three soft strikes, 90 ms apart).

## 6. The rounds
A round = one target time; the face starts empty with both hands in the tray. The short hand's position is measured in hour units q (0–12, 12 = top); the TRUE position is p = h + m/60. Accepted short-hand windows (the gate's own table; o'clock and half past are strict because the worksheets teach exactly them):
| minutes | accepted q |
|---|---|
| :00 | h − 0.2 … h + 0.2 (on the number) |
| :05, :10 | h − 0.05 … h + 0.45 |
| :15, :20, :25 | h + 0.10 … h + 0.55 |
| :30 | h + 0.30 … h + 0.70 (between, never on a number) |
| :35, :40, :45 | h + 0.45 … h + 0.90 |
| :50, :55 | h + 0.55 … h + 1.05 |
The long hand must be exactly on 6·m degrees (it snaps to 5-minute steps).

**Times setting (one round list per level):**
- **O'clock and half past (default, 10):** 3:00 · 7:30 · 9:00 · 6:30 · 12:00 · 4:30 · 10:00 · 1:30 · 5:00 · 11:30 (the old 8 + 5:00 and 11:30).
- **O'clock (8):** 3:00 · 8:00 · 12:00 · 6:00 · 10:00 · 1:00 · 5:00 · 9:00.
- **Half past (8):** 7:30 · 4:30 · 11:30 · 2:30 · 9:30 · 12:30 · 6:30 · 1:30.
- **Quarter hours (10):** 4:15 · 9:45 · 10:15 · 5:45 · 12:15 · 8:45 · 1:15 · 11:45 · 2:30 · 6:00.
- **Five minutes (8):** 2:10 · 8:20 · 5:40 · 11:50 · 4:05 · 6:25 · 9:35 · 1:55.
- **Mixed (10):** 4:00 · 9:30 · 2:15 · 6:45 · 11:10 · 3:50 · 12:30 · 7:05 · 8:25 · 5:35.
(No time in ANY list repeats one of the sibling row 2.MD.C.7's eight times — 3:15, 7:45, 6:10, 9:20, 4:40, 1:50, 10:05, 12:25 — so the two activities never feel like copies; the quarter list previously carried 3:15 and 7:45 and was changed to 4:15 and 9:45.)

**Answer position:** every pass spreads the target hour over 8–12 different numerals, and the long-hand target over all four quarters of the face (default level: long hand at 12 for 5 rounds, at 6 for 5 — the two places half-hour clocks allow). Starting state is always the empty face, so no pre-set hand position biases the answer. **Order:** order-only reshuffle per pass (never the same sequence twice).

## 7. Check, the misses, the success
- **Check with a hand still in the tray** → hint "Put both hands on the clock." (no miss; the tray hand wiggles).
- **The slice check (every Check):** (1) a coral wedge (35 % alpha) sweeps from 12 clockwise to the long hand (400 ms); (2) a copy of it shrinks to 1/12 size and drops into the hour slice the short hand belongs to — the slice starting at numeral h′ = round(q − m/60), i.e. the hour the short hand is nearest to once the minutes are taken off (450 ms) — the **echo**; (3) the receipt slides out (300 ms) printing the hands' time: minutes from the long hand, the hour h′; if the short hand is outside the echo's window, the hour digit prints with a small "?" beside it.
- **Miss 1 — what the apparatus shows:** the echo stays drawn with its leading edge pulsing (the place the short hand must point to); the short hand gets a teal arrow from its tip to that edge (curved, along the rim of the slices). If the minutes are wrong, the long hand's wedge stays and the receipt's minutes are underlined next to the target's minutes. Hint by case: short hand outside the echo "The short hand points into the little slice." · minutes wrong "The long hand shows the minutes — count by fives from the top." · hands swapped "The short hand shows the hour, the long hand shows the minutes."
- **Miss 2:** ghost outlines of both hands appear in their right places (dotted, 40 % alpha) and the five-minute ticks from 12 to the right minute place carry their numbers 5, 10, 15 … (14 px). Hint "Lay each hand on its dotted outline."
- Any new hand movement clears the showing (echo, arrow and ghosts fade, 200 ms).
- **Success:** wedge and echo light together in solid colour, the bell rings (three arcs), the receipt prints the time in teal with the target's worded time beside it. Bubble: "{time words} — the hands agree!" e.g. "Half past seven — the hands agree!"

## 8. Settings (each visibly changes the board at rest)
1. **Times:** o'clock and half past / o'clock / half past / quarter hours / five minutes / mixed — the face's tick marks change at rest: o'clock levels show only the 12 five-minute ticks; quarter hours thicken the 3/6/9 ticks; five-minute and mixed levels add the 48 one-minute ticks and tiny 5-10-15 … numerals (10 px) outside the rim.
2. **Echo:** after Check / while setting — in "while setting" the long hand's wedge and its echo follow live (the echo sits in whichever slice the short hand currently points into), so the echo becomes a guide for children still learning; the receipt still prints only after Check.

## 9. Words (EN source)
- title (in-tool): "Set the Clock"
- instruction: "Put both hands on the clock to show the time."
- prompt: "Show {time words} — {digital}." (e.g. "Show half past seven — 7:30.")
- hints: hintTray "Put both hands on the clock." · hintEcho "The short hand points into the little slice." · hintMinutes "The long hand shows the minutes — count by fives from the top." · hintSwap "The short hand shows the hour, the long hand shows the minutes." · hintGhost "Lay each hand on its dotted outline."
- success: "{time words} — the hands agree!"
- aria: shortHand "Short hand, the hour" · longHand "Long hand, the minutes" · tray "Hand tray" · receipt "The clock says {digital}".
- settings: "Times" · "o'clock and half past" · "o'clock" · "half past" · "quarter hours" · "five minutes" · "mixed" · "Echo" · "after Check" · "while setting"
- **Locale traps:**
  - **Half-hour idiom:** de *halb acht*, nl *half acht*, sv *halv åtta*, da *halv otte*, no *halv åtte*, fi *puoli kahdeksan* = **7:30**; en/fr/es/pt/it name the current hour. The prompt ALWAYS carries the digital form as well, and the echo is idiom-free (it shows where the short hand is, whatever the words say).
  - **Five-minute idioms around the half** are the hardest strings in the product: de *zehn vor halb acht* (7:20), *fünf nach halb acht* (7:35); nl *tien voor half acht*, *vijf over half acht*; sv *tio i halv åtta*; da *ti minutter i halv otte*; no *ti på halv åtte*; fi *kymmentä vaille puoli kahdeksan*; fr *sept heures vingt*, *huit heures moins vingt-cinq*; es-MX *las siete y veinte*, *veinticinco para las ocho*; pt-BR *sete e vinte*, *vinte e cinco para as oito*; it *le sette e venti*, *le otto meno venticinque*. SoT: the old `timeExpr` table (all 11 already authored for the 2.MD.C.7 sibling) extended for the new times; the reviewer signs every (H,M) string in the round lists.
  - **Quarters:** as row 103 (de *Viertel nach / Viertel vor*, es-MX *cuarto para*, sv *kvart i*, no *kvart på*).
  - **Agreement:** fr *une heure*, pt *uma hora / duas horas*, es *la una*; words, never a bare digit in a spoken sentence.
  - **Digital separator:** en/es/pt/it/de "7:30"; fr "7 h 30"; nl/sv/da/no/fi "7.30". The receipt uses the same format. 12-hour face in every locale.
  - **Noon/midnight:** 12:00 = *midi / mezzogiorno / meio-dia* from the table.

## 10. Sound off, access, phones
- Sound off: everything is visual — the target card, the wedge, the echo, the receipt; bell and ticks are decoration. TTS (bonus) reads the prompt.
- Keyboard path §5; each hand is a focusable button whose aria reports its current numeral ("short hand between 7 and 8").
- Taps: tray hand targets 92 × 60 (704) / 140 × 64 (360); the whole face is a drag/tap surface (≥ 268 px).
- Fold: 360 × 740 → task 48 + time card 80 + clock 316 + tray 76 + Check 56 = ≈ 600; 320 × 640 → ≈ 560 (Check above the fold in both).

## 11. Distinct from
- **Row 103 Owl's Cuckoo Cottage (this batch):** geared hands moved only by a spring key, a reading activity; here the hands are free, placed by the child, and the echo slice judges them.
- **learning-clock tool:** geared demonstration hands with grips and a honey arc showing the idiom's distance; here the hands are NOT geared (the child must make them agree, as on paper), start in a tray, and the check is the shrunken echo of the minute sweep inside the hour slice — the tool has no echo, no tray, no receipt.
- **clock-elapsed / clock-ampm / clock-convert** (grade 2/3): different skills.
- No registry invention uses a scaled echo of one dial inside another.

## 12. Build plan
- **Core state:** `{level, echoMode:'after'|'live', round, target:{h,m}, short:null|q, long:null|minute, sel:'short'|'long'|null, miss, help, done}`.
- **Core functions:** `place(hand, angleDeg)` (snapping rules) · `wedge(longMinute)` → [0, 6m°] · `hourOf(q, m)` → h′ = round(q − m/60) mod 12 (0 → 12) · `echo(q, longMinute)` → slice h′, start angle 30·h′, span 0.5·m° · `window(h,m)` → [lo, hi] from the table · `receipt(short,long)` → {h: hourOf(q,m), m: long, unsure: q outside window(h, m)} · `check(state)` → `{ok, kind:'tray'|'swapped'|'minutes'|'hourOutside'|'otherTime'}`.
- **Gate ground truth (own oracle):** for every round the TRUE state (q = p, long = m) is accepted; the windows are recomputed from p and contain p; short on h and on h+1 are REJECTED for every :30 round; swapped hands rejected for every round; long hand on the "minutes number" (m/5 numeral read as minutes, e.g. 10 for :10) rejected; the receipt for the true state equals the target; each level's list has ≥ 7 distinct times, hours spread over ≥ 8 numerals; every (H,M) used has words + digital in all 11 locales; the sibling row's 8 times are absent from every list.
- **Mutations:** half past accepts the short hand on h · accepts it on h+1 · windows ignore m (one window for all) · long hand graded by numeral = minutes · swapped hands accepted · echo placed in the TARGET's slice instead of the short hand's slice (it would then give the answer away) · receipt reads the hour by nearest numeral instead of by slice · o'clock accepts "between" · live echo shown in "after Check" mode · help survives a hand move · de 7:30 emitted as *halb sieben*.
- **Pictures:** none.
- **Risks:** precise short-hand placement on a 268 px face (the 2.5° step is 2.9 px at r = 67 px) — mitigated by tap-to-point plus the generous windows; local-test drives both tap and drag with real pointers at every width.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — building a clock from parts that click, a pie slice that flies into its little slot, a bell and a printed receipt.
2. **Would a teacher put it on the board?** Yes — "half past: the long hand swept half the face, so the short hand is half way through its slice" is the explanation teachers struggle to draw; here the clock draws it.
3. **Would a parent trust it?** Yes — clean apparatus, true time words in the family's language, no score.
4. **The invention, in one sentence:** the long hand's swept slice of the face is echoed, shrunk, inside the hour's own slice — and the short hand must point right into that echo.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- The shared-manifest note is now concrete: row 104 moves out of `clock-activities.json` into a new `set-clock-activities.json` (`tool: "set-clock-activity"`, id/slugs/titles/intros byte-identical), registered in `MANIFEST_FILES` after `clock-activities.json`; the 2.MD.C.7 row keeps `clock-activity.*` + `clock-core.js` untouched (0-line diff), and `preflight-activity-routes.js` must resolve each id exactly once.
- The quarter list repeated two of the sibling 2.MD.C.7 times (3:15, 7:45) → 4:15, 9:45; the gate now checks every list against the sibling's eight times, not just the five-minute list.
- The half-past push-back was described inconsistently with the echo formula (a hand on 8 does not point "past the front edge" — the echo moves to the 8-to-9 slice). Rewritten from the formula; the pitch now says "its leading edge", which is exactly where the true hour hand points.
- Idioms re-checked per locale (next-hour half de/nl/sv/da/no/fi, current-hour half en/fr/es/pt/it, the around-the-half five-minute forms). Distinct from learning-clock: hands are ungeared, start in a tray, and the echo/receipt judge them — the tool's geared hands and idiom arc are not copied.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
