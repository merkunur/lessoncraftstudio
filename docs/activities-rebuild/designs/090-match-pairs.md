# Row 90 — Find the Missing Number → THE PLANK PATH (1.OA.D.8)

## 0. Identity
- id `match-pairs.find-the-missing-number.1-oa-d-8` (KEPT; slugs/metadata frozen in all 11 locales) · grade 1 · CCSS 1.OA.D.8 · Operations & Algebraic Thinking · own files `plank-path-core.js`, `plank-path-activity.js`, `plank-path-activity.html`, `plank-path-activities.json` (the row leaves `match-pairs-activities.json`; the id is unchanged; the other match-pairs rows are untouched).
- page title (frozen): "Find the Missing Number"; intro (frozen) promises: work out the missing number in each equation, then match it to its answer; the blank moves around (an addend, the number you take away, the total); "tap an equation, then tap the number that makes it true, and watch the pair link". **All kept true** — the number becomes a plank that links the two banks of its equation.
- worksheets also covered: **G1-115** What Is Missing? (pictures to 10 — in "to scale" paths the banks are rows of stepping squares the child can count), **G1-218** Missing Number Problems to 10, **G1-215** Missing Number Problems to 20.
- old activity: 18 tasks of two equation cards + two number cards, tap-to-pair, "link" animation. **Kept:** tap an equation, tap the number, watch it link; the blank in every position; numbers 1–20; several old equations verbatim (? + 4 = 9, ? + 7 = 10, 8 + ? = 11, ? + 6 = 8, ? − 2 = 5, 10 − ? = 6 …). **Changed:** each round is one path with four gaps, a decoy plank makes every choice a decision, and a wrong number is shown wrong by the plank itself (it falls in the stream or sticks out), not by a red mark.

## 1. The pitch
"Every equation is a gap in the path, and every number is a plank exactly that long — only the right number lets the walker cross."

## 2. Why a child will want it again (the fun)
- **A journey.** A little library animal waits at the start of a stream-side path broken by four gaps. Each gap has its equation on a signpost. Every right plank brings the walker one gap closer to the flag at the end.
- **Planks that unfold.** In the tray the planks are folded bundles showing only their number. Tap one and it flies to the gap and unfolds to its true length with a woody "clack-clack-clack", one square at a time.
- **Splash and see-saw.** A plank that is too short drops into the stream with a "plop" and bobs back to the tray; one that is too long overhangs the far bank, see-saws and slides back. Both make children laugh and both say exactly what went wrong.
- **The crossing.** When all four planks fit, the walker trots across the whole path — over each plank with a little hop and a hollow "tok" — and reaches the flag, which runs up its pole. Each round has a new walker (a rabbit, a turtle, a duckling …).
- **The odd plank.** One plank never fits anywhere: it is the "add the numbers you see" trap. At the end it floats away down the stream.
- **Free play ("Plank yard"):** make your own path — choose the banks with two dials and see which plank fits.

## 3. The skill and the misconception
- **Skill (1.OA.D.8):** find the unknown whole number in an addition or subtraction equation, the unknown in any position, within 10 (G1-115, G1-218) and within 20 (G1-215).
- **How every equation becomes a path:** each equation relates two parts and a whole (a + b = w; w − b = a). The path draws the known part(s) as banks of stepping squares and the whole as the total length between the two posts; the unknown is the empty stretch: a missing part is the GAP between banks, a missing whole (5 + 4 = ?) is the long base plank under the whole road from post to post. The number card is a plank of exactly its length laid in that stretch.
- **Misconception 1 — "add the numbers you see"** (8 + ? = 11 → 19). **Push back:** the decoy plank 19 unfolds 19 squares into a 3-square gap and sticks out 16 squares past the far bank — it see-saws and slides off.
- **Misconception 2 — the blank is always the answer at the end.** **Push back:** within a path the gap sits in four different places (start of the road, between banks, the taken-away stretch, the whole under the road) — the path cannot be crossed by "doing the sum".
- **Misconception 3 — subtraction with the start missing** (? − 2 = 5 → 3). **Push back:** a 3-plank under a road whose banks are 5 and 2 long is too short — it drops into the stream.

## 4. The stage
Layout single column at all widths (the path is wide).

**At 704 px:**
- **Task line** (22 px): **"Which number makes {equation} true?"** (the selected gap's equation).
- **The path** (drawn apparatus, 672 × 300): a sandy path along a blue stream, laid in two rows (gap 1 and 2 on the top row left to right, a bend, gap 3 and 4 on the bottom row left to right — always read left to right on each row). Each gap segment is 320 × 120:
  - a **signpost** above it (cream board 200 × 40, equation in Baloo 2 26 px, the blank "?" in a dashed box) — the equation is the content;
  - the **banks**: rows of **stepping squares** (drawn sand-coloured squares with a 2 px ink outline): to 10, squares 26 px; to 20, squares 14 px; coral squares for the first known part, teal for the second; a **start post** and an **end post** (short drawn stakes) mark 0 and the whole;
  - the **gap**: open water (blue with two wave lines) where the missing stretch is; for a missing whole, both banks join and the gap is a dashed **base slot** under the road from post to post (the plank lies there, under the stones).
- **The walker** (library picture, 96 px) at the start of gap 1; **the flag** (drawn pennant on a pole, 64 px) after gap 4.
- **The plank tray** under the path (672 × 84): five **folded planks** (drawn wood bundles 96 × 64, numeral 32 px on a cream tag), shuffled.
- **Bubble** (≤ 2 lines) → speaker.

**At 360 px:** task line → path as a single column of four gap segments stacked (each 336 × 96; squares 16 px to 10 / 9 px to 20 — the to-20 banks show as two-tone strips with a tick every square and a bold tick every 5; signposts 22 px) with the walker 64 px at the top and the flag at the bottom → tray as 5 planks in one row (each 62 × 56, numeral 24 px) → bubble → Check. Check ≈ 700 px at 360 × 740. **At 320 × 640:** gap segments 300 × 84, tray planks 56 × 52; Check ≈ 630 px.

**Words on the apparatus:** none — equations, numerals, squares.

## 5. The hand
- **Tap a signpost** (the next unfilled gap is pre-selected): it glows teal and the gap's water shimmers — "tap an equation".
- **Tap a plank** in the tray (or drag it onto the gap): within 80 ms it lifts; it flies to the gap (300 ms) and **unfolds** to its length square by square (40 ms per square, a soft "clack" each), laid from the left edge of the gap (for a missing whole: from the start post along the base slot).
  - **Fits** (its end meets the far bank / end post exactly): a solid "tok", the plank settles, the signpost's "?" fills with the number, a rope rail snaps along the plank — the pair is linked; the next signpost glows.
  - **Too short:** the plank's end hangs over water; it tips and drops in with a "plop" (300 ms), bobs, and drifts back to its tray place (600 ms). The missing stretch stays shimmering, the number of open squares visible.
  - **Too long:** the plank's end overlaps the far bank by k squares (those squares glow coral); it see-saws twice and slides back to the tray.
- **Tap a laid plank** to lift it back out (free undo).
- **Check:** when the fourth plank fits, the crossing plays automatically; Check earlier gives the hint (§7).
- **Free play ("Plank yard"):** two dials set the banks (or the whole and one part); every plank in the tray can be tried; the path rebuilds.

## 6. The rounds
A round = one path of four gaps (four equations) and a tray of five planks: the four answers (all different, so one plank per gap) and one **decoy** — the typical error for one of the gaps (add the visible numbers, or subtract the wrong way) or, if that is out of range, an answer's neighbour. Never 0. The four gaps of a path use at least three different blank kinds.

**Level "Within 10"** (G1-115, G1-218) — gaps 1–4 → answers; decoy:
1. ? + 4 = 9 · 8 − ? = 5 · 3 + 4 = ? · ? − 6 = 2 → 5, 3, 7, 8; decoy 4
2. 2 + ? = 8 · ? − 3 = 4 · 9 − 5 = ? · ? + 7 = 10 → 6, 7, 4, 3; decoy 10
3. ? + 6 = 8 · 10 − ? = 6 · 5 + 4 = ? · ? − 2 = 5 → 2, 4, 9, 7; decoy 3
4. 6 + ? = 9 · ? − 1 = 7 · 10 − 4 = ? · ? + 5 = 6 → 3, 8, 6, 1; decoy 2
5. ? + 3 = 7 · 9 − ? = 4 · 2 + 8 = ? · ? − 4 = 2 → 4, 5, 10, 6; decoy 2
6. 5 + ? = 7 · ? − 5 = 4 · 8 − 7 = ? · ? + 3 = 9 → 2, 9, 1, 6; decoy 3
7. ? + 2 = 5 · 7 − ? = 1 · 4 + 4 = ? · ? − 5 = 5 → 3, 6, 8, 10; decoy 9
8. 1 + ? = 5 · ? − 2 = 7 · 6 − 3 = ? · ? + 2 = 8 → 4, 9, 3, 6; decoy 7
9. ? + 1 = 8 · 10 − ? = 8 · 3 + 3 = ? · ? − 1 = 4 → 7, 2, 6, 5; decoy 9

**Level "Within 20"** (G1-215) — every path has at least one number above 10:
1. ? + 4 = 13 · 14 − ? = 6 · 7 + 8 = ? · ? − 5 = 7 → 9, 8, 15, 12; decoy 2
2. 8 + ? = 11 · ? − 6 = 10 · 13 − 7 = ? · ? + 9 = 18 → 3, 16, 6, 9; decoy 19
3. ? + 7 = 15 · 16 − ? = 9 · 6 + 5 = ? · ? − 8 = 6 → 8, 7, 11, 14; decoy 2
4. 5 + ? = 12 · ? − 9 = 4 · 18 − 6 = ? · ? + 6 = 20 → 7, 13, 12, 14; decoy 5
5. ? + 8 = 17 · 15 − ? = 11 · 9 + 9 = ? · ? − 3 = 10 → 9, 4, 18, 13; decoy 7
6. 9 + ? = 15 · ? − 4 = 12 · 20 − 6 = ? · ? + 5 = 13 → 6, 16, 14, 8; decoy 18
7. ? + 6 = 11 · 17 − ? = 7 · 8 + 6 = ? · ? − 7 = 9 → 5, 10, 14, 16; decoy 17
8. 7 + ? = 16 · ? − 8 = 11 · 12 − 9 = ? · ? + 10 = 18 → 9, 19, 3, 8; decoy 10
9. ? + 9 = 20 · 13 − ? = 8 · 4 + 9 = ? · ? − 2 = 14 → 11, 5, 13, 16; decoy 12

(Critic re-solved every equation with his own solver, `work-c22/m090.js`: answers distinct within each path, decoy ≠ any answer, all numbers in range, no 0, four blank kinds in every path. **Every decoy is now a real error a child makes** — "add the two numbers you see" (e.g. 2 + ? = 8 → 10) or "subtract instead of add" for a missing start (? − 4 = 2 → 2, ? − 5 = 7 → 2, ? − 9 = 4 → 5, ? − 3 = 10 → 7, ? − 2 = 14 → 12) — or an answer's neighbour; the first draft had three decoys that were neither (1, 6, 7). **Decoy rank balanced:** in Within 20 the first draft's decoy was the LARGEST plank in 5 of 9 paths (17, 19, 17, 18, 17), so "never lay the biggest plank" was a learnable shortcut; now it is the largest in 3, the smallest in 3 and in the middle in 3. Within 10: largest 2, smallest 1, middle 6.)

**How each blank kind is drawn** (a + b = w):
- ? + b = w → teal bank b at the END of the road (ending at the end post), gap from the start post to it — the gap is at the START.
- a + ? = w and w − ? = a → coral bank a from the start post, gap from its end to the end post.
- ? − b = a → coral bank a and teal bank b laid end to end, the base slot (the start number, the whole) dashed under both, from post to post.
- a + b = ? → both banks end to end, the base slot under them.
- w − b = ? → the road from post to post is w long; the teal stretch b at its END is drawn as "taken away" (squares lifted out, dashed outlines); the gap is the remaining stretch at the start.
So the gap moves around exactly as the frozen intro promises.

**Walkers** (one per path, library, verified on contact sheets): forest-creatures/rabbit, forest-creatures/beaver, farm-animals/duckling, pets/tortoise, farm-animals/pig, forest-creatures/fox, farm-animals/lamb, forest-creatures/squirrel, farm-animals/goat. (The hedgehog of the first draft is replaced: it is Pim in #091, and the two characters must not blur. Never chick with duckling.) **Facing (contact sheet):** the path is read left to right, so a walker must face right. pets/tortoise already faces right; rabbit, beaver, duckling, squirrel, goat face left and are shown mirrored (CSS scaleX(−1) — none carries printed text); fox, pig and lamb face the viewer and hop straight. The {walker} noun in the success line is the vocab label of THAT picture.

**Answer position:** the five tray planks are shuffled per path with a per-pass Latin square so the right plank for gap 1 occupies each tray slot equally often (the gate measures 15–25 % per slot over 10 000 shuffles); the decoy is never in the same slot twice running. The gap's place on the road (start / middle / end / base slot) varies within every path.
**Order:** order-only reshuffle of the 9 paths per pass (never the same order twice).

## 7. Check, the misses, the success
- **Check before the path is complete:** no miss. The next signpost glows and its water shimmers; bubble: **"Which plank fits this gap?"**
- **Miss 1 (wrong plank):** the plank falls in (too short) or sticks out and slides back (too long); the open squares of the gap (or the coral overhang) stay outlined for 1.5 s. Bubble: too short **"Too short — it fell in!"** · too long **"Too long — it sticks out!"**
- **Miss 2 (second wrong plank on the same gap):** the gap's water shows dashed square outlines all the way across, numbered 1, 2, 3 … from the near bank (in "Numbers only" paths the banks themselves turn to squares for this gap). Bubble: **"Count the squares across the gap."**
- **A new plank takes the help away** until the next miss.
- **Success (each gap):** "tok", the rail snaps, the "?" fills. **Path complete:** the walker trots over all four planks (one hop per plank) to the flag, which runs up the pole; the decoy floats away down the stream. Bubble: **"5, 3, 7 and 8 — every plank fits! {walker} made it across."** (320 px short form: **"Every plank fits!"**).

## 8. Settings
1. **Numbers:** Within 10 / Within 20 (default Within 10) — the equations, the square size and the planks change at rest.
2. **Path:** To scale / Numbers only (default To scale) — "Numbers only" (G1-215) hides the lengths: every gap segment is drawn the SAME width at rest, banks are plain sandy strips with just their numbers on the posts, the gap is covered by a low mist band — no squares to count, no length to compare a plank against. The child must work the number out. **Commit, then see:** when a plank is laid, the mist lifts and that segment redraws to scale (banks grow to their true lengths in 300 ms, the gap opens to its true width) and only THEN does the plank unfold — so a wrong plank still visibly falls in or sticks out, but nothing on the screen helped choose it. (Critic: the first draft said "no true lengths" yet had the planks "still unfold to their true length" against a gap that had no true length — the two halves contradicted each other.)

## 9. Words (EN source)
- on-screen title: **Find the Missing Number**
- instruction: **Tap an equation, then tap the plank whose number makes it true. Only the right plank fits the gap — get all four and the walker crosses!**
- prompt (task line): **Which number makes {equation} true?**
- hints: **Which plank fits this gap?** · **Too short — it fell in!** · **Too long — it sticks out!** · **Count the squares across the gap.**
- success: **{n1}, {n2}, {n3} and {n4} — every plank fits! {walker} made it across.** · **Every plank fits!**
- free play: **Plank yard**
- settings: **Numbers** — **Within 10** / **Within 20** · **Path** — **To scale** / **Numbers only**

**Locale traps:**
- **{walker}** is the animal's name from `image-vocabulary.js` (singular, page locale) and the success sentence is authored whole per locale so the verb agrees with it (de "Das Kaninchen ist hinübergekommen", fr "Le lapin a traversé", fi "Kani pääsi yli"); where gender/article make the template awkward (de/fr/it/es/pt), the locale may drop the name and use the 320 px short form.
- **"Plank"** (de "Brett", fr "planche", es "tabla", pt "tábua", it "asse", nl "plank", sv "planka", da "planke", no "planke", fi "lankku") and **"gap"** (de "Lücke", fr "trou", fi "aukko") are everyday words in every locale.
- **Minus sign** U+2212; "?" is the blank in all locales (as the old cards).
- Numbers are numerals; number words for TTS from `scripts/worksheet-gen/lib/number-words.js`.

## 10. Sound off, access, phones
- Legible silent: the unfolding, the splash, the overhang, the rope rail and the crossing carry everything.
- Keyboard: Tab cycles the planks, Enter lays the focused plank in the selected gap; ↑/↓ select a gap; Backspace lifts the last laid plank.
- aria: signpost "8 plus ? equals 11, gap 3 squares" (to scale) / "8 plus ? equals 11" (numbers only); live region "plank 3 fits" / "plank 19 is 16 too long".
- Taps: tray planks ≥ 56 × 52; signposts ≥ 200 × 40 / full segment at 360.
- Reduced motion: planks appear at full length in place; the fall becomes a fade; the walker appears at the flag.

## 11. Distinct from
- **#089 Two Gauges** (this batch): one equation read as two needle readings. **#091 Fair Ribbon:** comparison by bead levels. **#250 Light Wall:** sums in a wall.
- **#18 Friendship Bridge** (K.CC.C.6): a plank bridge between two plates for pairing toys one-to-one — no lengths, no equations. **comparison-planks (tool):** two planks compared, the overhang moved to the short one. Here a plank is a NUMBER, chosen first and laid into a gap whose size is set by an equation.
- **#027 match-pairs** and the other match-pairs rows: pure card pairing; here each match is proven by fit, with a decoy.
- **Row 84 The Turning Domino** (1.OA.B.4): one domino turned and broken to make a fact family; its stage 1 opens the domino in the five missing-number stances. **Coverage ownership (critic ruling 2026-10-17): #090 Plank Path OWNS G1-115 What Is Missing?, G1-218 Missing Number Problems to 10 and G1-215 Missing Number Problems to 20** — it is the row whose whole job is the unknown in any position, with a to-scale picture mode (G1-115) and a numbers-only mode (G1-215). Rows 84, 89 and 91 practise the same sheets as a secondary use (84 inside a fact family, 89 as the two sides of "=", 91 as comparison stories); the coverage audit credits the sheets to #090. Row 84's §11 says the same.
- No domino, lock, chain-reaction or needle mechanic (registry checked: dominoes belong to rows 50, 71 and 84).

## 12. Build plan
- **Core state:** `{ level, scale, order[], idx, path: { gaps: Eq[4], answers: int[4] }, tray: int[5], laid: (int|null)[4], selected, misses: int[4], help, crossed }` with `Eq = {a|null, op, b|null, c|null}` (exactly one null).
- **Functions:** `solve(eq)` (pure), `layout(eq)` → `{banks:[{from,len,colour}], gap:{from,len,kind:'gap'|'base'}}`, `lay(gapIdx, plank)` → `{fit:'exact'|'short'|'long', diff}`, `lift(gapIdx)`, `complete()`, `nextTask(index)`.
- **Gate `verify-plank-path-core.js` (own oracle):** (1) recomputes every answer with its own solver; (2) answers distinct per path, decoy ≠ answers, ranges, no 0, within-20 paths contain a number > 10, ≥ 3 blank kinds per path; (3) `lay` returns exact iff the plank equals the oracle's unknown, short/long with diff = |plank − answer|, for every plank on every gap; (4) `layout` draws banks whose lengths are the known numbers and a gap whose length is the unknown, in the position listed for its blank kind; (5) tray-slot balance 15–25 %, decoy never same slot twice running; every decoy ∈ {sum of the visible numbers, difference of the visible numbers, an answer ± 1}; decoy rank (largest / smallest / middle of the five planks) ≤ 4 of 9 for largest and for smallest per level; in "Numbers only" every gap segment has the same width at rest; (6) completion iff all four exact; (7) walker pictures exist on disk, none repeats in a pass.
- **Mutations:** "Numbers only" draws gaps at their true width at rest (the length leaks); a decoy that is neither a typical error nor a neighbour; decoy is the largest plank in > 4 of 9 paths; answer computed by adding the visible numbers; decoy equals an answer; a short plank accepted; the gap drawn at the end for every blank kind; base slot missing for a missing whole; plank length taken from the gap instead of its number; tray order fixed; a path repeated in a pass; 0 plank; "Numbers only" draws squares at rest.
- **Pictures verified on contact sheets:** forest-creatures/rabbit, beaver, fox, squirrel; farm-animals/duckling, pig, lamb, goat; pets/tortoise. **Risks:** within-20 banks at 9 px squares on phones — drawn as two-tone strips with ticks (every square faint, every 5 bold); a 20-square road at 336 px is 15 px per square at 704 down to 15 → 9 px on phones, still countable in fives. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — planks that unfold, plop into the stream or see-saw off, and a little animal that crosses the whole path at the end.
2. **Would a teacher put it on the board?** Yes — "Is 19 the right plank? Where does it end?" Every equation becomes a part-part-whole path where the gap moves to every position, and the decoy brings out the add-the-visible-numbers error.
3. **Would a parent trust it?** Calm, library animals, no score or timer, numbers and squares only.
4. **The invention:** every equation is a gap in the path and every number is a plank exactly that long, so only the number that makes the equation true lets the walker cross.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- **Three decoys were not errors at all** (Within 10 path 5 decoy 1, Within 20 paths 5 and 9 decoys 6 and 7) — replaced by the real "subtract instead of add" error for the missing start (2, 7, 12). Measured with my own solver.
- **The decoy was a tell:** the largest of the five planks in 5 of 9 Within-20 paths. Re-chosen (paths 1 and 4 now take the smallest real error): largest 3 / smallest 3 / middle 3. New gate clause + mutation.
- **"Numbers only" contradicted itself** (no true lengths at rest, yet planks judged by true length). Now equal-width misted segments at rest; the segment redraws to scale only after a plank is committed.
- **Ownership ruled:** #090 owns G1-115 / G1-215 / G1-218 (§11 here and in row 84, which still named this row "The Domino Train" — renamed there to The Plank Path).
- **Walkers:** the hedgehog (Pim in #091) replaced by forest-creatures/beaver; facing ruled from the contact sheet (tortoise faces right; left-facing animals mirrored; pig and lamb face the viewer).
