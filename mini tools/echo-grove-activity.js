/* =====================================================================
   THE ECHO GROVE — ACTIVITY   (echo-grove-activity.js)
   ---------------------------------------------------------------------
   CCSS 3.OA.A.1 — interpret a product "g × s" as g GROUPS of s. Pim the
   owl shows a rune (g × s); the child taps the grove (candidate) that is
   g groups of s, among decoys that ALL share the total — including the
   COMMUTATIVE TWIN (s groups of g, same total, different grouping). Only
   reading the symbol AS structure discriminates; the total carries zero
   signal.

   COGNITION reused from mini tools/echo-grove-core.js (window.EchoGroveCore:
   sameTotalDecoys [twin-first], matches, candidates) — answer DERIVED via
   matches(), never a stored index. This wrapper is a full lcs-shell tool
   (it does NOT Object.assign a core — EchoGroveCore is pure functions).

   ASSET STRATEGY (dual-asset doctrine):
     • PROPS — the countable fruit are REAL library images
       (/image-library-webp/themes/<theme>/<noun>@2x.webp), a different
       fruit per round (§A.13.60 distinctness).
     • CHARACTER — Pim is a hand-drawn SVG PLACEHOLDER driven by _setPose();
       the operator's CA5 sprite swaps in later (docs/character-art-spec.md).
     • FURNITURE — the baskets (group containers) are hand-drawn SVG.

   0 lines to the 6 protected cores + lcs-shell.{js,css}. answerType:'state'
   (the candidate cards are the answer surface; Check grades via matches()).

   NUMBER BAND (locked ≤12): factors 2..6, product ≤12, ≥2 same-total
   candidates — so no card exceeds ~6 baskets and the 3 candidates stay
   countable + twin-proof at 280px (the ensemble's load-bearing finding).
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.EchoGroveCore;

  var LANG = 'en';
  /* German fruit plurals for the aria cardLabel ("{s} {fruit}", e.g. "3 Kirschen");
     factors are 2..5 so the singular never fires. Image keys stay English. */
  var FRUIT_DE = {
    cherry: 'Kirschen', strawberry: 'Erdbeeren', apple: 'Äpfel', lemon: 'Zitronen',
    pear: 'Birnen', banana: 'Bananen', orange: 'Orangen', plum: 'Pflaumen'
  };
  var FRUIT_FR = {
    cherry: 'cerises', strawberry: 'fraises', apple: 'pommes', lemon: 'citrons',
    pear: 'poires', banana: 'bananes', orange: 'oranges', plum: 'prunes'
  };
  var FRUIT_ES = {
    cherry: 'cerezas', strawberry: 'fresas', apple: 'manzanas', lemon: 'limones',
    pear: 'peras', banana: 'plátanos', orange: 'naranjas', plum: 'ciruelas'
  };

  var C = {
    T: '#146B5E', BODY: '#E2F0EC', BOWL: '#EAF7EF', BOWL2: '#DCEFE9',
    CORAL: '#F2784B', INK: '#2A2A35', RIM: '#FFFFFF', GOOD: '#2FA56A'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  /* deterministic mulberry32 (the choice-board/mochi seeded idiom) */
  function rng(seed) {
    var s = seed | 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0; var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffleSeeded(arr, seed) {
    var rand = rng(seed), a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function imgURL(noun, theme) {
    return '/image-library-webp/themes/' + encodeURIComponent(theme || 'fruits') + '/' + noun + '@2x.webp';
  }

  /* ---- Pim the owl — SVG PLACEHOLDER (CA5 sprite swaps in via _setPose) ---- */
  function pimSVG() {
    return '<svg class="eg-pim-svg" viewBox="0 0 120 120" role="img" aria-label="Pim the owl">' +
      '<path d="M24 60 C24 30 96 30 96 60 C96 88 80 100 60 100 C40 100 24 88 24 60 Z" fill="' + C.T + '"/>' +
      '<path d="M40 36 L46 21 L52 39 Z" fill="' + C.T + '"/><path d="M80 36 L74 21 L68 39 Z" fill="' + C.T + '"/>' +
      '<ellipse cx="44" cy="45" rx="10" ry="7" fill="' + C.RIM + '" opacity="0.3"/>' +
      '<path d="M60 54 Q45 58 45 75 Q45 90 60 93 Q75 90 75 75 Q75 58 60 54 Z" fill="' + C.BODY + '" opacity="0.5"/>' +
      '<ellipse class="pim-cheek" cx="39" cy="68" rx="5.5" ry="3.4" fill="' + C.CORAL + '" opacity="0.5"/>' +
      '<ellipse class="pim-cheek" cx="81" cy="68" rx="5.5" ry="3.4" fill="' + C.CORAL + '" opacity="0.5"/>' +
      /* eyes — open (idle) */
      '<g class="pim-eyes-open">' +
        '<circle cx="50" cy="56" r="9.5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.4"/>' +
        '<circle cx="70" cy="56" r="9.5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.4"/>' +
        '<circle cx="51" cy="57" r="4.6" fill="' + C.INK + '"/><circle cx="69" cy="57" r="4.6" fill="' + C.INK + '"/>' +
        '<circle cx="52.6" cy="55.2" r="1.6" fill="' + C.RIM + '"/><circle cx="70.6" cy="55.2" r="1.6" fill="' + C.RIM + '"/>' +
      '</g>' +
      /* eyes — look (pupils drop toward the groves) */
      '<g class="pim-eyes-look">' +
        '<circle cx="50" cy="56" r="9.5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.4"/>' +
        '<circle cx="70" cy="56" r="9.5" fill="' + C.RIM + '" stroke="' + C.T + '" stroke-width="1.4"/>' +
        '<circle cx="51" cy="60" r="4.6" fill="' + C.INK + '"/><circle cx="69" cy="60" r="4.6" fill="' + C.INK + '"/>' +
      '</g>' +
      /* eyes — happy (^ ^) */
      '<g class="pim-eyes-happy">' +
        '<path d="M42 57 Q50 49 58 57" stroke="' + C.INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<path d="M62 57 Q70 49 78 57" stroke="' + C.INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '<path d="M55 64 L65 64 L60 73 Z" fill="' + C.CORAL + '"/>' +
      /* wings */
      '<ellipse class="pim-wings-rest" cx="27" cy="70" rx="7" ry="14" fill="' + C.T + '"/>' +
      '<ellipse class="pim-wings-rest" cx="93" cy="70" rx="7" ry="14" fill="' + C.T + '"/>' +
      '<ellipse class="pim-wings-up" cx="24" cy="54" rx="6.5" ry="13" fill="' + C.T + '" transform="rotate(-32 24 54)"/>' +
      '<ellipse class="pim-wings-up" cx="96" cy="54" rx="6.5" ry="13" fill="' + C.T + '" transform="rotate(32 96 54)"/>' +
      '</svg>';
  }

  /* ---- one GROUP = cs fruit resting on a soft flat PLATE, grounded by soft
     shadows (centred at cx,cy). NO drawn 3D container: a flat abstract plate +
     soft contact shadows recede so they never clash with the realistic fruit
     images, the plate is an explicit group boundary (twin-proof), and the fruit
     sit fully visible ON the plate so counting is trivial. Draw order (back to
     front): plate shadow → plate → per-fruit contact shadows → fruit images. ---- */
  /* plate ellipse half-width for `cs` fruit at a given `size` (used to lay
     plates out at their NATURAL width, clustered + centred — not spread). */
  function plateHalfW(size, cs) {
    var per = cs <= 3 ? cs : 3, gx = size * 1.04;
    return (Math.min(per, cs) - 1) * gx / 2 + size * 0.5 + size * 0.55;
  }

  function plate(cx, cy, size, cs, url) {
    /* ≤3 fruit across (4→3+1, 5→3+2, 6→3+3); fruit sized by the caller. */
    var per = cs <= 3 ? cs : 3, frows = Math.ceil(cs / per);
    var gx = size * 1.04, rowStep = size * 0.86;       // a hair of gap → each fruit distinct, shadows don't pool
    var rowsH = (frows - 1) * rowStep;

    /* fruit positions (cluster centred at cy) */
    var pos = [];
    for (var j = 0; j < cs; j++) {
      var frow = Math.floor(j / per), fcol = j % per, inRow = Math.min(per, cs - frow * per);
      var fx = cx - (inRow - 1) * gx / 2 + fcol * gx;
      var fy = (cy + rowsH / 2) - frow * rowStep;
      pos.push({ x: fx, y: fy });
    }

    /* PLATE that FRAMES the whole cluster (with margin, so no fruit hangs off) */
    var clusterHalfW = (Math.min(per, cs) - 1) * gx / 2 + size * 0.5;
    var plateRx = clusterHalfW + size * 0.55;
    var plateRy = Math.min(rowsH / 2 + size * 0.62, plateRx * 0.52);  // flat for 1 row, rounder for 2 — but never a circle
    var plateCY = cy + size * 0.06;
    var parts = '';

    /* plate shadow (soft, on the card) */
    parts += '<ellipse cx="' + cx + '" cy="' + (plateCY + 1.6).toFixed(1) + '" rx="' + plateRx.toFixed(1) + '" ry="' + plateRy.toFixed(1) + '" fill="' + C.T + '" opacity="0.12" filter="url(#egShadow)"/>';
    /* the plate — a soft pale-teal disc, whisper rim (recedes; no shout) */
    parts += '<ellipse cx="' + cx + '" cy="' + plateCY.toFixed(1) + '" rx="' + plateRx.toFixed(1) + '" ry="' + plateRy.toFixed(1) + '" fill="' + C.BODY + '" stroke="' + C.T + '" stroke-width="0.7" stroke-opacity="0.22"/>';
    /* per-fruit contact shadows (on the plate, under each fruit) */
    pos.forEach(function (p) {
      parts += '<ellipse cx="' + p.x.toFixed(1) + '" cy="' + (p.y + size * 0.40).toFixed(1) + '" rx="' + (size * 0.36).toFixed(1) + '" ry="' + (size * 0.11).toFixed(1) + '" fill="' + C.T + '" opacity="0.15" filter="url(#egShadow)"/>';
    });
    /* fruit images, back (top rows) to front (bottom rows) */
    pos.slice().sort(function (a, b) { return a.y - b.y; }).forEach(function (p) {
      parts += '<image href="' + url + '" x="' + (p.x - size / 2).toFixed(1) + '" y="' + (p.y - size / 2).toFixed(1) +
        '" width="' + size.toFixed(1) + '" height="' + size.toFixed(1) + '" preserveAspectRatio="xMidYMid meet"/>';
    });
    return '<g class="eg-plate">' + parts + '</g>';
  }

  /* ---- one candidate card SVG: cg plates of cs fruit in a SINGLE horizontal
     RAIL across a full-width, SHORT card (height = one plate). Full-width cards
     STACK (see CSS) → fruit fill the width (big), no dead space, and 2- vs
     3-card rounds look identically balanced. Card height floats to the plate:
     one fruit-row → 60, two rows (cs≥4) → 96. ---- */
  function cardSVG(cand, url) {
    var cg = cand.g, cs = cand.s;
    var VBW = 240, VBH = (cs <= 3) ? 48 : 70;
    var PAD = 6, GAP = 9;
    var railW = VBW - PAD * 2, cellH = VBH - PAD * 2;
    var frows = (cs <= 3) ? 1 : 2;
    /* fruit size from the card HEIGHT (so 1-row and 2-row cards give similar
       fruit size — VBH is chosen to match), then SCALE DOWN only if the cg
       plates don't fit the rail width. */
    var ef = (frows === 1) ? 1.18 : 2.04;              // plate content vertical extent / size
    var sizeByH = (cellH * 0.92) / ef;
    var pw = 2 * plateHalfW(sizeByH, cs);
    var rowW = cg * pw + (cg - 1) * GAP;
    var size = (rowW > railW) ? sizeByH * (railW / rowW) : sizeByH;
    pw = 2 * plateHalfW(size, cs);
    rowW = cg * pw + (cg - 1) * GAP;
    var startX = (VBW - rowW) / 2;                     // CENTRE the plate cluster (no edge-spread gap)
    var parts = '';
    for (var k = 0; k < cg; k++) {
      var cx = startX + pw / 2 + k * (pw + GAP);
      parts += plate(cx, VBH / 2, size, cs, url);
    }
    /* one shared soft-shadow blur filter for the whole card (static → reduced-motion safe) */
    return '<svg class="eg-card-svg" viewBox="0 0 ' + VBW + ' ' + VBH + '" aria-hidden="true">' +
      '<defs><filter id="egShadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1"/></filter></defs>' +
      parts + '</svg>';
  }

  global.EchoGroveActivity = {
    id: 'echo-grove-activity',

    strings: {
      title:       { en: 'The Echo Grove', de: 'Pims Echo-Hain', fr: 'Le bosquet de Pim', es: 'El bosque del eco de Pim' },
      instruction: { en: "Read Pim's rune, then tap the grove that matches it. Tap Check when you're ready.", de: 'Lies Pims Rune und tippe dann den Hain, der dazu passt. Tippe auf „Prüfen“, wenn du bereit bist.', fr: 'Lis la rune de Pim, puis touche le bosquet qui lui correspond. Touche Vérifier quand tu es prêt.', es: 'Lee la runa de Pim y luego toca el bosque que le corresponde. Toca «Comprobar» cuando estés listo.' },
      /* {g} groups of {s} — the structure, the only numerals besides the rune */
      prompt:      { en: 'Tap the grove with {g} groups of {s}.', de: 'Tippe den Hain mit {g} Gruppen mit je {s}.', fr: 'Touche le bosquet avec {g} groupes de {s}.', es: 'Toca el bosque con {g} grupos de {s}.' },
      hintPickOne: { en: 'Tap one of the groves first.', de: 'Tippe zuerst auf einen der Haine.', fr: 'Touche d’abord un des bosquets.', es: 'Primero toca uno de los bosques.' },
      hintCount:   { en: 'Same fruit, different shape — count the groups.', de: 'Gleiche Früchte, andere Form – zähl die Gruppen.', fr: 'Mêmes fruits, forme différente — compte les groupes.', es: 'La misma fruta, en otra forma: cuenta los grupos.' },
      runeGloss:   { en: '{g} groups of {s}', de: '{g} Gruppen mit je {s}', fr: '{g} groupes de {s}', es: '{g} grupos de {s}' },
      srRune:      { en: 'The rune says {g} groups of {s}.', de: 'Die Rune zeigt {g} Gruppen mit je {s}.', fr: 'La rune montre {g} groupes de {s}.', es: 'La runa muestra {g} grupos de {s}.' },
      cardLabel:   { en: 'A grove with {g} baskets, {s} {fruit} in each basket.', de: 'Ein Hain mit {g} Gruppen, in jeder Gruppe {s} {fruit}.', fr: 'Un bosquet avec {g} paniers, {s} {fruit} dans chaque panier.', es: 'Un bosque con {g} grupos, {s} {fruit} en cada grupo.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this.g = 3; this.s = 4; this.fruit = 'cherry'; this.theme = 'fruits'; this.seed = 1;
      this.cands = []; this.picked = null; this.readOnly = false; this._heartsSpawned = false;
      this._pool = null; this._order = null; this._curPass = 0; this._orderForPool = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      this._pool = STATIC_DEMO_TASKS;
      if (this._activityId) { this._loadActivity(); }
    },

    /* opts = { g, s, fruit, theme, seed } */
    setupTask: function (opts) {
      opts = opts || {};
      this.g = opts.g; this.s = opts.s;
      this.fruit = opts.fruit || 'cherry'; this.theme = opts.theme || 'fruits';
      this.seed = opts.seed || 1;
      /* candidates = correct + same-total decoys (twin first), positions
         shuffled (seeded) so neither position nor salience is a tell. */
      var decoys = Core.sameTotalDecoys(this.g, this.s, 2);
      var list = [{ g: this.g, s: this.s }];
      decoys.forEach(function (d) { list.push({ g: d[0], s: d[1] }); });
      this.cands = shuffleSeeded(list, this.seed);
      this.picked = null; this.readOnly = false; this._heartsSpawned = false;
    },

    render: function () {
      this.injectCSS();
      var api = this.api, self = this;
      var stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'eg-wrap');

      /* rune strip — Pim + the rune g × s */
      var strip = api.el('div', 'eg-rune-strip');
      var pim = api.el('div', 'eg-pim'); pim.setAttribute('data-pose', 'idle');
      pim.innerHTML = pimSVG();
      this._pimEl = pim;
      var rune = api.el('div', 'eg-rune');
      rune.setAttribute('role', 'img');
      rune.setAttribute('aria-label', interp(api.t('srRune'), { g: this.g, s: this.s }));
      rune.innerHTML = '<span class="eg-rune-expr"><span class="eg-rn">' + this.g + '</span>' +
        '<span class="eg-rx">×</span><span class="eg-rn">' + this.s + '</span></span>' +
        '<span class="eg-rune-gloss">' + esc(interp(api.t('runeGloss'), { g: this.g, s: this.s })) + '</span>';
      strip.append(pim, rune);
      wrap.appendChild(strip);

      /* candidate groves — a vertical column of equal-weight cards */
      var url = imgURL(this.fruit, this.theme);
      var choices = api.el('div', 'eg-choices');
      this._cardEls = [];
      this.cands.forEach(function (c, i) {
        var btn = api.el('button', 'eg-cand'); btn.type = 'button';
        btn.setAttribute('aria-label', cardLabel(api, c, self.fruit));
        btn.innerHTML = cardSVG(c, url) + '<span class="eg-check" aria-hidden="true">' + CHECK_SVG + '</span>';
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
        btn.classList.toggle('is-picked', !self.readOnly && self.picked === i);
        var correct = Core.matches({ g: self.g, s: self.s }, self.cands[i]);
        btn.classList.toggle('is-correct', self.readOnly && correct);
        btn.classList.toggle('is-dim', self.readOnly && !correct);
        if (self.readOnly) { btn.setAttribute('aria-disabled', 'true'); btn.tabIndex = -1; }
        else { btn.removeAttribute('aria-disabled'); btn.removeAttribute('tabindex'); }
        btn.setAttribute('aria-pressed', String(self.picked === i));
      });
      /* Pim pose: cheer on a correct lock, else idle (look is set on a wrong Check) */
      this._setPose(this.readOnly ? 'happy' : 'idle');
      if (this.readOnly && !this._heartsSpawned) { this._heartsSpawned = true; this._spawnHearts(); }
    },

    /* THE CHARACTER SEAM — today the SVG placeholder via [data-pose]; the
       operator's CA5 sprite swaps in here later (docs/character-art-spec.md).
       Poses: idle | look | happy. */
    _setPose: function (name) {
      if (this._pimEl) this._pimEl.setAttribute('data-pose', name);
      /* future: LCSSprite.play(this._pimEl, name, { loop: name==='idle' }); */
    },

    /* called by the wrapper task's hintKey path on a wrong Check */
    nudge: function () { this._setPose('look'); },

    isCorrect: function () {
      return this.picked != null && Core.matches({ g: this.g, s: this.s }, this.cands[this.picked]);
    },

    reset: function () { this.picked = null; this.readOnly = false; this._heartsSpawned = false; this.render(); },

    _spawnHearts: function () {
      if (!this._pimEl) return;
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var layer = document.createElement('div'); layer.className = 'eg-hearts';
      for (var i = 0; i < 4; i++) {
        var s = document.createElement('span'); s.className = 'eg-heart';
        s.style.left = (20 + i * 16) + '%'; s.style.animationDelay = (i * 70) + 'ms';
        s.innerHTML = '<svg viewBox="0 0 100 100" width="18" height="18" aria-hidden="true"><path d="M50 84C20 62 12 44 12 32a20 20 0 0 1 38-8 20 20 0 0 1 38 8c0 12-8 30-38 52z" fill="' + (i % 2 ? C.T : C.CORAL) + '"/></svg>';
        layer.appendChild(s);
      }
      this._pimEl.appendChild(layer);
      setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 1300);
    },

    /* ---- pool plumbing (manifest → tasks; nextTask reshuffle) ---- */
    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : STATIC_DEMO_TASKS;
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) {
        this._order = shuffledOrder(n, null); this._orderForPool = pool; this._curPass = 0;
      }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = shuffledOrder(n, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/echo-grove-activities.json').then(function (r) {
        if (!r.ok) throw new Error('manifest fetch failed: ' + r.status); return r.json();
      }).then(function (rows) {
        var row = rows.find(function (r) { return r.id === self._activityId; });
        if (!row) return;
        self._activityRow = row;
        self._pool = self._buildTasksFromRow(row);
        self._order = null;
        if (typeof global.LCS_reloadFirstTask === 'function') { global.LCS_reloadFirstTask(); }
      }).catch(function (e) {
        if (global.console && console.warn) console.warn('[echo-grove] manifest load failed; using fallback:', e.message);
      });
    },

    _buildTasksFromRow: function (row) {
      if (row.task_template === 'match-the-rune') {
        var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
        if (global.console && console.warn) {
          rounds.forEach(function (r, ri) {
            var prod = r.g * r.s;
            if (!(prod <= 12 && r.g >= 2 && r.g <= 5 && r.s >= 2 && r.s <= 5)) console.warn('[echo-grove] round ' + ri + ' ' + r.g + '×' + r.s + ' outside band (factors 2..5, product ≤12)');
            if (!r.fruit || !r.theme) console.warn('[echo-grove] round ' + ri + ' missing fruit/theme');
          });
        }
        return makeMatchTasks(rounds, row.id);
      }
      return STATIC_DEMO_TASKS;
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.eg-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);width:100%;max-width:min(96vw,640px);margin:0 auto;}'
        + '.eg-rune-strip{display:flex;align-items:center;justify-content:center;gap:clamp(6px,2.4vw,14px);flex-wrap:nowrap;}'
        + '.eg-pim{position:relative;width:clamp(38px,9vw,54px);flex:0 0 auto;}'
        + '.eg-pim-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.eg-pim{transform-box:fill-box;}'
        + '.eg-rune{display:flex;flex-direction:column;align-items:center;background:var(--lcs-card,#FBF3E4);border:3px solid ' + C.T + ';'
        +   'border-radius:14px;padding:clamp(3px,1.2vw,7px) clamp(10px,3.4vw,18px);box-shadow:0 3px 0 rgba(20,107,94,.18);}'
        + '.eg-rune-expr{font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:700;font-size:clamp(22px,6.5vw,34px);line-height:1;letter-spacing:1px;}'
        + '.eg-rn{color:' + C.T + ';} .eg-rx{color:' + C.CORAL + ';margin:0 .12em;}'
        + '.eg-rune-gloss{font-family:"Nunito",sans-serif;font-weight:700;font-size:clamp(10px,2.6vw,13px);color:#6B6B78;margin-top:1px;}'
        /* candidate column — equal-weight cards, vertical at every width */
        /* Full-width SHORT cards STACKED at every width: each card is one plate
           tall (a horizontal rail of plates), so fruit fill the width (big) and
           3 short cards stack shorter than a grid of tall cards → fits a phone,
           and 2- vs 3-card rounds look identically balanced. */
        + '.eg-choices{display:flex;flex-direction:column;gap:clamp(5px,1.5vw,10px);width:100%;max-width:min(94vw,400px);margin:0 auto;}'
        + '.eg-cand{position:relative;display:block;width:100%;background:var(--lcs-card,#FBF3E4);border:2.5px solid rgba(20,107,94,.22);'
        +   'border-radius:16px;padding:clamp(5px,1.5vw,9px);cursor:pointer;min-height:44px;'
        +   'transition:transform .1s,border-color .15s,box-shadow .15s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}'
        + '.eg-cand:active{transform:scale(.99);}'
        + '.eg-cand:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.eg-cand.is-picked{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.25);}'
        + '.eg-cand.is-correct{border-color:' + C.GOOD + ';background:#EAF7EF;}'
        + '.eg-cand.is-dim{opacity:.4;}'
        + '.eg-card-svg{width:100%!important;height:auto!important;display:block;overflow:visible;}'
        /* DESKTOP: the full-width stack is tall — 3 rail cards stack to ~1100px
           and run past the fold (visual-qa CUT-OFF, operator 2026-06-23). At
           ≥680px lay the rails in a centred WRAP-ROW (cards become content-
           width) so 2–3 sit per row → much shorter AND fills the desktop width
           (no narrow-column-on-wide-screen look). Phone keeps the stack. */
        /* narrowest phones (Galaxy Fold cover ~320px): the densest 3-group
           rounds stack ~12px past the fold — claw it back with tighter card
           padding + gap ONLY here (no fruit-size change; 360px+ unaffected). */
        + '@media (max-width:360px){'
        +   '.eg-cand{padding:3px;} .eg-choices{gap:4px;}'
        + '}'
        + '@media (min-width:680px){'
        +   '.eg-wrap{max-width:min(96vw,960px);}'
        +   '.eg-choices{flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;max-width:min(96vw,940px);}'
        +   '.eg-cand{width:auto;flex:0 1 clamp(205px,28vw,270px);}'
        + '}'
        + '.eg-check{position:absolute;top:6px;right:8px;width:clamp(22px,6vw,30px);opacity:0;transform:scale(.5);transition:opacity .2s,transform .2s var(--lcs-ease,ease);}'
        + '.eg-cand.is-correct .eg-check{opacity:1;transform:scale(1);}'
        /* Pim pose variants */
        + '.pim-eyes-look,.pim-eyes-happy,.pim-wings-up{display:none;}'
        + '.eg-pim[data-pose="look"] .pim-eyes-open{display:none;} .eg-pim[data-pose="look"] .pim-eyes-look{display:inline;}'
        + '.eg-pim[data-pose="happy"] .pim-eyes-open{display:none;} .eg-pim[data-pose="happy"] .pim-eyes-happy{display:inline;}'
        + '.eg-pim[data-pose="happy"] .pim-wings-rest{display:none;} .eg-pim[data-pose="happy"] .pim-wings-up{display:inline;}'
        + '.pim-cheek{transition:opacity .2s;} .eg-pim[data-pose="happy"] .pim-cheek{opacity:.8;}'
        /* hearts */
        + '.eg-hearts{position:absolute;inset:0;pointer-events:none;overflow:visible;}'
        + '.eg-heart{position:absolute;top:10%;animation:egHeart 1.2s var(--lcs-ease,ease) forwards;opacity:0;}'
        + '@keyframes egHeart{0%{opacity:0;transform:translateY(0) scale(.6);}25%{opacity:1;}100%{opacity:0;transform:translateY(-46px) scale(1);}}'
        + '@media (prefers-reduced-motion: reduce){.eg-heart{display:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-echo-grove', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  /* ---- shared helpers (prompt interpolation, card a11y label, check icon) ---- */
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }
  var CHECK_SVG = '<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="' + C.GOOD + '"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  /* structure + fruit, ANSWER WITHHELD (identical phrasing for correct + decoys) */
  function cardLabel(api, c, fruit) {
    var fl = (LANG === 'de' && FRUIT_DE[fruit]) ? FRUIT_DE[fruit] : (LANG === 'fr' && FRUIT_FR[fruit]) ? FRUIT_FR[fruit] : (LANG === 'es' && FRUIT_ES[fruit]) ? FRUIT_ES[fruit] : fruit;
    return interp(api.t('cardLabel'), { g: c.g, s: c.s, fruit: fl });
  }

  /* ---- tasks (manifest rounds → shell tasks) ---- */
  function makeMatchTasks(rounds, idPrefix) {
    return rounds.map(function (r, i) {
      return {
        id: idPrefix + '.round-' + i,
        promptKey: 'prompt',
        promptArgs: { g: r.g, s: r.s },
        answerType: 'state',
        setup: function (tool) { tool.setupTask(r); },
        check: function (tool) {
          var ok = tool.isCorrect();
          if (ok) { tool.readOnly = true; tool.paint(); }
          else if (tool.picked != null) { tool.nudge(); }   // wrong pick → Pim 'look'
          return ok;
        },
        hintKey: function (tool) { return (tool.picked == null) ? 'hintPickOne' : 'hintCount'; }
      };
    });
  }

  /* The canonical pool: 10 GENUINELY DIFFERENT groves (§A.13.60 — different
     numbers/structure AND a different real library fruit each), all in the
     ≤12 band. Products 6/8/10 → 2 candidates (correct + twin); 12 → 3. */
  var DEMO_ROUNDS = [
    { g: 2, s: 3, fruit: 'cherry',     theme: 'fruits', seed: 11 },
    { g: 3, s: 2, fruit: 'strawberry', theme: 'fruits', seed: 23 },
    { g: 2, s: 4, fruit: 'apple',      theme: 'fruits', seed: 31 },
    { g: 4, s: 2, fruit: 'lemon',      theme: 'fruits', seed: 41 },
    { g: 2, s: 5, fruit: 'pear',       theme: 'fruits', seed: 53 },
    { g: 5, s: 2, fruit: 'banana',     theme: 'fruits', seed: 61 },
    { g: 3, s: 4, fruit: 'orange',     theme: 'fruits', seed: 67 },
    { g: 4, s: 3, fruit: 'plum',       theme: 'fruits', seed: 71 }
  ];
  var STATIC_DEMO_TASKS = makeMatchTasks(DEMO_ROUNDS, 'demo');

  /* order-only Fisher–Yates, guaranteed ≠ prev when n≥2 (§A.13.60 reshuffle) */
  function _sameOrder(a, b) { if (!b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function shuffledOrder(n, prev) {
    var idx = [], i, j, t; for (i = 0; i < n; i++) idx.push(i);
    if (n < 2) return idx;
    do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (_sameOrder(idx, prev));
    return idx;
  }

}(typeof window !== 'undefined' ? window : this));
