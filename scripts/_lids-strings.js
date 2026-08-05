/* =====================================================================
   _lids-strings.js — the in-tool string set for TOOL #39, The Lids
   ---------------------------------------------------------------------
   Data only. `apply-lids-locales.js` reads this and rewrites the
   `strings: { ... }` block in `mini tools/lids.js`.

   EN is authored. The other ten come from a three-person NATIVE panel
   per locale (§A.13.48) — a linguist, a K-3 maths teacher on that
   country's own curriculum, and a B2C education marketer — who REBUILT
   the tool in their language rather than translating it.

   ⭐⭐ 2026-08 REBUILD: THE ELEVEN PANELS WERE HANDED THE ENGLISH AS A
   SOURCE TO AUDIT, NOT AS A TARGET — and they found eleven defects in it,
   several of which I had introduced that same hour while fixing others:

     · "of the same colour" was a FALSE CLAIM SHIPPED IN ELEVEN LOCALES.
       `.lid-lid` has exactly one background-color; there has never been a
       second lid colour. The clause implied a differently-coloured lid
       might hide a different number — the precise opposite of the value
       lock. Eight locales carried it. All eleven now drop it.
     · `markAria` still said "mark {n}", reintroducing in the accessible
       layer the very noun `hintMark` had just been rewritten to remove.
       Five panels caught it independently; it/nl/fi had already fixed it
       in their own blocks, so English was the only locale still wrong.
     · `hintAgain` is FALSE at four lids, where the tool refuses a fifth.
       Six panels caught it. It is now guarded in the ladder.
     · The three refusals were unreachable behind `disabled` buttons, and
       would have been spoken for the WRONG REASON if dispatched on a
       null return — `setTotal` refuses for three different reasons and
       `placeGuess` for two. Four panels caught it.
     · `gateLine` sold "the table book" when the free tier already ships
       eight tables — a paywall on something the copy calls free.
     · `lidsAria` "lids down" is FALSE once the lids are up (it).
     · `refuseLifted` said "choose again" when the class may never have
       chosen: the lift is not gated on a guess existing (da).
     · `printBtn` printed the furniture — the German panel had made this
       exact correction on a sibling tool and it was never carried back.
     · And my own "fix" for `markStrip` christened "the number strip", a
       FOURTH named part in a three-part tool (pt) — the recorded #41
       defect, committed while repairing something else.

   ⚠ The Finnish panel also MEASURED a live defect in the gate: JS `\b` is
   ASCII-only even under /u, so `/\bpöytä\b/` is FALSE on "pöytä" and TRUE
   on "pöytäliina" — exactly inverted. verify-lids' Finnish verdict ban
   worked only by luck (its three tokens happen to start and end with
   ASCII letters). Bans are now (?<!\p{L})…(?!\p{L}) with /u.

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
     fi  "Kannet" -> "Kannen alla": bare "Kannet" reads first as book
         COVERS, so the tool is named after the routine instead
   And three more in this round: nl "Blad printen" -> "Werkblad printen"
   (in Dutch *blad* is itself a sheet of paper, so the old label was
   ambiguous between the tool and the printout); da `tal {n}` was refused
   because bare `tal` is the imperative of *at tale*, so a screen reader
   would have announced "speak 6" — hence `tallet {n}`; and sv checked
   every definite form after the recorded `bana`/`banan` trap.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    title: "The Lids",
    instruction: "Drag two lids onto the table — or three, or four. Every lid covers the same number of counters, so what one number fits under all of them?",

    hintPlace: "Drag a lid onto the table. Put down two.",
    hintRule: "Every lid covers the same number of counters.",
    hintShare: "Which number is under each lid?",
    hintMark: "Choose a number below.",
    hintLift: "Now lift the lids.",
    hintLeftover: "Some counters are left over. They do not fit under a lid.",
    hintExact: "Every counter is under a lid. None are left over.",
    hintAgain: "Put the lids back on, then put another one down.",

    firstLid: "Put a lid down",
    addLid: "Another lid",
    takeLid: "Take one away",
    liftBtn: "Lift the lids",
    againBtn: "Lids back on",
    newSetBtn: "Another table",
    printBtn: "Print the worksheet",

    refuseTotal: "Lids are on the table. Take them away before you change the number of counters.",
    refuseLifted: "The lids are up. Put them back on to choose a number.",
    refuseMax: "The table has no room for another lid.",

    gateLine: "Bigger totals, more ready-made tables and printing are part of the Teacher plan.",
    unlock: "See the Teacher plan",

    totalLabel: "Counters on the table",
    tableLabel: "the table",
    lidAria: "lid {i}",
    countersAria: "counters in all",
    lidsAria: "lids on the table",
    looseAria: "counters outside the lids",
    markStrip: "The class's number, and what was under each lid",
    markAria: "number {n}",
    revealAria: "under each lid",
    recordAria: "the previous round",

    setGhosts: "Show the dashed circles",
    setStrip: "Show the numbers",

    sheetTask: "Every lid covers the same number of counters. Share them out under the lids, then write how many go under each lid and how many are left over.",
    sheetRecordHead: "What we found"
  },

  /* Wendeplättchen; "Aufgabe drucken" not "Tisch drucken" — in German you
     print the task, never the furniture; plural class-facing imperative.
     `Plättchen insgesamt` rather than `auf dem Tisch`, because the value
     is the TOTAL and the covered counters are absent from the tree. */
  de: {
    title: "Die Deckel",
    instruction: "Zieht zwei Deckel auf den Tisch. Unter jedem Deckel liegen gleich viele Wendeplättchen – welche Zahl passt unter alle Deckel?",

    hintPlace: "Zieht einen Deckel auf den Tisch – und dann noch einen.",
    hintRule: "Jeder Deckel deckt gleich viele Plättchen zu.",
    hintShare: "Welche Zahl liegt unter jedem Deckel?",
    hintMark: "Wählt unten eine Zahl aus.",
    hintLift: "Hebt jetzt die Deckel an.",
    hintLeftover: "Einige Plättchen bleiben übrig – sie passen unter keinen Deckel.",
    hintExact: "Alle Plättchen liegen unter einem Deckel – es bleibt keines übrig.",
    hintAgain: "Legt die Deckel wieder drauf und dann noch einen dazu.",

    firstLid: "Deckel hinlegen",
    addLid: "Deckel dazu",
    takeLid: "Deckel weg",
    liftBtn: "Deckel anheben",
    againBtn: "Deckel drauf",
    newSetBtn: "Neuer Tisch",
    printBtn: "Aufgabe drucken",

    refuseTotal: "Auf dem Tisch liegen Deckel. Nehmt sie weg, bevor ihr die Anzahl ändert.",
    refuseLifted: "Die Deckel sind oben. Legt sie wieder drauf, um eine Zahl zu wählen.",
    refuseMax: "Mehr Deckel passen nicht auf den Tisch.",

    gateLine: "Größere Anzahlen, mehr fertige Tische und das Drucken gehören zum Lehrer-Paket.",
    unlock: "Lehrer-Paket ansehen",

    totalLabel: "Plättchen auf dem Tisch",
    tableLabel: "der Tisch",
    lidAria: "Deckel {i}",
    countersAria: "Plättchen insgesamt",
    lidsAria: "Deckel auf dem Tisch",
    looseAria: "außerhalb der Deckel",
    markStrip: "Die Zahl der Klasse und was unter jedem Deckel lag",
    markAria: "Zahl {n}",
    revealAria: "unter jedem Deckel",
    recordAria: "der Durchgang davor",

    setGhosts: "Gestrichelte Kreise anzeigen",
    setStrip: "Zahlen anzeigen",

    sheetTask: "Unter jedem Deckel liegen gleich viele Plättchen. Verteile sie unter die Deckel und schreibe auf, wie viele unter jeden Deckel kommen und wie viele übrig bleiben.",
    sheetRecordHead: "Das haben wir herausgefunden"
  },

  /* `le plateau`, never `la table` — see the header. "Imprimer la fiche",
     not "imprimer le plateau": in French you print a worksheet, never a
     tray. `nombre {n}` replaces `repère {n}`, which was the last surviving
     marker after hintMark dropped it. */
  fr: {
    title: "Les couvercles",
    instruction: "Faites glisser deux couvercles sur le plateau, ou trois, ou quatre : sous chaque couvercle il y a le même nombre de jetons. Quel est ce nombre ?",

    hintPlace: "Faites glisser un couvercle sur le plateau, puis un deuxième.",
    hintRule: "Tous les couvercles cachent le même nombre de jetons.",
    hintShare: "Quel nombre est caché sous chaque couvercle ?",
    hintMark: "Choisissez un nombre ci-dessous.",
    hintLift: "Soulevez maintenant les couvercles.",
    hintLeftover: "Il reste des jetons : ils ne tiennent sous aucun couvercle.",
    hintExact: "Tous les jetons sont sous un couvercle : il n'en reste aucun.",
    hintAgain: "Recouvrez, puis posez un couvercle de plus.",

    firstLid: "Poser un couvercle",
    addLid: "Un couvercle de plus",
    takeLid: "Retirer un couvercle",
    liftBtn: "Soulever les couvercles",
    againBtn: "Recouvrir",
    newSetBtn: "Autre plateau",
    printBtn: "Imprimer la fiche",

    refuseTotal: "Des couvercles sont posés. Retirez-les avant de changer le nombre de jetons.",
    refuseLifted: "Les couvercles sont soulevés. Recouvrez pour choisir un nombre.",
    refuseMax: "Il n'y a plus de place pour un couvercle sur le plateau.",

    gateLine: "Les plus grands totaux, d'autres plateaux prêts à l'emploi et l'impression font partie de l'offre Enseignant.",
    unlock: "Voir l'offre Enseignant",

    totalLabel: "Jetons sur le plateau",
    tableLabel: "le plateau",
    lidAria: "couvercle {i}",
    countersAria: "jetons en tout",
    lidsAria: "couvercles posés",
    looseAria: "jetons hors couvercle",
    markStrip: "Le nombre de la classe et ce qu'il y avait sous chaque couvercle",
    markAria: "nombre {n}",
    revealAria: "sous chaque couvercle",
    recordAria: "le tour précédent",

    setGhosts: "Montrer les cercles en pointillés",
    setStrip: "Montrer les nombres",

    sheetTask: "Sous chaque couvercle il y a le même nombre de jetons. Partage-les sous les couvercles, puis écris combien il y en a sous chaque couvercle et combien il en reste.",
    sheetRecordHead: "Ce que nous avons trouvé"
  },

  /* `Las tapaderas`, never `Las tapas`. "Imprimir la hoja", not "la
     ficha" — *ficha* is already the counter here. Inclusive nosotros
     voice on screen; the printed sheet switches to tú, because one child
     reads it alone. */
  es: {
    title: "Las tapaderas",
    instruction: "Arrastremos dos tapaderas a la mesa, o tres, o cuatro. Cada tapadera cubre la misma cantidad de fichas: ¿qué número cabe debajo de todas?",

    hintPlace: "Arrastremos dos tapaderas a la mesa.",
    hintRule: "Todas las tapaderas cubren la misma cantidad de fichas.",
    hintShare: "¿Qué número hay debajo de cada tapadera?",
    hintMark: "Elijamos un número aquí abajo.",
    hintLift: "Levantemos ahora las tapaderas.",
    hintLeftover: "Sobran algunas fichas: no caben debajo de ninguna tapadera.",
    hintExact: "Todas las fichas están debajo de una tapadera. No sobra ninguna.",
    hintAgain: "Volvamos a tapar y pongamos una tapadera más.",

    firstLid: "Poner una tapadera",
    addLid: "Otra tapadera",
    takeLid: "Quitar una",
    liftBtn: "Destapar",
    againBtn: "Volver a tapar",
    newSetBtn: "Otra mesa",
    printBtn: "Imprimir la hoja",

    refuseTotal: "Hay tapaderas en la mesa. Quitémoslas antes de cambiar la cantidad de fichas.",
    refuseLifted: "Las tapaderas están levantadas. Volvamos a taparlas para elegir un número.",
    refuseMax: "En la mesa no cabe otra tapadera.",

    gateLine: "Los totales más grandes, más mesas preparadas y la impresión forman parte del plan Docente.",
    unlock: "Ver el plan Docente",

    totalLabel: "Fichas en la mesa",
    tableLabel: "la mesa",
    lidAria: "tapadera {i}",
    countersAria: "fichas en total",
    lidsAria: "tapaderas en la mesa",
    looseAria: "fichas fuera de las tapaderas",
    markStrip: "El número de la clase y lo que había debajo de cada tapadera",
    markAria: "número {n}",
    revealAria: "debajo de cada tapadera",
    recordAria: "la ronda anterior",

    setGhosts: "Mostrar los círculos punteados",
    setStrip: "Mostrar los números",

    sheetTask: "Cada tapadera cubre la misma cantidad de fichas. Repártelas debajo de las tapaderas y escribe cuántas hay debajo de cada una y cuántas sobran.",
    sheetRecordHead: "Lo que descubrimos"
  },

  /* pt-BR. `tampinhas` stays rejected for the counters. "Imprimir a
     folha" — in Portuguese you print the task, not the furniture.
     gateLine says "mais mesas prontas": the free tier already ships
     eight, so selling "the collection" would sell what is already free. */
  pt: {
    title: "As tampas",
    instruction: "Arrastem duas tampas para a mesa, ou três, ou quatro. Cada tampa cobre a mesma quantidade de fichas — então, que número cabe embaixo de todas elas?",

    hintPlace: "Arrastem uma tampa para a mesa. Coloquem duas.",
    hintRule: "Cada tampa cobre a mesma quantidade de fichas.",
    hintShare: "Que número está embaixo de cada tampa?",
    hintMark: "Escolham um número aqui embaixo.",
    hintLift: "Agora levantem as tampas.",
    hintLeftover: "Sobraram algumas fichas. Elas não cabem embaixo de nenhuma tampa.",
    hintExact: "Todas as fichas estão embaixo das tampas. Não sobrou nenhuma.",
    hintAgain: "Tampem de novo e coloquem mais uma tampa.",

    firstLid: "Colocar uma tampa",
    addLid: "Outra tampa",
    takeLid: "Tirar uma tampa",
    liftBtn: "Destampar",
    againBtn: "Tampar de novo",
    newSetBtn: "Outra mesa",
    printBtn: "Imprimir a folha",

    refuseTotal: "Há tampas na mesa. Tirem as tampas antes de mudar a quantidade de fichas.",
    refuseLifted: "As tampas estão levantadas. Tampem de novo para escolher um número.",
    refuseMax: "Não cabe mais nenhuma tampa na mesa.",

    gateLine: "Totais maiores, mais mesas prontas e a impressão fazem parte do plano Professor.",
    unlock: "Ver o plano Professor",

    totalLabel: "Fichas na mesa",
    tableLabel: "a mesa",
    lidAria: "tampa {i}",
    countersAria: "fichas no total",
    lidsAria: "tampas na mesa",
    looseAria: "fichas fora das tampas",
    markStrip: "O número da turma e o que havia embaixo de cada tampa",
    markAria: "número {n}",
    revealAria: "embaixo de cada tampa",
    recordAria: "a rodada anterior",

    setGhosts: "Mostrar os círculos tracejados",
    setStrip: "Mostrar os números",

    sheetTask: "Cada tampa cobre a mesma quantidade de fichas. Reparta as fichas embaixo das tampas e escreva quantas ficam embaixo de cada tampa e quantas sobraram.",
    sheetRecordHead: "O que descobrimos"
  },

  /* tu-imperative throughout (the shipped block had one voi slip), and
     every visible string shorter than what it replaced: Italian is the
     longest locale in the set and the card has a hard height budget.
     "Stampa la scheda", not the furniture. */
  it: {
    title: "I coperchi",
    instruction: "Trascina due coperchi sul tavolo, o tre, o quattro: sotto ognuno c'è lo stesso numero di gettoni. Quale numero sta sotto tutti?",

    hintPlace: "Trascina un coperchio sul tavolo. Mettine giù due.",
    hintRule: "Ogni coperchio copre la stessa quantità di gettoni.",
    hintShare: "Quale numero sta sotto ogni coperchio?",
    hintMark: "Scegli un numero qui sotto.",
    hintLift: "Ora alza i coperchi.",
    hintLeftover: "Alcuni gettoni sono avanzati: non stanno sotto nessun coperchio.",
    hintExact: "Tutti i gettoni stanno sotto i coperchi: non ne avanza nessuno.",
    hintAgain: "Rimetti i coperchi e mettine giù un altro.",

    firstLid: "Metti un coperchio",
    addLid: "Aggiungi un coperchio",
    takeLid: "Togli un coperchio",
    liftBtn: "Alza i coperchi",
    againBtn: "Rimetti i coperchi",
    newSetBtn: "Un altro tavolo",
    printBtn: "Stampa la scheda",

    refuseTotal: "Togli i coperchi prima di cambiare il numero di gettoni.",
    refuseLifted: "I coperchi sono alzati: rimettili per scegliere un numero.",
    refuseMax: "Sul tavolo non c'è posto per un altro coperchio.",

    gateLine: "Più gettoni, altri tavoli pronti e la stampa fanno parte del piano Insegnante.",
    unlock: "Scopri il piano Insegnante",

    totalLabel: "Gettoni sul tavolo",
    tableLabel: "il tavolo",
    lidAria: "coperchio {i}",
    countersAria: "gettoni in tutto",
    lidsAria: "coperchi sul tavolo",
    looseAria: "fuori dai coperchi",
    markStrip: "Il numero della classe e quello che stava sotto ogni coperchio",
    markAria: "numero {n}",
    revealAria: "sotto ogni coperchio",
    recordAria: "il giro precedente",

    setGhosts: "Mostra i cerchi tratteggiati",
    setStrip: "Mostra i numeri",

    sheetTask: "Ogni coperchio copre la stessa quantità di gettoni. Dividili sotto i coperchi, poi scrivi quanti ne vanno sotto ogni coperchio e quanti ne avanzano.",
    sheetRecordHead: "Che cosa abbiamo trovato"
  },

  /* `het blad`, never `de tafel` — see the header. "Werkblad printen",
     not "Blad printen": in Dutch *blad* is itself a sheet of paper, so
     the old label was ambiguous between the tool and the printout.
     `aantal …` on the three aria labels, because "fiches op het blad: 1"
     is not Dutch and "aantal fiches op het blad: 1" is. */
  nl: {
    title: "Onder de deksels",
    instruction: "Sleep twee deksels op het blad, of drie, of vier. Onder elk deksel liggen evenveel fiches — welk getal past er dan onder allemaal?",

    hintPlace: "Sleep een deksel naar een stippelrondje. Leg er twee neer.",
    hintRule: "Onder elk deksel liggen evenveel fiches.",
    hintShare: "Welk getal ligt er onder elk deksel?",
    hintMark: "Kies hieronder een getal.",
    hintLift: "Til nu de deksels op.",
    hintLeftover: "Er blijven fiches over. Die passen niet onder een deksel.",
    hintExact: "Elke fiche ligt onder een deksel. Er blijft niets over.",
    hintAgain: "Leg de deksels terug en leg er dan nog een bij.",

    firstLid: "Deksel neerleggen",
    addLid: "Nog een deksel",
    takeLid: "Deksel weghalen",
    liftBtn: "Deksels optillen",
    againBtn: "Deksels terug",
    newSetBtn: "Ander blad",
    printBtn: "Werkblad printen",

    refuseTotal: "Er liggen deksels op het blad. Haal ze eerst weg.",
    refuseLifted: "De deksels zijn omhoog. Leg ze terug om een getal te kiezen.",
    refuseMax: "Er past geen deksel meer op het blad.",

    gateLine: "Grotere aantallen, meer kant-en-klare bladen en printen horen bij het Leerkracht-pakket.",
    unlock: "Bekijk het Leerkracht-pakket",

    totalLabel: "Fiches op het blad",
    tableLabel: "het blad",
    lidAria: "deksel {i}",
    countersAria: "aantal fiches in totaal",
    lidsAria: "aantal deksels op het blad",
    looseAria: "aantal fiches zonder deksel",
    markStrip: "Het getal van de klas en wat er onder elk deksel lag",
    markAria: "getal {n}",
    revealAria: "onder elk deksel",
    recordAria: "de vorige ronde",

    setGhosts: "Laat de stippelrondjes zien",
    setStrip: "Laat de getallen zien",

    sheetTask: "Onder elk deksel liggen evenveel fiches. Verdeel ze eerlijk onder de deksels en schrijf op hoeveel er onder elk deksel liggen en hoeveel er overblijven.",
    sheetRecordHead: "Wat we gevonden hebben"
  },

  /* every definite form checked after the recorded bana/banan trap:
     lock -> locken (the *en lock* hair-curl homonym takes lockarna, so
     the shown form is unambiguous), bricka -> brickorna, bord -> bordet,
     tal -> talen, omgång anchored as *förra omgången* because the bare
     definite is also a participle of *omge*. `nedanför`, never `under`:
     in this tool *under* belongs to the lids. */
  sv: {
    title: "Locken",
    instruction: "Dra ut två lock på bordet, eller tre, eller fyra. Under varje lock ligger lika många brickor – vilket tal passar under alla?",

    hintPlace: "Dra ett lock till en streckad ring. Lägg ut två.",
    hintRule: "Under varje lock ligger lika många brickor.",
    hintShare: "Vilket tal ligger under varje lock?",
    hintMark: "Välj ett av talen nedanför.",
    hintLift: "Lyft nu på locken.",
    hintLeftover: "Några brickor blir över. De får inte plats under något lock.",
    hintExact: "Alla brickor ligger under locken. Inga blir över.",
    hintAgain: "Lägg på locken igen och lägg ut ett lock till.",

    firstLid: "Lägg ut ett lock",
    addLid: "Ett lock till",
    takeLid: "Ta bort ett",
    liftBtn: "Lyft på locken",
    againBtn: "Lock på igen",
    newSetBtn: "Nytt bord",
    printBtn: "Skriv ut uppgiften",

    refuseTotal: "Locken ligger på bordet. Ta bort dem innan ni ändrar antalet.",
    refuseLifted: "Locken är uppe. Lägg på dem igen för att välja ett tal.",
    refuseMax: "Det får inte plats fler lock på bordet.",

    gateLine: "Större antal, fler färdiga bord och utskrift ingår i Lärarpaketet.",
    unlock: "Se Lärarpaketet",

    totalLabel: "Brickor på bordet",
    tableLabel: "bordet",
    lidAria: "lock {i}",
    countersAria: "brickor totalt",
    lidsAria: "lock på bordet",
    looseAria: "brickor utanför locken",
    markStrip: "Klassens tal och vad som låg under varje lock",
    markAria: "tal {n}",
    revealAria: "under varje lock",
    recordAria: "förra omgången",

    setGhosts: "Visa de streckade ringarna",
    setStrip: "Visa talen",

    sheetTask: "Under varje lock ligger lika många brickor. Dela ut dem under locken och skriv hur många som ligger under varje lock och hur många som blir över.",
    sheetRecordHead: "Vad vi kom fram till"
  },

  /* every definite form checked: låg -> lågene (no collision with *en
     låge* -> lågerne, nor with lår -> lårene), brik -> brikkerne.
     ⚠ `tallet {n}`, NOT `tal {n}`: bare *tal* is the imperative of *at
     tale*, so a screen reader would announce "speak 6". The refusals use
     impersonal passives, because a refusal is aimed at whoever pressed
     the control, not at the class the hints address as *I*. */
  da: {
    title: "Lågene",
    instruction: "Træk to låg ud på bordet, eller tre, eller fire. Under hvert låg ligger der lige mange brikker – så hvilket tal ligger under dem alle?",

    hintPlace: "Træk et låg ud på en stiplet cirkel. Læg to låg.",
    hintRule: "Under hvert låg ligger der lige mange brikker.",
    hintShare: "Hvilket tal ligger under hvert låg?",
    hintMark: "Vælg et af tallene nedenfor.",
    hintLift: "Løft nu lågene.",
    hintLeftover: "Nogle brikker er til overs. Der er ikke plads til dem under lågene.",
    hintExact: "Alle brikker er under et låg. Ingen er til overs.",
    hintAgain: "Læg lågene på igen, og læg så et låg mere.",

    firstLid: "Læg et låg på bordet",
    addLid: "Et låg mere",
    takeLid: "Tag et væk",
    liftBtn: "Løft lågene",
    againBtn: "Låg på igen",
    newSetBtn: "Nyt bord",
    printBtn: "Print opgaven",

    refuseTotal: "Der ligger låg på bordet. Tag dem væk, før antallet kan ændres.",
    refuseLifted: "Lågene er løftet. Læg dem på igen, hvis der skal vælges et tal.",
    refuseMax: "Der er ikke plads til flere låg på bordet.",

    gateLine: "Flere brikker, flere færdige borde og print er en del af Lærerabonnementet.",
    unlock: "Se Lærerabonnementet",

    totalLabel: "Brikker på bordet",
    tableLabel: "bordet",
    lidAria: "låg {i}",
    countersAria: "brikker i alt",
    lidsAria: "låg på bordet",
    looseAria: "brikker uden for lågene",
    markStrip: "Klassens tal og det, der lå under hvert låg",
    markAria: "tallet {n}",
    revealAria: "under hvert låg",
    recordAria: "forrige runde",

    setGhosts: "Vis de stiplede cirkler",
    setStrip: "Vis tallene",

    sheetTask: "Under hvert låg ligger der lige mange brikker. Del brikkerne ud under lågene, og skriv hvor mange der ligger under hvert låg, og hvor mange der er til overs.",
    sheetRecordHead: "Det, vi fandt ud af"
  },

  /* bokmål. Every definite form checked: lokk -> lokkene, brikke ->
     brikkene (⚠ NOT the Danish *brikkerne* — a live cross-Scandinavian
     trap), bord -> bordet. `tall {n}`, not `marker {n}`: in Norwegian
     *marker* reads first as the imperative "mark it!". `refuseMax`
     carries no numeral, so it cannot drift if MAX_LIDS moves. */
  no: {
    title: "Lokkene",
    instruction: "Dra to lokk ut på bordet, eller tre, eller fire. Under hvert lokk ligger det like mange brikker – hvilket tall passer under alle sammen?",

    hintPlace: "Dra et lokk ut til en stiplet ring. Legg ut to.",
    hintRule: "Under hvert lokk ligger det like mange brikker.",
    hintShare: "Hvilket tall ligger under hvert lokk?",
    hintMark: "Velg et tall nedenfor.",
    hintLift: "Løft nå lokkene.",
    hintLeftover: "Noen brikker blir til overs. De får ikke plass under et lokk.",
    hintExact: "Alle brikkene ligger under et lokk. Ingen blir til overs.",
    hintAgain: "Legg på lokkene igjen, og legg ut ett til.",

    firstLid: "Legg ut et lokk",
    addLid: "Ett lokk til",
    takeLid: "Ta bort et lokk",
    liftBtn: "Løft lokkene",
    againBtn: "Legg på lokkene",
    newSetBtn: "Nytt bord",
    printBtn: "Skriv ut oppgaven",

    refuseTotal: "Det ligger lokk på bordet. Ta dem bort før dere endrer antallet.",
    refuseLifted: "Lokkene er løftet. Legg dem på igjen for å velge et tall.",
    refuseMax: "Det er ikke plass til flere lokk på bordet.",

    gateLine: "Flere brikker, flere ferdige bord og utskrift er en del av Lærerabonnementet.",
    unlock: "Se Lærerabonnementet",

    totalLabel: "Brikker på bordet",
    tableLabel: "bordet",
    lidAria: "lokk {i}",
    countersAria: "brikker til sammen",
    lidsAria: "lokk på bordet",
    looseAria: "brikker utenfor lokkene",
    markStrip: "Tallet klassen valgte, og det som lå under hvert lokk",
    markAria: "tall {n}",
    revealAria: "under hvert lokk",
    recordAria: "forrige runde",

    setGhosts: "Vis de stiplede ringene",
    setStrip: "Vis tallene",

    sheetTask: "Under hvert lokk ligger det like mange brikker. Del brikkene likt under lokkene, og skriv hvor mange som ligger under hvert lokk, og hvor mange som blir til overs.",
    sheetRecordHead: "Det vi fant ut"
  },

  /* ⚠ THE THREE aria LABELS ARE PARTITIVE PLURAL — nappeja, kansia — and
     that is the only case that stays grammatical for EVERY value the
     code appends after a colon: a bare numeral demands partitive
     SINGULAR (3 kantta) while 1 demands nominative singular (1 kansi),
     and the code cannot inflect. `lukurivi`, deliberately not
     `lukusuora` — a lukusuora is a NUMBER LINE, a different object and
     another instrument on this platform. */
  fi: {
    title: "Kannen alla",
    instruction: "Vetäkää pöydälle kaksi kantta, tai kolme, tai neljä: jokaisen kannen alla on yhtä monta laskunappia, joten mikä sama luku sopii niiden kaikkien alle?",

    hintPlace: "Vetäkää kansi pöydälle. Asettakaa kaksi kantta.",
    hintRule: "Jokaisen kannen alla on yhtä monta nappia.",
    hintShare: "Mikä luku on jokaisen kannen alla?",
    hintMark: "Valitkaa alta yksi luku.",
    hintLift: "Nostakaa nyt kannet.",
    hintLeftover: "Osa napeista jäi yli. Ne eivät mahdu minkään kannen alle.",
    hintExact: "Kaikki napit ovat kansien alla. Yhtään ei jäänyt yli.",
    hintAgain: "Laittakaa kannet päälle ja asettakaa vielä yksi.",

    firstLid: "Aseta kansi",
    addLid: "Lisää kansi",
    takeLid: "Poista kansi",
    liftBtn: "Nosta kannet",
    againBtn: "Kannet päälle",
    newSetBtn: "Vaihda pöytä",
    printBtn: "Tulosta tehtävä",

    refuseTotal: "Pöydällä on kansia. Poistakaa ne ennen kuin vaihdatte nappien määrän.",
    refuseLifted: "Kannet ovat ylhäällä. Laittakaa ne takaisin päälle, niin voitte valita luvun.",
    refuseMax: "Pöydälle ei mahdu enempää kansia.",

    gateLine: "Opettaja-tilaus sisältää suuremmat lukumäärät, lisää valmiita pöytiä ja tulostuksen.",
    unlock: "Katso Opettaja-tilaus",

    totalLabel: "Nappeja pöydällä",
    tableLabel: "pöytä",
    lidAria: "kansi {i}",
    countersAria: "nappeja yhteensä",
    lidsAria: "kansia pöydällä",
    looseAria: "nappeja kansien ulkopuolella",
    markStrip: "Luokan luku ja se, mitä kunkin kannen alla oli",
    markAria: "luku {n}",
    revealAria: "jokaisen kannen alla",
    recordAria: "edellinen kierros",

    setGhosts: "Näytä katkoviivaympyrät",
    setStrip: "Näytä luvut",

    sheetTask: "Jokaisen kannen alla on yhtä monta nappia. Jaa napit kansien alle ja kirjoita, montako nappia tulee kunkin kannen alle ja montako jää yli.",
    sheetRecordHead: "Mitä huomasimme"
  }
};
