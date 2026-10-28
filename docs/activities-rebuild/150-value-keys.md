# #150 — Expanded Form → THE VALUE-KEY ADDING MACHINE (2.NBT.A.3 with 1.NBT.B.2; all 11 locales)

ORDER row 150 · id `place-value.expanded-form.2-nbt-a-3` (kept). Design: `designs/150-place-value.md`.

## The invention
- **An adding machine whose keys are labelled with what they are WORTH:** 100…900, 10…90, 1…9.
  - A column holds one key. There is **no zero key**, so 305 is made with 300 and 5, and nothing in the tens.
  - The crank (dragged, tapped, or Check) adds the keys. The drums show the sum, and the tape prints the expanded form, largest first: 300 / + 5 / = 305.
  - Making the number IS writing its expanded form.
- **Jobs:**
  - make (the ticket);
  - read the blocks;
  - what is the bright digit worth (one key);
  - which set? (two digits: feed one of three block sets; the machine presses its keys by itself).
- **Numbers setting:** tens and ones, or hundreds, tens and ones.
- **Misses:**
  - miss 1: the drums show what was made, and the ticket's differing digits glow;
  - a key in a zero place gets its own hint ("The ticket has 0 tens. A zero place needs no key.");
  - miss 2: the ticket opens into pockets with each digit's blocks and "4 tens = 40";
  - read: the keys' blocks are compared with the shown blocks (extras crossed, missing ones as outlines), then the shown blocks are numbered;
  - worth: the key's blocks sit beside the bright digit's blocks, with "?" in place of the answer, then the right column glows;
  - which set: every set shows its value.
- **Phones:** one tab per place plus that place's 3 × 3 pad (smallest bottom-left, bigger is higher), and the crank drags sideways. The tray takes the order strip's place.

## Files and wiring
- New:
  - `mini tools/value-keys-core.js` (`ValueKeysCore`);
  - `value-keys-activity.js` (`ValueKeysActivity`, prefix `vk-`, `apparatusClasses: ['vk-art']`);
  - `value-keys-activity.html`.
- **Manifest:** the row stays in `place-value-activities.json`, as for rows 98 / 148 / 149. The design asked for a new file, but the route is identical either way. Only `tool` and `task_template` change; slug, title and intro are frozen.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.894 → 9.895.
- **In-tool titles** use the school term where the frozen page title is a calque: de Zahlen zerlegen, it Scomposizione dei numeri, nl Getallen splitsen, fi Luvun hajotelma.

## Native + pedagogy review (one reviewer, started as soon as the strings existed)
Fixed at the source:
- **The page text's "2 in the ones instead of 200 gives 49" cannot happen**: a column holds one key. It is now "30 instead of 300 gives 35, not 305" ×11.
- **An empty crank outside make** said "the number needs", but no number is on screen there. It now says "Press a key first."
- **de:** "Gruppe" for the set (it was "Blöcke", the same word as the blocks).
- **Grade of the two-digit setting:** de 2. Klasse, it classe seconda, nl groep 4.
- **sv:** "Hoppa över". **da:** "Efter anden fejl". **fi:** "hajotelma", in place of "hajautettu muoto".

## Gates
- `verify-value-keys-core.js`: 8,065 / 0, on its own arithmetic.
- `mutate-value-keys.js`: 30 / 30 killed, control passes. The two first-run survivors were real gaps:
  - the help naming a zero place was never tested;
  - "never the same order" was only sampled. It now runs on a replayed random stream.
- `local-test-value-keys.js`: 3,256 / 0. Real taps and drags, 11 locales, wide + narrow, eight states × 320…1366.
- `visual-qa-activity`: 864 / 864, phase driver `visual-qa-phases/place-value.expanded-form.2-nbt-a-3.js`. Its first runs found:
  - the tray and pockets running past the screen;
  - the tray moved into the order panel;
  - the 320 px tape waits for the win.
- `audit-activity-hierarchy`: 398 / 0.
- `audit-settings-efficacy`: both settings live.
- Also passing: next-delay; content ×11; prose claims; SERP; route preflight.
- I read the 360 / 768 / 1024 renders myself.

## The faster workflow (from this row on)
- `scripts/lib/activity-harness.js` holds the shared plumbing of local tests and live checks. This row's two scripts are mostly scenarios.
- The reviewer starts as soon as the strings and prose exist, while the gates are written.
- Visual QA runs in the background while the local test runs.
