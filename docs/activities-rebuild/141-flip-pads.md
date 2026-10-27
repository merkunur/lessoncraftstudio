# #141 — Hopper's Lily Hops → THE FLIP PADS (2.NBT.A.2; all 11 locales)

ORDER row 141 · id `skipcount.fill.2-nbt-a-2` (kept). Design: `designs/141-skipcount.md`.

## The invention
- **Split-flap pads.** Every lily pad shows its number on split-flaps. The empty pad arrives as a copy of the pad before it, and the child flips it forward (or back) by one hop: the top half of a flap flips it forward, the bottom half back.
- **The flaps never carry.** From 95 to 100, flipping the ones past 9 leaves the tens alone, so the child flips the tens and the hundreds by hand. That is the crossing of a ten or a hundred in a count.
- **The misses:**
  - **Miss 1:** a leap meter arcs from the pad before to the empty pad and shows the child's hop (+1, −5) in coral, beside Hopper's own hop (+5) in teal.
  - **Miss 2:** the pad before is lined up over the board, with the hop under its place, and the flaps that must change are ringed.
  - A faint tally under the board counts the clacks, so five clacks of the ones flap are visibly +5.
- **The number line.** Chains that start at their own step (10, 20, 30… · 2, 4, 6… · 25, 50… · 50, 100…) lie on a number line from a printed 0 tick, with a group of dots (or ten-rods) on every pad. Other chains wind.
- **Find-the-hop rounds:** the board is Hopper's sign — a + / − flap and three digit flaps.
- **The end-of-round show:** the chain stacked as a column, with the place that changes on every hop striped.
- **Hopper** is the library frog (`pets/frog`), mirrored to face along the chain.

## Files and wiring
- **New files:**
  - `mini tools/flip-pads-core.js` (`FlipPadsCore`) holds the model:
    - the three sets of 11 rounds, from the design;
    - flaps with leading blanks; `flipDigits`, which never carries (a leading flap cycles blank → 1…9 → blank, so it never shows a leading 0);
    - `check()` with literal hint keys;
    - `changing()`, `stripe()`;
    - `plan()`: a fresh order every pass;
    - "up only" drops the going-down rounds.
  - `flip-pads-activity.js` (`FlipPadsActivity`, prefix `fp-`, `apparatusClasses: ['fp-art']`) draws the pond, the chain, Hopper, the meter, the board with its halves, the tally, the ladder and the show.
    - Phones: the chain wraps into two rows, and only Hopper's row reserves room for him.
    - When a round is finished on a phone, the column show takes the pond's place.
  - `flip-pads-activity.html`.
- **Manifest:** the row stays in `skipcount-activities.json`.
  - The en..sv slug / title / intro are frozen.
  - da/no/fi get a new slug, title and intro, so the row now ships in 11 locales.
  - `tool` → `flip-pads-activity`; params = `{by: [5, 2, 25], dir: [both, up], rounds}`.
  - The old `skipcount-core.js` / `-activity.js` stay on disk, unused.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.885 → 9.886.
- **Prose ×11:** all written. Each quotes 95 → 100, +5, 10, 20, 30, +25 and −50, all from real rounds.
- **Deviations from the design:**
  - The row stays in the shared manifest, like #138–#140.
  - The free-play pond growth after a round is left out.
  - There is no fast-swipe repeat flipping; taps only.
  - On phones the finished round shows the column in place of the pond.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **A false claim in the prose, every locale:** "a hop of 10 flips *only* the tens flap" is false for 390 → 400 and 900 → 1000. "Only" was removed in all 11 locales and in the new da/no/fi intros.
- **The instruction explained only "past 9" forwards.** It now says "if a flap goes all the way round, flip the next flap yourself", which also covers going down. sv/da/no also dropped "forward" from it.
- **Miss 2 said "Line them up"** while the tool had already lined them up. It is now "Look at them lined up:" in every locale.
- **The school term for crossing in a count:**
  - de "Zehner- und Hunderterübergang" (not Bündelung);
  - sv "tiotals- och hundratalsövergången" (not växling);
  - da "tieroverskridningen";
  - no "tierovergangen";
  - fi "kymmenylitys / sadanylitys", "tasakymmen / tasasata" (not ryhmittely).
- **de:** "Die Klappen denken nicht mit", setting "Schrittweite".
- **fr:** "Une erreur fait apparaître une jauge de bonds"; "le passage à la dizaine et à la centaine".
- **es:** "de 2 en 2, de 3 en 3 …" (the old "de 2, 3 y 4 en adelante" meant "from 2 onwards").
- **pt:** "até completar um pulo" ("em um pulo" means "in a flash"), and "vai um".
- **da / no / sv:** "det forrige blad" / "det forrige bladet" / "det förra bladet" (not "bladet før/före").

## Gates
- **`verify-flip-pads-core.js`: 25,849 checks, 0 fail.** It checks:
  - **My own split-flap rule against the core** for every number 1–1000, every flap, both directions: no carry, never a leading 0, never a blank inside a number.
  - **The 33 rounds:**
    - every chain arithmetic, no 0, nothing above 1000;
    - buds never on the first pad, at most 6 of 16 on the last;
    - crossing buds 5 / 5 / 10, going-down rounds 2 / 2 / 3, four-flap chains 1 / 0 / 1 (the design's measured numbers);
    - the number line exactly on the bank chains;
    - "up only" drops exactly the going-down rounds.
  - Each pattern of the old activity's 11 rounds, read from git, has a counterpart.
  - **Every verdict:**
    - the copy is checked without a miss;
    - the leap meter keeps its sign (+1, −1, +10 on a going-down round flipped forward);
    - miss 2 rings exactly the places that must change;
    - the second bud arrives as a copy of the pad before it;
    - find-the-hop sign and size.
  - The plan.
  - Strings ×11: the true minus sign (U+2212), no digit in a hint, never "free", the lines true.
  - Prose ×11, which must quote 95 → 100, +5, 10, 20, 30, +25 and −50 (all real rounds).
  - The manifest.
- **`mutate-flip-pads.js`:** 25/25 killed; the control passes. The first run left two alive:
  - The meter losing its sign: the gate had never sent a pad backwards in an up round.
  - A badly chosen mutation: 85 → 90 also crosses a ten.
- **`local-test-flip-pads.js`: 9,647 pass, 0 fail** (real pointer, 11 locales). It covers:
  - 85, 90, [95], [100], 105 played by hand:
    - Check on the copy;
    - 91, then the meter shows +1 beside +5;
    - 95, with five clacks and five tally dots;
    - the next pad arrives as 95;
    - five more clacks of the ones give 90 (no carry), meter −5;
    - miss 2 lines up 95 with three flaps ringed;
    - the hundreds and tens by hand give 100;
    - the round line, the column show, then Next 0.5 s later.
  - Going down, flipped forward: +10 beside −10.
  - Find the hop: untouched, then +50 against a shrinking chain, then −50.
  - "Up only" leaves 9 rounds.
  - Every round of every set at rest, at a miss and solved through 320…1366: frog and pads inside the pond, every numeral inside its drawing.
- **`visual-qa-activity`:** 264 renders pass. The first runs failed at 320 px after miss 2 and on a finished round. Fixed:
  - only Hopper's row reserves room for him;
  - the ladder is compacted and the tally hidden during miss 2;
  - a finished round on a phone shows the column instead of the pond and the board.
- **`audit-activity-hierarchy`:** 266 / 0. The first run caught the pond's SVG without its apparatus class.
- **`audit-settings-efficacy --tool=flip-pads-activity`:** both settings are live at rest.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the renders** found what no gate had:
  - pads and the frog's head clipped by the pond edge;
  - Hopper covering his own hop sign and the meter label;
  - blank places in the ladder and the column show drawn as dark boxes.

  All fixed.
- **0 lines** in shared cores or `lcs-shell`.

## Live
(pending)
