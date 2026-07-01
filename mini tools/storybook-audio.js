/* ============================================================================
   storybook-audio.js — SBAudio: the storybook narration channel + audio arbiter.

   Third-sibling runtime component (sibling of lcs-shell.js and game-shell.js;
   loads AFTER lcs-shell.js, which provides window.LCSAudio for the TTS
   fallback voice mapping — lcs-shell.js itself is NEVER modified).

   Responsibilities
   - Narration line playback: /mini-tools/stories/<storyId>/audio/<locale>/<lineId>.mp3
     keyed by STABLE line IDs (operator ruling 2026-07-01 — survives copy edits,
     no global /audio/inventory.json bloat). Missing/failed file → own TTS
     fallback (SpeechSynthesis with LCSAudio._ttsLang voice hint) so we get a
     real `end` signal, which LCSAudio.speak cannot provide.
   - THE never-overlap arbiter: exactly one thing speaks at a time.
     Priority: narration > module utterances > feedback blips. SFX requested
     while narration plays are QUEUED until the line ends; module utterances
     during narration are DROPPED (interaction is disabled then by design).
   - Mute toggle covers mp3 + TTS + queued SFX.

   Contract for callers (the player + InteractionHost):
     SBAudio.playLine({storyId, locale, lineId, text, rate}) -> Promise<void>
     SBAudio.stop()                    cancel current line + pending TTS
     SBAudio.isSpeaking() -> bool
     SBAudio.afterSpeech(fn)           run fn now, or queue until line ends
     SBAudio.moduleSpeak(opts)         proxied LCSAudio.speak; no-op while narrating
     SBAudio.pop(freq)                 WebAudio blip (own tiny synth; never queued)
     SBAudio.setMuted(bool) / SBAudio.muted()
   ========================================================================= */
(function (global) {
  'use strict';

  var _muted = false;
  var _current = null;      /* { audio:HTMLAudioElement|null, utter:SpeechSynthesisUtterance|null,
                                 done:fn, settled:bool } */
  var _afterQueue = [];     /* fns to run when the current line ends */

  /* ---- tiny WebAudio blip (mirrors lcs-shell Audio.pop without touching it) */
  var _actx = null;
  function pop(freq) {
    if (_muted) return;
    try {
      _actx = _actx || new (global.AudioContext || global.webkitAudioContext)();
      var o = _actx.createOscillator();
      var g = _actx.createGain();
      o.type = 'sine';
      o.frequency.value = freq || 660;
      g.gain.setValueAtTime(0.0001, _actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.18, _actx.currentTime + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, _actx.currentTime + 0.22);
      o.connect(g); g.connect(_actx.destination);
      o.start(); o.stop(_actx.currentTime + 0.24);
    } catch (e) { /* audio unavailable — silent */ }
  }

  function isSpeaking() { return !!_current; }

  function _settle() {
    if (!_current || _current.settled) return;
    _current.settled = true;
    var done = _current.done;
    _current = null;
    if (done) { try { done(); } catch (e) {} }
    /* flush queued after-speech work (celebration chimes etc.) */
    var q = _afterQueue.splice(0);
    for (var i = 0; i < q.length; i++) { try { q[i](); } catch (e) {} }
  }

  function stop() {
    if (_current) {
      var c = _current;
      c.settled = true;          /* prevent late onended double-resolve */
      _current = null;
      if (c.audio) { try { c.audio.pause(); c.audio.src = ''; } catch (e) {} }
      if (c.done) { try { c.done(); } catch (e) {} }
    }
    try { if (global.speechSynthesis) global.speechSynthesis.cancel(); } catch (e) {}
    try { if (global.LCSAudio && global.LCSAudio.cancel) global.LCSAudio.cancel(); } catch (e) {}
  }

  /* estimated reading duration when no audio channel exists at all */
  function _estimateMs(text) {
    var words = String(text || '').trim().split(/\s+/).length;
    return Math.min(12000, 600 + words * 360);
  }

  function _ttsLang(lang) {
    try {
      if (global.LCSAudio && typeof global.LCSAudio._ttsLang === 'function') {
        return global.LCSAudio._ttsLang(lang);
      }
    } catch (e) {}
    return lang || 'en';
  }

  /* Speak `text` via SpeechSynthesis with a real completion signal.
     (LCSAudio.speak has no onend — this mirrors its ttsFallback but observable.) */
  function _tts(text, lang, rate, onDone) {
    var synth = global.speechSynthesis;
    if (!synth || !global.SpeechSynthesisUtterance) {
      setTimeout(onDone, _estimateMs(text));
      return null;
    }
    try {
      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = _ttsLang(lang);
      u.rate = (typeof rate === 'number') ? rate : 0.95;
      var guard = setTimeout(onDone, _estimateMs(text) + 4000); /* stuck-synth guard */
      u.onend = function () { clearTimeout(guard); onDone(); };
      u.onerror = function () { clearTimeout(guard); onDone(); };
      synth.cancel();
      synth.speak(u);
      return u;
    } catch (e) {
      setTimeout(onDone, _estimateMs(text));
      return null;
    }
  }

  /* Play one narration line. Resolves when the line has finished (mp3 ended,
     TTS ended, or estimated duration elapsed). Always resolves — a broken
     audio stack must never wedge the page state machine. */
  function playLine(opts) {
    opts = opts || {};
    stop();
    return new Promise(function (resolve) {
      var entry = { audio: null, utter: null, done: resolve, settled: false };
      _current = entry;

      if (_muted) {
        /* muted: hold the caption for a readable beat, no sound */
        setTimeout(function () { if (_current === entry) _settle(); }, Math.min(2500, _estimateMs(opts.text) * 0.6));
        return;
      }

      var url = '/mini-tools/stories/' + encodeURIComponent(opts.storyId) +
                '/audio/' + encodeURIComponent(opts.locale) + '/' +
                encodeURIComponent(opts.lineId) + '.mp3';

      function fallback() {
        if (_current !== entry || entry.settled) return;
        entry.audio = null;
        entry.utter = _tts(opts.text, opts.locale, opts.rate, function () {
          if (_current === entry) _settle();
        });
      }

      try {
        var a = new global.Audio(url);
        entry.audio = a;
        a.onended = function () { if (_current === entry) _settle(); };
        a.onerror = fallback;
        var p = a.play();
        if (p && p.catch) p.catch(fallback);   /* 404 | decode | autoplay-block */
      } catch (e) { fallback(); }
    });
  }

  /* Run fn after the current line ends (or immediately if nothing plays).
     This is how the celebration chime queues behind narration. */
  function afterSpeech(fn) {
    if (!isSpeaking()) { try { fn(); } catch (e) {} return; }
    _afterQueue.push(fn);
  }

  /* Module utterance door (ctx.audio.speak). Dropped while narration plays —
     interaction is disabled during narration by design, so drops are edge-only. */
  function moduleSpeak(opts) {
    if (_muted || isSpeaking()) return;
    try {
      if (global.LCSAudio && global.LCSAudio.speak) global.LCSAudio.speak(opts);
    } catch (e) {}
  }

  function setMuted(m) {
    _muted = !!m;
    if (_muted) stop();
  }

  global.SBAudio = {
    playLine: playLine,
    stop: stop,
    isSpeaking: isSpeaking,
    afterSpeech: afterSpeech,
    moduleSpeak: moduleSpeak,
    pop: pop,
    setMuted: setMuted,
    muted: function () { return _muted; }
  };
}(typeof window !== 'undefined' ? window : this));
