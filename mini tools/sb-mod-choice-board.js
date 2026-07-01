/* ============================================================================
   sb-mod-choice-board.js — WRAPPED LEGACY CORE reference module #1.

   ChoiceBoardCore (a PROTECTED core — 0 edits) as a storybook interaction
   module via SBLegacyAdapter. Select-then-check grammar (the core's own
   interaction design), so completionMode is 'check'.

   Page taskData:
     {
       "targetKey": "apple",
       "options": [                       // 2-10 options
         { "key": "apple",  "image": "img.apple" },        // assetId, OR
         { "key": "three",  "text": "@p1.opt.three" },     // '@' string ref, OR
         { "key": "b",      "label": "B" }                 // literal label (letters/numbers)
       ],
       "subject": { "type": "image", "image": "img.hat", "alt": "@p1.subject.alt" } | null,
       "settings": {}                      // optional core settings overrides
     }
   Check semantics: tool.answer === targetKey (the core's documented contract).
   ========================================================================= */
(function (global) {
  'use strict';

  function resolveStr(v, ctx) {
    if (typeof v === 'string' && v.charAt(0) === '@') return ctx.t(v.slice(1));
    return v;
  }

  global.SBLegacyAdapter.wrap({
    type: 'sb-choice-board',
    core: function () { return global.ChoiceBoardCore; },
    completionModes: ['check'],
    minZone: { w: 560, h: 420 },

    buildTask: function (taskData, ctx) {
      return {
        setup: function (tool) {
          var options = (taskData.options || []).map(function (o) {
            return {
              key: o.key,
              imgUrl: o.image ? ctx.assets.url(o.image) : undefined,
              text: o.text != null ? resolveStr(o.text, ctx) : undefined,
              label: o.label != null ? resolveStr(o.label, ctx) : undefined,
              group: o.group ? { imgUrl: ctx.assets.url(o.group.image), count: o.group.count } : undefined
            };
          });
          var subject = null;
          if (taskData.subject) {
            subject = {
              type: taskData.subject.type,
              imgUrl: taskData.subject.image ? ctx.assets.url(taskData.subject.image) : undefined,
              text: taskData.subject.text != null ? resolveStr(taskData.subject.text, ctx) : undefined,
              alt: taskData.subject.alt != null ? resolveStr(taskData.subject.alt, ctx) : '',
              count: taskData.subject.count
            };
          }
          tool.setupTask(options, taskData.targetKey, subject);
        },
        check: function (tool) { return tool.answer === taskData.targetKey; },
        hasAnswer: function (tool) { return tool.answer !== null && tool.answer !== undefined; }
      };
    },

    showHint: function (tool) {
      /* gentle visual nudge: pulse the correct tile's outline briefly */
      try {
        for (var i = 0; i < tool.tiles.length; i++) {
          var t = tool.tiles[i];
          if (t.dataset && t.dataset.key === String(tool.targetKey)) {
            t.style.transition = 'box-shadow .3s ease';
            t.style.boxShadow = '0 0 0 5px #F2784B';
            (function (el) {
              setTimeout(function () { el.style.boxShadow = ''; }, 1400);
            }(t));
          }
        }
      } catch (e) {}
    },

    autoSolve: function (tool) {
      try { tool.selectKey(tool.targetKey); } catch (e) {}
    },

    validateTask: function (taskData, v) {
      var opts = taskData.options;
      if (!Array.isArray(opts) || opts.length < 2) {
        return v.error('sb-choice-board: options must be an array of >= 2');
      }
      var keys = {};
      opts.forEach(function (o, i) {
        if (!o.key) v.error('sb-choice-board: options[' + i + '] missing key');
        if (keys[o.key]) v.error('sb-choice-board: duplicate option key ' + o.key);
        keys[o.key] = 1;
        if (o.image) v.assetExists(o.image);
        if (o.group) {
          if (!o.group.image || !(o.group.count > 0) || o.group.count > 8) {
            v.error('sb-choice-board: options[' + i + '].group needs image + count 1-8');
          } else v.assetExists(o.group.image);
        }
        if (typeof o.text === 'string' && o.text.charAt(0) === '@') v.stringExists(o.text.slice(1));
        if (o.image == null && o.text == null && o.label == null && o.group == null) {
          v.error('sb-choice-board: options[' + i + '] needs image, text, label, or group');
        }
      });
      if (!taskData.targetKey || !keys[taskData.targetKey]) {
        v.error('sb-choice-board: targetKey must be one of the option keys');
      }
      if (taskData.subject && taskData.subject.image) v.assetExists(taskData.subject.image);
    }
  });
}(typeof window !== 'undefined' ? window : this));
