# #154 — Gauge's Good Guess → THE GROWING PICTURE (2.MD.A.3; all 11 locales)

ORDER row 154 · id `gauge-good-guess.estimate.2-md-a-3` (kept). Design: `designs/154-gauge-good-guess.md`.

## The invention
- **Every estimate is a promise about size.** Tap one and the picture grows or shrinks to exactly that size, beside a 30-cm school ruler (cm rounds) or a 1-m metre stick (m rounds), drawn to ONE scale.
  - A 30-cm ant is as long as the whole ruler.
  - A 2-m truck is two metre sticks long.
  - **A wrong estimate LOOKS wrong.**
- **What the benchmark depends on:** only the unit (and, for tall things, which way it stands), never on which option is right. Level 2 always shows both benchmarks.
- **Check on a wrong estimate:**
  - a dashed ghost of the real size appears, with no number, drawn OVER the picture;
  - a hint says too big or too small, naming the ruler or the stick;
  - miss 2 brings a comparison, e.g. "A truck is about as long as four beds."; no comparison ever names the answer.
- **Below the picture floor (96/64 px):** the thing is drawn as a size bar at its true length, with the picture as a framed label on a leader line. It is never drawn at bar size.
- **Level 2 "pick the unit":** the number is given ("A bee is about 2 ___ long.") and the child chooses cm or m. The same 2 makes a bee or a bee as long as a bed.
- **Size album:** every solved thing joins Gauge's album, ordered smallest to biggest. On a phone it is a single scrolling row.

## Rounds (gate-owned, each with a believable real range; exactly one option inside it)
- **Level 1 (13 rounds):**
  - cm: ant 1 · spoon 15 · snail 3 · pencil 17 · banana 20
  - m, long: bed 2 · truck 8 · airplane 40 · ferry 100 · whale 15
  - m, tall: door 2 · lighthouse 30 · house 8
  - Every option is at least ×2 from its neighbour. Rank of the right value: smallest 4 · middle 5 · largest 4.
- **Level 2 (10 rounds, cm 5 / m 5):** bee 2 cm · door 2 m · car 4 m · key 6 cm · truck 8 m · spoon 15 cm · whale 15 m · banana 20 cm · book 25 cm · lighthouse 30 m.
  - The best "the number decides the unit" bot wins 6 of 10.

## Deviations from the design
- **bus → truck (8 m) and ship → ferry (100 m).** The library's bus is a minibus and the ship a small coaster, both about 1.2 : 1. Drawn at 12 m and 100 m they would stand 10 m and 87 m tall, taller than the house round. The truck (1.6 : 1) and the ferry (1.8 : 1) fit their sizes.
  - Comparisons rebuilt: plane = five trucks, whale = two trucks, ferry = a soccer field.
- **Ink boxes are measured from the pixels.** Only stick-like drawings turn to lie flat: spoon −90°, pencil 45°, key −90°, banana 50°. Each picture sits in a box the size of its ink, so the transparent margins take no space.
- **On a phone, the solved screen hides the question and the cards.** The success line and the "≈ 40 m" stamp carry them, so Next stays above the fold.
- **A number and its unit are joined by a no-break space** everywhere ("40 m" never splits across lines).
- **sv / da / no / fi pages are NEW** (slug, title, intro written in this build, native-reviewed). The frozen metadata of the other seven locales is untouched.
  - ⚠ The frozen nl title and intro say *groep 5*. The body prose says *groep 4* (2.MD = groep 4, as #153). Landing metadata is out of the fix-at-once rule, so this needs an operator call.

## Review (one native + pedagogy reviewer, all 11 locales)
- **Nouns and agreement:**
  - sv meterstock (not metersticken); sv snäcka, fi kotilo (the picture has a shell);
  - sv/da/no size hints use neuter *det … stort/litet* (ett hus, et skib); no *et* stiplet omriss.
- **Content and grade:**
  - banana "longer than half a ruler, shorter than the whole" (20 of 30 cm, not "a bit shorter");
  - snail "the top part of your thumb";
  - PRACTICES item 4 is now what the album shows, not an ordering task the child never does;
  - nl groep 4; no LK20 aim stated as measure-and-compare; fi *järjetön*; da *Skøn over længder*.
- **Register and typography:**
  - fr *ce ferry*, *en vrai, ça peut être aussi grand*; it *mezzo righello*;
  - quoted setting names in sv/da/no/fi.

## Gates
- **Logic:**
  - `verify-growing-picture-core.js` 10396/0 — own oracle; ink boxes re-measured with sharp; bots for value rank, card length ×11, and the number threshold; per-round card reshuffle; empty Check never a miss.
  - `mutate-growing-picture.js` 32/32 killed, control passes.
- **Browser:**
  - `local-test-growing-picture.js` 2706/0 — 11 locales, real taps, measured picture length against the benchmark, ghost, bar and label, level 2, grow-after-Check, keyboard, album order, 7 states × 6 widths;
  - `visual-qa-activity.js` 468/468 (driver `scripts/visual-qa-phases/gauge-good-guess.estimate.2-md-a-3.js`);
  - hierarchy 398/0; settings efficacy 2 live.
- **Content:** content gates ×11, prose claims, SERP copy, content tells, next-delay, preflight routes.
