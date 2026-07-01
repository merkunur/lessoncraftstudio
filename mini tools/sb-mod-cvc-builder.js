/* ============================================================================
   sb-mod-cvc-builder.js — WRAPPED LEGACY CORE: CvcBuilderCore as a storybook
   interaction module (0 core edits). Thinking type: letter knowledge /
   word building (tap letters — the K-3 no-typing rule by construction).

   The child taps palette letter tiles to fill the word slots under a picture;
   deferred Check compares tool.answer to the target word (the core paints
   per-slot rings via showFeedback). Per-letter blips via api.sound; the
   optional Hear-it button speaks via window.LCSAudio (loaded in the
   storybook, same as the live activity pages).

   Page taskData:
     { "targetWord": "cat",
       "palette": ["c","a","t","d","r","o","s"],   // must contain the word's letters
       "subject": { "image": "img.cat", "alt": "@p.word.cat", "hearItWord": "cat" } | null,
       "prefill": [null,"a",null]?, "lockPrefilled": true? }
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

  global.SBLegacyAdapter.wrap({
    type: 'sb-cvc-builder',
    core: function () { return global.CvcBuilderCore; },
    completionModes: ['check'],
    minZone: { w: 560, h: 460 },

    buildTask: function (taskData, ctx) {
      return {
        setup: function (tool) {
          var subject = null;
          if (taskData.subject) {
            subject = {
              type: 'image',
              imgUrl: ctx.assets.url(taskData.subject.image),
              alt: resolveStr(taskData.subject.alt, ctx),
              hearItWord: taskData.subject.hearItWord || null,
              hearItLang: taskData.subject.hearItLang || ttsLang(ctx.locale)
            };
          }
          tool.setupTask({
            slots: taskData.targetWord.length,
            palette: taskData.palette.slice(),
            targetWord: taskData.targetWord,
            subject: subject,
            prefill: taskData.prefill || null,
            lockPrefilled: taskData.lockPrefilled !== false
          });
        },
        check: function (tool) {
          var ok = tool.answer === taskData.targetWord;
          if (typeof tool.showFeedback === 'function') { try { tool.showFeedback(ok); } catch (e) {} }
          return ok;
        },
        hasAnswer: function (tool) { return tool.answer !== null && tool.answer !== undefined; }
      };
    },

    autoSolve: function (tool, ctx) {
      try {
        var word = ctx.taskData.targetWord;
        for (var i = 0; i < word.length; i++) tool.selectLetter(word.charAt(i));
      } catch (e) {}
    },

    validateTask: function (taskData, v) {
      var w = taskData.targetWord;
      if (!w || typeof w !== 'string' || w.length < 2 || w.length > 8) {
        return v.error('sb-cvc-builder: targetWord must be a 2-8 letter string');
      }
      var pal = taskData.palette;
      if (!Array.isArray(pal) || pal.length < w.length || pal.length > 10) {
        return v.error('sb-cvc-builder: palette must be an array (word letters + distractors, <= 10)');
      }
      /* palette must cover the word INCLUDING repeats */
      var pool = pal.map(function (x) { return String(x).toLowerCase(); });
      for (var i = 0; i < w.length; i++) {
        var idx = pool.indexOf(w.charAt(i).toLowerCase());
        if (idx < 0) return v.error('sb-cvc-builder: palette missing letter "' + w.charAt(i) + '" (repeats need repeated tiles)');
        pool.splice(idx, 1);
      }
      if (pal.length === w.length) v.error('sb-cvc-builder: add distractor letters (a pure-answer palette is solvable by elimination)');
      if (taskData.subject) {
        if (!taskData.subject.image) v.error('sb-cvc-builder: subject needs image (assetId)');
        else v.assetExists(taskData.subject.image);
        if (typeof taskData.subject.alt === 'string' && taskData.subject.alt.charAt(0) === '@') {
          v.stringExists(taskData.subject.alt.slice(1));
        }
      }
      if (taskData.prefill && taskData.prefill.length !== w.length) {
        v.error('sb-cvc-builder: prefill length must equal targetWord length');
      }
    }
  });
}(typeof window !== 'undefined' ? window : this));
