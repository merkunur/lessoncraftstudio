# Row 86 — Lily's Ten Stones → THE SUNKEN STONES (1.OA.C.6)

## 0. Identity
- id `ten-stones.add-sub-within-20.1-oa-c-6` (KEPT; slugs/metadata frozen en..sv; da/no/fi slug, title and intro are new at build, grade 1) · grade 1 · CCSS 1.OA.C.6 · Operations & Algebraic Thinking · own files `sunken-stones-core.js`, `sunken-stones-activity.js`, `sunken-stones-activity.html`, `sunken-stones-activities.json` (the row leaves `ten-stones-activities.json`, emptied to `[]`; the id is unchanged).
- page title (frozen): "Lily's Ten Stones — Make a Ten to Add & Subtract". Page intro (frozen) stays true: Lily the frog crosses the pond on a number line; to add or subtract past ten she first hops to the golden Ten Stone, then the rest; the child builds the make-a-ten part (8 + 2 makes 10, then 10 + 4 is 14).
- worksheets covered: **K-275** Number Bonds to 20 (bank rounds: from k to the bank at 20) · **K-267** Subtraction Color by Code · **K-268** Add and Subtract Coloring · **K-269** Color by Code: Sums to 20 (fluent add/subtract within 20 — every round is one such fact) · **G1-208** Mental Math to 20 · **G1-214** Mental Math to 10 (the no-crossing rounds) · **G1-216** Addition Practice to 20 · **G1-217** Subtraction Practice to 20 · **G1-428** Subtraction Maze within 20.
- old activity: 11 rounds (make ten, "will Lily rest on the Ten Stone?", decompose back to ten, "which number to stand on", doubles, a forward/back relation round); prompts in 8 locales; typed the make-a-ten part into "8 + ⬚ = 10". **Kept:** Lily, the golden Ten Stone, the pond as a number line 0–20, every make-ten / decompose / no-crossing / anchor / relation round (10 of 11), the idea that the child builds the make-a-ten part. **Dropped:** the doubles round (7 + 8 via 7 + 7 + 1 is a different strategy, not making ten). **Changed:** the make-a-ten part is no longer typed into a box — it is the length of Lily's first leap, enforced by the water. **Added:** more rounds, two bank-to-20 rounds, an Adding level.

## 1. The pitch
"The stones past ten are under water until Lily stands on the golden Ten Stone — so every leap past ten has to stop at ten first, and the rest of the leap is whatever is left on her bead rope."

## 2. Why a child will want it again (the fun)
- **A slingshot frog.** The child pulls Lily back like a catapult — a spring stretches behind her, beads slide onto it one stone at a time — and lets go: she sails in a high arc and lands with a splat-hop on her stone. Pulling and letting go never gets old.
- **The pond pushes back.** Pull too far and Lily lands where the stones are still under water: a splash ring, a bubble, and she bobs up and paddles back to her stone (no shame, just a frog getting wet). Land on the Ten Stone and the magic happens: the drowned stones on the far side rise out of the water one after another with a bubbling cascade.
- **The rope runs out exactly.** The number to add hangs above the pond as a rope of beads. Every leap uses beads; when the rope is empty, Lily is exactly where the sum is.
- **Free play ("Pond play"):** a pond with no task: pull any leap, raise and sink the stones by visiting ten, try leaping from 0 to 20 in as few leaps as you like.

## 3. The skill and the misconception
- **Skill (1.OA.C.6):** add and subtract within 20 fluently using strategies — make ten (8 + 6 = 8 + 2 + 4 = 14), decompose to ten (13 − 4 = 13 − 3 − 1 = 9), the relation between addition and subtraction (8 + 6 = 14, so 14 − 6 = 8), choosing the easier start (3 + 8 → start on 8); plus the number bonds to 20 of K-275.
- **Misconception 1 — leaping (counting on) past ten as one unstructured count:** **Push back:** the water. Any leap that would cross ten lands in the water (the far stones are sunk) — Lily splashes and swims back. The only way across is to stop on ten, which forces the decomposition 6 = 2 + 4.
- **Misconception 2 — losing track of the rest ("8 + 6: 2 to ten, then 6 more"):** **Push back:** the rope. The 6 is six beads; the first leap took 2 of them off the rope, and only 4 are left — Lily cannot pull more than the rope holds, so the rest is physically 4.
- **Misconception 3 — the answer is where you started or the number you added:** **Push back:** Lily ends on an unlabelled stone between the labelled 10 and 15 — the child reads it from the structure (ten and four), and the typed answer is checked against her stone.
- **Misconception 4 — starting on the first number even when it is the small one (3 + 8):** **Push back:** both start stones work, but from 3 the rope of 8 needs a 7-leap to ten; from 8 the rope of 3 needs a 2-leap — the bead counts make the easier start visible.

## 4. The stage
Stacked layout at all widths (the pond is wide).

**At 704 px (content 672):**
- **Task line** 22 px: "Pull Lily back and let go. Stop on the Ten Stone first!"
- **Equation strip** (32 px Baloo 2) above the pond: "8 + 6 = □"; it writes Lily's leaps as she makes them: "8 + 2 = 10" → "10 + 4 = □".
- **The bead rope** above the pond (right of the equation): a teal cord with the number's beads (22 px beads, coral for adding, teal for taking away) — the rope's length shows the amount; no numeral on the rope.
- **The pond:** a band 660 × 200 px, water blue (#BFE3EC → #9FD3E0) with soft ripples. Along it, 21 stones 0–20 on a straight line at 31 px pitch (stones 28 px ovals, warm grey #CFC6B8, 2 px ink outline). The Ten Stone is gold (#E8A53A, 34 px) with a soft shine. Stone labels (18 px) only under 0, 5, 10, 15 and 20 ("Every 5" setting); other stones blank. **Sunken stones:** the stones on the far side of ten from Lily are drawn under the water — 40 % opacity, blue-tinted, with ripple lines over them and no outline — and rise to full colour when Lily stands on ten.
- **Lily:** the library frog (pets/frog — side view; the PICTURE-RULINGS file and the pets contact sheet disagree on which way it faces, so the build measures its facing on the render once and mirrors it so Lily always faces the way she will leap), 96 × 96 px, standing above her stone (her feet 6 px above the stone's top).
- **The spring:** while pulling, a teal coil grows from Lily's back toward the finger; beads slide off the rope onto the coil, one per stone-width (31 px) of pull; the coil cannot take more beads than the rope holds (bank rounds: up to 10).
- **The far bank** (bank rounds only): a reed-green strip at 20.
- **Keypad** (digits 1–9, 0; 0 dimmed first; keys 52 × 52) + backspace, under the pond; **bubble** beside; **Check**.

**At 360 px (content 336):** task line 20 px (2 lines) → equation 24 px → rope (beads 16 px) → pond 336 × 160 showing a WINDOW of the line: from (smallest stone the round can reach − 1) to (biggest + 1), at most 13 stones at 26 px pitch (stones 22 px; labels 14 px on every multiple of 5 in view, plus the window's first stone) — the window slides (300 ms) if Lily leaves it; Lily 72 px → keypad 2 rows of 5 (60 × 46) + backspace → Check. Check bottom ≈ 670 px at 360 × 740; at 320 × 640 Lily 64 px, stones 20 px at 24 px pitch, Check ≈ 604 px.

**Pictures (verified):** pets/frog (side view; seen on the pets contact sheet 2026-10-17 — the forest-creatures frog and spring frog face the viewer, so they are not used). Nothing else is a picture: stones, water, rope, spring and bank are drawn apparatus.
**Words on the apparatus:** none; only stone numerals.

## 5. The hand
- **Pull Lily:** press on Lily (hit area 96 × 120) and drag AWAY from the way she must go (left to leap right; Lily turns to face the way she will leap the moment the drag starts). Within 30 ms the coil appears; every 31 px of drag (26 px at 360) one bead slides from the rope to the coil with a tick (pitch rising per bead). Dragging back toward Lily returns beads. The coil stops growing when the rope is empty.
- **Let go:** Lily leaps that many stones in an arc (300 ms + 40 ms per stone), lands with a soft splat-hop. The leap is written into the equation strip.
  - **landing on a sunken stone** (the leap crossed ten): she plunges with a splash ring (200 ms), bobs up, paddles back to the stone she left (600 ms); the beads fly back to the rope; nothing is written.
  - **landing on the Ten Stone:** a gold ring pulse, and the far stones rise one by one (40 ms apart) with bubbles.
  - Lily never leaps beyond the end of the rope's beads (so she cannot overshoot the sum on the far side): when the rope is empty she sits on the sum's stone.
- **Turn back:** if the child pulls toward the far side again after a leap, nothing happens until the rope is empty; leaps go only one way per round (no backtracking — a frog crossing a pond).
- **Undo:** the "↶" chip sends Lily back one leap and returns those beads to the rope.
- **Choosing a start (anchor rounds):** Lily waits on a lily pad drawn below the line; the two start stones shimmer; tap one → she leaps onto it; the rope then holds the OTHER number.
- **Keypad:** after the rope is empty the answer box glows; digits type the stone Lily stands on.
- **Free play "Pond play":** a full rope of 20 beads, free pulls both ways, stones sink and rise as Lily crosses ten; no Check.

## 6. The rounds
One round = one fact: (choose a start) → leaps until the rope is empty → type where Lily is → Check.

**Level "Adding and taking away" (default) — 16 rounds** (kept from the old activity: rounds 1, 2, 3, 4, 5, 6, 8, 9, 11; the old rounds' ids in brackets):

| # | kind | fact | start | rope | leaps (forced by the water) | answer |
|---|---|---|---|---|---|---|
| 1 | make ten [maketen-8-6] | 8 + 6 | 8 | 6 | 2, 4 | 14 |
| 2 | make ten [maketen-7-5] | 7 + 5 | 7 | 5 | 3, 2 | 12 |
| 3 | no crossing [findten-6-3] | 6 + 3 | 6 | 3 | 3 (any split) | 9 |
| 4 | make ten [maketen-9-4] | 9 + 4 | 9 | 4 | 1, 3 | 13 |
| 5 | choose start [anchor-3-8] | 3 + 8 | 3 or 8 | the other | from 8: 2, 1 · from 3: 7, 1 | 11 |
| 6 | choose start [anchor-9-2] | 9 + 2 | 9 or 2 | the other | from 9: 1, 1 · from 2: 8, 1 | 11 |
| 7 | make ten (new) | 6 + 7 | 6 | 7 | 4, 3 | 13 |
| 8 | back to ten [decompose-13-4] | 13 − 4 | 13 | 4 | 3, 1 | 9 |
| 9 | back to ten [decompose-15-7] | 15 − 7 | 15 | 7 | 5, 2 | 8 |
| 10 | back to ten (new) | 12 − 5 | 12 | 5 | 2, 3 | 7 |
| 11 | there and back [relation-8-6] | 14 − 6 | 14 | 6 | 4, 2 | 8 |
| 12 | no crossing (new) | 16 − 4 | 16 | 4 | 4 (any split) | 12 |
| 13 | back to ten (new) | 11 − 4 | 11 | 4 | 1, 3 | 7 |
| 14 | to the bank (new, K-275) | 14 + □ = 20 | 14 | empty rope (free pulls ≤ 10) | 6 to the bank | 6 |
| 15 | to the bank (new, K-275) | 15 + □ = 20 | 15 | empty rope | 5 to the bank | 5 |
| 16 | to the bank (new, K-275) | 5 + □ = 20 | 5 | empty rope | 5 to the Ten Stone, then 10 to the bank | 15 |

(Bank round: there is no rope to empty; Lily must land exactly on the bank stone 20 — a short leap leaves her on the near side, an over-long leap lands in the reeds past 20 and she paddles back; then the child types how far she leapt in total, "14 + □ = 20". A second bank round in the Adding level: "7 + □ = 20": she must stop on ten first (3), then leap 10 → answer 13.)

**Level "Adding" — 10 rounds:** 8 + 6 → 14 · 7 + 5 → 12 · 6 + 3 → 9 · 9 + 4 → 13 · 3 + 8 → 11 (choose start) · 6 + 7 → 13 · 8 + 5 → 13 (2, 3) · 7 + 8 → 15 (3, 5) · 5 + 9 → 14 (choose start: from 9: 1, 4 · from 5: 5, 4) · 7 + □ = 20 → 13 (bank).

**One right answer each; never 0;** every start, rope and answer ≥ 1; every sum/difference within 0–20 and no answer is 0.
**Answer position:** the answer is typed; the decomposition is forced by the water, not picked. Measured: (a) the answer never equals the start or the rope (gate); (b) the first leap is a different length in successive make-ten rounds (2, 3, 1, 4 …) — no fixed "always leap 2"; (c) adding (10 incl. the 3 bank rounds) and taking-away (6) rounds: no run of either longer than 2 after the shuffle (feasible: 10 adds need only 4 separators); (d) answers in the default level: 7, 8, 9, 11, 12, 13 twice each, 5, 6, 14, 15 once — nothing dominates (critic: the first draft had 8 and 13 three times each); no two adjacent rounds share an answer after the shuffle.
**Order:** order-only reshuffle per pass; never the same order twice.

## 7. Check, the misses, the success
- **Check while beads are still on the rope:** no miss; the rope's beads glint; bubble: **"Lily still has beads on her rope. Keep leaping!"**
- **Check with an empty answer box:** no miss; bubble: **"Which stone is Lily on? Type it."**
- **Miss 1:** the stones between the nearest label and Lily get small ghost numerals counting from that label (e.g. 10 → 11, 12, 13, 14 glowing in turn, a soft tick each), and Lily's stone pulses. Bubble: **"Count on from the Ten Stone to Lily."** (taking away: **"Count back from the Ten Stone to Lily."**)
- **Miss 2:** the leaps are replayed as ghost arcs with their lengths written over them (2 and 4), and the equation strip shows "10 + 4 = □" in large type. Bubble: **"Ten and 4 more is …?"** (taking away: **"Ten take away 1 is …?"**)
- **Splashes are never misses** — the water is the teacher; they cost nothing.
- **A new move or keypress takes the help away** until the next Check.
- **Success:** the answer lands on Lily's stone as a numeral; Lily does a happy double hop, a ring of ripples spreads, and the stone glows. The equation strip completes: **"8 + 2 = 10, 10 + 4 = 14 — so 8 + 6 = 14!"** · taking away **"13 − 3 = 10, 10 − 1 = 9 — so 13 − 4 = 9!"** · there-and-back round adds **"Same stones as 8 + 6 = 14!"** · choose-start rounds add **"Starting on 8 was the short way!"** when she started on the bigger number.

## 8. Settings
1. **Facts:** Adding / Adding and taking away (default Adding and taking away) — at rest the rope is coral (adding) or the first round shows Lily facing left with a teal rope.
2. **Stone numbers:** Every 5 / Every stone (default Every 5) — Every stone labels all 21 stones (a support for children still building the line; the typed answer is then a read-off and the activity becomes pure strategy practice). Visibly different at rest.

## 9. Words (EN source)
- on-screen title: **Lily's Ten Stones**
- instruction: **Help Lily cross the pond. Pull her back and let go to leap. The stones past ten are under water until Lily stands on the golden Ten Stone — so stop there first, then leap the beads that are left. Type where she lands.**
- task line: **Pull Lily back and let go. Stop on the Ten Stone first!**
- prompt (equation strip, numerals only): **{a} + {b} = □** · **{a} − {b} = □** · **{a} + □ = 20**
- hints: **Lily still has beads on her rope. Keep leaping!** · **Which stone is Lily on? Type it.** · **Count on from the Ten Stone to Lily.** · **Count back from the Ten Stone to Lily.** · **Ten and {r} more is …?** · **Ten take away {r} is …?** · bank: **How far did Lily leap altogether?**
- success: **{a} + {p} = 10, 10 + {r} = {s} — so {a} + {b} = {s}!** · **{a} − {p} = 10, 10 − {r} = {s} — so {a} − {b} = {s}!** · **Same stones as {s} + {b} = {a}!** · **Starting on {big} was the short way!** · bank **{k} + {n} = 20!**
- free play: **Pond play**
- settings: **Facts** — **Adding** / **Adding and taking away** · **Stone numbers** — **Every 5** / **Every stone**

**Locale traps:**
- **Lily's name:** one name per locale, kept from the old activity where it exists (de/fr/es/pt/it/sv "Lily"); the old nl text used "Ties" in one prompt and "Lily" elsewhere — use **Lily** everywhere in nl; da/no/fi "Lily".
- **"Ten Stone":** the old translations are the start — de "Zehner-Stein", fr "le nénuphar du dix" → since the picture is a stone, fr **"la pierre du dix"**, es "la piedra del diez", pt "a pedra do dez", it "il sasso del dieci", nl "de tiensteen", sv **"tiostenen"** (the old "guldstenen" names the colour, not the ten — change), da "tistenen", no "tisteinen", fi "kymppikivi".
- **"Count on / count back"**: de "weiterzählen / zurückzählen", fr "compte en avançant / en reculant", fi "laske eteenpäin / taaksepäin".
- **Number line direction:** left to right in all 11 locales (no RTL locale).
- The equation strip and success use numerals and + − = only; "so" in the success line: de "also", fr "donc", es "entonces", fi "siis".

## 10. Sound off, access, phones
- Legible silent: the sunken stones, the splash, the rising stones, the rope and the written leaps carry everything.
- Keyboard: Tab to Lily; ← / → choose direction, ↑ adds one bead to the spring, ↓ removes one, Enter leaps; U undoes; anchor: Tab between the two start stones, Enter; digits; Enter checks.
- aria: "Lily is on stone 8; 6 beads on the rope"; "the stones past 10 are under water"; a splash is announced ("Splash! That stone is under water — Lily swims back to 8.").
- Taps: Lily's pull area ≥ 96 × 120 (72 × 96 at 360); anchor stones get a 44 px hit area; keys ≥ 46 px.
- Reduced motion: leaps are a 150 ms slide; stones rise without bubbles; the splash is a short fade.

## 11. Distinct from
- **Row 85 The Ten Plug (this batch):** the same strategy as a rack and a snapped stick; addition only. Here the ten is a STOP on a line enforced by water, and the rest is what remains on the rope; with subtraction and bonds to 20.
- **open-number-line (tool):** the child draws jumps freely; nothing enforces a stop at ten. **#3 Peek Path / #21 Creek Map / #19 Number Elevator:** a line or floors for counting and comparing — no leaps, no forced ten.
- **number-line (tool):** free jumps for addition and subtraction; no sunken side, no rope.

## 12. Build plan
- **Core state:** `{ facts, labels, order[], idx, round:{kind, op, a, b, start|null, starts[], answer}, lily, dir, rope, coil, leaps:[], tenVisited:false, typed:'', misses, help }`.
- **Functions:** `chooseStart(s)`, `pull(n)` (0..rope), `release()` → `'land' | 'splash' | 'ten'`, `sunken(stone)` (true iff stone is on the far side of ten from Lily and ten not yet visited this round), `undo()`, `check(n)`, `solve(round)` (re-derived: a ± b; bank 20 − start), `forcedSplit(round, start)`, `nextTask(index)`.
- **Gate `verify-sunken-stones-core.js` (own oracle):** (1) answer = a ± b (bank: 20 − start) for every round, within 1..20; (2) from every start, every pull length that crosses ten splashes and every pull that stops on ten lands; after ten, the far side never splashes; (3) the only landing sequences that empty the rope in crossing rounds start with exactly the distance to ten; no-crossing rounds accept any split; (4) Lily can never land beyond start ± b in rope rounds; bank rounds: landing on 20 is the only way to finish, > 20 splashes; (5) answer ≠ start and ≠ rope; (6) adding/taking-away runs ≤ 2 and no adjacent equal answers over 10 000 seeds; (7) anchor rounds accept both starts and record the leaps; (8) the doubles round is absent; (9) pets/frog exists in pets.json (colour).
- **Mutations:** let a crossing leap land; keep the far side sunk after visiting ten; allow pulling more beads than the rope holds; accept a typed answer ≠ Lily's stone; let Lily backtrack; bank round accepts landing on 19; label every stone in "Every 5"; answer equal to the rope in one round; two adjacent equal answers allowed; splash counted as a miss.
- **Pictures verified:** pets/frog (side view, contact sheet). **Risks:** the pull-drag precision at 320 px (26 px per bead, the coil shows the bead count, keyboard ↑/↓ as the precise path); the window shift at 360 must keep the Ten Stone in view in every crossing round (gate asserts the window always contains 10 and both ends of the leap). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a slingshot frog, a splash when you get it wrong, stones bubbling up out of the water when you get it right.
2. **Would a teacher put it on the board?** Yes — the water makes "stop at ten first" a law of the pond rather than a rule to remember, and the rope shows where the rest comes from (6 is 2 and 4).
3. **Would a parent trust it?** One library frog, kind feedback, no score or timer, splashes cost nothing, the answer is typed from understanding.
4. **The invention:** the stones past ten are under water until Lily stands on the Ten Stone, so the leap across ten must break at ten — and the rest is what is left on her bead rope.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- **Answers spread:** 8 and 13 were each the answer in 3 of 14 rounds. New rounds 12 and 13 changed (17 − 4 → 16 − 4 = 12, no crossing; 11 − 3 → 11 − 4 = 7, leaps 1 and 3); every answer now appears at most twice. All 16 facts re-solved by my oracle, every forced split recomputed (distance to ten, then the rest).
- **K-275 Number Bonds to 20 had one bank round in the default level** — two more added (15 + □ = 20 → 5; 5 + □ = 20 → 15, which must stop on the Ten Stone first), so the bonds-to-20 sheet is genuinely practised.
- **Frog facing:** the sheet asserted "pets/frog faces right", but PICTURE-RULINGS records it as facing left; the build now measures its facing once and mirrors so Lily always faces her leap (no claim left to be wrong).
- Distinct from row 85 (rack + snapped stick, addition only), the number-line / open-number-line tools (free jumps, nothing forces the stop at ten) and the built #3/#19/#21 lines.
