/* =====================================================================
   THE CLOCK TOWER — ACTIVITY SKIN  (tense-activity.js)
   ---------------------------------------------------------------------
   L.1.1.e · verb tense past/present/future — CLARITY-FIRST redesign of #70.
   The lcs-shell skin over tense-core.js. answerType:'state'. EN-ONLY pilot
   (non-EN 404-by-design).

   Juniper the robin keeps a clock tower with three time-windows — Before (past)
   / Now (present) / Soon (future). The SHELL prompt shows a sentence with a
   clear TIME word and a blank; the matching time-window is highlighted in the
   scene; the child taps one of THREE verb-form chips (the same verb's present /
   past / future). Correct = the chip whose tense === the round's time, DERIVED
   not stored. Correct → the chip glows + Juniper wiggles (resolve; shell Check
   hidden until `.lcs-app.juniper-resolved`). Wrong → a warm time nudge, no
   advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TenseCore;
  var LANG = 'en';
  /* window labels per locale (the WINDOWS array `label` stays the EN fallback) */
  var WIN_LABELS = {
    en: { past: 'Before', present: 'Now', future: 'Soon' },
    de: { past: 'Vergangenheit', present: 'Gegenwart', future: 'Zukunft' },
    fr: { past: 'Passé', present: 'Présent', future: 'Futur' }
  };

  /* time-window meta: which window each tense lights, its label + glyph */
  var WINDOWS = [
    { tense: 'past',    label: 'Before', glyph: '<circle cx="20" cy="20" r="11" fill="#F4E3A8"/><circle cx="24" cy="17" r="9" fill="#F3EEDC"/>' },                                  /* crescent moon */
    { tense: 'present', label: 'Now',    glyph: '<g stroke="#E8A93A" stroke-width="2.4" stroke-linecap="round"><line x1="20" y1="3" x2="20" y2="8"/><line x1="20" y1="32" x2="20" y2="37"/><line x1="3" y1="20" x2="8" y2="20"/><line x1="32" y1="20" x2="37" y2="20"/><line x1="8" y1="8" x2="11" y2="11"/><line x1="29" y1="29" x2="32" y2="32"/><line x1="32" y1="8" x2="29" y2="11"/><line x1="11" y1="29" x2="8" y2="32"/></g><circle cx="20" cy="20" r="8.5" fill="#F2C14E"/>' },   /* sun */
    { tense: 'future',  label: 'Soon',   glyph: '<circle cx="20" cy="21" r="12" fill="#EAF4F1" stroke="#146B5E" stroke-width="2.2"/><line x1="20" y1="21" x2="20" y2="13" stroke="#146B5E" stroke-width="2.2" stroke-linecap="round"/><line x1="20" y1="21" x2="26" y2="24" stroke="#146B5E" stroke-width="2.2" stroke-linecap="round"/><path d="M30 9 l4 1 l-1 4z" fill="#F2784B"/>' }   /* clock + forward arrow */
  ];
  function winFor(tense) { for (var i = 0; i < WINDOWS.length; i++) if (WINDOWS[i].tense === tense) return WINDOWS[i]; return WINDOWS[0]; }

  var L = {
    en: {
      q: '"{tw}, {subj} ___."  Which word fits?',
      win: 'Yes! {note}', winNote: 'That word fits the time!',
      hear: '🔊 Hear it',
      nPast: '"Yesterday" already happened — pick the PAST word.',
      nPresent: '"Right now" is happening — pick the word for NOW.',
      nFuture: '"Tomorrow" has not happened yet — pick the word with "will".'
    },
    de: {
      q: '{subj} — was passt zu ‚{tw}‘?',
      win: 'Ja! {note}', winNote: 'Diese Form passt zur Zeit!',
      hear: '🔊 Vorlesen',
      nPast: '‚Gestern‘ ist schon vorbei – wähle die Vergangenheit.',
      nPresent: '‚Jetzt‘ passiert gerade – wähle die Gegenwart.',
      nFuture: '‚Morgen‘ ist noch nicht da – wähle die Form mit ‚werden‘.'
    },
    fr: {
      q: '{subj} — quelle forme va avec « {tw} » ?',
      win: 'Oui ! {note}', winNote: 'Cette forme va avec le bon moment !',
      hear: '🔊 Écouter',
      nPast: '« {tw} », c’est déjà passé — choisis la forme du passé.',
      nPresent: '« {tw} », c’est en ce moment — choisis la forme du présent.',
      nFuture: '« {tw} », ce n’est pas encore arrivé — choisis la forme du futur.'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function juniperSVG() {
    /* Juniper — a robin (brown body, red-orange breast) */
    return '<svg class="tn-jun-svg" viewBox="0 0 56 50" width="40" height="36" aria-hidden="true">' +
      '<path d="M30 26 q11 -2 13 9 q-9 4 -13 -2z" fill="#7A5C3E"/>' +   /* wing */
      '<ellipse cx="27" cy="30" rx="13" ry="14" fill="#8B6B4A" stroke="#5E4630" stroke-width="2"/>' +
      '<ellipse cx="25" cy="34" rx="8" ry="8" fill="#E0673A"/>' +   /* red breast */
      '<circle cx="27" cy="15" r="8" fill="#8B6B4A" stroke="#5E4630" stroke-width="1.6"/>' +
      '<path d="M35 15 l7 2 l-7 2z" fill="#E8B84B" stroke="#C2410C" stroke-width=".8"/>' +   /* beak */
      '<g class="tn-eyes-open"><circle cx="27" cy="14" r="2" fill="#2B2B2B"/></g>' +
      '<g class="tn-eyes-happy"><path d="M24.5 14 q2.5 -2.5 5 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<line x1="22" y1="44" x2="22" y2="48" stroke="#C2884A" stroke-width="1.6" stroke-linecap="round"/><line x1="30" y1="44" x2="30" y2="48" stroke="#C2884A" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }

  var TenseActivity = {
    id: 'tense-activity',
    strings: {
      title: { en: 'The Clock Tower', de: 'Junipers Uhrturm', fr: 'La tour du temps de Juniper' },
      instruction: { en: 'Read the time, then tap the verb that fits!', de: 'Schau auf die Zeit und tippe die passende Zeitform!', fr: 'Regarde le temps et touche la bonne forme du verbe !' },
      q: { en: '{q}', de: '{q}', fr: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = null; this._chipOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('tn-style')) return;
      var s = el('style'); s.id = 'tn-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.tn-root{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:min(96vw,640px);margin:0 auto;}',
        '.tn-windows{display:flex;justify-content:center;gap:10px;width:100%;}',
        '.tn-win{flex:0 1 130px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 6px;border:2.5px solid #D7CBAE;border-radius:14px;background:#FFFDF6;opacity:.55;}',
        '.tn-win.on{opacity:1;border-color:#146B5E;background:#EAF4F1;box-shadow:0 0 0 3px rgba(20,107,94,.18);}',
        '.tn-win svg{width:40px;height:40px;display:block;}',
        '.tn-wlab{font:800 .82rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#5A4A22;}',
        '.tn-win.on .tn-wlab{color:#0F4A40;}',
        '.tn-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.tn-jun{flex:0 0 auto;}',
        '.tn-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .9rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.tn-line-msg.miss{color:#C2410C;}',
        '.tn-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.tn-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%;}',
        '.tn-cand{display:flex;align-items:center;justify-content:center;text-align:center;padding:11px 18px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:50px;min-width:96px;font:800 clamp(1rem,3.8vw,1.18rem)/1.1 Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.tn-cand.dim{opacity:.42;}',
        '.tn-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.tn-jun-svg .tn-eyes-happy{display:none;}.tn-jun[data-pose=happy] .tn-eyes-open{display:none;}.tn-jun[data-pose=happy] .tn-eyes-happy{display:block;}',
        '.tn-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.tn-root{gap:5px;}.tn-windows{gap:7px;}.tn-win{flex-basis:78px;padding:2px 4px;gap:0;}.tn-win svg{width:24px;height:24px;}.tn-wlab{font-size:.68rem;}.tn-say{gap:6px;}.tn-strip{gap:7px;}.tn-cand{padding:6px 11px;min-width:76px;min-height:46px;font-size:.94rem;}.tn-hear{padding:5px 14px;}}',
        '.lcs-app:not(.juniper-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'tense.past-present-future.l-1-1-e';
      var tries = ['/mini-tools/tense-activities.json', 'tense-activities.json', '../mini tools/tense-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds)) || [];
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
      var q = txt('q', { tw: round.timeWord, subj: round.subject });
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: q }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = null;
      this._chipOrder = this._shuffle(Core.TENSES.slice());   /* shuffle form display order so position ≠ answer */
      if (this._app) this._app.classList.remove('juniper-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'tn-root');

      /* the three time-windows, the round's time highlighted */
      var wins = el('div', 'tn-windows');
      WINDOWS.forEach(function (w) {
        var c = el('div', 'tn-win' + (w.tense === round.time ? ' on' : ''));
        var g = el('div'); g.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true">' + w.glyph + '</svg>';
        var lab = el('div', 'tn-wlab'); lab.textContent = (WIN_LABELS[LANG] && WIN_LABELS[LANG][w.tense]) || w.label;
        c.append(g, lab); wins.appendChild(c);
      });
      root.appendChild(wins);

      var say = el('div', 'tn-say');
      var jn = el('div', 'tn-jun'); jn.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); jn.innerHTML = juniperSVG();
      var msg = el('p', 'tn-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(jn, msg); root.appendChild(say); this._jun = jn;

      /* Hear it */
      var self = this, hear = el('button', 'tn-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var f = round.verb.forms;
        var t = LANG === 'de'
          ? (round.subject + '. Was passt zu ‚' + round.timeWord + '‘?')
          : LANG === 'fr'
          ? (round.subject + '. Quelle forme va avec « ' + round.timeWord + ' » ?')
          : (round.timeWord + ', ' + round.subject + '. Which word fits? ' + f.present + ', ' + f.past + ', or ' + f.future + '?');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: LANG, rate: 0.9 }); } catch (e) { } }
      });
      root.appendChild(hear);

      this._renderChips(root, round);
      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _renderChips: function (root, round) {
      var self = this, tok = this._token, f = round.verb.forms;
      var strip = el('div', 'tn-strip');
      var order = this._chipOrder || Core.TENSES.slice();
      order.forEach(function (tense) {
        var b = el('button', 'tn-cand' + (self._nonConf[tense] ? ' dim' : '') + (self._lit === tense ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-tense', tense);
        b.textContent = f[tense];
        b.setAttribute('aria-label', f[tense]);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[tense] || self._token !== tok) return;
          if (Core.isAnswer(round, tense)) { self._lit = tense; self._resolve(); }
          else { self._nonConf[tense] = 1; self._nudge(round.time); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('juniper-resolved');
      this.render();
      var line = this._api.stage.querySelector('.tn-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function (time) {
      var key = time === 'past' ? 'nPast' : time === 'future' ? 'nFuture' : 'nPresent';
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.tn-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function (round) {
      var f = round.verb.forms, wrap = el('div', 'tn-sronly'); wrap.setAttribute('aria-live', 'polite');
      var w = winFor(round.time);
      var msg = LANG === 'de'
        ? ('Zeitformen-Übung: ' + round.subject + '. Wähle die Zeitform, die zu ‚' + round.timeWord + '‘ passt. Zur Auswahl: ' + f.present + ', ' + f.past + ', ' + f.future + '.')
        : LANG === 'fr'
        ? ('Exercice sur les temps du verbe : ' + round.subject + '. Choisis la forme qui va avec « ' + round.timeWord + ' ». Au choix : ' + f.present + ', ' + f.past + ', ' + f.future + '.')
        : ('The "' + w.label + '" window is lit. ' + round.timeWord + ', ' + round.subject + ' blank. Which word fits? Choices: ' + f.present + ', ' + f.past + ', ' + f.future + '.');
      wrap.innerHTML = '<p>' + msg + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.TenseActivity = TenseActivity;

}(typeof window !== 'undefined' ? window : this));
