# Seeded autocomplete harvest — candidate genre heads × 11 locales (round 1, 2026-09-23)

Script: scripts/seo-research/harvest-candidates.js (Google suggest, client=firefox, per-market hl/gl: es=MX, pt=BR, no=bokmål). Seeds: _records/candidate-seeds.json (2 heads per candidate × {bare, +worksheet noun, +print word, +4 grade words} = 14 requests per candidate, 182 per locale, 0 errors in all 11). Cell = distinct suggestion strings returned for that candidate. A LOW cell means the SEED was un-native OR the genre is thin; the native panels decide which (the Nordic panel re-probes with corrected seeds → _records/v2/). Absolute numbers are not comparable across markets (autocomplete depth scales with market size); compare candidates WITHIN a column.

| candidate | en | de | es | pt | fr | it | nl | sv | da | no | fi | sum |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `plants` | 133 | 61 | 102 | 55 | 26 | 50 | 22 | 15 | 17 | 11 | 20 | 512 |
| `life-cycles` | 102 | 24 | 32 | 31 | 27 | 24 | 16 | 15 | 5 | 2 | 4 | 282 |
| `materials` | 44 | 6 | 26 | 18 | 24 | 60 | 43 | 16 | 24 | 20 | 24 | 305 |
| `space` | 126 | 84 | 121 | 76 | 67 | 58 | 28 | 25 | 27 | 21 | 20 | 653 |
| `colors` | 108 | 84 | 137 | 80 | 69 | 121 | 76 | 28 | 29 | 22 | 23 | 777 |
| `2d-shapes` | 135 | 115 | 132 | 77 | 90 | 82 | 49 | 44 | 32 | 26 | 15 | 797 |
| `digraphs` | 88 | 20 | 64 | 51 | 74 | 23 | 20 | 7 | 29 | 19 | 13 | 408 |
| `synonyms` | 122 | 76 | 118 | 62 | 107 | 79 | 31 | 15 | 24 | 22 | 14 | 670 |
| `homophones` | 91 | 44 | 52 | 33 | 66 | 61 | 45 | 16 | 15 | 13 | 2 | 438 |
| `road-safety` | 104 | 103 | 110 | 57 | 89 | 68 | 92 | 47 | 16 | 22 | 23 | 731 |
| `maps` | 97 | 84 | 91 | 64 | 83 | 65 | 25 | 31 | 18 | 21 | 22 | 601 |
| `family` | 126 | 106 | 133 | 79 | 125 | 86 | 59 | 29 | 25 | 22 | 22 | 812 |

Ranked by sum (round 1): family 812 · 2d-shapes 797 · colors 777 · road-safety 731 · synonyms 670 · space 653 · maps 601 · plants 512 · homophones 438 · digraphs 408 · materials 305 · life-cycles 282

## Telling suggestions per candidate (first 6 per locale, verbatim, lower-cased)

### plants
- en (133): "2nd grade science plant life cycle worksheets" · "3rd grade plant life cycle project" · "free printable plant life cycle worksheets for kindergarten" · "parts of a flower 1st grade" · "parts of a flower 2nd grade" · "parts of a flower 3rd grade"
- de (61): "arbeitsblatt pflanzen 5 klasse" · "arbeitsblatt pflanzen klasse 6" · "arbeitsblatt pflanzen und tierzelle" · "aufbau pflanzen arbeitsblatt" · "ausmalbilder pflanzen zum ausdrucken" · "befruchtung pflanzen arbeitsblatt"
- es (102): "actividad partes de la planta para preescolar" · "actividades del ciclo de vida de las plantas para preescolar" · "actividades partes de la planta preescolar" · "actividades partes de la planta primer grado" · "ciclo de vida de las plantas" · "ciclo de vida de las plantas 3 primaria"
- pt (55): "atividade ciclo de vida das plantas 3 ano" · "atividade ciclo de vida das plantas educação infantil" · "atividade de ciências ciclo de vida das plantas" · "atividade partes da planta 2 ano fundamental" · "atividade partes da planta 4 ano" · "atividades sobre o ciclo de vida das plantas 1 ano"
- fr (26): "cycle de vie d une plante ce1" · "cycle de vie d une plante ce2 evaluation" · "cycle de vie d une plante cm1" · "cycle de vie d une plante cm2" · "cycle de vie d une plante cp" · "cycle de vie d une plante pdf"
- it (50): "ciclo vitale della pianta" · "ciclo vitale della pianta classe prima" · "ciclo vitale della pianta classe prima primaria" · "ciclo vitale della pianta classe seconda" · "ciclo vitale della pianta da colorare" · "ciclo vitale della pianta di pomodoro"
- nl (22): "delen van een plant" · "delen van een plant benoemen" · "delen van een plant filmpje" · "delen van een plant werkblad" · "delen van een plantaardige cel" · "delen van een plantencel"
- sv (15): "växtens delar" · "växtens delar arbetsblad" · "växtens delar film" · "växtens delar och funktion" · "växtens olika delar" · "växter"
- da (17): "plantens dele" · "planter" · "planter ikea" · "planter krydsord" · "planter print on demand" · "planter printables"
- no (11): "plantens deler" · "planter" · "planter fra sverige til norge" · "planter ikea" · "planter kryssord" · "planter rådyr ikke spiser"
- fi (20): "kasvin eri osat" · "kasvin juuren osat" · "kasvin kukan osat" · "kasvin lehden osat" · "kasvin osat" · "kasvin osat englanniksi"

### life-cycles
- en (102): "3 stages of frog life cycle" · "5 stages of frog life cycle" · "butterfly life cycle" · "butterfly life cycle 1st grade" · "butterfly life cycle 2nd grade" · "butterfly life cycle 3rd grade"
- de (24): "entwicklung frosch" · "entwicklung frosch arbeitsblatt" · "entwicklung frosch bilder" · "entwicklung frosch dauer" · "entwicklung frosch grundschule" · "entwicklung frosch grundschule film"
- es (32): "ciclo de vida de la mariposa" · "ciclo de vida de la mariposa en ingles" · "ciclo de vida de la mariposa explicado para niños" · "ciclo de vida de la mariposa imagen" · "ciclo de vida de la mariposa maqueta" · "ciclo de vida de la mariposa monarca"
- pt (31): "atividade ciclo de vida da borboleta educação infantil" · "atividade ciclo de vida do sapo educação infantil" · "ciclo de vida da borboleta" · "ciclo de vida da borboleta atividades" · "ciclo de vida da borboleta desenho" · "ciclo de vida da borboleta educação infantil"
- fr (27): "cycle de vie chenille papillon maternelle" · "cycle de vie de la grenouille" · "cycle de vie de la grenouille au cours des saisons" · "cycle de vie de la grenouille ce1" · "cycle de vie de la grenouille ce2" · "cycle de vie de la grenouille cm1"
- it (24): "ciclo vitale della farfalla" · "ciclo vitale della farfalla classe prima" · "ciclo vitale della farfalla classe seconda" · "ciclo vitale della farfalla da colorare" · "ciclo vitale della farfalla immagini" · "ciclo vitale della farfalla pdf"
- nl (16): "filmpje van rups tot vlinder kleuters" · "levenscyclus atalanta vlinder" · "levenscyclus rups vlinder" · "levenscyclus vlinder" · "levenscyclus vlinder filmpje" · "levenscyclus vlinder kleuters"
- sv (15): "film om grodans utveckling" · "fjärilens livscykel" · "fjärilens livscykel arbetsblad" · "fjärilens livscykel arbetsblad gratis" · "fjärilens livscykel bild" · "fjärilens livscykel fakta for barn"
- da (5): "frøens udvikling" · "frøens udviklingsfaser" · "hvordan er sommerfuglens livscyklus" · "sommerfuglens livscyklus" · "sommerfuglens livscyklus film"
- no (2): "froskens utvikling" · "sommerfuglens livssyklus"
- fi (4): "kauanko sammakon kehitys kestää" · "sammakon kehitys" · "sammakon kehitysvaiheet" · "sammakon poikasen kehitys"

### materials
- en (44): "aluminium magnetic or not" · "brass magnetic or not" · "copper magnetic or not" · "different materials and their properties" · "gold magnetic or not" · "how do magnetic sheets work"
- de (6): "3d druck materialien eigenschaften" · "3d druck materialien eigenschaften tabelle" · "magnetisch nicht magnetisch" · "materialien eigenschaften" · "materialien und ihre eigenschaften" · "materialien und ihre eigenschaften grundschule"
- es (26): "10 objetos magnéticos" · "15 objetos magnéticos" · "cinco objetos magnéticos" · "los materiales y sus propiedades actividades para primaria" · "los materiales y sus propiedades para niños de primaria" · "los materiales y sus propiedades para primer grado"
- pt (18): "atividade materiais e suas propriedades" · "atividade materiais e suas propriedades 2 ano" · "atividades sobre materiais e suas propriedades 5 ano" · "ima atraindo objetos" · "ima para objetos" · "ima para pegar objetos"
- fr (24): "les différents matériaux maternelle" · "les fiches matériels" · "les matières ce1" · "les matières ce2" · "les matières cp" · "les matières du ce1d"
- it (60): "classificazione materiali magnetici" · "i materiali" · "i materiali che non irritano" · "i materiali che non irritano cruciverba" · "i materiali che non irritano dizy" · "i materiali che vengono a contatto con gli alimenti ad esempio gli imballaggi"
- nl (43): "dagritmekaarten kleuters magnetisch" · "educatieve materialen kleuters" · "magnetisch bord" · "magnetisch papier printen" · "magnetisch planbord kleuters" · "magnetisch printen"
- sv (16): "magnet 3 klass" · "magnetiskt barnlås" · "magnetiskt bokmärke" · "magnetiskt knivblock" · "magnetiskt knivställ" · "magnetiskt mobilskal"
- da (24): "børnehaveklasse materialer" · "dansk materialer 1 klasse" · "magnetisk knivholder" · "magnetisk næsestrips" · "magnetisk opslagstavle" · "magnetisk powerbank"
- no (20): "magnetisk knivholder" · "magnetisk kortholder" · "magnetisk krok" · "magnetisk powerbank" · "magnetisk skohorn" · "magnetisk tape"
- fi (24): "lastenkeskus tulostettavat materiaalit" · "magneetti" · "magneetti puuilo" · "magneettikalastus" · "magneettikoukku" · "magneettikuvaus"

### space
- en (126): "2nd grade solar system questions" · "moon cycle printable" · "moon phase crafts kindergarten" · "moon phase printable calendar" · "moon phase printable calendar 2026" · "moon phases"
- de (84): "arbeitsblatt planeten 1 klasse" · "arbeitsblatt planeten 3 klasse" · "arbeitsblatt planeten klasse 4" · "arbeitsblatt planeten sonnensystem" · "arbeitsblatt planeten vorschule" · "ausmalbilder planeten zum ausdrucken"
- es (121): "actividades de fases de la luna para preescolar" · "actividades fases de la luna primaria" · "actividades fases de la luna segundo grado" · "actividades para trabajar el sistema solar preescolar" · "actividades sobre el sistema solar para primer grado" · "actividades sobre el sistema solar preescolar"
- pt (76): "4 fases da lua para imprimir" · "atividade fases da lua para imprimir" · "atividades fases da lua educação infantil" · "cartaz sistema solar educação infantil" · "como ensinar as fases da lua para educação infantil" · "como trabalhar as fases da lua na educação infantil"
- fr (67): "apprendre le système solaire enfants" · "cycle de la lune ce2" · "evaluation ce2 les phases de la lune" · "exercice sur le système solaire cm2 à imprimer" · "expliquer le système solaire maternelle" · "expliquer les phases de la lune en maternelle"
- it (58): "cosa sono le fasi lunari scuola primaria" · "fasi lunari da stampare e colorare" · "fasi lunari scheda didattica" · "il sistema solare" · "il sistema solare classe prima" · "il sistema solare classe quinta primaria"
- nl (28): "maanfasen" · "maanfasen 2025" · "maanfasen 2026" · "maanfasen 2027" · "maanfasen juli 2026" · "maanfasen nederlands"
- sv (25): "månens faser" · "månens faser 2025" · "månens faser 2026" · "månens faser arbetsblad" · "månens faser bild" · "månens faser för barn"
- da (27): "månens faser" · "månens faser 2026" · "månens faser 2026 juli" · "månens faser betydning" · "månens faser fysik" · "månens faser i dag"
- no (21): "månefaser" · "månefaser 2025" · "månefaser 2026" · "månefaser 2026 tromsø" · "månefaser 2027" · "månefaser august 2026"
- fi (20): "aurinkokunta" · "aurinkokunta englanniksi" · "aurinkokunta mobile" · "aurinkokunta pienoismalli" · "aurinkokunta snap" · "aurinkokunta snp"

### colors
- en (108): "3 letter color words" · "3rd grade level words" · "3rd grade words to know" · "color by sight word 1st grade printable" · "color by sight word 2nd grade free printable" · "color by sight word 3rd grade free"
- de (84): "arbeitsblatt farben mischen kindergarten" · "artikel farben grundschule" · "c klasse farben 2025" · "deutsch lernen farben arbeitsblatt pdf" · "englisch 1. klasse farben" · "englisch farben lernen 3 klasse"
- es (137): "actividades de los colores para primer grado" · "aprendiendo los colores preescolar" · "colores" · "colores 6" · "colores complementarios" · "colores de cuadernos primer grado"
- pt (80): "aprendendo as cores atividades" · "aprendendo as cores educação infantil" · "aprendendo as cores para imprimir" · "as cores" · "as cores atividades" · "as cores atividades educação infantil"
- fr (69): "anglais les couleurs ce1 ce2" · "apprendre les couleurs en maternelle à imprimer" · "apprendre les couleurs fiche" · "apprendre les couleurs fiches a imprimer" · "apprendre les couleurs maternelle" · "apprendre les couleurs à imprimer"
- it (121): "cartella colori da stampare" · "colori" · "colori acromatici scuola primaria" · "colori arcobaleno" · "colori caldi e freddi classe terza primaria" · "colori caldi scuola primaria"
- nl (76): "boekenlegger kleuren groep 3" · "boekenlegger kleuren groep 4" · "boekenlegger kleuren groep 5" · "code kleuren groep 3" · "code kleuren groep 4" · "kleuren"
- sv (28): "arbetsblad färger engelska" · "colours åk 1" · "engelska färger åk 1" · "färger" · "färger att skriva ut" · "färger elkabel"
- da (29): "farver" · "farver efterår 2026" · "farver i regnbuen" · "farver krydsord" · "farver opgaver" · "farver print"
- no (22): "fargene" · "fargene forteller" · "fargene i det norske flagget" · "fargene i pride flagget" · "fargene i regnbueflagget" · "fargene i regnbuen"
- fi (23): "hevosen värien nimet" · "sinisten värien nimet" · "teknos värien nimet" · "tikkurila värien nimet" · "tulostettavat värit" · "vesivärien värien nimet"

### 2d-shapes
- en (135): "2 dimensional shapes grade 1 activity sheets" · "2 dimensional shapes grade 1 lesson plan" · "2 dimensional shapes grade 3" · "2 dimensional shapes kindergarten worksheets" · "2 dimensional shapes printable" · "2d and 3d shapes 2nd grade"
- de (115): "arbeitsblatt formen klasse 2" · "arbeitsblatt formen klasse 3" · "einführung formen klasse 1" · "einführung geometrische formen 2 klasse" · "formen" · "formen 2 klasse mathe"
- es (132): "actividades de las figuras geometricas preescolar" · "actividades de las figuras geometricas primer grado" · "adivinanzas de las figuras geométricas segundo grado" · "aprender las figuras geometricas preescolar" · "cancion de las figuras geometricas preescolar" · "características de las figuras geométricas primaria"
- pt (77): "atividades figuras geometricas planas educação infantil" · "atividades figuras geométricas planas para imprimir" · "cartaz figuras geométricas planas para imprimir" · "figuras geometricas planas educação infantil" · "figuras geométricas não planas para imprimir" · "figuras geométricas planas"
- fr (90): "affichage les formes géométriques cp" · "apprendre les formes à imprimer" · "fiche les formes" · "fiche les formes ms" · "fiche maternelle les formes géométriques" · "fiche sur les formes géométriques"
- it (82): "attività con le forme geometriche classe prima" · "attività figure geometriche scuola primaria" · "costruire con le forme geometriche scuola primaria" · "esercizi figure geometriche scuola primaria" · "fantavolando le forme geometriche classe prima" · "figure geometriche"
- nl (49): "dictee vormen groep 3" · "dictee vormen groep 4" · "dictee vormen groep 5" · "kleuters vormen en kleuren" · "kleuters vormen leren" · "kleuters vormen oefenen"
- sv (44): "arbetsblad geometriska former förskoleklass" · "ex klass 1" · "ex klass 2" · "ex klass 3" · "former" · "former arbetsblad"
- da (32): "former" · "former 1 klasse" · "former krydsord" · "former og figurer 1 klasse" · "former og figurer 2 klasse" · "former og figurer opgaver"
- no (26): "former" · "former 1 trinn" · "former kryssord" · "former nrk" · "former nrk spill" · "former og mønster 1 trinn"
- fi (15): "3d geometriset muodot" · "eri geometriset muodot" · "geometria tasokuviot" · "geometriset muodot" · "geometriset muodot englanniksi" · "geometriset muodot lapsille"

### digraphs
- en (88): "blends and digraphs 1st grade" · "blends and digraphs 2nd grade" · "ch and sh words for kindergarten" · "ch sh th worksheets kindergarten" · "consonant digraphs 1st grade" · "consonant digraphs 2nd grade"
- de (20): "buchstabenverbindungen" · "buchstabenverbindungen basisschrift" · "buchstabenverbindungen deutsch" · "buchstabenverbindungen grundschrift" · "buchstabenverbindungen grundschule" · "buchstabenverbindungen schreibschrift"
- es (64): "abcdefghijklmnñopqrstuvwxyz ch ll rr" · "abecedario ch ll rr" · "abecedario incluyendo ch ll rr" · "actividad silabas trabadas primer grado" · "actividades silabas trabadas preescolar" · "actividades silabas trabadas segundo grado"
- pt (51): "atividade digrafos 3 ano fundamental" · "atividade lh nh ch 4 ano" · "atividade nh lh ch 1 ano" · "atividade nh lh ch 2 ano" · "atividade nh lh ch wordwall" · "atividades com dígrafos para imprimir"
- fr (74): "apprendre les sons complexes cp" · "coloriage magique son ou cp" · "comptine son ou maternelle" · "dictée son ou ce1" · "exercice son ou ce2" · "exercices sur les sons complexes ce1"
- it (23): "dettato ortografico gn gl sc" · "diagrammi di flusso" · "diagrammi scuola primaria" · "digrammi" · "digrammi classe prima" · "digrammi cosa sono"
- nl (20): "tweetekenklanken" · "tweetekenklanken flitsen" · "tweetekenklanken flitsen groep 3" · "tweetekenklanken groep 3" · "tweetekenklanken groep 4" · "tweetekenklanken kaartjes"
- sv (7): "sj ljudet arbetsblad" · "sje ljudet" · "sje ljudet i svenskan" · "sje ljudet stavning" · "tj ljudet arbetsblad" · "tje ljudet"
- da (29): "ikke lydrette ord opgaver" · "lydrette ord" · "lydrette ord 1 klasse" · "lydrette ord 2 bogstaver" · "lydrette ord 3 bogstaver" · "lydrette ord 4 bogstaver"
- no (19): "kj lyd og sj lyd" · "kj lyd oppgaver" · "kj lyd ord" · "kj lyd salaby" · "kj lyden fonetisk" · "kj lyden nrk"
- fi (13): "diftongi tavu" · "diftongit" · "diftongit harjoituksia" · "diftongit s2" · "diftongit suomen kieli" · "diftongit suomessa"

### synonyms
- en (122): "2 synonyms and 2 antonyms" · "2nd grade synonyms and antonyms worksheets pdf" · "free printable synonyms and antonyms worksheets" · "kindergarten synonyms and antonyms" · "kindergarten synonyms in english" · "kindergarten synonyms list"
- de (76): "adjektive synonyme arbeitsblatt" · "arbeitsblatt synonyme antonyme" · "arbeitsblatt synonyme finden" · "arbeitsblatt wortfeld gehen" · "arbeitsblatt wortfeld machen" · "arbeitsblatt wortfeld sagen"
- es (118): "10 sinónimos para imprimir" · "actividad sinonimos segundo grado" · "actividades sinonimos primer grado" · "actividades sinonimos y antonimos primer grado" · "actividades sinonimos y antonimos segundo grado" · "bingo de sinonimos para imprimir"
- pt (62): "atividades sinonimos e antonimos" · "atividades sinônimos e antônimos 2 ano fundamental para imprimir" · "atividades sinônimos e antônimos 4 ano" · "atividades sinônimos e antônimos 4 ano para imprimir" · "bingo de sinônimos para imprimir" · "caça palavras de sinonimos para imprimir"
- fr (107): "definition cp" · "definition cpa" · "definition cpam" · "definition cpc" · "definition cpe" · "definition cpf"
- it (79): "aggettivi sinonimi classe seconda" · "aggettivi sinonimi e contrari classe seconda" · "aggettivi sinonimi e contrari classe terza" · "aggettivi sinonimi scuola primaria" · "attività sinonimi e contrari scuola primaria" · "dizionario sinonimi e contrari scuola primaria"
- nl (31): "2 woorden met dezelfde betekenis" · "2 woorden met dezelfde betekenis in een zin" · "andere woorden met dezelfde betekenis" · "meerdere woorden met dezelfde betekenis" · "nederlandse woorden met dezelfde betekenis" · "synoniemen"
- sv (15): "synonymer" · "synonymer arbetsblad" · "synonymer arbetsblad åk 2" · "synonymer engelska" · "synonymer för clown" · "synonymer korsord"
- da (24): "2 ord der betyder det samme" · "danske ord der betyder det samme" · "et ord der betyder det samme som for" · "hvad kalder man ord der betyder det samme" · "hvilket ord betyder det samme som at udpege noget bestemt" · "hvilket ord betyder det samme som at være følelseskold eller hensynsløs"
- no (22): "fem ord som betyr det samme på norsk og svensk" · "norske ord som betyr det samme" · "oppgaver synonymer og antonymer" · "ord som betyr det samme" · "ord som betyr det samme baklengs" · "ord som betyr det samme begge veier"
- fi (14): "samaa asiaa tarkoittavat sanat" · "samaa tarkoittavat sanat" · "suomen kielen samaa tarkoittavat sanat" · "synonyymit" · "synonyymit englanniksi" · "synonyymit ja vastakohdat"

### homophones
- en (91): "free printable homophones worksheets for grade 2" · "free printable homophones worksheets pdf" · "homonyms 2nd grade" · "homonyms 3rd grade" · "homophone lesson 2nd grade" · "homophone practice 2nd grade"
- de (44): "das dass" · "das dass arbeitsblatt" · "das dass arbeitsblatt 4 klasse" · "das dass arbeitsblatt 6 klasse" · "das dass arbeitsblatt pdf" · "das dass beispiele"
- es (52): "ahi hay ay ficha" · "ejercicios de palabras homofonas con csz para imprimir" · "ejercicios de palabras homofonas para segundo grado" · "ejercicios de palabras homofonas y homografas para imprimir secundaria" · "ejercicios de palabras homófonas y homógrafas para imprimir" · "ficha interactiva hay ahi ay"
- pt (33): "atividade palavras homofonas e homografas" · "atividades palavras homofonas 5 ano" · "mas e mais atividades 4 ano" · "mas e mais atividades 5 ano" · "mas e mais atividades 6 ano" · "mas e mais atividades 7 ano"
- fr (66): "evaluation homophones a à ce1" · "exercices ce2 homophones grammaticaux a à à imprimer" · "exercices homophones a à ce2 pdf" · "exercices homophones grammaticaux ce1 ce2" · "exercices homophones grammaticaux ce2 à imprimer" · "exercices homophones grammaticaux cm2 à imprimer"
- it (61): "c è e ci sono classe prima" · "c è tempo e tempo classe prima" · "c è tempo e tempo scheda didattica" · "c è tempo e tempo scuola primaria" · "cose da stampare e colorare" · "dettato e è classe seconda"
- nl (45): "ei ij" · "ei ij groep 3" · "ei ij groep 4" · "ei ij groep 5" · "ei ij oefenen groep 4" · "ei ij werkblad"
- sv (16): "bildar ljudlika ord" · "bildar ljudlika ord 3 bokstäver" · "bildar ljudlika ord korsord" · "bildar ljudlika ord korsord 3 bokstäver" · "bildar ljudlika ord synonym" · "homofoner"
- da (15): "danske ord der lyder ens" · "homofoner" · "homofoner betydning" · "homofoner dansk" · "homofoner eksempler" · "homofoner engelsk"
- no (13): "homofoner" · "homofoner dansk" · "homofoner eksempler" · "homofoner engelsk" · "homofoner exempel" · "homofoner lista"
- fi (2): "homofonit" · "samalta kuulostavat sanat"

### road-safety
- en (104): "3 basic types of traffic signs" · "5 importance of road safety" · "5 road safety rules" · "orange traffic signs mean" · "road safety" · "road safety bingo printable"
- de (103): "arbeitsblatt verkehrserziehung 1 klasse" · "arbeitsblatt verkehrserziehung 4 klasse" · "arbeitsblatt verkehrserziehung kita" · "arbeitsblatt verkehrserziehung klasse 2" · "arbeitsblatt verkehrserziehung vorschule" · "arbeitsblatt verkehrserziehung.grundschule"
- es (110): "actividades de educacion vial para segundo grado" · "actividades de educación vial para primer grado" · "actividades de señales de transito para primer grado" · "actividades fichas señales de transito para niños" · "actividades sobre las señales de tránsito grado segundo" · "caratula de educación vial para imprimir"
- pt (57): "atividade educação no transito 2 ano" · "atividade educação no transito educação infantil" · "atividade placas de transito para colorir" · "atividade placas de trânsito 1 ano" · "atividade sobre placas de transito" · "atividades com placas de trânsito para o ensino fundamental"
- fr (89): "coloriage panneaux de signalisation à imprimer" · "dessin de panneau de signalisation à imprimer" · "emc la sécurité routière ce2" · "emc sécurité routière ce1" · "exercice panneaux de signalisation ce2" · "exercice sécurité routière ce2"
- it (68): "cartellone segnali stradali scuola primaria" · "educazione stradale" · "educazione stradale bambini" · "educazione stradale classe 5 primaria" · "educazione stradale classe prima" · "educazione stradale classe prima elementare"
- nl (92): "filmpje verkeer groep 4" · "filmpje verkeersborden kleuters" · "kleurplaat verkeer groep 3" · "kleurplaat verkeer kleuters" · "knutselen verkeer groep 3" · "knutselen verkeer groep 4"
- sv (47): "arbetsblad trafik åk 1" · "rallylydnad skyltar skriva ut" · "skogräns skylt skriva ut" · "skylt förskoleklass" · "skylt klass 1" · "skyltar att skriva ut"
- da (16): "emu færdselslære" · "færdselslære" · "færdselslære folkeskolen" · "færdselslære fælles mål" · "færdselslære indskoling" · "færdselstavler"
- no (22): "trafikksikkerhet" · "trafikksikkerhet barnehage" · "trafikksikkerhet oslo" · "trafikksikkerhetsforeningen" · "trafikksikkerhetshåndboken" · "trafikksikkerhetskonferansen"
- fi (23): "liikennemerkit" · "liikennemerkit harjoitus" · "liikennemerkit ja selitykset" · "liikennemerkit lapsille" · "liikennemerkit pysäköinti" · "liikennemerkit pysäköinti aika"

### maps
- en (97): "2nd grade map skills worksheets free" · "2nd grade map skills worksheets free pdf" · "3rd grade map skills worksheets pdf" · "3rd grade social studies continents and oceans" · "continents and oceans" · "continents and oceans 1st grade"
- de (84): "7 kontinente zum ausdrucken" · "arbeitsblatt himmelsrichtungen 3 klasse" · "arbeitsblatt himmelsrichtungen 3 klasse pdf" · "arbeitsblatt himmelsrichtungen 3 klasse pdf kostenlos" · "arbeitsblatt himmelsrichtungen 4 klasse" · "arbeitsblatt kontinente und ozeane"
- es (91): "actividad puntos cardinales segundo grado" · "actividades de puntos cardinales para primer grado" · "actividades puntos cardinales primer grado" · "concepto de puntos cardinales para primer grado" · "ejercicios de puntos cardinales para segundo grado" · "ejercicios puntos cardinales para imprimir"
- pt (64): "6 continentes para imprimir" · "atividade continentes 3 ano" · "atividade continentes 8 ano" · "atividade continentes e oceanos" · "atividade continentes e oceanos 5o ano" · "atividades continentes e oceanos 4 ano"
- fr (83): "activité sur les continents cp" · "activité sur les continents maternelle" · "apprendre les continents ce1" · "apprendre les continents ce2" · "apprendre les continents cp" · "chanson les continents maternelle"
- it (65): "esercizi punti cardinali classe terza primaria" · "geografia i continenti scuola primaria" · "i cinque continenti scuola primaria" · "i continenti" · "i continenti classe quinta primaria" · "i continenti classe terza"
- nl (25): "werelddelen" · "werelddelen en continenten" · "werelddelen en continenten verschil" · "werelddelen en oceanen" · "werelddelen hoeveel" · "werelddelen kaart"
- sv (31): "väderstreck" · "väderstreck 3 bokstäver" · "väderstreck arbetsblad" · "väderstreck engelska" · "väderstreck karta" · "väderstreck kompass"
- da (18): "verdensdele" · "verdensdele efter størrelse" · "verdensdele kort" · "verdensdele størrelse" · "verdensdele vs kontinenter" · "verdensdelen"
- no (21): "himmelretninger" · "himmelretninger engelsk" · "himmelretninger fransk" · "himmelretninger google maps" · "himmelretninger grader" · "himmelretninger kart"
- fi (22): "ilmansuunnat" · "ilmansuunnat asteina" · "ilmansuunnat englanniksi" · "ilmansuunnat kartalla" · "ilmansuunnat kompassi" · "ilmansuunnat kuva"

### family
- en (126): "2nd grade family tree project template" · "baamboozle family members kindergarten" · "family history worksheets" · "family member printable rental agreement template" · "family members" · "family members 1st grade"
- de (106): "arbeitsblatt familie englisch" · "arbeitsblatt stammbaum abraham" · "arbeitsblatt stammbaum erstellen" · "ausmalbilder familie zum ausdrucken" · "eduki familie klasse 1" · "eduki familie klasse 2"
- es (133): "actividad arbol genealogico preescolar" · "actividad arbol genealogico primaria" · "arbol genealogico 1 primaria" · "arbol genealogico 2 primaria" · "arbol genealogico cien años de soledad" · "arbol genealogico creativo preescolar"
- pt (79): "arvore genealogica atividade 2 ano" · "arvore genealogica atividade 3 ano" · "arvore genealogica atividade 4 ano" · "arvore genealogica atividade escolar" · "arvore genealogica atividade infantil" · "arvore genealogica atividade ingles"
- fr (125): "anglais la famille ce1 ce2" · "anglais la famille ce2 cm1" · "arbre généalogique" · "arbre généalogique anglais ce2" · "arbre généalogique ce1" · "arbre généalogique ce1 ce2"
- it (86): "albero genealogico" · "albero genealogico buendia" · "albero genealogico classe prima" · "albero genealogico classe seconda" · "albero genealogico classe seconda primaria" · "albero genealogico classe terza"
- nl (59): "aldfaer stamboom printen" · "familie" · "familie coppens" · "familie coppens zweden" · "familie flodder" · "familie kleuters"
- sv (29): "familjen" · "familjen addams" · "familjen annorlunda" · "familjen bridgerton" · "familjen göteborg" · "familjen restaurang"
- da (25): "familien" · "familien addams" · "familien fra bryggen" · "familien ga 1 klasse" · "familien gyldenkål" · "familien hardacre medvirkende"
- no (22): "familien" · "familien adampour" · "familien glum" · "familien gøteborg" · "familien knotten" · "familien lykke"
- fi (22): "perhe arte" · "perhe edellä puuhun" · "perhe on pahin" · "perhekalenteri" · "perheneuvola" · "perheomenapuu"
