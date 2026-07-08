/* =====================================================================
   FABLE'S PICTURE STORIES — ACTIVITY SKIN  (picture-story-activity.js)
   ---------------------------------------------------------------------
   RL.K.1 · story key-details — CLARITY-FIRST redesign of #58. The lcs-shell
   skin over picture-story-core.js. answerType:'state'. EN-ONLY pilot.

   Fable the fox shows a short 3-panel CAPTIONED picture-story; the child
   reads/views it (a "Hear the story" button reads the captions aloud — pre-
   reader support), then answers a key-detail question by tapping a text card.
   The question flows through the SHELL prompt banner (one prompt). A correct
   tap → Fable wiggles (resolve; shell Check hidden until `.lcs-app.fable-
   resolved`). A wrong tap → a warm nudge (re-read the story), no advance.
   0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PictureStoryCore;
  var LANG = 'en';

  var L = {
    en: {
      win: 'Yes! {note}', winNote: 'You remembered the story!',
      nudge: 'Look at the pictures again — the answer is in the story.',
      hear: '🔊 Hear the story'
    },
    de: {
      win: 'Ja! {note}', winNote: 'Du hast dir die Geschichte gut gemerkt!',
      nudge: 'Schau dir die Bilder noch einmal an — die Antwort steckt in der Geschichte.',
      hear: '🔊 Geschichte vorlesen'
    },
    fr: {
      win: 'Oui ! {note}', winNote: 'Tu t’es rappelé toute l’histoire !',
      nudge: 'Regarde encore les images — la réponse est dans l’histoire.',
      hear: '🔊 Écouter l’histoire'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* ---- simple SVG scene-glyphs (each drawn centered ~ (18,18) in a 36 box) ---- */
  var GLYPHS = {
    bunny: '<ellipse cx="18" cy="26" rx="9" ry="10" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.5"/><ellipse cx="14" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><ellipse cx="22" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><circle cx="15" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="18" cy="28" r="1.4" fill="#E7A6A0"/>',
    mouse: '<ellipse cx="18" cy="24" rx="10" ry="9" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.5"/><circle cx="11" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><circle cx="25" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><path d="M27 27 q7 2 6 8" stroke="#7E7873" stroke-width="1.5" fill="none"/><circle cx="16" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="21" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="18.5" cy="27" r="1.2" fill="#E7A6A0"/>',
    bird: '<line x1="17" y1="28" x2="17" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><line x1="21" y1="28" x2="21" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><path d="M26 21 l8 -3 l-2 6 z" fill="#3E8794"/><ellipse cx="19" cy="23" rx="9" ry="7" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.5"/><circle cx="13" cy="16" r="5.5" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.4"/><path d="M8 15 l-6 2 l6 2.5 z" fill="#F2A65A" stroke="#D2761F" stroke-width="1"/><path d="M20 22 q5 -3 8 1 q-4 3 -8 0z" fill="#3E8794"/><circle cx="12" cy="15" r="1.4" fill="#2B2B2B"/>',
    friend: '<circle cx="18" cy="22" r="10" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.5"/><circle cx="11" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="25" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="15" cy="21" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="21" r="1.4" fill="#2B2B2B"/><path d="M15 26 q3 2 6 0" stroke="#7A5A2A" stroke-width="1.3" fill="none"/>',
    tree: '<rect x="16" y="20" width="5" height="14" rx="1" fill="#8B5E3C"/><circle cx="18.5" cy="14" r="11" fill="#6FA886" stroke="#4E8A5C" stroke-width="1.5"/>',
    mitten: '<path d="M16 24 v-7 a6 6 0 0 1 12 0 v7 z" fill="#E05C4B" stroke="#A83A2C" stroke-width="1.5"/><path d="M16 16 a4.5 4.5 0 0 0 -5 4.3 a3.6 3.6 0 0 0 5 3.2 z" fill="#E05C4B" stroke="#A83A2C" stroke-width="1.4"/><rect x="14" y="23.5" width="15" height="6.5" rx="2.5" fill="#C94A3A" stroke="#A83A2C" stroke-width="1.3"/><g stroke="#A83A2C" stroke-width=".9" opacity=".8"><line x1="18" y1="24.5" x2="18" y2="29"/><line x1="21.5" y1="24.5" x2="21.5" y2="29"/><line x1="25" y1="24.5" x2="25" y2="29"/></g>',
    carrot: '<path d="M18 33 l-6 -17 a6 6 0 0 1 12 0 z" fill="#F2784B" stroke="#C2410C" stroke-width="1.3"/><path d="M18 16 l-3 -6 M18 16 l0 -7 M18 16 l3 -6" stroke="#4E8A5C" stroke-width="2" stroke-linecap="round"/>',
    snow: '<path d="M2 30 q16 -5 32 0 v6 h-32z" fill="#E8F0F4"/><circle cx="10" cy="12" r="1.6" fill="#fff" stroke="#cdd8de" stroke-width=".6"/><circle cx="22" cy="9" r="1.6" fill="#fff" stroke="#cdd8de" stroke-width=".6"/><circle cx="28" cy="18" r="1.6" fill="#fff" stroke="#cdd8de" stroke-width=".6"/>',
    sun: '<g stroke="#F2C14E" stroke-width="2" stroke-linecap="round"><line x1="18" y1="3" x2="18" y2="8"/><line x1="18" y1="28" x2="18" y2="33"/><line x1="3" y1="18" x2="8" y2="18"/><line x1="28" y1="18" x2="33" y2="18"/><line x1="7" y1="7" x2="11" y2="11"/><line x1="25" y1="25" x2="29" y2="29"/><line x1="29" y1="7" x2="25" y2="11"/><line x1="11" y1="25" x2="7" y2="29"/></g><circle cx="18" cy="18" r="8" fill="#F2C14E"/>',
    rain: '<g fill="#9FB0B8"><circle cx="13" cy="15" r="7"/><circle cx="23" cy="15" r="8"/><circle cx="18" cy="11" r="7"/></g><rect x="10" y="14" width="18" height="6" fill="#9FB0B8"/><g stroke="#5BA3B0" stroke-width="2" stroke-linecap="round"><line x1="12" y1="24" x2="10" y2="30"/><line x1="19" y1="24" x2="17" y2="31"/><line x1="26" y1="24" x2="24" y2="30"/></g>',
    umbrella: '<path d="M5 20 a13 13 0 0 1 26 0 z" fill="#F2784B" stroke="#C2410C" stroke-width="1.3"/><path d="M5 20 q3.5 4 6.5 0 q3.5 4 6.5 0 q3.5 4 6.5 0 q3.5 4 6.5 0" fill="none" stroke="#C2410C" stroke-width="1"/><line x1="18" y1="20" x2="18" y2="32" stroke="#8B5E3C" stroke-width="1.8"/><path d="M18 32 a3 3 0 0 0 4 0" fill="none" stroke="#8B5E3C" stroke-width="1.8"/>',
    basket: '<path d="M9 18 a9 7 0 0 1 18 0" fill="none" stroke="#8B5E3C" stroke-width="1.8"/><path d="M8 20 h20 l-2 12 h-16 z" fill="#C58A4E" stroke="#8B5E3C" stroke-width="1.3"/><rect x="6.5" y="18.5" width="23" height="3.5" rx="1.5" fill="#A8763E"/><g stroke="#9A6A36" stroke-width="1"><line x1="13" y1="22.5" x2="12.5" y2="31"/><line x1="18" y1="22.5" x2="18" y2="31"/><line x1="23" y1="22.5" x2="23.5" y2="31"/><line x1="9.5" y1="26" x2="26.5" y2="26"/></g>'
  };
  function placeGlyph(name, cx, cy, k) {
    var g = GLYPHS[name] || ''; return '<g transform="translate(' + (cx - 18 * k).toFixed(1) + ',' + (cy - 18 * k).toFixed(1) + ') scale(' + k + ')">' + g + '</g>';
  }
  function sceneSVG(glyphs) {
    var n = (glyphs || []).length, xs = n <= 1 ? [44] : n === 2 ? [28, 60] : [20, 44, 68], k = n <= 1 ? 1.45 : n === 2 ? 1.2 : 0.95, inner = '';
    for (var i = 0; i < n; i++) inner += placeGlyph(glyphs[i], xs[i], 28, k);
    return '<svg class="ps-scene" viewBox="0 0 88 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="1" y="1" width="86" height="54" rx="8" fill="#FFFDF6" stroke="#E0D6C2" stroke-width="1.5"/>' + inner + '</svg>';
  }

  function fableSVG() {
    return '<svg class="ps-fable-svg" viewBox="0 0 56 52" width="36" height="34" aria-hidden="true">' +
      '<path d="M9 14 l4 10 l-8 -1 z" fill="#E08A4A" stroke="#B4632A" stroke-width="1.5"/><path d="M47 14 l-4 10 l8 -1 z" fill="#E08A4A" stroke="#B4632A" stroke-width="1.5"/>' +   /* ears */
      '<ellipse cx="28" cy="30" rx="16" ry="14" fill="#E08A4A" stroke="#B4632A" stroke-width="2"/>' +
      '<path d="M28 30 q-9 4 -12 13 q12 4 24 0 q-3 -9 -12 -13z" fill="#FBEFE0"/>' +   /* muzzle */
      '<ellipse cx="28" cy="40" rx="3" ry="2.2" fill="#3A2A20"/>' +
      '<g class="ps-eyes-open"><circle cx="22" cy="28" r="2.2" fill="#2B2B2B"/><circle cx="34" cy="28" r="2.2" fill="#2B2B2B"/></g>' +
      '<g class="ps-eyes-happy"><path d="M19 28 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M31 28 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g></svg>';
  }

  var PictureStoryActivity = {
    id: 'picture-story-activity',
    strings: {
      title: { en: "Fable's Picture Stories", de: 'Fabels Bildergeschichten', fr: 'Les histoires de Fable' },
      instruction: { en: 'Read the little story with Fable the fox, then answer about it!', de: 'Lies die kleine Geschichte mit Fabel dem Fuchs und beantworte dann die Frage!', fr: 'Lis la petite histoire avec Fable le renard, puis réponds !' },
      q: { en: '{q}', de: '{q}', fr: '{q}' }
    },

    init: function (api) {
      this._api = api; LANG = (api && api.lang) || 'en';
      this._pool = []; this._stories = {}; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._choiceOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('ps-style')) return;
      var s = el('style'); s.id = 'ps-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.ps-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,620px);margin:0 auto;}',
        '.ps-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.ps-fable{flex:0 0 auto;}',
        '.ps-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.ps-line-msg.miss{color:#C2410C;}',
        '.ps-strip{display:flex;justify-content:center;gap:9px;width:100%;max-width:min(96vw,580px);}',
        '.ps-panel{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:3px;}',
        '.ps-scene{width:100%;height:auto;display:block;}',
        '.ps-cap{font:700 clamp(.66rem,2.5vw,.86rem)/1.12 Nunito,system-ui,sans-serif;color:#0F4A40;text-align:center;}',
        '.ps-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.ps-board{width:100%;max-width:min(96vw,600px);display:flex;flex-direction:column;gap:10px;align-items:center;}',
        '.ps-row{display:flex;justify-content:center;align-items:stretch;width:100%;gap:10px;}',
        '.ps-cand{flex:1 1 0;min-width:0;min-height:clamp(50px,8vw,78px);padding:7px 9px;border:3px solid #146B5E;border-radius:14px;background:#fff;color:#0F4A40;cursor:pointer;font:700 clamp(1.12rem,4vw,1.6rem)/1.15 Nunito,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;text-align:center;overflow-wrap:break-word;}',
        '.ps-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.ps-cand.dim{opacity:.4;}',
        '.ps-fable-svg .ps-eyes-happy{display:none;}.ps-fable[data-pose=happy] .ps-eyes-open{display:none;}.ps-fable[data-pose=happy] .ps-eyes-happy{display:block;}',
        '.ps-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.ps-root{gap:7px;}.ps-cand{min-height:48px;}}',
        '.lcs-app:not(.fable-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'picture-story.read.rl-k-1';
      var tries = ['/mini-tools/picture-story-activities.json', 'picture-story-activities.json', '../mini tools/picture-story-activities.json'];
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
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {};
      this._choiceOrder = this._shuffle((round.options || []).slice());
      if (this._app) this._app.classList.remove('fable-resolved');
    },

    _story: function () { return this._stories[this._round.storyId] || { panels: [] }; },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'ps-root');

      var say = el('div', 'ps-say');
      var fa = el('div', 'ps-fable'); fa.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); fa.innerHTML = fableSVG();
      var msg = el('p', 'ps-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(fa, msg); root.appendChild(say); this._fable = fa;

      this._renderStrip(root);
      this._renderOptions(root);
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _renderStrip: function (root) {
      var self = this, story = this._story();
      var strip = el('div', 'ps-strip');
      (story.panels || []).forEach(function (p) {
        var panel = el('div', 'ps-panel');
        var sc = el('div'); sc.style.width = '100%'; sc.innerHTML = sceneSVG(p.glyphs || []);
        var cap = el('div', 'ps-cap'); cap.textContent = p.caption || '';
        panel.append(sc, cap); strip.appendChild(panel);
      });
      root.appendChild(strip);
      var hear = el('button', 'ps-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = (story.panels || []).map(function (p) { return p.caption; }).join('. ');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: LANG, rate: 0.9 }); } catch (e) { } }
      });
      root.appendChild(hear);
    },

    _renderOptions: function (root) {
      var self = this, r = this._round, tok = this._token;
      var board = el('div', 'ps-board');
      var row = el('div', 'ps-row');
      this._choiceOrder.forEach(function (val) {
        var b = el('button', 'ps-cand' + (self._nonConf[val] ? ' dim' : ''));
        b.type = 'button'; b.textContent = val; b.setAttribute('aria-label', val);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[val] || self._token !== tok) return;
          if (Core.isAnswer(r, val)) self._resolve();
          else { self._nonConf[val] = 1; self._nudge(); }
        });
        row.appendChild(b);
      });
      board.appendChild(row);
      root.appendChild(board);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('fable-resolved');
      this.render();
      var line = this._api.stage.querySelector('.ps-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function () {
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.ps-line-msg');
      if (line) { line.textContent = txt('nudge'); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt('nudge'));
    },

    _srMirror: function () {
      var r = this._round, story = this._story(), wrap = el('div', 'ps-sronly'); wrap.setAttribute('aria-live', 'polite');
      var caps = (story.panels || []).map(function (p) { return p.caption; }).join(' ');
      wrap.innerHTML = LANG === 'de'
        ? '<p>Geschichte: ' + caps + ' Frage: ' + r.prompt + ' Auswahl: ' + this._choiceOrder.join('; ') + '.</p>'
        : LANG === 'fr'
        ? '<p>Histoire : ' + caps + ' Question : ' + r.prompt + ' Choix : ' + this._choiceOrder.join('; ') + '.</p>'
        : '<p>Story: ' + caps + ' Question: ' + r.prompt + ' Choices: ' + this._choiceOrder.join('; ') + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.PictureStoryActivity = PictureStoryActivity;

}(typeof window !== 'undefined' ? window : this));
