# New 300 — The Kite Tail (3.NF.A.1)

> The working title was "The Piece Stamp" (stamping copies is designed three times: Row 108, Row 23, New 272). The designer's replacement, a spyglass that pulls out one tube per piece and only focuses at the exact count, is **Row 46 The Telescope** (Kikkerten — "a telescope you pull out one click for every syllable … only sharp when it has exactly as many parts as the word"), so the critic replaced it again. The planned key and files stay `piece-stamp`; the page title and the invention are **The Kite Tail**.

## 0. Identity
- id `piece-stamp.play.3-nf-a-1` · grade 3 · CCSS 3.NF.A.1 · strand Number & Operations—Fractions · files `mini tools/piece-stamp-core.js`, `piece-stamp-activity.js`, `piece-stamp-activity.html`, `piece-stamp-activities.json` (scaffold `node scripts/new-activity.js --num=300`).
- worksheets covered: **G3-321 "Find the Whole"** — all three levels: level 1 (halves–fourths), level 2 (the published page: "the small bar is one part — circle the bar that shows the WHOLE" = the gauge-pick rounds), level 3 `refPart` (the given bar is k parts, not one = the untie rounds).
- a new instrument (no old activity).

## 1. The pitch
"Your flag is one piece of the kite's tail — tie on flags, each one a copy of yours, until the tail is one whole; then the kite-maker's gauge slides in under it, and only a tail of exactly one whole clips in and lets the kite fly."

## 2. Why a child will want it again (the fun)
- **The tail in the wind.** The kite (library `toys/kite`) hangs at the top left; its tail streams to the right on the wind, a row of flags with a knot between each. The child grips the knot bead at the tail's end and drags it outwards: with a soft *zip* a new flag ties on, exactly a copy of the first. Drag back and flags slip off with a *flick*. The tail ripples gently all the time (a 2 px sine wave along it), so it feels alive.
- **No early verdict.** While the child builds, the kite bobs the same way at every length — nothing hints "warmer/colder". The thinking is the child's.
- **The flight.** On Done the gauge (a wooden rod marked **1**) glides in under the tail. If the tail fits it exactly, the tail clips into the gauge with a *clack*, the kite tugs, lifts 40 px, loops once and settles; then a library bird flies in and perches on the kite string (a different bird each round: canary, cardinal, dove, crow, magpie, pigeon, seagull, swallow, toucan, hummingbird, woodpecker, parrot — "who will land this time?" is the reason to press next).
- **Free play.** Before Done the tail can be made as long as the sky allows and pulled back; nothing is judged until Done.

## 3. The skill and the misconception
- **Skill (3.NF.A.1, G3-321):** a unit fraction 1/b is one of b equal parts of a whole, so the whole is b copies of the 1/b piece, and a/b is a copies of 1/b. Going from a piece back to the whole is exactly G3-321.
- **Misconceptions and how the material pushes back (physics, not messages):**
  1. *"The whole is the longest bar."* The flag's length changes every round (a 1/2 flag is 48 px in one round, a 1/4 flag 100 px in another — measured, section 6), and the sky lets the tail run 2–10 flags past the whole. A child who pulls "as far as it goes" sees flags hang past the gauge's end.
  2. *"A whole is b pieces of any size."* Every new flag is a copy; nothing else can be tied on. In gauge-pick rounds the rack holds gauges that would suit a different count of this flag — they do not fit b of them.
  3. *"The bottom number is only a label."* The counter riding under the tail's end reads 1/3, 2/3, 3/3, 4/3 as flags tie on: the bottom number stays, the top number counts flags, and a whole is the moment top = bottom.
  4. *(level 3) "The given bar is always one part."* In untie rounds the given flag is 2/5 or 3/4 drawn as ONE flag with no seams. If the child ties on copies of it as it is, the counter jumps 2/5 → 4/5 → 6/5 and can never land on 5/5 — the gauge shows a gap or an overhang at every length. Tapping the flag unties it into exactly as many equal flags as its top number (2 or 3 — the knots are already in it); copies of ONE of those flags reach 5/5.

## 4. The stage
**Stacked layout** (no `layout:'split'`: a split column is ~350 px at 704 and the tail needs 620). Bubble under the apparatus.

| element | 704 px (stage 620 wide) | 360 px (stage 318) | kind |
|---|---|---|---|
| task line | 22 px, ≤ 2 lines, top | 18 px | text |
| **kite** at the top left; its string runs off the top edge | picture 112 px | 72 px | library `toys/kite` |
| **flag tag** above the first flag (stacked fraction, e.g. 1/3) | numerals 26 px | 20 px | content numerals |
| **sky track**: a pale band the tail streams along, from under the kite to the right edge | 620 × 64 px | 300 × 52 px | drawn band |
| **tail**: the first flag = the given piece (coral, teal border); tied-on flags a shade lighter; 6 px round knot between flags; the end knot is the **grip bead** | flag height 40 px; grip 48 × 56 px hit area | flag 32 px; grip 44 × 48 | drawn bars |
| **counter** under the tail's end, moves with it: "2/3" | 28 px numerals in a cream tag | 22 px | content numerals |
| **gauge** (the whole, a wooden rod with "1" on its end cap), hidden until Done, slides in under the tail | 30 px tall, length = the whole | 24 px | drawn bar |
| **gauge rack** (gauge-pick rounds only): three gauges stacked below the track, left ends aligned with the tail's start | 3 rows × 30 px, 12 px gaps | 3 rows × 24 px (48 px hit rows) | drawn bars |
| **visitor bird** (success only), perches on the string | 96 px | 64 px | library birds-2 |
| Done | shell button | above the 360×740 fold | shell |

- Lengths are px at 704 (track 620 px); at 360 every length × 0.484 (track 300 px). The shortest flag anywhere is 40 px at 704 / 19 px at 360. A flag is never a tap target (only the grip bead and, in untie rounds, the given flag — whose hit area is padded to 48 px tall), so its width has no tap floor; knots keep each flag distinct.
- No words on the apparatus: the fraction numerals, the gauge's "1" and the counter only.
- Birds (all seen on `contact/birds-2.png`, all in `birds-2.json`): canary, cardinal, dove, crow, magpie, pigeon, seagull, swallow, toucan, hummingbird, woodpecker, parrot. Left out by the rulings/sheet: sparrow + robin (near-twins), puffin (reads as a penguin), falcon (unnamable), duck (a duckling). The bird is decoration only; its name appears only in aria.
- **Task lines (EN):** build the whole — "This flag is {frac} of the tail. Tie on flags until the tail is one whole." · build an amount — "This flag is {frac}. Make the tail {target} long." · untie — "This flag is {frac} of the tail. Make the tail one whole." · gauge-pick — "This flag is {frac} of the tail. Which gauge is one whole tail?"

## 5. The hand
- **Drag the grip bead** (≥ 44 px hit area): the tail's end follows the finger; when it passes half a flag-length, the next flag ties on (*zip*, 660 Hz / 30 ms); on release the tail snaps to a whole number of flags (120 ms ease-out). Response < 50 ms (transform only). Dragging back slips flags off (*flick*, 440 Hz).
- **Tap the grip** = one more flag (180 ms slide-in). **Tap the first flag** = one flag off. Keyboard: section 10.
- **Untie (untie rounds only):** tap the given flag — its hidden knots appear and it parts into its top number of equal flags (300 ms, a soft double *pop*); the flag tag now reads the unit (1/5) above the first of them and the counter reads 2/5. Untying is undoable (tap again = tie them back while no copies are on).
- The sky's right edge stops the tail with a 4 px bounce of the grip. The slack beyond the whole varies per round (2–10 flags), so "pull to the end, then back k" is never a rule.
- **Done** = the task's Check: the gauge slides in from the left under the tail (500 ms); then section 7.
- **Gauge-pick rounds:** tap a gauge on the rack (the whole row is the target, 48 px tall): it lifts 6 px with a teal outline; tapping another changes the choice. Check makes the tail tie on flags by itself (150 ms per flag, counter counting) along the chosen gauge.
- Everything is undoable until Done/Check; after a miss the tail stays as built and the child adjusts it.

## 6. The rounds
One round = one given flag, one target, one Done. The child BUILDS a count, so there is no answer position except in gauge-pick rounds (measured below). Order: order-only reshuffle per pass, never the same order twice, never the same b twice running (reshuffle until true). Columns: flag px at 704 / 360; target in flags; slack = flags the sky allows past the target (= ⌊620 / flag px⌋ − target).

**Pieces = halves to fourths, Ask = build the whole** (9 rounds, 3 gauge-pick):

| # | kind | given | flag px | target | whole px | slack / the gauges |
|---|---|---|---|---|---|---|
| 1 | build | 1/3 | 96 / 46 | 3 | 288 | 3 |
| 2 | build | 1/2 | 72 / 35 | 2 | 144 | 6 |
| 3 | build | 1/4 | 100 / 48 | 4 | 400 | 2 |
| 4 | gauge-pick | 1/3 | 64 / 31 | 3 | 192 | gauges 128 · **192** · 320 (2, 3, 5 flags) — fit = middle; rack row 3 |
| 5 | build | 1/2 | 58 / 28 | 2 | 116 | 8 |
| 6 | build | 1/4 | 62 / 30 | 4 | 248 | 6 |
| 7 | build | 1/3 | 70 / 34 | 3 | 210 | 5 |
| 8 | gauge-pick | 1/2 | 110 / 53 | 2 | 220 | gauges 110 · 165 · **220** (1, 1½, 2 flags — the 110 gauge is "the part is the whole") — fit = longest; row 1 |
| 9 | gauge-pick | 1/4 | 86 / 42 | 4 | 344 | gauges **344** · 430 · 516 (4, 5, 6 flags) — fit = shortest; row 2 |

**Pieces = halves to eighths, Ask = build the whole** (9 rounds: 2 untie = G3-321 level 3, 3 gauge-pick):

| # | kind | given | flag px | target | whole px | slack / gauges |
|---|---|---|---|---|---|---|
| 1 | build | 1/6 | 58 / 28 | 6 | 348 | 4 |
| 2 | build | 1/2 | 48 / 23 | 2 | 96 | 10 |
| 3 | build | 1/8 | 46 / 22 | 8 | 368 | 5 |
| 4 | untie | 2/5 (one 168 px flag → 2 × 84) | 84 / 41 | 5 | 420 | 2 |
| 5 | build | 1/3 | 62 / 30 | 3 | 186 | 7 |
| 6 | gauge-pick | 1/7 | 52 / 25 | 7 | 364 | gauges 312 · **364** · 416 (6, 7, 8 flags) — middle; row 1 |
| 7 | untie | 3/4 (one 240 px flag → 3 × 80) | 80 / 39 | 4 | 320 | 3 |
| 8 | gauge-pick | 1/8 | 60 / 29 | 8 | 480 | gauges **480** · 540 · 600 (8, 9, 10) — shortest; row 3 |
| 9 | gauge-pick | 1/6 | 44 / 21 | 6 | 264 | gauges 176 · 220 · **264** (4, 5, 6) — longest; row 2 |

Untie rounds, if the child copies the un-untied flag: 2/5 → 4/5 (336 px) → 6/5 (504 px); 3/4 → 6/4 (480 px). Both copy counts miss the whole on both sides — the jump over 5/5 (4/4) is the lesson.

**Ask = build an amount** (on Done the gauge shows b faint segments and a notch at a/b; for a > b two gauges lie end to end):

| # | halves–fourths: given → target (flag px) | to eighths: given → target (flag px) |
|---|---|---|
| 1 | 1/3 → 2/3 (90) | 1/6 → 5/6 (52) |
| 2 | 1/4 → 3/4 (70) | 1/8 → 3/8 (56) |
| 3 | 1/2 → 2/2 (56) | 1/5 → 4/5 (70) |
| 4 | 1/4 → 2/4 (96) | 1/3 → 2/3 (58) |
| 5 | 1/3 → 3/3 (66) | 1/8 → 7/8 (40) |
| 6 | 1/2 → 3/2 (50) | 1/6 → 7/6 (44) |
| 7 | 1/4 → 5/4 (60) | 1/7 → 4/7 (56) |
| 8 | 1/3 → 4/3 (78) | 1/4 → 6/4 (62) |
| 9 | — (8 rounds) | 1/5 → 2/5 (64) |

Every gauge (two gauges end to end for a > b) and every target + 2 flags fits the 620 px sky (largest: 528 px, 1/6 → 7/6; 496 px, 1/4 → 6/4 — measured).

**Measured by the critic** (own script `work-c40/c300.js`; the verify gate re-measures):
- *Longest-bar cue:* over all pairs of build-the-whole rounds with different b, the smaller-denominator flag is the SHORTER one in **52 %** (14/27, halves–fourths) and **47 %** (9/19, to eighths) of pairs; correlation of b with flag length +0.06 / −0.08. Flag length never predicts the denominator. (The designer's "41 %" was a miscount.)
- *Slack:* 3, 6, 2, 8, 6, 5 and 4, 10, 5, 2, 7, 3 — 5–6 distinct values per table, never below 2.
- *Gauge-pick:* the fitting gauge is shortest / middle / longest exactly once per table (ranks 1·2·0 and 1·0·2) and sits in rack rows 1 / 2 / 3 exactly once per table: a shortest-, longest-, middle- or row-bot scores 1/3. Every distractor gauge is a whole number of flags (or the flag itself, or 1½ flags) — a wrong count, never a random length, so each wrong pick has a meaning the miss can show.
- *One right answer:* the target count is unique; gauge lengths are distinct and exactly one equals b × flag.

## 7. Check, the misses, the success
- **Done with the tail untouched** → hint, no miss: "Drag the knot at the end of the tail to tie on more flags." · untie rounds, Done after copying the un-untied flag → this is a real miss (below).
- **Miss 1 — the gauge shows the error.** Too short: the empty end of the gauge flashes cream/coral three times (the GAP); its length in flags is not shown; the kite dips. Too long: the flags past the gauge's end turn coral and droop (the OVERHANG). The counter stays as built. Hints EN — short: "The gauge is longer than your tail. Is that all the flags one whole needs?" · long: "Some flags hang past the gauge. How many flags make one whole?" · untie round, copies of the whole given flag: the counter's top number pulses on each jump (2 → 4 → 6) — "Your tail jumps over one whole. Tap your flag to untie it into its equal parts."
- **Miss 2 — the gauge shows its segments.** The gauge draws b faint segment lines, one per flag length; each flag gets a small numeral 1…n above it (14 px; at 360 in a strip above the tail). Beside the counter a ghost target appears ("3/3"). Hint EN: "Each flag is {frac}. One whole is {b} of them: {b}/{b}."
- **Gauge-pick misses:** miss 1 — the tail grows along the chosen gauge and stops short (gap flashes) or runs past its end (overhang); miss 2 — every gauge on the rack shows its segments in units of this flag, so the fitting gauge shows exactly b.
- Any new drag or tap clears the miss showing until the next Done.
- **Success:** the tail clips into the gauge (*clack*, chime 880→1320 Hz), tail and gauge merge into one bar labelled **1**, the kite loops once, the bird lands. Bubble EN: whole — "{b} flags of {frac} make one whole: {b}/{b} = 1." · amount — "{a} flags of {unit} make {a}/{b}." · untie — "{given} is {a} flags of {unit}. {b} of them make {b}/{b} — one whole."

## 8. Settings
1. **Pieces:** halves to fourths (b 2–4) / halves to eighths (b 2–8; adds the untie rounds). At rest: the given flag's label and length change.
2. **Ask:** build the whole / build an amount. At rest: the task line changes and, for amounts, a target chip appears beside the counter.

## 9. Words (EN source)
- title **The Kite Tail** · instruction "Tie on flags to build the whole tail, then press Done."
- prompts `promptWhole` / `promptAmount` / `promptUntie` / `promptGauge` (section 4; {frac}, {target} render as stacked fractions).
- hints `hintMove` · `hintShort` · `hintLong` · `hintUntie` · `hintStrong` (section 7) · `hintGauge` "Tap the gauge you think is one whole tail."
- celebrations `winWhole` · `winAmount` · `winUntie`.
- settings: "Pieces" — "halves to fourths" / "halves to eighths"; "Ask" — "build the whole" / "build an amount".
- aria: `srTail` "{n} flags on the tail. The tail is {n}/{b} long." · `srGauge` "Gauge {i}." (+ " {len} flags long." after miss 2) · `srBird` "A {bird} lands on the kite string." (success only).
- **Locale traps:**
  - *Kite:* de "Drachen" (also "dragon" — never beside things-that-fly/dragon, ruling batch-37), fr "cerf-volant", es "papalote" (es-MX; "cometa" in Spain — es here is es-MX), pt-BR "pipa", it "aquilone", nl "vlieger", sv "drake", da "drage", no "drage", fi "leija".
  - *Tail / flag:* the kite tail has its own word in several locales — pt-BR "rabiola" (exactly a kite tail), fr "la queue du cerf-volant", de "der Drachenschwanz", es "la cola", it "la coda", nl "de staart", sv/da/no "svansen / halen / halen", fi "häntä". Flag: de "Fähnchen", fr "fanion", es "banderín", pt "bandeirinha", it "bandierina", nl "vlaggetje", sv "flagga", da "flag", no "flagg", fi "lippu" (partitive after numerals: "kolme lippua"). The native reviewer checks each against the render (rectangular pennants with knots).
  - *Gauge:* not a technical word — de "Messstab", fr "la règle du fabricant", es "la regla", pt "a régua", it "l'asta", nl "de meetlat", sv "mätstickan", da "målestokken", no "målestokken", fi "mittakeppi".
  - *"Whole"* (prose only; the gauge says "1"): de "ein Ganzes", fr "une unité" (CE2 usage), es "un entero", pt "um inteiro", it "un intero", nl "een geheel", sv/da/no "en hel", fi "yksi kokonainen".
  - *Fraction words* are never printed (stacked numerals only). TTS (5 locales) reads them from a per-locale fraction-word table (fr "un tiers / un quart" irregular; de "ein Drittel"; sv "en tredjedel"; fi "kolmasosa"), reviewed natively — not `number-words.js` (cardinals only).
  - Bird names (aria only) come from `image-vocabulary.js`; de "Taube", fi "kyyhky" etc. — no article frames needed.

## 10. Sound off, access, phones
- Sound off: counter, gap/overhang, segment lines and the flight carry everything; the zips are a bonus.
- Keyboard: Tab to the grip; → or ↑ ties on one flag, ← or ↓ slips one off; U unties (untie rounds; also Enter on the given flag); Enter on Done. Gauge-pick: Tab cycles the gauges, Space selects.
- aria-live reads `srTail` on each change.
- Taps: grip 48 × 56 (704) / 44 × 48 (360); given flag padded to 48 px tall; gauge rows 48 px; Done is the shell button.
- Pictures: kite 112 / 72 px, bird 96 / 64 px — above both floors.
- Phones: the kite moves beside the task line (72 px); the rack rows shrink to 24 px bars in 48 px hit rows. At 320 px the track is 270 px and the shortest flag 17 px — knots keep it a clear band. Stage height 430 px keeps Done above the 320×640 fold.

## 11. Distinct from
- **Row 46 The Telescope** (syllables, a telescope pulled out click by click, focus at the exact count) — the designer's spyglass was this invention; the kite tail has no telescope, no focus, no blur, and its verdict is a gauge laid under the tail.
- **Row 108 One-Piece Stamp, New 272 Double Stamp, Row 23 Stamp Frame** — they print copies onto a surface; here copies are tied onto one object whose whole is unknown until the gauge arrives.
- **Row 195 Self-Writing Ticket** (forge a piece inside a GIVEN bar; copies fill the known whole) — the tail goes the other way: from the piece to an unknown whole. **New 268 Dealing Tray** (fraction of a set) — sets, not lengths.
- **Rows 107/170/171/172, New 285** — equal parts of a given shape (mobile, stamp sheet, dough press, rain table, mirror fold); none builds the whole from a part.
- **fraction-kitchen** (premium tool) cuts a food whole into parts — the opposite direction. **comparison-planks / unit-handle** (tools) compare or re-measure lengths; neither builds a whole from a fraction label.
- **This batch:** #301 The Folding Strip partitions a fixed 0–1 strip; #302 The Sunny Blinds compares two fractions of one window; #288 The Walking Dividers walks whole-number steps (the tail never walks or tumbles — it grows at one end).

## 12. Build plan
- **Core state:** `{ b, givenA, flagPx, target, flags, untied, slackMax, kind, gauges[], chosen, misses }`. Functions `tie(n)`, `slip(n)`, `setFlags(n)` (clamped to `[givenA, target + slackMax]`; when `!untied && givenA > 1` the step is givenA), `untie()`, `counter() → {num, den: b}`, `verdict() → 'short' | 'long' | 'exact'`, `gaugeFits(i)`, `done()`.
- **Verify gate** (`verify-piece-stamp-core.js`, its own oracle): for every round of every setting — whole px = b × flagPx; target unique; slack ≥ 2 with ≥ 4 distinct slack values per table; every target + 2 flags and every gauge ≤ 620 px; gauge lengths distinct with exactly one = b × flagPx; fit rank and rack row each exactly 1/3 per table; longest-bar inversion share 40–60 % per build table (re-computes 52 % / 47 %); untie rounds: un-untied copies never produce a count equal to b (b not a multiple of givenA) and untied counters start at givenA/b; no b twice running across 1,000 reshuffles; the kite's idle motion is identical for every flag count (no early verdict).
- **Mutations (one per rule):** slack 1 → slack rule; fit gauge always in row 3 → row balance; a (b+1)-flag gauge marked fit → one-fit rule; kite idle motion depends on |flags − target| → no-early-verdict rule; counter shows flags/target → counter oracle; untie makes givenA+1 parts → untie rule; un-untied copies step by 1 → copy rule; same b twice → order rule; overhang not drawn → local-test reads `.ps-flag.over` count = flags − target.
- **Local test:** real pointer drags on the grip at 320·360·412·704·768·1024·1366, every round, both directions; untie taps; keyboard path; the whole miss ladder.
- **Pictures:** `toys/kite` (red and yellow — never "a yellow kite"), the 12 birds (seen on `contact/birds-2.png`); crop each to its ink box (`art-extents.json`). **Risks:** flags under 22 px at 360 when b = 8 — knots and the miss-2 numeral strip carry it. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a rippling tail you tie flags onto, a kite that loops when you get it right, and a new bird every round.
2. **Would a teacher put it on the board?** Yes — "this flag is one of three, so the tail needs three" is the 3.NF.A.1 sentence; the gauge gives honest proof, flag length never gives the answer, and the untie rounds make "2/5 is two of the fifths" physical.
3. **Would a parent trust it?** Calm, library kite and birds, no words on the apparatus, no score.
4. **The invention:** a kite tail whose every flag is a copy of the given fraction, judged by a gauge only one whole tail fits — and a non-unit flag that must be untied before its copies can ever land on one whole.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 1→5 · reality 4→5
What changed:
- The spyglass (pull out one tube per piece, only in focus at the exact count) is Row 46 The Telescope's invention — replaced by the kite tail: copies tied on one object, a gauge as the verdict, no early hint.
- The level-3 (refPart) rounds now carry the real G3-321 challenge: the 2/5 or 3/4 flag arrives seamless; copying it as one piece makes the counter jump over one whole (2/5 → 4/5 → 6/5), and untying it into its top-number of equal flags is the fix — the dossier's "split only into as many parts as the numerator", without a knife (fraction-kitchen's interaction).
- Layout corrected to stacked: a split column at 704 is ~350 px, the tail needs 620.
- Re-measured with my own script: longest-bar inversion 52 % / 47 % (not 41 %); slack, gauge ranks/rows and track fit verified; every distractor gauge is a meaningful wrong count.
- Locale traps rewritten for the new object (pt-BR "rabiola", es-MX "papalote", de "Drachen" = dragon ruling).
