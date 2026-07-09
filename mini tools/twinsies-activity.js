/* =====================================================================
   TWINSIES — ACTIVITY  (twinsies-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.B.5 — count "how many?" + count out that many. The Twin-Sprite
   made something and wants a TWIN with the same MANY (not the same picture).
   (0) COUNT the model — tap each object (✓ + tick + TTS); when all caught,
   COMMIT the count (gates stage 1); on cover rounds the model HIDES (peek to
   re-check). (1) BUILD the twin on a NEUTRAL plate (a different shape, so only
   the NUMBER bridges) one tap at a time; tap "We're twins!" to DECLARE. Win
   on the declare — NO live auto-match. A wrong declare is BINARY + undirected
   ("not twins yet — count again"): NO direction/count revealed.

   Validity DERIVED by mini tools/count-twin-core.js. answerType:'state'. Two
   stages via internal state. Acorns/Twin-Sprite = SVG STUB placeholders for
   CA5. No timer/score/streak. 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CountTwinCore;
  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOLD: '#E8A53A' };
  var LANG = 'en';

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function acornHTML() { return '<svg viewBox="0 0 100 100" class="tw-acorn-svg" aria-hidden="true"><ellipse cx="50" cy="60" rx="30" ry="32" fill="#B5713C"/><path d="M22 40 Q50 16 78 40 Q70 48 50 48 Q30 48 22 40 Z" fill="#7A4A28"/><rect x="47" y="16" width="6" height="10" rx="3" fill="#5C3A22"/><ellipse cx="40" cy="56" rx="7" ry="10" fill="#fff" opacity="0.18"/></svg>'; }
  function spriteSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy ? '<path d="M36 46 q5 -5 10 0 M54 46 q5 -5 10 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>' : '<circle cx="41" cy="47" r="3.4" fill="#2A2A35"/><circle cx="59" cy="47" r="3.4" fill="#2A2A35"/>';
    var mouth = happy ? '<path d="M42 58 q8 9 16 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>' : '<path d="M45 58 q5 4 10 0" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    return '<svg class="tw-sprite-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'lutin jumeau' : LANG === 'de' ? 'Zwillings-Wicht' : 'Twin-Sprite') + '"><ellipse cx="50" cy="54" rx="30" ry="30" fill="#9ED2C6"/><ellipse cx="30" cy="32" rx="7" ry="10" fill="#9ED2C6"/><ellipse cx="70" cy="32" rx="7" ry="10" fill="#9ED2C6"/>' + eyes + mouth + '</svg>'; }

  global.TwinsiesActivity = {
    id: 'twinsies-activity',
    reward: { id: 'friendship-shelf', label: 'Friendship Shelf', emoji: '🫶' },

    strings: {
      title: { en: 'Twinsies', de: 'Zwillinge — gleich viele!', fr: 'Les jumeaux — autant l’un que l’autre !' },
      prompt: { en: 'Make a twin with the same many!', de: 'Bau einen Zwilling mit gleich vielen!', fr: 'Fais un jumeau avec autant !' },
      countHint: { en: 'Tap each one to count the Twin-Sprite\'s pile.', de: 'Tippe jede Eichel an und zähle den Haufen vom Zwillings-Wicht.', fr: 'Touche chaque gland pour compter le tas du lutin jumeau.' },
      buildHint: { en: 'Build a twin with the same number.', de: 'Bau einen Zwilling mit gleich vielen.', fr: 'Construis un jumeau avec le même nombre.' },
      numeralHint: { en: 'Count out this many on your plate.', de: 'Zähle so viele auf deinen Teller.', fr: 'Compte autant de glands sur ton assiette.' },
      countOnHint: { en: 'Almost a twin — add one more!', de: 'Fast ein Zwilling — leg noch eine dazu!', fr: 'Presque un jumeau — ajoute-en un !' },
      commit: { en: 'I counted {n} — build the twin! →', de: 'Ich habe {n} gezählt — bau den Zwilling! →', fr: 'J’ai compté {n} — construis le jumeau ! →' },
      peek: { en: '👀 Peek', de: '👀 Gucken', fr: '👀 Coup d’œil' },
      twinsBtn: { en: "We're twins!", de: 'Wir sind Zwillinge!', fr: 'On est jumeaux !' },
      win: { en: 'Twins! Same many!', de: 'Zwillinge! Gleich viele!', fr: 'Jumeaux ! Autant l’un que l’autre !' },
      notyet: { en: 'Not twins yet — let\'s count again.', de: 'Noch keine Zwillinge — zählen wir noch mal.', fr: 'Pas encore jumeaux — comptons encore.' },
      hintCheck: { en: 'Make a matching twin, then tap We\'re twins!', de: 'Bau einen passenden Zwilling und tippe dann auf „Wir sind Zwillinge!“', fr: 'Fais un jumeau identique, puis touche On est jumeaux !' },
      readCounted: { en: 'Counted', de: 'Gezählt', fr: 'Comptés' },
      readTwin: { en: 'Twin', de: 'Zwilling', fr: 'Jumeau' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.stage = 'count'; this.caught = {}; this.committed = false; this.placed = 0; this.solved = false;
      this.peekOpen = false; this.declareFail = false; this.solvedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.caught = {}; this.committed = false; this.placed = 0; this.solved = false; this.peekOpen = false; this.declareFail = false;
      this._scatter = null;
      if (round.source === 'numeral') { this.stage = 'build'; this.committed = true; }
      else { this.stage = 'count'; }
      if (round.type === 'count-on') { this.placed = round.countOnFrom || 0; }
    },

    _n: function () { return this.round.model.n; },
    _capacity: function () { return Core.capacityFor(this.round); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'tw-wrap'); var root = api.el('div', 'tw-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      // sprite + a one-line hint
      var head = api.el('div', 'tw-head');
      var sp = api.el('div', 'tw-sprite'); sp.innerHTML = spriteSVG(this.solved ? 'happy' : 'idle'); head.appendChild(sp);
      var say = api.el('div', 'tw-say'); say.textContent = this.solved ? api.t('win') : this._hint(); head.appendChild(say);
      root.appendChild(head);

      if (this.stage === 'done') this._renderDone(root);
      else if (this.stage === 'build') this._renderBuild(root);
      else this._renderCount(root);

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _hint: function () {
      var r = this.round, api = this.api;
      if (this.declareFail) return api.t('notyet');
      if (this.stage === 'count') return api.t('countHint');
      if (r.source === 'numeral') return api.t('numeralHint');
      if (r.type === 'count-on') return api.t('countOnHint');
      return api.t('buildHint');
    },

    /* ----- stage 0: COUNT THE MODEL (two columns on desktop: model | readout+commit) ----- */
    _renderCount: function (root) {
      var self = this, api = this.api, r = this.round, n = this._n();
      var main = api.el('div', 'tw-main');
      var box = api.el('div', 'tw-model'); box.setAttribute('data-arr', r.model.arrangement);
      if (r.model.arrangement === 'array') box.style.gridTemplateColumns = 'repeat(' + r.model.cols + ',auto)';
      if (r.model.arrangement === 'scattered') { if (!this._scatter) this._scatter = this._scatterPositions(n); }
      for (var i = 0; i < n; i++) {
        var o = api.el('button', 'tw-obj' + (this.caught[i] ? ' tw-caught' : '')); o.type = 'button'; o.innerHTML = acornHTML();
        if (this.caught[i]) { var ck = api.el('span', 'tw-check'); ck.textContent = '✓'; o.appendChild(ck); }
        if (r.model.arrangement === 'scattered') { var p = this._scatter[i]; o.style.position = 'absolute'; o.style.left = p.x + '%'; o.style.top = p.y + '%'; }
        (function (idx) { o.addEventListener('click', function () { self._catch(idx); }); })(i);
        box.appendChild(o);
      }
      main.appendChild(box);
      var side = api.el('div', 'tw-side');
      side.appendChild(this._readout(Object.keys(this.caught).length, 'caught'));
      if (Object.keys(this.caught).length === n) {
        var commit = api.el('button', 'tw-commit'); commit.type = 'button'; commit.textContent = api.t('commit').replace('{n}', n);
        commit.addEventListener('click', function () { self._commit(); });
        side.appendChild(commit);
      }
      main.appendChild(side); root.appendChild(main);
    },
    _scatterPositions: function (n) {
      // deterministic-ish non-overlapping scatter in a padded box (no Math.random dependency for stable layout)
      var pts = [], tries, ok, x, y, seed = n * 9301 + 49297;
      function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      for (var i = 0; i < n; i++) {
        tries = 0; do { x = 6 + rnd() * 76; y = 6 + rnd() * 70; ok = true; for (var j = 0; j < pts.length; j++) { if (Math.abs(pts[j].x - x) < 18 && Math.abs(pts[j].y - y) < 22) { ok = false; break; } } tries++; } while (!ok && tries < 60);
        pts.push({ x: x, y: y });
      }
      return pts;
    },
    _catch: function (i) {
      if (this.caught[i]) return;                       // Set-dedup: double-tap a no-op
      this.caught[i] = true; this.api.sound && this.api.sound(540); speak(Object.keys(this.caught).length); this.render();
    },
    _commit: function () {
      this.committed = true; this.stage = 'build';
      if (this.round.type !== 'count-on') this.placed = 0;
      this.peekOpen = false; this.api.sound && this.api.sound(700); this.render();
    },

    /* ----- stage 1: BUILD THE TWIN (two columns on desktop: plate | source+readout+declare) ----- */
    _renderBuild: function (root) {
      var self = this, api = this.api, r = this.round;
      var main = api.el('div', 'tw-main');
      // LEFT: the neutral build plate (always)
      var plate = api.el('div', 'tw-plate' + (r.buildFamily === 'track' ? ' tw-track' : ' tw-frame'));
      // render only the cells needed (whole rows of 5, always > N) — so teens (12) shows 3 clean rows, never a sheared 4th
      var cap = r.buildFamily === 'ten-frame' ? Math.min(20, Math.max(10, Math.ceil((this._n() + 1) / 5) * 5)) : this._capacity();
      for (var c = 0; c < cap; c++) {
        var cell = api.el('button', 'tw-cell' + (c < this.placed ? ' tw-filled' : '')); cell.type = 'button';
        if (c < this.placed) cell.innerHTML = acornHTML();
        (function (idx) { cell.addEventListener('click', function () { self._tapCell(idx); }); })(c);
        plate.appendChild(cell);
      }
      main.appendChild(plate);
      // RIGHT side: the SOURCE (numeral → numeral display; else a peek chip) + readout + declare
      var side = api.el('div', 'tw-side');
      if (r.source === 'numeral') { var num = api.el('div', 'tw-numeral'); num.textContent = this._n(); side.appendChild(num); }
      else {
        var ref = api.el('div', 'tw-ref');
        var chip = api.el('button', 'tw-peek'); chip.type = 'button'; chip.textContent = api.t('peek');
        chip.addEventListener('click', function () { self.peekOpen = !self.peekOpen; self.render(); });
        ref.appendChild(chip);
        if (this.peekOpen) ref.appendChild(this._peekModel());
        side.appendChild(ref);
      }
      side.appendChild(this._readout(this.placed, 'placed'));
      var twins = api.el('button', 'tw-declare' + (this.placed < 1 ? ' tw-off' : '')); twins.type = 'button'; twins.textContent = api.t('twinsBtn'); twins.disabled = this.placed < 1;
      if (this.placed >= 1) twins.addEventListener('click', function () { self._declare(); });
      side.appendChild(twins);
      main.appendChild(side); root.appendChild(main);
    },
    _peekModel: function () {
      var api = this.api, r = this.round, n = this._n(), box = api.el('div', 'tw-peekbox');
      for (var i = 0; i < n; i++) { var o = api.el('span', 'tw-peekobj'); o.innerHTML = acornHTML(); box.appendChild(o); }
      return box;
    },
    _tapCell: function (idx) {
      if (idx < this.placed) { this.placed = idx; }        // tap a filled cell → erase from here on (ticks down)
      else { this.placed = Math.min(this._capacity(), this.placed + 1); speak(this.placed); } // tap an empty cell → place ONE more
      this.declareFail = false; this.api.sound && this.api.sound(idx < this.placed ? 360 : 560); this.render();
    },

    _readout: function (val, kind) {
      var api = this.api, row = api.el('div', 'tw-readout');
      var lab = api.el('span', 'tw-readout-lab'); lab.textContent = api.t(kind === 'caught' ? 'readCounted' : 'readTwin');
      var num = api.el('span', 'tw-readout-num'); num.textContent = val; num.setAttribute('aria-live', 'polite');
      row.appendChild(lab); row.appendChild(num); return row;
    },

    _declare: function () {
      var self = this, api = this.api;
      var res = Core.feedback(this.round, this.placed);                 // BINARY — no direction
      if (res.twins) {
        this.solved = true; this.stage = 'done'; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 7);
        this.api.sound && this.api.sound(900); this.render();
        var n = this._n(); api.announce && api.announce(api.t('win')); speak(LANG === 'fr' ? (n + ' et ' + n + ' — jumeaux !') : LANG === 'de' ? (n + ' und ' + n + ' — Zwillinge!') : (n + ' and ' + n + ' — twins!'));
      } else {
        this.declareFail = true; this.api.sound && this.api.sound(330); this.render();
        api.announce && api.announce(api.t('notyet'));    // undirected — NO count, NO direction
      }
    },

    _renderDone: function (root) {
      var api = this.api;
      var thread = api.el('div', 'tw-thread'); thread.innerHTML = '<span class="tw-pair">' + acornHTML() + '</span><span class="tw-link"></span><span class="tw-pair">' + acornHTML() + '</span>'; root.appendChild(thread);
      var eq = api.el('div', 'tw-eq'); eq.textContent = (LANG === 'fr') ? (this._n() + ' & ' + this._n() + ' — jumeaux !') : (this._n() + ' & ' + this._n() + (LANG === 'de' ? ' — Zwillinge!' : ' — twins!')); root.appendChild(eq);
      var shelf = api.el('div', 'tw-shelf');
      for (var i = 0; i < ((this._pool && this._pool.length) || 7); i++) { var s = api.el('span', 'tw-pairdot' + (i < this.solvedCount ? ' tw-pairdot-on' : '')); s.textContent = '🫶'; shelf.appendChild(s); }
      root.appendChild(shelf);
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
      fetch('/mini-tools/twinsies-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[twinsies] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.tw-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.tw-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(7px,1.8vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* head */
        + '.tw-head{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;width:100%;}'
        + '.tw-sprite{width:clamp(40px,10vw,52px);flex:0 0 auto;}.tw-sprite-svg{width:100%;height:auto;display:block;}'
        + '.tw-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        /* main: primary surface + side controls — column on phone, two columns on desktop */
        + '.tw-main{display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);width:100%;}'
        + '.tw-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '@media (min-width:768px){.tw-main{flex-direction:row;align-items:center;justify-content:center;gap:22px;}.tw-side{width:auto;flex:0 0 auto;}}'
        /* model (count stage) */
        + '.tw-model{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);justify-content:center;align-items:center;width:100%;max-width:300px;}'
        + '.tw-model[data-arr="array"]{display:grid;gap:clamp(5px,1.6vw,9px);justify-content:center;}'
        + '.tw-model[data-arr="scattered"]{position:relative;height:clamp(150px,40vw,200px);display:block;}'
        + '.tw-obj{position:relative;width:clamp(40px,11vw,52px);height:clamp(40px,11vw,52px);border:0;background:transparent;padding:0;cursor:pointer;touch-action:manipulation;transition:transform .12s;}'
        + '.tw-obj:active{transform:scale(.9);}.tw-acorn-svg{width:100%;height:100%;display:block;}'
        + '.tw-caught{opacity:.4;}'
        + '.tw-check{position:absolute;top:-4px;right:-4px;width:20px;height:20px;border-radius:10px;background:' + C.T + ';color:#fff;font:800 13px/20px "Baloo 2",sans-serif;text-align:center;}'
        /* readout */
        + '.tw-readout{display:inline-flex;align-items:center;gap:7px;background:#EAF2EE;border-radius:13px;padding:4px 12px;}'
        + '.tw-readout-lab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.tw-readout-num{min-width:26px;text-align:center;font:800 clamp(20px,5.5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* commit */
        + '.tw-commit{min-height:46px;padding:0 clamp(16px,5vw,24px);border-radius:14px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(13px,3.4vw,16px)/1.1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #0e4f45;touch-action:manipulation;}'
        + '.tw-commit:active{transform:translateY(2px);}'
        /* build plate */
        + '.tw-ref{display:flex;flex-direction:column;align-items:center;gap:5px;}'
        + '.tw-peek{min-height:34px;padding:0 12px;border-radius:11px;border:2px solid rgba(20,107,94,.25);background:#fff;color:' + C.T + ';font:700 clamp(12px,3vw,14px)/1 "Nunito",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.tw-peekbox{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;max-width:280px;padding:5px;background:#FFF9EC;border-radius:12px;}'
        + '.tw-peekobj{width:clamp(20px,5vw,26px);height:clamp(20px,5vw,26px);}.tw-peekobj .tw-acorn-svg{width:100%;height:100%;}'
        + '.tw-numeral{font:800 clamp(40px,11vw,58px)/1 "Baloo 2",sans-serif;color:' + C.T + ';background:#fff;border:3px solid ' + C.T + ';border-radius:16px;min-width:64px;text-align:center;padding:2px 14px;}'
        + '.tw-plate{display:grid;gap:clamp(4px,1.2vw,7px);justify-content:center;background:#E7D9BD;padding:clamp(5px,1.4vw,9px);border-radius:14px;box-shadow:inset 0 2px 6px rgba(120,90,40,.18);}'
        + '.tw-frame{grid-template-columns:repeat(5,1fr);}'
        + '.tw-track{grid-template-columns:repeat(auto-fit,minmax(44px,1fr));max-width:340px;}'
        + '.tw-cell{width:clamp(44px,11vw,50px);height:clamp(44px,11vw,50px);border:2px solid rgba(20,107,94,.14);background:#FCF6EA;border-radius:11px;cursor:pointer;padding:3px;touch-action:manipulation;}'
        + '.tw-cell.tw-filled{border-color:rgba(20,107,94,.3);}.tw-cell .tw-acorn-svg{width:100%;height:100%;}'
        /* declare */
        + '.tw-declare{min-height:48px;padding:0 clamp(20px,6vw,32px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.tw-declare:active{transform:translateY(2px);}.tw-declare.tw-off{opacity:.45;box-shadow:0 3px 0 rgba(20,107,94,.25);}'
        /* done */
        + '.tw-thread{display:flex;align-items:center;gap:0;}'
        + '.tw-pair{width:clamp(40px,11vw,54px);height:clamp(40px,11vw,54px);animation:twWiggle 1s ease-in-out infinite;}.tw-pair .tw-acorn-svg{width:100%;height:100%;}'
        + '@keyframes twWiggle{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}'
        + '.tw-link{width:clamp(40px,14vw,70px);height:5px;border-radius:3px;background:linear-gradient(90deg,' + C.CORAL + ',' + C.GOLD + ');box-shadow:0 0 10px ' + C.GOLD + ';}'
        + '.tw-eq{font:800 clamp(16px,4.5vw,22px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.tw-shelf{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;}'
        + '.tw-pairdot{font-size:clamp(12px,3vw,16px);filter:grayscale(1) opacity(.4);}.tw-pairdot-on{filter:none;}'
        + '.tw-obj:focus-visible,.tw-cell:focus-visible,.tw-declare:focus-visible,.tw-commit:focus-visible,.tw-peek:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* short viewports — model/plate + readout + declare + shell Check must clear the fold */
        + '@media (max-height:820px),(max-width:480px){.tw-root{gap:4px;padding:7px;}.tw-sprite{width:clamp(36px,8vw,44px);}.tw-say{font-size:11.5px;-webkit-line-clamp:1;line-clamp:1;}.tw-model[data-arr="scattered"]{height:clamp(128px,34vw,160px);}.tw-cell{width:44px;height:44px;}.tw-commit{min-height:42px;}.tw-declare{min-height:44px;}}'
        + '@media (max-height:680px){.tw-root{gap:3px;}.tw-main{gap:4px;}.tw-side{gap:5px;}.tw-numeral{font-size:32px;min-width:54px;padding:1px 10px;}.tw-model[data-arr="scattered"]{height:116px;}.tw-cell{width:44px;height:44px;}.tw-declare{min-height:42px;}.tw-readout{padding:3px 9px;}.tw-readout-num{font-size:20px;}}'
        + '@media (prefers-reduced-motion: reduce){.tw-pair{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-twinsies', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'twinsies.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
