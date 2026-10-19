# #27 — Make the Number → THE TWO-ENDED LANTERN STRING (K.OA.A.3)

ORDER row 27 · id `match-pairs.make-the-number.k-oa-a-3` (kept) · own files `lantern-string-core.js`, `lantern-string-activity.js`, `lantern-string-activity.html`, `lantern-string-activities.json`. The row left `match-pairs-activities.json`, whose six other rows stay on their engine untouched. Metadata is frozen in all 11 locales; the prose was rewritten ×11, because the old prose described 0-pairs and lines that "link". Design: `designs/027-match-pairs.md`.

## The apparatus and its invention: A STRING LIT FROM BOTH ENDS
- **The string:** the target number is a string of exactly N bulbs, with a gap after bulb 5, between a coral socket and a teal socket. It spans the full stage width above the board, so bulbs reach 44 px on desktop.
- **The two lights:**
  - The first number tapped lights it from the LEFT, the second from the RIGHT, one bulb per 70 ms with rising plinks.
  - **Meet exactly:** a spark, the string flashes gold, and the pair hangs on the garland as two paper lanterns with "= N" under them.
  - **Cross:** the bulbs lit twice flicker white.
  - **Short:** dark bulbs stay between the fronts.
- ⭐ **A light longer than its string runs on past the far end** as extra bulbs. The design never handled this, and the gate found it: a 4 on a string of 3 drew 2 doubled bulbs for an error of 3. It is common in WHOLE rounds and in open play. The error now numbers itself 1, 2, 3, left to right, across doubled bulbs and the bulbs past the end. The cross hints say "too many lights — {k} are extra", which is true for both cases.
- **Round kinds:**
  - **PAIR UP:** a board holding every pair once, or a subset on two Make 10 boards. The garland has a dashed hook per missing pair.
  - **MISSING:** the given part is plugged left, a tray of four consecutive cards, then "Light it".
  - **WHOLE:** two parts in the sockets and no string. The child chooses the length on keys 2–10, then lights it, and the same law judges it.
- **Help:**
  - Miss 1: the bulbs number the error.
  - Miss 2 in PAIR UP / MISSING: the first card stays plugged and a dashed bracket shows the partner's size.
  - Miss 2 in WHOLE: a ghost string 1 … n−1 and "?".
  - A new move takes the help away.
- **Garland:** tapping a found pair replays it turned round.
- **Open play:** "Lantern maker", a string of 2–10 and cards 1–9.
- **Settings:** Numbers (Up to 5 · 6 to 9 · Make 10) and Card dots (Off/On). Both were measured live.

## Gates
- `verify-lantern-string-core.js` 104 710:
  - the law and the bulbs, exhaustive;
  - marks past the end;
  - every board played through every wrong and right pairing;
  - exactly one right answer per MISSING / WHOLE;
  - tray slots balanced;
  - partner adjacency within ±3 % of random over 10 000 seeds;
  - never counting order;
  - order rules plus a deterministic "never the same order twice";
  - layout floors, and strings ×11.
- `mutate-lantern-string.js` 32/32. One design-list mutation turned out EQUIVALENT (a cross has no dark bulbs), so it was replaced.
- `local-test-lantern-string.js` 598/0: real taps, 11 locales, running lights, sweep 320–1366.
- `visual-qa` 48 · `hierarchy` 146/0 · settings 2 live · content ×11, prose-claims, SERP, tells, answer-rank, preflight PASS.

## Layout decisions
- The wide mode starts at a stage of 640, not 560: five 80 px cards need 432 px beside a 196 px garland.
- The design's 60 × 72 phone card assumed a 336 px stage; the real one at 360 is about 312. Cards size to five per row: 56 × 68 at 360, never below 52 × 64.

## Review (one agent, native ×11 + pedagogy) — applied
- **MUST-FIX:**
  - The practices and learning goals said the child WRITES/records each equation; the child reads it on the garland ×11.
  - es/pt "la pareja / o par que forma {n}" read as both numbers → "el número que falta / o número que falta".
- **SHOULD-FIX:**
  - "every way to make {n}" → "every pair that makes {n}" ×11 (3 + 1 is a different way).
  - de "Brett" → "Spielfeld"; it "tavolo" → "tabellone".
  - Noun consistency: it lucine, es foquitos, no lyspære.
  - sv "tiokompisarna"; nl "verliefde hartje van 10"; da "for mange"; fi hintPlug.
  - pt curly quotes; es/nl infinitive goals.
- **FROZEN-NOTE (operator):**
  - The intros still promise "watch the pairs link" and omit the missing-part and whole rounds.
  - sv title "Gör talet" ≠ UI "Bilda talet".
  - fi intro grammar.
  - fr intro typography and "compléments à 6".

## Live (2026-10-19)
Commit 8a89f411, wrapper 9.761, deploy exit 0. `live-verify-lantern-string.js` 80/80 on production (en/sv/fi/de × 1366/390): 1 + 2 short, 3 + 1 meet, 2 + 2 completes the board; missing 3: the 4 runs one bulb past the end, the 1 lights it; whole 1 + 3: key 4 lights it. All eleven locale pages 200.
