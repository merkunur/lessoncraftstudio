/* =====================================================================
   MARINA'S HEADLINE DESK — ACTIVITY  (marina-headline-desk-activity.js)
   ---------------------------------------------------------------------
   CCSS RI.2.2 — find the MAIN TOPIC of a text. Marina the otter writes
   headlines; the child reads/hears a short article, then taps the card that
   names what it is MOSTLY about — not one small detail it states, and not an
   off-topic fact. Validity DERIVED by main-topic-core.js (the card tagged
   `topic`; position shuffled; the detail foil quotes the article so a "most-
   like-the-text" tap reliably misses the broad topic). answerType:'state' →
   tap a card, shell Check grades; a wrong tap gives a DIFFUSE nudge. Per-pass
   reshuffle (§A.13.60). Text + SVG char stub (CA5 later). No timer/score/
   streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MainTopicCore;
  var LANG = 'en';
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function marinaSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy ? '<path d="M40 46 q3 -4 6 0 M54 46 q3 -4 6 0" stroke="#2A2A35" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="43" cy="47" r="2.6" fill="#2A2A35"/><circle cx="57" cy="47" r="2.6" fill="#2A2A35"/>';
    return '<svg class="mhd-otter-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Marina, der Otter' : LANG === 'fr' ? 'Marina la loutre' : LANG === 'es' ? 'Marina la nutria' : LANG === 'pt' ? 'Marina, a lontra' : LANG === 'it' ? 'Marina, la lontra' : 'Marina the otter') + '">' +
      '<circle cx="32" cy="30" r="7" fill="#A07A52"/><circle cx="68" cy="30" r="7" fill="#A07A52"/>' +   /* ears */
      '<ellipse cx="50" cy="54" rx="28" ry="26" fill="#B68C5E"/>' +
      '<ellipse cx="50" cy="60" rx="16" ry="14" fill="#E7D2B5"/>' +   /* muzzle */
      eyes +
      '<ellipse cx="50" cy="56" rx="5" ry="3.6" fill="#2A2A35"/>' +   /* nose */
      '<path d="M44 62 q6 5 12 0" stroke="#7A5A36" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.MarinaHeadlineDeskActivity = {
    id: 'marina-headline-desk-activity',

    strings: {
      title: { en: "Marina's Headline Desk", de: 'Marinas Schlagzeilen-Tisch', fr: 'Le bureau des titres de Marina', es: 'El escritorio de titulares de Marina', pt: 'A mesa de manchetes da Marina', it: 'Il banco dei titoli di Marina' },
      prompt: { en: 'What is this mostly about?', de: 'Worum geht es hauptsächlich?', fr: 'De quoi ça parle surtout ?', es: '¿De qué trata principalmente?', pt: 'Sobre o que é isto, na maior parte?', it: 'Di che cosa parla soprattutto?' },
      marinaIntro: { en: 'A new story! What is it mostly about?', de: 'Eine neue Geschichte! Worum geht es wohl?', fr: 'Une nouvelle histoire ! De quoi parle-t-elle surtout ?', es: '¡Una historia nueva! ¿De qué trata principalmente?', pt: 'Uma notícia nova! Do que será que ela fala?', it: 'Un nuovo testo! Di che cosa parla?' },
      readStory: { en: '📖 Read the story', de: '📖 Vorlesen', fr: '📖 Lire l’histoire', es: '📖 Lee la historia', pt: '📖 Ler o texto', it: '📖 Leggi il testo' },
      readAgain: { en: '📖 Read it again', de: '📖 Noch einmal vorlesen', fr: '📖 Relire l’histoire', es: '📖 Léela otra vez', pt: '📖 Ler de novo', it: '📖 Leggi di nuovo' },
      theAsk: { en: 'What is the main topic?', de: 'Worum geht es in dem ganzen Text – nicht nur in einem Satz?', fr: 'Quel est le sujet principal ?', es: '¿De qué trata TODO el texto, no sólo una oración?', pt: 'Qual é o assunto principal?', it: 'Di che cosa parla TUTTO il testo, non solo una frase?' },
      hintPick: { en: 'Tap what the story is mostly about!', de: 'Tippe an, worum es hauptsächlich geht!', fr: 'Touche ce dont l’histoire parle surtout !', es: '¡Toca de qué trata principalmente la historia!', pt: 'Toque no que o texto conta na maior parte!', it: 'Tocca di che cosa parla soprattutto il testo!' },
      hintWrong: { en: "That's just one small part — read it again.", de: 'Das ist nur ein kleiner Teil – lies oder hör noch einmal.', fr: 'Ça, ce n’est qu’un petit détail — relis l’histoire.', es: 'Eso es solo una parte pequeña. Léela otra vez.', pt: 'Isso é só um pedacinho — leia o texto de novo.', it: 'Questa è solo una piccola parte. Leggi di nuovo il testo.' },
      win: { en: 'Yes! That is the main topic. 📰', de: 'Ja! Das ist das Hauptthema. 📰', fr: 'Oui ! C’est le sujet principal. 📰', es: '¡Sí! Ese es el tema principal. 📰', pt: 'Isso! Esse é o assunto principal. 📰', it: 'Sì! Questo è il tema principale. 📰' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._opts = null; this._narrToken = 0; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._narrToken++; this._spoke = false;
      this._opts = shuffle(this.view.options.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'mhd-wrap'); var root = api.el('div', 'mhd-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'mhd-row');
      var ott = api.el('div', 'mhd-otter'); ott.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); ott.innerHTML = marinaSVG(this.sel ? 'happy' : 'idle'); row.appendChild(ott);
      var say = api.el('div', 'mhd-say'); say.textContent = api.t('marinaIntro'); row.appendChild(say);
      root.appendChild(row);

      var story = api.el('div', 'mhd-story'); this._storyEl = story;
      v.story.forEach(function (line, i) { var p = api.el('p', 'mhd-line'); p.setAttribute('data-i', i); p.textContent = line; story.appendChild(p); });
      root.appendChild(story);
      var read = api.el('button', 'mhd-read'); read.type = 'button'; read.textContent = api.t(this._read ? 'readAgain' : 'readStory');
      read.addEventListener('click', function () { self._playStory(); });
      root.appendChild(read);

      var ask = api.el('div', 'mhd-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'mhd-opts');
      this._opts.forEach(function (o) {
        var b = api.el('button', 'mhd-opt' + (self.sel === o.id ? ' mhd-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id);
        b.textContent = o.text; b.setAttribute('aria-label', o.text);
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { self._playStory(); }, 320); }
    },

    _playStory: function () {
      var self = this; this._read = true; var token = ++this._narrToken;
      var lines = this._storyEl ? this._storyEl.querySelectorAll('.mhd-line') : [];
      var rb = this._rootEl && this._rootEl.querySelector('.mhd-read'); if (rb) rb.textContent = this.api.t('readAgain');
      function step(i) {
        if (token !== self._narrToken) { for (var k = 0; k < lines.length; k++) lines[k].classList.remove('mhd-on'); return; }
        for (var m = 0; m < lines.length; m++) lines[m].classList.toggle('mhd-on', m === i);
        if (i >= self.view.story.length) { for (var n = 0; n < lines.length; n++) lines[n].classList.remove('mhd-on'); return; }
        speak(self.view.story[i]);
        setTimeout(function () { step(i + 1); }, 1700);
      }
      step(0);
    },

    _tap: function (id, text) {
      this._narrToken++;
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(text); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      this._read = false;
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/marina-headline-desk-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[marina-headline-desk] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.mhd-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,580px);margin:0 auto;}'
        + '.mhd-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(3px,1vw,6px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(6px,1.5vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.mhd-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.mhd-otter{width:clamp(40px,8vw,48px);flex:0 0 auto;}.mhd-otter-svg{width:100%;height:auto;display:block;}'
        + '.mhd-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.mhd-story{background:#FFFDF6;border-radius:12px;padding:clamp(5px,1.4vw,8px) clamp(7px,1.8vw,10px);box-shadow:inset 0 0 0 2px rgba(160,120,60,.14);display:flex;flex-direction:column;gap:2px;}'
        + '.mhd-line{margin:0;font:600 clamp(11.5px,2.8vw,13px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';border-radius:6px;padding:1px 4px;transition:background .15s;}'
        + '.mhd-line.mhd-on{background:#FBEFD3;box-shadow:0 0 0 2px ' + C.GOLD + ';}'
        + '.mhd-read{align-self:center;min-height:36px;padding:0 16px;border-radius:12px;border:0;background:#EAF2EE;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.mhd-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.mhd-opts{display:flex;flex-direction:column;gap:clamp(4px,1vw,5px);}'
        + '.mhd-opt{text-align:left;min-height:44px;padding:6px 11px;border-radius:13px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.INK + ';font:700 clamp(12px,3vw,13.5px)/1.2 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.mhd-opt.mhd-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;}'
        + '.mhd-opt:active{transform:translateY(1px);}'
        + '.mhd-read:focus-visible,.mhd-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.mhd-root{gap:clamp(2px,0.7vw,4px);padding:clamp(6px,1.2vw,9px);}.mhd-otter{width:clamp(36px,6.5vw,44px);}.mhd-line{line-height:1.16;}.mhd-opt{padding:6px 11px;}}'
        + '@media (max-height:700px){.mhd-root{gap:3px;}.mhd-otter{width:clamp(34px,6vw,42px);}.mhd-story{padding:5px 9px;gap:1px;}.mhd-line{font-size:12px;line-height:1.18;}.mhd-read{min-height:34px;}.mhd-opt{min-height:44px;padding:6px 11px;font-size:12.5px;}}'
        + '@media (max-height:640px){.mhd-root{gap:1px;padding:5px;}.mhd-row{display:none;}.mhd-read{display:none;}.mhd-story{padding:3px 7px;}.mhd-line{font-size:10.5px;line-height:1.08;}.mhd-opt{min-height:44px;padding:4px 8px;font-size:11px;line-height:1.1;}}'
        + '@media (max-width:380px){.mhd-root{gap:3px;padding:7px;}.mhd-line{font-size:12px;}.mhd-opt{font-size:12.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.mhd-line{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-marina-headline-desk', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'marina-headline-desk.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel ? 'hintWrong' : 'hintPick'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
