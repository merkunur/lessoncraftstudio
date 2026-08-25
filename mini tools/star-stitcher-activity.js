/* =====================================================================
   COUNT THE STARS AWAKE — ACTIVITY  (star-stitcher-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.2 — count forward from a GIVEN number. A firefly is stuck and
   can only fly where the child has already counted. From the one lit star
   (k≠1) the child taps "Count on" to fly her forward one DARK star at a time
   (the numeral climbs + speaks), then taps "Wake it!" to lock the firefly's
   star IF it is the target — counting PAST the target and waking OVERSHOOTS
   (glide back). The dark stars carry NO number (the only way to know the next
   is to count on). When the last star lights, the constellation wakes.

   Validity DERIVED by mini tools/connect-sequence-core.js (order INTERNAL;
   the DOM exposes NO order on dark dots). answerType:'state'. Stars/firefly =
   SVG STUB placeholders for CA5. No timer/score/streak. 0 lines to the
   protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ConnectSequenceCore;
  var C = { T: '#146B5E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOLD: '#E8A53A', NIGHT: '#0E4A40' };
  var CREATURE = { fox: ['🦊', 'fox'], owl: ['🦉', 'owl'], whale: ['🐳', 'whale'], deer: ['🦌', 'deer'], bear: ['🐻', 'bear'], cat: ['🐱', 'cat'], bird: ['🐦', 'bird'] };
  var CREATURE_DE = { fox: 'einen Fuchs', owl: 'eine Eule', whale: 'einen Wal', deer: 'ein Reh', bear: 'einen Bären', cat: 'eine Katze', bird: 'einen Vogel' };
  var CREATURE_FR = { fox: 'un renard', owl: 'une chouette', whale: 'une baleine', deer: 'un cerf', bear: 'un ours', cat: 'un chat', bird: 'un oiseau' };
  var CREATURE_ES = { fox: 'un zorro', owl: 'una lechuza', whale: 'una ballena', deer: 'un venado', bear: 'un oso', cat: 'una gata', bird: 'un pájaro' };
  var CREATURE_PT = { fox: 'uma raposa', owl: 'uma coruja', whale: 'uma baleia', deer: 'um cervo', bear: 'um urso', cat: 'um gato', bird: 'um passarinho' };
  var CREATURE_IT = { fox: 'una volpe', owl: 'un gufo', whale: 'una balena', deer: 'un cervo', bear: 'un orso', cat: 'un gatto', bird: 'un uccellino' };
  var LANG = 'en';
  function creaturePhrase(reveal) { return LANG === 'es' ? (CREATURE_ES[reveal] || 'una estrella') : LANG === 'de' ? (CREATURE_DE[reveal] || 'einen Stern') : LANG === 'fr' ? (CREATURE_FR[reveal] || 'une étoile') : LANG === 'pt' ? (CREATURE_PT[reveal] || 'uma estrela') : LANG === 'it' ? (CREATURE_IT[reveal] || 'una stella') : (CREATURE[reveal] || ['⭐', 'star'])[1]; }

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: String(text), lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function svgEl(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

  global.StarStitcherActivity = {
    id: 'star-stitcher-activity',
    reward: { id: 'night-sky', label: 'Night Sky', emoji: '🌌' },

    strings: {
      title: { en: 'Count the Stars Awake', de: 'Zähl die Sterne wach!', fr: 'Réveille les étoiles en comptant', es: '¡Cuenta las estrellas!', pt: 'Conte e acorde as estrelas!', it: 'Conta e accendi le stelle' },
      prompt: { en: 'Count the firefly forward!', de: 'Zähl das Glühwürmchen weiter!', fr: 'Compte pour avancer !', es: '¡Haz que la luciérnaga siga contando!', pt: 'Conte para o vaga-lume avançar!', it: 'Fai contare la lucciola in avanti!' },
      countOn: { en: 'Count on', de: 'Weiterzählen', fr: 'Compte encore', es: 'Sigue contando', pt: 'Conte mais', it: 'Conta ancora' },
      wake: { en: 'Wake it!', de: 'Wecken!', fr: 'Réveille !', es: '¡Despierta!', pt: 'Acorde!', it: 'Accendila!' },
      countHint: { en: 'Tap Count on to fly her to the next star, then Wake it!', de: 'Tippe auf „Weiterzählen", damit es zum nächsten Stern fliegt – dann auf „Wecken"!', fr: 'Touche « Compte encore » pour avancer d’une étoile, puis « Réveille ! ».', es: 'Toca «Sigue contando» para que vuele a la siguiente estrella… ¡luego toca «Despierta»!', pt: 'Toque em Conte mais para ir à próxima estrela. Depois, Acorde!', it: 'Tocca Conta ancora, vola alla stella e accendila!' },
      pickHint: { en: 'Tap the glowing star to start counting from there.', de: 'Tippe auf den leuchtenden Stern, um von dort weiterzuzählen.', fr: 'Touche l’étoile qui brille pour compter à partir de là.', es: 'Toca la estrella que brilla para contar desde ahí.', pt: 'Toque na estrela acesa para começar a contar dali.', it: 'Tocca la stella accesa per iniziare a contare.' },
      setHint: { en: 'Tap each dot to count them — that is where she starts!', de: 'Tippe jeden Punkt an und zähle mit – dort fängt es an!', fr: 'Touche chaque point pour les compter — c’est là qu’elle commence !', es: 'Toca cada punto y cuenta con él… ¡ahí empieza!', pt: 'Toque em cada ponto para contá-los — é daí que o vaga-lume começa!', it: 'Tocca ogni punto per contarli: da lì lei parte!' },
      overshoot: { en: 'Not yet — count on again from the lit star.', de: 'Noch nicht – zähl vom leuchtenden Stern noch einmal weiter.', fr: 'Pas encore — recompte depuis l’étoile allumée.', es: 'Todavía no… cuenta otra vez desde la estrella que brilla.', pt: 'Ainda não — conte de novo a partir da estrela acesa.', it: 'Non ancora: conta di nuovo dalla stella accesa.' },
      win: { en: 'You woke a {c}!', de: 'Du hast {c} geweckt!', fr: 'Tu as réveillé {c} !', es: '¡Despertaste a {c}!', pt: 'Você acordou {c}!', it: 'Hai svegliato {c}!' },
      hintCheck: { en: 'Count the firefly to each star and Wake it.', de: 'Zähl das Glühwürmchen zu jedem Stern und wecke ihn.', fr: 'Compte la luciole jusqu’à chaque étoile et réveille-la.', es: 'Lleva a la luciérnaga contando a cada estrella y despiértala.', pt: 'Conte o vaga-lume até cada estrela e depois Acorde!', it: 'Fai contare la lucciola a ogni stella e accendila.' },
      startHere: { en: 'Start here', de: 'Hier starten', fr: 'Commence ici', es: 'Empieza aquí', pt: 'Começar aqui', it: 'Parti da qui' },
      countSetGo: { en: "That's {n} — count on!", de: 'Das sind {n} – weiterzählen!', fr: 'Ça fait {n} — continue à compter !', es: 'Van {n}… ¡sigue contando!', pt: 'Deu {n} — conte mais!', it: 'Sono {n}: conta in avanti!' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.stage = 'count-on'; this.cstate = null; this.solved = false; this.overshootFlash = false; this.setCount = 0; this.solvedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = Core.expandRound(round); this.cstate = Core.initState(this.round); this.solved = false; this.overshootFlash = false; this.setCount = 0;
      if (Core.requiresPickAnchor(this.round)) this.stage = 'pick-anchor';
      else if (Core.requiresCountSet(this.round)) this.stage = 'count-set';
      else this.stage = 'count-on';
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'ss-wrap'); var root = api.el('div', 'ss-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var hint = api.el('div', 'ss-hint'); hint.textContent = this.overshootFlash ? api.t('overshoot') : (this.stage === 'pick-anchor' ? api.t('pickHint') : this.stage === 'count-set' ? api.t('setHint') : api.t('countHint'));
      root.appendChild(hint);
      if (this.stage === 'count-set') this._renderCountSet(root);
      else this._renderMain(root);
      wrap.appendChild(root); stage.appendChild(wrap);
    },

    /* ----- the night panel + controls (pick-anchor / count-on / done) ----- */
    _renderMain: function (root) {
      var self = this, api = this.api;
      var main = api.el('div', 'ss-main');
      main.appendChild(this._buildPanel());
      // right side: the count numeral + Count on + Wake it (or the reveal)
      var side = api.el('div', 'ss-side');
      if (this.stage === 'done') {
        var cr = CREATURE[this.round.reveal] || ['⭐', 'star'];
        var big = api.el('div', 'ss-creature'); big.textContent = cr[0]; side.appendChild(big);
        var won = api.el('div', 'ss-won'); won.textContent = api.t('win').replace('{c}', creaturePhrase(this.round.reveal)); side.appendChild(won);
      } else if (this.stage === 'pick-anchor') {
        var tip = api.el('div', 'ss-numeral'); tip.textContent = this.round.start; side.appendChild(tip);
        var go = api.el('button', 'ss-beat'); go.type = 'button'; go.textContent = api.t('startHere');
        go.addEventListener('click', function () { self.stage = 'count-on'; self.api.sound && self.api.sound(600); self.render(); }); side.appendChild(go);
      } else {
        var num = api.el('div', 'ss-numeral' + (this.overshootFlash ? ' ss-num-bad' : '')); num.textContent = this.cstate.count; num.setAttribute('aria-live', 'polite'); side.appendChild(num);
        var beat = api.el('button', 'ss-beat'); beat.type = 'button'; beat.textContent = api.t('countOn');
        beat.addEventListener('click', function () { self._countOn(); }); side.appendChild(beat);
        var wake = api.el('button', 'ss-wake'); wake.type = 'button'; wake.textContent = api.t('wake');
        wake.addEventListener('click', function () { self._wake(); }); side.appendChild(wake);
      }
      main.appendChild(side); root.appendChild(main);
      // night-sky vessel
      var sky = api.el('div', 'ss-sky');
      for (var i = 0; i < ((this._pool && this._pool.length) || 7); i++) { var s = api.el('span', 'ss-skydot' + (i < this.solvedCount ? ' ss-skydot-on' : '')); s.textContent = '✦'; sky.appendChild(s); }
      root.appendChild(sky);
    },

    _buildPanel: function () {
      var self = this, api = this.api, view = Core.getRenderableState(this.round, this.cstate);
      var box = api.el('div', 'ss-panel-box');
      var svg = svgEl('svg', { viewBox: '0 0 1000 1000', class: 'ss-panel' }); this._svgEl = svg;
      svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 1000, height: 1000, rx: 28, fill: C.NIGHT }));
      // the thread through LOCKED dots (order ≤ segStart), in sequence order
      var locked = this.round.dots.filter(function (d) { return d.order <= self.cstate.segStart; }).sort(function (a, b) { return a.order - b.order; });
      if (locked.length >= 2) { var pts = locked.map(function (d) { return d.cx + ',' + d.cy; }).join(' '); svg.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: C.CORAL, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.9, class: 'ss-thread' })); }
      // live segment from the last locked to the firefly (tentative)
      var ff = Core.dotByOrder(this.round, this.cstate.count);
      var lastLocked = locked.length ? locked[locked.length - 1] : Core.dotByOrder(this.round, this.round.start);
      if (this.stage === 'count-on' && ff && lastLocked && this.cstate.count > this.cstate.segStart) svg.appendChild(svgEl('line', { x1: lastLocked.cx, y1: lastLocked.cy, x2: ff.cx, y2: ff.cy, stroke: C.GOLD, 'stroke-width': 5, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round', class: 'ss-live' }));
      // stars
      view.dots.forEach(function (d) {
        var cls = d.lit ? 'ss-star ss-lit' : d.passing ? 'ss-star ss-passing' : 'ss-star ss-dark';
        if (self.solved) cls = 'ss-star ss-lit ss-revealed';
        svg.appendChild(svgEl('circle', { cx: d.cx, cy: d.cy, r: 26, class: cls }));
        var showN = (d.lit || d.passing) && d.order != null;
        if (showN) { var t = svgEl('text', { x: d.cx, y: d.cy + 9, 'text-anchor': 'middle', class: 'ss-starnum' }); t.textContent = d.order; svg.appendChild(t); }
      });
      // the firefly (coral glow) at the current count position
      if (this.stage !== 'done' && ff) { svg.appendChild(svgEl('circle', { cx: ff.cx, cy: ff.cy, r: 17, class: 'ss-firefly' })); }
      // a tap-capture over the firefly (tap-the-firefly = wake, secondary path) — and the whole panel taps as count-on in count-on stage
      box.appendChild(svg);
      return box;
    },

    _countOn: function () {
      if (this.stage !== 'count-on' || this.solved) return;
      this.overshootFlash = false;
      var r = Core.commitCountOn(this.round, this.cstate);
      this.api.sound && this.api.sound(440 + this.cstate.count * 18); speak(this.cstate.count); this.render();
    },
    _wake: function () {
      if (this.stage !== 'count-on' || this.solved) return;
      var res = Core.wakeAttempt(this.round, this.cstate);
      if (res.locked) {
        this.api.sound && this.api.sound(720 + this.cstate.segStart * 12); this.overshootFlash = false;
        if (res.solved) { this._win(); return; }
        this.render();
      } else { // overshoot — glide back (the core reset count); a soft, undirected nudge
        this.overshootFlash = true; this.api.sound && this.api.sound(300); this.render();
        this.api.announce && this.api.announce(this.api.t('overshoot'));
      }
    },
    _win: function () {
      this.solved = true; this.stage = 'done'; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 7);
      this.api.sound && this.api.sound(920); this.render();
      var cr = CREATURE[this.round.reveal] || ['⭐', 'star'];
      this.api.announce && this.api.announce(this.api.t('win').replace('{c}', creaturePhrase(this.round.reveal))); speak(this.api.t('win').replace('{c}', creaturePhrase(this.round.reveal)));
    },

    /* ----- count-set pre-stage (quantity-start, exp 6) ----- */
    _renderCountSet: function (root) {
      var self = this, api = this.api, n = this.round.setN;
      var main = api.el('div', 'ss-main');
      var pips = api.el('div', 'ss-pips');
      for (var i = 0; i < n; i++) { var p = api.el('button', 'ss-pip' + (i < this.setCount ? ' ss-pip-on' : '')); p.type = 'button'; p.textContent = '●';
        (function (idx) { p.addEventListener('click', function () { self._tapPip(idx); }); })(i); pips.appendChild(p); }
      main.appendChild(pips);
      var side = api.el('div', 'ss-side');
      var num = api.el('div', 'ss-numeral'); num.textContent = this.setCount; side.appendChild(num);
      if (this.setCount === n) { var go = api.el('button', 'ss-beat'); go.type = 'button'; go.textContent = api.t('countSetGo').replace('{n}', n);
        go.addEventListener('click', function () { self.stage = 'count-on'; self.api.sound && self.api.sound(640); self.render(); }); side.appendChild(go); }
      main.appendChild(side); root.appendChild(main);
    },
    _tapPip: function (i) { if (i < this.setCount) return; if (i === this.setCount) { this.setCount++; this.api.sound && this.api.sound(520); speak(this.setCount); this.render(); } },

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
      fetch('/mini-tools/star-stitcher-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[star-stitcher] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ss-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.ss-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#EFE6D0);border-radius:20px;padding:clamp(7px,1.8vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.ss-hint{text-align:center;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:96%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        /* main: panel + side — column on phone, two columns on desktop */
        + '.ss-main{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,12px);width:100%;}'
        + '.ss-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '@media (min-width:768px){.ss-main{flex-direction:row;align-items:center;justify-content:center;gap:22px;}.ss-side{width:auto;flex:0 0 auto;}}'
        /* night panel */
        + '.ss-panel-box{display:flex;justify-content:center;flex:0 0 auto;}'
        + '.ss-panel{width:100%;max-width:min(208px,23vh);aspect-ratio:1;display:block;touch-action:manipulation;}'
        + '.ss-star{transition:fill .2s,opacity .2s;}'
        + '.ss-dark{fill:#1E5C50;opacity:.55;}'
        + '.ss-passing{fill:' + C.GOLD + ';opacity:.85;}'
        + '.ss-lit{fill:#FFE08A;}.ss-revealed{fill:#FFEFB8;}'
        + '.ss-starnum{fill:#0E4A40;font:800 30px "Baloo 2",sans-serif;}'
        + '.ss-firefly{fill:' + C.CORAL + ';filter:drop-shadow(0 0 8px ' + C.CORAL + ');animation:ssGlow 1.1s ease-in-out infinite;}'
        + '@keyframes ssGlow{0%,100%{opacity:.85}50%{opacity:1}}'
        + '.ss-thread{filter:drop-shadow(0 0 4px ' + C.CORAL + ');}'
        /* numeral + beats */
        + '.ss-numeral{min-width:64px;text-align:center;font:800 clamp(34px,9vw,52px)/1 "Baloo 2",sans-serif;color:' + C.T + ';background:#fff;border:3px solid ' + C.T + ';border-radius:16px;padding:2px 14px;}'
        + '.ss-num-bad{border-color:' + C.CORAL + ';color:' + C.CORAL + ';}'
        + '.ss-beat{min-height:48px;padding:0 clamp(18px,5vw,28px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;animation:ssPulse 1.2s ease-in-out infinite;}'
        + '.ss-beat:active,.ss-wake:active{transform:translateY(2px);}'
        + '@keyframes ssPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}'
        + '.ss-wake{min-height:44px;padding:0 clamp(16px,5vw,26px);border-radius:14px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(14px,3.6vw,17px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #0e4f45;touch-action:manipulation;}'
        + '.ss-creature{font-size:clamp(44px,12vw,64px);}'
        + '.ss-won{font:800 clamp(15px,4vw,20px)/1.1 "Baloo 2",sans-serif;color:' + C.T + ';text-align:center;}'
        /* count-set pips */
        + '.ss-pips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:280px;}'
        + '.ss-pip{width:clamp(44px,12vw,54px);height:clamp(44px,12vw,54px);border:2px solid rgba(20,107,94,.2);background:#fff;border-radius:50%;color:#CBD7D2;font-size:22px;cursor:pointer;touch-action:manipulation;}'
        + '.ss-pip-on{background:#D2E8E1;color:' + C.T + ';border-color:' + C.T + ';}'
        /* sky vessel */
        + '.ss-sky{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;}'
        + '.ss-skydot{font-size:clamp(11px,3vw,15px);color:rgba(20,107,94,.25);}.ss-skydot-on{color:' + C.GOLD + ';}'
        + '.ss-beat:focus-visible,.ss-wake:focus-visible,.ss-pip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* short viewports */
        + '@media (max-height:820px),(max-width:480px){.ss-root{gap:4px;padding:7px;}.ss-hint{-webkit-line-clamp:2;line-clamp:2;font-size:12px;}.ss-numeral{font-size:34px;}.ss-beat{min-height:44px;}.ss-wake{min-height:42px;}.ss-creature{font-size:44px;}.ss-sky{display:none;}}'
        + '@media (max-width:767px){.ss-panel{max-width:min(188px,22vh);}}'
        + '@media (max-width:767px) and (max-height:680px){.ss-panel{max-width:min(150px,18vh);}}'
        + '@media (max-width:360px){.ss-root{gap:3px;}.ss-main{gap:4px;}.ss-side{gap:5px;}.ss-panel{max-width:min(112px,15vh);}.ss-numeral{font-size:26px;min-width:48px;padding:1px 10px;}.ss-beat{min-height:40px;}.ss-wake{min-height:40px;}}'
        + '@media (prefers-reduced-motion: reduce){.ss-firefly,.ss-beat{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-star-stitcher', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'star-stitcher.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
