/* =====================================================================
   WILLOW'S STORY CORNER — ACTIVITY  (willow-story-corner-activity.js)
   ---------------------------------------------------------------------
   CCSS RL.K.9 — compare and contrast the adventures and experiences of
   characters in two stories. Willow the tortoise reads TWO short tales
   about two animal friends; the child listens, then answers WHO had a
   named experience — tap A / B / Both / Neither. CHARACTER-centric (the
   answer is a character), distinct from two-tales (RL.1.9), where the
   answer is an experience statement.

   Validity DERIVED by mini tools/compare-tales-core.js (the fact-key
   predicate over the two tales; never a stored answer). The skin consumes
   ONLY childView. answerType:'state' → the child taps an option (in-stage
   selection), the shell Check grades it; a wrong tap gives a DIFFUSE nudge
   (re-read both tales), never "which one." Per-pass order-only reshuffle
   (§A.13.60). Glyphs/panels = emoji PLACEHOLDERS for later CA5 art. No
   timer/score/streak. 0 lines to any existing core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CompareTalesCore;
  var LANG = 'en';

  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  // glyph + per-beat emoji = STUB art (CA5 replaces later)
  var EMOJI = {
    'fox': '🦊', 'bunny': '🐰', 'bear': '🐻', 'mouse': '🐭', 'owl': '🦉', 'frog': '🐸',
    'fox-1': '🧣', 'fox-2': '🔎', 'fox-3': '😊',
    'bunny-1': '⚽', 'bunny-2': '🤝', 'bunny-3': '🎉',
    'bear-1': '🏰', 'bear-2': '🌊', 'bear-3': '🏰',
    'mouse-1': '🧁', 'mouse-2': '🤝', 'mouse-3': '😋',
    'owl-1': '😨', 'owl-2': '🦉', 'owl-3': '😌',
    'frog-1': '⛰️', 'frog-2': '🪁', 'frog-3': '😄'
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG === 'fr' ? 'fr-FR' : 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .95; u.lang = LANG === 'fr' ? 'fr-FR' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }

  function willowSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy
      ? '<path d="M40 44 q4 -4 8 0 M58 44 q4 -4 8 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<circle cx="44" cy="45" r="2.8" fill="#2A2A35"/><circle cx="62" cy="45" r="2.8" fill="#2A2A35"/>';
    return '<svg class="wsc-willow-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Willow la tortue' : 'Willow the tortoise') + '">' +
      '<ellipse cx="34" cy="62" rx="26" ry="20" fill="#7FB98E" stroke="#4E8A60" stroke-width="2"/>' +   /* shell */
      '<path d="M14 60 q20 -14 40 0" fill="none" stroke="#4E8A60" stroke-width="2"/>' +
      '<ellipse cx="70" cy="46" rx="15" ry="13" fill="#A7D8B4"/>' +   /* head */
      eyes +
      '<path d="M64 52 q6 4 12 0" stroke="#2A2A35" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.WillowStoryCornerActivity = {
    id: 'willow-story-corner-activity',

    strings: {
      title: { en: "Willow's Story Corner", fr: 'Le coin des histoires de Willow' },
      prompt: { en: 'Listen to both tales, then tap who!', fr: 'Écoute, puis tape qui c’est !' },
      willowIntro: { en: 'Two tales today! Listen, then tell me who.', fr: 'Deux histoires aujourd’hui ! Écoute, puis dis-moi qui.' },
      hearBoth: { en: '▶ Hear both tales', fr: '▶ Écouter les deux histoires' },
      hearAgain: { en: '▶ Hear them again', fr: '▶ Les écouter encore' },
      theAsk: { en: 'Willow asks:', fr: 'Willow demande :' },
      hintPick: { en: 'Tap who it is — or Both, or Neither!', fr: 'Tape qui c’est — ou Les deux, ou Aucun !' },
      hintWrong: { en: 'Hmm — listen to both tales again, then try.', fr: 'Hmm — réécoute les deux histoires, puis essaie.' },
      willowWin: { en: 'Yes! You compared both tales!', fr: 'Bravo ! Tu as comparé les deux histoires !' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks(null); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._narrToken = 0; this._spokeAsk = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._narrToken++; this._spokeAsk = false;
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'wsc-wrap'); var root = api.el('div', 'wsc-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      // Willow + speech
      var row = api.el('div', 'wsc-wrow');
      var w = api.el('div', 'wsc-willow'); w.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); w.innerHTML = willowSVG(this.sel ? 'happy' : 'idle'); row.appendChild(w);
      var say = api.el('div', 'wsc-say'); say.textContent = api.t('willowIntro'); row.appendChild(say);
      root.appendChild(row);

      // hear-both
      var hear = api.el('button', 'wsc-hear'); hear.type = 'button'; hear.textContent = api.t(this._heard ? 'hearAgain' : 'hearBoth');
      hear.addEventListener('click', function () { self._playBoth(); });
      root.appendChild(hear);

      // the two tales (stacked on phone, side-by-side on wider)
      var tales = api.el('div', 'wsc-tales');
      [v.a, v.b].forEach(function (t, ti) {
        var card = api.el('div', 'wsc-tale'); card.setAttribute('data-side', ti === 0 ? 'a' : 'b');
        var head = api.el('div', 'wsc-talehead');
        var g = api.el('span', 'wsc-glyph'); g.setAttribute('aria-hidden', 'true'); g.textContent = EMOJI[t.glyph] || '🐾'; head.appendChild(g);
        var nm = api.el('span', 'wsc-name'); nm.textContent = t.name; head.appendChild(nm);
        card.appendChild(head);
        var strip = api.el('div', 'wsc-strip');
        t.beats.forEach(function (b) {
          var cell = api.el('div', 'wsc-beat');
          var em = api.el('span', 'wsc-bemoji'); em.setAttribute('aria-hidden', 'true'); em.textContent = EMOJI[b.panel] || '❓'; cell.appendChild(em);
          var cap = api.el('span', 'wsc-bcap'); cap.textContent = b.caption; cell.appendChild(cap);
          strip.appendChild(cell);
        });
        card.appendChild(strip);
        tales.appendChild(card);
      });
      root.appendChild(tales);

      // the question
      var ask = api.el('div', 'wsc-ask');
      var lab = api.el('span', 'wsc-asklab'); lab.textContent = api.t('theAsk'); ask.appendChild(lab);
      var q = api.el('span', 'wsc-asktxt'); q.textContent = v.prompt; ask.appendChild(q);
      var sp = api.el('button', 'wsc-spk'); sp.type = 'button'; sp.setAttribute('aria-label', LANG === 'fr' ? 'Écouter la question' : 'Hear the question'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(v.prompt); }); ask.appendChild(sp);
      root.appendChild(ask);

      // options
      var opts = api.el('div', 'wsc-opts');
      v.options.forEach(function (o) {
        var b = api.el('button', 'wsc-opt' + (self.sel === o.key ? ' wsc-sel' : '') + (o.key === 'both' || o.key === 'neither' ? ' wsc-opt-bn' : '')); b.type = 'button'; b.setAttribute('data-key', o.key);
        if (o.key === 'a' || o.key === 'b') { var em = api.el('span', 'wsc-oemoji'); em.setAttribute('aria-hidden', 'true'); em.textContent = EMOJI[(o.key === 'a' ? v.a.glyph : v.b.glyph)] || '🐾'; b.appendChild(em); }
        var lbl = (LANG === 'fr' && o.key === 'both') ? 'Les deux' : (LANG === 'fr' && o.key === 'neither') ? 'Aucun des deux' : o.label;
        var t = api.el('span', 'wsc-olabel'); t.textContent = lbl; b.appendChild(t);
        b.addEventListener('click', function () { self._tapOpt(o.key); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spokeAsk) { this._spokeAsk = true; setTimeout(function () { speak(v.prompt); }, 320); }
    },

    _playBoth: function () {
      var self = this; this._heard = true; var token = ++this._narrToken;
      var seq = this.view.a.beats.concat(this.view.b.beats);
      var hb = this._rootEl && this._rootEl.querySelector('.wsc-hear'); if (hb) hb.textContent = this.api.t('hearAgain');
      function step(i) {
        if (token !== self._narrToken) return;
        if (i >= seq.length) return;
        speak(seq[i].caption);
        setTimeout(function () { step(i + 1); }, 1500);
      }
      step(0);
    },

    _tapOpt: function (key) {
      this._narrToken++;
      if (this.sel === key) { this.sel = null; this.render(); return; }
      this.sel = key; this.api.sound && this.api.sound(560); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks(null); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      this._heard = false;
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/willow-story-corner-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks((row.paramsL10n && row.paramsL10n[LANG]) || row.params); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[willow-story-corner] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.wsc-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,580px);margin:0 auto;}'
        + '.wsc-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(4px,1.2vw,8px);background:linear-gradient(180deg,#FBF3E4,#F4E7CF);border-radius:20px;padding:clamp(6px,1.6vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* Willow row */
        + '.wsc-wrow{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.wsc-willow{width:clamp(42px,9.5vw,54px);flex:0 0 auto;}.wsc-willow-svg{width:100%;height:auto;display:block;}'
        + '.wsc-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 11px;font:700 clamp(12px,3vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.wsc-hear{align-self:center;min-height:38px;padding:0 16px;border-radius:12px;border:0;background:#EAF2EE;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        /* the two tales */
        + '.wsc-tales{display:flex;flex-direction:column;gap:clamp(5px,1.4vw,8px);}'
        + '.wsc-tale{flex:1;min-width:0;background:#FFF;border:2px solid rgba(20,107,94,.14);border-radius:14px;padding:5px 7px;}'
        + '.wsc-tale[data-side=b]{border-color:rgba(242,120,75,.18);}'
        + '.wsc-talehead{display:flex;align-items:center;gap:6px;margin-bottom:3px;}'
        + '.wsc-glyph{font-size:clamp(18px,5vw,24px);}.wsc-name{font:800 clamp(12px,3.1vw,15px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.wsc-strip{display:flex;gap:clamp(4px,1.4vw,8px);}'
        + '.wsc-beat{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;text-align:center;}'
        + '.wsc-bemoji{font-size:clamp(20px,5.5vw,28px);line-height:1;}'
        + '.wsc-bcap{font:600 clamp(9.5px,2.4vw,11.5px)/1.15 "Nunito",sans-serif;color:' + C.INK + ';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        /* the question */
        + '.wsc-ask{display:flex;align-items:center;gap:7px;background:#FFF;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:6px 10px;}'
        + '.wsc-asklab{flex:0 0 auto;font:800 clamp(10.5px,2.6vw,12px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';text-transform:uppercase;letter-spacing:.03em;}'
        + '.wsc-asktxt{flex:1;min-width:0;font:700 clamp(13px,3.3vw,16px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.wsc-spk{flex:0 0 auto;width:32px;height:32px;border-radius:9px;border:0;background:#EAF2EE;font-size:16px;cursor:pointer;touch-action:manipulation;}'
        /* options */
        + '.wsc-opts{display:flex;gap:clamp(5px,1.6vw,9px);justify-content:center;flex-wrap:wrap;}'
        + '.wsc-opt{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:46px;padding:6px 14px;border-radius:14px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.T + ';font:800 clamp(13px,3.3vw,16px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.18);touch-action:manipulation;}'
        + '.wsc-opt-bn{background:#F4F8F6;}'
        + '.wsc-opt.wsc-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.38);transform:translateY(-2px);}'
        + '.wsc-opt:active{transform:translateY(1px);}'
        + '.wsc-oemoji{font-size:clamp(17px,4.5vw,22px);}'
        + '.wsc-spk:focus-visible,.wsc-hear:focus-visible,.wsc-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* side-by-side tales on wider screens */
        + '@media (min-width:560px){.wsc-tales{flex-direction:row;}}'
        /* short viewports: tighten so the tales + question + options + shell Check clear the fold */
        + '@media (max-height:880px){.wsc-root{gap:3px;}.wsc-tales{flex-direction:row;gap:6px;}.wsc-tale{padding:4px 6px;}.wsc-willow{width:clamp(38px,8vw,46px);}.wsc-say{padding:4px 9px;}.wsc-bemoji{font-size:clamp(18px,5vw,24px);}.wsc-bcap{-webkit-line-clamp:2;line-clamp:2;line-height:1.1;}.wsc-opt{min-height:44px;padding:5px 11px;}.wsc-hear{min-height:34px;}}'
        /* very short (320×640): clamp captions + speech to one line + tighten every band so the options + shell Check clear the fold (the full lines stay spoken) */
        + '@media (max-height:660px){.wsc-root{gap:1px;padding:5px;}.wsc-wrow{display:none;}.wsc-hear{min-height:32px;margin-bottom:0;}.wsc-tales{gap:4px;}.wsc-tale{padding:3px 5px;}.wsc-talehead{margin-bottom:0;}.wsc-strip{gap:4px;}.wsc-bemoji{font-size:16px;}.wsc-bcap{-webkit-line-clamp:1;line-clamp:1;font-size:9px;line-height:1.05;}.wsc-ask{padding:2px 6px;}.wsc-asklab{font-size:9px;}.wsc-asktxt{font-size:11px;line-height:1.1;}.wsc-opts{gap:4px;}.wsc-opt{min-height:44px;padding:4px 9px;}}'   /* the mascot row is dropped only at this tightest height; the shell prompt carries the instruction */
        + '@media (max-width:380px){.wsc-root{gap:3px;padding:7px;}.wsc-say{font-size:11.5px;}.wsc-bcap{font-size:9.5px;}.wsc-asktxt{font-size:12.5px;}.wsc-opt{padding:5px 9px;font-size:13px;}}'
        + '@media (prefers-reduced-motion: reduce){.wsc-opt{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-willow-story-corner', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  /* build the task pool from params {stories, rounds}; each task resolves
     aId/bId → embedded story objects (with facts) for the core. */
  function makeTasks(params) {
    if (!params || !params.rounds) return [];
    var stories = params.stories || {};
    return params.rounds.map(function (r) {
      var round = {
        id: r.id, dim: r.dim, prompt: r.prompt,
        a: JSON.parse(JSON.stringify(stories[r.aId] || {})),
        b: JSON.parse(JSON.stringify(stories[r.bId] || {}))
      };
      return {
        id: 'willow-story-corner.' + r.id, band: r.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel ? 'hintWrong' : 'hintPick'; }
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
