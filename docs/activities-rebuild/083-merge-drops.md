# #83 — Add Three Numbers → THE MERGING DROPS (1.OA.A.2, all 11 locales)

ORDER row 83 · id `numberbond.add-three.1-oa-a-2` (kept). Design: `designs/083-numberbond.md`.

## Files and wiring
- **New files:** `mini tools/merge-drops-core.js` (12 triples within 20, 8 within 10; merge / undo / pack / check / hint / path / plan), `merge-drops-activity.js`, `merge-drops-activity.html`. CSS prefix `md-`. No pictures: the beads are the material.
- **Manifest:** the row stays in `number-bond-activities.json` (no MANIFEST_FILES change):
  - `tool` is repointed and `params` became a mirror of the core;
  - en/de/fr/es/pt/it/nl slug, title and intro are frozen (sha1 `36d25e91…`, checked unchanged by the script);
  - sv/da/no/fi slug, title and intro are authored.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.824.
- **Legacy gates:**
  - `local-test-number-bond.js` dropped the add-three row, with a pointer comment.
  - `verify-number-bond-core.js` already skips rows whose tool is not `number-bond-activity` (done at #81).
- **Sources:** scratchpad `md-manifest.js`, `md-prose.json`, `md-dump.md` (the reviewer's text), `md-fix1.js` (strings), `md-fix-prose.js`, `md-fr.js` (French narrow no-break spaces).

## The invention
- **Every number is a drop of beads in a three-part bond.** Drag a drop onto another (or tap one, then the other) and they melt into one drop. The new drop keeps every bead's colour (coral, teal, gold, by place) and packs the beads in a 2 × 5 frame.
- **Ten or more beads close into a gold-ringed PEARL**, with the rest in a droplet beside it (below it on phones). Joining the ten pair first is therefore visibly easier, and nothing tells the child to do it.
- **Every order ends in the same last drop**, which rises into the whole circle. After a right answer, "See other ways" shows the three orders reaching the same total.
- **The apparatus does what the child did.**
  - A miss that is the sum of two drops joins exactly those two; the third pulses, left out.
  - Any other miss joins everything in the best order: the ten pair first, else a double.
  - Miss 2 labels the pearl "10", so the child counts on.
- **Settings:** Numbers (within 10 / within 20); Beads (show / numerals only — joined drops always show their beads).

## Rulings this build made
- **Data:** w20 round 5 was [6, 3, 2], the same set as round 1 [2, 3, 6]; the oracle's distinct-triple check caught it, so it is now [6, 2, 5]. Other invariants checked:
  - every total ≠ a part, and ≠ a + b;
  - the ten pair sits in every position at least twice;
  - no two equal totals in a row, and a replayed seed still gives a new order.
- **Miss 2 does not number the beads** (reviewer). The design numbered them 11, 12, 13…, but the last number was then the answer and "count on from 10" became "read the last bead". Now only the pearl carries "10".
- **Totals of exactly ten** (w10 5 + 1 + 4, 3 + 2 + 5) get `hPearlTen` / `hCountTen`. "A full ten and how many more?" was false there (reviewer).
- **A drop of 1** is read as `ariaDrop1` ("Drop, 1 bead") in every locale.
- **"Try another way" is now "See other ways" ×11**, because the chip only shows the orders.
- **hTwo** reads "Your {n} is only two of the drops", which is true whether the child had already joined them or not.
- **Phones:** the narrow gap between the whole circle and the parts is 20 px (German at 320 × 640 was 3 px over the fold at 26).
- **Desktop solved state:** the whole circle grows to 280 px and the empty part circles shrink to 110 px once one drop is left, as phones already did. Before, the final drop had shrunk to fit a 196 px circle.
- **The undo and "See other ways" buttons are `md-tbtn`, not `-chip`**, because visual-qa reads `-chip` as an answer card. Every button is now measured as a control.
- **Reviewer fixes, all 11 locales:**
  - learning goal "11–20" → 11–19 (20 is two tens);
  - about[2] rewritten for the new miss 2;
  - en tLine/hEmpty "how many beads there are";
  - nl "in de volgorde die je wilt", "dubbelsom", "apart liggen";
  - da "flere", "Prøv/Se andre måder", "sammenlægning";
  - sv "dubbla", "sammanslagningen";
  - no "pilen", "sammenslåingen";
  - es «¿Una decena completa y cuántas más?», "están en", SEP "eje de número", "parpadeando";
  - pt "Gota unida", "sinal de certo", "a partir do 1";
  - fr "à part", the colon in hCount, narrow no-break spaces;
  - fi "erillään", "pisarassa", "luvusta 10 eteenpäin", the practices wording;
  - de "Teile-Ganzes-Bild" in the prose, "innerhalb eines goldenen Rings".

## Gates
| Gate | Result |
|---|---|
| verify-merge-drops-core (own oracle: totals, all 12 merge orders, pearl iff ≥ 10 and the 2 × 5 pack, colours kept, undo, every typed answer 1–40 through miss 1/miss 2/recovery, hints incl. exactly-ten, plan adjacency + replay, locked when done) | 11,969 / 0 |
| mutate-merge-drops | 18 / 18 killed, control survives |
| local-test-merge-drops (11 locales; real drags + taps + keys + keyboard; every round of both levels at rest, at miss 2 and solved, 320–1366) | 20,295 / 0 |
| visual-qa | 72 renders green |
| hierarchy | 596 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

## Open (page metadata — for the operator)
- de title/intro "Zahlenbild": in Grundschule maths that is a structured dot picture, not a part-whole bond.
- nl title "groep 4": Grade 1 is usually groep 3.
- Not changed, because these are metadata.
