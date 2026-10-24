# #102 — Sprocket's Clock (to the hour) → THE DIGITS THAT RIDE THE HANDS (1.MD.B.3, all 11 locales)

ORDER row 102 · id `clock-digital.read-hour.1-md-b-3` (kept). Design: `designs/102-clock-digital.md`.

## Files and wiring
- **New files:**
  - `mini tools/ride-hands-core.js`: the round tables, the hand angles (short 30h + m/2, long 6m), the number the short hand has passed and the collar the long hand points at, a card's ride (where each part lands and whether it merges), the card order (a bag of places), choose / Check / hint and the plan.
  - `ride-hands-activity.js` (the clock, the base display, the riding digit chips, the cards; CSS prefix `rh-`)
  - `ride-hands-activity.html`
- **Manifest:**
  - The row's text was cut from `clock-digital-activities.json` (its four other rows untouched) into its own `ride-hands-activities.json`, registered in `frontend/lib/activities.ts` `MANIFEST_FILES`.
  - Metadata is frozen in the 8 shipped locales (sha1 `442f76ca`, checked).
  - da / no / fi slug, title and intro are new (titles and first intro sentences reworded after review): da *laes-uret-hele-timer-1-klasse*, no *les-klokka-hele-timer-1-trinn*, fi *lue-kello-tasatunnit-1-luokka*.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.844. The existing grade and strand overrides for this id are unchanged.
- **Legacy gate:** `verify-clock-digital-core.js` still passes on the four remaining rows.
- **Picture:** Sprocket is `farm animals/rooster` (opened), perched on the clock's right shoulder as in row 101, clear of every numeral and of every resting digit (gated). Names as shipped: Sprocket, nl Kukel, sv Tore.
- **Reuse:** the clock's proportions, the time-phrase tables and the strings that say the same words (title, name, task line, Check, hintNone, the celebration, the clock's screen-reader lines, the Times labels) come from row 101, already reviewed.
- **Sources** (scratchpad): `rh-strings-build.js` → `rh-strings.json`, `hr-times.json`, `rh-apply.js`, `rh-manifest.js`, `rh-prose.json`, `rh-dump.txt`, `rh-review-fix.js`, `rh-probe.js`.

## The invention
**A digital time is the two hands written down.** The short hand is orange and the long hand green; every card writes its hour digits orange and its minutes green.
- On Check the chosen card docks in the display under the clock; its hour digits ride along the short hand to the number that hand has reached, its minutes along the long hand to the small 00 label at the 12 (or 30 at the 6). At half past the hour rides out to the rim between two numbers and slides back to the one the short hand has passed.
- A part merges (and its number flashes) only on its own number. A part that does not fit stops on its hand short of the number, the hand it rode glows and the number it should be lights up. A 12:00 card on a 3 o'clock clock sends its 12 to the 3, where it stays outside.
- Miss 2: both hands glow and both numbers light — the child still finds the card.
- Success: an hour passes (one lap of the long hand, one step of the short hand, the display flips), then the clock returns. After that the long hand is a button: each tap (or Enter) makes another hour pass, and the line names the new time.

## Rounds
| Face | Rounds |
|---|---|
| O'clock | H1–H10 (the nine old targets + 12:00): the right card, 12:00 (long hand read as the hour) or a far hour, and a neighbour hour. 12:00 is right once and wrong in six rounds. |
| O'clock and half past | M1–M10: the right card, the same hour with the other minutes, and the neighbour hour (or 12:00 in M6 / M8). |

- Card places come from a bag of the three places (a third each, never three running; gated over 300 showings, and the neighbour card left of the right one 40–60 %).
- The plan is an order-only reshuffle that never repeats the previous pass.

## Deviations from the design (each measured or ruled)
- **No hint names the hour** (the design's "The short coral hand points to {h}. The hour is {h}." would print the answer): the hints say to follow the short hand to its number; at half past, that the short hand is between two numbers and the card's hour is the one it has just passed (added at review); the minutes hint states the rule (12 → :00, 6 → :30).
- **No ghost card at miss 2**: both hands glow and both numbers light instead.
- **Free play only after the round is solved**: making an hour pass mid-round would change the clock the child is reading.
- **Row 101's hand proportions** (long hand 62 %, short 46 %, numerals at 76 %): the design's 88 % long hand covers the numerals.
- **Colours are orange and green in the words** ("coral" and "teal" are not words a six-year-old uses); with Hand colours off the hints drop the colour words (a second string set).
- **A part that does not fit stops on its hand short of the number** (the first build parked it beside the number and it half-covered it); resting parts are placed from what they rest at, so a resize moves them with the clock (a resize-stale chip was caught by the browser test). With half past, the display sits below the 30 label so a resting 00 never covers it.
- **No speaker corner** on the cards; tapping the short hand does nothing.

## Review
ONE native + pedagogy reviewer over the compact dump: the half-past hour hint (the main pedagogical finding), de "orangefarbenen", sv "till talet den pekar på", fi "kumpikin", "kertoo tunnin" and the minutes rule, the es / it / fr settings sentence in the prose, pt "visor" (not "mostrador"), fi learning goal, en "label" (not "collar") and "black" (not "ink"), and the da / no / fi titles and first intro sentences.

## Gates
- `verify-ride-hands-core.js` — 2,523 checks: the tables typed literally with the gate's own hands; exactly one card per round fits both hands; every wrong card fails on the part the table says; the hands at :30 exactly half way; 12:00 right once and wrong in six; the ride paths end where the hands point and the half-past slide-back lands on the passed number; resting parts clear of every numeral, at 288 / 328 / 648 px; card-place balance; the Check / hint ladder in both colour settings; the next-hour half phrases; no hint with a number (except the minutes rule) or a placeholder; colour words only in the colour hints.
- `mutate-ride-hands.js` — 15 / 15 killed (core and activity), control survived.
- `local-test-ride-hands.js` — 24,420 checks: real taps and keys, 11 locales, every round of both levels at rest / miss 2 / solved through 320…1366; the hands drawn at the model's angles; no hand, tick, resting digit or Sprocket on a numeral; no resting digit on the display.
- `visual-qa-activity` 60 / 60 · `audit-activity-hierarchy` 242 / 0 · `audit-settings-efficacy` 2 live · variety static scan ok · preflight-activity-routes, prose-claims, SERP copy, activity-content ×11 green.
- `live-verify-ride-hands.js` on production: 59 / 0 (11 locale pages 200; en / de / sv / fi × 1366 / 390, real taps: 12:00 → a miss with its 12 resting on the short hand and the 3 lit, 3:00 → the celebration; the iframe grows with the card).
