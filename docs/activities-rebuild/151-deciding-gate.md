# #151 — Compare Three-Digit Numbers → THE DECIDING GATE (2.NBT.A.4; all 11 locales)

ORDER row 151 · id `match-pairs.compare-three-digit-numbers.2-nbt-a-4` (kept). Design: `designs/151-match-pairs.md` (input `rebuild-inputs/151-three-door-tunnel.md`).

## The invention
- **Two numbers race through one gate per place, the biggest place first.**
  - At each gate their digits stand as real blocks: flats, rods and cubes, plus big 3-D cubes for thousands.
  - Equal digits let both numbers through. At the first gate where the digits differ, the bar drops in front of the smaller number, and the bigger one reaches the flag.
  - The child calls the deciding gate **before** the race (or the flag when the numbers are the same), then sets < = > by a tap, a drag or the keyboard.
- **Misses:** the race itself answers miss 1.
  - A gate called too late shakes, and the hint says where the race was decided.
  - A gate called too early, where the digits are equal, shows its equal stacks glowing.
  - A wrong sign gets the open-side hint (or "both reached the flag" on = rounds).
  - Miss 2: the deciding digits grow, and the hint names them as blocks ("3 hundreds against 4 hundreds: the bar drops in front of 389").
- **Success:** the comparison sentence, plus the long view: both numbers as true lengths on a 0–1000 ruler (0–10 000 with four digits).
- **Order four:** four numbers onto a 4-step podium, by a tap or a drag.
  - Miss 1 flashes the wrong steps.
  - Miss 2 shows one wrong pair at the gate that decides them, as blocks.
- **The old activity's defects are gone:** the second match was forced, and there was no = round.

## Deviations from the design
- **Order miss 1** only flashes the wrong steps. The design parked every sledge on its true step, which hands over the whole order.
- **Free play** (typing any two numbers) is left out; nothing in the skill depends on it.
- **The row stays in `match-pairs-activities.json`**, as for rows 98 / 148–150. Only `tool` and `task_template` change.

## Files
- `mini tools/deciding-gate-core.js` (`DecidingGateCore`).
- `deciding-gate-activity.js` (`DecidingGateActivity`, prefix `dg-`, `apparatusClasses: ['dg-art']`).
- `deciding-gate-activity.html`.
- `ACTIVITY_WRAPPER_VERSION` 9.895 → 9.896.

## Native + pedagogy review (one reviewer, run in parallel with the gates)
Fixed at the source:
- **en learning goal:** "one hundred is more than any number of tens and ones" is false (15 tens > 1 hundred). It now says "more than 9 tens and 9 ones together", in all 11.
- **hintVs** said the *gate* drops; it is the *bar* (en "bar", de "Schranke").
- **no:** the thousands nouns are "tusener / tusenere" (they were "tusen", the number word). "bom" (miss) collided with "bommen" (the bar).
- **da/no:** "sammenligne to", parallel with "ordne fire".
- **nl:** "Tussen {a} en {b}" (it was a double "bij").
- **fi:** "paikka-arvo", "vertailu ratkeaa", "neliportainen", the title as a name.
- **es/it:** place-value phrasing ("lugar de mayor valor", "posizione di valore più alto").
- **de/es/pt/it/fi:** the activity's name is marked as a name, so it no longer reads as one gate.
- **All locales:** the ruler sentence says 10 000 with four digits.

## Gates
- `verify-deciding-gate-core.js`: 7,004 / 0, using its own comparator.
- `mutate-deciding-gate.js`: 25 / 25 killed, control passes. The one first-run survivor was the long view painted before Check; it is now gated structurally.
  - The gate's own digit-sum bot first broke ties by the true value, which handed the bot the answer. It now keeps ties in the shown order, as the design measured.
- `local-test-deciding-gate.js`: 2,376 / 0. Real taps and real drags (the sign into the box, a tag onto a step), the keyboard "=", 11 locales, six states × 320…1366.
- `visual-qa-activity`: 420 / 420.
  - The 320 px four-digit track first ran off the right edge. One geometry function now sets the columns, gaps and padding.
  - The thousands cubes were drawn smaller than a flat; they are now 3-D cubes.
- `audit-activity-hierarchy`: 422 / 0.
- `audit-settings-efficacy`: 2 live.
- Also passing: next-delay; content ×11; prose claims; SERP; tells; preflight.
- I read the 360 / 768 / 1024 renders myself.

## Live
Deployed 2026-10-29 (commit `220f269d`; mini-tools and the manifest copied before `deploy.sh`; preview scp'd). `live-verify-deciding-gate.js`: **52 pass, 0 fail** (all 11 pages 200; en, de, sv, fi × 1366 / 390: the tens called for 389/412 → the race stops at the hundreds; the hundreds gate and < → solved with the long view). The first run read Cloudflare's cached page; the rerun passed.
