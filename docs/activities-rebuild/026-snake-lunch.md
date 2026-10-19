# #26 — Clunk's Lost Lunch → THE SNAKE-GROOVE LUNCHBOX (K.OA.A.3)

ORDER row 26 · id `clunks-lost-lunch.make-total.k-oa-a-3` (kept) · own files `snake-lunch-core.js`, `snake-lunch-activity.js`, `snake-lunch-activity.html`, `snake-lunch-activities.json`; `clunks-lost-lunch-activities.json` is now `[]`. Metadata en..nl frozen; sv/da/no/fi slug, title, intro and prose are NEW, plus GRADE_OVERRIDE '1' and an sv STRAND_OVERRIDE "Taluppfattning och tals användning". Design: `designs/026-clunks-lost-lunch.md`.

## The apparatus and its invention: A LID THAT ONLY SHUTS WHEN THE LUNCH IS EXACT
- **The snack wall:** strands of identical library treats, one kind per round (strawberry, blueberry, raspberry, muffin, cookie, donut or cupcake). On its peg, each strand shows one treat (96 px wide, 64 on phones), a number tag and k dots. The tags can be hidden, and the dots stay.
- **The lunchbox:** a snake groove of exactly N cups, in rows of five with a hairpin (row 2 runs back). N is on the front plate.
  - Tap or drag a strand: it snakes into the next k cups, one "plip" per cup at rising pitch.
  - Tap a treat in the box: its whole strand slithers back to the wall. Locked strands have a brass clip.
- **The lid:**
  - Shuts by itself exactly full.
  - Over empty cups it stops short (a gap).
  - With too many treats, the extra hang off the groove's end as beads and the lid bonks.
  - Three lid taps without a change make the empty cups count on from the full ones (7, 8, 9, 10).
- **Clunk** (library toys/robot) shows his number in a cloud. The feed lever is padlocked until the lid shuts. Feeding an open box is never a miss.
- **The lunch log** prints each lunch biggest part first (10 = 6 + 4). A lunch is the SET of strands, so 4 + 6 is a repeat.
- **Round kinds:**
  - ANY WAY: two different lunches, with "now a whole new way" after the first;
  - TWO WAYS;
  - HALF PACKED: one locked strand, add one;
  - FINISH WITH TWO;
  - EXACTLY 3: 6 + 4 shuts the lid and is refused;
  - ONLY THESE;
  - TOO FULL: take strands out;
  - WHAT DID CLUNK EAT?: tap the cloud and pick the whole on keys 2–10 or 2–14.
- **Help:**
  - Miss 1 names the rule.
  - Miss 2 makes every strand that could still finish a valid new lunch glow (never just one).
  - In WHAT DID, miss 2 numbers the cups 1 … n−1 and "?".
- **Snack bar:** free play with a box of 2–10, strands 1–9, and the log writes itself.

## Rounds
- The design's three tables (Up to 5 · 6 to 10 · Big lunch to 14). The gate re-derives every solution list by its own brute force.
- One design defect was found by mutation and fixed at the source. The FINISH WITH TWO wall 1, 2, 2, 3 had no full box with other than two strands, so its rule could never bite. The wall is now 1, 2, 2, 3, 4: a single 4 fills the box and is refused. The gate now forbids a vacuous FINISH wall, as the design already did for EXACTLY K.
- No 0 anywhere.
- Pegs are shuffled each round and each restock. The single right strand of HALF PACKED lands on every peg within ±3 % over 10 000 seeds.
- Every pass opens on ANY WAY, never two TOO FULL / WHAT DID rounds side by side, never the same order or seam.
- Settings: Lunch size · Number tags (Show / Hide).

## Layout
- Wide: the wall and the box on the left (cups 96), Clunk on the right in a 120 px column (cloud, robot 100, lever, log).
- Narrow: Clunk's row on top; the box edge to edge with 2 px gaps (cups 64 at 360).
- Below 326 px:
  - the wall is one sideways-scrolling row (the design's own 320 answer);
  - the "Snack bar" button rides in Clunk's row;
  - cups are 57 px (the design's recorded exception).
- The lid is a 46 px hinged tab, a real tap target.

## Gates
- `verify-snake-lunch-core.js` 2 153:
  - tables and solution lists by brute force;
  - lid shut ⇔ Σ = N and overflow = Σ − N over every subset of every wall;
  - the feed accepts exactly the right lunches over every box of every round;
  - the clip rule is never vacuous;
  - single answers are unique;
  - pegs ±3 %, order, help, layout floors, pictures and strings ×11.
- `mutate-snake-lunch.js` 33/33.
- `local-test-snake-lunch.js` 482/0: real taps and a real drag, 11 locales, sweep 320–1366.
- `visual-qa` 54 · `hierarchy` 674/0 · settings 2 live · preflight, content ×11, prose-claims, SERP, tells, answer-rank PASS.
- The old `verify-make-total-core.js` and `local-test-clunks-lost-lunch.js` exit "retired".

## Review (one agent, native ×11 + pedagogy) — applied
- **MUST-FIX:**
  - The prose said "a wrong lunch is never fed". A full box that breaks the rule IS fed and refused, so it now says "a box that is not exactly full is never fed" ×11.
  - howToPlay called one treat a "snack", while "snack" means a strand everywhere else. It now says "treat" ×11.
  - de/it repeat hints told the child to repack the SAME lunch.
  - no "talllapp" → "tall-lapp" (no triple consonant).
  - fi had a stray third term for a lunch.
- **SHOULD-FIX (applied):**
  - The instruction now reads "must be exactly full", true for every kind ×11. It had already been rewritten once before review so that too-full and what-did rounds are covered.
  - en "{g} cups are full".
  - fr "fais 10", "convenir", and U+202F throughout the UI.
  - es "Perfecto" and "bocados" (golosina = candy).
  - nl/da "until the lid shuts".
  - da "Fodringshåndtag".
  - no "forsvunne matpakke".
  - sv "tiokamraterna".
  - fi intro wording.

## Traps
- **A rule that can never bite is a pedagogy defect, not just a weak test.** The design's critic caught it for EXACTLY K, but the same hole sat in FINISH WITH TWO until the mutation "FINISH ignores the two" survived. Every constraint round needs a gate that a full box breaking it exists.
- **Second time this trap has appeared:** an entry animation that scales a picture fails the picture floor mid-animation (#8). The plip is now a slide.
- A rotated hinged lid measured 9 px tall: tap targets are measured on the transformed box.
- A Python print of "→" crashed on the Windows console AFTER the file had been written. Print ASCII in edit scripts.
