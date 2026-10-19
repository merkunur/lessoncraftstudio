# #32 — Describe Measurable Attributes → THE MEASURING STATIONS (K.MD.A.1)

ORDER row 32 · id `choice-board.describe-attribute.k-md-a-1` (kept).

**Own files:** `measure-stations-core.js`, `measure-stations-activity.js`, `measure-stations-activity.html` and `measure-stations-activities.json`.
- The row left `choice-board-activities.json`, which now has 17 rows. It was removed as text, keeping the file's own CRLF format.
- The shared choice-board engine keeps its `describe-attribute` branch, which is now unreachable. **0 lines changed in any shared core.**

**Locales:** slug, title and intro are frozen in all 11; the prose was rewritten in all 11. No grade change.

Design: `designs/032-choice-board.md`.

## The apparatus and its invention: THE WRONG STATION MEASURES THE WRONG THING, HONESTLY
- **The question card is a SIGN, with no words:** ↔ over a floor for how long, ↕ standing on a floor for how tall, a weight under a hook for how heavy.
- **Three stations:**
  - **Track:** the picture lies with its long axis flat; a slider runs to its far end and leaves a coral bar.
  - **Post:** the picture stands in its natural pose; a cap drops to its top, and a teal bar shows the height.
  - **Spring:** the pan drops 62 / 38 px for a heavy thing and 14 / 9 px for a light one, and bobs.
- **The hand:** drag the picture onto a station, tap-tap, or tap a station directly.
- **Every pose comes from the ink, never by hand.** Each picture's principal axis and ink box are measured from its alpha channel (`rest` = natural pose, `lie` = long axis flat), so the giraffe really tips over and the pencil really lies flat. All poses were checked on a contact sheet.
- **A wrong station still measures.** Its sign flag pops up beside the question's sign, and the hint names what it measures against what was asked (six keys). At miss 2 the right station glows. The last bar stays faint on its station so the child can compare.
- **Harder (two ways):** one picture is measured twice, and a measure card with two badges drops into an album.
- **Big or small:** pictures and shapes at 1.0 and 0.56 size stand on a shelf. On Check, a 0.80 square window glides over every card: a big one pokes out (gold), a small one fits with room and rattles if it was ringed.
- **"Try anything":** 17 pictures on any station, nothing graded.

## Gates
- **`verify-measure-stations-core.js`: 2,913 checks.**
  - The design tables.
  - **Every pose re-measured from the picture files with sharp** (±2 units): the long things lie flat; the tall things stand and tip over.
  - The weight classes; only the matching station answers; all six wrong-station hints; the miss-2 glow; the two-ways flow.
  - **Badge gender read from the picture vocabulary,** not from the core.
  - Over 10,000 seeds: no station answers 3 rounds in a row, and no repeat.
  - The size rows (2–3 big, never one or all, no two alike, slot balance 35–65 % under mirroring); the window (poke-out ≥ 6 %, room ≥ 6 %).
  - Layout 280–1100; strings ×11, every key authored and used.
- **`mutate-measure-stations.js`: every mutation killed** (the design's nine plus the rules, gender and the toy train).
- **`local-test-measure-stations.js --locales=all`:**
  - real drag to the track, tap-tap, direct tap;
  - bar = ink length / height at the scale used;
  - two ways with the album, both size modes, the window geometry, try anything;
  - the sweep 320–1366 over eight states.

  ⚠ The default run is en only.
- **visual-qa:** 54 · **hierarchy:** 434/0 · **settings:** 2 live · **content gates:** PASS.

## Traps
- **An SVG at `width:100%` inside a padded grid card rendered 0 × 0 inside the shell.** Sign icons need an explicit size.
- **`_place` built an `<img>` with two `style` attributes,** and the browser silently drops the second. Pass class and CSS variables as parameters; never splice markup.
- **In FAST mode a wrong drop returned at once,** so a screenshot never showed the object on the wrong station, and a test that wanted the step-1 "Yes!" found it erased. The sentence now stays until the next move.
- **A scrolling tray put chips outside the card bounds,** and every overflow gate rightly counts that. Wrap with 44 px chips instead.
- **A `t('…')` usage scan matched `_set('measure')` and `createElement('style')`.** Use a `(?<![\w.])` lookbehind.
- **I typed the French strings with plain spaces again.** The gate's strict check (every `? ! : ;` after U+202F) caught it.

## Review (one agent, native ×11 + pedagogy) — applied
- **Gender agreement in fr/es/it/pt:**
  - The badges now agree with the noun: feminine `…F` keys, genders from the picture vocabulary ("alta y pesada" for *la jirafa*).
  - `okTwoWays` and `promptTwoWays` lose their gendered pronoun ("¡Mediste de dos maneras…").
  - it `okLong` / `okTall` now say "la lunghezza" / "l’altezza".
- **The kite as "tall" reads as "flies high" in ten languages.** In two ways it is replaced by the **sunflower** (light, tall), prose too.
- **A toy train as "light" contradicts what a child knows.** In two ways it is replaced by the **ruler**, and the train is now heavy on the spring.
- **es:** the hints say "Pero la pregunta es de alto"; "Ventana de tamaños".
- **pt:** "A pergunta é sobre…"; "ficam para fora".
- **fi:** "Mittaus"; "ulottuvat reunan yli"; "kuppi" (prose).
- **Prose:**
  - **de:** "Stein … Federwaage".
  - **fr:** "fait descendre le peson"; "un poids suspendu pour la masse".
  - **no:** "en strek", not "en stolpe".
- **FROZEN-NOTE (not changed):**
  - **Intros still describe the old mechanic** ("tap the word") in en, de, fr, pt, it, nl, sv, da, no and fi.
  - **es:** the title says "en Infantil", a Spain term; Mexico says preescolar.
