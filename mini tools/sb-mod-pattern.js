/* ============================================================================
   sb-mod-pattern.js — NATIVE module: pattern completion (algebraic precursor).
   An AB / ABC / AABB picture strip with ONE missing cell; the child taps the
   choice chip that continues the pattern. Zero new art (library images).

   Page taskData:
     { "tiles":   { "a": "img.apple", "b": "img.banana" },   // key → assetId
       "sequence": ["a","b","a","b","a",null],               // exactly one null
       "choices":  ["a","b"],                                // chip keys
       "answerKey": "b",
       "seed": 3 }
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbpt{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7%;}',
      '.sbpt-strip{display:flex;gap:2.5%;width:100%;justify-content:center;}',
      '.sbpt-cell{flex:1 1 0;max-width:15%;aspect-ratio:1;border-radius:14px;border:4px solid rgba(20,107,94,.4);',
      '  background:rgba(255,255,255,.75);display:flex;align-items:center;justify-content:center;padding:2%;}',
      '.sbpt-cell img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;}',
      '.sbpt-cell.sbpt-gap{border-style:dashed;border-color:#F2784B;background:rgba(242,120,75,.12);}',
      '.sbpt-gap-q{font-size:2em;font-weight:900;color:#F2784B;}',
      '.sbpt-cell.sbpt-filled{border-style:solid;border-color:#146B5E;background:rgba(20,107,94,.12);}',
      '.sbpt-choices{display:flex;gap:4%;justify-content:center;width:100%;}',
      '.sbpt-chip{flex:0 1 22%;max-width:22%;aspect-ratio:1;border-radius:16px;border:4px solid #146B5E;',
      '  background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:3%;',
      '  -webkit-tap-highlight-color:transparent;touch-action:manipulation;box-shadow:0 3px 8px rgba(0,0,0,.18);}',
      '.sbpt-chip img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;}',
      '.sbpt-chip:active{transform:scale(.95);}',
      '@media (prefers-reduced-motion: reduce){.sbpt-chip:active{transform:none;}}',
      '@keyframes sbpt-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}',
      '.sbpt-chip.sbpt-no{animation:sbpt-shake .3s ease 2;}',
      '@media (prefers-reduced-motion: reduce){.sbpt-chip.sbpt-no{animation:none;}}',
      '.sbpt-chip.sbpt-hint{outline:5px dashed #F2784B;outline-offset:3px;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbpt-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  global.SBModules.register({
    meta: {
      type: 'sb-pattern', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 560, h: 360 }
    },

    validateTask: function (taskData, v) {
      var seq = taskData.sequence;
      if (!Array.isArray(seq) || seq.length < 4 || seq.length > 8) {
        return v.error('sb-pattern: sequence must be 4-8 cells');
      }
      var gaps = seq.filter(function (x) { return x === null; }).length;
      if (gaps !== 1) return v.error('sb-pattern: exactly ONE null gap required (got ' + gaps + ')');
      var tiles = taskData.tiles || {};
      seq.forEach(function (k, i) {
        if (k !== null && !tiles[k]) v.error('sb-pattern: sequence[' + i + '] key "' + k + '" not in tiles');
      });
      var choices = taskData.choices;
      if (!Array.isArray(choices) || choices.length < 2 || choices.length > 4) {
        return v.error('sb-pattern: choices must be 2-4 keys');
      }
      choices.forEach(function (k) {
        if (!tiles[k]) v.error('sb-pattern: choice "' + k + '" not in tiles');
      });
      if (choices.indexOf(taskData.answerKey) < 0) v.error('sb-pattern: answerKey must be one of choices');
      for (var k2 in tiles) v.assetExists(tiles[k2]);
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var gapEl = null, chipEls = {};

      function onChip(key) {
        if (!enabled || done) return;
        if (key === ctx.taskData.answerKey) {
          done = true;
          gapEl.innerHTML = '';
          gapEl.appendChild(ctx.assets.img(ctx.taskData.tiles[key]));
          gapEl.classList.remove('sbpt-gap');
          gapEl.classList.add('sbpt-filled');
          ctx.report.success();
        } else {
          var el = chipEls[key];
          if (el && !ctx.reducedMotion) {
            el.classList.remove('sbpt-no'); void el.offsetWidth; el.classList.add('sbpt-no');
          }
          ctx.report.miss({ tapped: key });
        }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var wrap = ctx.el('div', 'sbpt');
          var strip = ctx.el('div', 'sbpt-strip');
          ctx.taskData.sequence.forEach(function (k) {
            var cell = ctx.el('div', 'sbpt-cell' + (k === null ? ' sbpt-gap' : ''));
            if (k === null) {
              var q = ctx.el('span', 'sbpt-gap-q');
              q.textContent = '?';
              cell.appendChild(q);
              gapEl = cell;
            } else {
              cell.appendChild(ctx.assets.img(ctx.taskData.tiles[k]));
            }
            strip.appendChild(cell);
          });
          wrap.appendChild(strip);

          var row = ctx.el('div', 'sbpt-choices');
          ctx.taskData.choices.forEach(function (k) {
            var chip = ctx.el('button', 'sbpt-chip');
            chip.type = 'button';
            chip.setAttribute('aria-label', k);
            chip.appendChild(ctx.assets.img(ctx.taskData.tiles[k]));
            chip.addEventListener('click', function () { onChip(k); });
            row.appendChild(chip);
            chipEls[k] = chip;
          });
          wrap.appendChild(row);
          ctx.surface.el.appendChild(wrap);
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          var el = chipEls[ctx.taskData.answerKey];
          if (!el) return;
          el.classList.add('sbpt-hint');
          setTimeout(function () { el.classList.remove('sbpt-hint'); }, 1600);
        },
        autoSolve: function () { enabled = true; onChip(ctx.taskData.answerKey); },
        destroy: function () { done = true; enabled = false; chipEls = {}; gapEl = null; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
