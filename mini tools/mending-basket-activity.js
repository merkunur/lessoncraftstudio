/* =====================================================================
   GRANNY'S MENDING BASKET — ACTIVITY  (mending-basket-activity.js)
   ---------------------------------------------------------------------
   CCSS RF.1.4.a — read for meaning (comprehension-monitoring). A torn
   album page shows a faded GREY picture + a caption with a tear; the
   child reads, works out the piece the MEANING needs, and mends it — the
   picture then DEVELOPS into colour (the reward, NEVER the answer-key).

   7 distinct experiences, each a DIFFERENT action (§A.13.60):
     cloze → tap a strip, tap the tear
     contradiction → tap the one word that fights the meaning
     connect → tap WHO the story means, then mend the gap (two-step)
     placement → tap the figure, tap the zone the words name
     match → tap the page, tap the picture it matches
     sequence → tap 3 strips into order
     sort → tap each line into the basket its meaning fits

   Cognition + the adversarial-solver gate live in mend-page-core.js
   (window.MendPageCore: attempt — DERIVED, never stored). The picture is
   disjoint from the options; a WRONG mend paints NO answer-region pixel
   (the spec's fix #5 contract). No timer/score/streak. Granny = SVG
   PLACEHOLDER (_setPose). Words ALWAYS DOM. 0 lines to the protected
   cores + lcs-shell.{js,css}. answerType:'state'.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MendPageCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', BRASS: '#E2B04A', PAPER: '#F3E9D2'
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak(text); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .92; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* Granny — warm delighted guide (SVG PLACEHOLDER). */
  function grannySVG() {
    return '<svg class="mb-granny-svg" viewBox="0 0 100 100" role="img" aria-label="Granny">' +
      '<ellipse cx="50" cy="92" rx="22" ry="5" fill="rgba(0,0,0,.08)"/>' +
      '<path d="M28 92 Q30 60 50 60 Q70 60 72 92 Z" fill="' + C.T + '"/>' +            /* shawl/body */
      '<circle cx="50" cy="42" r="19" fill="#F0D9C0"/>' +                              /* face */
      '<path d="M30 40 Q31 20 50 20 Q69 20 70 40 Q70 30 50 28 Q30 30 30 40 Z" fill="#E8E8EC"/>' + /* grey hair bun */
      '<circle cx="50" cy="22" r="6" fill="#E8E8EC"/>' +
      '<circle cx="42" cy="42" r="6.5" fill="#FCF6EA" stroke="' + C.T + '" stroke-width="1.8"/><circle cx="58" cy="42" r="6.5" fill="#FCF6EA" stroke="' + C.T + '" stroke-width="1.8"/><line x1="48.5" y1="42" x2="51.5" y2="42" stroke="' + C.T + '" stroke-width="1.8"/>' + /* spectacles */
      '<g class="mb-eyes-open"><circle cx="42" cy="42" r="2.4" fill="' + C.INK + '"/><circle cx="58" cy="42" r="2.4" fill="' + C.INK + '"/></g>' +
      '<g class="mb-eyes-happy"><path d="M38 42 Q42 38 46 42" stroke="' + C.INK + '" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M54 42 Q58 38 62 42" stroke="' + C.INK + '" stroke-width="2" fill="none" stroke-linecap="round"/></g>' +
      '<circle cx="50" cy="50" r="2" fill="#E59B86"/>' +
      '<path d="M44 53 Q50 58 56 53" stroke="' + C.CORAL + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="36" cy="50" r="3" fill="#F3B0A0" opacity=".6"/><circle cx="64" cy="50" r="3" fill="#F3B0A0" opacity=".6"/>' +
      '</svg>';
  }

  /* a simple develops-to-colour storybook vignette (CSS/SVG stub keyed by family;
     greyscale by default → full colour on the correct mend). 0 image bytes. */
  function sceneStub(family, alive) {
    var motif = {
      'puppy-grass': ['#A8D89A', '#F6C743', '🐶'], 'reading-table': ['#E7D6B8', '#C98A4B', '📖'],
      'soup-bowl': ['#F4D9B0', '#E8853A', '🍲'], 'rainy-window': ['#Bcd6E6', '#6FA8C7', '☔'],
      'fireside': ['#F2C9A0', '#E0662F', '🔥'], 'garden': ['#A8D89A', '#7CB369', '🌷'],
      'cat-quilt': ['#E9C7D6', '#C77FA0', '🐱'], 'twin-cat-bow': ['#E9C7D6', '#C77FA0', '🐱'],
      'twin-dog-paw': ['#CFE3B8', '#8FBF6B', '🐶'], 'basket-sort': ['#E7D6B8', '#C98A4B', '🧺']
    }[family] || ['#CFE0D6', '#8FB8A8', '🌼'];
    return '<div class="mb-scene' + (alive ? ' is-alive' : '') + '" style="--sky:' + motif[0] + ';--gr:' + motif[1] + '">' +
      '<span class="mb-scene-motif">' + motif[2] + '</span>' +
      '<span class="mb-torn"></span></div>';
  }

  global.MendingBasketActivity = {
    id: 'mending-basket-activity',

    strings: {
      title: { en: "Granny's Mending Basket" },
      instruction: { en: 'Read each torn page and mend it so it makes sense. Tap a piece, then tap where it goes, and the picture comes to life.' },
      prompt: { en: 'Read, then mend.' },
      pickFirst: { en: 'Tap a piece, then tap where it goes.' },
      tapWord: { en: 'Tap the one word that does not make sense.' },
      step2: { en: 'Now mend the gap — tap a piece, then the gap.' },
      mended: { en: 'Mended! It comes to life.' },
      reread: { en: "Let's read it again — the torn edges won't meet yet." },
      hintCheck: { en: 'Mend the page, then tap Check.' },
      basketWear: { en: 'wear' }, basketEat: { en: 'eat' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.phase = 'work'; this.selected = null; this.step = 1; this.misses = 0;
      this.readOnly = false; this.solved = 0; this.placements = {}; this.seqOrder = [];
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round; this.phase = 'work'; this.selected = null; this.step = 1; this.misses = 0;
      this.readOnly = false; this.placements = {}; this.seqOrder = [];
      this._pieceOrder = null;
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'mb-wrap');
      var room = api.el('div', 'mb-room'); this._roomEl = room;
      if (!this.round) { wrap.appendChild(room); stage.appendChild(wrap); return; }

      /* lantern (monotonic) + Granny on a top strip */
      var top = api.el('div', 'mb-top');
      var granny = api.el('div', 'mb-granny'); granny.setAttribute('data-pose', 'idle'); granny.innerHTML = grannySVG(); this._grannyEl = granny;
      var lantern = api.el('div', 'mb-lantern'); lantern.style.setProperty('--lit', Math.min(this.solved / ((this._pool && this._pool.length) || 7), 1));
      lantern.innerHTML = '<span class="mb-lantern-glow"></span>🏮';
      top.append(granny, lantern); room.appendChild(top);

      /* the torn leaf */
      var leaf = api.el('div', 'mb-leaf' + (this.readOnly ? ' mended' : '')); this._leafEl = leaf;
      var r = this.round, type = r.type;

      if (type === 'match') { this._renderMatch(leaf); }
      else {
        if (type !== 'sequence' && type !== 'sort') leaf.innerHTML = sceneStub(r.picture && r.picture.family, this.readOnly);
        this._renderCaptionBoard(leaf);
      }
      room.appendChild(leaf);
      wrap.appendChild(room);
      stage.appendChild(wrap);
      this._setPose(this.readOnly ? 'happy' : 'idle');
    },

    /* caption + per-type interaction board */
    _renderCaptionBoard: function (leaf) {
      var self = this, api = this.api, r = this.round, type = r.type;

      if (type === 'sequence') return this._renderSequence(leaf);
      if (type === 'sort') return this._renderSort(leaf);
      if (type === 'placement') return this._renderPlacement(leaf);

      /* caption tokens (cloze / contradiction / connect) */
      var cap = api.el('div', 'mb-caption');
      (r.tokens || []).forEach(function (tok, i) {
        if (tok.gap) {
          var tear = api.el('button', 'mb-tear'); tear.type = 'button'; tear.textContent = (self.readOnly ? esc(self.round.answer) : '');
          tear.setAttribute('aria-label', 'the tear');
          if (self.readOnly) tear.classList.add('mb-tear-mended');
          else tear.addEventListener('click', function () { self._dropOnTear(); });
          self._tearEl = tear; cap.appendChild(tear); return;
        }
        var w = tok.t;
        if (type === 'contradiction') {
          // content words tappable; the answer is the contradiction word
          var isCand = (r.pieces || []).some(function (p) { return p.value === w; });
          if (isCand && !self.readOnly) {
            var b = api.el('button', 'mb-word mb-word-tap'); b.type = 'button'; b.textContent = w;
            b.addEventListener('click', function () { self._attempt(w, b); });
            cap.appendChild(b); appendSpace(cap, api); return;
          }
          if (self.readOnly && w === r.answer) { var fixed = api.el('span', 'mb-word mb-word-fixed'); fixed.textContent = self._healedWord(); cap.appendChild(fixed); appendSpace(cap, api); return; }
        }
        if (type === 'connect' && self.step === 1 && i < self._sentenceBreak()) {
          // step 1: tap the referent among sentence-1 nouns
          var isRef = i === r.extras.referentIndex || self._isNounToken(w, i);
          if (isRef && !self.readOnly) {
            var rb = api.el('button', 'mb-word mb-word-tap'); rb.type = 'button'; rb.textContent = w;
            rb.addEventListener('click', function () { self._tapReferent(i, rb); });
            cap.appendChild(rb); appendSpace(cap, api); return;
          }
        }
        var span = api.el('span', 'mb-word'); span.textContent = w; cap.appendChild(span); appendSpace(cap, api);
      });
      leaf.appendChild(cap);

      /* prompt line for contradiction / connect step */
      if (type === 'contradiction' && !this.readOnly) { var h = api.el('div', 'mb-subhint'); h.textContent = api.t('tapWord'); leaf.appendChild(h); }
      if (type === 'connect' && !this.readOnly) {
        var ch = api.el('div', 'mb-subhint'); ch.textContent = (this.step === 1 ? (r.extras.referentPrompt || api.t('pickFirst')) : api.t('step2')); leaf.appendChild(ch);
      }

      /* tray (cloze; connect step 2) */
      if (type === 'cloze' || (type === 'connect' && this.step === 2)) this._renderTray(leaf);
    },

    _renderTray: function (leaf) {
      var self = this, api = this.api, r = this.round;
      if (!this._pieceOrder) this._pieceOrder = shuffle((r.pieces || []).map(function (_, i) { return i; }));
      var tray = api.el('div', 'mb-tray');
      this._pieceOrder.forEach(function (i) {
        var p = r.pieces[i];
        var b = api.el('button', 'mb-piece' + (self.selected === p.value ? ' mb-piece-sel' : '')); b.type = 'button'; b.textContent = p.text;
        if (self.readOnly) b.disabled = true;
        else b.addEventListener('click', function () { self.selected = p.value; self.api.sound && self.api.sound(560); self.render(); });
        tray.appendChild(b);
      });
      leaf.appendChild(tray);
    },

    _dropOnTear: function () {
      if (this.readOnly) return;
      if (this.selected == null) { if (this.api.announce) this.api.announce(this.api.t('pickFirst')); return; }
      this._attempt(this.selected, this._tearEl);
    },

    /* connect step 1 → referent */
    _tapReferent: function (idx, btn) {
      if (Core.isReferent(this.round, idx)) { this.step = 2; this.selected = null; this.api.sound && this.api.sound(700); this.render(); }
      else { this.misses++; this._refuse(btn); }
    },
    _sentenceBreak: function () { var t = this.round.tokens || []; for (var i = 0; i < t.length; i++) if (t[i].t === '.') return i + 1; return t.length; },
    _isNounToken: function (w, i) { return (this.round.pieces || []).some(function (p) { return p.value.replace(/^the\s+/, '') === w; }); },
    _healedWord: function () { var h = this.round.tts && this.round.tts.healed; return h ? (h.match(/\b(dry|thick)\b/) || [this.round.answer])[0] : this.round.answer; },

    /* ---------- placement ---------- */
    _renderPlacement: function (leaf) {
      var self = this, api = this.api, r = this.round, zones = (r.extras && r.extras.zones) || [];
      var cap = api.el('div', 'mb-caption');
      (r.tokens || []).forEach(function (tok) { var s = api.el('span', 'mb-word'); s.textContent = tok.t; cap.appendChild(s); appendSpace(cap, api); });
      leaf.appendChild(cap);
      var board = api.el('div', 'mb-zones');
      var fig = api.el('button', 'mb-figure' + (this.selected === 'figure' ? ' mb-figure-sel' : '')); fig.type = 'button'; fig.textContent = '🐱';
      fig.setAttribute('aria-label', 'the ' + (r.extras.figure || 'figure'));
      if (this.readOnly) fig.disabled = true; else fig.addEventListener('click', function () { self.selected = 'figure'; self.api.sound && self.api.sound(560); self.render(); });
      board.appendChild(fig);
      zones.forEach(function (z) {
        var zb = api.el('button', 'mb-zone'); zb.type = 'button'; zb.textContent = z.replace('-', ' ');
        zb.setAttribute('data-z', z);
        if (self.readOnly) { zb.disabled = true; if (z === r.answer) zb.classList.add('mb-zone-win'); }
        else zb.addEventListener('click', function () { if (self.selected !== 'figure') { if (self.api.announce) self.api.announce(self.api.t('pickFirst')); return; } self._attempt(z, zb); });
        board.appendChild(zb);
      });
      leaf.appendChild(board);
    },

    /* ---------- match (twin-scene) ---------- */
    _renderMatch: function (leaf) {
      var self = this, api = this.api, r = this.round, mp = (r.extras && r.extras.matchPair) || {};
      var cap = api.el('div', 'mb-caption');
      (r.tokens || []).forEach(function (tok) { var s = api.el('span', 'mb-word'); s.textContent = tok.t; cap.appendChild(s); appendSpace(cap, api); });
      leaf.appendChild(cap);
      var page = api.el('button', 'mb-page' + (this.selected === 'page' ? ' mb-page-sel' : '')); page.type = 'button'; page.textContent = '📄';
      page.setAttribute('aria-label', 'the page');
      if (this.readOnly) page.disabled = true; else page.addEventListener('click', function () { self.selected = 'page'; self.api.sound && self.api.sound(560); self.render(); });
      leaf.appendChild(page);
      var twins = api.el('div', 'mb-twins');
      [0, 1].forEach(function (idx) {
        var pic = api.el('button', 'mb-twin'); pic.type = 'button'; pic.setAttribute('data-i', idx);
        var label = idx === 0 ? mp.a : mp.b;
        pic.innerHTML = sceneStub(r.picture && r.picture.family, self.readOnly && idx === r.answer) + '<span class="mb-twin-lab">' + esc(label) + '</span>';
        if (self.readOnly) { pic.disabled = true; if (idx === r.answer) pic.classList.add('mb-twin-win'); }
        else pic.addEventListener('click', function () { if (self.selected !== 'page') { if (self.api.announce) self.api.announce(self.api.t('pickFirst')); return; } self._attempt(idx, pic); });
        twins.appendChild(pic);
      });
      leaf.appendChild(twins);
    },

    /* ---------- sequence ---------- */
    _renderSequence: function (leaf) {
      var self = this, api = this.api, r = this.round;
      if (!this._seqShuffle) this._seqShuffle = shuffle((r.strips || []).map(function (s) { return s.id; }));
      var head = api.el('div', 'mb-subhint'); head.textContent = (r.tts && r.tts.prompt) || ''; leaf.appendChild(head);
      var slots = api.el('div', 'mb-seq-slots');
      for (var i = 0; i < (r.strips || []).length; i++) { var sl = api.el('span', 'mb-seq-slot'); sl.textContent = this.seqOrder[i] ? (i + 1) + '' : ''; if (this.seqOrder[i]) sl.classList.add('mb-seq-filled'); slots.appendChild(sl); }
      leaf.appendChild(slots);
      var bank = api.el('div', 'mb-seq-bank');
      this._seqShuffle.forEach(function (id) {
        var used = self.seqOrder.indexOf(id) >= 0;
        var strip = (r.strips || []).filter(function (s) { return s.id === id; })[0];
        var b = api.el('button', 'mb-strip' + (used ? ' mb-strip-used' : '')); b.type = 'button'; b.textContent = strip.text;
        if (self.readOnly || used) b.disabled = true;
        else b.addEventListener('click', function () { self._tapStrip(id); });
        bank.appendChild(b);
      });
      leaf.appendChild(bank);
    },
    _tapStrip: function (id) {
      this.seqOrder.push(id); this.api.sound && this.api.sound(560 + this.seqOrder.length * 30);
      if (this.seqOrder.length === (this.round.strips || []).length) {
        if (Core.attempt(this.round, this.seqOrder)) this._win();
        else { this.misses++; this.seqOrder = []; this._refuse(null); }
      } else this.render();
    },

    /* ---------- sort ---------- */
    _renderSort: function (leaf) {
      var self = this, api = this.api, r = this.round, bins = (r.extras && r.extras.sortBins) || [];
      var head = api.el('div', 'mb-subhint'); head.textContent = (r.tts && r.tts.prompt) || ''; leaf.appendChild(head);
      var itemsWrap = api.el('div', 'mb-sort-items');
      (r.items || []).forEach(function (it) {
        var placed = self.placements[it.id];
        var b = api.el('button', 'mb-sort-item' + (self.selected === it.id ? ' mb-sel' : '') + (placed ? ' mb-placed' : '')); b.type = 'button'; b.textContent = it.text;
        if (self.readOnly || placed) b.disabled = true;
        else b.addEventListener('click', function () { self.selected = it.id; self.api.sound && self.api.sound(560); self.render(); });
        itemsWrap.appendChild(b);
      });
      leaf.appendChild(itemsWrap);
      var binWrap = api.el('div', 'mb-bins');
      bins.forEach(function (bn) {
        var bb = api.el('button', 'mb-bin'); bb.type = 'button'; bb.innerHTML = '🧺<span class="mb-bin-lab">' + esc(bn) + '</span>';
        if (self.readOnly) bb.disabled = true;
        else bb.addEventListener('click', function () { self._dropInBin(bn); });
        binWrap.appendChild(bb);
      });
      leaf.appendChild(binWrap);
    },
    _dropInBin: function (bin) {
      if (this.selected == null) { if (this.api.announce) this.api.announce(this.api.t('pickFirst')); return; }
      this.placements[this.selected] = bin; this.selected = null; this.api.sound && this.api.sound(620);
      if (Object.keys(this.placements).length === (this.round.items || []).length) {
        if (Core.attempt(this.round, this.placements)) this._win();
        else { this.misses++; this.placements = {}; this._refuse(null); }
      } else this.render();
    },

    /* ---------- commit ---------- */
    _attempt: function (response, btn) {
      if (this.readOnly) return;
      if (Core.attempt(this.round, response)) { this._win(); }
      else { this.misses++; this._refuse(btn); }
    },

    _win: function () {
      this.readOnly = true; this.phase = 'done';
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 7);
      this._setPose('happy'); this.api.sound && this.api.sound(880);
      this.render();
      // develop the picture (the reward) — only NOW
      var leaf = this._leafEl; if (leaf) leaf.classList.add('mended');
      var healed = this.round.tts && this.round.tts.healed;
      if (this.api.announce) this.api.announce(this.api.t('mended') + (healed ? ' ' + healed : ''));
      if (healed) speak(healed);
    },

    _refuse: function (btn) {
      this._setPose('idle'); this.api.sound && this.api.sound(320);
      if (this.api.announce) this.api.announce(this.api.t('reread'));
      speak(this.api.t('reread'));
      this.selected = null;
      if (btn) { btn.classList.add('mb-refuse'); var b = btn; setTimeout(function () { b.classList.remove('mb-refuse'); }, 460); }
      var leaf = this._leafEl; if (leaf) { leaf.classList.add('mb-shake'); var l = leaf; setTimeout(function () { l.classList.remove('mb-shake'); }, 460); }
      // NO answer-region pixel is painted on a wrong attempt (fix #5): re-render the SAME grey state
      this.render();
    },

    _setPose: function (name) { if (this._grannyEl) this._grannyEl.setAttribute('data-pose', name); },
    isCorrect: function () { return this.phase === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]);
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n);
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/mending-basket-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[mending-basket] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.mb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,580px);margin:0 auto;}'
        + '.mb-room{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(4px,1.2vw,8px);'
        +   'background:linear-gradient(180deg,#EFE3CC,#E7D8BC);border-radius:18px;padding:clamp(6px,1.4vw,10px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* top strip: Granny + lantern */
        + '.mb-top{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 4px;}'
        + '.mb-granny{width:clamp(34px,9vw,50px);}.mb-granny-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.mb-eyes-happy{display:none;}.mb-granny[data-pose="happy"] .mb-eyes-open{display:none;}.mb-granny[data-pose="happy"] .mb-eyes-happy{display:inline;}'
        + '.mb-lantern{position:relative;font-size:clamp(22px,6vw,30px);filter:grayscale(calc(1 - var(--lit,0)));opacity:calc(.5 + .5*var(--lit,0));transition:filter .5s,opacity .5s;}'
        + '.mb-lantern-glow{position:absolute;inset:-6px;border-radius:50%;background:radial-gradient(circle,rgba(226,176,74,calc(.5*var(--lit,0))),transparent 70%);}'
        /* the torn leaf */
        + '.mb-leaf{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.5vw,9px);'
        +   'background:repeating-linear-gradient(135deg,' + C.PAPER + ' 0 9px,#EFE4CB 9px 18px);border-radius:14px;padding:clamp(7px,1.8vw,12px) clamp(8px,2.2vw,14px);'
        +   'box-shadow:inset 0 0 0 1px rgba(20,107,94,.10),0 2px 6px rgba(120,90,40,.12);}'
        + '.mb-leaf.mb-shake{animation:mbShake .46s ease;}@keyframes mbShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}'
        /* scene stub (greyscale → colour on .mended) */
        + '.mb-scene{position:relative;width:100%;max-width:280px;height:clamp(46px,12vw,68px);border-radius:10px;overflow:hidden;'
        +   'background:linear-gradient(180deg,var(--sky,#cde) 0 62%,var(--gr,#9b8) 62% 100%);filter:grayscale(1) brightness(.96);transition:filter .7s ease;display:flex;align-items:center;justify-content:center;}'
        + '.mb-leaf.mended .mb-scene{filter:none;}'
        + '.mb-scene-motif{font-size:clamp(34px,10vw,52px);filter:drop-shadow(0 2px 2px rgba(0,0,0,.12));}'
        + '.mb-scene.is-alive .mb-scene-motif{animation:mbAlive 2.2s ease-in-out infinite;}@keyframes mbAlive{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-3px) rotate(-3deg)}}'
        + '.mb-torn{position:absolute;top:0;right:0;width:38px;height:38px;background:linear-gradient(225deg,#EFE4CB 0 50%,transparent 50%);clip-path:polygon(100% 0,0 0,100% 100%);transition:opacity .6s;}'
        + '.mb-leaf.mended .mb-torn{opacity:0;}'
        /* caption + tokens */
        + '.mb-caption{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1px 0;line-height:1.32;font-family:"Baloo 2",var(--lcs-font-display,sans-serif);}'
        + '.mb-word{font-size:clamp(16px,4vw,20px);font-weight:600;color:' + C.INK + ';white-space:nowrap;}'
        + '.mb-space{display:inline-block;width:.32em;}'
        + '.mb-word-tap{background:#FFF6E6;border:2px solid rgba(20,107,94,.25);border-radius:8px;padding:1px 6px;cursor:pointer;font-weight:700;color:' + C.T + ';touch-action:manipulation;min-height:34px;}'
        + '.mb-word-tap:active{transform:translateY(1px);}.mb-word-tap.mb-refuse{animation:mbShake .46s ease;background:#FBE0D5;}'
        + '.mb-word-fixed{color:' + C.GOOD + ';font-weight:800;}'
        + '.mb-tear{min-width:clamp(64px,18vw,96px);min-height:38px;border:2px dashed ' + C.CORAL + ';border-radius:9px;background:#FFF;color:' + C.CORAL + ';font:800 clamp(16px,4.4vw,21px)/1 "Baloo 2",sans-serif;cursor:pointer;vertical-align:middle;box-shadow:0 0 0 4px rgba(242,120,75,.14);animation:mbGlow 1.5s ease-in-out infinite;touch-action:manipulation;}'
        + '@keyframes mbGlow{0%,100%{box-shadow:0 0 0 4px rgba(242,120,75,.13)}50%{box-shadow:0 0 0 7px rgba(242,120,75,.24)}}'
        + '.mb-tear.mb-refuse{animation:mbShake .46s ease;}'
        + '.mb-tear-mended{border-style:solid;border-color:' + C.GOOD + ';color:' + C.GOOD + ';background:#EAF7F0;animation:none;box-shadow:0 0 0 4px rgba(47,165,106,.2);}'
        + '.mb-subhint{font:700 clamp(12px,3.2vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';opacity:.85;text-align:center;}'
        /* tray pieces */
        + '.mb-tray{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;}'
        + '.mb-piece{min-height:44px;padding:0 clamp(10px,3vw,18px);border-radius:12px;border:0;background:linear-gradient(180deg,#fff,#F0E7D2);'
        +   'font:800 clamp(15px,3.9vw,20px)/1 "Baloo 2",sans-serif;color:' + C.T + ';cursor:pointer;box-shadow:0 3px 0 rgba(160,120,60,.3),inset 0 2px 0 #fff;touch-action:manipulation;transition:transform .1s;}'
        + '.mb-piece:active{transform:translateY(2px);}.mb-piece:focus-visible,.mb-tear:focus-visible,.mb-word-tap:focus-visible,.mb-zone:focus-visible,.mb-bin:focus-visible,.mb-strip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.mb-piece-sel{background:linear-gradient(180deg,#FFEFD6,#F2784B);color:#fff;box-shadow:0 3px 0 ' + C.CORAL2 + ';}'
        /* placement zones */
        + '.mb-zones{display:flex;flex-wrap:wrap;gap:clamp(6px,1.8vw,10px);justify-content:center;align-items:center;}'
        + '.mb-figure{font-size:clamp(24px,6.4vw,34px);background:#FFF6E6;border:2px solid rgba(20,107,94,.25);border-radius:12px;min-width:46px;min-height:46px;cursor:pointer;touch-action:manipulation;}'
        + '.mb-figure-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.25);}'
        + '.mb-zone{min-width:clamp(56px,15vw,80px);min-height:44px;border-radius:11px;border:2px solid rgba(20,107,94,.3);background:#FCF6EA;color:' + C.T + ';font:700 clamp(12px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.mb-zone-win{background:#EAF7F0;border-color:' + C.GOOD + ';box-shadow:0 0 0 3px rgba(47,165,106,.25);}'
        /* match twins */
        + '.mb-page{font-size:clamp(24px,6.5vw,34px);background:#FFF6E6;border:2px solid rgba(20,107,94,.25);border-radius:10px;min-width:50px;min-height:46px;cursor:pointer;touch-action:manipulation;}'
        + '.mb-page-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.25);}'
        + '.mb-twins{display:flex;flex-direction:column;gap:clamp(6px,1.6vw,9px);width:100%;align-items:center;justify-content:center;}'
        + '@media (min-width:600px){.mb-twins{flex-direction:row;}.mb-twin{max-width:220px;}}'   /* side-by-side on desktop halves the height */
        + '.mb-twin{position:relative;width:100%;max-width:260px;border:2px solid rgba(20,107,94,.2);border-radius:10px;background:transparent;padding:0;cursor:pointer;overflow:hidden;touch-action:manipulation;}'
        + '.mb-twin .mb-scene{max-width:none;height:clamp(48px,13vw,62px);}'
        + '.mb-twin-lab{position:absolute;left:6px;bottom:4px;background:rgba(255,255,255,.85);border-radius:6px;padding:1px 7px;font:700 12px/1.2 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.mb-twin-win{border-color:' + C.GOOD + ';box-shadow:0 0 0 3px rgba(47,165,106,.3);}'
        /* sequence */
        + '.mb-seq-slots{display:flex;gap:6px;}'
        + '.mb-seq-slot{width:26px;height:26px;border-radius:7px;border:2px dashed rgba(20,107,94,.3);display:flex;align-items:center;justify-content:center;font:800 14px/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.mb-seq-slot.mb-seq-filled{border-style:solid;background:#EAF7F0;}'
        + '.mb-seq-bank{display:flex;flex-direction:column;gap:6px;width:100%;align-items:stretch;}'
        + '.mb-strip{text-align:left;padding:clamp(7px,1.8vw,9px) 12px;border-radius:10px;border:0;background:linear-gradient(180deg,#fff,#F0E7D2);font:600 clamp(13px,3.4vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.INK + ';cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.28);touch-action:manipulation;}'
        + '.mb-strip-used{opacity:.4;}'
        /* sort */
        + '.mb-sort-items{display:flex;flex-direction:column;gap:6px;width:100%;}'
        + '.mb-sort-item{text-align:left;padding:clamp(6px,1.6vw,8px) 12px;border-radius:10px;border:0;background:linear-gradient(180deg,#fff,#F0E7D2);font:600 clamp(13px,3.3vw,15px)/1.18 "Baloo 2",sans-serif;color:' + C.INK + ';cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.28);touch-action:manipulation;}'
        + '.mb-sort-item.mb-sel{background:linear-gradient(180deg,#FFEFD6,#F2784B);color:#fff;}.mb-sort-item.mb-placed{opacity:.4;}'
        + '.mb-bins{display:flex;gap:clamp(10px,3vw,18px);justify-content:center;}'
        + '.mb-bin{display:flex;flex-direction:column;align-items:center;font-size:clamp(22px,6vw,30px);background:#FCF6EA;border:2px solid rgba(20,107,94,.25);border-radius:12px;padding:4px clamp(12px,4vw,20px);cursor:pointer;touch-action:manipulation;min-height:44px;}'
        + '.mb-bin-lab{font:700 clamp(12px,3.2vw,15px)/1 "Baloo 2",sans-serif;color:' + C.T + ';margin-top:2px;}'
        + '@media (max-width:360px){.mb-room{padding:5px;gap:3px;}.mb-leaf{padding:7px 6px;gap:4px;}.mb-scene{height:44px;}.mb-caption{line-height:1.28;}.mb-piece{min-height:44px;padding:0 9px;}.mb-tray{gap:6px;}.mb-twin .mb-scene{height:40px;}.mb-twins{gap:5px;}.mb-page{min-height:42px;font-size:24px;}}'
        + '@media (prefers-reduced-motion: reduce){.mb-scene,.mb-leaf,.mb-tear,.mb-scene-motif,.mb-lantern{animation:none!important;transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-mending-basket', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  function appendSpace(cap, api) { cap.appendChild(api.el('span', 'mb-space')); }

  function promptFor(r) {
    return { key: r.type === 'contradiction' ? 'tapWord' : 'pickFirst', args: {} };
  }
  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'mending-basket.' + round.id, band: round.band, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) tool.readOnly = true; return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
