/* =====================================================================
   SPROCKET'S CLOCK — A.M. / P.M. — ACTIVITY SKIN  (clock-ampm-activity.js)
   ---------------------------------------------------------------------
   2.MD.C.7 (a.m./p.m. clause) · read the everyday activity + time, tap a.m.
   (morning ☀) or p.m. (afternoon/evening ☾). The lcs-shell skin over
   clock-ampm-core.js. answerType:'state'. 2-choice. EN-ONLY pilot (404 non-EN).
   NO analog clock (it can't disambiguate a.m./p.m.). 0 lines to any core /
   lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ClockAmpmCore;
  var LANG = 'en';

  var L = {
    en: {
      q: 'Is it a.m. or p.m.?',
      am: 'a.m.', pm: 'p.m.',
      winAM: 'Yes! That is the morning — a.m.',
      winPM: 'Yes! That is the afternoon or evening — p.m.',
      hint: 'Morning is a.m. Afternoon and night are p.m.'
    },
    de: {
      q: 'Ist das am Vormittag oder am Nachmittag und Abend?',
      am: 'Vormittag', pm: 'Nachmittag & Abend',
      winAM: 'Ja! Das ist am Vormittag.',
      winPM: 'Ja! Das ist am Nachmittag oder am Abend.',
      hint: 'Vor dem Mittag ist es Vormittag. Nach dem Mittag kommen Nachmittag und Abend.'
    },
    fr: {
      q: 'C’est le matin, ou l’après-midi et le soir ?',
      am: 'le matin', pm: 'l’après-midi et le soir',
      winAM: 'Oui ! C’est le matin.',
      winPM: 'Oui ! C’est l’après-midi ou le soir.',
      hint: 'Le matin, c’est avant midi. L’après-midi et le soir, c’est après midi.'
    },
    es: {
      q: '¿Esto es en la mañana, o en la tarde y noche?',
      am: 'Mañana', pm: 'Tarde y noche',
      winAM: '¡Sí! Eso es en la mañana.',
      winPM: '¡Sí! Eso es en la tarde o noche.',
      hint: 'Antes del mediodía es la mañana. Después del mediodía vienen la tarde y la noche.'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function sprocketSVG() {
    return '<svg class="ap-sprocket-svg" viewBox="0 0 48 46" width="40" height="38" aria-hidden="true">' +
      '<path d="M14 12 q3 -7 6 0 q3 -7 6 0 q3 -6 5 1" fill="#E2574B" stroke="#B5392F" stroke-width="1.2"/>' +
      '<circle cx="24" cy="26" r="13" fill="#F0CE8C" stroke="#B98A3C" stroke-width="1.6"/>' +
      '<path d="M11 26 l-7 3 l7 3z" fill="#E8A93A" stroke="#C2790F" stroke-width="1"/>' +
      '<path d="M11 33 q-2 4 1 6" fill="none" stroke="#E2574B" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g class="ap-eyes-open"><circle cx="18" cy="23" r="2" fill="#2B2B2B"/></g>' +
      '<g class="ap-eyes-happy"><path d="M16 23 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M36 22 q9 4 5 16 q-6 -2 -9 -9z" fill="#3E7C5A" stroke="#2A5740" stroke-width="1.2"/></svg>';
  }
  function sunSVG() {
    var rays = '';
    for (var i = 0; i < 8; i++) { var a = i * 45 * Math.PI / 180; rays += '<line x1="' + (24 + 13 * Math.cos(a)).toFixed(1) + '" y1="' + (24 + 13 * Math.sin(a)).toFixed(1) + '" x2="' + (24 + 19 * Math.cos(a)).toFixed(1) + '" y2="' + (24 + 19 * Math.sin(a)).toFixed(1) + '" stroke="#E8A93A" stroke-width="2.4" stroke-linecap="round"/>'; }
    return '<svg class="ap-icon" viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">' + rays + '<circle cx="24" cy="24" r="9" fill="#F2C14E" stroke="#E8A93A" stroke-width="2"/></svg>';
  }
  function moonSVG() {
    return '<svg class="ap-icon" viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">' +
      '<path d="M30 8 a17 17 0 1 0 10 30 a13 13 0 1 1 -10 -30 z" fill="#C9D6E5" stroke="#7E93AC" stroke-width="2" stroke-linejoin="round"/>' +
      '<circle cx="36" cy="14" r="1.6" fill="#7E93AC"/><circle cx="40" cy="22" r="1.2" fill="#7E93AC"/></svg>';
  }

  var ClockAmpmActivity = {
    id: 'clock-ampm-activity',
    strings: {
      title: { en: "Sprocket's Clock", de: 'Sprockets Uhr — Tageszeiten', fr: 'L’horloge de Sprocket', es: 'El reloj de Sprocket — mañana o noche' },
      instruction: { en: 'Read what you are doing, then choose a.m. or p.m.', de: 'Lies, was du gerade tust, und wähle dann die richtige Tageszeit.', fr: 'Lis ce que tu fais, puis choisis le matin ou l’après-midi.', es: 'Lee lo que haces y elige la parte del día correcta.' },
      q: { en: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._round = null; this._resolved = false; this._token = 0;
      this._nonAns = {}; this._lit = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('ap-style')) return;
      var s = el('style'); s.id = 'ap-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.ap-root{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;max-width:min(96vw,460px);margin:0 auto;}',
        '.ap-scene{display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;}',
        '.ap-activity{font:800 1.5rem/1.2 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;max-width:360px;}',
        '.ap-time{font:800 2.2rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#F2784B;}',
        '.ap-row{display:flex;gap:12px;width:100%;justify-content:center;}',
        '.ap-choice{flex:1 1 0;min-width:0;max-width:140px;min-height:100px;border:3px solid #C9B98E;border-radius:16px;background:#FFFDF6;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font:800 1.3rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;padding:8px 6px;}',
        '.ap-icon{flex:0 0 auto;width:78px;height:78px;}',
        '.ap-choice.dim{opacity:.4;}',
        '.ap-choice.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.ap-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:34px;}',
        '.ap-sprocket{flex:0 0 auto;line-height:0;}',
        '.ap-msg{flex:0 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;max-width:340px;}',
        '.ap-msg.miss{color:#C2410C;}',
        '.ap-sprocket-svg .ap-eyes-happy{display:none;}.ap-sprocket[data-pose=happy] .ap-eyes-open{display:none;}.ap-sprocket[data-pose=happy] .ap-eyes-happy{display:block;}',
        '.ap-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.ap-root{gap:8px;}.ap-activity{font-size:1.12rem;}.ap-time{font-size:1.6rem;}.ap-row{gap:8px;}.ap-choice{font-size:1.15rem;min-height:92px;}}',
        /* de: the dual label „Nachmittag & Abend" is longer → shrink the label + tighten the card + enlarge the icon so the buttons fill their area (not-sparse) and the short „Vormittag" sun button isn't stretched empty (§A.13.62 fix-layout). de-scoped → EN untouched. */
        '.ap-de .ap-choice{font-size:1.05rem;max-width:128px;}',
        '.ap-de .ap-icon{width:88px;height:88px;}',
        '@media (max-width:380px){.ap-de .ap-choice{font-size:.92rem;}}',
        /* fr: the day-part label „l’après-midi et le soir" is longer → shrink the label + tighten the card + enlarge the icon so the buttons fill their area (not-sparse) and the short „le matin" sun button isn't stretched empty (§A.13.62 fix-layout). fr-scoped → EN untouched. */
        '.ap-fr .ap-choice{font-size:1.05rem;max-width:128px;}',
        '.ap-fr .ap-icon{width:88px;height:88px;}',
        '@media (max-width:380px){.ap-fr .ap-choice{font-size:.92rem;}}',
        /* es: the dual label „Tarde y noche" is longer → shrink the label + tighten the card + enlarge the icon so the buttons fill their area (not-sparse) and the short „Mañana" sun button isn't stretched empty (§A.13.62 fix-layout). es-scoped → EN untouched. */
        '.ap-es .ap-choice{font-size:1.05rem;max-width:128px;}',
        '.ap-es .ap-icon{width:88px;height:88px;}',
        '@media (max-width:380px){.ap-es .ap-choice{font-size:.92rem;}}',
        '.lcs-app:not(.sprocket-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'clock-ampm.morning-or-night.2-md-c-7';
      var tries = ['/mini-tools/clock-ampm-activities.json', 'clock-ampm-activities.json', '../mini tools/clock-ampm-activities.json'];
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
        id: round.id, promptKey: 'q', promptArgs: { q: txt('q') }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonAns = {}; this._lit = null;
      if (this._app) this._app.classList.remove('sprocket-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var self = this, tok = this._token;
      var root = el('div', 'ap-root' + (LANG === 'de' ? ' ap-de' : (LANG === 'fr' ? ' ap-fr' : (LANG === 'es' ? ' ap-es' : ''))));

      var scene = el('div', 'ap-scene');
      var act = el('p', 'ap-activity'); act.textContent = (LANG === 'de' && round.activityL10n && round.activityL10n.de) || (LANG === 'fr' && round.activityL10n && round.activityL10n.fr) || (LANG === 'es' && round.activityL10n && round.activityL10n.es) || round.activity; scene.appendChild(act);
      var tm = el('div', 'ap-time'); tm.textContent = (LANG === 'de' ? round.time.split(':')[0] + ' Uhr' : (LANG === 'fr' ? round.time.split(':')[0] + ' h' : (LANG === 'es' ? (round.time.split(':')[0] === '1' ? 'la ' : 'las ') + round.time.split(':')[0] : round.time))); scene.appendChild(tm);
      root.appendChild(scene);

      var row = el('div', 'ap-row');
      Core.CHOICES.forEach(function (choice) {
        var b = el('button', 'ap-choice' + (self._nonAns[choice] ? ' dim' : '') + (self._lit === choice ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-choice', choice);
        b.innerHTML = (choice === 'AM' ? sunSVG() : moonSVG());
        var lbl = el('span'); lbl.textContent = txt(choice === 'AM' ? 'am' : 'pm'); b.appendChild(lbl);
        b.setAttribute('aria-label', txt(choice === 'AM' ? 'am' : 'pm'));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonAns[choice] || self._token !== tok) return;
          if (Core.isAnswer(round, choice)) { self._lit = choice; self._resolve(); }
          else { self._nonAns[choice] = 1; self._nudge(); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);

      var say = el('div', 'ap-say');
      var sp = el('div', 'ap-sprocket'); sp.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); sp.innerHTML = sprocketSVG();
      var msg = el('p', 'ap-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(sp, msg); root.appendChild(say); this._sprocket = sp;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function () {
      this._resolved = true;
      if (this._app) this._app.classList.add('sprocket-resolved');
      var round = this._round;
      this.render();
      var line = this._api.stage.querySelector('.ap-msg');
      var note = txt(round.ampm === 'AM' ? 'winAM' : 'winPM');
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function () {
      var msgText = txt('hint');
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.ap-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'ap-sronly'); wrap.setAttribute('aria-live', 'polite');
      if (LANG === 'de') {
        var deAct = (round.activityL10n && round.activityL10n.de) || round.activity;
        var deTime = round.time.split(':')[0] + ' Uhr';
        wrap.innerHTML = '<p>' + deAct + ' Um ' + deTime + '. ' + txt('q') + ' Zur Auswahl stehen: Vormittag (vor dem Mittag), Nachmittag und Abend (nach dem Mittag).</p>';
      } else if (LANG === 'fr') {
        var frAct = (round.activityL10n && round.activityL10n.fr) || round.activity;
        var frTime = round.time.split(':')[0] + ' h';
        wrap.innerHTML = '<p>' + frAct + ' À ' + frTime + '. ' + txt('q') + ' Les choix sont : le matin (avant midi), l’après-midi et le soir (après midi).</p>';
      } else if (LANG === 'es') {
        var esAct = (round.activityL10n && round.activityL10n.es) || round.activity;
        var esTime = (round.time.split(':')[0] === '1' ? 'la ' : 'las ') + round.time.split(':')[0];
        wrap.innerHTML = '<p>' + esAct + ' El reloj marca ' + esTime + '. ' + txt('q') + ' Puedes elegir: mañana (antes del mediodía) o tarde y noche (después del mediodía).</p>';
      } else {
        wrap.innerHTML = '<p>' + round.activity + ' at ' + round.time + '. ' + txt('q') + ' The choices are: a.m. (morning), p.m. (afternoon or evening).</p>';
      }
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.ClockAmpmActivity = ClockAmpmActivity;

}(typeof window !== 'undefined' ? window : this));
