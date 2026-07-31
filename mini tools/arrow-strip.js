/* =====================================================================
   TOOL #37 — THE ARROW STRIP   (arrow-strip.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #2. Catalog slot B1.

   THE MAT · THE RAIL · THE BEETLE. Three named parts, and nothing else
   in this tool gets a noun. (The trail is what the beetle leaves; it is
   not a fourth part.)

   THE ROUTINE, which is what makes this an instrument and not a game:
     "Put the cards in the rail. Say where the beetle will end up.
      Then run it."   ... and then the move that matters:
     "Change ONE card and run it again."

   THE ONE THESIS — TWO OF THE FOUR CARDS MOVE NOTHING AND CHANGE
   EVERYTHING. A turn card leaves the beetle on the same square and
   rewrites what every card after it will mean. That is the whole idea,
   and it is why the rail is built before it is run.

   THREE INVENTIONS:
     1. BUILD, THEN RUN — SEPARATED IN TIME. The rail is inert while it
        is being made, so the class commits to a prediction before
        anything moves. A floor robot executes as you press.
     2. THE TRAIL PERSISTS ACROSS RUNS. Change one card in the middle,
        run again, and the new trail is drawn over the ghost of the old
        one — so the class sees exactly how far downstream a single card
        reached. A real robot leaves no trail and cannot show two runs at
        once.
     3. THE BEETLE'S-EYE TOGGLE. The mat rotates under a fixed beetle, so
        the same card is provably the same card from the body's frame
        while it lands four different ways on the teacher's. That is the
        exact K-2 obstacle — the beetle's left is not your left — and no
        physical robot can show you its own view.

   ⚠ THE FENCE — FOUR SURFACES. Clear on the mechanic, OCCUPIED on the
   vocabulary, and the second half is the one that constrains this file.
   `REFERENCE APPS/treasure-hunt.html` owns the ABSOLUTE direction
   vocabulary outright: :845-847 ship a selector offering
   "Up/Down/Left/Right (Pre-K to 1st)" vs "North/South/East/West (2nd+)",
   and :2958-2962 move by raw `row±s / col±s` with no heading anywhere in
   the file. It PRINTS a clue list; it never RUNS one.
   `pattern-bench` owns the word "strip" and a unit repeated into it —
   recomputed, never run, no body, no time.
   `open-number-line` owns the only path renderer in the repo — but 1-D,
   where a jump has a sign and not a facing, and it never replays.
   `folding-sheet` owns real-DOM-under-one-CSS-matrix — a static
   involution about four fixed creases, mirror-as-a-map, not
   turn-as-an-action.
   `number-sieve` (#36) is the closest conceptual sibling — a grid, and a
   card that ACTS on it — but ITS CARDS COMMUTE (that is why it is a
   sieve) and its field is a set, not a space. Here order is everything,
   and A5 asserts that positively so the two theses can never blur.
   Activities: `place-by-relation-core` (K.G.A.1) resolves a position
   WORD to one static placement at authoring time; `mail-route-core`
   draws a polyline and disclaims it in its own header
   ("no input handler draws the route").
   Printables: `_shared/position-words.js` owns the absolute left/right
   worksheet judgement, static and one-shot.

   REFUSES, FOREVER — each one gated:
     1. NO ABSOLUTE DIRECTION, IN ANY LANGUAGE. No up/down as movement
        words and no north/south/east/west, anywhere: card semantics,
        labels, aria, i18n keys, teacher copy. treasure-hunt owns that
        pair including its grade split.
        ⚠ BODY-RELATIVE words are the CONTENT and stay: forward, back,
        and turn-left / turn-right, which mean left and right OF THE
        BEETLE. A turner's left is not a mat direction. That distinction
        is the tool.
     2. NO ABSOLUTE-FRAME MOVEMENT PRIMITIVE. Nothing here takes a
        direction as an argument. The model is {pos, heading} with a step
        and a turn, and the dr/dc table is indexed by heading alone.
     3. ONE CARD IS ONE UNIT MOVE. No step-count on a card (treasure-hunt
        cards carry {dir, steps}) — which is also what protects invention
        2: a mid-rail edit must shift CELLS, not rescale a jump.
     4. NO WALLS, NO MAZE, NO GOAL, NO TARGET. `picture-path.html` owns
        walls-and-a-solution; treasure-hunt owns the thing at the end.
        There is nothing to reach: THE TRAIL IS THE PRODUCT.
     5. NO POSITION-WORD VOCABULARY (above/below/beside/between/inside/
        outside) — owned twice over.
     6. No score, no timer, no streak, no tick, no cross, no correct
        path, no verdict colour or wording.
     7. The on-screen noun is THE RAIL, never "the strip" — that is
        pattern-bench's house noun in prose. The key stays `arrow-strip`.
     8. The body is not named in shared i18n: `pond-juice-activity.js`
        already ships a beetle customer in 11 locales, and three other
        tools ship robots.

   ⚠ THE CATALOG'S OWN GATE SPEC WAS WRONG AND IS CORRECTED HERE. It
   claimed every rail's formal inverse returns the beetle to its start
   pose. That is FALSE the moment a move is blocked: a beetle on the top
   edge facing up runs [forward] (blocked, pose unchanged) and the
   inverse [back] then moves it. So INVERSE (A2) is asserted only over
   runs where nothing blocked, and EDGE HONESTY (A3) is its own
   invariant. Wrapping the mat would restore the tidy inverse and is
   REFUSED: a beetle does not teleport off one edge and onto the other.

   ⚠ NO SPEECH. LCSAudio silently substitutes a missing voice and TTS is
   reliable in only 5 of 11 locales; this tool is legible with the sound
   off, like every v4 instrument.
   ===================================================================== */

var ArrowStrip = {
  id: 'arrow-strip',

  /* ---------------------------------------------------------------
     STRINGS. GENERATED by scripts/apply-arrow-strip-locales.js. EN is
     authored; the ten others were REBUILT — never translated — by their
     own three-person native panel per §A.13.48, and each panel renamed
     the tool rather than calque it. Four of them caught things no
     English author could: no "Pilebanen" (bokmål `pile-` is the compound
     form of WILLOW, so the draft shipped "the willow track"); no
     "Matteboka"/"Mattboken" (that is the maths textbook in Norwegian and
     Swedish); no Swedish "banan" (a six-year-old reads BANANA before
     track); and no Brazilian "sua esquerda" (pt `sua` collapses to
     YOUR left — the exact confusion this tool exists to break, so pt
     says "a esquerda DELE").
     ⚠ No absolute direction word may appear here in any locale — gate
     A10 checks each locale's own vocabulary. Body-relative forward /
     back / turn-left / turn-right are the content and are allowed.
     --------------------------------------------------------------- */
  strings: {
    title:        { en: "The Arrow Strip", de: "Der Käferplan", fr: "La piste qui attend", es: "El carril del escarabajo", pt: "Trilho das setas", it: "Il binario delle frecce", nl: "De Pijlenbaan", sv: "Kommandorälsen", da: "Pilesporet", no: "Pilbanen", fi: "Kuoriaisrata" },
    buildHint:    { en: "Put cards in the rail. Nothing moves yet.", de: "Legt die Karten in die Bahn. Noch bewegt sich nichts.", fr: "Posez les cartes sur la piste. Rien ne bouge encore.", es: "Pongan tarjetas en el carril. Todavía no se mueve nada.", pt: "Coloquem as cartas no trilho. Nada se mexe ainda.", it: "Mettete le carte nel binario. Per ora non si muove niente.", nl: "Leg kaarten in de baan. Er beweegt nog niets.", sv: "Lägg korten på rälsen. Ingenting rör sig än.", da: "Læg kortene i sporet. Ingenting flytter sig endnu.", no: "Legg kort i banen. Ingenting rører seg ennå.", fi: "Asetetaan kortit radalle. Mikään ei vielä liiku." },
    predictHint:  { en: "Say where it will stop. Then run it.", de: "Sagt vorher, auf welchem Feld der Käfer stehen bleibt. Dann schickt ihn los.", fr: "Dites où elle va s’arrêter. Puis lancez la piste.", es: "Digan en qué casilla va a parar. Luego ejecuten.", pt: "Digam em que casa ele vai parar. Depois rodem.", it: "Dite dove si fermerà. Poi eseguite.", nl: "Zeg waar hij stopt. Laat hem dan lopen.", sv: "Säg var skalbaggen stannar. Kör sedan.", da: "Sig, hvor billen ender. Kør så sporet.", no: "Si hvor den stopper. Kjør den så.", fi: "Sanotaan ääneen, mihin ruutuun kuoriainen päätyy. Vasta sitten ajetaan." },
    againHint:    { en: "Change one card and run it again.", de: "Ändert eine einzige Karte und schickt ihn noch einmal los.", fr: "Changez une seule carte, puis relancez.", es: "Cambien una sola tarjeta y ejecuten otra vez.", pt: "Troquem uma carta só e rodem de novo.", it: "Cambiate una carta sola ed eseguite di nuovo.", nl: "Verander één kaart en laat hem opnieuw lopen.", sv: "Byt ett enda kort och kör igen.", da: "Byt ét kort ud og kør igen.", no: "Bytt ett kort, og kjør igjen.", fi: "Vaihdetaan yksi kortti ja ajetaan uudelleen. Vanha jälki jää näkyviin." },
    runBtn:       { en: "Run it", de: "Losschicken", fr: "Lancer", es: "Ejecutar", pt: "Rodar", it: "Esegui", nl: "Laten lopen", sv: "Kör", da: "Kør", no: "Kjør", fi: "Aja" },
    clearBtn:     { en: "Empty the rail", de: "Bahn leeren", fr: "Vider la piste", es: "Vaciar el carril", pt: "Esvaziar o trilho", it: "Svuota il binario", nl: "Baan leegmaken", sv: "Töm rälsen", da: "Tøm sporet", no: "Tøm banen", fi: "Tyhjennä rata" },
    eyeBtn:       { en: "See it their way", de: "Aus seiner Sicht", fr: "Voir avec ses yeux", es: "Verlo desde el escarabajo", pt: "Ver do lugar dele", it: "Con i suoi occhi", nl: "Kijk zoals hij kijkt", sv: "Se med skalbaggens ögon", da: "Se med billens øjne", no: "Slik den ser det", fi: "Kuoriaisen silmin" },
    eyeOffBtn:    { en: "See it your way", de: "Aus eurer Sicht", fr: "Voir avec nos yeux", es: "Verlo desde la clase", pt: "Ver do nosso lugar", it: "Con i tuoi occhi", nl: "Kijk zoals jullie kijken", sv: "Se med dina egna ögon", da: "Se med jeres egne øjne", no: "Slik dere ser det", fi: "Luokan silmin" },
    matLabel:     { en: "Mat", de: "Matte", fr: "Quadrillage", es: "Tapete", pt: "Tapete", it: "Reticolo", nl: "Mat", sv: "Rutmattan", da: "Måtten", no: "Rutematte", fi: "Matto" },
    matBook:      { en: "The mat book", de: "Das Mattenbuch", fr: "Le livret des quadrillages", es: "El cuaderno de tapetes", pt: "O caderno de tapetes", it: "L’album dei reticoli", nl: "Het mattenboek", sv: "Samlingen med rutmattor", da: "Måttebogen", no: "Boka med matter", fi: "Mattokirja" },
    printBtn:     { en: "Print the mat", de: "Matte drucken", fr: "Imprimer le quadrillage", es: "Imprimir el tapete", pt: "Imprimir o tapete", it: "Stampa il reticolo", nl: "Mat afdrukken", sv: "Skriv ut rutmattan", da: "Print måtten", no: "Skriv ut matta", fi: "Tulosta matto" },
    gateLine:     { en: "The mat book and printing are part of the Teacher plan.", de: "Das Mattenbuch und das Drucken der Matte gehören zum Lehrer-Paket.", fr: "Le livret des quadrillages et l’impression font partie de l’offre Enseignant.", es: "El cuaderno de tapetes y la impresión están incluidos en el plan Docente.", pt: "O caderno de tapetes e a impressão fazem parte do plano Professor.", it: "L’album dei reticoli e la stampa arrivano con il piano Insegnante.", nl: "Het mattenboek en het afdrukken horen bij het Leerkracht-pakket.", sv: "Samlingen med rutmattor och utskrift ingår i Lärarpaketet.", da: "Måttebogen og print er en del af Lærerabonnementet.", no: "Boka med matter og utskrift er en del av Lærerabonnementet.", fi: "Mattokirja ja tulostus kuuluvat Opettaja-tilaukseen." },
    unlock:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Vedi il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" },
    cardFwd:      { en: "forward", de: "vorwärts", fr: "en avant", es: "un paso adelante", pt: "para a frente", it: "avanti", nl: "vooruit", sv: "framåt", da: "frem", no: "framover", fi: "askel eteenpäin" },
    cardBack:     { en: "back", de: "rückwärts", fr: "en arrière", es: "un paso atrás", pt: "para trás", it: "indietro", nl: "achteruit", sv: "bakåt", da: "tilbage", no: "bakover", fi: "askel taaksepäin" },
    cardTurnL:    { en: "quarter turn to its left", de: "Vierteldrehung nach links, aus seiner Sicht", fr: "quart de tour vers sa gauche à elle", es: "un cuarto de vuelta hacia su propia izquierda, la del escarabajo", pt: "um quarto de volta para a esquerda dele", it: "un quarto di giro verso la sua sinistra, non la tua", nl: "een kwartslag naar zijn eigen linkerkant", sv: "ett kvarts varv åt sitt vänstra håll", da: "en kvart omgang til sin venstre side", no: "en kvart omdreining til sin egen venstre side", fi: "neljänneskäännös paikallaan, kuoriaisen omalle vasemmalle" },
    cardTurnR:    { en: "quarter turn to its right", de: "Vierteldrehung nach rechts, aus seiner Sicht", fr: "quart de tour vers sa droite à elle", es: "un cuarto de vuelta hacia su propia derecha, la del escarabajo", pt: "um quarto de volta para a direita dele", it: "un quarto di giro verso la sua destra, non la tua", nl: "een kwartslag naar zijn eigen rechterkant", sv: "ett kvarts varv åt sitt högra håll", da: "en kvart omgang til sin højre side", no: "en kvart omdreining til sin egen høyre side", fi: "neljänneskäännös paikallaan, kuoriaisen omalle oikealle" },
    railSlotAria: { en: "rail place {i}, {card}", de: "Platz {i} in der Bahn, {card}", fr: "place {i} de la piste, {card}", es: "lugar {i} del carril, {card}", pt: "lugar {i} do trilho, {card}", it: "posto {i} del binario, {card}", nl: "plek {i} in de baan, {card}", sv: "plats {i} på rälsen, {card}", da: "plads {i} i sporet, {card}", no: "plass {i} i banen, {card}", fi: "Radan paikka {i}: {card}" },
    bodyAria:     { en: "it is on square {r} {c}", de: "Der Käfer steht auf Feld {r} {c}", fr: "la petite bête est sur la case ligne {r}, colonne {c}", es: "está en la casilla {r} {c}", pt: "ele está na casa {r} {c}", it: "lo scarabeo è sulla casella {r} {c}", nl: "hij staat op vakje {r} {c}", sv: "skalbaggen står på ruta {r} {c}", da: "billen står på felt {r} {c}", no: "den står på rute {r} {c}", fi: "Kuoriaisen paikka: rivi {r}, sarake {c}" }
  },

  STORE_KEY: 'lcs:arrow-strip:v1',
  ENT_TRUST_DAYS: 14,

  defaults: {},
  settings: [],

  premium: false,
  premiumKnown: false,

  MATS: [4, 6, 8],
  DEFAULT_MAT: 6,
  MAX_RAIL: 12,
  CARDS: ['F', 'B', 'L', 'R'],

  /* ⚠ INDEXED BY HEADING ALONE. There is no function in this file that
     takes a direction as an argument — refusal 2. 0 is the way the
     beetle faces at rest; the names of the four rows are deliberately
     absent, because naming them is treasure-hunt's territory. */
  DR: [-1, 0, 1, 0],
  DC: [0, 1, 0, -1],

  /* =================================================================
     THE MODEL — pure, total, immutable. No DOM, no locale, no
     Math.random, no Date.
     ================================================================= */

  newState: function () {
    var n = this.DEFAULT_MAT;
    return {
      n: n,
      pose: { r: n - 1, c: 0, h: 0 },
      rail: [],
      /* ⚠ THE RAIL THAT WAS RUN, not a boolean. The first cut carried
         `ran:true` and derived the trail from the LIVE rail — so editing
         a card silently redrew the old trail as though you had run the
         new one, and the ghost came out identical to the new run,
         which is invention 2 not working AT ALL. The browser test
         caught it. The trail on screen is the trail of the run that
         actually happened, and that is now structural. */
      ranRail: null,
      ghost: null,
      eye: 'mat'
    };
  },

  _clone: function (st) {
    var s = st || this.newState();
    return {
      n: s.n,
      pose: { r: s.pose.r, c: s.pose.c, h: s.pose.h },
      rail: s.rail.slice(),
      ranRail: s.ranRail ? s.ranRail.slice() : null,
      ghost: s.ghost ? s.ghost.map(function (p) { return { r: p.r, c: p.c, h: p.h }; }) : null,
      eye: s.eye
    };
  },

  _onMat: function (n, r, c) { return r >= 0 && r < n && c >= 0 && c < n; },

  /* ⚠ A BLOCKED MOVE LEAVES THE POSE UNCHANGED. It never bounces and it
     never wraps — wrapping would make the formal inverse tidy again and
     it is refused, because a beetle does not leave one edge and appear
     at the other. "It is up against the side" is a state of the mat, not
     an error. */
  applyCard: function (pose, card, n) {
    var p = { r: pose.r, c: pose.c, h: pose.h };
    if (!p || typeof card !== 'string') return p;
    if (card === 'L') { p.h = (p.h + 3) % 4; return p; }
    if (card === 'R') { p.h = (p.h + 1) % 4; return p; }
    var d = (card === 'F') ? 1 : (card === 'B') ? -1 : 0;
    if (!d) return p;
    var nr = p.r + this.DR[p.h] * d, nc = p.c + this.DC[p.h] * d;
    if (!this._onMat(n, nr, nc)) return p;
    p.r = nr; p.c = nc;
    return p;
  },

  /* ⚠ `rail && rail.slice` IS NOT AN ARRAY TEST — a string has .slice too,
     and 'x'.slice() then has no .reverse. The gate caught it. Array.isArray
     or nothing. */
  _cards: function (rail) { return Array.isArray(rail) ? rail : []; },

  /* the whole run as a pure function: pose sequence, start included */
  run: function (pose, rail, n) {
    var out = [{ r: pose.r, c: pose.c, h: pose.h }], i, cur = out[0];
    var cards = this._cards(rail);
    for (i = 0; i < cards.length; i++) {
      cur = this.applyCard(cur, cards[i], n);
      out.push({ r: cur.r, c: cur.c, h: cur.h });
    }
    return out;
  },

  /* did any card in this rail get refused by an edge? */
  blocked: function (pose, rail, n) {
    var path = this.run(pose, rail, n), i;
    var cards = this._cards(rail);
    for (i = 0; i < cards.length; i++) {
      if ((cards[i] === 'F' || cards[i] === 'B') &&
          path[i].r === path[i + 1].r && path[i].c === path[i + 1].c) return true;
    }
    return false;
  },

  /* reverse the order and invert each card — F<->B, L<->R */
  inverseRail: function (rail) {
    var map = { F: 'B', B: 'F', L: 'R', R: 'L' };
    var cards = this._cards(rail).slice();
    return cards.reverse().map(function (c) { return map[c] || c; });
  },

  addCard: function (st, card) {
    var s = this._clone(st);
    if (this.CARDS.indexOf(card) === -1) return s;
    if (s.rail.length >= this.MAX_RAIL) return s;
    s.rail.push(card);
    return s;
  },

  setCard: function (st, i, card) {
    var s = this._clone(st);
    if (this.CARDS.indexOf(card) === -1) return s;
    if (!(i >= 0 && i < s.rail.length)) return s;
    s.rail[i] = card;
    return s;
  },

  removeCard: function (st, i) {
    var s = this._clone(st);
    if (!(i >= 0 && i < s.rail.length)) return s;
    s.rail.splice(i, 1);
    return s;
  },

  clearRail: function (st) {
    var s = this._clone(st);
    s.rail = [];
    s.ranRail = null;
    s.ghost = null;
    return s;
  },

  /* ⚠ RUNNING KEEPS THE PREVIOUS RUN AS A GHOST — invention 2. The ghost
     is computed from the rail that was RUN LAST TIME (`ranRail`), never
     from the rail that is in front of you now; computing it from the
     live rail draws the new run twice and the invention silently does
     nothing. The beetle itself returns to the start each time, because
     the rail is a plan for a journey and not a continuation of one. */
  doRun: function (st) {
    var s = this._clone(st);
    if (!s.rail.length) return s;
    if (s.ranRail && s.ranRail.length) s.ghost = this.run(s.pose, s.ranRail, s.n);
    s.ranRail = s.rail.slice();
    return s;
  },

  toggleEye: function (st) {
    var s = this._clone(st);
    s.eye = s.eye === 'mat' ? 'beetle' : 'mat';
    return s;
  },

  setMat: function (st, n) {
    var s = this._clone(st);
    var v = Math.round(Number(n));
    if (this.MATS.indexOf(v) === -1) return s;
    if (v === s.n) return s;
    s.n = v;
    s.pose = { r: v - 1, c: 0, h: 0 };
    s.rail = [];
    s.ranRail = null;
    s.ghost = null;
    return s;
  },

  /* the path currently on screen — OF THE RUN THAT HAPPENED, never of
     the rail as it stands now. Editing a card must not silently redraw
     the trail; that is the whole point of build-then-run. */
  path: function (st) {
    var s = st || this.newState();
    return (s.ranRail && s.ranRail.length)
      ? this.run(s.pose, s.ranRail, s.n)
      : [{ r: s.pose.r, c: s.pose.c, h: s.pose.h }];
  },

  endPose: function (st) {
    var p = this.path(st);
    return p[p.length - 1];
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

  /* ---- THE MAT BOOK. Locale-NEUTRAL: a mat is a size and a start
     pose, and it carries no words in any language. ---------------- */
  /* ⚠ THE FALLBACK CARRIES THE FREE MATS INLINE, never an empty array. An
     empty fallback means a 404 on the book turns the Mat Book chip into a
     dead control for a subscriber — it would have shipped that way. A 404
     must degrade to the free tier, not to nothing. */
  FALLBACK_MATS: {
    version: 1, freeMax: 3, premiumMax: 60,
    mats: [
      { id: 'm4-01', n: 4, r: 3, c: 0, h: 0, free: true },
      { id: 'm6-01', n: 6, r: 5, c: 0, h: 0, free: true },
      { id: 'm6-02', n: 6, r: 2, c: 2, h: 1, free: true }
    ]
  },

  _fetchMats: function () {
    var self = this;
    fetch('/mini-tools/arrow-strip-mats.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_MATS; })
      .then(function (d) {
        self.data = (d && d.mats && d.mats.length) ? d : self.FALLBACK_MATS;
        if (self._wrap) self.render();
      });
  },

  /* locked mats are ABSENT from the array, never merely hidden */
  matsFor: function () {
    var all = (this.data && this.data.mats) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectArrowStripCSS();
    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._timers = [];
    this._matIdx = 0;
    this._fetchMats();
    this._fetchEntitlement();
    this.render();
  },

  reset: function () {
    this.st = this.newState();
    this._matIdx = 0;
    this.render();
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
       If we learn the account is free while a premium mat is out, put
       the mat away. (pattern-bench:290) */
    if (this.premiumKnown && !this.premium && this._matId) {
      var open = this.matsFor(), i, stillOpen = false;
      for (i = 0; i < open.length; i++) if (open[i].id === this._matId) stillOpen = true;
      if (!stillOpen) { this._matId = null; this._matIdx = 0; this.st = this.setMat(this.st, this.DEFAULT_MAT); }
    }
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'arw-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    /* ⚠ THE HINT SITS ABOVE THE MAT. It is the only instruction this
       tool gives, and below the mat plus the rail it can be off-screen
       at the moment it appears — the recorded number-sieve defect. */
    wrap.appendChild(this._buildHint());
    var main = api.el('div', 'arw-main');
    main.appendChild(this._buildMat());
    main.appendChild(this._buildRail());
    wrap.appendChild(main);
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _buildBar: function () {
    var api = this.api, self = this, bar = api.el('div', 'arw-bar');

    var sizes = api.el('div', 'arw-sizes');
    sizes.setAttribute('role', 'group');
    sizes.setAttribute('aria-label', api.t('matLabel'));
    this.MATS.forEach(function (n) {
      var b = api.el('button', 'arw-chip' + (self.st.n === n ? ' arw-on' : ''));
      b.type = 'button';
      b.textContent = n + '×' + n;   /* a numeral and a multiplication sign: no word */
      b.addEventListener('click', function () { self.st = self.setMat(self.st, n); self._matId = null; self.render(); });
      sizes.appendChild(b);
    });
    bar.appendChild(sizes);

    /* ⭐ THE BEETLE'S-EYE TOGGLE — invention 3. */
    var eye = api.el('button', 'arw-chip' + (this.st.eye === 'beetle' ? ' arw-on' : ''));
    eye.type = 'button';
    eye.textContent = api.t(this.st.eye === 'beetle' ? 'eyeOffBtn' : 'eyeBtn');
    eye.addEventListener('click', function () { self.st = self.toggleEye(self.st); self.render(); });
    bar.appendChild(eye);

    var book = api.el('button', 'arw-chip' + (this.premium ? '' : ' arw-locked'));
    book.type = 'button';
    book.textContent = api.t('matBook');
    book.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      /* ⚠ STEP PAST A MAT THAT WOULD RENDER IDENTICALLY. The book's second
         entry happens to BE the default state, so a plain (i+1) step
         changed nothing on the first press and the chip read as broken —
         the same defect the number-sieve library shipped, found again by
         the liveness gate. Page until something actually differs. */
      var open = self.matsFor();
      if (!open.length) return;
      var cur = self.st, k, m = null;
      for (k = 1; k <= open.length; k++) {
        var cand = open[(self._matIdx + k) % open.length];
        if (cand.n !== cur.n || cand.r !== cur.pose.r || cand.c !== cur.pose.c || cand.h !== cur.pose.h) {
          self._matIdx = (self._matIdx + k) % open.length;
          m = cand;
          break;
        }
      }
      if (!m) return;
      self._matId = m.id;
      var s = self.setMat(self.st, m.n);
      /* setMat only moves when the SIZE changes, so seat the pose after */
      s.n = m.n;
      s.pose = { r: m.r, c: m.c, h: m.h };
      s.rail = []; s.ranRail = null; s.ghost = null;
      self.st = s;
      self.render();
    });
    bar.appendChild(book);
    return bar;
  },

  /* =================================================================
     THE MAT — a square grid, a beetle, and two trails.
     ⚠ aspect-ratio:1/1 is on the MAT CONTAINER, never on a cell. On the
     cell it fights the grid track, over-inflates the column and pushes
     the last one outside the box while scrollWidth stays clean (the
     recorded number-sieve trap). But the mat itself MUST be square or
     the quarter-turn of the frame stops being exact.
     ================================================================= */
  _buildMat: function () {
    var api = this.api, self = this, s = this.st;
    var scroll = api.el('div', 'arw-scroll');
    /* the rotating layer: the MAT turns, the beetle does not */
    var frame = api.el('div', 'arw-frame');
    if (s.eye === 'beetle') {
      /* ⭐ ONE CSS ROTATION OF THE REAL MAT — the hidden-real-destination
         trick. Nothing is recomputed in the beetle's frame; the layout
         answers. The beetle is rendered OUTSIDE this element, so it
         stays put while the world turns under it. */
      frame.style.transform = 'rotate(' + (-90 * s.pose.h) + 'deg)';
      frame.style.transformOrigin = '50% 50%';
    }

    var grid = api.el('div', 'arw-grid');
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', api.t('matLabel'));
    var r, c;
    for (r = 0; r < s.n; r++) {
      for (c = 0; c < s.n; c++) {
        var cell = api.el('div', 'arw-cell');
        cell.setAttribute('aria-hidden', 'true');
        grid.appendChild(cell);
      }
    }
    frame.appendChild(grid);
    frame.appendChild(this._buildTrails());
    /* the beetle rides inside the frame in mat view and outside it in
       beetle view, which is exactly what "the mat turns under it" means */
    var beetle = this._buildBeetle();
    if (s.eye === 'beetle') { frame.classList.add('arw-turned'); } else { frame.appendChild(beetle); }

    var box = api.el('div', 'arw-mat');
    /* ⚠ ON THE BOX, NOT THE FRAME. The box's own width reads --arw-cols,
       and a custom property set on a CHILD does not reach its parent —
       so setting it on the frame sized every mat for six columns and
       only looked right because six is the default. */
    box.style.setProperty('--arw-cols', String(s.n));
    box.appendChild(frame);
    if (s.eye === 'beetle') box.appendChild(beetle);

    var sr = api.el('div', 'arw-sr');
    var e = this.endPose(s);
    sr.textContent = api.t('bodyAria').replace('{r}', String(e.r + 1)).replace('{c}', String(e.c + 1));
    box.appendChild(sr);

    scroll.appendChild(box);
    return scroll;
  },

  /* ⭐ THE TRAIL AND ITS GHOST — invention 2. Both are polylines in ONE
     viewBox of n x n, so a vertex is literally the model's (c + .5,
     r + .5). Nothing is scaled by hand. */
  _polyline: function (path, cls) {
    var pts = path.map(function (p) { return (p.c + 0.5) + ',' + (p.r + 0.5); }).join(' ');
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    el.setAttribute('points', pts);
    el.setAttribute('class', cls);
    return el;
  },

  _buildTrails: function () {
    var s = this.st;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'arw-trails');
    svg.setAttribute('viewBox', '0 0 ' + s.n + ' ' + s.n);
    /* ⚠ NOT preserveAspectRatio="none" — the mat is square by
       construction and a skew here would put the trail off the squares. */
    svg.setAttribute('aria-hidden', 'true');
    if (s.ghost && s.ghost.length > 1) svg.appendChild(this._polyline(s.ghost, 'arw-ghost'));
    var live = this.path(s);
    if (live.length > 1) svg.appendChild(this._polyline(live, 'arw-trail'));
    return svg;
  },

  _buildBeetle: function () {
    var s = this.st, e = this.endPose(s);
    var b = this.api.el('div', 'arw-beetle');
    b.setAttribute('aria-hidden', 'true');
    if (s.eye === 'beetle') {
      /* fixed: dead centre, always facing the same way up the screen */
      b.classList.add('arw-fixed');
    } else {
      b.style.left = ((e.c + 0.5) / s.n * 100) + '%';
      b.style.top = ((e.r + 0.5) / s.n * 100) + '%';
      b.style.transform = 'translate(-50%,-50%) rotate(' + (90 * e.h) + 'deg)';
    }
    b.textContent = '🪲';
    return b;
  },

  /* =================================================================
     THE RAIL — inert while it is built. Invention 1.
     ================================================================= */
  GLYPH: { F: '↑', B: '↓', L: '↺', R: '↻' },
  CARD_KEY: { F: 'cardFwd', B: 'cardBack', L: 'cardTurnL', R: 'cardTurnR' },

  _buildRail: function () {
    var api = this.api, self = this, s = this.st;
    var col = api.el('div', 'arw-railcol');

    /* the four cards you can pick up */
    var tray = api.el('div', 'arw-tray');
    tray.setAttribute('role', 'group');
    this.CARDS.forEach(function (k) {
      var b = api.el('button', 'arw-card');
      b.type = 'button';
      b.textContent = self.GLYPH[k];
      b.setAttribute('aria-label', api.t(self.CARD_KEY[k]));
      b.addEventListener('click', function () { self.st = self.addCard(self.st, k); self.render(); });
      tray.appendChild(b);
    });
    col.appendChild(tray);

    /* the rail itself */
    var rail = api.el('div', 'arw-rail');
    rail.setAttribute('role', 'list');
    if (!s.rail.length) rail.appendChild(api.el('div', 'arw-empty'));
    s.rail.forEach(function (k, i) {
      var b = api.el('button', 'arw-slot');
      b.type = 'button';
      b.textContent = self.GLYPH[k];
      b.setAttribute('role', 'listitem');
      b.setAttribute('aria-label', api.t('railSlotAria').replace('{i}', String(i + 1)).replace('{card}', api.t(self.CARD_KEY[k])));
      /* tap a card in the rail to take it out — that is the edit the
         whole ghost invention exists to show */
      b.addEventListener('click', function () { self.st = self.removeCard(self.st, i); self.render(); });
      rail.appendChild(b);
    });
    col.appendChild(rail);
    return col;
  },

  _buildHint: function () {
    var api = this.api, s = this.st, hint = api.el('div', 'arw-hint');
    if (!s.rail.length) hint.textContent = api.t('buildHint');
    else if (!s.ranRail) hint.textContent = api.t('predictHint');
    else hint.textContent = api.t('againHint');
    return hint;
  },

  _buildFoot: function () {
    var api = this.api, self = this, foot = api.el('div', 'arw-foot');

    /* ⭐ A12 — a noun-labelled control does what its label says. "Run it"
       runs the rail; it does not arm a mode. The number-sieve "New cards"
       defect was exactly this and it reached the operator. */
    var run = api.el('button', 'arw-chip arw-go');
    run.type = 'button';
    run.textContent = api.t('runBtn');
    run.disabled = !this.st.rail.length;
    run.addEventListener('click', function () { self.st = self.doRun(self.st); self.render(); });
    foot.appendChild(run);

    var clear = api.el('button', 'arw-chip');
    clear.type = 'button';
    clear.textContent = api.t('clearBtn');
    clear.disabled = !this.st.rail.length;
    clear.addEventListener('click', function () { self.st = self.clearRail(self.st); self.render(); });
    foot.appendChild(clear);

    /* PAID: the EMPTY mat and BLANK cards only — never a trail, never a
       route, never a clue list. That restriction is what keeps this off
       treasure-hunt's ground. */
    var pr = api.el('button', 'arw-chip' + (this.premium ? '' : ' arw-locked'));
    pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      window.print();
    });
    foot.appendChild(pr);

    /* ⚠ TWO NODES, NEVER A CONCATENATION — the recorded localisation
       smell, and joining them makes the one actionable thing unclickable.
       Shape from folding-sheet.js:714-723. */
    if (this._gate) {
      var g = api.el('div', 'arw-gate');
      var sp = api.el('span');
      sp.textContent = api.t('gateLine');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-arrow-strip';
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
   holds 44px; a MAT CELL is canvas and holds 34px (the calendar-wall
   precedent). Collapsing them into one number waves a real defect through.
   ⚠ aspect-ratio:1/1 goes on the MAT CONTAINER, never on a cell — on a
   cell it fights the grid track and pushes the last column outside the
   box while scrollWidth stays clean. But the mat must be exactly square
   or the frame's quarter-turn stops landing on the squares.
   ⚠ No `vh` anywhere: a manipulative's iframe grows to its content, so a
   vh rule inside it is a feedback loop the shell has no path for.
   ⚠ Never an inline `background` SHORTHAND — it resets background-image
   and beats the stylesheet.
   ===================================================================== */
function injectArrowStripCSS() {
  if (document.getElementById('arw-style')) return;
  var css = ''
    + '.arw-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
    + '.arw-bar,.arw-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    + '.arw-sizes{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    + '.arw-chip{min-height:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;background:#FBF3E4;'
    +   'color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;cursor:pointer;}'
    + '.arw-chip.arw-on{background:#146B5E;color:#FBF3E4;}'
    + '.arw-chip.arw-locked{border-color:#F2784B;color:#C2562F;}'
    + '.arw-chip[disabled]{opacity:.5;cursor:default;}'
    + '.arw-chip.arw-go{background:#F2784B;border-color:#C2562F;color:#FFF;}'
    + '.arw-chip.arw-go[disabled]{background:#FBF3E4;color:#0E5147;border-color:#146B5E;}'
    + '.arw-gate{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:14px;color:#C2562F;'
    +   'display:flex;flex-wrap:wrap;justify-content:center;gap:6px;align-items:center;}'
    + '.arw-gate a{color:#C2562F;min-height:44px;display:inline-flex;align-items:center;}'
    + '.arw-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;color:#0E5147;min-height:20px;}'
    + '.arw-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}'
    /* ⚠ margin:auto ON THE CHILD, never justify-content:center on an
       overflow scroller — centring a flex container that overflows puts
       the start out of reach and the first column can never be tapped. */
    + '.arw-scroll{width:100%;overflow-x:auto;overflow-y:hidden;display:flex;justify-content:flex-start;min-width:0;}'
    + '.arw-scroll > .arw-mat{margin:0 auto;}'
    /* THE MAT: square, and the square is load-bearing */
    /* ⚠ THE GAPS ARE PART OF THE WIDTH. The first cut said
       `cell * cols + 2px`, so the grid's five 2px gaps came out of the
       cells and a 34px floor rendered at 32.7px at 320 — under the canvas
       floor, and only at the narrow end. n cells carry n-1 gaps. */
    + '.arw-mat{position:relative;aspect-ratio:1/1;'
    +   'width:calc(var(--arw-cell) * var(--arw-cols,6) + (var(--arw-cols,6) - 1) * 2px);flex:0 0 auto;'
    +   '--arw-cell:clamp(34px,7.2vmin,58px);}'
    + '.arw-frame{position:absolute;inset:0;transition:transform .35s var(--lcs-ease,ease-out);}'
    + '.arw-grid{position:absolute;inset:0;display:grid;'
    +   'grid-template-columns:repeat(var(--arw-cols,6),1fr);grid-template-rows:repeat(var(--arw-cols,6),1fr);gap:2px;}'
    + '.arw-cell{min-width:0;min-height:0;border:2px solid rgba(20,107,94,.20);border-radius:6px;background:#FBF3E4;}'
    + '.arw-trails{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;}'
    + '.arw-trail{fill:none;stroke:#F2784B;stroke-width:.14;stroke-linecap:round;stroke-linejoin:round;}'
    /* the ghost of the previous run, underneath — invention 2 */
    + '.arw-ghost{fill:none;stroke:#146B5E;stroke-width:.10;stroke-linecap:round;stroke-linejoin:round;opacity:.34;'
    +   'stroke-dasharray:.22 .18;}'
    + '.arw-beetle{position:absolute;font-size:calc(var(--arw-cell)*.72);line-height:1;'
    +   'transition:left .28s var(--lcs-ease,ease-out),top .28s var(--lcs-ease,ease-out),transform .28s;}'
    + '.arw-beetle.arw-fixed{left:50%;top:50%;transform:translate(-50%,-50%);transition:none;}'
    /* THE RAIL */
    + '.arw-main{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;min-width:0;}'
    + '.arw-railcol{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;min-width:0;}'
    + '.arw-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    + '.arw-card{min-height:44px;min-width:44px;width:56px;height:56px;padding:0;border-radius:12px;'
    +   'border:2px solid #146B5E;background:#FBF3E4;color:#0E5147;cursor:pointer;'
    /* ⚠ 32px, not 26. The two TURN glyphs are the whole thesis of this
       tool and at 26px their arrowheads are near-identical to a
       five-year-old across a classroom. Bigger is the fix; a colour
       difference would be a hint. */
    +   'font-size:32px;line-height:1;display:flex;align-items:center;justify-content:center;}'
    + '.arw-rail{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;'
    +   'min-height:56px;padding:6px 10px;border-radius:14px;border:2px dashed rgba(20,107,94,.34);'
    +   'background:rgba(20,107,94,.05);max-width:100%;}'
    + '.arw-slot{min-height:44px;min-width:44px;width:44px;height:44px;padding:0;border-radius:10px;'
    +   'border:2px solid #146B5E;background:#FBF3E4;color:#0E5147;cursor:pointer;font-size:25px;line-height:1;'
    +   'display:flex;align-items:center;justify-content:center;}'
    + '.arw-empty{min-height:44px;min-width:120px;}'
    /* side by side once there is room — keeps the 8x8 mat inside the fold */
    /* ⚠ SIDE BY SIDE COSTS THE MAT ITS CEILING. The card is capped at
       720px, so an 8x8 mat at the 58px stacked ceiling (58*8 + 14 = 478)
       plus the rail column ran straight off the right edge at 1024 — and
       every measured gate passed it, because the CELLS were inside the
       MAT and the mat's own overflow was absorbed silently by
       .arw-scroll's overflow-x. A lower ceiling in row mode only:
       46*8 + 14 = 382, and 382 + 20 + 260 = 662 inside the card. The
       34px canvas floor is untouched. */
    + '@media (min-width:820px){'
    /* align-items:center, not flex-start — against a tall 8x8 mat a
       top-hugging rail column left a sparse band the height of five rows
       under it. Centred, the cards sit opposite the middle of the mat. */
    +   '.arw-main{flex-direction:row;justify-content:center;align-items:center;gap:20px;}'
    +   '.arw-scroll{width:auto;}'
    +   '.arw-mat{--arw-cell:clamp(34px,5.2vmin,46px);}'
    +   '.arw-railcol{width:auto;flex:0 0 auto;max-width:260px;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){'
    +   '.arw-frame,.arw-beetle{transition:none;}'
    + '}';
  var st = document.createElement('style');
  st.id = 'arw-style';
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(ArrowStrip);
