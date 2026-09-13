# G1-308 `read-and-do` : DESIGN (studio A+B, 2026-09-13)

Read: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` section 9, `G1-307-opposites.md`, `K-317-letter-of-the-week.md`, `_work/G1-308-pedagogy.md` (parallel; its faces, cue rules, `objForms` bank and verify rules are ADOPTED here; where the two files differ on LAYOUT this file rules, and the divergence is named in section 8). Looked at: `out/b2-sweep/G1-242-animals bw-d2-en.png`, `G2-274-vehicles-d2-en.png`, `K-284-animals-d2-en.png`, `out/batchD/K-066-animals-d2-en.png`. Code read: `page/page.css`, `templates/components.js`, `components-b2.js`, `layouts/card-grid.js`, `types/g1/G1-242-read-and-color.js`, `types/_shared/position-words.js`, `lib/sentence-bank.js`, `lib/b2-common.js`, `primitives/_tokens.js`, `qa/lints.js` (font floor 9 px, overflow). (m) = measured by node today; *est.* = the engineer measures.

## 1 Page concept (base)

ONE picture strip, SIX instructions. A cream panel across the top of the body holds a single ordered row of eight colour theme pictures, each on its own white tile, a coral start flag + arrow above the row (the direction cue, the K-320 lesson) and a quiet mark band below it. Under the panel, a numbered list of six full imperatives (Nunito 800 18 px), each with a small dashed "done" box at its right end. The child reads a line, finds the picture(s) on the strip and DOES it with a pencil: circles the tile, crosses it out, underlines or ticks in the band, joins two band dots with a line, or writes a count in the line's answer box; then ticks the done box.

Why one shared strip: (1) the genre in every locale (Leseaufträge, lecture de consignes, läs och gör) is "one material, several instructions"; (2) the page is one calm object, visibly unlike G1-242's six cards and G2-274's writing lanes; (3) pictures stay at 64 px and every line gets a two-line reserve, which a per-row strip cannot afford (section 8). The collision the pedagogy file feared ("two instructions on one picture") is removed by construction: mark targets are DISJOINT across the six lines (composer + verify) and each verb lands on its own zone (tile / band / list).

## 2 Layout + px grid (d2)

`.ws-page` padding 0 14 -> inner width 675; body ≈ 760 (`page.css:16-26, 92-97`).

```
+------------------------- strip panel 675 x 140 ---------------------------+
| |>--------------------------------------------------------------------->  |  arrow rule 14
| [ pic ][ pic ][ pic ][ pic ][ pic ][ pic ][ pic ][ pic ]   8 tiles 76x76   |  tiles 76
|    .      .      .      .      .      .      .      .      mark band 22    |
+---------------------------------------------------------------------------+
                                  gap 14
 (1)  Circle the cat.                                              [ ]       row 94
 (2)  Cross out the second dog.                                    [ ]
 (3)  Underline the picture between the cow and the pig.           [ ]
 (4)  Draw a line from the cat to the pig.                         [ ]
 (5)  Put a tick under the last picture.                           [ ]
 (6)  Write how many birds there are.   [ 56x44 ]                  [ ]
                          6 rows x 94, gap 8 = 604
```

- **Strip panel** (`pictureStrip`, NEW): a `.ws-lane` (`page.css:401`, cream, border 2 #F0E4CB, radius 14) with inline `padding:10px 12px` -> inner 647 x 116 = `startArrow` 14 + gap 4 + tiles 76 + band 22. 8 tiles 76 + 7 gaps 5 = 643 <= 647. Tile = white rounded square 76x76 (radius 10, border 2 creamDeep), `.ws-icon` 64x64 centred, NO rotation (a tilted row weakens "the fourth"), NO caption, NO number. Band: one `inkSoft` dot r 4 under each tile's centre (the line anchor; ~50 % grey on mono; a coral dot would invite joining everything). Arrow rule: coral flag 10x14 on a 2 px pole at x 2, coral 2 px line to x 640, 8 px head, `aria-hidden`. Root `<div data-ws-content data-lcs-strip="cat,dog,dog,bird,cow,dog,pig,bird" data-lcs-theme data-lcs-n="8">`; tiles `data-lcs-idx="0..7" data-lcs-noun`.
- **Instruction list** (`instructionList`, NEW): 760 - 140 - 14 = 606 -> 6 rows, gap 8 -> row 94. Row = white 675x94, radius 12, border 2 creamDeep; columns `[badge 30][10][text 1fr][10][answer 56 when write][10][done 28][pad 8]`. Badge = 30 px teal circle, Baloo 2 700 16 white (drawn round so the list does not read as cards). Text Nunito 800 18 px, line-height 1.35 (24.3), ink, `data-lcs-text`; text column = **581 px** (525 with the write box). Done box = 28x28 dashed coral radius 6 (`.ws-blankbox` idiom), carries nothing, verify ignores it; `doneBox:true`. Write rows append `answerBox({w:56,h:44,answer:n})` (`components.js:105`) after the text; 44 >= 26 (G1 answer floor).
- **Long de/fi line (≈ 60 chars) at 581 px:** Nunito 800 18 px averages *est.* 9.6-9.9 px/char (engineer measures `scrollWidth` on de + fi renders) -> 60 chars ≈ 580-595: borderline. So the row reserves TWO lines (2 x 24.3 + padding 22 = 71 <= 94): one line is the normal case, a wrap is the reserve, a third line is impossible. `validate-b3-draft` caps rendered sentences at 96 chars; `qa/verify-b3-read-and-do.js` asserts the text node's `clientHeight <= 50` and `scrollWidth <= clientWidth` on every locale x theme. Code never shortens: over the cap = the panel rewrites.
- **Where the pencil goes on colour art:** `circle` = a ring round the WHITE TILE on the cream panel (graphite on cream, the child never rings the art); `cross` = an X corner to corner across the tile, its ends on the white corners (transparent PNGs rarely fill the corners; the teacher reads the ends); `underline` and `mark` (tick / X per locale) = in the BAND under the tile; `line` = dot to dot along the band, UNDER intermediate pictures, never across art; `write` = the list's answer box. No printed ring or stamp box per tile: it would make "underline" a tracing task and put eight empty boxes on a calm page; the tile IS the ring target and the band IS the stamp zone.
- **d1 / d3:** d1 = 6 tiles 100 (pic 84, gap 8: 640 <= 647), panel 164, rows 90, font 19. d3 = 8 tiles as d2, 7 rows 79 (`(606-48)/7`), font 17 (reserve 2 x 23 + 22 = 68 <= 79), cues add between / right-of / left-of, six verbs.

## 3 Ladder (config keys; guards on the config, never the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| pics / tile / pic / gap | 6 / 100 / 84 / 8 | 8 / 76 / 64 / 5 | 8 / 76 / 64 / 5 |
| rows / rowH / fontPx | 6 / 90 / 19 | 6 / 94 / 18 | 7 / 79 / 17 |
| verbs (min distinct) | circle cross mark (3) | circle cross underline line mark write (>= 4 on the page) | all six (>= 5) |
| cues | unique all | unique all ordinal first last | + between rightof leftof |
| ordinal k | - | 2..4 | 2..6 |
| nouns on strip | 4-5 | 5-6 | 5-7 |
| doneBox | true | true | true |

Pictures 64 >= G1 floor 44 (`_tokens.js:69`); 6-7 items within G1 [6,12]. Height d1 164 + 14 + 580 = 758; d2 140 + 14 + 604 = 758; d3 140 + 14 + 601 = 755 (all <= 760; the 2-5 px slack is real, engineer confirms on fi/de).

## 4 Answer-hiding + uniqueness

- **The strip order is the truth and is stamped once:** `data-lcs-strip` (vocab keys in row order) on the panel root; tiles carry `data-lcs-idx`. No tile carries a numeral, caption or alt text (an index on a tile solves every ordinal; a word solves the noun). No opacity, rotation, size difference or overlay on any tile (`w.size === 1`, the G1-242 leak rules).
- **Each row stamps** `data-lcs-row data-lcs-action="circle|cross|underline|line|mark|write" data-lcs-cue="unique|all|ordinal:k|first|last|between|rightof|leftof" data-lcs-noun data-lcs-noun2 data-lcs-targets="i[,j]" data-lcs-text` and, for `write`, `answerBox[data-lcs-answer]`. Verify re-derives targets from strip + cue + noun and must equal `targets`: `unique` = the noun occurs exactly once; `all` = >= 2 occurrences + >= 1 other noun; `ordinal:k` = >= k occurrences, target = k-th from the flag (k >= 2; k = 1 is `first`); `first`/`last` = idx 0 / n-1; `between` = both nouns unique and `|i1 - i2| === 2`, target the middle; `rightof`/`leftof` = noun unique, not at the edge; `line` = both unique, targets both; `write` = count 1-4, >= 1 other noun.
- **Disjointness (the collision rule):** the union of `targets` over all rows is a set with no repeats (`write` contributes none); a `between`/`line` endpoint may be another row's target (a circled cat is still the cat) but two rows never MARK one tile. Composer: sample 5-6 nouns with multiplicities summing to 8, enumerate every legal (verb, cue, noun) sentence over that strip, pick 6 with disjoint targets, >= 4 distinct verbs, no two rows sharing (action, cue), a noun the target noun of <= 2 rows; 200 tries then throw (refusal, never padding). 20-seed sweep: every verb appears, `write` answers not constant, first/last both occur.
- `data-lcs-text` is an entry of the bank's `rendered[]` (node-side gate) and contains no `{`, no double space, starts `/^\p{Lu}/u`, ends `.`; the done box has no data attribute; `img.complete && naturalWidth > 0`; no localized B&W marker in any path.

## 5 Primitives / components

**Reused (exact):** `.ws-lane` (`page.css:401`) as the strip panel with inline padding; `.ws-icon`; `.ws-blankbox` idiom for the done box; `answerBox({w,h,answer})` (`components.js:105`); `cardGrid({cards, cols:2, rows:3})` (F5); `.ws-pill` (`page.css:422`) inside `truthChips`; `svgRoot roundedRect circle line el esc` (`primitives/_svg.js`); `fillFrame` (`sentence-bank.js:20`, substitution only); `entriesFor`, `countable`, `fileUri`, `B2_EXCLUDE` (`lib/b2-common.js`); tokens `T.teal T.coral T.coralSoft T.ink T.inkSoft T.grid T.white T.creamDeep`, `F.display F.body`. NOT used: `sceneStage` (random placement destroys order), `iconRows` (rotation jitter), `countBadge`/`numberStrip` (a numeral beside a picture leaks the index), `colorLegend` (no colours here), `pillChoice` (no per-item truth stamp), `sentences.js` frames (declarative/colour only).

**NEW in `templates/components-b3.js`** (HTML + inline SVG on the token palette):
- `pictureStrip({theme, items:[{noun,vocabKey}], tile=76, pic=64, gap=5, arrow=true, band=true})` -> the panel above; `startArrow({w})` is its internal SVG (flag + rule + head, coral, `aria-hidden`). Band dots `inkSoft` r 4 at `x = tileCentre, y = 11` in a `<svg width=647 height=22>`.
- `instructionList({rows:[{n, text, action, cue, noun, noun2, targets, answer?}], rowH=94, fontPx=18, doneBox=true})` -> the six rows; a `write` row renders `answerBox` after the text.
- `truthChips({yes, no, px=20})` -> two `.ws-pill` 64x44 (Baloo 2 700 20, padding 6 18) `data-lcs-truth-chip="yes|no"`, fixed order yes | no, no glyph, the child circles one (F4).
- `drawBox({w=300, h=150})` -> white box, dashed coral 2.5, radius 12, `data-lcs-drawbox`, empty (F5).

## 6 Locale slot structure

Sentences are WHOLE literals assembled by substitution from three panel-authored layers (the G1-307 rule: the code never inflects or capitalises): (1) `verbs[]` = six imperative frames with ONE object slot (`line` two, `write` a plural / partitive slot): en `Circle {obj}.` de `Kreise {obj} ein.` fi `Ympyröi {obj}.`; (2) `objForms[noun]` = per-noun whole object literals, expanded at apply time from the panel's per-gender article + ordinal literals and the vocab sg/pl, then READ by the panel (`reviewed:true`, else validator FAIL): `{unique, all, pl, ord:{2..6}, dat (de), part + gen (fi), def (sv/no/da), a2 (pt/fr/it contracted ao/au/al for line)}`; (3) `fixed` = position phrases riding the noun "picture", which never agree with a theme noun: `first`, `last`, `ordPic:{2..8}` ("das vierte Bild"), `between:'the picture between {A} and {B}'`, `rightof`, `leftof`; `A`/`B` take `objForms[noun].dat` in de, `.gen` in fi ("kissan ja koiran välissä"), `.unique` elsewhere.

The frame never agrees with an UNKNOWN noun because a noun enters a cue ONLY if `objForms[noun][cue]` exists and is reviewed; a missing form drops the noun from that cue: fr/it vowel-initial nouns from definite sg cues, de weak nouns from dative cues unless in `DE_DATIVE_SG` (41 keys, `lcs-grammar.js:1777`), sv/no every noun from `all` / `line` / `mark` / `between` until the panel's `def` table exists (F1 only there). Ordinals: de accusative per gender (`den zweiten Hund / die zweite Katze / das zweite Schaf`); es/pt/it/fr per gender (`el segundo perro / la segunda vaca`; fr `deuxième` invariant, `premier/première` only in `fixed.first`); fi invariant + nominative object (`Ympyröi toinen kissa.`); nl/da invariant; sv/no need the definite noun (`den andra hunden`). A theme fans only where >= 8 countable nouns carry `unique + all + pl` (min over 11 locales (m): animals 33, fruits 20, vehicles 20, toys 17, zoo 29, farm 20); fi `write` needs the partitive (161 keys: animals 37/37, fruits 28/28, vehicles 28/28, toys 25/25), so the fan set is animals · fruits · vehicles · toys · zoo animals · farm animals. No colour verb anywhere (G1-242 owns it).

## 7 Five variation layout deltas

Chosen: (a) circle-only, (b) ordinal / position, (c) two-step, (d) true/false, plus **read-and-draw** (the A/B head in 10 locales, section 9 of the panel; the pedagogy file's F5). Refused as faces: (e) count-and-write is a VERB inside the base (row 6) and as a page is the counting-pictures family (14 types); (f) negation over a mixed strip crosses out 4-5 of 8 pictures (a strip of Xs, one verb) and is the science category-sort move (20 banks). Each face is a distinct resolved d2 config for `gate-variation-distinct.js`.

| face | id (band G1) | delta from the base page | knob |
|---|---|---|---|
| F1 Read and Circle | `G1-3xx TBD` | same geometry; verb `circle` only; cues 4 unique + 2 all (2 tiles each) = 8 marks over 8 tiles, or 5 + 1; `verbsMin` off | PARAM `{...base.difficulty[2], verbs:['circle'], cues:['unique','all']}` |
| F2 Two-Step | `G1-3xx TBD` | **5 rows** of 114 (`(606-32)/5`), each two clauses joined by the locale's "and", two DIFFERENT verbs, targets disjoint within and across rows (<= 8 marks; `write` steps mark none); two-line reserve stays (2 x 24 + 22 = 70 <= 114); done box | CODE `steps:2`, `data-lcs-step` x2 per row |
| F3 First, Second, Between | `G1-3xx TBD` | same geometry; every cue positional (`ordinal:2..6`, `first`, `last`, `between`, `rightof`), verbs mixed; the arrow rule gains a small coral "1" beside the flag? NO: the flag alone (a printed 1 turns ordinals into counting boxes) | PARAM `cues:['ordinal','first','last','between','rightof'], ordMax:6` |
| F4 True or False | `G1-3xx TBD` | strip unchanged; rows = `[badge 30][statement 18 px, 2-line reserve, 437 px][truthChips 138][pad]`, no done box, no marks on the strip; 3 true / 3 false; a false statement is false by `count` or `position` and names a noun ON the strip; chips stamp `data-lcs-truth` on the row only | CODE `mode:'truth'` |
| F5 Read and Draw | `G1-3xx TBD` | **no strip**: `cardGrid` 2x3 (card 330x244, inner 302x216): sentence 18 px 2-line reserve 49 + gap 8 + `drawBox` 300x150 = 207 <= 216; "Draw {n} {pl} in the box."; no picture printed (a picture removes the reading); open-ended, layout lints + `data-lcs-n data-lcs-noun` for the answer key only | CODE `mode:'draw'` |

F2 two-clause lines: a 96-char de sentence wraps to two lines inside 581 px (*est.* 9.8 x 96 = 941); the 96-char cap and the height gate apply to F2 as well.

## 8 Two alternatives + recommendation

- **Alt A: per-row mini-strips (the pedagogy file's sketch, 6 lanes x 4 pictures).** Measured: 6 `.ws-lane` rows of 118 (gap 8 = 748) give inner 90 after padding 12 + border 2; sentence 24 + gap 6 leaves 60 for a tile -> pictures 44-48 px (the G1 floor, not a generous page); no two-line reserve (a 60-char fi line at 18 px is a coin toss at 639 px); `between` fixes 3 of 4 tiles; ordinals cap at 4th; the silhouette is G1-242's "sentence over a picture cluster" six times. Rejected on the numbers; its cue / verb / bank rules are kept.
- **Alt B: 4x2 picture grid with lettered boxes ("cross out the picture in box C").** Pictures reach 120 px, but reading order over two rows is ambiguous for ordinals, box letters turn every position cue into letter-reading, and the lettered boxes print the answer space on the page. Rejected.
- **Recommendation: the single ordered strip + list** (section 2): one material, one direction cue, six verbs on three zones, pictures 64 px, a two-line reserve on every line, a silhouette no other family has.

## 9 Risks, mitigations, print check

- **Two rows marking one tile:** disjoint-targets rule in composer + verify (poison P1: two rows sharing a target index -> FAIL).
- **A pencil X invisible on saturated art:** the X spans the WHITE tile corner to corner; the ring goes round the tile on cream; underline / tick / line live in the band. Engineer prints one d2 page on a mono laser and a colour inkjet, marks all six verbs in HB pencil and confirms each is readable at arm's length (UNKNOWN until printed; if the X fails, `cross` moves to the band as a horizontal strike: layout switch `crossZone:'tile'|'band'`, no data change).
- **Ordinal over repeated nouns ("the second dog" with dogs at 1, 5, 7):** at d2 the composer keeps every `ordinal:k` noun's occurrences within the first 6 tiles; the sweep asserts it.
- **Long lines:** two-line reserve + 96-char cap + measured gate (section 2).
- **sv/no definiteness, fr/it elision, de dative:** data gates (section 6); a locale without forms ships F1 only, recorded.
- **Direction cue read as decoration:** flag + arrow are the page's one coral accent, above the row; each locale's base instruction names it ("count from the flag").
- **Palette:** cream, creamDeep, white, teal, coral, ink, inkSoft, grid; no new hex. **Font floor:** smallest text 16 px (badges; d3 sentences 17); the 9 px lint holds.
- **Print check:** page box 703x945 by construction; body d1 758 / d2 758 / d3 755 <= 760 (2-5 px slack: the engineer confirms the panel's border + padding math on a de and a fi render before any copy claims a level); mono print: art -> mid greys, white tiles on ~4 % cream, band dots ~50 % grey, coral arrow ~55 % grey, dashed done boxes readable; no meaning rides on colour; `print-color-adjust:exact` is already on `html,body`.

## 10 Summary

1. One ordered strip of 8 theme pictures on 76 px white tiles (pic 64) with a coral start flag + arrow above and a dotted mark band below, over a numbered list of six imperatives (Nunito 800 18, two-line reserve, done box); d2 = 140 + 14 + 604 px.
2. Six verbs land on three zones: circle / cross on the tile, underline / tick / line in the band, write in the list; targets are disjoint by construction, so six instructions never collide on one picture.
3. The strip order is the only truth (`data-lcs-strip`), no tile carries a number or word; verify re-derives every target from strip + cue + noun and the `write` count from the strip.
4. All grammar is stored literals: per-verb frames, per-noun `objForms` (unique / all / pl / ord / dat / part / gen / def), and noun-free `fixed` position phrases; a noun without a reviewed form drops from that cue, a locale without forms ships F1 only.
5. Faces: F1 circle-only (PARAM), F2 two-step 5 rows (CODE), F3 position cues (PARAM), F4 true/false chips (CODE), F5 read-and-draw 2x3 draw boxes with no strip (CODE); count-and-write and negation refused as faces with reasons; NEW components `pictureStrip`, `instructionList`, `truthChips`, `drawBox`.
