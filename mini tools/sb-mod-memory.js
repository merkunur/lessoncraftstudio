/* ============================================================================
   sb-mod-memory.js — NATIVE module: working memory (pair recall).
   Classic memory: cards face-down, tap two to reveal; a match stays open,
   a mismatch turns back after a beat. All pairs found → success. Design
   call: a mismatch is EXPLORATION, not an error — no miss report, no hint
   pounding (the platform's no-shame bar). Reduced motion: fades, no flips.

   Page taskData:
     { "pairs": ["img.apple", "img.banana", "img.cat"],   // 2-4 assetIds
       "cols": 3,
       "seed": 5 }
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbmy{width:100%;height:100%;display:grid;gap:3%;align-content:center;justify-content:center;}',
      '.sbmy-card{position:relative;aspect-ratio:1;border-radius:14px;border:4px solid #146B5E;cursor:pointer;',
      '  background:#146B5E;display:flex;align-items:center;justify-content:center;padding:6%;',
      '  -webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:background .25s ease;}',
      '.sbmy-back{color:#FBF3E4;font-size:2em;pointer-events:none;user-select:none;}',
      '.sbmy-card img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;',
      '  opacity:0;transition:opacity .25s ease;}',
      '.sbmy-card.sbmy-open{background:#fff;}',
      '.sbmy-card.sbmy-open .sbmy-back{display:none;}',
      '.sbmy-card.sbmy-open img{opacity:1;}',
      '.sbmy-card.sbmy-matched{border-color:#F2784B;background:rgba(255,255,255,.9);cursor:default;}',
      '@media (prefers-reduced-motion: reduce){.sbmy-card,.sbmy-card img{transition:none;}}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbmy-css'; st.textContent = css;
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

  global.SBModules.register({
    meta: {
      type: 'sb-memory', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 520, h: 420 },
      studio: {
        label: 'Memory pairs', group: 'Look & find', icon: '🎴',
        blurb: 'Face-down cards — the child flips two at a time to find the pairs.',
        defaults: { pairs: [], cols: 3, seed: 1 },
        fields: [
          { key: 'pairs', kind: 'list', label: 'The pictures (each becomes a pair)', min: 2, max: 4, itemFields: [
            { key: '__self', kind: 'image', label: 'Picture' }
          ], selfList: true },
          { key: 'seed', kind: 'seed', label: 'Shuffle' }
        ]
      }
    },

    validateTask: function (taskData, v) {
      var pairs = taskData.pairs;
      if (!Array.isArray(pairs) || pairs.length < 2 || pairs.length > 4) {
        return v.error('sb-memory: pairs must be 2-4 assetIds (4-8 cards)');
      }
      pairs.forEach(function (a) { v.assetExists(a); });
      var n = pairs.length * 2;
      var cols = taskData.cols || (n <= 4 ? 2 : (n <= 6 ? 3 : 4));
      if (n % cols !== 0) v.error('sb-memory: ' + n + ' cards do not fill ' + cols + ' columns evenly');
    },

    create: function () {
      var ctx = null, enabled = false, done = false, busy = false;
      var cards = [];        /* [{el, assetId, open, matched}] */
      var openIdx = -1;
      var matched = 0;

      function setOpen(i, open) {
        cards[i].open = open;
        cards[i].el.classList.toggle('sbmy-open', open || cards[i].matched);
      }

      function onTap(i) {
        if (!enabled || done || busy) return;
        var c = cards[i];
        if (c.matched || c.open) return;
        setOpen(i, true);
        if (openIdx < 0) { openIdx = i; return; }
        var a = cards[openIdx], first = openIdx;
        openIdx = -1;
        if (a.assetId === c.assetId) {
          a.matched = c.matched = true;
          a.el.classList.add('sbmy-matched');
          c.el.classList.add('sbmy-matched');
          matched++;
          ctx.audio.pop(760);
          ctx.report.progress({ done: matched, total: cards.length / 2 });
          if (matched === cards.length / 2) { done = true; ctx.report.success(); }
        } else {
          /* exploration, not an error — no miss report, gentle turn-back */
          busy = true;
          setTimeout(function () {
            setOpen(first, false);
            setOpen(i, false);
            busy = false;
          }, ctx.reducedMotion ? 650 : 900);
        }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var pairs = ctx.taskData.pairs;
          var deck = pairs.concat(pairs);
          var rand = mulberry(ctx.taskData.seed || 1);
          for (var i = deck.length - 1; i > 0; i--) {
            var j = Math.floor(rand() * (i + 1));
            var t = deck[i]; deck[i] = deck[j]; deck[j] = t;
          }
          var cols = ctx.taskData.cols || (deck.length <= 4 ? 2 : (deck.length <= 6 ? 3 : 4));
          var wrap = ctx.el('div', 'sbmy');
          wrap.style.gridTemplateColumns = 'repeat(' + cols + ', minmax(0, ' + Math.floor(84 / cols) + '%))';
          deck.forEach(function (assetId, idx) {
            var el = ctx.el('button', 'sbmy-card');
            el.type = 'button';
            el.setAttribute('aria-label', 'card ' + (idx + 1));
            var back = ctx.el('span', 'sbmy-back');
            back.textContent = '★';
            el.appendChild(back);
            el.appendChild(ctx.assets.img(assetId));
            el.addEventListener('click', function () { onTap(idx); });
            wrap.appendChild(el);
            cards.push({ el: el, assetId: assetId, open: false, matched: false });
          });
          ctx.surface.el.appendChild(wrap);
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        autoSolve: function () {
          enabled = true; busy = false;
          /* pair up by assetId directly (dev-only) */
          var byAsset = {};
          cards.forEach(function (c2, i) { (byAsset[c2.assetId] = byAsset[c2.assetId] || []).push(i); });
          matched = 0;
          for (var k in byAsset) {
            byAsset[k].forEach(function (i) {
              cards[i].matched = true;
              cards[i].el.classList.add('sbmy-open', 'sbmy-matched');
            });
            matched++;
          }
          done = true;
          ctx.report.success();
        },
        destroy: function () { done = true; enabled = false; cards = []; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
