/* =====================================================================
   DOT'S STORY SPINE — ACTIVITY SKIN  (story-spine-activity.js)
   ---------------------------------------------------------------------
   RL.K.3 · story-grammar role-typing (setting/problem/solution) — CLARITY-
   FIRST redesign of #62. The lcs-shell skin over story-spine-core.js.
   answerType:'state'. EN-ONLY pilot.

   Dot the dragon shows a 3-panel CAPTIONED picture-story (reusing the #58
   captioned-strip + fixed glyphs). The THREE panels are the tap targets; each
   round asks for one narrative JOB ("Which part is THE START / THE TROUBLE /
   THE FIX?") and the child taps the matching panel. The question flows through
   the SHELL prompt banner. A correct tap → the panel glows + Dot wiggles
   (resolve; shell Check hidden until `.lcs-app.dot-resolved`). A wrong tap →
   a warm causal nudge, no advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.StorySpineCore;
  var LANG = 'en';

  var L = {
    en: {
      win: 'Yes! {note}', winNote: 'You found that part of the story!',
      nSetting: 'The start is where & who the story begins with.',
      nProblem: 'The trouble is the part where something goes wrong.',
      nSolution: 'The fix is how the trouble gets better at the end.',
      hear: '🔊 Hear the story'
    },
    de: {
      win: 'Ja! {note}', winNote: 'Du hast diesen Teil der Geschichte gefunden!',
      nSetting: 'Der Anfang zeigt, wer dabei ist und wo alles beginnt.',
      nProblem: 'Das Problem zeigt, was schiefgeht.',
      nSolution: 'Die Lösung zeigt, wie alles wieder gut wird.',
      hear: '🔊 Geschichte vorlesen'
    },
    fr: {
      win: 'Oui ! {note}', winNote: 'Tu as trouvé cette partie de l’histoire !',
      nSetting: 'Le début, c’est où et avec qui l’histoire commence.',
      nProblem: 'Le problème, c’est le moment où quelque chose ne va pas.',
      nSolution: 'La solution, c’est comment le problème s’arrange à la fin.',
      hear: '🔊 Écouter l’histoire'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* ---- the FIXED #58 scene-glyphs (each centered ~(18,18) in a 36 box) ---- */
  var GLYPHS = {
    bunny: '<ellipse cx="18" cy="26" rx="9" ry="10" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.5"/><ellipse cx="14" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><ellipse cx="22" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><circle cx="15" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="18" cy="28" r="1.4" fill="#E7A6A0"/>',
    mouse: '<ellipse cx="18" cy="24" rx="10" ry="9" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.5"/><circle cx="11" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><circle cx="25" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><path d="M27 27 q7 2 6 8" stroke="#7E7873" stroke-width="1.5" fill="none"/><circle cx="16" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="21" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="18.5" cy="27" r="1.2" fill="#E7A6A0"/>',
    bird: '<line x1="17" y1="28" x2="17" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><line x1="21" y1="28" x2="21" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><path d="M26 21 l8 -3 l-2 6 z" fill="#3E8794"/><ellipse cx="19" cy="23" rx="9" ry="7" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.5"/><circle cx="13" cy="16" r="5.5" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.4"/><path d="M8 15 l-6 2 l6 2.5 z" fill="#F2A65A" stroke="#D2761F" stroke-width="1"/><path d="M20 22 q5 -3 8 1 q-4 3 -8 0z" fill="#3E8794"/><circle cx="12" cy="15" r="1.4" fill="#2B2B2B"/>',
    friend: '<circle cx="18" cy="22" r="10" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.5"/><circle cx="11" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="25" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="15" cy="21" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="21" r="1.4" fill="#2B2B2B"/><path d="M15 26 q3 2 6 0" stroke="#7A5A2A" stroke-width="1.3" fill="none"/>',
    tree: '<rect x="16" y="20" width="5" height="14" rx="1" fill="#8B5E3C"/><circle cx="18.5" cy="14" r="11" fill="#6FA886" stroke="#4E8A5C" stroke-width="1.5"/>',
    mitten: '<path d="M16 24 v-7 a6 6 0 0 1 12 0 v7 z" fill="#E05C4B" stroke="#A83A2C" stroke-width="1.5"/><path d="M16 16 a4.5 4.5 0 0 0 -5 4.3 a3.6 3.6 0 0 0 5 3.2 z" fill="#E05C4B" stroke="#A83A2C" stroke-width="1.4"/><rect x="14" y="23.5" width="15" height="6.5" rx="2.5" fill="#C94A3A" stroke="#A83A2C" stroke-width="1.3"/><g stroke="#A83A2C" stroke-width=".9" opacity=".8"><line x1="18" y1="24.5" x2="18" y2="29"/><line x1="21.5" y1="24.5" x2="21.5" y2="29"/><line x1="25" y1="24.5" x2="25" y2="29"/></g>',
    carrot: '<path d="M18 33 l-6 -17 a6 6 0 0 1 12 0 z" fill="#F2784B" stroke="#C2410C" stroke-width="1.3"/><path d="M18 16 l-3 -6 M18 16 l0 -7 M18 16 l3 -6" stroke="#4E8A5C" stroke-width="2" stroke-linecap="round"/>',
    snow: '<path d="M1 27 q17 -8 34 0 v9 h-34z" fill="#EAF2F7" stroke="#CBD9E2" stroke-width="1"/><g fill="#fff" stroke="#AEC2CE" stroke-width=".7"><circle cx="8" cy="9" r="2.6"/><circle cx="19" cy="6" r="2.6"/><circle cx="29" cy="11" r="2.6"/><circle cx="13" cy="17" r="2.4"/><circle cx="26" cy="20" r="2.4"/></g>',
    sun: '<g stroke="#F2C14E" stroke-width="2" stroke-linecap="round"><line x1="18" y1="3" x2="18" y2="8"/><line x1="18" y1="28" x2="18" y2="33"/><line x1="3" y1="18" x2="8" y2="18"/><line x1="28" y1="18" x2="33" y2="18"/><line x1="7" y1="7" x2="11" y2="11"/><line x1="25" y1="25" x2="29" y2="29"/><line x1="29" y1="7" x2="25" y2="11"/><line x1="11" y1="25" x2="7" y2="29"/></g><circle cx="18" cy="18" r="8" fill="#F2C14E"/>',
    rain: '<g fill="#9FB0B8"><circle cx="13" cy="15" r="7"/><circle cx="23" cy="15" r="8"/><circle cx="18" cy="11" r="7"/></g><rect x="10" y="14" width="18" height="6" fill="#9FB0B8"/><g stroke="#5BA3B0" stroke-width="2" stroke-linecap="round"><line x1="12" y1="24" x2="10" y2="30"/><line x1="19" y1="24" x2="17" y2="31"/><line x1="26" y1="24" x2="24" y2="30"/></g>',
    umbrella: '<path d="M5 20 a13 13 0 0 1 26 0 z" fill="#F2784B" stroke="#C2410C" stroke-width="1.3"/><path d="M5 20 q3.5 4 6.5 0 q3.5 4 6.5 0 q3.5 4 6.5 0 q3.5 4 6.5 0" fill="none" stroke="#C2410C" stroke-width="1"/><line x1="18" y1="20" x2="18" y2="32" stroke="#8B5E3C" stroke-width="1.8"/><path d="M18 32 a3 3 0 0 0 4 0" fill="none" stroke="#8B5E3C" stroke-width="1.8"/>',
    basket: '<path d="M9 18 a9 7 0 0 1 18 0" fill="none" stroke="#8B5E3C" stroke-width="1.8"/><path d="M8 20 h20 l-2 12 h-16 z" fill="#C58A4E" stroke="#8B5E3C" stroke-width="1.3"/><rect x="6.5" y="18.5" width="23" height="3.5" rx="1.5" fill="#A8763E"/><g stroke="#9A6A36" stroke-width="1"><line x1="13" y1="22.5" x2="12.5" y2="31"/><line x1="18" y1="22.5" x2="18" y2="31"/><line x1="23" y1="22.5" x2="23.5" y2="31"/><line x1="9.5" y1="26" x2="26.5" y2="26"/></g>'
  };
  function placeGlyph(name, cx, cy, k) { var g = GLYPHS[name] || ''; return '<g transform="translate(' + (cx - 18 * k).toFixed(1) + ',' + (cy - 18 * k).toFixed(1) + ') scale(' + k + ')">' + g + '</g>'; }
  /* panels ARE the answer cards here → the glyphs must FILL the panel (the
     not-sparse gate). Bigger glyphs + a taller scene than the #58 decorative
     panels. */
  function sceneSVG(glyphs) {
    var n = (glyphs || []).length, xs = n <= 1 ? [44] : n === 2 ? [26, 62] : [19, 44, 69], k = n <= 1 ? 1.85 : n === 2 ? 1.55 : 1.15, inner = '';
    for (var i = 0; i < n; i++) inner += placeGlyph(glyphs[i], xs[i], 34, k);
    return '<svg class="ds-scene" viewBox="0 0 88 66" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="1" y="1" width="86" height="64" rx="8" fill="#FFFDF6" stroke="#E0D6C2" stroke-width="1.5"/>' + inner + '</svg>';
  }

  function dotSVG() {
    return '<svg class="ds-dot-svg" viewBox="0 0 56 52" width="36" height="34" aria-hidden="true">' +
      '<path d="M12 12 l3 7 l-7 0 z" fill="#E8B14A" stroke="#B4842A" stroke-width="1.4"/><path d="M30 12 l-3 7 l7 0 z" fill="#E8B14A" stroke="#B4842A" stroke-width="1.4"/>' +   /* horns */
      '<ellipse cx="24" cy="30" rx="17" ry="14" fill="#F0C66A" stroke="#B4842A" stroke-width="2"/>' +
      '<ellipse cx="40" cy="33" rx="9" ry="7" fill="#F5D78C" stroke="#B4842A" stroke-width="1.6"/>' +   /* snout */
      '<ellipse cx="45" cy="32" rx="1.5" ry="1.1" fill="#7A5A2A"/>' +
      '<g class="ds-eyes-open"><circle cx="22" cy="27" r="2.2" fill="#2B2B2B"/><circle cx="31" cy="27" r="2.2" fill="#2B2B2B"/></g>' +
      '<g class="ds-eyes-happy"><path d="M19 27 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M28 27 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M8 38 q-4 -2 -4 -7 M8 42 q-5 0 -6 -5" stroke="#B4842A" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';   /* little spine plates hint */
  }

  var StorySpineActivity = {
    id: 'story-spine-activity',
    strings: {
      title: { en: "Dot's Story Spine", de: 'Dots Geschichten-Werkstatt', fr: 'L’atelier des histoires de Dot' },
      instruction: { en: 'Read the story with Dot, then tap which part does each job!', de: 'Lies die Geschichte mit Dot und tippe dann auf den richtigen Teil.', fr: 'Écoute l’histoire avec Dot, puis tape la bonne partie !' },
      q: { en: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._stories = {}; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = -1;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('ds-style')) return;
      var s = el('style'); s.id = 'ds-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.ds-root{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:min(96vw,640px);margin:0 auto;}',
        '.ds-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.ds-dot{flex:0 0 auto;}',
        '.ds-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.ds-line-msg.miss{color:#C2410C;}',
        '.ds-strip{display:flex;justify-content:center;gap:10px;width:100%;max-width:min(96vw,600px);align-items:stretch;}',
        '.ds-cand{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 4px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:44px;}',
        '.ds-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.ds-cand.dim{opacity:.4;}',
        '.ds-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.ds-scene{width:100%;height:auto;display:block;}',
        '.ds-cap{font:700 clamp(.62rem,2.4vw,.82rem)/1.08 Nunito,system-ui,sans-serif;color:#0F4A40;text-align:center;}',
        '.ds-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.ds-dot-svg .ds-eyes-happy{display:none;}.ds-dot[data-pose=happy] .ds-eyes-open{display:none;}.ds-dot[data-pose=happy] .ds-eyes-happy{display:block;}',
        '.ds-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.ds-root{gap:8px;}}',
        '.lcs-app:not(.dot-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'story-spine.role.rl-k-3';
      var tries = ['/mini-tools/story-spine-activities.json', 'story-spine-activities.json', '../mini tools/story-spine-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds)) || [];
            self._stories = (row && row.params && ((row.params.storiesL10n && row.params.storiesL10n[LANG]) || row.params.stories)) || {};
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
        id: round.id, promptKey: 'q', promptArgs: { q: round.prompt }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = -1;
      /* SHUFFLE the panel display order so position ≠ role (the child must READ
         each part, not tap "the middle = the trouble"). Role-typing is order-
         independent, so showing the parts shuffled is correct. */
      this._panelOrder = this._shuffle((this._story().panels || []).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('dot-resolved');
    },

    _story: function () { return this._stories[this._round.storyId] || { panels: [] }; },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'ds-root');

      var say = el('div', 'ds-say');
      var dt = el('div', 'ds-dot'); dt.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); dt.innerHTML = dotSVG();
      var msg = el('p', 'ds-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(dt, msg); root.appendChild(say); this._dot = dt;

      this._renderStrip(root);
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _renderStrip: function (root) {
      var self = this, r = this._round, story = this._story(), tok = this._token;
      var strip = el('div', 'ds-strip');
      var order = this._panelOrder || (story.panels || []).map(function (_, i) { return i; });
      order.forEach(function (pi) {
        var p = story.panels[pi];
        var b = el('button', 'ds-cand' + (self._nonConf[pi] ? ' dim' : '') + (self._lit === pi ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('aria-label', p.caption); b.setAttribute('data-pi', pi);
        var sc = el('div'); sc.style.width = '100%'; sc.innerHTML = sceneSVG(p.glyphs || []);
        var cap = el('div', 'ds-cap'); cap.textContent = p.caption || '';
        b.append(sc, cap);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[pi] || self._token !== tok) return;
          if (Core.isAnswer(r, story, pi)) { self._lit = pi; self._resolve(); }
          else { self._nonConf[pi] = 1; self._nudge(r.role); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
      var hear = el('button', 'ds-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = (story.panels || []).map(function (p) { return p.caption; }).join('. ');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: LANG, rate: 0.9 }); } catch (e) { } }
      });
      root.appendChild(hear);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('dot-resolved');
      this.render();
      var line = this._api.stage.querySelector('.ds-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function (role) {
      var key = role === 'setting' ? 'nSetting' : role === 'problem' ? 'nProblem' : 'nSolution';
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.ds-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, story = this._story(), wrap = el('div', 'ds-sronly'); wrap.setAttribute('aria-live', 'polite');
      var partWord = LANG === 'fr' ? 'Partie ' : LANG === 'de' ? 'Teil ' : 'Part ';
      var caps = (story.panels || []).map(function (p, i) { return partWord + (i + 1) + ': ' + p.caption; }).join(' ');
      var tail = LANG === 'fr' ? ' Tape la partie qui correspond.' : LANG === 'de' ? ' Tippe auf den passenden Teil.' : ' Tap the part that matches.';
      wrap.innerHTML = '<p>' + caps + ' ' + r.prompt + tail + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.StorySpineActivity = StorySpineActivity;

}(typeof window !== 'undefined' ? window : this));
