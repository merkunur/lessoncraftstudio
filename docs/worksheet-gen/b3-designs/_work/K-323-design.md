# K-323 `all-about-me` : design (Designer A + B, 2026-09-14)

Contract = `_work/K-323-pedagogy.md`. Read: `page/page.css` (`.ws-lane:401` padding 12 16, `.ws-card:126` padding 12 + border 2, `.ws-blankbox:445`), `components-b2.js` (`rulingBlock:58 wordBank:210 copyArrow:219 pillChoice:226 letterBoxes:273 SWATCH`), `components.js answerBox:105`, `ten-frame.js:13` (W = 5·cell + 6, H = 2·cell + 6), `trace-path.js writingRow:681`, `card-grid.js:7`, `_tokens.js`, G2-318 / K-319 / G1-308 FINALs. (m) = measured: widths by puppeteer with the shell's woff2 from a `file://` origin (scratch `k323-measure.js`, 14 faces loaded); anchors by sharp over `body parts/face@3x.webp` (`k323-face-anchors*.js`). *est.* = engineer measures. OPENED: `body parts/face`, `activities/running biking jumping reading swimming painting`, the G2-278 + K-287 renders. No em-dashes.

## 1 Page concept (base)

**A framed poster the child takes home.** Top: a full-width **name banner** (tealSoft; G2-318's `nameBanner` in eyebrow mode) whose lane is the biggest writing target on the page (glyphH 40). Left: a **portrait frame** 300 px, white, 3 px teal r 16, four **album photo-corners** (tealSoft triangles with a 2 px teal edge; the only motif, tokens only), a dashed coral drawing zone inside, "This is me" 14 inkSoft at the bottom. Right: the **age lane** (whole literal + one 64 px numeral box) over the **family box** (draw). Bottom: **three picture windows**, one per favourite (heading band + draw zone). Every field is a labelled slot; no picture, numeral or answer printed. The favourites row absorbs slack (`minmax`). Not the G2-318 fact TABLE: six label + lane rows are a G2 register (17 px labels, 28 px lanes); K needs few big windows, drawing before writing, one lane that holds a whole name.

## 2 Layout, d2, body 722 (page inner 675)

```
y 0    nameBanner 675x84  tealSoft r14, padding 10 16 -> inner 643x64
       [ My name is  Nunito 800 20 ][12][ writingRow 440x64 glyphH 40 ]        label <= 191 (m: fi 156.6)
y 96   +-- portraitFrame 300x300 --+ 15 +-- ageLane .ws-lane 360x84 (padding 8 16 -> inner 328x64) ---+
       | white, teal 3, r16        |    | [ I am ][10][ answerBox 64x64 ][10][ years old ]  Nunito 800 20|
       | photo-corners 22 (x4)     |    +-- 12 -------------------------------------------------------+
       | dashed coral zone 268x252 |    +-- familyBox drawBox 360x204 ----------------------------------+
       | (inset 16)                |    | My family   14 inkSoft, top-left                               |
       |   This is me  (14, bottom)|    +----------------------------------------------------------------+
y 408  favouriteWindow 217x220 x3, gap 12                        (row minmax(220px,1fr): 314 at 722)
       [ My favourite animal ][ My favourite food ][ My favourite colour ]   heading band 46 (2 lines of 18)
       [   draw zone 189x150 ][ ...              ][ ...                 ]   dashed coral, r12
```
Stack 84 + 12 + 300 + 12 + 220 = **628 <= 722**. Root `<div data-ws-content data-lcs-type="all-about-me">`, grid rows `84px 300px minmax(220px,1fr)`, gap 12.

- **nameBanner** (`name:null` mode) + ADDITIVE options `laneW:440, glyphH:40, h:84` (G2-318's `357x56 glyphH 28` default untouched). Eyebrow = `labels.nameIs` (m, 20 px: fi `Minun nimeni on` 156.6, fr 117.4, pt 114.9; cap 191). `data-lcs-name`, lane empty.
- **ageLane**: `labels.age.pre` + `answerBox({w:64,h:64})` (`data-lcs-age`) + `labels.age.post`; `glue:true` (fi) drops the second gap so `-vuotias` touches the box. m at 20 px: de 62.5 + 80.7, pt `Eu tenho` 84.0, fi `-vuotias` 77.3; widest row 84 + 64 + 81 + 20 = 249 <= 328.
- **portraitFrame** 300 (79 mm): inner dashed zone 268x252 (`data-lcs-drawbox="portrait"`); `labels.thisIsMe` in the 32 px bottom strip (de `Das bin ich` 71.3 at 14, m). Photo-corners = 4 SVG right triangles, legs 22, `tealSoft` fill, `teal` 2 stroke (the stroke survives mono, §9).
- **familyBox** = G1-308 `drawBox({w:360,h:204,label})` (white, dashed coral 2.5, r 12, `data-lcs-drawbox="family"`).
- **favouriteWindow** 217x220: white, 2 px teal r 12; heading band tealSoft 46, Nunito 800 18 centred, <= 2 lines (m: pt `Minha comida favorita` 189.2 wraps at the 189 inner; it 185.1, de `Meine Lieblingsfarbe` 178.6, fi `Lempieläimeni` 124.1 one line); draw zone 189x150 (`data-lcs-drawbox="fav-animal|fav-food|fav-color"`). Draw only: no tile, no bank (that is F1).

**d1**: `favourites:0`; banner h 96 glyphH 48, portrait 330 | age lane 330x96 + family 330x222. **d3**: `favourites:4` windows 160x220 (toy; heading 17) + `sentenceLane:'school'` (`.ws-lane` 675x84: `labels.school` + writingRow 400x64); 724 -> portrait 288 (712). The "my friend" column is NOT added: it is F5's compare move.

## 3 Ladder (guards key on `fields` / `favourites` / `sentenceLane` / per-face keys, never the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| base fields | name age portrait family | + 3 favourites | + toy, + school lane |
| glyphH / banner h / portrait | 48 / 96 / 330 | 40 / 84 / 300 | 40 / 84 / 288 |
| F1 rows x tiles / tile / glyphH | 2 x 4 / 120 / 40 | 3 x 6 / 100 / 40 | 4 x 6 / 96 / 32 |
| F2 cards / cell | 2 / 56 | 4 / 56 | 4 / 56 + `pillChoice` more brothers or sisters |
| F3 parts / lane w / glyphH | 3 (eye nose mouth) / 300 / 40 | 5 / 200 / 40 | 7 (+eyebrow chin) / 200 / 34 |
| F4 cards / tick columns | 6 / 1 | 8 / 1 | 8 / 2 (can, want to learn) |
| F5 names | mine / 10 boxes | mine + friend | + "how many more" box |

## 4 Answer hiding + uniqueness

- **Base (open):** no output verify. Structural: one empty `[data-lcs-name]`, one empty `[data-lcs-age]`, `[data-lcs-drawbox]` x5 empty, headings === bank literals, no digit, no `<img>`, no `{`. `data-lcs-face` NOT stamped (byte-identical base).
- **F1** `data-lcs-face="favourites"`; row `data-lcs-category` + `data-lcs-options="<6 keys, page order>"`; tiles `data-lcs-opt`; copy lane an empty `writing-row`, no starter. Verify: 6 distinct tiles per row, no key twice on the page, label === `displayWord(vocab[key][loc][0])` (colour: `COLOR_WORDS[loc]`), `scrollWidth <= 96`, `img.complete && naturalWidth > 0`, no B&W marker in `src`, nothing pre-ringed. No "correct" tile: uniqueness = the seeded option SET.
- **F2** `data-lcs-face="family"`; four `[data-lcs-tenframe]` at `data-lcs-a="0"`, 0 counters; four empty `[data-lcs-count]`; headings === `countHeads` (end with `:`); no numeral in the body.
- **F3** `data-lcs-face="face"`; bank `data-lcs-bank-word` shuffled; lanes `data-lcs-label="hair|nose|eye|ear|mouth"`; bank set <=> lane set; the answer is the lane id, never text. **Anchors as fractions of the icon box** (the picture is a 512 square, so icon box = image box; m, centroids): **hair {0.50, 0.20, L}** (hair spans y 0.035-0.50; the anchor sits high so the line clears the eyebrows) · **nose {0.50, 0.68, L}** (0.498/0.681) · **eye {0.655, 0.59, R}** (right pupil 0.655/0.589) · **ear {0.86, 0.64, R}** (0.861/0.640) · **mouth {0.50, 0.84, R}** (0.499/0.836). d3 adds **eyebrow {0.32, 0.47, L}** (0.321/0.471), **chin {0.50, 0.93, R}** (0.495/0.930); d1 = eye nose mouth. Verify: pointer ends inside the icon bbox; no label text within 20 px of an end; lanes empty; `img` complete; a sweep asserts no pointer line crosses another anchor's 16 px disc (poison: swap eye and nose sides -> FAIL).
- **F4** `data-lcs-face="ican"`; 8 distinct `data-lcs-action`, ticks empty, literal === `can[id]` and !== the vocab word, `img` complete.
- **F5** `data-lcs-face="name"`; two `[data-lcs-letterboxes="10"]`, three empty boxes, pills fixed order (me | friend), no model word, no numeral; counts come from the child's name -> structure only.
- Hub: `apps['all-about-me']` + `axes['exercise-type']` x11; one landing per face per locale, `coordinate.type:'all-about-me'`, `mode` = face string (base `'base'`), `theme:''`; gate `scripts/verify-hub-type-rows.js` (6 rows per locale minus explicit refusals).

## 5 Reused vs NEW

**Reused (exact):** `writingRow({w,h,glyphH,xHeight:true})` · `rulingBlock({rows:1,w:643,h:64,glyphH:40})` (F4 lane) · `wordBank({words,wordPx:17})` (F3, no icons) · `copyArrow()` (F1) · `pillChoice({items,fontPx:20})` (F5; F2 d3) · `letterBoxes({n:10,box:56,gap:6})` -> 618x58 (F5) · `SWATCH` (F1 colour tiles, the `colorLegend` idiom) · `answerBox({w,h})` · `tenFrame({a:0,cell:56})` -> 286x118 (F2) · `cardGrid` (F2 2x2, F4 2x4) · `.ws-lane .ws-card .ws-blankbox .ws-icon .ws-bankword .ws-pill` · G2-318 `nameBanner` (+3 options) · G1-308 `drawBox({w,h,label})` · `fileUri displayWord COLOR_WORDS`, tokens. **NOT used:** `heroFrame` (no corners, no label strip), `factTable` (G2 register), K-319 `faceTile`/`checkInCard` (feelings), `strokeWordLane` (no model).

**NEW in `templates/components-b3.js`** (HTML + inline SVG on tokens, scoped inline CSS, no `page.css` edit):
- `profileCard({banner, portrait, age, family, favourites, sentenceLane})` : the §2 grid + root stamps.
- `portraitFrame({size=300, label, corners=true})` : white, 3 px teal r 16; four corner `<path>` triangles (legs 22, tealSoft fill, teal 2 stroke); inner `drawBox` inset 16; label 14 inkSoft bottom strip; `data-lcs-drawbox="portrait"`.
- `favouriteWindow({w=217, h=220, heading, key})` : white, 2 px teal r 12; heading band tealSoft 46 (18 px, 2-line clamp); `drawBox(w−28, h−70)`; `data-lcs-drawbox="fav-<key>"`.
- `optionTiles({options:[{key,src|color,label}], tile=100, pic=64, gap=8})` : white tiles r 10, border 2 creamDeep; `.ws-icon` 64 or a 64 px `SWATCH` rounded rect (r 12, ink 1); label Nunito 800 16; `data-lcs-opt`.
- `favouriteRow({category, heading, options, glyphH=40})` : `.ws-lane` (inline padding 8 16) = heading 24 + 6 + tiles 110 + 8 + `[copyArrow 40][8][writingRow 595x64]` = 212 inner -> lane **232**.
- `familyFrames({cards:[{key,heading}], cell=56})` : card row 1 `[heading, 2-line reserve 46, w 236][10][answerBox 56x56 data-lcs-count]`, row 2 `tenFrame` centred; `data-lcs-tenframe`.
- `faceLabels({src, icon=260, anchors, laneW=200, laneH=64, glyphH=40})` : block 674x360; icon at (207, 50); left lanes y 20 and 196 (hair, nose), right lanes y 0, 148, 296 (eye, ear, mouth); an absolute SVG 674x360 draws per anchor a coral dot r 5 at `(207 + x·260, 50 + y·260)`, a 2.5 px teal line to the lane's near-edge midpoint (x 200 / 474), a teal dot r 3.5 there; `aria-hidden`; lanes = `writingRow(200,64,40)` in a `.ws-blankbox`, `data-lcs-label`.
- `canRow({id, src, literal, tick=56, pic=80, textW=146})` : card inner 302 = `[.ws-blankbox 56][10][.ws-icon 80][10][literal 18 px, <= 2 lines]`; `data-lcs-action`.
- `nameBoxes({n=10, box=56, gap=6, label=null})` : `.ws-lane` = optional label 18 + 4 + `letterBoxes` 58; `data-lcs-letterboxes`.

## 6 Locale slot structure (pedagogy §C; code substitutes, never inflects)

`ABOUT_ME[loc].labels`: `nameIs` · `age:{pre, post, glue}` (fi `glue:true`, `post:'-vuotias'`) · `thisIsMe` · `family` · `favHeading:{animal, food, color, toy}` (Romance favorito/a per head noun, pt `Minha cor favorita`; de `Lieblings-` with the head's article, `Meine Lieblingsfarbe`; fi `-ni`, `Lempivärini`; sv/da mitt/min; no postposed `Favorittfargen min`) · `countHeads:{people, brothers, sisters, pets}` (heading form ending `:`; fi partitive plural `Sisaruksia:`) · `drawFace` · `wantLearn` · `myName friendName oneLetterPerBox lettersCount firstLetter whoHasMore:{me, friend}` · `school` (d3). `faceWords` = vocab singular via `displayWord` (asserted). `can[id]` = a whole first-person literal per action, picture inline (`Ich kann schwimmen`, `Je sais nager`, `Osaan uida`), <= 34 chars AND no single word > 146 px at 18 (m: `polkupyörällä` 118.5 ok). **`favStarter` is DROPPED from the render**: the heading above the tiles is the only category text and the lane starts with `copyArrow` (closes the pedagogy's OPEN 3 by design).

Measured longest per slot (m, px): `nameIs` 20 px fi 156.6 (cap 191) · `favHeading` 18 px pt 189.2 (2 lines; band holds 2) · `countHeads` 18 px de `Personen in meiner Familie:` 234.9, pt 220.4 (cap 236 one line, else 2) · F5 heading de `Buchstaben in meinem Namen:` 262.8 (cap 230 -> 2 lines) · pills 20 px de `meine Freundin` 139.7, fi `ystäväni` 76.7 · `can` 18 px fi `Osaan ajaa polkupyörällä` 217.4 (2 lines) · bank 17 px pt `sobrancelha` 97.8, it `sopracciglio` 96.5 (d3 only; the five d2 words <= 67). **UNKNOWN until authored:** es/it/nl/sv/da/no `countHeads`, all `can` sets, `wantLearn`, `school`; the render gate measures every literal against its cap.

## 7 Variation layout deltas (d2, body 722)

- **F1 favourites:** 3 x `favouriteRow` 232 + 2 x 12 = 720 (rows `minmax(232px,1fr)`); tiles 6 x 100 + 5 x 8 = 640 <= 643; pic 64 >= 56; labels 16 px <= 96 (m: fi `keltainen` 70.2, it `arancione` 73.5, sv `jordgubbe` 77.6; de `Schmetterling` 107.0 and fi `vaaleanpunainen` 128.4 fall to the 12-char / width gate -> fi colour pool 7). No portrait, no banner.
- **F2 family:** `drawBox` 675x220 (`data-lcs-drawbox="family"`) + 12 + `cardGrid 2x2` rows `minmax(214px,1fr)` -> cards 330x238; inner 302x210: heading row 56 + 8 + ten-frame 118 = 182. **Cell 56 = the K floor**: the pedagogy's cell 40 breaks `minElement 56`, and its 150 px cards cannot hold a 56-cell frame, hence draw box 300 -> 220.
- **F3 face:** `wordBank` 54 + 12 + `faceLabels` 360 + 12 + `drawBox` 675x260 (`labels.drawFace`) = 698. Icon 260; lanes 200x64 glyphH 40 (it `orecchio` *est.* 192 handwritten).
- **F4 I can:** `cardGrid 2x4` cards 330x140 (602) + 12 + `.ws-lane` 675x100 (`labels.wantLearn` 18 + `rulingBlock` 64) = 714. Icon 80, tick 56 (an answer box at the K floor), text 146.
- **F5 name:** lanes (inline padding 8 16): name 112 · boxes 78 (the `oneLetterPerBox` literal prints ONCE, in the name lane) · two cards 330x110 (`lettersCount` / `firstLetter`: 2-line heading + `answerBox 60x56`) · friend name 112 · friend boxes 78 · compare 90 (`whoHasMore` + `pillChoice`) = 580 + 5 x 12 = **640 <= 722**.

## 8 Alternatives + recommendation

- **Alt A: the G2-318 card verbatim** (hero + six-row `factTable` + lane). Zero new components; rejected: 17 px labels and 28 px lanes sit under the K whole-word floor (40); six writes before one drawing is not a K page.
- **Alt B: portrait-centred mind map** (portrait 300 centre, six satellite windows on pointer lines). Most playful; rejected: satellites shrink to ~180 px, the name lane loses the ~300 px a name needs at glyphH 40 (K-321's measure), and pointer lines are F3's device.
- **Recommended: the framed poster of §2.** Full-size banner lane, one big portrait, drawing-first windows, every K floor met, 3 new HTML parts + 1 SVG overlay, all reused by the faces.

## 9 Risks, mitigations, print check

- **Heading wraps** (pt 189.2 vs 189): the band reserves 2 lines; the gate asserts <= 2 measured lines; a 3-line heading fails the build, never shrinks below 17.
- **F1 lane budget:** the pedagogy's 226 lanes overflow ~14 px under `.ws-lane`'s 12 px padding (m); fixed at 232 with inline padding 8 16 + `minmax` rows.
- **F2 K floor:** cell 56 forced the 220 draw box; the only legal way back to 300 is 2 cards, which is d1's move -> keep 220.
- **F3 pointer ambiguity:** anchors are measured centroids; the side assignment (hair + nose left, eye + ear + mouth right) keeps every line off every other feature (the nose line runs left at y 227, under the left pupil that ends at 214, m); the §4 crossing sweep guards it.
- **F4 3-line literals:** fit (69 <= 112) but are REFUSED by the validator (<= 2 lines) so the panel rewrites; never a smaller font.
- **F5 long names** (> 10 letters) continue on the lane; the literal says "first name"; not a refusal.
- **Palette lint:** cream, creamDeep, tealSoft, teal, coral, coralSoft, ink, inkSoft, white, grid + the 8 `SWATCH` colours (F1 tiles only); smallest text 14 px.
- **Print check (mono laser, pencil on cream):** the 300 px portrait = 79 mm; the teal 3 px frame prints ~30 % grey, the dashed coral zone ~55 %, the photo-corners keep their 2 px teal edge (tealSoft alone, ~92 % luminance, would vanish); `grid` 1.5 px school lines + the 1 px dotted mid survive at 600 dpi (K-287 render). Cream prints white on mono; HB pencil (~35 % reflectance) contrasts on both. Engineer prints one d2 base + one F3 on mono: draw a face in the zone, write `orecchio` on a 200 px lane, ring a 100 px tile in HB (the 6 px tile margin is the ring reserve, K-319 idiom).

## 10 Summary

1. Base = a framed poster: banner lane (glyphH 40), 300 px portrait with token photo-corners, age box, family draw box, three favourite windows; 628 <= 722, slack to the windows.
2. Five CODE faces reuse the parts: F1 tiles + copy lane (232 rows), F2 empty 56-cell ten-frames + numeral boxes, F3 one face with measured anchors, F4 eight pictured "I can" cards with 56 px ticks, F5 letter boxes + compare pills.
3. NEW `profileCard portraitFrame favouriteWindow optionTiles favouriteRow familyFrames faceLabels canRow nameBoxes`; reused exact `nameBanner drawBox writingRow rulingBlock wordBank copyArrow pillChoice letterBoxes tenFrame answerBox cardGrid`.
4. Two pedagogy budgets corrected by measurement (F1 lane 226 -> 232; F2 cell 40 -> 56, draw box 300 -> 220); `favStarter` dropped; F3 anchors measured, not estimated.
5. Open-ended faces verify structure only; F1/F3 carry a seeded option set and a bank <=> lane bijection; every literal is a whole panel string with a measured cap, refused when it overflows.
