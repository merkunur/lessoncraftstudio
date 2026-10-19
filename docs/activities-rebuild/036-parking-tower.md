# #36 — Bramble's Parking Tower → THE LIFT-AND-FLOOR TOWER (K.G.A.1; Grade 2 grid codes + compass)

ORDER row 36 · id `parking-tower.place-by-relation.k-g-a-1` (kept).
- **Files:**
  - Added: `parking-tower-core.js`.
  - Rewritten: `parking-tower-activity.js`, `parking-tower-activity.html`, `parking-tower-activities.json`.
  - The old shared `place-by-relation-core.js` stays, because `arrow-strip.js` still loads it.
  - 0 lines in any shared core or `lcs-shell.*`.
- **Metadata:** slug, title and intro are frozen in en, de, fr, es, pt, it and nl. The sv/da/no/fi slug, title and intro are new. The prose is rewritten ×11. GRADE_OVERRIDE adds sv/da/no/fi = 1.
- **Design:** `designs/036-parking-tower.md`.

## The apparatus and its invention: A VEHICLE ONLY RIDES THE LIFT AND DRIVES ALONG A FLOOR
- **The tower:** a side-on tower with a glass lift on its left and thick floor slabs. The street (the entrance level) runs under the parking floors, and Bramble's booth and the waiting vehicle stand on it.
  - Tap an empty bay: the vehicle drives to the lift, rides up or down, and rolls along its floor into the bay.
  - The dotted route stays after parking, so the route is a diagram of the word.
- **Rings and underlines:** the vehicle to park has a teal ring, and the landmark a coral one. The same colours underline the vehicle words in the task line, which links word to picture with the sound off.
- **Four boards (one setting, "Words"):**
  - **Near words:** a 3 × 3 tower. Above, below, next to, between (also vertical), left, and right. Two reverse rounds ("Bramble parked above the bus. Tap his truck.").
  - **Tower words:** 2 columns, with street spots left and right. On top of (a roof deck, open only when offered), inside, under (the basement under the street, drawn only when offered), beside, outside, top / middle / bottom level, and left side.
  - **Grid codes 6 × 6:** letter across, number DOWN. Park in a code, or read a code on two dials. Compass rounds use a rose turned with north to the right or north down.
  - **Grid codes 10 × 10:** tap-to-park when the card is wide enough for 44 px squares. On a phone every round is read on the dials, so taps never shrink.
- **Misses show, not tell:**
  - **Miss 1:**
    - near words: a teal arrow points from the landmark to the asked position, and a coral arrow to where the vehicle is; the floor slab pulses on above / below;
    - tower words: the asked area glows;
    - code rounds: tickets show the parked code beside the asked one, and the parked square's letter column and number row light up;
    - read rounds: a ghost token drives to the square the dials name;
    - compass rounds: the rose's north petal pulses, and an arrow shows where the vehicle went.
  - **Miss 2:** the right bay or square glows, with a ghost of the vehicle in it.
  - A new park or a dial turn clears the showing.
- **The win:** the vehicle flashes, Bramble's barrier lifts and a ticket prints. After the win the vehicle can be re-parked anywhere (free play).

## Fixes from the build (each found by a gate or a render)
- **Under = a ride UP.** The first layout put the entrance lane below the basement, so the route to "under the tower" climbed. The street became the entrance level, with the floors above and the basement below.
- **T3 offered both a roof deck and a basement.** That board passed 900 px on desktop and the phone fold. T3's near miss is now the right street spot (beside), not the roof. A gate asserts that no round has both.
- **A free bay showed a ✓-shaped chevron,** which read as "correct". It is now a downward chevron.
- **The plans claimed the wide form where it does not fit.** The wide form is now computed from the measured stage (6 × 6 squares ≥ 50 px, 10 × 10 ≥ 44 px beside the key column).
- **The 10 × 10 park-or-read decision** was re-made in `setup` while the shell had the stage detached. The 600 px fallback flipped it to "read", and the resize watcher then reset the round. `setup` now uses the decision `nextTask` made.
- **Square picture canvases:** every vehicle picture is a square canvas, with the ink about 95 % of its width. The waiting vehicle had been sized as if it were 1.38 × wide, and the bay rule is measured, not invented.
- **320 px phone:** bays are 70 px tall (vehicles stay at the 64 px floor), the booth is just wider than Bramble, and the car waits tight against the lift. On this width the hint shares the Check row, the miss tickets ride in the key bar, and the plan strips are 16 px.
- **Arrow keys** stopped on taken (disabled) bays; they now skip to the next empty bay in that direction.
- **`params.words`** is the word-builder engines' pool key, so the variety scan read the four boards as a 4-word pool. The key was renamed to `boards`.
- **No "free" in any sense:** "free space", "freier Platz", "place libre", "lugar libre", "vaga livre", "posto libero", "vrije plek" and "vapaa paikka" all became "empty".

## Gates
- **`verify-parking-tower-core.js`** (own oracle): 8,354 checks.
  - Every position word is checked over every pair and triple of bays.
  - The rounds are re-typed from the design. Each has exactly one right candidate, plus a near miss.
  - Right bays sit 3 / 3 / 3 across columns and levels.
  - Fillers never name a vehicle in the round.
  - Tower words: "outside" never offers the roof or the basement; a level round shows neither; no round has both.
  - Plans: codes and compass steps on turned roses are checked; grey cars never sit on the answer or a neighbour; letter and number spread.
  - State rules hold; strings ×11 with their underline words; rose letters per locale; pictures exist case-exact; the order reshuffle is checked, including a forced repeat.
  - Layout 288–1100.
- **`mutate-parking-tower.js`:** 26/26 killed.
- **`local-test-parking-tower.js --locales=all`:** 928 / 0.
  - Real pointer; a full miss–help–win cycle on near, reverse, vertical-between, tower, basement, code, compass, dials and 10 × 10 rounds.
  - The setting changes the board; the keyboard works.
  - The 320–1366 sweep at rest, miss 1 and miss 2, with a press hit-test, picture floors and the fold.
- **visual-qa:** 54 renders. **Hierarchy:** 674 / 0. **Settings:** 1 live.
- **Content gates ×11:** prose-claims, serp-copy, content-tells, answer-rank, preflight and font-shorthand all pass.
- **Variety:** the static scan passes. The live probe runs after deploy.

## Review (one agent, native ×11 + pedagogy) — applied
- **N7 "Bramble parked above the bus"** has a distractor truck diagonally up. The reviewer suggested removing it; it stays, because design §3 targets exactly the "above = anywhere higher" misconception. But the hint did not rule the diagonal out, so above/below now say "straight up / straight down, one floor" ×11.
- **Q7 read round I1 → D1.** A capital I beside a 1 reads as 11. Nine distinct letters and nine distinct numbers are kept.
- **The between hint** now also covers the vertical case (N9): "one on each side — or one above and one below".
- **"ledig" (sv/da/no) is a "free" word** → "tom" in strings and prose.
- **Wording:**
  - fr/it: typographic apostrophes.
  - pt: the above/below hints gained a verb phrase.
  - it: basement "piano interrato".
  - nl: the reverse rounds are in the perfect, and "boven op".
  - da: the booth is a "billetbod"; »over« quotes in the intro.
  - no: the prose route is "sporet", not "ruta" (which clashes with rute = square).
  - fi: hintStrong / hintStrongTap rephrased; the setting says "yläpuolella · alapuolella".
  - fi intro: names the curriculum.
- **FROZEN-NOTE (not changed):**
  - fr intro: plain space before ":" and a straight apostrophe.
  - de intro: "Parke die Autos", but the vehicles are not only cars.
  - de title: drops "zwischen".
  - es intro: lists "encima, debajo", while the rounds teach "arriba de / abajo de".
  - nl intro: "op de juiste verdieping" undersells the same-floor words.
