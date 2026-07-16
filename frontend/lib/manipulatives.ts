/**
 * Manipulatives metadata — in-code source of truth for the free-play tools.
 *
 * A "manipulative" is a free-play interactive tool with no task structure
 * (vs an "activity" which is a Common-Core-pinned task set, see
 * frontend/lib/activities.ts). Each entry below maps a tool ID to its
 * raw mini-tool URL plus 11-locale display copy.
 *
 * URL pattern: each tool surfaces at /<locale>/tools/ (the index landing
 * built in frontend/app/[locale]/tools/page.tsx). The `mini_tool_url`
 * here is the direct iframe-target served by nginx at
 * /var/www/lcs-media/mini-tools/<file>.html — clicking a "Try it" link
 * on the landing navigates there directly.
 *
 * 11-locale coverage status per CLAUDE.md §17.5.1:
 *   - Tier 1+2 (en, de, es, nl) operator-strong
 *   - Tier 3 (sv, fi, no) Nordic NSR-flag — translations may need
 *     native-speaker review
 *   - Tier 4 Romance (fr, it, pt) operator-best-effort without NSR per
 *     stronger Claude quality assessment
 *   - Tier 4 Nordic (da) NSR-flag
 */

import { buildHreflangAlternates } from './seo/hreflang';

export interface Manipulative {
  id: string;
  mini_tool_url: string;
  title: Record<string, string>;
  tagline: Record<string, string>;
  description: Record<string, string>;
}

export const MANIPULATIVES: Manipulative[] = [
  {
    id: "ten-frame",
    mini_tool_url: "/mini-tools/ten-frame.html",
    title: {
      en: "Ten Frame",
      de: "Zehnerfeld",
      es: "Marco de diez",
      fr: "Cadre de dix",
      it: "Tabella del dieci",
      pt: "Quadro de dez",
      nl: "Tienraam",
      sv: "Tioram",
      da: "Tierramme",
      no: "Tierramme",
      fi: "Kymmenruudukko",
    },
    tagline: {
      en: "A visual counting tool for numbers 0 to 20.",
      de: "Ein visuelles Zählwerkzeug für Zahlen von 0 bis 20.",
      es: "Una herramienta visual para contar de 0 a 20.",
      fr: "Un outil visuel pour compter de 0 à 20.",
      it: "Uno strumento visivo per contare da 0 a 20.",
      pt: "Uma ferramenta visual para contar de 0 a 20.",
      nl: "Een visueel telhulpmiddel voor de getallen 0 tot 20.",
      sv: "Ett visuellt verktyg för att räkna 0 till 20.",
      da: "Et visuelt værktøj til at tælle 0 til 20.",
      no: "Et visuelt verktøy for å telle 0 til 20.",
      fi: "Visuaalinen apuväline lukujen 0–20 laskemiseen.",
    },
    description: {
      en: "Tap empty cells to fill them, tap filled cells to clear. Toggle between a single ten-frame (0 to 10) and a double ten-frame (0 to 20). Use it for counting, subitizing, place value, and teen numbers.",
      de: "Tippe leere Felder an, um sie zu füllen, und volle Felder, um sie zu leeren. Wechsle zwischen einem einfachen Zehnerfeld (0 bis 10) und einem doppelten Zehnerfeld (0 bis 20). Geeignet für Zählen, Simultanerfassen, Stellenwert und Zahlen von 11 bis 19.",
      es: "Toca celdas vacías para llenarlas y celdas llenas para vaciarlas. Cambia entre un marco de diez simple (0 a 10) y un marco de diez doble (0 a 20). Útil para contar, subitizar, valor posicional y números entre 11 y 19.",
      fr: "Touche les cases vides pour les remplir, et les cases pleines pour les vider. Bascule entre un cadre de dix simple (0 à 10) et un cadre de dix double (0 à 20). Idéal pour compter, subitiser, travailler la valeur de position et les nombres de 11 à 19.",
      it: "Tocca le celle vuote per riempirle e quelle piene per svuotarle. Passa da una tabella del dieci singola (0 a 10) a una doppia (0 a 20). Adatto per contare, subitizzare, lavorare sul valore posizionale e sui numeri da 11 a 19.",
      pt: "Toque em células vazias para preenchê-las e em células cheias para esvaziá-las. Alterne entre um quadro de dez simples (0 a 10) e um quadro de dez duplo (0 a 20). Útil para contar, subitizar, valor posicional e números de 11 a 19.",
      nl: "Tik op lege vakjes om ze te vullen en op gevulde vakjes om ze leeg te maken. Wissel tussen een enkel tienraam (0 tot 10) en een dubbel tienraam (0 tot 20). Voor tellen, in één oogopslag herkennen, positiewaarde en de tienertallen.",
      sv: "Tryck på tomma rutor för att fylla dem och fyllda rutor för att tömma. Växla mellan en enkel tioram (0 till 10) och en dubbel tioram (0 till 20). Använd för att räkna, snabbräkning, positionsvärde och talen 11–19.",
      da: "Tryk på tomme felter for at fylde dem og fyldte felter for at tømme dem. Skift mellem en enkelt tierramme (0 til 10) og en dobbelt tierramme (0 til 20). Til tælling, mængdegenkendelse, positionssystem og tal fra 11 til 19.",
      no: "Trykk på tomme ruter for å fylle dem og fylte ruter for å tømme. Veksle mellom en enkel tierramme (0 til 10) og en dobbel tierramme (0 til 20). For telling, mengdegjenkjenning, posisjonssystem og tallene 11–19.",
      fi: "Napauta tyhjiä ruutuja täyttääksesi ja täysiä ruutuja tyhjentääksesi. Vaihda yksinkertaisen kymmenruudukon (0–10) ja kaksoiskymmenruudukon (0–20) välillä. Sopii laskemiseen, lukumäärän tunnistamiseen, paikka-arvoon ja lukuihin 11–19.",
    },
  },
  {
    id: "number-line",
    mini_tool_url: "/mini-tools/number-line.html",
    title: {
      en: "Number Line",
      de: "Zahlenstrahl",
      es: "Recta numérica",
      fr: "Droite numérique",
      it: "Linea dei numeri",
      pt: "Reta numérica",
      nl: "Getallenlijn",
      sv: "Tallinje",
      da: "Tallinje",
      no: "Tallinje",
      fi: "Lukusuora",
    },
    tagline: {
      en: "A draggable marker on a 0 to 20 number line.",
      de: "Ein verschiebbarer Marker auf einem Zahlenstrahl von 0 bis 20.",
      es: "Un marcador deslizable en una recta numérica de 0 a 20.",
      fr: "Un curseur déplaçable sur une droite numérique de 0 à 20.",
      it: "Un cursore trascinabile su una linea dei numeri da 0 a 20.",
      pt: "Um marcador arrastável numa reta numérica de 0 a 20.",
      nl: "Een sleepbare aanwijzer op een getallenlijn van 0 tot 20.",
      sv: "En dragbar markör på en tallinje från 0 till 20.",
      da: "En trækbar markør på en tallinje fra 0 til 20.",
      no: "En dragbar markør på en tallinje fra 0 til 20.",
      fi: "Vedettävä osoitin lukusuoralla 0–20.",
    },
    description: {
      en: "Drag the marker along the line; the readout shows the current value. Use it for counting on and back, addition and subtraction, and building number sense.",
      de: "Ziehe den Marker entlang des Zahlenstrahls; die Anzeige zeigt den aktuellen Wert. Geeignet zum Weiter- und Zurückzählen, für Addition und Subtraktion und zur Förderung des Zahlverständnisses.",
      es: "Desliza el marcador a lo largo de la recta; el indicador muestra el valor actual. Útil para contar hacia adelante y hacia atrás, sumar y restar, y desarrollar el sentido numérico.",
      fr: "Fais glisser le curseur sur la droite ; l'affichage indique la valeur actuelle. Idéal pour compter en avant et en arrière, additionner, soustraire et développer le sens du nombre.",
      it: "Trascina il cursore lungo la linea; l'indicatore mostra il valore attuale. Adatto per contare in avanti e indietro, per addizioni e sottrazioni, e per sviluppare il senso del numero.",
      pt: "Arraste o marcador ao longo da reta; o indicador mostra o valor atual. Útil para contar para a frente e para trás, somar e subtrair, e desenvolver o sentido de número.",
      nl: "Sleep de aanwijzer langs de lijn; de uitlezing toont de actuele waarde. Voor doortellen en terugtellen, optellen en aftrekken, en het opbouwen van getalbegrip.",
      sv: "Dra markören längs linjen; visningen visar det aktuella värdet. Använd för att räkna framåt och bakåt, för addition och subtraktion, och för att bygga taluppfattning.",
      da: "Træk markøren langs linjen; visningen viser den aktuelle værdi. Til at tælle frem og tilbage, addere og subtrahere, og opbygge talforståelse.",
      no: "Dra markøren langs linjen; visningen viser den aktuelle verdien. For å telle fram og tilbake, addere og subtrahere, og bygge tallforståelse.",
      fi: "Vedä osoitinta lukusuoran päällä; näyttö osoittaa nykyisen arvon. Sopii eteen- ja taaksepäin laskemiseen, yhteen- ja vähennyslaskuun sekä lukukäsitteen rakentamiseen.",
    },
  },
  {
    id: "ruler",
    mini_tool_url: "/mini-tools/ruler.html",
    title: {
      en: "Ruler",
      de: "Lineal",
      es: "Regla",
      fr: "Règle",
      it: "Righello",
      pt: "Régua",
      nl: "Liniaal",
      sv: "Linjal",
      da: "Lineal",
      no: "Linjal",
      fi: "Viivain",
    },
    tagline: {
      en: "A two-handle ruler in centimetres or inches.",
      de: "Ein Lineal mit zwei Griffen, in Zentimetern oder Zoll.",
      es: "Una regla con dos asas, en centímetros o pulgadas.",
      fr: "Une règle à deux poignées, en centimètres ou en pouces.",
      it: "Un righello con due maniglie, in centimetri o pollici.",
      pt: "Uma régua com duas alças, em centímetros ou polegadas.",
      nl: "Een liniaal met twee handgrepen, in centimeters of inches.",
      sv: "En linjal med två handtag, i centimeter eller tum.",
      da: "En lineal med to håndtag, i centimeter eller tommer.",
      no: "En linjal med to håndtak, i centimeter eller tommer.",
      fi: "Viivain kahdella kahvalla, senttimetreinä tai tuumina.",
    },
    description: {
      en: "Drag the two handles to measure any distance on the screen. Toggle between centimetres and inches. Use it for measurement, comparison, and unit conversion.",
      de: "Ziehe die beiden Griffe, um eine Strecke auf dem Bildschirm zu messen. Wechsle zwischen Zentimetern und Zoll. Geeignet für Messen, Vergleichen und Einheitenumrechnung.",
      es: "Arrastra las dos asas para medir cualquier distancia en la pantalla. Cambia entre centímetros y pulgadas. Útil para medir, comparar y convertir unidades.",
      fr: "Fais glisser les deux poignées pour mesurer une distance à l'écran. Bascule entre centimètres et pouces. Idéal pour mesurer, comparer et convertir des unités.",
      it: "Trascina le due maniglie per misurare una distanza sullo schermo. Passa da centimetri a pollici. Adatto per misurare, confrontare e convertire unità.",
      pt: "Arraste as duas alças para medir qualquer distância no ecrã. Alterne entre centímetros e polegadas. Útil para medir, comparar e converter unidades.",
      nl: "Sleep de twee handgrepen om een afstand op het scherm te meten. Wissel tussen centimeters en inches. Voor meten, vergelijken en omrekenen van eenheden.",
      sv: "Dra de två handtagen för att mäta ett avstånd på skärmen. Växla mellan centimeter och tum. Använd för mätning, jämförelse och enhetsomvandling.",
      da: "Træk de to håndtag for at måle en afstand på skærmen. Skift mellem centimeter og tommer. Til måling, sammenligning og enhedsomregning.",
      no: "Dra de to håndtakene for å måle en avstand på skjermen. Veksle mellom centimeter og tommer. For måling, sammenligning og enhetsomregning.",
      fi: "Vedä kahta kahvaa mittaaksesi minkä tahansa etäisyyden näytöllä. Vaihda senttimetrien ja tuumien välillä. Sopii mittaamiseen, vertailuun ja yksiköiden muuntamiseen.",
    },
  },
  {
    id: "sound-boxes",
    mini_tool_url: "/mini-tools/sound-boxes.html",
    title: {
      en: "Sound Boxes",
      de: "Lautboxen",
      es: "Cajas de sonidos",
      fr: "Boîtes à sons",
      it: "Caselle dei suoni",
      pt: "Caixas de sons",
      nl: "Klankdozen",
      sv: "Ljudrutor",
      da: "Lydbokse",
      no: "Lydbokser",
      fi: "Äännelaatikot",
    },
    tagline: {
      en: "Push a chip for every sound you hear.",
      de: "Wörter hören und in Laute gliedern.",
      es: "Separa palabras en sílabas y sonidos.",
      fr: "Une case par son pour segmenter les mots.",
      it: "Un gettone per ogni suono della parola.",
      pt: "Sílabas, sons e dígrafos com fichas.",
      nl: "Hakken en plakken met klankvakjes.",
      sv: "Ett ljud, en ruta — ljuda och lägg.",
      da: "Del ord i lyde med brikker og bokse.",
      no: "Lytt ut lydene i ordet.",
      fi: "Kuuntele sana ja laita nappula jokaista äännettä kohden.",
    },
    description: {
      en: "Tap the picture to hear the word, then push one chip into a box for each sound — sh, ch, and other two-letter sounds get one box. Reveal the letters to bridge from listening to reading. Word lists follow a phonics progression from simple three-sound words to blends and vowel teams.",
      de: "Tippe auf das Bild, um das Wort zu hören, und lege für jeden Laut ein Plättchen in eine Box – sch, ei oder ck zählen als ein Laut. Blende die Buchstaben ein, um Laut und Schreibung zu verbinden. Für phonologische Bewusstheit, Anlaut-Übungen und lautgetreues Schreiben im Anfangsunterricht.",
      es: "Toca la imagen para escuchar la palabra y coloca una ficha en una caja por cada sílaba o sonido. Cuatro niveles pensados para el español: sílabas de palabras sencillas, sonidos, dígrafos (rr, ll, ch, qu) en una sola caja y sílabas trabadas como pla y bru. Ideal para conciencia fonológica en preescolar y primero de primaria.",
      fr: "Touche l'image pour entendre le mot, puis pose un jeton dans une case pour chaque son. Affiche les lettres pour relier les sons aux graphèmes : ch, ou et oi occupent une seule case, et les lettres muettes restent en gris hors des cases. Idéal pour la conscience phonologique, l'encodage et la fusion au CP.",
      it: "Caselle di Elkonin interattive per la classe prima: i bambini ascoltano una parola e mettono un gettone in una casella per ogni suono, dalle sillabe delle parole piane fino alle doppie e ai digrammi (tt, ch, sc, gn) che occupano una casella sola.",
      pt: "Caixas de Elkonin interativas para a alfabetização: a criança ouve a palavra e arrasta uma ficha para cada sílaba ou som, dos primeiros passos silábicos até os dígrafos nh, lh, ch e rr.",
      nl: "Hak woorden in klanken en leg voor elke klank een fiche in een vakje. Met klankzuivere woorden, tweetekenklanken en clusters — precies zoals in groep 3.",
      sv: "Interaktiva ljudrutor för tidig läsinlärning: barnet hör ordet, ljudar det och lägger en bricka för varje ljud. Svenska ordlistor med ljudenliga ord och dubbelteckning, för förskoleklass och årskurs 1.",
      da: "Tryk på billedet, hør et lydret ord, og læg en brik i en boks for hver lyd. Et klassisk redskab til fonemopmærksomhed og den første afkodning i børnehaveklassen og 1. klasse.",
      no: "Legg én brikke i en boks for hver lyd du hører. Lydbokser gjør lydene i ordet synlige – det første steget mot å lese og skrive.",
      fi: "Interaktiiviset äännelaatikot alkuopetukseen: tavut, lyhyet sanat sekä pitkät äänteet ja kaksoiskirjaimet. Kuva, ääni ja nappulat tukevat äänteiden erottelua ja oikeinkirjoitusta – suoraan selaimessa, ilman kirjautumista.",
    },
  },
  {
    id: "blending-board",
    mini_tool_url: "/mini-tools/blending-board.html",
    title: {
      en: "Blending Board",
      de: "Lesemaschine",
      es: "Tablero de sílabas",
      fr: "Tableau de syllabes",
      it: "Tabellone delle sillabe",
      pt: "Quadro de sílabas",
      nl: "Klankenbord",
      sv: "Ljudtavla",
      da: "Lydtavle",
      no: "Lydtavle",
      fi: "Tavutaulu",
    },
    tagline: {
      en: "Flick the cards, blend the word.",
      de: "Laute schleifend zu Wörtern zusammenziehen.",
      es: "Une sílabas y sonidos para formar palabras.",
      fr: "b + a → ba : la fusion syllabique en un geste.",
      it: "Gira le colonne, unisci le sillabe, leggi la parola.",
      pt: "Junte sílabas e sons e forme palavras.",
      nl: "Klanken plakken tot echte woorden.",
      sv: "Ljuda ihop ord — kort för kort.",
      da: "Træk lydene sammen til ord.",
      no: "Bygg ord og trekk lydene sammen.",
      fi: "Liukumisharjoitus: äänteistä tavuiksi, tavuista sanoiksi.",
    },
    description: {
      en: "Flick the card columns to build words, then sweep across to blend them aloud. Real words earn a picture, made-up ones earn a friendly robot — and a custom deck can hold just the letters your class has been taught.",
      de: "Wische die Spalten, um neue Wörter zu bauen, und streiche über die Karten, um die Laute schleifend zusammenzuziehen. Bilder und Häkchen zeigen echte Wörter, der Roboter zeigt Quatschwörter – ganz ohne Zeitdruck und Punkte.",
      es: "Desliza las columnas de tarjetas para formar combinaciones y pasa el dedo para unirlas y leerlas. Cuatro mazos pensados para el español: sílabas con a y o, sílabas con e · i, sílabas trabadas como pla y bru, y palabras de tres sonidos como sol y mar. Cada combinación está clasificada: palabra real con su imagen, o palabra inventada que también se lee. Para conciencia fonológica y primeras lecturas en preescolar y primero de primaria.",
      fr: "Le tableau de fusion du CP en version interactive : l'enfant fait défiler consonnes, voyelles et syllabes, balaie les cartes pour fusionner les sons, et découvre quels assemblages font de vrais mots.",
      it: "Colonne di sillabe da far scorrere per costruire parole vere e parole inventate: il bambino unisce i suoni con un gesto e la parola prende voce. Con le figurine delle parole vere e il mazzo delle doppie del metodo fono-sillabico.",
      pt: "Quadro silábico interativo para a alfabetização: a criança desliza as cartas de cada coluna, junta as sílabas e descobre se montou uma palavra de verdade ou uma palavra-robô — de bola e gato até sapato, banana e os três sons de mar e luz.",
      nl: "Digitale wisselrij voor groep 3: blader door klankkaarten, plak mkm-woorden, tweetekenklanken, clusters en sch/ng — met plaatjes bij echte woorden en robotwoorden als leesoefening.",
      sv: "Bläddra fram första ljudet, vokalen och sista ljudet, och dra över korten för att ljuda ihop dem till ett ord. Riktiga ord, tramsord, ordkedjor och ordfamiljer — helt ljudenligt och utan poäng.",
      da: "Vend kortene, sig lydene, og træk dem sammen til rigtige ord — eller sjove vrøvleord. Helt lydrette danske kortsæt til den allerførste læsning.",
      no: "Bla i kolonnene med lydkort, bygg et ord og dra over kortene for å trekke lydene sammen. Lydrette ord først, deretter å, ø og æ og diftongene au, øy og ei – ekte ord feires, og tulleord er med på leken.",
      fi: "Korttisarakkeista rakennetaan tavuja ja sanoja ja pyyhkäisy liu'uttaa äänteet yhteen – alkuopetuksen liukumisharjoitus, jossa oikeat sanat ja robottisanat luetaan samalla tavalla. Pitkät tavut -sarja harjoittaa kaksoiskonsonantin kuulemista tavurajan yli.",
    },
  },
  {
    id: "letter-tiles",
    mini_tool_url: "/mini-tools/letter-tiles.html",
    title: {
      en: "Letter Tiles",
      de: "Magnetbuchstaben",
      es: "Letras magnéticas",
      fr: "Lettres magnétiques",
      it: "Lettere magnetiche",
      pt: "Alfabeto móvel",
      nl: "Letterdoos",
      sv: "Magnetbokstäver",
      da: "Magnetbogstaver",
      no: "Magnetbokstaver",
      fi: "Magneettikirjaimet",
    },
    tagline: {
      en: "An open magnetic board for building words.",
      de: "Die digitale Buchstabentafel mit Anlautbildern",
      es: "Alfabeto móvil con voz: toca una letra y escucha su palabra",
      fr: "Le tableau de lettres aimantées, en ligne",
      it: "L'alfabeto mobile per costruire parole",
      pt: "Letras que falam para montar palavras",
      nl: "Magnetische letters voor lezen en spellen",
      sv: "Bygg namn och ord på en öppen tavla.",
      da: "Byg ord med bogstaver, der siger lyden forrest",
      no: "Bygg ord med bokstaver som sier lydordet sitt",
      fi: "Avoin kirjaintaulu, jossa jokainen kirjain puhuu avainsanansa",
    },
    description: {
      en: "Drag letter tiles onto a whiteboard and build any word. Tap a tile to hear its anchor word, press check to hear the word read aloud — real words earn a picture, and a child's own inventive spelling is never marked wrong.",
      de: "Buchstaben auf die Tafel ziehen, Wörter bauen, Anlautwörter hören: die freie Magnettafel für das erste Schreiben. Mit Ä, Ö, Ü, ß und mehrgliedrigen Graphemen wie Sch, St und Ei – und ganz ohne rotes Kreuz.",
      es: "Un tablero abierto de letras magnéticas: arrastra las 27 letras, las vocales con acento y los dígrafos ch, ll, rr y qu; forma palabras reales o inventadas y escucha cada letra con su palabra guía (m de mono, ñ de piña). Sin registro, sin cronómetro y sin tache rojo.",
      fr: "Un alphabet mobile interactif pour former ses premiers mots : l'enfant fait glisser les lettres sur le tableau et, quand il en touche une, entend son mot-repère — a comme avion, ch comme chat. Avec les accents français, les sons complexes en une seule tuile, et jamais de croix rouge.",
      it: "Una scatola di lettere magnetiche nel browser: il bambino trascina le lettere sulla lavagna, compone parole vere o inventate e tocca ogni tessera per ascoltare la sua parola guida — m di mela, s di sole. Con le tessere dei digrammi ch, gh, gn, gli e sc, le carte delle parole illustrate e le liste personalizzate per il dettato della settimana.",
      pt: "Alfabeto móvel digital com palavras-chave ilustradas: a criança monta palavras livremente, ouve a palavra de cada letra e pratica com cartões de palavras — com ç, vogais acentuadas e os dígrafos nh, lh, ch, rr e ss.",
      nl: "Een open letterbord zoals in de klas: het kind schuift magnetische letters op het bord en bouwt woorden. Tik op een letter en hoor het woord dat erbij hoort — de m van maan. Met alle tweetekenklanken als één kaartje, woordkaarten uit de klanklijsten van groep 3 en een voorleesknop die ook zelf verzonnen spelling gewoon voorleest.",
      sv: "Dra magnetbokstäver till en öppen tavla och bygg namn, veckans ord och alldeles egna ord. Ett tryck på en bokstav spelar upp bokstavens ord — s som i sol — och riktiga ord firas, utan rätt och fel. Hela alfabetet med å, ä och ö, för förskoleklass och årskurs 1.",
      da: "En åben magnettavle med alle danske bogstaver — æ, ø og å er med. Tryk på et bogstav, og hør et ord med lyden forrest; byg ugens ord, navne og barnets helt egne ord — uden rettelser og uden røde kryds.",
      no: "Digital magnettavle med alle bokstavene fra a til å – og diftongbrikkene au, ei og øy. Barna drar bokstaver, bygger ord og hører lydordet til hver bokstav: s sier «sol», k sier «katt». Fri bygging eller ordkort med ukens ord – uten tidtaker og uten røde kryss.",
      fi: "Digitaaliset magneettikirjaimet alkuopetukseen: vedä kirjaimia taululle, rakenna sanoja ja kuule napautuksella jokaisen kirjaimen avainsana – a niin kuin apina. Pitkät äänteet rakennetaan kahdesta kirjaimesta, ja y, ä ja ö ovat mukana omina vokaaleinaan. Ei kirjautumista, ei pisteitä, ei punaisia rukseja.",
    },
  },
  {
    id: "calendar-wall",
    mini_tool_url: "/mini-tools/calendar-wall.html",
    title: {
      en: "Calendar Wall",
      de: "Kalendertafel",
      es: "Calendario del salón",
      fr: "Calendrier de la classe",
      it: "Calendario della classe",
      pt: "Mural do calendário",
      nl: "Dagopening",
      sv: "Samlingskalender",
      da: "Kalendervæg",
      no: "Kalendervegg",
      fi: "Kalenteriseinä",
    },
    tagline: {
      en: "Your morning meeting, alive.",
      de: "Datum, Schultage und Wetter im Morgenkreis.",
      es: "La rutina de la mañana: fecha, días de escuela y clima",
      fr: "Les rituels du matin, à projeter",
      it: "Data, giorni di scuola e tempo, ogni mattina",
      pt: "Data, dias de aula e tempo — a rodinha na tela",
      nl: "Kalender, schooldagen en weer op het digibord",
      sv: "Samlingen, fast levande.",
      da: "Dato, skoledage og vejr — morgensamlingen på én væg",
      no: "Dato, skoledager og vær på én vegg",
      fi: "Päivämäärä, koulupäivät ja sää — aamupiiri taululla",
    },
    description: {
      en: "The daily calendar routine on one wall: the helper child flips today’s card and the date is spoken in real words, one tap counts the school day across straw bundles, a ten-frame and the numeral, and the weather graph grows icon by icon.",
      de: "Dreh die Karte von heute um und sprich das Datum, zähle die Schultage und binde immer zehn Einer zu einem Zehner zusammen, trage das Wetter des Tages ein. Kalender, Schultage-Zähler mit Bündeln und Zehnerfeld sowie Wetterdiagramm – die tägliche Kalenderroutine für Morgenkreis und Anfangsunterricht, jede Klasse mit eigener Tafel durch das ganze Schuljahr.",
      es: "El calendario de pared del salón, listo para proyectar: la tarjeta de hoy se voltea, la fecha se dice en voz alta, los días de escuela se cuentan con popotes, marco de diez y número —diez unidades forman una decena— y el clima del mes crece en una gráfica que los niños llenan día a día. Sin registro, sin cronómetro y sin puntuación.",
      fr: "Le calendrier à projeter pour les rituels du matin : l'enfant retourne la carte du jour et écoute la date, la classe compte les jours d'école — dix pailles font un paquet de dix, cent jours font une fête — et note la météo du jour dans le graphique du mois. Sans minuteur ni score, comme au coin regroupement.",
      it: "Il rituale del mattino da proiettare sulla LIM: la data che si tocca e si ascolta, il conteggio dei giorni di scuola con mazzetti, tabella del dieci e numero, e il grafico del tempo che cresce un giorno alla volta.",
      pt: "O ritual da manhã projetado: a data do dia falada palavra por palavra, o contador de dias de aula com feixes, quadro de dez e número, e o gráfico do tempo do mês — tudo em um só mural, tocável pela criança-ajudante.",
      nl: "De ochtendkring op één bord: de kaart van vandaag omdraaien en de datum in echte woorden horen, schooldagen tellen met bundels, tienraam en getal, en elke dag één tik op de weergrafiek van de maand.",
      sv: "Den dagliga kalenderrutinen på en enda vägg: dagens hjälpare vänder dagens kort och datumet läses upp med riktiga ord, ett tryck räknar skoldagen i buntar, tioram och tal — och väderdiagrammet växer symbol för symbol.",
      da: "Klassens morgensamling som digital væg: månedens kalender med dagens kort, der vendes, datoen læst højt med rigtige ordenstal, skoledage talt med bundter og tierramme — og månedens vejrdiagram, der vokser med én observation om dagen.",
      no: "Digital kalendervegg for samlingsstunden: månedskalender med dagens kort og dato som leses høyt, teller for skoledager med bunter og tierramme, og et værdiagram klassen fyller ut dag for dag.",
      fi: "Aamupiirin rutiini heijastettuna: tämän päivän päivämäärä ääneen sanottuna sana sanalta, koulupäivien laskuri nippuineen, kymmenruudukkoineen ja lukuineen sekä kuukauden sääkaavio — kaikki yhdellä seinällä, päivän apulaisen napautettavana.",
    },
  },
  {
    id: "number-talk-easel",
    mini_tool_url: "/mini-tools/number-talk-easel.html",
    title: {
      en: "Number Talk Easel",
      de: "Blitzblick-Tafel",
      es: "Caballete numérico",
      fr: "Cartes à points",
      it: "Immagini lampo",
      pt: "Conversa numérica",
      nl: "Flitsbeelden",
      sv: "Blixtbilder",
      da: "Lynbilleder",
      no: "Kvikkbilder",
      fi: "Välähdyskuvat",
    },
    tagline: {
      en: "Flash a picture, talk about the math.",
      de: "Mengenbilder blitzen und über Zahlbilder sprechen.",
      es: "Un destello, muchas maneras de ver el número.",
      fr: "Le flash des quantités : voir par groupes, sans compter un par un",
      it: "Quantità a colpo d’occhio, dietro il sipario",
      pt: "Uma imagem relâmpago — e a conversa começa.",
      nl: "Flits een getalbeeld en praat na over wat de klas zag",
      sv: "En blixtbild — och sedan pratar vi.",
      da: "Et lynbillede — og så taler vi om det.",
      no: "Tallbilder i et glimt — barna ser antall uten å telle",
      fi: "Välähdyskuva verhon takaa — ja sitten puhutaan",
    },
    description: {
      en: "Flash dots, dice, ten frames, a bead rack or seven ducks for about three seconds — too short to count, long enough to see structure. Then tint the groupings children describe, circle with the crayon, and confirm only when you tap Count it.",
      de: "Lass ein Mengenbild für wenige Sekunden aufblitzen — zu kurz zum Zählen, lang genug, um Fünfer, Zehner und Würfelbilder zu sehen. Punkte, Würfelbild, Zehnerfeld, Zwanzigerfeld und Rechenrahmen, dazu fertige Blitzblick-Reihen mit kurzen didaktischen Hinweisen für das Zahlgespräch. Der Vorhang gehört dir: blitzen, besprechen, Gruppierungen färben — und erst ganz zum Schluss wird nachgezählt.",
      es: "Muestra una imagen de cantidad durante tres segundos detrás de una cortina de proyector: puntos, dados, marcos de diez, el ábaco u objetos. Los niños platican cómo la vieron —sin tache y sin puntuación—, un toque colorea sus agrupaciones, el crayón encierra las estructuras y el número solo se confirma con ¡A contar! Con una biblioteca de series de subitización para todo el ciclo escolar.",
      fr: "Une quantité s'affiche trois secondes derrière le rideau — points, constellations, boîtes de dix, boulier — et la classe raconte comment elle l'a vue. Subitisation, décompositions de 5 et de 10, et des suites d'images toutes prêtes de la maternelle au CE1.",
      it: "Immagini lampo per il subitizing da proiettare: la quantità appare per circa tre secondi dietro il sipario — troppo poco per contare uno a uno — poi la classe racconta come l’ha vista, colora i raggruppamenti e conta solo quando lo decide l’insegnante. Punti, dadi, tabelle del dieci, abaco e oggetti, con serie pronte dall’infanzia alla classe seconda.",
      pt: "Mostre pontos, dados, quadros de dez, o ábaco ou sete patos por uns três segundos — pouco para contar, o bastante para ver estruturas. Depois pergunte quantos você viu, pinte os grupos descritos, circule com o giz e confirme só no Vamos contar!",
      nl: "Een rolgordijn op het digibord flitst een getalbeeld — stippen, dobbelsteen, tienraam of rekenrek — een paar tellen: te kort om één voor één te tellen, lang genoeg om groepjes te zien. Daarna is het woord aan de klas: hoeveel zag je er, en hoe zag je het? Tik groepjes in kleur, omcirkel structuren met het krijtje en sluit af met samen natellen — zonder goed of fout, zonder timer en zonder score.",
      sv: "Visa prickar, tärningsbilder, tioramar, kulramen eller sju ankor i ungefär tre sekunder — för kort för att räkna, lagom för att se strukturer. Färga sedan grupperna barnen beskriver, ringa in med kritan och bekräfta först med Vi räknar!, då strukturen räknas högt.",
      da: "Vis prikker, terninger, tierrammer, kuglerammen eller syv ænder i cirka tre sekunder — for kort til at tælle, længe nok til at se strukturer. Farv bagefter de grupper, børnene beskriver, sæt ringe med farvekridtet, og tæl først, når du trykker »Vi tæller!«.",
      no: "Digital tavle for kvikkbilder og tallsamtaler: tallbilder blinker i noen sekunder bak et teppe — prikker, terningbilder, tierrammer og kuleramme med fargeskifte ved fem. Ferdige bildeserier for 1.–2. trinn, samtalespørsmål, farging og fargestift til diskusjonen — uten tidtaker og uten rett-eller-galt.",
      fi: "Välähdytä pisteitä, noppakuvioita, kymmenruudukoita, helmitaulua tai seitsemää ankkaa noin kolmen sekunnin ajan — liian vähän yksitellen laskemiseen, tarpeeksi rakenteen näkemiseen. Väritä sitten lasten ryhmittelyt, ympyröi liidulla ja laskekaa ääneen vasta lopuksi.",
    },
  },
];

// Landing-page chrome strings. Kept here (not in next-intl) so the
// manipulatives surface owns all its copy in one file. Migrate to message
// files later if a second consumer surfaces.
export const LANDING_STRINGS: Record<string, {
  pageTitle: string;
  pageIntro: string;
  tryItLink: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  en: {
    pageTitle: "Free Interactive Math Manipulatives",
    pageIntro: "Free-play interactive tools your students explore directly. No tasks, no checks — just the manipulative.",
    tryItLink: "Try it",
    metaTitle: "Free Interactive K-3 Math Manipulatives — Ten Frame, Number Line, Ruler",
    metaDescription: "Free interactive K-3 math manipulatives: ten frame, number line, ruler. Open in any browser; no signup, works in 11 languages.",
  },
  de: {
    pageTitle: "Lernwerkzeuge",
    pageIntro: "Interaktive Werkzeuge zum freien Erkunden. Keine Aufgaben, keine Überprüfung — nur das Werkzeug.",
    tryItLink: "Ausprobieren",
    metaTitle: "Lernwerkzeuge",
    metaDescription: "Interaktive K-3-Lernwerkzeuge zum freien Erkunden: Zehnerfeld, Zahlenstrahl, Lineal. Im Browser nutzbar; ohne Anmeldung.",
  },
  es: {
    pageTitle: "Manipulativos",
    pageIntro: "Herramientas interactivas para explorar libremente. Sin tareas, sin correcciones — solo el manipulativo.",
    tryItLink: "Probar",
    metaTitle: "Manipulativos",
    metaDescription: "Manipulativos interactivos K-3 para explorar libremente: marco de diez, recta numérica, regla. Funcionan en cualquier navegador; sin registro.",
  },
  fr: {
    pageTitle: "Outils",
    pageIntro: "Outils interactifs à explorer librement. Pas de tâches, pas de corrections — juste l'outil.",
    tryItLink: "Essayer",
    metaTitle: "Outils",
    metaDescription: "Outils interactifs K-3 à explorer librement : cadre de dix, droite numérique, règle. Dans tout navigateur ; sans inscription.",
  },
  it: {
    pageTitle: "Strumenti",
    pageIntro: "Strumenti interattivi da esplorare liberamente. Niente esercizi, niente verifiche — solo lo strumento.",
    tryItLink: "Prova",
    metaTitle: "Strumenti",
    metaDescription: "Strumenti interattivi K-3 da esplorare liberamente: tabella del dieci, linea dei numeri, righello. In qualsiasi browser; senza registrazione.",
  },
  pt: {
    pageTitle: "Manipuláveis",
    pageIntro: "Ferramentas interativas para explorar livremente. Sem tarefas, sem verificações — só a ferramenta.",
    tryItLink: "Experimentar",
    metaTitle: "Manipuláveis",
    metaDescription: "Manipuláveis interativos K-3 para explorar livremente: quadro de dez, reta numérica, régua. Em qualquer navegador; sem registo.",
  },
  nl: {
    pageTitle: "Hulpmiddelen",
    pageIntro: "Interactieve hulpmiddelen om vrij te verkennen. Geen opdrachten, geen controles — alleen het hulpmiddel.",
    tryItLink: "Probeer",
    metaTitle: "Hulpmiddelen",
    metaDescription: "Interactieve K-3 hulpmiddelen om vrij te verkennen: tienraam, getallenlijn, liniaal. In elke browser; zonder aanmelden.",
  },
  sv: {
    pageTitle: "Verktyg",
    pageIntro: "Interaktiva verktyg att utforska fritt. Inga uppgifter, inga rättningar — bara verktyget.",
    tryItLink: "Prova",
    metaTitle: "Verktyg",
    metaDescription: "Interaktiva K-3-verktyg att utforska fritt: tioram, tallinje, linjal. I valfri webbläsare; ingen registrering.",
  },
  da: {
    pageTitle: "Værktøjer",
    pageIntro: "Interaktive værktøjer til fri udforskning. Ingen opgaver, ingen rettelser — bare værktøjet.",
    tryItLink: "Prøv",
    metaTitle: "Værktøjer",
    metaDescription: "Interaktive K-3-værktøjer til fri udforskning: tierramme, tallinje, lineal. I enhver browser; ingen tilmelding.",
  },
  no: {
    pageTitle: "Verktøy",
    pageIntro: "Interaktive verktøy til fri utforskning. Ingen oppgaver, ingen rettinger — bare verktøyet.",
    tryItLink: "Prøv",
    metaTitle: "Verktøy",
    metaDescription: "Interaktive K-3-verktøy til fri utforskning: tierramme, tallinje, linjal. I valgfri nettleser; ingen registrering.",
  },
  fi: {
    pageTitle: "Työkalut",
    pageIntro: "Interaktiivisia työkaluja vapaaseen tutkimiseen. Ei tehtäviä, ei tarkistuksia — vain työkalu.",
    tryItLink: "Kokeile",
    metaTitle: "Työkalut",
    metaDescription: "Interaktiivisia K-3-työkaluja vapaaseen tutkimiseen: kymmenruudukko, lukusuora, viivain. Missä tahansa selaimessa; ei rekisteröitymistä.",
  },
};

/**
 * hreflang alternates for the /<locale>/tools/ landing — one entry per
 * topic-enabled locale (all 11). Used by generateMetadata in the route.
 */
export function landingHreflangAlternates(baseUrl: string): Record<string, string> {
  // hreflang map is the single SoT at @/lib/seo/hreflang (pt → pt-BR per §6).
  // The /tools landing exists in all 11 locales. No trailing slash — Next.js
  // routes per next.config.js trailingSlash:false.
  return buildHreflangAlternates(
    ["en", "de", "es", "fr", "it", "pt", "nl", "sv", "da", "no", "fi"],
    (loc) => `${baseUrl}/${loc}/tools`,
    `${baseUrl}/en/tools`,
  );
}
