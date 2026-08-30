/* =====================================================================
   SPROCKET'S CLOCK — ELAPSED TIME — ACTIVITY SKIN  (clock-elapsed-activity.js)
   ---------------------------------------------------------------------
   3.MD.A.1 (elapsed clause) · read the START analog clock, count on the
   duration, tap the END time (of 3 digital cards). The lcs-shell skin over
   clock-elapsed-core.js. answerType:'state'. EN-ONLY pilot (404 non-EN). The
   first TIME-EXPANSION *operation* engine. Re-implements the clock SVG +
   handAngles (0 lines to any core / clock-digital-* / lcs-shell / game-shell).
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ClockElapsedCore;
  var NS = 'http://www.w3.org/2000/svg';
  var C = { FACE: '#FFFDF6', RIM: '#146B5E', TICK: '#0F4A40', HOUR: '#146B5E', MIN: '#F2784B', NUM: '#0F4A40' };

  var LANG = 'en';
  var L = {
    en: {
      q: 'What time will it be in {n} minutes?',
      qBack: 'What time was it {n} minutes ago?',
      win: 'Yes! {start} + {n} min = {end}.',
      winBack: 'Yes! {start} − {n} min = {end}.',
      hint: 'Start at the clock, then count on the minutes.',
      hintBack: 'Start at the clock, then count back the minutes.'
    },
    de: {
      q: 'Wie spät ist es in {n} Minuten?',
      qBack: 'Wie spät war es vor {n} Minuten?',
      win: 'Genau! {start} + {n} Min = {end}.',
      winBack: 'Genau! {start} − {n} Min = {end}.',
      hint: 'Beginne bei der Uhr und zähle dann die Minuten weiter.',
      hintBack: 'Beginne bei der Uhr und zähle dann die Minuten zurück.'
    },
    fr: {
      q: 'Quelle heure sera-t-il dans {n} minutes ?',
      qBack: 'Quelle heure était-il il y a {n} minutes ?',
      win: 'Oui ! {start} + {n} min = {end}.',
      winBack: 'Oui ! {start} − {n} min = {end}.',
      hint: 'Commence à l’horloge, puis compte les minutes.',
      hintBack: 'Commence à l’horloge, puis compte les minutes en arrière.'
    },
    es: {
      q: '¿Qué hora será en {n} minutos?',
      qBack: '¿Qué hora era hace {n} minutos?',
      win: '¡Exacto! {start} + {n} min = {end}.',
      winBack: '¡Exacto! {start} − {n} min = {end}.',
      hint: 'Empieza en el reloj y cuenta los minutos hacia adelante.',
      hintBack: 'Empieza en el reloj y cuenta los minutos hacia atrás.'
    },
    pt: {
      q: 'Que horas vão ser daqui a {n} minutos?',
      qBack: 'Que horas eram {n} minutos atrás?',
      win: 'Isso! {start} + {n} min = {end}.',
      winBack: 'Isso! {start} − {n} min = {end}.',
      hint: 'Comece no relógio e conte os minutos para a frente.',
      hintBack: 'Comece no relógio e conte os minutos para trás.'
    },
    it: {
      q: 'Che ora sarà tra {n} minuti?',
      qBack: 'Che ora era {n} minuti fa?',
      win: 'Sì! {start} + {n} min = {end}.',
      winBack: 'Sì! {start} − {n} min = {end}.',
      hint: 'Guarda che ora segna la lancetta, poi conta avanti i minuti.',
      hintBack: 'Guarda che ora segna la lancetta, poi conta indietro i minuti.'
    },
    nl: {
      q: 'Hoe laat is het over {n} minuten?',
      qBack: 'Hoe laat was het {n} minuten geleden?',
      win: 'Ja! {start} + {n} min = {end}.',
      winBack: 'Ja! {start} − {n} min = {end}.',
      hint: 'Kijk op de klok en tel dan de minuten verder.',
      hintBack: 'Kijk op de klok en tel dan de minuten terug.'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function elNS(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }
  function wrapH(n) { return n > 12 ? n - 12 : n; }
  /* a friendly spoken-time phrase for the aria / sr (locale-aware: German „N Uhr" / „halb (N+1)" / „Viertel nach·vor" — reused from clock-digital #8) */
  function spoken(t) {
    var hh = t.h, mm = t.m;
    if (LANG === 'es') {
      var HRS = ['', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];
      var art = (hh === 1) ? 'la' : 'las';
      if (mm === 0) return art + ' ' + HRS[hh] + ' en punto';
      if (mm === 30) return art + ' ' + HRS[hh] + ' y media';
      if (mm === 15) return art + ' ' + HRS[hh] + ' y cuarto';
      if (mm === 45) { var nx = (hh === 12 ? 1 : hh + 1); return 'un cuarto para ' + (nx === 1 ? 'la' : 'las') + ' ' + HRS[nx]; }
      return art + ' ' + Core.digitalStr(t);
    }
    if (LANG === 'de') {
      if (mm === 0) return hh + ' Uhr';
      if (mm === 30) return 'halb ' + wrapH(hh + 1);
      if (mm === 15) return 'Viertel nach ' + hh;
      if (mm === 45) return 'Viertel vor ' + wrapH(hh + 1);
      return Core.digitalStr(t);
    }
    if (LANG === 'fr') {
      if (mm === 0) return hh + (hh === 1 ? ' heure' : ' heures');
      if (mm === 30) return hh + (hh === 1 ? ' heure et demie' : ' heures et demie');
      if (mm === 15) return hh + (hh === 1 ? ' heure et quart' : ' heures et quart');
      if (mm === 45) { var nh = (hh === 12 ? 1 : hh + 1); return nh + (nh === 1 ? ' heure moins le quart' : ' heures moins le quart'); }
      return Core.digitalStr(t);
    }
    if (LANG === 'pt') {
      var HRS_PT = ['', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze'];
      var MIN_PT = { 5: 'cinco', 10: 'dez', 20: 'vinte', 25: 'vinte e cinco', 35: 'trinta e cinco', 40: 'quarenta', 50: 'cinquenta', 55: 'cinquenta e cinco' };
      var nxp = (hh === 12 ? 1 : hh + 1);
      if (mm === 0) return HRS_PT[hh] + (hh === 1 ? ' hora' : ' horas');
      if (mm === 30) return HRS_PT[hh] + ' e meia';
      if (mm === 15) return HRS_PT[hh] + ' e quinze';
      if (mm === 45) return 'quinze para ' + (nxp === 1 ? 'a uma' : 'as ' + HRS_PT[nxp]);
      return HRS_PT[hh] + ' e ' + (MIN_PT[mm] || String(mm));
    }
    if (LANG === 'it') {
      /* Italian l'ora: current-hour + half, subtractive quarter-to, additive minutes.
         ⚠ h=1 → «l'una» carries an apostrophe → fall back to the digital string (matches the visible card). */
      if (hh === 1) return Core.digitalStr(t);
      var HRS_IT = ['', 'una', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici'];
      var MIN_IT = { 5: 'cinque', 10: 'dieci', 20: 'venti', 25: 'venticinque', 35: 'trentacinque', 40: 'quaranta', 50: 'cinquanta', 55: 'cinquantacinque' };
      if (mm === 0) return 'le ' + HRS_IT[hh];
      if (mm === 30) return 'le ' + HRS_IT[hh] + ' e mezza';
      if (mm === 15) return 'le ' + HRS_IT[hh] + ' e un quarto';
      if (mm === 45) { var nxi = (hh === 12 ? 1 : hh + 1); return nxi === 1 ? Core.digitalStr(t) : 'le ' + HRS_IT[nxi] + ' meno un quarto'; }
      return 'le ' + HRS_IT[hh] + ' e ' + (MIN_IT[mm] || mm);
    }
    if (LANG === 'nl') {
      /* Netherlands-Dutch: „N uur" / „half (N+1)" (points to the NEXT hour: half 4 = 3:30) / „kwart over·voor". */
      if (mm === 0) return hh + ' uur';
      if (mm === 30) return 'half ' + wrapH(hh + 1);
      if (mm === 15) return 'kwart over ' + hh;
      if (mm === 45) return 'kwart voor ' + wrapH(hh + 1);
      return Core.digitalStr(t);
    }
    if (mm === 0) return hh + " o'clock";
    if (mm === 30) return 'half past ' + hh;
    if (mm === 15) return 'quarter past ' + hh;
    if (mm === 45) return 'quarter to ' + (hh === 12 ? 1 : hh + 1);
    return Core.digitalStr(t);
  }

  function clockSVG(h, m) {
    var svg = elNS('svg', { viewBox: '0 0 100 100', class: 'ce-clock', role: 'img', 'aria-label': (LANG === 'es' ? 'carátula del reloj' : LANG === 'de' ? 'Zifferblatt' : LANG === 'fr' ? 'cadran de l’horloge' : LANG === 'pt' ? 'mostrador do relógio' : LANG === 'nl' ? 'wijzerplaat' : 'clock face') });
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 46, fill: C.FACE, stroke: C.RIM, 'stroke-width': 3.5 }));
    for (var n = 1; n <= 12; n++) {
      var a = n * 30 * Math.PI / 180;
      var x1 = 50 + 42 * Math.sin(a), y1 = 50 - 42 * Math.cos(a);
      var x2 = 50 + 37 * Math.sin(a), y2 = 50 - 37 * Math.cos(a);
      svg.appendChild(elNS('line', { x1: x1.toFixed(2), y1: y1.toFixed(2), x2: x2.toFixed(2), y2: y2.toFixed(2), stroke: C.TICK, 'stroke-width': 2, 'stroke-linecap': 'round' }));
      var nx = 50 + 32 * Math.sin(a), ny = 50 - 32 * Math.cos(a);
      var tx = elNS('text', { x: nx.toFixed(2), y: ny.toFixed(2), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.NUM, 'font-family': 'Baloo 2,Nunito,sans-serif', 'font-weight': '800', 'font-size': '9' });
      tx.textContent = String(n);
      svg.appendChild(tx);
    }
    var ang = Core.handAngles(h, m);
    /* minute hand (LONG, thin, coral) */
    svg.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 14, stroke: C.MIN, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + ang.minute.toFixed(2) + ' 50 50)' }));
    /* hour hand (SHORT ~55%, thick, teal) */
    svg.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 30, stroke: C.HOUR, 'stroke-width': 4.8, 'stroke-linecap': 'round', transform: 'rotate(' + ang.hour.toFixed(2) + ' 50 50)' }));
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 3.4, fill: C.RIM }));
    return svg;
  }

  function sprocketSVG() {
    /* Sprocket — a rooster (red comb + wattle, orange beak), the time mascot */
    return '<svg class="ce-sprocket-svg" viewBox="0 0 48 46" width="40" height="38" aria-hidden="true">' +
      '<path d="M14 12 q3 -7 6 0 q3 -7 6 0 q3 -6 5 1" fill="#E2574B" stroke="#B5392F" stroke-width="1.2"/>' +
      '<circle cx="24" cy="26" r="13" fill="#F0CE8C" stroke="#B98A3C" stroke-width="1.6"/>' +
      '<path d="M11 26 l-7 3 l7 3z" fill="#E8A93A" stroke="#C2790F" stroke-width="1"/>' +
      '<path d="M11 33 q-2 4 1 6" fill="none" stroke="#E2574B" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g class="ce-eyes-open"><circle cx="18" cy="23" r="2" fill="#2B2B2B"/></g>' +
      '<g class="ce-eyes-happy"><path d="M16 23 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M36 22 q9 4 5 16 q-6 -2 -9 -9z" fill="#3E7C5A" stroke="#2A5740" stroke-width="1.2"/></svg>';
  }

  var ClockElapsedActivity = {
    id: 'clock-elapsed-activity',
    strings: {
      title: { en: "Sprocket's Clock", de: 'Sprockets Uhr — Zeitspannen', fr: 'L’horloge de Sprocket', es: 'El reloj de Sprocket', pt: 'O Relógio do Sprocket', it: 'Che ora sarà?', nl: 'Sprockets klok' },
      instruction: { en: 'Read the start time, then count on the minutes.', de: 'Lies die Startzeit ab und zähle dann die Minuten weiter.', fr: 'Lis l’heure de départ, puis compte les minutes.', es: 'Lee la hora de inicio y luego cuenta los minutos hacia adelante.', pt: 'Leia a hora inicial e conte os minutos para a frente.', it: 'Leggi che ora segna la lancetta, poi conta avanti i minuti.', nl: 'Lees de begintijd en tel dan de minuten verder.' },
      q: { en: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._round = null; this._resolved = false; this._token = 0;
      this._nonAns = {}; this._lit = -1; this._optOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('ce-style')) return;
      var s = el('style'); s.id = 'ce-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.ce-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,460px);margin:0 auto;}',
        '.ce-clock{width:min(50vw,175px);height:auto;display:block;}',
        '.ce-duration{font:800 1.15rem/1.2 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;text-align:center;margin:0;max-width:340px;}',
        '.ce-row{display:flex;gap:9px;width:100%;justify-content:center;}',
        '.ce-choice{flex:1 1 0;min-width:0;max-width:128px;min-height:54px;border:3px solid #C9B98E;border-radius:14px;background:#FFFDF6;cursor:pointer;display:flex;align-items:center;justify-content:center;font:800 1.5rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;padding:8px 6px;}',
        '.ce-choice.dim{opacity:.4;}',
        '.ce-choice.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.ce-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:34px;}',
        '.ce-sprocket{flex:0 0 auto;line-height:0;}',
        '.ce-msg{flex:0 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;max-width:320px;}',
        '.ce-msg.miss{color:#C2410C;}',
        '.ce-sprocket-svg .ce-eyes-happy{display:none;}.ce-sprocket[data-pose=happy] .ce-eyes-open{display:none;}.ce-sprocket[data-pose=happy] .ce-eyes-happy{display:block;}',
        '.ce-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.ce-root{gap:7px;}.ce-clock{width:44vw;}.ce-duration{font-size:1.02rem;}.ce-row{gap:7px;}.ce-choice{font-size:1.3rem;min-height:50px;}}',
        '.lcs-app:not(.sprocket-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'clock-elapsed.what-time.3-md-a-1';
      var tries = ['/mini-tools/clock-elapsed-activities.json', 'clock-elapsed-activities.json', '../mini tools/clock-elapsed-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && row.params.rounds) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var self = this, order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = self._shuffle(pool.map(function (_, i) { return i; })); }
      return order;
    },
    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      var n = Math.abs(round.deltaMin);
      var promptText = round.deltaMin < 0 ? txt('qBack', { n: n }) : txt('q', { n: n });
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: promptText }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonAns = {}; this._lit = -1;
      this._optOrder = this._shuffle((round.options || []).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('sprocket-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var self = this, tok = this._token;
      var root = el('div', 'ce-root');

      root.appendChild(clockSVG(round.start.h, round.start.m));
      /* the duration question is carried by the shell prompt (promptArgs.q) — no duplicate line here */

      var row = el('div', 'ce-row');
      var order = this._optOrder || (round.options || []).map(function (_, i) { return i; });
      order.forEach(function (oi) {
        var t = round.options[oi];
        var b = el('button', 'ce-choice' + (self._nonAns[oi] ? ' dim' : '') + (self._lit === oi ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-oi', oi); b.setAttribute('aria-label', spoken(t));
        b.textContent = Core.digitalStr(t);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonAns[oi] || self._token !== tok) return;
          if (Core.isAnswer(round, oi)) { self._lit = oi; self._resolve(); }
          else { self._nonAns[oi] = 1; self._nudge(); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);

      var say = el('div', 'ce-say');
      var sp = el('div', 'ce-sprocket'); sp.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); sp.innerHTML = sprocketSVG();
      var msg = el('p', 'ce-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(sp, msg); root.appendChild(say); this._sprocket = sp;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function () {
      this._resolved = true;
      if (this._app) this._app.classList.add('sprocket-resolved');
      var round = this._round;
      this.render();
      var line = this._api.stage.querySelector('.ce-msg');
      var n = Math.abs(round.deltaMin);
      var args = { n: n, start: Core.digitalStr(round.start), end: Core.digitalStr(Core.endTime(round.start, round.deltaMin)) };
      var note = round.deltaMin < 0 ? txt('winBack', args) : txt('win', args);
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function () {
      var msgText = txt((this._round && this._round.deltaMin < 0) ? 'hintBack' : 'hint');
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.ce-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'ce-sronly'); wrap.setAttribute('aria-live', 'polite');
      var cs = (round.options || []).map(function (t) { return Core.digitalStr(t); }).join(', ');
      var n = Math.abs(round.deltaMin);
      var qText = round.deltaMin < 0 ? txt('qBack', { n: n }) : txt('q', { n: n });
      wrap.innerHTML = (LANG === 'es')
        ? '<p>El reloj marca ' + spoken(round.start) + '. ' + qText + ' Las opciones son: ' + cs + '.</p>'
        : (LANG === 'de')
        ? '<p>Die Uhr zeigt ' + spoken(round.start) + '. ' + qText + ' Zur Auswahl stehen: ' + cs + '.</p>'
        : (LANG === 'fr')
        ? '<p>L’horloge indique ' + spoken(round.start) + '. ' + qText + ' Les choix sont : ' + cs + '.</p>'
        : (LANG === 'pt')
        ? '<p>O relógio marca ' + spoken(round.start) + '. ' + qText + ' As opções são: ' + cs + '.</p>'
        : (LANG === 'it')
        ? '<p>Sono ' + spoken(round.start) + '. ' + qText + ' Le opzioni sono: ' + cs + '.</p>'
        : (LANG === 'nl')
        ? '<p>De klok wijst ' + spoken(round.start) + ' aan. ' + qText + ' De keuzes zijn: ' + cs + '.</p>'
        : '<p>The clock shows ' + spoken(round.start) + '. ' + qText + ' The choices are: ' + cs + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.ClockElapsedActivity = ClockElapsedActivity;

}(typeof window !== 'undefined' ? window : this));
