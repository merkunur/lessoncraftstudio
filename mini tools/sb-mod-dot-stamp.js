/* ============================================================================
   sb-mod-dot-stamp.js — NATIVE pre-school module: TAP to stamp dots, filling a
   form (a ladybird's spots, a flower's petals, snowflakes on a hill). Each tap
   snaps to the nearest unfilled target within a WIDE forgiveness radius (a 3-5yo
   aims roughly; a near-enough tap counts). Stamps only grow — nothing is ever
   un-stamped and a stray tap in empty space is a gentle no-op, never a penalty.
   Completes at the band's coverage threshold (so one missed spot still finishes).

   Page taskData:
     { "dots": [ {"x":200,"y":200}, {"x":600,"y":200}, ... ],  // zone-relative du target centres
       "snapDu": 220,          // OPTIONAL tap forgiveness radius (default = ctx.band.nearFitSnapRadius)
       "stampColor": "#F2784B",// OPTIONAL stamp fill
       "subject": { "image": "img.ladybird", "alt": "@key" } }  // OPTIONAL backdrop image
   completionMode: "auto".  Reads window.SBKit (sb-preschool-kit.js) + ctx.band.
   ========================================================================= */
(function (global) {
  'use strict';

  var GHOST_R = 90;   /* visible target-ring radius (du); the SNAP radius is far larger */
  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return; _cssDone = true;
    var css = [
      '.sbds{position:relative;width:100%;height:100%;}',
      '.sbds-svg{display:block;width:100%;height:100%;touch-action:none;cursor:pointer;}',
      '.sbds-target{fill:rgba(20,107,94,.06);stroke:rgba(20,107,94,.45);stroke-dasharray:10 12;stroke-linecap:round;}',
      '.sbds-target.sbds-pulse{animation:sbds-pulse 1.1s ease-in-out infinite;}',
      '@keyframes sbds-pulse{0%,100%{opacity:.5;}50%{opacity:1;}}',
      '.sbds-stamp{stroke:#fff;stroke-width:3;}',
      '@media (prefers-reduced-motion: reduce){.sbds-target.sbds-pulse{animation:none;opacity:.85;}}'
    ].join('\n');
    var st = global.document.createElement('style'); st.id = 'sbds-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) { var e = global.document.createElementNS(SVGNS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

  global.SBModules.register({
    meta: {
      type: 'sb-dot-stamp', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 480, h: 360 },
      studio: {
        label: 'Stamp the dots', group: 'Tap & fill', icon: '🔴',
        blurb: 'Tap to stamp dots onto a form — wide, forgiving tap targets; fills as you go.',
        defaults: { dots: [{ x: 240, y: 220 }, { x: 560, y: 220 }, { x: 400, y: 460 }], stampColor: '#F2784B' },
        drawables: [{ kind: 'point', bind: 'dots', authorable: 'studio', min: 1, addLabel: 'Add a dot target' }],
        fields: [
          { key: 'stampColor', kind: 'text', label: 'Stamp colour (hex)', optional: true },
          { key: 'subject', kind: 'assetRef', label: 'Backdrop image', optional: true }
        ]
      }
    },

    validateTask: function (taskData, v) {
      var d = taskData.dots;
      if (!Array.isArray(d) || d.length < 1) { v.error('sb-dot-stamp: needs >= 1 dot target'); return; }
      var z = v.zone || { w: 1600, h: 1000 };
      var band = v.band;
      var snap = taskData.snapDu || (band && band.nearFitSnapRadius) || 200;
      for (var i = 0; i < d.length; i++) {
        var p = d[i];
        if (!p || !isFinite(p.x) || !isFinite(p.y)) { v.error('sb-dot-stamp: dots[' + i + '] needs {x,y}'); continue; }
        if (p.x < 0 || p.y < 0 || p.x > z.w || p.y > z.h) v.error('sb-dot-stamp: dots[' + i + '] {' + p.x + ',' + p.y + '} is outside the zone ' + z.w + 'x' + z.h);
        for (var j = i + 1; j < d.length; j++) {
          var q = d[j]; if (!q) continue;
          if (Math.hypot(p.x - q.x, p.y - q.y) < 2 * GHOST_R) v.error('sb-dot-stamp: dots[' + i + '] and [' + j + '] overlap (keep centres >= ' + (2 * GHOST_R) + 'du apart)');
        }
      }
      if (band && band.fatal) {
        if (d.length > band.maxTaps) v.error('sb-dot-stamp: ' + d.length + ' dots > PK max ' + band.maxTaps + ' taps (too many for a 3-5yo)');
        if (2 * snap < band.fatal.minTapTarget) v.error('sb-dot-stamp: tap target ' + (2 * snap) + 'du < PK floor ' + band.fatal.minTapTarget + 'du (snapDu too small)');
      }
      if (taskData.subject && taskData.subject.alt && String(taskData.subject.alt).charAt(0) === '@') v.stringExists(String(taskData.subject.alt).slice(1));
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var K = global.SBKit;
      var dots = [], filled = [], snap = 200, need = 1;
      var sv = null, targetEls = [], eq = null, ghost = null;

      function toVB(ev) { var r = sv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * ctx.zone.w, y: (ev.clientY - r.top) / r.height * ctx.zone.h }; }
      function countFilled() { var n = 0; for (var i = 0; i < filled.length; i++) if (filled[i]) n++; return n; }
      function stamp(i) {
        if (filled[i]) return;
        filled[i] = true;
        var color = ctx.taskData.stampColor || '#F2784B';
        sv.appendChild(svg('circle', { class: 'sbds-stamp', cx: dots[i].x, cy: dots[i].y, r: GHOST_R * 0.82, fill: color }));
        if (targetEls[i]) targetEls[i].setAttribute('opacity', '0');
        try { ctx.audio.pop(560); } catch (e) {}
        try { ctx.report.progress(countFilled() / dots.length); } catch (e) {}
        if (countFilled() >= need) return finish();
      }
      function nearestUnfilled(pt) {
        var bi = -1, bd = Infinity;
        for (var i = 0; i < dots.length; i++) { if (filled[i]) continue; var dd = Math.hypot(pt.x - dots[i].x, pt.y - dots[i].y); if (dd < bd) { bd = dd; bi = i; } }
        return { i: bi, d: bd };
      }
      function onDown(ev) {
        if (!enabled || done) return; ev.preventDefault();
        var pt = toVB(ev); var n = nearestUnfilled(pt);
        if (n.i >= 0 && n.d <= snap) { clearPulse(); stamp(n.i); }
        else { if (eq) eq.onMiss(); try { ctx.audio.pop(340); } catch (e) {} }
      }
      function clearPulse() { for (var i = 0; i < targetEls.length; i++) if (targetEls[i]) targetEls[i].classList.remove('sbds-pulse'); }
      function pulseUnfilled() { for (var i = 0; i < targetEls.length; i++) if (targetEls[i] && !filled[i]) targetEls[i].classList.add('sbds-pulse'); }
      function finish() {
        done = true;
        try { ctx.announce('all stamped'); } catch (e) {}
        ctx.report.success();
      }

      return {
        mount: function (c) {
          ctx = c; injectCSS();
          var band = ctx.band || {};
          dots = (ctx.taskData.dots || []).map(function (p) { return { x: +p.x, y: +p.y }; });
          filled = dots.map(function () { return false; });
          snap = ctx.taskData.snapDu || band.nearFitSnapRadius || 200;
          var thr = band.coverageCompletionThreshold || 0.85;
          need = Math.max(1, Math.ceil(dots.length * thr));
          eq = K.equity(ctx, function () { pulseUnfilled(); });

          var wrap = ctx.el('div', 'sbds');
          sv = svg('svg', { class: 'sbds-svg', viewBox: '0 0 ' + ctx.zone.w + ' ' + ctx.zone.h, preserveAspectRatio: 'xMidYMid meet' });
          sv.setAttribute('aria-label', 'Tap to stamp the dots');
          if (ctx.taskData.subject && ctx.taskData.subject.image) {
            try {
              var href = ctx.assets.url(ctx.taskData.subject.image);
              var im = svg('image', { x: ctx.zone.w * 0.15, y: ctx.zone.h * 0.08, width: ctx.zone.w * 0.7, height: ctx.zone.h * 0.7, preserveAspectRatio: 'xMidYMid meet' });
              im.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href); im.setAttribute('href', href);
              sv.appendChild(im);
            } catch (e) {}
          }
          targetEls = dots.map(function (p) { var t = svg('circle', { class: 'sbds-target', cx: p.x, cy: p.y, r: GHOST_R, 'stroke-width': 8 }); sv.appendChild(t); return t; });
          sv.addEventListener('pointerdown', onDown);
          wrap.appendChild(sv);
          ctx.surface.el.appendChild(wrap);
          eq.maybeRevealMuted();
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          if (!sv) return;
          var i = filled.indexOf(false); if (i < 0) return;
          var r = sv.getBoundingClientRect();
          var px = { x: (dots[i].x / ctx.zone.w) * r.width, y: (dots[i].y / ctx.zone.h) * r.height };
          if (ghost) ghost.cancel();
          ghost = K.ghostHand(ctx.surface.el, [px], { reducedMotion: ctx.reducedMotion, icon: '👆' });
        },
        autoSolve: function () { enabled = true; for (var i = 0; i < dots.length && !done; i++) stamp(i); if (!done) finish(); },
        qaGesture: function () { return { kind: 'taps', pointsDu: dots.slice(), tol: snap, zone: { w: ctx.zone.w, h: ctx.zone.h } }; },
        destroy: function () { done = true; enabled = false; if (ghost) { ghost.cancel(); ghost = null; } dots = []; filled = []; sv = null; targetEls = []; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
