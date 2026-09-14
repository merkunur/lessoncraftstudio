# G2-318 `animal-fact-file` : pedagogy + content pass (2026-09-14)

Read in the contract order (brief, substrate, README rulings + open items, panel findings §12 + §17, G1-308, G2-317, G2-278/299/300, G2-254, K-235, `science-category-sort.js`, the 7 animal banks, `b2-common.js`, `components-b2.js`, `page.css`). (m) = measured by node this pass (scratch `g2318-measure.js`, read-only); *est.* = the engineer measures. Pictures OPENED and correct: `animals/fish`, `animals/turtle`, `forest creatures/hedgehog`, `zoo animals/lion` (every fanned picture is opened in the build, sv #35 rule).

**Boundary (load-bearing).** A TEMPLATE ABOUT ONE ANIMAL: picture + name + six labelled fact fields + a sentence lane + a draw box. G2-278/299/300 write a STORY about a composed scene (starters `One day, / Then`, m); the science sorts (G1-201/202/205/206, K-204/206/209) draw lines from MANY pictures to WORD bins; K-323 is about the CHILD; G2-254 is passage + MC questions; the `atlas-fact-files` ACTIVITY (RI.K.1, m) finds a key detail. None prints a per-animal fact file.

## A. Identity

| field | value |
|---|---|
| id / key / band | `G2-318` / `animal-fact-file` / **G2 in all 11** (faces `G2-320+ TBD by the emitter`). Level keys (`gen-b2var-landings.js:112-124`, m): grade-2 · 2-klasse · segundo-grado · 2o-ano · ce1 · classe-seconda · groep-4 · ak-2 · 2-klasse · 3-trinn · 2-luokka. No locale lifts to G3: Steckbrief Kl. 2 (Sachunterricht), fiche documentaire cycle 2, werkstuk groep 4, faktatext åk 1-3 (Lgr22 states it once for the band), tietoteksti 2. lk, BNCC 2º ano (gêneros: ficha), SEP 2º (fichas informativas). |
| subject (hub disc) | **`science`**, `default_age_range:'7-9'`. The disc is discovery-side (§16.4.1): teachers file this under Sachunterricht / QLM le vivant / wereldoriëntatie / NO / ympäristöoppi / Scienze / ciencias naturales, and three faces are graded from a science fact table. `apps.science-*` are all `5-7` today (m), so this is the disc's first G2 row. `letters` rejected: it would sit beside `picture-writing` (G2-278) and cannibalise that rail. Key ABSENT from `topics-taxonomy.json` (m). |
| theme axis | ON: `{applicable:true, minNouns:4, excludeBw:true}` over the 11 animal themes; `minNouns` only guards the F5/F6 pools. |
| fan lever | **`unitAxis`** (README ruling) = the animal's vocabKey; `deckIdFor` appends `-u<animal>`; `{U}` = `animals[loc][key].title`. No unit configured = `bank[loc].exemplar` (recommend `hedgehog` x11: opened; the de A-head "Igel Steckbrief"; the panel may pick another). F5/F6 fan by THEME only (§B). |
| pool (m) | Distinct pictured animals across the 11 themes, deduped by vocabKey: **182-183 per locale**. With ANY fact in the 7 banks: **52**; with >= 1 / >= 2 / >= 3 of the five core facts (class covering diet habitat fly): **45 / 23 / 11** (locale-invariant). The 11: cat dog elephant fox fish horse owl rabbit turtle lion eagle. Only rabbit has all five; **no bank stores legs or swim**. Bank-vs-bank conflicts: 0. Per theme, animals at >= 3 core facts: animals 9 · farm 5 · pets 5 · forest 5 · zoo 3 · birds 2 · reptiles 1 · ocean 1 · insects 0 · dinosaurs 0. |
| CCSS (en only) | base **W.2.7** + W.2.2 · F2 teaches-only (science content, no code) · F3 **W.2.2** + L.2.2.d · F4 **W.2.2** + L.2.1.f · F5 W.2.2 (RI.2.9 not claimed) · F6 **RI.2.1**. Non-EN: framework NAME only. `'Writing'` row in `strand-names.ts:146` has **en de es pt only** (m): the other 7 panels add it. No science strand row exists (m). |

| loc | genre head (base title root) | ASCII slug | field labels (proposal; panel rewrites, <= 18 chars) |
|---|---|---|---|
| en | Animal Fact File ("animal report template" in meta) | `animal-fact-file` | Class · Lives · Eats · Legs · Covering · Can it fly? / swim? |
| de | Tiersteckbrief ("Steckbrief Tier Vorlage"; `{U}` = "Igel-Steckbrief") | `tiersteckbrief` | Klasse · Lebensraum · Nahrung · Beine · Körperbedeckung · Kann es fliegen? / schwimmen? |
| es (MX) | Ficha del animal ("fichas de animales para imprimir") | `ficha-del-animal` | Clase · Dónde vive · Qué come · Patas · Cubierta del cuerpo · ¿Vuela? / ¿Nada? |
| pt (BR) | Ficha técnica do animal | `ficha-tecnica-do-animal` | Classe · Onde vive · O que come · Patas · Cobertura do corpo · Voa? / Nada? |
| fr | Fiche documentaire : animaux ("fiche d'identité" in meta) | `fiche-documentaire-animaux` | Classe · Milieu de vie · Alimentation · Pattes · Peau · Il vole ? / Il nage ? |
| it | Carta d'identità dell'animale | `carta-d-identita-dell-animale` | Classe · Dove vive · Cosa mangia · Zampe · Rivestimento · Vola? / Nuota? |
| nl | Dierenpaspoort ("dierenkaart", "werkstuk groep 4" in meta) | `dierenpaspoort` | Soort · Leefgebied · Voedsel · Poten · Huid/vacht · Kan het vliegen? / zwemmen? |
| sv | Faktablad om djur ("faktatext" in meta) | `faktablad-om-djur` | Djurgrupp · Bor · Äter · Ben · Kroppen har · Kan flyga? / simma? |
| da | Faktaark om dyr | `faktaark-om-dyr` | Dyregruppe · Bor · Spiser · Ben · Kroppen har · Kan flyve? / svømme? |
| no | Faktaark om dyr | `faktaark-om-dyr` | Dyregruppe · Bor · Spiser · Bein · Kroppen har · Kan fly? / svømme? |
| fi | Tietoteksti eläimestä ("eläinfakta" in meta) | `tietoteksti-elaimesta` | Eläinryhmä · Elinympäristö · Ravinto · Jalat · Iho/turkki · Osaako lentää? / uida? |

## B. The six faces (base first)

**Skeleton** (`factFile`, NEW in `templates/components-b3.js`, file absent m). Body budget **722** (README ruling), inner 675. Picture card 230x230 (`.ws-icon` 190 >= G23 floor 36) beside a right column 431: name banner 431x56 (tealSoft; "Name:" Nunito 800 18 + `name` Baloo 2 700 30, `data-lcs-unit`) + field rows 1-3. Field row h 52, grid `150px 1fr`, label Nunito 800 18 teal; field 6 = two yes/no sub-rows h 40. Rows 4-6 full width, gap 8 = 172. Sentence lane = caption 22 + `rulingBlock({rows:2, w:643, h:56, glyphH:24})` (`components-b2.js:58`, m) = 140. `drawBox({w:675, h:minmax(120,1fr)})` (G1-308's NEW component, shared). Stack 230 + 12 + 172 + 12 + 140 + 12 + 120 = **698 <= 722**; a single-column stack is 878 and rejected. Items 9 (G23 window 8-16). Value-cell kinds: `write` = `.ws-blankbox` (`page.css:445`, m) 500x40 · `chips` = `pillChoice` (`components-b2.js:226`, m) 3 x `.ws-pill` 18 px · `printed` = literal Nunito 800 20 · `yesno` = two `.ws-pill`, fixed order.

| # | EN title (<= 70) | teaching move / what the child does | kind | d2 params (d1 / d3) | verify() | fan | refusal |
|---|---|---|---|---|---|---|---|
| F1 base `G2-318` | Animal Fact File | RECORD what you found out: writes six facts from a book or the class talk, one own sentence, draws the animal in its home | open: lints only | `{cell:'write', fields:6, lanes:2, box:120}` (d1 4 fields, 3 lanes / d3 + 7th field "Special", 3 lanes, box 100) | none; `data-lcs-fact-<field>` stamped where the table knows it (answer key only) | unit = animal | picture + `name` + `title` only. Dinosaurs (24 pictured, 0 facts, m) ship the base only |
| F2 | Animal Fact File: Tick the Facts | CHOOSE the true fact of three per row; legs = 3 numeral pills; fly/swim yes/no | **verifiable**, teaches-only | CODE `cell:'chips', choices:3` (d1 2 pills / d3 4 pills) | exactly one `data-lcs-correct` per row; pills from `choices[field]`; correct index takes all 3 positions over the page; numerals distinct | unit = animal | animal needs **7/7** reviewed facts |
| F3 | Animal Fact File with a Word Bank | WRITE each fact by copying the right word from a bank (spelling + selection: the Wortspeicher rung) | open; bank structure verified | CODE `cell:'write', bank:true, bankExtra:4` (d1 bank = the 6 truths / d3 one bank for 2 animals) | `wordBank` (`components-b2.js:210`) holds every true literal + `bankExtra` distractors from the choice sets; no duplicates; nothing else printed | unit = animal | 7/7 |
| F4 | Animal Fact File: Write Three Sentences | COMPOSE informative sentences (W.2.2): reads the compact printed file (6 chips), finishes 3 sentence frames on school lines, writes 1 free sentence | open; frames re-filled by the gate | CODE `cell:'printed', frames:3, free:1, box:0` (d1 2 frames / d3 0 frames, 4 free lines) | printed cells === table literals; 3 `[data-lcs-frame]` starters <= 22 chars, no end mark; a frame never prints its own target fact; no draw box | unit = animal | 7/7 + `def` (fi `ade`) |
| F5 | Compare Two Animals: Same and Different | COMPARE two printed half-width files; writes 2 "Same:" + 2 "Different:" lines | open; structural verify | CODE `mode:'compare'` (2 columns 330, pic 120, 6 printed rows h 40, 2 + 2 lanes h 50; d1 1 + 1 / d3 3 + 3, no pictures) | pair shares >= 2 and differs in >= 2 of 7 fields (`data-lcs-same/diff` re-derived); both 7/7; distinct | THEME (pair sampled by `rng`) | theme needs >= 2 animals at 7/7 with such a pair |
| F6 | Who Am I? Mystery Animal | INFER the animal (RI.2.1): reads 5 first-person clue lines, circles the one of 4 pictures they fit, writes its name | **verifiable** | CODE `mode:'mystery', puzzles:2, candidates:4, factsPrinted:5` (d1 1 puzzle, 3 candidates / d3 facts 4, candidates 5) | per candidate count contradictions vs the printed clues: exactly ONE at 0 = `data-lcs-answer`; every distractor contradicted by >= 1 clue; no captions; two puzzles, two answers; no `data-lcs-unit`; deck title names no animal | THEME | theme needs >= 4 animals at 7/7, pairwise distinct in >= 1 field |

PARAM vs CODE: every face is CODE (a value-cell kind or a page mode); the base is the default path (`cell:'write'`, `bank:false`, `mode:null`, `data-lcs-face` stamped only when declared) and stays byte-identical. `gate-variation-distinct.js` sees 5 distinct d2 configs; guards key on `cell` / `bank` / `frames` / `mode`, never the level index.

**Verifiable vs open.** F2 and F6 are graded from the fact table (the truth, §D). F1/F3/F4/F5 are open: the child's prose is never graded; only structure (bank ⇔ facts, frame stamps, pair distance) is. The base prints the NAME (the topic), never a fact; F4/F5/F6 PRINT facts by design (the input, not the answer).

**Refusal counts today (bank-only table, m):** F2/F3/F4 need 7/7 = **0 animals** (legs/swim unbanked); F5/F6 at the >= 3-core proxy: animals 9 · farm/pets/forest 5 · zoo 3 pass, birds 2 · ocean 1 · reptiles 1 · insects 0 · dinosaurs 0 refused. The panel-authored table (§D) is therefore a prerequisite for four of six faces.

**Rejected non-moves.** Theme swap (pets/farm/zoo sets = the wave axis) · fact chips sorted onto the animal (a science sort in disguise) · "all about me as an animal" (K-323) · baby-animal field (`baby-animals.json` = 6 pairs, m) · label the body parts (asset-blocked) · questions about the file (G2-254 + the atlas activity) · a habitat scene (G2-278 `sceneStage`) · base d1/d3 relabelled · per-animal F6 fan (prints the answer in the landing title).

## C. Native rebuild x11

Every printed string is a panel literal substituted by code, never inflected: 6 labels, `name` (banner), `title` (`{U}`), `def` (frame subject), choice literals with an `inFrame` form (article included), `legsFrames{0,2,4,6,8}`, `yesno`, F4 `frames[]`, F5 `same/diff`, F6 clue lines, six titles + instructions, skill sentence, slug + name. EN is a SOURCE TO AUDIT.

| loc | banner `name` / frame `def` | choice literals: class · covering · diet (`inFrame` form) | refusal | traps |
|---|---|---|---|---|
| en | Hedgehog / the hedgehog | mammal bird reptile fish insect amphibian · fur feathers scales spines shell smooth skin · plants meat both; `inFrame:'a mammal' / 'an insect'` | none | `a/an` is stored, never computed |
| de | Igel (`KEEP_CASE`) / der Igel (article from vocab gender, generated then `reviewed:true`) | Säugetier Vogel Reptil Fisch Insekt Amphibie · Fell Federn Schuppen Stacheln Panzer glatte Haut · Pflanzen Fleisch beides; `'ein Säugetier' / 'eine Amphibie'`; diet frame "frisst" | none | "Körperbedeckung" 15 chars fits; fly + swim are two sub-rows |
| es (MX) | Erizo / el erizo ("el águila"-class literal) | mamífero ave reptil pez insecto anfibio · pelo plumas escamas púas caparazón piel lisa · plantas carne ambos | none | MX register |
| pt (BR) | Ouriço / o ouriço | mamífero ave réptil peixe inseto anfíbio · pelos penas escamas espinhos casco pele lisa · plantas carne ambos | none | "ficha do animal" in meta only |
| fr | Hérisson / le hérisson (l'éléphant elided literal) | mammifère oiseau reptile poisson insecte amphibien · poils plumes écailles piquants carapace peau lisse · plantes viande les deux | none | vowel-initial `def` stored elided (8/37 animals) |
| it | Riccio / il riccio (l'elefante, lo squalo) | mammifero uccello rettile pesce insetto anfibio · pelo piume squame aculei guscio pelle liscia · piante carne entrambi | none | `il/lo/l'` literal per animal |
| nl | Egel / de egel (`de/het` from vocab d/h) | zoogdier vogel reptiel vis insect amfibie · vacht veren schubben stekels schild gladde huid · planten vlees allebei | none | "werkstuk" only in meta |
| sv | Igelkott / igelkotten (definite literal; `en/ett` from n/t for "är ett däggdjur") | däggdjur fågel reptil fisk insekt groddjur · päls fjädrar fjäll taggar skal slät hud · växter kött både och | F4/F5/F6 need `def` per fanned animal (~36, panel-read) | `grupp` ban: panel confirms "Djurgrupp"; `bana/banan` class read; `[NSR-FLAG]` |
| da | Pindsvin / pindsvinet | pattedyr fugl krybdyr fisk insekt padde · pels fjer skæl pigge skjold glat hud · planter kød begge dele | as sv | `[NSR-FLAG]` |
| no | Piggsvin / piggsvinet | pattedyr fugl krypdyr fisk insekt amfibium · pels fjær skjell pigger skall glatt hud · planter kjøtt begge deler | as sv | bokmål; `[NSR-FLAG]` |
| fi | Siili / Siili (nominative: "Siili on nisäkäs") + **`ade`** "Siilillä" for "on piikit / on neljä jalkaa" | nisäkäs lintu matelija kala hyönteinen sammakkoeläin · turkki höyhenet suomut piikit kuori sileä iho · kasveja lihaa molempia (partitive inside the literal); legs "neljä jalkaa" per count | F4 needs `ade` per animal | no articles; `[NSR-FLAG][fi]` |

Refusal rule (all locales): an animal enters F2/F3/F4 only with 7/7 non-null reviewed facts; F5/F6 only from a theme whose 7/7 pool clears the floor; a missing `def`/`ade` drops the ANIMAL from F4/F5/F6, never the face from the locale. Base + F3-bank need only picture + `name`.

## D. Data + gates

`data/b3/fact-file.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (absent, m); `data/` gitignored, `git add -f`.
```
FACT_FILE = {
  facts: { hedgehog:{class:'mammal', covering:'spines', diet:'both', habitat:'land', legs:4, fly:false, swim:true, reviewed:true},
           turtle:{…, habitat:null} },                                  // ONE locale-neutral table; null = ambiguous at K-2
  choices: { class:[6 keys], covering:[6], diet:['plants','meat','both'], habitat:['land','water','air'], legs:[0,2,4,6,8] },
  loc: { de: { labels:{class:'Klasse', …, name:'Name:', sentence:'Ein Satz über das Tier:', draw:'Male das Tier in seinem Lebensraum.', same:'Gleich:', diff:'Verschieden:', mystery:'Wer bin ich?'},
               yesno:{yes:'ja', no:'nein'}, choiceLit:{class:{mammal:{cell:'Säugetier', inFrame:'ein Säugetier'}, …}, …},
               legsFrames:{0:'hat keine Beine', 4:'hat 4 Beine', …},
               animals:{hedgehog:{name:'Igel', title:'Igel', def:'der Igel', ade:null, reviewed:true}},
               frames:[{id:'f1', field:'class', text:'{def} ist'}, {field:'covering', text:'{def} hat'}, …],
               mystery:{class:'Ich bin {inFrame}.', covering:'Ich habe {cell}.', …, fly:{true:'Ich kann fliegen.', false:'Ich kann nicht fliegen.'}},
               exemplar:'hedgehog', strings:{'G2-318':{title,instruction}, F2..F6:{…}} } } }
```
**Join rule.** Seed `facts` from the 7 banks via `manifest.themes[t].nouns[n].vocabKey` (52 keys, m; 4 bank keys without an animal-theme picture, `bird airplane helicopter car`, ignored); bins map 1:1 (`mammals->mammal`, `canfly->fly:true`, `plant->plants`). The banks are a CROSS-CHECK, never the ceiling: the pedagogue authors the 7-field row for ~36 animals ONCE (locale-neutral, 252 cells); the 10 panels' educators fact-check their exemplar rows. **Disagreement rule:** table != bank for one key = FAIL; bank != bank = FAIL (0 today); ambiguity = `null` (turtle habitat land+water, dolphin/whale class per the bank `_note`, bat fly, frog covering), which drops the animal from 7/7 faces, never invents.

**`tools/validate-b3-draft.js` (fact-file block; exit 1 on any):** (1) labels <= 18 chars, `cell` <= 16, `inFrame` <= 20; (2) every `choices[field]` key has a `choiceLit` in every locale; (3) every reviewed animal resolves via `fileUri` in >= 1 animal theme, no localized B&W marker; (4) fanned animals have `name` + `title`; F4/F5/F6 animals have `def` (fi `ade`) `reviewed:true`; (5) the 7/7 rule computed and the refusal list printed per (locale x theme x face); (6) `frames` >= 3, `{def}` exactly once, <= 22 chars filled, no end mark; `mystery` has all 6 kinds; `legsFrames` all 5 counts; (7) bank cross-check; (8) chip fields have >= 3 choices (d3's 4-pill row REFUSED on diet, recorded); (9) titles <= 70, no worksheet-word, unique in band; instruction <= 150; no `{name}`; no starter equal to a G2-278 starter (`LABELS[loc].pictureWriting`, m).

**`qa/verify-b3-fact-file.js`:** renders 6 faces x 11 locales x the wave theme at d2 under a 3-line title + 150-char instruction (722 floor); `verify()` empty; `qa/lints.js` clean; label column `scrollWidth <= clientWidth`; pills >= 44 high; `.ws-icon` >= 36; node-side re-derivation of every `data-lcs-fact-*` / `-correct` / `-answer` / `-same` / `-diff` from `facts` (diff, not trust; 0 checked = FAIL); 20-seed sweep: F2 correct index and F6 answer index not constant; a position/size bot on F6 scores <= 1/4 in expectation. **Poison (each must FAIL; the correct draft is the control):** P1 `facts.rabbit.diet:'meat'` (contradicts `what-animals-eat.json`); P2 an F6 puzzle with two 0-contradiction candidates (hedgehog + porcupine, identical clues); P3 an F2 row with two `data-lcs-correct`; P4 sv `def:'igelkott'` (indefinite) in an F4 frame; P5 a `zoo animals bw` picture; P6 F3 bank missing the true covering; P7 a de frame with the class printed inside the frame text; P8 an F5 pair sharing 7/7; P9 a fanned animal with `habitat:null` on F2; P10 the 878-px single-column stack (must fail the footer lint); P11 a 26-char label.

## E. SEO

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170; the child's instruction) | coordinate |
|---|---|---|---|
| base | "{U} Fact File" · "{U}-Steckbrief" (the searched compound; panel confirms) / "Ficha del animal: {U}" / "Fiche documentaire : {U}" · "Faktablad: {U}" / "Tietoteksti: {U}" | Write six facts about the animal, add one sentence of your own and draw it in its home | `{type:'animal-fact-file', mode:null, theme:<axis key>, level:<G2 key>, unit:<key>}` |
| F2 | head + "Tick the Facts" · "zum Ankreuzen" / "para marcar" / "à cocher" · "kryssa i" / "rastita" | Three facts are printed in each row; circle the one that is true for this animal | `mode:'tick'` |
| F3 | head + "with a Word Bank" · "mit Wortspeicher" / "con banco de palabras" / "avec banque de mots" · "med ordbank" / "sanapankilla" | Find each fact in the word bank and copy it into the right field | `mode:'word-bank'` |
| F4 | head + "Write Three Sentences" · "Sätze schreiben" / "escribe tres oraciones" / "écris trois phrases" · "skriv tre meningar" / "kirjoita kolme lausetta" | Read the fact file, finish the three sentences and write one more fact | `mode:'sentences'` |
| F5 | "Compare Two Animals: Same and Different" · "Zwei Tiere vergleichen" / "Compara dos animales" · "Jämför två djur" / "Vertaile kahta eläintä" (+ theme: "Waldtiere vergleichen") | Read both fact files and write two things that are the same and two that are different | `mode:'compare', unit:''` |
| F6 | "Who Am I? Mystery Animal" · "Wer bin ich? Tierrätsel" / "¿Quién soy? Animal misterioso" / "Qui suis-je ? Animal mystère" · "Vem är jag? Djurgåta" / "Kuka olen? Eläinarvoitus" (+ theme) | Read the clues, circle the animal they describe and write its name | `mode:'mystery', unit:''` |

h1 = title; eyebrow = level label; strand = `Writing` row (7 locales to add, §A). JSON-LD `LearningResource`, `educationalAlignment.targetName` per §A (F2: none; `teaches` = "Life science: animal characteristics", the §22.1 readiness shape), no `targetUrl`. `{U}` = `animals[loc][key].title` (sv/da/no panels decide indefinite vs definite in a heading). Meta lead inherits `seo.words.free_printable` (README open item 1).

Non-cannibalisation (3-gram Jaccard, `gate.js` FAIL >= 0.80; *est.*): base vs F2 / F3 0.30 · base vs F4 0.25 · F5 / F6 vs base 0.15 · any vs G2-278 0.10 (ours never says story or scene) · F2/F3 vs science sorts 0.12 · base vs K-323 0.10 · F6 vs G2-254 0.10. Boundary sentence on every landing: "One animal, six facts: a fact file, not a story about a picture and not a sorting page." Per-unit landings differ by animal name + quoted facts, the same axis as the theme fan.

## F. Open questions + summary

1. **The fact table is a prerequisite, not a by-product.** Banks give 11 animals at >= 3 core facts and 0 at 7/7 (m). Who authors the ~36-animal locale-neutral table in the build session? Without it only F1 and F3 ship and the type has 2 faces.
2. Subject disc `science` (proposed, §A) vs `letters`: operator call.
3. `'Writing'` strand row lacks 7 locales (m); no science row exists.
4. sv/da/no `def` + fi `ade` per animal (~36 x 4 literals) gate F4/F5/F6 there; sv confirms "Djurgrupp" against the `grupp` ban.
5. `unitAxis` is unimplemented (README ruling); until it lands the wave ships `exemplar` only.
6. F5/F6 fan by theme: confirm the emitter keeps `unit:''` on their coordinates.

**Summary.** G2-318 is a Steckbrief template about ONE animal (picture, name, six labelled fields, sentence lane, draw box), fanned per animal via `unitAxis` across the 11 animal themes (182 pictured animals, m). Six faces: blank research template (open), tick-the-facts (verifiable), word bank (open), write three sentences (open, W.2.2), compare two animals (open), mystery animal (verifiable, RI.2.1). The science banks cover 52 animals but only rabbit has all five core facts and no bank knows legs or swim, so a panel-reviewed locale-neutral 7-field table (~36 animals) is the truth and the banks are a hard cross-check. Every literal is panel-authored; code substitutes, never inflects; an animal without 7/7 facts or a definite form drops from a face, never the face from the locale.
