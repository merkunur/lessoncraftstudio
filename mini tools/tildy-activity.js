/* =====================================================================
   TILDY'S TAILOR SHOP — Ruler Lab — ACTIVITY  (tildy-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.A.1 — Tildy measures strips with a ruler. The child DRAGS the ruler
   so its 0 aligns with the strip's START (Knot the cat nudged it off-zero — the
   child positions it; NO live lamp), presses "Measure it" (the binary POST-
   COMMIT check), then taps the numeral the far edge reads. Off-by-one (start at
   the 1) reads one short — shown as a warm consequence, never red. All grading
   from tildy-core.js. 0 lines to any existing core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TildyCore;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { T: '#146B5E', T2: '#0E5247', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', WOOD: '#C9A86B', RULER: '#E7D7A8', STRIP: '#146B5E' };
  var TABLE = 14, CMW = 17, MARGIN = 10;          /* table 0..14 cm; CMW px per cm in the viewBox */
  function cmX(c) { return MARGIN + c * CMW; }
  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }

  global.TildyActivity = {
    id: 'tildy-activity',

    strings: {
      title: { en: "Tildy's Tailor Shop", de: 'Tildys Schneiderei', fr: 'L’atelier de Tildy', es: 'El taller de Tildy', pt: 'O Ateliê da Tildy' },
      instruction: { en: '', de: '', fr: '', es: '', pt: '' },
      prompt: { en: 'Measure the strip.', de: 'Miss den Streifen.', fr: 'Mesure la bande.', es: 'Mide la tira.', pt: 'Meça a tira.' },
      measureIt: { en: 'Measure it ✂️', de: 'Messen ✂️', fr: 'Mesurer ✂️', es: 'Medir ✂️', pt: 'Medir ✂️' },
      sayWelcome: { en: 'Slide the ruler so 0 is right at the start of the strip!', de: 'Schieb das Lineal so, dass die 0 genau am Anfang des Streifens liegt!', fr: 'Fais glisser la règle pour que le 0 soit juste au début de la bande !', es: '¡Desliza la regla para que el 0 quede justo al inicio de la tira!', pt: 'Deslize a régua até o 0 encostar bem no começo da tira!' },
      sayWin: { en: 'Measured and wrapped! 🎀', de: 'Gemessen und eingepackt! 🎀', fr: 'Mesuré et emballé ! 🎀', es: '¡Medido y listo! 🎀', pt: 'Medido e embrulhado! 🎀' },
      sayOffShort: { en: 'The 0 wasn’t at the start — see, it reads one short. Slide it to the start!', de: 'Die 0 war nicht am Anfang — schau, jetzt misst du einen cm zu wenig. Schieb sie an den Anfang!', fr: 'Le 0 n’était pas au début — tu vois, ça mesure un cm de trop peu. Fais-le glisser jusqu’au début !', es: 'El 0 no estaba al inicio; mira, así mides un centímetro de menos. ¡Deslízala hasta el inicio!', pt: 'O 0 não estava no começo — deu um centímetro a menos. Deslize até encostar no começo!' },
      sayNotAligned: { en: 'The 0 isn’t at the start yet — line it up, then measure.', de: 'Die 0 ist noch nicht am Anfang — leg sie genau an, dann miss.', fr: 'Le 0 n’est pas encore au début — aligne-le, puis mesure.', es: 'El 0 todavía no está al inicio. Alinéalo justo ahí y luego mide.', pt: 'O 0 ainda não está no começo — encoste ele no começo e meça.' },
      sayRead: { en: 'Great — now read the number at the far end!', de: 'Super — jetzt lies die Zahl am anderen Ende ab!', fr: 'Super — maintenant lis le nombre à l’autre bout !', es: '¡Muy bien! Ahora lee el número en el otro extremo.', pt: 'Isso! Agora leia o número na outra ponta!' },
      sayMisread: { en: 'Look again at the far end — which number?', de: 'Schau noch mal ans andere Ende — welche Zahl?', fr: 'Regarde encore l’autre bout — quel nombre ?', es: 'Mira otra vez el otro extremo, ¿qué número es?', pt: 'Olhe de novo na outra ponta — qual número?' },
      sayAgain: { en: 'Hmm — let’s look again.', de: 'Hmm — schauen wir noch mal.', fr: 'Hmm — regardons encore.', es: 'Mmm… vamos a mirar otra vez.', pt: 'Hmm — vamos olhar de novo.' },
      howMany: { en: 'How many cm?', de: 'Wie viele cm?', fr: 'Combien de cm ?', es: '¿Cuántos cm?', pt: 'Quantos cm?' },
      diagZero: { en: 'Started at 1', de: 'Bei 1 angefangen', fr: 'Commencé à 1', es: 'Empezó en el 1', pt: 'Começou no 1' }, diagShort: { en: 'Too short', de: 'Zu kurz', fr: 'Trop courte', es: 'Muy corta', pt: 'Régua curta' }, diagEnd: { en: 'Wrong end', de: 'Falsches Ende', fr: 'Mauvais bout', es: 'Extremo equivocado', pt: 'Ponta errada' },
      hintCheck: { en: 'Line up 0 with the start, then read the far end.', de: 'Leg die 0 an den Anfang, dann lies das andere Ende ab.', fr: 'Aligne le 0 sur le début, puis lis l’autre bout.', es: 'Pon el 0 al inicio y luego lee el otro extremo.', pt: 'Encoste o 0 no começo e leia a outra ponta.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.rulerZero = 3; this.phase = 'place'; this.msg = null; this.served = 0; this._opts = null; this.dragging = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.msg = null; this._spoke = false; this.phase = 'place'; this.dragging = false;
      this.rulerZero = this.snap.initialZero;
      var tl = Core.trueLen(round);
      if (Core.ALIGN_COGS[round.cog] || Core.SPAN_COGS[round.cog]) this._opts = shuffle([tl - 1, tl, tl + 1].filter(function (v) { return v > 0; }));
      else if (Core.TOOL_COGS[round.cog]) this._opts = shuffle((round.tools || []).slice());
      else this._opts = round.diagOptions ? shuffle(round.diagOptions.slice()) : null;
    },

    _pPrompt: function (r) { return (r && r.promptL10n && r.promptL10n[LANG]) || (r && r.prompt) || this.api.t('prompt'); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'td-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round, s = this.snap;

      var say = api.el('div', 'td-saytop');
      say.innerHTML = '<span class="td-tildy' + (this.solved ? ' td-bounce' : '') + '">🧵</span><span class="td-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      this._renderShelf(root);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }

      var p = api.el('p', 'td-prompt'); p.textContent = this._pPrompt(r); root.appendChild(p);

      if (s.isAlign) this._renderAlign(root);
      else if (s.isSpan) this._renderSpan(root);
      else if (s.isDiagnose) this._renderDiagnose(root);
      else this._renderSelectTool(root);

      stage.appendChild(root);
      if (!this._spoke) { this._spoke = true; var _pp = this._pPrompt(r); setTimeout(function () { speak(_pp || ''); }, 280); }
    },

    _renderShelf: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 9;
      var b = api.el('div', 'td-shelf'); b.setAttribute('aria-hidden', 'true');
      var fill = Math.min(1, this.served / total);
      b.style.background = 'linear-gradient(90deg, #E7C9A0 ' + Math.round(fill * 100) + '%, #EFE6D6 ' + Math.round(fill * 100) + '%)';
      var k = api.el('span', 'td-parcel'); k.textContent = fill >= 1 ? '🎁🎀' : '🎀'; b.appendChild(k);
      root.appendChild(b);
    },

    /* ----- the ruler + strip SVG (align / span) ----- */
    _stageSvg: function (opts) {
      opts = opts || {}; var self = this, r = this.round, s = this.snap;
      var VW = cmX(TABLE) + MARGIN, VH = 56;
      var sv = svg('svg', { viewBox: '0 0 ' + VW + ' ' + VH, class: 'td-svg', 'aria-label': (LANG === 'es' ? 'una regla y una tira para medir' : LANG === 'de' ? 'ein Lineal und ein Streifen zum Messen' : LANG === 'fr' ? 'une règle et une bande à mesurer' : LANG === 'pt' ? 'uma régua e uma tira para medir' : 'a ruler and a strip to measure') });
      sv.style.aspectRatio = (VW / VH).toFixed(2);
      /* the table edge */
      sv.appendChild(svg('line', { x1: MARGIN, y1: 50, x2: cmX(TABLE), y2: 50, stroke: 'rgba(160,120,60,.4)', 'stroke-width': 0.6 }));
      /* the strip (the object being measured) */
      var sx0 = cmX(r.stripStart), sx1 = cmX(r.stripEnd);
      sv.appendChild(svg('rect', { x: sx0, y: 8, width: sx1 - sx0, height: 8, rx: 2, fill: C.STRIP, opacity: '0.9' }));
      /* the start marker (coral tick at the strip start) */
      sv.appendChild(svg('line', { x1: sx0, y1: 5, x2: sx0, y2: 19, stroke: C.CORAL, 'stroke-width': 1.4 }));
      /* the read-line at the far edge (no number of its own) */
      if (opts.showRead) sv.appendChild(svg('line', { x1: sx1, y1: 5, x2: sx1, y2: 47, stroke: C.CORAL2, 'stroke-width': 1, 'stroke-dasharray': '2 2' }));
      /* the RULER (draggable for align; fixed/broken for span) */
      var rz = opts.span ? r.stripStart - (r.brokenOrigin || 0) : this.rulerZero;   /* span: a broken ruler whose origin label is brokenOrigin sits under the strip */
      var rLen = s.rulerLen, rx0 = cmX(rz), rx1 = cmX(rz + rLen);
      var rg = svg('g', { class: 'td-ruler' + (opts.drag ? ' td-grab' : '') });
      rg.appendChild(svg('rect', { x: rx0, y: 24, width: rx1 - rx0, height: 20, rx: 2, fill: C.RULER, stroke: '#B89A52', 'stroke-width': 0.6 }));
      for (var i = 0; i <= rLen; i++) {
        var x = cmX(rz + i), big = (i % 5 === 0);
        rg.appendChild(svg('line', { x1: x, y1: 24, x2: x, y2: big ? 32 : 29, stroke: '#7a6536', 'stroke-width': big ? 0.8 : 0.5 }));
        var label = opts.span ? (i + (r.brokenOrigin || 0)) : i;
        if (big || rLen <= 12) { var t = svg('text', { x: x, y: 41, 'text-anchor': 'middle', 'font-size': 4.6, 'font-weight': 700, fill: '#5a4a22' }); t.textContent = label; rg.appendChild(t); }
        if (i === 0 && !opts.span) { rg.appendChild(svg('circle', { cx: x, cy: 28, r: 2.2, fill: C.CORAL })); }   /* the prominent ZERO mark */
      }
      sv.appendChild(rg);

      /* drag handling for align (drag the ruler → set rulerZero, snap to integer).
         Keep a live handle to the ruler group + the zero it was drawn at, so the drag
         can SLIDE it via transform — NEVER a full render mid-gesture (that detaches the
         pointer-captured <g> + this closure's `sv`, killing the slide). See winter-piles. */
      if (opts.drag) {
        self._rulerG = rg; self._rulerBaseZero = rz;
        function toCm(ev) { var rect = sv.getBoundingClientRect(); var px = ((ev.clientX - rect.left) / rect.width) * VW; return Math.round((px - MARGIN) / CMW); }
        var grabDx = 0;
        rg.addEventListener('pointerdown', function (ev) { ev.preventDefault(); self.dragging = true; grabDx = toCm(ev) - self.rulerZero; try { rg.setPointerCapture(ev.pointerId); } catch (e) {} });
        rg.addEventListener('pointermove', function (ev) { if (!self.dragging) return; var z = toCm(ev) - grabDx; self._setRulerZero(z); });
        rg.addEventListener('pointerup', function (ev) { self.dragging = false; self.render(); });
        rg.addEventListener('pointercancel', function () { self.dragging = false; self.render(); });
      }
      return sv;
    },

    _renderAlign: function (root) {
      var self = this, api = this.api;
      var stage = api.el('div', 'td-stage');
      stage.appendChild(this._stageSvg({ drag: this.phase === 'place', showRead: this.phase === 'read' }));
      root.appendChild(stage);

      if (this.phase === 'place') {
        var m = api.el('button', 'td-measure'); m.type = 'button'; m.textContent = api.t('measureIt');
        m.addEventListener('click', function () { self._measureIt(); });
        root.appendChild(m);
      } else {
        var lab = api.el('div', 'td-counthint'); lab.textContent = api.t('sayRead'); root.appendChild(lab);
        this._renderValueChips(root);
      }
    },

    _renderSpan: function (root) {
      var api = this.api;
      var stage = api.el('div', 'td-stage');
      stage.appendChild(this._stageSvg({ span: true, showRead: true }));
      root.appendChild(stage);
      var lab = api.el('div', 'td-counthint'); lab.textContent = api.t('howMany'); root.appendChild(lab);
      this._renderValueChips(root);
    },

    _renderValueChips: function (root) {
      var self = this, api = this.api;
      var opts = api.el('div', 'td-options');
      (this._opts || []).forEach(function (v) {
        var b = api.el('button', 'td-opt'); b.type = 'button'; b.textContent = v + ' cm';
        b.addEventListener('click', function () { self._tapValue(v); });
        opts.appendChild(b);
      });
      root.appendChild(opts);
    },

    _renderDiagnose: function (root) {
      var self = this, api = this.api, r = this.round;
      /* show the wrong measurement (Tildy's ruler at the 1) */
      var stage = api.el('div', 'td-stage');
      this.rulerZero = r.initialZero;
      stage.appendChild(this._stageSvg({ showRead: true }));
      root.appendChild(stage);
      var opts = api.el('div', 'td-options td-diagopts');
      var labels = { 'zero-not-at-start': api.t('diagZero'), 'ruler-too-short': api.t('diagShort'), 'read-wrong-end': api.t('diagEnd') };
      (this._opts || []).forEach(function (d) {
        var b = api.el('button', 'td-opt td-optword'); b.type = 'button'; b.textContent = labels[d] || d;
        b.addEventListener('click', function () { self._chooseDiag(d); });
        opts.appendChild(b);
      });
      root.appendChild(opts);
    },

    _renderSelectTool: function (root) {
      var self = this, api = this.api, r = this.round;
      /* the strip + the tool choices (by length) */
      var stage = api.el('div', 'td-stage');
      this.rulerZero = -99;   /* no ruler placed yet */
      var sv = svg('svg', { viewBox: '0 0 ' + (cmX(TABLE) + MARGIN) + ' 26', class: 'td-svg td-svgstrip', 'aria-label': (LANG === 'es' ? 'una tira para medir' : LANG === 'de' ? 'ein Streifen zum Messen' : LANG === 'fr' ? 'une bande à mesurer' : LANG === 'pt' ? 'uma tira para medir' : 'a strip to measure') });
      sv.style.aspectRatio = ((cmX(TABLE) + MARGIN) / 26).toFixed(2);
      sv.appendChild(svg('line', { x1: MARGIN, y1: 20, x2: cmX(TABLE), y2: 20, stroke: 'rgba(160,120,60,.4)', 'stroke-width': 0.6 }));
      sv.appendChild(svg('rect', { x: cmX(r.stripStart), y: 8, width: cmX(r.stripEnd) - cmX(r.stripStart), height: 8, rx: 2, fill: C.STRIP, opacity: '0.9' }));
      stage.appendChild(sv); root.appendChild(stage);
      var opts = api.el('div', 'td-options');
      (this._opts || []).forEach(function (L) {
        var b = api.el('button', 'td-opt td-optword'); b.type = 'button'; b.textContent = (LANG === 'es' ? ('regla de ' + L + ' cm') : LANG === 'de' ? ('Lineal ' + L + ' cm') : LANG === 'fr' ? ('règle de ' + L + ' cm') : LANG === 'pt' ? ('régua de ' + L + ' cm') : (L + '-cm ruler'));
        b.addEventListener('click', function () { self._chooseTool(L); });
        opts.appendChild(b);
      });
      root.appendChild(opts);
    },

    _renderDone: function (root) {
      var api = this.api;
      var d = api.el('div', 'td-done');
      d.innerHTML = '<span class="td-flare">🎀</span><span class="td-donetext">' + esc(this.msg || api.t('sayWin')) + '</span>';
      root.appendChild(d);
    },

    /* ---------- interaction ---------- */
    _setRulerZero: function (cm) {
      this.rulerZero = Math.max(0, Math.min(TABLE - (this.snap.rulerLen), cm));
      this.msg = null;
      if (this.dragging && this._rulerG) {
        /* slide the EXISTING ruler group — no re-render, so pointer capture survives */
        this._rulerG.setAttribute('transform', 'translate(' + ((this.rulerZero - this._rulerBaseZero) * CMW) + ' 0)');
      } else {
        this.render();
      }
    },
    _measureIt: function () {
      var api = this.api, r = this.round;
      var ev = Core.evaluate(r, this.rulerZero, -1, true);
      if (ev.status === 'zero-not-at-start') {
        /* the off-by-one / mis-align consequence — warm, no red; re-place */
        var off = this.rulerZero === r.stripStart + 1;
        this.msg = off ? api.t('sayOffShort') : api.t('sayNotAligned');
        api.sound && api.sound(360); this.render(); api.announce && api.announce(this.msg);
        return;
      }
      this.phase = 'read'; this.msg = api.t('sayRead'); api.sound && api.sound(720); this.render();
    },
    _tapValue: function (v) {
      var api = this.api, r = this.round;
      var ok = Core.SPAN_COGS[r.cog] ? Core.gradeSpan(r, v) : Core.gradeAlign(r, this.rulerZero, v);
      if (ok) { this._correct(); return; }
      this.msg = api.t(Core.SPAN_COGS[r.cog] ? 'sayAgain' : 'sayMisread'); api.sound && api.sound(360); this.render();
    },
    _chooseDiag: function (d) {
      var api = this.api;
      if (Core.gradeDiagnose(this.round, d)) { this._correct(); return; }
      this.msg = api.t('sayAgain'); this._opts = this.round.diagOptions ? shuffle(this.round.diagOptions.slice()) : this._opts;
      api.sound && api.sound(360); this.render();
    },
    _chooseTool: function (L) {
      var api = this.api;
      if (Core.gradeSelectTool(this.round, L)) { this._correct(); return; }
      this.msg = api.t('sayAgain'); api.sound && api.sound(360); this.render();
    },
    _correct: function () {
      var api = this.api;
      this.solved = true; this.served = Math.min(this.served + 1, (this._pool && this._pool.length) || 9);
      this.msg = api.t('sayWin');
      api.sound && api.sound(880);
      setTimeout(function () { speak(LANG === 'es' ? '¡Medido!' : LANG === 'de' ? 'Gemessen!' : LANG === 'fr' ? 'Mesuré !' : LANG === 'pt' ? 'Medido!' : 'Measured!'); }, 160);
      this.render(); api.announce && api.announce(this.msg);
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
      fetch('/mini-tools/tildy-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { var c = JSON.parse(JSON.stringify(r)); c.unitSystem = row.params.unitSystem || 'cm'; return c; }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[tildy] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.td-root{position:relative;width:100%;max-width:min(96vw,620px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#F1E7D6);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);box-sizing:border-box;}'
        + '.td-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.td-saytext{min-width:0;overflow-wrap:break-word;}.td-tildy{font-size:clamp(18px,4.4vw,24px);flex:0 0 auto;}.td-bounce{animation:tdBounce .5s ease;}'
        + '@keyframes tdBounce{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.td-shelf{position:relative;height:11px;border-radius:6px;overflow:hidden;}.td-parcel{position:absolute;right:5px;top:-3px;font-size:13px;}'
        + '.td-prompt{margin:0;text-align:center;font:700 clamp(11.5px,2.9vw,14px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';min-width:0;overflow-wrap:break-word;}'
        + '.td-stage{display:flex;justify-content:center;background:rgba(160,120,60,.06);border-radius:12px;padding:clamp(4px,1.2vw,8px);}'
        + '.td-svg{width:100%;max-width:100%;max-height:clamp(96px,18vh,138px);height:auto;display:block;touch-action:none;}'
        + '.td-svgstrip{max-height:clamp(54px,10vh,76px);}'
        + '.td-ruler.td-grab{cursor:grab;}.td-ruler.td-grab:active{cursor:grabbing;}'
        + '.td-counthint{text-align:center;font:700 clamp(11px,2.8vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;overflow-wrap:break-word;}'
        + '.td-measure{align-self:center;min-height:48px;padding:0 clamp(20px,5.5vw,30px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.td-measure:active{transform:translateY(2px);}.td-measure:focus-visible,.td-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.td-options{display:flex;gap:clamp(6px,1.8vw,12px);justify-content:center;flex-wrap:wrap;}'
        + '.td-opt{min-width:56px;min-height:50px;border:2px solid rgba(20,107,94,.4);border-radius:13px;background:#fff;padding:4px 14px;cursor:pointer;touch-action:manipulation;color:' + C.T + ';font:800 clamp(15px,3.8vw,19px)/1 "Baloo 2",sans-serif;box-shadow:0 2px 0 rgba(20,107,94,.14);}'
        + '.td-optword{font-size:clamp(11.5px,2.9vw,14px);}.td-opt:active{transform:translateY(1px);}'
        + '.td-done{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px;}.td-flare{font-size:clamp(30px,8vw,46px);animation:tdFlare .6s ease;}.td-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '@keyframes tdFlare{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        + '@media (min-width:760px){.td-root{padding:11px 14px;}.td-svg{max-height:clamp(96px,15vh,128px);}}'
        + '@media (max-width:480px){.td-root{gap:4px;padding:8px;}}'
        + '@media (max-width:380px){.td-root{gap:3px;padding:6px;}.td-prompt{font-size:11px;line-height:1.15;}.td-svg{max-height:clamp(82px,17vh,108px);}.td-shelf{height:8px;}.td-saytop{font-size:10.5px;}.td-measure{min-height:44px;}.td-opt{min-height:44px;padding:4px 9px;}.td-options{gap:5px;}}'
        + '@media (prefers-reduced-motion: reduce){.td-bounce,.td-flare{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-tildy', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'tildy.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
