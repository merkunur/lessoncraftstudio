/* ============================================================================
   sb-mod-spot-diff.js — NATIVE module: visual discrimination
   (spot-the-difference). The module composes BOTH panels itself from data —
   a grid of library images; the right panel differs in 1-4 cells (a swapped
   image or a missing one). The child taps the differing cells ON THE RIGHT
   panel. Deterministic, zero new art.

   Page taskData:
     { "tiles": { "a":"img.apple", "b":"img.banana", "h":"img.hat", "c":"img.cat" },
       "grid":  { "rows": 2, "cols": 3 },
       "cells": ["a","b","h","c","a","b"],          // rows*cols base keys
       "diffs": [ { "index": 1, "rightKey": "h" },  // swapped
                  { "index": 4, "rightKey": null } ] // missing on the right
     }
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbsd{width:100%;height:100%;display:flex;gap:4%;align-items:center;justify-content:center;}',
      '.sbsd-panel{flex:1 1 0;max-width:48%;background:rgba(255,255,255,.72);border-radius:16px;',
      '  border:4px solid rgba(20,107,94,.45);padding:2.5%;display:grid;gap:5%;}',
      '.sbsd-panel--right{border-color:#146B5E;}',
      '.sbsd-cell{position:relative;aspect-ratio:1;border-radius:10px;display:flex;align-items:center;',
      '  justify-content:center;padding:4%;background:transparent;border:none;}',
      'button.sbsd-cell{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}',
      '.sbsd-cell img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;}',
      '.sbsd-cell.sbsd-found{outline:4px solid #146B5E;outline-offset:-2px;border-radius:12px;}',
      '.sbsd-cell.sbsd-found::after{content:"✓";position:absolute;right:-4px;top:-4px;width:30px;height:30px;',
      '  border-radius:50%;background:#146B5E;color:#fff;font-weight:900;font-size:17px;',
      '  display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,.3);}',
      '@keyframes sbsd-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}',
      '.sbsd-cell.sbsd-no{animation:sbsd-shake .3s ease 2;}',
      '@media (prefers-reduced-motion: reduce){.sbsd-cell.sbsd-no{animation:none;}}',
      '.sbsd-cell.sbsd-hint{outline:5px dashed #F2784B;outline-offset:2px;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbsd-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  global.SBModules.register({
    meta: {
      type: 'sb-spot-diff', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 640, h: 400 }
    },

    validateTask: function (taskData, v) {
      var g = taskData.grid;
      if (!g || !(g.rows >= 1) || !(g.cols >= 2) || g.rows * g.cols > 12) {
        return v.error('sb-spot-diff: grid must be rows>=1, cols>=2, <=12 cells');
      }
      var cells = taskData.cells;
      if (!Array.isArray(cells) || cells.length !== g.rows * g.cols) {
        return v.error('sb-spot-diff: cells must have exactly rows*cols keys');
      }
      var tiles = taskData.tiles || {};
      cells.forEach(function (k, i) {
        if (!tiles[k]) v.error('sb-spot-diff: cells[' + i + '] key "' + k + '" not in tiles');
      });
      for (var k2 in tiles) v.assetExists(tiles[k2]);
      var diffs = taskData.diffs;
      if (!Array.isArray(diffs) || diffs.length < 1 || diffs.length > 4) {
        return v.error('sb-spot-diff: diffs must be 1-4');
      }
      var seen = {};
      diffs.forEach(function (d, i) {
        if (!(d.index >= 0 && d.index < cells.length)) v.error('sb-spot-diff: diffs[' + i + '] index out of range');
        if (seen[d.index]) v.error('sb-spot-diff: duplicate diff index ' + d.index);
        seen[d.index] = 1;
        if (d.rightKey !== null) {
          if (!tiles[d.rightKey]) v.error('sb-spot-diff: diffs[' + i + '] rightKey not in tiles');
          if (d.rightKey === cells[d.index]) v.error('sb-spot-diff: diffs[' + i + '] rightKey equals the base key (no difference)');
        }
      });
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var rightEls = [], remaining = {}, total = 0;

      function onTap(index) {
        if (!enabled || done) return;
        var el = rightEls[index];
        if (el.classList.contains('sbsd-found')) return;
        if (remaining[index]) {
          delete remaining[index];
          el.classList.add('sbsd-found');
          ctx.audio.pop(760);
          var left = Object.keys(remaining).length;
          ctx.report.progress({ done: total - left, total: total });
          if (!left) { done = true; ctx.report.success(); }
        } else {
          if (!ctx.reducedMotion) {
            el.classList.remove('sbsd-no'); void el.offsetWidth; el.classList.add('sbsd-no');
          }
          ctx.report.miss({ tapped: index });
        }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var t = ctx.taskData;
          var diffByIndex = {};
          t.diffs.forEach(function (d) { diffByIndex[d.index] = d; remaining[d.index] = true; });
          total = t.diffs.length;

          var wrap = ctx.el('div', 'sbsd');
          var cols = 'repeat(' + t.grid.cols + ', minmax(0, 1fr))';

          var leftPanel = ctx.el('div', 'sbsd-panel');
          leftPanel.style.gridTemplateColumns = cols;
          t.cells.forEach(function (k) {
            var cell = ctx.el('div', 'sbsd-cell');
            cell.appendChild(ctx.assets.img(t.tiles[k]));
            leftPanel.appendChild(cell);
          });
          wrap.appendChild(leftPanel);

          var rightPanel = ctx.el('div', 'sbsd-panel sbsd-panel--right');
          rightPanel.style.gridTemplateColumns = cols;
          t.cells.forEach(function (k, i) {
            var cell = ctx.el('button', 'sbsd-cell');
            cell.type = 'button';
            cell.setAttribute('aria-label', 'cell ' + (i + 1));
            var d = diffByIndex[i];
            var key = d ? d.rightKey : k;
            if (key !== null) cell.appendChild(ctx.assets.img(t.tiles[key]));
            cell.addEventListener('click', function () { onTap(i); });
            rightPanel.appendChild(cell);
            rightEls.push(cell);
          });
          wrap.appendChild(rightPanel);
          ctx.surface.el.appendChild(wrap);
        },
        start: function () { enabled = true; },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          var first = Object.keys(remaining)[0];
          if (first === undefined) return;
          var el = rightEls[first];
          el.classList.add('sbsd-hint');
          setTimeout(function () { el.classList.remove('sbsd-hint'); }, 1600);
        },
        autoSolve: function () {
          enabled = true;
          Object.keys(remaining).map(Number).forEach(function (i) { onTap(i); });
        },
        destroy: function () { done = true; enabled = false; rightEls = []; remaining = {}; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
