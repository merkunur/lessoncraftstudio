# K-324 `picture-word-cards` (K) : pedagogy + content pass (2026-09-14)

(m) = measured 2026-09-14 by node over `lib/b2-common.js entriesFor` x the 50 colour dirs of `cache/manifest.json` (BW excluded by the localized marker), `data/b2/articles.js ARTICLES`, `approved-words-<loc>.json`, `frontend/content/seo-landing/<loc>.json`, `topics-taxonomy.json` (scratch `k324-measure*.js`, read-only). *est.* = not rendered; every px width is a glyph-count rule the engineer measures in the real render pipeline (README font trap). No em-dashes.

**Boundary (load-bearing).** A MATERIALS SHEET: the child cuts, the teacher runs a routine with the cards. Nothing is answered in pencil, so there is NO `verify()` on any face; `qa/lints.js` + the draft validator + a structural node gate (D) hold it. K-225 draws a line word-to-picture; K-235 sorts into bins; K-284 traces; G1-244 writes with no model; K-288 CIRCLES an article; the K-287 family writes plurals; G1-305 PRODUCES a split. No face here asks for any of that.

## A. Identity

| field | value |
|---|---|
| id / key / band | `K-324` / `picture-word-cards` / K. F6 bands G1 (`G1-311+ TBD by the emitter`); F2-F5 `K-325+ TBD`. `default_subject: letters`, `default_age_range: 5-7`, `assetClass: icon-placement`, `exerciseType: picture-word-cards`. `apps.*` + `axes['exercise-type'].*` ABSENT (m): register (shape of `apps['picture-vocabulary']`, m) + slug/name x11. |
| theme axis | `themeAxis:{applicable:true, minNouns:8, excludeBw:true}`. **All 50 colour themes carry >= 8 label-safe distinct nouns in all 11 locales** (m; floor: post office 8, reptiles and Amphibians 8, tree 9, tools 10). F3/F4/F6 refuse per (theme, locale) by their own pool rule, never the type. |
| fan lever | THEME via the wave (`themesPerType` / `themeOverrides`, `enumerate.js:98-163`, m); the demand tail is per theme. F5 adds the partner language via `unitAxis` (README ruling). |
| non-noun themes (m) | emotions 14/14 adjectives · colors 14 of 19 · activities 10 of 34 verbs · weather 6 of 19 · winter 3 of 27 (de gender absent = the tell). Base/F2/F5 print them (a "Gefühlskarten" deck is a real use, K-319 §1); F3/F4/F6 are noun-only and refuse emotions + colors. |
| CCSS (en only, honest) | base, F2, F5: readiness, NO code (a material; prose may say "supports L.K.6"); F3: readiness (a/an = L.1.1.h, G1, not claimed); F4: L.K.1.c (K-287 precedent); F6: RF.1.3.e. No `targetUrl`. Non-EN names the national framework. |
| strand (landing) | en ESL/ELD vocabulary · de DaZ Sprachförderung, Wortschatz · es SEP Lenguaje y comunicación · pt BNCC EI "Escuta, fala, pensamento e imaginação" · fr "Mobiliser le langage" / FLE · it "Acquisizione ed espansione del lessico" · nl SLO Woordenschat / NT2 · sv Lgr22 "Ord och begrepp" · da Fælles Mål "Sprog og sprogbrug" (panel) · no LK20 "Språket som system og mulighet" (panel) · fi EOPS "Kielen rikas maailma" / S2 (panel). `strand-names.ts 'Vocabulary Acquisition and Use'` has en/de/fr/es/pt/it/nl/sv, NO da/no/fi (m): those panels author the row (README items 8, 10). |

| loc | genre head | ASCII slug (free in every axis, m) | K level key (m) | card label rule |
|---|---|---|---|---|
| en | Picture word cards / flashcards | `picture-word-cards` | `kindergarten` | lowercase, no article |
| de | Bildkarten (Wort-Bild-Karten, DaZ) | `bildkarten` | `vorschule` | nouns keep the vocab capital; adjectives/verbs LOWER (`Wütend` -> `wütend`: `displayWord` is wrong for non-nouns; key case on gender presence) |
| es (MX) | Tarjetas de vocabulario | `tarjetas-de-vocabulario` | `preescolar` | lowercase |
| pt (BR) | Fichas de leitura | `fichas-de-leitura` | `educacao-infantil` | panel: `lower` or `upper` (caixa alta) |
| fr | Imagier | `imagier` | `maternelle` | lowercase; `l'` only on F3 |
| it | Vocabolario illustrato | `carte-illustrate` (**`vocabolario-illustrato` COLLIDES with `axes.exercise-type.picture-vocabulary.slug.it`**, m) | `infanzia` | lowercase |
| nl | Woordkaarten (NT2) | `woordkaarten` | `kleuters` | lowercase; `ij` intact |
| sv | Bildkort (bildstöd) | `bildkort` | `forskola` | lowercase INDEFINITE (`katt`, never `katten`) |
| da | Billedkort | `billedkort` | `boernehaveklasse` | lowercase indefinite |
| no | Bildekort | `bildekort` | `1-trinn` | lowercase indefinite, bokmål |
| fi | Kuvakortit | `kuvakortit` | `esikoulu` | nominative; no article ever |

Corpus check (m): "flashcard" 7 en landings, "picture cards" 24, "Bildkarten" 18 de, "billedkort" 28 da, "bildekort" 42 no, "kuvakortit" 32 fi, **0 in any title/h1** (all in `alphabet-train|letter-hint` prose); `coordinate.type:'picture-vocabulary'` landings: 0 in every locale. The heads are unclaimed.

## B. The six faces

**Shared sheet geometry.** `.ws-page` inner 675; body floor 722. Sheet = top strip 30 (scissors glyph left; an authored legend literal right, Nunito 700 16, only when declared) + card block 692 = 4 rows x 173. Base grid 2 x 4: card 337 x 173 (89 x 46 mm), padding 10 -> inner 317 x 153. **Cut lines = ONE dashed SVG overlay per sheet** (outer frame + 1 vertical + 3 horizontal, `T.grid` 2.5 px, dash 8 6, K-240's line style): one cut per line, never a per-card border. Scissors = a `components-b3` copy of K-240's `scissorsGlyph` (module-local there; K-240 untouched). Cards `T.white` on the `T.cream` sheet. Every card stamps `data-ws-content data-lcs-card="<kind>" data-lcs-vocab data-lcs-word`. Picture = `fileUri(theme, noun)`, colour dir only. Word Baloo 2 700 ink; size by glyph count: <= 14 glyphs 26 px (line 30); 15-18 glyphs 22 px; wrap at a SPACE to 2 lines (22/26; picture 96 -> 88); a single token > 18 glyphs REFUSED (`maxSegment:18`; m: 3 catalogue entries, the `Argentinosaurus` class). Multi-word singulars: es 75 / fr 89 / it 63 / pt 59 (m), so the 2-line rule is load-bearing.

| face | EN title (<= 70) | classroom use | card contents | d2 config (d1 / d3) | kind | gate | refusals | query face |
|---|---|---|---|---|---|---|---|---|
| **base** | Picture Word Cards: Cut Out and Name | NAME the picture, read the word: word wall, pocket chart, show-and-say | picture 96 + word; 8 cards 2x4 | `{cards:8, cols:2, rows:4, pic:96, kind:'word'}`; d1 `{cards:4, cols:2, rows:2, pic:200, wordPx:32}`; d3 = F2 | base | 1 picture + 1 word per card; 8 distinct words; no B&W | none | bare head + theme |
| **F2 Twin Set** | Picture Cards and Word Cards: Matching Pairs | MATCH / Memory: the pair separated ("Wort zum Bild legen") | top block 8 picture cards 4x2 (168 x 173, picture 110); bottom block 8 word cards 4x2 in a DERANGED order; font <= 8 glyphs 26 / 9-11 22 / 12-14 19 | `{kind:'twin', cards:8, cols:4, blockRows:2, pic:110, maxSegment:14}` = base d3 re-pointed (a GAME needs the pair apart: a different use, rule 2 met) | PARAM | 8 + 8, vocab keys 1:1; deranged; each word once | none | "matching cards / memory" |
| **F3 Article Cards** | Word Cards with the Article: a or an | say the noun WITH its article (DaZ der-die-das, NT2 de/het, sv en/ett); gender colour where a locale uses one | picture 88 + line `[dot 14][article] [noun]`; > 19 glyphs -> article line over noun line; legend in the strip | `{kind:'article', cards:8, cols:2, rows:4, pic:88, level:3, dots:<locale>}`; d1 4 cards; d3 INDEFINITE article where the locale has one (fr un/une, it un/una) | CODE | chip === `ARTICLES[loc].keyFor(e,{level:3})`; dot === `chipDots[key]`; nouns only | **fi REFUSED** (no articles; re-targeting to plurals duplicates F4; fi rows = 5). Themes: colors + emotions everywhere; fr post office 7 / reptiles 7 / tools 7 (elision, m); en tree 6 (`EN_AMBIGUOUS`, m) | "der die das Bildkarten" / "a or an cards" |
| **F4 One and Many** | One and Many: Singular and Plural Cards | NUMBER routine: 1 / 3 pictures with both forms (fi yksikkö/monikko) | 4 rows = pairs: left 1 picture 88 + singular; right 3 clones 64 (3x64 + 2x8 = 208 <= 317) + plural; no numeral | `{kind:'plural', pairs:4, cols:2, rows:4, pic:88, clonePx:64, clones:3}`; d1 2 pairs (pic 160/96); d3 minLetters 6 | CODE | `countable(e)`; nouns only; row keys equal; plural text === vocab `[1]` | colors (it 3 pairs), emotions (m); else 48 x 11 | "singular plural cards" / "Einzahl Mehrzahl Bildkarten" |
| **F5 Bilingual Cards** | Bilingual Picture Cards: English and Spanish | L2 with L1 support: DaZ zweisprachige Bildkarten, NT2 met vertaling, FLE, BR "flashcards inglês", US dual language | picture 84 + host word 26 ink + partner word Nunito 700 20 `T.teal`; legend "Deutsch · Englisch" | `{kind:'bilingual', cards:8, cols:2, rows:4, pic:84, partner:<unit>}`; exemplar partner per locale (10 non-en -> `en`, the K-3 foreign language everywhere; en -> `es`); d1 4 cards; d3 twin blocks host / partner | CODE + `unitAxis` | partner text === `vocab[key][partner][0]` in the PARTNER's case; no ordered locale pair < 8 on any theme (m); 0 keys miss a locale (m) | none | "bilingual flashcards" / "zweisprachige Bildkarten" |
| **F6 Syllable Cards** (G1) | Syllable Cards: Read the Word in Parts | DECODING scaffold: the split PRINTED (fi tavutettu, de Silbenbögen-Karten, pt fichas silabadas) | arc locales: picture 76 + `syllableWord` (cell 30, <= 10 letters) 42 + `syllableArcs({mode:'printed'})` 26 = 150 <= 153; hyphen locales: picture 92 + `ka-me-ra` 26 px | `{kind:'syllable', cards:8, cols:2, rows:4, pool:'tex', minCount:2, maxCount:4, maxLetters:10, mark:<data>}`; d1 count 2, 4 cards; d3 count 3-4 | CODE (G1-305's `syllableWord` / `syllableArcs`, NEW, absent, m) | word in `approved-words-<loc>` with `'TeX'`, `count >= 2`; text minus marks === `split.join('')`; de capital in cell 1; da strict pool | **texPool >= 8**: 11/11 on 9 themes (animals, At the Supermarket, accessories, activities, around the house, birds 2, camping, clothing, Things That Fly); >= 7 locales on 32; themes passing per locale en 14 · de 45 · es 45 · pt 43 · fr 23 · it 46 · nl 38 · sv 37 · da 15 · no 34 · fi 48 (m). Pin `animals` (en 9, da 9) | "syllable cards" / "Silbenkarten" / "tavutetut kuvakortit" |

Level: K key (A) on base-F5; F6 the locale's G1 key (`grade-1` / `1-klasse` / `primer-grado` / `1o-ano` / `cp` / `classe-prima` / `groep-3` / `ak-1` / `da:1-klasse` / `2-trinn` / `1-luokka`, all in the LEVELS map, m). **No face has a verify(); all six are materials** with the structural gate (D). `gate-variation-distinct.js`: each face's `kind` differs from base `'word'` at d2.

**Rejected non-moves (each from the brief, judged).** (1) Theme swap. (2) **Letter-of-the-week cards**: themeless + per-letter = a K-317 variation (K-317's best (theme, letter) pool is 12); rejected here. (3) **Writing-line cards** (copy the printed word) = K-284 d3 (`caption` model + empty trios, `traceLane:false`, `K-284-word-tracing.js:70-78`), and a written answer is a task. (4) **First-letter blank** = K-224 / K-221, a task. (5) **Sorting cards**: base cards from two themes ARE a category game; K-235 owns the sort task; a theme mix is a theme swap. (6) **Big cards** = d1, a size. (7) **Block capitals** = `cardCase:'upper'`, per-locale data on the base (pt), never a face. (8) **Picture-only cards with a ruling** = G1-244. (9) **Syllable-count dots** = K-233. (10) **Definite-form cards** (sv/da/no `katten`): 8 x 50 authored forms the vocab lacks; at most an F3 d3 data option. (11) **Two-colour syllables** (Mildenberger) = `mark:'colour'` inside F6.

## C. Native rebuild x11

Gender colour: de blue / red / green (der / die / das) is the DaZ + Montessori staple, already encoded (`ARTICLES.de.chipDots = codeBlue codeRed codeGreen`, m). Elsewhere UNKNOWN as a school convention: default `dots:false` (article in ink); a panel may declare one. `no` vocab has f = 0 (m 1075 / n 200): `ei` cannot come from data; the card offers `en`/`et` (`ARTICLES.no`, m). fr elision nouns 194 of 1278; it lo/l' 256 of 1278 (m).

| loc | base label | F3 article | countable (F4, m) | panel authors | refusals | traps |
|---|---|---|---|---|---|---|
| en | `cat` | a / an by SOUND (`EN_EXCEPTIONS`; `EN_AMBIGUOUS` refuse); no colour | 1119 of 1325 | 6 titles + instructions; F5 partner "Spanish" | F3 tree 6 | "flashcards" is the head; no "worksheet" in a title |
| de | `Katze`, `wütend` | der / die / das + dots; legend "der = blau · die = rot · das = grün" | 946 (umlaut plurals are DEFAULT, K-287 lesson) | titles in the DaZ register, legend, "Englisch" | gender-less nouns dropped | never `displayWord` on adjectives; 18-glyph compounds at 22 px *est.* |
| es (MX) | `gato` | el / la; colour UNKNOWN | 1122 | titles ("tarjetas", never "fichas") | colors, emotions | 75 multi-word: wrap at the space, never hyphenate |
| pt (BR) | `gato` / `GATO` (panel) | o / a; colour UNKNOWN | 1140 | titles, `cardCase` | colors, emotions | pt-BR forms; F6 head "silabadas" |
| fr | `chat` | le / la; vowel/h nouns print `l'` at level 3 or are REFUSED (`elision`, K-288 default refuse); colour UNKNOWN | 1114 | titles ("fiche" banned), `elision`, legend | post office 7, reptiles 7, tools 7 under refuse | h aspiré undecidable from data: h-initial always refused |
| it | `gatto` | il / lo / la / l' (`itKey` level 3); colour UNKNOWN | 1024 | titles ("scheda" banned), legend | keyed-null nouns | slug is NOT `vocabolario-illustrato` |
| nl | `kat` | de / het; colour UNKNOWN | 1155 | titles (NT2), legend | colors, emotions | `Ambulanceverpleegkundige` 24 glyphs refused by `maxSegment` |
| sv | `katt` | en / ett; colour UNKNOWN | 973 | titles (never "grupp"), legend | colors, emotions | INDEFINITE only; `bana` never `banan`; NSR |
| da | `kat` | en / et; colour UNKNOWN | 1008 | titles; F6 strict pool | F6 on 15 themes only | NSR |
| no | `katt` | en / et (no `ei`; the panel may veto F3 -> rows 5) | 1009 | titles bokmål, legend | see left | NSR |
| fi | `kissa` | REFUSED | 1134 (`kissat`) | 5 titles; partner "englanti"; F6 `mark:'hyphen'` | F3 always; rows 5 | nominative only; titles are whole literals |

Panels author `strings` (titles <= 70 carrying the genre head, no worksheet-word, unique in band; instructions <= 150, the TEACHER's sheet sentence since the child does not answer), `legend` literals, `cardCase`, `articleStyle`, `partnerExemplar` + 10 partner NAMES, `syllable.mark`. Three-agent native panel per locale (§A.13.48); EN handed over as a SOURCE TO AUDIT; every panel OPENS every picture on its pinned theme.

## D. Data + gates

`data/b3/picture-word-cards.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (absent, m; the `apply-b2-locale.js` pattern; `data/` gitignored, `git add -f`):
```
PICTURE_WORD_CARDS[loc] = {
  cardCase: 'lower'|'keep'|'upper',            // 'keep' = de nouns only; non-nouns always lower
  articleStyle: { enabled, level:3, dots: ['codeBlue','codeRed','codeGreen'] | null,
                  elision: 'print'|'refuse', legend: 'der = blau · die = rot · das = grün' | null },
  plural: { enabled:true, clones:3 },
  bilingual: { partnerExemplar:'en', partnerNames:{ en:'Englisch', … }, legendSep:' · ' },
  syllable: { enabled:true, mark:'arc'|'hyphen'|'dot'|'colour', hyphen:'-', strictPool:false|true },
  twinLayout: { cols:4, blockRows:2 },
  strings: { 'K-324':{title,instruction}, F2..F6:{title,instruction} } }
```
`plural.clones` and `twinLayout` are locale-neutral. Render reads this file + `entriesFor` + `fileUri` + `ARTICLES[loc].keyFor` + (F6) approved entries pre-resolved at apply time.

**`tools/validate-b3-draft.js` (block; exit 1 on any):** (1) `cardCase` in enum, `keep` only in de; (2) fi `articleStyle.enabled:false` REQUIRED; `dots` are `codeColors` keys with `length === ARTICLES[loc].chips.length`; `legend` iff `dots`; (3) `partnerExemplar` is another of the 11; `partnerNames` has all 10; (4) `syllable.mark` in enum; fi `hyphen`; da `strictPool:true`; (5) 6 (fi 5) `{title, instruction}`: <= 70 / <= 150, no worksheet-word, unique in band; F3 strings absent in fi; (6) no `{` in any literal (no slots on this type).

**`qa/verify-b3-picture-word-cards.js` (structural gate, node over the rendered DOM, faces x 11 x pinned theme at d2 under 3-line chrome = 722):** `qa/lints.js` clean; card count === config (base 8, twin 16, plural 8, syllable 8); **each card exactly one `img` with `naturalWidth > 0`** (twin word cards exactly zero), `src` in a colour dir, no `BW|SW|BN|NB|ZW|SH|PB|MV|SV`; no `data-lcs-word` twice per block; `.ws-icon` >= 56 (>= 44 on F6); **twin**: picture-card vocab multiset === word-card multiset, no picture card in its word's column-row; **article**: text === `chip + ' ' + word`, chip === `chips[keyFor(e,{level:3})]`, dot fill === declared colour; **plural**: row keys equal, left 1 image, right exactly 3, text === plural; **bilingual**: line 2 === partner form; **syllable**: text minus marks === `split.join('')`, arcs === `count`, entry carries `'TeX'`; overlay = 1 vertical + 3 horizontal lines (twin 3 + 3); one `[data-lcs-scissors]`; every word `<span>` `scrollWidth <= clientWidth` (the only font measurement, in the real pipeline); 20-seed sweep: no repeated word, twin deranged every seed.
**Poison (each must FAIL; the correct draft is the control):** P1 base card with its `img` removed · P2 twin word card swapped for another theme's noun (1:1 broken) · P3 theme `zoo animals bw` · P4 de `Wütend` · P5 fi F3 `enabled:true` · P6 de `die Hund` · P7 F4 right card with 2 clones · P8 F5 partner line in the host language · P9 F6 en word from the non-TeX pool (`ac-orn`) · P10 a 24-glyph nl noun forced through (`scrollWidth > clientWidth`) · P11 one word on two base cards · P12 twin block in identity order.

## E. SEO

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170) | coordinate |
|---|---|---|---|
| base | "Picture Word Cards: Animals" · "Bildkarten Tiere: Wort-Bild-Karten zum Ausschneiden" · "Woordkaarten dieren" / "Tarjetas de vocabulario: animales" · "Fichas de leitura: animais" · "Imagier des animaux" · "Vocabolario illustrato: gli animali" / "Bildkort djur" · "Billedkort dyr" · "Bildekort dyr" · "Kuvakortit: eläimet" | Eight picture cards with the word under each, to cut along the dotted lines and name | `{type:'picture-word-cards', mode:'base', theme:'animals', level:<K key>}` |
| F2 | head + "matching pairs" / "Memory" / "parejas" / "memory-par" | Eight picture cards and eight word cards to cut out and match | `mode:'twin'` |
| F3 | "A or An: Word Cards" · "Der, die, das: Bildkarten mit Artikel" · "De of het: woordkaarten" / "El o la" · "O ou a" · "Le ou la" · "Il, lo, la" / "En eller ett" · "En eller et" | Each card shows the noun with its article, colour-coded, to cut out and say aloud | `mode:'article'` (absent in fi) |
| F4 | "One and Many: Singular and Plural Cards" · "Einzahl und Mehrzahl: Bildkarten" / "Singular y plural" / "Ental og flertal" · "Yksikkö ja monikko: kuvakortit" | Pairs of cards with one picture and three pictures and both word forms | `mode:'plural'` |
| F5 | "Bilingual Picture Cards: English and Spanish" · "Zweisprachige Bildkarten Deutsch Englisch" / "Tarjetas bilingües español inglés" / "Tvåspråkiga bildkort svenska engelska" · "Kaksikieliset kuvakortit suomi englanti" | Picture cards with the word in two languages, to cut out for language lessons | `mode:'bilingual-<partner>'` (partner inside the mode: `coordKey` = type|mode|theme; NEVER `coordinate.target`, which drops a landing out of the monolingual hub, `landing-content.ts:167-171`, m) |
| F6 | "Syllable Cards: Read the Word in Parts" · "Silbenkarten mit Silbenbögen" / "Tarjetas con sílabas" · "Fichas silabadas" · "Carte con le sillabe" / "Stavelsekort" · "Tavutetut kuvakortit" | Picture cards with the word printed in syllables to read part by part | `mode:'syllable'`, G1 key |

h1 = title; eyebrow = level; strand per A. JSON-LD `LearningResource`; `educationalAlignment` en only on F4 (L.K.1.c) and F6 (RF.1.3.e). Meta lead inherits `seo.words.free_printable` (README item 1).

**Non-cannibalisation** (3-gram Jaccard, `gate.js` FAIL >= 0.80; *est.*): base vs F2 0.35 (one card vs two blocks) · base vs F5 0.30 · F3 vs K-288 0.25 (article PRINTED to say vs CIRCLED as an answer) · F4 vs K-287 0.30 (both forms printed vs plural written) · F6 vs G1-305 0.30 (split printed vs drawn) · F6 vs G1-306 0.20 (a word in parts vs a syllable table) · base vs K-225 0.20 (cut-out material vs draw-a-line) · base vs K-235 0.15 · base vs K-284 / G1-244 0.15 (no pencil) · F5 vs the cross-language `Learn <X>` landings 0.15 (cards vs crossword/wordsearch/matching at `language-beginner`; 1,400 en landings carry `target`, m) · any face vs `/topic/<theme>/` 0.10. Boundary sentence on every landing: "a cut-out card set, nothing to write".

## F. Open questions + summary

1. Gender colours outside de: UNKNOWN per school system; default none; each panel rules once, in data.
2. `no` F3 offers `en`/`et` only (vocab f = 0); the panel accepts or vetoes F3 (rows 5).
3. Per-theme landings: the b2 precedent is ONE pinned theme per face (`themesPerType:1`, m) while the demand tail is per theme. Decide a per-type theme count (a `themesForType` knob, absent) + landings per (face, theme); `verify-hub-type-rows.js` then counts distinct faces, not landings.
4. Every px rule is glyph-count *est.*; the gate's `scrollWidth <= clientWidth` in the real pipeline is the measurement.
5. F6 depends on G1-305's NEW `syllableWord` + `syllableArcs`; build G1-305 first or ship F6 hyphen-only.
6. Hub rows: 6 x 11 = 66, minus fi F3 = **65**; 64 if no vetoes F3.

**Summary.** A cut-out card sheet, theme-fanned across all 50 colour themes (every theme clears 8 nouns in all 11 locales, m), no verify, a structural node gate. Six faces = six classroom uses: name (base), match (twin set, PARAM), say with the article (10 locales, fi refused), one and many, two languages (partner via `unitAxis`), read in syllables (G1, texPool 11/11 on 9 themes). Every card is a picture + a stored literal; the code never inflects; refusals are data.
