/* =====================================================================
   TOOL #47 — THE TIMES SHELF   (times-shelf.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v5 catalog entry #3. PREV = 'baking-tray'.

   THE SHELF · THE CARD · THE SEAT. Three named parts, and nothing else
   in this tool gets a noun. Three acts, and there will never be a
   fourth: PUT AWAY · STACK · PUT IT BACK.

   THE PROMISE: the hundred are really thirty-six, and the thirty-six
   are really TWENTY-ONE.

   ⚠⚠ THIS IS NOT "THE FOLDING WALL" AND IT DOES NOT FOLD.
   The v5 entry proposed folding each commutative twin onto its partner
   across the diagonal. A four-surface fence came back the most occupied
   in the programme and per §23.3 the rule is SUBTRACT, never negotiate:
     - `folding-sheet.js` owns THE FOLD · THE CREASE · THE MIRROR and
       THE TWIN. Its invention #3 IS a shipped diagonal involution
       ("every cell has exactly one partner, and the partner of the
       partner is you") with a real DOM reflection matrix. The proposal's
       headline move is that, re-skinned onto a number grid.
     - `number-sieve.js` already ships "tap once, a whole column of a
       10-wide grid goes dark, simultaneously".
     - the v5 doc's OWN naming note bans *folding* and *wall*.
     - and a second folding apparatus (The Fold-and-Cut) was already
       REJECTED from the v4 catalog for being too near folding-sheet.
   So: no fold, no crease, no mirror, no twin, no hinge — not in a name,
   not in a motion, and not in a dashed 45-degree line.

   ⭐⭐ THE ONE BUILD GATE — NOTHING CROSSES THE DIAGONAL.
   No card may travel to, land on, cover, overlay, merge with, reflect
   into or point at another card. Ever. A straight hop across the
   diagonal READS as a fold at 29px whatever the code calls it. This is
   enforced structurally: there is no cell-to-cell path anywhere in this
   file, and `verify-times-shelf.js` law 6 asserts it.

   ⭐ THE DOCTRINAL RULING (pedagogy panel, unanimous). Two propositions
   had been collapsed into one:
     (a) "3x4 and 4x3 denote the same GROUPING" — FALSE, and
         `echo-grove-core.js` grades the commutative twin WRONG and is
         right to (Greer 1992; Vergnaud 1983; Anghileri 1989). Untouched.
     (b) "3x4 and 4x3 have the same VALUE" — TRUE, and it is CCSS
         3.OA.B.5. Tool #46's written refusal was scoped to ITS OWN
         material — a tray of buns being turned, where "the same" would
         have meant the same SITUATION. It declined a demonstration; it
         did not issue a platform doctrine.
   So this tool retires THE LIST, never the law and never the situation
   — the German Tauschaufgabe as a Rechenvorteil (Wittmann & Mueller,
   filed under Ableitungsstrategien). The sentence it must be able to
   say to a teacher:
     "Three plates of four is still not four plates of three — but both
      come to twelve, and twelve only has to be remembered once."

   ⭐ AND THE RECEPTION DISSENT IS WHAT FIXED THE RENDER. An eight-year-
   old does not hold the use/mention distinction, so the retirement
   operates on the PRODUCT NUMERAL, never on the factor pair:
     A CARD SHOWS ITS PRODUCT. It never shows "7 x 3". The factors live
     only on the two edges, positionally.
   All three panels reached this independently. It obeys the standing
   platform-wide operator ban (`baking-tray.js:90`), it removes every
   situation-reading that echo-grove owns (a bare numeral has no
   situation to have a version of), and it cuts the glyph budget from
   five shapes to two — which is the only reason the 320px render exists.

   THE ARITHMETIC THAT DESIGNED THE TOOL — five measurements, no taste:
     M1  Ten tappable tiles across 296px is IMPOSSIBLE: 296/10 = 29.6px
         against a 34px canvas floor. `number-sieve.js:2485` conceded to
         this and ships overflow-x:auto, which this brief forbids. So
         tiles are NOT pointer buttons and headers are NOT controls — the
         whole arena is ONE pointer region resolving to the cell under
         the finger, with (N+1)^2 invisible pointer-events:none pads
         beneath for keyboard, AT and the liveness gate.
     M2  "7 x 3" is four glyph-shapes in 23px of card (12.3px type).
         "21" is two shapes at 15.8px. The v5 cut-list's "crowded to
         death" verdict is correct for the FACT and false for the PRODUCT.
     M3  A family is a CROSS (row k union column k = 2n-1 cards) because
         German Reihe / Dutch tafel van 4 / English "4 times table" name
         the table by DIFFERENT factors — the cross is the only locale-
         neutral object. So the sequence is forced: 100 -> 81 -> 64 ->
         49 -> 36 -> 21, totals the squares, takings the odd gnomons.
         That is CCSS 3.OA.D.9 as a property of the instrument.
     M4  The honest number is 21, not "~20": 6 squares with no partner
         + 15 pairs. ⚠ THE TRAP: deduplicating by NUMERAL rather than by
         PAIR gives 19, because 24 sits at both 3x8 and 4x6 and 36 at
         both 4x9 and 6x6. Nineteen is prettier and nearer the marketing
         "twenty" AND IT IS A LIE — what is stored is the association
         pair->product (Baroody 2006), not recognition of a value.
         Encoded as verify law 4 so nobody ever "fixes" it.
     M5  Three digits fail the 14px floor at 0.44P. `100` is the only
         3-digit card; it renders at the SAME 0.60P font-size with SVG
         textLength + lengthAdjust="spacingAndGlyphs". Not a gate dodge:
         the gate measures font-size and the font-size really is 15.8px.

   ⭐ THE SHELF CLOSES UP. When a family is put away the survivors slide
   together and the cards GROW (26.4px -> 44.0px at a 320px viewport).
   Three things no alternative does: the residue becomes legible at the
   worst viewport; every press is a reward visible from the back of the
   room inside 600ms; and it is the ONLY way the squares sequence is
   visible AS squares — every state is literally an NxN block whose area
   is the tally, so the class reads 81/64/49/36 off the object.
   (The art panel specified permanent holes in a drilled board, for the
   contrast argument — cream-on-teal falling 64% -> 13%. Overruled:
   holes freeze the pitch at 26.4px forever, so the residue is never
   more legible than the dread, which inverts the thesis.)

   ⭐ THERE IS NO TALLY. Putting `21` on the apparatus makes it a score
   and steals the one intellectual act the class is there to perform.
   That ban extends to aria — which would leave a blind child with
   nothing, since they cannot see the block shrink. Resolved by naming
   the STRUCTURE instead of a count ("Rows and columns: 3, 4, 6, 7, 8,
   9"), which is EXACT parity, because it is precisely what the sighted
   child reads off the headers.

   ⭐ THE SAME-NUMBER LOOK is the tool's real invention, and it is
   fence-clean where the twin-fold was not. folding-sheet's TWIN is an
   INVOLUTION — exactly one partner, across a crease, forever. This is
   the FIBRE of the product map: size 1, 2, 3 or 4; no crease; no
   pairing; and it routinely returns cards that are NOT transposes.
   Press 12 and FOUR answer (3x4, 4x3, 2x6, 6x2). Press 36 and THREE
   (4x9, 9x4, 6x6). Press 49 and ONE — itself.

   THE STOPPING RULE, which is the whole doctrine:
     A family retires if and only if the class owned it BEFORE
     multiplication was taught.
   x1 is identity; x2 is doubles imported wholesale from addition; x5 is
   a skip-count already done on the clock, on hands, on tallies; x10 is
   the place-value system. NONE of the four is a multiplication fact.
   German Kernaufgaben, Dutch steunsommen and US strategy sequences
   (Thornton 1978; Rathmell 1978) intersect on exactly {1,2,5,10}.
   ⚠ x9 is REFUSED three times over: #46's refuse-list already ruled
   compensation structurally outside a tool like this; x9 is DERIVED
   from x10 and derivation is not ownership (admit it and you must admit
   x4, x8, x3, x6 and the shelf is empty, which is false); and the
   finger trick generalises to nothing.
   ⚠ THE SQUARES NEVER RETIRE, and the apparatus is the reason: every
   family hangs from an edge numeral, and the squares are a diagonal and
   hang from nothing — the apparatus physically cannot offer the move.
   Two shipped surfaces already discovered squares are the exception
   without being able to say why: echo-grove's round table carries a
   `[4,4]` row marked "16, no twin", and `array-tasks.js:185` builds the
   commutative printable with `while ((r === c || ...))` — it excludes
   squares BY CONSTRUCTION, because a square has no transpose to draw.

   ⚠ THE DIAGONAL MUST NOT GLOW. The v5 entry's "glowing spine" is cut.
   A lit diagonal is a REWARD and this tool is operator-locked against
   celebration; a child noticing unprompted that the leftovers make a
   straight line is the only version of that observation worth having.
   It is unmissable anyway — it is the edge of the remaining material.

   ⭐ THE BUTTONS ARE TOGGLES. (The pedagogy panel's refuse-list said a
   retired family may never come back — "a hook that can return is a
   filter, and a filter is number-sieve". Overruled: number-sieve's
   identity is a HIDDEN RULE depleting a field of integers, not a named
   reversible control; and the same panel's own most important
   requirement is RETIREMENT, NOT DESTRUCTION, which a thing that cannot
   come back structurally fails. The toggle is also the entire
   repeatability mechanism, and the same panel named "once a year, with
   a gasp" as the single biggest threat to the product.)

   ⚠ ORDER-INVARIANCE IS GATED, NEVER ADVERTISED. number-sieve's
   invention #2 is "ORDER DOES NOT MATTER, AND THE CLASS CAN NOW SEE
   IT", proved over every permutation. Allow any order; never animate
   it, never demonstrate it, never name it.

   ⚠ THE WORD "Quadratzahlen" IS ALLOWED ON THE LANDING PAGE AND BANNED
   ON THE APPARATUS. England places square-number notation in Year 5,
   US exponents in Grade 6. No n-squared, ever, in any of the eleven.
   ===================================================================== */
(function () {
  'use strict';

  /* ---- geometry, in viewBox units ---------------------------------- */
  var VB = 1000;
  var LANE = 96;              /* the numeral lane, top and left. A card
                                 that travels into it is occluded — that
                                 is the "sliding back into the sleeve",
                                 and it is a clip, not a fade. */
  var EDGE = 12;
  var S = VB - LANE - EDGE;   /* 892 — the shelf span, square */
  var CARD_F = 0.86;          /* card side as a fraction of pitch; the
                                 remaining 0.05 is bare ground, and it is
                                 the ONLY separation in band A (a 2px
                                 keyline eats 15% of a 26px card) */
  var NUM_F = 0.60;           /* numeral font-size as a fraction of pitch.
                                 ⚠ 0.60 x 26.4px = 15.8px, which clears
                                 the 14px floor at the worst viewport.
                                 NEVER lower it — the floor is the reason
                                 the card carries a product and not a
                                 fact. */
  var HEAD_F = 0.40;          /* header numeral, as a fraction of LANE   */
  var STACK_OFF = 0.115;       /* the second card's offset, in pitch      */
  var LIFT = 5;               /* the card's proud lip, in units          */

  /* ---- motion, in ms. Named so nobody "tightens" them. -------------- */
  var T_ARM = 90;             /* the cross lights BEFORE anything is
                                 committed — a control states its
                                 consequence before it is pressed */
  var T_AWAY = 600;           /* lift 140, slide 320, close 260 (the
                                 close starts at 340, overlapping) */
  var T_LIFT = 140;
  var T_SLIDE = 320;
  var T_CLOSE = 260;
  var T_BACK = 420;           /* ⭐ putting away is ceremonial and putting
                                 back is quick — that pair of numbers IS
                                 the character, and it is the inverse of
                                 #46's crack-460/push-330, correctly so */
  var T_OPEN = 220;
  var T_CARD = 120;           /* the second card settling in            */
  var RM_F = 0.28;            /* reduced motion COMPRESSES, never skips:
                                 the removal IS the lesson
                                 (folding-sheet.js:841) */
  var RM_FLOOR = 90;

  var FAMILIES = [1, 2, 5, 10];
  var HI = 10;                /* ⚠ NEVER 11 OR 12, not even as a setting.
                                 12 across 296px is 22.2px, and 12x12
                                 changes the answer to 36 distinct facts.
                                 A genuine divergence from the sibling
                                 tool, and it is arithmetic, not taste. */

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  var TimesShelf = {
    id: 'times-shelf',

    /* ⚠ THE GEOMETRY CONSTANTS ARE EXPOSED SO THE GATE READS THEM
       RATHER THAN RE-DECLARING THEM. A gate that carries its own copy
       of the number it is checking is testing a copy — #44 shipped a
       hint dispatch duplicated inside its own test and three mutations
       of the REAL dispatch sailed through. */
    GEO: {
      VB: VB, LANE: LANE, EDGE: EDGE, S: S, CARD_F: CARD_F, NUM_F: NUM_F,
      HEAD_F: HEAD_F, STACK_OFF: STACK_OFF, HI: HI, FAMILIES: FAMILIES,
      T_AWAY: T_AWAY, T_BACK: T_BACK
    },

    /* ================= THE MODEL — pure, DOM-free ==================== */

    /* ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM. There is no representation for a half-removed cross, an
       individually removed card, two cards in one seat, or a stacked
       shelf with a family still standing. Structural, not guarded. */

    newState: function () { return this._st(null); },

    /* TOTAL. Every field type-checked HERE AND NOWHERE ELSE, so there
       is exactly one rule. `s || {}` is not enough: null, 0, NaN and a
       string all have to survive this (#39 shipped `st || newState()`,
       which catches null and 0 and hands [] straight to .length). */
    _st: function (s) {
      var o = (s && typeof s === 'object') ? s : {};
      var src = (o.off && typeof o.off === 'object') ? o.off : {};
      var off = {}, i, k, all = true;
      for (i = 0; i < FAMILIES.length; i++) {
        k = FAMILIES[i];
        off[k] = src[k] === true;
        if (!off[k]) all = false;
      }
      /* stacked is legal ONLY when all four are away — see canStack */
      return { off: off, stacked: (o.stacked === true) && all };
    },

    /* the surviving row/column values, ascending */
    live: function (st) {
      var s = this._st(st), out = [], v;
      for (v = 1; v <= HI; v++) if (!s.off[v]) out.push(v);
      return out;
    },

    /* every card standing on the shelf, as {r, c, p} */
    cards: function (st) {
      var s = this._st(st), L = this.live(s), out = [], i, j;
      for (i = 0; i < L.length; i++) {
        for (j = 0; j < L.length; j++) {
          if (s.stacked && L[i] > L[j]) continue;   /* the seat is empty */
          out.push({ r: L[i], c: L[j], p: L[i] * L[j] });
        }
      }
      return out;
    },

    /* the empty seats — only ever produced by STACK, because a triangle
       cannot close up. That asymmetry is honest physics and it is the
       visible evidence of what was retired. */
    seats: function (st) {
      var s = this._st(st), L = this.live(s), out = [], i, j;
      if (!s.stacked) return out;
      for (i = 0; i < L.length; i++) {
        for (j = 0; j < L.length; j++) {
          if (L[i] > L[j]) out.push({ r: L[i], c: L[j], p: L[i] * L[j] });
        }
      }
      return out;
    },

    /* the seat set for an explicit live list — the animation needs the
       seats of the state it is moving TO, which is not always this.st */
    _seatsOf: function (L) {
      var out = [], i, j;
      for (i = 0; i < L.length; i++) for (j = 0; j < L.length; j++) {
        if (L[i] > L[j]) out.push({ r: L[i], c: L[j], p: L[i] * L[j] });
      }
      return out;
    },

    /* a standing card holds two addresses once its partner is away */
    isDoubled: function (st, r, c) {
      var s = this._st(st);
      return !!s.stacked && r < c;
    },

    isFamily: function (k) {
      var i;
      for (i = 0; i < FAMILIES.length; i++) if (FAMILIES[i] === k) return true;
      return false;
    },

    /* ⭐ THE CROSS. 2n-1, and the -1 is the square where the row meets
       its own column. This is why the takings run 19, 17, 15, 13:
       strictly decreasing by two, forced by arithmetic, in any order. */
    takings: function (st, k) {
      if (!this.canPutAway(st, k)) return 0;
      return 2 * this.live(st).length - 1;
    },

    canPutAway: function (st, k) {
      var s = this._st(st);
      return this.isFamily(k) && !s.stacked && !s.off[k];
    },
    putAway: function (st, k) {
      if (!this.canPutAway(st, k)) return null;      /* refusal, never a clamp */
      var s = this._st(st), o = {}, i, v;
      for (i = 0; i < FAMILIES.length; i++) { v = FAMILIES[i]; o[v] = s.off[v]; }
      o[k] = true;
      return this._st({ off: o, stacked: false });
    },

    canPutBack: function (st, k) {
      var s = this._st(st);
      return this.isFamily(k) && !s.stacked && s.off[k] === true;
    },
    putBack: function (st, k) {
      if (!this.canPutBack(st, k)) return null;
      var s = this._st(st), o = {}, i, v;
      for (i = 0; i < FAMILIES.length; i++) { v = FAMILIES[i]; o[v] = s.off[v]; }
      o[k] = false;
      return this._st({ off: o, stacked: false });
    },

    /* ⚠ STACKING FIRST IS REFUSED ON ARITHMETIC, not on preference.
       Three of the four families are themselves crosses, so doubling
       first would leave every family cross HALF-GONE — destroying the
       simultaneity of the 19-card act, destroying the 19/17/15/13
       invariance, and making the object order-dependent. A
       commutativity instrument whose own operations do not commute is a
       broken argument. */
    canStack: function (st) {
      var s = this._st(st), i;
      if (s.stacked) return false;
      for (i = 0; i < FAMILIES.length; i++) if (!s.off[FAMILIES[i]]) return false;
      return true;
    },
    stack: function (st) {
      if (!this.canStack(st)) return null;
      var s = this._st(st);
      return this._st({ off: s.off, stacked: true });
    },
    canUnstack: function (st) { return this._st(st).stacked === true; },
    unstack: function (st) {
      if (!this.canUnstack(st)) return null;
      var s = this._st(st);
      return this._st({ off: s.off, stacked: false });
    },

    isVirgin: function (st) {
      var s = this._st(st), i;
      if (s.stacked) return false;
      for (i = 0; i < FAMILIES.length; i++) if (s.off[FAMILIES[i]]) return false;
      return true;
    },
    canRestore: function (st) { return !this.isVirgin(st); },
    restoreAll: function (st) {
      if (!this.canRestore(st)) return null;
      return this.newState();
    },

    /* ⭐ THE FIBRE of the product map — size 1, 2, 3 or 4. NOT an
       involution: it has no crease, it does not pair, and it routinely
       returns cards that are not transposes of each other. */
    fibre: function (st, p) {
      var all = this.cards(st), out = [], i;
      for (i = 0; i < all.length; i++) if (all[i].p === p) out.push(all[i]);
      return out;
    },

    /* THE STUDY LIST — each standing fact once, smaller factor first.
       ⚠ NEVER deduplicate by NUMERAL (M4). This returns 21 entries on
       the residue while only 19 distinct numerals appear in it. */
    studyList: function (st) {
      var L = this.live(st), out = [], i, j;
      for (i = 0; i < L.length; i++) {
        for (j = i; j < L.length; j++) out.push({ a: L[i], b: L[j], p: L[i] * L[j] });
      }
      return out;
    },

    /* ---- layout ------------------------------------------------------ */

    pitch: function (n) { return S / n; },
    /* the centre of the lane-index i, in viewBox units */
    centre: function (n, i) { return LANE + (i + 0.5) * this.pitch(n); },
    indexOf: function (L, v) {
      var i;
      for (i = 0; i < L.length; i++) if (L[i] === v) return i;
      return -1;
    },

    /* ================= strings ======================================= */
    /* ⚠ THE STAGE RENDERS ZERO WORDS. Every string below is aria, an
       announcement, a setting, the paywall or the printed sheet. That
       kills the long-German/Finnish chip-wrap defect class structurally
       and buys back ~40px of height at 320px. */
    strings: {
      title:         { en: 'The Times Shelf', de: 'Der Setzkasten', fr: 'Le casier des tables', es: 'La repisa de las tablas', pt: 'A estante da tabuada', it: 'Lo scaffale delle tabelline', nl: 'De Tafelkast', sv: 'Tabellhyllan', da: 'Tabelreolen', no: 'Tabellreolen', fi: 'Kertotaulukortisto' },
      instruction:   { en: 'Put away the cards the class already knows, and see what is really left to learn.', de: 'Räumt die Kärtchen weg, die die Klasse längst kann — und seht, was wirklich noch zu lernen bleibt.', fr: 'Un casier plein de cartes. Rangez celles que la classe connaît déjà, et voyez ce qu’il reste vraiment à apprendre.', es: 'Retiren las cartas que la clase ya se sabe y vean lo que de verdad falta por aprender.', pt: 'A estante começa cheia. Recolha as plaquinhas que a turma já sabe e veja o que sobra, de verdade, para aprender.', it: 'La tavola pitagorica al completo. Metti da parte quello che la classe sa già e guarda che cosa resta davvero da imparare.', nl: 'Zet weg wat de klas al kent, en zie welke keersommen er echt overblijven om te leren.', sv: 'Lägg undan korten som klassen redan kan — då syns det vad som egentligen är kvar att lära sig.', da: 'Hele den lille tabel ligger fremme. Læg det væk, som klassen kan i forvejen, og se, hvad der egentlig er tilbage at lære.', no: 'Hele gangetabellen ligger framme. Legg bort de tabellene klassen kan fra før, og se hva som egentlig står igjen å lære.', fi: 'Kortisto on täynnä kortteja. Pane sivuun ne, jotka luokka jo osaa, ja katso, mitä on oikeasti vielä opeteltavana.' },
      shelfLabel:    { en: 'Shelf. Rows and columns: {list}.', de: 'Setzkasten. Zeilen und Spalten: {list}.', fr: 'Le casier. Lignes et colonnes : {list}.', es: 'La repisa. Filas y columnas: {list}.', pt: 'Estante. Linhas e colunas: {list}.', it: 'Scaffale. Righe e colonne: {list}.', nl: 'De kast. Rijen en kolommen: {list}.', sv: 'Hyllan. Rader och kolumner: {list}.', da: 'Reolen. Rækker og kolonner: {list}.', no: 'Reolen. Rader og kolonner: {list}.', fi: 'Kortisto. Rivit ja sarakkeet: {list}.' },
      shelfStacked:  { en: ' Every card below the diagonal is put away; the cards whose partner went now hold two.', de: ' Jedes Kärtchen unterhalb der Diagonale ist weggeräumt; die Kärtchen, deren Partner weggeräumt wurde, tragen jetzt zwei.', fr: ' Toutes les cartes sous la diagonale sont rangées ; celles qui gardent ces nombres en portent deux maintenant.', es: ' Todas las cartas debajo de la diagonal están retiradas; las cartas que se quedan con esos números ahora sostienen dos.', pt: ' Todas as plaquinhas abaixo da diagonal foram recolhidas; as que ficaram com esses números agora seguram outra embaixo.', it: ' Le carte sotto la diagonale sono da parte; quelle che conservano quei numeri adesso tengono due carte.', nl: ' Elke kaart onder de diagonaal is weggezet; waar dat getal blijft staan, liggen nu twee kaarten.', sv: ' Varje kort under diagonalen är undanlagt. På platserna som har kvar de talen ligger nu två kort.', da: ' Alle fliser under diagonalen er lagt væk; hvert af de tal står nu kun ét sted, og dér ligger to fliser oven på hinanden.', no: ' Alle kort under diagonalen er lagt bort; kortene som beholder de tallene, holder nå to.', fi: ' Kaikki lävistäjän alapuoliset kortit on pantu sivuun; niiden luvut ovat jäljellä toisella puolella, ja niissä paikoissa on kortin alla toinen kortti.' },
      addr:          { en: 'row {r}, column {c}', de: 'Zeile {r}, Spalte {c}', fr: 'ligne {r}, colonne {c}', es: 'fila {r}, columna {c}', pt: 'linha {r}, coluna {c}', it: 'riga {r}, colonna {c}', nl: 'rij {r}, kolom {c}', sv: 'rad {r}, kolumn {c}', da: 'række {r}, kolonne {c}', no: 'rad {r}, kolonne {c}', fi: 'rivillä {r}, sarakkeessa {c}' },
      cardLabel:     { en: '{p}, row {r}, column {c}', de: '{p}, Zeile {r}, Spalte {c}', fr: '{p}, ligne {r}, colonne {c}', es: '{p}, fila {r}, columna {c}', pt: '{p}, linha {r}, coluna {c}', it: '{p}, riga {r}, colonna {c}', nl: '{p}, rij {r}, kolom {c}', sv: '{p}, rad {r}, kolumn {c}', da: '{p}, række {r}, kolonne {c}', no: '{p}, rad {r}, kolonne {c}', fi: '{p}, rivillä {r}, sarakkeessa {c}' },
      cardDouble:    { en: '{p}, row {r}, column {c}, holding two cards', de: '{p}, Zeile {r}, Spalte {c}, trägt zwei Kärtchen', fr: '{p}, ligne {r}, colonne {c}, cette carte en porte deux', es: '{p}, fila {r}, columna {c}, sostiene dos cartas', pt: '{p}, linha {r}, coluna {c}, segurando outra embaixo', it: '{p}, riga {r}, colonna {c}, tiene due carte', nl: '{p}, rij {r}, kolom {c}, met twee kaarten', sv: '{p}, rad {r}, kolumn {c}, två kort på samma plats', da: '{p}, række {r}, kolonne {c}, to fliser oven på hinanden', no: '{p}, rad {r}, kolonne {c}, holder to kort', fi: '{p}, rivillä {r}, sarakkeessa {c}, alla toinen kortti' },
      seatLabel:     { en: 'Empty seat. The number {p} stands at row {c}, column {r}.', de: 'Leeres Fach. Die {p}, die hier saß, steht in Zeile {c}, Spalte {r}.', fr: 'Place vide. Le {p} qui était ici se trouve ligne {c}, colonne {r}.', es: 'Lugar vacío. El {p} que estaba aquí está en la fila {c}, columna {r}.', pt: 'Lugar vazio. O {p} que ficava aqui está na linha {c}, coluna {r}.', it: 'Posto vuoto. La carta {p} che stava qui è in riga {c}, colonna {r}.', nl: 'Lege plek. Het getal {p} staat op rij {c}, kolom {r}.', sv: 'Tom plats. Talet {p} som stod här finns kvar på rad {c}, kolumn {r}.', da: 'Tom plads. Flisen med {p}, der lå her, ligger nu i række {c}, kolonne {r}.', no: 'Tom plass. {p}-kortet som stod her, står nå i rad {c}, kolonne {r}.', fi: 'Tyhjä paikka. Tässä ollut {p} on rivillä {c}, sarakkeessa {r}.' },
      rowHead:       { en: 'Row {k}', de: 'Zeile {k}', fr: 'Ligne {k}', es: 'Fila {k}', pt: 'Linha {k}', it: 'Riga {k}', nl: 'Rij {k}', sv: 'Rad {k}', da: 'Række {k}', no: 'Rad {k}', fi: 'Rivi {k}' },
      colHead:       { en: 'Column {k}', de: 'Spalte {k}', fr: 'Colonne {k}', es: 'Columna {k}', pt: 'Coluna {k}', it: 'Colonna {k}', nl: 'Kolom {k}', sv: 'Kolumn {k}', da: 'Kolonne {k}', no: 'Kolonne {k}', fi: 'Sarake {k}' },
      cornerLabel:   { en: 'The shelf. The row numerals down the left, the column numerals across the top.', de: 'Der Setzkasten. Die Zeilen stehen links, die Spalten oben.', fr: 'Le casier. Les lignes à gauche, les colonnes en haut.', es: 'La repisa. Las filas por la izquierda, las columnas por arriba.', pt: 'A estante. As linhas ficam na lateral esquerda e as colunas, na parte de cima.', it: 'Lo scaffale. Le righe a sinistra, le colonne in alto.', nl: 'De kast. De rijen staan links, de kolommen bovenaan.', sv: 'Hyllan. Radernas tal står till vänster, kolumnernas tal överst.', da: 'Reolen. Rækker ned ad venstre side, kolonner hen over toppen.', no: 'Reolen. Radene nedover til venstre, kolonnene bortover øverst.', fi: 'Kortisto. Rivit vasemmassa laidassa, sarakkeet ylälaidassa.' },
      famAway:       { en: 'Put away the {k} row and the {k} column', de: 'Zeile {k} und Spalte {k} wegräumen', fr: 'Ranger la ligne {k} et la colonne {k}', es: 'Retirar la fila del {k} y la columna del {k}', pt: 'Recolher a linha do {k} e a coluna do {k}', it: 'Metti da parte la riga {k} e la colonna {k}', nl: 'Rij {k} en kolom {k} wegzetten', sv: 'Lägg undan rad {k} och kolumn {k}', da: 'Læg {k}-rækken og {k}-kolonnen væk', no: 'Legg bort rad {k} og kolonne {k}', fi: 'Pane sivuun rivi {k} ja sarake {k}' },
      famBack:       { en: 'Put back the {k} row and the {k} column', de: 'Zeile {k} und Spalte {k} zurückstellen', fr: 'Remettre la ligne {k} et la colonne {k}', es: 'Regresar la fila del {k} y la columna del {k}', pt: 'Devolver a linha do {k} e a coluna do {k}', it: 'Rimetti la riga {k} e la colonna {k}', nl: 'Rij {k} en kolom {k} terugzetten', sv: 'Lägg tillbaka rad {k} och kolumn {k}', da: 'Sæt {k}-rækken og {k}-kolonnen tilbage', no: 'Legg tilbake rad {k} og kolonne {k}', fi: 'Ota takaisin rivi {k} ja sarake {k}' },
      famLocked:     { en: 'The {k} row and the {k} column are put away — put back the cards below the diagonal first', de: 'Zeile {k} und Spalte {k} sind weggeräumt — stellt zuerst die doppelt belegten Kärtchen zurück', fr: 'Ligne {k} et colonne {k} — remettre d’abord les cartes rangées sous la diagonale', es: 'La fila del {k} y la columna del {k} están retiradas. Primero hay que regresar las cartas apiladas.', pt: 'Devolver a linha do {k} e a coluna do {k} — primeiro devolva as plaquinhas empilhadas', it: 'La riga {k} e la colonna {k} sono già da parte: rimetti prima le carte sotto la diagonale', nl: 'Rij {k} en kolom {k} terugzetten — zet eerst de kaarten onder de diagonaal terug', sv: 'Rad {k} och kolumn {k} är undanlagda — lägg tillbaka korten under diagonalen först', da: '{k}-rækken og {k}-kolonnen er lagt væk — hent først fliserne under diagonalen tilbage', no: 'Legg tilbake rad {k} og kolonne {k} – legg først tilbake kortene under diagonalen', fi: 'Rivi {k} ja sarake {k} — ota ensin päällekkäiset kortit takaisin' },
      stackBtn:      { en: 'Put away every card below the diagonal', de: 'Jedes Kärtchen unterhalb der Diagonale wegräumen', fr: 'Ranger toutes les cartes sous la diagonale', es: 'Retirar todas las cartas debajo de la diagonal', pt: 'Recolher todas as plaquinhas abaixo da diagonal', it: 'Metti da parte tutte le carte sotto la diagonale', nl: 'Elke kaart onder de diagonaal wegzetten', sv: 'Lägg undan varje kort under diagonalen', da: 'Læg alle fliser under diagonalen væk', no: 'Legg bort alle kort under diagonalen', fi: 'Pane sivuun kaikki lävistäjän alapuoliset kortit' },
      unstackBtn:    { en: 'Put back the cards below the diagonal', de: 'Die Kärtchen unterhalb der Diagonale zurückstellen', fr: 'Remettre les cartes sous la diagonale', es: 'Regresar las cartas de debajo de la diagonal', pt: 'Devolver as plaquinhas abaixo da diagonal', it: 'Rimetti le carte sotto la diagonale', nl: 'De kaarten onder de diagonaal terugzetten', sv: 'Lägg tillbaka korten under diagonalen', da: 'Hent fliserne under diagonalen tilbage', no: 'Legg tilbake kortene under diagonalen', fi: 'Ota takaisin lävistäjän alapuoliset kortit' },
      stackLocked:   { en: 'Put away every card below the diagonal — put away the 1, the 2, the 5 and the 10 first', de: 'Jedes Kärtchen unterhalb der Diagonale wegräumen — räumt zuerst die 1, die 2, die 5 und die 10 weg', fr: 'Ranger toutes les cartes sous la diagonale — ranger d’abord le 1, le 2, le 5 et le 10', es: 'Retirar todas las cartas debajo de la diagonal: primero hay que retirar el 1, el 2, el 5 y el 10', pt: 'Recolher todas as plaquinhas abaixo da diagonal — primeiro recolha o 1, o 2, o 5 e o 10', it: 'Metti da parte tutte le carte sotto la diagonale: prima metti da parte l’1, il 2, il 5 e il 10', nl: 'Elke kaart onder de diagonaal wegzetten — zet eerst rij en kolom 1, 2, 5 en 10 weg', sv: 'Lägg undan varje kort under diagonalen — lägg undan 1, 2, 5 och 10 först', da: 'Læg alle fliser under diagonalen væk — læg først 1, 2, 5 og 10 væk', no: 'Legg bort alle kort under diagonalen – legg først bort 1, 2, 5 og 10', fi: 'Pane sivuun kaikki lävistäjän alapuoliset kortit — pane ensin sivuun 1, 2, 5 ja 10' },
      restoreBtn:    { en: 'Put it all back', de: 'Alles zurückstellen', fr: 'Tout remettre en place', es: 'Regresar todo a la repisa', pt: 'Devolver tudo para a estante', it: 'Rimetti tutto', nl: 'Alles terugzetten', sv: 'Lägg tillbaka allt', da: 'Sæt det hele tilbage', no: 'Legg alt tilbake', fi: 'Ota kaikki takaisin' },
      restoreLocked: { en: 'Put it all back — nothing has been put away yet', de: 'Alles zurückstellen — es ist noch nichts weggeräumt', fr: 'Tout remettre en place — rien n’a encore été rangé', es: 'Regresar todo a la repisa: todavía no se ha retirado nada', pt: 'Devolver tudo para a estante — ainda não foi recolhido nada', it: 'Rimetti tutto: non hai ancora messo da parte niente', nl: 'Alles terugzetten — er is nog niets weggezet', sv: 'Lägg tillbaka allt — inget är undanlagt än', da: 'Sæt det hele tilbage — der er ikke lagt noget væk endnu', no: 'Legg alt tilbake – ingenting er lagt bort ennå', fi: 'Ota kaikki takaisin — mitään ei ole vielä pantu sivuun' },
      printBtn:      { en: 'Print the shelf and the study list', de: 'Den Setzkasten und die Lernliste drucken', fr: 'Imprimer le casier et la liste à apprendre', es: 'Imprimir la repisa y la lista de estudio', pt: 'Imprimir a estante e a lista de estudo', it: 'Stampa lo scaffale e l’elenco da studiare', nl: 'De kast en de oefenlijst afdrukken', sv: 'Skriv ut hyllan och listan', da: 'Print reolen og listen over de stykker, der står tilbage', no: 'Skriv ut reolen og lista over det som står igjen', fi: 'Tulosta kortisto ja opeteltavat laskut' },
      printLocked:   { en: 'Print the shelf and the study list — part of the Teacher plan', de: 'Den Setzkasten und die Lernliste drucken — gehört zum Lehrkraft-Abo', fr: 'Imprimer le casier et la liste à apprendre — fait partie de l’offre Enseignant', es: 'Imprimir la repisa y la lista de estudio: es parte del plan Docente', pt: 'Imprimir a estante e a lista de estudo — faz parte do plano Professor', it: 'Stampa lo scaffale e l’elenco da studiare — fa parte del piano Insegnante', nl: 'De kast en de oefenlijst afdrukken — onderdeel van het Leerkracht-pakket', sv: 'Skriv ut hyllan och listan — ingår i Lärarplanen', da: 'Print reolen og listen over de stykker, der står tilbage — hører til Lærerabonnementet', no: 'Skriv ut reolen og lista over det som står igjen – en del av Lærer-abonnementet', fi: 'Tulosta kortisto ja opeteltavat laskut — kuuluu Opettaja-tilaukseen' },
      saidAway:      { en: 'The {k} row and the {k} column are put away. Rows and columns: {list}.', de: 'Zeile {k} und Spalte {k} weggeräumt. Zeilen und Spalten: {list}.', fr: 'La ligne {k} et la colonne {k} sont rangées. Lignes et colonnes : {list}.', es: 'Se retiraron la fila del {k} y la columna del {k}. Filas y columnas: {list}.', pt: 'A linha do {k} e a coluna do {k} foram recolhidas. Linhas e colunas: {list}.', it: 'Riga {k} e colonna {k} messe da parte. Righe e colonne: {list}.', nl: 'Rij {k} en kolom {k} zijn weggezet. Rijen en kolommen: {list}.', sv: 'Rad {k} och kolumn {k} är undanlagda. Rader och kolumner: {list}.', da: '{k}-rækken og {k}-kolonnen er lagt væk. Rækker og kolonner: {list}.', no: 'Rad {k} og kolonne {k} er lagt bort. Rader og kolonner: {list}.', fi: 'Rivi {k} ja sarake {k} pantiin sivuun. Rivit ja sarakkeet: {list}.' },
      saidBack:      { en: 'The {k} row and the {k} column are back. Rows and columns: {list}.', de: 'Zeile {k} und Spalte {k} zurückgestellt. Zeilen und Spalten: {list}.', fr: 'La ligne {k} et la colonne {k} sont revenues. Lignes et colonnes : {list}.', es: 'Regresaron la fila del {k} y la columna del {k}. Filas y columnas: {list}.', pt: 'A linha do {k} e a coluna do {k} voltaram. Linhas e colunas: {list}.', it: 'Riga {k} e colonna {k} rimesse sullo scaffale. Righe e colonne: {list}.', nl: 'Rij {k} en kolom {k} staan er weer. Rijen en kolommen: {list}.', sv: 'Rad {k} och kolumn {k} är tillbaka. Rader och kolumner: {list}.', da: '{k}-rækken og {k}-kolonnen er sat tilbage. Rækker og kolonner: {list}.', no: 'Rad {k} og kolonne {k} er lagt tilbake. Rader og kolonner: {list}.', fi: 'Rivi {k} ja sarake {k} otettiin takaisin. Rivit ja sarakkeet: {list}.' },
      saidStack:     { en: 'Every card below the diagonal is put away; the cards whose partner went now hold two.', de: 'Doppelt belegt. Jedes Kärtchen unterhalb der Diagonale ist weggeräumt; die Kärtchen, deren Partner weggeräumt wurde, tragen jetzt zwei.', fr: 'Toutes les cartes sous la diagonale sont rangées ; celles qui gardent ces nombres en portent deux maintenant.', es: 'Apiladas. Todas las cartas debajo de la diagonal están retiradas; las cartas que se quedan con esos números ahora sostienen dos.', pt: 'Empilhadas. Todas as plaquinhas abaixo da diagonal foram recolhidas; as que ficaram com esses números agora seguram outra embaixo.', it: 'Le carte sotto la diagonale sono da parte; quelle che conservano quei numeri adesso tengono due carte.', nl: 'Elke kaart onder de diagonaal is weggezet; waar dat getal blijft staan, liggen nu twee kaarten.', sv: 'Korten under diagonalen är undanlagda. På platserna som har kvar de talen ligger nu två kort.', da: 'Stablet. Alle fliser under diagonalen er lagt væk; hvert af de tal står nu kun ét sted, og dér ligger to fliser oven på hinanden.', no: 'Alle kort under diagonalen er lagt bort. Kortene som beholder de tallene, holder nå to.', fi: 'Kortit pinottiin. Kaikki lävistäjän alapuoliset kortit on pantu sivuun; niiden luvut ovat jäljellä toisella puolella, ja niissä paikoissa on kortin alla toinen kortti.' },
      saidUnstack:   { en: 'The cards below the diagonal are back.', de: 'Die Kärtchen unterhalb der Diagonale stehen wieder da.', fr: 'Toutes les cartes sous la diagonale sont revenues.', es: 'Regresaron todas las cartas de debajo de la diagonal.', pt: 'Todas as plaquinhas abaixo da diagonal voltaram.', it: 'Le carte sotto la diagonale sono tornate.', nl: 'De kaarten onder de diagonaal staan er weer.', sv: 'Korten under diagonalen är tillbaka.', da: 'Alle fliser under diagonalen er tilbage.', no: 'Alle kort under diagonalen er tilbake.', fi: 'Lävistäjän alapuoliset kortit ovat taas paikoillaan.' },
      saidRestore:   { en: 'Everything is back. Rows and columns: {list}.', de: 'Alles steht wieder da. Zeilen und Spalten: {list}.', fr: 'Tout est revenu en place. Lignes et colonnes : {list}.', es: 'Está todo de vuelta en la repisa. Filas y columnas: {list}.', pt: 'Tudo voltou para a estante. Linhas e colunas: {list}.', it: 'È tornato tutto. Righe e colonne: {list}.', nl: 'Alles staat er weer. Rijen en kolommen: {list}.', sv: 'Allt är tillbaka. Rader och kolumner: {list}.', da: 'Det hele er tilbage. Rækker og kolonner: {list}.', no: 'Alt er tilbake. Rader og kolonner: {list}.', fi: 'Kaikki on taas paikoillaan. Rivit ja sarakkeet: {list}.' },
      saidCardOne:   { en: '{p}, row {r}, column {c}. The only {p} standing on the shelf.', de: '{p}, Zeile {r}, Spalte {c}. Die einzige {p}, die im Setzkasten steht.', fr: '{p}, ligne {r}, colonne {c}. Le seul {p} encore en place dans le casier.', es: '{p}, fila {r}, columna {c}. En ningún otro lugar de la repisa.', pt: '{p}, linha {r}, coluna {c}. Em nenhum outro lugar da estante.', it: '{p}, riga {r}, colonna {c}. È l’unica carta {p} in piedi sullo scaffale.', nl: '{p}, rij {r}, kolom {c}. Nergens anders in de kast.', sv: '{p}, rad {r}, kolumn {c}. Ingen annanstans på hyllan.', da: '{p}, række {r}, kolonne {c}. Ingen andre steder i reolen.', no: '{p}, rad {r}, kolonne {c}. Tallet står ikke noe annet sted i reolen.', fi: '{p}, rivillä {r}, sarakkeessa {c}. Ei missään muualla kortistossa.' },
      saidCardDouble: { en: '{p}, row {r}, column {c}. This card holds two: it also answers to row {c}, column {r}.', de: '{p}, Zeile {r}, Spalte {c}. Dieses Kärtchen trägt zwei: Die {p} steht auch in Zeile {c}, Spalte {r}.', fr: '{p}, ligne {r}, colonne {c}. Cette carte en porte deux : ce nombre est aussi ligne {c}, colonne {r}.', es: '{p}, fila {r}, columna {c}. Esta carta sostiene dos: el {p} también está en la fila {c}, columna {r}.', pt: '{p}, linha {r}, coluna {c}. Esta plaquinha segura outra embaixo: ela responde também pela linha {c}, coluna {r}.', it: '{p}, riga {r}, colonna {c}. Questa carta ne tiene due: risponde anche a riga {c}, colonna {r}.', nl: '{p}, rij {r}, kolom {c}. Hier liggen twee kaarten: dit getal staat ook op rij {c}, kolom {r}.', sv: '{p}, rad {r}, kolumn {c}. Här ligger två kort: talet står också för rad {c}, kolumn {r}.', da: '{p}, række {r}, kolonne {c}. To fliser oven på hinanden: flisen gælder også for række {c}, kolonne {r}.', no: '{p}, rad {r}, kolonne {c}. Dette kortet holder to: tallet står også i rad {c}, kolonne {r}.', fi: '{p}, rivillä {r}, sarakkeessa {c}. Tämän kortin alla on toinen: sama luku on myös rivillä {c}, sarakkeessa {r}.' },
      saidCardMore:  { en: '{p}, row {r}, column {c}. {p} is also at {places}.', de: '{p}, Zeile {r}, Spalte {c}. Die {p} steht auch in {places}.', fr: '{p}, ligne {r}, colonne {c}. On trouve aussi {p} {places}.', es: '{p}, fila {r}, columna {c}. El {p} también está en {places}.', pt: '{p}, linha {r}, coluna {c}. O {p} também está em {places}.', it: '{p}, riga {r}, colonna {c}. La carta {p} sta anche in {places}.', nl: '{p}, rij {r}, kolom {c}. {p} staat ook op {places}.', sv: '{p}, rad {r}, kolumn {c}. {p} finns också på {places}.', da: '{p}, række {r}, kolonne {c}. {p} står også i {places}.', no: '{p}, rad {r}, kolonne {c}. {p} står også i {places}.', fi: '{p}, rivillä {r}, sarakkeessa {c}. {p} on myös {places}.' },
      saidHead:      { en: 'Row and column {k}: {seq}.', de: 'Zeile und Spalte {k}: {seq}.', fr: 'Ligne et colonne {k} : {seq}.', es: 'Fila y columna del {k}: {seq}.', pt: 'Linha e coluna do {k}: {seq}.', it: 'Riga e colonna {k}: {seq}.', nl: 'Rij en kolom {k}: {seq}.', sv: 'Rad och kolumn {k}: {seq}.', da: 'Række og kolonne {k}: {seq}.', no: 'Rad og kolonne {k}: {seq}.', fi: 'Rivi ja sarake {k}: {seq}.' },
      saidSeat:      { en: 'Empty seat. The number {p} stands at row {c}, column {r}.', de: 'Leeres Fach. Die {p}, die hier saß, steht in Zeile {c}, Spalte {r}.', fr: 'Place vide. Le {p} qui était ici se trouve ligne {c}, colonne {r}.', es: 'Lugar vacío. El {p} que estaba aquí está en la fila {c}, columna {r}.', pt: 'Lugar vazio. O {p} que ficava aqui está na linha {c}, coluna {r}.', it: 'Posto vuoto. La carta {p} che stava qui è in riga {c}, colonna {r}.', nl: 'Lege plek. Het getal {p} staat op rij {c}, kolom {r}.', sv: 'Tom plats. Talet {p} som stod här finns kvar på rad {c}, kolumn {r}.', da: 'Tom plads. Flisen med {p}, der lå her, ligger nu i række {c}, kolonne {r}.', no: 'Tom plass. {p}-kortet som stod her, står nå i rad {c}, kolonne {r}.', fi: 'Tyhjä paikka. Tässä ollut {p} on rivillä {c}, sarakkeessa {r}.' },
      gateTitle:     { en: 'The shelf and the study list, on paper', de: 'Die Lernliste auf Papier', fr: 'La liste à apprendre, sur papier', es: 'La lista de estudio, en papel', pt: 'A lista de estudo no papel', it: 'L’elenco da studiare, su carta', nl: 'De oefenlijst op papier', sv: 'Hyllan och listan, på papper', da: 'Listen på papir', no: 'Lista, på papir', fi: 'Opeteltavat laskut paperilla' },
      gateBody:      { en: 'A sheet with the shelf exactly as it stands, and under it every fact still standing — each written once, because a number only has to be remembered once. The list the class made itself.', de: 'Ein Blatt mit dem Setzkasten genau so, wie er gerade steht, und darunter jede Aufgabe, die noch steht — jede nur einmal. Die Liste, die die Klasse selbst gemacht hat.', fr: 'Une feuille avec le casier tel qu’il est, et dessous chaque calcul encore en place, écrit une seule fois — la liste que la classe a faite elle-même.', es: 'Una hoja con la repisa tal como quedó y, debajo, cada multiplicación que sigue en pie, escrita una sola vez: la lista que armó la clase.', pt: 'Uma folha com a estante exatamente como ela está e, embaixo, cada conta que continua de pé, escrita uma única vez — a lista que a própria turma montou.', it: 'Un foglio con lo scaffale com’è rimasto e, sotto, tutte le moltiplicazioni ancora in piedi, scritte una volta sola: l’elenco che la classe si è costruita da sé.', nl: 'De kast precies zoals hij nu staat, afgedrukt, en daaronder elke keersom die nog overeind staat — elk één keer opgeschreven, in de lijst die de klas zelf heeft gemaakt.', sv: 'Ett blad med hyllan precis som den står, och under den varje uppgift som står kvar — var och en skriven en enda gång. Listan som klassen gjorde själv.', da: 'Et ark med reolen præcis, som den står, og under den hvert stykke, der stadig står tilbage, skrevet én gang hver — den liste, klassen selv har lavet.', no: 'Et ark med reolen nøyaktig slik den står, og under det alt som fortsatt står igjen – skrevet én gang hver, så ingenting må huskes to ganger. Lista klassen har laget selv.', fi: 'Sivu, jolla kortisto on juuri sellaisena kuin se nyt on, ja sen alla jokainen jäljellä oleva lasku kertaalleen kirjoitettuna — lista, jonka luokka teki itse.' },
      gateCta:       { en: 'See the Teacher plan', de: 'Zum Lehrkraft-Abo', fr: 'Voir l’offre Enseignant', es: 'Ver el plan Docente', pt: 'Ver o plano Professor', it: 'Il piano Insegnante', nl: 'Bekijk het Leerkracht-pakket', sv: 'Se Lärarplanen', da: 'Se Lærerabonnementet', no: 'Se Lærer-abonnementet', fi: 'Katso Opettaja-tilaus' },
      setStart:      { en: 'Open with the 1, the 2, the 5 and the 10 already put away', de: 'Beim Öffnen sind 1, 2, 5 und 10 schon weggeräumt', fr: 'Ouvrir avec le 1, le 2, le 5 et le 10 déjà rangés', es: 'Empezar con el 1, el 2, el 5 y el 10 ya retirados', pt: 'Começar com o 1, o 2, o 5 e o 10 já recolhidos', it: 'Apri con 1, 2, 5 e 10 già da parte', nl: 'Beginnen met rij en kolom 1, 2, 5 en 10 al weggezet', sv: 'Öppna med 1, 2, 5 och 10 redan undanlagda', da: 'Start med 1, 2, 5 og 10 lagt væk', no: 'Åpne med 1, 2, 5 og 10 allerede lagt bort', fi: 'Aloita niin, että 1, 2, 5 ja 10 ovat jo sivussa' },
      opGlyph:       { en: '×', de: '·', fr: '×', es: '×', pt: '×', it: '×', nl: '×', sv: '·', da: '·', no: '·', fi: '·' },
      sheetTitle:    { en: 'Our study list', de: 'Unsere Lernliste', fr: 'Notre liste à apprendre', es: 'Nuestra lista de estudio', pt: 'Nossa lista de estudo', it: 'Il nostro elenco da studiare', nl: 'Onze oefenlijst', sv: 'Vår lista', da: 'Vores liste', no: 'Lista vår', fi: 'Nämä me vielä opettelemme' },
      sheetNote:     { en: 'The shelf as we left it, and every fact still standing — each written once.', de: 'Der Setzkasten, wie wir ihn gelassen haben, und jede Aufgabe, die noch steht — jede nur einmal.', fr: 'Le casier tel que nous l’avons laissé, et chaque calcul encore en place.', es: 'La repisa como la dejamos, y cada multiplicación que sigue en pie.', pt: 'A estante como a deixamos e cada conta que continua de pé.', it: 'Lo scaffale come l’abbiamo lasciato e tutte le moltiplicazioni ancora in piedi.', nl: 'De kast zoals wij hem hebben achtergelaten, en elke keersom die nog overeind staat.', sv: 'Hyllan som vi lämnade den, och varje uppgift som står kvar — var och en skriven en enda gång.', da: 'Reolen, som vi forlod den, og hvert stykke, der stadig står tilbage.', no: 'Reolen slik vi forlot den, og alt som fortsatt står igjen – skrevet én gang hver.', fi: 'Kortisto sellaisena kuin sen jätimme, ja kaikki jäljellä olevat laskut.' }
    },
    settings: [
      { key: 'startShort', type: 'toggle', labelKey: 'setStart' }
    ],
    /* ⚠ NOTHING PERSISTS ACROSS RELOAD (#46 refuse #12) — the teacher
       opening cold in front of 25 children gets the same first screen,
       and the daily routine REQUIRES the full hundred. A start-state
       setting is not memory, which is why this one is allowed. */
    defaults: { startShort: false },

    /* ================= lifecycle ===================================== */

    premium: false,

    init: function (api) {
      this.api = api;
      document.body.classList.add('tsh-wide');
      /* ⚠⚠ THE SCROLL ESCAPE, AND IT IS NOT COSMETIC. The shell pins
         html AND body to overflow:hidden, so on a phone visiting the
         standalone page there is no iframe to grow into and scrollY is
         stuck at 0. MEASURED, no 320x568: the ledge began at y=558 in a
         568px window — the whole control row PHYSICALLY UNREACHABLE.
         English fitted and proved nothing; only the longest locales
         reach it, which is why the 11x6 gate exists.
         ⚠ AND THE SELECTOR IS WRITTEN AS TWO RULES, NEVER
         `html,body.tsh-scroll{...}` — that is a selector LIST whose
         `html` half applies unconditionally, which makes the class
         decorative and its mutation unkillable (#22's recorded trap).
         Both nodes carry the class, so poisoning either one shows. */
      document.documentElement.classList.add('tsh-scroll');
      document.body.classList.add('tsh-scroll');
      injectTimesShelfCSS();
      this._anim = null;
      this._arm = null;
      this._lit = null;
      this._focus = null;
      this._padSig = '';
      this.st = this._startState();
      this._fetchEntitlement();
      this._bindPrint();
    },

    /* ⚠ A SETTING THAT CHANGES NOTHING IS FURNITURE (#39). The shell
       calls onSettings then render(), but render() never recomputed the
       state — so flipping "open with the four already put away" moved
       the switch and left the shelf exactly as it was. It applies now,
       in every state: the setting names the shelf you start from, a
       teacher who opens the drawer mid-lesson is asking for that shelf,
       and one press puts anything back. */
    onSettings: function () {
      this._anim = null;
      this._arm = null;
      this._lit = null;
      this.st = this._startState();
      this._padSig = '';
    },

    _startState: function () {
      var s = this.newState(), i;
      if (this.api && this.api.settings && this.api.settings.startShort) {
        for (i = 0; i < FAMILIES.length; i++) s = this.putAway(s, FAMILIES[i]) || s;
      }
      return s;
    },

    /* ⚠ the shell calls render() with NO ARGUMENTS and re-calls it on
       resize; taking an `api` parameter wipes this.api on the second
       call (#43 shipped that once). */
    render: function () {
      if (!this.api) return;
      this._build();
      this._paint();
    },

    /* ⚠ the shell always draws a Reset button and calls this if it
       exists; omit it and the button is dead on every path (#43). */
    reset: function () {
      this._anim = null;
      this._arm = null;
      this._lit = null;
      this.st = this._startState();
      if (this._wrap) this._paint();
    },

    /* ================= DOM =========================================== */

    _svgEl: function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k;
      if (attrs) for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, String(attrs[k]));
      return e;
    },

    _build: function () {
      var api = this.api, self = this;
      var wrap = api.el('div', 'tsh-wrap');
      this._wrap = wrap;

      var arena = api.el('div', 'tsh-arena');
      this._arena = arena;

      var svg = this._svgEl('svg', {
        'class': 'tsh-svg', viewBox: '0 0 ' + VB + ' ' + VB,
        preserveAspectRatio: 'xMidYMid meet', role: 'img'
      });
      this._svg = svg;
      arena.appendChild(svg);

      /* ⚠⚠ THE KEYBOARD LAYER MUST NOT EAT THE POINTER. #46 shipped an
         inset:0 pad container painted AFTER the press target and the
         tray could not be broken by pointer at all, while every model
         assertion passed. POINTER TOUCHES THE SHELF, KEYBOARD DRIVES
         THE PADS. */
      var pads = api.el('div', 'tsh-pads');
      this._pads = pads;
      arena.appendChild(pads);
      wrap.appendChild(arena);

      /* M1: the ONE pointer region. At 320px it is 296x296 — 78x the
         34px canvas floor — and a press resolves to the cell it landed
         on. Ten independently-tappable cards is arithmetically
         impossible and this is the shipped way around it. */
      arena.addEventListener('pointerdown', function (ev) { self._look(ev); });
      /* ⚠ ONE ANNOUNCEMENT PER PRESS. This used to re-announce on every
         pointermove that changed cell, so dragging a finger across the
         shelf queued a hundred full sentences into the live region. The
         ring still follows the finger; only the speech is anchored to
         the press. */
      arena.addEventListener('pointermove', function (ev) { if (self._lit) self._look(ev, true); });
      arena.addEventListener('pointerup', function () { self._unlook(); });
      arena.addEventListener('pointercancel', function () { self._unlook(); });
      arena.addEventListener('pointerleave', function () { self._unlook(); });

      var ledge = api.el('div', 'tsh-ledge');
      this._fam = [];
      var i;
      for (i = 0; i < FAMILIES.length; i++) this._fam.push(this._famBtn(ledge, FAMILIES[i]));
      this._btnStack = this._ledgeBtn(ledge, 'tsh-b-stack', this._glyphStack(), function () { self._doStack(); });
      this._btnRestore = this._ledgeBtn(ledge, 'tsh-b-restore', this._glyphRestore(), function () { self._doRestore(); });
      /* ⚠ THE PRINT CHIP RIDES THE SAME LEDGE, and that is a MEASURED
         decision, not a tidiness one. On its own row it cost 48px plus
         a gap, and the measured budget at 320x568 was 581px against 568
         and at 1366x768 was 791 against 768 — cut off at BOTH ends of
         the sweep. Folding it into the one wrapping ledge recovers 56px
         everywhere, so the arena never has to shrink and the numeral
         never approaches its 14px floor. It keeps a left gap so the
         paid chip still reads as separate from the apparatus. */
      this._btnPrint = this._ledgeBtn(ledge, 'tsh-b-print', this._glyphPrint(), function () {
        if (!self.premium) { self._showGate(); return; }
        self._print();
      });
      wrap.appendChild(ledge);

      this._gate = null;
      this._padSig = '';
      api.stage.appendChild(wrap);
    },

    _ledgeBtn: function (parent, cls, html, fn) {
      var self = this;
      var b = this.api.el('button', 'tsh-btn ' + cls);
      b.type = 'button';
      b.innerHTML = html;
      b.addEventListener('click', fn);
      b.addEventListener('blur', function () { self._disarm(); });
      parent.appendChild(b);
      return b;
    },

    /* ⭐ THE BUTTON FACE IS THE INSTRUCTION. The bare numeral in the
       shelf's own header face and colour, over a dot-matrix glyph
       showing one row and one column filled — literally the shape that
       will leave. NO OPERATOR GLYPH ANYWHERE. #46 shipped a literal `+`
       in eleven locales because it was DRAWN BY CODE, so it survived
       every string ban, every poison case and eleven native reviews. */
    _famBtn: function (parent, k) {
      var self = this;
      var b = this._ledgeBtn(parent, 'tsh-b-fam', this._glyphCross(k), function () { self._doFamily(k); });
      b.setAttribute('data-k', String(k));
      var arm = function () { self._armFamily(k); };
      b.addEventListener('pointerenter', arm);
      b.addEventListener('pointerdown', arm);
      b.addEventListener('focus', arm);
      b.addEventListener('pointerleave', function () { self._disarm(); });
      return { btn: b, k: k };
    },

    _glyphCross: function (k) {
      /* a 5x5 dot matrix with one row and one column filled */
      var g = '', x, y, on;
      for (y = 0; y < 5; y++) {
        for (x = 0; x < 5; x++) {
          on = (x === 1 || y === 1);
          g += '<rect x="' + (x * 4) + '" y="' + (y * 4) + '" width="3" height="3" rx="0.8"'
            + ' fill="currentColor" opacity="' + (on ? '1' : '.24') + '"/>';
        }
      }
      return '<span class="tsh-fnum">' + k + '</span>'
        + '<svg class="tsh-fglyph" viewBox="-0.5 -0.5 20 20" width="20" height="20" aria-hidden="true">' + g + '</svg>';
    },
    _glyphStack: function () {
      return '<svg viewBox="0 0 26 26" width="26" height="26" fill="none" stroke="currentColor"'
        + ' stroke-width="2.1" stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="2.5" y="7.5" width="13" height="13" rx="2.4"/>'
        + '<rect x="9.5" y="2.5" width="13" height="13" rx="2.4" fill="none"/></svg>';
    },
    _glyphRestore: function () {
      var g = '', x, y;
      for (y = 0; y < 5; y++) for (x = 0; x < 5; x++) {
        g += '<rect x="' + (x * 5) + '" y="' + (y * 5) + '" width="4" height="4" rx="1" fill="currentColor"/>';
      }
      return '<svg viewBox="-0.5 -0.5 25 25" width="25" height="25" aria-hidden="true">' + g + '</svg>';
    },
    _glyphPrint: function () {
      return '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor"'
        + ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        + '<path d="M7 9V3h10v6"/><rect x="4" y="9" width="16" height="8" rx="2"/>'
        + '<path d="M7 17v4h10v-4"/></svg>';
    },

    /* ================= the three acts, driven ======================== */

    _busy: function () { return !!this._anim; },

    _armFamily: function (k) {
      if (this._busy()) return;
      var can = this.canPutAway(this.st, k) || this.canPutBack(this.st, k);
      var next = can ? { kind: 'fam', k: k } : null;
      if ((this._arm && this._arm.k) === (next && next.k)) return;
      this._arm = next;
      this._paint();
    },
    _disarm: function () {
      if (!this._arm) return;
      this._arm = null;
      this._paint();
    },

    _doFamily: function (k) {
      if (this._busy()) return;
      this._hideGate();
      var away = this.canPutAway(this.st, k);
      var n = away ? this.putAway(this.st, k) : this.putBack(this.st, k);
      if (!n) return;                       /* visibly disabled, never a silent no-op */
      var from = this.live(this.st), to = this.live(n);
      this.st = n;
      this._arm = null;
      this.api.sound(away ? 520 : 440);
      this.api.announce(this._fmt(away ? 'saidAway' : 'saidBack', { k: k, list: this._listText() }));
      this._run(away ? 'away' : 'back', away ? T_AWAY : T_BACK, { k: k, from: from, to: to });
    },

    _doStack: function () {
      if (this._busy()) return;
      this._hideGate();
      var up = this.canStack(this.st);
      var n = up ? this.stack(this.st) : this.unstack(this.st);
      if (!n) return;
      this.st = n;
      this.api.sound(660);
      this.api.announce(this.api.t(up ? 'saidStack' : 'saidUnstack'));
      this._run(up ? 'stack' : 'unstack', up ? T_AWAY : T_BACK, {});
    },

    _doRestore: function () {
      if (this._busy()) return;
      this._hideGate();
      var n = this.restoreAll(this.st);
      if (!n) return;
      var from = this.live(this.st), wasStacked = this.st.stacked;
      this.st = n;
      this.api.sound(440);
      this.api.announce(this._fmt('saidRestore', { list: this._listText() }));
      this._run('restore', T_BACK, { from: from, to: this.live(n), wasStacked: wasStacked });
    },

    /* ⭐ ONE INTERPOLATOR. Every animated quantity — every centre, every
       card side, every travelling offset, every second card's rise —
       reads the same `t` from this one rAF loop. If the second card
       were a completion callback on the piece's animation the child
       would see cause and effect between two objects instead of one
       object changing (`baking-tray.js:718`). */
    _run: function (kind, ms, payload) {
      var self = this;
      var red = false;
      try {
        red = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
      if (red) ms = Math.max(RM_FLOOR, Math.round(ms * RM_F));
      var t0 = this._now();
      this._anim = { kind: kind, t: 0, ms: ms, p: payload || {} };
      var tick = function () {
        if (!self._anim) return;
        var t = clamp01((self._now() - t0) / ms);
        self._anim.t = t;
        self._paint();
        if (t < 1) {
          if (typeof requestAnimationFrame === 'function') requestAnimationFrame(tick);
          else setTimeout(tick, 16);
        } else {
          self._anim = null;
          self._paint();
        }
      };
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(tick);
      else setTimeout(tick, 16);
    },

    _now: function () {
      return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    },

    /* ================= the look ====================================== */

    /* ⭐ THE SAME-NUMBER LOOK. Press a card and every card holding that
       numeral answers, and the pressed card's own two headers light.
       ⚠ This is the FIBRE, not folding-sheet's TWIN: size 1 to 4, no
       crease, no pairing, and it routinely returns cards that are not
       transposes. It NEVER mutates state. */
    _look: function (ev, quiet) {
      var hit = this._resolve(ev.clientX, ev.clientY);
      if (!hit) { this._unlook(); return; }
      if (this._lit && this._lit.key === hit.key) return;
      this._hideGate();
      this._lit = hit;
      this._paint();
      if (!quiet) this.api.announce(this._lookText(hit));
    },
    _unlook: function () {
      if (!this._lit) return;
      this._lit = null;
      this._paint();
    },

    _resolve: function (clientX, clientY) {
      if (!this._arena) return null;
      var b = this._arena.getBoundingClientRect();
      if (!b.width || !b.height) return null;
      var ux = (clientX - b.left) / b.width * VB;
      var uy = (clientY - b.top) / b.height * VB;
      var L = this.live(this.st), n = L.length, P = this.pitch(n);
      var ix = Math.floor((ux - LANE) / P), iy = Math.floor((uy - LANE) / P);
      var inX = ux >= LANE && ix >= 0 && ix < n;
      var inY = uy >= LANE && iy >= 0 && iy < n;
      if (inX && inY) {
        var r = L[iy], c = L[ix];
        var empty = this.st.stacked && r > c;
        return { kind: empty ? 'seat' : 'card', r: r, c: c, p: r * c, key: 'k' + r + '_' + c };
      }
      if (inY && ux < LANE) return { kind: 'head', k: L[iy], key: 'hr' + L[iy] };
      if (inX && uy < LANE) return { kind: 'head', k: L[ix], key: 'hc' + L[ix] };
      return null;
    },

    /* which cards wear the transient ring, given the current look/arm */
    _ringSet: function () {
      var out = {}, i, f, L, k;
      if (this._arm && this._arm.kind === 'fam') {
        k = this._arm.k;
        L = this.live(this.st);
        for (i = 0; i < L.length; i++) { out['k' + k + '_' + L[i]] = 1; out['k' + L[i] + '_' + k] = 1; }
        return out;
      }
      if (!this._lit) return out;
      if (this._lit.kind === 'head') {
        k = this._lit.k;
        L = this.live(this.st);
        for (i = 0; i < L.length; i++) { out['k' + k + '_' + L[i]] = 1; out['k' + L[i] + '_' + k] = 1; }
        return out;
      }
      f = this.fibre(this.st, this._lit.p);
      for (i = 0; i < f.length; i++) out['k' + f[i].r + '_' + f[i].c] = 1;
      return out;
    },

    /* which HEADER numerals are lit */
    _headSet: function () {
      var out = {};
      if (this._arm && this._arm.kind === 'fam') { out['r' + this._arm.k] = 1; out['c' + this._arm.k] = 1; return out; }
      if (!this._lit) return out;
      if (this._lit.kind === 'head') { out['r' + this._lit.k] = 1; out['c' + this._lit.k] = 1; return out; }
      out['r' + this._lit.r] = 1;
      out['c' + this._lit.c] = 1;
      return out;
    },

    _lookText: function (hit) {
      var i, f, parts, L, seq;
      if (hit.kind === 'head') {
        L = this.live(this.st);
        seq = [];
        for (i = 0; i < L.length; i++) seq.push(hit.k * L[i]);
        return this._fmt('saidHead', { k: hit.k, seq: seq.join(', ') });
      }
      if (hit.kind === 'seat') return this._fmt('saidSeat', { p: hit.p, r: hit.r, c: hit.c });
      /* ⚠ A DOUBLED CARD MUST NOT SAY "NOWHERE ELSE". `fibre` is scoped
         to STANDING cards, so after the stack the 21 at (3,7) has a
         fibre of one — and the tool announced "nowhere else on the
         shelf" about the very card whose whole point is that it holds
         two. It contradicted its own `cardDouble` label on the same
         card, in the state the tool exists to reach. */
      if (this.isDoubled(this.st, hit.r, hit.c)) {
        return this._fmt('saidCardDouble', { p: hit.p, r: hit.r, c: hit.c });
      }
      f = this.fibre(this.st, hit.p);
      parts = [];
      for (i = 0; i < f.length; i++) {
        if (f[i].r === hit.r && f[i].c === hit.c) continue;
        parts.push(this._fmt('addr', { r: f[i].r, c: f[i].c }));
      }
      if (!parts.length) return this._fmt('saidCardOne', { p: hit.p, r: hit.r, c: hit.c });
      return this._fmt('saidCardMore', { p: hit.p, r: hit.r, c: hit.c, places: parts.join('; ') });
    },

    /* ================= text ========================================== */

    _listText: function () { return this.live(this.st).join(', '); },

    _sceneText: function () {
      var s = this._fmt('shelfLabel', { list: this._listText() });
      if (this.st.stacked) s += this.api.t('shelfStacked');
      return s;
    },

    /* the #46 plural mechanism, carried forward verbatim: `[x|one|many]`
       resolved BEFORE interpolation, so a form needs no placeholder.
       ⚠ Label the slots one|many, NEVER singular|plural — Finnish
       `riviä` is a PARTITIVE SINGULAR and "correcting" it to `rivit`
       ships the "1 rows" bug. */
    _fmt: function (key, vals) {
      var s = String(this.api.t(key)), k;
      s = s.replace(/\[([a-z])\|([^|\]]*)\|([^\]]*)\]/g, function (all, name, one, many) {
        var v = vals ? vals[name] : undefined;
        return (Number(v) === 1) ? one : many;
      });
      for (k in vals) if (vals.hasOwnProperty(k)) s = s.split('{' + k + '}').join(String(vals[k]));
      return s;
    },

    /* ================= paint ========================================= */

    _paint: function () {
      if (!this._svg) return;
      var svg = this._svg, a = this._anim;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      var defs = this._svgEl('defs');
      /* ⚠ THE CLIP EXISTS TO OCCLUDE A TRAVELLING PIECE AS IT PASSES
         UNDER THE NUMERAL LANES, so it only ever needs to close the TOP
         and the LEFT — a piece leaves and arrives up-left and never any
         other way. Clipping it to the board on the right and bottom as
         well trimmed the second card off exactly the outermost column
         and row, so the cards at the edge under-displayed the one thing
         the STACK move exists to show. Found by reading the phone
         render; the peek gate now measures UNIFORMITY, not a minimum,
         because a minimum hides an asymmetry of a few pixels. */
      var clip = this._svgEl('clipPath', { id: 'tsh-clip' });
      clip.appendChild(this._svgEl('rect', {
        x: LANE, y: LANE, width: VB - LANE, height: VB - LANE, rx: 14
      }));
      defs.appendChild(clip);
      svg.appendChild(defs);

      /* the shelf ground. Cream cards on deep teal is 5.76:1, and it is
         the whole legibility argument — arithmetic, not taste. */
      svg.appendChild(this._svgEl('rect', {
        'class': 'tsh-ground', x: LANE, y: LANE, width: S, height: S, rx: 14
      }));

      var body = this._svgEl('g', { 'class': 'tsh-body', 'clip-path': 'url(#tsh-clip)' });
      svg.appendChild(body);

      var from = (a && a.p.from) ? a.p.from : this.live(this.st);
      var to = this.live(this.st);
      var t = a ? a.t : 1;
      var ms = a ? a.ms : 1;
      var kind = a ? a.kind : null;

      /* phase clocks, all read off the SAME t */
      var slide = 0, close = 1, rise = 1;
      if (kind === 'away') {
        slide = easeOut(clamp01((t * ms - T_LIFT) / T_SLIDE));
        close = ease(clamp01((t * ms - (T_AWAY - T_CLOSE)) / T_CLOSE));
        from = a.p.from; to = a.p.to;
      } else if (kind === 'back') {
        slide = 1 - easeOut(clamp01((t * ms - (T_BACK - 300)) / 300));
        close = ease(clamp01((t * ms) / T_OPEN));
        from = a.p.from; to = a.p.to;
      } else if (kind === 'stack') {
        slide = easeOut(clamp01((t * ms - T_LIFT) / T_SLIDE));
        rise = ease(clamp01((t * ms - (T_AWAY - T_CARD)) / T_CARD));
        close = 1;
      } else if (kind === 'unstack') {
        slide = 1 - easeOut(clamp01((t * ms - (T_BACK - 300)) / 300));
        rise = 1 - ease(clamp01((t * ms) / T_CARD));
        close = 1;
      } else if (kind === 'restore') {
        slide = 1 - easeOut(clamp01((t * ms - 120) / 300));
        close = ease(clamp01(t * ms / T_OPEN));
        from = a.p.from; to = a.p.to;
      }

      this._paintShelf(body, from, to, close, slide, rise, kind, a);
      this._paintHeads(svg, from, to, close, kind, a);
      this._syncPads();
      this._syncButtons();
    },

    /* the interpolated centre of a lane value, and the interpolated
       pitch. A value present in both layouts LERPS; a value present in
       only one keeps that one. */
    _cx: function (from, to, v, k) {
      var i = this.indexOf(from, v), j = this.indexOf(to, v);
      if (i < 0) return this.centre(to.length, j);
      if (j < 0) return this.centre(from.length, i);
      return lerp(this.centre(from.length, i), this.centre(to.length, j), k);
    },
    _pit: function (from, to, k) { return lerp(this.pitch(from.length), this.pitch(to.length), k); },

    _paintShelf: function (g, from, to, close, slide, rise, kind, a) {
      var self = this;
      var P = this._pit(from, to, close);
      var side = P * CARD_F;
      var rings = this._ringSet();
      var stacked = this.st.stacked;

      /* THE TRAVEL. The leaving (or arriving) piece is ONE rigid object
         moving up-left, out through the top-left corner, occluded by
         the clip as it passes under the numeral lanes.
         ⚠ NEVER a cross-fade: a dissolve reads as LOSS (#46), and here
         less than anywhere — putting away what you already know is a
         GAIN. */
      var D = S + P;
      var off = D * slide;

      /* pass 1 — the empty seats (recesses), under everything */
      /* ⚠ ONE SOURCE OF TRUTH. This loop used to re-derive the seat set
         inline while `seats()` sat unreferenced — two independent copies
         of one rule, so a mutation of either was invisible to the other.
         The renderer now asks the model. */
      var i, j, r, c;
      var seats = (kind === 'stack' || kind === 'unstack')
        ? this._seatsOf(to) : this.seats(this.st);
      for (i = 0; i < seats.length; i++) {
        r = seats[i].r; c = seats[i].c;
        g.appendChild(this._svgEl('rect', {
          'class': 'tsh-seat',
          x: this._cx(from, to, c, close) - side / 2,
          y: this._cx(from, to, r, close) - side / 2,
          width: side, height: side, rx: side * 0.14
        }));
      }

      /* pass 2 — the standing cards */
      var draw = function (r, c, dx, dy, ringKey) {
        var x = self._cx(from, to, c, close) + dx;
        var y = self._cx(from, to, r, close) + dy;
        self._card(g, x, y, side, P, r * c, !!rings[ringKey], self._doubleAmt(r, c, kind, rise, stacked));
      };

      var leavingFam = (kind === 'away' || kind === 'back') ? a.p.k : null;

      for (i = 0; i < from.length; i++) {
        for (j = 0; j < from.length; j++) {
          r = from[i]; c = from[j];
          var inTo = this.indexOf(to, r) >= 0 && this.indexOf(to, c) >= 0;
          var isCross = (leavingFam !== null) && (r === leavingFam || c === leavingFam);
          var belowDiag = r > c;
          var travelling = false;
          if (isCross) travelling = true;
          else if ((kind === 'stack' || kind === 'unstack') && belowDiag) travelling = true;
          else if (kind === 'restore' && !this._wasStanding(a, r, c)) travelling = true;

          if (!inTo && !isCross) continue;
          if (stacked && belowDiag && kind !== 'stack' && kind !== 'unstack') continue;
          if (!stacked && kind === 'unstack' && belowDiag && !travelling) continue;

          draw(r, c, travelling ? -off : 0, travelling ? -off : 0, 'k' + r + '_' + c);
        }
      }

      /* cards that exist only in `to` (a family coming back, or the
         restore) enter as one rigid piece from the same direction */
      if (kind === 'back' || kind === 'restore') {
        for (i = 0; i < to.length; i++) {
          for (j = 0; j < to.length; j++) {
            r = to[i]; c = to[j];
            if (this.indexOf(from, r) >= 0 && this.indexOf(from, c) >= 0) {
              if (kind !== 'restore') continue;
              if (this._wasStanding(a, r, c)) continue;
            }
            draw(r, c, -off, -off, 'k' + r + '_' + c);
          }
        }
      }
    },

    _wasStanding: function (a, r, c) {
      if (!a || !a.p) return true;
      var f = a.p.from || [];
      if (this.indexOf(f, r) < 0 || this.indexOf(f, c) < 0) return false;
      if (a.p.wasStacked && r > c) return false;
      return true;
    },

    /* how much of the second card is showing: 0..1 */
    _doubleAmt: function (r, c, kind, rise, stacked) {
      if (r >= c) return 0;
      if (kind === 'stack') return rise;
      if (kind === 'unstack') return rise;
      return stacked ? 1 : 0;
    },

    /* ⚠⚠ THE DRAW ORDER IS THE WHOLE POINT OF THE STACK, AND IT SHIPPED
       WRONG ONCE. The second card was painted first and the lip second,
       at almost the same offset — so the dark lip covered the very peek
       that proves a card holds two numbers, and the payoff of the whole
       STACK move was INVISIBLE. The browser gate had asserted that
       fifteen `.tsh-second` nodes EXIST, which is the "the string exists
       is not the string is reached" lesson wearing a picture. Found by
       reading the render.
       The physical order is one shadow under the PILE, then the card
       underneath, then the card on top. */
    _card: function (g, cx, cy, side, P, p, ring, dbl) {
      var rx = side * 0.12;
      var d = (dbl > 0) ? P * STACK_OFF * dbl : 0;
      g.appendChild(this._svgEl('rect', {
        'class': 'tsh-lip', x: cx - side / 2 + d, y: cy - side / 2 + d + LIFT,
        width: side, height: side, rx: rx
      }));
      if (dbl > 0) {
        g.appendChild(this._svgEl('rect', {
          'class': 'tsh-second', x: cx - side / 2 + d, y: cy - side / 2 + d,
          width: side, height: side, rx: rx, opacity: dbl
        }));
      }
      g.appendChild(this._svgEl('rect', {
        'class': 'tsh-card' + (ring ? ' is-lit' : ''), x: cx - side / 2, y: cy - side / 2,
        width: side, height: side, rx: rx
      }));
      this._num(g, cx, cy, p, P, 'tsh-p');
    },

    /* ⚠ EVERY NUMERAL IS ITS OWN text-anchor:middle NODE at a computed
       x. Baloo 2 ships no reliable `tnum`, so two numerals in one <text>
       walk a column out of true.
       M5: `100` is the only three-digit card and it keeps the SAME
       font-size, condensed by textLength. */
    _num: function (g, cx, cy, v, P, cls) {
      var fs = P * NUM_F;
      var attrs = {
        'class': cls, x: cx, y: cy, 'font-size': fs,
        'text-anchor': 'middle', 'dominant-baseline': 'central'
      };
      if (String(v).length >= 3) {
        /* ⚠ measured against the CARD, not the pitch, so it tracks
           CARD_F: at 0.82 of the pitch the condensed advance came out
           flush with the card edge and the containment check fired. */
        attrs.textLength = P * CARD_F * 0.86;
        attrs.lengthAdjust = 'spacingAndGlyphs';
      }
      var t = this._svgEl('text', attrs);
      t.textContent = String(v);
      g.appendChild(t);
      return t;
    },

    _paintHeads: function (svg, from, to, close, kind, a) {
      var g = this._svgEl('g', { 'class': 'tsh-heads' });
      var heads = this._headSet();
      var all = {}, i, v, x, y, fs = LANE * HEAD_F;
      for (i = 0; i < from.length; i++) all[from[i]] = 1;
      for (i = 0; i < to.length; i++) all[to[i]] = 1;
      var leavingFam = (kind === 'away' || kind === 'back') ? a.p.k : null;
      for (v = 1; v <= HI; v++) {
        if (!all[v]) continue;
        var gone = this.indexOf(to, v) < 0;
        if (gone && v !== leavingFam) continue;
        var op = (gone || (leavingFam === v && kind === 'back' && close < 1)) ? (kind === 'away' ? 1 - close : close) : 1;
        x = this._cx(from, to, v, close);
        y = this._cx(from, to, v, close);
        var tc = this._num(g, x, LANE / 2, v, LANE, 'tsh-h' + (heads['c' + v] ? ' is-lit' : ''));
        tc.setAttribute('font-size', fs);
        tc.setAttribute('opacity', op);
        var tr = this._num(g, LANE / 2, y, v, LANE, 'tsh-h' + (heads['r' + v] ? ' is-lit' : ''));
        tr.setAttribute('font-size', fs);
        tr.setAttribute('opacity', op);
      }
      svg.appendChild(g);
    },

    /* ================= the pads (keyboard + AT + liveness) ============ */

    /* (N+1)^2 pads — the cards PLUS the header row and column PLUS the
       corner — as ONE roving-tabindex grid, so ArrowUp from row 1 lands
       on the column header and the structure is walkable. 121 tab stops
       would be unusable; this is one. */
    _syncPads: function () {
      if (!this._pads || this._anim) return;
      var L = this.live(this.st), n = L.length;
      var sig = L.join(',') + '|' + (this.st.stacked ? 1 : 0);
      if (sig === this._padSig) { this._relabelPads(); return; }
      this._padSig = sig;
      var pads = this._pads, self = this;
      while (pads.firstChild) pads.removeChild(pads.firstChild);
      this._padList = [];

      var pct = function (u) { return (u / VB * 100) + '%'; };
      var P = this.pitch(n);
      var mk = function (x, y, w, h, kind, r, c) {
        var b = self.api.el('button', 'tsh-pad');
        b.type = 'button';
        b.style.left = pct(x); b.style.top = pct(y);
        b.style.width = pct(w); b.style.height = pct(h);
        b.setAttribute('data-kind', kind);
        if (r != null) b.setAttribute('data-r', String(r));
        if (c != null) b.setAttribute('data-c', String(c));
        b.tabIndex = -1;
        pads.appendChild(b);
        self._padList.push(b);
        return b;
      };

      mk(0, 0, LANE, LANE, 'corner');
      var i, j;
      for (i = 0; i < n; i++) mk(LANE + i * P, 0, P, LANE, 'colhead', null, L[i]);
      for (i = 0; i < n; i++) mk(0, LANE + i * P, LANE, P, 'rowhead', L[i], null);
      for (i = 0; i < n; i++) for (j = 0; j < n; j++) mk(LANE + j * P, LANE + i * P, P, P, 'cell', L[i], L[j]);

      for (i = 0; i < this._padList.length; i++) {
        (function (b) {
          b.addEventListener('click', function () { self._padAct(b); });
          b.addEventListener('focus', function () { self._padFocus(b); });
          b.addEventListener('blur', function () { self._unlook(); });
          b.addEventListener('keydown', function (ev) { self._padKey(ev, b); });
        }(this._padList[i]));
      }
      this._relabelPads();
      this._rove();
    },

    _relabelPads: function () {
      if (!this._padList) return;
      var i, b, kind, r, c, p;
      for (i = 0; i < this._padList.length; i++) {
        b = this._padList[i];
        kind = b.getAttribute('data-kind');
        r = b.getAttribute('data-r'); c = b.getAttribute('data-c');
        if (kind === 'corner') { b.setAttribute('aria-label', this.api.t('cornerLabel')); continue; }
        if (kind === 'rowhead') { b.setAttribute('aria-label', this._fmt('rowHead', { k: Number(r) })); continue; }
        if (kind === 'colhead') { b.setAttribute('aria-label', this._fmt('colHead', { k: Number(c) })); continue; }
        r = Number(r); c = Number(c); p = r * c;
        if (this.st.stacked && r > c) b.setAttribute('aria-label', this._fmt('seatLabel', { p: p, r: r, c: c }));
        else if (this.isDoubled(this.st, r, c)) b.setAttribute('aria-label', this._fmt('cardDouble', { p: p, r: r, c: c }));
        else b.setAttribute('aria-label', this._fmt('cardLabel', { p: p, r: r, c: c }));
      }
      if (this._pads) this._pads.setAttribute('aria-label', this._sceneText());
    },

    _padHit: function (b) {
      var kind = b.getAttribute('data-kind');
      if (kind === 'corner') return null;
      if (kind === 'rowhead') return { kind: 'head', k: Number(b.getAttribute('data-r')), key: 'hr' + b.getAttribute('data-r') };
      if (kind === 'colhead') return { kind: 'head', k: Number(b.getAttribute('data-c')), key: 'hc' + b.getAttribute('data-c') };
      var r = Number(b.getAttribute('data-r')), c = Number(b.getAttribute('data-c'));
      var empty = this.st.stacked && r > c;
      return { kind: empty ? 'seat' : 'card', r: r, c: c, p: r * c, key: 'k' + r + '_' + c };
    },

    _padFocus: function (b) {
      this._focus = b.getAttribute('data-kind') + ':' + b.getAttribute('data-r') + ':' + b.getAttribute('data-c');
    },

    /* ⚠ Enter on a diagonal square speaks and rings and is NOT disabled
       — a child must be able to press 49 and discover why it has
       nowhere to go. */
    _padAct: function (b) {
      var hit = this._padHit(b);
      if (!hit) { this.api.announce(this._sceneText()); return; }
      this._lit = hit;
      this._paint();
      this.api.announce(this._lookText(hit));
    },

    _padKey: function (ev, b) {
      var L = this.live(this.st), n = L.length;
      var kind = b.getAttribute('data-kind');
      var r = b.getAttribute('data-r'), c = b.getAttribute('data-c');
      var ri = (kind === 'corner' || kind === 'colhead') ? -1 : this.indexOf(L, Number(r));
      var ci = (kind === 'corner' || kind === 'rowhead') ? -1 : this.indexOf(L, Number(c));
      var d = 0;
      if (ev.key === 'ArrowUp') ri -= 1;
      else if (ev.key === 'ArrowDown') ri += 1;
      else if (ev.key === 'ArrowLeft') ci -= 1;
      else if (ev.key === 'ArrowRight') ci += 1;
      else if (ev.key === 'Home') ci = -1;
      else if (ev.key === 'End') ci = n - 1;
      else if (ev.key === 'Escape') { this._unlook(); return; }
      else return;
      ev.preventDefault();
      if (ri < -1) ri = -1;
      if (ci < -1) ci = -1;
      if (ri > n - 1) ri = n - 1;
      if (ci > n - 1) ci = n - 1;
      var want;
      if (ri < 0 && ci < 0) want = 'corner::';
      else if (ri < 0) want = 'colhead:null:' + L[ci];
      else if (ci < 0) want = 'rowhead:' + L[ri] + ':null';
      else want = 'cell:' + L[ri] + ':' + L[ci];
      var i, bb, key;
      for (i = 0; i < this._padList.length; i++) {
        bb = this._padList[i];
        key = bb.getAttribute('data-kind') + ':' + bb.getAttribute('data-r') + ':' + bb.getAttribute('data-c');
        if (key === want) {
          for (d = 0; d < this._padList.length; d++) this._padList[d].tabIndex = -1;
          bb.tabIndex = 0;
          bb.focus();
          return;
        }
      }
    },

    _rove: function () {
      var i;
      if (!this._padList || !this._padList.length) return;
      for (i = 0; i < this._padList.length; i++) this._padList[i].tabIndex = -1;
      this._padList[0].tabIndex = 0;
    },

    /* ================= button state ================================== */

    /* ⚠ EVERY REFUSAL IS VISIBLY DISABLED WITH AN ARIA-LABEL STATING
       THE REQUIREMENT — never a silent no-op, and never hidden. Exactly
       three disabled classes exist in the whole tool. */
    _syncButtons: function () {
      var i, f, k, on;
      for (i = 0; i < this._fam.length; i++) {
        f = this._fam[i]; k = f.k;
        /* ⚠ THE AWAY-STATE IS `st.off[k]`, NOT `canPutBack`. This read
           "can I put it back right now", which is false while stacked —
           so at the exact instant all four families were away, all four
           buttons dropped their filled state and reported
           aria-pressed="false". A blind child was told the shelf was
           full at its emptiest. Found by four native panels reading the
           model; no gate in this suite could see it. */
        on = this.st.off[k] === true;
        f.btn.disabled = this.st.stacked;
        f.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        f.btn.className = 'tsh-btn tsh-b-fam' + (on ? ' is-away' : '');
        f.btn.setAttribute('aria-label', this._fmt(
          this.st.stacked ? 'famLocked' : (on ? 'famBack' : 'famAway'), { k: k }));
      }
      var canS = this.canStack(this.st), canU = this.canUnstack(this.st);
      this._btnStack.disabled = !(canS || canU);
      this._btnStack.setAttribute('aria-pressed', canU ? 'true' : 'false');
      this._btnStack.className = 'tsh-btn tsh-b-stack' + (canU ? ' is-away' : '');
      this._btnStack.setAttribute('aria-label', this.api.t(canU ? 'unstackBtn' : (canS ? 'stackBtn' : 'stackLocked')));

      var canR = this.canRestore(this.st);
      this._btnRestore.disabled = !canR;
      this._btnRestore.setAttribute('aria-label', this.api.t(canR ? 'restoreBtn' : 'restoreLocked'));
      /* ⚠ THE ONE DISHONEST REFUSAL IN THE TOOL, found by six panels.
         The chip kept the label "Print the study list" in EVERY
         entitlement state while its handler opened a paywall — so a
         free teacher, and every screen-reader user, was told the button
         prints. The tool's own law three lines up says a refusal is
         visibly disabled with an aria-label stating the requirement.
         And the dashed border was set once at build time, so a teacher
         who PAID went on looking at the lock. */
      this._btnPrint.setAttribute('aria-label', this.api.t(this.premium ? 'printBtn' : 'printLocked'));
      this._btnPrint.className = 'tsh-btn tsh-b-print' + (this.premium ? ' is-paid' : '');
    },

    /* ================= the gate + print =============================== */

    /* ⚠ THE PAYWALL HAD NO WAY OUT. Nothing removed it but another
       press of the same chip, so a teacher who tapped it once by
       accident had a subscription panel under the apparatus, on the
       classroom projector, for the rest of the lesson. Any act on the
       apparatus now dismisses it — which costs no string and no extra
       control. */
    _hideGate: function () {
      if (!this._gate) return;
      if (this._gate.parentNode) this._gate.parentNode.removeChild(this._gate);
      this._gate = null;
    },

    _showGate: function () {
      var api = this.api;
      this._hideGate();
      var box = api.el('div', 'tsh-gate');
      var h = api.el('h3'); h.textContent = api.t('gateTitle');
      var p = api.el('p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'tsh-gate-cta');
      a.textContent = api.t('gateCta');
      a.setAttribute('href', '/pricing');
      box.appendChild(h); box.appendChild(p); box.appendChild(a);
      this._wrap.appendChild(box);
      this._gate = box;
    },

    /* ⭐ THE PAID SHEET IS THE CLASS'S STUDY LIST, NOT A DRILL GRID.
       "Copy down what's left. That's your list for the year — and you
       made it." A practice mode on the residue is the single most
       commercially obvious extension and it converts the instrument
       into the exact product the constraints ban.
       ⚠ THE SHEET IS A SIBLING OF THE WRAP, NEVER A CHILD: the print
       block sets .tsh-wrap{display:none} and a hidden parent kills the
       whole subtree, so a sheet built inside it measures 0px tall on
       paper while every assertion stays green (#46 shipped that once).
       ⚠ INK-LIGHT: figure and ground INVERT for paper — outlines only,
       standing cards at full weight, retired seats dashed hairlines. */
    _buildSheet: function () {
      var api = this.api;
      if (this._sheet && this._sheet.parentNode) this._sheet.parentNode.removeChild(this._sheet);
      var sheet = api.el('div', 'tsh-sheet');

      var h = api.el('h2', 'tsh-sheet-h');
      h.textContent = api.t('sheetTitle');
      sheet.appendChild(h);
      var note = api.el('p', 'tsh-sheet-note');
      note.textContent = api.t('sheetNote');
      sheet.appendChild(note);

      sheet.appendChild(this._sheetSvg());

      var list = api.el('ul', 'tsh-sheet-list');
      var facts = this.studyList(this.st), i, li;
      var op = api.t('opGlyph');
      for (i = 0; i < facts.length; i++) {
        li = api.el('li');
        li.textContent = facts[i].a + ' ' + op + ' ' + facts[i].b + ' = ' + facts[i].p;
        list.appendChild(li);
      }
      sheet.appendChild(list);

      this._sheet = sheet;
      api.stage.appendChild(sheet);
      /* ⚠ THE PRINT BLOCK IS SCOPED TO THIS CLASS. Without it the
         @media print rules fired for EVERYBODY, hiding the whole page
         to reveal a `.tsh-sheet` that only exists after the chip is
         pressed — so a browser-initiated Ctrl+P printed a BLANK PAGE,
         silently, for a paying teacher and a free visitor alike. Found
         by the Finnish panel reading the print path, not by any gate. */
      document.body.classList.add('tsh-printing');
    },

    _sheetSvg: function () {
      var L = this.live(this.st), n = L.length, P = this.pitch(n), side = P * CARD_F;
      var svg = this._svgEl('svg', {
        'class': 'tsh-sheet-svg', viewBox: '0 0 ' + VB + ' ' + VB,
        preserveAspectRatio: 'xMidYMid meet'
      });
      var i, j, r, c, x, y, cls;
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          r = L[i]; c = L[j];
          x = this.centre(n, j); y = this.centre(n, i);
          cls = (this.st.stacked && r > c) ? 'tsh-p-gone' : 'tsh-p-card';
          svg.appendChild(this._svgEl('rect', {
            'class': cls, x: x - side / 2, y: y - side / 2, width: side, height: side, rx: side * 0.14
          }));
          /* ⚠ THE PAPER MUST NOT MARK THE DIAGONAL EITHER. An inner
             keyline on every r === c cell singled out the squares — the
             one observation the screen deliberately refuses to make, so
             that a child can notice it unprompted. The sheet was
             contradicting the apparatus, and no string explained the
             mark. */
        }
        this._pText(svg, this.centre(n, i), LANE / 2, L[i]);
        this._pText(svg, LANE / 2, this.centre(n, i), L[i]);
      }
      return svg;
    },
    _pText: function (svg, x, y, v) {
      var t = this._svgEl('text', {
        'class': 'tsh-p-num', x: x, y: y, 'font-size': LANE * 0.44,
        'text-anchor': 'middle', 'dominant-baseline': 'central'
      });
      t.textContent = String(v);
      svg.appendChild(t);
    },

    _print: function () {
      this._buildSheet();
      window.print();
    },

    /* Ctrl+P must reach the same sheet as the chip. A paying teacher
       gets the study list; a free visitor prints the ordinary page
       rather than a blank one, because the class is never added. */
    _bindPrint: function () {
      var self = this;
      if (this._printBound || typeof window === 'undefined') return;
      if (typeof window.addEventListener !== 'function') return;
      this._printBound = true;
      window.addEventListener('beforeprint', function () {
        if (self.premium) self._buildSheet();
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('tsh-printing');
      });
    },

    /* ================= entitlement =================================== */

    /* ⚠ UNKNOWN ENTITLEMENT MUST BE PESSIMISTIC. An unresolved tier is
       free-tier-locked, never optimistically unlocked. */
    _fetchEntitlement: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      try {
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) {}
    }
  };

  /* ================= CSS =========================================== */
  /* ⚠ NO `vh` ANYWHERE INSIDE A MANIPULATIVE (it is iframe-relative and
     the iframe is not the viewport). NO `font:` shorthand with an
     unquoted "Baloo 2" — the whole declaration is dropped and a clamp()
     floor silently never applies. NO inline `background` shorthand. */
  var CSS_DONE = false;
  function injectTimesShelfCSS() {
    if (CSS_DONE) return;
    CSS_DONE = true;
    var css = ''
      + 'html.tsh-scroll{overflow-y:auto;height:auto;min-height:100%;}'
      + 'body.tsh-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'
      + '.tsh-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
      /* ⚠⚠ THE CAP IS ON THE WIDTH. Capping the HEIGHT of an
         aspect-ratio:1/1 box letterboxes the SVG while the
         %-positioned pads stay bound to the box, and every pad drifts
         off what it drives — the #43 defect where every mark rendered
         as TWO CIRCLES. Every height budget below is spent as a
         max-WIDTH inside a height media query. */
      + '.tsh-arena{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;margin:0 auto;}'
      + '.tsh-svg{display:block;width:100%;height:100%;}'
      + '.tsh-pads{position:absolute;inset:0;pointer-events:none;}'
      + '.tsh-pad{position:absolute;margin:0;padding:0;border:0;background-color:transparent;'
      + 'border-radius:6px;opacity:0;cursor:default;}'
      + '.tsh-pad:focus-visible{opacity:1;outline:3px solid #F2784B;outline-offset:-3px;}'

      /* the material — ten values, no eleventh. Cream on teal is 5.76:1
         and that is the whole legibility argument. No green, no red, no
         colour on the diagonal, no permanent family colours. */
      + '.tsh-ground{fill:#146B5E;}'
      + '.tsh-seat{fill:#093A32;}'
      + '.tsh-lip{fill:#0A3A33;opacity:.42;}'
      /* ⚠ the second card must be SEEN, not merely present — cream on
         cream needs a rim that reads, so this one is a full step darker
         than the top card's */
      + '.tsh-second{fill:#EFE3CB;stroke:#C0AC80;stroke-width:2.4;}'
      + '.tsh-card{fill:#FBF3E4;stroke:#DCCBA8;stroke-width:1.5;}'
      /* ⚠ coral reads 2.28:1 on teal and must never be used bare — the
         lit ring is a heavy coral stroke ON the cream card, where it is
         5.7:1. It is TRANSIENT: a family gets its light only while it
         is being pointed at. */
      + '.tsh-card.is-lit{stroke:#F2784B;stroke-width:7;}'
      + '.tsh-p{fill:#2A2A35;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;}'
      + '.tsh-h{fill:#2A2A35;opacity:.86;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;}'
      + '.tsh-h.is-lit{fill:#C4551F;opacity:1;}'

      /* the ledge — glyph only, fixed height, so no locale can wrap it */
      + '.tsh-ledge{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:100%;max-width:560px;}'
      + '.tsh-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;'
      + 'min-width:64px;min-height:56px;padding:6px 10px;border:2px solid #146B5E;border-radius:14px;'
      + 'background-color:#FEFAF3;color:#146B5E;cursor:pointer;}'
      + '.tsh-btn:disabled{opacity:.45;cursor:default;}'
      + '.tsh-btn.is-away{background-color:#146B5E;color:#FEFAF3;}'
      + '.tsh-btn:focus-visible{outline:3px solid #F2784B;outline-offset:-3px;}'
      + '.tsh-fnum{font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;font-size:20px;line-height:1;}'
      + '.tsh-fglyph{display:block;}'
      + '.tsh-b-print{margin-left:16px;border-style:dashed;}'

      + '.tsh-gate{max-width:520px;margin:6px auto 0;padding:14px 16px;border:2px dashed #146B5E;'
      + 'border-radius:16px;background-color:#FEFAF3;text-align:center;}'
      + '.tsh-gate h3{margin:0 0 6px;font-family:"Baloo 2",system-ui,sans-serif;font-size:18px;color:#146B5E;}'
      + '.tsh-gate p{margin:0 0 10px;font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#2A2A35;}'
      + '.tsh-gate-cta{display:inline-block;padding:8px 16px;border-radius:999px;'
      + 'background-color:#F2784B;color:#fff;font-family:Nunito,system-ui,sans-serif;font-weight:700;text-decoration:none;}'

      /* the sheet is hidden on screen and is a SIBLING of the wrap */
      + '.tsh-sheet{display:none;}'

      /* short viewports — spent as max-WIDTH, never max-height */
      /* ⚠ MEASURED, NOT DERIVED. The chrome above the wrap runs 80-128px
         and the ledge is 58px on one row or 122px on two, so the budget
         is wrapTop + arena + 8 + ledge. At a 1024x600 board that leaves
         about 410px for the arena and at 900x540 about 300px. These two
         numbers come from that measurement with a margin — they are not
         a formula, and they are spent as max-WIDTH so the SVG can never
         letterbox. */
      + '@media (max-height:700px){.tsh-arena{max-width:400px;}}'
      + '@media (max-height:560px){.tsh-arena{max-width:300px;}}'
      /* upward tiers, every one carrying a min-height floor so a long
         locale cannot be clipped by .lcs-app{overflow:hidden} */
/* ⚠ THE CHIPS RAMP TOO, NOT JUST THE CARD. The wide-viewport gate
         measures a REPEATED UNIT and reports HOLLOW WIDENING when the box
         grows and the instrument does not — and it was right: the arena
         went 560 -> 1040 while every ledge button stayed 64px wide at
         2560. A projector wants a bigger chip, so the honest fix is to
         ramp it rather than add the tool to the gate's exception ratchet.
         Measured against the ledge width at each tier: 7 chips plus six
         8px gaps is 552 / 636 / 720 against 640 / 780 / 1040. */
      + '@media (min-width:1367px) and (min-height:820px){.tsh-arena{max-width:640px;}'
      + '.tsh-ledge{max-width:640px;}.tsh-btn{min-width:72px;min-height:64px;}'
      + '.tsh-fnum{font-size:22px;}}'
      + '@media (min-width:1800px) and (min-height:1000px){.tsh-arena{max-width:780px;}'
      + '.tsh-ledge{max-width:780px;}.tsh-btn{min-width:84px;min-height:72px;}'
      + '.tsh-fnum{font-size:24px;}}'
      + '@media (min-width:2400px) and (min-height:1320px){.tsh-arena{max-width:1040px;}'
      + '.tsh-ledge{max-width:1040px;}.tsh-btn{min-width:96px;min-height:80px;}'
      + '.tsh-fnum{font-size:28px;}}'

      /* ⚠ A PRINT CHIP THAT CALLS window.print() WITH NO @media print
         BLOCK PRINTS THE WHOLE WEB PAGE, and the shared liveness gate
         scores it green because window.print fired. #40 and #41 both
         shipped exactly that. */
      + '@media print{'
      + 'body.tsh-printing *{visibility:hidden;}'
      + 'body.tsh-printing .tsh-sheet,body.tsh-printing .tsh-sheet *{visibility:visible;}'
      + 'body.tsh-printing .tsh-wrap{display:none !important;}'
      + 'body.tsh-printing .tsh-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.tsh-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.tsh-sheet-note{margin:0 0 4mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.tsh-sheet-svg{display:block;width:120mm;height:120mm;margin:0 auto 5mm;}'
      + '.tsh-p-card{fill:none;stroke:#000;stroke-width:9;}'
      + '.tsh-p-gone{fill:none;stroke:#000;stroke-width:4;stroke-dasharray:14 20;}'
      + '.tsh-p-sq{fill:none;stroke:#000;stroke-width:4;}'
      + '.tsh-p-num{fill:#000;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;}'
      + '.tsh-sheet-list{display:flex;flex-wrap:wrap;gap:2mm 8mm;margin:0;padding:0;list-style:none;}'
      + '.tsh-sheet-list li{font-family:"Baloo 2",system-ui,sans-serif;font-size:12pt;color:#000;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-tsh', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }

  if (typeof window !== 'undefined') window.TimesShelf = TimesShelf;
  if (typeof module !== 'undefined' && module.exports) module.exports = TimesShelf;
}());
