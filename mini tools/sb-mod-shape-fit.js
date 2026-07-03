/* ============================================================================
   sb-mod-shape-fit.js — NATIVE pre-school module: DRAG each big shape into its
   matching outline (a shape sorter / inset puzzle). Pieces are large (>= the band
   drag-handle floor), outlines are large, and the snap radius is WIDE — a 3-5yo
   drops "near enough" and the piece jumps home. A piece released away from its
   outline drifts gently back to the tray (never lost, never wrong-locked). Match
   is by SHAPE, so a released circle only ever settles in the circle hole.
   Completes when every piece is seated.

   Page taskData:
     { "slots": [ {"shape":"circle","color":"#F2784B","at":{"x":260,"y":260}},
                  {"shape":"square","color":"#146B5E","at":{"x":540,"y":260}} ],
       "snapDu": 220 }   // OPTIONAL (default = ctx.band.nearFitSnapRadius)
   completionMode: "auto".  Reads window.SBKit (sb-preschool-kit.js) + ctx.band.
   ========================================================================= */
(function (global) {
  'use strict';

  var R = 120;   /* shape "radius" (du) — the piece spans ~2R, >= PK drag-handle floor */
  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return; _cssDone = true;
    var css = [
      '.sbsf{position:relative;width:100%;height:100%;}',
      '.sbsf-svg{display:block;width:100%;height:100%;touch-action:none;}',
      '.sbsf-hole{fill:rgba(20,107,94,.05);stroke:#5b5145;stroke-width:5;stroke-dasharray:14 12;}',
      '.sbsf-hole.sbsf-lit{stroke:#F2784B;}',
      '.sbsf-piece{cursor:grab;}',
      '.sbsf-piece.sbsf-seated{cursor:default;}',
      '.sbsf-piece.sbsf-return{transition:transform .35s ease;}',
      '@media (prefers-reduced-motion: reduce){.sbsf-piece.sbsf-return{transition:none;}}'
    ].join('\n');
    var st = global.document.createElement('style'); st.id = 'sbsf-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) { var e = global.document.createElementNS(SVGNS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  /* a shape centred on (0,0), size ~2R; `outline` = dashed hole, else filled piece */
  function shapeNode(shape, r, cls, color, outline) {
    var e;
    if (shape === 'circle') e = svg('circle', { cx: 0, cy: 0, r: r });
    else if (shape === 'square') e = svg('rect', { x: -r, y: -r, width: 2 * r, height: 2 * r, rx: 16 });
    else if (shape === 'triangle') e = svg('polygon', { points: [0, -r, r * 0.92, r * 0.72, -r * 0.92, r * 0.72].join(' ') });
    else if (shape === 'star') { e = svg('polygon', { points: starPts(r) }); }
    else e = svg('circle', { cx: 0, cy: 0, r: r });
    e.setAttribute('class', cls);
    if (outline) { e.setAttribute('fill', 'rgba(20,107,94,.05)'); } else if (color) e.setAttribute('fill', color);
    return e;
  }
  function starPts(r) {
    var p = [], i, a, rr;
    for (i = 0; i < 10; i++) { a = -Math.PI / 2 + i * Math.PI / 5; rr = (i % 2 === 0) ? r : r * 0.45; p.push((Math.cos(a) * rr).toFixed(1), (Math.sin(a) * rr).toFixed(1)); }
    return p.join(' ');
  }

  global.SBModules.register({
    meta: {
      type: 'sb-shape-fit', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 560, h: 480 },
      studio: {
        label: 'Fit the shapes', group: 'Drag & place', icon: '🧩',
        blurb: 'Drag each big shape into its matching hole — wide snap, drifts home if missed.',
        defaults: { slots: [{ shape: 'circle', color: '#F2784B', at: { x: 260, y: 240 } }, { shape: 'square', color: '#146B5E', at: { x: 560, y: 240 } }] },
        drawables: [{ kind: 'point', bind: 'slots', authorable: 'studio', min: 1, addLabel: 'Add a shape hole' }],
        fields: []
      }
    },

    validateTask: function (taskData, v) {
      var s = taskData.slots;
      if (!Array.isArray(s) || s.length < 1) { v.error('sb-shape-fit: needs >= 1 slot'); return; }
      var z = v.zone || { w: 1600, h: 1000 }; var band = v.band;
      var seen = {};
      for (var i = 0; i < s.length; i++) {
        var sl = s[i];
        if (!sl || !sl.at || !isFinite(sl.at.x) || !isFinite(sl.at.y)) { v.error('sb-shape-fit: slots[' + i + '] needs at:{x,y}'); continue; }
        if (sl.at.x - R < 0 || sl.at.y - R < 0 || sl.at.x + R > z.w || sl.at.y + R > z.h) v.error('sb-shape-fit: slots[' + i + '] outline falls outside the zone ' + z.w + 'x' + z.h);
        if (seen[sl.shape]) v.error('sb-shape-fit: shape "' + sl.shape + '" repeats — each slot needs a distinct shape (match is by shape)');
        seen[sl.shape] = 1;
      }
      if (band && band.fatal) {
        if (s.length > band.maxDrags) v.error('sb-shape-fit: ' + s.length + ' pieces > PK max ' + band.maxDrags + ' drags');
        if (2 * R < band.fatal.minDragHandle) v.error('sb-shape-fit: piece ' + (2 * R) + 'du < PK drag-handle floor ' + band.fatal.minDragHandle + 'du');
      }
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var K = global.SBKit;
      var slots = [], pieces = [], snap = 220, seated = 0;
      var sv = null, holeEls = [], eq = null, ghost = null, drags = [];

      function toVB(ev) { var r = sv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * ctx.zone.w, y: (ev.clientY - r.top) / r.height * ctx.zone.h }; }
      function setPos(p, x, y) { p.cx = x; p.cy = y; p.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')'); }
      function nearestFreeSlot(p) {
        var bi = -1, bd = Infinity;
        for (var i = 0; i < slots.length; i++) { if (slots[i]._filled || slots[i].shape !== p.shape) continue; var d = Math.hypot(p.cx - slots[i].at.x, p.cy - slots[i].at.y); if (d < bd) { bd = d; bi = i; } }
        return { i: bi, d: bd };
      }
      function seat(p, si) {
        slots[si]._filled = true; p.seated = true; seated++;
        p.g.classList.add('sbsf-seated');
        setPos(p, slots[si].at.x, slots[si].at.y);
        if (holeEls[si]) holeEls[si].classList.remove('sbsf-lit');
        try { ctx.audio.pop(560); } catch (e) {}
        try { ctx.report.progress(seated / pieces.length); } catch (e) {}
        if (seated >= pieces.length) return finish();
      }
      function returnHome(p) {
        p.g.classList.add('sbsf-return');
        setPos(p, p.home.x, p.home.y);
        (function (g) { global.setTimeout(function () { g.classList.remove('sbsf-return'); }, 380); }(p.g));
        if (eq) eq.onMiss();
        try { ctx.audio.pop(320); } catch (e) {}
      }
      function finish() { done = true; try { ctx.announce('all fitted'); } catch (e) {} ctx.report.success(); }

      function beginDrag(p, ev) {
        if (!enabled || done || p.seated) return;
        p.g.classList.remove('sbsf-return');
        var pt = toVB(ev); p.grab = { dx: p.cx - pt.x, dy: p.cy - pt.y };
        try { sv.appendChild(p.g); } catch (e) {}   /* raise to top */
      }
      function moveDrag(p, ev) {
        if (p.seated) return; var pt = toVB(ev);
        setPos(p, pt.x + p.grab.dx, pt.y + p.grab.dy);
        var n = nearestFreeSlot(p);
        for (var i = 0; i < holeEls.length; i++) holeEls[i].classList.toggle('sbsf-lit', i === n.i && n.d <= snap);
      }
      function endDrag(p) {
        if (p.seated) return;
        var n = nearestFreeSlot(p);
        for (var i = 0; i < holeEls.length; i++) holeEls[i].classList.remove('sbsf-lit');
        if (n.i >= 0 && n.d <= snap) seat(p, n.i); else returnHome(p);
      }

      return {
        mount: function (c) {
          ctx = c; injectCSS();
          var band = ctx.band || {};
          slots = (ctx.taskData.slots || []).map(function (s) { return { shape: s.shape, color: s.color, at: { x: +s.at.x, y: +s.at.y }, _filled: false }; });
          snap = ctx.taskData.snapDu || band.nearFitSnapRadius || 220;
          seated = 0;
          eq = K.equity(ctx, function () { for (var i = 0; i < holeEls.length; i++) if (!slots[i]._filled) holeEls[i].classList.add('sbsf-lit'); });

          var wrap = ctx.el('div', 'sbsf');
          sv = svg('svg', { class: 'sbsf-svg', viewBox: '0 0 ' + ctx.zone.w + ' ' + ctx.zone.h, preserveAspectRatio: 'xMidYMid meet' });
          sv.setAttribute('aria-label', 'Drag each shape into its matching hole');

          /* outlines (holes) */
          holeEls = slots.map(function (s) {
            var g = svg('g', { transform: 'translate(' + s.at.x + ',' + s.at.y + ')' });
            var hole = shapeNode(s.shape, R, 'sbsf-hole', null, true);
            hole.setAttribute('stroke-width', 5);
            g.appendChild(hole); sv.appendChild(g);
            return hole;
          });

          /* pieces in a palette row along the bottom */
          var n = slots.length, py = ctx.zone.h - R - 40;
          pieces = slots.map(function (s, i) {
            var hx = (i + 1) * ctx.zone.w / (n + 1);
            var g = svg('g', { class: 'sbsf-piece' });
            g.appendChild(shapeNode(s.shape, R * 0.92, 'sbsf-fill', s.color, false));
            sv.appendChild(g);
            var p = { shape: s.shape, g: g, home: { x: hx, y: py }, cx: hx, cy: py, seated: false, grab: { dx: 0, dy: 0 } };
            g.setAttribute('transform', 'translate(' + hx + ',' + py + ')');
            drags.push(K.drag2d(g, {
              canStart: function () { return enabled && !done && !p.seated; },
              onStart: function (ev) { beginDrag(p, ev); },
              onMove: function (ev) { moveDrag(p, ev); },
              onEnd: function () { endDrag(p); }
            }));
            return p;
          });

          wrap.appendChild(sv);
          ctx.surface.el.appendChild(wrap);
          eq.maybeRevealMuted();
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          if (!sv) return;
          var pi = -1; for (var k = 0; k < pieces.length; k++) if (!pieces[k].seated) { pi = k; break; }
          if (pi < 0) return;
          var si = -1; for (var j = 0; j < slots.length; j++) if (!slots[j]._filled && slots[j].shape === pieces[pi].shape) { si = j; break; }
          if (si < 0) return;
          var r = sv.getBoundingClientRect();
          var toPx = function (p) { return { x: (p.x / ctx.zone.w) * r.width, y: (p.y / ctx.zone.h) * r.height }; };
          if (ghost) ghost.cancel();
          ghost = K.ghostHand(ctx.surface.el, [toPx(pieces[pi].home), toPx(slots[si].at)], { reducedMotion: ctx.reducedMotion, icon: '👆' });
        },
        autoSolve: function () {
          enabled = true;
          for (var i = 0; i < pieces.length && !done; i++) { if (pieces[i].seated) continue; var n = nearestFreeSlotFor(pieces[i]); if (n >= 0) seat(pieces[i], n); }
          if (!done) finish();
          function nearestFreeSlotFor(p) { for (var j = 0; j < slots.length; j++) if (!slots[j]._filled && slots[j].shape === p.shape) return j; return -1; }
        },
        qaGesture: function () {
          var pairs = [];
          for (var i = 0; i < pieces.length; i++) {
            var si = -1; for (var j = 0; j < slots.length; j++) if (slots[j].shape === pieces[i].shape) { si = j; break; }
            if (si >= 0) pairs.push({ from: { x: pieces[i].home.x, y: pieces[i].home.y }, to: { x: slots[si].at.x, y: slots[si].at.y } });
          }
          return { kind: 'drops', pairs: pairs, tol: snap, zone: { w: ctx.zone.w, h: ctx.zone.h } };
        },
        destroy: function () {
          done = true; enabled = false;
          for (var i = 0; i < drags.length; i++) { try { drags[i].destroy(); } catch (e) {} }
          drags = []; if (ghost) { ghost.cancel(); ghost = null; }
          sv = null; slots = []; pieces = []; holeEls = [];
        }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
