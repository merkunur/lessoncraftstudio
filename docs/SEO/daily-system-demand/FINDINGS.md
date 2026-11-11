# Daily Teaching System — what the demand harvest says (2026-11-11)

Part 0.3 of `docs/daily-teaching-system/PLAN.md`. Source: Google autocomplete, 532 lookups per market in 11 markets (en = United States, es = Mexico, pt = Brazil), five surfaces. Probe lists: `scripts/seo-research/daily-system-seeds.json`. Full per-market lists: `report.<loc>.md`. Counts: `summary.json`.

## How to read this

- **Autocomplete has no volumes.** It shows which phrasings people really type, how wide a phrase's tail is, and which words they add. "Strong" below means a wide, on-topic tail; it is not a click estimate.
- **The probes were written by the build session, not by native reviewers.** A market where a surface looks empty may have a search word I did not probe. Before a part drops a page type in a market on this evidence, its native reviewer is asked for the words teachers there use, and those words are probed.
- **I read the head tables, the added words and the first answers of every head in every market. I did not read all ~15,000 phrases.** The part that builds a market's pages reads that market's full report first (the Level Set hub lesson: a phrase that names one word is a word question, not a theme).
- Known noise: Danish "matematik test" is also Turkish and its tail is mostly Turkish; German "Lesehefte" is dominated by a classics publisher; Dutch "invaller" is football and crosswords; English "sub tub" is a sandwich; Dutch and Italian "mini books" are toy and Disney books.

## The five surfaces across the markets

Strength: ●●● wide on-topic tail · ●● real but narrower · ● a few phrases · ○ nothing a teacher types (with my probes).

| Market | Lesson plans, units, year plans | National curriculum | Tests | Substitute packs | First readers |
|---|---|---|---|---|---|
| en (US) | ●●● | ●●● | ●●● | ●●● | ●●● |
| de | ●●● | ●●● | ●●● | ●●● | ●●● |
| fr | ●●● | ●●● | ●●● | ●● | ●●● |
| es (MX) | ●●● | ●●● | ●●● | ● (as review booklets ●●●) | ●●● |
| pt (BR) | ●●● | ●●● | ●●● | ● | ●●● |
| it | ●●● | ●●● | ●●● | ● | ●● |
| nl | ●● | ●●● | ●●● | ○ | ●● |
| sv | ●● | ●● | ●● | ○ | ● |
| da | ●● | ●● | ●● | ○ | ●● |
| no | ●● | ●●● | ●● | ○ | ● |
| fi | ● (templates only) | ●● | ●● | ○ | ● |

## What teachers call each thing (the words the pages must use)

### 1. Units, lesson plans, year plans

| Market | The lesson-plan word | The year-plan word | What rides on it |
|---|---|---|---|
| en | "kindergarten / first grade lesson plans"; nobody types "math unit" | "scope and sequence", "pacing guide", "curriculum map" | pdf, free, "for the whole year", "first week of school", homeschool, template; "phonics scope and sequence" is very wide but half of it names a published programme |
| de | "Unterrichtseinheit Grundschule" (by topic: Wetter, Gedichte, Kinderrechte), "Unterrichtsentwurf Mathe Klasse N" | "Stoffverteilungsplan Mathe / Deutsch Klasse N", "Jahresplanung", "Wochenplan Grundschule Vorlage" | the Klasse; the textbook (Flex und Flo, Welt der Zahl, Einstern); the state (BW, Sachsen, Bayern); "Vorlage" |
| fr | "séquence CP / maternelle" (by topic), "cahier journal" | "programmation CP", "progression CE1" | the school year ("2026 2027"), "nouveaux programmes", période |
| es (MX) | "planeación primer grado / preescolar", "secuencia didáctica", "proyectos primer grado" | "dosificación", "planeación … primer trimestre" | NEM, pdf, gratis, descargar, word, the trimester and the month |
| pt (BR) | "plano de aula" (educação infantil above all), "sequência didática" | "planejamento anual" | "de acordo com a BNCC", "pronto", pdf, word, "por bimestre" |
| it | "UDA classe prima" (unità di apprendimento), "progettazione didattica" | "programmazione annuale classe prima" | word, "secondo le nuove indicazioni", the subject, the school year |
| nl | "thema kleuters" (very wide, by theme), "lesplan" (general word, not school-specific) | "jaarplanning groep 3" — always with a method name (Pluspunt, Staal, WIG) | the theme; the method |
| sv | "lektionsplanering", "pedagogisk planering (mall)", "tema förskoleklass" | "terminsplanering / grovplanering åk 1", "årshjul" | mall (template), the subject |
| da | "undervisningsforløb", "forløb 1. klasse / indskoling" | "årsplan dansk / matematik N. klasse", "ugeplan" | the klasse and the subject; the publisher |
| no | "undervisningsopplegg (1. trinn)" | "årsplan norsk / matematikk N. trinn" | the trinn and the subject |
| fi | "tuntisuunnitelma", "jaksosuunnitelma" — typed as a template (pohja, malli, esimerkki), never with a grade | "vuosisuunnitelma (pohja)" | Finnish autocomplete is thin on every surface; the grade-specific phrases I probed returned nothing |

Reading:
- **The search word is "lesson plans" (in each language), not "unit".** A unit page is found through its lesson plans and its year plan. Its title leads with the lesson-plan word and the grade.
- **Year plans are searched by grade and subject everywhere.** In Germany and the Netherlands they are usually tied to a textbook method; ours cannot answer those, so the page targets the method-free phrase.
- **Templates are a large share of this demand** (Vorlage, mall, template, word). A blank weekly and yearly planning template is a cheap extra that a unit hub could carry. Not in the plan; recorded as a candidate for Part 4.
- **Mexico plans by project and by trimester** under the Nueva Escuela Mexicana. A Mexican unit needs the project framing and the trimester label to be found at all.
- **Theme units for the youngest are the widest Dutch phrase** ("thema kleuters") and a clear Swedish one ("tema förskoleklass").

### 2. National curriculum

- **Mostly people looking for the official text** (pdf, the ministry's name: eduscol, udir, skolverket, SLO). A page of ours will not outrank the ministry for those, and should not try.
- **Where a page of ours has a real job:** a per-grade list of objectives or a checklist with content behind each line. Typed that way in the US ("kindergarten standards checklist", by state), Brazil ("habilidades BNCC 1º ano", "códigos BNCC"; teachers type the codes themselves: ef01ma01, ef01lp02), Italy ("obiettivi di apprendimento classe prima", by quadrimestre), France ("attendus de fin de CP"), the Netherlands ("doelen groep 4", "SLO doelen groep 3", "leerlijn rekenen groep 3"), Norway ("kompetansemål etter 2. trinn"), Mexico ("PDA primer grado", "contenidos y PDA fase 3").
- **Germany and the US search by state.** German curriculum phrases almost always carry Bayern, NRW, Sachsen, Hessen or Thüringen; the national KMK standards are typed, but far less. US phrases carry California, Georgia, Ohio, Texas (TEKS).
- **Three curricula are visibly in transition** in what teachers type: France ("nouveaux programmes 2025 / 2026"), Italy ("nuove indicazioni nazionali 2026"), Denmark ("nye fagplaner"). Part 2 must establish the version in force for each.

### 3. Tests

The strongest and most uniform surface. In every market measured, teachers type a test word with a grade, a time of year and "pdf".

| Market | The words | Time-of-year words |
|---|---|---|
| en | "kindergarten assessment (test)", "first grade math assessment", "phonics assessment", "sight word assessment", "kindergarten readiness assessment" | "beginning of the year", "mid year", "end of year". "Pre and post test" returns nothing; "benchmark" is thin |
| de | "Lernstandserhebung Klasse 1", "Mathe Test Klasse 2 zum Ausdrucken", "Lernzielkontrolle Mathe Klasse 2", "Klassenarbeit Mathe Klasse 2", in Bavaria "Probe" | by topic (Uhrzeit, Einmaleins, Zahlenraum bis 100), "Eingangsdiagnostik Klasse 1" |
| fr | "évaluation CP / CE1 (à imprimer pdf)", "évaluation diagnostique CP" | "début d'année", "fin d'année", "période 1–5", by trimestre |
| es (MX) | "examen diagnóstico primer grado", "evaluación diagnóstica", "examen trimestral" | "primer trimestre", "con respuestas", the school year |
| pt (BR) | "avaliação diagnóstica 1º ano", "sondagem (de escrita)", "simulado 2º ano", "prova" | "bimestre", "para imprimir" |
| it | "prove d'ingresso classe prima", "verifiche matematica classe seconda", "prove intermedie", "prove finali" | "primo / secondo quadrimestre", "con soluzioni" |
| nl | "toets groep 3", "toets rekenen", "tempotoets rekenen" — and above all practice for the official tests ("cito oefenen groep 3 werkbladen gratis", IEP) | "midden", "eind" |
| sv | almost only the official material ("bedömningsstöd", "Hitta matematiken", "nationella prov åk 3"); "diagnos matematik åk N" exists | — |
| da | "læsetest 1. klasse", "matematik test N. klasse"; official test names | — |
| no | "kartleggingsprøve 1. trinn" (the official one), "halvårsprøve matematikk", "leseprøve" | "halvårs-" |
| fi | "matematiikan koe N. luokka", "lukutesti N. luokka", "alkukartoitus (esiopetus)"; a published test by name (ALLU) | "syksy", "kevät" |

Reading:
- **English names:** "beginning-of-year / mid-year / end-of-year assessment" and "<skill> assessment". The plan's working words "benchmark" and "pre-test / post-test" are not what teachers type; they stay as internal names.
- **Topic tests are a real search in Germany, France, Italy and Mexico.** That is the unit check of Part 7, found on its own, so a unit check needs its own findable name on the unit page.
- **"With answers" is typed** (con respuestas, con soluzioni, mit Lösungen). The ruling keeps keys Teacher-only; the page must say plainly that the key exists and is part of the Teacher plan, never imply it is open.
- **Sweden, Norway, Denmark and the Netherlands mostly search their official tests by name.** Our checks must not use those names. In those markets the honest face is "practice" or "check before the official test", and expectations for search traffic are low.

### 4. Substitute packs

- **en:** strong and exactly as planned: "emergency sub plans" by grade, "no prep sub plans", "sub plans template", and "sub binder" (template, cover, checklist). The class-information sheets in the plan are that binder.
- **de:** strong, but the unit is one lesson, not a day: "Vertretungsstunde Klasse 3", by subject (Deutsch, Mathe, Kunst, Musik), "Vertretungsstunden Material kostenlos / Kopiervorlagen". Most of the tail is secondary school; Grundschule and Klasse 1–4 are there.
- **fr:** real and it is a day: "remplacement CP une journée", "journée de remplacement", by période.
- **es (MX):** nobody types substitute-teacher material. The same need shows up as "cuadernillo de actividades / de repaso" by grade, which is very wide. A Mexican pack is a review booklet.
- **pt (BR), it:** the substitute words are about the job (pay, rules, hiring). A handful of real phrases ("plano de aula emergencial", "ore di supplenza cosa fare"). Brazil types "atividades prontas para imprimir".
- **nl, sv, da, no, fi:** nothing usable with my probes ("vikartimer" and "sijaisen" are about pay; "invaller" is football). Finland types "sijaisen ohjeet" and "sijaisen muistilista": a note for the substitute, not a pack.

Reading: build the full-day pack for en and fr; a single-lesson pack by grade and subject for de; a review booklet for es. For pt and it the pack can exist for subscribers with one hub page and low search expectations. For nl, sv, da, no and fi the evidence says no indexable pack pages; a native reviewer confirms the search words before that is final. This changes Part 5's "24 packs per locale" into a per-market decision.

### 5. First readers

| Market | The words | Notes |
|---|---|---|
| en | "decodable readers", "decodable books" (both very wide), "decodable passages with comprehension questions", "printable mini books", "sight word books printable", "cvc books", "short a decodable reader" | free, pdf, printable, the grade, a programme name (UFLI). People search by skill ("short a"), which is how the series hubs should be cut |
| de | "Lesetexte Klasse 1 (Silbenschrift, mit Fragen, kostenlos)", "Silbenlesen", "Lesehefte Klasse 1" | "Minibuch" is thin; "Faltbuch" is searched as a template |
| fr | "lecture CP à imprimer", "lecture syllabique CP", "mini livre à imprimer", "livret de lecture CP" | "déchiffrable" is not typed; by "son" and période |
| es (MX) | "lecturas cortas (primer grado)", "lecturas con sílabas simples / trabadas", "mini libros para imprimir y armar", "libros para aprender a leer", "método silábico" | very wide |
| pt (BR) | "fichas de leitura", "textos para alfabetização", "textos com sílabas simples", "livrinhos para imprimir", "livros decodificáveis" | "letra bastão / cursiva" ride along: the letter style matters |
| it | "letture classe prima stampato maiuscolo", "prime letture", "leggere le sillabe", "mini libri da stampare" | capitals first: the letter style is part of the search |
| nl | "AVI Start boekjes", "eerste leesboekjes", "leesteksten groep 3" | levelled by AVI and by the method's "kern". AVI is an owned levelling system; we may not label a book with an AVI level we cannot substantiate |
| da | "lydrette bøger (gratis, 0. klasse)", "lydret læsning print", "lydrette ord" | "foldebog skabelon" |
| sv | "lättlästa texter att skriva ut", "ljudenliga ord", "läsläxa åk 1" | thin |
| no | "lydrette ord", "lettleste tekster", "lesetekster 1. trinn" | thin |
| fi | "lukemaan oppiminen (harjoituksia, tehtäviä)", "lukuläksy moniste", "tavutetut tarinat" | thin; the syllabified-text words I expected ("tavutetut tekstit") returned nothing |

Reading:
- **The English case for the reader programme is as strong as the strategy note says.** Germany, France, Mexico and Brazil are strong too, each under its own words.
- **The search is for short printable texts as much as for folded books** (Lesetexte, lecture à imprimer, lecturas cortas, textos para alfabetização, fichas de leitura). Every book should also exist as a one-page text with questions; that is the same content in a second layout.
- **Comprehension questions are typed** ("mit Fragen", "with comprehension questions", "con preguntas", "interpretação").
- **Letter style is part of the search in Italy and Brazil** (capitals first). The book engine needs a letter-style setting for those two markets.
- **Sweden, Norway and Finland show little reader demand.** This supports the ruling that every language goes to 60 books and further only where they are used.

## What this changes in the plan

Recorded here and in PLAN.md §12. Points 6 and 7 were decided on 2026-11-11 under the operator's delegation (PLAN.md §11).

1. **Part 7 (tests) has the clearest search case in every market.** Worth weighing when the order of Parts 4–7 comes up; no change proposed now.
2. **Naming:** unit pages lead with each language's lesson-plan word; English test pages use "beginning-of-year / mid-year / end-of-year assessment"; reader hubs in English are cut by phonics skill.
3. **Part 5 becomes per market:** full day (en, fr), single lesson (de), review booklet (es), minimal (pt, it), none indexable (nl, sv, da, no, fi) unless a native reviewer finds the words.
4. **Part 6:** per-grade objective lists and checklists are the page type with a job; Germany and the US are searched by state, which a national-only alignment does not answer.
5. **Part 8:** one-page text layout beside the folded book; a letter-style setting for it and pt; no AVI labels in nl without a basis.
6. **Preschool — DECIDED: first wave in Brazil, Mexico and the Netherlands, second wave elsewhere.** The earlier ruling put preschool units in the second wave. In Brazil and Mexico the preschool phrases are the widest of all ("plano de aula educação infantil", "planeación preescolar", "evaluación diagnóstica preescolar"), and Dutch "thema kleuters" is the widest Dutch phrase. So those three markets get preschool theme units in the first wave.
7. **State curricula — DECIDED: national first, then Bavaria, NRW and Saxony (Germany) and Texas (US).** Germany and the US search curricula by state. California and other Common Core states get no separate page, because it would only rename the national list.
