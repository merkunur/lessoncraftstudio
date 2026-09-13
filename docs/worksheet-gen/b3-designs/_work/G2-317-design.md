# G2-317 `verb-forms` : DESIGN (studio A+B, 2026-09-13)

Every file, class and option named below was read in the repo on 2026-09-13 (`page/page.css`, `templates/components*.js`, `layouts/card-grid.js`, `primitives/trace-path.js`, the G2-274/G2-275 specs, `_shared/lit-letter-knowledge.js:114-128`, `data/b2/*.js`, `cache/manifest.json`). (m) = measured by node.

## 1 Page concept (base)

**"One verb, all its people."** Two conjugation tables stand side by side like two trading cards: each has a header with the infinitive and an ACTION picture (a child running, swimming, painting) and, under it, one row per pronoun. Two rows are printed in teal (the givens); four are dashed coral boxes the child fills. Under the tables, three sentences use the SAME two verbs with a gap and the sentence's own picture, so the child immediately applies the table ("Wir ___ im Park." with the running picture). No answer is printed; the table is the child's, not the book's.

sv/da/no and en have no person marking worth a six-row table, so the same top block renders as ONE two-column tense table (presens/preteritum, present/past): six pictured verbs down the left, two form columns, givens and gaps mixed. One component (`verbTable`), two bindings, chosen by locale DATA (`bank[loc].mode`), never by a code branch on the locale.

**Theme axis `{applicable:false}`.** The verbs are a panel bank; pictures come from one cross-theme map (the K-317 / G2-315 model). (m) `entriesFor('activities', loc)` = 34 nouns in all 11; candidate ACTION pictures: running, jumping, swimming, singing, reading, writing, painting, dancing, baking, fishing, skiing, skating, hiking, knitting, sewing, biking (16). Whether each shows a PERSON ACTING is UNKNOWN until opened (the sv #35 rule); the validator refuses a `pic` off the panel's opened list. Verbs without an action picture (eat, sleep, drink) may appear in sentence lanes only, pictured by the sentence's own noun, never in a table header.

**Fan lever** = the tense, not a theme: `fanAxis:{name:'tense', bank:'tenses', exemplar:'pres', token:'{TENSE}'}` (the G2-315 `ruleAxis` / K-317 `letterAxis` mechanism); nt20-C ships the present exemplar only. Distinct from G2-275 (word CLASS), G2-274 (mechanics), G1-249 (order), K-287 (noun plural).

## 2 Layout d2 (px)

Page 703x945, `.ws-page` padding 0 14 -> inner 675 (`page.css:25`). Body ≈ 760 (exact header + instruction + footer UNKNOWN, engineer measures; every stack below is proven at 736 too).

```
+------ verbTable 330x364 -------+  15  +------ verbTable 330x364 -------+
| [pic 64]  laufen               |      | [pic 64]  malen                |   header 84, tealSoft
+----------+---------------------+      +----------+---------------------+
| ich      | [ - - - - 206x36 - ]|      | ich      | male                |   row 46
| du       | läufst   (given)    |      | du       | [ - - - - - - - - ] |
| er/sie/es| [ - - - - - - - - ] |      | er/sie/es| [ - - - - - - - - ] |
| wir      | [ - - - - - - - - ] |      | wir      | [ - - - - - - - - ] |
| ihr      | [ - - - - - - - - ] |      | ihr      | malt     (given)    |
| sie      | laufen   (given)    |      | sie      | [ - - - - - - - - ] |
+----------+---------------------+      +----------+---------------------+
                              gap 16
+---- sentenceGap lane 675x110 ----------------------------------------------+
| [pic 56]  Am Sonntag [ - - 170x38 - - ] wir im Park.          (laufen)    |
+----------------------------------------------------------------------------+
   x3 lanes, gap 12  ->  364 + 16 + 3x110 + 2x12 = 734 <= 736
```

- **verbTable (persons)**: outer 330, border 2 teal r 14, white; header 84 = `.ws-icon` 64 + infinitive Baloo 2 700 24 teal on a `tealSoft` fill; body padding 8. Pronoun column 96 (Nunito 800 18 ink; widest labels `er/sie/es`, `ils/elles` 9 chars, ≤ 10.5 px/char est.), gap 8, form cell 206. Row 46 (≥ 44). Gap cell = `.ws-blankbox` (`page.css:445`, 2.5 dashed coral r 10, white) 206x36: pencil height 36 ≥ the 22 floor, width holds fi `kirjoitatte` (11); `maxFormLetters:12`. Given cell = Nunito 800 20 ink at x 8, no box. Even rows tinted `creamDeep` inline (page.css has no zebra rule).
- **verbTable (tense, sv/da/no/en)**: outer 675, header row 44 (labels Baloo 2 700 20 teal: `presens | preteritum`), label column 199 (`.ws-icon` 44 + infinitive Nunito 800 18, `att springa`), two form columns 220 (box 206x36), gaps 8: 199 + 8 + 220 + 8 + 220 + padding 16 + border 4 = 675. Six rows x 52 = 312; total 360. Bottom block identical.
- **sentenceGap lane**: `.ws-lane` (`page.css:401`, padding 12 16, border 2) 675x110 -> inner 639x82; grid `56px 1fr`, gap 12; paragraph Nunito 800 19 ink, may wrap to 2 lines (25 + box 38 = 63 ≤ 82); gap = inline `.ws-blankbox` 170x38 `vertical-align:middle`; hint = `.ws-nchip` (Baloo 2 700 16 teal, h 30) at the end, `(laufen)`. Literal ≤ 44 chars including `{gap}`.

**d1 / d3.** d1: ONE table 675 wide (box 400, pronoun column 120, row 52), 3 given / 3 gaps; two lanes with `pillChoice({items:3, fontPx:20})` (`components-b2.js:675`) under the sentence. d3: two tables, 0 given, `irregular:true` admits one stem-change verb per table (de `fahren`, es `dormir`, fi `lukea > luen`); lanes drop the hint chip. Tense d3: 10 of 12 gaps, irregular pairs admitted.

## 3 Ladder (resolved `difficulty`; guards key on these keys, never the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| tables / cols | 1 / 1 | 2 / 2 | 2 / 2 |
| rows (persons or verbs) | `bank.persons.length` (5-6) | same | same |
| given per table | 3 | 2 | 0 |
| irregular | false | false | true |
| lanes / laneMode | 2 / `choice` (3 chips) | 3 / `write` | 3 / `write`, `hint:false` |
| pic / rowH / boxW | 72 / 52 / 400 | 64 / 46 / 206 | 64 / 46 / 206 |
| tense-mode gaps of 12 | 6 (past column only) | 8 (mixed) | 10 |
| band | G2 | G2 (G3 per locale table, section 6) | G3 |

Pool guard `sampleEntries(rng, picturedVerbs, d.tables, 'G2-317')` (`lib/b2-common.js:64`); < 8 pictured verbs refuses the locale, recorded never filled. RNG consumed identically on the default path (G2-275 precedent).

## 4 Answer hiding + uniqueness

**Stamps** (hidden attributes, the G2-274 `data-lcs-canonical` precedent): root `data-ws-content data-lcs-face="base" data-lcs-mode="persons|tense" data-lcs-tense="pres"`; table `data-lcs-verb="run" data-lcs-inf="laufen" data-lcs-rows`; cell `data-lcs-person="1s|2s|3s|1p|2p|3p"` (tense: `data-lcs-col="pres|past"`), `data-lcs-cell="given|gap"`; gaps ONLY carry `data-lcs-form="läufst"` (never text) and `data-lcs-hard="1"` when the answer equals NO printed string on that table; lane `data-lcs-verb data-lcs-person data-lcs-form data-lcs-frame`.

**Picker rules** (in `build()`): (1) a given's text never equals a gap's `form` on the same table (de `wir/sie laufen` cannot be given + gap); (2) the header infinitive is printed too, so a gap equal to it (de `wir/sie`, nl `wij/jullie/zij`) is SOFT and each table needs ≥ 3 hard gaps (poison: de givens `ich, du`, gaps `er, wir, ihr, sie` -> hard 2 -> FAIL); (3) no shared verb across tables; (4) lanes use a tabled verb at a HARD or given person, never a soft one.

**`verify(page)`**: tables === `d.tables`; rows === `data-lcs-rows`; gap cells empty with `[data-lcs-form]`, givens with text and none; givens === `d.given`; ≥ 3 hard per table; no visible text equals any gap `form` (case-folded); lanes === `d.lanes`, one `.ws-blankbox` each, verb among the tables', text never contains its form; d1: exactly 3 pills, one === `form`, the others REAL forms of the same verb, never invented; `img.naturalWidth > 0`. Node gate `tools/gate-verb-forms-data.js` re-derives every stamped form from `bank[loc].verbs[id].forms[tense][person]` (diff, not trust; 0 checked = FAIL).

**Match**: right column = a derangement (`rng.shuffle` until no fixed index) AND forms pairwise distinct; de/nl drop the row identical to `3p` (`bank.matchRows`). **Who does it**: exactly ONE offered chip is in `form.persons[]` (de `arbeitet` = `3s` + `2p`: `[er, wir, du]` legal, `[er, ihr, du]` illegal); de `sie` is never offered bare (the `3s` chip reads `er`). Validator: `persons.filter(p => chips.includes(p)).length === 1`; poison `[er, ihr]` -> FAIL.

## 5 Primitives / components

**Reused (exact):** `.ws-lane .ws-blankbox .ws-nchip .ws-icon .ws-pill .ws-bin .ws-bin-label .ws-bin-lines .ws-match .ws-match-col .ws-match-item .ws-match-dot(--left/--right) .ws-tile .ws-tilerow` (`page/page.css`); `pillChoice({items, fontPx})` (`components-b2.js:675`); `wordTiles({tokens, fontPx, tileH})` (`:475`); `rulingBlock({rows, w, h, glyphH})` (`:507`); `fixChecklist({chips})` (`:712`); `svgRoot roundedRect label esc` (`primitives/_svg.js`); `entriesFor fileUri sampleEntries` (`lib/b2-common.js`); tokens `T.*`, `F.*`. NOT used: `answerBox` (grid-dashed; coral is the pencil signal here), `cardGrid`, `wordBank` (prints answers), `letterBoxes` (length leak), `writingRow` inside cells (reads as tracing).

**NEW in `templates/components-b3.js`** (HTML + inline SVG on the token palette; no new primitive):
- `verbTable({mode:'persons'|'tense', header:{inf, src}, colLabels:[], rows:[{key, label, src?, cells:[{col, form, given}]}], w, rowH, boxW, boxH:36, givenPx:20})` -> a div grid (`grid-template-columns: 96px 1fr` / `199px 220px 220px`) with the section-4 stamps. `persons`: one form column, header = `inf` + `src`; `tense`: `colLabels` = a 44 px header row, each row label carries its own `src` 44 + `inf`.
- `sentenceGap({src, text, gapW:170, gapH:38, hint, mode:'write'|'choice', chips:[]})` -> `.ws-lane`; `{gap}` becomes the `.ws-blankbox`; `choice` adds `pillChoice` under the paragraph; `hint` -> `.ws-nchip`; hidden stamps per section 4.
- `formMatch({left:[{label, src?}], right:[{form}], order, itemH:56})` -> the `lit-letter-knowledge.js:114` markup (`.ws-match`, two `.ws-match-col`, items 250x56, `.ws-match-dot--right/--left`); left `data-lcs-person`, right hidden `data-lcs-form-of`.
- `endingBins({bins:[{key, label, chip}], w, h, rows, glyphH:26})` -> 2-3 `.ws-bin` (the G2-315 `ruleBins` shape: inline `height`/`max-width`, `.ws-bin-label` with a coral ending chip, `rulingBlock` in `.ws-bin-lines`), `data-lcs-bin`.

## 6 Locale slot structure (`data/b3/verb-forms.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`, the b2 pattern)

```
VERB_FORMS[loc] = { mode:'persons'|'tense', band:{base:'G2'|'G3', tense:'G3'}, tenses:[{key:'pres', label:'Präsens'}, {key:'past', label:'Präteritum'}],
  persons:[{key:'1s', label:'ich'}, {key:'3s', label:'er/sie/es'}, …],   // es-MX: yo tú él/ella nosotros ustedes (NO vosotros); pt-BR: eu você ele/ela nós vocês eles/elas
  matchRows:['1s','2s','3s','1p','2p'],                                  // de/nl drop the row identical to 3p
  bins:{scheme:'ending'|'regularity', labels:[{key:'-er', chip:'-er'}, …]},
  verbs:[{ id:'run', inf:'laufen', pic:{theme:'activities', noun:'running'} | null, tier:1, regular:true|false, ending:'-en'|'-er'|…, type:1 (fi verbityyppi),
    labelOverride:{'1s':"j'"},                                            // fr elision: the pronoun literal is per VERB (j'aime / je cours)
    forms:{ pres:{'1s':'laufe','2s':'läufst',…}, past:{…} },              // literals; the code never inflects
    sentences:[{ id:'r1', text:'Am Sonntag {gap} wir im Park.', person:'1p', tense:'pres', theme:'summer', noun:'sun' }] }],
  who:[{verb:'run', person:'2s', chips:['du','er','wir']}],
  strings:{'G2-317':{title, instruction}, F2..F6:{…}} }
```
Panel rules: the SUBJECT sits inside the sentence literal (fi partitive objects and de capital nouns written out; no `{noun}` slot in this type, so no agreement with an unknown picture noun); es/pt accents are cell literals (`está`, `vocês`); fi gradation (`lukea > luen`) is `regular:false`; sv/da/no/en `mode:'tense'` (`att`/`at`/`å` inside `inf` if the panel prints it; the en 3sg `-s` is not a page); nl `ik loop / jij loopt` literals, inversion never used. Titles ≤ 70 without the worksheet word; instruction ≤ 150, one imperative.

## 7 The five faces (all CODE faces: a named additive knob + a `verify()` branch, stamped only when declared; base byte-identical; guards on `d.match` / `d.lanes` / `d.pair` / `d.bins` / `d.who`)

**F2 Pronoun and form match (`match`).** Two `formMatch` blocks side by side (one verb each), 6 rows (5 in de/nl): left pronouns, right deranged forms, the child draws lines. Tense mode: left pictured infinitives, right deranged past forms. Block 320x396 (6x56 + 5x12); two blocks + gap 32 = 672; a second pair would overflow (808), so **d2 = 2 blocks + 2 sentence lanes** (396 + 16 + 232 = 644). Stamps `data-lcs-face="match"`, `data-lcs-order`. Verify: derangement, distinct forms, rows === `matchRows`. Ships 11/11. Query face: "match the pronoun" / "Personalform zuordnen" / "relie le pronom" / "para ihop verb".

**F3 Gap sentences with pictures (`lanes:6, tables:0`).** Six `sentenceGap` lanes (720 px), six DIFFERENT verbs, hint chip on; lane picture = the sentence's `theme/noun` or the verb's action picture (`pic:'verb'`). d1 `choice`; d3 no hint. Stamps `data-lcs-face="lanes"`. Verify: 6 distinct verbs, no form visible. Ships 11/11. Query face: "fill in the verb" / "Lückensätze Verben" / "compléter avec le verbe" / "täydennä verbi".

**F4 Present and past pair table (`pair:true`).** ONE `verbTable` in `tense` mode (675x360), 6 pictured verbs, + 3 past-tense lanes. Person-marking locales: `3s` present given, `3s` past the gap (`er läuft / er lief`; the panel picks the past tense), band G3 (`bank.band.tense`). Where the BASE is already tense-shaped (en/sv/da/no) `pool:'irregular'` re-targets the face to strong verbs (`springa - sprang`, `run - ran`), a real head ("oregelbundna verb åk 3", "irregular past tense verbs"); the base keeps `pool:'regular'`. A DATA decision. Verify: every gap `data-lcs-tense="past"`; given column never equals gap column; irregular pool holds no `regular:true` verb. Ships 11/11 (fi may band 3. lk). Query face: "past tense" / "Präteritum" / "passé" / "preteritum".

**F5 Verb ending sort (`bins`).** Top: `wordTiles` of 9-12 infinitives (Nunito 800 18, tile 44, two wrapped rows ≈ 110); below, 3 `endingBins` 200x400 with the ending chip on the lid (fr `-er -ir -re`, es/pt `-ar -er -ir`, it `-are -ere -ire`, fi `verbityyppi 1 2 3`), 5 rulings each (never the split count): 110 + 24 + 400 + 28 = 562. `scheme:'regularity'` for en/de/sv/da/no: 2 bins (`schwach | stark`, `regelbundna | oregelbundna`), the child writes the PAST form into the bin (production, not only sorting); legend = `fixChecklist`. **nl REFUSED** (sterk/zwak = groep 6; only `-en`). Stamps `data-lcs-face="bins"`, hidden `data-lcs-bin-of`. Verify: bins === `bank.bins.labels`; membership 3-5 per bin; no tile equals a label. Ships 10/11. Query face: "verbs in -er -ir -re" / "verbos en -ar" / "verbityypit" / "starke und schwache Verben".

**F6 Who does it? (`who`).** Eight `.ws-lane` (2x4, 330x150): `[pic 56][form Baloo 2 700 26][3 pronoun pills]`; circle (d1/d2) or write the pronoun into a 96x36 box (d3, single-person forms only). Chips obey the exactly-one rule; en pairs `runs` with `[she, we, they]`. **sv/da/no REFUSED** (no person marking = a non-task). Stamps `data-lcs-face="who"`, hidden `data-lcs-persons`. Verify: 8 items, one valid pill each, chips distinct. Ships 8/11. Query face: "who does it?" / "Wer macht es?" / "quién lo hace" / "kuka tekee".

**Rejected:** theme swap; d1 or d3 relabelled (chips / no givens are ladder deltas); 3-tense tables (the fan); `être/avoir` as its own page (the fr/it panel PINS them as base verbs with `pic:null`, allowed in lanes and match, never in a pictured header).

## 8 Alternatives + recommendation

Alt A, four small tables 2x2 (cell 140): an 11-letter fi form needs ≈ 121 px and `er/sie/es` 96, leaving 44 px of pencil. Rejected. Alt B, one table + a bank of forms to copy (G1-244 d1 shape): the bank prints every answer. Rejected. **Recommendation: two tables + three lanes**, the only shape holding a 206 px box, ≥ 44 px rows, 11 items at d2 (within the G2 8-16 window) and a Nordic render that changes the binding, not the page.

## 9 Risks, mitigations, print check

- Nunito 800 advance vs the pronoun column and the 206 box: UNKNOWN; the data gate renders every locale at d2 and asserts no box or label overflows its grid cell (`getBoundingClientRect`); on failure `maxFormLetters` drops, never the font.
- Object pictures (piano, chessboard): the panel opens all 34, lists person-acting files only; validator poison `noun:'piano'` -> FAIL.
- Identical forms (de `wir = sie = inf`, en all but 3sg): the ≥ 3 hard-gap rule, `matchRows`, en `mode:'tense'`.
- fr `j'`, es-MX `ustedes`, pt-BR `você`, fi gradation, nl `-t`: bank literals; validator asserts `forms[tense]` has exactly `persons.length` non-empty keys; `[NSR-FLAG]` sv/da/no/fi.
- Print: box 36 px = 9.5 mm, 206 = 54 mm; given 20 px (5.3 mm), pronoun 18, chip 16, footer 10; 2 px teal ≈ 60 % grey on mono laser, tealSoft ≈ 12 %; nothing within 14 px of the edge; `qa/lints.js` on de + fi renders before any copy claims a level.
- Hub contract: `apps['verb-forms']` + `axes['exercise-type']['verb-forms'].{slug,name}` x11 (measured absent; registrar = the `tools/register-b2-taxonomy.js NEW_FAMILIES` clone); one landing per face per locale with `coordinate.type === 'verb-forms'`; F5 absent in nl, F6 in sv/da/no; `scripts/verify-hub-type-rows.js --keys=verb-forms` expects 6 rows except nl/sv/da/no 5 (62); the script does not exist and must be poison-tested first.

## 10 Summary

1. Base = two side-by-side `verbTable`s (infinitive + action picture header, 6 pronoun rows at 46 px, 206x36 coral gap boxes, 2 givens) + 3 `sentenceGap` lanes reusing the tabled verbs; 734 px at d2.
2. The same `verbTable` renders the Nordic/en base as one 675-wide two-column tense table (`bank[loc].mode:'tense'`), 6 pictured verbs, mixed givens and gaps; the lanes stay.
3. Uniqueness = ≥ 3 hard gaps per table, no printed string equals a gap answer, derangements on match, exactly-one-valid pronoun chip on the who-face; forms live only in hidden `data-lcs-form` stamps and a node gate re-derives them from the bank.
4. Five CODE faces: match (11/11), gap sentences (11/11), present-past pair table with an irregular re-target where the base is already tense-shaped (11/11), ending or regularity sort (10/11, nl refused), who does it (8/11, Nordic refused).
5. Everything linguistic is a panel literal in `data/b3/verb-forms.js`: pronouns, per-verb `labelOverride` for fr `j'`, forms, sentences with the subject inside, bin schemes; the code substitutes and never inflects.
