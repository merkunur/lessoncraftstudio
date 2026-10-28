/* =====================================================================
   value-keys-activity.js — ACTIVITY #150 of the one-by-one rebuild:
   "Expanded Form" → THE VALUE-KEY ADDING MACHINE (2.NBT.A.3 with
   1.NBT.B.2; G1-120/121/122/133, G2-223/225; all 11 locales).
   Model: value-keys-core.js (ValueKeysCore).
   Design: docs/activities-rebuild/designs/150-place-value.md
   ---------------------------------------------------------------------
   The invention: an adding machine whose keys are labelled with what
   they are WORTH (100…900, 10…90, 1…9). A column holds one key and
   there is no zero key, so making 305 means pressing 300 and 5 and
   nothing in the tens. The crank adds; the drums show the sum; the
   tape prints the expanded form, largest first. Jobs: make · read the
   blocks · what is the bright digit worth · which set? (two digits).
   No timer, no score, no words on the apparatus: numerals and blocks.
   Wide stages show the whole bank of key columns; narrow stages show
   one tab per place and that place's nine keys as a 3 × 3 pad
   (smallest bottom-left, largest top-right: bigger is still higher).
   Test seams: window.ValueKeysActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._press / ._tab / ._feed /
   ._crank / .FAST / .OK_MS.
   ===================================================================== */
var ValueKeysActivity = {
  id: 'value-keys',
  /* the drawn apparatus (the hierarchy gate): the machine, its keys, drums, tape, crank, the blocks, the ticket */
  apparatusClasses: ['vk-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Expanded Form","de":"Zahlen zerlegen","fr":"Forme développée","es":"Forma desarrollada","pt":"Forma expandida","it":"Scomposizione dei numeri","nl":"Getallen splitsen","sv":"Utvecklad form","da":"Udvidet form","no":"Utvidet form","fi":"Luvun hajotelma"},
    instruction: {"en":"Every key is worth what it says. Press at most one key in each place, then pull the crank.","de":"Jede Taste ist so viel wert, wie auf ihr steht. Drück an jeder Stelle höchstens eine Taste und zieh dann an der Kurbel.","fr":"Chaque touche vaut ce qui est écrit dessus. Appuie sur une touche au plus par rang, puis tire la manivelle.","es":"Cada tecla vale lo que dice. Oprime como máximo una tecla en cada lugar y luego jala la manivela.","pt":"Cada tecla vale o que está escrito nela. Aperte no máximo uma tecla em cada ordem e depois puxe a manivela.","it":"Ogni tasto vale quello che c’è scritto sopra. Premi al massimo un tasto per ogni posto, poi tira la manovella.","nl":"Elke toets is waard wat erop staat. Druk per plaats hoogstens één toets in en trek dan aan de hendel.","sv":"Varje tangent är värd det som står på den. Tryck på högst en tangent för varje position och dra sedan i veven.","da":"Hver tast er det værd, der står på den. Tryk på højst én tast for hver plads, og træk så i håndsvinget.","no":"Hver tast er verdt det som står på den. Trykk på høyst én tast for hver plass, og dra så i sveiven.","fi":"Jokainen näppäin on sen arvoinen, mitä siinä lukee. Paina jokaisessa kohdassa enintään yhtä näppäintä ja vedä sitten kammesta."},
    setNumbers: {"en":"Numbers","de":"Zahlen","fr":"Nombres","es":"Números","pt":"Números","it":"Numeri","nl":"Getallen","sv":"Tal","da":"Tal","no":"Tall","fi":"Luvut"},
    nTwo: {"en":"tens and ones","de":"Zehner und Einer","fr":"dizaines et unités","es":"decenas y unidades","pt":"dezenas e unidades","it":"decine e unità","nl":"tientallen en eenheden","sv":"tiotal och ental","da":"tiere og enere","no":"tiere og enere","fi":"kymmenet ja ykköset"},
    nThree: {"en":"hundreds, tens and ones","de":"Hunderter, Zehner und Einer","fr":"centaines, dizaines et unités","es":"centenas, decenas y unidades","pt":"centenas, dezenas e unidades","it":"centinaia, decine e unità","nl":"honderdtallen, tientallen en eenheden","sv":"hundratal, tiotal och ental","da":"hundreder, tiere og enere","no":"hundrere, tiere og enere","fi":"sadat, kymmenet ja ykköset"},
    setJob: {"en":"Job","de":"Aufgabe","fr":"Tâche","es":"Tarea","pt":"Tarefa","it":"Compito","nl":"Opdracht","sv":"Uppgift","da":"Opgave","no":"Oppgave","fi":"Tehtävä"},
    jMake: {"en":"make the number","de":"Zahl bilden","fr":"former le nombre","es":"formar el número","pt":"formar o número","it":"formare il numero","nl":"getal maken","sv":"bilda talet","da":"lav tallet","no":"lag tallet","fi":"muodosta luku"},
    jRead: {"en":"read the blocks","de":"Blöcke ablesen","fr":"lire les blocs","es":"leer los bloques","pt":"ler os blocos","it":"leggere i blocchi","nl":"blokken aflezen","sv":"läsa av blocken","da":"aflæs klodserne","no":"les av klossene","fi":"lue palikat"},
    jWorth: {"en":"what is it worth","de":"Ziffernwert","fr":"combien vaut le chiffre","es":"cuánto vale","pt":"quanto vale","it":"quanto vale","nl":"hoeveel is het waard","sv":"vad är siffran värd","da":"hvad er cifret værd","no":"hva er sifferet verdt","fi":"numeron arvo"},
    jSet: {"en":"which set?","de":"welche Gruppe?","fr":"quel lot ?","es":"¿qué grupo?","pt":"qual grupo?","it":"quale gruppo?","nl":"welk groepje?","sv":"vilken samling?","da":"hvilken samling?","no":"hvilken samling?","fi":"mikä ryhmä?"},
    taskMake: {"en":"Make {n} on the machine.","de":"Bilde {n} an der Maschine.","fr":"Forme {n} sur la machine.","es":"Forma {n} en la máquina.","pt":"Forme {n} na máquina.","it":"Forma {n} sulla macchina.","nl":"Maak {n} op de machine.","sv":"Bilda {n} på maskinen.","da":"Lav {n} på maskinen.","no":"Lag {n} på maskinen.","fi":"Muodosta luku {n} koneella."},
    qRead: {"en":"Press the keys the blocks are worth.","de":"Drück die Tasten, die die Blöcke wert sind.","fr":"Appuie sur les touches que valent les blocs.","es":"Oprime las teclas que valen los bloques.","pt":"Aperte as teclas que valem os blocos.","it":"Premi i tasti che valgono i blocchi.","nl":"Druk de toetsen in die de blokken waard zijn.","sv":"Tryck på tangenterna som blocken är värda.","da":"Tryk på de taster, klodserne er værd.","no":"Trykk på tastene klossene er verdt.","fi":"Paina ne näppäimet, joiden arvoisia palikat ovat."},
    qWorth: {"en":"What is the bright digit worth? Press that one key.","de":"Wie viel ist die leuchtende Ziffer wert? Drück genau diese eine Taste.","fr":"Combien vaut le chiffre en couleur ? Appuie sur cette seule touche.","es":"¿Cuánto vale la cifra resaltada? Oprime solo esa tecla.","pt":"Quanto vale o algarismo destacado? Aperte só essa tecla.","it":"Quanto vale la cifra evidenziata? Premi solo quel tasto.","nl":"Hoeveel is het gekleurde cijfer waard? Druk alleen die ene toets in.","sv":"Vad är den färgade siffran värd? Tryck bara på den tangenten.","da":"Hvad er det farvede ciffer værd? Tryk kun på den ene tast.","no":"Hva er det fargede sifferet verdt? Trykk bare på den ene tasten.","fi":"Mikä on korostetun numeron arvo? Paina vain sitä yhtä näppäintä."},
    qSet: {"en":"Which set shows {n}? Feed it to the machine.","de":"Welche Gruppe zeigt {n}? Gib sie in die Maschine.","fr":"Quel lot montre {n} ? Donne-le à la machine.","es":"¿Qué grupo muestra {n}? Mételo a la máquina.","pt":"Qual grupo mostra {n}? Coloque-o na máquina.","it":"Quale gruppo mostra {n}? Mettilo nella macchina.","nl":"Welk groepje laat {n} zien? Stop het in de machine.","sv":"Vilken samling visar {n}? Lägg den i maskinen.","da":"Hvilken samling viser {n}? Læg den i maskinen.","no":"Hvilken samling viser {n}? Legg den i maskinen.","fi":"Mikä ryhmä näyttää luvun {n}? Syötä se koneeseen."},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    hintNoKey: {"en":"Press a key in each place the number needs.","de":"Drück eine Taste an jeder Stelle, die die Zahl braucht.","fr":"Appuie sur une touche à chaque rang dont le nombre a besoin.","es":"Oprime una tecla en cada lugar que necesita el número.","pt":"Aperte uma tecla em cada ordem de que o número precisa.","it":"Premi un tasto in ogni posto che serve al numero.","nl":"Druk een toets in op elke plaats die het getal nodig heeft.","sv":"Tryck på en tangent för varje position som talet behöver.","da":"Tryk på en tast for hver plads, tallet skal bruge.","no":"Trykk på en tast for hver plass tallet trenger.","fi":"Paina näppäintä jokaisessa kohdassa, jota luku tarvitsee."},
    hintFirst: {"en":"Press a key first.","de":"Drück zuerst eine Taste.","fr":"Appuie d’abord sur une touche.","es":"Primero oprime una tecla.","pt":"Primeiro aperte uma tecla.","it":"Prima premi un tasto.","nl":"Druk eerst een toets in.","sv":"Tryck först på en tangent.","da":"Tryk først på en tast.","no":"Trykk først på en tast.","fi":"Paina ensin näppäintä."},
    hintOneKey: {"en":"Press just one key: the one the bright digit is worth.","de":"Drück nur eine Taste: die, die die leuchtende Ziffer wert ist.","fr":"N’appuie que sur une touche : celle que vaut le chiffre en couleur.","es":"Oprime solo una tecla: la que vale la cifra resaltada.","pt":"Aperte só uma tecla: a que vale o algarismo destacado.","it":"Premi un tasto solo: quello che vale la cifra evidenziata.","nl":"Druk maar één toets in: de toets die het gekleurde cijfer waard is.","sv":"Tryck bara på en tangent: den som den färgade siffran är värd.","da":"Tryk kun på én tast: den, det farvede ciffer er værd.","no":"Trykk bare på én tast: den det fargede sifferet er verdt.","fi":"Paina vain yhtä näppäintä: sitä, jonka arvoinen korostettu numero on."},
    hintPickSet: {"en":"Tap a set to feed it to the machine.","de":"Tipp auf eine Gruppe, um sie in die Maschine zu geben.","fr":"Touche un lot pour le donner à la machine.","es":"Toca un grupo para meterlo a la máquina.","pt":"Toque em um grupo para colocá-lo na máquina.","it":"Tocca un gruppo per metterlo nella macchina.","nl":"Tik op een groepje om het in de machine te stoppen.","sv":"Tryck på en samling för att lägga den i maskinen.","da":"Tryk på en samling for at lægge den i maskinen.","no":"Trykk på en samling for å legge den i maskinen.","fi":"Napauta ryhmää, niin se menee koneeseen."},
    hintZero: {"en":"The ticket has {zero}. A zero place needs no key.","de":"Auf dem Kärtchen stehen {zero}. Eine Stelle mit Null braucht keine Taste.","fr":"L’étiquette a {zero}. Un rang à zéro n’a pas besoin de touche.","es":"La etiqueta tiene {zero}. Un lugar con cero no necesita tecla.","pt":"A etiqueta tem {zero}. Uma ordem com zero não precisa de tecla.","it":"Il cartellino ha {zero}. Un posto con lo zero non vuole nessun tasto.","nl":"Op het kaartje staan {zero}. Een plaats met een nul heeft geen toets nodig.","sv":"Lappen har {zero}. En position med en nolla behöver ingen tangent.","da":"Sedlen har {zero}. En plads med et nul skal ikke have nogen tast.","no":"Lappen har {zero}. En plass med null trenger ingen tast.","fi":"Lapussa on {zero}. Nollakohta ei tarvitse näppäintä."},
    hintMakeLook: {"en":"Your machine made {sum}. Look at the places that glow.","de":"Deine Maschine hat {sum} gemacht. Schau dir die leuchtenden Stellen an.","fr":"Ta machine a fait {sum}. Regarde les rangs qui brillent.","es":"Tu máquina hizo {sum}. Mira los lugares que brillan.","pt":"Sua máquina fez {sum}. Olhe as ordens que brilham.","it":"La tua macchina ha fatto {sum}. Guarda i posti che si illuminano.","nl":"Je machine maakte {sum}. Kijk naar de plaatsen die oplichten.","sv":"Din maskin gjorde {sum}. Titta på positionerna som lyser.","da":"Din maskine lavede {sum}. Se på pladserne, der lyser.","no":"Maskinen din laget {sum}. Se på plassene som lyser.","fi":"Koneesi teki luvun {sum}. Katso hehkuvia kohtia."},
    hintMakeWorthH: {"en":"The {d} in the hundreds is worth {value}.","de":"Die {d} bei den Hundertern ist {value} wert.","fr":"Le {d} des centaines vaut {value}.","es":"El {d} de las centenas vale {value}.","pt":"O {d} das centenas vale {value}.","it":"Il {d} delle centinaia vale {value}.","nl":"De {d} bij de honderdtallen is {value} waard.","sv":"Siffran {d} på hundratalsplatsen är värd {value}.","da":"Cifret {d} på hundredernes plads er {value} værd.","no":"Sifferet {d} på hundrerplassen er verdt {value}.","fi":"Satojen kohdan numero {d} on arvoltaan {value}."},
    hintMakeWorthT: {"en":"The {d} in the tens is worth {value}.","de":"Die {d} bei den Zehnern ist {value} wert.","fr":"Le {d} des dizaines vaut {value}.","es":"El {d} de las decenas vale {value}.","pt":"O {d} das dezenas vale {value}.","it":"Il {d} delle decine vale {value}.","nl":"De {d} bij de tientallen is {value} waard.","sv":"Siffran {d} på tiotalsplatsen är värd {value}.","da":"Cifret {d} på tiernes plads er {value} værd.","no":"Sifferet {d} på tierplassen er verdt {value}.","fi":"Kymmenten kohdan numero {d} on arvoltaan {value}."},
    hintMakeWorthO: {"en":"The {d} in the ones is worth {value}.","de":"Die {d} bei den Einern ist {value} wert.","fr":"Le {d} des unités vaut {value}.","es":"El {d} de las unidades vale {value}.","pt":"O {d} das unidades vale {value}.","it":"Il {d} delle unità vale {value}.","nl":"De {d} bij de eenheden is {value} waard.","sv":"Siffran {d} på entalsplatsen är värd {value}.","da":"Cifret {d} på enernes plads er {value} værd.","no":"Sifferet {d} på enerplassen er verdt {value}.","fi":"Ykkösten kohdan numero {d} on arvoltaan {value}."},
    hintReadLook: {"en":"Your keys gave {sum}. Match the blocks place by place.","de":"Deine Tasten ergeben {sum}. Vergleich die Blöcke Stelle für Stelle.","fr":"Tes touches donnent {sum}. Compare les blocs rang par rang.","es":"Tus teclas dieron {sum}. Compara los bloques lugar por lugar.","pt":"Suas teclas deram {sum}. Compare os blocos ordem por ordem.","it":"I tuoi tasti danno {sum}. Confronta i blocchi posto per posto.","nl":"Je toetsen geven {sum}. Vergelijk de blokken plaats voor plaats.","sv":"Dina tangenter gav {sum}. Jämför blocken position för position.","da":"Dine taster gav {sum}. Sammenlign klodserne plads for plads.","no":"Tastene dine ga {sum}. Sammenlign klossene plass for plass.","fi":"Näppäimesi antoivat luvun {sum}. Vertaa palikoita kohta kerrallaan."},
    hintReadCount: {"en":"Count them, then press the key they are worth.","de":"Zähl sie und drück dann die Taste, die sie wert sind.","fr":"Compte-les, puis appuie sur la touche qu’ils valent.","es":"Cuéntalos y luego oprime la tecla que valen.","pt":"Conte os blocos e depois aperte a tecla que eles valem.","it":"Contali, poi premi il tasto che valgono.","nl":"Tel ze en druk dan de toets in die ze waard zijn.","sv":"Räkna dem och tryck sedan på tangenten som de är värda.","da":"Tæl dem, og tryk så på den tast, de er værd.","no":"Tell dem, og trykk så på tasten de er verdt.","fi":"Laske ne ja paina sitten näppäintä, jonka arvoisia ne ovat."},
    hintWorthLook: {"en":"Your key is worth {v}. Compare its blocks with the bright digit’s blocks.","de":"Deine Taste ist {v} wert. Vergleich ihre Blöcke mit den Blöcken der leuchtenden Ziffer.","fr":"Ta touche vaut {v}. Compare ses blocs avec ceux du chiffre en couleur.","es":"Tu tecla vale {v}. Compara sus bloques con los de la cifra resaltada.","pt":"Sua tecla vale {v}. Compare os blocos dela com os do algarismo destacado.","it":"Il tuo tasto vale {v}. Confronta i suoi blocchi con quelli della cifra evidenziata.","nl":"Je toets is {v} waard. Vergelijk de blokken ervan met die van het gekleurde cijfer.","sv":"Din tangent är värd {v}. Jämför dess block med den färgade siffrans block.","da":"Din tast er {v} værd. Sammenlign dens klodser med det farvede ciffers klodser.","no":"Tasten din er verdt {v}. Sammenlign klossene dens med klossene til det fargede sifferet.","fi":"Näppäimesi arvo on {v}. Vertaa sen palikoita korostetun numeron palikoihin."},
    hintWorthColH: {"en":"The bright digit is in the hundreds. Press one of the hundreds keys.","de":"Die leuchtende Ziffer steht bei den Hundertern. Drück eine der Hunderter-Tasten.","fr":"Le chiffre en couleur est au rang des centaines. Appuie sur une des touches des centaines.","es":"La cifra resaltada está en las centenas. Oprime una de las teclas de las centenas.","pt":"O algarismo destacado está nas centenas. Aperte uma das teclas das centenas.","it":"La cifra evidenziata è nelle centinaia. Premi uno dei tasti delle centinaia.","nl":"Het gekleurde cijfer staat bij de honderdtallen. Druk een van de honderdtaltoetsen in.","sv":"Den färgade siffran står på hundratalsplatsen. Tryck på en av hundratalstangenterna.","da":"Det farvede ciffer står på hundredernes plads. Tryk på en af hundredertasterne.","no":"Det fargede sifferet står på hundrerplassen. Trykk på en av hundrertastene.","fi":"Korostettu numero on satojen kohdassa. Paina jotakin satojen näppäintä."},
    hintWorthColT: {"en":"The bright digit is in the tens. Press one of the tens keys.","de":"Die leuchtende Ziffer steht bei den Zehnern. Drück eine der Zehner-Tasten.","fr":"Le chiffre en couleur est au rang des dizaines. Appuie sur une des touches des dizaines.","es":"La cifra resaltada está en las decenas. Oprime una de las teclas de las decenas.","pt":"O algarismo destacado está nas dezenas. Aperte uma das teclas das dezenas.","it":"La cifra evidenziata è nelle decine. Premi uno dei tasti delle decine.","nl":"Het gekleurde cijfer staat bij de tientallen. Druk een van de tientaltoetsen in.","sv":"Den färgade siffran står på tiotalsplatsen. Tryck på en av tiotalstangenterna.","da":"Det farvede ciffer står på tiernes plads. Tryk på en af tiertasterne.","no":"Det fargede sifferet står på tierplassen. Trykk på en av tiertastene.","fi":"Korostettu numero on kymmenten kohdassa. Paina jotakin kymmenten näppäintä."},
    hintWorthColO: {"en":"The bright digit is in the ones. Press one of the ones keys.","de":"Die leuchtende Ziffer steht bei den Einern. Drück eine der Einer-Tasten.","fr":"Le chiffre en couleur est au rang des unités. Appuie sur une des touches des unités.","es":"La cifra resaltada está en las unidades. Oprime una de las teclas de las unidades.","pt":"O algarismo destacado está nas unidades. Aperte uma das teclas das unidades.","it":"La cifra evidenziata è nelle unità. Premi uno dei tasti delle unità.","nl":"Het gekleurde cijfer staat bij de eenheden. Druk een van de eenhedentoetsen in.","sv":"Den färgade siffran står på entalsplatsen. Tryck på en av entalstangenterna.","da":"Det farvede ciffer står på enernes plads. Tryk på en af enertasterne.","no":"Det fargede sifferet står på enerplassen. Trykk på en av enertastene.","fi":"Korostettu numero on ykkösten kohdassa. Paina jotakin ykkösten näppäintä."},
    hintSetLookT: {"en":"This set is worth {sum}. Look at the tens.","de":"Diese Gruppe ist {sum} wert. Schau dir die Zehner an.","fr":"Ce lot vaut {sum}. Regarde les dizaines.","es":"Este grupo vale {sum}. Mira las decenas.","pt":"Este grupo vale {sum}. Olhe as dezenas.","it":"Questo gruppo vale {sum}. Guarda le decine.","nl":"Dit groepje is {sum} waard. Kijk naar de tientallen.","sv":"Den här samlingen är värd {sum}. Titta på tiotalen.","da":"Denne samling er {sum} værd. Se på tierne.","no":"Denne samlingen er verdt {sum}. Se på tierne.","fi":"Tämän ryhmän arvo on {sum}. Katso kymmeniä."},
    hintSetLookO: {"en":"This set is worth {sum}. Look at the ones.","de":"Diese Gruppe ist {sum} wert. Schau dir die Einer an.","fr":"Ce lot vaut {sum}. Regarde les unités.","es":"Este grupo vale {sum}. Mira las unidades.","pt":"Este grupo vale {sum}. Olhe as unidades.","it":"Questo gruppo vale {sum}. Guarda le unità.","nl":"Dit groepje is {sum} waard. Kijk naar de eenheden.","sv":"Den här samlingen är värd {sum}. Titta på entalen.","da":"Denne samling er {sum} værd. Se på enerne.","no":"Denne samlingen er verdt {sum}. Se på enerne.","fi":"Tämän ryhmän arvo on {sum}. Katso ykkösiä."},
    hintSetFind: {"en":"Find the set the machine reads as {n}.","de":"Such die Gruppe, die die Maschine als {n} liest.","fr":"Trouve le lot que la machine lit {n}.","es":"Busca el grupo que la máquina lee como {n}.","pt":"Procure o grupo que a máquina lê como {n}.","it":"Trova il gruppo che la macchina legge come {n}.","nl":"Zoek het groepje dat de machine als {n} leest.","sv":"Hitta samlingen som maskinen läser som {n}.","da":"Find den samling, maskinen læser som {n}.","no":"Finn samlingen maskinen leser som {n}.","fi":"Etsi ryhmä, jonka kone lukee luvuksi {n}."},
    okExp: {"en":"{n} = {expanded}","de":"{n} = {expanded}","fr":"{n} = {expanded}","es":"{n} = {expanded}","pt":"{n} = {expanded}","it":"{n} = {expanded}","nl":"{n} = {expanded}","sv":"{n} = {expanded}","da":"{n} = {expanded}","no":"{n} = {expanded}","fi":"{n} = {expanded}"},
    okOne: {"en":"{word} = {n}","de":"{word} = {n}","fr":"{word} = {n}","es":"{word} = {n}","pt":"{word} = {n}","it":"{word} = {n}","nl":"{word} = {n}","sv":"{word} = {n}","da":"{word} = {n}","no":"{word} = {n}","fi":"{word} = {n}"},
    okWorth: {"en":"The {d} in {n} is worth {value}.","de":"Die {d} in {n} ist {value} wert.","fr":"Le {d} de {n} vaut {value}.","es":"El {d} de {n} vale {value}.","pt":"O {d} de {n} vale {value}.","it":"Il {d} di {n} vale {value}.","nl":"De {d} in {n} is {value} waard.","sv":"Siffran {d} i {n} är värd {value}.","da":"Cifret {d} i {n} er {value} værd.","no":"Sifferet {d} i {n} er verdt {value}.","fi":"Numero {d} luvussa {n} on arvoltaan {value}."},
    okSet: {"en":"{n} = {expanded}: this set shows {n}.","de":"{n} = {expanded}: Diese Gruppe zeigt {n}.","fr":"{n} = {expanded} : ce lot montre {n}.","es":"{n} = {expanded}: este grupo muestra {n}.","pt":"{n} = {expanded}: este grupo mostra {n}.","it":"{n} = {expanded}: questo gruppo mostra {n}.","nl":"{n} = {expanded}: dit groepje laat {n} zien.","sv":"{n} = {expanded}: den här samlingen visar {n}.","da":"{n} = {expanded}: denne samling viser {n}.","no":"{n} = {expanded}: denne samlingen viser {n}.","fi":"{n} = {expanded}: tämä ryhmä näyttää luvun {n}."},
    wH0: {"en":"hundreds","de":"Hunderter","fr":"centaine","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sataa"},
    wH1: {"en":"hundred","de":"Hunderter","fr":"centaine","es":"centena","pt":"centena","it":"centinaio","nl":"honderdtal","sv":"hundratal","da":"hundrede","no":"hundrer","fi":"sata"},
    wHn: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sataa"},
    wT0: {"en":"tens","de":"Zehner","fr":"dizaine","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmentä"},
    wT1: {"en":"ten","de":"Zehner","fr":"dizaine","es":"decena","pt":"dezena","it":"decina","nl":"tiental","sv":"tiotal","da":"tier","no":"tier","fi":"kymmen"},
    wTn: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmentä"},
    wO0: {"en":"ones","de":"Einer","fr":"unité","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköstä"},
    wO1: {"en":"one","de":"Einer","fr":"unité","es":"unidad","pt":"unidade","it":"unità","nl":"eenheid","sv":"ental","da":"ener","no":"ener","fi":"ykkönen"},
    wOn: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköstä"},
    aKey: {"en":"Key {v}","de":"Taste {v}","fr":"Touche {v}","es":"Tecla {v}","pt":"Tecla {v}","it":"Tasto {v}","nl":"Toets {v}","sv":"Tangent {v}","da":"Tast {v}","no":"Tast {v}","fi":"Näppäin {v}"},
    aKeyOn: {"en":"Key {v}, pressed","de":"Taste {v}, gedrückt","fr":"Touche {v}, enfoncée","es":"Tecla {v}, oprimida","pt":"Tecla {v}, apertada","it":"Tasto {v}, premuto","nl":"Toets {v}, ingedrukt","sv":"Tangent {v}, nedtryckt","da":"Tast {v}, trykket ned","no":"Tast {v}, trykket ned","fi":"Näppäin {v}, painettu"},
    aColH: {"en":"Hundreds keys","de":"Hunderter-Tasten","fr":"Touches des centaines","es":"Teclas de las centenas","pt":"Teclas das centenas","it":"Tasti delle centinaia","nl":"Honderdtaltoetsen","sv":"Hundratalstangenter","da":"Hundredertaster","no":"Hundrertaster","fi":"Satojen näppäimet"},
    aColT: {"en":"Tens keys","de":"Zehner-Tasten","fr":"Touches des dizaines","es":"Teclas de las decenas","pt":"Teclas das dezenas","it":"Tasti delle decine","nl":"Tientaltoetsen","sv":"Tiotalstangenter","da":"Tiertaster","no":"Tiertaster","fi":"Kymmenten näppäimet"},
    aColO: {"en":"Ones keys","de":"Einer-Tasten","fr":"Touches des unités","es":"Teclas de las unidades","pt":"Teclas das unidades","it":"Tasti delle unità","nl":"Eenhedentoetsen","sv":"Entalstangenter","da":"Enertaster","no":"Enertaster","fi":"Ykkösten näppäimet"},
    aNone: {"en":"no key","de":"keine Taste","fr":"aucune touche","es":"ninguna tecla","pt":"nenhuma tecla","it":"nessun tasto","nl":"geen toets","sv":"ingen tangent","da":"ingen tast","no":"ingen tast","fi":"ei näppäintä"},
    aCrank: {"en":"Crank: add it up","de":"Kurbel: zusammenzählen","fr":"Manivelle : additionner","es":"Manivela: sumar","pt":"Manivela: somar","it":"Manovella: sommare","nl":"Hendel: optellen","sv":"Vev: räkna ihop","da":"Håndsving: læg sammen","no":"Sveiv: legg sammen","fi":"Kampi: laske yhteen"},
    aDrums: {"en":"The machine shows {sum}","de":"Die Maschine zeigt {sum}","fr":"La machine affiche {sum}","es":"La máquina muestra {sum}","pt":"A máquina mostra {sum}","it":"La macchina mostra {sum}","nl":"De machine toont {sum}","sv":"Maskinen visar {sum}","da":"Maskinen viser {sum}","no":"Maskinen viser {sum}","fi":"Kone näyttää luvun {sum}"},
    aTape: {"en":"Tape: {expanded} equals {sum}","de":"Streifen: {expanded} ist {sum}","fr":"Ruban : {expanded} égale {sum}","es":"Tira: {expanded} es igual a {sum}","pt":"Fita: {expanded} é igual a {sum}","it":"Striscia: {expanded} fa {sum}","nl":"Strook: {expanded} is {sum}","sv":"Remsa: {expanded} är {sum}","da":"Strimmel: {expanded} er {sum}","no":"Strimmel: {expanded} er {sum}","fi":"Nauha: {expanded} on {sum}"},
    aTicket: {"en":"Ticket: {n}","de":"Kärtchen: {n}","fr":"Étiquette : {n}","es":"Etiqueta: {n}","pt":"Etiqueta: {n}","it":"Cartellino: {n}","nl":"Kaartje: {n}","sv":"Lapp: {n}","da":"Seddel: {n}","no":"Lapp: {n}","fi":"Lappu: {n}"},
    aSet: {"en":"Set {i}","de":"Gruppe {i}","fr":"Lot {i}","es":"Grupo {i}","pt":"Grupo {i}","it":"Gruppo {i}","nl":"Groepje {i}","sv":"Samling {i}","da":"Samling {i}","no":"Samling {i}","fi":"Ryhmä {i}"},
    aShown3: {"en":"Blocks: {h}, {t} and {o}.","de":"Blöcke: {h}, {t} und {o}.","fr":"Blocs : {h}, {t} et {o}.","es":"Bloques: {h}, {t} y {o}.","pt":"Blocos: {h}, {t} e {o}.","it":"Blocchi: {h}, {t} e {o}.","nl":"Blokken: {h}, {t} en {o}.","sv":"Block: {h}, {t} och {o}.","da":"Klodser: {h}, {t} og {o}.","no":"Klosser: {h}, {t} og {o}.","fi":"Palikat: {h}, {t} ja {o}."},
    aShown2: {"en":"Blocks: {t} and {o}.","de":"Blöcke: {t} und {o}.","fr":"Blocs : {t} et {o}.","es":"Bloques: {t} y {o}.","pt":"Blocos: {t} e {o}.","it":"Blocchi: {t} e {o}.","nl":"Blokken: {t} en {o}.","sv":"Block: {t} och {o}.","da":"Klodser: {t} og {o}.","no":"Klosser: {t} og {o}.","fi":"Palikat: {t} ja {o}."},
    aBright: {"en":"{n}: the digit {d} is bright.","de":"{n}: Die Ziffer {d} leuchtet.","fr":"{n} : le chiffre {d} est en couleur.","es":"{n}: la cifra {d} está resaltada.","pt":"{n}: o algarismo {d} está destacado.","it":"{n}: la cifra {d} è evidenziata.","nl":"{n}: het cijfer {d} is gekleurd.","sv":"{n}: siffran {d} är färgad.","da":"{n}: cifret {d} er farvet.","no":"{n}: sifferet {d} er farget.","fi":"{n}: numero {d} on korostettu."}
  },/*STRINGS-END*/
  defaults: { numbers: 'three', job: 'make' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'two', labelKey: 'nTwo' }, { value: 'three', labelKey: 'nThree' }] },
    { key: 'job', type: 'choice', labelKey: 'setJob', options: [{ value: 'make', labelKey: 'jMake' }, { value: 'read', labelKey: 'jRead' }, { value: 'worth', labelKey: 'jWorth' }, { value: 'set', labelKey: 'jSet' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null;
    injectValueKeysCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } this._endDrag(); },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this._start(this.st.k); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _job: function () { return ValueKeysCore.jobOf(this._setting('job')); },
  _places: function () { return ValueKeysCore.placesOf(this._job(), this._setting('numbers')); },
  _key: function () { return this._job() + '.' + this._places(); },
  /* "4 tens", "1 ten", "0 tens" — the place word agreeing with its count */
  _word: function (p, n) { var P = p === 'h' ? 'wH' : p === 't' ? 'wT' : 'wO'; return n + ' ' + this._t(P + (n === 0 ? '0' : n === 1 ? '1' : 'n')); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = ValueKeysCore.rounds(this._job(), this._places()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = ValueKeysCore, pool = this._ensurePool(), job = this._job(), places = this._places(), n = C.passSize(), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { var P = C.plan(job, places, pass, Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'value-keys.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st; if (!st) return '';
    if (st.job === 'make') return this._t('taskMake', { n: st.round.n });
    if (st.job === 'read') return this._t('qRead');
    if (st.job === 'worth') return this._t('qWorth');
    return this._t('qSet', { n: st.round.n });
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = ValueKeysCore.newState(this._job(), this._places(), k);
    var pl = ValueKeysCore.placeList(this.st.places);
    this._view = { note: '', soft: false, ok: '', tab: pl[0], shake: false, roll: false, show: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'vk-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="vk-work"><div class="vk-panel"></div><div class="vk-machine vk-art"><div class="vk-bank"></div><div class="vk-side"><div class="vk-drums"></div><div class="vk-crank"></div><div class="vk-tape"></div></div></div></div>'
      + '<p class="vk-note" data-qa="note" aria-live="polite"></p><div class="vk-bar"></div><p class="vk-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    this._qs('.vk-drums').setAttribute('role', 'img'); this._qs('.vk-tape').setAttribute('role', 'img');
    wrap.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target === wrap) { e.preventDefault(); self._crank(); } });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width(), B = ValueKeysCore.band(W);
    this._wide = B.wide;
    this._wrap.className = 'vk-wrap' + (B.wide ? ' is-wide' : ' is-narrow') + (W < 340 ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.help ? ' is-help' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.job + ' is-p' + st.places;
    this._paintPanel(); this._paintBank(); this._paintDrums(); this._paintCrank(); this._paintTape(); this._paintBar();
    var note = this._qs('.vk-note');
    if (v.note) { note.textContent = v.note; note.className = 'vk-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'vk-note'; }
    this._setPrompt();
    v.shake = false; v.roll = false;
  },

  /* ---------- blocks (drawn apparatus: flat teal, rod coral, cube gold) ---------- */
  _cross: function (x, y, w, h) { return '<path class="vk-cross" d="M' + x + ' ' + y + 'L' + (x + w) + ' ' + (y + h) + 'M' + (x + w) + ' ' + y + 'L' + x + ' ' + (y + h) + '"/>'; },
  _numMark: function (x, y, n, s) { var r = s * 0.62; return '<circle class="vk-numdot" cx="' + x + '" cy="' + y + '" r="' + r + '"/><text class="vk-numtxt" x="' + x + '" y="' + (y + s * 0.36) + '" text-anchor="middle" style="font-size:' + s + 'px">' + n + '</text>'; },
  _block: function (p, x, y, u, cls, num) {
    var s = 10 * u, h, d = '', i;
    if (p === 'h') {
      h = '<g class="vk-flat' + (cls ? ' ' + cls : '') + '"><rect class="vk-flatbg" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="1.5"/>';
      if (s >= 40 && cls !== 'is-ghost') { for (i = 1; i < 10; i++) d += 'M' + (x + i * u) + ' ' + y + 'V' + (y + s) + 'M' + x + ' ' + (y + i * u) + 'H' + (x + s); h += '<path class="vk-grid" d="' + d + '"/>'; }
      if (cls === 'is-extra') h += this._cross(x, y, s, s);
      if (num) h += this._numMark(x + s * 0.2, y + s * 0.2, num, Math.max(10, s * 0.16));
    } else if (p === 't') {
      h = '<g class="vk-rod' + (cls ? ' ' + cls : '') + '"><rect class="vk-rodbg" x="' + x + '" y="' + y + '" width="' + u + '" height="' + s + '" rx="1.2"/>';
      if (u >= 5 && cls !== 'is-ghost') { for (i = 1; i < 10; i++) d += 'M' + x + ' ' + (y + i * u) + 'H' + (x + u); h += '<path class="vk-grid" d="' + d + '"/>'; }
      if (cls === 'is-extra') h += this._cross(x - u * 0.6, y + 3 * u, u * 2.2, u * 2.2);
      if (num) h += this._numMark(x + u / 2, y - Math.max(8, u * 1.1), num, Math.max(10, u * 1.4));
    } else {
      h = '<g class="vk-cube' + (cls ? ' ' + cls : '') + '"><rect class="vk-cubebg" x="' + x + '" y="' + y + '" width="' + u + '" height="' + u + '" rx="1.2"/>';
      if (cls === 'is-extra') h += this._cross(x - 1, y - 1, u + 2, u + 2);
      if (num) h += this._numMark(x + u / 2, y - Math.max(8, u), num, Math.max(10, u * 1.2));
    }
    return h + '</g>';
  },
  /* a place's blocks as one group: flats fan down-right, rods stand side by side, cubes nest 3 × 3; k real + ghosts up to `upTo`,
     real ones from `extraFrom` on crossed; returns {svg, w, h} with the group laid out from (0,0) */
  _group: function (p, k, u, opt) {
    opt = opt || {}; var n = Math.max(k, opt.upTo || 0), ef = opt.extraFrom == null ? 99 : opt.extraFrom, out = '', i, fo = Math.max(3, Math.round(0.8 * u)), rp = Math.round(1.55 * u), cp = Math.round(1.45 * u);
    var rows = Math.ceil(Math.min(n, 9) / 3) || 1, w, h, top = opt.nums ? Math.max(12, u * 2) : 0;
    if (p === 'h') { w = 10 * u + Math.max(0, n - 1) * fo; h = w; }
    else if (p === 't') { w = u + Math.max(0, n - 1) * rp; h = 10 * u; }
    else { w = u + (Math.min(n, 3) - 1) * cp; h = u + (rows - 1) * cp; }
    for (i = 0; i < n; i++) {
      var cls = i >= k ? 'is-ghost' : i >= ef ? 'is-extra' : '', num = opt.nums && i < k ? i + 1 : 0;
      if (p === 'h') out += this._block('h', i * fo, top + i * fo, u, cls, num);
      else if (p === 't') out += this._block('t', i * rp, top + 0, u, cls, num);
      else out += this._block('o', (i % 3) * cp, top + h - u - Math.floor(i / 3) * cp, u, cls, num);
    }
    return { svg: out, w: Math.max(w, 1), h: h + top };
  },
  _svg: function (g, cls) { return '<svg class="vk-art' + (cls ? ' ' + cls : '') + '" width="' + g.w + '" height="' + g.h + '" viewBox="0 0 ' + g.w + ' ' + g.h + '" aria-hidden="true">' + g.svg + '</svg>'; },
  /* the blocks of a whole number laid in one line or stack, place by place */
  _numberBlocks: function (n, places, u, vertical, opt) {
    opt = opt || {}; var C = ValueKeysCore, d = C.digits(n), self = this, html = '';
    C.placeList(places).forEach(function (p) {
      if (!d[p] && !(opt.upTo && opt.upTo[p])) return;
      var g = self._group(p, d[p], u, { upTo: opt.upTo && opt.upTo[p], extraFrom: opt.extraFrom && opt.extraFrom[p], nums: opt.nums === p });
      html += '<span class="vk-grp vk-grp-' + p + (opt.glow && opt.glow.indexOf(p) >= 0 ? ' is-glow' : '') + '">' + self._svg(g) + '</span>';
    });
    return '<span class="vk-blocks' + (vertical ? ' is-v' : '') + '">' + html + '</span>';
  },
  _shownLabel: function (n, places) {
    var d = ValueKeysCore.digits(n), self = this;
    return places === 3 ? this._t('aShown3', { h: self._word('h', d.h), t: self._word('t', d.t), o: self._word('o', d.o) }) : this._t('aShown2', { t: self._word('t', d.t), o: self._word('o', d.o) });
  },

  /* ---------- the order panel ---------- */
  _paintPanel: function () {
    var st = this.st, r = st.round, v = st.verdict, el = this._qs('.vk-panel'), C = ValueKeysCore, self = this, wide = this._wide, help = st.help && v;
    el.innerHTML = ''; el.className = 'vk-panel';
    var u = wide ? (st.places === 3 ? 6 : 8) : (st.places === 3 ? 4 : 5);
    var tray = st.job === 'set' ? '' : this._trayHtml(wide ? 5 : this._width() < 340 ? 3 : 4, wide);
    /* narrow: the tray takes the place of the order strip (success, a read miss 1, a worth miss) */
    if (!wide && tray && (st.done || (v && v.kind === 'wrongRead' && !st.help) || (v && v.kind === 'wrongWorth'))) {
      if (st.job === 'worth') {
        var nd = C.digits(r.n), ww = document.createElement('div'); ww.className = 'vk-worth vk-art'; ww.setAttribute('role', 'img'); ww.setAttribute('aria-label', this._t('aBright', { n: r.n, d: r.d }));
        ww.innerHTML = '<span class="vk-wnum">' + C.placeList(st.places).map(function (p) { return '<span class="vk-wdig' + (p === r.place ? ' is-bright' : '') + '">' + nd[p] + '</span>'; }).join('') + '</span>';
        var row = document.createElement('div'); row.className = 'vk-trayrow'; row.appendChild(ww); row.appendChild(this._tray(tray)); el.appendChild(row);
      } else el.appendChild(this._tray(tray));
      return;
    }
    if (st.job === 'make') {
      var d = C.digits(r.n), glow = v ? v.places : [];
      var t = document.createElement('div'); t.className = 'vk-ticket vk-art' + (st.done ? ' is-out' : ''); t.setAttribute('role', 'img'); t.setAttribute('aria-label', this._t('aTicket', { n: r.n }));
      t.innerHTML = C.placeList(st.places).map(function (p) { return '<span class="vk-tdig' + (glow.indexOf(p) >= 0 ? ' is-glow' : '') + '" data-place="' + p + '">' + d[p] + '</span>'; }).join('');
      el.appendChild(t);
      /* help 2: the ticket opens into pockets, each digit's blocks under it; the place the help names carries "4 tens = 40" */
      if (help && v.kind !== 'zeroPressed') {
        var hp = C.helpPlace(st), pk = document.createElement('div'); pk.className = 'vk-pockets';
        C.placeList(st.places).forEach(function (p) {
          var g = self._group(p, d[p], wide ? 4 : 3), cell = document.createElement('div');
          cell.className = 'vk-pocket' + (p === hp ? ' is-glow' : '');
          cell.innerHTML = d[p] ? self._svg(g) : '';
          pk.appendChild(cell);
        });
        el.appendChild(pk); el.className = 'vk-panel has-pockets';
        /* the glowing pocket's sentence sits under the row, so the three pockets stay side by side */
        if (hp) { var lab = document.createElement('span'); lab.className = 'vk-plabel'; lab.textContent = self._t('okOne', { word: self._word(hp, d[hp]), n: C.valueOf(hp, d[hp]) }); el.appendChild(lab); }
      }
    } else if (st.job === 'read') {
      var b = document.createElement('div'); b.className = 'vk-shown vk-art'; b.setAttribute('role', 'img'); b.setAttribute('aria-label', this._shownLabel(r.n, st.places));
      var hp2 = help ? C.helpPlace(st) : null;
      b.innerHTML = this._numberBlocks(r.n, st.places, u, wide, { glow: v ? v.places : [], nums: help && st.verdict.kind === 'wrongRead' ? hp2 : null });
      el.appendChild(b);
    } else if (st.job === 'worth') {
      var dd = C.digits(r.n), w = document.createElement('div');
      w.className = 'vk-worth vk-art'; w.setAttribute('role', 'img'); w.setAttribute('aria-label', this._t('aBright', { n: r.n, d: r.d }));
      w.innerHTML = '<span class="vk-wnum">' + C.placeList(st.places).map(function (p) { return '<span class="vk-wdig' + (p === r.place ? ' is-bright' : '') + '">' + dd[p] + '</span>'; }).join('') + '</span>'
        + (tray ? '' : '<span class="vk-wfaint">' + this._svg(this._group(r.place, r.d, wide ? 5 : 4)) + '</span>');
      el.appendChild(w);
    } else {
      var sets = document.createElement('div'); sets.className = 'vk-sets';
      var tk = document.createElement('div'); tk.className = 'vk-ticket vk-art is-small' + (st.done ? ' is-out' : ''); tk.setAttribute('role', 'img'); tk.setAttribute('aria-label', this._t('aTicket', { n: r.n })); tk.innerHTML = '<span class="vk-tdig">' + r.n + '</span>';
      el.appendChild(tk);
      r.sets.forEach(function (n, i) {
        var bt = self._btn('vk-set' + (st.fed === i ? ' is-fed' : '') + (st.done && i === r.right ? ' is-right' : '') + (v && v.kind === 'wrongSet' && st.fed === i ? ' is-wrong' : ''), 'set-' + i,
          self._t('aSet', { i: i + 1 }) + '. ' + self._shownLabel(n, 2),
          self._numberBlocks(n, 2, wide ? 6 : 4, false, { glow: v && v.kind === 'wrongSet' && st.fed === i ? v.places : [] }) + (help && v.kind === 'wrongSet' ? '<span class="vk-setv">' + n + '</span>' : ''));
        bt.setAttribute('data-set', i);
        bt.disabled = st.done;
        bt.addEventListener('pointerdown', function (e) { self._dragStart(e, i, bt); });
        bt.addEventListener('click', function () { if (self._dragged) { self._dragged = false; return; } self._feed(i); });
        sets.appendChild(bt);
      });
      el.appendChild(sets);
    }
    if (wide && tray) el.appendChild(this._tray(tray));
  },

  /* ---------- the bank of value keys ---------- */
  _keyBtn: function (p, d) {
    var st = this.st, v = ValueKeysCore.valueOf(p, d), on = st.keys[p] === d, self = this;
    var b = this._btn('vk-key vk-key-' + p + (on ? ' is-down' : ''), 'key-' + p + d, this._t(on ? 'aKeyOn' : 'aKey', { v: v }), '<span>' + v + '</span>');
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.disabled = st.done || st.job === 'set';
    b.addEventListener('click', function () { self._press(p, d); });
    return b;
  },
  _glyph: function (p) {
    return '<svg class="vk-glyph" width="24" height="16" viewBox="0 0 24 16" aria-hidden="true">' + (p === 'h' ? '<rect x="5" y="1" width="14" height="14" rx="1.5" class="vk-flatbg"/>' : p === 't' ? '<rect x="9.5" y="1" width="5" height="14" rx="1" class="vk-rodbg"/>' : '<rect x="8.5" y="4.5" width="7" height="7" rx="1" class="vk-cubebg"/>') + '</svg>';
  },
  _paintBank: function () {
    var st = this.st, v = st.verdict, el = this._qs('.vk-bank'), C = ValueKeysCore, self = this, pl = C.placeList(st.places);
    var colGlow = st.help && v && v.kind === 'wrongWorth' ? st.round.place : null;
    el.innerHTML = '';
    if (this._wide) {
      el.className = 'vk-bank is-cols';
      pl.forEach(function (p) {
        var col = document.createElement('div'); col.className = 'vk-col vk-col-' + p + (colGlow === p ? ' is-glow' : '');
        col.setAttribute('role', 'group'); col.setAttribute('aria-label', self._t(p === 'h' ? 'aColH' : p === 't' ? 'aColT' : 'aColO'));
        col.innerHTML = self._glyph(p);
        for (var d = 9; d >= 1; d--) col.appendChild(self._keyBtn(p, d));
        el.appendChild(col);
      });
      return;
    }
    /* narrow: one tab per place (its glyph and the value pressed there) + the selected place's nine keys as a 3 × 3 pad */
    el.className = 'vk-bank is-pad';
    var tabs = document.createElement('div'); tabs.className = 'vk-tabs';
    if (pl.indexOf(this._view.tab) < 0) this._view.tab = pl[0];
    pl.forEach(function (p) {
      var val = st.keys[p] ? C.valueOf(p, st.keys[p]) : '—';
      var tb = self._btn('vk-tab vk-tab-' + p + (self._view.tab === p && st.job !== 'set' ? ' is-sel' : '') + (colGlow === p ? ' is-glow' : '') + (st.keys[p] ? ' has-key' : ''), 'tab-' + p,
        self._t(p === 'h' ? 'aColH' : p === 't' ? 'aColT' : 'aColO') + ', ' + (st.keys[p] ? C.valueOf(p, st.keys[p]) : self._t('aNone')), self._glyph(p) + '<span>' + val + '</span>');
      tb.disabled = st.done || st.job === 'set';
      tb.addEventListener('click', function () { self._tab(p); });
      tabs.appendChild(tb);
    });
    el.appendChild(tabs);
    /* which set: the machine presses by itself; a solved round: nothing left to press — the tabs carry the values */
    if (st.job === 'set' || st.done) return;
    var pad = document.createElement('div'), p = this._view.tab; pad.className = 'vk-pad vk-col-' + p + (colGlow === p ? ' is-glow' : '');
    pad.setAttribute('role', 'group'); pad.setAttribute('aria-label', this._t(p === 'h' ? 'aColH' : p === 't' ? 'aColT' : 'aColO'));
    [7, 8, 9, 4, 5, 6, 1, 2, 3].forEach(function (d) { pad.appendChild(self._keyBtn(p, d)); });
    el.appendChild(pad);
  },

  /* ---------- drums, crank, tape ---------- */
  _paintDrums: function () {
    var st = this.st, v = st.verdict, el = this._qs('.vk-drums'), C = ValueKeysCore, pl = C.placeList(st.places), view = this._view;
    var sum = st.done && st.job !== 'worth' ? st.round.n : st.drums, d = sum == null ? null : C.digits(sum), shakeP = v && v.places ? v.places : [];
    el.innerHTML = pl.map(function (p) { return '<span class="vk-drum' + (view.shake && shakeP.indexOf(p) >= 0 ? ' is-shake' : '') + (view.roll ? ' is-roll' : '') + '">' + (d ? d[p] : '') + '</span>'; }).join('');
    el.setAttribute('aria-label', sum == null ? this._t('aNone') : this._t('aDrums', { sum: sum }));
  },
  _paintCrank: function () {
    var st = this.st, self = this, el = this._qs('.vk-crank');
    el.innerHTML = '';
    var g = this._btn('vk-grip', 'crank', this._t('aCrank'), '');
    g.disabled = st.done;
    el.className = 'vk-crank' + (this._wide ? ' is-down' : ' is-right');
    var track = document.createElement('span'); track.className = 'vk-track';
    el.appendChild(track); el.appendChild(g);
    g.addEventListener('pointerdown', function (e) { self._crankDrag(e, g); });
    g.addEventListener('click', function () { if (self._cranked) { self._cranked = false; return; } self._crank(); });
  },
  _paintTape: function () {
    var st = this.st, el = this._qs('.vk-tape'), lines = st.tape;
    /* the 320 px stage: on a miss the drums already show the sum — the one-line tape waits for the solved round */
    if (!lines.length || (!this._wide && this._width() < 340 && !st.done)) { el.innerHTML = ''; el.className = 'vk-tape is-empty'; el.removeAttribute('aria-label'); return; }
    var total = lines[lines.length - 1].replace('= ', ''), exp = lines.slice(0, -1).map(function (x) { return x.replace('+ ', ''); }).join(' + ');
    el.className = 'vk-tape' + (st.done ? ' is-ok' : '');
    el.setAttribute('aria-label', this._t('aTape', { expanded: exp, sum: total }));
    if (this._wide) el.innerHTML = lines.map(function (x, i) { return '<span class="vk-tl' + (i === lines.length - 1 ? ' is-sum' : '') + '">' + x + '</span>'; }).join('');
    else el.innerHTML = '<span class="vk-tl is-one">' + exp + ' = ' + total + '</span>';
  },

  /* ---------- the tray: the keys' blocks (success), the comparison (a read or worth miss) ---------- */
  _trayHtml: function (u, vertical) {
    var st = this.st, v = st.verdict, C = ValueKeysCore, html = '';
    if (st.done && st.job !== 'set') {
      var n = st.job === 'worth' ? C.valueOf(st.round.place, st.round.d) : st.round.n;
      html = this._numberBlocks(n, st.places, u, vertical);
    } else if (v && v.kind === 'wrongRead') {
      var shown = C.digits(st.round.n), got = C.digits(v.sum), upTo = {}, ef = {};
      C.placeList(st.places).forEach(function (p) { if (got[p] < shown[p]) upTo[p] = shown[p]; if (got[p] > shown[p]) ef[p] = shown[p]; });
      html = this._numberBlocks(v.sum, st.places, u, vertical, { upTo: upTo, extraFrom: ef, glow: v.places });
    } else if (v && v.kind === 'wrongWorth') {
      var mine = C.digits(v.v)[v.place];
      html = '<span class="vk-blocks">' + '<span class="vk-grp is-bright">' + this._svg(this._group(st.round.place, st.round.d, u)) + '<b>' + C.valueOf(st.round.place, st.round.d) + '</b></span>'
        + '<span class="vk-grp is-mine">' + this._svg(this._group(v.place, mine, u)) + '<b>' + v.v + '</b></span></span>';
      html = html.replace('<b>' + C.valueOf(st.round.place, st.round.d) + '</b>', '<b>?</b>');
    }
    return html;
  },
  _tray: function (html) { var t = document.createElement('div'); t.className = 'vk-tray vk-art is-full'; t.setAttribute('aria-hidden', 'true'); t.innerHTML = html; return t; },
  _paintBar: function () {
    var st = this.st, self = this, el = this._qs('.vk-bar'); el.innerHTML = '';
    if (st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var c = this._btn('vk-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._t('checkBtn') + '</span>');
    c.addEventListener('click', function () { self._crank(); });
    el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _say: function (k, a) { var sr = this._qs && this._qs('.vk-sr'); if (sr) sr.textContent = this._t(k, a); },
  _press: function (p, d) {
    if (!ValueKeysCore.press(this.st, p, d)) return;
    var v = this._view; v.note = ''; this.api.sound(this.st.keys[p] ? 620 : 300);
    this._paint();
  },
  _tab: function (p) { if (this.st.done) return; this._view.tab = p; this.api.sound(520); this._paint(); },
  _feed: function (i) {
    if (!ValueKeysCore.feed(this.st, i)) return;
    this._view.note = ''; this.api.sound(440); this._paint();
  },
  _crank: function () {
    var st = this.st, v = this._view, C = ValueKeysCore; if (st.done) return;
    var r = C.crank(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { var nk = r.key === 'hintNoKey' && st.job !== 'make' ? 'hintFirst' : r.key; v.note = this._t(nk); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    v.roll = true;
    if (r.result === 'ok') { this._success(); return; }
    var key = C.hint(st), V = st.verdict, d = C.digits(st.round.n), hp = C.helpPlace(st), P = hp === 'h' ? 'H' : hp === 't' ? 'T' : 'O';
    if (key === 'hintMakeWorth' || key === 'hintWorthCol' ) key = key + P;
    if (key === 'hintSetLook') key = key + (P === 'H' ? 'T' : P);
    v.soft = false; v.shake = true;
    v.note = this._t(key, { sum: V.sum != null ? V.sum : '', v: V.v, n: st.round.n, d: d[hp], value: hp ? C.valueOf(hp, d[hp]) : '', zero: V.kind === 'zeroPressed' ? this._word(V.places[0], 0) : '' });
    this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _okLine: function () {
    var st = this.st, C = ValueKeysCore, r = st.round, k = C.okKey(st);
    if (k === 'okWorth') return this._t('okWorth', { d: r.d, n: r.n, value: C.valueOf(r.place, r.d) });
    if (k === 'okSet') return this._t('okSet', { n: r.n, expanded: C.expanded(r.n) });
    if (k === 'okOne') { var d = C.digits(r.n), p = C.PLACES.filter(function (q) { return d[q]; })[0]; return this._t('okOne', { word: this._word(p, d[p]), n: r.n }); }
    return this._t('okExp', { n: r.n, expanded: C.expanded(r.n) });
  },
  _success: function () {
    var v = this._view, msg = this._okLine();
    v.note = ''; v.success = true;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },

  /* the crank: drag the grip along its track (down on a wide stage, right on a narrow one); far enough = a crank, a tap = a crank */
  _crankDrag: function (e, grip) {
    if (e.button != null && e.button !== 0) return;
    var self = this, wide = this._wide, s0 = wide ? e.clientY : e.clientX, moved = 0, max = wide ? 110 : 80;
    this._cranked = false;
    var mv = function (ev) { moved = Math.max(0, Math.min(max, (wide ? ev.clientY : ev.clientX) - s0)); grip.style.transform = wide ? 'translateY(' + moved + 'px)' : 'translateX(' + moved + 'px)'; if (moved > 4) ev.preventDefault(); };
    var up = function () {
      self._endDrag();
      grip.style.transform = '';
      if (moved > 8) { self._cranked = true; if (moved >= max * 0.7) self._crank(); }
    };
    this._drag = { mv: mv, up: up, ghost: function () { return null; } };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  /* which set: a set can be dragged onto the machine (a tap feeds it too) */
  _dragStart: function (e, i, srcEl) {
    if (e.button != null && e.button !== 0) return;
    var self = this, sx = e.clientX, sy = e.clientY, moved = false, ghost = null;
    this._dragged = false;
    var mv = function (ev) {
      if (!moved && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 8) return;
      if (!moved) { moved = true; ghost = srcEl.cloneNode(true); ghost.className += ' vk-ghost is-ghostdrag'; ghost.removeAttribute('data-k'); document.body.appendChild(ghost); srcEl.classList.add('is-lifted'); }
      ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
      ev.preventDefault();
    };
    var up = function (ev) {
      self._endDrag();
      if (!moved) return;
      self._dragged = true;
      var hit = document.elementFromPoint(ev.clientX, ev.clientY);
      if (hit && hit.closest('.vk-machine')) self._feed(i);
    };
    this._drag = { mv: mv, up: up, ghost: function () { return ghost; }, src: srcEl };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d) return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    var g = d.ghost(); if (g && g.parentNode) g.parentNode.removeChild(g);
    if (d.src) d.src.classList.remove('is-lifted');
    this._drag = null;
  }
};

function injectValueKeysCSS() {
  if (typeof document === 'undefined' || document.getElementById('vk-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.vk-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .vk-wrap:focus{outline:none;}'
  + '.vk-work{display:flex;gap:14px;align-items:flex-start;justify-content:center;} .vk-wrap.is-narrow .vk-work{flex-direction:column;align-items:stretch;gap:8px;}'
  /* the order panel */
  + '.vk-panel{flex:0 0 176px;display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0;} .vk-wrap.is-narrow .vk-panel{flex:0 0 auto;width:100%;}'
  + '.vk-ticket{display:flex;justify-content:center;gap:2px;padding:10px 18px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 4px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:48px;line-height:1;color:' + INK + ';font-variant-numeric:tabular-nums;} .vk-wrap.is-narrow .vk-ticket{font-size:38px;padding:6px 16px;}'
  + '.vk-ticket.is-small{font-size:38px;padding:6px 16px;} .vk-ticket.is-out{box-shadow:inset 0 0 0 3px #2E9C88,0 4px 0 #2E9C88;background:#EAF6F2;}'
  + '.vk-tdig{display:inline-block;padding:0 2px;border-radius:8px;} .vk-tdig.is-glow{background:#FCE3D6;box-shadow:0 0 0 3px #F2784B;}'
  + '.vk-pockets{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;} .vk-pockets{flex-wrap:nowrap;} .vk-pocket{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;min-width:28px;min-height:40px;padding:4px;border-radius:10px;background:#F3EBDD;} .vk-pocket.is-glow{box-shadow:inset 0 0 0 2px #F2784B;background:#FCE3D6;}'
  + '.vk-plabel{font-family:' + B + ';font-weight:800;font-size:14px;color:#9A3D1C;white-space:nowrap;}'
  + '.vk-shown{padding:8px;border-radius:12px;background:#F3EBDD;box-shadow:inset 0 0 0 2px #CDBFA4;display:flex;justify-content:center;max-width:100%;box-sizing:border-box;}'
  + '.vk-blocks{display:flex;align-items:flex-end;justify-content:center;gap:10px;flex-wrap:wrap;} .vk-blocks.is-v{flex-direction:column;align-items:center;gap:8px;}'
  + '.vk-grp{display:flex;flex-direction:column;align-items:center;gap:2px;padding:2px;border-radius:8px;} .vk-grp.is-glow{background:#FCE3D6;box-shadow:0 0 0 2px #F2784B;}'
  + '.vk-grp b{font-family:' + H + ';font-weight:800;font-size:18px;color:' + INK + ';} .vk-grp.is-bright b{color:#C4522F;}'
  + '.vk-worth{display:flex;flex-direction:column;align-items:center;gap:6px;} .vk-wnum{display:flex;gap:4px;font-family:' + H + ';font-weight:800;font-size:56px;line-height:1;color:' + INK + ';} .vk-wrap.is-narrow .vk-wnum{font-size:44px;}'
  + '.vk-wdig.is-bright{color:#C4522F;transform:scale(1.15);display:inline-block;padding:0 6px;border-radius:50%;box-shadow:0 0 0 3px #F2784B;} .vk-wfaint{opacity:.45;}'
  + '.vk-sets{display:flex;flex-direction:column;gap:8px;width:100%;} .vk-wrap.is-narrow .vk-sets{flex-direction:row;}'
  + '.vk-set{position:relative;display:flex;align-items:center;justify-content:center;gap:6px;min-height:64px;flex:1 1 0;padding:6px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:grab;touch-action:none;}'
  + '.vk-set.is-fed{box-shadow:inset 0 0 0 3px #146B5E,0 3px 0 #146B5E;} .vk-set.is-wrong{box-shadow:inset 0 0 0 3px #F2784B,0 3px 0 #F2784B;} .vk-set.is-right{box-shadow:inset 0 0 0 3px #2E9C88,0 3px 0 #2E9C88;background:#EAF6F2;} .vk-set.is-lifted{opacity:.4;}'
  + '.vk-setv{font-family:' + H + ';font-weight:800;font-size:18px;color:#146B5E;}'
  + '.vk-ghost{position:fixed;z-index:50;pointer-events:none;opacity:.9;margin:0;}'
  /* blocks */
  + '.vk-flatbg{fill:#2E9C88;stroke:' + INK + ';stroke-width:1.2;} .vk-rodbg{fill:#F2784B;stroke:' + INK + ';stroke-width:1.2;} .vk-cubebg{fill:#F2B33D;stroke:' + INK + ';stroke-width:1.2;}'
  + '.vk-grid{stroke:rgba(255,255,255,.55);stroke-width:.8;fill:none;}'
  + '.is-ghost .vk-flatbg,.is-ghost .vk-rodbg,.is-ghost .vk-cubebg{fill:none;stroke:#146B5E;stroke-dasharray:3 2;stroke-width:1.5;}'
  + '.is-extra .vk-flatbg,.is-extra .vk-rodbg,.is-extra .vk-cubebg{opacity:.55;} .vk-cross{stroke:#C4522F;stroke-width:2.4;stroke-linecap:round;fill:none;}'
  + '.vk-numdot{fill:#fff;stroke:#146B5E;stroke-width:1.2;} .vk-numtxt{font-family:' + H + ';font-weight:800;fill:#146B5E;}'
  /* the machine */
  + '.vk-machine{display:flex;gap:12px;align-items:flex-start;padding:10px;border-radius:18px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #146B5E,0 5px 0 #0E4D44;box-sizing:border-box;min-width:0;}'
  + '.vk-wrap.is-narrow .vk-machine{flex-direction:column;align-items:stretch;gap:8px;padding:8px;}'
  + '.vk-bank.is-cols{display:flex;gap:6px;} .vk-col{display:flex;flex-direction:column;align-items:center;gap:6px;padding:4px;border-radius:12px;} .vk-col.is-glow{background:#FCE3D6;box-shadow:inset 0 0 0 3px #F2784B;}'
  + '.vk-key{width:72px;height:44px;border:0;border-radius:10px;background:#FFFDF6;font-family:' + H + ';font-weight:800;font-size:20px;color:' + INK + ';cursor:pointer;font-variant-numeric:tabular-nums;transition:transform .06s,box-shadow .06s;}'
  + '.is-p2 .vk-bank.is-cols .vk-key{width:100px;}'
  + '.vk-key-h{box-shadow:inset 0 0 0 3px #2E9C88,0 4px 0 #1E7362;} .vk-key-t{box-shadow:inset 0 0 0 3px #F2784B,0 4px 0 #C4522F;} .vk-key-o{box-shadow:inset 0 0 0 3px #F2B33D,0 4px 0 #C68A1A;}'
  + '.vk-key.is-down{transform:translateY(4px);color:#fff;} .vk-key-h.is-down{background:#2E9C88;box-shadow:inset 0 0 0 3px #1E7362;} .vk-key-t.is-down{background:#F2784B;box-shadow:inset 0 0 0 3px #C4522F;} .vk-key-o.is-down{background:#E2A12B;box-shadow:inset 0 0 0 3px #C68A1A;}'
  + '.vk-key:disabled{cursor:default;} .vk-key:disabled:not(.is-down){opacity:.75;}'
  + '.vk-key:focus-visible,.vk-tab:focus-visible,.vk-grip:focus-visible,.vk-set:focus-visible,.vk-go:focus-visible{outline:3px solid #2E5BD6;outline-offset:2px;}'
  + '.vk-tabs{display:flex;gap:6px;} .vk-tab{flex:1 1 0;display:flex;align-items:center;justify-content:center;gap:6px;height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:20px;color:' + INK + ';cursor:pointer;font-variant-numeric:tabular-nums;}'
  + '.vk-tab.is-sel{box-shadow:inset 0 0 0 3px #146B5E;background:#EAF6F2;} .vk-tab.is-glow{box-shadow:inset 0 0 0 3px #F2784B;background:#FCE3D6;} .vk-tab:disabled{cursor:default;color:' + INK + ';}'
  + '.vk-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:4px;border-radius:12px;margin-top:6px;} .vk-pad.is-glow{background:#FCE3D6;box-shadow:inset 0 0 0 3px #F2784B;} .vk-pad .vk-key{width:100%;}'
  + '.vk-side{display:flex;flex-direction:column;align-items:center;gap:10px;width:132px;} .vk-wrap.is-narrow .vk-side{flex-direction:row;flex-wrap:wrap;width:auto;justify-content:center;gap:8px;}'
  + '.vk-drums{display:flex;gap:4px;padding:6px;border-radius:10px;background:' + INK + ';} .vk-drum{display:flex;align-items:center;justify-content:center;width:36px;height:52px;border-radius:6px;background:linear-gradient(#ddd,#fff 30%,#fff 70%,#ddd);font-family:' + H + ';font-weight:800;font-size:34px;color:' + INK + ';font-variant-numeric:tabular-nums;}'
  + '.vk-wrap.is-narrow .vk-drum{width:30px;height:44px;font-size:28px;}'
  + '.vk-drum.is-roll{animation:vkRoll .4s ease-out 1;} .vk-drum.is-shake{animation:vkShake .45s 1;background:#FCE3D6;} .is-fast .vk-drum{animation:none !important;}'
  + '.vk-crank{position:relative;} .vk-crank.is-down{width:56px;height:170px;} .vk-crank.is-right{width:150px;height:52px;}'
  + '.vk-track{position:absolute;border-radius:8px;background:#E5D9C3;box-shadow:inset 0 0 0 2px #CDBFA4;} .vk-crank.is-down .vk-track{left:22px;top:20px;width:12px;height:130px;} .vk-crank.is-right .vk-track{left:20px;top:20px;width:110px;height:12px;}'
  + '.vk-grip{position:absolute;left:4px;top:0;width:48px;height:48px;border:0;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FF9A72,#C4522F);box-shadow:0 3px 0 #8E3519;cursor:grab;touch-action:none;transition:transform .2s;} .vk-crank.is-right .vk-grip{left:0;top:2px;} .vk-grip:disabled{opacity:.5;cursor:default;}'
  + '.vk-tape{display:flex;flex-direction:column;align-items:flex-end;min-width:96px;padding:6px 10px;border-radius:4px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.18);font-family:' + H + ';font-weight:700;font-size:18px;line-height:1.2;color:' + INK + ';font-variant-numeric:tabular-nums;white-space:nowrap;} .vk-tape.is-empty{visibility:hidden;} .vk-tape.is-ok{box-shadow:0 0 0 2px #2E9C88;}'
  + '.vk-wrap.is-narrow .vk-tape.is-empty{display:none;} .vk-wrap.is-narrow .vk-tape{flex-basis:100%;align-items:center;font-size:17px;white-space:normal;text-align:center;}'
  + '.vk-tl.is-sum{border-top:2px solid ' + INK + ';padding-top:2px;margin-top:2px;}'
  + '.vk-tray{display:flex;justify-content:center;padding:8px;border-radius:12px;background:#F3EBDD;box-sizing:border-box;max-width:100%;} .vk-wrap.is-narrow .vk-tray{padding:4px 8px;}'
  + '.vk-trayrow{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}'
  + '.vk-wrap.is-narrow .vk-panel.has-pockets{flex-direction:row;justify-content:center;align-items:center;} .vk-wrap.is-narrow .vk-plabel{display:none;} .vk-wrap.is-narrow .vk-pockets{flex-wrap:nowrap;}'
  /* the bar */
  + '.vk-bar{display:flex;justify-content:center;} .vk-go{display:flex;align-items:center;justify-content:center;gap:8px;min-width:180px;height:48px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .vk-go svg{width:22px;height:22px;display:block;}'
  + '.vk-wrap.is-narrow .vk-go{height:44px;font-size:20px;}'
  + '.vk-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .vk-wrap.is-narrow .vk-note{font-size:16px;line-height:1.25;} .vk-note:empty{display:none;} .vk-note.is-hint{color:#9A3D1C;}'
  + '.vk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.vk-wrap.is-cramp{gap:6px;} .vk-wrap.is-cramp .vk-machine{padding:6px;} .vk-wrap.is-cramp .vk-tab{font-size:17px;gap:3px;} .vk-wrap.is-cramp .vk-set{padding:3px;} .vk-wrap.is-cramp .vk-wnum{font-size:36px;} .vk-wrap.is-cramp .vk-trayrow{gap:8px;flex-wrap:nowrap;}'
  + '@keyframes vkShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}'
  + '@keyframes vkRoll{0%{transform:translateY(-30%);opacity:.3}100%{transform:none;opacity:1}}'
  + '@media (prefers-reduced-motion:reduce){.vk-drum{animation:none !important;} .vk-grip{transition:none;}}';
  var st = document.createElement('style'); st.id = 'vk-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.ValueKeysActivity = ValueKeysActivity;
