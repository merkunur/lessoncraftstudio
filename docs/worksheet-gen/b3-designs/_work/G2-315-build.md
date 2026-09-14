# G2-315 `spelling-rules` — BASE build record (2026-09-14)

Built from `G2-315-spelling-rules.md` §2 + §5 under `_BUILD-BRIEF.md`, the README cross-type rulings (`unitAxis`, themeless picture index, body 722) and `_SUBSTRATE.md`. Nothing shared was edited; nothing committed (`data/` is gitignored — the reviewer force-adds the bank).

## Files written (all type-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/types/g2/G2-315-spelling-rules.js` | the spec: `themeAxis:{applicable:false}`, `unitAxis:{applicable:true, units:(loc)=>Object.keys(bank.rules), exemplar:(loc)=>bank.exemplar, tokens}` (tokens read `rule.head`, so `{UNIT}` → "Magic e"), `difficulty{1,2,3}` as a CONFIG (`cards cols rows pic cellMax minLetters maxLetters models gapCells mode minPool`), `eligible(loc, ruleId, opts)` PURE + exported for the gate, `cellFor`, `build()` → `_buildWith(bank, …)` (the gate's poison seam), `verify(page)` |
| `scripts/worksheet-gen/templates/components-b3/spelling-rules.js` | NEW `gapWord({word, gaps[], gapCells, cell, fontPx, mode:'gap'\|'full'\|'scaffold'})` + `ruleBox({chips, models, w, h})` — exactly the two names the base consumes; `proofLane` / `pictureBank` / `ruleBins` are Phase-2 faces and are NOT exported (K-317 precedent). Namespace merge verified: no duplicate export |
| `scripts/worksheet-gen/data/b3/spelling-rules.js` | EN bank (gitignored): `en = {head, exemplar:'magic-e', capital:'lower', pool:'approved-full', exclude:{re:'saurus$'}, rules:{'magic-e','c-k-ck','ee-ea','ai-ay','floss'}, strings:{'G2-315':{title,instruction}}}` |
| `scripts/worksheet-gen/qa/verify-b3-spelling-rules.js` | the gate (A bank validator + pool record · B real-pipeline renders per rule/level + seed sweep · C 722-body chrome · D 26 poisons); exports `validateBank`, `frameWith`, `poolWords` (the spelling-rules part of the still-TBD `tools/validate-b3-draft.js`) |
| `docs/worksheet-gen/b3-designs/_work/G2-315-build.md` | this record |

`node i18n/build-en.js` → `build-en: 494 types -> strings.en.json (title lint clean)`; the committed `strings.en.json` was then restored with `git checkout --`. Title `Spelling Rules: {UNIT}` (24 chars resolved, unique in G2, no worksheet word); instruction 106 chars with an end mark.

## Bank (measured with node against the real files; every picture opened)
Cross-theme en pool (every colour-pictured vocab key with a letters-only en singular, distinct by word) = **876 (796 approved)** — the design's (m) numbers exactly. The critic's regexes reproduce its hit counts (magic e 80 / c-k-ck 188 / ee-ea 66 / ai-ay 35 / floss 19). The regex DRAFTED each list; every word was then confirmed by ear, because the design says the regex drafts and "the panel confirms word by word" — for EN that panel is this build:

| rule (chip) | regex-usable ≤12 (design) | items + models authored | dropped by ear / by picture |
|---|---|---|---|
| **magic-e** `a_e i_e o_e u_e` (exemplar) | 80 (77) | **48 + 3** (cake · kite · rope) | glove dove lettuce sausage garage necklace cabbage package bandage medicine detective chocolate pomegranate jasmine vulture columbine sphere submarine clementine nectarine (the e does not make the vowel say its name); athlete centipede (`e_e` is not a taught chip → `cands` = ae/ie/oe/ue only); cape (frame collision with `cap`, design §4); rice (picture = a bag), white (a paint drop), millipede (its picture is the centipede's), bonfire (its picture is the campfire's — both landed on one d3 page) |
| **c-k-ck** `c k ck` | 172 (167) | **84 + 3** (cat · kite · duck) | silent-k words (knife knee knitting); every word with a second c/k letter (clock chicken cricket raccoon broccoli chipmunk black stocking… — a printed second c/k hands over the answer); dinosaurs (`exclude.re:'saurus$'`); carpet (reads as rug), pink (paint drop), cold (a snowman), falcon (reads as hawk); hawk re-pinned to `forest creatures/hawk` (a raptor) |
| **ee-ea** `ee ea` | 65 (64) | **40 + 3** (bee · leaf · sheep) | bread head forehead feather sweater sweatpants sweatshirt heart bear earth earthworm pear headband gingerbread azalea hydrangea pineapple (ea ≠ long e); green (paint drop), tree (`christmas/tree` = the decorated Christmas tree — the recorded trap; no other tree picture exists) |
| **ai-ay** `ai ay` | 35 | **21 + 3** (rain · ray · snail) | curtains mountain (ai = schwa / short i), kayak papaya (ay = long i), crayon/crayons (ay before a vowel; plural), gray (paint drop), subway (reads as train), rainy (same picture as rain), nail re-pinned to `tools/nail` (body-parts/nail is a finger) |
| **floss** `ff ll ss zz` | 19 | **15 + 3** (ball · dress · grass) | hornbill (reads as toucan); glass re-pinned to `kitchen tools/glass` (a tumbler, not a wine glass) |

Every item: `word` = the vocab display word of its key, joins `approved-words-en.json` by key, letters only, ≤ 12 letters, the rule grapheme exactly once, frame UNIQUE against the whole 876-word pool for every candidate (the two-gap frame test distributes the candidate across the boxes — `knife`/`knee`, `globe`/`glue`, `tape`/`tie` are NOT collisions, `cape`/`cap` is), picture pinned to one colour (theme, noun) that is a colour-index candidate; `gaps` and `g` are authored literals; 6 foils per rule (cat dog hat cup fish sun / bed pig bus — no candidate letters); `side` = rule/contrast by `pair` for the two-way rules (F2 data authored now); `refuse:{choice,bins}` recorded for ee-ea + floss with the reason. Contact sheets: `scripts/worksheet-gen/out/dev/G2-315-pictures-sheet-{1,2,3,4}.png` (267 pictures) + `G2-315-alts-sheet.png` (the five re-pins).

**Pool per level** (the gate's record; floor = max(cards, minPool 10)):
```
magic-e    d1: 38  d2: 48  d3: 12
c-k-ck     d1: 84  d2: 84  d3: 35
ee-ea      d1: 35  d2: 40  d3: 29
ai-ay      d1: 19  d2: 21  d3: 15
floss      d1: 14  d2: 15  d3:  8✗   ← REFUSED (≥ 6 letters + the 3-cell box: 8 < 10), recorded, never filled
```

## Gate
```
node scripts/worksheet-gen/qa/verify-b3-spelling-rules.js
G2-315 gate: 418 assertions, 0 failed, poisons all killed, 33s → PASS
   (--quick: 237 assertions, 0 failed, poisons all killed, 24s → PASS)
```
Section B (real pipeline `render/render-instance.js`, `unit` passed as the wave would): exemplar d1-3 + c-k-ck/ee-ea/ai-ay d1-3 + floss d1-2 + 2 seed epochs — lints 0, verify 0 on every render; measured floors picture ≥ 120 / 79 / 80 (G2 floor 36), chips 44, model pictures 36, cells 36 / 29-32 / 24-26 (font ≥ 22), body 799 px at the one-line title + two-line instruction. Baloo 2 700 advance in the real render: widest glyph `W` = 0.85·size (`W@34 = 28.9` vs cell−2 = 34 · `W@30 = 25.5` vs 30 · `W@27 = 22.9` vs 27 · `W@24 = 20.4` vs 24 · `W@22 = 18.7` vs 22 — every cell clears with ≥ 3.3 px; the widest printed letter on any sheet reached 84 % of cell−2); every letter's ink box inside its cell; every stamped word + gap + cell re-derived node-side through `eligible()` and the bank literal; the rule-box chips === `rule.chip`, models === the bank's first N, the title carries `rule.head`. Section C (3-line title + 3-line instruction): body **710 px**, pictures shrink to 107 / 57 / 63, nothing clipped.

**Poisons 26/26 killed** (each judged on ITS message; WRONG REASON and SILENT both count as survivors; the correct bank/page is the control): P1 `cap` with `u` in cands while `cup` is a pool word → "frame not unique" · P2 `gate` gapped at cell 0 → "gap not at the rule grapheme" (+ P2b `cap` gapped at the vowel on a single-gap rule) · P3 `basket` with plural "kittens" under a plural proof → "proof form does not derive" (control: the regular vocab plurals pass) · P4 model `cake` also in items → "model is an item" · P5 foil `duck` under c/k/ck → "foil carries the rule grapheme" · **P6 N/A** (bins line count is a Face-4 case; no bins on the base) · P7 `ankylosaurus` → "excluded family" · P8 a gap box one cell wide at the fixed-width level (d3) → "gap width leaks the answer" · P9 `gate` with one gap `1:3` → "magic e needs two gaps"; plus a word that is not the vocab word · a BW theme pinned · a chip outside cands (bank + DOM) · a gap letter printed inside its box · a model word stamped onto a card · a wrong card count · a duplicate word · a coral letter on a card · a text node printing a card word · a gap moved off the rule grapheme · floss d3 must REFUSE (the real 8 < 10 case) · an unauthored unit must REFUSE · a locale without a bank block must REFUSE · one model under a 3-model config must REFUSE · a picture that is not a colour-index candidate must REFUSE · a 30 px `W` (25.5) in a 24 cell.

## Renders for the reviewer (`scripts/worksheet-gen/out/dev/`; I read every one)
`render/one.js`: `G2-315-null-d1-en.png` · `G2-315-null-d2-en.png` · `G2-315-null-d3-en.png` (magic e) · `G2-315-null-d2-en-uc-k-ck.png` · `G2-315-null-d2-en-uee-ea.png` · `G2-315-null-d2-en-uai-ay.png` · `G2-315-null-d2-en-ufloss.png` (the unit arg). Gate renders: `G2-315-gate-exemplar-d{1,2,3}-en.png`, `G2-315-gate-<rule>-d<N>-en.png`, `G2-315-gate-exemplar-d2-en-e{2,3}.png`, the 722-body test `G2-315-gate-longchrome-d{1,2,3}-en.png`, poison renders `G2-315-gate-poison-d{1,3}-en.png`.

What I saw and fixed: (1) the first d3 page carried **bonfire and campfire side by side with the same drawing** → bonfire dropped from the bank; (2) at the design's 64 px the d2/d3 cards were visibly sparse under the real 799 px body → pictures raised with flex shrink (deviation 4); (3) `athlete` rendered `athl[ ]t[ ]` with no `e_e` chip to read from → the e_e words dropped and `cands` narrowed to the four taught chips.

## Deviations from the design file (each with the measured reason)
1. **`unitAxis`, not `ruleAxis`** (README ruling); `bank.rules` is an **ordered object keyed by rule id** (the design sketches an array) so `Object.keys(bank.rules)` is the unit order, as the build brief reads it. `render/one.js G2-315 null 2 en c-k-ck` renders the c/k/ck page; the title token resolves to `rule.head`.
2. **Word-by-word confirmation shrank every regex pool** (table above): the design quotes "magic e 77 (76)" as usable-by-regex; 21 of those are words where the final e does not make the vowel say its name (glove, lettuce, garage, medicine, chocolate…) and a magic-e page must not teach them. 48 + 3 honest words remain — well above the 10-item floor and the 8 + 2 the base draws. The same by-ear pass on ee/ea (17 short-ea words), ai/ay (6), c/k/ck (a stricter "the matched grapheme is the word's ONLY c/k letter" rule, so `clock`/`chicken` never print a second c) is recorded in each rule's `note`.
3. **`cands` for magic e = ae/ie/oe/ue** (no `ee`): the classroom chips are a_e i_e o_e u_e; a word whose gap letters are not on a chip (athlete, centipede) is unfair to a seven-year-old, so the two e_e words are out rather than a fifth chip in (5 chips + 3 d1 models = ~700 px > the 655 px box).
4. **Pictures 96/64/64 → 120/88/80, shrinking with the body** (`flex:0 1 auto; min-height:36`). Measured: at the real one-line chrome the body is 799 px (not 760), so a 64 px picture in a 175 px card read as sparse; the raised sizes measure 120 / 79 / 80 there and **107 / 57 / 63 under the 3-line title + 3-line instruction (body 710)** — all ≥ the G2 floor 36, nothing clipped (verify asserts card containment; the gate asserts the floor on every render). The design's stack arithmetic (64 + 6 + 46 = 116 ≤ 120) is the shrunken case, not the ceiling.
5. **Eligibility is bounded by CELLS, not letters, at every level**: `cells = n − Σlen + gaps × gapCells ≤ 12` (cell ≥ 24 ⇔ font ≥ 22). With the design's d3 `gapCells: 3` a 12-letter single-gap word needs 14 cells → cell 21 → font 19 < the 22 floor, and magic e's two 3-cell boxes cap d3 at 8 letters (n + 4 ≤ 12). Consequence: magic-e d3 pool = 12 (6-8 letters), **floss d3 REFUSED** (8 words of ≥ 6 letters < 10). The `maxLetters 12` window stays as written; the cell rule is the binding one.
6. **`minPool: 10` in the resolved config at every level** (validator rule 8, the G1-305 precedent): an 8-card face on an 8-word pool would print the same words under every seed. Guards key on the config (`d.cards`, `d.minPool`, `d.models`, `d.gapCells`), never the level index.
7. **Rule box geometry**: `.ws-scene-banner`'s css `padding:6px` leaves 43 px inside a 60 px box — one px short of the 44 px chip — so the component sets `padding:4px 10px; min-height:60px; margin:0` (height auto) and the model pill `padding:2px 12px 2px 8px` (page.css's 6 px would make the 36 px picture pill 52 px). The grid sits 14 px below via the root's flex gap (the css `margin-bottom:10px` is zeroed).
8. **`gapWord` svg height = cell + 14** (the box is cell + 8 at y 3 → 3 + cell + 8 + 3), letters anchored at `y = (cell+14)/2 + 0.06·size` — G1-305's measured Baloo 2 ink centre, not the design's `cell + 2` (which clips every descender); the gate asserts the ink box of every printed letter inside its cell.
9. **verify() asserts `g ∈ cands`**, not `g === data-lcs-rule` (the design's base clause): on the exemplar page g differs per word (ae / ie / oe / ue). The root stamps the rule id, its regex and `boxes`, so verify re-derives the gap POSITION in the browser (the regex fires exactly once, at the gap; split rules: two one-letter boxes, the second on the final e) — a stamp moved off the grapheme fails without any node-side help.
10. **`exclude:{re, why}` bank field** (the design's P7 "excluded family" needs a home): `saurus$` for en; `eligible()` drops matches, the validator flags them.
11. **P6 is N/A on the base** (a Face-4 bins case) — recorded, not faked; every other listed poison runs and is killed.
12. **F2 `side` stamps are authored now** for the two-way rules (ee = rule / ea = contrast, ai / ay) since the base carries the data; magic e and floss keep `pair: null` (the design refuses their F2/F4).
13. **Extra root stamps** (`data-lcs-re -boxes -cands -cards -models -gapcells -cellmax -minletters -maxletters -pic`) and per-stage `data-lcs-cells`, so verify() re-derives against the resolved config.
14. The d2 `gapCells:'len'` box **does show the grapheme length** (a 2-cell box = `ck`) — the design accepts this at d2 and hides it at d3 (`gapCells: 3`, verified by P8); Face 2's fixed `max(candidate lengths)` rule is Phase 2.

## `tools/b3-baseline.js --check --quick`
```
checked build 2820 + enum 200 in 17s: 11 drifted (0 expected), 0 missing   FAIL
```
**Build section: 0 drift** (2820 hashes; the only 11 drifts are `wave:wave-001..011`, the legacy `types:"all"` enum lines every new spec on disk shifts — the prescribed ignore, K-317/G1-305 precedent).

## Open items (faces / panels / build session)
- Phase 2: `proofLane`, `pictureBank`, `ruleBins` (not exported yet); `letterChips` (K-317-owned, still absent from the namespace); the F2 fixed `gapCells = max(candidate lengths)` rule; en magic-e F2 contrast side = short-vowel CVC words (`pair` is null on the base — the en panel authors it); en F6 y-ies / f-ves rule; `gapWord` already renders `full` (F3) and `scaffold` (F5).
- Panels: exemplar per locale; every item picture OPENED (the sv #35 rule — the en sheet dropped 13 pictures); `plural` + `pluralGap` literals; de `ie` via `chunks`; sv/da/no no definite form; the EN block handed over as a SOURCE TO AUDIT.
- Pipeline: `tools/apply-b3-locale.js` / `validate-b3-draft.js` still TBD (`validateBank` in the gate is the spelling-rules part); `apps['spelling-rules']` + `axes['exercise-type']['spelling-rules']` slug/name × 11 before any wave (`enumerate.js` throws without it); `scripts/verify-hub-type-rows.js` expects 6 rows per locale except sv/no/nl at 5; `strand-names.ts` `Language` row has no da/no entry.
- The seller-era meta lead vs "nothing is free": metadata only; no visible copy here claims free (lint clean).
