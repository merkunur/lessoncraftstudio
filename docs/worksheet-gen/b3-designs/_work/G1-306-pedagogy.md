# G1-306 `syllable-reading` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers are MEASURED 2026-09-13 (`approved-words-<loc>.json .entries[]` joined to `lib/b2-common.js entriesFor(theme, loc)` over all 50 colour themes of `cache/manifest.json`, deduped by `vocabKey`, `entry.word === singular` case-folded, `/^\p{L}+$/u`, da `policy_managed !== true`) unless marked *est.* Pictured + approved words: en 796 · de 721 · es 779 · pt 733 · fr 663 · it 794 · nl 749 · sv 688 · da 304 · no 603 · fi 805.

**Boundary (load-bearing):** this type is BLENDING. The unit (syllable / rime / letter string) is PRINTED and the child READS it and joins it; the child never produces a split (G1-305), never writes one grapheme per box (K-318), never assembles scrambled letters (K-231), never fills a missing letter (K-224), never sight-matches a whole K word (K-225), never traces (K-239). Every face below is checked against that sentence.

## A. IDENTITY

| field | value |
|---|---|
| family key | `syllable-reading` (NEW `apps.syllable-reading` + `axes['exercise-type'].syllable-reading` x11 in `topics-taxonomy.json`; subject `letters`, age `6-8`; registrar pattern `tools/register-b2-taxonomy.js`) |
| band | G1, all six faces (blending with a printed unit is a G1 skill in every framework; variation ids `G1-311+ (TBD by the emitter)`) |
| theme axis | `themeAxis:{applicable:false}` for all faces. Measured: the largest single theme holding one consonant row / one vowel is es 8 (around the house, c), nl 8 (house, a), fi 5, sv 5, de 4. A page is keyed on the UNIT (consonant row / rime pair / vowel), so pools are cross-theme by construction; the fan lever replaces the theme fan. |
| CCSS (en only) | F0 RF.1.3.b · F1 RF.1.3.b · F2 RF.1.3.e · F3 RF.1.3.b · F4 RF.1.3.b (blends) · F5 RF.1.3.e. Non-en landings name the national framework only (section 20.10). |
| data | `approved-words-<loc>.json` for `split` / `word`; raw vocab for the picture + join key; `data/b3/syllable-reading.js` for panel-authored rows (section D) |

Three REBUILD SHAPES, chosen by what the locale's G1 reading method actually prints:

| loc | shape | genre head (panel may rename) | ASCII slug | level | why this shape |
|---|---|---|---|---|---|
| es | S syllable row | Silabario: sílabas ma me mi mo mu | `silabario` | primer grado | A head; 13 consonant rows >= 8 words with >= 3 vowels |
| pt | S | Família silábica | `familia-silabica` | 1º ano | A head; 14 rows qualify (NOT "família de palavras", 4º+) |
| it | S | Sillabe da leggere: MA ME MI MO MU | `sillabe-da-leggere` | classe prima | A head; 12 rows qualify |
| fr | S | Lecture de syllabes | `lecture-de-syllabes` | CP | A head; 14 rows qualify when the vowel unit may be a digraph (ou on an in eu oi) |
| de | S | Silbenteppich lesen | `silbenteppich` | 1. Klasse | A head; 8 rows qualify (k g r b m t l p) |
| fi | S | Tavut ja tavutaulukko | `tavutaulukko` | 1. luokka | A head; fi reading IS syllabic; 9 rows qualify |
| en | R word family | Word Families: Read and Write | `word-families` | grade 1 | A head; rimes with >= 3 pictured words: 8 (below) |
| nl | B sound-out strip | Zoemend lezen (letters plakken) | `zoemend-lezen` | groep 3 | B head; 118 pictured 2-4-letter one-letter-per-sound words |
| sv | B | Ljuda ihop ord | `ljuda-ihop-ord` | åk 1 | B head; 157 words; head must not collide with K-318 `ljuda-ord` (OQ 1) |
| da | B | Lydrette ord: læs og skriv | `lydrette-ord` | 1. klasse | A extra; 88 words *est.* (flat chunks, strict pool; panel whitelist, section C) |
| no | B | Lydrette ord (lydering) | `lydrette-ord` | 2. trinn | B head; 137 words; K-318 owns `lydering` (OQ 1) |

## B. THE SIX FACES

New in `templates/components-b3.js`: `unitRow({units, chipW, chipH, fontPx})` (teal chip row, Baloo 2 700: the thing the child READS), `soundOutStrip({letters, cell:44, dots:true, arrow:true})` (spaced letters, a coral dot under each, a teal arrow beneath), `syllableTiles({tiles, fontPx})` (ordered teal tiles with `+`), `unitGrid({cells, cols, rows, cellW, cellH})` (F3). Reused: `cardGrid`, `answerBox`, `writingRow`, `wordBank({withIcons})`, `pillChoice`, `countBadge`, `colorLegend`, `fileUri`. Every card / row stamps `[data-ws-content]`; the row / tiles show the UNIT, never the target word.

| # | id / slug | EN title | teaching move | what the child does at d2 (per shape) |
|---|---|---|---|---|
| F0 | G1-306 `syllable-reading` | Read the Syllables | Read a printed unit row, then find it at the start of a pictured word and write it. | S: banner = one consonant row (5-8 chips 96x64, 40 px); 8 cards 4x2 (pic 110) with ONE `answerBox` 100x52: write the first syllable. R: banner = 2 rime ladders (`-at`: c b h m s); 8 cards: write the whole 3-4-letter word. B: 8 full-width rows [pic 64][`soundOutStrip` 2-4 letters][`writingRow` w 300 glyphH 28]: sound out, write the word joined. |
| F1 | G1-3xx `syllable-reading-circle-the-syllable` | Which Syllable Do You Hear? | Recognition before production: the row is printed on every card, the child circles the unit the picture starts with. | 8 cards 2x4 [pic 72][`pillChoice` chips]. S: the consonant's 5 syllables (distractors = same row); R: 3 rimes; B: 3 real sound-out strips, one matches. No writing. |
| F2 | G1-3xx `syllable-reading-join-the-syllables` | Join the Syllables | Ordered syllable tiles of a 2-syllable word; read each, write the word joined (the mirror of G1-305 face b). | 8 cards 2x4 [pic 72][`syllableTiles` ga + to][`writingRow` w 200]. Same shape in all 11 (tiles = approved `split`). |
| F3 | G1-3xx `syllable-reading-carpet` | Syllable Carpet: Read and Colour | Fluency grid (Silbenteppich): read every cell aloud, then colour the cell that starts each pictured word in that picture's colour. | `unitGrid` 6x5 = 30 cells 100x54 (S: 6 rows x 5 vowels, every syllable once; R: 4 rimes x 5 onsets = 20 real words; B: 20 sound-out words); below, 6 pictures 72 px each with a `codeColors` swatch. No writing. |
| F4 | G1-3xx `syllable-reading-complex-syllables` | Complex Syllables | Same act as F0 on the next decoding step: cluster / closed units. | F0 layout, `structure:'complex'`. S: cluster rows (es/pt/it/fr/de `tra tre tri tro tru`, fi closed `kas kes kis kos kus`); R: blend ladders (`fl-ag`, `cr-ab`); B: CCVC / CVCC strips (`gris`, `hund`). |
| F5 | G1-3xx `syllable-reading-syllabified-words` | Read the Syllabified Words | Words printed pre-split (fi `tavutettu teksti`, de `silbierte Wörter`); read, find the picture, write its number. | numbered picture bank (8 icons 64 + `countBadge`); 8 rows: word in `split` form (hyphen or alternating teal / coral syllables, panel `sepMode`) + a 44x44 dashed number box. Picture order is shuffled. |

Layout arithmetic (body 703x760, inner 675): F0-S banner 80 + gap 14 + 2 card rows of 326 = 746; F0-B rows h = (760 - 7 x 8) / 8 = 88; F3 grid 5 x 54 + 4 x 10 = 310, gap 20, picture strip 6 x (72 + 20 swatch) = 92, total 422; F5 bank 96 + 8 rows x 72 + gaps = 760. G1 floors hold: smallest element 44 (number box), smallest answer glyph 28, items 6-8.

### d-levels, PARAM vs CODE

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 6 cards, row printed with a picture cue per syllable | 8 cards, `structure:'simple'` | 8 cards, no banner row (recall) | base | base |
| F1 | 6 cards, 3 chips | 8 cards, 5 chips (S) / 3 (R,B) | 8 cards, chips from TWO rows (8) | `mode:'circle'`, `chips:n` | CODE |
| F2 | 6 cards, 2 tiles | 8 cards, 2 tiles | 8 cards, 3 tiles | `mode:'join'`, `tiles:2` | CODE |
| F3 | 4x4 grid, 4 pictures | 6x5 grid, 6 pictures, `reps:1` | 6x5, 8 pictures, `reps:2` (colour every occurrence) | `mode:'carpet'`, `grid:[6,5]` | CODE |
| F4 | 6 cards, one cluster | 8 cards, `structure:'complex'` | 8 cards, mixed simple + complex, no banner | `structure` | PARAM |
| F5 | 6 rows, 2 syllables | 8 rows, 2-3 syllables | 8 rows, 3-4 syllables, no pictures printed twice | `mode:'syllabified'`, `sepMode` | CODE |

F4 is the only PARAM face (`{...base.difficulty[2], structure:'complex'}`); its resolved d2 differs from base d2 in `structure`, so `tools/gate-variation-distinct.js` passes. All guards key on `d.mode` / `d.structure`, never on the level index; knobs are stamped only when declared so F0 stays byte-identical.

### verify() and re-derivation

Stamps per item: `data-lcs-vocab`, `data-lcs-word` (display form), `data-lcs-unit` (S: `split[0]`; R: the rime; B: the letter string = word), `data-lcs-split="ga|to"` (F2, F5), `data-lcs-row="ma|me|mi|mo|mu"` (banner), `data-lcs-structure`, `data-lcs-pic` (F5 index), `data-lcs-target` on the correct chip / cell.

- All: `unit` is a prefix of `word` case-folded (S) / a suffix (R) / equal (B); `split.join('') === word`; item count === resolved `cards` / `rows`; no repeated `data-lcs-word`; the target word never appears as visible text on its card (S, R, B F0/F1/F4) except inside the strip / tiles that ARE the task; `answerBox` / lane empty.
- F0/F4-S: every card's `unit` is a member of `data-lcs-row`; row chips === the row literal from the data file; >= 3 distinct vowels among the 8 targets; F4 additionally `unit` matches the locale `complex` regex and F0 the `simple` one.
- F0-R: word = onset + rime, rime in the 2 printed ladders; each ladder's onset tiles form real words (panel list); F0-B: strip letters === word, every grapheme a single letter (nested-chunk locales) or the word is on the da / fi whitelist.
- F1: exactly one chip / strip per card equals `unit`; distractors from the same row (S) or real pool words (B), never a prefix of the target; correct position not constant page-wide.
- F2: tiles join === word, tile count === `count`; F5: exactly one picture with `data-lcs-vocab === row.vocab`; picture order !== row order; number box empty.
- F3: each target unit occurs exactly `reps` times in the grid; non-target cells !== any target; 6 distinct `codeColors`; targets distinct.
- Re-derivation lives in `tools/gate-syllable-reading-data.js` (node): recomputes `split[0]` / `split` / letters from the approved file + the data bank and diffs against every stamp (`page.evaluate` cannot require modules).

### Refusal conditions and measured pools (fan unit -> pages at 8 items)

| face | S (strict CV first syllable, rows with >= 8 words and >= 3 vowels) | R (en) | B (2-4 letters, one letter per grapheme) |
|---|---|---|---|
| F0 | es 13 rows (c 76 p 48 t 32 m 30 l 28 b 27 r 24 g 19 s 15 d 13 n 11 h 9 j 8) · pt 14 (c 59 p 46 b 32 l 30 m 27 t 23 r 22 g 16 s 16 f 15 d 12 v 9 n 8 ch 8) · it 12 (c 55 p 35 l 23 b 22 t 21 m 21 r 21 f 15 g 14 d 13 s 13 v 8) · fr 14 with digraph vowels (c 41 p 38 b 30 m 28 l 26 r 23 t 23 s 21 ch 15 v 13 g 10 d 9 h 9 f 8) · de 8 (k 20 g 16 r 15 b 13 m 12 t 10 l 10 p 10) · fi 9 (p 32 k 27 s 26 v 20 m 20 l 19 h 10 t 9 r 8) | rimes with >= 3 pictured words: -an 5 -ock 4 -ug 4 -at 3 -og 3 -ar 3 -and 3 -ed 3 -> 4 rime-PAIR pages of 6-9 pictures; ladders filled by panel read-only words | simple (CV/VC/CVC): nl 48 · sv 52 · no 28 · da 35 *est.* By vowel >= 8: nl a 16 o 13 e 9, sv å 10, no none, da none -> one mixed-vowel page where no vowel reaches 8 |
| F1 | as F0 (5 chips need the row, not 5 pictured vowels) | 3 rimes per card from the 8 above | as F0 + 2 real distractors from the full pool |
| F2 | 2-syllable pictured words: es 290 pt 277 it 263 fr 296 de 323 fi 297 | en 341 | nl 290 sv 294 no 265 da 120 |
| F3 | 6 rows x 5 vowels: every S locale has >= 6 qualifying rows; 6 pictures from >= 6 rows | 4 rimes x 5 onsets, 6 pictured targets | 20 pool words, 6 pictured targets |
| F4 | cluster rows >= 4 words: es 6 (tr 10 pl 8 fr 7 br 6 gr 4 fl 4) · pt 4 (tr 14 pr 12 br 6 fl 4) · it 8 (tr 12 fr 10 st 10 br 10 sp 10 pr 6 gr 6 cr 6) · fr 9 (tr 10 cr 10 br 9 st 6 pl 5) · de 11 (tr 12 br 11 kr 10 fl 8 schn 7) · fi clusters 27 total -> fi F4 = closed syllables (umpitavu) 336 (k 73 p 49 s 34 h 33 l 30) | blend-onset monosyllables 36 short-vowel / 61 any vowel (r-blends 14, l-blends 9, s-blends 8) | cluster words: nl 63 (a 27 e 14 o 13) · sv 99 (a 24 o 18 ä 15 u 11 i 9 ö 8 e 8) · no 94 (a 22 e 19 o 19 i 11 u 8) · da 50 *est.* (a 13 i 9) |
| F5 | 2-3 syllables <= 10 letters: es 570 pt 547 it 563 fr 482 de 454 fi 519 | 470 | nl 396 sv 418 no 362 da 175 |

A row / rime pair / vowel below 8 is REFUSED for that page, recorded, never filled; rows under 8 but >= 6 may ship at d1 only. No face is unbuildable in any locale (rule 3): the thinnest cells are en F0 (4 pages) and no/da F0 (1 mixed page each).

Fan lever: S = consonant row (F0, F1, F4 cluster row); R = rime pair (F0, F1), blend group (F4); B = vowel where >= 8 else none (F0, F4); F2 / F3 / F5 = seed only. Query face = the bare head (F0) plus ONE noun of the act: F1 "circle the syllable" (es colorea la sílaba, nl welk woord hoor je); F2 "join the syllables" (de Silben zusammensetzen, fi yhdistä tavut); F3 "syllable carpet" (de Silbenteppich, fi tavutaulukko); F4 "clusters / complex syllables" (es sílabas trabadas, pt encontros consonantais, fr syllabes complexes, fi umpitavut, sv konsonantförbindelser, en blends); F5 "syllabified words" (fi tavutetut sanat, de silbierte Wörter).

### Rejected non-moves

1. Theme swap (rule 1). 2. Scrambled syllable tiles: assembling = K-231 in disguise, plus `to-ga` / `ga-to` ambiguity. 3. First syllable given, write the rest: G1-244 d1 starter in disguise. 4. Line picture -> syllable: F1 with another apparatus. 5. Sort by first syllable (`pa` vs `pe` bins): K-228 shape. 6. Three-syllable join / long words: ranges (F2 d3). 7. A pure timed carpet: open-ended, no verify, no-timer rule. 8. Middle-syllable blank: K-224 / K-227. 9. Trace the syllable: K-284.

## C. NATIVE REBUILD x11

Rows, vowel order, distractor rules and whitelists are DATA in `data/b3/syllable-reading.js`; the code substitutes literals and never inflects or infers a syllable.

| loc | shape | inventory the panel authors | vowel order | refusal rule | traps |
|---|---|---|---|---|---|
| es | S | rows as literal syllable lists: `c:['ca','co','cu','que','qui']` (hard /k/), `ce ci` with `za zo zu` (soft), `g` as `ga go gu gue gui`; cluster rows `tr pl br fr gr fl` | a e i o u | `split[0]` not in any row -> word skipped (accented `có-` never matches `co`) | `playa` is stored `play-a` in approved-words (wrong; should be `pla-ya`) -> ban by key, report to the pipeline; `ch ll rr` are one onset |
| pt | S | rows incl. `ca co cu / ce ci`, `ga go gu`, `ch`, `nh lh` (8 / 1 words: refused); cluster rows `tr pr br fl` | a e i o u | as es | nasal `ã õ` syllables stay out of the 5-vowel row unless the panel adds them; `x` excluded |
| it | S | rows `ca co cu / ce ci`, `ga go gu / ge gi`, `sc`, `gn gl` (<= 5: refused); clusters `tr fr st br sp pr gr cr` | a e i o u | as es | doubles never split a first syllable (`gat-to`: `gat` is closed, F4 not F0); accents on final vowels only |
| fr | S | rows may hold digraph vowels (`ma me mi mo mu mé mou`); clusters `tr cr br st pl`; final-mute-e words are fine here (no split shown) except F2 / F5 (G1-305 refusal reused) | a e i o u (+ é, ou, on as the panel decides) | `split[0]` not in row; F2 / F5 mute-e refused pending the section 20.9 ruling | `chat` is one syllable, never in a `ch` row; `c` hard / soft, `g` hard / soft split as es |
| de | S | rows `ka ke ki ko ku` (+ `au ei eu` optional), 8 consonants; clusters `tr br kr fl schn bl fr str gl schl`; `sch ch pf qu sp st` one onset | a e i o u (+ au ei eu) | as es; `ki` has 0 pictured k-words: the chip prints, no card uses it | nouns keep the capital (`displayWord`); chip `ka` vs written `Ka` is OQ 3; `Kuchen` twice in vocab (`distinctByWord`) |
| fi | S | rows over 8 vowels `ka ke ki ko ku ky kä kö` (chip 72 x 56, 32 px); F4 = closed syllables `kas kis kuk kir`; `ng nk` never split | a e i o u y ä ö | as es | long vowels / diphthongs (`kaa`, `koi`) stay out of the simple row; `kä` and `ka` are both real chips |
| en | R | 8 measured rimes in pairs; 5 onsets per ladder forming real words (`-at`: b c h m s); read-only fillers (`mat sat`) as literals; blends `bl cl fl gl pl sl br cr dr fr gr tr st sw sc sk` | n/a (onset alphabetical) | fewer than 6 pictured words across the pair -> refused | opacity: r-controlled (`car`, `star`) and long-vowel words stay OUT of F0 short-vowel pages |
| nl | B | 118 one-letter-per-grapheme words (nested chunks); clusters 63; F1 distractors from the pool | vowel fan a o e | any multigraph chunk (`aa ee oe ij sch`) excluded by construction | `ij` / `ee` words are not kern-1 zoemend-lezen material |
| sv | B | 157 words; doubles (`katt`) kept as ljudenliga (OQ 2); 8 vowels fan | as nl | as nl; `sj tj ng` chunks excluded | bare singular only (`bana`, never `banan`); head must not reuse K-318 `ljuda ord` |
| no | B | 137 words; `kj sj skj` already gate-quarantined | as nl; 7 vowels | as nl | `lydering` is K-318's slug; bokmål only |
| da | B | strict pool (`policy_managed` ABSENT, 88 *est.*), panel WHITELIST per word (`ræv` final /w/) | as nl | absent, managed, or not whitelisted -> refused; below 8 -> one mixed-vowel page | flat `chunks`: the letter rule is the panel's, not the file's |

## D. DATA + GATES

`data/b3/syllable-reading.js` is GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the b2 pattern):

```
{ <loc>: { shape:'syllable'|'rime'|'soundout',
  vowels:['a','e','i','o','u'], vowelOrder:true,
  rows:{ m:['ma','me','mi','mo','mu'], c:['ca','co','cu','que','qui'] },      // S: simple rows
  complexRows:{ tr:['tra','tre','tri','tro','tru'] } | { closed:/^[^aeiouyäö]+[aeiouyäö][^aeiouyäö]$/u },  // S F4
  rimes:{ at:{ onsets:['b','c','h','m','s'], readOnly:['mat','sat'] } }, blends:['bl','cl',...],   // R
  simple:/^[bcdfghjklmnpqrstvwxyzåäöæø]?[aeiouyåäöæø][bcdfghjklmnpqrstvwxyz]?$/u, complex:/(^[^aeiou]{2}|[^aeiou]{2}$)/u,   // B
  whitelist:{ vocabKey:true }, ban:['playa'], sepMode:'hyphen'|'color', strictPool:null|'policy_managed_absent',
  labels:{ ... } } }
```

`lib/syllable-reading.js`: `unitOf(entry, cfg, face)` -> `split[0]` (S) / rime by regex (R) / letters (B) or null (refuse); `rowFor(unit)` -> the row literal containing it; `poolFor(cfg, face, fanKey)`; every result must satisfy the verify prefix / suffix / equality rule or `sampleEntries` throws.

Gate `tools/gate-syllable-reading-data.js` (every locale x face x fan key before a wave):
1. every fanned word is in the approved file with `total_agreed >= 3` OR the locale policy allows 2 (2-source share: en 341/796, fr 356/663, es 173/779, pt 156/733, it 121/794, fi 104/805, others 0; OQ 4). Poison: `{noun:'zebra', word:'sebra'}` -> FAIL "not approved".
2. S: `split[0]` is in exactly one row literal and the chips print it verbatim. Poison: drop `mu` from the m row with a `mu-` word fanned -> FAIL.
3. R: word === onset + rime; `readOnly` words match `^[bcdfghjklmnpqrstvwxyz]{1,3}` + rime. Poison: `readOnly:['mate']` under `-at` -> FAIL.
4. B: `chunks.flat()` all length 1 and join === word (nested locales); da / fi whitelisted. Poison: nl `school` (chunk `sch`) -> FAIL; da `hund` with `policy_managed:true` -> FAIL.
5. F1: no distractor equals or is a prefix / suffix of the target; correct index varies. Poison: chips `['ka','ka','ke','ki','ko']` -> FAIL.
6. F3: targets occur exactly `reps` times, non-targets never equal a target, 6 distinct `codeColors`. Poison: `ma` twice at `reps:1` -> FAIL.
7. F4 unit matches `complex`, F0 matches `simple`; control: the same word fails the other face.
8. `gate-variation-distinct.js`: 5 resolved d2 configs differ from base (poison: F4 with `structure:'simple'` -> FAIL).
9. pool >= 8 per (face, fan key) or the cell is recorded REFUSED; 0 words checked in a cell = FAIL (non-vacuity).
10. `data/b3/*` is gitignored (`git add -f`), as `data/b2/*`.

## E. SEO

Title = `{head}` (F0) or `{head}: {qualifier}` (F1-F5) + `: {fan unit}` where fanned (`Silabario: sílabas ma me mi mo mu` / `Silabario: sílabas trabadas tra tre tri tro tru` / `Silbenteppich lesen: K` / `Word Families: -at and -an` / `Zoemend lezen: woorden met a`), <= 70 chars, no worksheet-word. Meta = `Free printable {TITLE} ... {LEVEL}. {MIDDLE}.`, MIDDLE = the face instruction when it fits 120-170 else `skill-sentences.<loc>.json syllable-reading.full` (new key). Eyebrow = the band-table level; h1 = title; strand = the locale's reading / decoding domain in `frontend/lib/seo/strand-names.ts` (de "Lesen", fr "Lecture", fi "Lukeminen"; the phonological-awareness row is K-318's, not this one's); JSON-LD `LearningResource`, `educationalAlignment.targetName` = CCSS code (en) / national framework NAME (others), no `targetUrl`.

Non-cannibalisation (raw 3-gram Jaccard *est.*; `scripts/seo-landing/gate.js` FAIL >= 0.80). Boundary sentence on every landing: "The syllables are printed; the child reads them and writes the word" against the split-it-yourself and letter-by-letter siblings.

| pair | why distinct in copy | est. |
|---|---|---|
| F0 / F2 vs G1-305 (base, face b) | 305 prints the word, the child produces the split; 306 prints the unit, the child produces the word | 0.25-0.30 |
| F0-B / F1-B vs K-318 F5 blend the sounds | 318 = grapheme boxes, circle 1 of 3 pictures, K; 306 = spaced letters on an arrow, write the word joined (F0) or 1 picture, 3 strips (F1), G1 | 0.30-0.35 |
| F0 vs K-231 / K-224 | scrambled letters / one blanked letter vs ordered printed units and a ladder | 0.15-0.25 |
| F0-S vs K-221 beginning-sounds | one letter vs a printed 2-3-letter syllable chosen from a row | 0.20 |
| F5 vs K-225 match word to picture | syllabified 2-3-syllable words + numbers vs whole K sight words + lines | 0.30 |
| F4 vs F0 | "clusters / trabadas / complex" is a distinct sub-skill head with a disjoint unit set | 0.45 |

## F. OPEN QUESTIONS

1. sv / no heads: K-318 owns `ljuda-ord` (sv) and `lydering` (no); the proposed `ljuda-ihop-ord` / `lydrette-ord` need the panel's confirmation that they are the reading-side genre names.
2. sv / no double consonants (`katt`, `buss`): ljudenliga (in the B pool) or excluded? Pools drop by ~30 % if excluded (sv CVCC 63 includes them).
3. de: the child writes `Ka` (capital, matching the noun) or `ka` (matching the chip)? Verify accepts either only if the panel rules so.
4. Two-source entries (`rule_authoritative`, up to 54 % in fr): refuse `total_agreed < 3` here (halves the fr pool) or trust the v1.1 gate as K-318 asks?
5. es approved-words stores `playa` as `play-a`: ban by key here and file a pipeline fix (also check `tex_disagreed_with_rule` entries in the S pools).
6. fr vowel units: is `mou` / `mon` a legitimate chip in a CP "lecture de syllabes" row, or do rows stay 5-vowel and digraph-vowel words go to F4?
7. en F4 blends: short-vowel only (36 words, 4-5 pages) or any regular vowel (61)?
8. `scripts/verify-hub-type-rows.js` does not exist (measured, same as K-318 OQ 7); who builds it before `apps.syllable-reading` is registered?
9. F3 d3 `reps:2` colours 12-16 cells: is the colour-code legible on mono print (8 `codeColors` reduce to greys)? Engineer renders a mono proof.

**Summary.** G1-306 is the blending mirror of G1-305: a printed unit (consonant syllable row in es/pt/it/fr/de/fi, rime ladder in en, sound-out strip in nl/sv/da/no) that the child reads and joins into a pictured word, in six faces that change the act: write the first syllable / word (F0), circle the syllable heard (F1), join two syllable tiles (F2), colour the carpet (F3), the complex-syllable step (F4, the one PARAM face), read pre-syllabified words to a numbered picture (F5). Pools are cross-theme by construction (`themeAxis` off; the fan lever is the row / rime pair / vowel), and every locale fills every face: the thin cells are en F0 (8 rimes with >= 3 pictured words, 4 rime-pair pages) and no / da simple sound-out words (28 / 35, one mixed-vowel page). Rows, distractors and whitelists are panel data in `data/b3/syllable-reading.js`; the code never infers a syllable, and a 10-assertion node gate with poison cases re-derives every stamp from `split[0]` / `split` / `word` before a wave.
