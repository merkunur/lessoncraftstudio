/* =====================================================================
   PLACE VALUE — REGROUP CORE  (place-value-regroup-core.js)
   ---------------------------------------------------------------------
   CCSS 1.NBT.C.4 — add within 100, COMPOSE A TEN ("…sometimes it is
   necessary to compose a ten"). The first DEFERRED PRODUCTION-CORE after the
   game-designs catalog-walk. A NEW clean-sibling DOM manipulative engine —
   0 lines to the protected place-value-core (E12 "represent N") / any of the
   5 protected cores / lcs-shell.{js,css} / game-shell.*.

   MECHANIC — "bundle ten ones into a ten." A round (e.g. 27 + 5) renders as
   base-ten blocks: tens(a) ten-rods + (ones(a)+b) unit-cubes (always ≥10, the
   b ones tinted "just arrived"). The child taps "Make a ten" → 10 ones bundle
   into 1 ten-rod (onesCount−=10, tensCount+=1). Then the shell number-keypad:
   the child reads the regrouped blocks and types the total. Tuck the hamster
   tucks the bundle.

   DERIVED, NEVER STORED — a round stores only {a,b}. The sum, decomposition,
   start-state counts, and "needs a compose" are all derived. gradeAnswer()
   carries the grade (answer===a+b AND bundled) so the regroup is load-bearing
   AND the predicate is testable without DOM.

   CONFIG-READY — setupTask honors {operation:'add'|'subtract', places:2|3} so
   the 2.NBT.B.7 fast-follow (decompose-a-ten / 3-digit) rides this same core.
   v1 ships add / 2-place only.
   ===================================================================== */
(function (global) {
  'use strict';

  var C = { TEN: '#146B5E', TENlite: '#2E8C7E', ONE: '#F2784B', ONEnew: '#F9B38E', RIM: '#0F4A40', TX: '#0F4A40', PAPER: '#FFFDF6' };

  /* ---- pure helpers (no DOM; the build-gate calls these) ---- */
  function onesOf(n) { return ((n % 10) + 10) % 10; }
  function tensOf(n, places) { return places === 3 ? Math.floor((n % 100) / 10) : Math.floor(n / 10); }
  function hundredsOf(n) { return Math.floor(n / 100); }
  function sumOf(round) { return round.a + round.b; }
  function startOnes(round) { return onesOf(round.a) + round.b; }      /* ones after b arrives, pre-bundle (≥10 for a compose round) */
  function needsCompose(round) { return startOnes(round) >= 10; }
  function decompose(n, places) {
    places = places || 2;
    return places === 3
      ? { hundreds: hundredsOf(n), tens: Math.floor((n % 100) / 10), ones: onesOf(n) }
      : { tens: Math.floor(n / 10), ones: onesOf(n) };
  }
  /* THE GRADE: correct total AND the ten has been composed (ones<10). Typing
     the right total without bundling first is rejected — the compose action is
     load-bearing. Pure → the verify gate tests it directly. */
  function gradeAnswer(round, answer, onesCount) {
    return answer === sumOf(round) && onesCount < 10;
  }
  /* ---- subtraction (2.NBT.B.7 decompose-a-ten) pure helpers ---- */
  function diffOf(round) { return round.a - round.b; }
  function needsBorrow(round) { return onesOf(round.a) < round.b; }   /* ones short → must break a ten */
  /* THE SUBTRACT GRADE: correct difference AND the ten has been broken
     (decomposed). Typing the answer without breaking is rejected — the
     decompose action is load-bearing. Pure → the verify gate tests it. */
  function gradeSubtract(round, answer, decomposed) {
    return answer === diffOf(round) && decomposed === true;
  }
  /* THE ADD-HUNDRED GRADE: correct total AND the hundred has been composed
     (tens<10). The compose-a-hundred action is load-bearing. */
  function gradeAddHundred(round, answer, tensCount) {
    return answer === sumOf(round) && tensCount < 10;
  }

  global.PlaceValueRegroupCore = {

    strings: {
      title:       { en: "Tuck's Ten Bundles" },
      instruction: { en: 'Tap “Make a ten” to bundle 10 ones, then type the total.' },
      colHundreds: { en: 'hundreds' },
      colTens:     { en: 'tens' },
      colOnes:     { en: 'ones' },
      makeTen:     { en: '🔁 Make a ten' },
      makeHundred: { en: '🔁 Make a hundred' },
      breakTen:    { en: '🔁 Break a ten' },
      breakHundred:{ en: '🔁 Break a hundred' },
      hintBundleFirst: { en: 'First tap “Make a ten” to bundle 10 ones!' },
      hintMakeHundredFirst: { en: 'First tap “Make a hundred” to bundle 10 tens!' },
      hintBreakFirst:  { en: 'Break a ten first — there aren’t enough ones to take away.' },
      hintBreakHundredFirst: { en: 'No tens to break — tap “Break a hundred” first.' },
      hintBreakTenNext: { en: 'Now tap “Break a ten” to get enough ones.' },
      hintReadTotal:   { en: 'Now count the blocks and type the total.' },
      srMat:       { en: '{t} tens and {o} ones' }
    },

    /* ---- state + setup ---- */
    init: function (api) {
      this.api = api;
      this.a = 0; this.b = 0; this.operation = 'add'; this.places = 2;
      this.tensCount = 0; this.onesCount = 0; this.hundredsCount = 0;
      this._newOnes = 0;        /* how many trailing ones are the "just arrived" b */
      this.readOnly = false; this._bundled = false; this._target = 0;
    },

    /* opts = { a, b, operation:'add', places:2 }. Sets numeric state only —
       render() (shell-driven) draws. Node-safe (no DOM here). */
    setupTask: function (opts) {
      opts = opts || {};
      this.a = opts.a || 0; this.b = opts.b || 0;
      this.operation = opts.operation || 'add';
      this.places = opts.places || 2;
      this.readOnly = false; this._bundled = false; this._decomposed = false; this._brokeHundred = false;
      this._newOnes = 0; this._newTens = 0; this._toRemove = 0; this._fatTens = false;
      if (this.operation === 'subtract') {
        /* start state = the minuend's own decomposition; the child breaks a ten
           (or, when tens=0, breaks a hundred first → then a ten). */
        var d = decompose(this.a, this.places);
        this.hundredsCount = d.hundreds || 0;
        this.tensCount = d.tens;
        this.onesCount = d.ones;
        this._target = diffOf({ a: this.a, b: this.b });
        this._toRemove = this.b;              /* ones to "take away" (marked after the break) */
      } else {
        this._target = sumOf({ a: this.a, b: this.b });
        this.hundredsCount = this.places === 3 ? hundredsOf(this.a) : 0;
        if (this.places === 3 && this.b > 0 && this.b % 10 === 0) {
          /* compose-a-hundred: b (a multiple of 10) adds to the TENS column */
          this.tensCount = tensOf(this.a, this.places) + this.b / 10;
          this.onesCount = onesOf(this.a);
          this._newTens = this.b / 10;
          this._fatTens = true;               /* the tens column is the busy one */
        } else {
          /* compose-a-ten: b adds to the ONES column (the b ones are "new") */
          this.tensCount = tensOf(this.a, this.places);
          this.onesCount = onesOf(this.a) + this.b;
          this._newOnes = this.b;
        }
      }
    },

    /* the bundle action — 10 ones become 1 ten. The ONLY ones-reducer. */
    makeTen: function () {
      if (this.readOnly || this.onesCount < 10) return;
      this.onesCount -= 10;
      this.tensCount += 1;
      this._newOnes = 0;
      this._bundled = true;
      if (this.api && this.api.sound) this.api.sound(660);
      this.render();
    },

    /* the borrow action — 1 ten becomes 10 ones. The subtract counterpart of
       makeTen; fires once per round (when the ones are short). */
    breakTen: function () {
      if (this.readOnly || this._decomposed || this.tensCount < 1) return;
      this.tensCount -= 1;
      this.onesCount += 10;
      this._decomposed = true;
      if (this.api && this.api.sound) this.api.sound(660);
      this.render();
    },

    /* compose-a-hundred — 10 tens become 1 hundred-flat (the add counterpart at
       the tens→hundreds level). */
    makeHundred: function () {
      if (this.readOnly || this.tensCount < 10) return;
      this.tensCount -= 10;
      this.hundredsCount += 1;
      this._newTens = 0;
      this._bundled = true;
      if (this.api && this.api.sound) this.api.sound(560);
      this.render();
    },

    /* decompose-a-hundred — 1 hundred becomes 10 tens (step 1 of the double
       borrow, only when there are no tens to break and ones are short). */
    breakHundred: function () {
      if (this.readOnly || this._decomposed || this.tensCount >= 1 || this.hundredsCount < 1) return;
      this.hundredsCount -= 1;
      this.tensCount += 10;
      this._brokeHundred = true;
      if (this.api && this.api.sound) this.api.sound(560);
      this.render();
    },

    /* called by the activity's check on a correct answer — lock + caption */
    lockAndCaption: function () {
      this.readOnly = true;
      this.render();
      var sub = this.operation === 'subtract';
      var stage = this.api && this.api.stage;
      var wrap = stage && stage.querySelector('.pvr-cap');
      if (wrap) wrap.textContent = this.a + (sub ? ' − ' : ' + ') + this.b + ' = ' + this._target;
      if (global.LCSAudio && global.LCSAudio.speak) {
        try { global.LCSAudio.speak({ type: 'number', text: this.a + (sub ? ' minus ' : ' plus ') + this.b + ' makes ' + this._target, lang: 'en', rate: 0.95 }); } catch (e) { }
      }
    },

    /* ---- render: build the mat inside api.stage ---- */
    render: function () {
      this.injectCSS();
      var api = this.api; if (!api || !api.stage) return;
      var self = this, stage = api.stage;
      stage.innerHTML = '';
      var root = this._el('div', 'pvr-root' + (this._fatTens ? ' fat-tens' : ''));

      var sub = this.operation === 'subtract';
      var mat = this._el('div', 'pvr-mat');
      if (this.places === 3) mat.appendChild(this._column('hundreds'));
      mat.appendChild(this._column('tens'));
      mat.appendChild(this._column('ones'));
      root.appendChild(mat);

      /* ONE compact action row: Tuck + (regroup button | result caption).
         Collapsing the mascot/caption into the action row is fold-critical —
         the shell keypad below is ~190px, so the stage must stay short. */
      var bar = this._el('div', 'pvr-bar');
      var tuck = this._el('div', 'pvr-tuck'); tuck.setAttribute('data-pose', this.readOnly ? 'happy' : 'idle'); tuck.innerHTML = this._tuckSVG();
      bar.appendChild(tuck);
      var btnKey = null, btnAct = null;
      if (!this.readOnly) {
        if (sub) {
          if (this.onesCount < this.b) {           /* ones short → break (a hundred first if no tens, else a ten) */
            if (this.tensCount < 1) { btnKey = 'breakHundred'; btnAct = function () { self.breakHundred(); }; }
            else { btnKey = 'breakTen'; btnAct = function () { self.breakTen(); }; }
          }
        } else {
          if (this.tensCount >= 10) { btnKey = 'makeHundred'; btnAct = function () { self.makeHundred(); }; }
          else if (this.onesCount >= 10) { btnKey = 'makeTen'; btnAct = function () { self.makeTen(); }; }
        }
      }
      if (btnKey) {
        var btn = this._el('button', 'pvr-maketen'); btn.type = 'button';
        btn.textContent = this._t(btnKey);
        btn.addEventListener('click', btnAct);
        bar.appendChild(btn);
      } else {
        bar.appendChild(this._el('div', 'pvr-cap'));   /* empty between action + resolve; filled on resolve */
      }
      root.appendChild(bar);

      root.appendChild(this._srMirror());
      stage.appendChild(root);
      if (api.announce) api.announce(this._t('srMat').replace('{t}', this.tensCount).replace('{o}', this.onesCount));
    },

    _column: function (which) {
      var col = this._el('div', 'pvr-col pvr-col-' + which);
      var blocks = this._el('div', 'pvr-blocks');
      var i, n, key;
      if (which === 'hundreds') {
        for (i = 0; i < this.hundredsCount; i++) blocks.appendChild(this._flat());
        n = this.hundredsCount; key = 'colHundreds';
      } else if (which === 'tens') {
        for (i = 0; i < this.tensCount; i++) {
          var isNewT = !this.readOnly && !this._bundled && this._newTens && (i >= this.tensCount - this._newTens);
          blocks.appendChild(this._rod(isNewT));
        }
        n = this.tensCount; key = 'colTens';
      } else {
        var sub = this.operation === 'subtract';
        for (var j = 0; j < this.onesCount; j++) {
          var isNew = !sub && !this.readOnly && !this._bundled && (j >= this.onesCount - this._newOnes);
          /* subtract: after the break, mark the last _toRemove ones "take away" */
          var take = sub && this._decomposed && (j >= this.onesCount - this._toRemove);
          blocks.appendChild(this._cube(isNew, take));
        }
        n = this.onesCount; key = 'colOnes';
      }
      var label = this._el('div', 'pvr-col-label');
      label.textContent = this._t(key) + ' (' + n + ')';
      col.append(blocks, label);
      return col;
    },

    _flat: function () {
      /* a hundred = a 10×10 flat (teal square + faint grid) */
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('class', 'pvr-flat'); svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true');
      var r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', '1'); r.setAttribute('y', '1'); r.setAttribute('width', '22'); r.setAttribute('height', '22');
      r.setAttribute('rx', '2'); r.setAttribute('fill', C.TEN); r.setAttribute('stroke', C.RIM); r.setAttribute('stroke-width', '1.5');
      svg.appendChild(r);
      for (var k = 1; k < 10; k++) {
        var v = document.createElementNS(ns, 'line');
        v.setAttribute('x1', String(1 + k * 2.2)); v.setAttribute('x2', String(1 + k * 2.2)); v.setAttribute('y1', '1'); v.setAttribute('y2', '23');
        v.setAttribute('stroke', C.PAPER); v.setAttribute('stroke-width', '0.7'); v.setAttribute('opacity', '0.78'); svg.appendChild(v);
        var h = document.createElementNS(ns, 'line');
        h.setAttribute('y1', String(1 + k * 2.2)); h.setAttribute('y2', String(1 + k * 2.2)); h.setAttribute('x1', '1'); h.setAttribute('x2', '23');
        h.setAttribute('stroke', C.PAPER); h.setAttribute('stroke-width', '0.7'); h.setAttribute('opacity', '0.78'); svg.appendChild(h);
      }
      return svg;
    },

    _rod: function (isNew) {
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('class', 'pvr-rod' + (isNew ? ' is-newten' : '')); svg.setAttribute('viewBox', '0 0 16 64'); svg.setAttribute('aria-hidden', 'true');
      var r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', '1'); r.setAttribute('y', '1'); r.setAttribute('width', '14'); r.setAttribute('height', '62');
      r.setAttribute('rx', '2.5'); r.setAttribute('fill', C.TEN); r.setAttribute('stroke', C.RIM); r.setAttribute('stroke-width', '1.5');
      svg.appendChild(r);
      for (var k = 1; k < 10; k++) {   /* 10 unit-notches → "this is ten ones" */
        var ln = document.createElementNS(ns, 'line');
        ln.setAttribute('x1', '1'); ln.setAttribute('x2', '15'); ln.setAttribute('y1', String(1 + k * 6.2)); ln.setAttribute('y2', String(1 + k * 6.2));
        ln.setAttribute('stroke', C.PAPER); ln.setAttribute('stroke-width', '1.3'); ln.setAttribute('opacity', '0.95');
        svg.appendChild(ln);
      }
      return svg;
    },

    _cube: function (isNew, take) {
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('class', 'pvr-cube' + (isNew ? ' is-new' : '') + (take ? ' is-take' : '')); svg.setAttribute('viewBox', '0 0 16 16'); svg.setAttribute('aria-hidden', 'true');
      var r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', '1'); r.setAttribute('y', '1'); r.setAttribute('width', '14'); r.setAttribute('height', '14');
      r.setAttribute('rx', '2.5'); r.setAttribute('fill', isNew ? C.ONEnew : C.ONE); r.setAttribute('stroke', C.RIM); r.setAttribute('stroke-width', '1.4');
      svg.appendChild(r);
      if (take) {   /* "take away" ✕ overlay */
        ['M4 4 L12 12', 'M12 4 L4 12'].forEach(function (dd) {
          var p = document.createElementNS(ns, 'path'); p.setAttribute('d', dd); p.setAttribute('stroke', C.RIM); p.setAttribute('stroke-width', '2.3'); p.setAttribute('stroke-linecap', 'round'); svg.appendChild(p);
        });
      }
      return svg;
    },

    _tuckSVG: function () {
      /* Tuck — a round golden hamster with full cheek-pouches (the bundler) */
      return '<svg class="pvr-tuck-svg" viewBox="0 0 50 44" width="40" height="35" aria-hidden="true">' +
        '<circle cx="13" cy="13" r="5" fill="#E7B86A" stroke="#B98A3C" stroke-width="1.4"/>' +
        '<circle cx="35" cy="13" r="5" fill="#E7B86A" stroke="#B98A3C" stroke-width="1.4"/>' +   /* ears */
        '<ellipse cx="24" cy="26" rx="16" ry="14" fill="#F0CE8C" stroke="#B98A3C" stroke-width="1.6"/>' +
        '<ellipse cx="12" cy="30" rx="6" ry="5.5" fill="#F7E0AE"/><ellipse cx="36" cy="30" rx="6" ry="5.5" fill="#F7E0AE"/>' +   /* full cheek-pouches */
        '<g class="pvr-eyes-open"><circle cx="19" cy="24" r="2" fill="#2B2B2B"/><circle cx="29" cy="24" r="2" fill="#2B2B2B"/></g>' +
        '<g class="pvr-eyes-happy"><path d="M17 24 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M27 24 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
        '<circle cx="24" cy="29" r="2.2" fill="#C76B53"/>' +
        '<path d="M24 31 v2.5 M24 33 q-3.5 1 -6 0 M24 33 q3.5 1 6 0" stroke="#B98A3C" stroke-width="1" fill="none"/></svg>';
    },

    _srMirror: function () {
      var wrap = this._el('div', 'pvr-sronly'); wrap.setAttribute('aria-live', 'polite');
      wrap.innerHTML = '<p>' + this.a + (this.operation === 'subtract' ? ' minus ' : ' plus ') + this.b + '. ' + this._t('srMat').replace('{t}', this.tensCount).replace('{o}', this.onesCount) + '.</p>';
      return wrap;
    },

    reset: function () { this.setupTask({ a: this.a, b: this.b, operation: this.operation, places: this.places }); this.render(); },

    /* ---- helpers ---- */
    _el: function (tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; },
    _t: function (key) {
      var loc = (this.api && this.api.locale) || 'en';
      var s = this.strings[key];
      return (s && (s[loc] || s.en)) || key;
    },

    _cssInjected: false,
    injectCSS: function () {
      if (this._cssInjected || typeof document === 'undefined') return;
      this._cssInjected = true;
      var css = ''
        + '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}'
        + '.pvr-root{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:min(96vw,440px);margin:0 auto;}'
        + '.pvr-mat{display:flex;gap:8px;width:100%;justify-content:center;align-items:flex-end;}'
        + '.pvr-col{flex:1 1 0;min-width:0;max-width:188px;background:#FFFDF6;border:3px solid #146B5E;border-radius:12px;padding:5px 6px 3px;display:flex;flex-direction:column;align-items:center;gap:3px;}'
        + '.pvr-col-ones{flex:1.4 1 0;border-color:#F2784B;}'   /* ones holds the most blocks (12 after a regroup) → widest column by default */
        + '.pvr-root.fat-tens .pvr-col-ones{flex:1 1 0;}'      /* compose-a-hundred: the TENS column is the busy one (≤13 rods) */
        + '.pvr-root.fat-tens .pvr-col-tens{flex:1.9 1 0;}'   /* wide enough for ≤13 thin rods on one row */
        + '.pvr-blocks{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-items:flex-end;min-height:48px;}'
        + '.pvr-col-hundreds .pvr-blocks{flex-wrap:wrap;}'   /* flats WRAP within the column — compose-a-hundred reaches 5 flats and the fat-tens layout squeezes this column, so nowrap spilled them outside the box */
        + '.pvr-col-ones .pvr-blocks{max-width:160px;}'   /* wrap 12 ones into 2 short rows */
        + '.pvr-rod{width:14px;height:36px;display:block;}'
        + '.pvr-flat{width:28px;height:28px;display:block;}'   /* the hundred reads bigger than a one; ≤4 flats still fit the desktop column */
        + '.pvr-cube{width:15px;height:15px;display:block;}'
        + '.pvr-cube.is-new{filter:drop-shadow(0 0 2px #F2784B);}'
        + '.pvr-rod.is-newten{filter:drop-shadow(0 0 2px #146B5E);}'
        + '.pvr-cube.is-take{opacity:.5;}'   /* "take away" ones (the bolder ✕ overlay is drawn in the svg) */
        + '.pvr-col-label{font:800 .8rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#0F4A40;}'
        + '.pvr-col-ones .pvr-col-label{color:#C2410C;}'
        + '.pvr-bar{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;min-height:36px;}'   /* the button has its own min-height:44 (tap) when present; the bar only reserves 36 so the button-absent broken/resolved states reclaim ~8px of fold */
        + '.pvr-tuck{flex:0 0 auto;line-height:0;}'
        + '.pvr-maketen{border:0;border-radius:999px;background:#F2784B;color:#fff;font:800 .96rem/1 "Baloo 2",Nunito,sans-serif;padding:11px 18px;min-height:44px;cursor:pointer;box-shadow:0 2px 0 #C2410C;}'
        + '.pvr-cap{font:800 1.05rem/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;min-height:1.1em;}'
        + '.pvr-tuck-svg .pvr-eyes-happy{display:none;}.pvr-tuck[data-pose=happy] .pvr-eyes-open{display:none;}.pvr-tuck[data-pose=happy] .pvr-eyes-happy{display:block;}'
        + '.pvr-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
        + '@media (max-width:380px){.pvr-root{gap:2px;}.pvr-col{padding:3px 4px 2px;max-width:140px;gap:1px;}.pvr-mat{gap:6px;}'
        +   '.pvr-rod{height:20px;width:7px;}.pvr-flat{width:16px;height:16px;}.pvr-cube{width:11px;height:11px;}.pvr-blocks{gap:2px;min-height:20px;}.pvr-col-ones .pvr-blocks{max-width:96px;}.pvr-col-tens .pvr-blocks{gap:1px;}'   /* thin rods + tight tens gap → ≤13 tens fit ONE row in the fat column; 7 cubes/row → ones 2 rows */
        +   '.pvr-col-label{font-size:.72rem;}.pvr-bar{gap:6px;}.pvr-maketen{padding:10px 12px;font-size:.85rem;}.pvr-cap{font-size:.95rem;}}';
      var tag = document.createElement('style');
      tag.setAttribute('data-pvr-core', '');
      tag.textContent = css;
      document.head.appendChild(tag);
    },

    /* pure helpers exposed for the build-gate */
    sumOf: sumOf, startOnes: startOnes, needsCompose: needsCompose,
    decompose: decompose, gradeAnswer: gradeAnswer, onesOf: onesOf, tensOf: tensOf, hundredsOf: hundredsOf,
    diffOf: diffOf, needsBorrow: needsBorrow, gradeSubtract: gradeSubtract, gradeAddHundred: gradeAddHundred
  };

}(typeof window !== 'undefined' ? window : this));
