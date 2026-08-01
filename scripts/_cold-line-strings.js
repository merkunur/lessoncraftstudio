/* =====================================================================
   _cold-line-strings.js — the SoT for TOOL #43's UI strings
   ---------------------------------------------------------------------
   19 keys × 11 locales. Applied by apply-cold-line-locales.js.
   ⚠ NEVER hand-edit the strings block in `mini tools/cold-line.js`.

   ⭐ REBUILT, NEVER TRANSLATED (§A.13.48). Three panels of native
   speakers, two rounds each. They audited the ENGLISH as a source, and
   between them they found NINE live defects in the model and TWO wrong
   statements of mine — see the tool header and the commit log.

   ⭐⭐ THE NAME. Every panel independently refused "The Cold Line":
   `line` is on this tool's own TAKEN list (#1 owns the head term in all
   eleven locales) and `cold` is the head word of `G3-345 "Hot or
   Cold?"`, the printable this tool is fenced against. Operator ruling:
   name it for the TIP. The key stays `cold-line`; the display name is
   per-locale and each panel named its own.

   ⚠ PER-LOCALE TRAPS, each caught by a native and each of which would
   have shipped:
     de  `Säule` is class-graph's ("Säulen zeigen"); `Marke` is #39's;
         `kippen` is number-balance's core verb and `hinlegen` is #41's
         button. `Stelle` is PLACE-VALUE's, so "another place" would
         read as "another place value" -> `Ausschnitt`.
     fr  ⭐ `échelle` IS THE LADDER on this platform (measurement-bench
         ships it as an object); `réglage` is the SHELL's Settings
         drawer, so "Un autre réglage" would have read as "open
         Settings". `ligne`/`droite` are both #1's.
     nl  `plaats` AND `positie` are place-value's -> `plek`.
     sv  ⭐ NEVER BEGIN A STRING WITH `Skala` — the bare imperative
         means PEEL. `märke` is open-number-line's. `bana`'s definite is
         the banana.
     da  `søjle` is class-graph's, in-tool. `plads` is place-value's.
     no  `plass` is place-value's. ⚠ A raw count said `sted` appears 12×
         in place-value-lab — all twelve inside `tierverksted`, the
         WORKSHOP. The count is not the finding.
     fi  ⭐ `kaada` means POUR — fatal on a sealed tube of liquid, so
         the tip is `Pane pitkälleen`. `paikka` is place-value's ->
         `kohta`. `merkki` is in nine tools.

   ⚠ AND EVERY DIRECTION WORD IS POSE-NEUTRAL. "up or down" is false the
   moment the instrument is lying flat, in a tool whose whole thesis is
   that the two poses are one object. But "above or below ZERO" SURVIVES
   the tip, because it is about zero and not about the screen — that
   distinction is why the rule is fixable in copy at all.
   ⚠ And it hides in idiom: the natural Germanic "fills it UP to" had to
   become a neutral reach preposition in all five Nordic locales.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    title: 'Upright and Flat',
    instruction: 'Put the two marks on the scale, above or below zero. Drag the scale itself to reach further along it, and when you are ready, lay the whole thing down flat.',
    sceneLabel: 'A long, narrow column with a numbered scale beside it and two marks on the scale. The first mark fills the column as far as its own number; the second one does not. Between them stands a number: how far apart they are. One control lays the whole instrument down flat.',
    zeroOff: 'Zero is not on view right now.',
    hintSet: 'Both marks are on the same number, so there is no distance between them. Drag one of them along the scale.',
    hintSlide: 'One of the marks is not on view right now. Drag the scale itself until it comes back.',
    hintTip: 'There it is, lying flat. The same scale, the same marks, the same distance between them.',
    hintSpan: 'The number between the marks is how far apart they are. Now lay the whole thing down flat and watch what happens to it.',
    tipBtn: 'Lay it down',
    standBtn: 'Stand it up',
    zeroBtn: 'Zero to the middle',
    nextBtn: 'Another place',
    printBtn: 'Print the sheet',
    markAAria: 'the first mark. It fills the column as far as its own number. Drag it along the scale.',
    markBAria: 'the second mark. It leaves the column alone. Drag it along the scale.',
    scaleAria: 'the scale. Drag it to reach further along; a tap brings zero back to the middle.',
    gateTitle: 'More places',
    gateBody: 'Eleven more places on the scale, ordered so each one surprises after the one before, and the sheet to print for working on paper.',
    gateCta: 'See the Teacher plan'
  },

  de: {
    title: 'Hochkant und flach',
    instruction: 'Setzt die beiden Schieber an die Skala, über oder unter Null. Zieht die Skala selbst, um weiter an ihr entlang zu kommen, und legt das Ganze flach hin, wenn ihr so weit seid.',
    sceneLabel: 'Eine hohe Röhre, daneben eine Skala mit Zahlen und zwei Schieber daran. Der erste Schieber füllt die Röhre bis zu seiner eigenen Zahl, der zweite nicht. Zwischen beiden steht eine Zahl: ihr Abstand. Eine Taste legt das Ganze flach hin.',
    zeroOff: 'Die Null liegt gerade außerhalb der Skala.',
    hintSet: 'Beide Schieber stehen auf derselben Zahl, es liegt also kein Abstand dazwischen. Zieht einen von ihnen an der Skala entlang.',
    hintSlide: 'Einer der Schieber liegt jetzt außerhalb der Skala. Zieht die Skala selbst, bis er wieder zu sehen ist.',
    hintTip: 'Da liegt es, ganz flach. Dieselbe Skala, dieselben Schieber, derselbe Abstand dazwischen.',
    hintSpan: 'Die Zahl zwischen den Schiebern ist ihr Abstand. Legt jetzt das Ganze flach hin und schaut genau hin, was sich dabei ändert.',
    tipBtn: 'Umlegen',
    standBtn: 'Aufstellen',
    zeroBtn: 'Null in die Mitte',
    nextBtn: 'Anderer Ausschnitt',
    printBtn: 'Blatt drucken',
    markAAria: 'der erste Schieber. Er füllt die Röhre bis zu seiner eigenen Zahl. Zieh ihn an der Skala entlang.',
    markBAria: 'der zweite Schieber. Er lässt die Röhre in Ruhe. Zieh ihn an der Skala entlang.',
    scaleAria: 'die Skala. Zieh sie, um weiter an ihr entlang zu kommen; ein Tippen holt die Null in die Mitte.',
    gateTitle: 'Mehr Ausschnitte',
    gateBody: 'Elf weitere Ausschnitte der Skala, so geordnet, dass jeder nach dem vorherigen überrascht, dazu das Blatt zum Ausdrucken.',
    gateCta: 'Lehrer-Paket ansehen'
  },

  fr: {
    title: 'Debout ou à plat',
    instruction: "Posez les deux curseurs sur la graduation, au-dessus ou au-dessous de zéro. Faites glisser la graduation elle-même pour aller plus loin, et quand vous êtes prêts, mettez le tout à plat.",
    sceneLabel: "Un tube dressé, une graduation chiffrée à côté et deux curseurs posés dessus. Le premier curseur remplit le tube jusqu'à son propre nombre, le second non. Entre les deux s'affiche un nombre : leur écart. Un bouton met le tout à plat.",
    zeroOff: "Le zéro est pour l'instant hors de la graduation.",
    hintSet: "Les deux curseurs sont sur le même nombre : il n'y a donc aucun écart entre eux. Faites glisser l'un des deux le long de la graduation.",
    hintSlide: "L'un des curseurs est sorti de la graduation. Faites glisser la graduation elle-même jusqu'à ce qu'il revienne en vue.",
    hintTip: 'Le voilà, à plat. La même graduation, les mêmes curseurs, le même écart entre les deux.',
    hintSpan: "Le nombre entre les curseurs, c'est leur écart. Mettez maintenant le tout à plat et regardez bien ce qui change.",
    tipBtn: 'Mettre à plat',
    standBtn: 'Redresser',
    zeroBtn: 'Ramener le zéro',
    nextBtn: 'Un autre endroit',
    printBtn: 'Imprimer la fiche',
    markAAria: "le premier curseur. Il remplit le tube jusqu'à son propre nombre. Faites-le glisser le long de la graduation.",
    markBAria: 'le second curseur. Il laisse le tube tranquille. Faites-le glisser le long de la graduation.',
    scaleAria: 'la graduation. Faites-la glisser pour aller plus loin ; une simple touche ramène le zéro au milieu.',
    gateTitle: "D'autres endroits",
    gateBody: "Onze autres endroits sur la graduation, ordonnés pour que chacun surprenne après le précédent, et la fiche à imprimer pour travailler sur papier.",
    gateCta: "Voir l'offre Enseignant"
  },

  nl: {
    title: 'Rechtop en plat',
    instruction: 'Zet de twee klemmen op de verdeling, boven of onder de nul. Sleep de verdeling zelf om verder te komen, en leg als je zover bent het hele ding plat.',
    sceneLabel: 'Een hoge zuil met daarnaast een verdeling met getallen, en twee klemmen op de verdeling. De eerste klem vult de zuil tot aan zijn eigen getal; de tweede doet dat niet. Tussen de twee staat een getal: hoe ver ze uit elkaar zitten. Eén knop legt het hele ding plat.',
    zeroOff: 'De nul is op dit moment niet te zien op de verdeling.',
    hintSet: 'Beide klemmen staan op hetzelfde getal, dus er zit geen afstand tussen. Sleep er een over de verdeling.',
    hintSlide: 'Een van de klemmen is op dit moment niet te zien. Sleep de verdeling zelf tot hij weer in beeld komt.',
    hintTip: 'Daar ligt het, helemaal plat. Dezelfde verdeling, dezelfde klemmen, dezelfde afstand ertussen.',
    hintSpan: 'Het getal tussen de klemmen is hoe ver ze uit elkaar zitten. Leg nu het hele ding plat en kijk goed wat ermee gebeurt.',
    tipBtn: 'Leg hem plat',
    standBtn: 'Zet hem rechtop',
    zeroBtn: 'Nul in het midden',
    nextBtn: 'Andere plek',
    printBtn: 'Print de verdeling',
    markAAria: 'de eerste klem. Hij vult de zuil tot aan zijn eigen getal. Sleep hem over de verdeling.',
    markBAria: 'de tweede klem. Die laat de zuil met rust. Sleep hem over de verdeling.',
    scaleAria: 'de verdeling. Sleep eraan om verder te komen; een tik zet de nul weer in het midden.',
    gateTitle: 'Meer plekken',
    gateBody: 'Nog elf plekken op de verdeling, zo op volgorde dat elke plek verrast na de vorige, en de verdeling om af te drukken om op papier te werken.',
    gateCta: 'Bekijk het Leerkracht-pakket'
  },

  sv: {
    title: 'Pelaren',
    instruction: 'Sätt de två hakarna på skalan, ovanför eller under nollan. Dra i själva skalan för att nå längre längs den, och lägg ner alltihop när ni är redo.',
    sceneLabel: 'En hög pelare med en skala med tal bredvid sig, och två hakar på skalan. Den första haken fyller pelaren ända fram till sitt eget tal; den andra gör det inte. Mellan dem står ett tal: hur långt det är mellan dem. En knapp lägger ner alltihop.',
    zeroOff: 'Nollan syns inte på skalan just nu.',
    hintSet: 'Båda hakarna sitter på samma tal, så det finns inget avstånd mellan dem. Dra den ena längs skalan.',
    hintSlide: 'Den ena haken syns inte på skalan just nu. Dra i själva skalan tills den kommer fram igen.',
    hintTip: 'Där ligger det, alldeles plant. Samma skala, samma hakar, samma avstånd mellan dem.',
    hintSpan: 'Talet mellan hakarna är hur långt det är mellan dem. Lägg nu ner alltihop och se noga vad som händer med det.',
    tipBtn: 'Lägg ner den',
    standBtn: 'Ställ upp den',
    zeroBtn: 'Nollan till mitten',
    nextBtn: 'Nytt ställe',
    printBtn: 'Skriv ut skalan',
    markAAria: 'den första haken. Den fyller pelaren ända fram till sitt eget tal. Dra den längs skalan.',
    markBAria: 'den andra haken. Den lämnar pelaren i fred. Dra den längs skalan.',
    scaleAria: 'skalan. Dra i den för att nå längre längs den; en tryckning sätter nollan tillbaka i mitten.',
    gateTitle: 'Fler ställen',
    gateBody: 'Elva ställen till på skalan, ordnade så att varje ställe överraskar efter det förra, och skalan att skriva ut för att arbeta på papper.',
    gateCta: 'Se Lärarpaketet'
  },

  da: {
    title: 'Fra lodret til vandret',
    instruction: 'Sæt de to nåle på skalaen, over eller under nullet. Træk i selve skalaen for at nå længere langs den, og læg det hele ned, når I er klar.',
    sceneLabel: 'Et højt rør med en skala med tal ved siden af, og to nåle på skalaen. Den første nål fylder røret helt hen til sit eget tal; den anden gør ikke. Mellem dem står et tal: hvor langt der er imellem dem. En knap lægger det hele ned.',
    zeroOff: 'Nullet kan ikke ses på skalaen lige nu.',
    hintSet: 'Begge nåle sidder på det samme tal, så der er ingen afstand imellem dem. Træk den ene langs skalaen.',
    hintSlide: 'Den ene nål kan ikke ses på skalaen lige nu. Træk i selve skalaen, indtil den kommer frem igen.',
    hintTip: 'Der ligger det, helt fladt. Den samme skala, de samme nåle, den samme afstand imellem dem.',
    hintSpan: 'Tallet mellem nålene er, hvor langt der er imellem dem. Læg nu det hele ned, og hold øje med, hvad der sker med det.',
    tipBtn: 'Læg det ned',
    standBtn: 'Stil det op',
    zeroBtn: 'Nullet til midten',
    nextBtn: 'Nyt sted',
    printBtn: 'Print skalaen',
    markAAria: 'den første nål. Den fylder røret helt hen til sit eget tal. Træk den langs skalaen.',
    markBAria: 'den anden nål. Den lader røret være. Træk den langs skalaen.',
    scaleAria: 'skalaen. Træk i den for at nå længere langs den; et tryk sætter nullet tilbage på midten.',
    gateTitle: 'Flere steder',
    gateBody: 'Elleve steder mere på skalaen, sat i en rækkefølge, hvor hvert sted overrasker efter det forrige, og skalaen til at printe, så I kan arbejde på papir.',
    gateCta: 'Se Lærerabonnementet'
  },

  no: {
    title: 'Under null',
    instruction: 'Sett de to klemmene på skalaen, over eller under nullet. Dra i selve skalaen for å nå lenger langs den, og legg hele greia ned når dere er klare.',
    sceneLabel: 'Et høyt rør med en skala med tall ved siden av, og to klemmer på skalaen. Den første klemmen fyller røret helt fram til sitt eget tall; den andre gjør det ikke. Mellom dem står det et tall: hvor langt det er mellom dem. En knapp legger hele greia ned.',
    zeroOff: 'Nullet vises ikke på skalaen akkurat nå.',
    hintSet: 'Begge klemmene sitter på det samme tallet, så det er ingen avstand mellom dem. Dra den ene langs skalaen.',
    hintSlide: 'Den ene klemmen vises ikke på skalaen akkurat nå. Dra i selve skalaen til den kommer fram igjen.',
    hintTip: 'Der ligger det, helt flatt. Den samme skalaen, de samme klemmene, den samme avstanden mellom dem.',
    hintSpan: 'Tallet mellom klemmene er hvor langt det er mellom dem. Legg nå hele greia ned, og følg med på hva som skjer med den.',
    tipBtn: 'Legg det ned',
    standBtn: 'Sett det opp',
    zeroBtn: 'Nullet midt på',
    nextBtn: 'Nytt sted',
    printBtn: 'Skriv ut skalaen',
    markAAria: 'den første klemmen. Den fyller røret helt fram til sitt eget tall. Dra den langs skalaen.',
    markBAria: 'den andre klemmen. Den lar røret være. Dra den langs skalaen.',
    scaleAria: 'skalaen. Dra i den for å nå lenger langs den; et trykk setter nullet tilbake midt på.',
    gateTitle: 'Flere steder',
    gateBody: 'Elleve steder til på skalaen, satt opp slik at hvert sted overrasker etter det forrige, og skalaen til å skrive ut, så dere kan jobbe på papir.',
    gateCta: 'Se Lærerabonnementet'
  },

  fi: {
    title: 'Nollan alapuolella',
    instruction: 'Aseta kaksi nastaa asteikolle, nollan yläpuolelle tai sen alapuolelle. Vedä asteikkoa itseään päästäksesi kauemmas sitä pitkin, ja pane koko laite pitkälleen, kun olette valmiit.',
    sceneLabel: 'Korkea putki, jonka vieressä on asteikko lukuineen, ja asteikolla kaksi nastaa. Ensimmäinen nasta täyttää putken omaan lukuunsa asti; toinen ei täytä. Niiden välissä on luku: kuinka kaukana ne ovat toisistaan. Yksi painike panee koko laitteen pitkälleen.',
    zeroOff: 'Nolla ei ole juuri nyt näkyvissä asteikolla.',
    hintSet: 'Molemmat nastat ovat saman luvun kohdalla, joten niiden välissä ei ole etäisyyttä. Vedä toista niistä asteikkoa pitkin.',
    hintSlide: 'Toinen nastoista ei ole juuri nyt näkyvissä. Vedä asteikkoa itseään, kunnes se tulee taas näkyviin.',
    hintTip: 'Siinä se on, pitkällään. Sama asteikko, samat nastat, sama etäisyys niiden välillä.',
    hintSpan: 'Nastojen välissä oleva luku kertoo, kuinka kaukana ne ovat toisistaan. Pane nyt koko laite pitkälleen ja katso tarkkaan, mitä sille tapahtuu.',
    tipBtn: 'Pane pitkälleen',
    standBtn: 'Nosta pystyyn',
    zeroBtn: 'Nolla keskelle',
    nextBtn: 'Toinen kohta',
    printBtn: 'Tulosta asteikko',
    markAAria: 'ensimmäinen nasta. Se täyttää putken omaan lukuunsa asti. Vedä sitä asteikkoa pitkin.',
    markBAria: 'toinen nasta. Se ei koske putkeen. Vedä sitä asteikkoa pitkin.',
    scaleAria: 'asteikko. Vedä sitä päästäksesi kauemmas; napautus tuo nollan takaisin keskelle.',
    gateTitle: 'Lisää kohtia',
    gateBody: 'Yksitoista kohtaa lisää asteikolla järjestyksessä, jossa jokainen kohta yllättää edellisen jälkeen, sekä tulostettava asteikko paperilla työskentelyyn.',
    gateCta: 'Tutustu Opettaja-tilaukseen'
  },
  es: {
    "title": "Bajo cero",
    "instruction": "Pon las dos señales en la escala, arriba o abajo del cero. Arrastra la escala para llegar más lejos por ella y, cuando quieras, pon la herramienta entera de lado.",
    "sceneLabel": "Un tubo largo y angosto y, a un costado, una escala con rayas y números, con dos señales puestas sobre ella. El color del tubo llega hasta la primera señal; la segunda lo deja como está. Entre las dos aparece un número: cuánto las separa. Un botón pone la herramienta entera de lado.",
    "zeroOff": "El cero queda fuera de la escala en este momento.",
    "hintSet": "Las dos señales están en el mismo número, así que no hay nada que las separe. Arrastra una de las dos por la escala.",
    "hintSlide": "Una de las señales quedó fuera de la vista. Arrastra la escala hasta que vuelva a aparecer.",
    "hintTip": "Ahí está, de lado. La misma escala, las mismas señales, la misma distancia entre ellas.",
    "hintSpan": "El número que está entre las dos señales dice cuánto las separa. Ahora pon la herramienta entera de lado y fíjate qué le pasa a ese número.",
    "tipBtn": "Poner el tubo de lado",
    "standBtn": "Poner el tubo de pie",
    "zeroBtn": "Centrar el cero",
    "nextBtn": "Otra parada",
    "printBtn": "Imprimir los tubos",
    "markAAria": "la primera señal, la que llena el tubo hasta su propio número cuando el color está a la vista. Arrástrala por la escala o muévela con las flechas.",
    "markBAria": "la segunda señal, la que deja el tubo como está. Arrástrala por la escala o muévela con las flechas.",
    "scaleAria": "la escala. Arrástrala para alcanzar números más lejanos; al tocarla, el cero vuelve al centro.",
    "gateTitle": "Más paradas",
    "gateBody": "Once paradas más en la escala, ordenadas para que cada una sorprenda después de la anterior, y la hoja para imprimir y trabajar en papel.",
    "gateCta": "Ver el plan Docente"
  },
  pt: {
    "title": "O Tubo que Deita",
    "instruction": "Ponha os dois pinos na escala, acima ou abaixo do zero. Arraste a própria escala para alcançar números mais distantes e, quando quiser, deite o tubo inteiro.",
    "sceneLabel": "Um tubo comprido e estreito, com a escala numerada de um lado e os dois pinos do outro. Quando o tubo aparece pintado, a cor vai até o primeiro pino e para ali; o segundo pino não pinta nada. Entre os dois pinos fica o número da distância de um até o outro. Um botão deita o tubo inteiro.",
    "zeroOff": "Neste momento, o zero está fora da vista.",
    "hintSet": "Os dois pinos estão no mesmo número, e por isso não aparece distância nenhuma. Arraste um deles ao longo da escala.",
    "hintSlide": "Um dos pinos está fora da vista agora. Arraste a própria escala até ele aparecer de novo.",
    "hintTip": "Pronto, o tubo está deitado. A mesma escala, os mesmos pinos, a mesma distância entre eles.",
    "hintSpan": "O número entre os pinos é a distância de um até o outro. Agora deite o tubo inteiro e repare no que acontece com esse número.",
    "tipBtn": "Deitar o tubo",
    "standBtn": "Pôr o tubo de pé",
    "zeroBtn": "Trazer o zero ao meio",
    "nextBtn": "Outra posição",
    "printBtn": "Imprimir o tubo",
    "markAAria": "o primeiro pino, verde-escuro, o que fica mais perto do tubo. Arraste ao longo da escala.",
    "markBAria": "o segundo pino, laranja, o que fica mais afastado do tubo. Arraste ao longo da escala.",
    "scaleAria": "a escala, com os riscos e os números. Arraste ao longo do tubo para alcançar números mais distantes. Um toque traz o zero de volta para o meio.",
    "gateTitle": "Mais posições",
    "gateBody": "Mais onze posições na escala, encadeadas para que cada uma surpreenda depois da anterior, e a folha para imprimir e trabalhar no papel.",
    "gateCta": "Ver o plano Professor"
  },
  it: {
    "title": "Il tubo dei numeri",
    "instruction": "Mettete le due puntine sulla scala dei numeri, sopra o sotto lo zero. Trascinate la scala stessa per arrivare più lontano, e quando siete pronti coricate tutto lo strumento.",
    "sceneLabel": "un tubo lungo e stretto con accanto la scala dei numeri, e sulla scala due puntine. La prima puntina riempie il tubo fino al proprio numero; la seconda lo lascia com’è. Fra le due sta un numero: quanto distano fra loro. Un comando corica tutto lo strumento.",
    "zeroOff": "In questo momento lo zero resta fuori dalla scala.",
    "hintSet": "Le due puntine stanno sullo stesso numero, così fra loro non c’è nessuna distanza. Trascinatene una lungo la scala dei numeri.",
    "hintSlide": "Adesso una delle due puntine è fuori dalla scala dei numeri. Trascinate la scala finché non torna a vedersi.",
    "hintTip": "Eccolo lì, coricato. Stessa scala dei numeri, stesse puntine, stessa distanza fra loro.",
    "hintSpan": "Il numero fra le due puntine dice quanto distano fra loro. Adesso coricate tutto lo strumento e guardate che cosa gli succede.",
    "tipBtn": "Corica lo strumento",
    "standBtn": "Rimettilo in piedi",
    "zeroBtn": "Centra lo zero",
    "nextBtn": "Altre due puntine",
    "printBtn": "Stampa il foglio",
    "markAAria": "la prima puntina. Riempie il tubo fino al proprio numero. Trascinala lungo la scala dei numeri.",
    "markBAria": "la seconda puntina. Lascia il tubo com’è. Trascinala lungo la scala dei numeri.",
    "scaleAria": "la scala dei numeri. Trascinala per arrivare più lontano, nei due sensi; un tocco riporta lo zero al centro.",
    "gateTitle": "Ancora undici sorprese",
    "gateBody": "Altre undici, con le due puntine su numeri nuovi e distanze che tornano uguali da tutt’altra parte della scala dei numeri, e il foglio da stampare: due tubi vuoti, con i soli segni, da numerare a mano.",
    "gateCta": "Il piano Insegnante"
  },
};
