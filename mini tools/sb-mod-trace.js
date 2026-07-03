/* ============================================================================
   sb-mod-trace.js — NATIVE pre-school module: finger-TRACING a path (letterform,
   shape, numeral, or free path). Progressive "ink" fills as the child traces along
   the path; progress is gated on FORWARD arc-length (a wobbly-but-forward finger keeps
   inking), never on lateral accuracy. Off-path beyond the band → a soft guide-back
   nudge after a grace window; the ink NEVER un-fills and the finger is NEVER reset.
   Completes at ~90% arc covered. Tolerances come from ctx.band (pre-school = wide).

   Page taskData:
     { "path": [ {"x":120,"y":300}, {"x":300,"y":120}, ... ],  // zone-relative design-unit pts
       "tolDu": 130,           // OPTIONAL band half-width override (default = ctx.band.pathBandHalfWidth)
       "glyph": "S",           // OPTIONAL on-screen/announced label
       "word":  "@p.trace.s" } // OPTIONAL spoken word
   completionMode: "auto".  Reads window.SBKit (sb-preschool-kit.js).
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbtr{position:relative;width:100%;height:100%;}',
      '.sbtr-svg{display:block;width:100%;height:100%;touch-action:none;cursor:pointer;}',
      '.sbtr-band{fill:none;stroke:rgba(20,107,94,.12);stroke-linecap:round;stroke-linejoin:round;}',
      '.sbtr-guide{fill:none;stroke:rgba(20,107,94,.55);stroke-linecap:round;stroke-linejoin:round;}',
      '.sbtr-ink{fill:none;stroke:#146B5E;stroke-linecap:round;stroke-linejoin:round;}',
      '.sbtr-start{fill:#F2784B;stroke:#fff;stroke-width:2;}',
      '@keyframes sbtr-pulse{0%,100%{opacity:.35;}50%{opacity:.9;}}',
      '.sbtr-nudge{fill:#F2784B;animation:sbtr-pulse 1s ease-in-out infinite;}',
      '@media (prefers-reduced-motion: reduce){.sbtr-nudge{animation:none;opacity:.75;}}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbtr-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) {
    var e = global.document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function polyD(pts) {
    var d = '';
    for (var i = 0; i < pts.length; i++) d += (i ? 'L' : 'M') + pts[i].x.toFixed(1) + ',' + pts[i].y.toFixed(1) + ' ';
    return d.trim();
  }
  /* the sub-polyline from the start up to arc-length L (with a partial final point) */
  function subPathTo(pts, L) {
    if (L <= 0) return [pts[0]];
    var out = [pts[0]], acc = 0;
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var seg = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
      if (acc + seg >= L) {
        var t = seg > 0 ? (L - acc) / seg : 0;
        out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
        return out;
      }
      out.push(b); acc += seg;
    }
    return out;
  }

  global.SBModules.register({
    meta: {
      type: 'sb-trace', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 480, h: 360 },
      studio: {
        label: 'Trace the path', group: 'Write & trace', icon: '✏️',
        blurb: 'A line/letter/shape the child follows with a finger — wide, forgiving band.',
        defaults: { path: [{ x: 120, y: 240 }, { x: 360, y: 240 }], glyph: '', word: '' },
        drawables: [{ kind: 'path', bind: 'path', authorable: 'data', minPoints: 2, addLabel: 'Draw the path' }],
        fields: [
          { key: 'glyph', kind: 'text', label: 'Label (optional)', optional: true },
          { key: 'word', kind: 'stringRef', label: 'Spoken word', keyHint: 'word', optional: true }
        ]
      }
    },

    validateTask: function (taskData, v) {
      var p = taskData.path;
      if (!Array.isArray(p) || p.length < 2) { v.error('sb-trace: path needs >= 2 points'); return; }
      var z = v.zone || { w: 1600, h: 1000 };
      var len = 0;
      for (var i = 0; i < p.length; i++) {
        var pt = p[i];
        if (!pt || !isFinite(pt.x) || !isFinite(pt.y)) { v.error('sb-trace: path[' + i + '] needs {x,y}'); continue; }
        if (pt.x < 0 || pt.y < 0 || pt.x > z.w || pt.y > z.h) v.error('sb-trace: path[' + i + '] {' + pt.x + ',' + pt.y + '} is outside the zone ' + z.w + 'x' + z.h);
        if (i > 0) { var q = p[i - 1]; len += Math.sqrt((pt.x - q.x) * (pt.x - q.x) + (pt.y - q.y) * (pt.y - q.y)); }
      }
      if (len < 80) v.error('sb-trace: path is too short to trace (' + Math.round(len) + 'du)');
      /* PK FATAL: the effective band tolerance must clear the pre-school floor. */
      if (v.band && v.band.fatal) {
        var tol = (taskData.tolDu || v.band.pathBandHalfWidth);
        if (tol < v.band.fatal.pathBandHalfWidth) v.error('sb-trace: tolerance ' + tol + 'du < PK path-band floor ' + v.band.fatal.pathBandHalfWidth + 'du (too precise for 3-5yo)');
      }
      if (typeof taskData.word === 'string' && taskData.word.charAt(0) === '@') v.stringExists(taskData.word.slice(1));
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var K = global.SBKit;
      var path = null, tol = 130, total = 0, maxStep = 200;
      var progress = 0, drawing = false;
      var sv = null, inkEl = null, nudgeEl = null;
      var grace = { off: false, sinceMs: 0 };
      var eq = null, ghost = null;

      function toVB(ev) {
        var r = sv.getBoundingClientRect();
        return { x: (ev.clientX - r.left) / r.width * ctx.zone.w, y: (ev.clientY - r.top) / r.height * ctx.zone.h };
      }
      function paintInk() {
        inkEl.setAttribute('d', polyD(subPathTo(path, progress)));
      }
      function clearNudge() { if (nudgeEl) { nudgeEl.setAttribute('opacity', '0'); } grace.off = false; }
      function showGuideBack(nearPt) {
        /* a soft pulsing dot on the centerline just AHEAD of current progress — "this way" */
        var aheadArc = Math.min(total, progress + Math.max(60, tol));
        var ahead = subPathTo(path, aheadArc); var tip = ahead[ahead.length - 1];
        if (!nudgeEl) { nudgeEl = svg('circle', { class: 'sbtr-nudge', r: Math.round(tol * 0.35) }); sv.appendChild(nudgeEl); }
        nudgeEl.setAttribute('cx', tip.x.toFixed(1)); nudgeEl.setAttribute('cy', tip.y.toFixed(1));
        nudgeEl.setAttribute('opacity', '1');
        if (eq) eq.onMiss();
        try { ctx.audio.pop(360); } catch (e) {}
      }
      function onDown(ev) {
        if (!enabled || done) return;
        ev.preventDefault(); drawing = true;
        try { sv.setPointerCapture(ev.pointerId); } catch (e) {}
        advance(toVB(ev), 0);
      }
      function onMove(ev) { if (drawing) advance(toVB(ev), 16); }
      function onUp() { drawing = false; clearNudge(); }

      /* the forward-arc gate: ink advances ONLY when the finger is on-band AND ahead of
         current progress by no more than maxStep (so you must trace THROUGH, can't jump to
         the end). Off-band → grace, then a soft guide-back. Progress never decreases. */
      function advance(pt, dtMs) {
        if (done) return;
        var n = K.hit.nearestOnPath(pt.x, pt.y, path);
        if (n.dist <= tol) {
          clearNudge();
          if (n.arc > progress && n.arc <= progress + maxStep) {
            progress = n.arc; paintInk();
            if (progress >= total * 0.9) return finish();
          }
        } else {
          /* off-band: accumulate grace; nudge once past the grace window */
          var band = ctx.band || {};
          if (!grace.off) { grace.off = true; grace.sinceMs = 0; grace.dist = n.dist; }
          grace.sinceMs += dtMs;
          var overDist = (n.dist - tol) > (band.offPathGraceDu || 100);
          var overTime = grace.sinceMs > (band.offPathGraceMs || 600);
          if (overDist || overTime) showGuideBack(n);
        }
      }
      function finish() {
        done = true; drawing = false; progress = total; paintInk(); clearNudge();
        try { ctx.announce((ctx.taskData.glyph ? ctx.taskData.glyph + ' — ' : '') + 'traced'); } catch (e) {}
        ctx.report.success();
      }

      return {
        mount: function (c) {
          ctx = c; injectCSS();
          var band = ctx.band || {};
          path = (ctx.taskData.path || []).map(function (p) { return { x: +p.x, y: +p.y }; });
          tol = ctx.taskData.tolDu || band.pathBandHalfWidth || 130;
          total = K.hit.pathLength(path);
          maxStep = Math.max(tol * 2, total * 0.2);
          eq = K.equity(ctx, function () {/* muted/2-miss: the pulsing guide already carries direction visually */ if (progress < total) showGuideBackStatic(); });

          var wrap = ctx.el('div', 'sbtr');
          sv = svg('svg', { class: 'sbtr-svg', viewBox: '0 0 ' + ctx.zone.w + ' ' + ctx.zone.h, preserveAspectRatio: 'xMidYMid meet' });
          sv.setAttribute('aria-label', (ctx.taskData.glyph ? 'Trace ' + ctx.taskData.glyph : 'Trace the line'));
          /* faint corridor (the band) + dashed centerline guide */
          sv.appendChild(svg('path', { class: 'sbtr-band', d: polyD(path), 'stroke-width': Math.round(tol * 2) }));
          sv.appendChild(svg('path', { class: 'sbtr-guide', d: polyD(path), 'stroke-width': Math.max(6, Math.round(tol * 0.14)), 'stroke-dasharray': Math.round(tol * 0.1) + ' ' + Math.round(tol * 0.6) }));
          inkEl = svg('path', { class: 'sbtr-ink', d: '', 'stroke-width': Math.max(10, Math.round(tol * 0.5)) });
          sv.appendChild(inkEl);
          sv.appendChild(svg('circle', { class: 'sbtr-start', cx: path[0].x, cy: path[0].y, r: Math.max(10, Math.round(tol * 0.4)) }));
          sv.addEventListener('pointerdown', onDown);
          sv.addEventListener('pointermove', onMove);
          sv.addEventListener('pointerup', onUp);
          sv.addEventListener('pointercancel', onUp);
          wrap.appendChild(sv);
          ctx.surface.el.appendChild(wrap);
          eq.maybeRevealMuted();
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          /* ghost hand traces the first ~30% of the path (px), then withdraws */
          if (!sv) return;
          var r = sv.getBoundingClientRect();
          var demoArc = total * 0.3;
          var demo = subPathTo(path, demoArc).map(function (p) {
            return { x: (p.x / ctx.zone.w) * r.width, y: (p.y / ctx.zone.h) * r.height };
          });
          if (ghost) ghost.cancel();
          ghost = K.ghostHand(ctx.surface.el, demo, { reducedMotion: ctx.reducedMotion, icon: '👆' });
        },
        autoSolve: function () {
          enabled = true; progress = total; if (inkEl) paintInk(); finish();
        },
        /* DEV QA seam: geometry + tolerance for the imprecise-touch driver */
        qaGesture: function () { return { kind: 'path', pointsDu: path, tol: tol, zone: { w: ctx.zone.w, h: ctx.zone.h } }; },
        destroy: function () {
          done = true; enabled = false; drawing = false;
          if (ghost) { ghost.cancel(); ghost = null; }
          path = null; sv = null; inkEl = null; nudgeEl = null;
        }
      };

      function showGuideBackStatic() { try { showGuideBack({ dist: tol + 1 }); } catch (e) {} }
    }
  });
}(typeof window !== 'undefined' ? window : this));
