# #144 — Tally's Acorn Baskets → THE ACORN SIEVE (2.NBT.B.6; all 11 locales)

ORDER row 144 · id `tally-squirrel.add-four.2-nbt-b-6` (kept). Design: `designs/144-tally-squirrel.md`.

## The invention
- **A sieve that sorts by place value on its own.** Its holes let single acorns through but hold back cups of ten.
  - The child taps each basket (a drawn wooden tub with its number on it) to tip it onto Tally's sieve. The tub hangs upside down, empty: it cannot be counted twice.
  - Then the child shakes the sieve by its grip, with a drag back and forth or a tap. Every loose acorn drops into a tray of four grooves of ten, while the cups stay on top.
  - So all the tens of all the baskets land together and all the ones land together: the partial-sums method as a machine.
- **Three windows:** cups (one digit plus a printed 0), loose acorns, and the total. Check compares each window with what lies on the sieve and in the tray.
- **A full groove** can be tapped to roll into a cup: the ten inside the ones.
- **The cloth (default on)** covers the sieve and tray, and the grip sleeps. The child works from the numbers; Check lifts the cloth and shakes the sieve itself.
- **The misses:**
  - **Miss 1:** the wrong windows are ringed, the cups label themselves 10, 20, 30… and each groove shows its count. EN "Count the cups by tens and the loose acorns by ones."
  - **Miss 2:** every basket splits into its tens and its ones, and the two sums appear (`10 + 20 + 30 + 10 = 70`, `5 + 2 + 4 + 1 = 12`). A wrong cups window gets the right count in pencil.
- **Success:** full grooves roll up into cups, Tally (library squirrel) hops, and the jar fills one notch.
- **Settings:**
  - **Baskets:** three small (G1-112: three baskets of 1–5 loose acorns, total up to 10; only the total) / two or three / up to four (default, the old nine rounds) / number wall (G2-313).
  - **Number wall:** tapping the empty brick pours its two supporting bricks onto the sieve; the brick takes the answer; the wall fills bottom-up.
  - **Cloth:** on / off.

## Files and wiring
- **New files:**
  - `mini tools/acorn-sieve-core.js` (`AcornSieveCore`): the four round tables, tip / pour / shake / grooves / groove-to-cup, typing, the check with literal hint keys, the split, the banded plan.
  - `acorn-sieve-activity.js` (`AcornSieveActivity`, prefix `as-`, `apparatusClasses: ['as-art']`).
  - `acorn-sieve-activity.html`.
- **Manifest:** the row stays in `tally-squirrel-activities.json`; en..sv slug / title / intro are frozen.
  - `tool` → `acorn-sieve-activity`.
  - params = `{baskets: [small, few, four, wall], cloth: [on, off], rounds}`.
  - da/no/fi get a new slug, title and intro, so the row now ships in 11 locales.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.888 → 9.889.
- **Prose ×11:** rewritten. Each quotes real rounds: 15 + 22 + 34 + 11 = 82 (7 cups, 70; 12 loose), 23 + 14 with 7 in the tray, 3 + 4 + 3 = 10, and the wall 12, 15, 21 → 27, 36 → 63.
- **Deviations from the design:**
  - **The number tag sits on the tub, not on a string above it**, which saves height at 320 × 640. It stays upright when the tub tips.
  - **The small face has no cups window.** The design greyed it with a 0 showing, but counting activities never show 0.
  - **A narrow number wall hides the optional cups / loose windows**; the brick itself takes the answer. Tally sits beside the top brick.
  - **A cup cannot be dragged back into a groove** (a cup is 20–26 px wide, under the tap floor).
  - **The task line is one short sentence** ("Tip every basket onto the sieve, then fill the three windows."); the full question is the instruction.
  - **No spoken line.**

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **en:**
  - "Count the cups by tens" (was "in tens").
  - The wall line now says "added together".
  - The prose no longer says the grooves are counted one by one; each groove shows how many it holds. This was carried into es/pt/fr/it/de and fixed there too.
- **de:** "Kästchen", not "Fenster"; "Zehnerschritten"; a doubled "dann".
- **fr:** "de dix en dix", "un par un".
- **es:** the ¡ opens only the exclamation; "convertirlo en un vasito"; "canal" is masculine.
- **pt:** "se vê na hora"; "transformá-la num copinho".
- **it:** "di dieci in dieci".
- **nl:** "zijn samen"; "met sprongen van tien"; "het kind", not "je kind".
- **sv:** Lgr22 covers åk 1–3.
- **da:** Fælles Mål after 3rd grade; "trykker på"; the new intro says "vælter … ud på".
- **no:** "på brettet"; "trykker på Sjekk, forsvinner kledet".
- **fi:** "yhdeksi kymmeneksi"; a noun phrase in practices.

## Gates
- **`verify-acorn-sieve-core.js`: 2,779 checks, 0 fail.**
  - **My own tables:**
    - the nine kept rounds, re-solved;
    - the full-groove rounds 4, 6, 7, 8, 9 (at least half a pass);
    - two-or-three never regroups;
    - small totals 4–10, all different;
    - every wall brick is the two under it.
  - **The old rounds**, read from git (072c1b9e).
  - **A scripted player for every round of every face**, cloth on and off:
    - tip once, never twice;
    - a shake conserves every acorn, and no groove holds more than ten;
    - a groove rolls into a cup, never under the cloth;
    - the wall fills bottom-up.
  - **The verdicts, the bots and the plan:**
    - the hints and the split;
    - the bots: digits-as-ones 0/9, tens-only 0/9, first-two 3/9, side-by-side 4/9, only where the ones stay under ten;
    - the plan: bands kept, never the same order twice.
  - **Strings ×11:**
    - never "free", no digit in a hint;
    - each success line built exactly from its template;
    - every key reached.
  - **Prose ×11 and the manifest.**
- **`mutate-acorn-sieve.js`:** 26/26 killed, and the control passes.
  - The first run left two survivors: a groove rolling under the cloth, and the success line with tens and ones swapped.
  - Both are now gated.
- **`local-test-acorn-sieve.js`: 11,121 pass, 0 fail** (real pointer, 11 locales). It covers:
  - the 23 + 14 walk-through: hintTip → a drag-shake → hintFill → miss 1 labels → miss 2 sums → solved → Next 0.5 s later;
  - the groove roll;
  - the cloth;
  - the small face;
  - the wall;
  - then every round of every face at rest / miss / solved through 320…1366.
- **`visual-qa-activity`:** 216 renders pass.
- **`audit-activity-hierarchy`:** 758 / 0, after every drawn SVG was declared `as-art`.
- **`audit-settings-efficacy --tool=acorn-sieve-activity`:** both settings live.
- **Other gates:** `audit-activity-next-delay` passes; content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the renders** found what no gate had:
  - a tipped tub flipping up over its own tag;
  - Tally's jar spilling off the narrow card;
  - the hint below the keypad on a phone;
  - the 320 × 640 fold;
  - wrong-window rings and sums left on after success;
  - the baskets touching the cloth.

  All fixed.
- **The local test found a real defect:** the tip and shake animations repainted the whole stage on a timer, which could swallow a tap. Both are now one-shot animations.
- **0 lines** in shared cores or `lcs-shell`.
