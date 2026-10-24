# #91 — The Sharing Jar → THE FAIR RIBBON (1.OA.D.8, all 11 locales)

ORDER row 91 · id `sharing-jar.make-fair.1-oa-d-8` (kept). Design: `designs/091-sharing-jar.md`.

## Files and wiring
- **New files:**
  - `mini tools/fair-ribbon-core.js`: the round tables, `act` (each jar bead by bead after n beads move), the mark and its count, the moods, the plan, choose / check / hint.
  - `fair-ribbon-activity.js`
  - `fair-ribbon-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `fr-`.
- **Friends:** Pim is forest creatures/hedgehog and Bo is forest creatures/mouse. Both are colour library pictures. Each one faces the jars: the hedgehog is mirrored on the left, the mouse on the right. The swap mask moves each friend together with their own jar.
- **Manifest:**
  - The row stays in `sharing-jar-activities.json`. `tool` is repointed, and `params` mirrors the core.
  - en..sv slug, title and intro are frozen (sha1 `f3e2bbf6…`, checked).
  - da/no/fi are new: "Den retfærdige perlekrukke", "Den rettferdige perlekrukka" and "Reilu helmipurkki".
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.832. The existing pt/nl/sv strand override is kept.
- **Legacy gates step aside:** `verify-make-fair-core.js` and `local-test-sharing-jar.js` exit 0 with a pointer while the row runs the Fair Ribbon.
- **Sources:** scratchpad `fr-manifest.js`, `fr-meta.json`, `fr-prose.json`, `fr-dump.md` (the reviewer's text), `fr-fix1.js`, `fr-fr.js`, `fr-probe.js`.

## The invention
**A gold ribbon is tied across both jars at the fair height.**
- **Say, then see.** The child says a number first (a tile), then Check makes exactly that many beads move:
  - into Bo's jar (how many more Bo needs; give back);
  - out of Pim's jar (how many more Pim has; put back);
  - or, in a start round, the number tints that many beads from the bottom.
- **The right number** stops the beads on the ribbon. Both jars glow gold, the friends lean in, and sparkles appear.
- **Too few** leaves a dashed gap under the ribbon, or beads still above it.
- **Too many** pushes past the ribbon in coral, and Pim goes quiet: "now Pim has less!"
- **Start rounds:** the start beads must meet the glowing new ones exactly, with a gold bracket beside the new ones.
- **The second miss** numbers the dashed or coral beads, so the child counts the difference.
- **Frosted jars** (to 20) show only each jar's number on its lid until Check wipes the frost clear.
- **Tapping a clear jar** lights its beads one by one: the child's own counting tool, with no numbers.

## Rulings this build made
- **"Too far" (found by the core gate's own count):** when the number is past what can move, the second miss would number fewer beads than the difference. That happens when it is more beads than Pim has (how many more, give back, put back), or more than fits above the rim. The hint would have said "count them" over the wrong count. Now the core reports `fits`, and in that case the hint is **hTooFar** ("Way too many — try a much smaller number.") and nothing is numbered. This covers 94 of 480 (round × number) pairs.
- **Capacity:** a jar holds 12 / 20 layers, and 2 more can heap above the rim on an overshoot. The svg leaves headroom for that and for the lifted beads.
- **Layout:**
  - The friends always stand beside the jars, never under them, so the tiles and Check stay above the fold down to 320 × 640.
  - In frosted rounds on a phone, Check shares the last tile row (6 columns, Check spanning 4).
- **The story setting:** "All kinds" / "Only how many more" (9 / 7 rounds), as the design says.
- **Our own Check:** the shell's Check is hidden and pressed by the activity when the jars are fair.
- **The svg is `role="group"`, not `img`** (the hierarchy law's DRAWN rule). The jars are the apparatus, not a figure.
- **Reviewer fixes, applied at the source:**
  - **hCountGlow** now says "Count the numbered beads": the overshoot beads are coral, and "glowing" is the word for the new beads in a start round. All 11 locales.
  - **pGive** now starts "Pim took some of Bo's beads." ×11, so "give back" has a story.
  - **da/no/fi titles:** "perlebånd" / "helminauha" read as a necklace. They are now "perlekrukke" / "perlekrukka" / "helmipurkki" (slugs follow).
  - **da/no intros:** the reflexive verb ("flytter … sig/seg").
  - **no:** "Matte" alone reads as maths, so it is now "Matt glass".
  - **Count tails:** de "so weit lag die Zahl daneben"; da/sv/no "det er forskellen / det är skillnaden / det er forskjellen"; fi "sen verran".
  - **fr:** "pot en verre rempli de perles", "au niveau du ruban", inverted questions.
  - **es:** "¿Cuántas cuentas más tiene Pim que Bo?" and "regresa {n} al montón".
  - **da:** "i starten".

## Gates
| Gate | Result |
|---|---|
| verify-fair-ribbon-core (own oracle; details below) | 4,386 / 0 |
| mutate-fair-ribbon | 17 / 17 killed, control survives |
| local-test-fair-ribbon (details below) | 22,055 / 0 |
| visual-qa | 54 renders green |
| hierarchy | 272 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |
| live-verify-fair-ribbon (11 pages 200; en/de/sv/fi × 1366/390, real pointer: tile 1 + Check → hGap, tile 2 + Check → okMore) | 59 / 0 (the first run, inside the deploy window, saw no iframe) |

**What verify-fair-ribbon-core checks:**
- the design tables as text, solved here;
- every jar ≤ 10 / ≤ 20, never 0;
- no dead tile row;
- no answer more than twice;
- the answer is never a jar's own number in MORE / HOW MANY MORE / PUT BACK;
- give back has 2s − r;
- EVERY number 1..top in EVERY round, counted bead by bead;
- the marked beads equal |n − answer|, or hTooFar;
- the states and hints;
- the plan, never the previous pass, no equal answers side by side, every kind in the first five, the swap mask 4/9 (3/7), a real reshuffle;
- the friends are labelled colour pictures.

**What local-test-fair-ribbon covers:**
- 11 locales, with real clicks on tiles, Check and the jars, plus 3 + Enter;
- MORE: no tile → gap → overshoot numbered → fair;
- HOW MANY MORE: still above, then too far;
- START: the bracket and the dashed bead between;
- GIVE / PUT success lines;
- frosted: the frost, the lids, no tap-count, cleared on Check;
- the story setting;
- every round of both levels at rest, at miss 2 and fair, each state reached ONCE, then resized through 320–1366;
- poison: the tiny tile shrunk to 40 px fails 54× at 320 and 0× at 1366.

## Open (page metadata — for the operator)
- **en intro:** "A jar of moon-beads spills…" (no jar spills; it describes only the "more" story).
- **de intro:** "ohne Anmeldung" (a sign-up claim).
- **es intro:** "hasta 12" (the game goes to 10 / 20) and "sin registro" (a sign-up claim).
- **it intro:** "tessere da 0 a 10" (no 0; 1–20 in frosted), "subito le perline volano" (they move only on Controlla), "entro il 12", "senza registrazione".
- **nl intro:** "hoeveel rolden er weg toen de pot omviel?" (no such story) and "tot 12".
- **sv intro:** "hur många ramlade ut" (no beads fall out).
- None of these were changed, because they are frozen metadata.
