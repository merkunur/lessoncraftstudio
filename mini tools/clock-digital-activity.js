/* =====================================================================
   SPROCKET'S CLOCK — READ ANALOG → DIGITAL — ACTIVITY SKIN  (clock-digital-activity.js)
   ---------------------------------------------------------------------
   1.MD.B.3 (+2.MD.C.7 / 3.MD.A.1 by granularity) · read the analog clock, tap
   the matching DIGITAL time. The lcs-shell skin over clock-digital-core.js.
   answerType:'state'. EN-ONLY pilot (404 non-EN). The TIME-EXPANSION engine —
   reused by the reading + matching granularity variants. 0 lines to any core /
   lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ClockDigitalCore;
  var NS = 'http://www.w3.org/2000/svg';
  var C = { FACE: '#FFFDF6', RIM: '#146B5E', TICK: '#0F4A40', HOUR: '#146B5E', MIN: '#F2784B', NUM: '#0F4A40' };

  var L = {
    en: {
      q: 'What time is it?',
      qMatch: 'Which clock shows this time?',
      win: 'Yes! {t}.',
      hint: 'Look where the short hand points — that is the hour.',
      hintMatch: 'Find the clock whose hands show this time.',
      hintMin: 'Read both hands — the long hand tells the minutes.',
      hintFive: 'Count by fives around the clock — the long hand tells the minutes.',
      hintMinute: 'Count the little marks — each one is a minute.',
      srMatchBody: ' The time is {t}. The clocks show: {cs}.',
      srReadBody: ' The clock shows {t}. The choices are: {ds}.'
    },
    de: {
      q: 'Wie spät ist es?',
      qMatch: 'Welche Uhr zeigt diese Uhrzeit?',
      win: 'Genau! {t}.',
      hint: 'Schau, wohin der kleine Zeiger zeigt – das ist die Stunde.',
      hintMatch: 'Finde die Uhr, deren Zeiger diese Uhrzeit zeigen.',
      hintMin: 'Lies beide Zeiger – der große Zeiger zeigt die Minuten.',
      hintFive: 'Zähl in Fünferschritten um die Uhr – der große Zeiger zeigt die Minuten.',
      hintMinute: 'Zähl die kleinen Striche – jeder ist eine Minute.',
      srMatchBody: ' Die Uhrzeit ist {t}. Die Uhren zeigen: {cs}.',
      srReadBody: ' Die Uhr zeigt {t}. Zur Auswahl: {ds}.'
    },
    /* FR — native ensemble (linguiste + pédagogue CE1). « horloge à aiguilles » /
       petite (heures) + grande (minutes) aiguille / « l'heure pile » / « et demie ». */
    fr: {
      q: 'Quelle heure est-il ?',
      qMatch: 'Quelle horloge montre cette heure ?',
      win: 'Oui ! Il est {t}.',
      hint: 'Regarde la petite aiguille : elle indique l\'heure.',
      hintMatch: 'Trouve l\'horloge dont les aiguilles montrent cette heure.',
      hintMin: 'Regarde les deux aiguilles : la grande aiguille indique les minutes.',
      hintFive: 'Compte de 5 en 5 autour de l\'horloge : la grande aiguille indique les minutes.',
      hintMinute: 'Compte les petits traits : chacun vaut une minute.',
      srMatchBody: ' Il est {t}. Les horloges montrent : {cs}.',
      srReadBody: ' L\'horloge montre {t}. Les choix sont : {ds}.'
    }
  };
  var LANG = 'en';
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function elNS(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }
  function wrapH(n) { return n > 12 ? n - 12 : n; }
  /* Digital-time chip/readout format. FR writes « 3 h 30 » (lowercase h, spaces,
     keep 00, NO colon — the Anglo-Saxon „3:30" is wrong for a French child);
     en/de keep the core's colon form. 0 lines to the core. */
  function fmtDigital(t) { return LANG === 'fr' ? (t.h + ' h ' + (t.m < 10 ? '0' : '') + t.m) : Core.digitalStr(t); }
  /* a friendly spoken-time phrase for the win note / aria / sr (locale-aware: German uses „N Uhr" / „halb (N+1)" / „Viertel nach·vor"; French „N heures et demie") */
  function spoken(t) {
    var hh = t.h, mm = t.m;
    if (LANG === 'fr') {
      if (mm === 0) return hh + (hh === 1 ? ' heure' : ' heures');                 /* « 3 heures », « 1 heure », « 12 heures » (douze, not midi) */
      if (mm === 30) return hh + (hh === 1 ? ' heure et demie' : ' heures et demie'); /* feminine „demie" (agrees with heure) */
      if (mm === 15) return hh + (hh === 1 ? ' heure et quart' : ' heures et quart');
      if (mm === 45) { var n = wrapH(hh + 1); return n + (n === 1 ? ' heure moins le quart' : ' heures moins le quart'); }
      return fmtDigital(t);
    }
    if (LANG === 'de') {
      if (mm === 0) return hh + ' Uhr';
      if (mm === 30) return 'halb ' + wrapH(hh + 1);
      if (mm === 15) return 'Viertel nach ' + hh;
      if (mm === 45) return 'Viertel vor ' + wrapH(hh + 1);
      return Core.digitalStr(t);
    }
    if (mm === 0) return hh + " o'clock";
    if (mm === 30) return 'half past ' + hh;
    if (mm === 15) return 'quarter past ' + hh;
    if (mm === 45) return 'quarter to ' + (hh === 12 ? 1 : hh + 1);
    return Core.digitalStr(t);
  }

  function clockSVG(h, m, opts) {
    var svg = elNS('svg', { viewBox: '0 0 100 100', class: 'cd-clock', role: 'img', 'aria-label': 'clock face' });
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 46, fill: C.FACE, stroke: C.RIM, 'stroke-width': 3.5 }));
    /* minute-tick ring (only for the to-the-minute activity): 48 fine marks at the non-5 positions */
    if (opts && opts.minuteTicks) {
      for (var mm = 0; mm < 60; mm++) {
        if (mm % 5 === 0) continue;
        var ma = mm * 6 * Math.PI / 180;
        svg.appendChild(elNS('line', {
          x1: (50 + 46 * Math.sin(ma)).toFixed(2), y1: (50 - 46 * Math.cos(ma)).toFixed(2),
          x2: (50 + 43.5 * Math.sin(ma)).toFixed(2), y2: (50 - 43.5 * Math.cos(ma)).toFixed(2),
          stroke: C.TICK, 'stroke-width': 0.7, 'stroke-linecap': 'round'
        }));
      }
    }
    /* 12 hour ticks + numerals */
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
    /* minute hand (LONG, thin, coral) — reaches toward the numbers (length 36) */
    svg.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 14, stroke: C.MIN, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + ang.minute.toFixed(2) + ' 50 50)' }));
    /* hour hand (SHORT, thick, teal) — clearly ~55% of the minute hand (length 20) so the short/long cue is unmistakable */
    svg.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 30, stroke: C.HOUR, 'stroke-width': 4.8, 'stroke-linecap': 'round', transform: 'rotate(' + ang.hour.toFixed(2) + ' 50 50)' }));
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 3.4, fill: C.RIM }));
    return svg;
  }

  function sprocketSVG() {
    /* Sprocket — a rooster (red comb + wattle, orange beak), crows the hours */
    return '<svg class="cd-sprocket-svg" viewBox="0 0 48 46" width="40" height="38" aria-hidden="true">' +
      '<path d="M14 12 q3 -7 6 0 q3 -7 6 0 q3 -6 5 1" fill="#E2574B" stroke="#B5392F" stroke-width="1.2"/>' +   /* comb */
      '<circle cx="24" cy="26" r="13" fill="#F0CE8C" stroke="#B98A3C" stroke-width="1.6"/>' +
      '<path d="M11 26 l-7 3 l7 3z" fill="#E8A93A" stroke="#C2790F" stroke-width="1"/>' +   /* beak (left) */
      '<path d="M11 33 q-2 4 1 6" fill="none" stroke="#E2574B" stroke-width="2.4" stroke-linecap="round"/>' +   /* wattle */
      '<g class="cd-eyes-open"><circle cx="18" cy="23" r="2" fill="#2B2B2B"/></g>' +
      '<g class="cd-eyes-happy"><path d="M16 23 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M36 22 q9 4 5 16 q-6 -2 -9 -9z" fill="#3E7C5A" stroke="#2A5740" stroke-width="1.2"/></svg>';   /* tail */
  }

  var ClockDigitalActivity = {
    id: 'clock-digital-activity',
    strings: {
      title: { en: "Sprocket's Clock", de: 'Sprockets Uhr', fr: 'L\'horloge de Sprocket' },
      instruction: { en: 'Read the clock, then tap the time that matches.', de: 'Lies die Uhr ab und tippe dann auf die passende Uhrzeit.', fr: 'Lis l\'horloge, puis touche l\'heure qui correspond.' },
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
      if (document.getElementById('cd-style')) return;
      var s = el('style'); s.id = 'cd-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.cd-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,460px);margin:0 auto;}',
        '.cd-clock{width:min(58vw,230px);height:auto;display:block;}',
        '.cd-row{display:flex;gap:9px;width:100%;justify-content:center;}',
        '.cd-choice{flex:1 1 0;min-width:0;max-width:128px;min-height:54px;border:3px solid #C9B98E;border-radius:14px;background:#FFFDF6;cursor:pointer;display:flex;align-items:center;justify-content:center;font:800 1.5rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;padding:8px 6px;}',
        '.cd-choice.dim{opacity:.4;}',
        '.cd-choice.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.cd-readout{font:800 2.6rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;letter-spacing:.5px;text-align:center;}',
        '.cd-root.cd-match{max-width:min(96vw,560px);}',                 /* wider row so the 3 analog cards read on desktop */
        '.cd-choice.cd-clockcard{padding:6px;min-height:0;max-width:175px;}',
        '.cd-clockcard .cd-clock{width:100%;max-width:165px;}',
        '.cd-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:34px;}',
        '.cd-sprocket{flex:0 0 auto;line-height:0;}',
        '.cd-msg{flex:0 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;max-width:320px;}',
        '.cd-msg.miss{color:#C2410C;}',
        '.cd-sprocket-svg .cd-eyes-happy{display:none;}.cd-sprocket[data-pose=happy] .cd-eyes-open{display:none;}.cd-sprocket[data-pose=happy] .cd-eyes-happy{display:block;}',
        '.cd-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.cd-root{gap:7px;}.cd-clock{width:42vw;}.cd-row{gap:7px;}.cd-choice{font-size:1.3rem;min-height:50px;}.cd-readout{font-size:2.1rem;}.cd-clockcard .cd-clock{max-width:96px;}}',
        '.lcs-app:not(.sprocket-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'clock-digital.read-hour.1-md-b-3';
      var tries = ['/mini-tools/clock-digital-activities.json', 'clock-digital-activities.json', '../mini tools/clock-digital-activities.json'];
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
      var dir = (this._activityRow && this._activityRow.params && this._activityRow.params.direction) || 'analog-to-digital';
      var promptText = dir === 'digital-to-analog' ? txt('qMatch') : txt('q');
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
      var params = (this._activityRow && this._activityRow.params) || {};
      var _gran = params.granularity || 'hour';
      var _dir = params.direction || 'analog-to-digital';

      var root = el('div', 'cd-root' + (_dir === 'digital-to-analog' ? ' cd-match' : ''));

      if (_dir === 'digital-to-analog') {
        /* stimulus = big DIGITAL readout */
        var ro = el('div', 'cd-readout'); ro.textContent = fmtDigital(round.target); root.appendChild(ro);
      } else {
        /* stimulus = analog clock (minute ticks only for the to-the-minute activity) */
        root.appendChild(clockSVG(round.target.h, round.target.m, { minuteTicks: _gran === 'minute' }));
      }

      var row = el('div', 'cd-row');
      var order = this._optOrder || (round.options || []).map(function (_, i) { return i; });
      order.forEach(function (oi) {
        var t = round.options[oi];
        var isClockCard = _dir === 'digital-to-analog';
        var b = el('button', 'cd-choice' + (isClockCard ? ' cd-clockcard' : '') + (self._nonAns[oi] ? ' dim' : '') + (self._lit === oi ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-oi', oi); b.setAttribute('aria-label', spoken(t));
        if (isClockCard) { b.appendChild(clockSVG(t.h, t.m)); }   /* choice = analog clock face */
        else { b.textContent = fmtDigital(t); }              /* choice = digital time text */
        b.addEventListener('click', function () {
          if (self._resolved || self._nonAns[oi] || self._token !== tok) return;
          if (Core.isAnswer(round, oi)) { self._lit = oi; self._resolve(); }
          else { self._nonAns[oi] = 1; self._nudge(); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);

      var say = el('div', 'cd-say');
      var sp = el('div', 'cd-sprocket'); sp.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); sp.innerHTML = sprocketSVG();
      var msg = el('p', 'cd-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(sp, msg); root.appendChild(say); this._sprocket = sp;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function () {
      this._resolved = true;
      if (this._app) this._app.classList.add('sprocket-resolved');
      var round = this._round;
      this.render();
      var line = this._api.stage.querySelector('.cd-msg');
      var note = txt('win', { t: spoken(round.target) });
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function () {
      var params = (this._activityRow && this._activityRow.params) || {};
      var gran = params.granularity || 'hour';
      var msgText = params.direction === 'digital-to-analog'
        ? txt('hintMatch')
        : txt(gran === 'hour' ? 'hint' : (gran === 'five' ? 'hintFive' : (gran === 'minute' ? 'hintMinute' : 'hintMin')));
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.cd-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'cd-sronly'); wrap.setAttribute('aria-live', 'polite');
      var dir = (this._activityRow && this._activityRow.params && this._activityRow.params.direction) || 'analog-to-digital';
      var cs = (round.options || []).map(function (t) { return spoken(t); }).join(', ');
      if (dir === 'digital-to-analog') {
        wrap.innerHTML = '<p>' + txt('qMatch') + txt('srMatchBody', { t: fmtDigital(round.target), cs: cs }) + '</p>';
      } else {
        var ds = (round.options || []).map(function (t) { return fmtDigital(t); }).join(', ');
        wrap.innerHTML = '<p>' + txt('q') + txt('srReadBody', { t: spoken(round.target), ds: ds }) + '</p>';
      }
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.ClockDigitalActivity = ClockDigitalActivity;

}(typeof window !== 'undefined' ? window : this));
