/* =====================================================================
   COCO'S SOUND BOXES — ACTIVITY SKIN  (sound-boxes-activity.js)
   ---------------------------------------------------------------------
   RF.K.2.d · phoneme isolation (first / middle / last sound) — the lcs-shell
   skin over sound-boxes-core.js. answerType:'state'. EN-ONLY-by-design (404).

   A target CVC word (picture + 3 Elkonin boxes, one box highlighted = the
   target position) + a "🔊 Hear it" (whole-word audio). The child taps one of
   3 candidate picture tiles whose sound MATCHES the target at that position.
   Correct = the tapped option isAnswer (same position-phoneme), DERIVED not
   stored. Correct → glow + a "same first/middle/last sound" note + Coco happy
   (resolve; shell Check hidden until `.lcs-app.coco-resolved`). Wrong → warm
   nudge, no advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SoundBoxesCore;
  var POS_WORD = { b: 'first', m: 'middle', e: 'last' };
  var BOX_INDEX = { b: 0, m: 1, e: 2 };

  var L = {
    en: {
      qFirst: 'Same FIRST sound as {t}?',
      qMid: 'Same MIDDLE sound as {t}?',
      qLast: 'Same LAST sound as {t}?',
      win: 'Yes! {t} and {m} have the same {pos} sound!',
      hear: '🔊 Hear it',
      nudgeFirst: 'Not quite — that starts with a different sound. Which starts like {t}?',
      nudgeMid: 'Listen again — that middle sound is different. Which has the same middle sound as {t}?',
      nudgeLast: 'Not quite — that ends with a different sound. Which ends like {t}?'
    }
  };
  function txt(k, a) { var s = L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function imgUrl(w) { return '/image-library-webp/themes/' + w.themeDir + '/' + w.noun + '@2x.webp'; }

  function cocoSVG() {
    /* Coco — a round grey koala with big round ears (a good listener) */
    return '<svg class="sb-coco-svg" viewBox="0 0 52 46" width="40" height="35" aria-hidden="true">' +
      '<circle cx="11" cy="15" r="8" fill="#B9BEC7" stroke="#7C828E" stroke-width="1.5"/>' +
      '<circle cx="41" cy="15" r="8" fill="#B9BEC7" stroke="#7C828E" stroke-width="1.5"/>' +   /* big round ears */
      '<circle cx="11" cy="15" r="4.2" fill="#D9DCE2"/><circle cx="41" cy="15" r="4.2" fill="#D9DCE2"/>' +
      '<ellipse cx="26" cy="27" rx="14" ry="13" fill="#C7CCD4" stroke="#7C828E" stroke-width="1.6"/>' +
      '<g class="sb-eyes-open"><circle cx="20" cy="25" r="2" fill="#2B2B2B"/><circle cx="32" cy="25" r="2" fill="#2B2B2B"/></g>' +
      '<g class="sb-eyes-happy"><path d="M18 25 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M30 25 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<ellipse cx="26" cy="31" rx="4" ry="3" fill="#5B5F69"/></svg>';   /* big koala nose */
  }

  var SoundBoxesActivity = {
    id: 'sound-boxes-activity',
    strings: {
      title: { en: "Coco's Sound Boxes" },
      instruction: { en: 'Listen for the first, middle, and last sound. Tap the word that matches!' },
      q: { en: '{q}' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._round = null; this._resolved = false; this._token = 0;
      this._nonAns = {}; this._lit = -1; this._optOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('sb-style')) return;
      var s = el('style'); s.id = 'sb-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.sb-root{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:min(96vw,460px);margin:0 auto;}',
        '.sb-stim{display:flex;flex-direction:column;align-items:center;gap:5px;}',
        '.sb-target{width:56px;height:56px;border:3px solid #146B5E;border-radius:12px;background:#FFFDF6;display:flex;align-items:center;justify-content:center;overflow:hidden;}',
        '.sb-target img{width:100%;height:100%;object-fit:contain;}',
        '.sb-boxrow{display:flex;align-items:center;gap:10px;}',
        '.sb-boxes{display:flex;gap:4px;}',
        '.sb-box{width:20px;height:20px;border:2.5px solid #146B5E;border-radius:5px;background:#fff;}',
        '.sb-box.is-target{background:#F2784B;border-color:#C2410C;box-shadow:0 0 0 3px #F2C14E;}',
        '.sb-hear{border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:7px 14px;min-height:44px;cursor:pointer;}',
        '.sb-row{display:flex;gap:8px;width:100%;justify-content:center;}',
        '.sb-choice{flex:1 1 0;min-width:0;max-width:104px;aspect-ratio:1;border:3px solid #C9B98E;border-radius:14px;background:#FFFDF6;cursor:pointer;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:5px;}',
        '.sb-choice img{width:100%;height:100%;object-fit:contain;display:block;}',
        '.sb-choice.dim{opacity:.4;}',
        '.sb-choice.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.sb-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:36px;}',
        '.sb-coco{flex:0 0 auto;line-height:0;}',
        '.sb-msg{flex:0 1 auto;min-height:1.1em;text-align:center;font:700 .84rem/1.16 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;max-width:320px;}',
        '.sb-msg.miss{color:#C2410C;}',
        '.sb-coco-svg .sb-eyes-happy{display:none;}.sb-coco[data-pose=happy] .sb-eyes-open{display:none;}.sb-coco[data-pose=happy] .sb-eyes-happy{display:block;}',
        '.sb-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.sb-root{gap:4px;}.sb-target{width:50px;height:50px;}.sb-box{width:17px;height:17px;}.sb-row{gap:6px;}.sb-choice{padding:4px;max-width:92px;}.sb-hear{padding:6px 11px;}}',
        '.lcs-app:not(.coco-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'sound-boxes.phoneme-position.rf-k-2-d';
      var tries = ['/mini-tools/sound-boxes-activities.json', 'sound-boxes-activities.json', '../mini tools/sound-boxes-activities.json'];
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

    _qKey: function (pos) { return pos === 'b' ? 'qFirst' : (pos === 'e' ? 'qLast' : 'qMid'); },

    _makeTask: function (round) {
      var q = txt(this._qKey(round.position), { t: cap(round.target.noun) });
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: q }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonAns = {}; this._lit = -1;
      this._optOrder = this._shuffle((round.options || []).map(function (_, i) { return i; }));   /* shuffle display so match position ≠ answer */
      if (this._app) this._app.classList.remove('coco-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var self = this, tok = this._token;
      var root = el('div', 'sb-root');

      /* stimulus: target picture + 3 Elkonin boxes (target box highlighted) + Hear it */
      var stim = el('div', 'sb-stim');
      var tgt = el('div', 'sb-target');
      var timg = el('img'); timg.src = imgUrl(round.target); timg.alt = ''; timg.setAttribute('loading', 'lazy'); tgt.appendChild(timg);
      var boxrow = el('div', 'sb-boxrow');
      var boxes = el('div', 'sb-boxes'); boxes.setAttribute('aria-hidden', 'true');
      for (var bi = 0; bi < 3; bi++) { var bx = el('div', 'sb-box' + (BOX_INDEX[round.position] === bi ? ' is-target' : '')); boxes.appendChild(bx); }
      var hear = el('button', 'sb-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'word', text: round.target.noun, lang: 'en', rate: 0.8 }); } catch (e) { } }
      });
      boxrow.append(boxes, hear);   /* boxes + Hear-it on ONE row → shorter stimulus (fold-critical: the shell prompt is ~200px tall at desktop) */
      stim.append(tgt, boxrow); root.appendChild(stim);

      /* candidate picture tiles */
      var row = el('div', 'sb-row');
      var order = this._optOrder || (round.options || []).map(function (_, i) { return i; });
      order.forEach(function (oi) {
        var w = round.options[oi];
        var b = el('button', 'sb-choice' + (self._nonAns[oi] ? ' dim' : '') + (self._lit === oi ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-oi', oi); b.setAttribute('aria-label', w.noun);
        var im = el('img'); im.src = imgUrl(w); im.alt = ''; im.setAttribute('loading', 'lazy'); b.appendChild(im);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonAns[oi] || self._token !== tok) return;
          if (Core.isAnswer(round, oi)) { self._lit = oi; self._resolve(oi); }
          else { self._nonAns[oi] = 1; self._nudge(round); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);

      /* Coco + live msg footer */
      var say = el('div', 'sb-say');
      var co = el('div', 'sb-coco'); co.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); co.innerHTML = cocoSVG();
      var msg = el('p', 'sb-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(co, msg); root.appendChild(say); this._coco = co;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function (oi) {
      this._resolved = true;
      if (this._app) this._app.classList.add('coco-resolved');
      var round = this._round, m = round.options[oi];
      this.render();
      var line = this._api.stage.querySelector('.sb-msg');
      var note = txt('win', { t: cap(round.target.noun), m: cap(m.noun), pos: POS_WORD[round.position] });
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function (round) {
      var nk = round.position === 'b' ? 'nudgeFirst' : (round.position === 'e' ? 'nudgeLast' : 'nudgeMid');
      var msgText = txt(nk, { t: cap(round.target.noun) });
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.sb-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'sb-sronly'); wrap.setAttribute('aria-live', 'polite');
      var cs = (round.options || []).map(function (x) { return x.noun; }).join(', ');
      wrap.innerHTML = '<p>' + txt(this._qKey(round.position), { t: cap(round.target.noun) }) + ' The choices are: ' + cs + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.SoundBoxesActivity = SoundBoxesActivity;

}(typeof window !== 'undefined' ? window : this));
