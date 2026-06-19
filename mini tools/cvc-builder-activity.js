/* =====================================================================
   CVC BUILDER — ACTIVITY   (cvc-builder-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of cvc-builder. Reuses cvc-builder-core.js for
   the DOM/paint/state. Task source depends on the URL:

   • ?activity=<id>   → fetches cvc-builder-activities.json, finds the
                         row, instantiates tasks from the row's
                         task_template + params.
   • no ?activity     → falls back to a static demo task so the
                         /mini-tools/cvc-builder-activity.html direct-
                         load shows the same kind of board.

   v1 proof shipping: ONE row, EN only — "Build the CVC Word" (RF.K.3).
   The engine itself is locale-agnostic; per-locale phonics commissions
   (es syllables, de digraphs, etc.) will register their own rows here
   or in sibling manifest files.
   ===================================================================== */

/* Localized chrome strings for activity tasks. Per-locale templates use
   {word} interpolation in the prompt; the activity-task-builder injects
   the target word at build time. EN-only for v1 proof — other locales
   declared but English-fallback per i18n.t() contract until per-locale
   phonics commissions land. */
var CVC_ACTIVITY_STRINGS = {
  /* RF.K.3 — Build the CVC word (kid sees picture + hears target via
     subject Hear-it button, then builds the 3-letter word). */
  promptBuildCvc: {
    en: 'Tap the letters to spell the word for this picture.',
    /* Non-EN entries deliberately fall back to EN for v1 — the proof is
       EN-only by design; per-locale phonics commissions will replace
       these with locale-appropriate decoding-task prompts. */
    de: 'Tap the letters to spell the word for this picture.',
    fr: 'Tap the letters to spell the word for this picture.',
    it: 'Tap the letters to spell the word for this picture.',
    es: 'Tap the letters to spell the word for this picture.',
    pt: 'Tap the letters to spell the word for this picture.',
    nl: 'Tap the letters to spell the word for this picture.',
    sv: 'Tap the letters to spell the word for this picture.',
    da: 'Tap the letters to spell the word for this picture.',
    no: 'Tap the letters to spell the word for this picture.',
    fi: 'Tap the letters to spell the word for this picture.'
  },
  /* RF.1.3 — build a blend/digraph word; the cluster (sh/ch/st/fr…) is a
     SINGLE chunk tile. EN-only (cvc-builder is the EN-only exception). */
  promptBuildBlend: {
    en: 'Tap the sounds to build the word.',
    de: 'Tap the sounds to build the word.', fr: 'Tap the sounds to build the word.',
    it: 'Tap the sounds to build the word.', es: 'Tap the sounds to build the word.',
    pt: 'Tap the sounds to build the word.', nl: 'Tap the sounds to build the word.',
    sv: 'Tap the sounds to build the word.', da: 'Tap the sounds to build the word.',
    no: 'Tap the sounds to build the word.', fi: 'Tap the sounds to build the word.'
  },
  hintFillAllSlots: {
    en: 'Fill all three letter slots, then check.',
    de: 'Fill all three letter slots, then check.',
    fr: 'Fill all three letter slots, then check.',
    it: 'Fill all three letter slots, then check.',
    es: 'Fill all three letter slots, then check.',
    pt: 'Fill all three letter slots, then check.',
    nl: 'Fill all three letter slots, then check.',
    sv: 'Fill all three letter slots, then check.',
    da: 'Fill all three letter slots, then check.',
    no: 'Fill all three letter slots, then check.',
    fi: 'Fill all three letter slots, then check.'
  },
  hintTryAnother: {
    en: 'Almost — listen again and try different letters.',
    de: 'Almost — listen again and try different letters.',
    fr: 'Almost — listen again and try different letters.',
    it: 'Almost — listen again and try different letters.',
    es: 'Almost — listen again and try different letters.',
    pt: 'Almost — listen again and try different letters.',
    nl: 'Almost — listen again and try different letters.',
    sv: 'Almost — listen again and try different letters.',
    da: 'Almost — listen again and try different letters.',
    no: 'Almost — listen again and try different letters.',
    fi: 'Almost — listen again and try different letters.'
  }
};

/* Static demo task used when /mini-tools/cvc-builder-activity.html is
   loaded directly without ?activity= (testability + sanity check). */
var STATIC_DEMO_CVC_TASKS = [
  {
    id: 'demo-cat',
    promptKey: 'promptBuildCvc',
    answerType: 'state',
    setup: function (tool) {
      tool.setupTask({
        slots: 3,
        palette: ['c', 'a', 't', 'd', 'r', 'o', 's'],
        targetWord: 'cat',
        subject: {
          type: 'image',
          imgUrl: '/image-library-webp/themes/animals/cat@2x.webp',
          alt: 'cat',
          hearItWord: 'cat',
          hearItLang: 'en-US'
        }
      });
    },
    check: function (tool) {
      var correct = tool.answer === 'cat';
      tool.showFeedback(correct);
      return correct;
    },
    hintKey: function (tool) {
      return tool.answer == null ? 'hintFillAllSlots' : 'hintTryAnother';
    }
  }
];

/* Deterministic seeded RNG keyed on the target word so all 11 locales
   render the same palette order (only the engine + strings vary by
   locale). Same shuffle technique as choice-board's pickOptions. */
function _seedFromWord(word) {
  var s = 0;
  for (var i = 0; i < word.length; i++) s = (s * 31 + word.charCodeAt(i)) | 0;
  return s;
}
function _shuffle(arr, seed) {
  var picks = arr.slice();
  var s = seed;
  function rand() {
    s = (s + 0x6D2B79F5) | 0;
    var t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  for (var j = picks.length - 1; j > 0; j--) {
    var k = Math.floor(rand() * (j + 1));
    var tmp = picks[j]; picks[j] = picks[k]; picks[k] = tmp;
  }
  return picks;
}

/* Build a deterministic letter palette for a CVC task. Includes the
   target word's letters (unique-set + duplicates if the word has them)
   + the manifest's distractor letters. Shuffled by target seed. */
function _buildPalette(targetWord, distractors) {
  var letters = String(targetWord).split('');
  var pool = letters.concat(distractors || []);
  /* De-dup the pool — a palette tile represents a letter the kid can
     tap as many times as needed; no duplicates needed in tile list. */
  var seen = {};
  var unique = [];
  for (var i = 0; i < pool.length; i++) {
    var l = pool[i];
    if (!seen[l]) { seen[l] = true; unique.push(l); }
  }
  return _shuffle(unique, _seedFromWord(targetWord));
}

/* Build a deterministic CHUNK palette for a blend/digraph task: the round's
   chunks (cluster as ONE unit, e.g. "sh") + the manifest's distractor
   chunks/letters, de-duped + shuffled by the target seed. Distinct from
   _buildPalette (which char-splits) — here a multi-letter chunk is one tile. */
function _buildChunkPalette(chunks, distractors) {
  var pool = (chunks || []).concat(distractors || []);
  var seen = {}, unique = [];
  for (var i = 0; i < pool.length; i++) { var c = pool[i]; if (!seen[c]) { seen[c] = true; unique.push(c); } }
  return _shuffle(unique, _seedFromWord((chunks || []).join('')));
}

/* nextTask per-pass reshuffle (§A.13.60) — order-only Fisher–Yates, used ONLY
   by the build-blend-word template; the live build-cvc-word keeps the shell
   tasks[] per-mount shuffle (untouched). Mirrors choice-board's cbShuffledOrder. */
function _cvcSameOrder(a, b) {
  if (!b || a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
  return true;
}
function cvcShuffledOrder(n, prev) {
  var idx = [], i, j, t;
  for (i = 0; i < n; i++) idx.push(i);
  if (n < 2) return idx;
  do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (_cvcSameOrder(idx, prev));
  return idx;
}

window.CvcBuilderActivity = Object.assign({}, CvcBuilderCore, {
  id: 'cvc-builder-activity',
  strings: Object.assign({}, CvcBuilderCore.strings, CVC_ACTIVITY_STRINGS, {
    title: {en:'Word Builder',de:'Wortbauer',fr:'Constructeur de mots',it:'Costruttore di parole',es:'Constructor de palabras',pt:'Construtor de palavras',nl:'Woordbouwer',sv:'Ordbyggare',da:'Ordbygger',no:'Ordbygger',fi:'Sanarakentaja'},
    instruction: {en:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',de:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',fr:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',it:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',es:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',pt:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',nl:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',sv:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',da:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',no:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.',fi:'Look at the picture. Tap the letters to spell the word. Tap Check when you’re ready.'}
  }),

  tasks: STATIC_DEMO_CVC_TASKS,

  init: function (api) {
    CvcBuilderCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) this._loadActivity();
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/cvc-builder-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      var built = self._buildTasksFromRow(row);
      if (row.task_template === 'build-blend-word') {
        /* per-pass reshuffle path: shell uses nextTask() when tasks is unset */
        self._pool = built; self._order = null; self._curPass = 0; self._orderForPool = null;
        self.tasks = null;
      } else {
        self.tasks = built;
      }
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[cvc-builder-activity] manifest load failed; using fallback:', e.message);
    });
  },

  /* Per-pass reshuffle for build-blend-word (self._pool set + self.tasks null →
     shell calls nextTask). Other templates set self.tasks → never called. */
  nextTask: function (opts) {
    var pool = this._pool;
    if (!pool || !pool.length) return null;
    var n = pool.length;
    var i = (opts && opts.index) || 0;
    if (!this._order || this._orderForPool !== pool || this._order.length !== n) {
      this._order = cvcShuffledOrder(n, null); this._orderForPool = pool; this._curPass = 0;
    }
    var pass = Math.floor(i / n);
    if (pass > this._curPass) { this._order = cvcShuffledOrder(n, this._order); this._curPass = pass; }
    return pool[this._order[i % n]];
  },

  _buildTasksFromRow: function (row) {
    var self = this;

    /* TEMPLATE: build-blend-word (RF.1.3) — build a blend/digraph word from
       CHUNK tiles where the cluster (sh/ch/st/fr…) is ONE selectable unit.
       params.words = [{ noun, themeDir, targetWord, chunks:[…], distractors:[…] }].
       chunks.join('') === targetWord; slots = chunks.length; the core's chunk
       mode gives chunk-wise feedback + widened slots. */
    if (row.task_template === 'build-blend-word') {
      var blendWords = row.params.words;
      return blendWords.map(function (entry) {
        var imgUrl = '/image-library-webp/themes/' + entry.themeDir + '/' + entry.noun + '@2x.webp';
        var chunks = entry.chunks || [];
        var palette = _buildChunkPalette(chunks, entry.distractors || []);
        return {
          id: row.id + '.' + entry.noun,
          promptKey: 'promptBuildBlend',
          answerType: 'state',
          setup: function (tool) {
            tool.setupTask({
              slots: chunks.length,
              palette: palette,
              targetWord: entry.targetWord,
              chunks: chunks,
              subject: {
                type: 'image',
                imgUrl: imgUrl,
                alt: entry.noun,
                hearItWord: entry.targetWord,
                hearItLang: entry.hearItLang || 'en-US'
              }
            });
          },
          check: function (tool) {
            var correct = tool.answer === entry.targetWord;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintFillAllSlots' : 'hintTryAnother';
          }
        };
      });
    }

    /* TEMPLATE: build-cvc-word (RF.K.3) — show a picture, kid spells
       the word by tapping letters into 3 slots.
       params.words = [{ noun, themeDir, targetWord, distractors:[l,l,l] }, ...]. */
    if (row.task_template === 'build-cvc-word') {
      var words = row.params.words;
      return words.map(function (entry) {
        var imgUrl = '/image-library-webp/themes/' + entry.themeDir + '/' + entry.noun + '@2x.webp';
        var palette = _buildPalette(entry.targetWord, entry.distractors || []);
        return {
          id: row.id + '.' + entry.noun,
          promptKey: 'promptBuildCvc',
          answerType: 'state',
          setup: function (tool) {
            tool.setupTask({
              slots: entry.targetWord.length,
              palette: palette,
              targetWord: entry.targetWord,
              subject: {
                type: 'image',
                imgUrl: imgUrl,
                alt: entry.noun,
                hearItWord: entry.targetWord,
                hearItLang: entry.hearItLang || 'en-US'
              }
            });
          },
          check: function (tool) {
            var correct = tool.answer === entry.targetWord;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintFillAllSlots' : 'hintTryAnother';
          }
        };
      });
    }

    return STATIC_DEMO_CVC_TASKS;
  }
});

CvcBuilderCore.injectCSS();
