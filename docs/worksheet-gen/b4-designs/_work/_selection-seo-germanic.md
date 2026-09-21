# nt10-D selection: Germanic native-SEO panel (en US/international · de Grundschule · nl basisschool) - 2026-09-21

Sources read: `_STUDIO-BRIEF.md`, `_CANDIDATES.md`, `_records/candidate-seeds.json`, `_records/harvest-candidates.{en,de,nl}.json` (Google autocomplete, 14 seed requests per candidate per locale; `unique` = distinct suggestions), `docs/SEO/keyword-gaps-de.md` §1 (133 validated July gaps), `frontend/config/topics-taxonomy.json` (`axes['exercise-type']` heads + `axes.theme` slugs). Every quoted string below is verbatim from the harvest; every count is the harvest's `unique` (or my own noise-net count, marked "net").

Method notes the reader must know:
- **The harvest client sat behind a Swedish IP.** All three locales carry location noise ("dominos malmö", "weather stockholm", "mülltrennung schweden", "het weer in zweden"). Where it matters (dominoes, weather, recycling) I give a net count with the noise strings removed by hand; `unique` is the raw number.
- `productiveSeeds` (of 14) is the second signal: a head whose seeds mostly return nothing is not a head teachers type (nl `cloze` 1/14, en `dominoes` 5/14, nl `pronouns` 4/14).
- nl autocomplete is thin across the board (max 42); rank nl candidates against each other, never against en/de raw numbers.
- Tier: A = a genre a teacher searches by name every week · B = real, regular · C = fringe · dead = no native genre in that locale. SERP owner types are from market knowledge; "unknown" where I would be guessing.
- Worksheet-word the engine appends (never in the title): en "worksheet(s)" · de "Arbeitsblatt" · nl "werkblad".

---

## 1 `cloze` (G1-350) - picture-cued noun gap in a sentence

Heads: en **fill in the blank sentences**, "cloze sentences worksheets" (A-; head HARD: Education.com / K5 / Twinkl / TPT; the "cloze" word belongs to the PASSAGE genre, not ours) · de **Lückentext** (singular), "Lückentexte" (A; grundschule-arbeitsblaetter.de / Grundschulkönig / eduki own the bare head; "Lückentext Nomen Klasse 2" WINNABLE) · nl NO K-3 genre head measured: "invulzinnen" returned 0 suggestions, **invuloefening** is secondary-school (werkwoordspelling / Engels / Frans) (C in K-3; panel must re-target the head, e.g. "zinnen aanvullen groep 3", unmeasured).

**en**
- Head: **fill in the blank sentences** (primary); "cloze sentences worksheets" (secondary, teacher register). Seed "cloze" alone is wrong for K-3: its tail is "cloze reading passages 2nd grade", "cloze test", "cloze procedure", "clozemaster" (an app).
- Demand: unique 78, 14/14 seeds productive. Telling: "fill in the blank sentences for kindergarten", "fill in the blank sentences with pictures", "fill in the blank sentences with word bank", "cvc sentences fill in the blank worksheets", "sight word fill in the blank sentences for kindergarten", "fill in the blank sentences 1st grade", "fill in the blank sentences worksheets pdf", "cloze sentences worksheets". Tail reveals: grade qualifiers K/1st/2nd/3rd on every seed; "with pictures" and "with word bank" are the two scaffold sub-genres (both are planned faces); "cvc" and "sight word" are the K sub-genres; "pdf" and "printable" present; "for adults"/"speech therapy"/"funny" = non-K noise.
- Tier A-. SERP: HARD at the head (Education.com "fill in the blank worksheets", K5 Learning cloze, Twinkl, Liveworksheets, TPT). WINNABLE: "fill in the blank sentences with pictures kindergarten", "cvc sentences fill in the blank".
- Faces: (1) with pictures (base) · (2) with word bank · (3) CVC sentences (K) · (4) plural word gap · (5) sight word sentences (only if the noun IS a sight word; else drop) · (6) mini story 3 gaps.
- Traps: US spelling; "fill in the blank" (singular) is the head, "fill in the blanks" secondary; never "cloze passage" (implies a text). No family collision: `opposites` (G1-335 antonym gap) and `verb-forms` (G2-335) carry other heads; `write-the-word` = "Write the Word" (picture label, no sentence).

**de**
- Head: **Lückentext** (primary; singular is what teachers type, plural "Lückentexte" ranks second). NOT "Lückentext Klasse 2 Deutsch" (that is a query with qualifiers, the level slot carries "Klasse 2" and "Deutsch" is redundant on a German page).
- Demand: unique 84, 14/14. Telling: "lückentext klasse 2", "lückentext grundschule", "lückentexte zum ausdrucken", "lückentext deutsch 2 klasse kostenlos", "lückentext 3 klasse deutsch pdf", "lückentext nomen 2. klasse", "lückentext adjektive 2 klasse", "lückentext verben 2 klasse", "lückentext 1 klasse volksschule", "lückentext diktat 2 klasse", "lückentext herbst grundschule", "lückentext märchen zum ausdrucken", "lückentext wasserkreislauf grundschule". Tail reveals: Klasse 1/2/3 all present (Klasse 2 densest); "zum Ausdrucken", "kostenlos", "pdf"; sub-genres by WORD CLASS (Nomen / Adjektive / Verben) and by TOPIC (Herbst, Märchen, Wasserkreislauf, Nationalhymne, Personenbeschreibung); "volksschule" = Austrian traffic; senior/DaF/Englisch noise ~15 strings.
- Tier A. SERP: bare head HARD (grundschule-arbeitsblaetter.de, Grundschulkönig, Materialguru, eduki paid, LearningApps). WINNABLE: "lückentext nomen klasse 2" (our picture-cued NOUN gap is exactly this), "lückentext klasse 1 bilder", seasonal topic faces. Corroboration: gaps §1 has no Lückentext line (not a gap in July's 500-keyword set), but "wasserkreislauf arbeitsblatt grundschule" is a §1 gap and the harvest pairs it with Lückentext twice.
- Faces: (1) Lückentext mit Bildern (base) · (2) mit Wortbank · (3) Nomen einsetzen (Klasse 2, plural gap) · (4) kleine Geschichte (3 Lücken) · (5) Klasse 1 (kurze Sätze, Buchstabenkästchen) · (6) Herbst/Winter theme faces are the wave's theme axis, not faces.
- Traps: capitalise the noun in the gap answer (Klasse 1 children write "Hund"); title never "Lückentext Arbeitsblatt" (engine appends Arbeitsblatt); no collision in `axes['exercise-type']` (nearest: `read-and-do` "Leseaufträge", `sentence-building` "Schüttelsätze").

**nl**
- Head: measured NONE for K-3. "invulzinnen" seed = 0 suggestions; "invuloefening" 10 suggestions, all secondary/NT2. Candidate re-targets (unmeasured, panel decides): "zinnen aanvullen", "woorden invullen in zinnen groep 3", "zinnen afmaken kleuters".
- Demand: unique 10, 1/14 seeds productive. All 10: "invuloefening", "invuloefening engels", "invuloefening franse werkwoorden", "invuloefening hart", "invuloefening maken", "invuloefening signaalwoorden", "invuloefening voorzetsels", "invuloefening werkwoordspelling", "invuloefeningen nederlandse taal", "invuloefeningen spaans". Tail reveals: nothing for groep 3-4; the word is a VO/NT2 register.
- Tier C (as a genre head in K-3 nl). SERP: unknown for the re-targeted head; juf-sites do publish "zinnen afmaken" sheets for groep 3 (jufmilou, Jufsanne) but I have no harvest line to quote.
- Faces: only if the panel re-targets: (1) zinnen aanvullen met plaatjes (base) · (2) met woordkaartjes · (3) meervoud invullen · (4) korte verhaaltje (3 gaten). Do not title anything "invuloefening".
- Traps: de/het of the gap noun is a hidden second answer if the article is printed outside the gap (print the article as part of the given frame, never as a second blank); engine appends "werkblad".

---

## 2 `dominoes` (K-358) - domino sets and chain puzzles

Heads: en **printable dominoes**, "domino worksheets for kindergarten" (B; Twinkl / TPT / Pinterest; only 5/14 seeds productive, pizza noise) · de **Domino Vorlage** (template), **Mathe-Domino / Lesedomino / Anlaut-Domino Klasse 1** (A-; the Legespiel format every Grundschule uses; eduki / Lehrermarktplatz / Worksheet Crafter; WINNABLE at the sub-genres) · nl **Domino printen**, "domino spel kleuters" (B-; kleuteridee / jufmilou / Pinterest; 4/14).

**en**
- Head: **printable dominoes** (primary); "domino worksheets for kindergarten" / "math dominoes worksheets" (secondary). Spell "dominoes" (the "dominos" spelling is the pizza chain).
- Demand: unique 44, 5/14 productive; net of noise ~24 (18 strings are pizza, "domino kindergarten <German town>" and "dominos or dominoes"). Telling: "printable dominoes pdf", "printable dominoes pdf free download", "dominoes for kindergarten", "domino worksheets for kindergarten", "counting dominoes worksheets", "adding with dominoes worksheets", "math dominoes worksheets", "domino kindergarten math", "printable dominoes rules pdf". Tail reveals: the printable SET is the demand ("printable dominoes pdf"), then K math uses (counting, adding); "rules"/"score sheet" = adult game noise.
- Tier B. SERP: head HARD-ish (Twinkl "printable dominoes", TPT, Pinterest, PrintablePaperTemplates); WINNABLE: "counting dominoes worksheets kindergarten", "domino worksheets for kindergarten".
- Faces: (1) picture dominoes set (base) · (2) dot-to-numeral dominoes · (3) word-to-picture dominoes · (4) domino chain, which domino is missing · (5) blank domino template. AVOID an "adding with dominoes" face title: `picture-arithmetic` G1-110 (domino addition, sum box) owns it.
- Traps: "dominoes" plural in the title; US "dominoes" not UK "domino cards"; theme slugs none.

**de**
- Head: **Domino Vorlage** (primary, the template query) and the sub-genre compounds **Mathe-Domino** / **Lesedomino** / **Anlaut-Domino** (secondary, the K-3 teacher's actual words). Seed "domino" alone = pizza.
- Demand: unique 51, 9/14; net ~44 (pizza/Eis/Gutschein/Speisekarte removed). Telling: "domino vorlage zum ausdrucken pdf", "domino vorlage blanko", "domino vorlage leer", "domino vorlage worksheet crafter", "mathe domino klasse 1", "mathe domino zum ausdrucken", "lesedomino klasse 1", "lesedomino klasse 2", "anlaut domino klasse 1", "anlaut domino zum ausdrucken", "einmaleins domino zum ausdrucken", "wörter domino grundschule", "geld domino klasse 2", "domino klasse 1 deutsch". Tail reveals: two markets in one word: (a) the BLANK template ("blanko/leer/word/canva/worksheet crafter" = teachers making their own) and (b) ready Legespiele by subject (Mathe / Lese / Anlaut / Einmaleins / Geld / Wörter / Verben / Wetter / Herbst). Klasse 1 and 2 dominate.
- Tier A- (format demand is large; the raw count under-measures it because the bare seed hits pizza). SERP: "domino vorlage" is owned by template sites (Canva, kribbelbunt, Worksheet Crafter); the subject sub-genres are eduki/Lehrermarktplatz PAID with thin free competition = WINNABLE for "Bilder-Domino Klasse 1", "Lesedomino Klasse 1", "Rechendomino bis 10".
- Faces: (1) Bilder-Domino (base) · (2) Zahlen-Domino (Würfelbild zu Zahl) · (3) Lesedomino (Wort zu Bild) - the single largest de sub-genre, "lesedomino klasse 1/2" · (4) Rechendomino (Würfelbild zu Summe) · (5) Domino-Kette, welcher Stein fehlt · (6) Blanko-Vorlage.
- Traps: the head word "Vorlage" plus the engine's "Arbeitsblatt" reads doubled ("Domino-Vorlage Arbeitsblatt"); put "Vorlage" in the meta, title the FACE ("Lesedomino", "Rechendomino", "Bilder-Domino"). Hyphenate compounds (Lese-Domino is also seen, "Lesedomino" is the harvest's own form). Do not title "Einmaleins-Domino" (`multiplication-tables` owns Kleines Einmaleins) or "Geld-Domino" (`money`). No slug collision.

**nl**
- Head: **Domino printen** (primary); "domino spel kleuters" (secondary).
- Demand: unique 16, 4/14; net ~9 (pizza, "dominos assen/breda/hyllie/kortingscode" removed). Telling: "domino kleuters", "domino spel kleuters", "domino printen", "domino stenen printen", "domino spel printen", "domino kleuterschool". Tail reveals: kleuters only; "stenen printen" = the set; no groep 3-4 line.
- Tier B-. SERP: kleuteridee.nl, jufmilou, Pinterest; WINNABLE (thin field) but small.
- Faces: (1) plaatjesdomino (base) · (2) stippen naar cijfer · (3) woord naar plaatje (groep 3) · (4) welke steen ontbreekt · (5) lege domino.
- Traps: "het domino(spel)"; "domino's" with apostrophe is the pizza brand, plural of the game is "domino's" too, so keep the title singular ("Domino"); engine appends "werkblad".

---

## 3 `human-body` (K-354) - the whole-body figure and body facts

Heads: en **parts of the body**, "body parts worksheets for kindergarten" (A; HARD: Education.com / Twinkl / K5 / ESL sites; `body_parts` THEME slug `body-parts` forces a compound head, use "Parts of the Body" or "Human Body") · de NOT "Körperteile" (that is the theme slug `korperteile`); real type heads **Der Körper** / **Der menschliche Körper**, sub-head "Körperteile beschriften" (A; Grundschulkönig / grundschule-arbeitsblaetter / eduki; DaZ tail WINNABLE) · nl NOT "lichaamsdelen" (theme slug); type head **Het lichaam** / **Het menselijk lichaam**, sub-head "lichaamsdelen benoemen" (A; jufmilou / kleuteridee / Squla; WINNABLE for kleuters).

**en**
- Head: **parts of the body** (primary title form, distinct from the theme slug); "body parts" (secondary, higher raw volume but it IS the theme). Both orders are in the harvest at equal depth.
- Demand: unique 131, 14/14. Telling: "body parts worksheets for kindergarten pdf", "parts of the body worksheets for kindergarten", "body parts printable for kids pdf", "parts of the body flashcards printable", "parts of the body worksheets for grade 1", "parts of the body and their uses for kindergarten", "internal parts of the body grade 3", "body parts printable puzzle", "parts of the body printable chart". Tail reveals: K to grade 3 with K densest; "pdf"/"printable"/"free"; sub-genres: label (worksheet), flashcards/chart (print), "and their uses" (= our body-facts face), "internal/external parts grade 3" (Philippine DepEd "module/ppt" noise ~15 strings), "in spanish/french/swedish" (language-learning).
- Tier A. SERP: HARD at the head (Education.com, Twinkl, K5, Liveworksheets, iSLCollective, SuperSimple). WINNABLE: "parts of the body and their uses kindergarten", "label the body parts worksheet kindergarten", "how many body parts worksheet".
- Faces: (1) label the body (base) · (2) how many (eyes, fingers) · (3) parts and their uses (body facts) · (4) write the word (boxes) · (5) what is missing · (6) color by legend. Keep "internal organs" OUT (grade 3 science, no art).
- Traps: title "Parts of the Body" (slug parts-of-the-body) never "Body Parts" (theme slug body-parts, and `all-about-me` K-344 labels the FACE); US spelling "color".

**de**
- Head: **Der Körper** (primary; harvest: "der körper grundschule", "der körper arbeitsblatt grundschule", "der körper klasse 1") or **Der menschliche Körper** ("der menschliche körper grundschule", "... klasse 1/2/3"); sub-head for the label face: "Körperteile beschriften" (unmeasured phrase, but "körperteile arbeitsblatt klasse 1" is the densest line).
- Demand: unique 88, 14/14. Telling: "körperteile arbeitsblatt grundschule", "körperteile arbeitsblatt klasse 1", "körperteile sachunterricht 1 klasse", "körperteile bilder zum ausdrucken", "bildkarten körperteile zum ausdrucken pdf", "körperteile memory zum ausdrucken", "körperteile puzzle zum ausdrucken", "der menschliche körper grundschule material", "körperteile arbeitsblatt daz", "körperteile arbeitsblatt kindergarten". Tail reveals: Klasse 1 densest, Sachunterricht framing, Kindergarten present; formats: Arbeitsblatt / Bildkarten / Memory / Puzzle; DaZ/DaF/A1 = a second, large audience (5 strings); animal noise (Igel/Hund/Pferd Körperteile, "körperteil blues" song).
- Tier A. SERP: "körperteile arbeitsblatt" HARD (Grundschulkönig Sachunterricht, grundschule-arbeitsblaetter.de, eduki, DaZ islcollective). WINNABLE: "körperteile beschriften klasse 1", "körperteile arbeitsblatt kindergarten", "wie viele körperteile".
- Faces: (1) Körperteile beschriften (base) · (2) Wie viele? · (3) Was fehlt? · (4) Wörter schreiben (Buchstabenkästchen) · (5) Nach Legende ausmalen · (6) Was macht der Körperteil? (Fakten).
- Traps: THEME COLLISION: `axes.theme.body_parts.slug.de = 'korperteile'`, name "Körperteile"; the type title must be "Der Körper" or "Der menschliche Körper" and the exercise-type slug something like `der-koerper`. Noun capitals (Kopf, Arm). Engine appends Arbeitsblatt. `all-about-me` de "Das bin ich" owns the FACE label (K-344).

**nl**
- Head: **Het lichaam** (primary; "het lichaam werkblad", "werkbladen het lichaam", "thema het lichaam kleuters") or **Het menselijk lichaam** ("het menselijk lichaam kleuters"); label sub-head "lichaamsdelen benoemen" ("lichaamsdelen benoemen werkblad", "lichaamsdelen benoemen kleuters").
- Demand: unique 42, 8/14. Telling: "lichaamsdelen kleuters", "werkblad lichaamsdelen kleuters", "lichaamsdelen benoemen werkblad", "het lichaam werkblad", "thema het lichaam kleuters", "lichaamsdelen groep 3", "kaartjes lichaamsdelen kleuters", "werkblad het lichaam nt2", "bingo lichaamsdelen kleuters". Tail reveals: kleuters densest, groep 3-4 present; NT2; book-title noise (Bill Bryson, Van der Kolk, Coppens ~8 strings). Net ~32.
- Tier A (for a nl kleuter thema). SERP: jufmilou, kleuteridee.nl, Jufsanne, Pinterest, Squla; WINNABLE for "werkblad lichaamsdelen benoemen kleuters".
- Faces: (1) lichaamsdelen benoemen (base) · (2) hoeveel? · (3) wat ontbreekt? · (4) schrijf het woord · (5) kleur volgens de legenda · (6) wat doe je ermee? (feiten).
- Traps: THEME COLLISION: `axes.theme.body_parts.slug.nl = 'lichaamsdelen'`; type title "Het lichaam" (het-woord), slug `het-lichaam`. de/het: het oog, het oor, de neus, de mond, de hand, de voet; print the article with the word bank. Engine appends "werkblad".

---

## 4 `five-senses` (K-355) - object to sense organ

Heads: en **five senses** / "5 senses worksheets for kindergarten" (A; HARD: Education.com / Twinkl / TPT; sort face WINNABLE) · de **Die fünf Sinne** (K/1) and **Sinnesorgane** (Klasse 2-3 Sachunterricht word) (A; Grundschulkönig / eduki; BOTH lines are July §1 gaps: "die 5 sinne grundschule arbeitsblatt", "sinnesorgane arbeitsblätter grundschule kostenlos"; WINNABLE) · nl **De vijf zintuigen**, "zintuigen kleuters / werkblad zintuigen groep 3" (A-; jufmilou / kleuteridee / Schooltv; WINNABLE).

**en**
- Head: **five senses** (title) with "5 senses" as the equal-volume numeral form (use it in the meta); secondary "five senses sort".
- Demand: unique 113, 14/14. Telling: "5 senses worksheets for kindergarten pdf", "five senses worksheets for preschool", "5 senses printable free pdf", "5 senses worksheet 2nd grade", "five senses worksheets for grade 1", "5 sense organs grade 3", "5 senses printable book for preschool", "5 senses kindergarten activities printable". Tail reveals: preschool/K densest, grade 1-3 present; "pdf/printable/free"; sub-genres: worksheet, printable book, "sense organs" (grade 3 label face), anchor chart; noise: "5 senses gift", "grounding technique", "five senses coffee/spa/santorini" (~12 strings).
- Tier A. SERP: HARD (Education.com, Twinkl, TPT, Pinterest, SuperSimple). WINNABLE: "five senses sort worksheet", "which sense worksheet kindergarten", "5 sense organs worksheet grade 3".
- Faces: (1) match object to sense (base) · (2) five senses sort (5 bins) · (3) which sense? circle · (4) label the sense organs · (5) odd one out by sense · (6) "I can hear..." writing lanes.
- Traps: "five senses" is not a theme slug (`emotions`/`body_parts` are the neighbours); title "Five Senses", never "5 Senses Worksheet"; US spelling.

**de**
- Head: **Die fünf Sinne** (primary; K + Klasse 1-2: "die fünf sinne klasse 1", "die fünf sinne arbeitsblatt", "die fünf sinne grundschule") and **Sinnesorgane** (secondary head for the organ-label face: "sinnesorgane arbeitsblatt", "sinnesorgane grundschule klasse 2/3", "klassenarbeit sinnesorgane klasse 3").
- Demand: unique 57, 13/14. Telling: "die fünf sinne arbeitsblatt", "die fünf sinne grundschule", "die fünf sinne klasse 1", "sinnesorgane arbeitsblatt pdf", "arbeitsblatt sinnesorgane klasse 2", "sinnesorgane grundschule klasse 3", "sinnesorgane zum ausdrucken", "bilder sinnesorgane zum ausdrucken", "die fünf sinne unterrichtsmaterial". Tail reveals: two registers by grade (fünf Sinne = Klasse 1-2; Sinnesorgane = Klasse 2-3, Klassenarbeit/Test); "zum ausdrucken"/"pdf"; animal noise (Hund/Katze/Hai/Insekten Sinnesorgane ~7 strings); song/Fingerspiel.
- Tier A. SERP: Grundschulkönig, grundschule-arbeitsblaetter.de, eduki, Planet Schule; head moderately HARD, faces WINNABLE. Corroborated by two July §1 gap lines (above).
- Faces: (1) Gegenstand zum Sinn zuordnen (base) · (2) Nach Sinnen sortieren (5 Kästen) · (3) Welcher Sinn? einkreisen · (4) Sinnesorgane beschriften (Klasse 2-3, the "Sinnesorgane" head) · (5) Was passt nicht? · (6) "Ich höre ..." Schreibzeilen.
- Traps: "Die fünf Sinne" keeps the article and "fünf" lowercase, "Sinne" capital; "Sinnesorgane" is the title of face 4 only. Engine appends Arbeitsblatt. No family collision (`science-match` = "Sachunterricht-Zuordnen").

**nl**
- Head: **De vijf zintuigen** (primary; "de vijf zintuigen" carries the noise but "zintuigen kleuters", "werkblad zintuigen groep 3/4/5", "zintuigen werkblad" carry the school demand); secondary **Zintuigen**.
- Demand: unique 41, 7/14; net ~30 (Anubis/Efteling/Rembrandt/pubquiz/zintuigentuin removed). Telling: "werkblad zintuigen kleuters", "werkblad zintuigen groep 3", "werkblad zintuigen groep 4", "zintuigen kleuters", "thema zintuigen kleuters", "proefjes zintuigen groep 3", "les over zintuigen groep 3", "zintuigen spel kleuters". Tail reveals: kleuters and groep 3-5 evenly; "werkblad" explicit; proefjes/les/lied around it (a thema, so hub traffic).
- Tier A-. SERP: jufmilou, kleuteridee, Schooltv/Huisje Boompje Beestje, Squla, Wikikids; WINNABLE for "werkblad zintuigen groep 3".
- Faces: (1) voorwerp bij het zintuig (base) · (2) sorteren in 5 vakken · (3) welk zintuig? omcirkel · (4) zintuigen benoemen (oog, oor, neus, tong, hand) · (5) welke hoort er niet bij · (6) "Ik hoor ..." schrijflijnen.
- Traps: "het zintuig / de zintuigen"; keep "vijf" (never the numeral in a nl title); engine appends "werkblad"; `odd-one-out` nl "Welke Hoort Er Niet Thuis" is a family head, so face 5 title must add "zintuig".

---

## 5 `weather` (K-356) - symbols, words, temperature bands, water cycle

Heads: en **weather chart** (the dominant printable sub-genre) and **weather symbols** / "weather worksheets for kindergarten" (A; HARD: Education.com / Twinkl / TPT; `weather` THEME slug forces a compound title) · de **Wettersymbole** (compound, theme slug `wetter`), secondary **Wetter beobachten** and **Wasserkreislauf** (A; Grundschulkönig / Ideenreise / Frau Locke / Materialwiese named IN the harvest; "wasserkreislauf arbeitsblatt grundschule" is a July §1 gap; faces WINNABLE) · nl **Weersymbolen** (compound; theme slug `weer`), "werkblad het weer groep 3" (B+; jufmilou / kleuteridee / Schooltv; WINNABLE).

**en**
- Head: **weather chart** (primary; 43 of the 129 strings start "weather chart"), **weather symbols** (title for the base: "weather symbols for grade 2"), "weather worksheets for kindergarten" (secondary).
- Demand: unique 129, 14/14; net ~117 (city/today/tomorrow/Chartres noise removed). Telling: "weather chart kindergarten printable", "weather chart preschool printable", "weather chart printable pdf", "weather chart for 7 days", "weather chart worksheet grade 1", "weather symbols for grade 2", "weather words 1st grade", "weather graph kindergarten", "weather journal 2nd grade", "weather observation chart grade 3", "weather printable flashcards", "weather worksheets for kindergarten". Tail reveals: CHART (weekly/7-day/classroom/observation) is the printable genre; symbols and words are grade 1-2; "graph" = data (owned by `graphing-data` G1-146/147, keep off); "journal" grade 2; "map" = middle school noise; "wild/severe weather" grade 2 science.
- Tier A. SERP: HARD (Education.com, Twinkl, TPT, Pinterest, PreKinders). WINNABLE: "weather symbols worksheet grade 2", "weather chart printable for 7 days kindergarten", "weather words worksheet 1st grade".
- Faces: (1) weather symbols to words (base) · (2) write the weather word · (3) weekly weather chart (open diary, the "7 days" query) · (4) thermometer band to picture (hot/warm/cold band, NOT the number-reading face `measurement` G3-345 owns) · (5) label the water cycle · (6) circle the true weather sentence.
- Traps: THEME COLLISION `axes.theme.weather.slug.en='weather'`; title "Weather Symbols" (base) / "Weather Chart" (diary face), never bare "Weather"; K-211 hot/cold in `science-sort` owns the hot/cold picture sort, so face 4 must read a thermometer BAND.

**de**
- Head: **Wettersymbole** (primary; 25 of 95 strings; "wettersymbole grundschule arbeitsblatt", "wettersymbole zum ausdrucken", "wettersymbole klasse 1/2/3"); **Wetter beobachten** (diary face: "wetter beobachten klasse 1", "wetter beobachten klasse 2"); **Wasserkreislauf** (face 5; July §1 gap + harvest under cloze "lückentext wasserkreislauf grundschule", "wasserkreislauf arbeitsblatt lückentext").
- Demand: unique 95, 14/14; net ~86 (Göteborg/Hamburg/Kopenhagen/Malmö/Schweden/Stockholm/Vimmerby/morgen/wetteronline removed). Telling: "wettersymbole grundschule arbeitsblatt", "wettersymbole zum ausdrucken kostenlos", "wettersymbole kinder zum ausdrucken", "wettersymbole wind grundschule", "wettersymbole niederschlag", "wetter arbeitsblatt klasse 1", "wetter arbeitsblatt daz", "wetter beobachten klasse 2", "wetter klasse 2 sachunterricht", "bildkarten wetter zum ausdrucken", "wetter memory zum ausdrucken", "wetter grundschule ideenreise", "wetter grundschule frau locke", "wetter grundschule materialwiese". Tail reveals: Klasse 1-3 all present (Klasse 2 = the Sachunterricht Wetter unit); "zum ausdrucken/kostenlos/pdf"; sub-genres: Symbole (with Wind/Niederschlag/Nebel sub-symbols), Beobachten (diary), Bildkarten/Memory (print), Klassenarbeit/Test (Klasse 2-3), DaZ; blog owners typed BY NAME (Ideenreise, Frau Locke, Materialwiese, Grundschulkönig).
- Tier A. SERP: head HARD (the four named blogs + eduki + Grundschulkönig); WINNABLE: "wettersymbole klasse 1 arbeitsblatt", "wetter beobachten arbeitsblatt klasse 1", "wasserkreislauf arbeitsblatt klasse 2 beschriften".
- Faces: (1) Wettersymbole zuordnen (base) · (2) Wetterwörter schreiben · (3) Wetter beobachten, eine Woche (diary) · (4) Thermometer: warm oder kalt (band) · (5) Wasserkreislauf beschriften · (6) Welcher Wettersatz stimmt?
- Traps: THEME COLLISION `axes.theme.weather.slug.de='wetter'`, name "Wetter": type title "Wettersymbole", never "Wetter"; vocab adjectives ("Sonnig") are citation forms, the panel writes "Es ist sonnig." / "Die Sonne scheint."; `calendar` G2-277 owns the month grid, `graphing-data` G1-146 the count table; engine appends Arbeitsblatt.

**nl**
- Head: **Weersymbolen** (primary compound; "weersymbolen kleuterklas" is the only school line, the rest is Buienradar/KMI/iPhone noise) and the diary sub-head **Het weer bijhouden** (unmeasured phrase; the measured lines are "werkblad het weer groep 3", "werkboekje het weer groep 3/4", "het weer kleuters").
- Demand: unique 36, 7/14; net ~27 (Gothenburg/Kopenhagen/Nederland/Zweden ×2/Malmö/morgen/Stockholm removed). Telling: "het weer kleuters", "werkblad het weer kleuters", "werkblad het weer groep 3", "werkboekje het weer groep 3", "werkboekje het weer groep 4", "thema het weer groep 3/4/5", "weersymbolen kleuterklas", "werkblad het weer nt2". Tail reveals: kleuters + groep 3-4 (the Schooltv thema); "werkboekje" = multi-page demand; symbols exist but are app noise; NT2.
- Tier B+. SERP: jufmilou, kleuteridee, Schooltv, Pinterest; WINNABLE for "werkblad het weer groep 3".
- Faces: (1) weersymbolen bij het woord (base) · (2) schrijf het weerwoord · (3) het weer bijhouden, een week · (4) thermometer: warm of koud · (5) de waterkringloop benoemen (groep 4-5) · (6) welke weerzin klopt?
- Traps: THEME COLLISION `axes.theme.weather.slug.nl='weer'`, name "Weer": title "Weersymbolen", never "Het weer"; "de zon, de regen, de wind, de sneeuw, het onweer"; engine appends "werkblad".

---

## 6 `tangram` (K-353) - the 7-tan set

Heads: en **tangram puzzles printable**, "tangram printable template" (A-; Twinkl / Pinterest / TPT; the "with answers" tail is WINNABLE) · de **Tangram Vorlage**, **Tangram Figuren** (A-; kribbelbunt / Grundschulkönig / eduki / Pinterest; "mit lösungen" WINNABLE) · nl **Tangram printen**, "tangram figuren printen / tangram puzzel werkblad" (B+; jufmilou / kleuteridee / Pinterest; WINNABLE).

**en**
- Head: **tangram puzzles** (primary; "tangram puzzles printable pdf with answers" is the deepest chain in the whole en harvest) with **tangram printable template** for the set page.
- Demand: unique 72, 13/14; net ~66 ("tangram mall/pussel" Swedish leak, "tangram heightmapper/regal" removed). Telling: "tangram puzzles printable pdf free download with answers", "tangram printable template pdf", "tangram puzzles for kids", "tangram worksheets for kindergarten", "tangram shapes with 7 pieces", "tangram animals for kindergarten", "tangram patterns for kindergarten", "tangram activities for 1st grade", "tangram printable black and white". Tail reveals: "with answers" (7 strings) = the answer key IS the product; "template" = the 7-piece set; "animals"/"patterns"/"shapes" = silhouette sub-genres; grades K to 3; "for adults" noise.
- Tier A-. SERP: moderately HARD (Twinkl, Pinterest, TPT, tangram-channel, Math Salamanders). WINNABLE: "tangram puzzles printable pdf with answers kindergarten", "tangram animals printable".
- Faces: (1) template + 2 outlines (base) · (2) build with 2-3 tans by legend · (3) four silhouettes (animals) · (4) which tan is missing · (5) match silhouette to solution · (6) count the triangles and squares.
- Traps: "tangram" singular in the title, "puzzles" plural; `shapes` is a THEME slug but "Tangram" is not, so no compound needed; `geometry` family = "Geometry" (no collision); US "color".

**de**
- Head: **Tangram Vorlage** (primary; "tangram vorlage zum ausdrucken pdf", "tangram vorlagen kostenlos", "tangram vorlage einfach") and **Tangram Figuren** (secondary; "tangram figuren grundschule", "tangram-figuren mit lösungen", "tangram vorlagen tiere").
- Demand: unique 49, 10/14; net ~47 ("tangram bubendorf" = a Swiss shop, "tangram online"). Telling: "tangram vorlage zum ausdrucken pdf", "tangram vorlagen mit lösungen kostenlos", "tangram figuren grundschule", "tangram vorlagen tiere", "tangram vorlagen originalgröße", "tangram klasse 1", "tangram arbeitsblatt grundschule", "einfache tangram 1 klasse", "tangram formen 2 klasse", "unterrichtsentwurf tangram 1 klasse". Tail reveals: Klasse 1-2 densest (3 and 4 present); "mit Lösungen" (answer key), "Tiere" (animal silhouettes), "einfach" (easy = our 2-3-tan face), "Originalgröße" (the set must print true-size), Unterrichtsentwurf (student-teacher traffic).
- Tier A-. SERP: kribbelbunt, Grundschulkönig, eduki, Pinterest, Kinder-Malvorlagen; WINNABLE for "tangram vorlage mit lösungen klasse 1", "einfache tangram figuren".
- Faces: (1) Tangram-Vorlage + 2 Umrisse (base) · (2) Einfache Figuren aus 2-3 Teilen · (3) Vier Tiere (Silhouetten) · (4) Welches Teil fehlt? · (5) Figur zur Lösung zuordnen · (6) Dreiecke und Quadrate zählen.
- Traps: correct orthography is "Tangram-Vorlage"/"Tangram-Figuren" (hyphen; Google folds it); "Vorlage" + engine "Arbeitsblatt" doubles, so title face 1 "Tangram-Figuren legen" and keep "Vorlage" in the meta; nouns capitalised (Dreieck, Quadrat, Parallelogramm).

**nl**
- Head: **Tangram printen** (primary; "tangram printen", "tangram figuren printen", "tangram puzzel printen", "tangram stukken printen") and **Tangram puzzel** (secondary; "tangram puzzel werkblad", "tangram puzzel groep 3").
- Demand: unique 24, 7/14; net ~18 (Eijsden/Kortrijk/Nesselande/Purmerend/Vilvoorde/tangramkat removed). Telling: "tangram figuren printen", "tangram puzzel werkblad", "tangram werkblad groep 3", "tangram kleuters", "tangram voorbeelden kleuters", "tangram stukken printen", "tangram groep 4". Tail reveals: kleuters and groep 3-4; "voorbeelden" = silhouette sheets; "stukken" = the set.
- Tier B+. SERP: jufmilou, kleuteridee, Pinterest, Jufsanne; WINNABLE (thin field).
- Faces: (1) tangram stukken + 2 figuren (base) · (2) makkelijke figuren met 2-3 stukken · (3) vier dieren · (4) welk stuk ontbreekt? · (5) figuur bij de oplossing · (6) driehoeken en vierkanten tellen.
- Traps: "de tangram" (common usage); "printen" is the nl print verb (never "afdrukken" in a title, teachers type "printen"); engine appends "werkblad".

---

## 7 `recycling` (K-357) - waste to bin by material

Heads: en **recycling sorting** ("recycling sort worksheet", "recycling sorting activity printable") (B+; Twinkl / Education.com / TPT; WINNABLE for kindergarten) · de **Mülltrennung**, "Müll richtig trennen" (A; Grundschulkönig / eduki / Klett / municipal Abfallwirtschaft; "mülltrennung arbeitsblatt grundschule" is a July §1 gap; WINNABLE) · nl **Afval scheiden** (NL), "afval sorteren" (BE-leaning) (B; Milieu Centraal / gemeenten / jufmilou; WINNABLE for kleuters, thin).

**en**
- Head: **recycling sorting** (primary; "recycling sort worksheet", "recycling sorting activity printable", "recycling sorting worksheets for kindergarten"); "recycling worksheets for kindergarten" (secondary).
- Demand: unique 89, 10/14; net ~70 (center/near me/Stockholm/Uppsala/jobs/coupons/plastic-number strings removed). Telling: "recycling sort worksheet", "recycling sorting activity printable", "recycling sorting game printable free", "recycling sorting worksheets for kindergarten", "recycling worksheets for kindergarten", "recycling worksheets for preschool", "recycling printable pictures", "recycling grade 3 worksheets", "recycling worksheets pdf free download". Tail reveals: K/preschool densest, grade 1-3 as "project ideas" (not worksheets); "sort/sorting" is the verb of the genre; "game printable" = cut-and-sort cards; "bins" (home) and "how to sort" (adult) noise.
- Tier B+. SERP: Twinkl "recycling sorting activity", Education.com, TPT, Pinterest; WINNABLE: "recycling sorting worksheet kindergarten", "which bin worksheet".
- Faces: (1) sort into the bins (base) · (2) which bin? circle · (3) write the material word · (4) odd one out by material · (5) color the bins by legend · (6) "three things I recycle" writing.
- Traps: US bin set (paper / plastic and metal / glass or "trash"), title "Recycling Sort" not "Recycling" alone (adult intent); `science-sort` K-214 natural/man-made and K-212 wants/needs are the neighbours, never a material sort; US "color".

**de**
- Head: **Mülltrennung** (primary; 40+ of 67 strings); **Müll richtig trennen** (secondary; "müll richtig trennen arbeitsblatt", "müll richtig trennen grundschule").
- Demand: unique 67, 13/14; net ~55 (Schweden ×6, Stockholm, Dänemark, Italien, Kroatien, Österreich, "in schweden" removed). Telling: "mülltrennung arbeitsblatt grundschule", "mülltrennung klasse 1 arbeitsblatt", "arbeitsblatt mülltrennung 2 klasse kostenlos", "mülltrennung arbeitsblatt kindergarten", "müll richtig trennen arbeitsblatt", "mülltrennung bilder zum ausdrucken kostenlos", "mülltrennung schilder zum ausdrucken kostenlos", "mülltrennung grundschule pdf", "mülltrennung sachunterricht 1 klasse", "mülltrennung arbeitsblatt klett", "eduki mülltrennung klasse 1". Tail reveals: Klasse 1-3 plus Kindergarten; "zum ausdrucken/kostenlos/pdf"; sub-genres: Bilder (picture cards), Schilder/Symbole/Aufkleber (bin signs), Übersicht (chart); Klett/eduki owners typed by name.
- Tier A. SERP: Grundschulkönig, eduki (paid), Klett, city waste companies (Berliner Stadtreinigung etc.), Umweltbundesamt kids; WINNABLE for "mülltrennung arbeitsblatt klasse 1 kostenlos", "müll richtig trennen klasse 2".
- Faces: (1) Müll in die Tonnen sortieren (base; gelbe Tonne / Papier / Bio / Glas / Restmüll) · (2) Welche Tonne? einkreisen · (3) Material schreiben (Papier, Glas, Plastik) · (4) Was passt nicht? · (5) Tonnen nach Legende ausmalen · (6) "Drei Dinge, die ich trenne" Schreibzeilen.
- Traps: the bin colours are locale literals (gelb/blau/braun/grün/schwarz vary by Landkreis; the panel names the bins by MATERIAL first and colour second); nouns capital; "Mülltrennung" + engine "Arbeitsblatt" is exactly the top query, good; no family collision (`science-sort` = "Sachunterricht-Sortieren", `sorting-categories` = "Sortieren und Ordnen").

**nl**
- Head: **Afval scheiden** (primary, the Dutch national term: "afval scheiden kleuters", "afval scheiden werkblad", "afval scheiden groep 3"); **Afval sorteren** (secondary; more Flemish: "afval sorteren belgië/antwerpen", "afval sorteren werkblad", "afval sorteren spel").
- Demand: unique 26, 7/14; net ~12 (Duitsland/Frankrijk ×2/Italië/Oostenrijk/Spanje/Zweden ×2/Kroatië/Antwerpen/België/thuis/prullenbak strings removed). Telling: "afval scheiden kleuters", "afval scheiden werkblad", "afval scheiden groep 3", "thema afval sorteren kleuters", "afval sorteren kleuters", "afval sorteren werkblad", "afval sorteren spel", "afval scheiden prullenbak 2 bakken". Tail reveals: kleuters + groep 3; "spel" (cut-and-sort); the country tail is travellers, not teachers.
- Tier B. SERP: Milieu Centraal, gemeente pages, jufmilou/kleuteridee, Pinterest; WINNABLE (thin) for "werkblad afval scheiden kleuters".
- Faces: (1) afval in de juiste bak (base; papier / PMD / gft / glas / restafval) · (2) welke bak? omcirkel · (3) schrijf het materiaal · (4) welke hoort er niet bij · (5) kleur de bakken volgens de legenda · (6) "drie dingen die ik scheid".
- Traps: NL bins are PMD/gft/papier/glas/rest (Belgium says PMD too, "gft" vs "groenafval"); "de bak, het glas, het papier, de plastic fles"; title "Afval scheiden" (NL) with "afval sorteren" in the meta; engine appends "werkblad".

---

## 8 `odd-and-even` (G1-351) - parity, pairs, last-digit rule

Heads: en **odd and even numbers** / "even and odd worksheets" (A; HARD: K5 / Education.com / Math-Drills / Twinkl; "grade 1 pdf with answers" and "1 to 100" faces WINNABLE) · de **Gerade und ungerade Zahlen** (A; Frau Locke and PIKAS typed by name, Grundschulkönig, grundschule-arbeitsblaetter; "bis 20 / bis 100" faces WINNABLE) · nl **Even en oneven getallen** (B+; Squla / Sommenfabriek / rekenen-oefenen; "werkblad even en oneven getallen groep 3/4" WINNABLE).

**en**
- Head: **odd and even numbers** (primary title; both orders are equally deep, "even and odd" is the classroom phrase, "odd and even numbers" the search phrase with "numbers").
- Demand: unique 123, 14/14. Telling: "odd and even numbers worksheet grade 1 pdf", "odd and even numbers worksheet grade 1 pdf with answers", "even and odd worksheets 2nd grade", "odd and even numbers 1 to 100", "even and odd number chart printable", "odd and even numbers worksheets for kindergarten pdf", "even and odd numbers free printable worksheets", "odd and even numbers worksheet grade 3 pdf with answers", "teaching even and odd numbers to kindergarten". Tail reveals: K to grade 3 with grade 1-2 densest; "pdf", "with answers" (answer key), "chart printable" (100-chart, owned by `number-charts` G1-130, keep off), "anchor chart"; brand noise ("even and odd" clothing/riesling ~6 strings, "odd even number program").
- Tier A. SERP: HARD (K5 Learning, Education.com, Math-Drills, Twinkl, SplashLearn). WINNABLE: "odd and even numbers worksheet grade 1 pdf with answers", "odd and even numbers 1 to 100 worksheet", "even and odd kindergarten worksheet pairs".
- Faces: (1) odd house / even house sort with ten-frame cues (base) · (2) pair proof "7 = 3 pairs + 1" · (3) can two friends share fairly? · (4) last-digit rule to 100 (the "1 to 100" query) · (5) parity of sums · (6) to 999 (PARAM).
- Traps: K-016 in `counting-pictures` (pair pictures, circle odd/even) and G2-218 in `number-charts` (odd hunt grid) own the picture-pair and grid faces; title "Odd and Even Numbers" not "Even and Odd" (the theme-free head); US spelling.

**de**
- Head: **Gerade und ungerade Zahlen** (primary; the full phrase is what teachers type); "gerade ungerade Zahlen" (secondary short form).
- Demand: unique 50, 12/14; net ~44 (Kalenderwoche/Tipico/Autobahn/Funktion/Woche 2026-27 removed). Telling: "gerade und ungerade zahlen arbeitsblatt klasse 1", "gerade und ungerade zahlen bis 20 arbeitsblatt", "arbeitsblatt gerade ungerade zahlen bis 100", "gerade und ungerade zahlen klasse 2 arbeitsblätter", "gerade und ungerade zahlen grundschule einführung", "gerade und ungerade zahlen erklären 1 klasse", "gerade und ungerade zahlen frau locke", "gerade und ungerade zahlen klasse 1 pikas", "erklärvideo gerade und ungerade zahlen klasse 1". Tail reveals: Klasse 1 densest (Einführung), Klasse 2-3 present; RANGE sub-genres "bis 20" and "bis 100" (exactly our faces 1-3 vs 4); "erklären/Einführung" (parents and Referendare); owners typed by name: Frau Locke, PIKAS.
- Tier A. SERP: HARD at the head (Frau Locke, PIKAS/DZLM, Grundschulkönig, grundschule-arbeitsblaetter.de, Mathe-im-Netz); WINNABLE: "gerade und ungerade zahlen bis 20 arbeitsblatt", "bis 100 arbeitsblatt klasse 2".
- Faces: (1) Gerade oder ungerade? Haus-Sortierung mit Zehnerfeld (base, bis 20) · (2) Paare bilden: 7 = 3 Paare + 1 · (3) Können zwei Kinder gerecht teilen? · (4) Bis 100: die Endziffer entscheidet · (5) Summen: gerade oder ungerade, ohne zu rechnen · (6) Bis 999 (PARAM).
- Traps: "gerade" lowercase, "Zahlen" capital; "Paare" not "Pärchen"; range words "bis 20/bis 100" in the FACE title are the winning qualifiers (the sv/de landing pattern is range-led); engine appends Arbeitsblatt; `doubles-halves` "Verdoppeln und Halbieren" must not be echoed.

**nl**
- Head: **Even en oneven getallen** (primary; always with "getallen", bare "even en oneven" = weeks/film noise).
- Demand: unique 21, 10/14; net ~14 (weken ×4, film, Bud Spencer, functies removed). Telling: "even en oneven getallen werkblad", "werkblad even en oneven getallen groep 3", "werkblad even en oneven getallen groep 4", "even en oneven getallen kleuters", "even en oneven getallen oefenen", "even en oneven getallen uitleg", "verschil even en oneven getallen". Tail reveals: groep 3-4 (the SLO placement) plus kleuters; "werkblad" explicit twice with a groep; no range words in nl autocomplete.
- Tier B+. SERP: Squla, Sommenfabriek, rekenen-oefenen.nl, Junior Einstein, jufmilou; WINNABLE for "werkblad even en oneven getallen groep 3".
- Faces: (1) even of oneven? huisjes met tienraam (base, tot 20) · (2) paren maken: 7 = 3 paren + 1 · (3) eerlijk delen met z'n tweeën? · (4) tot 100: kijk naar de laatste cijfer · (5) sommen: even of oneven · (6) tot 999 (PARAM).
- Traps: "het getal / de getallen"; "even" not "gelijk"; "tot 20 / tot 100" as face qualifiers; engine appends "werkblad"; `counting-frames` nl "Tienraam" is a family head (the base uses it as apparatus only, never in the title).

---

## 9 `rounding` (G2-346) - the rule, nearest ten and hundred, estimate

Heads: en **rounding to the nearest 10**, "rounding numbers worksheets" (A at grade 2-3; HARD: K5 / Math-Drills / Super Teacher / Education.com; "with number line" and "nearest 10 and 100" faces WINNABLE) · de **Zahlen runden** (bare "Runden" is Excel/Nürburgring), "Runden Klasse 3" (A at Klasse 3; Grundschulkönig / grundschule-arbeitsblaetter / Mathe-im-Netz; "auf Zehner/Hunderter runden Klasse 3" WINNABLE) · nl **Afronden op tientallen** (bare "afronden" is Excel) (A- at groep 5-6; Sommenfabriek / rekenen-oefenen / Squla / Junior Einstein; "werkblad afronden op tientallen" WINNABLE).

**en**
- Head: **rounding to the nearest 10** (primary; 40+ of 82 strings), **rounding numbers** (secondary, the family word).
- Demand: unique 82, 12/14. Telling: "rounding to the nearest 10 worksheet", "rounding to the nearest 10 worksheet with answers grade 2", "rounding to the nearest 10 worksheet with number line", "rounding to the nearest 10 and 100 3rd grade", "rounding to the nearest 10 100 and 1000 worksheets pdf", "rounding numbers 3rd grade worksheets pdf", "rounding to the nearest 10 2nd grade", "rounding to the nearest 100 worksheet with answers", "rounding numbers grade 3 worksheets with answers". Tail reveals: grade 2 (nearest 10) and grade 3 (10 and 100) = our band exactly; grade 4-7 and "nearest 1000" above ceiling; "with answers" (answer key) on 10 strings; "with number line" is a scaffold face; "rounding to the nearest tenth 3rd grade" = teachers mis-typing "ten" (target it in the meta, never the title); Excel/calculator noise.
- Tier A. SERP: HARD (K5, Math-Drills, Super Teacher Worksheets, Education.com, Math Salamanders). WINNABLE: "rounding to the nearest 10 worksheet with number line", "rounding to the nearest 10 and 100 worksheet with answers 3rd grade".
- Faces: (1) round to the nearest 10, write it (base, G2) · (2) up or down? sort (the rule, the 5 case) · (3) nearest 100 (PARAM, G3) · (4) round then estimate the sum · (5) which numbers round to 50? · (6) nearest 10 and 100 (PARAM).
- Traps: "nearest 10" with the numeral is the search form, "nearest ten" the classroom form (title "Rounding to the Nearest 10", meta both); `number-lines` G2-221/G3-323 own the dot-on-a-line circle face, so a "with number line" face may only be an open scaffold, not the answer mechanism; US spelling.

**de**
- Head: **Zahlen runden** (primary; "zahlen runden arbeitsblatt 3 klasse", "zahlen runden grundschule", "zahlen runden klasse 3 pdf"); **Runden Klasse 3** (secondary; "runden 3 klasse arbeitsblätter kostenlos", "runden klasse 3 übungen pdf"). Bare "Runden" = Excel/Nürburgring/Pool.
- Demand: unique 67, 12/14; net ~52 (Excel ×4, Nordschleife ×2, Pool/Mörtelkübel/Kuchen, Strategiespiel, Rundenzähler, Dezimalzahlen, Zehntausender removed). Telling: "runden arbeitsblatt grundschule", "zahlen runden arbeitsblatt 3 klasse", "runden 3 klasse arbeitsblätter kostenlos", "runden grundschule einführung", "runden arbeitsblatt mit lösungen", "zahlen runden klasse 3 pdf", "runden klasse 3 einstieg", "runden klasse 2", "zahlen runden 2 klasse", "runden 3 klasse volksschule". Tail reveals: Klasse 3 is the centre (Zahlenraum bis 1000, our ≤999), Klasse 2 present but thin (2 strings), Klasse 4-5 above ceiling; "mit Lösungen", "pdf", "kostenlos", "Einführung/Einstieg" (Referendare).
- Tier A (Klasse 3). SERP: Grundschulkönig, grundschule-arbeitsblaetter.de, Mathe-im-Netz, eduki; HARD at "runden klasse 3", WINNABLE at the sub-genres "auf Zehner runden Klasse 3", "auf Hunderter runden Arbeitsblatt", "runden und überschlagen". July §2 already maps "runden und überschlag klasse 3" to the halfway-harbors activity; a printable face 4 (Überschlag) adds the sheet that query wants.
- Faces: (1) Auf Zehner runden (base) · (2) Aufrunden oder abrunden? (die 5-Regel) · (3) Auf Hunderter runden (PARAM) · (4) Runden und überschlagen (Summe schätzen) · (5) Welche Zahlen runden auf 50? · (6) Auf Zehner und Hunderter (PARAM).
- Traps: "Zehner/Hunderter" capital nouns; "Zahlen runden" as title (never bare "Runden"); de band = Klasse 3, so the G2 base must be labelled "Klasse 2/3" honestly (the Klasse 2 demand is 2 strings); engine appends Arbeitsblatt; `number-lines` de "Zahlenstrahl" is the neighbour family.

**nl**
- Head: **Afronden op tientallen** (primary; "afronden op tientallen werkblad", "werkblad afronden op tientallen", "wat is afronden op tientallen"); **Afronden op tientallen en honderdtallen** (secondary, the groep 5-6 form). Bare "afronden" = Excel/Rabobank/decimalen.
- Demand: unique 31, 5/14; net ~20 (Excel ×6, decimalen ×3, Rabobank, synoniem, engels, groep 8/kommagetallen removed). Telling: "afronden op tientallen werkblad", "werkblad afronden op tientallen en honderdtallen", "afronden op tientallen honderdtallen en duizendtallen werkblad", "afronden groep 5", "werkblad afronden op honderdtallen", "werkblad afronden getallen", "afronden werkblad groep 6". Tail reveals: groep 5-6 (SLO places afronden op tientallen in groep 5, our G3), "werkblad" typed on 9 strings, the three-tier "tientallen, honderdtallen en duizendtallen" (duizendtallen above ceiling); no groep 4 line.
- Tier A- (groep 5). SERP: Sommenfabriek, rekenen-oefenen.nl, Squla, Junior Einstein, Redactiesommen; WINNABLE for "werkblad afronden op tientallen groep 5".
- Faces: (1) afronden op tientallen (base) · (2) naar boven of naar beneden? (de 5-regel) · (3) afronden op honderdtallen (PARAM) · (4) afronden en schatten (som) · (5) welke getallen ronden af op 50? · (6) tientallen en honderdtallen (PARAM).
- Traps: "het tiental / de tientallen"; the nl base must carry the groep 5 level (G3), not groep 4, or it lands off-curriculum; never "afronden" alone; engine appends "werkblad".

---

## 10 `pronouns` (G1-352) - person pronouns from names and pictures

Heads: en **personal pronouns** / **pronouns worksheets grade 1**, faces **subject pronouns** and **possessive pronouns** (A; K5 / Education.com / ESL sites; "subject pronouns kindergarten he she it" WINNABLE) · de **Personalpronomen** (Klasse 2-3), "Pronomen Klasse 3" (A; grundschule-arbeitsblaetter.de / Grundschulkönig / eduki / DaZ; "Personalpronomen einsetzen Klasse 2" WINNABLE) · nl **Persoonlijke voornaamwoorden** but the measured tail is groep 6-8 (C in K-3; Junior Einstein / Squla / taal-oefenen; the panel re-targets to a groep 4 "hij, zij, het" face, unmeasured).

**en**
- Head: **personal pronouns** (primary; 46 strings) and **pronouns** (secondary, 60 strings but broader); face heads **subject pronouns** ("subject pronouns kindergarten worksheets", "subject pronouns 1st grade") and **possessive pronouns** ("possessive pronouns 1st grade worksheets", "possessive pronouns 2nd grade worksheets").
- Demand: unique 123, 14/14. Telling: "personal pronouns worksheets for grade 1", "personal pronouns worksheet grade 2", "pronouns 1st grade worksheet", "pronouns worksheets for grade 1", "subject pronouns kindergarten worksheets", "possessive pronouns 1st grade worksheets", "pronouns kindergarten worksheet", "personal pronouns printable worksheet", "reflexive pronouns 2nd grade worksheet". Tail reveals: K to grade 3 dense; "with answers"/"pdf"; sub-genres by pronoun class (subject / possessive / reflexive / indefinite); ESL ("personal pronouns kids esl", "in spanish/german/swedish"); "pronouns in instagram/gender" noise (~4).
- Tier A. SERP: HARD (K5 Learning, Education.com, iSLCollective, Liveworksheets, Twinkl). WINNABLE: "subject pronouns kindergarten worksheet he she it they", "replace the noun with a pronoun worksheet 1st grade", "possessive pronouns worksheet 1st grade pictures".
- Faces: (1) he / she / they, circle (base) · (2) replace the name (word bank) · (3) who is "he"? line to the person · (4) possessive pronouns (his / her / their) · (5) sort the name cards · (6) rewrite the sentence on school lines.
- Traps: title "Personal Pronouns" (base) and "Possessive Pronouns" (face 4) are two search heads, keep both; `word-classes` = "Word Classes", `articles` = "Articles", no collision; US spelling; "they" singular for a group picture only (never for one person on a K-3 sheet).

**de**
- Head: **Personalpronomen** (primary; 48 strings: "personalpronomen grundschule arbeitsblatt", "personalpronomen einsetzen 3 klasse", "personalpronomen klasse 2", "personalpronomen übungen 2 klasse"); **Pronomen** (secondary; "pronomen klasse 3", "pronomen grundschule übungen pdf", "pronomen 3 klasse übungsblätter").
- Demand: unique 96, 14/14. Telling: "personalpronomen grundschule arbeitsblatt", "personalpronomen einsetzen grundschule", "personalpronomen 3 klasse übungsblätter pdf", "personalpronomen deutsch 2 klasse", "einführung personalpronomen klasse 2", "pronomen klasse 3 übungen pdf", "pronomen arbeitsblatt grundschule", "personalpronomen arbeitsblatt daz", "pronomen 3 klasse test". Tail reveals: Klasse 3 is the centre (Wortart Pronomen in most Lehrpläne), Klasse 2 = "Einführung/einsetzen" (our base), Klasse 1 thin (2 strings); "einsetzen" (fill in) is the verb of the genre = our replace-the-name face; DaZ/A1 heavy (~8 strings); foreign-language noise (Englisch/Französisch/Latein/Spanisch ~12); "Akkusativ/Dativ" = secondary school.
- Tier A. SERP: grundschule-arbeitsblaetter.de, Grundschulkönig, eduki, Materialguru, iSLCollective (DaZ); HARD at "pronomen klasse 3", WINNABLE at "personalpronomen einsetzen klasse 2 arbeitsblatt", "personalpronomen grundschule bilder".
- Faces: (1) er / sie / es, einkreisen (base, Klasse 2) · (2) Namen ersetzen: Personalpronomen einsetzen (word bank) · (3) Wer ist "er"? Linie zum Kind · (4) Possessivpronomen (sein / ihr) · (5) Namenkarten sortieren · (6) Satz mit Pronomen abschreiben.
- Traps: nouns capital ("Personalpronomen", plural = singular); older Grundschule term "Fürwörter"/"persönliche Fürwörter" appears in NO harvest line, do not use; "es" for Mädchen/Kind is grammatical but the panel tags the depicted person; the `articles` family "Der, die, das" and `verb-forms` (G2-335 prints pronoun columns as labels) are neighbours, not head collisions; engine appends Arbeitsblatt; possessives in de Grundschule are usually taught as "besitzanzeigende Fürwörter/Possessivartikel" at Klasse 3-4, so face 4 sits at G3.

**nl**
- Head: **Persoonlijke voornaamwoorden** (primary, correct term) but the measured demand is upper primary; K-3 re-target (unmeasured, panel decides): "hij, zij of het", "woorden vervangen door hij of zij groep 4".
- Demand: unique 27, 4/14; net ~10 (Duits/Engels/Frans/Italiaans/Latijn/Spaans ×9, LinkedIn/Instagram/gender/non-binair ×4 removed). Telling: "persoonlijke voornaamwoorden werkblad", "werkblad persoonlijke voornaamwoorden groep 6", "werkblad persoonlijke voornaamwoorden groep 7", "werkblad voornaamwoorden groep 8", "bezittelijke voornaamwoorden werkblad", "aanwijzende voornaamwoorden werkblad", "voornaamwoorden oefenen". Tail reveals: groep 6-8 only (taalkundig ontleden); "bezittelijke" (possessive) exists as a face word; NO groep 3-4 line.
- Tier C in K-3 (A at groep 6-8, above our ceiling). SERP: Junior Einstein, Squla, taal-oefenen.nl, Cambiumned; unknown for a groep 4 re-target.
- Faces: (1) hij / zij / het, omcirkel (base) · (2) vervang de naam · (3) wie is "hij"? · (4) bezittelijke voornaamwoorden (zijn / haar) · (5) naamkaartjes sorteren · (6) zin overschrijven.
- Traps: "het meisje" takes "zij" in practice (natural gender wins in speech; the panel must rule how a groep 4 sheet treats it); title never "voornaamwoorden" alone (ontleed-register); engine appends "werkblad"; a nl landing must say "groep 4" honestly and expect little traffic.

---

## Spares

### 11 `question-words`

Heads: en **wh questions** / **question words worksheets** (A-; ESL + speech-therapy owned: iSLCollective / ESL Printables / Twinkl; "wh questions worksheets for kindergarten pdf" WINNABLE) · de **W-Fragen**, **Fragewörter** (A-; grundschule-arbeitsblaetter / Grundschultante typed by name / eduki / DaF islcollective; "w-fragen grundschule arbeitsblatt" WINNABLE) · nl **Vraagzinnen maken** (groep 4), **Vraagwoorden** (B; unknown owners; "werkblad vraagzinnen maken groep 4" WINNABLE, thin).

- en: unique 99, 14/14. Telling: "wh questions worksheets for kindergarten pdf", "question words worksheets for grade 1", "wh questions worksheet first grade", "question words kindergarten worksheets", "wh questions for kids", "wh questions speech therapy", "question words worksheets for esl beginners", "what are the 5 question words". Tail: K to grade 3; ESL and speech-therapy are half the market; "in spanish/german/hindi/arabic" noise ~6.
- de: unique 64, 13/14; net ~50 (Englisch/Französisch/Spanisch/Italienisch/Schwedisch/Journalismus ~14 removed). Telling: "w-fragen grundschule arbeitsblatt", "fragewörter arbeitsblatt grundschule", "w fragen klasse 1", "w fragen klasse 2", "fragewörter deutsch klasse 2", "w fragen deutsch 3 klasse", "fragewörter einführen grundschultante", "w fragen notruf arbeitsblatt", "w fragen unfallbericht grundschule". Tail: Klasse 1-3; the Klasse 3-4 "Bericht/Notruf" genre is a different (text) task; DaF A1 heavy.
- nl: unique 27, 6/14; net ~14 (Duits/Engels/Frans/Spaans ×9 removed). Telling: "vraagzinnen maken groep 4", "werkblad vraagzinnen maken groep 4", "vraagwoorden kleuters", "vraagwoorden werkblad", "werkblad vraagwoorden nt2", "vraagzinnen oefenen". Tail: groep 4 and NT2; a real (small) K-3 line, unlike pronouns.
- Traps: en "wh questions" head belongs to ESL; de "W-Fragen" with hyphen and capital W; nl "de vraagzin". Buildability with ONE answer (wer/was/wo from a picture) is the pedagogy panel's call, not mine.

### 12 `cube-nets`

Heads: en **nets of 3d shapes**, "cube net template" (dead for K-3: the worksheet tail is UK year 5/6, "11 plus", Corbettmaths; the template is a craft download) · de **Würfelnetze** (A at Klasse 3; Grundschulkönig / PIKAS / Ideenreise / Mathe-im-Netz; "würfelnetze arbeitsblätter zum ausdrucken" is a July §1 gap; WINNABLE) · nl **Bouwplaat kubus**, "uitslag kubus werkblad" (C; groep 6+; unknown owners).

- en: unique 40, 6/14. Telling: "nets of 3d shapes worksheet with answers pdf", "nets of 3d shapes worksheet year 5", "cube nets 11 plus", "cube net template printable", "cube net printable a4". Tail: UK KS2 and craft; no K-3 US line ("grade 4/5" only). Noise: Netflix/Netherlands/networks.
- de: unique 70, 13/14; net ~66. Telling: "würfelnetze klasse 3", "würfelnetze zum ausdrucken", "11 würfelnetze zum ausdrucken", "würfelnetze arbeitsblatt mit lösungen", "würfelnetze erkennen", "würfelnetze klasse 3 gegenüberliegende seiten", "würfelnetz basteln grundschule", "würfelnetze grundschule ideenreise", "würfelnetze pikas", "würfelnetze klasse 2". Tail: Klasse 3 centre (Klasse 2 and 4 present), "mit Lösungen", "erkennen" (which of these is a net = one-answer task), "gegenüberliegende Seiten" (opposite faces = a second one-answer task), "basteln" (craft). This is the strongest single de spare, above tangram (49) and odd-and-even (50) in de alone, and corroborated in July.
- nl: unique 13, 6/14. Telling: "bouwplaat kubus printen", "uitslag kubus werkblad", "uitslag kubus vouwen", "bouwplaat kubus werkblad". Tail: craft + groep 6-8 meetkunde; "kubuswoning bouwplaat" (Rotterdam architecture) noise.
- Verdict: a de-led (and, by the log, fr 44 / pt 39) G3 genre; in en and nl it sits above the K-3 ceiling. Not a swap candidate for the 11-locale wave; a future de/fr/pt-only G3 add if single-locale types are ever allowed.

### 13 `finger-counting`

Heads: en **finger counting worksheets** (C; "finger counting worksheets for kindergarten", "finger counting worksheet pdf", "finger math worksheets"; meme/gif/China noise is half the list) · de **Fingerbilder** (C+; "fingerbilder bis 10 arbeitsblatt", "fingerbilder zum ausdrucken", "fingerbilder mathe klasse 1"; unique 18, 5/14, but every string is school; a clean small niche) · nl **Vingers tellen** (C; "vingers tellen kleuters", "werkblad vingers tellen"; unique 11, 4/14).

- Verdict: C in all three; de "Fingerbilder" is a real Klasse 1 apparatus word (Zahlbilder) but the demand is a tenth of the ten candidates. No swap.

---

## Closing

### (a) Rank of the ten by measured + expert demand across en + de + nl

| rank | key | en unique (net) | de unique (net) | nl unique (net) | sum | tiers en/de/nl | note |
|---|---|---|---|---|---|---|---|
| 1 | human-body | 131 | 88 | 42 (32) | 261 | A / A / A | theme-slug collision in ALL THREE locales (body-parts / korperteile / lichaamsdelen) - compound heads mandatory |
| 2 | weather | 129 (117) | 95 (86) | 36 (27) | 260 | A / A / B+ | theme-slug collision in all three - "Weather Symbols" / "Wettersymbole" / "Weersymbolen" |
| 3 | pronouns | 123 | 96 | 27 (10) | 246 | A / A / C | nl demand is groep 6-8; nl face re-target needed |
| 4 | five-senses | 113 | 57 | 41 (30) | 211 | A / A / A- | two July de gap lines; cleanest SERP of the science trio |
| 5 | odd-and-even | 123 | 50 (44) | 21 (14) | 194 | A / A / B+ | range faces (bis 20 / bis 100) are the de winners |
| 6 | recycling | 89 (70) | 67 (55) | 26 (12) | 182 | B+ / A / B | July de gap line; nl thin |
| 7 | rounding | 82 | 67 (52) | 31 (20) | 180 | A / A / A- | band honesty: de Klasse 3, nl groep 5 |
| 8 | cloze | 78 | 84 | 10 (0 K-3) | 172 | A- / A / C-dead | nl has no measured K-3 head |
| 9 | tangram | 72 (66) | 49 (47) | 24 (18) | 145 | A- / A- / B+ | "with answers / mit Lösungen" = the answer key sells it |
| 10 | dominoes | 44 (24) | 51 (44) | 16 (9) | 111 | B / A- / B- | raw count under-measures de (pizza on the bare seed); Lesedomino / Rechendomino are the real de heads |

Spares: question-words 99 / 64 (50) / 27 (14) = 190 (A- / A- / B) · cube-nets 40 / 70 (66) / 13 = 123 (dead-K3 / A / C) · finger-counting 36 / 18 / 11 = 65 (C / C+ / C).

### (b) Swap recommendation, with numbers

- **No forced swap.** The weakest of the ten on Germanic numbers is `dominoes` (111 raw, ~77 net), and the strongest spare is `question-words` (190 raw, ~163 net): on measured demand alone question-words beats dominoes in en (99 vs 44), de (64 vs 51) and nl (27 vs 16), and also beats tangram (145) and cloze (172) on the raw sum.
- Why I still do not recommend the swap: (1) `dominoes` is language-light and the ONLY K math game format in the ten (the candidate list already spent the spelling-practice slot on it); its de demand is structurally under-counted because the bare seed "domino" returns pizza, while "lesedomino klasse 1/2", "mathe domino klasse 1/2/3", "anlaut domino" show a format German teachers search by subject every week; (2) `question-words` is half ESL/speech-therapy in en and its one-answer buildability (wer/was/wo from a picture) is unproven; the pedagogy panel must rule before it can displace anything. **If the operator wants the swap anyway: question-words IN for dominoes OUT** is the only one the numbers support. Swapping OUT cloze is wrong (de 84 = Tier A; only nl is dead). Cube-nets (de 70) is the best de-only spare and should be filed as a future G3 de/fr/pt type, not swapped in (en and nl above ceiling).
- nl flags for the design phase, not swaps: `cloze` nl needs a re-targeted head (0 measured); `pronouns` nl must be labelled groep 4 with a "hij/zij/het" face and expects C-tier traffic.

### (c) Honest click estimate per landing per day at maturity (Tier-A winnable 3-8 · B 1-3 · C <1; a HARD head halves the base landing, faces carry it)

| key | en | de | nl |
|---|---|---|---|
| cloze | 2-4 (head HARD; picture/CVC faces) | 3-6 | <1 (re-targeted head) |
| dominoes | 1-2 | 2-4 (Lesedomino/Rechendomino faces) | <1-1 |
| human-body | 2-5 (head HARD; label + facts faces) | 3-6 | 2-4 |
| five-senses | 2-5 (head HARD; sort face) | 3-6 (July gap) | 2-3 |
| weather | 2-5 (chart + symbols faces) | 3-6 (blog-owned head; Beobachten + Wasserkreislauf faces) | 1-3 |
| tangram | 3-5 ("with answers") | 3-5 ("mit Lösungen") | 1-2 |
| recycling | 1-3 | 3-6 (July gap) | <1-1 |
| odd-and-even | 2-4 (head HARD; "grade 1 pdf with answers", "1 to 100") | 3-6 (bis 20 / bis 100) | 1-3 |
| rounding | 2-4 (head HARD; number-line and 10-and-100 faces) | 3-6 (Klasse 3) | 2-3 (groep 5) |
| pronouns | 2-4 (head HARD; subject / possessive faces) | 3-6 (einsetzen Klasse 2/3) | <1 |

Read these as order-of-magnitude bands at catalogue maturity with the wave's theme fan-out behind them, not forecasts; the en column assumes the long-tail face titles in (d), not the bare head.

### (d) en: HARD heads and the long-tail face that still wins

| candidate | head owners (market knowledge) | long-tail face that wins |
|---|---|---|
| cloze | Education.com "fill in the blank worksheets", K5 cloze, Twinkl, Liveworksheets, TPT | "fill in the blank sentences with pictures kindergarten" · "cvc sentences fill in the blank" · "fill in the blank sentences with word bank 1st grade" |
| dominoes | Twinkl "printable dominoes", TPT, Pinterest | "counting dominoes worksheets kindergarten" · "printable dominoes pdf pictures" |
| human-body | Education.com, Twinkl, K5, Liveworksheets, iSLCollective | "parts of the body and their uses kindergarten worksheet" · "label the parts of the body worksheet kindergarten pdf" · "how many body parts worksheet" |
| five-senses | Education.com, Twinkl, TPT, Pinterest | "five senses sort worksheet kindergarten" · "which sense worksheet" · "5 sense organs worksheet grade 3" |
| weather | Education.com, Twinkl, TPT, Pinterest, PreKinders | "weather symbols worksheet grade 2" · "weather chart printable for 7 days kindergarten" · "weather words worksheet 1st grade" · "water cycle label worksheet 2nd grade" |
| tangram | Twinkl, Pinterest, TPT, Math Salamanders | "tangram puzzles printable pdf with answers kindergarten" · "tangram animals printable" · "easy tangram puzzles 2 pieces" |
| recycling | Twinkl, Education.com, TPT | "recycling sorting worksheet kindergarten" · "which bin worksheet" · "recycling sorting game printable free" |
| odd-and-even | K5, Education.com, Math-Drills, Twinkl, SplashLearn | "odd and even numbers worksheet grade 1 pdf with answers" · "odd and even numbers 1 to 100 worksheet" · "even and odd kindergarten worksheet pairs" |
| rounding | K5, Math-Drills, Super Teacher Worksheets, Education.com | "rounding to the nearest 10 worksheet with number line" · "rounding to the nearest 10 and 100 worksheet with answers 3rd grade" · "which numbers round to 50" |
| pronouns | K5, Education.com, iSLCollective, Liveworksheets, Twinkl | "subject pronouns kindergarten worksheet he she it they" · "replace the noun with a pronoun worksheet 1st grade" · "possessive pronouns worksheet 1st grade" |

Standing en rules from this harvest: "pdf" and "with answers" appear on every math head (ship the answer key and say so in the meta); "printable" beats "worksheet" on the K/preschool heads (dominoes, tangram, weather chart, body parts, five senses); the "grade 3 module/ppt/lesson plan" strings are Philippine DepEd traffic and are not worksheet demand.
