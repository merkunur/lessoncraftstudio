# #113 — Domino's Two-Part Words → THE FREEZING FLOES (RF.1.3.e; all 11 locales)

ORDER row 113 · id `domino-two-part.two-syllable.rf-1-3-e` (kept). Design: `designs/113-domino-two-part.md`.

## Files and wiring
- **New files:**
  - `mini tools/freezing-floes-core.js` holds the model:
    - the slots (three seats for every picture), place / take back / swap / move the frozen word, the cold snap, the hints, the frost help and the plan;
    - the DATA block is generated from the gates and the picture index by a build script, never hand-split.
  - `freezing-floes-activity.js` draws the ice shelves, the shelf of pictures with their slots, the pond of bobbing floes, the frozen word, the penguin and its walk. It owns taps, drags and swaps (CSS prefix `ff-`).
  - `freezing-floes-activity.html`.
- **Manifest:** the row MOVES out of `domino-two-part-activities.json` (now `[]`) into a new `freezing-floes-activities.json`, registered in `MANIFEST_FILES`.
  - `tool` is now `freezing-floes-activity`, `task_template` is `freezing-floes`.
  - en / de / es / pt / it / nl slug, title and intro are frozen.
  - **fr / sv / da / no / fi slug, title and intro are authored new** ("two and three syllables", since the decks hold both) and were reviewed.
  - `domino-two-part-activity.*` has a 0-line diff and no row any more (removal is an operator step).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.857.
- **Prose:** en / de / es / pt / it / nl replaced; fr / sv / da / no / fi added.
- **Strings:** 34 keys × 11.
- **Sources** (scratchpad):
  - `ff-build.js` (+ `ff-build-fix.js`; data from the gates and the picture index); `ff-picidx.json` (the picture index, colour themes);
  - `ff-strings.js` → `ff-apply.js`; `ff-prose.js`; `ff-manifest.js`; `ff-review-fix.js`; `ff-sheet.js` (contact sheets).

## The invention
**Syllables are ice floes that only freeze together when they really make the picture's word, in the right order.**
- The floes bob on a pond. Tap a picture to make its slot glow, then tap floes: they float into it. Or drag a floe to any slot.
- Every slot has three seats, so it never tells how many pieces the word has.
- **Check is the cold snap:**
  - the pieces that are the word, from the left, freeze white and stay;
  - a wrong piece cracks off and drifts back.
- When every word holds, the penguin (the library penguin; it steps aside when a picture on the shelf is a penguin) waddles across. The words go onto the two-piece and three-piece ice shelves.

**Clues:**
- **Join the floes:** three pictures, their pieces loose; some shelves share first parts (pen·cil, pen·guin, pep·per).
- **Missing piece:** one piece frozen in place, one gap; the right floe plus two decoys.
- **Mixed-up word:** three-part words seated out of order; tap two pieces to swap.
- **Read and find:** a frozen word; push it to its picture.

## Deviations from the design (each measured or ruled)
- **Word lists.**
  - EN rounds are the design's tables, with one change: *baker* → *barber*. The review: "bak·er" is a closed first syllable a teacher would object to; barber is gated with all three sources.
  - The other ten locales use a curated word list per locale. Every split is the locale's gate entry (da: `policy_managed:false`) and every picture's label equals the word. Join / Missing / Mixed / Read rounds are generated from that list by the build script:
    - nine distinct shelves — two neighbours that share their start, plus one from across the list;
    - Mixed from three-part words only;
    - Missing decoys from the same place in other words;
    - a rude-word refusal on every shelf and every gap.
- **Pictures:** every picture was checked by eye on contact sheets.
  - **Refused:** da *løbehjul* (the picture is a motor scooter, not a kick scooter); fr *rose* and *cadeau* and sv *paprika* first matched the wrong gate entry (a colour, a missing picture) — the builder now matches only pictured entries.
  - de *Würfel* shows a cube (also correct German); no *klokke* is a clock and the other Nordic *klokke/klocka* a bell (both correct).
- **Mechanic simplifications:**
  - no docking floes together in open water (the slot is where a word is built);
  - no free play with the penguin; no Word-length setting;
  - the floes bob in CSS rather than on drifting paths.
- **Narrow layout:**
  - pictures 64 px beside their slots in rows;
  - the ice-shelf tags hidden below desktop width;
  - smaller floes at 320 px — the local test found Check below the fold at 320 / 360 on the long-word shelves, and this is the fix.
- **The penguin is 96 px at desktop widths** (the hierarchy floor for pictures).

## Review
ONE native + Grade-1 reading reviewer over all 11 locales.
- **Confirmed:**
  - the splits match how a Grade-1 class splits in each locale (de keeps ck, fi keeps long vowels in one syllable, es/it/pt open syllables, fr written syllables with the mute e);
  - no Join shelf can form a second right answer; the decoys never make the picture's own name;
  - no "free", no invented features.
- **MUST, applied:**
  - two-piece Mixed rounds needed no reading (one swap) → Mixed is three-part words only, with each pool widened from the gate;
  - it decoy *ne* made *pene* → a rude-word refusal in the builder and the gate;
  - it had only 3 distinct shelves → nine distinct shelves everywhere;
  - the en prose claimed every shelf shares first parts → corrected;
  - da *et isflage* → *en isflage* (strings, intro, prose).
- **SHOULD, applied:**
  - en baker → barber;
  - de / fi / es hintRead2 name the picture;
  - es "empieza con", "pedazo de hielo", Mexican hintStart, ¡ punctuation;
  - fr "former" (not "écrire") and the space before !;
  - pt "A geada mostra qual é";
  - it "per la classe prima";
  - the fr / sv / da / no / fi titles and slugs say two AND three syllables;
  - es / pt shelves no longer let a child build *caca*.
- **Kept, with reason:** es "Comprobar" and "currículo oficial" are the house wording across the shipped es activities.

## Gates
- `verify-freezing-floes-core.js` — 5,528 checks with its own ground truth: each locale's gate file and the picture index, re-read from disk. It covers:
  - every split = the gate (en: three sources; da: `policy_managed:false`); pictures and labels;
  - the refused EN splits;
  - round shapes;
  - nine distinct shelves; Mixed three-part only;
  - no second right answer on any shelf (every 2–3-floe sequence) or in any gap;
  - no rude join or decoy;
  - the cold snap (right / reversed / missing / prefix freezes / given stays / Mixed swaps / Read picture / empty is no miss);
  - the pond never in order;
  - the plan;
  - the strings × 11.
- `mutate-freezing-floes.js` — 14 / 14 killed, control survived.
- `local-test-freezing-floes.js` — real taps, drags and swaps in all 11 locales:
  - the scenarios;
  - every clue × round of every set at rest, at miss 2 and solved, through 320…1366;
  - every seated piece inside its slot.
  - Count: 44,792 checks, 0 fail (+ en re-run at 704–1366 after the penguin grew to 96 px: 1,732, 0 fail).
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 358 / 0 · `audit-settings-efficacy` (clue live) · preflight-activity-routes · prose-claims · SERP copy · activity-content × 11 — all green. 0 lines to shared cores or lcs-shell.

LIVEVERIFY
