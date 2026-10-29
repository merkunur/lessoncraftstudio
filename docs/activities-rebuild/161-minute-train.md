# #161 — Sprocket's Clock: Read the Clock to Five Minutes → THE MINUTE TRAIN (2.MD.C.7; all 11 locales)

ORDER row 161 · id `clock-digital.read-five-minute.2-md-c-7` (kept). Design: `designs/161-clock-digital.md`.

## The invention
- **A toy railway inside the rim.** Every carriage is exactly one number-gap long: five minutes.
  - Tapping the tunnel at the 12 (or +) sends carriages out; each couples on and lights its roof number: 5, 10, 15 …
  - The long hand is a level-crossing barrier. A carriage that would pass it bumps and rolls back, so the last roof is the minutes.
  - The train is a help, not a requirement.
- **The card.** The child writes the hour and the minutes into empty boxes on a digital card, using the number pad or the keyboard. Separator per locale: ":" / "." / fr « h ».
- **Every miss shows its own picture.**
  - **Wrong minutes:** the train the CHILD's minutes make. "04" is four fifths of one carriage; minutes past the long hand show as pale carriages beyond the barrier.
  - **The next hour** (5:55 for 4:55): the train runs to the long hand, then finishes the lap in pale carriages. The short hand steps onto the next number only as the ring closes.
  - **Any other wrong hour, or swapped hands:** the short hand gets an ink outline and blinks.
  - **On the hour,** the hour hint asks which number the short hand is ON.
  - **Miss 2:** the right train with "?" on its last roof, and the hour numeral in bold.
  - **Check again with nothing changed** gives "change your answer first", never a second miss. This is the operator's Hopper lesson (#157), applied here.
- **Success.** The train runs a lap of honour, the card glows, and Sprocket (farm-animals/rooster) joins the row. The success line leads with the digits, then the locale's own quarter/half idiom, then where the short hand is. de/nl/sv/da/no/fi "halb/half/halv/puoli" name the NEXT hour.
- **Free play once solved.** Every carriage pushes the clock on five minutes; the twelfth closes the ring and the short hand steps on. The card follows the clock.
- **Settings.**
  - Times: quarter hours / five minutes. 9 + 9 rounds, the old activity's nine kept as Level 2. Order-only reshuffle, never the previous order.
  - Roof numbers: shown / hidden. At rest the tunnel's "+5" sign shows or hides.

## Deviations from the design
- **The tunnel is a slim stone portal at the 12** that carriages run under, not an arch beside it, so the twelfth carriage (the closing one) is never hidden.
- **The lap's pale carriages carry no numbers.** They are distance still to go; "60" would teach a minute that does not exist on the clock.
- **On the smallest phones, the solved clock closes up** (180 px) and − hides, so the success line and Next stay above the 640 px fold.
- **Two strings not in the design:** hintHourOn ("Which number is it on?", for 8:00) and hintChange.

## Review (one native + pedagogy reviewer, all 11 locales; then a short check of the two new strings) — all fixed at the source
- **Pedagogy ×11:** "the hour is the number the short hand has passed" is false at 8:00, where the hand is ON the 8. The instruction, prose and metadata now say "is on or has passed", and the o'clock round has its own hour hint. Gated and mutated.
- **SEVERE no:** «lekete tog» (playful train) → «leketøystog».
- **Minor:**
  - de «Lies die Uhrzeit ab», «5-Minuten-Schritte»;
  - fr «Lis l’heure», prose phrasing;
  - pt prose subject;
  - it «giocattolo»;
  - nl prose (wagon length, the setting);
  - da/no «fortæller/forteller timen» (not «viser viser»);
  - no «vognen», «fet»;
  - fi prose and «+-painiketta».
- **Kept:** sv «Kolla» is the shipped Check label in 9 activities. fr «12 heures et quart» stays (minor; midi would need a per-hour form).
- **No time errors in any locale.** Every idiom names the right hour.

## Gates
- **Logic:**
  - `verify-minute-train-core.js` 17,616/0, with its own round tables, hand angles and grading. It grades every hour 0–13 × every minute × every round (15,120 answers), and checks:
    - the halfway counts 5/9 and 4/9;
    - the train bumping at the long hand (and at once on the hour);
    - free play only once solved;
    - each idiom naming the right hour ×11;
    - the printed forms;
    - the half-idiom ban in hints (poisoned both ways).
  - `mutate-minute-train.js` 32/32 killed, and the control passes.
- **Browser:**
  - `local-test-minute-train.js` 1,694/0 in 11 locales: real taps on the tunnel, +/−, the pad and the keyboard, plus 4 states × 8 widths.
  - visual-qa 216 renders each in en/de/fi; hierarchy 380/0; settings efficacy 2 live.
- **Content:** prose claims, SERP copy, content tells, next delay and preflight routes all pass.
