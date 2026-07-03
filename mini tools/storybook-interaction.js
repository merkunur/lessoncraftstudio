/* ============================================================================
   storybook-interaction.js — the interaction-module CONTRACT (the socket).

   SBModules — the registry every mechanic plugs into.
   SBInteractionHost — mounts a page's ONE interaction module into its zone,
   builds the frozen ctx, owns the miss counter / hint ladder / idle nudge /
   Check-button chrome, and reports success upward to the player.

   THE CONTRACT (v1, surface 'dom'):

     SBModules.register({
       meta: {
         type: 'tap-answer',            // unique id, /^[a-z0-9-]+$/
         version: 1,                    // contract major it targets
         surfaces: ['dom'],             // v1: 'dom' only ('pixi' reserved)
         completionModes: ['auto'],     // 'auto' | 'check' | both
         minZone: { w: 480, h: 360 }    // minimum zone in design units
       },
       validateTask: function (taskData, v) {},  // PURE — runs in Node (author-time validator)
       create: function () { return instance; } // fresh instance per mount
     });

     instance = {
       mount(ctx)        REQUIRED  render INERT into ctx.surface.el (sync DOM)
       start()           REQUIRED  enable interaction (called after narration)
       setEnabled(bool)  REQUIRED  freeze/unfreeze (celebration, teardown)
       destroy()         REQUIRED  remove ALL listeners/timers/rAF, empty the zone
       check()           check-mode only: -> {ok:boolean}; paint own feedback first
       showHint()        optional  visual nudge on the correct target
       reset()           optional
       autoSolve()       optional  DEV-ONLY QA seam (drive to success programmatically)
     }

   MODULE OBLIGATIONS (normative): render only inside ctx.surface.el (exception:
   a position:fixed drag ghost on document.body iff removed in destroy);
   idempotent scoped CSS; honor ctx.reducedMotion; taps >= 44 REAL px; all audio
   via ctx.audio (never success sounds — visual success state only); no dead
   states (always answerable after a miss); no storage / navigation /
   postMessage / GameCollection; all strings via ctx.t, all images via
   ctx.assets; NO free keyboard input ever.

   PLAYER GUARANTEES: mount -> start -> destroy order; zone exists, sized,
   empty; page assets preloaded; exclusive pointer ownership while enabled;
   success handling (celebration/advance/reward) is the player's; narration
   never starts after start() except explicit replay; ctx frozen + stable.
   ========================================================================= */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* SBModules registry                                                  */
  /* ------------------------------------------------------------------ */
  var _mods = {};

  function register(def) {
    if (!def || !def.meta || !def.create) {
      throw new Error('[SBModules] register: def needs {meta, create}');
    }
    var m = def.meta;
    if (!m.type || !/^[a-z0-9-]+$/.test(m.type)) {
      throw new Error('[SBModules] bad meta.type: ' + m.type);
    }
    if (_mods[m.type]) {
      throw new Error('[SBModules] duplicate module type: ' + m.type);
    }
    if (!Array.isArray(m.surfaces) || m.surfaces.indexOf('dom') < 0) {
      throw new Error('[SBModules] ' + m.type + ': meta.surfaces must include "dom" (v1)');
    }
    if (!Array.isArray(m.completionModes) || !m.completionModes.length ||
        m.completionModes.some(function (x) { return x !== 'auto' && x !== 'check'; })) {
      throw new Error('[SBModules] ' + m.type + ': meta.completionModes must be a non-empty subset of [auto, check]');
    }
    if (!m.minZone || !(m.minZone.w > 0) || !(m.minZone.h > 0)) {
      throw new Error('[SBModules] ' + m.type + ': meta.minZone {w,h} required');
    }
    if (typeof def.create !== 'function') {
      throw new Error('[SBModules] ' + m.type + ': create must be a function');
    }
    _mods[m.type] = def;
    return def;
  }

  function get(type) { return _mods[type] || null; }
  function has(type) { return !!_mods[type]; }
  function types() { return Object.keys(_mods); }

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */
  function el(tag, cls) {
    var d = global.document.createElement(tag);
    if (cls) d.className = cls;
    return d;
  }

  function deepFreeze(o) {
    if (o && typeof o === 'object' && !Object.isFrozen(o)) {
      Object.freeze(o);
      Object.keys(o).forEach(function (k) { deepFreeze(o[k]); });
    }
    return o;
  }

  function interpolate(s, args) {
    if (!args) return s;
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return (args[k] !== undefined) ? args[k] : m;
    });
  }

  /* Hint-ladder / idle-nudge constants — player pedagogy, NOT story data */
  var HINT_REPLAY_AT = 2;     /* miss #2: auto-replay the narration prompt   */
  var HINT_VISUAL_AT = 3;     /* miss #3: module.showHint() + spoken hint    */
  var HINT_EVERY_AT  = 5;     /* miss #5+: hint on every miss                */
  var IDLE_NUDGE_MS  = 20000; /* gentle nudge after 20s of no interaction    */
  var IDLE_NUDGE_MAX = 2;

  /* ------------------------------------------------------------------ */
  /* InteractionHost                                                     */
  /* ------------------------------------------------------------------ */
  /* opts: { interaction, storyId, locale, strings, zoneEl, chromeHost,
             chromeT(key), scale():number, assets:{url,img},
             replayNarration(), speakHint(text), announce(msg),
             reducedMotion, track(ev,data), onSuccess(), debug } */
  function createHost(opts) {
    var inter = opts.interaction;
    var def = get(inter.moduleType);
    if (!def) throw new Error('[SBInteractionHost] unregistered module type: ' + inter.moduleType);

    var mode = inter.completionMode || 'auto';
    if (def.meta.completionModes.indexOf(mode) < 0) {
      throw new Error('[SBInteractionHost] ' + inter.moduleType + ' does not support completionMode "' + mode + '"');
    }

    var instance = def.create();
    var done = false;
    var enabled = false;
    var missCount = 0;
    var nudges = 0;
    var idleTimer = null;
    var checkBtn = null;
    var blocker = null;
    var destroyed = false;

    function t(key, args) {
      var entry = opts.strings && opts.strings[key];
      if (!entry) return key;
      var s = entry[opts.locale] || entry.en || key;
      return interpolate(s, args);
    }

    function clearIdle() { if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; } }
    function armIdle() {
      clearIdle();
      if (!enabled || done || nudges >= IDLE_NUDGE_MAX) return;
      idleTimer = setTimeout(function () {
        nudges++;
        opts.track('idle-nudge', { n: nudges });
        opts.replayNarration();
        armIdle();
      }, IDLE_NUDGE_MS);
    }

    function runHintLadder() {
      if (missCount === HINT_REPLAY_AT) {
        opts.replayNarration();
      } else if (missCount === HINT_VISUAL_AT || missCount >= HINT_EVERY_AT) {
        if (typeof instance.showHint === 'function') {
          try { instance.showHint(); } catch (e) {}
        }
        if (inter.hintKey) opts.speakHint(t(inter.hintKey));
        else if (missCount === HINT_VISUAL_AT && typeof instance.showHint !== 'function') {
          opts.replayNarration();
        }
      }
    }

    function onSuccessInternal() {
      if (done || destroyed) return;         /* duplicate-fire latch */
      done = true;
      clearIdle();
      setEnabled(false);
      if (checkBtn) checkBtn.style.display = 'none';
      opts.track('success', { misses: missCount });
      opts.onSuccess();
    }

    function onMissInternal(info) {
      if (done || destroyed) return;
      missCount++;
      global.SBAudio.pop(360);               /* gentle, no penalty */
      opts.track('miss', { n: missCount, info: info || null });
      runHintLadder();
      armIdle();
    }

    var report = {
      success: function () {
        if (!enabled && !done) { try { console.warn('[SB] report.success before start()'); } catch (e) {} }
        onSuccessInternal();
      },
      miss: onMissInternal,
      progress: function (p) {
        if (done || destroyed) return;
        if (p && p.total) opts.announce((p.done || 0) + ' / ' + p.total);
        armIdle();
      },
      answerChanged: function (hasAnswer) {
        if (checkBtn) checkBtn.disabled = !hasAnswer;
        armIdle();
      }
    };

    var ctx = Object.freeze({
      surface: Object.freeze({ kind: 'dom', el: opts.zoneEl }),
      zone: Object.freeze({
        x: inter.zone.x, y: inter.zone.y, w: inter.zone.w, h: inter.zone.h
      }),
      scale: opts.scale,
      storyBase: '/mini-tools/stories/' + opts.storyId + '/',
      locale: opts.locale,
      t: t,
      taskData: deepFreeze(JSON.parse(JSON.stringify(inter.taskData || {}))),
      assets: opts.assets,
      audio: Object.freeze({
        speak: function (o) {
          global.SBAudio.moduleSpeak({
            type: (o && o.type) || 'word',
            text: o && o.text,
            lang: opts.locale,
            rate: o && o.rate
          });
        },
        pop: global.SBAudio.pop,
        replayPrompt: opts.replayNarration
      }),
      announce: opts.announce,
      reducedMotion: !!opts.reducedMotion,
      /* band: the resolved grade-band INTERACTION profile (tolerances, tap sizes, a11y knobs) —
         additive, frozen, mirrors reducedMotion. Legacy/K-3 modules never read it (zero change);
         pre-school modules read ctx.band.<knob>. Defaults to the K-3 profile when no grade. */
      band: Object.freeze(opts.band || (global.SB_BANDS && global.SB_BANDS.defaults) || {}),
      report: Object.freeze(report),
      el: el,
      drag: (global.LCS && global.LCS.drag) || null,
      track: opts.track
    });

    function buildCheckButton() {
      checkBtn = el('button', 'sb-check-btn');
      checkBtn.type = 'button';
      checkBtn.textContent = opts.chromeT('check');
      checkBtn.disabled = true;
      checkBtn.addEventListener('click', function () {
        if (done || destroyed || checkBtn.disabled) return;
        var res = null;
        try { res = instance.check(); } catch (e) { try { console.error(e); } catch (x) {} }
        if (res && res.ok) {
          onSuccessInternal();
        } else {
          onMissInternal({ via: 'check' });
          checkBtn.textContent = opts.chromeT('tryAgain');
          setTimeout(function () {
            if (!destroyed && !done) checkBtn.textContent = opts.chromeT('check');
          }, 1800);
        }
      });
      opts.chromeHost.appendChild(checkBtn);
    }

    function mount() {
      /* transparent pointer-blocker: module paints inert under narration */
      blocker = el('div', 'sb-zone-blocker');
      instance.mount(ctx);
      opts.zoneEl.appendChild(blocker);
      if (mode === 'check') buildCheckButton();
    }

    function start() {
      if (destroyed || done) return;
      if (blocker && blocker.parentNode) blocker.parentNode.removeChild(blocker);
      blocker = null;
      enabled = true;
      instance.start();
      armIdle();
    }

    function setEnabled(b) {
      enabled = !!b && !done;
      try { instance.setEnabled(enabled); } catch (e) {}
      if (!enabled) clearIdle(); else armIdle();
    }

    function teardown() {
      if (destroyed) return;
      destroyed = true;
      clearIdle();
      try { instance.destroy(); } catch (e) { try { console.error(e); } catch (x) {} }
      if (checkBtn && checkBtn.parentNode) checkBtn.parentNode.removeChild(checkBtn);
      if (blocker && blocker.parentNode) blocker.parentNode.removeChild(blocker);
      opts.zoneEl.innerHTML = '';
    }

    var host = {
      mount: mount,
      start: start,
      setEnabled: setEnabled,
      teardown: teardown,
      isDone: function () { return done; },
      moduleType: inter.moduleType,
      /* dev-only QA seam — the harness calls this to drive a page to success.
         In check mode it also runs the check and routes the result through
         the normal success path (the harness never has to click chrome). */
      autoSolve: function () {
        if (!opts.debug) return false;
        if (typeof instance.autoSolve !== 'function') return false;
        try { instance.autoSolve(); } catch (e) { return false; }
        if (mode === 'check' && !done && typeof instance.check === 'function') {
          var res = null;
          try { res = instance.check(); } catch (e) {}
          if (res && res.ok) onSuccessInternal();
        }
        return true;
      },
      /* dev-only QA seam — the imprecise-touch driver asks the module for its
         gesture geometry (path/drop/taps in design units + tolerance) so the
         harness can drive REAL jittered pointer input. Null for modules that
         don't opt in (all legacy/K-3 modules). Mirrors the autoSolve guard. */
      qaGesture: function () {
        if (!opts.debug) return null;
        if (typeof instance.qaGesture !== 'function') return null;
        try { return instance.qaGesture(); } catch (e) { return null; }
      }
    };
    return host;
  }

  global.SBModules = {
    register: register,
    get: get,
    has: has,
    types: types
  };
  global.SBInteractionHost = { create: createHost };
}(typeof window !== 'undefined' ? window : this));
