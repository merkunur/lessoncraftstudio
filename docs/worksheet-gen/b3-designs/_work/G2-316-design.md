# G2-316 `compound-words` - design (Designer A composition + Designer B child view, 2026-09-13)

Every file, primitive and option below was read in the repo (`page/page.css`, `templates/components-b2.js`, `templates/components.js`, `layouts/card-grid.js`, `primitives/trace-path.js`, `lib/b2-common.js`, `image-cache/resolve.js`, `primitives/_tokens.js`). Pool numbers are MEASURED 2026-09-13 by a node draft: vocab singulars (`/^\p{L}+$/u`) that split into two OTHER vocab words both pictured in a colour theme of `cache/manifest.json`, optional link (`de s n en er e` · `nl en s e` · `sv s e` · `da/no e s er` · `fi n`). An UPPER BOUND with false hits the panel strikes (`hamster`, `vandring`, `fotografering`, `bijbel`); the panel may ADD pairs whose compound is a real word but not a vocab key (`snow + man`), since only the PARTS must be pictured.

| loc | draft pairs (both parts pictured, compound pictured) | length <= 12 / max | linked pairs in the draft |
|---|---|---|---|
| en | 20 | 20 / 10 | 0 (closed compounds have no link; open compounds never enter, the space fails `\p{L}+`) |
| de | 25 | 24 / 14 (`Kleiderschrank`) | 5 (Kleid-er, Glocke-n, Löwe-n, Sonne-n, Blume-n) |
| nl | 25 | 22 / 14 | 4 (tand-en, boek-en, paard-en, blauw-e) |
| sv | 23 | 22 / 13 | 0 real (fog-s pairs such as `körsbärsträd` need the panel: `träd` is not a pictured key) |
| da | 30 | 28 / 13 | 4 (vask-e, får-e, fugl-e, næsehorn-s) |
| no | 25 | 24 / 13 | 4 (vask-e, ost-e, sel-e, levering-s) |
| fi | 23 | 21 / 15 (`varvassandaalit` refused) | 0 (draft is nominative-first; genitive compounds `auringonkukka` are panel additions) |
| es pt fr it | n/a: word families (§7), panel bank | | |

Identity: `G2-316` / `compound-words`, band G2 all 11, `default_subject:'letters'`, `assetClass:'icon-placement'`, **`themeAxis:{applicable:false}`** (compounds span themes; pictures via G1-306's NEW `lib/b3-picture-index.js pictureFor(rng, key, loc)`, BW dirs skipped, `excluded()` applied). Faces `G2-320+ (TBD by the emitter)`. Data = `data/b3/compound-words.js[loc]` (generated from `i18n/.draft-b3-<loc>.json`, the b2 pattern); the code substitutes literals and never joins, inflects or infers a link.

## 1. Page concept (base, Germanic + fi)

"Two pictures make one word." Eight full-width cream rows, each an equation the child reads left to right: picture + picture = a school-line lane where the child writes the compound, with the locale's link letter where the pair needs one (`Sonne + Blume = Sonnenblume`). No text is printed on the page except the teal `+` and `=`. The child names both pictures (vocab words she knows), hears the join, decides the link, writes. Distinct from G1-306 Join (printed syllables), K-231 (letters), G1-244 (one picture, one word), G1-307 prefix face (affix legend, one base word).

## 2. Layout + px grid (d2)

Page 703x945, `.ws-page` padding 0 14 -> inner **675** (`page.css:16-26`); body ≈ 760 (exact UNKNOWN, engineer measures; every stack below is also proven at 736).

```
+------------------------------ .ws-lane row 675x84 ------------------------------+
|(3) [pic A 64]  +  [pic B 64]  =  |______________ lane 410x64 glyphH 28 ________|
|                                   |- - - - - - - - - - - - - - - - - - - - - - -|
|                                   |_____________________________________________|
+---------------------------------------------------------------------------------+
   8 rows, gap 12: 8x84 + 7x12 = 756 <= 760 (gap 8 -> 728 at a 736 body)
```

- Row = `.ws-lane` (`page.css:392`: cream, 2 px `#F0E4CB`, r 14) with inline `padding:8px 14px` -> inner **643x64**. Contents on one flex line, `align-items:center`: `countBadge(i+1)` (`components-b2.js:243`, `.ws-countbadge` absolute -8/-8) · `img` A 64 · gap 10 · `opGlyph('+')` 28x28 · gap 10 · `img` B 64 · gap 10 · `opGlyph('=')` 28 · gap 12 · `writingRow({w:410, h:64, glyphH:28, xHeight:true}).svg` (`trace-path.js:681`, `data-lcs-prim="writing-row"`). 64+10+28+10+64+10+28+12 = 226; 643-226 = 417 -> lane 410, 7 px slack.
- Lane capacity: G1-305 estimated ≈ 21 px per glyph at glyphH 28 -> ≈ 19 letters (est., engineer measures in the browser). **Pool cap: `[...word].length <= 14` at d2.** `Schmetterlingsflügel` (20) never enters: `Flügel` is not a pictured key; the measured maxima are de 14, fi 15 (one refusal). 14 x 21 = 294 <= 410 leaves room for a G2 hand that writes wide.
- `opGlyph(ch)` = `svgRoot 28x28`, `label` Baloo 2 700 26 `T.teal`, anchor middle, `data-lcs-op`. Pictures `pictureFor()`, 64 >= G2 element floor 36 (`density.G23`, `_tokens.js:70`); items 8 within [8,16].
- Link-letter box (face b only, §7): `linkBox({w:36, h:36})` = `roundedRect r 8, T.white, T.coral 2.5, dash 6 5, data-lcs-linkbox`; width FIXED by `d.linkBoxW`, never by the answer (a 1-letter and a 2-letter link get the same box; an empty link gets the same box).

**d1 / d3 deltas (rows only; same components).** d1: 6 rows h 116 (6x116 + 5x12 = 756), inner 96: pictures 68 with the part WORD printed under each in Nunito 800 18 `T.ink` (`displayWord`, de keeps the capital), lane 400x76 glyphH 34; link-free pairs only, so joining is pure concatenation. d3: 10 rows h 66 (10x66 + 9x10 = 750), inner 50: pictures 48, lane 426x50 glyphH 24 (the G2 floor), no badges; >= 4 linked pairs where the locale has links, length <= 14.

## 3. Ladder (resolved `difficulty`; guards key on these keys, never the index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| rows / rowH / pic | 6 / 116 / 68 | 8 / 84 / 64 | 10 / 66 / 48 |
| lane w / h / glyphH | 400 / 76 / 34 | 410 / 64 / 28 | 426 / 50 / 24 |
| partWords (printed under pictures) | true | false | false |
| minLinked / maxLetters | 0 (link-free pool) / 12 | 2 where the locale has links, else 0 / 14 | 4 where available / 14 |
| distinctParts | true | true | true |

`sampleEntries(rng, pool, d.rows, 'G2-316')` (`lib/b2-common.js:64`) throws when short; a locale below 8 eligible pairs is REFUSED and recorded, never filled. `distinctParts`: no picture appears twice on the page (greedy pick, gate-measured >= 8 reachable: en `watermelon toothbrush handbag football armchair bookshelf starfish raincoat` by hand).

## 4. Answer-hiding + uniqueness

- Bank entry (panel literal): `{ a:'sun', b:'flower', word:'sunflower', link:'', aForm:null, bForm:null }`; `aForm`/`bForm` only when a part changes shape before the join (de `Kleid`->`Kleider`, nl `paard`->`paarden`, fi `aurinko`->`auringon` written as `aForm`, `link:''`). Romance entries §7.
- Stamps, hidden, on every row: `data-lcs-a` `data-lcs-b` (vocab keys), `data-lcs-link` (`''|'s'|'n'|'en'|…`), `data-lcs-word` (display form), `data-lcs-cut` (= `word.length - (bForm||sg(b)).length`, faces c/e read it), `data-lcs-face`. Root `[data-ws-content]` carries `data-lcs-face` + `data-lcs-linkboxw`.
- Node gate `tools/gate-compound-words-data.js` re-derives from the bank, never the page: `word === (aForm||sg(a)) + link + (bForm||sg(b))` case-folded (poison: `Sonneblume` -> FAIL); `cut` consistent; `(a,b)` occurs once in the bank; every part pictured via `pictureFor` (poison: `wing`); length <= `d.maxLetters`; d2 `minLinked` met; no BW dir; da uses the full pool (G2-315 precedent). 0 pairs checked = FAIL.
- Browser `verify(page)`: rows === `d.rows`; per row two `img` with `naturalWidth > 0`, `[data-lcs-op]` reading `+` then `=`, one `[data-lcs-prim="writing-row"]` <= 410 wide; **no text node equals any stamped `data-lcs-word`** (base, b, d, g); no part key repeated; svg widths <= 643.
- Match halves (d): right column order is a DERANGEMENT of the partner order (no partner on its own row) and !== identity; left column shuffled against bank order; cross-pair gate: for i != j, `(a_i, b_j)` is not a bank pair and not in the panel's `alsoValid` list (`sun+fish`, `rain+drop`), else two lines are correct (poison: `sun|flower` + `star|fish` with `sunfish` in `alsoValid` -> FAIL).
- Split (c): the cut is the only stamp; verify re-derives `word.slice(cut)` === `bForm||sg(b)` case-folded; the cell svg has no `<path>`, no gap, no tick; cells `n === [...word].length`; no text equals the word with a separator inserted (`[\s\-|·/]`).

## 5. Primitives / components

Reused: `.ws-lane .ws-scene-banner .ws-bankword .ws-tile .ws-tilerow .ws-match .ws-match-item .ws-match-dot` (`page.css`); `writingRow` (`trace-path.js:681`), `rulingBlock` (`components-b2.js:58`), `wordTiles` (`:26`), `countBadge` (`:243`), `wordBank` (`:210`); `cardGrid` (face b); `svgRoot roundedRect line label el esc` (`_svg.js`); `displayWord excluded distinctByWord sampleEntries` (`lib/b2-common.js`); G1-305's `syllableWord` (equal cells, no borders), G1-306's `pictureFor`. NOT used: `answerBox` (numeral box), `letterBoxes` (leaks length), `strokeWordLane` (nothing to trace), `syllableJoin` (prints the parts as text).

NEW in `templates/components-b3.js` (HTML + inline SVG on tokens):
- `compoundRow({picA, picB, lane:{w,h,glyphH}, index, linkBox=null, partWords=null, ghostRoot=null})` -> the §2 row; `partWords` prints two literals under the pictures (d1); `linkBox` inserts `linkBox()` between the word tiles (face b uses tiles: `wordTiles({tokens:[A,B], fontPx:18, tileH:36})` split around the box); `ghostRoot` = a second copy of the shared picture at `opacity:.55` in its true position (face g).
- `opGlyph(ch)` as §2. `linkBox({w,h})` as §2.
- `splitWord({word, cell, fontPx})` = `syllableWord` + a `mode:'cut'` rail: `line({y: cell+8, strokeColor:T.grid, strokeWidth:1})` across the cells so the pencil has a floor; no marker of any kind (the cut position is never drawn).
- `familyTree({root:{pic, word=null, side:'left'}, lanes:[{cue:{pic}|{chip}|{pic,scale}, lane:{w,h,glyphH}}], w:675})` = one `.ws-lane` block: root picture 96 in a white `roundedRect r 16` hub at the left (root word printed in Baloo 2 700 24 only when `word` given: Romance), an SVG bracket (`T.teal` 2, round caps) from the hub to each lane, then N lanes of `[cue][+][ghostRoot 56 @.55][=][writingRow]`; `chip` cue = `.ws-tile` with the affix literal; `scale` cue = the picture at `40` or `88` px (face h, Romance 5th); stamps `data-lcs-root`, per lane `data-lcs-word`.

## 6. Locale slot structure

`i18n/strings.<loc>.json` keyed by id (`G2-316` + five face ids) `{title, instruction}`; `i18n/skill-sentences.<loc>.json` key `compound-words`; taxonomy `apps.compound-words` + `axes['exercise-type'].compound-words.{slug,name}` x11 (measured absent, registrar required; hub gate `scripts/verify-hub-type-rows.js --keys=compound-words`, 6 rows per locale minus recorded refusals); `data/b3/compound-words.js[loc]`:
```
{ shape:'compound'|'family', casing:'keep'|'lower', links:['s','n','en'], linkBoxW:36|90,
  pairs:[{a,b,word,link,aForm,bForm}], alsoValid:[['sun','fish']], nonCompounds:['elephant', …],
  stars:[{root:'tree', side:'right', partners:['apple','lemon','banana','pear']}],
  families:[{root:'pan', rootWord:'pan', lanes:[{affix:'-adero', word:'panadero', cut:3, cue:{pic:'baker'}|{gloss:'…'}}]}],
  sizePairs:[{root:'house', small:'casinha', big:'casarão'}], strings:{…} }
```
Per locale: **de** `casing:'keep'` (`Sonnenblume`; d1 part words keep their capital; verify case-folds after the first letter), cut after the Fugenelement (`Sonnen|blume`: the link belongs to the Bestimmungswort) · **nl** lowercase, tussen-n/-s (`paardenbloem`, `koksmes`), IJ never split · **sv/da/no** lowercase, fog-s, bare singular parts (`bana`, never `banan`) · **fi** draft is nominative-first; genitive compounds as `aForm` literals (`auringon`); instruction a whole authored literal (case) · **en** closed compounds, `link` always `''`, (b) REFUSED · **es pt fr it** `shape:'family'` (§7): root + affix lanes, `rootWord` printed, `cut` authored; pt = BNCC EF02LP aumentativo/diminutivo via `sizePairs` (or families); fr may refuse the size face. Titles = the §7 heads of `_PANEL-FINDINGS.md`; the panel renames; no worksheet-word; <= 70.

## 7. The five variations + the Romance base rebuild

Chosen: **(b) link box · (c) split · (d) match halves · (e) detective · (g) word star** (the fifth, my proposal). Why: each changes the child's ACT (decide the link / cut / pair / classify / build a family), owns a search head (Fugenelement · zerlegen · Hälften verbinden · Wortdetektiv · `Wörter mit -baum`), maps onto the Romance family unit by data, and none is a range of the base. Rejected: plural of the compound (singular-plural family), compound in a sentence (frames not in the bank), long compounds (= d3), (f) as a face (it is the Romance BASE). All are CODE faces (`d.mode` knob + verify branch, stamped only when declared; base byte-identical).

**(b) Link Letter Box (`mode:'link'`).** 8 cards `cardGrid({cols:2, rows:4})`: card (760 - 42) / 4 = 179 -> inner 302x151, stage `padding:6px 0`. Stack: `[tile A][linkBox 36][tile B]` (`wordTiles` font 18 tileH 36; caps A <= 9 letters, B <= 8: `Geburtstag + Kuchen` = 144+8+36+8+96 = 292 <= 302) + 8 + `writingRow 302x60 glyphH 28` + 6 = 116 <= 151. Child: write the link in the box (or leave it empty) and the whole word on the lane. d2: >= 3 linked and >= 3 unlinked of 8 (never guessable); word <= 14. Ships de nl da no from the draft; sv fi when the panel authors >= 3 linked pairs; en REFUSED (no link morphology); Romance = the SUFFIX box `[root pic 40][tile root][linkBox 90][=][lane]`, cue = derivation picture (`panadero` -> `baker`) or a printed gloss, a 3-chip affix legend (`.ws-scene-banner` 675x48) on top; the box holds the affix (`adero`). Query face: "linking letter" (Fugen-s / tussen-n / fog-s / suffix).

**(c) Split the Compound (`mode:'cut'`).** 8 rows h 84, inner 64: `[badge][pic 56 of the COMPOUND itself][splitWord n <= 14, cell 32 (14x32 = 448 <= 575), Baloo 2 700 30]`; the child draws ONE vertical pencil line where the second word starts; the compound's own picture makes the printed word readable. Pool = pairs whose `word` is a pictured key (the whole draft; panel additions without a picture fall back to the two part pictures at 40 px, flagged `data-lcs-picfallback`). Romance: derived word in cells, cut after the root (`flor|ero`, `pan|adero`, es "subraya la raíz"). d1 6 rows cell 36 words <= 10; d3 10 rows cell 28. Query face: "split the compound" (zerlegen / verdelen / jaa yhdyssana / la raíz).

**(d) Match the Halves (`mode:'match'`).** 6 rows h 100 (6x100 + 5x12 = 660): `[writingRow 300x64 glyphH 28][left .ws-match-item 88 + dot][line gap 120][right .ws-match-item 88 + dot]` = 300+12+88+120+88 = 608 <= 643. Child: draw a line from a first-part picture to its second part, then write the compound on the lane of the FIRST picture. Right column deranged; 12 distinct pictures; cross-pair gate §4. Romance: right items are printed derived WORDS (`.ws-tile` font 20: `florero`, `panadería`), left = 6 root pictures; the child writes the ROOT on the lane (a root is the smaller unit; verify: `right.word.slice(0,cut)` === root stem). d1 4 pairs pic 100; d3 8 pairs h 76 pic 64 lane 50. Query face: "match the halves" (Wortteile verbinden / verbind de delen / yhdistä sanat / une la raíz).

**(e) Compound Detective (`mode:'detect'`).** Top: `wordBank({words:10, wordPx:18, withIcons:true})` (44 px icons, 2-3 rows ≈ 150); + 16; six two-part lanes: `rulingBlock({rows:6, w:290, h:64, glyphH:28})` twice, side by side with a 28 px `opGlyph('+')` column between (290+28+290 = 608); 150+16+414 = 580 <= 760. Child: circle the six compound words, write each one's two parts. `nonCompounds` = 4 panel literals >= 6 letters, not decomposable into two pictured words (machine-checked: `pineapple` fails), each with its own picture (pictures never reveal compoundness); bank shuffled. Romance: family members + intruders (fr "chasse à l'intrus": `pain panier panetière` where `panier` is the intruder), write root + affix. d1 8 words 4/4 with a 2-column word cue; d3 12 words 7/5, no icons. Query face: "compound or not" (Wortdetektiv / samenstelling of niet / yhdyssana vai ei / l'intrus).

**(g) Word Star (`mode:'star'`, the fifth).** Two `familyTree` blocks 675x352 (2x352 + 16 = 720): hub = the SHARED part picture 96 (`tree`, `cake`, `blume`), 4 lanes `[partner pic 56][+][ghost root 56 @.55, in its true order][=][writingRow 320x64 glyphH 28]` (210 + hub 110 + 320 <= 643). The move the base cannot make: the head is FIXED and the link changes with the partner (`Apfel|baum` vs `Zitronen|baum`, `cheese|cake` vs `cup|cake`). The ghost reads as "the same word again" and prints ≈ 30 % grey (mono test; fallback `.65`). The draft reaches only 3-partner heads (en `-cake`, de `-blume`, fi `-pallo`, nl `-vogel`): the panel authors `stars[]` with >= 4 pictured partners, or the face ships `stars:3, lanes:3` (9 items), or is REFUSED. Romance 5th = **(h) Big or Small** (`mode:'size'`, pt/es/it; fr may refuse): the base ROW layout with the root picture at 40 or 88 px as the only cue (`casinha` / `casarão`, `gatito` / `gatote`); scale IS the instruction, no adjective printed. Query face: "words with -tree" (Wörter mit -baum / ord med -träd / -puu sanat / aumentativo e diminutivo).

**(f) Romance base = the tree.** `familyTree` x2, root picture 96 + `rootWord` printed (Baloo 2 700 24, the root is the given), 4 lanes each `[affix chip .ws-tile "-ero"][=][writingRow 380x64]`, derivation picture at 40 px beside the chip when pictured (`baker`, `bakery`, `florist`), else nothing (the chip is the cue). 2x352 + 16 = 720. The child writes 8 derived words; verify = literal equality with `families[].lanes[].word`, never `root + affix` (`pan + ero != panadero`). pt: BNCC EF02LP aumentativo/diminutivo may replace families by `sizePairs` on the tree (chips `-inho` / `-ão`). Heads: `familia de palabras` (SEP), `mots de la même famille CE1`, `famiglie di parole`, pt panel re-target. The Germanic locales get the tree as face (g); the Romance locales get the rows as face (h): one component set, two bases.

## 8. Alternatives + recommendation

- **Alt A: 2x4 cards, equation above the lane** (G1-244 shape). Lane 302 caps at 14 x 21 = 294 with 8 px of slack and the equation row `64+28+64` plus gaps needs 226 of 302, so d1 part words no longer fit under the pictures. Rejected for the base; ADOPTED for face (b), whose tiles need their own line.
- **Alt B: compound picture + two part lanes** (the child writes both parts). Pool halves (the compound must be a pictured key), it is face (c)/(e) in another apparatus, and it loses the "two make one" reading order. Rejected.
- **Recommendation: full-width equation rows (§2).** The row IS the pedagogy (`sun + flower = ___` read left to right), the lane takes a 14-letter German compound with 116 px to spare, and the same row carries d1 part words, the (b) tiles+box, the (h) scaled cue and the (g) lanes.

## 9. Risks, mitigations, print check

- **Draft false hits** (`hamster`, `vandring`): `tools/gen-b3-compound-draft.js` flags `FALSE?` where a part is < 4 letters or the link is `er`; the panel strikes; only literals ship.
- **Link thinness** (sv fi 0 in the draft): face (b) and d3 `minLinked:4` are DATA-conditional; refusals recorded, never faked by relabelling `link:''` rows.
- **de capital inside the join** (`Sonnenblume`, never `SonnenBlume`): gate case-folds after the first letter; d1 part words print `displayWord` per part.
- **Cut at a link**: `cut` = start of the second part by rule (§4); the instruction says "where the second word starts".
- **Baloo 2 advance in (c) cells**: G1-305's gate (advance <= cell - 2) reused; (c) refuses n > 14.
- **Ghost root on mono print**: opacity `.55`, grey-scale proof; no ring (it would read as a choice chip).
- **Lane capacity is an estimate** (21 px per glyph): measure a 14-letter hand-width sample in the browser before trusting the cap (OPEN 1).
- **Print check**: lane 64 = 16.9 mm, glyphH 28 = 7.4 mm; pictures 64 = 16.9 mm; `+`/`=` 26 px ≈ 6.9 mm; cells 32 = 8.5 mm; smallest text 18 (b tiles) + the 10 px footer; teal ≈ 60 % grey, dashed coral ≈ 45 %, cream rows ≈ 5 %; nothing within 14 px of the page edge; `qa/lints.js` overflow/palette/9 px on de + fi renders before any copy claims a level.

## 10. Summary

1. Base = 8 full-width equation rows `picture + picture = lane` (675x84, lane 410x64 glyphH 28), no text but `+` and `=`; theme-free, pictures from the cross-theme index; pool cap 14 letters (draft en 20 · de 25 · nl 25 · sv 23 · da 30 · no 25 · fi 23 pairs).
2. Stamps `data-lcs-a/-b/-link/-word/-cut`; the bank literal is the truth, verify never joins or inflects; match halves deranged + cross-pair gated; the split face stamps only the cut.
3. Five faces: link box (2x4 cards, fixed 36 px box), split (cells + cut rail), match halves (lane + two picture columns), detective (bank + two-part lanes), word star (`familyTree`, ghost root); ids `G2-320+`.
4. Romance base = the same `familyTree` with root word + affix chips; Romance faces re-target by data (suffix box, root cut, root match, intruder, big-or-small rows); pt may switch to aumentativo/diminutivo.
5. NEW: `compoundRow`, `opGlyph`, `linkBox`, `splitWord` (cut rail on `syllableWord`), `familyTree`; everything else reused from `components-b2.js`, `card-grid.js`, `trace-path.js`.
