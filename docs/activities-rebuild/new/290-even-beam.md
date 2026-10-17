# New 290 — The Station Signal: two trains, one signal, and the = only turns green when they stop level (3.OA.A.4)

## 0. Identity
- **id** `even-beam.play.3-oa-a-4` · grade 3 · CCSS 3.OA.A.4 · strand Operations & Algebraic Thinking · key `even-beam` → `even-beam-core.js`, `even-beam-activity.js`, `even-beam-activity.html`, `even-beam-activities.json`. Start with `node scripts/new-activity.js --num=290`.
- **Why not a beam:** the working title "The Even Beam" is retired — a balance is already a designed invention three times (Row 88 *The Equal-Sign Beam*, New 271 *The Gram Balance*, Row 166 *The Fair Scale*) and the premium tool `number-balance` is a beam. The key stays `even-beam` so the backlog row resolves; the page title is **"The Station Signal"**.
- **Worksheets covered:** G3-350 "Make It Balance" (both sides must be the same; write the missing number — its rounds are `a + b = ▢ + c`, covered by the "+ and −" setting). The default "× and ÷" setting carries the standard itself: every × pass OPENS with three rounds in the standard's own three-number form (`3 × ▢ = 12`, `▢ ÷ 4 = 5`, `18 ÷ ▢ = 6` — a lone number is a one-carriage train), then nine both-sides rounds.
- New instrument; no old activity.

## 1. The pitch
"Every side of the equation is a train built from its numbers — 4 × 6 is four carriages, each six long — and the equals sign is a railway signal at the end of the platform: it only lights its two green bars when the other train stops exactly level with it."

## 2. Why a child will want it again
- **A number is a coupling, not an answer.** The child drops a number tile into the empty socket of the unfinished train and *watches the train get built*: in `▢ × 3` the tile 8 clanks onto the coupler and eight 3-long carriages roll out of the shed one after another (90 ms apart, a soft clack each); in `4 × ▢` the same 8 makes four carriages that are each eight long. Same tile, different train — the slot decides what the number *does*. Children try every tile just to see the trains.
- **The train really drives.** When it is built it rolls along its track to the signal (900 px/s, eased stop). Too short: it stops with a coral gap bracket that shows exactly what is missing ("−5"). Too long: the carriages that run past the signal glow coral and the overhang bracket reads "+5" — the train is too long for the platform; a very long one rolls on into the tunnel. Exactly level: the signal's two bars flip from red to green with a click, both tail lamps light, and the two trains toot once together (a two-tone chord).
- **Division is a saw.** For `24 ÷ ▢` a long ghost log 24 long slides under a saw that cuts it into the tile's number of equal pieces; only one piece couples to the engine, the others slide off onto the siding. A child who drops "12" sees twelve skinny pieces of 2 — the share is tiny.
- **The earned show:** on a level stop the platform lamps light one unit at a time along BOTH trains in the same rhythm, so the two trains are counted out together and finish on the same beat at the signal; the equation strip above writes itself in full with a green "=".
- **Free play between rounds:** after a success every tile stays live until Next — drop any tile and watch its train drive, stop short or overshoot. Children make a train too long on purpose to watch it disappear into the tunnel.

## 3. The skill and the misconception
- **Skill:** the equals sign says *both sides are the same amount*; find the unknown whole number in a multiplication or division equation relating three whole numbers (`3 × ▢ = 12`, `▢ ÷ 4 = 5` — 3.OA.A.4's own form, where the lone number is parked as ONE long carriage) and then in an equation whose two sides are both expressions — `4 × 6 = ▢ × 3`, `24 ÷ 4 = ▢ ÷ 2`, `3 × 2 = 12 ÷ ▢` (3.OA.A.4, the unknown in a multiplication or division equation, in the both-sides form G3-350 asks for) and, in the "+ and −" setting, `8 + 4 = ▢ + 5`.
- **Misconception 1 — "= means the answer comes next"** (8 + 4 = ▢ + 5 → 12; 4 × 6 = ▢ × 3 → 24). **Push-back:** the "comes-next" tile (the complete side's value) is in the tray in 32 of the 36 rounds (all 18 "+" rounds; 14 of 18 "×" rounds — the other four are rounds where that value is not a multiple or divisor, so it could not build a whole train). Dropped in, 12 builds a 12-carriage plus a 5-carriage train of 17 that sails past the signal: the coral overhang is exactly the 5 the child ignored, labelled "+5". For 24 in `▢ × 3` the train is 72 long: the overhang is two more whole trains and runs into the tunnel.
- **Misconception 2 — "add all the numbers"** (8 + 4 + 5 = 17; 3 × ▢ = 12 → 15). **Push-back:** the add-all tile is in 17 of the 42 trays (15 of the 36 both-sides trays — wherever it differs from the answer and builds a whole train — and 2 of the 6 openers: 15 for `3 × ▢ = 12`, 63 for `7 × ▢ = 56`); its train always overshoots, by a gap printed to scale (17 + 5 = 22 against 12: "+10").
- **Misconception 3 — guessing a near number.** **Push-back:** every tray also holds a near-miss (the answer ± 1 or a neighbouring factor); its train stops one carriage short or one carriage long, and the bracket shows exactly one carriage ("−3"/"+3") — the next try is derived, not guessed.
- The material does the arguing, not a message: the gap or overhang is *drawn to scale on the same track* as the train it belongs to.

## 4. The stage
**At 704 px (stacked layout — the apparatus is long and wants the full width; content width 672 px):**
- **Task line** (22 px, one line): **"Drop a number into the empty box so both trains stop at the signal."**
- **The equation strip** (top, 64 px tall, centred): the equation in 40 px Baloo numerals with the locale's operation glyphs, e.g. `4 × 6 = ▢ × 3`; the empty slot is a 56 × 56 dashed teal box. The strip's "=" is drawn grey until the round is solved, then green.
- **The two tracks** (each 72 px tall, 16 px apart): the top track carries the LEFT side of the equation, the bottom track the RIGHT side. A small chip at each track's start repeats its expression (`4 × 6`, `▢ × 3`, 20 px) so the child never loses which train is which. Rails: two 3 px ink lines; sleepers every 12 px.
- **Trains:** an engine block (drawn apparatus — a rounded rectangle 36 × 52 with one circle lamp; no face, no character) and carriages: rectangles 52 px tall whose LENGTH is their value × the round's scale. Carriages alternate two tints (teal / cream) so equal carriages read as groups; each carries its length as a numeral (18 px) when it is ≥ 26 px long. **Scale:** the correct value spans 70 % of the 600 px track (a round worth 24 → 17.5 px per unit, a 3-carriage = 52 px). Anything longer than 100/70 of the correct value (e.g. × small r7: tile 29 → a train 58 long against 8) runs on into the tunnel.
- **The signal:** a mast between the two tracks, standing at the tail of the complete side's train (that train is parked from the start, nose on the start line, tail at the signal). Its head carries two horizontal bars (the "=") 28 × 6 px each — grey-red and crossed by a thin diagonal at rest, clean green when level. A dashed vertical level line falls from the signal across both tracks.
- **The tunnel:** each track ends in a drawn tunnel mouth (a dark arch, 40 px wide); a train longer than the track rolls in, and the overhang bracket still prints its full size (e.g. "+48") with an arrow.
- **The siding (÷ and −):** a thin rail curving off below each track's start; sawn-off pieces roll onto it, dimmed.
- **The tray** (bottom, 88 px tall): four number tiles 72 × 64 px (32 px numerals), 20 px apart, centred; re-shuffled every round.
- **No separate Check button** — dropping a tile IS the test (the train drives). The shell's Next appears after a level stop; the progress chip counts solved rounds.
- No words on the apparatus: numerals, operation glyphs and drawn railway geometry only.

**At 360 px (content 328 px):** equation strip 52 px (32 px numerals, slot 48 × 48); task line `instructionShort` on one line (18 px); tracks 56 px tall, 10 px apart, track length 300 px (correct value spans 210 px); carriage numerals only when a carriage is ≥ 26 px — otherwise the start chip carries the structure (`8 × 3`) and the carriages show their alternating tints; tray tiles 64 × 56 (28 px numerals) in one row (4 × 64 + 3 × 12 = 292 ✓). Budget 360 × 740: header 56 + task 32 + strip 52 + tracks 2 × 56 + 10 + sidings 24 + brackets 28 + tray 64 + Next 52 + gaps 60 = 490 ✓. **At 320 × 640:** track 268 px, tiles 60 × 54 (4 × 60 + 3 × 8 = 264 ✓), budget 486 ✓.

## 5. The hand
- **Drop a tile:** drag a tile (picked up at once, lifts 4 px with a shadow) onto the slot, or tap a tile (it flies to the slot in 160 ms). The tile's numeral appears in the strip's box and in the track chip.
- **The build (≤ 700 ms):** × — carriages roll out of the shed one by one, 90 ms apart (more than 10 carriages slide out together in 300 ms); ÷ — the ghost log slides in (200 ms), the saw drops (soft *zzt*, 150 ms) and cuts it into the tile's number of equal pieces (more than 10 pieces: one sweep), one piece couples, the rest slide to the siding (200 ms); + — the two carriages couple; − — the first carriage arrives and a piece as long as the second number is sawn off its tail and rolls onto the siding.
- **The drive** starts within 80 ms of the drop: the built train rolls right and stops level with the signal (green), short (gap bracket "−n", coral, 200 ms fade-in) or long (the part past the level line glows coral; bracket "+n").
- **Undo / retry:** drag the tile out of the slot back to the tray (or tap the slot) — the train backs into the shed (250 ms) and the tile goes home. Dropping a new tile on a full slot swaps them.
- **Sound:** a soft wood-block clack per carriage, the saw *zzt*, the signal click; level = a two-tone chord. TTS (where available) reads the completed equation on success only.
- **Keyboard:** Tab cycles tiles, Enter/Space drops the focused tile into the slot, Backspace takes it out; Enter on Next.
- **Free play:** after a level stop the tiles stay live until Next — another drop rebuilds and drives (no miss is counted).

## 6. The rounds
One round = one equation with exactly one empty slot and a tray of four tiles; exactly one tile makes the trains level (the core proves it over all four tiles). All values are whole numbers; in a divisor slot every tile divides the dividend, in a dividend slot every tile is a multiple of the divisor, in a subtraction slot every tile keeps the result positive — so every wrong train is a real, whole train that is honestly too short or too long. Trays are listed answer-first; **the runtime shuffles tile order every round.**

**× and ÷ — the three-number openers (the first three rounds of every × pass, shuffled among themselves; the lone number is parked as one carriage of its full length):**

| # | equation (small) | answer | tray | equation (bigger) | answer | tray |
|---|---|---|---|---|---|---|
| o1 | 3 × ▢ = 12 | 4 | 4, 9, 15, 1 | 7 × ▢ = 56 | 8 | 8, 49, 63, 7 |
| o2 | ▢ ÷ 4 = 5 | 20 | 20, 16, 24, 8 | ▢ ÷ 6 = 9 | 54 | 54, 48, 60, 36 |
| o3 | 18 ÷ ▢ = 6 | 3 | 3, 2, 6, 1 | 63 ÷ ▢ = 9 | 7 | 7, 9, 21, 63 |

(9 and 49 are "take away instead" — 12 − 3, 56 − 7; 15 and 63 "add them"; 6 and 9 "copy the number you see"; in a dividend slot every tile is a multiple of the divisor and in a divisor slot every tile divides the dividend, so every wrong train is whole. Measured by the critic's own oracle `work-c41/rest.js`: exactly one levelling tile each; answer rank 2/3/3 small, 2/3/1 bigger.)

**× and ÷, small numbers (factors ≤ 6, values ≤ 25):**

| # | equation | answer | tray |
|---|---|---|---|
| 1 | 4 × 5 = ▢ × 2 | 10 | 10, 20, 11, 8 |
| 2 | 3 × ▢ = 2 × 6 | 4 | 4, 12, 11, 6 |
| 3 | ▢ × 2 = 4 × 4 | 8 | 8, 16, 6, 4 |
| 4 | 20 ÷ 4 = ▢ ÷ 2 | 10 | 10, 8, 6, 4 |
| 5 | 3 × 2 = 12 ÷ ▢ | 2 | 2, 6, 1, 3 |
| 6 | ▢ ÷ 4 = 10 ÷ 2 | 20 | 20, 12, 16, 8 |
| 7 | 2 × ▢ = 24 ÷ 3 | 4 | 4, 8, 29, 6 |
| 8 | 5 × 2 = 20 ÷ ▢ | 2 | 2, 10, 1, 4 |
| 9 | 18 ÷ ▢ = 2 × 3 | 3 | 3, 6, 1, 2 |

**× and ÷, bigger numbers (factors ≤ 10, values ≤ 100):**

| # | equation | answer | tray |
|---|---|---|---|
| 1 | 4 × 6 = ▢ × 3 | 8 | 8, 24, 13, 6 |
| 2 | 6 × ▢ = 9 × 4 | 6 | 6, 36, 19, 9 |
| 3 | ▢ × 8 = 6 × 4 | 3 | 3, 24, 18, 4 |
| 4 | 7 × 6 = 3 × ▢ | 14 | 14, 42, 12, 13 |
| 5 | 48 ÷ 8 = ▢ ÷ 4 | 24 | 24, 20, 16, 12 |
| 6 | 5 × 8 = 80 ÷ ▢ | 2 | 2, 40, 1, 4 |
| 7 | ▢ ÷ 3 = 4 × 2 | 24 | 24, 9, 21, 18 |
| 8 | 9 × ▢ = 3 × 6 | 2 | 2, 18, 1, 3 |
| 9 | 72 ÷ ▢ = 3 × 4 | 6 | 6, 12, 4, 3 |

**+ and −, within 20:**

| # | equation | answer | tray |
|---|---|---|---|
| 1 | 8 + 4 = ▢ + 5 | 7 | 7, 12, 17, 9 |
| 2 | 6 + ▢ = 9 + 3 | 6 | 6, 12, 18, 4 |
| 3 | ▢ + 7 = 10 + 5 | 8 | 8, 15, 6, 7 |
| 4 | 15 − 6 = ▢ − 4 | 13 | 13, 9, 11, 12 |
| 5 | 9 + 5 = 18 − ▢ | 4 | 4, 14, 5, 6 |
| 6 | ▢ − 5 = 7 + 4 | 16 | 16, 11, 17, 6 |
| 7 | 11 − ▢ = 3 + 4 | 4 | 4, 7, 3, 5 |
| 8 | 7 + 6 = 9 + ▢ | 4 | 4, 13, 22, 5 |
| 9 | 13 − 4 = ▢ − 6 | 15 | 15, 9, 13, 14 |

**+ and −, within 100:**

| # | equation | answer | tray |
|---|---|---|---|
| 1 | 38 + 25 = ▢ + 30 | 33 | 33, 63, 93, 32 |
| 2 | 45 + ▢ = 40 + 27 | 22 | 22, 67, 112, 23 |
| 3 | ▢ + 36 = 50 + 28 | 42 | 42, 78, 40, 41 |
| 4 | 72 − 18 = ▢ − 20 | 74 | 74, 54, 73, 72 |
| 5 | 56 + 17 = 90 − ▢ | 17 | 17, 73, 16, 27 |
| 6 | ▢ − 24 = 35 + 16 | 75 | 75, 51, 85, 65 |
| 7 | 64 − ▢ = 22 + 19 | 23 | 23, 41, 33, 24 |
| 8 | 48 + 29 = 40 + ▢ | 37 | 37, 77, 117, 36 |
| 9 | 91 − 35 = ▢ − 27 | 83 | 83, 56, 73, 82 |

- **Measured (`work-41/beam-final.js`, the oracle the gate copies):** every round has exactly one levelling tile; no duplicate tiles; every wrong tile builds a whole, positive train.
  - **The empty slot** sits in each of the four places (left-first, left-second, right-first, right-second) 2/3/2/2 (× small), 2/3/2/2 (× big), 2/2/3/2 (+ small), 2/2/3/2 (+ big) — the unknown is on BOTH sides and in BOTH slots.
  - **Comes-next tile:** 7, 7, 9, 9 of 9 (dossier floor ≥ 3 ✓). **Add-all tile (differing from the answer):** 4, 5, 3, 3 of 9 (re-measured by the critic — in + small r6 the add-all value 16 IS the answer).
  - **The answer's rank inside its tray** (smallest → largest): 2/3/2/2 in all four sets except + small 3/2/2/2 — so "always pick the smallest / second / third / biggest" each win at most 3 of 9 (33 %); with the three openers the × passes are 12 rounds and the largest rank count is 4 of 12 in both (33 %).
  - **Shortcut bots:** "copy a number you can see" 3, 1, 2, 1 of 9; "pick the tile nearest the other side's value" 0 of 9 in every set (it always lands on the comes-next tile); "pick the odd one out by even/odd" ≤ 1 of 9.
- **Answer position on screen:** the tray is re-shuffled every round (Fisher–Yates on the shell's seed); the gate runs 2,000 seeded shuffles per set and asserts the answer tile lands in each of the four tray places 25 % ± 3 %.
- **Order:** × passes: the three openers first (shuffled among themselves), then the nine both-sides rounds (shuffled); + passes: the nine rounds shuffled; never the same order twice in a row.

## 7. Check, the misses, the success
- **Nothing dropped** and the child taps the slot or presses Enter → hint, no miss: **"Drag a number into the empty box."**
- **Miss 1** (a wrong tile's train stops short or overshoots): the apparatus shows the gap or overhang bracket to scale with its size ("−5" / "+5") and the level line pulses once. Hint (short): **"Look at the gap. Your train must stop right at the signal."** · (long): **"Your train runs past the signal. It needs to be shorter."**
- **Miss 2** (a second wrong tile in the round): the complete side's train splits into faint unit cells, the platform lamps count along it up to the signal and the signal shows the complete side's value in a 22 px tag ("24"); the unfinished train keeps its structure so the child sees "how many carriages of 3 reach 24". Hints (the tag says the same thing the words do): × unknown count **"The {top} train is {v} long. How many carriages of {k} make {v}?"** · × unknown length **"The {top} train is {v} long. How long must each of {n} carriages be?"** · ÷ **"The {top} train is {v} long. Cut so that one piece is {v} long."** · + and − **"The {top} train is {v} long. Which number makes your train {v} long too?"** ({top} = "top" or "bottom", authored as two separate keys, never a token.)
- **A new drop** removes the miss-2 cells and tag until the next miss.
- **Success** (level): signal green, chord, the paired lamp count runs along both trains together (≤ 1.2 s), the strip completes with a green "=". Bubble: **"{left} = {right} — both trains are {v} long!"** e.g. "4 × 6 = 8 × 3 — both trains are 24 long!" (expressions rendered with the locale's glyphs).

## 8. Settings
1. **Sides:** "× and ÷" (default, 3.OA.A.4) / "+ and −" (G3-350). At rest the board visibly changes: × shows the parked train as repeated equal carriages (and ÷ rounds show the saw over the shed); + shows a two-carriage train.
2. **Numbers:** "small" (× factors to 6 · + within 20) / "bigger" (× factors to 10 · + within 100). At rest the parked train's numbers and the track's scale change.

## 9. Words (EN source)
- **title:** "The Station Signal"
- **instruction:** "Drop a number into the empty box so both trains stop at the signal."
- **instructionShort** (≤ 400 px): "Make both trains stop at the signal."
- **hints:** `empty` "Drag a number into the empty box." · `short` "Look at the gap. Your train must stop right at the signal." · `long` "Your train runs past the signal. It needs to be shorter." · `more.count.top`/`.bottom` "The top (bottom) train is {v} long. How many carriages of {k} make {v}?" · `more.length.*` "The top (bottom) train is {v} long. How long must each of {n} carriages be?" · `more.share.*` "The top (bottom) train is {v} long. Cut so that one piece is {v} long." · `more.sum.*` "The top (bottom) train is {v} long. Which number makes your train {v} long too?"
- **celebration:** "{left} = {right} — both trains are {v} long!"
- **settings:** "Sides" — "× and ÷" / "+ and −" · "Numbers" — "small" / "bigger"
- **aria:** tracks "Left side: {expr}" / "Right side: {expr}"; signal live region "The trains stop level." / "Your train is {n} too short." / "Your train is {n} too long."
- **Locale traps:**
  - **Operation glyphs** come from `scripts/worksheet-gen/types/_shared/notation.js` (the one table — port its three sets into the activity's strings; never a second hand table): × is "·" in de/sv/da/no/fi; ÷ is ":" in de/it/nl/da/no/fi and "/" in sv. **"÷" must never render in sv** (it meant MINUS in older Swedish notation, and Danish/Norwegian commerce still reads it as minus). The strip, the chips, the settings label and the celebration all go through the glyph functions — the setting label is "× and ÷" in en/fr/es/pt, "· und :" in de, "· och /" in sv, etc.
  - **"both trains are 24 long"** needs plural agreement written per locale: de "sind beide 24 lang", fr "mesurent tous les deux 24", es/pt "miden/medem 24", it "sono lunghi 24", nl "zijn allebei 24 lang", sv "är båda 24 långa", da/no "er begge 24 lange", fi "ovat molemmat 24 pitkiä". `{v}` is a bare numeral; the authors write each whole sentence.
  - **"carriage"** with a count needs ICU plurals ({k} and {n}): de Wagen, fr wagon(s), es vagón/vagones, pt vagão/vagões, it vagone/vagoni, nl wagon(s), sv vagn(ar), da/no vogn(e/er), fi vaunu (partitive after numerals: "8 vaunua").
  - **"signal"**: the railway word (de Signal, fr signal, es señal, pt sinal, it segnale, nl sein, sv/da/no signal, fi opastin) — the nl author chooses "sein", the railway term.
  - Numerals only on the apparatus; no number words, so no gender or number-word traps.

## 10. Sound off, access, phones
- **Sound off:** every state is drawn — train lengths, the gap/overhang bracket with "−n"/"+n", the signal bars (crossed grey-red vs clean green — shape as well as colour), the strip's grey/green "=".
- **Keyboard:** Tab to a tile, Enter drops it, Backspace removes it; teal 3 px focus ring; Enter on Next.
- **aria:** the slot is a button "Empty box in {equation}"; after each drive a polite live region reads the signal state.
- **Taps:** tiles 72 × 64 (704) / 64 × 56 (360) / 60 × 54 (320) — all ≥ 44; slot ≥ 48.
- **Pictures:** none — trains, signal and tunnel are apparatus geometry; the engine has no face.
- **Fold:** Next sits at ≈ 490 px on 360 × 740 and ≈ 486 px on 320 × 640 ✓.
- **Phone changes:** `instructionShort`, carriage numerals hide below 26 px (the chip keeps `8 × 3`), smaller tiles, 28 px tunnel arch.

## 11. Distinct from
- **Row 88 The Equal-Sign Beam (1.OA.D.7), New 271 The Gram Balance, Row 166 The Fair Scale, tool `number-balance`:** all are balances — a beam tips. Here nothing tips: each side is BUILT as a train whose structure is the expression (repeated equal carriages for ×, a sawn log for ÷), and "=" means *the same length on two parallel tracks*. The misconception is shown as a drawn overhang or gap measured in units, not as a tilt.
- **Row 90 The Plank Path (1.OA.D.8):** a single plank that is exactly the number long fills a gap or sticks out — the nearest look-alike (length feedback). Here the dropped number is never a length by itself: the slot decides whether it is *how many carriages* or *how long each one is*, and the gap/overhang is between two whole expressions on parallel tracks. **Row 89 The Two Gauges** (two needles must point to one number) and **New 250 The Light Wall** (sums rising through glass bricks) do not build an expression's structure at all.
- **Row 87 The Rung Ladder (1.OA.D.7):** two rails of holes must be equally high for a squirrel to climb (grade 1 cards, +/−). Here the *slot* decides what a number does — how many carriages, or how long each carriage is — which is the multiplicative idea 3.OA.A.4 needs.
- **Tool `comparison-planks`:** moves an overhang from one plank to the other; here the overhang is a consequence to read, never moved.
- **Siblings in this batch:** #292 also finds an unknown factor, but by pouring counters into a frame with a fixed number of rows (area, one equation); #295 finds a rule on a machine. Only #290 puts an expression on each side of "=".

## 12. Build plan
- **Core state:** `{ setting:{sides,numbers}, round:{ q:[A,opL,B,C,opR,D], slot, tray:[4] }, slotTile:null|n, trains:{ top:Train, bottom:Train }, misses, solved }` with `Train = { cars:[len…], siding:[len…], length }`.
- **Core functions:** `evalSide(a,op,b)`; `buildTrain(a,op,b)` (× → a cars of length b · ÷ → log a cut into b, one car of a/b, b − 1 pieces to the siding · + → [a, b] · − → [a] with b sawn to the siding); `drop(tile)` → `{ delta: unknownLen − knownLen }`; `isLevel()`; `hintKey(state)`; `scaleFor(round) = 0.70 × trackLen / sideValue` (sideValue = the complete side's value — never the dropped tile, see the mutations).
- **The gate's own ground truth (`verify-even-beam-core.js`)** re-implements the arithmetic without the core and asserts, for every round of the four sets: (1) exactly one tray tile satisfies the equation; (2) every tile gives whole, positive values; (3) the core's `drop()` returns delta 0 only for the answer and the exact signed difference for every wrong tile; (4) the comes-next tile appears ≥ 3 times per set, and every × set opens with its three three-number rounds (exactly one levelling tile each); (5) every slot is used ≥ 2 times per set; (6) no answer rank is used more than 3 times per set; (7) 2,000 seeded tray shuffles put the answer in each tray place 25 % ± 3 %; (8) the comes-next train overshoots by exactly the hidden part (for `a + b = ▢ + c`: by c; for `a × b = ▢ × c`: by (a × b) × c − a × b) — the push-back claim; (9) rendering the strip in all 11 locales, "÷" appears only in en/fr/es/pt and "·" exactly in de/sv/da/no/fi.
- **Mutations (one per rule, each must be killed):** level test `>=` instead of `===` · × builds b cars of a (swapped — then `▢ × 3` and `4 × ▢` look alike) · ÷ keeps the whole log instead of one piece · − saws nothing off · tray not shuffled · comes-next tiles removed from the trays · the bracket shows |delta| without its sign · miss-2 cells shown at miss 1 · Next shown before level · "÷" rendered in sv · scale computed from the dropped tile (so every train "fits") · a new drop leaves the miss-2 tag up · the three-number openers dropped from the × passes (the standard's own form disappears).
- **Local test:** real pointer drags tile → slot at 320·360·412·704·768·1024·1366 for every round of every set; assert the drive ends level only for the answer and read the bracket text for one wrong tile per round; assert the tunnel clip never covers the signal.
- **Pictures to verify:** none.
- **Risks:** very long overshoot trains (× big r8, tile 18 → 162 long; × big r6, tile 40 cuts 80 into 40 pieces) — the tunnel caps the drawn length and the bracket prints the full number; more than 10 pieces are cut in one sweep. Measure that every carriage ≥ 26 px carries its numeral and none overflows.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — dropping a number builds a train that *drives*; the same tile builds a different train in a different slot, the saw cuts the log, a wrong train sails into the tunnel. They will try every tile.
2. **Would a teacher put it on the board?** Yes — `8 + 4 = 12 + 5` is wrong by exactly a 5-carriage overhang on screen, and `4 × 6 = 8 × 3` shows four 6s and eight 3s ending at the same signal: the meaning of "=" and of × in one picture.
3. **Would a parent trust it?** Calm, no characters, no words on the apparatus, legible with the sound off, every wrong answer explained by a drawn gap or overhang — never a buzzer.
4. **The invention:** "Each side of the equation is a train built from its numbers, and the equals sign is a railway signal that only turns green when both trains stop exactly level."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 5→5
What changed:
- The default "× and ÷" setting never asked the standard's own form — 3.OA.A.4 is an unknown in an equation relating THREE whole numbers (8 × ▢ = 48), and every round had four. Every × pass now opens with three three-number rounds per level (a lone number parks as one long carriage), with whole-train trays and the take-away / add-them / copy-it distractors; tables re-solved by my own oracle (work-c41/beam.js, rest.js): exactly one levelling tile in all 42 rounds, every wrong tile a whole positive train.
- Corrected the measured counts: add-all tile 4/5/3/3 per set (not 4/5/4/4 — in + small r6 the add-all value IS the answer), 17 of 42 trays; answer-rank maximum re-measured with the openers (4 of 12).
- `scaleFor` now names the complete side's value (the designer's "answerValue" let a builder scale from the dropped tile, which would make every train "fit").
- §11 now separates it from Row 90 The Plank Path (the nearest look-alike: a length that fills a gap or sticks out), Row 89 and New 250 — checked against designs/088, 089, 090 and new/250: none builds an expression's structure; the slot deciding what a number DOES (how many carriages vs how long each) is new.
- Gate + mutation for the openers added.
