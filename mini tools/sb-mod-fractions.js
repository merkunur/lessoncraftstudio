/* ============================================================================
   sb-mod-fractions.js — WRAPPED LEGACY CORE: FractionsCore as a storybook
   interaction module (0 core edits). Thinking type: part-whole / partition.

   The child taps candidate cut-lines to split a shape into N equal parts;
   deferred Check compares the committed cut-set against the core's
   correctIds (exact set equality — the core's own isCorrect()).

   Page taskData:
     { "shape": "circle",          // rect|square|circle|triangle|diamond|
                                   // pentagon|hexagon|ellipse|gridrect
       "n": 2,                     // 2 | 3 | 4  equal parts
       "cut": "v",                 // v | h  (primary cut direction where relevant)
       "seed": 11,
       "settings": {} }
   (The keypad 'grid-count' template is activity-only — not embeddable.)
   ========================================================================= */
(function (global) {
  'use strict';

  var SHAPES = ['rect', 'square', 'circle', 'triangle', 'diamond', 'pentagon', 'hexagon', 'ellipse', 'gridrect'];

  global.SBLegacyAdapter.wrap({
    type: 'sb-fractions',
    core: function () { return global.FractionsCore; },
    completionModes: ['check'],
    minZone: { w: 480, h: 420 },

    studio: {
      label: 'Cut into equal parts', group: 'Numbers & shapes', icon: '◐',
      blurb: 'The child taps cut lines to split a shape into equal parts.',
      defaults: { shape: 'circle', n: 2, cut: 'v', seed: 1 },
      fields: [
        { key: 'shape', kind: 'enum', label: 'Shape', from: ['circle', 'square', 'rect', 'triangle', 'diamond', 'pentagon', 'hexagon', 'ellipse'] },
        { key: 'n', kind: 'enum', label: 'How many parts', from: [2, 3, 4] },
        { key: 'cut', kind: 'enum', label: 'Cut direction', from: ['v', 'h'] },
        { key: 'seed', kind: 'seed', label: 'Shuffle' }
      ]
    },

    buildTask: function (taskData) {
      return {
        setup: function (tool) {
          tool.setupTask({
            shape: taskData.shape, n: taskData.n, cut: taskData.cut,
            seed: taskData.seed || 1
          });
        },
        check: function (tool) {
          var ok = tool.isCorrect();
          if (ok) { tool.readOnly = true; tool.paint(); }
          return ok;
        },
        hasAnswer: function (tool) {
          for (var k in tool.committed) { if (tool.committed[k]) return true; }
          return false;
        }
      };
    },

    autoSolve: function (tool) {
      try {
        tool.committed = {};
        (tool.correctIds || []).forEach(function (id) { tool.committed[id] = true; });
        tool.paint();
      } catch (e) {}
    },

    validateTask: function (taskData, v) {
      if (SHAPES.indexOf(taskData.shape) < 0) v.error('sb-fractions: shape must be one of ' + SHAPES.join('/'));
      if ([2, 3, 4].indexOf(taskData.n) < 0) v.error('sb-fractions: n must be 2, 3 or 4');
      if (taskData.cut != null && ['v', 'h', 'grid'].indexOf(taskData.cut) < 0) v.error('sb-fractions: cut must be v, h or grid');
    }
  });
}(typeof window !== 'undefined' ? window : this));
