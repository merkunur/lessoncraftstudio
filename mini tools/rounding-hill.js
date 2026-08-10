/* =====================================================================
   TOOL #52 — THE ROUNDING HILL
   =====================================================================
   The number strip bent into slopes. Every ten is a DIP; every five is a
   RIDGE. A numbered stone is set down on the ground and let go: 47 is on
   the slope above 50, so it settles into 50, because that is what
   "nearest" MEANS and there is nothing to decide.

   ⭐⭐ AND ON THE RIDGE THE STONE WILL NOT FALL. At exactly 45 the ground
   is level under it and the apparatus STOPS. It does not pick. It does
   not wait a moment and then pick. It teeters until somebody in the room
   settles it — and once the class has settled which way a ridge tips,
   THE RIDGE IS DRAWN TILTED FROM THEN ON and every later tie obeys it,
   visibly, without a word being written anywhere.

   ⚖️ THE FENCE RETURNED "NOTHING SURVIVES", IN THOSE WORDS, AND IT IS
   RECORDED HERE RATHER THAN ANSWERED: "this is halfway-harbors with a
   gradient painted on it, asked by landing-strip, animated by
   number-balance, and finished by class-graph."
   - the roll-to-the-nearest-ten decision -> `halfway-harbors-core.js:29`
     (3.NBT.A.1, the only claim of that code across 133 manifests)
   - the ridge question, verbatim -> `landing-strip.js` (#51), shipped
     hours before this one
   - hold, release, settle, unstable equilibrium -> `number-balance.js`
     (#31): "HOLD. Freeze the beam ... so the class PREDICTS which way it
     will go, then let go and it settles."
   - pour-into-columns -> `class-graph`, and `draw-bag` DELETED it as its
     refusal 2 for exactly this reason
   - the per-country convention as an on-screen object ->
     `exchange-machine.js:44`, outright
   ⚠ #47's rule binds: redefining the deliverable is the operator's call,
   not a panel's. The objection goes on the record and the tool is built
   — around what the objection actually showed, which was better than any
   gap it closed.

   ⭐⭐ WHAT THE FENCE ACTUALLY FOUND: THREE SHIPPED SURFACES GIVE THREE
   DIFFERENT ANSWERS TO "WHAT HAPPENS AT EXACTLY 45", AND ONE OF THEM
   REFUSES TO HAVE THE CONVERSATION.
   - `halfway-harbors-core.js:33` — `d === bestD && harbors[i] > best` —
     a tie goes UP, and `core.js:74` asserts `matchesRoundHalfUp`.
   - `landing-strip.js` (#51, mine, hours old) — `var order = [1, 0, 2]`
     — a tie goes to the MIDDLE.
   - `number-line-tasks.js:71` — the printables EXCLUDE the midpoint on
     purpose, `while (v % step === 0 || v - lo === step / 2)`, and `:132`
     fails such a row as "ambiguous".
   That is not a gap in a catalog. It is the subject: the rule really is
   arbitrary, the platform's own code proves it by disagreeing with
   itself three ways, and the honest apparatus is one that refuses to
   pretend otherwise and hands the choice to the room.

   ⚠⚠ THE CATALOG'S PAID SUPERPOWER IS FALSE AND IS DELETED. It promised
   "the country's convention arrives as a visible puff of wind". All
   ELEVEN locales teach round-half-UP; not one primary source in eleven
   languages teaches half-to-even.
   ⚠ AND THE FIRST VERSION OF THIS DOCBLOCK JUSTIFIED THAT BADLY. It
   argued from `halfway-harbors-core.js:24` shipping `roundHalfUp` with no
   per-locale branch — which is evidence about OUR OWN CODE, not about
   eleven countries, and had the platform happened to be wrong it would
   have laundered our bug into a curriculum claim. The pedagogy panel
   checked the countries. The real finding is stronger and is measured on
   the ministry documents themselves: EVERY ONE OF THE ELEVEN NATIONAL
   CURRICULA IS SILENT ON THE TIE. Spain RD 157/2022, 119 pages,
   `redonde*` = 0. Italy's Indicazioni nazionali, `arrotond*` = 0. France
   cycle 2+3, `arrondi` = 0. Norway LK20: no competence aim. Finland POPS
   2014, ~500 pages: twice, both as ESTIMATION. England teaches midpoints
   and never resolves the tie. The 5-up rule is textbook convention
   everywhere and law NOWHERE.
   ⭐ That is this tool's real warrant: handing the tie to the room is not
   a graceful retreat from a false claim, it is THE ONLY DESIGN THAT IS
   CURRICULARLY ACCURATE IN ALL ELEVEN MARKETS AT ONCE.
   (`wind` is also `calendar-wall`'s shipped 11-locale weather icon.)

   ⚠ EVERY NOUN IN THE PITCH IS OWNED. `valley` is `track-repair`'s
   WHISTLE VALLEY — the number-line-as-terrain name itself. `ball` is
   `measurement-bench`'s rendered object in all 11 locales. `roll` is
   `exchange-machine`'s roll of ten. `pour` is `pour-measure-core`.
   `tip` is `cold-line`'s invention AND `number-balance`'s feedback AND
   `name-sticks`' `tipBack`, which `draw-bag` refuses by name. `marble`
   is `rivets-number-forge`'s, and its French `bille` is Danish for
   BEETLE, which is `arrow-strip`'s character in every Scandinavian
   string. FREE, and used here: THE SLOPES · THE DIPS · THE RIDGE ·
   THE STONE.

   ⚠ NO WORDS ON THE APPARATUS (§23.2). The ground carries numerals at
   the dips and nothing else. Legible with the sound off.

   ⚠ NO BUCKET POUR. `class-graph` owns record-becomes-bar outright and
   `draw-bag` already deleted its own version. A second one would be the
   third.

   ⚖️ THE PEDAGOGY PANEL RULED BUILD-WITH-CHANGES, 2-1, and its refuse-
   list is binding. The three most easily broken:
   - ⚠⚠ NEVER ASSERT "5 GOES UP" AS FACT, in any locale, on the apparatus
     or in landing copy or on the paid sheet. It has no curricular
     standing in any of the eleven, and in pt-BR it is actively
     contested: ABNT NBR 5891 and IBGE Resolucao 886/66 both specify
     round-half-to-EVEN, Brasil Escola teaches 1,365 -> 1,36 (which
     half-up would make 1,37), and Mundo Educacao misquotes IBGE into
     round-half-DOWN. THREE rules circulate in Brazilian school content.
   - ⚠⚠ NEVER USE THE WORD "ARBITRARY" (or willkuerlich / arbitraire /
     equivalents) in child-facing copy. Seven-year-olds hear it as
     "doesn't matter", which is one step from "any answer is fine" - the
     exact misconception that makes rounding untrustworthy later. SHOW
     it; do not name it. The apparatus argues; the words do not.
   - ⚠ NO DECIMALS, EVER. Germany places them at Klasse 5/6, so primary
     rounding is whole tens and hundreds only.
   Also binding: no tilt may ever ship as a DEFAULT (level is the honest
   opening state); no accuracy trace, ghost or trend (verify-estimation-
   jar P14); no curricular-alignment claim in pt at all, since BNCC puts
   rounding at EF06MA12, 6th year, age ~11; and THE CLASS CAN NEVER BE
   WRONG ABOUT THE TILT - a purpose can be right, a room cannot.

   🔻 AND ITS DISSENT IS RECORDED RATHER THAN ANSWERED. The practising
   teacher on the panel voted DO NOT BUILD: "the fence came back nothing
   survives, in those words, and I think the fence was right and we
   talked ourselves past it... Landing Strip shipped HOURS before this
   one and already has a post at 45. The honest move is not a fourth
   apparatus - it is to fold the teeter into Landing Strip, whose middle
   post is already the ridge. The strongest evidence in this whole review
   - the platform's own three surfaces disagreeing three ways about 45 -
   is an argument for RECONCILING them, and we have used it as an
   argument for adding a fourth."
   ⚠ That is a live and unresolved question about this tool's existence,
   and it belongs to the operator, not to me or to a panel.

   FREE   the whole apparatus: every slope, every ridge, the teeter, and
          setting the rule.
   PAID   the paper ground to fold and stand up on a desk.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* the ground. A dip at every ten, a ridge at every five between
       them — so the ground repeats with period DIP_STEP and is the SAME
       SHAPE whether it spans 40-50 or 400-500. */
    /* ⚠⚠ ONE STEP BETWEEN THE TWO DIPS, never two. Built first with a
       span of two steps, the dips were 40 and 60 and the ridge 50 — so
       the ground rounded to the nearest TWENTY and 47 ran DOWN to 40.
       Rounding to the nearest ten means the two dips are consecutive
       tens and the ridge is the five between them. Caught by driving the
       model by hand before any gate existed. */
    DIP_STEP: 10,

    /* ⚠ THE RESOLUTION IS THE UNIT. A stone can only be set down on a
       whole number, because a rounding question about 47.3 is a
       different lesson and this ground cannot draw it honestly. */
    STEP: 1,

    /* the settle is a DETERMINISTIC path, never an integrator: a physics
       simulation is unverifiable, non-reproducible, and would make a
       screenshot and a gate see different things. The stone's position
       at time t is a pure function, so the gate enumerates it. */
    /* ⚠⚠ THE GROUND AND THE STONE SHARE THESE. The stone was placed by
       `h * 63% + 6px` while the ground was drawn at `250 - h * 190` in a
       300-tall viewBox — two expressions, a fixed px inside a percentage
       layout, and 63 against the true 63.33 agreeing by coincidence. It
       shipped the stone BURIED to 61% of its diameter. Measured by the
       art panel; #43's two-circles defect in a third dress. */
    VB_H: 300,
    G_BASE: 250,               /* the y of a dip, in viewBox units */
    G_RISE: 190,               /* how much higher the ridge is */

    T_SETTLE: 620,
    T_ARRIVE: 340,
    /* ⚠ A STONE ACCELERATES. The house ease is an ease-OUT, right for a
       UI element arriving and wrong for something falling, so the fall
       — and only the fall — uses an ease-IN. */
    E_ROLL: 'cubic-bezier(.55,.02,.6,1)',
    /* ⚠⚠ NOT THROUGH _dur(). The class must see the ridge lean and THEN
       the stone go, or the rule and its consequence read as one physical
       event and the tool has taught that the ground decided. */
    T_BEAT: 700,
    /* ⚠⚠ THE TEETER NEVER ENDS ON ITS OWN. It is a loop, not a timeout:
       a wobble that resolves after N milliseconds would mean the machine
       decided, which is the one thing this apparatus exists NOT to do. */
    T_TEETER: 900,
    TEETER_DEG: 5,
    /* the tilt the class sets, drawn on the ridge itself, forever after */
    T_TILT: 520,
    TILT_DEG: 9,
    T_REFUSE: 200,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_SET: 520,
    SND_SETTLE: 700,
    SND_TEETER: 440,
    SND_TILT: 880,
    SND_REFUSE: 300,
    SND_DEBOUNCE: 160
  };

  var RoundingHill = {

    id: 'rounding-hill',

    strings: {
      title: { en: 'The Rounding Hill' },
      instruction: { en: 'Set the stone down and let go. It settles into the nearest dip — unless it lands on the ridge, where neither side is lower, it will not fall on its own, and what the number is FOR decides which way it goes.' },

      ariaGround: { en: 'Ground with a dip at each end and a ridge in the middle.' },
      ariaStone: { en: 'the stone, at {n}' },
      ariaStoneRest: { en: 'the stone, {n}, resting in the {d} dip' },
      ariaRidge: { en: 'the ridge, halfway between the two dips' },
      ariaTilt: { en: 'the way this class has settled the ridge' },

      setSpan: { en: 'Which ground' },
      spanTens: { en: 'between two tens' },
      spanHundreds: { en: 'between two hundreds' },

      lessBig: { en: 'Move the stone a long way left' },
      lessOne: { en: 'Move the stone a little left' },
      moreOne: { en: 'Move the stone a little right' },
      moreBig: { en: 'Move the stone a long way right' },
      letGo: { en: 'Let go' },
      tiltDown: { en: 'Settle the ridge towards the lower dip' },
      tiltUp: { en: 'Settle the ridge towards the higher dip' },
      /* ⭐⭐ NOT AN UNDO — A REASON. Framed as an undo, this control was
         pressed once and never again, so the tool held exactly ONE
         decision in its whole life and became a demonstration on day two.
         SLO kerndoel 28, a binding Dutch objective, says the CONTEXT
         decides whether rounding up or down is wanted — so when the
         purpose changes, the ridge must be settled again. That is what
         makes the decision recur, and it is a curriculum objective in one
         of the eleven rather than an invention of ours. */
      clearTilt: { en: 'The number is for something else now — level the ridge again' },
      again: { en: 'Another stone' },

      saidSet: { en: '{n}' },
      saidSettled: { en: '{n} settles into {d}.' },
      saidTeeter: { en: '{n} is on the ridge. Neither side is lower, so the stone will not fall on its own. What are these numbers for — and which way should that settle it?' },
      saidTiltSet: { en: 'This class has settled the ridge towards {d}, for what these numbers are being used for. Every tie goes that way until that changes.' },
      saidTiltClear: { en: 'The ridge is level again. What are these numbers for now? The stone will teeter until the class settles it again.' },
      saidAlready: { en: 'The stone is already at rest. Set down another one.' },
      saidAlreadyLevel: { en: 'The ridge is already level.' },
      saidAlreadySet: { en: 'The ridge is already settled that way.' },
      saidTiltClearOff: { en: 'The ridge is level again. The next stone that lands on it will teeter.' },
      saidEdge: { en: 'The ground stops at {n}.' },

      gateTitle: { en: 'The paper ground' },
      gateBody: { en: 'The whole apparatus is free — every slope, the teeter, and settling the ridge. A Teacher plan adds the paper ground to cut out and fold, so it stands up on a desk and a child can put a real counter on the ridge and see that it truly does not fall.' },
      gateCta: { en: 'See the Teacher plan' },
      gateClose: { en: 'Not now' },

      printBtn: { en: 'Print the paper ground' },
      sheetTitle: { en: 'Paper ground to cut out and fold' },
      sheetNote: { en: 'Cut along the outline and fold on the dotted lines so the ground stands up. Write the two round numbers in the dips. Put a counter anywhere on a slope and it runs down to a dip; put it on the ridge and it stays, which is the whole point.' }
    },

    settings: [
      { key: 'span', type: 'choice', labelKey: 'setSpan', options: [
        { value: 'tens', labelKey: 'spanTens' },
        { value: 'hundreds', labelKey: 'spanHundreds' }
      ] }
    ],
    defaults: { span: 'tens' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM. `at` is a single integer on the ground and `phase` a single
       token, so "settled into a dip it is not nearest to" is not a state
       any sequence of presses can produce.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. */

    newState: function (span) {
      var unit = String(span) === 'hundreds' ? 100 : 10;
      var lo = unit * 4;                    /* 40..50, or 400..500 */
      return {
        unit: unit, lo: lo, hi: lo + unit,
        at: lo + Math.round(unit * 0.7),    /* 47: on the slope above the higher dip */
        phase: 'held',                      /* held | settled | teeter */
        rest: null,                          /* the dip it settled into */
        tilt: 0                              /* -1 low, 0 level, +1 high */
      };
    },

    _st: function (st) { return st || this.st; },

    /* the two dips and the one ridge between them */
    dipLow: function (st) { return this._st(st).lo; },
    dipHigh: function (st) { return this._st(st).hi; },
    ridge: function (st) { var s = this._st(st); return (s.lo + s.hi) / 2; },

    /* ⭐ THE GROUND'S OWN LAW. Where a stone at `v` runs to — and null
       EXACTLY on the ridge, where the ground is level. Null is not a
       failure here; it is the honest answer, and it is the tool. */
    runsTo: function (st, v) {
      var s = this._st(st), r = this.ridge(s);
      if (v === r) return null;
      return v < r ? s.lo : s.hi;
    },

    /* what the ground does with a stone once the class has settled the
       ridge. ⚠ The tilt is consulted ONLY on the ridge — a settled ridge
       must never change where 47 goes. */
    settleOf: function (st, v) {
      var s = this._st(st);
      var free = this.runsTo(s, v);
      if (free !== null) return free;
      if (s.tilt === 0) return null;
      return s.tilt > 0 ? s.hi : s.lo;
    },

    onRidge: function (st, v) { return v === this.ridge(st); },

    /* the stone's height above the low dip, 0..1 — the ground's shape.
       ⭐ Derived, not drawn: two slopes meeting at the ridge, so the
       picture and the law cannot disagree. */
    heightAt: function (st, v) {
      var s = this._st(st), r = this.ridge(s), half = (s.hi - s.lo) / 2;
      if (half <= 0) return 0;
      return 1 - Math.abs(v - r) / half;
    },

    /* ⭐ ONE EXPRESSION FOR WHERE THE GROUND IS. The path samples it and
       the stone sits on it, so a stone can never be drawn under the
       hillside it is standing on. Returns the viewBox y. */
    groundY: function (st, v) {
      return GEO.G_BASE - this.heightAt(st, v) * GEO.G_RISE;
    },
    /* the same line as a fraction UP FROM THE BOTTOM of the arena */
    groundUp: function (st, v) {
      return (GEO.VB_H - this.groundY(st, v)) / GEO.VB_H;
    },

    frac: function (st, v) {
      var s = this._st(st);
      return (v - s.lo) / (s.hi - s.lo);
    },

    /* ---- the moves ------------------------------------------------ */

    step: function (st) { return GEO.STEP * (this._st(st).unit / GEO.DIP_STEP); },
    bigStep: function (st) { return this.step(st) * 5; },

    move: function (st, units) {
      var s = this._st(st);
      if (s.phase !== 'held') return null;
      var v = s.at + units;
      if (v < s.lo || v > s.hi) return null;
      return { unit: s.unit, lo: s.lo, hi: s.hi, at: v, phase: 'held', rest: null, tilt: s.tilt };
    },

    /* let go. Off the ridge it settles; ON the ridge with a level ridge
       it teeters and NOTHING resolves it. */
    release: function (st) {
      var s = this._st(st);
      if (s.phase !== 'held') return null;
      var d = this.settleOf(s, s.at);
      return {
        unit: s.unit, lo: s.lo, hi: s.hi, at: s.at,
        phase: d === null ? 'teeter' : 'settled', rest: d, tilt: s.tilt
      };
    },

    /* ⭐ THE CLASS SETS THE RULE. Allowed at any time, and it resolves a
       teetering stone at once — because that is what the class just
       decided. dir is -1 or +1; 0 puts the ridge back to level. */
    setTilt: function (st, dir) {
      var s = this._st(st);
      if (dir !== -1 && dir !== 0 && dir !== 1) return null;
      if (dir === s.tilt) return null;
      var n = { unit: s.unit, lo: s.lo, hi: s.hi, at: s.at, phase: s.phase, rest: s.rest, tilt: dir };
      if (s.phase === 'teeter' && dir !== 0) { n.phase = 'settled'; n.rest = dir > 0 ? s.hi : s.lo; }
      /* ⚠⚠ AND FLIPPING AN ALREADY-SET RULE MUST MOVE THE STONE WITH
         IT. Without this branch the apparatus could hold tilt:-1 while
         the stone rested in the HIGH dip — a stored answer contradicting
         the law that produced it, reachable in two presses, and invisible
         to 908 assertions because the gate asked settleOf (the law) and
         never the stored rest. Oracle and subject were the same
         expression, which is #51's defect verbatim. */
      if (s.phase === 'settled' && dir !== 0 && this.onRidge(s, s.at)) { n.rest = dir > 0 ? s.hi : s.lo; }
      /* ⚠ and un-settling the ridge puts a stone that was resolved BY
         the rule back on the ridge — the rule going away must take its
         consequence with it, or the apparatus would be claiming the
         stone fell on its own. */
      if (s.phase === 'settled' && dir === 0 && this.onRidge(s, s.at)) { n.phase = 'teeter'; n.rest = null; }
      return n;
    },

    /* another stone, on the same ground, with the class's rule kept */
    again: function (st, v) {
      var s = this._st(st);
      if (v < s.lo || v > s.hi) return null;
      return { unit: s.unit, lo: s.lo, hi: s.hi, at: v, phase: 'held', rest: null, tilt: s.tilt };
    },

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('rnh-wide');
      /* ⚠⚠ THE SCROLL ESCAPE — the shell pins overflow:hidden on BOTH
         html and body, so standalone on a phone a control row can end up
         physically unreachable. ⚠ `html,body.x{}` is a selector LIST
         whose html half applies unconditionally, which makes the class
         decorative and its mutation unkillable — two adds, one rule
         each. */
      document.documentElement.classList.add('rnh-scroll');
      document.body.classList.add('rnh-scroll');

      this._lastSound = 0;
      this._seed = 7;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.span);
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () {
      this.st = this.newState(this.api.settings.span);
      this.render();
    },

    onSettings: function () { this.reset(); },

    /* ⚠ not Math.random: the gate, the probe and the classroom must see
       the same stones, and a screenshot must be reproducible. */
    _rand: function (n) {
      this._seed = (this._seed * 1103515245 + 12345) & 0x7fffffff;
      return this._seed % n;
    },

    /* ⭐ ONE STONE IN FOUR LANDS ON THE RIDGE. The teeter is the lesson,
       so it must not be a rarity a class meets once a term — but a
       ground where every stone teetered would teach that rounding is
       always a choice, which is the opposite of true. */
    /* ⚠ EVERY DEALT STONE MUST BE ON THE MOVE GRID. On the hundreds
       ground the nudge is 10 but the deal picked any integer, so from
       437 the ridge at 450 could not be reached by ANY sequence of
       presses — the tool's one lesson, unreachable, in half its
       configurations. Found by a native panel driving the model. */
    _snap: function (v) {
      var st = this.step(), s = this.st;
      return s.lo + Math.round((v - s.lo) / st) * st;
    },

    _deal: function () {
      var s = this.st, r = this.ridge(s), v;
      if (this._rand(4) === 0) { v = r; }
      else {
        do { v = s.lo + this._rand(s.hi - s.lo + 1); } while (v === r || v === s.lo || v === s.hi);
      }
      var next = this.again(s, this._snap(v));
      if (next) this.st = next;
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (f, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(f);
    },

    _fmt: function (s, v) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (v && v[k] != null) ? String(v[k]) : m;
      });
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'rnh-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'rnh-card');
      var arena = api.el('div', 'rnh-arena');
      this._arena = arena;
      /* ⚠ THE FIELD IS INSET BY HALF A STONE. The dips are at 0% and 100%
         of the ground, and a stone centred there hangs half outside the
         arena — measured at the 50 dip. Insetting the field rather than
         clamping the stone keeps ONE coordinate space for the ground and
         everything standing on it. */
      var field = api.el('div', 'rnh-field');
      this._field = field;
      arena.appendChild(field);

      /* the ground, drawn from the SAME height function the model uses,
         so the picture cannot disagree with the law */
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 1000 300');
      svg.setAttribute('class', 'rnh-svg');
      svg.setAttribute('preserveAspectRatio', 'none');
      this._svg = svg;
      this._ground = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this._ground.setAttribute('class', 'rnh-ground');
      /* ⚠ this was a DEAD STRING — authored in eleven locales and never
         referenced, so the ground itself had no accessible name. */
      svg.setAttribute('role', 'img');
      this._svgEl = svg;
      svg.appendChild(this._ground);
      field.appendChild(svg);

      this._ridgeEl = api.el('div', 'rnh-ridge');
      this._ridgeEl.setAttribute('aria-label', api.t('ariaRidge'));
      field.appendChild(this._ridgeEl);

      this._stone = api.el('button', 'rnh-stone');
      this._stone.type = 'button';
      field.appendChild(this._stone);

      this._marks = [api.el('div', 'rnh-mark rnh-mark-a'), api.el('div', 'rnh-mark rnh-mark-b')];
      arena.appendChild(this._marks[0]);
      arena.appendChild(this._marks[1]);
      card.appendChild(arena);

      var bar = api.el('div', 'rnh-bar');
      this._btn = {};
      this._btn.lb = this._mk(bar, 'rnh-b-lb', '«', 'lessBig');
      this._btn.l1 = this._mk(bar, 'rnh-b-l1', '‹', 'lessOne');
      this._btn.r1 = this._mk(bar, 'rnh-b-r1', '›', 'moreOne');
      this._btn.rb = this._mk(bar, 'rnh-b-rb', '»', 'moreBig');
      this._btn.go = this._mk(bar, 'rnh-b-go', '▼', 'letGo');
      this._btn.td = this._mk(bar, 'rnh-b-td', '↙', 'tiltDown');
      this._btn.tu = this._mk(bar, 'rnh-b-tu', '↘', 'tiltUp');
      this._btn.tc = this._mk(bar, 'rnh-b-tc', '—', 'clearTilt');
      this._btn.again = this._mk(bar, 'rnh-b-again', '↻', 'again');
      this._btn.print = this._mk(bar, 'rnh-b-print', '⎙', 'printBtn');

      /* ⚠ THE REASON IS COMPUTED, NOT ASSUMED. Passing 'low'/'high'
         unconditionally announced an EDGE for every refusal, including
         the commonest one — nudging a stone that has already settled —
         so a resting 47 was told "the ground stops at 40". A refusal
         must name what actually stopped it. */
      var why = function (d) { return self.st.phase !== 'held' ? 'rest' : (d < 0 ? 'low' : 'high'); };
      this._btn.lb.addEventListener('click', function () { self._move(self.move(null, -self.bigStep()), why(-1)); });
      this._btn.l1.addEventListener('click', function () { self._move(self.move(null, -self.step()), why(-1)); });
      this._btn.r1.addEventListener('click', function () { self._move(self.move(null, self.step()), why(1)); });
      this._btn.rb.addEventListener('click', function () { self._move(self.move(null, self.bigStep()), why(1)); });
      this._btn.go.addEventListener('click', function () { self._release(); });
      this._btn.td.addEventListener('click', function () { self._tilt(-1); });
      this._btn.tu.addEventListener('click', function () { self._tilt(1); });
      this._btn.tc.addEventListener('click', function () { self._tilt(0); });
      this._btn.again.addEventListener('click', function () { self._again(); });
      this._btn.print.addEventListener('click', function () { self._print(); });
      this._stone.addEventListener('click', function () { if (self.st.phase === 'held') self._release(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);
      this._sheet = api.el('div', 'rnh-sheet');
      wrap.appendChild(this._sheet);
      api.stage.appendChild(wrap);
    },

    _mk: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'rnh-btn ' + cls);
      b.type = 'button';
      b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    _move: function (next, why) {
      if (!next) { this._refuse(why); return; }
      this.st = next;
      this._paint();
      this._snd(GEO.SND_SET);
      this.api.announce(this._fmt(this.api.t('saidSet'), { n: this.st.at }));
    },

    _release: function () {
      var api = this.api;
      var next = this.release(null);
      if (!next) { this._refuse(this.st.phase === 'teeter' ? 'teeter' : 'rest'); return; }
      this.st = next;
      this._paint(GEO.T_SETTLE);
      if (next.phase === 'teeter') {
        this._snd(GEO.SND_TEETER);
        api.announce(this._fmt(api.t('saidTeeter'), { n: next.at }));
      } else {
        this._snd(GEO.SND_SETTLE);
        api.announce(this._fmt(api.t('saidSettled'), { n: next.at, d: next.rest }));
      }
    },

    _tilt: function (dir) {
      var api = this.api;
      var self = this;
      var next = this.setTilt(null, dir);
      if (!next) { this._refuse('tilt'); return; }
      /* ⭐ THE BEAT. When the class's decision is what moves the stone, the
         ridge leans FIRST and the stone follows a moment later — otherwise
         the rule and its consequence read as ONE physical event and the
         apparatus has quietly taught that the ground decided.
         ⚠ The lean is applied to the real state at once; only the
         RESOLUTION waits, so nothing is ever drawn that the model does not
         hold. ⚠ And the wait is not passed through _dur(): a wait is not
         movement. */
      if (this.st.phase === 'teeter' && next.phase === 'settled') {
        this.st = { unit: next.unit, lo: next.lo, hi: next.hi, at: next.at,
          phase: 'teeter', rest: null, tilt: next.tilt };
        this._paint(GEO.T_TILT);
        this._snd(GEO.SND_TILT);
        window.setTimeout(function () {
          self.st = next;
          self._paint(GEO.T_SETTLE);
          self._snd(GEO.SND_SETTLE, true);
          self.api.announce(self._fmt(self.api.t('saidSettled'), { n: next.at, d: next.rest }));
        }, GEO.T_BEAT);
        return;
      }
      this.st = next;
      this._paint(GEO.T_TILT);
      this._snd(GEO.SND_TILT);
      api.announce(dir === 0
        ? api.t(this.onRidge(next, next.at) ? 'saidTiltClear' : 'saidTiltClearOff')
        : this._fmt(api.t('saidTiltSet'), { d: dir > 0 ? next.hi : next.lo }));
    },

    _again: function () {
      this._deal();
      this._paint(GEO.T_ARRIVE);
      this._snd(GEO.SND_SET);
      this.api.announce(this._fmt(this.api.t('saidSet'), { n: this.st.at }));
    },

    _refuse: function (why) {
      var api = this.api, self = this, a = this._arena, s = this.st;
      this._snd(GEO.SND_REFUSE);
      if (a) {
        a.classList.add('is-refuse');
        window.setTimeout(function () { a.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (why === 'low') { api.announce(this._fmt(api.t('saidEdge'), { n: s.lo })); return; }
      if (why === 'high') { api.announce(this._fmt(api.t('saidEdge'), { n: s.hi })); return; }
      /* ⚠ letting go of a stone that is ALREADY teetering is the press a
         child makes most, because the apparatus has visibly stopped — and
         it was answered with "already at rest", the exact opposite of
         what is on screen, at the one moment the tool is about. */
      if (why === 'teeter') { api.announce(this._fmt(api.t('saidTeeter'), { n: s.at })); return; }
      /* ⚠ and a no-op press on the ridge control is about the RIDGE, not
         about the stone. */
      if (why === 'tilt') { api.announce(api.t(s.tilt === 0 ? 'saidAlreadyLevel' : 'saidAlreadySet')); return; }
      api.announce(api.t('saidAlready'));
    },

    /* ---- painting -------------------------------------------------- */

    _paint: function (dur) {
      var api = this.api, s = this.st;
      /* ⚠⚠ THE TEETER WAS BAKED INTO THE STYLESHEET AT injectCSS(), so
         _dur() could never reach it — the ONE motion path deaf to reduced
         motion was the one the whole lesson lives in. It is a custom
         property now, set from _dur() like every other duration. */
      if (this._wrap) this._wrap.style.setProperty('--rnh-teet', this._dur(GEO.T_TEETER) + 'ms');
      var d = this._dur(dur || GEO.T_ARRIVE);

      /* the ground path, sampled from heightAt — the SAME function the
         model rounds with, so a stone can never be drawn on a slope that
         runs the other way */
      var pts = [], i, N = 80;
      for (i = 0; i <= N; i++) {
        var v = s.lo + (s.hi - s.lo) * (i / N);
        pts.push((i / N * 1000).toFixed(1) + ',' + this.groundY(s, v).toFixed(1));
      }
      this._ground.setAttribute('d', 'M0,' + GEO.VB_H + ' L' + pts.join(' L') + ' L1000,' + GEO.VB_H + ' Z');

      var shown = (s.phase === 'settled' && s.rest !== null) ? s.rest : s.at;
      this._stone.style.transitionDuration = d + 'ms';
      this._stone.style.left = (this.frac(s, shown) * 100) + '%';
      /* ⚠ SITS ON the ground line, from the same function that drew it */
      this._stone.style.bottom = (this.groundUp(s, shown) * 100).toFixed(2) + '%';
      this._stone.style.transitionTimingFunction =
        (s.phase === 'settled' ? GEO.E_ROLL : 'cubic-bezier(.34,.06,.2,1)');
      this._stone.textContent = String(s.at);
      /* ⚠ it announced s.at while the stone is DRAWN at s.rest — a 47
         resting in the 50 dip said "at 47". The label now describes
         where the thing actually is, which is what a label is for. */
      this._stone.setAttribute('aria-label', this._fmt(
        api.t(s.phase === 'settled' ? 'ariaStoneRest' : 'ariaStone'),
        { n: s.at, d: s.rest }));
      this._stone.classList.toggle('is-teeter', s.phase === 'teeter');
      this._stone.classList.toggle('is-rest', s.phase === 'settled');

      /* ⭐ THE RULE IS DRAWN ON THE RIDGE ITSELF, and nowhere else. No
         chip, no label, no word — the ground simply leans from now on. */
      this._ridgeEl.style.transitionDuration = this._dur(GEO.T_TILT) + 'ms';
      this._ridgeEl.style.transform = 'translateX(-50%) rotate(' + (s.tilt * GEO.TILT_DEG) + 'deg)';
      this._ridgeEl.classList.toggle('is-set', s.tilt !== 0);
      this._ridgeEl.setAttribute('aria-label', api.t(s.tilt === 0 ? 'ariaRidge' : 'ariaTilt'));

      if (this._svgEl) this._svgEl.setAttribute('aria-label', api.t('ariaGround'));
      this._marks[0].textContent = String(s.lo);
      this._marks[1].textContent = String(s.hi);

      this._btn.lb.classList.toggle('is-off', !this.move(null, -this.bigStep()));
      this._btn.l1.classList.toggle('is-off', !this.move(null, -this.step()));
      this._btn.r1.classList.toggle('is-off', !this.move(null, this.step()));
      this._btn.rb.classList.toggle('is-off', !this.move(null, this.bigStep()));
      this._btn.go.classList.toggle('is-off', s.phase !== 'held');
      this._btn.td.classList.toggle('is-on', s.tilt === -1);
      this._btn.tu.classList.toggle('is-on', s.tilt === 1);
      this._btn.tc.classList.toggle('is-off', s.tilt === 0);
      this._btn.print.classList.toggle('is-paid', !!this.premium);
    },

    /* ================= entitlement ================================== */

    _checkEntitlement: function () {
      var self = this;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var t = j.tier || (j.entitlement && j.entitlement.tier);
            if (!t) return;
            self.premium = t !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) { /* ⚠ degrade to the FREE TIER, never to nothing */ }
    },

    _gate: function () {
      var api = this.api, self = this;
      if (this._gateEl && this._gateEl.parentNode) return;
      var g = api.el('div', 'rnh-gate is-on');
      var box = api.el('div', 'rnh-gate-box');
      var h = api.el('h2', 'rnh-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'rnh-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'rnh-gate-cta'); a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'rnh-gate-x'); c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
    },

    /* ================= the paper ground ============================= */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('rnh-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('rnh-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('rnh-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i, k;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'rnh-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'rnh-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      for (i = 0; i < 3; i++) {
        var row = api.el('div', 'rnh-p-ground');
        for (k = 0; k < 2; k++) {
          var dip = api.el('span', 'rnh-p-dip');
          dip.style.left = (k * 100) + '%';
          row.appendChild(dip);
        }
        var rg = api.el('span', 'rnh-p-ridge');
        row.appendChild(rg);
        s.appendChild(row);
      }
    }
  };

  function injectCSS() {
    var css = ''
      + 'html.rnh-scroll{overflow-y:auto;}'
      + 'body.rnh-scroll{overflow-y:auto;}'

      + '.rnh-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.rnh-card{container-type:inline-size;width:100%;max-width:880px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(14px,3cqw,30px);--rnh-st:clamp(38px,7cqw,64px);}'

      + '.rnh-arena{position:relative;width:100%;aspect-ratio:1000/300;}'
      + '.rnh-field{position:absolute;top:0;bottom:0;left:calc(var(--rnh-st)/2);right:calc(var(--rnh-st)/2);}'
      /* ⚠ the refusal signal was 1.08:1 — invisible. The outline carries
         it instead, at coral's shadow, 5.28:1. */
      + '.rnh-arena.is-refuse .rnh-ground{stroke:#A34122;stroke-width:5;}'
      + '.rnh-svg{position:absolute;inset:0;width:100%;height:100%;display:block;}'
      /* ⚠ #EFE2C9 and #EBD9BC were NOT in the locked palette. */
      + '.rnh-ground{fill:#F6EAD3;stroke:#146B5E;stroke-width:3;vector-effect:non-scaling-stroke;}'

      /* the ridge: level until the class settles it, then it LEANS, and
         that lean is the only record of the rule anywhere on screen */
      /* ⚠ it pivoted 12% INSIDE the hillside; the foot now sits on the
         crest, so the lean is about the point the stone rests on */
      + '.rnh-ridge{position:absolute;left:50%;top:20%;width:5px;height:17%;'
      + 'transform:translateX(-50%);transform-origin:50% 100%;border-radius:3px;'
      /* ⚠⚠ IT WAS 1.06:1 AGAINST THE HILLSIDE — the one thing this tool is
         about, invisible until the class had already acted on it. Teal is
         5.78:1 on the working surface. */
      + 'background-color:#146B5E;'
      + 'transition-property:transform,background-color;transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.rnh-ridge.is-set{background-color:#F2784B;box-shadow:0 0 0 1.5px #A34122;}'

      /* ⚠ translateY(50%) would centre the stone ON the ground line, i.e.
         half buried. It stands on it. */
      + '.rnh-stone{position:absolute;transform:translateX(-50%);margin-bottom:2px;'
      + 'min-width:var(--rnh-st);height:var(--rnh-st);padding:0 6px;border-radius:50%;'
      + 'border:2.5px solid #146B5E;background-color:#FBF3E4;color:#0E5147;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
      + 'font-size:calc(var(--rnh-st) * .46);line-height:1;'
      + 'transition-property:left,bottom;transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.rnh-stone:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.rnh-stone.is-rest{border-color:#0D4E44;border-width:3.5px;}'
      /* ⚠⚠ THE TEETER IS AN INFINITE LOOP, NOT A TIMEOUT. A wobble that
         ended by itself would mean the machine decided. */
      /* ⚠⚠ transform-origin AT THE FOOT. Rotating a CIRCLE about its own
         centre moves not one pixel of its outline — only the numeral
         turned, so the teeter was invisible as motion. Pivoting at the
         contact point makes it rock. */
      + '.rnh-stone.is-teeter{transform-origin:50% 100%;'
      + 'animation:rnh-teeter var(--rnh-teet) ease-in-out infinite;}'
      + '@keyframes rnh-teeter{0%,100%{transform:translateX(-50%) rotate(-' + GEO.TEETER_DEG + 'deg);}'
      + '50%{transform:translateX(-50%) rotate(' + GEO.TEETER_DEG + 'deg);}}'

      + '.rnh-mark{position:absolute;bottom:2%;font-family:"Baloo 2",system-ui,sans-serif;'
      + 'font-weight:700;color:#0E5147;font-size:calc(var(--rnh-st) * .42);line-height:1;}'
      + '.rnh-mark-a{left:1%;}'
      + '.rnh-mark-b{right:1%;}'

      + '.rnh-bar{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.rnh-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;font-weight:600;line-height:1;}'
      + '.rnh-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.rnh-btn.is-off{opacity:.42;}'
      + '.rnh-btn.is-on{background-color:#146B5E;color:#FBF3E4;}'
      + '.rnh-b-print{border-style:dashed;margin-left:10px;}'
      + '.rnh-b-print.is-paid{border-style:solid;}'

      + '.rnh-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.rnh-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.rnh-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.rnh-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.rnh-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.rnh-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.rnh-sheet{display:none;}'
      + '@media print{'
      + 'body.rnh-printing *{visibility:hidden;}'
      + 'body.rnh-printing .rnh-sheet,body.rnh-printing .rnh-sheet *{visibility:visible;}'
      + 'body.rnh-printing .rnh-wrap>.rnh-card,body.rnh-printing .rnh-bar{display:none !important;}'
      + 'body.rnh-printing .rnh-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.rnh-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.rnh-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.rnh-p-ground{position:relative;height:30mm;width:170mm;margin:0 0 12mm;'
      + 'border-bottom:1pt solid #000;}'
      + '.rnh-p-dip{position:absolute;bottom:0;width:1pt;height:6mm;margin-left:-0.5pt;background-color:#000;}'
      + '.rnh-p-ridge{position:absolute;left:50%;bottom:0;width:0;height:26mm;margin-left:-0.5pt;'
      + 'border-left:1pt dashed #000;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-rnh', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.RoundingHill = RoundingHill;
  if (typeof module !== 'undefined' && module.exports) module.exports = RoundingHill;
}());
