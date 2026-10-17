# New 230 — The Search Lens (READINESS visual-scanning)

## 0. Identity
- id `search-lens.play.visual-scanning` · grade K · READINESS visual-scanning (framework from `frontend/lib/frameworks.ts`) · strand Logic & Visual Thinking · key `search-lens` (files `search-lens-core.js`, `search-lens-activity.js`, `search-lens-activity.html`, `search-lens-activities.json`).
- worksheets covered: K-059 Find and Circle · K-070 Shape Hunt · K-229 Find the Letter · K-327 Circle the {U} in the Words and Count · K-371 2D Shapes Around Us.
- new instrument (no old activity). The coverage sketch's "lens that leaves a trail" is kept and sharpened: a phone loupe that floats above the finger, frosted-glass trail, bead counter, and a side-by-side flip for look-alikes.

## 1. The pitch
"A magnifying lens that frosts everything it has already looked at — so the parts you have not searched yet stay bright, and you can SEE whether you searched the whole picture."

## 2. Why a child will want it again
- A magnifying glass is the most satisfying object a five-year-old can hold: things swell up under it, crisp and big. Sliding it is a pleasure on its own.
- The frost trail is visible progress — like wiping a steamy window in reverse. Children start "painting" the field with the lens on purpose, row by row, to frost it all; that is exactly the scanning strategy the skill wants, discovered as play.
- Every find pins a little coral flag on the object and drops a bead onto the string in the corner with a soft "plip" — the string fills as you find.
- The lure moment is a joke the child is in on: tag a wasp when the target is a bee and, on Check, the bee and the wasp jump up side by side, enlarged — "oh, stripes AND skinny!" — and the wrong flag drops off.
- End of round: the whole field un-frosts in a sweep, every flagged copy bounces once in reading order while the beads slide together into a neat row. No score, no timer.

## 3. The skill and the misconception
- Skill (K-059/070/229/327/371): search a busy field systematically for EVERY copy of a target — a picture, a shape in everyday objects, a letter among look-alikes, a letter inside words, a sight word — without missing one or marking one twice, and know how many.
- Misconceptions: (a) random searching that misses unvisited corners; (b) double-counting; (c) accepting look-alikes: mirror-twin letters b/d/p/q, n/u, m/w; accented twins a/ä/å, o/ö/ø; similar words; a wasp for a bee, a goose for a duck.
- Push-back by the material: the frost shows the child — before and after Check — which regions they never looked at; a missed copy that sits in a still-bright region is evidence of a search gap, not a "wrong". A copy cannot be tagged twice (a second tap removes its flag and bead). A wrong flag is answered by placing the lure next to the target, enlarged, so the difference is seen, not told.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 460):
- **Target frame** top-left: 104 × 104 rounded frame (teal 3 px, cream fill) holding the target at 88 px (picture / drawn shape / letter glyph 72 px / word 32 px).
- **Bead string** top-right: a drawn cord 220 px long with up to 10 bead sockets (beads 20 px, coral #F2784B with white highlight). No numerals.
- **The field** below: 640 × 340 cream card (radius 16), items placed on a jittered grid — Busy: 7 × 4 = 28 items, pictures 60 px; Sparse: 5 × 3 = 15 items, pictures 76 px. Letter tiles: 52 px glyphs in 56 px cells (Busy 9 × 5 = 45 cells, Sparse 7 × 4 = 28). Word field: 4 rows of words, 26 px type.
- **The lens**: a drawn magnifier, glass circle 156 px with a 4 px teal rim and a 60 px handle; inside, the field is shown at 1.8× (pictures under it reach 108 / 137 px). The lens starts parked in the field's top-left corner.
- **The frost**: a canvas over the field; every place the lens glass has passed over gets a frosted veil (white 38 % + 2 px blur of the field below it), so searched parts look misted and unsearched parts stay vivid.
- **Check** ("Done looking") under the field, right-aligned, 48 px tall.

At 360 (stage ≈ 336 wide): target frame 72 × 72 and bead string (beads 16 px) share one row; field 336 × 288 — Busy 6 × 4 = 24 items at 40 px; Sparse 4 × 3 = 12 items at 56 px; letters Busy 7 × 4 at 40 px cells; lens 124 px glass at 1.9× (items under it 76 / 106 px — every tap target under the lens ≥ 64 px). On touch the lens floats **64 px above the finger** (a loupe), so the finger never covers what it looks at. Check under the field: field bottom ≈ 72 + 10 + 288 = 370 px from stage top → above the 360 × 740 fold; at 320 the field is 296 × 256 and items 36 / 50 px (lens 112 px, ×2.0).

Library pictures (verified in `mini tools/pictures/*.json`, seen on contact sheets 2026-10-17):
- picture rounds: farm-animals/duck, goose, pig, cow, sheep, lamb; insects-and-bugs/bee, wasp, ladybug, butterfly; forest-creatures/snail; vehicles/taxi, car, bus, van, truck, train; fruits/lemon, orange, pear, banana; animals/dog, cat, rabbit; ocean-life/crab, starfish, clownfish; toys/kite, balloon, ball, car. Rulings: farm-animals/hen vs chicken are one drawing (never target-vs-lure); farm-animals/chick vs duck are too close for K at 40 px (never target-vs-lure); fruits/cherry is drawn as an apple (unused).
- shapes-around-us: circle objects around-the-house/clock, classroom/clock, kitchen-tools/plate, bakery/cookie; rectangle objects around-the-house/door, classroom/whiteboard, classroom/tablet, post-office/envelope, classroom/calculator, around-the-house/rug. Ruled out on the contact sheet: around-the-house/window (arched top), television (rounded corners), furniture/mirror and music/drum (ovals), kitchen-tools/timer (bells).
- Letters and words are type (Nunito 800, school-print a and g single-storey via the shell's "school" font variant). Shapes (target frame in the shapes setting) are drawn SVG.
No words on the apparatus except the letters/words that are the content.

Task line (EN): pictures "Find every {noun} like the one in the frame." · shapes "Find everything shaped like a {shape}." · letters "Find every {letter}." · letters in words "Find every {letter} in the words." · words "Find every “{word}”."

## 5. The hand
- **Drag the lens** (pointer: grab the glass or handle; touch: drag anywhere on the field — the loupe floats 64 px above the finger) → it follows within one frame; the frost paints under the glass continuously (canvas `destination-over` circle per pointer sample, interpolated so fast drags leave no gaps).
- **Tap an item seen inside the lens** (a press that moves < 8 px) → a coral flag pins onto the item's top-right (pop 120 ms), a bead drops onto the string (bounce 180 ms, "plip" 880 Hz). Items outside the glass cannot be tagged (a tap outside the glass moves the lens there instead) — searching and tagging are one act.
- **Tap a flagged item** (inside the lens) → the flag lifts off and its bead rolls back: undo, and the structural guard against double-counting (an item can carry one flag only).
- Keyboard: arrows move the lens one cell; Space/Enter tags the item nearest the glass centre; Tab reaches Check.
- Free play: before the first tag and after success, the lens can be dragged anywhere and the frost wiped clean by a small "fresh glass" round button beside the bead string (it does not remove flags).
- Optional TTS: tapping the target frame speaks the target ("bee", "b", "was"); letters are spoken by letter name per locale.

## 6. The rounds
One round = one field, one target, 3–8 copies (never 0), spread so every quadrant holds ≥ 1 copy in at least 2 of every 3 rounds (gate: no quadrant empty in more than 1 round in 3 across a pass). Each lure appears ≥ 2 times per round where listed. Fillers fill the remaining cells. **Field: Sparse / Busy** changes only the number of fillers and the item size (copies and lures identical).

**Target: pictures** (K-059)
| # | target | copies | lures (×2 each, Busy ×3) | fillers |
|---|---|---|---|---|
| 1 | farm-animals/duck | 5 | farm-animals/goose | pig, cow, sheep |
| 2 | insects-and-bugs/bee | 6 | insects-and-bugs/wasp | ladybug, butterfly, forest-creatures/snail |
| 3 | vehicles/taxi | 4 | vehicles/car, vehicles/van | bus, truck |
| 4 | fruits/lemon | 5 | fruits/orange, fruits/pear | banana |
| 5 | animals/dog | 7 | animals/cat | rabbit, farm-animals/pig |
| 6 | farm-animals/lamb | 4 | farm-animals/sheep | cow, goose |
| 7 | ocean-life/crab | 3 | ocean-life/starfish | clownfish |
| 8 | toys/kite | 6 | toys/balloon | toys/ball, toys/car |
| 9 | vehicles/bus | 8 | vehicles/truck | van, train |
(Copies are identical instances; lures are never mirrored versions of the target — mirror lives in #229.)

**Target: shapes in objects** (K-070, K-371) — target frame shows a drawn circle or rectangle; every object is one or the other.
| # | target | copies (objects) | the other shape |
|---|---|---|---|
| 1 | circle | 4 (clock, plate, cookie, classroom/clock) | 6 rectangles |
| 2 | rectangle | 5 (door, whiteboard, tablet, envelope, rug) | 5 circles |
| 3 | circle | 6 | 5 rectangles |
| 4 | rectangle | 3 | 7 circles |
| 5 | circle | 5 | 6 rectangles |
| 6 | rectangle | 7 | 4 circles |
| 7 | circle | 3 | 8 rectangles |
| 8 | rectangle | 6 | 5 circles |
| 9 | circle | 8 | 4 rectangles |
Objects repeat as identical instances within a round (e.g. two plates) drawn from the four circle / six rectangle nouns, each noun ≥ 1 per round where it fits. **Field** in shapes rounds: Sparse = exactly the table's items (10–12, 76 px); Busy = the same items at 60 px plus 8 fillers that have no flat face shape at all (animals/dog, cat, rabbit; farm-animals/pig, sheep, cow — never a fruit, ball or other round object, which would be a second circle), so the eye must also skip things that are no shape. The other-shape objects are the lures (a child who taps "everything round-ish or square-ish" is caught by them).

**Target: letters** (K-229, K-327) — lowercase school print; mirror twins ≥ 2 each.
| # | target | copies | look-alikes (≥ 2 each) | form |
|---|---|---|---|---|
| 1 | b | 5 | d, p, q | tiles |
| 2 | d | 6 | b, p, q | tiles |
| 3 | p | 4 | q, b, d | tiles |
| 4 | n | 5 | u, h, m | tiles |
| 5 | m | 4 | n, w | tiles |
| 6 | t | 6 | f, l, i | tiles |
| 7 | a | 5 | o, e + locale twins | tiles |
| 8 | e | 6 | in words (K-327) | words |
| 9 | a | 7 | in words (K-327) | words |
Locale twins for round 7 and the a/o rounds: sv a + ä, å · fi a + ä · da/no a + å, æ (o with ø where an o round is added) · de a + ä · others: o, e only. Rounds 8–9 use 5–6 words per row × 4 rows from the locale's own sight-word list (`scripts/worksheet-gen/data/literacy/sight-words.js`, words 0–23); the letter is tapped inside the word; copies counted per letter, not per word ("see" holds two e's).

**Target: sight words** — target and every field word come only from the locale's 24-word list; lures are the list's words sharing the target's first letter or length (chosen by the build script, listed in the manifest, native-checked). EN rounds (target · copies · lures): the 5 (they, this) · see 6 (she) · and 4 (are) · can 5 (come) · look 4 (little) · was 6 (went, we) · said 5 (she, see) · here 4 (have) · play 6 (look, down — same length; the list has no other p-word). Gate: every target and lure is in the list; each round has ≥ 1 lure sharing the first letter or the length.
- **Answer position**: there is no option row — the answer is the set of tags. Copies' cells are drawn per round from a seeded jitter grid under the quadrant rule; lures never cluster (≤ 2 in one quadrant).
- **Order**: order-only reshuffle per pass (`nextTask`); item cells re-seed on every showing.

## 7. Check, the misses, the success
- Check with no tag → bubble "Slide the lens and tap each one you find." (no miss)
- Check with all copies flagged and no wrong flags → success.
- **miss 1** (missed copies and/or wrong flags):
  - every wrong flag: the lure and the target fly up side by side above the field (both 96 px in matching frames) for 1.6 s, then the wrong flag falls off and its bead rolls away.
  - missed copies inside still-bright (unsearched) area: those bright patches pulse twice (white edge glow) — "you have not looked there yet".
  - missed copies inside frosted area: the quadrant holding them gets a dashed outline.
  - hint EN: "Some are still hiding. Look where the glass is still bright." (or, if all missed copies are in frosted parts: "Some are still hiding where you already looked. Look again, slowly.")
- **miss 2**: each missed copy shows a soft target-coloured halo through the frost; hint "Look for the glowing ones."
- any new lens move or tag takes the help away until the next Check.
- **Success**: the frost sweeps off left to right (600 ms), each flagged copy bounces once in reading order (stagger 90 ms) and the beads slide into a tight row. Bubble: pictures "You found all {n} {noun_plural}!" · shapes "You found all {n} things shaped like a {shape}!" · letters "You found all {n} {letter}s!" (letter-name frame per locale) · words "You found “{word}” {n} times!"

## 8. Settings
1. **Target**: Pictures / Shapes around us / Letters / Words — the field and the target frame change at rest.
2. **Field**: Sparse / Busy — the number and size of items change at rest (15 vs 28 on desktop).

## 9. Words (EN source)
- title "The Search Lens"
- instruction "Slide the lens over the picture. Tap every one you find — the glass frosts where you have already looked."
- prompts: "Find every {noun} like the one in the frame." · "Find everything shaped like a {shape}." · "Find every {letter}." · "Find every {letter} in the words." · "Find every “{word}”."
- Check "Done looking" · fresh glass aria "Clear the frost"
- hints: "Slide the lens and tap each one you find." · "Some are still hiding. Look where the glass is still bright." · "Some are still hiding where you already looked. Look again, slowly." · "Look for the glowing ones."
- celebrations: "You found all {n} {noun_plural}!" · "You found all {n} things shaped like a {shape}!" · "You found all {n} {letter}s!" · "You found “{word}” {n} times!"
- settings: "Target" — "Pictures" / "Shapes around us" / "Letters" / "Words" · "Field" — "Sparse" / "Busy"
- aria: lens "Lens over row {r}, column {c}"; item "{noun}" + "flagged"; bead string "{n} found".

Locale traps:
- Plurals with numbers: `{n} {noun_plural}` uses the vocab plural; fi uses the partitive SINGULAR after numerals ("6 mehiläistä") — author an fi frame "Löysit kaikki {n}" + partitive from a per-locale form table, never the nominative plural; de/nl/sv/da/no plural forms from vocab.
- Letter plural: "b's" does not exist in other languages — use a frame like "{n} kertaa {letter}" (fi), "{n}-mal das {letter}" (de), "{n} fois la lettre {letter}" (fr), "la letra {letter} {n} veces" (es), "a letra {letter} {n} vezes" (pt), "la lettera {letter} {n} volte" (it), "{n} keer de letter {letter}" (nl), "bokstaven {letter} {n} gånger" (sv), "bogstavet {letter} {n} gange" (da), "bokstaven {letter} {n} ganger" (no).
- "shaped like a circle": article/gender of the shape noun per locale (un cercle / un círculo / um círculo / un cerchio / ein Kreis → "wie ein Kreis" / een cirkel / en cirkel / en cirkel / en sirkel / ympyrän muotoiset) from geometry-words.js.
- Alphabets: sv/fi/da/no/de rounds include their own letters as look-alikes (ä/å/ö/æ/ø/ü); the build never uses a letter outside the locale alphabet as a TARGET. In fi, b/d/p rounds stay (they are taught as letters of the alphabet in esiopetus), but the target pool also includes Finnish-only twin rounds a/ä, o/ö so fi children get look-alikes from their own writing.
- School print: single-storey a and g in every locale (the font variant); Nordic school fonts write a with a single storey too.
- Sight words: never translated — each locale uses its own frequency list; word rounds are authored per locale (9 rounds each), gate: every field word ∈ that locale's list.
- Quotation marks: “…” en/nl, „…“ de/da, « … » fr/no (with narrow no-break space in fr), «…» es/pt/it, ”…” sv/fi.

## 10. Sound off, access, phones
- Legible silently: the frost, flags, beads, side-by-side flip and halos carry every message.
- Keyboard path in §5; the lens position is announced ("row 2, column 5") via aria-live; tagging announces "{noun} flagged — {n} found".
- Taps: under the lens every item ≥ 64 px on phones (lens magnification sized from the measured item size, gated), Check 48 px, fresh-glass button 44 px.
- Pictures ≥ 96 px when magnified at 704 (108 Busy) and ≥ 64 px magnified on phones; the unmagnified field items are smaller by design (the field is a busy scene — that is the skill), which is why only magnified items are tappable.
- Phone layout: loupe offset above the finger; target frame + beads in one row; Check right under the field, above the 360 × 740 and 320 × 640 folds.
- prefers-reduced-motion: no bounce, frost still paints (it is information, not decoration).

## 11. Distinct from
- #12 Peek Window and #16 Bug Jar: counting a set; here the skill is searching a field for a target among lures — counting is the by-product.
- #229 The Blink Viewer: compares two pictures for identity; the lens searches for many copies in a field (no mirrored lures here, by design, to keep the two apart).
- K-371-style choice boards and #37 Identify the Shape: naming a shape; here the shape is found in everyday objects.
- #263 The Field Lens (other batch, NGSS animal coverings): a lens that enlarges ONE patch of one animal so its fur/feathers/scales can be seen before it is filed in a drawer — a magnifier as a microscope. Here the lens is a SEARCH instrument whose frost trail records where the child has looked; nothing is enlarged for inspection, and the invention is the trail, not the magnification.
- No tool has a lens or a search trail (checked `cov/tools.txt`).

## 12. Build plan
- **Core state**: `{target, items:[{id,kind,ref,cell,isCopy,isLure}], flags:Set, frost:bitmap(64×40 cells), lensPos, misses}`; functions `buildField(round, density, seed)` (jitter grid + quadrant rule), `tag(id)` / `untag(id)` (only if under lens), `coverage()` (frosted fraction), `check()` → `{missedBright:[ids], missedFrosted:[ids], wrong:[ids]}`, `nextTask`.
- **Gate's own ground truth** (`verify-search-lens-core.js`): re-derives copy counts from the round tables; asserts 3 ≤ copies ≤ 8, quadrant rule over 200 seeded fields, lures ≥ 2 each, item cells never overlap (min centre distance ≥ item size × 1.1), every word ∈ the locale list, every letter target ∈ the locale alphabet, each picture noun exists and is colour (no localized B&W suffix), magnified item size ≥ 64 px at 320/360 and ≥ 96 at 704 (from the layout function), and a double tap cannot create two flags.
- **Mutations**: copies 0 · a quadrant always empty · lure missing · untag leaves the bead · tag allowed outside the lens · missed-bright classified as frosted · fi plural uses nominative · letter target outside alphabet · lens magnification below 64 px at 360 · word not in list · cherry used.
- **Local test**: real pointer drags of the lens along a serpentine path, tags, untags, Check paths (miss 1 bright, miss 1 frosted, wrong flag, success) at 7 widths × 11 locales; canvas readback asserts frost under the visited path and none elsewhere.
- **Contact-sheet re-check at build**: ocean-life/crab vs starfish at 40 px; vehicles/taxi vs car at 40 px; bakery/cookie reads as a circle.
- **Risks**: frost canvas performance on low-end phones (paint at 64 × 40 cells, upscale with CSS blur); the magnified copy inside the lens is a second DOM layer with a clip-path — keep the field DOM ≤ 45 nodes.
- Nothing BLOCKED.

## 13. The four questions
1. Yes — a magnifier that swells things up and a field you can frost by sweeping is irresistible, and every find drops a bead.
2. Yes — it makes the searching STRATEGY visible (the bright patches are the parts never looked at), it handles b/d/p/q and ä/å honestly, and it covers five worksheets.
3. Yes — calm, library pictures and clean type, nothing marked wrong, a lure is answered by showing it beside the target.
4. A magnifying lens that frosts everything it has already looked at, so the unsearched parts stay bright and the child can see whether the whole picture was searched.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- The Field setting was undefined for the shapes-around-us rounds (every item is a copy or the other shape): Sparse = the table only, Busy adds 8 animal fillers that have no face shape — never a fruit or ball, which would be a second circle.
- Named the difference from #263 The Field Lens (a magnifier used to inspect one patch) — here the invention is the frost trail that records the search.
- Checked on the contact sheets: duck vs goose, taxi vs car, lemon vs orange, crab vs starfish, kite vs balloon all read apart at 40 px; the six rectangle objects and four circle objects read as their shapes (classroom/tablet is drawn tilted — still a rectangle); window, television, mirror, drum and timer stay ruled out.
