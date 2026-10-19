# #30 — Teen Numbers 11 to 19 → THE OVERFLOW TRAYS (K.NBT.A.1)

ORDER row 30. The id `ten-frame.teen-numbers.make-n` is kept. Own files: `overflow-trays-core.js`, `overflow-trays-words.js`, `overflow-trays-activity.js`, `overflow-trays-activity.html` and `overflow-trays-activities.json`. With this row gone, `ten-frame-activities.json` is now `[]`. No old test script referenced the row. The slug, title and intro are frozen in all 11 locales; the prose was rewritten in all 11. Design: `designs/030-ten-frame.md`.

## The apparatus and its invention: GRAVITY PUTS THE TEN FIRST
- **The child pours from a spout.** Holding it pours one counter every 250 ms (about four a second); a tap pours exactly one. Each counter rolls into the next cell of the top ten-frame tray.
- **Nothing passes a tray until it is full.** On the tenth counter the top tray shivers, its rim flashes, a chute opens, and the eleventh rolls into the tray below. So 14 is literally a full ten that overflowed, plus four.
- **No count is shown during the task.** The child stops where they think the number is and presses Check.
- **Misses:**
  - Too few or too many: the dotted shape of the target appears over the trays, and an extra counter gets a halo.
  - After a second miss, the dotted cells number themselves along the pour.
- **Taking back:** a tap on a counter takes the last one back. A counter in the full top tray stays while the bottom tray has any.
- **On success** the numeral splits: the 1 floats onto the full tray and the ones digit onto the counters below.
- **Number of the day (grade 1):**
  - The 10th counter seals the tray, which slides onto a tens shelf.
  - The stack adds a whole sealed ten.
  - Tapping the shelf unseals a ten. That works only when the open tray is empty, or in a "ten less" step.
  - The day card fills as each step is proven: build N, ten more, ten less from N.
  - Three rounds add one more or one less: 49 + 1 seals a ten, and 30 − 1 breaks one (tap the empty open tray).
  - The card shows the tens and ones digits, the number word (taken from the worksheets' reviewed tables in `overflow-trays-words.js`, asserted byte-equal), and a tally only up to 20.
- **Settings:** Level (11–19 / Number of the day) and Help (after misses / always).
- **"Just pour"** is open play with a live day card.
- **Layout:** wide from 640 px (spout left of the trays, day card in a side column). On phones the spout moves to the top row and the day card goes below the actions.

## Gates
- `verify-overflow-trays-core.js`: 4,960 checks — pouring, overflow and the cap, take-back rules, seal / stack / unseal / break, every round's steps, the shape and hint keys (never a counted 0), the order function, layout, words ×11, and the free-play card.
- `mutate-overflow-trays.js`: 26/26 killed.
- `local-test-overflow-trays.js --locales=all`: 495/0 — real taps, 11 locales, sweep 320–1366. ⚠ Without `--locales=all` it runs en only (155).
- `visual-qa`: 54 renders · `hierarchy` 219/0 · settings: 2 live.
- Content gates PASS: ×11, prose-claims, SERP, tells, answer-rank, preflight.

## Traps
- **Zeros hide in sentences.** "needs 3 full tens, then 0 more" and "the ones stayed 0" both broke the no-0 rule. The fix is per-case keys (`hintShapeDayNone`, `okMoreNone`, `okTensNone`, `hintShapeSmall`, `hintShapeTen`), not a filter on the number.
- **The day card on an EMPTY free-play table printed a "0" head and 0 tens / 0 ones.** The reviewer found it by reading `card()`. Now `total || null` (gate plus a mutation). The ones box still shows the digit 0 for round tens (30, 40): that is a place-value digit, not a counted 0, and it was kept deliberately.
- **Mode and side width were decided separately**, so the wide layout at 600 px did not fit. Both now derive from one `wide` flag (wide starts at 640), and a mutation guards it.
- **Sealed bars were 30 px wide**, under the 44 px tap floor. The whole shelf is now one button, and the bars are display only.
- **A pour at 20 is refused**, so a test that pours one more after a miss at 19 never clears the help. The gate takes one back instead.
- **In FAST mode the step success line cleared at once.** It now persists until the next move.

## Review (one agent, native ×11 + pedagogy) — applied
- **MUST-FIX:** the free-play empty-card 0 (above).
- **Strings:**
  - en `hintBreak` "take one away".
  - de `stepOneMore` "Leg jetzt eins zu {n} dazu", `hintPour` "Halte … gedrückt, um zu gießen".
  - es `stepOneMore` "agrega uno más".
  - pt `okMore` "continuam sendo".
  - nl `stepOneMore` "Doe nu één bij {n}".
  - sv/da/no `openTray`: the aria-label read as an imperative ("Öppna lådan" = "open the drawer"), now "Den öppna lådan" / "Den åbne bakke" / "Det åpne brettet".
  - sv/no `stepMore` had a doubled "till/til".
  - sv `hintFew` "Fyll dem alla".
  - fi `hintPour` "Lopeta, kun nappuloita on {n}", `cardTens` "kymppejä" (one name for the ten).
- **Prose:** pt "quatorze" (the word the child sees), it "scheda" (not "carta"), fi "Kun luku on oikein".
- **FROZEN-NOTE (not changed):**
  - de and sv/no intros use straight quotes.
  - fr intro says « un dizaine » with plain spaces.
  - pt intro "Constrói" is a European imperative.
  - it title/intro "doppia tabella del dieci" means the times table (should be cornice).
  - sv slug/title/intro say "siffror" (digits) where the word should be "tal".
