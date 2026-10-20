# #50 — Forma las sílabas (es) → LA FILA DE FICHAS, the domino run (RF.K.2.B, Spanish only)

ORDER row 50 · id `syllable-builder.forma-las-silabas.rf-k-2-b` (kept).

- **Files:**
  - Added: `domino-run-core.js`, `domino-run-activity.js`, `domino-run-activity.html`, `domino-run-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 5 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** Spanish only by design. The register is es-MX, and every word was checked for Mexico AND Spain.
- **Metadata:** slug, title and intro are frozen. The es prose is rewritten for the new apparatus.
- **Strand chip:** overridden to «Conciencia fonológica»; the RF default «Comprensión lectora» is a reading strand.
- **Design:** `designs/050-syllable-builder.md`. **Prefix:** `drn-`.

## The apparatus and its invention: SYLLABLES AS DOMINOES
- **The table:** the picture stands on an easel with a brass bell; finished words stack as tiles in the word box beside it. Dominoes stand on marks spread evenly along the table (the spacing depends only on their number), and loose dominoes lie in the box below.
- **¡Empuja! (Check):** the dominoes topple one after another, faster and faster (fall interval 260 → 120 ms). They land face-up with their syllables showing, each a little closer to the one before (overlap 20 → 4 px).
  - **Right:** the fallen row closes up edge to edge into the word, the bell rings, the picture bounces, and the word goes to the word box.
  - **A gap stops the run:** the dominoes after it stay standing. This is never a miss.
  - **A wrong domino:** it lies in the fallen row as a non-word, wobbling coral, then bounces back to the box.
- **Completa la palabra:** the word stands with one domino missing. The box holds three candidates: the answer, ANOTHER syllable of the same word, and a foreign syllable. Tap or drag one onto the gap.
  - Miss 2: the gap glows, and TTS says the word with a pause.
  - Gaps: first ×2, middle ×6, last ×2.
- **Ordena las fichas:** the word's dominoes are in the box, shuffled; tap one (it stands on the first empty mark) or drag it to a mark.
  - On a miss, every in-place domino stays and the others bounce.
  - Miss 2: the first syllable stands itself on the first mark, pinned.
  - **Ficha trampa** adds one decoy.
- **¿Cuántas fichas?:** tap the table or the box to stand blank dominoes (1–6).
  - Too few: the last fallen tile carries the rest, crammed.
  - Too many: a blank tile falls, empty.
  - Miss 2: one beat per syllable lights in turn above the run, so it is visible with the sound off.
- **Settings:** Nivel, Ficha trampa (No / Sí), Letras (minúsculas / MAYÚSCULAS, a CSS transform that keeps every accent).
- **Keyboard:** Enter stands a box domino, Backspace takes the last back; + / − for blanks.

## Deviations from the design (each measured or ruled)
- **No separate word strip**, as the design requires: the fallen tiles carry the syllables.
- **On phones the fallen tiles size themselves to the stage**, widening for crammed syllables («pó·ta·mo»).
- **The picture stands on its easel above the table**, beside the word box, at every width (the design put it at the run's right end at 704). The run then gets the full width, so six dominoes fit at 288 px.
- **The pile:** with the trick domino off, "first box domino = first syllable" measures 0.360 against the design's ≤ 0.35. Half the words have two syllables, where any order is right half the time by chance (the #44–#49 ruling). Three or more syllables never start in word order nor reversed. "Box order" solves 0.243 (≤ 0.25); with the trick domino on, 0.084.
- **Not built:** the reverse-cascade stand-up animation (dominoes reappear standing), and the end-of-pass hop of the word tiles.

## Gates
- **`verify-domino-run-core.js`: 1,472 checks, 0 failures.** Its own oracle carries the 30 words, splits and pictures, the gaps, candidates and trick dominoes. It checks:
  - **Data:** splits = `approved-words-es.json` (accents and güi kept); every picture exists and its es label is the word.
  - **Completa:** EVERY candidate on every gap.
  - **Ordena:** EVERY arrangement, with and without the trick domino.
  - **¿Cuántas fichas?:** 0–6 blanks per word.
  - **Real words:** no candidate or trick domino spells a pool word or a reviewed real word (tortura, perita, toca, aro, gasa, saca). The gap rule, miss-2 pin and bots are checked too.
  - **The run:** intervals and overlaps strictly shrink, and the spacing depends only on n.
  - **Also:** the hints, the order rule, the strings and the frozen manifest.
- **`mutate-domino-run.js`:** 25 of 25 mutations killed, including manzana / tortura / perita / pez coming back. One survived until the gate tried to stand a candidate on a fixed domino's mark.
- **`local-test-domino-run.js`:** 2,823 checks, 0 failures.
  - **At 704, a real pointer** through every round of every level: tap and drag onto the gap and marks, the stop, stay / bounce, the trick domino, the pin, the crammed tile watched in real time, the beats, settings and keyboard.
  - **The sweep 320–1366** at rest, miss, fallen and done asserts: no sideways scroll, controls ≥ 44 px, dominoes and fallen tiles on the table and never touching, text ≥ 14 px, pictures ≥ 64 / 96 px, every control above the fold. At 320 the table is 136 px tall, because the count and order levels sat 1–9 px below the fold at 150.
- **Other gates:**
  - `visual-qa-activity.js --locale=es`: 60 renders pass;
  - `audit-activity-hierarchy.js`: 182 / 0;
  - `audit-settings-efficacy.js`: 3 live;
  - the es content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are green.
- **Read by me:** two contact sheets; rest, miss, fallen and done at 360, 704 and 1024; the preview.

## Review (one agent, Spanish native for Mexico and Spain + preescolar / infantil pedagogy): applied
- **Required:**
  - **Real words a domino spelled:** zanahoria + «man» spelled *manzana* (its picture is in the deck) → «go»; tortuga + «ra» spelled *tortura* → «bi»; pelota + «ri» spelled *perita* → «za».
  - **«se para»** means "stands up" in Mexico → «se detiene» (hint and prose).
  - **pez out of the oral count:** many Mexican children say «pescado» → **flor**.
  - **hintStay** was ambiguous → «Las fichas que se quedan en la fila están bien.» (and in the en source).
- **Optional, applied:**
  - casa + «to» (*toca*) → «del»; avión + «ro» (*aro*) → «cle»; gato + «sa» (*gasa*, which the gate then flagged) → «mur»;
  - «empieza con»; «se juntan para formar la palabra»; «¡Empuja!» in « »; «comprobadas en varias fuentes»;
  - the en "join up to make the word".
- **Also mine:**
  - the success line «¡Es {word}!» (it began with a lowercase word);
  - the visible beats at count miss 2.
- **Kept:**
  - me·me on mesa's gap (the reviewer judged it harmless, and mesa has no other same-word syllable);
  - pelota for the soccer ball (the shown pe·_·ta settles it in Spain, where it is «balón»).

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title** says «Fonética», which is the wrong term; this activity is conciencia fonológica (the new strand chip).
- **The intro** «mezclar y segmentar sílabas» is a calque of blend/segment («unir y separar»), and it describes only the build task.
