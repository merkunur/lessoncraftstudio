# K-380 `healthy-habits`: pedagogy + content design (2026-09-23)

Read: `_ROLE-PEDAGOGY`, `_STUDIO-BRIEF`, `_SUBSTRATE` (+ both DELTAs), `_PANEL-FINDINGS` (the LOCK row 2 + rulings 4-7), the `healthy-habits` sections of `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `_records/v2/harvest-candidates.<loc>.json` ×11 (the brushing / hand-washing re-probe), `../b5-designs/K-369-road-safety.md` + `_work/K-369-pedagogy.md` (format + the K-374 crossing-steps precedent), `primitives/road-pictogram.js` (full), `primitives/bin.js` (header), `data/b2/calendar.js`, `data/b3/all-about-me.js`, `frontend/lib/seo/strand-names.ts`, `scripts/seo-landing/gen-b2-landings.js LEVEL_KEYS`, `frontend/content/seo-landing/<loc>.json` (title collisions). (m) = measured read-only 2026-09-23 (node over `cache/manifest.json`, `lib/b2-common.js entriesFor`, `lib/b3-common.js bank('instructions')`, the landing corpus); (o) = picture OPENED this session on a contact sheet built from `cache/themes/<theme>/<noun>@3x.webp` (scratch `K-380-sheet{1,2}.png`); *est.* = engineer measures in a real render. No em-dashes.

**Boundary (load-bearing).** Nothing in the catalogue teaches hygiene or self-care routines (m: `apps['healthy-habits']` and `axes['exercise-type']['healthy-habits']` ABSENT; `data/science/` has no hygiene bank; the only contact is the all-about-me "I can brush my teeth" self-report card `data/b3/all-about-me.js:104/187`). Neighbours it must not echo: **K-203** healthy/not-healthy FOOD and **G1-207** food groups (no food, eating, plate, meal, breakfast, fruit or sweets on ANY face, picture, reason or title; no "healthy/unhealthy" pair word: de "gesund/ungesund", nl "gezond en ongezond", da "sund/usund", es "saludables" alone) · **human-body K-354 (+4)** (no body part is ever labelled, counted or named as an answer) · **five-senses K-355 (+5)** · **feelings K-319** · **all-about-me K-323 (+5)** (no "I can" self-report; the F5 chart records a WEEK of doing, not ability) · **K-212 wants/needs** · the whole **road-safety** family (K-369 + faces: streets, signs, crossing) and its **K-374 crossing steps** (F1 orders a HYGIENE routine; titles never reuse K-374's live tails, m: en "Crossing the Road Safely", de "Schritt für Schritt", nl "stap voor stap", sv/no "steg för/for steg", da "trin for trin", es "los pasos en orden", fr "les étapes") · **science-sequence G1-203** + **story-sequencing K-379** (never "sequencing / Reihenfolge / volgorde / sequência / séquentielles / järjestykseen" as a head). This family therefore owns **daily self-care ACTIONS and their reasons**: which tool goes with which habit, the hand-washing procedure, the tooth-brushing routine, the germ-stopping choice (cough and sneeze into the ELBOW or a tissue), WHY each habit keeps us healthy, and a week of doing them. Every habit is drawn as an ACTION by the NEW `primitives/habit-pictogram.js`; library pictures appear only as the OBJECT column of the base.

## A. Identity

| field | value |
|---|---|
| key / bands | `healthy-habits` / base **K-380 K**; F1 hand-washing **K** (`K-381+ TBD by the emitter`); F2 brushing teeth **G1**, F3 stop the germs **G1**, F5 weekly chart **G1** (`G1-400+ TBD`); F4 why **G2** (`G2-378+ TBD`). `default_subject: science` (LOCK), `default_age_range: 5-7`, `assetClass: geometry` (drawn pictograms carry every face; the base's object column is `icon-placement`-style library art, see D.1), `exerciseType: healthy-habits`. |
| taxonomy (m) | register `apps['healthy-habits']` + `axes['exercise-type']['healthy-habits']` ×11 (135 keys today, m). Theme slugs that must never be the head: `body_parts` (the only health-adjacent theme, m). Strand: the existing `'Science'` row (m, `strand-names.ts:74-86`) renders de Sachunterricht, es Conocimiento del Medio, fr Questionner le monde, it Scienze, pt Ciências, nl Oriëntatie op jezelf en de wereld, sv Naturorienterande ämnen, no Naturfag, fi Ympäristöoppi (all honest homes for hygiene) but **da "Natur/teknologi" misfiles it** (DK health sits in the obligatory topic "Sundheds- og seksualundervisning og familiekundskab"). Open item 1: add a `'Health'` row (proposed en Health · de Gesundheitserziehung · es Vida saludable · pt Ciências · fr Questionner le monde : la santé · it Educazione alla salute · nl Gezondheid · sv Hälsa · da Sundhedsundervisning · no Folkehelse og livsmestring · fi Terveys; panel confirms) or accept 'Science' with da re-targeted. |
| theme axis | **OFF** on all six faces: `themeAxis:{applicable:false}`, `coordinate.theme:''`. The base object column is a FIXED opened list (D.2), not a theme fan. |
| `unitAxis` | not applicable. |
| the one rule | **The action is the drawn pictogram, the answer is re-derived from the pictogram's stamped KIND through the bank's locale-neutral tables, never from a word, and every correct answer is current public-health advice in all 11 countries** (cough and sneeze into the elbow or a tissue; soap, not water only; brush every surface and spit; no quantity of any kind is printed: no seconds, no minutes, no hours of sleep, no times a day, no toothpaste amount, no glasses of water). |
| CCSS (en, honest) | **none** (no CCSS/NGSS health standard). en landing: "no Common Core standard; National Health Education Standards (practising health-enhancing behaviours), a K-2 health unit". |

| loc | genre head (panels) | school year (K / G1 / G2) | national strand (framework NAME) | CCSS |
|---|---|---|---|---|
| en (US) | **Healthy Habits** / **Personal Hygiene** / **Hand Washing** / **Brushing Teeth** (A-; "healthy habits worksheets for kindergarten", "hand washing steps for kindergarten", v2: "brushing teeth worksheet kindergarten", "4 steps in brushing teeth", "germ worksheets for elementary") | kindergarten / grade 1 / grade 2 | National Health Education Standards; state health standards | none |
| de | **Hygiene und Körperpflege** / **Zähne putzen** / **Hände waschen** (B+; "richtig zähne putzen klasse 1", "zähne putzen kai arbeitsblatt", "richtig hände waschen arbeitsblatt") | Vorschule / 1. Klasse / 2. Klasse | Lehrplan Sachunterricht (Perspektivrahmen: Gesundheit) | none |
| es (MX) | **Hábitos de higiene** / **Lavado de manos** / **Cepillado de dientes** (A; "hábitos de higiene para primer grado", "pasos lavado de manos preescolar", v2 "cepillado de dientes preescolar / pasos") | preescolar / primer grado / segundo grado | SEP/NEM: eje articulador Vida saludable | none |
| pt (BR) | **Hábitos de higiene** / **Higiene pessoal** / **Escovar os dentes** / **Lavar as mãos** (A-; "hábitos de higiene educação infantil", v2 "atividade escovar os dentes educação infantil", "atividade lavar as mãos 2 ano") | educação infantil / 1º ano / 2º ano | BNCC (Ciências, 1º ano: hábitos de higiene) | none |
| fr | **Hygiène corporelle** / **Hygiène dentaire** / **Lavage des mains** (A-; "hygiène corporelle cp / ce1", "comment se brosser les dents cp", "lavage des mains maternelle") | maternelle (GS) / CP / CE1 | programmes officiels: Questionner le monde (santé) | none |
| it | **Igiene personale** / **Lavarsi le mani** / **Lavarsi i denti** (B; "igiene personale classe prima", "lavarsi i denti scuola primaria") | infanzia / classe prima / classe seconda | Indicazioni nazionali: Scienze + educazione alla salute | none |
| nl | **Hygiëne en verzorging** / **Tanden poetsen** / **Handen wassen** (C+; "stappenplan handen wassen kleuters", "stappenplan tandenpoetsen kleuters", "tanden poetsen werkblad") | kleuters / groep 3 / groep 4 | SLO kerndoelen (kerndoel 34, gezondheid) | none |
| sv | **Hygien och goda vanor** / **Tvätta händerna** / **Borsta tänderna** (C+; "tvätta händerna bildstöd", "arbetsblad hygien") | förskoleklass / åk 1 / åk 2 | Lgr22 (NO, kropp och hälsa) [NSR] | none |
| da | **Hygiejne og gode vaner** / **Vaske hænder** / **Børste tænder** (C+; "hygiejne opgaver", "vaske hænder plakat børn") | børnehaveklasse / 1. klasse / 2. klasse | Fælles Mål: Sundheds- og seksualundervisning og familiekundskab [NSR] | none |
| no | **Hygiene og gode vaner** / **Vaske hender** / **Pusse tennene** (C+; "hygiene oppgaver", "vaske hender plakat barn") | 1. trinn / 2. trinn / 3. trinn | LK20: folkehelse og livsmestring [NSR] | none |
| fi | **Hygienia ja terveelliset elintavat** / **Käsienpesu** / **Hampaiden pesu** (C; "hygienia tehtäviä lapsille") | esikoulu / 1. luokka / 2. luokka | OPS 2014: ympäristöoppi [NSR] | none |

## B. The six faces

Shared: NEW `primitives/habit-pictogram.js` (content spec D.1) extending the `road-pictogram.js` language (flat `ink` silhouettes on a 100×100 unit box, no faces, white-headed back views where the head turns); drawn objects inside it: `soap` (bar), `towel`, `tap` (a wall tap with a stream), `basin`, `toothbrush`, `cup`, `tissue`, `sun` (disc + 8 rays), `moon` (crescent), `jaw` (tooth-arch diagrams, F2); the waste bin via `primitives/bin.js` (fill `'none'`, teal stroke, no colour: this is not the recycling page). NEW `templates/components-b6/healthy-habits.js` (exports prefixed `hh`). Reuse `.ws-match` (base, F4), `cardGrid` + `blankNumeralBox` (F1), `.sci-bin`-style word bins cloned (F2; never call `science-category-sort.build()`), `pillChoice`-free circling rows (F3), the calendar `dayAbbr` + `weekStart` from `data/b2/calendar.js` (F5, m: en/pt/es week starts Sunday `0`, de/fi `1`). Every stage stamps `data-ws-content`. **Pictograms never show dirt, disease, crying, a "bad kid" or a screen; the unhealthy twin on F3 is a neutral pose.** **Art sources: one per ROW SET** (ruling 4): every habit pictogram set is drawn; the base's OBJECT column is library art and is the only library set in the family (see F.1 for the all-drawn fallback).

### Base: Healthy Habits: What Do We Use? (K-380, K, PARAM ladder)
**Move:** MATCH a self-care action to the one object it needs (habit → tool), from the pose alone.
**Child:** "Draw a line from each child to the thing they need." (en 52)
**Page:** `.ws-match` 5 rows. Left: habit pictograms (≥ 88 px) drawn **with the tool hand EMPTY** (the pose + a cue mark carries the habit, so the match is reasoning, not identical-object matching). Right: library objects (≥ 72 px, K floor 56), deranged. Pool (all opened, D.2): `wash-hands` ↔ `around the house/faucet` (o) · `brush-teeth` ↔ `around the house/toothbrush` (o) · `sleep` ↔ `around the house/bed` (o) · `comb-hair` ↔ `around the house/comb` (o, orange comb) · `blow-nose` ↔ `hospital/tissue` (o, tissue box) · `sun-cream` ↔ `beach/sunscreen` (o, tube with a sun) · `drink-water` ↔ `kitchen tools/glass` (o, a plain tumbler) · `bath` ↔ `around the house/bathtub` (o).
**Params:** d1 `{pairs:4, habits:['wash-hands','brush-teeth','sleep','comb-hair']}` · **d2 (ships) `{pairs:5, habits:['wash-hands','brush-teeth','sleep','comb-hair','blow-nose']}`** · d3 `{pairs:6, habits:d2+['sun-cream'], cueMarks:false}` (no cue marks: pose only). Never together (validator): `toothbrush`+`toothpaste`, `faucet`+`bathtub`, `wash-hands`+`bath`, `drink-water`+`brush-teeth` (both a hand at the mouth).
**verify():** pictogram `data-lcs-habit`; object `data-lcs-tool=<theme>/<noun>`; the gate owns `TOOL_OF` (locale-neutral, bank) and asserts: every habit has exactly one object on the page with `TOOL_OF[habit]`, no object fits two habits, right column deranged (≤ 1 pair straight across), no `neverTogether` pair, **the empty-hand rule: no pictogram on the base contains a drawn tool glyph** (parsed from the svg: no `data-lcs-object` inside a base pictogram), no word printed under any picture.
**Refusals:** none (no nouns are printed; the vocab words never reach the page).
**Query face:** the bare genre head ("healthy habits worksheets for kindergarten", "Hygiene: Was brauche ich zur Körperpflege?", "hábitos de higiene preescolar", "hábitos de higiene educação infantil", "hygiène corporelle maternelle", "igiene personale infanzia", "hygiëne kleuters", "hygien arbetsblad", "hygiejne opgaver", "hygiene oppgaver", "hygienia tehtäviä lapsille").

### F1: Hand Washing Steps (K, `K-381+ TBD`, CODE `mode:'hand-washing-steps'`)
**Move:** ORDER the hand-washing procedure (one hygiene routine), writing 1 to 5.
**Child:** "How do we wash our hands? Write 1, 2, 3, 4, 5 under the pictures in order." (en 74)
**Steps (WHO + CDC agree on this order in every locale; no seconds, no tap-closing step, which the two authorities teach differently):** `wet` (hands under a tap stream, NO foam) → `soap` (a soap bar in the hands, no stream) → `rub` (hands together, ≥ 3 foam circles, no tap) → `rinse` (hands under the stream WITH foam circles falling) → `dry` (a towel between the hands). `wet` and `rinse` are told apart ONLY by the foam circles (gated).
**Params:** d1 `{cards:3, steps:['wet','soap','dry'], labelWords:false}` · **d2 (ships) `{cards:5, steps:['wet','soap','rub','rinse','dry'], shuffledOffBy:>=3}`** · d3 `{cards:5, steps:d2, writeWord:true}` (a panel verb literal under each box to copy; G1 writing, unpublished). Cards 3 + 2 rows, pictogram ≥ 120 px, `blankNumeralBox` ≥ 56 under each (the K-374 layout).
**verify():** cards `data-lcs-step`; answer = the index of the kind in `handSteps`; asserts printed order differs from the answer in ≥ 3 positions and is not the reverse, `wet` card has 0 foam circles and `rinse` ≥ 3 (parsed from the svg, `data-lcs-foam` circles), `rub` has no stream, no numeral printed in any card, no word on any card at d2.
**Refusals:** none.
**Query face:** "hand washing steps" ("hand washing steps for kindergarten", "richtig Hände waschen", "pasos del lavado de manos preescolar", "como lavar as mãos educação infantil", "comment se laver les mains maternelle", "come lavarsi le mani", "handen wassen stappenplan kleuters", "tvätta händerna bildstöd", "vaske hænder", "vaske hendene", "käsienpesu vaihe vaiheelta").

### F2: Brushing Teeth: Before, While and After (G1, `G1-400+ TBD`, CODE `mode:'brushing-teeth'`)
**Move:** place each part of the brushing routine in its PHASE (before / while / after brushing): the routine ordered at the level every authority agrees on, and **all three surfaces** of the teeth named as the "while" part.
**Child:** "When do you do it? Draw a line from each picture to before, while or after brushing." (en 86)
**Why phases and not 1-8:** the order of the three surfaces differs by country (de KAI Kauflächen-Außen-Innen is a German school method; NHS/Folktandvården teach "all surfaces", no order), so a single numbered answer would be false in 10 locales; the phase of every card is the same in all 11. A plain 1-5 order is F1's move (rejected, below).
**Cards (8, pictograms ≥ 96 px, 2 rows of 4 over 3 word bins):** before: `take-brush` (hand lifting a brush from a cup, up chevron) · `paste-on-brush` (a tube squeezing onto the bristles; no amount shown) | while: `chewing` (side view of 3 molars, bristles on TOP) · `outside` (tooth arch from above, brush OUTSIDE the arch) · `inside` (same arch, brush INSIDE) | after: `spit` (child leaning over a basin, 3 drops from the mouth) · `rinse-brush` (the brush under a tap stream, no mouth) · `brush-in-cup` (brush standing bristles-up in a cup, no hand). **Never drawn:** rinsing the mouth with water (NHS, Folktandvården, Tandlægeforeningen advise NOT rinsing; others do), wetting the brush first (contested), flossing, mouthwash, a clock/timer/sand-glass, food.
**Params:** d1 `{cards:6, bins:3, cards:['paste-on-brush','chewing','outside','inside','spit','rinse-brush']}` · **d2 (ships) `{cards:8, bins:3, perBin:>=2}`** · d3 `{cards:8, bins:3, kaiOrder:<locale flag>}` (only where the panel sets `kaiOrder:true`, de: the "while" bin becomes three numbered slots K-A-I; other locales d3 = d2).
**verify():** cards `data-lcs-card=<kind>`; bins `data-lcs-phase`; the gate owns `PHASE_OF` (bank) and asserts per bin ≥ 2, strip order is not grouped by phase (no 2 same-phase cards in 3 consecutive positions > 1 time), bin order = before/while/after left to right, `outside` and `inside` brush positions parsed from the svg lie outside / inside the arch polygon, no mouth-rinse card kind exists in the bank.
**Refusals:** none (fi `ennen / aikana / jälkeen` postpositions carry "harjaamisen", the panel writes the inflected label out).
**Query face:** "brushing teeth" ("brushing teeth worksheet grade 1", "Richtig Zähne putzen Klasse 1: KAI", "cepillado de dientes primer grado", "escovar os dentes 1º ano", "hygiène dentaire CP", "lavarsi i denti classe prima", "tanden poetsen groep 3", "borsta tänderna åk 1", "børste tænder", "pusse tennene", "hampaiden pesu").

### F3: Stop the Germs: Choose the Healthy Way (G1, `G1-401+ TBD`, CODE `mode:'stop-the-germs'`)
**Move:** CHOOSE between two behaviours the one that stops germs spreading (germ-spread reasoning).
**Child:** "In each row, circle the child who stops the germs." (en 50)
**Pairs (healthy / other; both drawn neutral, same child silhouette):** `cough` elbow / uncovered cough with a 5-dot spray arc · `tissue-bin` tissue dropped into a drawn bin / tissue on the ground line, child walking away · `nose` blows into a tissue / wipes the nose on a sleeve · `cup` two children each with their own cup / two children holding one cup · `soap` hands with foam under the tap / hands under the tap, no foam. **Never offered as a correct option:** coughing into the hand (outdated advice); **never offered at all:** masks (`hospital/mask` (o) surgical mask: culture- and period-dependent), staying home when ill (school policy differs), screens.
**Params:** d1 `{rows:4, pairs:['cough','tissue-bin','nose','soap']}` · **d2 (ships) `{rows:5, pairs:all5}`** · d3 `{rows:5, pairs:all5, caption:true}` (a panel caption under each pictogram, reading support).
**verify():** each option `data-lcs-behaviour` + `data-lcs-healthy=1|0`; the gate owns `HEALTHY` (bank) and asserts one healthy per row, **healthy side histogram over the shipped seed 2-3 or 3-2 and not alternating L-R-L-R-L** (nt10-D staircase lesson) and ≤ 60 % per side over 20 seeds, no cough-into-hand pose in the bank, the two options in a row share one silhouette scale (±5 %).
**Refusals:** none.
**Query face:** "germs" ("germ worksheets for kindergarten / elementary", "Keime / Niesen in die Armbeuge", "cómo evitar los gérmenes", "como evitar germes", "les microbes", "i germi", "hoesten en niezen in je elleboog", "nysa i armvecket", "nys i ærmet", "nys i albuen", "yski hihaan").

### F4: Healthy Habits: Why Do We Do Them? (G2, `G2-378+ TBD`, CODE `mode:'why-habits'`)
**Move:** READ a reason sentence and match it to the habit it explains (the WHY; pt BNCC "razões").
**Child:** "Draw a line from each healthy habit to the reason we do it." (en 59)
**Page:** `.ws-match` 5 rows: habit pictograms left (≥ 80 px, tool DRAWN here: the task is the reason, not the tool), reason pills right (Nunito 700 17 px, ≤ 2 lines at ~300 px, *est.*), deranged.
**Reason literals (EN SOURCE, 8; the panel rebuilds each natively; each contains NO word of its own habit's label and names a benefit, not the action):** `wash-hands` "Soap and water take germs off, so we do not get sick." · `brush-teeth` "It cleans away what makes holes in our teeth." · `sleep` "Our body and brain rest and get ready for a new day." · `move-body` "It makes our heart and muscles strong." · `cough-elbow` "Our germs stay in our sleeve, not on our friends." · `sun-cream` "Our skin does not get burnt by the sun." · `drink-water` "Our body needs it to work well and not get thirsty." · `blow-nose` "We can breathe through our nose again."
**Params:** d1 `{pairs:4, habits:['wash-hands','brush-teeth','sleep','move-body']}` · **d2 (ships) `{pairs:5, habits:['wash-hands','brush-teeth','sleep','move-body','cough-elbow']}`** · d3 `{pairs:6, habits:d2+['sun-cream']}`.
**verify():** pictogram and pill `data-lcs-habit`; asserts one-to-one, deranged (≤ 1 straight across), **no pill contains a label stem of its OWN habit** (the locale's `labels.<habit>` stems, case-folded, `(?<!\p{L})…(?!\p{L})`), no pill contains a number or digit, every pill ≤ 2 rendered lines.
**Refusals:** none expected; a locale whose reason cannot avoid its own habit's word re-targets that habit to `sun-cream`/`drink-water`/`blow-nose` (data).
**Query face:** "why" ("healthy habits reasons", "Warum putzen wir Zähne?", "¿por qué son importantes los hábitos de higiene?", "por que lavar as mãos", "pourquoi se laver ?", "perché lavarsi", "waarom handen wassen", "varför tvättar vi händerna", "hvorfor vasker vi hænder", "hvorfor vasker vi hendene", "miksi pestään kädet").

### F5: My Healthy Habits Chart for the Week (G1, `G1-402+ TBD`, CODE `mode:'habit-chart'`, OPEN)
**Move:** SELF-MONITOR five habits over a week (an open tracker, used all week; "healthy habits chart / checklist / tracker printable", "tabla de hábitos", "Wochenplan").
**Child:** "Every day, tick the box for each habit you did." (en 47)
**Page:** a table: habit column (pictogram ≥ 56 px + a short label literal) × 7 day columns headed by `calendar.<loc>.dayAbbr` in the locale's own `weekStart` order, tick boxes ≥ 44 px (G1 floor). Rows d2: `brush-teeth`, `wash-hands`, `move-body`, `drink-water`, `sleep`. No clock, no count, no target, no score, no smiley reward, no "good / bad" column.
**Params:** d1 `{rows:3, rows:['brush-teeth','wash-hands','sleep']}` · **d2 (ships) `{rows:5}`** · d3 `{rows:6, blankRow:true}` (a sixth row with an empty pictogram frame: "my own habit", draw it).
**verify():** open-ended: no answer verify. Layout verify: 7 day heads in `weekStart` order equal to the bank's `dayAbbr`, 35 tick boxes at d2, every box ≥ 44 px, no digit on the page.
**Refusals:** none.
**Query face:** "chart" ("healthy habits chart printable", "Hygiene-Wochenplan", "tabla de hábitos de higiene", "quadro de rotina de higiene", "tableau des habitudes d'hygiène", "tabella delle buone abitudini", "weekschema hygiëne", "veckoschema goda vanor", "ugeskema gode vaner", "ukeplan gode vaner", "viikkotaulukko terveelliset tavat").

**Rejected non-moves.** "moving or resting" sort (0 measured K-3 searches; replaced by brushing at the LOCK; its move survives as the F5 `move-body` row and the F4 reason) · a plain 1-5 brushing order (F1's move with a new routine; and a numbered surface order is false outside de) · "healthy or not?" circling of habits with a sad/bad twin (shaming; F3 carries the choice with a germ reason) · colour-the-habit (a colouring page, no teaching) · morning/evening routine ("ma journée / mi rutina": assigned to story-sequencing's narrative boundary, and bedtime clocks are quantities) · food, snacks, sweets, sugar (K-203/G1-207) · how long to wash / brush / sleep (authorities disagree: CDC 20 s vs WHO 40-60 s; "2×/day" vs BR "after every meal") · toothpaste amount (pea vs rice grain by age) · masks · screens · bath vs shower (culture) · word search / crossword of hygiene words (a spelling task).

## C. Native rebuild ×11

Per locale the panel authors: 6 titles + 6 instructions · **2-3 bin labels (F2 before / while / after)** · **5-8 habit labels** (F5 row labels + the F4 ban stems; short verb phrases, never a noun that agrees with a picture) · **8 reason literals** (F4) · 0-5 captions (F3 d3 only, unpublished) · `kaiOrder` flag (F2 d3). **0 noun forms, 0 `objForms`** (m: no printed word agrees with a picture noun on any face; the base prints no noun at all). Frames never inflect.

| loc | literals (counts) | slots / forms and where | refusal / re-target | traps |
|---|---|---|---|---|
| en | 12 + 3 + 8 + 8 | none | none | "good habits" is en-IN register (meta only, never the US title); "hygiene" alone ranks for products: compound it; "sequencing" never; K-374 tail "Crossing the Road Safely" |
| de | 12 + 3 + 8 + 8, `kaiOrder:true` | none | none | KAI spelt out once in the F2 landing (Kauflächen, Außenflächen, Innenflächen); never "Ernährung", "gesund/ungesund", "Reihenfolge", "Schritt für Schritt" (K-374); "schwimmen" irrelevant here; nouns capitalised in labels; `sink` vocab = "Spüle" (kitchen, m): never used |
| es (MX) | 12 + 3 + 8 + 8 | none | none | MX "lavado de manos", "cepillado de dientes", "lavarse los dientes"; "saludables" alone reads FOOD; "gérmenes"; "los pasos en orden" is K-374's live title (m); "ficha" never in a title; `sink`="Fregadero" (kitchen) never used |
| pt (BR) | 12 + 3 + 8 + 8 | none | none | "escovar os dentes", "lavar as mãos", "germes"; "corpo" never in a title (human-body); BR teaches brushing after every meal: no frequency printed anywhere; "atividade" never in a title |
| fr | 12 + 3 + 8 + 8 | none | none | "hygiène" never bare (adult / professional tail); "propreté" = toilet training, never; "microbes"; "les étapes" is K-374's live tail (m); "corps" never (human-body), "corporelle" fine; "tousser dans son coude" |
| it | 12 + 3 + 8 + 8 | none | none | "igiene personale" is also a care-work head (OSS): always with classe/scuola; "educazione alla salute" includes food: landing body only; "germi"; "scheda" never in a title |
| nl | 12 + 3 + 8 + 8 | none | none | **"gezonde gewoontes" is adult lifestyle: never a title, rail or chart word**; "gezond en ongezond" is K-203's title; "stappenplan" belongs to F1 only; "stap voor stap" is K-374 (m); "tanden poetsen" (verb phrase) in titles; "bacillen / bacteriën" panel |
| sv | 12 + 3 + 8 + 8 | none | none | "steg för steg" is K-374's live title (m): F1 uses "bildstöd"; "nysa och hosta i armvecket"; definite forms written out; `\b` ASCII-only in any sv lint; "Kroppens delar" (human-body) never |
| da | 12 + 3 + 8 + 8 | none | none | "trin for trin" is K-374 (m); "sund" is the food word here (K-203 "Sund og usund mad"); "nys i ærmet" (sleeve) vs "albuen": panel picks the school phrase; vocab `tissue`="Lommetørklæde" is a cloth hanky, never printed (no nouns printed) |
| no | 12 + 3 + 8 + 8 | none | none | "steg for steg" is K-374 (m); never "helse" or "mat og helse" (a school subject about food); "nys i albuen"; bokmål |
| fi | 12 + 3 + 8 + 8 | bin labels and reasons written out inflected ("ennen harjaamista", "harjaamisen aikana", "harjaamisen jälkeen"); no nominative token dropped into a sentence | none | never "terveystieto" (yläkoulu subject); "tavat" alone = manners: "terveelliset tavat / elintavat"; "pöpöt / bakteerit" panel; "yskiä hihaan" |

## D. Data + gates

### D.1 `primitives/habit-pictogram.js` (NEW; content spec, the design agents own the geometry)
`habitPictogram({kind, px, toolHand:'empty'|'drawn', cue:true})` → `{svg, meta}`; stamps `data-lcs-pictogram="habit" data-lcs-kind=<kind>`; every drawn object inside is a `<g data-lcs-object=<name>>`; foam circles `data-lcs-foam`; stream `data-lcs-stream`; spray dots `data-lcs-spray`. Reuses `road-pictogram.js` `STANDING_BODY` / walk parts and head conventions (white head with ink hair cap for back and 3/4 views). Kinds and their required cues (the gate checks each cue by svg parsing, never by `meta`):

| kind | pose | required cue | forbidden |
|---|---|---|---|
| wash-hands | front, forearms forward, hands together at the waist | 3 falling drops | tap, soap (base, `toolHand:'empty'`) |
| brush-teeth | side, elbow out, fist at the mouth | none | toothbrush on the base; food |
| sleep | lying flat on a line | crescent moon above | bed, pillow, clock, "Zzz" letters |
| comb-hair | front, one hand on top of the head | 3 short strokes on the hair | comb on the base |
| blow-nose | front, both hands cupped at the nose | none | tissue on the base |
| sun-cream | front, one hand rubbing the other forearm | sun disc + 8 rays | tube on the base |
| drink-water | side, head tilted back, hand at the mouth | glass (F4/F5 only) | cup with a hot drink |
| move-body | running (walk parts, wider stride, both feet off the line) | 2 motion lines | ball, sport kit |
| bath | seated, water line at the waist | 3 bubbles | tub on the base |
| cough-elbow / cough-open | side, face in the elbow crook / head forward | open: 5-dot spray arc | hand over the mouth (both) |
| sneeze-elbow | reserved, not on a d2 page | | |
| tissue-in-bin / tissue-on-floor | dropping a drawn tissue into `bin.js` / tissue on the ground line, child walking away | bin (fill `none`) | recycling colours |
| nose-tissue / nose-sleeve | tissue at the nose / nose on the forearm | | |
| own-cup / shared-cup | two children, one cup each / one cup held by both | | |
| hands-soap / hands-water-only | hands under a tap stream with ≥ 3 foam / 0 foam | stream | |
| step `wet` `soap` `rub` `rinse` `dry` | F1 close-ups of two hands | wet: stream, 0 foam · rinse: stream + ≥ 3 foam · rub: ≥ 3 foam, no stream · soap: soap bar · dry: towel | a clock, a number |
| card `take-brush` `paste-on-brush` `chewing` `outside` `inside` `spit` `rinse-brush` `brush-in-cup` | F2 close-ups | chewing: molar side view, bristles on top · outside/inside: U arch of 10 teeth from above, brush centre outside/inside the arch polygon | a mouth-rinse glass, a timer |

Min sizes: 88 px (base K), 120 px (F1), 96 px (F2), 100 px (F3), 80 px (F4), 56 px (F5 row head). Ships with `qa/verify-b6-habit-pictogram.js` (render-measuring, the `verify-b5-road-pictogram.js` pattern).

### D.2 Bank `data/b6/healthy-habits.js` + `data/b6/locales/healthy-habits.<loc>.json` via `lib/b6-common.js bank('healthy-habits', loc)`
```js
// data/b6/healthy-habits.js (locale-neutral)
module.exports = {
  habits: ['wash-hands','brush-teeth','sleep','comb-hair','blow-nose','sun-cream','drink-water','move-body','bath','cough-elbow'],
  TOOL_OF: {                                   // base object column; every picture OPENED 2026-09-23
    'wash-hands':  { theme:'around the house', noun:'faucet',     picOpened:true },
    'brush-teeth': { theme:'around the house', noun:'toothbrush', picOpened:true },
    'sleep':       { theme:'around the house', noun:'bed',        picOpened:true },
    'comb-hair':   { theme:'around the house', noun:'comb',       picOpened:true },
    'blow-nose':   { theme:'hospital',         noun:'tissue',     picOpened:true },
    'sun-cream':   { theme:'beach',            noun:'sunscreen',  picOpened:true },
    'drink-water': { theme:'kitchen tools',    noun:'glass',      picOpened:true },
    'bath':        { theme:'around the house', noun:'bathtub',    picOpened:true },
  },
  REJECTED_PICTURES: {                          // opened and refused, with the reason
    'around the house/glass':'a WINE glass', 'hospital/bed':'a hospital bed',
    'around the house/cup':'hot drink', 'kitchen tools/cup':'hot drink',
    'around the house/shampoo':'pump bottle reads as liquid soap, word is shampoo',
    'around the house/sink':'bathroom basin, but de/es/fr/nl/sv/da/no vocab = KITCHEN sink',
    'hospital/mask':'surgical mask (excluded topic)', 'around the house/brush':'paint brush',
    'around the house/toothpaste':'never with the toothbrush', 'beach/sun_hat':'no vocab key',
    'At the Supermarket/water':'plastic bottle', 'camping/water':'plastic bottle',
  },
  neverTogether: [['brush-teeth','drink-water'],['wash-hands','bath']],
  handSteps: ['wet','soap','rub','rinse','dry'],
  PHASE_OF: { 'take-brush':'before','paste-on-brush':'before','chewing':'while','outside':'while','inside':'while','spit':'after','rinse-brush':'after','brush-in-cup':'after' },
  kaiSlots: ['chewing','outside','inside'],
  germPairs: [ {key:'cough',healthy:'cough-elbow',other:'cough-open'}, {key:'tissue-bin',healthy:'tissue-in-bin',other:'tissue-on-floor'},
               {key:'nose',healthy:'nose-tissue',other:'nose-sleeve'}, {key:'cup',healthy:'own-cup',other:'shared-cup'},
               {key:'soap',healthy:'hands-soap',other:'hands-water-only'} ],
  reasonHabits: ['wash-hands','brush-teeth','sleep','move-body','cough-elbow','sun-cream','drink-water','blow-nose'],
  chartRows: ['brush-teeth','wash-hands','move-body','drink-water','sleep'],
};
// data/b6/locales/healthy-habits.<loc>.json (panel-authored)
{ "strings": { "base":{title,instruction}, "hand-washing-steps":{…}, "brushing-teeth":{…}, "stop-the-germs":{…}, "why-habits":{…}, "habit-chart":{…} },
  "phases": { "before":"…", "while":"…", "after":"…" },
  "labels": { "wash-hands":"…", "brush-teeth":"…", "sleep":"…", "move-body":"…", "drink-water":"…", "cough-elbow":"…", "sun-cream":"…", "blow-nose":"…" },
  "labelStems": { "<habit>": ["…"] },          // F4 ban list, panel-authored (e.g. de brush-teeth ["putz","Zahn","Zähne"])
  "reasons": { "<habit>": "…" },
  "kaiOrder": false, "captions": {} }
```
Generated from `i18n/.draft-b6-<loc>.json` by `tools/apply-b6-locale.js` after `tools/validate-b6-draft.js` (both exist, m). ⚠ The strings live in the bank AND `i18n/strings.<loc>.json`: `tools/check-b6-string-parity.js` (exists, m) must be 0.

### D.3 Validator rules (`validate-b6-draft.js`, healthy-habits block)
1. every `TOOL_OF` entry has `picOpened:true`, resolves through `b3-picture-index` in the locale, and is not in `REJECTED_PICTURES`.
2. no item, label, reason, caption or title contains a FOOD word (per-locale ban list: food, eat, meal, breakfast, lunch, snack, sweet, sugar, fruit, vegetable + native equivalents; `(?<!\p{L})…(?!\p{L})`).
3. no digit and no number word 0-100 (`lib/number-words.js`) in any reason, label, caption, bin label or F2-F5 instruction; F1's instruction may contain exactly the numerals 1-5.
4. no quantity/time unit anywhere (seconds, minutes, hours, times a day, per day and native equivalents).
5. each reason contains none of its own habit's `labelStems`.
6. each reason's habit is unique: no reason contains the `labelStems` of ANOTHER habit on the same d2 page either (it would then fit two).
7. `phases` has exactly 3 non-empty literals, pairwise distinct.
8. `labels` covers every `chartRows` and `reasonHabits` key.
9. the cough rule: no literal anywhere pairs cough/sneeze with "hand" / "mouth with your hand" (native list), and the healthy cough label names the elbow or sleeve (or tissue).
10. titles ≤ 70, contain no worksheet word, no "free", unique across the six, and none equals a live title or a banned head (sequencing / Reihenfolge / Schritt für Schritt / stap voor stap / steg för steg / trin for trin / steg for steg / los pasos en orden / les étapes / gezonde gewoontes / Ernährung / ungesund / terveystieto / mat og helse / hygiène alone).
11. instruction ≤ 150 chars and names only apparatus on the page (lines, boxes, pictures, children, rows, days).

**Poison cases (each must FAIL; the correct draft is the control):** P1 `TOOL_OF['drink-water']` = `around the house/glass` (wine glass) · P2 base draft with `sink` for wash-hands · P3 en reason for brush-teeth "Brushing keeps teeth clean" (own stem) · P4 de reason "Nach dem Frühstück putzen wir …" (food + time) · P5 es wash-hands reason "Lávate 20 segundos" (number + unit) · P6 F3 draft with `cough-hand` marked healthy · P7 nl title "Gezonde gewoontes voor kleuters" · P8 sv F1 title "Tvätta händerna steg för steg" (K-374 collision) · P9 fr F2 phases with "après" twice · P10 fi reason with a bare nominative token slot ("{habit} auttaa") left unfilled · P11 pt chart label "escovar os dentes 3 vezes" · P12 da title "Sunde vaner og sund mad".

### D.4 `qa/verify-b6-healthy-habits.js` (on the RENDER, all 11 locales)
Floors per face (base 88/72, F1 120 + boxes 56, F2 96 + bins, F3 100, F4 80 + pill text ≥ 16 px, F5 boxes ≥ 44); body ≤ 722 (fi 677 with a four-line title); no text < 9 px; palette tokens only (bin fill `none`); every closed answer re-derived from `data-lcs-*` + the bank tables (never from text); no answer printed (no numeral on F1 cards, no tick on F5, no phase word on F2 cards); position tells: F1 printed order off by ≥ 3 and not reversed; F2 no phase run; F3 healthy side 2-3/3-2, not alternating, ≤ 60 % per side over 20 seeds; base and F4 derangement ≤ 1 straight across over the shipped seed AND 20 seeds; base empty-hand rule; F2 brush-inside/outside geometry; F5 day heads in `weekStart` order.

## E. SEO

| face | title pattern (Germanic en / de / nl · Romance es / pt / fr / it · Nordic sv / da / no + fi; panels rewrite, ≤ 70) | meta MIDDLE (en; the child's instruction; whole 120-170 measured by `tools/measure-instruction-window.js`) | coordinate |
|---|---|---|---|
| base | Healthy Habits: What Do We Use? · Hygiene: Was brauche ich zur Körperpflege? · Hygiëne: wat gebruik je om je te verzorgen? · Hábitos de higiene: ¿qué uso para cada uno? · Hábitos de higiene: para que serve? · L'hygiène corporelle : à quoi ça sert ? · Igiene personale: a che cosa serve? · Hygien: vad använder vi? · Hygiejne: hvad bruger vi? · Hygiene: hva bruker vi? · Hygienia: mitä tarvitsemme? | Draw a line from each child to the thing they need to wash, brush, comb, blow their nose or sleep | `{type:'healthy-habits', mode:'base', theme:'', level:<K>}` |
| F1 | Hand Washing Steps · Richtig Hände waschen: die Schritte · Handen wassen: het stappenplan · Pasos del lavado de manos · Como lavar as mãos: os passos · Comment se laver les mains · Come lavarsi le mani: le fasi · Tvätta händerna: bildstöd · Vask hænder: sådan gør du · Vask hendene: slik gjør du · Käsienpesu vaihe vaiheelta | Number five pictures to show how we wash our hands: wet, soap, rub, rinse and dry | `mode:'hand-washing-steps'`, K |
| F2 | Brushing Teeth: Before, While and After · Richtig Zähne putzen: vorher, dabei, danach · Tanden poetsen: voor, tijdens en na · Cepillado de dientes: antes, durante y después · Escovar os dentes: antes, durante e depois · Hygiène dentaire : avant, pendant, après · Lavarsi i denti: prima, durante e dopo · Borsta tänderna: före, under och efter · Børste tænder: før, under og efter · Pusse tennene: før, under og etter · Hampaiden pesu: ennen, aikana ja jälkeen | Draw a line from each picture to before, while or after brushing, and brush every side of the teeth | `mode:'brushing-teeth'`, G1 |
| F3 | Stop the Germs: Choose the Healthy Way · Keine Chance für Keime: in die Armbeuge niesen · Stop de bacillen: hoest in je elleboog · Alto a los gérmenes: elige la forma sana · Como evitar germes: escolha o jeito certo · Stop aux microbes : je tousse dans mon coude · Stop ai germi: scegli il gesto giusto · Nysa och hosta i armvecket · Nys i ærmet: stop bakterierne · Nys i albuen: stopp bakteriene · Yski hihaan: pysäytä pöpöt | In each row circle the child who stops the germs, like coughing into the elbow or using a tissue | `mode:'stop-the-germs'`, G1 |
| F4 | Healthy Habits: Why Do We Do Them? · Hygiene: Warum machen wir das? · Hygiëne: waarom doen we dat? · Hábitos de higiene: ¿por qué los hacemos? · Hábitos de higiene: por que são importantes? · L'hygiène corporelle : pourquoi ? · Le regole dell'igiene: perché? · Goda vanor: varför gör vi så? · Gode vaner: hvorfor gør vi det? · Gode vaner: hvorfor gjør vi det? · Terveelliset tavat: miksi teemme niin? | Draw a line from each healthy habit to the sentence that tells why we do it | `mode:'why-habits'`, G2 |
| F5 | Healthy Habits Chart for the Week · Hygiene-Wochenplan zum Abhaken · Weekschema hygiëne en verzorging · Tabla semanal de hábitos de higiene · Quadro semanal de hábitos de higiene · Tableau de la semaine : mes habitudes d'hygiène · Tabella settimanale delle buone abitudini · Veckoschema för goda vanor · Ugeskema med gode vaner · Ukeplan med gode vaner · Viikkotaulukko: terveelliset tavat | Every day tick the box for each healthy habit you did: brush, wash your hands, move, drink water and sleep | `mode:'habit-chart'`, G1 |

Level keys from `LEVEL_KEYS` (m): K `kindergarten|vorschule|preescolar|educacao-infantil|maternelle|infanzia|kleuters|forskola|boernehaveklasse|1-trinn|esikoulu`, G1/G2 likewise. `coordinate.theme:''` everywhere. No `educationalAlignment` (no code). Non-EN prose names the framework NAME only. No title, meta or landing promises an answer key; no visible "free". Every landing carries the truth line: "Everything on this page follows the hand-washing and tooth-brushing advice of health authorities; the page shows no times or amounts, because those differ between countries." Boundary sentence: "Healthy food is on the Healthy Food page; body parts on The Human Body page."

**Non-cannibalisation** (whole-landing 3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL ≥ 0.80 / WARN 0.65; *est.*):

| pair | differs by | est. |
|---|---|---|
| base vs F4 | the tool / draw a line to the object vs the reason / read a sentence | 0.22 |
| F1 vs F2 | hands, write numbers 1-5 vs teeth, before / while / after, all sides | 0.14 |
| F3 vs F4 | circle one of two, germs, elbow vs match a reason | 0.12 |
| F5 vs any face | a week, tick boxes, days | ≤ 0.08 |
| F1 vs K-374 crossing steps | hands, soap, towel vs road, look left / right | 0.07 |
| any face vs K-203 healthy food | no food word | 0.04 |
| any face vs human-body K-354 | no body-part labelling | 0.05 |
| F5 vs all-about-me K-323 | a week of doing vs "I can" | 0.05 |
| F2 vs story-sequencing K-379 | phases of a routine vs a story | 0.04 |

## F. Open questions + summary

**Engineer must measure:** (1) the pictogram cue legibility at the floors in a real render (wet vs rinse foam at 120 px; outside vs inside brush at 96 px; cough-elbow vs cough-open at 100 px) and print in greyscale; (2) F2 strip 2×4 cards + 3 bins inside 722 (fi 677) *est.* ≈ 2×(96+40) + 26 + 185 = 483 px; (3) F4 reason pills ≤ 2 lines in de/fi at 17 px; (4) F5 table 150 + 7×64 = 598 ≤ 639 *est.*; (5) the base's two-source page (drawn left column, library right column) against ruling 4 as the critic reads it: if the critic rules a PAGE must be one source, the fallback is the object column drawn by the same primitive (`toothbrush`, `bed`, `comb`, `tissue`, `tap`, `sunTube`) and the library list is dropped entirely; (6) `lib/b6-common.js bank()` path + the `'Health'` strand row decision (A).

**Only a native panel can rule:** each locale's school phrasing for the cough rule (sleeve / elbow / tissue: da "ærmet" vs "albuen"); the germ word (Keime, gérmenes, germes, microbes, germi, bacillen, bakterier, pöpöt); the F2 phase labels as natural K-3 words in fi (inflected); whether de sets `kaiOrder:true` (default yes) and any other locale has a school surface order (default no: never invent one); every reason literal's truth and uniqueness; es-MX "lavarse" vs "cepillarse los dientes"; the Nordic rail names (sv "Hygien och goda vanor", da "Hygiejne og gode vaner", no "Hygiene og gode vaner", fi "Hygienia ja terveelliset elintavat").

**Hub expectation:** 6 rows × 11 = **66**, no refusal at design time.

**Summary.** Six faces, six distinct moves: match habit to tool from an empty-handed pose (K) · order the five WHO/CDC hand-washing steps (K) · sort the brushing routine into before / while / after with all three tooth surfaces (G1; the only order that is true in all 11 countries, de KAI as a d3 flag) · choose the germ-stopping behaviour, elbow never hand (G1) · match habit to a reason sentence that never names its habit (G2) · an open week tracker (G1). No food, no body-part labelling, no numbers or quantities, no shaming; every correct answer is current public-health advice everywhere; 8 library pictures opened and kept, 12 opened and refused (wine glass, hospital bed, kitchen-sink wording, hot-drink cups, shampoo-as-soap, surgical mask).
