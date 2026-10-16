# 006 — Pip's Round (K.CC.A.3) — the Letterbox Street

Replaces `pips-round.mail-route.k-cc-a-3` (a drawn mouse, blob residents, one tap-the-house per round, 7 locales, sv/da/no/fi missing). Same manifest id; the seven existing slugs, page titles and intros frozen; sv/da/no/fi authored new. New tool `letterbox-activity`, own core `letterbox-core.js`, own manifest `letterbox-activities.json`; `pips-round-activities.json` is emptied. Two shipped instruments are LOADED UNCHANGED (0 lines): `number-trace-core.js` (the handwriting glyphs 0–9, the per-locale barred seven) — the address on every letter is WRITTEN in that hand, and `stroke-trace-core.js` (its `flatten`). Pictures from the library through `lcs-pictures.js` (theme `animals`).

## The four questions

1. **Would a 5–8-year-old choose it again?** A street of five houses, each with a printed number plate over its door, and the post van at the kerb with three letters. The child takes the top letter and drags it to a house; it only goes through the slot of the door that bears its number — then the door opens and the neighbour (a library animal) steps out onto the doorstep, the number is spoken, the next letter pops up. When the third letter is posted the round checks itself.
2. **Would a teacher put it on the board?** K.CC.A.3, the reading face: read a written numeral 0–20. The address is HANDWRITTEN (the handwriting-instrument glyphs — an open 4, a flagged 1, the barred 7 where the country writes it) while the plates are PRINTED, so a child cannot match shapes; the number must be read. Every round's street carries the lures K teachers name: the teen reversal (13 next to 31), the same-tens neighbour (14 among 13 and 15), the lone digit of a teen (14 next to 4) and its opposite (4 next to 14), the look-alike pair (6/9, 2/5, 1/7, 3/8, 0/8). A wrong door answers with its own number beside the letter's, and names the slip. After two misses on one letter the right plate glows. Settings: Numbers to 10 / to 20; Address written / spoken (spoken = listen, with a Show for a silent room). No timer, no score.
3. **Would a parent trust it?** No mascot. Houses are flat tool-grade shapes in the shell palette; the residents are library pictures ≥ 96 px; the letter is paper with a stamp and a handwritten number. Works at 320 px; legible with the sound off.
4. **Is it creative?** The invention: **the Letterbox Street — the address is written by hand and the plates are printed, so the number has to be read, not matched; a letter goes through one slot only, and a wrong door reads its own number back beside the letter's.**

## Apparatus

- **The street** (`.lb-street`): ≥ 560 px one row of five houses (house w = floor((W − 48)/5)); below, two rows — three houses, then two houses and the van (w = floor((W − 16)/3)).
- **A house** (`button.lb-house` → `svg.lb-housesvg` viewBox 0 0 100 136): roof, body in one of five pastel fills, a white plate with the printed numeral (`.lb-plate`), a door with a slot. Delivered: the door opens, the resident `img.lb-resident` (0.8 w) stands on the step, the plate frame turns green. Help: the right plate pulses (`.is-help`).
- **The van** (`.lb-van`): the current letter (`button.lb-letter` → `svg.lb-address` with the handwritten digits, a stamp) and the stack dots (`.lb-stack`: posted · current · waiting). Spoken mode shows a speaker on the letter until Show.
- **The strip** (`.lb-strip`): a note, Hear it, Show (spoken mode).
- Settings drawer: Numbers (to 10 / to 20), Address (written / spoken).

## Rounds

To 20: 9 rounds × 3 letters (0–20 each at least once; 13, 14, 16, 18 twice) + 2 lure houses chosen from the letters' confusables in priority order (reversal · same tens · lone digit · teen of digit · look-alike · neighbour). To 10: 8 rounds × 3 letters (0–10, every number twice or more), lures within 0–10. House order is a seeded shuffle; the gate measures that no plate position hosts more than 40 % of the answers and that a first-house / biggest / smallest / shares-a-digit guesser stays near chance. One right door per letter. Slip table: reversed · lastDigit (same tens) · oneDigit (letter 14, door 4) · twoDigits (letter 4, door 14) · firstDigit (same ones) · shape (look-alike) · off. Help after 2 misses on a letter.

## Layout

Stacked; no `vh`. The seven is barred on the letter in de/fr/it/es/pt (`NumberTraceCore.glyphFor`), never on the plates (print).

## Strings (×11, one reviewer)

title · instruction · promptWritten · promptSpoken · hintStart · hintUnfinished · noteStart · noteNext · noteSpoken · wrongReversed · wrongLastDigit · wrongOneDigit · wrongTwoDigits · wrongFirstDigit · wrongShape · wrongOff · noteHelp · noteDone · celebrate · streetLabel · houseLabel · houseDone · letterLabel · letterSpokenLabel · stackLabel · hear · show · setRange · rangeTo10 · rangeTo20 · setAddress · addrWritten · addrSpoken.

## Refuse-list

No mouse. No drawn residents (library only, or an open empty door — never a word over blank space). No same-font address. No hover peek (a house reacts only to a drop or a tap). No red cross — the wrong door reads its number, the letter comes back. No timer.

## Gates

`verify-letterbox-core.js` (own oracle: pools, coverage, lures by rule, guessers measured, deliver/help/done, classify table, handwriting per locale, layout floors) · `mutate-letterbox.js` · `local-test-letterbox.js` (real pointer drags of the letter onto wrong and right doors, every round, 11 locales, widths 320…1366) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `audit-settings-efficacy.js --tool=letterbox-activity` · `preflight-activity-routes.js` · `verify-activity-prose-claims.js` · preview · one reviewer · `live-verify-letterbox.js`.
