# #28 — Make 10 → THE TEN-SEAT WHEEL (K.OA.A.4)

ORDER row 28 · id `numberbond.make-ten.k-oa-a-4` (kept) · own files `ten-seat-wheel-core.js`, `ten-seat-wheel-activity.js`, `ten-seat-wheel-activity.html`, `ten-seat-wheel-activities.json`. The row left `number-bond-activities.json`; its five other rows stay on their engine untouched, and the row also left `local-test-number-bond.js`. Metadata is frozen in all 11 locales; the prose was rewritten ×11 (the old prose described tapping counter-dots into a bond). Design: `designs/028-numberbond.md`.

## The apparatus and its invention: A WHEEL THAT ONLY BALANCES WHEN EVERY SEAT IS FULL
- **The wheel:** a Ferris wheel of N round gondolas, seats 1–5 coral-ringed and 6–10 teal-ringed (two fives). The hub shows N. The riders are library farm animals: one kind aboard, a contrasting kind in the queue, six pairs that respect RULINGS (hen only; never chick with duck; never lamb with sheep).
- **Boarding:** the child sets the gate dial (1–9; it starts at 5) and pulls the gate lever. That many riders hop in one by one, the wheel clicking the next empty seat to the bottom each time. A lower dial sends riders back. Tapping a boarded rider lets it off and the dial follows; starting riders cannot leave.
- **The brake (= Check):**
  - **Full:** the wheel spins one slow turn with the rim bulbs chasing; two turns at the end of a Make 10 pass.
  - **Too few:** a damped lurch to the angle that puts the filled seats' centre of mass under the hub, so the empty gondolas settle at the top and glow.
  - **Too many:** the extras stand on the platform edge with a halo and the brake holds. After 1.5 s every rider boarded this try hops back off and the dial keeps its number, so an over-call can never end in a spin (the critic's loophole).
  - **Brake before boarding, or with the hub unset:** no miss.
- **Help:** miss 2 numbers the empty seats counting on (8, 9, 10), and the dial arrow glows in the direction to move, never the numeral. In WHOLE, every seat is numbered 1 … n.
- **WHOLE rounds:** every seat is full with two kinds; the hub shows "?" and the dial's arrows set it. Its first touch counts from 5, so leaving it alone is never right.
- **The record:** the bond board (whole on top, two parts) fills on success. Desktop prints a ticket per ride (`10 = 7 + 3`); phones show the bond as one line `[10] = [7] + [?]`.
- **Settings:** Wheel (Up to 5 · 6 to 9 · Make 10, the default) and Seat numbers (Off/On). Both were measured live.
- **"Fairground"** is open play: a wheel of 2–10 seats, nothing judged.

## Gates
- `verify-ten-seat-wheel-core.js` 12 806:
  - the tables;
  - the gate and the brake, exhaustive over n 2–10 × k × dial 1–9;
  - the lurch against the gate's own centre-of-mass sum (empty arc at the top within 1°);
  - over-call never spins;
  - starting riders stay;
  - WHOLE one right answer;
  - dial start = answer in ≤ 1 round per level;
  - empty-arc angle uniform over 10 000 seeds;
  - order, including the deterministic "never the same order twice";
  - pictures on disk and the RULINGS pairs;
  - layout: odd widths too, no gondola overlap, queue size constant;
  - strings ×11.
- `mutate-ten-seat-wheel.js` 29/29. One survivor, "the queue shows the answer", was caught only after odd widths joined the layout sweep.
- `local-test-ten-seat-wheel.js` 518/0: real taps on arrows, levers and gondolas, 11 locales, the running animation, sweep 320–1366 with no gondola overlap.
- `visual-qa` 54 · `hierarchy` 830/0 · settings 2 live · content ×11, prose-claims, SERP, tells, answer-rank, preflight PASS.
- Pictures opened on a contact sheet: all 12 riders are clean single animals.

## Layout decisions
- Square gondolas overlapped their diagonal neighbours; a square needs about 1.4× the spacing a circle needs. They are round now.
- Phone radius 110, not the design's 120: the cups (60 px) still clear their neighbours (chord 68). It leaves every locale's Fairground note on screen at 360, where fr/fi had run 18 px over.
- On phones the bond board rides in the queue row, and the Fairground stepper takes its place there. Below a 300 px stage the bond strip folds away and the Fairground button rides in that row. On desktop the button and the stepper sit in the side column, because the 1024 × 900 fold cut the button off.

## Review (one agent, native ×11 + pedagogy) — applied
- **MUST-FIX:**
  - The instruction skipped the gate lever ("set the dial, then release the brake" boards nobody) ×11.
  - The prose claimed a Make 10 pass "rides every pair once"; it starts once from every number 1–9 (7 + 3 and 3 + 7 both ride) ×11.
  - no: the dial was called "hjulet", the same word as the wheel.
  - it: an ungrammatical practices line.
- **SHOULD-FIX:**
  - The railway platform word (Bahnsteig, quai, andén, perron, perrong) → the ride's plattform ×7.
  - es "¿Cuántos faltan…?"; nl "Hoeveel moeten er nog bij…" and "het kind"; sv "har redan klivit på"; da "er allerede steget på" and "tidtagning".
  - fi: "on yhteensä" (not "tekevät"), "Erikoista on" and "varattuja paikkoja".
  - pt "Ingressos"; de "Vorschule und Klasse 1"; no "skolestart og 1. trinn".
- **Rejected after checking the build:**
  - "After a too-many miss there are no empty seats to count on": once the extras hop off, the empty seats are back, and the local test asserts 8, 9, 10.
  - "the queue may not be farm animals": it is.
- **FROZEN-NOTE (operator):**
  - The en/es/it/nl/no/pt intros still describe the old tap-counters-into-a-bond activity.
  - de/fr say "Zahlenhaus / maison des nombres".
  - de/fr metadata claims "ohne Anmeldung / sans inscription" (an access claim to check against metering).

## Traps
- **A square gondola needs about 1.4× the spacing a circle needs:** the design's 104 px squares overlapped their diagonal neighbours at R 190. Circles fit the same chord.
- **A layout sweep at even widths only let "the queue shows the answer" survive** (the mutant keyed on W % 2). Sweep odd widths too.
- **Every locale has to fit, not only English:** fr/fi's longer Fairground note ran 18 px past a 360 fold that en cleared. `tw-playfit` checks all 11 at 320/360/412.
- **Reviewer claims are reproduced before acting:** two of twenty-six were wrong about the apparatus.
