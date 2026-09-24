---
name: project-doubling-mirror-tool
description: "Tool #54 The Doubling Mirror rebuilt 2026-08-11 — a shut tray is the whole, an open tray is two parts; ten native panels found four model defects no string diff shows"
metadata: 
  node_type: memory
  type: project
  originSessionId: f666d094-0b99-46ab-acfe-859fd297d219
  modified: 2026-08-11T12:42:33.656Z
---

**#54 THE DOUBLING MIRROR — rebuilt and LIVE 11/11 (2026-08-11).** Commits
`a060454f` (rebuild) + `c94367e1` (live-verify). 55 live assertions driven on
production. Part of the §23 premium-tools programme; see [[feedback_next_tool_build_recipe]].

## The design

**A SHUT TRAY IS THE UNDIVIDED WHOLE; AN OPEN TRAY IS TWO PARTS.** Closing
composes, opening decomposes — so the same hinge runs doubling AND halving on
the very same counters, never cleared, with **zero new controls**:
set 4 → close (far leaf receives 4, tray holds 8) → open (8 → 4 and 4) →
press + (5 and 4) → close (9) → open (4 and 4, one on the spine pad).

The odd one's **SIDE choice was CUT** — 5-and-4 vs 4-and-5 is one fact with the
addends swapped, and a tool founded on *an appearance is not a quantity* cannot
offer a reflection as its central choice. Replaced by two genuinely different
MOVES: **give** it the near leaf (nine is four and four and one more) or
**fetch** it a partner (nine was a double one short — and the tray then holds
TEN, which the copy must say out loud).

## ⭐⭐ The headline lesson: ten native panels read the MODEL, not the copy

Every one of the four worst defects had **one sentence serving two states**, so
it asserted the opposite of the state it fired in — and none was visible in a
string diff:
- `saidNoOdd` wired to BOTH `noOdd` and `noOddYet`, so pressing +/− while a
  counter sat on the pad announced that none was waiting;
- `saidEmpty` said "nothing on the tray yet" over eight counters;
- `saidFull` named "the near leaf" on a SHUT tray, whose invariant sets it to 0;
- `ariaNear`/`ariaFar` announced the split during the beat — **the reveal
  discipline the header was proudest of was sighted-only.**

All fixed at the resolver, never in eleven translations. Five new causes
(`saidSettleFirst`, `saidTrayFull`, `saidTrayFloor`, `saidSameTwice`,
`saidPredictLeaf`) carry the sentences that were missing.

## ⭐⭐ What the gates bought

- **A GATE CAN CERTIFY THE DEFECT IT EXISTS TO CATCH.** The old probe asserted
  the far leaf by **counting NODES**, and `querySelectorAll` counts happily
  inside a `visibility:hidden` parent — so it passed while the far leaf was
  invisible in exactly the state the tool is for. Ask in pixels.
- **THE CHECK GUARDING MY ENGLISH WAS TESTING ANOTHER TOOL'S VOCABULARY** —
  `runway, ghost, trail, rail, peg, drum, gear, cog, dial, roller`, the parts of
  #41 and #50. It could not fail, which is why a retired `sheetNote` using the
  banned fold-word three times reached ten panels **as their source**.
- **MY OWN NEW GATE MANUFACTURED ITS COVERAGE.** The cause-reachability walk
  pressed chips that do not exist (`predValues` offers the even numerals only),
  and that phantom press was the SOLE observation of `saidNothingToDo`. Walk the
  RENDERED control set. The claim about a default is **inverted**: it must NEVER
  fire.
- **A GATE THAT HANGS IS A GATE THAT SURVIVED** — the same walk was unbounded,
  so deleting `place`'s leaf cap made the state space infinite and the harness
  scored it TIMED OUT.
- ⚠ **AN INVENTED THRESHOLD IS NOT A MEASUREMENT.** The layout gate applied a
  34px **TAP** floor to counters **nothing listens to**, failing a correct
  layout in every locale at every phone width. Measure countability (overlap +
  legibility) — what the counters actually owe a class.
- **AN INERT MUTATION IS A BAD MUTATION, NOT A GATE HOLE — AND DELETING IT
  TRADES A FALSE PASS FOR LESS COVERAGE.** Four survivors proved inert over all
  1788 reachable states (`scripts/_dbm-inertness.js`) and **replaced** with
  observable ones. 71/71 killed.
- ⭐ **AND READING THE RENDER CAUGHT WHAT NOTHING ELSE DID**: rendering the odd
  group so its refusal could speak left its legend asserting *"One counter has
  no partner"* while none did. **A legend names its group; it does not assert.**

## The paper tray was wrong in three measured ways

It printed **20 counters**, handing a child the one double `CAP=9` retires by
argument; drew **20 seats a leaf** against a ceiling of nine while its own
comment said ten; and told the class to lay the far leaf **after shutting**,
which cannot be done. Supply now tracks `cap`, grid is ten a leaf, order is
possible. All three found by panels reading `_buildSheet`.

## Standing notes

- The hub card shipped the **English product name in all eleven title slots**
  and one byte-identical English placeholder in all ten descriptions, while the
  tool localised correctly. Whatever gate covers tool strings does not reach
  `manipulatives.ts`.
- **No gate compares a locale value against the ENGLISH'S SHAPE**, so when the
  English shortened (`setAsk`), ten locale values silently kept the old shape.
  Three panels caught it by re-reading the source rather than trusting my note.
- Frozen slugs name a counter noun the tool does not use (de *Plättchen*, sv
  *brickor*, fi *nappuloilla*, es/pt *fichas*) — an operator decision under the
  §21.5a churn freeze, not something a fold may quietly fix.
- ⚠ A **duplicate key** in `generate-tool-previews.js` SEEDS (I added a second
  `doubling-mirror` entry) is silently last-wins — the same defect a panel found
  in the strings table. And the pre-existing seed was **stale**: it clicked
  Close with no claim, which the rebuild refuses, so it photographed the rest
  state and looked exactly like a seed that worked.

Gates: verify 2429 · mutate 71/71 · probe 56 · smoke 69 ×11 · locale-layout
1058 over 132 cells · liveness 75/0 · print 5 · preflight 61 tools · live 55.
**0 lines to `lcs-shell` or any protected core.**
