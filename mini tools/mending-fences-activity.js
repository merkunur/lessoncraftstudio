/* =====================================================================
   THE MENDING FENCES — ACTIVITY SKIN  (mending-fences-activity.js)
   ---------------------------------------------------------------------
   3.MD.D.8 · perimeter (the distance AROUND). The lcs-shell activity skin
   over mending-fences-core.js. answerType:'state'. EN-ONLY pilot (slug.en
   only → 404 non-EN by design).

   A measurement game (mute-safe, SR-first): Hazel the badger mends paddock
   fences; Clover the sheep plants the grass inside. SVG polygons + DOM `<text>`
   side labels; discrete-commit taps (NO drag / NO continuous-error signal at
   grade — the gap is hidden). 5 acts:
     • mend-board   — given the fence rope-total P + ONE side, tap the missing
                      board (½P−side) among plates incl. the P−side foil.
     • more-fence-or-grass — two fields; tap which needs more FENCE, then which
                      grows more GRASS (they rank OPPOSITELY).
     • fence-it-or-plant   — tap the UNIT (edge ticks vs interior squares vs the
                      border-ring foil) for the job.
     • roll-reach   — does a roll of given length reach AROUND? reach / short.
     • same-area-diff-perim — same grass, which needs more fence?

   A correct commit → resolve (shell Check appears, hidden until resolved via
   `.lcs-app.fences-resolved`) + the meadow comes alive (abundance vessel, never
   a count). A wrong tap → a warm no-reveal scaffold, no advance, no red-X. Per-
   round `_token` guard. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MendingFencesCore;

  var L = {
    en: {
      qmend: 'Mend the broken fence — how long is the missing board?',
      qrank: "Bramble's two fields — answer about fence, then grass.",
      qunit: 'Fencing the edge or planting inside — which marks?',
      qroll: 'Does the roll of fence reach all the way around?',
      qsame: 'Both fields hold the same grass — which needs more fence?',
      askFence: 'Which field needs MORE fence?',
      askGrass: 'And which field grows MORE grass?',
      askUnitFence: 'To buy FENCE, which marks do you count?',
      askUnitPlant: 'To plant GRASS, which do you count?',
      askRoll: 'A roll of fence {n} long — does it reach around?',
      reach: 'Yes, it reaches', short: 'No, too short',
      win: 'Mended! {note}',
      winFence: 'the fence goes all the way around.',
      winGrass: 'more fence, less grass — good eye!',
      winUnit: 'that is the right kind of mark.',
      winRoll: 'just the right length.',
      nMend: 'Remember: two long sides AND two short sides.',
      nRankFence: 'Look again — which boundary is longer all the way around?',
      nRankGrass: 'Which field has more squares of grass inside?',
      nUnit: 'For the fence, count the marks AROUND the edge; for grass, the squares INSIDE.',
      nRoll: 'Think how far it is all the way around first.',
      unitEdge: 'Edge marks', unitInterior: 'Inside squares', unitBorder: 'Edge ring',
      ropeLabel: 'Fence rope: ', plateAria: '{n} long',
      winMend: 'two long sides and two short sides.',
      srMend: 'A fence of {p} goes around; one side is {s}. How long is the missing board?',
      srRank: 'Two fields. Which needs more fence around the edge, and which grows more grass inside?',
      srSame: 'Two fields hold the same grass. Which one needs more fence around it?',
      srUnitFence: 'To buy fence, count the marks around the edge.',
      srUnitPlant: 'To plant grass, count the squares inside.',
      srRoll: 'A roll of fence {roll} long — does it reach all the way around the field?'
    },
    de: {
      qmend: 'Flick den kaputten Zaun – wie lang ist das fehlende Brett?',
      qrank: 'Brombeers zwei Felder – antworte erst zum Zaun, dann zum Gras.',
      qunit: 'Den Rand einzäunen oder innen pflanzen – welche Marken?',
      qroll: 'Reicht die Zaunrolle einmal ganz herum?',
      qsame: 'Beide Felder haben gleich viel Gras – wer braucht mehr Zaun?',
      askFence: 'Welches Feld braucht MEHR Zaun?',
      askGrass: 'Und auf welchem Feld wächst MEHR Gras?',
      askUnitFence: 'Für den ZAUN – welche Marken zählst du?',
      askUnitPlant: 'Für das GRAS – welche zählst du?',
      askRoll: 'Eine Zaunrolle, {n} lang – reicht sie rundherum?',
      reach: 'Ja, sie reicht', short: 'Nein, zu kurz',
      win: 'Geflickt! {note}',
      winFence: 'der Zaun geht einmal ganz herum.',
      winGrass: 'mehr Zaun, weniger Gras – gut geschaut!',
      winUnit: 'das ist die richtige Marke.',
      winRoll: 'genau die richtige Länge.',
      nMend: 'Denk dran: zwei lange UND zwei kurze Seiten.',
      nRankFence: 'Schau noch mal – welcher Rand ist rundherum länger?',
      nRankGrass: 'Welches Feld hat mehr Gras-Kästchen?',
      nUnit: 'Für den Zaun zählst du die Marken am RAND; für das Gras die Kästchen in der MITTE.',
      nRoll: 'Überleg erst, wie weit es einmal rundherum ist.',
      unitEdge: 'Randmarken', unitInterior: 'Kästchen in der Mitte', unitBorder: 'Randring',
      ropeLabel: 'Zaunlänge: ', plateAria: '{n} lang',
      winMend: 'zwei lange und zwei kurze Seiten.',
      srMend: 'Ein Zaun von {p} geht rundherum; eine Seite ist {s}. Wie lang ist das fehlende Brett?',
      srRank: 'Zwei Felder. Welches braucht mehr Zaun am Rand, und auf welchem wächst mehr Gras in der Mitte?',
      srSame: 'Zwei Felder haben gleich viel Gras. Welches braucht mehr Zaun rundherum?',
      srUnitFence: 'Für den Zaun zählst du die Marken am Rand.',
      srUnitPlant: 'Für das Gras zählst du die Kästchen in der Mitte.',
      srRoll: 'Eine Zaunrolle, {roll} lang – reicht sie einmal ganz um das Feld herum?'
    }
  };
  function txt(k, a) {
    var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
    var s = (L[lang] || L.en)[k] || L.en[k] || k;
    return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; });
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var C = { T: '#146B5E', T2: '#1B7E6E', BODY: '#E2F0EC', BED: '#EAF5F1', CORAL: '#F2784B', INK: '#2A2A35', RIM: '#FFFFFF' };

  /* ---- Hazel the badger — SVG PLACEHOLDER ([data-pose] idle|happy; CA5 later) ---- */
  function hazelSVG() {
    return '<svg class="mf-hazel-svg" viewBox="0 0 60 60" width="34" height="34" aria-hidden="true">' +
      '<ellipse cx="30" cy="36" rx="20" ry="18" fill="#8A9099"/>' +
      '<path d="M14 26 q-4 -10 6 -12 q4 4 3 12 z" fill="#6E747C"/><path d="M46 26 q4 -10 -6 -12 q-4 4 -3 12 z" fill="#6E747C"/>' +
      '<path d="M30 18 q-10 2 -12 20 q12 6 24 0 q-2 -18 -12 -20z" fill="#F4F1EC"/>' +
      '<path d="M22 20 q2 16 0 22 M38 20 q-2 16 0 22" stroke="#3A3F45" stroke-width="4" fill="none" opacity=".85"/>' +
      '<g class="mf-eyes-open"><circle cx="24" cy="34" r="2.4" fill="#2B2B2B"/><circle cx="36" cy="34" r="2.4" fill="#2B2B2B"/></g>' +
      '<g class="mf-eyes-happy"><path d="M21 34 q3 -4 6 0" stroke="#2B2B2B" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M33 34 q3 -4 6 0" stroke="#2B2B2B" stroke-width="2" fill="none" stroke-linecap="round"/></g>' +
      '<ellipse cx="30" cy="40" rx="3" ry="2.2" fill="#2B2B2B"/>' +
      '<ellipse cx="20" cy="40" rx="3.2" ry="2" fill="#F2784B" opacity=".5"/><ellipse cx="40" cy="40" rx="3.2" ry="2" fill="#F2784B" opacity=".5"/></svg>';
  }
  /* the meadow comes alive — flowers + a grazing creature grow with _finds (never a count) */
  function meadowSVG(n) {
    var cap = Math.min(n, 9), cols = ['#F2784B', '#C2569B', '#E9C46A', '#5AA469', '#2A9D8F'], blooms = '';
    for (var i = 0; i < cap; i++) {
      var x = 7 + i * 6, y = 26 - (i % 3) * 3, col = cols[i % 5];
      blooms += '<g transform="translate(' + x + ',' + y + ')"><line x1="0" y1="0" x2="0" y2="6" stroke="#5AA469" stroke-width="1.1"/><circle cx="0" cy="-1.4" r="2.1" fill="' + col + '"/><circle cx="0" cy="-1.4" r=".8" fill="#FFF7E6"/></g>';
    }
    return '<svg class="mf-meadow-svg" viewBox="0 0 62 34" width="40" height="22" aria-hidden="true"><rect x="2" y="24" width="58" height="8" rx="3" fill="#DCEAD7"/><g>' + blooms + '</g></svg>';
  }

  /* ---- field rendering (rect or polyomino) into an SVG; optional side labels +
     a missing-board edge + unit marks ---- */
  function maskCellList(mask) { var o = []; for (var r = 0; r < mask.length; r++) for (var c = 0; c < mask[r].length; c++) if (mask[r].charAt(c) === '1') o.push([c, r]); return o; }
  function fieldDims(field) { return field.mask ? Core.bboxOf(field) : { w: field.w, h: field.h }; }

  /* draw a field at unit U into a viewBox padded by PAD on each side. opts:
     {labelSides:'shown'|'all'|false, shownSide, missing:bool, marks:'both'|false} */
  function fieldSVG(field, U, opts) {
    opts = opts || {};
    /* PAD = viewBox margin (in cell units) on each side. The missing-board "?"
       badge sits ~0.84U OUTSIDE the rect, so mend-board passes pad:1.0 so the
       full badge fits inside the viewBox (default 0.5 for the other fields). */
    var d = fieldDims(field), PAD = (opts.pad != null ? opts.pad : 0.5);
    var VBW = (d.w + PAD * 2) * U, VBH = (d.h + PAD * 2) * U, ox = PAD * U, oy = PAD * U;
    var parts = '';
    if (field.mask) {
      maskCellList(field.mask).forEach(function (cr) {
        var x = ox + cr[0] * U, y = oy + cr[1] * U;
        parts += '<rect x="' + x + '" y="' + y + '" width="' + U + '" height="' + U + '" fill="' + C.BED + '" stroke="' + C.T + '" stroke-width="2"/>';
      });
    } else {
      var w = d.w * U, h = d.h * U;
      parts += '<rect x="' + ox + '" y="' + oy + '" width="' + w + '" height="' + h + '" rx="' + (U * 0.12) + '" fill="' + C.BED + '" stroke="' + C.T + '" stroke-width="3"/>';
      /* interior unit squares (around-vs-fill marks) */
      if (opts.marks === 'both') {
        for (var r = 0; r < d.h; r++) for (var c = 0; c < d.w; c++) parts += '<rect x="' + (ox + c * U + U * 0.18) + '" y="' + (oy + r * U + U * 0.18) + '" width="' + (U * 0.64) + '" height="' + (U * 0.64) + '" fill="none" stroke="#9CC4BB" stroke-width="1"/>';
        /* boundary ticks */
        for (var i = 0; i < d.w; i++) { parts += tick(ox + i * U + U / 2, oy, 'h'); parts += tick(ox + i * U + U / 2, oy + h, 'h'); }
        for (var j = 0; j < d.h; j++) { parts += tick(ox, oy + j * U + U / 2, 'v'); parts += tick(ox + w, oy + j * U + U / 2, 'v'); }
      }
      /* side labels */
      var fs = U * 0.5;
      function lbl(x, y, s, col, sz) { return '<text x="' + x + '" y="' + y + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="' + (sz || fs) + '" fill="' + (col || C.INK) + '" text-anchor="middle" dominant-baseline="middle">' + esc(s) + '</text>'; }
      /* a clear coral missing-board marker: a coral box + a big bold "?" (never mistakable for a digit) */
      function missingMark(cx, cy) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + (U * 0.42) + '" fill="#FCE6DC" stroke="' + C.CORAL + '" stroke-width="2.5"/>' + lbl(cx, cy + U * 0.02, '?', C.CORAL, U * 0.66); }
      if (opts.labelSides === 'shown') {
        /* show ONLY the one given side; the opposite-axis missing board = a coral "?" badge */
        var sw = opts.shownSide === 'w';
        if (sw) { parts += lbl(ox + w / 2, oy - U * 0.24, String(field.w)); }
        else { parts += lbl(ox - U * 0.3, oy + h / 2, String(field.h)); }
        if (opts.missing) {
          if (sw) { parts += '<line x1="' + (ox + w) + '" y1="' + oy + '" x2="' + (ox + w) + '" y2="' + (oy + h) + '" stroke="' + C.CORAL + '" stroke-width="5" stroke-dasharray="6 4"/>' + missingMark(ox + w + U * 0.42, oy + h / 2); }
          else { parts += '<line x1="' + ox + '" y1="' + (oy + h) + '" x2="' + (ox + w) + '" y2="' + (oy + h) + '" stroke="' + C.CORAL + '" stroke-width="5" stroke-dasharray="6 4"/>' + missingMark(ox + w / 2, oy + h + U * 0.42); }
        }
      } else if (opts.labelSides === 'all') {
        /* label one of each pair (opposite sides are equal) — the numeric basis
           for comparing perimeters / judging the roll. */
        parts += lbl(ox + w / 2, oy - U * 0.24, String(d.w));
        parts += lbl(ox - U * 0.3, oy + h / 2, String(d.h));
      }
    }
    return '<svg viewBox="0 0 ' + VBW.toFixed(0) + ' ' + VBH.toFixed(0) + '" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + parts + '</svg>';
  }
  function tick(x, y, dir) {
    var len = 5;
    if (dir === 'h') return '<line x1="' + x + '" y1="' + (y - len) + '" x2="' + x + '" y2="' + (y + len) + '" stroke="' + C.CORAL + '" stroke-width="2.4"/>';
    return '<line x1="' + (x - len) + '" y1="' + y + '" x2="' + (x + len) + '" y2="' + y + '" stroke="' + C.CORAL + '" stroke-width="2.4"/>';
  }
  /* mini unit-type illustration for the fence-or-plant tiles */
  function unitMiniSVG(kind) {
    var s = '<svg viewBox="0 0 48 48" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="3" fill="#EAF5F1" stroke="#146B5E" stroke-width="2.5"/>';
    if (kind === 'edge') { for (var i = 0; i < 4; i++) { var p = 8 + 8 + i * 8; s += '<line x1="' + p + '" y1="4" x2="' + p + '" y2="12" stroke="#F2784B" stroke-width="2.6"/><line x1="' + p + '" y1="36" x2="' + p + '" y2="44" stroke="#F2784B" stroke-width="2.6"/><line x1="4" y1="' + p + '" x2="12" y2="' + p + '" stroke="#F2784B" stroke-width="2.6"/><line x1="36" y1="' + p + '" x2="44" y2="' + p + '" stroke="#F2784B" stroke-width="2.6"/>'; } }
    else if (kind === 'interior') { for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) s += '<rect x="' + (12 + c * 8) + '" y="' + (12 + r * 8) + '" width="6" height="6" fill="#5AA469"/>'; }
    else { /* border ring */ for (var rr = 0; rr < 4; rr++) for (var cc = 0; cc < 4; cc++) { if (rr !== 0 && rr !== 3 && cc !== 0 && cc !== 3) continue; s += '<rect x="' + (10 + cc * 7.5) + '" y="' + (10 + rr * 7.5) + '" width="6" height="6" fill="#C2569B"/>'; } }
    return s + '</svg>';
  }

  var MendingFencesActivity = {
    id: 'mending-fences-activity',
    strings: {
      title: { en: 'The Mending Fences', de: 'Hazel flickt die Zäune' },
      instruction: { en: 'Help Hazel mend the fences — perimeter is the distance all the way around!', de: 'Hilf Hazel beim Zaunflicken – der Umfang ist der Weg einmal rundherum!' },
      qmend: { en: 'Mend the broken fence.', de: 'Flick den kaputten Zaun.' },
      qrank: { en: "Two fields — fence, then grass.", de: 'Zwei Felder – erst Zaun, dann Gras.' },
      qunit: { en: 'Edge marks or inside squares?', de: 'Randmarken oder Kästchen in der Mitte?' },
      qroll: { en: 'Does the fence reach around?', de: 'Reicht der Zaun einmal herum?' },
      qsame: { en: 'Same grass — which needs more fence?', de: 'Gleich viel Gras – wer braucht mehr Zaun?' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._jrPhase = 0;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('mf-style')) return;
      var s = el('style'); s.id = 'mf-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.mf-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,580px);margin:0 auto;}',
        '.mf-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.mf-hazel,.mf-meadow{flex:0 0 auto;}',
        '.mf-line{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .84rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.mf-line.miss{color:#C2410C;}',
        '.mf-rope{font:800 clamp(.95rem,3.6vw,1.2rem)/1.2 Baloo 2,Nunito,sans-serif;color:#0F4A40;text-align:center;background:#EAF5F1;border-radius:12px;padding:5px 16px;}',
        /* the unit cell scales with the card on desktop (the §A.13.62 not-sparse lesson).
           All fields are LANDSCAPE (w≥h) so a width cap bounds the height. */
        '.mf-stage{--mf-u:clamp(26px,7.5vw,46px);display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;}',
        '.mf-onefield{width:auto;}',
        /* two fields ALWAYS side by side (never stacked — keeps the row short) */
        '.mf-fields{display:flex;flex-wrap:nowrap;gap:10px;justify-content:center;align-items:center;width:100%;}',
        '.mf-cand{border:2.6px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;padding:7px;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}',
        '.mf-cand.dim{opacity:.4;}',
        '.mf-cand.lit{box-shadow:0 0 0 3px #F2784B;}',
        /* field-as-button (joint-ranking / same-area): width hugs the field, height capped */
        '.mf-field-btn{width:calc((var(--mf-c) + 1) * var(--mf-u));max-width:min(42vw,240px);display:flex;align-items:center;justify-content:center;}',
        '.mf-field-btn svg{display:block;width:100%;}',
        /* the display field (mend / units / roll) — not a button */
        '.mf-field{width:calc((var(--mf-c) + 1) * var(--mf-u));max-width:min(74vw,280px);}',
        '.mf-field svg{display:block;width:100%;}',
        /* number plates (mend) */
        '.mf-plates{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;}',
        '.mf-plate{min-width:clamp(60px,15vw,96px);min-height:clamp(50px,9vw,68px);color:#0F4A40;font:800 clamp(1.35rem,5vw,2rem)/1 Baloo 2,Nunito,sans-serif;display:flex;align-items:center;justify-content:center;}',
        /* unit tiles (fence-or-plant) */
        '.mf-units{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:100%;}',
        '.mf-unit{display:flex;flex-direction:column;align-items:center;gap:2px;width:clamp(78px,23vw,108px);padding:5px;}',
        '.mf-unit svg{width:clamp(64px,20vw,92px);height:auto;}',
        '.mf-unit .mf-ulab{font:700 clamp(.7rem,2.3vw,.82rem)/1.05 Nunito,sans-serif;color:#0F4A40;text-align:center;white-space:nowrap;}',
        /* reach buttons (roll) */
        '.mf-reaches{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;}',
        '.mf-reach{min-height:clamp(50px,9vw,64px);color:#0F4A40;font:800 clamp(.95rem,3.6vw,1.25rem)/1.1 Baloo 2,Nunito,sans-serif;padding:8px 18px;display:flex;align-items:center;}',
        '.mf-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '.mf-hazel-svg .mf-eyes-happy{display:none;}.mf-hazel[data-pose=happy] .mf-eyes-open{display:none;}.mf-hazel[data-pose=happy] .mf-eyes-happy{display:block;}',
        '@media (max-width:380px){.mf-root{gap:5px;}.mf-stage{--mf-u:clamp(24px,6.6vw,38px);gap:7px;}.mf-line{font-size:.78rem;}.mf-plate{min-width:56px;min-height:48px;}.mf-reach{min-height:48px;}.mf-unit{width:clamp(72px,22vw,96px);}.mf-unit svg{width:clamp(58px,18vw,80px);}}',
        '.lcs-app:not(.fences-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'mending-fences.mend-board.3-md-d-8';
      var tries = ['/mini-tools/mending-fences-activities.json', 'mending-fences-activities.json', '../mini tools/mending-fences-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && row.params.rounds) || [];
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
      var pk = { 'mend-board': 'qmend', 'more-fence-or-grass': 'qrank', 'fence-it-or-plant': 'qunit', 'roll-reach': 'qroll', 'same-area-diff-perim': 'qsame' }[round.cog] || 'qmend';
      return {
        id: round.id, promptKey: pk, promptArgs: {}, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1;
      this._nonConf = {}; this._jrPhase = 0;
      if (round.cog === 'mend-board') this._displayOrder = this._shuffle((round.candidates || []).map(function (_, i) { return i; }));
      if (round.cog === 'fence-it-or-plant') this._displayOrder = this._shuffle(Core.UNIT_OPTIONS.map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('fences-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'mf-root');

      var say = el('div', 'mf-say');
      var hz = el('div', 'mf-hazel'); hz.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); hz.innerHTML = hazelSVG();
      var line = el('p', 'mf-line'); line.setAttribute('aria-live', 'polite');
      var md = el('div', 'mf-meadow'); md.innerHTML = meadowSVG(this._finds);
      say.append(hz, line, md); root.appendChild(say); this._line = line; this._hazel = hz;

      var box = el('div', 'mf-stage');
      ({ 'mend-board': '_rMend', 'more-fence-or-grass': '_rRank', 'same-area-diff-perim': '_rRank', 'fence-it-or-plant': '_rUnit', 'roll-reach': '_rRoll' }[round.cog] &&
        this[{ 'mend-board': '_rMend', 'more-fence-or-grass': '_rRank', 'same-area-diff-perim': '_rRank', 'fence-it-or-plant': '_rUnit', 'roll-reach': '_rRoll' }[round.cog]](box));
      root.appendChild(box);

      /* default status line per cog (unless win/nudge already set it) */
      if (!this._resolved && this._line && !this._line.textContent) this._line.textContent = this._defaultLine();
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _defaultLine: function () {
      var r = this._round;
      if (r.cog === 'more-fence-or-grass') return this._jrPhase === 0 ? txt('askFence') : txt('askGrass');
      if (r.cog === 'same-area-diff-perim') return txt('askFence');
      if (r.cog === 'fence-it-or-plant') return r.job === 'fence' ? txt('askUnitFence') : txt('askUnitPlant');
      if (r.cog === 'roll-reach') return txt('askRoll', { n: r.roll });
      if (r.cog === 'mend-board') return txt('qmend');
      return '';
    },

    _fieldColsVar: function (field) { return fieldDims(field).w; },

    /* ---------- mend-board ---------- */
    _rMend: function (box) {
      var self = this, r = this._round, tok = this._token;
      var rope = el('div', 'mf-rope'); rope.textContent = txt('ropeLabel') + Core.rectPerimeter(r); box.appendChild(rope);
      /* pad:1.0 so the coral "?" badge (drawn ~0.84U outside the rect) fits the
         viewBox; +1 on --mf-c compensates the wider viewBox so the field keeps size. */
      var fld = el('div', 'mf-field'); fld.style.setProperty('--mf-c', this._fieldColsVar(r) + 1);
      fld.innerHTML = fieldSVG(r, 100, { labelSides: 'shown', shownSide: r.shownSide, missing: true, pad: 1.0 });
      box.appendChild(fld);
      if (this._resolved) return;
      var plates = el('div', 'mf-plates');
      this._displayOrder.forEach(function (oi) {
        var b = el('button', 'mf-cand mf-plate' + (self._nonConf[oi] ? ' dim' : ''));
        b.type = 'button'; b.textContent = String(r.candidates[oi]); b.setAttribute('aria-label', txt('plateAria', { n: r.candidates[oi] }));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[oi] || self._token !== tok) return;
          if (Core.isAnswer(r, oi)) self._resolve('win', { note: txt('winMend') });
          else { self._nonConf[oi] = 1; self._nudge('nMend'); }
        });
        plates.appendChild(b);
      });
      box.appendChild(plates);
    },

    /* ---------- joint-ranking / same-area (field-pick) ---------- */
    _rRank: function (box) {
      var self = this, r = this._round, tok = this._token;
      var wrap = el('div', 'mf-fields');
      r.fields.forEach(function (f, i) {
        var b = el('button', 'mf-cand mf-field-btn'); b.type = 'button';
        b.style.setProperty('--mf-c', fieldDims(f).w);
        b.setAttribute('aria-label', 'field ' + (i + 1));
        b.innerHTML = fieldSVG(f, 100, f.mask ? {} : { labelSides: 'all' });
        b.addEventListener('click', function () { if (self._token === tok) self._pickField(i); });
        wrap.appendChild(b);
      });
      box.appendChild(wrap);
    },
    _pickField: function (i) {
      var r = this._round; if (this._resolved) return;
      if (r.cog === 'same-area-diff-perim') {
        if (i === Core.deriveMoreFence(r.fields)) this._resolve('win', { note: txt('winGrass') });
        else this._nudge('nRankFence');
        return;
      }
      /* more-fence-or-grass: phase 0 = fence, phase 1 = grass */
      if (this._jrPhase === 0) {
        if (i === Core.deriveMoreFence(r.fields)) { this._jrPhase = 1; this._api.sound && this._api.sound(700); if (this._line) { this._line.textContent = txt('askGrass'); this._line.classList.remove('miss'); } }
        else this._nudge('nRankFence');
      } else {
        if (i === Core.deriveMoreGrass(r.fields)) this._resolve('win', { note: txt('winGrass') });
        else this._nudge('nRankGrass');
      }
    },

    /* ---------- fence-it-or-plant (unit discrimination) ---------- */
    _rUnit: function (box) {
      var self = this, r = this._round, tok = this._token;
      var fld = el('div', 'mf-field mf-onefield'); fld.style.setProperty('--mf-c', this._fieldColsVar(r.field));
      fld.innerHTML = fieldSVG(r.field, 100, { marks: 'both' });
      box.appendChild(fld);
      if (this._resolved) return;
      var units = el('div', 'mf-units');
      var labelKey = { edge: 'unitEdge', interior: 'unitInterior', border: 'unitBorder' };
      this._displayOrder.forEach(function (oi) {
        var kind = Core.UNIT_OPTIONS[oi];
        var b = el('button', 'mf-cand mf-unit' + (self._nonConf[oi] ? ' dim' : '')); b.type = 'button';
        b.setAttribute('aria-label', txt(labelKey[kind]));
        b.innerHTML = unitMiniSVG(kind) + '<span class="mf-ulab">' + esc(txt(labelKey[kind])) + '</span>';
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[oi] || self._token !== tok) return;
          if (Core.isAnswer(r, kind)) self._resolve('win', { note: txt('winUnit') });
          else { self._nonConf[oi] = 1; self._nudge('nUnit'); }
        });
        units.appendChild(b);
      });
      box.appendChild(units);
    },

    /* ---------- roll-reach ---------- */
    _rRoll: function (box) {
      var self = this, r = this._round, tok = this._token;
      var fld = el('div', 'mf-field mf-onefield'); fld.style.setProperty('--mf-c', this._fieldColsVar(r.field));
      fld.innerHTML = fieldSVG(r.field, 100, r.field.mask ? {} : { labelSides: 'all' });
      box.appendChild(fld);
      if (this._resolved) return;
      var rr = el('div', 'mf-reaches');
      [['reach', 'reach'], ['short', 'short']].forEach(function (pair) {
        var resp = pair[0];
        var b = el('button', 'mf-cand mf-reach' + (self._nonConf[resp] ? ' dim' : '')); b.type = 'button';
        b.textContent = txt(pair[1]); b.setAttribute('aria-label', txt(pair[1]));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[resp] || self._token !== tok) return;
          if (Core.isAnswer(r, resp)) self._resolve('win', { note: txt('winRoll') });
          else { self._nonConf[resp] = 1; self._nudge('nRoll'); }
        });
        rr.appendChild(b);
      });
      box.appendChild(rr);
    },

    _resolve: function (winKey, args) {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('fences-resolved');
      this.render();
      if (this._line) { this._line.textContent = txt(winKey, args); this._line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt(winKey, args));
    },
    _nudge: function (key) {
      this._api.sound && this._api.sound(440);
      this.render();
      if (this._line) { this._line.textContent = txt(key); this._line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, wrap = el('div', 'mf-sronly'); wrap.setAttribute('aria-live', 'polite');
      var msg = '';
      if (r.cog === 'mend-board') msg = txt('srMend', { p: Core.rectPerimeter(r), s: Core.shownVal(r) });
      else if (r.cog === 'more-fence-or-grass') msg = txt('srRank');
      else if (r.cog === 'same-area-diff-perim') msg = txt('srSame');
      else if (r.cog === 'fence-it-or-plant') msg = (r.job === 'fence' ? txt('srUnitFence') : txt('srUnitPlant'));
      else if (r.cog === 'roll-reach') msg = txt('srRoll', { roll: r.roll });
      wrap.innerHTML = '<p>' + esc(msg) + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.MendingFencesActivity = MendingFencesActivity;

}(typeof window !== 'undefined' ? window : this));
