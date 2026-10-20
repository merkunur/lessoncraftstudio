# #47 — Bygg ordet av stavelser (no) → SNØREBRETTET, the lacing board (RF.K.2.B, bokmål only)

ORDER row 47 · id `syllable-builder.bygg-ordet-av-stavelser.no.rf-k-2-b` (kept).

- **Files:**
  - Added: `lacing-board-core.js`, `lacing-board-activity.js`, `lacing-board-activity.html`, `lacing-board-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 8 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** bokmål only by design.
- **Metadata:** slug, title and intro are frozen. The no prose is rewritten: the old prose cited "ele-fant", which is not one of the activity's words, and described tiles.
- **Strand chip:** overridden to «Fonologisk bevissthet», as for the da/nl rows; the RF default «Lesing: grunnleggende ferdigheter» is a reading strand.
- **Design:** `designs/047-syllable-builder.md`.
- **Prefix:** `lc-` (`lb-` belongs to the Letterbox).

## The apparatus and its invention: A LACING CARD OF SCATTERED SYLLABLE BUTTONS
- **The board:** a birch lacing board with the picture beside it (tap = the word). The word's syllables lie as wooden buttons on a jittered 3 × 3 grid, never in the word's order. A red lace runs from a knot on the left edge through every threaded hole to a metal tip.
- **Threading:** drag the tip onto a button, or tap a button. Tapping the LAST threaded button (or Backspace) takes it off — only the last, like real lacing.
- **Stram! (Check):**
  - The lace keeps the longest right beginning; those buttons glow teal.
  - From the first wrong button on, the lace slips out and the buttons hop back.
  - A right beginning that is not finished asks for more, with no miss.
- **Tre ordet:** only the word's buttons.
- **Lureknappen:** one trick button by default (setting: none / one / two), each a syllable of another pool word. A threaded trick button always slips off. Miss 2 glows ONLY the next right button.
- **Hvor mange knapper?:** six blank buttons; thread one per syllable heard.
  - Too few: the last button carries the rest (syk·kel) and a ghost hole appears.
  - Too many: the extra buttons stay blank on the lace until taken off.
  - Miss 2: the word in syllables above the board and the clap hint.
- **Success:** the threaded buttons slide down onto the rail edge to edge, then close up into one word card; the unused buttons fall away; the lace ties a bow; the word hangs on the peg rail at the top.
- **Settings:** Nivå, Lureknapper (Ingen / Én / To), Knappene (Spredt / På rad).
- **Keyboard:** Tab walks the buttons in CELL order (never the word order), Enter threads, Backspace takes the last off.

## Deviations from the design (each measured or ruled)
- **Placement bots:** the design asked reading-order and nearest-next ≤ 0.25. Seven of the ten Tre ordet words have two syllables, where any order is right half the time by chance; going below needs a reversal bias, which is itself a tell (the #44–#46 ruling).
  - Three or more syllables never lie in reading order, reversed, or on the nearest-next path from the knot (0 of 6,000 deals).
  - Two syllables: chance, gated at 0.35–0.65.
  - Measured: reading order solves 0.449 of Tre ordet and 0.144 of Lureknappen rounds; first syllable in the top-left cell 0.105 / 0.089 (1/9 = 0.111).
- **On a miss the right beginning glows in place** instead of sliding to the rail: a half-railed lace would leave the child threading from the rail.
- **Too many blank buttons stay on the lace** (blank, shivering) instead of sliding off by themselves: sliding off would solve the round for the child.
- **Level name:** «Hvor mange knapper?», not «Hvor mange hull?» — the child threads buttons (native review).
- **Words:** see below; `blåbær` out at the picture check (the library blueberry is one dark ball, read as a plum or a ball) → `traktor`, the design's spare.
- **Not built:** untying the bow between rounds, swinging the peg cards at the end of a pass, the "På rad" suggestion after two misses on a phone.

## Fixes from the build (each found by a render or a gate)
- **The tip covered the last button's syllable** (it ran 40 px straight on and was clamped onto the button). It now rests on the nearest spot clear of every button face; the sweep asserts it.
- **At success the unused buttons sat on the rail** where the word lands. They fall away.
- **Deal order = word order in the DOM** would have made Tab give the answer. Buttons are appended in cell order; the local test asserts it.
- **The hop and shiver animated `margin-top`**, moving the layout box; the overlap gate read it as two buttons colliding. They animate `translate` now.
- **A full word followed by a trick button crashed Stram!** (no "next" button to glow). Fixed.
- **The gate caught mer + ke = *merke*** on the butterfly round → «tor».

## Gates
- **`verify-lacing-board-core.js`: 21,648 checks, 0 failures.** Its own oracle carries the 30 words, splits, pictures and levels. It checks:
  - **Data:** splits = `approved-words-no.json`; every picture exists and its no label is the word; never blåbær, tannbørste, hanske, bjørn, engel, gorilla.
  - **Thread / decoy:** EVERY threading sequence of distinct buttons up to n + 2 long, with 0–2 trick buttons — the lace keeps exactly the longest right beginning, right iff it spells the word, a right beginning asks without a miss, trick buttons come off; only the last button unthreads; miss 2 glows only the next button.
  - **Trick buttons:** not in the word, a syllable of another pool word, never part of a bokmål word with the word's buttons (including *merke*, *vannfugl*, *sommersol*), no «fugl» beside the penguin.
  - **Count:** 0–6 threaded for every word; counts 1×2 2×3 3×3 4×2.
  - **Placement:** 2,000 deals per level and layout (above).
  - **Also:** the hint ladder, the order rule, the strings, and the frozen manifest.
- **`mutate-lacing-board.js`:** 24 of 24 mutations killed. The vannfugl mutation survived once — the gate's word list did not know the compound — and the reviewed compounds were added to its ground truth.
- **`local-test-lacing-board.js`:** 2,587 checks, 0 failures, with a real pointer at 704 for every round of every level: tip drags, taps, the hop, trick buttons, the glow, tap-the-last, settings, keyboard. The sweep 320–1366 at rest, miss and done asserts: no sideways scroll, controls ≥ 44 px in the card, buttons on the board and never overlapping, the tip on no face, syllables ≥ 14 px, pictures ≥ 64 / 96 px, every control above the fold.
- **Other gates:**
  - `visual-qa-activity.js --locale=no`: 60 renders pass;
  - `audit-activity-hierarchy.js`: 242 / 0;
  - `audit-settings-efficacy.js`: 3 live;
  - the no content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are green.
- **Read by me:** both contact sheets; rest, miss and success at 320, 360, 704 and 1024; the preview.

## Review (one agent, Norwegian native + barnehage / 1. trinn pedagogy): applied
- **Required:**
  - **bjørn:** the camping bear is a rounded teddy shape; a child says «bamse» (2 claps) at the level where only the spoken word counts → **gris**.
  - **engel = en·gel:** spoken [ˈɛŋəl], so the "gel" button shows a g nobody hears → **banan**.
  - **Prose:** «tre ett hull … gjennom tomme knapper» was garbled → «tre én tom knapp for hver stavelse du hører».
  - **Hole vs button:** the child threads buttons, so pCount, hintShort, hintCount, hintClap and the level name now say «knapp»; hintShort «fikk mer enn én stavelse. Tre én knapp til!». The en source had the same error («Thread one more hole!»), fixed too.
- **Optional, applied:**
  - **gorilla** (often «ape», 2) → **kenguru**;
  - trick buttons that made a word or a meaning trap: vannmelon + fugl (*vannfugl*) → kop, sommerfugl + sol (*sommersol*) → ply, pingvin + fugl (a penguin IS a bird) → lon;
  - «hører ikke til», «Ordet har flere stavelser.», «Snøret sitter fast helt til {last}», «Knappen som lyser, kommer nå.»;
  - prose: «Det spesielle er at snøret strammes», «lista», «rammeplanen for barnehagen og LK20», «stavelsesdelingene».
- **Kept:**
  - **alligator:** children say «krokodille», but both clap 4 and no library picture is labelled krokodille.
  - **snøret** (the reviewer offered «snora» as optional; «snøre» is in the instrument's name).
  - **kanin / vannmelon** may be called «hare» / «melon»: the buttons and the spoken word fix the word at those levels.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title** says «Fonetikk», the academic science of phonetics; a teacher would say «språklig bevissthet».
- **The intro** says «blande … stavelser», a calque of "blend" («sette sammen»); «Tilpasset LK20» does not cover the barnehage (rammeplanen); «bygg ordet / legge stavelsene» no longer matches the threading.

## Deploy (2026-10-20)
- **Commit 6a3edefc.** deploy.sh returned EXIT 0, with 0 payment-canary failures. The no page returns 200. The preview webp was copied to the server before the build.
- **Production play: 22 / 22** (no at 1366 and 390).
  - Solsikke: the tip dragged onto «sik» → it slips out (a miss); sol + sik + ke → right, the word on the rail.
  - Paraply: the trick button slips off (a miss); pa + ra + ply → right.
  - Hund on two buttons → a blank button (a miss); one taken off → right.
  - The wrapper version matches, and the iframe grows with the card.
- **Live variety probe (no):** 10 distinct rounds, and pass 2 is reshuffled.
- **Server disk after the deploy:** 134 GB available of 436 GB (68 % used).
