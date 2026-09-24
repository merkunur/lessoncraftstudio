---
name: project-wide-viewport-baseline-drift
description: Ten tools' committed wide-viewport baseline no longer matches what they render, so their CONTROL cell is comparing against numbers nobody re-checked
metadata:
  type: project
---

Found 2026-08-07 during the Letter Studio rebuild, by diffing a full
`node scripts/audit-tool-wide-viewport.js --measure` run **before** committing it.

`docs/audit-results/wide-viewport/baseline.json` is the only thing the gate's assert-mode
CONTROL cell compares against. A full `--measure` rewrites all 48 rows, and doing so
**blesses every tool's current state as intentional**. That run moved eleven rows:

| grew | shrank |
|---|---|
| `arrow-strip` 554→888 · `home-language-bridge` 677→1137 · `our-day` 669→1319 · `syllable-splitter` 418→610 · `measurement-bench` 680→860 · `heart-words` 620→660 · `place-value-lab` 846→853 | `calendar-wall` 1057→812 · `part-whole-frame` 620→473 · `wodb` 665→660 |

`letter-studio` 620→1268 was mine and is spliced in; **the other ten are untouched and
still stale.** Their neutrality proof is currently measured against numbers nobody
re-checked — every one of them is a tool rebuilt since the baseline was written.

⚠ **A clip-awareness fix landed in that gate at the same time** (it was measuring
`getBoundingClientRect` on children an `overflow-x:auto` ancestor had clipped away, so any
tool with a scrolling shelf/rail/tray read as escaping its card). That fix can only ever
SHRINK a measurement — so the seven that GREW are genuine tool changes, not the fix.
Verified neutral on four tools without scrollers: ten-frame 569, number-line 600,
sorting-hoops 677, draw-bag 677, all identical to the committed baseline.

**How to apply:** a full `--measure` is a whole-catalogue act and should be a deliberate
decision per tool, not a side effect of touching one. Diff the run before committing it;
splice the rows you actually verified. See [[feedback_verify_the_measurement_before_the_defect]].
