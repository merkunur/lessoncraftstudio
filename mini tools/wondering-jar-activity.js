/* =====================================================================
   THE WONDERING JAR — ACTIVITY  (wondering-jar-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.B.5 — count to answer "how many?" up to 20 (line/array/circle),
   ≤10 scattered. A wondering owl loves to guess jars. The child commits a
   WISH on a 0-20 line (honored, never graded), the jar SPREADS its sweets, and
   the child counts each DISTINCT one to FIND OUT — then witnesses wish-vs-truth.

   Three stages (estimate → count → compare), the platform's first predict-then-
   check loop. The graded spine is the one-to-one COUNT (re-tap inert; the
   number word speaks only on a genuine new tag — count-a-stable-set, NOT a
   conveyor). The estimate is honored-never-graded; the compare narrates
   DIRECTION only (same/fewer/more), no distance number.

   Seven distinct acts by (arrangement|judgment): line · scatter · array ·
   circle · relational(slider off a reference) · predict-comparison(binary) ·
   compare-two(which-more, two full counts). Validity DERIVED by
   mini tools/estimate-jar-core.js. The slider reuses LCS.drag.linear (shell).
   Owl/jar/sweets = SVG STUB placeholders for CA5. No timer/score/streak. 0
   lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.EstimateJarCore;
  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOLD: '#E8A53A' };
  var HUES = ['#F2784B', '#2E9C88', '#E8A53A', '#E96AA0', '#7C6FE0'];
  var HUES2 = ['#D9572F', '#146B5E', '#C8841F', '#C84B83', '#5B4FC0'];
  var LANG = 'en';

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function candySVG(i, counted) {
    var a = HUES[i % HUES.length], b = HUES2[i % HUES2.length];
    return '<svg viewBox="0 0 100 100" class="wj-candy-svg" aria-hidden="true">'
      + '<circle cx="50" cy="50" r="40" fill="' + b + '"/>'
      + '<circle cx="50" cy="50" r="32" fill="' + a + '"/>'
      + '<ellipse cx="40" cy="38" rx="12" ry="8" fill="#fff" opacity="0.4"/>'
      + (counted ? '<path d="M30 52 l12 12 l26 -28" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' : '')
      + '</svg>';
  }
  var _jarUid = 0;
  // map a count to a perceptible-but-not-exact fill level (the "sense how full"
  // cue) — n=7→0.43, n=10→0.60, n=12→0.71 (clearly different, none countable).
  function fillFor(n) { return 0.32 + Math.max(0, Math.min(1, (n - 5) / 10)) * 0.56; }
  var JAR_BODY = 'M26 24 Q50 18 74 24 L72 96 Q50 104 28 96 Z';
  // clumped: a fill-level of densely-OVERLAPPING blobs (uncountable) CLIPPED to
  // the glass body so they never overflow. `fill`∈[0,1] sets the pile height.
  function jarSVG(clumped, fill) {
    if (fill == null) fill = 0.5;
    var id = 'jc' + (++_jarUid), sweets = '';
    if (clumped) {
      var topY = 94 - Math.max(0.25, Math.min(0.92, fill)) * 66, seed = Math.round(fill * 131) + 7;
      function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      for (var y = 92; y > topY; y -= 8) {
        for (var x = 30; x <= 70; x += 9) {
          var jx = (rnd() - 0.5) * 8, jy = (rnd() - 0.5) * 7;
          sweets += '<circle cx="' + (x + jx).toFixed(1) + '" cy="' + (y + jy).toFixed(1) + '" r="8" fill="' + HUES[Math.floor(rnd() * HUES.length)] + '" opacity="0.95"/>';
        }
      }
    }
    return '<svg viewBox="0 0 100 110" class="wj-jar-svg" role="img" aria-label="jar">'
      + (clumped ? '<defs><clipPath id="' + id + '"><path d="' + JAR_BODY + '"/></clipPath></defs>' : '')
      + '<rect x="30" y="14" width="40" height="8" rx="4" fill="#C99A5B"/>'
      + '<path d="' + JAR_BODY + '" fill="rgba(180,220,210,.45)" stroke="rgba(20,107,94,.35)" stroke-width="2.5"/>'
      + (clumped ? '<g clip-path="url(#' + id + ')">' + sweets + '</g>' : '')
      + (clumped ? '<ellipse cx="42" cy="34" rx="16" ry="9" fill="#fff" opacity="0.28"/><circle cx="50" cy="60" r="30" fill="#FFF6C8" opacity="0.16"/>' : '')
      + '</svg>';
  }
  function owlSVG(mood) {
    var happy = mood === 'happy', wow = mood === 'wow';
    var eyes = wow
      ? '<circle cx="40" cy="46" r="9" fill="#fff"/><circle cx="60" cy="46" r="9" fill="#fff"/><circle cx="40" cy="46" r="4.5" fill="#2A2A35"/><circle cx="60" cy="46" r="4.5" fill="#2A2A35"/>'
      : '<circle cx="40" cy="46" r="8" fill="#fff"/><circle cx="60" cy="46" r="8" fill="#fff"/><circle cx="40" cy="46" r="3.6" fill="#2A2A35"/><circle cx="60" cy="46" r="3.6" fill="#2A2A35"/>';
    var beak = happy || wow ? '<path d="M46 56 q4 7 8 0 Z" fill="#E8A53A"/>' : '<path d="M47 55 l3 6 l3 -6 Z" fill="#E8A53A"/>';
    return '<svg class="wj-owl-svg" viewBox="0 0 100 100" role="img" aria-label="owl">'
      + '<path d="M22 30 L34 16 L40 30 Z" fill="#9B7BD4"/><path d="M78 30 L66 16 L60 30 Z" fill="#9B7BD4"/>'
      + '<ellipse cx="50" cy="56" rx="30" ry="30" fill="#B89AE0"/><ellipse cx="50" cy="60" rx="20" ry="22" fill="#E7DBF7"/>'
      + eyes + beak + '</svg>';
  }

  global.WonderingJarActivity = {
    id: 'wondering-jar-activity',
    reward: { id: 'wish-wall', label: 'Wish Wall', emoji: '🫙' },

    strings: {
      title: { en: 'The Wondering Jar', de: 'Eulchens Rätselglas' },
      prompt: { en: 'Guess how many — then count to find out!', de: 'Schätz mal, wie viele – dann zähl nach!' },
      estimateHint: { en: 'How many do you think? Slide your wish, then lock it.', de: 'Wie viele sind es wohl? Schieb deinen Wunsch hin und halt ihn fest.' },
      estimateRefHint: { en: 'This jar had {n}. How many in the new one?', de: 'In diesem Glas waren {n}. Wie viele sind wohl im neuen?' },
      binaryHint: { en: 'More or fewer than {n}? Take a guess!', de: 'Mehr oder weniger als {n}? Schätz mal!' },
      whichHint: { en: 'Which jar has more — A or B?', de: 'In welchem Glas sind mehr – A oder B?' },
      countHint: { en: 'Tap each sweet to count them, one by one.', de: 'Tippe jedes Bonbon an und zähl eins nach dem anderen.' },
      countAHint: { en: 'Count jar A — tap each sweet.', de: 'Zähl Glas A – tippe jedes Bonbon an.' },
      countBHint: { en: 'Now count jar B — tap each sweet.', de: 'Jetzt zähl Glas B – tippe jedes Bonbon an.' },
      compareHint: { en: 'Let\'s see how many there really were!', de: 'Mal sehen, wie viele es wirklich waren!' },
      lock: { en: 'Lock my wish 🌟', de: 'Mein Wunsch steht 🌟' },
      moreBtn: { en: 'More', de: 'Mehr' },
      fewerBtn: { en: 'Fewer', de: 'Weniger' },
      jarABtn: { en: 'Jar A', de: 'Glas A' },
      jarBBtn: { en: 'Jar B', de: 'Glas B' },
      wish: { en: 'Wish', de: 'Wunsch' },
      counted: { en: 'Counted', de: 'Gezählt' },
      revealSlider: { en: 'You wondered {g} — it was {a}!', de: 'Dein Wunsch war {g} – es waren {a}!' },
      dirSame: { en: 'Just what you thought! 🎉', de: 'Genau wie gedacht! 🎉' },
      dirMore: { en: 'More than you thought — jars surprise us!', de: 'Mehr als gedacht – Gläser überraschen uns!' },
      dirFewer: { en: 'Fewer than you thought — now we know!', de: 'Weniger als gedacht – jetzt wissen wir\'s!' },
      revealWhich: { en: 'Jar A had {a}, Jar B had {b}.', de: 'In Glas A waren {a}, in Glas B waren {b}.' },
      whichMore: { en: 'Jar {j} had more!', de: 'In Glas {j} waren mehr!' },
      whichSame: { en: 'They had the same — twins!', de: 'Gleich viele – wie Zwillinge!' },
      win: { en: 'Now we know! 🦉', de: 'Jetzt wissen wir\'s! 🦉' },
      hintCheck: { en: 'Make a wish, count the jar, then see!', de: 'Wünsch dir was, zähl das Glas, dann schau!' },
      jarN: { en: 'Jar {n}', de: 'Glas {n}' },
      vsLabel: { en: 'vs', de: 'gegen' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.stage = 'estimate'; this.guess = 5; this.prediction = null;
      this.cstate = null; this.cstateA = null; this.jarPhase = 'A'; this.solved = false; this.solvedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.stage = 'estimate'; this.guess = 5; this.prediction = null; this.solved = false;
      this.cstate = Core.newState(round); this._scatter = null; this._scatterA = null;
      this.jarPhase = 'A';
      this.cstateA = (round.type === 'compare-two') ? Core.newState({ items: round.jarA }) : null;
      if (this.cstateA) this.cstateA.stage = 'count';   // the reference jar is counted directly (its own wish was the which-more pick)
    },

    _target: function () { return this.round.items.length; },
    _estimateMode: function () { return this.round.judgment === 'binary' ? 'binary' : this.round.judgment === 'which-more' ? 'which' : 'slider'; },
    announce: function (t) { if (this.api.announce) this.api.announce(t); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'wj-wrap'); var root = api.el('div', 'wj-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var head = api.el('div', 'wj-head');
      var ow = api.el('div', 'wj-owl'); ow.innerHTML = owlSVG(this.stage === 'compare' ? 'wow' : this.solved ? 'happy' : 'idle'); head.appendChild(ow);
      var say = api.el('div', 'wj-say'); say.textContent = this._hint(); head.appendChild(say);
      root.appendChild(head);

      if (this.stage === 'done') this._renderDone(root);
      else if (this.stage === 'compare') this._renderCompare(root);
      else if (this.stage === 'count') this._renderCount(root);
      else this._renderEstimate(root);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (this.stage === 'estimate' && this._estimateMode() === 'slider') this._wireSlider();
    },
    _hint: function () {
      var r = this.round, api = this.api;
      if (this.stage === 'compare') return api.t('compareHint');
      if (this.stage === 'count') { if (r.type === 'compare-two') return api.t(this.jarPhase === 'A' ? 'countAHint' : 'countBHint'); return api.t('countHint'); }
      var m = this._estimateMode();
      if (m === 'binary') return api.t('binaryHint').replace('{n}', r.reference.count);
      if (m === 'which') return api.t('whichHint');
      if (r.reference) return api.t('estimateRefHint').replace('{n}', r.reference.count);
      return api.t('estimateHint');
    },

    /* ----- STAGE 1: ESTIMATE (jar | wish control) ----- */
    _renderEstimate: function (root) {
      var self = this, api = this.api, r = this.round, mode = this._estimateMode();
      var main = api.el('div', 'wj-main');
      // LEFT: the clumped jar(s)
      var jars = api.el('div', 'wj-jars');
      if (mode === 'which') {
        jars.appendChild(this._jarChip('A', true, fillFor(r.jarA.length)));   // A and B differ in fullness — the perceptual cue
        jars.appendChild(this._jarChip('B', true, fillFor(r.items.length)));
      } else if (r.reference) {
        jars.appendChild(this._jarChip('A', true, fillFor(r.reference.count), r.reference.count));   // the anchor: ~refCount full + its number
        jars.appendChild(this._jarChip(mode === 'binary' ? 'B' : '', true, fillFor(r.items.length)));
      } else {
        var j = api.el('div', 'wj-jar'); j.innerHTML = jarSVG(true, fillFor(r.items.length)); jars.appendChild(j);
      }
      main.appendChild(jars);
      // RIGHT: the wish control
      var side = api.el('div', 'wj-side');
      if (mode === 'slider') {
        side.appendChild(this._sliderEl());
        var lock = api.el('button', 'wj-lock'); lock.type = 'button'; lock.textContent = api.t('lock');
        lock.addEventListener('click', function () { self._lock(self.guess); }); side.appendChild(lock);
      } else if (mode === 'binary') {
        var bm = api.el('button', 'wj-pick'); bm.type = 'button'; bm.textContent = api.t('moreBtn');
        bm.addEventListener('click', function () { self.prediction = 'more'; self._lock(null); });
        var bf = api.el('button', 'wj-pick'); bf.type = 'button'; bf.textContent = api.t('fewerBtn');
        bf.addEventListener('click', function () { self.prediction = 'fewer'; self._lock(null); });
        side.appendChild(bm); side.appendChild(bf);
      } else { // which-more
        var wa = api.el('button', 'wj-pick'); wa.type = 'button'; wa.textContent = api.t('jarABtn');
        wa.addEventListener('click', function () { self.prediction = 'A'; self._lock(null); });
        var wb = api.el('button', 'wj-pick'); wb.type = 'button'; wb.textContent = api.t('jarBBtn');
        wb.addEventListener('click', function () { self.prediction = 'B'; self._lock(null); });
        side.appendChild(wa); side.appendChild(wb);
      }
      main.appendChild(side); root.appendChild(main);
    },
    _jarChip: function (label, clumped, fill, num) {
      var api = this.api, box = api.el('div', 'wj-jarchip');
      var j = api.el('div', 'wj-jar wj-jar-sm'); j.innerHTML = jarSVG(clumped, fill); box.appendChild(j);
      var cap = api.el('div', 'wj-jarcap');
      cap.textContent = (num != null) ? (label + ': ' + num) : label ? api.t('jarN').replace('{n}', label) : '';
      box.appendChild(cap); return box;
    },
    _sliderEl: function () {
      var api = this.api, box = api.el('div', 'wj-slider');
      var pill = api.el('div', 'wj-pill'); pill.textContent = this.guess; this._pillEl = pill; box.appendChild(pill);
      var area = api.el('div', 'wj-line-area'); this._lineArea = area;
      var track = api.el('div', 'wj-track'); this._trackEl = track;
      var max = 20;
      var svg = ['<svg class="wj-line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">', '<line class="wj-axis" x1="0" y1="40" x2="1000" y2="40"/>'];
      for (var i = 0; i <= max; i++) {
        var major = (i % 5 === 0), bench = (i === 5 || i === 10 || i === 20);
        if (!major) continue;
        var x = (i / max) * 1000;
        svg.push('<line class="wj-tick' + (bench ? ' bench' : '') + '" x1="' + x + '" y1="' + (bench ? 18 : 26) + '" x2="' + x + '" y2="54"/>');
        svg.push('<text class="wj-lbl" x="' + Math.max(12, Math.min(988, x)) + '" y="74" text-anchor="middle">' + i + '</text>');
      }
      svg.push('</svg>');
      track.innerHTML = svg.join('');
      var thumb = api.el('button', 'wj-thumb'); thumb.type = 'button'; thumb.setAttribute('role', 'slider');
      thumb.setAttribute('aria-valuemin', '0'); thumb.setAttribute('aria-valuemax', '20'); thumb.setAttribute('aria-valuenow', String(this.guess)); thumb.setAttribute('aria-label', api.t('wish'));
      thumb.innerHTML = '⭐'; thumb.style.left = (this.guess / 20 * 100) + '%'; this._thumbEl = thumb;
      track.appendChild(thumb); area.appendChild(track); box.appendChild(area);
      return box;
    },
    _wireSlider: function () {
      var self = this, track = this._trackEl;
      if (!track || !global.LCS || !global.LCS.drag || !global.LCS.drag.linear) {
        // fallback: tap-on-track sets value (keeps the activity usable without the shared helper)
        if (track) track.addEventListener('pointerdown', function (e) { var r = track.getBoundingClientRect(); self._setGuess(self._pxToValue(e.clientX, r)); });
      } else {
        global.LCS.drag.linear(track, { min: 0, max: 20, step: 1, valueFromPointer: function (cx, rect) { return self._pxToValue(cx, rect); }, onChange: function (v) { self._setGuess(v); } });
      }
      if (this._thumbEl) this._thumbEl.addEventListener('keydown', function (e) {
        var k = e.key, g = self.guess;
        if (k === 'ArrowLeft' || k === 'ArrowDown') g--; else if (k === 'ArrowRight' || k === 'ArrowUp') g++;
        else if (k === 'Home') g = 0; else if (k === 'End') g = 20; else if (k === 'Enter') { self._lock(self.guess); return; } else return;
        e.preventDefault(); self._setGuess(g);
      });
    },
    _pxToValue: function (px, rect) { if (!rect.width) return this.guess; var pct = Math.max(0, Math.min(1, (px - rect.left) / rect.width)); return Math.round(pct * 20); },
    _setGuess: function (v) {
      v = Math.max(0, Math.min(20, Math.round(v))); if (v === this.guess && this._pillEl) return;
      this.guess = v; this.api.sound && this.api.sound(v > 0 ? 560 + v * 8 : 520);
      if (this._pillEl) this._pillEl.textContent = v;
      if (this._thumbEl) { this._thumbEl.style.left = (v / 20 * 100) + '%'; this._thumbEl.setAttribute('aria-valuenow', String(v)); }
      var b = this.round.benchmarks || [5, 10, 20]; if (b.indexOf(v) >= 0) speak(v);
    },
    _lock: function (v) {
      if (v != null) Core.lockGuess(this.round, this.cstate, v); else { this.cstate.guess = (this.prediction || ''); this.cstate.stage = 'count'; }
      this.stage = 'count'; this.api.sound && this.api.sound(720); this.render();
    },

    /* ----- STAGE 2: COUNT (spread items | readout) ----- */
    _renderCount: function (root) {
      var self = this, api = this.api, r = this.round, two = (r.type === 'compare-two');
      var main = api.el('div', 'wj-main');
      var items = (two && this.jarPhase === 'A') ? r.jarA : r.items;
      var state = (two && this.jarPhase === 'A') ? this.cstateA : this.cstate;
      var arr = r.arrangement, n = items.length;
      var spread = api.el('div', 'wj-spread'); spread.setAttribute('data-arr', arr);
      if (arr === 'array') spread.style.gridTemplateColumns = 'repeat(' + (r.cols || 4) + ',auto)';
      if (arr === 'scatter') { var sc = (two && this.jarPhase === 'A') ? (this._scatterA || (this._scatterA = this._scatterPositions(n))) : (this._scatter || (this._scatter = this._scatterPositions(n))); }
      for (var i = 0; i < n; i++) {
        var done = !!state.counted[i];
        var it = api.el('button', 'wj-item' + (done ? ' wj-done' : '')); it.type = 'button'; it.innerHTML = candySVG(i, done);
        if (arr === 'scatter') { var p = sc[i]; it.style.position = 'absolute'; it.style.left = p.x + '%'; it.style.top = p.y + '%'; it.style.transform = 'translate(-50%,-50%)'; }
        else if (arr === 'circle') { var ang = -90 + i * 360 / n, rad = ang * Math.PI / 180; it.style.position = 'absolute'; it.style.left = (50 + 40 * Math.cos(rad)) + '%'; it.style.top = (50 + 40 * Math.sin(rad)) + '%'; it.style.transform = 'translate(-50%,-50%)'; if (i === 0) it.classList.add('wj-start'); }
        (function (idx) { it.addEventListener('click', function () { self._tapItem(idx); }); })(i);
        spread.appendChild(it);
      }
      main.appendChild(spread);
      var side = api.el('div', 'wj-side');
      if (two) { var ph = api.el('div', 'wj-phase'); ph.textContent = api.t('jarN').replace('{n}', this.jarPhase); side.appendChild(ph); }
      side.appendChild(this._readout(Core.countOf(state)));
      main.appendChild(side); root.appendChild(main);
    },
    // grid-jitter: a loose scattered grid with per-cell jitter — reads as a
    // disordered pile but is NON-OVERLAPPING by construction (each item owns a
    // cell ≥ its size + a small jitter), so the count is finger-robust at every
    // viewport (the strict probe rejects overlapping tap targets).
    _scatterPositions: function (n) {
      var cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n / cols), pts = [], seed = n * 9301 + 49297;
      function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      var cw = 100 / cols, ch = 100 / rows;
      for (var i = 0; i < n; i++) {
        var c = i % cols, r = Math.floor(i / cols);
        var jx = (rnd() - 0.5) * cw * 0.34, jy = (rnd() - 0.5) * ch * 0.34;
        pts.push({ x: cw * (c + 0.5) + jx, y: ch * (r + 0.5) + jy });
      }
      return pts;
    },
    _tapItem: function (i) {
      var r = this.round, two = (r.type === 'compare-two');
      var shimRound = (two && this.jarPhase === 'A') ? { items: r.jarA } : r;
      var state = (two && this.jarPhase === 'A') ? this.cstateA : this.cstate;
      var res = Core.countItem(shimRound, state, i);
      if (!res.changed) return;                                   // re-tag inert (the conveyor guard)
      this.api.sound && this.api.sound(540 + res.count * 10); speak(res.count);
      if (two && this.jarPhase === 'A' && Core.validate({ items: r.jarA }, this.cstateA)) { this.jarPhase = 'B'; this.api.sound && this.api.sound(700); this.render(); return; }
      if (this.cstate.stage === 'compare') { this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 7); this.stage = 'compare'; this.render(); this.announce(this.api.t('win')); return; }
      this.render();
    },

    /* ----- STAGE 3: COMPARE / REVEAL ----- */
    _renderCompare: function (root) {
      var api = this.api, r = this.round, actual = this._target();
      var box = api.el('div', 'wj-compare');
      if (r.type === 'compare-two') {
        var a = r.jarA.length, b = actual;
        var nums = api.el('div', 'wj-twonums'); nums.innerHTML = '<span class="wj-num">A<b>' + a + '</b></span><span class="wj-vs">' + api.t('vsLabel') + '</span><span class="wj-num">B<b>' + b + '</b></span>';
        box.appendChild(nums);
        var verdict = api.el('div', 'wj-verdict'); verdict.textContent = (a === b) ? api.t('whichSame') : api.t('whichMore').replace('{j}', a > b ? 'A' : 'B'); box.appendChild(verdict);
      } else if (r.judgment === 'binary') {
        var ref = r.reference.count;
        var nums2 = api.el('div', 'wj-twonums'); nums2.innerHTML = '<span class="wj-num">A<b>' + ref + '</b></span><span class="wj-vs">' + api.t('vsLabel') + '</span><span class="wj-num">B<b>' + actual + '</b></span>';
        box.appendChild(nums2);
        var dir = Core.compareDir(ref, actual); // actual relative to A
        var v2 = api.el('div', 'wj-verdict'); v2.textContent = api.t(dir === 'same' ? 'dirSame' : dir === 'more' ? 'dirMore' : 'dirFewer'); box.appendChild(v2);
      } else {
        // slider rounds: the wish-pin + actual-star on the line
        box.appendChild(this._compareLine(this.guess, actual));
        var reveal = api.el('div', 'wj-reveal'); reveal.textContent = api.t('revealSlider').replace('{g}', this.guess).replace('{a}', actual); box.appendChild(reveal);
        var d = Core.compareDir(this.guess, actual);
        var vb = api.el('div', 'wj-verdict'); vb.textContent = api.t(d === 'same' ? 'dirSame' : d === 'more' ? 'dirMore' : 'dirFewer'); box.appendChild(vb);
      }
      root.appendChild(box);
    },
    _compareLine: function (guess, actual) {
      var api = this.api, box = api.el('div', 'wj-cmpline');
      var track = api.el('div', 'wj-track wj-track-cmp');
      track.innerHTML = '<svg class="wj-line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><line class="wj-axis" x1="0" y1="40" x2="1000" y2="40"/>'
        + '<line class="wj-tick bench" x1="250" y1="18" x2="250" y2="54"/><line class="wj-tick bench" x1="500" y1="18" x2="500" y2="54"/><line class="wj-tick bench" x1="1000" y1="18" x2="1000" y2="54"/></svg>';
      var pin = api.el('div', 'wj-wishpin'); pin.style.left = (guess / 20 * 100) + '%'; pin.innerHTML = '⭐'; pin.title = api.t('wish'); track.appendChild(pin);
      var star = api.el('div', 'wj-actualstar'); star.style.left = (actual / 20 * 100) + '%'; star.innerHTML = '<b>' + actual + '</b>'; track.appendChild(star);
      box.appendChild(track); return box;
    },

    _readout: function (val) {
      var api = this.api, row = api.el('div', 'wj-readout');
      var lab = api.el('span', 'wj-readout-lab'); lab.textContent = api.t('counted');
      var num = api.el('span', 'wj-readout-num'); num.textContent = val; num.setAttribute('aria-live', 'polite');
      row.appendChild(lab); row.appendChild(num); return row;
    },

    _renderDone: function (root) {
      var api = this.api;
      var jar = api.el('div', 'wj-donejar'); jar.innerHTML = jarSVG(false); root.appendChild(jar);
      var wall = api.el('div', 'wj-wall');
      for (var i = 0; i < ((this._pool && this._pool.length) || 7); i++) { var s = api.el('span', 'wj-shelf' + (i < this.solvedCount ? ' wj-shelf-on' : '')); s.textContent = '🫙'; wall.appendChild(s); }
      root.appendChild(wall);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/wondering-jar-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[wondering-jar] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.wj-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.wj-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(7px,1.8vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.wj-head{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;width:100%;}'
        + '.wj-owl{width:clamp(42px,10vw,54px);flex:0 0 auto;}.wj-owl-svg{width:100%;height:auto;display:block;}'
        + '.wj-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:78%;}'
        + '.wj-main{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,12px);width:100%;}'
        + '.wj-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '@media (min-width:768px){.wj-main{flex-direction:row;align-items:center;justify-content:center;gap:24px;}.wj-side{width:auto;flex:0 0 auto;}}'
        /* jars */
        + '.wj-jars{display:flex;gap:14px;justify-content:center;align-items:flex-end;}'
        + '.wj-jar{width:clamp(80px,22vw,116px);}.wj-jar-sm{width:clamp(58px,16vw,78px);}.wj-jar-svg{width:100%;height:auto;display:block;filter:drop-shadow(0 4px 6px rgba(20,107,94,.15));}'
        + '.wj-jarchip{display:flex;flex-direction:column;align-items:center;gap:3px;}'
        + '.wj-jarcap{font:800 clamp(12px,3vw,15px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* slider */
        + '.wj-slider{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:320px;}'
        + '.wj-pill{min-width:46px;text-align:center;font:800 clamp(20px,6vw,28px)/1 "Baloo 2",sans-serif;color:#fff;background:' + C.CORAL + ';border-radius:13px;padding:3px 14px;box-shadow:0 3px 0 ' + C.CORAL2 + ';}'
        + '.wj-line-area{width:100%;padding:6px 0;}'
        + '.wj-track{position:relative;width:100%;height:54px;margin:0 22px;width:calc(100% - 44px);touch-action:none;}'
        + '.wj-line{width:100%;height:54px;display:block;overflow:visible;}'
        + '.wj-axis{stroke:rgba(20,107,94,.3);stroke-width:5;stroke-linecap:round;}'
        + '.wj-tick{stroke:rgba(20,107,94,.35);stroke-width:4;}.wj-tick.bench{stroke:' + C.CORAL + ';stroke-width:6;}'
        + '.wj-lbl{fill:' + C.T + ';font:800 30px "Baloo 2",sans-serif;}'
        + '.wj-thumb{position:absolute;top:27px;transform:translate(-50%,-50%);width:46px;height:46px;border:0;background:transparent;font-size:34px;line-height:1;cursor:grab;padding:0;touch-action:none;}'
        + '.wj-thumb:active{cursor:grabbing;}'
        + '.wj-lock{min-height:48px;padding:0 clamp(18px,5.5vw,30px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.wj-lock:active{transform:translateY(2px);}'
        + '.wj-pick{min-height:50px;min-width:120px;padding:0 clamp(16px,5vw,26px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.wj-pick:active{transform:translateY(2px);}'
        /* count spread */
        + '.wj-spread{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);justify-content:center;align-items:center;width:100%;max-width:320px;}'
        + '.wj-spread[data-arr="array"]{display:grid;gap:clamp(5px,1.6vw,9px);justify-content:center;}'
        + '.wj-spread[data-arr="scatter"]{position:relative;width:100%;max-width:280px;height:clamp(150px,40vw,186px);display:block;}'
        + '.wj-spread[data-arr="circle"]{position:relative;width:min(100%,200px);aspect-ratio:1/1;max-height:200px;margin:0 auto;display:block;}'
        + '.wj-item{position:relative;width:clamp(44px,11vw,52px);height:clamp(44px,11vw,52px);border:0;background:transparent;padding:0;cursor:pointer;touch-action:manipulation;transition:transform .12s;}'
        + '.wj-item:active{transform:scale(.9);}.wj-candy-svg{width:100%;height:100%;display:block;}'
        + '.wj-spread[data-arr="circle"] .wj-item{width:clamp(42px,10vw,46px);height:clamp(42px,10vw,46px);}'   /* slightly smaller on the ring so adjacent centers exceed item size (no overlap) */
        + '.wj-done{opacity:.5;}.wj-start::after{content:"▶";position:absolute;left:-11px;top:50%;transform:translateY(-50%);color:' + C.CORAL + ';font-size:12px;}'
        + '.wj-phase{font:800 clamp(14px,3.6vw,17px)/1 "Baloo 2",sans-serif;color:' + C.CORAL + ';}'
        + '.wj-readout{display:inline-flex;align-items:center;gap:7px;background:#EAF2EE;border-radius:13px;padding:4px 12px;}'
        + '.wj-readout-lab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.wj-readout-num{min-width:26px;text-align:center;font:800 clamp(20px,5.5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* compare */
        + '.wj-compare{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
        + '.wj-cmpline{width:100%;max-width:340px;padding:24px 0 6px;}'
        + '.wj-track-cmp{height:54px;position:relative;}'
        + '.wj-wishpin{position:absolute;top:-18px;transform:translateX(-50%);font-size:26px;}'
        + '.wj-actualstar{position:absolute;top:30px;transform:translateX(-50%);background:' + C.T + ';color:#fff;border-radius:11px;min-width:30px;text-align:center;padding:2px 7px;font:800 16px "Baloo 2",sans-serif;}'
        + '.wj-reveal{font:800 clamp(16px,4.4vw,22px)/1.15 "Baloo 2",sans-serif;color:' + C.T + ';text-align:center;}'
        + '.wj-verdict{font:700 clamp(13px,3.4vw,16px)/1.2 "Nunito",sans-serif;color:' + C.CORAL2 + ';text-align:center;}'
        + '.wj-twonums{display:flex;align-items:center;gap:14px;}'
        + '.wj-num{display:flex;flex-direction:column;align-items:center;font:800 clamp(13px,3.4vw,16px)/1.1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.wj-num b{font-size:clamp(34px,10vw,48px);color:' + C.CORAL + ';}.wj-vs{font:700 14px "Nunito",sans-serif;color:#9a8f78;}'
        /* done */
        + '.wj-donejar{width:clamp(70px,20vw,100px);animation:wjBob 1.2s ease-in-out infinite;}.wj-donejar .wj-jar-svg{width:100%;height:auto;}'
        + '@keyframes wjBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}'
        + '.wj-wall{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;}'
        + '.wj-shelf{font-size:clamp(13px,3vw,17px);filter:grayscale(1) opacity(.4);}.wj-shelf-on{filter:none;}'
        + '.wj-item:focus-visible,.wj-thumb:focus-visible,.wj-lock:focus-visible,.wj-pick:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* short viewports */
        + '@media (max-height:820px),(max-width:480px){.wj-root{gap:4px;padding:7px;}.wj-owl{width:clamp(38px,8vw,46px);}.wj-jar{width:clamp(66px,18vw,92px);}.wj-spread[data-arr="scatter"]{height:clamp(150px,42vw,180px);}.wj-spread[data-arr="circle"]{width:min(100%,182px);max-height:182px;}.wj-item{width:44px;height:44px;}.wj-lock,.wj-pick{min-height:44px;}}'
        /* tiniest viewport (≤660px tall = 320×640): collapse the absolute scatter/circle to a wrapped row so they fit + never overlap (the necklace sub-floor precedent; the literal ring/scatter is a CA5 art beat). */
        + '@media (max-height:660px){.wj-root{gap:3px;}.wj-main{gap:5px;}.wj-side{gap:4px;}.wj-jar{width:clamp(46px,13vw,60px);}.wj-cmpline{padding-top:20px;}'
        + '.wj-slider{gap:3px;}.wj-line-area{padding:2px 0;}.wj-track{height:46px;}.wj-line{height:46px;}.wj-thumb{top:23px;width:44px;height:44px;font-size:30px;}.wj-lock{min-height:44px;}.wj-pill{font-size:18px;padding:2px 10px;}'
        + '.wj-spread[data-arr="scatter"],.wj-spread[data-arr="circle"]{position:static!important;width:100%!important;height:auto!important;max-height:none!important;aspect-ratio:auto!important;display:flex;flex-wrap:wrap;gap:5px;justify-content:center;}'
        + '.wj-spread[data-arr="scatter"] .wj-item,.wj-spread[data-arr="circle"] .wj-item{position:static!important;left:auto!important;top:auto!important;transform:none!important;}.wj-item{width:44px;height:44px;}}'
        + '@media (prefers-reduced-motion: reduce){.wj-donejar{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-wonderingjar', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'wondering-jar.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
