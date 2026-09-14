# K-324 `picture-word-cards` (K) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/K-324-pedagogy.md` + `_work/K-324-design.md`; every file, primitive and option below was read in the repo. (m) = re-measured by the editor 2026-09-14 (`k324-critic-measure.js`, read-only: `entriesFor` x 50 colour dirs; px by puppeteer from a `file://` page with the shell's `fonts.css`, Baloo 2 700 + Nunito 700 reported loaded). (p m) = the pedagogy pass's count, not re-run. Resolutions + open items: `_work/K-324-critic.md`.

**Boundary.** A MATERIALS SHEET: the child cuts, the teacher runs a routine with the cards. Nothing is answered in pencil, so NO face has a `verify()`; `qa/lints.js` + the draft validator + a structural node gate hold it. K-225 draws a line; K-235 sorts; K-284 traces; G1-244 writes; K-288 CIRCLES an article; K-287 writes plurals; G1-305 DRAWS a split; no face here asks for any of that.

## 1 Identity

| field | value |
|---|---|
| id / key / band | `K-324` / `picture-word-cards` / K. F2-F5 `K-325+ (TBD by the emitter)`; F6 `G1-311+ (TBD)`. `default_subject: letters`, `default_age_range: 5-7`, `assetClass: icon-placement`. `apps.*` + `axes['exercise-type'].*` ABSENT (m): register (shape of `apps['picture-vocabulary']`) + slug/name x11 before the wave. |
| theme axis | `themeAxis:{applicable:true, minNouns:8, excludeBw:true}`. Every (colour theme, locale) pool keeps >= 8 labels after the base refusal (m, 50 x 11, 0 below 8). F3/F4/F6 refuse per (theme, locale) by their own rule, never the type. Non-noun themes (emotions 14 adjectives, colors 14 of 19, activities 10 verbs; tell = `gender` null from `entriesFor`) print on base / F2 / F5 only. |
| fan lever | THEME via the wave (`themesPerType` / `themeOverrides`); F5 adds the partner language via `unitAxis` (README ruling). |
| CCSS (en only) | base, F2, F5: readiness, NO code; F3: readiness (a/an = L.1.1.h, not claimed); F4: L.K.1.c; F6: RF.1.3.e. No `targetUrl`. Non-EN names the national framework. |
| strand | `strand-names.ts 'Vocabulary Acquisition and Use'` has en de fr es pt it nl sv, NO da / no / fi (m): those panels author the row additively (README items 8, 10). |

| loc | genre head (title) | ASCII slug (free in every axis, m) | K level key (in LEVELS, m) | label case | article (F3) |
|---|---|---|---|---|---|
| en | Picture Word Cards (flashcards) | `picture-word-cards` | `kindergarten` | lower | a / an by sound; `EN_AMBIGUOUS` refused |
| de | Bildkarten (Wort-Bild-Karten, DaZ) | `bildkarten` | `vorschule` | nouns keep the capital; adjectives / verbs lower | der / die / das + colour dots |
| es (MX) | Tarjetas de vocabulario | `tarjetas-de-vocabulario` | `preescolar` | lower | el / la |
| pt (BR) | Fichas de leitura | `fichas-de-leitura` | `educacao-infantil` | lower; panel may set upper | o / a |
| fr | Imagier | `imagier` | `maternelle` | lower | le / la; elision refused; d3 un / une |
| it | Vocabolario illustrato | `carte-illustrate` (`vocabolario-illustrato` COLLIDES with `picture-vocabulary.slug.it`, m) | `infanzia` | lower | il / lo / la / l' (level 3) |
| nl | Woordkaarten (NT2) | `woordkaarten` | `kleuters` | lower, `ij` intact | de / het |
| sv | Bildkort (bildstöd) | `bildkort` | `forskola` | lower INDEFINITE (`katt`, never `katten`) | en / ett |
| da | Billedkort | `billedkort` | `boernehaveklasse` | lower indefinite | en / et |
| no | Bildekort | `bildekort` | `1-trinn` | lower indefinite, bokmål | en / et (no `ei`: vocab f = 0, m) |
| fi | Kuvakortit | `kuvakortit` | `esikoulu` | nominative | REFUSED |

Heads from `_PANEL-FINDINGS.md` §20 (0 hits in any live title / h1, p m). **Case rule:** `e.gender` present -> `cardCase` via `displayWord(w, loc)` (`KEEP_CASE = {de}`, `lib/b2-common.js:15`); `e.gender` null -> `displayWord(w, loc, 'lower')` always (the third `mode` argument exists, `:17-20`; de `Wütend` -> `wütend`). pt `upper` = `toLocaleUpperCase('pt')` (`displayWord` has no upper mode).

## 2 The base sheet

**Concept.** Eight white cards edge to edge, separated only by dashed cut lines, picture above word, nothing else. One straight stroke per line; the teacher laminates and runs the routine (name it, read it, pocket chart, word wall).

**Layout d2 (body 722, `.ws-page` inner 675).** Block = strip 30 + sheet 692 = 722, `flex:0 0 auto; margin:auto 0` inside `.ws-body` (`page.css:92`): under one-line chrome (814) the 92 px of slack splits above and below; nothing stretches, so the overlay is fixed px.

```
 [scissors 26]                        der = blau . die = rot . das = gruen   strip 30 (legend only when declared)
 +----------------------------------+----------------------------------+  y 30   outer frame, dashed T.grid 2.5, dash 8 6
 |           [picture 104]          |           [picture 104]          |
 |          ( Fledermaus )          |           ( Katze )              |  cell 337 x 173 (89 x 46 mm)
 +----------------------------------+----------------------------------+  y 203  cut 1
 |                                  |                                  |
 +----------------------------------+----------------------------------+  y 376  cut 2
 |                                  |                                  |
 +----------------------------------+----------------------------------+  y 549  cut 3
 |                                  |                                  |
 +----------------------------------+----------------------------------+  y 722
                              vertical cut at x 337
```

- Sheet 674 x 692, CSS grid `gap:0`, `margin:0 auto`. **Cut lines = ONE `cutLines` SVG overlay** (`position:absolute; inset:0; pointer-events:none`): `roundedRect` r 0 frame + 1 vertical + 3 horizontal `line`s, `T.grid` 2.5, `dash:'8 6'`, butt caps; one element per cut keeps the dash phase continuous (per-card borders restart at every edge). Style = K-240's `2.5px dashed #C8BFAE` (`types/k/K-240-cut-and-paste.js:85`).
- Scissors: `scissorsGlyph(26)`, byte-copy of `K-240-cut-and-paste.js:16-25` (`data-lcs-scissors`, `inkSoft`), x 0 of the strip; exactly one.
- Cell `.ws-cutcard`: `T.white`, no border, `padding:12px` (3 mm cut margin), flex column centred, `gap:6`, `overflow:hidden`. Inner 313 x 149.
- Picture: `.ws-icon` 104 (K floor 56), `fileUri(theme, noun)` (`image-cache/resolve.js:33`, 512 px derived copy), colour dirs only.
- Word: `wordPlate` `<span class="ws-wordplate">` `T.cream` r 10 `padding:3px 10px`, Baloo 2 700 26 / line 30, `T.ink`, `nowrap`; plate 36, `max-width:313` (text <= 293). Stack 104 + 6 + 36 = 146 <= 149.
- **Label rule (m; the design's measured caps win over the pedagogy's `maxSegment:18`).** Baloo 2 700 26 = at most 14.38 px per glyph on the densest catalogue token (`Wassermelone` 172.6 / 12). **<= 20 glyphs = 26 px, one line** (20 x 14.38 = 287.6 <= 293; `pachycephalosauruses` 268.6 passes). **21-28 glyphs multi-token = 24 px, two lines**, wrap at the last space, each line <= 16 glyphs (`campanilla de invierno`, `amerikkalainen jalkapallo`; catalogue-wide es 1 / fr 2 / fi 1); plate 58, picture 84: 84 + 6 + 58 = 148. **Single token > 20 glyphs REFUSED**: catalogue-wide exactly one, nl `ambulanceverpleegkundige` 24 (325.2). An 18 cap would refuse three fitting words (sv `ambulanssjukvårdare` 19 = 252.9, da `beskyttelsesbriller` 19 = 221.3, pt 1). Longest label per locale at 26 is 241.8 (`pachycephalosaurus`), all < 293. Glyph counts pre-filter; the gate's `scrollWidth <= clientWidth` in the real pipeline is the truth.
- Stamps: sheet `data-ws-content data-lcs-sheet="base" data-lcs-cols=2 data-lcs-rows=4`; card `data-lcs-card="word" data-lcs-vocab data-lcs-word`; plate `data-lcs-lines`.

**Ladder** (guards key on `kind` / `cols`, never the level index):

| key | d1 (wall display) | d2 (ships) | d3 = F2 twin |
|---|---|---|---|
| kind / cards / cols / rows | word / 4 / 2 / 2 | word / 8 / 2 / 4 | twin / 8 + 8 / 4 / 4 |
| cell / pad / inner | 337 x 346 / 16 / 305 x 314 | 337 x 173 / 12 / 313 x 149 | 168 x 173 / 10 / 148 x 153 |
| pic / wordPx / plate | 220 / 32 / 44 | 104 / 26 / 36 | 120 (pictures) / tiers 26-18 (words) |
| one-line cap | 15 glyphs at 32 (269 <= 285); 16-20 at 26 | 20 | 13 per line, <= 2 lines |
| refusal / overlay | token > 20 / frame + 1 v + 1 h | token > 20 / frame + 1 v + 3 h | token > 13 / frame + 3 v + 3 h |

**Pool, in order.** `entriesFor(theme, loc)` (`B2_EXCLUDE` applied) -> `distinctByWord` on the display label -> `labelLines` (null = refuse) -> `sampleEntries(rng, pool, 8, 'K-324')` (throws below 8; refusals recorded, never filled).

**Reused (exact).** `svgRoot roundedRect line circle esc` (`primitives/_svg.js:31/42/53/63`; `roundedRect`/`line` take `dash` + `data`) · `fileUri` · `entriesFor displayWord countable distinctByWord sampleEntries KEEP_CASE` (`lib/b2-common.js`) · `ARTICLES[loc].chips / chipsD3 / keyFor / chipDots / refuseKeys` (`data/b2/articles.js` + `articles-overrides.js`) · `iconRows({theme, noun, n, perRow, iconPx, rng})` (`templates/components.js:10`) · G1-305's NEW `syllableWord` + `syllableArcsForWord` (`components-b3.js` + `primitives/syllable-arcs.js`, both ABSENT today, m) · tokens + `codeColors` (`_tokens.js:32-44`). **NOT used:** `cardGrid` / `.ws-card` (gap, cream, border, badge numerals = a problem card), `articleChips` (three chips = a choice; only its dot idiom is copied, `components-b2.js:49-51`), `mirrorGroups` (mirrors the clones), `wordTiles`, `countBadge`, `wordBank`, `answerBox`.

**NEW in `templates/components-b3.js`** (inline scoped CSS, no `page.css` edit): `scissorsGlyph(size=26)` · `cutLines({w, h, cols, rows})` (`data-lcs-cut-frame`, `data-lcs-cut-v=k` at `x = k*w/cols`, `data-lcs-cut-h=k`; root `data-lcs-cutlines aria-hidden`) · `cardSheet({cards, cols, rows, cellW, cellH, pad, kind, legend=null})` -> `<div class="ws-cardsheet" data-ws-content data-lcs-sheet data-lcs-cols data-lcs-rows>` = strip 30 + `position:relative` grid + `cutLines` · `cutCard({inner, kind, vocabKey, word, twin=null, pad})` -> `<section class="ws-cutcard">` · `labelLines(word, {cap, maxLines})` -> `[lines]` or `null` (greedy wrap at spaces, `[...s].length` glyphs, never inside a token) · `wordPlate({lines, px, family, color, dot=null})` (`dot` = inline 16 x 16 svg `circle r 7 fill codeColors[dot] stroke T.ink 1`) · `wordCard` · `pictureCard` · `wordOnlyCard` · `articleLabel` · `pluralPair` · `bilingualLabel` · `twinSheet`.

**Alternatives.** Alt A 2 x 3 (89 x 61 mm, picture 140): rejected as base, the routine floor is 8 cards (a pocket-chart row, 8 Memory pairs); kept as a `cards:6` option a panel may pin. Alt B portrait 4 x 2 (168 x 346): a 148 px column holds 9 glyphs at 26 and wraps every Romance multi-token label to three lines; rejected. **Recommendation: 2 x 4 landscape + one 4 x 4 twin sheet + overlay cut lines.**

**Risks -> mitigations.** Overlay vs cells drift: both derive from `cellW/cellH`; the gate compares endpoints to card rects at 722 and 814. Dashes in mono: `T.grid` 2.5 prints light grey (K-240's proven line); never darken. Font trap: every px above measured with the shell's woff2 from `file://`; the build gate re-measures `scrollWidth` in `render/one.js`. Wrong picture for the word: every panel OPENS every picture on its pinned theme. **Print check:** 722 <= 722 under three-line chrome; `qa/lints.js` 1 + 1b on de + fi renders before any copy claims a level.

## 3 Faces 2-6

Every face reuses `cardSheet` and fans by theme like the base; `gate-variation-distinct.js` compares resolved d2 against the base's `{kind:'word', cards:8, cols:2, rows:4, pic:104}`: each face changes `kind` at least.

### Face 2 : Twin Set (K, `K-3xx TBD`, `mode:'twin'`; PARAM)
EN "Picture Cards and Word Cards: Matching Pairs". **Use:** MATCH / Memory with the pair SEPARATED ("Wort zum Bild legen"), a different routine from naming, so the base's d3 re-pointed is a genuine teaching move (rule 2). **Knob:** `{...base.difficulty[3]}` = `{kind:'twin', cards:8, cols:4, rows:4, pic:120, maxSegment:13}`; differs from the published d2 on `kind`, `cols`, `pic`. **Layout:** one 4 x 4 sheet, cells 168 x 173, pad 10, inner 148 x 153. Rows 1-2 `pictureCard` (picture 120, no text); rows 3-4 `wordOnlyCard` DERANGED (`do order = rng.shuffle … while order.some((v,i) => v === i)`, `types/_shared/lit-vocab-match.js:45-46`); plate `padding:3px 6px` (text <= 136), tiers (m, every single token passes at 136): <= 8 glyphs 26 · 9-10 -> 22 · 11-12 -> 20 · 13 -> 18; <= 2 lines; else REFUSED. Sixteen identical 44 x 46 mm cards: Memory is fair only when a face-down picture card and word card are indistinguishable. Overlay frame + 3 v + 3 h; stamps `data-lcs-twin="p3"` / `"w3"`. **Caps (m):** twin-refusable words catalogue-wide en 5 · de 25 · es 7 · pt 14 · fr 11 · it 6 · nl 21 · sv 14 · da 10 · no 9 · fi 28; every (theme, locale) pool >= 8 at the 13 cap; a 12 cap drops de + fi `post office` to 7. **Query face:** "matching cards / memory".

### Face 3 : Article Cards (K, `K-3xx TBD`, `mode:'article'`; CODE)
EN "A or An: Word Cards with the Article". **Use:** say the noun WITH its article (DaZ der-die-das, NT2 de/het, sv en/ett); gender colour where a locale uses one. **Layout:** base geometry; plate = `articleLabel` `[dot 16][6][der Fledermaus]` at 26 when `glyphs(article) + 1 + glyphs(noun) <= 18` (281 <= 293; `der Fledermaus` 182.3, m); else two lines at 24, plate 58, picture 84 = 148. Legend in the strip (Nunito 700 16 + three 12 px dots) only when `dots`. **Config:** `{kind:'article', cards:8, cols:2, rows:4, pic:104, level:<articleStyle.level>}`; d1 4 cards; d3 fr `level:3` (un / une). **Article = literal** `ARTICLES[loc].chips[keyFor(e,{level})]`, K-288's selection verbatim (`K-288-articles.js:47-50`: `chipsD3` at level 3, else `chips`; `countable(e)`; `refuseKeys` from the pt / nl / sv / da / no rulings: blocks, cards, crayons, dice, chess, lego, domino; `keyFor` null = refused). `articleStyle.level`: **it 3** (`il lo la l'`, the full definite set), **all others 2**. fr `keyFor` returns null for every vowel / h-initial noun (`articles.js:61`): elision nouns REFUSED by default (the K-288 fr panel accepted this); `elision:'print'` + `elisionChip:"l'"` is a panel option. **Join rule:** `chip.endsWith("'") ? chip + word : chip + ' ' + word` (`l'arbre`, `l'elefante`). **Colour:** dot fill = `codeColors[articleStyle.dots[key]]`; de `['codeBlue','codeRed','codeGreen']` = `ARTICLES.de.chipDots` (m, the DaZ / Grundschule blau-rot-grün); every other locale `dots:null` (UNKNOWN as a school convention) until its panel declares one in data. The article WORD stays `T.ink`: `qa/lints.js:89-95` whitelists `codeColors` for SVG fills only, HTML text colour is unlinted, so the validator refuses `color:` in any literal; in mono the article is still spelled out. **Refusals:** fi (`ARTICLES.fi.mode:'form'`; rows 5); colors + emotions everywhere; fr post office 7 / reptiles 7 / tools 7 (p m); en tree 6. no ships en / et: the K-288 no panel ruled "do NOT offer ei" (vocab m 1006 / n 206 / f 0, m). **Query face:** "der die das Bildkarten" / "a or an cards" / "en eller ett".

### Face 4 : One and Many (K, `K-3xx TBD`, `mode:'plural'`; CODE)
EN "One and Many: Singular and Plural Cards". **Use:** the NUMBER routine (fi yksikkö / monikko): one picture + singular beside three pictures + plural, no numeral. **Layout:** base geometry, each ROW a `pluralPair`: left picture 80 + plate(singular); right `iconRows({theme, noun, n:3, perRow:3, iconPx:80, rng})` (260 <= 313) + plate(`displayWord(e.plural, loc)`). EQUAL picture sizes so the only difference is number (K-287 confounds size with number; the pedagogy's 88 / 64 is dropped). Stack 80 + 6 + 36 = 122. **Config:** `{kind:'plural', pairs:4, cols:2, rows:4, pic:80, clones:3}`; d1 2 pairs (pic 160); d3 `minLetters:6`. **Pool:** `countable(e)` (`b2-common.js:50`; adjectives fall out automatically), nouns only, plural label under the same caps. **Refusals:** colors, emotions; else >= 8 in 48 x 11 (p m). **Query face:** "singular plural cards" / "Einzahl Mehrzahl Bildkarten".

### Face 5 : Bilingual Cards (K, `K-3xx TBD`, `mode:'bilingual-<partner>'`; CODE + `unitAxis`)
EN "Bilingual Picture Cards: English and Spanish". **Use:** L2 with L1 support (DaZ zweisprachige Bildkarten, NT2 met vertaling, FLE, US dual language). **Layout:** base geometry, picture 84, `bilingualLabel` plate 60: host Baloo 2 700 26 / 30 `T.ink` over partner Nunito 700 20 / 24 `T.teal` (not `T.inkSoft`, a 45 percent grey in print; the hierarchy rides on family + size). 84 + 4 + 60 = 148. Legend `hostName · partnerNames[unit]`. **Partner:** `instance.unit` = a locale code (`unitAxis`; absent from `enumerate.js` today, m; additive per README); exemplar `partnerExemplar` = `en` in the 10 non-en locales, `es` in en; line 2 = `displayWord(vocab[key][unit][0], unit)` in the PARTNER's case. Partner cap: Nunito 700 20 measures at most 10.7 px per glyph (m: `ambulanceverpleegkundige` 256.1 / 24; the design's "9.5" corrected) -> partner token <= 26 glyphs, one line, else the entry is refused. **Config:** `{kind:'bilingual', cards:8, cols:2, rows:4, pic:84}`; d1 4 cards; d3 twin blocks host / partner. No ordered locale pair < 8 on any theme (p m). **Query face:** "bilingual flashcards" / "zweisprachige Bildkarten".

### Face 6 : Syllable Cards (G1, `G1-3xx TBD`, `mode:'syllable'`; CODE)
EN "Syllable Cards: Read the Word in Parts". **Use:** a DECODING scaffold, the split PRINTED (de Silbenbögen-Karten, pt fichas silabadas, fi tavutettu); distinct from G1-305 (the child draws the arcs) and G1-306 (a table). **Layout:** arc locales: `.ws-icon` 72 (>= 44) + 4 + `syllableWord({cell:28, fontPx:26})` (svg 40; <= 10 letters = 280 <= 313) + 2 + `syllableArcsForWord({cell:28, h:26, mode:'printed'})` = 144 <= 149; de capital in cell 1. Hyphen locales (fi, `mark:'hyphen'`): picture 96 + 6 + plate 36 with `ka-me-ra` at 26 (hyphens add `count - 1` glyphs to the cap). **Config:** `{kind:'syllable', cards:8, cols:2, rows:4, pic:72, pool:'tex', minCount:2, maxCount:4, maxLetters:10}`; d1 count 2, 4 cards; d3 count 3-4. **Pool:** approved entry with `'TeX'` in `sources_agreed` (README texPool rule), `count` 2-4, letters <= 10, da strict pool (README item 5), pre-resolved at apply time. **Ceiling (p m):** texPool >= 8 in 11/11 on 9 themes (animals, At the Supermarket, accessories, activities, around the house, birds 2, camping, clothing, Things That Fly); themes passing per locale en 14 · da 15 · fr 23 · others 34-48. Pin `animals` (en 9, da 9). **Dependency:** G1-305's `syllableWord` / `syllableArcs`; if G1-305 lands later, ship F6 hyphen-only (`mark` is data). **Query face:** "syllable cards" / "Silbenkarten" / "tavutetut kuvakortit".

**Rejected non-moves.** Theme swap · letter-of-the-week cards (K-317's axis) · writing-line cards (K-284 d3 `caption`, `K-284-word-tracing.js:70-78`) · first-letter blank (K-224 / K-221) · sorting cards from two themes (K-235) · big cards (= d1) · block capitals (`cardCase`, data) · picture-only cards with a ruling (G1-244) · syllable-count dots (K-233) · definite-form cards (forms the vocab lacks) · two-colour syllables (`mark:'colour'` inside F6).

## 4 Native rebuild plan x11

Every value is DATA in `data/b3/picture-word-cards.js`; the code substitutes literals and never inflects. F5 partner exemplar = `en` in every non-en locale, `es` in en; each panel authors the 10 partner NAMES.

| loc | label case | F3 article + colour | countable F4 (p m) | refusals | traps |
|---|---|---|---|---|---|
| en | lower | a / an by SOUND (`EN_EXCEPTIONS`); no colour | 1119 | F3 tree 6 | "flashcards" is the head |
| de | nouns keep the capital, non-nouns lower | der / die / das, dots blau / rot / grün, legend | 946 | gender-less nouns off F3 | `displayWord(w,'de','lower')` on non-nouns |
| es (MX) | lower | el / la; colour UNKNOWN | 1122 | colors, emotions | 75 multi-token singulars (p m): wrap at the space; stressed-a feminines (`el agua`) in `exclude` |
| pt (BR) | lower or upper | o / a; colour UNKNOWN; `refuseKeys` | 1140 | colors, emotions | pt-BR forms; F6 head "fichas silabadas" |
| fr | lower | le / la; elision refused (panel may set `'print'` + `l'`); d3 un / une; colour UNKNOWN | 1114 | post office 7, reptiles 7, tools 7 | "fiche" banned in titles; h aspiré undecidable |
| it | lower | il / lo / la / l' (`level:3`); colour UNKNOWN | 1024 | keyed-null nouns; h-loanwords in `exclude` | slug `carte-illustrate`; "scheda" banned |
| nl | lower, `ij` intact | de / het; colour UNKNOWN; `refuseKeys` | 1155 | colors, emotions | `ambulanceverpleegkundige` refused (m); NT2 register |
| sv | lower INDEFINITE | en / ett; colour UNKNOWN; `refuseKeys` | 973 | colors, emotions | never `grupp`; `bana` never `banan`; NSR |
| da | lower indefinite | en / et; colour UNKNOWN; `refuseKeys` | 1008 | F6 on 15 themes (strict pool) | strand row by the panel; NSR |
| no | lower indefinite, bokmål | en / et, NO `ei`; colour UNKNOWN; `refuseKeys` | 1009 | as left | strand row by the panel; NSR |
| fi | nominative | REFUSED (`enabled:false`) | 1134 | F3 always (rows 5) | titles are whole literals; F6 `mark:'hyphen'`; strand row by the panel |

Panels author `strings` (6 titles, fi 5: <= 70, the genre head, no worksheet-word, unique in band; instructions <= 150, the TEACHER's sheet sentence), `legend`, `cardCase`, `articleStyle`, `bilingual`, `syllable.mark`, `exclude`. Three-agent native panel per locale (§A.13.48); the EN is a SOURCE TO AUDIT; every panel OPENS every picture on its pinned theme.

## 5 Data + gates

`data/b3/picture-word-cards.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; b3 tools TBD; `data/` gitignored, `git add -f`):
```
PICTURE_WORD_CARDS[loc] = {
  cardCase: 'lower'|'keep'|'upper',            // 'keep' = de nouns only; gender-null entries always lower
  articleStyle: { enabled, level: 2|3, dots: ['codeBlue','codeRed','codeGreen'] | null,
                  elision: 'refuse'|'print', elisionChip: "l'" | null, legend: 'der = blau · die = rot · das = grün' | null },
  plural: { enabled:true, clones:3 },
  bilingual: { partnerExemplar:'en', partnerNames:{ en:'Englisch', … }, legendSep:' · ' },
  syllable: { enabled:true, mark:'arc'|'hyphen'|'colour', hyphen:'-', strictPool:false|true },
  twinLayout: { cols:4, blockRows:2 }, exclude:['vocabKey'],
  strings: { 'K-324':{title,instruction}, F2..F6:{title,instruction} } }
```
Render reads this file + `entriesFor` + `fileUri` + `ARTICLES[loc]` + (F6) approved entries pre-resolved at apply time; never `image-vocabulary.js` or `approved-words-*.json` at render.

**`tools/validate-b3-draft.js` (block; exit 1 on any):** (1) `cardCase` in enum, `keep` only in de; (2) fi `articleStyle.enabled:false` REQUIRED; `dots` are `codeColors` keys, `length === chips.length` (`chipsD3` at `level:3`); `legend` iff `dots`; `elisionChip` iff `elision:'print'`, fr only; `level:3` only where `chipsD3` exists; (3) `partnerExemplar` is another of the 11; `partnerNames` has all 10; (4) `syllable.mark` in enum; fi `hyphen`; da `strictPool:true`; (5) 6 (fi 5) `{title, instruction}` <= 70 / <= 150, no worksheet-word, unique in band; F3 absent in fi; (6) no `{` and no `color:` in any literal; (7) `exclude` keys exist.

**`qa/verify-b3-picture-word-cards.js`** (structural gate over the DOM rendered by `render/one.js`, each face x 11 x pinned theme at d2 under three-line chrome = 722 AND one-line = 814):
- `qa/lints.js` clean. One `[data-lcs-sheet]`; `[data-lcs-card]` === `cols x rows` (twin 16, else 8); every card rect inside the sheet, no overlaps, cell size === config +-1.
- Cards: exactly one `img` (`complete && naturalWidth > 0`, colour dir, no `BW|SW|BN|NB|ZW|SH|PB|MV|SV`); twin word cards zero; F4 right card exactly 3 same-`src`. `.ws-icon` >= 56 (>= 44 on F6).
- `data-lcs-word` + `data-lcs-vocab` distinct per block; plate text === `data-lcs-word` (F3: `chip [+ ' '] + word`); `scrollWidth <= clientWidth` on every plate and line span (the only font measurement, in the real pipeline); line count === `data-lcs-lines`.
- Overlay: one `[data-lcs-cutlines]` sized to the sheet; `[data-lcs-cut-v]` === `cols - 1` at `x = k*cellW` spanning `0..sheetH`, `[data-lcs-cut-h]` likewise; stroke `#C8BFAE`, dasharray present; one `[data-lcs-scissors]`; bbox of `img` + plate >= 10 px inside the cell.
- Twin: picture vocab multiset === word vocab multiset; word at slot i !== picture at slot i; 20-seed sweep never identity.
- Article: chip === `chips[keyFor(e,{level})]` (or `elisionChip`), dot fill === `codeColors[dots[key]]` iff `dots`, legend iff dots, no `refuseKeys` noun; fi absent. Plural: row keys equal; right text === `displayWord(plural)`. Bilingual: line 2 === `displayWord(vocab[key][unit][0], unit)`, Nunito; `data-lcs-partner === instance.unit`. Syllable: `data-lcs-split` joined === word lowercase; `[data-lcs-arcs]` === `count`; `'TeX'` present; da strict; hyphen locales text === `split.join('-')`.
- **Poison (each FAILS; the correct draft is the control):** P1 base card without its `img` · P2 twin word card from another theme · P3 theme `zoo animals bw` · P4 de `Wütend` capitalised · P5 fi F3 `enabled:true` · P6 de `die Hund` · P7 F4 right card with 2 clones · P8 F5 partner line in the host language · P9 F6 en `acorn` (non-TeX) · P10 nl `ambulanceverpleegkundige` forced through · P11 one word on two base cards · P12 twin in identity order · P13 per-card dashed borders instead of the overlay · P14 overlay 1 px narrower than the sheet · P15 `padding:4` · P16 a 760 block under three-line chrome · P17 twin word 12 glyphs at 26 · P18 cream `.ws-cutcard` · P19 fr `l' arbre` with a space · P20 sv `blocks` on an article card.

`tools/gate-variation-distinct.js` (exists, m) needs the b3 rows list before it sees K-324; expected 5 distinct configs (poison: twin without `kind` and with base geometry -> FAIL).

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170) | coordinate |
|---|---|---|---|
| base | "Picture Word Cards: Animals" · "Bildkarten Tiere: Wort-Bild-Karten zum Ausschneiden" · "Woordkaarten dieren" / "Tarjetas de vocabulario: animales" · "Fichas de leitura: animais" · "Imagier des animaux" / "Bildkort djur" · "Kuvakortit: eläimet" | Eight picture cards with the word under each, to cut along the dotted lines and name | `{type:'picture-word-cards', mode:'base', theme:'animals', level:<K key>}` |
| F2 | head + "matching pairs" / "Memory" / "parejas" / "memory-par" | Eight picture cards and eight word cards to cut out and match | `mode:'twin'` |
| F3 | "A or An: Word Cards" · "Der, die, das: Bildkarten mit Artikel" · "De of het: woordkaarten" / "El o la" · "Le ou la" · "Il, lo, la" / "En eller ett" | Each card shows the noun with its article, to cut out and say aloud (de adds "colour-coded") | `mode:'article'` (absent in fi) |
| F4 | "One and Many: Singular and Plural Cards" · "Einzahl und Mehrzahl: Bildkarten" / "Singular y plural" / "Yksikkö ja monikko: kuvakortit" | Pairs of cards with one picture and three pictures and both word forms | `mode:'plural'` |
| F5 | "Bilingual Picture Cards: English and Spanish" · "Zweisprachige Bildkarten Deutsch Englisch" / "Tarjetas bilingües español inglés" / "Kaksikieliset kuvakortit suomi englanti" | Picture cards with the word in two languages, to cut out for language lessons | `mode:'bilingual-<partner>'` (partner INSIDE the mode: `coordKey()` = `type|mode|theme`, `landing-content.ts:215`; NEVER `coordinate.target`, which drops the landing out of the monolingual `/worksheets` set, `:167-174`, m) |
| F6 | "Syllable Cards: Read the Word in Parts" · "Silbenkarten mit Silbenbögen" / "Fichas silabadas" / "Stavelsekort" · "Tavutetut kuvakortit" | Picture cards with the word printed in syllables to read part by part | `mode:'syllable'`, G1 key (`grade-1` / `1-klasse` / `primer-grado` / `1o-ano` / `cp` / `classe-prima` / `groep-3` / `ak-1` / da `1-klasse` / `2-trinn` / `1-luokka`, all in LEVELS, m) |

Titles <= 70, no worksheet-word, unique per band; theme from `themeOverrides`. h1 = title; eyebrow = level; strand per §1. JSON-LD `LearningResource`; `educationalAlignment` en only on F4 (L.K.1.c) and F6 (RF.1.3.e), no `targetUrl`. Meta lead inherits `seo.words.free_printable` (README item 1, OPEN).

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs K-225 / K-235 (`picture-vocabulary` family) | cut-out cards, nothing to write vs draw a line / sort; head "cards / Karten / kort", never "vocabulary worksheet" | 0.20 / 0.25 |
| base vs K-284 / G1-244 | no pencil vs trace / write | 0.15 |
| base vs F2 · F5 | one card vs two blocks; one language vs two | 0.35 · 0.30 |
| F3 vs K-288 · F4 vs K-287 | article PRINTED to say vs CIRCLED as the answer; both forms printed vs plural written | 0.25 · 0.30 |
| F6 vs G1-305 · G1-306 | split PRINTED vs drawn; a word in parts vs a syllable table | 0.30 · 0.20 |
| F5 vs the cross-language `Learn <X>` landings | cards vs crossword / wordsearch at `language-beginner`; those carry `coordinate.target`, F5 does not | 0.15 |
| any face vs `/topic/<theme>/` | | 0.10 |

Boundary sentence on every landing: "a cut-out card set, nothing to write".

## 7 Hub visibility contract

A face appears under `picture-word-cards` on `/[locale]/worksheets` IFF: (1) `apps['picture-word-cards'] = {default_subject:'letters', default_age_range:'5-7', exercise_type_axis_key:'picture-word-cards'}` exists in `topics-taxonomy.json` (ABSENT today, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type']['picture-word-cards']` has `slug` + `name` in all 11 locales (§1 slugs, all free, m); (3) exactly one landing per face per locale with `coordinate.type === 'picture-word-cards'` verbatim, `mode` = the face string (base `'base'`), the theme from `themeOverrides`, a band-table level key, a unique slug and `canonicalDeckSlug` = the published deck; a REFUSED face has NO landing; (4) the landing JSON committed AND deployed.

Gate: `node scripts/verify-hub-type-rows.js --keys=picture-word-cards` (does not exist yet, m; build + poison-test first per README item 2), expecting **6 rows in en de es pt fr it nl sv da no and 5 in fi** (F3 refused) = **65**; a no veto of F3 would make it 64, but the K-288 no panel already accepted en / et. The SSR rail must carry a `?type=picture-word-cards` link; open `https://www.lessoncraftstudio.com/<loc>/worksheets?type=picture-word-cards` on the All tab in a real browser for de, fi and one Romance locale.
