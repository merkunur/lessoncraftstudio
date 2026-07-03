/* ============================================================================
   sb-mod-maze.js — NATIVE pre-school module: DRAG a token from the start dot to
   the goal along a WIDE themed corridor. Walls are solid but kind: a move that
   would cross a wall is simply refused — the token stays exactly where it is
   (a soft stop, NEVER a reset to the start). The child keeps sliding, routes
   around, and reaches the goal. No timer, no dead-end punishment. Corridor width
   comes from the band (pre-school = very wide).

   Page taskData:
     { "start": {"x":140,"y":500}, "end": {"x":1100,"y":260},
       "walls": [ {"x1":400,"y1":0,"x2":400,"y2":420}, ... ],   // barrier segments (du)
       "solution": [ {"x":140,"y":500}, {"x":140,"y":260}, {"x":1100,"y":260} ] }  // the route centreline
   completionMode: "auto".  Reads window.SBKit (sb-preschool-kit.js) + ctx.band.
   ========================================================================= */
(function (global) {
  'use strict';

  var TR = 70;    /* token radius (du) */
  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return; _cssDone = true;
    var css = [
      '.sbmz{position:relative;width:100%;height:100%;}',
      '.sbmz-svg{display:block;width:100%;height:100%;touch-action:none;}',
      '.sbmz-corr{fill:none;stroke:rgba(20,107,94,.10);stroke-linecap:round;stroke-linejoin:round;}',
      '.sbmz-wall{stroke:#8a6a4a;stroke-linecap:round;}',
      '.sbmz-end{fill:none;stroke:#F2784B;stroke-width:5;stroke-dasharray:14 12;}',
      '.sbmz-end.sbmz-lit{fill:rgba(242,120,75,.15);}',
      '.sbmz-start{fill:#146B5E;opacity:.5;}',
      '.sbmz-token{cursor:grab;}',
      '@keyframes sbmz-bump{0%,100%{opacity:1;}50%{opacity:.55;}}',
      '.sbmz-token.sbmz-bump{animation:sbmz-bump .28s ease;}',
      '@media (prefers-reduced-motion: reduce){.sbmz-token.sbmz-bump{animation:none;}}'
    ].join('\n');
    var st = global.document.createElement('style'); st.id = 'sbmz-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) { var e = global.document.createElementNS(SVGNS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function polyD(pts) { var d = ''; for (var i = 0; i < pts.length; i++) d += (i ? 'L' : 'M') + pts[i].x + ',' + pts[i].y + ' '; return d.trim(); }

  global.SBModules.register({
    meta: {
      type: 'sb-maze', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 640, h: 480 },
      studio: {
        label: 'Find the way', group: 'Trace & route', icon: '🧭',
        blurb: 'Drag a token through a wide, forgiving corridor to the goal — walls softly stop, never reset.',
        defaults: {
          start: { x: 160, y: 520 }, end: { x: 1120, y: 240 },
          walls: [{ x1: 460, y1: 0, x2: 460, y2: 400 }],
          solution: [{ x: 160, y: 520 }, { x: 160, y: 240 }, { x: 1120, y: 240 }]
        },
        drawables: [{ kind: 'maze', bind: 'walls', authorable: 'data', addLabel: 'Draw the walls' }],
        fields: []
      }
    },

    validateTask: function (taskData, v) {
      var s = taskData.start, e = taskData.end, w = taskData.walls, sol = taskData.solution;
      var z = v.zone || { w: 1600, h: 1000 }; var band = v.band;
      if (!s || !isFinite(s.x) || !isFinite(s.y)) v.error('sb-maze: needs start:{x,y}');
      if (!e || !isFinite(e.x) || !isFinite(e.y)) v.error('sb-maze: needs end:{x,y}');
      if (!Array.isArray(w) || w.length < 1) v.error('sb-maze: needs >= 1 wall');
      if (!Array.isArray(sol) || sol.length < 2) { v.error('sb-maze: needs a solution route (>= 2 points)'); }
      else {
        if (s && Math.hypot(sol[0].x - s.x, sol[0].y - s.y) > 40) v.error('sb-maze: solution[0] must be the start');
        if (e && Math.hypot(sol[sol.length - 1].x - e.x, sol[sol.length - 1].y - e.y) > 40) v.error('sb-maze: solution end must be the goal');
        /* the solution route must NOT cross any wall (a valid corridor) */
        if (Array.isArray(w) && global.SBKit) {
          for (var i = 0; i < sol.length - 1; i++) for (var j = 0; j < w.length; j++) {
            if (global.SBKit.hit.segIntersect(sol[i], sol[i + 1], { x: w[j].x1, y: w[j].y1 }, { x: w[j].x2, y: w[j].y2 }))
              v.error('sb-maze: the solution route crosses wall[' + j + '] — it must stay in the corridor');
          }
        }
      }
      [['start', s], ['end', e]].forEach(function (pr) { var p = pr[1]; if (p && (p.x < 0 || p.y < 0 || p.x > z.w || p.y > z.h)) v.error('sb-maze: ' + pr[0] + ' is outside the zone ' + z.w + 'x' + z.h); });
      if (band && band.fatal) {
        var corr = taskData.corridorWidth || band.mazeCorridorWidth || 300;
        if (corr < band.fatal.mazeCorridorWidth) v.error('sb-maze: corridor ' + corr + 'du < PK floor ' + band.fatal.mazeCorridorWidth + 'du');
      }
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var K = global.SBKit;
      var start = null, end = null, walls = [], corridor = 300, endSnap = 200;
      var sv = null, tokenG = null, tok = null, endEl = null, eq = null, ghost = null, drag = null, sol = null;

      function toVB(ev) { var r = sv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * ctx.zone.w, y: (ev.clientY - r.top) / r.height * ctx.zone.h }; }
      function setPos(x, y) { tok.x = x; tok.y = y; tokenG.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')'); }
      function crossesWall(a, b) {
        for (var i = 0; i < walls.length; i++) { if (K.hit.segIntersect(a, b, { x: walls[i].x1, y: walls[i].y1 }, { x: walls[i].x2, y: walls[i].y2 })) return true; }
        return false;
      }
      function bump() { tokenG.classList.add('sbmz-bump'); (function (g) { global.setTimeout(function () { g.classList.remove('sbmz-bump'); }, 280); }(tokenG)); try { ctx.audio.pop(300); } catch (e) {} }
      function tryReachEnd() { if (Math.hypot(tok.x - end.x, tok.y - end.y) <= endSnap) { seat(); return true; } return false; }
      function seat() {
        done = true; setPos(end.x, end.y); if (endEl) endEl.classList.remove('sbmz-lit');
        try { ctx.audio.pop(560); } catch (e) {} try { ctx.announce('reached the goal'); } catch (e) {}
        ctx.report.success();
      }

      function beginDrag(ev) { if (!enabled || done) return; var pt = toVB(ev); tok.grab = { dx: tok.x - pt.x, dy: tok.y - pt.y }; try { sv.appendChild(tokenG); } catch (e) {} }
      function moveDrag(ev) {
        if (done) return;
        var pt = toVB(ev); var want = { x: pt.x + tok.grab.dx, y: pt.y + tok.grab.dy };
        want.x = Math.max(TR, Math.min(ctx.zone.w - TR, want.x)); want.y = Math.max(TR, Math.min(ctx.zone.h - TR, want.y));
        /* advance toward `want` as far as the walls allow — soft stop, never reset */
        var from = { x: tok.x, y: tok.y };
        var steps = 6, moved = from, i;
        for (i = 1; i <= steps; i++) {
          var c = { x: from.x + (want.x - from.x) * i / steps, y: from.y + (want.y - from.y) * i / steps };
          if (crossesWall(moved, c)) { bump(); break; }
          moved = c;
        }
        setPos(moved.x, moved.y);
        if (endEl) endEl.classList.toggle('sbmz-lit', Math.hypot(tok.x - end.x, tok.y - end.y) <= endSnap);
        tryReachEnd();
      }
      function endDrag() { if (done) return; tryReachEnd(); /* token persists where it is — no reset */ }

      return {
        mount: function (c) {
          ctx = c; injectCSS();
          var band = ctx.band || {};
          start = { x: +ctx.taskData.start.x, y: +ctx.taskData.start.y };
          end = { x: +ctx.taskData.end.x, y: +ctx.taskData.end.y };
          walls = (ctx.taskData.walls || []).slice();
          sol = (ctx.taskData.solution || [start, end]).map(function (p) { return { x: +p.x, y: +p.y }; });
          corridor = ctx.taskData.corridorWidth || band.mazeCorridorWidth || 300;
          endSnap = band.nearFitSnapRadius || 200;
          eq = K.equity(ctx, function () { /* muted/2-miss: trace the solution route faintly */ if (sv) { var g = sv.querySelector('.sbmz-corr'); if (g) g.setAttribute('stroke', 'rgba(242,120,75,.35)'); } });

          var wrap = ctx.el('div', 'sbmz');
          sv = svg('svg', { class: 'sbmz-svg', viewBox: '0 0 ' + ctx.zone.w + ' ' + ctx.zone.h, preserveAspectRatio: 'xMidYMid meet' });
          sv.setAttribute('aria-label', 'Drag the token through the path to the goal');

          /* the wide corridor (a soft hint of the route) */
          sv.appendChild(svg('path', { class: 'sbmz-corr', d: polyD(sol), 'stroke-width': corridor }));
          /* walls */
          walls.forEach(function (w) { sv.appendChild(svg('line', { class: 'sbmz-wall', x1: w.x1, y1: w.y1, x2: w.x2, y2: w.y2, 'stroke-width': 26 })); });
          /* start + goal markers */
          sv.appendChild(svg('circle', { class: 'sbmz-start', cx: start.x, cy: start.y, r: TR }));
          endEl = svg('circle', { class: 'sbmz-end', cx: end.x, cy: end.y, r: TR + 30 }); sv.appendChild(endEl);
          /* the draggable token */
          tokenG = svg('g', { class: 'sbmz-token' });
          tokenG.appendChild(svg('circle', { cx: 0, cy: 0, r: TR, fill: '#F2784B', stroke: '#fff', 'stroke-width': 5 }));
          sv.appendChild(tokenG);
          tok = { x: start.x, y: start.y, grab: { dx: 0, dy: 0 } };
          tokenG.setAttribute('transform', 'translate(' + start.x + ',' + start.y + ')');
          drag = K.drag2d(tokenG, { canStart: function () { return enabled && !done; }, onStart: beginDrag, onMove: moveDrag, onEnd: endDrag });

          wrap.appendChild(sv);
          ctx.surface.el.appendChild(wrap);
          eq.maybeRevealMuted();
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          if (!sv) return;
          var r = sv.getBoundingClientRect();
          var demo = sol.map(function (p) { return { x: (p.x / ctx.zone.w) * r.width, y: (p.y / ctx.zone.h) * r.height }; });
          if (ghost) ghost.cancel();
          ghost = K.ghostHand(ctx.surface.el, demo, { reducedMotion: ctx.reducedMotion, icon: '👆' });
        },
        autoSolve: function () { enabled = true; if (!done) seat(); },
        qaGesture: function () { return { kind: 'path', pointsDu: sol.slice(), tol: Math.max(120, corridor / 2 - TR), zone: { w: ctx.zone.w, h: ctx.zone.h } }; },
        destroy: function () { done = true; enabled = false; if (drag) { try { drag.destroy(); } catch (e) {} drag = null; } if (ghost) { ghost.cancel(); ghost = null; } sv = null; walls = []; tokenG = null; tok = null; endEl = null; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
