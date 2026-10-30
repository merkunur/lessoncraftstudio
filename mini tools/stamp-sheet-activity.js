/* =====================================================================
   stamp-sheet-activity.js — ACTIVITY #170 of the one-by-one rebuild:
   "Make and Count Squares" (2.G.A.2) → THE STAMP SHEET.
   Model: stamp-sheet-core.js. Design:
   docs/activities-rebuild/designs/170-fractions.md
   ---------------------------------------------------------------------
   The rectangle is a sheet of stamps. The child runs a perforating wheel
   along the top rail (lines of holes down the sheet) and the left rail
   (lines across) — a notch every half square, all alike. On Check the
   press prints the plate square into every piece: true squares print
   perfectly, a piece too thin is sliced, a piece too big is left with a
   white border. Then the child counts the stamps on the keypad. The pick
   board asks for the sheet that fills the card's album page. Next
   appears .OK_MS after success.
   ===================================================================== */
var StampSheetActivity = {
  id: 'stamp-sheet-activity',
  /* the drawn apparatus (sheet, rails, wheels, stamps, press, card, album, keypad): declared for the hierarchy audit */
  apparatusClasses: ['sts-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"The Stamp Sheet","de":"Der Briefmarkenbogen","fr":"La planche de timbres","es":"La hoja de timbres","pt":"A cartela de selos","it":"Il foglio di francobolli","nl":"Het postzegelvel","sv":"Frimärksarket","da":"Frimærkearket","no":"Frimerkearket","fi":"Postimerkkiarkki"},
    instruction: {"en":"Make the sheet into same-size square stamps. Then count them.","de":"Teil den Bogen in gleich große quadratische Briefmarken. Dann zähl sie.","fr":"Découpe la planche en timbres carrés tous pareils. Puis compte-les.","es":"Divide la hoja en timbres cuadrados del mismo tamaño. Luego cuéntalos.","pt":"Divida a cartela em selos quadrados do mesmo tamanho. Depois conte quantos são.","it":"Dividi il foglio in francobolli quadrati tutti uguali. Poi contali.","nl":"Verdeel het vel in even grote vierkante postzegels. Tel ze daarna.","sv":"Dela arket i lika stora kvadratiska frimärken. Räkna dem sedan.","da":"Del arket i lige store kvadratiske frimærker. Tæl dem bagefter.","no":"Del arket i like store kvadratiske frimerker. Tell dem etterpå.","fi":"Jaa arkki samankokoisiksi neliön muotoisiksi postimerkeiksi. Laske ne sitten."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setBoard: {"en":"Board","de":"Spielfeld","fr":"Plateau","es":"Tablero","pt":"Tabuleiro","it":"Tabellone","nl":"Speelbord","sv":"Spelbräde","da":"Spilleplade","no":"Spillebrett","fi":"Pelilauta"},
    bNumbers: {"en":"Make by numbers","de":"Nach Zahlen machen","fr":"Faire avec les nombres","es":"Hacer con números","pt":"Fazer pelos números","it":"Fare con i numeri","nl":"Maken met getallen","sv":"Gör efter tal","da":"Lav efter tal","no":"Lag etter tall","fi":"Tee lukujen mukaan"},
    bPlate: {"en":"Make by the plate","de":"Nach der Druckplatte machen","fr":"Faire avec la plaque","es":"Hacer con la placa","pt":"Fazer pela placa","it":"Fare con la lastra","nl":"Maken met de drukplaat","sv":"Gör efter tryckplåten","da":"Lav efter trykpladen","no":"Lag etter trykkplaten","fi":"Tee painolaatan mukaan"},
    bPick: {"en":"Pick the sheet","de":"Den Bogen aussuchen","fr":"Choisir la planche","es":"Elegir la hoja","pt":"Escolher a cartela","it":"Scegliere il foglio","nl":"Het vel kiezen","sv":"Välj arket","da":"Vælg arket","no":"Velg arket","fi":"Valitse arkki"},
    setCard: {"en":"Card shows","de":"Die Karte zeigt","fr":"La carte montre","es":"La tarjeta muestra","pt":"O cartão mostra","it":"La scheda mostra","nl":"De kaart toont","sv":"Kortet visar","da":"Kortet viser","no":"Kortet viser","fi":"Kortissa näkyy"},
    cRowsOf: {"en":"Rows of","de":"Reihen mit je","fr":"Rangées de","es":"Filas de","pt":"Fileiras de","it":"Righe da","nl":"Rijen van","sv":"Rader med","da":"Rækker med","no":"Rader med","fi":"Rivit"},
    cAdd: {"en":"Adding","de":"Plusaufgabe","fr":"Addition","es":"Suma","pt":"Adição","it":"Addizione","nl":"Plussom","sv":"Addition","da":"Plus","no":"Addisjon","fi":"Yhteenlasku"},
    cMul: {"en":"Multiplying","de":"Malaufgabe","fr":"Multiplication","es":"Multiplicación","pt":"Multiplicação","it":"Moltiplicazione","nl":"Keersom","sv":"Multiplikation","da":"Gange","no":"Multiplikasjon","fi":"Kertolasku"},
    qRows: {"en":"Make {rows} rows and {cols} columns of same-size squares.","de":"Mach {rows} Reihen und {cols} Spalten aus gleich großen Quadraten.","fr":"Fais {rows} rangées et {cols} colonnes de carrés tous pareils.","es":"Haz {rows} filas y {cols} columnas de cuadrados del mismo tamaño.","pt":"Faça {rows} fileiras e {cols} colunas de quadrados do mesmo tamanho.","it":"Fai {rows} righe e {cols} colonne di quadrati tutti uguali.","nl":"Maak {rows} rijen en {cols} kolommen van even grote vierkanten.","sv":"Gör {rows} rader och {cols} kolumner av lika stora rutor.","da":"Lav {rows} rækker og {cols} kolonner af lige store kvadrater.","no":"Lag {rows} rader og {cols} kolonner av like store ruter.","fi":"Tee {rows} riviä ja {cols} saraketta samankokoisista ruuduista."},
    qAdd: {"en":"Make the sheet that this addition shows: {sum}.","de":"Mach den Bogen, den diese Plusaufgabe zeigt: {sum}.","fr":"Fais la planche que montre cette addition : {sum}.","es":"Haz la hoja que muestra esta suma: {sum}.","pt":"Faça a cartela que esta adição mostra: {sum}.","it":"Fai il foglio che mostra questa addizione: {sum}.","nl":"Maak het vel dat deze optelsom laat zien: {sum}.","sv":"Gör arket som den här additionen visar: {sum}.","da":"Lav det ark, som dette plusstykke viser: {sum}.","no":"Lag arket som dette plusstykket viser: {sum}.","fi":"Tee arkki, jonka tämä yhteenlasku näyttää: {sum}."},
    qMul: {"en":"Make the sheet for {rows} {sign} {cols}.","de":"Mach den Bogen für {rows} {sign} {cols}.","fr":"Fais la planche pour {rows} {sign} {cols}.","es":"Haz la hoja para {rows} {sign} {cols}.","pt":"Faça a cartela de {rows} {sign} {cols}.","it":"Fai il foglio per {rows} {sign} {cols}.","nl":"Maak het vel voor {rows} {sign} {cols}.","sv":"Gör arket för {rows} {sign} {cols}.","da":"Lav arket til {rows} {sign} {cols}.","no":"Lag arket for {rows} {sign} {cols}.","fi":"Tee arkki laskulle {rows} {sign} {cols}."},
    qPlate: {"en":"Make stamps the size of the press plate.","de":"Mach Briefmarken so groß wie die Druckplatte.","fr":"Fais des timbres de la taille de la plaque.","es":"Haz timbres del tamaño de la placa.","pt":"Faça selos do tamanho da placa.","it":"Fai francobolli grandi come la lastra.","nl":"Maak postzegels zo groot als de drukplaat.","sv":"Gör frimärken lika stora som tryckplåten.","da":"Lav frimærker lige så store som trykpladen.","no":"Lag frimerker like store som trykkplaten.","fi":"Tee painolaatan kokoisia postimerkkejä."},
    qCount: {"en":"How many stamps?","de":"Wie viele Briefmarken?","fr":"Combien de timbres ?","es":"¿Cuántos timbres hay?","pt":"Quantos selos?","it":"Quanti francobolli?","nl":"Hoeveel postzegels?","sv":"Hur många frimärken?","da":"Hvor mange frimærker?","no":"Hvor mange frimerker?","fi":"Montako postimerkkiä?"},
    qPick: {"en":"Which sheet matches the card?","de":"Welcher Bogen passt zur Karte?","fr":"Quelle planche va avec la carte ?","es":"¿Qué hoja va con la tarjeta?","pt":"Qual cartela combina com o cartão?","it":"Quale foglio va con la scheda?","nl":"Welk vel past bij de kaart?","sv":"Vilket ark passar till kortet?","da":"Hvilket ark passer til kortet?","no":"Hvilket ark passer til kortet?","fi":"Mikä arkki vastaa korttia?"},
    cardRowsOf: {"en":"{rows} rows of {cols}","de":"{rows} Reihen mit je {cols}","fr":"{rows} rangées de {cols}","es":"{rows} filas de {cols}","pt":"{rows} fileiras de {cols}","it":"{rows} righe da {cols}","nl":"{rows} rijen van {cols}","sv":"{rows} rader med {cols}","da":"{rows} rækker med {cols}","no":"{rows} rader med {cols}","fi":"{rows} riviä, {cols} joka rivissä"},
    cardRows: {"en":"{rows} rows","de":"{rows} Reihen","fr":"{rows} rangées","es":"{rows} filas","pt":"{rows} fileiras","it":"{rows} righe","nl":"{rows} rijen","sv":"{rows} rader","da":"{rows} rækker","no":"{rows} rader","fi":"{rows} riviä"},
    cardCols: {"en":"{cols} columns","de":"{cols} Spalten","fr":"{cols} colonnes","es":"{cols} columnas","pt":"{cols} colunas","it":"{cols} colonne","nl":"{cols} kolommen","sv":"{cols} kolumner","da":"{cols} kolonner","no":"{cols} kolonner","fi":"{cols} saraketta"},
    hintStart: {"en":"Run the wheel to a notch to make a line of holes.","de":"Fahr mit dem Rädchen zu einer Kerbe, dann stanzt es eine Lochlinie.","fr":"Fais rouler la roulette jusqu’à une encoche pour faire une ligne de trous.","es":"Lleva la ruedita a una muesca para hacer una línea de agujeros.","pt":"Leve a rodinha até uma marca para fazer uma linha de furinhos.","it":"Porta la rotella su una tacca per fare una linea di fori.","nl":"Rol het wieltje naar een inkeping, dan maakt het een lijn van gaatjes.","sv":"Rulla hjulet till en skåra så stansar det en hålremsa.","da":"Kør hjulet hen til et hak, så laver det en hullinje.","no":"Kjør hjulet til et hakk, så lager det en hullinje.","fi":"Vie ratas lovelle, niin se tekee reikäviivan."},
    hintPress: {"en":"The press only fits same-size squares. Look at the stamps that didn’t print true.","de":"Die Presse passt nur auf gleich große Quadrate. Schau dir die Briefmarken an, die nicht gepasst haben.","fr":"La presse ne va que sur des carrés tous pareils. Regarde les timbres qui ne sont pas bien sortis.","es":"La prensa solo encaja en cuadrados del mismo tamaño. Mira los timbres que no cupieron.","pt":"A prensa só cabe em quadrados do mesmo tamanho. Veja os selos que não couberam.","it":"La pressa va bene solo su quadrati tutti uguali. Guarda i francobolli che non sono venuti bene.","nl":"De pers past alleen op even grote vierkanten. Kijk naar de postzegels die niet pasten.","sv":"Pressen passar bara på lika stora rutor. Titta på frimärkena som inte passade.","da":"Pressen passer kun til lige store kvadrater. Se på de frimærker, der ikke passede.","no":"Pressen passer bare på like store ruter. Se på frimerkene som ikke passet.","fi":"Painokone sopii vain samankokoisiin ruutuihin. Katso postimerkkejä, jotka eivät mahtuneet."},
    hintPieces: {"en":"{rows} rows and {cols} columns — count the pieces, not the lines.","de":"{rows} Reihen und {cols} Spalten – zähl die Stücke, nicht die Lochlinien.","fr":"{rows} rangées et {cols} colonnes : compte les morceaux, pas les lignes de trous.","es":"{rows} filas y {cols} columnas: cuenta los pedazos, no las líneas.","pt":"{rows} fileiras e {cols} colunas: conte os pedaços, não as linhas de furinhos.","it":"{rows} righe e {cols} colonne: conta i pezzi, non le linee di fori.","nl":"{rows} rijen en {cols} kolommen: tel de stukken, niet de lijnen.","sv":"{rows} rader och {cols} kolumner – räkna bitarna, inte hålremsorna.","da":"{rows} rækker og {cols} kolonner – tæl stykkerne, ikke hullinjerne.","no":"{rows} rader og {cols} kolonner – tell bitene, ikke hullinjene.","fi":"{rows} riviä ja {cols} saraketta – laske palat, älä reikäviivoja."},
    hintGhost: {"en":"Put the holes where the dotted squares meet.","de":"Stanz die Löcher dort, wo die gepunkteten Quadrate aneinanderstoßen.","fr":"Fais les trous là où les carrés en pointillés se touchent.","es":"Haz los agujeros donde se juntan los cuadrados punteados.","pt":"Faça os furinhos onde os quadrados pontilhados se encontram.","it":"Fai i fori dove si toccano i quadrati tratteggiati.","nl":"Maak de gaatjes waar de gestippelde vierkanten elkaar raken.","sv":"Gör hålen där de prickade rutorna möts.","da":"Lav hullerne, hvor de prikkede felter mødes.","no":"Lag hullene der de prikkede rutene møtes.","fi":"Tee reiät kohtiin, joissa pisteviivaruudut kohtaavat."},
    hintCountStart: {"en":"Count the stamps and type how many.","de":"Zähl die Briefmarken und tipp ein, wie viele es sind.","fr":"Compte les timbres et tape combien il y en a.","es":"Cuenta los timbres y escribe cuántos hay.","pt":"Conte os selos e digite quantos são.","it":"Conta i francobolli e scrivi quanti sono.","nl":"Tel de postzegels en typ hoeveel het er zijn.","sv":"Räkna frimärkena och skriv hur många det är.","da":"Tæl frimærkerne, og skriv, hvor mange der er.","no":"Tell frimerkene og skriv hvor mange det er.","fi":"Laske postimerkit ja kirjoita, montako niitä on."},
    hintRow: {"en":"Count one row, then count how many rows.","de":"Zähl eine Reihe, dann zähl, wie viele Reihen es sind.","fr":"Compte une rangée, puis compte combien il y a de rangées.","es":"Cuenta una fila y luego cuenta cuántas filas hay.","pt":"Conte uma fileira e depois conte quantas fileiras há.","it":"Conta una riga, poi conta quante righe ci sono.","nl":"Tel één rij en tel dan hoeveel rijen er zijn.","sv":"Räkna en rad och räkna sedan hur många rader det är.","da":"Tæl én række, og tæl så, hvor mange rækker der er.","no":"Tell én rad, og tell så hvor mange rader det er.","fi":"Laske yksi rivi ja laske sitten, montako riviä on."},
    hintCountOn: {"en":"Count on, row by row.","de":"Zähl weiter, Reihe für Reihe.","fr":"Continue à compter, rangée après rangée.","es":"Sigue contando, fila por fila.","pt":"Continue contando, fileira por fileira.","it":"Continua a contare, riga dopo riga.","nl":"Tel verder, rij voor rij.","sv":"Räkna vidare, rad för rad.","da":"Tæl videre, række for række.","no":"Tell videre, rad for rad.","fi":"Laske eteenpäin rivi kerrallaan."},
    hintPickStart: {"en":"Choose the sheet that matches the card.","de":"Such den Bogen aus, der zur Karte passt.","fr":"Choisis la planche qui va avec la carte.","es":"Elige la hoja que va con la tarjeta.","pt":"Escolha a cartela que combina com o cartão.","it":"Scegli il foglio che va con la scheda.","nl":"Kies het vel dat bij de kaart past.","sv":"Välj arket som passar till kortet.","da":"Vælg det ark, der passer til kortet.","no":"Velg arket som passer til kortet.","fi":"Valitse arkki, joka vastaa korttia."},
    hintPickRows: {"en":"Count its rows. Count the stamps in one row.","de":"Zähl die Reihen. Zähl die Briefmarken in einer Reihe.","fr":"Compte ses rangées. Compte les timbres d’une rangée.","es":"Cuenta sus filas. Cuenta los timbres de una fila.","pt":"Conte as fileiras. Conte os selos de uma fileira.","it":"Conta le righe. Conta i francobolli di una riga.","nl":"Tel de rijen. Tel de postzegels in één rij.","sv":"Räkna raderna. Räkna frimärkena i en rad.","da":"Tæl rækkerne. Tæl frimærkerne i én række.","no":"Tell radene. Tell frimerkene i én rad.","fi":"Laske rivit. Laske yhden rivin postimerkit."},
    hintPickFill: {"en":"Find the sheet that fills the page exactly.","de":"Such den Bogen, der die Seite genau füllt.","fr":"Trouve la planche qui remplit exactement la page.","es":"Busca la hoja que llena la página exactamente.","pt":"Procure a cartela que enche a página certinho.","it":"Trova il foglio che riempie esattamente la pagina.","nl":"Zoek het vel dat de bladzijde precies vult.","sv":"Hitta arket som fyller sidan precis.","da":"Find det ark, der fylder siden helt præcist.","no":"Finn arket som fyller siden helt nøyaktig.","fi":"Etsi arkki, joka täyttää sivun täsmälleen."},
    noteGrid: {"en":"Every stamp printed true!","de":"Jede Briefmarke ist sauber gedruckt!","fr":"Tous les timbres sont bien imprimés !","es":"¡Todos los timbres salieron perfectos!","pt":"Todos os selos saíram certinhos!","it":"Tutti i francobolli sono stampati bene!","nl":"Elke postzegel is precies gedrukt!","sv":"Alla frimärken blev perfekta!","da":"Alle frimærker blev trykt helt rigtigt!","no":"Alle frimerkene ble trykt helt riktig!","fi":"Kaikki postimerkit painettiin täydellisesti!"},
    okRowsOf: {"en":"{rows} rows of {cols} make {total} stamps!","de":"{rows} Reihen mit je {cols} sind {total} Briefmarken!","fr":"{rows} rangées de {cols}, ça fait {total} timbres !","es":"¡{rows} filas de {cols} son {total} timbres!","pt":"{rows} fileiras de {cols} dão {total} selos!","it":"{rows} righe da {cols} fanno {total} francobolli!","nl":"{rows} rijen van {cols} zijn {total} postzegels!","sv":"{rows} rader med {cols} blir {total} frimärken!","da":"{rows} rækker med {cols} giver {total} frimærker!","no":"{rows} rader med {cols} blir {total} frimerker!","fi":"{rows} riviä, {cols} joka rivissä: {total} postimerkkiä!"},
    okAdd: {"en":"{sum} = {total} stamps!","de":"{sum} = {total} Briefmarken!","fr":"{sum} = {total} timbres !","es":"¡{sum} = {total} timbres!","pt":"{sum} = {total} selos!","it":"{sum} = {total} francobolli!","nl":"{sum} = {total} postzegels!","sv":"{sum} = {total} frimärken!","da":"{sum} = {total} frimærker!","no":"{sum} = {total} frimerker!","fi":"{sum} = {total} postimerkkiä!"},
    okMul: {"en":"{rows} {sign} {cols} = {total} stamps!","de":"{rows} {sign} {cols} = {total} Briefmarken!","fr":"{rows} {sign} {cols} = {total} timbres !","es":"¡{rows} {sign} {cols} = {total} timbres!","pt":"{rows} {sign} {cols} = {total} selos!","it":"{rows} {sign} {cols} = {total} francobolli!","nl":"{rows} {sign} {cols} = {total} postzegels!","sv":"{rows} {sign} {cols} = {total} frimärken!","da":"{rows} {sign} {cols} = {total} frimærker!","no":"{rows} {sign} {cols} = {total} frimerker!","fi":"{rows} {sign} {cols} = {total} postimerkkiä!"},
    aPlate: {"en":"The press plate: drag it over the sheet, or tap to lay it on the first square","de":"Die Druckplatte: Zieh sie über den Bogen oder tipp, um sie aufs erste Quadrat zu legen","fr":"La plaque : fais-la glisser sur la planche, ou touche-la pour la poser sur le premier carré","es":"La placa: arrástrala sobre la hoja o tócala para ponerla en el primer cuadrado","pt":"A placa: arraste sobre a cartela ou toque para colocá-la no primeiro quadrado","it":"La lastra: trascinala sul foglio o toccala per metterla sul primo quadrato","nl":"De drukplaat: sleep hem over het vel of tik om hem op het eerste vierkant te leggen","sv":"Tryckplåten: dra den över arket eller tryck för att lägga den på första rutan","da":"Trykpladen: træk den hen over arket, eller tryk for at lægge den på det første felt","no":"Trykkplaten: dra den over arket, eller trykk for å legge den på den første ruten","fi":"Painolaatta: vedä se arkin päälle tai napauta, niin se asettuu ensimmäiseen ruutuun"},
    aAlbum: {"en":"The album of finished sheets","de":"Das Album mit den fertigen Bögen","fr":"L’album des planches terminées","es":"El álbum de hojas terminadas","pt":"O álbum das cartelas prontas","it":"L’album dei fogli finiti","nl":"Het album met de afgemaakte vellen","sv":"Albumet med färdiga ark","da":"Albummet med de færdige ark","no":"Albumet med ferdige ark","fi":"Valmiiden arkkien albumi"},
    aRailTop: {"en":"Top rail: run the wheel to make a line of holes down the sheet","de":"Obere Schiene: Fahr mit dem Rädchen, dann stanzt es eine Lochlinie von oben nach unten","fr":"Rail du haut : fais rouler la roulette pour faire une ligne de trous de haut en bas","es":"Riel de arriba: pasa la ruedita para hacer una línea de agujeros de arriba abajo","pt":"Trilho de cima: passe a rodinha para fazer uma linha de furinhos de cima para baixo","it":"Binario in alto: porta la rotella per fare una linea di fori dall’alto in basso","nl":"Bovenste rail: rol het wieltje voor een lijn van gaatjes van boven naar beneden","sv":"Övre skenan: rulla hjulet för att göra en hålremsa uppifrån och ned","da":"Øverste skinne: kør hjulet for at lave en hullinje oppefra og ned","no":"Øverste skinne: kjør hjulet for å lage en hullinje ovenfra og ned","fi":"Yläkisko: vie ratasta, niin se tekee reikäviivan ylhäältä alas"},
    aRailLeft: {"en":"Left rail: run the wheel to make a line of holes across the sheet","de":"Linke Schiene: Fahr mit dem Rädchen, dann stanzt es eine Lochlinie quer über den Bogen","fr":"Rail de gauche : fais rouler la roulette pour faire une ligne de trous de gauche à droite","es":"Riel de la izquierda: pasa la ruedita para hacer una línea de agujeros de lado a lado","pt":"Trilho da esquerda: passe a rodinha para fazer uma linha de furinhos de um lado ao outro","it":"Binario a sinistra: porta la rotella per fare una linea di fori da un lato all’altro","nl":"Linker rail: rol het wieltje voor een lijn van gaatjes dwars over het vel","sv":"Vänstra skenan: rulla hjulet för att göra en hålremsa tvärs över arket","da":"Venstre skinne: kør hjulet for at lave en hullinje på tværs af arket","no":"Venstre skinne: kjør hjulet for å lage en hullinje på tvers av arket","fi":"Vasen kisko: vie ratasta, niin se tekee reikäviivan arkin poikki"},
    aNotch: {"en":"notch {i} of {n}","de":"Kerbe {i} von {n}","fr":"encoche {i} sur {n}","es":"muesca {i} de {n}","pt":"marca {i} de {n}","it":"tacca {i} di {n}","nl":"inkeping {i} van {n}","sv":"skåra {i} av {n}","da":"hak {i} af {n}","no":"hakk {i} av {n}","fi":"lovi {i}/{n}"},
    aNotchCut: {"en":"notch {i} of {n}, holes made","de":"Kerbe {i} von {n}, Löcher gestanzt","fr":"encoche {i} sur {n}, trous faits","es":"muesca {i} de {n}, agujeros hechos","pt":"marca {i} de {n}, furinhos feitos","it":"tacca {i} di {n}, fori fatti","nl":"inkeping {i} van {n}, gaatjes gemaakt","sv":"skåra {i} av {n}, hål gjorda","da":"hak {i} af {n}, huller lavet","no":"hakk {i} av {n}, hull laget","fi":"lovi {i}/{n}, reiät tehty"},
    aPerf: {"en":"A line of holes (tap to take it away)","de":"Eine Lochlinie (antippen zum Zumachen)","fr":"Une ligne de trous (touche-la pour la refermer)","es":"Una línea de agujeros (tócala para cerrarla)","pt":"Uma linha de furinhos (toque para fechar)","it":"Una linea di fori (toccala per richiuderla)","nl":"Een lijn van gaatjes (tik om hem weg te halen)","sv":"En hålremsa (tryck för att ta bort den)","da":"En hullinje (tryk for at lukke den)","no":"En hullinje (trykk for å lukke den)","fi":"Reikäviiva (napauta, niin se umpeutuu)"},
    aStamp: {"en":"Stamp, row {r}, place {c}","de":"Briefmarke, Reihe {r}, Platz {c}","fr":"Timbre, rangée {r}, place {c}","es":"Timbre, fila {r}, lugar {c}","pt":"Selo, fileira {r}, lugar {c}","it":"Francobollo, riga {r}, posto {c}","nl":"Postzegel, rij {r}, plek {c}","sv":"Frimärke, rad {r}, plats {c}","da":"Frimærke, række {r}, plads {c}","no":"Frimerke, rad {r}, plass {c}","fi":"Postimerkki, rivi {r}, paikka {c}"},
    aSheetPick: {"en":"Sheet {k} of 3","de":"Bogen {k} von 3","fr":"Planche {k} sur 3","es":"Hoja {k} de 3","pt":"Cartela {k} de 3","it":"Foglio {k} di 3","nl":"Vel {k} van 3","sv":"Ark {k} av 3","da":"Ark {k} af 3","no":"Ark {k} av 3","fi":"Arkki {k}/3"},
    aBack: {"en":"Erase","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Sudda","da":"Slet","no":"Slett","fi":"Pyyhi"},
    anCut: {"en":"A line of holes.","de":"Eine Lochlinie.","fr":"Une ligne de trous.","es":"Una línea de agujeros.","pt":"Uma linha de furinhos.","it":"Una linea di fori.","nl":"Een lijn van gaatjes.","sv":"En hålremsa.","da":"En hullinje.","no":"En hullinje.","fi":"Reikäviiva."},
    anHeal: {"en":"The holes are gone.","de":"Die Löcher sind wieder zu.","fr":"Les trous sont refermés.","es":"Los agujeros se cerraron.","pt":"Os furinhos fecharam.","it":"I fori sono richiusi.","nl":"De gaatjes zijn weer dicht.","sv":"Hålen är borta.","da":"Hullerne er lukket igen.","no":"Hullene er lukket igjen.","fi":"Reiät umpeutuivat."}
  },/*STRINGS-END*/
  defaults: { board: 'numbers', card: 'rowsOf' },
  settings: [
    { key: 'board', type: 'choice', labelKey: 'setBoard', options: [{ value: 'numbers', labelKey: 'bNumbers' }, { value: 'plate', labelKey: 'bPlate' }, { value: 'pick', labelKey: 'bPick' }] },
    { key: 'card', type: 'choice', labelKey: 'setCard', options: [{ value: 'rowsOf', labelKey: 'cRowsOf' }, { value: 'add', labelKey: 'cAdd' }, { value: 'mul', labelKey: 'cMul' }] }
  ],
  OK_MS: 500, FAST: false,
  TEAL: '#146B5E', CORAL: '#F2784B', INK: '#2B2B2B', PAPER: '#FFFDF6',
  /* the stamp colour per round (decoration only) */
  PALETTE: ['#2A9D8F', '#E76F51', '#E9B949', '#8E5BA8', '#6A994E', '#4A90C2', '#D9677F', '#C9A26B', '#5FB3A1'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this.album = 0;
    injectStampSheetCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _board: function () { return StampSheetCore.boardOf(this._setting('board')); },
  _card: function () { return StampSheetCore.cardOf(this._setting('card')); },
  _loc: function () { return StampSheetCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._board(); },
  _sign: function () { return StampSheetCore.mulSign(this._loc()); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = StampSheetCore.rounds(this._board()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = StampSheetCore, pool = this._ensurePool(), n = C.passSize(this._board()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._board(), Math.random, fresh ? null : this._prev, pass); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'stamp-sheet.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k, pass); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _args: function (st) {
    st = st || this.st;
    return { rows: st.rows, cols: st.cols, total: st.rows * st.cols, sign: this._sign(), sum: StampSheetCore.addTerms(st.rows, st.cols).join(' + ') };
  },
  _taskLine: function () {
    var st = this.st, a = this._args();
    if (st.board === 'pick') return this._t('qPick');
    if (st.step === 'count' || st.step === 'done') return this._t('qCount');
    if (st.board === 'plate') return this._t('qPlate');
    var c = this._card();
    return this._t(c === 'add' ? 'qAdd' : c === 'mul' ? 'qMul' : 'qRows', a);
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k, pass) {
    this._clearTimers(); this._endDrag();
    this.st = StampSheetCore.newState(this._board(), k, pass || 0);
    this._view = { note: '', soft: false, ghost: null, wheel: { col: 0, row: 0 }, fresh: null, glow: {}, show: 0, plateAt: null, tear: false, page: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0, 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sts-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="sts-main"><div class="sts-side" data-qa="side"></div><div class="sts-sheetbox" data-qa="sheet"></div></div><div class="sts-keysbox"></div><p class="sts-note" data-qa="note" aria-live="polite"></p><div class="sts-ctrl"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _geometry: function (W) {
    var st = this.st, wide = W >= 600, cramp = W < 300, R = wide ? 26 : 22, pad = 6, count = st.step === 'count' || st.step === 'done';
    var sideW = wide ? 210 : W, room = wide ? W - sideW - 18 : W, gapY = count && this._view.show ? (wide ? 12 : 6) : 0, runW = count && this._view.show === 2 ? 34 : 0;
    var u = wide ? Math.min((room - R - 2 * pad - runW) / st.cols, (340 - (st.rows - 1) * gapY) / st.rows, 120)
      : count ? Math.min((W - R - 2 * pad - 8 - runW) / st.cols, ((cramp ? 196 : 226) - (st.rows - 1) * gapY) / st.rows, 84)
      : cramp ? Math.min((W - R - 2 * pad - 8) / st.cols, 180 / st.rows, 76) : Math.min((W - R - 2 * pad - 8) / st.cols, 214 / st.rows, 84);
    u = Math.max(44, Math.floor(u));
    return { W: W, wide: wide, cramp: cramp, R: R, pad: pad, u: u, gapY: gapY, sideW: sideW, sheetW: R + st.cols * u, sheetH: R + st.rows * u };
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._g = this._geometry(this._width());
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'sts-wrap is-' + st.board + ' is-' + st.step + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '');
    this._paintSide();
    if (st.board === 'pick') this._paintCounter(); else this._paintSheet();
    this._paintKeys(); this._paintCtrl();
    var note = this._qs('.sts-note');
    note.textContent = v.note || ''; note.className = 'sts-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _colour: function () { return this.PALETTE[this.st.k % this.PALETTE.length]; },
  /* the row / column icons: a bar of three cells lying (a row) or standing (a column) */
  _icon: function (kind, s) {
    var o = '<svg class="sts-ic" width="' + (kind === 'row' ? 3 * s : s) + '" height="' + (kind === 'row' ? s : 3 * s) + '" aria-hidden="true">';
    for (var i = 0; i < 3; i++) o += '<rect x="' + (kind === 'row' ? i * s + 1 : 1) + '" y="' + (kind === 'row' ? 1 : i * s + 1) + '" width="' + (s - 2) + '" height="' + (s - 2) + '" rx="1.5" fill="' + this.CORAL + '" opacity=".85"/>';
    return o + '</svg>';
  },
  /* one stamp: a coloured square, a white frame, a little star (no star when small) */
  _stampSvg: function (x, y, s, col, extra) {
    var f = Math.max(2, s * 0.08), o = '<g class="sts-stamp' + (extra || '') + '"><rect x="' + (x + 1.5) + '" y="' + (y + 1.5) + '" width="' + (s - 3) + '" height="' + (s - 3) + '" rx="2" fill="#fff"/><rect x="' + (x + 1.5 + f) + '" y="' + (y + 1.5 + f) + '" width="' + (s - 3 - 2 * f) + '" height="' + (s - 3 - 2 * f) + '" rx="1.5" fill="' + col + '"/>';
    if (s >= 30) { var cx = x + s / 2, cy = y + s / 2, R = s * 0.2, r = R * 0.45, p = []; for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r : R; p.push((cx + q * Math.cos(a)).toFixed(1) + ',' + (cy + q * Math.sin(a)).toFixed(1)); } o += '<polygon points="' + p.join(' ') + '" fill="#fff" opacity=".9"/>'; }
    return o + '</g>';
  },

  /* ---- the side: the order card, the press, the album ---- */
  _cardHtml: function (st, compact, bare) {
    var a = this._args(st), c = this._card(), big;
    if (c === 'add') big = this._esc(a.sum); else if (c === 'mul') big = this._esc(a.rows + ' ' + a.sign + ' ' + a.cols); else big = this._esc(this._t('cardRowsOf', a));
    var o = '<b class="sts-cbig' + (c !== 'rowsOf' ? ' is-math' : '') + (c === 'add' && st.rows > 3 && compact ? ' is-long' : '') + '">' + big + '</b>';
    if (st.board === 'numbers' && !bare) o += '<span class="sts-csmall"><span class="sts-cline">' + this._icon('row', compact ? 7 : 8) + '<span>' + this._esc(this._t('cardRows', a)) + '</span></span><span class="sts-cline">' + this._icon('col', compact ? 6 : 7) + '<span>' + this._esc(this._t('cardCols', a)) + '</span></span></span>';
    return o;
  },
  _paintSide: function () {
    var st = this.st, g = this._g, el = this._qs('.sts-side'), self = this, v = this._view;
    el.innerHTML = ''; el.style.width = g.wide && st.board !== 'pick' ? g.sideW + 'px' : '';
    var card = this.api.el('div', 'sts-card'); card.setAttribute('data-qa', 'card');
    if (!g.wide && st.step !== 'cut' && st.board !== 'pick') card.style.display = 'none';
    if (st.board === 'plate') card.innerHTML = '<span class="sts-plate-pic" aria-hidden="true"><svg width="66" height="78"><rect x="27" y="0" width="12" height="18" rx="3" fill="#9C7A4B" stroke="' + this.INK + '" stroke-width="2"/><rect x="5" y="16" width="56" height="56" rx="3" fill="' + this._colour() + '" stroke="' + this.INK + '" stroke-width="2.5"/><rect x="11" y="22" width="44" height="44" rx="2" fill="none" stroke="#fff" stroke-width="2.5"/></svg></span>';
    else card.innerHTML = this._cardHtml(st, !g.wide, !g.wide && st.step !== 'cut');
    el.appendChild(card);
    if (st.board !== 'pick' && st.step === 'cut') {
      /* the press: its plate can be lifted and laid on the sheet */
      var press = this.api.el('div', 'sts-press');
      var plate = this._btn('sts-platebtn', 'plate', this._t('aPlate'), '<svg width="' + (g.wide ? 120 : 88) + '" height="' + (g.wide ? 70 : 56) + '" viewBox="0 0 120 70" aria-hidden="true"><rect x="8" y="4" width="104" height="14" rx="4" fill="#C9965F" stroke="' + this.INK + '" stroke-width="2.5"/><rect x="56" y="18" width="8" height="12" fill="#8A6A3E"/><rect x="38" y="30" width="44" height="30" rx="3" fill="' + this._colour() + '" stroke="' + this.INK + '" stroke-width="2.5"/><rect x="43" y="35" width="34" height="20" rx="2" fill="none" stroke="#fff" stroke-width="2"/><rect x="2" y="62" width="116" height="6" rx="3" fill="#E2D4B4"/></svg>');
      plate.disabled = st.done || st.step !== 'cut';
      plate.addEventListener('pointerdown', function (e) { if (e.button) return; self._pressPlate(e); });
      plate.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._tapPlate(); } });
      press.appendChild(plate); el.appendChild(press);
    } else if (v.page && st.pick != null) {
      el.appendChild(this._pageEl());
    }
    if (!g.wide) return;
    var album = this.api.el('div', 'sts-album'); album.setAttribute('aria-label', this._t('aAlbum', { n: this.album }));
    var lines = ''; for (var i = 0; i < Math.min(this.album, 5); i++) lines += '<rect x="' + (4 + i * 2) + '" y="5" width="1.2" height="' + (g.wide ? 46 : 28) + '" fill="#E9D3A8"/>';
    /* the album: a closed book with a stamp on its cover; its spine gets one line per finished sheet */
    var aw = g.wide ? 76 : 52, ah = g.wide ? 56 : 38;
    album.innerHTML = '<svg width="' + aw + '" height="' + ah + '" aria-hidden="true"><rect x="2" y="2" width="' + (aw - 4) + '" height="' + (ah - 4) + '" rx="5" fill="#4A7C74" stroke="' + this.INK + '" stroke-width="2"/><rect x="2" y="2" width="' + (g.wide ? 12 : 9) + '" height="' + (ah - 4) + '" rx="3" fill="#2F5E57"/>' + lines + '<rect x="' + (aw * 0.42) + '" y="' + (ah * 0.22) + '" width="' + (aw * 0.36) + '" height="' + (ah * 0.52) + '" rx="2" fill="#fff"/><rect x="' + (aw * 0.42 + 3) + '" y="' + (ah * 0.22 + 3) + '" width="' + (aw * 0.36 - 6) + '" height="' + (ah * 0.52 - 6) + '" fill="' + this._colour() + '"/><circle class="sts-postmark' + (v.tear ? ' is-on' : '') + '" cx="' + (aw * 0.72) + '" cy="' + (ah * 0.62) + '" r="' + (ah * 0.2) + '" fill="none" stroke="' + this.CORAL + '" stroke-width="2.5"/></svg>';
    el.appendChild(album);
  },

  /* ---- the sheet with its rails ---- */
  _paintSheet: function () {
    var st = this.st, g = this._g, v = this._view, el = this._qs('.sts-sheetbox'), self = this, C = StampSheetCore, u = g.u, R = g.R;
    var count = st.step === 'count' || st.step === 'done', gapY = g.gapY, X0 = R, Y0 = count ? 4 : R;
    /* miss 2 shows the lattice and glows the whole-square notches until the next move (a new line or a heal clears the verdict) */
    var showHelp = st.help && !!(st.verdict && st.verdict.misprint);
    var W = X0 + st.cols * u + 6 + (count && v.show === 2 ? 34 : 0), H = Y0 + st.rows * u + (st.rows - 1) * gapY + 6;
    el.innerHTML = ''; el.style.width = W + 'px'; el.style.height = H + 'px';
    var col = this._colour(), o = '<svg class="sts-sheetsvg" width="' + W + '" height="' + H + '" aria-hidden="true">';
    var rowY = function (j) { return Y0 + j * u + j * gapY; };
    /* the sheet (in the count step torn into strips when showing) */
    if (!gapY) o += '<rect x="' + X0 + '" y="' + Y0 + '" width="' + st.cols * u + '" height="' + st.rows * u + '" rx="3" fill="' + this.PAPER + '" stroke="' + this.INK + '" stroke-width="3" class="sts-paper"/>';
    else for (var j = 0; j < st.rows; j++) o += '<rect x="' + X0 + '" y="' + rowY(j) + '" width="' + st.cols * u + '" height="' + u + '" rx="3" fill="' + this.PAPER + '" stroke="' + this.INK + '" stroke-width="3" class="sts-paper"/>';
    var hx = function (h) { return X0 + h * u / 2; }, hy = function (h) { return Y0 + h * u / 2; };
    if (!count) {
      /* the rails: brass bars, a notch every half square (all alike) */
      o += '<rect x="' + X0 + '" y="2" width="' + st.cols * u + '" height="' + (R - 6) + '" rx="4" fill="#D9B46A" stroke="' + this.INK + '" stroke-width="2"/>';
      o += '<rect x="2" y="' + Y0 + '" width="' + (R - 6) + '" height="' + st.rows * u + '" rx="4" fill="#D9B46A" stroke="' + this.INK + '" stroke-width="2"/>';
      C.notches(st.cols).forEach(function (h) { var glow = showHelp && h % 2 === 0; o += '<line x1="' + hx(h) + '" y1="' + (R - 12) + '" x2="' + hx(h) + '" y2="' + (R - 4) + '" stroke="' + (glow ? self.TEAL : '#7A5A2A') + '" stroke-width="' + (glow ? 4 : 2) + '"/>'; });
      C.notches(st.rows).forEach(function (h) { var glow = showHelp && h % 2 === 0; o += '<line x1="' + (R - 12) + '" y1="' + hy(h) + '" x2="' + (R - 4) + '" y2="' + hy(h) + '" stroke="' + (glow ? self.TEAL : '#7A5A2A') + '" stroke-width="' + (glow ? 4 : 2) + '"/>'; });
      /* the plate's size at rest: a dotted ghost in the sheet's corner */
      if (!st.verdict && !st.help && !v.plateAt) o += '<rect x="' + (X0 + 3) + '" y="' + (Y0 + 3) + '" width="' + (u - 6) + '" height="' + (u - 6) + '" fill="none" stroke="' + this.TEAL + '" stroke-width="2" stroke-dasharray="2 4" opacity=".55" class="sts-cornerghost"/>';
      /* miss 1+: the press printed every piece */
      if (st.verdict && st.verdict.misprint) C.misprints(st).forEach(function (p) {
        var px = hx(p.x), py = hy(p.y);
        if (p.ok) { o += self._stampSvg(px, py, u, col); return; }
        /* the part of the plate that landed inside the piece; the rest of the plate fell on the holes (sliced) */
        var sw = Math.min(p.w, 2) * u / 2, sh = Math.min(p.h, 2) * u / 2, f = Math.max(2, u * 0.08);
        o += '<g class="sts-misprint"><rect x="' + (px + 1.5) + '" y="' + (py + 1.5) + '" width="' + Math.max(0, sw - 3) + '" height="' + Math.max(0, sh - 3) + '" rx="2" fill="#fff"/><rect x="' + (px + 1.5 + f) + '" y="' + (py + 1.5 + f) + '" width="' + Math.max(0, sw - 3 - (p.w < 2 ? f : 2 * f)) + '" height="' + Math.max(0, sh - 3 - (p.h < 2 ? f : 2 * f)) + '" fill="' + col + '"/></g>';
        /* a torn coral edge where the plate ran over the holes */
        var zig = function (x1, y1, x2, y2, horiz) { var n = Math.max(3, Math.round((horiz ? x2 - x1 : y2 - y1) / 7)), d = 'M' + x1 + ' ' + y1; for (var i = 1; i <= n; i++) { var t = i / n, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; d += ' L' + (horiz ? x : x + (i % 2 ? -5 : 0)).toFixed(1) + ' ' + (horiz ? y + (i % 2 ? -5 : 0) : y).toFixed(1); } return '<path class="sts-sliced" d="' + d + '" fill="none" stroke="' + self.CORAL + '" stroke-width="3.5" stroke-linejoin="round"/>'; };
        if (p.w < 2) o += zig(px + sw - 1, py + 2, px + sw - 1, py + sh - 2, false);
        if (p.h < 2) o += zig(px + 2, py + sh - 1, px + sw - 2, py + sh - 1, true);
        /* white left over where the piece is bigger than the plate (bordered) */
        p.border.forEach(function (q) { o += '<rect class="sts-bordered" x="' + (hx(q.x) + 3) + '" y="' + (hy(q.y) + 3) + '" width="' + Math.max(0, q.w * u / 2 - 6) + '" height="' + Math.max(0, q.h * u / 2 - 6) + '" fill="#FFF7EC" stroke="' + self.CORAL + '" stroke-width="2" stroke-dasharray="5 4"/>'; });
      });
      /* the plate laid on the sheet (free play) */
      if (v.plateAt) o += '<rect class="sts-plateghost" x="' + (X0 + v.plateAt.i * u) + '" y="' + (Y0 + v.plateAt.j * u) + '" width="' + u + '" height="' + u + '" fill="' + col + '" opacity=".45" stroke="' + this.INK + '" stroke-width="2"/>';
      /* miss 2: the plate's ghost lattice, ABOVE the misprints (their leftover paper would hide it) */
      if (showHelp) for (var gy = 0; gy < st.rows; gy++) for (var gx = 0; gx < st.cols; gx++) o += '<rect x="' + (X0 + gx * u + 4) + '" y="' + (Y0 + gy * u + 4) + '" width="' + (u - 8) + '" height="' + (u - 8) + '" fill="none" stroke="' + this.TEAL + '" stroke-width="2" stroke-dasharray="3 4" opacity=".7" class="sts-lattice"/>';
      /* the perforations: rows of holes edge to edge */
      st.colCuts.forEach(function (h) { o += '<line class="sts-perf is-col' + (v.fresh === 'col' + h ? ' is-fresh' : '') + '" x1="' + hx(h) + '" y1="' + (Y0 + 4) + '" x2="' + hx(h) + '" y2="' + (Y0 + st.rows * u - 4) + '" stroke="' + self.INK + '" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="0.1 8"/>'; });
      st.rowCuts.forEach(function (h) { o += '<line class="sts-perf is-row' + (v.fresh === 'row' + h ? ' is-fresh' : '') + '" x1="' + (X0 + 4) + '" y1="' + hy(h) + '" x2="' + (X0 + st.cols * u - 4) + '" y2="' + hy(h) + '" stroke="' + self.INK + '" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="0.1 8"/>'; });
      /* the wheels: parked at their notch (or the start) */
      /* parked wheels sit a little in from the corner so the two never overlap */
      var wx = v.wheel.col ? hx(v.wheel.col) : X0 + 16, wy = v.wheel.row ? hy(v.wheel.row) : Y0 + 16;
      o += this._wheelSvg(wx, (R - 4) / 2 + 1, v.ghost && v.ghost.axis === 'col') + this._wheelSvg((R - 4) / 2 + 1, wy, v.ghost && v.ghost.axis === 'row');
    } else {
      /* the count step: every stamp printed true; when showing, the strips light one stamp after another */
      for (var r = 0; r < st.rows; r++) {
        for (var c = 0; c < st.cols; c++) o += this._stampSvg(X0 + c * u, rowY(r), u, col, (v.glow[r + '-' + c] ? ' is-glow' : '') + (v.show ? ' is-lit' : '') + (v.tear ? ' is-tear' : ''));
        if (v.show === 2) o += '<text class="sts-run" x="' + (X0 + st.cols * u + 8) + '" y="' + (rowY(r) + u / 2 + 7) + '">' + (r + 1) * st.cols + '</text>';
      }
      for (var cc = 1; cc < st.cols; cc++) o += '<line x1="' + (X0 + cc * u) + '" y1="' + (Y0 + 3) + '" x2="' + (X0 + cc * u) + '" y2="' + (rowY(st.rows - 1) + u - 3) + '" stroke="' + this.INK + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 7" opacity=".55"/>';
      if (!gapY) for (var rr = 1; rr < st.rows; rr++) o += '<line x1="' + (X0 + 3) + '" y1="' + (Y0 + rr * u) + '" x2="' + (X0 + st.cols * u - 3) + '" y2="' + (Y0 + rr * u) + '" stroke="' + this.INK + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 7" opacity=".55"/>';
    }
    el.innerHTML = o + '</svg>';
    /* the order of lighting: one stamp after another, row by row */
    if (count && v.show) Array.prototype.forEach.call(el.querySelectorAll('.sts-stamp.is-lit'), function (s, i) { s.style.animationDelay = (self.FAST ? 0 : i * 250) + 'ms'; });
    if (v.tear) Array.prototype.forEach.call(el.querySelectorAll('.sts-stamp.is-tear'), function (s, i) { s.style.animationDelay = (self.FAST ? 0 : Math.floor(i / st.cols) * 300) + 'ms'; });
    if (!count) this._railTargets(el); else this._stampTargets(el, rowY);
  },
  _wheelSvg: function (cx, cy, ghost) {
    var r = 11, o = '<g class="sts-wheel' + (ghost ? ' is-ghost' : '') + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (ghost ? this.CORAL : this.TEAL) + '" stroke="' + this.INK + '" stroke-width="2"/>';
    for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4; o += '<line x1="' + (cx + (r - 1) * Math.cos(a)).toFixed(1) + '" y1="' + (cy + (r - 1) * Math.sin(a)).toFixed(1) + '" x2="' + (cx + (r + 3) * Math.cos(a)).toFixed(1) + '" y2="' + (cy + (r + 3) * Math.sin(a)).toFixed(1) + '" stroke="' + this.INK + '" stroke-width="2"/>'; }
    return o + '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="#fff"/></g>';
  },
  /* the rails are one target each (≥ 44 px deep): a tap sends the wheel to the nearest notch */
  _railTargets: function (el) {
    var st = this.st, g = this._g, self = this, u = g.u, R = g.R;
    ['col', 'row'].forEach(function (axis) {
      var n = axis === 'col' ? st.cols : st.rows, b = self._btn('sts-rail is-' + axis, 'rail-' + axis, '', '');
      b.setAttribute('role', 'slider'); b.setAttribute('aria-valuemin', '1'); b.setAttribute('aria-valuemax', String(2 * n - 1));
      var at = self._view.wheel[axis] || 1; b.setAttribute('aria-valuenow', String(at));
      b.setAttribute('aria-valuetext', self._t(StampSheetCore.hasCut(st, axis, at) ? 'aNotchCut' : 'aNotch', { i: at, n: 2 * n - 1 }));
      b.setAttribute('aria-label', self._t(axis === 'col' ? 'aRailTop' : 'aRailLeft'));
      if (axis === 'col') { b.style.left = R + 'px'; b.style.top = '0px'; b.style.width = st.cols * u + 'px'; b.style.height = Math.max(44, R) + 'px'; }
      else { b.style.top = R + 'px'; b.style.left = '0px'; b.style.height = st.rows * u + 'px'; b.style.width = Math.max(44, R) + 'px'; }
      b.disabled = st.done || st.step !== 'cut';
      b.addEventListener('pointerdown', function (e) { if (e.button) return; self._pressRail(e, axis); });
      b.addEventListener('keydown', function (e) { self._railKey(e, axis); });
      el.appendChild(b);
    });
    /* each line of holes can be tapped to heal it */
    var perf = function (axis, h) {
      var b = self._btn('sts-perfbtn is-' + axis, 'perf-' + axis + '-' + h, self._t('aPerf'), '');
      if (axis === 'col') { b.style.left = (R + h * u / 2 - 22) + 'px'; b.style.top = R + 'px'; b.style.width = '44px'; b.style.height = st.rows * u + 'px'; }
      else { b.style.top = (R + h * u / 2 - 22) + 'px'; b.style.left = R + 'px'; b.style.height = '44px'; b.style.width = st.cols * u + 'px'; }
      b.tabIndex = -1; b.disabled = st.done;
      b.addEventListener('click', function () { self._toggle(axis, h); });
      el.appendChild(b);
    };
    st.colCuts.forEach(function (h) { perf('col', h); }); st.rowCuts.forEach(function (h) { perf('row', h); });
  },
  /* the count step: each stamp can be tapped to glow (a counting aid) */
  _stampTargets: function (el, rowY) {
    var st = this.st, g = this._g, self = this, u = g.u;
    for (var r = 0; r < st.rows; r++) for (var c = 0; c < st.cols; c++) (function (r, c) {
      var b = self._btn('sts-stampbtn', 'stamp-' + r + '-' + c, self._t('aStamp', { r: r + 1, c: c + 1 }), '');
      b.style.left = (g.R + c * u) + 'px'; b.style.top = rowY(r) + 'px'; b.style.width = u + 'px'; b.style.height = u + 'px';
      b.setAttribute('aria-pressed', String(!!self._view.glow[r + '-' + c])); b.disabled = st.done;
      b.addEventListener('click', function () { var k = r + '-' + c; self._view.glow[k] = !self._view.glow[k]; self.api.sound(self._view.glow[k] ? 700 : 520); self._paintSheet(); var nb = self._qs('[data-k="stamp-' + k + '"]'); if (nb) nb.focus(); });
      el.appendChild(b);
    })(r, c);
  },

  /* ---- the pick board: three finished sheets on the counter ---- */
  _pickCell: function () {
    var st = this.st, g = this._g, maxL = 0, maxR = 0, sumL = 0;
    st.sheets.forEach(function (s) { maxL = Math.max(maxL, s.cols); maxR = Math.max(maxR, s.rows); sumL += s.cols; });
    if (g.wide) return { s: Math.floor(Math.min(40, (g.W - 60) / 3 / maxL, 170 / maxR)), stack: false };
    var side = Math.floor((g.W - 52) / sumL);
    if (side >= 26) return { s: Math.min(34, side), stack: false };
    return { s: Math.floor(Math.min(g.cramp ? 21 : 28, ((g.W - 30) / 2 - 18) / maxL)), stack: true };
  },
  _sheetSvg: function (sh, s, col) {
    var w = sh.cols * s + 6, h = sh.rows * s + 6, o = '<svg width="' + w + '" height="' + h + '" aria-hidden="true"><rect x="1.5" y="1.5" width="' + (w - 3) + '" height="' + (h - 3) + '" rx="3" fill="' + this.PAPER + '" stroke="' + this.INK + '" stroke-width="2.5"/>';
    for (var r = 0; r < sh.rows; r++) for (var c = 0; c < sh.cols; c++) o += this._stampSvg(3 + c * s, 3 + r * s, s, col);
    return o + '</svg>';
  },
  _paintCounter: function () {
    var st = this.st, el = this._qs('.sts-sheetbox'), self = this, pc = this._pickCell(), col = this._colour();
    el.innerHTML = ''; el.style.width = ''; el.style.height = '';
    var row = this.api.el('div', 'sts-counter' + (pc.stack ? ' is-stack' : ''));
    st.sheets.forEach(function (sh, i) {
      var b = self._btn('sts-pickbtn' + (st.pick === i ? ' is-sel' : '') + (st.done && st.pick === i ? ' is-won' : ''), 'sheet-' + i, self._t('aSheetPick', { k: i + 1 }), self._sheetSvg(sh, pc.s, col));
      b.setAttribute('aria-pressed', String(st.pick === i)); b.disabled = st.done;
      b.addEventListener('click', function () { self._choose(i); });
      b.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); var j = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; var nb = self._qs('[data-k="sheet-' + j + '"]'); if (nb) nb.focus(); } });
      row.appendChild(b);
    });
    el.appendChild(row);
  },
  /* the card's album page: the card's rows × length; the chosen sheet's rows file into it */
  _pageEl: function () {
    var st = this.st, sh = st.sheets[st.pick], fit = StampSheetCore.pageFit(sh, st), g = this._g, s = g.wide ? 22 : g.cramp ? 12 : 16, lab = st.help ? 13 : 0, col = this._colour(), self = this;
    var maxL = Math.max(st.cols, sh.cols), W = lab + maxL * s + 12, H = lab + fit.length * s + 10 + (fit.some(function (f) { return f.state === 'extra'; }) ? 6 : 0);
    var o = '<svg width="' + W + '" height="' + H + '" aria-hidden="true"><rect x="' + (lab + 1) + '" y="' + (lab + 1) + '" width="' + (st.cols * s + 4) + '" height="' + (st.rows * s + 4) + '" rx="3" fill="#fff" stroke="' + this.INK + '" stroke-width="2"/>';
    fit.forEach(function (f) {
      var y = lab + 3 + f.r * s + (f.state === 'extra' ? 6 : 0);
      for (var c = 0; c < Math.max(f.have, f.slot); c++) {
        var x = lab + 3 + c * s + (f.state === 'extra' ? 8 : 0);
        if (c < f.have) o += c < f.slot ? self._stampSvg(x, y, s, col) : '<rect class="sts-over" x="' + (x + 1) + '" y="' + (y + 1) + '" width="' + (s - 2) + '" height="' + (s - 2) + '" rx="2" fill="' + self.CORAL + '" opacity=".75"/>';
        else o += '<rect class="sts-slot" x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (s - 4) + '" height="' + (s - 4) + '" fill="none" stroke="#9AA" stroke-width="1.5" stroke-dasharray="3 3"/>';
      }
    });
    if (st.help) { for (var c = 0; c < st.cols; c++) o += '<text class="sts-pnum" x="' + (lab + 3 + c * s + s / 2) + '" y="12" text-anchor="middle">' + (c + 1) + '</text>'; for (var r = 0; r < st.rows; r++) o += '<text class="sts-pnum" x="7" y="' + (lab + 3 + r * s + s / 2 + 4) + '" text-anchor="middle">' + (r + 1) + '</text>'; }
    var d = this.api.el('div', 'sts-page'); d.setAttribute('data-qa', 'page'); d.innerHTML = o + '</svg>';
    return d;
  },

  /* ---- the keypad (count step) and Check ---- */
  _paintKeys: function () {
    var st = this.st, g = this._g, self = this, under = this._qs('.sts-keysbox');
    under.innerHTML = ''; under.style.display = 'none';
    if (st.step !== 'count') return;
    /* wide: the typed number and the keys sit in the side column under the card (where the press stood);
       narrow: the typed number beside the card, the keys under the sheet */
    var side = this._qs('.sts-side'), shown = this.api.el('div', 'sts-typed'), box = under;
    shown.setAttribute('data-qa', 'typed'); shown.setAttribute('aria-live', 'polite'); shown.textContent = st.typed || '';
    if (g.wide) { box = this.api.el('div', 'sts-keysbox'); side.insertBefore(box, side.querySelector('.sts-album')); box.appendChild(shown); }
    else side.appendChild(shown);
    box.style.display = '';
    var keys = this.api.el('div', 'sts-keys');
    '1234567890'.split('').concat(['back']).forEach(function (d) {
      var b = self._btn('sts-key' + (d === 'back' ? ' is-back' : ''), 'key-' + d, d === 'back' ? self._t('aBack') : d, d === 'back' ? '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' : d);
      b.addEventListener('click', function () { self._type(d); });
      keys.appendChild(b);
    });
    box.appendChild(keys);
  },
  _paintCtrl: function () {
    var st = this.st, el = this._qs('.sts-ctrl'), self = this;
    el.innerHTML = '';
    var go = this._btn('sts-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = st.done; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { var v = this._view; v.note = ''; v.plateAt = null; v.page = false; this._paint(); },
  _toggle: function (axis, h) {
    var st = this.st, r = StampSheetCore.toggleCut(st, axis, h), v = this._view;
    if (!r) return;
    v.ghost = null; v.wheel[axis] = h; v.fresh = r === 'cut' ? axis + h : null;
    this.api.sound(r === 'cut' ? 880 : 330); this.api.announce(this._t(r === 'cut' ? 'anCut' : 'anHeal'));
    this._moved();
  },
  /* the nearest notch to a point along the rail */
  _notchAt: function (axis, clientPos) {
    var st = this.st, g = this._g, svg = this._qs('.sts-sheetsvg'); if (!svg) return 1;
    var b = svg.getBoundingClientRect(), n = axis === 'col' ? st.cols : st.rows, p = (axis === 'col' ? clientPos - b.left : clientPos - b.top) - g.R;
    return Math.max(1, Math.min(2 * n - 1, Math.round(p / (g.u / 2))));
  },
  _pressRail: function (e, axis) {
    var self = this, st = this.st, v = this._view, g = this._g;
    if (st.done || st.step !== 'cut') return;
    e.preventDefault(); this._endDrag();
    var pos = function (ev) { return axis === 'col' ? ev.clientX : ev.clientY; }, start = pos(e), moved = false, h = this._notchAt(axis, start);
    var direct = g.u / 2 >= 44;
    var mv = function (ev) {
      if (!moved && Math.abs(pos(ev) - start) < 6) return; ev.preventDefault(); moved = true;
      var nh = self._notchAt(axis, pos(ev)); if (nh !== h || !v.ghost) { h = nh; v.ghost = { axis: axis, h: h }; v.wheel[axis] = h; self.api.sound(1200, 0.02); self._paintSheet(); }
    };
    var up = function () {
      self._endDrag();
      if (moved || direct || (v.ghost && v.ghost.axis === axis && v.ghost.h === h)) { self._toggle(axis, h); return; }
      /* a small sheet on a phone: the first tap parks the wheel at the nearest notch, the second tap there runs it */
      v.ghost = { axis: axis, h: h }; v.wheel[axis] = h; self.api.sound(600); self._paintSheet();
      var b = self._qs('[data-k="rail-' + axis + '"]'); if (b) b.focus();
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _railKey: function (e, axis) {
    var st = this.st, v = this._view, n = axis === 'col' ? st.cols : st.rows, at = v.wheel[axis] || 1, prev = axis === 'col' ? 'ArrowLeft' : 'ArrowUp', next = axis === 'col' ? 'ArrowRight' : 'ArrowDown';
    if (e.key === prev || e.key === next) { e.preventDefault(); at = Math.max(1, Math.min(2 * n - 1, at + (e.key === next ? 1 : -1))); v.wheel[axis] = at; v.ghost = { axis: axis, h: at }; this.api.sound(1200, 0.02); this._paint(); return; }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._toggle(axis, v.wheel[axis] || 1); }
  },
  /* the plate: a tap lays it on the first square of the sheet; a drag slides it over the sheet, snapping to whole squares */
  _tapPlate: function () { var v = this._view; v.plateAt = v.plateAt ? null : { i: 0, j: 0 }; this.api.sound(500); this._paintSheet(); },
  _pressPlate: function (e) {
    var self = this, st = this.st, v = this._view, g = this._g, x0 = e.clientX, y0 = e.clientY, moved = false;
    if (st.done || st.step !== 'cut') return;
    e.preventDefault(); this._endDrag();
    var mv = function (ev) {
      if (!moved && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 6) return; ev.preventDefault(); moved = true;
      var svg = self._qs('.sts-sheetsvg'); if (!svg) return; var b = svg.getBoundingClientRect();
      var i = Math.floor((ev.clientX - b.left - g.R) / g.u), j = Math.floor((ev.clientY - b.top - g.R) / g.u);
      var at = i >= 0 && j >= 0 && i < st.cols && j < st.rows ? { i: i, j: j } : null;
      if (JSON.stringify(at) !== JSON.stringify(v.plateAt)) { v.plateAt = at; self._paintSheet(); }
    };
    var up = function () { self._endDrag(); if (!moved) { self._tapPlate(); return; } v.plateAt = null; self._paintSheet(); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _type: function (d) { if (StampSheetCore.type(this.st, d)) { this.api.sound(d === 'back' ? 360 : 520 + 20 * (+d || 0)); this._view.note = ''; this._paint(); } },
  _choose: function (i) { if (StampSheetCore.choose(this.st, i)) { this.api.sound(560); this._view.note = ''; this._view.page = false; this._paint(); } },

  /* ---------------- Check ---------------- */
  _check: function () {
    var st = this.st, v = this._view, C = StampSheetCore; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    v.ghost = null; v.plateAt = null;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'grid') { v.note = this._t('noteGrid'); v.soft = true; v.show = 0; this.api.sound(988); this._paint(); this.api.announce(v.note + ' ' + this._t('qCount')); var k1 = this._qs('[data-k="key-1"]'); if (k1) k1.focus(); return; }
    if (res.result === 'ok') { this._success(); return; }
    v.soft = false;
    if (res.step === 'cut') { v.note = this._t(C.hint(st)); if (!st.help && st.board === 'numbers') v.note += ' ' + this._t('hintPieces', this._args()); this.api.sound(180); }
    else if (res.step === 'count') { v.show = st.chelp ? 2 : 1; v.note = this._t(C.hint(st)); this.api.sound(240); }
    else { v.page = true; v.note = this._t(C.hint(st)); this.api.sound(240); }
    this._paint(); this.api.announce(v.note);
  },
  _okLine: function () {
    var st = this.st, a = this._args(), c = st.board === 'plate' ? 'rowsOf' : this._card();
    return this._t(c === 'add' ? 'okAdd' : c === 'mul' ? 'okMul' : 'okRowsOf', a);
  },
  _success: function () {
    var st = this.st, v = this._view, msg = this._okLine();
    v.note = ''; v.show = 0; v.tear = true; v.page = false; this.album++;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectStampSheetCSS() {
  if (typeof document === 'undefined' || document.getElementById('sts-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sts-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .sts-wrap:focus{outline:none;}'
  + '.sts-main{display:flex;gap:18px;justify-content:center;align-items:flex-start;width:100%;} .sts-wrap.is-wide .sts-sheetbox{order:-1;} .sts-wrap.is-narrow .sts-main,.sts-wrap.is-pick .sts-main{flex-direction:column;align-items:center;gap:10px;} .sts-wrap.is-pick.is-wide .sts-sheetbox{order:0;}'
  + '.sts-side{display:flex;flex-direction:column;align-items:center;gap:10px;} .sts-wrap.is-narrow .sts-side,.sts-wrap.is-pick .sts-side{flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;}'
  + '.sts-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:150px;min-height:96px;padding:10px 14px;border-radius:10px;background:#FFFDF6;box-shadow:0 0 0 3px #F2784B,0 0 0 6px #FFFDF6,0 0 0 8px rgba(242,120,75,.35),0 4px 10px rgba(0,0,0,.12);}'
  + '.sts-cbig{font:800 30px/1.1 ' + H + ';color:' + INK + ';text-align:center;max-width:100%;} .sts-cbig.is-math{white-space:nowrap;} .sts-cbig.is-long{font-size:24px;} .sts-wrap.is-narrow .sts-cbig{font-size:26px;} .sts-wrap.is-cramp .sts-cbig{font-size:22px;}'
  + '.sts-csmall{display:flex;flex-direction:column;align-items:flex-start;gap:3px;font:700 15px/1.1 ' + B + ';color:#146B5E;} .sts-cline{display:flex;align-items:center;gap:6px;} .sts-ic{display:block;flex:none;}'
  + '.sts-press{display:flex;justify-content:center;} .sts-platebtn{padding:4px;border:0;border-radius:12px;background:none;cursor:grab;touch-action:none;min-width:44px;min-height:44px;} .sts-platebtn:focus-visible{outline:3px solid #146B5E;} .sts-platebtn:disabled{opacity:.5;cursor:default;}'
  + '.sts-album{display:flex;justify-content:center;} .sts-postmark{opacity:0;} .sts-postmark.is-on{animation:stsPost .5s ease .35s forwards;} @keyframes stsPost{0%{opacity:0;transform:scale(1.6)}100%{opacity:1;transform:scale(1)}}'
  + '.sts-sheetbox{position:relative;flex:none;} .sts-sheetsvg{display:block;overflow:visible;}'
  + '.sts-rail{position:absolute;padding:0;border:0;background:none;cursor:pointer;touch-action:none;} .sts-rail:focus-visible{outline:3px solid #146B5E;outline-offset:-2px;border-radius:8px;}'
  + '.sts-perfbtn{position:absolute;padding:0;border:0;background:none;cursor:pointer;}'
  + '.sts-stampbtn{position:absolute;padding:0;border:0;background:none;cursor:pointer;border-radius:4px;} .sts-stampbtn:focus-visible{outline:3px solid #146B5E;outline-offset:-3px;}'
  + '.sts-perf.is-fresh.is-col{transform-box:fill-box;transform-origin:50% 0;animation:stsZipY .3s ease-out;} .sts-perf.is-fresh.is-row{transform-box:fill-box;transform-origin:0 50%;animation:stsZipX .3s ease-out;} @keyframes stsZipY{from{transform:scaleY(0)}} @keyframes stsZipX{from{transform:scaleX(0)}}'
  + '.sts-wheel.is-ghost{filter:drop-shadow(0 0 4px #F2784B);}'
  + '.sts-stamp.is-glow{transform-box:fill-box;transform-origin:center;transform:translateY(-2px);filter:drop-shadow(0 0 5px #E9B949);}'
  + '.sts-stamp.is-lit{animation:stsLit .5s ease both;} @keyframes stsLit{0%{opacity:.35}50%{filter:drop-shadow(0 0 7px #E9B949)}100%{opacity:1}}'
  + '.sts-stamp.is-tear{animation:stsTear .5s ease both;} @keyframes stsTear{0%{transform:translateX(0);opacity:1}100%{transform:translateX(14px);opacity:.55}}'
  + '.sts-run{font:800 18px ' + H + ';fill:#146B5E;}'
  + '.sts-counter{display:flex;gap:14px;justify-content:center;align-items:flex-start;flex-wrap:nowrap;} .sts-counter.is-stack{flex-wrap:wrap;gap:8px;max-width:100%;}'
  + '.sts-pickbtn{display:flex;align-items:center;justify-content:center;padding:6px;min-width:44px;min-height:44px;border:0;border-radius:12px;background:#F3E7CF;box-shadow:inset 0 0 0 2px #E2D4B4;cursor:pointer;transition:transform .15s ease;} .sts-pickbtn.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #F2784B,0 8px 12px rgba(0,0,0,.18);} .sts-pickbtn:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .sts-pickbtn.is-won{box-shadow:inset 0 0 0 3px #146B5E,0 8px 12px rgba(0,0,0,.18);}'
  + '.sts-page{display:flex;justify-content:center;padding:6px;border-radius:10px;background:#F6EBD3;box-shadow:inset 0 0 0 2px #E2D4B4;} .sts-pnum{font:800 12px ' + H + ';fill:#146B5E;}'
  + '.sts-keysbox{display:flex;flex-direction:column;align-items:center;gap:6px;} .sts-typed{min-width:96px;min-height:52px;padding:2px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #146B5E;font:800 34px/48px ' + H + ';color:' + INK + ';text-align:center;}'
  + '.sts-keys{display:grid;grid-template-columns:repeat(6,48px);gap:6px;} .sts-wrap.is-wide .sts-keys{grid-template-columns:repeat(4,46px);} .sts-wrap.is-narrow .sts-key{height:44px;} .sts-wrap.is-narrow .sts-typed{min-height:44px;line-height:40px;font-size:30px;} .sts-key{min-width:44px;height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CFC3A6,0 3px 0 #CFC3A6;font:800 24px ' + H + ';color:' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;} .sts-key:focus-visible{outline:3px solid #146B5E;} .sts-wrap.is-cramp .sts-keys{grid-template-columns:repeat(6,44px);gap:4px;}'
  + '.sts-note{margin:0;min-height:1.3em;max-width:600px;font-family:' + B + ';font-weight:700;font-size:17px;color:#146B5E;text-align:center;} .sts-note.is-hint{color:#A3401F;} .sts-note:empty{display:none;} .sts-wrap.is-narrow .sts-note{font-size:16px;} .sts-wrap.is-done .sts-ctrl{display:none;}'
  + '.sts-ctrl{display:flex;justify-content:center;} .sts-go{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 26px;border:0;border-radius:14px;background:#146B5E;color:#fff;font:800 20px ' + H + ';box-shadow:0 4px 0 #0E4C43;cursor:pointer;} .sts-go svg{width:22px;height:22px;} .sts-go:disabled{opacity:.45;cursor:default;} .sts-go:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '.sts-wrap.is-cramp{gap:6px;} .sts-wrap.is-cramp .sts-main{gap:6px;} .sts-wrap.is-narrow .sts-card{min-width:110px;min-height:0;padding:5px 9px;gap:2px;} .sts-wrap.is-narrow .sts-csmall{font-size:13px;gap:1px;} .sts-wrap.is-cramp .sts-card{padding:4px 7px;} .sts-wrap.is-cramp .sts-csmall{flex-direction:row;flex-wrap:wrap;gap:2px 8px;justify-content:center;}'
  + '.sts-wrap.is-narrow .sts-note{font-size:15px;line-height:1.25;} .sts-wrap.is-cramp .sts-note{font-size:14px;} .sts-wrap.is-cramp .sts-press svg{width:72px;height:46px;}'
  + '@media (prefers-reduced-motion:reduce){.sts-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'sts-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.StampSheetActivity = StampSheetActivity;
