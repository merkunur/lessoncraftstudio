# #160 — Sprocket's Clock: Match Analog and Digital → THE DRIVE CABLES (2.MD.C.7; all 11 locales)

ORDER row 160 · id `clock-digital.match-clocks.2-md-c-7` (kept). Design: `designs/160-clock-digital.md`.

## The invention
- **A switchboard.** Four analog clocks, each with a socket and a lamp. Three digital cards, each with a cable. Three clocks match a card; the fourth is a **lure** built to catch one named mistake:
  - hands swapped (6:00 next to 12:30);
  - the short hand one hour off at half past or at :45/:55;
  - :30 against :00;
  - :15 against :45;
  - the 4 against the 8.
- **Plugging.** The child taps a card and then a clock, or drags the card onto the clock.
  - A socket holds one plug; a second plug sends the first back to its card.
  - A double tap pulls a plug out.
  - The keyboard works too (Enter on a card, then Enter on a clock).
- **Check.** Each card draws its OWN time as dashed hands on the clock it is plugged into.
  - Where they land on the painted hands, the lamp lights and the pair locks.
  - Where they don't, two hand-sets share one face, and only the hand that disagrees blinks.
- **Hints.** Each hint is chosen by the first wrong pair's error and names hand positions only. No hint uses "half seven" phrasing, which in de/nl/sv/da/no/fi means 6:30.
- **Miss 2.** Dots every five minutes run along the dashed long hand, and the numbers beside the dashed short hand turn bold.
- **Success.** All three lamps are lit, the lure clock wobbles, and Sprocket (farm-animals/rooster) joins the card row. The success line lists the three times and explains the card the lure was built to catch, e.g. "At 12:45 the long hand is on the 9 and the short hand is nearly at the 1."
- **Colour code.** The short hand matches the coral hour digits; the long hand matches the teal minute digits.
- **Levels.**
  - L1 (o'clock and half past): 8 rounds.
  - L2 (quarter hours and five-minute times): 9 rounds.
  - Slot layouts follow the critic's balanced table: no "plug straight across / one over" strategy beats chance.
  - Order-only reshuffle; the previous order is never repeated.
- **Settings.** Times (L1/L2) · numbers on the clocks (all twelve / only 12, 3, 6, 9; the ticks stay).

## Deviations from the design
- **No free-play hand tick** when a clock is tapped with no card chosen. Instead, the hint says "tap a card first, then a clock".
- **The rooster sits in the card row,** never over a face, a lamp or a card.
- **On phones the solved board closes up.** The four lit clocks form one row, so the success line and Next stay above the fold at 320–360 px.
- **A clock's screen-reader label reads its HANDS before success** ("short hand between 1 and 2, long hand on the 9"). It reads its time only after success.
- **New pages.** de, es, pt, it, nl, sv, da, no and fi are NEW (slug, title and intro written in this build and native-reviewed). en and fr metadata is frozen.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE ×11:** the hour-hand hint asked which number the short hand had "just passed". At 4:45, 2:55 and 12:45 that points at the wrong number. It now asks which number the short hand has ALREADY passed, "not the one it is nearly at". The fix is gated and mutated.
- **SEVERE fi:** the instruction's grammar.
- **SEVERE sv:** the page title named Sprocket instead of Tore.
- **Minor:**
  - en/fr/fi: the level-2 label;
  - es: the title grade and "alineada con los programas de la SEP";
  - pt: «passar do»;
  - it: «compaiono in grassetto» and «mezz’ora»;
  - de: «orientiert sich»;
  - fr: «aiguilles en pointillés»;
  - no: «Tipset».

## Gates
- **Logic:**
  - `verify-drive-cables-core.js` 5,453/0. It keeps its own round tables, its own hand angles and its own error names. It grades every way to plug the cards (24 per round × 17 rounds), and exactly one way is right per round.
  - It checks the balance rule (no shift > 30 %), each lure baiting exactly one card, the tip's hand facts ×11, and the "half to the next hour" ban (poisoned both ways).
  - `mutate-drive-cables.js` 27/27 killed, and the control passes.
- **Browser:**
  - `local-test-drive-cables.js` 1,705/0 in 11 locales: real taps, real drags and the keyboard, plus 4 states × 8 widths.
  - visual-qa 192 renders each in en/fi/de/sv; hierarchy 386/0; settings efficacy 2 live.
- **Content:** prose claims, SERP copy, content tells, next delay and preflight routes all pass.
