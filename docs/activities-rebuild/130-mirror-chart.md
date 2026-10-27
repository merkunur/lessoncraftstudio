# #130 — Word Doctor's Clinic → THE MIRROR CHART (L.1.2.e; all 11 locales)

ORDER row 130 · id `word-clinic.spell-by-ear.l-1-2-e` (kept). Design: `designs/130-word-clinic.md`.

## Files and wiring
- **New files:**
  - `mini tools/mirror-chart-index.js` (`MirrorChartIndex`) is the mirror's dictionary. For every locale it maps each picture word (singular and plural, lower case) to one canonical library picture and its number. It is built by a scratchpad script from the picture labels (`mini tools/pictures/*.json`), colour themes only.
    - **Never shown:** states and verbs (emotions, weather, activities, colours, shapes), the tree theme, and six pictures that read as something else: both peaches, the cherry, the plum, the pan in kitchen tools, and the rug.
  - `mini tools/mirror-chart-core.js` (`MirrorChartCore`) holds the model:
    - **Four levels:** 1 fill the sick box (12 rounds), 2 write the word (12), 3 the rule letters (8), 4 the plural ending (8).
    - **Six helps for level 2:** boxes + first letter + bank; boxes + first letter; boxes + bank; first letter; bank only; a plain line.
    - **The mirror's reading:**
      - **match:** the patient;
      - **other:** another picture word, and the mirror shows THAT picture;
      - **count:** the singular when two patients wait, so the mirror shows one;
      - **capital:** German only, the right letters with a lower-case start;
      - **fog:** anything else.
    - **The hints:** an empty Check gives a hint and no miss.
    - **Misty boxes:** from miss 2, the wrong boxes turn misty.
    - **The plan:** a fresh order, the right tile in every tray slot equally often, and a shuffled bank.
    - DATA is written by `dvm-build.js` from `dvm-src.js`.
  - `mirror-chart-activity.js` draws the parts:
    - the patient on a clipboard chart, with Listen and the healed album;
    - the oval mirror: fogged, showing a picture (two for a plural), or the letters written in the fog;
    - the word boxes or the line, then the tray, or the bank and the keyboard (de has a capital key);
    - the Mirror button and the note.

    The CSS prefix is `mc-`, `apparatusClasses: ['mc-art']`.
  - `mirror-chart-activity.html` loads index, core and activity at `?v=1`.
  - The old word-clinic files stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `word-clinic-activities.json`.
  - `tool` → `mirror-chart-activity`.
  - `params` = `{level: [1–4], help: [6], rounds: {1: 12, 2: 12, 3: 8, 4: 8}}`.
  - **en is frozen; de–fi slug, title and intro are authored new** (grade 1).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.875.
- **Prose:** en replaced, 10 locales added. Every quoted word is a word the rounds spell (gate-checked).
- **Strings:** 42 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/word-clinic.spell-by-ear.l-1-2-e.js` (new):
  - picked: a wrong tile in the sick box, with the mirror still fogged and no hint;
  - missed: the mirror shows what the letters spell, and the hint;
  - resolved: the patient in the mirror, then Next 0.5 s later.
- **Sources** (scratchpad): `dvm-index.js`, `dvm-src.js` → `dvm-build.js`, `dvm-strings.js` → `dvm-apply.js`, `dvm-prose.js`, `dvm-manifest.js`, `dvm-check.js`, `dvm-has.js`, `dvm-dump.js`, `dvm-probe.js`, `dvm-fix1.js`.

## The invention
**The doctor's mirror shows only what the letters really spell.** Spell "map" for the mop and a map appears in the mirror. Letters that make no picture word leave the mirror fogged, with the letters written in the fog. The patient is healed when the mirror shows the same picture as the chart.

The material pushes back on the misconception "it looks close, so it is right": a spelling is checked by what it says, not by how near it looks. In level 4 the singular shows ONE picture beside a chart of two, which is the plural ending made visible. In German, a lower-case start leaves the mirror fogged, because a noun starts with a capital.

## The levels
1. **Heal the sick sound:** the word in sound boxes, one box empty, and a tray of three tiles. The wrong tiles were found by script as one-sound neighbours. In every locale at least ten of the twelve rounds have a wrong tile that spells another picture.
2. **Write the word:** 12 picture words per locale, spellable by ear. The help is the teacher's setting.
3. **Rule letters:** one rule per locale:
   - en ck · k
   - de ck · k
   - fr c · ç
   - es c · qu
   - pt r · rr
   - it c · ch
   - nl d · t at the end
   - sv, da, no and fi: single · double
4. **Plurals:** a chart of two patients, the singular in boxes, and a tray of endings. Two rows per locale carry the no-ending tile (–), which spells the singular, so the mirror shows one.

## Deviations from the design (each measured or ruled)
- **No free-play "try the mirror" box.** The tray, bank and keyboard already let a child try any string the round allows.
- **One rule unit per locale**, not a rotation of rules.
- **The album is plain chips, not thumbnails.** It is hidden on narrow screens, where the shell's counter already shows the count.
- **Phones:**
  - at 340 px and below, the Mirror button joins the keyboard as its last key, like Enter, so it stays above the fold;
  - on narrow screens the patient sits left of the Listen button;
  - bank-only help shows no keyboard.
- **German capital key added** (not in the design). The keyboard used to capitalise automatically, which left the capital-letter miss unreachable. The capital is now the child's own choice.
- **fi level 4** also needed the no-ending tile. Every Finnish wrong ending the reviewer flagged (kissan, kissaa) is a real case form, so the wrong endings are now non-words (-at, -tt).
- **Bank padding:** when level 2 shows boxes and too few pool words share the target's length, the bank is padded with one-letter misspellings that spell no picture. The reviewer asked for four real words (fr "lat"). I kept the padding as deliberate: a near-miss distractor is exactly what the mirror answers with fog. fr's level-2 list was replaced anyway (see below).

## Review
ONE native + early-primary pedagogy reviewer covered all 11 locales from a compact dump: every round, every tile outcome, the strings, the prose and the new metadata. The report had 7 must-fix and ~40 should-fix findings. **All were applied at the source except the bank padding above.**

**Must-fix:**
- en skirt is now `s k [ir] t` (the r-controlled vowel; sk is a blend).
- de: au, uh, ah and ie are each one box (Maus, Huhn, Zahn, Biene).
- fr: ch is one box (chou).
- pt level 3 is r · rr (ç · ss is memorisation, and two of its wrong spellings were real words).
- sv prose: "t och tt … sol" became single · double.

**Should-fix:**
- **Words not spellable by ear replaced:**
  - de Ball, Bett, Kuh, Tasse → Rose, Nase, Sofa, Lama;
  - fr lit, nid, loup, coq → moto, lama, tomate, banane;
  - es vaca, oveja, taza, nube, libro → pelota, mapa, mono, foca, loro;
  - nl bed, trein → zon, maan;
  - da bold, båd, tog → hus, sol, bil.
- **Silent letters joined into one box:** fr mute e (lune, robe, table, carte, bouche, verre); da nd (hund, vand); fi geminates (matto, takki).
- **Wrong tiles that were real words, or too common to show fog, replaced:**
  - Single swaps: fr bâteau → pâteau, pus → mus; pt cão → lão, canela → vanela; nl bot → beut, while bout now shows a bolt; no bake → nake; fi puu → nuu.
  - gås everywhere: mås → pås.
  - Level 4 rows: de Hunden/Schafen/Betten-forms → -er, -ern; it gatto, casa rows → treno, palla; nl appel → kikker; no -ar (Nynorsk plurals) → -or; fi case forms → -at, -tt.
  - Level 3 rows: de Haken → Schaukel; sv vas → gris; fi kukka, kissa, tuuli → kukko, mökki, juusto.
- **Wording:**
  - en "poorly" → "sick" (US register);
  - missCount in 8 locales → "there are two patients" (fr/it say "one single picture");
  - da "rude" → "felt";
  - es "tu peque" → "la niña o el niño", and the es title and slug say "primer grado";
  - de "ergeben"; fi "kortti", "peilikin";
  - nl "woordenlijst".

**Open (frozen metadata, not edited):** the en title and intro still read "Word Doctor's Clinic — Heal the Sick Sound", which still fits.

## Gates
- **`verify-mirror-chart-core.js`:** 9,241 checks, 0 fail. Its own tables are its own scan of the picture labels with its own never-show list, its own right spelling for each round, and its own German capital rule. It checks:
  - every tile's mirror result against the own scan, and that only the right spelling heals;
  - a folded accent never heals; the lower-case German start; one letter too many;
  - level 2 under all six helps;
  - the no-ending tile in every locale; misty from miss 2;
  - tray slot balance, and the shortest/longest bots ≤ 6/12;
  - strings × 11 (no digit in a hint, never "free", fr/it typography), prose quotes and the manifest.
- **`mutate-mirror-chart.js`:** 15 of 15 killed, control survived:
  - prefix heals, accents ignored, German lower case heals, the plural singular as "other";
  - a real word as fog, every string a picture, the bank without the word;
  - two first letters given, the right tile always first, the same order every pass;
  - an empty Check as a miss, mist from miss 1, plural without the drop, mixed-length bank;
  - a digit in a hint.
- **`local-test-mirror-chart.js`:** real pointer, 11 locales, 320–1366, pictures served case-exactly. Level 2 is swept in three helps, and every round at rest, miss 2 and solved. **The full run was 58,329 pass with 16 fail.** Every fail was 320 px typing mode in fr/pt/es/it, whose keyboards need a seventh row for the accented letters. After the fix (below), **the 320/360/412 rerun across all 11 locales: 20,329 pass, 0 fail.**
- **`visual-qa-activity`:** PASSED, 288 renders (12 rounds × 4 phases × 6 viewports).
- **`audit-activity-hierarchy`:** 333 / 0.
- **`audit-settings-efficacy`:** "level" and "help" both change the board.
- **`audit-activity-next-delay`:** pass. Content × 11, prose claims, SERP copy, content tells and route preflight: pass.

**My own render reads found:**
- at 360 px the album chips and Listen sat on the crab (album now hidden, patient left);
- the 320 px keyboard modes pushed Mirror below the fold. In the typing helps at 340 px and below, the patient now shrinks to 64 px, the chart and mirror to 84 px, and the key gaps to 2 px; fr/pt measure 638 against 640.

## Live
__LIVE__
