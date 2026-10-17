# Row 152 — Read the Ruler → THE GLOW RULER: the number on a ruler counts the spaces before it (2.MD.A.1)

## 0. Identity
- id `choice-board.read-ruler.2-md-a-1` (KEPT; slugs, titles and intros frozen in all 11 locales — every locale already has a slug) · grade 2 · CCSS 2.MD.A.1 · Measurement & Data · own files `glow-ruler-core.js`, `glow-ruler-activity.js`, `glow-ruler-activity.html`, `glow-ruler-activities.json` (the row leaves `choice-board-activities.json`).
- worksheets covered: **G2-235** Measure It! ("Each object starts at 0. Read the ruler and write how many units long it is.") — the same registration rule: the picture's ART, not its padded box, spans exactly N units from the ruler's 0 (the worksheet's `artExtentSync` measure, reused).
- old activity: a hand-drawn object (pencil, ribbon, crayon, worm, marker, stick, straw, eraser) on a code-drawn cm ruler numbered only at 0/5/10/15/20, left end at 0, then tap one of four number tiles {N−1, N, N+1, N+2}. **Kept**: the skill (read where the object ends on a ruler that starts at 0), the honest one-scale drawing (ruler ticks and object edge from the same function), the lengths 4, 5, 6, 7, 9, 12, the idea of the "read one short / count the last line" foils. **Dropped**: the hand-drawn objects (now library pictures), the 4-tile quiz — whose correct tile was ALWAYS the second-smallest (an answer tell, see end note), length 17 (beyond the 15-cm ruler) and 14 (no believable 14-cm library object stays ≥ 64 px thick at 360).
**Critic rule (2026-10-17): every object is shown at a length the REAL thing believably has** — a 4-cm snail, an 8-cm key, a 13-cm ice lolly, a toy car. The designer's 10-cm leek, 12-cm celery, 9-cm hammer, 14-cm skateboard and tie were true to the ruler but false to the world, and #154 (this batch) teaches real sizes: a child who measured "a 10-cm leek" here would be taught the wrong size sense there. With real sizes, every ruler reading also builds the size sense 2.MD.A.3 needs.

## 1. The pitch
"Slide the glow marker to where the object ends — then the ruler lights up its centimetre spaces one by one from 0, and the number you stopped on is exactly how many spaces it counted."

## 2. Why a child will want it again
- **A ruler that lights up.** The ruler is a glass strip with a light channel inside. When the child presses Check, light flows out of the 0 end and fills the centimetre spaces one at a time — *tik, tik, tik* in rising notes — each space flashing its count as it fills. It stops at the marker. If it was right, the light and the object end together and the object gives a happy wiggle (the caterpillar ripples, the car's wheels spin, the skateboard rolls a wheel turn).
- **The marker is a toy.** A chunky coral glow marker rides along under the ruler, clicking into each tick with a soft notch; between rounds the child can slide it anywhere and press the light just to watch the spaces fill.
- **Overshoot and undershoot are visible, not told.** Too far: the last lit spaces glow coral under NOTHING — light with no object above it. Too short: the end of the object hangs out past the light, its tail dimmed.
- **Earned show:** on success the object hops up, a little tag drops from the ruler onto it with "{n} cm", and it slides off to a shelf strip at the top where today's measured things line up in order of length.
- No timer, score or streak.

## 3. The skill and the misconception
- Skill (2.MD.A.1 as G2-235 means it): with the object's start at 0, read the ruler mark at the object's other end, and say its length in centimetres. Level 2: read a mark that has no number printed (count on from the printed 5 or 10 just below the end, as on a real school ruler).
- Misconceptions and the push-back:
  1. **Counting the tick lines instead of the spaces** (a 7-cm object read as 8 because the child counted the 0 line as "1"). The light counts SPACES: it fills spaces, never lines, and every space shows its count as it fills — "1" lights in the first space after 0. A child who stopped on 8 sees an 8th space lit beyond the object's end.
  2. **Reading the nearest printed number** (Level 2: an object ending at 12 read as "10"). The light runs past 10 for two more spaces and the object's end sits two spaces beyond the "10".
  3. **Reading from the wrong end / a wobbly eye**. The marker is placed by the child on the ruler under the end, and the reading is the marker's tick — the end has to be lined up, not guessed from above (a drawn vertical "drop line" falls from the object's end to the ruler on miss 2).
- One right answer per round (the object's art spans exactly N cm, so one tick).

## 4. The stage
**At 704 (stacked; the ruler needs the width):**
- **The ruler** — a glass strip 620 × 64 px (cream fill 90 %, 3 px teal outline, rounded 8), **15 cm at 40 px/cm** starting 10 px in; ticks every cm (cm ticks 18 px, 5-cm ticks 28 px, 2 px teal), and numerals Nunito 800 **20 px** under the ticks: Level 1 every centimetre 0–15; Level 2 only 0, 5, 10, 15 (the other ticks unlabelled, exactly like a classroom ruler).
- **The object** — a library picture lying flat on top of the ruler, its ART registered so its left ink edge is on 0 and its right ink edge on N (the worksheet G2-235 rule via `artExtentSync`; upright pictures are turned 90° to lie flat — per-noun rotation table in §12). Art height 135–207 px at 704 (all ≥ 96, all ≤ 210).
- **The glow marker** — a coral drawn pointer 44 × 56 under the ruler: a triangle tip touching the tick line + a round grip; it snaps to whole-cm ticks.
- **The shelf strip** — top right, 220 × 60: today's measured objects as small data-mark thumbnails (44 px, the graph/record ruling) in length order with their "n cm" tags.
- **The readout** — a bubble right of the marker showing the marker's tick number large (Nunito 800 32 px) + "cm" once the marker sits on a tick: "{n} cm".
- Check (shell) under the ruler.
- Task line (EN, 22 px): "Where does it end? Slide the glow marker there." (Level 2 adds nothing — the missing numbers are the challenge.)

**At 360 (stacked):** ruler 322 × 52 (15 cm at 21.5 px/cm, numerals 16 px; Level 1 prints every cm in 14-px digits, the two-digit numbers 10–15 condensed so they never touch), object art 73–111 px tall (all ≥ 64), marker 44 × 52 (the 44-px grip overlaps neighbouring ticks; it snaps to the nearest tick, and ←/→ nudge buttons — two 44 × 44 arrows either side of the readout — move it exactly one cm), readout under the ruler. Stage ≈ 44 (task) + 111 + 52 + 56 + 44 = 307 px → Check above 360 × 740 and 320 × 640. At 320: 15 cm = 288 px (19.2 px/cm); every round stays ≥ 64 px there too (smallest: the 9-cm glue bottle, 65 px) — **no exception** (the designer's table had two 320-px floor breaks, the caterpillar at 60 AND the toy car at 61; both rounds are rebuilt).

No words on the apparatus; the numerals on the ruler and "cm" in the readout are the content.

## 5. The hand
- **Drag the marker** along the ruler (it follows the finger within one frame, snaps to the nearest tick with a soft notch tick 900 Hz on each snap). **Tap on the ruler** → the marker jumps to the nearest tick (the intro's "tap how many centimeters long it is": tapping the ruler IS tapping the number). **Nudge arrows** (phone) move it ±1 cm.
- **Check:** light flows from 0 (80 ms per space, a rising pentatonic *tik* per space), each lit space shows its count (Nunito 18 px, white on teal) for 400 ms; it stops at the marker. Then the verdict (§7).
- **Free play:** between rounds the marker and light are free: slide anywhere, press the light, watch it fill (no grading), and tap any object on the shelf to bring it back onto the ruler to compare.
- Keyboard: ←/→ move the marker, Home = 0, Enter = Check. Optional TTS: tapping the readout says "{n} centimetres".

## 6. The rounds
**Level 1 — every centimetre numbered** (8 rounds; old lengths 4, 5, 6, 7, 9 kept; every length a believable real length for the thing):
| # | object (library) | lies flat by | length (cm) | real thing | art height 704 / 360 / 320 |
|---|---|---|---|---|---|
| 1 | spring/snail | as drawn (side view) | 4 | a garden snail, 3–5 cm | 154 / 83 / 74 |
| 2 | beach/seashell | as drawn | 5 | a scallop shell, 4–7 cm | 200 / 107 / 96 |
| 3 | toys/car | as drawn | 6 | a toy car, 6–8 cm | 154 / 82 / 74 |
| 4 | fruits/lemon | as drawn | 7 | a lemon, 7–8 cm | 188 / 101 / 90 |
| 5 | around-the-house/key | turned 90° | 8 | a door key, 6–8 cm | 157 / 84 / 75 |
| 6 | insects-and-bugs/centipede | as drawn | 9 | a centipede, 3–10 cm | 199 / 107 / 96 |
| 7 | classroom/glue | turned 90° | 11 | a school glue bottle, 9–13 cm | 165 / 89 / 79 |
| 8 | desserts-and-sweets/popsicle | turned 90° | 13 | an ice lolly with its stick, 12–14 cm | 207 / 111 / 99 |

**Level 2 — only 0, 5, 10, 15 numbered** (8 rounds; no length is a multiple of 5, so every reading needs counting on):
| # | object | lies flat by | length (cm) | art height 704 / 360 / 320 |
|---|---|---|---|---|
| 1 | beach/seashell | as drawn | 4 | 160 / 86 / 77 |
| 2 | fruits/kiwi (a halved kiwi) | as drawn | 6 | 200 / 107 / 96 |
| 3 | toys/train (a toy engine) | as drawn | 7 | 207 / 111 / 99 |
| 4 | insects-and-bugs/centipede | as drawn | 8 | 177 / 95 / 85 |
| 5 | classroom/glue | turned 90° | 9 | 135 / 73 / 65 |
| 6 | desserts-and-sweets/popsicle | turned 90° | 11 | 175 / 94 / 84 |
| 7 | desserts-and-sweets/popsicle | turned 90° | 12 | 190 / 102 / 92 |
| 8 | classroom/glue | turned 90° | 13 | 196 / 105 / 94 |
Heights measured by the critic from `scripts/worksheet-gen/data/art-extents.json` ink boxes (thickness/length after the lie-flat rotation × length × px/cm; `work-c29/ruler152b.js`), every one ≥ 96 at 704, ≥ 64 at 360 AND at 320, ≤ 210 at 704. The same picture appears at most twice per level, never twice at the same length within a level, and never at the same length in both levels (centipede 9 / 8, glue 11 / 9 · 13, popsicle 13 / 11 · 12, seashell 5 / 4) — so a remembered size never answers.

**Answer position:** there are no choices to balance — the answer is a place on the ruler. Ends spread across the ruler: Level 1 at 4–14, Level 2 at 6–14, every value distinct within a level; the marker starts each round parked at 0 (never near the answer). Order: order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with the marker still at 0** → hint, no miss: "Slide the glow marker to the end of the {object}."
- **Miss 1** — the light still runs to the marker (counting spaces): *too far*: the spaces beyond the object's end glow coral (light under nothing) and the count in the last space stays visible; *too short*: the object's uncovered end dims to 40 % and its outline pulses. Hint (too far): "The light ran past the end. Count the spaces, not the lines." · (too short): "Part of the {object} is not lit yet."
- **Miss 2** — a dashed drop line falls from the object's right ink edge down to the ruler (300 ms) and the tick it lands on pulses; in Level 2 the printed number just BELOW the end (0, 5 or 10 — so the child always counts ON, never back) also glows and the spaces between it and the drop line show small count-on numerals (11, 12…). Hint: "Follow the line down from the end. Count on from {nearest}."
- **A new move** removes the coral glow, dimming and drop line until the next Check.
- **Success** — the light and the object end together; the object wiggles; a tag "{n} cm" drops onto it; it slides to the shelf. Bubble: "The {object} starts at 0 and ends at {n}: it is {n} cm long."

## 8. Settings (each visibly changes the board at rest)
1. **Ruler numbers:** Every centimetre · Only 0, 5, 10, 15 — the ruler's printed numerals change.
2. **Light count:** Show the count in every space · Only at the end — in the second the light fills without per-space numerals (a harder self-check; the end count still shows).

## 9. Words (EN source; 10 locales hand-written; one native + pedagogy reviewer). Title and intro are FROZEN (metadata); these are in-activity strings.
- instruction: "Put the end of the ruler's light where the object ends: slide the glow marker there and press Check."
- prompt: "Where does it end? Slide the glow marker there."
- hints: "Slide the glow marker to the end of the {object}." · "The light ran past the end. Count the spaces, not the lines." · "Part of the {object} is not lit yet." · "Follow the line down from the end. Count on from {nearest}."
- celebration: "The {object} starts at 0 and ends at {n}: it is {n} cm long."
- readout: "{n} cm"
- settings: "Ruler numbers" — "Every centimetre" / "Only 0, 5, 10, 15"; "Light count" — "Show the count in every space" / "Only at the end".
- **Locale traps:** the unit is written "cm" in all 11 (no inch anywhere — the old intro already says centimeters); spelling "centimeter/centimetre/Zentimeter/centímetro/centimètre/centimetro/centimeter/centimeter/centimeter/centimeter/senttimetri" only in hints. `{object}` takes the article/case the sentence needs — never a fill-in token: each locale authors the full hint per object noun from `image-vocabulary.js` (de "das Ende des Schlüssels" genitive; fi "avaimen loppuun"; fr "la fin de la clé / du marteau"). Numbers 10–15 in Nordic and German are single words (no "ten-and-…" reading issue); the decimal comma never appears (whole cm only). Digits are Western Arabic in all 11. Library labels: *glue* — the picture is a glue BOTTLE: every locale says "the glue bottle" (de *die Klebstoffflasche*, fr *le flacon de colle*, sv *limflaskan*), never "the glue" (the length of glue is not a thing); *popsicle* is the ice lolly (en-GB "ice lolly", de *das Eis am Stiel*, fr *l'esquimau / la glace à l'eau*, sv *isglassen*, fi *mehujää*) — the stick counts in its length; *seashell* is a scallop (da label "Musling" means mussel — the da writer confirms against the picture); *kiwi* is drawn halved; *train* and *car* are toys — the hint names them "toy car" / "toy train" in every locale so the 6–7 cm is honest.

## 10. Sound off, access, phones
- Legible with sound off: the light, counts, coral overshoot, dimmed undershoot and drop line carry everything; TTS (5 locales) only reads numbers.
- Keyboard: ←/→ / Home / Enter. aria: marker "glow marker at {n} centimetres"; ruler "centimetre ruler from 0 to 15"; after Check "the light counted {n} spaces; the {object} ends at {m}".
- Taps: marker grip 44 × 56 / 44 × 52, nudge arrows 44 × 44, the ruler band 64 / 52 tall (tap to jump). Pictures ≥ 96 at 704, ≥ 64 at 360 (one 320-px exception, §4). Check above the folds.

## 11. Distinct from
- **Row 153 Tildy's Tailor Shop** (this batch): the child POSITIONS the ruler (the 0 is not at the start) and the snip jar counts; here the object already starts at 0 and the skill is reading the end — the light that counts spaces is this row's invention.
- **Premium tool "ruler"** (a free measuring ruler) and **"measurement-bench"** (paperclips along objects): no light channel, no space counting, no graded rounds.
- **Row 100 The One-Hop Helpers** (1.MD.A.2, iterating units): the helper hops units; here the units are printed on a tool and the child reads the tool.
- **Premium "unroll-tape" / "unit-handle"**: unit change and perimeter — not reading a cm ruler.

## 12. Build plan
- **Core state:** `{ round:{obj, theme, rot, len}, marker:0..15, level, perSpace }`. Functions: `snap(x)` → tick, `run(marker)` → spaces lit 1..marker, `evaluate(round, marker)` → `{ok}` | `{over:k}` | `{under:k}`, `nearestPrinted(len)` (Level 2).
- **Registration (load-bearing):** the object's `<img>` is sized so `artWidth = len × pxPerCm` using `artExtentSync(theme, noun)` (`widthFrac`, `leftFrac`; for rotated nouns `heightFrac`/`topFrac` take their place) and shifted so its left ink edge sits on the 0 tick — exactly the G2-235 method. **Rotation table:** key, glue, popsicle → 90° clockwise; snail, seashell, car, lemon, centipede, kiwi, train → 0°.
- **Verify gate (own oracle, real pixels in the local test):** for every round at every width, the object's right ink edge is within 1.5 px of the tick N and its left ink edge within 1.5 px of tick 0 (the worksheet's assertion); `evaluate` is ok only at N; Level 2 lengths are never multiples of 5 and the printed numerals are exactly 0/5/10/15; art heights ≥ 96 at 704 and ≥ 64 at 360 and 320 (no exception), ≤ 210 at 704; marker starts at 0; per-space counts are spaces (first lit numeral = 1 sits between ticks 0 and 1).
- **Mutations:** light counts lines (first numeral on tick 0) · object registered by its padded box instead of its ink · accept N+1 · marker starts at the answer · Level 2 prints every number · over/under reversed · drop line drawn from the left edge · rounds sorted · rotation skipped for the popsicle (object stands up) · a round whose length lies outside its object's authored real-size range.
- **Pictures verified on contact sheets by the critic:** spring/snail (side view, shell + body), beach/seashell (a scallop), toys/car (green toy beetle car), fruits/lemon, around-the-house/key (upright → rotated), insects-and-bugs/centipede (horizontal), classroom/glue (upright white-and-red bottle → rotated), desserts-and-sweets/popsicle (upright red/yellow ice lolly on a stick → rotated), fruits/kiwi (halved), toys/train (a toy steam engine). Rejected: christmas/candle (lit — a flame cannot lie flat), the leek/celery/hammer/skateboard/tie/wand rounds (false real sizes), classroom/pen (too thin: 60 px at 360 for 14 cm).
- **Risks:** the real-size range column becomes a field in the round data and is gated (no round outside its range). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a light-up glass ruler, a clicky marker, objects that wiggle and line up on a shelf.
2. **On the board?** Yes — "the number on the ruler counts the spaces before it" is THE ruler lesson, and the light makes it visible for the whole class; Level 2 is the real-ruler skill.
3. **Parent trust?** Library pictures registered honestly to the ruler, no score, calm.
4. **The invention:** slide the marker to the end, and the ruler lights its centimetre spaces one by one from 0 — the number you stopped on is how many spaces it counted.

---
**End note — defect in the CURRENT live activity:** the live read-ruler tiles were `[N−1, N, N+1, N+2]` shuffled, so the correct tile was always the second-smallest of the four — a "pick the second-smallest" child scored 100 % without reading the ruler. **Fixed on the live engine 2026-10-17 (orchestrator)**; this rebuild removes the choice tiles altogether (the answer is a place on the ruler).

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Re-measured every picture height from `art-extents.json`: the designer's table had TWO 320-px floor breaks (caterpillar 60 and toy car 61 — only one was recorded). Rebuilt both tables; now every round is ≥ 96 at 704 and ≥ 64 at 360 and 320, ≤ 210 at 704, no exception.
- Real sizes: the leek (10 cm), celery (12), hammer (9), skateboard (14), tie and wand were honest to the ruler and false to the world — and #154 in this batch teaches real sizes. Every object now lies at a believable real length (snail 4, shell 5, toy car 6, lemon 7, key 8, centipede 9, glue bottle 11, ice lolly 13…) and the real-size range is a gated field.
- Cross-level "remembered size" rule tightened (no picture at the same length in both levels).
- Locale traps rewritten for the new nouns (glue BOTTLE, ice lolly incl. stick, da Musling, toy car/train).
- End note updated: the live second-smallest-tile tell was fixed today.
