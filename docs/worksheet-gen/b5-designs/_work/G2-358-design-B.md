# G2-358 `synonyms` - DESIGN B: "Sock Twins" (the washing line)

Designer B, 2026-09-23. Inputs read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 9 + cross-panel ruling "synonyms / word-parts"), the synonyms sections of the four `_work/_selection-*.md`, `_work/G2-358-pedagogy.md` (the six faces, the data bank, the validator: I design their LOOK and do not re-litigate the moves). Renders LOOKED at: `out/b3-sweep/en/G1-307, G1-336, G1-337, G2-320` (opposites), `out/b4-sweep/en/G1-350` (cloze), `G1-353` (question-words). Components read: `components-b4/cloze.js` (`gapBox` GAP_MIN 150 / GAP_MAX 300 / h ≥ 36, `pillEstimate`), `components-b3/ordinal-numbers.js blankNumeralBox`, `components-b3/spelling-rules.js ruleBins`, `components-b4/question-words.js qwBins`, `components-b2.js wordBank`, `page/page.css .ws-lane .ws-match-dot`.

**Measured** (puppeteer, `page/shell.js buildPage` so the shell's Baloo 2 / Nunito woff2 load from `file://`; script `%SCRATCH%/G2-358-measure.js`), text width in px:

| word | Nunito 800 18 | Nunito 800 16 | Baloo 2 700 20 | Baloo 2 700 22 |
|---|---|---|---|---|
| glad | 33 | 29 | 39 | 43 |
| happy | 48 | 43 | 56 | 61 |
| fröhlich (de) | 61 | 54 | 71 | 78 |
| schläfrig (de) | 67 | 60 | 80 | 88 |
| surullinen (fi) | 78 | 69 | 91 | 100 |
| enfurecido (es) | 82 | 73 | 99 | 109 |
| beobachtet (de) | 84 | 75 | 104 | 114 |
| erschrocken (de) | 94 | 83 | 112 | 123 |
| amedrontado (pt) | 103 | 91 | 122 | 134 |
| wunderschön (de) | 103 | 92 | 123 | 135 |
| hämmästynyt (fi, worst real 11-char) | 105 | 93 | 124 | 137 |
| schreeuwt (nl, F4) | 78 | 69 | 95 | 105 |
| s'exclame (fr, F4) | 74 | 66 | 87 | 96 |

Real words run 7.0-9.6 px/char at Nunito 800 18 (the pedagogy's 8.5 was low at the tail). Build-time estimate used below (build() cannot measure): **`estW(word, px) = 0.55 · px · len`** for Nunito 800 (9.9/char at 18, above every measured real word) and **`0.62 · px · len`** for Baloo 2 700 (12.4/char at 20, above 124/11 = 11.3). The gate measures the render; the estimate only has to be conservative.

**Pictures OPENED** (contact sheets `%SCRATCH%/G2-358-B-pics.png`, `G2-358-B-sock.png`, sharp 170 px tiles): `emotions/happy` grinning face · `emotions/sad` frown · `emotions/angry` knitted brows, bared teeth · `emotions/scared` wide eyes, open square mouth · `emotions/tired` closed eyes, yawn · `emotions/surprised` round eyes, small "O" mouth (confusable with scared at 72 px: never on one page, pedagogy rule kept) · `emotions/excited`, `merry`, `content` all smiling (never with happy) · `zoo animals/elephant` sitting calf · `insects and bugs/ant` red ant · `pets/mouse` standing mouse · `zoo animals/cheetah` standing cub · `around the house/laundry_basket` yellow slatted basket, red handles, pink cloth inside, `vocabKey: null` (decoration only, F5) · `accessories/sock` one green sock (NOT used on the page: the family's socks are palette SVG so they can carry a word; opened to confirm the silhouette a child recognises: ribbed cuff, heel, dark toe - my primitive copies exactly those three cues).

## Boundary

This page is NOT `opposites` (G1-307 family; G1-337 "Opposite or the Same?" is the one synonym contact: it rejects the same-meaning word to circle the antonym), NOT `cloze` G1-350 family (noun gap, `gapRow` cards with a picture), NOT `word-classes` G2-275 family (noun/verb/adjective bins), NOT `compound-words` G2-333 "Word Web", NOT `feelings` K-319 family (face ↔ one feeling word). The opposites family owns a very recognisable look (measured on the four renders): stacked cream `.ws-lane` cards, a teal `↔` glyph before every word, a target word in Baloo with pill chips BELOW it or a bank + ruled lines. **Visual signature of this family: a WASHING LINE.** Every row is a gently sagging rope with clothes-pegs, and every word hangs on it printed on a **sock**; the target word is the first sock (the dark one), and the child finds its **twin**. No card rows, no `↔`, no pill chips anywhere on a synonyms page, so a teacher can tell the two families apart from across the room, and "find the matching sock" is a real primary-classroom synonym routine (the "synonym socks" display) that a 7-8-year-old understands without a word of explanation: two socks of a pair are the same KIND but you still have to check. Every face lives in the same laundry world (line, sock pairs, sock sizes, a speech bubble on the line, laundry baskets), so the six landings read as one family.

## 1 Page concept (base)

Eight washing lines run across the page, one under the other, with generous air between them. On each line hang four socks. The **first sock** is the target: filled `tealSoft`, a solid `teal` cuff and toe, its word in teal Baloo 2. After a short gap hang **three plain white socks** (teal outline, `creamDeep` cuff and toe, word in ink Nunito). Exactly one of the three is the target's twin (same synonym group); the other two are strangers from other groups on the same page. The child **circles the twin**. One focal apparatus (the sock), repeated, nothing else on the page: no numbers, no arrows, no bank. Pencil-first: every white sock is a clean white field a circle shows up on; the rope is inkSoft so it never reads as a writing line. Top quality because: (a) the relation is embodied, not labelled (a pair of socks = same kind, not identical); (b) the whitespace is structural (rows are `minmax(70px, 1fr)`, the 722 stack leaves ~78 px of air spread between lines); (c) the three answer socks on a page share ONE width (the widest word on the page decides it), so sock size never cues the answer.

**Why three answer socks, not four (a measured departure from the pedagogy's d2 `chips:4`).** One line = target + answers must fit one row. Worst real words measured: target `hämmästynyt` Baloo 20 = 124 → sock 158; answer 11 chars Nunito 18 = 105 → sock 139. Four answers: 158 + 20 + 4 × 139 + 3 × 8 = 758 > 643. Even at 10 chars: 138 + 20 + 4 × 118 + 24 = 654 > 643. At the G2 floor 16 px: 154 + 20 + 4 × 127 + 24 = 706. **Four answers do not fit one line in de/fi/pt without dropping every long word from the pool**, which would bias the lexicon toward short words and refuse good pairs. Three answers fit at the worst measured word with 43 px to spare. Difficulty is carried instead by the draw rule (tier 2 groups, two strangers of the SAME part of speech as the target, never an antonym or a near-shade) and by 8 lines. d3 keeps four answers for pages whose drawn words are all ≤ 8 chars (see §3; d3 does not ship).

## 2 Layout (d2, 722 body)

Stage = one `div[data-ws-content][data-lcs-face="base"]`, **width 675** (the `.ws-page` inner; no `.ws-lane` frame, so no card stripe), sock placement region x = 16..659 (**643 px**). Ropes run x = 8..667.

```
 body 722 (three-line title + three-line instruction; 677 at the fi four-line title)
 ┌───────────────────────────────────────────────────────────────── 675 ─┐
 │ o~~~~~peg~~~~~~~~~~~~~~~peg~~~~~~~~~~~peg~~~~~~~~~~~peg~~~~~~~~~~~~o   │ rope y 10, sag 6 (y 16 mid)
 │   ┌▓▓─────────┐        ┌▒──────────┐    ┌▒──────────┐   ┌▒─────────┐   │
 │   │▓▓  happy  │        │▒  glad    │    │▒  tired   │   │▒  fast   │   │ sock body H 40
 │   └▓▓───────┐▓▓        └▒────────┐▒▒    └▒────────┐▒▒   └▒───────┐▒▒   │ toe drop 14  => row 70
 │             └▓▓┘                 └▒┘              └▒┘            └▒┘   │
 │                          (gap 12 px, rows grow to ~80 in the slack)    │
 │ o~~~~~ line 2 ...                                                      │
 │  ... 8 lines                                                           │
 └────────────────────────────────────────────────────────────────────────┘
  ▓ = teal cuff/toe (target)   ▒ = creamDeep cuff/toe (answer)
```

Height: 8 rows × 70 min + 7 gaps × 12 = **644 ≤ 722** (and ≤ 677 fi chrome, 33 px spare). Grid `grid-template-rows: repeat(8, minmax(70px, 1fr))`, `row-gap: 12px`, `align-content: space-evenly` → at 722 each row is ~79 px.

Width (per row, absolute x positions computed in `build()`, never flex, because each sock's y follows the rope):
- target sock `Wt = clamp(estW(target, Baloo 20) + 34, 110, 172)`; placed at x = 16.
- answer socks share one page-wide `Wa = clamp(max over every answer word on the page of estW(word, Nunito 18) + 34, 96, 143)`.
- `left = 16 + Wt + 20`; `free = 659 − left − 3·Wa`; `gap = free / 4` (≥ 8 asserted, else the build throws); answer i at `x = left + gap + i·(Wa + gap)`.
- Worst case with the estimate: Wt 170 (11 chars) + 20 + 3 × 143 (11 chars) = 619 from x 16 → free 24 → gap 6 **< 8 → build throws**; so **`maxChars = 11` for the target and 10 for answers when the target is 11**, i.e. assert `Wt + 20 + 3·Wa + 32 ≤ 643`. With measured widths the worst real row is 158 + 20 + 417 = 595 (gap 12): the throw guard is conservative, the render has room. *est.* for the gap only; every px above is measured or derived from measured.
- Sock y: `yTop(x) = ropeY(xPeg) − 3`, `ropeY(x) = 10 + 24·s·(1 − s)` with `s = (x − 8)/659` (quadratic sag, 6 px at mid), peg at `xPeg = x + 9` (over the cuff).
- Size floors (G2-G3: element 36, text ≥ 16, numeral n/a): sock body 40 high ≥ 36; answer word 18 px; target word 20 px; tap-free (print) so no 44 rule.

Chrome budget: the base title in de ("Wortfeld: Wörter mit gleicher Bedeutung finden", 46 chars) is two lines, instruction ≤ 150 chars three lines: body 722 holds with 78 px spare.

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| mode | 'base' | 'base' | 'base' |
| rows (lines) | 6 | **8** | 8 |
| answers per line | 3 | **3** | 4 |
| tiers | [1] | **[1, 2]** | [2] |
| pos | ['adj'] | **['adj', 'verb']** | ['adj', 'verb'] |
| strangerPos | same as target | **same as target** | same as target |
| maxCharsTarget / maxCharsAnswer | 11 / 11 | **11 / 11 (answers 10 when target is 11)** | 8 / 8 (only way four fit) |
| sockH | 44 | **40** | 40 |
| targetPx / answerPx | 22 / 18 | **20 / 18** | 20 / 16 |
| answerSlots | balanced | **balanced (each slot 2..3 of 8)** | balanced |
| rowMinPx | 90 | **70** | 70 |
| sag | 6 | **6** | 6 |

d2 is the best page: eight lines (in the G2 8-16 band), both word classes, one stranger pair per line from the page's own groups.

## 4 Answer-hiding + uniqueness

- Nothing on the page marks the twin: all three answer socks are the same width, same fill, same outline; only the word differs. The twin's slot is balanced over the 8 lines (slot 1, 2, 3 each 2..3 times; measured both directions by the gate).
- Uniqueness (pedagogy D rules 2, 3, 4, 9 enforced at draw): exactly one answer shares the target's `group`; the two strangers are from two OTHER groups on this page, same `pos` as the target, not in `antonymsOf(target)` (`bank('opposites', loc).pairs`), not a prefix antonym, not in any `near` pair with the target or the twin; each group appears on the page at most once as a target; a word never repeats on the page.
- The child's mark: one pencil circle round one sock per line. Wrong = a circle round a stranger; the teacher sees it at a glance because the twin, read aloud with the target, "means the same" and the stranger does not (e.g. `happy` / `quick`). No answer key ships (printable-only ruling); `verify()` re-derives the twin from stamps.
- Stamps: stage `data-lcs-face="base"`; each line `data-lcs-line="<n>" data-lcs-target-group="<gid>"`; each sock `data-lcs-sock="target|answer" data-lcs-group="<gid>" data-lcs-word="<literal>" data-lcs-slot="<0..2>"`. No `data-lcs-answer` on any node (the answer is derived, never stamped as a string).

## 5 Primitives / components

**Reused (exact names + file):** `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js`, F3 rank boxes, no answer attribute passed → stamps `data-lcs-answer=""`, the rank is stamped separately as `data-lcs-rank` on the sock); `gapBox` (`templates/components-b4/cloze.js`, F4 write box, 150 ≤ w ≤ 300, h 40); `ruleBins` (`templates/components-b3/spelling-rules.js`, F5 lined bins; its `bin.chip` label receives the field head); `.ws-match-dot` / `.ws-match-dot--left|--right` (`page/page.css`, F2 dots); `pictureFor` / `lib/b3-picture-index.js` (F1 pictures by explicit `{theme, noun}`, throws on a missing picture); `fillSlots` (`lib/b3-instructions.js`, F4 `{name}`); `derange` (`templates/components-b4/cloze.js`, F4 bank order); `lib/b5-common.js bank('synonyms', loc)`.

**NOT used:** `pillChoice` / `.ws-achip` / `.ws-pill` (the opposites look; the whole point is that synonyms never wears pills); `.ws-lane` card per row (opposites/cloze look); the `↔` glyph (opposites' mark); `wordBank` banner (F4 bank is a washing line instead, so the bank IS the apparatus the instruction names); `answerBox` (stamps an answer); `primitives/bin.js` (a waste bin with a lid, wrong object); `accessories/sock` picture (cannot carry a word; opened, kept only as the silhouette reference).

**NEW primitive `primitives/sock.js`** (palette-only SVG; the family's one drawing):

```
sockSvg({ W, H = 40, F = 14, T = 40, variant: 'target'|'answer'|'key', mirror = false }) -> { svg, w: W, h: H + F }
  viewBox "0 0 W (H+F)"; W >= 96 (throws below), H in {40, 44}, T (toe block width) = 40
  outline path (cuff left, toe right, toe drops F below the leg):
    M10,0 H{W-10} Q{W},0 {W},10
    V{H+F-10} Q{W},{H+F} {W-10},{H+F}            toe bottom-right, r 10
    H{W-T+8}  Q{W-T},{H+F} {W-T},{H+F-8}         toe bottom-left, r 8
    Q{W-T},{H} {W-T-6},{H}                        heel fillet
    H10 Q0,{H} 0,{H-10} V10 Q0,0 10,0 Z
  cuff  : M10,0 H16 V{H} H10 Q0,{H} 0,{H-10} V10 Q0,0 10,0 Z ; ribs = 2 lines x 6 and x 11, y 6..H-6, stroke 1.5
  toe cap: M{W-24},{H-10} H{W} V{H+F-10} Q{W},{H+F} {W-10},{H+F} H{W-24} Z
  fills  : target body tealSoft #DDEBE8, cuff + toe cap teal #146B5E, ribs white, outline teal 2.5
           answer body white #FFFFFF, cuff + toe cap creamDeep #F5E9D2, ribs grid #C8BFAE, outline teal 2
           key    body cream #FBF3E4, cuff + toe cap coralSoft #FBE3D8, ribs coral #F2784B, outline teal 2 (F3 legend only)
  mirror : transform="translate(W,0) scale(-1,1)" on the <g>, text overlay unmirrored
  text area (HTML overlay, not SVG text, so lints/fonts/bbox see it): left 24, right 10, top 0, height H,
           display:flex; align-items:center; justify-content:center; white-space:nowrap
           (mirrored: left 10, right 24)
pegSvg()  : rect 8 x 18, rx 2, fill teal, + white line y 9 (x 1..7, stroke 1.2); anchor = its centre
ropeSvg({ w, y0 = 10, sag = 6 }) : path M8,{y0} Q{w/2},{y0+2*sag} {w-8},{y0}; stroke inkSoft #8A8276, 2, round caps;
           hooks = circles r 4 at both ends, stroke teal 2, fill cream; ropeY(x) exported for placement
```
Minimum sizes: W 96, H 40 (G1 faces 44), peg 8 × 18, rope stroke 2. Every id-free (no `clipPath` ids, so 30 socks per page never collide).

**NEW components `templates/components-b5/synonyms.js`** (behind `templates/components-b5.js`):
- `sockChip({ text, W, H, variant, mirror, fontPx, family, attrs })` → `<span class="syn-sock" data-lcs-sock=… style="position:absolute;left;top;width:W;height:H+14">svg + text overlay</span>`; throws if `estW(text) > W − 34`.
- `sockLine({ n, target, answers, Wt, Wa, H, sag, stageW = 675 })` → one 70-px-min row: rope + pegs + socks at the §2 positions; stamps per §4.
- `pictureOnLine({ src, frame = 84, pic = 72 })` → a pegged white photo frame (rect rx 8, teal 2 outline, two pegs at x 14 and frame − 14) for F1.
- `sockKey()` → F3 legend (three key socks W 72/96/120, numerals 1 2 3 in Baloo 22 teal under them, one coral arrow 4 px left→right under the numerals; no words).
- `sockMatch({ left, right, order, W, itemMin = 72 })` → F2 two columns (`.ws-match` geometry), right socks mirrored, dots at the inner toe/cuff edge.
- `speechMark()` → F4 line glyph: speech bubble 32 × 26, path `M4,2 H28 Q30,2 30,4 V18 Q30,20 28,20 H12 L6,25 L7,20 H4 Q2,20 2,18 V4 Q2,2 4,2 Z`, stroke teal 2, fill white, three coral dots r 1.8 at (10,11)(16,11)(22,11).
- `sockBasketBins({ heads, rows, w = 300 })` → wraps `ruleBins`, adds the `around the house/laundry_basket` picture at 48 px left of each head chip (decoration, `data-lcs-deco`).
CSS (added to the component, not page.css): `.syn-sock{position:absolute;box-sizing:border-box}` `.syn-sock-word{font-family:Nunito;font-weight:800;color:#3A3530}` `.syn-sock--target .syn-sock-word{font-family:'Baloo 2';font-weight:700;color:#146B5E}`.

## 6 Locale slot structure

- **Sock words**: citation literals from `bank('synonyms', loc)` only (the code never inflects). Answer socks Nunito 800 18 ink; target Baloo 2 700 20 teal. Floor 16 px (only d3 answers go to 16). The page-wide `Wa` absorbs the locale's longest drawn word; per-locale reserve is not a constant +40 % but the measured cap: **maxChars 11 (base, F3, F5 12, F2 14, F1 10, F4 bank 12)**, and the draw refuses a word over the cap for that face (recorded per word, never truncated). de nouns keep the capital (none expected; the lexicon is adjectives/verbs). fr `s'exclame`: the apostrophe is in the Nunito latin subset (U+0027/U+2019, 2000-206F range) ✓; measured 74 px.
- **Field heads** (F4 instruction, F5 bin labels): the head verb in the locale's quote marks, a panel literal (en “go”, de „gehen“, fr « aller », sv/fi ”mennä”, da/no «gå»?) - Baloo 2 700 22 on a `ruleBins` chip; « » „ “ ” are in U+00AB/U+201C-201E, inside the latin subsets ✓.
- **Instruction** (chrome, Nunito 18, wraps to ≤ 3 lines): names only apparatus that is on the page: the washing line, the socks, the first sock, a picture, boxes, baskets. The apparatus nouns are panel literals per locale (en sock / de Socke / es-MX calcetín / pt-BR meia / fr chaussette / it calzino / nl sok / sv strumpa / da sok / no sokk / fi sukka); ⚠ sv/da/no definite forms (sv `strumpan`, da/no `sokken`) are written out whole by the panel, never suffixed. The instruction never says "teal" (colour words fail in greyscale and at G2); it says **"the first sock on each line"** (position, not colour).
- **Numerals** (F3 key 1 2 3 only): Baloo 2 700 22, locale-neutral.
- No text ever sits on a writing row except the child's own (F5 bins are empty ruled lines), so no starter-metric sizing applies.

## 7 Five variation faces (b c d e f)

Faces follow the pedagogy's move set exactly (F1 pictures G1 · F2 pairs G2 · F3 shades G1 · F4 say G2 · F5 fields G3); ids `G1-3xx / G2-3xx / G3-3xx (TBD by the emitter, band as stated)`. All five are **CODE** faces (a new `mode` branch in `build()` + a `verify()` branch, stamped only when `mode` is set, so the base stays byte-identical); each resolved d2 differs from the base d2 in `mode` plus the keys below (`tools/gate-variation-distinct.js`).

**b · F1 `pictures` (G1) "Synonyms with Pictures".** Visual delta: the target sock is replaced by a **pegged photo** of the picture (white frame 84 × 84, teal 2 outline, picture 72, two pegs) hanging first on each line, followed by **four** white socks; the child circles **two** (both words that name the picture). Six lines. Layout: row = frame 84 + rope top 10 + 12 = **106 min**, 6 × 106 + 5 × 12 = **696 ≤ 722** (fi 677: row min drops to 100 via `rowMinPx:100` because the frame is `min(84, rowH − 16)` with a floor of 72 → 6 × 100 + 60 = 660 ✓). Width: frame 84 + 16 gap + 4 × Wa + 3 gaps ≥ 8, `Wa` at `maxChars 10` = 0.55·18·10 + 34 = 133 → 84 + 16 + 532 + 24 = 656 > 643 → **F1 answers at 17 px** (0.55·17·10 + 34 = 128 → 636 ✓; measured worst 10-char `enfurecido` 82 → 77 at 17 px → sock 111, real row 84 + 16 + 444 + 36 = 580). G1 sock body **H 44** (G1 element floor 44 ✓), picture 72 ≥ 44 ✓, text 17 ≥ 16 ✓. Config `{mode:'pictures', rows:6, answers:4, correct:2, picFrame:84, sockH:44, answerPx:17, maxChars:10}`. Verify hook: per line `data-lcs-pic="<theme>/<noun>"`, exactly 2 socks with `data-lcs-group` = the picture's group, the other 2 in its `falseOf`; the exclusivity sets (scared/surprised; happy vs excited/merry/content; ant/mouse) never on one page; `picOpened:true`. Query face: "+ with pictures" (es "sinónimos con imágenes", fr "synonymes en images", sv "synonymer med bilder").

**c · F2 `pairs` (G2) "Match the Synonyms".** Visual delta: **no rope**; two tidy columns of six loose socks, the left column cuffs facing right, the right column **mirrored** (cuffs facing left), so the cuffs look at each other across a 200 px gap: "pair up the socks". Teal dots (`.ws-match-dot`, 12 px) at each inner edge; the child draws a line dot to dot. Layout: column sock `W = clamp(max estW(word,18)+34, 110, 180)` (maxChars 14 → 0.55·18·14 + 34 = 173), columns at x 24 and 675 − 24 − W; rows `repeat(6, minmax(72px, 1fr))` → 6 × 72 + 5 × 16 = **512**, grows to ~110 per row at 722 (calm; a matching page wants air between lines so strokes do not cross ambiguously). Config `{mode:'pairs', pairs:6, sockH:40, W:'page-max', mirrorRight:true, derange:true}`. Verify: each left `data-lcs-group` appears exactly once on the right; no two left socks share a group; no antonym/near pair on the page; right order is a derangement with ≤ 1 fixed row in 6. Query face: "match synonyms" / "Synonyme zuordnen" / "relie les synonymes".

**d · F3 `shades` (G1) "Shades of Meaning: From a Little to a Lot".** Visual delta: a **size key at the top** (`sockKey`: three blank key socks in coralSoft growing 72 → 96 → 120 px wide with 1 2 3 under them and a coral arrow; the only coral mass on any synonyms page, so the eye lands on "small → big" first). Below, six short lines, each with **three same-size socks** carrying the three words of one scale in a deranged order, and a `blankNumeralBox` 36 × 36 hanging right of each sock (the child writes 1, 2, 3 from weakest to strongest). Layout: key 64 + 16 gap; rows 6 × 70 + 5 × 12 = 480 → **560 ≤ 722** (row min 76 at G1 H 44: 6 × 76 + 60 + 80 = 596 ✓). Width: 3 × (W + 6 + 36) + 2 × 28, W = maxChars 11 → 0.55·18·11 + 34 = 143 → 3 × 185 + 56 = 611 ✓. Config `{mode:'shades', rows:6, perRow:3, sockH:44, box:36, key:true, maxChars:11}`. Verify: `data-lcs-scale`, each sock `data-lcs-rank` 1..3 (stored order), boxes carry no answer; printed order never identity, reversed on ≤ 2 of 6 rows, each rank at each slot 1..3 times; no scale word in the F4 `say` field. Query face: "shades of meaning" (L.1.5.d) / de "Wörter nach Stärke ordnen" / fr "du plus faible au plus fort".

**e · F4 `say` (G2) "Synonyms for Said".** Visual delta: the **bank IS a washing line**: two ropes of three socks at the top (six field verbs), then six sentence strips, each opening with a **speech bubble** mark (`speechMark`) and carrying one uniform `gapBox`; the child writes the sock word that fits. Layout: bank 2 × 70 + 12 = 152; strips `repeat(6, minmax(76px, 1fr))` with 12 gaps: 6 × 76 + 60 = 516 → **668 + 16 = 684 ≤ 722**; a strip = speech mark 32 + 10 + sentence (Nunito 700 18, line-height 1.4 = 25 px/line, ≤ 2 lines) with the gap box h 40 inline → 2 lines ≈ 25 + 44 = 69 + padding 6 ≤ 76 ✓ (fi 677: bank rows drop to one rope of six at 16 px only when all six words ≤ 9 chars; else **F4 refused at the fi four-line chrome** until the fi title is ≤ 3 lines, which the panel controls). Gap width `w = clamp(max estW(bankWord, 18) + 24, 150, 300)` identical on every strip (no length leak). Bank sock W page-max (maxChars 12 → 153 → 3 × 153 + 2 gaps ≤ 643 ✓). Config `{mode:'say', rows:6, bank:6, bankOnce:true, bankRopes:2, gapW:'max', sentencePx:18}`. Verify: bank set === the six answers, deranged vs strip order; the 6 × 6 fit sub-matrix is a permutation matrix; no bank word inside any sentence text (`(?<!\p{L})…(?!\p{L})`, NFD); every gap `data-lcs-gapbox` the same px width. Query face: "synonyms for said" / **"Wortfeld „sagen“"** / "sinónimos de decir" / "le verbe dire".

**f · F5 `fields` (G3) "Synonym Sort: Words for Go and Look".** Visual delta: ten socks on **two ropes of five** at the top, and below them **two laundry baskets** side by side (`sockBasketBins`: the `laundry_basket` picture 48 px + the head verb chip in quotes, 6 dashed writing lines each); the child writes each sock word into the basket of the verb it almost means. Layout: ropes 2 × 70 + 12 = 152 + 20 gap; bins `ruleBins({ w:300, rows:6, rowH:50, glyphH:26 })` + head 48 → ~420; **592 ≤ 722** (fi 677 ✓). Width: 5 socks W page-max at maxChars 12 (0.55·18·12 + 34 = 153 → 5 × 153 = 765 > 643 → **F5 socks at 16 px**, 0.55·16·12 + 34 = 140 → 700 still > 643 → **maxChars 10 at 16 px**: 0.55·16·10 + 34 = 122 → 5 × 122 + 4 × 8 = 642 ✓; measured `marschiert` 75, `beobachtet` 75 at 16 px → 109, real row 577). Config `{mode:'fields', words:10, ropes:2, perRope:5, answerPx:16, maxChars:10, bins:2, binRows:6, split:[4,6]}`. Verify: each sock `data-lcs-field` ∈ the page's two fields, never both; the heads are not socks; split 4..6; rope order has no run of ≥ 4 same-field socks; bins empty (no word printed inside). Query face: de "Wortfelder „gehen“ und „sehen“", es "campo semántico", fr "champ lexical", en "synonym sort".

**Why these five:** each changes what the child DOES on the same laundry apparatus: circle one twin (base) · circle two words for a picture (b) · draw lines between pairs (c) · number by strength against a size key (d) · write the fitting sock into a sentence (e) · write socks into two baskets (f). No two titles differ by an adjective, and each owns one query element (pictures / match / shades / said / sort).
**First to cut:** **c `pairs`**. It uses the same groups as the base and the same "same meaning" judgement, only in a bijection; its Jaccard to the base (~0.16) is the highest face pair, and "match synonyms" is the weakest of the five queries outside en/de.

**Hub contract (restated):** `apps.synonyms` in `topics-taxonomy.json`; `axes['exercise-type'].synonyms` `slug` + `name` ×11; exactly one landing per face per locale with `coordinate.type === 'synonyms'`, `coordinate.mode` = `'base' | 'pictures' | 'pairs' | 'shades' | 'say' | 'fields'`, `coordinate.theme: ''`, level key from the band table (base G2, b/d G1, c/e G2, f G3), unique slug, `canonicalDeckSlug` = the published deck; committed + deployed. Gate `scripts/verify-hub-type-rows.js` expects 6 rows per locale minus recorded refusals (none certain at design; conditional: F1 below 8 pictured groups, F3 below 8 scales, F4 at the fi four-line chrome as noted).

## 8 Two alternatives + recommendation

1. **"Twin cards" (word plate + choice pills in cream card rows).** The obvious build: clone G1-337 with the arrow removed. Rejected: it is visually the opposites family (a teacher holding G1-337 and this page would see the same sheet with a different verb), four pills do not fit one line in de/fi/pt (measured, §1), and it has no idea a child can hold onto. Its only merit is zero new drawing.
2. **"Meaning flower" (target in a flower centre, answers on petals).** Warm and very synonym-y ("words that grow from one meaning"). Rejected: petals carry text badly (11-char words need a 140 px petal, so a flower with 4 petals is ~320 px across: only 2 flowers per row, 4 per page, below the G2 8-item floor), rotated petal text is hard for 7-year-olds to read, and a flower is `flowers`-theme territory (a theme slug) and the `plants` family's icon in this same batch.

**Recommendation: Sock Twins.** It fits the worst measured word on one line with three answers, it is visually unmistakable next to opposites, the pair-of-socks metaphor teaches the concept (same kind, not identical: exactly why a shade is a different sock size in F3), it is a real classroom routine, and one primitive (`sock.js`) carries all six faces at 8-10 of the same element per page, so the family is cheap to build and consistent across 66 landings.

## 9 Risks, mitigations, print check

- **Overflow in long locales:** every width is estimated conservatively at build (`0.55·px·len`, above every measured real word) and the build throws before rendering a row that would not fit; the gate then measures the render (every `.syn-sock` bbox inside the stage, every `.syn-sock-word` scrollWidth ≤ clientWidth, no word clipped). Words over a face's `maxChars` are excluded from that face's draw for that locale (recorded count; if the pool falls below the face floor the face is REFUSED, never padded).
- **Greyscale print:** target = tealSoft body + solid teal cuff/toe (≈ 15 % and 70 % grey) vs answer = white body + creamDeep cuff (≈ 5 %): unmistakable in B&W; the instruction uses POSITION ("the first sock"), not colour. The F3 key's coralSoft/coral is the only coral mass and reads as mid-grey; its meaning is carried by SIZE and the 1-2-3 numerals, not by hue. Pegs are teal (dark) so they survive a pale print.
- **Pencil space:** base/F1 circles need ~8 px of air around each sock: guaranteed by the gap ≥ 8 guard horizontally and 12 px row gaps (the toe drop sits inside the row). F3 boxes 36 ≥ the G1 26 numeral floor + margin; F4 gap boxes h 40; F5 lines glyphH 26 ≥ 24.
- **Busy-ness:** 8 lines × 4 socks = 32 socks + 32 pegs. Mitigation: rope inkSoft 2 px (quiet), pegs 8 × 18 (small), answer socks white on cream (low contrast body, only the teal outline speaks), no rotation of any sock (text stays horizontal for young readers), no pictures on the base. The human eye must confirm the page reads "calm laundry line", not "pattern": this is the one judgement the lint cannot make.
- **Rope mistaken for a writing line:** it sags, is inkSoft (not grid), carries end hooks, and nothing is written on it; writing lines on this family exist only inside F5 baskets (dashed grid).
- **Sock not read as a sock at 40 px tall:** the three cues from the opened `accessories/sock` (ribbed cuff, heel curve, contrasting toe) are all drawn; the toe drop of 14 px makes the L-silhouette. Engineer renders one sock at 100 % and the critic eyeballs it before the family is built.
- **Circle ambiguity on neighbouring socks:** answer gap ≥ 8 px (usually 12-40) and one line per row; a circle round two socks is a visible wrong answer, not an unreadable one.
- **9 px floor:** smallest text is 16 px (F5); key numerals 22. **Cut lines:** none (nothing is cut).
- **What the QA lint catches:** overflow, footer intrusion, font < 9, off-palette hex, blank page (`[data-ws-content]` on every stage). **What only the gate catches:** sock/text clipping, twin uniqueness, slot balance, identical `Wa` per page, F4 permutation matrix, F2 derangement. **What only a human eye catches:** that the sock reads as a sock, that the page is calm, that a panel's word pair is really the same kind of sock for a child.

## 10 Summary

1. Family look = a washing line: every word hangs on a palette-SVG sock (`primitives/sock.js`); the first dark sock is the target, the child finds its twin. No pills, no `↔`, no card rows: unmistakably not opposites.
2. Base d2: 8 lines × (target + 3 page-width-uniform answer socks), circle the twin; 644 px min in a 722 body; three answers because four measured do not fit one line in de/fi/pt.
3. Faces: pictures on the line, circle two (G1) · mirrored sock columns, draw lines (G2) · size-key 1-2-3 by strength (G1) · a sock bank line + speech-bubble sentences (G2, Wortfeld „sagen“) · two ropes into two laundry baskets (G3).
4. Every width from measured Baloo/Nunito with a conservative build estimate + a throw guard; maxChars per face; gates measure the render.
5. First to cut: F2 pairs; conditional refusals only by data (pictured groups, scales) and F4 at the fi four-line chrome.
