# K-324 `picture-word-cards` : editor-critic record (2026-09-14)

Inputs: `_work/K-324-pedagogy.md` (P) + `_work/K-324-design.md` (D). Output: `K-324-picture-word-cards.md`. Every claim below was checked against the repo; (m) = re-measured by `k324-critic-measure.js` (scratch, read-only; puppeteer from a `file://` page carrying the shell's `fonts.css`, `document.fonts` reported Baloo 2 700 + Nunito 700 loaded). No em-dashes.

## 1 Contradictions + resolutions

| # | P says | D says | resolution | why |
|---|---|---|---|---|
| 1 | label cap `maxSegment:18`, 26 px <= 14 glyphs, 22 px 15-18 | 26 px <= 20 glyphs one line; 21-28 multi-token two lines at 24; single token > 20 REFUSED | **D wins, re-measured (m)**: max 14.38 px/glyph at 26 (`Wassermelone`), 20 x 14.38 = 287.6 <= 293; the only refused token catalogue-wide is nl `ambulanceverpleegkundige` (24 glyphs, 325.2 px); an 18 cap would refuse three FITTING words (sv `ambulanssjukvårdare` 252.9, da `beskyttelsesbriller` 221.3, pt 1) | measured buildability beats a glyph-count guess |
| 2 | cell padding 10, inner 317 x 153 | padding 12, inner 313 x 149 | **12** (3 mm cut margin; stack 146 <= 149 holds) | brief asks for a real scissor margin; D's stack was checked |
| 3 | picture 96 | picture 104 | **104** (>= 96 >= K floor 56) | D measured the stack |
| 4 | twin picture 110, font tiers <= 8 / 9-11 / 12-14 at 26 / 22 / 19 | twin picture 120, tiers <= 8 / 9-10 / 11-12 / 13 at 26 / 22 / 20 / 18, cap 13 | **D** (m): every single token passes its tier at 136 px; all 550 (theme, locale) twin pools >= 8 at the 13 cap; a 12 cap drops de + fi `post office` to 7 | measured |
| 5 | F4 pictures 88 (single) / 64 (clones) | 80 / 80 equal | **equal 80** | K-287 confounds size with number; a card set must not (pedagogical argument, D's) |
| 6 | F6 picture 76, cell 30 | picture 72, cell 28 | **72 / 28** (stack 144 <= 149; 10 letters = 280 <= 313; fontPx 26 >= G1 numeral floor 22) | matches G1-305's cloze `cellMax:28` precedent |
| 7 | F3 `level:3` everywhere | same | **`articleStyle.level` per locale: it 3, others 2; fr d3 = 3** | `K-288-articles.js:48` uses `chipsD3` at level 3, which for fr is `un / une` (INDEFINITE): P's "level 3 = definite with dots" would have shipped fr indefinite at d2. it's `chipsD3` = `il lo la l'` (the full definite set), so it needs 3 |
| 8 | F3 d3 "indefinite (fr un/une, it un/una)" | | **it has no indefinite in data** (`chipsD3.it` is definite); only fr d3 = un / une | `data/b2/articles.js:59/63` |
| 9 | P: "the card offers en/et; the panel may veto F3 -> rows 5 in no" | | **no F3 SHIPS (rows 6)**: the K-288 no panel already ruled "Do NOT offer ei" and accepted en / et (`articles-overrides.js` no note); vocab census (m) m 1006 / n 206 / f 0 | a ruling exists; do not re-open |
| 10 | P: `l'` printed "at level 3" for fr | D: `l'` only with `elision:'print'` | **default REFUSE** (`ARTICLES.fr.keyFor` returns null for every vowel / h noun, `articles.js:61`; the K-288 fr panel accepted this); `elision:'print'` + a literal `elisionChip:"l'"` is a panel option, fr only | `l'` is not in `chips`; K-324 code must not invent it |
| 11 | both: text === `chip + ' ' + word` | | **join rule** `chip.endsWith("'") ? chip + word : chip + ' ' + word` (`l'arbre`, `l'elefante`, never `l' arbre`) + poison P19 | it `chipsD3` carries `l'` at level 3 |
| 12 | P: "`displayWord` is wrong for non-nouns" | D: case keyed on gender presence | **key on `e.gender`**, but call `displayWord(w, loc, 'lower')`: the third `mode` argument exists (`lib/b2-common.js:17-20`); nothing is wrong with the helper | verified |
| 13 | P: pt `cardCase:'upper'` via displayWord | | `displayWord` has NO upper mode (`m === 'keep' ? word : lower`); pt upper = `toLocaleUpperCase('pt')` | verified |
| 14 | D: Nunito 700 20 "<= 9.5 px per glyph" | | **10.7** (m: `ambulanceverpleegkundige` 256.1 / 24; D's own probe `pachycephalosauruses` 208.9 / 20 = 10.4 already contradicted 9.5); partner pre-filter 26 glyphs (278 <= 293) | number corrected |
| 15 | P: 8-card sheet gate rule only | D: 18 poisons | merged P1-P12 + P13-P18 + NEW P19 (`l'` space) + P20 (`refuseKeys` noun on an article card) | |
| 16 | P: F3 pool = `keyFor` only | | **also `countable(e)` + `refuseKeys`** (blocks, cards, crayons, dice, chess, lego, domino per the pt / nl / sv / da / no K-288 panel rulings in `articles-overrides.js`) exactly as `K-288-articles.js:49-50` | a lone `en` before `Klossar` is the recorded defect |
| 17 | D cites `K-240-cut-and-paste.js:83` | | the dashed strip border is line **85** (line 61 = ghost, 75 = tile); file name is `K-240-cut-and-paste.js` (the task's "K-240-cutting-practice.js" does not exist) | verified |
| 18 | D: `lit-vocab-match.js:44` | | derangement idiom is lines **45-46** | verified |
| 19 | P: rows 65 "64 if no vetoes F3" | D: same | **65** (fi 5); no = 6 per #9 | |
| 20 | twin = base d3 re-pointed (rule 2) | | CONFIRMED distinct: face d2 `{kind:'twin', cols:4, pic:120}` vs base d2 `{kind:'word', cols:2, pic:104}`; the classroom use differs (Memory / match vs name); PARAM over `base.difficulty[3]` | |

Faces confirmed as six distinct classroom uses with distinct card structures + query faces: name (picture + word) · match (picture cards + word cards apart, deranged) · say with the article (chip + dot) · one and many (1 vs 3, both forms) · two languages (host over partner, `unitAxis`) · read in parts (split printed, G1). None duplicates K-225 / K-235 / K-284 / G1-244 / K-287 / K-288 / G1-305 / G1-306 (each of those asks for a pencil or a line; here nothing is written).

## 2 Claims removed as unverified or wrong
- P: "d3 INDEFINITE article where the locale has one (it un/una)": no such data; removed.
- P: "`l'` printed at level 3" for fr: `keyFor` refuses; re-stated as a panel option.
- P: "no panel may veto F3": already ruled at K-288; removed as an open fork.
- D: "Nunito 700 20 <= 9.5 px/glyph": corrected to 10.7 (m).
- D: `K-240-cut-and-paste.js:83`: corrected to :85.
- P: `no` vocab "m 1075 / n 200": editor census m 1006 / n 206 / f 0 (1,263 keys); the conclusion (f = 0) stands.
- P: F4 "clones 64": dropped (size confound).
- Both: "colour conventions outside de": UNKNOWN stays UNKNOWN; `dots:null` default, panel data field; de is the only encoded default (`ARTICLES.de.chipDots`, m).
- Every px in D was measured from `file://` with the shell's fonts (D's own note; re-confirmed by the editor's independent run). No width in the final file comes from a blank page.

## 3 Numbers re-measured (m)
- Baloo 2 700 26: 14.38 px/glyph max; 20 glyphs = 287.6 <= 293. Longest per locale 241.8 (`pachycephalosaurus`), de 221.9, fr 228.1, pt 217.9, es 212.9, it 203.1.
- Refused single tokens > 20: nl `ambulanceverpleegkundige` only. Tokens > 18 that FIT: pt 1, nl 1 (the refused one), sv 1, da 1.
- Multi-token 21-28 glyphs: es 1, fr 2, fi 1 (`amerikkalainen jalkapallo` 300.8 at 26 -> two lines at 24: 277.7 total, longest line 14 glyphs).
- Base pools < 8 after the token > 20 refusal: none (50 x 11). Twin pools < 8 at the 13 cap: none; at 12: de + fi `post office` 7.
- Twin tiers at 136: 0 single-token failures across the longest-token probes.
- `der Fledermaus` 182.3 at 26 (F3 one-line rule 18 glyphs incl. space = 281 <= 293 holds).
- Nunito 700 20: 10.67 px/glyph max; partner 26 glyphs = 277 <= 293.
- Taxonomy: `apps.picture-word-cards` + axis key ABSENT; all 11 proposed slugs free across every axis except `vocabolario-illustrato` (= `picture-vocabulary.slug.it`) -> `carte-illustrate` free. `default_subject` census math 38 / letters 28 / spatial 13 / logic 12 / science 3.
- LEVELS map: all 11 K keys + all 11 G1 keys present (`worksheets/[slug]/page.tsx:301-371`).
- `strand-names.ts` Vocabulary row: en de fr es pt it nl sv present; da no fi absent. `Language` row: da no absent (README item 8 holds).
- `landing-content.ts`: `coordKey` = `type|mode|theme[|letter][|t:target]` (:215-216); monolingual set = `!coordinate.target` (:167-174) -> partner must live in `mode`.
- `qa/lints.js`: palette check = SVG `fill`/`stroke` only (:89-95); `codeColors` whitelisted (:9-15); HTML text colour unlinted.
- `enumerate.js` / `render-instance.js` / `emit/manifest.js`: no `unit` support today (README's additive `unitAxis` stands).
- ABSENT today: `templates/components-b3.js`, `primitives/syllable-arcs.js`, `scripts/verify-hub-type-rows.js`, `tools/apply-b3-locale.js`, `tools/validate-b3-draft.js`. PRESENT: `tools/gate-variation-distinct.js`, `tools/apply-b2-locale.js`, `tools/validate-b2-draft.js`, `data/b2/articles-overrides.js`.

## 4 OPEN items
1. **Per-theme landings vs one pinned theme.** The b2 precedent is `themesPerType:1`; the demand tail is per theme (P). Decide a per-type theme count and landings per (face, theme); `verify-hub-type-rows.js` then counts distinct faces, not landings. Operator / SEO decision.
2. **`unitAxis` for F5** is not implemented (README cross-type ruling, additive-with-fallback; `b3-baseline --check` = 0 drift). Until then only the exemplar partner ships. The partner NAME in a fanned title needs a `{PARTNER}` token resolved from `bilingual.partnerNames[unit]`; `{U}{L}` (upper / lower unit) does not cover a language name. Engineer.
3. **F6 depends on G1-305's `syllableWord` / `syllableArcs`** (absent). Ship F6 hyphen-only in every locale if G1-305 lands later (`mark` is data).
4. **Gender colour outside de** is UNKNOWN as a school convention; each panel rules once in `articleStyle.dots` (data). Do not invent.
5. **fr elision**: default refuse (K-288 ruling); the fr panel may switch to `elision:'print'` + `elisionChip:"l'"`; the h-aspiré subset stays refused either way (undecidable from data).
6. **es stressed-a feminines** (`el agua`) are not guarded in `ARTICLES.es.keyFor` (the K-288 es panel flagged it); K-324 uses the panel `exclude` list; none occur in the pinned themes per that note, re-check on the K-324 theme.
7. **Meta lead** inherits `seo.words.free_printable` (README item 1); tier-truth ruling pending.
8. **`verify-hub-type-rows.js`** must exist + be poison-tested before `apps.picture-word-cards` lands (README item 2). Expectation 65 (fi 5).
9. **`strand-names.ts` Vocabulary row da / no / fi** authored by those panels (README items 8, 10).
10. **`b3` tools** (`apply-b3-locale.js`, `validate-b3-draft.js`, `gate-variation-distinct.js` b3 rows) are owned by the first design built in the batch; K-324 adds its block only.
11. **Length.** The final file is 4,402 words on the pipe-stripped measure (G1-305 = 4,374, K-317 = 3,679); the ~3,600 target could not be met without dropping gate / poison / per-locale contract rows the sibling depth requires. Editorial call; trim further only by removing the §6 title examples.
12. **Emotions / colors on the base**: printed as adjective cards (a "Gefühlskarten" deck is a real use, P). The case rule handles de; Romance masculine-singular adjectives (brief trap) print as stored. A panel may `exclude` a theme it does not want as cards.

## 5 Quality verdict (a critical kindergarten / DaZ teacher)
The base sheet is exactly what I print and laminate every week: eight big white cards, one clean picture, the word in a warm rounded font, dotted lines I can cut in five strokes, and der/die/das in the colours my Sprachförderung children already know. The twin set makes a fair Memory because the cards are identical face-down, and "one and many" finally shows number without making the three pictures smaller. What I will watch: whether the panels really open every picture (a wrong picture on a word card is worse than a missing card), and whether the bilingual face ships with more than English as the partner.
