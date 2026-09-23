# G2-359 `word-parts` - design A: "Word Bricks" (the stem is a shape)

Designer A, 2026-09-23. Inputs read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (word-parts row + lock row 10), `_work/G2-359-pedagogy.md` (faces, refusals, Boundary; this file designs those six moves and changes two layouts, flagged). Renders LOOKED at: `out/b3-sweep/en/G2-316, G2-320, G2-328, G2-330, G2-331, G2-332, G2-333`. Code read: `templates/components-b3/compound-words.js`, `components-b3/spelling-rules.js` (exports), `components-b2.js` (`wordBank`, `pillChoice`, `rulingBlock`), `components-b4/cloze.js` (`gapBank`, `gapBox`), `components-b4/odd-and-even.js` (`houseBin`), `templates/layouts/card-grid.js`, `page/page.css` (`.ws-card` 119-160, `.ws-lane` 401, `.ws-blankbox` 445), `primitives/trace-path.js writingRow` (681).
Measurement: widths below marked (m) were measured by me in Chromium with the shell's Baloo 2 / Nunito woff2 loaded from `file://` (page `out/b3-sweep/en/G2-320-null-d2-en.html`, scratch `%TEMP%/.../scratchpad/G2-359-A-measure.js`); (e) = estimate, engineer re-measures. Pictures OPENED by me (contact sheet `scratchpad/G2-359-A-pics.png`): see §5.

## Boundary

This page is NOT compound-words (G2-316, G2-329..333: two PICTURES joined by `+` and `=` glyphs, letter boxes cut with a pencil line, a picture hub with a teal bracket web; in es/fr/it/pt also picture + given suffix, split one word at the root, diminutives), NOT G2-320 (a given NEGATING prefix in round pill chips + a `↔` arrow + a school line), NOT spelling-rules G2-328 (dashed rule box + letter-spaced word + open ending box), NOT verb-forms G2-317/334..338 (inflection tables), NOT odd-and-even's `houseBin` (a house with a numeral sign: the pedagogy's "family houses" would read as that family's apparatus, so this design drops houses), NOT cloze G1-350 (a bank of round `.ws-bankword` pills over sentence gaps; F5 reuses only its `gapBox`). **Visual signature: every word part is a BRICK whose silhouette says its role.** The stem is a tinted brick with a dovetail TAB on each side (something can attach here); a prefix is a pale brick with a dovetail NOTCH on its right edge, a suffix the same notch on its left; a whole word is a plain rectangular brick with no joints; an empty place to write is the same silhouette drawn in dashed coral. A family is a WALL: member bricks stacked on a foundation STONE (the stem). No `+`, no `=`, no pictures-as-operands, no pills, no houses, no arcs. Role is carried by SHAPE (tab / notch / flat), so the page reads identically on a black-and-white printer.

## 1 Page concept (base)

**"Build the family walls."** Across the room a teacher sees two tall walls standing side by side, each on a heavy teal foundation stone that carries a picture and one word (sun, help / fahren / laulaa), five empty dashed courses stacked above each stone, and a strip of ten loose word bricks across the top. The child reads each loose brick, finds the stone it grows from, and writes the word into a course on that wall. The metaphor is the curriculum's own: German primary teaching calls word parts *Wortbausteine* (word building blocks) and has children frame the *Wortstamm* in a box; the brick IS that box, made tangible. Top quality because: one focal apparatus (two walls), ten answers and nothing else on the page, generous 60 px writing courses with school lines (pencil-first), and one silhouette grammar that the next five faces re-use so a child who has done one page can read all six without being taught the chrome.

## 2 Layout (d2, 722 body)

Chrome budget: body 722 (3-line title + 3-line instruction); 814 at one-line chrome; 677 only with a 4-line fi title (the fi base title "Sanaperheet: lajittele sanat" is 1-2 lines, so 677 never applies to the base). `.ws-page` inner 675. Two wall panels are custom cream panels (`.ws-lane` look: cream, `2px solid #F0E4CB`, r 14, padding 12), NOT `.ws-lane` rows.

```
x 0                                                                            675
y 0   +---------------- wordPartBank 675 x 112 (2 rows; 3 rows = 160) ---------+  cream panel, 2px #F0E4CB, r 14
      | [helper] [sunny] [helpful] [sunshine] [helpless] [sunflower] ...       |  pad 10 14 -> inner 643
      | [sunburn] [sunlight] ... (never un-: G2-320; never helped: inflection) |  bricks h 40, gap 10 x 8
      +-------------------------------------------------------------------------+  Nunito 800 20
y 126 +----------- wall A 330 x 452 ---------+ 15 +----------- wall B 330 x 452 ---------+
      | +- course 302 x 60 (dashed coral) -+ |    | +- course ----------------------+ |  pad 12, inner 302
      | |  writingRow 282 x 52 glyphH 28   | |    | |                                | |  5 courses x 60
      | +----------------------------------+ |    | +--------------------------------+ |  gap 8 between
      |  ... courses 2..5 ...                |    |  ... courses 2..5 ...              |  5x60 + 4x8 = 332
      |  (gap 14)                            |    |                                    |
      | <[pic 56]  sun  ................ ]>  |    | <[pic 56]  help ..............]>   |  foundation stone
      |  stem brick 302 x 76, tabs 8 each    |    |                                    |  (stem role) 76
      +--------------------------------------+    +------------------------------------+
      wall = 12 + 332 + 14 + 76 + 12 + 4 (border) = 450 -> 452 with rounding (e)
y 578 end.  Stack 112 + 14 + 452 = 578 <= 722 (144 slack, body flex column justify-content:center)
      3-row bank (long de/nl/fi pages): 160 + 14 + 452 = 626 <= 722 (96 slack); <= 677 too.
```
- **Width:** 330 + 15 + 330 = 675. Course 302 = wall inner; the writingRow sits inside the course at left 10, top 4, `w 282 h 52 glyphH 28 xHeight:true` (G2 floor glyphH >= 24; 28 gives a 7-8 year old room; the dashed border is the answer idiom, the ruling is the pencil guide).
- **Handwriting fit (e):** a G2 hand at glyphH 28 writes ~14 px per glyph; 282 / 14 = 20 glyphs. Longest plausible member `Kinderspielplatz` (16) = 224 fits; `schoonmaakster` (14) 196 fits. Composer cap `maxGlyphs 18` for the base, measured nowhere else.
- **Bank bricks (m, Nunito 800 20):** `helper` 54.4 · `helpful` 60.0 · `unhelpful` 82.3 · `sunshine` 74.5 · `Spielplatz` 84.5 · `Mitspieler` 87.8 · `spielerisch` 90.0 · `schoonmaakster` 138.9 · `valokuvaaja` 104.5 · `Maanviljelijä` 114.4 · `Kinderspielplatz` 142.2. Brick width = text + 2 x 12 pad (word role has no tabs). Build guard (the `gapBank` idiom, cloze.js:256): `brickEstimate(w, px) = 24 + 0.52 * px * glyphs` (0.52 x 20 = 10.4 px/glyph, above every measured value: 9.5-9.9); sum of 10 estimates + 9 x 10 gaps must be <= 3 x 643 = 1929 or the page REFUSES (never a 4th row). en 10 words (avg 7 glyphs) = 10 x 97 + 90 = 1060 -> 2 rows; de/nl avg 11 = 10 x 138 + 90 = 1470 -> 3 rows, budgeted above.
- **Foundation stone:** stem brick 302 x 76 (tabs inside the 302: body 286). Picture 56 (`.ws-icon`, `data-lcs-pic`) at body-left + 10, root word Baloo 2 700 30 centred in the remaining body width (186 px after the picture: `Bäckerei`-length roots fit; widest likely root `Wortfamilie`-class is not a root; roots are <= 9 glyphs by validator, Baloo 700 30 est. 0.55 x 30 x 9 = 149 <= 186). Without a picture (`roofPic:false` or no pinned picture) the word centres in 286.
- **Bank order:** a derangement by family (no 3 consecutive bricks of one family; not grouped; not alternating ABAB for more than 4).
- **Slack:** body `display:flex; flex-direction:column; justify-content:center; gap:14px`; courses are FIXED 60 (a stretched dashed box around a 52 px ruling looks broken), so slack becomes margin above/below, never inside the apparatus.

## 3 Ladder

Base (`mode:'base'`, CODE):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `walls` | 2 | **2** | 3 |
| `perWall` (answers) | 3 (6) | **5 (10)** | 4 (12) |
| `roofPic` | true | **true** (where a pinned opened picture exists; per-wall, else word only) | false |
| `memberKinds` | derived | **derived, prefixed, compound** | same |
| `bankPx` / `bankRowsMax` | 20 / 2 | **20 / 3** | 18 / 3 |
| `courseH` / `glyphH` | 64 / 30 | **60 / 28** | 56 / 26 |
| `maxGlyphs` | 12 | **18** | 12 (3 walls: course 197 wide, 197/14 = 14 glyphs, cap 12 for margin) |
| `wallW` | 330 | **330** | 215 (3 x 215 + 2 x 15 = 675) |

d3 stack: bank 160 + 14 + (12 + 4 x 56 + 3 x 8 + 14 + 76 + 12 + 4 = 366) = 540. d1/d3 are not published and no copy describes them.

## 4 Answer-hiding + uniqueness

- The ten members are printed ONCE (in the bank, whole, unsplit, stem NOT highlighted: finding the shared stem IS the task). The walls are empty. The foundation carries the ROOT, never a member (validator: `root.word` not in `members`).
- Unique by construction: every bank brick's family = the unique wall whose `stem` occurs (NFC, case-folded) in the brick AND whose signed `members` list contains it (pedagogy verify); the two stems are not substrings of each other (validator 5), so no brick can fit both walls by letters.
- What the child marks: writes each bank word into a course (and may tick the bank brick; not required, not verified).
- Visibly wrong to the teacher: a `sunny` written on the `help` wall sits one course above a stone printing `help` in 30 px; a wall with 4 or 6 filled courses is off by count at a glance (exactly `perWall` courses per wall, so a misplaced word leaves one wall with an empty course and the other overfull).
- Stamps: root `<div data-ws-content data-lcs-wordparts data-lcs-mode="base" data-lcs-walls="2" data-lcs-per="5">`; wall `data-lcs-wall="<famId>" data-lcs-stem="<stem>" data-lcs-root="<root.word>"`; course `data-lcs-course="i"`; bank brick `data-lcs-brick="word" data-lcs-word="<literal>" data-lcs-family-of="<famId>"`. verify(): every bank brick's `family-of` re-derived as above (FAIL on 0 or 2 walls); each wall receives exactly `perWall`; courses per wall == `perWall`; no bank word appears in any foundation; no 3 consecutive bank bricks share a family; rendered bank rows <= 3 (distinct brick `top`s).

## 5 Primitives / components

**Reused (exact).**
- `primitives/trace-path.js writingRow({w,h,glyphH,xHeight:true})` (681) inside every writing socket.
- `templates/layouts/card-grid.js cardGrid({cards,cols,rows,numbered})` for F1/F2/F4 (`.ws-card` padding 12, border 2, gap 14, badge 30 x 30 top-left, `page.css` 119-160, m).
- `templates/components-b4.js`: `gapBox({w,h:36})` (F5 sentence gap, the `.ws-blankbox` idiom; width rule reused from cloze: `clamp(round(1.6 * 10 * maxGlyphs + 24), 150, 300)`, one width per page), `derange` (bank orders), `pillEstimate` NOT used (its 32 px pill padding is the pill's, see `brickEstimate`).
- `templates/components-b2.js countBadge(n)` (F3 / F5 row numbers).
- `lib/b3-picture-index.js hasPicture` at validate time; pinned `{theme,noun}` pictures via `lib/b2-common.js fileUri`; `lib/b3-instructions.js fillSlots` for any slotted string.
- `data/b4/pronouns.js people[]` (`pic`, `depicted`, `minPx`, `picOpened`) for F4 portraits.
- `primitives/font-metrics.json` (nunito-800 cap 0.7188, baloo2-700 present): text baseline inside a brick = `h/2 + 0.3594 * px` (half the MEASURED cap height), never a derived factor.

**NOT used (and why).** `compoundRow` / `opGlyph` / `compoundWebBlock` / `compoundCutRow` (the `+`/`=`, bracket web and letter-cut are compound-words' signature; re-using them would make this family look like a compound-words face in 11 locales). `pillChoice` / `.ws-pill` / `.ws-achip` / `wordBank` `.ws-bankword` (round pills are G2-320's prefix chips and cloze's bank; a pill has no joint, so it cannot say "prefix" vs "stem"). `houseBin` (odd-and-even's house). `ruleBins` / `ruleBox` (spelling-rules' bins and dashed coral rule box). `answerBox` (stamps `data-lcs-answer="undefined"` when open). `letterBoxes` (G2-330's letter-cut apparatus). `pictureFor` (random dir: `winter/ice`, supermarket `salt` with baked text).

**NEW primitive `primitives/word-brick.js`** (pure SVG, tokens only; the one drawing this family owns):
```
wordBrick({ role, w, h = 44, text = '', fontFamily = 'body'|'display', fontPx = 20,
            attrs = '' }) -> svg string
roles:  'stem'          tabs both sides, fill T.tealSoft, stroke T.teal 3
        'word'          no joints,       fill T.cream,    stroke T.teal 2
        'prefix'        notch RIGHT,     fill T.cream,    stroke T.teal 2
        'suffix'        notch LEFT,      fill T.cream,    stroke T.teal 2
        'socket-stem'   = stem silhouette,   fill T.white, stroke T.coral 2.5, dasharray "7 5"
        'socket-word'   = word silhouette,   same dashed coral
        'socket-prefix' = prefix silhouette, same dashed coral
geometry (px = viewBox units, viewBox "0 0 w h", width=w height=h):
  TAB = 8 (depth), TAB_BASE = 12 (width at the body edge), TAB_TIP = 18 (width at the tip): a DOVETAIL,
  vertically centred (cy = h/2). R = 6 corner radius.
  stem body x0 = TAB, x1 = w - TAB; path (clockwise):
   M x0+R,0 H x1-R Q x1,0 x1,R V cy-6 L w,cy-9 V cy+9 L x1,cy+6 V h-R Q x1,h x1-R,h
   H x0+R Q x0,h x0,h-R V cy+6 L 0,cy+9 V cy-9 L x0,cy-6 V R Q x0,0 x0+R,0 Z
  prefix body 0..w, notch cut INTO the right edge:
   ... V cy-6 L w-TAB,cy-9 V cy+9 L w,cy+6 ...   (the stem tab's exact negative)
  suffix = prefix mirrored (scale(-1,1) translate(-w,0) on the path only; text unmirrored).
  word: rounded rect 0,0,w,h r R.
  stroke drawn inside: path inset by stroke/2 (x,y offsets 1.5 / 1 / 1.25) so w x h is the true outer box.
text: <text> centred on the BODY centre ((x0+x1)/2), y = h/2 + 0.3594*fontPx, Nunito 800 (body) or
      Baloo 2 700 (display), fill T.ink; stamps data-lcs-brick-text.
stamps on <svg>: data-lcs-brick="<role>" data-lcs-bw="<w>" data-lcs-bh="<h>"
minimums (throw): h >= 36 (G2-3) / 44 when opts.band==='G1'; body width (x1-x0 or w) >= 48; fontPx >= 17;
  estimate check: 0.52*fontPx*glyphs + 2*12 <= body width, else throw (never squash, never textLength).
```
- **Joint:** `brickJoin(pieces)` = `<span style="display:inline-flex;align-items:center">` with every piece after a notch getting `margin-left:-8px` (TAB), so the stem tab lands exactly in the prefix notch (the two dovetails are the same four points). Stroke of the stem draws last (z-order) so the joint shows one teal line.
- **Writing sockets:** `brickSocket({shape:'stem'|'word'|'prefix', w, h, glyphH})` = `<div style="position:relative;width:${w}px;height:${h}px" data-lcs-socket="<shape>">` + `wordBrick({role:'socket-'+shape, w, h})` absolute inset 0 + `writingRow({w: bodyW - 16, h: h - 8, glyphH, xHeight:true})` absolute at left = bodyLeft + 8, top 4. Empty: the socket prints no text and no answer stamp in visible markup.
- **verify-by-render** `qa/verify-word-brick.js` (the nt10-D pattern: every new primitive measures its RENDER): renders every role at h 36/44/76 and w 60/150/302; asserts the svg bbox == w x h (+-1); each tab protrudes exactly 8 beyond the body; a joined prefix+stem pair has ZERO pixel gap and ZERO overlap outside the dovetail (rasterise, count coral/teal pixels in the joint column); `[data-lcs-brick-text]` bbox lies inside the body minus 4 px each side for the longest literal of every bank in all 11 locales; throws fire for h 35, body 47, fontPx 16, an over-long text. Poison: `TAB_TIP = TAB_BASE` (a straight tab no longer dovetails) must FAIL the joint check.

**NEW `templates/components-b5/word-parts.js`** (type-scoped `wordPart…` names; the barrel refuses duplicates):
- `wordPartBank({words, px=20, gap=10, maxRows})` -> cream panel (pad 10 14, r 14, `2px solid #F0E4CB`), flex-wrap row of `wordBrick({role:'word', h:40, fontPx:px})`, each wrapped `<span data-lcs-bank-brick data-lcs-word>`; runs `brickEstimate` and THROWS above `maxRows * 643`.
- `wordPartStone({word, pic, w, h=76, picPx=56, fontPx=30})` -> `position:relative` div: `wordBrick({role:'stem', w, h, text:''})` + `<img class="ws-icon" data-lcs-pic>` at left TAB+10 vertically centred + `<span>` Baloo 2 700 `fontPx` centred in the rest (`data-lcs-stone-word`). `pic` null -> word centred. `word` null + `pic` -> picture centred (F1).
- `wordPartWall({famId, stem, root, pic, courses, courseH=60, glyphH=28, w=330})` -> panel with `courses` x `brickSocket({shape:'word', w: w-28, h: courseH, glyphH})` (gap 8) over `wordPartStone`.
- `wordPartPicWall({key, pic, bricks:[{word, role:'member'|'foil'}], order})` (F1 card inner).
- `wordPartRootWall({famId, members, worked:false, circled:null})` (F2 card inner; `worked` prints the root in the stone in `T.inkSoft` Nunito 800 and a 2.5 px coral ring around the stem letters of each member: the ONLY printed ring on the page).
- `wordPartPrefixKey({prefixes:[{prefix, meaning}]})`, `wordPartPrefixRow({n, gloss, base, glossId})`, `wordPartPersonCard({person, base})`, `wordPartFamilyBlock({famId, root, bank, sentences, gapW})`: geometry in §7.

**Pictures OPENED (by me, contact sheet):** `weather/sun` (smiling sun, rays) · `weather/raindrop` (blue drop) · `weather/snowflake` (pale snowflake) · `weather/cloud` (a PINK cloud with a face: legible as cloud, colour is odd, fine in greyscale) · `spring/flower` (one red flower) · `spring/garden` (a flower BED, not a gate/yard: reads "garden" only with the word, so F1 must NOT use it as a picture-only root) · `body parts/tooth` · `body parts/hand` (open palm) · `music/drum` (snare) · `vehicles/boat` (small ship) · `At the Supermarket/bread` (loaf) · `classroom/book` (red closed book) · `ocean life/fish` · `occupations/baker` (m, chef hat, loaf) · `occupations/singer` (m, mic + guitar) · `occupations/teacher` (f, holding a folder) · `occupations/gardener` (m, spade, flowers) · `occupations/ballerina` (f, tutu). Ruling for F1: picture-only roots = sun, raindrop (root rain), snowflake (root snow), flower, tooth, hand, drum, boat, bread, book, fish, cloud; `garden` only with its word printed (base stone).

## 6 Locale slot structure

- **Text on the apparatus is data, never chrome:** bank bricks, stone words, member bricks, key prefixes + meanings (F3), glosses (F3), base words (F4), sentences (F5). No printed labels ("prefix", "root", "family") anywhere on the body in any locale: the silhouettes carry the roles, so there is nothing for a panel to mistranslate on the apparatus and no fixed-token case trap (fi, de).
- **Fonts:** Nunito 800 for every word a child reads in a brick (20 px bank/members, 18 px glosses and sentences; font floor 17 on G2-3 text); Baloo 2 700 for the stone root (30 base, 22 F5) and the F3 key prefixes (24). Handwriting is on writingRows only.
- **Long-locale reserve (+40 % de/fi/pt):** every brick width is COMPUTED from its literal (never a fixed width), so a long word widens its own brick; containers are sized for the measured worst case: bank 3 rows; F1/F2 card body 167 px text width (= 187 card inner - 2 x 10 brick pad; `Kinderspielplatz` 142.2 at 20 (m) fits, `schoonmaakster` 138.9 fits); F3 gloss column >= 330 px, 2 lines max; F5 frames 2 lines max. Page-level font step: if any member on an F1/F2 page fails `brickEstimate` at 20 px, the WHOLE page steps to 18 (never mixed sizes on one page); if it still fails, that family is not drawn and the composer takes the next signed family (REFUSE only below the configured count).
- **de capitals:** nouns keep the capital inside bricks (`Bäcker`); the stone may show the verb root lower-case (`fahren`) or the bound stem (`fahr`, F2 answers). Circling a shared part across `Fahrer` / `fahren` is case-insensitive by the pedagogy verify; the worked example shows it.
- **nl IJ / fi ä ö / sv å:** Nunito latin-ext covers all (m: `Maanviljelijä`, `återanvända`, `ystävällisyys` rendered with widths above). No Œ in any bank (untested glyph; validator bans U+0152/0153).
- **Instruction slot (one sentence, names only apparatus on the page):** base en "Every word belongs on one wall. Write it on the wall that stands on its root word." (84). The apparatus nouns the panels need per locale: WALL, BRICK (empty brick = the dashed place to write), STONE (the bottom brick), PIECE (F3). Panels pick natives (de Mauer / Baustein / Grundstein; fr mur / brique; sv mur / kloss; fi muuri / tiili / kivi) and may call all dashed places "brick" to reduce nouns.

## 7 Five variation faces (b c d e f)

**F1 picture-family (G1, CODE): "Which brick belongs on this wall?"** Delta: the stone carries ONLY the picture (no word; `wordPartStone({word:null})`, picture 72 in a stem brick 187 x 88) and three member-or-look-alike WORD bricks (h 44, Nunito 800 20) are stacked above it; the child circles the one brick that belongs. `cardGrid({cols:3, rows:2})`: card inner 187 wide; content 18 (badge clearance) + 3 x 44 + 2 x 6 + 10 + 88 = 260; card 260 + 24 + 4 = 288; 2 x 288 + 14 = **590 <= 722** (677 ok). G1 floors: bricks 44, picture 72, text 20. Answer position: member index spread over the 6 cards <= 2 per slot (top / middle / bottom). Verify hook: `data-lcs-root="<vocabKey>"` on the stone, `data-lcs-word` + hidden `data-lcs-role` per brick; exactly one member; root word not in visible text; foils share >= 2 initial letters with the root and are in no family (pedagogy rule 6). Query face: "word families with pictures, 1st grade" (fr "familles de mots en images CP").

**F2 root-word (G2, CODE): "Three words build the wall. Write the stone."** Delta: the inverse of the base; members given as bricks, the STONE is an empty dashed `socket-stem` (tabs both sides, 167 x 48, writingRow glyphH 24). The child circles the shared part in all three bricks, then writes the root in the stone. `cardGrid({cols:3, rows:3})` = 9 cards, **card 1 is a worked example** (`data-lcs-worked`: stone filled in `T.inkSoft`, a coral ring drawn round the stem letters of each member; its family's stem shares no 3-letter string with any open card) + 8 open. Card content 18 + 3 x 36 + 2 x 4 + 10 + 48 = 192; card 220; 3 x 220 + 2 x 14 = **688 <= 722** (the fi title "Etsi kantasana" is 1 line, so 677 never applies; rule: F2's fi title stays <= 3 lines). Member bricks h 36, Nunito 800 20 (m: `Fahrradfahrer` 126.3 + 24 = 150 <= 187). This REPLACES the pedagogy's full-width 8-row lane layout (a row of three words + socket needed 3 x ~150 + 150 > 639 in de/nl, measured `schoonmaakster` 138.9). Verify hook: pedagogy F2 (root occurs case-folded in every member, root not printed on open cards, no inflected member, de bound stems, no umlaut families); plus the worked card excluded from counts. Query face: "find the root word 2nd grade" / de "Wortstamm" / fi "kantasana".

**F3 prefix-key (G2, CODE): "Snap the right piece on."** Delta: a KEY strip of 3 prefix bricks (role `prefix`, notch right, Baloo 2 700 24, h 44) each with its meaning below (Nunito 700 17, `T.ink`); 8 numbered rows, each = gloss text + an empty `socket-prefix` (w = `clamp(glyphs x 14 + 24, 84, 110)`, h 44) JOINED to the base word as a `stem` brick (Nunito 800 20). The child writes the prefix in the empty piece; the assembled pieces read as the new word. Key panel 96 (pad 10 + 44 + 4 + 24 + pad 10 + border 4); row `.ws-lane` padding 6 14: badge 30 | 10 | gloss (flex 1, min 320, 2 lines at 17/1.3 = 44) | 12 | joint (socket <= 110 - 8 + stem <= 170) ; row h 44 + 12 + 4 = 60; stack 96 + 12 + 8 x 60 + 7 x 6 = **630 <= 722**. **Design change vs pedagogy (flagged for the critic):** the child writes the PREFIX into the socket, not the whole word on a line; to keep this honest the validator requires `prefix + base === word` (NFC) for every row on this face: rows whose spelling changes at the joint are refused for F3 (the bricks only snap where the letters simply join). d3 adds a whole-word writing line (two-line rows, rows 6). Verify: answer = row's `prefix` literal (fr `re-`/`ré-` rows each carry their own literal); each key prefix answers >= 2 rows; crossCheck single-fit; no G2-320 prefix; prefix not printed in any row. Refusals (pedagogy): fi REFUSED, sv at risk. Query face: "prefix re- pre- mis- 2nd grade" / de "Vorsilben Verben" / nl "voorvoegsels groep 4".

**F4 who-does-it (G3, CODE): "The person word."** Delta: no stone; each card = portrait (`.ws-icon`, 72, `data-lcs-person`) + the base word as a `word` brick (h 36, Nunito 800 20) + an empty `socket-word` below it (200 x 52, writingRow glyphH 26) for the whole person word. No suffix piece is drawn because the joint is not a clean join in several locales (de `backen` -> `Bäcker`, fi `leipoa` -> `leipuri`): a flat word socket is the honest shape. `cardGrid({cols:2, rows:4})`: card inner 302 = portrait 72 + 12 + column 218; content 18 + max(72, 36 + 8 + 52 = 96) = 114; card 142; 4 x 142 + 3 x 14 = **610 <= 722**. Portrait minPx per `data/b4/pronouns.js` (>= 44). Verify: pedagogy F4 (`agents[key][depicted]`, occupation label not printed, base is a signed substring-or-stem of the answer). Refusals: es, fr REFUSED (G2-316); da at risk. Query face: "suffix -er words 3rd grade" / fi "johtimet -ja -jä". **First to cut** (2 refusals, nearest to G2-316, a G3 page on a G2 type).

**F5 family-in-sentence (G3, CODE): "One wall, four sentences."** Delta: two blocks; each block's four member bricks sit side by side as one course on a narrow stem stone (`wordPartStone` 22 px Baloo root word, h 32, spanning the course width), then four sentences (Nunito 800 18/1.3, one uniform `gapBox` per page, `countBadge` 1-8). The shared stone makes the point visible: the stem is the same, the brick you pick depends on the sentence. Block: pad 10 + course 40 + stone 32 + 12 + 4 x 48 (2-line sentence) + 3 x 6 + 10 + 4 = 318; 2 x 318 + 14 = **650 <= 722** (677 ok). Bank order in the course is a derangement of the sentence order (`derange`). Verify: pedagogy F5 (distinct slots per block, each brick used once, `sentence.form` verbatim). Query face: "root words in sentences 3rd grade" / de "Wortfamilie im Satz".

**Why these five.** Each keeps the one silhouette grammar and changes ONE thing about the wall: which part is given and which is empty (base: stone given, courses empty; F2: courses given, stone empty; F1: stone as picture, choose a course; F3: the joint itself, an empty prefix piece; F4: a whole word, no joint; F5: the course given, the sentence chooses). A child who has done the base can read every face; a teacher sees six different tasks. **First to cut:** F4 (above).

**Hub contract (restated).** `apps['word-parts']` with `default_subject:'letters'` must exist in `topics-taxonomy.json`; `axes['exercise-type']['word-parts']` needs `slug` + `name` in all 11 locales (pedagogy §A names); exactly one landing per face per locale with `coordinate.type === 'word-parts'`, `coordinate.mode` = the face mode string (`base`, `picture-family`, `root-word`, `prefix-key`, `who-does-it`, `family-in-sentence`), level key from the band table, `theme:''`, unique slug, `canonicalDeckSlug` = the published deck; committed + deployed. Gate `scripts/verify-hub-type-rows.js` expects 6 rows per locale minus refusals: fi F3, es F4, fr F4 (63; at-risk sv F3, da F4 -> 61).

## 8 Two alternatives + recommendation

- **A. Word tree** (root in soil, trunk = stem, members on leaves/branches). Rejected: curved branches and leaf shapes give text an irregular, rotated or wrapped box, and de/fi/nl words (`schoonmaakster`, `valokuvaaja`) do not fit a leaf at a G2-legible size; a hub with radiating members is exactly compound-words' Word Web (G2-333) silhouette; and a tree gives no place for a PREFIX (something attached BEFORE the stem), so F3 would need a second apparatus. It is prettier from across the room; it is weaker at the one thing the type teaches (parts that attach on a side).
- **B. Morpheme marking layer** (plain words; the child draws a box round the stem and arcs under affixes, the de/nl Morphemmethode). Rejected as the page concept: it is a marking convention, not an apparatus (the page would be a list of words, visually identical to G2-320 rows), and marks are unverifiable from stamps. Kept as the F2 worked-example ring and as a d-level extra.
- **Chosen: Word Bricks**, because the role of a part (stem / prefix / suffix / whole word / empty) is carried by SHAPE, so it survives greyscale printing and needs zero printed labels in 11 languages; a rectangle grows with its word, so long words are a width computation, not a wrap failure; and one primitive (six roles, one dovetail) serves all six faces, which is both cheaper to build and makes the family unmistakable next to compound-words' `+`/`=` and G2-320's pills.

## 9 Risks, mitigations, print check

- **Overflow in long locales:** every brick width computed from `brickEstimate` (0.52 px-per-px, above all 11 measured literals); the primitive THROWS rather than squash; page-level 20 -> 18 step then family skip; bank capped at 3 rows (throw). F2/F1 card text width 167 checked against the longest signed member per locale at validate time (a family whose member cannot fit is excluded in the bank validator, not at render).
- **Greyscale:** tealSoft vs cream fills are close in grey (both very light); role is NOT carried by fill but by silhouette (tabs vs notch vs flat) and stroke weight (3 vs 2); empty places are DASHED (coral prints mid-grey, the dash pattern survives). The F2 worked ring is 2.5 px coral: on B&W it prints grey, still a ring. No meaning is carried by coral vs teal alone.
- **Pencil space:** base courses glyphH 28, F2 stone glyphH 24, F4 socket glyphH 26, F3 prefix socket h 44 (a 2-5 letter prefix at ~14 px/glyph = 70 max, socket body >= 76). Circling inside a 36 px brick at 20 px text: cap height 14.4 (m ratio 0.7188), room for a pencil ring above/below within the brick; the ring may cross the brick stroke, which is fine.
- **Joint rendering:** the dovetail is sub-pixel sensitive at print scale; the primitive verify rasterises the joint (zero gap / zero spill) and poison-tests a straight tab. Tabs are 8 px deep: at print (186 mm / 703 px) = 2.1 mm, visible.
- **9 px floor:** smallest text 17 (F3 meanings); no brick text under 17 (throw).
- **Badge collision:** `.ws-card-badge` 30 x 30 top-left; card content starts 18 px down (content top = 12 pad + 18 = 30 from the card edge) so the first brick never sits under the badge. Engineer must confirm in render (UNKNOWN until measured).
- **Cut lines:** none (no cutting on any face).
- **What QA lints catch:** overflow, footer intrusion, 9 px floor, off-palette hex (all fills are tokens; `#F0E4CB` panel border is the existing `.ws-card` border already in `page.css`, reused via class where possible). **What the type gate must assert:** brick text inside body; bank rows <= 3; counts; answer not in visible text; uniform gap width (F5); worked card excluded (F2). **Only a human eye:** whether a picture-only stone is namable by a 6-year-old (the `garden` and pink `cloud` rulings), whether the walls read as walls (not ladders), and whether the empty stone in F2 is understood as "write here" without a label (the worked card is the mitigation).

## 10 Summary

1. One NEW primitive `primitives/word-brick.js`: a brick whose silhouette carries the role (stem = tabs, prefix/suffix = notch, whole word = flat, empty = dashed coral), dovetail TAB 8 / 12 / 18, text baseline from measured cap height.
2. Base "Build the family walls": 10 loose word bricks over two walls of 5 dashed writing courses standing on picture+root stones; 578 px (626 with a 3-row de/nl bank) of 722.
3. Faces invert the wall: F1 picture stone + circle the member brick (G1, 590); F2 members given, write the empty stone, 9-card grid with a worked card (688); F3 write the prefix into a notched piece snapped onto the base word, `prefix+base===word` enforced (630); F4 portrait + whole-word socket (610); F5 one course on one stone, four sentences (650).
4. Two layout changes vs pedagogy, both flagged: no houses (odd-and-even's apparatus), F2 as a card grid (measured row overflow in de/nl), F3 socket takes the prefix, whole word only at d3.
5. Distinct from compound-words by construction: no `+`/`=`, no picture operands, no bracket web, no pills; greyscale-safe because shape, not colour, carries every role.
