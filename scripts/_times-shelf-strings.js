/* =====================================================================
   _times-shelf-strings.js — TOOL #47's authored strings, 38 keys x 11
   locales. THE SOURCE OF TRUTH; `apply-times-shelf-locales.js` writes
   it into the tool and refuses anything that breaks a content ban.

   ⭐ EVERY LOCALE WAS REBUILT BY A THREE-PERSON NATIVE PANEL, NEVER
   TRANSLATED — and every panel was handed the English as a SOURCE TO
   AUDIT rather than a target. Between them they found fifteen real
   defects that no gate in this suite could see, including four that
   were in the MODEL rather than the copy:

     · `famLocked` named the WRONG DIRECTION, in the only state it can
       ever render (5 panels, independently).
     · the four family buttons dropped `is-away` and reported
       `aria-pressed="false"` at the exact instant all four families
       were away, because the away-state was read off `canPutBack`
       rather than `st.off[k]` (4 panels).
     · `saidCardOne` announced "nowhere else on the shelf" about a card
       its own `cardDouble` label called "holding two" (4 panels) —
       fixed with the new `saidCardDouble` below.
     · Ctrl+P printed a BLANK PAGE for everybody, because the print
       block revealed a sheet that only existed after the chip was
       pressed (the Finnish panel, reading the print path).

   ⚠ AND TWO DEFECTS IN THE BAN FILE ITSELF, both found by RUNNING it:
   the Scandinavian definite suffix defeated every whole-word ban
   (`diplomet`, `pointene`, `kvadrattallet` all passed), and the English
   list bled into every locale — where `timer` is the Norwegian and
   Danish plural of *hour*.

   ⚠ ONE CLAIM WAS REFUTED BY MEASUREMENT. Four panels independently
   reported that `saidHead` over-reports after STACK. It does not: the
   announced sequence is exactly the standing cross's products, because
   the cross always retains one of each pair. The Spanish panel checked
   and agreed with the measurement. AGREEMENT BETWEEN PANELS IS NOT
   INDEPENDENT CONFIRMATION — they read the same file and can share a
   premise.

   ⚠ THE LEADING SPACE IN `shelfStacked` IS LOAD-BEARING. `_sceneText`
   concatenates it straight onto `shelfLabel`. Every panel flagged it;
   one `.trim()` anywhere ships two sentences run together.
   ===================================================================== */
'use strict';

module.exports = {
  title: {
    en: "The Times Shelf",
    de: "Der Setzkasten",
    fr: "Le casier des tables",
    es: "La repisa de las tablas",
    pt: "A estante da tabuada",
    it: "Lo scaffale delle tabelline",
    nl: "De Tafelkast",
    sv: "Tabellhyllan",
    da: "Tabelreolen",
    no: "Tabellreolen",
    fi: "Kertotaulukortisto"
  },
  instruction: {
    en: "Put away the cards the class already knows, and see what is really left to learn.",
    de: "Räumt die Kärtchen weg, die die Klasse längst kann — und seht, was wirklich noch zu lernen bleibt.",
    fr: "Un casier plein de cartes. Rangez celles que la classe connaît déjà, et voyez ce qu’il reste vraiment à apprendre.",
    es: "Retiren las cartas que la clase ya se sabe y vean lo que de verdad falta por aprender.",
    pt: "A estante começa cheia. Recolha as plaquinhas que a turma já sabe e veja o que sobra, de verdade, para aprender.",
    it: "La tavola pitagorica al completo. Metti da parte quello che la classe sa già e guarda che cosa resta davvero da imparare.",
    nl: "Zet weg wat de klas al kent, en zie welke keersommen er echt overblijven om te leren.",
    sv: "Lägg undan korten som klassen redan kan — då syns det vad som egentligen är kvar att lära sig.",
    da: "Hele den lille tabel ligger fremme. Læg det væk, som klassen kan i forvejen, og se, hvad der egentlig er tilbage at lære.",
    no: "Hele gangetabellen ligger framme. Legg bort de tabellene klassen kan fra før, og se hva som egentlig står igjen å lære.",
    fi: "Kortisto on täynnä kortteja. Pane sivuun ne, jotka luokka jo osaa, ja katso, mitä on oikeasti vielä opeteltavana."
  },
  shelfLabel: {
    en: "Shelf. Rows and columns: {list}.",
    de: "Setzkasten. Zeilen und Spalten: {list}.",
    fr: "Le casier. Lignes et colonnes : {list}.",
    es: "La repisa. Filas y columnas: {list}.",
    pt: "Estante. Linhas e colunas: {list}.",
    it: "Scaffale. Righe e colonne: {list}.",
    nl: "De kast. Rijen en kolommen: {list}.",
    sv: "Hyllan. Rader och kolumner: {list}.",
    da: "Reolen. Rækker og kolonner: {list}.",
    no: "Reolen. Rader og kolonner: {list}.",
    fi: "Kortisto. Rivit ja sarakkeet: {list}."
  },
  shelfStacked: {
    en: " Every card below the diagonal is put away; the cards whose partner went now hold two.",
    de: " Jedes Kärtchen unterhalb der Diagonale ist weggeräumt; die Kärtchen, deren Partner weggeräumt wurde, tragen jetzt zwei.",
    fr: " Toutes les cartes sous la diagonale sont rangées ; celles qui gardent ces nombres en portent deux maintenant.",
    es: " Todas las cartas debajo de la diagonal están retiradas; las cartas que se quedan con esos números ahora sostienen dos.",
    pt: " Todas as plaquinhas abaixo da diagonal foram recolhidas; as que ficaram com esses números agora seguram outra embaixo.",
    it: " Le carte sotto la diagonale sono da parte; quelle che conservano quei numeri adesso tengono due carte.",
    nl: " Elke kaart onder de diagonaal is weggezet; waar dat getal blijft staan, liggen nu twee kaarten.",
    sv: " Varje kort under diagonalen är undanlagt. På platserna som har kvar de talen ligger nu två kort.",
    da: " Alle fliser under diagonalen er lagt væk; hvert af de tal står nu kun ét sted, og dér ligger to fliser oven på hinanden.",
    no: " Alle kort under diagonalen er lagt bort; kortene som beholder de tallene, holder nå to.",
    fi: " Kaikki lävistäjän alapuoliset kortit on pantu sivuun; niiden luvut ovat jäljellä toisella puolella, ja niissä paikoissa on kortin alla toinen kortti."
  },
  addr: {
    en: "row {r}, column {c}",
    de: "Zeile {r}, Spalte {c}",
    fr: "ligne {r}, colonne {c}",
    es: "fila {r}, columna {c}",
    pt: "linha {r}, coluna {c}",
    it: "riga {r}, colonna {c}",
    nl: "rij {r}, kolom {c}",
    sv: "rad {r}, kolumn {c}",
    da: "række {r}, kolonne {c}",
    no: "rad {r}, kolonne {c}",
    fi: "rivillä {r}, sarakkeessa {c}"
  },
  cardLabel: {
    en: "{p}, row {r}, column {c}",
    de: "{p}, Zeile {r}, Spalte {c}",
    fr: "{p}, ligne {r}, colonne {c}",
    es: "{p}, fila {r}, columna {c}",
    pt: "{p}, linha {r}, coluna {c}",
    it: "{p}, riga {r}, colonna {c}",
    nl: "{p}, rij {r}, kolom {c}",
    sv: "{p}, rad {r}, kolumn {c}",
    da: "{p}, række {r}, kolonne {c}",
    no: "{p}, rad {r}, kolonne {c}",
    fi: "{p}, rivillä {r}, sarakkeessa {c}"
  },
  cardDouble: {
    en: "{p}, row {r}, column {c}, holding two cards",
    de: "{p}, Zeile {r}, Spalte {c}, trägt zwei Kärtchen",
    fr: "{p}, ligne {r}, colonne {c}, cette carte en porte deux",
    es: "{p}, fila {r}, columna {c}, sostiene dos cartas",
    pt: "{p}, linha {r}, coluna {c}, segurando outra embaixo",
    it: "{p}, riga {r}, colonna {c}, tiene due carte",
    nl: "{p}, rij {r}, kolom {c}, met twee kaarten",
    sv: "{p}, rad {r}, kolumn {c}, två kort på samma plats",
    da: "{p}, række {r}, kolonne {c}, to fliser oven på hinanden",
    no: "{p}, rad {r}, kolonne {c}, holder to kort",
    fi: "{p}, rivillä {r}, sarakkeessa {c}, alla toinen kortti"
  },
  seatLabel: {
    en: "Empty seat. The number {p} stands at row {c}, column {r}.",
    de: "Leeres Fach. Die {p}, die hier saß, steht in Zeile {c}, Spalte {r}.",
    fr: "Place vide. Le {p} qui était ici se trouve ligne {c}, colonne {r}.",
    es: "Lugar vacío. El {p} que estaba aquí está en la fila {c}, columna {r}.",
    pt: "Lugar vazio. O {p} que ficava aqui está na linha {c}, coluna {r}.",
    it: "Posto vuoto. La carta {p} che stava qui è in riga {c}, colonna {r}.",
    nl: "Lege plek. Het getal {p} staat op rij {c}, kolom {r}.",
    sv: "Tom plats. Talet {p} som stod här finns kvar på rad {c}, kolumn {r}.",
    da: "Tom plads. Flisen med {p}, der lå her, ligger nu i række {c}, kolonne {r}.",
    no: "Tom plass. {p}-kortet som stod her, står nå i rad {c}, kolonne {r}.",
    fi: "Tyhjä paikka. Tässä ollut {p} on rivillä {c}, sarakkeessa {r}."
  },
  rowHead: {
    en: "Row {k}", de: "Zeile {k}", fr: "Ligne {k}", es: "Fila {k}", pt: "Linha {k}",
    it: "Riga {k}", nl: "Rij {k}", sv: "Rad {k}", da: "Række {k}", no: "Rad {k}", fi: "Rivi {k}"
  },
  colHead: {
    en: "Column {k}", de: "Spalte {k}", fr: "Colonne {k}", es: "Columna {k}", pt: "Coluna {k}",
    it: "Colonna {k}", nl: "Kolom {k}", sv: "Kolumn {k}", da: "Kolonne {k}", no: "Kolonne {k}", fi: "Sarake {k}"
  },
  cornerLabel: {
    en: "The shelf. The row numerals down the left, the column numerals across the top.",
    de: "Der Setzkasten. Die Zeilen stehen links, die Spalten oben.",
    fr: "Le casier. Les lignes à gauche, les colonnes en haut.",
    es: "La repisa. Las filas por la izquierda, las columnas por arriba.",
    pt: "A estante. As linhas ficam na lateral esquerda e as colunas, na parte de cima.",
    it: "Lo scaffale. Le righe a sinistra, le colonne in alto.",
    nl: "De kast. De rijen staan links, de kolommen bovenaan.",
    sv: "Hyllan. Radernas tal står till vänster, kolumnernas tal överst.",
    da: "Reolen. Rækker ned ad venstre side, kolonner hen over toppen.",
    no: "Reolen. Radene nedover til venstre, kolonnene bortover øverst.",
    fi: "Kortisto. Rivit vasemmassa laidassa, sarakkeet ylälaidassa."
  },
  famAway: {
    en: "Put away the {k} row and the {k} column",
    de: "Zeile {k} und Spalte {k} wegräumen",
    fr: "Ranger la ligne {k} et la colonne {k}",
    es: "Retirar la fila del {k} y la columna del {k}",
    pt: "Recolher a linha do {k} e a coluna do {k}",
    it: "Metti da parte la riga {k} e la colonna {k}",
    nl: "Rij {k} en kolom {k} wegzetten",
    sv: "Lägg undan rad {k} och kolumn {k}",
    da: "Læg {k}-rækken og {k}-kolonnen væk",
    no: "Legg bort rad {k} og kolonne {k}",
    fi: "Pane sivuun rivi {k} ja sarake {k}"
  },
  famBack: {
    en: "Put back the {k} row and the {k} column",
    de: "Zeile {k} und Spalte {k} zurückstellen",
    fr: "Remettre la ligne {k} et la colonne {k}",
    es: "Regresar la fila del {k} y la columna del {k}",
    pt: "Devolver a linha do {k} e a coluna do {k}",
    it: "Rimetti la riga {k} e la colonna {k}",
    nl: "Rij {k} en kolom {k} terugzetten",
    sv: "Lägg tillbaka rad {k} och kolumn {k}",
    da: "Sæt {k}-rækken og {k}-kolonnen tilbage",
    no: "Legg tilbake rad {k} og kolonne {k}",
    fi: "Ota takaisin rivi {k} ja sarake {k}"
  },
  famLocked: {
    en: "The {k} row and the {k} column are put away — put back the cards below the diagonal first",
    de: "Zeile {k} und Spalte {k} sind weggeräumt — stellt zuerst die doppelt belegten Kärtchen zurück",
    fr: "Ligne {k} et colonne {k} — remettre d’abord les cartes rangées sous la diagonale",
    es: "La fila del {k} y la columna del {k} están retiradas. Primero hay que regresar las cartas apiladas.",
    pt: "Devolver a linha do {k} e a coluna do {k} — primeiro devolva as plaquinhas empilhadas",
    it: "La riga {k} e la colonna {k} sono già da parte: rimetti prima le carte sotto la diagonale",
    nl: "Rij {k} en kolom {k} terugzetten — zet eerst de kaarten onder de diagonaal terug",
    sv: "Rad {k} och kolumn {k} är undanlagda — lägg tillbaka korten under diagonalen först",
    da: "{k}-rækken og {k}-kolonnen er lagt væk — hent først fliserne under diagonalen tilbage",
    no: "Legg tilbake rad {k} og kolonne {k} – legg først tilbake kortene under diagonalen",
    fi: "Rivi {k} ja sarake {k} — ota ensin päällekkäiset kortit takaisin"
  },
  stackBtn: {
    en: "Put away every card below the diagonal",
    de: "Jedes Kärtchen unterhalb der Diagonale wegräumen",
    fr: "Ranger toutes les cartes sous la diagonale",
    es: "Retirar todas las cartas debajo de la diagonal",
    pt: "Recolher todas as plaquinhas abaixo da diagonal",
    it: "Metti da parte tutte le carte sotto la diagonale",
    nl: "Elke kaart onder de diagonaal wegzetten",
    sv: "Lägg undan varje kort under diagonalen",
    da: "Læg alle fliser under diagonalen væk",
    no: "Legg bort alle kort under diagonalen",
    fi: "Pane sivuun kaikki lävistäjän alapuoliset kortit"
  },
  unstackBtn: {
    en: "Put back the cards below the diagonal",
    de: "Die Kärtchen unterhalb der Diagonale zurückstellen",
    fr: "Remettre les cartes sous la diagonale",
    es: "Regresar las cartas de debajo de la diagonal",
    pt: "Devolver as plaquinhas abaixo da diagonal",
    it: "Rimetti le carte sotto la diagonale",
    nl: "De kaarten onder de diagonaal terugzetten",
    sv: "Lägg tillbaka korten under diagonalen",
    da: "Hent fliserne under diagonalen tilbage",
    no: "Legg tilbake kortene under diagonalen",
    fi: "Ota takaisin lävistäjän alapuoliset kortit"
  },
  stackLocked: {
    en: "Put away every card below the diagonal — put away the 1, the 2, the 5 and the 10 first",
    de: "Jedes Kärtchen unterhalb der Diagonale wegräumen — räumt zuerst die 1, die 2, die 5 und die 10 weg",
    fr: "Ranger toutes les cartes sous la diagonale — ranger d’abord le 1, le 2, le 5 et le 10",
    es: "Retirar todas las cartas debajo de la diagonal: primero hay que retirar el 1, el 2, el 5 y el 10",
    pt: "Recolher todas as plaquinhas abaixo da diagonal — primeiro recolha o 1, o 2, o 5 e o 10",
    it: "Metti da parte tutte le carte sotto la diagonale: prima metti da parte l’1, il 2, il 5 e il 10",
    nl: "Elke kaart onder de diagonaal wegzetten — zet eerst rij en kolom 1, 2, 5 en 10 weg",
    sv: "Lägg undan varje kort under diagonalen — lägg undan 1, 2, 5 och 10 först",
    da: "Læg alle fliser under diagonalen væk — læg først 1, 2, 5 og 10 væk",
    no: "Legg bort alle kort under diagonalen – legg først bort 1, 2, 5 og 10",
    fi: "Pane sivuun kaikki lävistäjän alapuoliset kortit — pane ensin sivuun 1, 2, 5 ja 10"
  },
  restoreBtn: {
    en: "Put it all back",
    de: "Alles zurückstellen",
    fr: "Tout remettre en place",
    es: "Regresar todo a la repisa",
    pt: "Devolver tudo para a estante",
    it: "Rimetti tutto",
    nl: "Alles terugzetten",
    sv: "Lägg tillbaka allt",
    da: "Sæt det hele tilbage",
    no: "Legg alt tilbake",
    fi: "Ota kaikki takaisin"
  },
  restoreLocked: {
    en: "Put it all back — nothing has been put away yet",
    de: "Alles zurückstellen — es ist noch nichts weggeräumt",
    fr: "Tout remettre en place — rien n’a encore été rangé",
    es: "Regresar todo a la repisa: todavía no se ha retirado nada",
    pt: "Devolver tudo para a estante — ainda não foi recolhido nada",
    it: "Rimetti tutto: non hai ancora messo da parte niente",
    nl: "Alles terugzetten — er is nog niets weggezet",
    sv: "Lägg tillbaka allt — inget är undanlagt än",
    da: "Sæt det hele tilbage — der er ikke lagt noget væk endnu",
    no: "Legg alt tilbake – ingenting er lagt bort ennå",
    fi: "Ota kaikki takaisin — mitään ei ole vielä pantu sivuun"
  },
  printBtn: {
    en: "Print the shelf and the study list",
    de: "Den Setzkasten und die Lernliste drucken",
    fr: "Imprimer le casier et la liste à apprendre",
    es: "Imprimir la repisa y la lista de estudio",
    pt: "Imprimir a estante e a lista de estudo",
    it: "Stampa lo scaffale e l’elenco da studiare",
    nl: "De kast en de oefenlijst afdrukken",
    sv: "Skriv ut hyllan och listan",
    da: "Print reolen og listen over de stykker, der står tilbage",
    no: "Skriv ut reolen og lista over det som står igjen",
    fi: "Tulosta kortisto ja opeteltavat laskut"
  },
  printLocked: {
    en: "Print the shelf and the study list — part of the Teacher plan",
    de: "Den Setzkasten und die Lernliste drucken — gehört zum Lehrkraft-Abo",
    fr: "Imprimer le casier et la liste à apprendre — fait partie de l’offre Enseignant",
    es: "Imprimir la repisa y la lista de estudio: es parte del plan Docente",
    pt: "Imprimir a estante e a lista de estudo — faz parte do plano Professor",
    it: "Stampa lo scaffale e l’elenco da studiare — fa parte del piano Insegnante",
    nl: "De kast en de oefenlijst afdrukken — onderdeel van het Leerkracht-pakket",
    sv: "Skriv ut hyllan och listan — ingår i Lärarplanen",
    da: "Print reolen og listen over de stykker, der står tilbage — hører til Lærerabonnementet",
    no: "Skriv ut reolen og lista over det som står igjen – en del av Lærer-abonnementet",
    fi: "Tulosta kortisto ja opeteltavat laskut — kuuluu Opettaja-tilaukseen"
  },
  saidAway: {
    en: "The {k} row and the {k} column are put away. Rows and columns: {list}.",
    de: "Zeile {k} und Spalte {k} weggeräumt. Zeilen und Spalten: {list}.",
    fr: "La ligne {k} et la colonne {k} sont rangées. Lignes et colonnes : {list}.",
    es: "Se retiraron la fila del {k} y la columna del {k}. Filas y columnas: {list}.",
    pt: "A linha do {k} e a coluna do {k} foram recolhidas. Linhas e colunas: {list}.",
    it: "Riga {k} e colonna {k} messe da parte. Righe e colonne: {list}.",
    nl: "Rij {k} en kolom {k} zijn weggezet. Rijen en kolommen: {list}.",
    sv: "Rad {k} och kolumn {k} är undanlagda. Rader och kolumner: {list}.",
    da: "{k}-rækken og {k}-kolonnen er lagt væk. Rækker og kolonner: {list}.",
    no: "Rad {k} og kolonne {k} er lagt bort. Rader og kolonner: {list}.",
    fi: "Rivi {k} ja sarake {k} pantiin sivuun. Rivit ja sarakkeet: {list}."
  },
  saidBack: {
    en: "The {k} row and the {k} column are back. Rows and columns: {list}.",
    de: "Zeile {k} und Spalte {k} zurückgestellt. Zeilen und Spalten: {list}.",
    fr: "La ligne {k} et la colonne {k} sont revenues. Lignes et colonnes : {list}.",
    es: "Regresaron la fila del {k} y la columna del {k}. Filas y columnas: {list}.",
    pt: "A linha do {k} e a coluna do {k} voltaram. Linhas e colunas: {list}.",
    it: "Riga {k} e colonna {k} rimesse sullo scaffale. Righe e colonne: {list}.",
    nl: "Rij {k} en kolom {k} staan er weer. Rijen en kolommen: {list}.",
    sv: "Rad {k} och kolumn {k} är tillbaka. Rader och kolumner: {list}.",
    da: "{k}-rækken og {k}-kolonnen er sat tilbage. Rækker og kolonner: {list}.",
    no: "Rad {k} og kolonne {k} er lagt tilbake. Rader og kolonner: {list}.",
    fi: "Rivi {k} ja sarake {k} otettiin takaisin. Rivit ja sarakkeet: {list}."
  },
  saidStack: {
    en: "Every card below the diagonal is put away; the cards whose partner went now hold two.",
    de: "Doppelt belegt. Jedes Kärtchen unterhalb der Diagonale ist weggeräumt; die Kärtchen, deren Partner weggeräumt wurde, tragen jetzt zwei.",
    fr: "Toutes les cartes sous la diagonale sont rangées ; celles qui gardent ces nombres en portent deux maintenant.",
    es: "Apiladas. Todas las cartas debajo de la diagonal están retiradas; las cartas que se quedan con esos números ahora sostienen dos.",
    pt: "Empilhadas. Todas as plaquinhas abaixo da diagonal foram recolhidas; as que ficaram com esses números agora seguram outra embaixo.",
    it: "Le carte sotto la diagonale sono da parte; quelle che conservano quei numeri adesso tengono due carte.",
    nl: "Elke kaart onder de diagonaal is weggezet; waar dat getal blijft staan, liggen nu twee kaarten.",
    sv: "Korten under diagonalen är undanlagda. På platserna som har kvar de talen ligger nu två kort.",
    da: "Stablet. Alle fliser under diagonalen er lagt væk; hvert af de tal står nu kun ét sted, og dér ligger to fliser oven på hinanden.",
    no: "Alle kort under diagonalen er lagt bort. Kortene som beholder de tallene, holder nå to.",
    fi: "Kortit pinottiin. Kaikki lävistäjän alapuoliset kortit on pantu sivuun; niiden luvut ovat jäljellä toisella puolella, ja niissä paikoissa on kortin alla toinen kortti."
  },
  saidUnstack: {
    en: "The cards below the diagonal are back.",
    de: "Die Kärtchen unterhalb der Diagonale stehen wieder da.",
    fr: "Toutes les cartes sous la diagonale sont revenues.",
    es: "Regresaron todas las cartas de debajo de la diagonal.",
    pt: "Todas as plaquinhas abaixo da diagonal voltaram.",
    it: "Le carte sotto la diagonale sono tornate.",
    nl: "De kaarten onder de diagonaal staan er weer.",
    sv: "Korten under diagonalen är tillbaka.",
    da: "Alle fliser under diagonalen er tilbage.",
    no: "Alle kort under diagonalen er tilbake.",
    fi: "Lävistäjän alapuoliset kortit ovat taas paikoillaan."
  },
  saidRestore: {
    en: "Everything is back. Rows and columns: {list}.",
    de: "Alles steht wieder da. Zeilen und Spalten: {list}.",
    fr: "Tout est revenu en place. Lignes et colonnes : {list}.",
    es: "Está todo de vuelta en la repisa. Filas y columnas: {list}.",
    pt: "Tudo voltou para a estante. Linhas e colunas: {list}.",
    it: "È tornato tutto. Righe e colonne: {list}.",
    nl: "Alles staat er weer. Rijen en kolommen: {list}.",
    sv: "Allt är tillbaka. Rader och kolumner: {list}.",
    da: "Det hele er tilbage. Rækker og kolonner: {list}.",
    no: "Alt er tilbake. Rader og kolonner: {list}.",
    fi: "Kaikki on taas paikoillaan. Rivit ja sarakkeet: {list}."
  },
  saidCardOne: {
    en: "{p}, row {r}, column {c}. The only {p} standing on the shelf.",
    de: "{p}, Zeile {r}, Spalte {c}. Die einzige {p}, die im Setzkasten steht.",
    fr: "{p}, ligne {r}, colonne {c}. Le seul {p} encore en place dans le casier.",
    es: "{p}, fila {r}, columna {c}. En ningún otro lugar de la repisa.",
    pt: "{p}, linha {r}, coluna {c}. Em nenhum outro lugar da estante.",
    it: "{p}, riga {r}, colonna {c}. È l’unica carta {p} in piedi sullo scaffale.",
    nl: "{p}, rij {r}, kolom {c}. Nergens anders in de kast.",
    sv: "{p}, rad {r}, kolumn {c}. Ingen annanstans på hyllan.",
    da: "{p}, række {r}, kolonne {c}. Ingen andre steder i reolen.",
    no: "{p}, rad {r}, kolonne {c}. Tallet står ikke noe annet sted i reolen.",
    fi: "{p}, rivillä {r}, sarakkeessa {c}. Ei missään muualla kortistossa."
  },
  saidCardDouble: {
    en: "{p}, row {r}, column {c}. This card holds two: it also answers to row {c}, column {r}.",
    de: "{p}, Zeile {r}, Spalte {c}. Dieses Kärtchen trägt zwei: Die {p} steht auch in Zeile {c}, Spalte {r}.",
    fr: "{p}, ligne {r}, colonne {c}. Cette carte en porte deux : ce nombre est aussi ligne {c}, colonne {r}.",
    es: "{p}, fila {r}, columna {c}. Esta carta sostiene dos: el {p} también está en la fila {c}, columna {r}.",
    pt: "{p}, linha {r}, coluna {c}. Esta plaquinha segura outra embaixo: ela responde também pela linha {c}, coluna {r}.",
    it: "{p}, riga {r}, colonna {c}. Questa carta ne tiene due: risponde anche a riga {c}, colonna {r}.",
    nl: "{p}, rij {r}, kolom {c}. Hier liggen twee kaarten: dit getal staat ook op rij {c}, kolom {r}.",
    sv: "{p}, rad {r}, kolumn {c}. Här ligger två kort: talet står också för rad {c}, kolumn {r}.",
    da: "{p}, række {r}, kolonne {c}. To fliser oven på hinanden: flisen gælder også for række {c}, kolonne {r}.",
    no: "{p}, rad {r}, kolonne {c}. Dette kortet holder to: tallet står også i rad {c}, kolonne {r}.",
    fi: "{p}, rivillä {r}, sarakkeessa {c}. Tämän kortin alla on toinen: sama luku on myös rivillä {c}, sarakkeessa {r}."
  },
  saidCardMore: {
    en: "{p}, row {r}, column {c}. {p} is also at {places}.",
    de: "{p}, Zeile {r}, Spalte {c}. Die {p} steht auch in {places}.",
    fr: "{p}, ligne {r}, colonne {c}. On trouve aussi {p} {places}.",
    es: "{p}, fila {r}, columna {c}. El {p} también está en {places}.",
    pt: "{p}, linha {r}, coluna {c}. O {p} também está em {places}.",
    it: "{p}, riga {r}, colonna {c}. La carta {p} sta anche in {places}.",
    nl: "{p}, rij {r}, kolom {c}. {p} staat ook op {places}.",
    sv: "{p}, rad {r}, kolumn {c}. {p} finns också på {places}.",
    da: "{p}, række {r}, kolonne {c}. {p} står også i {places}.",
    no: "{p}, rad {r}, kolonne {c}. {p} står også i {places}.",
    fi: "{p}, rivillä {r}, sarakkeessa {c}. {p} on myös {places}."
  },
  saidHead: {
    en: "Row and column {k}: {seq}.",
    de: "Zeile und Spalte {k}: {seq}.",
    fr: "Ligne et colonne {k} : {seq}.",
    es: "Fila y columna del {k}: {seq}.",
    pt: "Linha e coluna do {k}: {seq}.",
    it: "Riga e colonna {k}: {seq}.",
    nl: "Rij en kolom {k}: {seq}.",
    sv: "Rad och kolumn {k}: {seq}.",
    da: "Række og kolonne {k}: {seq}.",
    no: "Rad og kolonne {k}: {seq}.",
    fi: "Rivi ja sarake {k}: {seq}."
  },
  saidSeat: {
    en: "Empty seat. The number {p} stands at row {c}, column {r}.",
    de: "Leeres Fach. Die {p}, die hier saß, steht in Zeile {c}, Spalte {r}.",
    fr: "Place vide. Le {p} qui était ici se trouve ligne {c}, colonne {r}.",
    es: "Lugar vacío. El {p} que estaba aquí está en la fila {c}, columna {r}.",
    pt: "Lugar vazio. O {p} que ficava aqui está na linha {c}, coluna {r}.",
    it: "Posto vuoto. La carta {p} che stava qui è in riga {c}, colonna {r}.",
    nl: "Lege plek. Het getal {p} staat op rij {c}, kolom {r}.",
    sv: "Tom plats. Talet {p} som stod här finns kvar på rad {c}, kolumn {r}.",
    da: "Tom plads. Flisen med {p}, der lå her, ligger nu i række {c}, kolonne {r}.",
    no: "Tom plass. {p}-kortet som stod her, står nå i rad {c}, kolonne {r}.",
    fi: "Tyhjä paikka. Tässä ollut {p} on rivillä {c}, sarakkeessa {r}."
  },
  gateTitle: {
    en: "The shelf and the study list, on paper",
    de: "Die Lernliste auf Papier",
    fr: "La liste à apprendre, sur papier",
    es: "La lista de estudio, en papel",
    pt: "A lista de estudo no papel",
    it: "L’elenco da studiare, su carta",
    nl: "De oefenlijst op papier",
    sv: "Hyllan och listan, på papper",
    da: "Listen på papir",
    no: "Lista, på papir",
    fi: "Opeteltavat laskut paperilla"
  },
  gateBody: {
    en: "A sheet with the shelf exactly as it stands, and under it every fact still standing — each written once, because a number only has to be remembered once. The list the class made itself.",
    de: "Ein Blatt mit dem Setzkasten genau so, wie er gerade steht, und darunter jede Aufgabe, die noch steht — jede nur einmal. Die Liste, die die Klasse selbst gemacht hat.",
    fr: "Une feuille avec le casier tel qu’il est, et dessous chaque calcul encore en place, écrit une seule fois — la liste que la classe a faite elle-même.",
    es: "Una hoja con la repisa tal como quedó y, debajo, cada multiplicación que sigue en pie, escrita una sola vez: la lista que armó la clase.",
    pt: "Uma folha com a estante exatamente como ela está e, embaixo, cada conta que continua de pé, escrita uma única vez — a lista que a própria turma montou.",
    it: "Un foglio con lo scaffale com’è rimasto e, sotto, tutte le moltiplicazioni ancora in piedi, scritte una volta sola: l’elenco che la classe si è costruita da sé.",
    nl: "De kast precies zoals hij nu staat, afgedrukt, en daaronder elke keersom die nog overeind staat — elk één keer opgeschreven, in de lijst die de klas zelf heeft gemaakt.",
    sv: "Ett blad med hyllan precis som den står, och under den varje uppgift som står kvar — var och en skriven en enda gång. Listan som klassen gjorde själv.",
    da: "Et ark med reolen præcis, som den står, og under den hvert stykke, der stadig står tilbage, skrevet én gang hver — den liste, klassen selv har lavet.",
    no: "Et ark med reolen nøyaktig slik den står, og under det alt som fortsatt står igjen – skrevet én gang hver, så ingenting må huskes to ganger. Lista klassen har laget selv.",
    fi: "Sivu, jolla kortisto on juuri sellaisena kuin se nyt on, ja sen alla jokainen jäljellä oleva lasku kertaalleen kirjoitettuna — lista, jonka luokka teki itse."
  },
  gateCta: {
    en: "See the Teacher plan",
    de: "Zum Lehrkraft-Abo",
    fr: "Voir l’offre Enseignant",
    es: "Ver el plan Docente",
    pt: "Ver o plano Professor",
    it: "Il piano Insegnante",
    nl: "Bekijk het Leerkracht-pakket",
    sv: "Se Lärarplanen",
    da: "Se Lærerabonnementet",
    no: "Se Lærer-abonnementet",
    fi: "Katso Opettaja-tilaus"
  },
  setStart: {
    en: "Open with the 1, the 2, the 5 and the 10 already put away",
    de: "Beim Öffnen sind 1, 2, 5 und 10 schon weggeräumt",
    fr: "Ouvrir avec le 1, le 2, le 5 et le 10 déjà rangés",
    es: "Empezar con el 1, el 2, el 5 y el 10 ya retirados",
    pt: "Começar com o 1, o 2, o 5 e o 10 já recolhidos",
    it: "Apri con 1, 2, 5 e 10 già da parte",
    nl: "Beginnen met rij en kolom 1, 2, 5 en 10 al weggezet",
    sv: "Öppna med 1, 2, 5 och 10 redan undanlagda",
    da: "Start med 1, 2, 5 og 10 lagt væk",
    no: "Åpne med 1, 2, 5 og 10 allerede lagt bort",
    fi: "Aloita niin, että 1, 2, 5 ja 10 ovat jo sivussa"
  },
  /* ⭐ THE ONE OPERATOR EXEMPTION, AND IT IS THE LOCALISED-NOTATION
     SUPERPOWER: German, Swedish, Danish, Norwegian and Finnish schools
     print the raised dot; the rest print the cross. It appears ONLY on
     the paper. Each panel gave its own, and four of them cited a
     shipped sibling to prove it rather than recalling it. */
  opGlyph: {
    en: "×", de: "·", fr: "×", es: "×", pt: "×", it: "×",
    nl: "×", sv: "·", da: "·", no: "·", fi: "·"
  },
  sheetTitle: {
    en: "Our study list",
    de: "Unsere Lernliste",
    fr: "Notre liste à apprendre",
    es: "Nuestra lista de estudio",
    pt: "Nossa lista de estudo",
    it: "Il nostro elenco da studiare",
    nl: "Onze oefenlijst",
    sv: "Vår lista",
    da: "Vores liste",
    no: "Lista vår",
    fi: "Nämä me vielä opettelemme"
  },
  sheetNote: {
    en: "The shelf as we left it, and every fact still standing — each written once.",
    de: "Der Setzkasten, wie wir ihn gelassen haben, und jede Aufgabe, die noch steht — jede nur einmal.",
    fr: "Le casier tel que nous l’avons laissé, et chaque calcul encore en place.",
    es: "La repisa como la dejamos, y cada multiplicación que sigue en pie.",
    pt: "A estante como a deixamos e cada conta que continua de pé.",
    it: "Lo scaffale come l’abbiamo lasciato e tutte le moltiplicazioni ancora in piedi.",
    nl: "De kast zoals wij hem hebben achtergelaten, en elke keersom die nog overeind staat.",
    sv: "Hyllan som vi lämnade den, och varje uppgift som står kvar — var och en skriven en enda gång.",
    da: "Reolen, som vi forlod den, og hvert stykke, der stadig står tilbage.",
    no: "Reolen slik vi forlot den, og alt som fortsatt står igjen – skrevet én gang hver.",
    fi: "Kortisto sellaisena kuin sen jätimme, ja kaikki jäljellä olevat laskut."
  }
};
