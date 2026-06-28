/* =====================================================================
   WIGGLES' SENTENCE BUILDER — ACTIVITY SKIN  (sentence-builder-activity.js)
   ---------------------------------------------------------------------
   L.1.1.j + L.K.1.b · build a complete declarative sentence — the lcs-shell skin
   over sentence-builder-core.js. answerType:'state' with the shell Check VISIBLE
   (arrange-then-check). EN-ONLY-by-design (404).

   A subject-noun picture + a row of empty SLOTS (one per word) + a scrambled
   TILE palette of the sentence's words. The child taps tiles into the slots in
   order (tap a filled slot to return it), then Check. Correct = the placed order
   === the canonical sentence (Core.gradeOrder), DERIVED not stored. Correct →
   lock + read the sentence aloud + Wiggles happy. Wrong → warm nudge (fill all /
   fix the order), no advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SentenceBuilderCore;

  var L = {
    en: {
      q: 'Put the words in order.',
      hear: '🔊 Hear it',
      win: 'You built a sentence!',
      hintFill: 'Use all the words — fill every box.',
      hintOrder: 'Not a sentence yet — start with the capital word, end with the period, and make it make sense.'
    }
  };
  function txt(k) { return L.en[k] || k; }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function imgUrl(s) { return '/image-library-webp/themes/' + s.themeDir + '/' + s.noun + '@2x.webp'; }

  function wiggleSVG() {
    /* Wiggles — a green caterpillar (a line of segments = a sentence in order) */
    return '<svg class="snt-wiggle-svg" viewBox="0 0 60 30" width="46" height="23" aria-hidden="true">' +
      '<circle cx="46" cy="18" r="7" fill="#8FBF4E" stroke="#5C8A2A" stroke-width="1.6"/>' +
      '<circle cx="36" cy="19" r="6" fill="#A6CF63" stroke="#5C8A2A" stroke-width="1.4"/>' +
      '<circle cx="27" cy="19" r="6" fill="#8FBF4E" stroke="#5C8A2A" stroke-width="1.4"/>' +
      '<circle cx="18" cy="19" r="6" fill="#A6CF63" stroke="#5C8A2A" stroke-width="1.4"/>' +
      '<circle cx="9" cy="19" r="5.5" fill="#8FBF4E" stroke="#5C8A2A" stroke-width="1.4"/>' +
      '<path d="M44 11 l2 -5 M49 11 l3 -4" stroke="#5C8A2A" stroke-width="1.4" stroke-linecap="round"/>' +   /* antennae */
      '<g class="snt-eyes-open"><circle cx="45" cy="16" r="1.6" fill="#2B2B2B"/><circle cx="49" cy="16" r="1.6" fill="#2B2B2B"/></g>' +
      '<g class="snt-eyes-happy"><path d="M43.5 16 q1.5 -1.8 3 0" stroke="#2B2B2B" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M47.5 16 q1.5 -1.8 3 0" stroke="#2B2B2B" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>' +
      '</svg>';
  }

  var SentenceBuilderActivity = {
    id: 'sentence-builder-activity',
    strings: {
      title: { en: "Wiggles' Sentence Builder" },
      instruction: { en: 'Tap the words to put them in order and build a sentence.' },
      q: { en: '{q}' },
      hintFill: { en: 'Use all the words — fill every box.' },
      hintOrder: { en: 'Not a sentence yet — start with the capital word, end with the period, and make it make sense.' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._round = null; this.readOnly = false;
      this._canonical = []; this._tiles = []; this._used = []; this._slots = [];
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('snt-style')) return;
      var s = el('style'); s.id = 'snt-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.snt-root{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;max-width:min(96vw,560px);margin:0 auto;}',
        '.snt-subject{width:52px;height:52px;border:3px solid #146B5E;border-radius:12px;background:#FFFDF6;display:flex;align-items:center;justify-content:center;overflow:hidden;}',
        '.snt-subject img{width:100%;height:100%;object-fit:contain;}',
        '.snt-slots{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;width:100%;}',
        '.snt-slot{min-width:54px;min-height:44px;border:2.5px dashed #C9B98E;border-radius:10px;background:#FFFDF6;font:800 1rem/1 "Baloo 2",Nunito,sans-serif;color:#0F4A40;cursor:pointer;padding:6px 10px;display:flex;align-items:center;justify-content:center;}',
        '.snt-slot.filled{border-style:solid;border-color:#146B5E;background:#EAF4F1;}',
        '.snt-palette{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;width:100%;}',
        '.snt-tile{min-height:44px;border:3px solid #146B5E;border-radius:12px;background:#fff;font:800 1rem/1 "Baloo 2",Nunito,sans-serif;color:#146B5E;cursor:pointer;padding:9px 13px;}',
        '.snt-tile.used{visibility:hidden;}',
        '.snt-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:34px;}',
        '.snt-wiggle{flex:0 0 auto;line-height:0;}',
        '.snt-hear{flex:0 0 auto;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .8rem/1 Nunito,sans-serif;padding:7px 14px;min-height:44px;cursor:pointer;}',
        '.snt-wiggle-svg .snt-eyes-happy{display:none;}.snt-wiggle[data-pose=happy] .snt-eyes-open{display:none;}.snt-wiggle[data-pose=happy] .snt-eyes-happy{display:block;}',
        '.snt-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.snt-root{gap:6px;}.snt-subject{width:44px;height:44px;}.snt-slot{min-width:46px;font-size:.92rem;padding:5px 7px;}.snt-tile{font-size:.92rem;padding:8px 10px;}.snt-hear{padding:6px 11px;}}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'sentence-builder.build-a-sentence.l-1-1-j';
      var tries = ['/mini-tools/sentence-builder-activities.json', 'sentence-builder-activities.json', '../mini tools/sentence-builder-activities.json'];
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
      var self = this;
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: txt('q') }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._checkNow(); },
        hintKey: function (tool) { return tool._allFilled() ? 'hintOrder' : 'hintFill'; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this.readOnly = false;
      this._canonical = (round.canonical || []).slice();
      this._tiles = Core.scramble(this._canonical, round.seed || 1);
      this._used = this._tiles.map(function () { return false; });
      this._slots = this._canonical.map(function () { return null; });   /* each: {word, ti} */
      if (this._app) this._app.classList.remove('snt-resolved');
    },

    _firstEmpty: function () { for (var i = 0; i < this._slots.length; i++) if (this._slots[i] == null) return i; return -1; },
    _allFilled: function () { return this._slots.length > 0 && this._slots.every(function (s) { return s != null; }); },
    _placedWords: function () { return this._slots.map(function (s) { return s ? s.word : null; }); },

    selectTile: function (ti) {
      if (this.readOnly || this._used[ti]) return;
      var slot = this._firstEmpty(); if (slot < 0) return;
      this._slots[slot] = { word: this._tiles[ti], ti: ti };
      this._used[ti] = true;
      this._api.sound && this._api.sound(660);
      this.render();
    },
    clearSlot: function (si) {
      if (this.readOnly || this._slots[si] == null) return;
      this._used[this._slots[si].ti] = false;
      this._slots[si] = null;
      this._api.sound && this._api.sound(440);
      this.render();
    },

    _checkNow: function () {
      if (!this._allFilled()) return false;
      var ok = Core.gradeOrder(this._placedWords(), this._canonical);
      if (ok) {
        this.readOnly = true;
        this.render();
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: this._canonical.join(' '), lang: 'en', rate: 0.85 }); } catch (e) { } }
      }
      return ok;
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var self = this;
      var root = el('div', 'snt-root');

      if (round.subject && round.subject.noun) {
        var subj = el('div', 'snt-subject');
        var sim = el('img'); sim.src = imgUrl(round.subject); sim.alt = round.subject.noun; sim.setAttribute('loading', 'lazy');
        subj.appendChild(sim); root.appendChild(subj);
      }

      /* slots (the sentence being built) */
      var slots = el('div', 'snt-slots');
      this._slots.forEach(function (s, si) {
        var b = el('button', 'snt-slot' + (s ? ' filled' : ''));
        b.type = 'button'; b.setAttribute('data-si', si);
        b.textContent = s ? s.word : '';
        b.setAttribute('aria-label', s ? s.word : 'empty slot ' + (si + 1));
        b.addEventListener('click', function () { self.clearSlot(si); });
        slots.appendChild(b);
      });
      root.appendChild(slots);

      /* scrambled tile palette */
      var pal = el('div', 'snt-palette');
      this._tiles.forEach(function (w, ti) {
        var b = el('button', 'snt-tile' + (self._used[ti] ? ' used' : ''));
        b.type = 'button'; b.setAttribute('data-ti', ti); b.textContent = w;
        b.addEventListener('click', function () { self.selectTile(ti); });
        pal.appendChild(b);
      });
      root.appendChild(pal);

      /* Wiggles + Hear-it */
      var say = el('div', 'snt-say');
      var wig = el('div', 'snt-wiggle'); wig.setAttribute('data-pose', this.readOnly ? 'happy' : 'idle'); wig.innerHTML = wiggleSVG();
      var hear = el('button', 'snt-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var built = self._placedWords().filter(Boolean).join(' ');
        if (built && global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: built, lang: 'en', rate: 0.85 }); } catch (e) { } }
      });
      say.append(wig, hear); root.appendChild(say); this._wig = wig;

      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _srMirror: function () {
      var wrap = el('div', 'snt-sronly'); wrap.setAttribute('aria-live', 'polite');
      wrap.innerHTML = '<p>Build a sentence. The words are: ' + this._tiles.join(', ') + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.SentenceBuilderActivity = SentenceBuilderActivity;

}(typeof window !== 'undefined' ? window : this));
