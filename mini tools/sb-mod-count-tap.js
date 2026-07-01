/* ============================================================================
   sb-mod-count-tap.js — NATIVE module: cardinality / one-to-one
   correspondence (count OUT a set). M copies of an item are scattered
   (seeded, non-overlapping); the child taps items to count them — each tap
   gets a numbered badge and speaks the count word; tapping a counted item
   un-counts it (badges renumber). Deferred Check grades tapped === target
   (counting-out N from M is the K.CC skill; the Check is the commit moment).

   Page taskData:
     { "item":   { "key": "apple", "image": "img.apple", "word": "@p.word.apple" },
       "total":  7,        // items shown (3..10)
       "target": 5,        // how many to count out (2..total-1)
       "seed":   9 }
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbct{position:relative;width:100%;height:100%;}',
      '.sbct-item{position:absolute;transform:translate(-50%,-50%);width:17%;min-width:48px;aspect-ratio:1;',
      '  border:none;background:transparent;padding:0;cursor:pointer;',
      '  -webkit-tap-highlight-color:transparent;touch-action:manipulation;}',
      '.sbct-item::after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);',
      '  width:max(100%,44px);height:max(100%,44px);}',
      '.sbct-item img{width:100%;height:100%;object-fit:contain;pointer-events:none;',
      '  filter:drop-shadow(0 3px 5px rgba(0,0,0,.22));}',
      '.sbct-item.sbct-counted{outline:4px solid #146B5E;outline-offset:2px;border-radius:14px;}',
      '.sbct-badge{position:absolute;right:-8px;top:-8px;width:32px;height:32px;border-radius:50%;',
      '  background:#F2784B;color:#fff;font-weight:900;font-size:17px;display:flex;align-items:center;',
      '  justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,.3);pointer-events:none;}',
      '.sbct-item.sbct-bad{outline-color:#D64541;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbct-css'; st.textContent = css;
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

  /* seeded non-overlapping scatter: jittered grid slots, shuffled */
  function scatter(n, seed) {
    var rand = mulberry(seed);
    var cols = Math.ceil(Math.sqrt(n * 1.6));
    var rows = Math.ceil(n / cols);
    var slots = [];
    for (var r = 0; r < rows; r++) {
      for (var c2 = 0; c2 < cols; c2++) slots.push({ r: r, c: c2 });
    }
    for (var i = slots.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = slots[i]; slots[i] = slots[j]; slots[j] = t;
    }
    return slots.slice(0, n).map(function (s) {
      var cw = 100 / cols, rh = 100 / rows;
      return {
        x: (s.c + 0.5) * cw * 0.86 + 7 + (rand() - 0.5) * cw * 0.3,
        y: (s.r + 0.5) * rh * 0.86 + 7 + (rand() - 0.5) * rh * 0.3
      };
    });
  }

  global.SBModules.register({
    meta: {
      type: 'sb-count-tap', version: 1, surfaces: ['dom'],
      completionModes: ['check'], minZone: { w: 520, h: 420 }
    },

    validateTask: function (taskData, v) {
      if (!taskData.item || !taskData.item.image) {
        v.error('sb-count-tap: item {key, image} required');
      } else v.assetExists(taskData.item.image);
      if (taskData.item && typeof taskData.item.word === 'string' && taskData.item.word.charAt(0) === '@') {
        v.stringExists(taskData.item.word.slice(1));
      }
      if (!(taskData.total >= 3 && taskData.total <= 10)) v.error('sb-count-tap: total must be 3..10');
      if (!(taskData.target >= 2 && taskData.target < taskData.total)) {
        v.error('sb-count-tap: target must be 2..total-1 (counting OUT of a larger set)');
      }
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var els = [], counted = [];     /* counted = element indices in tap order */

      function renumber() {
        els.forEach(function (el) {
          var b = el.querySelector('.sbct-badge');
          if (b) b.parentNode.removeChild(b);
          el.classList.remove('sbct-counted');
        });
        counted.forEach(function (idx, ord) {
          var el = els[idx];
          el.classList.add('sbct-counted');
          var badge = ctx.el('div', 'sbct-badge');
          badge.textContent = String(ord + 1);
          el.appendChild(badge);
        });
        ctx.report.answerChanged(counted.length > 0);
        ctx.announce(counted.length + ' / ' + ctx.taskData.target);
      }

      function onTap(idx) {
        if (!enabled || done) return;
        var at = counted.indexOf(idx);
        if (at >= 0) {
          counted.splice(at, 1);
          ctx.audio.pop(420);
        } else {
          counted.push(idx);
          ctx.audio.speak({ type: 'number', text: String(counted.length) });
        }
        renumber();
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var wrap = ctx.el('div', 'sbct');
          var pos = scatter(ctx.taskData.total, ctx.taskData.seed || 1);
          for (var i = 0; i < ctx.taskData.total; i++) {
            var b = ctx.el('button', 'sbct-item');
            b.type = 'button';
            b.setAttribute('aria-label', (ctx.taskData.item.key || 'item') + ' ' + (i + 1));
            b.style.left = pos[i].x + '%';
            b.style.top = pos[i].y + '%';
            b.appendChild(ctx.assets.img(ctx.taskData.item.image));
            (function (idx) {
              b.addEventListener('click', function () { onTap(idx); });
            }(i));
            wrap.appendChild(b);
            els.push(b);
          }
          ctx.surface.el.appendChild(wrap);
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        check: function () {
          var ok = counted.length === ctx.taskData.target;
          if (ok) {
            done = true;
          } else {
            els.forEach(function (el) {
              if (el.classList.contains('sbct-counted')) el.classList.add('sbct-bad');
            });
            setTimeout(function () {
              els.forEach(function (el) { el.classList.remove('sbct-bad'); });
            }, 1100);
          }
          return { ok: ok };
        },
        showHint: function () {
          ctx.announce(counted.length + ' / ' + ctx.taskData.target);
        },
        autoSolve: function () {
          enabled = true;
          counted = [];
          for (var i = 0; i < ctx.taskData.target; i++) counted.push(i);
          renumber();
        },
        destroy: function () { done = true; enabled = false; els = []; counted = []; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
