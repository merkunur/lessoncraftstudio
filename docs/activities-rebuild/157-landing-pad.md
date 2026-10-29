# #157 — Hopper's Number Line → THE SPRING AND THE LANDING PAD (2.MD.B.6; all 11 locales)

ORDER row 157 · id `hoppers-number-line.jump-sums.2-md-b-6` (kept). Design: `designs/157-hoppers-number-line.md`.

## The invention
- **The hop is LOADED, and the landing is PREDICTED.**
  - The number line is a row of equally spaced stones across a pond.
  - The child drags Hopper (the library frog) onto the story's start stone and taps him to turn him. He hops only the way his nose points.
  - The child loads his spring with fat ten-coils and thin one-coils: 12 is one ten and two ones.
  - The child floats a lily pad on the stone where they think he will land. The pad never shows a number.
- **Let go:** one arc per coil, each from one stone to another, so the start stone is never counted.
  - If the pad is under his last landing, he lands on it and a library lotus opens.
  - If not, he splashes, and the stones between him and the pad ripple.
  - Counting the start as hop 1 splashes him exactly one stone from the pad.
- **Misses:**
  - A wrong start is graded first: he does not hop, and the story's start number is marked. The hint says "find it" when the start is printed, and "count from the nearest printed number" when it is not.
  - Wrong direction, load or count each get their own hint.
  - A self-consistent wrong build (7 coils for "hops 8", with the pad on 13) lands, then the pad sinks and the story's hop number is marked.
  - After miss 2, dotted hops show the true path, and the last stone is never named.
- **Levels:**
  - within 20 (9 rounds, counting on and back);
  - within 100 (11 rounds): windows 40–60, 60–80 and 80–100 where only every 5th stone is printed, plus a tens line that shuts the one-coil button;
  - equal hops on 0–24 (12 rounds): k hops of n from 0, or how many hops of n reach the bank at 0. In the division rounds the pad is fixed at the bank and the count is the unknown.
- **Success:** the equation in the story's shape, for example "43 + 12 = 55 — Hopper landed on 55!" or "4 hops of 3: 3 + 3 + 3 + 3 = 12. That's 4 × 3 = 12!". de, sv, da, no and fi write the product with "·".

## Deviations from the design
- **Equal hops draw ONE arc per hop.** On level 3 the arcs group the spring's coils, so "4 hops of 3" shows 4 arcs, not 12 one-stone arcs. This was a reviewer finding: the story, the success line and the prose all say "hops of 3".
- **No test hop.** Free play between rounds was left out. The only hop is the graded one, so the prediction can never be copied (the design critic's point, made structural).
- **The labels setting is Some / Every number / Every 10.** "Some" means every 2nd stone on levels 1 and 3 and every 5th on level 2. The design's level-1 default was "every number". That would have made the default identical to "every number" on level 1, so the setting would do nothing at rest (the settings-efficacy rule). A teacher who wants every number is one tap away.
- **Hopper and the pad wait on a shore strip under the pond.** They do not wait on the bank, so the bank in a division round is only ever the target.
- **No drag lens.** On phones the stone under the drag grows and turns teal. That shows the target without printing a number the line doesn't show.
- **On the narrowest phones on equal hops**, the main button sits in the second row of hop marks, so it stays above the 640-px fold.
- **da, no and fi pages are NEW** (slug, title and intro written in this build and native-reviewed). en..sv metadata is frozen and untouched; the pt mascot stays «Saltão».

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **Equal hops** were drawn as single-stone arcs. Fixed: one arc per hop, gated (I) and mutated.
- **`aOneShut`** said "every stone is 10" in all 11 locales. Corrected to "the stones go up in tens".
- **de:** «Der Frosch Hopper».
- **fr:** ok_div «jusqu’au 0».
- **es:** «brinco», used consistently.
- **it:** «il ranocchio», so the gender agrees.
- **nl:** «één», so the button is not read as the article.
- **sv:** «Efter två missar».
- **da:** «Skift antallet», and «multiplikation og division».
- **no:** «Dra Hopper til …».
- **fi:** «lähtökivelle» instead of «lähtökohtaan» (a premise).
- **Confirmed:** "·" for de/sv/da/no/fi and "×" for the rest; framework names only.

## Gates
- **Logic:**
  - `verify-landing-pad-core.js` 1,293,263/0. It keeps its own round tables, its own hop model and its own grading. It grades ~1.2 M builds × pads (exactly one wins per round).
  - The off-by-one splash is one stone away. Bots: counting the start never wins; a fixed pad stone wins ≤ 2; the middle printed number wins ≤ 2.
  - Never-repeat is checked on a replayed stream, and level 3 never has three rounds of one kind in a row.
  - `mutate-landing-pad.js` 32/32 killed, and the control passes.
- **Browser:**
  - `local-test-landing-pad.js`, 11 locales, real drags and taps: the scenarios in its header, plus 5 states × 8 widths.
  - `visual-qa-activity.js` passes; hierarchy 542/0; settings efficacy 2 live.
- **Content:** prose claims, SERP copy, content tells, next delay and preflight routes all pass.
