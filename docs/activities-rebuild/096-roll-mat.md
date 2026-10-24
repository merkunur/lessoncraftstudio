# #96 — Tuck's Ten Bundles → THE ROLL-UP MATS (1.NBT.C.4 + the 2.NBT column faces, all 11 locales)

ORDER row 96 · id `place-value-regroup.add-compose-ten.1-nbt-c-4` (kept). Design: `designs/096-place-value-regroup.md`.

## Files and wiring
- **New files:**
  - `mini tools/roll-mat-core.js`: the round tables, the bench (mats, doorsteps, shelves, bin, away tray), pour / unpour / roll / drop / unroll / take away / give back, settled / covered / boxOpen, write, Check / hint / okKey, and the plan.
  - `roll-mat-activity.js`
  - `roll-mat-activity.html`
  - CSS prefix `rm-`.
- **Manifest:**
  - The row stays in `place-value-regroup-activities.json` beside its three siblings (rows 145–147, still on the old engine; they get their own instruments later).
  - `tool` → `roll-mat-activity`, and `params` mirror the core.
  - The file is re-serialised in its own CRLF / 2-space form, so the siblings are byte-identical (checked).
  - en..sv metadata is frozen (sha1 `a6dc740f`, checked).
  - da / no / fi metadata is new:
    - da: *Plus med tieroverskridning – rul en tier sammen (2. klasse)*;
    - no: *Addisjon med tierovergang – rull sammen en tier (2. trinn)*;
    - fi: *Yhteenlasku kymppiylityksellä – kääri kymppi (2. luokka)*.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.837. The grade override gains da / no / fi '2', in line with the existing pt / it / nl / sv '2'.
- **Legacy gates:** `verify-place-value-regroup-core.js` skips any row no longer on the old engine (the three siblings are still checked). `local-test-place-value-regroup.js` (this row only) steps aside with a pointer.
- **Picture:** Tuck is `pets/hamster` (opened; `pets/gerbil` is a near-twin and is never used).
- **Sources:** scratchpad `rm-strings.json` + `rm-apply-strings.js`, `rm-prose.json` + `rm-fr.js`, `rm-manifest.js`, `rm-dump.md` + `rm-desc.txt` (the reviewer's text), `rm-review-fix.js`, `rm-gate-add.js`, `rm-probe.js`, `rm-dbg2.js`.

## The invention
**Every column has a mat with exactly ten wells, and the tenth well hangs out over that column's answer box.**
- **A full mat covers its own digit.** The child rolls it up (with the grip, or by tapping the full mat) into one ten that lands on the next column's shelf, where the little 1 appears in the written sum. The shelf rod covers that box too, until the child taps it down into the mat.
- **Take-away:**
  - an arrow on a bay pulls one down from next door, and it unrolls into a full mat of ten (the blocks already there step onto the doorstep);
  - in a column sum the digit is struck and its new value is written above it;
  - taking from an empty column says "pull one down from next door".
- **Ones first, because of the bench rather than a rule.** A box opens only when its column and every column to its right are settled (bin, doorstep and shelf empty, mat not full).
- **Layout:** the written sum runs top to bottom through the bench. The problem rows sit on top, aligned to the bays (one shared grid), and the answer boxes sit under the bays, so the hanging well physically sits on the box. The + one digit face shows "27 + 5 =" and one wide total box.
- **The German carry row** (*Übertrag*) follows the second number instead of sitting above the first.
- **Tuck** stands beside Check with a stack of every ten the child rolled in the session.

## Rounds
| Face | Add | Take away |
|---|---|---|
| + one digit | 10 (incl. 46 + 4 exactly ten, 42 + 5 no ten) | 10 (incl. 47 − 5 and 68 − 4 with no unroll) |
| two digits | 8 | 8 |
| three digits | 8 (incl. 199 + 201 two carries) | 8 (incl. 503 − 168 and 400 − 156 across zero) |

- The way setting is add / take away / both.
- Every result is ≥ 19, and no round adds or takes 0.
- The plan never repeats a pass, never starts with a round that needs no regrouping, and never puts three of one way in a row.

## Feedback
- **Check before anything / with blocks still in the bin:** hintStart (add) or hintStartSub (take away). No miss.
- **Something unsettled:** hintCovered; the rightmost unsettled bay pulses. No miss.
- **A blank box:** hintWrite.
- **Take-away with the wrong amount in the tray:** hintAway {b}, a miss.
- **A wrong digit:**
  - miss 1: that column's blocks lift and glow, and hintCount;
  - miss 2: hintCount2 ("two halves of five") and the mat's middle line in coral.
- **No answer is ever printed.** No numbering of blocks and no ghost digit, so the design's "{t} tens and {o} ones" miss-2 text was not used.
- **Success:** okAddRoll / okAddHundred / okAddBoth / okAddNone / okSubRoll / okSubHundred / okSubBoth / okSub; Tuck hops.

## Review (one reviewer, all 11 locales; every finding fixed at the source)
- **MUST:**
  - "two rows of five" did not describe the mat, which shows two vertical halves, so it became "two halves of five" in the hint and the prose of all 11 locales;
  - blocks still in the bin were answered with "something is lying on that box", so that case now gives hintStart;
  - the covered pulse now scans ones first.
  - All three are gated and mutated.
- **SHOULD:**
  - okAddBoth was added for rounds that roll a ten AND a hundred;
  - strike-and-rewrite is described for column sums only;
  - "type the answer", not "the digit", since the + one digit face has one box;
  - nl: «schaaltje» (the tray, not «bakje» beside «bak»), «de kolom ernaast» (not «de buren»), «Soort som»;
  - sv: «Borttagna»;
  - da metadata: «tieroverskridning»;
  - no: the LK20 line;
  - fi: verb tenses and «kymmenet»;
  - es / pt / fr: the school words for unbundling;
  - en: «Add or take away»; pt: «Faltou?».
- **Found by the local test** (each now has its own assertion and a poison check):
  - **The hanging tenth well caught taps meant for the answer box.** It is a child of the mat button, so a tap on the box removed a block. It is now tap-through.
  - **A press-and-hold pour left a flag that silently swallowed the child's next ordinary tap on any heap or mat.** It is now a 300 ms window covering only the click that ends the hold.
- **Found by the core gate:** `value()` counted a rod on a shelf as ten of its own column. Fixed.
- **Found by visual-qa:** the `_order` test seam must hold positions into `_pool`. Round ids here are strings, so `_order` now holds positions.
- **Frozen metadata, flagged only (not edited):**
  - en intro: "tap “Make a ten”" (no such button now), and it mentions only the + one digit face.
  - No-sign-up claims: de "ohne Anmeldung", nl "zonder account", it "senza registrazione", pt "sem cadastro", fr "sans inscription".
  - Grade: de "Klasse 1" and es "1º" are weak for 27 + 5 within 100 and the written method.
  - nl intro: "typt daarna het totaal".

## Gates
| Gate | Result |
|---|---|
| `verify-roll-mat-core.js` (own column-arithmetic oracle, scripted solver of every round, bench and box rules, the reviewer's rules) | 1,887 / 0 |
| `mutate-roll-mat.js` | 17 / 17 killed + control |
| `local-test-roll-mat.js` (real clicks + a real hold, 11 locales, every round at rest / miss 2 / solved, 320–1366, tenth well over its box, digits over their bays, de carry row placement; poison check: the hold swallow) | 63,278 / 16 on the first full run (all 16 the nl fold at 320, fixed by a shorter nl instruction); then 15,246 / 0 on all 11 locales at 320 + 1024 and 3,750 / 0 after the strike-mark change |
| visual-qa | 60 renders PASS |
| hierarchy | 242 / 0 |
| settings | 2 live |
| preflight, prose-claims, SERP | PASS |
| `live-verify-roll-mat.js` | production, en / de / sv / fi × 1366 / 390 |
