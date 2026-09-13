# G2-317 `verb-forms` (G2; G3 in pt sv fi) : FINAL design (editor merge, 2026-09-13)

Merged from `_work/G2-317-pedagogy.md` + `_work/G2-317-design.md`. Every file, class, primitive and option below was read in the repo on 2026-09-13; every picture named was OPENED (record: `_work/G2-317-critic.md` section 3). (m) = re-measured by node. *est.* = the engineer measures. Resolutions + open items: `_work/G2-317-critic.md`.

**Boundary (load-bearing).** Every face changes, matches, chooses or names the FORM of a verb (person or tense). G2-275 sorts uninflected chips by CLASS; G2-274 fixes capitals + end marks (verb untouched); G1-249 orders tiles (form given); K-287 inflects nouns. None of that happens here.

## 1 Identity

| field | value |
|---|---|
| id / key / band | `G2-317` / `verb-forms` / **G2 in en de fr it es nl da no, G3 in pt sv fi** (BNCC verbos 3º ano · Lgr22 tempus åk 3 · OPS persoonamuodot 3. lk); every face inherits the locale band. `default_subject: letters`, `default_age_range: 7-9`, `assetClass: icon-placement`, `exerciseType: verb-forms`. Key ABSENT from `frontend/config/topics-taxonomy.json` (`apps.*` + `axes['exercise-type']`, grep = 0 (m)); register the shape of the sibling `word-classes` (`:458`). |
| theme axis | `themeAxis:{applicable:false}`. Verbs are a panel bank; the cue is a fixed per-verb `pic:{theme,noun}` from a 9-picture ALLOWLIST, resolved through `lib/b3-picture-index.js` (README ruling). Landings carry `coordinate.theme:''`. |
| fan lever | **`unitAxis`** (README ruling). A unit is DATA in `bank[loc].units[]`: `kind:'tense'` (columns stay, `forms[unit]` changes: de Präteritum Kl. 3, es/pt pretérito 3º, nl verleden tijd groep 5) or `kind:'group'` (the POOL filters: fr -ir/-re CE2, it -ere/-ire, es/pt -er/-ir). nt20-C ships `bank[loc].exemplar` only (fr `er`, de `praesens`, sv `nu-igar`); no unit configured = the exemplar, byte-identical. |
| column axis | ONE forms grid whose column axis is DATA: **persons** (de fr it es pt nl fi, `mode:'persons'`) or **tenses** (en sv da no, `mode:'tense'`). The Nordic person refusal and the en tense rebuild are bank decisions, never a locale branch in code. |
| verb bank (m) | `data/b2/word-classes.js WORD_CLASSES[loc].verbs`: en 28 · de 30 · es 30 · pt 32 · fr 28 · it 30 · nl 32 · sv 30 · da 30 · no 31 · fi 30 (tiers 10-12 / 10-12 / 7-9). Citation forms only; every conjugated form is a panel literal in `data/b3/verb-forms.js`. Names: `data/b2/sentences.js` 8 per locale (m); its frames have no verb slot, so this type owns its frames. |
| pictures (opened) | ALLOWLIST 9: `activities/{running, reading, jumping, dancing, hiking, writing, baking}` + `occupations/{singer, artist}`. REFUSED (objects): `activities/{swimming, singing, painting, playground}`. `occupations/athlete` DROPPED (a second runner, a duplicate cue). Weak cues the panel confirms: `jumping` = a girl with a skipping rope mid-step; `baking` = a girl baker holding buns; `singer` holds a guitar; `writing` = a young man. |
| CCSS (en, honest) | base L.1.1.c + L.2.1.d · F2 L.1.1.c · F3 L.1.1.e + L.2.1.d · F4 L.2.1.d · F5 L.1.1.c/e · F6 L.1.1.b + L.2.1.d. Non-EN: framework NAME only; `strand-names.ts:170` `Language` row lacks **da + no** (m). |

| loc | genre head (base title) | ASCII slug | level key | table shape + target | pictured verbs (m, bank ∩ allowlist) |
|---|---|---|---|---|---|
| en | Verb Forms: Today and Yesterday | `verb-forms` | `grade-2` | verbs x [he/she today · yesterday]; base form printed | run read jump dance sing = **5** (+ `wander` via hiking, panel) |
| de | Personalformen der Verben | `personalformen` | `2-klasse` | 6 persons; Präsens (Präteritum = unit, Kl. 3) | laufen lesen springen tanzen singen wandern backen malen = **8** |
| es | Conjugar verbos en presente | `conjugar-verbos-en-presente` | `segundo-grado` | yo tú él/ella nosotros ustedes ellos/ellas; presente (never vosotros) | correr leer saltar bailar cantar escribir pintar = **7** |
| pt | Verbos no presente | `verbos-no-presente` | `3o-ano` | eu você ele/ela nós vocês eles/elas; presente | correr ler pular dançar cantar escrever = **6** |
| fr | Conjugaison au présent : verbes en -er | `conjugaison-au-present` | `ce1` | je tu il/elle nous vous ils/elles; présent, 1er groupe | courir lire sauter danser chanter écrire = 6, **-er = 3** (sauter danser chanter; + `marcher` via hiking, panel) |
| it | Il presente dei verbi | `presente-dei-verbi` | `classe-seconda` | io tu lui/lei noi voi loro; presente | correre leggere saltare ballare cantare scrivere = **6** (+ `camminare`, panel) |
| nl | De persoonsvorm: stam + t | `persoonsvorm-stam-plus-t` | `groep-4` | ik jij hij/zij wij jullie zij; tegenwoordige tijd | rennen lezen springen dansen zingen bakken wandelen = **7** |
| sv | Verb: presens och preteritum | `verb-presens-och-preteritum` | `ak-3` | verbs x [nu · i går]; infinitive printed | springa läsa hoppa dansa sjunga baka vandra = **7** |
| da | Udsagnsord: nutid og datid | `udsagnsord-nutid-og-datid` | `2-klasse` | verbs x [nutid · datid] | løbe læse hoppe danse synge bage vandre = **7** |
| no | Verb: presens og preteritum | `verb-presens-og-preteritum` | `3-trinn` | verbs x [nå · i går] | løpe lese hoppe danse synge bake vandre = **7** |
| fi | Verbin persoonamuodot | `verbin-persoonamuodot` | `3-luokka` | minä sinä hän me te he; preesens | juosta lukea hyppiä tanssia laulaa vaeltaa maalata = **7** |

Level keys from `LEVEL_KEYS` (`scripts/seo-landing/gen-b2var-landings.js:112-124`). Irregulars in the target tense (pedagogy's hand classification): en 12/28 · de Vokalwechsel 8/30 (`zuhören`, `backen` EXCLUDED) · es 6 · pt 5 · fr 3e groupe 7/28 (`se cacher` excluded) · it 2 · nl 0 · sv 8 · da 8 · no 9 · fi gradation 17/30; all fenced to d3 and Face 4.

## 2 The base page

**Concept.** "One verb, all its people." Two conjugation tables side by side: header = an ACTION picture + the infinitive chip; one row per pronoun; some rows printed (givens), the rest dashed coral boxes. Under them, three sentence lanes use the SAME two verbs with a gap, so the child applies the table at once. en/sv/da/no render the top block as ONE two-column tense table (six pictured verbs, present and past). The answer is never printed; the infinitive chip is the only model.

**Layout d2 (px).** Page 703x945, `.ws-page` padding 0 14 (`page/page.css:25`) -> inner 675. Body ≈ 760 (exact header + instruction + footer UNKNOWN; every stack below is proven at 736 too).
```
+------ verbTable 330x364 -------+  15  +------ verbTable 330x364 -------+
| [pic 64]  laufen               |      | [pic 64]  malen                |   header 84, tealSoft
| ich      | [ - - - 206x36 - - ]|      | ich      | [ - - - - - - - - ] |   row 46
| du       | läufst   (given)    |      | du       | [ - - - - - - - - ] |
| er/sie/es| [ - - - - - - - - ] |      | er/sie/es| malt     (given)    |
| wir      | laufen   (anchor)   |      | wir      | [ - - - - - - - - ] |
| ihr      | [ - - - - - - - - ] |      | ihr      | [ - - - - - - - - ] |
| sie      | laufen   (anchor)   |      | sie      | malen    (anchor)   |
+--------------------------------+      +--------------------------------+
                              gap 16
+---- sentenceGap lane 675x110 -------------------------------------------+
| [pic 56]  Am Sonntag [ - - 170x38 - - ] wir im Park.       (laufen)    |
+-------------------------------------------------------------------------+
   x3 lanes, gap 12  ->  364 + 16 + 3x110 + 2x12 = 734 <= 736
```
- **verbTable (persons)**: outer 330, border 2 teal r 14, white; header 84 = `.ws-icon` 64 + infinitive Baloo 2 700 24 teal on `tealSoft`; body padding 8; pronoun column 96 (Nunito 800 18 ink; `er/sie/es`, `ils/elles` 9 chars), gap 8, form cell 206; row 46 (>= 44). Gap = `.ws-blankbox` (`page.css:445`: 2.5 dashed coral r 10, white) 206x36; 36 >= the G23 answer floor 22 (`primitives/_tokens.js:70`); `maxFormLetters:12` (fi `kirjoitatte` 11). Printed cell = Nunito 800 20 ink at x 8, no box. Even rows tinted `creamDeep` inline (no zebra rule in page.css).
- **verbTable (tense; en sv da no)**: outer 675; header row 44 (Baloo 2 700 20 teal: `presens | preteritum`, en `he/she today | yesterday`); label column 199 (`.ws-icon` 44 + infinitive Nunito 800 18); two form columns 220 (box 206x36); 199 + 8 + 220 + 8 + 220 + padding 16 + border 4 = 675. Six rows x 52 = 312; total 360. Lanes identical. **en present column = 3rd person singular** (`runs`), so both columns are gappable; the base form is the printed chip.
- **sentenceGap lane**: `.ws-lane` (`page.css:401`, padding 12 16, border 2) 675x110 -> inner 639x82; grid `56px 1fr`; paragraph Nunito 800 19 ink, <= 44 chars incl. `{form}`, may wrap to 2 lines (25 + box 38 = 63 <= 82); gap = inline `.ws-blankbox` 170x38 `vertical-align:middle`; hint = `.ws-nchip` (`page.css:412`, Baloo 2 700 16 teal, h 30) `(laufen)` at the end. Lane picture = the verb's `pic`.

**Anchor + given rules (pedagogy's data rules on the design's geometry).** (1) A cell whose form equals ANY printed text on its own table (the header infinitive, a given) is an ANCHOR: printed in ink, never gapped, never counted as a given (de `wir/sie laufen`, nl `wij/jullie/zij lopen`, en past `read`). (2) Every table carries >= `minHardGaps` = 3 gaps (poison: de givens `ich, du` -> hard 2 -> FAIL). (3) `given = min(d.given, nonAnchorRows - 3)`: fr/es/it/pt/fi 2 givens + 4 gaps · de 1 + 3 · nl 0 + 3 (`ik loop / jij loopt / hij loopt`, the groep-4 task itself). (4) A given's text never equals a gap's form on the same table. (5) No verb twice on a page; both table verbs pictured (`pic` non-null). (6) Lanes use a tabled verb at a gapped or given person, never an anchor. Tense mode: 12 cells, anchors printed, 8 gaps mixed with >= 1 per row and >= 3 per column. Items d2 = 9-11 (G23 window 8-16).

**Ladder** (resolved `difficulty`; guards key on these keys, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| tables / verbsPerPage | 1 / 1 | 2 / 2 | 2 / 2 |
| given (max) / minHardGaps | 3 / 2 | 2 / 3 | 0 / 4 |
| pool | `regular` | `regular` (en `all`, L.2.1.d IS irregular past; fi `noGradation`; sv/da/no `weak`) | `all` |
| lanes / laneMode / hint | 2 / write / true | 3 / write / true | 3 / write / false |
| pic / rowH / boxW | 72 / 52 / 400 | 64 / 46 / 206 | 64 / 46 / 206 |
| tense-mode gaps of 12 | 6 (past only) | 8 | 10 |

d1 = ONE table 675 wide (pronoun column 120, row 52, box 400). Pool guard `sampleEntries(rng, picturedVerbs, d.tables, 'G2-317')` (`lib/b2-common.js:64`): the pictured floor is **>= 3 verbs per pool** (fr -er = 3 = the minimum), not the design file's 8 (which would refuse en); below 3 the locale is refused, recorded. RNG consumed identically on the default path (G2-275 precedent).

**Answer hiding + stamps.** Root `<div data-ws-content data-lcs-face="base" data-lcs-mode="persons|tense" data-lcs-unit="praesens">`; table `data-lcs-verb data-lcs-inf`; cell `data-lcs-col="ich|pres|past"`, `data-lcs-cell="given|gap|anchor"`; gaps ONLY carry `data-lcs-form` (never text) + `data-lcs-hard="1"`; lane `data-lcs-verb data-lcs-col data-lcs-form data-lcs-frame`. `verify(page)`: tables === `d.tables`; gap cells empty with `[data-lcs-form]`, givens/anchors print exactly `form`; hard gaps >= `minHardGaps`; no visible text on a table equals a gap `form` (case-folded); lanes === `d.lanes`, one `.ws-blankbox` each, text never contains its form; distinct verbs; `img.naturalWidth > 0`. Node gate re-derives every stamped form from `bank[loc].verbs[inf].forms[unit][col]` (diff, not trust; 0 checked = FAIL). verify() never inflects.

**Reused (exact).** `.ws-lane .ws-blankbox .ws-nchip .ws-icon .ws-pill .ws-match .ws-match-col .ws-match-item(--plain) .ws-match-dot(--left/--right)` (`page/page.css:178, 354-391, 401, 412, 422, 445`); `pillChoice({items, fontPx})` (`templates/components-b2.js:226`); `writingRow` (`primitives/trace-path.js:681`); `svgRoot roundedRect label esc` (`primitives/_svg.js`); `fileUri sampleEntries` (`lib/b2-common.js`); `SENTENCES[loc].names`; tokens `T.*`, `F.*`. NOT used: `answerBox` (grid-dashed), `cardGrid`, `wordBank` / `wordTiles` (print forms), `letterBoxes` (length leak), `rulingBlock` in cells (reads as tracing), `entriesFor` / `word-classes.js` at render.

**NEW in `templates/components-b3.js`** (file absent (m); HTML + inline SVG on the token palette, no new primitive): `verbTable({mode, header:{inf, src|null}, colLabels, rows:[{key, label, src?, cells:[{col, form, state:'given'|'gap'|'anchor'}]}], w, rowH, boxW, boxH:36})` (grid `96px 1fr` / `199px 220px 220px`; `src:null` = chip-only header, Face 4) · `sentenceGap({src, text, gapW:170, gapH:38, hint, render:'gap'|'text'|'choice', chips:[]})` (`.ws-lane`; `{form}` -> `.ws-blankbox`, printed text for Face 6, paragraph + `pillChoice` for Face 5) · `formMatch({left:[{label, src?}], right:[{form, role:'target'|'distractor'}], order, itemH})` (the `lit-letter-knowledge.js:114-128` markup; the right column may hold 2n items).

**Locale slot structure.** Pronoun labels, per-verb `labelOverride` (fr `j'`), every form and every frame with its subject INSIDE the literal (fi partitive objects, de capitals written out; no `{noun}` slot, so nothing agrees with a picture noun) are panel literals; the code substitutes, never inflects. es-MX `ustedes`, pt-BR `você`; nl inversion never used; sv/da/no `att/at/å` inside `inf` if printed.

**Alternatives.** Alt A four 2x2 tables (cell 140): an 11-letter fi form leaves 44 px of pencil. Alt B one table + a form bank: prints every answer. **Recommendation: two tables + three lanes**, the tense binding for en/sv/da/no.

**Risks + print.** Nunito 800 advance in the 96 pronoun column and the 206 box: *est.*; the data gate asserts no label or box overflows its grid cell on every d2 render; on failure `maxFormLetters` drops, never the font. Print: box 36 = 9.5 mm, 206 = 54 mm; given 20, pronoun 18, chip 16, footer 10; `qa/lints.js` on de + fi renders before any copy claims a level.

## 3 Faces 2-6

Chosen against the five tests (genuine move · buildable in >= 7 locales on measured pools · distinct resolved d2 · distinct query face · clean boundary): the pedagogy's five on the design's geometry. Rejected: the **ending sort** (honest in fr it es pt only; a last-letter bot scores 100 %; the regularity variant writes the PAST form, above band in de; nl refused) and **who does it** (Face 2 by direction + Face 5's move; sv/da/no refused). Ids `G2-3xx (TBD by the emitter)`; bands per locale as section 1. Guards key on `d.match` / `d.lanes` / `d.pool` / `d.choice` / `d.hunt`; `tools/gate-variation-distinct.js` sees five distinct d2 configs (b2-bound: critic OPEN 4).

### Face 2 : Match the Pronoun to the Verb Form (CODE, `match`)
EN "Match the Verb to Its Past Form". **Move:** RECOGNISE: draw a line pronoun -> form (`match:'person'`, 7 locales). **Layout:** two `formMatch` blocks side by side, one pictured verb each: rows = `bank.matchPersons` (persons with pairwise DISTINCT forms: it fi 6 · fr es 5 · **de 4** `ich du er wir` (regular `male malst malt malen`) · pt 4 · **nl 3** `ik jij wij`), item 250x56, gap 12; block 320, two + gap 32 = 672; + 2 sentence lanes (6x56 + 60 + 16 + 232 = 704). nl: `matchPersons.length < 4` -> **three blocks stacked full-width, 3 verbs x 3 = 9 lines** (608), no lanes; a DATA decision the panel may still refuse. **Tense mode (en sv da no):** REBUILT as `match:'tense'`: left 6 pictured infinitives (item 100), right **12 forms** = the past AND the present of each verb, shuffled (12 x 48 + 11 x 12 = 708); the child draws to the PAST only. The present distractors are load-bearing: with past forms alone a stem bot (`hoppa -> hoppade`) scores 6/6. **Config** `{match:'person'|'tense', verbsPerPage:2|3|6, lanes:2|0}`; d1 2 verbs, no lanes; d3 4 verbs incl. one irregular. **Verify:** derangement (`rng.shuffle` until no fixed index), pairwise-distinct forms; tense: exactly 6 `role:'target'` + 6 `distractor`, one pair per verb; lanes empty. **Ships 11/11.** **Query face:** "Pronomen zuordnen" · "relie le pronom au verbe" · "une el pronombre" · "para ihop verb och preteritum" · "yhdistä persoona ja verbi".

### Face 3 : Verb Forms in Sentences with Pictures (CODE, `lanes:6, tables:0`)
EN "Verb Forms in Sentences with Pictures". **Move:** APPLY: a gap sentence with a literal subject, the infinitive in a chip, the verb's action picture. **Layout:** six `sentenceGap` lanes 675x110, gap 12 (720); six DIFFERENT verbs, >= 4 pictured (en 5, others 6-8: every locale clears it); unpictured rows carry the frame's own object picture (`frames[].pic`, vocab noun) or none, the chip is the cue. **Config** `{lanes:6, tables:0, frames:true, hint:'inf'}`; d1 4 lanes all pictured; d3 `hint:'pic'` (pictured verbs only, no chip). **Verify:** 6 distinct verbs, `{form}` rendered as ONE box, chip === infinitive, no form visible, `data-lcs-frame` id exists in the bank. **Ships 11/11.** **Query face:** "Sätze ergänzen" · "complète les phrases" · "completa las oraciones" · "täydennä lauseet". **Boundary:** G2-274 marks capitals + end marks with the verb untouched; G1-249 orders tiles with the form given.

### Face 4 : The Irregular Core (PARAM, `pool:'irregular'`)
EN "The Helper Verbs: be, have, do, go". **Move:** the same table on the verbs every child needs: être/avoir · sein/haben · essere/avere · ser/estar/tener · ser/estar/ter · zijn/hebben · olla (+ tulla mennä tehdä) · en be have do go (tense table: is/was, has/had) · sv/da/no strong verbs (vara var · ha hade · gå gick · springa sprang). **Config** `{...base.difficulty[2], pool:'irregular', verbsPerPage:2, given:1}` (persons: 1 given + >= 4 gaps per table; anchors as base; no code). Headers are chip-only (`pic:null`: no action picture exists for `sein`); lanes stay. d1 1 verb; d3 3 verbs (+ aller / werden / ir). **Verify:** the base's, plus every table verb in `irregularCore`. **Ships 11/11** (`irregularCore` >= 2 per locale, validator floor). **Query face:** owns the A-tier fr/it head: "être et avoir au présent" · "essere e avere" · "sein und haben" · "ser, estar y tener" · "zijn en hebben" · "olla-verbi" · "starka verb" · "irregular past tense verbs".

### Face 5 : Choose the Right Verb Form (CODE, `choice`)
EN "Choose the Right Verb Form". **Move:** DISCRIMINATE: the Face-3 sentence with THREE printed forms of the same verb (`läuft / laufe / laufen`; tense: `ran / runs / run`; nl `loop / loopt / lopen`). **Layout:** eight `.ws-lane` rows h 84 (8 x 84 + 7 x 8 = 728), `padding:6px 14px` -> inner 72x647: grid `56px 1fr`; line 1 = the sentence Nunito 800 19, ONE line (<= 44 chars, validator); line 2 = three `.ws-pill` (`page.css:422`, Baloo 2 700 20, padding 6 24, h 40; <= 11 letters ≈ 169 wide *est.*; 3 + 24 = 531 <= 571); 25 + 6 + 40 = 71 <= 72. Candidates = the correct form + two OTHER forms of the same paradigm (never invented, never another verb); correct index takes all three positions over the page. **Config** `{choice:true, rows:8, candidates:3, pillPx:20}`; d1 6 rows 2 candidates; d3 + 2 rows with a tense distractor where the tense is in band. **Verify:** exactly one pill === `form`; all pills in `paradigm`; no duplicates; index not constant; no form visible in the sentence. **Ships 11/11** (every verb has >= 3 distinct forms, nl included). **Query face:** "entoure la bonne forme" · "elige la forma correcta" · "die richtige Form" · "välj rätt form" · "valitse oikea muoto".

### Face 6 : Find the Verb, Write Its Base Form (CODE, `hunt`)
EN "Find the Verb, Write Its Base Form". **Move:** ANALYSE: the CONJUGATED verb is printed inside the sentence; underline it, write the infinitive (nl `persoonsvorm -> hele werkwoord`, de `Personalform -> Grundform`, fr `trouve l'infinitif`). **Layout:** eight `.ws-lane` rows h 84 (inner 72): line 1 the sentence printed whole (`render:'text'`, Nunito 800 19, <= 44 chars); line 2 a `.ws-blankbox` 170x38 right-aligned; 25 + 6 + 38 = 69 <= 72; 4 rows pictured (56). **Config** `{hunt:true, rows:8, pictured:4}`; d1 6 rows all pictured; d3 + 2 rows with a noun-homograph guard (en `dance play jump`, de `Tanz Spiel`). **Verify:** the form occurs exactly once as a token; the box empty; `data-lcs-inf` === the bank infinitive; no `nounHomographs` token in the sentence. **Ships 11/11.** **Query face:** "persoonsvorm en hele werkwoord" · "Grundform finden" · "trouve le verbe et son infinitif" · "hitta verbet". **Boundary:** G2-275 sorts isolated uninflected chips by class; here the inflected verb inside a sentence and its infinitive.

**Rejected non-moves.** Theme swap · d1/d3 relabelled · ending sort · who does it · form -> pronoun · imperative (no picture cues it; G3+) · dropping the chip (a d3 scaffold) · 3-tense tables (the unit fan) · `être/avoir` as base verbs (Face 4 owns that head).

## 4 Native rebuild plan x11

| loc | persons / columns | tenses in band (units) | regular paradigm | irregular core (Face 4) | >= 12 verbs the panel authors with full forms | pic | refusals | traps |
|---|---|---|---|---|---|---|---|---|
| en | tense: `he/she today · yesterday` | present, past | -s / -ed (-es, -ies, e-drop, doubling) | be have do go + run read sing eat sleep swim sit draw | run jump play hop climb laugh wash push pull dance shout listen | 5 | `read` past = anchor; d2 `pool:'all'` | does/goes; F6 homographs dance play jump |
| de | ich du er/sie/es wir ihr sie | Präsens (Präteritum unit, Kl. 3) | -e -st -t -en -t -en; sammle; du sitzt | sein haben (+ werden d3) | springen singen tanzen malen wandern spielen hüpfen lachen bauen rufen suchen trinken | 8 | zuhören, backen excluded; Vokalwechsel d3/Face 4 | `sie` frames carry a NAME (`Emma` / `Emma und Ben`); matchPersons `ich du er wir` |
| es (MX) | yo tú él/ella nosotros ustedes ellos/ellas | presente (pretérito unit 3º) | -ar -er -ir | ser estar tener ir | correr saltar comer cantar leer nadar beber escribir pintar dibujar lavar bailar | 7 | 6 irregulars d3 only; never vosotros | recojo; Face 2 lists ONE of él/usted, ONE of ellos/ustedes |
| pt (BR) | eu você ele/ela nós vocês eles/elas | presente (pretérito unit 3º) | -ar -er -ir | ser estar ter ir | correr pular comer cantar nadar brincar sentar andar desenhar lavar dançar escrever | 6 | ler rir sorrir dormir construir d3 only | você = ele, vocês = eles (matchPersons 4) |
| fr | je tu il/elle nous vous ils/elles | présent (-ir/-re = CE2 group units) | 1er groupe -e -es -e -ons -ez -ent | être avoir (+ aller d3) | sauter chanter danser jouer marcher grimper dessiner laver pousser tirer attraper écouter | 3 -er (+ marcher) | 3e groupe + se cacher excluded | je = il; -eons/-çons d3; `labelOverride` `j'` |
| it | io tu lui/lei noi voi loro | presente | -are -ere -ire (+ -isc) | essere avere (+ andare fare classe terza) | correre saltare cantare nuotare giocare leggere scrivere camminare disegnare lavare ballare ascoltare | 6 | bere raccogliere costruire d3 only | mangi / giochi / lanci d3 |
| nl | ik jij hij/zij wij jullie zij | tegenwoordige tijd (verleden tijd unit groep 5) | stam · stam+t · hele werkwoord | zijn hebben | rennen lezen springen dansen zingen bakken wandelen eten slapen spelen zwemmen zitten | 7 | Face 2 = 3 x 3 or refuse | `zij` she/they: frames carry a NAME; stem spelling (loop, lees); d/t is groep 6 |
| sv | tense: `nu · i går` | presens, preteritum | -ar/-ade · -er/-de,-te · -r/-dde | vara var · ha hade · gå gick · få fick · se såg · springa sprang · sjunga sjöng · äta åt | hoppa dansa baka vandra läsa leka rita kasta simma klättra ropa lyssna | 7 | person faces = tense rebuild | bära bar; never `grupp`; `[NSR-FLAG]` |
| da | tense: `nutid · datid` | nutid, datid | -r / -ede, -te | være var · have havde · gå gik · få fik · se så · løbe løb · synge sang · drikke drak | hoppe danse bage vandre læse lege tegne kaste svømme klatre råbe lytte | 7 | as sv | `hoppe` vs the jump-rope picture (sjippe); `[NSR-FLAG]` |
| no | tense: `nå · i går` | presens, preteritum | -r / -et, -te, -de | være var · ha hadde · gå gikk · få fikk · se så · løpe løp · synge sang · fly fløy · le lo | hoppe danse bake vandre lese leke tegne kaste svømme klatre rope lytte | 7 | as sv | hoppet/hoppa: ONE per cell; `[NSR-FLAG]` |
| fi | minä sinä hän me te he | preesens only | -n -t -ø -mme -tte -vat/-vät | olla + tulla mennä tehdä nähdä | juosta tanssia laulaa maalata istua nauraa syödä juoda pestä kävellä kerätä kuiskata | 7 | gradation (17) d3 only; type labels never printed | lukea > luen; inflected objects literal; `[NSR-FLAG][fi]` |

Panels author `mode`, `columns`, `units` + `exemplar`, `matchPersons`, >= 12 regular verbs + the core with EVERY form per unit, `pic` from the allowlist (each OPENED), >= 10 frames (>= 4 with a pictured verb), `nounHomographs`, six titles (<= 70, no worksheet word, unique in band) + instructions (<= 150, one imperative), the skill sentence, slug + name; three-agent native panel per locale; the EN source is a SOURCE TO AUDIT.

## 5 Data + gates

`data/b3/verb-forms.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (both absent (m), owned by the batch's first design; `data/` gitignored, force-add):
```
VERB_FORMS[loc] = { head, mode:'persons'|'tense', band:'G2'|'G3', exemplar:'praesens',
  columns:[{key:'ich', label:'ich'}, …] | [{key:'pres', label:'nu'}, {key:'past', label:'i går'}],
  units:[{key:'praesens', kind:'tense', label:'Präsens', band:'G2'}, {key:'praeteritum', kind:'tense', band:'G3'}]
       | [{key:'er', kind:'group', label:'verbes en -er'}, …],
  matchPersons:['ich','du','er','wir'],                       // persons with pairwise DISTINCT forms
  verbs:[{ inf:'laufen', group:'stark', irregular:false, gradation:false, tier:1,
           pic:{theme:'activities', noun:'running'} | null, picOpened:true, labelOverride:{},
           forms:{ praesens:{ich:'laufe', du:'läufst', …}, praeteritum:{…} } }],   // literals per unit x column
  irregularCore:[{ inf:'sein', forms:{…} }],
  frames:[{ id:'f1', text:'Jeden Sonntag {form} Emma im Park.', col:'er', unit:'praesens',
            fits:['laufen','lesen','singen','tanzen'], subjectLiteral:'Emma', pic:null }],
  hunt:{ nounHomographs:['Tanz','Spiel'] },
  strings:{'G2-317':{title,instruction}, F2..F6:{…}} }
```
**Validator (`tools/validate-b3-draft.js`, verb-forms block; exit 1 on any):** (1) every verb and core verb has a non-empty `forms[unit][col]` for EVERY column of every unit, `/^[\p{L}' ]+$/u`; (2) `pic` in the 9-picture ALLOWLIST, resolves via `fileUri(theme, noun)`, `picOpened:true`, no localized B&W marker; `athlete` or any object -> "picture is not an action"; (3) over `matchPersons` every verb's forms are pairwise distinct; `tense`: past !== present !== infinitive; (4) **anchor rule**: a form equal to the infinitive is `anchorEqual`, never gapped; a verb keeps >= 3 non-anchor rows or leaves `regular`; (5) frames: `{form}` exactly once, no other slot, `col` in `columns`, `unit` in `units`, `fits` known, `subjectLiteral` present in `text`, `text` <= 44 chars; **`sie` / `zij` rule**: de and nl 3rd-person frames carry a NAME from `SENTENCES[loc].names`, never bare `sie`/`zij`; (6) Face 5: every verb has >= 3 distinct forms in the exemplar unit; (7) Face 6: every printed form maps to exactly one infinitive across `verbs` + `irregularCore`; no `nounHomographs` token in any frame; (8) floors, else the face is REFUSED for that locale (reported, never filled): `regular` >= 6 (>= 3 pictured), `irregularCore` >= 2, frames >= 10 (>= 4 pictured fits), `matchPersons` >= 3 or `mode:'tense'`; (9) titles: worksheet-word guard, <= 70, unique in band; instruction <= 150 with an end mark; (10) `exemplar` in `units`; `units[].band` in the band table.
**`tools/gate-verb-forms-data.js`** (node, every locale x face x level before the wave): re-derives every stamped `data-lcs-form` from the bank (diff, not trust); renders each face at d2, asserts `verify()` empty + `qa/lints.js` clean + no label or box overflows its grid cell; **stem bot** on Face 2 tense mode (longest-common-prefix matcher < 6/6); non-vacuity (0 cells = FAIL). **Poison (each must FAIL; the correct draft is the control):** P1 de `backen` with `er:'bäckt'` and a second row `'backt'` -> "two forms for one cell"; P2 fr `courir` in the CE1 regular pool -> "3e groupe"; P3 es `matchPersons` with both `ustedes` and `ellos` -> "duplicate form cantan"; P4 en gapping past `read` -> "gap equals anchor"; P5 de frame `Sie {form} im Park.` -> "ambiguous person"; P5b nl `Zij {form} in het park.` -> same; P6 Face 5 candidate `laufst` -> "not in paradigm"; P7 `pic:{activities, painting}` on `malen` -> "picture is not an action"; P8 sv `mode:'persons'` -> "no person marking"; P9 de givens `ich, du` on `laufen` -> "hard gaps 2 < 3"; P10 Face 2 tense right column without present distractors -> "stem bot 6/6"; P11 de `matchPersons` `ich du er ihr` on `malen` -> "duplicate form malt".
**`tools/gate-variation-distinct.js`** reads `waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (m): a b3 wave file / rows list is required first; expected 5 distinct d2 configs (Face 4 differs by `pool` + `given`). **QA lint** (`qa/lints.js:32`): every table, lane and match block stamps `[data-ws-content]`; density floors (icon >= 36, boxes >= 22) are asserted by the data gate.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic+fi) | meta MIDDLE (whole 120-170; the child's instruction) | hub coordinate |
|---|---|---|---|
| base | `{head}`: "Verb Forms: Today and Yesterday" · "Personalformen der Verben" · "De persoonsvorm: stam + t" / "Conjugaison au présent : verbes en -er" · "Il presente dei verbi" / "Verb: presens och preteritum" · "Verbin persoonamuodot" | Two verbs with a picture; write every missing form of the table from the infinitive | `{type:'verb-forms', mode:null, theme:'', level:<band key>}` |
| F2 | head + "Pronomen zuordnen" · "relie le pronom au verbe" · "une el pronombre" · "para ihop verb och preteritum" · "yhdistä persoona ja verbi" | Draw a line from each pronoun (or verb) to the right verb form | `{…, mode:'match'}` |
| F3 | head + "Sätze ergänzen" · "complète les phrases" · "completa las oraciones" · "täydennä lauseet" | Six picture sentences; the verb is in a chip, write its right form in the gap | `{…, mode:'sentences'}` |
| F4 | "sein und haben" · "être et avoir au présent" · "essere e avere" · "ser, estar y tener" · "zijn en hebben" · "olla-verbi" · "starka verb" · "Helper Verbs: be, have, do, go" | The irregular verbs every child needs; fill the whole table | `{…, mode:'irregular'}` |
| F5 | head + "Choose the Right Form" · "die richtige Form" · "entoure la bonne forme" · "elige la forma" | Three forms are printed; circle the one that fits the sentence | `{…, mode:'choose'}` |
| F6 | "persoonsvorm en hele werkwoord" · "Grundform finden" · "trouve le verbe et son infinitif" · "Find the Verb, Write Its Base Form" | Underline the verb in each sentence and write its base form | `{…, mode:'infinitive'}` |

`mode:null` on the base follows the corpus (m: every `word-classes` and `letter-tracing` base landing carries `mode:null`). h1 = title; eyebrow = the band label; strand = the `Language` row of `frontend/lib/seo/strand-names.ts:170` (**da + no missing: the panels add**). JSON-LD `LearningResource`, `educationalAlignment.targetName` = the CCSS code (en) or the framework NAME, no `targetUrl`. `{U}` resolves from `units[].label` when a unit fan lands.

Non-cannibalisation (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| F6 vs G2-275 word-classes | isolated chips sorted by class, verbs never conjugated; here the conjugated verb in a sentence, infinitive written | 0.12 |
| F3 vs G2-274 fix-the-sentence | capital + end mark, verb untouched; here the verb form is the gap | 0.10 |
| F3 vs G1-249 unscramble | word order, form given; here one form slot | 0.12 |
| base vs F4 (same grid; F4 names the verbs) | regular pictured verbs vs the named irregular core | 0.35 |
| base vs F3 (lanes shared) | a table + 3 lanes vs 6 lanes, no table | 0.30 |
| F2 vs base · F5 vs F3 · F6 vs F5 | line vs write · circle vs write · underline + infinitive vs circle | 0.30 / 0.30 / 0.25 |

Boundary sentence on every landing: "This page teaches the FORMS of a verb table: the infinitive is printed, the child writes, matches, chooses or names the form".

## 7 Hub visibility contract

A face appears under `verb-forms` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps['verb-forms'] = {default_subject:'letters', default_age_range:'7-9', exercise_type_axis_key:'verb-forms'}` exists in `frontend/config/topics-taxonomy.json` (absent (m); registrar = the `tools/register-b2-taxonomy.js NEW_FAMILIES` clone); (2) `axes['exercise-type']['verb-forms']` has `slug` + `name` in all 11 locales (section 1 slugs; `enumerate.js` throws on a missing one); (3) exactly one landing per face per locale with `coordinate.type === 'verb-forms'` verbatim, the band-table level key (G2 keys; pt `3o-ano`, sv `ak-3`, fi `3-luokka`), a unique slug and `canonicalDeckSlug` = the published deck; a face REFUSED in a locale has NO landing there and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=verb-forms`. Script absent (m) (nearest siblings `scripts/verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js`); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps['verb-forms']` lands. **Expected rows: 6 per locale x 11 = 66** (no refusal is measured today; nl Face 2 ships on the 3 x 3 variant). Contingent reduction, recorded in the draft before the wave: nl at 5 (65) if its panel refuses Face 2. With a future unit fan the gate counts distinct FACES, not landings.
