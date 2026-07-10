/* ============================================================================
   sb-mod-listen-place.js — NATIVE pre-school module: LISTEN to a spoken
   instruction ("put the cat UNDER the table") and DRAG the object to the right
   spot. A reference picture sits in the middle; big dashed candidate spots ring
   it (above / below / beside). The child hears the preposition and drags the
   object there — a wrong spot drifts it gently back, never wrong-locked. Because
   the instruction is AUDIO, muted play (or two misses) lights the correct spot so
   a non-hearing child still succeeds (audio-equity). Completes when the object
   rests in the correct spot.

   Page taskData:
     { "object": { "image": "img.cat", "alt": "@key" },
       "reference": { "image": "img.table", "at": { "x": 500, "y": 340 } },
       "slots": [ { "key": "under", "at": { "x": 500, "y": 560 }, "correct": true },
                  { "key": "above", "at": { "x": 500, "y": 150 } } ] }
   The page NARRATION carries the instruction; exactly one slot is `correct`.
   completionMode: "auto".  Reads window.SBKit (sb-preschool-kit.js) + ctx.band.
   ========================================================================= */
(function (global) {
  'use strict';

  var OS = 240;   /* object size (du) — the drag handle, >= PK drag-handle floor */
  var SLOTR = 140;
  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return; _cssDone = true;
    var css = [
      '.sblp{position:relative;width:100%;height:100%;}',
      '.sblp-svg{display:block;width:100%;height:100%;touch-action:none;}',
      '.sblp-slot{fill:rgba(20,107,94,.04);stroke:rgba(91,81,69,.55);stroke-width:4;stroke-dasharray:12 14;}',
      '.sblp-slot.sblp-lit{stroke:#F2784B;}',
      '.sblp-slot.sblp-ans{stroke:#F2784B;animation:sblp-pulse 1.1s ease-in-out infinite;}',
      '@keyframes sblp-pulse{0%,100%{opacity:.55;}50%{opacity:1;}}',
      '.sblp-obj{cursor:grab;}',
      '.sblp-obj.sblp-return{transition:transform .35s ease;}',
      '@media (prefers-reduced-motion: reduce){.sblp-obj.sblp-return{transition:none;}.sblp-slot.sblp-ans{animation:none;opacity:.9;}}'
    ].join('\n');
    var st = global.document.createElement('style'); st.id = 'sblp-css'; st.textContent = css;
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
      type: 'sb-listen-place', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 560, h: 480 },
      studio: {
        label: 'Listen & place', group: 'Drag & place', icon: '👂',
        blurb: 'Hear where the object goes, then drag it there. Audio-first; muted play reveals the spot.',
        defaults: {
          object: { image: 'img.cat', alt: '@key' },
          reference: { image: 'img.table', at: { x: 500, y: 340 } },
          slots: [{ key: 'under', at: { x: 500, y: 560 }, correct: true }, { key: 'above', at: { x: 500, y: 150 } }]
        },
        drawables: [{
          kind: 'point', bind: 'slots', authorable: 'studio', min: 2, addLabel: 'Add a spot', badge: 'key',
          fields: [
            { key: 'key', kind: 'text', label: 'Spot name (under / above / beside)' },
            { key: 'correct', kind: 'boolean', label: 'This is the RIGHT spot (exactly one)' }
          ]
        }],
        fields: [{ key: 'object', kind: 'assetRef', label: 'Object image' }, { key: 'reference', kind: 'assetRef', label: 'Reference image' }]
      }
    },

    validateTask: function (taskData, v) {
      var o = taskData.object, s = taskData.slots;
      if (!o || !o.image) { v.error('sb-listen-place: needs object.image'); }
      if (!Array.isArray(s) || s.length < 2) { v.error('sb-listen-place: needs >= 2 slots (a choice)'); return; }
      var z = v.zone || { w: 1600, h: 1000 }; var band = v.band; var nCorrect = 0;
      for (var i = 0; i < s.length; i++) {
        var sl = s[i];
        if (!sl || !sl.at || !isFinite(sl.at.x) || !isFinite(sl.at.y)) { v.error('sb-listen-place: slots[' + i + '] needs at:{x,y}'); continue; }
        if (sl.at.x - SLOTR < 0 || sl.at.y - SLOTR < 0 || sl.at.x + SLOTR > z.w || sl.at.y + SLOTR > z.h) v.error('sb-listen-place: slots[' + i + '] falls outside the zone ' + z.w + 'x' + z.h);
        if (sl.correct) nCorrect++;
      }
      if (nCorrect !== 1) v.error('sb-listen-place: exactly ONE slot must have correct:true (found ' + nCorrect + ')');
      if (band && band.fatal && OS < band.fatal.minDragHandle) v.error('sb-listen-place: object ' + OS + 'du < PK drag-handle floor ' + band.fatal.minDragHandle + 'du');
      if (o && o.alt && String(o.alt).charAt(0) === '@') v.stringExists(String(o.alt).slice(1));
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var K = global.SBKit;
      var slots = [], correctIdx = -1, snap = 220;
      var sv = null, slotEls = [], objG = null, obj = null, eq = null, ghost = null, drag = null;

      function toVB(ev) { var r = sv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * ctx.zone.w, y: (ev.clientY - r.top) / r.height * ctx.zone.h }; }
      function setPos(x, y) { obj.cx = x; obj.cy = y; objG.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')'); }
      function nearestSlot() { var bi = -1, bd = Infinity; for (var i = 0; i < slots.length; i++) { var d = Math.hypot(obj.cx - slots[i].at.x, obj.cy - slots[i].at.y); if (d < bd) { bd = d; bi = i; } } return { i: bi, d: bd }; }
      function seat(i) {
        done = true; setPos(slots[i].at.x, slots[i].at.y);
        for (var k = 0; k < slotEls.length; k++) slotEls[k].classList.remove('sblp-lit', 'sblp-ans');
        try { ctx.audio.pop(560); } catch (e) {}
        try { ctx.announce('placed'); } catch (e) {}
        ctx.report.success();
      }
      function returnHome() { objG.classList.add('sblp-return'); setPos(obj.home.x, obj.home.y); (function (g) { global.setTimeout(function () { g.classList.remove('sblp-return'); }, 380); }(objG)); if (eq) eq.onMiss(); try { ctx.audio.pop(320); } catch (e) {} }

      function beginDrag(ev) { if (!enabled || done) return; objG.classList.remove('sblp-return'); var pt = toVB(ev); obj.grab = { dx: obj.cx - pt.x, dy: obj.cy - pt.y }; try { sv.appendChild(objG); } catch (e) {} }
      function moveDrag(ev) { if (done) return; var pt = toVB(ev); setPos(pt.x + obj.grab.dx, pt.y + obj.grab.dy); var n = nearestSlot(); for (var i = 0; i < slotEls.length; i++) slotEls[i].classList.toggle('sblp-lit', i === n.i && n.d <= snap); }
      function endDrag() { if (done) return; var n = nearestSlot(); for (var i = 0; i < slotEls.length; i++) slotEls[i].classList.remove('sblp-lit'); if (n.i === correctIdx && n.d <= snap) seat(n.i); else returnHome(); }

      return {
        mount: function (c) {
          ctx = c; injectCSS();
          var band = ctx.band || {};
          slots = (ctx.taskData.slots || []).map(function (s) { return { key: s.key, at: { x: +s.at.x, y: +s.at.y }, correct: !!s.correct }; });
          correctIdx = slots.reduce(function (acc, s, i) { return s.correct ? i : acc; }, -1);
          snap = ctx.taskData.snapDu || band.nearFitSnapRadius || 220;
          eq = K.equity(ctx, function () { if (slotEls[correctIdx]) slotEls[correctIdx].classList.add('sblp-ans'); });

          var wrap = ctx.el('div', 'sblp');
          sv = svg('svg', { class: 'sblp-svg', viewBox: '0 0 ' + ctx.zone.w + ' ' + ctx.zone.h, preserveAspectRatio: 'xMidYMid meet' });
          sv.setAttribute('aria-label', 'Listen, then drag the object to the right spot');

          /* candidate spots */
          slotEls = slots.map(function (s) { var el = svg('circle', { class: 'sblp-slot', cx: s.at.x, cy: s.at.y, r: SLOTR }); sv.appendChild(el); return el; });
          /* reference picture */
          if (ctx.taskData.reference && ctx.taskData.reference.image && ctx.taskData.reference.at) {
            try { sv.appendChild(imageAt(ctx.assets.url(ctx.taskData.reference.image), +ctx.taskData.reference.at.x, +ctx.taskData.reference.at.y, 320)); } catch (e) {}
          }
          /* draggable object in a tray corner (bottom-left, away from the spots) */
          var hx = OS / 2 + 40, hy = ctx.zone.h - OS / 2 - 30;
          objG = svg('g', { class: 'sblp-obj' });
          /* v3 (storybook de-quiz): the dragged thing IS the story's object — no white
             disc backing; a soft ground shadow keeps it liftable-looking. The full
             OS-sized transparent hit circle preserves the PK drag-handle floor. */
          objG.appendChild(svg('circle', { cx: 0, cy: 0, r: OS / 2, fill: '#fff', 'fill-opacity': '0.001' }));
          objG.appendChild(svg('ellipse', { cx: 0, cy: OS * 0.4, rx: OS * 0.36, ry: OS * 0.09, fill: '#1c1a17', opacity: '0.18' }));
          try { objG.appendChild(imageAt(ctx.assets.url(ctx.taskData.object.image), 0, 0, OS * 0.95)); } catch (e) {}
          sv.appendChild(objG);
          obj = { cx: hx, cy: hy, home: { x: hx, y: hy }, grab: { dx: 0, dy: 0 } };
          objG.setAttribute('transform', 'translate(' + hx + ',' + hy + ')');
          drag = K.drag2d(objG, { canStart: function () { return enabled && !done; }, onStart: beginDrag, onMove: moveDrag, onEnd: endDrag });

          wrap.appendChild(sv);
          ctx.surface.el.appendChild(wrap);
          eq.maybeRevealMuted();
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          if (!sv || correctIdx < 0) return;
          var r = sv.getBoundingClientRect(); var toPx = function (p) { return { x: (p.x / ctx.zone.w) * r.width, y: (p.y / ctx.zone.h) * r.height }; };
          if (ghost) ghost.cancel();
          ghost = K.ghostHand(ctx.surface.el, [toPx(obj.home), toPx(slots[correctIdx].at)], { reducedMotion: ctx.reducedMotion, icon: '👆' });
        },
        autoSolve: function () { enabled = true; if (correctIdx >= 0 && !done) seat(correctIdx); },
        qaGesture: function () { return { kind: 'drops', pairs: [{ from: { x: obj.home.x, y: obj.home.y }, to: { x: slots[correctIdx].at.x, y: slots[correctIdx].at.y } }], tol: snap, zone: { w: ctx.zone.w, h: ctx.zone.h } }; },
        destroy: function () { done = true; enabled = false; if (drag) { try { drag.destroy(); } catch (e) {} drag = null; } if (ghost) { ghost.cancel(); ghost = null; } sv = null; slots = []; slotEls = []; objG = null; obj = null; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
