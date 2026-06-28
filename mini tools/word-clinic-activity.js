/* =====================================================================
   WORD DOCTOR'S CLINIC — ACTIVITY  (word-clinic-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.2.e — SPELL untaught words PHONETICALLY (generative encoding).
   A sick word-patient (the picture-creature) shuffles onto the cot; its
   X-ray sound-skeleton shows one tile per phoneme — most healthy
   (scaffolded letters), ONE sick (empty). The child:
     (1) taps the LISTEN LAMP → the patient says its WHOLE word (TTS,
         replayable; tapping the sick slot re-voices it SLOWER) — NEVER an
         isolated phoneme;
     (2) picks the grapheme that spells the sick sound from the MEDICINE
         TRAY of DIFFERENT-sound competitors;
     (3) the patient VOICE-BACKS the resulting word — a wrong grapheme
         voices a DIFFERENT word (the child hears the mismatch → self-
         corrects, the tile springs back atomically, the fever HOLDS);
     (4) the correct grapheme → the patient voices the RIGHT word, the
         fever cools 🤒→😄, the creature pinks up + says its NAME.

   Correctness comes ONLY from word-clinic-core.js (isHealed); the correct
   spelling is shown NOWHERE while the task is live (the frame is partial,
   the sick slot empty; the completed word appears only POST-heal). The
   fever is a binary FACE, never a number. No timer/score/streak. Picture-
   anchor = the gated color WebP. 0 lines to any protected core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.WordClinicCore;

  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: rate || 0.85 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.85; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function imgURL(round) {
    return '/image-library-webp/themes/' + encodeURIComponent(round.theme) + '/' + encodeURIComponent(round.word) + '@2x.webp';
  }

  global.WordClinicActivity = {
    id: 'word-clinic-activity',

    strings: {
      title: { en: "Word Doctor's Clinic" },
      instruction: { en: '' },
      prompt: { en: 'Heal the sick sound!' },
      listen: { en: '🔊 Listen' },
      pictureAlt: { en: 'A little word-patient — tap Listen to hear its name.' },
      docListen: { en: 'Listen, then heal the sick sound by ear.' },
      docWrong: { en: "Hmm — that's a different word. Listen again!" },
      docHint: { en: "Here's a hint — that one is not it." },
      docHeal: { en: 'All better! ' },
      hintCheck: { en: 'Heal the sick sound, then tap Check!' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.placed = null; this.solved = false; this.wrongCount = 0;
      this.dimmed = []; this.fever = 'sick'; this._trayOrder = null; this.msg = null;
      this.solvedCount = 0; this._busy = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.placed = null; this.solved = false; this.wrongCount = 0;
      this.dimmed = []; this.fever = 'sick'; this.msg = null; this._busy = false;
      this._trayOrder = shuffle(Core.trayFor(round));
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'wc-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this;
      /* doctor's say line */
      var say = api.el('div', 'wc-saytop');
      say.innerHTML = '<span class="wc-doc">' + (this.solved ? '😺' : '🩺') + '</span><span>' + esc(this.msg || (this.solved ? (api.t('docHeal') + this.round.label + '!') : api.t('docListen'))) + '</span>';
      root.appendChild(say);

      var main = api.el('div', 'wc-main');
      /* LEFT — the patient: picture + fever-face + the sick word-tiles */
      var left = api.el('div', 'wc-left');
      var pat = api.el('div', 'wc-patient');
      var im = api.el('img', 'wc-pic' + (this.solved ? ' wc-pic-well' : '')); im.src = imgURL(this.round);
      im.alt = api.t('pictureAlt'); im.setAttribute('draggable', 'false');
      im.addEventListener('error', function () { im.style.visibility = 'hidden'; });
      pat.appendChild(im);
      var fever = api.el('div', 'wc-fever' + (this.fever === 'well' ? ' wc-fever-well' : '')); fever.setAttribute('role', 'img');
      fever.setAttribute('aria-label', this.fever === 'well' ? 'all better' : 'feeling sick');
      fever.textContent = this.fever === 'well' ? '😄' : '🤒';
      pat.appendChild(fever);
      left.appendChild(pat);
      /* the word as letter-tiles (frame + the sick slot) */
      var word = api.el('div', 'wc-word');
      var frame = Core.frameTiles(this.round);
      frame.forEach(function (g, i) {
        if (i === self.round.sickIndex) {
          var slot = api.el('button', 'wc-slot' + (self.placed ? ' wc-filled' : '') + (self.solved ? ' wc-healed' : '')); slot.type = 'button';
          slot.textContent = self.placed || '';
          slot.setAttribute('aria-label', self.placed ? ('letter ' + self.placed) : 'the sick sound — tap to listen again');
          if (!self.solved) slot.addEventListener('click', function () { speak(self.round.word, 0.6); });
          word.appendChild(slot);
        } else {
          var t = api.el('span', 'wc-tile'); t.textContent = g; word.appendChild(t);
        }
      });
      left.appendChild(word);
      main.appendChild(left);

      /* RIGHT — the medicine tray + the listen lamp */
      var right = api.el('div', 'wc-right');
      if (!this.solved) {
        var tray = api.el('div', 'wc-tray');
        this._trayOrder.forEach(function (g) {
          var dim = self.dimmed.indexOf(g) !== -1;
          var b = api.el('button', 'wc-med' + (dim ? ' wc-dim' : '')); b.type = 'button';
          b.textContent = g; b.setAttribute('aria-label', 'spell it with ' + g);
          b.disabled = dim || self._busy;
          if (!dim) b.addEventListener('click', function () { self._place(g); });
          tray.appendChild(b);
        });
        right.appendChild(tray);
      }
      var lamp = api.el('button', 'wc-lamp'); lamp.type = 'button'; lamp.textContent = api.t('listen');
      lamp.addEventListener('click', function () { speak(self.round.word, 0.85); });
      right.appendChild(lamp);
      main.appendChild(right);
      root.appendChild(main);

      this._renderVessel(root);
      stage.appendChild(root);
    },

    _place: function (g) {
      var self = this, api = this.api;
      if (this._busy || this.solved) return;
      this.placed = g;
      this.render();
      speak(Core.voiceBackString(this.round, g));   /* the patient voices the RESULTING word */
      if (Core.isHealed(this.round, g)) { this._heal(); return; }
      /* WRONG — a different word was heard; atomic spring-back, fever HOLDS */
      this._busy = true;
      this.api.sound && this.api.sound(330);
      this.wrongCount++;
      this.msg = api.t('docWrong');
      if (this.wrongCount >= 3) this._nurseHint();
      this.render();   /* slot still shows the wrong grapheme briefly */
      setTimeout(function () {
        self.placed = null; self._busy = false; self.render();
        api.announce && api.announce(api.t('docWrong'));
      }, 900);
    },
    _nurseHint: function () {
      var cg = Core.correctGrapheme(this.round);
      var cand = this._trayOrder.filter(function (g) { return g !== cg && this.dimmed.indexOf(g) === -1; }, this);
      /* keep >=2 plausible (correct + >=1 other): only dim if >=2 non-correct remain */
      if (cand.length >= 2) { this.dimmed.push(cand[0]); this.msg = this.api.t('docHint'); }
    },
    _heal: function () {
      var self = this, api = this.api;
      this.solved = true; this.fever = 'well'; this._busy = false;
      this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 14);
      this.msg = api.t('docHeal') + this.round.label + '!';
      this.api.sound && this.api.sound(880);
      this.render();
      api.announce && api.announce(api.t('docHeal') + this.round.label + '!');
      setTimeout(function () { speak(self.round.word, 0.9); }, 350);   /* the patient says its NAME */
    },

    _renderVessel: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 14;
      var v = api.el('div', 'wc-vessel');
      for (var i = 0; i < total; i++) { var p = api.el('span', 'wc-bench' + (i < this.solvedCount ? ' wc-bench-on' : '')); p.textContent = i < this.solvedCount ? '🙂' : '·'; v.appendChild(p); }
      root.appendChild(v);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); var self = this; if (this.round) setTimeout(function () { speak(self.round.word, 0.85); }, 300); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/word-clinic-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          setTimeout(function () { if (self.round && !self.solved) speak(self.round.word, 0.85); }, 450);
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[word-clinic] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.wc-root{position:relative;width:100%;max-width:min(96vw,640px);margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#F1EAFB);border-radius:18px;padding:clamp(7px,1.6vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.wc-saytop{display:flex;align-items:center;gap:8px;justify-content:center;font:700 clamp(12px,3.1vw,15px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.wc-doc{font-size:clamp(20px,5vw,26px);flex:0 0 auto;}'
        /* main = 2 columns on desktop (patient | medicine), 1 on phone */
        + '.wc-main{display:flex;flex-direction:column;gap:clamp(6px,1.6vw,10px);align-items:center;}'
        + '.wc-left,.wc-right{display:flex;flex-direction:column;gap:clamp(6px,1.4vw,9px);align-items:center;min-width:0;}'
        + '@media (min-width:720px){.wc-main{flex-direction:row;align-items:center;justify-content:center;gap:clamp(14px,3vw,28px);}.wc-left,.wc-right{flex:1 1 50%;}}'
        /* patient: picture + fever face */
        + '.wc-patient{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;}'
        + '.wc-pic{width:clamp(74px,20vw,118px);height:auto;border-radius:14px;background:#fff;border:2px solid rgba(20,107,94,.12);padding:4px;filter:grayscale(.85) opacity(.85);transition:filter .4s;}'
        + '.wc-pic-well{filter:none;}'
        + '.wc-fever{font-size:clamp(26px,7vw,38px);line-height:1;}'
        /* the sick word as letter-tiles */
        + '.wc-word{display:flex;flex-wrap:wrap;gap:clamp(4px,1.2vw,7px);justify-content:center;align-items:center;}'
        + '.wc-tile{display:inline-flex;align-items:center;justify-content:center;min-width:clamp(34px,9vw,46px);height:clamp(44px,11vw,56px);padding:0 6px;border-radius:11px;background:#fff;border:2px solid rgba(20,107,94,.2);font:800 clamp(20px,5.4vw,28px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.wc-slot{display:inline-flex;align-items:center;justify-content:center;min-width:clamp(44px,11vw,58px);height:clamp(44px,11vw,56px);padding:0 6px;border-radius:11px;background:#FFF6F1;border:2px dashed ' + C.CORAL + ';font:800 clamp(20px,5.4vw,28px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';cursor:pointer;touch-action:manipulation;}'
        + '.wc-slot.wc-filled{border-style:solid;background:#FCEAE0;}'
        + '.wc-slot.wc-healed{border-color:' + C.GOOD + ';background:#E9F7EF;color:' + C.GOOD + ';}'
        /* medicine tray */
        + '.wc-tray{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,11px);justify-content:center;}'
        + '.wc-med{display:inline-flex;align-items:center;justify-content:center;min-width:clamp(48px,13vw,62px);height:clamp(48px,12vw,60px);padding:0 8px;border-radius:14px;background:#fff;border:2px solid rgba(242,120,75,.5);box-shadow:0 2px 0 rgba(160,120,60,.16);font:800 clamp(19px,5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';cursor:pointer;touch-action:manipulation;}'
        + '.wc-med:active{transform:translateY(1px);}'
        + '.wc-med.wc-dim{opacity:.28;border-style:dashed;cursor:default;box-shadow:none;}'
        + '.wc-lamp{min-height:46px;padding:0 clamp(16px,5vw,24px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.6vw,17px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.wc-lamp:active{transform:translateY(2px);}'
        /* vessel */
        + '.wc-vessel{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-items:center;min-height:16px;}'
        + '.wc-bench{font-size:clamp(11px,3vw,15px);line-height:1;color:rgba(20,107,94,.3);}.wc-bench-on{color:inherit;}'
        + '.wc-slot:focus-visible,.wc-med:focus-visible,.wc-lamp:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (prefers-reduced-motion: reduce){.wc-pic{transition:none!important;}}'
        /* phones: keep the whole stack + the shell Check above the fold */
        + '@media (max-width:480px){'
        +   '.wc-root{gap:5px;padding:8px;}.wc-saytop{font-size:12px;}.wc-pic{width:clamp(66px,22vw,90px);}.wc-fever{font-size:30px;}'
        +   '.wc-tile,.wc-slot{height:46px;font-size:22px;}.wc-med{min-width:50px;height:48px;font-size:21px;}.wc-lamp{min-height:44px;}'
        + '}'
        /* small phones + short viewports (incl. the 320×640 sub-floor): tighten */
        + '@media (max-height:760px), (max-width:380px){'
        +   '.wc-root{gap:4px;padding:6px;}.wc-main{gap:6px;}.wc-left,.wc-right{gap:6px;}'
        +   '.wc-saytop{font-size:11px;}.wc-doc{font-size:20px;}.wc-pic{width:clamp(60px,18vw,80px);}.wc-fever{font-size:26px;}'
        +   '.wc-tile,.wc-slot{height:44px;font-size:20px;min-width:38px;}.wc-med{min-width:48px;height:44px;font-size:20px;}'
        +   '.wc-lamp{min-height:44px;}.wc-vessel{display:none;}'
        + '}'
        + '@media (max-width:340px) and (max-height:660px){'
        +   '.wc-pic{width:56px;}.wc-fever{font-size:24px;}.wc-tile,.wc-slot{height:42px;font-size:19px;}.wc-med{height:42px;min-width:46px;}.wc-lamp{min-height:42px;}'
        + '}';
      var tag = document.createElement('style'); tag.setAttribute('data-word-clinic', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'word-clinic.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
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
