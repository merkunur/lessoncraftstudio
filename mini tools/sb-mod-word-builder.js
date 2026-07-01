/* ============================================================================
   sb-mod-word-builder.js — WRAPPED LEGACY CORE: WordBuilderCore as a
   storybook interaction module (0 core edits). Thinking type: syllable /
   sound-chunk construction (the E8/E9 engine — tap chunks to build the word).

   The child taps syllable tiles into slots; deferred Check compares
   tool.tileAnswers against targetTiles in order (the core speaks each tile
   on tap and blends the word on a correct Check via window.LCSAudio —
   present in the storybook env, same as the live syllable activities).

   Page taskData:
     { "targetWord": "gato",
       "targetTiles": ["ga","to"],
       "palette": ["ga","to","ma","sa"],       // targetTiles + distractors
       "subject": { "image": "img.cat", "alt": "@p.word", "hearItWord": "gato" } | null,
       "language": "es-ES",                    // BCP-47 for tile/blend speech
       "mutePerTile": false? }
   ========================================================================= */
(function (global) {
  'use strict';

  function resolveStr(v, ctx) {
    if (typeof v === 'string' && v.charAt(0) === '@') return ctx.t(v.slice(1));
    return v || '';
  }
  function ttsLang(locale) {
    try {
      if (global.LCSAudio && global.LCSAudio._ttsLang) return global.LCSAudio._ttsLang(locale);
    } catch (e) {}
    return locale;
  }
  function tilesEqual(a, b) {
    if (!a || a.length !== b.length) return false;
    for (var i = 0; i < b.length; i++) { if (a[i] !== b[i]) return false; }
    return true;
  }

  global.SBLegacyAdapter.wrap({
    type: 'sb-word-builder',
    core: function () { return global.WordBuilderCore; },
    completionModes: ['check'],
    minZone: { w: 600, h: 460 },

    buildTask: function (taskData, ctx) {
      return {
        setup: function (tool) {
          var subject = null;
          if (taskData.subject) {
            subject = {
              type: 'image',
              imgUrl: ctx.assets.url(taskData.subject.image),
              alt: resolveStr(taskData.subject.alt, ctx),
              hearItWord: taskData.subject.hearItWord || taskData.targetWord,
              hearItLang: taskData.language || ttsLang(ctx.locale)
            };
          }
          tool.setupTask({
            slots: taskData.targetTiles.length,
            palette: taskData.palette.slice(),
            targetWord: taskData.targetWord,
            targetTiles: taskData.targetTiles.slice(),
            subject: subject,
            language: taskData.language || ttsLang(ctx.locale),
            mutePerTile: !!taskData.mutePerTile
          });
        },
        check: function (tool) {
          var ok = tilesEqual(tool.tileAnswers, taskData.targetTiles);
          if (typeof tool.showFeedback === 'function') { try { tool.showFeedback(ok); } catch (e) {} }
          return ok;
        },
        hasAnswer: function (tool) { return tool.answer !== null && tool.answer !== undefined; }
      };
    },

    autoSolve: function (tool, ctx) {
      try {
        ctx.taskData.targetTiles.forEach(function (t) { tool.selectTile(t); });
      } catch (e) {}
    },

    validateTask: function (taskData, v) {
      var tiles = taskData.targetTiles;
      if (!Array.isArray(tiles) || tiles.length < 2 || tiles.length > 5) {
        return v.error('sb-word-builder: targetTiles must be 2-5 chunks');
      }
      if (!taskData.targetWord || taskData.targetWord !== tiles.join('')) {
        v.error('sb-word-builder: targetWord must equal targetTiles joined');
      }
      var pal = taskData.palette;
      if (!Array.isArray(pal) || pal.length < tiles.length || pal.length > 8) {
        return v.error('sb-word-builder: palette must be an array (targetTiles + distractors, <= 8)');
      }
      var pool = pal.slice();
      for (var i = 0; i < tiles.length; i++) {
        var idx = pool.indexOf(tiles[i]);
        if (idx < 0) return v.error('sb-word-builder: palette missing tile "' + tiles[i] + '"');
        pool.splice(idx, 1);
      }
      if (pal.length === tiles.length) v.error('sb-word-builder: add distractor tiles');
      if (taskData.subject) {
        if (!taskData.subject.image) v.error('sb-word-builder: subject needs image (assetId)');
        else v.assetExists(taskData.subject.image);
        if (typeof taskData.subject.alt === 'string' && taskData.subject.alt.charAt(0) === '@') {
          v.stringExists(taskData.subject.alt.slice(1));
        }
      }
    }
  });
}(typeof window !== 'undefined' ? window : this));
