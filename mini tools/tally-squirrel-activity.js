/* =====================================================================
   TALLY THE SQUIRREL — ACTIVITY  (tally-squirrel-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.NBT.B.6 — add up to four two-digit numbers. Tally fills 2–4 baskets
   with acorns; the child adds the two-digit counts and types the total on the
   shell keypad (answerType:'number'; the stage is display-only). Validity
   DERIVED by add-stack-core.js (oracle = sum; never a stored total).
   Per-pass reshuffle. Text + SVG char stub (CA5 later). No timer/score/streak.
   0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.AddStackCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };
  var LANG = 'en';

  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG === 'nl' ? 'nl-NL' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }

  function squirrelSVG() {
    return '<svg class="tsq-sq-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Tally, das Eichhörnchen' : LANG === 'fr' ? 'Tally l’écureuil' : LANG === 'es' ? 'Tally, la ardilla' : LANG === 'pt' ? 'Tally, o esquilo' : LANG === 'it' ? 'Tally, lo scoiattolo' : LANG === 'nl' ? 'Tally, de eekhoorn' : 'Tally the squirrel') + '">' +
      '<path d="M30 78 q-16 -6 -14 -26 q2 -14 16 -10 q-10 8 -4 20 q4 8 6 12 Z" fill="#A65B33"/>' +   /* bushy tail */
      '<ellipse cx="52" cy="66" rx="18" ry="17" fill="#C2703F"/>' +                  /* body */
      '<ellipse cx="52" cy="72" rx="11" ry="9" fill="#E8C49C"/>' +                  /* belly */
      '<circle cx="62" cy="44" r="11" fill="#C2703F"/>' +                            /* head */
      '<circle cx="56" cy="36" r="4" fill="#C2703F"/>' +                            /* ear */
      '<circle cx="68" cy="36" r="4" fill="#C2703F"/>' +                            /* ear */
      '<circle cx="65" cy="43" r="2.4" fill="#2A2A35"/>' +                           /* eye */
      '<path d="M71 45 l5 1 l-5 2 Z" fill="#8A4A26"/>' +                             /* snout */
      '</svg>';
  }
  function basketSVG() {
    return '<svg class="tsq-basket-svg" viewBox="0 0 40 30" aria-hidden="true">' +
      '<path d="M4 10 h32 l-3 16 a3 3 0 0 1 -3 2 h-20 a3 3 0 0 1 -3 -2 Z" fill="#C99A5B"/>' +
      '<path d="M4 10 h32 v3 h-32 Z" fill="#A87B3E"/>' +
      '<path d="M10 10 q10 -10 20 0" fill="none" stroke="#A87B3E" stroke-width="2.4"/>' +
      '</svg>';
  }

  global.TallySquirrelActivity = {
    id: 'tally-squirrel-activity',

    /* it (Indicazioni nazionali, classe seconda): mascot Tally = «lo scoiattolo» (⚠ s-impura → «lo», never
       «il scoiattolo»); acorns = «ghiande» (f); baskets = «cestini»; add verb = «sommare» (NOT «addizionare»
       = technical); total = «il totale»; decine/unità. Addizioni entro il 100 con strategie di calcolo mentale
       / valore posizionale = classe seconda (auto); nucleo «Numeri» (NBT auto). No GRADE/STRAND override. */
    /* nl (SLO-kerndoelen, Groep 4): mascotte «Tally de eekhoorn» (KEEP, cross-locale); eikels (de eikel/eikels);
       mandjes; optellen. ⚠ resultaat = «het totaal», NOOIT «de som» (in NL is «een som» ook de OPGAVE zelf →
       dubbelzinnig voor een kind). tientallen/eenheden. Hint = SPLITSEN (eerst tientallen, dan eenheden, dan
       samen) — GEEN kolomsgewijs/cijferend rekenen (Groep 5+). Meerdere tweecijferige getallen optellen tot 100
       = Groep 4 (manifest grade '2' → Groep 4 auto, GEEN grade override, = de Duitse Klasse 2). STRAND override
       nl:'Getallen' (de auto-calque «Getallen en het tientallig stelsel» is GEEN SLO-domeinnaam; de SLO-domeinen
       zijn Getallen · Verhoudingen · Meten & Meetkunde · Verbanden). TTS-join = default ' plus '. */
    strings: {
      title: { en: "Tally the Squirrel", de: 'Tallys Eichelkörbe', fr: 'Les paniers de glands de Tally', es: 'Tally la ardilla', pt: 'As cestas de bolotas do Tally', it: 'I cestini di ghiande di Tally', nl: 'Tally’s eikelmandjes' },
      instruction: { en: 'Tally fills the baskets with acorns. Add them all up and type the total.', de: 'Tally füllt die Körbe mit Eicheln. Zähle alle zusammen und tippe die Summe ein.', fr: 'Tally remplit ses paniers de glands. Additionne-les tous et écris le total.', es: 'Tally llena las canastas con bellotas. Súmalas todas y escribe el total.', pt: 'O Tally enche as cestas com bolotas. Some todas e digite o total.', it: 'Tally riempie i cestini di ghiande. Sommale tutte e scrivi il totale.', nl: 'Tally vult de mandjes met eikels. Tel ze allemaal bij elkaar op en typ het totaal in.' },
      prompt: { en: 'How many acorns in all?', de: 'Wie viele Eicheln sind es zusammen?', fr: 'Combien de glands en tout ?', es: '¿Cuántas bellotas hay en total?', pt: 'Quantas bolotas no total?', it: 'Quante ghiande in tutto?', nl: 'Hoeveel eikels zijn het samen?' },
      hint: { en: 'Add the baskets one at a time — tens with tens, ones with ones.', de: 'Zähle erst alle Zehner zusammen, dann alle Einer — und dann beides.', fr: 'Additionne d’abord toutes les dizaines, puis toutes les unités — et enfin rassemble le tout.', es: 'Suma las canastas de una en una: las decenas con las decenas y las unidades con las unidades.', pt: 'Some as cestas uma de cada vez — primeiro as dezenas, depois as unidades, e junte tudo.', it: 'Somma un cestino alla volta: le decine con le decine, le unità con le unità.', nl: 'Tel eerst alle tientallen bij elkaar op, dan alle eenheden — en dan allebei samen.' },
      readAria: { en: 'hear the baskets', de: 'die Körbe anhören', fr: 'écouter les paniers', es: 'escuchar las canastas', pt: 'ouvir as cestas', it: 'ascolta i cestini', nl: 'de mandjes beluisteren' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) { this.round = round; this.view = Core.childView(round); this._spoke = false; },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'tsq-wrap'); var root = api.el('div', 'tsq-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var v = this.view, self = this;

      var row = api.el('div', 'tsq-row');
      var sq = api.el('div', 'tsq-sq'); sq.innerHTML = squirrelSVG(); row.appendChild(sq);

      var stack = api.el('div', 'tsq-stack');
      v.addends.forEach(function (n, i) {
        if (i > 0) { var plus = api.el('div', 'tsq-plus'); plus.textContent = '+'; stack.appendChild(plus); }
        var card = api.el('div', 'tsq-basket');
        card.innerHTML = basketSVG();
        var num = api.el('div', 'tsq-num'); num.textContent = String(n); card.appendChild(num);
        stack.appendChild(card);
      });
      row.appendChild(stack);
      root.appendChild(row);

      var read = api.el('button', 'tsq-read'); read.type = 'button'; read.setAttribute('aria-label', api.t('readAria'));
      var sayLine = v.addends.join(LANG === 'it' ? ' più ' : LANG === 'es' ? ' más ' : LANG === 'pt' ? ' mais ' : ' plus ') + (LANG === 'de' ? '. Wie viele sind das zusammen?' : LANG === 'fr' ? '. Combien ça fait en tout ?' : LANG === 'es' ? '. ¿Cuántas son en total?' : LANG === 'pt' ? '. Quantas são no total?' : LANG === 'it' ? '. Quante sono in tutto?' : LANG === 'nl' ? '. Hoeveel zijn het samen?' : '. How many in all?');
      read.innerHTML = '<span class="tsq-read-ic">🔊</span> ' + v.addends.join(' + ') + ' = ?';
      read.addEventListener('click', function () { speak(sayLine); });
      root.appendChild(read);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(sayLine); }, 320); }
    },

    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/tally-squirrel-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[tally-squirrel] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.tsq-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.tsq-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,2vw,12px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(9px,2.2vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.tsq-row{display:flex;align-items:center;gap:clamp(6px,2vw,14px);justify-content:center;flex-wrap:wrap;}'
        + '.tsq-sq{width:clamp(46px,10vw,60px);flex:0 0 auto;}.tsq-sq-svg{width:100%;height:auto;display:block;}'
        + '.tsq-stack{display:flex;align-items:center;gap:clamp(4px,1.4vw,9px);flex-wrap:wrap;justify-content:center;}'
        + '.tsq-basket{display:flex;flex-direction:column;align-items:center;gap:2px;background:#fff;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:clamp(5px,1.4vw,9px) clamp(7px,2vw,13px);}'
        + '.tsq-basket-svg{width:clamp(28px,7vw,38px);height:auto;display:block;}'
        + '.tsq-num{font:800 clamp(20px,5.5vw,30px)/1 "Baloo 2",sans-serif;color:' + C.INK + ';}'
        + '.tsq-plus{font:800 clamp(18px,5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.tsq-read{display:inline-flex;align-items:center;gap:7px;border:2px solid rgba(20,107,94,.22);background:#FFFDF6;border-radius:13px;padding:8px 14px;font:700 clamp(13px,3.3vw,16px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';cursor:pointer;touch-action:manipulation;}'
        + '.tsq-read-ic{font-size:16px;}'
        + '.tsq-read:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.tsq-root{gap:clamp(5px,1.4vw,9px);}.tsq-sq{width:clamp(42px,8vw,52px);}.tsq-num{font-size:clamp(18px,5vw,26px);}}'
        + '@media (max-height:700px){.tsq-root{gap:5px;padding:9px;}.tsq-sq{width:clamp(38px,7vw,46px);}.tsq-basket-svg{width:28px;}.tsq-num{font-size:22px;}.tsq-read{padding:7px 11px;font-size:13px;}}'
        + '@media (max-height:640px){.tsq-root{gap:4px;padding:7px;}.tsq-sq{display:none;}.tsq-basket-svg{display:none;}.tsq-num{font-size:22px;}}'
        + '@media (max-width:380px){.tsq-num{font-size:20px;}.tsq-basket{padding:5px 8px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-tally-squirrel', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round, i) {
      return {
        id: 'tally-squirrel.round-' + i, band: round.band || 1,
        promptKey: 'prompt', promptArgs: {},
        answerType: 'number', answerMin: 0, answerMax: 140,
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool, answer) { return Core.isAnswer(round, answer); },
        hintKey: function () { return 'hint'; }
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
