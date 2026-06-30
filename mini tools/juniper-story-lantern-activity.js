/* =====================================================================
   JUNIPER'S STORY LANTERN — ACTIVITY  (juniper-story-lantern-activity.js)
   ---------------------------------------------------------------------
   CCSS RL.1.2 — find a story's CENTRAL MESSAGE / LESSON. Juniper the hedgehog
   tells a short fable by lantern-light; the child reads/hears it, then taps
   the card that states its LESSON — not a true detail from the story, and not
   a lesson that merely sounds right. Validity DERIVED by central-message-
   core.js (the card tagged `moral`; position shuffled; never a stored index).
   answerType:'state' → tap a card (in-stage selection), the shell Check
   grades it; a wrong tap gives a DIFFUSE nudge (listen again), never which-
   one. Per-pass order-only reshuffle (§A.13.60). Text + emoji stubs (CA5
   later). No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CentralMessageCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function juniperSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy ? '<path d="M40 47 q3 -4 6 0 M54 47 q3 -4 6 0" stroke="#2A2A35" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="43" cy="48" r="2.6" fill="#2A2A35"/><circle cx="57" cy="48" r="2.6" fill="#2A2A35"/>';
    var spikes = '';
    for (var i = 0; i < 9; i++) { var ang = Math.PI * (0.08 + 0.84 * (i / 8)); var cx = 50 - Math.cos(ang) * 30, cy = 52 - Math.sin(ang) * 30; var tx = 50 - Math.cos(ang) * 44, ty = 52 - Math.sin(ang) * 44; spikes += '<line x1="' + cx.toFixed(1) + '" y1="' + cy.toFixed(1) + '" x2="' + tx.toFixed(1) + '" y2="' + ty.toFixed(1) + '" stroke="#8A6D4B" stroke-width="3" stroke-linecap="round"/>'; }
    return '<svg class="jsl-hog-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Juniper, der Igel' : 'Juniper the hedgehog') + '">' + spikes +
      '<ellipse cx="50" cy="54" rx="30" ry="26" fill="#C9A877"/>' +
      '<ellipse cx="62" cy="56" rx="16" ry="14" fill="#F0DEC2"/>' +   /* face */
      eyes + '<circle cx="70" cy="56" r="2.4" fill="#2A2A35"/>' +     /* nose */
      '</svg>';
  }

  global.JuniperStoryLanternActivity = {
    id: 'juniper-story-lantern-activity',

    strings: {
      title: { en: "Juniper's Story Lantern", de: 'Junipers Geschichten-Laterne' },
      prompt: { en: 'What does this story teach us?', de: 'Was lehrt uns diese Fabel?' },
      juniperIntro: { en: 'Here is a little tale. What does it teach us?', de: 'Hier ist eine kleine Fabel. Was lehrt sie uns?' },
      readStory: { en: '📖 Read the story', de: '📖 Fabel lesen' },
      readAgain: { en: '📖 Read it again', de: '📖 Noch einmal lesen' },
      theAsk: { en: 'What is the lesson?', de: 'Was ist die Lehre?' },
      hintPick: { en: 'Tap the lesson the story teaches!', de: 'Tippe auf die Lehre, die die Fabel uns zeigt!' },
      hintWrong: { en: "That's not the lesson — listen to the tale again.", de: 'Das ist nicht die Lehre – hör dir die Fabel noch einmal an.' },
      win: { en: 'Yes! That is the lesson of the tale. 🏮', de: 'Ja! Das ist die Lehre der Fabel. 🏮' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._opts = null; this._narrToken = 0; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._narrToken++; this._spoke = false;
      this._opts = shuffle(this.view.options.slice());
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'jsl-wrap'); var root = api.el('div', 'jsl-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'jsl-row');
      var hog = api.el('div', 'jsl-hog'); hog.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); hog.innerHTML = juniperSVG(this.sel ? 'happy' : 'idle'); row.appendChild(hog);
      var say = api.el('div', 'jsl-say'); say.textContent = api.t('juniperIntro'); row.appendChild(say);
      root.appendChild(row);

      // the story
      var story = api.el('div', 'jsl-story'); this._storyEl = story;
      v.story.forEach(function (line, i) { var p = api.el('p', 'jsl-line'); p.setAttribute('data-i', i); p.textContent = line; story.appendChild(p); });
      root.appendChild(story);
      var read = api.el('button', 'jsl-read'); read.type = 'button'; read.textContent = api.t(this._read ? 'readAgain' : 'readStory');
      read.addEventListener('click', function () { self._playStory(); });
      root.appendChild(read);

      // the question
      var ask = api.el('div', 'jsl-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      // option cards
      var opts = api.el('div', 'jsl-opts');
      this._opts.forEach(function (o) {
        var b = api.el('button', 'jsl-opt' + (self.sel === o.id ? ' jsl-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id);
        b.textContent = o.text; b.setAttribute('aria-label', o.text);
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { self._playStory(); }, 320); }
    },

    _playStory: function () {
      var self = this; this._read = true; var token = ++this._narrToken;
      var lines = this._storyEl ? this._storyEl.querySelectorAll('.jsl-line') : [];
      var rb = this._rootEl && this._rootEl.querySelector('.jsl-read'); if (rb) rb.textContent = this.api.t('readAgain');
      function step(i) {
        if (token !== self._narrToken) { for (var k = 0; k < lines.length; k++) lines[k].classList.remove('jsl-on'); return; }
        for (var m = 0; m < lines.length; m++) lines[m].classList.toggle('jsl-on', m === i);
        if (i >= self.view.story.length) { for (var n = 0; n < lines.length; n++) lines[n].classList.remove('jsl-on'); return; }
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
      fetch('/mini-tools/juniper-story-lantern-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[juniper-story-lantern] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.jsl-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,580px);margin:0 auto;}'
        + '.jsl-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(3px,1vw,6px);background:linear-gradient(180deg,#FBF3E4,#F3E7D2);border-radius:20px;padding:clamp(6px,1.5vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.jsl-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.jsl-hog{width:clamp(44px,10vw,56px);flex:0 0 auto;}.jsl-hog-svg{width:100%;height:auto;display:block;}'
        + '.jsl-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.jsl-story{background:#FFFDF6;border-radius:12px;padding:clamp(5px,1.4vw,8px) clamp(7px,1.8vw,10px);box-shadow:inset 0 0 0 2px rgba(160,120,60,.14);display:flex;flex-direction:column;gap:2px;}'
        + '.jsl-line{margin:0;font:600 clamp(11.5px,2.9vw,13.5px)/1.25 "Nunito",sans-serif;color:' + C.INK + ';border-radius:6px;padding:1px 4px;transition:background .15s;}'
        + '.jsl-line.jsl-on{background:#FBEFD3;box-shadow:0 0 0 2px ' + C.GOLD + ';}'
        + '.jsl-read{align-self:center;min-height:36px;padding:0 16px;border-radius:12px;border:0;background:#EAF2EE;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.jsl-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.jsl-opts{display:flex;flex-direction:column;gap:clamp(4px,1.2vw,6px);}'
        + '.jsl-opt{text-align:left;min-height:44px;padding:7px 12px;border-radius:13px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.INK + ';font:700 clamp(12px,3.1vw,14px)/1.22 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.jsl-opt.jsl-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;}'
        + '.jsl-opt:active{transform:translateY(1px);}'
        + '.jsl-read:focus-visible,.jsl-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:760px){.jsl-root{gap:3px;}.jsl-hog{width:clamp(38px,8vw,46px);}.jsl-say{-webkit-line-clamp:2;line-clamp:2;}.jsl-story{padding:5px 9px;gap:2px;}.jsl-line{font-size:12px;line-height:1.18;}.jsl-read{min-height:34px;}.jsl-opt{min-height:44px;padding:6px 11px;font-size:12px;line-height:1.18;}}'
        + '@media (max-height:660px){.jsl-root{gap:0;padding:4px;}.jsl-row{display:none;}.jsl-ask{display:none;}.jsl-read{min-height:26px;padding:0 12px;font-size:12px;}.jsl-story{padding:3px 8px;gap:0;}.jsl-line{font-size:10.5px;line-height:1.1;}.jsl-opts{gap:1px;}.jsl-opt{min-height:44px;padding:3px 9px;font-size:11.5px;line-height:1.13;}}'
        + '@media (max-width:380px){.jsl-root{gap:3px;padding:7px;}.jsl-line{font-size:12px;}.jsl-opt{font-size:12.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.jsl-line{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-juniper-story-lantern', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'juniper-story-lantern.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
