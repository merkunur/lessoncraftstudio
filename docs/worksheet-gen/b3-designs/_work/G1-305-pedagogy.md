# G1-305 `syllable-split` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers are MEASURED 2026-09-13 from `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<loc>.json .entries[]` joined to `lib/b2-common.js entriesFor(theme, loc)` on `entry.vocabKey === approved.key`, filtered to `count >= 2`, no space/hyphen in `word`, `word.length <= 13`; unless marked *est.* Scripts: scratchpad `measure.js`, `tex.js`, `pools.js` (read-only).

**Three load-bearing measurements.**
1. **EN boundaries are rule-generated VC/CV and dictionary-wrong on 397 of 607 multi-syllable words** (`notes.tex_disagreed_with_rule`): `ac-orn`, `cam-el`, `kiw-i`, `buc-ket`, `bul-ldoz-er`. The COUNT is right; the BOUNDARY is not. es/pt/it/fi carry a small class of the same defect (`cray-o-nes`, `hie-na`, `pi-pis-trel-lo`; 0-16 per theme, mostly TeX minimum-fragment noise). Rule: a face where the child PRODUCES the split uses the full approved pool (count-verified); a face that PRINTS a boundary (cloze, tiles) uses only entries with `'TeX'` in `sources_agreed` (the "texPool").
2. `policy_managed:false` never occurs in da: the strict pool = the 402 entries where the field is ABSENT (392 are `true`). Strict multi-syllable per theme: animals 9, fruits 5, vehicles 10, toys 8, zoo 7, clothing 10, house 21, supermarket 11, forest 9, ocean 5, body 2.
3. fr final mute-e (last syllable = consonants + `e`, `voi-tu-re`) is 4-27 words per theme; refusing it leaves 10-26 per theme (animals 16, fruits 10, house 26, body 10).

## A. IDENTITY

| field | value |
|---|---|
| family key | `syllable-split` (NEW `apps.syllable-split` {subject `letters`, age `6-8`} + `axes['exercise-type'].syllable-split` slug+name x11; neither exists today, measured; registrar pattern `tools/register-b2-taxonomy.js`) |
| band | G1 in all locales (base + 5 faces); no K face |
| theme axis | `themeAxis:{applicable:true, minNouns:8, excludeBw:true}` checked against the FACE pool; avoid `farm animals` (3-5 multi in sv/da/no, `_SUBSTRATE.md`) |
| CCSS (en) | RF.1.3.e on every face (decode two-syllable words by breaking them into syllables); base adds RF.1.3.d where `vowelDot` is on (every syllable has a vowel) |
| data | approved-words ONLY for split/count; raw vocab only for picture + join key + display case |

All 11 place the WRITTEN split in the G1 band (sv/da oral in förskoleklass/0. kl, written from åk 1 / 1. klasse; no from 2. trinn). Heads from `_PANEL-FINDINGS.md` §3; slugs are proposals.

| loc | native genre head | ASCII slug | level | convention (drawn / written) |
|---|---|---|---|---|
| en | Syllable division (scoop the syllables) | `syllable-division` | grade 1 | arcs ("scoops") under the printed word; rewrite `rab-bit`; B-tier OG niche |
| de | Silbenbögen einzeichnen (+ Silbenkönig) | `silbenboegen` | 1. Klasse | Silbenbögen + a dot under each syllable's vowel king; rewrite `Ka-me-ra` keeps the capital |
| es | Separar en sílabas | `separar-en-silabas` | primer grado | barras `/` on the printed word; guiones in the rewrite `ca-me-llo` |
| pt | Separação de sílabas | `separacao-de-silabas` | 1º ano | barras; hífen `ca-va-lo` (BNCC EF01LP; SERP head says 2º ano, panel may set 2º) |
| fr | Découper les mots en syllabes | `decouper-les-mots-en-syllabes` | CP | arcs (Taoki/Pilotis); syllabes écrites; mute-e refused by default (OQ 4) |
| it | Divisione in sillabe | `divisione-in-sillabe` | classe prima | barre; trattini `ca-val-lo` |
| nl | Woorden in lettergrepen verdelen | `woorden-in-lettergrepen-verdelen` | groep 3 | arcs or streepjes; DATA = LETTERGREPEN (`kat-ten`), NOT Staal klankgroepen (`ka-tten`) (OQ 3) |
| sv | Dela upp ord i stavelser | `dela-upp-ord-i-stavelser` | åk 1 | bågar; the approved split IS the school sound-out convention (`klock-a`, §A.13.57 carve-out) |
| da | Del ordet i stavelser | `del-ordet-i-stavelser` | 1. klasse | buer; strict pool; TeX-accepted splits |
| no | Dele ord i stavelser | `dele-ord-i-stavelser` | 2. trinn | buer; geminates split (`klok-ke`); kj/sj quarantined upstream |
| fi | Tavuta sanat (tavutus) | `tavuta-sanat` | 1. luokka | tavuviivat on the printed word; hyphen rewrite `ka-me-ra` (THE 1. lk staple) |

## B. THE SIX FACES

Layouts on the 703x760 body. Cards = `cardGrid` 2x4 (card ~335x170) or full-width rows (6 x 118 + 5 x 8 = 748). Picture 64-80 px; printed word Nunito 800, 26-28 px (12 letters ~204 px; engineer must measure the fit at 13); rulings = `writingRow({w, h:64, glyphH:30, xHeight:true})` (G1-244 geometry); boxes = `letterBoxes` style widened per syllable; tiles = `wordTiles` (`components-b2.js`). New in `templates/components-b3.js`: `arcLane({w, h:30, mark:'arc'|'bar'})` (an EMPTY creamDeep strip with a 1.5 px grid baseline; the child draws in it), `syllableBoxes({lens, box:48, gap:8})`, `sortColumns({labels, rows:4, w:300})`. Every item stamps `[data-ws-content]`.

| # | id / slug | EN title (<=70) | teaching move | child does (d2) |
|---|---|---|---|---|
| F0 | G1-305 `syllable-split` | Draw the Syllable Arcs | Segment a PRINTED word by marking it: one arc (or bar) per syllable, de adds the vowel dot | 8 cards; words 2-3 syllables; draws 16-24 arcs; example row shows one solved word |
| F1 | G1-3xx (TBD) `syllable-split-rewrite` | Write the Word in Syllables | Reproduce the word split: copy it onto a ruling with a hyphen at every boundary | 6 rows; writes 6 words, 6-12 hyphens |
| F2 | G1-3xx `syllable-split-boxes` | Syllable Boxes | Segment WITH the count scaffold: one wide box per syllable, write each syllable in its box | 6 rows; 2-4 boxes each; writes 14-20 syllables |
| F3 | G1-3xx `syllable-split-missing-syllable` | Missing Syllable | Syllable-level cloze: one syllable of the printed word is a dashed box; say the picture, write the missing part | 8 cards; 1 blank each; writes 8 syllables |
| F4 | G1-3xx `syllable-split-scramble` | Syllable Scramble | Synthesis: the word's own syllables are printed as shuffled tiles; put them in order and write the word | 6 rows; 2-3 tiles (>=2 rows with 3); writes 6 words |
| F5 | G1-3xx `syllable-split-two-or-three` | Two or Three Syllables? Split and Sort | Split then classify by the number of parts produced (bisílabas / trisílabas): copy each bank word, split, into the 2- or 3-syllable column | bank of 8 (4+4, with pictures); 2 columns x 4 rulings; writes 8 split words |

### d-levels, PARAM vs CODE (all G1 ids; the emitter assigns G1-311+)

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 6 cards, count 2, len <= 8, example | 8 cards, count 2-3, len <= 12, example | 10 cards, count 2-4, len <= 13, no example | none (`mark`/`vowelDot` are LOCALE data, not a face) | base |
| F1 | 4 rows, count 2, model printed | 6 rows, count 2-3, model printed | 6 rows, count 2-4, model printed in inkSoft 18 px | `mode:'rewrite'` | CODE |
| F2 | 4 rows, count 2-3 | 6 rows, count 2-4, box 48 | 6 rows, count 3-4 | `mode:'boxes'` | CODE |
| F3 | 6 cards, blank = last syllable | 8 cards, blank index random (never a 1-letter syllable when another exists) | 8 cards, count 3-4 | `mode:'cloze'`, `pool:'tex'` | CODE |
| F4 | 4 rows, count 2 | 6 rows, count 2-3, `min3:2` | 6 rows, count 3-4 | `mode:'scramble'`, `pool:'tex'` | CODE |
| F5 | bank 6 (3+3) | bank 8 (4+4) | bank 10 (5+5) | `mode:'sort'`, `cols:[2,3]` | CODE |

No PARAM face: every move changes what is drawn; the range-only candidates are rejected below. Knobs are stamped only when declared (`data-lcs-mode`), guards key on `d.mode`, never on the level index; `tools/gate-variation-distinct.js` (exists, compares resolved d2) sees 5 distinct configs.

### verify() rules (browser) + re-derivation (node)

Stamps per item: `data-lcs-vocab`, `data-lcs-word` (display form), `data-lcs-count`, `data-lcs-split="ka|me|ra"` (case-folded); F3 `data-lcs-blank="1"`; F4 `data-lcs-tile` order; F5 `data-lcs-col="2|3"` on columns; F0 example row `data-lcs-example`.

- All: `split.join('') === word.toLocaleLowerCase(loc)`; `count === split.length >= 2`; item count === `d.n`; words distinct; pictures loaded; **no visible text on an item equals its own word with any separator inserted** (regex from the letters with `[\s\-|·/]` between) = the answer is never printed; F0 example word not in the task set.
- F0: every `.ss-arclane` empty; d1/d2 example printed with arcs === example count (de: dots === count); d3 none.
- F1: a `writing-row` per row; printed model === `data-lcs-word` verbatim (no hyphen in the row text).
- F2: box count === count; boxes empty; box width >= 17 x longest syllable + 14 (engineer measures the glyph advance).
- F3: exactly one `.ws-answerbox`; visible text === split minus the blank, in order.
- F4: tile multiset === split; order !== identity; a ruling present.
- F5: bank set === item set; 4 count-2 + 4 count-3; bank alphabetical (`data/b2/collation.js`); columns empty; labels === `sortLabels`.
- Node gate `tools/gate-syllable-split-data.js` re-derives every stamped split from the approved file + `data/b3/syllable-split.js` (`page.evaluate` cannot require modules).

### Refusal per locale / theme (measured, d2 rules applied)

| face | pool rule | cells refused (loc theme = pool) |
|---|---|---|
| F0 F1 F2 | approved, count 2-4, len <= 13 (+ da strict, fr non-mute-e) | en body 6; da fruits 5, zoo 7, ocean 5, body 2 |
| F3 F4 | as above AND `'TeX'` in `sources_agreed` (texPool) | en: animals 9 OK, fruits 6, vehicles 6, toys 4, zoo 4, forest 6, ocean 4, body 4 REFUSED (clothing 10, house 16, supermarket 18 ship); fr fruits 2, vehicles 7 REFUSED; da as F0 |
| F4 extra | `min3:2` three-syllable words in texPool (`t3`) | en animals/vehicles/toys/zoo/ocean/body 0-1, fr animals/fruits/body 0, nl animals 1, da animals/fruits 1, no body 0 REFUSED |
| F5 | c2 >= 4 AND c3 >= 4 | en animals (14:3), toys (10:3), body; fr animals, vehicles, toys, supermarket, ocean, body; nl animals, fruits, toys, forest, ocean, body; sv animals, ocean, body; no animals, vehicles, clothing, ocean, body; da all but clothing (6:4) + house (11:8) |

Themes carrying every face in >= 9 locales: around the house (26-74), supermarket (24-62), zoo animals, clothing, forest creatures. Body parts is the weakest cell everywhere (2-13); fan it last or never.

### Fan lever + query face

Lever = theme for every face. Query face = bare genre head (F0) + ONE noun of the act: F1 "write in syllables" (in Silben schreiben / escribir separando en sílabas / tavuta ja kirjoita); F2 "syllable boxes" (Silbenkästchen / casillas de sílabas / stavelserutor / tavulaatikot); F3 "missing syllable" (fehlende Silbe / sílaba que falta / la sillaba mancante / puuttuva tavu); F4 "syllable scramble" (Silbensalat / ordena las sílabas / stavelsesalat / tavusekoitus); F5 "two or three syllables" (zwei oder drei Silben / bisílabas y trisílabas / parole bisillabe e trisillabe / kaksi vai kolme tavua).

### Rejected non-moves (explicit)

1. Theme swap. 2. "Long words" (3-4) / "two-syllable only": ranges = the d3/d1 configs. 3. **"Which split is right?" judgement:** a one-letter boundary shift is a legitimate alternative in three locales (sv `kloc-ka` typographic vs `klock-a` school; de `Ka-tze` Duden vs `Kat-ze` chunks; fr `voi-ture` oral vs `voi-tu-re` écrite) and the count-changing distractor of a 2-syllable word is the unsplit word (trivial); printing a correct split labelled wrong breaches the §20.7 safety invariant. 4. **Vowel-king page:** needs the grapheme layer, real only in de/nl/sv/no; 7 refused = not a face (rule 3); kept as the de flag `vowelDot` inside F0. 5. Compound words = G2-316. 6. Split a whole sentence: frame words are not in approved-words (§20.5). 7. Count or sort by digit = K-233 / K-234. 8. fi pre-split (tavutettu) task words print the answer; allowed ONLY on the instruction strip as a panel literal. 9. Grapheme boxes under arcs = K-318 F4. 10. Trace the split word = K-284.

## C. NATIVE REBUILD x11

The panel authors (per locale) the six title/instruction pairs (`i18n/strings.<loc>.json`), `sortLabels`, the example word, exclusions and the level; the code substitutes literals and never inflects.

| loc | convention: drawn / written | panel authors | refusal rule | traps |
|---|---|---|---|---|
| en | arcs; rewrite `rab-bit` | "scoop" wording, example | F3/F4 texPool (210/607); body refused | rule splits are wrong (`ac-orn`): never print a boundary from the full pool (OQ 1) |
| de | Silbenbögen + Silbenkönig dot; rewrite keeps the capital | Silbenkönig instruction, example `Ba-na-ne`, labels `2 Silben / 3 Silben` | when `vowelDot`, exclude words whose `chunks` syllable has != 1 vowel grapheme (1-4 per theme) | only the FIRST syllable keeps the capital in tiles/boxes; an F3 blank at index 0 hides it, the child writes it |
| es | barras; guiones | labels `bisílabas / trisílabas`, example `ca-me-llo` | texPool for F3/F4 (`cray-o-nes`) | `qu gu ll ch` never split (gate checks) |
| pt | barras; hífen | labels `dissílabas / trissílabas`, level 1º or 2º | texPool for F3/F4 (`hie-na`, `sué-ter`) | hiato vs ditongo is the whole point; never "simplify" a split |
| fr | arcs, syllabes écrites | labels `2 syllabes / 3 syllabes`, example `la-pin` | `refuse.finalMuteE:true` default (391/810 carry one); panel may flip it (OQ 4) | texPool fruits 2 / vehicles 7: F3/F4 refused there |
| it | barre; trattini | labels `bisillabe / trisillabe`, example `ta-vo-lo` | texPool for F3/F4 (`pi-pis-trel-lo` is wrong: s impura goes right) | doubles split `gat-to`; `gl gn sc` never split |
| nl | arcs or streepjes; LETTERGREPEN | labels `2 / 3 lettergrepen`; head confirmation | none beyond base | Staal klankgroepen = `ka-tten`, the data = `kat-ten`: a klankgroepen title contradicts the method book (OQ 3); `ij` is one letter |
| sv | bågar; rewrite `klock-a` | labels `2 / 3 stavelser`; level | none; carve-out = school convention | never `grupp`; singular only, no definite forms (`bana`/`banan`) |
| da | buer; rewrite | labels `2 / 3 stavelser` | `strictPool` -> fruits, zoo, ocean, body refused; F5 on clothing + house only | TeX-accepted, no `da.js` (deliberate, §A.13.57) |
| no | buer; rewrite `klok-ke` | labels `2 / 3 stavelser` | none | do NOT import sv's `ck`/`ng` coda: no splits geminates, `en-gel` |
| fi | tavuviivat; hyphens | labels `2 / 3 tavua`, optional `instructionTavutettu` literal | none | the instruction is a whole authored literal (case); long vowels/doubles stay in one syllable (`lu-sik-ka`) |

## D. DATA + GATES

Read from `approved-words-<loc>.json .entries[]`: `key` (join), `word`, `split`, `count`, `sources_agreed`, `policy_managed` (da), `notes.tex_disagreed_with_rule` (diagnostic only). Not read: `chunks` (except the de `vowelDot` exclusion), `wiktionary_ipa`, `nst_sampa`.

`data/b3/syllable-split.js` is GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the b2 pattern; both TBD by K-317/K-318):

```
{ <loc>: { mark:'arc'|'bar', vowelDot:false, hyphen:'-', casing:'keep'|'lower',
  boundaryPool:'tex'|'all',            // F3/F4 always 'tex'; F0/F1/F2/F5 'all'
  strictPool:null|'policy_managed_absent', refuse:{ finalMuteE:false },
  sortLabels:{ 2:'2 Silben', 3:'3 Silben' }, example:{ vocabKey:'banana' },
  instructionTavutettu:null|'Ta-vu-ta sa-nat.', exclude:['vocabKey'] } }
```

Validator rules: `mark` in the enum; `sortLabels` both present and distinct; `example.vocabKey` approved with count 2-3 in that locale; `exclude` keys exist in the vocab; fi `instructionTavutettu` only in fi; da `strictPool` must be set.

Gate `tools/gate-syllable-split-data.js` (every locale x theme x face, before a wave; prints words checked per cell, 0 checked = FAIL):
1. every fanned word exists in the approved file (poison: inject `{noun:'zebra', vocabKey:'zebra'}` with no approved entry into a fake pool -> build throws `sampleEntries`, gate FAIL "not approved").
2. stamped `data-lcs-split` === approved `split` (poison: stamp `kam|era` for `kamera` -> FAIL "split != approved").
3. `count >= 2`, within the face's range; F4 `min3` satisfied.
4. F3/F4: `'TeX'` in `sources_agreed` (poison: en `acorn` with sources `[rule, vocab-phonics-syl]` -> FAIL).
5. da: `policy_managed` ABSENT (poison: `anker` with `policy_managed:true` -> FAIL).
6. fr: no final mute-e when `refuse.finalMuteE` (poison: `voiture` -> FAIL).
7. rendered text never contains a separated form of the item's own word (poison: F3 renders the blank syllable as text -> verify FAIL "answer printed").
8. F4 order !== identity (poison: `[0,1,2]` -> FAIL); F5 columns 4:4 (poison: 5:3 -> FAIL).
9. F0 example word not in the task set (poison: reuse -> FAIL).
10. `gate-variation-distinct.js`: 5 resolved d2 configs differ from base (poison: F1 without `mode` -> FAIL).
11. pool >= `minNouns` per cell or the cell is recorded REFUSED, never filled.

## E. SEO

Titles: F0 `{native head}: {Theme}`; F1-F5 `{act noun}: {Theme}` (<= 70, no worksheet-word). en `Syllable Division: Animals` / `Missing Syllable: Animals`; de `Silbenbögen: Tiere` / `Silbensalat: Tiere`; es `Separar en sílabas: animales` / `Bisílabas y trisílabas: animales`; fi `Tavuta sanat: eläimet` / `Puuttuva tavu: eläimet`. Meta = the brief's two-sided window; MIDDLE = the face instruction when it lands in 120-170, else `skill-sentences.<loc>.json syllable-split.full` (new key). Landing: eyebrow = band level; h1 = title; strand = `strand-names.ts` phonological-awareness domain (de "Laute & Silben"); JSON-LD `LearningResource`, `educationalAlignment.targetName` RF.1.3.e (en) or the national framework NAME (§20.10).

Non-cannibalisation (raw 3-gram Jaccard *est.*; `scripts/seo-landing/gate.js` FAIL >= 0.80):

| pair | fence in copy | est. |
|---|---|---|
| F0 vs K-233 count-the-syllables | K prints a digit box, no word; F0 prints the word, the child MARKS it, no digit anywhere | 0.20 |
| F5 vs K-234 sort-by-syllables | K draws lines to a numbered bin; F5 WRITES each word split under a bisílabas/trisílabas heading, G1 | 0.35 |
| F0/F2 vs K-318 F4 "Syllables and Sounds" | K-318 PRINTS the arcs and asks for graphemes in boxes; G1-305 never prints an arc on a task word and never draws a grapheme box; its boxes are one per SYLLABLE with the word printed | 0.30 |
| F4 vs G1-306 syllable-reading | G1-306 reads syllable TABLES / families (ma me mi); F4 reorders one word's own tiles under its picture and never prints a table | 0.25 |
| F1 vs G1-244 write-the-word | G1-244 prints no model (dictée muette); F1 prints the model and asks for hyphens | 0.30 |
| F3 vs K-224 cvc-missing-letter | letter cloze vs syllable cloze; copy says "syllable" never "letter" | 0.20 |
| F4 vs K-231 letter tiles | unit = syllable; copy never says "letters" | 0.20 |

Boundary sentence on every landing: "The word is printed in full; the child shows where it breaks" (against K-318 "no letters are shown" and K-233 "write how many"). Hub contract: `apps.syllable-split` + axis slug/name x11 + exactly 6 landings per locale with `coordinate.type === 'syllable-split'`, level `grade-1` band key, `canonicalDeckSlug` = the deck; gate `scripts/verify-hub-type-rows.js` (DOES NOT EXIST, measured).

## F. OPEN QUESTIONS

1. **EN boundary data is defective** (397/607 rule-only VC/CV splits, `ac-orn`, `kiw-i`). Boundary faces ship on the texPool (3 themes). Fix the en rule-syllabifier in the pipeline (a separate commission; snapshot per §A.13.44), or accept 3 themes for F3/F4 in en?
2. es/pt/it/fi rule-vs-TeX real boundary differences (`cray-o-nes`, `hie-na`, `pi-pis-trel-lo`): texPool for F3/F4 handles it; should the count-only faces also drop them (pools fall 10-30 %)?
3. nl: the approved split is lettergrepen; the groep-3 spelling method (Staal) teaches klankgroepen with a different boundary. Confirm the head "lettergrepen" and that no face is titled klankgroepen.
4. fr: refuse final mute-e (default) or ship syllabes écrites (Taoki arcs count `-re`) with a landing sentence? Pools 10-26 vs 14-53.
5. sv level: åk 1 written arcs (this design) vs förskoleklass oral (the panel's B rating)?
6. da: strict pool refuses 4 of 11 themes and F5 ships on 2; accept, or allow `policy_managed` words at 2. klasse as a da-only level move?
7. de `vowelDot`: should the F0 example row print the dots, and is 30 px lane height enough for arc + dot at 28 px type (engineer measures)?
8. F3 blank width leaks syllable length (as K-224 leaks letter count): acceptable at G1, or fixed-width 64 px box?
9. `tools/apply-b3-locale.js`, `validate-b3-draft.js`, `components-b3.js`, `verify-hub-type-rows.js` do not exist: which design owns them (K-317 is first in the batch)?
10. 1-letter syllables (`a-vión`, `e-le-fan-te`): keep for arcs/boxes (a 1-letter box is 52 px wide), exclude as F3 blanks (designed so), exclude from F4 tiles?

**Summary.** G1-305 is one apparatus (picture + the whole word printed) with six acts on it: mark the split (F0, locale mark + de vowel dot), rewrite it with hyphens (F1), write one syllable per box (F2), complete a blanked syllable (F3), reorder the word's own syllable tiles (F4), split-and-classify into 2- vs 3-syllable columns (F5); no PARAM face, and the judgement face is rejected because its "wrong" split can be a legitimate convention. The count is trustworthy in all 11 locales; the BOUNDARY is trustworthy only where TeX agrees, so the two boundary-printing faces (F3, F4) draw from that subset and en drops to three themes there. Around the house, supermarket, zoo animals, clothing and forest creatures carry every face in >= 9 locales; da's strict pool refuses four themes; fr refuses mute-e words by default as a data flag the panel can flip. An 11-assertion node gate re-derives every stamped split from the approved file before a wave.
