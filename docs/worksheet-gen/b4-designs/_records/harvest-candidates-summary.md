# Seeded autocomplete harvest — candidate genre heads × 11 locales (round 1, 2026-09-21)

Script: scripts/seo-research/harvest-candidates.js (Google suggest, client=firefox, per-market hl/gl: es=MX, pt=BR, no=bokmål). Seeds: _records/candidate-seeds.json (2 heads per candidate × {bare, +worksheet noun, +print word, +4 grade words} = 14 requests per candidate, 182 per locale, 0 errors in all 11). Cell = distinct suggestion strings returned for that candidate. A LOW cell means the SEED was un-native OR the genre is thin; the native panels decide which (the Nordic panel re-probes with corrected seeds → _records/v2/). Absolute numbers are not comparable across markets (autocomplete depth scales with market size); compare candidates WITHIN a column.

| candidate | en | de | es | pt | fr | it | nl | sv | da | no | fi | sum |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `cloze` | 78 | 84 | 48 | 42 | 48 | 27 | 10 | 8 | 3 | 3 | 4 | 355 |
| `dominoes` | 44 | 51 | 62 | 40 | 63 | 27 | 16 | 20 | 32 | 10 | 14 | 379 |
| `human-body` | 131 | 88 | 139 | 77 | 118 | 88 | 42 | 53 | 21 | 28 | 20 | 805 |
| `five-senses` | 113 | 57 | 127 | 72 | 79 | 82 | 41 | 19 | 18 | 15 | 15 | 638 |
| `weather` | 129 | 95 | 63 | 48 | 65 | 26 | 36 | 23 | 15 | 16 | 14 | 530 |
| `tangram` | 72 | 49 | 64 | 38 | 64 | 39 | 24 | 21 | 34 | 20 | 13 | 438 |
| `recycling` | 89 | 67 | 66 | 76 | 104 | 84 | 26 | 38 | 26 | 23 | 23 | 622 |
| `odd-and-even` | 123 | 50 | 68 | 49 | 50 | 69 | 21 | 21 | 17 | 21 | 17 | 506 |
| `rounding` | 82 | 67 | 51 | 32 | 37 | 40 | 31 | 24 | 16 | 17 | 15 | 412 |
| `pronouns` | 123 | 96 | 103 | 58 | 101 | 81 | 27 | 21 | 20 | 30 | 24 | 684 |
| `question-words` | 99 | 64 | 13 | 34 | 43 | 21 | 27 | 16 | 18 | 16 | 14 | 365 |
| `cube-nets` | 40 | 70 | 25 | 39 | 44 | 24 | 13 | 8 | 1 | 1 | 0 | 265 |
| `finger-counting` | 36 | 18 | 24 | 24 | 31 | 22 | 11 | 11 | 9 | 1 | 1 | 188 |

Ranked by sum (round 1): human-body 805 · pronouns 684 · five-senses 638 · recycling 622 · weather 530 · odd-and-even 506 · tangram 438 · rounding 412 · dominoes 379 · question-words 365 · cloze 355 · cube-nets 265 · finger-counting 188

## Telling suggestions per candidate (first 6 per locale, verbatim, lower-cased)

### cloze
- en (78): "1st grade cloze reading passages" · "2nd grade cloze reading passages pdf" · "alphabet fill in the blank worksheets for kindergarten" · "close or cloze" · "close or cloze reading" · "cloze"
- de (84): "auge lückentext arbeitsblatt" · "deutsch arbeitsblatt lückentext" · "englische lückentexte zum ausdrucken" · "fotosynthese lückentext arbeitsblatt" · "lustige lückentexte zum ausdrucken" · "lustige lückentexte zum ausdrucken hochzeit"
- es (48): "actividades completar oraciones para imprimir" · "completa las oraciones" · "completa las oraciones con acciones relacionadas con las imágenes" · "completa las oraciones con el sujeto adecuado" · "completa las oraciones con la palabra correcta" · "completa las oraciones con las palabras del recuadro"
- pt (42): "atividade alfabetização complete as frases" · "atividade completar frases 1 ano" · "atividade completar frases 2 ano" · "atividade completar frases 3 ano" · "atividade completar frases com palavras" · "atividade completar frases com verbos"
- fr (48): "dictée à trou ce1 pdf" · "dictée à trou ce2 pdf" · "dictée à trous ce1" · "dictée à trous ce1 bout de gomme" · "dictée à trous ce2" · "dictée à trous cm1 à imprimer"
- it (27): "completa le frasi" · "completa le frasi classe prima" · "completa le frasi classe seconda" · "completa le frasi con" · "completa le frasi con i verbi adatti" · "completa le frasi con il verbo essere"
- nl (10): "invuloefening" · "invuloefening engels" · "invuloefening franse werkwoorden" · "invuloefening hart" · "invuloefening maken" · "invuloefening signaalwoorden"
- sv (8): "elevspel lucktext" · "fyll i ordet" · "lucktext" · "lucktext adjektiv" · "lucktext engelska" · "lucktext engelska läsförståelse"
- da (3): "indsæt det rigtige ord" · "indsæt ord" · "indsæt orddeling. word"
- no (3): "fyll inn ord" · "fyll inn ord historie" · "fyll inn riktig ord"
- fi (4): "aukkotehtävä englanniksi" · "exam aukkotehtävä" · "täydennä lause" · "wordwall täydennä lause"

### dominoes
- en (44): "adding with dominoes worksheets" · "counting dominoes worksheets" · "counting dominoes worksheets for kindergarten" · "domino kindergarten frielingsdorf" · "domino kindergarten göppingen" · "domino kindergarten langenhagen"
- de (51): "1x1 domino zum ausdrucken kostenlos" · "anlaut domino klasse 1" · "anlaut domino zum ausdrucken" · "domino" · "domino 1 klasse deutsch" · "domino arbeitsblatt"
- es (62): "actividad domino preescolar" · "domino de numeros preescolar" · "domino de palabras para primer grado" · "domino de sumas para primer grado" · "domino ecuaciones de primer grado" · "domino ecuaciones segundo grado"
- pt (40): "atividade domino 1 ano" · "atividade domino da adição" · "atividade domino das silabas" · "atividade domino de palavras" · "atividade domino matematico" · "atividade dominó alfabetização"
- fr (63): "domino animaux à imprimer" · "domino ce1" · "domino ce2" · "domino conjugaison ce1" · "domino conjugaison ce2" · "domino cp exercices"
- it (27): "domino" · "domino animali da stampare" · "domino classe prima" · "domino da stampare" · "domino da stampare e ritagliare" · "domino da stampare per bambini"
- nl (16): "domino" · "domino kleuters" · "domino kleuterschool" · "domino pizza" · "domino printen" · "domino spel kleuters"
- sv (20): "domino" · "domino falköping" · "domino mall" · "domino mall plaza egaña" · "domino mall plaza los dominicos" · "domino mall plaza norte"
- da (32): "anlaut domino klasse 1" · "domino" · "domino 1 klasse" · "domino 1 klasse deutsch" · "domino 2 klasse" · "domino basteln klasse 1"
- no (10): "domino" · "domino regler" · "dominos" · "dominos gøteborg" · "dominos halden" · "dominos halmstad"
- fi (14): "domino" · "domino juustokakku" · "domino jäätelö" · "domino keksi" · "domino mansikka juustokakku" · "domino peli"

### human-body
- en (131): "animal body parts grade 3" · "body organs grade 3" · "body parts" · "body parts 1 grade" · "body parts 1st grade" · "body parts 2nd grade"
- de (88): "arbeitsblatt körperteile klasse 2" · "bildkarten körperteile zum ausdrucken" · "bildkarten körperteile zum ausdrucken kostenlos" · "bildkarten körperteile zum ausdrucken pdf" · "der körper" · "der körper arbeitsblatt"
- es (139): "actividades partes del cuerpo primaria" · "actividades partes del cuerpo segundo grado" · "cambios en el cuerpo humano segundo grado" · "conociendo el cuerpo humano preescolar" · "descubre el cuerpo humano fichas completas" · "el cuerpo humano"
- pt (77): "atividade o corpo humano educação infantil" · "atividades sobre o corpo humano para imprimir" · "bingo partes do corpo para imprimir" · "boneco partes do corpo para imprimir" · "caça palavras sobre o corpo humano para imprimir" · "complete o corpo humano educação infantil"
- fr (118): "anglais les parties du corps ce1 ce2" · "apprendre les parties du corps en anglais ce2" · "apprendre les parties du corps maternelle" · "cartes parties du corps à imprimer" · "corps humain à imprimer gratuitement" · "exercice les parties du corps maternelle"
- it (88): "body parts parti del corpo in inglese per bambini da stampare" · "canzone parti del corpo scuola primaria" · "canzone sulle parti del corpo classe prima" · "corpo umano da stampare e colorare" · "disegnare il corpo umano classe prima" · "flashcard parti del corpo da stampare"
- nl (42): "bingo lichaamsdelen kleuters" · "boek over het lichaam kleuters" · "engels lichaamsdelen werkblad" · "het lichaam" · "het lichaam bill bryson" · "het lichaam geneest zichzelf boek barbara o neill"
- sv (53): "arbeta med kroppen åk 2" · "arbeta med kroppen åk 3" · "bilduppgift kroppen åk 2" · "bilduppgift kroppen åk 3" · "film om kroppen åk 3" · "kropp att skriva ut"
- da (21): "hvad hedder kroppens dele" · "kroppen" · "kroppen 1 klasse" · "kroppen 2 klasse" · "kroppen 3 klasse" · "kroppen holder regnskab"
- no (28): "kroppen" · "kroppen 1 trinn" · "kroppen 2 trinn" · "kroppen 3 trinn" · "kroppen 4 trinn" · "kroppen holder regnskap"
- fi (20): "ihmisen keho kuva" · "ihmisen keho suomeksi" · "ihmisen kehon koostumus" · "ihmisen kehon lämpötila" · "ihmisen kehon normaali lämpötila" · "ihmisen kehon osat"

### five-senses
- en (113): "5 sense organs grade 3" · "5 senses" · "5 senses 1st grade" · "5 senses 1st grade worksheet" · "5 senses 2nd grade" · "5 senses 3rd grade"
- de (57): "5 sinnesorgane grundschule" · "arbeit sinnesorgane klasse 3" · "arbeitsblatt sinnesorgane grundschule" · "arbeitsblatt sinnesorgane klasse 2" · "arbeitsblatt sinnesorgane klasse 3" · "arbeitsblatt sinnesorgane klasse 5"
- es (127): "actividad de los 5 sentidos segundo grado" · "actividad de los cinco sentidos primer grado" · "actividades de los 5 sentidos para niños de segundo grado" · "actividades de los 5 sentidos primer grado" · "actividades de los cinco sentidos para niños de segundo grado" · "actividades de los cinco sentidos para segundo grado"
- pt (72): "5 sentidos" · "5 sentidos atividade maternal" · "5 sentidos atividade para imprimir" · "5 sentidos atividades" · "5 sentidos atividades 1 ano" · "5 sentidos atividades 2 ano"
- fr (79): "evaluation les cinq sens cp" · "fiche les 5 sens cp" · "fiche les 5 sens gs" · "fiche pédagogique les 5 sens cp" · "fiche pédagogique les 5 sens maternelle" · "fiche vocabulaire les 5 sens"
- it (82): "5 sensi" · "5 sensi altamura" · "5 sensi classe prima" · "5 sensi classe prima wordwall" · "5 sensi classe seconda" · "5 sensi da stampare"
- nl (41): "de vijf zintuigen" · "de vijf zintuigen anubis" · "de vijf zintuigen efteling" · "de vijf zintuigen forum" · "de vijf zintuigen in het frans" · "de vijf zintuigen lied"
- sv (19): "de fem sinnena" · "de fem sinnena för barn" · "de fem sinnena på engelska" · "de fem sinnenas sång" · "ett av de fem sinnena" · "ett av de fem sinnena korsord"
- da (18): "de fem menneskelige sanser" · "de fem sanser" · "de fem sanser pia tafdrup" · "de fem sanser tv2" · "hva er de fem sanser" · "hvad er de fem sanser"
- no (15): "de fem sansene" · "de fem sansene våre" · "hva er de fem sansene" · "hva heter de fem sansene" · "sansene" · "sansene 1 trinn"
- fi (15): "aistit aivoissa" · "aistit ooppera" · "aistit tehtäviä" · "aistitesti" · "aistitiedon käsittelyn haasteet" · "aistitieto"

### weather
- en (129): "climate 3rd grade" · "severe weather 2nd grade" · "weather" · "weather 1 grade" · "weather 1st grade" · "weather 1st grade wordwall"
- de (95): "arbeitsblatt wetter klasse 2" · "arbeitsblatt wettersymbole grundschule" · "bildkarten wetter kostenlos zum ausdrucken" · "bildkarten wetter zum ausdrucken" · "deckblatt wetter zum ausdrucken" · "eduki wetter klasse 1"
- es (63): "actividades sobre el clima para primer grado" · "cancion para el clima preescolar" · "como esta el clima hoy para imprimir" · "como esta el clima para imprimir" · "como esta el clima preescolar" · "el clima"
- pt (48): "atividade clima do brasil" · "atividade clima e tempo" · "atividade clima e tempo 6 ano" · "atividade clima e tempo 8 ano" · "atividade clima educação infantil" · "atividade sobre o tempo e o clima"
- fr (65): "afficher la temperature cpu" · "anglais la météo ce1 ce2" · "apprendre la meteo maternelle" · "connaitre la temperature cpu" · "la fiche temperature" · "la meteo a imprimer"
- it (26): "che cos è il tempo atmosferico scuola primaria" · "il meteo" · "il meteo 3b" · "il meteo bologna" · "il meteo firenze" · "il meteo in inglese scuola primaria"
- nl (36): "filmpje over het weer kleuters" · "het weer" · "het weer gothenburg" · "het weer groep 3" · "het weer in gotenburg" · "het weer in kopenhagen"
- sv (23): "väder arbetsblad" · "väder åkersberga 10 dagar" · "väder åkersberga 25 dagar" · "vädersymboler" · "vädersymboler betydelse" · "vädersymboler blåst"
- da (15): "vejret" · "vejret 2 klasse" · "vejret bornholm" · "vejret gøteborg" · "vejret helsingborg" · "vejret i morgen"
- no (16): "været" · "været 2 trinn" · "været gøteborg" · "været i karlstad" · "været i luleå" · "været i oslo"
- fi (14): "sää" · "sää göteborg" · "sää haaparanta" · "sää helsinki" · "sää oulu" · "sää tampere"

### tangram
- en (72): "benefits of tangram puzzles" · "define tangram in math example" · "different types of tangram puzzles" · "kindergarten tangram activities" · "online tangram puzzles for kindergarten" · "tangram"
- de (49): "einfache tangram 1 klasse" · "tangram" · "tangram arbeitsblatt" · "tangram arbeitsblatt grundschule" · "tangram bilder zum ausdrucken" · "tangram bubendorf"
- es (64): "actividad tangram primaria" · "actividad tangram.primer grado" · "actividades con el tangram segundo grado" · "actividades tangram primaria pdf" · "actividades tangram primer grado primaria" · "conociendo el tangram primer grado"
- pt (38): "atividade tangram educação infantil" · "atividade tangram para imprimir" · "historia do tangram educação infantil" · "objetivo tangram educação infantil" · "plano de aula tangram educação infantil" · "projeto tangram educação infantil"
- fr (64): "atelier tangram ce1" · "atelier tangram ce2" · "atelier tangram cp" · "exercice tangram ce1" · "fiche tangram ce1" · "fiche tangram cp"
- it (39): "costruzione tangram scuola primaria" · "tangram" · "tangram arezzo" · "tangram classe prima" · "tangram classe prima primaria" · "tangram classe seconda"
- nl (24): "tangram" · "tangram eijsden" · "tangram figuren" · "tangram figuren printen" · "tangram groep 3" · "tangram groep 4"
- sv (21): "tangram" · "tangram att skriva ut" · "tangram figurer" · "tangram figurer att skriva ut" · "tangram heightmapper" · "tangram kvadrat"
- da (34): "einfache tangram 1 klasse" · "tangram" · "tangram 1 klasse" · "tangram 2 klasse" · "tangram 3 klasse" · "tangram brikker"
- no (20): "tangram" · "tangram design" · "tangram figurer" · "tangram figurer pdf" · "tangram mal" · "tangram mall"
- fi (13): "tangram" · "tangram city" · "tangram city lautapeli" · "tangram kuviot" · "tangram malleja" · "tangram mallit"

### recycling
- en (89): "1st grade recycling project ideas" · "1st grade recycling project ideas for school" · "2nd grade recycling project ideas" · "2nd grade recycling project ideas for school" · "3rd grade recycling project ideas" · "can you recycle a 2"
- de (67): "arbeitsblatt mülltrennung 1 klasse kostenlos" · "arbeitsblatt mülltrennung 2 klasse" · "arbeitsblatt mülltrennung 2 klasse kostenlos" · "arbeitsblatt mülltrennung 3 klasse" · "arbeitsblatt mülltrennung 6 klasse" · "aufkleber mülltrennung zum ausdrucken"
- es (66): "actividades de reciclaje primer grado" · "actividades de separacion de basura para preescolar" · "actividades reciclaje primaria" · "actividades reciclaje primaria pdf" · "botes de reciclaje preescolar" · "canciones reciclaje primaria"
- pt (76): "adesivo coleta seletiva para imprimir" · "atividade coleta seletiva para imprimir" · "atividades reciclagem educação infantil imprimir" · "cartaz coleta seletiva educação infantil" · "cartaz coleta seletiva para imprimir" · "cartaz reciclagem educação infantil"
- fr (104): "activité tri des déchets maternelle" · "affiche tri des déchets maternelle" · "agent de tri des déchets fiche métier" · "album recyclage maternelle" · "art recyclage maternelle" · "atelier tri des déchets maternelle"
- it (84): "adesivi raccolta differenziata da stampare" · "attività raccolta differenziata classe prima" · "attività riciclo scuola primaria" · "attività sul riciclo classe prima" · "attività sul riciclo classe seconda" · "cartelli raccolta differenziata da stampare"
- nl (26): "afval scheiden" · "afval scheiden duitsland" · "afval scheiden frankrijk" · "afval scheiden frankrijk kleuren" · "afval scheiden groep 3" · "afval scheiden italie"
- sv (38): "källsortering" · "källsortering arbetsblad" · "källsortering bilder att skriva ut" · "källsortering bilder att skriva ut gratis" · "källsortering biltema" · "källsortering hemma"
- da (26): "affaldssortering" · "affaldssortering aalborg" · "affaldssortering flamingo" · "affaldssortering guide" · "affaldssortering i hjemmet" · "affaldssortering ikea"
- no (23): "hvordan sortere søppel" · "hvordan sortere søppel hjemme" · "kildesortering" · "kildesortering 2 trinn" · "kildesortering biltema" · "kildesortering clas ohlson"
- fi (23): "jätteiden lajittelu" · "jätteiden lajittelu ja kierrätys" · "jätteiden lajittelu kotona" · "jätteiden lajittelu laki" · "jätteiden lajittelu merkinnät" · "jätteiden lajittelu taloyhtiössä"

### odd-and-even
- en (123): "2nd grade math odd and even numbers" · "2nd grade odd and even numbers project" · "even and odd" · "even and odd 1st grade" · "even and odd 2nd grade" · "even and odd 2nd grade anchor chart"
- de (50): "arbeitsblatt gerade ungerade zahlen bis 100" · "arbeitsblatt gerade ungerade zahlen klasse 1" · "arbeitsblatt gerade ungerade zahlen klasse 2" · "erklärung gerade und ungerade zahlen grundschule" · "erklärvideo gerade und ungerade zahlen klasse 1" · "frau locke gerade und ungerade zahlen klasse 1"
- es (68): "actividades numeros pares e impares primer grado" · "cartaz numeros pares e impares para imprimir" · "como enseñar numeros pares e impares a niños de primer grado" · "concepto de números pares e impares para niños de primer grado" · "concepto de números pares e impares para primer grado" · "ejercicios de numeros pares e impares para primer grado"
- pt (49): "atividade numeros pares e impares educação infantil" · "atividades de pares e ímpares para imprimir" · "atividades números pares e ímpares 1 ano para imprimir" · "atividades números pares e ímpares 2 ano para imprimir" · "atividades números pares e ímpares 3 ano para imprimir" · "atividades para imprimir números pares e ímpares"
- fr (50): "affichage nombres pairs et impairs ce1" · "affichage pair impair ce1" · "affichage pair impair cp" · "evaluation pair impair ce1" · "evaluation pair impair ce2" · "exercice pair impair ce1"
- it (69): "come spiegare i numeri pari e dispari classe prima" · "esercizi numeri pari e dispari classe prima" · "esercizi pari e dispari classe prima" · "esercizi pari e dispari classe seconda" · "esercizi pari e dispari scuola primaria" · "esercizi sui numeri pari e dispari classe terza"
- nl (21): "even en oneven" · "even en oneven bud spencer terence hill" · "even en oneven film" · "even en oneven functies" · "even en oneven getallen" · "even en oneven getallen engels"
- sv (21): "udda jämna" · "udda jämna datumparkering" · "udda jämna funktioner" · "udda jämna husnummer parkering" · "udda jämna parkering" · "udda jämna tal"
- da (17): "hvad er lige og ulige tal" · "lige eller ulige tal" · "lige eller ulige uge" · "lige og ulige tal" · "lige og ulige tal 1 klasse" · "lige og ulige tal engelsk"
- no (21): "partall oddetall" · "partall oddetall engelsk" · "partall oddetall fødselsnummer" · "partall oddetall og primtall" · "partall oddetall oppgaver" · "partall oddetall personnummer"
- fi (17): "parillinen ja pariton" · "parillinen ja pariton funktio" · "parillinen ja pariton pysäköinti" · "parillinen ja pariton viikko" · "parillinen pariton" · "parillinen pariton englanniksi"

### rounding
- en (82): "2 round off to the nearest 10" · "3 rounded to the nearest ten" · "how do i round to the nearest 10" · "rounding numbers" · "rounding numbers 2nd grade" · "rounding numbers 3rd grade"
- de (67): "arbeitsblatt runden klasse 5 pdf" · "arbeitsblatt runden von dezimalzahlen" · "große zahlen runden arbeitsblatt" · "grundschule runden auf zehntausender" · "grundschule runden von zahlen" · "natürliche zahlen runden arbeitsblatt"
- es (51): "ejercicios de redondeo para imprimir" · "ejercicios redondeo primaria" · "ficha redondear numeros" · "ficha redondeo 3 primaria" · "ficha redondeo 4 primaria" · "ficha redondeo 5 primaria"
- pt (32): "arredondamento" · "arredondamento 2o ano" · "arredondamento 4 ano" · "arredondamento 5 ano" · "arredondamento apical" · "arredondamento atividade"
- fr (37): "arrondi ce2" · "arrondi cp acquis" · "arrondi cp code du travail" · "arrondi cp en cas de départ" · "arrondi cp fin de période" · "arrondi cp jours ouvrés"
- it (40): "arrotondamento" · "arrotondamento 730" · "arrotondamento centesimi" · "arrotondamento centesimi legge" · "arrotondamento classe quarta primaria" · "arrotondamento classe quinta primaria"
- nl (31): "afronden" · "afronden engels" · "afronden groep 5" · "afronden in excel" · "afronden naar beneden excel" · "afronden naar boven excel"
- sv (24): "avrunda" · "avrunda arbetsblad" · "avrunda engelska" · "avrunda i excel" · "avrunda korsord" · "avrunda synonym"
- da (16): "afrunde tal" · "afrunde tal engelsk" · "afrunde tal i excel" · "afrunding" · "afrunding 2. klasse" · "afrunding 3 klasse"
- no (17): "avrunde tall" · "avrunde tall i excel" · "avrunding 3 trinn" · "avrunding desimaltall oppgaver" · "avrunding dokumentavgift" · "avrunding engelsk"
- fi (15): "pyöristä" · "pyöristä excel" · "pyöristäminen" · "pyöristäminen englanniksi" · "pyöristäminen excel" · "pyöristäminen kahden desimaalin tarkkuudella"

### pronouns
- en (123): "indefinite pronouns 1st grade" · "personal pronouns" · "personal pronouns 1 grade" · "personal pronouns 1st grade" · "personal pronouns 2nd grade" · "personal pronouns 3rd grade"
- de (96): "arbeitsblatt personalpronomen englisch 5 klasse" · "arbeitsblatt pronomen klasse 2" · "einführung personalpronomen grundschule" · "einführung personalpronomen klasse 2" · "personalpronomen" · "personalpronomen 1 klasse"
- es (103): "ejemplos.de pronombres personales.para primer grado" · "ejercicios de pronombres personales en español para imprimir" · "ejercicios de pronombres personales primer grado" · "ejercicios de pronombres personales segundo grado" · "ejercicios pronombres personales 4 primaria para imprimir" · "ficha de los pronombres para primer grado"
- pt (58): "atividade pronomes pessoais para imprimir" · "atividades de ingles pronomes pessoais para imprimir" · "atividades pronomes para imprimir" · "bingo dos pronomes para imprimir" · "cartaz pronomes para imprimir" · "cartaz pronomes pessoais para imprimir"
- fr (101): "affichage pronoms personnels cp" · "evaluation pronoms personnels cp" · "exercices sur les pronoms 5ème à imprimer" · "exercices sur les pronoms cm2 à imprimer" · "exercices sur les pronoms personnels cm2 à imprimer" · "exercices sur les pronoms à imprimer"
- it (81): "esercizi con i pronomi personali classe terza" · "esercizi inglese pronomi personali soggetto da stampare" · "esercizi pronomi personali classe terza" · "esercizi sui pronomi personali classe seconda" · "esercizi sui pronomi personali classe terza primaria" · "i pronomi"
- nl (27): "aanwijzende voornaamwoorden werkblad" · "bezittelijke voornaamwoorden werkblad" · "persoonlijke voornaamwoorden" · "persoonlijke voornaamwoorden duits" · "persoonlijke voornaamwoorden duits 1e 3e 4e naamval" · "persoonlijke voornaamwoorden engels"
- sv (21): "personliga pronomen" · "personliga pronomen engelska" · "personliga pronomen franska" · "personliga pronomen grekiska" · "personliga pronomen italienska" · "personliga pronomen objektsform"
- da (20): "hvad er personlige stedord" · "personlige pronominer (stedord)" · "personlige stedord" · "personlige stedord dansk" · "personlige stedord engelsk" · "personlige stedord fransk"
- no (30): "oppgaver pronomen nynorsk" · "personlig pronomen oppgaver" · "personlige pronomen" · "personlige pronomen bokmål" · "personlige pronomen engelsk" · "personlige pronomen fransk"
- fi (24): "englanti pronominit tehtäviä" · "persoonapronominit" · "persoonapronominit englanniksi" · "persoonapronominit espanja" · "persoonapronominit italia" · "persoonapronominit italiaksi"

### question-words
- en (99): "3 letter question words" · "3rd grade words to know" · "answering wh questions kindergarten" · "interrogative words worksheets" · "question words" · "question words 1st grade"
- de (64): "5 w fragen grundschule" · "arbeitsblatt fragewörter deutsch" · "arbeitsblatt fragewörter englisch" · "arbeitsblatt fragewörter englisch 5 klasse" · "arbeitsblatt fragewörter französisch" · "bericht w fragen arbeitsblatt"
- es (13): "palabras interrogativas" · "palabras interrogativas ejemplos" · "palabras interrogativas ejercicios" · "palabras interrogativas en aleman" · "palabras interrogativas en español" · "palabras interrogativas en español ejercicios"
- pt (34): "atividade frases interrogativas diretas e indiretas" · "atividades frases interrogativas 2 ano" · "atividades frases interrogativas e exclamativas 3 ano" · "atividades pronomes interrogativos 3o ano" · "atividades pronomes interrogativos 4o ano" · "atividades pronomes interrogativos 7 ano"
- fr (43): "exercices mots interrogatifs ce1" · "exercices mots interrogatifs ce2" · "exercices phrases interrogatives ce2 pdf" · "exercices phrases interrogatives cp" · "fiche mots interrogatifs anglais" · "les mots interrogatifs cp"
- it (21): "frasi interrogative" · "frasi interrogative in francese" · "frasi interrogative in francese esercizi" · "frasi interrogative in inglese" · "frasi interrogative in inglese con il verbo to be" · "frasi interrogative in inglese scuola primaria"
- nl (27): "vraagwoorden" · "vraagwoorden duits" · "vraagwoorden duits oefenen" · "vraagwoorden engels" · "vraagwoorden frans" · "vraagwoorden in het duits"
- sv (16): "frågeord" · "frågeord 4 bokstäver" · "frågeord 4 bokstäver korsord" · "frågeord engelska" · "frågeord engelska arbetsblad" · "frågeord engelska övningar"
- da (18): "hv ord dansk" · "hv ord komma" · "hv ord ordklasse" · "hv ord på engelsk" · "hv ord på fransk" · "hv ord på spansk"
- no (16): "leddsetninger med spørreord oppgaver" · "spørreord" · "spørreord 2 trinn" · "spørreord engelsk" · "spørreord engelsk oppgaver" · "spørreord kryssord"
- fi (14): "kysymyslauseet englanniksi" · "kysymyslauseet englanti" · "kysymyslauseet ruotsi" · "kysymyslauseet ruotsiksi" · "kysymyssanat" · "kysymyssanat englanniksi"

### cube-nets
- en (40): "cube net" · "cube net diagram" · "cube net examples" · "cube net print" · "cube net printable" · "cube net printable a4"
- de (70): "11 würfelnetze klasse 3" · "11 würfelnetze zum ausdrucken" · "alle würfelnetze zum ausdrucken" · "arbeitsblatt würfelnetze 4 klasse" · "arbeitsblatt würfelnetze 5 klasse" · "arbeitsblatt würfelnetze erkennen"
- es (25): "desarrollo del cubo" · "desarrollo del cubo de proyección" · "desarrollo del cubo de un binomio" · "desarrollo del cubo para armar" · "desarrollo del cubo para imprimir" · "desarrollo del cubo para recortar"
- pt (39): "atividade sobre planificação de solidos 4o ano" · "atividades de matematica planificação de solidos geometricos" · "atividades planificação de sólidos geométricos 3o ano" · "atividades planificação de sólidos geométricos 4o ano" · "atividades planificação de sólidos geométricos 4o ano com gabarito" · "atividades planificação de sólidos geométricos 5o ano"
- fr (44): "exercices patrons de solides ce2" · "les 11 patrons du cube à imprimer" · "leçon patron du cube ce2" · "patron boîte cube à imprimer" · "patron cube bébé à imprimer" · "patron cube ce2 pdf"
- it (24): "lo sviluppo dei solidi classe quinta primaria" · "lo sviluppo dei solidi classe terza primaria" · "sviluppo dei solidi" · "sviluppo dei solidi classe seconda" · "sviluppo dei solidi classe seconda primaria" · "sviluppo dei solidi classe terza"
- nl (13): "bouwplaat kubus" · "bouwplaat kubus printen" · "bouwplaat kubus vouwen" · "bouwplaat kubus werkblad" · "kubuswoning bouwplaat" · "uitslag halve kubus"
- sv (8): "kub mall" · "kub nät" · "kub rio mall" · "kub zity mall" · "kuba mallorca" · "kuber mall varanasi"
- da (1): "terning skabelon"
- no (1): "nett terning"
- fi (0): 

### finger-counting
- en (36): "abacus finger counting worksheets" · "counting finger digits" · "counting fingers kindergarten" · "counting fingers meaning" · "counting on fingers" · "counting on fingers and toes gif"
- de (18): "fingerbilder" · "fingerbilder 1-10" · "fingerbilder arbeitsblatt" · "fingerbilder ausdrucken" · "fingerbilder ausdrucken kostenlos" · "fingerbilder bis 10"
- es (24): "contar con los dedos" · "contar con los dedos actividades" · "contar con los dedos de la mano" · "contar con los dedos en aleman" · "contar con los dedos en chino" · "contar con los dedos gif"
- pt (24): "atividade de contar nos dedos" · "atividade dedos da mão" · "atividades com os dedos da mão educação infantil" · "como contar nos dedos os meses que tem 31 dias" · "contar dedos acuidade visual" · "contar meses nos dedos"
- fr (31): "chanson les doigts de la main maternelle" · "comptage sur les doigts" · "compter avec les doigts maternelle" · "compter sur les doigts" · "compter sur les doigts de la main" · "compter sur les doigts de la main en anglais"
- it (22): "contare con le dita" · "contare con le dita bortolato" · "contare con le dita classe prima" · "contare con le dita in binario" · "contare con le dita in cinese" · "contare con le dita in giapponese"
- nl (11): "11 vingers tellen" · "11 vingers tellen truc" · "op vingers tellen" · "tellen op je vingers" · "tellen vingers" · "vingers tellen"
- sv (11): "deaf fingertalk" · "fingertalk" · "fingertalk app" · "fingertalk cafe" · "fingertalk exhibition" · "fingertalk london"
- da (9): "deaf fingertalk" · "fingertalk" · "fingertalk app" · "fingertalk cafe" · "fingertalk exhibition" · "fingertalk london"
- no (1): "telle på fingrene"
- fi (1): "sormilla laskeminen"
