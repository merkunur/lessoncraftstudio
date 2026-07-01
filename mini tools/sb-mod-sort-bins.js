/* ============================================================================
   sb-mod-sort-bins.js — WRAPPED LEGACY CORE reference module #2.

   SortBinsCore (0 edits) as a storybook interaction module. Proves the
   adapter against a DRAG core with page-level artifacts (position:fixed drag
   ghost appended to document.body — recorded + removed by the adapter's
   listener-recording shim).

   Supports both completion modes:
     'auto'  — the module detects a fully-correct placement and succeeds the
               moment the last tile lands right (exploration-friendly).
     'check' — deferred check: isCorrect() + the core's review() marks on fail.

   Page taskData ('sides' mode — pure geometry, culture-neutral):
     {
       "bins":  ["triangle", "quadrilateral"],   // family keys (core _FAMILY)
       "items": ["tri_equi", "quad_square", "tri_right", "quad_rect"], // shape ids
       "seed":  7
     }
   ========================================================================= */
(function (global) {
  'use strict';

  var FAMILY_KEYS = ['triangle', 'quadrilateral', 'pentagon', 'hexagon'];

  global.SBLegacyAdapter.wrap({
    type: 'sb-sort-bins',
    core: function () { return global.SortBinsCore; },
    completionModes: ['auto', 'check'],
    minZone: { w: 680, h: 500 },

    buildTask: function (taskData) {
      return {
        setup: function (tool) {
          tool.setupTask({
            bins: taskData.bins,
            items: taskData.items,
            seed: taskData.seed || 1
          });
        },
        check: function (tool) {
          var ok = tool.isCorrect();
          if (!ok) tool.review();
          else { tool.readOnly = true; tool.paint(); }
          return ok;
        },
        hasAnswer: function (tool) {
          return tool._placedCount() === tool.items.length && tool.items.length > 0;
        }
      };
    },

    detect: function (tool) {
      /* auto mode: success when every tile is placed AND correct */
      if (tool._placedCount() !== tool.items.length || !tool.items.length) return false;
      if (tool.isCorrect()) { tool.readOnly = true; tool.paint(); return true; }
      return false;
    },

    autoSolve: function (tool) {
      try {
        tool.items.forEach(function (it) {
          var idx = -1;
          for (var b = 0; b < tool.bins.length; b++) {
            var fam = tool._FAMILY[tool.bins[b]];
            if (fam && fam.sides === it.sides) { idx = b; break; }
          }
          if (idx >= 0) tool._moveTo(it.uid, idx);
        });
      } catch (e) {}
    },

    validateTask: function (taskData, v) {
      if (!Array.isArray(taskData.bins) || taskData.bins.length < 2) {
        return v.error('sb-sort-bins: bins must be an array of >= 2 family keys');
      }
      taskData.bins.forEach(function (b) {
        if (FAMILY_KEYS.indexOf(b) < 0) v.error('sb-sort-bins: unknown bin family ' + b);
      });
      if (!Array.isArray(taskData.items) || taskData.items.length < 2) {
        return v.error('sb-sort-bins: items must be an array of >= 2 shape ids');
      }
      if (taskData.items.length > 8) {
        v.error('sb-sort-bins: > 8 items is too dense for a story zone');
      }
    }
  });
}(typeof window !== 'undefined' ? window : this));
