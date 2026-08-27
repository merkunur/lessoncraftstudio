/* =====================================================================
   PENNY'S ALPHABET TRACE — ACTIVITY  (penny-alphabet-trace-activity.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.a — print upper- & lowercase letters. Penny the pencil; the child
   traces every letter A–Z + a–z in stroke order. Always-guided handwriting
   practice: the smooth dashed guide letter is shown (Catmull-Rom spline through
   the dense on-curve glyph points), with a start dot on the next stroke; the
   child drags each stroke in order; when the last stroke is formed the letter
   inks in and the shell advances. Validity DERIVED by alphabet-trace-core.js
   (strict stroke order + on-path trace). answerType:'state' + shell Check. SVG
   only — no image-library/audio dependency. No timer/score/streak. 0 lines to
   any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.AlphabetTraceCore;
  var LANG = 'en';   // #104 — set in init from api.lang
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', FAINT: 'rgba(20,107,94,.22)' };

  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: rate || 0.95 }); return; }
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

  function pencilSVG() {
    return '<svg class="pat-pen-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'es' ? 'Penny el lápiz' : LANG === 'pt' ? 'Penny, o lápis' : LANG === 'it' ? 'Penny la matita' : 'Penny the pencil') + '">' +
      '<rect x="40" y="14" width="20" height="58" rx="4" transform="rotate(18 50 40)" fill="#F4C04E"/>' +
      '<path d="M56 70 l8 16 l-18 4 z" transform="rotate(18 50 40)" fill="#E7B27F"/>' +
      '<path d="M50 84 l5 9 l-11 2 z" transform="rotate(18 50 40)" fill="#2A2A35"/>' +
      '<rect x="40" y="14" width="20" height="8" rx="2" transform="rotate(18 50 40)" fill="#E98C6A"/>' +
      '<circle cx="40" cy="22" r="5" fill="#F2A6C0"/>' +
      '</svg>';
  }

  global.PennyAlphabetTraceActivity = {
    id: 'penny-alphabet-trace-activity',

    strings: {
      title: { en: "Penny's Alphabet Trace", de: 'Pennys Buchstaben nachspuren', es: 'Traza el alfabeto con Penny', pt: 'Trace o alfabeto com a Penny', it: 'Traccia le lettere con Penny' },
      instruction: { en: 'Start on the dot and trace the letter.', de: 'Am Punkt starten und nachspuren.', es: 'Empieza en el punto y traza.', pt: 'Comece no ponto e cubra a letra.', it: 'Parti dal punto e traccia la lettera.' },
      prompt: { en: 'Start on the dot and trace the letter.', de: 'Am Punkt starten und nachspuren.', es: 'Empieza en el punto y traza.', pt: 'Comece no ponto e cubra a letra.', it: 'Parti dal punto e traccia la lettera.' },
      pennyIntro: { en: "Start on the dot and trace each stroke in order!", de: 'Starte am Punkt und spure Strich für Strich nach.', es: '¡Empieza en el punto y traza cada línea en orden!', pt: 'Comece no ponto e cubra cada traço.', it: 'Parti dal punto e traccia ogni tratto in ordine!' },
      capBadge: { en: 'CAPITAL', de: 'GROSS', es: 'MAYÚSCULA', pt: 'MAIÚSCULA', it: 'MAIUSCOLA' }, lowBadge: { en: 'lowercase', de: 'klein', es: 'minúscula', pt: 'minúscula', it: 'minuscola' },
      sayStroke: { en: 'Nice — next stroke!', de: 'Toll — der nächste Strich!', es: '¡Bien! Ahora la siguiente línea.', pt: 'Isso — agora o próximo traço!', it: 'Bene — ora il prossimo tratto!' },
      sayOff: { en: 'Follow the shape — start on the dot.', de: 'Fahr der Form nach — starte auf dem Punkt.', es: 'Sigue la forma: empieza en el punto.', pt: 'Siga o contorno da letra — comece no ponto.', it: 'Segui la forma — parti dal punto.' },
      sayWin: { en: 'Beautiful letter! ✏️', de: 'Wunderschöner Buchstabe! ✏️', es: '¡Qué bonita letra! ✏️', pt: 'Que letra linda! ✏️', it: 'Che bella lettera! ✏️' },
      hintCheck: { en: 'Trace each stroke in order, starting on the dot.', de: 'Spure jeden Strich der Reihe nach — starte auf dem Punkt.', es: 'Traza cada línea en orden, empezando en el punto.', pt: 'Cubra cada traço na ordem certa, começando no ponto.', it: 'Traccia ogni tratto in ordine, partendo dal punto.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.cs = null; this.ink = []; this.cur = null; this.dragging = false; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.solved = false; this.msg = null; this._spoke = false;
      this.cs = Core.newState(round); this.ink = []; this.cur = null; this.dragging = false;
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'pat-root'); root.setAttribute('data-solved', this.solved ? '1' : '0');
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round;

      var say = api.el('div', 'pat-saytop');
      say.innerHTML = '<span class="pat-pen' + (this.solved ? ' pat-bounce' : '') + '">' + pencilSVG() + '</span><span class="pat-saytext">' + (this.msg || api.t('pennyIntro')) + '</span>';
      root.appendChild(say);

      var head = api.el('div', 'pat-head');
      var chip = api.el('span', 'pat-letterlab'); chip.innerHTML = (LANG === 'de' ? 'Spur nach: ' : LANG === 'es' ? 'Traza: ' : LANG === 'pt' ? 'Trace: ' : LANG === 'it' ? 'Traccia: ' : 'Trace ') + '<b class="pat-letter">' + r.letter + '</b>';
      chip.setAttribute('aria-label', LANG === 'de' ? ('den ' + (r.case === 'upper' ? 'großen' : 'kleinen') + ' Buchstaben ' + r.letter + ' nachspuren') : LANG === 'es' ? ('traza la letra ' + (r.case === 'upper' ? 'mayúscula' : 'minúscula') + ' ' + r.letter) : LANG === 'pt' ? ('trace a letra ' + (r.case === 'upper' ? 'maiúscula' : 'minúscula') + ' ' + r.letter) : LANG === 'it' ? ('traccia la lettera ' + (r.case === 'upper' ? 'maiuscola' : 'minuscola') + ' ' + r.letter) : ('trace the ' + (r.case === 'upper' ? 'capital' : 'lowercase') + ' letter ' + r.letter));
      head.appendChild(chip);
      var badge = api.el('span', 'pat-badge pat-' + (r.case || 'upper')); badge.textContent = api.t(r.case === 'lower' ? 'lowBadge' : 'capBadge'); head.appendChild(badge);
      root.appendChild(head);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }
      this._renderPaper(root);
      stage.appendChild(root);
    },

    _renderPaper: function (root) {
      var self = this, api = this.api, r = this.round, g = Core.glyphOf(r.letter), done = this.cs.strokesDone;
      var wrap = api.el('div', 'pat-paper');
      var sv = svg('svg', { viewBox: '0 0 100 100', class: 'pat-svg', 'aria-label': 'trace ' + r.letter });
      sv.style.touchAction = 'none';
      /* baseline + midline writing guides */
      sv.appendChild(svg('line', { x1: 4, y1: 84, x2: 96, y2: 84, stroke: 'rgba(20,107,94,.16)', 'stroke-width': 1 }));
      sv.appendChild(svg('line', { x1: 4, y1: 50, x2: 96, y2: 50, stroke: 'rgba(20,107,94,.10)', 'stroke-width': 1, 'stroke-dasharray': '2 4' }));
      /* the guide strokes: done = solid teal; the rest = faded dashed */
      g.forEach(function (stroke, si) {
        var formed = si < done;
        sv.appendChild(svg('path', { d: splinePath(stroke), fill: 'none', stroke: formed ? C.T : C.FAINT, 'stroke-width': formed ? 8 : 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': formed ? 'none' : '1 7' }));
      });
      /* the child's committed ink + the in-progress drag */
      this.ink.forEach(function (p) { if (p && p.length > 1) sv.appendChild(svg('path', { d: p.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.T, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })); });
      if (this.cur && this.cur.length > 1) sv.appendChild(svg('path', { class: 'pat-curink', d: this.cur.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.CORAL, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
      /* the next stroke's start dot */
      if (done < g.length) { var st = g[done][0]; sv.appendChild(svg('circle', { cx: st.x, cy: st.y, r: 5.5, fill: C.CORAL, stroke: '#fff', 'stroke-width': 1.4 })); }

      wrap.appendChild(sv); root.appendChild(wrap);

      function toVB(ev) { var rect = sv.getBoundingClientRect(); return { x: ((ev.clientX - rect.left) / rect.width) * 100, y: ((ev.clientY - rect.top) / rect.height) * 100 }; }
      sv.addEventListener('pointerdown', function (ev) { ev.preventDefault(); self.dragging = true; self.cur = [toVB(ev)]; try { sv.setPointerCapture(ev.pointerId); } catch (e) {} });
      sv.addEventListener('pointermove', function (ev) { if (!self.dragging) return; self.cur.push(toVB(ev)); self._paintCur(sv); });
      sv.addEventListener('pointerup', function (ev) { if (!self.dragging) return; self.dragging = false; var path = self.cur || []; self.cur = null; self._traceStroke(path); });
      sv.addEventListener('pointercancel', function () { self.dragging = false; self.cur = null; });
    },

    _paintCur: function (sv) {
      var old = sv.querySelector('.pat-curink'); if (old) old.parentNode.removeChild(old);
      if (this.cur && this.cur.length > 1) sv.appendChild(svg('path', { class: 'pat-curink', d: this.cur.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.CORAL, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    },

    _renderDone: function (root) {
      var api = this.api, d = api.el('div', 'pat-done');
      if (this.ink && this.ink.length) {
        var paper = api.el('div', 'pat-donepaper');
        var sv = svg('svg', { viewBox: '0 0 100 100', class: 'pat-donesvg', 'aria-label': 'the letter you formed: ' + this.round.letter });
        this.ink.forEach(function (p) { if (p && p.length > 1) sv.appendChild(svg('path', { d: p.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '), fill: 'none', stroke: C.T, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })); });
        paper.appendChild(sv); d.appendChild(paper);
      }
      var fl = api.el('span', 'pat-flare'); fl.textContent = '✏️'; d.appendChild(fl);
      var t = api.el('span', 'pat-donetext'); t.textContent = this.msg || api.t('sayWin'); d.appendChild(t);
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
      setTimeout(function () { speak(LANG === 'de' ? 'Wunderschön!' : LANG === 'es' ? '¡Hermosa!' : LANG === 'pt' ? 'Que linda!' : LANG === 'it' ? 'Bellissima!' : 'Beautiful!'); }, 150);
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
      fetch('/mini-tools/penny-alphabet-trace-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[penny-alphabet-trace] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pat-root{position:relative;width:100%;max-width:min(96vw,560px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(5px,1.2vw,9px);background:linear-gradient(180deg,#FBF3E4,#EFEADC);border-radius:16px;padding:clamp(7px,1.6vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.pat-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.pat-saytext{min-width:0;overflow-wrap:break-word;}.pat-pen{width:clamp(22px,5vw,28px);flex:0 0 auto;display:block;}.pat-pen-svg{width:100%;height:auto;display:block;}.pat-bounce{animation:patB .5s ease;}'
        + '@keyframes patB{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.pat-head{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-width:0;}'
        + '.pat-letterlab{font:700 clamp(13px,3.2vw,16px)/1 "Nunito",sans-serif;color:' + C.INK + ';}.pat-letterlab .pat-letter{font:800 clamp(22px,5.4vw,28px)/1 "Baloo 2",sans-serif;color:' + C.T + ';vertical-align:-2px;}'
        + '.pat-badge{flex:0 0 auto;border-radius:9px;padding:3px 11px;font:800 clamp(10px,2.4vw,12px)/1 "Baloo 2",sans-serif;}'
        + '.pat-upper{background:rgba(20,107,94,.12);color:' + C.T + ';}.pat-lower{background:' + C.CORAL + ';color:#fff;}'
        + '.pat-paper{display:flex;justify-content:center;background:#fff;border-radius:12px;padding:clamp(4px,1.2vw,8px);box-shadow:inset 0 0 0 2px rgba(20,107,94,.08);}'
        + '.pat-svg{width:auto;height:auto;max-height:clamp(160px,32vh,230px);max-width:100%;aspect-ratio:1/1;display:block;touch-action:none;cursor:crosshair;}'
        + '.pat-done{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px;}.pat-flare{font-size:clamp(26px,7vw,38px);animation:patF .6s ease;}.pat-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '.pat-donepaper{display:flex;justify-content:center;align-items:center;background:#fff;border-radius:12px;padding:5px;box-shadow:inset 0 0 0 2px rgba(20,107,94,.08);}.pat-donesvg{width:auto;height:clamp(92px,16vh,124px);aspect-ratio:1/1;display:block;}'
        + '@keyframes patF{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        + '@media (min-width:760px){.pat-root{padding:11px 14px;}.pat-svg{max-height:clamp(160px,28vh,210px);}}'
        + '@media (max-width:380px){.pat-root{gap:4px;padding:6px;}.pat-svg{max-height:clamp(150px,42vh,200px);}.pat-saytop{font-size:10.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.pat-bounce,.pat-flare{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-penny-alphabet-trace', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'penny-alphabet-trace.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
