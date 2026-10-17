# Row 102 — Sprocket's Clock (to the hour) → THE DIGITS THAT RIDE THE HANDS (1.MD.B.3)

## 0. Identity
- id `clock-digital.read-hour.1-md-b-3` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl, sv — da/no/fi slug, title and intro are new at build) · grade 1 · CCSS 1.MD.B.3 (tell and write time in hours and half-hours using analog and digital clocks) · strand Measurement & Data · own files `ride-hands-core.js`, `ride-hands-activity.js`, `ride-hands-activity.html`, `ride-hands-activities.json` (this row leaves `clock-digital-activities.json`; the other clock-digital rows stay there until their own rebuild; the id is unchanged).
- page title (frozen): "Sprocket's Clock — Read the Clock to the Hour (Grade 1)"; intro (frozen) promises: **read an analog clock at o'clock times and tap the matching digital time**, Sprocket the rooster cheers, connect the clock face to the digital time (3 o'clock = 3:00). **All kept true**: the clock is read, a digital card is tapped; Sprocket is now the library rooster, not a drawn stub.
- worksheets also covered: G1-148 On the Hour · G1-149 Half Past What? (setting "o'clock and half past") · G1-150 Clock Partners (match analog to digital — the task itself).
- what the old activity did: an analog clock, three digital options, tap one. **Kept**: the nine o'clock targets (3, 9, 6, 1, 11, 5, 8, 2, 7), tap-a-digital-card, Sprocket. **Changed**: the distractors (the old ones were random hours — 3:00 vs 9:00 vs 6:00 — which never tested the real error; now every round offers the long-hand reading 12:00 or a far hour plus a neighbour hour), and the whole feedback (see §1). A 12:00 round is added so "never pick 12" is not a strategy.
- sibling row 101 (half hours) uses a different invention (the Hour Road); the two are built as separate engines.

## 1. The pitch
"A digital time is the two hands written down — so when you tap a card, its coral hour rides out along the short hand and its teal minutes ride along the long hand, and they only click home if each lands on the number its hand points to."

## 2. Why a child will want it again
- The clock is big, warm and real-looking; Sprocket the rooster sits on top of it.
- Each digital card is a little flip-clock with **coral hour digits** and **teal minute digits** — the same colours as the clock's short coral hand and long teal hand. The colour link is the first thing a child notices and the whole idea of the activity.
- The ride home is a show: the coral number slides off the card and travels up the short hand like a bead on a wire; the teal "00" travels up the long hand. When they land on their numbers they **merge** with a click and the numeral on the dial flashes.
- The earned show: **an hour passes.** The long hand races one full lap (1.2 s, ticking), the short hand steps to the next number, the card flips its coral digit forward (3:00 → 4:00), and Sprocket hops and flaps (a scale-bounce of the library picture). Then everything glides back.
- Free play: tapping the long hand makes an hour pass at any time (one full lap, the short hand steps on, the card on the clock's base flips) — children tap it again and again to send the clock round the day.
- No score, no timer (the clock is not a timer — it never ticks by itself), no lives.

## 3. The skill and the misconception
- Skill (1.MD.B.3; G1-148/150): read an analog clock at o'clock: the **short hand** names the hour, the **long hand on 12** means zero minutes, written ":00"; match it to the digital time. With the setting, half past: the long hand on 6 = ":30".
- Misconceptions and push-back:
  1. **Reading the long hand as the hour** (the long hand points at 12, so "12:00") → the coral 12 rides out along the **short** hand and arrives at the number that hand really points to (3): a 12 sitting on a 3 does not merge — it bounces, side by side with the 3, and the 12 at the top glows teal: that is where the long hand points, and the long hand's number is the minutes.
  2. **Mixing up which hand is which** → hands and digits share colour and length cues, and each part of the card rides only its own hand: the card literally assigns the hour to the short hand.
  3. **Reading a neighbour number** (the hour after or before) → the coral digit lands one number off and visibly does not merge.
  4. **":00" means nothing** → the teal minutes always ride the long hand to the 12, where a small teal "00" collar sits outside the rim (and, with the setting, a "30" collar at the 6). A ":30" card on an o'clock clock sends its 30 to the 6 — where the long hand is not.

## 4. The stage
At 704 (split layout, stage ≈ 660 × 460):
- **The clock** (left, drawn apparatus): face 330 px across, cream (#FFF8E7) with a 6 px teal rim (#146B5E); numerals 1–12 in Baloo 2 32 px ink (#0F4A40); minute marks as short ticks (60, the five-minute ones longer); **short hand** coral (#F2784B), 12 px wide, reaching 55 % of the radius, rounded tip; **long hand** teal (#146B5E), 6 px wide, reaching 88 %; a brass centre cap. Outside the rim: a small **teal collar** at 12 reading "00" (16 px digits in a 34 × 22 pill) — in the half-past setting a second collar at 6 reading "30". (These are content digits — minutes — not decoration.)
- **Sprocket**: library farm-animals/rooster, 96 px, standing on the clock's top edge (off the numerals).
- **Clock base**: a small drawn plinth under the clock with an empty **card slot** (where the chosen card docks during the ride).
- **The cards** (right column): three flip-clock cards 200 × 92 stacked with 16 px gaps; each card: dark-teal display (#0E3B34), hour digits coral 44 px, colon cream, minute digits teal-light (#7FD1C3) 44 px; a 3 px ink frame, radius 12. Chosen card: lifted 3 px, cream outline 4 px.
- Task line above (≤ 24 px, ≤ 2 lines); bubble under the cards.

At 360 (stacked, stage ≈ 336): clock 260 px (numerals 26 px, collar digits 14 px); Sprocket 64 px; cards in one row of three 104 × 64 (digits 28 px); stage ≈ 260 + 12 + 64 = 336 px — with header, task line, bubble and Check above the 360 × 740 and 320 × 640 folds (at 320: clock 240, cards 96 × 60, digits 26).

Library pictures (checked in `mini tools/pictures/farm-animals.json`, seen on the contact sheet 2026-10-17): farm-animals/rooster (a full-colour rooster, side view — reads as Sprocket). Everything else is drawn apparatus.

Task line (EN): "Read the clock. Tap the matching digital time."

## 5. The hand
- **Tap a card** → it lifts and is outlined (80 ms, soft tick). Tapping another moves the choice. **Check** (shell) starts the ride.
- **The ride** (on Check, 1.6 s): the card glides into the base slot (240 ms); its **coral hour digits** lift off and travel along the short hand from the centre to the hand's tip, then out to the numeral it points at (700 ms, a rising glissando); in parallel the **teal minute digits** travel along the long hand to the rim and out to the collar it points at.
  - If both land on their twins → each **merges** (the travelling digits shrink into the dial numeral / collar, which flashes, 1.4 kHz click).
  - If a part lands on a different number → it **bounces** off (two small hops), and rests beside that number for the miss showing (§7).
- **Free play — tap the long hand**: one full lap (1.2 s, 12 soft ticks, the "00" collar at the 12 flashing as the long hand arrives back on it — sixty minutes, one lap), the short hand steps forward one number, and the digital display on the base (if a card is docked) flips its hour. Tap the short hand: it wiggles and its number lights (it names itself). Neither changes the round's question; the clock returns to the round's time when a card is tapped.
- Optional TTS: tap a card's speaker corner → it speaks the time in words ("three o'clock").

## 6. The rounds
One round = the clock at a time, three cards (one matches). 

**Level "o'clock" (default) — 10 rounds** (the nine old targets kept + 12:00)
| # | clock | cards | the errors the wrong cards represent |
|---|---|---|---|
| H1 | 3:00 | 3:00 · 12:00 · 4:00 | long hand read as hour · neighbour |
| H2 | 9:00 | 9:00 · 12:00 · 8:00 | long hand · neighbour |
| H3 | 6:00 | 6:00 · 12:00 · 7:00 | long hand · neighbour |
| H4 | 1:00 | 1:00 · 7:00 · 2:00 | far hour · neighbour |
| H5 | 11:00 | 11:00 · 12:00 · 10:00 | long hand (and neighbour!) · neighbour |
| H6 | 5:00 | 5:00 · 11:00 · 6:00 | far hour · neighbour |
| H7 | 8:00 | 8:00 · 12:00 · 9:00 | long hand · neighbour |
| H8 | 2:00 | 2:00 · 8:00 · 1:00 | far hour · neighbour |
| H9 | 7:00 | 7:00 · 12:00 · 6:00 | long hand · neighbour |
| H10 | 12:00 | 12:00 · 6:00 · 11:00 | both hands up: the trap is assuming 12 is never right |
12:00 appears as a wrong card in 6 rounds and as the right card in 1 (gated: a child who never picks 12:00 fails H10; a child who always picks the card that is not 12:00 and not a neighbour is still forced to read).

**Level "o'clock and half past" (setting; G1-149) — 10 rounds** (minutes collar at 12 and at 6)
Every round offers the right time, the same hour with the other minutes (:00 ↔ :30), and either the short-hand neighbour with the right minutes or (M6, M8) the long-hand reading 12:00.

| # | clock | cards |
|---|---|---|
| M1 | 4:00 | 4:00 · 4:30 · 5:00 |
| M2 | 10:30 | 10:30 · 10:00 · 11:30 |
| M3 | 2:30 | 2:30 · 2:00 · 3:30 |
| M4 | 7:00 | 7:00 · 7:30 · 6:00 |
| M5 | 12:30 | 12:30 · 12:00 · 1:30 |
| M6 | 9:00 | 9:00 · 9:30 · 12:00 |
| M7 | 5:30 | 5:30 · 5:00 · 6:30 |
| M8 | 1:00 | 1:00 · 1:30 · 12:00 |
| M9 | 8:30 | 8:30 · 8:00 · 9:30 |
| M10 | 3:00 | 3:00 · 3:30 · 2:00 |
At half past the short hand sits **half way** between two numbers: the coral digit rides out to the rim between them and then **slides back** (counter-clockwise, 300 ms) to merge with the number the hand has **passed** — so "half past 2" shows why it is 2:30, not 3:30.

- **Answer position**: the three cards are reshuffled at every showing; gated over 300 showings per level: the right card is in each position 30–37 %, never in the same position more than 2 rounds running; the neighbour card is above/left of the right card in 40–60 % (it is never always "the one after").
- **Order**: order-only reshuffle per pass (`nextTask`), never the same order twice in a row.

## 7. Check, the misses, the success
- **Check with no card chosen** → the short hand wiggles and then the long hand wiggles; bubble "Look at the short hand, then the long hand. Then tap a card." (no miss)
- **Miss 1** → the ride happens (§5); the part that did not merge rests beside the number it reached. The hand it rode **glows** in its colour from centre to tip, and the number that hand really points to pulses. Bubble, by error: hour wrong — "The short coral hand points to {h}. The hour is {h}." · minutes wrong — "The long teal hand points to the {12|6}. That means {:00|:30}." Then the parts glide back to the card, the card returns to its place (still selectable).
- **Miss 2** → a **ghost card** builds itself on the clock's base from the hands: the coral digit flies **inward** from the numeral at the short hand's tip, the teal digits fly inward from the collar at the long hand's tip, and they assemble into the matching card's time on the base (shown, faint, for 2 s, then fade to 30 % and stay). The right card in the column does not glow — the child still finds it by its digits. Bubble: "The hands tell you the time: short hand {h}, long hand {12|6}."
- A new tap takes the ghost card away until the next Check.
- **Success** → both parts merge, the dial numeral and the collar flash together, Sprocket hops and flaps, then **an hour passes** (long hand full lap, short hand to the next number, the card flips: 3:00 → 4:00), and everything glides back to the round's time. Bubble: o'clock "{h}:00 — {h} o'clock!" · half past "{h}:30 — half past {h}!" (EN; per-locale idiom, see traps).

## 8. Settings
1. **Times**: "o'clock" / "o'clock and half past" — at rest: the "30" collar appears at the 6 and the cards show both :00 and :30.
2. **Hand colours**: "On" / "Off" — Off makes both hands ink-dark and the card digits all cream (the digits still ride their own hand: the long hand still takes the minutes) — the step to reading a real clock. At rest the colours visibly drop.

## 9. Words (EN source)
- title (on-screen): "Sprocket's Clock" (frozen per locale as shipped; da/no/fi authored new)
- instruction: "The short coral hand tells the hour. The long teal hand tells the minutes. Read the clock and tap the digital time that matches."
- task line: "Read the clock. Tap the matching digital time."
- hints: "Look at the short hand, then the long hand. Then tap a card." · "The short coral hand points to {h}. The hour is {h}." · "The long teal hand points to the 12. That means :00." · "The long teal hand points to the 6. That means :30." · "The hands tell you the time: short hand {h}, long hand 12." / "…long hand 6." (with Hand colours off, the words "coral" and "teal" are dropped from every hint — a second string set)
- celebrations: "{h}:00 — {h} o'clock!" · "{h}:30 — half past {h}!"
- settings: "Times" — "o'clock" / "o'clock and half past" · "Hand colours" — "On" / "Off"
- aria: clock "Clock: short hand at {h}, long hand at {12|6}" (at half past: "short hand between {h} and {h+1}"); card "{h}:{mm}"; collar "minutes {00|30}".

Locale traps:
- **Spoken time idiom** (celebrations and aria only; the cards are digits): o'clock — de "{h} Uhr", fr "{h} heures" (1 → "une heure"), es "las {h} en punto" (1 → "la una en punto"), pt "{h} horas" (1 → "uma hora"), it "le {h}" (1 → "l'una"; 12 → "mezzogiorno" is avoided — use "le dodici"), nl "{h} uur", sv "klockan {h}", da "klokken {h}", no "klokka {h}", fi "kello {h}" / "tasan {h}". Half past — **de, nl, sv, da, no, fi name the NEXT hour**: de "halb {h+1}", nl "half {h+1}", sv "halv {h+1}", da "halv {h+1}", no "halv {h+1}", fi "puoli {h+1}" (12:30 → "halb eins", "half een", "halv ett", "halv et", "halv ett", "puoli yksi"); fr "{h} heures et demie", es "las {h} y media", pt "{h} e meia", it "le {h} e mezza". These are authored as a lookup per locale per hour (12 × 2 strings), never computed with "+1" in a generic template — the reviewer checks every one. This is also why the miss-2 hint says "short hand {h}" with digits, not the idiom.
- **Digital format**: the cards are clock displays and use a colon in every locale ("3:30"); the celebration writes the time as the locale writes digital time in text (da/no/fi/sv often "3.30") — authored per locale.
- **12-hour vs 24-hour**: European digital clocks show 24-hour times; the analog clock shows 12 hours only. The cards stay 1:00–12:30 (12-hour) and the instruction never says "morning/afternoon". The reviewer confirms that a 12-hour display card is acceptable in each locale's Grade 1 clock lessons (it is — every one of these curricula introduces the analog hour first).
- **Number words**: none on the screen (digits only); 1 is "one" vs "a/an" in fr/es/pt/it ("une heure", "la una") — handled in the lookup.

## 10. Sound off, access, phones
- Legible with the sound off: colour-matched digits riding hands, merge vs bounce, the glowing hand, the ghost card building from the hands, the hour passing. Ticks and clicks are decoration.
- Keyboard: Tab through the three cards (Enter chooses), Enter on Check; Tab to the long hand, Enter = an hour passes (free play). Focus ring 3 px #146B5E.
- aria-live polite announces the ride result ("hour 3 matches; minutes 00 match").
- Taps ≥ 44 px (cards 104 × 64 on phones; hands get a 44 px hit area along their length for free play).
- Colour is never the only cue: short/long, thick/thin, and the ride path itself carry the meaning (setting "Hand colours: Off" proves it).
- prefers-reduced-motion: the ride is replaced by a dotted line from each digit to its landing number; the lap is a jump; the miss-2 ghost card still builds (as a fade).

## 11. Distinct from
- **`learning-clock` tool** (drag the geared hands, the time is spoken with an arc): here the child never drags hands; reading is tested by the digital card's parts travelling **along** the hands to their numbers.
- **E10 clock activities "Set the Clock" (1.MD.B.3) and "to 5 minutes" (2.MD.C.7)** — radial drag of hands; here no setting, only reading.
- **Row 101 The Hour Road** (same batch, half hours): the card's time becomes a place on the clock's rim unrolled into a road, and the road rolls back up to test it against the short hand — a different mechanism for the "between two numbers" problem.
- **#210 The Sleeps Calendar / #246 The Face Dial**: days and emotions, not clock reading.
- Registry: no built or designed activity moves the parts of an answer along the instrument's own pointers.

## 12. Build plan
- **Core state**: `{target:{h,m}, cards:[{h,m}×3] (shown order), chosen:null|i, level:'hour'|'half', colours:true, misses, ghost:false}`.
- **Functions**: `handAngles({h,m})` → `{short: 30h + 0.5m, long: 6m}` (degrees) · `pointsTo(angle)` → numeral 1–12 or "between a and b" · `ride(card)` → `{hour:{lands, merges}, minutes:{lands, merges}}` where the hour part merges iff card.h equals the **last numeral passed** by the short hand (for m = 30, the numeral at 30h) and the minutes part merges iff card.m equals the collar at the long hand (0 ↔ 12, 30 ↔ 6) · `check()` · `ghostTime()` (= target, derived from the hands) · `hourPasses()` (free play; does not change target) · `nextTask` with card shuffle.
- **Gate's own ground truth** (`verify-ride-hands-core.js`): the round tables typed literally; the gate computes hand angles itself and asserts: (1) exactly one card per round merges both parts, equal to the target; (2) each wrong card fails on the part the table says (12:00 → hour; :30 on an o'clock → minutes; neighbour → hour); (3) at :30 the short hand angle is exactly halfway (30h + 15) and the slide-back lands on h; (4) 12:00 appears as right once and wrong in 6 rounds; (5) position balance over 300 showings; (6) the rendered SVG hand angles equal the model (± 0.5°, measured from the rendered transform, not the model); (7) the locale half-past lookup for de/nl/sv/da/no/fi uses h+1 (12 → 1) for every h (a literal table in the gate, not a rule).
- **Mutations** (one per rule): hour part merges on the long hand's numeral · minutes part ignores the collar · half past slides forward to h+1 · short hand angle ignores minutes (sits on h at :30) · a round with two correct cards · card shuffle off · ghost card built from the chosen card instead of the hands · "an hour passes" changes the round's target · colours-off removes the ride paths · de "halb" uses h instead of h+1.
- **Pictures**: farm-animals/rooster — re-verify at 64 px on the clock's top edge (not overlapping the 12 or its collar).
- **Risks**: the ride must be slow enough to follow (700 ms) yet not tedious — the reduced-motion and the ~1.6 s total keep it light; the long hand reaching 88 % must not hide the "00" collar (collar sits outside the rim).
- **BLOCKED**: nothing.

## 13. The four questions (answered, honestly)
1. **Would a 5–8-year-old choose it again?** Yes — digits that ride up the hands and click into the numbers, a rooster that hops, and a long hand they can send racing round to make an hour pass.
2. **Would a teacher put it on the board?** Yes — it makes "short hand = hour, long hand = minutes" a mechanism: every card is split into the part each hand is responsible for, and the classic "12 o'clock" error is shown as a 12 that will not fit on the 3.
3. **Would a parent trust it?** Yes — a calm real clock, a library rooster, no timer, nothing sold.
4. **The invention in one sentence:** a digital time is the two hands written down, so the card's coral hour rides the short hand and its teal minutes ride the long hand, and each part only clicks home on the number its hand points to.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- Round tables re-checked: o'clock H1–H10 and half-past M1–M10 each have exactly one card that merges both parts; 12:00 is wrong in 6 rounds and right in 1 (H10), as claimed. Clock idioms correct per locale (de/nl/sv/da/no/fi half = toward the next hour with 12:30 → halb eins / half een / halv ett / halv et / halv ett / puoli yksi; es/pt/fr/it current hour + half); hints never use the idiom.
- Distinct from the premium learning-clock (checked against the tools list): the child never drags a hand and nothing paints an arc; free play is a single tap on the long hand that makes an hour pass. Kept clearly apart from row 101 (101 owns half past through the rolled road; 102's half-past setting only adds the minutes collar at 6 and the hour digit's slide-back).
- Free-play "an hour passes" now steps the minutes collar's flash at the 12 on each lap so the lap reads as sixty minutes, not as a spin; the reduced-motion path keeps the ghost card (the part of the design that teaches) and drops only the ride animation.
