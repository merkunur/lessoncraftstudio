/* =====================================================================
   TWO MOONS — ACTIVITY SKIN  (two-tales-activity.js)
   ---------------------------------------------------------------------
   RL.1.9 · compare/contrast two characters' experiences ACROSS two stories —
   CLARITY-FIRST redesign of #68. The lcs-shell skin over two-tales-core.js.
   answerType:'state'. EN-ONLY pilot (non-EN 404-by-design).

   Mossbeard the Story-Keeper shows two short tales under two moons (a GOLD
   tale + a SILVER tale), each a small glyph scene + one short experience line
   + a "Hear both" button. The SHELL prompt asks one of two flavors:
     • "What is the SAME in both stories?"      (mode:same)
     • "What happened in ONLY ONE story?"       (mode:diff)
   The child taps one of THREE short experience-statement cards. The correct
   card is DERIVED by the core's mode predicate over the two tag-sets — no
   stored answer. A correct tap → the card glows + Mossbeard wiggles (resolve;
   shell Check hidden until `.lcs-app.moss-resolved`). A wrong tap → a warm
   nudge that re-reads each tale's experience ONE at a time (never co-presented)
   then re-poses, no advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TwoTalesCore;
  var LANG = 'en';   // content locale; set in init from api.lang (de fan-out §A.13.54)

  var L = {
    en: {
      qSame: 'What is the SAME in both stories?',
      qDiff: 'What happened in ONLY ONE story?',
      win: 'Yes! {note}', winNote: 'You compared both stories!',
      hear: '🔊 Hear both tales',
      gold: 'Gold moon', silver: 'Silver moon',
      reSame: 'Look again — read both tales. What is the SAME in both?',
      reDiff: 'Look again — read both tales. What happened in only ONE?',
      choices: 'Choices:'
    },
    de: {
      qSame: 'Was ist in BEIDEN Geschichten gleich?',
      qDiff: 'Was passiert nur in EINER Geschichte?',
      win: 'Ja! {note}', winNote: 'Du hast beide Geschichten verglichen!',
      hear: '🔊 Beide Geschichten vorlesen',
      gold: 'Goldene Geschichte', silver: 'Silberne Geschichte',
      reSame: 'Schau noch einmal – lies beide Geschichten. Was ist in BEIDEN gleich?',
      reDiff: 'Schau noch einmal – lies beide Geschichten. Was passiert nur in EINER?',
      choices: 'Auswahl:'
    },
    fr: {
      qSame: 'Qu’est-ce qui est PAREIL dans les deux histoires ?',
      qDiff: 'Qu’est-ce qui arrive dans UNE SEULE histoire ?',
      win: 'Oui ! {note}', winNote: 'Tu as comparé les deux histoires !',
      hear: '🔊 Écouter les deux histoires',
      gold: 'Lune d’or', silver: 'Lune d’argent',
      reSame: 'Regarde encore — relis les deux histoires. Qu’est-ce qui est PAREIL ?',
      reDiff: 'Regarde encore — relis les deux histoires. Qu’est-ce qui arrive dans UNE SEULE ?',
      choices: 'Choix :'
    },
    es: {
      qSame: '¿Qué pasó en LOS DOS cuentos?',
      qDiff: '¿Qué pasó en UN SOLO cuento?',
      win: '¡Sí! {note}', winNote: '¡Comparaste los dos cuentos!',
      hear: '🔊 Escuchar',
      gold: 'Cuento dorado', silver: 'Cuento plateado',
      reSame: 'Busca lo que pasó en LOS DOS cuentos.',
      reDiff: 'Busca lo que pasó en UN SOLO cuento.',
      choices: 'Opciones:'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* ---- scene-glyphs (each centered ~(18,18) in a 36 box) ----
     mouse / bird / bunny reuse the proven #58/#62 drawings; fox / frog / duck
     are new, drawn with clear species cues (ears+snout / eye-bumps / bill). */
  var GLYPHS = {
    mouse: '<ellipse cx="18" cy="24" rx="10" ry="9" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.5"/><circle cx="11" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><circle cx="25" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><path d="M27 27 q7 2 6 8" stroke="#7E7873" stroke-width="1.5" fill="none"/><circle cx="16" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="21" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="18.5" cy="27" r="1.2" fill="#E7A6A0"/>',
    bird: '<line x1="17" y1="28" x2="17" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><line x1="21" y1="28" x2="21" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><path d="M26 21 l8 -3 l-2 6 z" fill="#3E8794"/><ellipse cx="19" cy="23" rx="9" ry="7" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.5"/><circle cx="13" cy="16" r="5.5" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.4"/><path d="M8 15 l-6 2 l6 2.5 z" fill="#F2A65A" stroke="#D2761F" stroke-width="1"/><path d="M20 22 q5 -3 8 1 q-4 3 -8 0z" fill="#3E8794"/><circle cx="12" cy="15" r="1.4" fill="#2B2B2B"/>',
    bunny: '<ellipse cx="18" cy="26" rx="9" ry="10" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.5"/><ellipse cx="14" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><ellipse cx="22" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><circle cx="15" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="18" cy="28" r="1.4" fill="#E7A6A0"/>',
    fox: '<path d="M28 30 q9 -1 7 -11 q-6 4 -7 11z" fill="#E8833A" stroke="#B45A1E" stroke-width="1.2"/><path d="M11 17 l-2 -10 l8 5z" fill="#E8833A" stroke="#B45A1E" stroke-width="1.2"/><path d="M25 17 l2 -10 l-8 5z" fill="#E8833A" stroke="#B45A1E" stroke-width="1.2"/><ellipse cx="18" cy="24" rx="10" ry="9" fill="#E8833A" stroke="#B45A1E" stroke-width="1.5"/><ellipse cx="18" cy="28" rx="4.5" ry="3.5" fill="#FBEFE2"/><circle cx="14" cy="22" r="1.4" fill="#2B2B2B"/><circle cx="22" cy="22" r="1.4" fill="#2B2B2B"/><circle cx="18" cy="27" r="1.3" fill="#2B2B2B"/>',
    frog: '<ellipse cx="18" cy="25" rx="11" ry="9" fill="#6FB05A" stroke="#4E8A3C" stroke-width="1.5"/><circle cx="12" cy="14" r="4.2" fill="#6FB05A" stroke="#4E8A3C" stroke-width="1.3"/><circle cx="24" cy="14" r="4.2" fill="#6FB05A" stroke="#4E8A3C" stroke-width="1.3"/><circle cx="12" cy="13" r="1.6" fill="#2B2B2B"/><circle cx="24" cy="13" r="1.6" fill="#2B2B2B"/><path d="M12 27 q6 4 12 0" stroke="#2E5A24" stroke-width="1.4" fill="none" stroke-linecap="round"/>',
    duck: '<ellipse cx="17" cy="25" rx="10" ry="8" fill="#F2C84B" stroke="#C99A22" stroke-width="1.5"/><path d="M13 23 q6 -3 9 1 q-5 4 -9 1z" fill="#E6B83E"/><circle cx="25" cy="16" r="5.5" fill="#F2C84B" stroke="#C99A22" stroke-width="1.3"/><path d="M29 16 l7 -1 l-7 3z" fill="#E8833A" stroke="#C2410C" stroke-width="1"/><circle cx="26" cy="15" r="1.3" fill="#2B2B2B"/>'
  };
  function placeGlyph(name, cx, cy, k) { var g = GLYPHS[name] || ''; return '<g transform="translate(' + (cx - 18 * k).toFixed(1) + ',' + (cy - 18 * k).toFixed(1) + ') scale(' + k + ')">' + g + '</g>'; }
  /* a tale scene is decorative warmth beside the load-bearing TEXT (not an
     answer card → the not-sparse gate does not apply); kept short + single. */
  function sceneSVG(glyph) {
    return '<svg class="tt-scene-svg" viewBox="0 0 80 46" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      '<rect x="1" y="1" width="78" height="44" rx="8" fill="#FFFDF6" stroke="#E0D6C2" stroke-width="1.4"/>' +
      placeGlyph(glyph, 40, 24, 1.0) + '</svg>';
  }

  function mossSVG() {
    /* Mossbeard — a calm mossy tortoise (story-keeper) */
    return '<svg class="tt-moss-svg" viewBox="0 0 60 50" width="40" height="34" aria-hidden="true">' +
      '<ellipse cx="30" cy="36" rx="9" ry="5" fill="#9BBF7A" stroke="#5E7A45" stroke-width="1.4"/>' +     /* head/front */
      '<path d="M10 34 q20 -22 40 0 z" fill="#6FA856" stroke="#4E7A3C" stroke-width="2"/>' +               /* shell */
      '<path d="M30 14 v18 M18 22 l-2 10 M42 22 l2 10 M24 17 l-3 14 M36 17 l3 14" stroke="#4E7A3C" stroke-width="1.2" fill="none"/>' + /* moss/plates */
      '<g class="tt-moss-eyes-open"><circle cx="27" cy="35" r="1.6" fill="#2B2B2B"/><circle cx="33" cy="35" r="1.6" fill="#2B2B2B"/></g>' +
      '<g class="tt-moss-eyes-happy"><path d="M25 35 q2 -2.5 4 0" stroke="#2B2B2B" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M31 35 q2 -2.5 4 0" stroke="#2B2B2B" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>' +
      '<g fill="#8FBF6A" stroke="#5E7A45" stroke-width=".7"><circle cx="14" cy="20" r="2"/><circle cx="46" cy="20" r="2"/></g></svg>';   /* little moss sprigs */
  }

  var TwoTalesActivity = {
    id: 'two-tales-activity',
    strings: {
      title: { en: 'Two Moons', de: 'Zwei Monde, zwei Geschichten', fr: 'Deux lunes, deux histoires', es: 'Dos lunas, dos cuentos' },
      instruction: { en: 'Read both tales with Mossbeard, then compare what happened to the characters!', de: 'Lies beide Geschichten mit Moosbart und vergleiche, was den Figuren passiert!', fr: 'Lis les deux histoires avec Barbe-de-Mousse, puis compare ce qui arrive aux personnages !', es: '¡Lee los dos cuentos con Barba de Musgo y compara lo que les pasó a los personajes!' },
      q: { en: '{q}', de: '{q}', fr: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._stories = {}; this._tagText = {}; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = -1; this._cardOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('tt-style')) return;
      var s = el('style'); s.id = 'tt-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.tt-root{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:min(96vw,680px);margin:0 auto;}',
        '.tt-tales{display:flex;justify-content:center;gap:8px;width:100%;align-items:stretch;}',   /* side-by-side at ALL widths (one row-height, FITS-safe) */
        '.tt-tale{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 5px;border:2.5px solid #C9B98E;border-radius:13px;background:#FFFDF6;}',
        '.tt-tale.gold{border-color:#D9A93A;}.tt-tale.silver{border-color:#9AA7B0;}',
        '.tt-moon{display:flex;align-items:center;gap:5px;font:800 .74rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#5A4A22;}',
        '.tt-tale.silver .tt-moon{color:#4A5560;}',
        '.tt-dot{width:12px;height:12px;border-radius:50%;flex:0 0 auto;}',
        '.tt-tale.gold .tt-dot{background:#F2C84B;box-shadow:0 0 0 2px #E0B43A;}',
        '.tt-tale.silver .tt-dot{background:#D7DEE4;box-shadow:0 0 0 2px #B4BEC6;}',
        '.tt-scene-svg{width:100%;max-width:92px;height:auto;display:block;}',
        '.tt-sum{font:700 clamp(.8rem,3vw,.96rem)/1.14 Nunito,system-ui,sans-serif;color:#0F4A40;text-align:center;}',
        '.tt-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.tt-moss{flex:0 0 auto;}',
        '.tt-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.tt-line-msg.miss{color:#C2410C;}',
        '.tt-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:100%;align-items:stretch;}',
        '.tt-cand{flex:1 1 30%;min-width:118px;max-width:230px;display:flex;align-items:center;justify-content:center;text-align:center;padding:8px 10px;border:3px solid #146B5E;border-radius:13px;background:#fff;cursor:pointer;min-height:46px;font:800 clamp(.86rem,3.2vw,1rem)/1.14 Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.tt-cand.dim{opacity:.42;}',
        '.tt-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.tt-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.tt-moss-svg .tt-moss-eyes-happy{display:none;}.tt-moss[data-pose=happy] .tt-moss-eyes-open{display:none;}.tt-moss[data-pose=happy] .tt-moss-eyes-happy{display:block;}',
        '.tt-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:600px){.tt-scene-svg{max-width:70px;}.tt-sum{font-size:.8rem;}}',
        '@media (max-width:380px){.tt-root{gap:4px;}.tt-scene-svg{max-width:58px;}.tt-cand{min-width:0;flex-basis:46%;min-height:44px;padding:6px 8px;font-size:.84rem;}.tt-hear{padding:5px 14px;}}',
        '@media (max-width:340px){.tt-scene-svg{display:none;}}',   /* tiniest phones go text-first (the glyph is decorative; summary+Hear carry it) — reclaims the resolved-state fold budget */
        '.lcs-app:not(.moss-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'two-tales.compare.rl-1-9';
      var tries = ['/mini-tools/two-tales-activities.json', 'two-tales-activities.json', '../mini tools/two-tales-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && row.params.rounds) || [];
            self._stories = (row && row.params && ((row.params.storiesL10n && row.params.storiesL10n[LANG]) || row.params.stories)) || {};
            self._tagText = (row && row.params && ((row.params.tagTextL10n && row.params.tagTextL10n[LANG]) || row.params.tagText)) || {};
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
      var q = round.mode === 'diff' ? txt('qDiff') : txt('qSame');
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: q }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = -1;
      /* SHUFFLE card display order so position ≠ answer. */
      this._cardOrder = this._shuffle((round.cardTags || []).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('moss-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'tt-root');

      /* two tales */
      var tales = el('div', 'tt-tales');
      tales.appendChild(this._tale('gold', this._stories[round.aId]));
      tales.appendChild(this._tale('silver', this._stories[round.bId]));
      root.appendChild(tales);

      /* Mossbeard + live line */
      var say = el('div', 'tt-say');
      var ms = el('div', 'tt-moss'); ms.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); ms.innerHTML = mossSVG();
      var msg = el('p', 'tt-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(ms, msg); root.appendChild(say); this._moss = ms;

      /* Hear both */
      var hear = el('button', 'tt-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      var self = this;
      hear.addEventListener('click', function () {
        var a = self._stories[round.aId] || {}, b = self._stories[round.bId] || {};
        var t = txt('gold') + '. ' + (a.summary || '') + ' ' + txt('silver') + '. ' + (b.summary || '');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: LANG, rate: 0.9 }); } catch (e) { } }
      });
      root.appendChild(hear);

      /* the 3 statement cards */
      this._renderStrip(root);
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _tale: function (moon, story) {
      var t = el('div', 'tt-tale ' + moon);
      var head = el('div', 'tt-moon');
      var dot = el('span', 'tt-dot'); var nm = el('span'); nm.textContent = moon === 'gold' ? txt('gold') : txt('silver');
      head.append(dot, nm);
      var sc = el('div'); sc.style.width = '100%'; sc.style.display = 'flex'; sc.style.justifyContent = 'center'; sc.innerHTML = sceneSVG((story && story.glyph) || '');
      var sum = el('div', 'tt-sum'); sum.textContent = (story && story.summary) || '';
      t.append(head, sc, sum);
      return t;
    },

    _renderStrip: function (root) {
      var self = this, r = this._round, stories = this._stories, tok = this._token;
      var strip = el('div', 'tt-strip');
      var order = this._cardOrder || (r.cardTags || []).map(function (_, i) { return i; });
      order.forEach(function (ci) {
        var tag = r.cardTags[ci];
        var b = el('button', 'tt-cand' + (self._nonConf[ci] ? ' dim' : '') + (self._lit === ci ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-ci', ci);
        b.textContent = self._tagText[tag] || tag;
        b.setAttribute('aria-label', b.textContent);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[ci] || self._token !== tok) return;
          if (Core.isAnswer(r, stories, ci)) { self._lit = ci; self._resolve(); }
          else { self._nonConf[ci] = 1; self._nudge(); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('moss-resolved');
      this.render();
      var line = this._api.stage.querySelector('.tt-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function () {
      var r = this._round;
      var msgText = txt(r.mode === 'diff' ? 'reDiff' : 'reSame');
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.tt-line-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function () {
      var r = this._round, a = this._stories[r.aId] || {}, b = this._stories[r.bId] || {};
      var self = this, wrap = el('div', 'tt-sronly'); wrap.setAttribute('aria-live', 'polite');
      var q = r.mode === 'diff' ? txt('qDiff') : txt('qSame');
      var cards = (r.cardTags || []).map(function (t) { return self._tagText[t] || t; }).join('; ');
      wrap.innerHTML = '<p>' + txt('gold') + ': ' + (a.summary || '') + ' ' + txt('silver') + ': ' + (b.summary || '') + ' ' + q + ' ' + txt('choices') + ' ' + cards + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.TwoTalesActivity = TwoTalesActivity;

}(typeof window !== 'undefined' ? window : this));
