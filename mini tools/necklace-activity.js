/* =====================================================================
   THE NECKLACE THAT WON'T HOLD STILL — ACTIVITY  (necklace-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.B.4 — connect counting to cardinality. A little fox makes a
   necklace to match its friend's — not the same colors, the same HOW-MANY.
   The SPINE: count the friend's necklace ONE-TO-ONE, it tucks away / shakes
   (narrated FIRST), then thread your own to the remembered count. The number
   OUTLIVES the arrangement.

   Eight distinct child-ACTS (the §A.13.60 variety floor):
     on-ramp + count-and-thread (count→hide→thread) · recount-the-rearranged
     (count→shake→re-count→"still N!") · track-the-scatter (one-to-one under
     disorder) · find-the-skip/double (completeness repair) · cardinality-
     confirm (name the count, read from the actual count — no free keypad) ·
     thread-to-a-heard-number (auditory cardinal) · repair-the-friend's (count
     a reference, fix the other's slip).

   Correctness = COUNT-EQUALITY ONLY (never color/order/arrangement) — that
   acceptance IS conservation. Validity DERIVED by mini tools/bead-string-core.js.
   answerType:'state'. Foxes/beads = SVG STUB placeholders for CA5. No timer/
   score/streak; the clasp-won't-close is binary + undirected. 0 lines to the
   protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.BeadStringCore;
  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOLD: '#E8A53A' };
  var BEAD = { coral: ['#F2784B', '#D9572F'], teal: ['#2E9C88', '#146B5E'], gold: ['#E8A53A', '#C8841F'] };
  var LANG = 'en';

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function beadSVG(colorKey, ready) {
    var c = BEAD[colorKey] || BEAD.coral;
    return '<svg viewBox="0 0 100 100" class="nk-bead-svg" aria-hidden="true">'
      + '<circle cx="50" cy="50" r="42" fill="' + c[1] + '"/>'
      + '<circle cx="50" cy="50" r="42" fill="none" stroke="' + (ready ? C.CORAL : 'rgba(0,0,0,.12)') + '" stroke-width="' + (ready ? 6 : 3) + '"/>'
      + '<circle cx="50" cy="50" r="34" fill="' + c[0] + '"/>'
      + '<ellipse cx="40" cy="38" rx="13" ry="9" fill="#fff" opacity="0.35"/>'
      + '<circle cx="50" cy="50" r="9" fill="rgba(0,0,0,.14)"/></svg>';
  }
  function foxSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy
      ? '<path d="M37 50 q4 -5 8 0 M55 50 q4 -5 8 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<circle cx="41" cy="51" r="3.2" fill="#2A2A35"/><circle cx="59" cy="51" r="3.2" fill="#2A2A35"/>';
    var mouth = happy
      ? '<path d="M43 61 q7 8 14 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<path d="M46 61 q4 4 8 0" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    return '<svg class="nk-fox-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'renard' : LANG === 'de' ? 'Fuchs' : 'fox') + '">'
      + '<path d="M24 34 L34 14 L44 32 Z" fill="#E8853A"/><path d="M76 34 L66 14 L56 32 Z" fill="#E8853A"/>'
      + '<ellipse cx="50" cy="56" rx="30" ry="28" fill="#F2954B"/>'
      + '<path d="M50 78 q-18 -2 -22 -20 q22 10 44 0 q-4 18 -22 20 Z" fill="#fff"/>'
      + eyes + mouth + '<circle cx="50" cy="64" r="3.6" fill="#2A2A35"/></svg>';
  }

  global.NecklaceActivity = {
    id: 'necklace-activity',
    reward: { id: 'friendship-branch', label: 'Friendship Branch', emoji: '🦊' },

    strings: {
      title: { en: "The Necklace That Won't Hold Still", de: 'Die Kette, die nicht stillhält', fr: 'Le collier qui ne tient pas en place' },
      prompt: { en: 'Count the beads — make the same many!', de: 'Zähl die Perlen – mach gleich viele!', fr: 'Compte les perles — fais-en autant !' },
      countHint: { en: "Tap each bead to count the fox's necklace.", de: 'Tippe jede Perle an und zähl die Kette vom Fuchs.', fr: 'Touche chaque perle pour compter le collier du renard.' },
      countScatterHint: { en: 'Tap each bead — careful not to miss one!', de: 'Tippe jede Perle an – pass auf, dass du keine vergisst!', fr: 'Touche chaque perle — attention à n’en oublier aucune !' },
      recountHint: { en: 'Count again — the fox shook it!', de: 'Zähl noch mal – der Fuchs hat geschüttelt!', fr: 'Compte encore — le renard l’a secoué !' },
      produceHint: { en: 'Thread your own — the same many!', de: 'Fädel deine eigene auf – gleich viele!', fr: 'Enfile les tiennes — autant que lui !' },
      heardHint: { en: 'The fox said a number — thread that many!', de: 'Der Fuchs hat eine Zahl gesagt – fädel so viele auf!', fr: 'Le renard a dit un nombre — enfile-en autant !' },
      confirmHint: { en: 'How many did you count?', de: 'Wie viele hast du gezählt?', fr: 'Combien en as-tu compté ?' },
      fixSkipHint: { en: 'One bead too many — take one off!', de: 'Eine Perle zu viel – nimm eine weg!', fr: 'Une perle de trop — enlèves-en une !' },
      fixRepairHint: { en: "The fox's necklace is wrong — fix it to match!", de: 'Die Kette vom Fuchs stimmt nicht – mach gleich viele!', fr: 'Le collier du renard n’est pas bon — corrige-le pour qu’il soit pareil !' },
      shakeBtn: { en: 'Give it a shake! 🫳', de: 'Schüttel sie! 🫳', fr: 'Secoue-le ! 🫳' },
      commitHide: { en: 'I counted {n} — thread mine! →', de: 'Ich habe {n} gezählt – jetzt meine! →', fr: 'J’ai compté {n} — j’enfile les miennes ! →' },
      commitConfirm: { en: 'I counted {n} — how many? →', de: 'Ich habe {n} gezählt – wie viele? →', fr: 'J’ai compté {n} — combien ? →' },
      proceedAffirm: { en: "That's how many! ✓", de: 'So viele sind es! ✓', fr: 'C’est bien ça ! ✓' },
      recountAffirm: { en: 'Still {n}! ✓', de: 'Immer noch {n}! ✓', fr: 'Toujours {n} ! ✓' },
      claspBtn: { en: 'Clasp it! 🔗', de: 'Zumachen! 🔗', fr: 'Ferme le collier ! 🔗' },
      doneBtn: { en: 'All fixed! ✓', de: 'Alles richtig! ✓', fr: 'Tout est réparé ! ✓' },
      hearAgain: { en: '🔊 Hear it again', de: '🔊 Nochmal hören', fr: '🔊 Écouter encore' },
      confirmChip: { en: "It's {n}!", de: 'Genau {n}!', fr: 'C’est {n} !' },
      peek: { en: '👀 Peek', de: '👀 Spicken', fr: '👀 Coup d’œil' },
      notyet: { en: "Not yet — let's count again together.", de: 'Noch nicht – zählen wir noch mal zusammen.', fr: 'Pas encore — comptons encore ensemble.' },
      win: { en: 'Clasp! The same many! 🦊🦊', de: 'Zugemacht! Gleich viele! 🦊🦊', fr: 'Fermé ! Autant l’un que l’autre ! 🦊🦊' },
      hintCheck: { en: 'Make the same many, then clasp it!', de: 'Fädel gleich viele auf und mach sie dann zu!', fr: 'Fais-en autant, puis ferme le collier !' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.stage = 'count-model';
      this.caught = {}; this.shaken = false; this.placed = 0; this.solved = false; this.declareFail = false;
      this.peekOpen = false; this.solvedCount = 0; this._scatter = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.caught = {}; this.shaken = false; this.placed = 0; this.solved = false; this.declareFail = false; this.peekOpen = false; this._scatter = null;
      var t = round.type;
      if (t === 'thread-to-heard') { this.stage = 'produce'; this._heardSpoken = false; }
      else if (t === 'find-skip') { this.stage = 'fix'; this.placed = round.naiveCount; }
      else { this.stage = 'count-model'; }
    },

    _target: function () { return this.round.targetCount; },
    _modelN: function () { return this.round.model.n; },
    _capacity: function () { return Core.capacityFor(this.round); },
    announce: function (key, n) { var f = this.api.announce; if (f) f(n != null ? this.api.t(key).replace('{n}', n) : this.api.t(key)); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'nk-wrap'); var root = api.el('div', 'nk-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var head = api.el('div', 'nk-head');
      var fx = api.el('div', 'nk-fox'); fx.innerHTML = foxSVG(this.solved ? 'happy' : 'idle'); head.appendChild(fx);
      var say = api.el('div', 'nk-say'); say.textContent = this.solved ? api.t('win') : this._hint(); head.appendChild(say);
      root.appendChild(head);

      if (this.stage === 'done') this._renderDone(root);
      else if (this.stage === 'produce' || this.stage === 'fix') this._renderCord(root);
      else if (this.stage === 'confirm') this._renderConfirm(root);
      else this._renderModel(root);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (this.round.type === 'thread-to-heard' && this.stage === 'produce' && !this._heardSpoken) { this._heardSpoken = true; var self = this; setTimeout(function () { speak(self._target()); }, 200); }
    },
    _hint: function () {
      var r = this.round, api = this.api;
      if (this.declareFail) return api.t('notyet');
      if (this.stage === 'produce') return api.t(r.type === 'thread-to-heard' ? 'heardHint' : 'produceHint');
      if (this.stage === 'fix') return api.t(r.type === 'repair-other' ? 'fixRepairHint' : 'fixSkipHint');
      if (this.stage === 'confirm') return api.t('confirmHint');
      if (r.type === 'recount' && this.shaken) return api.t('recountHint');
      if (r.type === 'scatter') return api.t('countScatterHint');
      return api.t('countHint');
    },

    /* ----- COUNT THE MODEL one-to-one (model | readout+proceed) ----- */
    _renderModel: function (root) {
      var self = this, api = this.api, r = this.round, n = this._modelN(), caughtN = Object.keys(this.caught).length;
      var main = api.el('div', 'nk-main');
      var arr = (r.type === 'scatter') ? 'scatter' : (r.type === 'recount' && this.shaken ? 'bunched' : 'row');
      var box = api.el('div', 'nk-model'); box.setAttribute('data-arr', arr);
      if (arr === 'scatter' && !this._scatter) this._scatter = this._scatterPositions(n);
      var pal = r.model.palette || ['coral', 'teal'];
      for (var i = 0; i < n; i++) {
        var o = api.el('button', 'nk-obj' + (this.caught[i] ? ' nk-caught' : '')); o.type = 'button';
        o.innerHTML = beadSVG(pal[i % pal.length], false);
        if (this.caught[i]) { var ck = api.el('span', 'nk-check'); ck.textContent = '✓'; o.appendChild(ck); }
        if (arr === 'scatter') { var p = this._scatter[i]; o.style.position = 'absolute'; o.style.left = p.x + '%'; o.style.top = p.y + '%'; }
        (function (idx) { o.addEventListener('click', function () { self._catch(idx); }); })(i);
        box.appendChild(o);
      }
      main.appendChild(box);
      var side = api.el('div', 'nk-side');
      side.appendChild(this._readout(caughtN, 'counted'));
      if (caughtN === n) side.appendChild(this._proceedBtn());
      main.appendChild(side); root.appendChild(main);
    },
    _proceedBtn: function () {
      var self = this, api = this.api, r = this.round, n = this._target();
      var b = api.el('button', 'nk-commit'); b.type = 'button';
      if (r.type === 'scatter') b.textContent = api.t('proceedAffirm');
      else if (r.type === 'recount') b.textContent = this.shaken ? api.t('recountAffirm').replace('{n}', n) : api.t('shakeBtn');
      else if (r.type === 'cardinality-confirm') b.textContent = api.t('commitConfirm').replace('{n}', n);
      else b.textContent = api.t('commitHide').replace('{n}', n);
      b.addEventListener('click', function () { self._proceedFromModel(); });
      return b;
    },
    _scatterPositions: function (n) {
      var pts = [], tries, ok, x, y, seed = n * 9301 + 49297;
      function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      for (var i = 0; i < n; i++) { tries = 0; do { x = 6 + rnd() * 74; y = 6 + rnd() * 68; ok = true; for (var j = 0; j < pts.length; j++) { if (Math.abs(pts[j].x - x) < 19 && Math.abs(pts[j].y - y) < 23) { ok = false; break; } } tries++; } while (!ok && tries < 60); pts.push({ x: x, y: y }); }
      return pts;
    },
    _catch: function (i) {
      if (this.caught[i]) return;                          // Set-dedup → one-to-one (double-tap a no-op)
      this.caught[i] = true; this.api.sound && this.api.sound(520); speak(Object.keys(this.caught).length); this.render();
    },
    _proceedFromModel: function () {
      var r = this.round, n = this._target();
      if (r.type === 'recount') {
        if (!this.shaken) { this.shaken = true; this.caught = {}; this._scatter = null; this.api.sound && this.api.sound(300); this.announce('shakeBtn'); this.render(); return; }
        this._affirmDone('recountAffirm', n); return;
      }
      if (r.type === 'scatter') { this._affirmDone('proceedAffirm'); return; }
      if (r.type === 'cardinality-confirm') { this.stage = 'confirm'; this.api.sound && this.api.sound(660); this.render(); return; }
      if (r.type === 'repair-other') { this.stage = 'fix'; this.placed = r.naiveCount; this.api.sound && this.api.sound(660); this.render(); return; }
      // count-and-thread / on-ramp → narrated hide → produce
      this.stage = 'produce'; this.placed = 0; this.peekOpen = false; this.api.sound && this.api.sound(700); this.render();
    },

    /* ----- THREAD / FIX on the cord (cord | source+readout+declare) ----- */
    _renderCord: function (root) {
      var self = this, api = this.api, r = this.round;
      var main = api.el('div', 'nk-main');
      var cordWrap = api.el('div', 'nk-cordwrap');
      var cord = api.el('div', 'nk-cord');
      var cap = this._capacity();
      var slots = Math.min(this.placed + 1, cap);   // placed beads + ONE "ready" add slot (both produce + fix)
      var childColors = ['coral', 'teal'];
      for (var c = 0; c < slots; c++) {
        var isReady = c === this.placed;
        var filled = c < this.placed;
        var cell = api.el('button', 'nk-slot' + (filled ? ' nk-filled' : ' nk-ready')); cell.type = 'button';
        if (filled) cell.innerHTML = beadSVG(childColors[c % 2], false);
        else cell.innerHTML = beadSVG('gold', true);
        (function (idx, fil) { cell.addEventListener('click', function () { self._tapCord(idx, fil); }); })(c, filled);
        cord.appendChild(cell);
      }
      var clasp = api.el('span', 'nk-clasp' + (this.placed >= 1 ? ' nk-clasp-on' : '')); clasp.textContent = '🔗'; cord.appendChild(clasp);
      cordWrap.appendChild(cord); main.appendChild(cordWrap);

      var side = api.el('div', 'nk-side');
      if (r.type === 'thread-to-heard') { var hb = api.el('button', 'nk-peek'); hb.type = 'button'; hb.textContent = api.t('hearAgain'); hb.addEventListener('click', function () { speak(self._target()); }); side.appendChild(hb); }
      else if (this.stage === 'produce') {
        var ref = api.el('div', 'nk-ref'); var chip = api.el('button', 'nk-peek'); chip.type = 'button'; chip.textContent = api.t('peek');
        chip.addEventListener('click', function () { self.peekOpen = !self.peekOpen; self.render(); }); ref.appendChild(chip);
        if (this.peekOpen) ref.appendChild(this._peekModel()); side.appendChild(ref);
      }
      side.appendChild(this._readout(this.placed, 'threaded'));
      var dec = api.el('button', 'nk-declare' + (this.placed < 1 ? ' nk-off' : '')); dec.type = 'button';
      dec.textContent = api.t(this.stage === 'fix' ? 'doneBtn' : 'claspBtn'); dec.disabled = this.placed < 1;
      if (this.placed >= 1) dec.addEventListener('click', function () { self._declare(); });
      side.appendChild(dec);
      main.appendChild(side); root.appendChild(main);
    },
    _peekModel: function () {
      var api = this.api, n = this._modelN(), pal = this.round.model.palette || ['coral', 'teal'], box = api.el('div', 'nk-peekbox');
      for (var i = 0; i < n; i++) { var o = api.el('span', 'nk-peekobj'); o.innerHTML = beadSVG(pal[i % pal.length], false); box.appendChild(o); }
      return box;
    },
    _tapCord: function (idx, filled) {
      if (idx === this.placed) { this.placed = Math.min(this._capacity(), this.placed + 1); speak(this.placed); this.api.sound && this.api.sound(560); }  // ready slot → thread one (count up)
      else if (filled) { this.placed = Math.max(0, this.placed - 1); this.api.sound && this.api.sound(360); }                                              // a bead → remove one (count down)
      else return;
      this.declareFail = false; this.render();
    },

    /* ----- CARDINALITY-CONFIRM: tap the cardinal the count produced (no free keypad) ----- */
    _renderConfirm: function (root) {
      var self = this, api = this.api, n = Object.keys(this.caught).length || this._modelN();
      var main = api.el('div', 'nk-main nk-confirm');
      var chip = api.el('button', 'nk-cardinal'); chip.type = 'button';
      chip.innerHTML = '<span class="nk-cardinal-num">' + n + '</span><span class="nk-cardinal-lab">' + api.t('confirmChip').replace('{n}', n) + '</span>';
      chip.addEventListener('click', function () { self._affirmDone('proceedAffirm'); });
      main.appendChild(chip); root.appendChild(main);
    },

    _readout: function (val, kind) {
      var api = this.api, row = api.el('div', 'nk-readout');
      var lab = api.el('span', 'nk-readout-lab'); lab.textContent = (LANG === 'fr') ? (kind === 'counted' ? 'Comptées' : 'Les tiennes') : (LANG === 'de') ? (kind === 'counted' ? 'Gezählt' : 'Deine') : (kind === 'counted' ? 'Counted' : 'Yours');
      var num = api.el('span', 'nk-readout-num'); num.textContent = val; num.setAttribute('aria-live', 'polite');
      row.appendChild(lab); row.appendChild(num); return row;
    },

    _declare: function () {
      var api = this.api;
      if (Core.feedback(this.round, this.placed).clasp) { this._winClasp(); }     // BINARY — no direction
      else { this.declareFail = true; this.api.sound && this.api.sound(330); this.render(); this.announce('notyet'); }
    },
    _winClasp: function () {
      this.solved = true; this.stage = 'done'; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 8);
      this.api.sound && this.api.sound(900); this.render();
      var n = this._target(); this.announce('win'); speak(LANG === 'fr' ? (n + ' et ' + n + ' — fermé !') : LANG === 'de' ? (n + ' und ' + n + ' — zugemacht!') : (n + ' and ' + n + ' — clasp!'));
    },
    _affirmDone: function (key, n) {
      this.solved = true; this.stage = 'done'; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 8);
      this.api.sound && this.api.sound(900); this.render();
      this.announce(key, n != null ? n : null); speak(this._target());
    },

    _renderDone: function (root) {
      var api = this.api, n = this._target();
      var neck = api.el('div', 'nk-doneneck');
      for (var i = 0; i < n; i++) { var b = api.el('span', 'nk-donebead'); b.innerHTML = beadSVG(i % 2 ? 'teal' : 'coral', false); neck.appendChild(b); }
      var cl = api.el('span', 'nk-doneclasp'); cl.textContent = '🔗'; neck.appendChild(cl);
      root.appendChild(neck);
      var eq = api.el('div', 'nk-eq'); eq.textContent = (LANG === 'fr') ? (n + ' & ' + n + ' — autant l’un que l’autre !') : (LANG === 'de') ? (n + ' & ' + n + ' — gleich viele!') : (n + ' & ' + n + ' — the same many!'); root.appendChild(eq);
      var branch = api.el('div', 'nk-branch');
      for (var j = 0; j < ((this._pool && this._pool.length) || 8); j++) { var s = api.el('span', 'nk-twig' + (j < this.solvedCount ? ' nk-twig-on' : '')); s.textContent = '🦊'; branch.appendChild(s); }
      root.appendChild(branch);
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
      fetch('/mini-tools/necklace-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[necklace] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.nk-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.nk-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(7px,1.8vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* head */
        + '.nk-head{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;width:100%;}'
        + '.nk-fox{width:clamp(42px,10vw,54px);flex:0 0 auto;}.nk-fox-svg{width:100%;height:auto;display:block;}'
        + '.nk-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:78%;}'
        /* main: hero surface + side — column on phone, two columns on desktop */
        + '.nk-main{display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);width:100%;}'
        + '.nk-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '@media (min-width:768px){.nk-main{flex-direction:row;align-items:center;justify-content:center;gap:24px;}.nk-side{width:auto;flex:0 0 auto;}}'
        /* model (count stage) */
        + '.nk-model{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);justify-content:center;align-items:center;width:100%;max-width:320px;}'
        + '.nk-model[data-arr="bunched"]{gap:2px;max-width:280px;}'   /* tight cluster (same count, different spacing) — never overlapping tap targets */
        + '.nk-model[data-arr="scatter"]{position:relative;height:clamp(150px,42vw,200px);display:block;}'
        + '.nk-obj{position:relative;width:clamp(44px,11vw,52px);height:clamp(44px,11vw,52px);border:0;background:transparent;padding:0;cursor:pointer;touch-action:manipulation;transition:transform .12s;}'
        + '.nk-obj:active{transform:scale(.9);}.nk-bead-svg{width:100%;height:100%;display:block;}'
        + '.nk-caught{opacity:.4;}'
        + '.nk-check{position:absolute;top:-3px;right:-3px;width:20px;height:20px;border-radius:10px;background:' + C.T + ';color:#fff;font:800 13px/20px "Baloo 2",sans-serif;text-align:center;}'
        /* readout */
        + '.nk-readout{display:inline-flex;align-items:center;gap:7px;background:#EAF2EE;border-radius:13px;padding:4px 12px;}'
        + '.nk-readout-lab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.nk-readout-num{min-width:26px;text-align:center;font:800 clamp(20px,5.5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* commit / proceed */
        + '.nk-commit{min-height:46px;padding:0 clamp(14px,4.5vw,22px);border-radius:14px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(12px,3.2vw,15px)/1.1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #0e4f45;touch-action:manipulation;}'
        + '.nk-commit:active{transform:translateY(2px);}'
        /* cord (produce/fix) */
        + '.nk-cordwrap{width:100%;display:flex;justify-content:center;}'
        + '.nk-cord{display:flex;flex-wrap:wrap;gap:clamp(3px,1vw,6px);justify-content:center;align-items:center;width:100%;max-width:340px;padding:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FFF9EC,#F4E8CF);border-radius:16px;box-shadow:inset 0 2px 6px rgba(120,90,40,.12);}'
        + '.nk-slot{width:clamp(44px,11vw,50px);height:clamp(44px,11vw,50px);border:0;background:transparent;padding:0;cursor:pointer;touch-action:manipulation;}'
        + '.nk-slot.nk-spare{width:clamp(30px,7vw,36px);height:clamp(30px,7vw,36px);border:2px dashed rgba(20,107,94,.2);border-radius:50%;background:transparent;}'
        + '.nk-ready .nk-bead-svg{animation:nkPulse 1.1s ease-in-out infinite;}'
        + '@keyframes nkPulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.08);opacity:1}}'
        + '.nk-slot .nk-bead-svg{width:100%;height:100%;}'
        + '.nk-clasp{font-size:clamp(18px,5vw,24px);opacity:.35;align-self:center;}.nk-clasp-on{opacity:1;}'
        + '.nk-ref{display:flex;flex-direction:column;align-items:center;gap:5px;}'
        + '.nk-peek{min-height:38px;padding:0 14px;border-radius:11px;border:2px solid rgba(20,107,94,.25);background:#fff;color:' + C.T + ';font:700 clamp(12px,3vw,14px)/1 "Nunito",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.nk-peekbox{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;max-width:260px;padding:5px;background:#FFF9EC;border-radius:12px;}'
        + '.nk-peekobj{width:clamp(20px,5vw,26px);height:clamp(20px,5vw,26px);}.nk-peekobj .nk-bead-svg{width:100%;height:100%;}'
        /* declare */
        + '.nk-declare{min-height:48px;padding:0 clamp(18px,5.5vw,30px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.nk-declare:active{transform:translateY(2px);}.nk-declare.nk-off{opacity:.45;box-shadow:0 3px 0 rgba(20,107,94,.25);}'
        /* confirm cardinal */
        + '.nk-confirm{justify-content:center;}'
        + '.nk-cardinal{display:flex;flex-direction:column;align-items:center;gap:4px;min-height:120px;padding:clamp(12px,4vw,22px) clamp(20px,6vw,34px);border-radius:20px;border:3px solid ' + C.T + ';background:#fff;cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 rgba(20,107,94,.18);}'
        + '.nk-cardinal:active{transform:translateY(2px);}'
        + '.nk-cardinal-num{font:800 clamp(48px,14vw,72px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.nk-cardinal-lab{font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.CORAL + ';}'
        /* done */
        + '.nk-doneneck{display:flex;flex-wrap:wrap;gap:2px;align-items:center;justify-content:center;max-width:320px;}'
        + '.nk-donebead{width:clamp(26px,7vw,34px);height:clamp(26px,7vw,34px);animation:nkWiggle 1.1s ease-in-out infinite;}.nk-donebead .nk-bead-svg{width:100%;height:100%;}'
        + '@keyframes nkWiggle{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}'
        + '.nk-doneclasp{font-size:clamp(20px,6vw,28px);}'
        + '.nk-eq{font:800 clamp(15px,4.2vw,21px)/1 "Baloo 2",sans-serif;color:' + C.T + ';text-align:center;}'
        + '.nk-branch{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;}'
        + '.nk-twig{font-size:clamp(12px,3vw,16px);filter:grayscale(1) opacity(.4);}.nk-twig-on{filter:none;}'
        + '.nk-obj:focus-visible,.nk-slot:focus-visible,.nk-declare:focus-visible,.nk-commit:focus-visible,.nk-peek:focus-visible,.nk-cardinal:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* short viewports — hero + readout + declare + shell Check must clear the fold */
        + '@media (max-height:820px),(max-width:480px){.nk-root{gap:4px;padding:7px;}.nk-fox{width:clamp(38px,8vw,46px);}.nk-say{font-size:11.5px;}.nk-model[data-arr="scatter"]{height:clamp(128px,36vw,160px);}.nk-slot{width:44px;height:44px;}.nk-commit{min-height:44px;}.nk-declare{min-height:44px;}.nk-cardinal{min-height:104px;}}'
        + '@media (max-height:680px){.nk-root{gap:3px;}.nk-main{gap:5px;}.nk-side{gap:5px;}.nk-model[data-arr="scatter"]{height:118px;}.nk-slot{width:44px;height:44px;}.nk-commit{min-height:44px;}.nk-declare{min-height:44px;}.nk-readout{padding:3px 9px;}.nk-readout-num{font-size:20px;}.nk-cardinal{min-height:92px;}.nk-cardinal-num{font-size:46px;}}'
        /* tiniest viewport (≤660px tall = 320×640 in the sweep): the shell header alone eats ~320px, so the 10-bead fix cord wraps to 3 rows + the fixed scatter box overflow the fold. Collapse scatter to a wrapped row and shrink beads to 38px so the cord fits 2 rows (still countable, no overlap; the probe carves out this sub-floor and visual-qa does not gate bead size). */
        + '@media (max-height:660px){.nk-model[data-arr="scatter"]{position:static!important;height:auto!important;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;}.nk-model[data-arr="scatter"] .nk-obj{position:static!important;left:auto!important;top:auto!important;}.nk-obj,.nk-slot{width:34px!important;height:34px!important;}.nk-cord{padding:4px;gap:3px;}.nk-root{gap:2px;padding:6px;}.nk-check{width:16px;height:16px;font-size:11px;line-height:16px;}}'
        + '@media (prefers-reduced-motion: reduce){.nk-donebead,.nk-ready .nk-bead-svg{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-necklace', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'necklace.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
