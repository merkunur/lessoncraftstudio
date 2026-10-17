# Row 153 — Tildy's Tailor Shop → THE CM CUTTER AND THE PIECE JAR: the jar always knows what your ruler missed (2.MD.A.1)

## 0. Identity
- id `tildy.measure-ruler.2-md-a-1` (KEPT; slugs/titles/intros frozen en de fr es pt it nl; sv/da/no/fi need new slug, title and intro at build — the nl page already names the tailor "Fien", so each new locale names her natively too) · grade 2 · CCSS 2.MD.A.1 · Measurement & Data · own files `cm-cutter-core.js`, `cm-cutter-activity.js`, `cm-cutter-activity.html`, `cm-cutter-activities.json` (the row leaves `tildy-activities.json`; `tildy-core.js` is retired with it, its gate-can't-cheat ideas carried into §12).
- worksheets covered: **G2-235** Measure It! (start at 0, read the end) — this row covers the part G2-235 assumes and #152 does not: **putting the 0 at the start** yourself, a **broken ruler**, and **choosing a ruler long enough**.
- old activity: Tildy's ribbon strips on a table; Knot the cat nudges the ruler off 0; the child slides the ruler so 0 meets the strip's start and taps the reading; plus a broken-ruler span round, a "what went wrong?" diagnosis round and two pick-a-ruler rounds; no live alignment lamp (so nudging to green is impossible). **Kept**: all 9 rounds' data (strips ribbon 7, leather 5, yarn 4, cord 9, wide ribbon 8, broken-ruler 6, Tildy's off-by-one 6, ruler-pick 11 and 8), the six-locale prompt translations as the starting text, Knot's nudge, the no-proximity-lamp rule (the verdict only at Check). **Changed**: the text-option diagnosis becomes a hands-on fix; the 8-cm pick round's rack {5, 10, 12} had TWO right rulers (10 and 12 both reach) → {5, 7, 10}; drawn characters become library pictures (occupations/tailor = Tildy, pets/cat = Knot).

## 1. The pitch
"Tildy's cm cutter rides along your ruler from its 0 and snips the ribbon at every centimetre mark — the pieces drop into the jar, and anything your ruler missed is left lying on the table for everyone to see."

## 2. Why a child will want it again
- **Snipping is delicious.** After the child lines up the ruler and taps the reading, the cutter — a little drawn blade carriage on the ruler's top edge — runs from 0 to the ribbon's end, *snip-snip-snip* at every tick; each centimetre piece flips into Tildy's glass jar with a tiny *plink* and stacks like a coin. Then the pieces fly back out and stitch themselves into the ribbon again (zip, 400 ms) so nothing is lost.
- **Knot the cat** pads in at the start of most rounds (the library cat picture slides in from the side), bumps the ruler with a *bonk*, and the ruler slides off zero. It is the cat's fault, not the child's — and the child's job is to put it right.
- **The jar never lies:** if the 0 was right, the jar holds exactly the pieces of the ribbon and the table is clean — the jar glints and Tildy's sewing machine (her picture) gives a happy little shake. If the 0 sat inside the ribbon, a stub of ribbon is left on the table, uncut; if the 0 sat before the ribbon, the cutter's first snips cut only air (a puff of dust, no piece).
- **The order rack:** every finished ribbon is hung on the shop's order rack with its length tag — a growing row of real things the child measured.
- No timer, score or streak.

## 3. The skill and the misconception
- Skill (2.MD.A.1): measure the length of an object by selecting and using a ruler — put the ruler's 0 at the start of the object, read the number at the other end; a broken ruler measures by counting the centimetre spaces covered; a ruler must reach the whole object.
- Misconceptions and the push-back (all physical, all shown after Check — never before, so the child cannot nudge-and-watch):
  1. **Starting at 1** (or at the ruler's edge). The cutter starts at the ruler's 0: with the 0 inside the ribbon, a stub before the 0 is left uncut on the table — the reading is one (or more) short and the stub shows by how much.
  2. **Starting at the table edge, not the strip.** No strip ever starts at the table's visible left edge (every strip begins 1–3 cm in, §6), so "push the ruler to the edge" fails in every round — and the air snips show by how much.
  3. **Reading the end number of a broken ruler** (a ruler that starts at 2 read as 8 for a 6-cm strip). The cutter on a broken ruler starts at the broken end: the jar holds 6 pieces while the child's tag says 8 — "the ruler doesn't start at 0, so count the spaces."
  4. **Using a ruler that is too short.** The cutter stops at the ruler's end; the ribbon's tail past it is left uncut on the table.
- One right answer per round (alignment is exact on the integer cm lattice; each pick rack has exactly one ruler long enough).

## 4. The stage
**At 704 (stacked):**
- **The cutting table** — a drawn wooden table band 640 × 150 with a faint cm grid line along its front edge (no numbers — the table is not a ruler).
- **The ribbon / strip** — a drawn band 18–24 px thick with its material pattern (ribbon: satin stripe; leather: stitched edge; yarn: twisted; cord: braided; felt: flat with a speckle; lace: dotted edge; elastic: ribbed) — apparatus geometry (a flat patterned band — a measured bar, never a drawn object), 38 px per cm (strip up to 14 cm = 532 px), lying on the table.
- **The table window (critic geometry fix)** — the visible table is a fixed **16-cm window** at 38 px/cm (608 px at 704; 21 px/cm = 336 px at 360; 18 px/cm = 288 px at 320). Its left edge sits 1 cm left of the smaller of (strip start, Knot's ruler 0), so the strip AND the ruler's 0 are always in view; a long ruler's far end may run off the window's right edge (it fades there — it is a long ruler under a short window). Measured for all 17 rounds: strip ∪ ruler-0 spans ≤ 15 cm (largest: Level 2 round 8, 0 → 14), so every round fits. (The designer's "table runs −3…+14 at 40 px/cm" was 680 px — wider than the 640-px table it described — and its phone scale of 22 px/cm needed up to 18 cm = 396 px > 336.)
- **The ruler** — a cream wooden ruler 52 px tall, 38 px/cm, numerals Nunito 800 20 px on every cm, ticks every cm; length 12 cm by default (Level 2 racks: 5, 7, 9, 10, 12, 15 cm). A ruler can be dragged left/right along the table (snaps to whole cm; its 0 is clamped inside the window). A broken ruler has a jagged left end and starts at its printed 1, 2 or 3 (no 0 present).
- **The cm cutter** — a small drawn blade carriage 28 × 34 parked at the ruler's 0 end (or its broken end).
- **The piece jar** — a drawn glass jar 96 × 150 at the right of the table with a faint level line per piece.
- **Tildy** — library occupations/tailor (a woman at a sewing machine), **104 × 104**, top-right corner; her feedback appears in a bubble beside her.
- **Knot** — library pets/cat, **96 × 96**, enters from the left edge at round start (translate 500 ms), bumps the ruler, leaves (400 ms). Not on screen during work.
- **The order rack** — a drawn rail across the top with small tags (data marks, 40 px) for finished strips.
- Task line (EN, 22 px): "Put the ruler's 0 at the start of the {strip}. Then tap the number at the end."

**At 360 (stacked):** 21 px per cm (the 16-cm window = 336 px; ruler 12 cm = 252 px; the 15-cm ruler of the last pick round = 315 px, fully in view); numerals 16 px (two-digit numerals ≈ 18 px wide < 21 px apart — they never touch); ruler 44 px tall; strips 14–18 px; jar 64 × 96 beside Tildy (72 × 72) above the table; Knot 72 × 72. Tap targets on ruler numerals: the whole ruler band is the tap zone and resolves to the nearest numeral (21 px apart), with a 44-px "reading tag" that shows the tapped number and can be dragged to adjust. Stage ≈ 44 + 96 + 120 + 44 = 304 px → Check above 360 × 740 and 320 × 640 (at 320, 18 px/cm, numerals 14 px, 15-cm ruler 270 px).

Words on the apparatus: none except the ruler's numerals (content).

## 5. The hand
- **Drag the ruler** along the table (follows the finger; snaps to whole cm with a wooden *tock*; ≤ 100 ms). No light or colour changes as it passes the right spot — there is NO alignment lamp (the old core's rule; the verdict is only at Check).
- **Tap a numeral on the ruler** → a coral reading tag hangs from that numeral ("7"); tap another to move it. On a broken ruler (Level 2) the input is different: **tap each centimetre space** of the strip — every tap drops a little stitch mark and the count shows on a tag (tap a stitch again to remove it).
- **Pick a ruler** (pick rounds): rulers lie on a rack; drag one onto the table (or tap it) — it replaces the current ruler; then align and read as usual.
- **Check = the snip:** the cutter runs from the ruler's 0 (or broken end) toward the strip's far end, snipping at each tick (90 ms per cm, a crisp *snip* 2.2 kHz), pieces hop into the jar (*plink*), and the outcome shows (§7). After 1.2 s the pieces fly back and stitch (400 ms) — the strip is whole again for another try.
- **Keyboard:** ←/→ slide the ruler 1 cm; number keys type the reading; Tab to the rack; Enter = snip.
- **Free play:** after success, the ruler can be slid anywhere and the snip pressed again just to watch — wrong placements show their stub or air snips with no grading (a sandbox that teaches the same law).
- Optional TTS: tapping Tildy reads the task; tapping the jar says "{n} pieces".

## 6. The rounds
Coordinates in cm on the table (the visible 16-cm window is placed per round as in §4). Offset = where Knot leaves the ruler's 0 minus the strip's start (+ = 0 inside the strip, reads short; − = 0 before the strip, reads long).

**Level 1 — Line up the 0** (9 rounds; rounds 1–5 are the old ones, prompts kept):
| # | strip | start → end | length | Knot leaves 0 at | offset | a child who reads without fixing gets |
|---|---|---|---|---|---|---|
| 1 | ribbon | 0 → 7 | 7 | 3 | +3 | 4 |
| 2 | leather | 0 → 5 | 5 | 2 | +2 | 3 |
| 3 | yarn | 0 → 4 | 4 | 1 | +1 (the "not the 1!" round) | 3 |
| 4 | cord | 0 → 9 | 9 | −2 | −2 | 11 |
| 5 | wide ribbon | 0 → 8 | 8 | 4 | +4 | 4 |
| 6 | felt | 2 → 8 | 6 | 1 | −1 | 7 |
| 7 | lace | 1 → 11 | 10 | 0 (at the table edge) | −1 | 11 |
| 8 | braid | 5 → 8 | 3 | 3 | −2 | 5 |
| 9 | elastic | 2 → 13 | 11 | 4 | +2 | 9 |
Measured (critic re-computed every row): lengths 3–11 all distinct; offsets + in 5 rounds, − in 4; "read without fixing" gives the wrong number in 9 of 9 (4, 3, 3, 11, 4, 7, 11, 5, 9); every strip starts 1–3 cm inside the window (insets 1, 1, 1, 3, 1, 2, 2, 3, 1), so "push the ruler to the edge" is wrong in 9 of 9; round 3 moves the old yarn round's nudge from 3 to 1 so the classic "started at the 1" error has its own round; the ruler (12 cm) reaches every strip once aligned (longest 11).

**Level 2 — Tricky rulers** (8 rounds):
| # | kind | strip | ruler / rack | right answer | the trap |
|---|---|---|---|---|---|
| 1 | broken ruler (old) | 2 → 8 | broken, starts at 2 | 6 spaces | reading "8" |
| 2 | broken ruler | 3 → 7 | broken, starts at 3 | 4 spaces | reading "7" |
| 3 | broken ruler | 1 → 10 | broken, starts at 1 | 9 spaces | reading "10" |
| 4 | fix Tildy (old diagnose) | 0 → 7 | Tildy's ruler with 0 at 1, her tag says 6 | slide to 0, read 7 | trusting her 6 |
| 5 | fix Tildy | 0 → 10 | Tildy used a 9-cm ruler, her tag says 9; rack 7 · 9 · 12 | pick the 12-cm ruler, read 10 | the ruler's end |
| 6 | pick a ruler (old) | 0 → 11 | rack 6 · 9 · 12 | the 12-cm ruler, read 11 | the 9 looks "about right" |
| 7 | pick a ruler (old, fixed) | 0 → 8 | rack 5 · 7 · 10 | the 10-cm ruler, read 8 | 7 is one short |
| 8 | pick a ruler | 0 → 14 | rack 10 · 12 · 15 | the 15-cm ruler, read 14 | 12 is close |
Each pick rack has exactly ONE ruler long enough (one right answer; critic-checked: 10 → only 12 of 7·9·12; 11 → only 12 of 6·9·12; 8 → only 10 of 5·7·10; 14 → only 15 of 10·12·15). Critic corrections: the designer's rounds 5 and 6 were the SAME strip (0 → 11) on the SAME rack (6·9·12) — round 5 is now a 10-cm strip on 7·9·12; and rounds 1 and 4 shared the length 6 — round 4 is now 7. Level 2 lengths 6, 4, 9, 7, 10, 11, 8, 14 are all distinct.
**Honest note on the pick rounds:** with exactly one ruler long enough, that ruler is always the LONGEST on the rack, so "take the longest" picks right 4/4 — and that is a correct strategy (a longer ruler always reaches), not a cheat. The pick is therefore the scaffold, not the graded answer: the round is graded on the READING made with the chosen ruler, and the 7-cm-on-an-8-cm-strip and 12-on-14 near-misses are there to make a child look before choosing. Positional bot "take the left/middle/right ruler" ≈ ⅓ (shuffled, gated 20–47 %).

**Answer position:** readings are values on the ruler (no options); the correct ruler on a pick rack sits left / middle / right in a shuffled order per pass and the gate measures each position ≈ ⅓ across rounds 5–8 over 30 passes (bounded 20–47 %). Order: order-only reshuffle per pass within each level.

## 7. Check, the misses, the success
- **Check with no reading** → hint, no miss: "Tap the number on the ruler at the end of the {strip}." (or "Tap each centimetre space the strip covers.")
- **Miss 1** — the snip shows the physical truth: *0 inside the strip* → an uncut stub stays on the table, outlined in coral; *0 before the strip* → the first snips puff air (no pieces) and those empty spaces on the ruler glow coral; *aligned but misread* → the jar shows {n} pieces with a big count tag next to the child's tag {m}; *ruler too short* → the uncut tail outlined in coral. Hints: "A piece was left on the table — the 0 was not at the start." · "The cutter snipped air before the {strip} began." · "The jar has {n} pieces. Look again at the end." · "The ruler did not reach the end."
- **Miss 2** — the strip's start gets a pulsing teal pin and a dashed line drops from it to the table; the ruler's 0 tick glows; on broken rulers each covered space shows a faint count numeral. Hint: "Slide the ruler until its 0 touches the pin." (broken: "Count the spaces from the start to the end.")
- **A new move** (sliding, tapping, picking) clears the coral outlines and pins until the next Check.
- **Success** — every snip makes a piece, no stub, no air; the jar fills to the level and glints; Tildy's sewing machine shakes; the strip is stitched back and hung on the order rack with "{n} cm". Bubble: "0 at the start, {n} at the end: the {strip} is {n} cm — and the jar has {n} pieces." (broken: "{n} spaces from start to end: {n} cm, even with a broken ruler.")

## 8. Settings (each visibly changes the board at rest)
1. **Rounds:** Line up the 0 · Tricky rulers — the table shows a whole 12-cm ruler with Knot about / a broken ruler or a ruler rack.
2. **Ruler numbers:** Every centimetre · Only 0, 5, 10 — the ruler's printed numerals change (the reading then needs counting on, as on a real ruler).

## 9. Words (EN source; de fr es pt it nl start from the old translations; sv da no fi new; one native + pedagogy reviewer). Title and intro FROZEN where they exist.
- instruction: "Put the ruler's 0 at the start of the strip, then tap the number at the end. Tildy's cutter will check with the jar."
- prompts: "Put the ruler's 0 at the start of the {strip}. Then tap the number at the end." · "This ruler is broken. Tap each centimetre space the {strip} covers." · "Tildy says {m}. Fix her ruler and measure again." · "Pick a ruler long enough, then measure the {strip}."
- hints: "Tap the number on the ruler at the end of the {strip}." · "Tap each centimetre space the strip covers." · "A piece was left on the table — the 0 was not at the start." · "The cutter snipped air before the {strip} began." · "The jar has {n} pieces. Look again at the end." · "The ruler did not reach the end." · "Slide the ruler until its 0 touches the pin." · "Count the spaces from the start to the end."
- celebration: "0 at the start, {n} at the end: the {strip} is {n} cm — and the jar has {n} pieces." · "{n} spaces from start to end: {n} cm, even with a broken ruler."
- settings: "Rounds" — "Line up the 0" / "Tricky rulers"; "Ruler numbers" — "Every centimetre" / "Only 0, 5, 10".
- **Locale traps:** the strip nouns (ribbon, leather strip, yarn, cord, felt, lace, braid, elastic) need gender + case per hint — authored per noun per locale, never a token (de *das Band, der Lederstreifen, die Wolle, die Kordel, der Filz, die Spitze, die Borte, das Gummiband* + "am Anfang des/der…"; fr *le ruban, la bande de cuir, la laine, le cordon…*; fi case endings *nauhan alkuun*). The tailor's name is localised as the frozen pages already do (en de pt "Tildy", nl "Fien"; es/fr/it pages carry no name — keep it out of their strings); sv/da/no/fi name her natively at build. The cat's name "Knot" is a pun in en only — other locales use a native cat name or none. "cm" in all 11; no decimal comma (whole cm); numbers on the ruler are Western Arabic digits.

## 10. Sound off, access, phones
- Legible with sound off: stub, air puffs, the jar count, the coral outlines and the pin.
- Keyboard path in §5. aria: ruler "ruler, its 0 at {k} centimetres on the table"; strip "{strip} from {a} to {b}"; jar "{n} pieces"; after the snip the outcome is announced in words.
- Taps: ruler drag band 52/44 tall; numerals via nearest-numeral tap + a 44-px draggable reading tag; rack rulers ≥ 44 tall; Tildy 104/72, Knot 96/72 (library pictures ≥ floors). Check above the folds.

## 11. Distinct from
- **Row 152 The Glow Ruler** (this batch): the object already starts at 0 and the light counts spaces to the reading; here the child must PLACE the ruler, cope with broken and short rulers, and the cutter + jar check is this row's invention.
- **Row 100 The One-Hop Helpers** (1.MD.A.2, iterating a unit) and **Row 99 The Travelling Cord** (indirect comparison): no ruler.
- **Premium "ruler" / "measurement-bench" / "unit-handle"**: free measuring tools without the misalignment physics or the piece jar.

## 12. Build plan
- **Core state:** `{ round, rulerZero (table cm), rulerLen, broken:0|k, picked, reading:null|n, stitches:Set<cm> }`. Functions: `reading(round, rulerZero)` = stripEnd − rulerZero (normal ruler); `snip(state)` → `{pieces, stubCm, airCm, tailCm}` (pieces = cm cut between max(rulerZero, start) and min(stripEnd, rulerEnd)); `evaluate(round, state)` → `'not-committed' | 'zero-inside' | 'zero-before' | 'misread' | 'too-short' | 'miscount' | 'ok'`. Snapshot exposes NO true length and no proximity value (carried from tildy-core: the gate-can't-cheat rule).
- **Verify gate (own oracle):** for every round, `ok` only for rulerZero = stripStart (or the broken-span count) and the true length; a nudge-to-green bot gets no signal before Check (snapshot has no distance field — asserted); bots "read without fixing" (0/9), "push to the table edge" (0/9), "read the broken end" (0/3), "take the first ruler" (≈ ⅓) all lose; "take the longest ruler" is recorded as a correct strategy (4/4) and the pick rounds are graded on the reading; every round's strip ∪ ruler-0 fits the 16-cm window; every pick rack has exactly one ruler ≥ length; Level-1 offsets include both signs; lengths distinct per level; positions of the right ruler balanced (20–47 % each over 30 passes).
- **Mutations:** an alignment lamp before Check · cutter starts at the table edge · stub hidden · air snips counted as pieces · broken ruler graded by its end number · rack with two fitting rulers · reading not tied to placement (numerals fixed to the table) · Knot's nudge skipped (ruler starts aligned) · rounds sorted.
- **Pictures:** occupations/tailor (seen: woman at a red sewing machine — Tildy), pets/cat (to view on the pets sheet; any facing is fine — it only slides in and bumps). Strips, ruler, cutter, jar, table: drawn apparatus.
- **Risks:** the 15-cm round at 320 px is 300 px wide — fits. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — a cheeky cat, a snipping cutter, pieces plinking into a jar and stitching back, an order rack that fills.
2. **On the board?** Yes — "where does the cutter start?" makes the 0 rule physical; the class sees the stub or the air snips and argues why.
3. **Parent trust?** Library pictures, no score, calm; the mistakes are the cat's fault and are fixed by the child.
4. **The invention:** Tildy's cutter snips the ribbon at every centimetre from your ruler's 0 — the jar holds what you measured, and whatever your ruler missed is left lying on the table.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Re-computed every Level-1 row (offsets, "read without fixing" values, lengths) — all true; but the table geometry was impossible (−3…+14 cm at 40 px/cm = 680 px on a 640-px table; 22 px/cm on phones needed up to 396 px). Replaced by a per-round 16-cm window (38 / 21 / 18 px per cm at 704 / 360 / 320) that always holds the strip and the ruler's 0 — measured for all 17 rounds — and made "push to the edge" lose in every round (strips start 1–3 cm in).
- Level 2: rounds 5 and 6 were duplicates (same strip, same rack) and two rounds shared length 6 — fixed (10-cm strip on 7·9·12; Tildy's ruler round now 7 cm); every rack still has exactly one adequate ruler.
- Recorded honestly that "take the longest ruler" always wins a pick (a correct strategy), so the reading, not the pick, is graded; broken-ruler start numbers made consistent (1, 2 or 3).
- Library art checked: occupations/tailor (woman at a red sewing machine) 104 / 72 px and pets/cat 96 / 72 px clear the floors; strips stay flat measured bands, never drawn objects.
