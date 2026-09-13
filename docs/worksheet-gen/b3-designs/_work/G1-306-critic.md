# G1-306 `syllable-reading` - editor-critic record (2026-09-13)

Inputs: `_work/G1-306-pedagogy.md` (P) + `_work/G1-306-design.md` (D). Output: `G1-306-syllable-reading.md` (7 sections, sibling contract). Doctrine: measured buildability beats preference; the brief's rules beat both. Every number below was re-run by node over `approved-words-<loc>.json` joined to `entriesFor(theme, loc)` (`lib/b2-common.js`, `B2_EXCLUDE` applied) across the 50 colour dirs of `scripts/worksheet-gen/cache/manifest.json`, distinct by key then word, `/^\p{L}+$/u`, da `policy_managed !== true`. Scripts: scratchpad `measure-306.js`, `measure-306b.js`.

## (a) Contradictions + resolutions

| # | P said | D said | resolved | why |
|---|---|---|---|---|
| 1 | base = one consonant banner (5-8 chips) + 8 cards 4x2 pic 110 + `answerBox` 100x52 | base = 2-row carpet (cell 64) + 6 cards 3x2 pic 128 + school-line lane 151x60 glyphH 30 | **D's carpet + 6 cards + lane** | one row gives the consonant away (the child only reads the vowel); a syllable needs a ruled lane, not a numeral box; en rime pages at 8 cards reach the floor once (`-an/-ock` 9), at 6 cards twice; G1 items floor is 6 |
| 2 | B shape = 8 full-width rows [pic][spaced letters + dots + arrow][writingRow]: read the strip, copy the word | B = carpet of open syllables (thin) or refuse the base and ship dictation + ladder | **B = the SAME carpet, cells = ten sound-out words** | P's strip prints the target on its own row (copy, and K-318 Blend's apparatus minus the choice); D's syllable carpet is thin (nl k 4/13); a carpet of lydrette ord is a real read-and-decide task (10 words to read, 1 to write) and carries the Nordic heads on the BASE, not on a ladder |
| 3 | 5 faces: circle · join · carpet colour · complex · syllabified | 5 faces: carpet colour · circle · join · dictation strip · reading ladder (+ reserve picture-choice) | **circle · join · carpet · complex · syllabified** | dictation = segmenting (write the first syllable unaided), en = K-221, B = G1-244 -> refused in 5 locales = not a face; ladder = open-ended word list, no verify, the fluency read already lives in Carpet; picture-choice = K-318 Blend in another apparatus (reserve only) |
| 4 | Nordic heads carried by the B base | Nordic heads carried by face (e) reading ladder | **base** | follows from 2-3 |
| 5 | F4 complex = PARAM `structure:'complex'` | no complex face | **PARAM**, with the condition stated: the base `build()` branches on `d.structure` (default `'simple'`) from day one, otherwise the face is CODE | brief rule 5 |
| 6 | two-source entries: OQ4 (refuse `< 3` or trust v1.1) | filter `total_agreed >= 3` first | **texPool = `'TeX'` in `sources_agreed` for every split-dependent face** | the G1-305 precedent (boundary-printing faces use texPool); it also removes the es `play-a` class structurally; in en/es/pt/fr/it/fi "lacks TeX" === `total_agreed 2` |
| 7 | fan knob named "fan lever", mechanism unstated | "family" index, wave pin UNKNOWN | **ONE contract `unitAxis`** = K-317's `letterAxis` generalised (`unitsPerType`, `unitOverrides`, `instance.unit`, `-u<unit>` deck id, `variant_id + '-' + unit`, `{UNIT}` from `units[].label`) | brief: state one contract; K-317 is not built, so the rename costs one word (OPEN 2) |
| 8 | fr digraph vowels are legitimate chips (`mou`, `mon`) as OQ6 | fr accented cells authored explicitly | **cells are literals; a digraph-vowel chip is a panel data decision**, rows may hold them (14 rows all-pool / 8 rows texPool qualify either way) | membership is exact equality, so no code changes |
| 9 | de: child writes `Ka` or `ka` = OQ3 | carpet lowercase, verify lowercases, instruction says "groß" | **D**, de panel confirms (OPEN 8) | Silbenteppich convention is lowercase; `displayWord` keeps the noun capital |
| 10 | sv/no doubles (`katt`) in the B base pool or excluded = OQ2 | not addressed | **`katt` = cluster by the `complex` regex -> Face 5**, base = no-cluster words | resolves by the simple/complex split, no ruling needed |
| 11 | F5 syllabified: 8 rows + 8-picture bank, every picture used | no such face | **6 rows + 8 pictures (2 never numbered)** | 8 rows x 72 leaves a 44-inner row (number box 44 impossible); 6 x 92 fits (704 <= 760); two distractors stop the last row solving by elimination |
| 12 | en F0 = "8 rimes" incl. `-ar` | 20 rime families incl. long-vowel | **7 short-vowel rimes** on the base; `-ar` (r-controlled) and 8 long-vowel families out (P's own trap) | measured (below) |
| 13 | strand "de Lesen, fr Lecture, fi Lukeminen" | not stated | **the `'Reading: Foundational Skills'` row** of `strand-names.ts:113` (de "Schriftspracherwerb: Grundlagen", fi "Lukemisen perustaidot") | P's strings do not exist in the file |
| 14 | manifest at `cache/manifest.json` (unqualified) | `image-cache/cache/manifest.json` | **`scripts/worksheet-gen/cache/manifest.json`** (`resolve.js:10-11`, `CACHE = path.join(__dirname, '..', 'cache')`) | D's path does not exist |
| 15 | sv slug `ljuda-ihop-ord`, no `lydrette-ord` (OQ1) | not addressed | **sv `ljuda-ihop-ord` · no `lydrette-ord` · da `lydrette-ord`** | K-318 owns sv `ljuda-ord`, no `lydering`, da `lyd-for-lyd`; taxonomy grep 2026-09-13: 0 collisions for all 11 proposed slugs; the same slug in two locales is legal (per-locale namespace) |

## (b) Claims removed as unverified or wrong

1. D §0 "880 pictured keys in the manifest" and D's pool row (de 725 · es 781 · pt 735 · it 795 · nl 752 · sv 697 · da 305 · no 608 · fi 806) and P's row (de 721 · es 779 · pt 733 · fr 663 · it 794 · nl 749 · sv 688 · da 304 · no 603 · fi 805): neither applied `B2_EXCLUDE` / the de-dupe the siblings use. Re-measured (matches K-317 FINAL): en 796 · de 703 · es 760 · pt 713 · fr 644 · it 770 · nl 732 · sv 668 · da 295 · no 584 · fi 780.
2. P §B F4 cluster counts (es tr 10 pl 8 fr 7 br 6 …; de tr 12 br 11 kr 10 fl 8 schn 7): true only for cluster-STARTING first syllables of any shape; exact open CCV first syllables are far fewer (es 34 total, >= 4: pl 6 tr 4 br 4). The face is defined on "cluster-starting", stated so, with texPool numbers.
3. D §0 "Nordic monosyllables by grapheme count 3/4/5: nl 137/128/11, sv 77/113/30, da 54/45/17, no 71/105/32": not reproducible under the one-letter-per-grapheme rule (nl 3-letter 49, 4-letter 61). Dropped; the design carries the simple / complex counts below.
4. P §A "nl 118 · sv 157 · no 137 · da 88 pictured 2-4-letter one-letter-per-sound words": 2-5 letters gives nl 118, 2-4 gives 112 / 151 / 134 / 86. Dropped in favour of the face pools.
5. D §5 `alphabetStrip` "as the visual model": kept as a model only; its cells are 28 px max (`components-b2.js:106`), unusable as the carpet.
6. D §7 (e) "no answer verify; data verify only": an open-ended reading list is outside the brief's open-ended exception (writing templates). Face rejected.
7. P §D gate 1 "OR the locale policy allows 2": removed; texPool is the rule.
8. Both: `scripts/verify-hub-type-rows.js` cited as if it existed; it does not (`ls` 2026-09-13; the two `verify-worksheets-hub-*.js` siblings do).
9. Both: `tools/gate-variation-distinct.js` treated as b3-ready; it reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (lines 31-36).
10. P §E strand strings (see a-13). D §2 "block 96" for a 1-row carpet: 64 + 24 = 88.
11. D §7 (c) stack "= 216" in a 216 inner: exact fit, no slack; pic reduced to 72 (210).
12. Both: every Jaccard number is an estimate; marked *est.*, `scripts/seo-landing/gate.js` measures.

## (c) Numbers re-measured (which won)

| quantity | P | D | measured (wins) |
|---|---|---|---|
| S rows >= 8 words & >= 3 vowels, all pool | es 13 pt 14 it 12 fr 14 de 8 fi 9 | n/a | es 12 (j 7) · pt 14 · it 12 · fr 14 · de 9 (+ s 8) · fi 9 |
| same under texPool | n/a | n/a | es 10 (c 62 p 37 m 24 b 23 t 23 l 19 g 17 r 13 s 11 d 8) · pt 12 · it 11 · fr 8 (p 18 m 17 c 15 b 14 r 12 l 10 t 9 ch 8) · de 9 (k 19 g 16 r 15 b 12 m 12 t 10 p 10 l 9 s 8) · fi 7 (p 27 s 21 k 18 v 17 l 13 m 13 h 8; t 7) |
| cluster-starting first syllables, texPool | see (b)2 | n/a | es 48 · pt 51 · it 92 · fr 25 (br 6 cr 4) · de 101 · fi 25 (closed instead: 274) |
| two-syllable pictured words (Join) | es 290 pt 277 it 263 fr 296 de 323 fi 297 en 341 nl 290 sv 294 no 265 da 120 | n/a | en 341 · de 326 · es 291 · pt 278 · fr 296 · it 263 · nl 292 · sv 298 · da 120 · no 268 · fi 297 (all pool; texPool subset UNKNOWN exact, OPEN 5) |
| 2-3 syllables <= 10 letters (Syllabified) | es 570 pt 547 it 563 fr 482 de 454 fi 519 en 470 nl 396 sv 418 no 362 da 175 | n/a | all pool within 1-8 of P; **texPool**: en 182 · de 454 · es 436 · pt 420 · fr 209 · it 469 · nl 397 · sv 403 · da 175 · no 366 · fi 442 |
| B simple (2-4 letters, no cluster, one letter per grapheme) | nl 48 sv 52 no 28 da 35 | n/a | nl 48 (a 16 o 13 e 9 i 5 u 5) · sv 52 (å 10, a 7, ö 7 …) · no 28 (å 7 max) · da 35 (å 7 max) |
| B complex (cluster, <= 5) | nl 63 sv 99 no 94 da 50 | n/a | nl 70 (a 29 o 15 e 14) · sv 121 (a 31 o 22 ä 16 i 13 ö 13 u 11 e 9) · no 121 (a 33 o 24 e 23 i 15 u 9 ø 8) · da 60 (a 15 i 11 o 9 e 9) |
| en rimes >= 3 pictured | 8 (`-an -ock -ug -at -og -ar -and -ed`) | 20 families | 16 total; **short-vowel 7**: -an 5 (swan van can fan pan) · -ock 4 · -ug 4 · -at 3 · -og 3 · -and 3 · -ed 3; long-vowel 8 (-ake -oat -ain -ee -ove -ose -ail -ouse), r-controlled -ar 3 |
| en blend words | 36 short-vowel / 61 any | n/a | 29 short-vowel closed (cr 5 gr 3 sl 3 sw 2 bl 2 br 2 dr 2 …) / 70 any |
| texPool share | 2-source: en 341/796 fr 356/663 es 173/779 pt 156/733 it 121/794 fi 104/805 | n/a | `total_agreed < 3`: en 341 · fr 346 · es 168 · pt 152 · it 117 · fi 101 · de nl sv da no 0 (texPool en 796 because count-1 words carry TeX) |
| da policy_managed | strict 88 est. | n/a | absent 402 / true 392 / false never; pictured strict 295 |
| es `playa` | `play-a` (OQ5) | n/a | key `beach`, `['play','a']`, rule + vocab-phonics-syl, `tex_split ['pla','ya']`; 12 keys in the class (listed in §5 of the design) |

## (d) OPEN items

**Engineer**
1. Measure the real body height (the 760 figure) and the widest Baloo 2 cell advance at 30 / 26 px (`swan`, `clock`, `gris`, `kö`); gate rule 11 asserts advance <= cellW - 8. Render base x 11 exemplars at d2 before any panel work.
2. Build `unitAxis` once for K-317 and G1-306 (enumerate loop, `deckIdFor`, `instanceSeed`, `render-instance`, `manifest.variant_id`, `{UNIT}` in `emit/deck-html.js`); K-317 adopts the name (`letters` = `units`, `U`/`L` = derived labels). Until then only the exemplar deck per face ships.
3. Write `templates/components-b3.js` (`syllableRow`, `syllableCarpet`, `syllableLane`, `syllableJoin`, `colourRing`, `numberedBank`) and `lib/b3-picture-index.js`; assert the BW skip on the 9 cached `<theme> bw` dirs and `excluded()`.
4. Generalise or clone `tools/gate-variation-distinct.js` for b3 (a `waves/wave-b3-en.json` + a ROWS source); poison with Complex at `structure:'simple'`.
5. `tools/gate-syllable-reading-data.js` with the 13 rules + poisons of §5; report the texPool Join pools per locale (count 2 AND TeX), UNKNOWN exact today.
6. Mono-print proof of the Carpet face (6 `codeColors` rings reduce to greys; the child colours cells, so legibility of the RING is what matters); render one mono PDF.
7. Write `scripts/verify-hub-type-rows.js` (6 rows per key per locale; poison: 5 rows, wrong `coordinate.type`) and `tools/register-b3-taxonomy.js` (`syllable-reading`: letters, 6-8, "Read the Syllables").

**Panels**
8. de: the child writes `Ka` (noun capital) over a lowercase `ka` chip; confirm, and whether `au ei eu` are base-row cells.
9. sv/no/da: confirm the head phrases (`Ljuda ihop ord`, `Lydrette ord: les og skriv`, `Lydrette ord: læs og skriv`) against K-318's titles in the same locale; check every title noun for the definite-form trap.
10. da: author the per-word whitelist (`ræv`-class) over the strict pool; no/sv/da base pages are seed-only (no vowel reaches 8) unless the panel widens `simple`.
11. fr: Complex has ONE page (br 6 + cr 4 texPool); re-target to syllabes inverses / digraph vowels or ship one page.
12. Any locale refusing a face: the reserve "which picture starts with it" exists as a rejected-by-default design; the panel must state why the refused face fails before the reserve is opened.
13. en: a long-vowel family face (`-ake -ee -oat -ain -ose -ail -ove -ouse`, 8 rimes >= 3) is a future candidate outside the six; not built now.
14. All: 6 titles as genre heads, 6 instructions as the child's sentence, `units[].label` literals; the EN source is a SOURCE TO AUDIT.

**Pipeline**
15. `approved-words-es.json`: the rule syllabifier treats `y` as a coda (`play-a`, `hay-a`, `cray-ón`, `pa-pay-a`, `ray-a`, 12 keys, all `total_agreed 2` with TeX disagreeing). Fix the es rule's `y` handling, re-run the gate; until then the texPool rule and the per-key `ban` hold. Also audit `notes.tex_disagreed_with_rule` in the other five flat-chunk locales (es 210 whole-file) for similar single-letter classes.
16. `data/b3/*` and `tools/apply-b3-locale.js` / `validate-b3-draft.js` are owned by the first b3 design to build (K-318 critic OPEN 5); this file's rules join that validator.

## (e) Quality verdict (a critical first-grade reading teacher)

The base is the page I would actually use: the child reads ten real pieces aloud, then has to READ to find the right one, and writes it on a proper line, with nothing given away on the card. The six faces are six different lessons (recognise, write, join, read-and-colour, clusters, longer words), not six titles, and the Nordic pages finally read lydrette ord instead of copying them. Weak spots I would watch: the fr and en pools are thin under the TeX rule (fr Complex one page, en two base pages), and a carpet cell that no picture uses must never be more than a third of the carpet or the child stops trusting it.
