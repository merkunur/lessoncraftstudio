# G2-318 `animal-fact-file` : DESIGN (studio A+B, 2026-09-14)

(m) = measured 2026-09-14 by puppeteer in the shell's fonts (scratch `g2318-measure.js`) or by node. *est.* = the engineer measures. Read: brief, substrate, README rulings, panel section 12, the G1-308 / G2-317 / G1-307 FINALs, `page.css`, `components-b2.js`, `components.js`, `card-grid.js`, `trace-path.js`, `types/g2/G2-278-write-about-the-picture.js` (the brief's `G2-278-picture-writing.js` does not exist), the 5 science banks, `image-cache/resolve.js`, `cache/manifest.json`; the three PNGs and `themes-512/{animals/fox, animals/penguin, zoo animals/giraffe, forest creatures/hedgehog}` opened.

**Boundary.** ONE animal per page in labelled fields. Science sorts bin MANY pictures; K-323 is a person; G2-278 narrates a scene; G1-203 sequences. No face here bins pictures or narrates.

## 1 Page concept (base)

A real Steckbrief card. Top-left a **framed hero picture** (white tile, 3 px teal, r 16, the animal at 220 px from the 512 cache: the opened fox / hedgehog / giraffe read as posters at that size, not icons). Right of it a **name banner** (tealSoft, the animal name Baloo 2 700 34 teal, a meaning-free coral paw stamp) and a dashed coral **draw box** ("Draw where it lives"). Below, ONE framed **fact table**: six rows, tealSoft label column (Class · Lives · Eats · Legs · Covering · Can it fly / swim?) and a white school-line lane. Under it one **fact-sentence lane** with a starter ("The hedgehog can"). Open-ended: no verify(), lints only. Fan lever = **`unitAxis`** (README ruling): `unit` = the animal's vocabKey; themeless (`themeAxis:{applicable:false}`, pictures via `lib/b3-picture-index.js`, landings `coordinate.theme:''`); no unit = `bank[loc].exemplar` (de `hedgehog`, the "Igel Steckbrief" head; default `fox`). `unit:'blank'` renders the same page with an empty dashed hero frame + a name lane (the HARD "Vorlage" head, zero code); a unit, not a face.

## 2 Layout d2 (body budgeted at 722; README ruling)

Chrome (m): inner width 675 (`.ws-page` padding 0 14); body **742** under a 3-line de title + the instruction; the design budgets **722** and lets the table rows absorb slack (`minmax(60px,1fr)`).

```
+---- heroFrame 244x244 ----+  14  +---- nameBanner 417x76 (tealSoft, r 14) ----------+
|  white, 3px teal, r 16    |      | (paw)  Hedgehog                        Baloo 34   |
|                           |      +---- drawBox 417x156 (dashed coral 2.5, r 12) ----+
|      [ picture 220 ]      |      | Draw where it lives.        (14px inkSoft label)  |
|                           |      |                                                   |
+---------------------------+      +---------------------------------------------------+
                               gap 12
+---- factTable 675 x 385 (2px teal frame, r 14; rows minmax(60px,1fr), 1.5px grid rules) ----+
| Class     (tealSoft 160) | ______________ writingRow 495x56 glyphH 28 ______________ |
| Lives                    | _________________________________________________________ |
| Eats                     | _________________________________________________________ |
| Legs                     | _________________________________________________________ |
| Covering                 | _________________________________________________________ |
| Can it fly?              | _________________________________________________________ |
+---------------------------------------------------------------------------------------+
                               gap 12
+---- factLane 675x60 (.ws-lane) : "The hedgehog can" + writingRow, glyphH 28 ---------+
```
Stack 244 + 12 + 385 + 12 + 60 = **713 <= 722** (slack 9; at 814 the rows grow to ~76).

- **heroFrame** 244x244: `.ws-icon` 220 centred (padding 12); `<img data-lcs-hero data-lcs-noun data-lcs-unit>`; `unit:'blank'` -> dashed coral 2.5 frame, empty, `data-lcs-drawbox="hero"`.
- **nameBanner** 417x76: paw 28 px coral (SVG: 4 ellipses + 1 rounded blob, `aria-hidden`), name Baloo 2 700 34 teal, `data-lcs-name`. Widest names (m, Baloo 34): `Chauve-souris` 210, `Hippopotamus` 215, `Schmetterling` 204 -> fits 417 - 28 - 32 = 357 with one line; `maxNameLetters:14`, longer -> 30 px (Hippopotamus 190) never smaller. `unit:'blank'` -> `writingRow 357x56 glyphH 28` after a "Name:" eyebrow.
- **drawBox** 417x156 (G1-308's `drawBox`, sized): label 14 px inkSoft top-left inside, `data-lcs-drawbox`.
- **factTable**: outer 675, border 2 teal, r 14, white; label column **160** tealSoft, Nunito 800 **17** ink, padding 0 8, `white-space:normal`, up to 2 lines (2 x 23 = 46 <= 60). Measured 17 px widths (m): `Körperbedeckung` 132, `Kann es fliegen?` 120, `Kan het vliegen?` 122, `Recubrimiento` 109, `elinympäristö` 100, `Alimentação` 92, `Kann es schwimmen?` 158 (wraps to 2 lines inside 152). Validator caps a label at 28 chars / 2 measured lines. Lane = `writingRow({w:495, h:56, glyphH:28, xHeight:true})` (`primitives/trace-path.js:681`; 495 = 675 - 4 - 160 - 16); glyphH 28 >= the brief's 28 and the G2 floor 24. Row stamps `data-lcs-field="class|lives|eats|legs|covering|fly"`.
- **factLane** 675x60: `.ws-lane` (`page.css:401`) with inline `padding:6px 16px` -> inner 643x48; starter Nunito 700 20 inkSoft inline at the left, `writingRow` (h 48, glyphH 28) for the rest.

**d1 / d3 differences.** d1: 4 fields (class · lives · eats · covering), rows `minmax(76px,1fr)`, glyphH 32, hero 260 (picture 236), draw box 417x172, no fact lane: 260 + 12 + 4x76 + 3x6 = 594 (rows grow to ~108 at 722). d3: 7 fields (+ `special`: "Special feature"), rows `minmax(52px,1fr)` glyphH 24, hero 214 (picture 190), right column = nameBanner 60 + **interestingFact block** (label 18 + `rulingBlock({rows:3, w:417, h:40, glyphH:24})`, `components-b2.js:58`) = 214; no draw box; 214 + 12 + 7x52 + 6x4 = 614 (rows grow to ~67).

## 3 Ladder (resolved config; guards key on these keys, never the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| fields | class lives eats covering | + legs fly | + special |
| rowMin / glyphH / labelPx | 76 / 32 / 18 | 60 / 28 / 17 | 52 / 24 / 16 |
| hero / pic | 260 / 236 | 244 / 220 | 214 / 190 |
| drawBox / factLane / factBlock | 417x172 / 0 / 0 | 417x156 / 1 / 0 | none / 0 / 3 rows |

Density: G23 min element 36 (`_tokens.js:70`); the 8-16 item window counts 6 rows + lane + draw box = 8 (d1 = 6, recorded; the lint counts `[data-ws-content]`, not items).

## 4 Answer-hiding + uniqueness

**Base (open):** no verify(); `qa/lints.js` only (overflow `:37-45`, footer `:50-66`, font >= 9 `:86`); root `<div data-ws-content data-lcs-animal="<vocabKey>" data-lcs-unit>`; every lane an empty `[data-lcs-prim="writing-row"]`; visible words = name, labels, draw label, starter (G2-278's stray-text check).

**The fact table is the truth.** NEW `data/b3/animal-facts.json` (locale-neutral, curated, ~30 animals): `{ key:'hedgehog', pic:{theme:'forest creatures', noun:'hedgehog'}, class:'mammal', lives:'land', eats:'both', legs:4, covering:'fur'|'skin' (panel rules the spines), fly:false, swim:true|false|null, picOpened:true }`. The five science banks are a CROSS-CHECK, never the source (m: only `rabbit` sits in all five, cat/dog/eagle in four, `legs` in none; the classification bank omits dolphin/whale on purpose). Validator: a bank fact must equal the file; `class` outside {mammal, bird, reptile, fish, insect} EXCLUDES the animal from verifiable faces (frog, snail, spider, octopus, crab: base/compare/sentences only, recorded). Verifiable faces stamp the expected value on the ROW (`data-lcs-fact="mammal"`), never on a chip; chips carry `data-lcs-opt` only, in FIXED canonical order, every option on every row of every page (class 5 · lives 3 · eats 3 · legs 0/2/4/6 · covering 5 · fly yes/no), no glyph or tint. Node gate `tools/gate-animal-facts.js` re-derives every stamp (diff; 0 rows = FAIL).

## 5 Primitives / components

**Reused (exact).** `writingRow` + `schoolLines` (`trace-path.js:241,681`); `rulingBlock` (`components-b2.js:58`; d3 block); `wordBank` (`:210`; F3 picture bank, F4 word bank); `.ws-lane .ws-pill .ws-nchip .ws-icon .ws-scene-banner .ws-bank .ws-bankword` (`page.css`); `drawBox`, `truthChips` (G1-308 FINAL); `svgRoot roundedRect circle el esc`; `fileUri` (`resolve.js:33`, 512 cache); `excluded`; tokens `T.teal T.tealSoft T.coral T.ink T.inkSoft T.white T.grid`, `F.display F.body`. NOT used: `pillChoice` (centres, no field stamp), `answerBox` (numeral box), `cardGrid`, `sceneStage`, `fixChecklist`, `letterBoxes`, `silhouette.js` (a shadow hero leaks the riddle).

**NEW in `templates/components-b3.js`** (HTML + inline SVG on the token palette):
- `heroFrame({src|null, size=244, pic=220, noun, unit})`: white tile, 3 px teal, r 16; `src:null` = dashed coral empty frame.
- `nameBanner({name|null, w=417, h=76, fontPx=34, paw=true, eyebrow})`: tealSoft band r 14; `name:null` = eyebrow + `writingRow`.
- `factTable({rows:[{key,label,lane:'write'|'choice', options?, fact?}], w=675, rowMin, glyphH, labelW=160, labelPx})`: CSS grid `160px 1fr` / `grid-auto-rows:minmax(<rowMin>px,1fr)`, 1.5 px `T.grid` rules, `data-lcs-field` per row.
- `choiceRow({options, w, pillPx=16, h=36})`: `.ws-pill` chips in bank order, `data-lcs-opt`, gap 8, left-aligned.
- `factLane({starter, w=675, h=60, glyphH=28})`: `.ws-lane` + inkSoft starter + `writingRow`.
- `miniFactFile({hero:120, name, fields:4, laneH:48, glyphH:24, w:330})` (F2): label ABOVE lane (14 px).
- `factChips({chips, w})` (F3 / F5): `.ws-scene-banner` of `.ws-nchip` h 36 Baloo 2 700 18, `data-lcs-chip` (+ `data-lcs-chip-field` F5), shuffled.
- `sameDiffRow({fields, w=675})` (F2): 4 cells, label 14 + `truthChips` (same | different), `data-lcs-same="1|0"`.

## 6 Locale slot structure (`data/b3/animal-facts.js[loc]`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`)

```
FACT_FILE[loc] = {
  labels:{ class:'Tierklasse', lives:'Lebensraum', eats:'Nahrung', legs:'Beine', covering:'Körperbedeckung', fly:'Kann es fliegen?', swim:'Kann es schwimmen?', special:'Besonderheit' },
  eyebrow:'Name', drawLabel:'Male, wo es lebt.', factStarter:'{subj} kann',           // whole literals
  options:{ class:{mammal:'Säugetier', bird:'Vogel', reptile:'Reptil', fish:'Fisch', insect:'Insekt'},
            lives:{land:'Land', water:'Wasser', air:'Luft'}, eats:{plants:'Pflanzen', meat:'Fleisch', both:'beides'},
            covering:{fur:'Fell', feathers:'Federn', scales:'Schuppen', shell:'Panzer', skin:'Haut'}, yesno:{yes:'ja', no:'nein'} },
  frames:[ {field:'class', text:'{subj} ist ein {gap}.'}, {field:'lives', text:'{subj} lebt {gap}.'}, {field:'eats', text:'{subj} frisst {gap}.'} ],
  subj:{ hedgehog:'Der Igel', owl:'Die Eule', ... reviewed:true },   // per-animal literal: de definite by gender, fr elision (L'ours), sv/da/no DEFINITE (igelkotten; the banan trap: printed in full for a human read), fi bare nominative
  bothStarter:'Beide Tiere', mystery:{ prompt:'Wer bin ich?' }, exemplar:'hedgehog', labelW:160,
  strings:{ 'G2-318':{title,instruction}, F1..F5:{...} } }
```
- **Banner name** = the vocab singular AS STORED (initial capital everywhere, m: `Katt`, `Kissa`, `Igel`); inside frames only `subj` literals (never `displayWord`). Plural/gender never printed.
- **Frames never agree with the ANSWER**: de class nouns all take `ein` (Säugetier n, Vogel m, Reptil n, Fisch m, Insekt n), fr/it/es all `un` (incl. `un ave`), nl `een`; **pt** (`uma ave`) and **sv/da/no** (`ett däggdjur` / `en fågel`) put the article INSIDE the bank word and the frame carries none; fi has none. Validator: no `options` literal and no gendered article before `{gap}` where `articleInGap:true`.
- **Label column** (m, 17 px, 2-line wrap): 160 fits every measured label; `labelW` 150-180 per locale; gate asserts <= 2 lines per label and lane >= 470.
- Panel authors: 8 labels, eyebrow, drawLabel, factStarter, 20 options, 3+ frames, `subj` x ~30, bothStarter, mystery prompt, 6 titles (genre head, <= 70, no worksheet-word, unique in band) + instructions (<= 150). EN is a SOURCE TO AUDIT.

## 7 The five variation faces (all G2, ids `G2-320+ TBD by the emitter`)

Chosen: b guided · c compare · d mystery · e fact sentences · f fact-chip sort ((a) is the base). Each survives the tests: a distinct move (recognise · contrast · deduce · produce · classify a fact), buildable in 11 locales from one fact file + 20 option literals, distinct resolved d2, distinct query face. d and c change the page most (own heads "Wer bin ich?", "Tiere vergleichen"); b and f reuse the base table (cheapest; the de "zum Ankreuzen" query); e is the writing rung.

- **F1 Guided fact file (CODE `mode:'choice'`).** Base layout; each lane = `choiceRow` at 16 px (*est.* x0.87 of the measured 18 px pills: de class row Säugetier ~100 + Vogel 68 + Reptil 71 + Fisch 66 + Insekt 77 + gaps 32 = 414 <= 495; fi 428; de covering 373). Row h 60 fixed, chips never wrap; draw box + fact lane stay. Verify: every row prints ALL options in canonical order, `data-lcs-fact` is in the row's set, no chip text equals another field's option; `swim` row only when `swim !== null`; node gate re-derives. Refusal: a chip row wider than the lane at 15 px -> the locale is REFUSED, recorded (est. 0). Query face: "tick the facts" / "zum Ankreuzen" / "para marcar" / "kryssa i" / "rastita".
- **F2 Compare two animals (CODE `mode:'compare'`).** Two `miniFactFile` 330 wide (gap 15): hero 120 + name 44 + 4 fields (class lives eats covering; label above, lane 302x48 glyphH 24) = 460 + padding 24 = 484; `sameDiffRow` 675x96; `factLane` 675x60 with `bothStarter`. Stack 484 + 12 + 96 + 12 + 60 = 664 <= 722. Partner = `rng.pick` such that the pair agrees on >= 1 and differs on >= 1 of the 4 fields (200 tries then throw). Verify: `data-lcs-same` re-derived per field; chips fixed order, no glyph; two distinct animals, both pictures resolve. Query face: "compare two animals" / "Tiere vergleichen" / "compara dos animales" / "jämför två djur" / "vertaa kahta eläintä".
- **F3 Mystery animal: Who am I? (CODE `mode:'mystery'`).** Top: `wordBank({withIcons:true})` of 6 animals (icon 44, word 15; ~100 high). Below 3 `.ws-lane` rows 675x194 (inner 643x170): `[factChips 2x3 grid 290][16][prompt 16 px + writingRow 150x56 glyphH 26][16][drawBox 160x160]` = 632 <= 643. Stack 100 + 12 + 3x194 + 24 = 718. Composer: 3 targets + 3 distractors from the verifiable pool, each card prints its target's 6 facts; verify = exhaustive filter of the bank by the printed chips -> EXACTLY ONE match per card (else refuse, never pad), no target twice, chips shuffled, no picture on the card. Query face: "who am I? animal riddle" / "Wer bin ich? Tierrätsel" / "adivina el animal" / "vilket djur är jag?" / "mikä eläin olen?".
- **F4 Fact sentences (CODE `mode:'sentences'`).** Hero 200 left; right column 461 = `wordBank` of 6 words (3 answers + 3 distractors from the same option sets, shuffled; ~100) + `nameBanner` 461x60. Below 3 `.ws-lane` rows h 110 (inner 82): frame Nunito 800 19, `{gap}` = an inline `writingRow 200x56` (25 + 56 <= 82), <= 40 chars before the gap (validator). Stack 200 + 12 + 3x110 + 24 = 566. Verify: exactly one lane per frame, `data-lcs-fact` = the field value, bank === answers + distractors (no word answers two frames), `subj` present + `reviewed`. Refusal: an animal without `subj` drops from F4 (sv/da/no until the definite table is read). Query face: "animal fact sentences" / "Sätze über das Tier" / "frases sobre el animal" / "meningar om djuret" / "lauseita eläimestä".
- **F5 Fact-chip sort (CODE `mode:'chips'`).** Base layout; the draw box slot (417x156) holds `factChips`: the animal's 6 real facts shuffled (`Fell · 4 · Land · Pflanzen · Säugetier · nein`); the six lanes stay writing lanes (the child writes each chip into its row). Verify: chips === the row facts as a set, deranged order, no chip twice, `data-lcs-chip-field` never visible. Query face: "sort the facts" / "Fakten zuordnen" / "ordena los datos" / "sortera fakta" / "lajittele faktat".

All five are CODE faces (`mode` knob + `verify()` branch; base byte-identical; `data-lcs-face` only when declared). `tools/gate-variation-distinct.js` needs the b3 wave file first (siblings' OPEN item). Rejected: theme swap · d1/d3 relabelled · a printed class stamp (prints the answer) · a silhouette riddle hero (leaks the shape) · "colour the animal" (colour art) · life-cycle strip (G1-203) · Venn (G3-353).

## 8 Two alternatives + recommendation

- **Alt A: fields as 2x3 `cardGrid` cards** under a full-width hero: lane 302 = ~14 glyphs at glyphH 28 (`Pflanzenfresser` fills it) and no room for the fact lane. Rejected on width.
- **Alt B: centred hero, draw box full-width at the bottom** (the classic German print): the box is 675x120 = 32 mm thin and the table drops to rows of 52 (glyphH 24 < 28). Rejected on lane height.
- **Recommendation: the hero-left card (section 2)**: 220 px hero, 28 px lanes, a real draw box and a sentence lane inside 713; every face reuses the table.

## 9 Risks + mitigations + print check

- **Long labels (de/fi/nl):** 160 column + 2-line wrap, cap 28 chars, gate asserts <= 2 measured lines (poison: `Kann es wirklich gut schwimmen?` -> FAIL).
- **Article-before-gap leak (pt/sv/da/no):** `articleInGap` + article inside the bank word; validator forbids option literals / gendered articles in frames.
- **Riddle with two solutions:** exhaustive verify; poison: fox + wolf in one bank with a fox card -> FAIL.
- **Wrong fact:** bank cross-check + `picOpened:true`; every hero OPENED by the panel (sv #35 `fruits/plum` precedent); ambiguous classes never reach a verifiable face.
- **`unitAxis`** is ruled, not built; the exemplar path stays byte-identical (`b3-baseline --check`).
- **Print check:** hero 220 px = 58 mm on a WHITE tile; on mono laser the flat art prints as mid greys with dark outlines (legible on every opened picture); tealSoft column ~10 % ink, teal frames 2-3 px, coral dashes ~55 % grey; ~9 % ink overall (*est.*; engineer prints one de d2 on mono laser + inkjet and writes six lanes in HB). Smallest text 14 px vs the 9 px lint; footer lint backs the 722 budget; no meaning rides on colour.

## 10 Summary

1. A Steckbrief card: 244 px framed hero + printed name banner + draw box, a six-row fact table (label 160 tealSoft, lanes 495 glyphH 28) and one fact lane; 713 px at the 722 body floor.
2. Open base, no verify; fan per animal via `unitAxis` (exemplar = de hedgehog), `unit:'blank'` = the blank template at zero code.
3. Truth = a curated `animal-facts.json` (~30 animals) cross-checked against the 5 science banks; verifiable faces stamp rows, print every option in fixed order, node gate re-derives.
4. Five CODE faces: tick-box · compare (same/different row) · who-am-I riddle (6-picture bank, exactly-one solver) · fact sentences (article-free frames, `subj` literals) · fact-chip sort.
5. NEW components `heroFrame nameBanner factTable choiceRow factLane miniFactFile factChips sameDiffRow` in `components-b3.js`; panels author 8 labels + 20 options + frames + ~30 `subj` literals per locale.
