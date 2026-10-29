# #159 — Sprocket's Clock: 12-Hour & 24-Hour → THE SECOND RING (2.MD.C.7 extended; all 11 locales)

ORDER row 159 · id `clock-convert.12-24.2-md-c-7` (kept). Design: `designs/159-clock-convert.md`.

## The invention
- **The hour hand carries a counting tag.** An open card shows a time one way (12-hour with its day-part, or 24-hour). The child WRITES it the other way: an hour box and a minute box on a number pad, plus a day-part chip for a 12-hour answer. There are no options to guess between.
- **On Check the clock runs from midnight to the CHILD's time:**
  - on the first lap the tag says the face's numbers;
  - at noon the library sun pops up on the rim;
  - on the second lap the tag keeps counting 13, 14, 15… and drops each number into an empty socket under the face's numeral — the second ring.
- **The outlines show whether the answer is right.** The given time stays on the face as dashed outlines, and a right answer lands in them.
  - Writing 20:00 for 8 a.m. sends the run past the sun ("did the open card's time?").
  - 17:00 for 15:00 stops two sockets past the outline.
  - Changed minutes, noon and midnight each get their own hint.
  - After a second miss the clock shows the GIVEN time's run, with its last token face-down ("?").
- **Kept tokens stay for the session.** The child builds a 24-hour face from their own right answers; a level change or "empties every round" clears it.
- **The day-part chips are each locale's own words, and each round accepts every natural one:**
  - de: morgens / vormittags / mittags / nachmittags / abends / nachts;
  - the en/es/fi/sv two-lap words;
  - a noon word where the locale has one.
  - 23:00 accepts "abends"/"nachts", "om aftenen"/"om natten", and so on.

## Deviations from the design
- **No free play with the tag between rounds.** The run after each Check is the only movement, and the hands are fixed during a round.
- **The run steps hour by hour** (~0.1 s per hour). The given hands stay as outlines. The tag is hidden at rest, because it would give away the 24-hour answer.
- **On phones under 330 px** the two cards sit beside the clock; the open card's text shrinks to fit a long day-part word (never below 13 px).
- **The success lines in es/it/pt say "X and Y are the same time"**, which avoids the article and verb-agreement traps of "las 3 son las 15".
- **sv, da, no and fi pages are NEW** (slug, title and intro written in this build and native-reviewed). en..nl metadata is frozen, and the per-locale rooster names in the titles (Kiko, Quico, Chicco, Kukel) stay.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **Success lines:** es/it/pt grammar; "the tag says" → "shows" in de/fr/pt/nl/sv/da/no.
- **Natural answers now accepted:**
  - pt "da tarde" at 18:00;
  - de "abends" from 17:00;
  - da/no "om natten / om natta" at 23:00.
- **Noon and other wording:**
  - nl: "middag" (afternoon) replaced by "12 uur ’s middags" for noon in the settings and the prose;
  - sv: noon and midnight written «klockan tolv mitt på dagen» / «midnatt»;
  - da: one noon form throughout;
  - de/nl/no: the "empties every round" labels;
  - es: the times setting;
  - en and sv: prose fixes.

## Gates
- **Logic:**
  - `verify-second-ring-core.js` 198,275/0. It keeps its own tables, its own conversion, its own chip tables and its own grading. It grades every answer the child can write × every round × every locale.
  - The run, the ring and the sockets are checked, and "8" equals "08".
  - Bots: "always ±12" fails ≥ 3, "never change the hour" fails ≥ 6, "0 o'clock" wins only midnight.
  - The plan never repeats an order and never puts three rounds of one direction in a row.
  - `mutate-second-ring.js` 26/26 killed, and the control passes.
- **Browser:**
  - `local-test-second-ring.js`: 11 locales, real taps on the pad, the boxes and the chips. It covers the scenarios in its header, plus 5 states × 8 widths.
  - visual-qa 240 renders each in en/de/da; hierarchy; settings efficacy.
- **Content:** prose claims, SERP copy, content tells, next delay and preflight routes.
