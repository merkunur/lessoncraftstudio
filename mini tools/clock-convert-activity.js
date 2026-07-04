/* =====================================================================
   SPROCKET'S CLOCK — 12 ↔ 24 CONVERSION — ACTIVITY SKIN  (clock-convert-activity.js)
   ---------------------------------------------------------------------
   2.MD.C.7 (a.m./p.m. clause, extended to 24-hour) · read the given time, tap
   the same time in the other notation (of 3 cards). Digital-only — NO analog
   clock. The lcs-shell skin over clock-convert-core.js. answerType:'state'.
   EN-ONLY pilot (404 non-EN). 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ClockConvertCore;
  var LANG = 'en';   // #105 — set in init from api.lang

  var L = {
    en: {
      q12to24: 'What is this in 24-hour time?',
      q24to12: 'What is this in 12-hour time?',
      win12to24: 'Yes! {given} is {answer}.',
      win24to12: 'Yes! {given} is {answer}.',
      hint: 'After noon, 24-hour time keeps counting: 1 PM is 13:00.'
    },
    de: {
      q12to24: 'Wie schreibt man das in der 24-Stunden-Zeit?',
      q24to12: 'Wie sagt man das mit der Tageszeit?',
      win12to24: 'Genau! {given} ist {answer}.',
      win24to12: 'Genau! {given} ist {answer}.',
      hint: 'Nach dem Mittag zählt die 24-Stunden-Zeit weiter: Aus 1 Uhr nachmittags wird 13:00.'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* German time display: 24h side is universal („15:00"); the 12h side becomes the
     umgangssprachliche form „{h12}:{mm} {Tageszeit}" („3:00 nachmittags"). Shadows the
     core's to12str for de. Tageszeit table 0..23 (educator, Klasse-2 convention). */
  var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
  var TAGESZEIT = ['nachts', 'nachts', 'nachts', 'nachts', 'nachts', 'morgens', 'morgens', 'morgens', 'morgens', 'vormittags', 'vormittags', 'vormittags', 'mittags', 'nachmittags', 'nachmittags', 'nachmittags', 'nachmittags', 'nachmittags', 'abends', 'abends', 'abends', 'abends', 'nachts', 'nachts'];
  function de12str(h24, m) { return Core.to12(h24).h12 + ':' + pad2(m) + ' ' + TAGESZEIT[h24]; }
  function deGivenStr(round) { return round.dir === '12to24' ? de12str(round.h24, round.m) : Core.to24str(round.h24, round.m); }
  function deOptionStr(round, oh) { return round.dir === '12to24' ? Core.to24str(oh, round.m) : de12str(oh, round.m); }
  function givenStr(round) { return LANG === 'de' ? deGivenStr(round) : Core.givenStr(round); }
  function optionStr(round, oh) { return LANG === 'de' ? deOptionStr(round, oh) : Core.optionStr(round, oh); }

  function sprocketSVG() {
    /* Sprocket — a rooster (red comb + wattle, orange beak), the time mascot */
    return '<svg class="cv-sprocket-svg" viewBox="0 0 48 46" width="40" height="38" aria-hidden="true">' +
      '<path d="M14 12 q3 -7 6 0 q3 -7 6 0 q3 -6 5 1" fill="#E2574B" stroke="#B5392F" stroke-width="1.2"/>' +
      '<circle cx="24" cy="26" r="13" fill="#F0CE8C" stroke="#B98A3C" stroke-width="1.6"/>' +
      '<path d="M11 26 l-7 3 l7 3z" fill="#E8A93A" stroke="#C2790F" stroke-width="1"/>' +
      '<path d="M11 33 q-2 4 1 6" fill="none" stroke="#E2574B" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g class="cv-eyes-open"><circle cx="18" cy="23" r="2" fill="#2B2B2B"/></g>' +
      '<g class="cv-eyes-happy"><path d="M16 23 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M36 22 q9 4 5 16 q-6 -2 -9 -9z" fill="#3E7C5A" stroke="#2A5740" stroke-width="1.2"/></svg>';
  }

  function promptFor(round) { return round.dir === '12to24' ? txt('q12to24') : txt('q24to12'); }

  var ClockConvertActivity = {
    id: 'clock-convert-activity',
    strings: {
      title: { en: "Sprocket's Clock", de: 'Kikos Uhr' },
      instruction: { en: 'Read the time, then tap the same time in the other way of writing it.', de: 'Lies die Uhrzeit. Tippe dann dieselbe Uhrzeit in der anderen Schreibweise an.' },
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
      if (document.getElementById('cv-style')) return;
      var s = el('style'); s.id = 'cv-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.cv-root{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;max-width:min(96vw,480px);margin:0 auto;}',
        '.cv-readout{font:800 3rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;letter-spacing:.5px;text-align:center;}',
        '.cv-row{display:flex;gap:9px;width:100%;justify-content:center;}',
        '.cv-choice{flex:1 1 0;min-width:0;max-width:150px;min-height:54px;border:3px solid #C9B98E;border-radius:14px;background:#FFFDF6;cursor:pointer;display:flex;align-items:center;justify-content:center;text-align:center;font:800 1.2rem/1.12 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;padding:8px 6px;overflow-wrap:break-word;}',
        '.cv-choice.dim{opacity:.4;}',
        '.cv-choice.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.cv-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:34px;}',
        '.cv-sprocket{flex:0 0 auto;line-height:0;}',
        '.cv-msg{flex:0 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;max-width:340px;}',
        '.cv-msg.miss{color:#C2410C;}',
        '.cv-sprocket-svg .cv-eyes-happy{display:none;}.cv-sprocket[data-pose=happy] .cv-eyes-open{display:none;}.cv-sprocket[data-pose=happy] .cv-eyes-happy{display:block;}',
        '.cv-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.cv-root{gap:11px;}.cv-readout{font-size:2.5rem;}.cv-row{gap:6px;}.cv-choice{font-size:1.02rem;min-height:50px;padding:8px 4px;}}',
        '.lcs-app:not(.sprocket-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'clock-convert.12-24.2-md-c-7';
      var tries = ['/mini-tools/clock-convert-activities.json', 'clock-convert-activities.json', '../mini tools/clock-convert-activities.json'];
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
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: promptFor(round) }, answerType: 'state', round: round,
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
      var root = el('div', 'cv-root');

      var ro = el('div', 'cv-readout'); ro.textContent = givenStr(round); root.appendChild(ro);

      var row = el('div', 'cv-row');
      var order = this._optOrder || (round.options || []).map(function (_, i) { return i; });
      order.forEach(function (oi) {
        var oh = round.options[oi];
        var b = el('button', 'cv-choice' + (self._nonAns[oi] ? ' dim' : '') + (self._lit === oi ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-oi', oi);
        b.textContent = optionStr(round, oh);
        b.setAttribute('aria-label', optionStr(round, oh));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonAns[oi] || self._token !== tok) return;
          if (Core.isAnswer(round, oi)) { self._lit = oi; self._resolve(); }
          else { self._nonAns[oi] = 1; self._nudge(); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);

      var say = el('div', 'cv-say');
      var sp = el('div', 'cv-sprocket'); sp.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); sp.innerHTML = sprocketSVG();
      var msg = el('p', 'cv-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(sp, msg); root.appendChild(say); this._sprocket = sp;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function () {
      this._resolved = true;
      if (this._app) this._app.classList.add('sprocket-resolved');
      var round = this._round;
      this.render();
      var line = this._api.stage.querySelector('.cv-msg');
      var args = { given: givenStr(round), answer: optionStr(round, round.h24) };
      var note = txt(round.dir === '12to24' ? 'win12to24' : 'win24to12', args);
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function () {
      var msgText = txt('hint');
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.cv-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'cv-sronly'); wrap.setAttribute('aria-live', 'polite');
      var cs = (round.options || []).map(function (oh) { return optionStr(round, oh); }).join(', ');
      wrap.innerHTML = LANG === 'de'
        ? '<p>Die Uhrzeit ist ' + givenStr(round) + '. ' + promptFor(round) + ' Zur Auswahl: ' + cs + '.</p>'
        : '<p>The time is ' + givenStr(round) + '. ' + promptFor(round) + ' The choices are: ' + cs + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.ClockConvertActivity = ClockConvertActivity;

}(typeof window !== 'undefined' ? window : this));
