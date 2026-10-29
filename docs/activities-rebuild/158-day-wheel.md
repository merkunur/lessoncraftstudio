# #158 — Sprocket's Clock: A.M. or P.M.? → THE DAY WHEEL (2.MD.C.7; all 11 locales)

ORDER row 158 · id `clock-ampm.morning-or-night.2-md-c-7` (kept). Design: `designs/158-clock-ampm.md`.

## The invention
- **A day wheel geared at HALF speed turns behind the clock face**, seen through a window near the 12.
  - Gold is the lap from midnight to noon, and violet the lap from noon to midnight.
  - The library moon rides the wheel at midnight, and the library sun at noon.
- **Every round starts at midnight.** The child drags the hour hand round the face (a real angle drag; the cumulative angle counts the laps). Stop pins hold the day between the two midnights.
- **The same face comes round twice:**
  - wind to 7:00 once and the window is gold;
  - wind one lap more and the hands are back at 7:00, but the window is violet.
- **The badge and readout:**
  - the badge under the clock says the day-part of the CURRENT hour (en a.m./p.m., es a. m./p. m., fi ap./ip.; elsewhere the locale's own word for that hour, true at night too);
  - the readout shows the 12-hour face time.
- **Misses:**
  - a wrong time compares the card and the clock (both underlined);
  - the right face in the wrong lap rings the window and asks "before or after noon?";
  - a second miss draws a dashed arrow one lap on or one lap back.
- **Success:**
  - the event picture seats itself on the wheel in the window, the ticket is stamped and Sprocket (library rooster) bounces;
  - the success line opens with the time as it is SAID ("Minuit et demi : …", "Halb eins nachts …").
- **Levels:**
  - o'clock (9 events: the bed in both laps, three faces in both laps);
  - half hours (7 events and 2 clock riddles: 12:30 after midnight is the very FIRST stop, 12:30 after noon one lap on).
- **The label clue:** the card shows the time with its day-part and hides the picture under a flap, and the badge goes colour-only.

## Deviations from the design
- **es and it evening times:** dinner 7:00, bedtime story 8:00, bed 9:00 (the brush-teeth-before-bed time stays 8:30). The design had copied Spain's late evening into es, but es here is Mexico; the native reviewer gave the Mexican and Italian times.
- **Day-part words:**
  - sv/da/no call the hour 12:00–12:59 «mitt på dagen / midt på dagen», not afternoon (reviewer);
  - half past midnight and half past noon are SAID in fr/it/pt/de/nl/sv/da/no («minuit et demi», «mezzogiorno e mezza», «halb eins nachts», «halv ett mitt på dagen» …) on the label card and in the success line.
- **The short hour hand stops below the window**, so the sun and moon markers are never under its grip. The window is ±27° between the 11 and the 1.
- **The event picture seats on the wheel at marker size** (data-mark), so the lap colour stays visible around it.
- **In de/nl/no/fi a game round is an "Aufgabe / opdracht / oppgave / tehtävä"**, because "Runde / ronde / runde / kierros" is the clock's lap.
- **The lap help is a dashed arrow** round the rim one lap on or back, not an animated ghost hand.
- **sv, da, no and fi pages are NEW** (slug, title and intro written in this build and native-reviewed); en..nl metadata is frozen.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- The round/lap word collision in de/nl/no/fi.
- 12:00–12:59 in sv/da/no.
- fr: «12 h 30 du matin» was false, so the half-past-12 times are now said; «Tu t’assois» replaces the gendered «Tu es assis».
- it: «falò».
- es-MX/it evening times.
- pt: hintMore/hintBack.
- da: «på første omgang», «urgåder».
- fi: «Puolitunnit», «vuorokaudessa».
- sv: slug/title «förmiddag eller eftermiddag», Lgr22 åk 1–3.
- no: LK20 named only.
- sv/da/no/fi intros that put breakfast in the förmiddag/formiddag (the card says morgon).
- Found in my own reading: the success lines began lowercase; the said time is now capitalised.

## Gates
- **Logic:**
  - `verify-day-wheel-core.js` 11,117/0. It keeps its own tables and evening overrides, its own lap rule, its own 12-hour face and its own day-part truth hour by hour. It grades every stop × every round × every locale; exactly one stop wins.
  - The gears are checked (the wheel turns at half the hour hand's speed), and the stop pins.
  - Bots: "always the first stop" and "always the second stop" each win ≤ 5 of 9.
  - The plan never repeats an order and never puts three of one lap in a row.
  - `mutate-day-wheel.js` 29/29 killed, and the control passes.
- **Browser:**
  - `local-test-day-wheel.js`: 11 locales, real drags round the face. It covers the scenarios in its header, plus 5 states × 8 widths.
  - visual-qa, the hierarchy gate and settings efficacy (2 live).
- **Content:** prose claims, SERP copy, content tells, next delay and preflight routes all pass.
