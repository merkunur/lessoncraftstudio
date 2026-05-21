/* =====================================================================
   LessonCraft Studio — SHARED SHELL RUNTIME  (lcs-shell.js)
   ---------------------------------------------------------------------
   One shell, many tools. A "tool" is a plain object (see ten-frame.js).
   The shell owns everything that must be IDENTICAL across all 150 tools:
   the frame, control placement, the settings drawer, language + RTL,
   fullscreen, embed mode, the sound hook, and analytics.
   A tool owns ONLY its stage: what it draws and how it behaves.

   To build a new tool, copy ten-frame.js — you write render()/reset()
   and a strings + settings schema. You never touch this file.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- Languages -------------------------------------------------- */
  /* The 11 supported locales — MUST match the platform's canonical codes
     (CLAUDE.md §6): Portuguese is a single 'pt' (Brazilian Portuguese is
     canonical; no pt-BR/pt-PT split). All Latin-script (no RTL/CJK). These
     codes are the CONTRACT for deep links like ?lang=pt and the site's
     language switcher — keep them aligned with the rest of the catalog.    */
  var LOCALES = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
  /* RTL machinery kept but dormant (no current RTL language). Harmless if
     you ever add e.g. Arabic later: add the code here and to LOCALES.      */
  var RTL = {};

  /* ---- Shell chrome strings (every tool reuses these) -------------
     CURATION FLAG: these are reliable for short UI terms, but a quick
     native pass before launch is cheap insurance — esp. Finnish.          */
  var CHROME = {
    reset:      {en:'Reset',de:'Zurücksetzen',fr:'Réinitialiser',it:'Reimposta',es:'Reiniciar',pt:'Reiniciar',nl:'Opnieuw',sv:'Återställ',da:'Nulstil',no:'Tilbakestill',fi:'Nollaa'},
    settings:   {en:'Settings',de:'Einstellungen',fr:'Réglages',it:'Impostazioni',es:'Ajustes',pt:'Configurações',nl:'Instellingen',sv:'Inställningar',da:'Indstillinger',no:'Innstillinger',fi:'Asetukset'},
    fullscreen: {en:'Fullscreen',de:'Vollbild',fr:'Plein écran',it:'Schermo intero',es:'Pantalla completa',pt:'Tela cheia',nl:'Volledig scherm',sv:'Helskärm',da:'Fuld skærm',no:'Fullskjerm',fi:'Koko näyttö'},
    sound:      {en:'Sound',de:'Ton',fr:'Son',it:'Suono',es:'Sonido',pt:'Som',nl:'Geluid',sv:'Ljud',da:'Lyd',no:'Lyd',fi:'Ääni'},
    close:      {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    /* Activity chrome — rendered only when a tool declares `tasks`/`nextTask`. */
    check:      {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Verifica',es:'Comprobar',pt:'Verificar',nl:'Controleer',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    next:       {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próximo',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    celebrate:  {en:'Great!',de:'Super!',fr:'Bravo !',it:'Bravo!',es:'¡Genial!',pt:'Ótimo!',nl:'Goed gedaan!',sv:'Bra jobbat!',da:'Flot klaret!',no:'Bra jobbet!',fi:'Hienoa!'},
    tryAgain:   {en:'Not yet — try again!',de:'Noch nicht — versuche es nochmal!',fr:'Pas encore — essaie encore !',it:'Non ancora — riprova!',es:'Aún no — ¡intenta otra vez!',pt:'Ainda não — tente de novo!',nl:'Nog niet — probeer nog eens!',sv:'Inte än — försök igen!',da:'Ikke endnu — prøv igen!',no:'Ikke ennå — prøv igjen!',fi:'Ei vielä — yritä uudelleen!'},
    tasksDone:  {en:'Tasks done: {n}',de:'Aufgaben erledigt: {n}',fr:'Tâches faites : {n}',it:'Compiti fatti: {n}',es:'Tareas hechas: {n}',pt:'Tarefas feitas: {n}',nl:'Taken gedaan: {n}',sv:'Klara uppgifter: {n}',da:'Færdige opgaver: {n}',no:'Ferdige oppgaver: {n}',fi:'Tehtyjä tehtäviä: {n}'},
    /* Direction A: progress pill label (uppercase letter-spaced, separate from the count). */
    tasksDoneLabel: {en:'TASKS DONE',de:'AUFGABEN',fr:'FAITES',it:'FATTI',es:'COMPLETADAS',pt:'CONCLUÍDAS',nl:'KLAAR',sv:'KLARA',da:'FÆRDIGE',no:'FERDIGE',fi:'VALMIIT'},
    readAloud:  {en:'Read aloud',de:'Vorlesen',fr:'Lire à voix haute',it:'Leggi ad alta voce',es:'Leer en voz alta',pt:'Ler em voz alta',nl:'Voorlezen',sv:'Läs högt',da:'Læs højt',no:'Les høyt',fi:'Lue ääneen'}
  };

  /* Simple {key} interpolation for prompt + progress strings. */
  function interpolate(template, args) {
    if (!template) return '';
    args = args || {};
    return String(template).replace(/\{(\w+)\}/g, function (m, k) {
      return (k in args) ? String(args[k]) : m;
    });
  }

  /* ---- i18n engine ------------------------------------------------- */
  var i18n = {
    current: 'en',
    isRTL: function () { return !!RTL[this.current]; },
    /* t(dict, key): look up key in a strings dict, fall back to English,
       then to the raw key. Works for both CHROME and per-tool strings.   */
    t: function (dict, key) {
      var entry = dict && dict[key];
      if (!entry) return key;
      return entry[this.current] || entry.en || key;
    },
    chrome: function (key) { return this.t(CHROME, key); }
  };

  /* ---- Analytics hook ---------------------------------------------
     Central, fire-and-forget. Wire window.LCS_TRACK to your real
     analytics (Plausible/GA/etc.) and every tool reports consistently.  */
  function track(event, data) {
    var payload = Object.assign({ ts: Date.now(), lang: i18n.current }, data || {});
    if (typeof global.LCS_TRACK === 'function') {
      try { global.LCS_TRACK(event, payload); } catch (e) {}
    }
    if (global.console && console.debug) console.debug('[lcs]', event, payload);
  }

  /* ---- Sound hook -------------------------------------------------
     A tiny code-generated click so the Sound control does something real
     with zero audio assets. Swap/extend for narration + SFX later.       */
  var Audio = (function () {
    var ctx = null, on = true;
    function ensure() {
      if (!ctx && (global.AudioContext || global.webkitAudioContext)) {
        ctx = new (global.AudioContext || global.webkitAudioContext)();
      }
      return ctx;
    }
    return {
      toggle: function () { on = !on; return on; },
      isOn: function () { return on; },
      setEnabled: function (v) { on = !!v; },
      /* play a soft pop; freq lets tools differentiate add vs remove */
      pop: function (freq) {
        if (!on) return; var c = ensure(); if (!c) return;
        if (c.state === 'suspended') c.resume();
        var o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.value = freq || 660;
        g.gain.setValueAtTime(0.0001, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.18, c.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.16);
        o.connect(g); g.connect(c.destination);
        o.start(); o.stop(c.currentTime + 0.17);
      }
    };
  }());

  /* ---- Inline icon set (code-drawn, no asset files) ----------------
     One icon set, defined once, reused by every tool's chrome. Feather-
     style 24x24 strokes. Replace with your own glyph set later if wanted.*/
  var ICON = {
    reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v4h4"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    soundOn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>',
    soundOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    speaker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 7a8 8 0 0 1 0 10"/></svg>'
  };

  /* =====================================================================
     COUNTER-TOKEN REGISTRY  ***  THE ASSET SWAP POINT  ***
     ---------------------------------------------------------------------
     Right now every "thing you count" (ten-frame counter, counting-mat
     object, array dot, fraction-of-a-set item...) is CODE-DRAWN here.
     Tools call LCS.token(shape, color, size) and never care how it's made.
     When the character/asset art is ready, replace a token's function with
     one that returns <img src="...">. NO TOOL LOGIC CHANGES. This single
     indirection is what lets the whole toolkit ship code-only now and gain
     the asset moat later.
     ===================================================================== */
  var TOKENS = {
    dot: function (color, size) {
      return '<svg viewBox="0 0 100 100" width="'+size+'" height="'+size+'" aria-hidden="true">'+
        '<circle cx="50" cy="50" r="40" fill="'+color+'"/>'+
        '<circle cx="38" cy="36" r="11" fill="#fff" opacity="0.35"/></svg>';
    },
    heart: function (color, size) {
      return '<svg viewBox="0 0 100 100" width="'+size+'" height="'+size+'" aria-hidden="true">'+
        '<path d="M50 84C20 62 12 44 12 32a20 20 0 0 1 38-8 20 20 0 0 1 38 8c0 12-8 30-38 52z" fill="'+color+'"/>'+
        '<circle cx="34" cy="30" r="7" fill="#fff" opacity="0.35"/></svg>';
    },
    star: function (color, size) {
      return '<svg viewBox="0 0 100 100" width="'+size+'" height="'+size+'" aria-hidden="true">'+
        '<path d="M50 8 61 38 93 38 67 58 77 90 50 70 23 90 33 58 7 38 39 38z" fill="'+color+'"/></svg>';
    }
  };
  function token(shape, color, size) {
    var fn = TOKENS[shape] || TOKENS.dot;
    return fn(color, size || 64);
  }

  /* =====================================================================
     LINEAR DRAG HELPER  ***  shared across slider-class tools  ***
     ---------------------------------------------------------------------
     Pointer-capture + pointermove + snap + clamp, factored out of
     number-line.js once a 2nd drag-tool (the ruler) confirmed the shape.
     Tools call LCS.drag.linear(el, { ... }) and never touch pointer events
     directly. The helper:

       - listens for pointerdown on `el` (primary button only)
       - captures the pointer so the gesture survives leaving `el`
       - on every change of the snapped value, fires onChange(value, phase)
         with phase in {'start', 'move', 'end'}
       - applies touch-action:none on `el` so dragging never scrolls

     Signature (per build brief §1):
       LCS.drag.linear(el, {
         valueFromPointer: function(clientX, rect) -> real-valued v,
         onChange:         function(value, phase)   -> void,
         min:   number,         // for clamping
         max:   number,         // for clamping
         step:  number = 1      // round to nearest step from min
       });
     ===================================================================== */
  function dragLinear(el, opts) {
    if (!el || !opts || typeof opts.valueFromPointer !== 'function') return;
    var onChange = opts.onChange || function () {};
    var min  = (typeof opts.min  === 'number') ? opts.min  : -Infinity;
    var max  = (typeof opts.max  === 'number') ? opts.max  :  Infinity;
    var step = (typeof opts.step === 'number' && opts.step > 0) ? opts.step : 1;
    var inv  = isFinite(step) ? Math.round(1 / step) : 1;   // FP-clean rounding

    /* Defensive: ensure touch dragging never scrolls the page. Tools may
       also set this in CSS; setting it here keeps the contract self-contained. */
    el.style.touchAction = 'none';

    var dragging = false, lastValue = null;

    function snap(raw) {
      var v = Math.round((raw - min) / step) * step + min;
      if (v < min) v = min; else if (v > max) v = max;
      /* Trim float drift: 0.1+0.1+0.1 → 0.30000000000000004 */
      if (inv > 1) v = Math.round(v * inv) / inv;
      return v;
    }
    function fire(raw, phase) {
      var v = snap(raw);
      if (phase === 'move' && v === lastValue) return;   // de-dupe
      lastValue = v;
      onChange(v, phase);
    }

    el.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;   // primary only
      dragging = true;
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
      fire(opts.valueFromPointer(e.clientX, el.getBoundingClientRect()), 'start');
    });
    el.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      fire(opts.valueFromPointer(e.clientX, el.getBoundingClientRect()), 'move');
    });
    function end(e) {
      if (!dragging) return;
      dragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
      if (lastValue !== null) onChange(lastValue, 'end');
      lastValue = null;
    }
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  /* =====================================================================
     MOUNT — boot a tool into the page
     ===================================================================== */
  function mount(tool, opts) {
    opts = opts || {};
    var params = new URLSearchParams(global.location ? global.location.search : '');

    /* language: ?lang=xx  > opts.lang > <html lang> > 'en' */
    var lang = params.get('lang') || opts.lang ||
               (document.documentElement.getAttribute('lang')) || 'en';
    i18n.current = LOCALES.indexOf(lang) >= 0 ? lang : 'en';

    /* embed: ?embed=1 (chrome trimmed) | ?embed=compact (also drops title,
       for tightly-cropped iframes) | auto-detected when inside an iframe.   */
    var embedParam = params.get('embed');
    var embed = !!embedParam || opts.embed || (global.self !== global.top);
    var compact = embedParam === 'compact' || opts.embedCompact;

    /* ?sound=off (or opts.sound===false) starts the tool muted — lets an
       embed host serve a silent version without code changes.              */
    if (params.get('sound') === 'off' || opts.sound === false) Audio.setEnabled(false);

    /* ---- build the frame ---- */
    var root = document.querySelector(opts.mount || '#lcs-root') || document.body;
    document.documentElement.lang = i18n.current;
    document.documentElement.dir = i18n.isRTL() ? 'rtl' : 'ltr';

    var app = el('div', 'lcs-app' + (embed ? ' embed' : '') + (compact ? ' compact' : ''));
    var header = el('div', 'lcs-header');
    var titles = el('div', 'lcs-titles');
    var h1 = el('h1', 'lcs-title'); h1.textContent = i18n.t(tool.strings, 'title');
    var instr = el('p', 'lcs-instruction'); instr.textContent = i18n.t(tool.strings, 'instruction');
    titles.append(h1, instr);

    var controls = el('div', 'lcs-controls');
    var stage = el('div', 'lcs-stage');

    header.append(titles, controls);
    app.append(header, stage);

    /* settings drawer (only if the tool declares settings) */
    var drawer, scrim, settingsBtn;
    var settings = Object.assign({}, tool.defaults || {});

    /* polite live region for screen-reader announcements (count changes etc.) */
    var live = el('div', 'lcs-sr-only');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    app.appendChild(live);

    /* ---- public api handed to the tool (frozen: tools can't mutate the
       contract or add globals; api.settings stays mutable for the drawer) -- */
    var api = Object.freeze({
      stage: stage,
      settings: settings,
      lang: i18n.current,
      embed: embed,
      compact: compact,
      t: function (key) { return i18n.t(tool.strings, key); },
      token: token,
      track: function (ev, data) { track(tool.id + ':' + ev, data); },
      sound: Audio.pop,
      announce: function (msg) {
        /* clear then set so assistive tech re-announces even when two
           consecutive messages are identical (some AT suppress dupes). */
        msg = String(msg);
        live.textContent = '';
        if (global.requestAnimationFrame) global.requestAnimationFrame(function () { live.textContent = msg; });
        else setTimeout(function () { live.textContent = msg; }, 30);
      },
      el: el
    });

    /* ---- control buttons (placement identical for every tool) ---- */
    function makeCtrl(iconKey, labelKey, onClick, pressed) {
      var b = el('button', 'lcs-ctrl');
      b.type = 'button';
      b.innerHTML = ICON[iconKey];
      b.setAttribute('aria-label', i18n.chrome(labelKey));
      b.title = i18n.chrome(labelKey);
      if (pressed !== undefined) b.setAttribute('aria-pressed', String(pressed));
      b.addEventListener('click', onClick);
      controls.appendChild(b);
      return b;
    }

    /* Order is fixed: [settings] [sound] [fullscreen] [reset] */
    if (tool.settings && tool.settings.length) {
      settingsBtn = makeCtrl('settings', 'settings', openDrawer);
    }
    var soundBtn = makeCtrl(Audio.isOn() ? 'soundOn' : 'soundOff', 'sound', function () {
      var on = Audio.toggle();
      soundBtn.innerHTML = ICON[on ? 'soundOn' : 'soundOff'];
      soundBtn.setAttribute('aria-pressed', String(on));
      if (on) Audio.pop(660);
    }, Audio.isOn());
    makeCtrl('expand', 'fullscreen', function () {
      if (!document.fullscreenElement) (app.requestFullscreen ? app.requestFullscreen() : 0);
      else document.exitFullscreen();
    });
    makeCtrl('reset', 'reset', function () {
      if (tool.reset) tool.reset();
      api.track('reset');
    });

    /* ---- settings drawer, rendered from the tool's schema ---- */
    function buildDrawer() {
      scrim = el('div', 'lcs-drawer-scrim');
      drawer = el('div', 'lcs-drawer');
      var head = el('div', 'lcs-drawer-head');
      var h2 = el('h2'); h2.textContent = i18n.chrome('settings');
      var x = el('button', 'lcs-ctrl'); x.type = 'button';
      x.innerHTML = ICON.close; x.setAttribute('aria-label', i18n.chrome('close'));
      x.addEventListener('click', closeDrawer);
      head.append(h2, x);
      var body = el('div', 'lcs-drawer-body');

      tool.settings.forEach(function (field) {
        body.appendChild(renderField(field));
      });
      drawer.append(head, body);
      scrim.addEventListener('click', closeDrawer);
      app.append(scrim, drawer);
    }

    function renderField(field) {
      var wrap = el('div', 'lcs-field');
      var label = el('label'); label.textContent = api.t(field.labelKey);
      wrap.appendChild(label);

      if (field.type === 'choice' || field.type === 'color') {
        var seg = el('div', 'lcs-segment');
        seg.setAttribute('role', 'radiogroup');
        seg.setAttribute('aria-label', api.t(field.labelKey));
        field.options.forEach(function (opt) {
          var chip = el('button', 'lcs-chip'); chip.type = 'button';
          chip.setAttribute('role', 'radio');
          var val = (typeof opt === 'object') ? opt.value : opt;
          if (field.type === 'color') {
            var sw = el('span', 'lcs-swatch'); sw.style.background = val; chip.appendChild(sw);
          } else {
            chip.textContent = opt.labelKey ? api.t(opt.labelKey) : String(val);
          }
          chip.setAttribute('aria-checked', String(settings[field.key] === val));
          chip.addEventListener('click', function () {
            settings[field.key] = val;
            seg.querySelectorAll('.lcs-chip').forEach(function (c) { c.setAttribute('aria-checked', 'false'); });
            chip.setAttribute('aria-checked', 'true');
            commitSettings(field.key, val);
          });
          seg.appendChild(chip);
        });
        wrap.appendChild(seg);
      } else if (field.type === 'toggle') {
        var sw2 = el('button', 'lcs-switch'); sw2.type = 'button';
        sw2.setAttribute('role', 'switch');
        sw2.setAttribute('aria-checked', String(!!settings[field.key]));
        sw2.innerHTML = '<span class="knob"></span>';
        sw2.addEventListener('click', function () {
          settings[field.key] = !settings[field.key];
          sw2.setAttribute('aria-checked', String(settings[field.key]));
          commitSettings(field.key, settings[field.key]);
        });
        wrap.appendChild(sw2);
      }
      return wrap;
    }

    function commitSettings(key, val) {
      api.track('setting', { key: key, value: val });
      if (tool.onSettings) tool.onSettings(key, val);
      if (tool.render) tool.render();
    }
    function openDrawer()  { if (!drawer) buildDrawer(); scrim.classList.add('open'); drawer.classList.add('open'); }
    function closeDrawer() { if (drawer) { scrim.classList.remove('open'); drawer.classList.remove('open'); } }

    /* =====================================================================
       ACTIVITY CHROME — rendered only when the tool declares `tasks`.
       ---------------------------------------------------------------------
       Manipulative tools (ten-frame.js, number-line.js, ruler.js as of
       this writing) don't declare `tasks`, so this block is a complete
       no-op for them — no DOM additions, no listeners, no behaviour drift.

       Owned by the shell so all 150 activity tools get identical task
       chrome (prompt / answer surface / Check / feedback / Next / progress).
       K-3 tone is hard-coded: celebrate copy + "Not yet — try again",
       880 Hz on success / 440 Hz on retry, screen-reader announce,
       prefers-reduced-motion respect on the confetti.
       ===================================================================== */
    var promptEl, progressEl, feedbackEl, answerEl, checkBtnEl, nextBtnEl;
    var currentTaskIndex = 0, tasksCompleted = 0, currentTask = null;

    function ensureActivityChrome() {
      if (!tool.tasks && !tool.nextTask) return false;
      app.classList.add('activity');

      /* prompt banner — between header and stage. Wraps a text span + a
         speaker button so the kid (pre-reader) can hear the prompt via
         browser TTS. No audio assets — Web Speech Synthesis API across
         all 11 locales. */
      promptEl = el('div', 'lcs-activity-prompt');
      var promptRow = el('div', 'lcs-activity-prompt-row');
      var promptText = el('span', 'lcs-activity-prompt-text');
      var speakBtn = el('button', 'lcs-activity-speak');
      speakBtn.type = 'button';
      speakBtn.innerHTML = ICON.speaker;
      speakBtn.setAttribute('aria-label', i18n.chrome('readAloud'));
      speakBtn.title = i18n.chrome('readAloud');
      speakBtn.addEventListener('click', function () {
        if (!global.speechSynthesis) return;
        var t = promptText.textContent;
        if (!t) return;
        try {
          global.speechSynthesis.cancel();
          var u = new global.SpeechSynthesisUtterance(t);
          u.lang = i18n.current === 'pt' ? 'pt-BR' : i18n.current;
          u.rate = 0.9;
          global.speechSynthesis.speak(u);
        } catch (_) {}
      });
      promptRow.append(promptText, speakBtn);
      var promptHint = el('div', 'lcs-activity-prompt-hint');
      promptEl.append(promptRow, promptHint);
      app.insertBefore(promptEl, stage);

      /* Progress indicator — Direction A puts this at the top-left of the
         CARD (not the page header) as a pill with TASKS DONE label + count.
         Rendered as a div directly inside .lcs-app, before the prompt. */
      progressEl = el('div', 'lcs-activity-progress');
      var progLabel = el('span', 'lcs-activity-progress-label');
      progLabel.textContent = i18n.chrome('tasksDoneLabel') || 'TASKS DONE';
      var progPill = el('span', 'lcs-activity-progress-pill');
      progPill.textContent = '0';
      progressEl.append(progLabel, progPill);
      app.insertBefore(progressEl, promptEl);

      /* feedback overlay — sibling of stage inside .lcs-app so the tool's
         render() (which clears `stage.innerHTML`) doesn't wipe it. */
      feedbackEl = el('div', 'lcs-activity-feedback');
      feedbackEl.setAttribute('role', 'status');
      app.insertBefore(feedbackEl, stage.nextSibling);

      /* answer surface + action row — below the stage */
      answerEl = el('div', 'lcs-activity-answer');
      var actions = el('div', 'lcs-activity-actions');
      checkBtnEl = el('button', 'lcs-activity-check');
      checkBtnEl.type = 'button';
      checkBtnEl.textContent = i18n.chrome('check');
      checkBtnEl.addEventListener('click', onCheckClick);
      nextBtnEl = el('button', 'lcs-activity-next');
      nextBtnEl.type = 'button';
      nextBtnEl.textContent = i18n.chrome('next');
      nextBtnEl.hidden = true;
      nextBtnEl.addEventListener('click', onNextClick);
      actions.append(checkBtnEl, nextBtnEl);
      app.appendChild(answerEl);
      app.appendChild(actions);
      return true;
    }

    /* Resolve the i-th task. Supports either tool.tasks[] or tool.nextTask(). */
    function getTask(i) {
      if (tool.tasks && tool.tasks.length) return tool.tasks[i % tool.tasks.length];
      if (typeof tool.nextTask === 'function') return tool.nextTask({ index: i, completed: tasksCompleted });
      return null;
    }

    function loadTask(task) {
      currentTask = task;
      if (!task) return;
      var promptStr = interpolate(api.t(task.promptKey), task.promptArgs || {});
      /* promptEl wraps a row (text + speaker) + hint line. Only the text
         + state classes change between tasks. */
      var textSpan = promptEl.querySelector('.lcs-activity-prompt-text');
      var hintSpan = promptEl.querySelector('.lcs-activity-prompt-hint');
      if (textSpan) textSpan.textContent = promptStr;
      else promptEl.textContent = promptStr;
      if (hintSpan) hintSpan.textContent = '';
      promptEl.classList.remove('celebrate', 'tryagain');
      api.announce(promptStr);
      if (task.setup) task.setup(tool);
      if (tool.render) tool.render();
      renderAnswerSurface(task);
      /* Legacy feedback element — wipe even though Direction A hides it. */
      if (feedbackEl) {
        feedbackEl.classList.remove('open', 'celebrate', 'tryagain');
        feedbackEl.textContent = '';
      }
      nextBtnEl.hidden = true;
      checkBtnEl.hidden = false;
      checkBtnEl.disabled = (task.answerType === 'number' || task.answerType === 'choice');
      /* Broadcast new content height (fixes parent iframe sizing for
         short activities like choice-board on cards sized for ten-frame). */
      if (typeof postActivityResize === 'function') postActivityResize();
    }

    /* The pending answer for 'number' / 'choice' tasks. */
    var pendingAnswer = null;

    function renderAnswerSurface(task) {
      answerEl.innerHTML = '';
      pendingAnswer = null;
      if (task.answerType === 'number') {
        var display = el('div', 'lcs-activity-answer-display');
        display.textContent = '';
        var pad = el('div', 'lcs-activity-keypad');
        var min = (typeof task.answerMin === 'number') ? task.answerMin : 0;
        var max = (typeof task.answerMax === 'number') ? task.answerMax :  Infinity;
        function setPending(v) {
          if (v == null || v === '') { pendingAnswer = null; display.textContent = ''; }
          else { pendingAnswer = v; display.textContent = String(v); }
          checkBtnEl.disabled = (pendingAnswer == null);
        }
        var current = '';
        for (var d = 0; d <= 9; d++) {
          (function (digit) {
            var k = el('button', 'lcs-activity-key');
            k.type = 'button';
            k.textContent = String(digit);
            k.addEventListener('click', function () {
              var nextStr = (current + digit).replace(/^0+(?=\d)/, '');   // strip leading zeros
              var num = parseInt(nextStr, 10);
              if (isFinite(max) && num > max) return;
              current = nextStr;
              setPending(num);
            });
            pad.appendChild(k);
          }(d));
        }
        var clear = el('button', 'lcs-activity-key lcs-activity-key-clear');
        clear.type = 'button';
        clear.textContent = '⌫';
        clear.setAttribute('aria-label', 'Clear');
        clear.addEventListener('click', function () { current = ''; setPending(null); });
        pad.appendChild(clear);
        answerEl.append(display, pad);
      } else if (task.answerType === 'choice') {
        var seg = el('div', 'lcs-activity-choices');
        seg.setAttribute('role', 'radiogroup');
        (task.choices || []).forEach(function (opt) {
          var chip = el('button', 'lcs-chip');
          chip.type = 'button';
          chip.setAttribute('role', 'radio');
          chip.setAttribute('aria-checked', 'false');
          chip.textContent = opt.labelKey ? api.t(opt.labelKey) : String(opt.value);
          chip.addEventListener('click', function () {
            seg.querySelectorAll('.lcs-chip').forEach(function (c) { c.setAttribute('aria-checked', 'false'); });
            chip.setAttribute('aria-checked', 'true');
            pendingAnswer = opt.value;
            checkBtnEl.disabled = false;
          });
          seg.appendChild(chip);
        });
        answerEl.appendChild(seg);
      }
      /* 'state' / null → answerEl stays empty; tool's own stage is the surface */
    }

    function readAnswer(task) {
      if (task.answerType === 'number' || task.answerType === 'choice') return pendingAnswer;
      return undefined;
    }

    function onCheckClick() {
      if (!currentTask) return;
      var answer = readAnswer(currentTask);
      var ok = false;
      try { ok = !!currentTask.check(tool, answer); } catch (e) { ok = false; }
      /* Direction A — prompt-as-feedback (no floating badge).
         Mutate the prompt text + apply .celebrate / .tryagain to it. */
      var textSpan = promptEl.querySelector('.lcs-activity-prompt-text');
      var hintSpan = promptEl.querySelector('.lcs-activity-prompt-hint');
      promptEl.classList.remove('celebrate', 'tryagain');
      if (ok) {
        Audio.pop(880);
        promptEl.classList.add('celebrate');
        if (textSpan) textSpan.textContent = i18n.chrome('celebrate');
        if (hintSpan) hintSpan.textContent = '';
        api.announce(i18n.chrome('celebrate'));
        tasksCompleted += 1;
        var progPill = progressEl && progressEl.querySelector('.lcs-activity-progress-pill');
        if (progPill) progPill.textContent = String(tasksCompleted);
        nextBtnEl.hidden = false;
        checkBtnEl.hidden = true;
        spawnConfetti();
        api.track('task:check', { id: currentTask.id, ok: true });
        if (typeof postActivityResize === 'function') postActivityResize();
      } else {
        Audio.pop(440);
        promptEl.classList.add('tryagain');
        var hintKey = currentTask.hintKey && currentTask.hintKey(tool, answer);
        var hintMsg = hintKey ? api.t(hintKey) : i18n.chrome('tryAgain');
        if (hintSpan) hintSpan.textContent = hintMsg;
        api.announce(i18n.chrome('tryAgain') + ' — ' + hintMsg);
        api.track('task:check', { id: currentTask.id, ok: false });
        /* After the shake settles, clear the tryagain prompt-state so the
           kid sees the original prompt again (matches the previous
           auto-dismiss UX). */
        setTimeout(function () {
          if (promptEl.classList.contains('tryagain')) {
            promptEl.classList.remove('tryagain');
            if (hintSpan) hintSpan.textContent = '';
            /* Restore the original prompt text. */
            var promptStr = interpolate(api.t(currentTask.promptKey), currentTask.promptArgs || {});
            if (textSpan) textSpan.textContent = promptStr;
          }
        }, 1800);
      }
    }

    function onNextClick() {
      currentTaskIndex += 1;
      loadTask(getTask(currentTaskIndex));
    }

    /* Confetti — code-drawn sparkles, respects prefers-reduced-motion. */
    function spawnConfetti() {
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var container = el('div', 'lcs-confetti');
      for (var i = 0; i < 6; i++) {
        var s = el('span', 'lcs-confetti-piece');
        s.style.left  = (10 + i * 14 + Math.random() * 8) + '%';
        s.style.animationDelay = (i * 40) + 'ms';
        s.style.color = (i % 2 === 0) ? 'var(--lcs-accent)' : 'var(--lcs-good)';
        s.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="currentColor"/></svg>';
        container.appendChild(s);
      }
      stage.appendChild(container);
      setTimeout(function () { if (container.parentNode) container.parentNode.removeChild(container); }, 900);
    }

    /* Expose a hook so tools that load `tool.tasks` asynchronously (e.g., the
       activity variant fetches a CC-pinned manifest) can re-trigger the
       first-task render once tasks are populated. Activity-mode only. */
    global.LCS_reloadFirstTask = function () {
      if (!tool.tasks && !tool.nextTask) return;
      currentTaskIndex = 0;
      tasksCompleted = 0;
      if (progressEl) {
        var pill = progressEl.querySelector('.lcs-activity-progress-pill');
        if (pill) pill.textContent = '0';
        else progressEl.textContent = interpolate(i18n.chrome('tasksDone'), { n: 0 });
      }
      loadTask(getTask(0));
    };

    /* Iframe auto-resize: broadcast the rendered content height to the
       parent page (the Next.js activity-detail wrapper listens + adjusts
       the iframe height). Fixes the "tall card / short content" gap that
       appears when a short activity (e.g., choice-board) shares chrome
       with a tall one (ten-frame). Activity-mode only. */
    var _lastReportedHeight = 0;
    var _resizeRaf = null;
    function postActivityResize() {
      if (!tool.tasks && !tool.nextTask) return;
      if (_resizeRaf) cancelAnimationFrame(_resizeRaf);
      _resizeRaf = requestAnimationFrame(function () {
        _resizeRaf = null;
        var h = app.scrollHeight || document.body.scrollHeight;
        if (!h || Math.abs(h - _lastReportedHeight) < 4) return;
        _lastReportedHeight = h;
        try {
          window.parent.postMessage(
            { type: 'lcs-activity-resize', height: h },
            '*'
          );
        } catch (e) { /* cross-origin block — fail silent */ }
      });
    }
    /* Hook into post-render moments so the parent always knows the
       current content height. Activity-mode only (the manipulative
       tools have no `tasks` so postActivityResize is a no-op). */
    if (tool.tasks || tool.nextTask) {
      window.addEventListener('resize', postActivityResize);
      /* Initial broadcast after first paint. */
      requestAnimationFrame(postActivityResize);
    }

    /* ---- go live ---- */
    root.innerHTML = '';
    root.appendChild(app);
    if (tool.init) tool.init(api);
    if (tool.render) tool.render();
    if (ensureActivityChrome()) loadTask(getTask(0));
    api.track('load', { embed: embed });
  }

  /* tiny DOM helper */
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* ---- public surface --------------------------------------------- */
  global.LCS = {
    mount: mount,
    token: token,
    registerToken: function (name, fn) { TOKENS[name] = fn; }, // for the asset swap later
    drag: { linear: dragLinear },                              // shared slider/drag primitive
    i18n: i18n,
    track: track,
    LOCALES: LOCALES
  };

}(typeof window !== 'undefined' ? window : this));
