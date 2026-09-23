# G2-377 `cursive-writing` — PEDAGOGY + CONTENT (nt5-F / b6, 2026-09-23)

Sources read: `_ROLE-PEDAGOGY.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (LOCK), `_BUILD-BRIEF.md`, `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md` §cursive, `_records/cursive-font-probe.png` (opened), `assets/fonts/cursive-fonts.css`, `primitives/font-metrics.json`, `primitives/trace-path.js writingRow/schoolLines`, `templates/components-b2.js rulingBlock`, `lib/b2-common.js entriesFor`, `data/b2/sentences.js names`.
**Measured this session** (scratch `…/scratchpad/G2-377-*`, puppeteer over the vendored woff2 from `file://`, canvas TextMetrics at 1000 px, ink connected-components at 200 px, area floor 400 px²): per-unit metrics, glyph coverage, join/lift per pair, word widths; contact sheet of 40 candidate pictures OPENED (`G2-377-pics.png`) + a second render of all units (`G2-377-shotA.png`, OPENED).

---

## Boundary (load-bearing)

Must not duplicate: **K-238 letter-tracing** (print capitals, `letter-strokes.js`), **K-278 lowercase-letter-tracing** (+5; print lowercase with stroke arrows), **K-284 word-tracing** (+6; print words, fr "Écriture des mots", da "Skriv ordene efter"), **pre-writing** (patterns; de "Schwungübungen", fr "Graphisme", it "Pregrafismo", no "Løkker, åttetall og spiraler"), **sight-words K-239/259..263** (see-trace-write), **picture-writing G2-278/299/300** (compose to a picture), **alphabet-train** (live en landing `alphabet-train-letter-hint-camping` mis-titled "cursive alphabet" → retitled at ship, LOCK ruling 3). Every one of those shows PRINT (Nunito or `letter-strokes.js` centrelines). **This type owns the JOINED school hand**: the joined lowercase letterforms with their entry/exit strokes, cursive capitals, the letter-to-letter CONNECTION as its own skill, whole-word writing in one movement, READING the joined hand, and print→cursive transfer. The model is always the locale's school script rendered by a vendored Playwrite unit with OpenType shaping ON, never Nunito, never a print form presented as the model, never stroke arrows (no cursive stroke data exists), never the word "tracing/nachspuren/overtrekken/pontilhado/tratteggiate" as the head.

---

## A. Identity

| loc | genre head (LOCK / SEO panels) | base school year | national strand (framework NAME) | CCSS (en only) |
|---|---|---|---|---|
| en | Cursive Writing / cursive letters | grade 2 | Handwriting (state statutes, e.g. CA AB 446 gr 1-6, TX TEKS gr 2-3) | **none** (CCSS omits cursive; no alignment object) |
| de | Schreibschrift + VA / LA (Vereinfachte / Lateinische Ausgangsschrift) | 2. Klasse | Lehrplan Deutsch: Schreiben, "eine verbundene Schrift" (KMK) | – |
| es (MX) | letra cursiva (meta: letra ligada) | segundo grado | SEP/NEM, Lenguajes: escritura (school-dependent; landing says "en muchas escuelas") | – |
| pt (BR) | letra cursiva | **1º ano** (data) | BNCC Língua Portuguesa, EF01LP11 (imprensa e cursiva; panel verifies code text) | – |
| fr | écriture cursive | **CP** (data) | programmes officiels cycle 2, geste d'écriture | – |
| it | corsivo | **classe prima** (data) | Indicazioni nazionali, italiano: scrittura | – |
| nl | aan elkaar schrijven / lopend schrift | **groep 3** (data re-target, see F) | SLO kerndoelen, schrijven (handschrift) | – |
| sv | skrivstil | **REFUSED whole type** (Lgr22 no joined script; no Playwrite SE) | – | – |
| da | sammenhængende skrift | 2. klasse | Fælles Mål dansk, fremstilling: håndskrift | – |
| no | sammenhengende skrift | 3. trinn | LK20 norsk, "sammenhengende og funksjonell håndskrift" (after 4. trinn) | – |
| fi | kaunokirjoitus | **REFUSED whole type** (OPS 2014 removed it; no Playwrite FI) | – | – |

**Theme axis:** themeless (`themeAxis.applicable:false`). Pictures (F3 words, F4 reading only) come from a per-type OPENED key list (below) via `lib/b3-picture-index.js`; landings carry `coordinate.theme:''`.

**unitAxis = the SCRIPT** (the ONE fan knob). `units(loc)` / `exemplar(loc)`; `{U}` token = the script's native name (only de titles use it).

| loc | units (bank order) | shipped (wave) | ruling (my call, from the render + curriculum) |
|---|---|---|---|
| en | `us-trad`, `us-modern` | `us-trad` | us-trad = Zaner-Bloser-like, 50/50 joins measured; us-modern is nearly unjoined (22 of 50 pairs break, "apple" = 3 ink pieces) = D'Nealian print-slant, NOT a cursive model → data only |
| de | `va`, `la`, `sas` | `va` + `la` | both ship (LA 19 ≈ VA 17 harvest strings); landings split 3/3 (see E). `sas` (1 string) stays data until a native check signs the SAS glyphs |
| es | `mx` | `mx` | only unit; looped, joins 50/50 |
| pt | `br` | `br` | only unit; looped |
| fr | `fr-trad`, `fr-moderne` | **`fr-trad`** | **overrules the selection's "FR Moderne"**: opened render = fr-moderne is an unlooped, near-print hand (b f h k l without loops; lifts after f g q y: `ft ff qu gu ge ja` break); French CP cursive (Seyès, loops on b f h k l, looped e) = fr-trad (7/50 = only the dot/diacritic components). Native panel signs |
| it | `it-trad`, `it-moderna` | **`it-trad`** | it-moderna renders as joined print (no occhielli); the corsivo taught in classe prima/seconda has loops = it-trad (opened). Native panel signs |
| nl | `nl` | `nl` | looped (lusletters); panel checks against Pennenstreken |
| da | `dk-uloopet`, `dk-loopet` | `dk-uloopet` | unlooped = formskrift / sammenhængende tradition; lifts after f g q y (measured). Panel may flip default; one model per page family (SEO panel) |
| no | `no` | `no` | opened: slanted, UNLOOPED joined hand (b h l k without loops; z = ʒ; lifts after f g y z). ⚠ It is NOT "løkkeskrift" (looped) and "stavskrift" is PRINT: no title may use either as the head → "sammenhengende skrift" |

**Measured unit metrics** (per-em ink; x = "x", asc = "l"/"b", t = "t", desc = "p"/"g"). The ruling bands are sized from THESE, added to `primitives/font-metrics.json` as `cursive-<unit>` by an extended `tools/measure-font-metrics.js` (never derived):

| unit | x | asc | t | desc | asc/x | desc/x | lifts (pairs that are NOT one ink piece beyond dots) |
|---|---|---|---|---|---|---|---|
| us-trad | .531 | 1.031 | .734 | .531 | 1.94 | 1.00 | none |
| de-va | .516 | 1.000 | 1.000 | .500 | 1.94 | .97 | none (note: VA `t` is full ascender) |
| de-la | .531 | .938 | .734 | .438 | 1.77 | .82 | none |
| de-sas | .531 | .906 | .906 | .406 | 1.71 | .76 | none |
| mx | .531 | 1.031 | .734 | .531 | 1.94 | 1.00 | none |
| br | .531 | 1.156 | .734 | .656 | 2.18 | 1.24 | none |
| fr-trad | .531 | 1.438 | .734 | .938 | 2.71 | 1.77 | none |
| fr-moderne | .516 | 1.125 | .734 | .625 | 2.18 | 1.21 | after f g q j |
| it-trad | .531 | .984 | .734 | .484 | 1.85 | .91 | none |
| nl | .531 | 1.297 | .734 | .797 | 2.44 | 1.50 | none |
| no | .531 | .984 | .734 | .500 | 1.85 | .94 | after f g j y z |
| dk-uloopet | .516 | .891 | .734 | .406 | 1.73 | .79 | after f g j q y |
| dk-loopet | .516 | .906 | .734 | .406 | 1.76 | .79 | after q |

Glyph coverage: every unit rendered a b…z A…Z ä ö ü ß ñ á é í ó ú ã õ â ê ô à ç è ë î ï ù û ÿ œ æ ø å ì ò É . , ! ? from its own font (0 fallbacks; fallback-width test). Word widths ≈ 0.6 em/letter in every unit ("aaa" = 1.89 em ×15 units); "Schildkröte" 5.6-6.2 em; the 27-char "La baleine est très grande." 12.9-14.1 em.

**Capitals that do NOT join the next letter** (measured "Xn", beyond crossbar/dot pieces): us-trad B D F G O P S T V W · de-va most capitals (A B C D F H I K N O P R S T V W X Z) · de-la A B D F I N O P R S T V W · mx B D F G H O P S V W · br B D F I O P T V W · fr-trad B D F I N O P R S V W · it-trad B D F I O P R S V W · nl B D F H O P R S V W · no B D F H I N O P R S T V W · dk-* nearly all. This is authentic school practice; no gate may assert a capital join.

**The rule that locks the type:** *every model and trace string is ONE text node rendered in exactly one unit's font with `font-feature-settings` untouched (calt/liga ON), `letter-spacing:0`, no `text-transform`, no per-letter spans, sized so the unit's MEASURED x-height equals the page ruling's x-band (±1 px); a page never mixes two units.*

**Density floors (this type, gate-asserted):** x-height on every model/trace/write row ≥ **14 px at a G1 level** (fr CP, pt 1º, it prima, nl groep 3) and ≥ **11 px at G2-G3**; pictures ≥ 44 px (G1) / 36 px (G2-3), shipped 56 px; write rows are the unit's full band (asc + x + desc) tall, never shorter.

---

## B. The six faces

Pitch per row = `(asc + desc)/x · xPx + 8` (measured ratios above). Every face's stack is gate-computed as `rows · (pitch + 6) + 44 (lesson strip) ≤ 722` (and ≤ 677, the fi-free worst chrome still checked). Worked: us-trad at x 14 → pitch 49; fr-trad at x 15 → 75; br at x 14 → 56; de-va at x 12 → 43.

### Base: Lowercase letters by stroke family (band G2; G1 in pt fr it nl as data; id G2-377; CODE, new factory)
**Move:** form the joined lowercase letters of ONE stroke family (letters that start with the same movement), each as a model and a joined chain, then independently.
**Child (en):** "Trace the grey letters, then write each letter on the empty line below." (70 chars)
**Page:** a lesson strip (the family's letters in the unit font, ink, 1 row) then per letter: row A = model letter (ink) + one joined chain of 3 in trace tone (`inkSoft`, one text node "uuu") + open ruled stretch; row B = an empty ruled row.
**Params:** d1 `{lesson:0, letters:≤3, chainN:3, xPxBonus:+2}` · **d2 `{lesson:0, letters:all of lesson 0, chainN:3}`** · d3 `{lesson:0, chainN:2, writeRows:2}`. Guard: `lesson` index must exist in `lessons[unit]`; `letters ≤ capacity(unit, level)` else THROW (the validator rejects an over-long lesson; the page never truncates silently).
**verify():** open-ended: no answer verify. The gate asserts stamps `data-lcs-unit`, `data-lcs-lesson`, `data-lcs-letters` equal the bank; model text = bank letters.
**Refusals:** sv, fi (type). None per face.
**Query face:** the bare head + "lowercase letters" (en "cursive letters", de "Schreibschrift üben", es/pt "vocales/vogais" because lesson 0 is the vowels, fr "lettres cursives minuscules", it "corsivo minuscolo", nl "kleine letters", da/no "små bogstaver/bokstaver").

**Lessons (ordered; lesson 0 ships at d2; every letter of the locale's alphabet appears exactly once across the lessons of a unit):**
| unit | L0 (ships) | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|---|
| us-trad (Zaner-Bloser families) | i t u w | e l b h f k | r s j p | a d g o c q | n m x y z v | – |
| de va | i u ü t | n m r | e l b h k f | a ä d g q | o ö c s ß | p j y v w x z |
| de la | i u ü t | n m | e l b h k f | a ä d g q | o ö c r s ß | p j y v w x z |
| mx | a e i o u | m p s l | t d n r | c q g b ñ | f h j v | k w x y z |
| br | a e i o u | b c d f g | h j l m n | p q r s t | v x z | k w y ç |
| fr-trad | i u t | e l b h | c o a d | q g k f | n m p r | s v w x y z j |
| it-trad | a e i o u | c d g q | l b h f | n m v r | p t s z | j k w x y |
| nl | i u t w | e l b h k f | a o c d g q | n m v x y | r s z p j | – |
| dk-uloopet | i u t | e l b h k | a o c d g q | n m v w x | r s z p j f y | æ ø å |
| no | i u t | e l b h k | a o c d g q | n m v w x | r s p j f y z | æ ø å |
Letter counts must also pass the capacity rule: fr-trad G1 at x 15 = 75 px pitch → max **4** letters per lesson (4·2·81+44 = 692 ✓; 5 → 854 ✗), which is why fr L0 = 3 and no fr lesson exceeds 4 except L5 (d2 never ships it; validator restricts L5 to d-levels that fit or splits it; engineer re-measures). br G1 5 vowels: 10·62+44 = 664 ✓. Diacritic letters (ü ä ö ß ñ ç æ ø å) sit in the lesson where their base letter's movement is taught, per the national convention; panels confirm.

### F1: Cursive capitals with names (band G2; fr CE1, it seconda; id G2-378+ TBD; CODE `mode:'capitals'`)
**Move:** form cursive CAPITALS and write each as the start of a real NAME (capital + lowercase, where the script joins or deliberately lifts).
**Child (en):** "Trace each capital letter and the name, then write them on the line below." (76)
**Page:** per row A: capital model + 2 capital traces + name model + name trace; row B: empty ruled row.
**Params:** d1 `{capitals:4}` · **d2 `{capitals:5}`** · d3 `{capitals:6}`. Capitals = the distinct initials of the locale's 8 names (`data/b2/sentences.js SENTENCES.<loc>.names`), in names-bank order, one name per capital. Measured distinct initials: en 6 (M B E L A T) · de 7 (E B M F L P N) · es 6 (S M L D V H C → 7) · pt 7 (S M A D L P H) · fr 6 (L H C E N I J → 7) · it 6 (S L G F A M) · nl 6 (E D J S T F L → 7) · da 7 (I W F O A N C E → 8) · no 6 (N J E O A S T → 7). All ≥ 6 → d3 reachable everywhere.
**verify():** open-ended. Gate: each row's name starts with its capital; no two rows share a capital.
**Refusals:** it: **conditional** (native panel confirms corsivo maiuscolo is taught; harvest "alfabeto corsivo maiuscolo", "pregrafismo corsivo maiuscolo" says yes → default BUILD). es: panel confirms (harvest "letra cursiva mayúscula" → BUILD).
**Query face:** "capital letters" (de "Großbuchstaben in Schreibschrift", fr "majuscules cursives", pt "letra cursiva maiúscula", nl "hoofdletters lopend schrift", da "store bogstaver").

### F2: Letter connections (band G2; G1 in pt fr it nl; id G2-TBD; CODE `mode:'joins'`)
**Move:** practise the JOIN between two letters as its own movement (top exits out of o b v w r, joins into e/s/a, national digraphs), then meet it inside a word.
**Child (en):** "Trace each pair of joined letters and the word, then write them on the line below." (82)
**Page:** row A: pair model + chain trace "ol ol" + example word model + trace; row B: empty ruled row.
**Params:** d1 `{pairs:4}` · **d2 `{pairs:6}`** · d3 `{pairs:7}` (8·2 rows overflow fr-trad; capacity rule applies). Pairs in bank order.
**verify():** open-ended. Gate: every pair renders as ONE ink piece in the unit (canvas components minus the expected dot/diacritic pieces); every example word contains its pair; no pair's first letter is in the unit's lift set.
**Refusals:** none (every unit has ≥ 8 joinable pairs; lifts measured and avoided).
**Query face:** "letter connections / joins" (de "Buchstabenverbindungen", fr "les liaisons", nl "letters aan elkaar verbinden", es "letra ligada: unir letras", pt "ligando as letras").

Join banks (pair → example word; words are K-3, no picture needed):
- en: ol doll · ob robot · ow owl · or horse · br bread · ve five · wi swim · os nose
- de (VA and LA share): ol Wolke · on Sonne · or Tor · ob Robbe · br Brot · wa Wal · ch Buch · sch Schaf
- es: ol sol · or flor · os oso · ob lobo · br libro · va vaca · ve nieve · ll llave
- pt: ol sol · or flor · ob lobo · br cabra · va vaca · ve neve · bo bola · ão pão (tilde written last)
- fr: ou loup · oi poire · on mouton · or porte · ob robe · br arbre · va vache · bl table
- it: ol sole · on ponte · or fiore · br libro · va vaso · ve neve · bo bosco · oc oca
- nl: oo boom · oe boek · ou koud · ij ijs · ui huis · or worm · br brood · wa water
- da: ol stol · or mor · bo bog · br brød · hv hval · sk skib · ør ørn · ov ovn
- no: ol stol · or mor · bo bok · br brød · hv hval · sk skip · ør ørn · ov ovn

### F3: Cursive words (band G2; G1 in pt fr; id G2-TBD; CODE `mode:'words'`)
**Move:** write a whole word in ONE movement without lifting, then add dots, crosses and accents LAST.
**Child (en):** "Trace each word without lifting your pencil, then write it. Add the dots and crosses last." (93)
**Page:** row A: picture (56 px, library, opened) + word model + word trace; row B: empty ruled row.
**Params:** d1 `{words:3}` · **d2 `{words:4}`** · d3 `{words:5}`. Selection (seeded): ≥ 2 of the page's words contain a dot/cross/accent-bearing letter (en i j t x; de i j t ä ö ü; es i j t á é í ó ú ñ; pt i j t ã õ á é ê ç; fr i j t é è ê à ç; it i j t à è ì ò ù; nl i j t ij ë; da/no i j t æ ø å) and ≥ 1 contains a pair from the join bank; word length ≤ 8 letters at G2, ≤ 7 at G1.
**verify():** open-ended. Gate: picture key = word key; every word = bank literal for that key.
**Refusals:** none (27 keys × 9 locales, all single words, measured).
**Query face:** "words" (en "cursive words", de "Wörter in Schreibschrift", es "palabras en letra cursiva", fr "copier des mots en cursive", it "parole in corsivo", nl "woorden aan elkaar schrijven").

### F4: Reading cursive (band G2; fr CP = G1; id G2-TBD; CODE `mode:'read'`; the ONLY closed face)
**Move:** READ the joined hand (not write it): match each cursive word to its picture.
**Child (en):** "Read each word in cursive and draw a line to its picture." (57)
**Page:** `.ws-match` two columns: left = cursive words (unit font, ink, x ≥ 11/14 px), right = pictures (56 px); dots at inner edges.
**Params:** d1 `{pairs:4}` · **d2 `{pairs:6}`** · d3 `{pairs:8}`. Reading must be necessary: at d2 the 6 words contain ≥ 2 PAIRS sharing an initial letter (e.g. en cup/cake, boat/book) and ≥ 1 pair whose lengths differ by ≤ 1, so first-letter or length guessing fails.
**verify():** left stamps `data-lcs-word="<vocabKey>"`, right `data-lcs-pic="<vocabKey>"`; the one answer = key identity; re-derive: 6 distinct keys, 6 distinct display words, right column order is a derangement of the left order that is NOT a cyclic rotation or constant shift, no picture in its word's row.
**Refusals:** none.
**Query face:** "reading cursive" (de "Schreibschrift lesen", es "lectura en letra cursiva", it "leggere il corsivo", fr "lire l'écriture cursive").

### F5: Copy a sentence in cursive (band G3; G2 in es pt fr it nl da; id G3-400+ TBD; CODE `mode:'copy'`)
**Move:** print → cursive TRANSFER: read a printed sentence (Nunito) and write it in the joined hand with its capital and full stop.
**Child (en):** "Copy each sentence in cursive on the lines below it." (52)
**Page:** per sentence: printed sentence (Nunito 800, ≥ 17 px) then 2 ruled rows; sentence 1 carries a cursive model on its first row in trace tone (worked example) at d2.
**Params:** d1 `{sentences:2, modelUnder:'all'}` · **d2 `{sentences:3, modelUnder:'first'}`** · d3 `{sentences:3, modelUnder:'none'}`. Guard keys on `modelUnder` (config), never on the level.
**verify():** open-ended. Gate: printed text = bank literal; modelled row text = the same literal; the sentence has 4-6 words, starts with a capital, ends with . ! or ?.
**Refusals:** none.
**Query face:** "sentences to copy" (en "cursive sentences", de "Abschreibtext Schreibschrift", es "oraciones en letra cursiva", pt "frases em letra cursiva / da letra de forma para a cursiva", fr "copier une phrase en cursive", it "frasi in corsivo", nl "zinnen overschrijven", da "skriv en sætning af", no "skriv av setninger").

**Rejected non-moves:** a-z alphabet on one page (26 cramped rows; duplicates base at lower quality) · cursive numerals (no school teaches them) · Grundschrift (print) · loop/unloop toggle (a unit, not a move) · "tricky letters" / "æ ø å" (a lesson choice inside base, not a new move) · stroke-arrow tracing (no data).

---

## C. Native rebuild ×11

Frames never inflect: this type prints standalone words, pairs, names and whole sentences; **no `objForms` slot is used anywhere**. Every string below is a literal the panel authors.

| loc | literals the panel authors (counts) | slots / forms (existing source) | refusal / re-target | traps |
|---|---|---|---|---|
| en | 6 titles, 6 instructions, 6 levels; lessons 5 (us-trad); 8 join pairs+words; 27 words; 6 sentences | names: `sentences.js` (8); words: vocab singulars lowercased | none | US has no single model: name "Zaner-Bloser-style" in the landing BODY, never the title; "tracing" never the head; en instruction says "dots and crosses" (i, j, t, x) |
| de | 6+6+6; lessons ×2 units (6+6); 8 joins (shared); 27 words; 6 sentences; `unitLabel` va/la | nouns keep capital (`displayWord` keep) | SAS data only (native check) | never mix VA and LA on one page; ß form differs per script (check); Lineatur 2 (Kl. 2) vs 3 (Kl. 3) per face level; "Schreibschrift" capital; never "Schwungübungen/Schönschrift/nachspuren" |
| es | same + lessons 6 | names bank; words lowercase | none (F1 panel confirms) | MX print = "letra script"; "letra ligada" ≡ "letra cursiva" (title "cursiva", meta "ligada"); `ll` `rr` `ñ` are joins; doble raya ruling; toys/boat vocab = "Bote" (MX also "can/jar"; panel may prefer "barco" → `vehicles/boat`?, see F) |
| pt | same + lessons 5 | names | none | BR print = "letra de forma / bastão"; "pontilhado" is letter-tracing's word, write "cursiva pontilhada" only; ç ã õ accents last |
| fr | same + lessons 6 | names (Léa, Chloé, Inès carry accents) | none | Seyès; "Écriture des lettres/mots" are letter/word-tracing's titles, every title carries "cursive(s)"; "graphisme" never a lead; œ avoided in word lists (in font, unverified in hand) |
| it | same + lessons 6 | names | F1 conditional | stampato maiuscolo → minuscolo → corsivo: never "infanzia"; "Pregrafismo" is pre-writing's lead; accents on final vowels last (città) |
| nl | same + lessons 5 | names | none; base band re-target to groep 3 (G1) proposed | "schrijfletters" alone is ambiguous (blokschrift) → every title carries "aan elkaar" or "lopend"; IJ/ij is ONE letter (capital IJ as a pair of capitals); "overtrekken" is letter-tracing's verb |
| sv | – | – | **whole type REFUSED** (hub 0) | – |
| da | same + lessons 6 (dk-uloopet) | names | none | "Bogstavtræning" / "Skriv ordene efter" are tracing titles; "skråskrift" older slanted model: meta only; default loopet vs uloopet is the panel's |
| no | same + lessons 6 | names | none | head "sammenhengende skrift"; the unit is UNLOOPED → never "løkkeskrift"; "stavskrift" = print → never; "Bokstavskriving" / "Spor ord" are tracing titles; bokmål |
| fi | – | – | **whole type REFUSED** (hub 0) | – |

**Ruling per locale (data; the new `primitives/school-ruling.js` draws it, x-band from the unit metric):**
| loc/level | ruling id | lines (top→bottom) | x-band mm (sheet) → px @3.78 | status |
|---|---|---|---|---|
| en G2/G3 | `us-3line` | headline solid · midline dashed · baseline solid · (descender space, no line) | 3.7 → 14 | bands ≈ 1:1:1 matches us-trad (asc/x 1.94, desc/x 1.00) |
| de Kl.2 / Kl.3 | `de-lineatur-2` / `-3` | Oberlinie · obere Mittellinie · Grundlinie · Unterlinie (4 lines, 3 bands; Mittelband tinted `tealSoft`) | 4 / 3.5 → 15 / 13 | equal bands fit VA (1.94/0.97); LA 1.77/0.82 = ascenders reach 88 % of the Oberband: panel accepts or the Oberband is drawn from the LA metric |
| es MX | `mx-doble-raya` | 2 lines bounding the x-band only; ascenders/descenders free in the gap | 3.7 → 14 | SEP "doble raya" (harvest "caligrafia primer grado doble raya") |
| pt BR | `br-caligrafia` | 4 lines, 3 bands, body band tinted | 3.7 → 14 | UNKNOWN exact BR caderno de caligrafia proportions: panel |
| fr CP / CE1 | `fr-seyes-4` / `fr-seyes-3` | Seyès: thick baseline every 4 interlines + 3 thin interlines (+ no margin line) | 1 interline = x: 4 mm → 15 / 3 mm → 11.3 | fr-trad asc 2.71 interlines vs the Seyès 3 convention (-0.29), d = 2.68 (Seyès d = 2): panel judges; x is the hard alignment |
| it prima / seconda | `it-rigatura-prima` / `-seconda` | prima: 4 lines, 3 spaces (central = x); seconda: 2 lines per row | 4 / 3.5 → 15 / 13 | UNKNOWN exact rigatura A/B geometry: panel |
| nl groep 3/4 | `nl-schrijflijnen` | 4 lines (hulplijnen dotted) | 4 / 3.5 → 15 / 13 | method-bound: panel against Pennenstreken |
| da / no | `dk-hjaelpelinjer` / `no-hjelpelinjer` | 4 lines, helper lines dashed | 3.5 → 13 | panel |

---

## D. Data + gates

```js
// data/b6/cursive-writing.js  (locale-neutral; EN block hand-authored, others via apply-b6-locale.js)
const CURSIVE_WRITING = {
  units: { 'us-trad': { family: 'LCS Cursive us-trad', metricKey: 'cursive-us-trad', lift: '' }, /* …15 units, lift = measured lift-after letters */ },
  pictures: [ // OPENED 2026-09-23 (G2-377-pics.png); picOpened:true each
    'animals/cat','animals/duck','animals/fish','animals/owl','animals/pig','animals/sheep','fruits/lemon','fruits/pear',
    'fruits/apple','toys/boat','toys/doll','toys/robot','toys/train','toys/kite','around the house/bed',
    'around the house/chair','around the house/cup','around the house/lamp','classroom/book','zoo animals/lion',
    'pets/mouse','bakery/cake','weather/sun','weather/cloud','animals/horse','animals/zebra','animals/tiger' ],
  excludePictures: ['animals/wolf' /* reads as a husky dog */, 'zoo animals/bear' /* reads as a teddy */],
  en: {
    units: ['us-trad','us-modern'], exemplar: 'us-trad', unitLabel: { 'us-trad': 'cursive' },
    ruling: { G2: 'us-3line', G3: 'us-3line' }, xMm: { G1: 4, G2: 3.7, G3: 3.7 },
    levels: { base:'grade-2', capitals:'grade-2', joins:'grade-2', words:'grade-2', read:'grade-2', copy:'grade-3' },
    lessons: { 'us-trad': [['i','t','u','w'],['e','l','b','h','f','k'],['r','s','j','p'],['a','d','g','o','c','q'],['n','m','x','y','z','v']] },
    joins: [{pair:'ol',word:'doll'},{pair:'ob',word:'robot'},{pair:'ow',word:'owl'},{pair:'or',word:'horse'},
            {pair:'br',word:'bread'},{pair:'ve',word:'five'},{pair:'wi',word:'swim'},{pair:'os',word:'nose'}],
    words: { 'animals/cat':'cat','animals/duck':'duck', /* …27, vocab singular, lowercased except de */ },
    sentences: ['The cat is on the bed.','I can see a red boat.','My dog likes the ball.','We eat a green pear.','The sun is hot today.','Look at the big whale.'],
    strings: { base:{title,instruction}, capitals:{…}, joins:{…}, words:{…}, read:{…}, copy:{…} },
    refused: [] },
  // sv, fi: ABSENT → spec THROWS ("type refused: no national joined script")
};
```

**Per-locale draft sentences (panel refines; 4-6 words, K-3, capital + stop):** de "Die Katze liegt im Bett." · "Ich sehe ein rotes Boot." · "Mein Hund mag den Ball." · "Wir essen eine Birne." · "Die Sonne ist heute warm." · "Der Wal ist sehr groß." — es "El gato está en la cama." · "Veo un barco rojo." · "Mi perro juega con la pelota." · "Comemos una pera verde." · "El sol brilla mucho hoy." · "La ballena es muy grande." — pt "O gato está na cama." · "Eu vejo um barco vermelho." · "Meu cachorro gosta da bola." · "Nós comemos uma pera." · "O sol está quente hoje." · "A baleia é muito grande." — fr "Le chat dort sur le lit." · "Je vois un bateau rouge." · "Mon chien aime le ballon." · "Nous mangeons une poire." · "Le soleil brille ce matin." · "La baleine est très grande." — it "Il gatto dorme sul letto." · "Vedo una barca rossa." · "Il cane gioca con la palla." · "Mangiamo una pera verde." · "Oggi il sole è caldo." · "La balena è molto grande." — nl "De kat ligt op het bed." · "Ik zie een rode boot." · "Mijn hond speelt met de bal." · "Wij eten een peer." · "De zon schijnt vandaag." · "De walvis is heel groot." — da "Katten ligger i sengen." · "Jeg ser en rød båd." · "Min hund leger med bolden." · "Vi spiser en pære." · "Solen skinner i dag." · "Hvalen er meget stor." — no "Katten ligger i senga." · "Jeg ser en rød båt." · "Hunden min leker med ballen." · "Vi spiser en pære." · "Sola skinner i dag." · "Hvalen er veldig stor."
**Words (27 keys, measured vocab singulars):** de Katze Ente Fisch Eule Schwein Schaf Zitrone Birne Apfel Boot Puppe Roboter Zug Drachen Bett Stuhl Tasse Lampe Buch Löwe Maus Kuchen Sonne Wolke Pferd Zebra Tiger · es gato pato pez búho cerdo oveja limón pera manzana bote muñeca robot tren papalote cama silla taza lámpara libro león ratón pastel sol nube caballo cebra tigre · pt gato pato peixe coruja porco ovelha limão pera maçã barco boneca robô trem pipa cama cadeira xícara lâmpada livro leão rato bolo sol nuvem cavalo zebra tigre · fr chat canard poisson hibou cochon mouton citron poire pomme bateau poupée robot train lit chaise tasse lampe livre lion souris gâteau soleil nuage cheval zèbre tigre (kite `cerf-volant` has a hyphen → excluded in fr, 26) · it gatto anatra pesce gufo maiale pecora limone pera mela barca bambola robot treno aquilone letto sedia tazza lampada libro leone topo torta sole nuvola cavallo zebra tigre · nl kat eend vis uil varken schaap citroen peer appel boot pop robot trein vlieger bed stoel kopje lamp boek leeuw muis taart zon wolk paard zebra tijger · da kat and fisk ugle gris får citron pære æble båd dukke robot tog drage seng stol kop lampe bog løve mus kage sol sky hest zebra tiger · no katt and fisk ugle gris sau sitron pære eple båt dukke robot tog drage seng stol kopp lampe bok løve mus kake sol sky hest sebra tiger. F4 initial-letter clashes exist in every locale (e.g. de B: Boot Birne Bett Buch; fr c: chat canard cochon citron chaise cheval; no s: sau sitron seng stol sol sky sebra).

**Validator rules (`tools/validate-b6-draft.js`, cursive block):**
1. Every locale block names `units` ⊆ the 15 `@font-face` units in `cursive-fonts.css`; `exemplar ∈ units`; sv/fi blocks must be ABSENT.
2. Every lesson letter ∈ the locale alphabet; across a unit's lessons each letter appears exactly once; the alphabet is fully covered (a-z + locale letters: de ä ö ü ß · es ñ · da/no æ ø å · pt ç).
3. Lesson capacity: `2·letters·(pitch(unit,x_level)+6) + 44 ≤ 722` for every lesson used at a shipped level.
4. Every join `pair` renders as ONE ink piece in every shipped unit of the locale (canvas components at 200 px minus the count of dot/diacritic pieces of its letters); its first letter ∉ `lift`; `word` contains `pair`.
5. Every `words` key ∈ `pictures`, ∉ `excludePictures`; the value = the vocab singular of that key (display-cased: de keep, else lower), letters only (no space/hyphen), ≤ 8 letters.
6. `sentences` 6 each: 4-6 tokens, first char `\p{Lu}`, last char ∈ `.!?`, no digits, no "free" words.
7. Each string ≤ 150 chars (instruction) / ≤ 70 (title), no worksheet word, no free predicate, no "tracing/nachspuren/overtrekken/pontilhado/tratteggiat/spåra/Bogstavtræning/Bokstavskriving/Spor ord" as the head, no "answer/key/solution" promise.
8. de titles carry exactly one `{U}` resolved to the landing's unit; no title names a script that is not the page's unit (no "løkkeskrift" on `no`, no "stavskrift" anywhere).
9. The base title's letter list (where a title names letters) = lesson 0 of the shipped unit.
10. `levels.<mode>` ∈ the band table's level keys for the locale.
11. Every glyph of every literal is covered by the unit font (fallback-width test in the real renderer).

**Poison cases (each must FAIL; the correct draft is the control):** P1 fr lesson containing `ü` · P2 `e` listed in two us-trad lessons · P3 fr-trad lesson of 6 letters at G1 (stack 1016 > 722) · P4 join `fa` for `dk-uloopet` (2 ink pieces; f ∈ lift) · P5 join word `boat` for pair `ol` · P6 word `cerf-volant` (hyphen) · P7 `animals/wolf` in words · P8 de word `katze` (lowercase noun) · P9 sentence "the cat is on the bed." (lowercase start) · P10 sentence of 7 words · P11 an `sv` block present · P12 unit `fr-moderne2` (not in css) · P13 no title "Løkkeskrift – …" · P14 F4 d2 set with no shared initial letter (pure first-letter solvable) · P15 F4 right column = left rotated by 1 · P16 en instruction "Trace the dashed letters…" (no dashes on the page) · P17 base title "…i, t, u" when lesson 0 is i t u w.

**Render gate `qa/verify-b6-cursive-writing.js` (real pipeline, every shipped unit × face × d1-3, sweep 200 seeds for F3/F4):** every `[data-lcs-cursive]` node: computed `font-family` = the unit family and `document.fonts.check` true; `letter-spacing` 0, `text-transform` none, `font-feature-settings` normal; exactly ONE text node, no child spans; measured ink x-height (unit metric × computed px) = ruling x-band ±1 px; x ≥ 14 (G1) / 11 (G2-3); every write row height ≥ the unit band; trace nodes use `inkSoft`/`grid` only, model nodes `ink`; no two units on one page; pictures ≥ 56 px and ∈ `pictures`; F4: no line/answer printed, derangement not a rotation, the right-column index of the key is uniform within ±10 % pooled over 400 seeds (both directions), ≥ 2 initial-letter clashes per page; 722 and 677 stacks with 0 overflow; `qa/lints.js` clean; the page contains no stroke-arrow element.

---

## E. SEO

Levels: fixed per face per locale (landing `coordinate.level`).
| face (mode) | en | de (unit) | es | pt | fr | it | nl | da | no |
|---|---|---|---|---|---|---|---|---|---|
| base `base` | grade-2 | 2-klasse (va) | segundo | 1-ano | cp | prima | groep-3 | 2-klasse | 3-trinn |
| F1 `capitals` | grade-2 | 2-klasse (la) | segundo | 2-ano | ce1 | seconda | groep-4 | 2-klasse | 3-trinn |
| F2 `joins` | grade-2 | 2-klasse (va) | segundo | 1-ano | cp | prima | groep-3 | 2-klasse | 3-trinn |
| F3 `words` | grade-2 | 2-klasse (la) | segundo | 1-ano | cp | seconda | groep-4 | 2-klasse | 3-trinn |
| F4 `read` | grade-2 | 2-klasse (la) | segundo | 2-ano | cp | seconda | groep-4 | 2-klasse | 3-trinn |
| F5 `copy` | grade-3 | 3-klasse (va) | segundo | 2-ano | ce1 | seconda | groep-4 | 3-klasse | 4-trinn |
(level keys = the locale's taxonomy keys; engineer maps. `coordinate = {type:'cursive-writing', mode, level, theme:''}`; de canonicalDeckSlug = the named unit's deck, the sibling-unit deck linked from the landing.)

**Title patterns (≤70, no worksheet word; panels finalise):**
- Germanic — en: "Cursive Letters: Lowercase i, t, u and w" · "Cursive Capital Letters with Names" · "Cursive Letter Connections: Two-Letter Joins" · "Cursive Words: Write Each Word in One Stroke" · "Reading Cursive: Match the Word to the Picture" · "Cursive Sentences to Copy". de: "Schreibschrift üben: Kleinbuchstaben in {U}" · "Großbuchstaben in Schreibschrift: {U}" · "Buchstabenverbindungen in Schreibschrift ({U})" · "Wörter in Schreibschrift: {U}" · "Schreibschrift lesen: Wort und Bild ({U})" · "Abschreibtext in Schreibschrift ({U})". nl: "Aan elkaar schrijven: kleine letters oefenen" · "Hoofdletters in lopend schrift" · "Letters aan elkaar verbinden" · "Woorden aan elkaar schrijven" · "Lopend schrift lezen: woord bij plaatje" · "Zinnen overschrijven in lopend schrift".
- Romance — es: "Letra cursiva: las vocales en minúscula" · "Letra cursiva mayúscula con nombres" · "Letra ligada: cómo unir las letras en cursiva" · "Palabras en letra cursiva" · "Lectura en letra cursiva: une palabra y dibujo" · "Oraciones en letra cursiva para copiar". pt: "Letra cursiva: as vogais minúsculas" · "Letra cursiva maiúscula com nomes" · "Letra cursiva: ligando as letras" · "Palavras em letra cursiva" · "Leitura em letra cursiva: palavra e figura" · "Da letra de forma para a cursiva: frases". fr: "Écriture cursive CP : les lettres i, u, t" · "Majuscules cursives avec des prénoms" · "Écriture cursive : les liaisons difficiles" · "Écriture cursive : copier des mots" · "Lire l'écriture cursive : le mot et l'image" · "Copier une phrase en écriture cursive". it: "Il corsivo minuscolo: le vocali" · "Corsivo maiuscolo con i nomi" · "Corsivo: legare le lettere" · "Parole in corsivo da scrivere" · "Leggere il corsivo: parola e figura" · "Frasi in corsivo da ricopiare".
- Nordic — da: "Sammenhængende skrift: små bogstaver i, u, t" · "Store bogstaver i sammenhængende skrift" · "Sammenhængende skrift: bind bogstaverne sammen" · "Skriv ord i sammenhængende skrift" · "Læs sammenhængende skrift: ord og billede" · "Skriv en sætning af i sammenhængende skrift". no: "Sammenhengende skrift: små bokstaver i, u, t" · "Store bokstaver i sammenhengende skrift" · "Sammenhengende skrift: bind bokstavene sammen" · "Skriv ord med sammenhengende skrift" · "Les sammenhengende skrift: ord og bilde" · "Skriv av setninger med sammenhengende skrift". sv/fi: none (refused).

**Meta MIDDLEs (en; the child's instruction, inside the 120-170 window with "Free printable {TITLE} … {LEVEL}."):** base "Trace the grey letters, then write each letter on the empty line below" · F1 "Trace each capital letter and the name, then write them on the line below" · F2 "Trace each pair of joined letters and the word, then write them on the line below" · F3 "Trace each word without lifting your pencil, then write it; add the dots and crosses last" · F4 "Read each word in cursive and draw a line to its picture" · F5 "Copy each sentence in cursive on the lines below it". (Engineer measures the 120-170 fit per locale; no MIDDLE promises answers.)

**Non-cannibalisation (est. whole-landing 3-gram Jaccard):** base↔F1 0.12 · base↔F2 0.14 · F2↔F3 0.16 (both "trace…then write") · F3↔F5 0.13 · F4↔all ≤ 0.08 (only closed face) · F3↔word-tracing K-284 0.05 · base↔lowercase-letter-tracing K-278 0.08 · F1↔letter-tracing K-238 0.07 · base↔alphabet-train "cursive alphabet" landing 0.04 after its retitle · de VA↔LA landings of different faces 0.10 (script names differ, face heads differ).

---

## F. Open questions + summary

**Engineer must measure:** (1) extend `tools/measure-font-metrics.js` with the 15 `cursive-<unit>` keys (my scratch numbers above are the expectation; drift > 0.002 = investigate); (2) the canvas ink-piece join test inside the real renderer (area floor tuned so i/j dots and umlauts count as dots, crossbars of F/T/H as pieces); (3) every stack at 722 and 677 per unit × level (fr-trad G1 is the binding case); (4) whether Chromium's SVG `<text>` keeps `calt` shaping (if not, render cursive in HTML spans over the SVG ruling); (5) the 120-170 meta fit per locale; (6) `toys/boat` vs `vehicles/boat` picture for es ("bote").
**Only a native panel can rule:** fr-trad vs fr-moderne and it-trad vs it-moderna (my render-based call: trad in both); da default uloopet vs loopet; de SAS; Lineatur / Seyès / rigatura / doble raya / BR caligrafia / nl / da / no ruling geometry and the ascender tolerance for fr-trad (2.71 vs 3 interlines) and de-la (1.77 vs 2); lesson order and diacritic placement per school method; it and es capitals taught at seconda/segundo; es base year (the SEO panel's heads are "primer grado"; the LOCK says G2, data-only change if the panel rules G1); nl base re-target to groep 3 (G1; demand "schrijfletters groep 3" 13 strings) vs the LOCK's G2; that `no` titles never say løkkeskrift/stavskrift.
**Summary:** 6 faces × 9 locales = **54 landings** (sv 0, fi 0), decks 54 + de's 6 sibling-unit decks = 60; base + capitals + joins + words + copy are open-ended templates, reading-cursive is the one closed face with a derangement + clash gate; the script is the unitAxis; the rulings are data sized from measured Playwrite metrics.
