# #95 — Compare Two-Digit Numbers → THE TEN-ROD DRAWERS (1.NBT.B.3, all 11 locales)

ORDER row 95 · id `choice-board.compare-two-digit.1-nbt-b-3` (kept). Design: `designs/095-choice-board.md` (with the input `rebuild-inputs/95-ten-rod-drawers.md`).

## Files and wiring
- **New files:**
  - `mini tools/rod-drawers-core.js`: the round tables, the locks, the sign, Check / hint / grab, the order staircase and the plan.
  - `rod-drawers-activity.js`
  - `rod-drawers-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `rd-`.
- **Manifest:**
  - The row moved from `choice-board-activities.json` to its own `rod-drawers-activities.json`. The old file diff is a pure 88-line deletion; its formatting is untouched.
  - The new manifest is registered in `MANIFEST_FILES`, and `tool` is repointed.
  - Slug, title and intro are frozen in all 11 locales (sha1 `9579c3b6`, checked).
  - preflight: 204 coordinates, each resolving exactly once.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.836. There is no grade or strand override for this row.
- **Legacy gates step aside:** `verify-choice-board-compare.js` and `local-test-choice-board-compare.js` exit 0 with a pointer while the row is out of `choice-board-activities.json`.
- **Pictures** (groups level): fruits/apple, banana, strawberry and orange, and **at-the-supermarket/pear** (fruits/pear is red-blushed, per RULINGS). They are opened and checked. The fruit stands full size (96 / 64 px) on both cabinets, or once beside the staircase. The packs and loose pieces are drawn counters in the fruit's colour, never shrunken pictures.
- **Sources:** scratchpad `rd-strings.json` + `rd-apply-strings.js`, `rd-prose.json` + `rd-fr.js`, `rd-manifest.js`, `cb-cut.js`, `rd-dump.md` (the reviewer's text), `rd-review-fix.js`, `rd-probe.js`, `rd-aside.js`.

## The invention
**Each number is a cabinet whose tens drawer must open first, and whose ones drawer locks shut when the tens already decide. The sign is fitted to the two value columns: its open side goes round the taller one.**
- The drawers of one place are linked under the podium: one knob per place opens both cabinets' drawers.
  - It is a deliberate build choice: it keeps four-digit knobs at ≥ 44 px on a 320 phone.
  - The design itself says "pulling one pulls its partner".
- A place opens only when every place to its left is open and equal. Once an open place differs, the places to its right are **sealed** (a padlock with a tick); a pull only rattles.
- When the deciding place is open, the sign stands up and turns < → > → = on each tap.
- **Check (two-digit and groups):**
  - every drawer opens;
  - the sign stretches between the two columns, which are drawn to scale (rods of ten, ones on top);
  - right: the open side holds the taller column and the sign pins;
  - wrong: the open side hangs in the air beside the short column and the point jabs the tall one;
  - "=" lies level only on equal columns, and tilts otherwise.
- **Four-digit:** no columns. Each opened place raises a small tower of that place's blocks, compared only within the place.
- **Order rounds:** three cabinets go onto a staircase, by tap or drag, with a dot icon for small → big or big → small.
  - At Check the columns rise above the cabinets as a skyline.
  - The first misplaced cabinet hops back to the waiting row.
  - Four-digit order shows no towers: towers that are not to scale would let a tall hundreds tower out-shout a smaller thousands digit.

## Rounds
- **Compare:**
  - two-digit: 10 rounds; one =; bigger number left 5 and right 4; 3 digit swaps; 3 equal-tens rounds; 4 rounds where the ones point the wrong way;
  - groups to 20: 8 rounds;
  - four-digit: 8 rounds, deciding at the thousands, hundreds and tens.
- **Order:** 8 rounds at each level. The direction alternates, the waiting row never starts in order, and the greatest card starts in places 1 / 2 / 3 as 3 / 3 / 2. The groups and four-digit order tables were authored for this build under the same rules.
- **Four-digit numerals:**
  - en: 4,321
  - fr / sv / no / fi: 4 321, with U+202F
  - de / nl / it / es / pt / da: 4321
  - never a point.
- No round counts a 0. Passes reshuffle by order only: never the previous pass, and never three of one sign in a row.

## Feedback
- **Check before deciding:**
  - with the drawers shut: hintTensFirst, or hintLeftFirst for four-digit;
  - with the tens equal but the ones still shut: hintOnesNow / hintNextNow;
  - with the sign lying flat: hintTurn.
  - None of these counts as a miss.
- **Miss 1:**
  - the deciding knob and drawers glow and the sign wobbles;
  - the hint depends on the case: hintLookTens (the tens decide, including the ones-first trap), hintOnesDecide, hintLookLeft (four-digit), hintEqual (an "=" on unequal numbers), hintSame / hintSameFour (equal numbers).
- **Miss 2:**
  - the tens are counted 10, 20, 30 inside each column, with the number on top, and a dotted line marks the gap;
  - the hint is hintOpenSide, except for equal rounds, which keep hintSame because they have no bigger number;
  - there is no "ghost" of the right sign, because that would print the answer.
- **Order hints:** hintOrder / hintOrderFour, then hintColumns.
- **Success:** the sentence reads left to right ("29 is less than 92!"); order: "34, 38, 43 — from the smallest to the biggest!".

## Review (one reviewer, all 11 locales; every finding fixed at the source)
- **A MUST, also caught by the local test:** after a wrong Check the sign was hidden behind the grab overlay, so the child could not turn it again. It now stays tappable above the overlay and hides only once the round is solved. A poison test restoring the old rule fails the local test.
- **A MUST:** in equal rounds the second miss said "the open side holds the bigger number". Equal rounds now keep their own hint on the second miss (core, gate and mutation).
- **The equal hint used to almost give the answer** ("both numbers are the same"). It now points at the evidence ("Are the columns the same height?"), with a drawer-pair version for four-digit.
- **The prose now says that every drawer opens at Check.**
- **Native fixes:**
  - de: unhyphenated Zehnerschubladen / Einerschubladen / Hunderterschubladen / Tausenderschubladen;
  - es-MX: «jaladera», «acostado», «se agregan»;
  - pt: the subjunctive;
  - nl / no: the comparative «grotere / hogere / høyere»;
  - sv: «grupperna»;
  - fr: «inutiles ici», «retourne d'un bond»;
  - fi: «Ryhmä, jossa on {n}», «kympin pakkauksia»;
  - it: «fa solo rumore», «turni di ordinamento»;
  - the equal-hint wording in every locale.
- **My own render reads found:**
  - the right column's labels sat on the cabinet edge, so they are now inside the rods;
  - the fruit shrank to 28 px on the order cards, so there is now one full-size fruit;
  - the four-digit order towers misled, so they were removed;
  - a 1 px rod margin broke the column scale, so it was removed.
- **Frozen metadata, flagged only (not edited):**
  - All intros describe only two-digit comparing; the game also has groups to 20, four-digit numbers and ordering three.
  - en / de / es / it / no say "tap the true statement", but the child now turns a sign.
  - fr intro: "grande section et le CP".
  - it intro: "fino a 99".
  - fi intro: "kymmenistä" where the UI says "kympit".

## Gates
| Gate | Result |
|---|---|
| `verify-rod-drawers-core.js` (own string-digit oracle) | 2,160 / 0 |
| `mutate-rod-drawers.js` | 19 / 19 killed + control |
| `local-test-rod-drawers.js` (real clicks and a real drag, 11 locales, every level × task × round at rest / miss 2 / solved, resized 320–1366, columns to scale; poison check: the hidden-sign defect fails) | 64,493 / 0 |
| visual-qa | 60 renders PASS (the note scales 17 → 19 px) |
| hierarchy | 482 / 0 |
| settings | 2 live |
| preflight, prose-claims, SERP | PASS |
| `live-verify-rod-drawers.js` | production, en / de / sv / fi × 1366 / 390 |
