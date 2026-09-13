# G2-317 `verb-forms` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

MEASURED 2026-09-13 unless marked *est.* (scratch `g2317-measure.js`, read-only). Verb bank = `data/b2/word-classes.js WORD_CLASSES[loc].verbs`: en 28 · de 30 · es 30 · pt 32 · fr 28 · it 30 · nl 32 · sv 30 · da 30 · no 31 · fi 30 (tiers 1/2/3 = 10-12 / 10-12 / 7-9). Regular/irregular = the pedagogue's hand classification over that bank (every listed verb confirmed present). Picture join = `entriesFor('activities'|'occupations', loc)` mapped to bank verbs by an explicit table, then **every candidate picture OPENED**. Names = `data/b2/sentences.js` (8 per locale); its frames carry no verb slot, so G2-317 needs its own frame bank.

**Picture finding.** ACTION shown: `activities/running reading jumping (skipping rope) dancing hiking writing baking` + `occupations/singer artist athlete` (athlete = a second runner). OBJECT, refused as a cue: `swimming` (goggles) · `singing` (microphone) · `painting` (palette) · `playground` (equipment). No picture exists for eat sleep sit drink climb laugh wash throw catch build hide swim cook.

## A. IDENTITY

| field | value |
|---|---|
| id / key / subject | `G2-317` / `verb-forms` / `default_subject: letters`, `default_age_range: 7-9`, `assetClass: icon-placement`. Key ABSENT from `topics-taxonomy.json` (`apps` + axis, grep = 0): register before the wave. |
| band | G2 in en de fr it es nl da no; **G3 in pt sv fi** (BNCC verbos 3º ano · Lgr22 tempus åk 3 · OPS persoonamuodot 3. lk). Faces inherit the locale band. |
| theme axis | **OFF** (verbs are cross-theme). Picture = a fixed per-verb cue `pic:{theme,noun}` from the 10 verified action pictures (5-8 verbs per locale); rows without one show the infinitive chip only. Fan lever = `verbGroup` / `tense`. |
| CCSS (en, honest) | F0 L.1.1.c + L.2.1.d · F1 L.1.1.c · F2 L.1.1.e + L.2.1.d · F3 L.2.1.d · F4 L.1.1.c/e · F5 L.1.1.b + L.2.1.d. Non-EN: national framework name only (`strand-names.ts` Language row: **da + no MISSING**, panel adds). |

| loc | genre head (base title) | ASCII slug | level | TABLE SHAPE + target tense | pictured verbs (measured) |
|---|---|---|---|---|---|
| en | Verb Forms: Today and Yesterday | `verb-forms` | grade 2 | verbs x [he/she/it today · yesterday]; base form printed | run read jump dance sing = 5 |
| de | Personalformen der Verben | `personalformen` | 2. Klasse | 6 persons x 3 verbs; Präsens (Präteritum = G3 fan) | laufen lesen springen tanzen singen wandern backen malen = 8 |
| es | Conjugar verbos en presente | `conjugar-verbos-en-presente` | segundo grado (MX) | yo tú él/ella nosotros ustedes ellos/ellas x 3; presente (usted = él form, no row; never vosotros) | correr leer saltar bailar cantar escribir pintar = 7 |
| pt | Verbos no presente | `verbos-no-presente` | 3º ano | eu você ele/ela nós vocês eles/elas x 3; presente (pretérito = fan) | correr ler pular dançar cantar escrever = 6 |
| fr | Conjugaison au présent : verbes en -er | `conjugaison-au-present` | CE1 | je tu il/elle nous vous ils/elles x 3; présent, 1er groupe only | courir lire sauter danser chanter écrire = 6 (-er: 3) |
| it | Il presente dei verbi | `presente-dei-verbi` | classe seconda | io tu lui/lei noi voi loro x 3; presente | correre leggere saltare ballare cantare scrivere = 6 |
| nl | De persoonsvorm: stam + t | `persoonsvorm-stam-plus-t` | groep 4 | ik jij hij/zij wij jullie zij x 3; tegenwoordige tijd (verleden tijd groep 5 = fan) | rennen lezen springen dansen zingen bakken wandelen = 7 |
| sv | Verb: presens och preteritum | `verb-presens-och-preteritum` | åk 3 | verbs x [nu · i går]; infinitive printed; NO persons | springa läsa hoppa dansa sjunga baka vandra = 7 |
| da | Udsagnsord: nutid og datid | `udsagnsord-nutid-og-datid` | 2. klasse | verbs x [nutid · datid]; NO persons | løbe læse hoppe danse synge bage vandre = 7 |
| no | Verb: presens og preteritum | `verb-presens-og-preteritum` | 3. trinn | verbs x [nå · i går]; NO persons | løpe lese hoppe danse synge bake vandre = 7 |
| fi | Verbin persoonamuodot | `verbin-persoonamuodot` | 3. luokka | minä sinä hän me te he x 3; preesens (aikamuodot 4. lk = above band) | juosta lukea hyppiä tanssia laulaa vaeltaa maalata = 7 |

Regularity in the d2 target tense (measured): **en** past irregular 12/28 (run sleep eat sing read swim sit draw throw catch build hide), spelling-change 4 (hop carry dance giggle), 3sg -es/-ies 4. **de** Präsens Stammvokalwechsel 8/30 (laufen schlafen essen lesen waschen werfen fangen tragen), zuhören separable + backen bäckt/backt REFUSED, -eln/-ern 5, s-stem 2, fully regular 13; Präteritum strong 16. **es** presente irregular 6 (dormir jugar reír volar cerrar construir) + recoger. **pt** irregular 5 (dormir ler rir sorrir construir). **fr** 1er groupe 21/28 (nous-spelling 3; `se cacher` REFUSED), 3e groupe 7 (CE2). **it** irregular 2 (bere raccogliere), -isc 1, spelling 4, regular 23. **nl** present irregular 0/32 (stem spelling only); verleden sterk 14. **sv** strong preteritum 8/30, -ar 18, -er 11, dra 1. **da** stærk 8/30. **no** sterk 9/31. **fi** consonant gradation 17/30 (nukkua lukea piirtää työntää vetää heittää hyppiä leikkiä kantaa rakentaa huutaa kikattaa vaeltaa piiloutua kuunnella napata kiivetä), stem change 1 (juosta), gradation-free 12.

## B. THE SIX FACES

ONE forms grid whose column axis is DATA: `columns[]` = persons (de fr it es pt nl fi) or tenses (en sv da no); this makes the sv/da/no person refusal a data decision. Layout (px; design file owns): body 703x760. Persons-as-rows when `columns.length >= 4`: header 96 (picture 56 + infinitive chip) + 6 rows x 96 = 672; pronoun column 110 + 3 verb columns x 188 = 675. Verbs-as-rows when `<= 3` (en sv da no): 6 rows x 96, picture 56 + chip 150 + 2 cells x 200. Gap cell = `writingRow({w:176,h:44,glyphH:24})` in a dashed coral box; printed cell Baloo 2 700 20 ink. A cell whose form equals a PRINTED anchor in its row (de wir/sie-Plural and nl wij/jullie/zij = the infinitive; en past `read`) is never gapped.

| # | id / slug | EN title (<= 70) | teaching move | what the child does (d2) |
|---|---|---|---|---|
| F0 | G2-317 `verb-forms` | Verb Forms: Fill the Table | PRODUCE the paradigm from the infinitive (persons, or tenses in en/sv/da/no). | 3 verbs x 6 persons (18 cells, 9 gapped) or 6 verbs x 2 tenses (7 gapped) |
| F1 | G2-3xx `verb-forms-match` | Who Does It? Match Pronoun to Verb Form | RECOGNISE: draw a line pronoun -> form (`match:'person'`). en sv da no REFUSE the person move and are REBUILT as `match:'tense'` (infinitive -> past form). | 3 verbs; pronoun chips left, the DISTINCT forms shuffled right; 12-15 lines |
| F2 | G2-3xx `verb-forms-sentences` | Verb Forms in Sentences with Pictures | APPLY: gap sentence with a literal subject, the infinitive in brackets, an action picture. | 6 rows, >= 4 pictured; writes 6 forms |
| F3 | G2-3xx `verb-forms-irregular` | The Helper Verbs: be, have, do, go | The IRREGULAR CORE: être/avoir · sein/haben · essere/avere · ser/estar/tener · ser/estar/ter · zijn/hebben · olla · be/have/do/go · sv/da/no starka verb. Same grid, `pool:'irregular'`. | 2 verbs, all cells gapped but one anchor per verb |
| F4 | G2-3xx `verb-forms-choose` | Choose the Right Verb Form | DISCRIMINATE: the F2 sentence with 3 printed forms of the same verb (läuft / laufe / laufen). | 8 rows; circles 8 |
| F5 | G2-3xx `verb-forms-infinitive` | Find the Verb, Write Its Base Form | ANALYSE: the conjugated verb printed in the sentence; underline it, write the infinitive (nl persoonsvorm -> hele werkwoord; de Personalform -> Grundform). | 8 rows; underlines 8, writes 8 |

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 2 pictured verbs, 1 gap per column, `pool:'regular'` | 3 verbs (>= 2 pictured), ~50 % gaps, `pool:'regular'` (en `'all'` since L.2.1.d IS irregular past; fi `'noGradation'`; sv/da/no `'weak'`) | 3 verbs, 70 % gaps, `pool:'all'` (Stammvokalwechsel, gradation, strong, pt ler) | none | base |
| F1 | 2 verbs | 3 verbs, `match` from `bank.matchAxis` | 4 verbs incl. 1 irregular | `match` | CODE |
| F2 | 4 rows all pictured | 6 rows, `frames:true`, `hint:'inf'` | 6 rows `hint:'pic'` (pictured verbs only) | `frames`, `hint` | CODE |
| F3 | 1 verb | `{...base.difficulty[2], pool:'irregular', verbsPerPage:2}` | 3 verbs (+ aller / werden / ir) | `pool` | **PARAM** |
| F4 | 6 rows, 2 candidates | 8 rows, 3 candidates, `choice:true` | + 2 rows with a tense distractor where the tense is in band | `choice` | CODE |
| F5 | 6 rows pictured | 8 rows, `hunt:true`, 4 pictured | + 2 rows with a noun-homograph guard | `hunt` | CODE |

Guards key on `d.pool / d.match / d.frames / d.choice / d.hunt`, never the level index; `gate-variation-distinct.js` sees 5 distinct d2 configs.

**verify() (browser).** Stamps: root `data-ws-content data-lcs-face data-lcs-axis`; cells `data-lcs-verb data-lcs-col data-lcs-form data-lcs-gap`; F2/F4/F5 rows `data-lcs-verb data-lcs-col data-lcs-form data-lcs-frame`, F4 `data-lcs-cands data-lcs-paradigm`, F5 `data-lcs-inf`. Rules: (1) gap cells print NO text; printed cells print exactly `form`; every row has a printed anchor; (2) no gap form equals any printed text in its row (poison: en past `read` -> FAIL); (3) F1: right column = the verb's distinct forms, each once, shuffled, count = chip count (poison: es `ustedes` + `ellos` -> FAIL); (4) F2: `{form}` rendered as ONE dashed box, no slot residue, bracket chip === infinitive; (5) F4: exactly one candidate === `form`, all in `paradigm`, no duplicates; (6) F5: `form` occurs exactly once as a token, answer box empty, `inf` = the bank infinitive; (7) `img.naturalWidth > 0`, distinct verbs per page, counts per `d`. **The panel table is the truth:** the node validator asserts every stamped form === `bank.verbs[inf].forms[col]`; verify() never inflects.

**Refusals per locale (d2).** F0: en `read` never gapped in the past column; fr 3e groupe (7/28) excluded at CE1, pictured -er = 3 = the page minimum, the panel adds unpictured -er rows; de zuhören + backen excluded (28 remain); fi `noGradation` pool 12 + juosta, pictured gradation-free = juosta tanssia laulaa maalata = 4. F1 person: distinct forms per verb = de 5 · fr -er 5 (je = il) · it 6 · es 5 (él = usted, ellos = ustedes: list one) · pt 4 (eu · ele = você · nós · eles = vocês) · fi 6 · **nl 3** (loop · loopt · lopen): nl ships 3 pronouns x 3 verbs = 9 lines (>= G2 floor 8) or the panel refuses; en sv da no REFUSED as a person face, rebuilt as tense. F3, F4, F5: 11. F2 pictured rows: en 5 >= 4 ✓, others 6-8.

**Fan + query face.** Lever = `verbGroup` (fr -ir/-re CE2; it -ere/-ire; es/pt -er/-ir) and `tense` (de Präteritum Kl.3; es/pt pretérito 3º; nl verleden tijd groep 5; fi none in band). Query faces: F0 the bare head · F1 "Pronomen zuordnen / relie le pronom" · F2 "Sätze ergänzen / complète les phrases" · F3 the A-tier fr/it head "être et avoir au présent", "essere e avere", de "sein und haben" · F4 "entoure la bonne forme / elige la forma correcta" · F5 "persoonsvorm en hele werkwoord / Grundform finden / trouve l'infinitif". F3, not F0, owns the strongest fr/it demand.

**Rejected non-moves.** Verb-ending SORT (-er/-ir/-re bins): honest in fr it es pt (+ en regular/irregular past) = 5 < 7; nl all -en, de/fi/Nordic verb groups are not primary content. Form -> pronoun (write the pronoun): F1 by direction only. Imperative: no picture cues it, G3+ in de/fr/it. Theme swap of the picture cue. Dropping the infinitive chip (a d3 scaffold, not a face).

## C. NATIVE REBUILD x11

| loc | persons | tenses in band | regular paradigm | irregular core (F3) | >= 12 verbs the panel authors with full forms | pic | refusal rule | traps |
|---|---|---|---|---|---|---|---|---|
| en | I you he/she/it we they (grid: 2 cols) | present, past | -s / -ed (-es, -ies, e-drop, doubling) | be have do go + run read sing eat sleep swim sit draw | run jump play hop climb laugh wash push pull dance shout listen | 5 | `read` never gapped (past); d2 `pool:'all'` | does/goes; F5 noun homographs (dance play jump) flagged in bank |
| de | ich du er/sie/es wir ihr sie (Plural) | Präsens (Präteritum G3 fan) | -e -st -t -en -t -en; ich sammle; du sitzt | sein haben (+ werden d3) | springen singen tanzen malen wandern spielen hüpfen lachen bauen rufen suchen trinken | 8 | zuhören, backen excluded; Vokalwechsel d3/F3 only | verbs lowercase, names capital; `sie` she/they: frames use "Emma" vs "Emma und Ben", never bare sie |
| es | yo tú él/ella nosotros ustedes ellos/ellas | presente (pretérito/futuro G3 fan) | -ar -er -ir | ser estar tener ir | correr saltar comer cantar leer nadar beber escribir pintar dibujar lavar bailar | 7 | 6 irregulars d3 only; ustedes never vosotros | recojo spelling; F1 lists one of él/usted, one of ellos/ustedes |
| pt | eu você ele/ela nós vocês eles/elas | presente (pretérito 3º fan) | -ar -er -ir | ser estar ter ir | correr pular comer cantar nadar brincar sentar andar desenhar lavar dançar escrever | 6 | ler rir sorrir dormir construir d3 only; você, no tu | você = ele form, vocês = eles form (F1 lists 4) |
| fr | je tu il/elle nous vous ils/elles | présent (futur/passé composé = CE2, no fan) | 1er groupe -e -es -e -ons -ez -ent | être avoir (+ aller d3) | sauter chanter danser jouer marcher grimper dessiner laver pousser tirer attraper écouter | 6 (-er 3) | 3e groupe + se cacher excluded | je = il spelling; -eons/-çons rows d3; F1 lists je OR il |
| it | io tu lui/lei noi voi loro | presente | -are -ere -ire (+ -isc) | essere avere (+ andare fare classe terza) | correre saltare cantare nuotare giocare leggere scrivere camminare disegnare lavare ballare ascoltare | 6 | bere raccogliere costruire d3 only | mangi / giochi / lanci spelling rows d3 |
| nl | ik jij hij/zij wij jullie zij | tegenwoordige tijd (verleden tijd groep 5 fan) | stam · stam+t · hele werkwoord | zijn hebben | rennen lezen springen dansen zingen bakken wandelen eten slapen spelen zwemmen zitten | 7 | F1 3 pronouns or refuse | stem spelling (loop, lees); inversion "loop jij" in frames only; d/t-spelling is groep 6, never here |
| sv | none (nu · i går) | presens, preteritum | -ar/-ade · -er/-de,-te · -r/-dde | vara var · ha hade · gå gick · få fick · se såg · springa sprang · sjunga sjöng · äta åt | hoppa dansa baka vandra läsa leka rita kasta simma klättra ropa lyssna | 7 | person faces REFUSED; F1 = infinitiv -> preteritum | bära bar (short) |
| da | none (nutid · datid) | nutid, datid | -r / -ede, -te | være var · have havde · gå gik · få fik · se så · løbe løb · synge sang · drikke drak | hoppe danse bage vandre læse lege tegne kaste svømme klatre råbe lytte | 7 | person faces REFUSED; F1 = navneform -> datid | verbs are not from the phonics pool: no policy_managed issue |
| no | none (nå · i går) | presens, preteritum | -r / -et, -te, -de | være var · ha hadde · gå gikk · få fikk · se så · løpe løp · synge sang · fly fløy · le lo | hoppe danse bake vandre lese leke tegne kaste svømme klatre rope lytte | 7 | person faces REFUSED; F1 = infinitiv -> preteritum | hoppet/hoppa both valid: the panel fixes ONE (Bokmålsordboka) |
| fi | minä sinä hän me te he | preesens only | -n -t -ø -mme -tte -vat/-vät by type | olla + tulla mennä tehdä nähdä | juosta tanssia laulaa maalata istua nauraa syödä juoda pestä kävellä kerätä kuiskata | 7 | gradation verbs (17) d3 only; type labels never printed | lukea > luen, hyppiä > hypin; hän genderless; frames carry the inflected object literally; `[NSR-FLAG][fi]` |

Panels author `columns`, `matchPersons`, >= 12 regular verbs + the core with EVERY form, `pic` from the verified list, >= 10 frames, six titles + instructions (<= 150, one imperative), skill sentence, slug + name. The EN source is handed over as a SOURCE TO AUDIT.

## D. DATA + GATES

`data/b3/verbs.js` (GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`; `data/` gitignored, force-add):
```
VERB_FORMS[loc] = { head, strand:'Language', matchAxis:'person'|'tense',
  columns:[{key:'ich', label:'ich', kind:'person'}, ...] | [{key:'pres', label:'nu'}, {key:'past', label:'i går'}],
  matchPersons:['ich','du','er','ihr'],                       // F1 subset with DISTINCT forms
  verbs:[{ inf:'laufen', group:'stark', irregular:false, gradation:false, tier:1,
           pic:{theme:'activities', noun:'running'} | null, forms:{ich:'laufe', du:'läufst', ...} }],
  irregularCore:[{ inf:'sein', ... }],
  frames:[{ id:'f1', text:'Jeden Sonntag {form} Emma im Park.', col:'er', tense:'pres',
            fits:['laufen','lesen','singen','tanzen'], subjectLiteral:'Emma' }],
  hunt:{ nounHomographs:['Tanz','Spiel'] },
  strings:{'G2-317':{title,instruction}, F1..F5:{...}} }
```
**Validator (`tools/validate-b3-draft.js`, verb-forms part; exit 1 on any):** (1) every verb and core verb has a non-empty `forms[col]` for EVERY column, `/^\p{L}+$/u` (no pronominal or particle forms); (2) `pic` in the ALLOWLIST `{activities: running reading jumping dancing hiking writing baking; occupations: singer artist athlete}` and the file exists, else "picture is an object"; (3) F1: over `matchPersons` the forms per verb are pairwise distinct; `tense`: past !== present !== infinitive; (4) a form equal to the infinitive is marked `anchorEqual` and never gapped; (5) frames: `{form}` exactly once, no other slot, `col` in `columns`, `fits` non-empty and known, `subjectLiteral` non-empty; de 3rd-person frames carry a NAME, never bare sie; (6) F4: every verb has >= 3 distinct forms; candidates only from the paradigm; (7) F5: every printed form maps to exactly one infinitive across `verbs` + `irregularCore`; no `nounHomographs` in the sentence; (8) floors: `regular` >= 6 (>= 3 pictured), `irregular` >= 2, frames >= 10 (>= 4 pictured fits), else the face is REFUSED for that locale (reported, never filled); (9) titles: worksheet-word guard, <= 70, unique in band; instruction <= 150; (10) `person` needs >= 3 `matchPersons`; sv/da/no must declare `tense`.

**`tools/gate-verb-forms-data.js`** (node, every locale x face x level): renders d2, re-derives every `data-lcs-form` from the bank (diff, not trust), verify() empty + `qa/lints.js` clean, non-vacuity (0 cells = FAIL). **Poison (each must FAIL; the correct draft is the control):** P1 de `backen` with `er:'bäckt'` and a second row `'backt'` -> "two forms for one cell"; P2 fr `courir` in the CE1 regular pool -> "3e groupe"; P3 es `matchPersons` with both `ustedes` and `ellos` -> "duplicate form cantan"; P4 en gapping past `read` -> "gap equals anchor"; P5 de frame `Sie {form} im Park.` -> "ambiguous person"; P6 F4 candidate `laufst` -> "not in paradigm"; P7 `pic:{activities, painting}` on `malen` -> "picture is an object"; P8 sv `matchAxis:'person'` -> "no person marking".

## E. SEO

| face | title pattern (Germanic / Romance / Nordic+fi) | meta MIDDLE (whole 120-170) | h1 / eyebrow / strand |
|---|---|---|---|
| F0 | `{head}`: `Personalformen der Verben` · `Conjugaison au présent : verbes en -er` · `Verb: presens och preteritum` · `Verbin persoonamuodot` | "Three verbs with a picture; write every missing form of the table from the infinitive" | title / level / Language row (da, no rows to add) |
| F1 | head + `Pronomen zuordnen` · `relie le pronom au verbe` · `une el pronombre` · `para ihop verb och preteritum` | "Draw a line from each pronoun (or infinitive) to the right verb form" | same |
| F2 | head + `Sätze ergänzen` · `complète les phrases` · `completa las oraciones` · `täydennä lauseet` | "Six picture sentences; the verb is in brackets, write its right form in the gap" | same |
| F3 | `sein und haben` · `être et avoir au présent` · `essere e avere` · `ser, estar y tener` · `zijn en hebben` · `olla-verbi` · `starka verb` · `Helper Verbs: be, have, do, go` | "The irregular verbs every child needs; fill the whole table" | same |
| F4 | head + `Choose the Right Form` · `die richtige Form` · `entoure la bonne forme` · `elige la forma` | "Three forms are printed; circle the one that fits the sentence" | same |
| F5 | `persoonsvorm en hele werkwoord` · `Grundform finden` · `trouve le verbe et son infinitif` · `Find the Verb, Write Its Base Form` | "Underline the verb in each sentence and write its base form" | same |

JSON-LD `LearningResource`, `educationalAlignment.targetName` = CCSS code (en) or framework NAME, no `targetUrl`. Hub coordinate `{type:'verb-forms', mode:'base'|'match'|'sentences'|'irregular'|'choose'|'infinitive', theme:'', level:<band key>}`; 6 landings per locale (nl 5 if F1 refused); `verify-hub-type-rows.js` must count refusals.

Non-cannibalisation (3-gram Jaccard *est.*; `scripts/seo-landing/gate.js` measures): F5 vs **G2-275** (isolated chips sorted by class, verbs never conjugated; here the CONJUGATED verb inside a sentence, infinitive written) 0.12 · F2 vs **G2-274** (capital + end mark, verb untouched) 0.10 · F2 vs **G1-249** (word order, the form given) 0.12 · F0 vs F3 (same grid; the F3 title names the verbs) 0.35, the highest pair · F1 vs F0 0.30 · F4 vs F2 0.30. F0 boundary sentence: "This page teaches the FORMS of one verb table: the infinitive is printed, the child writes the missing forms".

## F. OPEN QUESTIONS

1. nl F1: 3 pronouns (9 lines) or refuse? Panel data decision; the hub gate accepts 5 rows + a recorded refusal.
2. fr base at CE1 with 3 pictured -er verbs: unpictured rows (manger chanter jouer) accepted, or `pictured >= 2`?
3. de Präteritum (Kl.3): fan value or a second G3 landing?
4. en d2 `pool:'all'` (L.2.1.d) vs `regular` with irregulars only on F3: en panel.
5. no -et/-a preterite: the panel fixes one form per cell.
6. fi juosta (stem change) in the d2 pool: 3. lk convention, panel confirms.
7. `strand-names.ts` Language row lacks da + no: this wave or the locale fan?
8. `occupations/athlete` duplicates running: validator enforces distinct `pic` per page.
9. 8 rows x 96 px with a 64 px picture and an 18 px sentence in de/fi (30-40 % longer): engineer measures.
10. `gate-variation-distinct.js` is b2-bound (K-318 critic): must read `pool` + `verbsPerPage` for the F3 PARAM face.

**Summary.** `verb-forms` is a cross-theme, picture-cued forms grid whose column axis is data: persons in 8 locales, tenses in en/sv/da/no, so the Nordic person refusal and its tense rebuild are data decisions. Measured: 28-32 verbs per locale, 5-8 with a VERIFIED action picture (four obvious pictures were objects), irregulars 0-17 per target tense, all fenced to d3/F3. Six faces: fill the table, match pronoun-or-infinitive to form, picture gap sentences, the irregular core (PARAM), choose the printed form, find-the-verb-write-the-infinitive; verb-ending sort and the reverse match are rejected. The panel paradigm is the truth: the validator asserts completeness, F1 uniqueness, never-gap-an-anchor, unambiguous de sie, in-paradigm distractors and a 10-picture allowlist, poison-tested eight ways. Band G2 in 8 locales, G3 in pt sv fi.
