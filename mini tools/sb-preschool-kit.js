/* ============================================================================
   sb-preschool-kit.js — shared helpers for the pre-school interaction modules.

   A PEER script (like LCS.drag / *-core.js) that new PK modules opt into — it does
   NOT touch the protected socket (storybook-interaction.js). Exposes `global.SBKit`
   (browser) + `module.exports` (Node, so `hit` geometry is unit-testable and reusable
   inside a module's validateTask). Born from what sb-trace needs; widened at the
   boundary by later modules (drag2d lands with the first drag module, segIntersect
   with the maze). The line: geometry + gesture + a11y-equity + hint-motion = kit;
   task meaning + SVG markup + taskData shape = per-module.

   All geometry is DESIGN UNITS unless a module maps to a local (%/viewBox) space.
   ========================================================================= */
(function (root, factory) {
  'use strict';
  var K = factory();
  if (typeof module !== 'undefined' && module.exports) { module.exports = K; }
  if (typeof window !== 'undefined') { window.SBKit = K; }
}(this, function () {
  'use strict';

  /* ---- pure geometry (Node-testable; reused by validateTask + runtime) ---- */
  function dist(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return Math.sqrt(dx * dx + dy * dy); }

  function pointInRect(px, py, r) {
    return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
  }

  /* ray-cast even-odd; poly = [{x,y},...] */
  function pointInPoly(px, py, poly) {
    var inside = false, n = poly.length;
    for (var i = 0, j = n - 1; i < n; j = i++) {
      var xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
      var hit = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / ((yj - yi) || 1e-9) + xi);
      if (hit) inside = !inside;
    }
    return inside;
  }

  /* closest point on a polyline to (px,py). Returns {dist, seg, t, arc} where arc is the
     cumulative arc-length up to the projection (used by sb-trace's forward-only progress gate). */
  function nearestOnPath(px, py, pts) {
    var best = { dist: Infinity, seg: 0, t: 0, arc: 0 };
    var acc = 0;
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var vx = b.x - a.x, vy = b.y - a.y;
      var len2 = vx * vx + vy * vy;
      var t = len2 > 0 ? ((px - a.x) * vx + (py - a.y) * vy) / len2 : 0;
      if (t < 0) t = 0; else if (t > 1) t = 1;
      var cx = a.x + t * vx, cy = a.y + t * vy;
      var d = dist(px, py, cx, cy);
      if (d < best.dist) {
        best.dist = d; best.seg = i; best.t = t;
        best.arc = acc + t * Math.sqrt(len2);
        best.x = cx; best.y = cy;
      }
      acc += Math.sqrt(len2);
    }
    best.total = acc;
    return best;
  }

  function pathLength(pts) {
    var acc = 0;
    for (var i = 0; i < pts.length - 1; i++) acc += dist(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
    return acc;
  }

  /* segment intersection (used later by sb-maze wall collision) */
  function segIntersect(p1, p2, p3, p4) {
    function ccw(a, b, c) { return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x); }
    return ccw(p1, p3, p4) !== ccw(p2, p3, p4) && ccw(p1, p2, p3) !== ccw(p1, p2, p4);
  }

  /* ---- a11y: audio-equity (the sb-listen muted-or-2-miss pattern, centralized) ----
     reveal() is the module's own "show the visual/text tell" callback. Fires immediately
     when muted, or once misses reach band.missEquity. Returns {onMiss, maybeRevealMuted}. */
  function equity(ctx, reveal) {
    var misses = 0, revealed = false;
    var band = ctx.band || {};
    var thresh = band.missEquity || 3;
    function doReveal() { if (!revealed) { revealed = true; try { reveal(); } catch (e) {} } }
    return {
      maybeRevealMuted: function () {
        try { if (band.muteEquity !== false && global_SBAudioMuted()) doReveal(); } catch (e) {}
      },
      onMiss: function () { misses++; if (misses >= thresh) doReveal(); return misses; },
      forceReveal: doReveal
    };
    function global_SBAudioMuted() {
      return (typeof window !== 'undefined' && window.SBAudio && window.SBAudio.muted && window.SBAudio.muted());
    }
  }

  /* ---- ghost-hand hint: a translucent hand demonstrates the first correct gesture,
     then withdraws (never completes the task). Reduced-motion → a static pointing hand
     + connector at the start, carrying the same info without motion. `path` = [{x,y}] in
     the host element's local px; `hostEl` is where the hand is appended (removed by caller's
     destroy, or auto after the run). Returns a handle with cancel(). ---- */
  function ensureGhostCss(doc) {
    if (doc.getElementById('sbkit-ghost-css')) return;
    var css = [
      '.sbkit-ghost{position:absolute;left:0;top:0;width:56px;height:56px;pointer-events:none;',
      '  z-index:20;font-size:44px;line-height:1;filter:drop-shadow(0 3px 5px rgba(0,0,0,.3));',
      '  transform:translate(-30%,-10%);transition:none;opacity:.92;}',
      '.sbkit-ghost.sbkit-fade{opacity:0;transition:opacity .4s ease;}',
      '@media (prefers-reduced-motion: reduce){.sbkit-ghost{transition:none;}}'
    ].join('\n');
    var st = doc.createElement('style'); st.id = 'sbkit-ghost-css'; st.textContent = css;
    doc.head.appendChild(st);
  }

  function ghostHand(hostEl, pathPx, opts) {
    opts = opts || {};
    var doc = hostEl.ownerDocument || (typeof document !== 'undefined' && document);
    if (!doc || !pathPx || !pathPx.length) return { cancel: function () {} };
    ensureGhostCss(doc);
    var hand = doc.createElement('div');
    hand.className = 'sbkit-ghost';
    hand.textContent = opts.icon || '👆';
    hand.setAttribute('aria-hidden', 'true');
    hostEl.appendChild(hand);
    function place(pt) { hand.style.transform = 'translate(-30%,-10%) translate(' + Math.round(pt.x) + 'px,' + Math.round(pt.y) + 'px)'; }
    place(pathPx[0]);

    var cancelled = false, timers = [];
    function cleanup() {
      cancelled = true;
      timers.forEach(function (t) { clearTimeout(t); });
      if (hand.parentNode) hand.parentNode.removeChild(hand);
    }

    if (opts.reducedMotion || pathPx.length < 2) {
      /* static: hand rests at the start; the module draws its own static connector/highlight */
      timers.push(setTimeout(function () { hand.classList.add('sbkit-fade'); }, 1800));
      timers.push(setTimeout(cleanup, 2400));
    } else {
      /* animate the hand along the demo path (a fraction of it), then withdraw */
      var i = 0, stepMs = opts.stepMs || 90;
      (function tick() {
        if (cancelled) return;
        i++;
        if (i >= pathPx.length) { hand.classList.add('sbkit-fade'); timers.push(setTimeout(cleanup, 450)); return; }
        place(pathPx[i]);
        timers.push(setTimeout(tick, stepMs));
      }());
    }
    return { cancel: cleanup };
  }

  /* ---- 2-D drag lifecycle (pointer capture; mouse+touch parity) ----
     A thin, coordinate-agnostic wrapper (the module does its own viewBox/px math
     in the callbacks). Born for sb-shape-fit; reused by every PK drag module.
     opts: { canStart(ev)?:bool, onStart(ev), onMove(ev), onEnd(ev) }.
     A mid-drag pointercancel is treated as an onEnd (release where we are) so a
     lifted finger never leaves a piece stuck. Returns { destroy }. ---- */
  function drag2d(handleEl, opts) {
    opts = opts || {};
    var dragging = false, id = null;
    function down(ev) {
      if (opts.canStart && !opts.canStart(ev)) return;
      dragging = true; id = ev.pointerId;
      try { handleEl.setPointerCapture(id); } catch (e) {}
      if (ev.preventDefault) ev.preventDefault();
      if (opts.onStart) opts.onStart(ev);
    }
    function move(ev) { if (dragging && ev.pointerId === id && opts.onMove) opts.onMove(ev); }
    function end(ev) {
      if (!dragging || ev.pointerId !== id) return;
      dragging = false; id = null;
      if (opts.onEnd) opts.onEnd(ev);
    }
    handleEl.addEventListener('pointerdown', down);
    handleEl.addEventListener('pointermove', move);
    handleEl.addEventListener('pointerup', end);
    handleEl.addEventListener('pointercancel', end);
    return {
      destroy: function () {
        handleEl.removeEventListener('pointerdown', down);
        handleEl.removeEventListener('pointermove', move);
        handleEl.removeEventListener('pointerup', end);
        handleEl.removeEventListener('pointercancel', end);
      }
    };
  }

  /* ---- reduced-motion helpers ---- */
  function rm(ctx) {
    return {
      on: !!(ctx && ctx.reducedMotion),
      /* run motion-only decoration iff motion is allowed */
      motion: function (fn) { if (ctx && !ctx.reducedMotion) { try { fn(); } catch (e) {} } }
    };
  }

  /* hit-area inflation to >=44 real px, matching the existing CSS convention */
  function ensureInflateCss(doc) {
    if (doc.getElementById('sbkit-inflate-css')) return;
    var css = '.sbkit-hit{position:relative;}.sbkit-hit::after{content:"";position:absolute;left:50%;top:50%;' +
      'transform:translate(-50%,-50%);width:max(100%,44px);height:max(100%,44px);}';
    var st = doc.createElement('style'); st.id = 'sbkit-inflate-css'; st.textContent = css;
    doc.head.appendChild(st);
  }
  function inflate(el) {
    var doc = el.ownerDocument || (typeof document !== 'undefined' && document);
    if (doc) ensureInflateCss(doc);
    el.classList.add('sbkit-hit');
    return el;
  }

  return {
    hit: { dist: dist, pointInRect: pointInRect, pointInPoly: pointInPoly,
           nearestOnPath: nearestOnPath, pathLength: pathLength, segIntersect: segIntersect },
    equity: equity,
    ghostHand: ghostHand,
    drag2d: drag2d,
    rm: rm,
    inflate: inflate
  };
}));
