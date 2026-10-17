# The design file — template and standard (2026-10-17)

Operator, verbatim: *"I want you to design each new activity and existing activity which hasn't been rebuilt yet according to the quality standard of the tools … They should be top quality designs. They should be child friendly, fun, creative and innovative … I want each design to be unbeatable."*

Every activity still to build — the 182 ORDER rows not yet rebuilt (`designs/<row>-<id>.md`) and the 111 new instruments (`new/<#>-<key>.md`) — has one design file in this shape. A builder must be able to build it **without re-thinking**: every number, every round, every miss, every word on the screen is decided here. The LAW (`../LAW.md`) is the floor; this template is how a design clears it by a distance. Reference bar, operator-named: Number Talk Easel, Learning Clock, Place Value Lab, Pattern Bench (renders in `docs/audit-results/<tool>/qa/`), and the rebuilt activities #1–#22 (`../0NN-*.md`).

---

```
# <Row|New> <n> — <Name of the instrument> (<code>)

## 0. Identity
- id · grade · framework + code · strand · files (key)
- worksheets it covers (ids) · what the old activity did (rebuild rows only, one line) and what is kept from it

## 1. The pitch (the one sentence a teacher would say)
"<the invention, in one sentence>" — e.g. "the number is a floor, so bigger means higher".

## 2. Why a child will want it again (the fun)
What is delightful: the toy-like thing in the hand, the surprise, the small earned show at the end of a round, the
reason to press "next". Concrete, not adjectives. No timer, score, streak or lives.

## 3. The skill and the misconception
- the skill exactly as the standard/worksheets mean it
- the misconception(s) the apparatus makes visible — and HOW the material pushes back (the mechanic, not a message)

## 4. The stage (what is on the screen)
- every element, its size and place at 704 px wide (the live desktop iframe) and at 360 px (phone); what is library
  picture (theme/noun — verified to exist in mini tools/pictures/<theme>.json and seen on a contact sheet) and what is
  drawn apparatus geometry (frames, rails, dials, grids, tiles, bars — never a hand-drawn character or object)
- the task line (≤ 2 lines, ≤ 24 px) — the exact EN text
- no words on the apparatus except letters/numerals/words that ARE the content

## 5. The hand (every interaction)
For each tap / drag / drop: what moves, how it answers within 100 ms, the animation (ms), the sound (tone, optional
TTS), what can be undone. Free exploration that is not the task (what the child can play with between rounds).

## 6. The rounds
- what one round is; the full round table (≥ 7 rounds per level, every value written out, never 0 in counting, one
  right answer each); how the levels/settings change it
- answer position: where the answer sits in each round and how that is balanced/measured so it cannot be guessed
- order: order-only reshuffle per pass (never the same order twice)

## 7. Check, the misses, the success
- Check with nothing done → hint (no miss)
- miss 1 → what the apparatus SHOWS (not just says) · hint EN text
- miss 2 → the stronger showing · hint EN text
- a new move takes the help away until the next Check
- success → the earned moment (motion + the sentence with the numbers/words, EN text)

## 8. Settings (1–2, each visibly changes the board at rest)

## 9. Words (EN source; the build authors the other 10 locales by hand, then one native + pedagogy reviewer)
title · instruction · prompt(s) · hints · celebration · settings labels — exact EN strings, with {placeholders}.
Locale traps: everything language-specific (articles, alphabet order, plural/agreement, number words, decimal comma,
dates/weekday start, money, cursive scripts, southern-hemisphere seasons, road signs, reading direction of examples).

## 10. Sound off, access, phones
Legible with the sound off · keyboard path · aria labels · 44 px taps · pictures ≥ 96 px at 704 / ≥ 64 px at 360 ·
Check above the 360×740 and 320×640 fold · what changes in the phone layout.

## 11. Distinct from
The nearest existing activities / tools / planned instruments and why this is not a duplicate (and not a reused
invention — see the built registry).

## 12. Build plan
- model (core) state + functions · the gate's own ground truth (what verify asserts) · the mutation list (one per rule)
- pictures to verify on a contact sheet · risks · anything BLOCKED (exact missing art + the honest fallback)

## 13. The four questions (answered, honestly)
1. Would a 5–8-year-old choose it again? 2. Would a teacher put it on the board? 3. Would a parent trust it?
4. What is the invention, in one sentence?
```
