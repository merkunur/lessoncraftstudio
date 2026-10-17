# Row 103 — Owl's Cuckoo Cottage: THE PULL-BACK KEY (1.MD.B.3)

## 0. Identity
- id `clock-read.tell-time.1-md-b-3` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl; sv/da/no/fi slug, title and intro are new at build) · grade 1 · CCSS 1.MD.B.3 · strand Measurement & Data · own files at rebuild: `clock-read-core.js` (rewritten; still models, never imports, any clock core), `clock-read-activity.js`, `clock-read-activity.html`, `clock-read-activities.json`.
- frozen page title "Owl's Cuckoo Cottage — Read and Set the Clock"; the frozen intro promises Owl's day, reading the wall clock to find what Owl is doing, and setting the hands so the cuckoo pops out — all kept. Owl IS the cuckoo: the library owl lives behind the cuckoo door.
- worksheets it covers: **G1-148** On the Hour (read, write the time) · **G1-149** Half Past What? (read half past, write) · **G1-150** Clock Partners (match analog clocks to digital times).
- old activity: READ (pre-set clock, tap the matching event card), SET (radial-drag both hands to a worded time), ORDER (three clocks, tap the one for the event), WORLD-CUE (dawn/noon sky → set), two band-3 quarter rounds; coupled hour hand (30H + 0.5M); no digital target; emoji event cards. **Kept:** Owl's day and its event times (breakfast 7:00, lunch 12:00, garden-time slot 3:00 → Snack, supper 6:30 → kept as 6:00/6:30 rounds, bedtime 8:30), the coupled hour hand, read + set + three-clock partners (the old ORDER rounds become Clock Partners), the quarter rounds (as a setting), the per-locale time-word tables already authored for de/fr/es/pt (`wordForDE/FR/ES/PT`), the frozen-cottage rule (nothing moves while the child decides). **Dropped:** the emoji (now library pictures), hand-dragging (row 104 owns hand-dragging), the sky-cue rounds (a sky colour has two right readings — in Helsinki in June dawn is at 4).

## 1. The pitch
"Owl's clock has a spring key: hold it and wind the clock back — the long hand climbs to the top and the short hand lands exactly on the hour the clock is IN; let go and it whirrs back to now."

## 2. Why a child will want it again
- **A pull-back toy.** The brass key on the side of the clock is a spring: drag it round anticlockwise and both hands run backwards together, a ratchet click per five minutes; let go and the clock whirrs forward to the real time like a released wind-up car. Children wind it for the whirr alone.
- **Owl pops out.** On every right answer the cuckoo door bangs open and Owl springs out on a little zigzag arm holding up the picture of what she is doing (a pancake, a book, a bathtub), bobs, and the door shuts. On the hour she bobs as many times as the hour (as a real cuckoo clock calls); at half past and quarters she bobs once — a row of small dots under the door lights one per bob, so the count is seen with the sound off.
- **Owl's day goes on.** The cottage window shifts with the clock's time from pale morning to deep teal evening with the library moon hanging in it after 6:00 — the day is the story, not a score.
- **Set rounds wind the day forward.** In set rounds the key is pulled out (like a watch crown) and winds the clock ON from Owl's last activity to her next — the child lives through the hour and a half between breakfast and reading, Owl popping out at every o'clock passed.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** read and write time in hours and half-hours on an analog clock (quarter hours in the extension setting); match an analog clock to its digital partner; set a clock to a given time.
- **Misconceptions and the push-back:**
  - *Half past seven read as half past EIGHT* (the short hand is nearer 8): wind back to the top and the short hand lands on **7**, never on 8. The key does not explain; it shows the hour the clock is in.
  - *Hands swapped* (6:00 read as 12:30): winding back makes the long hand the one that climbs to 12; the short hand only creeps. Whichever hand travels to the top is the minute hand — seen, not told.
  - *O'clock read as the long hand's number* ("12 o'clock" for 7:00): the long hand is already at the top, so the key clicks once and refuses ("already o'clock") and the short hand's numeral rings — the only number left to read.
  - *A clock state that cannot exist* (short hand exactly on 8 at 7:30): impossible here — the hands are geared as in a real clock; every face the child ever sees is a true face, so reading is never trained on a false picture.

## 4. The stage
**At 704 (layout `split`):**
- **Left, the cottage clock (the hero), 330 × 420 px:** a cuckoo-house outline (drawn apparatus: roof triangle, 3 px ink frame, wall #E9D3B0, trim #146B5E). Inside, the **clock face** 280 px across: cream #FBF3E4, numerals 1–12 Baloo 2 30 px, 60 minute ticks (5-minute ticks 3 px × 12 px, minute ticks 1 px × 6 px), **short hand** #146B5E (length 0.50 r, 12 px wide, rounded), **long hand** #F2784B (0.85 r, 7 px), hub 16 px. Above the face the **cuckoo door** 64 × 64 px (two shutters); Owl = library `forest-creatures/owl`, 96 px when out on her zigzag arm. Under the door a row of up to 12 bob-dots (10 px, 4 px apart).
- **The key:** brass, at face height on the cottage's right wall — a shaft and a bow; the bow is a 72 px ring (the grip; hit circle 88 px). A faint dotted circle around the bow shows its drag track. In read rounds the shaft shows a little coil (spring position, teal shaft). In set rounds the shaft is pulled out 14 px and the bow is orange (set position). Under the key two small buttons ◀ ▶ (48 × 44 px) for the same steps.
- **The window** (top-left of the cottage, 70 × 56 px) is a plain daylight pane while the child decides (it never tells morning from evening — a moon beside a bedtime card would be an answer tell). Only on success does it fade to the event's part of the day (pale morning … deep teal evening; a drawn crescent, apparatus, after supper — no library picture here, it would be below the size floor).
- **Right column (≥ 300 px), the answer area** — one of three by round type:
  - **Owl's day board:** three event cards stacked, 260 × 104 px each: library picture 96 px left, a digital time tag right (Baloo 2 34 px, the locale's format). Tap selects (teal 4 px ring, lifts 3 px).
  - **The time tag (write the time):** a digital tag 240 × 110 px with two flip-wheels — hour (1–12) and minute (:00 :30; :15 :45 in the quarter setting), each 96 × 100 px with ▲ ▼ buttons 48 × 44 px; the separator is the locale's (§9).
  - **Partners:** the cottage clock is replaced by THREE small clocks in a row (150 px faces, same drawing, each with its own little door) and the digital time hangs on a sign above them (Baloo 2 40 px). The key sits under the row on a bracket; tapping a clock selects it and slides the bracket under it, so the key always winds the selected clock.
- **Bubble** under the answer area (18 px). **Task line** (20 px) above everything.

**At 360 (stacked):** cottage 300 × 340 (face 236 px, numerals 24 px, key bow 60 px with a 76 px hit circle at the cottage's right edge); answer area below: event cards 320 × 84 (picture 64 px, tag 28 px), time tag 300 × 96 (wheels 84 × 90, buttons 44 × 44), partners row 3 × 104 px faces (numerals 14 px; key under the row, 56 px bow). At 320: face 210, partner faces 96 (numerals 13 px — only the 12/3/6/9 numerals are kept at this size, the others become 4 px dots, as on many school clocks).

Pictures (theme JSON + contact sheet checked): `forest-creatures/owl`; events — `breakfast/pancake` Breakfast · `activities/reading` Reading · `activities/puzzle` Puzzle · `classroom/lunchbox` Lunch · `activities/playground` Playground · `breakfast/muffin` Snack · `activities/piano` Music · `around-the-house/pot` Supper · `around-the-house/bathtub` Bath · `around-the-house/bed` Bedtime; `space/moon` window decoration. Cottage, clock, key, tags, wheels, dots: drawn apparatus. ⚠ `activities/painting` and `activities/picnic` are drawn in the cache but have NO lcs-pictures label (absent from `activities.json`) — not usable; Lunch is `classroom/lunchbox`, the art activity is `activities/puzzle`. No words on the apparatus: event cards carry a picture and a time, never a label word (the label is spoken and is the card's aria).

## 5. The hand
- **Wind back (read rounds):** grab the bow and drag anticlockwise round its track (or hold ◀). Every 30° of key = 5 minutes back: both hands move together (minute 30°, hour 2.5°), a ratchet tick (25 ms) and the passing 5-minute tick on the face flashes. First response < 40 ms (the bow turns under the finger). The key **stops itself** when the long hand reaches 12: a firmer clunk, the short hand's numeral swells to 40 px for 600 ms and keeps a teal ring ("this is the hour"). It cannot wind past the last o'clock. A clockwise drag in read rounds does nothing (the spring only winds back).
- **Let go:** the key spins forward by itself (420 ms ease-out), the hands whirr back to the round's time, the numeral shrinks back (the ring stays until the next interaction). Rewinding never changes the answer state and can be repeated freely.
- **Wind on (set rounds):** key pulled out (orange). Clockwise drag winds forward, anticlockwise back, one click per 5 minutes; soft detents at :00 and :30 (quarter setting: :00 :15 :30 :45) — on release the hands settle on the nearest detent (120 ms). ◀ ▶ = one detent; hold repeats 6 per second. Owl pops out briefly (no bob-count) at every o'clock passed while winding.
- **Event card / partner clock:** tap = select (one at a time; tap again deselects).
- **Flip-wheels:** ▲ ▼ (flip 140 ms, click). Hour wheel 12 → 1 → … → 11 → 12 (no 0, no 13); minute wheel cycles its legal values only.
- **Free play** (after success, before Next): the key pulls out on any clock and the child may wind freely; Owl pops out with her bob-count at every o'clock and once at every half past passed — winding through an afternoon is a toy.
- **Keyboard:** Tab → key; ← / → one detent back / on; Space releases (read rounds); Tab → cards / wheels; Enter selects; ↑ ↓ turn wheels.

## 6. The rounds
A round = one geared clock state + one way to answer. Times are 12-hour, day times of Owl's day; the hour hand sits at exactly 30·H + 0.5·M degrees.

**Setting "o'clock and half past" (default) — 11 rounds:**
| # | type | clock shows | answer area (left→right / top→bottom) | right | near-misses offered |
|---|---|---|---|---|---|
| 1 | day board | 7:00 | Breakfast 7:00 · Supper 6:00 · Lunch 12:00 | card 1 | 12:00 (reads the long hand) · 6:00 (neighbour number) |
| 2 | write | 3:00 | wheels start 12 · :30 | 3 · :00 | — |
| 3 | day board | 8:30 | Reading 9:00 · Bath 7:30 · Bedtime 8:30 | card 3 | 9:00 (nearer number) · 7:30 (hour before) |
| 4 | partners | sign 6:30 | clocks 6:00 · 7:30 · 6:30 | clock 3 | 6:00 (minute hand ignored) · 7:30 (next-hour reading) |
| 5 | set | from Breakfast 7:00 → Reading 9:00 | key out | 9:00 | — |
| 6 | write | 1:30 | wheels start 2 · :00 | 1 · :30 | — |
| 7 | day board | 12:00 | Playground 1:30 · Lunch 12:00 · Supper 6:00 | card 2 | 6:00 · 1:30 |
| 8 | set | from Snack 3:00 → Music 4:30 | key out | 4:30 | — |
| 9 | partners | sign 10:30 | clocks 10:30 · 11:30 · 10:00 | clock 1 | 11:30 · 10:00 |
| 10 | write | 6:30 | wheels start 7 · :00 | 6 · :30 | — |
| 11 | partners | sign 4:00 | clocks 5:00 · 4:00 · 4:30 | clock 2 | 5:00 (neighbour hour) · 4:30 (minute hand ignored) |
Wheel start values are never the answer; in the two half-past write rounds (6 and 10) the start hour IS the next-hour trap (2 for 1:30, 7 for 6:30), deliberately, so a child who reads the nearer number and leaves the wheel is caught by the rewind.

**Setting "with quarter hours" — 8 quarter rounds, mixed with rounds 1, 3, 4, 6 above (12 per pass):**
| # | type | clock | answer area | right |
|---|---|---|---|---|
| Q1 | day board | 3:15 | Snack 3:15 · Playground 3:45 · Music 4:15 | card 1 |
| Q2 | write | 7:45 | wheels start 8 · :15 | 7 · :45 |
| Q3 | partners | sign 9:15 | clocks 9:45 · 9:15 · 3:45 | clock 2 |
| Q4 | set | from Supper 6:30 → Bath 7:45 | key out | 7:45 |
| Q5 | day board | 11:45 | Lunch 12:15 · Puzzle 11:45 · Reading 11:15 | card 2 |
| Q6 | write | 2:15 | wheels start 3 · :45 | 2 · :15 |
| Q7 | partners | sign 5:45 | clocks 6:45 · 5:15 · 5:45 | clock 3 |
| Q8 | set | from Lunch 12:00 → Playground 1:15 | key out | 1:15 |
In each round the times on the cards are that round's own, so Owl's schedule never contradicts itself inside a round. Every quarter-to round offers the "next hour" time (6:45 for 5:45) — the classic quarter-to trap.

**Answer position:** the six choice rounds of the default pass (1, 3, 7 boards; 4, 9, 11 partners) put the right card/clock in positions 1/2/3 as 2/2/2; the quarter pass has seven choice rounds (1, 3, 4, Q1, Q3, Q5, Q7) at 2/2/3 — within one, the gate counts both; set rounds always start 1–2½ hours earlier on Owl's day (12–30 clicks, never more). **Order:** order-only reshuffle per pass; the window colour follows the clock's time, not the round number.

## 7. Check, the misses, the success
- **Check with nothing chosen / wheels untouched / clock not wound** → "Choose a card." / "Turn the wheels to write the time." / "Wind the key to Owl's time." (no miss).
- **Miss 1 — what the apparatus shows:** the key winds back BY ITSELF (slow, 900 ms) until the long hand reaches the top; the short hand's numeral rings teal and the ring stays; then the clock whirrs back. Set rounds: a small grey tag under the face shows the time the child made beside the target tag. Hint (read) "Wind back to the top — the short hand lands on the hour." · (set) "Look at the short hand first: which hour does Owl need?"
- **Miss 2:** the 5-minute ticks from 12 to the long hand light up as beads one after another, with 5, 10, 15 … beside every bead (14 px), ending at the long hand; the ringed hour numeral pulses; on the day board / partners the right card's or clock's rim takes the same teal as the ring. Hint "{hour} o'clock was here — now count on to the long hand." (e.g. "7 o'clock was here — now count on to the long hand.")
- Any new selection, wheel turn or key turn clears the showing.
- **Success:** the cuckoo door bangs open, Owl springs out holding the round's event picture (96 px) and bobs (hour count on the hour; once on halves and quarters), the dots lighting; the chosen card / wheels / clock glows teal. Bubble: "It's {time words}! Owl is {event phrase}." e.g. "It's half past eight! Owl is going to bed." · write: "It's {time words} — {digital}." · set: "You wound the clock to {time words}!"

## 8. Settings (each visibly changes the board at rest)
1. **Times:** o'clock and half past / with quarter hours — the minute wheel gains :15 :45 and the face's 3/6/9 ticks thicken.
2. **Rounds:** read only / read and set — in read only the set rounds become write rounds (default: 5 → write 9:00 with wheels starting 10 · :30, 8 → write 4:30 with wheels starting 5 · :00; quarter level: Q4 → write 4:45 with wheels starting 5 · :15, Q8 → write 1:15 with wheels starting 2 · :45) and the key never shows its orange set position.

## 9. Words (EN source)
- title (in-tool): "Owl's Cuckoo Cottage"
- instruction: "Read Owl's clock. You can hold the key to wind it back."
- prompts: board "What is Owl doing now?" · write "What time is it? Turn the wheels." · partners "Which clock says {digital}?" · set "Wind the clock to {time words} — {digital}." (e.g. "Wind the clock to half past four — 4:30.")
- hints: hintChoose "Choose a card." · hintWheels "Turn the wheels to write the time." · hintWind "Wind the key to Owl's time." · hintBack "Wind back to the top — the short hand lands on the hour." · hintShortFirst "Look at the short hand first: which hour does Owl need?" · hintCount "{hour} o'clock was here — now count on to the long hand."
- success: "It's {time words}! Owl is {event phrase}." · "It's {time words} — {digital}." · "You wound the clock to {time words}!"
- event phrases: having breakfast · reading · doing a puzzle · having lunch · at the playground · having a snack · playing the piano · having supper · having a bath · going to bed.
- settings: "Times" · "o'clock and half past" · "with quarter hours" · "Rounds" · "read only" · "read and set"
- **Locale traps:**
  - **The half-hour idiom points to opposite hours.** de *halb neun*, nl *half negen*, sv *halv nio*, da *halv ni*, no *halv ni*, fi *puoli yhdeksän* all mean **8:30** (toward the next hour); en/fr/es/pt/it name the current hour (*huit heures et demie*, *las ocho y media*, *oito e meia*, *le otto e mezza*). So: every worded time is ALWAYS printed with its digital form; the next-hour near-miss exists in every locale; and the hint "the short hand lands on the hour" is true in every language (it names the hour the clock is IN, not the idiom's word). Time-word SoT: the old de/fr/es/pt functions plus the learning-clock TIME_RULES as reference data copied (never imported) for it/nl/sv/da/no/fi; the reviewer signs every (H, M) string used.
  - **Quarters:** de *Viertel nach acht / Viertel vor neun* (not the regional *viertel neun*); fr *et quart / moins le quart*; es-MX *y cuarto / cuarto para las ocho* (never *menos cuarto*); pt-BR *e quinze / quinze para as oito*; it *e un quarto / meno un quarto*; nl *kwart over / kwart voor*; sv *kvart över / kvart i*; da *kvart over / kvart i*; no *kvart over / kvart på*; fi *varttia yli / varttia vaille*.
  - **Agreement:** fr *une heure* (fem.), pt *duas horas* (fem.), es *la una* singular — emit words, never a bare digit inside a spoken sentence (es TTS reads "1" as *uno*).
  - **Digital separator:** en/es/pt/it/de "7:30"; fr "7 h 30"; nl/sv/da/no/fi "7.30" (school-book form). Always a 12-hour face; no "19.30" for an evening event in any locale.
  - **Noon:** fr *midi*, it *mezzogiorno*, pt *meio-dia*, es *las doce* — from the table, never the formula.
  - **Event phrases** carry verbs and articles per locale (de *frühstückt*, fr *prend son petit-déjeuner*, fi *syö aamupalaa*); Owl's name per locale from the old file; sv/da/no/fi names authored at build.

## 10. Sound off, access, phones
- Sound off: bob-dots count the calls; the hour ring and minute beads are visual; the card picture carries the meaning. TTS (bonus) reads the prompt, the event and the time.
- Aria: clock "Owl's clock: short hand between 8 and 9, long hand at 6" (built from state); key "Spring key — drag to wind back" / "Key — drag to wind on"; cards "{event}, {digital}"; wheels "hour, {value}" / "minutes, {value}".
- Taps: key hit circle 88 / 76 px; ◀ ▶ and wheel buttons ≥ 44 px; cards ≥ 84 px tall.
- Pictures: Owl 96 / 64 px; event pictures 96 / 64 px.
- Fold at 360 × 740: task 48 + cottage 340 + answer ≤ 270 + Check 56 → Check ≈ 714. At 320 × 640 the three cards go into one row of 96 × 132 cards (picture 64 above the tag) and the cottage shrinks to 270 → Check ≈ 600.

## 11. Distinct from
- **Row 104 Set the Clock (this batch):** there the child places each hand freely and the ECHO SLICE judges; here the hands are geared and only the spring key moves them. Reading vs setting; key vs hands.
- **learning-clock tool** (drag geared hands, spoken idiom, honey arc on the bezel): no hand is ever dragged here, no arc is drawn, and the spring-back to the last o'clock is not in the tool.
- **clock-digital / clock-convert activities** own analog-to-digital quizzing; here partners is one round type inside Owl's day, judged by the rewind.
- No registry invention (built or designed) uses a spring key or a pull-back rewind.

## 12. Build plan
- **Core state:** `{level:'half'|'quarter', mix:'read'|'readset', round, type:'board'|'write'|'partners'|'set', time:{h,m}, start:{h,m}, shown:{h,m}, back:0..11, cards:[{event,h,m}], pick:null|i, wheels:{h,m}, clocks:[{h,m}], sel:null|i, miss, help}`.
- **Core functions:** `angles(h,m)` → {hour 30h+0.5m, minute 6m} · `backToHour(h,m)` → m/5 detents · `stepBack(s)` (refuses past the last o'clock in read) / `stepOn(s, step)` · `wordsFor(loc,h,m)` / `digitalFor(loc,h,m)` · `check(s)` → `{ok, kind:'empty'|'nextHour'|'longHand'|'minute'|'other'}` · `eventPhrase(loc,id)`.
- **Gate ground truth (own oracle):** each board/partner round has exactly one option equal to the clock; the near-misses classified by the oracle's own geometry (nextHour = (h mod 12)+1, same m; longHand = the numeral under the minute hand); `backToHour` lands the hour hand on exactly 30·h degrees for every round; set starts are earlier than targets and ≤ 30 clicks away; position balance 2/2/2 (default) and within one (quarter); the window colour is identical for every round before Check; every (H,M) used has words + digital in all 11 locales with the right separator; no minute outside the level's set.
- **Mutations:** hour hand uncoupled (30h only) · rewind stops at the nearest numeral, not the last o'clock · rewind allowed past the o'clock · next-hour card accepted at half past · :45 on the wheel in the half level · de 8:30 emitted as *halb acht* · fi separator ":" · set round accepts its own start · help survives a new pick · bob count = hour at half past · window shows the evening colour before Check (tell) · an unlabelled picture (painting/picnic) referenced.
- **Pictures to confirm at build** (contact sheets seen 2026-10-17: owl, pancake, muffin, reading, puzzle, playground, piano, pot, bathtub, bed all clear; lunchbox from `classroom`): each event picture at 96 / 64 px; the owl framed in a 64 px door (ears inside the door frame).
- **Risks:** a circular drag on a 60 px bow at 360 — ◀ ▶ are the guaranteed path and local-test drives both; the drag hit-annulus is generous (40–110 px from the bow centre).
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a spring key that whirrs back, an owl that bursts out and bobs the hour, a day that turns to night.
2. **Would a teacher put it on the board?** Yes — "wind it back to the top: where does the short hand land?" is the whole half-past lesson, and the class sees it happen.
3. **Would a parent trust it?** Yes — calm, library pictures, only true geared clock faces, no score.
4. **The invention, in one sentence:** hold Owl's spring key and the clock winds back to the last o'clock — the short hand lands on the hour it was in — and when you let go it whirrs back to now.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Two event pictures did not exist as usable art: `activities/painting` and `activities/picnic` are in the cache but have no lcs-pictures label. Lunch is now `classroom/lunchbox`, Painting became Puzzle (`activities/puzzle`); all event art seen on contact sheets.
- The cottage window was an answer tell (evening colour + moon beside the Bedtime card; morning beside Breakfast). It is now a neutral daylight pane until success, and the 40 px library moon (below the picture floor) is gone.
- The claimed 2/2/2 answer balance was false (5 choice rounds gave 2/1/2). Added round 11 (partners, 4:00 vs 5:00 / 4:30, right in position 2) → 2/2/2; the quarter pass is stated honestly as 2/2/3.
- "Read only" now names the replacement for the default set rounds too, with their wheel start values (never the answer, the next-hour trap where it applies).
- Clock idioms re-checked per locale (next-hour half: de/nl/sv/da/no/fi; current-hour half: en/fr/es/pt/it; quarters incl. no *kvart på*, es-MX *cuarto para*); no learning-clock interaction is copied (no hand is ever dragged, no arc).
