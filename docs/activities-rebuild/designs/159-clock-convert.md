# Row 159 — Sprocket's Clock: 12-Hour & 24-Hour → THE SECOND RING (2.MD.C.7, extended)

## 0. Identity
- id `clock-convert.12-24.2-md-c-7` (frozen) · Grade 2 (builds on 2.MD.C.7; the 24-hour form is the G3 worksheet's content) · Measurement & Data · own files `second-ring-core.js`, `second-ring-activity.js`, `second-ring-activity.html`, `second-ring-activities.json` (row leaves `clock-convert-activities.json`, emptied to `[]`). Title/intro frozen en..nl; sv/da/no/fi metadata new at build.
- worksheets covered: **G3-355 "12-Hour and 24-Hour Time"** (match each time to its other form).
- the old activity: read a time in one notation, tap the same time in the other among three cards (e.g. 15 / 3 / 13). Kept: all nine old times (15:00, 20:00, 21:30, 14:15, 18:00, 23:45, 13:20, 16:00 → 16:05, 19:30), both directions, Sprocket's clock. Changed: the answer is WRITTEN (no three-card guess), a.m. times are added (the old set was 100 % p.m., so "always add 12" scored perfectly), noon and midnight are taught, and the clock acts the child's own answer out.
- **Critic rewrite (2026-10-17):** the first draft's apparatus — a brass box of rolling number drums geared to the hands, tested by ghost hands — is the same machine as row 162's "carry drums" odometer (drums geared to the hands + ghost hands). The rounds, the day-part tables and the misconception list are kept; the instrument is new.

## 1. The pitch
"The hour hand carries a little tag that keeps counting — on the first lap it says the same as the face, but once it passes noon it says 13, 14, 15, and drops each number into an empty socket under the face's own number: the 24-hour clock is the second ring, and you build it by going round twice."

## 2. Why a child will want it again
- A big clock whose face has an **empty inner ring** — twelve little round sockets just inside the numerals, dashed and waiting. The hour hand carries a **counting tag** at its tip (a coral pill with a numeral).
- **The run**: at Check the hands whizz back to midnight (the tag says 0), then run forward to the time the child wrote. On the first lap the tag counts 1, 2, … 11 under the face's own numbers. At the top the library sun (beach/sun, 64 px) pops up over the 12 — noon — and the tag says 12. Then the magic: the tag goes on counting **13, 14, 15…**, and at every number it passes it **lights a numbered token in the empty socket below** (*plink*): 13 under the 1, 14 under the 2 — the second ring builds itself under the child's eyes. When the run stops, the passing tokens fade and **only the token of the hour the run stopped at stays** in its socket.
- **Kept tokens stay for the whole session**: after a few afternoon rounds the inner ring holds 15, 20, 14, 18… — a 24-hour clock face the child built from their own right answers. Filling the last empty socket is its own small show: the whole ring glows once round, 13 → 23 → 0.
- Success: the hands land exactly in the outline of the given time, the tag turns gold, Sprocket (farm-animals/rooster) bounces and crows.
- No timer, no score, no streak.

## 3. The skill and the misconception
- **Skill:** a time of day can be written two ways. In the 12-hour way the face's numbers repeat (with a.m./p.m. or the locale's day-part word); in the 24-hour way the hours keep counting after noon: 1 p.m. is 13:00, 3 p.m. is 15:00; morning times keep their hour (8 a.m. is 08:00); noon is 12:00; midnight is 00:00. Minutes never change.
- **Misconceptions and the pushback (each by what the run does):**
  1. **"Always add 12."** (8 a.m. → 20:00.) The run for 20 goes all the way past the sun and fills sockets 13…20 — while the open card says a.m., which never reaches noon. The child sees their answer travel round a second time that the open card never travelled. 3 of 10 rounds per level are morning times (+ midnight in L2).
  2. **Subtracting 10 instead of 12** (20:00 → 10 p.m.). The run stops at the 10; the given time's outline hand sits at the 8 — two numbers apart.
  3. **Confusing 13 with 3** ("15:00 is 5"). The run for 5 p.m. stops two numbers past the outline at 3.
  4. **Noon and midnight** (12:00 noon → 24:00; midnight → 12:00). Midnight is where the run STARTS (tag 0, the moon side — no movement at all); 24:00 makes the hands go round twice and arrive back at the top on the other side of the day; noon is where the tag first says 12 under the sun.
  5. **Changing the minutes** (21:30 → 9:00 p.m.). The minute hand ends on the 12 while the outline minute hand is on the 6.

## 4. The stage (what is on the screen)
`layout:'split'` at ≥ 700 px.

At **704 px** (stage 660 × 540):
- **Clock** (left, 360 × 360): face 340 px, cream with teal rim 8 px; numerals 1–12 Baloo 2 800 28 px; minute ticks. **Inner ring**: twelve sockets (34 px circles, dashed 2 px) on a circle 70 % of the face radius, one under each numeral; filled sockets hold a numeral token (Baloo 2 800 18 px, violet `#8C7BC4` on white) — 13 under 1 … 23 under 11, and "0" under the 12 when midnight is reached at the end of a run. Hour hand coral 11 px, 105 px long, carrying the **tag** (a 40 × 28 coral pill at 75 % of its length, white numeral 18 px). Minute hand teal 6 px, 150 px long. The **given time** is shown by the real hands at rest; at Check they become dashed **outlines** that stay where they were, and the hands that run are the child's.
- **Two cards** (right column, 240 × 300):
  - the **open card**: the given time big (40 px) in its own notation — "3:00 p.m." or "15:00" (per-locale format §9);
  - the **answer card** under it: an hour box and a minute box (64 × 64 each, 36 px digits) with the locale's separator drawn between them; when the answer is 12-hour, a row of **day-part chips** under the boxes (§9 table; 2 chips in en/es/fi, 3–5 elsewhere);
  - a **number pad** (3 × 4 keys 0–9, ⌫, 56 × 48 each) under the cards; the focused box glows.
- **Task line** (22 px): "Read the open card. Write the same time the other way."
- Bubble under the clock.

At **360 px**: stacked — clock 280 px face (sockets 28 px, tokens 15 px, tag 34 × 24), cards side by side under it (open card 150 wide, answer card 180 wide, boxes 52 × 52), day-part chips in one row (≥ 44 px tall, wrapping to two rows for the 5-word locales), number pad 4 × 3 with 52 × 44 keys. Check above 360 × 740; at 320 × 640 the face is 240 px and the pad keys 48 × 44.

## 5. The hand (every interaction)
- **Tap a box** to focus it (or Tab); the pad types into it (two digits max; a third digit replaces). ⌫ clears the last digit. Physical keyboard digits work too.
- **Day-part chip**: tap one to choose (one at a time); tapping it again clears it.
- **Free play (between rounds only, the clock is not used to find answers):** after success the hour hand's tag can be dragged round the face; the minute hand follows, the tag counts, and passing noon drops tokens exactly as in a run. During a round the hands are fixed on the given time (a small padlock on the hub shows it).
- **Undo**: everything until Check.

## 6. The rounds
One round = one given time; the open card shows it, the clock's hands show it, the child writes it the other way.

**Level 1 — o'clock and half past:**

| # | open card | answer | part |
|---|---|---|---|
| 1 | 12-h 3:00 p.m. | 24-h 15:00 | p.m. |
| 2 | 24-h 20:00 | 12-h 8:00 p.m. | p.m. |
| 3 | 12-h 9:30 p.m. | 24-h 21:30 | p.m. |
| 4 | 24-h 14:00 | 12-h 2:00 p.m. | p.m. |
| 5 | 12-h 8:00 a.m. | 24-h 08:00 | a.m. |
| 6 | 24-h 10:30 | 12-h 10:30 a.m. | a.m. |
| 7 | 12-h 6:00 p.m. | 24-h 18:00 | p.m. |
| 8 | 24-h 23:00 | 12-h 11:00 p.m. | p.m. |
| 9 | 12-h 7:30 p.m. | 24-h 19:30 | p.m. |
| 10 | 24-h 07:00 | 12-h 7:00 a.m. | a.m. |

**Level 2 — five minutes, noon and midnight:**

| # | open card | answer | part |
|---|---|---|---|
| 1 | 24-h 14:15 | 12-h 2:15 p.m. | p.m. |
| 2 | 12-h 1:20 p.m. | 24-h 13:20 | p.m. |
| 3 | 24-h 23:45 | 12-h 11:45 p.m. | p.m. |
| 4 | 12-h 4:05 p.m. | 24-h 16:05 | p.m. |
| 5 | 24-h 12:00 | 12-h 12:00 p.m. (noon) | noon |
| 6 | 12-h 12:00 a.m. (midnight) | 24-h 00:00 | midnight |
| 7 | 12-h 9:05 a.m. | 24-h 09:05 | a.m. |
| 8 | 24-h 17:50 | 12-h 5:50 p.m. | p.m. |
| 9 | 24-h 11:35 | 12-h 11:35 a.m. | a.m. |
| 10 | 12-h 10:40 p.m. | 24-h 22:40 | p.m. |

- **Answer balance (measured by the critic's script):** direction 12 → 24 in 5/10 rounds per level. Morning answers (a.m., incl. midnight): L1 3/10, L2 3/10. "Add 12 to every hour" fails 3 rounds in L1 and 4 in L2 (the morning ones and noon); "never change the hour" fails 7 in L1 and 6 in L2. (The draft claimed 5 and 5 for L2 — wrong, noon was counted as a morning time.) The answer boxes start empty, so no starting value hints. Minutes 00 appear in only 2/10 L2 rounds.
- **Inner-ring coverage (measured):** a token is KEPT only for the hour of a successful 24-hour run. One pass of L1 keeps {14, 15, 18, 19, 20, 21, 23}; L2 keeps {13, 14, 16, 17, 22, 23} and 0 (midnight). Neither level alone completes the ring (L1 misses 13, 16, 17, 22; L2 misses 15, 18–21), so the "last socket" show is earned across both levels or in free play — and in the FIRST pass the ring is never a lookup table for the round in hand (every level's p.m. hours are distinct, so no round's token is kept before that round is solved). The ring empties when the level changes. From the second pass on, the ring holds the child's own earlier answers — a reference they built; teachers who want computation every time choose "empties every round".
- All nine old times are present (15:00, 20:00, 21:30, 14:15, 18:00, 23:45, 13:20, 16:00 → now 16:05, 19:30).
- **Order:** order-only reshuffle per pass within each level; no more than two consecutive rounds of the same direction.

## 7. Check, the misses, the success
- **Check with an empty box** → hint, no miss: "Write the hour and the minutes." (12-hour answer with no chip: "Choose the part of the day too.")
- **Every Check runs the clock to the CHILD's answer** (the hands' rest position stays as dashed outlines = the given time): back to midnight (300 ms), then forward to the written time (1.2–2 s; one lap ≈ 0.9 s), the tag counting, the sun popping at noon, tokens dropping in lap 2. For a 12-hour answer the chosen day-part decides the lap (a.m. → lap 1, p.m. → lap 2).
- **Miss 1** — what is left on screen IS the feedback: the run's hands next to the outline hands. By kind:
  - wrong lap (e.g. 20:00 for 8 a.m.): the hands end on the outline but the run passed the sun and dropped tokens; the open card's day-part word and the sun both pulse. Hint: **"Your time went past noon. Did the open card's time?"** (and its mirror: **"Your time stopped before noon. The open card is after noon."**)
  - hour off: the hour hands sit apart. Hint: **"Look where your hour hand stopped. Count the hours after 12."**
  - minutes changed: the minute hands sit apart. Hint: **"The minutes stay the same in both ways of writing."**
  - noon / midnight written as 24:00 or 12:00 the wrong way: hint **"Midnight is where the day starts: 00:00."** / **"Noon is when the tag first says 12 — under the sun."**
- **Miss 2**: the clock now runs the GIVEN time instead, slowly (one number per 400 ms), dropping its tokens — but its last token lands face-down ("?") and the tag shows "?" for the final hour; the outer numeral beside it is bold. The child counts on from the last visible token and writes. Morning times: the run stops before the sun and the hint says **"Before noon the hand never passes the sun — the hour stays the same."**; afternoon: **"After noon the tag keeps counting: 13, 14, 15…"**
- A new key press clears the run (the hands return to the given time).
- **Success**: the running hands land exactly in the outlines and the lap matches; the outlines fill solid, the tag turns gold, the tokens stay in their sockets; Sprocket bounces and crows. Bubble (pattern, one authored line per round): **"3:00 p.m. is 15:00 — 12 + 3 = 15!"** · "20:00 is 8:00 p.m. — 20 − 12 = 8!" · "8:00 a.m. is 08:00 — before noon the hour stays the same!" · "12:00 noon is 12:00." · "Midnight is 00:00 — the 24-hour day starts again!"

## 8. Settings
1. **Times**: o'clock and half past (Level 1) · five minutes, noon and midnight (Level 2) — the open cards change and the minute box accepts fives.
2. **The second ring**: keeps what you built (default) · empties every round — at rest the inner ring is visibly full or empty. (Teachers who want the child to compute rather than read the ring choose "empties".)

## 9. Words
- title: "Sprocket's Clock" (frozen)
- task line: "Read the open card. Write the same time the other way."
- prompt: "Write the time the other way."
- hints: "Write the hour and the minutes." · "Choose the part of the day too." · "Your time went past noon. Did the open card's time?" · "Your time stopped before noon. The open card is after noon." · "Look where your hour hand stopped. Count the hours after 12." · "The minutes stay the same in both ways of writing." · "Midnight is where the day starts: 00:00." · "Noon is when the tag first says 12 — under the sun." · "Before noon the hand never passes the sun — the hour stays the same." · "After noon the tag keeps counting: 13, 14, 15…"
- celebrations: one authored line per round (20), patterns above.
- settings: "Times" · "O'clock and half past" · "Five minutes, noon and midnight" · "The second ring" · "Keeps what you built" · "Empties every round"
- **The day-part chips (content, per locale):** en "a.m." / "p.m."; es "a. m." / "p. m."; fi "ap." / "ip."; sv "fm" / "em"; for the locales without a two-part system the chips are the locale's natural words and each round has an ACCEPTED SET (the gate checks every round against it): de morgens · vormittags · mittags · nachmittags · abends · nachts (e.g. 15:00 → {nachmittags}; 23:00 → {abends, nachts}; 08:00 → {morgens}; 10:30 → {vormittags}; 12:00 → {mittags}; 00:00 → {nachts}); fr du matin · de l'après-midi · du soir · (midi / minuit as the hour words for 12) — 23:45 → {du soir}; it di mattina · di pomeriggio · di sera · di notte (23:00 → {di sera, di notte}); pt da manhã · da tarde · da noite (12:00 meio-dia, 00:00 meia-noite); nl 's ochtends · 's middags · 's avonds · 's nachts (23:00 → {'s avonds}); da om morgenen · om formiddagen · om eftermiddagen · om aftenen · om natten; no om morgenen · på formiddagen · på ettermiddagen · om kvelden · om natten. A chip's lap is fixed (every word belongs to one lap: nachts belongs to both ends of the day, so for the run it is read by the hour — 23:00 nachts → lap 2, 0:00 nachts → lap 1; the gate asserts no round's accepted set is ambiguous). Noon/midnight in the 12-hour form: en "12:00 p.m. (noon)" / "12:00 a.m. (midnight)" — the EN strings print the words "noon"/"midnight" in brackets because adults disagree about 12 a.m./p.m.; other locales use their word for noon/midnight as the day-part (fr « midi », de „12 Uhr mittags").
- **Separators:** en/es/pt/it/de 24-hour "15:00"; da/no/fi/sv/nl "15.00"; fr « 15 h 00 » / 12-hour « 3 h de l'après-midi »; the boxes hold digits only and the separator is drawn between them per locale. Leading zero: "08:00" in the 24-hour answer in all locales except fi ("8.00" — the gate accepts both "8" and "08" in the hour box everywhere, and the success line prints the locale's form).
- Tokens in the sockets are numerals only (13 … 23, 0).

## 10. Sound off, access, phones
- Sound off: the run, the tag's count, the tokens, the outlines and the sun carry everything; plinks and the crow decorate.
- Keyboard: Tab → hour box → minute box → chips (arrows, Space) → pad keys (or type digits) → Check; aria-live bubble; the run is announced as "the hour hand went round {1|2} times and stopped at {n}" for screen-reader users.
- Taps ≥ 44 px (boxes 64/52, pad keys 56 × 48 / 52 × 44, chips ≥ 44 tall). Rooster 96 / 64 px; beach/sun 64 / 48 px as a noon marker on the apparatus (it appears nowhere else smaller).
- Check above both folds.

## 11. Distinct from
- **#162 Carry Drums** (number drums geared to the hands, an odometer, tested by ghost hands) — this design's first draft was that machine; now the 24-hour number is a tag on the hour hand and a ring of sockets the child fills by going round twice; no drums, no ghost hands.
- **#158 Day Wheel** (sibling): there a coloured wheel behind the face shows which LAP you wound to; here the hour NUMBER keeps counting on the second lap and builds the 24-hour ring.
- **#101–#104**, **#163 Flip-Tile Rim** (minute numbers on tile backs), **learning-clock** (arc): none counts the hours on past 12 or builds the inner ring.
- Not in the built registry.

## 12. Build plan
- **Core state:** `{round, given:{h24,m}, hidden:'12'|'24', boxes:{h:null|int, m:null|int, part:null|str}, sockets:Set<13..23|0>, miss}`; `childTime()` → minutes from midnight (12-hour + part → h24 via the locale's part table; 24-hour direct); `run(t)` → the list of hour marks passed and tokens dropped; `grade()` → `{ok, kind:'blank'|'lap'|'hour'|'minute'|'noonMidnight'}`.
- **Gate truth (verify):** independent conversion for every round (h24 = h12 % 12 + (pm ? 12 : 0); noon/midnight special); tokens lit by `run(t)` = exactly the integers 13…⌊t/60⌋ for t ≥ 13:00 and none before noon, and only ⌊t/60⌋ is kept (on success); a run to 00:00 moves nothing; per-locale accepted day-part sets contain the correct part for every round and are unambiguous; direction 5/10; a.m. 3/10 per level; "+12 everywhere" fails 3 (L1) / 4 (L2) rounds and "never change" 7 / 6 (asserted); hands locked during a round.
- **Mutations:** always +12 accepted; 12:00 → 24:00 accepted for noon; midnight graded as 24:00 / 12:00 in the 24-hour answer; tokens dropped in the first lap; the run goes to the given time instead of the child's on miss 1; hands draggable during a round; day-part ignored for 12-hour answers; fi "8.00" refused; reshuffle three same-direction rounds in a row; sockets emptied although the setting says keep.
- **Pictures:** farm-animals/rooster, beach/sun (both seen on contact sheets and present in their JSONs).
- **Risks:** per-locale day-part tables need the native reviewer; the accepted sets are the contract. The 0-token at the top must not be confused with the face's 12: it sits in the inner ring and is violet like every token.
- **Blocked:** nothing.

## 13. The four questions
1. **Choose it again?** Yes — the clock races round, a sun pops up, numbered tokens plink into a ring the child is filling up across the session.
2. **Teacher on the board?** Yes — "after noon the hours keep counting" is shown literally, the inner ring becomes the 24-hour face real European school clocks have, and "always add 12" is caught by a run that goes round twice when the card never did.
3. **Parent trust?** Calm, honest, numerals only, works in every locale's own day-part words.
4. **Invention:** a counting tag on the hour hand keeps counting after noon and drops 13, 14, 15… into an empty inner ring — the child builds the 24-hour clock by going round twice.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 2→5 · reality 5→5
What changed:
- **Distinctness:** the draft's drum counter box geared to the hands + ghost-hand test was row 162's carry-drums odometer. Replaced by THE SECOND RING: a counting tag on the hour hand and an inner ring of sockets filled on the second lap; the child's written answer is acted out by a real run, not a ghost.
- The answer is now written in two boxes with a number pad (+ day-part chips) — no drum or flip numerals anywhere.
- Re-measured the balance claims: L2 "always add 12" fails 4 rounds and "never" 6 (the draft said 5/5, counting noon as morning). Socket coverage per pass measured, so the full-ring show is earned.
- Noon and midnight get their own hints and a physical meaning (midnight = no movement at all; 24:00 = two laps).
