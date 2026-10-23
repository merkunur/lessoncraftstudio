# #85 — Make a Ten to Add → THE TEN PLUG (1.OA.C.6, all 11 locales)

ORDER row 85 · id `numberbond.make-ten-to-add.1-oa-c-6` (kept). Design: `designs/085-numberbond.md`.

## Files and wiring
- **New files:** `mini tools/ten-plug-core.js` (14 sums, 8 Make 10 rounds; snap / plug / swap / reset, the ghost, the hints), `ten-plug-activity.js`, `ten-plug-activity.html`. CSS prefix `tp-`. No pictures: the cubes are the apparatus.
- **Manifest:** the row stays in `number-bond-activities.json` (as at #79–#84).
  - `tool` is repointed, and `params` became a mirror of the core.
  - All 11 locales' slug, title and intro are frozen (sha1 `cba86e2e…`, checked unchanged).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.826.
- **Legacy gate:** `local-test-number-bond.js` dropped this row, with a pointer comment. `verify-number-bond-core.js` and that test still pass on the rows that remain.
- **Sources:** scratchpad `tp-manifest.js`, `tp-prose.json`, `tp-dump.md` (the reviewer's text), `tp-fix1.js`, `tp-fr.js`, `tp-probe.js`.

## The invention
**The first number sits in a ten-rack with a hole in it.** The second number is a stick of linking cubes.
- **A tap snaps the stick** at the nearest joint. The bond above it fills with the two parts of the first snap.
- **A drag carries a piece into the rack:**
  - too long: it bounces back;
  - too short: it sits in the hole and the empty slots glow, and a tap takes it out again;
  - exactly the hole: the rack turns gold and the equation strip grows `8 + 5 = 8 + 2 + 3 = 10 + 3 = ?`.
- **The shelves** then show the golden ten and the ones.
- **Then the child types the total.** The digit keys sleep until the ten is full.
- **A wrong total** is drawn on the shelves as a ghost ten and ghost ones:
  - The `10 + b` slip glows its extra ghost places, with a thread into the ten, and gets its own words: "Some of these cubes are already in the ten."
  - Too few leaves real cubes outside the ghost places.
  - On miss 2 the ten is labelled "10" so the child counts on.
- **Swap** appears on the three rounds whose first number is the smaller.
- **Levels:** Make a ten to add (14 sums) and Make 10 (8 partners, a ten-stick).
- **Modes:** Snap first, and In my head (the keys are awake; a miss snaps and plugs by itself).

## Rulings this build made
- **Miss 2 does not number the leftover cubes** (rows 83/84 ruling). The design numbered them 11, 12, 13, and the last numeral would be the answer. Only the ten carries "10".
- **Taps on phones:** a 1-cube joint button would be about 25 px. Instead the whole piece is a tap target of at least 44 px, and a tap snaps at the nearest joint. Drag-to-join is replaced by a round-arrow undo, and a stick breaks into at most 3 pieces. Two short pieces that add up to the hole fill it too (still a ten).
- **Phones:** German at 320 × 640 overshot the fold by a pixel (a 3-line task line and a 2-line fit note), so the phone board lost 16 px of gaps and mat padding (taps stay ≥ 44). It now ends at 636.
- **The shelves are as wide as the board**, because they carry the misconception picture. The first build drew them at about 16 px cubes.
- **Reviewer fixes:**
  - **P2:** the `10 + b` slip had no words, so `hOver` was added.
  - **P3:** with a wrongly snapped stick, the tick said "Snap the stick"; it now says `hSnap2` (fill the hole exactly, or join the stick again).
  - **P1:** confirmed already true. Before the ten is full, an empty box gets `hType`.
  - **Locale wording:**
    - it *altri 1* → *ancora {left}*;
    - es/pt "cuántos cubos fueron" calques;
    - fi *kymppisauva / kymppikisko*;
    - nl/fi verb agreement in okM10;
    - de *orangefarbenen*;
    - nl/da/sv/no comparatives for two numbers;
    - sv Lgr22 area name;
    - no *Bytt plass*;
    - pt *Sua resposta*;
    - the mode name marked in the prose ×11.
- **Not built:**
  - the "Cube bench" free play (as at #82–#84);
  - the 1.5× press magnifier, because the 44 px whole-piece target replaces it.

## Gates
| Gate | Result |
|---|---|
| verify-ten-plug-core (own oracle: the design's table; the plug physics for every piece length; two short pieces fill; swap; 10 + b never passes and its ghost shows exactly the hole extra; Make 10 only the partner fits, k = 5 the exception; keys sleep; misses and hints; plan adjacency + seed replay) | 19,949 / 0 |
| mutate-ten-plug | 19 / 19 killed, control survives |
| local-test-ten-plug (11 locales; real taps on joints, real drags, keys, Enter; every round of both levels at rest, plugged, at miss 2 and solved, 320–1366) | 28,699 / 0 |
| visual-qa | 84 renders green |
| hierarchy | 608 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

## Open (page metadata — for the operator)
- en intro "Tap to fill the make-a-ten part": the piece is dragged, and nothing is filled by a tap.
- fi intro *maksuttomassa* ("free").
- de "Online, ohne Anmeldung" and fr "sans inscription" (no-sign-up claims).
- it intro typo "Gioca scopri".
- Not changed, because they are metadata.
