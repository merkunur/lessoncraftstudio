/* =====================================================================
   _lids-strings.js — the in-tool string set for TOOL #39, The Lids
   ---------------------------------------------------------------------
   Data only. `apply-lids-locales.js` reads this and rewrites the
   `strings: { ... }` block in `mini tools/lids.js`.

   EN is authored. The other ten come from a three-person NATIVE panel
   per locale (§A.13.48) — a linguist, a K-3 maths teacher on that
   country's own curriculum, and a B2C education marketer — who REBUILT
   the tool in their language rather than translating it.

   ⭐ FOUR PANELS REJECTED THE OBVIOUS WORD, and each was a collision no
   amount of care in English would have caught:
     es  "Las tapas" -> "Las tapaderas"  ("tapas" reads as bar food)
     fr  "la table"  -> "le plateau"     ("table" reads as *table de
                                          multiplication*, the very
                                          concept this tool builds to)
     nl  "de tafel"  -> "het blad"       (same trap: "de tafels" ARE the
                                          times tables in groep 3/4) and
                                          the tool renamed to "Onder de
                                          deksels" — the question, not
                                          the object
     pt  rejected "tampinhas" for the counters — a tampinha is a bottle
         cap, itself the classic improvised counter, so it would have
         collided head-on with the tampas covering them
   Each locale also chose its own real classroom word for the counters:
   Wendeplättchen · jetons · fichas · gettoni · fiches · brickor ·
   brikker · brikker · nappulat.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    title: "The Lids",
    instruction: "Put down two lids or more. Every lid of the same colour covers the same number of counters — so what one number fits under all of them?",
    hintPlace: "Put down two lids.",
    hintShare: "The same number is under each one. Which number?",
    hintMark: "Park the marker on the number you think it is.",
    hintLift: "Lift the lids.",
    hintLeftover: "Some are left over. They do not fit under a lid.",
    addLid: "Another lid",
    takeLid: "Take one away",
    liftBtn: "Lift the lids",
    againBtn: "Lids back on",
    newSetBtn: "Another table",
    printBtn: "Print the table",
    gateLine: "Bigger totals, the table book and printing are part of the Teacher plan.",
    unlock: "See the Teacher plan",
    totalLabel: "How many counters on the table",
    tableLabel: "the table",
    lidAria: "lid {i}",
    counterAria: "a counter",
    markStrip: "What the class thinks is under each lid",
    markAria: "mark {n}",
    revealAria: "under each lid"
  },

  /* Wendeplättchen; "Aufgabe drucken" not "Tisch drucken" — in German you
     print the task, never the furniture; plural class-facing imperative */
  de: {
    title: "Die Deckel",
    instruction: "Legt zwei oder mehr Deckel hin. Unter jedem Deckel derselben Farbe liegen gleich viele Wendeplättchen – welche Zahl passt unter alle?",
    hintPlace: "Legt zwei Deckel hin.",
    hintShare: "Unter jedem Deckel liegen gleich viele Plättchen. Wie viele sind es?",
    hintMark: "Setzt den Marker auf die Zahl, die ihr vermutet.",
    hintLift: "Hebt die Deckel an.",
    hintLeftover: "Einige Plättchen bleiben übrig – sie passen unter keinen Deckel.",
    addLid: "Deckel dazu",
    takeLid: "Deckel weg",
    liftBtn: "Deckel anheben",
    againBtn: "Deckel drauf",
    newSetBtn: "Neuer Tisch",
    printBtn: "Aufgabe drucken",
    gateLine: "Größere Anzahlen, das Aufgabenheft und das Drucken gehören zum Lehrer-Paket.",
    unlock: "Lehrer-Paket ansehen",
    totalLabel: "Anzahl der Plättchen auf dem Tisch",
    tableLabel: "Tisch",
    lidAria: "Deckel {i}",
    counterAria: "ein Wendeplättchen",
    markStrip: "Was die Klasse unter jedem Deckel vermutet",
    markAria: "Marke {n}",
    revealAria: "unter jedem Deckel"
  },

  /* jetons; "le plateau" and NEVER "la table" — see the file header */
  fr: {
    title: "Les couvercles",
    instruction: "Posez deux couvercles ou plus : tous les couvercles de la même couleur cachent le même nombre de jetons, alors quel est ce nombre ?",
    hintPlace: "Posez deux couvercles.",
    hintShare: "Il y a le même nombre de jetons sous chaque couvercle. Lequel ?",
    hintMark: "Placez le repère sur le nombre que vous proposez.",
    hintLift: "Soulevez les couvercles.",
    hintLeftover: "Il reste des jetons : ils ne tiennent sous aucun couvercle.",
    addLid: "Ajouter",
    takeLid: "Retirer",
    liftBtn: "Soulever",
    againBtn: "Recouvrir",
    newSetBtn: "Autre plateau",
    printBtn: "Imprimer",
    gateLine: "Les plus grands totaux, le carnet de plateaux et l'impression font partie de l'offre Enseignant.",
    unlock: "Voir l'offre Enseignant",
    totalLabel: "Nombre de jetons sur le plateau",
    tableLabel: "le plateau",
    lidAria: "couvercle {i}",
    counterAria: "un jeton",
    markStrip: "Ce que la classe pense qu'il y a sous chaque couvercle",
    markAria: "repère {n}",
    revealAria: "sous chaque couvercle"
  },

  /* renamed to "Las tapaderas"; fichas; nosotros imperative for
     pan-Hispanic neutrality (identical in Spain and Latin America) */
  es: {
    title: "Las tapaderas",
    instruction: "Pongamos dos tapaderas o más. Todas las del mismo color cubren la misma cantidad de fichas: ¿qué número cabe debajo de todas?",
    hintPlace: "Pongamos dos tapaderas.",
    hintShare: "Debajo de cada una hay la misma cantidad. ¿Cuál es ese número?",
    hintMark: "Pongamos la marca en el número que creemos que está debajo.",
    hintLift: "Levantemos las tapaderas.",
    hintLeftover: "Sobran algunas fichas: no caben debajo de ninguna tapadera.",
    addLid: "Otra tapadera",
    takeLid: "Quitar una",
    liftBtn: "Destapar",
    againBtn: "Volver a tapar",
    newSetBtn: "Otra mesa",
    printBtn: "Imprimir la mesa",
    gateLine: "Los totales más grandes, la colección de mesas y la impresión forman parte del plan Docente.",
    unlock: "Ver el plan Docente",
    totalLabel: "Cuántas fichas hay en la mesa",
    tableLabel: "la mesa",
    lidAria: "tapadera {i}",
    counterAria: "una ficha",
    markStrip: "Lo que la clase cree que hay debajo de cada tapadera",
    markAria: "marca {n}",
    revealAria: "debajo de cada tapadera"
  },

  /* fichas, NOT tampinhas (bottle caps — the classic improvised counter,
     which would collide with the tampas covering them); "embaixo de" is
     the everyday Brazilian form */
  pt: {
    title: "As tampas",
    instruction: "Coloquem duas tampas ou mais. Cada tampa da mesma cor cobre a mesma quantidade de fichas — então, que número cabe embaixo de todas elas?",
    hintPlace: "Coloquem duas tampas.",
    hintShare: "Embaixo de cada tampa há a mesma quantidade. Que número será?",
    hintMark: "Coloquem o marcador no número que a turma acha que é.",
    hintLift: "Levantem as tampas.",
    hintLeftover: "Sobraram algumas fichas. Elas não cabem embaixo de nenhuma tampa.",
    addLid: "Outra tampa",
    takeLid: "Tirar uma tampa",
    liftBtn: "Destampar",
    againBtn: "Tampar de novo",
    newSetBtn: "Outra mesa",
    printBtn: "Imprimir a mesa",
    gateLine: "Totais maiores, o caderno de mesas prontas e a impressão fazem parte do plano Professor.",
    unlock: "Ver o plano Professor",
    totalLabel: "Quantas fichas há na mesa",
    tableLabel: "a mesa",
    lidAria: "tampa {i}",
    counterAria: "uma ficha",
    markStrip: "O que a turma acha que há embaixo de cada tampa",
    markAria: "marcar {n}",
    revealAria: "embaixo de cada tampa"
  },

  /* gettoni (not tappi, which would name bottle caps and clash with the
     coperchi); "avanzare" is how an Italian teacher names a remainder
     at classe 1/2 without notation */
  it: {
    title: "I coperchi",
    instruction: "Metti due coperchi o più: ogni coperchio dello stesso colore copre lo stesso numero di gettoni, e allora quale numero sta sotto tutti quanti?",
    hintPlace: "Metti giù due coperchi.",
    hintShare: "Sotto ognuno c'è lo stesso numero. Quale?",
    hintMark: "Metti il segnalino sul numero che secondo voi c'è sotto.",
    hintLift: "Ora alza i coperchi.",
    hintLeftover: "Alcuni gettoni sono avanzati: non stanno sotto nessun coperchio.",
    addLid: "Aggiungi coperchio",
    takeLid: "Togli un coperchio",
    liftBtn: "Alza i coperchi",
    againBtn: "Rimetti i coperchi",
    newSetBtn: "Un altro tavolo",
    printBtn: "Stampa il tavolo",
    gateLine: "I totali più grandi, la raccolta di tavoli e la stampa fanno parte del piano Insegnante.",
    unlock: "Scopri il piano Insegnante",
    totalLabel: "Quanti gettoni ci sono sul tavolo",
    tableLabel: "il tavolo",
    lidAria: "coperchio {i}",
    counterAria: "un gettone",
    markStrip: "Il numero che la classe pensa ci sia sotto ogni coperchio",
    markAria: "numero {n}",
    revealAria: "sotto ogni coperchio"
  },

  /* renamed to "Onder de deksels" (the question, not the object); fiches;
     "het blad" and NEVER "de tafel" — see the file header */
  nl: {
    title: "Onder de deksels",
    instruction: "Leg twee of meer deksels neer. Onder elk deksel van dezelfde kleur liggen evenveel fiches — welk getal past er dan onder allemaal?",
    hintPlace: "Leg twee deksels neer.",
    hintShare: "Onder elk deksel liggen er evenveel. Welk getal is dat?",
    hintMark: "Zet het pijltje op het getal dat de klas kiest.",
    hintLift: "Til de deksels op.",
    hintLeftover: "Er blijven er over. Die passen niet onder een deksel.",
    addLid: "Nog een deksel",
    takeLid: "Deksel weghalen",
    liftBtn: "Deksels optillen",
    againBtn: "Deksels terug",
    newSetBtn: "Ander blad",
    printBtn: "Blad printen",
    gateLine: "Grotere aantallen, alle bladen en printen horen bij het Leerkracht-pakket.",
    unlock: "Bekijk het Leerkracht-pakket",
    totalLabel: "Hoeveel fiches er op het blad liggen",
    tableLabel: "het blad",
    lidAria: "deksel {i}",
    counterAria: "een fiche",
    markStrip: "Wat de klas denkt dat er onder elk deksel ligt",
    markAria: "getal {n}",
    revealAria: "onder elk deksel"
  },

  /* brickor (räknebrickor). "Locken" is unambiguous in exactly the form
     shown: the definite plural of *ett lock* is "locken", while the
     hair-curl homonym *en lock* takes "lockarna". "Lyft PÅ locken" is
     the natural collocation. */
  sv: {
    title: "Locken",
    instruction: "Lägg ut två lock eller fler. Alla lock i samma färg döljer lika många brickor – vilket tal passar under vart och ett?",
    hintPlace: "Lägg ut två lock.",
    hintShare: "Det ligger lika många under varje lock. Vilket tal?",
    hintMark: "Sätt markören på det tal ni tror det är.",
    hintLift: "Lyft på locken.",
    hintLeftover: "Några blir över. De får inte plats under något lock.",
    addLid: "Ett lock till",
    takeLid: "Ta bort ett",
    liftBtn: "Lyft på locken",
    againBtn: "Lock på igen",
    newSetBtn: "Nytt bord",
    printBtn: "Skriv ut bordet",
    gateLine: "Större antal, bordssamlingen och utskrift ingår i Lärarpaketet.",
    unlock: "Se Lärarpaketet",
    totalLabel: "Hur många brickor på bordet",
    tableLabel: "bordet",
    lidAria: "lock {i}",
    counterAria: "en bricka",
    markStrip: "Det klassen tror ligger under varje lock",
    markAria: "markera {n}",
    revealAria: "under varje lock"
  },

  /* brikker (tællebrikker). Single definiteness throughout —
     "hvert låg", never "hvert låget". */
  da: {
    title: "Lågene",
    instruction: "Læg to eller flere låg på bordet. Låg i samme farve dækker lige mange brikker – så hvilket tal ligger under dem alle?",
    hintPlace: "Læg to låg på bordet.",
    hintShare: "Der ligger lige mange under hvert låg. Hvilket tal er det?",
    hintMark: "Sæt markøren på det tal, I gætter på.",
    hintLift: "Løft lågene.",
    hintLeftover: "Nogle brikker er til overs. De kan ikke være under et låg.",
    addLid: "Et låg mere",
    takeLid: "Tag et væk",
    liftBtn: "Løft lågene",
    againBtn: "Låg på igen",
    newSetBtn: "Nyt bord",
    printBtn: "Print bordet",
    gateLine: "Større tal, samlingen af borde og print er en del af Lærerabonnementet.",
    unlock: "Se Lærerabonnementet",
    totalLabel: "Antal brikker på bordet",
    tableLabel: "bordet",
    lidAria: "låg {i}",
    counterAria: "en brik",
    markStrip: "Det tal, klassen tror, der ligger under hvert låg",
    markAria: "markér {n}",
    revealAria: "under hvert låg"
  },

  /* brikker (tellebrikker). "Lokkene" is the definite plural of the
     NEUTER *et lokk* (a lid); the homograph *en lokk* (a lock of hair)
     and the verb *å lokke* (to lure) are ruled out by the setting. */
  no: {
    title: "Lokkene",
    instruction: "Legg to eller flere lokk på bordet. Alle lokk i samme farge dekker like mange brikker – hvilket tall passer under hvert av dem?",
    hintPlace: "Legg to lokk på bordet.",
    hintShare: "Det er like mange under hvert lokk. Hvilket tall er det?",
    hintMark: "Sett markøren på det tallet dere tror.",
    hintLift: "Løft lokkene.",
    hintLeftover: "Noen brikker blir til overs. De får ikke plass under et lokk.",
    addLid: "Ett lokk til",
    takeLid: "Ta bort ett",
    liftBtn: "Løft lokkene",
    againBtn: "Legg på lokkene",
    newSetBtn: "Nytt bord",
    printBtn: "Skriv ut bordet",
    gateLine: "Større tall, bordsamlingen og utskrift er en del av Lærerabonnementet.",
    unlock: "Se Lærerabonnementet",
    totalLabel: "Antall brikker på bordet",
    tableLabel: "bordet",
    lidAria: "lokk {i}",
    counterAria: "en brikke",
    markStrip: "Det klassen tror ligger under hvert lokk",
    markAria: "marker {n}",
    revealAria: "under hvert lokk"
  },

  /* renamed to "Kannen alla" — bare "Kannet" reads first as book COVERS
     and is generic, so the tool is named after the routine the teacher
     says out loud (the Finnish singular is the idiomatic way to mean
     "under each one"). Counters are "laskunapit", spelled out once in
     the instruction and shortened to napit/nappi elsewhere.
     ⚠ markAria is "luku {n}" (number {n}) and NOT "merkki {n}": each
     strip item is a numeral, while the merkki is the single marker the
     class moves onto it — and the numeral survives as a bare nominative
     after the noun, so the case trap does not arise. */
  fi: {
    title: "Kannen alla",
    instruction: "Asettakaa pöydälle vähintään kaksi kantta: samanvärisen kannen alla on aina yhtä monta laskunappia, joten mikä sama luku sopii jokaisen kannen alle?",
    hintPlace: "Asettakaa pöydälle kaksi kantta.",
    hintShare: "Jokaisen kannen alla on yhtä monta nappia. Mikä luku se on?",
    hintMark: "Siirtäkää merkki sen luvun kohdalle, jonka luokka arvaa.",
    hintLift: "Nyt voitte nostaa kannet.",
    hintLeftover: "Osa napeista jäi yli. Ne eivät jakaudu tasan kansien alle.",
    addLid: "Lisää kansi",
    takeLid: "Poista kansi",
    liftBtn: "Nosta kannet",
    againBtn: "Kannet päälle",
    newSetBtn: "Vaihda pöytä",
    printBtn: "Tulosta pöytä",
    gateLine: "Opettaja-tilaus sisältää suuremmat lukumäärät, valmiiden pöytien kokoelman ja tulostuksen.",
    unlock: "Katso Opettaja-tilaus",
    totalLabel: "Montako nappia pöydällä on",
    tableLabel: "pöytä",
    lidAria: "kansi {i}",
    counterAria: "nappi",
    markStrip: "Mitä luokka arvelee kunkin kannen alla olevan",
    markAria: "luku {n}",
    revealAria: "jokaisen kannen alla"
  }
};
