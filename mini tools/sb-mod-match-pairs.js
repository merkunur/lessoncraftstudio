/* ============================================================================
   sb-mod-match-pairs.js — WRAPPED LEGACY CORE: MatchPairsCore (a PROTECTED
   core — 0 edits, byte-identical) as a storybook interaction module.
   Thinking type: composition / equivalence.

   The child taps two cards to pair them; deferred Check grades every formed
   pair per the template (the wrapper-owned grading pattern of
   match-pairs-activity.js). The core's window-resize listener and guarded
   LCSAudio calls are exactly what the adapter's listener-recording shim was
   built for. Feedback stays visual (markWrongPairs) — the player owns sound.

   Page taskData:
     { "template": "make-n",        // pairs must SUM to target
       "target": 10,
       "cards": [3, 7, 1, 9, 4, 6] }
   or
     { "template": "equal-value",   // pairs must have EQUAL value
       "cards": [ {"display":"3+2","kind":"expr","value":5},
                  {"display":"5","kind":"num","value":5}, … ] }
   ========================================================================= */
(function (global) {
  'use strict';

  function cardValue(c) { return (typeof c === 'number') ? c : c.value; }

  global.SBLegacyAdapter.wrap({
    type: 'sb-match-pairs',
    core: function () { return global.MatchPairsCore; },
    completionModes: ['check'],
    minZone: { w: 560, h: 480 },

    studio: {
      label: 'Match the pairs', group: 'Numbers & shapes', icon: '🃏',
      blurb: 'The child taps two number cards that belong together (e.g. that make ten).',
      defaults: { template: 'make-n', target: 10, cards: [3, 7, 1, 9, 4, 6] },
      fields: [
        { key: 'template', kind: 'enum', label: 'Pair rule', from: ['make-n', 'equal-value'], labels: ['Cards that make the target', 'Cards with equal value'] },
        { key: 'target', kind: 'number', label: 'Target number', min: 2, max: 100, showIf: { template: 'make-n' } },
        { key: 'cards', kind: 'chips', label: 'The cards (numbers)', numeric: true, min: 4, max: 12 }
      ]
    },

    buildTask: function (taskData) {
      return {
        setup: function (tool) {
          tool.setupTask({ target: taskData.target, cards: taskData.cards.slice() });
        },
        check: function (tool) {
          if (!tool.allPaired()) return false;
          for (var i = 0; i < tool.pairsFormed.length; i++) {
            var p = tool.pairsFormed[i];
            var a = tool.cards[p[0]], b = tool.cards[p[1]];
            var ok = (taskData.template === 'make-n')
              ? (cardValue(a) + cardValue(b) === taskData.target)
              : (cardValue(a) === cardValue(b));
            if (!ok) {
              try { tool.markWrongPairs(); } catch (e) {}
              return false;
            }
          }
          tool.readOnly = true;
          tool.paint();
          return true;
        },
        hasAnswer: function (tool) { return tool.allPaired(); }
      };
    },

    autoSolve: function (tool) {
      try {
        var n = tool.cards.length;
        var used = {};
        tool.pairsFormed = [];
        for (var i = 0; i < n; i++) {
          if (used[i]) continue;
          for (var j = i + 1; j < n; j++) {
            if (used[j]) continue;
            var a = cardValue(tool.cards[i]), b = cardValue(tool.cards[j]);
            var ok = (typeof tool.cards[i] === 'number' && tool.target)
              ? (a + b === tool.target) : (a === b);
            if (ok) { tool.pairsFormed.push([i, j]); used[i] = used[j] = 1; break; }
          }
        }
        /* allPaired() reads cardsState, not pairsFormed — keep both in sync */
        tool.cardsState = tool.cards.map(function (c, k) { return used[k] ? 'paired' : 'unpaired'; });
        tool.paint();
      } catch (e) {}
    },

    validateTask: function (taskData, v) {
      var t = taskData.template;
      if (['make-n', 'equal-value'].indexOf(t) < 0) {
        return v.error('sb-match-pairs: template must be make-n or equal-value');
      }
      var cards = taskData.cards;
      if (!Array.isArray(cards) || cards.length < 4 || cards.length > 12 || cards.length % 2 !== 0) {
        return v.error('sb-match-pairs: cards must be an even array of 4..12');
      }
      /* every card must be pairable exactly (a perfect matching must exist) */
      var vals = cards.map(cardValue);
      if (t === 'make-n') {
        if (!(taskData.target >= 2)) return v.error('sb-match-pairs: make-n needs target >= 2');
        var pool = vals.slice();
        for (var g = 0; g < cards.length / 2; g++) {
          var found = false;
          for (var x = 0; x < pool.length && !found; x++) {
            for (var y = x + 1; y < pool.length; y++) {
              if (pool[x] + pool[y] === taskData.target) {
                pool.splice(y, 1); pool.splice(x, 1); found = true; break;
              }
            }
          }
          if (!found) return v.error('sb-match-pairs: cards cannot be fully paired to sum ' + taskData.target);
        }
      } else {
        var counts = {};
        vals.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        for (var k in counts) {
          if (counts[k] % 2 !== 0) return v.error('sb-match-pairs: value ' + k + ' appears an odd number of times');
        }
        cards.forEach(function (c, i2) {
          if (typeof c !== 'number' && (c.display == null || c.value == null)) {
            v.error('sb-match-pairs: cards[' + i2 + '] needs {display, value}');
          }
        });
      }
    }
  });
}(typeof window !== 'undefined' ? window : this));
