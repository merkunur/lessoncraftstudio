/* ============================================================================
   sb-mod-number-bond.js — WRAPPED LEGACY CORE: NumberBondCore as a storybook
   interaction module (0 core edits). Thinking type: part-part-whole.

   The child taps the empty part of a number bond to add counter dots (and
   taps a minus to remove) until the parts make the whole. Deferred Check via
   the core's isCorrect(). Only the STATE modes are embeddable — the keypad
   modes (whole-unknown / word-problem / whole-unknown-3) are activity-only
   and rejected by validateTask.

   Page taskData (one of):
     { "whole": 10, "given": 7, "seed": 11 }                       // make-ten
     { "mode": "make-ten-to-add", "first": 8, "second": 5 }        // bridge ten
   ========================================================================= */
(function (global) {
  'use strict';

  global.SBLegacyAdapter.wrap({
    type: 'sb-number-bond',
    core: function () { return global.NumberBondCore; },
    completionModes: ['check'],
    minZone: { w: 480, h: 420 },

    studio: {
      label: 'Number bond', group: 'Numbers & shapes', icon: '🔗',
      blurb: 'The child fills the empty part of a number bond until the parts make the whole.',
      defaults: { whole: 10, given: 7, seed: 1 },
      fields: [
        { key: 'whole', kind: 'number', label: 'The whole number', min: 2, max: 20 },
        { key: 'given', kind: 'number', label: 'Part already shown', min: 0, max: 19 },
        { key: 'seed', kind: 'seed', label: 'Shuffle' }
      ]
    },

    buildTask: function (taskData) {
      return {
        setup: function (tool) { tool.setupTask(taskData); },
        check: function (tool) {
          var ok = tool.isCorrect();
          if (ok) { tool.readOnly = true; tool.paint(); }
          return ok;
        },
        hasAnswer: function (tool) { return (tool.filled || 0) > 0; }
      };
    },

    autoSolve: function (tool) {
      try {
        tool.filled = (tool.mode === 'make-ten-to-add')
          ? (10 - tool.first)
          : (tool.whole - tool.given);
        tool.paint();
      } catch (e) {}
    },

    validateTask: function (taskData, v) {
      var mode = taskData.mode || 'make-ten';
      if (['whole-unknown', 'word-problem', 'whole-unknown-3'].indexOf(mode) >= 0) {
        return v.error('sb-number-bond: keypad mode "' + mode + '" is not embeddable (state modes only)');
      }
      if (mode === 'make-ten-to-add') {
        if (!(taskData.first >= 1 && taskData.first <= 9)) v.error('sb-number-bond: first must be 1..9');
        if (!(taskData.second >= 1 && taskData.second <= 9)) v.error('sb-number-bond: second must be 1..9');
      } else {
        if (!(taskData.whole >= 2 && taskData.whole <= 20)) v.error('sb-number-bond: whole must be 2..20');
        if (!(taskData.given >= 0 && taskData.given < taskData.whole)) v.error('sb-number-bond: given must be 0..whole-1');
      }
    }
  });
}(typeof window !== 'undefined' ? window : this));
