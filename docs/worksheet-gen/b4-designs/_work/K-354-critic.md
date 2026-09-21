# K-354 `human-body` : EDITOR-CRITIC record (2026-09-21)

Inputs: `_work/K-354-pedagogy.md` (186 lines) + `_work/K-354-design.md` (126 lines). Rule applied throughout: measured buildability > preference; the brief > both. Re-measured with read-only node (scratch `K-354-measure.js` under the session scratchpad) and by OPENING pictures with the Read tool. Output: `K-354-human-body.md` (seven sections, the K-320 skeleton) + this file. No em-dashes.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base figureH 560, laneW 200, laneH 64 | figureH 504, laneW 195, stage 675 x 580, bank 59 + 10 | **design** | arithmetic: 200 + 7 + 300 + 7 + 200 = 714 > 675 for a 560 figure; the design's 674 <= 675 / 649 <= 722 is measured; `placeLanes` on its six targets re-run (m): L 71 / 413 / 497, R 166 / 292 / 376, all inside 580 |
| 2 | base targets `rng.sample` 6 of 16 under `faceMax:2` | fixed six `head leg foot / arm hand knee` | **pedagogy** (sampled, `leadMin:4`, rejection on the crossing sweep, the design's six as the fallback) | the 20-seed sweep must vary the label SET (brief: seeded distinct pages); the design's fixed set cannot |
| 3 | anchors stamped as fractions + side; end within 10 px | explicit viewBox 300 x 560 coordinates for all 16, end within 2 px | **design** | the primitive's geometry is the contract; every anchor checked against its shape (m); 2 px is derivable from the same function |
| 4 | "all 16 regions rendered" on the base | 12 fill regions | **design** (12) | 16 are anchors, 12 are fills; an anchor is not a region |
| 5 | F1: 6 cards alone, mix {1:1, 2:3, 5:1, 10:1}, pic 80, cue `hand` for both `finger` (10) and `fingersOneHand` (5) | F1: figure left + 6 cards, counts 1 / 2 / 10, pic 72, cue `finger` for 10 | **design layout + counts**, pedagogy's facts file and rules | a 5 and a 10 with the same cue picture differ only by a printed label = a reading task at K; the `hand` picture shows five fingers (a leaked wrong count for "fingers"); the `finger` picture (OPENED: fist, index raised) is single-instance; the figure on every face is the pedagogy's own locking rule |
| 6 | F1 allows `toe` (10) cued by `foot` | (silent) | **excluded**: `toe.countFace:false` | both `foot` and `toe` pictures show five toes (OPENED): a printed wrong count |
| 7 | F2 figureH 600, `colorLegend` or two chips, regionPool 6 sample 5 | F2 figureH 540, `bodyColorLegend` flex-wrap banner ~100 high, fixed 5 regions | **design 540 + pedagogy's sampled pool**; legend re-shaped as a 374 px COLUMN of 5 rows beside the figure | 600 + a 2-row legend = 710 > 677 (fi); a flex-wrap banner with fi `vaaleanpunainen` + a part word (~265 px) risks 3 rows (the design's own risk note); one entry per row cannot wrap; stack 540 |
| 8 | F2 region floor "bbox >= 40 x 40 (est.)" | limbs 24 / 22 / 34 / 28 units wide | **limb widths RULED UP** to 30 / 26 / 40 / 34; floor restated as smaller dimension >= 24 px | at h 540 the design's forearm is 21.2 px (m), narrower than a crayon stroke; 40 x 40 was an invented number no limb can meet; the widened forearm measures 25.1 px |
| 9 | F3 `layout:'write'`: letter boxes INSIDE lanes with leaders, box 30, `boxMin` 26, n <= 7 | F3 `layout:'spell'`: numbered coral markers + 6 rows, box 44, n <= 8 | **design apparatus, box 44, n <= 8**; mode string `'write'` (pedagogy, matches §6) | the brief's G1 element floor is 44; 30 px boxes sit below it (G1-244 ships 24, m, but a new type asserts its own floor); the row 436 <= 438 is measured; pools at n <= 8 re-measured >= 14 in every locale |
| 10 | F3 d3 plain ruling | F3 d3 box 40 | **8 rows box 44, h 56** | 40 < 44 floor; d3 does not ship |
| 11 | F3 eligible pools n <= 7: en 15 de 14 es 15 pt 14 fr 14 it 12 nl 14 sv 16 da 16 no 16 fi 12 | fi pool "käsi jalka pää polvi kaula varvas" (6) | **re-measured at n <= 8 (m):** en 16 de 16 es 15 pt 15 fr 15 it 14 nl 16 sv 16 da 16 no 16 fi 14 | the design's fi list omitted `hiukset`, `olkapää`, `silmä`, `korva`, `nenä`, `suu`, `sormi`, `sääri` (all <= 8) |
| 12 | F4 figureH 250, chips 56, omitPool incl. eye ear nose mouth | F4 h 300, chips 80 / pic 64, `eye` NEVER hideable, d2 hidden = the four limbs | **design geometry; omitPool MEASURED by the pedagogy's >= 14 px rule** = {arm, hand, leg, foot, hair} at h 300 | at scale 0.536 (m): ear 9.6 x 14, mouth 15 x 6.4, nose 5.4, eye r 2.7 fail the smaller-dimension floor; hair 49 x 26 passes; sample 4 of 5 gives seed variety the design's fixed four lacked |
| 13 | F4 distractor fence = three confusable GROUPS | `chipNeverTogether` pairs [foot,toe] [hair,head] [leg,knee] | **pedagogy's groups** (a superset of the design's pairs) | the opened pictures: `arm` includes a hand, `leg` includes a foot with a red knee dot, `hair` is a face |
| 14 | chipPool 14 (no shoulder, neck) | chipPictures 15 incl. `thumb` | **14; `thumb` out** | `thumb` is not one of the 16 and was opened by neither input; opened by the editor: a thumbs-up HAND |
| 15 | F5 band G1 (K per locale via `level`), no figure, singular word on every card | F5 band K, figure referent left, PLURAL word on every card | **K band, figure referent, SINGULAR word** | K by content (a pre-school fact everywhere; the panel lists it K/G1); the figure is the type's apparatus; a plural on the pair cards beside singular singles prints the answer (brief: the answer is never printed) |
| 16 | F5 singles pool `nose mouth head neck chin tongue` | singles `head nose mouth neck`; `neck` accepted "here only" | **`head nose mouth neck`**; chin + tongue OUT | chin/tongue opened by the editor: `chin` = a whole face with an arrow (reads "head"), `tongue` = an open mouth with teeth (confusable with `mouth`; K-355's organ); `neck` opened by all three (necklace + arrow at the neck: legible) |
| 17 | `bankArticle:true` = `articles.js` chip + word, pure lookup off the gender code | `bank[part]` literal, panel writes "de hand / het oog" | **design: the article lives INSIDE the `bankWords` literal**; `articles.js` never read at render | `articles.js` is a chip-choice config (`{mode, chips, chipDots, refuse}`, m), not a lookup; a gender-code lookup would print de "das Haare" / fr "le cheveux" / it "il capelli" for the plural-only hair nouns; brief: code never composes a form; validator: `bankWords[id]` must end with `partWords[id]` |
| 18 | F1 label = `factLabels` (fi partitive) ; F2 legend uses `partWords` singular | F1 + F2 use `pl[part]` | **two slots:** `factLabels` on F1, `plural` on F2 | fi "silmää" (partitive after "kuinka monta") is right on F1 and wrong on a legend; "arms" is right on a legend (both sides coloured) and a singular is not |
| 19 | bank file `data/b4/human-body.js` + `locales/human-body.<loc>.json` | `data/b4/locales/body-facts.<loc>.json` | **pedagogy's names**; `body-facts.json` stays the ONE global file | b3 convention: a bank is keyed by the type key; the global facts file is locale-neutral by the lock |
| 20 | en F1 "may cite K.CC.B.5" as alignment | en readiness on every face | **readiness on all six; K.CC.B.5 in F1 prose only** | CCSS honesty: a science page carrying a math `educationalAlignment` is the kind of claim the brief forbids; prose may say what it practises |
| 21 | es strand K-band alternative / fr GS "Explorer le monde" (OPEN 1) | one literal per locale | **the Facts §1 literal per locale** (Conocimiento del Medio; Questionner le monde), the K-band name in prose | the `strand-names.ts` row is per locale, not per level (brief > both) |
| 22 | pt title "O corpo humano" | pt "O corpo humano e suas partes" | **the panels' compound verbatim** ("e suas partes"); slug measured 0 collisions (m) | lock: take the panels' compounds verbatim |

## 2 Claims removed or downgraded as unverified

- Pedagogy: the base stack "bank 59 + 10 + figure 560 = 629" (the figure alone is not the stage; lanes need a 580 stage: 649); "n <= 7 at laneW 220" (replaced by the measured n <= 8 at box 44 on a 438 row); "fi 12 / it 12 eligible" (14 / 14 at n <= 8); F2 "figureH 600" and "region bbox >= 40 x 40"; `omitPool` at 250 px naming eye / ear / nose / mouth (fails its own 14 px rule); `chin` / `tongue` as F5 singles (pictures never opened by the pedagogy; opened here and rejected); `articles.js` as a render-time article source (wrong shape); F5 at G1.
- Design: `thumb` in `chipPictures` (unopened, a hand); "hand/finger anchors 19 px apart at scale 0.75" (21.8 px, m; the conclusion "never together" stands); the fi F3 pool of six (14); d3 letter box 40 (below the G1 floor); a plural on every F5 card; the flex-wrap legend and its "3-row legend = a 3-entry d2 for that locale" escape (a per-locale config change is not a data decision; replaced by the column legend); "`cheeks` never" (not in the 16; moot); "F4 hidden at d2 = the four limbs, fixed" (no seed variety); the "first to cut: F5" note (all six ship: 66 rows).
- Both: every "*est.*" chip and legend width stays *est.* (no woff2 render was made here); the F4 668 stack under a 4-line fi title (677) is 9 px from the line and is flagged for the fi panel (2-line instruction) rather than claimed safe.

## 3 Numbers re-measured (which won)

| number | pedagogy | design | measured (m) | used |
|---|---|---|---|---|
| base stage width | 200 + 7 + 300 + 7 + 200 = 714 | 195 + 7 + 270 + 7 + 195 = 674 | 674 <= 675 | design |
| base lane tops (design targets) | n/a | L 71 / 413 / 497, R 166 / 292 / 376 | identical (placeLanes re-run) | design |
| stage anchors, scale 0.9 | n/a | head (308,103) leg (314,445) foot (312,506) arm (395,198) hand (438,324) knee (360,402) | (308.7,102.8) (314.1,444.8) (312.3,506) (395.1,198.2) (438.3,324.2) (360.9,401.6) | design (rounded) |
| F3 letter-box row | lane 220, box 30 | 44 + 10 + 382 = 436 <= 438 | `letterBoxes` width `n*box + (n-1)*gap + 2` = 382 at n 8 box 44 | design |
| F3 pools | n <= 7: 15/14/15/14/14/12/14/16/16/16/12 | fi 6 | n <= 8: en 16 de 16 es 15 pt 15 fr 15 it 14 nl 16 sv 16 da 16 no 16 fi 14 | measured |
| `.ws-card` padding | (14 implied) | 12 + border 2 -> inner 147 | padding 12, border 2 | design |
| `.ws-chip` default | n/a | 52, overridden to 44 | 52 x 52 | design |
| figure width per h | n/a | 270 / 289 / 225 / 161 | 270.0 / 289.3 / 225.0 / 160.7 (+ 235.7 at 440) | design |
| F4 smallest hidden bbox at h 300 | ">= 14 px, engineer measures" | "15 px mouth legible" | hair 49 x 26 pass; ear 9.6 x 14, mouth 15 x 6.4, nose 5.4, eye r 2.7 fail | omitPool {arm hand leg foot hair} |
| F2 forearm width at h 540 | n/a | 22 units | 21.2 px (design) -> 25.1 px (ruled 26) | ruled widths |
| F3 marker spacing at scale 0.75 | n/a | hand/finger 19 px | 21.8; foot/toe 19.1; neck/shoulder 27.6; head/ear 14; eye/nose 16.5; nose/mouth 13.5 (all < 30) | never together |
| taxonomy | `apps['human-body']` absent; 11 slugs 0 collisions | same | absent (m); 0 collisions for the 11 + 3 alternates (m) | both |
| LEVEL_KEYS | K keys as the hub spells them | band words | `gen-b3-landings.js` map (sv `forskola`, no `1-trinn`/`2-trinn`) | measured |
| Science strand row | absent | absent | 0 matches in `strand-names.ts` | both |
| gates on disk | `verify-hub-type-rows.js` "poison before apps lands" | same | EXISTS (nt20-C); `gate-variation-distinct.js`, `measure-instruction-window.js`, `apply/validate-b3-*` exist | recorded |
| COLOR_WORDS | x11, fi `vaaleanpunainen` widest | 8 x 11 | 11 locales x 8 keys | both |

## 4 OPEN items

1. no title: "Kroppen vår" `[NSR-FLAG][no]` vs "Kroppens deler" (a build-phase native decision; the slug `kroppen-var` is collision-free either way, m).
2. Panel word rulings that the validator forces into data: fi `leg` "sääri" / `foot` "jalka" (keep, or override `leg` with a reason; never both "jalka"); no `neck` "nakke" -> `overrides.neck = {word:'hals', reason}` (recommended; the figure is a front view).
3. de F5 wording ("zweimal" vs "Paare"); fi "parit" vs "kaksi" phrasing; whether nl / fr / es panels publish F5 under the G1 `level` key (data only).
4. fr `œ`: `document.fonts.check` on the shell's Nunito subset in a real render decides whether the base bank and the F5 card may print "œil"; if absent, `refuseWords.base/pairs:['eye']` (no row lost). F3 refuses `eye` regardless (one code point, four handwritten letters).
5. Engineer measurements the file marks *est.*: six bank chips per locale at 18 px (one row vs two), the F2 legend row widths (fi), the F3 `.ws-chip` rendered size (44 vs 46 -> figure h 400 fallback), the F4 668 stack under the fi 4-line title, the per-locale meta windows (`measure-instruction-window.js`), the crayon print check on a 25 px forearm.
6. Whether the F1 `finger` cue (a single raised index finger) reads "one" to a K child who cannot yet read the label; the alternative (`hand`) shows five. The type keeps `finger`; the F1 render is on the panel's audit list.

## 5 Quality verdict

I would print the base, F2 and F4 for a kindergarten class tomorrow and F3 for a first grade: one calm drawn child, coral rings, three lanes a side, nothing to read that the child cannot see on the page, and the figure the same in Helsinki and Mexico City with only the words swapped. What would embarrass me is a hollow figure whose missing nose nobody can see (ruled out by measuring the omitted part at the rendered height instead of trusting a list), a legend that says "das Haare" (ruled out by making the article part of the panel's literal), a "which come in twos" page that prints "eyes" next to "nose" and hands the answer to any reader (ruled out: singular everywhere), and a colouring page whose arms are narrower than the crayon (ruled out by widening the limbs and measuring 25 px, with a real crayon in the print check). The residual risk is the one no gate sees: whether a five-year-old reads the raised-finger picture as "fingers" or as "one"; the fi and pt panels, reading the render, will say so before it ships.
