# #162 — Sprocket's Clock: Read the Clock to the Quarter-Hour → THE HOUR BALL (2.MD.C.7; all 11 locales)

ORDER row 162 · id `clock-digital.read-quarter-hour.2-md-c-7` (kept). Design: `designs/162-clock-digital.md`.

## The invention
- **A marble run on a clock.** Every time the long hand reaches the 12, a numbered ball rolls down the chute into the cup, so the cup holds the hour that has begun. At quarter to 4 the 4-ball still waits at the top behind the gate, and the cup holds the 3.
- **The cards.** Four flip-clock cards per round: the 2 × 2 of hour {right, neighbour} × minutes {right, the mirror 60 − m}. Every wrong card is a named reading error.
  - The neighbour is the hour before in half the rounds and the hour after in the other half; 12:45 wraps to 1.
  - Each minute value appears twice. The cards are reshuffled at every showing, and the right card never sits in one place three times running.
- **Posting a card.** Tapping a card posts its hour as a marble over the cup's shut lid and its minutes as a flag pin in the rim. Check opens the lid.
- **What a miss shows.**
  - **Wrong hour:** the marble bounces off the cup ball. A later hour is still waiting at the top, with its number shown; an earlier one is marked in the tray of past hours.
  - **Wrong minutes:** the pin stands apart from the long hand, with a dotted gap along the rim. The hint ASKS how many minutes the number stands for.
  - **The right part of a card** clicks into place (the cup ball glows, or the pin turns teal).
  - **Check again with the same card** gives "tap another card first", not a miss.
  - **Miss 2:** the clock runs on to the 12 so the next ball drops only then, and back. The waiting ball shows its number. On :45 rounds the help carries the locale's own time phrase.
- **Success.** The line gives the digits plus the locale's own spoken time, copied byte for byte from the native-reviewed `learning-clock.js` tables (de "Viertel vor 10", nl "tien voor half 4", pt "quinze para a uma"). Sprocket hops, and the clock runs on a quarter, so on :45 rounds ball h+1 drops. After that the long hand can be dragged (or stepped with the arrow keys), and a ball drops or rolls back at every 12.
- **Settings.**
  - Times: quarter hours (10 rounds incl. 12:45) or five minutes (10 rounds). At rest the bold rim marks change: 4 quarter marks or 12 five-minute marks. Order-only reshuffle; never three :45-type rounds in a row.
  - Past hours: show or hide the tray.

## Deviations from the design
- **The tray balls are face-down during a round,** turned up when the lid opens. With 2 and 1 showing, the hour (3) could be read off the tray, which would give the answer away.
- **The minutes hint asks, it does not state the minutes** ("How many minutes does the 9 stand for?").
- **Miss 2 names where the balls are, not the time.**
- **Cards use the locale's separator** (":" / "." / fr « h »), like rows 160/161.
- **No 600 ms "this part is right" flash.** The right part simply stays marked.
- **The run-on stays on the round's time afterwards;** the success quarter-run starts free play.
- **On phones, once solved,** only the right card stays and the board closes up, so the success line and Next fit at 320 × 640.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE ×11 (English source):** "Ball 2 dropped an hour ago" was false. At 3:45 it dropped 1 h 45 min ago; at 1:45, "ball 12 an hour ago" is off by 45 minutes. It now says "Ball 2 dropped before ball 3", with no tray mention because the tray can be hidden. Gated and mutated.
- **SEVERE it:** «più tarda / più presto» → «successiva / precedente».
- **Minor:**
  - hintMinutes in en/fr/es/pt;
  - en «ball» in howToPlay;
  - de «Die Stunde der Karte», «eine Viertelrunde gemacht»;
  - es/pt titles with the two idioms in « »;
  - nl «kwartslag gedraaid», prose;
  - sv «det sista talet» (10–12 are not digits);
  - da «den anden fejl», «geometri og måling»;
  - no «den andre feilen»;
  - fi «neljänneskierros», prose.
- **Kept:** it «l'una» comes byte-faithful from the reviewed learning-clock table.

## Gates
- **Logic:**
  - `verify-hour-ball-core.js` 3,493/0, with its own tables and its own 2 × 2 card arithmetic, and checks:
    - every card × every round graded;
    - the right card's time-rank ≤ 3 per rank;
    - card positions 22–28 %, never 3 in a row;
    - the run-on cup changes only at the 12;
    - free play drops and returns a ball at each crossing, with 12:45 wrapping to 1;
    - each phrase recomposed by the gate itself from `learning-clock.js`, ×11 × 20;
    - the half-idiom ban; hintMinutes never states the minutes;
    - the plan.
  - `mutate-hour-ball.js` 29/29 killed, and the control passes.
- **Browser:**
  - `local-test-hour-ball.js` 1,650/0 in 11 locales: real taps on the cards, a real drag of the long hand back across the 12, the keyboard, plus 4 states × 8 widths.
  - visual-qa 240 renders each in en/de/fi/fr; hierarchy 302/0; settings efficacy 2 live.
- **Content:** prose claims, SERP copy, content tells, next delay and preflight routes all pass.

## Live (2026-10-29, commit 0c240130f)
- `live-verify-hour-ball.js` on production: 54/55 in one browser (fi @390, the eighth page opened, timed out finding the iframe: the known harness flake), then `--locales=fi` 24/0. Real taps in en/de/sv/fi at 1366 and 390 px, 11 pages 200.
