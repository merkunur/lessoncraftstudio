/* =====================================================================
   TOOL #39 — THE LIDS   (lids.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #4. Catalog slot A2, and the last
   of wave 1.

   THE TABLE · THE LIDS · THE TOTAL. Three named parts, and nothing else
   in this tool gets a noun.

   THE ROUTINE, which is what makes this an instrument and not a game:
     "Put two lids down. How many under each?"
      ... and then the move that matters:
     "Now put a third one down."

   THE ONE THESIS — ONE UNKNOWN REPEATED IS NOT THE SAME PROBLEM AS ONE
   UNKNOWN. With a single lid the answer is a subtraction any child in
   the room can already do. With three lids that must all hide the SAME
   amount, the total has to be shared out — and a total that will not
   share leaves its remainder sitting in plain sight on the table.

   THREE INVENTIONS:
     1. ⭐ THE VALUE LOCK. Every lid hides the same number,
        and that is enforced by MOTION, not by arithmetic: drop another
        lid and the counters re-settle underneath all of them until the
        shares are equal again. `total = visible + k*x` becomes a thing
        the table does, not a sentence anyone says.
     2. THE LIDS ARE DRAGGED, AND THEY LAND ANYWHERE. Every other cover
        on this platform is a chip you toggle. A lid you carry and put
        down is a lid whose position is yours, so the re-settle is
        something the class watches happen TO their arrangement.
     3. THE REMAINDER IS HONEST. When the total will not share, what is
        left over does not hide and is not apologised for — it stays on
        the table and is the most interesting thing on it.

   ⚠ THE FENCE — FOUR SURFACES, and it CHANGED THIS TOOL. The catalog
   entry claimed three things; two of them were already owned, so they
   are subtracted here rather than negotiated, and this file is built on
   the remainder.
   DEAD — "the covered objects genuinely leave the DOM". That is written
   house doctrine twice over: `number-balance.js:437-439` ("A COVERED PAN
   LEAVES THE DOM ENTIRELY — not hidden with CSS") and
   `part-whole-frame.js:517-520` ("a hidden count is still a count to
   anything that reads the tree"). This file honours it and never sells
   it. It is table stakes.
   DEAD — "cover part of a known total and ask what is under it".
   `part-whole-frame` ships THREE independent cloths over whole/a/b in
   its FREE tier (:257, :378, :533-576). `number-balance` has a cloth
   over a pan and the string "What must be under the cloth to make it
   level?" (:109). `rekenrek` owns "How many are hiding?" BY NAME (:24)
   and has it as authored content — `rekenrek-seqs.json:594-612`, round
   `q_hiding`. `number-talk-easel` owns flash-hide-reveal over
   "scattered identical objects (6-12)" (:27), which is this exact
   canvas. And the missing-addend cognition has THREE engines at
   1.OA.D.8 alone (`missing-part-core`, `make-fair-core`, `match-pairs`),
   plus `number-bond-core` at K.OA.A.4 and printable `G1-115`.
   ALIVE, and uncontested on all four surfaces — THE VALUE LOCK. Nothing
   on this platform drags a cover; nothing stores free 2-D positions
   (`letter-tiles` is 1-D-per-row); and nothing anywhere has two peer
   objects that renegotiate to a shared value. The lock is the tool.

   REFUSES, FOREVER — each one gated:
     1. NO SINGLE-LID-ONLY MODE. One lid over a known total IS the tool
        that part-whole-frame, number-balance and rekenrek already are.
        The second lid is not a feature here, it is the subject.
     2. NO "HOW MANY ARE HIDING" PHRASING, in any of eleven locales.
        rekenrek owns that sentence and ships it as content.
     3. NO VERDICT ON THE GUESS. The committed marker is never marked,
        coloured, scored, ranked or compared by the tool.
     4. NO SCORE, TIMER, STREAK, TICK, CROSS or "correct".
     5. NEVER THE BRAND WORD. Splat! is a living author's routine; this
        is a different name and a deliberately different geometry —
        circular lids, not irregular ink. ⚠ The gate's ban on it is
        word-boundary anchored, because the corpus already contains the
        Dutch `Koekjesplaten` (baking trays) and a bare substring ban
        would reject correct Dutch — the recorded `par`-rejects-French
        defect in a third dress.
     6. NO SPEECH. LCSAudio silently substitutes a missing voice and TTS
        is reliable in only 5 of 11 locales.

   ⚠ WHAT "UNREACHABLE" MEANS HERE, AND HOW IT DIFFERS FROM #38. In the
   Draw Bag the composition was genuinely unknowable before the reveal.
   Here `x` is DETERMINED by the total and the lid count, both of which
   are on screen — and that is the point: the class can work it out.
   Unreachability therefore means the tool never RENDERS x, and the
   covered counters are absent from the DOM so they cannot be counted
   one by one. The arithmetic is the child's; the tool just refuses to
   do it for them.
   ===================================================================== */

var Lids = {
  id: 'lids',

  /* ---------------------------------------------------------------
     STRINGS — GENERATED. EN is authored; the other ten were REBUILT (not
     translated) by a three-person NATIVE panel per locale, §A.13.48.
     ⚠ DO NOT HAND-EDIT A LOCALE HERE. The source of truth is
     scripts/_lids-strings.js; scripts/apply-lids-locales.js rewrites
     this whole block from it.

     ⭐ FOUR PANELS REJECTED THE OBVIOUS WORD, and every one was a
     collision no amount of care in English would have caught:
       es  "Las tapas" -> "Las tapaderas"  ("tapas" reads as bar food)
       fr  "la table"  -> "le plateau"     ("table" reads as *table de
           multiplication* — the very concept this tool builds toward,
           so "Autre table" would have read as "another times table")
       nl  "de tafel"  -> "het blad"       (same trap: in groep 3/4 "de
           tafels" ARE the times tables), and the tool renamed to
           "Onder de deksels" — the question, not the object
       pt  rejected "tampinhas" for the counters: a tampinha is a bottle
           cap, itself the classic improvised counter, so it would have
           collided head-on with the tampas covering them
       fi  "Kannet" -> "Kannen alla": bare "Kannet" reads first as book
           COVERS, so the tool is named after the routine instead
     Each locale also chose its own real classroom word for the
     counters: Wendeplättchen · jetons · fichas · gettoni · fiches ·
     brickor · brikker · brikker · laskunapit.
     --------------------------------------------------------------- */
  strings: {
    title:           { en: "The Lids", de: "Die Deckel", fr: "Les couvercles", es: "Las tapaderas", pt: "As tampas", it: "I coperchi", nl: "Onder de deksels", sv: "Locken", da: "Lågene", no: "Lokkene", fi: "Kannen alla" },
    instruction:     { en: "Drag two lids onto the table — or three, or four. Every lid covers the same number of counters, so what one number fits under all of them?", de: "Zieht zwei Deckel auf den Tisch. Unter jedem Deckel liegen gleich viele Wendeplättchen – welche Zahl passt unter alle Deckel?", fr: "Faites glisser deux couvercles sur le plateau, ou trois, ou quatre : sous chaque couvercle il y a le même nombre de jetons. Quel est ce nombre ?", es: "Arrastremos dos tapaderas a la mesa, o tres, o cuatro. Cada tapadera cubre la misma cantidad de fichas: ¿qué número cabe debajo de todas?", pt: "Arrastem duas tampas para a mesa, ou três, ou quatro. Cada tampa cobre a mesma quantidade de fichas — então, que número cabe embaixo de todas elas?", it: "Trascina due coperchi sul tavolo, o tre, o quattro: sotto ognuno c'è lo stesso numero di gettoni. Quale numero sta sotto tutti?", nl: "Sleep twee deksels op het blad, of drie, of vier. Onder elk deksel liggen evenveel fiches — welk getal past er dan onder allemaal?", sv: "Dra ut två lock på bordet, eller tre, eller fyra. Under varje lock ligger lika många brickor – vilket tal passar under alla?", da: "Træk to låg ud på bordet, eller tre, eller fire. Under hvert låg ligger der lige mange brikker – så hvilket tal ligger under dem alle?", no: "Dra to lokk ut på bordet, eller tre, eller fire. Under hvert lokk ligger det like mange brikker – hvilket tall passer under alle sammen?", fi: "Vetäkää pöydälle kaksi kantta, tai kolme, tai neljä: jokaisen kannen alla on yhtä monta laskunappia, joten mikä sama luku sopii niiden kaikkien alle?" },

    hintPlace:       { en: "Drag a lid onto the table. Put down two.", de: "Zieht einen Deckel auf den Tisch – und dann noch einen.", fr: "Faites glisser un couvercle sur le plateau, puis un deuxième.", es: "Arrastremos dos tapaderas a la mesa.", pt: "Arrastem uma tampa para a mesa. Coloquem duas.", it: "Trascina un coperchio sul tavolo. Mettine giù due.", nl: "Sleep een deksel naar een stippelrondje. Leg er twee neer.", sv: "Dra ett lock till en streckad ring. Lägg ut två.", da: "Træk et låg ud på en stiplet cirkel. Læg to låg.", no: "Dra et lokk ut til en stiplet ring. Legg ut to.", fi: "Vetäkää kansi pöydälle. Asettakaa kaksi kantta." },
    hintRule:        { en: "Every lid covers the same number of counters.", de: "Jeder Deckel deckt gleich viele Plättchen zu.", fr: "Tous les couvercles cachent le même nombre de jetons.", es: "Todas las tapaderas cubren la misma cantidad de fichas.", pt: "Cada tampa cobre a mesma quantidade de fichas.", it: "Ogni coperchio copre la stessa quantità di gettoni.", nl: "Onder elk deksel liggen evenveel fiches.", sv: "Under varje lock ligger lika många brickor.", da: "Under hvert låg ligger der lige mange brikker.", no: "Under hvert lokk ligger det like mange brikker.", fi: "Jokaisen kannen alla on yhtä monta nappia." },
    hintShare:       { en: "Which number is under each lid?", de: "Welche Zahl liegt unter jedem Deckel?", fr: "Quel nombre est caché sous chaque couvercle ?", es: "¿Qué número hay debajo de cada tapadera?", pt: "Que número está embaixo de cada tampa?", it: "Quale numero sta sotto ogni coperchio?", nl: "Welk getal ligt er onder elk deksel?", sv: "Vilket tal ligger under varje lock?", da: "Hvilket tal ligger under hvert låg?", no: "Hvilket tall ligger under hvert lokk?", fi: "Mikä luku on jokaisen kannen alla?" },
    hintMark:        { en: "Choose a number below.", de: "Wählt unten eine Zahl aus.", fr: "Choisissez un nombre ci-dessous.", es: "Elijamos un número aquí abajo.", pt: "Escolham um número aqui embaixo.", it: "Scegli un numero qui sotto.", nl: "Kies hieronder een getal.", sv: "Välj ett av talen nedanför.", da: "Vælg et af tallene nedenfor.", no: "Velg et tall nedenfor.", fi: "Valitkaa alta yksi luku." },
    hintLift:        { en: "Now lift the lids.", de: "Hebt jetzt die Deckel an.", fr: "Soulevez maintenant les couvercles.", es: "Levantemos ahora las tapaderas.", pt: "Agora levantem as tampas.", it: "Ora alza i coperchi.", nl: "Til nu de deksels op.", sv: "Lyft nu på locken.", da: "Løft nu lågene.", no: "Løft nå lokkene.", fi: "Nostakaa nyt kannet." },
    hintLeftover:    { en: "Some counters are left over. They do not fit under a lid.", de: "Einige Plättchen bleiben übrig – sie passen unter keinen Deckel.", fr: "Il reste des jetons : ils ne tiennent sous aucun couvercle.", es: "Sobran algunas fichas: no caben debajo de ninguna tapadera.", pt: "Sobraram algumas fichas. Elas não cabem embaixo de nenhuma tampa.", it: "Alcuni gettoni sono avanzati: non stanno sotto nessun coperchio.", nl: "Er blijven fiches over. Die passen niet onder een deksel.", sv: "Några brickor blir över. De får inte plats under något lock.", da: "Nogle brikker er til overs. Der er ikke plads til dem under lågene.", no: "Noen brikker blir til overs. De får ikke plass under et lokk.", fi: "Osa napeista jäi yli. Ne eivät mahdu minkään kannen alle." },
    hintExact:       { en: "Every counter is under a lid. None are left over.", de: "Alle Plättchen liegen unter einem Deckel – es bleibt keines übrig.", fr: "Tous les jetons sont sous un couvercle : il n'en reste aucun.", es: "Todas las fichas están debajo de una tapadera. No sobra ninguna.", pt: "Todas as fichas estão embaixo das tampas. Não sobrou nenhuma.", it: "Tutti i gettoni stanno sotto i coperchi: non ne avanza nessuno.", nl: "Elke fiche ligt onder een deksel. Er blijft niets over.", sv: "Alla brickor ligger under locken. Inga blir över.", da: "Alle brikker er under et låg. Ingen er til overs.", no: "Alle brikkene ligger under et lokk. Ingen blir til overs.", fi: "Kaikki napit ovat kansien alla. Yhtään ei jäänyt yli." },
    hintAgain:       { en: "Put the lids back on, then put another one down.", de: "Legt die Deckel wieder drauf und dann noch einen dazu.", fr: "Recouvrez, puis posez un couvercle de plus.", es: "Volvamos a tapar y pongamos una tapadera más.", pt: "Tampem de novo e coloquem mais uma tampa.", it: "Rimetti i coperchi e mettine giù un altro.", nl: "Leg de deksels terug en leg er dan nog een bij.", sv: "Lägg på locken igen och lägg ut ett lock till.", da: "Læg lågene på igen, og læg så et låg mere.", no: "Legg på lokkene igjen, og legg ut ett til.", fi: "Laittakaa kannet päälle ja asettakaa vielä yksi." },

    firstLid:        { en: "Put a lid down", de: "Deckel hinlegen", fr: "Poser un couvercle", es: "Poner una tapadera", pt: "Colocar uma tampa", it: "Metti un coperchio", nl: "Deksel neerleggen", sv: "Lägg ut ett lock", da: "Læg et låg på bordet", no: "Legg ut et lokk", fi: "Aseta kansi" },
    addLid:          { en: "Another lid", de: "Deckel dazu", fr: "Un couvercle de plus", es: "Otra tapadera", pt: "Outra tampa", it: "Aggiungi un coperchio", nl: "Nog een deksel", sv: "Ett lock till", da: "Et låg mere", no: "Ett lokk til", fi: "Lisää kansi" },
    takeLid:         { en: "Take one away", de: "Deckel weg", fr: "Retirer un couvercle", es: "Quitar una", pt: "Tirar uma tampa", it: "Togli un coperchio", nl: "Deksel weghalen", sv: "Ta bort ett", da: "Tag et væk", no: "Ta bort et lokk", fi: "Poista kansi" },
    liftBtn:         { en: "Lift the lids", de: "Deckel anheben", fr: "Soulever les couvercles", es: "Destapar", pt: "Destampar", it: "Alza i coperchi", nl: "Deksels optillen", sv: "Lyft på locken", da: "Løft lågene", no: "Løft lokkene", fi: "Nosta kannet" },
    againBtn:        { en: "Lids back on", de: "Deckel drauf", fr: "Recouvrir", es: "Volver a tapar", pt: "Tampar de novo", it: "Rimetti i coperchi", nl: "Deksels terug", sv: "Lock på igen", da: "Låg på igen", no: "Legg på lokkene", fi: "Kannet päälle" },
    newSetBtn:       { en: "Another table", de: "Neuer Tisch", fr: "Autre plateau", es: "Otra mesa", pt: "Outra mesa", it: "Un altro tavolo", nl: "Ander blad", sv: "Nytt bord", da: "Nyt bord", no: "Nytt bord", fi: "Vaihda pöytä" },
    printBtn:        { en: "Print the worksheet", de: "Aufgabe drucken", fr: "Imprimer la fiche", es: "Imprimir la hoja", pt: "Imprimir a folha", it: "Stampa la scheda", nl: "Werkblad printen", sv: "Skriv ut uppgiften", da: "Print opgaven", no: "Skriv ut oppgaven", fi: "Tulosta tehtävä" },

    refuseTotal:     { en: "Lids are on the table. Take them away before you change the number of counters.", de: "Auf dem Tisch liegen Deckel. Nehmt sie weg, bevor ihr die Anzahl ändert.", fr: "Des couvercles sont posés. Retirez-les avant de changer le nombre de jetons.", es: "Hay tapaderas en la mesa. Quitémoslas antes de cambiar la cantidad de fichas.", pt: "Há tampas na mesa. Tirem as tampas antes de mudar a quantidade de fichas.", it: "Togli i coperchi prima di cambiare il numero di gettoni.", nl: "Er liggen deksels op het blad. Haal ze eerst weg.", sv: "Locken ligger på bordet. Ta bort dem innan ni ändrar antalet.", da: "Der ligger låg på bordet. Tag dem væk, før antallet kan ændres.", no: "Det ligger lokk på bordet. Ta dem bort før dere endrer antallet.", fi: "Pöydällä on kansia. Poistakaa ne ennen kuin vaihdatte nappien määrän." },
    refuseLifted:    { en: "The lids are up. Put them back on to choose a number.", de: "Die Deckel sind oben. Legt sie wieder drauf, um eine Zahl zu wählen.", fr: "Les couvercles sont soulevés. Recouvrez pour choisir un nombre.", es: "Las tapaderas están levantadas. Volvamos a taparlas para elegir un número.", pt: "As tampas estão levantadas. Tampem de novo para escolher um número.", it: "I coperchi sono alzati: rimettili per scegliere un numero.", nl: "De deksels zijn omhoog. Leg ze terug om een getal te kiezen.", sv: "Locken är uppe. Lägg på dem igen för att välja ett tal.", da: "Lågene er løftet. Læg dem på igen, hvis der skal vælges et tal.", no: "Lokkene er løftet. Legg dem på igjen for å velge et tall.", fi: "Kannet ovat ylhäällä. Laittakaa ne takaisin päälle, niin voitte valita luvun." },
    refuseMax:       { en: "The table has no room for another lid.", de: "Mehr Deckel passen nicht auf den Tisch.", fr: "Il n'y a plus de place pour un couvercle sur le plateau.", es: "En la mesa no cabe otra tapadera.", pt: "Não cabe mais nenhuma tampa na mesa.", it: "Sul tavolo non c'è posto per un altro coperchio.", nl: "Er past geen deksel meer op het blad.", sv: "Det får inte plats fler lock på bordet.", da: "Der er ikke plads til flere låg på bordet.", no: "Det er ikke plass til flere lokk på bordet.", fi: "Pöydälle ei mahdu enempää kansia." },

    gateLine:        { en: "Bigger totals, more ready-made tables and printing are part of the Teacher plan.", de: "Größere Anzahlen, mehr fertige Tische und das Drucken gehören zum Lehrer-Paket.", fr: "Les plus grands totaux, d'autres plateaux prêts à l'emploi et l'impression font partie de l'offre Enseignant.", es: "Los totales más grandes, más mesas preparadas y la impresión forman parte del plan Docente.", pt: "Totais maiores, mais mesas prontas e a impressão fazem parte do plano Professor.", it: "Più gettoni, altri tavoli pronti e la stampa fanno parte del piano Insegnante.", nl: "Grotere aantallen, meer kant-en-klare bladen en printen horen bij het Leerkracht-pakket.", sv: "Större antal, fler färdiga bord och utskrift ingår i Lärarpaketet.", da: "Flere brikker, flere færdige borde og print er en del af Lærerabonnementet.", no: "Flere brikker, flere ferdige bord og utskrift er en del av Lærerabonnementet.", fi: "Opettaja-tilaus sisältää suuremmat lukumäärät, lisää valmiita pöytiä ja tulostuksen." },
    unlock:          { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Scopri il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" },

    totalLabel:      { en: "Counters on the table", de: "Plättchen auf dem Tisch", fr: "Jetons sur le plateau", es: "Fichas en la mesa", pt: "Fichas na mesa", it: "Gettoni sul tavolo", nl: "Fiches op het blad", sv: "Brickor på bordet", da: "Brikker på bordet", no: "Brikker på bordet", fi: "Nappeja pöydällä" },
    tableLabel:      { en: "the table", de: "der Tisch", fr: "le plateau", es: "la mesa", pt: "a mesa", it: "il tavolo", nl: "het blad", sv: "bordet", da: "bordet", no: "bordet", fi: "pöytä" },
    lidAria:         { en: "lid {i}", de: "Deckel {i}", fr: "couvercle {i}", es: "tapadera {i}", pt: "tampa {i}", it: "coperchio {i}", nl: "deksel {i}", sv: "lock {i}", da: "låg {i}", no: "lokk {i}", fi: "kansi {i}" },
    countersAria:    { en: "counters in all", de: "Plättchen insgesamt", fr: "jetons en tout", es: "fichas en total", pt: "fichas no total", it: "gettoni in tutto", nl: "aantal fiches in totaal", sv: "brickor totalt", da: "brikker i alt", no: "brikker til sammen", fi: "nappeja yhteensä" },
    lidsAria:        { en: "lids on the table", de: "Deckel auf dem Tisch", fr: "couvercles posés", es: "tapaderas en la mesa", pt: "tampas na mesa", it: "coperchi sul tavolo", nl: "aantal deksels op het blad", sv: "lock på bordet", da: "låg på bordet", no: "lokk på bordet", fi: "kansia pöydällä" },
    looseAria:       { en: "counters outside the lids", de: "außerhalb der Deckel", fr: "jetons hors couvercle", es: "fichas fuera de las tapaderas", pt: "fichas fora das tampas", it: "fuori dai coperchi", nl: "aantal fiches zonder deksel", sv: "brickor utanför locken", da: "brikker uden for lågene", no: "brikker utenfor lokkene", fi: "nappeja kansien ulkopuolella" },
    markStrip:       { en: "The class's number, and what was under each lid", de: "Die Zahl der Klasse und was unter jedem Deckel lag", fr: "Le nombre de la classe et ce qu'il y avait sous chaque couvercle", es: "El número de la clase y lo que había debajo de cada tapadera", pt: "O número da turma e o que havia embaixo de cada tampa", it: "Il numero della classe e quello che stava sotto ogni coperchio", nl: "Het getal van de klas en wat er onder elk deksel lag", sv: "Klassens tal och vad som låg under varje lock", da: "Klassens tal og det, der lå under hvert låg", no: "Tallet klassen valgte, og det som lå under hvert lokk", fi: "Luokan luku ja se, mitä kunkin kannen alla oli" },
    markAria:        { en: "number {n}", de: "Zahl {n}", fr: "nombre {n}", es: "número {n}", pt: "número {n}", it: "numero {n}", nl: "getal {n}", sv: "tal {n}", da: "tallet {n}", no: "tall {n}", fi: "luku {n}" },
    revealAria:      { en: "under each lid", de: "unter jedem Deckel", fr: "sous chaque couvercle", es: "debajo de cada tapadera", pt: "embaixo de cada tampa", it: "sotto ogni coperchio", nl: "onder elk deksel", sv: "under varje lock", da: "under hvert låg", no: "under hvert lokk", fi: "jokaisen kannen alla" },
    recordAria:      { en: "the previous round", de: "der Durchgang davor", fr: "le tour précédent", es: "la ronda anterior", pt: "a rodada anterior", it: "il giro precedente", nl: "de vorige ronde", sv: "förra omgången", da: "forrige runde", no: "forrige runde", fi: "edellinen kierros" },

    setGhosts:       { en: "Show the dashed circles", de: "Gestrichelte Kreise anzeigen", fr: "Montrer les cercles en pointillés", es: "Mostrar los círculos punteados", pt: "Mostrar os círculos tracejados", it: "Mostra i cerchi tratteggiati", nl: "Laat de stippelrondjes zien", sv: "Visa de streckade ringarna", da: "Vis de stiplede cirkler", no: "Vis de stiplede ringene", fi: "Näytä katkoviivaympyrät" },
    setStrip:        { en: "Show the numbers", de: "Zahlen anzeigen", fr: "Montrer les nombres", es: "Mostrar los números", pt: "Mostrar os números", it: "Mostra i numeri", nl: "Laat de getallen zien", sv: "Visa talen", da: "Vis tallene", no: "Vis tallene", fi: "Näytä luvut" },

    sheetTask:       { en: "Every lid covers the same number of counters. Share them out under the lids, then write how many go under each lid and how many are left over.", de: "Unter jedem Deckel liegen gleich viele Plättchen. Verteile sie unter die Deckel und schreibe auf, wie viele unter jeden Deckel kommen und wie viele übrig bleiben.", fr: "Sous chaque couvercle il y a le même nombre de jetons. Partage-les sous les couvercles, puis écris combien il y en a sous chaque couvercle et combien il en reste.", es: "Cada tapadera cubre la misma cantidad de fichas. Repártelas debajo de las tapaderas y escribe cuántas hay debajo de cada una y cuántas sobran.", pt: "Cada tampa cobre a mesma quantidade de fichas. Reparta as fichas embaixo das tampas e escreva quantas ficam embaixo de cada tampa e quantas sobraram.", it: "Ogni coperchio copre la stessa quantità di gettoni. Dividili sotto i coperchi, poi scrivi quanti ne vanno sotto ogni coperchio e quanti ne avanzano.", nl: "Onder elk deksel liggen evenveel fiches. Verdeel ze eerlijk onder de deksels en schrijf op hoeveel er onder elk deksel liggen en hoeveel er overblijven.", sv: "Under varje lock ligger lika många brickor. Dela ut dem under locken och skriv hur många som ligger under varje lock och hur många som blir över.", da: "Under hvert låg ligger der lige mange brikker. Del brikkerne ud under lågene, og skriv hvor mange der ligger under hvert låg, og hvor mange der er til overs.", no: "Under hvert lokk ligger det like mange brikker. Del brikkene likt under lokkene, og skriv hvor mange som ligger under hvert lokk, og hvor mange som blir til overs.", fi: "Jokaisen kannen alla on yhtä monta nappia. Jaa napit kansien alle ja kirjoita, montako nappia tulee kunkin kannen alle ja montako jää yli." },
    sheetRecordHead: { en: "What we found", de: "Das haben wir herausgefunden", fr: "Ce que nous avons trouvé", es: "Lo que descubrimos", pt: "O que descobrimos", it: "Che cosa abbiamo trovato", nl: "Wat we gevonden hebben", sv: "Vad vi kom fram till", da: "Det, vi fandt ud af", no: "Det vi fant ut", fi: "Mitä huomasimme" }
  },

  STORE_KEY: 'lcs:lids:v1',
  ENT_TRUST_DAYS: 14,

  /* ⚠ TWO BOOLEANS, AND NOTHING ELSE, IN THE SHELL DRAWER. renderField
     flips aria-checked itself and buildDrawer builds once and is never
     rebuilt, so a value the tool must be able to REFUSE (a paid total for
     a free account) or OVERWRITE (loadSetup rewrites st.n behind the
     drawer's back) would desync permanently — the drawer would say 30
     while the card said 12, and nothing could reconcile them without
     touching the shell. The drawer is for booleans that can never be
     refused. The total stays on the card. */
  defaults: { ghosts: true, strip: true },
  settings: [
    { key: 'ghosts', type: 'toggle', labelKey: 'setGhosts' },
    { key: 'strip', type: 'toggle', labelKey: 'setStrip' }
  ],

  premium: false,
  premiumKnown: false,

  MAX_LIDS: 4,
  /* ⭐ TWO IS THE FLOOR, AND IT IS NOW A MODEL FACT RATHER THAN A HOPE.
     Refusal 1 says there is no single-lid MODE — but the shipped build
     enforced that as a mode and left the STATE one click away. Measured
     from the opening frame, one press of "Another lid" gave:
         n=12  k=1  share=12  leftover=0  visible=0  lidRadius=148
         n=20  k=1  share=20  leftover=0  visible=0  lidRadius=209
     i.e. a single lid swallowed EVERY counter, the table went empty, the
     strip stayed dead (it refuses below two), and the largest disc the
     tool can draw sat on a blank cream rectangle. A teacher's first
     interaction made everything disappear.
     So the reachable set is k in {0, 2, 3, 4}: placing from an empty
     table lays TWO, and taking one away from two returns to none. The
     model still answers correctly for k=1 — V15's oracle sweeps it and
     must keep passing — it simply cannot be reached through the
     interface. That is the difference between a refusal and a hole. */
  MIN_LIDS: 2,
  FREE_MAX_TOTAL: 20,
  PAID_MAX_TOTAL: 30,
  MIN_TOTAL: 4,
  DEFAULT_TOTAL: 12,
  /* the table is a 0..1000 x 0..620 model space; the view scales it */
  W: 1000,
  H: 620,

  /* =================================================================
     THE MODEL — pure, total, immutable. No DOM, no locale, no Date, and
     no unseeded randomness: the scatter is a seeded function of the
     total, so the same table looks the same in Oslo and Lisbon.
     ================================================================= */

  newState: function () {
    return {
      n: this.DEFAULT_TOTAL,
      seed: this.DEFAULT_TOTAL * 7919,
      lids: [],          /* [{cx, cy}] in model space, placement order */
      guess: null,       /* the committed prior for x */
      lifted: false
    };
  },

  /* ⚠ TOTAL MEANS TOTAL. Every reader below goes through this, because
     `st || newState()` catches null and 0 but hands `[]` or `{}` straight
     through to `s.lids.length` and crashes. A model that is total for the
     inputs I thought of is just a model with a narrower bug. */
  _st: function (st) {
    return (st && typeof st === 'object' &&
            typeof st.n === 'number' && isFinite(st.n) &&
            Object.prototype.toString.call(st.lids) === '[object Array]')
      ? st : this.newState();
  },

  _clone: function (st) {
    var s = this._st(st), i;
    var lids = [];
    for (i = 0; i < (s.lids || []).length; i++) lids.push({ cx: s.lids[i].cx, cy: s.lids[i].cy });
    return { n: s.n, seed: s.seed, lids: lids, guess: s.guess, lifted: !!s.lifted };
  },

  _mix: function (a, b) {
    var h = (a ^ Math.imul((b | 0) + 0x9E3779B9, 0x85EBCA6B)) | 0;
    h = Math.imul(h ^ (h >>> 13), 0xC2B2AE35) | 0;
    return (h ^ (h >>> 16)) >>> 0;
  },

  /* ⭐⭐ THE COUNTERS' RESTING PLACES — a seeded scatter, deliberately not
     a grid, because a grid can be counted in rows and the point is that
     the covered ones cannot be counted at all.

     ⚠ AND IT USED TO LET THEM OVERLAP, ON THE DEFAULT TABLE. The first
     version was independent seeded sampling with NO separation
     constraint, while a counter is 5.6% of a 1000-unit table — exactly
     2 x C_R = 56 units across. Measured over the whole domain:

         totals with at least one OVERLAPPING pair: 19 of 27
         chip-reachable totals affected: 12, 16, 20, 24, 30   <- 12 is the DEFAULT
         worst case: total 17, two counters 4.5 units apart
         total 28: eleven overlapping pairs

     Two discs 14 units apart draw as one figure-of-eight blob, so a class
     asked "how many are on the table?" looked at twelve counters and saw
     eleven shapes. This is a COUNTING instrument; its opening picture was
     uncountable. V15 proved at length that counters UNDER A LID never
     overlap — the hexagonal packing, correct by construction — and nobody
     ever checked the half that is actually random. The check was written
     where the geometry was easy to reason about rather than where it
     could fail.

     ⭐ THE FIX IS SEEDED DART-THROWING. Draw candidates from the same
     _mix stream, accept the first that clears SEP of every counter
     already placed, and after TRIES candidates keep the best-separated
     one — so the loop is BOUNDED and the model can never sit spinning.
     Pure, total, and a deterministic function of (seed, n): V10 holds.

     ⚠ SEP IS MEASURED, NOT GUESSED. Sweeping the target across the whole
     4..30 domain:
         56 -> 0 overlaps, tightest 56.0u ( 0.0px clearance at 680)  touching
         64 -> 0 overlaps, tightest 64.4u ( 5.7px)
         76 -> 0 overlaps, tightest 76.0u (13.6px)   <- chosen
         84 -> 0 overlaps, tightest 84.0u (19.0px)   over-regular, reads laid out
     76 units is 1.36 diameters. It leaves 13.6px of visible gap at a
     680px table, which is what makes twelve counters read as twelve
     shapes, and it still scatters: 29 distinct x and 30 distinct y out of
     30 points, where a grid would collapse both. */
  SEP: 76,
  SEP_TRIES: 64,

  scatter: function (st) {
    var s = this._st(st), out = [], i, k, h, p, gap, j, d;
    var best, bestGap;
    for (i = 0; i < s.n; i++) {
      best = null; bestGap = -1;
      for (k = 0; k < this.SEP_TRIES; k++) {
        /* i*97 + k keeps every candidate on its own point of the stream,
           so adding a counter never re-rolls the ones before it */
        h = this._mix(s.seed, i * 97 + k);
        p = { x: 70 + (h % 861), y: 70 + ((h >>> 9) % 481) };
        gap = Infinity;
        for (j = 0; j < out.length; j++) {
          d = Math.sqrt((p.x - out[j].x) * (p.x - out[j].x) + (p.y - out[j].y) * (p.y - out[j].y));
          if (d < gap) gap = d;
        }
        if (gap > bestGap) { bestGap = gap; best = p; }
        if (gap >= this.SEP) break;
      }
      out.push(best);
    }
    return out;
  },

  /* ⭐ THE VALUE LOCK, in one line: every lid takes the same share, and
     the share is what the total will give when it is split k ways. */
  share: function (st) {
    var s = this._st(st);
    var k = s.lids.length;
    if (k < 1) return 0;
    return Math.floor(s.n / k);
  },

  hidden: function (st) {
    var s = this._st(st);
    return s.lids.length * this.share(s);
  },

  leftover: function (st) {
    var s = this._st(st);
    return s.n - this.hidden(s);
  },

  /* ⭐⭐ HOW FAR THE NUMERAL STRIP RUNS — and the shipped build could not
     hold its own answer.
     `_buildStrip` rendered 0..min(maxTotal, 12). On the Teacher plan the
     totals reach 30, and the routine's opening move is two lids, so:

         n=30, k=2  ->  share = 15  >  stripTop = 12

     The class could not park a marker on the right number, and at the
     lift NO numeral was ringed at all — the reveal marked nothing. That
     is reachable by following the tool's own printed instruction at the
     largest paid total. In the other direction, at n=8 the largest share
     two lids can hide is 4, yet the strip offered 0..12: nine numerals
     that can never be the answer under any lid count.

     ⚠ AND THE OBVIOUS FIX LEAKS. top = floor(n/2) is exactly the share at
     two lids, so the answer would sit on the last button every time, in
     the one configuration the routine opens with. Verified across the
     whole chip set before it was rejected.

     THE RULE: the next multiple of five STRICTLY GREATER than floor(n/2).
         n 4-9 -> 5    n 10-19 -> 10    n 20-29 -> 15    n 30 -> 20
     Every share is on the strip, no share is ever the top numeral, the
     top is always a landmark (5, 10, 15, 20), and it is never more than
     two rows at any width the tool supports.

     ⚠ IT DEPENDS ON n ALONE, NEVER ON k. A strip that tightened when a
     third lid went down would tell the class the answer got smaller
     before they looked. Since setTotal refuses while lids are down and
     loadSetup clears them, the strip re-ranges only when the TABLE
     changes, never when a lid does — which is gateable.

     ⚠ AND IT STARTS AT 1, NOT 0. With MIN_TOTAL 4 against MAX_LIDS 4 the
     share is always at least 1, so 0 is a numeral that can never be the
     answer — precisely the defect the top end was fixed for. A tool
     cannot condemn dead numerals at one end and keep one at the other. */
  stripTop: function (st) {
    var s = this._st(st);
    var half = Math.floor(s.n / 2);
    return 5 * (Math.floor(half / 5) + 1);
  },

  /* ⭐ THE RE-SETTLE. Which counters end up under which lid: each lid in
     placement order takes the `share` nearest counters that no earlier
     lid has taken. Deterministic, so the settle is identical everywhere
     — and because the share is recomputed for EVERY lid on every drop,
     adding a lid genuinely makes the earlier lids give some back. That
     giving-back is the invention; it is not an animation. */
  /* ⚠ BY REGRET, NOT BY TURN. The first version served the lids in
     placement order — lid 0 took its nearest `share`, then lid 1 took
     the nearest of what was left, and so on — which handed the LAST lid
     whatever was scattered across the whole table. Its claim was not a
     region, it was the leftovers, so the circle drawn round it swallowed
     everything and the picture turned to mush.

     Instead every counter ranks the lids and carries its REGRET: how
     much closer its first choice is than its second. Counters that
     clearly belong somewhere are placed first; the ambiguous ones settle
     for whatever still has room; the ones no lid particularly wants are
     the ones left on the table. Each lid ends up with a compact cluster,
     no lid is punished for being last, and the whole thing is still a
     deterministic function of the seed. */
  assignment: function (st) {
    var s = this._st(st);
    var pts = this.scatter(s), x = this.share(s), k = s.lids.length;
    var out = [], rows = [], i, j;
    for (i = 0; i < k; i++) out.push([]);
    if (!k || !x) return out;

    for (j = 0; j < pts.length; j++) {
      var order = [];
      for (i = 0; i < k; i++) {
        var dx = pts[j].x - s.lids[i].cx, dy = pts[j].y - s.lids[i].cy;
        order.push({ i: i, d: dx * dx + dy * dy });
      }
      /* ties broken by index so nothing depends on sort stability */
      order.sort(function (a, b) { return a.d - b.d || a.i - b.i; });
      rows.push({
        j: j, order: order,
        regret: order.length > 1 ? Math.sqrt(order[1].d) - Math.sqrt(order[0].d) : Infinity
      });
    }
    rows.sort(function (a, b) { return b.regret - a.regret || a.j - b.j; });

    for (var r = 0; r < rows.length; r++) {
      for (i = 0; i < rows[r].order.length; i++) {
        var lid = rows[r].order[i].i;
        if (out[lid].length < x) { out[lid].push(rows[r].j); break; }
      }
    }
    /* ⭐ THEN TIDY. The greedy is capacity-constrained, so a counter can
       be pushed onto a far lid once the near ones are full — and a lid
       holding one distant stray is drawn enormous, which reads as if it
       took MORE when in fact it took fewer. So: repeatedly swap a pair
       of counters between two lids whenever the swap shortens the total
       reach. Counts never change (a swap is one-for-one, so the value
       lock is untouched by construction), it is deterministic, and it
       converges — bounded here so the model can never sit spinning. */
    var d2 = function (j, li) {
      var ddx = pts[j].x - s.lids[li].cx, ddy = pts[j].y - s.lids[li].cy;
      return ddx * ddx + ddy * ddy;
    };
    var pass, a, b, ja, jb, improved = true;
    for (pass = 0; pass < 8 && improved; pass++) {
      improved = false;
      for (a = 0; a < k; a++) {
        for (b = a + 1; b < k; b++) {
          for (ja = 0; ja < out[a].length; ja++) {
            for (jb = 0; jb < out[b].length; jb++) {
              var now = d2(out[a][ja], a) + d2(out[b][jb], b);
              var swapped = d2(out[a][ja], b) + d2(out[b][jb], a);
              if (swapped < now - 1e-9) {
                var t = out[a][ja]; out[a][ja] = out[b][jb]; out[b][jb] = t;
                improved = true;
              }
            }
          }
        }
      }
    }

    for (i = 0; i < k; i++) out[i].sort(function (a, b) { return a - b; });
    return out;
  },

  /* ⭐ THE LID IS AS BIG AS WHAT IS UNDER IT, AND WHAT IS UNDER IT SITS
     THERE. Two earlier drafts got this wrong in opposite directions, and
     the second one is worth recording because it looked right.

     Draft 1 drew every lid at a fixed 132px. That is a picture a child
     can catch out: three small circles cannot have covered thirty
     counters scattered to the corners.

     Draft 2 made the radius reach the farthest counter the lid claimed.
     Honest — and illegible. Ten counters spread over a third of a table
     force a circle a third of a table wide, three of those overlap into
     one orange mass, and the enclosure the radius was bought for becomes
     impossible to read. It also refuted its own selling point: measured
     across the domain, 50 lids shrank when another went down, 77 held
     and 35 GREW.

     What is here instead: a lid is drawn big enough to HOLD its share
     packed in hexagonal rings, and on the lift its counters are shown
     sitting inside it in exactly that packing. Nothing is claimed that
     is not shown. And because every lid hides the same
     number, EVERY LID IS THE SAME SIZE — the value lock is not a
     sentence the teacher says, it is the first thing you notice — and
     when another lid goes down they all shrink together, which this
     time holds for every (n, k) and is gated as such.

     ⚠ Does the size give the share away? No more than the tool already
     does. The total and the lid count are both on screen by design and
     the whole point is that the class CAN work it out; reading it off
     an area is not easier than dividing. */
  MIN_R: 62,
  C_R: 28,             /* a counter's own radius in model units, plus a hair */

  /* ⭐⭐ THE SIGNATURE MOMENT DID NOT HAPPEN, AND THE GATE PRINTED THE
     NUMBER AND PASSED.
     The header sells the value lock as something you SEE: put another lid
     down and they all shrink together. The old packing was fixed-pitch
     hexagonal rings, which collapsed fifteen shares onto three radii —

         share  1     -> r =  74
         share  2 - 7 -> r =  88      one bucket for six different shares
         share  8 -15 -> r = 148

     so the move the whole routine is built on, 12 counters from two lids
     to three (share 6 -> 4), changed the picture by NOTHING AT ALL. That
     is t-001 -> t-002, the two flagship free setups. Running the shipped
     gate: "dropping another never grows them (it shrinks them in 38/81)"
     ... PASS — 0 errors. V15 asserted only `if (!shrank)` — non-vacuity —
     and printed its own failure inside a green run. Either the design
     makes the law true or the claim comes out of the header; softening
     the gate a third time was the forbidden answer.

     ⚠ THE OBVIOUS FIX WAS MEASURED AND REJECTED. A fixed-pitch sunflower
     r_i = c*sqrt(i) gives a beautiful ladder and OVERLAPS: a Vogel
     spiral's tightest pair is the centre-to-first distance, which is c
     itself, so at every constant that produced a usable ladder (31.6, 33,
     34, 36) the counters collided against the 56-unit floor. Mixing
     sunflower radii with hexagonal seats is worse — at share 8 the hex
     ring needs 148 and the sunflower radius offers 118, so the counters
     would sit outside the lid that claims to hold them.

     ⭐ WHAT IS HERE: a bounded, deterministic search over concentric-ring
     arrangements — optional centre, then one to three rings — keeping the
     smallest enclosing circle whose closest pair still clears 2*C_R. Each
     ring sits at the smaller of what its own neighbours need
     ((D/2)/sin(pi/cnt)) and what the ring inside it needs (Rprev + D), so
     non-overlap is STRUCTURAL rather than observed. Measured over the
     whole reachable domain:

         share   1  2  3  4  5  6  7   8   9  10  11  12  13  14  15
         radius 62 62 62 68 76 84 84  93 101 110 112 116 119 124 127
         overlaps 0 · monotone true · 12 distinct radii (was 3)
         DEFAULT MOVE share 6 -> 4:  84 -> 68  =  -19%   (was 0%)
         shrink law: 42/54            (the gate reported 38/81 and passed)
         largest lid: 127u = 25% of the table   (was 148u = 30%)

     The lids got SMALLER at the top end as well as monotone, which buys
     back room on a table that had four 148-unit discs competing for 1000
     units of width. */
  /* ⚠ THE WHOLE DOMAIN, NOT JUST THE REACHABLE ONE. The largest share the
     INTERFACE can produce is PAID_MAX_TOTAL / MIN_LIDS = 15, but the
     model is still asked for k=1 — the oracle sweep checks it precisely
     because the interface can no longer get there — and a lone lid takes
     the whole total. Clamping at 15 made packing(16) hold fifteen
     counters, which the gate caught immediately. Memoised, so the wider
     search costs one pass per distinct share. */
  MAX_PACK: 30,        /* PAID_MAX_TOTAL — a single lid takes all of it */

  /* one ring's radius: big enough for its own neighbours AND to clear the
     ring inside it. `prev < 0` means nothing is inside it yet. */
  _ringR: function (cnt, prev) {
    var need = cnt >= 2 ? (this.C_R) / Math.sin(Math.PI / cnt) : 0;
    var clear = prev < 0 ? 0 : prev + 2 * this.C_R;
    return Math.max(need, clear);
  },

  /* ⚠ THERE IS NO SEPARATE "CENTRE" FLAG, AND A MUTATION IS WHY. The
     first version carried one — optional centre, then rings — and the
     harness mutated the centre point off-origin and the tool did not
     change at all. Not a gap in the gate: the flag was REDUNDANT. A ring
     of ONE sits at radius 0, so `counts = [1, 6]` already IS a centre
     with six round it, and the search reaches the same shape either way.
     An inert mutation is the harness telling you about dead code; the
     honest answer is to delete the code, not to write an assertion for a
     branch nothing can reach. */
  _layout: function (counts) {
    var out = [], prev = -1, i, j, cnt, R, a;
    for (i = 0; i < counts.length; i++) {
      cnt = counts[i];
      R = this._ringR(cnt, prev);
      for (j = 0; j < cnt; j++) {
        a = (Math.PI * 2 * j) / cnt + (i % 2 ? Math.PI / cnt : 0);
        out.push({ dx: R * Math.cos(a), dy: R * Math.sin(a) });
      }
      prev = R;
    }
    return out;
  },

  _clears: function (p) {
    var i, j, d, D = 2 * this.C_R;
    for (i = 0; i < p.length; i++) {
      for (j = i + 1; j < p.length; j++) {
        d = Math.sqrt((p[i].dx - p[j].dx) * (p[i].dx - p[j].dx) +
                      (p[i].dy - p[j].dy) * (p[i].dy - p[j].dy));
        if (d < D - 1e-9) return false;
      }
    }
    return true;
  },

  _reach: function (p) {
    var r = 0, i, d;
    for (i = 0; i < p.length; i++) {
      d = Math.sqrt(p[i].dx * p[i].dx + p[i].dy * p[i].dy);
      if (d > r) r = d;
    }
    return r;
  },

  /* where the m counters under a lid sit, relative to its centre.
     Deterministic, and the SAME list the renderer draws and the gate
     measures. Memoised because render() and the gates both call it in
     loops; the cache is keyed on m alone, which is the whole input. */
  packing: function (m) {
    if (!(m > 0)) return [];
    if (m > this.MAX_PACK) m = this.MAX_PACK;
    this._packCache = this._packCache || {};
    if (this._packCache[m]) return this._packCache[m];

    var best = null, bestR = Infinity, a, b, p, r;
    var take = function (cand) {
      if (!cand || cand.length !== m || !this._clears(cand)) return;
      r = this._reach(cand);
      if (r < bestR - 1e-9) { bestR = r; best = cand; }
    }.bind(this);

    /* one, two or three concentric rings — and a ring of one is a centre */
    take(this._layout([m]));
    for (a = 1; a < m; a++) take(this._layout([a, m - a]));
    for (a = 1; a < m; a++) {
      for (b = 1; b < m - a; b++) take(this._layout([a, b, m - a - b]));
    }
    /* ⚠ THE FALLBACK HOLDS m COUNTERS, NOT ONE. The search always
       succeeds — a single ring of m is constructible for every m, and
       V15 proves `packing(m).length === m` across the whole domain — but
       a total function should degrade to something of the right SIZE
       rather than to a single point, or a future change to the search
       would silently draw one counter where the lid claims m. */
    p = best || this._layout([m]);
    this._packCache[m] = p;
    return p;
  },

  /* the radius a lid needs to HOLD a given share — the whole ladder, and
     the one place the size of a lid is decided */
  /* ⚠ CEIL, NOT ROUND. Math.round shaved a fifth of a unit off three of
     the fifteen radii (share 9 wanted 101.2 and got 101), so the outer
     counters sat marginally OUTSIDE the lid that claims to hold them —
     the whole point of sizing a lid from its own packing. The gate caught
     it; the fix is to round up, never to widen the tolerance. */
  radiusForShare: function (m) {
    /* ⚠ AND THE DUST IS SHAVED BEFORE THE CEIL. The reach for six
       counters is exactly 56 and computes as 56.000000000000014, so a
       bare ceil made the lid 85 where 84 holds it — one unit of slack
       bought entirely from floating point, and the gate called it
       "padded, not measured". 1e-9 is far below any real geometry here
       and far above the dust. */
    return Math.ceil(Math.max(this.MIN_R, this._reach(this.packing(m)) + this.C_R) - 1e-9);
  },

  /* ONE radius for every lid, because every lid holds the same number */
  lidRadius: function (st) {
    return this.radiusForShare(this.share(this._st(st)));
  },

  /* where "Another lid" puts the next one: the emptiest spot on the
     table. ⚠ The first version stepped W/(k+2) and marched every new lid
     TOWARDS the last one, so three lids landed in an overlapping heap —
     a convenience control that produces a broken arrangement is not a
     convenience. Deterministic grid search, ties by scan order. */
  /* the radius a lid WILL have once the table holds k of them — needed
     before the lid exists, so the clamp can keep the whole disc on the
     table rather than just its centre */
  radiusAtCount: function (st, k) {
    var s = this._st(st);
    return this.radiusForShare(k < 1 ? 0 : Math.floor(s.n / k));
  },

  /* ⭐⭐ ONE LAW FOR WHERE A LID MAY SIT, used by the drag, the ghosts,
     the keyboard and the auto-placer, so they cannot disagree.

     ⚠ IT CLAMPS THE LID, NOT THE CENTRE. addLid and moveLid used to clamp
     to 0..W and 0..H — the centre — while _farPoint's own comment insisted
     the grid was inset "far enough that the whole lid lands on the table".
     The auto-placer was careful and the drag threw it away. Measured on a
     20-counter table with two lids, dragging one into the corner:

         moveLid to (1000, 620) accepted -> {cx:1000, cy:620}
         lid radius 148u; of 10 seated counters, 6 fall OUTSIDE the table
         (worst 104u past the edge) — and .lid-table is overflow:hidden

     So the class lifted a lid the tool said hid ten and counted four. The
     value lock is the one invention this tool has, and a drag to the edge
     broke it on screen. */
  _placeable: function (st, cx, cy, k) {
    var s = this._st(st);
    var r = this.radiusAtCount(s, k);
    var x = Math.round(Number(cx)), y = Math.round(Number(cy));
    if (!isFinite(x) || !isFinite(y)) return null;
    /* if the table is narrower than the lid, centre it rather than
       producing an empty range — total, for every (n, k) */
    var lo = Math.min(r, this.W / 2), hi = Math.max(this.W - r, this.W / 2);
    x = Math.max(lo, Math.min(hi, x));
    lo = Math.min(r, this.H / 2); hi = Math.max(this.H - r, this.H / 2);
    y = Math.max(lo, Math.min(hi, y));
    return { cx: Math.round(x), cy: Math.round(y) };
  },

  /* where an auto-placed lid goes: the emptiest spot on the table.
     ⚠ The first version stepped W/(k+2) and marched every new lid TOWARDS
     the last one, so three lids landed in an overlapping heap — a
     convenience control that produces a broken arrangement is not a
     convenience. Deterministic grid search, ties by scan order.
     ⚠ THE BAND USED TO STOP AT cy 450 OF 620, so auto-placed lids never
     occupied the bottom quarter of the table and three discs sat in a row
     above a wide empty strip. The band now runs the full height and the
     clamp keeps each lid whole, which is what the inset was standing in
     for. */
  _farPoint: function (st, k) {
    var s = this._st(st);
    if (k == null) k = s.lids.length + 1;
    if (!s.lids.length) return this._placeable(s, this.W * 0.5, this.H * 0.5, k);
    var best = null, bestD = -1, gx, gy, i, dx, dy, d, m, p;
    for (gy = 0; gy < 5; gy++) {
      for (gx = 0; gx < 7; gx++) {
        p = this._placeable(s, 120 + (760 / 6) * gx, 110 + (400 / 4) * gy, k);
        if (!p) continue;
        m = Infinity;
        for (i = 0; i < s.lids.length; i++) {
          dx = p.cx - s.lids[i].cx; dy = p.cy - s.lids[i].cy;
          d = dx * dx + dy * dy;
          if (d < m) m = d;
        }
        if (m > bestD) { bestD = m; best = p; }
      }
    }
    return best;
  },

  /* the counters still on the table — the ONLY ones the render may see
     before the lift */
  visibleIndices: function (st) {
    var s = this._st(st);
    var a = this.assignment(s), taken = {}, out = [], i, j;
    for (i = 0; i < a.length; i++) for (j = 0; j < a[i].length; j++) taken[a[i][j]] = 1;
    for (i = 0; i < s.n; i++) if (!taken[i]) out.push(i);
    return out;
  },

  /* ⚠ THROWS BEFORE THE LIDS ARE LIFTED — the estimate-jar-core idiom
     (getActual throws pre-reveal). Note what this does and does not
     claim: `x` is DERIVABLE from the total and the lid count, both of
     which are on screen, and that is the point — the class can work it
     out. What must not happen is the TOOL working it out for them, or
     the covered counters sitting in the tree to be counted one by one. */
  revealed: function (st) {
    var s = this._st(st);
    if (!s.lifted) throw new Error('the lids are still down');
    return { share: this.share(s), leftover: this.leftover(s) };
  },

  setTotal: function (st, n) {
    var s = this._clone(st);
    var v = Math.round(Number(n));
    if (!isFinite(v) || v < this.MIN_TOTAL || v > this.PAID_MAX_TOTAL) return null;
    if (v === s.n) return null;
    /* refuse rather than destroy: changing the total once lids are down
       would silently rewrite the question the class is looking at */
    if (s.lids.length) return null;
    s.n = v;
    s.seed = v * 7919;
    s.guess = null;
    s.lifted = false;
    return s;
  },

  /* ⚠ ADDING OR REMOVING A LID VOIDS THE COMMITMENT. "Now put a third one
     down" is the whole move of the routine, and a marker parked for two
     lids is not an answer to the three-lid question — leaving it up would
     be the tool quietly re-using an old commitment for a new problem.
     moveLid does NOT clear it (the share is unchanged by where a lid
     sits) and neither does lower (the class may want to look again). */
  /* ⭐ PLACING FROM AN EMPTY TABLE LAYS TWO. See MIN_LIDS: one lid takes
     floor(n/1) = n and swallows every counter, which was one click from
     the opening frame. The pair is also what the routine is: "the second
     lid is not a feature here, it is the subject." */
  addLid: function (st, cx, cy) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (s.lids.length >= this.MAX_LIDS) return null;
    var pairing = s.lids.length === 0;
    var k = pairing ? this.MIN_LIDS : s.lids.length + 1;
    var p = this._placeable(s, cx, cy, k);
    if (!p) return null;
    s.lids.push(p);
    if (pairing) {
      /* the second of the pair goes to the emptiest spot left, measured
         against the first — the same rule the ghosts draw */
      var q = this._farPoint(s, k);
      if (!q) return null;
      s.lids.push(q);
    }
    s.guess = null;
    return s;
  },

  moveLid: function (st, i, cx, cy) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (!(i >= 0 && i < s.lids.length)) return null;
    var p = this._placeable(s, cx, cy, s.lids.length);
    if (!p) return null;
    s.lids[i] = p;
    return s;
  },

  /* ⚠ AND TAKING ONE AWAY FROM TWO CLEARS THE TABLE, for the same reason:
     k = 1 is not a state this tool has. */
  removeLid: function (st) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (!s.lids.length) return null;
    s.lids.pop();
    if (s.lids.length === 1) s.lids.pop();
    s.guess = null;
    return s;
  },

  /* ⭐ THE COMMITTED PRIOR. It moves freely until the lids come up, and
     never again — by REFUSAL, so no path in the file can move it.
     ⚠ Returns null on refusal, never an unchanged clone: the recorded
     number-sieve defect where a failure carried the old data forward and
     committed itself as a success.

     ⚠ AND IT REFUSES UNTIL THERE IS A QUESTION. The operator's report on
     the shipped tool was "the numbers under the board has no function",
     and the state they were looking at was the opening one: no lids on
     the table, nothing to be asked, and the whole strip live and willing
     to accept a commitment anyway. A control that will take an answer to
     a question nobody has posed is not a control, it is furniture. Two
     lids is the floor because one lid is a subtraction — the tool this
     one refuses to be (refusal 1). Enforced HERE, in the model, so no
     path can park a marker early; the disabled attribute on the buttons
     is only the mirror. */
  /* ⚠ ONE SCALE, READ TWICE. The bound is stripTop(), the same function
     the renderer draws from — the shipped build bounded here at
     PAID_MAX_TOTAL while the strip rendered 0..12, so the model and the
     picture disagreed about what could be chosen. */
  placeGuess: function (st, v) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (s.lids.length < this.MIN_LIDS) return null;
    var g = Math.round(Number(v));
    if (!isFinite(g) || g < 1 || g > this.stripTop(s)) return null;
    s.guess = (s.guess === g) ? null : g;
    return s;
  },

  /* ⚠ AND THE LIFT REFUSES BELOW TWO. The shipped build allowed
     `lids.length >= 1`, so a teacher could put one lid down and lift it —
     reaching the single-lid subtraction that refusal 1 calls "the tool
     this one refuses to be" — with no string and no refusal anywhere on
     that path. Belt and braces with MIN_LIDS: the reachable set already
     makes k=1 unreachable, and this refuses it in the model too. */
  lift: function (st) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (s.lids.length < this.MIN_LIDS) return null;
    s.lifted = true;
    return s;
  },

  lower: function (st) {
    var s = this._clone(st);
    if (!s.lifted) return null;
    s.lifted = false;
    return s;
  },

  maxTotal: function () { return this.premium ? this.PAID_MAX_TOTAL : this.FREE_MAX_TOTAL; },

  /* =================================================================
     ENTITLEMENT — the pattern from pattern-bench.js:239-265.
     ⚠ UNKNOWN IS PESSIMISTIC, and locking a control is not enough: the
     state it produced must be reset once we actually know. See render().
     ================================================================= */
  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 1;
    return s;
  },
  _saveStore: function () { try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {} },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
      } else self.premium = false;
      self.premiumKnown = true;
      if (self._wrap) self.render();
    };
    if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
        var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        if (self._wrap) self.render();
      })
      .catch(trustCache);
  },

  /* ---- THE TABLE BOOK. Locale-NEUTRAL by construction: a table is a
     total and a set of lid positions, so it carries no words in any
     language and can be grown and proven mechanically. ------------- */
  /* ⚠ THE FALLBACK CARRIES THE FREE TABLES INLINE, never an empty array:
     a 404 must degrade to the FREE TIER, not to nothing (the recorded
     arrow-strip Mat Book defect). */
  FALLBACK_SETUPS: {
    version: 1, freeMax: 8, premiumMax: 76,
    setups: [
      { id: 't-001', n: 12, k: 2, free: true },
      { id: 't-002', n: 12, k: 3, free: true },
      { id: 't-003', n: 13, k: 3, free: true },
      { id: 't-004', n: 10, k: 2, free: true },
      { id: 't-005', n: 15, k: 4, free: true },
      { id: 't-006', n: 16, k: 4, free: true },
      { id: 't-007', n: 9, k: 2, free: true },
      { id: 't-008', n: 20, k: 3, free: true }
    ]
  },

  _fetchSetups: function () {
    var self = this;
    fetch('/mini-tools/lids-setups.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_SETUPS; })
      .then(function (d) {
        self.data = (d && d.setups && d.setups.length) ? d : self.FALLBACK_SETUPS;
        if (self._wrap) self.render();
      });
  },

  /* locked setups are ABSENT from the array, never merely hidden */
  setupsFor: function () {
    var all = (this.data && this.data.setups) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  /* lay k lids out evenly across the table — a setup names a total and a
     lid COUNT, never positions, so the book stays tiny and locale-free */
  loadSetup: function (st, rec) {
    var s = this._clone(st);
    /* ⚠ k >= MIN_LIDS, not k >= 1: the book has never contained a
       one-lid table and the tool no longer has a one-lid state, so a
       setup asking for one is rejected rather than quietly laid out. */
    if (!rec || !(rec.n >= this.MIN_TOTAL) || !(rec.k >= this.MIN_LIDS)) return null;
    if (rec.n > this.PAID_MAX_TOTAL || rec.k > this.MAX_LIDS) return null;
    s.n = rec.n;
    s.seed = rec.n * 7919;
    s.guess = null;
    s.lifted = false;
    s.lids = [];
    /* laid out through the same clamp everything else uses, so a book
       table cannot put a lid half off the edge either */
    var i, p, gap = this.W / (rec.k + 1);
    for (i = 0; i < rec.k; i++) {
      p = this._placeable(s, Math.round(gap * (i + 1)), Math.round(this.H / 2), rec.k);
      if (!p) return null;
      s.lids.push(p);
    }
    return s;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectLidsCSS();
    /* the wide-viewport switch, and the one-line rollback */
    document.body.classList.add('lid-wide');
    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._timers = [];
    this._setupIdx = 0;
    this._rounds = [];
    this._fetchSetups();
    this._fetchEntitlement();
    /* ⚠ NO render() HERE. The shell calls tool.init(api) and then
       tool.render() on the very next line (lcs-shell.js:994-995), so the
       old call built the whole stage twice on every single boot. */
  },

  reset: function () {
    this.st = this.newState();
    this._setupIdx = 0;
    this._rounds = [];
    this._say(null);
    this.render();
  },

  /* ⚠ AND IT TAKES THE BODY CLASS WITH IT. init adds `lid-wide` to
     <body>; destroy used to clear the timers and nothing else, so the
     class outlived the tool in any document that mounts a second one. */
  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    document.body.classList.remove('lid-wide', 'lid-paid');
  },

  onSettings: function () {
    /* the shell renders immediately after this returns; a second render
       here would rebuild the stage twice per toggle */
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  /* =================================================================
     THE TOOL'S VOICE — one channel, both audiences.

     ⭐ NO CONTROL ON THIS CARD GOES GREY IN SILENCE. The shipped build
     had three: the six total chips died the instant a lid landed, the
     whole numeral strip was dead below two lids, and "Another lid" died
     at four. Every one of those refusals is deliberate and defensible,
     and not one of them said anything, so each read as breakage — which
     is most of what "a bit confusing" was.

     ⚠ AND `title` ON A DISABLED BUTTON CANNOT FIX IT. A disabled button
     is unfocusable and skipped by screen readers, and THERE IS NO HOVER
     ON A PROJECTOR OR A TOUCH PANEL — which is the entire population this
     tool is built for. So a refusing control keeps `aria-disabled`, stays
     focusable and clickable, and speaks: api.announce for the one person
     with a screen reader, and the hint band for the thirty people looking
     at the wall.

     ⚠ `disabled` SURVIVES IN EXACTLY ONE CASE — a control whose effect is
     already the state (the total that is already chosen). A live control
     that provably does nothing reads as broken too.

     ⚠ DISPATCH BY REASON, NEVER BY "THE REDUCER RETURNED NULL". Four
     panels caught this independently: setTotal returns null for three
     different reasons and placeGuess for two, so speaking one string on
     any null would announce "Lids are on the table" over an empty one,
     or "The lids are up" when no lid had ever been placed. ================================================================= */
  _say: function (key) {
    var self = this;
    this._said = key || null;
    if (!key || !this._wrap) { if (this._wrap) this.render(); return; }
    this.api.announce(this.api.t(key));
    this.render();
    this._after(4200, function () {
      if (self._said === key) { self._said = null; if (self._wrap) self.render(); }
    });
  },

  /* wire a control that cannot act right now: it keeps its own label,
     stays reachable, and names its reason when pressed */
  _refuse: function (btn, key) {
    var self = this;
    btn.setAttribute('aria-disabled', 'true');
    btn.classList.add('lid-hold');
    btn.title = this.api.t(key);
    btn.addEventListener('click', function () { self._say(key); });
    return btn;
  },

  _announce: function (msg) { if (msg) this.api.announce(msg); },

  /* =================================================================
     RENDER
     ================================================================= */
  /* ⭐ FOCUS: ONE MECHANISM, NOT FIVE SPECIAL CASES.
     render() does stage.innerHTML = '' and rebuilds everything, so every
     press destroys the button that was pressed. The shipped build put a
     bespoke .focus() restore inside the lid handler and another inside
     the strip, and none on the five foot chips — so a keyboard teacher
     pressing "Another lid" was thrown to <body> on every press.
     Now every focusable node carries a stable data-fk, and render() is a
     sandwich: read the key, rebuild, put focus back.
     ⚠ IT ONLY EVER RESTORES FOCUS THAT WAS ALREADY INSIDE .lid-wrap, so
     it cannot steal focus at boot and cannot yank the teacher out of the
     shell's settings drawer when commitSettings calls tool.render(). */
  _FALLBACK: function (key) {
    if (key.indexOf('ghost:') === 0) return 'lid:0';
    if (key.indexOf('lid:') === 0) return 'add';
    if (key.indexOf('mark:') === 0) return 'lift';
    return 'add';
  },

  render: function () {
    var api = this.api, self = this;

    /* --- focus, half one --- */
    var prev = document.activeElement;
    var key = (this._wrap && prev && this._wrap.contains(prev))
      ? prev.getAttribute('data-fk') : null;
    if (this._focusNext) { key = this._focusNext; this._focusNext = null; }

    /* ⚠ locking a control is not enough — reset the STATE it produced.
       If we learn the account is free while a paid-size total is on the
       table, put it back.
       ⚠ BUT NOT MID-LESSON. The shipped build wiped lids, guess AND
       lifted the moment a cached-premium account resolved to free, which
       can land while a class is looking at the table. It now only
       re-clamps an EMPTY table; a table in play keeps its question and
       the gate line explains the rest. */
    if (this.premiumKnown && !this.premium && this.st.n > this.FREE_MAX_TOTAL &&
        !this.st.lids.length) {
      this.st.n = this.FREE_MAX_TOTAL;
      this.st.seed = this.FREE_MAX_TOTAL * 7919;
      this.st.guess = null;
      this.st.lifted = false;
    }

    api.stage.innerHTML = '';
    var wrap = api.el('div', 'lid-wrap');
    this._wrap = wrap;
    /* ⚠ THE HINT SITS ABOVE THE TABLE — the only instruction this tool
       gives, and below a tall table it can be off-screen at the moment
       it appears (the recorded number-sieve defect). */
    wrap.appendChild(this._buildHint());
    wrap.appendChild(this._buildTable());
    if (api.settings.strip !== false) wrap.appendChild(this._buildStrip());
    wrap.appendChild(this._buildRecord());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);

    /* the printable lives OUTSIDE the wrap: print hides .lid-wrap
       entirely and a sheet inside it would inherit that */
    this._ensureSheet(api.stage);

    /* --- focus, half two --- */
    if (!key) return;
    var el = wrap.querySelector('[data-fk="' + key + '"]') ||
             wrap.querySelector('[data-fk="' + this._FALLBACK(key) + '"]');
    if (el) { try { el.focus(); } catch (_) {} }
    void self;
  },

  /* ⚠ `hintMark` WAS A DEAD STRING. "Park the marker on the number you
     think it is." was authored in all eleven locales and never once
     referenced — the ladder jumped hintShare straight to hintLift, so
     the tool never told the class what the strip was for. That is half
     the reason the numerals read as decoration. It now has the one rung
     where it belongs: the state where the strip is live and empty.
     verify-lids V17 makes an unreferenced string a build failure. */
  /* ⭐ THE LADDER — and it had two rungs missing, one of which was 60% of
     the tool.
     `hintMark` used to be a DEAD STRING: authored in eleven locales and
     never referenced, so the tool never said what the numerals were for.
     Worse, the exact-share case rendered an EMPTY STRING — measured
     across the fifteen configurations the totals can reach with two or
     more lids, NINE render blank. The clean share is not an edge case, it
     is the majority of the tool, and the tool said nothing about it. That
     silence is itself an editorial: it marks the exact share as the case
     with nothing to say and the remainder as the case where something
     went wrong — the precise inverse of this tool's third invention.

     ⚠ EVERY RUNG IS GUARDED ON WHAT IS ACTUALLY ON SCREEN. Six native
     panels independently caught the same class of defect: `hintAgain`
     ("...then put another one down") is FALSE at MAX_LIDS, where the next
     thing the class meets is `refuseMax`; and `hintMark` ("Choose a
     number below") is FALSE when the strip is switched off. A hint that
     instructs a move the tool refuses is the marker defect again. */
  _buildHint: function () {
    var api = this.api, s = this.st, hint = api.el('div', 'lid-hint');
    var self = this;
    var line = function (key) {
      var el = api.el('span', 'lid-hline');
      el.textContent = api.t(key);
      hint.appendChild(el);
      return el;
    };

    /* a refusal takes the band for a few seconds, and says so in coral */
    if (this._said) {
      hint.className = 'lid-hint lid-say';
      line(this._said);
      return hint;
    }

    if (s.lifted) {
      line(this.leftover(s) > 0 ? 'hintLeftover' : 'hintExact');
      /* the routine's whole move — but only where it is true */
      if (s.lids.length < this.MAX_LIDS) line('hintAgain');
    } else if (s.lids.length < this.MIN_LIDS) {
      line('hintPlace');
      line('hintRule');
    } else if (s.guess === null) {
      line('hintShare');
      if (api.settings.strip !== false) line('hintMark');
    } else {
      line('hintLift');
    }
    void self;
    return hint;
  },

  /* =================================================================
     THE TABLE. Counters at seeded scatter points; lids dragged anywhere.
     ⚠ THE COVERED COUNTERS ARE NOT RENDERED AT ALL. They are not faded,
     not aria-hidden, not opacity:0 — they are simply not built. That is
     the house doctrine (number-balance.js:437-439,
     part-whole-frame.js:517-520) and this tool inherits it rather than
     claiming it.
     ================================================================= */
  /* the three-part accessible name, joined as label-colon-value.
     ⚠ DELIBERATELY NOT "{n} counters". Label-colon-value is the one shape
     that stays grammatical in all eleven languages with a bare numeral
     appended by code — Finnish needs partitive plural, German needs no
     agreement at all, and nobody is going to author plural forms for
     this. Every native panel resolved its own three phrases on that
     basis, and two of them corrected my English while doing it: "lids
     down" is FALSE once the lids are up, and "counters on the table"
     stuttered against the group's own name. */
  _tableName: function () {
    var api = this.api, s = this.st;
    return api.t('tableLabel') + '. ' +
      api.t('countersAria') + ': ' + s.n + ', ' +
      api.t('lidsAria') + ': ' + s.lids.length + ', ' +
      api.t('looseAria') + ': ' + this.leftover(s);
  },

  _buildTable: function () {
    var api = this.api, self = this, s = this.st;
    var box = api.el('div', 'lid-table');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', this._tableName());

    var pts = this.scatter(s);
    var vis = s.lifted ? null : this.visibleIndices(s);
    var i;

    /* ⭐ THE GHOSTS — the answer to "what do I do", drawn instead of
       written. Two dashed circles at exactly the coordinates a lid would
       land on, at MIN_R and never at the share's own radius (a ghost
       sized from the share would pre-announce the re-settle). They are
       real buttons, so the liveness gate can press them and a keyboard
       teacher can reach them, and they carry the SAME accessible name as
       the chip because they perform the same move.
       ⚠ TWO PREVIEWS OF ONE MOVE, not two controls. Pressing either lays
       the pair — because k=1 is not a state this tool has, and a first
       press that made every counter vanish is what the ghosts exist to
       prevent. */
    if (!s.lids.length && !s.lifted && api.settings.ghosts !== false) {
      var probe = this._clone(s), g;
      for (i = 0; i < this.MIN_LIDS; i++) {
        g = i === 0
          ? this._placeable(probe, this.W * 0.5, this.H * 0.5, this.MIN_LIDS)
          : this._farPoint(probe, this.MIN_LIDS);
        if (!g) break;
        probe.lids.push(g);
        box.appendChild(this._ghost(g, i));
      }
    }

    /* ⚠⚠ PAINT ORDER IS THE WHOLE REVEAL, AND IT WAS BACKWARDS.
       Counters were appended first and lids second, both absolutely
       positioned with no z-index, so the lid painted LAST — on top. With
       `.lid-up` at opacity .32 the class saw the counters through an
       orange veil at the one moment that has to be clean: measured, a
       veiled counter blends to #5B6F58, which is 1.17:1 against an
       unveiled neighbour. The lift's entire job is to show WHICH counters
       were under WHICH lid, and the old treatment destroyed exactly that.
       No gate could see it — every assertion was on counts and classes.
       So when the lids are up they are painted FIRST and the counters sit
       on top of them; while they are down they still paint last, because
       a cover that does not cover is not a cover. */
    var paintLids = function () {
      s.lids.forEach(function (lid, idx) {
        var el = api.el('button', 'lid-lid' + (s.lifted ? ' lid-up' : ''));
        el.type = 'button';
        el.setAttribute('data-fk', 'lid:' + idx);
        el.style.left = (lid.cx / self.W * 100) + '%';
        el.style.top = (lid.cy / self.H * 100) + '%';
        /* as wide as it holds — see radiusForShare(). A percentage of the
           table's WIDTH with aspect-ratio:1, so the circle stays a circle
           whatever the table's own scale; CSS min-width holds the 44px tap
           floor when the arithmetic asks for something smaller. */
        el.style.width = (self.lidRadius(s) * 2 / self.W * 100) + '%';
        el.setAttribute('aria-label', api.t('lidAria').replace('{i}', String(idx + 1)));
        self._wireLidDrag(el, idx, box);
        box.appendChild(el);
      });
    };

    if (s.lifted) {
      paintLids();
      /* ⭐ THE COUNTERS ARE SHOWN WHERE THEY WERE — UNDER THEIR OWN LID,
         in the same packing the lid was sized to hold. So the class does
         not take "ten under each" on trust; they count ten under each.
         An earlier draft put every counter back at its scatter point,
         which answered the question with a shrug. What was never under a
         lid has not moved and does not move now — and it does not
         animate either, which is the only difference the tool ever draws
         between a shared counter and a left-over one. */
      var pack = this.packing(this.share(s));
      s.lids.forEach(function (lid) {
        for (var q = 0; q < pack.length; q++) {
          box.appendChild(self._counter({ x: lid.cx + pack[q].dx, y: lid.cy + pack[q].dy }, api, 'lid-fresh'));
        }
      });
      var rest = this.visibleIndices(s);
      for (i = 0; i < rest.length; i++) box.appendChild(this._counter(pts[rest[i]], api));
    } else {
      for (i = 0; i < vis.length; i++) box.appendChild(this._counter(pts[vis[i]], api));
      paintLids();
    }
    return box;
  },

  _ghost: function (p, i) {
    var api = this.api, self = this;
    var g = api.el('button', 'lid-ghost');
    g.type = 'button';
    g.setAttribute('data-fk', 'ghost:' + i);
    g.style.left = (p.cx / this.W * 100) + '%';
    g.style.top = (p.cy / this.H * 100) + '%';
    g.style.width = (this.MIN_R * 2 / this.W * 100) + '%';
    g.setAttribute('aria-label', api.t('firstLid'));
    g.addEventListener('click', function () { self._placeFrom(p.cx, p.cy); });
    this._wireGhostDrag(g);
    return g;
  },

  /* ⚠ aria-hidden, AND NO LABEL AT ALL. Every counter used to carry
     aria-label="a counter", so a screen-reader user met up to thirty
     identical announcements and never learned how many were on the
     table — noise that was simultaneously not a real name, since an
     aria-label on a role-less <div> is not reliably exposed anyway. The
     count now lives on the group, where a count belongs, and
     `counterAria` is deleted from all eleven locales. */
  _counter: function (p, api, extra) {
    var c = api.el('div', 'lid-counter' + (extra ? ' ' + extra : ''));
    c.style.left = (p.x / this.W * 100) + '%';
    c.style.top = (p.y / this.H * 100) + '%';
    c.setAttribute('aria-hidden', 'true');
    return c;
  },

  /* placing, from wherever the gesture started */
  _placeFrom: function (cx, cy) {
    var next = this.addLid(this.st, cx, cy);
    if (!next) { this._say('refuseMax'); return; }
    this.st = next; this._said = null;
    this._focusNext = 'lid:0';
    this._announce(this.api.t('lidsAria') + ': ' + next.lids.length + ', ' +
                   this.api.t('looseAria') + ': ' + this.leftover(next));
    this.render();
  },

  /* the ghost is both the suggestion and the handle: press it and the
     pair lands where it sits, or carry it and the pair lands where you
     let go. One object, one gesture, no new region and no new pixels. */
  _wireGhostDrag: function (el) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      var box = el.parentNode;
      if (!box) return;
      ev.preventDefault();
      try { el.setPointerCapture(ev.pointerId); } catch (_) {}
      var moved = false, sx = ev.clientX, sy = ev.clientY, at = null;
      var move = function (e) {
        var r = box.getBoundingClientRect();
        if (!r.width) return;
        if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 6) moved = true;
        at = {
          cx: (e.clientX - r.left) / r.width * self.W,
          cy: (e.clientY - r.top) / r.height * self.H
        };
        el.classList.add('lid-carry');
        el.style.left = (at.cx / self.W * 100) + '%';
        el.style.top = (at.cy / self.H * 100) + '%';
      };
      var up = function () {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        if (moved && at) self._placeFrom(at.cx, at.cy);
        else self.render();
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
    el.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
      ev.preventDefault();
      el.click();
    });
  },

  /* free 2-D placement — no precedent on this platform (sort-bins-core
     is a DISCRETE drop-target drag with no stored coordinates, and
     letter-tiles is 1-D-per-row), so the choreography is copied as a
     PATTERN from sort-bins-core.js:350-408 and nothing is imported.
     ⚠ The keyboard fallback is not optional: the liveness gate drives
     controls by key when a click changes nothing. */
  _wireLidDrag: function (el, idx, box) {
    var self = this, api = this.api;
    /* ⚠ AFTER THE LIFT A LID IS NOT DEAD, IT IS A READOUT. pointerdown
       used to return immediately and the arrow keys returned null, so a
       lifted lid was a live-looking control that did nothing. Now it says
       what it was hiding. */
    if (this.st.lifted) {
      el.addEventListener('click', function () {
        self._announce(api.t('revealAria') + ': ' + self.share(self.st));
      });
      return;
    }
    el.addEventListener('pointerdown', function (ev) {
      if (self.st.lifted) return;
      ev.preventDefault();
      el.setPointerCapture(ev.pointerId);
      var move = function (e) {
        var r = box.getBoundingClientRect();
        if (!r.width) return;
        var cx = (e.clientX - r.left) / r.width * self.W;
        var cy = (e.clientY - r.top) / r.height * self.H;
        var next = self.moveLid(self.st, idx, cx, cy);
        if (!next) return;
        self.st = next; self._said = null;
        el.style.left = (self.st.lids[idx].cx / self.W * 100) + '%';
        el.style.top = (self.st.lids[idx].cy / self.H * 100) + '%';
      };
      var up = function () {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        self.render();
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
    /* keyboard: nudge the lid across the table */
    el.addEventListener('keydown', function (ev) {
      var lid = self.st.lids[idx], next;
      if (!lid) return;
      /* ⭐ ENTER OR SPACE CARRIES IT SOMEWHERE CLEAR — the keyboard's
         version of picking a lid up and putting it down, using the same
         emptiest-spot rule as "Another lid".
         ⚠ It is here because the liveness gate condemned every lid as a
         dead control, and it was RIGHT to: arrows nudged, but the gate
         presses Enter and Space, and a drag handle that answers neither
         is unusable to anyone who cannot drag. ⚠ It is a MOVE and not a
         toggle on purpose — the gate presses both keys in one tick, so a
         toggle would flip on, flip back, and report itself dead. */
      if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
        ev.preventDefault();
        var without = self._clone(self.st);
        without.lids.splice(idx, 1);
        var p = self._farPoint(without, self.st.lids.length);
        if (!p) return;
        next = self.moveLid(self.st, idx, p.cx, p.cy);
        if (!next) return;
        self.st = next; self._said = null;
        self._focusNext = 'lid:' + idx;
        self._announce(api.t('lidAria').replace('{i}', String(idx + 1)));
        self.render();
        return;
      }
      var d = { ArrowLeft: [-60, 0], ArrowRight: [60, 0], ArrowUp: [0, -60], ArrowDown: [0, 60] }[ev.key];
      if (!d) return;
      ev.preventDefault();
      next = self.moveLid(self.st, idx, lid.cx + d[0], lid.cy + d[1]);
      if (!next) return;
      self.st = next; self._said = null;
      self._focusNext = 'lid:' + idx;
      self.render();
    });
  },

  /* ⭐ THE STRIP — where the class commits, AND where the answer lands.
     ---------------------------------------------------------------
     The operator's report on the shipped tool was blunt and correct:
     "the numbers under the board has no function." They were right, and
     the code was worse than the complaint. Of five reads of `s.guess` in
     the whole file, four were this strip's own highlight and its own
     aria-pressed, and the fifth was a PRESENCE test in the hint ladder —
     so parking the marker on 0 advanced the tool exactly as parking it
     on the right answer did. The marker was never once brought into
     contact with share(). It highlighted itself and changed nothing.

     ⚠ AND EVERY GATE PASSED IT. audit-tool-control-liveness asks "did
     the DOM change?", and a control that highlights ITSELF changes the
     DOM — so it scored 84/84 on a strip that did nothing. A liveness
     gate cannot tell "this control acts" from "this control has a
     consequence". That is now a standing trap in §23.6.

     THE FIX, operator-ruled: at the lift the true share is marked ON THE
     SAME STRIP the class parked their marker on. One scale, both values,
     and the tool says nothing whatever about the gap between them. This
     is the house's own best precedent — estimation-jar.js paints the
     committed guesses and the truth through one formula onto one number
     line, and never calls its own compare() in the render path.

     ⚠ THE TWO TREATMENTS DIFFER IN KIND, NOT IN HUE. A coral-vs-teal
     pair was designed and rejected: to a six-year-old orange reads as
     "wrong" and green as "right", which is a verdict delivered by
     palette — and here it would read BACKWARDS, because the marker is
     the teal one. Filled-vs-ringed carries no such freight. There is no
     tick, no cross, no distance, no "closest", and no line drawn between
     the two numerals.

     ⚠ The old .lid-reveal dot row is GONE. It expressed the share as
     `share` unlabelled 26px circles on their own centred row — a second,
     worse rendering of something the table already shows, now that the
     lift seats the real counters under each lid. Unlabelled divs are
     also silent to a screen reader, which is why revealAria has moved
     onto the truth numeral itself. */
  _buildStrip: function () {
    var api = this.api, self = this, s = this.st;
    var strip = api.el('div', 'lid-strip');
    strip.setAttribute('role', 'group');
    strip.setAttribute('aria-label', api.t('markStrip'));
    /* ⚠ share() is read ONCE, here, and ONLY when the lids are up. It is
       never compared with s.guess anywhere in this file. */
    var truth = s.lifted ? this.revealed(s).share : null;
    /* ⭐ 1..stripTop(n) — see stripTop(). The shipped build ran
       0..min(maxTotal, 12), which could not hold its own answer at total
       30 (share 15) and offered nine numerals that could never be the
       answer at total 8. Zero goes too: with MIN_TOTAL 4 against
       MAX_LIDS 4 the share is always at least 1, so a leading 0 was the
       same dead numeral at the other end of the scale. */
    var top = this.stripTop(s), i;
    for (i = 1; i <= top; i++) {
      (function (v) {
        var isMark = (s.guess === v), isTruth = (truth === v);
        var b = api.el('button', 'lid-mark' + (isMark ? ' lid-on' : '') + (isTruth ? ' lid-truth' : '') +
                       (v % 5 === 0 ? ' lid-five' : ''));
        b.type = 'button';
        b.textContent = String(v);
        b.setAttribute('data-fk', 'mark:' + v);
        /* ⚠ label-colon-value, deliberately NOT prose: "under each lid: 6"
           is correct in all eleven locales without new authoring, where a
           composed sentence would need word order per language.
           ⚠ AND THE NOUN IS "number", NOT "mark". Five native panels
           independently caught that `markAria` still said "mark {n}" —
           reintroducing, in the accessible layer, the very noun hintMark
           had just been rewritten to remove. A sighted class was told to
           choose a number while a blind child was told to choose a mark. */
        b.setAttribute('aria-label', isTruth
          ? api.t('revealAria') + ': ' + String(v)
          : api.t('markAria').replace('{n}', String(v)));
        b.setAttribute('aria-pressed', String(isMark));

        /* inert until there is a question, and inert once it is answered —
           but never inert in SILENCE, and never with the wrong reason.
           Two panels caught that speaking one string on any refusal would
           announce "the lids are up" over a table where no lid had ever
           been placed. */
        if (s.lifted) self._refuse(b, 'refuseLifted');
        else if (s.lids.length < self.MIN_LIDS) self._refuse(b, 'hintPlace');
        else {
          b.addEventListener('click', function () {
            var next = self.placeGuess(self.st, v);
            if (!next) return;
            self.st = next; self._said = null;
            self._announce(next.guess === null
              ? api.t('hintMark')
              : api.t('markStrip') + ': ' + String(v));
            self.render();
          });
        }
        strip.appendChild(b);
      }(i));
    }
    return strip;
  },

  /* ⭐ THE RECORD — one row, and it costs no height at all.
     The thesis is the relation between the lid count and the share at a
     fixed total, and one round is a single point of it. This shows the
     PREVIOUS round on this same table, so at the moment the class reads
     "12, three lids, 4 each" the line above reads "12, two lids, 6 each"
     — the comparison the routine exists to produce.
     ⚠ ONLY WHILE THE LIDS ARE UP. Last round's number on screen while a
     class is still choosing is an anchor, and anchoring is the one way
     this could make the routine worse (estimation-jar:2165-2169).
     ⚠ AND IT NEVER HOLDS THE GUESS. Printed beside the share, a guess is
     a verdict delivered by table layout — which is what V7 and V16 exist
     to prevent. The row is frozen at {n, k, x, r}: four numerals under
     four glyphs made of the tool's own material, so no new noun. */
  _buildRecord: function () {
    var api = this.api, row = api.el('div', 'lid-record');
    var r = this._prevRow;
    if (!this.premium || !this.st.lifted || !r) return row;
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', api.t('recordAria'));
    var cell = function (glyph, labelKey, value) {
      var c = api.el('div', 'lid-rc');
      var g = api.el('span', 'lid-rglyph ' + glyph);
      g.setAttribute('aria-hidden', 'true');
      var v = api.el('span', 'lid-rnum');
      v.textContent = String(value);
      c.setAttribute('aria-label', api.t(labelKey) + ': ' + String(value));
      c.appendChild(g);
      c.appendChild(v);
      row.appendChild(c);
    };
    cell('lid-gcount', 'countersAria', r.n);
    cell('lid-glid', 'lidsAria', r.k);
    cell('lid-gshare', 'revealAria', r.x);
    cell('lid-gloose', 'looseAria', r.r);
    return row;
  },

  _buildFoot: function () {
    var api = this.api, self = this, s = this.st;
    var foot = api.el('div', 'lid-foot');

    /* ⭐ a noun-labelled control does what its label says — the recorded
       number-sieve "New cards" defect was a chip that armed a mode and
       dealt nothing, and it reached the operator.
       ⚠ AND ON AN EMPTY TABLE IT IS NOT "ANOTHER" LID. Another than what?
       The label branches, and the addLid lookup survives the branch so
       V11's label-truth scan still finds it.
       ⚠ Do not name that lookup again in prose: a mutation needle keys on
       it, and a second textual occurrence makes the needle match a
       COMMENT as well as the code, which mutates nothing while still
       being counted as a mutation. */
    var add = api.el('button', 'lid-chip');
    add.type = 'button';
    add.setAttribute('data-fk', 'add');
    add.textContent = s.lids.length ? api.t('addLid') : api.t('firstLid');
    if (s.lifted) this._refuse(add, 'refuseLifted');
    else if (s.lids.length >= this.MAX_LIDS) this._refuse(add, 'refuseMax');
    else {
      add.addEventListener('click', function () {
        var p = self._farPoint(self.st);
        if (!p) return;
        self._placeFrom(p.cx, p.cy);
      });
    }
    foot.appendChild(add);

    var take = api.el('button', 'lid-chip');
    take.type = 'button';
    take.setAttribute('data-fk', 'take');
    take.textContent = api.t('takeLid');
    if (s.lifted) this._refuse(take, 'refuseLifted');
    else if (!s.lids.length) this._refuse(take, 'hintPlace');
    else {
      take.addEventListener('click', function () {
        var next = self.removeLid(self.st);
        if (!next) return;
        self.st = next; self._said = null;
        self._focusNext = 'add';
        self._announce(api.t('lidsAria') + ': ' + next.lids.length + ', ' +
                       api.t('looseAria') + ': ' + self.leftover(next));
        self.render();
      });
    }
    foot.appendChild(take);

    var lift = api.el('button', 'lid-chip lid-go');
    lift.type = 'button';
    lift.setAttribute('data-fk', 'lift');
    lift.textContent = api.t(s.lifted ? 'againBtn' : 'liftBtn');
    if (!s.lifted && s.lids.length < this.MIN_LIDS) this._refuse(lift, 'hintPlace');
    else {
      lift.addEventListener('click', function () {
        var was = self.st;
        var next = was.lifted ? self.lower(was) : self.lift(was);
        if (!next) return;
        if (!was.lifted) self._recordRound(next);
        self.st = next; self._said = null;
        if (next.lifted) {
          self._announce(api.t('revealAria') + ': ' + self.share(next) +
            (self.leftover(next) ? ' ' + api.t('hintLeftover') : ' ' + api.t('hintExact')));
        } else {
          self._announce(api.t('hintShare'));
        }
        self.render();
      });
    }
    foot.appendChild(lift);

    var other = api.el('button', 'lid-chip');
    other.type = 'button';
    other.setAttribute('data-fk', 'setup');
    other.textContent = api.t('newSetBtn');
    if (this.setupsFor().length < 2) this._refuse(other, 'gateLine');
    else other.addEventListener('click', function () { self._stepSetup(); });
    foot.appendChild(other);

    var pr = api.el('button', 'lid-chip' + (this.premium ? '' : ' lid-locked'));
    pr.type = 'button';
    pr.setAttribute('data-fk', 'print');
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      window.print();
    });
    foot.appendChild(pr);

    /* ⭐⭐ THE TOTAL — a stepper, set apart at the end of the row.
       It stays on the card in EVERY frame because it is half the
       derivation the class is doing. What it is NOT any more is a second
       row of six numerals four hundred pixels above the answer scale:
       one card carried a SETUP scale (8-12-16-20-24-30) and an ANSWER
       scale (0-12) with nothing distinguishing them, and a teacher
       reading it cold could not tell which row the class should point at.

       ⚠ AND SIX CHIPS COULD NOT EXPRESS THE MODEL. setTotal accepts every
       integer from 4 to 30 — 27 values — and the table book ships totals
       right across that range (t-003 is n=13). The chips offered six, so
       a teacher could not set 13 by hand though the book would hand it to
       them. That is estimation-jar's own logged v1 defect verbatim: "the
       reachable set was a congruence class mod 10 — a teacher could not
       set 17". Press-and-hold ramps, as it does there. */
    var group = api.el('div', 'lid-total');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', api.t('totalLabel'));
    foot.appendChild(group);
    group.appendChild(this._stepBtn(-1, '−'));
    var tv = api.el('span', 'lid-tval');
    tv.textContent = String(s.n);
    tv.setAttribute('aria-hidden', 'true');
    group.appendChild(tv);
    group.appendChild(this._stepBtn(1, '+'));

    /* ⚠ TWO NODES, NEVER A CONCATENATION — the recorded localisation
       smell, and joining them makes the one actionable thing
       unclickable. Shape from folding-sheet.js:714-723. */
    if (this._gate) {
      var g = api.el('div', 'lid-gate');
      var sp = api.el('span');
      sp.textContent = api.t('gateLine');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-lids';
      a.target = '_top';
      a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.appendChild(sp);
      g.appendChild(a);
      foot.appendChild(g);
    }
    return foot;
  },

  /* one arm of the total stepper. Its accessible name is its own
     authored phrase plus the value it would reach — never label+number
     concatenation of two unrelated strings, which broke Finnish
     case-marking on a sibling tool and three ensembles caught it. */
  _stepBtn: function (delta, glyph) {
    var api = this.api, self = this, s = this.st;
    var b = api.el('button', 'lid-chip lid-step');
    b.type = 'button';
    b.textContent = glyph;
    b.setAttribute('data-fk', 'total' + (delta < 0 ? '-' : '+'));
    var want = s.n + delta;
    b.setAttribute('aria-label', api.t('totalLabel') + ': ' + String(want));

    /* dispatch by REASON, not by "setTotal returned null" */
    if (s.lids.length) { this._refuse(b, 'refuseTotal'); return b; }
    if (want < this.MIN_TOTAL) { this._refuse(b, 'hintPlace'); return b; }
    /* ⚠ AT THE CEILING, SAY SO. A control that clamps in silence while
       the paywall copy promises bigger totals advertises a paid
       affordance with no control behind it. */
    if (want > this.maxTotal()) {
      if (want <= this.PAID_MAX_TOTAL && !this.premium) {
        b.classList.add('lid-locked');
        b.addEventListener('click', function () { self._showGate(); });
      } else { this._refuse(b, 'refuseMax'); }
      return b;
    }

    var apply = function () {
      var next = self.setTotal(self.st, self.st.n + delta);
      if (!next) return false;
      self.st = next; self._said = null;
      self._prevRow = null;
      self._announce(api.t('totalLabel') + ': ' + next.n);
      self.render();
      return true;
    };
    var timer = null, ramp = null;
    var stop = function () { clearTimeout(timer); clearInterval(ramp); timer = ramp = null; };
    b.addEventListener('click', function () { apply(); });
    b.addEventListener('pointerdown', function () {
      timer = setTimeout(function () {
        ramp = setInterval(function () { if (!apply()) stop(); }, 90);
      }, 420);
      self._timers.push(timer);
    });
    ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(function (ev) {
      b.addEventListener(ev, stop);
    });
    return b;
  },

  /* ⭐ ONE ROW REMEMBERED, and only the previous one on THIS total.
     Deduped on (n, k) so a teacher demonstrating the same table twice
     does not fake a history. The guess is never stored. */
  _recordRound: function (next) {
    var row = { n: next.n, k: next.lids.length, x: this.share(next), r: this.leftover(next) };
    var i, prev = null;
    for (i = this._rounds.length - 1; i >= 0; i--) {
      if (this._rounds[i].n === row.n && this._rounds[i].k !== row.k) { prev = this._rounds[i]; break; }
    }
    this._prevRow = prev;
    for (i = 0; i < this._rounds.length; i++) {
      if (this._rounds[i].n === row.n && this._rounds[i].k === row.k) { this._rounds.splice(i, 1); break; }
    }
    this._rounds.push(row);
    if (this._rounds.length > 12) this._rounds.shift();
  },

  /* ⚠ STEP PAST A SETUP THAT WOULD RENDER IDENTICALLY — the recorded
     number-sieve library defect and the arrow-strip Mat Book defect,
     which are the same defect twice. */
  _stepSetup: function () {
    var open = this.setupsFor();
    if (!open.length) return;
    var k, idx = 0, hit = null;
    for (k = 1; k <= open.length; k++) {
      idx = (this._setupIdx + k) % open.length;
      var c = open[idx];
      if (c.n !== this.st.n || c.k !== this.st.lids.length) { hit = c; break; }
    }
    if (!hit) return;
    var next = this.loadSetup(this.st, hit);
    if (!next) return;
    this._setupIdx = idx;
    this.st = next; this._said = null;
    this.render();
  },

  /* =================================================================
     ⭐⭐ THE PRINT SHEET — and the shipped build gave it away for free.
     The chip called _showGate() for a free visitor, but the @media print
     block was UNCONDITIONAL: nothing scoped it to a paid body class, so
     Ctrl+P handed anybody the Teacher-plan sheet. That is "gate the
     FEATURE, not the CHIP", already recorded twice on this platform and
     shipped here anyway. Two locks, the house pattern: the subtree is
     ABSENT unless entitled, and every print rule is scoped .lid-paid.

     ⚠ AND IT IS A PURE FUNCTION OF (n, k). It never reads `lifted` and
     never reads `guess` — which is what makes an answer key structurally
     impossible. The old block printed the live screen, so printing after
     a lift put `lid-on` and `lid-truth` on twenty-five copies.

     ⚠ THE SHEET IS A SIBLING OF .lid-wrap, never a descendant: print
     hides the wrap entirely and a sheet inside it would inherit that.
     ================================================================= */
  _ensureSheet: function (host) {
    if (!host) return;
    var old = host.querySelector ? host.querySelector('.lid-sheet') : null;
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (!this.premium) { document.body.classList.remove('lid-paid'); return; }
    host.appendChild(this._buildSheet());
    document.body.classList.add('lid-paid');
  },

  _buildSheet: function () {
    var api = this.api, self = this, s = this.st;
    var sheet = api.el('div', 'lid-sheet');
    sheet.setAttribute('aria-hidden', 'true');

    /* ---- page 1: the worksheet ---- */
    var p1 = api.el('div', 'lid-page');
    sheet.appendChild(p1);

    /* ⚠ THE SHEET CARRIES ITS OWN HEADING, and the shell's header is
       hidden in print like every other tool's. Un-hiding `.lcs-header`
       was tempting — eleven locales of title for nothing — but the shared
       print gate asserts the shell chrome does not reach paper, and that
       law exists because two tools shipped a chip that printed the whole
       web page. Weakening a shared gate for one tool is the wrong trade;
       reusing the authored title inside the sheet costs nothing and keeps
       the renamed title in de, fi, nl and pt. */
    var head1 = api.el('div', 'lid-phead');
    head1.textContent = api.t('title');
    p1.appendChild(head1);

    var task = api.el('div', 'lid-ptask');
    task.textContent = api.t('sheetTask');
    p1.appendChild(task);

    /* the total, as a numeral — the covered counters are absent from the
       DOM by doctrine, so without this the sheet is unanswerable */
    var tot = api.el('div', 'lid-ptotal');
    var tl = api.el('span', 'lid-plabel');
    tl.textContent = api.t('totalLabel');
    var tn = api.el('span', 'lid-pnum');
    tn.textContent = String(s.n);
    tot.appendChild(tl); tot.appendChild(tn);
    p1.appendChild(tot);

    /* every counter visible, as an OPEN RING. Solid discs are a toner
       bath across 25 copies, two that land close photocopy into one blob,
       and a ring is a thing a child can tick. */
    var table = api.el('div', 'lid-ptable');
    var pts = this.scatter(s), i;
    for (i = 0; i < pts.length; i++) {
      var c = api.el('span', 'lid-pdot');
      c.style.left = (pts[i].x / this.W * 100) + '%';
      c.style.top = (pts[i].y / this.H * 100) + '%';
      table.appendChild(c);
    }
    p1.appendChild(table);

    /* k empty rings to share into, and one loose area for the remainder.
       On paper there is no lift, so a filled lid would be a question that
       can never be answered — a ring is where the child writes. */
    var k = Math.max(this.MIN_LIDS, s.lids.length);
    var rings = api.el('div', 'lid-prings');
    for (i = 0; i < k; i++) rings.appendChild(api.el('span', 'lid-pring'));
    var loose = api.el('span', 'lid-ploose');
    rings.appendChild(loose);
    p1.appendChild(rings);

    /* two write-in boxes, icon-headed, no words */
    var boxes = api.el('div', 'lid-pboxes');
    [['lid-gshare', 'revealAria'], ['lid-gloose', 'looseAria']].forEach(function (pair) {
      var b = api.el('div', 'lid-pbox');
      var g = api.el('span', 'lid-rglyph ' + pair[0]);
      var w = api.el('span', 'lid-pwrite');
      b.appendChild(g); b.appendChild(w);
      boxes.appendChild(b);
      void self;
    });
    p1.appendChild(boxes);

    /* ---- page 2: the record, and next time's blanks ---- */
    var p2 = api.el('div', 'lid-page lid-p2');
    sheet.appendChild(p2);
    var head = api.el('div', 'lid-phead');
    head.textContent = api.t('sheetRecordHead');
    p2.appendChild(head);

    var tbl = api.el('div', 'lid-precord');
    var headRow = api.el('div', 'lid-prow lid-phrow');
    [['lid-gcount'], ['lid-glid'], ['lid-gshare'], ['lid-gloose']].forEach(function (g) {
      var cell = api.el('span', 'lid-pcell');
      cell.appendChild(api.el('span', 'lid-rglyph ' + g[0]));
      headRow.appendChild(cell);
    });
    tbl.appendChild(headRow);

    var rows = this._rounds || [], r;
    for (i = 0; i < rows.length; i++) {
      r = rows[i];
      var row = api.el('div', 'lid-prow');
      [r.n, r.k, r.x, r.r].forEach(function (v) {
        var cell = api.el('span', 'lid-pcell');
        cell.textContent = String(v);
        row.appendChild(cell);
      });
      tbl.appendChild(row);
    }
    /* next lesson opens on the same total and the class predicts the next
       row before a lid goes down — which is what turns a reveal machine
       into a pattern-finding one */
    for (i = rows.length; i < rows.length + 4; i++) {
      var blank = api.el('div', 'lid-prow');
      for (var q = 0; q < 4; q++) blank.appendChild(api.el('span', 'lid-pcell'));
      tbl.appendChild(blank);
    }
    p2.appendChild(tbl);
    return sheet;
  },

  _showGate: function () {
    var self = this;
    this._gate = true;
    this.render();
    this._after(6000, function () { self._gate = false; if (self._wrap) self.render(); });
  }
};

/* =====================================================================
   THE STYLESHEET
   ⚠ TWO TAP FLOORS, MEASURED SEPARATELY AND NEITHER MOVES: every CONTROL
   holds 44px; a COUNTER is canvas.
   ⚠ AND THE COUNTER'S FLOOR IS TWO-TIER, BECAUSE 34px AT 320 IS
   GEOMETRICALLY IMPOSSIBLE AND THE OLD HEADER CLAIMED IT ANYWAY.
   Measured: at a 320px viewport the stage padding clamps to 12px, so the
   table is 296px and a 5.6% counter is 16.6px — 51% short of 34. It
   cannot be fixed by widening the disc either: the packing's tightest
   pair is 2*C_R = 56 units = 5.6% of the table, so anything wider
   overlaps its neighbour UNDER A LID, at the one moment the counters must
   be countable. The honest floor is
       counter >= 34px  for viewport >= 650      (620px table -> 34.7px)
       counter >= 15px  always                   (the largest value that
                                                  is provably collision-
                                                  free at 280px)
   min-width was 12px, which could never fire above a ~238px viewport and
   was therefore a floor that enforced nothing.
   ⚠ No `vh` anywhere: a manipulative's iframe grows to its content, so a
   vh rule inside it is a feedback loop the shell has no path for.
   ⚠ Never an inline `background` SHORTHAND — it resets background-image
   and beats the stylesheet.
   ⭐⭐ AND CORAL IS A MATERIAL, NEVER A TYPE COLOUR. Measured contrast on
   the shipped build, every figure recomputed and confirmed:
       2.78:1  white on coral   = .lid-go, the button the routine turns on
       1.62:1  the lid's own border against the lid's body
       1.27:1  the shell's default focus ring on a lid
       4.08:1  gate text and locked labels at 14px
       1.17:1  a lid-veiled counter against an unveiled neighbour
   Every one of those disappears if coral stays a fill, a rim and a rule,
   and every coral WORD goes teal. No new brand hex.
   ===================================================================== */
function injectLidsCSS() {
  if (document.getElementById('lid-style')) return;
  var css = ''
    /* ⚠ gap 8, not 10. The card is measured against a 900px desktop
       budget and Italian is the longest locale in the set. The strip's
       own padding and dashed border came off in this rebuild, which is
       what pays for the projector type ramp below. */
    + '.lid-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;min-width:0;}'
    + '.lid-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    + '.lid-chip{min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background-color:#FBF3E4;color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;cursor:pointer;}'
    + '.lid-chip.lid-on{background-color:#146B5E;color:#FBF3E4;}'
    /* ⚠ the LABEL goes teal; only the border stays coral. #C2562F on
       cream is 4.08:1 — fine as a 3:1 UI edge, a fail as 14px text. */
    + '.lid-chip.lid-locked{border-color:#C2562F;color:#0E5147;}'
    + '.lid-chip[disabled]{opacity:.5;cursor:default;}'
    /* ⭐ a control that cannot act right now still LOOKS reachable,
       because it is: it keeps focus, keeps its label, and says why when
       pressed. Grey-and-silent is what read as breakage. */
    + '.lid-chip[aria-disabled="true"],.lid-mark[aria-disabled="true"]{opacity:.62;}'
    + '.lid-chip[aria-disabled="true"]:hover,.lid-mark[aria-disabled="true"]:hover{opacity:.78;}'
    /* ⚠ #FFF on #F2784B is 2.78:1 and this is the primary action.
       #C2562F under white is 4.50:1; the coral top light keeps it
       reading as coral without asking it to carry the text. */
    + '.lid-chip.lid-go{background-color:#C2562F;background-image:none;border-color:#A8461F;color:#FFF;'
    +   'font-weight:700;box-shadow:inset 0 2px 0 rgba(255,255,255,.26),0 2px 0 rgba(104,38,14,.28);}'
    + '.lid-chip.lid-go[aria-disabled="true"]{background-color:#FBF3E4;color:#0E5147;border-color:#146B5E;box-shadow:none;}'
    + '.lid-chip:focus-visible,.lid-mark:focus-visible,.lid-gate a:focus-visible{outline:3px solid #0E5147;outline-offset:2px;}'
    /* the total stepper: two arms round a readout, not a second row of
       numerals competing with the answer scale */
    + '.lid-total{display:inline-flex;align-items:center;gap:4px;margin-inline-start:auto;'
    +   'padding:2px;border-radius:15px;background-color:rgba(20,107,94,.07);}'
    + '.lid-step{padding:8px 12px;font-size:19px;line-height:1;}'
    + '.lid-tval{min-width:34px;text-align:center;font-family:Baloo\\ 2,cursive;font-size:19px;'
    +   'font-variant-numeric:tabular-nums;color:#0E5147;}'
    + '.lid-gate{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:14px;color:#0E5147;'
    +   'display:flex;flex-wrap:wrap;justify-content:center;gap:6px;align-items:center;}'
    + '.lid-gate a{color:#0E5147;font-weight:700;text-decoration:underline;min-height:44px;display:inline-flex;align-items:center;}'
    /* ⚠ min-height reserves TWO lines: several rungs carry a question
       and an instruction as two .lid-hline spans, and reserving one line
       made the whole card jump when they appeared. */
    + '.lid-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
    +   'color:#0E5147;min-height:40px;display:flex;flex-direction:column;justify-content:center;gap:1px;}'
    + '.lid-hline{display:block;line-height:1.25;}'
    /* a refusal takes the band for a few seconds and says so in coral —
       the projector half of "no control goes grey in silence" */
    + '.lid-hint.lid-say{color:#C2562F;font-weight:700;}'

    /* =================== THE TABLE — a tray, not a div ================
       ⚠ NO DOTS, NO GRID, NO REPEATING SHAPE. A countable mark on a
       counting canvas is a defect, not a texture. The grain is two
       crossed diagonal tooths at <=3% alpha with CO-PRIME periods (5px,
       7px), so it can never form a lattice, never aligns with the
       scatter, and reads as paper rather than as material.
       ⚠ THE VIGNETTE IS CAPPED AT .28 AND THE NUMBER IS MEASURED: a teal
       counter on the darkened rim is 4.54:1, so the vignette costs 1.24
       of contrast and still clears AA. It is also academic — scatter()
       insets every counter 7% from the edge. */
    + '.lid-table{position:relative;width:100%;max-width:620px;aspect-ratio:1000/620;'
    +   'border-radius:18px;overflow:hidden;border:3px solid rgba(20,107,94,.32);'
    +   'background-color:#FBF3E4;'
    +   'background-image:'
    +     'radial-gradient(130% 80% at 50% -14%,rgba(255,255,255,.62) 0%,rgba(255,255,255,0) 32%),'
    +     'radial-gradient(112% 128% at 50% 42%,rgba(214,193,155,0) 0%,rgba(214,193,155,0) 54%,'
    +       'rgba(214,193,155,.20) 80%,rgba(176,148,102,.28) 100%),'
    +     'repeating-linear-gradient(58deg,rgba(93,72,45,.022) 0 1px,rgba(93,72,45,0) 1px 5px),'
    +     'repeating-linear-gradient(-31deg,rgba(255,255,255,.030) 0 1px,rgba(255,255,255,0) 1px 7px);'
    +   'box-shadow:inset 0 0 0 1px rgba(255,255,255,.55),inset 0 3px 6px -2px rgba(93,72,45,.26),'
    +     'inset 0 -2px 0 rgba(255,255,255,.70),0 1px 0 rgba(255,255,255,.85),0 6px 16px -8px rgba(93,72,45,.30);}'

    /* ⭐ THE COUNTER — a two-SIDED counter is one face plus an edge.
       ⚠ NOT two-TONE. assignment() swaps counters between lids freely, so
       they are interchangeable BY CONSTRUCTION; two tones would assert a
       distinction the model does not have — and on a table that also has
       a remainder it would read as "the orange ones are the ones that
       don't fit", which is the rejected verdict colour in a second dress.
       The Wendeplättchen's second side is a property of the object, not
       of this picture: it lives in the bevel.
       ⚠ THE 1px CONTACT RING IS THE BIGGEST PROJECTOR WIN. The scatter is
       seeded, not gridded, so counters land near each other; with no edge
       two of them merge into one ambiguous blob and a countable canvas
       stops being countable. The tight close shadow is also what
       separates a 3mm disc lying ON the table from a lid hovering ABOVE
       it — the two shadows are the whole depth cue. */
    + '.lid-counter{position:absolute;width:5.6%;aspect-ratio:1;min-width:15px;min-height:15px;'
    +   'transform:translate(-50%,-50%);border-radius:50%;background-color:#146B5E;'
    +   'background-image:'
    +     'radial-gradient(46% 38% at 36% 26%,rgba(255,255,255,.34) 0%,rgba(255,255,255,0) 68%),'
    +     'radial-gradient(circle closest-side at 50% 50%,rgba(255,255,255,0) 0 74%,'
    +       'rgba(255,255,255,.22) 78% 83%,rgba(255,255,255,0) 85%),'
    +     'radial-gradient(circle closest-side at 50% 50%,rgba(6,44,38,0) 0 76%,'
    +       'rgba(6,44,38,.26) 90%,rgba(6,44,38,.58) 100%),'
    +     'linear-gradient(178deg,#1E8878 0%,#146B5E 52%,#0E5147 100%);'
    +   'box-shadow:0 0 0 1px rgba(6,44,38,.34),0 1px 2px rgba(14,58,50,.32);}'

    /* ⭐ THE LID — the most important object in the tool, and every length
       in it is PROPORTIONAL. Its width is written by the model at render
       time, so a fixed 3px rim is 6.8% of a 44px lid and 1.5% of a 250px
       one: the same object drawn as two different things. Rim, skirt,
       shoulder, specular and grip are all gradient stops in PERCENT.
       ⚠ THE FACE IS THE ::before, NOT THE ELEMENT. That is what lets the
       lift take the lid away without taking its footprint with it — the
       face rises and drains, the element keeps the ring.
       ⚠ The old `border:3px solid #C2562F` measured 1.62:1 against the
       lid's own body: at 1024 across a room the lid was a flat coin with
       no edge. The rim is now the outermost gradient stop and the
       silhouette against the table measures 6.65:1. */
    + '.lid-lid{position:absolute;padding:0;border:0;background:none;border-radius:50%;aspect-ratio:1;'
    +   'min-width:44px;min-height:44px;transform:translate(-50%,-50%);container-type:inline-size;'
    +   'cursor:grab;touch-action:none;-webkit-tap-highlight-color:transparent;'
    +   'transition:transform .16s var(--lcs-ease,ease-out),width .18s var(--lcs-ease,ease-out);}'
    + '.lid-lid::before{content:"";position:absolute;inset:0;border-radius:50%;background-color:#F2784B;'
    +   'background-image:'
    +     'radial-gradient(40% 32% at 34% 23%,rgba(255,255,255,.55) 0%,rgba(255,255,255,.14) 48%,rgba(255,255,255,0) 72%),'
    +     'radial-gradient(circle closest-side at 50% 50%,rgba(255,255,255,0) 0 27%,'
    +       'rgba(255,255,255,.38) 29% 33%,rgba(255,255,255,0) 35%),'
    +     'radial-gradient(circle closest-side at 50% 50%,rgba(104,38,14,0) 0 33%,'
    +       'rgba(104,38,14,.28) 34.5% 37%,rgba(104,38,14,0) 39%),'
    +     'radial-gradient(circle closest-side at 50% 50%,rgba(255,255,255,0) 0 69%,'
    +       'rgba(255,255,255,.32) 71% 74%,rgba(255,255,255,0) 76%),'
    +     'radial-gradient(circle closest-side at 50% 50%,rgba(104,38,14,0) 0 72%,'
    +       'rgba(104,38,14,.14) 82%,rgba(104,38,14,.42) 94%,rgba(104,38,14,.72) 100%),'
    +     'linear-gradient(177deg,#FF9A70 0%,#F2784B 46%,#DE6A3C 100%);'
    /* ⚠ THE CAST SHADOW IS THE ONE HONEST px. A real lid is about the
       same height off the table whatever its diameter, so the floor is px
       and the growth is cqw. */
    +   'box-shadow:0 max(3px,1.6cqw) max(7px,3.4cqw) rgba(58,32,14,.26),0 max(1px,.5cqw) 0 rgba(58,32,14,.16);'
    +   'transition:box-shadow .16s var(--lcs-ease,ease-out);}'
    /* the footprint ring: invisible while the lid is down, and the whole
       of what is left once it is up */
    + '.lid-lid::after{content:"";position:absolute;inset:0;border-radius:50%;'
    +   'border:max(2.5px,1.4cqw) solid #C2562F;background-color:rgba(242,120,75,.06);'
    +   'opacity:0;pointer-events:none;}'
    + '.lid-lid:hover{transform:translate(-50%,-50%) scale(1.025);}'
    + '.lid-lid:hover::before{box-shadow:0 max(5px,2.4cqw) max(11px,5cqw) rgba(58,32,14,.28),0 max(1px,.5cqw) 0 rgba(58,32,14,.16);}'
    /* being carried: higher off the table, so the shadow is BIGGER,
       SOFTER and FURTHER AWAY — the only cue in the physical world that
       says "this is in the air" */
    + '.lid-lid:active{cursor:grabbing;z-index:3;transform:translate(-50%,-50%) scale(1.06);}'
    + '.lid-lid:active::before{box-shadow:0 max(12px,5.4cqw) max(22px,10cqw) rgba(58,32,14,.30),0 max(3px,1.2cqw) max(6px,2.4cqw) rgba(58,32,14,.16);}'
    /* ⚠ THE FOCUS RING IS OURS, NOT THE SHELL'S. #1E8FD4 measures 1.27:1
       against coral — invisible on the one object a keyboard teacher
       actually drives. #0E5147 offset onto the cream is 8.33:1. */
    + '.lid-lid:focus-visible,.lid-ghost:focus-visible{outline:3px solid #0E5147;outline-offset:3px;}'

    /* ⭐⭐ THE LIFT — 380ms, one beat, and nothing celebrates.
       ⚠ `opacity:.32` had to go, and the number says why: coral at 32%
       over a teal counter blends to #5B6F58, which is 1.17:1 against the
       counters OUTSIDE the lid. The one thing the lift exists to show —
       which counters were under which lid — was exactly what the old
       treatment destroyed. An empty rim shows every counter at its full
       5.78:1 and keeps the enclosure at 4.08:1.
       No stagger: a stagger counts them for the class. No overshoot: an
       overshoot reads as "correct", and nothing here is correct or not. */
    + '@keyframes lid-rise{0%{transform:translate(0,0) scale(1);opacity:1;}38%{opacity:1;}'
    +   '100%{transform:translate(0,-16%) scale(1.07);opacity:0;}}'
    + '@keyframes lid-ring{from{opacity:0;}to{opacity:1;}}'
    /* ⚠ THE COUNTER REACHES FULL OPACITY IN THE FIRST THIRD, and the
       reason is a render I read rather than a gate. A screenshot caught
       the lift mid-flight and the counters were a muddy grey-green: they
       were fading IN at the same moment the lid face was fading OUT, so
       for about two hundred milliseconds the class saw one translucent
       thing through another — the exact 1.17:1 blend the paint-order fix
       exists to prevent, only in motion. The counters are painted ON TOP
       of the lid, so as soon as they are opaque they hide it; the scale
       carries the rest of the movement. */
    + '@keyframes lid-settle{from{opacity:0;transform:translate(-50%,-50%) scale(.86);}'
    +   '34%{opacity:1;}to{opacity:1;transform:translate(-50%,-50%) scale(1);}}'
    + '@keyframes lid-fade{from{opacity:0;}to{opacity:1;}}'
    + '.lid-lid.lid-up{cursor:default;transform:translate(-50%,-50%);}'
    + '.lid-lid.lid-up::before{animation:lid-rise 380ms cubic-bezier(.22,.61,.20,1) both;pointer-events:none;}'
    + '.lid-lid.lid-up::after{animation:lid-ring 260ms linear 120ms both;}'
    + '.lid-counter.lid-fresh{animation:lid-settle 220ms cubic-bezier(.22,.72,.24,1) 160ms both;}'

    /* ⭐ THE GHOST — a place, not a lid already down. Dashed, unfilled,
       no grip ring, and always MIN_R: a ghost sized from the share would
       pre-announce the re-settle. */
    + '.lid-ghost{position:absolute;padding:0;border-radius:50%;aspect-ratio:1;'
    +   'min-width:44px;min-height:44px;transform:translate(-50%,-50%);'
    +   'border:3px dashed rgba(194,86,47,.72);background-color:rgba(242,120,75,.05);'
    +   'cursor:grab;touch-action:none;animation:lid-fade 400ms linear both;}'
    + '.lid-ghost:hover{background-color:rgba(242,120,75,.13);border-color:#C2562F;}'
    + '.lid-ghost.lid-carry{border-style:solid;background-color:rgba(242,120,75,.35);cursor:grabbing;z-index:3;}'

    /* ⭐ THE STRIP IS A NUMBER LINE, NOT A ROW OF BUTTONS. Equal stations
       sharing hairline rules inside one recessed rail; equal spacing IS
       the message, and it survives wrapping where a drawn axis does not.
       ⚠ AND IT GIVES BACK HEIGHT: the 8px padding and the 2px dashed
       border are both gone, which is what pays for the type ramp. */
    /* ⚠ GRID, NOT flex-wrap. With `flex:1 1 auto` a wrapped row STRETCHES
       to fill the rail, so a strip of 20 numerals drew fifteen normal
       cells on row one and five cells three times as wide on row two —
       which reads as broken, not as a scale. A grid keeps every station
       the same width whichever row it lands on, which is the whole point
       of drawing this as a ruler rather than a row of loose buttons.
       ⚠ auto-FIT, and the distinction is worth stating because I had it
       backwards first. auto-fit collapses only the tracks that are empty
       in EVERY row — so a strip of ten numerals fills the rail evenly
       instead of trailing off into blank cells, while a strip of twenty
       still keeps uniform columns, because every column is occupied by
       the first row. auto-fill leaves the trailing tracks in place and
       the rail ends in a stretch of empty ruler. */
    + '.lid-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(44px,1fr));'
    +   'justify-items:stretch;align-items:stretch;gap:0;padding:0;'
    +   'width:100%;max-width:620px;overflow:hidden;border-radius:14px;border:2px solid rgba(20,107,94,.34);'
    +   'background-color:#FBF3E4;box-shadow:inset 0 2px 4px -2px rgba(93,72,45,.22),inset 0 -1px 0 rgba(255,255,255,.85);}'
    /* ⚠ border-right, NOT box-shadow, for the rules: box-shadow is spoken
       for by the marker and the truth, and two systems on one property is
       how one treatment silently wins over another. */
    + '.lid-mark{min-height:44px;min-width:44px;padding:0 6px;border:0;'
    +   'border-right:1px solid rgba(20,107,94,.26);border-radius:0;background-color:#FBF3E4;color:#0E5147;'
    +   'font-family:Baloo\\ 2,cursive;font-size:16px;font-weight:600;font-variant-numeric:tabular-nums;cursor:pointer;}'
    + '.lid-mark:last-child{border-right:0;}'
    /* the landmarks. A fixed property of the SCALE, present before any
       lid goes down, so it can never be read as a hint about this table. */
    + '.lid-mark.lid-five{border-right:2px solid rgba(20,107,94,.52);font-weight:700;}'
    + '.lid-mark:hover:not([aria-disabled="true"]){background-color:#F1E7D2;}'
    /* THE CLASS'S MARKER: filled. */
    + '.lid-mark.lid-on{background-color:#146B5E;color:#FBF3E4;font-weight:700;}'
    /* ⭐ WHAT WAS UNDER EACH LID: ringed, not filled — and ringed in the
       SAME teal. The two treatments differ in KIND, never in hue: a
       coral-vs-teal pair was designed and rejected because orange reads
       as "wrong" and green as "right" to a six-year-old, which would be a
       verdict delivered by palette — and backwards at that, since the
       marker is the teal one. A gapless rail is also where an INSET ring
       belongs, since it can no longer collide with a neighbour. */
    + '.lid-mark.lid-truth{box-shadow:0 0 0 3px #FBF3E4 inset, 0 0 0 7px #146B5E inset;font-weight:800;}'
    + '.lid-mark.lid-on.lid-truth{box-shadow:0 0 0 3px #146B5E inset, 0 0 0 7px #FBF3E4 inset;}'
    + '.lid-mark[disabled]{cursor:default;opacity:.85;}'
    + '.lid-mark[disabled].lid-on,.lid-mark[disabled].lid-truth{opacity:1;}'
    + '.lid-mark[aria-disabled="true"].lid-on,.lid-mark[aria-disabled="true"].lid-truth{opacity:1;}'

    /* ⭐ THE RECORD — one row, in the slot the old totals bar vacated, so
       it costs nothing and there is no layout jump at the lift. Four
       numerals under four glyphs made of the tool's own material: a teal
       disc, a coral ring, a ring with a disc in it, a bare disc. No new
       noun anywhere. */
    + '.lid-record{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:14px;'
    +   'width:100%;min-height:0;}'
    + '.lid-record:empty{display:none;}'
    + '.lid-rc{display:inline-flex;align-items:center;gap:6px;font-family:Baloo\\ 2,cursive;'
    +   'font-size:16px;font-variant-numeric:tabular-nums;color:#0E5147;}'
    + '.lid-rglyph{display:inline-block;width:16px;height:16px;border-radius:50%;flex:0 0 auto;}'
    + '.lid-gcount{background-color:#146B5E;}'
    + '.lid-glid{border:3px solid #C2562F;}'
    + '.lid-gshare{border:3px solid #C2562F;background-color:#146B5E;background-clip:content-box;}'
    + '.lid-gloose{background-color:#146B5E;opacity:.45;}'

    + '@media (min-width:760px){.lid-table{max-width:680px;}.lid-strip{max-width:680px;}}'
    /* ⚠ THE TYPE RAMP STARTS AT 1000px, NOT 1367. 1024x768 is the
       commonest classroom projector in the world and used to get nothing:
       a 16px numeral across a six-metre room is under the readable floor
       for the back row. Type only — every box floor is untouched. */
    + '@media (min-width:1000px){'
    +   '.lid-mark{font-size:20px;}.lid-chip{font-size:16px;}'
    +   '.lid-hint{font-size:17px;min-height:44px;}.lid-gate{font-size:15px;}'
    +   '.lid-tval{font-size:22px;}.lid-rc{font-size:18px;}'
    + '}'
    /* =====================================================================
       WIDE VIEWPORTS — the per-tool tiers. Each step is derived at its own
       height floor and the later rules are larger, so the cascade picks the
       tallest that applies. `.lid-mark` and `.lid-chip` KEEP their 44px
       floors; the ramp only ever raises them. `.lid-strip` tracks the table,
       or the marks would sit under a table twice their row's width.
       ⚠ The rail owns the radius now, so the marks must NOT regain one.
       ===================================================================== */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.lid-wide .lid-chip{font-size:17px;}'
    +   'body.lid-wide .lid-mark{font-size:18px;min-width:54px;min-height:54px;}'
    +   'body.lid-wide .lid-hint{font-size:17px;}'
    +   'body.lid-wide .lid-gate{font-size:16px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1000px){'
    +   'body.lid-wide .lid-table,body.lid-wide .lid-strip{max-width:840px;}'
    +   'body.lid-wide .lid-strip{border-radius:16px;}'
    +   'body.lid-wide .lid-chip{font-size:18px;}'
    +   'body.lid-wide .lid-mark{font-size:20px;min-width:62px;min-height:62px;}'
    +   'body.lid-wide .lid-hint{font-size:18px;}'
    +   'body.lid-wide .lid-gate{font-size:17px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.lid-wide .lid-table,body.lid-wide .lid-strip{max-width:1000px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.lid-wide .lid-table,body.lid-wide .lid-strip{max-width:1080px;}'
    +   'body.lid-wide .lid-chip{font-size:19px;}'
    +   'body.lid-wide .lid-mark{font-size:22px;min-width:70px;min-height:70px;}'
    +   'body.lid-wide .lid-hint{font-size:19px;}'
    +   'body.lid-wide .lid-gate{font-size:18px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1400px){'
    +   'body.lid-wide .lid-table,body.lid-wide .lid-strip{max-width:1480px;}'
    +   'body.lid-wide .lid-mark{font-size:24px;}'
    + '}'

    /* the sheet is display:none on screen and only ever appears in print */
    + '.lid-sheet{display:none;}'

    /* =====================================================================
       ⭐⭐ THE PRINT SHEET.
       ⚠ TWO LOCKS, NOT ONE. The chip called _showGate() for a free visitor
       while the @media print block was UNCONDITIONAL, so Ctrl+P handed
       anybody the Teacher-plan sheet. The subtree is now ABSENT unless
       entitled AND every rule below is scoped `body.lid-paid`.
       ⚠ AND IT IS LINE ART, NOT A GREYSCALE SCREENSHOT. Every counter used
       to be a background-color, and Chrome ships "Background graphics" OFF
       for a great many teachers — so the old sheet could come out of the
       photocopier as an EMPTY TRAY. Borders print unconditionally;
       backgrounds do not. Nothing on paper is coloured now, so
       print-color-adjust has nothing left to force and is deleted.
       ⚠ THE HEADING IS THE SHELL'S OWN TITLE, UN-HIDDEN: eleven locales,
       zero new strings — and it is the RENAMED title in de/fi/nl/pt, where
       the panels rejected the obvious word.
       ===================================================================== */
    + '@media print{'
    +   '@page{size:A4 portrait;margin:14mm;}'
    +   'body.lid-paid html,body.lid-paid body,body.lid-paid .lcs-app,body.lid-paid .lcs-stage{'
    +     'background:#FFF !important;box-shadow:none !important;height:auto !important;'
    +     'max-height:none !important;max-width:none !important;overflow:visible !important;padding:0 !important;}'
    +   'body.lid-paid .lcs-header,body.lid-paid .lcs-controls,body.lid-paid .lcs-instruction{display:none !important;}'
    +   'body.lid-paid .lid-wrap{display:none !important;}'
    +   'body.lid-paid .lid-sheet{display:block !important;}'
    +   'body.lid-paid .lid-page{break-after:page;page-break-after:always;break-inside:avoid;'
    +     'page-break-inside:avoid;color:#000;font-family:Nunito,sans-serif;}'
    +   'body.lid-paid .lid-page:last-child{break-after:auto;page-break-after:auto;}'
        /* the name rule — a rule, not a label: the no-words law does not
           stop at the glass */
    +   'body.lid-paid .lid-page::before{content:"";display:block;width:82mm;height:0;'
    +     'border-bottom:.7pt solid #444;margin:0 0 7mm;}'
    +   'body.lid-paid .lid-ptask{font-size:12pt;line-height:1.35;margin:0 0 5mm;}'
    +   'body.lid-paid .lid-ptotal{display:flex;align-items:baseline;gap:4mm;margin:0 0 4mm;}'
    +   'body.lid-paid .lid-plabel{font-size:11pt;}'
    +   'body.lid-paid .lid-pnum{font-family:Baloo\\ 2,serif;font-size:22pt;font-weight:700;}'
    +   'body.lid-paid .lid-ptable{position:relative;width:100%;aspect-ratio:1000/620;'
    +     'border:1pt solid #333;border-radius:3mm;margin:0 0 6mm;}'
        /* ⚠ OPEN RINGS, NOT DISCS. Solid discs are toner x25, and two that
           land close photocopy into one blob — the one thing a counting
           sheet may never do. A ring can also be ticked. */
    +   'body.lid-paid .lid-pdot{position:absolute;width:5.6%;aspect-ratio:1;'
    +     'transform:translate(-50%,-50%);border-radius:50%;border:.9pt solid #222;}'
    +   'body.lid-paid .lid-prings{display:flex;flex-wrap:wrap;gap:6mm;align-items:center;margin:0 0 6mm;}'
    +   'body.lid-paid .lid-pring{width:34mm;height:34mm;border-radius:50%;border:1.2pt dashed #555;}'
    +   'body.lid-paid .lid-ploose{flex:1 1 40mm;min-width:40mm;height:34mm;border:.8pt dashed #999;border-radius:3mm;}'
    +   'body.lid-paid .lid-pboxes{display:flex;gap:10mm;}'
    +   'body.lid-paid .lid-pbox{display:flex;align-items:center;gap:3mm;}'
    +   'body.lid-paid .lid-pwrite{display:block;width:14mm;height:14mm;border:.8pt solid #666;}'
    +   'body.lid-paid .lid-phead{font-family:Baloo\\ 2,serif;font-size:17pt;font-weight:700;margin:0 0 4mm;color:#000;}'
    +   'body.lid-paid .lid-precord{display:table;width:100%;border-collapse:collapse;}'
    +   'body.lid-paid .lid-prow{display:table-row;}'
    +   'body.lid-paid .lid-pcell{display:table-cell;width:25%;height:12mm;border:.7pt solid #666;'
    +     'text-align:center;vertical-align:middle;font-family:Baloo\\ 2,serif;font-size:14pt;}'
    +   'body.lid-paid .lid-phrow .lid-pcell{height:9mm;}'
        /* the glyph legend prints as line art too */
    +   'body.lid-paid .lid-rglyph{display:inline-block;width:5mm;height:5mm;border-radius:50%;'
    +     'border:.9pt solid #222;background:none !important;opacity:1 !important;}'
    +   'body.lid-paid .lid-gcount{background:#000 !important;}'
    +   'body.lid-paid .lid-gshare{box-shadow:inset 0 0 0 1mm #FFF, inset 0 0 0 2mm #000;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){'
    /* ⚠ WCAG 2.3.3 is about vestibular MOTION, not about opacity, and a
       hard cut on thirty objects at once is harder to follow than a fade.
       So travel and scale go to zero and one 120ms cross-fade stays. */
    +   '.lid-lid,.lid-lid::before{transition:none !important;}'
    +   '.lid-lid:hover,.lid-lid:active{transform:translate(-50%,-50%);}'
    +   '.lid-lid.lid-up::before{animation:none;opacity:0;}'
    +   '.lid-lid.lid-up::after{animation:none;opacity:1;}'
    +   '.lid-counter.lid-fresh{animation:lid-fade 120ms linear both;}'
    +   '.lid-ghost{animation:none;}'
    + '}';
  var st = document.createElement('style');
  st.id = 'lid-style';
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(Lids);
