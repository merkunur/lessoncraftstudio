/* ============================================================================
   sb-mod-find-object.js — NATIVE reference module: find the named object(s)
   in the scene. A mechanic that could not exist in the activity system —
   the interaction zone can span the whole illustrated stage, and the objects
   live INSIDE the story scene.

   Pure-data authoring: objects are image-library nouns (or story stickers)
   placed at operator-supplied ZONE-RELATIVE rects (design units — the
   operator eyeballs positions in their art tool, the module never infers).
   Tap a sought object → found (ring + spoken word + progress). Tap a decoy →
   gentle miss. All sought objects found → success (auto mode).

   Page taskData:
     {
       "find": ["apple", "boot"],              // keys the child must find
       "targets": [                             // ALL tappable objects (finds + decoys)
         { "key": "apple", "image": "img.apple", "rect": {"x":80,"y":60,"w":150,"h":150},
           "word": "@p2.word.apple" },          // spoken + announced when found
         { "key": "hat",   "image": "img.hat",  "rect": {"x":600,"y":300,"w":140,"h":140} }
       ],
       "hideVisuals": false                     // true = invisible hotspots over
     }                                          //   art already IN the scene image
   rects are relative to the interaction zone, in design units (>=112 each).
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbfo-target{position:absolute;border:none;background:transparent;padding:0;cursor:pointer;',
      '  -webkit-tap-highlight-color:transparent;touch-action:manipulation;}',
      /* inflated hit area: taps stay >= 44 real px even when the stage scales small */
      '.sbfo-target::after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);',
      '  width:max(100%,44px);height:max(100%,44px);}',
      '.sbfo-target img{width:100%;height:100%;object-fit:contain;pointer-events:none;',
      '  filter:drop-shadow(0 3px 5px rgba(0,0,0,.25));}',
      '.sbfo-target.sbfo-found{pointer-events:none;}',
      '.sbfo-target.sbfo-found::after{content:"✓";position:absolute;right:-6px;top:-6px;',
      '  width:34px;height:34px;border-radius:50%;background:#146B5E;color:#fff;font-size:20px;',
      '  font-weight:900;display:flex;align-items:center;justify-content:center;',
      '  box-shadow:0 2px 6px rgba(0,0,0,.35);}',
      '.sbfo-target.sbfo-found{outline:4px solid #146B5E;outline-offset:2px;border-radius:12px;}',
      '@keyframes sbfo-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}',
      '.sbfo-target.sbfo-no{animation:sbfo-shake .3s ease 2;}',
      '@media (prefers-reduced-motion: reduce){.sbfo-target.sbfo-no{animation:none;}}',
      '.sbfo-target.sbfo-hint{outline:5px dashed #F2784B;outline-offset:3px;border-radius:12px;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbfo-css';
    st.textContent = css;
    global.document.head.appendChild(st);
  }

  function resolveStr(v, ctx) {
    if (typeof v === 'string' && v.charAt(0) === '@') return ctx.t(v.slice(1));
    return v || '';
  }

  global.SBModules.register({
    meta: {
      type: 'sb-find-object',
      version: 1,
      surfaces: ['dom'],
      completionModes: ['auto'],
      minZone: { w: 480, h: 360 }
    },

    validateTask: function (taskData, v) {
      var targets = taskData.targets;
      if (!Array.isArray(targets) || targets.length < 2) {
        return v.error('sb-find-object: targets must be an array of >= 2');
      }
      var keys = {};
      targets.forEach(function (t, i) {
        if (!t.key) v.error('sb-find-object: targets[' + i + '] missing key');
        if (keys[t.key]) v.error('sb-find-object: duplicate target key ' + t.key);
        keys[t.key] = 1;
        if (!taskData.hideVisuals && !t.image) {
          v.error('sb-find-object: targets[' + i + '] needs image (or set hideVisuals)');
        }
        if (t.image) v.assetExists(t.image);
        var r = t.rect;
        if (!r || !(r.w > 0) || !(r.h > 0)) {
          v.error('sb-find-object: targets[' + i + '] missing rect');
        } else {
          if (Math.min(r.w, r.h) < 112) {
            v.error('sb-find-object: targets[' + i + '] rect < 112 design units (44px tap floor)');
          }
          if (v.zone && (r.x < 0 || r.y < 0 || r.x + r.w > v.zone.w || r.y + r.h > v.zone.h)) {
            v.error('sb-find-object: targets[' + i + '] rect outside the interaction zone');
          }
        }
        if (typeof t.word === 'string' && t.word.charAt(0) === '@') v.stringExists(t.word.slice(1));
      });
      if (!Array.isArray(taskData.find) || !taskData.find.length) {
        return v.error('sb-find-object: find must be a non-empty array');
      }
      taskData.find.forEach(function (k) {
        if (!keys[k]) v.error('sb-find-object: find key "' + k + '" not among targets');
      });
    },

    create: function () {
      var ctx = null;
      var els = {};          /* key -> button el */
      var remaining = {};    /* key -> true */
      var total = 0;
      var enabled = false;
      var done = false;

      function onTap(key) {
        if (!enabled || done) return;
        var el = els[key];
        if (remaining[key]) {
          delete remaining[key];
          el.classList.add('sbfo-found');
          var t = findTarget(key);
          var word = t ? resolveStr(t.word, ctx) : '';
          if (word) {
            ctx.announce(word);
            ctx.audio.speak({ type: 'word', text: word });
          }
          var left = Object.keys(remaining).length;
          ctx.report.progress({ done: total - left, total: total });
          if (left === 0) { done = true; ctx.report.success(); }
        } else {
          if (!ctx.reducedMotion) {
            el.classList.remove('sbfo-no');
            void el.offsetWidth;               /* restart animation */
            el.classList.add('sbfo-no');
          }
          ctx.report.miss({ tapped: key });
        }
      }

      function findTarget(key) {
        var ts = ctx.taskData.targets;
        for (var i = 0; i < ts.length; i++) if (ts[i].key === key) return ts[i];
        return null;
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var zone = ctx.zone;
          (ctx.taskData.targets || []).forEach(function (t) {
            var b = ctx.el('button', 'sbfo-target');
            b.type = 'button';
            b.style.left = (t.rect.x / zone.w * 100) + '%';
            b.style.top = (t.rect.y / zone.h * 100) + '%';
            b.style.width = (t.rect.w / zone.w * 100) + '%';
            b.style.height = (t.rect.h / zone.h * 100) + '%';
            b.setAttribute('aria-label', resolveStr(t.word, ctx) || t.key);
            if (t.image && !ctx.taskData.hideVisuals) {
              b.appendChild(ctx.assets.img(t.image));
            }
            b.addEventListener('click', function () { onTap(t.key); });
            ctx.surface.el.appendChild(b);
            els[t.key] = b;
          });
          (ctx.taskData.find || []).forEach(function (k) { remaining[k] = true; });
          total = Object.keys(remaining).length;
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          var first = Object.keys(remaining)[0];
          if (!first || !els[first]) return;
          var el = els[first];
          el.classList.add('sbfo-hint');
          setTimeout(function () { el.classList.remove('sbfo-hint'); }, 1600);
        },
        autoSolve: function () {
          var keys = Object.keys(remaining);
          enabled = true;
          keys.forEach(function (k) { onTap(k); });
        },
        destroy: function () {
          done = true; enabled = false;
          els = {}; remaining = {};
          /* zone innerHTML cleared by the host */
        }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
