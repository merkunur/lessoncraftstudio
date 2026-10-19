# #35 — Sort and Count → THE SORTING CHUTES (K.MD.B.3)

ORDER row 35 · id `choice-board.sort-count.k-md-b-3` (kept).
- **Files:**
  - Added: `sorting-chutes-core.js`, `sorting-chutes-activity.js`, `sorting-chutes-activity.html`, `sorting-chutes-activities.json`.
  - Changed: the row left `choice-board-activities.json` as text (15 rows remain, CRLF kept).
  - 0 lines in any shared core.
- **Metadata:** slug, title and intro are frozen in all 11 locales; the prose is rewritten ×11.
- **Shared audit:** `audit-activity-hierarchy.js` now honours the data-mark ruling (RULINGS). Tagged graph marks need ≥ 40 / 30 px; every other picture keeps the 96 / 64 px floor.
- **Design:** `designs/035-choice-board.md`.

## The apparatus and its invention: THE BELT DELIVERS ONE AT A TIME, THE TUBES ARE THE GRAPH
- **The belt:** a mixed pile (animals, fruits, vehicles) rides it one picture at a time, waiting at the end at 104 / 72 px. The child taps a funnel or drags the picture.
- **Wrong chutes:** a wrong chute bounces the picture back and the funnel's labels flash, so every thing is classified exactly once.
- **The labels:** members of the kind that never appear in a round (cow, lion, frog / blueberry, coconut, grapefruit / motorcycle, bicycle, ship), tagged `data-mark`.
- **The tubes:** equal slots, so tube height = count. The marks are tagged `data-mark`, and a slot's size does not depend on its picture.
- **The questions:** how many (a 1–10 strip in fixed order, so position cannot tell), most / fewest (tap a tube), order (drag the tubes), how many more, and the 2 × 2 by kind and "does it fly".
- **The help** shows instead of telling:
  - lit slots and dimmed other tubes;
  - a dashed height line, with the tubes above it glowing;
  - leaning pairs where the order breaks;
  - pairing lines with the unpaired extras glowing;
  - miss 2: numerals.
- **The win:** a colour wash per kind and a belt spin.
- **Settings:** Groups (2 / 3 / 2 × 2); Tube numbers (Shown / Hidden).

## Fixes from the build (each found by a gate or a render)
- **Picture rulings:**
  - Every duck is a duckling, so the duck left the fly table (→ parrot / seagull / bat).
  - Mango reads as a peach, so it was replaced (→ kiwi / pear / orange).
  - Every count is unchanged.
- **The parrot's folder is `Things That Fly`.** Windows found the lowercase path; the case-sensitive server would have shown a broken picture.
  - The gate's existence check is now case-exact, and there is a mutation for it.
  - The local server is now case-sensitive too.
- **The 2 × 2 is one row of four tubes**, [animals: sky | ground] [vehicles: sky | ground], with cloud / grass markers under each tube. The stacked table could not fit 320 × 640 once the number strip appears.
- **The phone fold:** in the question phase the empty belt rolls away and the funnels fold (the labels stay). Tubes are as tall as the round needs (at least 5 slots); a 7-slot phone tube uses 32 px slots (marks stay at 30); the number tiles are 44 px.
- **Funnel buttons span their label row** (82 / 66 px), clearing the 44 px tap floor.
- **No undo.** A tube tap while sorting always drops: a tap on a half-full tube could have pulled its top back out, and since nothing in a tube is ever wrong, undo had no purpose.
- **Order drag landed one short** when dropped exactly on a slot's centre. A tube now goes to the nearest slot centre (found by the random starting orders in de / es / sv / fi).

## Gates
- **`verify-sorting-chutes-core.js`: 3,159 checks.**
  - Its own counts and answers from the re-typed piles.
  - Counts 1–7 (2 × 2 ≤ 5), distinct where a question compares; tube capacity holds every count.
  - The belt never runs more than 3 of a kind; an order round never starts already sorted.
  - 200 random sorting sessions: wrong chutes change nothing, and everything is classified exactly once.
  - Answer values spread; the most/fewest tube position is balanced.
  - Pictures exist case-exact, are labelled and colour; the labels never appear in a round.
  - Fly status follows its own list.
  - Layout 280–1100; strings ×11.
- **`mutate-sorting-chutes.js`:** 20/20 killed.
- **`local-test-sorting-chutes.js --locales=all`:** 615/0.
  - Real drag, tap-tap, funnel tap, wrong chute, count aid, misses, most, order by drag, pairing, the penguin, numbers hidden, keyboard.
  - The sweep covers sorting, asking and helped states, with a press hit-test.
- **visual-qa:** 54 renders.
- **Hierarchy:** 704/0.
- **Settings:** 2 live.
- **Content gates:** PASS.

## Review (one agent, native ×11 + pedagogy) — applied
- **Two-tube sums.** "How many things fly" and "animals in all" light two tubes, but miss 2 said "read the number at the top" (singular). Reading one tube gives a wrong answer.
  - New keys: `hintCountBoth` and `hintReadTopTwo`.
  - Gated, with a mutation.
- **Miss 2 added nothing visible when the numerals are already shown** (the default). It now highlights the top numeral of each asked tube in coral.
- **The boat sat under a grass marker.** "Does not fly" is now a crossed-out cloud, not grass, because a boat is not on the ground. The prose ×11 now says "with the things that do not fly", not "the ground".
- **English two-group rounds:** they ask "Which group has more / fewer?", not most / fewest (K.CC.C.6 vocabulary). New keys `pMostTwo` / `pFewestTwo` / `okMostTwo*` / `okFewestTwo*` ×11, gated, with a mutation.
- **Aria labels:** "Animals — flies" became the plural form (fly, fliegen, volent, vuelan, voam, volano, vliegen, lentävät).
- **Wording:**
  - de "vertauscht", "von unten nach oben".
  - fr "restent tout seuls".
  - it / nl / fi: "how many more" phrasing.
  - fi: "kuinka korkealle … täytetty".
  - en prose: one name per part (chute).
- **Scope, made honest in the prose:** "how many more" and the two-way questions reach towards Grade 1.
- **FROZEN-NOTE (not changed):**
  - Every locale's intro still describes the old "tap how many" mechanic.
  - fr intro: plain space before ":".
  - no: the title says Barnehage and the intro cites LK20; the prose says 1. trinn.
  - fi: the title "mittaaminen ja tieto" is a calque, and the intro says "OPS 2014".
