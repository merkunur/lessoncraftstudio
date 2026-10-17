# Row 194 — The Halfway Harbors → THE RIPPLE RACE (3.NBT.A.1)

## 0. Identity
- id `halfway-harbors.nearest.3-nbt-a-1` (kept; slugs, titles and intros frozen en…nl; sv/da/no/fi metadata new at build) · grade 3 · CCSS 3.NBT.A.1 · strand Number & Operations in Base Ten · files: own new `halfway-harbors-core.js` (rewritten) + `halfway-harbors-activity.js`, html, manifest row (0 lines to shared engines).
- worksheets it covers: **G2-221** Round It! (circle the ten the dot is closer to) · **G2-346** Rounding to the Nearest 10 (5-or-more rule, write it) · **G3-323** Round to the Hundred · **G3-387** Rounding Up or Down? (sort — the "tide" rounds) · **G3-388** Rounding to the Nearest 100 · **G3-390** Which Numbers Round to 50? (the "catch" rounds) · **G3-391** Rounding to the Nearest 10 and 100 (the "both" rounds) · **G3-389** Round, then Estimate the Sum (the "convoy" rounds).
- what the old activity did: a boat at its true spot on a number line, a coral halfway buoy, tap the nearest harbor (or tap the halfway buoy among three markers). **Kept:** Marina the lighthouse-cat, the harbors, the boat on a to-scale line, the halfway buoy, the tap-a-harbor answer, and every round value (63, 47, 24, 75, 247, 360, 480; halfway 40–50, 70–80, 200–300). **Fixed:** round 75 asked "Which harbor is the boat closest to?" while 75 is exactly as close to 70 as to 80 — two right answers by the wording; the new apparatus makes the tie visible (two bells ring at once) and gives it its rule (the buoy's pennant).

## 1. The pitch
"Drop the boat's anchor and a ripple spreads out across the water at the same speed both ways — the harbor whose bell it rings FIRST is the nearest one, the one you round to; a boat exactly halfway rings both bells in the same instant, and the buoy's pennant sends it on to the bigger harbor."

## 2. Why a child will want it again (the fun)
- **The ripple race.** At Check the anchor drops with a *plop* and a ring of ripples spreads out from the boat, left and right at one steady speed, the number-line ticks flashing one by one as the wave passes them. Every harbor has a little bell on its bollard; the first bell the wave touches *dings* and the boat sails to it. Children watch the two wavefronts like a race — and they called the winner before the anchor dropped.
- **The dead heat.** On a halfway boat both bells ring in the *same* instant (one chord, two bells) — then the buoy's pennant flutters and a puff of wind pushes the boat to the bigger harbor. It is the one moment the race needs a referee, and the referee is always the same.
- **Two ripples meeting.** In halfway rounds both harbors drop a pebble at once and their ripples run towards each other; they meet exactly at the halfway point. If the child's buoy is there, it gets splashed from both sides and bobs with a *boing*.
- **Fog.** In the foggy setting the line is hidden in a rolling bank of fog; the child decides from the digits alone, then the fog blows away and the ripple runs — a reveal every round.
- **The catch.** In catch and tide rounds eight boats drop anchor together: eight ripples, a cascade of bells, the right boats all scooting into one harbor at once.
- **The earned moment:** the docked boat's lantern lights, Marina's lighthouse beam sweeps once across the line (a drawn wedge of light), and the harbor sign glows.

## 3. The skill and the misconception
- **Skill (3.NBT.A.1 and the eight worksheets):** round a whole number to the nearest 10 or 100 — by where it sits on the number line (nearer harbor), by the halfway point, and by the digit rule (ones digit 5–9 rounds up, 0–4 down; the tens digit for hundreds); round up or down; find all numbers that round to a given ten or hundred; round the same number to 10 and to 100; round two addends and add the rounded numbers to estimate.
- **Misconception 1 — rounding to the ten "in the number"** (63 → 70 because "it's in the sixties going up", or always dropping the ones). *Push-back:* the child chooses before the anchor drops; the ripple travels both ways at one speed and visibly rings the other bell first, while the chosen harbor is still a coral stretch away.
- **Misconception 2 — halfway numbers** (75, 650): children say "either" or round down. *Push-back:* both bells ring in the same instant — the tie is SEEN — and the buoy's pennant, the same on every buoy, always sends the boat on to the bigger harbor: the convention is a standing sign, not a hidden chant.
- **Misconception 3 — rounding to 100 by the ones digit** (247 → 300 because 7 ≥ 5). *Push-back:* on the hundred line the ripple has to travel 47 to reach 200 and 53 to reach 300; the 200 bell rings first.
- **Misconception 4 — "the numbers that round to 50 are 45 to 55".** *Push-back:* in the catch round the 55 boat's ripple rings 50 and 60 together, and its pennant sends it to 60.
- **Misconception 5 — estimating by rounding only one number, or adding the exact numbers.** *Push-back:* convoy rounds need both harbors chosen before the estimate box unlocks; the success line puts the exact sum next to the estimate.

## 4. The stage
Layout `split` at ≥ 700 px; stacked below.

**At 704 — left 470 px (the water), right 202 px (Marina's column):**
- **The water and the line (left, 470 × 300):** a calm blue band; along its lower third the number line (4 px ink) with a tick every 1 unit (tens line, 30 units shown → 14.7 px/unit) or every 10 units (hundreds line, 300 units shown → ticks every 10 = 14.7 px). Numerals every 5 (tens) / every 50 (hundreds) in 16 px; harbor numerals 24 px bold.
- **Harbors:** 4 per line at the window's round numbers (5 in convoy round 12) — each a drawn pier (a short plank jetty, geometry) with a numeral sign and a bollard carrying a small bell (bollard 12 px, bell 16 px; geometry). The harbor sign is the tap target (88 × 56 hit area).
- **The halfway buoy:** a coral buoy (24 px) at each gap's midpoint with a tiny pennant pointing **right** (toward the bigger number) — always drawn: the standing tie rule.
- **The boat:** the library **beach/sailboat** at 104 px wide, sitting on the water above its exact spot; a thin anchor-chain line drops from its keel to the tick so the position is exact; the boat's number on a white sail-tag (Baloo 2, 30 px). The sailboat is never mirrored.
- **The ripple** (at Check only): two wavefront arcs (3 px white, a soft blue trail) leaving the boat's tick left and right at 3 units per 100 ms on the tens line (3 tens-ticks per 100 ms on the hundreds line) — a 5-unit trip takes ≈ 170 ms, so the race is quick but watchable; each tick flashes as a front crosses it.
- **Marina's column (right):** the library **pets/cat** at 96 px beside the library **beach/lighthouse** at 96 px tall (Marina the lighthouse-cat), and beneath them the bubble area and the shell's Check/Next. In convoy rounds the estimate box + keypad sit here.
- **The fog (foggy setting):** a soft white band (opacity 0.92, drifting texture) covering the line, the ticks and the harbors' positions. Above the fog only the boat's sail-tag number and **two harbor signs** (the two round numbers around the boat; smaller on the left, bigger on the right, always — reading order of numbers) float as 88 × 56 cards.
- **Task line** above the water, ≤ 2 lines, 22 px.

**At 360 — stacked:** task line · Marina's strip (cat 64 px + lighthouse 64 px, left; bubble right) · the water full width 330 × 220 (tens: 11 px/unit; hundreds ticks every 10 at 11 px; numerals every 5 / every 50) with the boat at 72 px wide (the chain keeps its exact position); harbor signs 64 × 44 visual with 48 px hit areas · Check (≈ y 560) · in convoy rounds the keypad opens as a sheet when the estimate box is tapped. Check above the fold at 360 × 740 and 320 × 640.

No words on the apparatus: numerals, the pennant arrow, bells, ripples and ticks only.

**Task lines (EN):**
- one boat, ten: "Which harbor is nearest? Tap it, then drop the anchor with Check."
- one boat, hundred: "Which hundred harbor is nearest? Tap it, then drop the anchor with Check."
- halfway: "Put the buoy where the ripples from {a} and {b} will meet."
- catch: "Which boats will sail to harbor {h}? Tap all of them."
- tide (sort): "Which boats will sail UP to {hi}? Tap all of them."
- both: "Tap the nearest ten on the top line and the nearest hundred on the bottom line."
- convoy: "Tap the nearest ten for each boat. Then add the two harbors."

## 5. The hand
- **Choose a harbor (one-boat, both, convoy rounds):** tap a harbor sign (≤ 100 ms: the sign lifts 4 px, teal outline, a dashed course line runs from the boat's bow to it, soft *tock*). Tapping another harbor moves the choice. In fog the two floating signs are the choices.
- **Drop the anchor = Check.** The ripple runs (above). It is never available before Check — the child commits first, the water judges.
- **Place the buoy (halfway rounds):** a drag handle on the buoy (44 px) slides along the gap, snapping to ticks; the tick numeral under it shows (16 px). It starts at a random tick in the gap, never the middle, never the same tick twice running.
- **Catch / tide rounds:** 8 boat tokens float at their true positions — drawn hull tokens (geometry, 44 × 44 with the number on the hull; staggered on three heights with chain lines to the exact ticks so close numbers never overlap). A tap toggles a token's teal flag ("this one sails there").
- **Convoy rounds:** two boats (two sailboat pictures, 104 px / 72 px, on two heights) with a harbor choice each; after both are chosen the estimate box unlocks; tap → keypad → digits.
- **Keyboard:** Tab → harbor signs (←/→, Enter chooses) → buoy (←/→ one tick) → tokens (Space toggles) → estimate box → Check.
- **Free play:** after success, the child may tap any spot on the water to drop a pebble there and watch its ripple ring the nearest bell (a ripple toy; no grading).

## 6. The rounds
Pools by Setting 1; Setting 2 (fog) re-uses the same rounds (halfway, catch and tide rounds always clear). Computed in `work-39/harbor.js` and re-solved by the critic in `work-c39/harbor.js` (round-half-up, the school rule in all 11 locales for whole numbers).

**Pool "nearest ten" (12 rounds):**

| # | kind | values | line window (harbors) | right answer | position in the window |
|---|---|---|---|---|---|
| 1 | halfway | 40 and 50 | 30 · 40 · 50 · 60 | buoy at 45 | middle of its gap |
| 2 | halfway | 70 and 80 | 60 · 70 · 80 · 90 | buoy at 75 | middle |
| 3 | one boat | 63 | 50 · 60 · 70 · 80 | 60 (down; 3 vs 7) | harbor 2 of 4 |
| 4 | one boat | 47 | 20 · 30 · 40 · 50 | 50 (up; 3 vs 7) | harbor 4 |
| 5 | one boat | 24 | 20 · 30 · 40 · 50 | 20 (down; 4 vs 6) | harbor 1 |
| 6 | one boat (tie) | 75 | 60 · 70 · 80 · 90 | 80 (up, by the pennant; 5 vs 5) | harbor 3 |
| 7 | one boat | 128 | 110 · 120 · 130 · 140 | 130 (up; 2 vs 8) | harbor 3 |
| 8 | one boat | 351 | 340 · 350 · 360 · 370 | 350 (down; 1 vs 9) | harbor 2 |
| 9 | catch | boats 43, 45, 48, 52, 54, 55, 57, 61 | 40 · 50 · 60 · 70 | 45, 48, 52, 54 | 4 of 8, two each side of 50 |
| 10 | tide | boats 31, 32, 33, 34, 35, 36, 38, 39 | 30 · 40 | up to 40: 35, 36, 38, 39 | 4 of 8 |
| 11 | convoy | 38 + 46 | 30 · 40 · 50 · 60 | 40 + 50 = 90 (exact 84) | — |
| 12 | convoy | 23 + 59 | 20 · 30 · 40 · 50 · 60 | 20 + 60 = 80 (exact 82) | — |

**Pool "nearest hundred" (12 rounds):**

| # | kind | values | window | right answer | position |
|---|---|---|---|---|---|
| 1 | halfway | 200 and 300 | 100 · 200 · 300 · 400 | buoy at 250 | middle |
| 2 | halfway | 600 and 700 | 500 · 600 · 700 · 800 | buoy at 650 | middle |
| 3 | one boat | 247 | 200 · 300 · 400 · 500 | 200 (down; 47 vs 53) | harbor 1 |
| 4 | one boat | 360 | 100 · 200 · 300 · 400 | 400 (up; 60 vs 40) | harbor 4 |
| 5 | one boat | 480 | 300 · 400 · 500 · 600 | 500 (up; 80 vs 20) | harbor 3 |
| 6 | one boat (tie) | 650 | 500 · 600 · 700 · 800 | 700 (up, by the pennant) | harbor 3 |
| 7 | one boat | 712 | 600 · 700 · 800 · 900 | 700 (down; 12 vs 88) | harbor 2 |
| 8 | one boat | 839 | 700 · 800 · 900 · 1000 | 800 (down; 39 vs 61) | harbor 2 |
| 9 | catch | boats 438, 450, 462, 499, 507, 549, 550, 571 | 400 · 500 · 600 | 450, 462, 499, 507, 549 | 5 of 8 |
| 10 | tide | boats 205, 210, 233, 249, 250, 268, 275, 291 | 200 · 300 | up to 300: 250, 268, 275, 291 | 4 of 8 |
| 11 | both | 365 | ten line 340–390 on top, hundred line 200–500 below | 370 and 400 | — |
| 12 | both | 842 | ten line 820–870 on top, hundred line 700–1000 below | 840 and 800 | — |

(The "both" rounds draw two lines stacked: the zoomed ten line on top and the hundred line below, joined by two dashed guide lines showing which stretch is zoomed — the same boat number on both; at Check two ripples run, one per line. 365 goes up both times, 842 goes down both times, and the two answers on a line are never the same number.)

**Answer position (measured, `work-c39/harbor.js`).**
- One-boat rounds: the right harbor's slot in the 4-harbor window — tens 1·2·2·1 (slots 1–4), hundreds 1·2·2·1; the boat's position across the window ranges 0.13 → 0.90 (tens) and 0.16 → 0.87 (hundreds), so "the harbor nearest the middle of the screen" is not a strategy. Up/down: 3 up (incl. the tie) / 3 down in each pool — an always-up or always-down guess wins half; "the ten in the number" (truncate) wins 3/6; in fog (two signs, smaller always left) the right answer is the left sign in 3 of 6 rounds per pool.
- Catch rounds: the right boats are 4 of 8 (tens) / 5 of 8 (hundreds), on both sides of the harbor; decoys include the two tie traps (55, 550 — the "45 to 55" over-reach) and the near misses 43/57 and 438/571. A "same tens digit" bot (only 5_ / 4__) fails.
- Tide rounds: all eight boats lie between the two harbors; the right boats are the upper four, including the tie (35, 250) — a "flag only the ones past the buoy" bot that leaves the buoy boat out fails.
- Halfway rounds: the buoy belongs in the middle by definition; the drag start is randomised (never the middle).
- Convoy: typed.

**Order:** order-only reshuffle per pass, except each pool's two halfway rounds always open pass 1 (they establish what "meeting in the middle" is); from pass 2 they shuffle in.

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: "Tap a harbor first." (halfway: "Slide the buoy first." · catch/tide: "Tap the boats that will sail there." · convoy: "Tap a harbor for each boat first.")
- **Miss 1 — the ripple runs and freezes:**
  - wrong harbor: the ripple runs and FREEZES the instant it rings the first bell (that bell glows); the stretch from the frozen front to the chosen harbor is a coral dotted span with its length printed on it ("4" on the tens line, "40" on the hundreds line). In fog the fog clears first. Hint: "The ripple rang {near} first. {chosen} is {more} farther away."
  - tie, smaller harbor chosen: both bells ring in the same instant, then the pennant flutters and the boat is blown to the bigger harbor. Hint: "{n} is exactly halfway — both bells rang at once. A boat at the buoy always follows the pennant to the bigger harbor."
  - halfway buoy off the middle: the two harbor ripples run and meet at the true midpoint; the child's buoy is splashed by only one of them, and the gap between the buoy and the meeting point is shaded coral. Hint: "The ripples from {a} and {b} met here. Move the buoy to where they meet."
  - catch/tide: every boat drops anchor; boats sail to their first bell; flagged boats that sailed elsewhere and unflagged boats that came in get a coral ring. Hint: "Look where each boat sailed — and at the boat right at a buoy."
  - convoy: wrong harbor(s) first as above; harbors right but the sum wrong → the two harbor numbers slide together onto a sum strip as two bars (lengths to scale) with their numerals. Hint: "Add the two harbors: {a} + {b}."
- **Miss 2 — the digit rule appears on the apparatus:** under the boat's sail-tag, the ones digit (tens rounds) or tens digit (hundreds rounds) lights coral, and a small **knot dial** appears: ten knots 0–9 on a short rope, knots 0–4 tinted toward the smaller harbor and 5–9 toward the bigger, the boat's digit knot glowing. Hint: "Look at the {place} digit: {d}. 0, 1, 2, 3, 4 stay with {lo}. 5, 6, 7, 8, 9 go to {hi}." (catch/tide: each boat token shows its knot dial; convoy: both boats do; halfway: tick numbers appear every 1 / every 10.)
- A new move (another harbor, buoy drag, token toggle, typing) takes the help away until the next Check.
- **Success** → the bell rings, the boat sails in and bobs, the harbor's lantern lights, Marina's lighthouse beam sweeps the line once. Bubble:
  - one boat: "{n} rounds to {h}. Its ripple reached {h} first — only {d} away."
  - tie: "{n} is exactly halfway, so it rounds up to {h}."
  - halfway: "Yes! {m} is halfway between {a} and {b}."
  - catch: "Harbor {h} gets {list}. {tie} is halfway, so it goes to {next}."
  - tide: "{list} round up to {hi}. {tie} is halfway, so it goes up too."
  - both: "{n} rounds to {t} (nearest ten) and to {u} (nearest hundred)."
  - convoy: "{a} + {b} is about {ra} + {rb} = {est}. The exact answer, {exact}, is close to {est}."

## 8. Settings
1. **Round to: the nearest ten · the nearest hundred.** Visible at rest: the line's scale, harbor spacing and numerals change.
2. **The line: clear · foggy.** Visible at rest: the fog bank covers the line; two harbor signs float above it.

## 9. Words (EN source)
- title (shell): "The Halfway Harbors" · instruction: "Drop the anchor: the ripple rings the nearest harbor's bell first."
- prompts: seven task lines (§4) · hints: §7 (empty ×4, miss 1 ×5, miss 2 ×1) · celebrations: seven (§7) · settings: "Round to", "the nearest ten", "the nearest hundred", "The line", "clear", "foggy".
- aria: harbor "Harbor {h}" · boat "Boat at {n}" · buoy "Buoy at {m}" · token "Boat {n}, {flag up|flag down}" · ripple result (aria-live) "The ripple reached {h} first."
- **Locale traps:** "nearest ten/hundred" — de *auf Zehner/Hunderter runden*, fr *arrondir à la dizaine/centaine*, es *redondear a la decena/centena*, it *arrotondare alla decina/al centinaio*, pt *arredondar para a dezena/centena*, nl *afronden op tientallen/honderdtallen*, sv *avrunda till närmaste tiotal/hundratal*, da *afrunde til nærmeste tier/hundrede*, no *runde av til nærmeste tier/hundre*, fi *pyöristää lähimpään kymmeneen/sataan*; the existing de/fr/es/pt/it/nl strings are the base (fr "arrondis à la dizaine" stays). **Round-half-up** is the school convention for whole numbers in all 11 locales (the pennant shows it). Numbers: no thousands separator is ever needed (max 1000 — written "1000", never "1,000"/"1.000"/"1 000"). "about" in the convoy line: de *ungefähr*, fr *environ*, es *aproximadamente / más o menos*, it *circa*, pt *aproximadamente*, nl *ongeveer*, sv *ungefär*, da *cirka/omtrent*, no *omtrent/cirka*, fi *noin*. The ≈ sign is not used. "{list}" joins with the locale's "and" (`Intl.ListFormat`). "{more} farther" is authored per locale with the numeral (fi "{more} kauempana").

## 10. Sound off, access, phones
- Legible with the sound off: the ripple fronts, the flashing ticks, the glowing first bell, the frozen coral span with its number, the pennant and the knot dial carry all meaning; the bells' *ding* doubles the glow. TTS reads prompts and bubbles (bonus).
- Keyboard path in §5; aria-live on the bubble and the ripple result.
- Taps: harbor signs 88 × 56 (64 × 44 visual, 48 px hit on phones), buoy 44, tokens 44, fog signs 88 × 56, keypad keys ≥ 48, Check 48.
- Pictures: sailboat 104 px (704) / 72 px (360); cat and lighthouse 96 px / 64 px. Catch/tide boats are drawn tokens (the record rule — eight sailboat pictures would fall below the floor).
- Check above the fold at 360 × 740 and 320 × 640.

## 11. Distinct from
- **New 294 The Elastic Flags** (batch 41): a flag on an elastic that stretches only half way to a ten, with a halfway hook — a fixed-length tether. The Ripple Race has no tether and no fixed length: two wavefronts race outward and *time* decides (the first bell rung), and the tie is a dead heat heard as one chord. (The first draft of this row used a half-gap rope — the same invention as 294 — and was replaced by the critic.)
- **Premium `rounding-hill`** (a stone rolls downhill into the nearer ten; on 45 it balances on the ridge) and **`landing-strip`** (place a number on a strip near its post): no slope, no placing; the child chooses and a wave tests the choice.
- **Row 141 Hopper's Lily Hops / New 269 Tick Comb:** counting on/back on lines, not rounding.
- Registry: no built or designed invention decides "nearest" by a wave reaching it first.

## 12. Build plan
- **Core (`HalfwayHarborsCore`, rewritten pure):** `roundHalfUp(n,p)` · `neighbours(n,p)` → {lo, hi} · `distances(n,p)` → {toLo, toHi} · `isTie(n,p)` · `harborFor(n,p)` (tie → hi) · `rippleTimeline(n, window, p)` → ordered bell events [{h, t}] (simultaneous events for ties) · `catchSet(h, boats, p)` · `tideSet(lo, hi, boats, p)` · `halfway(a,b)` · `gradeOne/gradeCatch/gradeTide/gradeHalfway/gradeBoth/gradeConvoy` · `knotDial(n,p)` → {digit, side}.
- **Gate (`verify-halfway-harbors-core.js`, own oracle):** recompute every right answer from the value alone (integer arithmetic, never floats); assert every one-boat round has exactly one right harbor (ties resolved by the pennant rule and marked tie); assert the window contains both neighbours; assert the first event of `rippleTimeline` is the right harbor except in ties (two events at the same t, the hi one chosen); assert the frozen-span number printed in miss 1 = |n − chosen| − |n − near|; assert catch/tide sets as listed; assert each "both" round's two answers; assert convoy estimates = sum of rounded addends and the exact sum differs by < the place value; assert slot and up/down tallies of §6; assert every EN string number equals the model; assert no thousands separator appears in any rendered numeral.
- **Mutations:** round-half-down on ties · ripple speed different left and right · tie resolved to the smaller harbor · catch includes the upper tie (55) · tide excludes the tie (35) · knot dial reads the ones digit for hundreds · "both" swaps the ten and hundred answers · convoy adds the exact numbers · fog shows the bigger sign on the left · halfway grade accepts ±1 · halfway rounds not first in pass 1 · the ripple runs before Check.
- **Local test:** real taps on every harbor in every one-boat round (only the right one passes), buoy drags, token taps, keypad, 7 widths, both settings, 11 locales; frame-sample the ripple to assert both fronts are equidistant from the boat at every frame.
- **Pictures:** beach/sailboat, pets/cat, beach/lighthouse (seen on the beach and pets contact sheets, in their JSONs). **Risks:** the hundreds line is dense at 360 (ticks every 10 at 11 px) — numerals every 50 only; tokens staggered. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — calling the winner of a ripple race, the dead-heat chord, the fog reveal, eight bells in a catch round.
2. **Teacher on the board?** Yes — "nearest" becomes "reached first by a wave that travels equally both ways", the halfway convention is a visible pennant, and the digit rule arrives as the knot dial — three representations of one idea, with the old two-right-answers defect gone.
3. **Parent trust?** Calm, library pictures only, no words on the apparatus, nothing scored.
4. **The invention:** drop the anchor and a ripple races out both ways at one speed — the first bell it rings is the harbor you round to, and a halfway boat rings two at once.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 2→5 · reality 5→5
What changed:
- **Invention replaced.** The half-gap rope was the same invention as New 294's half-length elastic + halfway hook (batch 41) — and §11 had misdescribed 294. New invention: the ripple race (a wave expands both ways at one speed; the first bell it rings is the nearest harbor; a tie is two bells at once + the pennant). Distinct from 294, rounding-hill and landing-strip.
- **The answer is no longer free before Check.** The rope stopped growing at half a gap while the child aimed, so dragging toward each harbor revealed the answer with no thought. Now the child taps a harbor and only Check runs the ripple.
- **G3-387 (up or down? sort) has its own round kind** (tide, one per pool: 31–39 → up to 40; 205–291 → up to 300, ties included). Each pool is now 12 rounds.
- Every round re-solved (`work-c39/harbor.js`): answers, slots 1·2·2·1, up/down 3/3, catch and tide sets, convoy estimates, "both" pairs; the "both" stack now puts the ten line on top to match its task line.
- Strings rewritten for the new mechanic; aria adds the ripple result; mutations add "ripple runs before Check" and asymmetric ripple speed.
