/* =====================================================================
   TOOL #36 — THE NUMBER SIEVE   (number-sieve.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #1. Catalog slot A1.

   THE FIELD · THE CLUE CARD · THE SURVIVORS. Three named parts, and
   nothing else in this tool gets a noun.

   THE ROUTINE, which is what makes this an instrument and not a puzzle:
     "Park your number. Turn the first card. What went dark?"
     ... and then the move that matters, with three still alight:
     "What would a card have to take away to leave just one?"

   THE ONE THESIS — THE CLUE IS ENACTED, NEVER STATED. The card does not
   say "even numbers". It ACTS on the field, and the class reads the rule
   off the pattern of what died. That removes 100% of the language and
   turns a comprehension task into a reasoning task.

   THREE INVENTIONS:
     1. THE CLUE IS ENACTED. Nothing on screen names a rule, ever. A
        clue card carries an icon and a numeral and nothing else, and the
        aria label is POSITIONAL ("clue card 2") so the a11y path cannot
        leak what the sighted class is still working out.
     2. ORDER DOES NOT MATTER, AND THE CLASS CAN TEST THAT. Scramble the
        deck and the survivors are byte-identical. `verify` proves it over
        every permutation of every board; nothing else on the platform
        lets a class check that a conclusion is independent of the road
        taken to it.
     3. THE MARKER IS COMMITTED. A child parks a marker BEFORE the first
        card turns, and from that instant it cannot be moved. When its
        number goes dark the material evicts it — a movement, never a
        verdict. (Only paper does this today.)

   ⚠ THE FENCE — FOUR SURFACES, and the first one is the tight one.
   `choral-counting.js` owns a number grid, a Columns chip (:47, :584)
   and an ones/tens digit tint (:1070) — but its cells have exactly two
   states, inked and not-yet-inked, and `_setCfg({cols})` -> `_resetCount`
   -> `this.inked = 0` (:620, :394) proves its grid is a live TRANSCRIPT
   that accumulates. This field is a standing POPULATION that depletes.
   The two grids are opposite objects.
   `sorting-hoops.js` owns the hidden rule and the self-evicting material
   — on logic blocks and picture cards, judging MEMBERSHIP in a region,
   never numbers and never removal.
   `estimation-jar.js` (:158 revealedCount throws) and
   `number-talk-easel.js` (:22 the numeral-leak gate) own the two shipped
   concealment disciplines — but each conceals ONE quantity behind ONE
   reveal and BOTH eventually announce it. This conceals a PREDICATE and
   announces nothing.
   `wodb.js` owns curated repertoire and the sole ISO-week rotation
   (:183) — deliberately NOT copied here, it is that tool's signature.
   `open-number-line.js` is the exact inverse: an empty line the child
   fills, against a full field the clues empty.
   Activities: `choice-board.even-odd.2-oa-c-3` shows one numeral and
   grades a two-word tile tap. `pip-museum -> exclude-mystery` is the
   nearest NAME and it is shapes, and graded.
   Printables: `G1-130-chart-skip-count-color` lays a multiples comb on a
   1-100 chart — and its own gate asserts "chart must be complete —
   nothing blank" (:47), the exact structural inverse. `G1-129` blanks
   cells to be RESTORED, by `rng.sample`, with no rule and no reason.
   REFERENCE APPS: "cross out" is always picture take-away; "mystery" is
   always cipher decoding. Empty.

   REFUSES, FOREVER — four structural refusals, each one gated:
     1. NEVER INK A SEQUENCE. Every cell exists from t=0; the only
        permitted transition is lit -> dark. No next, no traversal order.
     2. NEVER A COLUMNS CONTROL, and no control may reset the field.
        Width is bound to the range, full stop — so choral-counting's
        most visible chip has no twin here, and the Hundred Field
        (catalog A7), whose whole thesis is changing the width, is not
        cannibalised.
     3. NEVER TINT BY PLACE VALUE. The digit card darkens WHOLE CELLS. It
        must never colour a digit inside a numeral: `.cc-dg-ones`/
        `.cc-dg-tens` and place-value-lab's PV_WORD_SPANS jointly own
        per-place digit colouring across two shipped tools already.
     4. NEVER NAME THE CLUE, NEVER ANNOUNCE THE SURVIVORS, NEVER GRADE.
        No < or > glyph, no "even"/"odd" wording, no survivor count, no
        reveal that states the rule in prose, no timer, no tries counter.
        An evicted marker is a fact about the field: never red, never
        ticked, never ranked, never tallied.
   Also: no score, no streak, no stars. No verdict colour anywhere — the
   dark state is a desaturated slate, and coral is reserved for the
   locked/premium affordance as everywhere else in the suite.

   ⚠ THE REPERTOIRE CARRIES NO AUTHORED TEXT, and that is the moat made
   mechanical. wodb-grids.json is 84,734 bytes for 21 grids because every
   grid carries an 11-locale title AND four 11-locale reasons — which is
   exactly why that library is stuck at 21. A board here is a range, a
   clue list and a target. Validity is ARITHMETIC, so the library can be
   machine-grown and machine-proven, which a judgement-validated
   repertoire never can.

   ⚠ NO SPEECH, DELIBERATELY. LCSAudio never calls getVoices() and
   silently substitutes a missing voice, and TTS is reliable in only 5 of
   11 locales. A tool whose meaning depended on hearing would be broken
   in more than half the catalog, so this one is legible with the sound
   off. There is no number-word table here and no drift gate, because
   nothing is ever spoken.
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
    title:        { en: "The Number Sieve", de: "Das Zahlensieb", fr: "La grille qui s’éteint", es: "El colador de números", pt: "Peneira dos números", it: "Il setaccio dei numeri", nl: "De getallenzeef", sv: "Talsållet", da: "Talsien", no: "Tallsilen", fi: "Lukuseula" },
    instruction:  { en: "Now turn a card and watch the field.", de: "Legt euer Plättchen auf eine Zahl. Dann dreht eine Karte um und schaut aufs Feld.", fr: "Retournez une carte, puis regardez ce qui s’éteint.", es: "Coloquen su ficha en el número que creen que es. Luego volteen una tarjeta y miren la cuadrícula.", pt: "Cada um coloca a ficha no número que imagina. Depois virem uma carta e vejam quais números saíram.", it: "Ora girate una carta e guardate il tabellone. Da qui il segnalino resta dov’è.", nl: "Draai nu een kaart om en kijk goed naar het veld.", sv: "Nu ligger brickan. Vänd ett kort och titta på fältet.", da: "Sæt din brik. Vend så et kort, og hold øje med feltet.", no: "Sett ut brikken din. Snu så et kort, og følg med på feltet.", fi: "Nappula on paikallaan. Käännä kortti ja katso ruudukkoa." },
    tryAnother:   { en: "Turn the cards in another order.", de: "Dreht die Karten in einer anderen Reihenfolge um.", fr: "Reprenez les mêmes cartes dans un autre ordre.", es: "Volteen las tarjetas en otro orden.", pt: "Virem as cartas em outra ordem.", it: "Girate le carte in un altro ordine e guardate che cosa resta acceso.", nl: "Draai de kaarten eens in een andere volgorde om.", sv: "Vänd korten i en annan ordning.", da: "Vend kortene i en anden rækkefølge.", no: "Snu kortene i en annen rekkefølge.", fi: "Käännä kortit toisessa järjestyksessä." },
    fieldLabel:   { en: "Field", de: "Zahlenraum", fr: "La grille des nombres", es: "Cuadrícula", pt: "Quadro numérico", it: "Tabellone", nl: "Getallenveld", sv: "Talområde", da: "Talfeltet", no: "Tallfeltet", fi: "Lukualue" },
    pickHint:     { en: "Tap a number to make a new set of cards.", de: "Tippt eine Zahl an, dann gibt es neue Karten.", fr: "Touchez un nombre pour construire de nouvelles cartes autour de lui.", es: "Toquen un número para armar tarjetas nuevas.", pt: "Toquem em um número para montar cartas novas.", it: "Toccate un numero per avere carte nuove.", nl: "Tik op een getal voor nieuwe kaarten.", sv: "Tryck på ett tal för att få nya kort.", da: "Tryk på et tal for at få nye kort.", no: "Trykk på et tall for å få nye kort.", fi: "Napauta lukua, niin saat uudet kortit." },
    parkHint:     { en: "Tap a number to park your marker.", de: "Tippt eine Zahl an und legt euer Plättchen darauf.", fr: "Posez votre pion sur un nombre. Ensuite il ne bougera plus.", es: "Toquen un número para colocar su ficha.", pt: "Toquem em um número para colocar a ficha.", it: "Toccate un numero per mettere il segnalino.", nl: "Leg je fiche neer: tik op een getal.", sv: "Tryck på ett tal och lägg din bricka där.", da: "Tryk på et tal for at sætte din brik.", no: "Trykk på et tall for å sette brikken din.", fi: "Napauta lukua ja aseta nappulasi siihen." },
    newSet:       { en: "New cards", de: "Neue Karten", fr: "Nouvelles cartes", es: "Tarjetas nuevas", pt: "Cartas novas", it: "Carte nuove", nl: "Nieuwe kaarten", sv: "Nya kort", da: "Nye kort", no: "Nye kort", fi: "Uudet kortit" },
    shuffleBtn:   { en: "Shuffle the cards", de: "Karten mischen", fr: "Mélanger les cartes", es: "Revolver las tarjetas", pt: "Embaralhar", it: "Mescola le carte", nl: "Kaarten schudden", sv: "Blanda korten", da: "Bland kortene", no: "Stokk kortene", fi: "Sekoita kortit" },
    startAgain:   { en: "Start again", de: "Neu anfangen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Começar de novo", it: "Ricomincia", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" },
    libraryBtn:   { en: "The library", de: "Die Kartei", fr: "La bibliothèque de grilles", es: "La colección", pt: "Quadros prontos", it: "Tabelloni pronti", nl: "De kaartenbak", sv: "Samlingen", da: "Samlingen", no: "Samlingen", fi: "Kokoelma" },
    printBtn:     { en: "Print the field", de: "Zahlenfeld drucken", fr: "Imprimer la grille", es: "Imprimir la cuadrícula", pt: "Imprimir o quadro", it: "Stampa il tabellone", nl: "Getallenveld afdrukken", sv: "Skriv ut fältet", da: "Udskriv feltet", no: "Skriv ut feltet", fi: "Tulosta ruudukko" },
    gateLine:     { en: "The library and printing are part of the teacher plan.", de: "Die Kartei und das Drucken gehören zum Lehrer-Paket.", fr: "La bibliothèque de grilles et l’impression font partie de l’offre Enseignant.", es: "La colección y la impresión son parte del plan Docente.", pt: "Os quadros prontos e a impressão fazem parte do plano Professor.", it: "I tabelloni pronti e la stampa fanno parte del piano Insegnante.", nl: "De kaartenbak en het afdrukken horen bij het Leerkracht-pakket.", sv: "Samlingen och utskrifterna ingår i Lärarpaketet.", da: "Samlingen og udskrivning er en del af Lærerabonnementet.", no: "Samlingen og utskrift er en del av Lærerabonnementet.", fi: "Kokoelma ja tulostus kuuluvat Opettaja-tilaukseen." },
    unlock:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Vedi il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" },
    cellAria:     { en: "{n}", de: "{n}", fr: "{n}", es: "{n}", pt: "{n}", it: "{n}", nl: "{n}", sv: "{n}", da: "{n}", no: "{n}", fi: "{n}" },
    cellOutAria:  { en: "{n}, out", de: "{n}, aus", fr: "{n}, éteint", es: "{n}, apagado", pt: "{n}, fora", it: "{n}, fuori", nl: "{n}, eruit", sv: "{n}, borta", da: "{n}, slukket", no: "{n}, slukket", fi: "{n}, poissa" },
    markerAria:   { en: "your marker is on {n}", de: "euer Plättchen liegt auf {n}", fr: "votre pion est sur {n}", es: "tu ficha está en {n}", pt: "sua ficha está em {n}", it: "il tuo segnalino è su {n}", nl: "je fiche ligt op {n}", sv: "din bricka ligger på {n}", da: "din brik står på {n}", no: "brikken din står på {n}", fi: "nappulasi on luvun {n} kohdalla" },
    cardAria:     { en: "clue card {i}", de: "Hinweiskarte {i}", fr: "carte-indice {i}", es: "tarjeta de pista {i}", pt: "carta de pista {i}", it: "carta indizio {i}", nl: "aanwijzingskaart {i}", sv: "ledtrådskort {i}", da: "ledetrådskort {i}", no: "sporkort {i}", fi: "vihjekortti {i}" },
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

  newState: function () {
    return {
      field: this.DEFAULT_FIELD,
      clues: [],        /* the deck, in the order it will be turned */
      turned: 0,        /* how many have been turned; only ever grows */
      target: null,     /* the number the deck isolates */
      marker: null,     /* the committed guess, or null */
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
      marker: s.marker,
      committed: !!s.committed
    };
  },

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
    /* ⚠ INVENTION 3: committed means committed. Once a card has turned
       the marker cannot move, so its eviction is a fact about the field
       rather than a change of mind. */
    if (s.committed) return s;
    var v = Math.round(Number(n));
    if (!isFinite(v) || v < 1 || v > s.field) return s;
    s.marker = v;
    return s;
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
    s.marker = null;
    s.committed = false;
    return s;
  },

  /* Deck order is a rotation of the authored order — deterministic, no
     Math.random anywhere in the model (gate N14). Rotating cannot change
     the survivors, which is exactly the property invention 2 rests on. */
  shuffle: function (st) {
    var s = this._clone(st);
    if (s.clues.length < 2) return s;
    s.clues = s.clues.slice(1).concat(s.clues.slice(0, 1));
    s.turned = 0;
    s.committed = false;
    return s;
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

  universe: function (field) {
    var f = this.allNumbers(field).length, step = this.COARSE(field), out = [], a, b, m, d;
    for (a = step; a <= f - 1; a += step) { out.push({ f: 'range', op: 'ge', a: a }); out.push({ f: 'range', op: 'le', a: a }); }
    out.push({ f: 'parity', r: 0 });
    out.push({ f: 'parity', r: 1 });
    for (m = 2; m <= 5; m++) { out.push({ f: 'multiple', m: m, keep: true }); out.push({ f: 'multiple', m: m, keep: false }); }
    out.push({ f: 'multiple', m: 10, keep: true });
    out.push({ f: 'multiple', m: 10, keep: false });
    for (d = 0; d <= 9; d++) {
      out.push({ f: 'digit', place: 'ones', d: d, keep: true });
      out.push({ f: 'digit', place: 'ones', d: d, keep: false });
      if (f > 20) { out.push({ f: 'digit', place: 'tens', d: d, keep: true }); out.push({ f: 'digit', place: 'tens', d: d, keep: false }); }
    }
    for (a = 2; a <= Math.min(this.MAX_DOTS, f - 1); a++) { out.push({ f: 'quantity', op: 'gt', q: a }); out.push({ f: 'quantity', op: 'lt', q: a }); }
    for (a = step; a <= f - step; a += step) {
      for (b = a + step; b <= f; b += step) out.push({ f: 'nearer', a: a, b: b });
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

  buildFor: function (field, target, want) {
    var i, got;
    if (want) return this._search(field, target, want);
    for (i = 0; i < this.AIM_LADDER.length; i++) {
      got = this._search(field, target, this.AIM_LADDER[i]);
      if (got) return got;
    }
    return null;
  },

  _search: function (field, target, want) {
    var all = this.allNumbers(field);
    var t = Math.round(Number(target));
    if (all.indexOf(t) === -1) return null;
    var aim = Math.round(Number(want)) || this.AIM_CARDS;
    if (aim < 2) aim = 2;
    if (aim > this.MAX_CARDS) aim = this.MAX_CARDS;
    var uni = this.universe(field), keepers = [], i;
    for (i = 0; i < uni.length; i++) if (this.satisfies(uni[i], t)) keepers.push(uni[i]);

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
    return pruned;
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
    s.marker = null;
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
  setTarget: function (st, n) {
    var s = this._clone(st);
    var built = this.buildFor(s.field, n);
    if (!built) return null;
    s.clues = built;
    s.target = Math.round(Number(n));
    s.turned = 0;
    s.marker = null;
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
  FALLBACK_BOARDS: {
    version: 1,
    freeMax: 8,
    premiumMax: 300,
    boards: []
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

  /* locked boards are ABSENT from the array, never merely hidden */
  boardsFor: function () {
    var all = (this.data && this.data.boards) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
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
    this._fetchBoards();
    this._fetchEntitlement();
    this.render();
  },

  reset: function () {
    this.st = this.newState();
    this._boardIdx = 0;
    this._picking = null;
    this.data = this.data || null;
    this._ensureDeck();
    this.render();
  },

  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    document.body.classList.remove('nsv-wide');
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    /* ⚠ locking a control is not enough — reset the STATE it produced.
       If we learn the account is free while a premium board is on the
       mat, take the board off. (pattern-bench:290) */
    /* ⚠ BY ID, NEVER BY TARGET. The first cut compared the open boards'
       targets against the one on the mat — which put the answer into the
       render path, and gate N9 refused it. The board's id is the honest
       key here and the field stays blind to what it is converging on. */
    if (this.premiumKnown && !this.premium && this._fromLibrary && this._boardId) {
      var open = this.boardsFor(), i, stillOpen = false;
      for (i = 0; i < open.length; i++) if (open[i].id === this._boardId) stillOpen = true;
      if (!stillOpen) {
        this._boardIdx = 0;
        this._boardId = open.length ? open[0].id : null;
        this.st = open.length ? this.loadBoard(this.st, open[0]) : this.newState();
      }
    }
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'nsv-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    /* ⚠ FIELD AND DECK ARE SIBLINGS IN ONE ROW SO THEY CAN SIT SIDE BY
       SIDE ON A BOARD. Stacked, the 1-120 field plus the deck stood 942px
       tall and ran past the fold at the operator's own viewport. Beside
       each other the class sees the cards and what they did to the field
       in one glance, which is also the better arrangement. */
    /* ⚠ SIDE BY SIDE ONLY WHEN THE FIELD IS TALL. On the 1-20 field the
       deck column is four cards high against two rows of numbers, which
       left a wide empty band beside the field — the sparse-layout defect.
       Two rows of numbers get their deck underneath, where it belongs. */
    /* ⚠ THE HINT SITS ABOVE THE FIELD, not in the foot. It is the only
       instruction this tool ever gives, and below a twelve-row field it
       can be off-screen at exactly the moment it appears — which is half
       of why "New cards" read as broken. */
    wrap.appendChild(this._buildHint());
    var main = api.el('div', 'nsv-main' + (this.st.field >= 100 ? ' nsv-tall' : ''));
    main.appendChild(this._buildField());
    main.appendChild(this._buildDeck());
    wrap.appendChild(main);
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _buildBar: function () {
    var api = this.api, self = this, bar = api.el('div', 'nsv-bar');
    /* ⚠ wired because the dead-string rule found it: the three range
       chips were an unlabelled group, so a screen-reader user met three
       bare ranges with nothing saying what they select. */
    var fields = api.el('div', 'nsv-fields');
    fields.setAttribute('role', 'group');
    fields.setAttribute('aria-label', api.t('fieldLabel'));
    this.FIELDS.forEach(function (f) {
      var b = api.el('button', 'nsv-chip' + (self.st.field === f ? ' nsv-on' : ''));
      b.type = 'button';
      b.textContent = '1–' + f;
      b.setAttribute('aria-pressed', self.st.field === f ? 'true' : 'false');
      b.addEventListener('click', function () {
        /* ⚠ CHANGING THE FIELD MUST DEAL A DECK. It used to just clear
           the cards, which left a teacher looking at a hundred and twenty
           numbers and nothing to do — a dead end whose only exit was a
           button she had no reason to press. */
        self.st = self.setField(self.st, f);
        self._picking = null;
        self._dealFor(f);
        self.render();
      });
      fields.appendChild(b);
    });
    bar.appendChild(fields);
    var pick = api.el('button', 'nsv-chip' + (this._picking === 'target' ? ' nsv-on' : ''));
    pick.type = 'button';
    pick.textContent = api.t('newSet');
    /* ⚠ IT DEALS, THEN IT ARMS — and it used to only arm. A control named
       with a NOUN that produced no cards read as "I selected something",
       especially beside three range chips one of which is always lit the
       same way. `audit-tool-control-liveness` passed it, because the DOM
       did change: Class Graph taught us to prove a control ACTS, and this
       teaches the next thing — a control must do what its LABEL says.
       Staying armed keeps the second, optional move (tap a number to build
       around that one) which every locale's landing copy promises. */
    pick.addEventListener('click', function () {
      self._dealNewTarget();
      self._picking = 'target';
      self.render();
    });
    bar.appendChild(pick);
    var lib = api.el('button', 'nsv-chip');
    lib.type = 'button';
    lib.textContent = api.t('libraryBtn');
    lib.addEventListener('click', function () { self._nextBoard(); });
    bar.appendChild(lib);
    return bar;
  },

  /* Deal a board around a DIFFERENT target in the current field. Stride 7
     is coprime with 20, 100 and 120, so repeated presses walk every target
     rather than cycling a short orbit — and it is deterministic, because
     there is no Math.random anywhere in this tool. */
  _dealNewTarget: function () {
    var all = this.allNumbers(this.st.field);
    var start = all.indexOf(this.st.target);
    var k, cand, built;
    for (k = 1; k <= all.length; k++) {
      cand = all[((start + k * 7) % all.length + all.length) % all.length];
      built = this.setTarget(this.st, cand);
      if (built) {
        this.st = built;
        this._fromLibrary = false;
        this._boardId = null;
        return true;
      }
    }
    return false;
  },

  /* deal the first open board for a field, so the tool is never a field
     with nothing to do on it */
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
    this._boardIdx = (this._boardIdx + 1) % open.length;
    this.st = this.loadBoard(this.st, open[this._boardIdx]);
    this._boardId = open[this._boardIdx].id;
    this._picking = null;
    this._fromLibrary = true;
    this.render();
  },

  /* ⚠ THE FIELD SCROLLS INSIDE ITS OWN BOX, THE PAGE NEVER DOES. Ten
     columns of 34px cells do not fit a 320px phone, and the cell floor is
     not negotiable — so `.nsv-scroll` carries overflow-x and the page
     stays clean. Width is bound to the range: there is no columns
     control, by refusal. */
  _buildField: function () {
    var api = this.api, self = this;
    var scroll = api.el('div', 'nsv-scroll');
    var grid = api.el('div', 'nsv-field');
    grid.style.setProperty('--nsv-cols', String(this.COLS[this.st.field] || 10));
    var live = {}, alive = this.survivors(this.st), i;
    for (i = 0; i < alive.length; i++) live[alive[i]] = 1;
    var nums = this.allNumbers(this.st.field);
    for (i = 0; i < nums.length; i++) grid.appendChild(this._cellEl(nums[i], !!live[nums[i]]));
    scroll.appendChild(grid);
    /* the marker is announced politely, never drawn attention to */
    if (this.st.marker !== null) {
      var sr = api.el('div', 'nsv-sr');
      sr.textContent = api.t('markerAria').replace('{n}', String(this.st.marker));
      scroll.appendChild(sr);
    }
    void self;
    return scroll;
  },

  /* ⚠ NO `.target` ANYWHERE IN THIS PATH. The cell knows whether it is
     still standing and nothing else; gate N9 proves the render cannot see
     what the deck is converging on. */
  _cellEl: function (n, aliveNow) {
    var api = this.api, self = this;
    var cls = 'nsv-cell' + (aliveNow ? '' : ' nsv-out');
    if (this.st.marker === n) cls += ' nsv-marked';
    var b = api.el('button', cls);
    b.type = 'button';
    b.setAttribute('data-n', String(n));
    b.textContent = String(n);
    if (String(n).length > 2) b.className += ' nsv-d3';
    b.setAttribute('aria-label', api.t(aliveNow ? 'cellAria' : 'cellOutAria').replace('{n}', String(n)));
    if (this.st.marker === n) b.setAttribute('aria-current', 'true');
    b.addEventListener('click', function () { self._tapCell(n); });
    return b;
  },

  _tapCell: function (n) {
    if (this._picking === 'target') {
      var built = this.setTarget(this.st, n);
      /* guard on the BUILD, not on clues.length — see setTarget */
      if (built) { this.st = built; this._fromLibrary = false; this._boardId = null; }
      this._picking = null;
      this.render();
      return;
    }
    var before = this.st.marker;
    this.st = this.park(this.st, n);
    if (this.st.marker !== before) this.api.sound(660);
    this.render();
  },

  _buildDeck: function () {
    var api = this.api, self = this, deck = api.el('div', 'nsv-deck');
    /* ⚠ ONE HINT ON SCREEN, AND IT LIVES IN THE FOOT. This used to add a
       second one here, so an empty deck showed two lines telling the
       teacher two different things at once. */
    if (!this.st.clues.length) return deck;
    this.st.clues.forEach(function (clue, i) {
      var turned = i < self.st.turned;
      var isNext = i === self.st.turned;
      var card = api.el('button', 'nsv-card' + (turned ? ' nsv-up' : '') + (isNext ? ' nsv-next' : ''));
      card.type = 'button';
      card.setAttribute('aria-label', api.t('cardAria').replace('{i}', String(i + 1)));
      card.setAttribute('aria-pressed', turned ? 'true' : 'false');
      if (!turned && !isNext) card.disabled = true;
      if (turned) card.appendChild(self._cardFace(clue));
      else card.appendChild(self._cardBack(i + 1));
      if (isNext) card.addEventListener('click', function () { self._turn(); });
      deck.appendChild(card);
    });
    /* ⚠ SO THAT THE LIBRARY BUTTON VISIBLY ACTS. Two boards with the same
       card count on the same field render identically at rest, so
       stepping the library changed the board and changed nothing on
       screen — a dead button by any teacher's measure. Dots, not a
       counter: no digits, no language, and nothing that reads as a score. */
    var open = this.boardsFor();
    if (this._fromLibrary && open.length > 1) {
      var dots = api.el('div', 'nsv-dots');
      dots.setAttribute('aria-hidden', 'true');
      for (var d = 0; d < open.length; d++) {
        dots.appendChild(api.el('span', 'nsv-dot' + (d === self._boardIdx ? ' nsv-dot-on' : '')));
      }
      deck.appendChild(dots);
    }
    return deck;
  },

  _turn: function () {
    this.st = this.turn(this.st);
    /* turning a card means you accepted this board */
    this._picking = null;
    this.api.sound(520);
    this.render();
  },

  _cardBack: function (ordinal) {
    var s = this._svg(60, 76);
    s.appendChild(this._rect(4, 4, 52, 68, 8, 'nsv-back'));
    s.appendChild(this._num(30, 44, String(ordinal), 'nsv-ord'));
    return s;
  },

  /* =================================================================
     THE SIX FACES — icons and numerals, never a word. The card does not
     explain the rule; it is a mark the class can point at while they work
     out what went dark. (Gate N11 forbids a word here and gate N13.4
     forbids naming a family anywhere.)
     ================================================================= */
  _cardFace: function (c) {
    var s = this._svg(60, 76), f = c.f;
    if (f === 'range') {
      var kept = c.op === 'ge';
      s.appendChild(this._rect(6, 14, 48, 16, 3, 'nsv-strip'));
      s.appendChild(this._rect(kept ? 30 : 6, 14, 24, 16, 3, 'nsv-keep'));
      s.appendChild(this._line(30, 10, 30, 34, 'nsv-mark'));
      s.appendChild(this._num(30, 56, String(c.a), 'nsv-cnum'));
    } else if (f === 'parity') {
      var pairs = 2, x, y;
      for (x = 0; x < pairs; x++) {
        for (y = 0; y < 2; y++) s.appendChild(this._dot(20 + x * 20, 22 + y * 16, 6, 'nsv-fill'));
      }
      if (c.r) s.appendChild(this._dot(30, 58, 6, 'nsv-lone'));
    } else if (f === 'multiple') {
      s.appendChild(this._line(6, 30, 54, 30, 'nsv-strip-l'));
      for (var t = 0; t < 4; t++) s.appendChild(this._line(10 + t * 13, 30, 10 + t * 13, 16, c.keep ? 'nsv-tooth' : 'nsv-tooth-o'));
      s.appendChild(this._num(30, 58, String(c.m), 'nsv-cnum'));
    } else if (f === 'digit') {
      var tens = c.place === 'tens';
      s.appendChild(this._rect(8, 16, 20, 26, 4, tens ? (c.keep ? 'nsv-keep' : 'nsv-keep-o') : 'nsv-slot'));
      s.appendChild(this._rect(32, 16, 20, 26, 4, tens ? 'nsv-slot' : (c.keep ? 'nsv-keep' : 'nsv-keep-o')));
      s.appendChild(this._num(tens ? 18 : 42, 38, String(c.d), 'nsv-cnum'));
      s.appendChild(this._line(tens ? 34 : 10, 38, tens ? 50 : 26, 38, 'nsv-mask'));
    } else if (f === 'quantity') {
      var q = Math.min(c.q, 10), i2;
      for (i2 = 0; i2 < q; i2++) s.appendChild(this._dot(12 + (i2 % 5) * 9, 18 + Math.floor(i2 / 5) * 11, 3.5, 'nsv-fill'));
      s.appendChild(this._rect(6, 44, 48, 12, 3, 'nsv-strip'));
      s.appendChild(this._rect(c.op === 'gt' ? 30 : 6, 44, 24, 12, 3, 'nsv-keep'));
    } else if (f === 'nearer') {
      s.appendChild(this._line(6, 34, 54, 34, 'nsv-strip-l'));
      s.appendChild(this._dot(14, 34, 5, 'nsv-anchor'));
      s.appendChild(this._dot(46, 34, 5, 'nsv-anchor-o'));
      s.appendChild(this._num(14, 58, String(c.a), 'nsv-cnum-s'));
      s.appendChild(this._num(46, 58, String(c.b), 'nsv-cnum-s'));
      s.appendChild(this._rect(6, 20, 24, 8, 2, 'nsv-keep'));
    }
    return s;
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

  _buildHint: function () {
    var api = this.api, hint = api.el('div', 'nsv-hint');
    /* ⚠ MID-DECK THE TOOL SAYS NOTHING. It used to fall through to the
       opening instruction — "park your number, then turn a card" — while
       the marker was already down and three cards were face up, which is
       both wrong and chatter. The class is mid-argument here; the
       instrument's job is to wait. (fraction-kitchen's "a neutral
       observation line, and then the tool waits".) */
    /* ⚠ EACH LINE NAMES THE NEXT MOVE, AND MID-DECK THERE IS NO LINE.
       `parkHint` was unreachable — turning a card sets `committed` in the
       same act, so the "not committed yet" branch below it could never be
       true. Split on whether a marker is down, and both lines have a job:
       park one, then turn a card. Once the cards are turning the tool
       says nothing and waits. */
    /* ⚠ `pickHint` ONLY WHEN ACTUALLY ARMED. The old condition also fired
       on `!clues.length`, which is every COLD LOAD — init renders before
       the board fetch resolves — so the screen said "tap a number to make
       a new set of cards" while a tap merely parked a marker. A hint that
       cannot be obeyed is worse than silence. */
    if (this._picking === 'target') hint.textContent = api.t('pickHint');
    else if (!this.st.clues.length) hint.textContent = '';
    else if (!this.st.committed && this.st.marker === null) hint.textContent = api.t('parkHint');
    else if (!this.st.committed) hint.textContent = api.t('instruction');
    else if (this.st.turned >= this.st.clues.length) hint.textContent = api.t('tryAnother');
    else hint.textContent = '';
    return hint;
  },

  _buildFoot: function () {
    var api = this.api, self = this, foot = api.el('div', 'nsv-foot');

    /* ⚠ SHUFFLE ONLY ONCE THERE IS SOMETHING TO SHUFFLE. At rest every
       card is already face-down, so rotating the deck changed nothing a
       teacher could see and the control-liveness gate rightly called it
       dead. It belongs after a run — "now turn them in another order" —
       where pressing it visibly flips the whole deck back. */
    if (this.st.clues.length > 1 && this.st.turned > 0) {
      var sh = api.el('button', 'nsv-chip');
      sh.type = 'button';
      sh.textContent = api.t('shuffleBtn');
      sh.addEventListener('click', function () { self.st = self.shuffle(self.st); self.render(); });
      foot.appendChild(sh);
    }
    /* ⚠ AND NOT OFFERED WHEN THERE IS NOTHING TO START AGAIN FROM. At
       rest this rebuilt the identical state, so it was a cosmetic dead
       click — the same shape sorting-hoops filed for "next time that file
       is open". This is that time. */
    if (this.st.marker !== null || this.st.turned > 0 || this._picking) {
      var again = api.el('button', 'nsv-chip');
      again.type = 'button';
      again.textContent = api.t('startAgain');
      again.addEventListener('click', function () { self.reset(); });
      foot.appendChild(again);
    }

    var pr = api.el('button', 'nsv-chip' + (this.premium ? '' : ' nsv-locked'));
    pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      window.print();
    });
    foot.appendChild(pr);
    /* ⚠ TWO NODES, NEVER A CONCATENATION. Joining the line and the link
       into one string is the recorded localisation smell (three ensembles
       hit it independently on open-number-line), and it also makes the
       one actionable thing on the gate unclickable. Shape copied from
       folding-sheet.js:714-723; the plan NAME is the suite's, not this
       tool's — the panels each coin a different one if left to it. */
    if (this._gate) {
      var g = api.el('div', 'nsv-gate');
      var s = api.el('span');
      s.textContent = api.t('gateLine');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-number-sieve';
      a.target = '_top';
      a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.appendChild(s);
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
   ⚠ TWO TAP FLOORS, MEASURED SEPARATELY AND NEITHER OF THEM MOVES: every
   CONTROL holds 44px; a FIELD CELL is canvas and holds 34px (the
   calendar-wall precedent). Collapsing them into one number is how a real
   defect gets waved through.
   ⚠ The cell carries min-width:0;min-height:0 — its size comes entirely
   from the grid track. A cell min-height fighting an aspect-ratio track
   over-inflates the column and pushes the last one outside the grid box
   while scrollWidth stays perfectly clean.
   ⚠ Never an inline `background` SHORTHAND on a cell: it resets
   background-image and beats the stylesheet. The dark state is a CLASS.
   ===================================================================== */
function injectNumberSieveCSS() {
  if (document.getElementById('nsv-style')) return;
  var css = ''
    + '.nsv-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
    + '.nsv-bar,.nsv-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    + '.nsv-fields{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    + '.nsv-chip{min-height:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;background:#FBF3E4;'
    +   'color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;cursor:pointer;}'
    + '.nsv-chip.nsv-on{background:#146B5E;color:#FBF3E4;}'
    + '.nsv-chip.nsv-locked{border-color:#F2784B;color:#C2562F;}'
    + '.nsv-gate{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:14px;color:#C2562F;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;align-items:center;}'
    + '.nsv-gate a{color:#C2562F;min-height:44px;display:inline-flex;align-items:center;}'
    + '.nsv-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;color:#0E5147;}'
    /* the field scrolls inside its own box; the page never does */
    /* ⚠ margin:auto ON THE CHILD, never justify-content:center ON THE
       SCROLLER. Centring a flex container that overflows pushes the start
       out of reach: at 360 the field was clipped at BOTH ends and column
       one could not be scrolled to or tapped. An auto margin centres when
       there is room and collapses to nothing when there is not. */
    + '.nsv-scroll{width:100%;overflow-x:auto;overflow-y:hidden;display:flex;justify-content:flex-start;}'
    + '.nsv-scroll > .nsv-field{margin:0 auto;}'
    /* ⚠ THE CEILING IS 46px, NOT 52px, AND IT IS A HEIGHT DECISION. The
       1-120 field is twelve rows; at 52px it stood 948px tall and ran
       past the fold at 1024x900 — the operator's own viewport. vh would
       be the natural fix and is FORBIDDEN here: a manipulative's iframe
       grows to its content, so a vh rule inside it creates a feedback
       loop the shell deliberately has no path for. A fixed ceiling has
       no such loop. */
    + '.nsv-field{display:grid;grid-template-columns:repeat(var(--nsv-cols,10),var(--nsv-cell));gap:3px;'
    +   '--nsv-cell:clamp(34px,6.4vmin,46px);padding:2px;}'
    + '.nsv-cell{min-width:0;min-height:0;width:var(--nsv-cell);height:var(--nsv-cell);padding:0;margin:0;'
    +   'display:flex;align-items:center;justify-content:center;border:2px solid rgba(20,107,94,.22);'
    +   'border-radius:7px;background:#FBF3E4;color:#0E5147;cursor:pointer;'
    +   'font-family:Baloo\\ 2,cursive;font-size:calc(var(--nsv-cell)*.46);line-height:1;'
    +   'font-variant-numeric:tabular-nums;transition:background-color .18s var(--lcs-ease,ease-out),color .18s;}'
    /* ⚠ .42, not .34 — at the 34px cell floor a three-digit numeral was
       rendering at 11.56px, under the 14px legibility floor, and only on
       the 1-120 field. The floor is the platform's; the RATIO is the
       thing that was wrong. */
    + '.nsv-cell.nsv-d3{font-size:calc(var(--nsv-cell)*.42);}'
    /* OUT is a desaturated slate — never a verdict colour */
    + '.nsv-cell.nsv-out{background-color:#C7CFCD;color:#7C8A87;border-color:rgba(20,107,94,.10);}'
    + '.nsv-cell.nsv-marked{box-shadow:0 0 0 3px #F2C879 inset;}'
    + '.nsv-main{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;min-width:0;}'
    + '.nsv-deck{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:100%;}'
    /* side by side once there is room for it — this is what keeps the
       densest field inside the fold at 1024 and 1366 */
    + '@media (min-width:900px){'
    +   '.nsv-main.nsv-tall{flex-direction:row;justify-content:center;align-items:flex-start;gap:16px;}'
    +   '.nsv-tall .nsv-scroll{width:auto;min-width:0;}'
    +   '.nsv-tall .nsv-deck{flex-direction:column;flex-wrap:nowrap;width:auto;flex:0 0 auto;}'
    + '}'
    + '.nsv-card{min-height:44px;min-width:44px;width:72px;height:86px;padding:4px;border-radius:12px;'
    +   'border:2px solid #146B5E;background:#FBF3E4;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
    + '.nsv-card[disabled]{opacity:.82;cursor:default;}'
    + '.nsv-card.nsv-next{box-shadow:0 0 0 3px #F2C879;}'
    + '.nsv-dots{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;width:100%;padding:2px 0;}'
    + '.nsv-dot{width:8px;height:8px;border-radius:50%;background:#C7CFCD;}'
    + '.nsv-dot.nsv-dot-on{background:#146B5E;}'
    + '.nsv-tall .nsv-dots{width:auto;}'
    + '.nsv-svg{width:100%;height:100%;}'
    + '.nsv-back{fill:#146B5E;}'
    + '.nsv-ord{fill:#FBF3E4;font-family:Baloo\\ 2,cursive;font-size:26px;}'
    + '.nsv-cnum{fill:#0E5147;font-family:Baloo\\ 2,cursive;font-size:20px;}'
    + '.nsv-cnum-s{fill:#0E5147;font-family:Baloo\\ 2,cursive;font-size:14px;}'
    + '.nsv-strip{fill:#E8E1D2;}'
    + '.nsv-strip-l{stroke:#146B5E;stroke-width:2;}'
    + '.nsv-keep{fill:#F2C879;}'
    + '.nsv-keep-o{fill:none;stroke:#F2C879;stroke-width:2.5;}'
    + '.nsv-slot{fill:none;stroke:#B9C2C0;stroke-width:2;}'
    + '.nsv-mark{stroke:#146B5E;stroke-width:2.5;}'
    + '.nsv-mask{stroke:#B9C2C0;stroke-width:2.5;}'
    + '.nsv-tooth{stroke:#146B5E;stroke-width:3;}'
    + '.nsv-tooth-o{stroke:#B9C2C0;stroke-width:3;stroke-dasharray:3 3;}'
    + '.nsv-fill{fill:#146B5E;}'
    + '.nsv-lone{fill:#F2C879;stroke:#146B5E;stroke-width:1.5;}'
    + '.nsv-anchor{fill:#146B5E;}'
    + '.nsv-anchor-o{fill:none;stroke:#146B5E;stroke-width:2;}'
    + '.nsv-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}'
    + '@media (max-width:560px){body.nsv-wide{overflow-y:auto;}}'
    + '@media (max-width:480px){body.nsv-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
    /* reduced motion COMPRESSES, it does not delete: the going-dark is the lesson */
    + '@media (prefers-reduced-motion:reduce){.nsv-cell{transition-duration:.12s;}}'
    + '@media print{.nsv-bar,.nsv-foot,.nsv-deck{display:none;}.nsv-cell{border-color:#333;color:#000;}'
    +   '.nsv-cell.nsv-out{background-color:#ccc;color:#666;}}';
  var s = document.createElement('style');
  s.id = 'nsv-style';
  s.textContent = css;
  document.head.appendChild(s);
}
