# K-324 `picture-word-cards` (K) : layout + apparatus design (2026-09-14)

Two-designer pass (A: page, cut geometry, print; B: child legibility, delight). Contract = `_work/K-324-pedagogy.md`. (m) = measured 2026-09-14: glyph counts by node over `lib/b2-common.js entriesFor` x the 50 colour dirs of `cache/manifest.json`; px widths by puppeteer from a `file://` page carrying `assets/fonts/fonts.css` as `page/shell.js` rewrites it (`document.fonts` reported Baloo 2 700 + Nunito 700 loaded; probe `Schlittschuhlaufen` 221.9 px vs 193.5 in the fallback serif). Scratch `k324-labels.js`, `k324-measure.js`, `k324-pools.js`. No em-dashes.

## 1. Page concept (base)

A materials sheet, not a task: eight white cards edge to edge, separated only by dashed cut lines, picture above word, nothing else. The child cuts one straight stroke per line; the teacher laminates and runs the routine (name it, read it, pocket chart, word wall). No numerals, badges, answers or `verify()`. Picture 104 px (27 mm), word Baloo 2 700 26 px on a cream name plate: legible at arm's length. The only lines on the page are the five cut lines and the plates.

## 2. Layout d2 at a 722 body

`.ws-page` inner 675 (`page.css:16-26`). Block = strip 30 + sheet 692 = 722, `flex:0 0 auto; margin:auto 0` inside `.ws-body`: under one-line chrome (814) the 92 px of slack splits above and below; nothing stretches, so the overlay geometry is fixed px.

```
x: 0 ......................................... 674
 [scissors 26]                    der=blau . die=rot . das=gruen     strip 30 (legend only when declared)
 +----------------------------------+----------------------------------+   y 30   outer frame, dashed
 |            [picture 104]         |            [picture 104]         |          T.grid 2.5, dash 8 6
 |         ( Fledermaus )           |          ( Katze )               |   cell 337 x 173
 +----------------------------------+----------------------------------+   y 203  cut 1
 |                                  |                                  |
 +----------------------------------+----------------------------------+   y 376  cut 2
 |                                  |                                  |
 +----------------------------------+----------------------------------+   y 549  cut 3
 |                                  |                                  |
 +----------------------------------+----------------------------------+   y 722
                             vertical cut at x 337
```

- Sheet 674 x 692 (2 x 337, 4 x 173 = 89 x 46 mm cards), `margin:0 auto`. Cells = CSS grid, `gap:0`. Cut lines are NOT borders: ONE `cutLines` SVG overlay (`position:absolute; inset:0; pointer-events:none`) draws the outer frame (`roundedRect` r 0: square corners keep a scissor stroke straight) + 1 vertical + 3 horizontal `line`s, `T.grid` 2.5, `stroke-dasharray 8 6`, butt caps. One element per cut keeps the dash phase continuous across the sheet (per-card borders restart the dashes at every cell edge). Style = K-240's `2.5px dashed #C8BFAE` (`K-240-cut-and-paste.js:83`).
- Scissors: `scissorsGlyph(26)` (K-240's, copied into `components-b3.js`, K-240 untouched) at x 0, y 2 of the strip, blades along the top edge; exactly one, `data-lcs-scissors`.
- Cell `.ws-cutcard`: `T.white`, no border, `padding:12px` (cut margin 3 mm; brief asked >= 6), flex column centred, `gap:6`, `overflow:hidden`. Inner 313 x 149. Nearest ink to any cut line = 12 px.
- Picture: `.ws-icon` 104 x 104, `fileUri(theme, noun)` (512 px derived copy, `image-cache/resolve.js:43`), colour dirs only; >= 96 (brief) >= 56 (K floor `_tokens.js:68`).
- Word: `wordPlate` `<span class="ws-wordplate">` `T.cream`, r 10, `padding:3px 10px`, Baloo 2 700 26 (line 30) `T.ink`, `nowrap`; plate 36 tall, width = text + 20, `max-width:313` (text <= 293). Stack 104 + 6 + 36 = 146 <= 149.
- Label rule (m). Baloo 2 700 26 measures at most 14.5 px per glyph on the densest catalogue tokens (`Wassermelone` 172.6 / 12, `opvaskemaskine` 195.6 / 14). **<= 20 glyphs = 26 px, one line** (20 x 14.5 = 290 <= 293; `pisco-de-peito-ruivo` 20 passes). **21 to 28 glyphs multi-token = 24 px, two lines**, wrap at the last space leaving both lines <= 16 glyphs (`campanilla de invierno`, `lunettes de protection`); plate 2 x 27 + 4 = 58, picture 84: 84 + 6 + 58 = 148. **Single token > 20 glyphs REFUSED**: catalogue-wide exactly one, nl `ambulanceverpleegkundige` 24 (m); sv `ambulanssjukvaardare` 19 and da `beskyttelsesbriller` 19 pass (18-glyph `pachycephalosaurus` = 241.8 at 26). Longest label per locale at 26 (m): en/nl/sv/da/no/fi 241.8 · de `Schlittschuhlaufen` 221.9 · fr 228.1 · pt 217.9 · es 212.9 · it 203.1, all < 293. Every 50 x 11 (theme, locale) pool keeps >= 8 labels (m). The gate's `scrollWidth` is the truth; glyph counts only pre-filter.
- Stamps: sheet `data-ws-content data-lcs-sheet="base" data-lcs-cols=2 data-lcs-rows=4`; card `data-lcs-card="word" data-lcs-vocab data-lcs-word`.

**d1 (2 x 2, wall display).** Same sheet, cells 337 x 346 (89 x 92 mm), `padding:16`, inner 305 x 314: picture 220 + 8 + plate 44 (word 32, line 38) = 272. Caps: <= 15 glyphs at 32 (15 x 17.9 = 269 <= 285; 16 fails), 16 to 20 at 26, multi-token 21 to 28 two lines at 24. Overlay frame + 1 v + 1 h.

**d3 = F2 twin set** (section 7): 16 cells 168 x 173 in 4 x 4, overlay frame + 3 v + 3 h.

## 3. Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| kind / cards / cols / rows | word / 4 / 2 / 2 | word / 8 / 2 / 4 | twin / 8 + 8 / 4 / 4 |
| cell / pad | 337 x 346 / 16 | 337 x 173 / 12 | 168 x 173 / 10 |
| pic / wordPx / plate | 220 / 32 / 44 | 104 / 26 / 36 | 120 (pictures) / tiers 26 to 18 (words) |
| one-line cap (glyphs) | 15 | 20 | 13 per line, <= 2 lines |
| refusal | token > 20 | token > 20 | token > 13 |

Guards key on `cols`/`kind`, never the level index. d3's config === F2 d2 (a game needs the pair apart; rule 2 met).

## 4. Structural gate (no verify)

`qa/verify-b3-picture-word-cards.js`, node over the rendered DOM, each face x 11 x pinned theme at d2 under three-line chrome (722) and one-line chrome (814):
- `qa/lints.js` clean. One `[data-lcs-sheet]`; `[data-lcs-card]` count === `cols x rows` (base 8, twin 16, plural 8, syllable 8); every card rect inside the sheet rect, no overlaps, cell size === config (+-1).
- Cards: exactly one `img` (`complete && naturalWidth > 0`, colour dir, no `BW|SW|BN|NB|ZW|SH|PB|MV|SV` marker); twin word cards exactly zero. `.ws-icon` >= 56 (>= 44 on F6).
- `data-lcs-word` and `data-lcs-vocab` distinct per block; plate text === `data-lcs-word`; `scrollWidth <= clientWidth` on every `.ws-wordplate` and line span (the only font measurement, in the real pipeline); line count === `data-lcs-lines`.
- Overlay: one `[data-lcs-cutlines]` sized to the sheet; `[data-lcs-cut-v]` === `cols - 1` with `x1 === x2 === k * cellW`, `y1 === 0`, `y2 === sheetH`; `[data-lcs-cut-h]` likewise; stroke `#C8BFAE`, dasharray present; one `[data-lcs-scissors]`.
- Cut margin: union bbox of `img` + `.ws-wordplate` >= 10 px inside the cell on all sides.
- Twin: picture vocab multiset === word vocab multiset; `data-lcs-twin="p<i>"`/`"w<i>"`; word card at word-block slot i !== picture at picture-block slot i (deranged); 20-seed sweep never identity.
- Article: text === `chip + ' ' + word` (or chip / word on two lines), chip === `ARTICLES[loc].chips[keyFor(e,{level:3})]`, dot fill === `codeColors[dots[key]]` iff `articleStyle.dots`; legend iff dots; fi absent.
- Plural: row keys equal; left 1 `img`, right exactly 3 same-`src` `img`s; right text === `displayWord(plural)`; `countable(e)`.
- Bilingual: line 2 === `displayWord(vocab[key][unit][0], unit)`, Nunito; line 1 Baloo 2; `data-lcs-partner === instance.unit`.
- Syllable: `data-lcs-split` joined === word lowercase; `[data-lcs-arcs]` === `count`; each `<path>` spans its cells; entry carries `'TeX'`; hyphen locales text === `split.join('-')`.
- Poison (each FAILS; the correct draft is the control): the pedagogy's P1 to P12 + P13 per-card dashed borders instead of the overlay (`[data-lcs-cut-v]` 0) · P14 overlay 1 px narrower than the sheet · P15 `padding:4` · P16 the old 760 block under three-line chrome (footer lint) · P17 twin word card 12 glyphs at 26 px (`scrollWidth`) · P18 cream fill on `.ws-cutcard` (must be `#FFFFFF`).
- Hub: `scripts/verify-hub-type-rows.js --keys=picture-word-cards` expects 6 rows per locale, 5 in fi (F3 refused; 5 in no if its panel vetoes F3).

## 5. Primitives / components

**Reused (exact).** `svgRoot roundedRect line circle esc` (`primitives/_svg.js`) · `fileUri` (`image-cache/resolve.js`) · `entriesFor displayWord countable distinctByWord sampleEntries` (`lib/b2-common.js`) · `ARTICLES[loc].chips / chipsD3 / keyFor / chipDots` (`data/b2/articles.js`) · `iconRows({theme, noun, n:3, perRow:3, iconPx:80, rng})` (`templates/components.js:10`, house +-4 deg jitter) · `syllableWord({word, cell, fontPx})` + `syllableArcsForWord({split, cell, h, mode:'printed'})` (G1-305's NEW `components-b3.js` + `primitives/syllable-arcs.js`, absent today, m) · `.ws-icon .ws-body` · tokens `T.white T.cream T.grid T.ink T.teal`, `codeColors.codeBlue/codeRed/codeGreen`, `F.display F.body`. **NOT used:** `cardGrid` / `.ws-card` (gap 14, cream, border, badge numerals: a problem card, not a cut card), `wordTiles` (a bordered mechanic chip), `articleChips` (three chips = a choice; only its dot idiom is copied), `mirrorGroups` (mirrors the clones), `countBadge`, `wordBank`, `answerBox`.

**NEW in `templates/components-b3.js`** (inline scoped CSS, no `page.css` edit):
- `scissorsGlyph(size=26)`: byte-copy of K-240's, `data-lcs-scissors`.
- `cutLines({w, h, cols, rows})` -> `svgRoot` w x h: `roundedRect({x:1.25, y:1.25, w:w-2.5, h:h-2.5, r:0, fill:'none', strokeColor:T.grid, strokeWidth:2.5, dash:'8 6', data:{'data-lcs-cut-frame':1}})` + for k in 1..cols-1 `line({x1:k*w/cols, x2:same, y1:0, y2:h, strokeColor:T.grid, strokeWidth:2.5, dash:'8 6', data:{'data-lcs-cut-v':k}})` + rows likewise (`data-lcs-cut-h`); root `data-lcs-cutlines`, `aria-hidden`, `style="position:absolute;inset:0;pointer-events:none"`.
- `cardSheet({cards, cols, rows, cellW, cellH, pad, kind, legend=null})` -> `<div class="ws-cardsheet" data-ws-content data-lcs-sheet=kind data-lcs-cols data-lcs-rows style="width:cols*cellW;margin:auto">` = strip 30 (`scissorsGlyph` left; `legend` html right, Nunito 700 16 `T.ink`) + `<div style="position:relative;display:grid;grid-template-columns:repeat(cols,cellW px);grid-auto-rows:cellH px;gap:0">` of `cards` + `cutLines`.
- `cutCard({inner, kind, vocabKey, word, twin=null, pad})` -> `<section class="ws-cutcard" data-lcs-card=kind data-lcs-vocab data-lcs-word [data-lcs-twin]>`.
- `labelLines(word, {cap, maxLines})` -> `[lines]` or `null` = REFUSE; greedy wrap at spaces, `[...s].length` glyphs, never inside a token or at a hyphen.
- `wordPlate({lines, px, family='display', color=T.ink, dot=null})` -> `<span class="ws-wordplate" data-lcs-lines=n>` cream r 10, one block `<span>` per line (`line-height:1.15`), `nowrap`; `dot` = inline `<svg 16x16>` `circle r 7 fill codeColors[dot] stroke T.ink 1` before line 1 (the `articleChips` dot, `components-b2.js:49`, at 16 not 12).
- `wordCard({src, word, vocabKey, picPx, wordPx, cap})` · `pictureCard({src, vocabKey, picPx, twin})` · `wordOnlyCard({word, vocabKey, tiers, twin})` · `articleLabel({article, word, dot})` · `pluralPair({entry, theme, rng, picPx:80})` -> two `cutCard`s · `bilingualLabel({host, partner})` · `twinSheet({entries, rng})` = `cardSheet` 4 x 4, 8 `pictureCard` then 8 `wordOnlyCard` deranged (`rng.shuffle` until no fixed point, `lit-vocab-match.js:44` idiom).

## 6. Locale slot structure

Render reads `data/b3/picture-word-cards.js` (`PICTURE_WORD_CARDS[loc]`, generated from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`, the `apply-b2-locale.js` pattern) + `entriesFor` + `fileUri`; the code never inflects.
- **Label** = `displayWord(e.singular, loc)`; case keyed on gender presence: `e.gender` present -> `cardCase` (`keep` in de, else `lower`; pt may set `upper`); `e.gender` null (adjective / verb / colour) -> `lower` always (`Wuetend` -> `wuetend`). Non-noun themes print on base / F2 / F5 only.
- **Caps per locale** (m): base and F3 to F6 refuse a token > 20 glyphs (nl 1 word); twin refuses what does not wrap into <= 2 lines of <= 13 (words catalogue-wide: en 5 · de 25 · es 7 · pt 14 · fr 11 · it 6 · nl 21 · sv 14 · da 10 · no 9 · fi 28; every theme pool stays >= 8; a 12-glyph cap would drop de/fi post office to 7). de compounds and fi are the two-line-prone pools; es/fr/it/pt are the multi-token pools (53 / 62 / 49 / 44 multi-token singulars, m).
- **Article (F3)**: literal `ARTICLES[loc].chips[keyFor(e,{level:3})]` (fr `l'` only with `articleStyle.elision:'print'`, else refused; it `chipsD3`); gender colour ONLY from `articleStyle.dots` (de `['codeBlue','codeRed','codeGreen']` = `ARTICLES.de.chipDots`; others `null` until a panel declares one); `legend` literal iff dots. Palette rule: the dot is an SVG `circle` fill from `tokens.codeColors` (whitelisted by `qa/lints.js:9-15`, licensed for legend swatches, which this is: the strip legend defines it); the article WORD stays `T.ink`. HTML text colour is not linted, so `validate-b3-draft.js` refuses any `color:` in a literal. In mono the article is still spelled out.
- **Plural (F4)**: `displayWord(e.plural, loc)`, `countable(e)`, nouns only.
- **Partner (F5)**: `instance.unit` = partner locale (`unitAxis`; exemplar `bilingual.partnerExemplar`: `en` in the 10 non-en, `es` in en); line 2 = `displayWord(vocab[key][unit][0], unit)`; legend `hostName + legendSep + partnerNames[unit]`; titles may carry `{U}`.
- **Syllables (F6)**: approved entry (`'TeX'` in `sources_agreed`, `count` 2 to 4, letters <= 10) pre-resolved at apply time; `syllable.mark` `arc` or `hyphen` (fi, literal `-`); da `strictPool:true`.
- Strings: `strings['K-324'|F2..F6].{title, instruction}` (fi 5), legend literals, `partnerNames` x 10.

## 7. Five variation layout deltas

- **F2 Twin Set (PARAM = d3).** `cardSheet` 4 x 4, cells 168 x 173, pad 10, inner 148 x 153. Rows 1 to 2: `pictureCard`, picture 120, no text. Rows 3 to 4: `wordOnlyCard`, plate `padding:3px 6px` (text <= 136), tiers per line (m: 14.5 / 12.3 / 11.2 / 10.1 px per glyph): <= 8 glyphs 26 px (116) · 9 to 10 -> 22 (123) · 11 to 12 -> 20 (134) · 13 -> 18 (131); <= 2 lines (plate 2 x lineH + 4); else REFUSED. ONE sheet of 16 identical 44 x 46 mm cards: Memory is fair only when a face-down picture card and word card are indistinguishable, and one sheet is one cutting session (two half-sheets with different card sizes rejected). Overlay frame + 3 v + 3 h; stamps `data-lcs-twin="p3"` / `"w3"`.
- **F3 Article Cards (CODE).** Base geometry; `articleLabel` in the plate: `[dot 16][6][der Fledermaus]` at 26 px when `glyphs(article) + 1 + glyphs(noun) <= 18` (18 x 14.5 + 22 = 283 <= 293); else two lines at 24 (`[dot] der` / noun <= 20 glyphs), plate 58, picture 84 = 148. Legend in the strip (Nunito 700 16 + three 12 px dots) only when `dots`. fi absent.
- **F4 One and Many (CODE).** Base geometry, each ROW a pair: left picture 80 + plate(singular); right `iconRows({n:3, perRow:3, iconPx:80})` (260 <= 313) + plate(plural). Equal picture sizes so the ONLY difference is number (K-287 confounds size with number; a card set must not). Stacks 80 + 6 + 36 = 122. No numeral.
- **F5 Bilingual (CODE + `unitAxis`).** Base geometry, picture 84, `bilingualLabel` plate 60: host Baloo 2 700 26 / 30 `T.ink`, partner Nunito 700 20 / 24 `T.teal` (not `T.inkSoft`: 20 px Nunito in `#8A8276` prints as a 45 percent grey and the partner word is a word, not a caption; the hierarchy rides on family + size, which survives mono). 84 + 4 + 60 = 148. Partner cap 20 glyphs (Nunito 700 20 <= 9.5 px per glyph, m: `pachycephalosauruses` 208.9). Legend `Deutsch . Englisch`.
- **F6 Syllable Cards (CODE, G1).** Base geometry: `.ws-icon` 72 (>= 44) + 4 + `syllableWord({cell:28, fontPx:26})` (svg 40; <= 10 letters = 280 <= 313) + 2 + `syllableArcsForWord({cell:28, h:26, mode:'printed'})` = 144 <= 149; de capital in cell 1. Hyphen locales (fi): picture 96 + 6 + plate 36 with `ka-me-ra` at 26 (the hyphens add `count - 1` glyphs to the cap).

## 8. Two alternatives + recommendation

- **Alt A: 2 x 3, six 89 x 61 mm cards** (cells 337 x 230, picture 140, word 30): playing-card proportion, sturdier laminated, bigger picture. Rejected as base: the pedagogy floor is 8 cards per theme (a pocket-chart row, 8 Memory pairs); six leave a theme half-shown. Kept as a `cards:6` size option a panel may pin, never a face.
- **Alt B: portrait 4 x 2 (168 x 346)**, the classic flashcard shape. Rejected: a 148 px word column holds 9 glyphs at 26 px and wraps every Romance multi-token label to three lines; landscape 2 x 4 gives the word 313 px and one line for 20 glyphs.
- **Recommendation:** 2 x 4 landscape base with the cream plate, one 4 x 4 twin sheet, overlay cut lines.

## 9. Risks, mitigations, print check

- **Overlay vs cells drift.** Both derive from the same `cellW/cellH` and the block is fixed-size; the gate compares line endpoints to card rects at 722 and 814.
- **Dashes in mono.** `T.grid #C8BFAE` at 2.5 px prints as a light grey (K-240's proven strip line): visible, never dominant. Do not darken to `T.inkSoft`; a dark dashed grid competes with the cards.
- **Scissors touching content.** 12 px (3 mm) margins on every side, gated on the content bbox; a 2 mm K wobble stays clear of the plate.
- **Laminating and durability.** Landing prose: laminate the sheet, then cut on the dashed lines (flat cards, one pass); for sealed edges cut first, laminate with a 3 mm border. A laminated 46 mm card is rigid; on plain paper it bends more than Alt A's 61 mm. Card stock suggested, never required.
- **Ink.** Cards `T.white`, plates `T.cream`: ink-light; a cream full-bleed sheet is rejected (`page.css` header: cream on accents, not full-bleed). Twin sheets print 8 pictures only.
- **Font trap.** Every px above was measured with the shell's woff2 from `file://`; the build gate re-measures `scrollWidth` in `render/one.js`.
- **Refusals** are data (`labelLines` null, `sampleEntries` throws below 8), never fillers.
- **F6 depends on G1-305's `syllableWord` / `syllableArcs`**; ship F6 hyphen-only if G1-305 lands later.

## 10. Summary

1. Eight 89 x 46 mm white cards edge to edge in a 674 x 692 sheet under a 30 px scissors strip = the 722 body; picture 104, Baloo 2 700 26 on a cream plate, 12 px cut margin.
2. Cut lines = ONE SVG overlay (frame + 1 v + 3 h, `T.grid` 2.5 dash 8 6), continuous per line, never per-card borders; one K-240 scissors glyph.
3. Caps from measured widths: 20 glyphs at 26 px one line, multi-token to two lines at 24, single token > 20 refused (one nl word); twin 13 per line, tiers 26/22/20/18; every (theme, locale) pool >= 8.
4. Faces reuse the sheet: twin = one 4 x 4 sheet of identical deranged cards; article = codeColor dot + literal, word in ink; plural = equal-size 1 vs 3; bilingual = Baloo host over Nunito teal partner via `unitAxis`; syllables = G1-305 cells + printed arcs.
5. No `verify()`: a structural gate asserts picture + word per card, distinct words, twin 1:1 + deranged, continuous overlay, cut margin, `scrollWidth <= clientWidth`, with 18 poisons.
