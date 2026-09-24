---
name: feedback_a_guard_turns_green_into_red
description: A gate that drives to a state in SETUP and never asserts it arrived reports green forever. The tell is narrow — silent if(x)x.click() between the drive and the measuring loop — and three of my four attempts to find it by regex were wrong.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6a562050-89e6-4916-8717-49b2e830b935
  modified: 2026-08-07T15:24:42.261Z
---

**Found on `number-sieve` and then swept across the tools, 2026-08-07.**

`audit-number-sieve-locale-layout.js` reported **484 assertions, 0 failed** across 11
locales × 11 viewports. It clicked a bar chip to reach the densest field (1-120,
twelve rows), then measured tap targets, text size and containment. **It never
checked the click worked.** A rebuild replaced three lozenges with a segmented
control, so the index-2 chip stopped being the 1-120 button — and the audit went on
measuring the **two-row board** while reporting passes about the hardest case it had
never rendered. One line turned 484 green into 11 red, and every one of those was a
card running past the fold in a language I do not develop in.

## ⭐ The structural tell, which is narrow

A gate is at risk when it **drives to a non-default state in SETUP, outside the
measuring loop**, with silent `if (x) x.click()` between the drive and the
measurements. Gates that drive *inside* the loop re-establish state every iteration;
gates that never drive measure the resting state they got by loading.

Swept across the 47 registered tools: **only three had the risky shape, and two had
the defect** — `folding-sheet` (poison-tested: with `fold()` leaving the sheet open,
the chip present and the click landing, it reported **264 passed, 0 failed** over 132
renders of the *unfolded* sheet) and `class-graph`. Both now fail loudly.

## ⚠⚠ AND MY OWN DETECTORS WERE WRONG THREE TIMES

I tried to generalise by regex and produced, in order: **15 candidates**, then **19 of
20 "measure only the default"**, then **"0 of 23"**. All three were wrong.

- The "0 of 23" run matched only `number-sieve`'s loop idiom, so it was a **vacuous
  measurement inside an audit for vacuous measurements**.
- Two of the 15 were poison-tested and **refuted** — their guards existed in a form
  my regex did not match (an unguarded `waitForSelector` inside a `ready()` helper).
- The "0 clicks" survey had sliced files at a regex that did not match them.

**Only the poison tests produced a finding that survived.** A regex over gate source
tells you what a gate LOOKS like; breaking the tool tells you what it CAN SEE.

## ⚠ A guard is not a guard until it has been seen to fail

My first `class-graph` guard keyed on the chip's pressed class — and `.cgr-on`
matches **any** pressed chip, including the mode chip, so it **passed on the poisoned
build**. The counts are absent from the DOM until the reveal (the tool's own
numeral-curtain comment says so), which made `.cgr-count` the honest marker.

## How to apply

1. Any gate that navigates to a state before measuring must **assert it arrived,
   before the measurements** — and print the number, so a run that measured the wrong
   object does not look like one that measured the right object.
2. **Name the control, do not count siblings.** `chips[2]` is a bet on layout;
   `[data-fk="chip:f120"]` is a statement about identity.
3. **Order of operations is part of the setup** — my first fix raised the paid notice
   by cycling the library, which also loaded a board and put the small field back.
4. **Poison every new guard in both directions** before believing it.

→ [number sieve](project_number_sieve_rebuild.md) ·
[verify the measurement](feedback_verify_the_measurement_before_the_defect.md) ·
[poison every assertion](feedback_poison_every_assertion_not_just_the_first.md)
