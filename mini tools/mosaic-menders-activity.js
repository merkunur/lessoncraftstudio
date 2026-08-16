/* =====================================================================
   THE MOSAIC MENDERS — ACTIVITY   (mosaic-menders-activity.js)
   ---------------------------------------------------------------------
   CCSS 3.MD.C.5/6 — AREA as a count of unit squares. Tessa needs a mosaic
   made of N unit tiles; the child taps the candidate mosaic with the SAME
   tile-count (AREA) as the target, among 3 (match + 2 decoys: one with a
   BIGGER bounding box but the wrong count, one with MORE tiles). So "pick
   the biggest / fullest" misfires; only COUNTING tiles (area invariant
   under shape) discriminates.

   COGNITION reused from mini tools/mosaic-menders-core.js
   (window.MosaicMendersCore: SHAPES masks, area, bboxArea, matches,
   candidates). Answer DERIVED via matches(target,candidate) — no stored
   index. Full lcs-shell tool (MosaicMendersCore is pure functions).

   VISUAL ARCHITECTURE (locked up front):
     • ONE shared tile size per round — all 3 candidate card SVGs share an
       identical viewBox (maxCols*U × maxRows*U) at width:100%, so on-screen
       tile size is identical across cards; each mosaic centres its REAL
       bbox → a smaller mosaic genuinely looks smaller → the bbox-decoy
       SURVIVES (per-card normalization would collapse the cognition).
     • full-width SHORT stacked candidate cards (the Echo-Grove rail
       pattern) so even a 1×10 bar renders countable across the width.
     • a pale "bed" plate hugs each mosaic's bbox (no sparse dead space).
     • tiles = rounded teal squares, thin gap, alt tone, soft shadow.
     • Tessa = SVG character PLACEHOLDER via the _setPose CA5 seam.

   0 lines to the 6 protected cores + lcs-shell.{js,css}. answerType:'state'.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MosaicMendersCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', BODY: '#E2F0EC', BED: '#E8F2EE',
    CORAL: '#F2784B', INK: '#2A2A35', RIM: '#FFFFFF', GOOD: '#2FA56A', CARD: '#FBF3E4'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function rng(seed) {
    var s = seed | 0;
    return function () { s = (s + 0x6D2B79F5) | 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function shuffleSeeded(arr, seed) { var rand = rng(seed), a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }

  function maskDims(name) {
    var rows = Core.mask(name), cols = 0;
    for (var r = 0; r < rows.length; r++) if (rows[r].length > cols) cols = rows[r].length;
    return { rows: rows.length, cols: cols };
  }

  /* ---- Tessa the tile-mason — SVG PLACEHOLDER (CA5 sprite swaps in via _setPose) ---- */
  function tessaSVG() {
    return '<svg class="mm-tessa-svg" viewBox="0 0 120 120" role="img" aria-label="Tessa">' +
      '<path d="M26 60 C26 32 94 32 94 60 C94 88 79 100 60 100 C41 100 26 88 26 60 Z" fill="' + C.T + '"/>' +
      '<ellipse cx="44" cy="46" rx="10" ry="7" fill="' + C.RIM + '" opacity="0.3"/>' +
      '<path d="M60 54 Q46 58 46 74 Q46 90 60 93 Q74 90 74 74 Q74 58 60 54 Z" fill="' + C.BODY + '" opacity="0.5"/>' +
      /* little builder cap brim */
      '<path d="M30 44 Q60 26 90 44 L90 49 Q60 35 30 49 Z" fill="' + C.CORAL + '"/>' +
      '<ellipse class="mm-cheek" cx="40" cy="68" rx="5.5" ry="3.4" fill="' + C.CORAL + '" opacity="0.5"/>' +
      '<ellipse class="mm-cheek" cx="80" cy="68" rx="5.5" ry="3.4" fill="' + C.CORAL + '" opacity="0.5"/>' +
      /* eyes — open (idle) */
      '<g class="mm-eyes-open">' +
        '<circle cx="51" cy="58" r="5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.2"/>' +
        '<circle cx="69" cy="58" r="5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.2"/>' +
        '<circle cx="52" cy="59" r="2.6" fill="' + C.INK + '"/><circle cx="70" cy="59" r="2.6" fill="' + C.INK + '"/>' +
      '</g>' +
      /* eyes — look (down toward the mosaics) */
      '<g class="mm-eyes-look">' +
        '<circle cx="51" cy="58" r="5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.2"/>' +
        '<circle cx="69" cy="58" r="5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.2"/>' +
        '<circle cx="52" cy="61" r="2.6" fill="' + C.INK + '"/><circle cx="70" cy="61" r="2.6" fill="' + C.INK + '"/>' +
      '</g>' +
      /* eyes — happy (^ ^) */
      '<g class="mm-eyes-happy">' +
        '<path d="M46 59 Q51 53 56 59" stroke="' + C.INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M64 59 Q69 53 74 59" stroke="' + C.INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '<path d="M55 70 Q60 74 65 70" stroke="' + C.INK + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* ---- render ONE mosaic from a shape mask, at a shared unit size U, into a
     fixed VBW×VBH viewBox, centred on its real bbox (so smaller mosaics look
     smaller — the bbox-decoy survives). Returns the inner SVG markup. ---- */
  function mosaicSVG(name, U, VBW, VBH) {
    var rows = Core.mask(name), d = maskDims(name);
    var gap = U * 0.10, tile = U - gap, rx = tile * 0.20;
    var mw = d.cols * U, mh = d.rows * U;
    var ox = (VBW - mw) / 2, oy = (VBH - mh) / 2;
    var parts = '';
    /* bed plate hugging the bbox (no sparse dead space + relative-size cue) */
    parts += '<rect x="' + (ox - U * 0.18).toFixed(1) + '" y="' + (oy - U * 0.18).toFixed(1) +
      '" width="' + (mw + U * 0.36).toFixed(1) + '" height="' + (mh + U * 0.36).toFixed(1) +
      '" rx="' + (U * 0.22).toFixed(1) + '" fill="' + C.BED + '" filter="url(#mmShadow)"/>';
    var idx = 0;
    for (var r = 0; r < rows.length; r++) {
      for (var c = 0; c < rows[r].length; c++) {
        if (rows[r][c] !== '1') continue;
        var x = ox + c * U + gap / 2, y = oy + r * U + gap / 2;
        var fill = ((r + c) % 2 === 0) ? C.T : C.T2;
        parts += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + tile.toFixed(1) + '" height="' + tile.toFixed(1) +
          '" rx="' + rx.toFixed(1) + '" fill="' + fill + '" stroke="' + C.RIM + '" stroke-width="' + (tile * 0.05).toFixed(2) + '" stroke-opacity="0.5"/>';
        idx++;
      }
    }
    return parts;
  }

  global.MosaicMendersActivity = {
    id: 'mosaic-menders-activity',

    strings: {
      title:       { en: 'The Mosaic Menders', de: 'Tessas Mosaik-Werkstatt', fr: 'L’atelier de mosaïque de Tessa', es: 'El taller de mosaicos de Tessa', pt: 'O ateliê de mosaicos da Tessa' },
      instruction: { en: 'Help Tessa: tap the mosaic that uses the same number of tiles. Tap Check when ready.', de: 'Hilf Tessa: Tippe auf das Mosaik, das gleich viele Plättchen hat. Tippe auf „Prüfen“, wenn du fertig bist.', fr: 'Aide Tessa : touche la mosaïque qui a le même nombre de carreaux. Touche Vérifier quand tu as choisi.', es: 'Ayuda a Tessa: toca el mosaico que usa la misma cantidad de cuadritos. Toca Comprobar cuando estés listo.', pt: 'Ajude a Tessa: toque no mosaico que usa a mesma quantidade de quadradinhos. Toque em Verificar quando terminar.' },
      prompt:      { en: 'Tap the mosaic that uses {n} tiles.', de: 'Tippe auf das Mosaik mit {n} Plättchen.', fr: 'Touche la mosaïque qui a {n} carreaux.', es: 'Toca el mosaico que usa {n} cuadritos.', pt: 'Toque no mosaico que usa {n} quadradinhos.' },
      hintPickOne: { en: 'Tap one of the mosaics first.', de: 'Tippe zuerst auf eines der Mosaike.', fr: 'Touche d’abord une mosaïque.', es: 'Primero toca uno de los mosaicos.', pt: 'Toque em um dos mosaicos primeiro.' },
      hintCount:   { en: 'Not that one — count the tiles, not the size.', de: 'Nicht dieses — zähle die Plättchen, nicht die Größe.', fr: 'Pas celle-ci — compte les carreaux, pas la taille.', es: 'Ese no — cuenta los cuadritos, no el tamaño.', pt: 'Esse não — conte os quadradinhos, não vá pelo tamanho.' },
      targetLabel: { en: '{n} tiles', de: '{n} Plättchen', fr: '{n} carreaux', es: '{n} cuadritos', pt: '{n} quadradinhos' },
      srTarget:    { en: 'Tessa needs a mosaic with {n} tiles.', de: 'Tessa braucht ein Mosaik mit {n} Plättchen.', fr: 'Tessa a besoin d’une mosaïque de {n} carreaux.', es: 'Tessa necesita un mosaico con {n} cuadritos.', pt: 'A Tessa precisa de um mosaico com {n} quadradinhos.' },
      srCand:      { en: 'a mosaic with {n} tiles', de: 'ein Mosaik mit {n} Plättchen', fr: 'une mosaïque de {n} carreaux', es: 'un mosaico con {n} cuadritos', pt: 'um mosaico com {n} quadradinhos' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      this.target = 'r2x3'; this.cands = []; this.seed = 1;
      this.picked = null; this.readOnly = false; this._heartsSpawned = false;
      this._pool = STATIC_DEMO_TASKS; this._order = null; this._curPass = 0; this._orderForPool = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round;
      this.target = round.target;
      this.cands = shuffleSeeded(Core.candidates(round), round.seed || 1);
      this.picked = null; this.readOnly = false; this._heartsSpawned = false;
    },

    targetArea: function () { return Core.area(this.target); },

    render: function () {
      this.injectCSS();
      var api = this.api, self = this;
      var stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'mm-wrap');
      var defs = '<defs><filter id="mmShadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.8"/></filter></defs>';

      /* header strip: Tessa + target panel (mosaic + N badge) */
      var strip = api.el('div', 'mm-strip');
      var tessa = api.el('div', 'mm-tessa'); tessa.setAttribute('data-pose', 'idle'); tessa.innerHTML = tessaSVG();
      this._tessaEl = tessa;
      var n = this.targetArea();
      var tpanel = api.el('div', 'mm-target');
      tpanel.setAttribute('role', 'img');
      tpanel.setAttribute('aria-label', interp(api.t('srTarget'), { n: n }));
      var td = maskDims(this.target);
      var tU = 18, tVBW = td.cols * tU, tVBH = td.rows * tU;
      tpanel.innerHTML =
        '<svg class="mm-target-svg" viewBox="0 0 ' + tVBW + ' ' + tVBH + '" aria-hidden="true">' + defs + mosaicSVG(this.target, tU, tVBW, tVBH) + '</svg>' +
        '<span class="mm-target-badge">' + esc(interp(api.t('targetLabel'), { n: n })) + '</span>';
      strip.append(tessa, tpanel);
      wrap.appendChild(strip);

      /* CONTENT-SIZED cards: each card hugs its OWN mosaic at a SHARED tile
         unit (--mm-tu). Identical on-screen tile size across cards keeps the
         bbox-decoy honest + the tiles countable; a bigger-bbox mosaic genuinely
         makes a bigger card — and that size is the decoy to IGNORE, never the
         answer, so it is no salience leak. Different-sized cards mean NO sparse
         dead space; flex-wrap centres them (a short row of 3 on desktop,
         wrapping to bigger cards on a phone). */
      var U = 100, PAD2 = 0.6;                       // 0.3U margin each side (bed + shadow room)
      var choices = api.el('div', 'mm-choices');
      this._cardEls = [];
      this.cands.forEach(function (name, i) {
        var d = maskDims(name);
        var VBW = (d.cols + PAD2) * U, VBH = (d.rows + PAD2) * U;
        var btn = api.el('button', 'mm-cand'); btn.type = 'button';
        btn.setAttribute('aria-label', interp(api.t('srCand'), { n: Core.area(name) }));
        btn.style.setProperty('--mm-c', (d.cols + PAD2).toFixed(2));   // card width = (cols+pad) × --mm-tu
        btn.innerHTML = '<svg class="mm-card-svg" viewBox="0 0 ' + VBW + ' ' + VBH + '" aria-hidden="true">' + defs + mosaicSVG(name, U, VBW, VBH) + '</svg>' +
          '<span class="mm-check" aria-hidden="true">' + CHECK_SVG + '</span>';
        btn.addEventListener('click', function () { self._pick(i); });
        choices.appendChild(btn);
        self._cardEls.push(btn);
      });
      wrap.appendChild(choices);
      stage.appendChild(wrap);
      this.paint();
    },

    _pick: function (i) {
      if (this.readOnly) return;
      this.picked = i;
      if (this.api && this.api.sound) this.api.sound(660);
      this.paint();
    },

    paint: function () {
      if (!this._cardEls) return;
      var self = this;
      this._cardEls.forEach(function (btn, i) {
        var correct = Core.matches(self.target, self.cands[i]);
        btn.classList.toggle('is-picked', !self.readOnly && self.picked === i);
        btn.classList.toggle('is-correct', self.readOnly && correct);
        btn.classList.toggle('is-dim', self.readOnly && !correct);
        if (self.readOnly) { btn.setAttribute('aria-disabled', 'true'); btn.tabIndex = -1; }
        else { btn.removeAttribute('aria-disabled'); btn.removeAttribute('tabindex'); }
        btn.setAttribute('aria-pressed', String(self.picked === i));
      });
      this._setPose(this.readOnly ? 'happy' : 'idle');
      if (this.readOnly && !this._heartsSpawned) { this._heartsSpawned = true; this._spawnHearts(); }
    },

    /* THE CHARACTER SEAM — SVG placeholder via [data-pose]; CA5 sprite swaps
       in here later (docs/character-art-spec.md). Poses: idle | look | happy. */
    _setPose: function (name) {
      if (this._tessaEl) this._tessaEl.setAttribute('data-pose', name);
      /* future: LCSSprite.play(this._tessaEl, name, { loop: name==='idle' }); */
    },
    nudge: function () { this._setPose('look'); },

    isCorrect: function () {
      return this.picked != null && Core.matches(this.target, this.cands[this.picked]);
    },

    reset: function () { this.picked = null; this.readOnly = false; this._heartsSpawned = false; this.render(); },

    _spawnHearts: function () {
      if (!this._tessaEl) return;
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var layer = document.createElement('div'); layer.className = 'mm-hearts';
      for (var i = 0; i < 4; i++) {
        var s = document.createElement('span'); s.className = 'mm-heart';
        s.style.left = (18 + i * 16) + '%'; s.style.animationDelay = (i * 70) + 'ms';
        s.innerHTML = '<svg viewBox="0 0 100 100" width="16" height="16" aria-hidden="true"><path d="M50 84C20 62 12 44 12 32a20 20 0 0 1 38-8 20 20 0 0 1 38 8c0 12-8 30-38 52z" fill="' + (i % 2 ? C.T : C.CORAL) + '"/></svg>';
        layer.appendChild(s);
      }
      this._tessaEl.appendChild(layer);
      setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 1300);
    },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : STATIC_DEMO_TASKS;
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = shuffledOrder(n, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = shuffledOrder(n, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/mosaic-menders-activities.json').then(function (r) {
        if (!r.ok) throw new Error('manifest fetch failed: ' + r.status); return r.json();
      }).then(function (rows) {
        var row = rows.find(function (r) { return r.id === self._activityId; });
        if (!row) return;
        self._activityRow = row;
        self._pool = self._buildTasksFromRow(row);
        self._order = null;
        if (typeof global.LCS_reloadFirstTask === 'function') { global.LCS_reloadFirstTask(); }
      }).catch(function (e) { if (global.console && console.warn) console.warn('[mosaic-menders] manifest load failed; using fallback:', e.message); });
    },

    _buildTasksFromRow: function (row) {
      if (row.task_template === 'area-match') {
        var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
        if (global.console && console.warn) {
          rounds.forEach(function (r, ri) {
            if (!Core.SHAPES[r.target] || !Core.SHAPES[r.match]) console.warn('[mosaic-menders] round ' + ri + ' unknown target/match');
          });
        }
        return makeAreaTasks(rounds, row.id);
      }
      return STATIC_DEMO_TASKS;
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.mm-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);width:100%;max-width:min(96vw,720px);margin:0 auto;}'
        + '.mm-strip{display:flex;align-items:center;justify-content:center;gap:clamp(8px,3vw,16px);flex-wrap:nowrap;}'
        + '.mm-tessa{position:relative;width:clamp(48px,13vw,64px);flex:0 0 auto;}'
        + '.mm-tessa-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.mm-target{display:flex;flex-direction:column;align-items:center;gap:2px;background:var(--lcs-card,#FBF3E4);border:3px solid ' + C.T + ';border-radius:14px;padding:clamp(3px,1.2vw,7px) clamp(9px,2.6vw,15px);box-shadow:0 3px 0 rgba(20,107,94,.18);}'
        + '.mm-target-svg{width:clamp(40px,13vw,72px);height:auto;display:block;max-height:46px;}'
        + '.mm-target-badge{font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:700;font-size:clamp(13px,3.6vw,17px);color:' + C.CORAL + ';line-height:1;}'
        /* full-width SHORT stacked candidate cards */
        + '.mm-choices{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:clamp(6px,2vw,12px);width:100%;max-width:min(96vw,720px);margin:0 auto;--mm-tu:clamp(18px,4.6vw,26px);}'
        + '.mm-cand{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;background:var(--lcs-card,#FBF3E4);border:2.5px solid rgba(20,107,94,.22);border-radius:16px;padding:clamp(4px,1.2vw,8px);cursor:pointer;min-width:44px;min-height:44px;transition:transform .1s,border-color .15s,box-shadow .15s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}'
        + '.mm-cand:active{transform:scale(.99);}'
        + '.mm-cand:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.mm-cand.is-picked{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.25);}'
        + '.mm-cand.is-correct{border-color:' + C.GOOD + ';background:#EAF7EF;}'
        + '.mm-cand.is-dim{opacity:.4;}'
        + '.mm-card-svg{width:calc(var(--mm-c,3) * var(--mm-tu,24px));height:auto;display:block;}'
        + '.mm-check{position:absolute;top:6px;right:8px;width:clamp(22px,6vw,28px);opacity:0;transform:scale(.5);transition:opacity .2s,transform .2s var(--lcs-ease,ease);}'
        + '.mm-cand.is-correct .mm-check{opacity:1;transform:scale(1);}'
        /* Tessa pose variants */
        + '.mm-eyes-look,.mm-eyes-happy{display:none;}'
        + '.mm-tessa[data-pose="look"] .mm-eyes-open{display:none;} .mm-tessa[data-pose="look"] .mm-eyes-look{display:inline;}'
        + '.mm-tessa[data-pose="happy"] .mm-eyes-open{display:none;} .mm-tessa[data-pose="happy"] .mm-eyes-happy{display:inline;}'
        + '.mm-cheek{transition:opacity .2s;} .mm-tessa[data-pose="happy"] .mm-cheek{opacity:.8;}'
        + '.mm-hearts{position:absolute;inset:0;pointer-events:none;overflow:visible;}'
        + '.mm-heart{position:absolute;top:6%;animation:mmHeart 1.2s var(--lcs-ease,ease) forwards;opacity:0;}'
        + '@keyframes mmHeart{0%{opacity:0;transform:translateY(0) scale(.6);}25%{opacity:1;}100%{opacity:0;transform:translateY(-42px) scale(1);}}'
        + '@media (prefers-reduced-motion: reduce){.mm-heart{display:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-mosaic-menders', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  var CHECK_SVG = '<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="' + C.GOOD + '"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---- tasks (manifest rounds → shell tasks) ---- */
  function makeAreaTasks(rounds, idPrefix) {
    return rounds.map(function (r, i) {
      return {
        id: idPrefix + '.round-' + i,
        promptKey: 'prompt',
        promptArgs: { n: Core.area(r.target) },
        answerType: 'state',
        setup: function (tool) { tool.setupTask(r); },
        check: function (tool) {
          var ok = tool.isCorrect();
          if (ok) { tool.readOnly = true; tool.paint(); }
          else if (tool.picked != null) { tool.nudge(); }
          return ok;
        },
        hintKey: function (tool) { return (tool.picked == null) ? 'hintPickOne' : 'hintCount'; }
      };
    });
  }

  /* canonical 8-round pool (§A.13.60 ≥7); each = target + match + 2 decoys
     (one bigger-bbox, one more-tiles). Seeds for the per-round position shuffle. */
  var DEMO_ROUNDS = Core.ROUNDS.map(function (r, i) {
    return { target: r.target, match: r.match, decoys: r.decoys, seed: 11 + i * 12 };
  });
  var STATIC_DEMO_TASKS = makeAreaTasks(DEMO_ROUNDS, 'demo');

  function _sameOrder(a, b) { if (!b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function shuffledOrder(n, prev) {
    var idx = [], i, j, t; for (i = 0; i < n; i++) idx.push(i);
    if (n < 2) return idx;
    do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (_sameOrder(idx, prev));
    return idx;
  }

}(typeof window !== 'undefined' ? window : this));
