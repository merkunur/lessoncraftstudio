/* =====================================================================
   OTTO'S PICTURE BOOK — ACTIVITY  (otto-picture-book-activity.js)
   ---------------------------------------------------------------------
   CCSS RL.K.7 — describe the relationship between illustrations and the
   story (what MOMENT an illustration depicts). Otto the owl drew a picture
   for every part of a little story. The child HEARS the whole story
   (narrated spread), then Otto reads ONE part aloud + shows it as text —
   and the child taps the illustration that shows THAT moment. All choices
   are real pictures from the SAME story (the foils are the other moments),
   so comprehension is load-bearing, not "spot the odd picture."

   Validity DERIVED by mini tools/picture-moment-core.js (the target beat's
   panel; never a stored answer). The skin consumes ONLY childView/watchFilm.
   answerType:'state' → the child taps a picture (in-stage selection), then
   the shell Check grades it; a wrong tap gives a DIFFUSE nudge (re-read the
   part), never "which one." Per-pass order-only reshuffle (§A.13.60).
   Panels = emoji PLACEHOLDERS for later CA5 art. No timer/score/streak.
   0 lines to any existing core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PictureMomentCore;
  var LANG = 'en';   // content locale; set in init from api.lang (de fan-out §A.13.54)

  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  // panel emoji = STUB art (CA5 hand-illustrated dioramas replace these later)
  var EMOJI = {
    'boat-1': '🛶', 'boat-2': '🌊', 'boat-3': '💨', 'boat-4': '🏁',
    'nest-1': '🐦', 'nest-2': '🪹', 'nest-3': '🥚', 'nest-4': '🐣',
    'sand-1': '🪣', 'sand-2': '🏰', 'sand-3': '🐚', 'sand-4': '✨',
    'apple-1': '🌳', 'apple-2': '🧺', 'apple-3': '🍎', 'apple-4': '😋',
    'boots-1': '🌧️', 'boots-2': '🥾', 'boots-3': '💦', 'boots-4': '🌈',
    'bear-1': '❓', 'bear-2': '🛏️', 'bear-3': '🔦', 'bear-4': '🧸',
    'snow-1': '❄️', 'snow-2': '⛄', 'snow-3': '🧣', 'snow-4': '🎉',
    'fly-1': '🐛', 'fly-2': '😴', 'fly-3': '🦋', 'fly-4': '🌼'
  };
  var TINTS = ['#FDEEDD', '#E9F3EF', '#EEF0FB', '#FBF0F4', '#F0F5E8'];
  function tintFor(panel) { var h = 0; for (var i = 0; i < panel.length; i++) h = (h * 31 + panel.charCodeAt(i)) >>> 0; return TINTS[h % TINTS.length]; }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG === 'nl' ? 'nl-NL' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }

  function ottoSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy
      ? '<path d="M30 44 q6 -6 12 0 M58 44 q6 -6 12 0" stroke="#2A2A35" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : '<circle cx="36" cy="45" r="9" fill="#fff" stroke="#2A2A35" stroke-width="2"/><circle cx="64" cy="45" r="9" fill="#fff" stroke="#2A2A35" stroke-width="2"/><circle cx="36" cy="45" r="3.6" fill="#2A2A35"/><circle cx="64" cy="45" r="3.6" fill="#2A2A35"/>';
    return '<svg class="opb-owl-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Otto le hibou' : LANG === 'de' ? 'Otto, die Eule' : LANG === 'es' ? 'Otto, el búho' : LANG === 'pt' ? 'Otto, a coruja' : LANG === 'it' ? 'Otto, il gufo' : LANG === 'nl' ? 'Otto de uil' : 'Otto the owl') + '">' +
      '<path d="M22 22 L36 36 L18 38 Z" fill="#9D7BC8"/><path d="M78 22 L64 36 L82 38 Z" fill="#9D7BC8"/>' +   /* ear tufts */
      '<ellipse cx="50" cy="56" rx="32" ry="30" fill="#B79BE0"/>' +
      '<ellipse cx="50" cy="64" rx="20" ry="18" fill="#EBDFF8"/>' +   /* belly */
      eyes +
      '<path d="M46 52 L54 52 L50 60 Z" fill="#F2A03B"/>' +           /* beak */
      '</svg>';
  }

  global.OttoPictureBookActivity = {
    id: 'otto-picture-book-activity',

    strings: {
      title: { en: "Otto's Picture Book", de: 'Ottos Bilderbuch', fr: 'Le livre d’images d’Otto', es: 'El libro de imágenes de Otto', pt: 'O livro de desenhos do Otto', it: 'Il libro illustrato di Otto', nl: 'Het prentenboek van Otto' },
      prompt: { en: 'Which picture shows this part?', de: 'Welches Bild zeigt diesen Teil?', fr: 'Quelle image montre ce moment ?', es: '¿Qué imagen muestra este momento?', pt: 'Qual imagem mostra esta parte?', it: 'Quale immagine mostra questa parte?', nl: 'Welk plaatje hoort bij dit stukje?' },
      ottoIntro: { en: 'I drew this story! Which picture shows the part I read?', de: 'Ich habe diese Geschichte gemalt! Welches Bild zeigt den Teil, den ich vorlese?', fr: 'J’ai dessiné cette histoire ! Quelle image montre le moment que je lis ?', es: '¡Yo dibujé este cuento! ¿Qué imagen muestra lo que leo?', pt: 'Eu desenhei esta história! Qual imagem mostra a parte que eu li?', it: 'Ho disegnato io questa storia! Quale figura mostra la parte?', nl: 'Ik heb dit verhaal getekend! Welk plaatje hoort bij wat ik voorlees?' },
      hearStory: { en: '📖 Hear the story', de: '📖 Geschichte anhören', fr: '📖 Écouter l’histoire', es: '📖 Escuchar el cuento', pt: '📖 Ouvir a história', it: '📖 Ascolta la storia', nl: '📖 Hoor het verhaal' },
      hearAgain: { en: '📖 Hear it again', de: '📖 Noch einmal anhören', fr: '📖 Réécouter', es: '📖 Escuchar otra vez', pt: '📖 Ouvir de novo', it: '📖 Ascolta di nuovo', nl: '📖 Hoor het nog een keer' },
      thePart: { en: 'Otto reads:', de: 'Otto liest vor:', fr: 'Otto lit :', es: 'Otto lee:', pt: 'Otto lê:', it: 'Otto legge:', nl: 'Otto leest:' },
      hintPick: { en: 'Tap the picture that shows this part!', de: 'Tippe auf das Bild, das diesen Teil zeigt!', fr: 'Tape l’image qui montre ce moment !', es: '¡Toca la imagen que muestra este momento!', pt: 'Toque na imagem que mostra esta parte!', it: 'Tocca la figura che mostra questa parte!', nl: 'Tik op het plaatje dat bij dit stukje hoort!' },
      hintWrong: { en: 'That picture shows a different part — listen again.', de: 'Dieses Bild zeigt einen anderen Teil – hör noch einmal zu.', fr: 'Cette image montre un autre moment — réécoute.', es: 'Esa imagen muestra otro momento. Escucha otra vez.', pt: 'Essa imagem mostra outra parte — ouça de novo.', it: 'Questa figura mostra una parte diversa, ascolta di nuovo.', nl: 'Dat plaatje hoort bij een ander stukje — luister nog eens.' },
      ottoWin: { en: 'Yes! That picture shows it exactly!', de: 'Ja! Genau dieses Bild zeigt es!', fr: 'Oui ! Cette image le montre exactement !', es: '¡Sí! ¡Esa imagen lo muestra justo!', pt: 'Isso! Essa imagem mostra certinho!', it: 'Sì! Questa figura è proprio quella giusta!', nl: 'Ja! Dat plaatje hoort er precies bij!' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.film = null; this.sel = null; this._playedOnce = false; this._narrToken = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.film = Core.watchFilm(round);
      this.sel = null; this._playedOnce = false; this._narrToken++;
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'opb-wrap'); var root = api.el('div', 'opb-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this;

      // Otto + speech
      var row = api.el('div', 'opb-ottorow');
      var owl = api.el('div', 'opb-owl'); owl.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); owl.innerHTML = ottoSVG(this.sel ? 'happy' : 'idle'); row.appendChild(owl);
      var say = api.el('div', 'opb-say'); say.textContent = api.t('ottoIntro'); row.appendChild(say);
      root.appendChild(row);

      // the part Otto reads (the target sentence — the question)
      var part = api.el('div', 'opb-part');
      var lab = api.el('span', 'opb-partlab'); lab.textContent = api.t('thePart'); part.appendChild(lab);
      var txt = api.el('span', 'opb-parttxt'); txt.textContent = this.view.prompt; part.appendChild(txt);
      var sp = api.el('button', 'opb-spk'); sp.type = 'button'; sp.setAttribute('aria-label', LANG === 'fr' ? 'Lire la phrase' : LANG === 'de' ? 'Den Teil vorlesen' : LANG === 'es' ? 'Leer la oración' : LANG === 'pt' ? 'Ouvir a parte da história' : LANG === 'it' ? 'Leggi la parte' : LANG === 'nl' ? 'Het stukje voorlezen' : 'Read the part'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(self.view.prompt); }); part.appendChild(sp);
      root.appendChild(part);

      // hear-the-story button
      var hear = api.el('button', 'opb-hear'); hear.type = 'button'; hear.textContent = api.t(this._playedOnce ? 'hearAgain' : 'hearStory');
      hear.addEventListener('click', function () { self._playStory(); });
      root.appendChild(hear);

      // the picture choices (story order = the picture-book spread)
      var grid = api.el('div', 'opb-grid'); this._gridEl = grid;
      this.view.choices.forEach(function (ch, i) {
        var card = api.el('button', 'opb-card' + (self.sel === ch.panel ? ' opb-sel' : '')); card.type = 'button';
        card.setAttribute('data-i', i); card.style.background = tintFor(ch.panel);
        card.setAttribute('aria-label', (LANG === 'fr' ? 'Image ' : LANG === 'de' ? 'Bild ' : LANG === 'es' ? 'Imagen ' : LANG === 'pt' ? 'Imagem ' : LANG === 'it' ? 'Immagine ' : LANG === 'nl' ? 'Plaatje ' : 'Picture ') + (i + 1));
        var num = api.el('span', 'opb-cnum'); num.textContent = (i + 1); card.appendChild(num);
        var em = api.el('span', 'opb-cemoji'); em.setAttribute('aria-hidden', 'true'); em.textContent = EMOJI[ch.panel] || '❓'; card.appendChild(em);
        card.addEventListener('click', function () { self._tapCard(ch.panel); });
        grid.appendChild(card);
      });
      root.appendChild(grid);

      wrap.appendChild(root); stage.appendChild(wrap);
      // auto-read the part on first show of a round
      if (!this._spokePart) { this._spokePart = true; setTimeout(function () { speak(self.view.prompt); }, 320); }
    },

    _playStory: function () {
      var self = this; this._playedOnce = true; var token = ++this._narrToken;
      var cards = this._gridEl ? this._gridEl.querySelectorAll('.opb-card') : [];
      // re-label the hear button
      var hb = this._rootEl && this._rootEl.querySelector('.opb-hear'); if (hb) hb.textContent = this.api.t('hearAgain');
      function step(i) {
        if (token !== self._narrToken) return;
        for (var k = 0; k < cards.length; k++) cards[k].classList.toggle('opb-narr', k === i);
        if (i >= self.film.length) { for (var m = 0; m < cards.length; m++) cards[m].classList.remove('opb-narr'); return; }
        speak(self.film[i].caption);
        setTimeout(function () { step(i + 1); }, 1650);
      }
      step(0);
    },

    _tapCard: function (panel) {
      this._narrToken++;   // stop any narration highlight
      if (this.sel === panel) { this.sel = null; this.render(); return; }
      this.sel = panel; this.api.sound && this.api.sound(560); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
    reset: function () { this.setupTask(this.round); this._spokePart = false; this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      this._spokePart = false;
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/otto-picture-book-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var pool = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(pool.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[otto-picture-book] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.opb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.opb-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#F4E7CF);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* Otto row */
        + '.opb-ottorow{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.opb-owl{width:clamp(44px,10vw,56px);flex:0 0 auto;}.opb-owl-svg{width:100%;height:auto;display:block;}'
        + '.opb-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        /* the part Otto reads */
        + '.opb-part{display:flex;align-items:center;gap:8px;background:#FFF;border:2px solid ' + C.GOLD + ';border-radius:14px;padding:7px 11px;}'
        + '.opb-partlab{flex:0 0 auto;font:800 clamp(11px,2.7vw,13px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.opb-parttxt{flex:1;min-width:0;font:700 clamp(13px,3.4vw,16px)/1.25 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.opb-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        /* hear-the-story */
        + '.opb-hear{align-self:center;min-height:40px;padding:0 16px;border-radius:12px;border:0;background:#EAF2EE;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        /* picture choices */
        + '.opb-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,1.8vw,10px);}'   /* one row (a picture-book spread) — height-capped so the stage clears the fold on short phones */
        + '.opb-card{position:relative;display:flex;align-items:center;justify-content:center;height:clamp(56px,14.5vw,92px);border-radius:16px;border:3px solid rgba(20,107,94,.18);box-shadow:0 2px 0 rgba(160,120,60,.18);cursor:pointer;touch-action:manipulation;padding:0;}'
        + '.opb-card.opb-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.4);transform:translateY(-2px);}'
        + '.opb-card.opb-narr{border-color:' + C.GOLD + ';box-shadow:0 0 0 3px ' + C.GOLD + ';}'
        + '.opb-card:active{transform:translateY(1px);}'
        + '.opb-cnum{position:absolute;top:3px;left:5px;width:18px;height:18px;border-radius:9px;background:' + C.T + ';color:#fff;font:800 11px/18px "Baloo 2",sans-serif;text-align:center;}'
        + '.opb-cemoji{font-size:clamp(26px,7vw,40px);line-height:1;}'
        + '.opb-spk:focus-visible,.opb-hear:focus-visible,.opb-card:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* narrow phones: keep the single row (cards stay ≥56px tap), tighten chrome */
        + '@media (max-width:380px){.opb-root{gap:4px;padding:7px;}.opb-say{font-size:11.5px;}.opb-part{padding:5px 8px;}.opb-parttxt{font-size:12.5px;}.opb-cemoji{font-size:clamp(22px,6.5vw,30px);}.opb-card{height:clamp(50px,13.5vw,68px);}}'
        /* short viewports (320×640 etc.): the ~150px shell chrome leaves little room — compact every band so the row of cards + shell Check clear the fold */
        + '@media (max-height:700px){.opb-root{gap:3px;}.opb-ottorow .opb-owl{width:clamp(38px,8vw,46px);}.opb-say{-webkit-line-clamp:3;line-clamp:3;}.opb-part{padding:4px 8px;}.opb-hear{min-height:34px;}.opb-card{height:clamp(46px,12vw,64px);}.opb-cemoji{font-size:clamp(22px,5.5vw,28px);}}'   /* clamp:3 so the longer intro (en, esp. at 320px) shows fully; ample vertical headroom (§A.13.62 — fix layout not gate) */
        + '@media (prefers-reduced-motion: reduce){.opb-card{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-otto-picture-book', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'otto-picture-book.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
