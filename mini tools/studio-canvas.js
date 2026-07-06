/* ============================================================================
   studio-canvas.js — Storybook Studio: the WYSIWYG compose canvas.

   Renders the current page in true design units (a 1600×1000 stage under ONE
   CSS transform), straight from the sb-1 document: scene image, characters as
   canvas-cropped atlas frames (no Pixi), the interaction zone, and the
   mechanic's drawables (rects/points, converted zone-relative → absolute at
   render time only). Direct manipulation: drag (feet-anchor, grab offset
   preserved), one scale handle pivoting about the feet, zone move/resize with
   amber + spring-back below minZone, drawable rect/point editing, 8du snap on
   release (Alt bypasses), arrow-key nudge. Commits go through Studio.mutate;
   drags manipulate styles live and commit once on pointerup.
   ========================================================================= */
(function (global) {
  'use strict';
  var doc = global.document;
  var DESIGN_W = 1600, DESIGN_H = 1000;
  var SNAP = 8;

  /* ---------------- atlas frame cache ---------------- */
  var FrameCache = {
    _atlases: {},   /* url -> Promise<{frames:{name:{dataURL,w,h}}, poseNames:[]}> */
    load: function (url) {
      if (this._atlases[url]) return this._atlases[url];
      this._atlases[url] = fetch(url).then(function (r) { return r.json(); }).then(function (j) {
        return new Promise(function (resolve, reject) {
          var img = new Image();
          img.onload = function () {
            var out = { frames: {}, poseNames: [] };
            Object.keys(j.frames).forEach(function (name) {
              var f = j.frames[name];
              var c = doc.createElement('canvas');
              c.width = f.sourceSize.w; c.height = f.sourceSize.h;
              var ctx = c.getContext('2d');
              ctx.drawImage(img, f.frame.x, f.frame.y, f.frame.w, f.frame.h,
                f.spriteSourceSize.x, f.spriteSourceSize.y, f.frame.w, f.frame.h);
              out.frames[name] = { dataURL: c.toDataURL(), w: f.sourceSize.w, h: f.sourceSize.h };
              if (name.indexOf('pose_') === 0) out.poseNames.push(name.slice(5));
            });
            resolve(out);
          };
          img.onerror = function () { reject(new Error('atlas image failed: ' + url)); };
          img.src = url.replace(/[^\/]+$/, j.meta.image);
        });
      });
      return this._atlases[url];
    }
  };

  /* ---------------- stage state ---------------- */
  var host = null, stage = null, scale = 1;
  /* the VIEW: scale (the one source duPoint divides by) + a translation.
     mode 'fit' re-fits on host resize; 'manual' (any zoom/pan) holds and
     clamps. transform stays a PURE scale() (prove-studio reads its coeff);
     translation rides on left/top exactly as the original fit() did. */
  var view = { mode: 'fit', tx: 12, ty: 12 };
  var viewListeners = [];
  var loadedAtlases = {};   /* assetId -> frame set (resolved) */
  var placeMode = null;     /* {kind:'character', castDef} | {kind:'rect', drawable} | {kind:'point', drawable} */

  function S() { return global.Studio.state; }
  function pageObj() { return global.Studio.page(); }
  function studioMeta(inter) {
    var m = inter && global.SBModules.get(inter.moduleType);
    return (m && m.meta && m.meta.studio) || null;
  }
  function minZone(inter) {
    var m = inter && global.SBModules.get(inter.moduleType);
    return (m && m.meta && m.meta.minZone) || { w: 200, h: 150 };
  }

  function snap(v, alt) { return alt ? Math.round(v) : Math.round(v / SNAP) * SNAP; }
  function el(tag, cls) { var d = doc.createElement(tag); if (cls) d.className = cls; return d; }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) { var e = doc.createElementNS(SVGNS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  /* a stage-covering SVG overlay in DU coords (pointer-events off so clicks reach the zone) */
  function overlaySvg(cls) {
    var s = svgEl('svg', { class: cls, viewBox: '0 0 ' + DESIGN_W + ' ' + DESIGN_H, width: DESIGN_W, height: DESIGN_H });
    s.style.position = 'absolute'; s.style.left = '0'; s.style.top = '0'; s.style.pointerEvents = 'none'; s.style.overflow = 'visible';
    return s;
  }

  /* ---------------- the view (fit / zoom / pan) ---------------- */
  function fitScale() {
    var r = host.getBoundingClientRect();
    return Math.min((r.width - 24) / DESIGN_W, (r.height - 24) / DESIGN_H);
  }
  function applyView() {
    if (!host || !stage) return;
    stage.style.transform = 'scale(' + scale + ')';
    stage.style.left = view.tx + 'px';
    stage.style.top = view.ty + 'px';
    viewListeners.forEach(function (fn) { try { fn(getView()); } catch (e) {} });
  }
  /* Fit = the load-time default (and the old fit() behavior, kept exported
     under the same name): scale to the host, center. */
  function zoomFit() {
    if (!host || !stage) return;
    var r = host.getBoundingClientRect();
    scale = fitScale();
    view.mode = 'fit';
    view.tx = Math.max(12, (r.width - DESIGN_W * scale) / 2);
    view.ty = Math.max(12, (r.height - DESIGN_H * scale) / 2);
    applyView();
  }
  /* keep at least 80px of the stage visible in each axis */
  function clampPan() {
    var r = host.getBoundingClientRect();
    view.tx = Math.max(80 - DESIGN_W * scale, Math.min(view.tx, r.width - 80));
    view.ty = Math.max(80 - DESIGN_H * scale, Math.min(view.ty, r.height - 80));
  }
  /* setZoom(s2, cx, cy): cx/cy = CLIENT-coordinate anchor (default: host
     center) — the design point under the anchor stays under it. */
  function setZoom(s2, cx, cy) {
    if (!host || !stage) return;
    var r = host.getBoundingClientRect();
    var lo = fitScale() * 0.5;
    s2 = Math.max(lo, Math.min(4, s2));
    var hx = (cx === undefined ? r.width / 2 : cx - r.left);
    var hy = (cy === undefined ? r.height / 2 : cy - r.top);
    var px = (hx - view.tx) / scale, py = (hy - view.ty) / scale;
    scale = s2;
    view.tx = hx - px * scale;
    view.ty = hy - py * scale;
    view.mode = 'manual';
    clampPan();
    applyView();
  }
  function zoomIn() { setZoom(scale * 1.25); }
  function zoomOut() { setZoom(scale / 1.25); }
  function zoom100() { setZoom(1); }
  function panBy(dx, dy) {
    view.tx += dx; view.ty += dy;
    view.mode = 'manual';
    clampPan();
    applyView();
  }
  function getView() { return { scale: scale, tx: view.tx, ty: view.ty, mode: view.mode, fitScale: host ? fitScale() : 1 }; }
  function onView(fn) { viewListeners.push(fn); }
  function fit() { zoomFit(); }

  function render() {
    if (!stage) return;
    stage.innerHTML = '';
    var st = S(); var pg = pageObj();
    if (!pg) return;
    var story = st.doc.story;

    /* scene */
    var sceneAsset = pg.scene && pg.scene.image && story.assets[pg.scene.image];
    if (sceneAsset) {
      var sc = el('img', 'stu-scene');
      sc.src = sceneAsset.src;
      sc.draggable = false;
      stage.appendChild(sc);
    } else {
      var empty = el('div', 'stu-scene-empty');
      empty.textContent = 'This page needs a picture — pick one in the panel on the right.';
      stage.appendChild(empty);
    }
    (pg.scene && pg.scene.layers || []).forEach(function (ly) {
      var a = story.assets[ly.image];
      if (!a) return;
      var im = el('img', 'stu-layer');
      im.src = a.src; im.draggable = false;
      im.style.left = ly.x + 'px'; im.style.top = ly.y + 'px';
      if (ly.w) im.style.width = ly.w + 'px';
      if (ly.h) im.style.height = ly.h + 'px';
      stage.appendChild(im);
    });

    /* characters */
    (pg.characters || []).forEach(function (pl, ci) {
      renderCharacter(pl, ci, story);
    });

    /* interaction zone + drawables */
    if (pg.interaction && pg.interaction.zone) renderZone(pg.interaction);

    fitBadges();
  }

  function renderCharacter(pl, ci, story) {
    var castDef = (story.cast || []).filter(function (c) { return c.id === pl.characterId; })[0];
    if (!castDef) return;
    var wrap = el('div', 'stu-char');
    wrap.dataset.ci = ci;
    var sel = S().selection;
    var isSel = sel && sel.kind === 'character' && sel.index === ci;
    if (isSel) wrap.classList.add('stu-selected');

    var atlas = loadedAtlases[castDef.atlasBase];
    /* live scale preview: while dragging THIS character's scale handle, size from the
       in-progress drag.curScale instead of the (not-yet-committed) document value */
    var liveScale = (drag && drag.mode === 'char-scale' && drag.ci === ci && drag.curScale) ? drag.curScale : (pl.scale || 1);
    var sc = liveScale * (castDef.scale || 1);
    function place(w, h) {
      wrap.style.width = (w * sc) + 'px';
      wrap.style.height = (h * sc) + 'px';
      wrap.style.left = (pl.anchor.x - w * sc / 2) + 'px';
      wrap.style.top = (pl.anchor.y - h * sc) + 'px';
    }
    if (atlas) {
      var frame = atlas.frames['pose_' + pl.pose] || atlas.frames[Object.keys(atlas.frames)[0]];
      var img = el('img');
      img.src = frame.dataURL;
      img.draggable = false;
      img.style.userSelect = 'none';
      img.style.webkitUserDrag = 'none';
      if (pl.flip) img.style.transform = 'scaleX(-1)';
      wrap.appendChild(img);
      place(frame.w, frame.h);
    } else {
      place(512, 640);
      wrap.classList.add('stu-char-loading');
      loadAtlasFor(castDef).then(render);
    }
    if (isSel) {
      var feet = el('div', 'stu-feet');
      wrap.appendChild(feet);
      var handle = el('div', 'stu-scale-handle');
      handle.dataset.role = 'char-scale';
      wrap.appendChild(handle);
    }
    stage.appendChild(wrap);
  }

  function loadAtlasFor(castDef) {
    var story = S().doc.story;
    var asset = story.assets[castDef.atlasBase];
    if (!asset) return Promise.resolve();
    return FrameCache.load(asset.src).then(function (frames) {
      loadedAtlases[castDef.atlasBase] = frames;
    }).catch(function (e) { console.error(e); });
  }

  /* ---- placed-worksheet (SEP) visual: the editor shows the exported
     exercise INSIDE its zone, letterboxed like the player renders it —
     a placed worksheet must be VISIBLE on the canvas, not an empty frame.
     Same media shapes as sb-mod-worksheet-exercise's packageBase(). ---- */
  var sepThumbs = {};   /* packagePath -> {src} | 'loading' | 'failed' */
  function sepMediaBase() {
    var st = S();
    if (global.Studio.tenant) {
      return st.previewLinkId ? ('/api/play/' + st.previewLinkId + '/m/') : null;
    }
    return '/mini-tools/stories/' + st.id + '/';
  }
  function loadSepThumb(pkg) {
    if (sepThumbs[pkg]) return;
    var base = sepMediaBase();
    if (!base) { sepThumbs[pkg] = 'failed'; return; }
    sepThumbs[pkg] = 'loading';
    fetch(base + pkg + '/descriptor.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('descriptor ' + r.status); return r.json(); })
      .then(function (d) {
        var src = base + pkg + '/' + ((d.visual && d.visual.file) || 'visual@2x.webp');
        var img = new Image();
        img.onload = function () { sepThumbs[pkg] = { src: src }; render(); };
        img.onerror = function () { sepThumbs[pkg] = 'failed'; };
        img.src = src;
      })
      .catch(function () { sepThumbs[pkg] = 'failed'; });   /* defensive-skip: the labeled zone remains */
  }

  function renderZone(inter) {
    var z = inter.zone;
    var zoneEl = el('div', 'stu-zone');
    zoneEl.style.left = z.x + 'px'; zoneEl.style.top = z.y + 'px';
    zoneEl.style.width = z.w + 'px'; zoneEl.style.height = z.h + 'px';
    /* a placed worksheet exercise shows its exported visual in the zone
       (first child: label + handles paint above it) */
    if (inter.moduleType === 'sb-worksheet-exercise' && inter.taskData && inter.taskData.package) {
      var sepPkg = inter.taskData.package;
      var th = sepThumbs[sepPkg];
      if (!th) loadSepThumb(sepPkg);
      else if (th.src) {
        var vi = el('img', 'stu-zone-sep');
        vi.src = th.src;
        vi.draggable = false;
        zoneEl.appendChild(vi);
      }
    }
    var sel = S().selection;
    if (sel && sel.kind === 'zone') zoneEl.classList.add('stu-selected');
    var mz = minZone(inter);
    if (z.w < mz.w || z.h < mz.h) zoneEl.classList.add('stu-amber');
    var lbl = el('div', 'stu-zone-label');
    var m = global.SBModules.get(inter.moduleType);
    lbl.textContent = (m && m.meta.studio && m.meta.studio.label) || inter.moduleType;
    zoneEl.appendChild(lbl);
    ['nw', 'ne', 'sw', 'se'].forEach(function (corner) {
      var h = el('div', 'stu-handle stu-handle-' + corner);
      h.dataset.role = 'zone-resize'; h.dataset.corner = corner;
      zoneEl.appendChild(h);
    });
    stage.appendChild(zoneEl);

    /* drawables (absolute = zone + rel; the ONLY render-time conversion) */
    var stu = studioMeta(inter);
    if (!stu || !stu.drawables) return;
    stu.drawables.forEach(function (dr) {
      var arr = inter.taskData[dr.bind] || [];
      arr.forEach(function (item, i) {
        if (dr.kind === 'rect' && item.rect) {
          var abs = global.Studio.toAbsDu(z, item.rect);
          var rEl = el('div', 'stu-drect');
          rEl.dataset.bind = dr.bind; rEl.dataset.i = i;
          rEl.style.left = abs.x + 'px'; rEl.style.top = abs.y + 'px';
          rEl.style.width = abs.w + 'px'; rEl.style.height = abs.h + 'px';
          if (sel && sel.kind === 'drawable' && sel.bind === dr.bind && sel.index === i) {
            rEl.classList.add('stu-selected');
            var hh = el('div', 'stu-handle stu-handle-se');
            hh.dataset.role = 'drect-resize';
            rEl.appendChild(hh);
          }
          /* image face when the item carries an image assetId */
          var imgField = (dr.fields || []).filter(function (f) { return f.kind === 'image'; })[0];
          if (imgField && item[imgField.key]) {
            var asset = S().doc.story.assets[item[imgField.key]];
            if (asset) {
              var im2 = el('img'); im2.src = asset.src; im2.draggable = false;
              rEl.appendChild(im2);
            }
          }
          var badge = el('div', 'stu-drect-badge');
          badge.textContent = item[dr.badge || 'key'] || (i + 1);
          rEl.appendChild(badge);
          stage.appendChild(rEl);
        } else if (dr.kind === 'point' && typeof item.x === 'number') {
          var absP = global.Studio.toAbsPt(z, item);
          var pEl = el('div', 'stu-dpoint');
          pEl.dataset.bind = dr.bind; pEl.dataset.i = i;
          pEl.style.left = absP.x + 'px'; pEl.style.top = absP.y + 'px';
          pEl.textContent = String(i + 1);
          if (sel && sel.kind === 'point' && sel.index === i) pEl.classList.add('stu-selected');
          stage.appendChild(pEl);
        }
      });
      /* sb-trace path — a dashed centreline + numbered vertex dots (start = coral) */
      if (dr.kind === 'path') {
        var pathArr = inter.taskData[dr.bind] || [];
        if (pathArr.length) {
          var svgP = overlaySvg('stu-dpath');
          var absPts = pathArr.map(function (p) { return global.Studio.toAbsPt(z, p); });
          var d = ''; absPts.forEach(function (p, k) { d += (k ? 'L' : 'M') + p.x + ',' + p.y + ' '; });
          svgP.appendChild(svgEl('path', { d: d.trim(), fill: 'none', stroke: '#146B5E', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '4 20' }));
          absPts.forEach(function (p, k) { svgP.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: 15, fill: k === 0 ? '#F2784B' : '#146B5E', stroke: '#fff', 'stroke-width': 3 })); });
          stage.appendChild(svgP);
        }
      }
      /* sb-maze walls (+ start/end/solution if present) */
      if (dr.kind === 'maze') {
        var td = inter.taskData; var wallArr = td[dr.bind] || [];
        var svgM = overlaySvg('stu-dmaze');
        wallArr.forEach(function (w) { var a = global.Studio.toAbsPt(z, { x: w.x1, y: w.y1 }), b = global.Studio.toAbsPt(z, { x: w.x2, y: w.y2 }); svgM.appendChild(svgEl('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: '#8a6a4a', 'stroke-width': 16, 'stroke-linecap': 'round' })); });
        /* solution route is rendered by the 'path' drawable (bind:solution); start/end below */
        if (td.start) { var sa = global.Studio.toAbsPt(z, td.start); svgM.appendChild(svgEl('circle', { cx: sa.x, cy: sa.y, r: 16, fill: '#146B5E' })); }
        if (td.end) { var ea = global.Studio.toAbsPt(z, td.end); svgM.appendChild(svgEl('circle', { cx: ea.x, cy: ea.y, r: 20, fill: 'none', stroke: '#F2784B', 'stroke-width': 5, 'stroke-dasharray': '10 8' })); }
        stage.appendChild(svgM);
      }
    });
    renderPlacing(z);
  }

  /* the in-progress path vertices / pending maze-wall endpoint while placing */
  function renderPlacing(z) {
    if (!placeMode || (placeMode.kind !== 'path' && placeMode.kind !== 'maze')) return;
    var s = overlaySvg('stu-placing-ov');
    if (placeMode.kind === 'path') {
      var pts = placeMode.pts || [];
      if (pts.length) {
        var d = ''; pts.forEach(function (p, k) { d += (k ? 'L' : 'M') + p.x + ',' + p.y + ' '; });
        s.appendChild(svgEl('path', { d: d.trim(), fill: 'none', stroke: '#F2784B', 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-dasharray': '6 10' }));
        pts.forEach(function (p, k) { s.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: 13, fill: k === 0 ? '#F2784B' : '#146B5E', stroke: '#fff', 'stroke-width': 3 })); });
      }
    } else if (placeMode.kind === 'maze' && placeMode.pending) {
      s.appendChild(svgEl('circle', { cx: placeMode.pending.x, cy: placeMode.pending.y, r: 13, fill: '#F2784B', stroke: '#fff', 'stroke-width': 3 }));
    }
    stage.appendChild(s);
  }

  function fitBadges() {
    /* offstage-character warning badge */
    var pg = pageObj();
    if (!pg) return;
    (pg.characters || []).forEach(function (pl) {
      if (pl.anchor.x < -100 || pl.anchor.x > DESIGN_W + 100 ||
          pl.anchor.y < 0 || pl.anchor.y > DESIGN_H + 200) {
        var b = el('div', 'stu-offstage');
        b.textContent = '⚠ ' + pl.characterId + ' is off the page';
        stage.appendChild(b);
      }
    });
  }

  /* ---------------- pointer machinery ---------------- */
  var drag = null;   /* {mode, ...} */

  function duPoint(ev) {
    var r = stage.getBoundingClientRect();
    return { x: (ev.clientX - r.left) / scale, y: (ev.clientY - r.top) / scale };
  }

  function onPointerDown(ev) {
    var pt = duPoint(ev);
    var pg = pageObj();
    if (!pg) return;

    /* place-mode click */
    if (placeMode) {
      if (placeMode.kind === 'path' || placeMode.kind === 'maze') placeClick(pt);
      else commitPlace(pt);
      ev.preventDefault(); return;
    }

    var t = ev.target;
    var role = t.dataset && t.dataset.role;

    /* during pointerdown we set selection WITHOUT re-rendering — a re-render
       would orphan the element being dragged; visuals catch up on pointerup */
    function selQuiet(sel) { S().selection = sel; }

    if (role === 'char-scale') {
      var ci0 = Number(t.parentNode.dataset.ci);
      var pl0 = pg.characters[ci0];
      drag = { mode: 'char-scale', ci: ci0, startPt: pt, startScale: pl0.scale || 1, anchor: pl0.anchor };
    } else if (role === 'zone-resize') {
      drag = { mode: 'zone-resize', corner: t.dataset.corner, startPt: pt,
               startZone: global.Studio.clone(pg.interaction.zone), el: t.parentNode };
    } else if (role === 'drect-resize') {
      var host2 = t.parentNode;
      drag = { mode: 'drect-resize', bind: host2.dataset.bind, i: Number(host2.dataset.i),
               startPt: pt, el: host2,
               startRect: readRect(host2) };
    } else if (t.closest && t.closest('.stu-drect')) {
      var dEl = t.closest('.stu-drect');
      selQuiet({ kind: 'drawable', bind: dEl.dataset.bind, index: Number(dEl.dataset.i) });
      drag = { mode: 'drect-move', bind: dEl.dataset.bind, i: Number(dEl.dataset.i),
               startPt: pt, el: dEl, startRect: readRect(dEl) };
    } else if (t.closest && t.closest('.stu-dpoint')) {
      var pEl = t.closest('.stu-dpoint');
      selQuiet({ kind: 'point', bind: pEl.dataset.bind, index: Number(pEl.dataset.i) });
      drag = { mode: 'point-move', bind: pEl.dataset.bind, i: Number(pEl.dataset.i),
               startPt: pt, el: pEl,
               start: { x: parseFloat(pEl.style.left), y: parseFloat(pEl.style.top) } };
    } else if (t.closest && t.closest('.stu-zone')) {
      selQuiet({ kind: 'zone' });
      drag = { mode: 'zone-move', startPt: pt,
               startZone: global.Studio.clone(pg.interaction.zone), el: t.closest('.stu-zone') };
    } else if (t.closest && t.closest('.stu-char')) {
      var cEl = t.closest('.stu-char');
      var ci = Number(cEl.dataset.ci);
      selQuiet({ kind: 'character', index: ci });
      var pl = pg.characters[ci];
      drag = { mode: 'char-move', ci: ci, startPt: pt, el: cEl,
               startAnchor: { x: pl.anchor.x, y: pl.anchor.y } };
    } else {
      select(null);
      return;
    }
    if (drag) {
      try { if (ev.pointerId !== undefined) stage.setPointerCapture(ev.pointerId); } catch (e) {}
      ev.preventDefault();
    }
  }

  function readRect(elm) {
    return { x: parseFloat(elm.style.left), y: parseFloat(elm.style.top),
             w: parseFloat(elm.style.width), h: parseFloat(elm.style.height) };
  }

  function onPointerMove(ev) {
    if (!drag) return;
    var pt = duPoint(ev);
    var dx = pt.x - drag.startPt.x, dy = pt.y - drag.startPt.y;
    var pg = pageObj();

    if (drag.mode === 'char-move') {
      drag.el.style.left = (parseFloat(drag.el.style.width) / -2 + drag.startAnchor.x + dx) + 'px';
      drag.el.style.top = (drag.startAnchor.y + dy - parseFloat(drag.el.style.height)) + 'px';
      drag.cur = { x: drag.startAnchor.x + dx, y: drag.startAnchor.y + dy };
    } else if (drag.mode === 'char-scale') {
      var k = Math.max(0.2, Math.min(2.5, drag.startScale * (1 + dy / 300)));
      drag.curScale = k;
      render(); /* cheap enough; live preview of scale via re-render */
      /* keep dragging state alive across re-render */
    } else if (drag.mode === 'zone-move') {
      drag.cur = { x: drag.startZone.x + dx, y: drag.startZone.y + dy };
      drag.el.style.left = drag.cur.x + 'px';
      drag.el.style.top = drag.cur.y + 'px';
    } else if (drag.mode === 'zone-resize') {
      var z = resizeRect(drag.startZone, drag.corner, dx, dy);
      /* live-clamp at the module's minZone — the box simply STOPS at the
         minimum (a free shrink that springs back on release reads as broken;
         operator-reported). Corner-aware: west/north corners pin x/y so the
         opposite edge holds still at the clamp. */
      var mz = minZone(pg.interaction);
      if (z.w < mz.w) {
        if (drag.corner.indexOf('w') >= 0) z.x = drag.startZone.x + drag.startZone.w - mz.w;
        z.w = mz.w;
      }
      if (z.h < mz.h) {
        if (drag.corner.indexOf('n') >= 0) z.y = drag.startZone.y + drag.startZone.h - mz.h;
        z.h = mz.h;
      }
      drag.cur = z;
      drag.el.style.left = z.x + 'px'; drag.el.style.top = z.y + 'px';
      drag.el.style.width = z.w + 'px'; drag.el.style.height = z.h + 'px';
      drag.el.classList.remove('stu-amber');
    } else if (drag.mode === 'drect-move') {
      drag.cur = { x: drag.startRect.x + dx, y: drag.startRect.y + dy, w: drag.startRect.w, h: drag.startRect.h };
      drag.el.style.left = drag.cur.x + 'px'; drag.el.style.top = drag.cur.y + 'px';
    } else if (drag.mode === 'drect-resize') {
      var r2 = resizeRect(drag.startRect, 'se', dx, dy);
      r2.w = Math.max(60, r2.w); r2.h = Math.max(60, r2.h);
      drag.cur = r2;
      drag.el.style.width = r2.w + 'px'; drag.el.style.height = r2.h + 'px';
      drag.el.classList.toggle('stu-amber', r2.w < 112 || r2.h < 112);
    } else if (drag.mode === 'point-move') {
      drag.cur = { x: drag.start.x + dx, y: drag.start.y + dy };
      drag.el.style.left = drag.cur.x + 'px'; drag.el.style.top = drag.cur.y + 'px';
    }
  }

  function resizeRect(r0, corner, dx, dy) {
    var r = { x: r0.x, y: r0.y, w: r0.w, h: r0.h };
    if (corner.indexOf('e') >= 0) r.w = r0.w + dx;
    if (corner.indexOf('s') >= 0) r.h = r0.h + dy;
    if (corner.indexOf('w') >= 0) { r.x = r0.x + dx; r.w = r0.w - dx; }
    if (corner.indexOf('n') >= 0) { r.y = r0.y + dy; r.h = r0.h - dy; }
    r.w = Math.max(40, r.w); r.h = Math.max(40, r.h);
    return r;
  }

  function onPointerUp(ev) {
    if (!drag) return;
    var d = drag; drag = null;
    var alt = ev.altKey;
    var pg = pageObj();
    if (!pg) return;

    if (d.mode === 'char-move' && d.cur) {
      global.Studio.mutate('move character', function (draft) {
        var pl = draft.story.pages[S().pageIndex].characters[d.ci];
        pl.anchor.x = snap(d.cur.x, alt);
        pl.anchor.y = snap(d.cur.y, alt);
      });
    } else if (d.mode === 'char-scale' && d.curScale) {
      global.Studio.mutate('scale character', function (draft) {
        draft.story.pages[S().pageIndex].characters[d.ci].scale = Math.round(d.curScale * 100) / 100;
      });
    } else if ((d.mode === 'zone-move' || d.mode === 'zone-resize') && d.cur) {
      global.Studio.mutate('adjust activity area', function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction;
        var oldZone = global.Studio.clone(inter.zone);
        var mz = minZone(inter);
        var z = {
          x: snap(d.cur.x !== undefined ? d.cur.x : oldZone.x, alt),
          y: snap(d.cur.y !== undefined ? d.cur.y : oldZone.y, alt),
          w: snap(Math.max(mz.w, d.cur.w !== undefined ? d.cur.w : oldZone.w), alt),
          h: snap(Math.max(mz.h, d.cur.h !== undefined ? d.cur.h : oldZone.h), alt)
        };
        z.x = Math.max(0, Math.min(z.x, DESIGN_W - z.w));
        z.y = Math.max(0, Math.min(z.y, DESIGN_H - z.h));
        inter.zone = z;
        /* THE INVARIANT: keep children's absolute positions */
        global.Studio.reencodeZoneChildren(inter, oldZone, z);
      });
    } else if ((d.mode === 'drect-move' || d.mode === 'drect-resize') && d.cur) {
      global.Studio.mutate('adjust object', function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction;
        var z = inter.zone;
        var abs = { x: snap(d.cur.x, alt), y: snap(d.cur.y, alt),
                    w: snap(d.cur.w, alt), h: snap(d.cur.h, alt) };
        abs.w = Math.max(112, abs.w); abs.h = Math.max(112, abs.h);
        abs.x = Math.max(z.x, Math.min(abs.x, z.x + z.w - abs.w));
        abs.y = Math.max(z.y, Math.min(abs.y, z.y + z.h - abs.h));
        inter.taskData[d.bind][d.i].rect = global.Studio.toZoneRel(z, abs);
      });
    } else if (d.mode === 'point-move' && d.cur) {
      global.Studio.mutate('move dot', function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction;
        var z = inter.zone;
        var abs = { x: snap(d.cur.x, alt), y: snap(d.cur.y, alt) };
        abs.x = Math.max(z.x + 56, Math.min(abs.x, z.x + z.w - 56));
        abs.y = Math.max(z.y + 56, Math.min(abs.y, z.y + z.h - 56));
        var rel = global.Studio.toZoneRelPt(z, abs);
        inter.taskData[d.bind][d.i].x = rel.x;
        inter.taskData[d.bind][d.i].y = rel.y;
      });
    } else {
      render();   /* no-op drag (a plain click): reflect the new selection */
    }
    /* selection visuals + inspector catch up after the drag settles */
    if (global.StudioInspector) global.StudioInspector.render();
  }

  /* ---------------- place-modes ---------------- */
  function startPlaceCharacter(castDef) {
    placeMode = { kind: 'character', castDef: castDef };
    host.classList.add('stu-placing');
  }
  function startPlaceRect(drawable, onPlaced) {
    placeMode = { kind: 'rect', drawable: drawable, onPlaced: onPlaced };
    host.classList.add('stu-placing');
  }
  function startPlacePoint(drawable) {
    placeMode = { kind: 'point', drawable: drawable };
    host.classList.add('stu-placing');
  }
  /* single-click SCALAR point (sb-maze start/end): one click sets taskData[bind]={x,y}. */
  function startPlaceScalarPoint(drawable) {
    placeMode = { kind: 'scalarPoint', drawable: drawable };
    host.classList.add('stu-placing');
  }
  /* multi-click PATH builder (sb-trace): each click adds a vertex; double-click or
     "Finish" commits taskData[bind] = [{x,y}...]; Escape cancels. */
  function startPlacePath(drawable) {
    placeMode = { kind: 'path', drawable: drawable, pts: [] };
    host.classList.add('stu-placing');
    render();
  }
  /* MAZE wall drawer (sb-maze): click A then B adds a wall {x1,y1,x2,y2}; repeat;
     Escape/Finish exits. start/end/solution stay in the raw-JSON panel. */
  function startPlaceMaze(drawable) {
    placeMode = { kind: 'maze', drawable: drawable, pending: null };
    host.classList.add('stu-placing');
    render();
  }
  /* accumulate a click in path/maze mode (called from onPointerDown) */
  function placeClick(pt) {
    var pg = pageObj(); if (!pg) return;
    var sp = { x: snap(pt.x), y: snap(pt.y) };
    if (placeMode.kind === 'path') { placeMode.pts.push(sp); render(); return; }
    if (placeMode.kind === 'maze') {
      if (!placeMode.pending) { placeMode.pending = sp; render(); return; }
      var a = placeMode.pending, b = sp; placeMode.pending = null;
      global.Studio.mutate('add wall', function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction; var z = inter.zone;
        var ra = global.Studio.toZoneRelPt(z, a), rb = global.Studio.toZoneRelPt(z, b);
        inter.taskData[placeMode.drawable.bind] = inter.taskData[placeMode.drawable.bind] || [];
        inter.taskData[placeMode.drawable.bind].push({ x1: ra.x, y1: ra.y, x2: rb.x, y2: rb.y });
      });
      render();
    }
  }
  /* commit a path being built (double-click / Finish). Needs >= 2 points. */
  function finishPlace() {
    if (!placeMode) return;
    if (placeMode.kind === 'path') {
      var pts = placeMode.pts || [];
      if (pts.length < 2) { cancelPlace(); render(); return; }
      var bind = placeMode.drawable.bind;
      cancelPlace();
      global.Studio.mutate('draw path', function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction; var z = inter.zone;
        inter.taskData[bind] = pts.map(function (p) { return global.Studio.toZoneRelPt(z, p); });
      });
      render();
    } else { cancelPlace(); render(); }   /* maze: Finish just exits */
  }
  function cancelPlace() { placeMode = null; host.classList.remove('stu-placing'); }

  function commitPlace(pt) {
    var pm = placeMode;
    cancelPlace();
    var pg = pageObj();
    if (pm.kind === 'character') {
      global.Studio.mutate('add character', function (draft) {
        var dpg = draft.story.pages[S().pageIndex];
        /* ensure the cast entry + atlas asset exist */
        var cid = pm.castDef.characterId;
        if (!(draft.story.cast || []).some(function (c) { return c.id === cid; })) {
          var atlasId = 'atlas.' + cid + '.base';
          draft.story.assets[atlasId] = { kind: 'atlas', src: pm.castDef.atlasBase };
          draft.story.cast.push({
            id: cid, name: '@cast.' + cid + '.name',
            role: (draft.story.cast.length ? 'companion' : 'guide'),
            atlasBase: atlasId, poses: pm.castDef.poses
          });
          if (!draft.strings['cast.' + cid + '.name']) {
            draft.strings['cast.' + cid + '.name'] = { en: cid.charAt(0).toUpperCase() + cid.slice(1) };
          }
        }
        dpg.characters = dpg.characters || [];
        dpg.characters.push({
          characterId: cid, pose: pm.castDef.poses[0] || 'neutral',
          anchor: { x: snap(pt.x), y: snap(pt.y) }, scale: 1, flip: false
        });
      });
      select({ kind: 'character', index: pageObj().characters.length - 1 });
    } else if (pm.kind === 'rect') {
      var placedIndex = -1;
      global.Studio.mutate('add object', function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction;
        var z = inter.zone;
        var size = pm.drawable.defaultSize || 140;
        var abs = { x: snap(pt.x - size / 2), y: snap(pt.y - size / 2), w: size, h: size };
        abs.x = Math.max(z.x, Math.min(abs.x, z.x + z.w - size));
        abs.y = Math.max(z.y, Math.min(abs.y, z.y + z.h - size));
        inter.taskData[pm.drawable.bind] = inter.taskData[pm.drawable.bind] || [];
        var item = { rect: global.Studio.toZoneRel(z, abs) };
        inter.taskData[pm.drawable.bind].push(item);
        placedIndex = inter.taskData[pm.drawable.bind].length - 1;
      });
      select({ kind: 'drawable', bind: pm.drawable.bind, index: placedIndex });
      if (pm.onPlaced) pm.onPlaced(placedIndex);
    } else if (pm.kind === 'point') {
      global.Studio.mutate('add dot', function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction;
        var z = inter.zone;
        var abs = { x: snap(pt.x), y: snap(pt.y) };
        abs.x = Math.max(z.x + 56, Math.min(abs.x, z.x + z.w - 56));
        abs.y = Math.max(z.y + 56, Math.min(abs.y, z.y + z.h - 56));
        inter.taskData[pm.drawable.bind] = inter.taskData[pm.drawable.bind] || [];
        inter.taskData[pm.drawable.bind].push(global.Studio.toZoneRelPt(z, abs));
      });
    } else if (pm.kind === 'scalarPoint') {
      global.Studio.mutate('set ' + pm.drawable.bind, function (draft) {
        var inter = draft.story.pages[S().pageIndex].interaction;
        var z = inter.zone;
        var abs = { x: snap(pt.x), y: snap(pt.y) };
        abs.x = Math.max(z.x, Math.min(abs.x, z.x + z.w));
        abs.y = Math.max(z.y, Math.min(abs.y, z.y + z.h));
        inter.taskData[pm.drawable.bind] = global.Studio.toZoneRelPt(z, abs);   /* a single {x,y}, not an array */
      });
    }
  }

  /* ---------------- selection + keyboard ---------------- */
  function select(sel) {
    S().selection = sel;
    render();
    global.Studio.state.__selChanged = true;
    if (global.StudioInspector) global.StudioInspector.render();
  }

  function onKeyDown(ev) {
    var tag = (doc.activeElement && doc.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    /* space = pan mode while held (Figma convention) */
    if (ev.key === ' ' && !spaceHeld) { spaceHeld = true; if (host) host.classList.add('stu-pan-ready'); }
    /* while drawing a path/maze: Enter/Escape finish/cancel (works with no selection) */
    if (placeMode && (placeMode.kind === 'path' || placeMode.kind === 'maze')) {
      if (ev.key === 'Enter') { ev.preventDefault(); finishPlace(); return; }
      if (ev.key === 'Escape') { ev.preventDefault(); cancelPlace(); render(); return; }
    }
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'z') {
      ev.preventDefault();
      if (ev.shiftKey) global.Studio.redo(); else global.Studio.undo();
      return;
    }
    /* zoom shortcuts: Ctrl+= / Ctrl+- / Ctrl+0 (fit) / Ctrl+1 (100%) */
    if (ev.ctrlKey || ev.metaKey) {
      if (ev.key === '=' || ev.key === '+') { ev.preventDefault(); zoomIn(); return; }
      if (ev.key === '-') { ev.preventDefault(); zoomOut(); return; }
      if (ev.key === '0') { ev.preventDefault(); zoomFit(); return; }
      if (ev.key === '1') { ev.preventDefault(); zoom100(); return; }
    }
    var sel = S().selection;
    if (!sel) return;
    var step = ev.shiftKey ? 1 : SNAP;
    var dx = ev.key === 'ArrowLeft' ? -step : ev.key === 'ArrowRight' ? step : 0;
    var dy = ev.key === 'ArrowUp' ? -step : ev.key === 'ArrowDown' ? step : 0;
    if (dx || dy) {
      ev.preventDefault();
      nudge(sel, dx, dy);
    } else if (ev.key === 'Delete' || ev.key === 'Backspace') {
      ev.preventDefault();
      deleteSelection(sel);
    } else if (ev.key === 'Escape') {
      cancelPlace(); select(null);
    }
  }

  function nudge(sel, dx, dy) {
    global.Studio.mutate('nudge', function (draft) {
      var dpg = draft.story.pages[S().pageIndex];
      if (sel.kind === 'character') {
        var pl = dpg.characters[sel.index];
        pl.anchor.x += dx; pl.anchor.y += dy;
      } else if (sel.kind === 'zone' && dpg.interaction) {
        var oldZone = global.Studio.clone(dpg.interaction.zone);
        dpg.interaction.zone.x += dx; dpg.interaction.zone.y += dy;
        global.Studio.reencodeZoneChildren(dpg.interaction, oldZone, dpg.interaction.zone);
      } else if (sel.kind === 'drawable' && dpg.interaction) {
        var it = dpg.interaction.taskData[sel.bind][sel.index];
        it.rect.x += dx; it.rect.y += dy;
      } else if (sel.kind === 'point' && dpg.interaction) {
        var pn = dpg.interaction.taskData[sel.bind][sel.index];
        pn.x += dx; pn.y += dy;
      } else return false;
    });
  }

  function deleteSelection(sel) {
    global.Studio.mutate('delete', function (draft) {
      var dpg = draft.story.pages[S().pageIndex];
      if (sel.kind === 'character') dpg.characters.splice(sel.index, 1);
      else if (sel.kind === 'drawable') dpg.interaction.taskData[sel.bind].splice(sel.index, 1);
      else if (sel.kind === 'point') dpg.interaction.taskData[sel.bind].splice(sel.index, 1);
      else return false;
    });
    select(null);
  }

  /* ---------------- pan input (space-drag / middle-drag / wheel) ---------------- */
  var spaceHeld = false;
  var panDrag = null;
  function onKeyUp(ev) {
    if (ev.key === ' ') { spaceHeld = false; if (host) host.classList.remove('stu-pan-ready'); }
  }
  /* capture-phase on the HOST: intercept ONLY space/middle drags so plain
     left-drags reach the stage handlers untouched (the m2 drag contract) */
  function onHostPointerDownCapture(ev) {
    if (!spaceHeld && ev.button !== 1) return;
    ev.preventDefault(); ev.stopPropagation();
    panDrag = { x: ev.clientX, y: ev.clientY, tx: view.tx, ty: view.ty };
    host.classList.add('stu-panning');
    var move = function (e2) {
      if (!panDrag) return;
      view.tx = panDrag.tx + (e2.clientX - panDrag.x);
      view.ty = panDrag.ty + (e2.clientY - panDrag.y);
      view.mode = 'manual';
      clampPan(); applyView();
    };
    var up = function () {
      panDrag = null;
      host.classList.remove('stu-panning');
      global.removeEventListener('pointermove', move);
      global.removeEventListener('pointerup', up);
    };
    global.addEventListener('pointermove', move);
    global.addEventListener('pointerup', up);
  }
  function onWheel(ev) {
    ev.preventDefault();   /* the host owns its wheel (no page scroll behind) */
    if (ev.ctrlKey || ev.metaKey) {
      setZoom(scale * (ev.deltaY < 0 ? 1.12 : 1 / 1.12), ev.clientX, ev.clientY);
    } else if (ev.shiftKey) {
      panBy(-(ev.deltaY || ev.deltaX), 0);
    } else {
      panBy(-ev.deltaX, -ev.deltaY);
    }
  }

  /* ---------------- boot ---------------- */
  function mount(hostEl) {
    host = hostEl;
    stage = el('div', 'stu-stage');
    host.appendChild(stage);
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('dblclick', function (ev) { if (placeMode && placeMode.kind === 'path') { ev.preventDefault(); finishPlace(); } });
    host.addEventListener('pointerdown', onHostPointerDownCapture, true);
    host.addEventListener('wheel', onWheel, { passive: false });
    doc.addEventListener('keydown', onKeyDown);
    doc.addEventListener('keyup', onKeyUp);
    global.addEventListener('resize', onHostResized);
    if (typeof ResizeObserver === 'function') {
      /* rail/panel collapse resizes the grid track — refit (or re-clamp) live;
         never mid-drag (a refit would yank the element under the pointer) */
      var ro = new ResizeObserver(function () { onHostResized(); });
      ro.observe(host);
    }
    global.Studio.on(function (ev) {
      if (ev === 'change' || ev === 'loaded') {
        preloadPageAtlases().then(function () { render(); });
        if (ev === 'loaded') zoomFit();
      }
    });
    zoomFit();
  }
  function onHostResized() {
    if (drag || panDrag) return;
    if (view.mode === 'fit') zoomFit();
    else { clampPan(); applyView(); }
  }

  function preloadPageAtlases() {
    var st = S();
    if (!st.doc) return Promise.resolve();
    var story = st.doc.story;
    var ps = [];
    (story.cast || []).forEach(function (c) {
      if (!loadedAtlases[c.atlasBase]) ps.push(loadAtlasFor(c));
    });
    return Promise.all(ps);
  }

  global.StudioCanvas = {
    mount: mount,
    render: render,
    fit: fit,
    zoomFit: zoomFit,
    setZoom: setZoom,
    zoomIn: zoomIn,
    zoomOut: zoomOut,
    zoom100: zoom100,
    panBy: panBy,
    getView: getView,
    onView: onView,
    select: select,
    FrameCache: FrameCache,
    startPlaceCharacter: startPlaceCharacter,
    startPlaceRect: startPlaceRect,
    startPlacePoint: startPlacePoint,
    startPlaceScalarPoint: startPlaceScalarPoint,
    startPlacePath: startPlacePath,
    startPlaceMaze: startPlaceMaze,
    finishPlace: finishPlace,
    cancelPlace: cancelPlace,
    loadedAtlases: loadedAtlases
  };
}(typeof window !== 'undefined' ? window : this));
