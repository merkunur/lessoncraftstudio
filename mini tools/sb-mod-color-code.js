/* ============================================================================
   sb-mod-color-code.js — NATIVE pre-school module: TAP a colour in the legend,
   then TAP the big regions that take that colour (colour-by-code, PK-simple).
   Regions are large (≥ the band goal-region floor) and legend swatches are large
   (≥ the band legend floor) so a 3-5yo can't miss. A region only accepts its
   CORRECT colour — a wrong tap gives a soft wordless "not that one" wobble and
   the region stays open (never locked wrong, never a score). Select a colour
   once and fill every region it belongs to. Completes when all regions are
   correctly coloured.

   Page taskData:
     { "legend": [ {"key":"red","color":"#F2784B"}, {"key":"teal","color":"#146B5E"} ],
       "regions": [ {"rect":{"x":120,"y":300,"w":300,"h":260}, "correct":"red", "symbol":"1"}, ... ] }
   completionMode: "auto".  Reads window.SBKit (sb-preschool-kit.js) + ctx.band.
   ========================================================================= */
(function (global) {
  'use strict';

  var SWATCH = 180;   /* legend swatch size (du) — >= PK minLegendSwatch */
  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return; _cssDone = true;
    var css = [
      '.sbcc{position:relative;width:100%;height:100%;}',
      '.sbcc-svg{display:block;width:100%;height:100%;touch-action:none;cursor:pointer;}',
      '.sbcc-region{fill:#fff;fill-opacity:.55;stroke:#5b5145;stroke-width:4;stroke-dasharray:12 10;}',
      '.sbcc-region.sbcc-bad{animation:sbcc-wob .5s ease;}',
      '@keyframes sbcc-wob{0%,100%{transform:translateX(0);}25%{transform:translateX(-10px);}75%{transform:translateX(10px);}}',
      '.sbcc-sym{fill:#5b5145;font-family:sans-serif;font-weight:700;text-anchor:middle;dominant-baseline:central;pointer-events:none;}',
      '.sbcc-swatch{stroke:#fff;stroke-width:4;}',
      '.sbcc-swatch.sbcc-sel{stroke:#2b2b2b;stroke-width:10;}',
      '@media (prefers-reduced-motion: reduce){.sbcc-region.sbcc-bad{animation:none;}}'
    ].join('\n');
    var st = global.document.createElement('style'); st.id = 'sbcc-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) { var e = global.document.createElementNS(SVGNS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

  global.SBModules.register({
    meta: {
      type: 'sb-color-code', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 560, h: 460 },
      studio: {
        label: 'Colour by code', group: 'Tap & fill', icon: '🎨',
        blurb: 'Tap a legend colour, then tap the big regions it belongs to. Big, forgiving targets.',
        defaults: {
          legend: [{ key: 'red', color: '#F2784B' }, { key: 'teal', color: '#146B5E' }],
          regions: [{ rect: { x: 120, y: 300, w: 300, h: 300 }, correct: 'red', symbol: '1' }, { rect: { x: 460, y: 300, w: 300, h: 300 }, correct: 'teal', symbol: '2' }]
        },
        drawables: [{ kind: 'rect', bind: 'regions', authorable: 'studio', min: 1, addLabel: 'Add a region' }],
        fields: []
      }
    },

    validateTask: function (taskData, v) {
      var leg = taskData.legend, rg = taskData.regions;
      if (!Array.isArray(leg) || leg.length < 1) { v.error('sb-color-code: needs >= 1 legend colour'); return; }
      if (!Array.isArray(rg) || rg.length < 1) { v.error('sb-color-code: needs >= 1 region'); return; }
      var keys = {}; leg.forEach(function (l) { if (l && l.key) keys[l.key] = 1; });
      var z = v.zone || { w: 1600, h: 1000 };
      var band = v.band;
      var goalFloor = (band && (band.minGoalRegion || (band.fatal && band.fatal.minGoalRegion))) || 0;
      for (var i = 0; i < rg.length; i++) {
        var r = rg[i]; if (!r || !r.rect) { v.error('sb-color-code: regions[' + i + '] needs a rect'); continue; }
        var q = r.rect;
        if (q.x < 0 || q.y < 0 || q.x + q.w > z.w || q.y + q.h > z.h) v.error('sb-color-code: regions[' + i + '] rect is outside the zone ' + z.w + 'x' + z.h);
        if (!keys[r.correct]) v.error('sb-color-code: regions[' + i + '].correct "' + r.correct + '" is not a legend key');
        if (goalFloor && Math.min(q.w, q.h) < goalFloor) v.error('sb-color-code: regions[' + i + '] is ' + Math.min(q.w, q.h) + 'du < PK region floor ' + goalFloor + 'du (too small to tap)');
      }
      if (band && band.fatal) {
        if (rg.length > band.maxTaps) v.error('sb-color-code: ' + rg.length + ' regions > PK max ' + band.maxTaps + ' (too many for a 3-5yo)');
        if (band.minLegendSwatch && SWATCH < (band.fatal.minLegendSwatch || band.minLegendSwatch)) v.error('sb-color-code: legend swatch ' + SWATCH + 'du < PK floor');
      }
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var K = global.SBKit;
      var legend = [], regions = [], colorOf = {}, sel = null, correctCount = 0;
      var sv = null, swatchEls = {}, regionEls = [], eq = null, ghost = null;
      var swatchPos = {};   /* key -> {cx,cy} for hint/qa */

      function toVB(ev) { var r = sv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * ctx.zone.w, y: (ev.clientY - r.top) / r.height * ctx.zone.h }; }
      function pickSwatch(pt) {
        var half = SWATCH / 2, best = null, bd = Infinity;
        for (var k in swatchPos) { var s = swatchPos[k]; var d = Math.max(Math.abs(pt.x - s.cx), Math.abs(pt.y - s.cy)); if (d <= half && d < bd) { bd = d; best = k; } }
        return best;
      }
      function pickRegion(pt) {
        for (var i = 0; i < regions.length; i++) { var q = regions[i].rect; if (pt.x >= q.x && pt.x <= q.x + q.w && pt.y >= q.y && pt.y <= q.y + q.h) return i; }
        return -1;
      }
      function selectColor(k) {
        sel = k;
        for (var kk in swatchEls) swatchEls[kk].classList.toggle('sbcc-sel', kk === k);
      }
      function fill(i) {
        var r = regions[i]; if (r._done) return;
        r._done = true; correctCount++;
        regionEls[i].setAttribute('fill', colorOf[r.correct]); regionEls[i].setAttribute('fill-opacity', '1'); regionEls[i].setAttribute('stroke-dasharray', 'none');
        try { ctx.audio.pop(560); } catch (e) {}
        try { ctx.report.progress(correctCount / regions.length); } catch (e) {}
        if (correctCount >= regions.length) return finish();
      }
      function rejectRegion(i) {
        regionEls[i].classList.add('sbcc-bad');
        (function (el) { global.setTimeout(function () { el.classList.remove('sbcc-bad'); }, 500); }(regionEls[i]));
        if (eq) eq.onMiss();
        try { ctx.audio.pop(320); } catch (e) {}
      }
      function onDown(ev) {
        if (!enabled || done) return; ev.preventDefault();
        var pt = toVB(ev);
        var k = pickSwatch(pt);
        if (k) { selectColor(k); try { ctx.audio.pop(500); } catch (e) {} return; }
        var i = pickRegion(pt);
        if (i >= 0 && !regions[i]._done) {
          if (sel && regions[i].correct === sel) fill(i);
          else rejectRegion(i);
        }
      }
      function finish() { done = true; try { ctx.announce('all coloured'); } catch (e) {} ctx.report.success(); }

      return {
        mount: function (c) {
          ctx = c; injectCSS();
          legend = (ctx.taskData.legend || []).slice();
          regions = (ctx.taskData.regions || []).map(function (r) { return { rect: r.rect, correct: r.correct, symbol: r.symbol, _done: false }; });
          colorOf = {}; legend.forEach(function (l) { colorOf[l.key] = l.color; });
          correctCount = 0; sel = null;
          eq = K.equity(ctx, function () { /* muted/2-miss: (auto-select nothing) pulse the first legend swatch */ if (sv && legend[0]) { var e0 = swatchEls[legend[0].key]; if (e0) e0.classList.add('sbcc-sel'); } });

          var wrap = ctx.el('div', 'sbcc');
          sv = svg('svg', { class: 'sbcc-svg', viewBox: '0 0 ' + ctx.zone.w + ' ' + ctx.zone.h, preserveAspectRatio: 'xMidYMid meet' });
          sv.setAttribute('aria-label', 'Tap a colour, then tap the regions it fills');

          /* regions first (under the legend) */
          regionEls = regions.map(function (r, i) {
            var q = r.rect;
            var el = svg('rect', { class: 'sbcc-region', x: q.x, y: q.y, width: q.w, height: q.h, rx: 18 });
            sv.appendChild(el);
            if (r.symbol) { var t = svg('text', { class: 'sbcc-sym', x: q.x + q.w / 2, y: q.y + q.h / 2, 'font-size': Math.round(Math.min(q.w, q.h) * 0.5) }); t.textContent = r.symbol; sv.appendChild(t); }
            return el;
          });

          /* legend swatches along the top, evenly spaced */
          var n = legend.length, gap = 40;
          var totalW = n * SWATCH + (n - 1) * gap;
          var x0 = (ctx.zone.w - totalW) / 2, y0 = 40;
          swatchEls = {}; swatchPos = {};
          legend.forEach(function (l, i) {
            var x = x0 + i * (SWATCH + gap);
            var el = svg('rect', { class: 'sbcc-swatch', x: x, y: y0, width: SWATCH, height: SWATCH, rx: 24, fill: l.color });
            sv.appendChild(el); swatchEls[l.key] = el;
            swatchPos[l.key] = { cx: x + SWATCH / 2, cy: y0 + SWATCH / 2 };
          });

          sv.addEventListener('pointerdown', onDown);
          wrap.appendChild(sv);
          ctx.surface.el.appendChild(wrap);
          eq.maybeRevealMuted();
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          if (!sv) return;
          var i = -1; for (var k = 0; k < regions.length; k++) if (!regions[k]._done) { i = k; break; }
          if (i < 0) return;
          var r = sv.getBoundingClientRect();
          var sc = swatchPos[regions[i].correct];
          var rc = { x: regions[i].rect.x + regions[i].rect.w / 2, y: regions[i].rect.y + regions[i].rect.h / 2 };
          var toPx = function (p) { return { x: (p.x / ctx.zone.w) * r.width, y: (p.y / ctx.zone.h) * r.height }; };
          if (ghost) ghost.cancel();
          ghost = K.ghostHand(ctx.surface.el, [toPx({ x: sc.cx, y: sc.cy }), toPx(rc)], { reducedMotion: ctx.reducedMotion, icon: '👆' });
        },
        autoSolve: function () {
          enabled = true;
          for (var i = 0; i < regions.length && !done; i++) { selectColor(regions[i].correct); fill(i); }
          if (!done) finish();
        },
        qaGesture: function () {
          var pts = [];
          for (var i = 0; i < regions.length; i++) {
            var sc = swatchPos[regions[i].correct];
            pts.push({ x: sc.cx, y: sc.cy });
            pts.push({ x: regions[i].rect.x + regions[i].rect.w / 2, y: regions[i].rect.y + regions[i].rect.h / 2 });
          }
          return { kind: 'taps', pointsDu: pts, tol: 85, zone: { w: ctx.zone.w, h: ctx.zone.h } };
        },
        destroy: function () { done = true; enabled = false; if (ghost) { ghost.cancel(); ghost = null; } sv = null; regionEls = []; swatchEls = {}; swatchPos = {}; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
