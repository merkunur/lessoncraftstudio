# G2-318 `animal-fact-file` : editor-critic record (2026-09-14)

Inputs: `_work/G2-318-pedagogy.md` + `_work/G2-318-design.md`; brief, substrate, README (rulings, open items, body 722, `unitAxis`), `_PANEL-FINDINGS.md` §12 + §17, G1-308 + G2-317 FINALs. Verified in the repo: `templates/components-b2.js` (`rulingBlock:58`, `wordBank:210`, `pillChoice:226`), `templates/components.js`, `page/page.css` (`.ws-page:16`, `.ws-icon:178`, `.ws-lane:401`, `.ws-nchip:412`, `.ws-pill:422`, `.ws-blankbox:445`), `primitives/trace-path.js` (`schoolLines:241`, `writingRow:681`), `primitives/_tokens.js:70`, `types/g2/G2-278-write-about-the-picture.js` (`:94` starter rule), `data/b2/labels.js pictureWriting`, the 5 science banks, `image-cache/resolve.js`, `frontend/config/topics-taxonomy.json`, `frontend/lib/seo/strand-names.ts`, `scripts/seo-landing/gen-b2var-landings.js:112-124`. Scratch: `g2318-measure.js` (the design's, re-run) + `g2318-critic.js` (mine).

## 1 Contradictions + resolutions

| # | pedagogy | design | ruling | why |
|---|---|---|---|---|
| 1 | 6 faces: blank · tick · word bank · three sentences · compare · who am I | blank · tick · compare · who am I · fact sentences · fact-chip sort | pedagogy's set; **chip sort REJECTED** | chip sort prints the six true facts with no selection; 4 of 6 field assignments are trivial (numeral, ja/nein); "Fakten zuordnen" is a weaker head than "mit Wortspeicher"; word bank has distractors, so it is a selection + spelling move |
| 2 | theme ON, 11 animal themes | themeless via `lib/b3-picture-index.js` | **theme ON** (task + pedagogy) | a unit must be pictured in the wave's theme; `exemplars` therefore PER THEME (new; neither file had it) |
| 3 | stack 698: pic 230, banner 56, rows 52, `.ws-blankbox` 40, `rulingBlock` 2 rows, drawBox 120 | stack 713: hero 244, banner 76, drawBox 156, rows minmax(60) glyphH 28, fact lane 60 | **design geometry** | measured in the shell's fonts; lanes glyphH 28 > 24; the 9-px slack was re-checked against the 722 floor |
| 4 | labels <= 18 chars | label column 160, 17 px, 2-line wrap, cap 28 chars | **design** | `Kann es schwimmen?` is 18 chars and 158 px (m): the char cap cannot see width; render gate asserts <= 2 lines |
| 5 | F2 = 3 choices per row, correct index rotates | every option of the field on every row in fixed order (5-6 chips) | **3 per row** | readable at G2; 6 covering options (spines added) would not fit 495 at 16 px; index rotation is asserted |
| 6 | class 6 (+ amphibian), covering 6 (spines, smooth skin) | class 5, covering 5 (fur feathers scales shell skin) | class **5**, covering **6** (+ spines) | the classification bank has mammals/birds/reptiles only and omits sea mammals on purpose; frog etc. = `class:null`; a hedgehog under `fur` is wrong for a child, so `spines` is an option |
| 7 | F4 = printed compact file + 3 frames + 1 free line on school lines | hero + word bank (3 answers + 3 distractors) + gap frames | **pedagogy move on the design's top block** + `rulingBlock` starters (the G2-278 machinery) | W.2.2 is composing from a source; a gap-fill with a bank is F3's move again |
| 8 | F5 prints two files, 2 + 2 prose lanes, pair rule over 7 fields | two WRITTEN mini files + `sameDiffRow` (4 cells) + one lane | **printed files (4 fields) + 2x2 chip grid + 2 + 2 lanes**; pair shares >= 2 and differs >= 2 of the 4 | a 4-cell single row is too narrow for de (`gleich/verschieden` 198 > 168, m); 6 printed rows + chips + 4 lanes = ~760 > 722, so 4 fields |
| 9 | F6 = 2 puzzles x 4 candidate pictures, first-person clue sentences, circle + write | 6-picture named bank + 3 cards of bare chips, exact-one solver | **design geometry, pedagogy's sentence clues** | sentences are the riddle genre and need no `def`; the bank supplies the name to copy; the solver is exhaustive |
| 10 | `def` gates F4 / F5 / F6 in sv/da/no | `subj` gates F4 only | **F4 only** | F5 prints vocab singulars, F6 is first person: no animal noun in a frame |
| 11 | d3 = 7th field `special` (free text) | d3 = `special` block | **d3 = swim as the 7th row**; `special` dropped | a free-text field cannot sit in a verifiable table |
| 12 | fact lane starter "The hedgehog can" | same | kept, with a fallback caption when `def` is missing | never a bare vocab word in a sentence |
| 13 | `unit:'blank'` (design) | not in pedagogy | kept as a wave-pinned UNIT, not a face, not counted in the hub expectation | zero code beyond `src:null`; the de HARD "Vorlage" head |

## 2 Claims removed as unverified or wrong

- Pedagogy "52 bank keys" (from 7 banks): the five banks the type joins hold **49**, 45 pictured (m). The pets/farm-vs-wild banks add nothing to the 7 fields.
- Design "chips 16 px = x0.87 of 18 px, de class row 414": re-measured at 16 px, padding 4 12: de 421-465, fi 434-441 for FIVE chips (m); the default `.ws-pill` padding 6 24 overflows (541). Stated with the padding.
- Design "F6 bank ~100 high": **106** for short names, **202** when three names are >= 12 letters (m); design's 718 stack becomes 724 and was re-budgeted to 712 (card 190).
- Pedagogy "`Fleischfresser` too wide for the chip row": three diet chips fit the lane even at 18 px (410 <= 495, m); the shorter literal `Fleisch` is required by the 180-px F5 value cell and the bank, not the chip row.
- Pedagogy "F5/F6 need `def`": removed (see #10).
- Design "d1 stack 594 / d3 614" kept; pedagogy's "single column 878" kept only as poison P10.
- README's "722 = 3-line title + 3-line instruction": a 156-char instruction renders **2 lines** (60 px) and the body is 722 with the 3-line title (m). The floor stands; the reason is a 2-line instruction.

## 3 Numbers re-measured (which won)

| number | pedagogy | design | measured | in the file |
|---|---|---|---|---|
| pictured animals | 182-183 | (not stated) | **183** | 183 |
| animals at >= 3 / 4 / 5 core facts | 11 / (n/a) / 1 | rabbit only in all five | **11 / 5 / 1** | both |
| per-theme >= 3 | animals 9 farm 5 pets 5 forest 5 zoo 3 birds 2 reptiles 1 ocean 1 insects 0 dinos 0 | | same (birds 2 = 2 too) | pedagogy |
| body under 3-line title | 722 (README) | 742 (1-line instruction) | 742 / **722** (2-line instruction) | 722 floor |
| label 17 px widths | | 132 / 120 / 122 / 109 / 100 / 158 | same | design |
| name Baloo 34 | | 215 / 210 / 204 | same | design |
| 5-chip rows 16 px pad 4 12 | | ~414 | 421-465 | measured |
| same/different pairs 16 px | | (not measured) | max 198 (de), min 122 (no) | 2x2 grid |
| F6 bank | | ~100 | 106 / 202 | one-row gate |
| clue block 5 lines 16 px in 300 | | | 108 | reserve 166 |
| F5 value widths 16 px | | | <= 77 (`glatte Haut`) | 120px 1fr grid |

## 4 OPEN items (numbered)

1. **The curated 7-field table is a prerequisite.** Banks yield 0 animals at 7/7 (legs + swim unbanked). Who authors the ~36-40 rows in the build session (the pedagogue once, locale-neutral), and who fact-checks (10 panels' educators, their exemplar theme)? Until then the type ships 1 face.
2. **Strand rows:** `Writing` lacks fr it nl sv da no fi; `Reading: Informational Text` lacks all but en de (m). Nine panels add both rows additively to `STRAND_NAMES`.
3. **sv `Djurgrupp`:** the bare `grupp` token is banned; the compound is the Lgr22 term. The sv panel confirms or replaces it; the validator's `allowCompound` list records the decision.
4. **sv/da/no `def` + fi `nom`/`ade`** for the exemplar (1 animal per locale in the wave); a full-fan future needs ~40 x 4 literals, panel-read (`bana/banan` class).
5. **`unitAxis` is ruled, not built** (README); `exemplars[theme]` is the fallback and must be byte-identical (`b3-baseline --check`).
6. **Wave theme:** recommended `forest creatures` x11; the emitter confirms `themeOverrides` and that its 7/7 pool is >= 4 after the table lands (else F6, then F5, drop for that theme).
7. **Hub subject `science` at G2:** the disc's three keys are all `5-7`; the operator may still prefer `letters` (a rail-placement call, no doctrine review either way).
8. **`unit:''` on F5/F6 coordinates:** the emitter confirms the landing composer keeps an empty unit and the hub gate counts faces, not landings.
9. **F5 d3 (6 printed rows + 3 + 3 lanes)** is *est.* ~760 > 722: the engineer re-budgets or keeps 4 rows at d3.
10. **`tools/gate-variation-distinct.js`** is b2-bound; needs the b3 wave/rows list (siblings' item).
11. **Bat `fly`, penguin `fly`, turtle `habitat`:** the table author rules per row; the file lists turtle habitat and dolphin/whale class as `null`, nothing else pre-decided.
12. **Print check** (mono laser + inkjet, HB pencil on the 28-px lanes and the 16-px chips): *est.*, engineer.

## 5 Verdict (a critical second-grade teacher)

The base is a real Steckbrief a class can fill after a book or a talk, with lanes a seven-year-old can actually write on and a picture big enough to draw from; the tick and mystery pages are honestly checkable and the sentence page teaches the genre rather than copying. The whole type stands or falls on a fact table nobody has written yet: until it exists this is one blank page with a nice picture. Ship the base now, hold the five faces until the table is reviewed, and keep the answer animal out of every riddle title.
