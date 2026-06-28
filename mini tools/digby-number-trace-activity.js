/* =====================================================================
   DIGBY'S NUMBER TRACE — ACTIVITY  (digby-number-trace-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.3 — write numerals 0–9. Digby the dog; the child traces every
   number 0–9 in stroke order. Always-guided handwriting practice: the smooth
   dashed guide numeral is shown (Catmull-Rom spline through the dense on-curve
   points reused from numeral-trace-core), with a start dot on the next stroke;
   the child drags each stroke in order; when the last stroke is formed the
   numeral inks in and the shell advances. Validity DERIVED by number-trace-core.js
   (strict stroke order + on-path trace). answerType:'state' + shell Check. SVG
   only — no image-library/audio dependency. No timer/score/streak. 0 lines to any
   core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.NumberTraceCore;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', FAINT: 'rgba(20,107,94,.22)' };

  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  /* Catmull-Rom → cubic-Bézier spline that PASSES THROUGH every point. <3 → line. */
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

  function dogSVG() {
    return '<svg class="dnt-dog-svg" viewBox="0 0 100 100" role="img" aria-label="Digby the dog">' +
      '<ellipse cx="50" cy="58" rx="22" ry="20" fill="#C79B6E"/>' +                /* head */
      '<path d="M30 40 q-10 -4 -8 16 q8 6 14 -2z" fill="#A77B4E"/>' +              /* left ear */
      '<path d="M70 40 q10 -4 8 16 q-8 6 -14 -2z" fill="#A77B4E"/>' +             /* right ear */
      '<circle cx="42" cy="54" r="2.6" fill="#2A2A35"/><circle cx="58" cy="54" r="2.6" fill="#2A2A35"/>' +
      '<ellipse cx="50" cy="64" rx="6" ry="4.5" fill="#E9D7BE"/>' +               /* muzzle */
      '<ellipse cx="50" cy="62" rx="3" ry="2.4" fill="#2A2A35"/>' +               /* nose */
      '<path d="M50 65 v5 M50 70 q-5 3 -9 1 M50 70 q5 3 9 1" stroke="#7A5638" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.DigbyNumberTraceActivity = {
    id: 'digby-number-trace-activity',

    strings: {
      title: { en: "Digby's Number Trace" },
      instruction: { en: 'Start on the dot and trace the number.' },
      prompt: { en: 'Start on the dot and trace the number.' },
      digbyIntro: { en: "Start on the dot and trace each stroke in order!" },
      sayStroke: { en: 'Nice — next stroke!' },
      sayOff: { en: 'Follow the shape — start on the dot.' },
      sayWin: { en: 'Great number! ✏️' },
      hintCheck: { en: 'Trace each stroke in order, starting on the dot.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.cs = null; this.ink = []; this.cur = null; this.dragging = false; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.solved = false; this.msg = null;
      this.cs = Core.newState(round); this.ink = []; this.cur = null; this.dragging = false;
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'dnt-root'); root.setAttribute('data-solved', this.solved ? '1' : '0');
      if (!this.round) { stage.appendChild(root); return; }
      var r = this.round;

      var say = api.el('div', 'dnt-saytop');
      say.innerHTML = '<span class="dnt-dog' + (this.solved ? ' dnt-bounce' : '') + '">' + dogSVG() + '</span><span class="dnt-saytext">' + (this.msg || api.t('digbyIntro')) + '</span>';
      root.appendChild(say);

      var head = api.el('div', 'dnt-head');
      var chip = api.el('span', 'dnt-numlab'); chip.innerHTML = 'Trace <b class="dnt-num">' + String(r.digit) + '</b>';
      chip.setAttribute('aria-label', 'trace the number ' + r.digit);
      head.appendChild(chip);
      root.appendChild(head);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }
      this._renderPaper(root);
      stage.appendChild(root);
    },

    _renderPaper: function (root) {
      var self = this, api = this.api, r = this.round, g = Core.glyphOf(r.digit), done = this.cs.strokesDone;
      var wrap = api.el('div', 'dnt-paper');
      var sv = svg('svg', { viewBox: '0 0 100 100', class: 'dnt-svg', 'aria-label': 'trace ' + r.digit });
      sv.style.touchAction = 'none';
      sv.appendChild(svg('line', { x1: 4, y1: 86, x2: 96, y2: 86, stroke: 'rgba(20,107,94,.16)', 'stroke-width': 1 }));
      sv.appendChild(svg('line', { x1: 4, y1: 14, x2: 96, y2: 14, stroke: 'rgba(20,107,94,.10)', 'stroke-width': 1, 'stroke-dasharray': '2 4' }));
      g.forEach(function (stroke, si) {
        var formed = si < done;
        sv.appendChild(svg('path', { d: splinePath(stroke), fill: 'none', stroke: formed ? C.T : C.FAINT, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': formed ? 'none' : '1 7' }));
      });
      this.ink.forEach(function (p) { if (p && p.length > 1) sv.appendChild(svg('path', { d: p.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.T, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })); });
      if (this.cur && this.cur.length > 1) sv.appendChild(svg('path', { class: 'dnt-curink', d: this.cur.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.CORAL, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
      if (done < g.length) { var st = g[done][0]; sv.appendChild(svg('circle', { cx: st.x, cy: st.y, r: 5.5, fill: C.CORAL, stroke: '#fff', 'stroke-width': 1.4 })); }

      wrap.appendChild(sv); root.appendChild(wrap);

      function toVB(ev) { var rect = sv.getBoundingClientRect(); return { x: ((ev.clientX - rect.left) / rect.width) * 100, y: ((ev.clientY - rect.top) / rect.height) * 100 }; }
      sv.addEventListener('pointerdown', function (ev) { ev.preventDefault(); self.dragging = true; self.cur = [toVB(ev)]; try { sv.setPointerCapture(ev.pointerId); } catch (e) {} });
      sv.addEventListener('pointermove', function (ev) { if (!self.dragging) return; self.cur.push(toVB(ev)); self._paintCur(sv); });
      sv.addEventListener('pointerup', function (ev) { if (!self.dragging) return; self.dragging = false; var path = self.cur || []; self.cur = null; self._traceStroke(path); });
      sv.addEventListener('pointercancel', function () { self.dragging = false; self.cur = null; });
    },

    _paintCur: function (sv) {
      var old = sv.querySelector('.dnt-curink'); if (old) old.parentNode.removeChild(old);
      if (this.cur && this.cur.length > 1) sv.appendChild(svg('path', { class: 'dnt-curink', d: this.cur.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.CORAL, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    },

    _renderDone: function (root) {
      var api = this.api, d = api.el('div', 'dnt-done');
      if (this.ink && this.ink.length) {
        var paper = api.el('div', 'dnt-donepaper');
        var sv = svg('svg', { viewBox: '0 0 100 100', class: 'dnt-donesvg', 'aria-label': 'the number you wrote: ' + this.round.digit });
        this.ink.forEach(function (p) { if (p && p.length > 1) sv.appendChild(svg('path', { d: p.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.T, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })); });
        paper.appendChild(sv); d.appendChild(paper);
      }
      var fl = api.el('span', 'dnt-flare'); fl.textContent = '✏️'; d.appendChild(fl);
      var t = api.el('span', 'dnt-donetext'); t.textContent = this.msg || api.t('sayWin'); d.appendChild(t);
      root.appendChild(d);
    },

    _traceStroke: function (path) {
      var api = this.api;
      if (!path || path.length < 2) { this.render(); return; }
      var res = Core.attemptStroke(this.cs, this.cs.strokesDone, path);
      if (res === 'stroke-ok' || res === 'formed') {
        this.ink.push(path.slice()); api.sound && api.sound(600 + this.cs.strokesDone * 30);
        if (res === 'formed') { this._correct(); return; }
        this.msg = api.t('sayStroke'); this.render(); return;
      }
      this.msg = api.t('sayOff'); api.sound && api.sound(380); this.render();
    },

    _correct: function () {
      var api = this.api; this.solved = true; this.msg = api.t('sayWin'); api.sound && api.sound(880);
      setTimeout(function () { speak('Great!'); }, 150);
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
      fetch('/mini-tools/digby-number-trace-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[digby-number-trace] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.dnt-root{position:relative;width:100%;max-width:min(96vw,560px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(5px,1.2vw,9px);background:linear-gradient(180deg,#FBF3E4,#EFEADC);border-radius:16px;padding:clamp(7px,1.6vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.dnt-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.dnt-saytext{min-width:0;overflow-wrap:break-word;}.dnt-dog{width:clamp(22px,5vw,28px);flex:0 0 auto;display:block;}.dnt-dog-svg{width:100%;height:auto;display:block;}.dnt-bounce{animation:dntB .5s ease;}'
        + '@keyframes dntB{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.dnt-head{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-width:0;}'
        + '.dnt-numlab{font:700 clamp(13px,3.2vw,16px)/1 "Nunito",sans-serif;color:' + C.INK + ';}.dnt-numlab .dnt-num{font:800 clamp(22px,5.4vw,28px)/1 "Baloo 2",sans-serif;color:' + C.T + ';vertical-align:-2px;}'
        + '.dnt-paper{display:flex;justify-content:center;background:#fff;border-radius:12px;padding:clamp(4px,1.2vw,8px);box-shadow:inset 0 0 0 2px rgba(20,107,94,.08);}'
        + '.dnt-svg{width:auto;height:auto;max-height:clamp(160px,32vh,230px);max-width:100%;aspect-ratio:1/1;display:block;touch-action:none;cursor:crosshair;}'
        + '.dnt-done{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px;}.dnt-flare{font-size:clamp(26px,7vw,38px);animation:dntF .6s ease;}.dnt-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '.dnt-donepaper{display:flex;justify-content:center;align-items:center;background:#fff;border-radius:12px;padding:5px;box-shadow:inset 0 0 0 2px rgba(20,107,94,.08);}.dnt-donesvg{width:auto;height:clamp(92px,16vh,124px);aspect-ratio:1/1;display:block;}'
        + '@keyframes dntF{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        + '@media (min-width:760px){.dnt-root{padding:11px 14px;}.dnt-svg{max-height:clamp(160px,28vh,210px);}}'
        + '@media (max-width:380px){.dnt-root{gap:4px;padding:6px;}.dnt-svg{max-height:clamp(150px,42vh,200px);}.dnt-saytop{font-size:10.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.dnt-bounce,.dnt-flare{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-digby-number-trace', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'digby-number-trace.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
