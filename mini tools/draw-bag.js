/* =====================================================================
   TOOL #38 — THE DRAW BAG   (draw-bag.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #3. Catalog slot C1.

   THE BAG · THE RECORD · THE GUESS. Three named parts, and nothing else
   in this tool gets a noun.
   ⚠ THE ON-SCREEN NOUN IS "THE RECORD", NEVER "THE STRIP". `pattern-bench`
   owns "strip" as its house noun and `arrow-strip` already refused it for
   exactly this reason. The KEY stays `draw-bag`.

   THE ROUTINE, which is what makes this an instrument and not a game:
     "Say what you think is in the bag. Then draw."
      ... and then the move that matters:
     "Now run the SAME bag again."

   THE ONE THESIS — THE SAME CAUSE PRODUCES TWO DIFFERENT PICTURES. One
   bag, unchanged, drawn from twice, gives two records that do not match,
   and that is nobody's mistake. Everything in this file exists to make
   that sentence unavoidable and un-arguable.

   THREE INVENTIONS:
     1. THE SAME BAG RUNS TWICE, PROVABLY. You cannot rewind a draw on a
        carpet, and a slide deck's second run is authored — the class
        knows it and stops believing. Here run two is the same multiset
        by construction (`secondRun` copies nothing but the seed index),
        and the gate asserts the bag is deep-equal across both runs.
     2. THE DRAWS ARE PERMANENT. Nothing is ever erased, so "there are no
        blue ones in there" dies to a blue piece appearing on the record
        rather than to an adult saying so. The record is append-only and
        the gate proves it by prefix.
     3. THE COMMITTED PRIOR. The guess is placed BEFORE draw one and is
        immovable afterwards — `placeGuess` returns null once a draw has
        happened — so it is still there, unedited, when the bag opens.
        Only paper does this today.

   ⚠ THE FENCE — FOUR SURFACES. Chance itself came back VIRGIN on all
   four (0 of 41 instruments, 0 of ~204 activity rows and no 7.SP.* code
   anywhere in the corpus, 0 of 240 printable types, 0 of 33 REFERENCE
   APPS). What is NOT virgin is the apparatus vocabulary around it, and
   the four neighbours below are SUBTRACTED, not negotiated:
   `name-sticks.js` (#26) is the closest neighbour on the platform — its
   own header says "sampling WITHOUT replacement the whole class can
   see", it owns the visible cup, and it already ships `tipBack` = "Tip
   them back in" in eleven locales. So this tool is WITH replacement, has
   no cup, never touches `lcs:my-classes:v1`, and its reveal is "open the
   bag". Its no-drumroll doctrine (name-sticks.js:22-29, "No
   drumroll/suspense — a short rattle and a calm present") is INHERITED
   BY CITATION and is not claimed here as an invention.
   `estimation-jar.js` (#23) + `wondering-jar-activity.js` own the
   jar-reveal ritual, the NO ACCURACY GRADIENT rule (`compare()` returns
   a sign, never a distance and never a "closest") and the THROWING
   ACCESSOR that makes a count structurally unreachable before the
   reveal — `composition()` below is that idiom, reused by citation. The
   prior here is a COMPOSITION claim, never the 0-20 numeric estimate
   that `wondering-jar` owns.
   `class-graph.js` (#34), `calendar-wall.js` (#7) and `graph-it`
   (2.MD.D.10) own record-becomes-bar outright, which is why refusal 2
   exists.
   `arrow-strip.js` (#37) owns two-run comparison AS A GHOST OVERLAY
   (its invention 2). Here record two lies UNDER record one and is never
   ghosted — and where arrow-strip re-runs after CHANGING one card, this
   re-runs the IDENTICAL cause. The two theses are mirror images and must
   stay visibly so.

   REFUSES, FOREVER — each one gated:
     1. NO FREQUENCY NUMERAL, EVER. No count of anything on the stage, no
        percentage, no fraction, no "N out of M". The record is pictures.
        (D12)
     2. NO STACKING BY KIND. The record is chronological and stays
        chronological. The instant cells sort into per-kind columns this
        is class-graph, and the frequency numeral walks in behind it.
     3. NO LIKELIHOOD WORD in any of eleven languages — likely, unlikely,
        probable, certain, impossible, fair, odds, "chance" as a verdict.
        The two shelves are shapes, not labels. (D14)
     4. NO VERDICT ON THE GUESS. It is never marked, coloured, scored,
        counted, ranked or compared BY THE TOOL. When the bag opens, the
        guess and the contents simply sit next to each other and the
        class does the rest.
     5. NO WITHOUT-REPLACEMENT MODE AND NO USED-CUP. name-sticks owns
        that whole apparatus. Every piece goes back; the multiset is
        conserved and the gate proves it after every single draw. (D6)
     6. NO "TIP BACK IN" in any locale — name-sticks owns `tipBack`
        across all eleven. The reveal is "open the bag".
     7. NO DRUMROLL, NO SUSPENSE, NO SOUND AT ALL. A piece appears on the
        record and that is the whole event.
     8. NO GHOST OVERLAY for run two — arrow-strip owns run-over-ghost.
        Record two sits UNDER record one, cell-aligned.
     9. NO UNSEEDED RANDOMNESS. `Math.random` and `crypto` are absent
        from this file. Every draw is a pure function of (bag, seed,
        index), so Oslo and Lisbon see the identical run and the live
        verifier can assert the exact sequence on production.
    10. No score, no timer, no streak, no tick, no cross, no "correct".

   ⚠ THIS IS THE FIRST v4 INSTRUMENT WITH LEGITIMATE RANDOMNESS. Both
   shipped v4 tools BAN `Math.random` outright; here the gate instead
   bans UNSEEDED randomness, which is a different assertion and had to be
   written as one. And the determinism proved here is the deliberate
   mirror of `C5 The Ramp`'s invariant — asserting both is what will make
   that pair honest.

   ⚠ NO SPEECH. LCSAudio never calls getVoices() and silently substitutes
   a missing voice; TTS is reliable in only 5 of 11 locales. This tool is
   legible with the sound off, like every v4 instrument. It is also
   legible for a child who cannot read at all: the stage carries the
   material and nothing else.
   ===================================================================== */

var DrawBag = {
  id: 'draw-bag',

  /* ---------------------------------------------------------------
     STRINGS. EN is authored. The other ten are DRAFTS and will be
     REBUILT — never translated — by their own three-person native panel
     per §A.13.48, via scripts/apply-draw-bag-locales.js, which rewrites
     this whole block. Do not hand-edit a locale here.
     ⚠ Two named traps for the panels on THIS tool: nothing may calque
     name-sticks' "tip them back in" (refusal 6), and no likelihood word
     may appear in any locale — gate D14 checks each locale's OWN
     vocabulary, never English.
     --------------------------------------------------------------- */
  strings: {
    title:          { en: "The Draw Bag", de: "Der Zufallsbeutel", fr: "Le sac du hasard", es: "La bolsa del azar", pt: "Sacola do acaso", it: "Il sacchetto delle estrazioni", nl: "De toevalszak", sv: "Slumppåsen", da: "Trækposen", no: "Trekkposen", fi: "Sattumapussi" },
    instruction:    { en: "Nobody may look inside. Say what you think is in there, then draw one at a time — every draw stays on the record, and every piece goes back in the bag.", de: "Niemand darf hineinschauen. Sagt zuerst, was ihr im Beutel vermutet, und zieht dann Teil für Teil. Jeder Zug bleibt in der Reihe, das Teil wandert zurück in den Beutel.", fr: "Personne n’a le droit de regarder dedans. Dites d’abord ce que vous pensez qu’il y a dans le sac, puis tirez une pièce à la fois : chaque tirage reste inscrit sur le relevé, et la pièce, elle, retourne aussitôt dans le sac.", es: "Nadie puede mirar adentro. Digan primero qué creen que hay; luego saquen una pieza a la vez: cada pieza sacada se registra y enseguida regresa a la bolsa.", pt: "Ninguém pode olhar dentro. Digam primeiro o que vocês acham que tem aí, depois tirem uma de cada vez — cada sorteio fica no registro e a peça volta para dentro da sacola.", it: "Nessuno può guardare dentro. Dite prima che cosa pensate ci sia, poi estraete un pezzo alla volta: ogni estrazione resta sulla fila e ogni pezzo torna subito nel sacchetto.", nl: "Niemand mag in de zak kijken. Zeg eerst wat er volgens jullie in zit. Trek daarna één voor één: elke trekking komt in de rij te staan, en het stuk zelf gaat meteen weer terug in de zak.", sv: "Ingen får titta i påsen. Säg först vad ni tror finns i den. Dra sedan en i taget: varje drag syns kvar på raden, men själva biten läggs alltid tillbaka i påsen.", da: "Ingen må kigge i posen. Gæt først, hvad der er i den, og træk så en brik ad gangen: hvert træk bliver i rækken, og brikken går tilbage i posen.", no: "Ingen får se oppi posen. Si først hva dere tror ligger der, og trekk så én om gangen. Hvert trekk blir stående på raden, og brikken går tilbake i posen.", fi: "Kukaan ei saa katsoa pussiin. Sanokaa ensin, mitä arvelette pussissa olevan, ja nostakaa sitten yksi pala kerrallaan: jokainen nosto jää riviin, ja pala menee heti takaisin pussiin." },
    hintFill:       { en: "Put some pieces in the bag.", de: "Legt ein paar Teile in den Beutel.", fr: "Mettez quelques pièces dans le sac.", es: "Pongan algunas piezas en la bolsa.", pt: "Coloquem algumas peças na sacola.", it: "Mettete qualche pezzo nel sacchetto.", nl: "Doe een paar stukken in de zak.", sv: "Lägg några bitar i påsen.", da: "Læg nogle brikker i posen.", no: "Legg noen brikker i posen.", fi: "Laittakaa pussiin muutama pala." },
    hintGuess:      { en: "Say what you think is in there. Tap a piece to move it.", de: "Sagt, was ihr im Beutel vermutet. Tippt ein Teil an, um es zu verschieben.", fr: "Dites ce que vous pensez qu’il y a dans le sac. Touchez une pièce pour la déplacer.", es: "Digan qué creen que hay adentro. Toquen una pieza para moverla.", pt: "Digam o que vocês acham que tem na sacola. Toquem em uma peça para movê-la.", it: "Dite che cosa pensate ci sia. Toccate un pezzo per spostarlo.", nl: "Zeg wat er volgens jullie in de zak zit. Tik op een stuk om het te verplaatsen.", sv: "Säg vad ni tror finns i påsen. Tryck på en bit för att flytta den.", da: "Sig jeres bud på, hvad der er i posen. Tryk på en brik for at flytte den.", no: "Si hva dere tror ligger i posen. Trykk på en brikke for å flytte den.", fi: "Sanokaa, mitä arvelette pussissa olevan. Napauttakaa palaa, niin se siirtyy." },
    hintDraw:       { en: "Tap the bag.", de: "Tippt auf den Beutel.", fr: "Touchez le sac.", es: "Toquen la bolsa.", pt: "Toquem na sacola.", it: "Toccate il sacchetto.", nl: "Tik op de zak.", sv: "Tryck på påsen.", da: "Tryk på posen.", no: "Trykk på posen.", fi: "Napauttakaa pussia." },
    hintAgain:      { en: "Now run the same bag again.", de: "Zieht noch einmal aus demselben Beutel.", fr: "Recommencez avec le même sac.", es: "Ahora hagan otra ronda con la misma bolsa.", pt: "Agora repitam com a mesma sacola.", it: "Ora estraete di nuovo dallo stesso sacchetto.", nl: "Trek nu nog een keer uit dezelfde zak.", sv: "Dra ur samma påse en gång till.", da: "Træk fra den samme pose en gang til.", no: "Trekk fra den samme posen en gang til.", fi: "Nostakaa nyt samasta pussista uudelleen." },
    hintOpen:       { en: "Open the bag.", de: "Öffnet den Beutel.", fr: "Ouvrez le sac.", es: "Abran la bolsa.", pt: "Abram a sacola.", it: "Aprite il sacchetto.", nl: "Maak de zak open.", sv: "Öppna påsen.", da: "Åbn posen.", no: "Åpne posen.", fi: "Avatkaa pussi." },
    fillBtn:        { en: "Fill the bag", de: "Beutel füllen", fr: "Remplir le sac", es: "Llenar la bolsa", pt: "Encher a sacola", it: "Riempi il sacchetto", nl: "Zak vullen", sv: "Fyll påsen", da: "Fyld posen", no: "Fyll posen", fi: "Täytä pussi" },
    sealBtn:        { en: "Close the bag", de: "Beutel schließen", fr: "Fermer le sac", es: "Cerrar la bolsa", pt: "Fechar a sacola", it: "Chiudi il sacchetto", nl: "Zak sluiten", sv: "Stäng påsen", da: "Luk posen", no: "Lukk posen", fi: "Sulje pussi" },
    againBtn:       { en: "Run it again", de: "Noch einmal ziehen", fr: "Recommencer", es: "Otra ronda", pt: "Sortear de novo", it: "Estrai di nuovo", nl: "Nog een keer", sv: "En gång till", da: "Samme pose igen", no: "En gang til", fi: "Sama pussi uudelleen" },
    openBtn:        { en: "Open the bag", de: "Beutel öffnen", fr: "Ouvrir le sac", es: "Abrir la bolsa", pt: "Abrir a sacola", it: "Apri il sacchetto", nl: "Zak openmaken", sv: "Öppna påsen", da: "Åbn posen", no: "Åpne posen", fi: "Avaa pussi" },
    anotherBtn:     { en: "Another bag", de: "Neuer Beutel", fr: "Un autre sac", es: "Otra bolsa", pt: "Outra sacola", it: "Un altro sacchetto", nl: "Andere zak", sv: "En annan påse", da: "En anden pose", no: "En annen pose", fi: "Vaihda pussi" },
    printBtn:       { en: "Print the record", de: "Reihe drucken", fr: "Imprimer le relevé", es: "Imprimir registro", pt: "Imprimir o registro", it: "Stampa la fila", nl: "Rij afdrukken", sv: "Skriv ut raden", da: "Print rækken", no: "Skriv ut raden", fi: "Tulosta rivi" },
    gateLine:       { en: "A second run, the long record, the picture pieces, many more bags and printing are part of the Teacher plan.", de: "Ein zweiter Durchgang, die lange Reihe, die Bildteile, viel mehr Beutel und das Drucken gehören zum Lehrer-Paket.", fr: "Une deuxième série de tirages avec le même sac, le relevé long, les pièces en images, beaucoup plus de sacs et l’impression font partie de l’offre Enseignant.", es: "La segunda ronda, el registro largo, las piezas con dibujos, muchas más bolsas y la impresión vienen con el plan Docente.", pt: "Uma segunda rodada, o registro longo, as peças com figuras, muitas outras sacolas e a impressão fazem parte do plano Professor.", it: "Un secondo giro dello stesso sacchetto, la fila lunga, i pezzi illustrati, molti più sacchetti e la stampa fanno parte del piano Insegnante.", nl: "Een tweede ronde, de lange rij, stukken met plaatjes, veel meer zakken en afdrukken horen bij het Leerkracht-pakket.", sv: "En andra omgång, den långa raden, bildbitarna, många fler påsar och utskrift ingår i Lärarpaketet.", da: "Endnu en omgang med den samme pose, den lange række, billedbrikkerne, mange flere poser og print hører med til Lærerabonnementet.", no: "En runde til, den lange raden, bildebrikkene, mange flere poser og utskrift hører til Lærerabonnementet.", fi: "Opettaja-tilaus sisältää toisen kierroksen, pitkän rivin, kuvapalat, paljon lisää pusseja ja tulostuksen." },
    unlock:         { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" },
    lenLabel:       { en: "How many draws", de: "Wie oft ziehen", fr: "Combien de tirages", es: "Cuántas veces sacamos", pt: "Quantos sorteios", it: "Quante estrazioni", nl: "Aantal trekkingen", sv: "Hur många drag", da: "Hvor mange træk", no: "Hvor mange trekk", fi: "Montako nostoa" },
    skinLabel:      { en: "What is in the bag", de: "Was im Beutel liegt", fr: "Ce qu’il y a dans le sac", es: "Qué hay en la bolsa", pt: "O que tem na sacola", it: "Che cosa c’è nel sacchetto", nl: "Wat er in de zak zit", sv: "Vad som ligger i påsen", da: "Hvad der ligger i posen", no: "Hva som ligger i posen", fi: "Mitä pussissa on" },
    skinShapes:     { en: "Shapes", de: "Formen", fr: "Formes", es: "Figuras", pt: "Formas", it: "Forme", nl: "Vormen", sv: "Former", da: "Former", no: "Former", fi: "Muodot" },
    drawAria:       { en: "the bag — draw one", de: "der Beutel — ein Teil ziehen", fr: "le sac — tirer une pièce", es: "la bolsa — sacar una pieza", pt: "a sacola — tirar uma peça", it: "il sacchetto — estrai un pezzo", nl: "de zak — trek er één uit", sv: "påsen — dra en bit", da: "posen — træk en brik", no: "posen — trekk en brikke", fi: "pussi — nosta yksi pala" },
    guessLabel:     { en: "What the class thinks is in the bag", de: "Was die Klasse im Beutel vermutet", fr: "Ce que la classe pense qu’il y a dans le sac", es: "Lo que el grupo cree que hay en la bolsa", pt: "O que a turma acha que tem na sacola", it: "Che cosa pensa la classe", nl: "Wat de klas denkt dat er in de zak zit", sv: "Vad klassen tror finns i påsen", da: "Klassens bud på, hvad der er i posen", no: "Hva klassen tror ligger i posen", fi: "Mitä luokka arvelee pussissa olevan" },
    inLabel:        { en: "we think this is in the bag", de: "Das vermuten wir im Beutel", fr: "on pense que c’est dans le sac", es: "creemos que esto sí está en la bolsa", pt: "achamos que isto está na sacola", it: "secondo noi è nel sacchetto", nl: "dit zit er volgens ons in", sv: "det här tror vi finns i påsen", da: "i posen, tror vi", no: "dette tror vi ligger i posen", fi: "uskomme tämän olevan pussissa" },
    outLabel:       { en: "we think this is not in the bag", de: "Das vermuten wir nicht im Beutel", fr: "on pense que ce n’est pas dans le sac", es: "creemos que esto no está en la bolsa", pt: "achamos que isto não está na sacola", it: "secondo noi non è nel sacchetto", nl: "dit zit er volgens ons niet in", sv: "det här tror vi inte finns i påsen", da: "ikke i posen, tror vi", no: "dette tror vi ikke ligger i posen", fi: "uskomme, ettei tämä ole pussissa" },
    poolLabel:      { en: "not decided yet", de: "Noch nicht entschieden", fr: "on ne sait pas encore", es: "todavía no decidimos", pt: "ainda não decidimos", it: "ancora da decidere", nl: "nog niet beslist", sv: "inte bestämt än", da: "ikke bestemt endnu", no: "ikke bestemt ennå", fi: "vielä päättämättä" },
    recordAria:     { en: "record {i}", de: "Reihe {i}", fr: "relevé {i}", es: "registro {i}", pt: "registro {i}", it: "fila {i}", nl: "rij {i}", sv: "rad {i}", da: "række {i}", no: "rad {i}", fi: "rivi {i}" },
    cellAria:       { en: "{i}: {piece}", de: "{i}: {piece}", fr: "{i} : {piece}", es: "{i}: {piece}", pt: "{i}: {piece}", it: "{i}: {piece}", nl: "{i}: {piece}", sv: "{i}: {piece}", da: "{i}: {piece}", no: "{i}: {piece}", fi: "{i}: {piece}" },
    openedLabel:    { en: "what the bag held", de: "Was im Beutel war", fr: "ce qu’il y avait dans le sac", es: "lo que había en la bolsa", pt: "o que tinha na sacola", it: "che cosa c’era nel sacchetto", nl: "wat er in de zak zat", sv: "det här låg i påsen", da: "hvad der var i posen", no: "det som lå i posen", fi: "mitä pussissa oli" },
    moreAria:       { en: "one more {piece}", de: "{piece}: eins mehr", fr: "{piece} : ajouter", es: "{piece}: agregar", pt: "{piece}: mais", it: "{piece}: aggiungi", nl: "één {piece} erbij", sv: "{piece}: fler", da: "{piece}: læg til", no: "{piece}: legg til", fi: "{piece}: yksi lisää" },
    lessAria:       { en: "one fewer {piece}", de: "{piece}: eins weniger", fr: "{piece} : enlever", es: "{piece}: quitar", pt: "{piece}: menos", it: "{piece}: togli", nl: "één {piece} eraf", sv: "{piece}: färre", da: "{piece}: tag fra", no: "{piece}: ta bort", fi: "{piece}: yksi vähemmän" },
    pieceRound:     { en: "the round one", de: "Kreis", fr: "rond", es: "círculo", pt: "o círculo", it: "il cerchio", nl: "cirkel", sv: "cirkel", da: "den runde brik", no: "sirkelen", fi: "ympyrä" },
    pieceSquare:    { en: "the square one", de: "Viereck", fr: "carré", es: "cuadrado", pt: "o quadrado", it: "il quadrato", nl: "vierkant", sv: "kvadrat", da: "den firkantede brik", no: "kvadratet", fi: "neliö" },
    pieceTriangle:  { en: "the three-cornered one", de: "Dreieck", fr: "triangle", es: "triángulo", pt: "o triângulo", it: "il triangolo", nl: "driehoek", sv: "triangel", da: "den trekantede brik", no: "trekanten", fi: "kolmio" },
    pieceDiamond:   { en: "the diamond one", de: "Raute", fr: "losange", es: "rombo", pt: "o losango", it: "il rombo", nl: "ruit", sv: "romb", da: "den rudeformede brik", no: "diamanten", fi: "vinoneliö" },
    pieceHexagon:   { en: "the six-sided one", de: "Sechseck", fr: "hexagone", es: "hexágono", pt: "o hexágono", it: "l’esagono", nl: "zeshoek", sv: "sexhörning", da: "den sekskantede brik", no: "sekskanten", fi: "kuusikulmio" },
    pieceStar:      { en: "the star one", de: "Stern", fr: "étoile", es: "estrella", pt: "a estrela", it: "la stella", nl: "ster", sv: "stjärna", da: "den stjerneformede brik", no: "stjernen", fi: "tähti" }
  },

  STORE_KEY: 'lcs:draw-bag:v1',
  ENT_TRUST_DAYS: 14,

  defaults: {},
  settings: [],

  premium: false,
  premiumKnown: false,

  /* six kinds. The KIND is the model's identity; what it LOOKS like is a
     skin (see SKIN below), and D18 asserts the drawn sequence is
     byte-identical across every skin — so changing the pictures provably
     cannot change the chance. */
  KINDS: ['c', 's', 't', 'd', 'h', 'x'],
  PIECE_KEY: { c: 'pieceRound', s: 'pieceSquare', t: 'pieceTriangle', d: 'pieceDiamond', h: 'pieceHexagon', x: 'pieceStar' },

  MAX_EACH: 12,
  MAX_TOTAL: 24,

  LENS: [10, 20, 40],
  FREE_LENS: [10, 20],
  DEFAULT_LEN: 20,

  /* =================================================================
     THE MODEL — pure, total, immutable. No DOM, no locale, no Date, and
     ⚠ NO UNSEEDED RANDOMNESS: `Math.random` and `crypto` do not appear
     in this file at all. Every draw is a pure function of
     (bag, seed, index).
     ================================================================= */

  _emptyCounts: function () {
    var o = {}, i;
    for (i = 0; i < this.KINDS.length; i++) o[this.KINDS[i]] = 0;
    return o;
  },

  _copyCounts: function (b) {
    var o = {}, i, k, v;
    for (i = 0; i < this.KINDS.length; i++) {
      k = this.KINDS[i];
      v = (b && typeof b[k] === 'number' && isFinite(b[k])) ? Math.floor(b[k]) : 0;
      o[k] = v > 0 ? v : 0;
    }
    return o;
  },

  newState: function () {
    return {
      bag: this._emptyCounts(),
      /* ⭐ THE DRAFT IS WHY `composition()` CAN THROW AND THE TOOL STILL
         HAS A BUILDER. The teacher edits a DRAFT; the render path reads
         the draft and never the sealed bag. Closing the bag commits the
         draft and clears it, and from that moment the contents are
         unreachable from the render path until the bag is opened. */
      draft: null,
      /* 0 = undecided, 1 = we think it is in, 2 = we think it is not */
      guess: this._emptyCounts(),
      committed: false,
      n: this.DEFAULT_LEN,
      runs: [],
      opened: false,
      skin: 'shapes'
    };
  },

  _clone: function (st) {
    var s = st || this.newState(), i;
    var runs = [];
    for (i = 0; i < (s.runs || []).length; i++) {
      runs.push({ seed: s.runs[i].seed, draws: s.runs[i].draws.slice() });
    }
    return {
      bag: this._copyCounts(s.bag),
      draft: s.draft ? this._copyCounts(s.draft) : null,
      guess: this._copyCounts(s.guess),
      committed: !!s.committed,
      n: s.n,
      runs: runs,
      opened: !!s.opened,
      skin: s.skin
    };
  },

  total: function (b) {
    var i, t = 0;
    for (i = 0; i < this.KINDS.length; i++) t += (b && b[this.KINDS[i]]) || 0;
    return t;
  },

  /* ⭐ THE PREFIX-SUM WALK. This is the theorem the gate proves
     exhaustively (D3): for every index in [0, total) it returns exactly
     the kind a hand-computed prefix sum says, so an off-by-one is
     deterministically fatal rather than a statistical wobble. The chi-
     squared test is only the backstop behind this. */
  at: function (b, i) {
    var k, key, c, acc = 0;
    if (typeof i !== 'number' || !isFinite(i) || i < 0) return null;
    for (k = 0; k < this.KINDS.length; k++) {
      key = this.KINDS[k];
      c = (b && b[key]) || 0;
      if (i < acc + c) return key;
      acc += c;
    }
    return null;
  },

  /* mulberry32 — the house idiom, inlined verbatim as in
     compare-tales-core.js:59, curate-wing-core.js:50,
     mochi-feast-core.js:125, echo-grove-activity.js:62 and
     fractions-core.js:268. */
  _mulberry32: function (a) {
    var s = a >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  _mix: function (a, b) {
    var h = (a ^ Math.imul((b | 0) + 0x9E3779B9, 0x85EBCA6B)) | 0;
    h = Math.imul(h ^ (h >>> 13), 0xC2B2AE35) | 0;
    return (h ^ (h >>> 16)) >>> 0;
  },

  /* the seed is a pure function of the BAG, so the same bag gives the
     same run everywhere on earth — which is what lets the live verifier
     assert an exact sequence against production. `k` is the run number,
     and it is the ONLY thing that differs between run one and run two. */
  seedFor: function (b, k) {
    var i, s = 0;
    for (i = 0; i < this.KINDS.length; i++) s = this._mix(s, ((b && b[this.KINDS[i]]) || 0) + (i + 1) * 31);
    return this._mix(s, k);
  },

  /* uniform integer in [0, n) — REJECTION-SAMPLED, so there is no modulo
     bias for the chi-squared to trip over. The discipline is
     name-sticks.js:281-289, made SEEDED here: crypto is unseedable and
     determinism is a stated requirement of this tool. */
  _uniform: function (rng, n) {
    if (!(n > 0)) return 0;
    var limit = Math.floor(4294967296 / n) * n, v, guard = 0;
    do {
      v = Math.floor(rng() * 4294967296);
      guard++;
    } while (v >= limit && guard < 200);
    return v % n;
  },

  /* one draw, as a pure function of (bag, seed, index) */
  pick: function (b, seed, idx) {
    var t = this.total(b);
    if (t < 1) return null;
    var rng = this._mulberry32(this._mix(seed, idx));
    return this.at(b, this._uniform(rng, t));
  },

  /* ---- the builder ------------------------------------------------ */

  openDraft: function (st) {
    var s = this._clone(st);
    s.draft = this._copyCounts(s.bag);
    return s;
  },

  /* ⚠ RETURNS NULL ON REFUSAL, never an unchanged clone. The recorded
     number-sieve defect: `setTarget` returned the untouched clone, so a
     failure carried the OLD data forward and committed itself as a
     success. A caller must be able to see the refusal. */
  setDraft: function (st, kind, delta) {
    var s = this._clone(st);
    if (!s.draft) return null;
    if (this.KINDS.indexOf(kind) === -1) return null;
    var d = Math.round(Number(delta));
    if (!(d === 1 || d === -1)) return null;
    var next = s.draft[kind] + d;
    if (next < 0 || next > this.MAX_EACH) return null;
    if (d === 1 && this.total(s.draft) >= this.MAX_TOTAL) return null;
    s.draft[kind] = next;
    return s;
  },

  /* closing the bag seals the draft AND clears everything downstream of
     it — a new bag means a new guess, no runs and a closed lid. */
  sealDraft: function (st) {
    var s = this._clone(st);
    if (!s.draft) return null;
    if (this.total(s.draft) < 1) return null;
    s.bag = this._copyCounts(s.draft);
    s.draft = null;
    s.guess = this._emptyCounts();
    s.committed = false;
    s.runs = [];
    s.opened = false;
    return s;
  },

  /* ---- the guess -------------------------------------------------- */

  /* ⭐ THE COMMITTED PRIOR — invention 3. Once one piece has been drawn
     the guess is frozen, and it is frozen by REFUSAL rather than by a
     disabled attribute, so no path in the file can move it. */
  placeGuess: function (st, kind) {
    var s = this._clone(st);
    if (s.committed) return null;
    if (this.KINDS.indexOf(kind) === -1) return null;
    s.guess[kind] = (s.guess[kind] + 1) % 3;
    return s;
  },

  /* ---- drawing ---------------------------------------------------- */

  currentRun: function (st) {
    var s = st || this.newState();
    return s.runs.length ? s.runs[s.runs.length - 1] : null;
  },

  runFull: function (st, r) {
    var s = st || this.newState();
    return !!r && r.draws.length >= s.n;
  },

  canDraw: function (st) {
    var s = st || this.newState();
    if (this.total(s.bag) < 1) return false;
    if (s.opened) return false;
    var r = this.currentRun(s);
    if (!r) return true;
    return !this.runFull(s, r);
  },

  /* ⚠ THE BAG IS NEVER TOUCHED HERE — refusal 5. Drawing appends to the
     record and does nothing else, so with-replacement is structural and
     D6 has something real to assert after every single draw. */
  draw: function (st) {
    var s = this._clone(st);
    if (!this.canDraw(s)) return null;
    if (!s.runs.length) {
      s.committed = true;
      s.runs = [{ seed: this.seedFor(s.bag, 1), draws: [] }];
    }
    var r = s.runs[s.runs.length - 1];
    var got = this.pick(s.bag, r.seed, r.draws.length);
    if (!got) return null;
    r.draws = r.draws.concat([got]);
    return s;
  },

  /* ⭐ INVENTION 1 — the identical cause, run again. Nothing about the
     bag changes; only the run index feeding the seed does. */
  secondRun: function (st) {
    var s = this._clone(st);
    if (s.opened) return null;
    if (s.runs.length !== 1) return null;
    if (!this.runFull(s, s.runs[0])) return null;
    s.runs = s.runs.concat([{ seed: this.seedFor(s.bag, 2), draws: [] }]);
    return s;
  },

  openBag: function (st) {
    var s = this._clone(st);
    if (this.total(s.bag) < 1) return null;
    if (s.opened) return null;
    s.opened = true;
    return s;
  },

  /* ⚠ THROWS BEFORE THE BAG IS OPEN. The estimation-jar idiom
     (revealedCount(), which throws so the true count cannot sit in the
     DOM, an aria-label, the title or the live region). This is
     structural unreachability, not a render-time `if` — and it is why
     the builder edits a DRAFT instead of the bag. */
  composition: function (st) {
    var s = st || this.newState();
    if (!s.opened) throw new Error('the bag is not open');
    return this._copyCounts(s.bag);
  },

  setLen: function (st, n) {
    var s = this._clone(st);
    var v = Math.round(Number(n));
    if (this.LENS.indexOf(v) === -1) return null;
    /* ⚠ refuse rather than destroy: changing the length once drawing has
       started would wipe a record the class is looking at, which is the
       recorded number-sieve "changing the field wiped the deck" defect.
       The chips are disabled too, but the model refuses on its own. */
    if (s.runs.length) return null;
    if (v === s.n) return null;
    s.n = v;
    return s;
  },

  setSkin: function (st, id) {
    var s = this._clone(st);
    if (typeof id !== 'string' || !id) return null;
    if (id === s.skin) return null;
    s.skin = id;
    return s;
  },

  loadBag: function (st, rec) {
    var s = this._clone(st);
    if (!rec || !rec.b) return null;
    var b = this._copyCounts(rec.b);
    if (this.total(b) < 1) return null;
    s.bag = b;
    s.draft = null;
    s.guess = this._emptyCounts();
    s.committed = false;
    s.runs = [];
    s.opened = false;
    return s;
  },

  /* =================================================================
     ENTITLEMENT — the pattern from pattern-bench.js:239-265.
     ⚠ UNKNOWN IS PESSIMISTIC (no `&& premiumKnown` on a control gate),
     and locking a control is not enough: the state it produced must be
     reset once we actually know. See render().
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

  /* ---- THE BAG BOOK. Locale-NEUTRAL in its bags: a bag is six counts
     and nothing else. The SKINS carry per-locale labels, but those are
     BAKED FROM PLATFORM SoT at generation time — the nouns from
     `REFERENCE TRANSLATIONS/image-vocabulary.js` and the theme names
     from `frontend/config/topics-taxonomy.json` — so this tool adds no
     new authored language for its material. ---------------------- */
  /* ⚠ THE FALLBACK CARRIES THE FREE BAGS INLINE, never an empty array. An
     empty fallback means a 404 turns the bag book into a dead control
     for a subscriber — arrow-strip shipped exactly that. A 404 must
     degrade to the FREE TIER, not to nothing. */
  FALLBACK_BAGS: {
    version: 1, freeMax: 8, premiumMax: 120,
    bags: [
      { id: 'b-001', b: { c: 10, s: 7, t: 0, d: 0, h: 0, x: 0 }, free: true },
      { id: 'b-002', b: { c: 2, s: 6, t: 6, d: 3, h: 2, x: 2 }, free: true },
      { id: 'b-003', b: { c: 0, s: 0, t: 5, d: 5, h: 5, x: 0 }, free: true },
      { id: 'b-004', b: { c: 0, s: 0, t: 0, d: 9, h: 4, x: 0 }, free: true },
      { id: 'b-005', b: { c: 4, s: 2, t: 0, d: 0, h: 8, x: 7 }, free: true },
      { id: 'b-006', b: { c: 9, s: 0, t: 0, d: 0, h: 0, x: 9 }, free: true },
      { id: 'b-007', b: { c: 9, s: 0, t: 0, d: 0, h: 0, x: 0 }, free: true },
      { id: 'b-008', b: { c: 0, s: 9, t: 5, d: 0, h: 0, x: 0 }, free: true }
    ],
    /* no picture skins offline: the shapes skin is built in and needs no
       record, so a 404 lands on the FREE TIER exactly as it stands. */
    skins: []
  },

  _fetchBags: function () {
    var self = this;
    fetch('/mini-tools/draw-bag-bags.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_BAGS; })
      .then(function (d) {
        self.data = (d && d.bags && d.bags.length) ? d : self.FALLBACK_BAGS;
        self._settle();
      });
  },

  /* locked entries are ABSENT from the array, never merely hidden */
  bagsFor: function () {
    var all = (this.data && this.data.bags) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  skinsFor: function () {
    var all = (this.data && this.data.skins) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  skinDef: function (id) {
    var want = (typeof id === 'string' && id) ? id : (this.st && this.st.skin);
    var all = (this.data && this.data.skins) || [], i;
    for (i = 0; i < all.length; i++) if (all[i].id === want) return all[i];
    return null;
  },

  lensFor: function () { return this.premium ? this.LENS : this.FREE_LENS; },

  /* seat the opening bag once the book has arrived */
  _settle: function () {
    if (!this.data) return;
    if (this.st && this.total(this.st.bag) < 1) {
      var open = this.bagsFor();
      if (open.length) {
        var next = this.loadBag(this.st, open[0]);
        if (next) { this.st = next; this._bagIdx = 0; this._bagId = open[0].id; }
      }
    }
    if (this._wrap) this.render();
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectDrawBagCSS();
    /* ⭐ THE WIDE-VIEWPORT SWITCH, and the one-line rollback. Everything it
       enables lives above 1367px, so it is inert at every gate width. */
    document.body.classList.add('drb-wide');
    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._timers = [];
    this._bagIdx = 0;
    this._bagId = null;
    this._fetchBags();
    this._fetchEntitlement();
    this.render();
  },

  reset: function () {
    this.st = this.newState();
    this._bagIdx = 0;
    this._bagId = null;
    /* _settle seats the opening bag AND renders — calling render again
       here would paint the empty state for a frame first. */
    this._settle();
  },

  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    /* ⚠ locking a control is not enough — reset the STATE it produced.
       If we learn the account is free while a premium skin or the long
       record is out, put them away. (pattern-bench:290) */
    if (this.premiumKnown && !this.premium) {
      if (this.st.skin !== 'shapes') {
        var open = this.skinsFor(), i, ok = false;
        for (i = 0; i < open.length; i++) if (open[i].id === this.st.skin) ok = true;
        if (!ok) this.st.skin = 'shapes';
      }
      if (this.FREE_LENS.indexOf(this.st.n) === -1 && !this.st.runs.length) this.st.n = this.DEFAULT_LEN;
    }
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'drb-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    /* ⚠ THE HINT SITS ABOVE THE STAGE. It is the only instruction this
       tool gives, and under the guess plus two records it can be
       off-screen at the moment it appears — the recorded number-sieve
       defect, which reached the operator. */
    wrap.appendChild(this._buildHint());
    if (this.st.draft) {
      wrap.appendChild(this._buildFill());
    } else {
      wrap.appendChild(this._buildGuess());
      wrap.appendChild(this._buildMain());
      if (this.st.opened) wrap.appendChild(this._buildOpened());
    }
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  /* =================================================================
     THE PIECES. A kind is rendered by the current SKIN — an SVG shape
     for `shapes`, an image for a picture skin — and D18 asserts the
     DRAWN SEQUENCE is byte-identical across every skin, so the pictures
     provably cannot change the chance.
     ⚠ NO TEXT NODE ANYWHERE ON THE STAGE. Not a numeral, not a letter.
     The shapes are polygons and the pictures are images; every name in
     this tool lives in an aria-label, which is invisible.
     ================================================================= */
  SVG_NS: 'http://www.w3.org/2000/svg',
  SHAPE: {
    c: { tag: 'circle', at: { cx: '12', cy: '12', r: '9.2' } },
    s: { tag: 'rect', at: { x: '3.2', y: '3.2', width: '17.6', height: '17.6', rx: '2.6' } },
    t: { tag: 'polygon', at: { points: '12,2.8 21.4,20.2 2.6,20.2' } },
    d: { tag: 'polygon', at: { points: '12,2.2 21.8,12 12,21.8 2.2,12' } },
    h: { tag: 'polygon', at: { points: '12,2.4 20.3,7.2 20.3,16.8 12,21.6 3.7,16.8 3.7,7.2' } },
    x: { tag: 'polygon', at: { points: '12,2.2 14.8,9.4 22.4,9.8 16.5,14.6 18.4,22 12,17.8 5.6,22 7.5,14.6 1.6,9.8 9.2,9.4' } }
  },

  /* ⚠ THE SKIN IS AN ARGUMENT, NEVER READ OFF LIVE STATE. The first cut
     rendered a skin chip by assigning `st.skin`, drawing, then putting
     it back — a mutation of the model from inside the render path, and
     the kind of thing that works until something between the two lines
     throws. Pass it. */
  _pieceNode: function (kind, skinId) {
    var sk = this.skinDef(skinId);
    if (sk && sk.items && sk.items[kind]) {
      var im = document.createElement('img');
      im.className = 'drb-piece';
      im.src = '/image-library-webp/themes/' + encodeURIComponent(sk.items[kind].dir) + '/' + sk.items[kind].file + '@2x.webp';
      im.alt = '';
      im.draggable = false;
      im.setAttribute('aria-hidden', 'true');
      return im;
    }
    var def = this.SHAPE[kind];
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'drb-piece drb-k-' + kind);
    svg.setAttribute('aria-hidden', 'true');
    var node = document.createElementNS(this.SVG_NS, def.tag);
    var a;
    for (a in def.at) if (Object.prototype.hasOwnProperty.call(def.at, a)) node.setAttribute(a, def.at[a]);
    svg.appendChild(node);
    return svg;
  },

  /* the accessible name of a kind: authored for the shapes skin, and
     BAKED FROM image-vocabulary.js for a picture skin — so a screen
     reader hears "apple" on the fruit skin and "the round one" on the
     shape skin, and neither cost a new authoring pass. */
  _pieceName: function (kind, skinId) {
    var sk = this.skinDef(skinId);
    if (sk && sk.items && sk.items[kind] && sk.items[kind].name) {
      var nm = sk.items[kind].name;
      return nm[this.api.lang] || nm.en || this.api.t(this.PIECE_KEY[kind]);
    }
    return this.api.t(this.PIECE_KEY[kind]);
  },

  _skinName: function (sk) {
    if (!sk) return this.api.t('skinShapes');
    var nm = sk.name || {};
    return nm[this.api.lang] || nm.en || sk.id;
  },

  _buildBar: function () {
    var api = this.api, self = this, bar = api.el('div', 'drb-bar');

    /* how many draws — numerals only, and chrome rather than stage */
    var lens = api.el('div', 'drb-group');
    lens.setAttribute('role', 'group');
    lens.setAttribute('aria-label', api.t('lenLabel'));
    var openLens = this.lensFor();
    this.LENS.forEach(function (n) {
      var open = openLens.indexOf(n) !== -1;
      var b = api.el('button', 'drb-chip' + (self.st.n === n ? ' drb-on' : '') + (open ? '' : ' drb-locked'));
      b.type = 'button';
      b.textContent = String(n);
      b.setAttribute('aria-pressed', String(self.st.n === n));
      /* ⚠ THE CHIP THAT IS ALREADY THE STATE IS DISABLED, not merely
         tinted. Its reducer refuses a no-op change, so leaving it live
         is a control that provably does nothing — the liveness gate
         caught exactly that on the skin group, and it is the same shape
         as sorting-hoops' "Start again" being idempotent at rest and
         number-sieve's library stepping to an identical board.
         Also refusing (rather than wiping) while a record exists. */
      b.disabled = !!self.st.runs.length || !!self.st.draft || (open && self.st.n === n);
      b.addEventListener('click', function () {
        if (!open) { self._showGate(); return; }
        var next = self.setLen(self.st, n);
        if (!next) return;
        self.st = next;
        self.render();
      });
      lens.appendChild(b);
    });
    bar.appendChild(lens);

    /* the material — an icon per skin, never a word on the chip */
    var skins = api.el('div', 'drb-group');
    skins.setAttribute('role', 'group');
    skins.setAttribute('aria-label', api.t('skinLabel'));
    var all = [null].concat((this.data && this.data.skins) || []);
    all.forEach(function (sk) {
      var id = sk ? sk.id : 'shapes';
      var open = !sk || sk.free || self.premium;
      var b = api.el('button', 'drb-chip drb-skin' + (self.st.skin === id ? ' drb-on' : '') + (open ? '' : ' drb-locked'));
      b.type = 'button';
      b.setAttribute('aria-label', self._skinName(sk));
      b.setAttribute('aria-pressed', String(self.st.skin === id));
      /* same rule as the length group: the option that IS the state
         cannot be chosen again, so it is disabled rather than live-and-
         inert. A locked one stays live — it has a gate to raise. */
      b.disabled = open && self.st.skin === id;
      b.appendChild(self._pieceNode('c', id));
      b.addEventListener('click', function () {
        if (!open) { self._showGate(); return; }
        var next = self.setSkin(self.st, id);
        if (!next) return;
        self.st = next;
        self.render();
      });
      skins.appendChild(b);
    });
    bar.appendChild(skins);
    return bar;
  },

  /* ⚠ STEP PAST A BAG THAT WOULD RENDER IDENTICALLY. The book's next
     entry can BE the state already on screen, so a plain (i+1) step
     changes nothing on the first press and the control reads as broken —
     the number-sieve library defect, found again on arrow-strip's Mat
     Book by the liveness gate. Page until something actually differs. */
  _stepBag: function () {
    var open = this.bagsFor();
    if (!open.length) return;
    var k, cand, hit = null, idx = 0;
    for (k = 1; k <= open.length; k++) {
      idx = (this._bagIdx + k) % open.length;
      cand = open[idx];
      if (!this._sameBag(cand.b, this.st.bag)) { hit = cand; break; }
    }
    if (!hit) return;
    var next = this.loadBag(this.st, hit);
    if (!next) return;
    this._bagIdx = idx;
    this._bagId = hit.id;
    this.st = next;
    this.render();
  },

  _sameBag: function (a, b) {
    var i, k;
    for (i = 0; i < this.KINDS.length; i++) {
      k = this.KINDS[i];
      if (((a && a[k]) || 0) !== ((b && b[k]) || 0)) return false;
    }
    return true;
  },

  _buildHint: function () {
    var api = this.api, s = this.st, hint = api.el('div', 'drb-hint');
    if (s.draft) hint.textContent = api.t('hintFill');
    else if (this.total(s.bag) < 1) hint.textContent = api.t('hintFill');
    else if (s.opened) hint.textContent = '';
    else if (!s.runs.length) hint.textContent = api.t('hintGuess');
    else if (this.canDraw(s)) hint.textContent = api.t('hintDraw');
    else if (s.runs.length === 1 && this.premium) hint.textContent = api.t('hintAgain');
    else hint.textContent = api.t('hintOpen');
    return hint;
  },

  /* =================================================================
     THE BUILDER. The teacher fills the bag here — this is the whole of
     "the bag draws whatever the teacher selects", and it is FREE.
     It edits a DRAFT, so the sealed bag is never on the render path.
     ================================================================= */
  _buildFill: function () {
    var api = this.api, self = this, s = this.st;
    var box = api.el('div', 'drb-fill');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('fillBtn'));
    this.KINDS.forEach(function (k) {
      var col = api.el('div', 'drb-fillcol');

      var less = api.el('button', 'drb-step');
      less.type = 'button';
      less.setAttribute('aria-label', api.t('lessAria').replace('{piece}', self._pieceName(k)));
      less.appendChild(self._minusNode());
      less.disabled = s.draft[k] <= 0;
      less.addEventListener('click', function () {
        var next = self.setDraft(self.st, k, -1);
        if (!next) return;
        self.st = next;
        self.render();
      });

      /* the draft count is shown as PIECES, never as a numeral —
         refusal 1 holds inside the builder too. */
      var stack = api.el('div', 'drb-stack');
      stack.setAttribute('aria-hidden', 'true');
      var i;
      for (i = 0; i < s.draft[k]; i++) stack.appendChild(self._pieceNode(k));
      if (!s.draft[k]) stack.appendChild(api.el('div', 'drb-none'));

      var more = api.el('button', 'drb-step');
      more.type = 'button';
      more.setAttribute('aria-label', api.t('moreAria').replace('{piece}', self._pieceName(k)));
      more.appendChild(self._plusNode());
      more.disabled = s.draft[k] >= self.MAX_EACH || self.total(s.draft) >= self.MAX_TOTAL;
      more.addEventListener('click', function () {
        var next = self.setDraft(self.st, k, 1);
        if (!next) return;
        self.st = next;
        self.render();
      });

      col.appendChild(more);
      col.appendChild(stack);
      col.appendChild(less);
      box.appendChild(col);
    });
    return box;
  },

  /* the two stepper glyphs are SVG strokes, not "+" and "−" characters:
     a text node on the stage is exactly what the no-words law forbids,
     and a minus sign is also the one character the Cold Line will have
     to reserve. */
  _plusNode: function () {
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'drb-glyph');
    svg.setAttribute('aria-hidden', 'true');
    var a = document.createElementNS(this.SVG_NS, 'path');
    a.setAttribute('d', 'M12 5 V19 M5 12 H19');
    svg.appendChild(a);
    return svg;
  },
  _minusNode: function () {
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'drb-glyph');
    svg.setAttribute('aria-hidden', 'true');
    var a = document.createElementNS(this.SVG_NS, 'path');
    a.setAttribute('d', 'M5 12 H19');
    svg.appendChild(a);
    return svg;
  },

  /* =================================================================
     THE GUESS — three shelves, no words and no ticks or crosses. A
     piece sits in the bag shelf, the tray shelf, or neither. Tapping
     cycles it. Once one piece has been drawn every button here is
     inert, because the prior is committed.
     ⚠ ALL SIX KINDS ARE ALWAYS SHOWN, whatever is in the bag — showing
     only the kinds that are in there would hand the class the answer.
     ================================================================= */
  _buildGuess: function () {
    var api = this.api, self = this, s = this.st;
    var box = api.el('div', 'drb-guess');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('guessLabel'));

    var shelves = [
      { v: 1, cls: 'drb-in', label: api.t('inLabel') },
      { v: 0, cls: 'drb-pool', label: api.t('poolLabel') },
      { v: 2, cls: 'drb-out', label: api.t('outLabel') }
    ];

    shelves.forEach(function (sh) {
      var row = api.el('div', 'drb-shelf ' + sh.cls);
      row.setAttribute('role', 'group');
      row.setAttribute('aria-label', sh.label);
      var any = false;
      self.KINDS.forEach(function (k) {
        if (s.guess[k] !== sh.v) return;
        any = true;
        var b = api.el('button', 'drb-gpiece');
        b.type = 'button';
        b.setAttribute('aria-label', self._pieceName(k) + ' — ' + sh.label);
        b.appendChild(self._pieceNode(k));
        b.disabled = !!s.committed;
        b.addEventListener('click', function () {
          var next = self.placeGuess(self.st, k);
          if (!next) return;
          self.st = next;
          self.render();
        });
        row.appendChild(b);
      });
      if (!any) row.appendChild(api.el('div', 'drb-shelfempty'));
      box.appendChild(row);
    });
    return box;
  },

  /* =================================================================
     THE BAG AND THE RECORDS.
     ⚠ RECORD TWO LIES UNDER RECORD ONE AND IS NEVER A GHOST OVERLAY —
     arrow-strip owns run-over-ghost (refusal 8). And ⭐ both records are
     grids of the SAME WIDTH with the SAME auto-fill rule, so their
     column counts are identical BY LAYOUT rather than by arithmetic —
     the hidden-real-destination trick. Nothing computes an alignment
     that could drift from what is on screen.
     ================================================================= */
  _buildMain: function () {
    var api = this.api, self = this, s = this.st;
    var main = api.el('div', 'drb-main');

    var bagBtn = api.el('button', 'drb-bag');
    bagBtn.type = 'button';
    bagBtn.setAttribute('aria-label', api.t('drawAria'));
    bagBtn.disabled = !this.canDraw(s);
    /* ⭐ THE BAG ITSELF OPENS. A 38px open-sack badge beside the reveal
       rendered as a dark smudge that read like a seventh piece; the
       signal belongs at full size, in the place the class is already
       looking. Now the reveal obviously belongs to the open bag above
       it, and three rows of pieces stop reading alike — with no word. */
    bagBtn.appendChild(this._bagNode(s.opened));
    bagBtn.addEventListener('click', function () {
      var next = self.draw(self.st);
      if (!next) return;
      self.st = next;
      self.render();
    });
    main.appendChild(bagBtn);

    var recs = api.el('div', 'drb-recs');
    s.runs.forEach(function (r, ri) {
      recs.appendChild(self._buildRecord(r, ri + 1));
    });
    /* the locked second record is SHOWN, not hidden — what is behind the
       gate should be legible rather than absent, so a signed-out teacher
       can see that the same bag runs twice even before deciding. */
    if (!this.premium && s.runs.length === 1 && this.runFull(s, s.runs[0]) && !s.opened) {
      recs.appendChild(this._buildRecord(null, 2));
    }
    main.appendChild(recs);
    return main;
  },

  _buildRecord: function (run, idx) {
    var api = this.api, self = this, s = this.st;
    var row = api.el('div', 'drb-rec' + (run ? '' : ' drb-reclocked'));
    row.setAttribute('role', 'list');
    row.setAttribute('aria-label', api.t('recordAria').replace('{i}', String(idx)));
    var i;
    for (i = 0; i < s.n; i++) {
      var got = run ? run.draws[i] : null;
      var cell = api.el('div', 'drb-cell' + (got ? ' drb-full' : ''));
      if (got) {
        cell.setAttribute('role', 'listitem');
        cell.setAttribute('aria-label', api.t('cellAria').replace('{i}', String(i + 1)).replace('{piece}', self._pieceName(got)));
        cell.appendChild(self._pieceNode(got));
      } else {
        cell.setAttribute('aria-hidden', 'true');
      }
      row.appendChild(cell);
    }
    return row;
  },

  /* `opened` draws the same sack with its mouth open. It is the only
     thing that marks the reveal as THE BAG rather than a third record —
     three rows of pieces in a row read alike at a glance, and a word
     would break the law this catalog is built on. */
  _bagNode: function (opened) {
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'drb-bagsvg');
    svg.setAttribute('aria-hidden', 'true');
    if (opened) {
      var ob = document.createElementNS(this.SVG_NS, 'path');
      ob.setAttribute('d', 'M28 38 Q18 60 20 76 Q22 94 50 94 Q78 94 80 76 Q82 60 72 38 Z');
      ob.setAttribute('class', 'drb-bagbody');
      var mouth = document.createElementNS(this.SVG_NS, 'ellipse');
      mouth.setAttribute('cx', '50'); mouth.setAttribute('cy', '38');
      mouth.setAttribute('rx', '22'); mouth.setAttribute('ry', '9');
      mouth.setAttribute('class', 'drb-bagmouth');
      svg.appendChild(ob);
      svg.appendChild(mouth);
      return svg;
    }
    /* a CINCHED SACK, not a cup. The first shape was a wide straight
       vessel and read as a tumbler — an open container, which is the
       one thing this must not look like. A narrow gathered neck over a
       heavy body says "closed" without a word, and that is the whole
       job: the shape itself has to mean "you cannot see in". */
    var body = document.createElementNS(this.SVG_NS, 'path');
    body.setAttribute('d', 'M38 36 Q18 60 20 76 Q22 94 50 94 Q78 94 80 76 Q82 60 62 36 Z');
    body.setAttribute('class', 'drb-bagbody');
    var neck = document.createElementNS(this.SVG_NS, 'path');
    neck.setAttribute('d', 'M36 22 Q50 15 64 22 L64 34 Q50 41 36 34 Z');
    neck.setAttribute('class', 'drb-bagtie');
    /* the gathered mouth, pinched shut */
    var knot = document.createElementNS(this.SVG_NS, 'path');
    knot.setAttribute('d', 'M42 20 Q50 10 58 20 Q50 16 42 20 Z');
    knot.setAttribute('class', 'drb-bagtie');
    svg.appendChild(body);
    svg.appendChild(neck);
    svg.appendChild(knot);
    return svg;
  },

  /* the reveal. The contents and the guess simply sit next to each
     other; nothing is marked, coloured, counted or compared. */
  _buildOpened: function () {
    var api = this.api, self = this;
    var comp = this.composition(this.st);
    var box = api.el('div', 'drb-opened');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('openedLabel'));
    this.KINDS.forEach(function (k) {
      var i;
      for (i = 0; i < comp[k]; i++) {
        var cell = api.el('div', 'drb-ocell');
        cell.setAttribute('aria-label', self._pieceName(k));
        cell.appendChild(self._pieceNode(k));
        box.appendChild(cell);
      }
    });
    return box;
  },

  _buildFoot: function () {
    var api = this.api, self = this, s = this.st;
    var foot = api.el('div', 'drb-foot');

    /* ⭐ D17 — a noun-labelled control does what its label says. "Fill
       the bag" opens the builder immediately; "Close the bag" seals it;
       "Run it again" produces a second record; "Open the bag" reveals.
       The number-sieve "New cards" defect was a chip that armed a mode
       and dealt nothing, and it reached the operator. */
    if (s.draft) {
      var seal = api.el('button', 'drb-chip drb-go');
      seal.type = 'button';
      seal.textContent = api.t('sealBtn');
      seal.disabled = this.total(s.draft) < 1;
      seal.addEventListener('click', function () {
        var next = self.sealDraft(self.st);
        if (!next) return;
        self.st = next;
        self._bagId = null;
        self.render();
      });
      foot.appendChild(seal);
      return foot;
    }

    var fill = api.el('button', 'drb-chip');
    fill.type = 'button';
    fill.textContent = api.t('fillBtn');
    fill.addEventListener('click', function () {
      self.st = self.openDraft(self.st);
      self.render();
    });
    foot.appendChild(fill);

    var again = api.el('button', 'drb-chip' + (this.premium ? '' : ' drb-locked'));
    again.type = 'button';
    again.textContent = api.t('againBtn');
    again.disabled = !(s.runs.length === 1 && this.runFull(s, s.runs[0]) && !s.opened);
    again.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      var next = self.secondRun(self.st);
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(again);

    var open = api.el('button', 'drb-chip drb-go');
    open.type = 'button';
    open.textContent = api.t('openBtn');
    open.disabled = s.opened || this.total(s.bag) < 1 || !s.runs.length;
    open.addEventListener('click', function () {
      var next = self.openBag(self.st);
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(open);

    /* ⭐ "ANOTHER BAG" IS FREE, AND THE BAG BOOK IS NOT A SEPARATE
       CONTROL. The first cut had both, and they called the SAME function
       — a locked chip beside an identical free one, which is the
       duplicate-control shape the liveness gate cannot see because both
       really do act. What the Teacher plan buys is the SIZE of the
       library this steps through (8 → ~120), so nothing is locked, no
       control is dead, and the least-resented gate is the one in force. */
    var another = api.el('button', 'drb-chip');
    another.type = 'button';
    another.textContent = api.t('anotherBtn');
    another.disabled = this.bagsFor().length < 2;
    another.addEventListener('click', function () { self._stepBag(); });
    foot.appendChild(another);

    var pr = api.el('button', 'drb-chip' + (this.premium ? '' : ' drb-locked'));
    pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      window.print();
    });
    foot.appendChild(pr);

    /* ⚠ TWO NODES, NEVER A CONCATENATION — the recorded localisation
       smell, and joining them makes the one actionable thing
       unclickable. Shape from folding-sheet.js:714-723. */
    if (this._gate) {
      var g = api.el('div', 'drb-gate');
      var sp = api.el('span');
      sp.textContent = api.t('gateLine');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-draw-bag';
      a.target = '_top';
      a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.appendChild(sp);
      g.appendChild(a);
      foot.appendChild(g);
    }
    return foot;
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
   holds 44px; a RECORD CELL is canvas and holds 34px (the calendar-wall
   precedent). Collapsing them into one number waves a real defect
   through, and an or-shaped assertion has hidden a missing floor twice.
   ⭐ BOTH RECORDS ARE THE SAME WIDTH WITH THE SAME auto-fill RULE, so
   they wrap to the same number of columns and align cell-for-cell
   without a single line of arithmetic. `justify-content:center` is safe
   HERE — and only here — because auto-fill never creates more columns
   than fit, so this grid cannot overflow. On an overflow scroller it is
   banned outright (it puts the start out of reach).
   ⚠ No `vh` anywhere: a manipulative's iframe grows to its content, so a
   vh rule inside it is a feedback loop the shell has no path for.
   ⚠ Never an inline `background` SHORTHAND — it resets background-image
   and beats the stylesheet.
   ===================================================================== */
function injectDrawBagCSS() {
  if (document.getElementById('drb-style')) return;
  var css = ''
    + '.drb-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;min-width:0;}'
    + '.drb-bar,.drb-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    + '.drb-group{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    + '.drb-chip{min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background:#FBF3E4;color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;cursor:pointer;}'
    + '.drb-chip.drb-on{background:#146B5E;color:#FBF3E4;}'
    + '.drb-chip.drb-locked{border-color:#F2784B;color:#C2562F;}'
    + '.drb-chip[disabled]{opacity:.5;cursor:default;}'
    + '.drb-chip.drb-go{background:#F2784B;border-color:#C2562F;color:#FFF;}'
    + '.drb-chip.drb-go[disabled]{background:#FBF3E4;color:#0E5147;border-color:#146B5E;}'
    + '.drb-chip.drb-skin{padding:6px;display:flex;align-items:center;justify-content:center;}'
    + '.drb-chip.drb-skin .drb-piece{width:26px;height:26px;}'
    + '.drb-gate{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:14px;color:#C2562F;'
    +   'display:flex;flex-wrap:wrap;justify-content:center;gap:6px;align-items:center;}'
    + '.drb-gate a{color:#C2562F;min-height:44px;display:inline-flex;align-items:center;}'
    + '.drb-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;color:#0E5147;min-height:20px;}'
    /* the pieces */
    + '.drb-piece{width:100%;height:100%;display:block;object-fit:contain;}'
    + '.drb-k-c{fill:#146B5E;}.drb-k-s{fill:#F2784B;}.drb-k-t{fill:#E8A33D;}'
    + '.drb-k-d{fill:#7B4B7E;}.drb-k-h{fill:#6E9B5B;}.drb-k-x{fill:#4A6480;}'
    /* THE BUILDER */
    + '.drb-fill{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%;}'
    + '.drb-fillcol{display:flex;flex-direction:column;align-items:center;gap:6px;}'
    + '.drb-step{min-height:44px;min-width:44px;padding:0;border-radius:12px;border:2px solid #146B5E;'
    +   'background:#FBF3E4;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
    + '.drb-step[disabled]{opacity:.4;cursor:default;}'
    + '.drb-glyph{width:22px;height:22px;fill:none;stroke:#0E5147;stroke-width:2.6;stroke-linecap:round;}'
    + '.drb-stack{display:flex;flex-direction:column-reverse;align-items:center;gap:2px;min-height:64px;'
    +   'justify-content:flex-start;}'
    + '.drb-stack .drb-piece{width:22px;height:22px;}'
    + '.drb-none{width:22px;height:22px;border-radius:50%;border:2px dashed rgba(20,107,94,.34);}'
    /* THE GUESS — three shelves */
    + '.drb-guess{display:flex;flex-direction:column;align-items:stretch;gap:6px;width:100%;max-width:520px;}'
    + '.drb-shelf{display:flex;flex-wrap:wrap;align-items:center;gap:8px;min-height:56px;padding:6px 10px;'
    +   'border-radius:14px;border:2px solid rgba(20,107,94,.28);}'
    + '.drb-shelf.drb-in{border-style:solid;background:rgba(20,107,94,.09);'
    +   'border-top-left-radius:26px;border-top-right-radius:26px;}'
    + '.drb-shelf.drb-pool{border-style:dashed;background:transparent;}'
    + '.drb-shelf.drb-out{border-style:solid;background:rgba(242,120,75,.09);border-color:rgba(242,120,75,.34);'
    +   'border-bottom-left-radius:26px;border-bottom-right-radius:26px;}'
    + '.drb-shelfempty{min-height:44px;min-width:44px;}'
    + '.drb-gpiece{min-height:44px;min-width:44px;width:44px;height:44px;padding:5px;border-radius:11px;'
    +   'border:2px solid #146B5E;background:#FBF3E4;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
    + '.drb-gpiece[disabled]{cursor:default;opacity:.85;}'
    /* THE BAG AND THE RECORDS */
    + '.drb-main{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;min-width:0;}'
    + '.drb-bag{min-height:44px;min-width:44px;width:116px;height:116px;padding:6px;border-radius:20px;'
    +   'border:2px solid #146B5E;background:#FBF3E4;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
    + '.drb-bag[disabled]{opacity:.5;cursor:default;}'
    + '.drb-bagsvg{width:100%;height:100%;}'
    + '.drb-bagbody{fill:#146B5E;}'
    + '.drb-bagtie{fill:#0E5147;}'
    + '.drb-recs{display:flex;flex-direction:column;align-items:stretch;gap:8px;width:100%;max-width:520px;min-width:0;}'
    + '.drb-rec{display:grid;grid-template-columns:repeat(auto-fill,var(--drb-cell));justify-content:center;'
    +   'gap:3px;padding:6px;border-radius:14px;border:2px solid rgba(20,107,94,.24);'
    +   '--drb-cell:clamp(34px,8.4vmin,44px);}'
    + '.drb-rec.drb-reclocked{border-style:dashed;border-color:rgba(242,120,75,.45);}'
    + '.drb-cell{width:var(--drb-cell);height:var(--drb-cell);border-radius:8px;padding:4px;'
    +   'border:2px solid rgba(20,107,94,.16);}'
    + '.drb-cell.drb-full{border-color:rgba(20,107,94,.40);background-color:#FBF3E4;}'
    /* THE REVEAL */
    + '.drb-opened{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;width:100%;max-width:520px;'
    +   'padding:8px;border-radius:16px;border:2px solid #146B5E;background-color:rgba(20,107,94,.06);}'
    + '.drb-ocell{width:34px;height:34px;padding:3px;}'
    + '.drb-bagmouth{fill:#0E5147;}'
    /* ⚠ THE THREE SHELVES GO SIDE BY SIDE ONCE THERE IS ROOM. Stacked,
       they are three full-width bands, and two of them are empty until
       the class commits — about 200px of nothing across the top of a
       desktop screen. Every measured gate passed that (nothing
       overflowed, every tap target held its floor) because SPARSE is
       not something a floor can see. The pool gets the wider column
       because it starts holding all six pieces. */
    /* ⚠ THE BREAKPOINT IS 760, NOT 820, AND THAT IS A CUT-OFF FIX. At
       820 a 768px tablet kept the stacked layout, and in the densest
       real state — the 40-cell record, both runs, and the bag open —
       the page ran to 1091px against a 900px fold in ALL ELEVEN
       locales. The English sweep passed it, because the sweep never
       opened the reveal with two full records; the locale audit drives
       the densest state and found it. Row layout above 760 buys back
       about 250px.
       ⚠ AND SIDE BY SIDE COSTS THE RECORD ITS CEILING (the arrow-strip
       lesson): the card is capped at 720px, so with the bag beside it
       the record gets ~530px and its cells drop to a 40px ceiling. The
       34px canvas floor is untouched. */
    + '@media (min-width:760px){'
    +   '.drb-main{flex-direction:row;justify-content:center;align-items:center;gap:20px;}'
    +   '.drb-recs{max-width:560px;}'
    +   '.drb-rec{--drb-cell:clamp(34px,7.4vmin,40px);}'
    +   '.drb-ocell{width:30px;height:30px;}'
    +   '.drb-guess{flex-direction:row;align-items:stretch;max-width:660px;gap:8px;}'
    +   '.drb-shelf{flex:1 1 0;min-width:0;justify-content:center;}'
    /* ⚠ WIDE ENOUGH FOR ALL SIX PIECES ON ONE LINE, WITH REAL MARGIN.
       At flex 2.2 the pool measured 323.625px against 324px of content
       and the sixth piece wrapped — a 0.375px miss, which is exactly the
       kind of thing that looks like a design choice and is not. The gap
       drops to 6px here and the share to 2.5, which leaves about 44px
       spare rather than minus a third of a pixel. */
    +   '.drb-shelf{gap:6px;}'
    +   '.drb-shelf.drb-pool{flex:2.5 1 0;}'
    +   '.drb-shelf.drb-in{border-radius:26px 14px 14px 26px;}'
    +   '.drb-shelf.drb-out{border-radius:14px 26px 26px 14px;}'
    /* the bag is the apparatus and the only thing the class taps — at
       desktop it was smaller than the chips beside it */
    +   '.drb-bag{width:148px;height:148px;}'
    + '}'

    /* =====================================================================
       WIDE-VIEWPORT TIERS — derived, not chosen.
       ---------------------------------------------------------------------
       MEASURED (scripts/derive-tool-wide-tiers.js, German, gate showing):
       chrome 534px, and this tool's apparatus has NO aspect-ratio at all.
       ⭐ ITS VERTICAL COST IS NEGATIVE. `.drb-rec` is
       `repeat(auto-fill, var(--drb-cell))`, so a wider record produces MORE
       columns and FEWER rows: widening makes draw-bag SHORTER. The vertical
       ceilings come out at 1972 / 2656 / 3511, i.e. the height budget is not
       the constraint here at any tier — the CARD is.
       So shippedCap = min(verticalCeiling, cardUsableWidth), and the card
       usable width is what binds: A 1192 · B ~1608 · C 1752.
       Layout check, since `.drb-main` is a ROW of [bag | records] at >=760:
         A  bag 180 + gap 20 + recs 800  = 1000 of 1192  ✓
         B  bag 220 + gap 20 + recs 1100 = 1340 of 1608  ✓
         C  bag 250 + gap 20 + recs 1240 = 1510 of 1752  ✓

       ⚠⚠ THE WHOLE CLAMP IS REPLACED, NEVER JUST ITS CEILING.
       `--drb-cell:clamp(34px,7.4vmin,40px)` sits at 65px of vmin at the
       Tier-A floor, so it is PINNED at 40 — but a sibling in this batch
       (arrow-strip) has a clamp whose middle term is LIVE 0.24px under its
       ceiling, where a ceiling-only bump does nothing at Tier A and
       silently works at B and C. Replacing the whole declaration is the
       only form that cannot fail that way, so it is the form used
       everywhere in this program.

       ⚠ THE 40px CEILING'S OWN JUSTIFICATION IS NOW VOID, and it says so:
       the comment above reads "the card is capped at 720px, so with the bag
       beside it the record gets ~530px and its cells drop to a 40px
       ceiling." The card is no longer 720. This tier is that ceiling being
       given back, not an arbitrary increase.

       ⚠⚠ THE GUESS ROW IS DELIBERATELY THE NARROWEST THING HERE, and
       that is a judgement the gates cannot make. Widening it to the card
       (1500 at Tier C) passed every assertion and looked WRONG: the three
       shelves go side by side, two of them are EMPTY until the class
       commits, so a 1500px row is ~490px of nothing, twice. This tool's own
       header predicted it -- "two of them are empty until the class
       commits ... every measured gate passed that ... because SPARSE is not
       something a floor can see" -- and widening reproduced exactly that,
       larger. Found by reading the 2560 render, not by a gate.
       So width is spent where it PAYS (the record fills with draws and
       gains columns; the reveal tray fills; the bag is the tapped object)
       and withheld where it COSTS (the guess shelves).

       ⚠ CHROME CAPS ARE INVENTED HERE, NOT RAISED. `.drb-bar`, `.drb-foot`,
       `.drb-hint` and `.drb-gate` are uncapped `width:100%` and would each
       stretch the full 1800px card, leaving a 1500px hint line over a
       1240px apparatus.
       ⚠ AND `.drb-gpiece` / `.drb-shelfempty` / `.drb-step` KEEP their 44px
       MINIMUMS as floors — the sizes below only ever raise them.
       ===================================================================== */
    + '@media (min-width:1367px) and (min-height:880px){'
    + '  body.drb-wide .drb-guess{max-width:820px;}'
    + '  body.drb-wide .drb-opened{max-width:900px;}'
    + '  body.drb-wide .drb-recs{max-width:800px;}'
    + '  body.drb-wide .drb-bar,body.drb-wide .drb-foot,body.drb-wide .drb-hint{max-width:1000px;}'
    + '  body.drb-wide .drb-rec{--drb-cell:52px;}'
    + '  body.drb-wide .drb-bag{width:180px;height:180px;}'
    + '  body.drb-wide .drb-ocell{width:38px;height:38px;}'
    + '  body.drb-wide .drb-gpiece{width:56px;height:56px;}'
    + '  body.drb-wide .drb-shelf{min-height:72px;}'
    + '  body.drb-wide .drb-chip,body.drb-wide .drb-hint{font-size:17px;}'
    + '  body.drb-wide .drb-gate{font-size:16px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1000px){'
    + '  body.drb-wide .drb-guess{max-width:940px;}'
    + '  body.drb-wide .drb-opened{max-width:1150px;}'
    + '  body.drb-wide .drb-recs{max-width:1100px;}'
    + '  body.drb-wide .drb-bar,body.drb-wide .drb-foot,body.drb-wide .drb-hint{max-width:1340px;}'
    + '  body.drb-wide .drb-rec{--drb-cell:60px;}'
    + '  body.drb-wide .drb-bag{width:220px;height:220px;}'
    + '  body.drb-wide .drb-ocell{width:44px;height:44px;}'
    + '  body.drb-wide .drb-gpiece{width:64px;height:64px;}'
    + '  body.drb-wide .drb-shelf{min-height:84px;}'
    + '  body.drb-wide .drb-chip,body.drb-wide .drb-hint{font-size:18px;}'
    + '  body.drb-wide .drb-gate{font-size:17px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    + '  body.drb-wide .drb-guess{max-width:1040px;}'
    + '  body.drb-wide .drb-opened{max-width:1300px;}'
    + '  body.drb-wide .drb-recs{max-width:1240px;}'
    + '  body.drb-wide .drb-bar,body.drb-wide .drb-foot,body.drb-wide .drb-hint{max-width:1510px;}'
    + '  body.drb-wide .drb-rec{--drb-cell:68px;}'
    + '  body.drb-wide .drb-bag{width:250px;height:250px;}'
    + '  body.drb-wide .drb-ocell{width:50px;height:50px;}'
    + '  body.drb-wide .drb-gpiece{width:72px;height:72px;}'
    + '  body.drb-wide .drb-shelf{min-height:96px;}'
    + '  body.drb-wide .drb-chip,body.drb-wide .drb-hint{font-size:19px;}'
    + '  body.drb-wide .drb-gate{font-size:18px;}'
    + '}'
    /* =====================================================================
       ⭐⭐ THE PRINT SHEET. Third of the three tools found calling
       window.print() with no `@media print` block — it printed the whole web
       page: nav, chips, footer, the tool at screen size. The chip says PRINT
       THE RECORD, and the record is the thing worth keeping — every draw the
       class made, in order, which is the whole point of a bag you draw from
       WITH replacement.
       ⚠ THE BAG, THE SHELVES AND THE PREDICTION GO. They are the apparatus,
       not the record, and a printed bag cannot be drawn from.
       ⚠ `.drb-recs` is capped (520 on screen, 1240 at Tier C) so the rows
       keep a readable line length beside the bag. On paper there is no bag,
       so the cap is released — and it has to be released with !important,
       because the wide tier three lines above is more specific than a bare
       class and would otherwise win inside the print block too. */
    + '@media print{'
    +   '*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
    +   '.lcs-header,.drb-hint,.drb-bar,.drb-foot,.drb-gate,.drb-chip,'
    +   '.drb-bag,.drb-guess,.drb-fill,.drb-shelf{display:none !important;}'
    +   '.drb-wrap{gap:0;}'
    +   '.drb-main{flex-direction:column !important;gap:0 !important;}'
    +   '.drb-recs{max-width:none !important;width:100%;}'
    +   '.drb-rec{border-color:#333 !important;background:#fff !important;break-inside:avoid;}'
    +   '.drb-cell,.drb-piece{border-color:#333 !important;}'
    +   '@page{margin:14mm;}'
    + '}';
  var st = document.createElement('style');
  st.id = 'drb-style';
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(DrawBag);
