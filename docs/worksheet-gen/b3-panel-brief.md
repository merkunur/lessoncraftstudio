# nt20-C — native panel brief (one panel per locale: linguist · K-3 educator · SEO, in one head)

You are REBUILDING the last batch of twenty K-3 printable worksheet families — 20 base pages + 100 variation faces = 120 types — for **your language**, not translating the English. The English is the SOURCE you must also AUDIT (every batch's panels found defects in it; list yours in `enAudit`). Read, in this order:

1. `docs/worksheet-gen/b3-designs/README.md` — the 20 families, ids, cross-type rulings (item 1 RULED: "free" may appear in SEO metadata — skill sentences, topicMeta — but never in anything the child or teacher SEES: titles, instructions, the family name in the hub rail; the bank literals are visible too).
2. Per family: the design file `docs/worksheet-gen/b3-designs/<ID>-<key>.md` (§3 the five faces, **§4 the native rebuild plan for your locale — it names what your locale must author, refuse or re-target**, §5 the data shape + rules), then the two build records `_work/<ID>-build.md` and `_work/<ID>-faces.md` (the measured deviations, the per-locale refusals ALREADY visible, and the width/length caps the real fonts impose — e.g. es `sorprendido` = 100 px at 18 → `checkin.labelPx: 17`; fi K-321 needs `laneGlyphH`; pt `resto` refused at d1).
3. The rendered EN pages — `scripts/worksheet-gen/out/dev/<ID>-faces-montage.png` (five faces side by side per family) and `out/dev/<id>-<theme|null>-d2-en.png` — LOOK at each family's pages before writing a string.
4. The EN bank you are rebuilding: `scripts/worksheet-gen/data/b3/<bank>.js` — its `en` block IS the shape; its header comments + the gate `qa/verify-b3-<key>.js` (`validateBank` / `checkBank`) are the rules. Bank names = the family key except `ordinal-numbers → ordinals` and `read-and-do → instructions`.
5. The validator you must pass: `scripts/worksheet-gen/tools/validate-b3-draft.js` (its header lists every rule; it also BUILDS all 120 types against your blocks and refuses an undeclared refusal).
6. `docs/worksheet-gen/b3-designs/_records/en-instruction-window.txt` — per type, the instruction length that lets your instruction itself carry the SEO description (informational; a longer one still ships via the skill sentence).

## What you deliver — ONE file: `scripts/worksheet-gen/i18n/.draft-b3-<loc>.json`

```jsonc
{
  "locale": "de",
  "types":     { "K-317": { "title": "…", "instruction": "…" }, … every id of the 120 you SHIP (omit a refused id) … },
  "families":  { "letter-of-the-week": { "slug": "buchstabe-der-woche", "name": "Buchstabe der Woche" }, … 20 keys … },
  "skills":    { "letter-of-the-week": { "full": "60-180 chars", "short": "15-90 chars" }, … 20 … },
  "topicMeta": { "letter-of-the-week": "≥ 50 chars — the hub-card meta description", … 20 … },
  "banks":     { "letter-of-the-week": { …your locale's block, the EXACT shape of the en block… }, "sound-boxes": {…}, "feelings": {…},
                 "ordinals": {…}, "days-and-months": {…}, "seasons": {…}, "all-about-me": {…}, "picture-word-cards": {…},
                 "syllable-split": {…}, "syllable-reading": {…}, "opposites": {…}, "instructions": {…}, "rhyming-words": {…},
                 "hundreds-chart-puzzles": {…}, "spelling-rules": {…}, "compound-words": {…}, "verb-forms": {…},
                 "animal-fact-file": {…}, "logic-puzzles": {…}, "division-with-remainder": {…} },
  "refusals":  { "G1-329": "why this face cannot ship in this locale (≥ 12 chars)", … },
  "strandNames": { "Language": "…" },          // optional; only rows strand-names.ts lacks for your locale
  "enAudit":   [ "defects you found in the EN source, one per line" ]
}
```
The 120 ids: the 20 bases (README) + the 100 faces in `docs/worksheet-gen/b3-designs/_records/b3var-id-allocation.json` (id → family → face number; the face's title/mode is in the family's rows module `scripts/worksheet-gen/tools/b3var-rows/<key>.js`).

## Load-bearing rules (each one cost a defect in an earlier batch — do not re-learn them)
- **Titles = the GENRE NAME a teacher in your country types into Google** (Silbenbögen, mots composés, tabuada…), ≤ 70 chars, never your language's worksheet-word (Arbeitsblatt / feuille / ficha / werkblad / arbetsblad / arbejdsark / arbeidsark / tehtävä… — the engine appends it), never a free-claim, unique within the grade band against ALL existing titles (the validator checks). A face title must name what CHANGES on that face, not restate the family.
- **Instructions ≤ 150 chars, end in a mark, address the child**, and must fit the sheet's chrome: the worst legal chrome measured by the builders is 733 / 710 / 700 px body (a 3-line title, a 3-line instruction, a 4-line fi title) and 677 with both — a 4-line fi title + 3-line instruction overflows several G1 faces by ~15 px (records list which). **fi: keep titles to ≤ 3 lines** (≈ ≤ 44 chars) on those families.
- **Slugs** ASCII-kebab, folded (da ø→oe å→aa æ→ae · no ø→o · sv/fi ä→a ö→o · es ñ→n · de ä→ae ö→oe ü→ue ß→ss), unique across the locale's ~95 existing families (the validator checks the taxonomy).
- **Banks substitute stored literals only — the code never inflects.** Every printed word on a page is a literal from your block (or the vocab's stored singular/plural). Where the design needs a case/definite form (sv/da/no `def`, de `dat`, fi `part`/`nom`/`ade`, es/pt/it `notationF` ordinals, fr elision) the block carries the table for EVERY noun of the wave themes the family fans over; a missing table = the family refuses at build (the validator will tell you which face).
- **`{U}` / `{L}` / `{UNIT}` are unit tokens** (the letter of the week, the syllable unit, the animal, the spelling rule); `{name}` repeats — never a pronoun. Frames carry articles/prepositions INSIDE the text.
- **Boundary-printing syllable faces use only TeX-agreed entries** of your locale's approved-words file (the README ruling); the grapheme `chunks` layer exists only in de/nl/sv/no. The syllable/rhyme/sound banks are the biggest authoring items: use `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<loc>.json` as the source, never invent a split.
- **Refuse, never pad.** If a face's floor cannot be met in your language (≥ 8 rhyme classes, ≥ 6 pictured pairs, a plural-changing spelling rule, a productive prefix set, a pictured 4-verb core…), DECLARE it under `refusals` with the reason and omit its `types` entry. The design's §7 hub table already expects several refusals per locale; the validator's build probe lists the ones your block produces — declare each or fix the block. Never lower a floor in the block to make a face ship.
- **Open every picture the bank pins** (`pic: {theme, noun}`): filenames lie (plum = an apple, pelican = a stork, firefly = a housefly — all found this batch). `data/b3/animal-facts.json` is fixed data (K-2 honest values) — do not edit it; your `animal-fact-file` block carries names, labels, frames, def/nom forms.
- **Length budgets are in the records**: the builders measured every pill, lane and column in the real fonts — respect the caps they print (K-locale sort words ≤ 6 glyphs, rhyme answers ≤ 7, compound wholes ≤ 12/13/14 per face, fact-file labels ≤ 22, checkin labels 96 px…). A block value over a cap refuses at build.
- **Metadata vs visible.** `skills.*` and `topicMeta.*` are SEO metadata (may say "free printable" if that is what your market searches); `types.*.title/instruction`, `families.*.name` and every bank literal are visible copy (never).
- **Write the JSON with the Write tool** (clean accents, no soft hyphens U+00AD), run `node scripts/worksheet-gen/tools/validate-b3-draft.js <loc>` yourself and fix until it prints `0 error(s)`. Iterate: the probe names the face and the refusal text.

## Self-check before you finish
- Every family: read its design §4 for YOUR locale again — did you author every table it names, and refuse what it says to refuse?
- Every title: would a teacher in your country type this into Google? Is it distinct from its siblings' titles within the band?
- Every bank literal: is it what a 5–8-year-old in your country reads at school, in the register of your national curriculum (§A.13.49 framework names, never a US calque)?
- `enAudit` non-empty unless you genuinely found nothing (say so explicitly).
- `node tools/validate-b3-draft.js <loc>` → `0 error(s)`.
