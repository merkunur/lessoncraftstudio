# #25 — Chuffer's Switchyard → THE SPRING SWITCH (K.OA.A.3)

ORDER row 25 · id `chuffer.rail-decompose.k-oa-a-3` (kept) · own files `spring-switch-core.js`, `spring-switch-activity.js`, `spring-switch-activity.html`, `spring-switch-activities.json`. `chuffer-activities.json` is now `[]` (it held only this row). Metadata en..nl frozen. sv/da/no/fi slug, title and intro are NEW, along with GRADE_OVERRIDE '1' for those four and sv STRAND_OVERRIDE "Taluppfattning och tals användning". Design: `designs/025-chuffer.md`.

## The apparatus and its invention: THE SWITCH SPLITS THE STREAM
- **The yard** (drawn geometry plus the library toys/train):
  - a hill wagon with the load in a 2 × 5 array, its number on a badge;
  - a release lever: a tap = exactly one crate, a HOLD = one every 450 ms;
  - a railway switch at the fork, with blades and an arm that visibly move. Each crate goes to whichever car the switch faces as it crosses the fork; the core is called at the crossing, so the switch is read at that moment;
  - two cars drawn as ten-frames (coral left, teal right), with a coupler between them (the coupler = Check; a Check button too);
  - a back-up chip that rolls every crate home (the whole is unchanged), and a turntable that turns the last banked pair round (2 + 3 → 3 + 2) for the child to bank through the coupler.
- **The plate is a NUMBER BOND:** a whole circle over two part circles in the cars' colours. Tapping a dial circle opens a key pad (3 columns). The equation "5 = 2 + 3" writes itself only after a way is banked.
- **The route book is a staircase:** one row per split (or the 9 bonds of 10 in Make ten), drawn as two-colour bars. Empty rows are dashed, so the missing ways show.
- **Round kinds:**
  - ALL WAYS: every split. For 8 in the 6–9 level, 4 ways.
  - SEALED: one car is under a tarp showing k. The wagon holds 10, so its size tells nothing; the switch is locked to the open car; the child sends the missing part and sets its circle.
  - BACK UP: two loaded cars. Back up merges their crates in the wagon; the child sets the whole.
  - Make ten: nine sealed rounds that fill ONE staircase of the bonds of 10 for the whole pass. The last round of the pass celebrates "every way to make 10".
- **The help ladder:**
  - Things that are not misses: an empty yard, one car empty, crates still on the hill, the bond unset, back-up not yet pressed, a repeated way. Each gets its own named hint.
  - Wrong part: miss 1 lights that car's crates ("count the left car again"); miss 2 numbers them 1 … n−1 with "?" on the last.
  - Sealed, wrong amount: miss 1 lifts the tarp for 1.5 s, dashes the missing places and rings the extra crate; miss 2 numbers the missing places on from k to N ("count on").
  - Back-up, wrong whole: the wagon's crates light, then are numbered to "?".
  - The help never writes the answer.
- "Shunting yard" is free play: a load of 2–10 (− / +) with everything open, and the bond fills itself.

## Rounds (as designed; no 0; the missing parts and back-up wholes all differ within a level)
- Up to 5: all 3 · all 4 · 5 = 2 + ☐ · back-up 2 + 3 · all 5 · 4 = ☐ + 3 · back-up 1 + 3 · 5 = 1 + ☐ · back-up 2 + 1.
- 6 to 9: all 6 · 7 = 3 + ☐ · back-up 4 + 3 · 8 = ☐ + 5 · all 7 · back-up 5 + 4 · 9 = 7 + ☐ · back-up 6 + 2 · all 8 (4 ways).
- Make ten: sealed 3, 6, 5, 8, 1, 2, 7, 4, 9 (each once), sides L/R alternating.
- Order rules:
  - every pass opens on an ALL WAYS round (except Make ten);
  - never three of one kind in a row (Make ten: never three on one side);
  - never the same order twice, and a pass never opens on the round the last one closed on.
- Settings: Numbers (Up to 5 / 6 to 9 / Make ten) · Turntable (Show / Hide).

## Layout
- Wide: the yard (stage − 208) and a 196 px column (bond, equation, dial keys / route book) side by side. Crates ≤ 34, train 96, levers 64.
- Narrow: the yard full width; under it the bond and the route book (or the key pad) side by side. Train 64, levers 52, coupler 44.
- Below 340 px: the bond is 132 and the action row is tighter. The design's 360 layout put the bond above the route book; side by side keeps Check in the 640 fold.

## Gates
- `verify-spring-switch-core.js` 1 701:
  - the tables written out again;
  - conservation hill + left + right = N, exhaustive over every release/flick/back-up sequence (depth 9 for N ≤ 6, depth 7 above) for every load 2–10;
  - the crate goes to the switch side;
  - the coupler and its reasons, the mirror, sealed / back-up / Make-ten flows, the help, and the order over 10 000 seeds plus a fixed random source.
- `mutate-spring-switch.js` 33/33.
- `local-test-spring-switch.js` 578/0: real taps and a real HOLD, 11 locales, 6 to 9, Make ten, free play, sweep 320–1366.
- `visual-qa-activity.js` 54 · `audit-activity-hierarchy.js` 344/0 · settings 2 live · preflight, content ×11, prose-claims, SERP, tells, answer-rank PASS.
- The old `verify-rail-decompose-core.js` and `local-test-chuffer.js` exit "retired".

## Review (one agent, native ×11 + pedagogy) — applied
- **MUST-FIX:**
  - The instruction ("flick the switch to send them left or right") was false in sealed rounds (the switch is locked) and in back-up rounds. It now holds for every kind ×11.
  - The free-play note called the bond a "plate" (a third name; fr "plaque" also collides with the turntable) and said it "reads itself". It now says "the number bond fills itself in" ×11.
  - The prose said whole cars roll into the wagon in 7 locales. Only their crates do.
  - fi sealed prompt read as "send 5" → "niin että niitä on yhteensä {n}".
- **SHOULD-FIX:**
  - da: "stil sporskiftet" (not "skift sporskiftet").
  - sv: "koppling" (a 6-year-old reads "koppel" as a dog leash).
  - es-MX: "da vuelta a los vagones" (voltear = tip over).
  - fr: "garde le doigt sur le levier".
  - de/sv/es: hintTogether reworded so the crates, not the cars, make N.
  - Practices #4 idiom.
  - Level names now use the classroom terms: nl Verliefde harten, da/no Tiervenner, fi Kymppiparit, it Amici del 10.
  - de/sv: "the wagon up top".
- **Kept:**
  - Zahlenhaus / maison des nombres / talhus / tallhus as bond names. Each is followed by the description of the circles.
  - es "Comprobar", for consistency with every sibling activity.

## Traps
- An `inset`-free `translate` property animation and a `transform`-based flip on the same element would fight. The train flip lives in `transform` and the bounce animations use `translate` / `scale`.
- At 320 the action row wrapped (Check dropped to a second line). The fold gate caught it only with the dial open — measure the opened state, not just the opening frame.
- A `.is-tiny` rule placed before the `.is-narrow` rule of equal specificity silently lost. Make the tiny rule more specific instead of relying on order.
- After a banked way the core resets `misses`. A test that expected the earlier miss count to survive a bank was wrong, not the core.
