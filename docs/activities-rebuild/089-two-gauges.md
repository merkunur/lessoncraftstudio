# #89 — Fixit's Fix-It Corner → THE TWO GAUGES (1.OA.D.8 + G3-350 balance + to 100, all 11 locales)

ORDER row 89 · id `fix-it-corner.missing-part.1-oa-d-8` (kept). Design: `designs/089-fix-it-corner.md`.

## Files and wiring
- **New files:**
  - `mini tools/two-gauges-core.js`: 3 levels × 9 rounds; the sweep with its zero pin and stop pin, the pull, the hints by kind of blank, the counting path, the prompt, the plan.
  - `two-gauges-activity.js`
  - `two-gauges-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `tg-`.
- **Pictures:** the nine gadgets, all colour library pictures opened on a contact sheet before use: kitchen tools toaster, blender, kettle, mixer and microwave; toys robot, train and helicopter; around-the-house fan. Fixit is never drawn: there is no mole in the library, and he is the voice in the bubble.
- **Manifest:**
  - The row STAYS in `fix-it-corner-activities.json`, as in rows 83–88. The design proposed a new json.
  - `params` mirrors the core.
  - en/de/fr/es/pt/it/nl slug, title and intro are frozen (sha1 `97e9b3ba…`, checked).
  - sv/da/no/fi metadata is new and was reviewed.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.830.
- **Legacy gates:** `verify-fix-it-core.js` and `local-test-fix-it-corner.js` exit 0 with a pointer. `fix-it-core.js` is untouched.
- **Sources:** scratchpad `tg-manifest.js`, `tg-meta.json`, `tg-prose.json`, `tg-dump.md` (the reviewer's text), `tg-fix1.js`, `tg-fr.js`, `tg-probe.js`.

## The invention
**Every gadget has two gauges, one for each side of the equals sign, and it only runs when both needles point to the same number.**
- **The lever.** The child puts one number in the socket and pulls the lever. Each needle sweeps its side number by number: coral, then teal, then gold, and a take-away runs the needle BACK on an inner ring.
- **A match:** the needles turn gold, the "=" plate lights, the grey gadget floods into colour, and a gear lands on the shelf.
- **Too much or too little** bonks the stop pin or the zero pin.
- **At rest,** a side without the socket shows its reading. When the socket stands alone on its side (a result), both needles stay on 0, so the answer never shows before the lever.
- **Miss 1:** a ghost line on each gauge where the other side reads, with the gap lit between them.
- **Miss 2:** the counting path, numbered from the tick AFTER the start, plus a hint chosen by the kind of blank. No hint prints the answer.
- **Replay:** tapping a gauge after a run replays its needle slowly.

## Rulings this build made
- **All nine gadgets in every pass.** The design kept blender and mixer apart because their German names clash, but the gadget's name is never shown or spoken here. The gadget order reshuffles every pass (gate-measured).
- **"Big gadgets" is called "To 100" on screen,** in every locale, because it says what changes.
- **The socket's pad** is two rows of ten on wide screens, so the lever stays above the fold. The to-100 drums lie flat (▼ digit ▲) on a phone.
- **"Workshop" free play is not built,** as at #86 and #88.
- **The wall and chain panels** are drawn as the strip: bricks with the top brick raised; stations with arrows. On a phone the sides size to their chips.
- **Reviewer fixes, applied at the source:**
  - **Pedagogy:** a difference (9 − 7 = □, 16 − 7 = □) is no longer "count back 7", the most error-prone grade-1 strategy. It counts UP from the number taken away: "Count the steps from 7 to 16". The path's length is the answer. The design said count back; the reviewer's argument is standard practice, and `hBack` is gone.
  - **Prose ×11:**
    - "number wall" named the addition pyramid in de/nl/Nordic; it is now "a jump of exactly ten";
    - "whole tens" became "mostly whole tens";
    - the result blank now includes differences (sv "svaret", fi "tulos").
  - **English source:**
    - make-10: "Make the right side exactly 10!" ×11 (the old "Fill it up" had no referent);
    - "What number, take away {b}, leaves {c}?";
    - "number by number".
  - **Native fixes:**
    - de pSub/pDiff;
    - nl pSub/pMin/pAdd1/okAll;
    - no "Hvert ødelagt apparat";
    - es pAdd2/pSum;
    - it pMin;
    - fr "comme aide";
    - fi: väli, "pois otettava luku", pChain.
  - **Rejected:** a grade in the no title (the #84 ruling).
- **Two layout defects found by the sweep:**
  - at 320 × 640 the stacked drums pushed the lever below the fold;
  - the five-chip chain overflowed the card up to 412 px.
- **Renders read by me:**
  - the coloured trails sat on the dial numerals and hid them on a phone; they moved inward;
  - the counting path's numbers crowded the hub; they now sit on the tick ring inside their dots, every k-th where the ticks are close;
  - a focus ring wrapped the whole stage on success.

## Gates
| Gate | Result |
|---|---|
| verify-two-gauges-core (own oracle: the design's 27 equations as text, solved by brute force with its own sweep and pins; EVERY socket value of every round; at rest no needle on the answer; miss 1 / miss 2 hints, whose numbers and rendered English never contain the answer; the counting path's length or end; the prompt names the right blank; answers distinct, socket 5 left / 4 right, every blank kind; the typical error ≥ 3 away; the plan and the gadget reshuffle over 10 000 seeds; the pictures) | 6,169 / 0 |
| mutate-two-gauges | 18 / 18 killed, control survives |
| local-test-two-gauges (11 locales; real clicks on the socket, pad keys, drums, lever and gauges, typed digits + Enter; every round of the three levels at rest, at miss 2 and solved, each state reached ONCE then resized through 320–1366) | 32,879 / 0 |
| visual-qa | 54 renders green |
| hierarchy | 758 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

## Open (page metadata — for the operator)
- **Sign-up claims:** nl "zonder registratie", es "sin registro", it "senza registrazione", pt "Sem cadastro", fr "sans inscription".
- **nl intro:** describes a ten-frame, a number line and a balance that this game does not have.
- **fr title and intro:** "Addition à trous" leaves out subtraction, which is half the rounds.
- **it intro:** addresses "tuo figlio" (a parent voice).
- None of these were changed, because they are frozen metadata.
