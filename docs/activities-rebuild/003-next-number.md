# 003 — What number comes next? (K.CC.A.2) — the Peek Path

Replaces `choice-board.next-number.k-cc-a-2` (a numeral card + four numeral tiles with foils on the shared choice board; 11 locales, nothing missing). Same manifest id; slugs, page titles and intros frozen ×11. New tool `next-number-activity`, own core `next-number-core.js`; the row leaves `choice-board-activities.json`.

## The four questions

1. **Would a 5–8-year-old choose it again?** A path of lidded stones; a counter stands on one number; the next stone waits with a "?". The child writes the next number on big number keys — the digits appear on the stone as they type — presses Check, and the counter HOPS onto it while the lid flips open with the numeral and the number is spoken. Lids before the counter can be lifted to peek (a flip), and closed again. The wider setting climbs 9 → 20 through the teens.
2. **Would a teacher put it on the board?** K.CC.A.2 is "count forward beginning from a given number within the known sequence (instead of having to begin at 1)". The apparatus enacts the "instead of": the run-up is under lids, so the answer cannot be read off a visible line — the child must count ON from the number they stand on. Peeking is allowed (one lid per tap, a deliberate cost), and the teacher can set the path to *shown* for a class that still needs the run-up. Wrong answers are named — *the same number* (n), *before yours* (< n), *too far* (> n+1) — and the path opens up to the counter so the child counts on from it. Writing the numeral (one or two digits) is the production act; nothing is chosen from foils. No timer, no score.
3. **Would a parent trust it?** Nothing drawn by hand: stones, lids, a counter and number keys in the shell palette; numerals are the only words on the apparatus; works at 320 px; legible with the sound off.
4. **Is it creative?** The invention: **the lidded number path — the number after is the stone the counter hops to, and the stones behind it are hidden, so counting on is the only cheap move.**

## Apparatus

- **The path** (`.np-mat` / `.np-stone`): N stones (10, or 20) in rows of ten (five on a phone), hundred-chart order, each a rounded tile with a cream lid; the stone the child stands on is open (white face, teal numeral) with **the counter** (`.np-puck`, a coral disc) resting on its lower edge; the next stone is the **question stone** (`.np-stone.is-ask`, dashed teal, "?" until digits are written). Stones after the question stay locked until the round is answered.
- **The number keys** (`.np-keys` / `.np-key`): 0–9 and erase, 44–56 px chips, one row at ≥ 544 px else wrapped; typing echoes onto the question stone (two digits max, capped at N).
- **Free moves:** tap a lid before the counter to peek (flip open) / tap again to close; *Close the lids* (`.np-tool`).
- **Feedback** (shell bubble): no digits → "Write the number that comes next — tap the digits"; n → "That is the number you are standing on. Count on one more"; any number below n → "That number comes before yours. Count forward, not back"; anything above n+1 → "Too far. The next number is just one step on" (reviewer 2026-10-16: the n−1-only 'before' left 0 and 2 on 7 with a blunter generic hint — every answer below n names the same slip). On any wrong answer the path opens up to the counter (the run-up scaffold, never the answer). Right → "Yes! After {n} comes {m}." + the hop + the number spoken.
- Settings drawer: Numbers (to 10 / to 20), Path (hidden / shown).

## Rounds

To 10: n = 1…9 (9 rounds). To 20: n = 9…19 (11 rounds — the crossing into the teens and 19 → 20; 1…8 is the other setting's work). Order-only reshuffle per pass. One right answer (n+1); the keypad has no position tell; the question stone is always the one after the counter (that IS the skill, not a tell).

## Layout

Stacked. Stage width W: 10 columns at W ≥ 570, else 5; stone width = clamp(44, 72, (W − 2·pad − 9·gap)/cols), height 1.15 × width (≥ 60 px tall at 704 — the material floor); counter 0.5 × stone width. Keys: 11 per row where 11·44 + 50 ≤ W, else 6, else 4. No `vh`.

## Strings (×11, one reviewer)

title · instruction · prompt ("What number comes after {n}?") · hintNoAnswer · hintSame · hintBefore · hintFar · celebrate ("Yes! After {n} comes {m}.") · locked (announce) · pathLabel · stoneHidden · stoneAsk · stoneHere ("you are on {v}") · keypadLabel · erase · closeLids · setRange / range10 / range20 · setPath / pathHidden / pathShown.

## Refuse-list

No numeral tiles with foils (the keypad writes the number). No visible run-up by default (the lids ARE the pedagogy). No mascot. No countdown. The counter never moves before Check (a pre-Check hop would reveal position-as-answer… it is the answer anyway, but the hop is the reward).

## Gates

`verify-next-number-core.js` (own oracle: verdict table, typing rules, peek/lock rules, pools, layout floors) · `mutate-next-number.js` · `local-test-next-number.js` (real pointer, every round, both ranges, 11 locales, 7 widths, the resize broadcast) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `preflight-activity-routes.js` · preview · one reviewer · `live-verify-next-number.js`.
