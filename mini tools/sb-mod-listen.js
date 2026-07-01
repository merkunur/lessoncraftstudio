/* ============================================================================
   sb-mod-listen.js — NATIVE module: listening comprehension.
   The prompt is AUDIO-ONLY: a big in-zone speaker button says a word; the
   child taps the matching picture. Equity paths: if sound is muted (or after
   two misses) the word appears as TEXT so the page is never unanswerable;
   nothing is conveyed by motion.

   Page taskData:
     { "word": "@p.listen.word",        // the spoken word (strings key or literal)
       "correct": "apple",
       "options": [ { "key":"apple",  "image":"img.apple" },
                    { "key":"banana", "image":"img.banana" },
                    { "key":"hat",    "image":"img.hat" } ] }
   ========================================================================= */
(function (global) {
  'use strict';

  var _cssDone = false;
  function injectCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var css = [
      '.sbls{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6%;}',
      '.sbls-speak{min-width:88px;min-height:88px;border-radius:50%;border:none;background:#F2784B;color:#fff;',
      '  font-size:40px;cursor:pointer;box-shadow:0 5px 14px rgba(0,0,0,.28);',
      '  display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;}',
      '.sbls-speak:active{transform:scale(.94);}',
      '@media (prefers-reduced-motion: reduce){.sbls-speak:active{transform:none;}}',
      '.sbls-word{font-weight:900;font-size:1.6em;color:#1c1a17;background:rgba(255,255,255,.85);',
      '  border-radius:12px;padding:4px 18px;display:none;}',
      '.sbls-word.sbls-show{display:block;}',
      '.sbls-row{display:flex;gap:4%;justify-content:center;width:100%;}',
      '.sbls-opt{flex:0 1 26%;max-width:26%;aspect-ratio:1;border-radius:16px;border:4px solid #146B5E;',
      '  background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:3%;',
      '  -webkit-tap-highlight-color:transparent;touch-action:manipulation;box-shadow:0 3px 8px rgba(0,0,0,.18);}',
      '.sbls-opt img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;}',
      '@keyframes sbls-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}',
      '.sbls-opt.sbls-no{animation:sbls-shake .3s ease 2;}',
      '@media (prefers-reduced-motion: reduce){.sbls-opt.sbls-no{animation:none;}}',
      '.sbls-opt.sbls-hint{outline:5px dashed #F2784B;outline-offset:3px;}'
    ].join('\n');
    var st = global.document.createElement('style');
    st.id = 'sbls-css'; st.textContent = css;
    global.document.head.appendChild(st);
  }

  function resolveStr(v, ctx) {
    if (typeof v === 'string' && v.charAt(0) === '@') return ctx.t(v.slice(1));
    return v || '';
  }

  global.SBModules.register({
    meta: {
      type: 'sb-listen', version: 1, surfaces: ['dom'],
      completionModes: ['auto'], minZone: { w: 520, h: 420 },
      studio: {
        label: 'Listen and tap', group: 'Letters & words', icon: '🔊',
        blurb: 'A word is spoken out loud — the child taps the matching picture.',
        defaults: { word: '', correct: '', options: [] },
        fields: [
          { key: 'word', kind: 'stringRef', label: 'The spoken word', keyHint: 'listen' },
          { key: 'options', kind: 'list', label: 'The pictures', min: 2, max: 4, keyField: 'key', itemFields: [
            { key: 'image', kind: 'image', label: 'Picture', vocabAutofill: true },
            { key: 'key', kind: 'text', label: 'Name (unique)', lowercase: true }
          ] },
          { key: 'correct', kind: 'correctPick', label: 'The right picture', of: 'options', by: 'key' }
        ]
      }
    },

    validateTask: function (taskData, v) {
      if (!taskData.word) v.error('sb-listen: word required');
      if (typeof taskData.word === 'string' && taskData.word.charAt(0) === '@') {
        v.stringExists(taskData.word.slice(1));
      }
      var opts = taskData.options;
      if (!Array.isArray(opts) || opts.length < 2 || opts.length > 4) {
        return v.error('sb-listen: options must be 2-4');
      }
      var keys = {};
      opts.forEach(function (o, i) {
        if (!o.key || !o.image) v.error('sb-listen: options[' + i + '] needs key + image');
        if (keys[o.key]) v.error('sb-listen: duplicate option key ' + o.key);
        keys[o.key] = 1;
        if (o.image) v.assetExists(o.image);
      });
      if (!keys[taskData.correct]) v.error('sb-listen: correct must be one of the option keys');
    },

    create: function () {
      var ctx = null, enabled = false, done = false;
      var optEls = {}, wordEl = null, missCount = 0;

      function speakWord() {
        ctx.audio.speak({ type: 'word', text: resolveStr(ctx.taskData.word, ctx) });
      }
      function showWordText() {
        if (wordEl) wordEl.classList.add('sbls-show');
      }
      function onTap(key) {
        if (!enabled || done) return;
        if (key === ctx.taskData.correct) {
          done = true;
          ctx.report.success();
        } else {
          missCount++;
          var el = optEls[key];
          if (el && !ctx.reducedMotion) {
            el.classList.remove('sbls-no'); void el.offsetWidth; el.classList.add('sbls-no');
          }
          if (missCount >= 2) showWordText();     /* audio-equity fallback */
          speakWord();
          ctx.report.miss({ tapped: key });
        }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectCSS();
          var wrap = ctx.el('div', 'sbls');

          var speak = ctx.el('button', 'sbls-speak');
          speak.type = 'button';
          speak.textContent = '🔊';
          speak.setAttribute('aria-label', resolveStr(ctx.taskData.word, ctx));
          speak.addEventListener('click', function () { if (enabled && !done) speakWord(); });
          wrap.appendChild(speak);

          wordEl = ctx.el('div', 'sbls-word');
          wordEl.textContent = resolveStr(ctx.taskData.word, ctx);
          wrap.appendChild(wordEl);

          var row = ctx.el('div', 'sbls-row');
          ctx.taskData.options.forEach(function (o) {
            var b = ctx.el('button', 'sbls-opt');
            b.type = 'button';
            b.setAttribute('aria-label', o.key);
            b.appendChild(ctx.assets.img(o.image));
            b.addEventListener('click', function () { onTap(o.key); });
            row.appendChild(b);
            optEls[o.key] = b;
          });
          wrap.appendChild(row);
          ctx.surface.el.appendChild(wrap);

          /* sound off = the audio prompt can't reach the child: show the word */
          try { if (global.SBAudio && global.SBAudio.muted()) showWordText(); } catch (e) {}
        },
        start: function () {
          enabled = true;
          speakWord();                            /* the prompt IS the audio */
        },
        setEnabled: function (b) { enabled = !!b && !done; },
        showHint: function () {
          showWordText();
          var el = optEls[ctx.taskData.correct];
          if (el) {
            el.classList.add('sbls-hint');
            setTimeout(function () { el.classList.remove('sbls-hint'); }, 1600);
          }
        },
        autoSolve: function () { enabled = true; onTap(ctx.taskData.correct); },
        destroy: function () { done = true; enabled = false; optEls = {}; wordEl = null; }
      };
    }
  });
}(typeof window !== 'undefined' ? window : this));
