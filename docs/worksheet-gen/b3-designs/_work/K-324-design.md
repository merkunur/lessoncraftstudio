# K-324 `picture-word-cards` (K) : layout + apparatus design (2026-09-14)

Two-designer pass (A: page, cut geometry, print; B: child legibility, delight). Contract = `_work/K-324-pedagogy.md` (six faces, gender-keyed case rule, theme allowances). (m) = measured 2026-09-14: glyph counts by node over `lib/b2-common.js entriesFor` x the 50 colour dirs of `cache/manifest.json`; px widths by puppeteer from a `file://` page carrying `assets/fonts/fonts.css` exactly as `page/shell.js` rewrites it (`document.fonts` reported Baloo 2 700 + Nunito 700 loaded; probe `Schlittschuhlaufen` 221.9 px vs 193.5 in the fallback serif, so these are the real widths). Scratch: `k324-labels.js`, `k324-measure.js`, `k324-pools.js`. No em-dashes.

## 1. Page concept (base)

A materials sheet, not a task: eight white cards edge to edge, separated only by dashed cut lines, picture above word, nothing else on the page. The child cuts (one straight stroke per line), the teacher laminates and runs the routine (name it, read it, pocket chart, word wall). No numerals, no badges, no answer, no `verify()`. The card must read at arm's length: picture 104 px (27 mm), word Baloo 2 700 26 px on a cream name plate. The sheet is calm by construction: the only lines on the page are the five cut lines and the plates.

## 2. Layout d2 at a 722 body

`.ws-page` inner 675 (`page.css:16-26`, padding 0 14). Body floor 722 (README ruling). Block = strip 30 + sheet 692 = 722, `flex:0 0 auto; margin:auto 0` inside `.ws-body` so the 92 px of slack under one-line chrome (814) splits above and below; nothing stretches, so the overlay geometry is fixed in px.

```
x: 0 ......................................... 674
 [scissors 26]                    der=blau . die=rot . das=gruen     strip 30 (legend only when declared)
 +----------------------------------+----------------------------------+   y 30   outer frame: dashed
 |            [picture 104]         |            [picture 104]         |          T.grid 2.5, dash 8 6
 |         ( Fledermaus )           |          ( Katze )               |   cell 337 x 173
 +----------------------------------+----------------------------------+   y 203  horizontal cut 1
 |                                  |                                  |
 +----------------------------------+----------------------------------+   y 376  horizontal cut 2
 |                                  |                                  |
 +----------------------------------+----------------------------------+   y 549  horizontal cut 3
 |                                  |                                  |
 +----------------------------------+----------------------------------+   y 722
                             vertical cut at x 337
```

- Sheet 674 x 692 (2 x 337 wide, 4 x 173 tall = 89 x 46 mm cards), centred (`margin:0 auto`). Cells are a CSS grid with `gap:0`; the cut lines are NOT borders: ONE `cutLines` SVG overlay (`position:absolute; inset:0; pointer-events:none`) draws the outer frame (`roundedRect` r 0, square corners so a scissor stroke stays straight) + 1 vertical `line` + 3 horizontal `line`s, stroke `T.grid` 2.5, `stroke-dasharray 8 6`, butt caps. One element per cut, so every dash phase is continuous across the whole sheet (per-card borders would restart the dashes at every cell edge). Style = K-240's `2.5px dashed #C8BFAE` (`types/k/K-240-cut-and-paste.js:83`).
- Scissors: `scissorsGlyph(26)` copied from K-240 (module-local there) into `components-b3.js`, placed at x 0, y 2 of the strip, blades pointing right along the top edge; exactly one per sheet, `data-lcs-scissors`.
- Cell = `.ws-cutcard`: `T.white`, no border, `padding:12px` (the cut margin, 3 mm; the brief asked >= 6), `display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; overflow:hidden`. Inner 313 x 149. The nearest ink to any cut line is 12 px: the picture is centred (>= 104 px from a vertical cut) and the widest plate is 304 (below).
- Picture: `<img class="ws-icon">` 104 x 104 from `fileUri(theme, noun)` (the 512 px derived copy, `image-cache/resolve.js:43`), colour dir only. >= 96 (brief) >= 56 (K floor, `_tokens.js:68`).
- Word: `wordPlate` = `<span class="ws-wordplate">` `T.cream`, r 10, `padding:3px 14px`, Baloo 2 700 26 px (line 30) `T.ink`, `white-space:nowrap`; plate 36 tall, width = text + 28, `max-width:313`. Stack 104 + 6 + 36 = 146 <= 149.
- Label size rule (m). Baloo 2 700 26 measures at most 14.5 px per glyph on the worst catalogue tokens (`Wassermelone` 172.6 / 12, `opvaskemaskine` 195.6 / 14), so: **<= 20 glyphs (single or multi-token) = 26 px, one line** (worst 20 x 14.5 = 290 + 28 <= 313 with 313 as the hard cap; `pisco-de-peito-ruivo` 20 glyphs passes). **21 to 28 glyphs, multi-token = 24 px on two lines**, wrap at the last space that leaves both lines <= 16 glyphs (`campanilla de invierno`, `lunettes de protection`, `pantaloni della tuta`); plate 2 x 27 + 4 = 58, picture drops to 84: 84 + 6 + 58 = 148 <= 149. **A single token > 20 glyphs is REFUSED** (catalogue-wide exactly one: nl `ambulanceverpleegkundige` 24, m; sv `ambulanssjukvaardare` 19 and da `beskyttelsesbriller` 19 pass at 26 px: 241.8 measured for the 18-glyph `pachycephalosaurus`). Longest per locale under the rule (m, 26 px): en 241.8 · de `Schlittschuhlaufen` 221.9 · es 212.9 · pt 217.9 · fr 228.1 · it 203.1 · nl 241.8 · sv 241.8 · da 241.8 · no 241.8 · fi 241.8; all < 285. Every 50 x 11 (theme, locale) pool keeps >= 8 labels under it (m).
- Stamps: sheet `data-ws-content data-lcs-sheet="base" data-lcs-cols=2 data-lcs-rows=4`; card `data-lcs-card="word" data-lcs-vocab data-lcs-word` (display form).

**d1 (4 big cards 2 x 2, wall display).** Same sheet 674 x 692, cells 337 x 346 (89 x 92 mm), `padding:16`, inner 305 x 314: picture 220 + 8 + plate 44 (word 32 px, line 38) = 272 <= 314. Label rule shifts one step: <= 16 glyphs at 32 (16 x 17.9 = 286 + 28 hits 314, so the cap is 15 glyphs: 15 x 17.9 = 269 + 28 = 297), 16 to 20 at 26, multi-token > 20 on two lines at 24; overlay = frame + 1 vertical + 1 horizontal.

**d3 = F2 twin set** (section 7): 16 cells 168 x 173 in 4 x 4, overlay frame + 3 vertical + 3 horizontal.

## 3. Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| kind / cards / cols / rows | word / 4 / 2 / 2 | word / 8 / 2 / 4 | twin / 8 + 8 / 4 / 4 |
| cell w x h / pad | 337 x 346 / 16 | 337 x 173 / 12 | 168 x 173 / 10 |
| pic / wordPx / plate | 220 / 32 / 44 | 104 / 26 / 36 | 120 (picture cards) / 26 to 18 tiers (word cards) |
| label cap (glyphs, one line) | 15 | 20 | 14 per line, <= 2 lines |
| refusal | single token > 20 | single token > 20 | single token > 14 |

Guards key on `cols`/`kind`, never on the level index. d3's config equals F2 d2 exactly (the pedagogy's rule-2 argument: a game needs the pair apart).

## 4. Structural gate (no verify)

`qa/verify-b3-picture-word-cards.js`, node over the rendered DOM, every face x 11 locales x the pinned theme at d2 under three-line chrome (722), plus one-line chrome (814) to prove the block centres and the overlay still matches the cells:
- `qa/lints.js` clean (overflow, footer, broken img, font floor, palette).
- `[data-lcs-sheet]` once; `[data-lcs-card]` count === `cols x rows` (base 8, twin 16, plural 8, syllable 8); every card's `getBoundingClientRect()` lies inside the sheet's rect and no two cards overlap; cell size === config (+-1).
- Every non-twin-word card: exactly one `img` with `complete && naturalWidth > 0`, `src` inside a colour dir, no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV` as the last token before `@`); twin word cards: zero `img`. `.ws-icon` >= 56 (>= 44 on F6).
- `data-lcs-word` distinct per block; `data-lcs-vocab` distinct per block; every word `<span>` text === `data-lcs-word`; `scrollWidth <= clientWidth` on every `.ws-wordplate` and every line span (the ONLY font measurement, in the real pipeline; a 24-glyph nl token forced through must FAIL); plate line count === `data-lcs-lines` (1 or 2).
- Cut overlay: one `[data-lcs-cutlines]` svg sized to the sheet; `[data-lcs-cut-v]` count === `cols - 1`, `[data-lcs-cut-h]` === `rows - 1`; each vertical line's `x1 === x2 === k * cellW`, `y1 === 0`, `y2 === sheetH` (continuous, full height); horizontal likewise; stroke `#C8BFAE`, `stroke-dasharray` present; one `[data-lcs-scissors]` in the strip.
- Cut margin: for every card, the union bbox of its `img` + `.ws-wordplate` sits >= 10 px inside the cell on all four sides (poison: `padding:4` FAILS).
- Twin: picture-card vocab multiset === word-card multiset (1:1); `data-lcs-twin="p<i>"` / `"w<i>"` pairing; `derangement`: for every i, word card at grid slot i (column-row inside the word block) is NOT the picture at slot i; 20-seed sweep: never identity, no repeated word.
- Article: plate text === `chip + ' ' + word` (or two lines: chip / word), chip === `ARTICLES[loc].chips[keyFor(e,{level:3})]`, dot circle fill === `codeColors[dots[key]]` and present iff `articleStyle.dots`; legend text in the strip iff dots; fi: face absent.
- Plural: per row, left `data-lcs-vocab` === right; left exactly 1 `img`, right exactly `clones` (3) `img`s of the same `src`; right text === `displayWord(plural)`; `countable(e)` true.
- Bilingual: line 2 text === `vocab[key][partner][0]` in the partner's case (`displayWord(_, partner)`); line 2 font-family Nunito, line 1 Baloo 2; `data-lcs-partner === instance.unit`.
- Syllable: `data-lcs-split` joined === word lowercase; `[data-lcs-arcs]` === `count`; each `<path>` spans its syllable's cells (G1-305's test); entry carries `'TeX'`; hyphen locales: text === `split.join(hyphen)`.
- Poison set (each must FAIL, the correct draft is the control): the pedagogy's P1 to P12, plus P13 per-card dashed borders instead of the overlay (`[data-lcs-cut-v]` count 0), P14 an overlay 1 px narrower than the sheet (line endpoints), P15 `padding:4` (cut margin), P16 the old 760 block under three-line chrome (footer lint), P17 twin word card with a 26 px 12-glyph label (`scrollWidth`), P18 a cream card fill on the twin sheet (colour of `.ws-cutcard` !== `#FFFFFF`; the sheet must stay ink-light).

Hub: `scripts/verify-hub-type-rows.js --keys=picture-word-cards` expects 6 rows per locale, 5 in fi (F3 refused), 5 in no if the panel vetoes F3.

## 5. Primitives / components

**Reused (exact).** `svgRoot roundedRect line circle label esc` (`primitives/_svg.js`); `fileUri` (`image-cache/resolve.js`); `entriesFor displayWord countable distinctByWord sampleEntries` (`lib/b2-common.js`); `ARTICLES[loc].chips / chipsD3 / keyFor / chipDots` (`data/b2/articles.js`); `iconRows({theme, noun, n:3, perRow:3, iconPx:80, rng})` (`templates/components.js:10`, F4's three clones with the house +-4 deg jitter); `syllableWord({word, cell, fontPx})`, `syllableArcsForWord({split, cell, h, mode:'printed'})` (G1-305 `components-b3.js` + `primitives/syllable-arcs.js`, both NEW there, absent today, m); `.ws-icon`, `.ws-body` (`page.css`); tokens `T.white T.cream T.grid T.ink T.teal T.inkSoft`, `codeColors.codeBlue/codeRed/codeGreen`, `F.display F.body`. **NOT used:** `cardGrid` (gap 14, cream, badge numerals, border: a numbered problem card is the wrong object; the sheet is edge-to-edge), `.ws-card`, `countBadge`, `wordTiles` (Nunito 800 in a bordered tile with a drop shadow, a mechanic chip), `articleChips` (three chips = a choice; here the article is a given; only its dot idiom is copied), `mirrorGroups` (mirrors the clones), `wordBank`, `answerBox`, `rulingBlock`.

**NEW in `templates/components-b3.js`** (scoped inline CSS, no `page.css` edit; all HTML strings):
- `scissorsGlyph(size=26)`: byte-copy of K-240's function (K-240 untouched), `data-lcs-scissors`.
- `cutLines({w, h, cols, rows})` -> `svgRoot` w x h, `roundedRect({x:1.25, y:1.25, w:w-2.5, h:h-2.5, r:0, fill:'none', strokeColor:T.grid, strokeWidth:2.5, dash:'8 6', data:{'data-lcs-cut-frame':1}})` + for k in 1..cols-1 `line({x1:k*w/cols, y1:0, x2:same, y2:h, strokeColor:T.grid, strokeWidth:2.5, dash:'8 6', data:{'data-lcs-cut-v':k}})` + rows likewise (`data-lcs-cut-h`); root `data-lcs-cutlines`, `aria-hidden`, `style="position:absolute;inset:0;pointer-events:none"`.
- `cardSheet({cards, cols, rows, cellW, cellH, pad, kind, legend=null})` -> `<div class="ws-cardsheet" data-ws-content data-lcs-sheet=kind data-lcs-cols data-lcs-rows style="width:cols*cellW;margin:auto auto">` = strip 30 (`scissorsGlyph` left, `legend` html right, Nunito 700 16 `T.ink`) + `<div style="position:relative;display:grid;grid-template-columns:repeat(cols, cellW px);grid-auto-rows:cellH px;gap:0">` of `cards` + `cutLines`.
- `cutCard({inner, kind, vocabKey, word, twin=null, pad})` -> `<section class="ws-cutcard" data-lcs-card=kind data-lcs-vocab data-lcs-word [data-lcs-twin]>` white, `padding:pad`, flex column centred, `gap:6`.
- `wordPlate({lines, px, family='display', color=T.ink, dot=null, dotColor})` -> `<span class="ws-wordplate" data-lcs-lines=n>` cream r 10 `padding:3px 14px`, one `<span>` per line (`display:block; line-height:1.15`), `nowrap`; `dot` = `<svg width=16 height=16>` `circle r 7 fill codeColors[dotColor] stroke T.ink 1` inline before line 1 (the `articleChips` dot at 16 instead of 12, `components-b2.js:49`).
- `labelLines(word, {cap, maxLines})` -> `[lines]` or `null` (REFUSE): greedy wrap at spaces, each line <= cap glyphs (`[...s].length`, never `.length`), never inside a token, never at a hyphen.
- `wordCard({src, word, vocabKey, picPx, wordPx, cap})`, `pictureCard({src, vocabKey, picPx, twin})`, `wordOnlyCard({word, vocabKey, tiers, twin})`, `articleLabel({article, word, gender, dot})` = `wordPlate` with `lines: [article + ' ' + word]` or `[article, word]` and the dot, `pluralPair({entry, theme, rng, picPx:80})` -> two `cutCard`s, `bilingualLabel({host, partner})` = `wordPlate` with line 1 Baloo 2 26 `T.ink` and line 2 Nunito 700 20 `T.teal`, `twinSheet({entries, rng})` = `cardSheet` 4 x 4 with 8 `pictureCard` then 8 `wordOnlyCard` in a deranged order (`rng.shuffle` until no fixed point, the `lit-vocab-match.js:44` idiom).

## 6. Locale slot structure

Render reads `data/b3/picture-word-cards.js` (`PICTURE_WORD_CARDS[loc]`, generated from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`, the `apply-b2-locale.js` pattern) + `entriesFor` + `fileUri`; the code never inflects.
- **Label** = `displayWord(e.singular, loc)`; case keyed on gender presence: `e.gender` present -> `cardCase` (`keep` in de, else `lower`; pt may set `upper`); `e.gender` null (adjective / verb / colour) -> `lower` always (`Wuetend` -> `wuetend`). Themes: all 50 colour dirs; non-noun themes print on base / F2 / F5 only.
- **Longest-label caps per locale** (m; single token / whole label): base and F3 to F6 refuse a token > 20 glyphs (nl 1 word); twin refuses a label that does not wrap into <= 2 lines of <= 14 (en 4 · de 16 · es 2 · pt 8 · fr 4 · it 4 · nl 15 · sv 6 · da 7 · no 7 · fi 15 words catalogue-wide, m; every theme pool stays >= 8 in all 11, m). de compounds and fi are the two-line-prone Germanic pools; es/fr/it/pt are the multi-token pools (53 / 62 / 49 / 44 multi-token singulars, m).
- **Article (F3)**: literal `ARTICLES[loc].chips[keyFor(e,{level:3})]` (fr `l'` at level 3 only if `articleStyle.elision:'print'`, else REFUSED; it `chipsD3`); gender colour ONLY from `articleStyle.dots` (de `['codeBlue','codeRed','codeGreen']` = `ARTICLES.de.chipDots`; every other locale `null` until its panel declares one); `legend` literal iff dots. Palette rule: the dot is an SVG `circle` fill from `tokens.codeColors` (whitelisted by `qa/lints.js:9-15`, licensed as a legend swatch, which is what it is: the strip legend defines it); the article WORD stays `T.ink`, never a codeColor (text colour is not linted, so this is doctrine, not a gate; `validate-b3-draft.js` refuses any `color:` in a literal). In mono the word still reads because the article is spelled out.
- **Plural (F4)**: `displayWord(e.plural, loc)`, `countable(e)` only; nouns only.
- **Partner (F5)**: `instance.unit` = partner locale (`unitAxis`; exemplar `bilingual.partnerExemplar`, `en` in the 10 non-en, `es` in en); line 2 = `displayWord(vocab[key][unit][0], unit)`; legend `host name + legendSep + partnerNames[unit]`; titles may carry `{U}` (README `unitAxis` ruling).
- **Syllables (F6)**: approved entry (`'TeX'` in `sources_agreed`, `count` 2 to 4, letters <= 10) pre-resolved at apply time; `syllable.mark` `arc` (de/nl/sv/da/no/en/es/pt/it/fr default) or `hyphen` (fi, literal `-`); da `strictPool:true`.
- Strings: `strings['K-324'|F2..F6].{title, instruction}` (fi 5), the legend literals, `partnerNames` x 10.

## 7. Five variation layout deltas

- **F2 Twin Set (PARAM, d3 re-pointed).** `cardSheet` 4 x 4, cells 168 x 173, pad 10, inner 148 x 153. Rows 1 to 2: `pictureCard` picture 120 centred, no text. Rows 3 to 4: `wordOnlyCard`, plate centred, label tiers by glyphs per line (m, Baloo 2 700, 14.5 / 12.3 / 11.2 / 10.1 px per glyph): <= 9 -> 26 px · 10 to 11 -> 22 · 12 -> 20 · 13 to 14 -> 18; two lines allowed (plate 2 x lineH + 4), single token > 14 REFUSED. Overlay frame + 3 v + 3 h. ONE sheet, all 16 cards the same 44 x 46 mm: a Memory game is only fair when a face-down picture card and word card are indistinguishable, and one sheet is one cutting session (two half-sheets of different card sizes were rejected). Stamps `data-lcs-twin="p3"` / `"w3"`.
- **F3 Article Cards (CODE).** Base geometry; `articleLabel` in the plate: `[dot 16][6][der][8][Fledermaus]` at 26 px when `glyphs(article) + 1 + glyphs(noun) <= 19`; else two plate lines (`[dot] der` / noun) at 26 and the picture drops 104 -> 84 (84 + 6 + 64 = 154 > 149: so two-line article cards use 24 px lines, plate 58, picture 84, = 148). Legend in the strip (Nunito 700 16 with three 12 px dots) only when `dots`. fi: face absent.
- **F4 One and Many (CODE).** Base geometry, each ROW is a pair: left `cutCard` picture 80 + plate(singular); right `iconRows({n:3, perRow:3, iconPx:80})` (3 x 80 + 2 x 10 = 260 <= 313) + plate(plural). Equal picture sizes on both cards so the ONLY difference is number (the K-287 render shows 1 vs 2 to 3 at unequal sizes; a card set should not confound size with number). Stacks 80 + 6 + 36 = 122 both sides. No numeral, no `mirrorGroups`.
- **F5 Bilingual (CODE + `unitAxis`).** Base geometry, picture 84, `bilingualLabel`: plate 60 (host Baloo 2 700 26 / 30 `T.ink`, partner Nunito 700 20 / 24 `T.teal`; teal not `T.inkSoft`: 20 px Nunito in `#8A8276` on white prints as a 45 percent grey and the partner word is a real word, not a caption; the hierarchy is carried by family + size, which survives mono). 84 + 4 + 60 = 148. Partner cap 20 glyphs (Nunito 700 20 measures <= 9.5 px per glyph, m: `pachycephalosauruses` 208.9 for 20). Legend in the strip = `Deutsch . Englisch`.
- **F6 Syllable Cards (CODE, G1).** Base geometry, `.ws-icon` 72 (>= 44 G1 floor) + 4 + `syllableWord({cell:28, fontPx:26})` (svg 40; <= 10 letters = 280 <= 313) + 2 + `syllableArcsForWord({cell:28, h:26, mode:'printed'})` = 144 <= 149; de capital in cell 1. Hyphen locales (fi): picture 96 + 6 + plate 36 with `ka-me-ra` at 26 px (the hyphen adds `count - 1` glyphs to the cap).

Every face keeps the same sheet, overlay and scissors: a teacher who has cut one K-324 sheet has cut them all.

## 8. Two alternatives + recommendation

- **Alt A: 2 x 3 sheet, six 89 x 61 mm cards** (cells 337 x 230, picture 140, word 30). Closer to a playing card, sturdier when laminated, bigger picture. Rejected as the base: the pedagogy floor is 8 cards per theme (a routine, a pocket-chart row, a Memory set of 8 pairs), and 6 cards leave a theme half-shown; kept as the `cards:6` option a panel may pin for a locale whose labels are long (none needs it, m).
- **Alt B: portrait cards 4 x 2 (168 x 346, picture 140 over the word)**, the classic flashcard proportion. Rejected: the word column is 148 px, so 26 px holds only 9 glyphs and every Romance multi-token label wraps to 3 lines; the landscape 2 x 4 card gives the word 313 px and keeps one line for 20 glyphs.
- **Recommendation:** 2 x 4 landscape base with the cream plate; one 4 x 4 twin sheet; overlay cut lines. Alt A survives as a size option, never a face.

## 9. Risks, mitigations, print check

- **Overlay drift vs cells.** The SVG is positioned from the same `cellW/cellH` the grid uses and the block is fixed-size (`flex:0 0 auto`), so no stretch can desync them; the gate compares line endpoints against card rects at 722 and 814.
- **Dashes too faint in mono.** `T.grid #C8BFAE` at 2.5 px prints as a light grey (K-240's proven strip line); visible on the light table, never dominant against `T.ink` words. If a printer drops it, the outer frame remains as the alignment cue. Do not darken to `T.inkSoft`: a dark dashed grid competes with the cards.
- **Scissors touching content.** 12 px margins (3 mm) on every side; the gate measures the content bbox against the cell. A wobbly K cut of 2 mm stays clear of the plate.
- **Laminating.** Recommend in the landing prose: laminate the whole sheet, then cut on the dashed lines (flat cards, one pass); for sealed edges, cut first and laminate with a 3 mm border (the margin already exists inside the card). Cards at 2 x 4 are 46 mm tall: laminated they are rigid; unlaminated paper cards bend at 46 mm more than at 61 mm (Alt A). Card stock is suggested in the prose, never required.
- **Ink.** Cards are `T.white`, plates `T.cream`: the sheet is ink-light; a cream full-bleed sheet was rejected (`page.css` header comment: cream on accents, not full-bleed). Twin sheets print 8 pictures only.
- **Font trap.** All px above are file-origin measurements with the shell's woff2; the build gate re-measures `scrollWidth` in `render/one.js`. Nothing here was measured off a blank page.
- **Label refusals** are data (`labelLines` returns null; `sampleEntries` throws below 8), never fillers.
- **F6 depends on G1-305's new `syllableWord` / `syllableArcs`**; ship F6 hyphen-only if G1-305 lands later.

## 10. Summary

1. Eight 89 x 46 mm white cards edge to edge in a 674 x 692 sheet under a 30 px scissors strip = the 722 body; picture 104, word Baloo 2 700 26 on a cream plate, 12 px cut margin.
2. Cut lines are ONE SVG overlay (frame + 1 v + 3 h, `T.grid` 2.5 dash 8 6), continuous per line, never per-card borders; one K-240 scissors glyph.
3. Label caps from measured widths: 20 glyphs at 26 px on one line, multi-token to two lines at 24, single token > 20 refused (one nl word); twin cards 14 per line, tiers 26/22/20/18; every (theme, locale) pool >= 8.
4. Faces reuse the sheet: twin = one 4 x 4 sheet of identical cards (deranged), article = dot + literal in the plate (de dots from `ARTICLES.de.chipDots`, word in ink), plural = equal-size 1 vs 3, bilingual = Baloo host over Nunito teal partner via `unitAxis`, syllables = G1-305 cells + printed arcs.
5. No `verify()`: a structural gate asserts picture + word per card, distinct words, twin 1:1 + deranged, continuous overlay, cut margin, `scrollWidth <= clientWidth`, with 18 poisons.
