/* =====================================================================
   TOOL #45 — THE EXCHANGE MACHINE   (exchange-machine.js)
   ---------------------------------------------------------------------
   THE ONE THESIS. The written vertical sum and the material are ONE
   OBJECT. Each place is a LANE, and the lane is the written column
   continued downward into a tube. Cross a digit out and the material
   moves in the same lane in the same instant; move the material and the
   mark writes itself. Fuson & Briars (1990, JRME, grades 1-2) is
   specific that the material action and the written record must be
   co-temporal AND co-located; a blocks area beside a digits area is
   their control condition, not their finding.
   ⭐ CO-LOCATION HERE MEANS SHARING THE PLACE-VALUE AXIS. x-position IS
   place value, for the numerals and the material identically, so a
   disc that moves one lane left has been multiplied by ten and you can
   watch it happen.

   THE INVENTION. A ten does not "convert". It SHATTERS — one disc
   leaves the lane to the left, travels across the written digit DRAWING
   THE STRIKE-THROUGH AS IT GOES, and bursts into ten discs in the tube
   to its right. Run it backwards and ten discs fuse into one. Carrying
   and borrowing become visibly ONE MACHINE RUNNING IN TWO DIRECTIONS,
   which no worksheet and no tub of blocks can show, because on paper
   the two are taught as unrelated rituals.

   THE HEIGHT IDENTITY is the picture: the brim of every tube sits at
   EXACTLY TEN, and a full tube is exactly as tall as the roll that made
   it. Once a class has seen that, it is the ruler for every later
   glance and nobody has to count.

   ⭐ WHY DISCS AND NOT BLOCKS — the fence and the didactics agree, which
   is rare enough to write down. Base-ten blocks are PROPORTIONAL: value
   is carried by SIZE. The written algorithm is POSITIONAL: value is
   carried by PLACE. A child reading value off size has not yet made the
   move the notation demands, and is exactly the child who cannot do
   300 - 148. So `place-value-lab` correctly owns the proportional
   stage, and this tool owns the positional one. The discs are
   IDENTICAL in every lane — same size, same colour — and only the lane
   says what they are worth. Two independent panels reached this
   separately; a third asked for one hue per column and was overruled,
   because material whose appearance tracks its value lets a child
   avoid ever looking at the column. THE TUBE carries the faint tint;
   the disc never does.

   THE MOAT — the notation is YOUR COUNTRY'S, and it is the product.
   ⭐ AND THE FINDING THAT COST THE MOST TO GET: GERMANY DOES NOT
   PRESCRIBE A METHOD. PIKAS/DZLM, the official NRW primary-maths
   portal: "Der Lehrplan NRW schreibt kein Verfahren vor" — the choice
   is made by the SCHOOL and the TEXTBOOK. Bavaria's LehrplanPLUS does
   name one (Abziehverfahren). France lets CP-CE2 choose between
   *cassage* and *compensation*. Spain runs both. So a single national
   default is not merely risky, it is arithmetically impossible to be
   right about — and the METHOD SWITCH IS THEREFORE FREE AND SITS ON THE
   FIRST SCREEN. Selling a German teacher the German algorithm would
   destroy the moat and would deserve to.

   THE FENCE (§23.3) — all four surfaces, run fresh, then subtracted.
   · VIRGIN, and this is the whole opening: THE WRITTEN VERTICAL
     ALGORITHM. Zero hits tree-wide for columnAddition / schriftliche
     Addition / kolomsgewijs / cijferen / carry digit. The four apparent
     "Übertrag" hits are all the ordinary German verb übertragen
     (= transmitted) in unrelated prose, plus part-whole-frame's
     hinübertragen in an aria-label. REFERENCE APPS/addition.html's own
     analysis file lists "Vertical format addition (column addition)"
     under LIMITATIONS.
   · OCCUPIED, therefore not built here: `place-value-lab` owns the
     base-ten WORKMAT — flats, rods, cubes, free-build, bundle-a-ten and
     break-a-ten, three live-linked displays and the PV_WORD_SPANS
     number-word moat. `place-value-regroup-core` owns the same exchange
     as a GRADED ACTIVITY whose grader rejects a correct total typed
     without bundling. Printables G2-203 / G2-205 / G2-206 own
     blocks-and-bundles on paper.
   · THE REMAINDER, and all this tool is: THE NOTATION AND THE LOCK.
     A page you write on, never a mat you build on. The discs have no
     home of their own — they live inside the sum's own lanes and there
     is no surface anywhere else, so the fence is geometry, not policy.

   ⭐ THE SYNTAX / SEMANTICS RULE — the doctrine call, and most edtech
   gets it backwards. THE APPARATUS ENFORCES THE GRAMMAR AND NEVER THE
   ARITHMETIC. Wrong grammar is unreachable: a two-digit value cannot be
   written into a one-digit answer box, material cannot appear or vanish,
   a lane with nothing cannot give. Wrong arithmetic is PERMITTED and
   then shown to be unaffordable: a child who says "five take seven" is
   not corrected — the tube simply has not got seven things in it, and
   the shortfall is a problem to solve rather than a mark against a
   person. Smaller-From-Larger is the commonest bug in the literature
   precisely because it is a RATIONAL patch, and it must never be
   labelled stupid.

   REFUSES, FOREVER
     1. NO VERDICT ON A CHILD. Nothing is ever marked right or wrong.
        NO RED AND NO GREEN ANYWHERE IN THE STAGE. A hue pair reads as
        wrong/right to a six-year-old inside a week, so every state is
        carried by KIND — fill vs outline, solid vs dashed vs dotted.
     2. NO AUTO-SOLVE, no "next step", no hint that performs a move.
        A next-step button turns a manipulative into a video.
     3. NO TIMER, SCORE, STREAK, STAR OR CELEBRATION. Confetti for right
        implies famine for wrong, and the material already prevents
        wrong grammar — a verdict would be scoring a child for an act
        the machine performed.
     4. NO NUMBER WORDS, in any locale — place-value-lab's moat.
     5. NO NAME FOR THE MATERIAL, in any locale. No block, no rod, no
        cube, no bead, no counter, no coin. The census found no free
        word, and a named material becomes a second workmat.
     6. NO FREE MAT. Material appears only because a NUMERAL says it
        should, and moves only between two adjacent lanes of THIS sum.
     7. NO SOUND CARRIES MEANING. TTS is reliably present in five of
        eleven locales; sound may confirm a visible event, never
        announce one, and the tool is fully usable muted.
     8. NO WORDS ON THE STAGE. Numerals, the operator sign, the answer
        rule and the material.
     9. NO SECOND PERSON, in any of the eleven languages. The machine
        has no opinion about a person because it has no concept of one.
    10. NO PER-CHILD ANYTHING. Twenty-six children watch one screen;
        there is no child to track, and being structurally incapable of
        storing one is a selling point to a DE/NL/SE procurement office.
    11. NO NEGATIVE RESULTS and no more than two operands. K-3 has no
        representation for the first, and three addends push a lane past
        countability. The constraint comes from the material, which is
        where constraints belong.

   THE LAWS, measured not assumed (scripts/verify-exchange-machine.js)
     L1 CONSERVATION. Nothing arrives and nothing leaves. For every
        reachable state, material + what has been taken away reconstructs
        `a` exactly. An exchange moves value between lanes and never
        creates or destroys it.
     L2 THE LOCK IS A BIJECTION. moved[k] is true IFF lane k lost
        exactly one and lane k-1 gained exactly ten. A mark with no
        material consequence, or material that moved with no mark, both
        fail. The tool's name is this invariant.
     L3 SOLVABILITY. For every a >= b a state is reachable in which
        every lane resolves without a further exchange.
     L4 REFUSALS ARE REFUSALS. Every impossible move returns null,
        including a no-op. One clamp rule, composed, never two.
     L5 THE ZERO CASE. A zero in the minuend is Brown & VanLehn's
        reliable impasse — four distinct stable bugs all fire on
        302 - 158 — so it gets its own exhaustive pass.

   ⭐ THE ORDER OF THE BEATS IS A LAW. The material moves first and the
   notation records it second, driven by ONE interpolator: the strike
   stroke's dash offset and the travelling disc's x are the same `t`.
   If the mark is a completion callback on the material's animation,
   the child sees cause and effect between two objects instead of one
   object, which is the exact misconception this tool exists to destroy.
   ===================================================================== */

(function () {
  'use strict';

  /* ---- geometry, in viewBox units -----------------------------------
     ⚠ REBUILT AFTER READING THE 768px RENDER, which no gate caught and
     which is exactly why a human reads it. The first draft stacked ten
     discs in a single file, which is the prettier idea — a roll is
     exactly as tall as ten — but it made the well band 10 units tall,
     drove the viewBox aspect to 1.2, and the height cap then rendered
     the sheet at half the card's width. Measured result: DISCS AT 9px,
     which is a grey smear at three metres and useless to the back row.

     So the ten is a 2x5 BLOCK, not a column. It is a five-frame: every
     filled row is two, every full block is ten, and a class subitises
     it without counting. That halves the band, brings the aspect to
     about 1.0, and doubles the disc. The height identity is traded for
     legibility, and legibility wins — a lesson nobody can see is not a
     lesson. */
  var G = 22;                 /* one square of the exercise paper       */
  var OX = 12;
  var U = 20;                 /* unit pitch: one disc of stacking room  */
  var DISC = U * 0.76;   /* leaves room for the ghost ring to nest OUTSIDE it */
  var TUBE = U * 5;           /* five rows of two = ten                 */
  var DIGIT = 46;

  var Y_MARK = 30;            /* the small handwritten digit, above     */
  var Y_A = 78;
  var Y_B = 128;
  var Y_RULE = 144;
  var Y_ANS = 192;
  var Y_FOOT = 214;           /* the Übertrag row, BELOW the rule        */
  var Y_BRIM = 242;
  var Y_FLOOR = Y_BRIM + TUBE;
  var VH = Y_FLOOR + 14;

  /* ---- motion, in ms. Named so nobody "tightens" them. -------------- */
  var T_LIFT = 90;
  var T_TRAVEL = 300;
  var T_HOLD = 60;            /* ⚠ SACRED. The silence before the break  */
                              /* is the whole gag. Cutting it loses it.  */
  var T_BURST = 280;
  var T_TOTAL = T_LIFT + T_TRAVEL + T_HOLD + T_BURST;

  var ExchangeMachine = {
    id: 'exchange-machine',

    /* ================= THE MODEL — pure, DOM-free ==================== */

    /* Three places is the K-3 ceiling: the written algorithm does not go
       past 999 before Grade 4, and a fourth lane at 320px puts the hit
       targets under the tap floor. P is fixed, never a setting. */
    P: 3,
    BASE: 10,

    newState: function (op, a, b, method) {
      return this._st({ op: op, method: method }, a, b);
    },

    /* TOTAL. Every field type-checked and clamped HERE AND NOWHERE ELSE,
       so there is exactly one clamp rule. `st || {}` is not enough —
       null, 0 and a string all have to survive this. */
    _st: function (st, a, b) {
      var s = (st && typeof st === 'object') ? st : {};
      var fresh = (a !== undefined || b !== undefined);
      var out = {
        op: (s.op === 'add') ? 'add' : 'sub',
        method: (s.method === 'complement') ? 'complement' : 'decompose',
        a: this._num(a === undefined ? s.a : a),
        b: this._num(b === undefined ? s.b : b),
        col: [0, 0, 0],
        taken: [0, 0, 0],
        moved: [false, false, false],
        carried: [false, false, false],
        ans: [null, null, null]
      };
      var i, v;
      for (i = 0; i < this.P; i++) {
        out.col[i] = fresh ? this.digit(out.a, i) : this._num(s.col && s.col[i]);
        out.taken[i] = fresh ? 0 : this._num(s.taken && s.taken[i]);
        if (out.taken[i] > this.digit(out.b, i)) out.taken[i] = this.digit(out.b, i);
        out.moved[i] = !fresh && !!(s.moved && s.moved[i]);
        out.carried[i] = !fresh && !!(s.carried && s.carried[i]);
        v = (!fresh && s.ans) ? s.ans[i] : null;
        out.ans[i] = (typeof v === 'number' && isFinite(v) && v === Math.round(v) && v >= 0 && v <= 9) ? v : null;
      }
      return out;
    },

    _num: function (v) {
      if (typeof v !== 'number' || !isFinite(v)) return 0;
      v = Math.round(v);
      if (v < 0) v = 0;
      if (v > 999) v = 999;
      return v;
    },

    /* place k's digit of n; k = 0 is ones */
    digit: function (n, k) {
      var v = this._num(n), i, d = 1;
      for (i = 0; i < k; i++) d *= this.BASE;
      return Math.floor(v / d) % this.BASE;
    },

    /* the material, read as a number */
    value: function (st) {
      var i, d = 1, t = 0;
      if (!st || !st.col) return 0;
      for (i = 0; i < this.P; i++) { t += st.col[i] * d; d *= this.BASE; }
      return t;
    },

    /* what has been taken away (sub) or filled in (add), as a number */
    handled: function (st) {
      var i, d = 1, t = 0;
      if (!st || !st.taken) return 0;
      for (i = 0; i < this.P; i++) { t += st.taken[i] * d; d *= this.BASE; }
      return t;
    },

    /* L1. Nothing arrives and nothing leaves. */
    conserved: function (st) {
      if (!st) return false;
      return (st.op === 'sub')
        ? (this.value(st) + this.handled(st) === st.a)
        : (this.value(st) - this.handled(st) === st.a);
    },

    /* how many dashed cells are still standing in lane k */
    ghosts: function (st, k) {
      if (!st || k < 0 || k >= this.P) return 0;
      return this.digit(st.b, k) - st.taken[k];
    },

    /* ---- SUBTRACTION: the borrow -------------------------------------
       Lane k gives ten away to lane k-1. Refused when k is out of range,
       k is the ones lane, the lane has already given (the written
       algorithm cannot say "broken twice"), or the lane is empty.
       ⭐ AN EMPTY LANE IS NOT SILENTLY CASCADED: the hundreds must be
       broken first, by hand, and that refusal IS the zero lesson. */
    canBorrow: function (st, k) {
      if (!st || st.op !== 'sub') return false;
      if (typeof k !== 'number' || !isFinite(k)) return false;
      if (k < 1 || k >= this.P) return false;
      if (st.moved[k]) return false;
      return st.col[k] >= 1;
    },

    borrow: function (st, k) {
      if (!this.canBorrow(st, k)) return null;
      var s = this._st(st);
      s.col[k] -= 1;
      s.col[k - 1] += this.BASE;
      s.moved[k] = true;
      return s;
    },

    /* ---- ADDITION: the carry — the same latch, opened the other way -- */
    canCarry: function (st, k) {
      if (!st || st.op !== 'add') return false;
      if (typeof k !== 'number' || !isFinite(k)) return false;
      if (k < 0 || k >= this.P - 1) return false;
      if (st.carried[k]) return false;
      return st.col[k] >= this.BASE;
    },

    carry: function (st, k) {
      if (!this.canCarry(st, k)) return null;
      var s = this._st(st);
      s.col[k] -= this.BASE;
      s.col[k + 1] += 1;
      s.carried[k] = true;
      return s;
    },

    /* ---- the reverse gear: a real inverse move, not an undo stack --- */
    canReturn: function (st, k) {
      if (!st) return false;
      if (typeof k !== 'number' || !isFinite(k)) return false;
      if (st.op === 'sub') {
        if (k < 1 || k >= this.P) return false;
        return !!st.moved[k] && st.col[k - 1] >= this.BASE;
      }
      if (k < 0 || k >= this.P - 1) return false;
      return !!st.carried[k] && st.col[k + 1] >= 1;
    },

    unExchange: function (st, k) {
      if (!this.canReturn(st, k)) return null;
      var s = this._st(st);
      if (s.op === 'sub') {
        s.col[k - 1] -= this.BASE;
        s.col[k] += 1;
        s.moved[k] = false;
      } else {
        s.col[k + 1] -= 1;
        s.col[k] += this.BASE;
        s.carried[k] = false;
      }
      return s;
    },

    /* ---- the ghost: the second number, drawn INTO the tube -----------
       A six-year-old sees the shortage before touching anything: five
       dashed cells hanging over nothing is the answer to "why would I
       ever break a ten?", and it needs no words in any language. */
    canTake: function (st, k) {
      if (!st) return false;
      if (typeof k !== 'number' || !isFinite(k) || k < 0 || k >= this.P) return false;
      if (this.ghosts(st, k) < 1) return false;
      /* subtraction cannot take what is not there — the SHORTFALL, not
         a verdict. addition always can. */
      return (st.op === 'add') ? true : (st.col[k] >= 1);
    },

    take: function (st, k) {
      if (!this.canTake(st, k)) return null;
      var s = this._st(st);
      s.taken[k] += 1;
      if (s.op === 'sub') s.col[k] -= 1; else s.col[k] += 1;
      return s;
    },

    /* ---- the written answer: WRITE IT, NEVER GRADE IT ----------------
       The box is ONE DIGIT WIDE and that is the whole lesson of
       carrying: twelve does not fit in it. Grammar, not arithmetic. */
    canStamp: function (st, k) {
      if (!st) return false;
      if (typeof k !== 'number' || !isFinite(k) || k < 0 || k >= this.P) return false;
      if (st.ans[k] !== null) return false;
      if (this.ghosts(st, k) !== 0) return false;
      if (st.col[k] > 9) return false;
      var j;
      for (j = 0; j < k; j++) if (st.ans[j] === null && j < this.width(st)) return false;
      return true;
    },

    stamp: function (st, k) {
      if (!this.canStamp(st, k)) return null;
      var s = this._st(st);
      s.ans[k] = s.col[k];
      return s;
    },

    /* ---- what the apparatus offers, per lane ------------------------- */
    columnState: function (st, k) {
      if (!st || k < 0 || k >= this.P) return 'ready';
      if (st.op === 'add') {
        return (st.col[k] >= this.BASE && k < this.P - 1) ? 'over' : 'ready';
      }
      if (st.col[k] >= this.ghosts(st, k)) return 'ready';
      if (k + 1 >= this.P) return 'ready';
      if (this.canBorrow(st, k + 1)) return 'short';
      return 'blocked';
    },

    /* The tool's own witness, for its hint line only. ⚠ The GATE proves
       solvability by an independent search and must never ask this
       function whether it is right — that is how 19 of 51 mutations
       survived on number-sieve. */
    settled: function (st) {
      if (!st) return false;
      var k;
      for (k = 0; k < this.P; k++) {
        if (this.ghosts(st, k) > 0) return false;
        if (st.col[k] > 9) return false;
      }
      return true;
    },

    /* how many lanes to draw */
    width: function (st) {
      var n = Math.max(st.a, st.b, this.value(st));
      if (n >= 100) return 3;
      if (n >= 10) return 2;
      return 1;
    },

    /* ================= THE NOTATION — the moat =======================
       ⚠ EVERY ROW IS A CLAIM ABOUT A REAL CLASSROOM AND CARRIES ITS OWN
       CONFIDENCE. `conf` is not decoration: 'v' = verified against a
       curriculum or a national didactics portal, 'p' = vocabulary solid
       but glyph placement not, 'x' = do not ship a default. The native
       panels raise these, and nothing is promoted without a photograph
       of a real exercise-book page. Shipping a guess as a fact here is
       the one failure this tool cannot survive.

       carryPos    'above' small carried digit over the next lane
                   'foot'  under the answer rule (DE/UK convention)
       borrowMark  'strike' minuend struck through, smaller digit above
                   'foot'   nothing struck; a small 1 at the foot of the
                            next SUBTRAHEND lane (Ergänzen/compensation)
       method      the DEFAULT only. The switch is free and on-screen,
                   because Germany does not prescribe one at all.
       inBand      false where the standard algorithm arrives AFTER this
                   age band, so the tool must say so rather than
                   pretend. NL: cijferend rekenen is groep 6 (~age 9)
                   and the K-3 stage is kolomsgewijs, which runs LEFT TO
                   RIGHT. NO: skriftlig regning is 5. trinn. */
    NOTATION: {
      en: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: true, conf: 'v' },
      de: { carryPos: 'foot', borrowMark: 'strike', method: 'decompose', inBand: true, conf: 'p' },
      fr: { carryPos: 'above', borrowMark: 'foot', method: 'complement', inBand: true, conf: 'v' },
      it: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: true, conf: 'p' },
      es: { carryPos: 'above', borrowMark: 'foot', method: 'complement', inBand: true, conf: 'p' },
      pt: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: true, conf: 'p' },
      nl: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: false, conf: 'p' },
      sv: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: true, conf: 'p' },
      da: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: true, conf: 'p' },
      no: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: false, conf: 'p' },
      fi: { carryPos: 'above', borrowMark: 'strike', method: 'decompose', inBand: true, conf: 'p' }
    },

    /* the place-value nouns {c} interpolates. ⚠ es carries its own
       article: "las decenas" but "los millares", so a bare token is
       ungrammatical the moment a fourth column appears. */
    /* ⚠⚠ {c} IS A NOUN IN SOME LANGUAGES AND AN INDEX IN OTHERS, AND
       TWO NATIVE PANELS FLATLY CONTRADICTED EACH OTHER ABOUT IT. Both
       were right about their own grammar:
         · de "Säule der {c}" · fr "colonne des {c}" · nl "kolom van de
           {c}" · es "columna de {c}" — these REQUIRE a place-value
           noun, and "Säule der 1" is ungrammatical.
         · it "colonna {c}" · sv "kolumn {c}" · fi "sarake {c}" — these
           require an INDEX, because Romance would need an article and
           Finnish a case ending that a bare token cannot carry.
       So the table is per-locale, and a null means "use the index".
       ⚠ es carries its own article inside the token: las decenas is
       feminine, los millares is not, and one article form does not
       serve the moment a fourth column appears. */
    PLACES: {
      en: ['ones', 'tens', 'hundreds'],
      de: ['Einer', 'Zehner', 'Hunderter'],
      fr: ['unités', 'dizaines', 'centaines'],
      es: ['las unidades', 'las decenas', 'las centenas'],
      nl: ['eenheden', 'tientallen', 'honderdtallen'],
      it: null, pt: null, sv: null, da: null, no: null, fi: null
    },

    place: function (lang, k) {
      var p = this.PLACES.hasOwnProperty(lang) ? this.PLACES[lang] : this.PLACES.en;
      if (!p) return String(k + 1);
      return p[k] || p[p.length - 1];
    },

    notation: function (lang) {
      return this.NOTATION[lang] || this.NOTATION.en;
    },

    /* ================= entitlement + repertoire ====================== */

    STORE_KEY: 'lcs:exchange-machine:v1',
    premium: false,
    FREE_SETTINGS: 7,

    /* The free seven are chosen by MEASUREMENT, not taste: between them
       they reach every claim this header makes, so no part of the
       argument sits behind the paywall. In particular THE BORROW IS
       FREE — paywalling it would make the free tier a demo of addition,
       and addition is not the dreaded topic.
         1  48 - 23   NO exchange at all — the first rung of the
                      sequence, and the only record that lets the tool ask
                      "is there enough there?"
         2  42 - 17   one borrow, the plain case
         2  63 - 28   one borrow again, so it reads as a method
         3  50 - 24   a ZERO in the ones, and still no cascade needed
         4  204 - 137 THE CASCADE: the tens are empty, so the hundreds
                      must be broken first — Brown & VanLehn's impasse,
                      and the tool's most distinctive minute
         5  38 + 25   the same latch the other way: one carry
         6  96 + 47   a carry that cascades into the hundreds */
    FALLBACK_SETS: {
      version: 1,
      freeCount: 7,
      sets: [
        { op: 'sub', a: 48, b: 23 },
        { op: 'sub', a: 42, b: 17 },
        { op: 'sub', a: 63, b: 28 },
        { op: 'sub', a: 50, b: 24 },
        { op: 'sub', a: 204, b: 137 },
        { op: 'add', a: 38, b: 25 },
        { op: 'add', a: 96, b: 47 }
      ]
    },

    /* ================= strings — 11 locales ==========================
       ⚠ NEVER hand-edit this block. It is written from
       scripts/_exchange-machine-strings.js by
       scripts/apply-exchange-machine-locales.js. */
    strings: {
      title:        { en: "The Exchange Machine", de: "Die Tauschsäulen", fr: "La machine à échanger", es: "La máquina de los cambios", pt: "A Máquina de Trocas", it: "La macchina dei cambi", nl: "De Wisselmachine", sv: "Växlingsmaskinen", da: "Vekslemaskinen", no: "Vekslingsmaskinen", fi: "Vaihtokone" },
      instruction:  { en: "Tap a column that has something to give. What crosses over comes apart into ten on the right, or gathers into one on the left — and the digit is written in the same instant.", de: "Eine Säule antippen, die etwas abgeben kann. Was hinübergeht, zerfällt rechts in zehn oder fügt sich links zu einem — und im selben Augenblick steht die Ziffer auf dem Papier.", fr: "Toucher une colonne qui a de quoi donner. Ce qui passe se défait en dix dans la colonne de droite, ou se rassemble en un seul dans celle de gauche — et le chiffre s'écrit au même instant.", es: "Tocar una columna que tenga algo que dar. Lo que pasa se deshace en diez en la columna de la derecha, o se junta en uno solo en la de la izquierda — y la cifra se escribe en ese mismo instante.", pt: "Embaixo de cada coluna há um tubo com o que aquela coluna vale. Quando uma coluna não dá conta, a coluna à esquerda abre um: viram 10 na coluna da direita. No sentido inverso, 10 se juntam de novo em um. O registro no papel acontece no mesmo instante.", it: "Sotto ogni colonna c'è un tubo con quanto la colonna possiede. Quando una colonna non basta, da quella a sinistra se ne apre uno: diventa 10 nella colonna a destra. All'indietro, 10 tornano a essere uno. Sul foglio il segno compare nello stesso istante.", nl: "Tik op een kolom die iets kan afstaan. Wat overgaat, valt rechts uiteen in tien of komt links samen tot één — en op hetzelfde moment verschijnt het cijfer op papier.", sv: "Under varje kolumn sitter ett rör med det kolumnen är värd. När en kolumn inte räcker öppnas en ur kolumnen till vänster: den blir 10 i kolumnen till höger. Åt andra hållet slås 10 ihop till en igen. Samma sekund skrivs det på papperet.", da: "Under hver kolonne sidder et rør med det, kolonnen er værd. Når en kolonne ikke rækker, åbnes én fra kolonnen til venstre: den bliver til 10 i kolonnen til højre. Den anden vej samles 10 igen til én. Det skrives på papiret i samme øjeblik.", no: "Under hver kolonne sitter et rør med det kolonnen er verdt. Når en kolonne ikke rekker, åpnes én fra kolonnen til venstre: den blir til 10 i kolonnen til høyre. Den andre veien samles 10 igjen til én. Det skrives på papiret i samme øyeblikk.", fi: "Jokaisen sarakkeen alla on putki, ja putkessa on se, mitä sarakkeessa on. Kun sarake ei riitä, vasemmanpuoleisesta sarakkeesta avataan yksi: siitä tulee 10 oikeanpuoleiseen sarakkeeseen. Toisin päin 10 kootaan takaisin yhdeksi. Samalla hetkellä se kirjoittuu paperille." },
      sceneLabel:   { en: "On squared paper, a sum written in columns, with its sign and the rule under it. Each column carries on downwards and shows what it holds; pale outlines mark what has to come away.", de: "Auf kariertem Papier steht eine Rechnung stellengerecht untereinander, daneben das Rechenzeichen, darunter der Ergebnisstrich. Jede Säule setzt sich nach unten fort und zeigt, was darin liegt; helle Umrisse zeigen, was abgehen soll.", fr: "Sur du papier quadrillé, une opération posée en colonnes, avec son signe et le trait du résultat. Chaque colonne se prolonge vers le bas et montre ce qu'elle contient ; des contours clairs marquent ce qui doit partir.", es: "Sobre papel cuadriculado, una operación escrita en columnas, con su signo y la raya del resultado. Cada columna sigue hacia abajo y muestra lo que tiene; unas siluetas claras señalan lo que debe salir.", pt: "Uma conta armada em colunas no papel quadriculado, com o traço do resultado. Embaixo de cada coluna, um tubo com o que a coluna tem e as marcas do que precisa sair. Mais abaixo, os comandos: método escrito, operação, outra conta e impressão.", it: "Un'operazione in colonna su carta a quadretti, con la riga del risultato. Sotto ogni colonna un tubo con quanto la colonna possiede, e i segni di quanto deve uscire. In basso i comandi: metodo scritto, operazione, nuova operazione, stampa.", nl: "Op ruitjespapier staat een som in kolommen, met het rekenteken en de streep voor de uitkomst. Elke kolom loopt naar beneden door en laat zien wat erin zit; lichte omtrekken geven aan wat eraf moet.", sv: "En uppställning på rutat papper, med strecket under. Under varje kolumn ett rör med det kolumnen har, och märken för det som ska bort. Längst ned reglagen: skrivsätt, räknesätt, ny uppställning och utskrift.", da: "Et regnestykke stillet op i kolonner på ternet papir, med stregen under. Under hver kolonne et rør med det, kolonnen har, og mærker for det, der skal væk. Nederst betjeningen: skrivemåde, regneart, nyt stykke og udskrift.", no: "Et regnestykke satt opp i kolonner på rutete papir, med streken under. Under hver kolonne et rør med det kolonnen har, og merker for det som skal bort. Nederst knappene: skrivemåte, regneart, nytt stykke og utskrift.", fi: "Allekkain kirjoitettu lasku ruutupaperilla ja sen alla vastausviiva. Jokaisen sarakkeen alla putki, jossa on sarakkeen sisältö, sekä merkit siitä, minkä pitää lähteä pois. Alimpana säätimet: merkintätapa, laskutoimitus, uusi tehtävä ja tulostus." },
      hintStart:    { en: "Start at the right-hand column. Is there enough there for the outlines?", de: "Ganz rechts beginnen. Liegt dort genug für die hellen Umrisse?", fr: "Commencer par la colonne de droite. Y a-t-il là de quoi couvrir les contours ?", es: "Empezar por la columna de la derecha. ¿Hay ahí bastante para las siluetas?", pt: "A conta começa pela coluna da direita. O que está ali dentro dá para o que precisa sair?", it: "Si parte dalla colonna più a destra. Lì dentro basta per quanto deve uscire?", nl: "Begin rechts. Zit daar genoeg voor de lichte omtrekken?", sv: "Uppställningen börjar i kolumnen längst till höger. Räcker det som ligger där till det som ska bort?", da: "Der begyndes i kolonnen længst til højre. Rækker det, der ligger dér, til det, der skal væk?", no: "Det begynner i kolonnen lengst til høyre. Rekker det som ligger der, til det som skal bort?", fi: "Aloitetaan oikeanpuoleisimmasta sarakkeesta. Riittääkö siellä siihen, minkä pitää lähteä pois?" },
      hintShort:    { en: "This column has not got enough. The column to its left has something to give — tap that one.", de: "In dieser Säule liegt zu wenig. Links daneben liegt etwas — diese Säule antippen.", fr: "Cette colonne n'a pas assez. Celle de gauche a de quoi donner — la toucher.", es: "En esta columna no hay bastante. En la de la izquierda sí hay algo — tocar esa.", pt: "Nesta coluna não dá. Na coluna à esquerda dá: é de lá que se abre um.", it: "Qui non basta. Nella colonna a sinistra sì: è da lì che se ne apre uno.", nl: "In deze kolom zit te weinig. Links ernaast zit wel iets — tik daarop.", sv: "Här räcker det inte. I kolumnen till vänster gör det — därifrån öppnas en.", da: "Her rækker det ikke. I kolonnen til venstre gør det — derfra åbnes én.", no: "Her rekker det ikke. I kolonnen til venstre gjør det — derfra åpnes én.", fi: "Tässä sarakkeessa ei riitä. Vasemmalla riittää — sieltä avataan yksi." },
      hintBlocked:  { en: "The column to the left is empty, so there is nothing there to come apart. Something further left has to come apart first.", de: "Links daneben ist es leer, dort ist nichts zu entbündeln. Weiter links muss zuerst etwas zerfallen.", fr: "À gauche, c'est vide : rien à casser ici. Il faut d'abord que quelque chose se défasse plus loin à gauche.", es: "A la izquierda está vacío: ahí no hay nada que deshacer. Más a la izquierda tiene que deshacerse algo primero.", pt: "A coluna à esquerda está vazia — ali não há o que abrir. A troca precisa começar mais à esquerda.", it: "La colonna a sinistra è vuota: lì non c'è nulla da aprire. Il cambio deve cominciare più a sinistra.", nl: "Links ernaast is het leeg, daar valt niets te wisselen. Verderop naar links moet eerst iets uiteenvallen.", sv: "Kolumnen till vänster är tom, så där finns inget att öppna. Växlingen måste börja längre till vänster.", da: "Kolonnen til venstre er tom, så dér er intet at åbne. Vekslingen må begynde længere til venstre.", no: "Kolonnen til venstre er tom, så der er ingenting å åpne. Vekslingen må begynne lenger til venstre.", fi: "Vasemmanpuoleinen sarake on tyhjä, joten siellä ei ole mitään avattavaa. Vaihto on aloitettava kauempaa vasemmalta." },
      hintReady:    { en: "Every column can be taken from now. Read what stays in each one and write it under the line.", de: "Jetzt lässt sich in jeder Säule abnehmen. Ablesen, was liegen bleibt, und unter den Strich schreiben.", fr: "Chaque colonne peut donner maintenant. Lire ce qui reste dans chacune et l'écrire sous le trait.", es: "Ya se puede sacar en todas las columnas. Leer lo que queda en cada una y escribirlo bajo la raya.", pt: "Agora cada coluna dá conta do que é pedido. O que fica em cada tubo é o que vai embaixo do traço.", it: "Ora ogni colonna può dare quanto le viene chiesto. Quello che resta in ciascun tubo va scritto sotto la riga.", nl: "Nu kan er in elke kolom afgehaald worden. Lees af wat er blijft liggen en schrijf dat onder de streep.", sv: "Nu räcker varje kolumn till det som ska bort. Det som blir kvar i rören skrivs under strecket.", da: "Nu rækker hver kolonne til det, der skal væk. Det, der bliver tilbage i rørene, skrives under stregen.", no: "Nå rekker hver kolonne til det som skal bort. Det som blir igjen i rørene, skrives under streken.", fi: "Nyt jokaisesta sarakkeesta lähtee se, mitä pyydetään. Se, mitä putkiin jää, kirjoitetaan viivan alle." },
      hintOver:     { en: "This column has reached ten, and only one digit fits under the line. Ten of these make one of the column to its left.", de: "Diese Säule hat zehn erreicht, und unter dem Strich ist nur Platz für eine Ziffer. Zehn davon werden links daneben zu einem.", fr: "Cette colonne a atteint dix, et sous le trait il n'y a la place que pour un seul chiffre. Dix d'ici font un dans la colonne de gauche.", es: "Esta columna ha llegado a diez, y bajo la raya solo cabe una cifra. Diez de aquí son uno en la columna de la izquierda.", pt: "Esta coluna chegou a 10, e embaixo do traço cabe um algarismo só. 10 daqui viram um na coluna à esquerda.", it: "Questa colonna è arrivata a 10, e sotto la riga entra una cifra sola. 10 di qui fanno uno nella colonna a sinistra.", nl: "Deze kolom heeft tien bereikt, en onder de streep past maar één cijfer. Tien hiervan worden er één in de kolom links.", sv: "Den här kolumnen har nått 10, och under strecket får bara en siffra plats. 10 härifrån blir en i kolumnen till vänster.", da: "Denne kolonne er nået til 10, og under stregen er der kun plads til ét ciffer. 10 herfra bliver til én i kolonnen til venstre.", no: "Denne kolonnen har nådd 10, og under streken er det plass til bare ett siffer. 10 herfra blir til én i kolonnen til venstre.", fi: "Tässä sarakkeessa on 10 tai enemmän, ja viivan alle mahtuu vain yksi numero. 10 täältä on yksi vasemmanpuoleisessa sarakkeessa." },
      hintFill:     { en: "Start at the right-hand column and fill the outlines — that is the second number arriving.", de: "Ganz rechts beginnen und die hellen Umrisse auffüllen — so kommt die zweite Zahl dazu.", fr: "Commencer par la colonne de droite et remplir les contours — c'est le second nombre qui arrive.", es: "Empezar por la columna de la derecha y rellenar las siluetas: es el segundo número que llega.", pt: "A conta começa pela coluna da direita, preenchendo as marcas: é o segundo número chegando.", it: "Si parte dalla colonna più a destra e si riempiono i segni: è il secondo numero che arriva.", nl: "Begin rechts en vul de lichte omtrekken: dat is het tweede getal dat erbij komt.", sv: "Uppställningen börjar i kolumnen längst till höger, och märkena fylls: det är det andra talet som kommer till.", da: "Der begyndes i kolonnen længst til højre, og mærkerne fyldes: det er det andet tal, der kommer til.", no: "Det begynner i kolonnen lengst til høyre, og merkene fylles: det er det andre tallet som kommer til.", fi: "Aloitetaan oikeanpuoleisimmasta sarakkeesta ja täytetään merkit: siinä tulee toinen luku mukaan." },
      hintAddReady: { en: "Every column holds fewer than ten now. Read each one and write it under the line.", de: "In jeder Säule liegt jetzt weniger als zehn. Ablesen und unter den Strich schreiben.", fr: "Chaque colonne contient maintenant moins de dix. Lire chacune et l'écrire sous le trait.", es: "Ahora cada columna tiene menos de diez. Leer cada una y escribirla bajo la raya.", pt: "Agora cada coluna tem menos de 10. O que está em cada tubo vai embaixo do traço.", it: "Ora ogni colonna ha meno di 10. Quello che c'è in ciascun tubo va scritto sotto la riga.", nl: "In elke kolom ligt nu minder dan tien. Lees af en schrijf het onder de streep.", sv: "Nu ligger det mindre än 10 i varje kolumn. Det som ligger i rören skrivs under strecket.", da: "Nu ligger der mindre end 10 i hver kolonne. Det, der ligger i rørene, skrives under stregen.", no: "Nå ligger det mindre enn 10 i hver kolonne. Det som ligger i rørene, skrives under streken.", fi: "Nyt jokaisessa sarakkeessa on alle 10. Se, mitä putkissa on, kirjoitetaan viivan alle." },
      hintDone:     { en: "Under the line now stands what the columns hold. Through all the exchanges nothing vanished — it simply lies differently.", de: "Unter dem Strich steht nun, was in den Säulen liegt. Beim Tauschen ist nichts verschwunden — es liegt nur anders.", fr: "Sous le trait, il y a maintenant ce que les colonnes contiennent. Pendant les échanges, rien n'a disparu : c'est seulement réparti autrement.", es: "Bajo la raya está ahora lo que hay en las columnas. En los cambios no ha desaparecido nada: solo está repartido de otra manera.", pt: "O tubo e o papel dizem a mesma coisa. Entre as colunas nada mudou de valor — mudou de lugar.", it: "Il tubo e il foglio dicono la stessa cosa. Fra le colonne nulla ha cambiato valore: ha cambiato posto.", nl: "Onder de streep staat nu wat er in de kolommen ligt. Bij het wisselen is er niets verdwenen — het ligt alleen anders.", sv: "Rören och papperet säger samma sak. Ingenting har bytt värde mellan kolumnerna — bara plats.", da: "Rørene og papiret siger det samme. Intet har skiftet værdi mellem kolonnerne — kun plads.", no: "Rørene og papiret sier det samme. Ingenting har byttet verdi mellom kolonnene — bare plass.", fi: "Putket ja paperi kertovat saman. Mikään ei ole vaihtanut arvoa sarakkeiden välillä — vain paikkaa." },
      laneAria:     { en: "the {c} column, holding {v}", de: "Säule der {c}, darin {v}", fr: "colonne des {c}, contenu {v}", es: "columna de {c}, contiene {v}", pt: "coluna {c}, com {v}", it: "colonna {c}, contiene {v}", nl: "kolom van de {c}, inhoud {v}", sv: "kolumn {c}, innehåller {v}", da: "kolonne {c}, indeholder {v}", no: "kolonne {c}, inneholder {v}", fi: "sarake {c}, sisältö {v}" },
      breakAria:    { en: "in the {c} column, let one come apart: ten arrive in the column to its right", de: "In der Säule der {c} eines entbündeln: rechts daneben werden zehn daraus", fr: "Dans la colonne des {c}, en défaire un : il en vient dix dans la colonne de droite", es: "En la columna de {c}, deshacer uno: a la derecha aparecen diez", pt: "abrir um da coluna {c} em 10 na coluna à direita", it: "aprire uno della colonna {c} in 10 nella colonna a destra", nl: "In de kolom van de {c} er één laten uiteenvallen: rechts komen er tien", sv: "öppna en ur kolumn {c} till 10 i kolumnen till höger", da: "åbne én fra kolonne {c} til 10 i kolonnen til højre", no: "åpne én fra kolonne {c} til 10 i kolonnen til høyre", fi: "avata sarakkeesta {c} yksi, josta tulee 10 oikeanpuoleiseen sarakkeeseen" },
      sendAria:     { en: "from the {c} column, gather ten: one arrives in the column to its left", de: "Aus der Säule der {c} zehn bündeln: links daneben wird eines daraus", fr: "Depuis la colonne des {c}, en rassembler dix : il en vient un dans la colonne de gauche", es: "Desde la columna de {c}, juntar diez: a la izquierda aparece uno", pt: "juntar 10 da coluna {c} em um na coluna à esquerda", it: "riunire 10 della colonna {c} in uno nella colonna a sinistra", nl: "Uit de kolom van de {c} tien samenvoegen: links komt er één", sv: "slå ihop 10 i kolumn {c} till en i kolumnen till vänster", da: "samle 10 i kolonne {c} til én i kolonnen til venstre", no: "samle 10 i kolonne {c} til én i kolonnen til venstre", fi: "koota sarakkeen {c} 10 yhdeksi vasemmanpuoleiseen sarakkeeseen" },
      backAria:     { en: "undo the exchange in the {c} column", de: "Das Entbündeln in der Säule der {c} rückgängig machen", fr: "Annuler ce qui a été défait dans la colonne des {c}", es: "Volver atrás el cambio en la columna de {c}", pt: "voltar a coluna {c} como estava", it: "riportare la colonna {c} com'era", nl: "Het uiteenvallen in de kolom van de {c} ongedaan maken", sv: "återställa kolumn {c}", da: "sætte kolonne {c} tilbage, som den var", no: "sette kolonne {c} tilbake slik den var", fi: "palauttaa sarake {c} ennalleen" },
      takeAria:     { en: "take one away in the {c} column", de: "In der Säule der {c} eines wegnehmen", fr: "Retirer un dans la colonne des {c}", es: "Quitar uno en la columna de {c}", pt: "tirar um da coluna {c}", it: "togliere uno dalla colonna {c}", nl: "In de kolom van de {c} er één afhalen", sv: "ta bort en ur kolumn {c}", da: "tage én væk i kolonne {c}", no: "ta bort én i kolonne {c}", fi: "poistaa sarakkeesta {c} yksi" },
      fillAria:     { en: "put one more in the {c} column", de: "In der Säule der {c} eines dazulegen", fr: "Ajouter un dans la colonne des {c}", es: "Poner uno en la columna de {c}", pt: "pôr um na coluna {c}", it: "aggiungere uno nella colonna {c}", nl: "In de kolom van de {c} er één bij leggen", sv: "lägga till en i kolumn {c}", da: "lægge én til i kolonne {c}", no: "legge til én i kolonne {c}", fi: "lisätä sarakkeeseen {c} yksi" },
      stampAria:    { en: "write {v} under the line in the {c} column", de: "{v} in der Säule der {c} unter den Strich schreiben", fr: "Écrire {v} sous le trait, dans la colonne des {c}", es: "Escribir {v} bajo la raya, en la columna de {c}", pt: "registrar {v} na coluna {c}", it: "scrivere {v} per la colonna {c}", nl: "{v} onder de streep schrijven in de kolom van de {c}", sv: "skriva {v} för kolumn {c}", da: "skrive {v} for kolonne {c}", no: "skrive {v} for kolonne {c}", fi: "kirjoittaa {v} sarakkeen {c} kohdalle" },
      methodBtn:    { en: "Written method", de: "Verfahren", fr: "Méthode", es: "Método", pt: "Método escrito", it: "Metodo scritto", nl: "Werkwijze", sv: "Skrivsätt", da: "Skrivemåde", no: "Skrivemåte", fi: "Merkintätapa" },
      opBtn:        { en: "Change the operation", de: "Rechenart wechseln", fr: "Changer d'opération", es: "Cambiar de operación", pt: "Operação", it: "Operazione", nl: "Andere bewerking", sv: "Räknesätt", da: "Regneart", no: "Regneart", fi: "Laskutoimitus" },
      nextBtn:      { en: "Another sum", de: "Neue Aufgabe", fr: "Une autre opération", es: "Otra operación", pt: "Outra conta", it: "Altra operazione", nl: "Nieuwe som", sv: "Ny uppställning", da: "Nyt stykke", no: "Nytt stykke", fi: "Uusi tehtävä" },
      printBtn:     { en: "Print this sum", de: "Diese Aufgabe drucken", fr: "Imprimer cette opération", es: "Imprimir esta operación", pt: "Imprimir a folha", it: "Stampa il foglio", nl: "Deze som afdrukken", sv: "Utskrift", da: "Udskrift", no: "Utskrift", fi: "Tulostus" },
      gateTitle:    { en: "More sums, and the sheets", de: "Mehr Aufgaben und die Übungsblätter", fr: "D'autres opérations, et les fiches", es: "Más operaciones, y las fichas", pt: "Mais contas, e o conjunto de folhas", it: "Altre operazioni, e la raccolta di fogli", nl: "Meer sommen, en de bladen", sv: "Fler uppställningar, och bladen", da: "Flere stykker, og arkene", no: "Flere stykker, og arkene", fi: "Lisää tehtäviä ja tulostettavat sivut" },
      gateBody:     { en: "More of every kind: three-digit sums and the awkward ones — an empty column that has to be filled from further left first. Plus practice sheets to print, set out the way it is written here, with the columns left empty.", de: "Mehr von jeder Art: dreistellige Aufgaben und die kniffligen Fälle — eine leere Säule, die erst von weiter links her gefüllt werden muss. Dazu Übungsblätter zum Ausdrucken, gesetzt wie im Heft hier üblich, mit leeren Säulen.", fr: "De chaque forme, davantage : les nombres à trois chiffres et les cas épineux — une colonne vide qu'il faut d'abord remplir depuis plus loin à gauche. Avec des fiches à imprimer, présentées comme on les écrit ici, colonnes laissées vides.", es: "De cada tipo, más: operaciones de tres cifras y los casos más espinosos — una columna vacía que hay que llenar primero desde más a la izquierda. Y fichas para imprimir, con la disposición que se usa aquí y las columnas en blanco.", pt: "O resto do caderno: contas de todo tipo, números de três algarismos e os casos que fazem a turma conversar, como a coluna vazia que obriga a começar a troca mais à esquerda. E um conjunto de folhas para imprimir, armadas do jeito que se escreve na escola brasileira.", it: "Il resto del quaderno: operazioni di ogni forma, numeri a tre cifre e i casi che fanno discutere la classe, come la colonna vuota che costringe a cominciare il cambio più a sinistra. E una raccolta di fogli da stampare, impostati come si scrive in colonna nella scuola italiana.", nl: "Van elke soort meer: sommen met drie cijfers en de lastige gevallen — een lege kolom die eerst van verderop links gevuld moet worden. Plus oefenbladen om af te drukken, gezet zoals het hier op school geschreven wordt, met de kolommen leeg.", sv: "Här finns fortsättningen: uppställningar av alla former, tresiffriga tal och de fall som brukar få en klass att börja prata — den tomma kolumnen som tvingar växlingen att börja längre till vänster. Dessutom blad att skriva ut, uppställda som det skrivs i svensk skola.", da: "Her ligger fortsættelsen: stykker af alle former, tal med tre cifre og de tilfælde, der plejer at få en klasse til at tale sammen — den tomme kolonne, der tvinger vekslingen til at begynde længere til venstre. Dertil ark til at printe, stillet op, som der skrives i dansk skole.", no: "Her ligger fortsettelsen: stykker av alle former, tresifrede tall og tilfellene som pleier å få en klasse til å snakke sammen — den tomme kolonnen som tvinger vekslingen til å begynne lenger til venstre. I tillegg ark til å skrive ut, satt opp slik det skrives i norsk skole.", fi: "Tästä jatkuu loput: kaikenmuotoisia tehtäviä, kolminumeroisia lukuja ja ne tapaukset, joista luokka yleensä alkaa keskustella — tyhjä sarake, jonka takia vaihto on aloitettava kauempaa vasemmalta. Lisäksi tulostettavia sivuja, jotka on aseteltu niin kuin suomalaisessa koulussa kirjoitetaan." },
      gateCta:      { en: "See the Teacher plan", de: "Zum Lehrkraft-Zugang", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "O plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-abonnement", sv: "Lärare-planen", da: "Lærer-planen", no: "Lærer-planen", fi: "Opettaja-tilaus" }
    },

    /* ================= lifecycle ===================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('exm-wide');
      injectExchangeMachineCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this._book = this.FALLBACK_SETS;
      this._idx = 0;
      this._busy = false;
      var note = this.notation(api.lang);
      this._method = this._store.method || note.method;
      var f = this.FALLBACK_SETS.sets[0];
      this.st = this.newState(f.op, f.a, f.b, this._method);
      this._fetchEntitlement();
      this._loadBook();
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
      var s = this._sets()[this._idx] || this.FALLBACK_SETS.sets[0];
      this.st = this.newState(s.op, s.a, s.b, this._method);
      this._busy = false;
      if (this._wrap) this._paint();
    },

    /* ================= geometry helpers ============================== */

    _lanes: function () { return this.width(this.st); },
    /* a two-lane sum is inherently narrow, so its lanes are wider —
       otherwise the sheet is a tall ribbon and the height cap shrinks
       the material back below legibility */
    _lane: function () { return this._lanes() >= 3 ? 88 : 104; },
    _opW: function () { return this._lane() * 0.5; },
    _laneX: function (k) {
      var w = this._lanes(), L = this._lane();
      return OX + this._opW() + (w - 1 - k) * L;
    },
    _laneCX: function (k) { return this._laneX(k) + this._lane() / 2; },
    _vbW: function () { return OX * 2 + this._opW() + this._lanes() * this._lane(); },
    /* a ten is a 2x5 block, filled bottom-up, two to a row */
    _discY: function (i) { return Y_FLOOR - U * 0.5 - Math.floor((i % this.BASE) / 2) * U; },
    _discX: function (cx, i) {
      return cx + (((i % this.BASE) % 2) ? U * 0.5 : -U * 0.5) + (i >= this.BASE ? U * 2.4 : 0);
    },

    /* ================= DOM ============================================ */

    _svgEl: function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k;
      if (attrs) for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, String(attrs[k]));
      return e;
    },

    _build: function () {
      var api = this.api, self = this;
      var wrap = api.el('div', 'exm-wrap');
      var sheet = api.el('div', 'exm-sheet');
      var svg = this._svgEl('svg', { 'class': 'exm-svg', viewBox: '0 0 ' + this._vbW() + ' ' + VH, role: 'img' });
      sheet.appendChild(svg);
      wrap.appendChild(sheet);

      var hits = api.el('div', 'exm-hits');
      sheet.appendChild(hits);

      var hint = api.el('p', 'exm-hint');
      wrap.appendChild(hint);

      var foot = api.el('div', 'exm-foot');
      wrap.appendChild(foot);

      /* ⭐ THE METHOD SWITCH IS FREE AND IS THE FIRST CHIP. Germany does
         not prescribe a method; France lets CP-CE2 choose; Spain runs
         both. Selling a teacher her own country's algorithm would
         destroy the moat. */
      this._chipMethod = this._chip(foot, 'exm-chip', function () {
        self._method = (self._method === 'decompose') ? 'complement' : 'decompose';
        self._store.method = self._method;
        self._saveStore();
        self.st = self._st({ op: self.st.op, method: self._method }, self.st.a, self.st.b);
        self._paint();
      });

      this._chipOp = this._chip(foot, 'exm-chip', function () {
        var s = self.st;
        self.st = self.newState(s.op === 'sub' ? 'add' : 'sub', s.a, s.b, self._method);
        self._paint();
      });

      this._chipNext = this._chip(foot, 'exm-chip', function () { self._next(); });

      this._chipPrint = this._chip(foot, 'exm-chip exm-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        try { window.print(); } catch (e) { /* no printer in a headless gate */ }
      });

      this._sheetEl = api.el('div', 'exm-sheetprint');
      wrap.appendChild(this._sheetEl);

      api.stage.appendChild(wrap);
      this._wrap = wrap;
      this._svg = svg;
      this._hits = hits;
      this._hintEl = hint;
    },

    _chip: function (parent, cls, fn) {
      var b = this.api.el('button', cls);
      b.type = 'button';
      b.addEventListener('click', fn);
      parent.appendChild(b);
      return b;
    },

    /* ================= paint ========================================= */

    _paint: function () {
      var api = this.api, st = this.st, svg = this._svg;
      var k, w = this._lanes(), vbW = this._vbW();
      var note = this.notation(api.lang);

      svg.setAttribute('viewBox', '0 0 ' + vbW + ' ' + VH);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      while (this._hits.firstChild) this._hits.removeChild(this._hits.firstChild);

      svg.appendChild(this._svgEl('rect', { x: 0, y: 0, width: vbW, height: VH, 'class': 'exm-paper' }));
      var g;
      for (g = G; g < vbW; g += G) svg.appendChild(this._svgEl('line', { x1: g, y1: 0, x2: g, y2: VH, 'class': 'exm-grid' }));
      for (g = G; g < VH; g += G) svg.appendChild(this._svgEl('line', { x1: 0, y1: g, x2: vbW, y2: g, 'class': 'exm-grid' }));

      var live = this._liveLane();
      for (k = 0; k < w; k++) {
        var lx = this._laneX(k);
        if (k === live) svg.appendChild(this._svgEl('rect', { x: lx, y: 6, width: this._lane(), height: VH - 12, 'class': 'exm-wash' }));
        svg.appendChild(this._svgEl('line', { x1: lx, y1: 8, x2: lx, y2: Y_FLOOR + 6, 'class': 'exm-guide' + (k === live ? ' is-live' : '') }));
      }
      svg.appendChild(this._svgEl('line', {
        x1: this._laneX(0) + this._lane(), y1: 8, x2: this._laneX(0) + this._lane(), y2: Y_FLOOR + 6,
        'class': 'exm-guide' + (live === 0 ? ' is-live' : '')
      }));

      this._paintSum(svg, w, note);
      for (k = 0; k < w; k++) this._paintTube(svg, k, k === live);
      for (k = 0; k < w; k++) { this._tubeHit(k, vbW); this._stampHit(k, vbW); }

      svg.setAttribute('aria-label', api.t('sceneLabel'));
      this._hintEl.textContent = api.t(this._hintKey());
      this._chipMethod.textContent = api.t('methodBtn');
      this._chipMethod.setAttribute('aria-pressed', this._method === 'complement' ? 'true' : 'false');
      this._chipMethod.className = 'exm-chip' + (this._method === 'complement' ? ' is-on' : '');
      this._chipOp.textContent = api.t('opBtn');
      this._chipNext.textContent = api.t('nextBtn');
      this._chipPrint.textContent = api.t('printBtn');
      /* keep the two-node gate line honest: the wrap always carries the
         entitlement class so CSS can never disagree with the model */
      this._wrap.className = 'exm-wrap' + (this.premium ? ' exm-paid' : '');
    },

    _paintSum: function (svg, w, note) {
      var st = this.st, k, cx;
      for (k = 0; k < w; k++) {
        cx = this._laneCX(k);
        var struck = (st.op === 'sub' && st.moved[k] && st.method === 'decompose');
        this._digitAt(svg, cx, Y_A, this.digit(st.a, k), 'exm-d' + (struck ? ' is-struck' : ''));
        if (k === 0 || this.digit(st.b, k) > 0 || st.b >= Math.pow(10, k)) {
          this._digitAt(svg, cx, Y_B, this.digit(st.b, k), 'exm-d');
        }

        if (struck) {
          this._strike(svg, cx, Y_A);
          this._markAt(svg, cx - this._lane() * 0.30, Y_MARK, st.col[k] + st.taken[k]);
        }
        /* the lane that RECEIVED a ten wears its working value, small */
        if (st.op === 'sub' && st.method === 'decompose' && k + 1 < this.P && st.moved[k + 1]) {
          this._markAt(svg, cx - this._lane() * 0.30, Y_MARK, st.col[k] + st.taken[k]);
        }
        /* Ergänzen / compensation: nothing is struck; a small 1 goes at
           the FOOT of the next subtrahend lane */
        if (st.op === 'sub' && st.method === 'complement' && st.moved[k]) {
          this._markAt(svg, this._laneCX(k) - this._lane() * 0.30, Y_FOOT, 1);
        }
        if (st.op === 'add' && st.carried[k] && k + 1 < w) {
          var mx = this._laneCX(k + 1) - this._lane() * 0.30;
          this._markAt(svg, mx, note.carryPos === 'foot' ? Y_FOOT : Y_MARK, 1);
        }
        /* THE ANSWER BOX IS ONE DIGIT WIDE, and it is drawn so a child
           can see where the pen goes — and so that "twelve does not fit
           in it" is a fact about the page, not a rule they are told. */
        if (st.ans[k] !== null) {
          this._digitAt(svg, cx, Y_ANS, st.ans[k], 'exm-d is-ans');
          svg.appendChild(this._svgEl('line', {
            x1: cx - DIGIT * 0.31, y1: Y_ANS + 10, x2: cx + DIGIT * 0.31, y2: Y_ANS + 10, 'class': 'exm-done'
          }));
        } else {
          svg.appendChild(this._svgEl('rect', {
            x: cx - DIGIT * 0.36, y: Y_ANS - DIGIT * 0.72, width: DIGIT * 0.72, height: DIGIT * 0.92,
            rx: 4, 'class': 'exm-slotbox' + (this.canStamp(st, k) ? ' is-open' : '')
          }));
        }
      }

      var sign = this._svgEl('text', { x: OX + this._opW() * 0.66, y: Y_B, 'class': 'exm-op', 'text-anchor': 'middle' });
      sign.textContent = (st.op === 'add') ? '+' : '−';   /* U+2212, never a hyphen */
      svg.appendChild(sign);

      /* the rule is DRAWN, with 1.5 units of sag, so the page reads as
         written rather than as a table */
      var rx1 = OX + this._opW() * 0.35, rx2 = OX + this._opW() + w * this._lane() - 4;
      svg.appendChild(this._svgEl('path', {
        d: 'M' + rx1 + ' ' + Y_RULE + ' Q' + ((rx1 + rx2) / 2) + ' ' + (Y_RULE + 1.5) + ' ' + rx2 + ' ' + Y_RULE,
        'class': 'exm-rule'
      }));
    },

    _digitAt: function (svg, cx, y, d, cls) {
      var t = this._svgEl('text', { x: cx, y: y, 'class': cls, 'text-anchor': 'middle' });
      t.textContent = String(d);
      svg.appendChild(t);
      return t;
    },

    /* a bowed pen stroke that overshoots the glyph at both ends, because
       a child does not stop at the letterform */
    _strike: function (svg, cx, y) {
      var w2 = DIGIT * 0.34, h2 = DIGIT * 0.34;
      var x1 = cx - w2 - 5, y1 = y + h2 * 0.20 + 3;
      var x2 = cx + w2 + 5, y2 = y - h2 * 0.70;
      var d = 'M' + x1 + ' ' + y1 + ' Q' + ((x1 + x2) / 2) + ' ' + (((y1 + y2) / 2) - 6) + ' ' + x2 + ' ' + y2;
      svg.appendChild(this._svgEl('path', { d: d, 'class': 'exm-strike-under' }));
      var p = this._svgEl('path', { d: d, 'class': 'exm-strike' });
      svg.appendChild(p);
      return p;
    },

    /* the small handwritten digit: 0.46x, pen coral, rotated, and
       deliberately OFF the grid — which does more work than any font
       choice could, and we do not own a second font family */
    _markAt: function (svg, x, y, v) {
      var rot = -4 - ((Math.round(x) % 5) - 2);
      var t = this._svgEl('text', {
        x: x, y: y, 'class': 'exm-mark', 'text-anchor': 'middle',
        transform: 'rotate(' + rot + ' ' + x + ' ' + y + ')'
      });
      t.textContent = String(v);
      svg.appendChild(t);
      return t;
    },

    _paintTube: function (svg, k, isLive) {
      var st = this.st, cx = this._laneCX(k), halfW = U * 1.15;
      var n = st.col[k], gh = this.ghosts(st, k);
      var cls = 'exm-tube' + (isLive ? ' is-live' : '');
      var i, y;

      /* the tube carries the faint per-lane tint. THE DISC NEVER DOES:
         material whose appearance tracks its value lets a child avoid
         ever looking at the column. */
      svg.appendChild(this._svgEl('rect', {
        x: cx - halfW, y: Y_BRIM, width: halfW * 2, height: TUBE,
        'class': 'exm-tint exm-tint' + k
      }));

      svg.appendChild(this._svgEl('path', {
        d: 'M' + (cx - halfW) + ' ' + Y_BRIM + ' L' + (cx - halfW) + ' ' + (Y_FLOOR - 8) +
           ' Q' + (cx - halfW) + ' ' + Y_FLOOR + ' ' + (cx - halfW + 8) + ' ' + Y_FLOOR +
           ' L' + (cx + halfW - 8) + ' ' + Y_FLOOR +
           ' Q' + (cx + halfW) + ' ' + Y_FLOOR + ' ' + (cx + halfW) + ' ' + (Y_FLOOR - 8) + ' L' + (cx + halfW) + ' ' + Y_BRIM,
        'class': cls
      }));
      /* above the brim the walls go dashed: the region past ten is drawn
         as provisional, and that is the whole "too many" argument */
      svg.appendChild(this._svgEl('line', { x1: cx - halfW, y1: Y_BRIM, x2: cx - halfW, y2: Y_BRIM - U * 1.6, 'class': cls + ' is-over' }));
      svg.appendChild(this._svgEl('line', { x1: cx + halfW, y1: Y_BRIM, x2: cx + halfW, y2: Y_BRIM - U * 1.6, 'class': cls + ' is-over' }));
      svg.appendChild(this._svgEl('line', { x1: cx - halfW - 5, y1: Y_BRIM, x2: cx + halfW + 5, y2: Y_BRIM, 'class': 'exm-brim' }));

      /* the material. THE FIVE LINE, not a tick: a filled row is two, a
         filled block is ten, and the class subitises it without
         counting — the Kraft der Fünf break, drawn. */
      for (i = 0; i < n; i++) {
        svg.appendChild(this._svgEl('circle', {
          cx: this._discX(cx, i), cy: this._discY(i), r: DISC / 2,
          'class': 'exm-disc' + (st.ans[k] !== null ? ' is-spent' : '')
        }));
      }
      /* the ghosts: outlined, empty, never filled and never coloured —
         the shortage made visible before anyone has touched anything.
         In a subtraction they sit ON the discs that are to come away and
         then float over nothing; in an addition they queue above. */
      for (i = 0; i < gh; i++) {
        var gi = (st.op === 'sub') ? (n - 1 - i) : (n + i);
        if (gi < 0) gi = n + (i - n);
        svg.appendChild(this._svgEl('circle', {
          cx: this._discX(cx, gi), cy: this._discY(gi), r: DISC / 2 + 2.4, 'class': 'exm-ghost'
        }));
      }
    },

    /* the one predicate behind BOTH the live-lane wash and the tap
       precedence, so the two can never disagree */
    _exchangeIsTheMove: function (st, k) {
      if (!st) return false;
      if (st.op === 'sub') return k >= 1 && this.columnState(st, k - 1) === 'short' && this.canBorrow(st, k);
      return this.canCarry(st, k) && st.col[k] >= this.BASE;
    },

    _liveLane: function () {
      var st = this.st, w = this._lanes(), k;
      if (st.op === 'add') {
        for (k = 0; k < w - 1; k++) if (st.col[k] >= this.BASE) return k;
      }
      for (k = 0; k < w; k++) {
        var s = this.columnState(st, k);
        if (s === 'short') return k + 1;
        if (s === 'blocked') return k;
      }
      for (k = 0; k < w; k++) if (this.ghosts(st, k) > 0 || st.ans[k] === null) return k;
      return 0;
    },

    /* ⭐ THE ADDITION BRANCH IS NOT OPTIONAL. The first build let `opBtn`
       flip the machine into addition while every hint still said "take
       away" and "are there enough to take" — half the product shipping
       chrome that was simply false. A German panel found it in the
       English source before a single locale was authored. */
    _hintKey: function () {
      var st = this.st, w = this._lanes(), k, short_ = false;
      if (st.op === 'add') {
        for (k = 0; k < w - 1; k++) if (st.col[k] >= this.BASE) return 'hintOver';
        for (k = 0; k < w; k++) if (this.ghosts(st, k) > 0) return 'hintFill';
        for (k = 0; k < w; k++) if (st.ans[k] === null) return 'hintAddReady';
        return 'hintDone';
      }
      if (this.settled(st)) {
        for (k = 0; k < w; k++) if (st.ans[k] === null) return 'hintReady';
        return 'hintDone';
      }
      for (k = 0; k < w; k++) {
        var s = this.columnState(st, k);
        if (s === 'blocked') return 'hintBlocked';
        if (s === 'short') short_ = true;
      }
      if (short_) return 'hintShort';
      for (k = 0; k < w; k++) if (st.moved[k] || st.taken[k] > 0) return 'hintReady';
      return 'hintStart';
    },

    /* ⚠ A DRAG-ONLY TARGET IS DEAD to a keyboard, to assistive tech and
       to the liveness gate — a synthetic .click() never fires
       pointerdown (#41). Every target is a real <button> with a keydown
       path, and the whole lane is the target so it clears the 34px
       canvas floor at 320px. */
    _tubeHit: function (k, vbW) {
      var self = this, api = this.api;
      var b = api.el('button', 'exm-hit');
      b.type = 'button';
      b.setAttribute('data-k', String(k));
      b.style.left = (this._laneX(k) / vbW * 100) + '%';
      b.style.width = (this._lane() / vbW * 100) + '%';
      b.style.top = ((Y_BRIM - U * 2.5) / VH * 100) + '%';
      b.style.height = ((Y_FLOOR + 8 - (Y_BRIM - U * 2.5)) / VH * 100) + '%';
      b.addEventListener('click', function () { self._act(k); });
      b.addEventListener('keydown', function (ev) {
        var back = (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown');
        if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'ArrowRight' || ev.key === 'ArrowUp' || back) {
          ev.preventDefault();
          self._act(k, back);
        }
      });
      this._hits.appendChild(b);
      this._labelTube(b, k);
      return b;
    },

    _labelTube: function (b, k) {
      var api = this.api, st = this.st, key = 'laneAria';
      if (this.canTake(st, k)) key = (st.op === 'sub') ? 'takeAria' : 'fillAria';
      else if (this.canBorrow(st, k)) key = 'breakAria';
      else if (this.canCarry(st, k)) key = 'sendAria';
      else if (this.canReturn(st, k)) key = 'backAria';
      b.setAttribute('aria-label', String(api.t(key)).replace('{c}', this.place(api.lang, k)).replace('{v}', String(st.col[k])));
      var can = this.canTake(st, k) || this.canBorrow(st, k) || this.canCarry(st, k) || this.canReturn(st, k);
      b.className = 'exm-hit' + (can ? ' is-open' : '');
      b.disabled = !can;                /* a dead control is disabled, never a silent no-op */
    },

    _stampHit: function (k, vbW) {
      var self = this, api = this.api, st = this.st;
      var b = api.el('button', 'exm-hit exm-slot');
      b.type = 'button';
      b.style.left = (this._laneX(k) / vbW * 100) + '%';
      b.style.width = (this._lane() / vbW * 100) + '%';
      b.style.top = ((Y_ANS - DIGIT * 0.78) / VH * 100) + '%';
      b.style.height = ((DIGIT * 1.05) / VH * 100) + '%';
      b.setAttribute('aria-label', String(api.t('stampAria')).replace('{c}', this.place(api.lang, k)).replace('{v}', String(st.col[k])));
      b.disabled = !this.canStamp(st, k);
      if (!b.disabled) b.className = 'exm-hit exm-slot is-open';
      b.addEventListener('click', function () {
        var n = self.stamp(self.st, k);
        if (!n) return;
        self.st = n;
        self.api.track('stamp', { lane: k });
        self._paint();
      });
      this._hits.appendChild(b);
      return b;
    },

    /* THE ONE VERB. Take a ghost if there is one to take; otherwise
       exchange; otherwise put back. Refusal is silence — the material
       simply does not move, and the shortfall stays on screen. */
    /* ⭐ THE EXCHANGE OUTRANKS THE TAKE WHEN THE EXCHANGE IS THE MOVE
       THE LANE IS BEING HIGHLIGHTED FOR. The first build tried take()
       first, and on 42 - 17 the tens lane has a ghost of its own — so
       tapping the lane the tool had just washed as live took one away
       instead of breaking a ten, and the borrow was unreachable by
       tapping at all. A control must do what its highlight is
       inviting; the live-lane wash and this precedence are now the
       same decision, computed the same way. */
    _act: function (k, preferBack) {
      var st = this.st, next = null;
      if (this._busy) return;
      if (preferBack) next = this.unExchange(st, k);
      if (!next && this._exchangeIsTheMove(st, k)) {
        next = (st.op === 'sub') ? this.borrow(st, k) : this.carry(st, k);
      }
      if (!next) next = this.take(st, k);
      if (!next) next = (st.op === 'sub') ? this.borrow(st, k) : this.carry(st, k);
      if (!next) next = this.unExchange(st, k);
      if (!next) return;
      var exchanged = (next.moved[k] !== st.moved[k]) || (next.carried[k] !== st.carried[k]);
      this.st = next;
      this.api.track('act', { op: st.op, lane: k });
      try { this.api.sound(exchanged ? 380 : 620); } catch (e) { /* muted */ }
      this._paint();
    },

    _next: function () {
      var list = this._sets();
      if (!list.length) return;
      var wrapped = (this._idx >= list.length - 1);
      this._idx = (this._idx + 1) % list.length;
      var s = list[this._idx];
      this.st = this.newState(s.op, s.a, s.b, this._method);
      this._paint();
      if (!this.premium && wrapped) this._showGate();
    },

    /* ================= store, entitlement, repertoire ================= */

    _loadStore: function () {
      try {
        var raw = window.localStorage.getItem(this.STORE_KEY);
        var j = raw ? JSON.parse(raw) : null;
        return (j && typeof j === 'object') ? j : {};
      } catch (e) { return {}; }
    },

    _saveStore: function () {
      try { window.localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store || {})); } catch (e) { /* private mode */ }
    },

    /* ⚠ UNKNOWN ENTITLEMENT MUST BE PESSIMISTIC. No `&& premiumKnown`
       on a control gate — an unknown tier is a free tier until proven
       otherwise, or the paid repertoire leaks on a slow network. */
    _fetchEntitlement: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/api/quota/status', { credentials: 'include', cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) return;
          var tier = j.tier || (j.entitlement && j.entitlement.tier);
          if (!tier) return;
          self.premium = tier !== 'free';
          self._store.ent = { tier: tier };
          self._saveStore();
          if (self._wrap) self._paint();
        })
        .catch(function () { /* stays pessimistic */ });
    },

    _loadBook: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/mini-tools/exchange-machine-sets.json', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.sets || !j.sets.length) return;
          self._book = j;
          if (typeof j.freeCount === 'number') self.FREE_SETTINGS = j.freeCount;
          if (self._wrap) self._paint();
        })
        .catch(function () { /* the fallback is already live */ });
    },

    _sets: function () {
      var all = (this._book && this._book.sets) || this.FALLBACK_SETS.sets;
      var out = [], i;
      for (i = 0; i < all.length; i++) if (i < this.FREE_SETTINGS || this.premium) out.push(all[i]);
      return out;
    },

    _showGate: function () {
      var api = this.api;
      if (!this._wrap || this._wrap.querySelector('.exm-gate')) return;
      var g = api.el('div', 'exm-gate');
      var h = api.el('div', ''); h.textContent = api.t('gateTitle');
      var p = api.el('div', ''); p.textContent = api.t('gateBody');
      var a = api.el('a', ''); a.href = '/pricing'; a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    },

    /* ================= the print sheet ================================
       ⚠ #40 and #41 each shipped a Print chip calling window.print()
       with NO @media print block at all, so they printed the whole web
       page — and the generic liveness gate scores that green, because
       window.print fires either way. audit-tool-print-sheets.js catches
       it. The paid artefact is a BLANK PRACTICE SHEET IN THE TEACHER'S
       OWN NOTATION: the instrument teaches, the paper practises. */
    _buildSheet: function () {
      var api = this.api, i, k, n;
      var note = this.notation(api.lang);
      while (this._sheetEl.firstChild) this._sheetEl.removeChild(this._sheetEl.firstChild);
      var list = this._sets();
      for (i = 0; i < 6; i++) {
        var s = list[i % list.length] || { op: 'sub', a: 42, b: 17 };
        var w = Math.max(String(s.a).length, String(s.b).length);
        var vw = 40 + (w + 1) * 36;
        var svg = this._svgEl('svg', { viewBox: '0 0 ' + vw + ' 160', 'class': 'exm-p-svg' });
        /* the guide row: where THIS country's pen goes, and the only
           place the child is invited to write */
        for (k = 0; k < w; k++) {
          svg.appendChild(this._svgEl('rect', {
            x: 20 + (k + 1) * 36, y: (note.carryPos === 'foot') ? 112 : 6,
            width: 32, height: 26, 'class': 'exm-p-guide'
          }));
        }
        for (n = 0; n < 2; n++) {
          var str = String(n === 0 ? s.a : s.b);
          for (k = 0; k < str.length; k++) {
            var t = this._svgEl('text', {
              x: 20 + (w + 1 - str.length + k) * 36 + 16, y: 66 + n * 34,
              'class': 'exm-p-d', 'text-anchor': 'middle'
            });
            t.textContent = str.charAt(k);
            svg.appendChild(t);
          }
        }
        var sg = this._svgEl('text', { x: 30, y: 100, 'class': 'exm-p-d', 'text-anchor': 'middle' });
        sg.textContent = (s.op === 'add') ? '+' : '−';
        svg.appendChild(sg);
        svg.appendChild(this._svgEl('line', { x1: 20, y1: 108, x2: vw - 8, y2: 108, 'class': 'exm-p-rule' }));
        this._sheetEl.appendChild(svg);
      }
    }
  };

  if (typeof window !== 'undefined') window.ExchangeMachine = ExchangeMachine;
  if (typeof module !== 'undefined' && module.exports) module.exports = ExchangeMachine;

  /* =====================================================================
     CSS — injected once, under the exm- prefix.
     RULES, all of them scar tissue:
       · prefix every class; exactly one id for the style tag
       · NO `vh` — it measures the window, not the iframe
       · no inline `background` shorthand (it resets background-image)
       · no `font:` shorthand — an unquoted `Baloo 2` inside one
         invalidates the whole declaration silently
       · `margin:0 auto` on the CHILD, never justify-content on an
         overflow scroller
       · NO GREEN AND NO RED anywhere on the stage
     ===================================================================== */
  function injectExchangeMachineCSS() {
    if (typeof document === 'undefined' || document.getElementById('exm-style')) return;
    var s = document.createElement('style');
    s.id = 'exm-style';
    s.textContent = ''
      + '.exm-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;}'
      + '.exm-sheet{position:relative;width:100%;max-width:520px;margin:0 auto;}'
      + '.exm-svg{display:block;width:100%;max-width:100%;max-height:496px;margin:0 auto;}'

      + '.exm-paper{fill:#FDF9F0;stroke:#E7DCC8;stroke-width:1;}'
      + '.exm-grid{stroke:#E7DCC8;stroke-width:1;shape-rendering:crispEdges;}'
      + '.exm-wash{fill:#E2F0EC;opacity:.55;}'
      + '.exm-guide{stroke:#E7DCC8;stroke-width:1;}'
      + '.exm-guide.is-live{stroke:#146B5E;stroke-width:1.5;opacity:.30;}'

      /* three inks, three meanings: given / produced / recorded */
      + '.exm-d{font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;font-weight:600;font-size:52px;fill:#2A2A35;}'
      + '.exm-d.is-ans{font-weight:700;fill:#146B5E;}'
      + '.exm-d.is-struck{opacity:.55;}'
      + '.exm-op{font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;font-weight:600;font-size:44px;fill:#2A2A35;}'
      + '.exm-mark{font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;font-weight:600;font-size:24px;fill:#C4441B;'
      + 'paint-order:stroke fill;stroke:#C4441B;stroke-width:1.6px;stroke-linejoin:round;}'
      + '.exm-rule{stroke:#2A2A35;stroke-width:3;stroke-linecap:round;fill:none;}'
      + '.exm-strike{stroke:#C4441B;stroke-width:3.4;stroke-linecap:round;fill:none;}'
      + '.exm-strike-under{stroke:#C4441B;stroke-width:1.6;stroke-linecap:round;fill:none;opacity:.4;}'
      + '.exm-done{stroke:#146B5E;stroke-width:2;stroke-linecap:round;}'

      /* the tube carries the tint; the disc never does */
      + '.exm-tint{opacity:.30;}'
      + '.exm-tint0{fill:#FBF3E4;}'
      + '.exm-tint1{fill:#F3EEE0;}'
      + '.exm-tint2{fill:#EAE9DE;}'
      + '.exm-tube{fill:none;stroke:#146B5E;stroke-width:1.5;opacity:.22;}'
      + '.exm-tube.is-live{opacity:.45;}'
      + '.exm-tube.is-over{stroke-dasharray:4 3;opacity:.18;}'
      + '.exm-brim{stroke:#146B5E;stroke-width:2;opacity:.40;}'
      + '.exm-tick{stroke:#146B5E;stroke-width:2;opacity:.35;}'

      /* the material: identical in every lane. no gradient, no shadow,
         no highlight — the rim keeps ten of them beaded at 3 metres */
      + '.exm-disc{fill:#F2784B;stroke:#C4441B;stroke-width:1.25;stroke-opacity:.55;}'
      + '.exm-disc.is-spent{fill-opacity:.62;stroke-opacity:.30;}'
      + '.exm-ghost{fill:none;stroke:#146B5E;stroke-width:2;stroke-dasharray:4 3;opacity:.5;}'
      + '.exm-slotbox{fill:none;stroke:#146B5E;stroke-width:1.5;stroke-dasharray:5 4;opacity:.28;}'
      + '.exm-slotbox.is-open{opacity:.62;stroke-width:2;}'

      + '.exm-hits{position:absolute;inset:0;}'
      + '.exm-hit{position:absolute;min-width:34px;min-height:34px;padding:0;border:0;'
      + 'background-color:transparent;border-radius:10px;cursor:pointer;}'
      /* ⚠ NO HOVER OUTLINE. The live-lane wash already says where the action is, and two competing signals for one thing is how a stage turns to noise — the art panel's rule. It also baked a dashed box into the hub thumbnail, because the preview generator leaves the cursor where it clicked. :focus-visible stays, for keyboards. */
      + '.exm-hit:disabled{cursor:default;}'
      + '.exm-hit:focus-visible{outline:3px solid #1E8FD4;outline-offset:-2px;}'

      + '.exm-hint{margin:0;max-width:520px;text-align:center;font-family:Nunito,system-ui,sans-serif;'
      + 'font-size:16px;line-height:1.45;color:#6B6B78;}'
      + '.exm-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}'
      + '.exm-chip{min-height:44px;padding:8px 16px;border:1.5px solid #146B5E;border-radius:999px;'
      + 'background-color:#FFFFFF;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;'
      + 'font-weight:700;cursor:pointer;}'
      + '.exm-chip.is-on{background-color:#E2F0EC;}'
      + '.exm-chip:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.exm-wrap:not(.exm-paid) .exm-lock{opacity:.75;}'
      + '.exm-gate{margin:4px auto 0;max-width:520px;padding:14px 16px;border:1.5px solid #146B5E;'
      + 'border-radius:18px;background-color:#FFFDF7;text-align:center;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#2A2A35;}'
      + '.exm-gate div:first-child{font-weight:800;color:#146B5E;margin-bottom:4px;}'
      + '.exm-gate a{display:inline-block;margin-top:8px;color:#146B5E;font-weight:800;}'

      + '.exm-sheetprint{display:none;}'
      + '.exm-p-svg{width:46%;margin:2%;}'
      + '.exm-p-d{font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;font-weight:600;font-size:30px;fill:#000;}'
      + '.exm-p-rule{stroke:#000;stroke-width:2;}'
      + '.exm-p-guide{fill:none;stroke:#000;stroke-width:1;stroke-dasharray:2 3;}'

      /* self-widening tiers, WIDTH ONLY. body.exm-wide .lcs-app is
         (0,1,1) and deliberately beats the shell's own wide tiers. */
      + '@media (min-width:1367px) and (min-height:880px){'
      + '  body.exm-wide .exm-sheet{max-width:620px;}'
      + '  body.exm-wide .exm-svg{max-height:590px;}'
      + '  body.exm-wide .exm-hint{max-width:640px;font-size:18px;}'
      + '}'
      + '@media (min-width:1800px) and (min-height:1080px){'
      + '  body.exm-wide .exm-sheet{max-width:720px;}'
      + '  body.exm-wide .exm-svg{max-height:680px;}'
      + '}'
      /* ⚠ the operator works at ~2000px and the gates used to stop at
         1366. At 2560 the sheet filled 47% of the height and the
         apparatus read as a stamp in the middle of a field. */
      + '@media (min-width:2400px) and (min-height:1150px){'
      + '  body.exm-wide .exm-sheet{max-width:860px;}'
      + '  body.exm-wide .exm-svg{max-height:840px;}'
      + '  body.exm-wide .exm-hint{max-width:800px;font-size:20px;}'
      + '}'

      /* below 400px the grid moirés against projector scaling and reads
         as dirt; the lane guides carry the alignment on their own */
      /* ⚠ MEASURED, NOT GUESSED. At 412px the Danish, Norwegian and
         Finnish hints wrap to three lines and pushed the chip row 16px
         past a 740px fold — a FITS failure in four locales that English
         never shows, which is the whole reason the layout audit runs
         eleven languages rather than one. The sheet gives the height
         back; the material stays above its floor because the tap
         targets are a percentage of a stage that is still 380px wide. */
      + '@media (max-width:430px){'
      + '  .exm-svg{max-height:412px;}'
      + '}'
      + '@media (max-width:400px){'
      + '  .exm-grid{display:none;}'
      + '  .exm-hint{font-size:15px;}'
      + '}'

      + '@media (prefers-reduced-motion:reduce){'
      + '  .exm-disc,.exm-mark,.exm-strike{transition:none !important;animation:none !important;}'
      + '}'

      + '@media print{'
      + '*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
      + '.exm-sheet,.exm-hint,.exm-foot,.exm-gate,.lcs-header,.lcs-bar{display:none !important;}'
      + '.exm-sheetprint{display:flex !important;flex-wrap:wrap;}'
      + '}';
    document.head.appendChild(s);
  }
}());
