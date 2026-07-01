/* ============================================================================
   sb-mod-sequence.js — NATIVE module: seriation / ordering.
   The child taps the items IN ORDER (smallest→biggest, first→last…). Each
   correct tap locks the item with an ordinal badge; a wrong tap is a gentle
   miss. Zero new art: items render as library images (sized by value for
   size-seriation), code-drawn bars, or text labels.

   Page taskData:
     { "items": [ { "key":"s1", "image":"img.apple", "value":1 },   // face: image
                  { "key":"s2", "bar":true,          "value":2 },   // face: code-drawn bar
                  { "key":"s3", "label":"@k",        "value":3 } ], // face: text
       "direction": "asc" | "desc",
       "sizeByValue": true,        // scale image faces by value (size seriation)
       "seed": 7 }                 // display shuffle
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbsq{width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:3%;}',
      '.sbsq-item{position:relative;border:4px solid rgba(20,107,94,.45);border-radius:16px;',
      '  background:rgba(255,255,255,.75);cursor:pointer;display:flex;align-items:flex-end;',
      '  justify-content:center;padding:6%;flex:1 1 0;max-width:26%;height:80%;',
      '  -webkit-tap-highlight-color:transparent;touch-action:manipulation;}',
      '.sbsq-item img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;}',
      '.sbsq-bar{width:60%;background:#146B5E;border-radius:8px 8px 4px 4px;pointer-events:none;}',
      '.sbsq-label{font-weight:900;color:#1c1a17;pointer-events:none;}',
      '.sbsq-item.sbsq-done{border-color:#146B5E;background:rgba(20,107,94,.14);cursor:default;}',
      '.sbsq-badge{position:absolute;top:-16px;left:50%;transform:translateX(-50%);width:36px;height:36px;',
      '  border-radius:50%;background:#F2784B;color:#fff;font-weight:900;font-size:19px;',
      '  display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.3);}',
      '@keyframes sbsq-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}',
      '.sbsq-item.sbsq-no{animation:sbsq-shake .3s ease 2;}',
      '@media (prefers-reduced-motion: reduce){.sbsq-item.sbsq-no{animation:none;}}',
      '.sbsq-item.sbsq-hint{outline:5px dashed #F2784B;outline-offset:3px;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbsq-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  function mulberry(seed) {
    var s = seed | 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function resolveStr(v, ctx) {
    if (typeof v === 'string' && v.charAt(0) === '@') return ctx.t(v.slice(1));
    return v || '';
  }

  global.SBModules.register({
    meta: {
      type: 'sb-sequence', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 560, h: 360 }
    },

    validateTask: function (taskData, v) {
      var items = taskData.items;
      if (!Array.isArray(items) || items.length < 3 || items.length > 6) {
        return v.error('sb-sequence: items must be 3-6');
      }
      var vals = {};
      items.forEach(function (it, i) {
        if (!it.key) v.error('sb-sequence: items[' + i + '] missing key');
        if (typeof it.value !== 'number') v.error('sb-sequence: items[' + i + '] missing numeric value');
        if (vals[it.value]) v.error('sb-sequence: duplicate value ' + it.value + ' (order must be unambiguous)');
        vals[it.value] = 1;
        if (it.image) v.assetExists(it.image);
        else if (it.label != null) {
          if (typeof it.label === 'string' && it.label.charAt(0) === '@') v.stringExists(it.label.slice(1));
        } else if (!it.bar) v.error('sb-sequence: items[' + i + '] needs image, label, or bar:true');
      });
      if (['asc', 'desc'].indexOf(taskData.direction || 'asc') < 0) {
        v.error('sb-sequence: direction must be asc or desc');
      }
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var els = {}, expected = [], nextIdx = 0;

      function onTap(key) {
        if (!enabled || done) return;
        var el = els[key];
        if (el.classList.contains('sbsq-done')) return;
        if (key === expected[nextIdx]) {
          nextIdx++;
          el.classList.add('sbsq-done');
          var badge = ctx.el('div', 'sbsq-badge');
          badge.textContent = String(nextIdx);
          el.appendChild(badge);
          ctx.audio.speak({ type: 'number', text: String(nextIdx) });
          ctx.report.progress({ done: nextIdx, total: expected.length });
          if (nextIdx === expected.length) { done = true; ctx.report.success(); }
        } else {
          if (!ctx.reducedMotion) {
            el.classList.remove('sbsq-no'); void el.offsetWidth; el.classList.add('sbsq-no');
          }
          ctx.report.miss({ tapped: key });
        }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var items = ctx.taskData.items.slice();
          var dir = ctx.taskData.direction || 'asc';
          expected = items.slice().sort(function (a, b) {
            return dir === 'asc' ? a.value - b.value : b.value - a.value;
          }).map(function (it) { return it.key; });

          /* seeded display shuffle — never show them pre-ordered */
          var rand = mulberry(ctx.taskData.seed || 1);
          var disp = items.slice();
          for (var i = disp.length - 1; i > 0; i--) {
            var j = Math.floor(rand() * (i + 1));
            var t = disp[i]; disp[i] = disp[j]; disp[j] = t;
          }
          var ordered = disp.every(function (it, k) { return it.key === expected[k]; });
          if (ordered) disp.reverse();

          var wrap = ctx.el('div', 'sbsq');
          var maxV = Math.max.apply(null, items.map(function (it) { return it.value; }));
          disp.forEach(function (it) {
            var b = ctx.el('button', 'sbsq-item');
            b.type = 'button';
            b.setAttribute('aria-label', resolveStr(it.label, ctx) || it.key);
            if (it.image) {
              var img = ctx.assets.img(it.image);
              if (ctx.taskData.sizeByValue) {
                img.style.maxHeight = Math.round(35 + 60 * (it.value / maxV)) + '%';
              }
              b.appendChild(img);
            } else if (it.bar) {
              var bar = ctx.el('div', 'sbsq-bar');
              bar.style.height = Math.round(20 + 72 * (it.value / maxV)) + '%';
              b.appendChild(bar);
            } else {
              var lb = ctx.el('div', 'sbsq-label');
              lb.textContent = resolveStr(it.label, ctx);
              lb.style.fontSize = '2.2em';
              b.appendChild(lb);
            }
            b.addEventListener('click', function () { onTap(it.key); });
            wrap.appendChild(b);
            els[it.key] = b;
          });
          ctx.surface.el.appendChild(wrap);
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          var el = els[expected[nextIdx]];
          if (!el) return;
          el.classList.add('sbsq-hint');
          setTimeout(function () { el.classList.remove('sbsq-hint'); }, 1600);
        },
        autoSolve: function () {
          enabled = true;
          expected.slice(nextIdx).forEach(function (k) { onTap(k); });
        },
        destroy: function () { done = true; enabled = false; els = {}; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
