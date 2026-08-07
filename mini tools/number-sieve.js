/* =====================================================================
   TOOL #36 — THE NUMBER SIEVE   (number-sieve.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #2. Catalog slot A1.

   THE FIELD · THE CLUE CARD · THE SURVIVORS. Three named parts, and
   nothing else in this tool gets a noun. (⚠ Build #2 introduced "board"
   in three paid-tier strings and five native panels filed it
   independently as a fourth named part — the recorded #41 defect. The
   strings now say "cards", which is what the tool already called the
   object in "New cards" and "Shuffle the cards".)

   THE ROUTINE, which is what makes this an instrument and not a puzzle:
     "Park your number. Turn the first card. What went dark?"
     ... and then the move that matters, with three still alight:
     "What would a card have to take away to leave just one?"

   ⭐⭐ WHAT BUILD #2 IS, IN ONE PARAGRAPH. Build #1 shipped an excellent
   model and three claims that were not true in production. The
   going-dark — the event this whole instrument exists to produce — had
   NEVER ONCE ANIMATED, because `render()` wiped the stage and minted
   every cell already carrying its dark class, and a CSS transition needs
   a node that already existed. The lit-versus-dark step it is built
   around was drawn at 1.44:1 against a WCAG floor of 3:1, and so was the
   committed marker, while the one high-contrast pair in the palette went
   unused. And the closing card — the only card the class actually cares
   about — extinguished exactly ONE number on 44 of the 60 shipped
   boards, so the enacted-clue thesis held for every card except the last
   one. Two sold paid features (saved setups, print) did not exist at
   all: the Print chip hid the deck and photographed the live field,
   which on a finished board put the ANSWER on paper.

   ⭐ THE THREE INVENTIONS, ALL THREE NOW OBSERVABLE:
     1. THE CLUE IS ENACTED, NEVER STATED. Nothing on screen names a
        rule, ever. A clue card carries an icon and a numeral and nothing
        else, and the aria label is POSITIONAL ("clue card 2") so the
        a11y path cannot leak what the sighted class is working out.
     2. ORDER DOES NOT MATTER, AND THE CLASS CAN NOW SEE IT. `verify`
        proves it over every permutation of every deck — and build #1
        renumbered the card backs 1..n on every shuffle, so four teal
        cards reading 1 2 3 4 became four teal cards reading 1 2 3 4 and
        the headline invention was INVISIBLE on screen. Each card now
        carries an emblem that travels with it, so a shuffle visibly
        re-orders the same deck. Tapping a face-up card also outlines
        what that card ALONE excludes, computed over the whole field, so
        order-invariance is something a class watches rather than
        something it is told.
     3. THE MARKER IS COMMITTED — and there are up to six of them, one
        per table, distinguished by SHAPE and never by colour. ⚠ Build #1
        let `shuffle` un-commit them, so after a full run, when the class
        already knew the answer, the one control inviting a second run
        handed them permission to move a marker onto it.

   ⭐ THE FOURTH MOVE, WHICH IS NEW. At the last card the tool no longer
   deals a card: it deals THREE face-up candidates, exactly one of which
   closes. The class argues, picks, and the chosen card acts. This lands
   the catalog's own killer question where the catalog says it belongs,
   and it fixes the unreadable climax by asking the class to AUTHOR the
   card instead of read it — the one moment in the tool that asks a child
   to run a clue forwards. A candidate that does not close is not WRONG;
   it leaves two numbers lit, and the material says so in silence.
   Constructibility was measured, not assumed: 125 of 125 boards.

   ⚠ THE FENCE — FOUR SURFACES, and the first one is the tight one.
   `choral-counting.js` owns a number grid, a Columns chip and an
   ones/tens digit tint — but its cells have two states, inked and
   not-yet-inked, and its grid is a live TRANSCRIPT that accumulates.
   This field is a standing POPULATION that depletes. Opposite objects.
   `sorting-hoops.js` owns the hidden rule and self-evicting material —
   on logic blocks, judging MEMBERSHIP in a region, never numbers and
   never removal. `estimation-jar.js` and `number-talk-easel.js` own the
   two shipped concealment disciplines — each conceals ONE quantity
   behind ONE reveal and BOTH eventually announce it. This conceals a
   PREDICATE and announces nothing. `wodb.js` owns curated repertoire and
   the ISO-week rotation, deliberately not copied. `open-number-line.js`
   is the exact inverse: an empty line the child fills, against a full
   field the clues empty. Activities: `choice-board.even-odd.2-oa-c-3`
   shows one numeral and grades a tile tap. Printables:
   `G1-130-chart-skip-count-color` lays a multiples comb on a 1-100 chart
   and its own gate asserts "chart must be complete — nothing blank", the
   exact structural inverse. REFERENCE APPS: "cross out" is always
   picture take-away. Empty.

   REFUSES, FOREVER — four structural refusals, each one gated:
     1. NEVER INK A SEQUENCE. Every cell exists from t=0; the only
        permitted transition within a run is lit -> dark. No next, no
        traversal order — which is also why the going-dark is
        SIMULTANEOUS across every cell a card takes, never a wave.
     2. NEVER A COLUMNS CONTROL, and no control may reset the field.
        Width is bound to the range, full stop.
     3. NEVER TINT BY PLACE VALUE. The digit card darkens WHOLE CELLS.
     4. NEVER NAME THE CLUE, NEVER ANNOUNCE THE SURVIVORS, NEVER GRADE.
        No < or > glyph, no "even"/"odd" wording, no survivor count, no
        timer, no tries counter. An evicted marker is a fact about the
        field: never red, never ticked, never ranked, never tallied — and
        the LAST marker standing gets no treatment whatsoever, because
        the instant the tool acknowledges it, it has delivered a verdict.
   ⚠ ONE ACCEPTED COST, RECORDED SO A LATER PANEL DOES NOT "FIX" IT: the
   family toggles are named positionally ("kind of card 3"), so a blind
   TEACHER cannot tell them apart. Two panels argued the concealment
   discipline is aimed at the class, not at her, and they have a point.
   It stays positional because the six rule-names would then live in
   eleven shipped locale files, one leak path from the children. She can
   run the whole instrument; all six kinds are on by default.

   ⚠ THE REPERTOIRE CARRIES NO AUTHORED TEXT, and that is the moat made
   mechanical. A board is a range and a clue list; the number it leaves
   and the three candidates it closes on are both DERIVED. Validity is
   ARITHMETIC, so the library is machine-grown and machine-proven — 60
   boards became 373, every one of them ≥4 cards, ≥3 kinds of card, ≥3
   numbers alight at the close, and carrying a valid closing choice.

   ⚠ NO SPEECH, DELIBERATELY. LCSAudio never calls getVoices() and
   silently substitutes a missing voice; TTS is reliable in 5 of 11
   locales. This tool is legible with the sound off.
   ===================================================================== */

var NumberSieve = {
  id: 'number-sieve',

  /* ---------------------------------------------------------------
     STRINGS. EN is authored; the ten others are builder drafts to be
     REBUILT (never translated) by their native panels per §A.13.48 via
     apply-number-sieve-locales.js. [NSR-FLAG] sv/da/no/fi.
     ⚠ Nothing here may name a clue family, and nothing here may carry a
     digit — the tool never counts (gate N11).
     --------------------------------------------------------------- */
  strings: {
    title:        { en: "The Number Sieve", de: "Das Zahlensieb", fr: "La grille qui s’éteint", es: "El colador de números", pt: "A peneira dos números", it: "Il setaccio dei numeri", nl: "De getallenzeef", sv: "Talsållet", da: "Talsien", no: "Tallsilen", fi: "Lukuseula" },
    instruction:  { en: "Now turn a card and watch the field.", de: "Dreht jetzt eine Karte um und schaut, welche Zahlen erlöschen.", fr: "Retournez une carte, puis regardez ce qui s’éteint.", es: "Coloquen su ficha en el número que creen que va a quedar. Luego volteen una tarjeta y miren la cuadrícula.", pt: "Cada um coloca sua ficha no número que acha que é. Depois virem uma carta e vejam quais números saíram.", it: "Ora girate una carta e guardate il tabellone. Da qui il segnalino resta dov’è.", nl: "Draai nu een kaart om en kijk goed naar het veld.", sv: "Nu ligger brickan. Vänd ett kort och titta på fältet.", da: "Nu ligger brikken. Vend et kort, og hold øje med feltet.", no: "Nå ligger brikken. Snu et kort, og følg med på feltet.", fi: "Nappula on paikallaan. Käännä kortti ja katso ruudukkoa." },
    tryAnother:   { en: "Turn the cards in another order.", de: "Dreht die Karten in einer anderen Reihenfolge um.", fr: "Reprenez les mêmes cartes dans un autre ordre.", es: "Volteen las tarjetas en otro orden.", pt: "Virem as cartas em outra ordem.", it: "Girate le carte in un altro ordine e guardate che cosa resta acceso.", nl: "Draai de kaarten eens in een andere volgorde om.", sv: "Vänd korten i en annan ordning.", da: "Vend kortene i en anden rækkefølge.", no: "Snu kortene i en annen rekkefølge.", fi: "Käännä kortit toisessa järjestyksessä." },
    fieldLabel:   { en: "Field", de: "Zahlenfeld", fr: "La grille des nombres", es: "Cuadrícula", pt: "Quadro numérico", it: "Tabellone", nl: "Getallenveld", sv: "Talfältet", da: "Talfeltet", no: "Tallfeltet", fi: "Lukuruudukko" },
    pickHint:     { en: "Tap a number to make a new set of cards.", de: "Tippt eine Zahl an, dann gibt es neue Karten.", fr: "Touchez un nombre pour construire de nouvelles cartes autour de lui.", es: "Toquen un número para armar tarjetas nuevas.", pt: "Toquem em um número para montar cartas novas.", it: "Toccate un numero per avere carte nuove.", nl: "Tik op een getal voor nieuwe kaarten.", sv: "Tryck på ett tal för att få nya kort.", da: "Tryk på et tal for at få nye kort.", no: "Trykk på et tall for å få nye kort.", fi: "Napauta lukua, niin saat uudet kortit." },
    parkHint:     { en: "Tap a number to park your marker.", de: "Tippt eine Zahl an und legt euer Plättchen darauf.", fr: "Posez votre pion sur un nombre. Ensuite, on n’y touche plus.", es: "Toquen un número para colocar su ficha.", pt: "Toquem em um número para colocar a ficha.", it: "Toccate un numero per mettere il segnalino.", nl: "Leg je fiche neer: tik op een getal.", sv: "Tryck på ett tal och lägg din bricka där.", da: "Tryk på et tal, og sæt din brik der.", no: "Trykk på et tall, og sett brikken din der.", fi: "Napauta lukua ja aseta nappulasi siihen." },
    newSet:       { en: "New cards", de: "Neue Karten", fr: "Nouvelles cartes", es: "Tarjetas nuevas", pt: "Cartas novas", it: "Carte nuove", nl: "Nieuwe kaarten", sv: "Nya kort", da: "Nye kort", no: "Nye kort", fi: "Uudet kortit" },
    shuffleBtn:   { en: "Shuffle the cards", de: "Karten mischen", fr: "Mélanger les cartes", es: "Mezclar las tarjetas", pt: "Embaralhar", it: "Mescola le carte", nl: "Kaarten schudden", sv: "Blanda korten", da: "Bland kortene", no: "Stokk kortene", fi: "Sekoita kortit" },
    startAgain:   { en: "Start again", de: "Neu anfangen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Começar de novo", it: "Ricomincia", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" },
    libraryBtn:   { en: "The library", de: "Die Kartei", fr: "La bibliothèque", es: "La colección", pt: "A coleção", it: "La raccolta", nl: "De kaartenbak", sv: "Kortlådan", da: "Samlingen", no: "Samlingen", fi: "Kokoelma" },
    printBtn:     { en: "Print the field", de: "Zahlenfeld drucken", fr: "Imprimer la grille", es: "Imprimir la cuadrícula", pt: "Imprimir o quadro", it: "Stampa il tabellone", nl: "Getallenveld afdrukken", sv: "Skriv ut fältet", da: "Udskriv feltet", no: "Skriv ut feltet", fi: "Tulosta ruudukko" },
    /* ⚠ REWORDED BECAUSE PRINTING IS NO LONGER PAID. The child's field
       sheet prints for everybody — Ctrl+P reaches whatever is in the DOM,
       so the free visitor's sheet has to be a real one — and only the
       teacher's record and the cut-out card set are built for a
       subscriber. A gate line that claims a free thing is charged for is
       a false sentence about our own product, and the ten panels are
       given this one to audit rather than to translate. */
    gateLine:     { en: "These are not all of them. The full library is part of the Teacher plan.", de: "Sie haben alle freien Runden gesehen – die ganze Kartei gehört zum Lehrkraft-Abo.", fr: "Il existe d’autres grilles que celles-ci. La bibliothèque complète fait partie de l’abonnement Enseignant.", es: "Hay más rondas de las que se ven aquí. La colección completa es parte del plan Docente.", pt: "Ainda há muito mais. A coleção completa faz parte do plano Professor.", it: "C’è molto altro. La raccolta completa fa parte del piano Insegnante.", nl: "Er zijn meer kaarten dan deze. De hele kaartenbak hoort bij het Leerkracht-abonnement — zelf kaarten maken blijft gratis.", sv: "Det finns fler kort än de här. Hela kortlådan ingår i Lärarabonnemanget — att bygga egna är alltid gratis.", da: "Der er flere opstillinger end dem her. Hele samlingen er en del af Lærerabonnementet.", no: "Det finnes flere oppsett enn disse. Hele samlingen er en del av Lærerabonnementet.", fi: "Näiden lisäksi on muitakin asetelmia. Koko kokoelma kuuluu Opettajatilaukseen." },
    unlock:       { en: "See the Teacher plan", de: "Zum Lehrkraft-Abo", fr: "Voir l’abonnement Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Vedi il piano Insegnante", nl: "Bekijk het Leerkracht-abonnement", sv: "Se Lärarabonnemanget", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettajatilaukseen" },
    cellAria:     { en: "{n}", de: "{n}", fr: "{n}", es: "{n}", pt: "{n}", it: "{n}", nl: "{n}", sv: "{n}", da: "{n}", no: "{n}", fi: "{n}" },
    cellOutAria:  { en: "{n}, out", de: "{n}, erloschen", fr: "{n}, éteint", es: "{n}, apagado", pt: "{n}, fora", it: "{n}, fuori", nl: "{n}, eruit", sv: "{n}, borta", da: "{n}, slukket", no: "{n}, slukket", fi: "{n}, poissa" },
    markerAria:   { en: "a marker is on {n}", de: "euer Plättchen liegt auf {n}", fr: "un pion est sur {n}", es: "hay una ficha en {n}", pt: "ficha no número {n}", it: "segnalino sul numero {n}", nl: "er ligt een fiche op {n}", sv: "en bricka ligger på {n}", da: "der står en brik på {n}", no: "det står en brikke på {n}", fi: "nappula on luvun {n} kohdalla" },
    cardAria:     { en: "clue card {i}", de: "Hinweiskarte {i}", fr: "carte-indice {i}", es: "tarjeta de pista {i}", pt: "carta de pista {i}", it: "carta indizio {i}", nl: "aanwijzingskaart {i}", sv: "ledtrådskort {i}", da: "ledetrådskort {i}", no: "sporkort {i}", fi: "vihjekortti {i}" },
    /* ⚠ EN ONLY UNTIL THE TEN PANELS LAND, AND THAT IS DELIBERATE. Gate
       N11 fails loudly on a missing locale, so the gate is the reminder
       and there is no way to ship English into ten locales by forgetting.
       ⚠ EVERY ARIA KEY BELOW IS POSITIONAL. `familyAria` says "kind of
       card {i}", never the family's name — an a11y path that named the
       clue would hand a screen-reader user the one thing the sighted
       class is still working out, which is refusal 4. */
    familyLabel:  { en: "Which cards to use", de: "Kartenarten", fr: "Types de cartes", es: "Clases de tarjeta que se usan", pt: "Tipos de cartas", it: "Tipi di carte", nl: "Welke kaarten", sv: "Vilka kort", da: "Slags kort", no: "Slags kort", fi: "Korttilajit" },
    familyAria:   { en: "kind of card {i}", de: "Kartenart {i}", fr: "type de carte {i}", es: "clase de tarjeta {i}", pt: "tipo de carta {i}", it: "tipo di carte {i}", nl: "kaartsoort {i}", sv: "korttyp {i}", da: "slags kort {i}", no: "slags kort {i}", fi: "korttilaji {i}" },
    lengthLabel:  { en: "How many cards, roughly", de: "Ungefähre Anzahl der Karten", fr: "Nombre de cartes souhaité", es: "Cantidad aproximada de tarjetas", pt: "Mais ou menos quantas cartas", it: "Più o meno quante carte", nl: "Ongeveer hoeveel kaarten", sv: "Ungefär hur många kort", da: "Cirka hvor mange kort", no: "Omtrent hvor mange kort", fi: "Suunnilleen montako korttia" },
    lengthAria:   { en: "about {i} cards", de: "ungefähr {i} Karten", fr: "environ {i} cartes", es: "unas {i} tarjetas", pt: "cerca de {i} cartas", it: "circa {i} carte", nl: "ongeveer {i} kaarten", sv: "ungefär {i} kort", da: "cirka {i} kort", no: "omtrent {i} kort", fi: "noin {i} korttia" },
    spareLabel:   { en: "Choose the last card", de: "Die letzte Karte auswählen", fr: "Choisir la dernière carte", es: "La última tarjeta: tres para elegir", pt: "Escolher a última carta", it: "Scegliere l’ultima carta", nl: "De laatste kaart kiezen", sv: "Välja sista kortet", da: "Vælg det sidste kort", no: "Velg det siste kortet", fi: "Valitse viimeinen kortti" },
    spareAria:    { en: "candidate {i} of three", de: "Karte {i} von drei", fr: "carte {i} sur trois", es: "última tarjeta, opción {i} de tres", pt: "carta {i} de três", it: "carta {i} di tre", nl: "kaart {i} van drie", sv: "kort {i} av tre", da: "kort {i} af tre", no: "kort {i} av tre", fi: "kortti {i} kolmesta" },
    /* names the GOAL, never a rule — which is the line the whole tool
       is drawn along */
    spareHint:    { en: "Which card would leave just one number lit?", de: "Nach welcher Karte leuchtet nur noch eine Zahl?", fr: "Laquelle ne laisserait qu’un seul nombre allumé ?", es: "¿Cuál dejaría un solo número encendido?", pt: "Qual delas deixaria só um número aceso?", it: "Quale lascerebbe acceso un numero solo?", nl: "Met welke kaart blijft er precies één getal over?", sv: "Vilket kort lämnar bara ett tal kvar?", da: "Hvilket kort ville kun lade ét tal stå tilbage?", no: "Hvilket kort ville la bare ett tall stå igjen?", fi: "Mikä kortti jättäisi jäljelle vain yhden luvun?" },
    cardLookAria: { en: "clue card {i}, show what this card alone takes out", de: "Hinweiskarte {i} – zeigen, welche Zahlen sie allein ausschließt", fr: "carte-indice {i} — ce que cette carte éteint à elle seule", es: "tarjeta de pista {i}, volver a ver qué números apaga ella sola", pt: "carta de pista {i}, mostrar o que só ela tira", it: "carta indizio {i}, mostra che cosa spegne da sola", nl: "aanwijzingskaart {i}, laat zien wat alleen deze kaart weghaalt", sv: "ledtrådskort {i} — visa vad bara det här kortet tar bort", da: "ledetrådskort {i}, vis hvad kun dette kort slukker", no: "sporkort {i}, vis hva bare dette kortet slukker", fi: "vihjekortti {i}, näytä mitkä luvut vain tämä kortti ottaa pois" },
    markerOutAria: { en: "the marker leaves {n}", de: "{n} ist erloschen.", fr: "{n} s’éteint, le pion quitte la grille", es: "El {n} se apagó; sale su ficha.", pt: "a ficha sai do número {n}", it: "il segnalino lascia il numero {n}", nl: "{n} is eruit, en daar ligt je fiche", sv: "{n} är borta, och där ligger din bricka", da: "{n} er slukket", no: "{n} er slukket", fi: "{n} on poissa" },
    saveBtn:      { en: "Keep these cards", de: "Runde aufheben", fr: "Garder ces cartes", es: "Guardar esta ronda", pt: "Guardar estas cartas", it: "Salva queste carte", nl: "Bewaar deze kaarten", sv: "Spara de här korten", da: "Gem denne opstilling", no: "Ta vare på dette oppsettet", fi: "Tallenna tämä asetelma" },
    savedBtn:     { en: "Kept", de: "Aufgehoben", fr: "Gardées", es: "Guardada", pt: "Guardado", it: "Salvato", nl: "Bewaard", sv: "Sparat", da: "Gemt", no: "Tatt vare på", fi: "Tallennettu" },
    gateSave:     { en: "Keeping the cards you build is part of the Teacher plan — building them is always free.", de: "Eigene Runden können Sie im Lehrkraft-Abo aufheben – bauen bleibt immer kostenlos.", fr: "Garder vos propres cartes fait partie de l’abonnement Enseignant : les construire est toujours gratuit.", es: "Guardar sus rondas es parte del plan Docente; armarlas siempre es gratis.", pt: "Guardar suas cartas faz parte do plano Professor — montá-las é sempre grátis.", it: "Salvare le tue carte fa parte del piano Insegnante — prepararle è sempre gratis.", nl: "Je eigen kaarten bewaren hoort bij het Leerkracht-abonnement — zelf kaarten maken blijft altijd gratis.", sv: "Att spara egna kort ingår i Lärarabonnemanget — att bygga dem är alltid gratis.", da: "At gemme dine egne opstillinger er en del af Lærerabonnementet — at bygge dem er altid gratis.", no: "Å ta vare på egne oppsett er en del av Lærerabonnementet — å bygge dem er alltid gratis.", fi: "Omien asetelmien tallentaminen kuuluu Opettajatilaukseen — niiden rakentaminen on aina ilmaista." },
  },

  STORE_KEY: 'lcs:number-sieve:v1',
  ENT_TRUST_DAYS: 14,

  defaults: {},
  settings: [],

  premium: false,
  premiumKnown: false,

  /* The three fields. ⚠ REFUSAL 2: width is BOUND TO THE RANGE. There is
     no columns control, so nothing here can reset the field and the
     Hundred Field's thesis stays its own. */
  FIELDS: [20, 100, 120],
  COLS: { 20: 10, 100: 10, 120: 10 },
  DEFAULT_FIELD: 20,

  MAX_CARDS: 6,

  /* =================================================================
     THE MODEL — pure, total, immutable. Nothing here touches the DOM,
     reads a locale, or calls Math.random / Date.
     ================================================================= */

  /* ⭐ MARKERS ARE PLURAL, AND THAT IS A PEDAGOGICAL DECISION, NOT A
     FEATURE. With one marker, one child commits and twenty-five watch
     somebody else's guess — which made this the most passive instrument
     in the catalog. With a marker per table the evictions happen at
     DIFFERENT moments, and that staggering IS the conversation: "ours
     went out on card two and yours is still in — why?" is a better
     question than the tool could manufacture any other way, and the
     material produces it unaided.
     ⚠ AND THE RISK IS REAL, SO THREE RULES ARE STRUCTURAL. Five markers
     with three evicted is a tally whether or not a number is drawn, and
     the last one standing is a winner. So: they differ by SHAPE, never by
     colour (colours become teams); they are never counted, ordered or
     listed; and the last survivor gets NO treatment whatsoever — it
     simply happens to sit on the one cell still lit. The instant the tool
     acknowledges it, it has delivered a verdict, and that is the line. */
  MAX_MARKERS: 6,

  newState: function () {
    return {
      field: this.DEFAULT_FIELD,
      clues: [],        /* the deck, in the order it will be turned */
      turned: 0,        /* how many have been turned; only ever grows */
      target: null,     /* the number the deck isolates */
      markers: [],      /* the committed guesses, in the order parked */
      spares: [],       /* the three closing candidates; exactly one closes */
      chosen: -1,       /* which spare the class picked, or -1 */
      emblems: [],      /* each card's identity, travelling with the card */
      committed: false  /* true once the first card has been turned */
    };
  },

  _clone: function (st) {
    var s = st || this.newState();
    return {
      field: s.field,
      clues: s.clues.slice(),
      turned: s.turned,
      target: s.target,
      markers: (s.markers || []).slice(),
      spares: (s.spares || []).slice(),
      chosen: (typeof s.chosen === 'number') ? s.chosen : -1,
      emblems: (s.emblems || []).slice(),
      committed: !!s.committed
    };
  },

  /* ⭐⭐ EVERY CARD CARRIES AN IDENTITY THAT SURVIVES A SHUFFLE, AND
     WITHOUT IT THE HEADLINE INVENTION IS NOT OBSERVABLE AT ALL.
     `shuffle` rotates the deck and the backs were numbered 1..n by
     POSITION, so four teal cards reading 1 2 3 4 became four teal cards
     reading 1 2 3 4 — byte-identical to "New cards" dealing a completely
     different deck. The one thing the class is supposed to notice —
     *these are the same four cards in another order, and the survivors
     did not move* — was invisible on screen. Now the ordinal (turn
     order) changes while the emblem (which card this is) does not, so a
     shuffle visibly re-orders the SAME deck, exactly as a real one does.
     ⚠ ASSIGNED BY DEAL POSITION, NEVER DERIVED FROM THE FAMILY. An
     emblem that could be read back to a clue family would name the clue,
     which is refusal 4. A mutation makes the emblem family-derived, and
     the gate must kill it. */
  _freshEmblems: function (n) {
    var out = [], i;
    for (i = 0; i < n; i++) out.push(i % this.EMBLEMS);
    return out;
  },
  EMBLEMS: 6,

  /* ---- the six clue families ------------------------------------
     Every clue is a pure predicate over the integers. `satisfies`
     returns TRUE for the numbers that SURVIVE the card.
     ⚠ TOTAL AND CLAMPING: hostile input returns a boolean, never
     throws. The one function in this file that throws by design is
     `targetOf`, and it throws to stop a leak. */
  satisfies: function (clue, n) {
    if (!clue || typeof clue !== 'object') return true;
    /* ⚠ STRICT, because Number(null) is 0 and Number([]) is 0. The first
       cut coerced, so `null` quietly satisfied "at most five" by being
       treated as zero — a value that is not on the field surviving a card
       that is. A thing that is not a number survives nothing. */
    if (typeof n !== 'number' || !isFinite(n)) return false;
    n = Math.round(n);
    var f = clue.f;
    if (f === 'range') {
      if (clue.op === 'ge') return n >= clue.a;
      if (clue.op === 'le') return n <= clue.a;
      return true;
    }
    if (f === 'parity') {
      return ((n % 2) + 2) % 2 === (clue.r ? 1 : 0);
    }
    if (f === 'multiple') {
      var m = clue.m;
      if (!m) return true;
      var hit = (n % m) === 0;
      return clue.keep ? hit : !hit;
    }
    if (f === 'digit') {
      var d = (clue.place === 'tens') ? Math.floor(Math.abs(n) / 10) % 10 : Math.abs(n) % 10;
      var same = d === clue.d;
      return clue.keep ? same : !same;
    }
    if (f === 'quantity') {
      if (clue.op === 'lt') return n < clue.q;
      return n > clue.q;
    }
    if (f === 'nearer') {
      /* equidistant survives neither — the midpoint is honestly not
         nearer to either anchor */
      return Math.abs(n - clue.a) < Math.abs(n - clue.b);
    }
    return true;
  },

  allNumbers: function (field) {
    var f = Math.round(Number(field));
    if (!isFinite(f) || f < 1) f = this.DEFAULT_FIELD;
    if (f > 120) f = 120;
    var out = [], i;
    for (i = 1; i <= f; i++) out.push(i);
    return out;
  },

  /* Sequential fold, exactly as the board is played. Written as a fold
     rather than a set-intersection ON PURPOSE: it is the shape a
     stateful bug would live in, and N3 proves every permutation of the
     deck lands on the same survivors. */
  survivorsAfter: function (st, k) {
    var s = st || this.newState();
    var live = this.allNumbers(s.field);
    var upto = Math.max(0, Math.min(k === undefined ? s.turned : k, s.clues.length));
    var i, j, next;
    for (i = 0; i < upto; i++) {
      next = [];
      for (j = 0; j < live.length; j++) {
        if (this.satisfies(s.clues[i], live[j])) next.push(live[j]);
      }
      live = next;
    }
    return live;
  },

  survivors: function (st) { return this.survivorsAfter(st, (st || {}).turned); },

  /* ⚠ THE ONLY THROWING ACCESSOR, and it exists to stop a leak. The
     target is unreachable until every card has been turned — the
     estimation-jar `revealedCount` pattern (:152-160). No render path
     may call this; gate N9 proves the cell path cannot even see it. */
  targetOf: function (st) {
    var s = st || {};
    if (!s.clues || !s.clues.length || s.turned < s.clues.length) {
      throw new Error('the number is not available until every card has been turned');
    }
    return s.target;
  },

  turn: function (st) {
    var s = this._clone(st);
    if (s.turned >= s.clues.length) return s;
    s.turned += 1;
    s.committed = true;   /* the marker is committed from the first card */
    return s;
  },

  park: function (st, n) {
    var s = this._clone(st);
    /* ⚠ INVENTION 3: committed means committed. Once a card has turned no
       marker can move, so an eviction is a fact about the field rather
       than a change of mind. */
    if (s.committed) return s;
    var v = Math.round(Number(n));
    if (!isFinite(v) || v < 1 || v > s.field) return s;
    var at = s.markers.indexOf(v);
    /* tapping a parked cell lifts it again — before the first card a
       table may still be arguing, and refusing that would be pedantry
       rather than commitment */
    if (at > -1) { s.markers.splice(at, 1); return s; }
    /* ⚠ TWO MARKERS MAY NOT SHARE A CELL. Without this the tables
       converge on one number and the disagreement — the entire reason
       for having more than one — quietly disappears. The array holding
       distinct values is what makes it unrepresentable. */
    if (s.markers.length >= this.MAX_MARKERS) return s;
    s.markers.push(v);
    return s;
  },

  /* every marker still standing after `turned` cards. Used by the render
     and by the announcement, never to rank anything. */
  markersAlive: function (st) {
    var s = st || this.newState(), live = this.survivors(s), out = [], i;
    for (i = 0; i < s.markers.length; i++) if (live.indexOf(s.markers[i]) > -1) out.push(s.markers[i]);
    return out;
  },

  setField: function (st, field) {
    var s = this._clone(st);
    var f = Math.round(Number(field));
    if (this.FIELDS.indexOf(f) === -1) return s;
    if (f === s.field) return s;
    s.field = f;
    s.clues = [];
    s.turned = 0;
    s.target = null;
    s.markers = [];
    s.spares = [];
    s.chosen = -1;
    s.committed = false;
    return s;
  },

  /* Deck order is a rotation of the authored order — deterministic, no
     Math.random anywhere in the model (gate N14). Rotating cannot change
     the survivors, which is exactly the property invention 2 rests on. */
  /* ⚠⚠ SHUFFLING DOES NOT UN-COMMIT THE MARKER, AND THE SHIPPED BUILD DID.
     Measured on the old model: park 7, turn a card, park(9) is correctly
     refused — then shuffle, and park(9) SUCCEEDS. By then the class has
     watched the whole deck and knows the answer, so the one control that
     invites a second run was handing them permission to move the marker
     onto it. That destroys BOTH inventions at once: invention 3, because
     a marker you may move after seeing the answer was never committed;
     and invention 2, because "the survivors are identical whatever the
     order" is only worth watching if the guess it evicts stood still.
     N3b checked the survivors and N10 checked commitment within one run;
     neither looked across a shuffle, which is exactly where it broke. */
  /* ⚠⚠ THE SHUFFLE ROTATES THE CARDS BEFORE THE CLOSER, NOT THE WHOLE
     DECK — and the order-invariance gate is what drove me to this.
     Rotating everything changes WHICH card is held back for the closing
     choice, and a different held-back card may admit no valid choice at
     all: the gate ran a deck, shuffled, ran it again and found the
     second run had resolved to one number by itself because the board
     had quietly lost its three candidates.
     Holding the closer and rotating the head is provably safe rather
     than merely tested. The survivors after the first n-1 cards are the
     INTERSECTION of those cards, and an intersection does not care about
     order — so the penultimate width cannot move, the candidates stay
     valid, and what the class is invited to test ("the same cards in
     another order leave the same numbers") is exactly what now happens.
     The generator needed the identical insight for its legibility
     re-ordering; it is the same theorem twice. */
  shuffle: function (st) {
    var s = this._clone(st);
    if (s.clues.length < 2) return s;
    /* ⚠ THE FACE-DOWN RESET IS UNCONDITIONAL; ONLY THE ROTATION IS NOT.
       Guarding the whole function on a deck long enough to rotate meant
       a two-card deck answered the Shuffle chip by doing nothing at all
       — the cards stayed face up. A deck too short to re-order can still
       be turned over, and the gate said so. */
    var n = s.clues.length;
    if (n >= 3) {
      var head = s.clues.slice(0, n - 1), tail = s.clues.slice(n - 1);
      s.clues = head.slice(1).concat(head.slice(0, 1)).concat(tail);
      if (s.emblems.length === n) {
        var eh = s.emblems.slice(0, n - 1), et = s.emblems.slice(n - 1);
        s.emblems = eh.slice(1).concat(eh.slice(0, 1)).concat(et);
      }
    } else {
      s.clues = s.clues.slice(1).concat(s.clues.slice(0, 1));
      if (s.emblems.length === n) s.emblems = s.emblems.slice(1).concat(s.emblems.slice(0, 1));
    }
    /* ⚠ THE EMBLEMS ROTATE IN LOCKSTEP WITH THE CLUES — inside the two
       branches above, and NOWHERE ELSE. A second, unconditional rotation
       survived here when this function was rewritten, so the emblems
       were rotated twice on two different splits and came out scrambled
       ([0,1,2,3,4,5] became [2,3,4,0,5,1] instead of [1,2,3,4,0,5]).
       The gate caught it as "the emblem is a second ordinal, not an
       identity", which is exactly what a double rotation makes it. */
    s.turned = 0;
    s.chosen = -1;
    /* The closer is held fixed above, so the candidates derived for it
       remain valid — this re-derivation is belt-and-braces rather than
       load-bearing, and it keeps the state coherent if the rotation rule
       is ever widened again. */
    s.spares = this._deriveSpares(s.field, s.clues);
    return s;
  },

  /* ⚠ "START AGAIN" MUST START THIS BOARD AGAIN. The shipped `reset()`
     called `newState()` and then loaded library board 0 — so a teacher
     three boards into the library, or on a board she had just built with
     "New cards", lost it; and because `newState()` also restores
     DEFAULT_FIELD she was thrown from 1-120 back to 1-20 as well. The
     tool's own header records fixing exactly this class of defect for
     "New cards" — *a control must do what its LABEL says* — and the
     adjacent control had it too. The shell's Reset routes here, so this
     is also what its circular arrow now means. */
  restart: function (st) {
    var s = this._clone(st);
    s.turned = 0;
    s.markers = [];
    s.chosen = -1;
    s.committed = false;
    return s;
  },

  /* =================================================================
     ⭐ THE THREE SPARES — the move the catalog always named and the tool
     could never make.

     The catalog's own statement of what this instrument is for ends on a
     question: "with three still alight, what would a card have to take
     away to leave just one?" The shipped tool cannot let a class ANSWER
     that. Worse, the card that answers it is the one card whose action
     is unreadable — a card acting on two or three numbers removes a cell
     and the class sees a flicker, not a pattern. So the thesis holds for
     every card except the one the class cares about.

     Both are the same defect, and one move fixes both. At the last card
     the tool does not offer card n. It offers THREE face-up candidates,
     exactly one of which closes. The class argues, picks, and the chosen
     card acts. Wrong pick? Then two numbers are still lit and the other
     spares are still there. The material said no; nobody said anything.

     ⚠ THE OBVIOUS OBJECTION IS THAT A FACE-UP CARD STATES A RULE. It does
     not: the faces are wordless, and by the last card the class has spent
     three cards EARNING the icon vocabulary by watching it enacted. Cards
     1..n-1 teach the language; the spares ask them to use it. That
     completes invention 1 instead of contradicting it, and it is the only
     moment in the tool that asks a child to run a clue FORWARDS.

     Every refusal survives: no rule is named, nothing is counted, and a
     non-isolating spare is not WRONG — it leaves two numbers lit, which
     is a fact about the field. The two losers are treated identically to
     the winner, before and after.

     ⚠ CONSTRUCTIBILITY WAS MEASURED, NOT ASSUMED: over every board that
     reaches the floor, 125 of 125 admit an isolator plus two decoys with
     distinct residues. Zero failures.
     ================================================================= */

  /* Deal the spares for a deck's closing card. Deterministic; the rot
     walks equally-good decoys the same way the search walks keepers. */
  sparesFor: function (field, clues, rot) {
    var cl = clues || [];
    if (cl.length < 2) return null;
    var opened = cl.slice(0, cl.length - 1);
    var all = this.allNumbers(field), live = [], i, j, ok;
    for (i = 0; i < all.length; i++) {
      ok = true;
      for (j = 0; j < opened.length; j++) if (!this.satisfies(opened[j], all[i])) { ok = false; break; }
      if (ok) live.push(all[i]);
    }
    if (live.length < this.MIN_PENULTIMATE) return null;
    var t = null;
    for (i = 0; i < live.length; i++) {
      ok = this.satisfies(cl[cl.length - 1], live[i]);
      if (ok) { if (t !== null) return null; t = live[i]; }
    }
    if (t === null) return null;

    var uni = this.universe(field), masks = [], k;
    for (k = 0; k < opened.length; k++) masks.push(this._maskOf(all, opened[k]));
    var r = Math.round(Number(rot)) || 0;
    if (r) { r = ((r % uni.length) + uni.length) % uni.length; uni = uni.slice(r).concat(uni.slice(0, r)); }

    var closer = null, decoys = [], seenRes = {};
    for (k = 0; k < uni.length; k++) {
      var res = [], m;
      for (m = 0; m < live.length; m++) if (this.satisfies(uni[k], live[m])) res.push(live[m]);
      /* a spare that takes nothing, or takes everything, is not a
         candidate — it is a card nobody could argue about */
      if (res.length === live.length || res.length === 0) continue;
      /* ⚠ AND IT MAY NOT BE IMPLIED BY A CARD ALREADY ON THE TABLE, or
         the class can eliminate it without thinking about the field —
         which is the one thing the move exists to make them do. */
      if (this._comparableWithAny(this._maskOf(all, uni[k]), masks)) continue;
      if (res.length === 1 && res[0] === t) { if (!closer) closer = uni[k]; continue; }
      if (res.length < 2) continue;
      /* residues must be pairwise DISTINCT or two spares are the same
         move wearing two faces, and the choice is not a real one */
      var key = res.join(',');
      if (seenRes[key]) continue;
      seenRes[key] = 1;
      if (decoys.length < 2) decoys.push(uni[k]);
    }
    if (!closer || decoys.length < 2) return null;
    return [closer, decoys[0], decoys[1]];
  },

  /* ⚠ THE SPARES ARE DERIVED FROM THE DECK, NEVER STORED — the same
     discipline as `target`, for the same two reasons. Stored spares could
     disagree with the cards they belong to, and a stored closer would put
     the answer in a public JSON file. Deriving makes both unrepresentable
     and keeps the 307-board library free of a single extra field. */
  /* the one call site for both halves — derive, then deal into an order
     the closer's position cannot be read off */
  _deriveSpares: function (field, clues) {
    var sp = this.sparesFor(field, clues, 0);
    if (!sp) return [];
    return this.dealSpares(sp, this._deckSeed(clues));
  },

  _deckSeed: function (clues) {
    var cl = clues || [], n = 0, i, s, j;
    for (i = 0; i < cl.length; i++) {
      s = JSON.stringify(cl[i]);
      for (j = 0; j < s.length; j++) n = (n * 31 + s.charCodeAt(j)) % 100003;
    }
    return n;
  },

  /* ⚠ THE CLOSER IS NEVER FIRST. `sparesFor` returns it first because
     that is how it is proved; the board deals them in an order derived
     from the deck itself, so the winner's POSITION carries no
     information. A class that learns "it is always the left one" has
     learned nothing about number. */
  dealSpares: function (spares, seed) {
    var sp = (spares || []).slice();
    if (sp.length !== 3) return sp;
    var k = ((Math.round(Number(seed)) || 0) % 3 + 3) % 3;
    return sp.slice(3 - k).concat(sp.slice(0, 3 - k));
  },

  /* Which spare closes, given the deck it belongs to. Derived, never
     stored — the same discipline as `target`. */
  closingSpare: function (st) {
    var s = st || this.newState();
    if (!s.spares || s.spares.length !== 3) return -1;
    var i, res;
    for (i = 0; i < 3; i++) {
      res = this._afterSpare(s, i);
      if (res.length === 1) return i;
    }
    return -1;
  },

  _afterSpare: function (st, i) {
    var s = st || this.newState();
    var live = this.survivorsAfter(s, Math.max(0, s.clues.length - 1));
    var sp = s.spares && s.spares[i];
    if (!sp) return live;
    var out = [], j;
    for (j = 0; j < live.length; j++) if (this.satisfies(sp, live[j])) out.push(live[j]);
    return out;
  },

  /* The class picks. Nothing is graded; the field simply does what the
     card says. Picking again is allowed — a spare that left two numbers
     lit did not end the routine. */
  chooseSpare: function (st, i) {
    var s = this._clone(st);
    if (!s.spares || s.spares.length !== 3) return s;
    if (s.turned < s.clues.length - 1) return s;
    var k = Math.round(Number(i));
    if (!isFinite(k) || k < 0 || k > 2) return s;
    s.chosen = k;
    s.turned = s.clues.length - 1;
    s.committed = true;
    return s;
  },

  /* what is standing right now, spare included */
  visibleSurvivors: function (st) {
    var s = st || this.newState();
    if (s.spares && s.spares.length === 3 && s.chosen > -1) return this._afterSpare(s, s.chosen);
    return this.survivors(s);
  },

  /* ---- the clue universe + the builder --------------------------- */

  /* ⚠ THE BOUNDS SNAP TO A COARSE GRID, AND THAT IS APPARATUS DESIGN, NOT
     A SEARCH TWEAK. With free bounds the builder found "at most 37" and
     "at least 37" — a two-card pincer that does not narrow anything, it
     simply says the number out loud, which is the one thing this tool
     exists not to do. A magnitude card is a shaded BAND, and a band lands
     on a decade. The dot card is likewise capped at what a class can
     actually subitise off a projector: you cannot show eighty-seven dots.
     Both limits make the degenerate move unrepresentable rather than
     merely unlikely. */
  COARSE: function (field) { return this.allNumbers(field).length <= 20 ? 5 : 10; },
  MAX_DOTS: 20,

  /* The six families, in the order the toggle row shows them. A wordless
     control (§FAMILY TOGGLES) filters the universe by this list, so a
     teacher can aim the instrument at today's mathematics without a word
     appearing anywhere. */
  FAMILIES: ['parity', 'multiple', 'digit', 'range', 'quantity', 'nearer'],

  /* ⚠ A TENS-DIGIT CARD IS ONLY LEGAL WHERE ITS SET IS ONE UNBROKEN RUN,
     AND THE RULE IS DERIVED RATHER THAN LISTED. On a ten-column field a
     tens digit IS a row, and that geometry is the single cleanest
     place-value demonstration in the tool — but the modulus wraps at the
     hundred, so on the 1-120 field d=1 keeps 10-19 AND 110-119: two
     disconnected bands, which is a lovely Grade-3 insight and reads as
     "the tool did something arbitrary" on a Grade-1 board.
     ⚠ COMPUTED, NOT HARDCODED. The pedagogy panel proposed excluding
     d in {0,1} on the 120 field; measuring the actual sets shows that
     misses d=2 on the 1-120 field (20-29 plus 120) AND d=0 on the 1-100
     field (1-9 plus 100). A derived predicate catches the class; a list
     catches the two examples somebody happened to think of. */
  _tensRunsUnbroken: function (field, d) {
    var f = this.allNumbers(field).length, prev = null, seen = false, n, t;
    for (n = 1; n <= f; n++) {
      t = Math.floor(n / 10) % 10;
      if (t !== d) continue;
      if (seen && n !== prev + 1) return false;
      seen = true; prev = n;
    }
    return seen;
  },

  /* `only` is an optional array of family names. Absent or empty means
     every family, so every existing caller is unchanged.
     ⚠ `cleanTens` DROPS the wrapping tens-digit cards, and it is a
     PREFERENCE rather than a removal — which the gate taught me. Taking
     them out of the universe outright cost exactly one target (1 on the
     1-120 field became unbuildable), and a tool that cannot make a board
     for a number a teacher taps is broken for that number. So the
     builder keeps them and every caller that can afford to asks for the
     clean set first and falls back. The builder guarantees CORRECT; the
     curation chooses INTERESTING. */
  universe: function (field, only, cleanTens) {
    var f = this.allNumbers(field).length, step = this.COARSE(field), out = [], a, b, m, d;
    var pick = (only && only.length) ? only : null;
    var on = function (fam) { return !pick || pick.indexOf(fam) > -1; };
    if (on('range')) {
      for (a = step; a <= f - 1; a += step) { out.push({ f: 'range', op: 'ge', a: a }); out.push({ f: 'range', op: 'le', a: a }); }
    }
    if (on('parity')) {
      out.push({ f: 'parity', r: 0 });
      out.push({ f: 'parity', r: 1 });
    }
    if (on('multiple')) {
      for (m = 2; m <= 5; m++) { out.push({ f: 'multiple', m: m, keep: true }); out.push({ f: 'multiple', m: m, keep: false }); }
      out.push({ f: 'multiple', m: 10, keep: true });
      out.push({ f: 'multiple', m: 10, keep: false });
    }
    if (on('digit')) {
      for (d = 0; d <= 9; d++) {
        out.push({ f: 'digit', place: 'ones', d: d, keep: true });
        out.push({ f: 'digit', place: 'ones', d: d, keep: false });
        if (f > 20 && (!cleanTens || this._tensRunsUnbroken(field, d))) {
          out.push({ f: 'digit', place: 'tens', d: d, keep: true });
          out.push({ f: 'digit', place: 'tens', d: d, keep: false });
        }
      }
    }
    if (on('quantity')) {
      for (a = 2; a <= Math.min(this.MAX_DOTS, f - 1); a++) { out.push({ f: 'quantity', op: 'gt', q: a }); out.push({ f: 'quantity', op: 'lt', q: a }); }
    }
    if (on('nearer')) {
      for (a = step; a <= f - step; a += step) {
        for (b = a + step; b <= f; b += step) out.push({ f: 'nearer', a: a, b: b });
      }
    }
    return out;
  },

  /* Deterministic isolating set, then a drop-one prune — so the result
     passes N4 (minimality) and N5 (uniqueness) BY CONSTRUCTION. This is
     what makes the free builder safe: it can only ever hand a teacher a
     board the gate would accept.

     ⚠ IT NARROWS ON A SCHEDULE, NOT AS FAST AS IT CAN. The first cut was
     greedy-by-strongest-cut and the gate measured what that produces:
     240 decks averaging TWO cards. Every one of them was provably valid
     and none of them was a routine — a class barely sits down before it
     is over. So each card now aims at a geometric step toward one
     (`live^((r-1)/r)`), which is the same arithmetic guarantee with a
     shape a lesson can be built on. Provably valid is not the same as
     worth turning over, and only the measurement showed the difference. */
  AIM_CARDS: 4,

  /* ⚠ THE LADDER, because a schedule-following greedy is myopic. Aiming
     at four cards paints the awkward targets into a corner — 11, 13, 47,
     49, 97, 107 and their friends, all of them numbers a coarse toolkit
     finds hard to pin — and the search simply ran out of non-comparable
     cards. Retrying at other lengths costs nothing, stays deterministic,
     and the gate proves the ladder leaves no target behind. Four first,
     because four is the length that reads as a routine. */
  AIM_LADDER: [4, 3, 5, 2, 6],

  /* ⭐ THE PENULTIMATE FLOOR — the single most important number in this
     file, and it was measured rather than chosen. The shipped library
     ends 2 -> 1 on 44 of its 60 boards: the last card extinguishes ONE
     number, so nothing goes dark in a PATTERN and there is no rule to
     read off it. The tool's whole thesis — the clue is enacted, never
     stated — therefore holds for cards 1..n-1 and structurally CANNOT
     hold for the last one, at the exact moment the class is most
     invested. A coin flip is not the reasoning move the routine is built
     around.
     So the search now refuses to arrive at one from below this floor,
     and aims the second-to-last card AT it. Three alight is the state in
     which every survivor can be named aloud and the answer is still not
     forced — which is where the conversation is. */
  MIN_PENULTIMATE: 3,

  buildFor: function (field, target, want, opts) {
    var i, got;
    if (want) return this._search(field, target, want, opts);
    for (i = 0; i < this.AIM_LADDER.length; i++) {
      got = this._search(field, target, this.AIM_LADDER[i], opts);
      if (got) return got;
    }
    return null;
  },

  /* opts (all optional, all pure — there is still no Math.random and no
     Date anywhere in this file):
       only    array of family names, from the toggle row
       rot     ⭐ a deterministic rotation of the keeper list. The greedy
               is a total order over equally-good cards, so ONE deck per
               (field, target) exists and the library could never exceed
               240 boards however it was curated. Rotating the keepers
               changes which of several equally-good cards is reached
               first and yields genuinely different — equally provable —
               decks. Measured: 351 decks over 141 targets satisfy every
               constraint at once, against 115 without it. This is what
               makes a ~300-board repertoire possible WITHOUT loosening a
               single invariant.
       minPen  the penultimate floor, above. */
  _search: function (field, target, want, opts) {
    var o = opts || {};
    var all = this.allNumbers(field);
    var t = Math.round(Number(target));
    if (all.indexOf(t) === -1) return null;
    var aim = Math.round(Number(want)) || this.AIM_CARDS;
    if (aim < 2) aim = 2;
    if (aim > this.MAX_CARDS) aim = this.MAX_CARDS;
    var floor = Math.round(Number(o.minPen)) || 0;
    if (!isFinite(floor) || floor < 0) floor = 0;
    var uni = this.universe(field, o.only, o.cleanTens), keepers = [], i;
    for (i = 0; i < uni.length; i++) if (this.satisfies(uni[i], t)) keepers.push(uni[i]);
    if (keepers.length > 1) {
      var rot = Math.round(Number(o.rot)) || 0;
      if (isFinite(rot) && rot) {
        rot = ((rot % keepers.length) + keepers.length) % keepers.length;
        keepers = keepers.slice(rot).concat(keepers.slice(0, rot));
      }
    }

    /* ⚠ NO CARD MAY IMPLY ANOTHER — and this is the precise rule, arrived
       at by measuring two wrong ones. Free bounds gave a "at most 37 /
       at least 37" pincer. One-card-per-family fixed that but was too
       blunt: it left 78 targets across the two big fields unbuildable,
       because a tens-digit card and a ones-digit card are genuinely
       different thinking and there is no reason to forbid both. What
       actually causes the collapse is COMPARABILITY: if one card's
       survivors are a subset of another's, the weaker card is redundant
       by construction and the drop-one prune will always take it. So the
       search refuses a card comparable with one already chosen, and
       "at least 30" plus "at most 40" — a band, neither implying the
       other — stays legal. */
    var keeperSets = [], kk;
    for (kk = 0; kk < keepers.length; kk++) keeperSets.push(this._maskOf(all, keepers[kk]));
    var chosenMasks = [];
    var live = all.slice(), chosen = [], guard = 0;
    while (live.length > 1 && chosen.length < this.MAX_CARDS && guard++ < 40) {
      var remaining = Math.max(1, aim - chosen.length);
      var ideal = (remaining <= 1) ? 1
        : Math.max(1, Math.round(Math.pow(live.length, (remaining - 1) / remaining)));
      /* ⭐ THE FLOOR, ENFORCED IN BOTH DIRECTIONS. Refuse to finish from
         below it, and aim the second-to-last card AT it — one without the
         other does nothing: aiming alone still lets the greedy overshoot
         to two, and refusing alone just fails the build. */
      if (floor) {
        if (remaining <= 1 && live.length < floor) return null;
        if (remaining === 2 && ideal < floor) ideal = floor;
      }
      /* ⚠ `off`, never `score`. The gate bans the word outright and it is
         right to: a tool that must never score should not carry the noun
         even as a search heuristic. Renaming the variable keeps the ban
         maximally strict, which loosening the regex would not. */
      var best = null, bestOff = Infinity, k, j, cand, len, off, next;
      var bestMask = null;
      for (k = 0; k < keepers.length; k++) {
        cand = keepers[k];
        if (this._comparableWithAny(keeperSets[k], chosenMasks)) continue;
        len = 0;
        for (j = 0; j < live.length; j++) if (this.satisfies(cand, live[j])) len++;
        /* a card that takes nothing away is a lie on the board */
        if (len >= live.length) continue;
        /* under the floor the closing card must actually close: taking
           three down to two and looping is how a deck arrives at the coin
           flip the floor exists to forbid */
        if (floor && remaining <= 1 && len !== 1) continue;
        off = Math.abs(len - ideal);
        if (off < bestOff) { bestOff = off; best = cand; bestMask = keeperSets[k]; }
      }
      if (!best) break;
      chosenMasks.push(bestMask);
      chosen.push(best);
      next = [];
      for (j = 0; j < live.length; j++) if (this.satisfies(best, live[j])) next.push(live[j]);
      live = next;
    }
    if (live.length !== 1 || live[0] !== t) return null;

    /* drop-one prune — every remaining card must be load-bearing */
    var pruned = chosen.slice();
    for (i = pruned.length - 1; i >= 0; i--) {
      var without = pruned.slice(0, i).concat(pruned.slice(i + 1));
      if (this._isolates(field, without, t)) pruned = without;
    }
    if (!pruned.length) return null;
    /* ⚠ RE-CHECK THE FLOOR AFTER THE PRUNE, NOT BEFORE. The prune removes
       cards, so the deck it returns is a DIFFERENT sequence from the one
       the loop measured — a deck that satisfied the floor on the way in
       can arrive at two on the way out. Checking only inside the loop is
       checking the wrong object. */
    if (floor && this.penultimateWidth(field, pruned) < floor) return null;
    return pruned;
  },

  /* how many numbers the LAST card acts on. A card acting on two cannot
     display a pattern, and a pattern is the only thing this tool ever
     asks the class to read. */
  penultimateWidth: function (field, clues) {
    var cl = clues || [];
    if (cl.length < 1) return 0;
    var all = this.allNumbers(field), n = 0, i, j, ok;
    for (i = 0; i < all.length; i++) {
      ok = true;
      for (j = 0; j < cl.length - 1; j++) if (!this.satisfies(cl[j], all[i])) { ok = false; break; }
      if (ok) n++;
    }
    return n;
  },

  _maskOf: function (all, clue) {
    var m = [], i;
    for (i = 0; i < all.length; i++) m.push(this.satisfies(clue, all[i]));
    return m;
  },

  /* comparable = one survivor set contains the other, in either
     direction. The contained card is redundant the moment both are on
     the board, so the deck must never hold such a pair. */
  _comparableWithAny: function (mask, others) {
    var i, j, aSubB, bSubA, o;
    for (i = 0; i < others.length; i++) {
      o = others[i];
      aSubB = true; bSubA = true;
      for (j = 0; j < mask.length; j++) {
        if (mask[j] && !o[j]) aSubB = false;
        if (o[j] && !mask[j]) bSubA = false;
        if (!aSubB && !bSubA) break;
      }
      if (aSubB || bSubA) return true;
    }
    return false;
  },

  _isolates: function (field, clues, t) {
    var all = this.allNumbers(field), n = 0, only = null, i, j, ok;
    for (i = 0; i < all.length; i++) {
      ok = true;
      for (j = 0; j < clues.length; j++) if (!this.satisfies(clues[j], all[i])) { ok = false; break; }
      if (ok) { n++; only = all[i]; if (n > 1) return false; }
    }
    return n === 1 && only === t;
  },

  /* ⚠ THE TARGET IS DERIVED FROM THE CARDS, NEVER STORED. A board is a
     range and a clue list; the number it leaves is whatever survives
     them. Storing it would let a board's answer disagree with its own
     cards — and it would put the answer in a public JSON file and in the
     board's id. Deriving makes both unrepresentable. */
  loadBoard: function (st, board) {
    var s = this._clone(st);
    if (!board || !board.clues || !board.clues.length) return s;
    s.field = board.range;
    s.clues = board.clues.slice();
    s.turned = 0;
    s.markers = [];
    s.spares = this._deriveSpares(s.field, s.clues);
    s.emblems = this._freshEmblems(s.clues.length);
    s.chosen = -1;
    s.committed = false;
    var all = this.allNumbers(s.field), surv = [], i, j, ok;
    for (i = 0; i < all.length; i++) {
      ok = true;
      for (j = 0; j < s.clues.length; j++) if (!this.satisfies(s.clues[j], all[i])) { ok = false; break; }
      if (ok) surv.push(all[i]);
    }
    s.target = surv.length === 1 ? surv[0] : null;
    return s;
  },

  /* ⚠ RETURNS null WHEN IT CANNOT BUILD — never an unchanged clone. The
     first cut returned `s` on failure, so the clone still carried the OLD
     clues, `built.clues.length` was truthy at the call site, and a failure
     committed itself as a success: armed state cleared, library dots
     dropped, nothing else changed. A caller must be able to tell. */
  /* `opts` carries the teacher's family toggles and deck-length chip
     straight into the builder, so "New cards" and a tapped number both
     produce a board aimed at today's mathematics. */
  setTarget: function (st, n, opts) {
    var s = this._clone(st);
    var o = opts || {};
    /* ⚠ FALL BACK BEFORE FAILING, BUT NEVER SILENTLY WIDEN THE FAMILIES.
       The floor and the clean-tens preference are quality bars, and a
       narrow family set can make a particular target unreachable under
       them; relaxing a quality bar for that target is honest (the board
       is still valid, just short of the ideal). Quietly re-adding a
       FAMILY the teacher switched off is not — she would get a
       tens-digit card in week three of Grade 1 having explicitly said no,
       which is the exact defect the toggles exist to fix. So `only` is
       carried through every rung of the ladder and only the bars give. */
    var built = this.buildFor(s.field, n, o.want, { only: o.only, rot: o.rot, minPen: this.MIN_PENULTIMATE, cleanTens: true });
    if (!built) built = this.buildFor(s.field, n, o.want, { only: o.only, rot: o.rot, cleanTens: true });
    if (!built) built = this.buildFor(s.field, n, o.want, { only: o.only, rot: o.rot });
    if (!built) return null;
    s.clues = built;
    s.target = Math.round(Number(n));
    s.turned = 0;
    s.markers = [];
    s.spares = this._deriveSpares(s.field, s.clues);
    s.emblems = this._freshEmblems(s.clues.length);
    s.chosen = -1;
    s.committed = false;
    return s;
  },

  /* =================================================================
     ENTITLEMENT — copied as a pattern from pattern-bench.js:239-265.
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

  /* ---- the board library ---------------------------------------- */
  /* ⚠ THE OFFLINE FALLBACK CARRIES THE WHOLE FREE TIER, NOT AN EMPTY
     ARRAY. The shipped shape was `boards: []`, so if the library JSON
     404s the tool was permanently a field with no cards and no way
     forward — the recorded arrow-strip defect verbatim: an offline
     fallback must degrade to the FREE TIER, not to nothing. These are
     the same eight boards the file marks free, and no paid one.
     Regenerated by scripts/gen-number-sieve-boards.js --write; kept in
     step by gate N27. */
  FALLBACK_BOARDS: {
    version: 2,
    freeMax: 8,
    premiumMax: 8,
    boards: [
      {"id":"s20-005","range":20,"clues":[{"f":"multiple","m":2,"keep":false},{"f":"multiple","m":3,"keep":false},{"f":"quantity","op":"lt","q":12},{"f":"digit","place":"ones","d":7,"keep":false},{"f":"digit","place":"ones","d":1,"keep":false}],"free":true},
      {"id":"s20-012","range":20,"clues":[{"f":"parity","r":0},{"f":"multiple","m":3,"keep":false},{"f":"quantity","op":"lt","q":10},{"f":"quantity","op":"gt","q":4}],"free":true},
      {"id":"s20-020","range":20,"clues":[{"f":"quantity","op":"gt","q":11},{"f":"quantity","op":"lt","q":16},{"f":"digit","place":"ones","d":4,"keep":false},{"f":"multiple","m":3,"keep":false}],"free":true},
      {"id":"s20-027","range":20,"clues":[{"f":"parity","r":0},{"f":"multiple","m":3,"keep":false},{"f":"range","op":"ge","a":10},{"f":"digit","place":"ones","d":4,"keep":false},{"f":"multiple","m":5,"keep":false}],"free":true},
      {"id":"s100-029","range":100,"clues":[{"f":"parity","r":0},{"f":"multiple","m":4,"keep":false},{"f":"nearer","a":10,"b":80},{"f":"quantity","op":"gt","q":18},{"f":"digit","place":"tens","d":3,"keep":false},{"f":"digit","place":"ones","d":2,"keep":false}],"free":true},
      {"id":"s100-086","range":100,"clues":[{"f":"nearer","a":10,"b":90},{"f":"range","op":"ge","a":30},{"f":"digit","place":"tens","d":3,"keep":false},{"f":"digit","place":"ones","d":6,"keep":true}],"free":true},
      {"id":"s100-142","range":100,"clues":[{"f":"parity","r":0},{"f":"multiple","m":4,"keep":false},{"f":"range","op":"ge","a":60},{"f":"nearer","a":60,"b":100},{"f":"multiple","m":5,"keep":true}],"free":true},
      {"id":"s120-087","range":120,"clues":[{"f":"digit","place":"ones","d":2,"keep":true},{"f":"multiple","m":4,"keep":false},{"f":"range","op":"ge","a":50},{"f":"nearer","a":10,"b":120}],"free":true}
    ]
  },

  _fetchBoards: function () {
    var self = this;
    fetch('/mini-tools/number-sieve-boards.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_BOARDS; })
      .then(function (d) {
        self.data = (d && d.boards && d.boards.length) ? d : self.FALLBACK_BOARDS;
        self._settle();
      });
  },

  /* locked boards are ABSENT from the array, never merely hidden.
     ⚠ A teacher's own kept boards ride in the same rotation, and they are
     equally absent without a subscription — the store can outlive a
     lapse, so reading it unguarded would hand back a paid surface. */
  boardsFor: function () {
    var all = (this.data && this.data.boards) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    if (this.premium) {
      var mine = this._savedList();
      for (i = 0; i < mine.length; i++) {
        if (mine[i] && mine[i].clues && mine[i].clues.length) out.push(mine[i]);
      }
    }
    return out;
  },

  _settle: function () { if (!this.data) return; this._ensureDeck(); if (this._wrap) this.render(); },

  _ensureDeck: function () {
    if (this.st && this.st.clues.length) return;
    var open = this.boardsFor();
    if (open.length) { this.st = this.loadBoard(this.st, open[0]); this._boardIdx = 0; this._boardId = open[0].id; }
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectNumberSieveCSS();
    document.body.classList.add('nsv-wide');
    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._boardIdx = 0;
    this._picking = null;
    this._timers = [];
    this._only = this._loadFamilies();
    this._want = this._store.want || this.AIM_CARDS;
    this._roving = null;
    /* ⭐ SEED SYNCHRONOUSLY, BEFORE THE FIRST FRAME EXISTS. `init` renders
       and only THEN does the board fetch resolve, so the shipped tool's
       first frame was a field with no cards, no hint and nothing to do —
       and if the JSON 404s that frame is permanent, because
       FALLBACK_BOARDS.boards was []. That is the recorded arrow-strip
       defect: an offline fallback must degrade to the FREE TIER, not to
       nothing. The builder is pure, deterministic and needs no network,
       so there is no excuse for an empty deck ever being on screen. */
    this._seed();
    this._fetchBoards();
    this._fetchEntitlement();
    this.render();
  },

  /* ⚠ THE FIRST FRAME MUST SHOW THE WHOLE APPARATUS, AND A FIXED SEED
     TARGET DOES NOT GUARANTEE THAT. `setTarget` relaxes the penultimate
     floor rather than refusing a number a teacher tapped — correct — but
     the seed is not a number anybody tapped, so it has no business
     taking the relaxed path. Measured: target 13 on the 1-20 field
     cannot be built under the floor at all, so the opening board had NO
     closing choice and the one move the rebuild exists for was absent
     from the state every visitor meets first. Walk until a board that
     carries the choice; stride 7 is coprime with 20 so it reaches every
     target, and it is deterministic. */
  _seed: function () {
    var all = this.allNumbers(this.st.field), k, cand, built;
    for (k = 0; k < all.length; k++) {
      cand = all[(this.SEED_TARGET - 1 + k * 7) % all.length];
      built = this.setTarget(this.st, cand, { want: this._want });
      if (built && built.spares.length === 3) {
        this.st = built; this._fromLibrary = false; this._boardId = null;
        return;
      }
    }
    /* nothing with a closing choice: a board is still better than a
       field with no cards on it */
    built = this.setTarget(this.st, this.SEED_TARGET);
    if (built) { this.st = built; this._fromLibrary = false; this._boardId = null; }
  },
  SEED_TARGET: 13,

  /* ⚠ "START AGAIN" AND THE SHELL'S RESET BOTH MEAN THIS BOARD, FROM THE
     TOP. They used to mean "throw away the field, the board and the clue
     order and load library board one" — see `restart`. */
  reset: function () {
    this.st = this.restart(this.st);
    this._picking = null;
    if (!this.st.clues.length) { this._boardIdx = 0; this._ensureDeck(); }
    if (!this.st.clues.length) this._seed();
    this.render();
  },

  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    this._dying = null;
    this._relook = null;
    document.body.classList.remove('nsv-wide');
    document.body.classList.remove('nsv-paid');
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  /* ---- the family toggles, persisted so a Grade 1 teacher does not
     re-aim the instrument every morning ---------------------------- */
  _loadFamilies: function () {
    var f = this._store.only;
    if (!f || !f.length) return this.FAMILIES.slice();
    var out = [], i;
    for (i = 0; i < this.FAMILIES.length; i++) if (f.indexOf(this.FAMILIES[i]) > -1) out.push(this.FAMILIES[i]);
    return out.length ? out : this.FAMILIES.slice();
  },
  _saveFamilies: function () { this._store.only = this._only.slice(); this._store.want = this._want; this._saveStore(); },

  /* which families this field can actually offer — the 1-20 field
     structurally excludes two of them, and showing that is how a teacher
     discovers that the small field IS the Grade 1 field */
  familyAvailable: function (field, fam) {
    var u = this.universe(field, [fam]);
    return u.length > 0;
  },

  /* =================================================================
     RENDER — a BUILD/PAINT split, and it is not a refactor.

     ⭐⭐ THE GOING-DARK HAD NEVER ONCE FIRED IN PRODUCTION. `render()` did
     `stage.innerHTML = ''` and then minted a brand-new <button> already
     carrying `nsv-out`. A CSS transition needs a change of computed value
     ON A NODE THAT ALREADY EXISTED, so `.nsv-cell{transition:...}` could
     never run, and the `prefers-reduced-motion` block whose own comment
     read "reduced motion COMPRESSES, it does not delete: the going-dark
     is the lesson" was inert for exactly the same reason. The field is
     the thing that speaks in this tool and it had never spoken.
     This is the platform's THIRD recurrence of that defect
     (`sorting-hoops.js:2217`), which is why it now has its own gate.

     `_build()` mints the cells once per (field, board). `_paint()`
     toggles classes on the SAME nodes, so the transition has something
     to transition from.
     ================================================================= */
  render: function () {
    var api = this.api;
    /* ⚠ locking a control is not enough — reset the STATE it produced. */
    if (this.premiumKnown && !this.premium && this._fromLibrary && this._boardId) {
      var open = this.boardsFor(), i, stillOpen = false;
      for (i = 0; i < open.length; i++) if (open[i].id === this._boardId) stillOpen = true;
      if (!stillOpen) {
        this._boardIdx = 0;
        this._boardId = open.length ? open[0].id : null;
        this.st = open.length ? this.loadBoard(this.st, open[0]) : this.newState();
        if (!this.st.clues.length) this._seed();
      }
    }
    /* ⭐ THE PRINT SHEET IS BUILT ONLY FOR A PREMIUM VISITOR, AND SO IS ITS
       STYLESHEET. Gating the CHIP is not gating the FEATURE — Ctrl+P
       reaches whatever is in the DOM. Absence is the gate.
       (letter-studio:813-823, and #16 before it.) */
    if (this.premium) document.body.classList.add('nsv-paid');
    else document.body.classList.remove('nsv-paid');

    /* --- focus, half one (lids.js:1073-1090). Every focusable node
       carries a stable data-fk; render is a sandwich. It only ever
       restores focus that was ALREADY inside the wrap, so it cannot
       steal focus at boot or yank a teacher out of the settings drawer. */
    var prev = document.activeElement;
    var fk = (this._wrap && prev && this._wrap.contains(prev)) ? prev.getAttribute('data-fk') : null;
    if (this._focusNext) { fk = this._focusNext; this._focusNext = null; }

    var sig = this.st.field + '|' + this.st.clues.length + '|' + this._deckSeed(this.st.clues)
      + '|' + this._only.join(',') + '|' + (this.premium ? 'p' : 'f') + '|' + this._gateSig();
    if (!this._wrap || this._sig !== sig || !api.stage.contains(this._wrap)) {
      this._sig = sig;
      this._build();
    }
    this._paint();

    /* --- focus, half two --- */
    if (fk && this._wrap) {
      var back = this._wrap.querySelector('[data-fk="' + fk + '"]');
      if (!back || back.disabled) back = this._wrap.querySelector('[data-fk="' + this._FALLBACK(fk) + '"]');
      if (back && !back.disabled) back.focus();
    }
  },

  _gateSig: function () { return (this._gate ? 'g' : '') + (this._saved ? 's' : ''); },

  _FALLBACK: function (key) {
    if (key.indexOf('cell:') === 0) return 'card:0';
    if (key.indexOf('card:') === 0) return 'chip:again';
    if (key.indexOf('spare:') === 0) return 'chip:again';
    return 'chip:deal';
  },

  _build: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'nsv-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    wrap.appendChild(this._buildHint());
    /* ⚠ SIDE BY SIDE FROM 680px, NOT 900. Media queries inside an iframe
       resolve against the IFRAME, and the tool page pins every mini-tool
       at 704px on every desktop a teacher owns (measured on production at
       1440, 1920 and 2560 — all three give 704). A 900px breakpoint is
       therefore decoration: on the page teachers actually visit the deck
       stacked BELOW a twelve-row field, which is the 942px stack this
       tool's header already claims to have fixed once.
       Measured at 704: a 487px field + 16 gap + 88px deck = 591px. Fits.
       The 1367/1800/2400 height tiers are NOT dead — they serve the
       uncapped full-screen link — but nothing between 700 and 1367 ever
       fires on the landing page. */
    var main = api.el('div', 'nsv-main' + (this.st.field >= 100 ? ' nsv-tall' : ''));
    this._mainEl = main;
    main.appendChild(this._buildField());
    main.appendChild(this._buildDeck());
    wrap.appendChild(main);
    wrap.appendChild(this._buildFoot());
    /* ⚠⚠ THE SHEET IS ALWAYS BUILT, AND THE GUARD THAT USED TO BE HERE
       PRINTED A BLANK PAGE. Three native panels read the model and filed
       this independently; I reproduced it before fixing. The print CSS
       hides `.nsv-main`, `.nsv-deck`, `.nsv-bar`, `.nsv-foot`, `.nsv-hint`
       and `.nsv-gate` and shows only `.nsv-sheet` — so with the sheet
       absent for a free visitor, everything was hidden and nothing was
       revealed. Measured: FREE gave `sheet: ABSENT` with every other
       region hidden, i.e. an empty A4 from a chip labelled "Print the
       field". Two comments in this file already said the child sheet
       prints for everybody; the outer guard contradicted both and won.
       The gate that matters is INSIDE `_buildSheet`, where the two
       teacher pages are withheld — that is the letter-studio
       "absence is the gate" shape applied to the PAID pages only, which
       is what it was always meant to be. */
    wrap.appendChild(this._buildSheet());
    api.stage.appendChild(wrap);
  },

  /* =================================================================
     PAINT — the only place a cell's state ever changes after birth.
     ================================================================= */
  _paint: function () {
    var live = {}, alive = this.visibleSurvivors(this.st), i, n, el;
    for (i = 0; i < alive.length; i++) live[alive[i]] = 1;
    var mk = {}, mi;
    for (mi = 0; mi < this.st.markers.length; mi++) mk[this.st.markers[mi]] = mi;
    var dying = this._dying || {};
    var relook = this._relook || {};
    var cells = this._cells || [];
    var api = this.api;
    var committed = this.st.committed;
    for (i = 0; i < cells.length; i++) {
      el = cells[i];
      if (!el) continue;
      n = i + 1;
      var out = !live[n];
      el.classList.toggle('nsv-out', out);
      el.classList.toggle('nsv-dying', !!dying[n]);
      el.classList.toggle('nsv-look', !!relook[n]);
      el.classList.toggle('nsv-marked', mk[n] !== undefined);
      if (mk[n] !== undefined) el.setAttribute('data-mk', String(mk[n] % this.MAX_MARKERS));
      else el.removeAttribute('data-mk');
      el.setAttribute('aria-label', api.t(out ? 'cellOutAria' : 'cellAria').replace('{n}', String(n)));
      /* ⭐ ONCE COMMITTED THE FIELD STOPS BEING A CONTROL. `park` returns
         unchanged after the first card, so all 120 cells were inert AND
         all 120 were still in the tab order — a keyboard teacher tabbed
         through 120 dead buttons to reach card 2. The field is MATERIAL,
         not a control, and saying so is the correct semantics as well as
         the fix. */
      if (committed && !this._picking) {
        el.setAttribute('role', 'img');
        el.setAttribute('tabindex', '-1');
        el.disabled = true;
      } else {
        el.removeAttribute('role');
        el.disabled = false;
        el.setAttribute('tabindex', (this._roving === n || (this._roving === null && n === 1)) ? '0' : '-1');
      }
    }
    this._paintDeck();
    this._paintHint();
    this._paintFoot();
  },


  /* =================================================================
     THE BAR — three kinds of control, and they used to look identical.
     Five cream lozenges in a row, with `nsv-on` meaning both "this range
     is selected" and "New cards is armed". A state selector, a generator
     and a browser are not the same object and must not read as one.
     ================================================================= */
  _buildBar: function () {
    var api = this.api, self = this, bar = api.el('div', 'nsv-bar');

    /* the three ranges are ONE segmented control with three states */
    var fields = api.el('div', 'nsv-seg');
    fields.setAttribute('role', 'group');
    fields.setAttribute('aria-label', api.t('fieldLabel'));
    this.FIELDS.forEach(function (f) {
      var b = api.el('button', 'nsv-segbtn' + (self.st.field === f ? ' nsv-on' : ''));
      b.type = 'button';
      b.textContent = '1–' + f;
      b.setAttribute('data-fk', 'chip:f' + f);
      b.setAttribute('aria-pressed', self.st.field === f ? 'true' : 'false');
      b.addEventListener('click', function () {
        self.st = self.setField(self.st, f);
        self._picking = null;
        self._roving = null;
        if (!self._dealFor(f)) self._dealNewTarget();
        self._focusNext = 'chip:f' + f;
        self.render();
      });
      fields.appendChild(b);
    });
    bar.appendChild(fields);

    /* THE FAMILY TOGGLES — the cheapest large win in the whole review,
       and it is one row of SVG that already existed. A teacher could not
       aim this instrument at today's mathematics: she got whatever board
       a stride-7 walk landed on, and if that carried a tens-digit card in
       week three of Grade 1 she quietly stopped opening the tool.
       Wordless by construction, because the toggles ARE the card faces.
       FREE, because a teacher who cannot aim the instrument in week one
       never reaches the library. */
    var fam = api.el('div', 'nsv-fams');
    fam.setAttribute('role', 'group');
    fam.setAttribute('aria-label', api.t('familyLabel'));
    this.FAMILIES.forEach(function (name, fi) {
      var avail = self.familyAvailable(self.st.field, name);
      var on = self._only.indexOf(name) > -1;
      var b = api.el('button', 'nsv-fam' + (on && avail ? ' nsv-on' : '') + (avail ? '' : ' nsv-na'));
      b.type = 'button';
      b.setAttribute('data-fk', 'fam:' + name);
      b.setAttribute('aria-pressed', on && avail ? 'true' : 'false');
      b.setAttribute('aria-label', api.t('familyAria').replace('{i}', String(fi + 1)));
      b.appendChild(self._familyGlyph(name));
      if (!avail) b.disabled = true;
      b.addEventListener('click', function () {
        var at = self._only.indexOf(name);
        /* NEVER LET HER SWITCH OFF THE LAST ONE. An empty family set
           builds nothing, and a tool that answers a tap by doing nothing
           is the defect this control exists to fix. */
        if (at > -1 && self._only.length > 1) self._only.splice(at, 1);
        else if (at === -1) self._only.push(name);
        self._saveFamilies();
        self._focusNext = 'fam:' + name;
        self.render();
      });
      fam.appendChild(b);
    });
    bar.appendChild(fam);

    /* deck length — three card-backs, four, five. Length IS the routine. */
    var len = api.el('div', 'nsv-seg nsv-lens');
    len.setAttribute('role', 'group');
    len.setAttribute('aria-label', api.t('lengthLabel'));
    [3, 4, 5].forEach(function (w) {
      var b = api.el('button', 'nsv-segbtn nsv-lenbtn' + (self._want === w ? ' nsv-on' : ''));
      b.type = 'button';
      b.setAttribute('data-fk', 'len:' + w);
      b.setAttribute('aria-pressed', self._want === w ? 'true' : 'false');
      b.setAttribute('aria-label', api.t('lengthAria').replace('{i}', String(w)));
      b.appendChild(self._lenGlyph(w));
      b.addEventListener('click', function () {
        self._want = w;
        self._saveFamilies();
        self._focusNext = 'len:' + w;
        self.render();
      });
      len.appendChild(b);
    });
    bar.appendChild(len);

    var acts = api.el('div', 'nsv-acts');
    var pick = api.el('button', 'nsv-chip nsv-act' + (this._picking === 'target' ? ' nsv-armed' : ''));
    pick.type = 'button';
    pick.setAttribute('data-fk', 'chip:deal');
    pick.appendChild(this._actGlyph('deal'));
    pick.appendChild(document.createTextNode(api.t('newSet')));
    /* IT DEALS, THEN IT ARMS. A control named with a NOUN that produced
       no cards read as "I selected something". audit-tool-control-
       liveness passed it, because the DOM did change — which is why a
       control must be proved to do what its LABEL says, not merely to
       act. Armed is now a DASHED outline, never the segmented control's
       fill: armed is not the same as selected. */
    pick.addEventListener('click', function () {
      self._dealNewTarget();
      self._picking = 'target';
      self._roving = null;
      self._focusNext = 'chip:deal';
      self.render();
    });
    acts.appendChild(pick);

    var lib = api.el('button', 'nsv-chip nsv-act');
    lib.type = 'button';
    lib.setAttribute('data-fk', 'chip:lib');
    lib.appendChild(this._actGlyph('lib'));
    lib.appendChild(document.createTextNode(api.t('libraryBtn')));
    lib.addEventListener('click', function () { self._nextBoard(); });
    acts.appendChild(lib);

    /* THE LIBRARY EVIDENCE BELONGS AT THE LIBRARY, and a subscriber's
       three hundred dots do not. The dot row used to sit at the bottom of
       the deck — four hundred pixels from the control it reports on — and
       .nsv-tall .nsv-dots{width:auto} let 300 dots compute a max-content
       width of thousands of pixels, stretching the deck column off the
       card. It passed every sweep because the free case is eight.
       Above a dozen boards this is a position TRACK, not dots: no digits,
       no language, nothing that reads as a score. */
    var open = this.boardsFor();
    if (this._fromLibrary && open.length > 1) acts.appendChild(this._libTrack(open.length));
    bar.appendChild(acts);
    return bar;
  },

  _libTrack: function (n) {
    var api = this.api, box = api.el('div', 'nsv-dots'), d;
    box.setAttribute('aria-hidden', 'true');
    if (n <= 12) {
      for (d = 0; d < n; d++) box.appendChild(api.el('span', 'nsv-dot' + (d === this._boardIdx ? ' nsv-dot-on' : '')));
      return box;
    }
    box.className = 'nsv-track';
    var fill = api.el('span', 'nsv-trackfill');
    fill.style.setProperty('left', (100 * this._boardIdx / Math.max(1, n - 1)) + '%');
    box.appendChild(fill);
    return box;
  },

  /* Deal a board around a DIFFERENT target in the current field. Stride 7
     is coprime with 20, 100 and 120, so repeated presses walk every target
     rather than cycling a short orbit — deterministic, because there is
     no Math.random anywhere in this tool. */
  _dealNewTarget: function () {
    var all = this.allNumbers(this.st.field);
    var start = all.indexOf(this.st.target);
    var k, cand, built;
    for (k = 1; k <= all.length; k++) {
      cand = all[((start + k * 7) % all.length + all.length) % all.length];
      built = this.setTarget(this.st, cand, { only: this._only, want: this._want, rot: k });
      if (built) {
        this.st = built;
        this._fromLibrary = false;
        this._boardId = null;
        return true;
      }
    }
    return false;
  },

  _dealFor: function (f) {
    var open = this.boardsFor(), i;
    for (i = 0; i < open.length; i++) {
      if (open[i].range === f) {
        this.st = this.loadBoard(this.st, open[i]);
        this._boardIdx = i;
        this._boardId = open[i].id;
        this._fromLibrary = true;
        return true;
      }
    }
    this._fromLibrary = false;
    return false;
  },

  _nextBoard: function () {
    var open = this.boardsFor();
    if (!open.length) return;
    var wrapped = (this._boardIdx + 1) >= open.length;
    this._boardIdx = (this._boardIdx + 1) % open.length;
    this.st = this.loadBoard(this.st, open[this._boardIdx]);
    this._boardId = open[this._boardIdx].id;
    this._picking = null;
    this._roving = null;
    this._fromLibrary = true;
    /* THE LIBRARY NOW ACTUALLY GATES. The gate line has always said
       "the library and printing are part of the teacher plan", and
       _showGate() was called from exactly ONE place — the print chip.
       A free teacher cycled eight boards forever with no signal that
       hundreds more existed. Fired on the WRAP: never mid-lesson, never a
       capacity cap, and only at the moment she has actually seen them
       all — the least-resented shape there is. */
    if (wrapped && this.premiumKnown && !this.premium) this._showGate();
    this._focusNext = 'chip:lib';
    this.render();
  },


  /* =================================================================
     THE FIELD. Built once; painted thereafter.
     The field scrolls inside its own box; the page never does. Width is
     bound to the range: there is no columns control, by refusal.
     ================================================================= */
  _buildField: function () {
    var api = this.api, self = this;
    var scroll = api.el('div', 'nsv-scroll');
    var grid = api.el('div', 'nsv-field');
    grid.style.setProperty('--nsv-cols', String(this.COLS[this.st.field] || 10));
    grid.classList.add('nsv-f' + this.st.field);
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', api.t('fieldLabel'));
    var nums = this.allNumbers(this.st.field), i;
    this._cells = [];
    for (i = 0; i < nums.length; i++) {
      var c = this._cellEl(nums[i]);
      this._cells.push(c);
      grid.appendChild(c);
    }
    /* ONE keydown listener on the grid, not 120 on the cells. */
    grid.addEventListener('keydown', function (e) { self._fieldKey(e); });
    scroll.appendChild(grid);
    return scroll;
  },

  /* NO .target ANYWHERE IN THIS PATH. The cell knows whether it is still
     standing and nothing else; the gate proves the render cannot see what
     the deck is converging on. */
  _cellEl: function (n) {
    var api = this.api, self = this;
    var b = api.el('button', 'nsv-cell' + (String(n).length > 2 ? ' nsv-d3' : ''));
    b.type = 'button';
    b.setAttribute('data-n', String(n));
    b.setAttribute('data-fk', 'cell:' + n);
    b.setAttribute('tabindex', '-1');
    var t = api.el('span', 'nsv-num');
    t.textContent = String(n);
    b.appendChild(t);
    /* the marker is a SHAPE, never a colour — colours become teams */
    b.appendChild(this._markerGlyph());
    b.addEventListener('click', function () { self._tapCell(n); });
    return b;
  },

  /* ARROWS MOVE BY ONE AND BY ROW; the grid is a single tab stop.
     120 cells were 120 tab stops, and after the first card every one of
     them was inert as well. */
  _fieldKey: function (e) {
    if (this.st.committed && !this._picking) return;
    var cols = this.COLS[this.st.field] || 10;
    var max = this.allNumbers(this.st.field).length;
    var cur = this._roving || 1, next = null;
    var k = e.key;
    if (k === 'ArrowRight') next = cur + 1;
    else if (k === 'ArrowLeft') next = cur - 1;
    else if (k === 'ArrowDown') next = cur + cols;
    else if (k === 'ArrowUp') next = cur - cols;
    else if (k === 'Home') next = cur - ((cur - 1) % cols);
    else if (k === 'End') next = cur - ((cur - 1) % cols) + cols - 1;
    else if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
      e.preventDefault();
      this._tapCell(cur);
      return;
    } else return;
    if (next === null || next < 1 || next > max) return;
    e.preventDefault();
    this._roving = next;
    this._focusNext = 'cell:' + next;
    this.render();
  },

  _tapCell: function (n) {
    if (this._picking === 'target') {
      var built = this.setTarget(this.st, n, { only: this._only, want: this._want });
      /* guard on the BUILD, not on clues.length — see setTarget */
      if (built) { this.st = built; this._fromLibrary = false; this._boardId = null; }
      this._picking = null;
      this._roving = n;
      this._focusNext = 'cell:' + n;
      this.render();
      return;
    }
    var before = this.st.markers.length;
    this.st = this.park(this.st, n);
    if (this.st.markers.length !== before) {
      this.api.sound(660);
      if (this.st.markers.indexOf(n) > -1) this.api.announce(this.api.t('markerAria').replace('{n}', String(n)));
    }
    this._roving = n;
    this._focusNext = 'cell:' + n;
    this.render();
  },

  /* =================================================================
     THE DECK
     ================================================================= */
  _buildDeck: function () {
    var api = this.api, self = this, deck = api.el('div', 'nsv-deck');
    this._cardEls = [];
    this._spareEls = [];
    if (!this.st.clues.length) return deck;
    var col = api.el('div', 'nsv-cards');
    var lastIdx = this.st.clues.length - 1;
    this.st.clues.forEach(function (clue, i) {
      /* THE SPARES REPLACE THE CLOSING CARD. It is not dealt face-down at
         all: at that point the class chooses. */
      if (i === lastIdx && self.st.spares.length === 3) return;
      var card = api.el('button', 'nsv-card');
      card.type = 'button';
      card.setAttribute('data-fk', 'card:' + i);
      card.setAttribute('data-i', String(i));
      card.setAttribute('aria-label', api.t('cardAria').replace('{i}', String(i + 1)));
      card.addEventListener('click', function () { self._cardTap(i); });
      col.appendChild(card);
      self._cardEls.push(card);
    });
    deck.appendChild(col);
    if (this.st.spares.length === 3) {
      var row = api.el('div', 'nsv-spares');
      row.setAttribute('role', 'group');
      row.setAttribute('aria-label', api.t('spareLabel'));
      this.st.spares.forEach(function (sp, i) {
        var c = api.el('button', 'nsv-card nsv-spare');
        c.type = 'button';
        c.setAttribute('data-fk', 'spare:' + i);
        c.setAttribute('aria-label', api.t('spareAria').replace('{i}', String(i + 1)));
        c.appendChild(self._cardFace(sp));
        c.addEventListener('click', function () { self._spareTap(i); });
        row.appendChild(c);
        self._spareEls.push(c);
      });
      deck.appendChild(row);
    }
    return deck;
  },

  _paintDeck: function () {
    var api = this.api, self = this, i;
    var cards = this._cardEls || [];
    for (i = 0; i < cards.length; i++) {
      var el = cards[i], idx = Number(el.getAttribute('data-i'));
      var turned = idx < this.st.turned;
      var isNext = idx === this.st.turned;
      el.classList.toggle('nsv-up', turned);
      el.classList.toggle('nsv-next', isNext);
      el.classList.toggle('nsv-later', !turned && !isNext);
      /* A TURNED CARD IS NO LONGER A DEAD BUTTON WEARING A TOGGLE ROLE.
         It used to carry aria-pressed="true" with no handler at all — a
         live control in the tab order announcing a toggle for something
         that is not one. It is now the re-look control. */
      el.disabled = (!turned && !isNext);
      el.removeAttribute('aria-pressed');
      el.setAttribute('aria-label', api.t(turned ? 'cardLookAria' : 'cardAria').replace('{i}', String(idx + 1)));
      var want = turned ? 'face' : 'back';
      if (el.getAttribute('data-face') !== want) {
        el.setAttribute('data-face', want);
        el.innerHTML = '';
        el.appendChild(turned ? this._cardFace(this.st.clues[idx]) : this._cardBack(idx + 1, this.st.emblems[idx]));
      }
      el.classList.toggle('nsv-looking', this._relookIdx === idx);
    }
    var sp = this._spareEls || [];
    for (i = 0; i < sp.length; i++) {
      sp[i].classList.toggle('nsv-chosen', this.st.chosen === i);
      sp[i].classList.toggle('nsv-armed', this.st.chosen === -1 && this.st.turned >= this.st.clues.length - 1);
      sp[i].disabled = this.st.turned < this.st.clues.length - 1;
    }
    void self;
  },

  _cardTap: function (i) {
    if (i === this.st.turned) { this._turn(); return; }
    if (i < this.st.turned) { this._doRelook(i); return; }
  },

  _turn: function () {
    var was = this.survivors(this.st);
    this.st = this.turn(this.st);
    this._picking = null;
    var now = this.survivors(this.st);
    this._markDying(was, now);
    this.api.sound(520);
    this.api.announce(this.api.t('cardAria').replace('{i}', String(this.st.turned)));
    this._announceEvictions(was, now);
    this._focusNext = 'card:' + Math.min(this.st.turned, this.st.clues.length - 1);
    this.render();
  },

  _spareTap: function (i) {
    var was = this.visibleSurvivors(this.st);
    this.st = this.chooseSpare(this.st, i);
    var now = this.visibleSurvivors(this.st);
    this._markDying(was, now);
    this.api.sound(520);
    this._announceEvictions(was, now);
    this._focusNext = 'spare:' + i;
    this.render();
  },

  /* the transient this-card emphasis. SIMULTANEOUS (a wave would assert a
     traversal order, which refusal 1 forbids), ACHROMATIC (a second hue
     is a verdict delivered by palette, which refusal 4 forbids) and
     TRANSIENT (a persistent second dark state turns a depleting
     population into an accumulating transcript, which is another tool's
     object entirely). */
  _markDying: function (was, now) {
    var self = this, d = {}, i, live = {};
    for (i = 0; i < now.length; i++) live[now[i]] = 1;
    for (i = 0; i < was.length; i++) if (!live[was[i]]) d[was[i]] = 1;
    this._dying = d;
    this._after(this.SINK_MS, function () { self._dying = null; if (self._wrap) self._paint(); });
  },
  SINK_MS: 700,

  /* AN EVICTION IS A FACT ABOUT THE FIELD, and it is the third invention.
     A screen-reader user got NOTHING when the marker they committed went
     dark — the tool never called api.announce once. NEVER a survivor
     count, however tempting: refusal 4. */
  _announceEvictions: function (was, now) {
    var live = {}, i, gone = [];
    for (i = 0; i < now.length; i++) live[now[i]] = 1;
    for (i = 0; i < this.st.markers.length; i++) {
      var m = this.st.markers[i];
      if (was.indexOf(m) > -1 && !live[m]) gone.push(m);
    }
    for (i = 0; i < gone.length; i++) {
      this.api.announce(this.api.t('markerOutAria').replace('{n}', String(gone[i])));
    }
  },

  /* RE-LOOK, AND IT IS NOT A STEP-BACK. "Wait — what did card two do?"
     is a request to re-SEE, not to undo. Tapping a face-up card outlines,
     across the WHOLE field, what that card alone excludes.
     It is computed from the card's own predicate over the whole field,
     NOT from what it happened to kill given what preceded it — so
     "card 2 alone takes these" is the same set whatever the order, and
     the class can WATCH order-invariance instead of being told it.
     Nothing is re-lit, nothing is named, nothing changes state. */
  _doRelook: function (i) {
    var self = this, clue = this.st.clues[i];
    if (!clue) return;
    var all = this.allNumbers(this.st.field), out = {}, k;
    for (k = 0; k < all.length; k++) if (!this.satisfies(clue, all[k])) out[all[k]] = 1;
    this._relook = out;
    this._relookIdx = i;
    this.api.sound(440);
    this._after(this.LOOK_MS, function () { self._relook = null; self._relookIdx = -1; if (self._wrap) self._paint(); });
    this._paint();
  },
  LOOK_MS: 1200,


  /* =================================================================
     THE SIX FACES — ONE GRAMMAR, and the old ones did not have one.

     Measured before anything was drawn: cream (L .902), amber (.616) and
     slate (.612) are near-isoluminant, so EVERY meaning-bearing boundary
     in the shipped tool was drawn between two light values —
        the amber "survives" half against its strip   1.21 : 1
        the committed marker against the field        1.43 : 1
        the lit-versus-dark step, i.e. the lesson     1.44 : 1
     against a WCAG floor of 3:1 for non-text graphics. On a monitor those
     read; at four metres on a washed-out projector they are not faint
     distinctions, they are no distinction. And the one strong pair in the
     palette — amber on deep teal, 5.82:1 — was not used anywhere.

     So the grammar is built on that measurement:
       THE BAR IS THE FIELD, identical on all six faces, ground deep teal.
       AMBER = SURVIVES, filled, inside the bar, and nowhere else.
       TEAL  = the apparatus, living above the bar.
       ONE POLARITY DEVICE: a solid post is inclusive, a hollow post is
       strict — which is DERIVED, not chosen (range is inclusive, quantity
       is strict, and nearer's first anchor always survives while its
       second never does).

     The old faces had amber meaning four different things: the kept side
     on range/quantity/nearer, the LEFTOVER on parity, nothing at all on
     multiple (which spoke "survives" in teal), and INVERTED on half of
     digit. They also collided: range and quantity had one silhouette,
     multiple and nearer another; multiple's comb pitch was constant so
     m=2 and m=10 drew identically; and digit's strike sat 85% down its
     box, which is an underline.

     viewBox 64x74 against a 76x86 card gives exactly 1.00 px per unit, so
     a 14px numeral renders at 14px. The old 60x76-in-72x86 scaled by
     0.9737 and shipped the two small numerals at 13.63px — under the
     platform's own floor, and invisible to a gate that read the DECLARED
     font-size instead of the rendered one.
     The bar is 60 wide: divisible by 2, 3, 4, 5, 6, 10, 12, 15 and 20,
     which every comb and every decade ruling needs.
     ================================================================= */
  BAR: { x: 2, y: 48, w: 60, h: 16, cell: 6 },

  _barGround: function (s) {
    s.appendChild(this._rect(this.BAR.x, this.BAR.y, this.BAR.w, this.BAR.h, 3, 'nsv-fbar'));
  },
  _barCell: function (s, i, cls) {
    s.appendChild(this._rect(this.BAR.x + i * this.BAR.cell, this.BAR.y, this.BAR.cell, this.BAR.h, 0, cls));
  },
  _barHalf: function (s, right) {
    s.appendChild(this._rect(right ? this.BAR.x + this.BAR.w / 2 : this.BAR.x, this.BAR.y, this.BAR.w / 2, this.BAR.h, 3, 'nsv-keep'));
  },
  _post: function (s, x, solid) {
    s.appendChild(this._rect(x - 1.25, 42, 2.5, 28, 1, solid ? 'nsv-post' : 'nsv-post-o'));
  },

  _cardFace: function (c) {
    var s = this._svg(64, 74), f = c.f, i;
    this._barGround(s);
    if (f === 'range') {
      this._barHalf(s, c.op === 'ge');
      this._post(s, 32, true);
      s.appendChild(this._num(32, 36, String(c.a), 'nsv-cnum'));
    } else if (f === 'quantity') {
      /* THE TRUE COUNT, IN FIVE-COLUMN ROWS. The old face drew
         Math.min(q, 10) dots while the universe emits q up to 20 — the
         cap was designed at 20 and the renderer written at 10, and the
         two never met. Measured on the shipped library: 14 of 26 quantity
         cards drew a FALSE face, and over the universe ELEVEN distinct
         clues on the 1-100 field ("more than 10" through "more than 20")
         rendered byte-identically. On a tool whose whole law is that the
         icon IS the statement, that is a card that lies.
         Five columns is also the Kraft der Fuenf structure the German
         Zwanzigerfeld carries, so the true face is the legible one too. */
      var q = Math.max(0, Math.min(this.MAX_DOTS, Math.round(c.q)));
      for (i = 0; i < q; i++) s.appendChild(this._dot(20 + (i % 5) * 8, 8 + Math.floor(i / 5) * 8, 2.6, 'nsv-pip'));
      this._barHalf(s, c.op === 'gt');
      this._post(s, 32, false);
    } else if (f === 'parity') {
      /* the bar shows the class exactly what the field is about to do */
      for (i = 0; i < 10; i++) if (((i + 1) % 2) === (c.r ? 1 : 0)) this._barCell(s, i, 'nsv-keep');
      s.appendChild(this._dot(26, 28, 3.4, 'nsv-pip'));
      s.appendChild(this._dot(38, 28, 3.4, 'nsv-pip'));
      if (c.r) s.appendChild(this._dot(32, 14, 3.4, 'nsv-pip'));
    } else if (f === 'multiple') {
      /* the bar is 1..10 and the marks fall on the multiples, so the
         PITCH now varies with m — m=2 and m=10 can no longer draw alike */
      for (i = 0; i < 10; i++) {
        var hit = ((i + 1) % c.m) === 0;
        if (c.keep ? hit : !hit) this._barCell(s, i, 'nsv-keep');
      }
      s.appendChild(this._num(32, 36, String(c.m), 'nsv-cnum'));
    } else if (f === 'digit') {
      var tens = c.place === 'tens';
      for (i = 0; i < 10; i++) {
        var same = i === c.d;
        if (c.keep ? same : !same) this._barCell(s, i, 'nsv-keep');
      }
      s.appendChild(this._rect(10, 24, 10, 14, 2, tens ? 'nsv-solid' : 'nsv-hollow'));
      s.appendChild(this._rect(22, 24, 10, 14, 2, tens ? 'nsv-hollow' : 'nsv-solid'));
      s.appendChild(this._num(46, 36, String(c.d), 'nsv-cnum'));
    } else if (f === 'nearer') {
      this._barHalf(s, false);
      this._post(s, 17, true);
      this._post(s, 47, false);
      s.appendChild(this._num(17, 36, String(c.a), 'nsv-cnum-s'));
      s.appendChild(this._num(47, 36, String(c.b), 'nsv-cnum-s'));
    }
    return s;
  },

  /* THE BACK IS THE UNTURNED FIELD, so a turned card is visibly the same
     object opened rather than a different one substituted. It carries the
     ordinal (turn order, which a shuffle changes) and the emblem (which
     card this is, which a shuffle does not). */
  _cardBack: function (ordinal, emblem) {
    var s = this._svg(64, 74), i;
    s.appendChild(this._rect(2, 2, 60, 70, 8, 'nsv-back'));
    for (i = 0; i < 10; i++) {
      s.appendChild(this._rect(this.BAR.x + i * this.BAR.cell, this.BAR.y, this.BAR.cell - 0.8, this.BAR.h, 0, 'nsv-backcell'));
    }
    s.appendChild(this._dot(32, 26, 15, 'nsv-reserve'));
    s.appendChild(this._num(32, 33, String(ordinal), 'nsv-ord'));
    s.appendChild(this._emblem(11, 11, 6, emblem, 'nsv-emb'));
    return s;
  },

  /* six shapes, never six colours */
  _emblem: function (cx, cy, r, k, cls) {
    var kind = ((Math.round(Number(k)) || 0) % 6 + 6) % 6, pts = [], i, a;
    if (kind === 0) return this._dot(cx, cy, r, cls);
    if (kind === 1) return this._rect(cx - r, cy - r, r * 2, r * 2, 1, cls);
    var n = (kind === 2) ? 3 : (kind === 3) ? 4 : (kind === 4) ? 5 : 6;
    var rot = (kind === 3) ? 0 : -Math.PI / 2;
    for (i = 0; i < n; i++) {
      a = rot + i * 2 * Math.PI / n;
      pts.push((cx + r * Math.cos(a)).toFixed(2) + ',' + (cy + r * Math.sin(a)).toFixed(2));
    }
    return this._poly(pts.join(' '), cls);
  },

  /* THE TOGGLE ROW SPEAKS THE CARD GRAMMAR, BUT IT IS NOT A CARD.
     ⚠ MY FIRST CUT DREW THE WHOLE CARD FACE INTO A 44px BUTTON and it was
     unreadable — the face carries a numeral sized for a 76px card, which
     lands at about four pixels here, so six toggles read as six identical
     smudges. The grammar is what has to survive the shrink, not the
     drawing: same bar, same amber-means-survives, NO numerals, and a
     coarser bar (five cells, not ten) so each mark is twice the width.
     A control a teacher cannot read is not a control. */
  _familyGlyph: function (name) {
    var s = this._svg(64, 34), i;
    var BX = 2, BY = 18, BW = 60, BH = 14, C = BW / 5;
    var bar = function (cls, k) {
      s.appendChild(NumberSieve._rect(BX + k * C, BY, C, BH, 0, cls));
    };
    s.appendChild(this._rect(BX, BY, BW, BH, 2, 'nsv-fbar'));
    if (name === 'parity') {
      for (i = 0; i < 5; i++) if (i % 2 === 0) bar('nsv-keep', i);
      s.appendChild(this._dot(22, 8, 3.6, 'nsv-pip'));
      s.appendChild(this._dot(42, 8, 3.6, 'nsv-pip'));
    } else if (name === 'multiple') {
      for (i = 0; i < 5; i++) if ((i + 1) % 2 === 0) bar('nsv-keep', i);
      s.appendChild(this._rect(20, 4, 24, 3, 1.5, 'nsv-solid'));
      s.appendChild(this._rect(20, 10, 24, 3, 1.5, 'nsv-solid'));
    } else if (name === 'digit') {
      bar('nsv-keep', 3);
      s.appendChild(this._rect(22, 3, 9, 12, 2, 'nsv-solid'));
      s.appendChild(this._rect(33, 3, 9, 12, 2, 'nsv-hollow'));
    } else if (name === 'range') {
      s.appendChild(this._rect(BX + BW / 2, BY, BW / 2, BH, 2, 'nsv-keep'));
      s.appendChild(this._rect(30.75, 12, 2.5, 26, 1, 'nsv-post'));
    } else if (name === 'quantity') {
      for (i = 0; i < 5; i++) s.appendChild(this._dot(20 + i * 6, 8, 2.4, 'nsv-pip'));
      s.appendChild(this._rect(BX + BW / 2, BY, BW / 2, BH, 2, 'nsv-keep'));
      s.appendChild(this._rect(30.75, 12, 2.5, 26, 1, 'nsv-post-o'));
    } else if (name === 'nearer') {
      s.appendChild(this._rect(BX, BY, BW / 2, BH, 2, 'nsv-keep'));
      s.appendChild(this._rect(16, 12, 2.5, 26, 1, 'nsv-post'));
      s.appendChild(this._rect(45.5, 12, 2.5, 26, 1, 'nsv-post-o'));
    }
    s.setAttribute('class', 'nsv-svg nsv-glyph');
    return s;
  },

  _lenGlyph: function (w) {
    var s = this._svg(64, 74), i;
    var step = 60 / (w + 1);
    for (i = 0; i < w; i++) s.appendChild(this._rect(2 + step * (i + 0.5), 16, step * 0.9, 42, 3, 'nsv-back'));
    return s;
  },

  _actGlyph: function (kind) {
    var s = this._svg(64, 74);
    if (kind === 'deal') {
      s.appendChild(this._rect(6, 22, 22, 34, 4, 'nsv-hollow'));
      s.appendChild(this._rect(22, 14, 22, 34, 4, 'nsv-hollow'));
      s.appendChild(this._rect(38, 22, 22, 34, 4, 'nsv-solid'));
    } else {
      s.appendChild(this._rect(6, 16, 52, 12, 3, 'nsv-hollow'));
      s.appendChild(this._rect(6, 32, 52, 12, 3, 'nsv-hollow'));
      s.appendChild(this._rect(6, 48, 52, 12, 3, 'nsv-solid'));
    }
    s.setAttribute('class', 'nsv-svg nsv-actg');
    return s;
  },

  _markerGlyph: function () {
    var e = this.api.el('span', 'nsv-mkg');
    e.setAttribute('aria-hidden', 'true');
    return e;
  },

  /* ---- tiny SVG helpers ------------------------------------------ */
  _svg: function (w, h) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    s.setAttribute('class', 'nsv-svg');
    s.setAttribute('aria-hidden', 'true');
    return s;
  },
  _rect: function (x, y, w, h, r, cls) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    e.setAttribute('x', x); e.setAttribute('y', y); e.setAttribute('width', w); e.setAttribute('height', h);
    e.setAttribute('rx', r); e.setAttribute('class', cls);
    return e;
  },
  _dot: function (cx, cy, r, cls) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    e.setAttribute('cx', cx); e.setAttribute('cy', cy); e.setAttribute('r', r); e.setAttribute('class', cls);
    return e;
  },
  _poly: function (points, cls) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    e.setAttribute('points', points); e.setAttribute('class', cls);
    return e;
  },
  _line: function (x1, y1, x2, y2, cls) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    e.setAttribute('x1', x1); e.setAttribute('y1', y1); e.setAttribute('x2', x2); e.setAttribute('y2', y2);
    e.setAttribute('class', cls);
    return e;
  },
  /* the ONLY text this tool ever draws is a numeral */
  _num: function (x, y, digits, cls) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    e.setAttribute('x', x); e.setAttribute('y', y); e.setAttribute('class', cls);
    e.setAttribute('text-anchor', 'middle');
    e.textContent = String(digits).replace(/[^0-9]/g, '');
    return e;
  },


  /* =================================================================
     THE HINT.
     ⭐ THE DISPATCH IS A PURE FUNCTION OF THE STATE, and that is not
     tidiness. When the dispatch lives inline in the renderer, a Node gate
     has to REIMPLEMENT it — and then it is testing a copy, so mutations
     of the real dispatch sail straight through (measured on #44: three
     did). Extracting it is what makes the gate able to bite at all.
     Mid-deck the tool says NOTHING and waits: the class is mid-argument
     and the instrument's job is to be quiet.
     ================================================================= */
  hintKey: function (st, picking) {
    var s = st || this.newState();
    if (picking === 'target') return 'pickHint';
    if (!s.clues.length) return '';
    var closing = s.spares && s.spares.length === 3;
    if (closing && s.chosen === -1 && s.turned >= s.clues.length - 1) return 'spareHint';
    if (!s.committed && (!s.markers || !s.markers.length)) return 'parkHint';
    if (!s.committed) return 'instruction';
    if (closing && s.chosen > -1) {
      return (this.visibleSurvivors(s).length === 1) ? 'tryAnother' : '';
    }
    if (!closing && s.turned >= s.clues.length) return 'tryAnother';
    return '';
  },

  _buildHint: function () {
    var hint = this.api.el('div', 'nsv-hint');
    hint.setAttribute('role', 'status');
    this._hintEl = hint;
    return hint;
  },

  _paintHint: function () {
    if (!this._hintEl) return;
    /* one voice at a time: the notice speaks in the hint's place rather
       than underneath it, so nothing on the board moves when it appears */
    var k = this.hintKey(this.st, this._picking);
    this._hintEl.textContent = k ? this.api.t(k) : '';
  },

  /* =================================================================
     THE FOOT — every chip is always rendered, and disabled when it has
     nothing to do. The shipped tool showed and hid them, so the buttons
     moved under the teacher's hand mid-lesson; the reason given was that
     the liveness gate called them dead at rest, and `disabled` answers
     that without moving the furniture (disabled controls are excluded
     from the gate by construction).
     ================================================================= */
  _buildFoot: function () {
    var api = this.api, self = this, foot = api.el('div', 'nsv-foot');

    var sh = api.el('button', 'nsv-chip');
    sh.type = 'button';
    sh.setAttribute('data-fk', 'chip:shuffle');
    sh.textContent = api.t('shuffleBtn');
    sh.addEventListener('click', function () {
      self.st = self.shuffle(self.st);
      self._dying = null;
      self._focusNext = 'chip:shuffle';
      self.render();
    });
    foot.appendChild(sh);
    this._shuffleEl = sh;

    var again = api.el('button', 'nsv-chip');
    again.type = 'button';
    again.setAttribute('data-fk', 'chip:again');
    again.textContent = api.t('startAgain');
    again.addEventListener('click', function () { self._focusNext = 'chip:again'; self.reset(); });
    foot.appendChild(again);
    this._againEl = again;

    /* SAVING IS THE GATE; BUILDING IS FREE. The recorded anti-pattern is
       gating the first affordance — a teacher who cannot build a board in
       week one never reaches the library. She can build any board she
       likes for nothing; keeping the list is the subscription.
       (heart-words:1809, and its string says exactly this.) */
    var save = api.el('button', 'nsv-chip');
    save.type = 'button';
    save.setAttribute('data-fk', 'chip:save');
    save.textContent = api.t('saveBtn');
    save.addEventListener('click', function () { self._saveBoard(); });
    foot.appendChild(save);
    this._saveEl = save;

    /* Ctrl+P reaches whatever is in the DOM, so the free visitor's sheet
       has to be a real one: the child field prints for everybody, and the
       two teacher pages are simply not built without a subscription. */
    var pr = api.el('button', 'nsv-chip');
    pr.type = 'button';
    pr.setAttribute('data-fk', 'chip:print');
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () { window.print(); });
    foot.appendChild(pr);

    var g = api.el('div', 'nsv-gate');
    var sp = api.el('span');
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-number-sieve';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    a.setAttribute('data-fk', 'chip:unlock');
    /* TWO NODES, NEVER A CONCATENATION — the recorded localisation smell,
       and joining them makes the one actionable thing unclickable. */
    g.appendChild(sp);
    g.appendChild(a);
    this._gateEl = g;
    this._gateTextEl = sp;
    if (this._mainEl) this._mainEl.appendChild(g);
    else foot.appendChild(g);
    return foot;
  },

  _paintFoot: function () {
    var api = this.api;
    if (this._shuffleEl) this._shuffleEl.disabled = !(this.st.clues.length > 1 && this.st.turned > 0);
    if (this._againEl) this._againEl.disabled = !(this.st.markers.length || this.st.turned > 0 || this._picking || this.st.chosen > -1);
    if (this._saveEl) {
      this._saveEl.disabled = !this.st.clues.length || this._isSaved();
      this._saveEl.textContent = this._isSaved() ? api.t('savedBtn') : api.t('saveBtn');
      this._saveEl.classList.toggle('nsv-locked', !this.premium);
    }
    if (this._gateEl) {
      this._gateEl.style.setProperty('display', this._gate ? 'flex' : 'none');
      if (this._gateTextEl) this._gateTextEl.textContent = api.t(this._gateReason === 'save' ? 'gateSave' : 'gateLine');
    }
  },

  /* ---- saved boards (heart-words:1810-1818 shape) ----------------- */
  MAX_SAVED: 40,
  /* ⚠ TOTAL, because `boardsFor` is reachable before `init` has run — the
     gate calls it on a bare object and the shipped shape threw. "A model
     is only TOTAL if it is total": `this._store` is undefined until init,
     and `undefined.saved` is not a graceful empty list. */
  _savedList: function () {
    var s = this._store && this._store.saved;
    return (s && s.length) ? s : [];
  },
  _boardKey: function (st) { return st.field + ':' + this._deckSeed(st.clues); },
  _isSaved: function () {
    var k = this._boardKey(this.st), l = this._savedList(), i;
    for (i = 0; i < l.length; i++) if (l[i].k === k) return true;
    return false;
  },
  _saveBoard: function () {
    if (!this.st.clues.length) return;
    if (!this.premium) { this._showGate('save'); return; }
    var l = this._savedList().slice();
    var k = this._boardKey(this.st), i;
    for (i = 0; i < l.length; i++) if (l[i].k === k) return;
    l.push({ k: k, id: 'my:' + k, range: this.st.field, clues: this._sanitiseClues(this.st.clues) });
    while (l.length > this.MAX_SAVED) l.shift();
    this._store.saved = l;
    this._saveStore();
    this.api.sound(720);
    this._focusNext = 'chip:save';
    this.render();
  },
  /* ⚠ NEVER TRUST WHAT COMES BACK OUT OF localStorage. A clue is six
     shapes of plain data and nothing else; anything that is not one of
     them is dropped rather than fed to `satisfies`. */
  _sanitiseClues: function (cl) {
    var out = [], i, c;
    for (i = 0; i < (cl || []).length; i++) {
      c = cl[i];
      if (!c || typeof c !== 'object') continue;
      if (this.FAMILIES.indexOf(c.f) === -1) continue;
      if (c.f === 'range') out.push({ f: 'range', op: c.op === 'ge' ? 'ge' : 'le', a: Math.round(Number(c.a)) || 0 });
      else if (c.f === 'parity') out.push({ f: 'parity', r: c.r ? 1 : 0 });
      else if (c.f === 'multiple') out.push({ f: 'multiple', m: Math.round(Number(c.m)) || 2, keep: !!c.keep });
      else if (c.f === 'digit') out.push({ f: 'digit', place: c.place === 'tens' ? 'tens' : 'ones', d: Math.round(Number(c.d)) || 0, keep: !!c.keep });
      else if (c.f === 'quantity') out.push({ f: 'quantity', op: c.op === 'gt' ? 'gt' : 'lt', q: Math.round(Number(c.q)) || 0 });
      else if (c.f === 'nearer') out.push({ f: 'nearer', a: Math.round(Number(c.a)) || 0, b: Math.round(Number(c.b)) || 0 });
    }
    return out;
  },

  _showGate: function (why) {
    var self = this;
    this._gate = true;
    this._gateReason = why || 'library';
    this.render();
    this._after(6000, function () { self._gate = false; if (self._wrap) self.render(); });
  },

  /* =================================================================
     THE PRINT SHEETS.
     The shipped print block hid the bar, the foot and THE DECK, then
     photographed the live field — so on a finished board the page a class
     took away carried one lit cell, which is THE ANSWER, from a tool
     built so carefully that the answer throws when you ask for it in
     code. It also left `.nsv-hint` and `.lcs-header` on the page, because
     lcs-shell.css ships no print rules at all.

     Three sheets, and the first one is free:
       (1) THE CHILD SHEET — a blank field and four empty numbered boxes.
           The child COPIES each card face into box n as it turns, and
           crosses out on their own field. Copying the face IS the
           read-the-card work: it is the paper half of invention 1, and it
           turns twenty-five spectators into twenty-five participants.
           ⚠ The cards are NEVER pre-printed face-up — that hands the
           whole deck over and ends the routine in thirty seconds.
       (2) THE TEACHER RECORD — the faces in order, each above a thumbnail
           of the field after that card, so the narrowing shape is visible
           and the board is reusable. Still no survivors.
       (3) THE CARD SET — the faces on a cut grid, so a table can run the
           routine on paper.
     ⚠ AND NOTHING ON ANY OF THEM IS A background-color. The darkening is
     the entire record of what the lesson did, and with no
     print-color-adjust Chrome throws backgrounds away by default — so it
     is drawn as a foreground STRIKE, which survives a photocopier too.
     ================================================================= */
  _buildSheet: function () {
    var api = this.api, sheet = api.el('div', 'nsv-sheet');
    sheet.setAttribute('aria-hidden', 'true');
    sheet.appendChild(this._sheetChild());
    if (this.premium) {
      sheet.appendChild(this._sheetRecord());
      sheet.appendChild(this._sheetCards());
    }
    return sheet;
  },

  _sheetField: function (upto, small) {
    var api = this.api;
    var g = api.el('div', 'nsv-pgrid' + (small ? ' nsv-psmall' : ''));
    g.style.setProperty('--nsv-cols', String(this.COLS[this.st.field] || 10));
    var live = {}, alive = (upto === null) ? this.allNumbers(this.st.field) : this.survivorsAfter(this.st, upto), i;
    for (i = 0; i < alive.length; i++) live[alive[i]] = 1;
    var nums = this.allNumbers(this.st.field);
    for (i = 0; i < nums.length; i++) {
      var c = api.el('span', 'nsv-pcell' + (live[nums[i]] ? '' : ' nsv-pout'));
      c.textContent = String(nums[i]);
      g.appendChild(c);
    }
    return g;
  },

  _sheetChild: function () {
    var api = this.api, p = api.el('div', 'nsv-page');
    p.appendChild(this._sheetField(null, false));
    var row = api.el('div', 'nsv-pboxes'), i;
    for (i = 0; i < this.st.clues.length; i++) {
      var b = api.el('div', 'nsv-pbox');
      var n = api.el('span', 'nsv-pboxn');
      n.textContent = String(i + 1);
      b.appendChild(n);
      row.appendChild(b);
    }
    p.appendChild(row);
    return p;
  },

  _sheetRecord: function () {
    var api = this.api, p = api.el('div', 'nsv-page nsv-pbreak'), i;
    var row = api.el('div', 'nsv-prec');
    for (i = 0; i < this.st.clues.length; i++) {
      var col = api.el('div', 'nsv-preccol');
      var face = api.el('div', 'nsv-pface');
      face.appendChild(this._cardFace(this.st.clues[i]));
      col.appendChild(face);
      col.appendChild(this._sheetField(i + 1, true));
      row.appendChild(col);
    }
    p.appendChild(row);
    return p;
  },

  _sheetCards: function () {
    var api = this.api, p = api.el('div', 'nsv-page nsv-pbreak');
    var grid = api.el('div', 'nsv-pcards'), i;
    var demo = [
      { f: 'parity', r: 0 }, { f: 'parity', r: 1 },
      { f: 'multiple', m: 2, keep: true }, { f: 'multiple', m: 3, keep: true },
      { f: 'multiple', m: 5, keep: true }, { f: 'multiple', m: 10, keep: true },
      { f: 'digit', place: 'ones', d: 0, keep: true }, { f: 'digit', place: 'tens', d: 3, keep: true },
      { f: 'range', op: 'ge', a: 50 }, { f: 'range', op: 'le', a: 50 },
      { f: 'quantity', op: 'gt', q: 10 }, { f: 'nearer', a: 20, b: 40 }
    ];
    for (i = 0; i < demo.length; i++) {
      var c = api.el('div', 'nsv-pcard');
      c.appendChild(this._cardFace(demo[i]));
      grid.appendChild(c);
    }
    p.appendChild(grid);
    return p;
  }
};
/* =====================================================================
   THE STYLESHEET

   ⭐⭐ THE PALETTE WAS MEASURED BEFORE ANY OF THIS WAS WRITTEN, and the
   measurement is the reason most of it looks the way it does. WCAG
   relative luminance across the suite's colours:

       cream  #FBF3E4  L .902        amber #F2C879  L .616
       slate  #C7CFCD  L .612        strip #E8E1D2  L .757
       teal   #146B5E  L .115        deep  #0E5147  L .064

   Every meaning-bearing boundary in the shipped tool sat between two of
   the three LIGHT values:

       the lit-versus-dark step (the entire lesson)      1.44 : 1
       the committed marker against the field            1.43 : 1
       the next card's ring                              1.43 : 1
       the "survives" half against its own strip         1.21 : 1
       amber on deep teal                                5.82 : 1  UNUSED

   WCAG asks 3:1 of a non-text graphic. The one step this whole
   instrument exists to show failed it by more than two-fold, while the
   only strong pair in the palette was not used anywhere. On a monitor
   these read; at four metres on a washed-out projector they are not
   faint distinctions, they are no distinction — and lit-versus-dark is
   what the class stares at for fifty-nine of every sixty seconds.

   Two fixes, and neither introduces a hue:
     1. THE DEAD CELL GETS A SECOND CHANNEL — a 45 degree hatch in deep
        teal, so the difference is TEXTURE as well as tone. That is the
        recorded "differ in KIND, not hue" lesson applied to VALUE, and
        it survives a projector, a photocopier and colour-blindness. The
        hatch line is 5.78:1 against the lit cell on its own.
     2. AMBER MOVES ONTO DEEP TEAL. The card's bar is now a deep-teal
        ground and the surviving span is amber ON it — 5.82:1, using the
        pair the palette already owned.
   Coral stays reserved for the locked affordance, as everywhere else in
   the suite, so nothing here reads as a verdict.

   ⚠ TWO TAP FLOORS, MEASURED SEPARATELY AND NEITHER MOVES: every CONTROL
   holds 44px; a FIELD CELL is canvas and holds 34px. Collapsing them
   into one number is how a real defect gets waved through.
   ⚠ Never an inline `background` SHORTHAND: it resets background-image
   and beats the stylesheet. The dark state is a CLASS, and its hatch is
   a background-IMAGE longhand.
   ⚠ `vh` is forbidden inside a manipulative — the iframe grows to its
   content, so a vh rule is a feedback loop the shell has no path for.
   ===================================================================== */
function injectNumberSieveCSS() {
  if (document.getElementById('nsv-style')) return;
  var css = ''
    + '.nsv-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
    + '.nsv-bar,.nsv-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    /* --- the three kinds of control, drawn as three kinds of object --- */
    + '.nsv-seg{display:inline-flex;border:2px solid #146B5E;border-radius:15px;padding:2px;gap:2px;background-color:#FBF3E4;}'
        /* ⚠ 44, NOT 40. The segmented control is still a CONTROL, and the
       tap floor does not soften because three of them share a border.
       local-test measured 40px and refused it — the threshold is the
       thing that never moves. */
    + '.nsv-segbtn{min-height:44px;padding:6px 12px;border:0;border-radius:11px;background-color:transparent;'
    +   'color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;cursor:pointer;}'
    + '.nsv-segbtn.nsv-on{background-color:#146B5E;color:#FBF3E4;}'
    + '.nsv-chip{min-height:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;background-color:#FBF3E4;'
    +   'color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;cursor:pointer;'
    +   'display:inline-flex;align-items:center;gap:6px;}'
    + '.nsv-chip[disabled]{opacity:.45;cursor:default;}'
    /* armed is a DASHED outline, never the segmented control fill:
       "New cards is armed" and "1-100 is selected" are different facts */
    + '.nsv-act.nsv-armed{border-style:dashed;border-color:#0E5147;}'
    + '.nsv-chip.nsv-locked{border-color:#F2784B;color:#C2562F;}'
    + '.nsv-acts{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;}'
    /* ⚠ SCOPED, NOT BARE. `.nsv-actg{width:18px}` and `.nsv-svg{width:100%}`
       have the same specificity, and the generic rule is declared later in
       this string — so the later one won and both action glyphs rendered
       at full card size, roughly 400x450px, shoving the whole apparatus
       1400px down the page. Two rules of equal weight in one stylesheet
       are decided by ORDER, which is a fragile thing to depend on; a
       descendant selector settles it by weight instead. */
    + '.nsv-act .nsv-actg{width:18px;height:18px;flex:0 0 auto;}'
    /* --- the family toggles: the card faces themselves --- */
    + '.nsv-fams{display:inline-flex;flex-wrap:wrap;justify-content:center;gap:4px;}'
    + '.nsv-fam{min-height:44px;min-width:44px;width:44px;height:44px;padding:3px;border-radius:11px;'
    +   'border:2px solid rgba(20,107,94,.30);background-color:#FBF3E4;cursor:pointer;opacity:.42;}'
    + '.nsv-fam.nsv-on{opacity:1;border-color:#146B5E;}'
    + '.nsv-fam.nsv-na{opacity:.16;cursor:default;}'
    + '.nsv-fam .nsv-glyph{width:100%;height:100%;}'
    + '.nsv-lenbtn{padding:4px 6px;min-width:44px;min-height:44px;}'
    + '.nsv-lenbtn .nsv-svg{width:26px;height:26px;flex:0 0 auto;}'
    /* ⚠ THE SELECTED LENGTH WAS INVISIBLE: .nsv-on fills the button teal
       and .nsv-back fills the little card-backs teal, so the chosen
       option — the one a teacher most needs to see — drew teal on teal
       and read as an empty block. Same class as the palette measurement
       that opened this rebuild: a mark is only a mark against its own
       ground. */
    + '.nsv-segbtn.nsv-on .nsv-back{fill:#FBF3E4;}'
    /* --- the library evidence, at the library --- */
    + '.nsv-dots{display:flex;flex-wrap:nowrap;justify-content:center;gap:5px;max-width:190px;overflow:hidden;padding:2px 0;}'
    + '.nsv-dot{width:8px;height:8px;border-radius:50%;background-color:#B4BFBC;flex:0 0 auto;}'
    + '.nsv-dot.nsv-dot-on{background-color:#146B5E;}'
    + '.nsv-track{position:relative;width:120px;height:8px;border-radius:4px;background-color:#DDE3E1;flex:0 0 auto;}'
    + '.nsv-trackfill{position:absolute;top:0;width:14px;height:8px;border-radius:4px;background-color:#146B5E;'
    +   'transform:translateX(-50%);}'
    /* --- the hint reserves its height, so the field does not jump at the
       one moment the class is watching it --- */
    + '.nsv-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:16px;color:#0E5147;'
    +   'min-height:1.5em;line-height:1.5;max-width:640px;margin:0 auto;}'
    + '.nsv-gate{position:absolute;z-index:6;left:50%;top:4px;transform:translateX(-50%);'
    +   'width:min(94%,600px);text-align:center;font-family:Nunito,sans-serif;font-size:15px;line-height:1.4;'
    +   'color:#C2562F;display:none;flex-wrap:wrap;justify-content:center;gap:4px 10px;align-items:center;'
    +   'background-color:#FBF3E4;border:2px solid #F2784B;border-radius:14px;padding:10px 14px;'
    +   'box-shadow:0 6px 18px rgba(14,81,71,.18);}'
    + '.nsv-main{position:relative;}'
    + '.nsv-gate a{color:#C2562F;min-height:44px;display:inline-flex;align-items:center;}'
    /* ⚠ margin:auto ON THE CHILD, never justify-content:center on the
       scroller: centring a flex container that overflows pushes the start
       out of reach, and column one could then not be scrolled to at all. */
    + '.nsv-scroll{width:100%;overflow-x:auto;overflow-y:hidden;display:flex;justify-content:flex-start;}'
    + '.nsv-scroll > .nsv-field{margin:0 auto;}'
    + '.nsv-field{display:grid;grid-template-columns:repeat(var(--nsv-cols,10),var(--nsv-cell));gap:3px;'
    +   '--nsv-cell:clamp(34px,6.4vmin,46px);padding:2px;}'
    + '.nsv-cell{min-width:0;min-height:0;width:var(--nsv-cell);height:var(--nsv-cell);padding:0;margin:0;'
    +   'position:relative;display:flex;align-items:center;justify-content:center;'
    +   'border:2px solid rgba(20,107,94,.22);border-radius:7px;background-color:#FBF3E4;color:#0E5147;cursor:pointer;'
    +   'font-family:Baloo\\ 2,cursive;font-size:calc(var(--nsv-cell)*.46);line-height:1;'
    +   'font-variant-numeric:tabular-nums;'
    +   'transition:background-color .40s var(--lcs-ease,ease-out),color .40s,transform .40s,border-color .40s;}'
    /* ⚠ THE TWELVE-ROW CEILING IS 44, NOT 46, AND THE NUMBER MOVED
       BECAUSE THE BAR DID. 46 was correctly measured for the old bar;
       this rebuild added a family-toggle row and a deck-length control,
       and chrome went from ~300px to a measured 323px. Re-derived at
       1024x900, which is the operator's own viewport:
           12 x 46 + 37 + 323 = 912  CUT OFF (measured, and local-test
                                      refused it)
           12 x 45 + 37 + 323 = 900  exactly on the line
           12 x 44 + 37 + 323 = 888  fits, with margin
       The ten-row field is unaffected (10 x 46 + 31 + 323 = 814), so
       only the densest board pays. A ceiling is a MEASUREMENT, and when
       the thing above it changes size the measurement is re-taken — it
       is not carried forward because it used to be right. */
    + '.nsv-field.nsv-f120{--nsv-cell:clamp(34px,6.4vmin,42px);}'
    + '.nsv-cell.nsv-d3{font-size:calc(var(--nsv-cell)*.42);}'
    + '.nsv-num{position:relative;z-index:1;border-radius:3px;padding:0 .10em;}'
    /* THE DEAD STATE: tone AND texture. The hatch is solid deep teal, so
       the mark alone is 5.78:1 against a lit cell. */
    + '.nsv-cell.nsv-out{background-color:#B4BFBC;color:#33403D;border-color:rgba(14,81,71,.34);'
    +   'background-image:repeating-linear-gradient(45deg,#0E5147 0 1.5px,rgba(0,0,0,0) 1.5px 6px);}'
    + '.nsv-cell.nsv-out .nsv-num{background-color:#DFE5E3;}'
    /* the sink: pure motion and timing, every frame a colour already in
       the palette. SIMULTANEOUS across every cell this card took — a wave
       would assert a traversal order, which refusal 1 forbids. */
    + '.nsv-cell.nsv-dying{transform:scale(.84);}'
    /* the re-look outline: read-only, transient, and nothing else */
    + '.nsv-cell.nsv-look{box-shadow:0 0 0 3px #146B5E;z-index:2;}'
    /* THE MARKER IS A SHAPE, NEVER A COLOUR — colours become teams, and a
       team is one step from a scoreboard. Six shapes, one deep teal. */
    + '.nsv-mkg{display:none;position:absolute;right:2px;bottom:2px;width:34%;height:34%;'
    +   'background-color:#0E5147;pointer-events:none;}'
    + '.nsv-cell.nsv-marked{border-color:#0E5147;}'
    /* the shape says WHICH table; the heavy border says THERE IS ONE —
       a 34%-of-a-34px glyph is about eleven pixels, which identifies a
       marker at arm's length and cannot announce one across a room */
    + '.nsv-cell.nsv-marked .nsv-mkg{display:block;}'
    + '.nsv-cell[data-mk="0"] .nsv-mkg{clip-path:circle(50%);}'
    + '.nsv-cell[data-mk="1"] .nsv-mkg{clip-path:inset(0);}'
    + '.nsv-cell[data-mk="2"] .nsv-mkg{clip-path:polygon(50% 0,100% 100%,0 100%);}'
    + '.nsv-cell[data-mk="3"] .nsv-mkg{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);}'
    + '.nsv-cell[data-mk="4"] .nsv-mkg{clip-path:polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%);}'
    + '.nsv-cell[data-mk="5"] .nsv-mkg{clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);}'
    + '.nsv-main{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;min-width:0;}'
    + '.nsv-deck{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:8px;width:100%;}'
    + '.nsv-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    /* the closing candidates are their own group, visually separated —
       three face-up cards that look exactly like three turned cards are
       not read as a choice */
    + '.nsv-spares{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;'
    +   'padding:6px;border-radius:14px;border:2px dashed rgba(20,107,94,.38);}'
    /* ⚠ 680, NOT 900. Media queries inside an iframe resolve against the
       IFRAME, and the tool page pins every mini-tool at 704px on every
       desktop a teacher owns (measured on production at 1440, 1920 and
       2560 — all three give 704). A 900px breakpoint is decoration: on
       the page teachers actually visit the deck stacked BELOW a
       twelve-row field. Measured at 704: 487 field + 16 gap + 88 deck
       = 591px, which fits. */
    + '@media (min-width:680px){'
    +   '.nsv-main.nsv-tall{flex-direction:row;justify-content:center;align-items:flex-start;gap:16px;}'
    +   '.nsv-tall .nsv-scroll{width:auto;min-width:0;}'
    +   '.nsv-tall .nsv-deck{flex-direction:row;flex-wrap:nowrap;width:auto;flex:0 0 auto;align-items:flex-start;}'
    +   '.nsv-tall .nsv-cards{flex-direction:column;flex-wrap:nowrap;}'
    +   '.nsv-tall .nsv-spares{flex-direction:column;flex-wrap:nowrap;}'
    + '}'
    /* 76x86 against a 64x74 viewBox is exactly 1.00 px per unit, so a
       14px numeral renders at 14px. The old 72x86-against-60x76 scaled by
       .9737 and shipped its two small numerals at 13.63px. */
    + '.nsv-card{min-height:44px;min-width:44px;width:76px;height:86px;padding:4px;border-radius:12px;'
    +   'border:2px solid #146B5E;background-color:#FBF3E4;cursor:pointer;display:flex;align-items:center;'
    +   'justify-content:center;box-sizing:border-box;'
    +   'transition:transform .25s var(--lcs-ease,ease-out),opacity .25s,border-color .25s;}'
    /* ⚠ THE NEXT CARD IS RAISED, NOT RE-COLOURED, and its border changes
       COLOUR rather than WIDTH — box-sizing:border-box means 2px to 3px
       rescales the SVG inside by 3.3%. A raised card is the paper
       metaphor, survives colour-blindness, and needs no ramp. */
    + '.nsv-card.nsv-next{transform:translateY(-8px);border-color:#0E5147;'
    +   'box-shadow:0 6px 0 -2px rgba(14,81,71,.30);}'
    + '.nsv-tall .nsv-card.nsv-next{transform:translateX(-8px);box-shadow:6px 0 0 -2px rgba(14,81,71,.30);}'
    + '.nsv-card.nsv-later{transform:scale(.94);opacity:.62;cursor:default;}'
    + '.nsv-card.nsv-up{cursor:pointer;}'
    + '.nsv-card.nsv-looking{border-color:#0E5147;box-shadow:0 0 0 3px #146B5E;}'
    + '.nsv-card.nsv-spare.nsv-armed{border-color:#0E5147;box-shadow:0 4px 0 -1px rgba(14,81,71,.28);}'
    + '.nsv-card.nsv-chosen{border-color:#0E5147;box-shadow:0 0 0 3px #0E5147;}'
    + '.nsv-svg{width:100%;height:100%;}'
    /* --- the card grammar --- */
    + '.nsv-fbar{fill:#0E5147;}'
    + '.nsv-keep{fill:#F2C879;}'
    + '.nsv-back{fill:#146B5E;}'
    + '.nsv-backcell{fill:#0E5147;}'
    + '.nsv-reserve{fill:#FBF3E4;}'
    + '.nsv-emb{fill:#FBF3E4;}'
    + '.nsv-pip{fill:#146B5E;}'
    + '.nsv-post{fill:#146B5E;}'
    + '.nsv-post-o{fill:#FBF3E4;stroke:#146B5E;stroke-width:2;}'
    + '.nsv-solid{fill:#146B5E;}'
    + '.nsv-hollow{fill:none;stroke:#146B5E;stroke-width:2;}'
    + '.nsv-ord{fill:#0E5147;font-family:Baloo\\ 2,cursive;font-size:22px;}'
    + '.nsv-cnum{fill:#0E5147;font-family:Baloo\\ 2,cursive;font-size:20px;}'
    + '.nsv-cnum-s{fill:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;}'
    /* --- focus. There was no :focus-visible rule anywhere in the shipped
       stylesheet, and cream on cream gives the UA outline almost nothing. */
    + '.nsv-chip:focus-visible,.nsv-segbtn:focus-visible,.nsv-fam:focus-visible,'
    +   '.nsv-card:focus-visible,.nsv-cell:focus-visible,.nsv-gate a:focus-visible'
    +   '{outline:3px solid #146B5E;outline-offset:-2px;}'
    /* --- the print sheets live off-screen until print --- */
    + '.nsv-sheet{display:none;}'
    /* ⭐ AT 360 THE LAST COLUMN WAS OFF-SCREEN AT REST. Ten columns at
       the 34px floor is 340px, and with a 3px gap and 2px padding the
       grid measured 371 against a 336px box — so a phone showed nine
       columns and the tenth had to be discovered by scrolling. The
       floor does NOT move (it is a measured tap target); the gap and
       the padding do: 340 + 9x2 = 358, which fits a 360 viewport whole.
       320 still scrolls, and must — ten 34px columns cannot fit 320px,
       and the honest answer there is a scroller rather than a smaller
       tap target. */
    + '@media (max-width:1400px){'
    +   '.nsv-foot .nsv-chip{font-size:14px;padding:8px 11px;gap:5px;}'
    +   '.nsv-bar{gap:6px;}'
    + '}'
    + '@media (max-width:430px){.nsv-field{gap:2px;padding:0;}}'
    /* twelve rows on a short screen: (880 - 323 chrome - 37 gaps)/12 = 43.3 */
    + + '@media (max-width:560px){body.nsv-wide{overflow-y:auto;}}'
    + '@media (max-width:480px){body.nsv-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
    /* reduced motion COMPRESSES, it does not delete: the going-dark is
       the lesson, and now that it actually fires it is worth protecting */
    + '@media (prefers-reduced-motion:reduce){'
    +   '.nsv-cell{transition-duration:.12s;}.nsv-cell.nsv-dying{transform:none;}'
    +   '.nsv-card{transition-duration:.01s;}'
    + '}'
    /* =====================================================================
       WIDE VIEWPORTS.
       ⚠ THESE SERVE THE FULL-SCREEN LINK, NOT THE LANDING PAGE. The tool
       page caps its iframe at 704px at every desktop width, so nothing
       between 700 and 1367 ever fires there; /mini-tools/number-sieve.html
       is uncapped and is a real surface, which is why they stay.
       MEASURED on the densest board (1-120, twelve rows, German):
           1400x880   cell 46 -> card  878 of  880
           1920x1080  cell 56 -> card 1011 of 1080
           2560x1440  cell 66 -> card 1131 of 1440
       Budgets take the tier's MINIMUM height and the worst chrome:
         rows x cell + (rows-1)x3 + 4 + chrome <= tierMinHeight
       ⚠ THE MIDDLE TERM OF THE CLAMP HAS TO MOVE TOO, or every ceiling
       above it is inert: 6.4vmin computes 56px at an 880px-tall viewport,
       so a 104px ceiling would change nothing. 6.4 is the TWELVE-ROW
       coefficient; ten rows take 7.6 and two rows take 16.
       ⚠ AND THE CHROME RAMPS WITH IT. Chips, hint and gate were fixed at
       15/15/14px in every tier while the numerals reached 36px — the one
       line telling a teacher what to do next stayed the smallest thing on
       a 2560px screen. Projected-1080 rule of thumb: body text >= 24px.
       ===================================================================== */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.nsv-wide .nsv-f20{--nsv-cell:clamp(34px,16vmin,104px);}'
    +   'body.nsv-wide .nsv-f100{--nsv-cell:clamp(34px,7.6vmin,54px);}'
    +   'body.nsv-wide .nsv-f120{--nsv-cell:clamp(34px,6.4vmin,46px);}'
    +   'body.nsv-wide .nsv-card{width:92px;height:104px;}'
    +   'body.nsv-wide .nsv-ord{font-size:26px;}'
    +   'body.nsv-wide .nsv-cnum{font-size:24px;}'
    +   'body.nsv-wide .nsv-cnum-s{font-size:18px;}'
    +   '}'
    /* ⭐ THE CHROME RAMP LIVES HERE, ONE TIER UP, AND THAT IS A MEASURED
       DECISION. See above: 1400x880 is wide enough to trigger a ramp and
       too short to afford one. */
    + '@media (min-width:1367px) and (min-height:1000px){'
    +   'body.nsv-wide .nsv-chip,body.nsv-wide .nsv-segbtn{font-size:17px;min-height:48px;}'
    +   'body.nsv-wide .nsv-hint{font-size:20px;max-width:760px;}'
    +   'body.nsv-wide .nsv-gate{font-size:16px;}'
    +   'body.nsv-wide .nsv-fam{width:52px;height:52px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1000px){'
    +   'body.nsv-wide .nsv-f100{--nsv-cell:clamp(34px,7.6vmin,64px);}'
    +   'body.nsv-wide .nsv-f120{--nsv-cell:clamp(34px,6.4vmin,50px);}'
    +   'body.nsv-wide .nsv-card{width:104px;height:118px;}'
    +   'body.nsv-wide .nsv-ord{font-size:30px;}'
    +   'body.nsv-wide .nsv-cnum{font-size:27px;}'
    +   'body.nsv-wide .nsv-cnum-s{font-size:20px;}'
    +   'body.nsv-wide .nsv-chip,body.nsv-wide .nsv-segbtn{font-size:19px;min-height:54px;}'
    +   'body.nsv-wide .nsv-hint{font-size:24px;max-width:900px;}'
    +   'body.nsv-wide .nsv-gate{font-size:18px;}'
    +   'body.nsv-wide .nsv-fam{width:58px;height:58px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.nsv-wide .nsv-f100{--nsv-cell:clamp(34px,7.6vmin,78px);}'
    +   'body.nsv-wide .nsv-f120{--nsv-cell:clamp(34px,6.4vmin,62px);}'
    +   'body.nsv-wide .nsv-card{width:116px;height:132px;}'
    +   'body.nsv-wide .nsv-ord{font-size:34px;}'
    +   'body.nsv-wide .nsv-cnum{font-size:30px;}'
    +   'body.nsv-wide .nsv-cnum-s{font-size:22px;}'
    +   'body.nsv-wide .nsv-chip,body.nsv-wide .nsv-segbtn{font-size:21px;min-height:60px;}'
    +   'body.nsv-wide .nsv-hint{font-size:28px;max-width:1040px;}'
    +   'body.nsv-wide .nsv-gate{font-size:20px;}'
    +   'body.nsv-wide .nsv-fam{width:64px;height:64px;}'
    + '}'
    /* ⚠ THE TWO-ROW BOARD IS WIDTH-BOUND, so its ceiling keys on the
       CARD's breakpoints, not on this tool's height tiers: the shell
       widens the card at 1367/880 and again at 1800/1150, and a
       width-bound cap keyed on a height tier is a cap keyed on the wrong
       thing (it overflowed at 1920x1080 the first time).
         card 1240 (usable 1192): (1192 - 31)/10 = 116 -> 104
         card 1800 (usable 1752): (1752 - 31)/10 = 172 -> 148              */
    + '@media (min-width:1800px) and (min-height:1150px){'
    +   'body.nsv-wide .nsv-f20{--nsv-cell:clamp(34px,16vmin,148px);}'
    + '}'
    /* =====================================================================
       PRINT.
       ⚠ UNDO THE SHELL FIRST. lcs-shell.css ships NO print block at all,
       so html,body{height:100%;overflow:hidden} and .lcs-app{max-width:
       720px;overflow:hidden} survive into print and clip the sheet to a
       single screenful.
       ⚠ AND NOTHING HERE DEPENDS ON A background-color. Chrome drops
       backgrounds by default and there is no print-color-adjust in this
       file on purpose — a photocopier eats them too. The darkening, which
       is the whole record of what the lesson did, is a foreground STRIKE.
       ===================================================================== */
    + '@media print{'
    +   'html,body{height:auto !important;overflow:visible !important;background:#fff !important;}'
    +   '.lcs-app{height:auto !important;max-width:none !important;overflow:visible !important;'
    +     'box-shadow:none !important;border-radius:0 !important;background:#fff !important;}'
    +   '.lcs-header,.lcs-controls,.lcs-bar,.lcs-drawer,.lcs-drawer-scrim,.lcs-instruction{display:none !important;}'
    +   '.nsv-bar,.nsv-foot,.nsv-deck,.nsv-hint,.nsv-gate,.nsv-main{display:none !important;}'
    +   '.nsv-sheet{display:block !important;}'
    +   '@page{size:A4 portrait;margin:12mm;}'
    +   '.nsv-page{page-break-inside:avoid;}'
    +   '.nsv-pbreak{break-before:page;page-break-before:always;}'
    +   '.nsv-pgrid{display:grid;grid-template-columns:repeat(var(--nsv-cols,10),14mm);gap:0;margin:0 auto;width:max-content;}'
    +   '.nsv-psmall{grid-template-columns:repeat(var(--nsv-cols,10),4.6mm);}'
    +   '.nsv-pcell{position:relative;width:14mm;height:14mm;border:0.3mm solid #333;display:flex;'
    +     'align-items:center;justify-content:center;font-family:Nunito,sans-serif;font-size:4.6mm;color:#000;}'
    +   '.nsv-psmall .nsv-pcell{width:4.6mm;height:4.6mm;font-size:0;border-width:0.15mm;}'
    /* the strike is a real drawn line, not a fill a printer can discard */
    +   '.nsv-pout::after{content:"";position:absolute;left:8%;right:8%;top:48%;height:0.5mm;background:#000;}'
    +   '.nsv-psmall .nsv-pout::after{left:0;right:0;top:45%;height:0.4mm;}'
    +   '.nsv-pboxes{display:flex;gap:6mm;margin-top:8mm;justify-content:center;}'
    +   '.nsv-pbox{position:relative;width:25mm;height:32mm;border:0.4mm solid #333;border-radius:2mm;}'
    +   '.nsv-pboxn{position:absolute;top:1mm;left:2mm;font-family:Nunito,sans-serif;font-size:4mm;color:#333;}'
    +   '.nsv-prec{display:flex;gap:6mm;justify-content:center;align-items:flex-start;flex-wrap:wrap;}'
    +   '.nsv-preccol{display:flex;flex-direction:column;align-items:center;gap:3mm;}'
    +   '.nsv-pface{width:30mm;height:34mm;}'
    +   '.nsv-pcards{display:grid;grid-template-columns:repeat(4,45mm);gap:3mm;justify-content:center;}'
    +   '.nsv-pcard{width:45mm;height:58mm;border:0.4mm dashed #666;border-radius:2mm;padding:2mm;box-sizing:border-box;}'
    + '}';
  var s = document.createElement('style');
  s.id = 'nsv-style';
  s.textContent = css;
  document.head.appendChild(s);
}
