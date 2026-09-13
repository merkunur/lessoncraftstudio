# G1-308 `read-and-do` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-13)

Numbers MEASURED 2026-09-13 unless marked *est.* Sources: `scripts/worksheet-gen/data/b2/sentences.js`, `lib/sentence-bank.js`, `lib/b2-common.js` (`entriesFor`, `countable`, `B2_EXCLUDE`), `data/color-words.js`, `data/b2/word-classes.js`, `data/b2/calendar.js`, `data/b2/articles.js`, `REFERENCE TRANSLATIONS/lcs-grammar.js`, `types/g1/G1-242-read-and-color.js`, `types/_shared/position-words.js`, `types/g2/G2-254-reading-comprehension.js`, `frontend/config/topics-taxonomy.json`, `_PANEL-FINDINGS.md` sections 9 + 15. Read-only node one-liners; no scratch file.

**Boundary (load-bearing).** The child READS an imperative sentence and EXECUTES it on a row of pictures with a pencil. G1-242/251/252 own "colour N nouns COLOUR" on BW art; K-064..067 own position words where the ARRANGEMENT is the answer and one fixed instruction serves the page; K-320 owns ordinal NOTATION over a line-up; G2-254 owns passage + questions; K-225 owns word-to-picture. Here every row is a different sentence carrying the verb AND the cue. The verb `colour` is NOT in this type (colour art cannot be coloured; "lue ja väritä / läs och måla / lees en kleur / lee y colorea" are G1-242's taxonomy names).

**Five load-bearing measurements.**
1. **No instruction verb exists in any bank.** `WORD_CLASSES[loc].verbs` (`{w,tier}`, 28-32 per locale) holds only draw/write/paint-class verbs (en `draw`; es `escribir pintar dibujar`; fi none). Circle / cross out / underline / connect / mark are authored fresh.
2. **`sentences.js` is not reusable for instructions.** 19-23 frames per locale: `color` 3-5 (`{n} {noun} {color}` = G1-242's move) + `simple` 15-19 declaratives. Zero imperative non-colour frames. Reused: `names` (8 per locale, F4 only if the panel wants a name subject) and `fi.nounForms.partitive` (161 keys).
3. **Countable nouns per theme, min over 11 locales** (`entriesFor(t,loc).filter(countable)`): around the house 59 · animals 33 · birds 2 33 · camping 31 · forest creatures 30 · zoo animals 29 · beach 29 · clothing 26 · farm animals 20 · fruits 20 · vehicles 20 · toys 17 · pets 15 · vegetables 12 · weather 8. A page needs 8 nouns; the binding limit is the per-locale object-form table (5).
4. **Ordinal words exist nowhere.** `calendar.js` stores only an `ordinalStyle` (en `14th`, dot `14.`, plain, fr `1er`, nl, sv); `lib/number-words.js` is cardinals. The panel authors first..fifth + last.
5. **Case/definiteness tables today:** fi partitive 161 keys (coverage of countable nouns: animals 37/37, fruits 28/28, toys 25/25, vehicles 28/28, zoo 27/34, farm 17/25, forest 17/40, supermarket 14/49, clothing 0/28, around the house 1/76, classroom 0/31); fi genitive `FI_GENITIVES` 1,164 keys (`lcs-grammar.js:599`); de weak-noun dative `DE_DATIVE_SG` 41 keys (`lcs-grammar.js:1777`). sv/no DEFINITE forms (hunden, huset) exist nowhere; da does not need them ("den anden hund").

## A. IDENTITY

| field | value |
|---|---|
| family key | `read-and-do`. ABSENT from `topics-taxonomy.json` (`apps.*` + `axes['exercise-type']`, grep = 0). Register `apps['read-and-do'] = {default_subject:'letters', default_age_range:'6-8', exercise_type_axis_key:'read-and-do'}` + slug/name x11 (shape of `read-and-color`). |
| band | all six faces G1 (`G1-311+ TBD`). Level keys from `LEVEL_KEYS` (`scripts/seo-landing/gen-b2var-landings.js:112-124`; no = `2-trinn`). F1 could sit at K in en/sv/da/nl; de/fi/fr K classes do not read sentences: one band, K recorded as open. |
| theme axis | ON: `{applicable:true, minNouns:8, excludeBw:true}`. One theme per page. Recommended fan (full `countable` + fi partitive coverage): **animals · fruits · vehicles · toys · zoo animals · farm animals**; any other theme needs its object-form table first. |
| CCSS (en, honest) | base/F1/F2/F5 **RF.1.4** (prose: following written directions); F3 RF.1.4 + **L.1.1.i** (prepositions between, next to); F4 RF.1.4. NOT RL.1.1. Non-EN names the national framework only. |
| data | `data/b3/instructions.js` (section D); `fileUri(theme, noun)`; `B2_EXCLUDE` applies. |

| loc | genre head (panel section 9) | ASCII slug | level | strand (name only) |
|---|---|---|---|---|
| en | Read and Do (F5 "Read and Draw"; "following directions" in meta) | `read-and-do` | grade 1 | Reading foundational skills: fluency and comprehension |
| de | Lesen und Verstehen (F5 "Lesen und Zeichnen"; "Leseaufträge" in meta; NEVER "Lesen und Malen" or "Lesen und Ausführen") | `lesen-und-verstehen` (G2-254 = `leseverstaendnis`, no collision) | 1. Klasse | Lehrplan Deutsch: Lesen, Leseaufträge ausführen |
| es (MX) | Lee y haz (F5 "Lee y dibuja"; "comprensión de instrucciones escritas" in meta) | `lee-y-haz` | primer grado | SEP/NEM Lenguajes: comprensión de instrucciones |
| pt (BR) | Leia e faça (F5 "Leia e desenhe") | `leia-e-faca` | 1º ano | BNCC Língua Portuguesa: compreensão de instruções (habilidade UNKNOWN, panel cites) |
| fr | Lecture de consignes (F5 "Lis et dessine") | `lecture-de-consignes` | CP | programmes cycle 2: comprendre des consignes écrites |
| it | Leggi e fai (F5 "Leggi e disegna"; "comprensione delle consegne" in meta) | `leggi-e-fai` | classe prima | Indicazioni: comprendere consegne |
| nl | Lees en doe (F5 "Lees en teken"; rides "begrijpend lezen groep 3") | `lees-en-doe` | groep 3 | SLO kerndoel 4: begrijpend lezen |
| sv | Läs och gör (F5 "Läs och rita"; rides "läsförståelse åk 1") | `las-och-gor` | åk 1 | Lgr22: läsförståelse |
| da | Læs og gør (F5 "Læs og tegn"; "læs og forstå" in meta) | `laes-og-goer` | 1. klasse | Fælles Mål: læseforståelse |
| no | Les og gjør (F5 "Les og tegn"; "leseforståelse" in meta) | `les-og-gjoer` | 2. trinn | LK20: leseforståelse |
| fi | Lue ja tee (F5 "Lue ja piirrä"; "luetun ymmärtäminen" in meta) | `lue-ja-tee` | 1. luokka | OPS 2014: luetun ymmärtäminen |

## B. THE SIX FACES

Layout on the 703x760 body (inner 675): 6 full-width `.ws-lane` rows h 118 gap 8 (748 <= 760), each `[badge 26][sentence Nunito 800 17, one line <= 70 chars][strip: 12 px coral start dot + 4 `.ws-icon` 64 px gap 18]`; stack 24 + 6 + 76 = 106 <= 104 + slack (engineer measures a de/fi render). Icons 64 >= G1 floor 44 (`_tokens.js:69`); 6 rows = 6 items. `write` rows append `answerBox({w:56,h:44})` (`components.js:105`). NEW in `templates/components-b3.js` (absent): `instructionRow({n, text, strip, action, targets, box})` · `truthChips({yes,no})` (two `.ws-pill` 44 high, `data-lcs-truth-chip`) · `drawBox({w:240,h:96})` (dashed coral, `data-lcs-drawbox`).

| # | id / slug | EN title (<=70) | teaching move | child at d2 |
|---|---|---|---|---|
| F0 | G1-308 `read-and-do` | Read and Do: Follow the Instructions | DECODE verb + noun + cue in one sentence, act once | 6 rows x 4 pictures; >= 4 of 6 verbs (circle / cross out / underline / connect / mark / write the number); cues unique noun / all of a noun / ordinal / first-last |
| F1 | G1-3xx `read-and-circle` | Read and Circle | the FRAME rung: verb fixed, only the noun phrase carries meaning | 6 x 4; verb `circle` only; cues unique (3 rows) + all (3 rows) |
| F2 | G1-3xx `read-and-do-two-steps` | Read and Do: Two-Step Instructions | HOLD two actions from one sentence | 6 x 5; two clauses joined by the locale's "and", two different verbs, disjoint targets |
| F3 | G1-3xx `read-and-do-first-second-last` | Read and Do: First, Second, Between | POSITION cue is the only discriminator | 6 x 5; every row an ordinal / first / last / between / right-of cue; verbs mixed |
| F4 | G1-3xx `read-and-check-true-or-false` | Read and Check: True or False | VERIFY a declarative against the row (B head es/fr/it/sv; dead en/nl/pt: kept, honest x11, weaker query in 3) | 6 x 4; statement + two chips (locale true/false literals); 3 true / 3 false |
| F5 | G1-3xx `read-and-draw` | Read and Draw | PRODUCE from text (the A/B "läs och rita / lis et dessine / read and draw" head in 10 locales) | 6 cards 2x3: "Draw {n} {noun} in the box." + `drawBox`; no picture shown (a picture removes the reading); open-ended, no child-output verify |

### d-levels, PARAM vs CODE

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 6 x 3, verbs 3, cues unique+all | 6 x 4, verbs >= 4, cues unique/all/ordinal/first-last | 6 x 5, verbs 6, + between/right-of, font 16 | `pics verbs[] cues[]` | base |
| F1 | 6 x 3, unique | 6 x 4, unique + all | 6 x 5, + ordinal | `{...base.difficulty[2], verbs:['circle'], cues:['unique','all']}` | PARAM |
| F2 | 6 x 4, 2nd clause `circle` | 6 x 5, two verbs from the set | 6 x 6 (icon 56), one clause ordinal | `steps:2` + `data-lcs-steps` | CODE |
| F3 | 6 x 4, first/last/ordinal | 6 x 5, + between | 6 x 6, + right-of/left-of | `cues:['ordinal','first','last','between']` | PARAM |
| F4 | 6 x 3, count statements | 6 x 4, count + position | 6 x 5, + two-noun statements | `mode:'truth'` | CODE |
| F5 | 4 cards, n 1-2 | 6 cards, n 1-3 | 6 cards, n 2-4 + second clause | `mode:'draw'` | CODE |

Guards key on `d.verbs / d.cues / d.mode / d.steps`, never the level index; `data-lcs-face` stamped only when `mode`/`steps` is declared (base byte-identical). `gate-variation-distinct.js` sees five distinct d2 configs; F3 d2 (5 pics, position cues) != base d3 (5 pics, all cues).

### verify() rules (targets re-derived from the strip + cue)

Stamps: root `data-ws-content data-lcs-theme`; row `data-lcs-row data-lcs-action="circle|cross|underline|line|mark|write" data-lcs-cue="unique|all|ordinal:k|first|last|between|rightof|leftof" data-lcs-noun data-lcs-noun2 data-lcs-targets="2,3" data-lcs-text`; picture `data-lcs-idx data-lcs-noun`. Re-derivation must equal `targets`:
- `unique`: exactly ONE picture of `noun` -> it. `all`: >= 2 of `noun` + >= 1 other noun -> all of them. `ordinal:k`: >= k pictures of `noun`, k >= 2 -> the k-th from the start dot (k=1 is `first`). `first`/`last`: idx 0 / n-1, noun unset. `between`: `noun`, `noun2` unique, |i1-i2| = 2 -> middle. `rightof`/`leftof`: `noun` unique, not at the edge -> idx +- 1. `line`: both unique -> both. `write`: every picture of `noun` (1-4), `answerBox[data-lcs-answer]` = count, >= 1 other noun, no second `write` row with the same count.
- `data-lcs-text` is an ENTRY of the bank's `rendered[]` (node-side gate) and the row's verbatim text; `/\{/`, double space, no `/^\p{Lu}/u`, no end mark = FAIL. Two-answer rows FAIL by the rules above (a `unique` cue over two dogs, `ordinal:3` over two cats, a `between` with a repeated endpoint).
- Page: 6 distinct sentences; base d2 >= 4 distinct actions; a noun is the target noun of <= 2 rows; no two rows share (action, cue).
- F2: two `[data-lcs-step]` per row, different actions, disjoint targets. F3: every cue positional, ordinal k in 2..4. F4: `data-lcs-truth="1|0"` 3+3; a false statement is `data-lcs-false-by="count|position"` and its noun IS on the strip; chips carry no answer glyph. F5: no `img`, one empty `drawBox`, `data-lcs-n data-lcs-noun` for the key (n copies of the picture in the box); no child-output verify.
- All: `img.complete && naturalWidth > 0`; no B&W path (localized marker `BW|SW|BN|NB|ZW|SH|PB|MV|SV`); equal icon sizes per row; no opacity or overlay.

### Refusal per locale (floors: 8 nouns with authored object-forms; verbs base >= 4, F2/F3 >= 3; F3 cue kinds >= 3; F4 >= 8 statement frames; F5 >= 4 draw frames)

| locale | countable nouns, fan themes (animals / fruits / vehicles / toys / zoo / farm) | object-form source | expected refusals |
|---|---|---|---|
| en nl da | 33/28/29/25/31/24 · 37/28/28/26/34/25 · 33/21/25/24/29/22 | article + invariant ordinal + vocab noun (da "den anden hund", no double definiteness) | none |
| de | 33/27/20/17/31/20 | acc. article + ordinal literal per gender + vocab noun; dative cues via `DE_DATIVE_SG` (41) else the noun is excluded from them | `between`/`rightof`/`line` only with strong or listed nouns |
| es pt it fr | 37/28/27/25/34/25 · same · 34/23/20/20/30/24 · 37/26/28/25/31/25 | article + ordinal agreeing with vocab gender; fr/it vowel-initial nouns refused in definite sg cues (`articles.js` fr/it `keyFor -> null`) | fr/it: a share of nouns drop from sg cues (UNKNOWN, engineer measures), never a face |
| sv no | 36/20/24/24/31/22 · 35/22/24/22/29/23 | DEFINITE forms absent: panel authors `nounForms.def` + `defPl` for the six fan themes (~150 literals per locale) | until `def` exists: F1 only ("Ringa in en hund" over two dogs is a non-task) |
| fi | 37/28/28/25/34/25 | total object of the imperative = NOMINATIVE sg/pl = vocab ("Ympyröi toinen kissa." "Yliviivaa kaikki omenat."); `write` = partitive table; `between` = `FI_GENITIVES`; `line` = "Yhdistä kissa ja pallo viivalla." (nominative, no table) | `write` refused on clothing / house / classroom (partitive 0/28, 1/76, 0/31); none on the fan set |

Refusal is a DATA decision: a missing verb or cue drops from the locale's face; a face below floor drops from the wave, recorded, never padded.

**Fan lever.** Theme (`themesPerType` round-robin, `enumerate.js`) x the verb/cue set; `variantsPerType` re-samples rows. `minNouns:8` + the object-form gate decide which themes a locale fans.

**Query face per market.** F0 bare head · F1 "circle / einkreisen / encierra / ringa in / ympyröi" · F2 "two steps / zwei Aufträge / dos pasos / två steg / kaksi tehtävää" · F3 "first, second, last / der Erste, der Zweite / primero, segundo / första, andra, sista" · F4 "true or false / richtig oder falsch / vrai ou faux / sant eller falskt / totta vai tarua" · F5 "read and draw" (the head in 10 locales).

**Rejected non-moves.** Theme swap · "colour the second cat red" (colour art; G1-242; a "colour the box under" workaround still reads as G1-242) · count-and-write as a face (counting-pictures, 14 types) · negation "cross out everything that is NOT a fruit" (science category sort, 20 banks) · "follow the path" through 3-4 pictures (a pencil line cannot be read back; no head) · position cues on a scene (K-064..067; no scene art) · one big strip with 6 instructions (two instructions collide on one picture) · base d3 relabelled.

## C. NATIVE REBUILD x11

Panel authors per locale: `verbs` (6 whole imperatives, one `{obj}` slot, two for `line`), the article/ordinal literals that `apply-b3-locale.js` expands into `objForms`, `ordinals` (first..fifth + last, per gender where agreeing), `truth` (chip words + 8 statement frames), `draw` (4 frames), six titles + instructions. EN handed over as a SOURCE TO AUDIT.

| loc | frame shapes (verb + object) | `{obj}` without agreeing with an unknown noun | refusal | traps |
|---|---|---|---|---|
| en | Circle the {obj}. · Cross out all the {pl}. · Underline the second {sg}. · Draw a line from the {sg} to the {sg2}. · Put a tick under the {obj}. · Write how many {pl} there are. | no agreement; `the` fixed | none | "tick" vs US "check mark": the mark glyph is a per-locale `mark` literal |
| de | Kreise {obj} ein. (separable) · Streiche alle {pl} durch. · Unterstreiche {obj}. · Verbinde {obj} mit {dat2}. · Kreuze {obj} an. · Schreibe, wie viele {pl} es gibt. | acc. literals per gender: m `den {ord}en`, f `die {ord}e`, n `das {ord}e`; dative (`mit dem`, `zwischen dem … und der`) via `DE_DATIVE_SG` or exclusion; `nounCase:'keep'` | dative cues only with strong/listed nouns | "ankreuzen" = X, "durchstreichen" = strike: two distinct key glyphs (`mark:'cross'`, `cross:'strike'`); "Lesen und Malen" BANNED |
| es (MX) | Encierra en un círculo {obj}. · Tacha {all}. · Subraya {obj}. · Une con una línea {obj} y {obj2}. · Marca con una palomita {obj}. · Escribe cuántos {pl} hay. | `el {ord}o` / `la {ord}a` (primer/primera); `todos los` / `todas las` + vocab pl | none | MX register (carro, palomita); "el agua"-class feminines refused from sg cues (`articles.js` es note) |
| pt (BR) | Circule {obj}. · Risque {all}. · Sublinhe {obj}. · Ligue {obj} {a-obj2}. · Marque {obj} com um ✓. · Escreva quantos {pl} há. | `o {ord}o` / `a {ord}a`; `todos os` / `todas as`; `ao`/`à` contraction = literal per gender | none | "pinte" belongs to G1-242; the crase is stored |
| fr | Entoure {obj}. · Barre {all}. · Souligne {obj}. · Relie {obj} {au-obj2}. · Coche {obj}. · Écris combien il y a de {pl}. | `le {ord}` / `la {ord}` (invariant except premier/première); `tous les` / `toutes les`; vowel/h nouns REFUSED in definite sg cues | vowel/h nouns drop from unique/ordinal/line | imperatives end in `.` (no `endSpace` case); "colorie" BANNED |
| it | Cerchia {obj}. · Cancella con una riga {all}. · Sottolinea {obj}. · Collega {obj} {a-obj2}. · Metti una crocetta su {obj}. · Scrivi quanti {pl} ci sono. | `il/lo/la {ord}` per gender + onset (`articles.js` it `keyFor` audit); `tutti i` / `tutte le`; `al/allo/alla` literal | vowel-initial nouns drop from sg cues | "crocetta" is an X: `mark` = X, so `cross` must read "cancella con una riga" |
| nl | Omcirkel {obj}. · Streep {all} door. · Onderstreep {obj}. · Verbind {obj} met {obj2}. · Zet een vinkje bij {obj}. · Schrijf hoeveel {pl} er zijn. | `de`/`het` from vocab d/h; ordinal invariant | none | separable "streep … door"; IJ capital if a noun opens an F4 statement |
| sv | Ringa in {obj}. · Stryk över {all}. · Stryk under {obj}. · Dra ett streck mellan {def} och {def2}. · Sätt ett kryss på {def}. · Skriv hur många {pl} det finns. | `den/det {ord} {def}` needs the DEFINITE noun (hunden) = panel `def` table; validator prints every `def` for a human read (`bana`/`banan` class) | F1 only until `def` exists | never `grupp`; "läs och måla" BANNED; chips "sant / falskt" |
| da | Sæt ring om {obj}. · Streg {allDef} ud. · Sæt streg under {obj}. · Tegn en streg fra {def} til {def2}. · Sæt kryds ved {def}. · Skriv, hvor mange {pl} der er. | "den anden hund" = vocab sg (no double definiteness); `all`/`line`/`mark` want `def` (æblerne, hunden) = panel table for those cues only | `all`/`line` need `def`; `unique`/`ordinal` do not | "Læs og forstå" in meta only (a series title elsewhere) |
| no | Sett ring rundt {obj}. · Stryk over {allDef}. · Sett strek under {obj}. · Tegn en strek fra {def} til {def2}. · Sett kryss ved {def}. · Skriv hvor mange {pl} det er. | double definiteness: `def` table as sv; f nouns `-a` (kua) = literal | as sv | bokmål only; band 2. trinn; "les og fargelegg" BANNED |
| fi | Ympyröi {obj}. · Yliviivaa kaikki {pl}. · Alleviivaa {obj}. · Yhdistä {sg} ja {sg2} viivalla. · Merkitse {obj} rastilla. · Kirjoita, montako {part} on. | nominative sg/pl = vocab for total objects; ordinal invariant; `montako` + partitive (161); `between` = genitive "{gen} ja {gen2} välissä" (`FI_GENITIVES`) | `write` off partitive-poor themes | no articles; "Lue ja väritä" BANNED; chips "totta / tarua"; K impossible (esikoulu does not read sentences) |

Every generated object literal is read by the panel (`reviewed:true` per entry); unreviewed = validator FAIL (the K-318 gated-bank pattern).

## D. DATA + GATES

`data/b3/instructions.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; `data/` gitignored, force-add):
```
INSTRUCTIONS[loc] = {
  nounCase:'keep'|'lower', mark:'check'|'cross', cross:'strike',
  verbs: [{ id:'circle', frame:'Kreise {obj} ein.' }, { id:'cross', frame:'Streiche {all} durch.' },
          { id:'underline', frame:'Unterstreiche {obj}.' }, { id:'line', frame:'Verbinde {obj} mit {dat2}.' },
          { id:'mark', frame:'Kreuze {obj} an.' }, { id:'write', frame:'Schreibe, wie viele {pl} es gibt.' }],
  objForms: { dog: { unique:'den Hund', all:'alle Hunde', pl:'Hunde', dat:'dem Hund',
                     ord:{2:'den zweiten Hund',3:'den dritten Hund',4:'den vierten Hund'}, reviewed:true } },
  fixed: { first:'das erste Bild', last:'das letzte Bild', between:'das Bild zwischen {dat} und {dat2}', rightof:'das Bild rechts neben {dat}' },
  truth: { yes:'richtig', no:'falsch', frames:[{ text:'Es gibt {n} {pl}.', cue:'count' }, { text:'{unique} ist das erste Bild.', cue:'first' }] },
  draw:  [{ text:'Zeichne {n} {pl} in den Kasten.' }],
  rendered: [...],                                   // every (verb x noun x cue) sentence, written out by apply
  strings: { 'G1-308':{title,instruction}, F1..F5:{...} } }
```
`objForms` is expanded at apply time from the panel's per-gender article/ordinal literals + vocab + the two grammar tables, written out as whole literals, read by the panel. At render the code looks up `objForms[noun][cue]` and `fillFrame` (`sentence-bank.js:20`): no inflection, no capitalisation (frames start with the verb; de capitals live in the literal). `fixed.first/last` ride the noun "picture", so position cues never agree with a theme noun.

**`tools/validate-b3-draft.js` (instructions block; exit 1 on any):** (1) every noun a page may use has `unique`, `all`, `pl` non-empty + `reviewed:true`; a theme with < 8 fully-formed countable nouns is REFUSED for the locale (reported); (2) each frame has exactly one `{obj}`-class slot (`line` two; `write` `{pl}`/`{part}`), starts `/^\p{Lu}/u`, ends `.`; (3) every `rendered` sentence: no `{`, no double space, no ` .`, uppercase first char; (4) ordinals 2-5 + first/last per gender present where the language agrees (de 3 genders, es/pt/it/fr 2, else 1); (5) `truth.frames` >= 8 with an evaluable `cue`; `yes`/`no` distinct, neither a verb; (6) `draw` >= 4 with `{n}` + `{pl}`; (7) fr/it vowel-initial nouns have NO sg form unless the elided literal is stored; de nouns in `DE_DATIVE_SG` have `dat` = that value; sv/no `def` present for every noun used by `all`/`line`/`between`/`mark`; (8) titles: no worksheet-word, <= 70, unique in band; instruction <= 150; no colour verb ("Malen colorie colorea pinte colora kleur måla farvelæg fargelegg väritä") in any title; (9) no `{name}` slot (second-person imperatives).

**`qa/verify-b3-read-and-do.js`:** renders face x 11 locales x 6 fan themes at d2; `verify()` empty; `qa/lints.js` clean; icons >= 44, boxes >= 44 high, sentence font >= 16 on ONE line (`scrollWidth <= clientWidth`); node-side gate re-reads `data-lcs-text` against `rendered[]` (a gate must not import the type). 20-seed sweep per (locale, theme): every verb appears; `write` answers not constant; F4 3/3 every seed; F3 target index not constant. **Poison** (each must FAIL; the correct draft is the control): P1 `unique` over two pictures of the noun; P2 `ordinal:3` over two cats; P3 de `objForms.rabbit.dat = 'dem Hase'` vs `DE_DATIVE_SG`; P4 sv `all` = `alla hund` (no `def`); P5 F4 false statement about a noun absent from the strip; P6 a `zoo animals bw` theme; P7 rendered `Kreise den  zweiten Hund ein.` (double space); P8 F2 both clauses `circle`; P9 fi `write` on `clothing`; P10 a `line` row with one noun twice.

**Page reads:** `data/b3/instructions.js[loc]`, `fileUri`, `entriesFor`/`countable`, `answerBox`; never `image-vocabulary.js`, `sentences.js` frames, `word-classes.js` or `approved-words-*.json` at render.

## E. SEO

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (120-170 whole; the child's instruction) | coordinate |
|---|---|---|---|
| base | "Read and Do: Follow the Instructions" · "Lesen und Verstehen: Leseaufträge" / "Lee y haz: sigue las instrucciones" / "Läs och gör: följ instruktionerna" · "Lue ja tee: toimi ohjeen mukaan" | Read each sentence and do exactly what it says to the pictures in that row: circle, cross out, underline or mark | `{type:'read-and-do', mode:null, theme, level:<G1>}` |
| F1 | head + "circle" / "einkreisen" / "encierra" / "ringa in" / "ympyröi" | Read the sentence and circle only the picture or pictures it names | `mode:'circle'` |
| F2 | head + "two steps" / "zwei Aufträge" / "dos pasos" / "två steg" / "kaksi tehtävää" | Each sentence tells you two things to do; read to the end before you start | `mode:'two-steps'` |
| F3 | "Read and Do: First, Second, Between" · "…: der Erste, der Zweite" / "…: primero, segundo, último" / "…: första, andra, sista" · "…: ensimmäinen, toinen, viimeinen" | Find the picture by its place in the row: the second dog, the last picture, the one between two others | `mode:'position'` |
| F4 | "Read and Check: True or False" · "Richtig oder falsch? Sätze lesen" / "Lee y decide: verdadero o falso" / "Läs och svara: sant eller falskt" · "Lue ja päätä: totta vai tarua" | Read each sentence, look at the pictures and circle true or false | `mode:'truth'` |
| F5 | "Read and Draw" · "Lesen und Zeichnen" / "Lee y dibuja" / "Läs och rita" · "Lue ja piirrä" | Read the sentence and draw what it says in the box | `mode:'draw'` |

h1 = title; eyebrow = level; strand row per locale (section A). JSON-LD `educationalAlignment` en only (RF.1.4; F3 adds L.1.1.i), no `targetUrl`. `topicMeta['read-and-do']` + `skill-sentences.en.json` via `tools/register-b3-en-content.js` (absent). Meta lead inherits `seo.words.free_printable` (open item, MEMORY "tier truth").

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*):

| pair | what differs | est. |
|---|---|---|
| base vs F1 / F2 / F3 | many verbs vs one; one action vs two; noun cue vs position cue | 0.35 / 0.30 / 0.30 |
| base vs F4 / F5 | imperative + pencil vs declarative + true/false; pictures vs an empty box, do vs draw | 0.20 / 0.20 |
| any vs G1-242/251/252 | their copy says colour, colour word, count, BW; ours never contains a colour word (rule 8) | 0.10 |
| F3 vs K-064..067 / K-320 | scene relation, one instruction per page, K vs a sentence per row / ordinal NOTATION over a line-up vs an ordinal READ inside a mixed row | 0.15 |
| F4 vs G2-254 · F5 vs G2-278 · base vs G1-249 · `write` rows vs counting-pictures | passage + 3 questions vs one-line statements · write about a picture vs draw from text · order tiles vs execute · one row vs a whole page | 0.10-0.15 |

Boundary sentence on every landing: "The child reads the instruction and does it with a pencil; nothing is coloured" (vs G1-242); on F3: "the ordinal is read inside a full sentence" (vs K-320).

## F. OPEN QUESTIONS + SUMMARY

1. **sv/no definite forms** (`def`/`defPl`, ~150 literals per locale for the fan themes): panel authors before the wave, else sv/no ship F1 only. Engineer checks whether `sv-themes.js` `plDef` literals (`scripts/seo-landing/`, 50 theme nouns) cover any wave noun.
2. **F1 at K in en/sv/da/nl**: per-locale band call; design keeps G1 x11.
3. **`mark` glyph per locale** (de/it/sv/da/no X vs en/es/pt/fr/nl/fi tick): the key renders the locale's glyph; each panel confirms.
4. **F4 in en/nl/pt** (dead head): kept for completeness; drop from those waves if the demand ledger rules so.
5. **fr/it elision share** of vowel-initial countable nouns per fan theme: UNKNOWN, engineer measures with `entriesFor`.
6. **K-320 boundary**: its design is unwritten; align so no K-320 face becomes "circle the second dog in a mixed row".

**Summary.** G1-308 is a six-row page: one full imperative per row over four theme pictures; the child circles, crosses out, underlines, connects, marks or writes a count. Base owns "read and do"; F1 fixes the verb (frame rung), F2 doubles the actions, F3 moves the cue to position, F4 flips to true/false verification, F5 is the open-ended "read and draw" head. All agreement lives in per-noun stored object literals expanded at apply time and read by the panel, so the code substitutes and never inflects; sv/no need a definite-form table that does not exist today, fi rides the imperative's nominative object plus the existing partitive and genitive tables, de excludes or tables its 41 weak nouns. Theme axis ON with six recommended themes, minNouns 8; the colour verb is excluded by boundary with G1-242.
