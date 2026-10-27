# #137 — Even or Odd? → THE CHIMNEY ROOF (2.OA.C.3; all 11 locales)

ORDER row 137 · id `choice-board.even-odd.2-oa-c-3` (kept). Design: `designs/137-choice-board.md`, the critic-reviewed sheet built on `rebuild-inputs/137-dealing-table.md`.

## The invention
- **The pour.** The child taps the bag (or holds it to pour), and every brick rolls into the **lower** column of a glass tower two bricks wide. A tie goes left, so a number becomes a two-wide tower.
- **The roof.** An even number ends flat and takes the **flat roof** (labelled "even"). An odd number leaves one brick sticking up that only the **chimney roof** (labelled "odd") covers. The wrong roof tips and slides off; that is a miss, so the verdict is never a guess between two buttons.
  - Miss 1: the top glows.
  - Miss 2: each layer's pair is bracketed, and the lone brick is ringed.
- **The equation.** The child writes the two equal parts: n = a + a, or a + a + 1 when the chimney is on. Unequal boxes never pass, even when they add up correctly (6 + 8 for 14). The equation miss counts the paired bricks under each column.
- **To 99:** the tens stand as finished slabs, five pairs each and always flat. Four bags on a shelf are roofed before the ones are poured, so the child sees that only the ones decide; wrong roofs fall back and right ones stay.
- **Setting "before the tower":** the roof hovers while the bricks pour and lands on the last brick.

## Files and wiring
- **New files:**
  - `mini tools/chimney-roof-core.js` (`ChimneyRoofCore`) holds the model:
    - pour / unpour; roof → fits or falls; before-the-tower hovering;
    - the equation with focus and auto-advance;
    - the shelf (select, seat, check99);
    - literal hint keys;
    - `plan()`: a fresh order every pass with never three of one verdict in a row. The flat roof is on the left half the time per pass, never three in a row.
  - `chimney-roof-activity.js` draws the bag, the tower (bricks two-tone teal / gold, V floor, flat roof with a flag, chimney roof with smoke), the roof rack, the equation, the keys, and the street of four houses.
    - Phones: the bag and rack hide once the roof is on, the tower compacts, and Check is the ✓ twelfth key of the 6 × 2 pad. When solved, the equation sits beside the tower.
    - CSS prefix `cr-`, `apparatusClasses: ['cr-art']`.
  - `chimney-roof-activity.html` loads the core and the activity at `?v=1`.
- **Rounds:**
  - to 10: 2–10.
  - to 20: 11–20 without 18.
  - to 99: the design's nine shelves of four bags.
  - The roof words are the shipped `labelEven` / `labelOdd`, byte for byte.
- **Manifest:** the row stays in `choice-board-activities.json`. Its id, slug, title and intro are frozen in all 11 locales. `tool` → `chimney-roof-activity`; `params` = `{num: [10, 20, 99], roof: [after, before], rounds}`. The other rows are untouched (gated).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.881 → 9.882.
- **Prose ×11:** all replaced. Each quotes the equations the activity really shows (14 = 7 + 7; 15 = 7 + 7 + 1).
- **Deviations from the design:**
  - The roof is tapped, not dragged. A tap is the verdict, as the design asks.
  - The to-99 street draws four small houses instead of one shaft emptying in turn.
  - The column counts sit under the floor.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **The maths defect, from my English:** "Write the two equal columns" is false for an odd tower, whose left column holds one more brick. That wording would teach the very misconception the activity exists to break.
  - The task line now asks for the two equal **parts**.
  - The equation hints count "the bricks in one column that have a partner".
- **"1 bricks":** the tower's label now puts the count after a label.
- **ok99:** "the tens are all pairs" became "the tens are made of pairs", because a ten is five pairs. In pt, "são todas pares" read as "are all EVEN".
- **es:** toy bricks are "bloques" in Mexico, so the strings and prose were changed.
- **Per-locale wording:**
  - en, fr, sv, no, fi miss 2: no person words, the natural construction.
  - de: "ragt oben heraus"; "Schau ganz oben".
  - pt: "Telhado plano"; "cobre esse tijolo".
  - nl, sv, da, no: the slabs are flat "at the top", not a tautology.
  - fi: "pussin päälle", "tornin huippua", "Yläpää on tasainen".

## Gates
- **`verify-chimney-roof-core.js`: 10,910 checks, 0 fail.** It checks:
  - its own pour (lower column, tie left) against the model brick by brick;
  - parity by n % 2;
  - the design's tables and their measured properties: 18/18 even, even bags per shelf position 5/4/4/5, no three of one parity side by side, every ones digit 3–4 times, no repeated ones digit on a shelf, the tens-digit rule 17/36, "two even per shelf" false in 4/9;
  - slabs as five pairs;
  - the model: a roof before the last brick, send-back, fall, miss 2, fit, no send-back after the roof, empty / unequal / sum-right-but-unequal / equal-but-wrong / right equations, the help cleared by a new move, the before-the-tower landing (fit and fall), the shelf;
  - the plan over 1,500 passes;
  - the roof words equal to the shipped labels;
  - the success lines true;
  - **hints never name the verdict**, with Unicode boundaries (`\b` cannot see «ímpar»), poisoned both ways. Exemptions are listed: pt «par» is also the noun "pair", and da «lige store» means "equally big";
  - strings ×11, prose and the manifest.
- **`mutate-chimney-roof.js`:** 21/21 killed; the control passes. The first runs caught two gaps: a roof landing one brick early, and "unequal parts accepted" (an h, h+1 case can never sum right). The gate now tests both.
- **`local-test-chimney-roof.js`:** 9,735 pass, 0 fail — real pointer, 11 locales: a roof before the bricks, 13 taps pour 13, a tap on the tower sends one back, a held press pours on its own, the flat roof on 13 falls (glow), miss 2 (six pairs bracketed, the lone brick ringed), the chimney fits with its "+ 1" card, empty Check, 6 + 7 refused, 6 + 6 + 1 → the line and Next 0.5 s, the hovering roof landing on the last brick of 14, the to-99 shelf (odd bags' flat roofs fall back, even ones stay; four right → the street and Next), numbers to 10; then every round of every setting at rest, after a fallen roof, at the equation and solved through 320…1366. The phone layout was changed after that run (the solved equation beside the tower); the phone widths were rerun on the final code: 4,290 pass, 0 fail.
- **`visual-qa-activity`:** 216 renders pass. The first run caught the shell's Next below the fold at 320 × 640 when solved.
- **`audit-activity-hierarchy`:** 326 / 0. It caught the undeclared bag and roof-icon drawings.
- **`audit-settings-efficacy`:** numbers and roof are both live.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP copy, content tells and route preflight all pass.
- **0 lines** in shared cores or `lcs-shell`.

## Live
`live-verify-chimney-roof.js` ran on production on 2026-10-27: **60 pass, 0 fail.**
- All 11 pages return 200.
- en, de, sv and fi, at 1366 and at 390, embed chimney-roof-activity.html at wrapper 9.882.
- With a real pointer:
  - 13 taps pour 13 bricks;
  - the flat roof on 13 falls with the miss line;
  - the chimney roof plus 6 and 6 gives "13 = 6 + 6 + 1 … 13 is odd".
- The iframe grows with the card.

The first run fell in the cache window: three pages still served the old embed. Once curl showed 9.882 everywhere, the second run was clean.
