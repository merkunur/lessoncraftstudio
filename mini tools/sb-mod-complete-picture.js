/* ============================================================================
   sb-mod-complete-picture.js — NATIVE pre-school module: a picture (a row of big
   image tiles) is missing one or two tiles; DRAG the missing piece from the tray
   into its gap. Match is by the piece's own picture, so a piece only ever settles
   in its own gap; a piece dropped elsewhere drifts gently back to the tray. Wide
   snap, big tiles. Completes when the picture is whole again.

   Page taskData:
     { "cells": [ {"image":"img.cat","at":{"x":260,"y":300}},
                  {"image":"img.dog","at":{"x":540,"y":300}},
                  {"image":"img.rabbit","at":{"x":820,"y":300}} ],
       "missing": [1],          // indices whose tile is removed → dragged from the tray
       "snapDu": 220 }          // OPTIONAL (default = ctx.band.nearFitSnapRadius)
   completionMode: "auto".  Reads window.SBKit (sb-preschool-kit.js) + ctx.band.
   ========================================================================= */
(function (global) {
  'use strict';

  var TS = 240;   /* tile size (du) — the piece handle >= PK drag-handle floor */
  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return; _cssDone = true;
    var css = [
      '.sbcp{position:relative;width:100%;height:100%;}',
      '.sbcp-svg{display:block;width:100%;height:100%;touch-action:none;}',
      '.sbcp-gap{fill:rgba(20,107,94,.05);stroke:#5b5145;stroke-width:5;stroke-dasharray:14 12;}',
      '.sbcp-gap.sbcp-lit{stroke:#F2784B;}',
      '.sbcp-cell{fill:#fff;fill-opacity:.35;stroke:rgba(91,81,69,.5);stroke-width:3;}',
      '.sbcp-piece{cursor:grab;}',
      '.sbcp-piece.sbcp-return{transition:transform .35s ease;}',
      '@media (prefers-reduced-motion: reduce){.sbcp-piece.sbcp-return{transition:none;}}'
    ].join('\n');
    var st = global.document.createElement('style'); st.id = 'sbcp-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) { var e = global.document.createElementNS(SVGNS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function imageAt(href, cx, cy, s) {
    var im = svg('image', { x: cx - s / 2, y: cy - s / 2, width: s, height: s, preserveAspectRatio: 'xMidYMid meet' });
    im.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href); im.setAttribute('href', href);
    return im;
  }

  global.SBModules.register({
    meta: {
      type: 'sb-complete-picture', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 560, h: 480 },
      studio: {
        label: 'Complete the picture', group: 'Drag & place', icon: '🖼️',
        blurb: 'Drag the missing tile back into the picture — wide snap, drifts home if missed.',
        defaults: { cells: [{ image: 'img.cat', at: { x: 240, y: 300 } }, { image: 'img.dog', at: { x: 560, y: 300 } }], missing: [1] },
        drawables: [{ kind: 'point', bind: 'cells', authorable: 'studio', min: 2, addLabel: 'Add a picture tile' }],
        fields: [{ key: 'missing', kind: 'json', label: 'Missing tile indices', optional: false }]
      }
    },

    validateTask: function (taskData, v) {
      var c = taskData.cells, m = taskData.missing;
      if (!Array.isArray(c) || c.length < 2) { v.error('sb-complete-picture: needs >= 2 cells'); return; }
      if (!Array.isArray(m) || m.length < 1) { v.error('sb-complete-picture: needs >= 1 missing index'); return; }
      var z = v.zone || { w: 1600, h: 1000 }; var band = v.band; var imgs = {};
      for (var i = 0; i < c.length; i++) {
        var cell = c[i];
        if (!cell || !cell.at || !isFinite(cell.at.x) || !isFinite(cell.at.y)) { v.error('sb-complete-picture: cells[' + i + '] needs at:{x,y}'); continue; }
        if (cell.at.x - TS / 2 < 0 || cell.at.y - TS / 2 < 0 || cell.at.x + TS / 2 > z.w || cell.at.y + TS / 2 > z.h) v.error('sb-complete-picture: cells[' + i + '] falls outside the zone ' + z.w + 'x' + z.h);
      }
      for (var k = 0; k < m.length; k++) {
        var idx = m[k];
        if (idx < 0 || idx >= c.length) { v.error('sb-complete-picture: missing[' + k + '] index ' + idx + ' out of range'); continue; }
        var key = c[idx] && c[idx].image;
        if (imgs[key]) v.error('sb-complete-picture: two missing tiles share image "' + key + '" (missing tiles must be distinct)');
        imgs[key] = 1;
      }
      if (band && band.fatal) {
        if (m.length > band.maxDrags) v.error('sb-complete-picture: ' + m.length + ' missing > PK max ' + band.maxDrags + ' drags');
        if (TS < band.fatal.minDragHandle) v.error('sb-complete-picture: tile ' + TS + 'du < PK drag-handle floor ' + band.fatal.minDragHandle + 'du');
      }
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var K = global.SBKit;
      var cells = [], gaps = [], pieces = [], snap = 220, seated = 0;
      var sv = null, gapEls = [], eq = null, ghost = null, drags = [];

      function toVB(ev) { var r = sv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * ctx.zone.w, y: (ev.clientY - r.top) / r.height * ctx.zone.h }; }
      function setPos(p, x, y) { p.cx = x; p.cy = y; p.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')'); }
      function nearestFreeGap(p) {
        var bi = -1, bd = Infinity;
        for (var i = 0; i < gaps.length; i++) { if (gaps[i]._filled || gaps[i].image !== p.image) continue; var d = Math.hypot(p.cx - gaps[i].at.x, p.cy - gaps[i].at.y); if (d < bd) { bd = d; bi = i; } }
        return { i: bi, d: bd };
      }
      function seat(p, gi) {
        gaps[gi]._filled = true; p.seated = true; seated++;
        setPos(p, gaps[gi].at.x, gaps[gi].at.y);
        if (gapEls[gi]) gapEls[gi].classList.remove('sbcp-lit');
        try { ctx.audio.pop(560); } catch (e) {}
        try { ctx.report.progress(seated / pieces.length); } catch (e) {}
        if (seated >= pieces.length) return finish();
      }
      function returnHome(p) {
        p.g.classList.add('sbcp-return'); setPos(p, p.home.x, p.home.y);
        (function (g) { global.setTimeout(function () { g.classList.remove('sbcp-return'); }, 380); }(p.g));
        if (eq) eq.onMiss(); try { ctx.audio.pop(320); } catch (e) {}
      }
      function finish() { done = true; try { ctx.announce('picture complete'); } catch (e) {} ctx.report.success(); }

      function beginDrag(p, ev) { if (!enabled || done || p.seated) return; p.g.classList.remove('sbcp-return'); var pt = toVB(ev); p.grab = { dx: p.cx - pt.x, dy: p.cy - pt.y }; try { sv.appendChild(p.g); } catch (e) {} }
      function moveDrag(p, ev) { if (p.seated) return; var pt = toVB(ev); setPos(p, pt.x + p.grab.dx, pt.y + p.grab.dy); var n = nearestFreeGap(p); for (var i = 0; i < gapEls.length; i++) gapEls[i].classList.toggle('sbcp-lit', i === n.i && n.d <= snap); }
      function endDrag(p) { if (p.seated) return; var n = nearestFreeGap(p); for (var i = 0; i < gapEls.length; i++) gapEls[i].classList.remove('sbcp-lit'); if (n.i >= 0 && n.d <= snap) seat(p, n.i); else returnHome(p); }

      return {
        mount: function (c) {
          ctx = c; injectCSS();
          var band = ctx.band || {};
          cells = (ctx.taskData.cells || []).map(function (cc) { return { image: cc.image, at: { x: +cc.at.x, y: +cc.at.y } }; });
          var missing = (ctx.taskData.missing || []).slice();
          snap = ctx.taskData.snapDu || band.nearFitSnapRadius || 220;
          seated = 0;
          eq = K.equity(ctx, function () { for (var i = 0; i < gapEls.length; i++) if (!gaps[i]._filled) gapEls[i].classList.add('sbcp-lit'); });

          var wrap = ctx.el('div', 'sbcp');
          sv = svg('svg', { class: 'sbcp-svg', viewBox: '0 0 ' + ctx.zone.w + ' ' + ctx.zone.h, preserveAspectRatio: 'xMidYMid meet' });
          sv.setAttribute('aria-label', 'Drag the missing piece into the picture');

          /* render each cell: present cells show the image; missing cells are gaps */
          gaps = []; gapEls = [];
          cells.forEach(function (cell, i) {
            var isMissing = missing.indexOf(i) >= 0;
            if (isMissing) {
              var gel = svg('rect', { class: 'sbcp-gap', x: cell.at.x - TS / 2, y: cell.at.y - TS / 2, width: TS, height: TS, rx: 16 });
              sv.appendChild(gel);
              gaps.push({ at: cell.at, image: cell.image, _filled: false }); gapEls.push(gel);
            } else {
              sv.appendChild(svg('rect', { class: 'sbcp-cell', x: cell.at.x - TS / 2, y: cell.at.y - TS / 2, width: TS, height: TS, rx: 16 }));
              try { sv.appendChild(imageAt(ctx.assets.url(cell.image), cell.at.x, cell.at.y, TS * 0.86)); } catch (e) {}
            }
          });

          /* tray pieces = the missing tiles, along the bottom */
          var n = gaps.length, py = ctx.zone.h - TS / 2 - 30;
          pieces = gaps.map(function (gp, i) {
            var hx = (i + 1) * ctx.zone.w / (n + 1);
            var g = svg('g', { class: 'sbcp-piece' });
            g.appendChild(svg('rect', { x: -TS / 2, y: -TS / 2, width: TS, height: TS, rx: 16, fill: '#fff', 'fill-opacity': '.9', stroke: '#5b5145', 'stroke-width': 3 }));
            try { g.appendChild(imageAt(ctx.assets.url(gp.image), 0, 0, TS * 0.86)); } catch (e) {}
            sv.appendChild(g);
            var p = { image: gp.image, g: g, home: { x: hx, y: py }, cx: hx, cy: py, seated: false, grab: { dx: 0, dy: 0 } };
            setPosInit(p, hx, py);
            drags.push(K.drag2d(g, { canStart: function () { return enabled && !done && !p.seated; }, onStart: function (ev) { beginDrag(p, ev); }, onMove: function (ev) { moveDrag(p, ev); }, onEnd: function () { endDrag(p); } }));
            return p;
          });

          wrap.appendChild(sv);
          ctx.surface.el.appendChild(wrap);
          eq.maybeRevealMuted();

          function setPosInit(p, x, y) { p.cx = x; p.cy = y; p.g.setAttribute('transform', 'translate(' + x + ',' + y + ')'); }
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          if (!sv) return;
          var pi = -1; for (var k = 0; k < pieces.length; k++) if (!pieces[k].seated) { pi = k; break; }
          if (pi < 0) return;
          var gi = -1; for (var j = 0; j < gaps.length; j++) if (!gaps[j]._filled && gaps[j].image === pieces[pi].image) { gi = j; break; }
          if (gi < 0) return;
          var r = sv.getBoundingClientRect(); var toPx = function (p) { return { x: (p.x / ctx.zone.w) * r.width, y: (p.y / ctx.zone.h) * r.height }; };
          if (ghost) ghost.cancel();
          ghost = K.ghostHand(ctx.surface.el, [toPx(pieces[pi].home), toPx(gaps[gi].at)], { reducedMotion: ctx.reducedMotion, icon: '👆' });
        },
        autoSolve: function () {
          enabled = true;
          for (var i = 0; i < pieces.length && !done; i++) { if (pieces[i].seated) continue; var gi = -1; for (var j = 0; j < gaps.length; j++) if (!gaps[j]._filled && gaps[j].image === pieces[i].image) { gi = j; break; } if (gi >= 0) seat(pieces[i], gi); }
          if (!done) finish();
        },
        qaGesture: function () {
          var pairs = [];
          for (var i = 0; i < pieces.length; i++) { var gi = -1; for (var j = 0; j < gaps.length; j++) if (gaps[j].image === pieces[i].image) { gi = j; break; } if (gi >= 0) pairs.push({ from: { x: pieces[i].home.x, y: pieces[i].home.y }, to: { x: gaps[gi].at.x, y: gaps[gi].at.y } }); }
          return { kind: 'drops', pairs: pairs, tol: snap, zone: { w: ctx.zone.w, h: ctx.zone.h } };
        },
        destroy: function () { done = true; enabled = false; for (var i = 0; i < drags.length; i++) { try { drags[i].destroy(); } catch (e) {} } drags = []; if (ghost) { ghost.cancel(); ghost = null; } sv = null; cells = []; gaps = []; pieces = []; gapEls = []; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
