/* ============================================================================
   sb-legacy-adapter.js — SBLegacyAdapter: wrap a hardened activity core as a
   storybook interaction module with ZERO edits to the core file.

   The adapter fabricates the field-for-field lcs-shell api-shaped frozen
   object (lcs-shell.js:482-501) bound to an inner stage div inside the page
   zone, so a core cannot tell it isn't running under LCS.mount. v1 supports
   answerType:'state'-style recipes only — the task's check() reads core state
   (tool.answer / tool.placement / …); shell keypad/choice chrome is NOT
   embeddable in a story page.

   Listener-recording shim: several cores attach page-level artifacts
   (match-pairs: a window resize listener; sort-bins: a position:fixed drag
   ghost appended to document.body). During init()+render() the adapter
   temporarily wraps window.addEventListener and document.body.appendChild to
   RECORD (never alter) what the core attaches, so destroy() can remove it all.
   Core bytes stay untouched — this is boundary wrapping.

   SBLegacyAdapter.wrap({
     type: 'sb-choice-board',           // SB module type id it registers as
     core: () => window.ChoiceBoardCore,// lazy getter (script-order safety)
     completionModes: ['check'],        // and/or ['auto'] with `detect`
     minZone: {w, h},
     strings: {…}?,                     // extra strings merged over core.strings
     buildTask: (taskData, ctx) => ({
       setup: (tool) => …,              // call core.setupTask(...) with mapped data
       check: (tool) => bool,           // read core state (check mode)
       hasAnswer: (tool) => bool?,      // drives the Check button enable state
     }),
     detect: (tool) => bool | null,     // auto mode: truthy => success
     showHint: (tool, ctx) => void?,    // optional visual nudge
     autoSolve: (tool, ctx) => void?,   // dev-only QA seam
     validateTask: (taskData, v) => void// PURE (author-time validator)
   })
   ========================================================================= */
(function (global) {
  'use strict';

  function lookup(dict, key, locale) {
    var entry = dict && dict[key];
    if (!entry) return key;
    return entry[locale] || entry.en || key;
  }

  var _cssDone = false;
  function injectAdapterCSS() {
    if (_cssDone) return;
    _cssDone = true;
    var st = global.document.createElement('style');
    st.id = 'sb-legacy-fit-css';
    st.textContent = '.sb-legacy-fit{width:100%;}';
    global.document.head.appendChild(st);
  }

  function wrap(w) {
    if (!w || !w.type || !w.core || !w.buildTask) {
      throw new Error('[SBLegacyAdapter] wrap needs {type, core, buildTask}');
    }

    function createInstance() {
      var tool = null;
      var task = null;
      var ctx = null;
      var stageEl = null;
      var fitOuter = null;
      var fitRO = null;
      var fitResizeHandler = null;
      var innerBlocker = null;
      var recordedWinListeners = [];
      var recordedBodyNodes = [];
      var pollTimer = null;
      var pointerHandler = null;
      var destroyed = false;
      var succeeded = false;

      /* Scale-to-fit containment: cores authored against full-page stages
         (vw/vmin sizing — clock's min(78vw,300px) etc.) can render taller
         than a story zone. Uniformly downscale the stage so content always
         fits the zone box; pointer math (getBoundingClientRect) stays
         consistent because everything scales together. */
      function fitToZone() {
        if (destroyed || !stageEl || !fitOuter) return;
        stageEl.style.transform = '';
        fitOuter.style.height = '';
        fitOuter.style.overflow = '';
        var cw = stageEl.scrollWidth, chh = stageEl.scrollHeight;
        var zw = ctx.surface.el.clientWidth, zhh = ctx.surface.el.clientHeight;
        if (!cw || !chh || !zw || !zhh) return;
        var k = Math.min(1, zw / cw, zhh / chh);
        if (k < 0.995) {
          stageEl.style.transformOrigin = 'top center';
          stageEl.style.transform = 'scale(' + k + ')';
          fitOuter.style.height = Math.floor(chh * k) + 'px';
          fitOuter.style.overflow = 'hidden';
        }
      }

      function recordDuring(fn) {
        var origAdd = global.addEventListener;
        var body = global.document.body;
        var origAppend = body.appendChild;
        global.addEventListener = function (type, listener, opts) {
          recordedWinListeners.push({ type: type, listener: listener, opts: opts });
          return origAdd.call(global, type, listener, opts);
        };
        body.appendChild = function (node) {
          recordedBodyNodes.push(node);
          return origAppend.call(body, node);
        };
        try { fn(); }
        finally {
          global.addEventListener = origAdd;
          body.appendChild = origAppend;
        }
      }

      function evalAnswerChanged() {
        if (destroyed || succeeded || !task) return;
        var has = false;
        try {
          has = task.hasAnswer ? !!task.hasAnswer(tool)
                               : (tool.answer !== null && tool.answer !== undefined);
        } catch (e) {}
        ctx.report.answerChanged(has);
      }

      function evalDetect() {
        if (destroyed || succeeded || !w.detect) return;
        var ok = false;
        try { ok = !!w.detect(tool); } catch (e) {}
        if (ok) {
          succeeded = true;
          if (typeof tool.showFeedback === 'function') { try { tool.showFeedback(true); } catch (e) {} }
          ctx.report.success();
        }
      }

      return {
        mount: function (c) {
          ctx = c;
          injectAdapterCSS();
          fitOuter = ctx.el('div', 'sb-legacy-fit');
          stageEl = ctx.el('div', 'sb-legacy-stage');
          fitOuter.appendChild(stageEl);
          ctx.surface.el.appendChild(fitOuter);

          tool = Object.assign({}, w.core());
          if (!tool || typeof tool.init !== 'function') {
            throw new Error('[SBLegacyAdapter] core not available for ' + w.type);
          }
          tool.id = w.type;
          tool.strings = Object.assign({}, tool.strings || {}, w.strings || {});
          /* several cores rely on their ACTIVITY WRAPPER to inject CSS at load
             (choice-board-activity.js:2056 precedent) — do it here, idempotent */
          if (typeof tool.injectCSS === 'function') { try { tool.injectCSS(); } catch (e) {} }

          var settings = Object.assign({}, tool.defaults || {}, ctx.taskData.settings || {});
          var api = Object.freeze({
            stage: stageEl,
            settings: settings,
            lang: ctx.locale,
            embed: true,
            compact: true,
            t: function (key) { return lookup(tool.strings, key, ctx.locale); },
            token: (global.LCS && global.LCS.token) || function () { return global.document.createElement('span'); },
            track: ctx.track,
            sound: ctx.audio.pop,
            announce: ctx.announce,
            el: ctx.el
          });

          task = w.buildTask(ctx.taskData, ctx);
          recordDuring(function () {
            tool.init(api);
            if (task.setup) task.setup(tool);
            tool.render();
          });

          /* keep the stage fitted: after first paint, on zone/content resize */
          global.requestAnimationFrame(fitToZone);
          setTimeout(fitToZone, 150);                 /* post image/font settle */
          if (global.ResizeObserver) {
            fitRO = new global.ResizeObserver(function () { fitToZone(); });
            fitRO.observe(ctx.surface.el);
          }
          fitResizeHandler = function () { setTimeout(fitToZone, 0); };
          global.addEventListener('resize', fitResizeHandler);
        },

        start: function () {
          if (destroyed) return;
          pointerHandler = function () {
            setTimeout(function () { evalAnswerChanged(); evalDetect(); }, 0);
          };
          stageEl.addEventListener('pointerup', pointerHandler, true);
          stageEl.addEventListener('click', pointerHandler, true);
          if (w.detect) pollTimer = setInterval(evalDetect, 400);
          evalAnswerChanged();
        },

        setEnabled: function (b) {
          if (destroyed) return;
          /* cores have no enable/disable concept — gate with a transparent
             pointer-blocker over the inner stage */
          if (!b && !innerBlocker) {
            innerBlocker = ctx.el('div', 'sb-zone-blocker');
            ctx.surface.el.appendChild(innerBlocker);
          } else if (b && innerBlocker) {
            if (innerBlocker.parentNode) innerBlocker.parentNode.removeChild(innerBlocker);
            innerBlocker = null;
          }
        },

        check: function () {
          var ok = false;
          try { ok = !!task.check(tool); } catch (e) {}
          if (typeof tool.showFeedback === 'function') { try { tool.showFeedback(ok); } catch (e) {} }
          if (ok) succeeded = true;
          return { ok: ok };
        },

        showHint: function () {
          if (w.showHint) { try { w.showHint(tool, ctx); } catch (e) {} }
        },

        autoSolve: function () {
          if (w.autoSolve) { try { w.autoSolve(tool, ctx); } catch (e) {} }
          /* auto mode: run detection immediately (the poll may not be armed
             yet when the QA harness solves during narration) */
          evalDetect();
        },

        destroy: function () {
          if (destroyed) return;
          destroyed = true;
          if (fitRO) { try { fitRO.disconnect(); } catch (e) {} fitRO = null; }
          if (fitResizeHandler) { global.removeEventListener('resize', fitResizeHandler); fitResizeHandler = null; }
          if (pollTimer) clearInterval(pollTimer);
          if (pointerHandler && stageEl) {
            stageEl.removeEventListener('pointerup', pointerHandler, true);
            stageEl.removeEventListener('click', pointerHandler, true);
          }
          recordedWinListeners.forEach(function (r) {
            try { global.removeEventListener(r.type, r.listener, r.opts); } catch (e) {}
          });
          recordedWinListeners = [];
          recordedBodyNodes.forEach(function (n) {
            try { if (n && n.parentNode) n.parentNode.removeChild(n); } catch (e) {}
          });
          recordedBodyNodes = [];
          if (stageEl && stageEl.parentNode) stageEl.parentNode.removeChild(stageEl);
          tool = null; task = null;
        }
      };
    }

    return global.SBModules.register({
      meta: {
        type: w.type,
        version: 1,
        surfaces: ['dom'],
        completionModes: w.completionModes || ['check'],
        minZone: w.minZone || { w: 560, h: 420 }
      },
      validateTask: w.validateTask || function () {},
      create: createInstance
    });
  }

  global.SBLegacyAdapter = { wrap: wrap };
}(typeof window !== 'undefined' ? window : this));
