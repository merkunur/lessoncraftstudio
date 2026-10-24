# #98 — Tens and Ones → THE ZERO-SWALLOWING CARDS (1.NBT.B.2, all 11 locales)

ORDER row 98 · id `place-value.tens-and-ones.1-nbt-b-2` (kept). Design: `designs/098-place-value.md`.

## Files and wiring
- **New files:**
  - `mini tools/zero-cards-core.js`: the round tables (four faces × three ranges), the rack, the stand (place a tens card, place a ones card on the 0 / over the tens digit / beside the stand, lift, stretch), the trays, Check / hint / okOf, the order rules and the plan.
  - `zero-cards-activity.js`
  - `zero-cards-activity.html`
  - CSS prefix `zc-`.
- **Manifest:**
  - The row stays in `place-value-activities.json` beside its two siblings (hundreds-tens-and-ones, expanded-form, still on the old engine).
  - Only its own text was cut and replaced, so the siblings are byte-identical.
  - `tool` → `zero-cards-activity`, `task_template` → `zero-cards`, and `params` = `{targets (the 18 old ones, kept), faces, numbers, rounds}`.
  - Metadata is frozen in all 11 locales (sha1 `d1b7564b`, checked).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.839. No grade or strand override was added; the row keeps grade 1, as did rows 95 and 97.
- **No legacy gate** named this row.
- **Number words** for the word coat come from `scripts/worksheet-gen/lib/number-words.js` (1–99 × 11 locales, baked into the wrapper).
- **Sources** (all in the scratchpad):
  - `zc-strings.json` + `zc-apply-strings.js`, `zc-words.js`, `zc-manifest.js`
  - `zc-prose.json` + `zc-fr.js`
  - `zc-desc.txt` + `zc-dump.js` → `zc-dump.md` (the reviewer's text)
  - `zc-review-fix.js`, `zc-probe.js`

## The invention
**The card stand is exactly two digits wide, and a ones card only stays on the 0 of the tens card.**
- **Placing the cards:**
  - The long tens card (40) fills both cells.
  - The short ones card (7, with an arrow tab) laid in the right cell covers the 0. The stand reads 47, and the cards pour 4 rods and 7 cubes onto the mat.
  - Laid beside the stand or over the tens digit, the ones card tips and falls off, so **407 cannot be made**. The note says the ones card only stays on the 0.
  - A ones card can lie alone in the right cell; a tens card dropped afterwards slides under it.
- **Stretch:**
  - Drag the placed ones card to the side, or press ⟷, and the number opens: the tens card shows its 0 again, a + appears, and the stand reads 40 + 3.
  - Drag it back, or press ⟷ again, to join the number.
- **Success:** the rods count themselves 10, 20, 30 … and the last cube shows the total.

## Faces and rounds
| Face | To 99 | To 50 | To 20 |
|---|---|---|---|
| Build it (target coats: numeral, word, tens and ones, n tens, ten frames ≤ 20, tally ≤ 25, spoken + small numeral) | the 18 old targets (12, 13, 16, 19, 23, 29, 30, 35, 47, 50, 58, 64, 70, 72, 86, 89, 90, 95) | 9 | 10 (incl. 10 as "1 ten") |
| Read the blocks (the given rods and cubes lie on the mat; the cards do not pour) | 8 decades | 5 decades + 3 mixed | 2 decades + 6 teens |
| Stretch it (apart: build 43 and stretch it · together: build 60 + 7 as one stack) | 8 | 8 | 8 |
| Which blocks? (the stack is given; three trays: right, reversed, one off) | 9 | 9 | 9 |

- No target is 0. Decades appear both as "n tens" and as a bare numeral (1.NBT.B.2.c); teens appear as one ten and some ones.
- The plan is an order-only reshuffle and never repeats the previous pass. In the build face it never gives the same coat twice in a row or two decades in a row. In the stretch face it never gives three rounds of one direction in a row.
- In "Which blocks?" the right tray sits 3/3/3 per pass, with at most one repeat in a row, and the two wrong trays swap places at random. Measured as rendered.

## Feedback
- **Empty stand:** hintEmpty, no miss. **No tray chosen:** hintPickTray, no miss.
- **Right number in a stretch round, but not yet stretched (or still stretched in a "together" round):** hintStretch / hintTogether, no miss.
- **Miss 1:** the half of the mat that differs glows (rods or cubes); the note says hintRods or hintCubes.
- **Miss 2:**
  - Build and stretch: the number's own rods and cubes appear see-through beside the child's, extra blocks are outlined, and the note says hintGhost.
  - Read the blocks: the given blocks are already on the mat, so the note says hintTensCount.
- **Which blocks?:**
  - The stack's blocks are laid over the chosen tray: extra blocks are outlined, missing ones dashed (hintWhich1).
  - Then hintWhich2.
- **No hint names a number** (gated: no placeholder in any hint, no digit 1–9 in any hint string in any locale).
- **Success:**
  - okBuild "47 — 4 tens and 7 ones." (phrases authored per count: "1 ten", "1 one")
  - okBuild0 for decades: "30 — 3 tens and no ones."
  - okApart / okTogether: "43 is 40 + 3." / "60 + 7 is 67."

## Review (one reviewer, all 11 locales; every finding fixed at the source)
- **MUST:**
  - it: *allargare* means "widen"; the classroom term is *scomporre*. tStretch, instrApart, hintStretch, ariaStretch and the prose were changed.
  - fr: *écarter un nombre* is not classroom French, and the instruction and the hint disagreed. Both now use *décomposer*.
  - da / sv / no: word order "så 407 aldrig kan …", and the Swedish particle "lyser … upp".
  - da: "tiercifferet".
- **Pedagogy:**
  - The "How many tens?" label over-promised when the to-20 / to-50 sets also show cubes. The face is now "Read the blocks" in every locale; decade rounds still ask "How many tens?".
  - The prose said "spoken aloud" while the numeral also shows. It now says "some numbers can also be heard".
- **Native fixes:**
  - en: hintWhich1 wording.
  - de: "ein Zehner", "in Ziffern".
  - nl: *tientallenkaartje* throughout, plus the hintWhich1 wording.
  - es: "vale diez", "los que tienen borde", Mexican “ ” quotes.
  - it: *supporto* instead of *leggio*, "vale dieci", "nucleo Numeri".
  - pt: "vale dez", Brazilian “ ” quotes.
  - fr: "ceux qui ont un contour".
  - fi: the instruction names the rods and cubes, plus "kymmenten" and "muodossa".
- **My own fixes (render reads and the local test):**
  - "Which blocks?" no longer repeats the stand's number in a target card, and the tray numbers 1 / 2 / 3 were removed: next to blocks they read as amounts. Keys 1 / 2 / 3 still pick a tray.
  - The given blocks of the tens face moved onto the mat, big, instead of a small picture in the target card.
  - Decades get their own sentence: fi "ja ei ykkösiä" was not Finnish.
  - At 320 px nine rods wrapped onto a second row; the mat now gives the rods 3/5 of its width, and the gate measures the real widths.
  - At 768 px the nine-card tens rack was wider than the card.
  - At 320 px a stretched stand plus ⟷ was wider than the card.
  - At 768 px a tray with 8 rods overflowed.
  - The mat's `role="img"` moved out of markup (hierarchy gate).

## Gates
- `verify-zero-cards-core.js` 6,534/0. Its own oracle checks:
  - every placement exhaustively (407 unreachable over 10…90 × 1…9);
  - the Check ladder, stretch, and trays for every tray code;
  - the plan, including a same-seed replay that must not repeat a pass;
  - the number words against the shared table;
  - strings: 11 locales, the same placeholders, hints with no numbers, every key reached.
- `mutate-zero-cards.js` 17/17 killed, control survived.
- `local-test-zero-cards.js` 52,492/0: real taps and drags, 11 locales, every round at rest / miss 2 / solved, resized 320–1366. Poisoned: widening the narrow tens chips fails it 54 times. The first full run found 1,122 failures, all at 640 px (the nine-card rack); the wide rack is now a flexible grid.
- `visual-qa-activity.js` 108/108.
- `audit-activity-hierarchy.js` 158/0.
- `audit-settings-efficacy.js --tool=zero-cards-activity`: 2 live (task, numbers).
- `preflight-activity-routes`, `verify-activity-prose-claims` and `verify-activity-serp-copy` all pass.

## Frozen metadata flags (not edited — landing / metadata rule)
- Every page intro says "Tap to add a ten-rod or a unit-cube — and watch the number grow": the old activity. Now cards are placed and the blocks pour out of them.
