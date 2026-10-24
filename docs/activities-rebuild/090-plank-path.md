# #90 — Find the Missing Number → THE PLANK PATH (1.OA.D.8, all 11 locales)

ORDER row 90 · id `match-pairs.find-the-missing-number.1-oa-d-8` (kept). Design: `designs/090-match-pairs.md`.

## Files and wiring
- **New files:**
  - `mini tools/plank-path-core.js`: 9 paths Within 10 and 9 Within 20, each with four equations and a decoy; the road per kind of blank, fit / lay / lift, the tray, the plan.
  - `plank-path-activity.js`
  - `plank-path-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `pp-`.
- **Walkers:** one per path in a pass. Rabbit, beaver, fox and squirrel come from forest creatures; duckling, pig, lamb and goat from farm animals; tortoise from pets. All are colour library pictures, opened on a contact sheet.
  - **Facing, measured on the sheet:** rabbit, squirrel and goat face left and are mirrored (gate-checked).
  - The design also listed beaver and duckling as left-facing; both face the viewer, so they are not mirrored.
- **Manifest:**
  - The row stays in `match-pairs-activities.json` (as #87). Only this row is repointed, and `params` mirrors the core.
  - The slug, title and intro are frozen in all 11 locales (sha1 `59c8cf81…`, checked); the other rows are checked unchanged.
  - The commutative and fluency gates still pass.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.831.
- **Legacy gates:** none drive this row.
- **Sources:** scratchpad `pp-manifest.js`, `pp-prose.json`, `pp-dump.md` (the reviewer's text), `pp-fix1.js`, `pp-fr.js`, `pp-probe.js`.

## The invention
**Every equation is a gap in a stream-side path, and every number is a plank exactly as long as its number.**
- **Laying a plank.** The child taps an equation's signpost (the next open gap is already chosen), then a plank. It unfolds square by square: the right number fits, the "?" fills, and a rope runs along the plank.
- **A wrong plank.** Too short falls into the water, with the open squares outlined. Too long sticks out past the far bank, with the overhang glowing. A second miss in the same gap numbers its squares.
- **The blank moves.** The four gaps of a path put it in four places:
  - the start of the road (a missing first addend, or a difference with the taken-away stretch dashed at the end);
  - after a bank (a second addend, or the number taken away);
  - a slot under the road (a missing starting number, or a total).
- **The decoy.** The tray holds the four answers and one decoy, usually a real mistake: adding the visible numbers, or subtracting the wrong way. When all four fit, the walker crosses to the flag and the decoy floats away.

## Rulings this build made
- **Layout of the walker and flag.** They sit in a strip above the path on wide screens, where the hierarchy law needs a 96 px picture. On a phone they sit inside the first and last signpost rows, so the tray stays above the fold, down to 320 × 640.
- **No Check button.** The crossing happens on the fourth fit, so the design's "Check before complete" hint has nothing to attach to. The shell's Check is pressed by the activity.
- **The success line names no animal.** Gender and article agreement across 11 locales would need a whole sentence per animal.
- **The setting is "With squares" / "Numbers only"**, not "To scale", in every locale.
- **"Plank yard" free play is not built**, as at #86, #88 and #89.
- **Reviewer fixes, applied at the source:**
  - **Prose ×11:** the list of blank positions now includes the difference (9 − 5 = ?). The slot under the road is named for both the starting number and the total.
  - **The decoy wording.** "A typical mistake" became "usually a typical mistake", because 13 of 18 decoys are real errors and the other 5 are neighbours of an answer. The practices now name both mistakes.
  - **Hint:** "Count the squares in the gap", which also fits the slot under the road.
  - **Native fixes:**
    - sv: "lucka" (not "glapp") in the UI and the prose;
    - fr: "cases" (not "carrés");
    - fi: "Ruuduilla" and "lukukortti";
    - nl: "Met welk getal klopt …?";
    - da/sv/no: the "fell in" hint names the water;
    - da: "firkant for firkant";
    - es: "exacta".
- **es / pt task line:** "¿Qué número completa {eq}?" / "Que número completa {eq}?" (the reviewed "hace verdadera la igualdad" form wrapped to three lines and pushed the tray below 320 × 640 — the shorter form is also the natural school phrasing).
- **Hierarchy law:** a "tiny" walker of 52 px broke the 64 px floor at a 360 px viewport (the card is under 330 px there). The walker stays 64 px, and the tiny road is 40 px instead.

## Gates
| Gate | Result |
|---|---|
| verify-plank-path-core (own oracle: the design's 18 paths as text, solved here; four different kinds of blank per path, answers distinct, the decoy never an answer, every decoy a real mistake or a neighbour, decoy rank (largest ≤ 4, smallest ≤ 4 of 9); the road per kind (banks = the known numbers, the open stretch = the answer, in its place); EVERY plank 1–20 in EVERY gap; misses, numbering, lift, done only on the fourth; the tray balance over 10 000 trays, the decoy never in the same slot twice; the plan; the walkers and their facing) | 2,089 / 0 |
| mutate-plank-path | 16 / 16 killed, control survives |
| local-test-plank-path (11 locales; real clicks on signposts and planks, ↓ / Enter / Backspace; every path of both levels at rest, at miss 2 and crossed, each state reached ONCE then resized through 320–1366) | 21,956 / 0 |
| visual-qa | 54 renders green |
| hierarchy | 704 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

## Open (page metadata — for the operator)
- **All 11 locales:** the frozen intro still describes the old card game ("match it to its answer … tap an equation, then tap the number … watch the pair link").
- **fr intro:** "sans inscription" is a sign-up claim.
- None of these were changed, because they are frozen metadata.
