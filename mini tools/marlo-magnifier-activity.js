/* =====================================================================
   MARLO'S MAGNIFIER — ACTIVITY  (marlo-magnifier-activity.js)
   ---------------------------------------------------------------------
   CCSS RL.1.3 — describe a CHARACTER using KEY DETAILS. Marlo the raccoon is
   a story detective: read/hear a short story, see a trait clue ("Mira is
   brave"), then tap the story detail that PROVES it — not just any true thing
   that happened. Validity DERIVED by trait-evidence-core.js (the detail
   tagged `supports`; position shuffled; the evidence never restates the trait
   word). answerType:'state' → tap a card, the shell Check grades it; a wrong
   tap gives a DIFFUSE nudge (look again), never which-one. Per-pass order-
   only reshuffle (§A.13.60). Text + emoji stubs (CA5 later). No timer/score/
   streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TraitEvidenceCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function marloSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy ? '<path d="M40 47 q3 -4 6 0 M54 47 q3 -4 6 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="43" cy="48" r="2.6" fill="#fff"/><circle cx="57" cy="48" r="2.6" fill="#fff"/>';
    return '<svg class="mgf-coon-svg" viewBox="0 0 100 100" role="img" aria-label="Marlo the raccoon">' +
      '<path d="M28 24 L40 36 L24 40 Z" fill="#9AA0A6"/><path d="M72 24 L60 36 L76 40 Z" fill="#9AA0A6"/>' +   /* ears */
      '<ellipse cx="50" cy="54" rx="30" ry="27" fill="#AEB4BA"/>' +
      '<path d="M22 46 q28 -16 56 0 q-6 12 -16 12 h-24 q-10 0 -16 -12 Z" fill="#3A3F45"/>' +   /* mask */
      eyes +
      '<ellipse cx="50" cy="62" rx="9" ry="7" fill="#EDEFF1"/><path d="M46 60 L54 60 L50 66 Z" fill="#2A2A35"/>' +   /* snout + nose */
      '</svg>';
  }

  global.MarloMagnifierActivity = {
    id: 'marlo-magnifier-activity',

    strings: {
      title: { en: "Marlo's Magnifier" },
      prompt: { en: 'Find the detail that proves it.' },
      marloIntro: { en: 'A new case! Find the proof in the story.' },
      readStory: { en: '📖 Read the story' },
      readAgain: { en: '📖 Read it again' },
      theAsk: { en: 'Which detail PROVES it?' },
      clue: { en: 'Clue:' },
      hintPick: { en: 'Tap the detail that shows it is true!' },
      hintWrong: { en: "That is true, but it doesn't prove it — look again." },
      win: { en: 'Case solved! That is the proof. 🔍' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._opts = null; this._narrToken = 0; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._narrToken++; this._spoke = false;
      this._opts = shuffle(this.view.details.slice());
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'mgf-wrap'); var root = api.el('div', 'mgf-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'mgf-row');
      var coon = api.el('div', 'mgf-coon'); coon.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); coon.innerHTML = marloSVG(this.sel ? 'happy' : 'idle'); row.appendChild(coon);
      var say = api.el('div', 'mgf-say'); say.textContent = api.t('marloIntro'); row.appendChild(say);
      root.appendChild(row);

      // the trait clue banner
      var clue = api.el('div', 'mgf-clue');
      var lab = api.el('span', 'mgf-cluelab'); lab.textContent = api.t('clue'); clue.appendChild(lab);
      var txt = api.el('span', 'mgf-cluetxt'); txt.textContent = v.trait; clue.appendChild(txt);
      var sp = api.el('button', 'mgf-spk'); sp.type = 'button'; sp.setAttribute('aria-label', 'hear the clue'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(v.trait); }); clue.appendChild(sp);
      root.appendChild(clue);

      // the story
      var story = api.el('div', 'mgf-story'); this._storyEl = story;
      v.story.forEach(function (line, i) { var p = api.el('p', 'mgf-line'); p.setAttribute('data-i', i); p.textContent = line; story.appendChild(p); });
      root.appendChild(story);
      var read = api.el('button', 'mgf-read'); read.type = 'button'; read.textContent = api.t(this._read ? 'readAgain' : 'readStory');
      read.addEventListener('click', function () { self._playStory(); });
      root.appendChild(read);

      var opts = api.el('div', 'mgf-opts');
      this._opts.forEach(function (o) {
        var b = api.el('button', 'mgf-opt' + (self.sel === o.id ? ' mgf-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id);
        b.textContent = o.text; b.setAttribute('aria-label', o.text);
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.trait); setTimeout(function () { self._playStory(); }, 900); }, 320); }
    },

    _playStory: function () {
      var self = this; this._read = true; var token = ++this._narrToken;
      var lines = this._storyEl ? this._storyEl.querySelectorAll('.mgf-line') : [];
      var rb = this._rootEl && this._rootEl.querySelector('.mgf-read'); if (rb) rb.textContent = this.api.t('readAgain');
      function step(i) {
        if (token !== self._narrToken) { for (var k = 0; k < lines.length; k++) lines[k].classList.remove('mgf-on'); return; }
        for (var m = 0; m < lines.length; m++) lines[m].classList.toggle('mgf-on', m === i);
        if (i >= self.view.story.length) { for (var n = 0; n < lines.length; n++) lines[n].classList.remove('mgf-on'); return; }
        speak(self.view.story[i]);
        setTimeout(function () { step(i + 1); }, 1700);
      }
      step(0);
    },

    _tap: function (id, text) {
      this._narrToken++;
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(text); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      this._read = false;
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/marlo-magnifier-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[marlo-magnifier] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.mgf-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,580px);margin:0 auto;}'
        + '.mgf-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(2px,0.8vw,5px);background:linear-gradient(180deg,#FBF3E4,#E9ECEF);border-radius:20px;padding:clamp(6px,1.4vw,10px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.mgf-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.mgf-coon{width:clamp(38px,7.5vw,46px);flex:0 0 auto;}.mgf-coon-svg{width:100%;height:auto;display:block;}'
        + '.mgf-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;}'
        /* trait clue banner */
        + '.mgf-clue{display:flex;align-items:center;gap:8px;background:#FFF;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:5px 9px;}'
        + '.mgf-cluelab{flex:0 0 auto;font:800 clamp(10.5px,2.6vw,12px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.mgf-cluetxt{flex:1;min-width:0;font:800 clamp(13px,3.3vw,14.5px)/1.15 "Baloo 2",sans-serif;color:' + C.INK + ';}'
        + '.mgf-spk{flex:0 0 auto;width:32px;height:32px;border-radius:9px;border:0;background:#EAF2EE;font-size:16px;cursor:pointer;touch-action:manipulation;}'
        /* story */
        + '.mgf-story{background:#FFFDF6;border-radius:12px;padding:clamp(5px,1.4vw,8px) clamp(7px,1.8vw,10px);box-shadow:inset 0 0 0 2px rgba(20,107,94,.1);display:flex;flex-direction:column;gap:2px;}'
        + '.mgf-line{margin:0;font:600 clamp(11.5px,2.8vw,13px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';border-radius:6px;padding:1px 4px;transition:background .15s;}'
        + '.mgf-line.mgf-on{background:#E7F1EE;box-shadow:0 0 0 2px ' + C.T + ';}'
        + '.mgf-read{align-self:center;min-height:36px;padding:0 16px;border-radius:12px;border:0;background:#EAF2EE;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.mgf-opts{display:flex;flex-direction:column;gap:clamp(4px,1vw,5px);}'
        + '.mgf-opt{text-align:left;min-height:44px;padding:6px 11px;border-radius:13px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.INK + ';font:700 clamp(12px,3vw,13.5px)/1.2 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.mgf-opt.mgf-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;}'
        + '.mgf-opt:active{transform:translateY(1px);}'
        + '.mgf-spk:focus-visible,.mgf-read:focus-visible,.mgf-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* 900-tall desktop (1024/1366 ×900): the ~250px shell header leaves a tight stage — trim the bands so the cards + Check clear the fold */
        + '@media (max-height:920px){.mgf-root{gap:clamp(2px,0.7vw,4px);padding:clamp(6px,1.2vw,9px);}.mgf-coon{width:clamp(34px,6vw,40px);}.mgf-line{line-height:1.16;}.mgf-opt{padding:6px 11px;}}'
        + '@media (max-height:700px){.mgf-root{gap:3px;}.mgf-coon{width:clamp(36px,7vw,44px);}.mgf-clue{padding:4px 9px;}.mgf-story{padding:5px 9px;gap:1px;}.mgf-line{font-size:12px;line-height:1.18;}.mgf-read{min-height:34px;}.mgf-opt{min-height:44px;padding:6px 11px;font-size:12.5px;}}'
        + '@media (max-height:640px){.mgf-root{gap:1px;padding:5px;}.mgf-row{display:none;}.mgf-read{display:none;}.mgf-clue{padding:3px 7px;}.mgf-cluetxt{font-size:12.5px;}.mgf-story{padding:3px 7px;}.mgf-line{font-size:10.5px;line-height:1.08;}.mgf-opt{min-height:44px;padding:4px 8px;font-size:11px;line-height:1.1;}}'   /* the story auto-narrates on load → the Read button is droppable at the tightest height */
        + '@media (max-width:380px){.mgf-root{gap:3px;padding:7px;}.mgf-line{font-size:12px;}.mgf-opt{font-size:12.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.mgf-line{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-marlo-magnifier', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'marlo-magnifier.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
