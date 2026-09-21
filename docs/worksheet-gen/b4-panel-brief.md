# nt10-D — native panel brief (one panel per locale: linguist · K-3 educator · SEO, in one head)

You are REBUILDING the LAST batch of ten K-3 printable worksheet families — 10 base pages + 50 variation faces = 60 types — for **your language**, not translating the English. The English is the SOURCE you must also AUDIT (every batch's panels found defects in it; list yours in `enAudit`). Read, in this order:

1. `docs/worksheet-gen/b4-designs/README.md` — the 10 families, ids, cross-type rulings (item 1 RULED: "free" may appear in SEO metadata — skill sentences, topicMeta — but never in anything the child or teacher SEES: titles, instructions, the family name in the hub rail; the bank literals are visible too).
2. Per family: the design file `docs/worksheet-gen/b4-designs/<ID>-<key>.md` (§3 the five faces, **§4 the native rebuild plan for your locale — it names what your locale must author, refuse or re-target**, §5 the data shape + rules), then the two build records `_work/<ID>-build.md` and `_work/<ID>-faces.md` (the measured deviations, the per-locale refusals ALREADY visible, and the width/length caps the real fonts impose — e.g. pt `segunda-feira` = 114 px needs short `diaryDays`/`forecastDays` forms; the F1 five-senses pills ≤ 123 px; letter boxes are sized to YOUR longest bank word; the pronouns name rule is a FLOOR (fr/es/pt 13 names, fi 16)).
3. The rendered EN pages — `scripts/worksheet-gen/out/dev/<ID>-faces-montage.png` (five faces side by side per family) and `out/dev/<id>-<theme|null>-d2-en.png` — LOOK at each family's pages before writing a string.
4. The EN bank you are rebuilding: `scripts/worksheet-gen/data/b4/<bank>.js` — its `en` block IS the shape; its header comments + the gate `qa/verify-b4-<key>.js` (`validateBank` / `checkBank`) are the rules. Bank names = the family key exactly (`data/b4/<key>.js`; `weather-symbols`, not `weather`). Fixed data you must NOT edit: `data/b4/body-facts.json`, `data/b4/tangram-figures.js`, `data/b4/weather-symbols-global.json`, `data/b4/recycling.json` (items) — your block carries the locale literals only. ⚠ `question-words` READS the `pronouns` bank (portraits + names): author `pronouns` first and keep both consistent.
5. The validator you must pass: `scripts/worksheet-gen/tools/validate-b4-draft.js` (its header lists every rule; it also BUILDS all 60 types against your blocks and refuses an undeclared refusal).
6. `docs/worksheet-gen/b4-designs/_records/instruction-window.en.txt` — per type, the instruction length that lets your instruction itself carry the SEO description (informational; a longer one still ships via the skill sentence).

## What you deliver — ONE file: `scripts/worksheet-gen/i18n/.draft-b4-<loc>.json`

```jsonc
{
  "locale": "de",
  "types":     { "K-353": { "title": "…", "instruction": "…" }, … every id of the 60 you SHIP (omit a refused id) … },
  "families":  { "tangram": { "slug": "tangram", "name": "Tangram" }, … 10 keys … },
  "skills":    { "tangram": { "full": "60-180 chars", "short": "15-90 chars" }, … 10 … },
  "topicMeta": { "tangram": "≥ 50 chars — the hub-card meta description", … 10 … },
  "banks":     { "tangram": { …your locale's block, the EXACT shape of the en block… }, "human-body": {…}, "five-senses": {…},
                 "weather-symbols": {…}, "recycling": {…}, "cloze": {…}, "odd-and-even": {…}, "pronouns": {…},
                 "question-words": {…}, "rounding": {…} },
  "refusals":  { "K-367": "why this face cannot ship in this locale (≥ 12 chars)", … },
  "strandNames": { "Language": "…" },          // optional; only rows strand-names.ts lacks for your locale (the Science row exists ×11)
  "enAudit":   [ "defects you found in the EN source, one per line" ]
}
```
The 60 ids: the 10 bases (README) + the 50 faces in `docs/worksheet-gen/b4-designs/_records/b4var-id-allocation.json` (id → family → face number; the face's title/mode is in the family's rows module `scripts/worksheet-gen/tools/b4var-rows/<key>.js`).

## Load-bearing rules (each one cost a defect in an earlier batch — do not re-learn them)
- **Titles = the GENRE NAME a teacher in your country types into Google** (Silbenbögen, mots composés, tabuada…), ≤ 70 chars, never your language's worksheet-word (Arbeitsblatt / feuille / ficha / werkblad / arbetsblad / arbejdsark / arbeidsark / tehtävä… — the engine appends it), never a free-claim, unique within the grade band against ALL existing titles (the validator checks). A face title must name what CHANGES on that face, not restate the family.
- **Instructions ≤ 150 chars, end in a mark, address the child**, and must fit the sheet's chrome: the worst legal chrome measured by the builders is 733 / 710 / 700 px body (a 3-line title, a 3-line instruction, a 4-line fi title) and 677 with both — a 4-line fi title + 3-line instruction overflows several G1 faces by ~15 px (records list which). **fi: keep titles to ≤ 3 lines** (≈ ≤ 44 chars) on those families.
- **Slugs** ASCII-kebab, folded (da ø→oe å→aa æ→ae · no ø→o · sv/fi ä→a ö→o · es ñ→n · de ä→ae ö→oe ü→ue ß→ss), unique across the locale's ~115 existing families (the validator checks the taxonomy).
- **Banks substitute stored literals only — the code never inflects.** Every printed word on a page is a literal from your block (or the vocab's stored singular/plural). Where the design needs a case/definite form (sv/da/no `def`, de `dat`, fi `part`/`nom`/`ade`, es/pt/it `notationF` ordinals, fr elision) the block carries the table for EVERY noun of the wave themes the family fans over; a missing table = the family refuses at build (the validator will tell you which face).
- **`{U}` / `{L}` / `{UNIT}` are unit tokens** (the letter of the week, the syllable unit, the animal, the spelling rule); `{name}` repeats — never a pronoun. Frames carry articles/prepositions INSIDE the text.
- **The heavy authoring items this batch** are the cloze frames + fits (answers are READ from `objForms` — your frames must fit the stored singular/plural; de nom/acc/dat articles are a table), the pronouns tables (names with gender, frames, the possessive block whose SHAPE decides the F3 class — es `su` and fi `hänen` are REFUSED by design), the question-words frames + chips (`chipWidths`/`bankWidths` are MEASURED, not estimated), the five-senses verbs + starters (the "I can …" frame fits only en/nl/da/no — de/fr/es/pt/it author the bare present), the recycling bins/materials (F4 colour-the-bins needs your NATIONAL bin-colour tokens or is refused: it/nl/sv/da/no contingent, en refused), the odd-and-even literals (never doubles / chart / ten-frame; the K-016 chip literals are the odd/even signs), the rounding literals (never a number line; `≈`/`→` are SVG, never text), weather nouns + day names (short forms where `segunda-feira`-class widths overflow), human-body labels (fr `eye`, es/pt/it `toe`, it `ginocchio`, fi 9-letter words refuse per WORD on F3), tangram = 12 strings only (wordless).
- **Refuse, never pad.** If a face's floor cannot be met in your language (13 names with 7 f + 6 m for the pronouns sort, a same-gender foil per cloze frame, a national bin-colour set, a possessive that changes with the owner…), DECLARE it under `refusals` with the reason and omit its `types` entry. The design's §7 hub table already expects several refusals per locale; the validator's build probe lists the ones your block produces — declare each or fix the block. Never lower a floor in the block to make a face ship.
- **Open every picture the bank pins** (`pic: {theme, noun}` / `fileUri`): filenames lie (plum = an apple, pelican = a stork, `doll` reads as a girl, `neck` is a necklace — the design excluded neck/shoulder/chin/tongue/thumb portraits and the builders enforce it). Fixed data (`body-facts.json`, `tangram-figures.js`, `weather-symbols-global.json`, `recycling.json`) is never edited.
- **Length budgets are in the records**: the builders measured every pill, lane and column in the real fonts — respect the caps they print (pronouns sort names ≤ 6 graphemes, cloze letter-box words ≤ 11 graphemes, question-words sort tiles ≤ 112 px estimated, five-senses pills ≤ 123 px, weather day pills 112/99 px, human-body F3 labels ≤ 8 letters…). A block value over a cap refuses at build.
- **Metadata vs visible.** `skills.*` and `topicMeta.*` are SEO metadata (may say "free printable" if that is what your market searches); `types.*.title/instruction`, `families.*.name` and every bank literal are visible copy (never).
- **Write the JSON with the Write tool** (clean accents, no soft hyphens U+00AD), run `node scripts/worksheet-gen/tools/validate-b4-draft.js <loc>` yourself and fix until it prints `0 error(s)`. Iterate: the probe names the face and the refusal text.

## Self-check before you finish
- Every family: read its design §4 for YOUR locale again — did you author every table it names, and refuse what it says to refuse?
- Every title: would a teacher in your country type this into Google? Is it distinct from its siblings' titles within the band?
- Every bank literal: is it what a 5–8-year-old in your country reads at school, in the register of your national curriculum (§A.13.49 framework names, never a US calque)?
- `enAudit` non-empty unless you genuinely found nothing (say so explicitly).
- `node tools/validate-b4-draft.js <loc>` → `0 error(s)`.
- **The titles that list chips list EXACTLY the chips the d2 page prints** (five-senses "Which One Does Not Belong?", pronouns "He, She or They", question-words "Who, What or Where", weather "Cold, Warm or Hot", odd-and-even "Under 100") — the base of question-words was sent back for naming a chip the page did not ask. And `K-359` needs a SHORTER title in every locale (its EN title leaves no description window — `_records/instruction-window.en.txt`).
