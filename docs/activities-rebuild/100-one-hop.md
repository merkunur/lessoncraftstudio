# #100 — Inchie's Garden Path → THE ONE-HOP HELPERS (1.MD.A.2, all 11 locales)

ORDER row 100 · id `lay-units.measure.1-md-a-2` (kept). Design: `designs/100-lay-units.md`.

## Files and wiring
- **New files:**
  - `mini tools/one-hop-core.js`: the round tables (positions in eighths of a unit, so the old 3/8 offsets survive exactly), where a hop lands (`classify`: start / gap / overlap / inside / past / end / seam / short), lay / append / move / nudge / remove / hop / home, the keypad, judge rows, the order shelf, Check / hint, and the plan.
  - `one-hop-activity.js`
  - `one-hop-activity.html`
  - CSS prefix `oh-`.
- **Manifest:**
  - The row left `lay-units-activities.json` (now `[]`) for its own `one-hop-activities.json`, which is registered in `frontend/lib/activities.ts` `MANIFEST_FILES`.
  - Metadata is frozen in the 8 shipped locales (sha1 `324a5ea8`, checked).
  - da / no / fi slug, title and intro are new, as the design says (da and no intros reworded after review):
    - da: *maal-laengder-med-hjaelpere-1-klasse*;
    - no: *mal-lengder-med-hjelpere-1-trinn*;
    - fi: *mittaa-pituuksia-apureilla-1-luokka*.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.842. The existing overrides are unchanged (grade pt / it / nl '2'; strand it / nl / sv).
- **Legacy gates:** `verify-lay-units-core.js` and `local-test-lay-units.js` step aside with a pointer. The old lay-units files stay on disk, unused.
- **Pictures** (opened, all lying flat, scaled so each object's INK is exactly its length in units):
  - toys / car, train, truck; vehicles / skateboard, ferry, submarine; animals / fish; clothing / shoe; forest creatures / snail, caterpillar; reptiles and amphibians / alligator; bakery / baguette.
  - Inchie is `spring/worm` (sv: Mätis).
- **Sources** (all in the scratchpad): `oh-strings.json` + `oh-objects.json` + `oh-apply.js`, `oh-manifest.js`, `oh-prose.json`, `oh-dump.txt` (the reviewer's text), `oh-review-fix.js`, `oh-probe.js`.

## The invention
**Inchie can only hop exactly ONE helper long.**
- The child lays identical helpers end to end under the object, from the start stone at its tip: tap the pot to lay one flush at the end of the row, or drag one from the pot onto the path (it snaps to quarters and clicks flush within an eighth of a neighbour or the stone). Drag a helper to move it, off the path to remove it; arrows and Delete on the keyboard.
- Tapping a helper = one hop. A clean join: a footprint. A fault: she stops and shows it — in the soil of a gap (marked coral), wobbling on an overlap, tilted mid-helper (another size), at a crooked start or past the end — and a line tells the child what to do. A tap on Inchie sends her back to the stone.
- Only a clean row lets her reach the end; she glows, the keypad opens, and the child writes how many hops it took. Success draws the picture sum: N capsules under the object.
- No numbers on the bed (gated); the only numerals are the keypad, the label box and the order cards the child wrote.

## Rounds
| Face | Rounds |
|---|---|
| Lay and count | A1–A7 (L 3–6); A3 offers a 1.5 u decoy pot, A6 a 0.5 u one; A4 starts with a helper at 3/8 |
| Fix it | B1–B7 (gap, overlap, gap, past, start, wrong size, gap) + J1–J3 judge rounds (three rows under one picture, exactly one clean; never three judge rounds in a row) |
| Line up three | C1–C7: measure three objects in turn, the card measured gets its label, then order the cards shortest first on a three-step shelf |
| Big and small | D1–D7 (L even): two-unit helpers first, then one-unit helpers; a two-box label |

- Answers 3, 4, 5, 6 occur in every level. Judge: the clean row sits in each place 28–39 % over 300 showings. Order: the shortest is measured first in ≤ 40 % of showings.
- The plan is an order-only reshuffle and never repeats the previous pass (gated even with a stuck random source).

## Deviations from the design (each measured, not chosen)
- **The snail replaces the cucumber, the ferry replaces the canoe:** both design pictures lie diagonally / tilted, so a horizontal row of units cannot measure them honestly. The van was rejected (a brand logo).
- **vehicles/skateboard replaces toys/skateboard:** the toys drawing is a three-quarter view (tilted, foreshortened).
- **D6 is the submarine, not the caterpillar:** the caterpillar at 4 units drew 253 px tall at 704 (> the 250 px cap).
- **No answer numerals on the footprints** (the rule: no number before the child writes it).
- **The pot TAP appends a helper** flush at the end of the row (as well as drag): one-tap laying for small hands and switch users.
- **The keypad is hidden until Inchie reaches the end** (the design says it "opens"); a sleeping keypad pushed Check below the fold at 320 px.
- **The label carries no picture copy:** the object stands full size right above it; a 40 px copy broke the picture floor.
- **"Judge replaces B1–B7 in turn on later passes"** is done as J1–J3 mixed into the Fix-it pool (never three in a row).
- **A helper lying behind the stone is a crooked start** (the design's "start at the end" rule; the core ignored it at first — found by the gate's exhaustive check).

## Review
ONE native + pedagogy reviewer over the compact dump of all 11 locales. Applied:
- every locale: the past-the-end line now says what to do; the second counting hint no longer chants "one, two, three" (3 is the most common answer);
- da `flutten` → `baguetten`; sv / no wrong-size line; no prose "marken" → "meitemarken"; it start line, curriculum area (Relazioni, dati e previsioni), job label "Metti in ordine i tre"; pt "cartões", start line; fi big/small line, decoy and helper labels, "erikokoinen".

## Gates
- `verify-one-hop-core.js` — 10,164 checks: the tables typed literally; Inchie reaches the end EXACTLY when the gate's own clean-row predicate holds (exhaustive over every row of up to L+1 one-size helpers on the quarter lattice for L 3–4, plus 20,000 sampled mixed rows L 3–6 and 4,000 big rows); every Fix-it round stops at its designed fault; judge one clean row; order three lengths; Check takes only L; picture sizes at 360 / 704 from the measured ink; the plan; the strings.
- `mutate-one-hop.js` — 20 / 20 killed, control survived.
- `local-test-one-hop.js` — real taps, drags and keys, 11 locales, every round at rest / miss 2 / solved through 320…1366.
- `visual-qa-activity` 42 / 42 · `audit-activity-hierarchy` 224 / 0 · `audit-settings-efficacy` 2 live · preflight-activity-routes, prose-claims, SERP copy, activity-content ×11 green.
- `live-verify-one-hop.js` on production: 75 / 0 (11 locale pages 200; en / de / sv / fi × 1366 / 390, real taps: four helpers, four hops, a miss, okLen; the iframe grows with the card).
