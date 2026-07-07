/* =====================================================================
   SNIPPY THE SOUND-SPARK SNAIL — ACTIVITY  (snippy-activity.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.a — Snippy's ink trail IS the letter. The child FORMS the shown
   letter by stroke: GUIDED first (faded path + numbered start-dots — practice),
   then the GRADED CERTIFY pass (path + order HIDDEN; only unlabeled start-dots →
   pick the correct start + take the strokes in order from memory). A wrong
   certify start gently DEMOTES to a re-peek. The letter is SHOWN (formation, NOT
   recognition; the word is a light frame). All grading from snippy-core.js. 0
   lines to any existing core (incl. numeral-trace-core.js) + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SnippyCore;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { T: '#146B5E', T2: '#0E5247', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', FAINT: 'rgba(20,107,94,.22)' };

  var LANG = 'en';   /* content locale, set from api.lang in init() */

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG === 'fr' ? 'fr-FR' : 'en', rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = LANG === 'fr' ? 'fr-FR' : 'en-US'; u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }
  /* Catmull-Rom → cubic-Bézier spline that PASSES THROUGH every point (the
     smooth-numeral fix from mamas-roll-call-activity.js). <3 pts → straight. */
  function splinePath(pts) {
    if (!pts || !pts.length) return '';
    if (pts.length < 3) return 'M ' + pts.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');
    var d = 'M ' + pts[0].x + ' ' + pts[0].y;
    for (var k = 0; k < pts.length - 1; k++) {
      var p0 = pts[k - 1] || pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] || p2;
      var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ' C ' + c1x.toFixed(2) + ' ' + c1y.toFixed(2) + ' ' + c2x.toFixed(2) + ' ' + c2y.toFixed(2) + ' ' + p2.x + ' ' + p2.y;
    }
    return d;
  }

  global.SnippyActivity = {
    id: 'snippy-activity',

    strings: {
      title: { en: "Snippy's Letter Trace", fr: 'Snippy trace les lettres' },
      instruction: { en: '', fr: '' },
      prompt: { en: 'Trace the letter.', fr: 'Trace la lettre.' },
      sayWelcome: { en: "Form the letter and I'll bloom a flower! Start on the dot.", fr: 'Forme la lettre et je ferai éclore une fleur ! Commence sur le point.' },
      sayGuided: { en: 'Trace along the path — start at the dot.', fr: 'Suis le chemin — commence sur le point.' },
      sayCertify: { en: 'Now on your own — start on the right dot, in order!', fr: 'Maintenant tout seul — commence sur le bon point, dans l’ordre !' },
      sayWin: { en: 'Beautiful letter! 🌸', fr: 'Belle lettre ! 🌸' },
      sayStroke: { en: 'Nice — next stroke!', fr: 'Bravo — au trait suivant !' },
      sayWrongStart: { en: "That's not the first dot — let's peek again.", fr: 'Ce n’est pas le premier point — regardons encore.' },
      sayOffPath: { en: 'Try that stroke again — follow the shape.', fr: 'Refais ce trait — suis bien la forme.' },
      hintCheck: { en: 'Start on the correct dot and take the strokes in order.', fr: 'Commence sur le bon point et fais les traits dans l’ordre.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false;
      this.level = 'guided'; this.cs = null; this.ink = []; this.cur = null; this.dragging = false; this.msg = null; this.bloom = 0; this.demoted = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.solved = false; this.msg = null; this._spoke = false;
      this.level = 'guided'; this.cs = Core.newState(round, 'guided'); this.ink = []; this.cur = null; this.dragging = false; this.demoted = 0;
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'sn-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round;

      var say = api.el('div', 'sn-saytop');
      say.innerHTML = '<span class="sn-snail' + (this.solved ? ' sn-bounce' : '') + '">🐌</span><span class="sn-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      this._renderGarden(root);

      /* head: the word-anchor (the letter is SHOWN — formation, not recognition) */
      var head = api.el('div', 'sn-head');
      var chip = api.el('span', 'sn-word');
      chip.innerHTML = 'Trace <b class="sn-letter">' + esc(r.letter) + '</b> &nbsp;·&nbsp; ' + esc(r.word);
      chip.setAttribute('aria-label', LANG === 'fr' ? ('trace la lettre ' + r.letter + ', comme dans ' + r.word) : ('trace the letter ' + r.letter + ', as in ' + r.word));
      head.appendChild(chip);
      var lvl = api.el('span', 'sn-level sn-' + this.level); lvl.textContent = this.level === 'certify' ? (LANG === 'fr' ? 'tout seul' : 'on your own') : (LANG === 'fr' ? 'suis le chemin' : 'trace along'); head.appendChild(lvl);
      root.appendChild(head);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }

      this._renderPaper(root);

      stage.appendChild(root);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(r.word || ''); }, 280); }
    },

    _renderGarden: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 10;
      var g = api.el('div', 'sn-garden'); g.setAttribute('aria-hidden', 'true');
      var fill = Math.min(1, this.bloom / total);
      g.style.background = 'linear-gradient(90deg, #BfE0C8 ' + Math.round(fill * 100) + '%, #E7EEE9 ' + Math.round(fill * 100) + '%)';
      var k = api.el('span', 'sn-flower'); k.textContent = fill >= 1 ? '🌷🌻' : '🌱'; g.appendChild(k);
      root.appendChild(g);
    },

    /* ----- the trace paper (the SVG formation surface) ----- */
    _renderPaper: function (root) {
      var self = this, api = this.api, r = this.round;
      var snap = Core.snapshot(r, this.level), g = Core.glyphOf(r.letter);
      var wrap = api.el('div', 'sn-paper');
      var sv = svg('svg', { viewBox: '0 0 100 100', class: 'sn-svg', 'aria-label': LANG === 'fr' ? ('trace la lettre ' + r.letter) : ('trace ' + r.letter) });
      sv.style.touchAction = 'none';

      /* GUIDED/CHECKPOINT: the faded stroke path (the guide to trace over).
         Rendered as a Catmull-Rom → cubic-Bézier spline that PASSES THROUGH every
         point, so the dense on-curve glyph points draw a smooth professional
         letter (the Mama's-Roll-Call numeral fix). */
      if (snap.showPath && snap.glyphPath) {
        snap.glyphPath.forEach(function (stroke, si) {
          sv.appendChild(svg('path', { d: splinePath(stroke), fill: 'none', stroke: C.FAINT, 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '1 7' }));
        });
      }
      /* the committed ink (the child's completed strokes) */
      this.ink.forEach(function (st) {
        if (!st.path || st.path.length < 2) return;
        sv.appendChild(svg('path', { d: st.path.map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.T, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
      });
      /* the in-progress drag */
      if (this.cur && this.cur.length > 1) {
        sv.appendChild(svg('path', { d: this.cur.map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.CORAL, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
      }
      /* the start-dots — at certify ALL are shown UNLABELED + UNORDERED; at guided
         the NEXT start is numbered. Done strokes' starts dim. */
      g.forEach(function (stroke, si) {
        if (si < self.cs.strokesDone) return;   /* already formed */
        var st = stroke[0], next = si === self.cs.strokesDone;
        sv.appendChild(svg('circle', { cx: st.x, cy: st.y, r: 5.5, fill: next ? C.CORAL : '#fff', stroke: C.CORAL2, 'stroke-width': 1.4 }));
        if (snap.showOrderNumbers) { var t = svg('text', { x: st.x, y: st.y + 2.6, 'text-anchor': 'middle', 'font-size': 7, 'font-weight': 800, fill: '#fff' }); t.textContent = si + 1; sv.appendChild(t); }
      });

      wrap.appendChild(sv); root.appendChild(wrap);

      /* pointer handlers — pointerdown near a start begins a stroke; drag traces */
      function toVB(ev) { var rect = sv.getBoundingClientRect(); return { x: ((ev.clientX - rect.left) / rect.width) * 100, y: ((ev.clientY - rect.top) / rect.height) * 100 }; }
      sv.addEventListener('pointerdown', function (ev) { ev.preventDefault(); self.dragging = true; self.cur = [toVB(ev)]; try { sv.setPointerCapture(ev.pointerId); } catch (e) {} });
      sv.addEventListener('pointermove', function (ev) { if (!self.dragging) return; self.cur.push(toVB(ev)); self._paintCur(sv); });
      sv.addEventListener('pointerup', function (ev) { if (!self.dragging) return; self.dragging = false; var path = self.cur || []; self.cur = null; self._traceStroke(path[0], path); });
      sv.addEventListener('pointercancel', function () { self.dragging = false; self.cur = null; });
    },

    /* lightweight in-drag repaint (avoid a full render per move) */
    _paintCur: function (sv) {
      var old = sv.querySelector('.sn-curink'); if (old) old.parentNode.removeChild(old);
      if (this.cur && this.cur.length > 1) {
        var p = svg('path', { class: 'sn-curink', d: this.cur.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.CORAL, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
        sv.appendChild(p);
      }
    },

    _renderDone: function (root) {
      var api = this.api;
      var d = api.el('div', 'sn-done');
      /* the letter the child FORMED (their certify ink) — fills the card (not sparse) */
      if (this.ink && this.ink.length) {
        var paper = api.el('div', 'sn-donepaper');
        var sv = svg('svg', { viewBox: '0 0 100 100', class: 'sn-donesvg', 'aria-label': (LANG === 'fr' ? 'la lettre que tu as formée : ' : 'the letter you formed: ') + this.round.letter });
        this.ink.forEach(function (st) {
          if (!st.path || st.path.length < 2) return;
          sv.appendChild(svg('path', { d: st.path.map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.T, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
        });
        paper.appendChild(sv); d.appendChild(paper);
      }
      var fl = api.el('span', 'sn-flare'); fl.textContent = '🌸'; d.appendChild(fl);
      var t = api.el('span', 'sn-donetext'); t.textContent = this.msg || api.t('sayWin'); d.appendChild(t);
      root.appendChild(d);
    },

    /* ---------- interaction ---------- */
    /* _traceStroke(startPt, path) — the committed stroke. Drives the REAL core. */
    _traceStroke: function (startPt, path) {
      var api = this.api, r = this.round;
      if (!startPt || !path || path.length < 2) { this.render(); return; }
      var res = Core.attemptStroke(this.cs, startPt, path);
      if (res === 'stroke-ok' || res === 'formed') {
        this.ink.push({ path: path.slice(), strokeIdx: this.cs.strokesDone - 1 });
        api.sound && api.sound(600 + this.cs.strokesDone * 30);
        if (res === 'formed') {
          if (this.level === 'guided') {
            /* practice complete → the GRADED certify pass */
            this.level = 'certify'; this.cs = Core.newState(r, 'certify'); this.ink = [];
            this.msg = api.t('sayCertify'); api.announce && api.announce(this.msg); this.render(); return;
          }
          this._correct(); return;            /* certify formed → bloom */
        }
        this.msg = api.t('sayStroke'); this.render(); return;
      }
      if (res === 'wrong-start') {
        /* certify demote → a gentle re-peek at the guided scaffold */
        this.demoted++; this.level = 'guided'; this.cs = Core.newState(r, 'guided'); this.ink = [];
        this.msg = api.t('sayWrongStart'); api.sound && api.sound(360); api.announce && api.announce(this.msg); this.render(); return;
      }
      /* off-path / wrong-order — no advance, warm */
      this.msg = api.t('sayOffPath'); api.sound && api.sound(380); this.render();
    },

    _correct: function () {
      var api = this.api;
      this.solved = true; this.bloom = Math.min(this.bloom + 1, (this._pool && this._pool.length) || 10);
      this.msg = api.t('sayWin');
      api.sound && api.sound(880);
      setTimeout(function () { speak(LANG === 'fr' ? 'Magnifique !' : 'Beautiful!'); }, 160);
      this.render(); api.announce && api.announce(this.msg);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/snippy-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds).map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[snippy] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.sn-root{position:relative;width:100%;max-width:min(96vw,560px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#EFEADC);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.sn-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.sn-saytext{min-width:0;overflow-wrap:break-word;}.sn-snail{font-size:clamp(18px,4.4vw,24px);flex:0 0 auto;}.sn-bounce{animation:snBounce .5s ease;}'
        + '@keyframes snBounce{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.sn-garden{position:relative;height:11px;border-radius:6px;overflow:hidden;}.sn-flower{position:absolute;right:5px;top:-3px;font-size:13px;}'
        + '.sn-head{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-width:0;}'
        + '.sn-word{font:700 clamp(13px,3.2vw,16px)/1 "Nunito",sans-serif;color:' + C.INK + ';}.sn-word .sn-letter{font:800 clamp(20px,5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.T + ';vertical-align:-2px;}'
        + '.sn-level{flex:0 0 auto;border-radius:9px;padding:3px 10px;font:800 clamp(10px,2.4vw,12px)/1 "Baloo 2",sans-serif;}'
        + '.sn-guided{background:rgba(20,107,94,.12);color:' + C.T + ';}.sn-certify{background:' + C.CORAL + ';color:#fff;}'
        + '.sn-paper{display:flex;justify-content:center;background:#fff;border-radius:12px;padding:clamp(4px,1.2vw,8px);box-shadow:inset 0 0 0 2px rgba(20,107,94,.08);}'
        + '.sn-svg{width:auto;height:auto;max-height:clamp(150px,30vh,210px);max-width:100%;aspect-ratio:1/1;display:block;touch-action:none;cursor:crosshair;}'
        + '.sn-done{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px;}.sn-flare{font-size:clamp(26px,7vw,38px);animation:snFlare .6s ease;}.sn-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '.sn-donepaper{display:flex;justify-content:center;align-items:center;background:#fff;border-radius:12px;padding:5px;box-shadow:inset 0 0 0 2px rgba(20,107,94,.08);}.sn-donesvg{width:auto;height:clamp(86px,15vh,120px);aspect-ratio:1/1;display:block;}'
        + '@media (min-width:760px){.sn-donesvg{max-height:clamp(86px,13vh,116px);}}@media (max-width:380px){.sn-donesvg{max-height:clamp(80px,17vh,110px);}}'
        + '@keyframes snFlare{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        + '@media (min-width:760px){.sn-root{padding:11px 14px;}.sn-svg{max-height:clamp(150px,26vh,200px);}}'
        + '@media (max-width:480px){.sn-root{gap:4px;padding:8px;}}'
        + '@media (max-width:380px){.sn-root{gap:3px;padding:6px;}.sn-svg{max-height:clamp(140px,40vh,190px);}.sn-garden{height:9px;}.sn-saytop{font-size:10.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.sn-bounce,.sn-flare{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-snippy', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'snippy.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
