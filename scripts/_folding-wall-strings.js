/* =====================================================================
   _folding-wall-strings.js — TOOL #47 THE FOLDING WALL, 38 keys x 11
   locales. THE SOURCE OF TRUTH; `apply-folding-wall-locales.js` writes
   it into the tool and refuses anything that breaks a content ban.

   ⭐⭐ THE TOOL FOLDS, AND THAT IS A CORRECTION. The first build did not:
   I read the v5 doc's note — *collisions to avoid AT NAMING: folding
   (folding-sheet)* — as licence to delete the GESTURE, when it only
   ever asked for a rename. Every locale below was rebuilt a second time
   around the fold, and every panel found the rename obvious once the
   apparatus was right:

     de Die Klappwand · fr Le paravent des tables · es El biombo de las
     tablas · pt A parede que se fecha · it La parete delle tabelline ·
     nl Het Tafelluik · sv Vikväggen · da Foldevæggen · no Brettemuren ·
     fi Kertotaulusermi

   ⭐ FOUR PANELS INDEPENDENTLY REACHED FOR THE FOLDING SCREEN — French
   `paravent`, Spanish `biombo`, Finnish `sermi`, Swedish `vikvägg` (the
   partition every Nordic teacher has folded away between two
   classrooms). The gesture is inside the noun, which is what a name is
   supposed to do.

   ⚠ AND THE BAN FILE HAD TO BE RE-CUT, because it forbade the tool's
   own verb. The Danish panel measured it and refused to ship: **39 hits
   across 19 of its 38 keys, every one on the fold family.** The
   Norwegian panel measured 29. `MOTION` now keeps only folding-sheet's
   NAMED PARTS — crease, mirror, twin, hinge — plus the doctrinal ban on
   *twin*, because 3x4 and 4x3 are different situations that merely
   carry the same number.

   ⚠ A POISON ROW CAN OUTLIVE THE RULE IT WAS WRITTEN FOR. Three
   must-fire rows existed only to justify a prefix over-breadth on the
   fold root; the over-breadth is gone with its reason and they are
   ordinary correct prose again.

   ⚠ THE LEADING SPACE IN `shelfStacked` IS LOAD-BEARING. `_sceneText`
   concatenates it straight onto `shelfLabel`.
   ===================================================================== */
'use strict';

module.exports = {
  title: {
    en: "The Folding Wall", de: "Die Klappwand", fr: "Le paravent des tables",
    es: "El biombo de las tablas", pt: "A parede que se fecha", it: "La parete delle tabelline",
    nl: "Het Tafelluik", sv: "Vikväggen", da: "Foldevæggen", no: "Brettemuren",
    fi: "Kertotaulusermi"
  },
  instruction: {
    en: "Fold away what the class already knows, and see what is really left to learn.",
    de: "Hundert Kärtchen. Klappt weg, was die Klasse längst kann — und seht, was wirklich noch zu lernen bleibt.",
    fr: "Cent cartes sur un paravent. Pliez celles que la classe connaît déjà, et voyez ce qu’il reste vraiment à apprendre.",
    es: "Cien cartas. Plieguen las que la clase ya se sabe y vean lo que de verdad falta por aprender.",
    pt: "A parede começa cheia. Feche as plaquinhas que a turma já sabe e veja o que sobra, de verdade, para aprender.",
    it: "La tavola pitagorica al completo. Ripiega quello che la classe sa già e guarda che cosa resta davvero da imparare.",
    nl: "Vouw weg wat de klas al kent, en zie welke keersommen er echt overblijven om te leren.",
    sv: "Vik ihop det klassen redan kan — då syns det vad som egentligen är kvar att lära sig.",
    da: "Hele den lille tabel står på væggen. Fold det væk, som klassen kan i forvejen, og se, hvad der egentlig er tilbage at lære.",
    no: "Brett bort de tabellene klassen kan fra før, og se hva som egentlig står igjen å lære.",
    fi: "Sermi on täynnä kortteja. Taita pois ne, jotka luokka jo osaa, ja katso, mitä on oikeasti vielä opeteltavana."
  },
  shelfLabel: {
    en: "Wall. Rows and columns: {list}.", de: "Klappwand. Zeilen und Spalten: {list}.",
    fr: "Le paravent. Lignes et colonnes : {list}.", es: "El biombo. Filas y columnas: {list}.",
    pt: "Parede. Linhas e colunas: {list}.", it: "Parete. Righe e colonne: {list}.",
    nl: "Het luik. Rijen en kolommen: {list}.", sv: "Väggen. Rader och kolumner: {list}.",
    da: "Væggen. Rækker og kolonner: {list}.", no: "Muren. Rader og kolonner: {list}.",
    fi: "Sermi. Rivit ja sarakkeet: {list}."
  },
  shelfStacked: {
    en: " Everything below the diagonal is folded over onto the card that carries the same number; those cards now hold two.",
    de: " Alle Kärtchen unterhalb der Diagonale sind hinübergeklappt; die Kärtchen, auf denen sie gelandet sind, tragen jetzt zwei.",
    fr: " Toutes les cartes sous la diagonale sont rabattues ; celles qui gardent ces nombres en portent deux maintenant.",
    es: " Todas las cartas de debajo de la diagonal ya se plegaron sobre su pareja del otro lado; las cartas que se quedan con esos números ahora sostienen dos.",
    pt: " A parede está fechada sobre a diagonal; as plaquinhas que ficaram com esses números agora têm outra fechada em cima.",
    it: " La parete è piegata lungo la diagonale; le carte che conservano quei numeri adesso ne tengono due.",
    nl: " Alles onder de diagonaal is omgevouwen; waar dat getal blijft staan, liggen nu twee kaarten.",
    sv: " Väggen är ihopvikt längs diagonalen. Varje kort under den har landat på det kort som bär samma tal.",
    da: " Alle fliser under diagonalen er foldet ind over den; hvert af de tal står nu kun ét sted, og dér ligger to fliser oven på hinanden.",
    no: " Alle kort under diagonalen er brettet over på kortet som bærer det samme tallet; de kortene holder nå to.",
    fi: " Kaikki lävistäjän alapuoliset kortit on taitettu saman luvun kortin päälle; niissä paikoissa on nyt kortin alla toinen kortti."
  },
  addr: {
    en: "row {r}, column {c}", de: "Zeile {r}, Spalte {c}", fr: "ligne {r}, colonne {c}",
    es: "fila {r}, columna {c}", pt: "linha {r}, coluna {c}", it: "riga {r}, colonna {c}",
    nl: "rij {r}, kolom {c}", sv: "rad {r}, kolumn {c}", da: "række {r}, kolonne {c}",
    no: "rad {r}, kolonne {c}", fi: "rivillä {r}, sarakkeessa {c}"
  },
  cardLabel: {
    en: "{p}, row {r}, column {c}", de: "{p}, Zeile {r}, Spalte {c}", fr: "{p}, ligne {r}, colonne {c}",
    es: "{p}, fila {r}, columna {c}", pt: "{p}, linha {r}, coluna {c}", it: "{p}, riga {r}, colonna {c}",
    nl: "{p}, rij {r}, kolom {c}", sv: "{p}, rad {r}, kolumn {c}", da: "{p}, række {r}, kolonne {c}",
    no: "{p}, rad {r}, kolonne {c}", fi: "{p}, rivillä {r}, sarakkeessa {c}"
  },
  cardDouble: {
    en: "{p}, row {r}, column {c}, holding two cards",
    de: "{p}, Zeile {r}, Spalte {c}, trägt zwei Kärtchen",
    fr: "{p}, ligne {r}, colonne {c}, cette carte en porte deux",
    es: "{p}, fila {r}, columna {c}, sostiene dos cartas",
    pt: "{p}, linha {r}, coluna {c}, com outra plaquinha fechada em cima",
    it: "{p}, riga {r}, colonna {c}, tiene due carte",
    nl: "{p}, rij {r}, kolom {c}, met twee kaarten",
    sv: "{p}, rad {r}, kolumn {c}, två kort på varandra",
    da: "{p}, række {r}, kolonne {c}, to fliser oven på hinanden",
    no: "{p}, rad {r}, kolonne {c}, holder to kort",
    fi: "{p}, rivillä {r}, sarakkeessa {c}, alla toinen kortti"
  },
  seatLabel: {
    en: "Empty place. The number {p} stands at row {c}, column {r}.",
    de: "Leere Stelle. Die {p}, die hier stand, ist auf ihren Partner in Zeile {c}, Spalte {r} geklappt.",
    fr: "Place vide. Le {p} qui était ici se trouve ligne {c}, colonne {r}.",
    es: "Lugar vacío. El {p} que estaba aquí se plegó sobre la fila {c}, columna {r}.",
    pt: "Lugar vazio. O {p} que ficava aqui está fechado sobre a linha {c}, coluna {r}.",
    it: "Posto vuoto. La carta {p} che stava qui si è piegata su riga {c}, colonna {r}.",
    nl: "Lege plek. Het getal {p} staat op rij {c}, kolom {r}.",
    sv: "Tom plats. Kortet med {p} som stod här är vikt över diagonalen och ligger nu på rad {c}, kolumn {r}.",
    da: "Tom plads. Flisen med {p}, der stod her, er foldet over på række {c}, kolonne {r}.",
    no: "Tom plass. Tallet {p} står i rad {c}, kolonne {r}.",
    fi: "Tyhjä paikka. Tässä ollut {p} on rivillä {c}, sarakkeessa {r}."
  },
  rowHead: {
    en: "Row {k}", de: "Zeile {k}", fr: "Ligne {k}", es: "Fila {k}", pt: "Linha {k}",
    it: "Riga {k}", nl: "Rij {k}", sv: "Rad {k}", da: "Række {k}", no: "Rad {k}", fi: "Rivi {k}"
  },
  colHead: {
    en: "Column {k}", de: "Spalte {k}", fr: "Colonne {k}", es: "Columna {k}", pt: "Coluna {k}",
    it: "Colonna {k}", nl: "Kolom {k}", sv: "Kolumn {k}", da: "Kolonne {k}", no: "Kolonne {k}",
    fi: "Sarake {k}"
  },
  cornerLabel: {
    en: "The wall. The row numerals down the left, the column numerals across the top.",
    de: "Die Klappwand. Die Zeilen stehen links, die Spalten oben.",
    fr: "Le paravent. Les lignes à gauche, les colonnes en haut.",
    es: "El biombo. Las filas por la izquierda, las columnas por arriba.",
    pt: "A parede. As linhas ficam na lateral esquerda e as colunas, na parte de cima.",
    it: "La parete. Le righe a sinistra, le colonne in alto.",
    nl: "Het luik. De rijen staan links, de kolommen bovenaan.",
    sv: "Väggen. Radernas tal står till vänster, kolumnernas överst.",
    da: "Væggen. Rækker ned ad venstre side, kolonner hen over toppen.",
    no: "Muren. Radtallene nedover til venstre, kolonnetallene bortover øverst.",
    fi: "Sermi. Rivit vasemmassa laidassa, sarakkeet ylälaidassa."
  },
  famAway: {
    en: "Fold away the {k} row and the {k} column",
    de: "Zeile {k} und Spalte {k} wegklappen",
    fr: "Plier la ligne {k} et la colonne {k}",
    es: "Plegar la fila del {k} y la columna del {k}",
    pt: "Fechar a linha do {k} e a coluna do {k}",
    it: "Ripiega la riga {k} e la colonna {k}",
    nl: "Rij {k} en kolom {k} wegvouwen",
    sv: "Vik ihop rad {k} och kolumn {k}",
    da: "Fold {k}-rækken og {k}-kolonnen væk",
    no: "Brett bort rad {k} og kolonne {k}",
    fi: "Taita pois rivi {k} ja sarake {k}"
  },
  famBack: {
    en: "Fold back the {k} row and the {k} column",
    de: "Zeile {k} und Spalte {k} zurückklappen",
    fr: "Déplier la ligne {k} et la colonne {k}",
    es: "Regresar la fila del {k} y la columna del {k}",
    pt: "Abrir de novo a linha do {k} e a coluna do {k}",
    it: "Riapri la riga {k} e la colonna {k}",
    nl: "Rij {k} en kolom {k} terugvouwen",
    sv: "Vik upp rad {k} och kolumn {k}",
    da: "Fold {k}-rækken og {k}-kolonnen frem igen",
    no: "Brett tilbake rad {k} og kolonne {k}",
    fi: "Avaa takaisin rivi {k} ja sarake {k}"
  },
  famLocked: {
    en: "The {k} row and the {k} column are folded away — fold the wall back open first",
    de: "Zeile {k} und Spalte {k} sind weggeklappt — klappt zuerst die Kärtchen unterhalb der Diagonale zurück",
    fr: "Ligne {k} et colonne {k} — relever d’abord les cartes rabattues sous la diagonale",
    es: "La fila del {k} y la columna del {k} ya están plegadas. Primero hay que regresar las cartas que se plegaron sobre la diagonal.",
    pt: "Abrir de novo a linha do {k} e a coluna do {k} — primeiro abra a parede sobre a diagonal",
    it: "La riga {k} e la colonna {k} sono già ripiegate: riapri prima la parete",
    nl: "Rij {k} en kolom {k} terugvouwen — vouw eerst alles onder de diagonaal terug",
    sv: "Vik ihop rad {k} och kolumn {k} — vik upp väggen längs diagonalen först",
    da: "{k}-rækken og {k}-kolonnen er foldet væk — fold først væggen frem igen",
    no: "Rad {k} og kolonne {k} er brettet bort – brett først tilbake kortene under diagonalen",
    fi: "Avaa takaisin rivi {k} ja sarake {k} — sermi on vielä taitettu kiinni"
  },
  stackBtn: {
    en: "Fold the wall over along the diagonal",
    de: "Alle Kärtchen unterhalb der Diagonale auf ihre Partner klappen",
    fr: "Rabattre toutes les cartes sous la diagonale",
    es: "Plegar todas las cartas de debajo de la diagonal sobre su pareja",
    pt: "Fechar a parede sobre a diagonal",
    it: "Piega la parete lungo la diagonale",
    nl: "Alles onder de diagonaal omvouwen",
    sv: "Vik ihop väggen längs diagonalen",
    da: "Fold væggen sammen om diagonalen",
    no: "Brett bort alle kort under diagonalen",
    fi: "Taita kiinni kaikki lävistäjän alapuoliset kortit"
  },
  unstackBtn: {
    en: "Fold the wall back open",
    de: "Die Kärtchen unterhalb der Diagonale zurückklappen",
    fr: "Relever les cartes sous la diagonale",
    es: "Regresar las cartas de debajo de la diagonal",
    pt: "Abrir a parede sobre a diagonal",
    it: "Riapri la parete",
    nl: "Alles onder de diagonaal terugvouwen",
    sv: "Vik upp väggen längs diagonalen",
    da: "Fold væggen frem igen",
    no: "Brett tilbake kortene under diagonalen",
    fi: "Avaa auki lävistäjän alapuoliset kortit"
  },
  stackLocked: {
    en: "Fold the wall over along the diagonal — fold away the 1, the 2, the 5 and the 10 first",
    de: "Alle Kärtchen unterhalb der Diagonale auf ihre Partner klappen — klappt zuerst die 1, die 2, die 5 und die 10 weg",
    fr: "Rabattre toutes les cartes sous la diagonale — plier d’abord le 1, le 2, le 5 et le 10",
    es: "Plegar todas las cartas de debajo de la diagonal: primero hay que plegar el 1, el 2, el 5 y el 10",
    pt: "Fechar a parede sobre a diagonal — primeiro feche o 1, o 2, o 5 e o 10",
    it: "Piega la parete lungo la diagonale: prima ripiega l’1, il 2, il 5 e il 10",
    nl: "Alles onder de diagonaal omvouwen — vouw eerst rij en kolom 1, 2, 5 en 10 weg",
    sv: "Vik ihop väggen längs diagonalen — vik ihop 1, 2, 5 och 10 först",
    da: "Fold væggen sammen om diagonalen — fold først 1, 2, 5 og 10 væk",
    no: "Brett bort alle kort under diagonalen – brett først bort 1, 2, 5 og 10",
    fi: "Taita kiinni kaikki lävistäjän alapuoliset kortit — taita ensin pois 1, 2, 5 ja 10"
  },
  restoreBtn: {
    en: "Fold it all back open", de: "Alles zurückklappen", fr: "Rouvrir tout le paravent",
    es: "Regresar todo el biombo", pt: "Abrir a parede inteira de novo", it: "Riapri tutto",
    nl: "Alles terugvouwen", sv: "Vik upp allt", da: "Fold det hele frem igen",
    no: "Brett alt tilbake", fi: "Avaa kaikki takaisin"
  },
  restoreLocked: {
    en: "Fold it all back open — nothing has been folded away yet",
    de: "Alles zurückklappen — es ist noch nichts weggeklappt",
    fr: "Rouvrir tout le paravent — rien n’est encore plié",
    es: "Regresar todo el biombo: todavía no se ha plegado nada",
    pt: "Abrir a parede inteira de novo — ainda não foi fechado nada",
    it: "Riapri tutto: non hai ancora ripiegato niente",
    nl: "Alles terugvouwen — er is nog niets weggevouwen",
    sv: "Vik upp allt — inget är ihopvikt än",
    da: "Fold det hele frem igen — der er ikke foldet noget væk endnu",
    no: "Brett alt tilbake – ingenting er brettet bort ennå",
    fi: "Avaa kaikki takaisin — mitään ei ole vielä taitettu"
  },
  printBtn: {
    en: "Print the wall and the study list",
    de: "Die Wand und die Lernliste drucken",
    fr: "Imprimer le paravent et la liste à apprendre",
    es: "Imprimir el biombo y la lista de estudio",
    pt: "Imprimir a parede e a lista de estudo",
    it: "Stampa la parete e l’elenco da studiare",
    nl: "Het luik en de oefenlijst afdrukken",
    sv: "Skriv ut väggen och listan",
    da: "Print væggen og listen over de stykker, der står tilbage",
    no: "Skriv ut muren og lista over det som står igjen",
    fi: "Tulosta sermi ja opeteltavat laskut"
  },
  printLocked: {
    en: "Print the wall and the study list — part of the Teacher plan",
    de: "Die Wand und die Lernliste drucken — gehört zum Lehrkraft-Abo",
    fr: "Imprimer le paravent et la liste à apprendre — fait partie de l’offre Enseignant",
    es: "Imprimir el biombo y la lista de estudio: es parte del plan Docente",
    pt: "Imprimir a parede e a lista de estudo — faz parte do plano Professor",
    it: "Stampa la parete e l’elenco da studiare — fa parte del piano Insegnante",
    nl: "Het luik en de oefenlijst afdrukken — onderdeel van het Leerkracht-pakket",
    sv: "Skriv ut väggen och listan — ingår i Lärarplanen",
    da: "Print væggen og listen over de stykker, der står tilbage — hører til Lærerabonnementet",
    no: "Skriv ut muren og lista over det som står igjen – en del av Lærer-abonnementet",
    fi: "Tulosta sermi ja opeteltavat laskut — kuuluu Opettaja-tilaukseen"
  },
  saidAway: {
    en: "The {k} row and the {k} column are folded away. Rows and columns: {list}.",
    de: "Zeile {k} und Spalte {k} weggeklappt. Zeilen und Spalten: {list}.",
    fr: "La ligne {k} et la colonne {k} sont pliées. Lignes et colonnes : {list}.",
    es: "Se plegaron la fila del {k} y la columna del {k}. Filas y columnas: {list}.",
    pt: "A linha do {k} e a coluna do {k} se fecharam. Linhas e colunas: {list}.",
    it: "Riga {k} e colonna {k} ripiegate. Righe e colonne: {list}.",
    nl: "Rij {k} en kolom {k} zijn weggevouwen. Rijen en kolommen: {list}.",
    sv: "Rad {k} och kolumn {k} är ihopvikta. Rader och kolumner: {list}.",
    da: "{k}-rækken og {k}-kolonnen er foldet væk. Rækker og kolonner: {list}.",
    no: "Rad {k} og kolonne {k} er brettet bort. Rader og kolonner: {list}.",
    fi: "Rivi {k} ja sarake {k} taitettiin pois. Rivit ja sarakkeet: {list}."
  },
  saidBack: {
    en: "The {k} row and the {k} column are back. Rows and columns: {list}.",
    de: "Zeile {k} und Spalte {k} zurückgeklappt. Zeilen und Spalten: {list}.",
    fr: "La ligne {k} et la colonne {k} sont dépliées. Lignes et colonnes : {list}.",
    es: "Regresaron la fila del {k} y la columna del {k}. Filas y columnas: {list}.",
    pt: "A linha do {k} e a coluna do {k} abriram de novo. Linhas e colunas: {list}.",
    it: "Riga {k} e colonna {k} di nuovo aperte. Righe e colonne: {list}.",
    nl: "Rij {k} en kolom {k} staan er weer. Rijen en kolommen: {list}.",
    sv: "Rad {k} och kolumn {k} är uppvikta igen. Rader och kolumner: {list}.",
    da: "{k}-rækken og {k}-kolonnen er foldet frem igen. Rækker og kolonner: {list}.",
    no: "Rad {k} og kolonne {k} er tilbake. Rader og kolonner: {list}.",
    fi: "Rivi {k} ja sarake {k} avattiin takaisin. Rivit ja sarakkeet: {list}."
  },
  saidStack: {
    en: "The wall is folded over along the diagonal; every card below it has landed on the card that carries the same number.",
    de: "Umgeklappt. Alle Kärtchen unterhalb der Diagonale sind hinübergeklappt; die Kärtchen, auf denen sie gelandet sind, tragen jetzt zwei.",
    fr: "Toutes les cartes sous la diagonale sont rabattues ; celles qui gardent ces nombres en portent deux maintenant.",
    es: "Plegadas. Todas las cartas de debajo de la diagonal se plegaron sobre su pareja del otro lado; las cartas que se quedan con esos números ahora sostienen dos.",
    pt: "Parede fechada sobre a diagonal. As plaquinhas que ficaram com esses números agora têm outra fechada em cima.",
    it: "La parete è piegata lungo la diagonale: le carte che conservano quei numeri adesso ne tengono due.",
    nl: "Alles onder de diagonaal is omgevouwen; waar dat getal blijft staan, liggen nu twee kaarten.",
    sv: "Väggen är ihopvikt längs diagonalen. Varje kort under den har landat på det kort som bär samma tal.",
    da: "Foldet sammen. Alle fliser under diagonalen er foldet ind over den; hvert af de tal står nu kun ét sted, og dér ligger to fliser oven på hinanden.",
    no: "Alle kort under diagonalen er brettet over på kortet som bærer det samme tallet; de kortene holder nå to.",
    fi: "Sermi taitettiin kiinni. Kaikki lävistäjän alapuoliset kortit on taitettu saman luvun kortin päälle; niissä paikoissa on nyt kortin alla toinen kortti."
  },
  saidUnstack: {
    en: "The wall is open again.",
    de: "Die Kärtchen unterhalb der Diagonale stehen wieder da.",
    fr: "Toutes les cartes sous la diagonale sont relevées.",
    es: "Regresaron todas las cartas de debajo de la diagonal.",
    pt: "A parede abriu de novo sobre a diagonal.",
    it: "La parete è di nuovo aperta.",
    nl: "Alles onder de diagonaal staat er weer.",
    sv: "Väggen är uppvikt igen. Korten under diagonalen står tillbaka på sina platser.",
    da: "Alle fliser under diagonalen er foldet frem igen.",
    no: "Kortene under diagonalen er tilbake.",
    fi: "Sermi on taas auki. Lävistäjän alapuoliset kortit ovat paikoillaan."
  },
  saidRestore: {
    en: "Everything is back. Rows and columns: {list}.",
    de: "Die ganze Wand steht wieder. Zeilen und Spalten: {list}.",
    fr: "Le paravent est rouvert en entier. Lignes et colonnes : {list}.",
    es: "El biombo está completo otra vez. Filas y columnas: {list}.",
    pt: "A parede está inteira de novo. Linhas e colunas: {list}.",
    it: "È tornato tutto. Righe e colonne: {list}.",
    nl: "Alles staat er weer. Rijen en kolommen: {list}.",
    sv: "Allt är uppvikt igen. Rader och kolumner: {list}.",
    da: "Det hele er foldet frem igen. Rækker og kolonner: {list}.",
    no: "Alt er tilbake. Rader og kolonner: {list}.",
    fi: "Kaikki on taas auki. Rivit ja sarakkeet: {list}."
  },
  saidCardOne: {
    en: "{p}, row {r}, column {c}. The only {p} standing on the wall.",
    de: "{p}, Zeile {r}, Spalte {c}. Die einzige {p} an der Wand.",
    fr: "{p}, ligne {r}, colonne {c}. Le seul {p} encore en place sur le paravent.",
    es: "{p}, fila {r}, columna {c}. En ningún otro lugar del biombo.",
    pt: "{p}, linha {r}, coluna {c}. Em nenhum outro lugar da parede.",
    it: "{p}, riga {r}, colonna {c}. È l’unica carta {p} in piedi sulla parete.",
    nl: "{p}, rij {r}, kolom {c}. Nergens anders op het luik.",
    sv: "{p}, rad {r}, kolumn {c}. Ingen annanstans på väggen.",
    da: "{p}, række {r}, kolonne {c}. Ingen andre steder på væggen.",
    no: "{p}, rad {r}, kolonne {c}. Det eneste {p}-tallet som står i muren.",
    fi: "{p}, rivillä {r}, sarakkeessa {c}. Ei missään muualla sermissä."
  },
  saidCardDouble: {
    en: "{p}, row {r}, column {c}. Two cards here: this number also stands at row {c}, column {r}.",
    de: "{p}, Zeile {r}, Spalte {c}. Dieses Kärtchen trägt zwei: Die {p} aus Zeile {c}, Spalte {r} ist hier gelandet.",
    fr: "{p}, ligne {r}, colonne {c}. Cette carte en porte deux : ce nombre est aussi ligne {c}, colonne {r}.",
    es: "{p}, fila {r}, columna {c}. Esta carta sostiene dos: el {p} también está en la fila {c}, columna {r}.",
    pt: "{p}, linha {r}, coluna {c}. Esta plaquinha tem outra fechada em cima: a que estava na linha {c}, coluna {r}.",
    it: "{p}, riga {r}, colonna {c}. Questa carta ne tiene due: risponde anche a riga {c}, colonna {r}.",
    nl: "{p}, rij {r}, kolom {c}. Hier liggen twee kaarten: dit getal staat ook op rij {c}, kolom {r}.",
    sv: "{p}, rad {r}, kolumn {c}. Två kort på varandra: det övre kom hit från rad {c}, kolumn {r}.",
    da: "{p}, række {r}, kolonne {c}. Her ligger to fliser oven på hinanden: flisen gælder også for række {c}, kolonne {r}.",
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
    en: "Row and column {k}: {seq}.", de: "Zeile und Spalte {k}: {seq}.",
    fr: "Ligne et colonne {k} : {seq}.", es: "Fila y columna del {k}: {seq}.",
    pt: "Linha e coluna do {k}: {seq}.", it: "Riga e colonna {k}: {seq}.",
    nl: "Rij en kolom {k}: {seq}.", sv: "Rad och kolumn {k}: {seq}.",
    da: "Række og kolonne {k}: {seq}.", no: "Rad og kolonne {k}: {seq}.",
    fi: "Rivi ja sarake {k}: {seq}."
  },
  saidSeat: {
    en: "Empty place. The number {p} stands at row {c}, column {r}.",
    de: "Leere Stelle. Die {p}, die hier stand, ist auf ihren Partner in Zeile {c}, Spalte {r} geklappt.",
    fr: "Place vide. Le {p} qui était ici se trouve ligne {c}, colonne {r}.",
    es: "Lugar vacío. El {p} que estaba aquí se plegó sobre la fila {c}, columna {r}.",
    pt: "Lugar vazio. O {p} que ficava aqui está fechado sobre a linha {c}, coluna {r}.",
    it: "Posto vuoto. La carta {p} che stava qui si è piegata su riga {c}, colonna {r}.",
    nl: "Lege plek. Het getal {p} staat op rij {c}, kolom {r}.",
    sv: "Tom plats. Kortet med {p} som stod här är vikt över diagonalen och ligger nu på rad {c}, kolumn {r}.",
    da: "Tom plads. Flisen med {p}, der stod her, er foldet over på række {c}, kolonne {r}.",
    no: "Tom plass. Tallet {p} står i rad {c}, kolonne {r}.",
    fi: "Tyhjä paikka. Tässä ollut {p} on rivillä {c}, sarakkeessa {r}."
  },
  gateTitle: {
    en: "The wall and the study list, on paper", de: "Die Lernliste auf Papier",
    fr: "La liste à apprendre, sur papier", es: "La lista de estudio, en papel",
    pt: "A lista de estudo no papel", it: "L’elenco da studiare, su carta",
    nl: "De oefenlijst op papier", sv: "Väggen och listan, på papper",
    da: "Væggen og listen på papir", no: "Muren og lista, på papir",
    fi: "Opeteltavat laskut paperilla"
  },
  gateBody: {
    en: "A sheet with the wall exactly as it stands, and under it every fact still standing — each written once, because a number only has to be remembered once. The list the class made itself.",
    de: "Ein Blatt mit der Wand genau so, wie sie gerade steht, und darunter jede Aufgabe, die noch steht — jede nur einmal. Die Liste, die die Klasse selbst gemacht hat.",
    fr: "Une feuille avec le paravent tel qu’il est, et dessous chaque calcul encore en place, écrit une seule fois — la liste que la classe a faite elle-même.",
    es: "Una hoja con el biombo tal como quedó y, debajo, cada multiplicación que sigue en pie, escrita una sola vez: la lista que armó la clase.",
    pt: "Uma folha com a parede exatamente como ela ficou e, embaixo, cada conta que continua de pé, escrita uma única vez — a lista que a própria turma montou.",
    it: "Una pagina con la parete com’è rimasta e, sotto, tutte le moltiplicazioni ancora in piedi, scritte una volta sola: l’elenco che la classe si è costruita da sé.",
    nl: "Het luik precies zoals het nu staat, afgedrukt, en daaronder elke keersom die nog overeind staat — elk één keer opgeschreven, in de lijst die de klas zelf heeft gemaakt.",
    sv: "Ett blad med väggen precis som den står, och under den varje uppgift som står kvar — var och en skriven en enda gång. Listan som klassen gjorde själv.",
    da: "Et ark med væggen præcis, som den står, og under den hvert stykke, der stadig står tilbage, skrevet én gang hver — den liste, klassen selv har lavet.",
    no: "En utskrift med muren nøyaktig slik den står, og under den alt som fortsatt står igjen – skrevet én gang hver, fordi et tall bare trenger å huskes én gang. Lista klassen har laget selv.",
    fi: "Sivu, jolla sermi on juuri sellaisena kuin se nyt on, ja sen alla jokainen jäljellä oleva lasku kertaalleen kirjoitettuna — lista, jonka luokka teki itse."
  },
  gateCta: {
    en: "See the Teacher plan", de: "Zum Lehrkraft-Abo", fr: "Voir l’offre Enseignant",
    es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante",
    nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarplanen", da: "Se Lærerabonnementet",
    no: "Se Lærer-abonnementet", fi: "Katso Opettaja-tilaus"
  },
  setStart: {
    en: "Open with the 1, the 2, the 5 and the 10 already folded away",
    de: "Beim Öffnen sind 1, 2, 5 und 10 schon weggeklappt",
    fr: "Ouvrir avec le 1, le 2, le 5 et le 10 déjà pliés",
    es: "Empezar con el 1, el 2, el 5 y el 10 ya plegados",
    pt: "Começar com o 1, o 2, o 5 e o 10 já fechados",
    it: "Apri con 1, 2, 5 e 10 già ripiegati",
    nl: "Beginnen met rij en kolom 1, 2, 5 en 10 al weggevouwen",
    sv: "Öppna med 1, 2, 5 och 10 redan ihopvikta",
    da: "Start med 1, 2, 5 og 10 foldet væk",
    no: "Åpne med 1, 2, 5 og 10 allerede brettet bort",
    fi: "Aloita niin, että 1, 2, 5 ja 10 on jo taitettu pois"
  },
  opGlyph: {
    en: "×", de: "·", fr: "×", es: "×", pt: "×", it: "×",
    nl: "×", sv: "·", da: "·", no: "·", fi: "·"
  },
  sheetTitle: {
    en: "Our study list", de: "Unsere Lernliste", fr: "Notre liste à apprendre",
    es: "Nuestra lista de estudio", pt: "Nossa lista de estudo", it: "Il nostro elenco da studiare",
    nl: "Onze oefenlijst", sv: "Vår lista", da: "Vores liste", no: "Lista vår",
    fi: "Nämä me vielä opettelemme"
  },
  sheetNote: {
    en: "The wall as we left it, and every fact still standing — each written once.",
    de: "Die Wand, wie wir sie gelassen haben, und jede Aufgabe, die noch steht — jede nur einmal.",
    fr: "Le paravent tel que nous l’avons laissé, et chaque calcul encore en place.",
    es: "El biombo como lo dejamos, y cada multiplicación que sigue en pie, escrita una sola vez.",
    pt: "A parede como a deixamos e cada conta que continua de pé.",
    it: "La parete come l’abbiamo lasciata e tutte le moltiplicazioni ancora in piedi.",
    nl: "Het luik zoals wij het hebben achtergelaten, en elke keersom die nog overeind staat.",
    sv: "Väggen som vi lämnade den, och varje uppgift som står kvar — var och en skriven en enda gång.",
    da: "Væggen, som vi forlod den, og hvert stykke, der stadig står tilbage.",
    no: "Muren slik vi forlot den, og alt som fortsatt står igjen – skrevet én gang hver.",
    fi: "Sermi sellaisena kuin sen jätimme, ja kaikki jäljellä olevat laskut."
  }
};
