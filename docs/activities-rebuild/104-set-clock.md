# #104 — Set the Clock → THE ECHO SLICE (1.MD.B.3, all 11 locales)

ORDER row 104 · id `clock.set-clock.1-md-b-3` (kept). Design: `designs/104-clock.md`.

## Files and wiring
- **New files:**
  - `mini tools/set-clock-core.js` holds the model:
    - the six round lists and the short-hand windows (design §6);
    - the units: short hand in 2.5° steps, long hand in minutes settled to fives;
    - the echo's slice h′ = round(q − m/60) and its end 30·h′ + m/2;
    - the receipt (what the hands say, "?" outside the window);
    - place / select / point / nudge;
    - Check with the kinds tray · ok · swapped · minutes · edge · hour;
    - the hint ladder and the plan.
  - `set-clock-activity.js` draws the clock, the tray, the time card, the receipt and the bell (CSS prefix `sc-`).
  - `set-clock-activity.html`.
- **Manifest, split as the design decided:**
  - The row's object was moved out of `clock-activities.json` into `set-clock-activities.json`. The sibling 2.MD.C.7 row stays byte-identical (the file re-serialises identically; git diff shows only the removed object).
  - `set-clock-activities.json` is registered in `MANIFEST_FILES` directly after `clock-activities.json`.
  - id, alignment, theme, slugs, titles, intros and kid prompt are frozen in all 11 locales (sha1 `e5436678`, checked).
  - `tool` is now `set-clock-activity`, `task_template` is `set-clock-echo`, and the params are `times` / `slice` / `rounds`.
  - `clock-activity.html`, `clock-activity.js` and `clock-core.js` have a 0-line diff; `verify-clock-core.js` and `local-test-clock.js` still pass on the sibling row (the moved row dropped from the latter's list).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.846.
- **Pictures:** none — the clock, tray, bell and receipt are drawn apparatus.
- **Sources** (scratchpad):
  - `sc-build.js` → `sc-strings.json` + `sc-times.json`. The clock times reuse row 103's reviewed tables; the 13 five-minute times are authored new.
  - `sc-apply.js`, `sc-manifest.js`, `sc-prose-src.js` → `sc-prose.json`, `sc-dump.js` → `sc-dump.md`.

## The invention
**The long hand's swept slice of the face is echoed, shrunk to one twelfth, inside the hour's own slice, and the short hand must point at the echo's end.**
- **Building:** both hands lie in a tray. A tap puts a hand on the hub, pointing at the 12 and chosen. A tap or drag anywhere on the face turns the chosen hand. The short hand settles on 2.5° steps; the long hand drags by the minute and settles on fives. The hub, or a tray button, chooses the other hand, and the arrow keys turn it.
- **Check:** the long hand's sweep from the 12 turns green, and its narrow copy, the echo, grows in the slice of the hour the short hand belongs to. A receipt prints what the hands really show, with "?" beside the hour when the short hand is not at the echo's end.
- **Miss 1:** the echo's end pulses and an arrow runs from the short hand's tip to it. The hint names what to fix: the short hand's place (edge), the hour (hour), the minutes, or the hands' roles (swapped). The receipt's minutes are underlined when they are wrong.
- **Miss 2:** the minutes 5 … 55 appear round the rim.
- **After a showing:** any hand move clears it.
- **Success:** wedge and echo turn solid, the bell rings, and the receipt turns teal with the time in words. The hands stay free and the receipt follows them.

## Rounds
Six levels:

| Level | Rounds |
|---|---|
| O'clock and half past (default) | 10 |
| O'clock | 8 |
| Half past | 8 |
| Quarter hours | 10 |
| Five minutes | 8 |
| Mixed | 10 |

- The lists are the design's. None repeats the 2.MD.C.7 sibling's eight times, and the hours spread over at least 8 numerals per level.
- The starting face is always empty, and the plan is an order-only reshuffle that never repeats the previous pass.
- Ticks change with the level: 12 for the o'clock levels, the 3 / 6 / 9 / 12 thicker for quarter hours, and 60 ticks plus the 5 … 55 scale for five minutes and mixed.

## Deviations from the design (each measured or ruled)
- **Hand colours follow rows 102–103:** short hand orange, long hand green. The sweep and its echo are therefore green, the long hand's colour.
- **The echo is a full-length sector in its hour lane** (radius 0.66 r, like the sweep), narrowed in angle only. At the design's literal 1/12 size it rendered as a 13 px sliver hidden under the short hand, so the invention was invisible.
- **No dotted ghost hands at miss 2.** They would show the answer (rows 102–103 dropped the same reveal). Miss 2 shows the minute scale round the rim, and the arrow to the echo's end stays.
- **Hand lengths** are long 0.55 r and short 0.40 r, with numerals at 0.72 r, measured. The design's 0.84 r long hand covers the numerals, and at 320 px the "10" touched its tick.
- **The scale numbers have their own band outside the rim**; they touched the rim at first.
- **The miss hint splits in two:** edge ("Nearly — point the short hand at the end of the little green slice") and hour ("Look at the paper: that is not the hour yet"). The design's single hintEcho would send a child with the wrong hour to the end of the wrong slice.
- **On phones the tray stays under the clock**, beside the time card, with the receipt under the target. The design let the receipt replace the tray, which took away the buttons keyboard users turn the hands with.
- **The target's words** sit in the time card on wide screens and in the task line on phones.

## Review
ONE native + pedagogy reviewer over the compact dump (all strings, all 40 times × 11 in their prompt and success lines, the prose).
- **Times and hints:** all 440 worded times were confirmed: the next-hour half, every "five to / five past half" form, noon in fr / it / pt, and es-MX "para". No hint states a time.
- **MUST:** the es / it / pt prose had an ungrammatical "for ten past" phrase; it now reads "put on the 10 to show «y diez / e dieci / e dez»".
- **SHOULD findings, applied:**
  - de "Auf dem Zettel steht" (a slip of paper does not print);
  - nl hintMinutes "tel in sprongen van vijf vanaf de 12" — the "12" is a cited gate exemption, poisoned;
  - da whole hours "klokken tre";
  - es-MX prompt "en un cuarto para" (prompt only — a prompt form `p` beside the words);
  - fr "pour indiquer « deux heures dix »" (it read as a duration);
  - fi "Viisarialusta" / "alustalla" (a cup is not a tray) and "kilikello" (kello is clock and bell).
- **Found by gates and renders, not the review:**
  - the echo invisible at 1/12 size;
  - the "10" against its tick at 320 and 640;
  - the scale numbers on the rim;
  - the tray width;
  - the clock svg read as a hand-drawn picture (now `aria-hidden`, with the label on its group);
  - the "Green slice" setting changing nothing at rest — "while setting" now draws the lanes green.

## Gates
- `verify-set-clock-core.js` — 1,597 checks, its own oracle (lists, windows and the sibling's times typed literally; the true short hand, echo slice and end computed in the gate), covering:
  - every round of every level: the true hands are accepted, the receipt prints the target, and the echo's end is the true short hand;
  - exactly the window's steps are accepted;
  - at half past, the short hand on the hour is refused (edge) and on the next number is refused (hour);
  - swapped hands are refused, as are the long hand on the minutes-as-numeral, five minutes off, and o'clock "between";
  - snaps, the hint ladder (a tray hand is no miss), the plan (including a constant generator), the strings and every time's words in 11 locales;
  - the next-hour half in de / nl / da / sv / no / fi, es-MX "para", no "på", the separators and noon.
- `mutate-set-clock.js` — 18 / 18 killed (core and activity), control survived.
- `local-test-set-clock.js` — 65,222 checks at 360…1366 plus 8,569 at 320 after the last tiny-width fix; real taps, drags and keys in 11 locales; every round of every level at rest, at miss 2 and solved, through 320…1366. It checks:
  - no sideways scroll, and the fold;
  - controls ≥ 44 px, nothing outside the card, bands that never overlap;
  - no hand reach, tick or scale number on a numeral;
  - hands drawn at the model's angles, and the echo's end on the short hand when solved.
- `visual-qa-activity` 60 / 60 · `audit-activity-hierarchy` 302 / 0 · `audit-settings-efficacy` 2 live · preflight-activity-routes (192 manifests, each id once) · prose-claims · SERP copy · activity-content ×11 · variety static scan — all green.
- The old engine: `verify-clock-core.js` and `local-test-clock.js` pass on the 2.MD.C.7 row alone.
- `live-verify-set-clock.js` on production: 70 / 0. All 11 pages of this row return 200, and all 11 of the 2.MD.C.7 sibling (still on clock-activity). In en / de / sv / fi at 1366 and 390, with real taps: both hands come from the tray; the long hand goes on the 6 and the short hand on the 7, which gives a miss (hintEdge, receipt "7?:30"); the short hand half way between the 7 and the 8 gives the celebration, the bell and a receipt with no "?"; the iframe grows with the card. The first run, inside the deploy window, saw no iframe; the rerun passed.
