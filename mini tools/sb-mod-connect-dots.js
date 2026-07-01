/* ============================================================================
   sb-mod-connect-dots.js — NATIVE module: numeral order / path-following
   (the tap-safe K-3 form of tracing). Numbered dots; the child taps them in
   sequence 1..N; the connecting line grows dot by dot; the completed outline
   fills softly — the drawing IS the reveal. All geometry is DATA
   (zone-relative design units); pure generated SVG, zero art.

   Page taskData:
     { "points": [ {"x":120,"y":300}, {"x":400,"y":80}, {"x":680,"y":300},
                   {"x":540,"y":560}, {"x":260,"y":560} ],   // order = tap order
       "closePath": true,          // close the outline after the last dot
       "fill": "#F7C948" }         // soft reveal fill (optional)
   Points are zone-relative; validator enforces >=2..12 points, in-zone,
   pairwise >=120du apart (tap disambiguation), dots ~112du tap floor.
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbcd{position:relative;width:100%;height:100%;}',
      '.sbcd svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}',
      '.sbcd-dot{position:absolute;transform:translate(-50%,-50%);width:11%;min-width:44px;aspect-ratio:1;',
      '  border-radius:50%;border:4px solid #146B5E;background:#fff;color:#146B5E;cursor:pointer;',
      '  font-weight:900;font-size:1.3em;display:flex;align-items:center;justify-content:center;',
      '  -webkit-tap-highlight-color:transparent;touch-action:manipulation;box-shadow:0 2px 6px rgba(0,0,0,.22);}',
      '.sbcd-dot.sbcd-done{background:#146B5E;color:#fff;cursor:default;}',
      '.sbcd-dot.sbcd-next{border-color:#F2784B;}',
      '@keyframes sbcd-shake{0%,100%{transform:translate(-50%,-50%);}25%{transform:translate(-54%,-50%);}75%{transform:translate(-46%,-50%);}}',
      '.sbcd-dot.sbcd-no{animation:sbcd-shake .3s ease 2;}',
      '@media (prefers-reduced-motion: reduce){.sbcd-dot.sbcd-no{animation:none;}}',
      '.sbcd-dot.sbcd-hint{outline:5px dashed #F2784B;outline-offset:3px;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbcd-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  var SVGNS = 'http://www.w3.org/2000/svg';

  global.SBModules.register({
    meta: {
      type: 'sb-connect-dots', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 520, h: 420 },
      studio: {
        label: 'Connect the dots', group: 'Look & find', icon: '✏️',
        blurb: 'Numbered dots — tapping them in order draws a shape.',
        defaults: { points: [], closePath: true, fill: '#F7C948' },
        fields: [
          { key: 'closePath', kind: 'boolean', label: 'Close the shape at the end' },
          { key: 'fill', kind: 'enum', label: 'Fill color', from: ['#F7C948', '#F2784B', '#8FBF6C', '#7FC4D8', '#E86A5A', '#FBF3E4'] }
        ],
        drawables: [{
          kind: 'point', bind: 'points', ordered: true, min: 3, max: 12,
          minSpacing: 120, addLabel: 'Add a dot'
        }]
      }
    },

    validateTask: function (taskData, v) {
      var pts = taskData.points;
      if (!Array.isArray(pts) || pts.length < 3 || pts.length > 12) {
        return v.error('sb-connect-dots: points must be 3-12');
      }
      pts.forEach(function (p, i) {
        if (typeof p.x !== 'number' || typeof p.y !== 'number') {
          v.error('sb-connect-dots: points[' + i + '] needs numeric x,y');
          return;
        }
        if (v.zone && (p.x < 56 || p.y < 56 || p.x > v.zone.w - 56 || p.y > v.zone.h - 56)) {
          v.error('sb-connect-dots: points[' + i + '] too close to the zone edge (dot would clip)');
        }
        for (var j = 0; j < i; j++) {
          var dx = p.x - pts[j].x, dy = p.y - pts[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < 120) {
            v.error('sb-connect-dots: points ' + j + ' and ' + i + ' closer than 120 design units');
          }
        }
      });
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var dotEls = [], next = 0, poly = null, fillShape = null, svg = null;

      function pct(p) {
        return { x: p.x / ctx.zone.w * 100, y: p.y / ctx.zone.h * 100 };
      }
      function updateLine() {
        var pts = ctx.taskData.points.slice(0, next);
        var s = pts.map(function (p) {
          var q = pct(p);
          return q.x + ',' + q.y;
        }).join(' ');
        if (done && ctx.taskData.closePath !== false && pts.length) {
          var q0 = pct(ctx.taskData.points[0]);
          s += ' ' + q0.x + ',' + q0.y;
        }
        poly.setAttribute('points', s);
        if (done && fillShape) {
          fillShape.setAttribute('points', s);
          fillShape.setAttribute('opacity', '0.5');
        }
      }
      function markNext() {
        dotEls.forEach(function (el, i) {
          el.classList.toggle('sbcd-next', i === next && !done);
        });
      }
      function onTap(i) {
        if (!enabled || done) return;
        if (i === next) {
          next++;
          dotEls[i].classList.add('sbcd-done');
          ctx.audio.speak({ type: 'number', text: String(i + 1) });
          if (next === ctx.taskData.points.length) {
            done = true;
            updateLine();
            markNext();
            ctx.report.progress({ done: next, total: ctx.taskData.points.length });
            ctx.report.success();
          } else {
            updateLine();
            markNext();
            ctx.report.progress({ done: next, total: ctx.taskData.points.length });
          }
        } else if (!dotEls[i].classList.contains('sbcd-done')) {
          if (!ctx.reducedMotion) {
            dotEls[i].classList.remove('sbcd-no'); void dotEls[i].offsetWidth;
            dotEls[i].classList.add('sbcd-no');
          }
          ctx.report.miss({ tapped: i + 1, expected: next + 1 });
        }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var wrap = ctx.el('div', 'sbcd');

          svg = global.document.createElementNS(SVGNS, 'svg');
          svg.setAttribute('viewBox', '0 0 100 100');
          svg.setAttribute('preserveAspectRatio', 'none');
          fillShape = global.document.createElementNS(SVGNS, 'polygon');
          fillShape.setAttribute('fill', ctx.taskData.fill || '#F7C948');
          fillShape.setAttribute('opacity', '0');
          fillShape.setAttribute('stroke', 'none');
          svg.appendChild(fillShape);
          poly = global.document.createElementNS(SVGNS, 'polyline');
          poly.setAttribute('fill', 'none');
          poly.setAttribute('stroke', '#146B5E');
          poly.setAttribute('stroke-width', '1.6');
          poly.setAttribute('stroke-linecap', 'round');
          poly.setAttribute('stroke-linejoin', 'round');
          svg.appendChild(poly);
          wrap.appendChild(svg);

          ctx.taskData.points.forEach(function (p, i) {
            var d = ctx.el('button', 'sbcd-dot');
            d.type = 'button';
            var q = pct(p);
            d.style.left = q.x + '%';
            d.style.top = q.y + '%';
            d.textContent = String(i + 1);
            d.setAttribute('aria-label', String(i + 1));
            d.addEventListener('click', function () { onTap(i); });
            wrap.appendChild(d);
            dotEls.push(d);
          });
          markNext();
          ctx.surface.el.appendChild(wrap);
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          var el = dotEls[next];
          if (!el) return;
          el.classList.add('sbcd-hint');
          setTimeout(function () { el.classList.remove('sbcd-hint'); }, 1600);
        },
        autoSolve: function () {
          enabled = true;
          while (!done && next < ctx.taskData.points.length) onTap(next);
        },
        destroy: function () { done = true; enabled = false; dotEls = []; poly = null; svg = null; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
