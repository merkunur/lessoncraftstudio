/* =====================================================================
   ROSA RACCOON'S RHYME WAGON — ACTIVITY SKIN  (rhyme-shop-activity.js)
   ---------------------------------------------------------------------
   RF.K.2.a · rhyme. The lcs-shell activity skin over rhyme-shop-core.js.
   answerType:'state'. EN-ONLY pilot. The FIRST library-image consumer.

   AUDIO-FIRST (the honest listening game): every picture token is TAP-TO-HEAR
   (LCSAudio.speak whole-word; NO audio-on-load). Print is an INERT label (the
   plain capitalized word, NO rime highlight). 7 distinct interaction shapes
   (judge / pick / odd / sort / chant / field / chain). A correct commit →
   resolve (the shell Check = post-resolve advance, hidden until resolved via
   `.lcs-app.rosa-resolved`); a WRONG commit → guided RE-LISTEN (Rosa replays
   the tails; the wrong tile becomes NON-CONFIRMABLE that round; order
   reshuffles), retry. The gumball globe abundance vessel. Per-round token
   guard. 0 lines to any core / lcs-shell. Picture tokens = real library
   `/image-library-webp/themes/<themeDir>/<noun>@2x.webp` (served locally by
   the visual-qa + mobile harness).
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.RhymeShopCore;
  var LANG = 'en';   // #102 — set in init from api.lang; the whole DE surface rides on LANG

  var L = {
    en: {
      tapHear: 'Tap a picture to HEAR it!',
      judge: 'Do these two RING the same?',
      pick: 'Tap the picture that RHYMES, then feed it!',
      odd: 'One does NOT ring the same — tap it, then feed it!',
      sort: 'Tap a picture, then tap the wagon it rings with.',
      chant: 'Finish Rosa’s rhyme — tap the word that fits!',
      field: 'Tap EVERY picture that rhymes, then press Done!',
      chain: 'Add a picture that rhymes — keep the chain going!',
      yes: 'Yes, they ring!', no: 'No, different tails',
      feed: 'Feed it!', done: 'Done!', add: 'Add it!',
      ring: 'They RING the same! Into the globe it goes.',
      reread: 'Listen again — those tails don’t ring the same. Try another!',
      oral: 'Can you SAY another word that rhymes? Say it out loud!'
    },
    de: {
      tapHear: 'Tipp auf ein Bild, um es zu HÖREN!',
      judge: 'Klingen diese zwei am Ende gleich?',
      pick: 'Tipp das Bild, das sich reimt – dann füttere es!',
      odd: 'Eines klingt NICHT gleich – tipp es an, dann füttere es!',
      sort: 'Tipp ein Bild, dann tipp den Wagen, mit dem es sich reimt.',
      chant: 'Vervollständige Rudis Reim – tipp das Wort, das passt!',
      field: 'Tipp JEDES Bild, das sich reimt, dann drück Fertig!',
      chain: 'Füg ein Bild dazu, das sich reimt – bau die Kette weiter!',
      yes: 'Ja, gleich!', no: 'Nein, anders',
      feed: 'Füttern!', done: 'Fertig!', add: 'Dazu!',
      ring: 'Die klingen gleich! Ab in die Reimkugel.',
      reread: 'Hör nochmal – die Enden klingen anders. Versuch ein anderes!',
      oral: 'Fällt dir noch ein Reimwort ein? Sag es laut!'
    },
    es: {
      tapHear: '¡Toca una imagen para ESCUCHARLA!',
      judge: '¿Estas dos riman?',
      pick: 'Toca la imagen que RIMA y ¡dale de comer!',
      odd: 'Una NO rima. ¡Tócala y dale de comer!',
      sort: 'Toca una imagen y luego el vagón con el que rima.',
      chant: 'Completa la rima: ¡toca la palabra que va!',
      field: 'Toca TODAS las que riman y ¡pulsa Listo!',
      chain: 'Agrega una imagen que rime. ¡Sigue la cadena!',
      yes: '¡Sí, riman!', no: 'No, terminan diferente.',
      feed: '¡Dale de comer!', done: '¡Listo!', add: '¡Agrégala!',
      ring: '¡Riman! Se van juntas a la esfera.',
      reread: 'Escucha otra vez: esas no riman. ¡Prueba con otra!',
      oral: '¿Puedes DECIR otra palabra que rime? ¡Dila en voz alta!'
    },
    pt: {
      tapHear: 'Toque numa figura para OUVIR!',
      judge: 'Essas duas rimam?',
      pick: 'Toque na figura que RIMA e alimente!',
      odd: 'Uma NÃO rima. Toque nela e alimente!',
      sort: 'Toque numa figura e depois no vagão que rima com ela.',
      chant: 'Complete a rima: toque na palavra que combina!',
      field: 'Toque em TODAS as que rimam e aperte Pronto!',
      chain: 'Junte uma figura que rima. Continue a trilha!',
      yes: 'Isso, elas rimam!', no: 'Não, terminam diferente.',
      feed: 'Alimente!', done: 'Pronto!', add: 'Junte!',
      ring: 'Elas rimam! Vão juntas pra esfera.',
      reread: 'Ouça de novo: essas não rimam. Tente outra!',
      oral: 'Você consegue DIZER outra palavra que rima? Fale alto!'
    },
    it: {
      tapHear: 'Tocca una figura per ASCOLTARLA!',
      judge: 'Queste due rimano?',
      pick: 'Tocca quella che RIMA e dai da mangiare!',
      odd: 'Una NON rima. Toccala e dai da mangiare!',
      sort: 'Tocca una figura e poi il vagone con cui rima.',
      chant: 'Completa la rima: tocca la parola giusta!',
      field: 'Tocca TUTTE quelle che rimano e premi Fatto!',
      chain: 'Aggiungi una figura che rima. Continua la catena!',
      yes: 'Sì, rimano!', no: 'No, finiscono diverse.',
      feed: 'Dai da mangiare!', done: 'Fatto!', add: 'Aggiungila!',
      ring: 'Rimano! Vanno insieme nella sfera.',
      reread: 'Ascolta di nuovo: queste non rimano. Prova ancora!',
      oral: 'Sai DIRE una parola che rima? Dilla ad alta voce!'
    },
    nl: {
      tapHear: 'Tik op een plaatje om het te HOREN!',
      judge: 'Eindigen deze twee hetzelfde?',
      pick: 'Tik op het plaatje dat rijmt en geef het dan te eten!',
      odd: 'Eentje klinkt NIET hetzelfde. Tik erop en geef het te eten!',
      sort: 'Tik op een plaatje en tik dan op de wagen waarmee het rijmt.',
      chant: 'Maak het rijmpje af. Tik op het woord dat past!',
      field: 'Tik op ELK plaatje dat rijmt en druk dan op Klaar!',
      chain: 'Voeg een plaatje toe dat rijmt en bouw de ketting verder!',
      yes: 'Ja, hetzelfde!', no: 'Nee, anders',
      feed: 'Geef te eten!', done: 'Klaar!', add: 'Voeg toe!',
      ring: 'Ze rijmen! De rijmbol in.',
      reread: 'Luister nog eens. Die einden klinken anders. Probeer een andere!',
      oral: 'Weet jij nog een woord dat rijmt? Zeg het hardop!'
    }
  };
  function txt(k) { return (L[LANG] || L.en)[k] || L.en[k] || k; }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function wordOf(t) { return ((LANG === 'de' || LANG === 'es' || LANG === 'pt' || LANG === 'it' || LANG === 'nl') && t.word) ? t.word : cap(t.noun); }

  function rosaSVG() {
    return '<svg class="rs-rosa" viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">' +
      '<ellipse cx="24" cy="28" rx="16" ry="15" fill="#9AA7AE"/>' +
      '<path d="M12 16 q-3 -9 6 -10 q4 4 3 11 z" fill="#7E8B92"/><path d="M36 16 q3 -9 -6 -10 q-4 4 -3 11 z" fill="#7E8B92"/>' +
      '<path d="M10 24 q6 -4 12 0 q-2 6 -6 6 q-4 0 -6 -6z" fill="#3A4248"/>' +
      '<circle cx="18" cy="24" r="3" fill="#fff"/><circle cx="18" cy="24" r="1.6" fill="#2B2B2B"/>' +
      '<path d="M28 22 q5 -3 10 1 q-3 6 -6 6 q-3 0 -4 -7z" fill="#3A4248"/>' +
      '<circle cx="32" cy="24" r="3" fill="#fff"/><circle cx="32" cy="24" r="1.6" fill="#2B2B2B"/>' +
      '<ellipse cx="24" cy="31" rx="3" ry="2.4" fill="#2B2B2B"/>' +
      '<path d="M40 14 a5 5 0 1 0 .1 0 M44 18 l4 4" fill="none" stroke="#146B5E" stroke-width="2"/></svg>';
  }
  function globeSVG(n) {
    var balls = '', cap2 = Math.min(n, 14), cols = ['#F2784B', '#5AA469', '#C2569B', '#2A9D8F', '#E9C46A'];
    for (var i = 0; i < cap2; i++) { var r = Math.floor(i / 4), c = i % 4; balls += '<circle cx="' + (13 + c * 8) + '" cy="' + (30 - r * 7) + '" r="3.4" fill="' + cols[i % 5] + '"/>'; }
    return '<svg class="rs-globe" viewBox="0 0 54 48" width="34" height="30" aria-hidden="true">' +
      '<circle cx="27" cy="22" r="19" fill="#EAF3F1" stroke="#146B5E" stroke-width="2"/>' +
      '<g>' + balls + '</g>' +
      '<rect x="14" y="40" width="26" height="6" rx="2" fill="#146B5E"/></svg>';
  }

  var RhymeShopActivity = {
    id: 'rhyme-shop',
    strings: {
      title: { en: "Rosa Raccoon's Rhyme Wagon", de: 'Rudi Reimbär', es: 'El vagón de rimas de Momo el Mapache', pt: 'O vagão de rimas do Gui', it: 'Rima e il vagone delle rime', nl: 'Rijmen met Rijmbeer Rob' },
      instruction: { en: 'Headphones on! Tap to hear, then feed the rhymes.', de: 'Kopfhörer auf! Tipp zum Hören, dann füttere die Reime.', es: '¡Ponte los audífonos! Toca para escuchar y dale de comer a las rimas.', pt: 'Fones de ouvido! Toque para ouvir e alimente as rimas.', it: 'Ascolta le parole e trova quelle che rimano!', nl: 'Koptelefoon op! Tik om te horen en geef de rijmwoorden te eten.' },
      qJudge: { en: 'Do these two RING the same?', de: 'Klingen diese zwei am Ende gleich?', es: '¿Estas dos riman?', pt: 'Essas duas rimam?', it: 'Queste due rimano?', nl: 'Eindigen deze twee hetzelfde?' },
      qPick: { en: 'Which picture RHYMES with {w}?', de: 'Welches Bild reimt sich auf {w}?', es: '¿Cuál imagen RIMA con {w}?', pt: 'Qual figura rima com {w}?', it: 'Quale figura RIMA con {w}?', nl: 'Welk plaatje RIJMT op {w}?' },
      qOdd: { en: 'Which one does NOT ring the same?', de: 'Welches klingt NICHT gleich?', es: '¿Cuál NO rima?', pt: 'Qual NÃO rima?', it: 'Una NON rima. Toccala!', nl: 'Welke klinkt NIET hetzelfde?' },
      qSort: { en: 'Sort each picture into the wagon it rings with.', de: 'Sortiere jedes Bild in den Wagen, mit dem es sich reimt.', es: 'Acomoda cada imagen en el vagón con el que rima.', pt: 'Coloque cada figura no vagão que rima com ela.', it: 'Tocca una figura e poi il vagone giusto.', nl: 'Sorteer elk plaatje in de wagen waarmee het rijmt.' },
      qChant: { en: "Finish Rosa's rhyme!", de: 'Vervollständige Rudis Reim!', es: '¡Completa la rima!', pt: 'Complete a rima!', it: 'Completa la rima: tocca la parola giusta!', nl: 'Maak het rijmpje af!' },
      qField: { en: 'Find EVERY picture that rhymes with {w}.', de: 'Finde JEDES Bild, das sich auf {w} reimt.', es: 'Encuentra TODAS las imágenes que riman con {w}.', pt: 'Ache TODAS as figuras que rimam com {w}.', it: 'Trova TUTTE le figure che rimano con {w}.', nl: 'Zoek ELK plaatje dat rijmt op {w}.' },
      qChain: { en: 'Build a rhyme chain!', de: 'Bau eine Reimkette!', es: '¡Arma una cadena de rimas!', pt: 'Monte uma trilha de rimas!', it: 'Aggiungi una figura che rima. Continua la catena!', nl: 'Bouw een rijmketting!' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._pending = null; this._fieldSel = {}; this._nonConf = {};
      this._sortPending = null; this._sortPlaced = {};
      this._chainStep = 0; this._chainHistory = [];
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('rs-style')) return;
      var s = el('style'); s.id = 'rs-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.rs-root{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:560px;margin:0 auto;}',
        '.rs-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.rs-rosa,.rs-globe{flex:0 0 auto;}',
        '.rs-line{flex:1 1 auto;min-height:1.05em;text-align:center;font:700 .82rem/1.15 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.rs-line.miss{color:#C2410C;}',
        '.rs-couplet{width:100%;text-align:center;font:600 .92rem/1.25 Baloo 2,Nunito,sans-serif;color:#3a3a3a;background:#FFFDF7;border:2px dashed #C9B68C;border-radius:10px;padding:5px 10px;box-sizing:border-box;}',
        '.rs-target{display:flex;align-items:center;justify-content:center;gap:8px;font:800 1rem/1 Baloo 2,Nunito,sans-serif;color:#0F4A40;}',
        '.rs-target img{width:42px;height:42px;object-fit:contain;}',
        /* content-sized tiles in a flex-wrap centred row — each tile HUGS its
           image+word so the picture fills the card (not sparse), §A.13.62 */
        '.rs-grid{display:flex;flex-wrap:wrap;gap:7px;width:100%;justify-content:center;}',
        '.rs-tile{display:flex;flex-direction:column;align-items:center;gap:1px;border:2.5px solid #146B5E;border-radius:12px;background:#fff;cursor:pointer;padding:4px 6px 3px;min-height:46px;flex:0 0 auto;}',
        '.rs-tile img{width:56px;height:56px;object-fit:contain;pointer-events:none;}',
        '@media (max-width:380px){.rs-tile img{width:46px;height:46px;}.rs-target img{width:34px;height:34px;}}',
        '.rs-tile .rs-word{font:700 .8rem/1 Nunito,sans-serif;color:#0F4A40;}',
        '.rs-tile.sel{border-color:#F2784B;background:#FCEDE4;}',
        '.rs-tile.dim{opacity:.4;}',
        '.rs-tile.placed{opacity:.5;border-style:dashed;}',
        '.rs-bins{display:flex;gap:8px;width:100%;justify-content:center;}',
        '.rs-bin{flex:1 1 0;border:2.5px solid #146B5E;border-radius:12px;background:#F4FAF8;padding:4px;display:flex;flex-direction:column;align-items:center;gap:3px;min-height:46px;cursor:pointer;}',
        '.rs-bin img{width:44px;height:44px;object-fit:contain;}',
        '.rs-bin .rs-word{font:700 .72rem/1 Nunito,sans-serif;color:#146B5E;}',
        '.rs-bin.sel{border-color:#F2784B;background:#FCEDE4;}',
        '.rs-pile{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;width:100%;}',
        '.rs-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;width:100%;}',
        '.rs-btn{min-height:46px;border-radius:13px;border:none;font:800 1rem/1 Baloo 2,Nunito,sans-serif;cursor:pointer;padding:7px 18px;}',
        '.rs-commit{background:#F2784B;color:#fff;}', '.rs-commit[disabled]{opacity:.45;cursor:default;}',
        '.rs-yn{background:#fff;color:#146B5E;border:2.5px solid #146B5E;min-width:96px;}',
        '.rs-chain{display:flex;flex-wrap:wrap;gap:5px;align-items:center;justify-content:center;width:100%;}',
        '.rs-chain .rs-cw{font:800 .85rem/1 Baloo 2,Nunito,sans-serif;color:#0F4A40;background:#EAF5F1;border-radius:8px;padding:4px 8px;}',
        '.rs-chain .rs-arrow{color:#9a8a66;}',
        '.rs-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '.lcs-app:not(.rosa-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'rhyme-shop.rhyme.rf-k-2-a';
      var tries = ['/mini-tools/rhyme-shop-activities.json', 'rhyme-shop-activities.json', '../mini tools/rhyme-shop-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds)) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = this._shuffle(pool.map(function (_, i) { return i; })); }
      return order;
    },
    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      var pk, args = {};
      switch (round.cog) {
        case 'judge': pk = 'qJudge'; break;
        case 'pick': pk = 'qPick'; args = { w: wordOf(round.target) }; break;
        case 'odd': pk = 'qOdd'; break;
        case 'sort': pk = 'qSort'; break;
        case 'chant': pk = 'qChant'; break;
        case 'field': pk = 'qField'; args = { w: wordOf(round.target) }; break;
        case 'chain': pk = 'qChain'; break;
        default: pk = 'qPick';
      }
      return {
        id: round.id, promptKey: pk, promptArgs: args, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1;
      this._pending = null; this._fieldSel = {}; this._nonConf = {};
      this._sortPending = null; this._sortPlaced = {};
      this._chainStep = 0; this._chainHistory = round.anchor ? [round.anchor] : [];
      /* per-serve shuffle of choices = the distractor-set rotation */
      this._displayOrder = round.choices ? this._shuffle(round.choices.map(function (_, i) { return i; })) : null;
      this._pileOrder = round.pile ? this._shuffle(round.pile.map(function (_, i) { return i; })) : null;
      if (this._app) this._app.classList.remove('rosa-resolved');
    },

    _speak: function (token) {
      if (!global.LCSAudio || !global.LCSAudio.speak) return;
      global.LCSAudio.speak({ type: 'word', text: wordOf(token), lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 });
    },

    /* a tappable picture tile */
    _tile: function (token, opts) {
      opts = opts || {};
      var self = this;
      var b = el('button', 'rs-tile rs-card');
      b.type = 'button'; b.setAttribute('aria-label', wordOf(token));
      if (opts.selected) b.classList.add('sel');
      if (opts.dim) b.classList.add('dim');
      if (opts.placed) b.classList.add('placed');
      b.innerHTML = '<img src="' + imgUrl(token) + '" alt="' + wordOf(token) + '" onerror="this.style.visibility=\'hidden\'">' +
        '<span class="rs-word">' + wordOf(token) + '</span>';
      b.addEventListener('click', function () { self._speak(token); if (opts.onTap) opts.onTap(); });
      return b;
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'rs-root');

      var say = el('div', 'rs-say');
      var rosa = el('div'); rosa.innerHTML = rosaSVG();
      var line = el('p', 'rs-line'); line.setAttribute('aria-live', 'polite'); line.textContent = txt(round.cog === 'judge' ? 'judge' : round.cog) || txt('tapHear');
      var globe = el('div'); globe.innerHTML = globeSVG(this._finds);
      say.append(rosa, line, globe); root.appendChild(say);
      this._line = line;

      ({ judge: '_renderJudge', pick: '_renderPick', odd: '_renderOdd', sort: '_renderSort', chant: '_renderChant', field: '_renderField', chain: '_renderChain' }[round.cog] &&
        this[{ judge: '_renderJudge', pick: '_renderPick', odd: '_renderOdd', sort: '_renderSort', chant: '_renderChant', field: '_renderField', chain: '_renderChain' }[round.cog]](root));

      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    /* ---------- shared commit helpers ---------- */
    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('rosa-resolved');
      var g = this._api.stage.querySelector('.rs-globe'); if (g) g.outerHTML = globeSVG(this._finds);
      if (this._line) { this._line.textContent = txt('ring'); this._line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
    },
    _wrongFeed: function (replayTokens) {
      var self = this;
      this._api.sound && this._api.sound(420);
      if (this._line) { this._line.textContent = txt('reread'); this._line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt('reread'));
      /* replay the two tails */
      (replayTokens || []).forEach(function (t, i) { setTimeout(function () { self._speak(t); }, i * 700); });
    },

    /* ---------- JUDGE ---------- */
    _renderJudge: function (root) {
      var self = this, r = this._round;
      var grid = el('div', 'rs-grid two');
      grid.appendChild(this._tile(r.a, {}));
      grid.appendChild(this._tile(r.b, {}));
      root.appendChild(grid);
      var row = el('div', 'rs-row');
      [['yes', true], ['no', false]].forEach(function (p) {
        var b = el('button', 'rs-btn rs-yn'); b.type = 'button'; b.textContent = txt(p[0]);
        b.addEventListener('click', function () {
          if (self._resolved) return;
          if (Core.isAnswer(r, p[1])) self._resolve(); else self._wrongFeed([r.a, r.b]);
        });
        row.appendChild(b);
      });
      root.appendChild(row);
    },

    /* ---------- PICK / ODD / CHANT (single select + commit) ---------- */
    _renderChoiceGrid: function (root, opts) {
      var self = this, r = this._round;
      if (opts.target) { var tg = el('div', 'rs-target'); tg.innerHTML = '<img src="' + imgUrl(opts.target) + '" alt="' + wordOf(opts.target) + '" onerror="this.style.visibility=\'hidden\'"><span>' + wordOf(opts.target) + '</span>'; root.appendChild(tg); }
      if (opts.couplet) { var cp = el('p', 'rs-couplet'); cp.textContent = opts.couplet; root.appendChild(cp); }
      var grid = el('div', 'rs-grid');
      this._displayOrder.forEach(function (oi) {
        var tile = self._tile(r.choices[oi], {
          selected: self._pending === oi, dim: !!self._nonConf[oi],
          onTap: function () { if (self._resolved || self._nonConf[oi]) return; self._pending = oi; self.render(); }
        });
        grid.appendChild(tile);
      });
      root.appendChild(grid);
      var row = el('div', 'rs-row');
      var commit = el('button', 'rs-btn rs-commit'); commit.type = 'button'; commit.textContent = txt(opts.commit || 'feed');
      commit.disabled = (this._pending == null);
      commit.addEventListener('click', function () {
        if (self._resolved || self._pending == null) return;
        if (Core.isAnswer(r, self._pending)) self._resolve();
        else { var wt = r.choices[self._pending]; self._nonConf[self._pending] = 1; self._pending = null; self._displayOrder = self._shuffle(r.choices.map(function (_, i) { return i; })); self.render(); self._wrongFeed([opts.target || wt, wt]); }
      });
      row.appendChild(commit); root.appendChild(row);
    },
    _renderPick: function (root) { this._renderChoiceGrid(root, { target: this._round.target, commit: 'feed' }); },
    _renderOdd: function (root) { this._renderChoiceGrid(root, { commit: 'feed' }); },
    _renderChant: function (root) { this._renderChoiceGrid(root, { couplet: this._round.coupletLine, commit: 'feed' }); },

    /* ---------- SORT (two-tap place) ---------- */
    _renderSort: function (root) {
      var self = this, r = this._round;
      var bins = el('div', 'rs-bins');
      r.bins.forEach(function (binTok, bi) {
        var bin = el('div', 'rs-bin' + (self._sortPending != null && self._sortPlaced[self._sortPending] === undefined ? '' : ''));
        bin.innerHTML = '<img src="' + imgUrl(binTok) + '" alt="' + wordOf(binTok) + '" onerror="this.style.visibility=\'hidden\'"><span class="rs-word">♪ ' + wordOf(binTok) + '</span>';
        bin.addEventListener('click', function () { self._speak(binTok); self._placeSort(bi); });
        bins.appendChild(bin);
      });
      root.appendChild(bins);
      var pile = el('div', 'rs-pile');
      this._pileOrder.forEach(function (pi) {
        if (self._sortPlaced[pi] !== undefined) return;   /* already placed */
        pile.appendChild(self._tile(r.pile[pi], {
          selected: self._sortPending === pi,
          onTap: function () { if (self._resolved) return; self._sortPending = pi; self.render(); }
        }));
      });
      root.appendChild(pile);
    },
    _placeSort: function (binIndex) {
      var r = this._round; if (this._resolved || this._sortPending == null) return;
      var pi = this._sortPending;
      if (Core.rhymes(r.pile[pi], r.bins[binIndex])) {
        this._sortPlaced[pi] = binIndex; this._sortPending = null;
        if (Object.keys(this._sortPlaced).length === r.pile.length) this._resolve(); else this.render();
      } else { var pt = r.pile[pi], bt = r.bins[binIndex]; this._sortPending = null; this.render(); this._wrongFeed([pt, bt]); }
    },

    /* ---------- FIELD (multi-select) ---------- */
    _renderField: function (root) {
      var self = this, r = this._round;
      var tg = el('div', 'rs-target'); tg.innerHTML = '<img src="' + imgUrl(r.target) + '" alt="' + wordOf(r.target) + '" onerror="this.style.visibility=\'hidden\'"><span>♪ ' + wordOf(r.target) + '</span>'; root.appendChild(tg);
      var grid = el('div', 'rs-grid');
      this._displayOrder.forEach(function (oi) {
        grid.appendChild(self._tile(r.choices[oi], {
          selected: !!self._fieldSel[oi],
          onTap: function () { if (self._resolved) return; if (self._fieldSel[oi]) delete self._fieldSel[oi]; else self._fieldSel[oi] = 1; self.render(); }
        }));
      });
      root.appendChild(grid);
      var row = el('div', 'rs-row');
      var done = el('button', 'rs-btn rs-commit'); done.type = 'button'; done.textContent = txt('done');
      done.disabled = Object.keys(this._fieldSel).length === 0;
      done.addEventListener('click', function () {
        if (self._resolved) return;
        var resp = Object.keys(self._fieldSel).map(Number).sort(function (a, b) { return a - b; });
        if (Core.isAnswer(r, resp)) self._resolve();
        else { self._fieldSel = {}; self.render(); self._wrongFeed([r.target]); }
      });
      row.appendChild(done); root.appendChild(row);
    },

    /* ---------- CHAIN (iterative add) ---------- */
    _renderChain: function (root) {
      var self = this, r = this._round;
      var chain = el('div', 'rs-chain');
      this._chainHistory.forEach(function (tok, i) {
        if (i) { var ar = el('span', 'rs-arrow'); ar.textContent = '→'; chain.appendChild(ar); }
        var w = el('span', 'rs-cw'); w.textContent = wordOf(tok); chain.appendChild(w);
      });
      root.appendChild(chain);
      if (this._chainStep >= r.steps.length) { return; }
      var grid = el('div', 'rs-grid');
      var step = r.steps[this._chainStep];
      step.choices.forEach(function (tok, ci) {
        grid.appendChild(self._tile(tok, {
          dim: !!self._nonConf['s' + self._chainStep + '_' + ci],
          onTap: function () {
            if (self._resolved || self._nonConf['s' + self._chainStep + '_' + ci]) return;
            var anchor = self._chainHistory[self._chainHistory.length - 1];
            if (Core.rhymes(anchor, tok)) {
              self._chainHistory.push(tok); self._chainStep += 1;
              if (self._chainStep >= r.steps.length) self._resolve(); else self.render();
            } else { self._nonConf['s' + self._chainStep + '_' + ci] = 1; self.render(); self._wrongFeed([anchor, tok]); }
          }
        }));
      });
      root.appendChild(grid);
    },

    _srMirror: function () {
      var round = this._round, toks = Core.allTokens(round);
      var wrap = el('div', 'rs-sronly'); wrap.setAttribute('aria-live', 'polite');
      wrap.innerHTML = '<ul>' + toks.map(function (t) { return '<li>' + wordOf(t) + '</li>'; }).join('') + '</ul>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.RhymeShopActivity = RhymeShopActivity;

}(typeof window !== 'undefined' ? window : this));
