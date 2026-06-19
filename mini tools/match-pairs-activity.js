/* =====================================================================
   MATCH PAIRS — ACTIVITY   (match-pairs-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of match-pairs. Reuses match-pairs-core.js for
   the DOM/paint/state.

   Task source:
   • ?activity=<id>   → fetches match-pairs-activities.json, finds row,
                         instantiates tasks from row.task_template +
                         row.params.tasks.
   • no ?activity     → falls back to a static demo set.

   First task_template: 'make-n' — for each {target, cards} task in
   row.params.tasks, builds a "Make N" task whose check function asserts
   every pair in tool.pairsFormed sums to target.

   On correct Check, the activity calls MatchPairsCore.speakAllPairs()
   so the kid hears "All pairs make 5!" — the celebration of having
   found multiple decompositions, which is the K.OA.A.3 teaching point.
   ===================================================================== */

/* Localized chrome strings. EN base-locale only this commission; future
   locale fan-outs add entries under each key per the §A.13.48 plan-mode-
   per-locale discipline. */
var ACTIVITY_STRINGS_MP = {
  taskMakeN:       { en: 'Make {n}',                                                de: 'Bilde {n}',                                                                                            es: 'Forma {n}',                                                                                            it: 'Forma {n}',                                                                                                            fr: 'Compose {n}',                                                                                                                                                       pt: 'Forme {n}',                                                                                                                                                                                                                            nl: 'Maak {n}',                                                                                                                       sv: 'Gör {n}',                                                                                                              da: 'Lav {n}',                                                                                                              no: 'Lag {n}',                                                                                                              fi: 'Tee {n}' },
  hintFormPairs:   { en: 'Tap a number, then tap its partner',                      de: 'Tippe auf eine Zahl, dann auf ihren Partner',                                                          es: 'Toca un número, luego toca su pareja',                                                                 it: 'Tocca un numero, poi tocca il suo compagno',                                                                           fr: 'Touche un nombre, puis touche son partenaire',                                                                                                                      pt: 'Toque em um número, depois toque no par dele',                                                                                                                                                                                         nl: 'Tik op een getal, dan op zijn partner',                                                                                          sv: 'Tryck på ett tal, sedan på dess kompis',                                                                               da: 'Tryk på et tal, derefter på dets makker',                                                                              no: 'Trykk på et tall, deretter på makkeren',                                                                               fi: 'Paina numeroa, sitten paina sen paria' },
  hintTryDifferent:{ en: 'Some pairs don\'t add up — tap a pair to break it and try again',
                     de: 'Manche Paare ergeben nicht das Ziel — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                     es: 'Algunas parejas no forman el objetivo — toca una pareja para deshacerla e inténtalo de nuevo',
                     it: 'Alcune coppie non vanno — tocca una coppia per scioglierla e riprova',
                     fr: 'Certaines paires ne font pas l\'objectif — touche une paire pour la défaire et réessaie',
                     pt: 'Alguns pares não fazem o objetivo — toque em um par para desfazê-lo e tente novamente',
                     nl: 'Sommige paren maken het doel niet — tik op een paar om het te ontkoppelen en probeer opnieuw',
                     sv: 'Vissa par når inte målet — tryck på ett par för att lösa upp det och försök igen',
                     da: 'Nogle par når ikke målet — tryk på et par for at løse det op og prøv igen',
                     no: 'Noen par når ikke målet — trykk på et par for å løse det opp og prøv igjen',
                     fi: 'Jotkin parit eivät yllä tavoitteeseen — paina paria avataksesi sen ja yritä uudelleen' },

  /* ---- equal-value template (1.OA.D.7) chrome. The kid works out each
     card (results are HIDDEN) and matches the addition to the subtraction
     with the SAME answer; each task has two pairs with two DIFFERENT answers.
     EN base-locale only this commission; the 10-locale fan-out adds entries
     per §A.13.48. The activity ships slug.en only, so it loads at lang='en'
     exclusively until fan-out — these EN-only keys are never read at any
     other lang (no key-leak). ---- */
  taskEqualValue:     { en: 'Match each addition to the subtraction with the same answer',
                        de: 'Finde zu jeder Plusaufgabe die Minusaufgabe mit demselben Ergebnis',
                        fr: 'Relie chaque addition à la soustraction qui a le même résultat',
                        es: 'Relaciona cada suma con la resta que tiene el mismo resultado',
                        it: 'Collega ogni addizione alla sottrazione che ha lo stesso risultato',
                        pt: 'Combine cada adição com a subtração que tem o mesmo resultado',
                        da: 'Forbind hvert plusstykke med det minusstykke, der har samme resultat',
                        no: 'Koble hver plussoppgave til minusoppgaven som har samme resultat',
                        sv: 'Koppla ihop varje plusuppgift med minusuppgiften som har samma resultat',
                        fi: 'Yhdistä jokainen yhteenlasku vähennyslaskuun, jolla on sama tulos',
                        nl: 'Verbind elke optelsom met de aftreksom die dezelfde uitkomst heeft' },
  hintEqualValue:     { en: 'Work out each card, then match the ones with the same answer',
                        de: 'Rechne jede Karte aus und verbinde die mit demselben Ergebnis',
                        fr: 'Calcule chaque carte, puis relie celles qui ont le même résultat',
                        es: 'Calcula cada tarjeta y relaciona las que tienen el mismo resultado',
                        it: 'Calcola ogni carta e collega quelle con lo stesso risultato',
                        pt: 'Calcule cada carta e combine as que têm o mesmo resultado',
                        da: 'Regn hvert kort ud, og forbind dem, der har samme resultat',
                        no: 'Regn ut hvert kort, og koble dem som har samme resultat',
                        sv: 'Räkna ut varje kort och koppla ihop dem som har samma resultat',
                        fi: 'Laske kortit ja yhdistä ne, joilla on sama tulos',
                        nl: 'Reken elke kaart uit en verbind de kaarten met dezelfde uitkomst' },
  hintTryEqualValue:  { en: 'Those answers aren\'t equal yet — tap a pair to break it and try again',
                        de: 'Die Ergebnisse passen noch nicht — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                        fr: 'Ces résultats ne sont pas encore égaux — touche une paire pour la défaire et réessaie',
                        es: 'Esos resultados aún no son iguales — toca una pareja para deshacerla e inténtalo de nuevo',
                        it: 'Questi risultati non sono ancora uguali — tocca una coppia per scioglierla e riprova',
                        pt: 'Esses resultados ainda não são iguais — toque em um par para desfazê-lo e tente novamente',
                        da: 'Resultaterne er ikke ens endnu — tryk på et par for at løse det op og prøv igen',
                        no: 'Resultatene er ikke like ennå — trykk på et par for å løse det opp og prøv igjen',
                        sv: 'Resultaten är inte lika än — tryck på ett par för att lösa upp det och försök igen',
                        fi: 'Tulokset eivät ole vielä samat — paina paria avataksesi sen ja yritä uudelleen',
                        nl: 'De uitkomsten zijn nog niet gelijk — tik op een paar om het te ontkoppelen en probeer opnieuw' },
  /* Truthful Check-correct celebration. Does NOT claim a number total — a
     task has TWO different answers, so "All pairs make 5!" would be false.
     The shell shows its visual "Great!"; this is the spoken line. EN-only. */
  speakMatchedAll:    { en: 'You matched every pair!',
                        de: 'Du hast alle Paare verbunden!',
                        fr: 'Tu as relié toutes les paires !',
                        es: '¡Has relacionado todas las parejas!',
                        it: 'Hai collegato tutte le coppie!',
                        pt: 'Você combinou todos os pares!',
                        da: 'Du har forbundet alle par!',
                        no: 'Du har koblet sammen alle par!',
                        sv: 'Du har kopplat ihop alla par!',
                        fi: 'Yhdistit kaikki parit!',
                        nl: 'Je hebt alle paren verbonden!' },

  /* ---- three-form template (2.NBT.A.3) chrome. The kid matches cards that
     show the SAME number across numeral / expanded-form / number-word
     representations. Each task has 3 pairs with 3 DIFFERENT numbers, so each
     value maps to exactly two cards → every match is unique, no false-correct.
     Per-locale fan-out adds entries per §A.13.48; register matched to each
     locale's live E4 (K.OA.A.3 + 1.OA.D.7). ---- */
  taskThreeForm:      { en: 'Match the cards that show the same number',
                        de: 'Finde die Karten, die dieselbe Zahl zeigen',
                        es: 'Relaciona las tarjetas que muestran el mismo número',
                        it: 'Collega le carte che mostrano lo stesso numero',
                        pt: 'Combine as cartas que mostram o mesmo número',
                        fr: 'Relie les cartes qui montrent le même nombre',
                        da: 'Forbind kortene, der viser det samme tal',
                        no: 'Koble sammen kortene som viser det samme tallet',
                        sv: 'Koppla ihop korten som visar samma tal',
                        fi: 'Yhdistä kortit, joilla on sama luku',
                        nl: 'Verbind de kaarten die hetzelfde getal tonen' },
  hintThreeForm:      { en: 'Tap a card, then tap another card that shows the same number',
                        de: 'Tippe auf eine Karte, dann auf eine andere Karte mit derselben Zahl',
                        es: 'Toca una tarjeta, luego toca otra tarjeta que muestra el mismo número',
                        it: 'Tocca una carta, poi tocca un\'altra carta che mostra lo stesso numero',
                        pt: 'Toque em uma carta, depois toque em outra carta que mostra o mesmo número',
                        fr: 'Touche une carte, puis une autre carte qui montre le même nombre',
                        da: 'Tryk på et kort, derefter på et andet kort, der viser det samme tal',
                        no: 'Trykk på et kort, deretter på et annet kort som viser det samme tallet',
                        sv: 'Tryck på ett kort, sedan på ett annat kort som visar samma tal',
                        fi: 'Paina korttia, sitten toista korttia, jolla on sama luku',
                        nl: 'Tik op een kaart, dan op een andere kaart die hetzelfde getal toont' },
  hintTryThreeForm:   { en: 'Some cards don\'t show the same number yet — tap a pair to break it and try again',
                        de: 'Manche Karten zeigen noch nicht dieselbe Zahl — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                        es: 'Algunas tarjetas aún no muestran el mismo número — toca una pareja para deshacerla e inténtalo de nuevo',
                        it: 'Alcune carte non mostrano ancora lo stesso numero — tocca una coppia per scioglierla e riprova',
                        pt: 'Algumas cartas ainda não mostram o mesmo número — toque em um par para desfazê-lo e tente novamente',
                        fr: 'Certaines cartes ne montrent pas encore le même nombre — touche une paire pour la défaire et réessaie',
                        da: 'Nogle kort viser ikke det samme tal endnu — tryk på et par for at løse det op og prøv igen',
                        no: 'Noen kort viser ikke det samme tallet ennå — trykk på et par for å løse det opp og prøv igjen',
                        sv: 'Några kort visar inte samma tal än — tryck på ett par för att lösa upp det och försök igen',
                        fi: 'Joillakin korteilla ei ole vielä samaa lukua — paina paria avataksesi sen ja yritä uudelleen',
                        nl: 'Sommige kaarten tonen nog niet hetzelfde getal — tik op een paar om het te ontkoppelen en probeer opnieuw' },
  /* Check-correct celebration, spoken AFTER the three matched number-words are
     read aloud. Number-free + truthful (a task has three different numbers). */
  speakThreeFormDone: { en: 'You matched every number!',
                        de: 'Du hast alle Zahlen verbunden!',
                        es: '¡Has relacionado todos los números!',
                        it: 'Hai collegato tutti i numeri!',
                        pt: 'Você combinou todos os números!',
                        fr: 'Tu as relié tous les nombres !',
                        da: 'Du har forbundet alle tal!',
                        no: 'Du har koblet sammen alle tallene!',
                        sv: 'Du har kopplat ihop alla tal!',
                        fi: 'Yhdistit kaikki luvut!',
                        nl: 'Je hebt alle getallen verbonden!' },

  /* ---- find-missing template (1.OA.D.8) chrome. The kid works out the
     unknown in each equation card (e.g. "8 + ? = 11", blank in any position)
     and matches it to the solution-number card ("3"). Each task has two pairs
     with two DIFFERENT answers, so each value maps to exactly one equation +
     one number → matching is forced equation↔number, no false-correct. Cards
     are {display, kind, value} objects; validity is the same a.value===b.value
     as equal-value, so the engine state machine + connector renderer are
     UNCHANGED. Locale fan-out in progress (one locale per cycle per §A.13.48);
     each locale adds its key to the 3 strings below + its slug/title/intro on
     the manifest row. A locale's keys are read only when a page loads at that
     lang (its slug exists), so partially-filled keys never leak. Celebration
     reuses the truthful number-free speakMatchedAll ("You matched every pair!"). ---- */
  taskFindMissing:    { en: 'Work out the missing number, then match each equation to its answer',
                        it: 'Trova il numero mancante, poi collega ogni operazione alla sua risposta',
                        es: 'Encuentra el número que falta, luego relaciona cada operación con su respuesta',
                        pt: 'Encontre o número que falta, depois combine cada operação com a sua resposta',
                        fr: 'Trouve le nombre manquant, puis relie chaque opération à sa réponse',
                        de: 'Finde die fehlende Zahl, dann verbinde jede Aufgabe mit ihrer Antwort',
                        nl: 'Vind het ontbrekende getal, verbind dan elke som met het antwoord',
                        sv: 'Hitta det saknade talet, koppla sedan ihop varje uppgift med sitt svar',
                        da: 'Find det manglende tal, og forbind så hvert regnestykke med sit svar',
                        no: 'Finn det manglende tallet, og koble så hver oppgave til svaret sitt',
                        fi: 'Etsi puuttuva luku ja yhdistä sitten jokainen lasku vastaukseensa' },
  hintFindMissing:    { en: 'Tap an equation, then tap the number that makes it true',
                        it: 'Tocca un\'operazione, poi tocca il numero che la completa',
                        es: 'Toca una operación, luego toca el número que la completa',
                        pt: 'Toque em uma operação, depois toque no número que a completa',
                        fr: 'Touche une opération, puis touche le nombre qui la complète',
                        de: 'Tippe auf eine Aufgabe, dann auf die Zahl, die sie löst',
                        nl: 'Tik op een som, dan op het getal dat de som compleet maakt',
                        sv: 'Tryck på en uppgift, sedan på talet som löser den',
                        da: 'Tryk på et regnestykke, derefter på tallet, der løser det',
                        no: 'Trykk på en oppgave, deretter på tallet som løser den',
                        fi: 'Paina laskua, sitten lukua, joka ratkaisee sen' },
  hintTryFindMissing: { en: 'Some equations aren\'t matched to the right number yet — tap a pair to break it and try again',
                        it: 'Alcune operazioni non sono ancora abbinate al numero giusto — tocca una coppia per scioglierla e riprova',
                        es: 'Algunas operaciones aún no están emparejadas con el número correcto — toca una pareja para deshacerla e inténtalo de nuevo',
                        pt: 'Algumas operações ainda não estão combinadas com o número certo — toque em um par para desfazê-lo e tente novamente',
                        fr: 'Certaines opérations ne sont pas encore reliées au bon nombre — touche une paire pour la défaire et réessaie',
                        de: 'Manche Aufgaben sind noch nicht mit der richtigen Zahl verbunden — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                        nl: 'Sommige sommen zijn nog niet aan het juiste getal gekoppeld — tik op een paar om het te ontkoppelen en probeer opnieuw',
                        sv: 'Vissa uppgifter är inte ihopkopplade med rätt tal än — tryck på ett par för att lösa upp det och försök igen',
                        da: 'Nogle regnestykker er ikke forbundet med det rigtige tal endnu — tryk på et par for at løse det op og prøv igen',
                        no: 'Noen oppgaver er ikke koblet til riktig tall ennå — trykk på et par for å løse det opp og prøv igjen',
                        fi: 'Jotkin laskut eivät ole vielä yhdistetty oikeaan lukuun — paina paria avataksesi sen ja yritä uudelleen' },

  /* ---- compare-3digit template (2.NBT.A.4) chrome. The kid reads a three-digit
     comparison (e.g. "247 ___ 274") and matches it to the relation symbol that
     makes it true (< or >). Each task has two pairs with two DIFFERENT values
     (value 1 = the < pair, value 2 = the > pair), so the two relation cards are
     visually distinct (< vs >) and matching is forced expr↔symbol; validity is
     the same a.value===b.value as equal-value/find-missing → engine state machine
     + connector renderer UNCHANGED. Cards language-neutral (numerals + </> glyphs),
     rendered via textContent so raw < / > are safe. EN base-locale only this
     commission; locale fan-out adds entries per §A.13.48. ---- */
  taskCompare:        { en: 'Work out each comparison, then match it to < or >',
                        es: 'Resuelve cada comparación, luego relaciónala con < o >',
                        it: 'Risolvi ogni confronto, poi collegalo a < o >',
                        pt: 'Resolva cada comparação, depois combine-a com < ou >',
                        fr: 'Résous chaque comparaison, puis relie-la à < ou >',
                        de: 'Löse jeden Vergleich, dann verbinde ihn mit < oder >',
                        nl: 'Los elke vergelijking op, verbind hem dan met < of >',
                        sv: 'Lös varje jämförelse, koppla sedan ihop den med < eller >',
                        da: 'Løs hver sammenligning, og forbind den så med < eller >',
                        no: 'Løs hver sammenligning, og koble den så til < eller >',
                        fi: 'Ratkaise jokainen vertailu, yhdistä se sitten symboliin < tai >' },
  hintCompare:        { en: 'Tap a comparison, then tap the symbol that makes it true',
                        es: 'Toca una comparación, luego toca el símbolo que la hace verdadera',
                        it: 'Tocca un confronto, poi tocca il simbolo che lo rende vero',
                        pt: 'Toque em uma comparação, depois toque no símbolo que a torna verdadeira',
                        fr: 'Touche une comparaison, puis touche le symbole qui la rend vraie',
                        de: 'Tippe auf einen Vergleich, dann auf das Symbol, das ihn wahr macht',
                        nl: 'Tik op een vergelijking, dan op het symbool dat hem waar maakt',
                        sv: 'Tryck på en jämförelse, sedan på symbolen som gör den sann',
                        da: 'Tryk på en sammenligning, derefter på symbolet, der gør den sand',
                        no: 'Trykk på en sammenligning, deretter på symbolet som gjør den sann',
                        fi: 'Paina vertailua, sitten symbolia, joka tekee sen todeksi' },
  hintTryCompare:     { en: 'Some comparisons aren\'t matched to the right symbol yet — tap a pair to break it and try again',
                        es: 'Algunas comparaciones aún no están relacionadas con el símbolo correcto — toca una pareja para deshacerla e inténtalo de nuevo',
                        it: 'Alcuni confronti non sono ancora collegati al simbolo giusto — tocca una coppia per scioglierla e riprova',
                        pt: 'Algumas comparações ainda não estão combinadas com o símbolo certo — toque em um par para desfazê-lo e tente novamente',
                        fr: 'Certaines comparaisons ne sont pas encore reliées au bon symbole — touche une paire pour la défaire et réessaie',
                        de: 'Manche Vergleiche sind noch nicht mit dem richtigen Symbol verbunden — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                        nl: 'Sommige vergelijkingen zijn nog niet aan het juiste symbool gekoppeld — tik op een paar om het te ontkoppelen en probeer opnieuw',
                        sv: 'Vissa jämförelser är inte ihopkopplade med rätt symbol än — tryck på ett par för att lösa upp det och försök igen',
                        da: 'Nogle sammenligninger er ikke forbundet med det rigtige symbol endnu — tryk på et par for at løse det op og prøv igen',
                        no: 'Noen sammenligninger er ikke koblet til riktig symbol ennå — trykk på et par for å løse det opp og prøv igjen',
                        fi: 'Jotkin vertailut eivät ole vielä yhdistetty oikeaan symboliin — paina paria avataksesi sen ja yritä uudelleen' },

  /* ---- commutative template (1.OA.B.3) chrome. The kid matches each addition
     to the SAME numbers added the other way ("4 + 7" <-> "7 + 4") — the
     commutative property. Each task has 3 pairs with 3 DIFFERENT sums, so each
     sum's two cards are its only commuted pair -> matching is forced, no
     false-correct. 11-locale native-authored (§A.13.48); [NSR-FLAG] sv/da/no/fi.
     titleCommutative/instructionCommutative drive the in-deck title strip + the
     accessibility/meta sentence (swapped via the IIFE; title also synced from
     row.page_title in _loadActivity — kept equal). ---- */
  taskCommutative: {"en":"Match each addition to the same numbers added the other way","de":"Verbinde jede Plusaufgabe mit denselben Zahlen, die andersherum addiert werden","es":"Relaciona cada suma con los mismos números sumados al revés","it":"Collega ogni addizione agli stessi numeri sommati nell'altro ordine","pt":"Combine cada soma com os mesmos números somados na outra ordem","fr":"Relie chaque addition aux mêmes nombres additionnés dans l'autre sens","nl":"Verbind elke optelling met dezelfde getallen in de andere volgorde","sv":"Koppla ihop varje addition med samma tal lagda åt andra hållet","da":"Forbind hvert plusstykke med de samme tal lagt sammen den anden vej","no":"Koble hvert addisjonsstykke til de samme tallene lagt sammen den andre veien","fi":"Yhdistä jokainen yhteenlasku samoihin lukuihin toisessa järjestyksessä"},
  hintCommutative: {"en":"Tap an addition, then tap the one with the same numbers in the other order","de":"Tippe auf eine Plusaufgabe, dann auf die mit denselben Zahlen in der anderen Reihenfolge","es":"Toca una suma, luego toca la que tiene los mismos números en el otro orden","it":"Tocca un'addizione, poi tocca quella con gli stessi numeri nell'ordine opposto","pt":"Toque em uma soma, depois toque na que tem os mesmos números na ordem trocada","fr":"Touche une addition, puis touche celle qui a les mêmes nombres dans l'autre ordre","nl":"Tik op een optelling, tik dan op die met dezelfde getallen in de omgekeerde volgorde","sv":"Tryck på en addition, sedan på den med samma tal i omvänd ordning","da":"Tryk på et plusstykke, og tryk så på det med de samme tal i omvendt rækkefølge","no":"Trykk på et addisjonsstykke, og trykk deretter på det med de samme tallene i motsatt rekkefølge","fi":"Paina yhteenlaskua, paina sitten sitä, jossa on samat luvut toisin päin"},
  hintTryCommutative: {"en":"Some pairs aren't swapped twins yet — tap a pair to break it and try again","de":"Manche Paare sind noch keine vertauschten Zwillinge — tippe ein Paar an, um es zu trennen, und versuch's nochmal","es":"Algunas parejas aún no son gemelas al revés — toca una pareja para deshacerla e inténtalo de nuevo","it":"Alcune coppie non sono ancora gemelle scambiate — tocca una coppia per scioglierla e riprova","pt":"Algumas somas ainda não estão combinadas com seu par trocado — toque em um par para desfazê-lo e tente novamente","fr":"Certaines paires ne sont pas encore des jumelles inversées — touche une paire pour la défaire et réessaie","nl":"Sommige paren zijn nog geen omgewisselde tweelingen — tik op een paar om het te ontkoppelen en probeer opnieuw","sv":"Vissa par är inte omvända tvillingar än — tryck på ett par för att koppla loss det och försök igen","da":"Nogle par er ikke byttet om endnu — tryk på et par for at løse det op og prøv igen","no":"Noen par er ikke byttetvillinger ennå — trykk på et par for å løse det opp og prøv igjen","fi":"Jotkin parit eivät ole vielä käännettyjä kaksosia — paina paria avataksesi sen ja yritä uudelleen"},
  titleCommutative: {"en":"Add It Both Ways","de":"Beide Wege Rechnen","es":"Suma de las Dos Maneras","it":"Aggiungi Nei Due Ordini","pt":"Some de Duas Maneiras","fr":"Relie les Deux Additions","nl":"Tel Het Op Twee Manieren","sv":"Lägg Ihop På Två Sätt","da":"Læg Sammen Begge Veje","no":"Legg Sammen Begge Veier","fi":"Yhteenlasku Kumpaankin Suuntaan"},
  instructionCommutative: {"en":"Adding numbers in any order makes the same total. Match each addition to the same numbers added the other way, then tap Check.","de":"Zahlen in beliebiger Reihenfolge zu addieren ergibt dieselbe Summe. Verbinde jede Plusaufgabe mit denselben Zahlen, die andersherum addiert werden, und tippe dann auf Prüfen.","es":"Sumar los números en cualquier orden da el mismo total. Relaciona cada suma con los mismos números sumados al revés, luego toca Comprobar.","it":"Sommare i numeri in qualsiasi ordine dà sempre lo stesso totale. Collega ogni addizione agli stessi numeri sommati nell'altro ordine, poi tocca Controlla.","pt":"Somar números em qualquer ordem dá o mesmo total. Combine cada soma com os mesmos números somados na outra ordem, depois toque em Verificar.","fr":"Additionner des nombres dans n'importe quel ordre donne le même total. Relie chaque addition aux mêmes nombres additionnés dans l'autre sens, puis touche Vérifier.","nl":"Getallen optellen in welke volgorde dan ook geeft dezelfde uitkomst. Verbind elke optelling met dezelfde getallen in de andere volgorde en tik dan op Controleer.","sv":"Att lägga ihop tal i vilken ordning som helst ger samma summa. Koppla ihop varje addition med samma tal lagda åt andra hållet, tryck sedan på Kontrollera.","da":"Når du lægger tal sammen, får du det samme i alt, uanset hvilken vej du gør det. Forbind hvert plusstykke med de samme tal lagt sammen den anden vej, og tryk så på Tjek.","no":"Når du legger sammen tall, blir summen den samme uansett rekkefølge. Koble hvert addisjonsstykke til de samme tallene lagt sammen den andre veien, og trykk så på Sjekk.","fi":"Lukujen järjestys ei muuta summaa. Yhdistä jokainen yhteenlasku samoihin lukuihin toisin päin laskettuna, paina sitten Tarkista."}
};

/* Fallback static task set when no ?activity= is given. Same shape as
   the manifest's params.tasks array. */
var STATIC_DEMO_TASKS_MP = makeMatchTasks([
  { target: 3, cards: [0, 3, 1, 2] },
  { target: 5, cards: [0, 5, 1, 4, 2, 3] }
], 'demo');

function makeMatchTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var target = t.target;
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.make-' + target + '-' + i,
      promptKey: 'taskMakeN',
      promptArgs: { n: target },
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ target: target, cards: cards });
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every pair sums to target. */
        if (!tool.allPaired()) return false;
        for (var i = 0; i < tool.pairsFormed.length; i++) {
          var p = tool.pairsFormed[i];
          var sum = tool.cards[p[0]] + tool.cards[p[1]];
          if (sum !== target) {
            /* Mark wrong pairs visually + speak nudge. */
            tool.markWrongPairs();
            tool.speakTryAgain();
            return false;
          }
        }
        /* Correct! Lock the board + speak celebration. */
        tool.readOnly = true;
        tool.paint();
        tool.speakAllPairs();
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintFormPairs';
        return 'hintTryDifferent';
      }
    };
  });
}

/* task_template 'equal-value' (1.OA.D.7) — the kid works out each card
   (results are HIDDEN in `display`, e.g. "2 + 3" / "6 − 1") and matches the
   addition to the subtraction with the SAME answer. Each task has two pairs
   with two DIFFERENT answers, so each value maps to exactly one addition +
   one subtraction → every match is unique and there is no false-correct
   configuration. Cards are {display, kind, value} objects; validity is
   `a.value === b.value`. No single target → no banner (core omits it for
   object cards) and the celebration is number-free ("You matched every
   pair!"). The numeric make-n (K.OA.A.3) path is unaffected. */
function makeEqualValueTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskEqualValue',
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ cards: cards });   /* no single target */
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two
           cards of EQUAL value (the addition and the subtraction that share
           an answer). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          /* Mark mismatched pairs visually + speak the gentle nudge. This
             template sets wrongIdxSet directly (core markWrongPairs is
             sum-based and unused here). */
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board + speak a TRUTHFUL, number-free
           celebration (a task has two different answers, so "All pairs make
           {n}!" would be false). */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var done = (tool.strings.speakMatchedAll && tool.strings.speakMatchedAll[tool.language])
                     || tool.strings.speakMatchedAll.en;
          window.LCSAudio.speak({ type: 'ui', text: done, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintEqualValue';
        return 'hintTryEqualValue';
      }
    };
  });
}

/* Value-verified number-words (the 15 values used by
   match-pairs.three-ways-to-show-a-number), per locale. Each locale's entries
   EQUAL PlaceValueCore._NUMBER_WORD_HELPERS.<locale>(n, 'cardinal') — copied as
   a flat lookup per the locked engine-decoupling doctrine — NO PlaceValueCore
   import (§0.4 / feedback_cognate_aware_verify_discipline.md). The word-card
   DISPLAY is sourced from this table at render time (the manifest's word-card
   display is a language-neutral placeholder); numeral + expanded cards stay
   language-neutral. New locales add one block here, value-verified at build. */
var THREE_FORM_WORDS = {
  en: {
    605: 'six hundred five', 730: 'seven hundred thirty', 314: 'three hundred fourteen',
    247: 'two hundred forty-seven',  562: 'five hundred sixty-two',  305: 'three hundred five',
    836: 'eight hundred thirty-six', 481: 'four hundred eighty-one', 420: 'four hundred twenty',
    615: 'six hundred fifteen',      700: 'seven hundred',           208: 'two hundred eight',
    353: 'three hundred fifty-three',940: 'nine hundred forty',      190: 'one hundred ninety',
    560: 'five hundred sixty',       274: 'two hundred seventy-four', 409: 'four hundred nine'
  },
  /* DE: units-first single-word (zweihundertsiebenundvierzig); einhundert
     convention; ß; sechzig/siebzig. Value-verified vs _NUMBER_WORD_HELPERS.de
     2026-05-31 (15/15). */
  de: {
    605: 'sechshundertfünf', 730: 'siebenhundertdreißig', 314: 'dreihundertvierzehn',
    247: 'zweihundertsiebenundvierzig', 562: 'fünfhundertzweiundsechzig',  305: 'dreihundertfünf',
    836: 'achthundertsechsunddreißig',  481: 'vierhunderteinundachtzig',   420: 'vierhundertzwanzig',
    615: 'sechshundertfünfzehn',        700: 'siebenhundert',              208: 'zweihundertacht',
    353: 'dreihundertdreiundfünfzig',   940: 'neunhundertvierzig',         190: 'einhundertneunzig',
    560: 'fünfhundertsechzig',          274: 'zweihundertvierundsiebzig',  409: 'vierhundertneun'
  },
  /* ES: multi-word, space-separated; "y" joiner ONLY in the sub-99 tens-units
     tail (cuarenta y siete), NEVER between hundreds and tens (trescientos cinco);
     irregular hundreds quinientos/setecientos/novecientos (500/700/900); "ciento"
     in compounds (ciento noventa); "uno" (not un) in card tails. Value-verified vs
     _NUMBER_WORD_HELPERS.es 2026-06-01 (15/15). */
  es: {
    605: 'seiscientos cinco', 730: 'setecientos treinta', 314: 'trescientos catorce',
    247: 'doscientos cuarenta y siete', 562: 'quinientos sesenta y dos',    305: 'trescientos cinco',
    836: 'ochocientos treinta y seis',  481: 'cuatrocientos ochenta y uno', 420: 'cuatrocientos veinte',
    615: 'seiscientos quince',          700: 'setecientos',                 208: 'doscientos ocho',
    353: 'trescientos cincuenta y tres',940: 'novecientos cuarenta',        190: 'ciento noventa',
    560: 'quinientos sesenta',          274: 'doscientos setenta y cuatro', 409: 'cuatrocientos nueve'
  },
  /* IT: one-word compound, no joiner (duecentoquarantasette); compound hundreds
     duecento..novecento (no irregulars); vowel-elision at the cento+vowel boundary
     (208 duecentotto; 481 quattrocentottantuno — cento+ottanta→centottanta, +uno);
     bare "cento" for h=1 (190 centonovanta); accent on -tré tails
     (353 trecentocinquantatré). Value-verified vs _NUMBER_WORD_HELPERS.it
     2026-06-01 (15/15). */
  it: {
    605: 'seicentocinque', 730: 'settecentotrenta', 314: 'trecentoquattordici',
    247: 'duecentoquarantasette',  562: 'cinquecentosessantadue',  305: 'trecentocinque',
    836: 'ottocentotrentasei',     481: 'quattrocentottantuno',    420: 'quattrocentoventi',
    615: 'seicentoquindici',       700: 'settecento',              208: 'duecentotto',
    353: 'trecentocinquantatré',   940: 'novecentoquaranta',       190: 'centonovanta',
    560: 'cinquecentosessanta',    274: 'duecentosettantaquattro', 409: 'quattrocentonove'
  },
  /* PT (Brazilian canonical): multi-word, " e " joiner at EVERY level
     (duzentos e quarenta e sete — distinct from ES which joins only within the
     sub-99 tail); irregular hundred quinhentos (500); compound hundreds
     duzentos..novecentos; bare "cem" for n=100, "cento" in compounds (190
     cento e noventa); "um" (masc) in card tails (481 quatrocentos e oitenta e
     um); BR teens dezesseis/dezessete/dezenove (not EU dezasseis…); accents
     (353 trezentos e cinquenta e três). Value-verified vs _NUMBER_WORD_HELPERS.pt
     2026-06-01 (15/15). */
  pt: {
    605: 'seiscentos e cinco', 730: 'setecentos e trinta', 314: 'trezentos e quatorze',
    247: 'duzentos e quarenta e sete',  562: 'quinhentos e sessenta e dois',  305: 'trezentos e cinco',
    836: 'oitocentos e trinta e seis',  481: 'quatrocentos e oitenta e um',   420: 'quatrocentos e vinte',
    615: 'seiscentos e quinze',         700: 'setecentos',                    208: 'duzentos e oito',
    353: 'trezentos e cinquenta e três',940: 'novecentos e quarenta',         190: 'cento e noventa',
    560: 'quinhentos e sessenta',       274: 'duzentos e setenta e quatro',   409: 'quatrocentos e nove'
  },
  /* FR: classic convention — space at the hundred boundary, hyphens within the
     sub-99 tail (deux cent quarante-sept); cent→cents only on round ×100 (sept
     cents); vigesimal 70s/90s; bare "cent" for h=1. Value-verified vs
     _NUMBER_WORD_HELPERS.fr 2026-05-31 (15/15). */
  fr: {
    605: 'six cent cinq', 730: 'sept cent trente', 314: 'trois cent quatorze',
    247: 'deux cent quarante-sept',  562: 'cinq cent soixante-deux',      305: 'trois cent cinq',
    836: 'huit cent trente-six',     481: 'quatre cent quatre-vingt-un',  420: 'quatre cent vingt',
    615: 'six cent quinze',          700: 'sept cents',                   208: 'deux cent huit',
    353: 'trois cent cinquante-trois',940: 'neuf cent quarante',          190: 'cent quatre-vingt-dix',
    560: 'cinq cent soixante',       274: 'deux cent soixante-quatorze',  409: 'quatre cent neuf'
  },
  /* DA: spaced " og " joiner (tohundrede og syvogfyrre — NOT compound);
     units-first tens (syvogfyrre = 7+og+40); vigesimal halvtreds/tres/
     halvfjerds/firs/halvfems (50/60/70/80/90); fyrre=40 (not vigesimal);
     bare "hundrede" for h=1. Value-verified vs _NUMBER_WORD_HELPERS.da
     2026-05-31 (15/15). [NSR-FLAG][da] */
  da: {
    605: 'sekshundrede og fem', 730: 'syvhundrede og tredive', 314: 'trehundrede og fjorten',
    247: 'tohundrede og syvogfyrre',    562: 'femhundrede og toogtres',        305: 'trehundrede og fem',
    836: 'ottehundrede og seksogtredive',481: 'firehundrede og enogfirs',       420: 'firehundrede og tyve',
    615: 'sekshundrede og femten',      700: 'syvhundrede',                    208: 'tohundrede og otte',
    353: 'trehundrede og treoghalvtreds',940: 'nihundrede og fyrre',            190: 'hundrede og halvfems',
    560: 'femhundrede og tres',         274: 'tohundrede og fireoghalvfjerds',  409: 'firehundrede og ni'
  },
  /* NO (Bokmål): FULLY-COMPOUND, no spaces (tohundreogførtisju); decimal
     tens-first (førtisju = 40+7); hundre (not hundrede); bare "hundre" for
     h=1; sju (7); "én" (acute) for 1 in tails. Value-verified vs
     _NUMBER_WORD_HELPERS.no 2026-05-31 (15/15). [NSR-FLAG][no] */
  no: {
    605: 'sekshundreogfem', 730: 'sjuhundreogtretti', 314: 'trehundreogfjorten',
    247: 'tohundreogførtisju',     562: 'femhundreogsekstito',     305: 'trehundreogfem',
    836: 'åttehundreogtrettiseks', 481: 'firehundreogåttién',      420: 'firehundreogtjue',
    615: 'sekshundreogfemten',     700: 'sjuhundre',               208: 'tohundreogåtte',
    353: 'trehundreogfemtitre',    940: 'nihundreogførti',         190: 'hundreognitti',
    560: 'femhundreogseksti',      274: 'tohundreogsyttifire',     409: 'firehundreogni'
  },
  /* SV: compound with NO joiner word (tvåhundrafyrtiosju — third Nordic
     pattern, distinct from DA spaced "og" + NO compound "og"); decimal -o
     tens (fyrtio/sextio/sjuttio/åttio/nittio); hundra (not hundrede/hundre);
     bare "hundra" for h=1; "ett" (neuter) for 1 in tails. Value-verified vs
     _NUMBER_WORD_HELPERS.sv 2026-05-31 (15/15). [NSR-FLAG][sv] */
  sv: {
    605: 'sexhundrafem', 730: 'sjuhundratrettio', 314: 'trehundrafjorton',
    247: 'tvåhundrafyrtiosju',    562: 'femhundrasextiotvå',    305: 'trehundrafem',
    836: 'åttahundratrettiosex',  481: 'fyrahundraåttioett',    420: 'fyrahundratjugo',
    615: 'sexhundrafemton',       700: 'sjuhundra',             208: 'tvåhundraåtta',
    353: 'trehundrafemtiotre',    940: 'niohundrafyrtio',       190: 'hundranittio',
    560: 'femhundrasextio',       274: 'tvåhundrasjuttiofyra',  409: 'fyrahundranio'
  },
  /* FI (Finnic): pure agglutination, single word, NO joiner (kaksisataa-
     neljäkymmentäseitsemän); tens X+kymmentä; hundreds X+sataa; bare "sata"
     for 100; "yksi" for 1 in tails. Longest word card 481 = 31 chars (the
     .mp-word break rail's hardest test). Value-verified vs
     _NUMBER_WORD_HELPERS.fi 2026-05-31 (15/15). [NSR-FLAG][fi] */
  fi: {
    605: 'kuusisataaviisi', 730: 'seitsemänsataakolmekymmentä', 314: 'kolmesataaneljätoista',
    247: 'kaksisataaneljäkymmentäseitsemän', 562: 'viisisataakuusikymmentäkaksi',   305: 'kolmesataaviisi',
    836: 'kahdeksansataakolmekymmentäkuusi', 481: 'neljäsataakahdeksankymmentäyksi',420: 'neljäsataakaksikymmentä',
    615: 'kuusisataaviisitoista',            700: 'seitsemänsataa',                208: 'kaksisataakahdeksan',
    353: 'kolmesataaviisikymmentäkolme',     940: 'yhdeksänsataaneljäkymmentä',    190: 'satayhdeksänkymmentä',
    560: 'viisisataakuusikymmentä',          274: 'kaksisataaseitsemänkymmentäneljä',409: 'neljäsataayhdeksän'
  },
  /* NL: units-first one-word compound (tweehonderdzevenenveertig); diaeresis ë
     only when stem ends in e (tweeën/drieën); bare "een" (NO acute) for 1 in
     tails; honderd; bare "honderd" for h=1. Value-verified vs
     _NUMBER_WORD_HELPERS.nl 2026-05-31 (15/15). NL is NOT NSR (Germanic). */
  nl: {
    605: 'zeshonderdvijf', 730: 'zevenhonderddertig', 314: 'driehonderdveertien',
    247: 'tweehonderdzevenenveertig', 562: 'vijfhonderdtweeënzestig',  305: 'driehonderdvijf',
    836: 'achthonderdzesendertig',    481: 'vierhonderdeenentachtig',  420: 'vierhonderdtwintig',
    615: 'zeshonderdvijftien',        700: 'zevenhonderd',             208: 'tweehonderdacht',
    353: 'driehonderddrieënvijftig',  940: 'negenhonderdveertig',      190: 'honderdnegentig',
    560: 'vijfhonderdzestig',         274: 'tweehonderdvierenzeventig',409: 'vierhonderdnegen'
  }
};

/* Anti-predictability placement for three-form. The board is 6 cards in a
   responsive grid (2-col <600px, 3-col ≥600px). A plain shuffle frequently
   leaves a number's two cards visually stacked in one column ("every column is a
   pair" → kid matches top↔bottom without reading each card). 6 slots can't make
   every pair non-adjacent at BOTH breakpoints (min adjacency = 1), so we MINIMIZE
   a visual-adjacency penalty summed over both geometries: a same-value pair
   scores when horizontally adjacent (flat-distance 1, same row) or vertically
   stacked (distance 2 at 2-col / distance 3 at 3-col). Sample shuffles, keep the
   lowest penalty with a RANDOM tie-break so the layout still varies per load —
   never the clean all-columns transposition; at most ~1 guessable pair. */
function scatterThreeForm(cards) {
  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  function penalty(arr) {
    var p = 0;
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        var a = arr[i], b = arr[j];
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || a.value !== b.value) continue;
        var d = j - i;
        /* 2-col grid: horiz-adjacent (d=1 same row) OR vert-stacked (d=2). */
        if (d === 1 && Math.floor(i / 2) === Math.floor(j / 2)) p++;
        if (d === 2) p++;
        /* 3-col grid: horiz-adjacent (d=1 same row) OR vert-stacked (d=3). */
        if (d === 1 && Math.floor(i / 3) === Math.floor(j / 3)) p++;
        if (d === 3) p++;
      }
    }
    return p;
  }
  var best = shuffle(cards), bestP = penalty(best);
  for (var k = 0; k < 60; k++) {
    var cand = shuffle(cards), cp = penalty(cand);
    if (cp < bestP || (cp === bestP && Math.random() < 0.5)) { best = cand; bestP = cp; }
  }
  return best;
}

/* task_template 'three-form' (2.NBT.A.3) — "Read and write numbers to 1000
   using base-ten numerals, number names, and expanded form." Each task shows
   6 cards = 3 pairs; each number's value appears on exactly TWO cards, bridging
   two of its three representations (numeral / expanded "200 + 40 + 7" /
   number-word "two hundred forty-seven"). Across the task all three forms
   appear; across the activity every bridge type (numeral↔expanded,
   numeral↔word, word↔expanded) is exercised. Validity is the same value-
   equality as equal-value (a.value === b.value), so the engine state machine +
   connector renderer are UNCHANGED. On correct Check the three matched number-
   words are spoken in ascending order (reading 3-digit numbers aloud is the
   2.NBT.A.3 teaching point), then a number-free celebration. The only engine
   additions are the .mp-word wrapping face + the _speakWordTable tap-audio
   branch in match-pairs-core.js. */
function makeThreeFormTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskThreeForm',
      answerType: 'state',
      setup: function (tool) {
        /* Per-locale word-card display + tap-audio table; numeral/expanded
           cards stay language-neutral. For EN, wt.en[value] === the manifest
           display, so EN renders byte-identical. */
        var wt = THREE_FORM_WORDS[tool.language] || THREE_FORM_WORDS.en;
        var localized = cards.map(function (c) {
          if (c && c.kind === 'word' && typeof c.value === 'number' && wt[c.value]) {
            return { display: wt[c.value], kind: 'word', value: c.value };
          }
          return c;
        });
        tool.setupTask({ cards: localized });       /* resets state; its shuffle is overridden below */
        tool.cards = scatterThreeForm(tool.cards);  /* anti-predictable placement (no column-stacking) */
        tool.cardsState = tool.cards.map(function () { return 'unpaired'; });
        tool._speakWordTable = wt;                  /* number-word tap-audio + spoken-summary table */
        tool.render();                              /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two
           cards of EQUAL value (two representations of the same number). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          /* Mark mismatched pairs visually + speak the gentle nudge (sets
             wrongIdxSet directly; core markWrongPairs is sum-based, unused here). */
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board, then speak each matched number-word in
           ascending order followed by a truthful number-free celebration. */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var vals = [];
          tool.cards.forEach(function (c) {
            if (c && typeof c === 'object' && typeof c.value === 'number' && vals.indexOf(c.value) < 0) {
              vals.push(c.value);
            }
          });
          vals.sort(function (x, y) { return x - y; });
          var wt = tool._speakWordTable || THREE_FORM_WORDS.en;
          var words = vals.map(function (v) { return wt[v] || String(v); });
          var done = (tool.strings.speakThreeFormDone && tool.strings.speakThreeFormDone[tool.language])
                     || tool.strings.speakThreeFormDone.en;
          var text = words.join('. ') + '. ' + done;
          window.LCSAudio.speak({ type: 'ui', text: text, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintThreeForm';
        return 'hintTryThreeForm';
      }
    };
  });
}

/* task_template 'find-missing' (1.OA.D.8) — "Determine the unknown whole
   number in an addition or subtraction equation relating three whole numbers."
   The kid works out the blank in each equation card (the blank sits in any
   position — "8 + ? = 11", "? + 4 = 9", "12 − ? = 5", "9 − 4 = ?") and matches
   it to the solution-number card. Each task has two pairs with two DIFFERENT
   answers, so every value maps to exactly one equation card + one number card →
   matching is forced equation↔number and there is no false-correct. Cards are
   {display, kind, value} objects; validity is `a.value === b.value` — IDENTICAL
   to equal-value, so the engine state machine + connector renderer are
   UNCHANGED (no core.js touch, no _speakWordTable → taps silent like
   equal-value, no PlaceValueCore). Number-free celebration ("You matched every
   pair!"). Only divergence from equal-value is the prompt/hint string keys. */
function makeFindMissingTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskFindMissing',
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ cards: cards });   /* no single target */
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two cards
           of EQUAL value (the equation and the number that solves it). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board + speak the truthful, number-free
           celebration (a task has two different answers). */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var done = (tool.strings.speakMatchedAll && tool.strings.speakMatchedAll[tool.language])
                     || tool.strings.speakMatchedAll.en;
          window.LCSAudio.speak({ type: 'ui', text: done, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintFindMissing';
        return 'hintTryFindMissing';
      }
    };
  });
}

/* task_template 'compare-3digit' (2.NBT.A.4) — "Compare two three-digit numbers
   using >, =, < symbols." The kid reads each comparison card (e.g. "247 ___ 274")
   and matches it to the relation symbol that makes it true. Each task has two
   pairs with two DIFFERENT values (value 1 = the < pair, value 2 = the > pair),
   so the two relation cards are visually distinct (< vs >) and matching is forced
   expr↔symbol with no false-correct. Cards are {display, kind, value} objects;
   validity is `a.value === b.value` — IDENTICAL to equal-value/find-missing, so
   the engine state machine + connector renderer are UNCHANGED (no core.js touch,
   no _speakWordTable → taps silent, no PlaceValueCore). Number-free celebration.
   Only divergence from find-missing is the prompt/hint string keys. */
function makeCompareTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskCompare',
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ cards: cards });   /* no single target */
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two cards
           of EQUAL value (the comparison and the < / > symbol that makes it true). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board + speak the truthful, number-free celebration. */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var done = (tool.strings.speakMatchedAll && tool.strings.speakMatchedAll[tool.language])
                     || tool.strings.speakMatchedAll.en;
          window.LCSAudio.speak({ type: 'ui', text: done, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintCompare';
        return 'hintTryCompare';
      }
    };
  });
}

/* task_template 'commutative' (1.OA.B.3) — "Apply properties of operations as
   strategies to add and subtract." The commutative property is the match-pairs-
   NATIVE instantiation: each task shows 6 cards = 3 pairs, each pair an addition
   and its COMMUTED form ("4 + 7" ↔ "7 + 4"), and the matching VERB *is*
   commutativity (same sum, swapped order). Each task uses 3 DISTINCT sums, so a
   sum's only two cards are its a+b / b+a → matching is forced to the commuted
   partner with no false-correct. Cards are {display, kind:'expr', value} objects;
   validity is `a.value === b.value` — IDENTICAL to equal-value/find-missing/
   compare-3digit, so the engine state machine + connector renderer are UNCHANGED
   (no core.js touch, no _speakWordTable → taps silent, no PlaceValueCore).
   Number-free celebration ("You matched every pair!"). Scatter reuses
   scatterThreeForm (6 cards; value-generic) to avoid column-stacking giveaways.
   Distinct from 1.OA.D.7 equal-value (that matches addition↔SUBTRACTION; this
   matches addition↔commuted-addition). */
function makeCommutativeTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskCommutative',
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ cards: cards });          /* core Fisher-Yates shuffle */
        tool.cards = scatterThreeForm(tool.cards); /* anti-column-stack (value-generic) */
        tool.cardsState = tool.cards.map(function () { return 'unpaired'; });
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two cards
           of EQUAL value (an addition and its commuted form). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board + speak the truthful, number-free celebration
           (a task has three different sums). */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var done = (tool.strings.speakMatchedAll && tool.strings.speakMatchedAll[tool.language])
                     || tool.strings.speakMatchedAll.en;
          window.LCSAudio.speak({ type: 'ui', text: done, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintCommutative';
        return 'hintTryCommutative';
      }
    };
  });
}

/* Per-pass order-only reshuffle (§A.13.60) — ported verbatim from
   number-bond-activity.js. Used ONLY by the commutative template (which installs
   tool.nextTask + nulls tool.tasks); the other 5 match-pairs activities keep the
   shell's per-mount tool.tasks[] path byte-identical. */
function _sameOrderMP(a, b) {
  if (!b || a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
  return true;
}
function shuffledOrderMP(n, prev) {
  var idx = [], i, j, t;
  for (i = 0; i < n; i++) idx.push(i);
  if (n < 2) return idx;
  do {
    for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  } while (_sameOrderMP(idx, prev));
  return idx;
}

window.MatchPairsActivity = Object.assign({}, MatchPairsCore, {
  id: 'match-pairs-activity',
  strings: Object.assign({}, MatchPairsCore.strings, ACTIVITY_STRINGS_MP, {
    title: {
      en: 'Make the Number',
      de: 'Bilde die Zahl',
      es: 'Forma el número',
      it: 'Forma il numero',
      fr: 'Compose le nombre',
      pt: 'Forme o número',
      nl: 'Maak het getal',
      sv: 'Gör talet',
      da: 'Lav tallet',
      no: 'Lag tallet',
      fi: 'Tee luku'
    },
    instruction: {
      en: 'Find pairs of numbers that add up to the target. Tap Check when you\'re ready.',
      de: 'Finde Zahlenpaare, die zusammen das Ziel ergeben. Tippe auf Prüfen, wenn du fertig bist.',
      es: 'Encuentra parejas de números que sumen el objetivo. Toca Comprobar cuando estés listo.',
      it: 'Trova coppie di numeri che fanno l\'obiettivo. Tocca Verifica quando sei pronto.',
      fr: 'Trouve des paires de nombres qui font l\'objectif. Touche Vérifier quand tu es prêt.',
      pt: 'Encontre pares de números que formam o objetivo. Toque em Verificar quando estiver pronto.',
      nl: 'Zoek getallenparen die samen het doel maken. Tik op Controleer als je klaar bent.',
      sv: 'Hitta talpar som tillsammans blir målet. Tryck på Kontrollera när du är klar.',
      da: 'Find talpar, der tilsammen bliver målet. Tryk på Tjek, når du er klar.',
      no: 'Finn tallpar som til sammen blir målet. Trykk på Sjekk når du er klar.',
      fi: 'Etsi lukupareja, jotka yhdessä tekevät tavoitteen. Paina Tarkista kun olet valmis.'
    }
  }),

  /* tasks resolved lazily: by ?activity=<id> if present, else fallback. */
  tasks: STATIC_DEMO_TASKS_MP,

  init: function (api) {
    MatchPairsCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/match-pairs-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      /* Sync the in-iframe shell title to this row's page_title. The shell
         rendered the generic facade title at mount (before this async fetch
         resolved); with two+ activities on one facade the specific title
         must come from the loaded row. Guarded to write ONLY when the text
         differs, so K.OA.A.3 (whose facade title == page_title in every
         locale) gets ZERO DOM mutation and stays byte-identical. */
      var titleEl = document.querySelector('.lcs-title');
      var wantTitle = row.page_title && row.page_title[self.language];
      if (titleEl && wantTitle && titleEl.textContent !== wantTitle) {
        titleEl.textContent = wantTitle;
      }
      if (row.task_template === 'commutative') {
        /* §A.13.60 per-pass reshuffle: install nextTask + null tasks so the
           shell routes through tool.nextTask() (tasks takes priority in the
           shell, so it MUST be null here). The other 5 templates fall to the
           else and keep the per-mount tool.tasks[] path byte-identical. */
        self._pool = self._buildTasksFromRow(row);
        self.tasks = null;
        self._order = null; self._curPass = 0; self._orderForPool = null;
        self.nextTask = function (opts) {
          var pool = (self._pool && self._pool.length) ? self._pool : STATIC_DEMO_TASKS_MP;
          var n = pool.length;
          var i = (opts && opts.index) || 0;
          if (!self._order || self._orderForPool !== pool || self._order.length !== n) {
            self._order = shuffledOrderMP(n, null);
            self._orderForPool = pool;
            self._curPass = 0;
          }
          var pass = (n > 0) ? Math.floor(i / n) : 0;
          if (pass > self._curPass) { self._order = shuffledOrderMP(n, self._order); self._curPass = pass; }
          return pool[self._order[i % n]];
        };
      } else {
        self.tasks = self._buildTasksFromRow(row);
      }
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[match-pairs-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'make-n') {
      var tasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeMatchTasks(tasks, row.id);
    }
    if (row.task_template === 'equal-value') {
      var evTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeEqualValueTasks(evTasks, row.id);
    }
    if (row.task_template === 'three-form') {
      var tfTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeThreeFormTasks(tfTasks, row.id);
    }
    if (row.task_template === 'find-missing') {
      var fmTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeFindMissingTasks(fmTasks, row.id);
    }
    if (row.task_template === 'compare-3digit') {
      var cmpTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeCompareTasks(cmpTasks, row.id);
    }
    if (row.task_template === 'commutative') {
      var coTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      /* defensive: each task = 6 cards / 3 DISTINCT sums / each pair a true
         commuted addition a≠b. Warn (don't throw) so a stray task is visible
         in dev without breaking the live board. */
      if (window.console && console.warn) {
        coTasks.forEach(function (t, ti) {
          var cs = (t && Array.isArray(t.cards)) ? t.cards : [];
          if (cs.length !== 6) console.warn('[match-pairs-activity] commutative task ' + ti + ' has ' + cs.length + ' cards (expected 6)');
          var vals = {};
          cs.forEach(function (c) { if (c && typeof c.value === 'number') vals[c.value] = (vals[c.value] || 0) + 1; });
          var keys = Object.keys(vals);
          if (keys.length !== 3) console.warn('[match-pairs-activity] commutative task ' + ti + ' has ' + keys.length + ' distinct sums (expected 3)');
          keys.forEach(function (v) { if (vals[v] !== 2) console.warn('[match-pairs-activity] commutative task ' + ti + ' sum ' + v + ' appears ' + vals[v] + 'x (expected 2)'); });
        });
      }
      return makeCommutativeTasks(coTasks, row.id);
    }
    return STATIC_DEMO_TASKS_MP;
  }
});

/* The shell reads tool.strings.title/instruction at MOUNT (before init + before
   the async manifest fetch). For the commutative activity, swap them to the
   commutative variants synchronously (this module runs before the inline
   LCS.mount) so the in-deck title strip + the accessibility/meta sentence read
   "Add It Both Ways" — not "Make the Number". The default (make-n) path and the
   other 4 templates are untouched. (Per-task prompt is handled via
   promptKey:'taskCommutative'; the title is also synced from row.page_title in
   _loadActivity — kept equal, so no flash.) */
(function () {
  var p = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
  var id = p ? p.get('activity') : null;
  if (id && id.indexOf('add-it-both-ways') >= 0) {
    MatchPairsActivity.strings = Object.assign({}, MatchPairsActivity.strings, {
      title: MatchPairsActivity.strings.titleCommutative,
      instruction: MatchPairsActivity.strings.instructionCommutative
    });
  }
})();

MatchPairsCore.injectCSS();
