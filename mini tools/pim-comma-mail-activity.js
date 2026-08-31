/* =====================================================================
   PIM'S COMMA MAIL — ACTIVITY  (pim-comma-mail-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.2.b — commas in the greeting & closing of a letter. Pim the carrier
   pigeon delivers letters; the child taps the correctly-comma'd greeting/closing.
   Validity DERIVED by letter-comma-core.js (the form whose ok flag is set; the
   misplaced-comma foil is length-matched so the correct card is never the unique
   longest). answerType:'state' tap-a-card + shell Check; cards shuffle. Text +
   SVG art only — no image-library, no audio dependency. No timer/score/streak.
   0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.LetterCommaCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', SKY: '#6FA8DC' };
  var LANG = 'en';

  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function pigeonSVG() {
    return '<svg class="pcm-pig-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Pim, le pigeon voyageur' : LANG === 'de' ? 'Pim, die Taube' : LANG === 'es' ? 'Pim, la paloma mensajera' : LANG === 'pt' ? 'Pim, o pombo-correio' : LANG === 'it' ? 'Pim, il piccione' : LANG === 'nl' ? 'Pim, de postduif' : 'Pim the pigeon') + '">' +
      '<ellipse cx="48" cy="58" rx="22" ry="18" fill="#A9C0D8"/>' +                /* body */
      '<circle cx="70" cy="44" r="12" fill="#BBD0E4"/>' +                          /* head */
      '<circle cx="73" cy="42" r="2.3" fill="#2A2A35"/>' +                         /* eye */
      '<path d="M82 44 l9 2 l-9 3 z" fill="#F2A03A"/>' +                           /* beak */
      '<path d="M30 54 q-12 4 -6 16 q10 -2 16 -8z" fill="#8FA9C0"/>' +            /* wing */
      '<rect x="40" y="62" width="20" height="13" rx="2" fill="#fff" stroke="#C9B79A" stroke-width="1.6"/>' + /* a tiny envelope */
      '<path d="M40 62 l10 7 l10 -7" fill="none" stroke="#C9B79A" stroke-width="1.4"/>' +
      '<path d="M40 84 l5 6 M56 84 l5 6" stroke="#F2A03A" stroke-width="3" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.PimCommaMailActivity = {
    id: 'pim-comma-mail-activity',

    strings: {
      /* es-MX — a REBUILD, not a localization. Spanish greetings take DOS PUNTOS, not a
         comma: «Querida abuela:» (RAE, Ortografía §3.4.3, which volunteers that the comma
         there is «costumbre anglosajona, que debe evitarse»). The despedida DOES take a
         comma. So the en/de/fr target is an ERROR in Spanish, and our foil «Querida
         abuela,» is literally the string the other three locales teach as correct.
         ⚠ Kid term = «los dos puntos» — NEVER «el colon» (an anglicism AND the intestine).
         «el saludo»/«la despedida» are SEP's own words. NEVER «dos puntos y coma» (reads
         as *punto y coma* «;») — the «o» in the title is load-bearing.
         ⚠⚠ PIM IS GRAMMATICALLY FEMININE («la paloma»). The de `win` above says „Pim ist
         STOLZ auf dich!" — copying that shape here yields «Pim está orgulloso» = WRONG.
         Every es Pim string carries ZERO adjectives (verb phrases only).
         §A.13.54: `promptArgs: {}` — the engine injects no noun into any string, so there
         is nothing to anchor; the risks closed are Pim-adjectives + gendering the child. */
      /* pt-BR — a REBUILD: BR greetings + closings take a COMMA (the colon is formal-only in BR:
         «Prezados Senhores:»; a warm K-3 letter uses the comma). Diverges from es (colon); like de on
         the greeting AND — unlike de — takes a comma on the closing too. Pim KEPT (2 phonemes, readable);
         gender fixed MASCULINE «o pombo-correio». §A.13.54: win carries ZERO adjective (verb phrase only). */
      /* it: Italian personal letters take a COMMA at the END of BOTH the greeting («Caro Nonno,»)
         and the closing («Un abbraccio,») — like en/fr/pt, NOT the es colon, NOT the de no-comma
         closing → MIXED deck. ⚠ APOSTROPHE-free (avoid «L'apertura»/«l'» → «Il saluto»/«il tuo
         amico»). §A.13.54: Pim = «il piccione» (masc); win anchors on «la virgola», never genders
         the child (NO «Bravo/Brava»). ⚠ pimIntro ≤48 chars (line-clamp:2 TEXT-CLIP gate). labels
         name the letter part, NEVER the mark (would leak the answer). */
      title: { en: "Pim's Comma Mail", de: 'Pims Komma-Post', fr: 'La poste aux virgules de Pim', es: 'El correo de Pim: dos puntos o coma', pt: 'O correio do Pim: a vírgula certa', it: 'La posta delle virgole di Pim', nl: 'De kommapost van Pim' },
      instruction: { en: 'Tap the greeting or closing that has its comma in the right place.', de: 'Tipp die Karte an, bei der das Komma richtig steht.', fr: 'Touche l’appel ou la formule d’amitié dont la virgule est à la bonne place.', es: 'Toca la tarjeta con la puntuación correcta.', pt: 'Toque na carta com a pontuação no lugar certo.', it: 'Tocca la carta con la virgola al posto giusto.', nl: 'Tik op de aanhef of afsluiting met de komma op de goede plek.' },
      promptGreeting: { en: 'Which is the right way to START the letter?', de: 'Wie beginnt der Brief richtig?', fr: 'Comment bien commencer la lettre ?', es: '¿Cómo empieza bien la carta?', pt: 'Qual é o jeito certo de COMEÇAR a carta?', it: 'Come si comincia bene la lettera?', nl: 'Hoe begin je de brief goed?' },
      promptClosing: { en: 'Which is the right way to END the letter?', de: 'Wie endet der Brief richtig?', fr: 'Comment bien terminer la lettre ?', es: '¿Cómo termina bien la carta?', pt: 'Qual é o jeito certo de TERMINAR a carta?', it: 'Come si finisce bene la lettera?', nl: 'Hoe eindig je de brief goed?' },
      /* ⚠ `.pcm-say` is `-webkit-line-clamp:2` + `overflow:hidden` → anything past 2 lines
         is SILENTLY CLIPPED. The clamp is BY DESIGN, so the node reports no overflow and
         its box is the intended size — the copy just vanishes. This is now MEASURED by
         `visual-qa-activity.js`'s TEXT-CLIP gate (scrollHeight > clientHeight), added
         2026-07-15 precisely because nothing else could see it.
         Measured envelope (full sweep × 8 rounds): en 48 ✓ · es 45 ✓ · fr 50 ✓ · de ≤45.
         de was 65 ch and DID clip — 16px (a whole line) hidden at 360, cut mid-word at
         "zuzuste…", failing 8/48 renders. Curiously it passed at 320: the row re-flows
         there and the bubble gets more width, so 360 (the commonest phone) was the ONLY
         break. Now 44 ch. ⚠ The char limit is a per-locale PROXY for rendered width, not
         a transferable rule — German runs wide with long unbreakable tokens, so it keeps
         a tighter budget than fr's 50. If you change a string here, re-run the gate. */
      /* ⚠ `austragen`, NOT `zustellen` (Amtsdeutsch: Zustellung/Zusteller — no 8-year-old
         says it). `die Post austragen` is the collocation a German child owns, and it
         echoes the title "Pims Komma-Post". Dropping ", die Taube" is grammatically free
         in German (Pim is a name; `stolz` in `win` is predicative → never inflects) — and
         costs nothing: the pigeon SVG's aria-label (:22) still carries "Pim, die Taube".
         🚩 ANTI-CUE, the real reason this string changed: "Ich bin Pim, die Taube!" put a
         comma after the opening word before a noun phrase — the SAME visual shape as the
         WRONG foil "Liebe, Oma" — sitting permanently above the cards while `hintWrong`
         says the comma must not be "mittendrin". Do not reintroduce that shape here.
         ⚠ de must NOT state the rule (the en/fr shape): the de foils include a BARE
         no-comma "Liebe Oma", so a rule-stating bubble would eliminate a foil for free.
         Self-intro + call-to-action leaks nothing. */
      pimIntro: { en: 'A letter needs its comma in just the right spot!', de: 'Ich bin Pim! Hilf mir, die Post auszutragen.', fr: 'Une lettre a besoin de sa virgule au bon endroit !', es: 'Soy Pim. ¡Ayúdame a entregar bien las cartas!', pt: 'Sou o Pim! Me ajude a entregar as cartas.', it: 'Sono Pim! Aiutami a consegnare la posta.', nl: 'Ik ben Pim! Help mij de post rond te brengen.' },
      /* ⚠ the labels are ALWAYS visible — they must NOT name the mark, or they leak the answer. */
      labelGreeting: { en: '✉️ The greeting', de: '✉️ Die Anrede', fr: '✉️ Le début de la lettre', es: '✉️ El saludo', pt: '✉️ A saudação', it: '✉️ Il saluto', nl: '✉️ De aanhef' },
      /* 🚩 `de.labelClosing` is DEAD — the de deck is Anrede-only (8 greeting / 0 closing;
         en+fr are 4/4, es 5/3). That is CORRECT, not an omission: the German Grußformel
         takes NO comma ("Viele Grüße" ⏎ name, DIN 5008), so a de closing round is
         unbuildable in this 3-foil shape. ⚠ Do NOT "complete" the de deck with closing
         rounds — it would teach a comma German does not use. (Same reason `de.hintWrong`
         names only the Anrede and does NOT state both halves: the other half never
         renders. It is right as shipped — do not "fix" it.) */
      labelClosing: { en: '✉️ The closing', de: '✉️ Der Gruß', fr: '✉️ La fin de la lettre', es: '✉️ La despedida', pt: '✉️ A despedida', it: '✉️ La chiusura', nl: '✉️ De afsluiting' },
      hintPick: { en: 'The greeting and the closing each end with a comma.', de: 'Schau genau hin, wo das Komma bei der Anrede steht.', fr: 'Le début et la fin de la lettre se terminent chacun par une virgule.', es: 'El saludo termina con dos puntos. La despedida termina con coma.', pt: 'A saudação e a despedida terminam com vírgula.', it: 'Il saluto e la chiusura finiscono con una virgola.', nl: 'De aanhef en de afsluiting eindigen allebei met een komma.' },
      /* hintKey returns ONE shared key for both kinds → hintWrong must state both halves. */
      hintWrong: { en: 'Look at where the comma sits — it goes at the end.', de: 'Fast! Das Komma steht ganz am Ende der Anrede, nicht mittendrin.', fr: 'Regarde bien où se trouve la virgule : elle se place tout à la fin.', es: 'Casi. Fíjate en el signo del final: el saludo lleva dos puntos y la despedida lleva coma.', pt: 'Olhe de novo — onde entra a vírgula?', it: 'Guarda dove sta la virgola: va alla fine.', nl: 'Kijk waar de komma staat — die hoort aan het eind.' },
      win: { en: 'Yes! The comma is in the right spot. 🕊️', de: 'Super! Du weißt genau, wo das Komma hingehört. Pim ist stolz auf dich!', fr: 'Bravo ! La virgule est à la bonne place. 🕊️', es: '¡Muy bien! Ya sabes dónde van los dos puntos y dónde va la coma. Pim ya puede entregar la carta.', pt: 'Isso! A carta já pode voar! 🕊️', it: 'Sì! La virgola è al posto giusto. 🕊️', nl: 'Ja! De komma staat op de goede plek. 🕊️' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null;
      this._cards = shuffle(this.view.forms.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pcm-wrap'); var root = api.el('div', 'pcm-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'pcm-row');
      var pig = api.el('div', 'pcm-pig'); pig.innerHTML = pigeonSVG(); row.appendChild(pig);
      var say = api.el('div', 'pcm-say'); say.textContent = api.t('pimIntro'); row.appendChild(say);
      root.appendChild(row);

      var lab = api.el('div', 'pcm-letterlab'); lab.textContent = api.t(v.kind === 'greeting' ? 'labelGreeting' : 'labelClosing'); root.appendChild(lab);

      var opts = api.el('div', 'pcm-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'pcm-opt' + (self.sel === o.id ? ' pcm-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.text);
        b.textContent = o.text;
        b.addEventListener('click', function () { self._tap(o.id); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(560); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
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
      fetch('/mini-tools/pim-comma-mail-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[pim-comma-mail] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pcm-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.pcm-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(9px,2.2vw,14px);background:linear-gradient(180deg,#FBF3E4,#E9F0F6);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(100,130,160,.1);}'
        + '.pcm-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.pcm-pig{width:clamp(46px,10vw,60px);flex:0 0 auto;}.pcm-pig-svg{width:100%;height:auto;display:block;}'
        + '.pcm-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.pcm-letterlab{font:800 clamp(12px,3vw,15px)/1 "Baloo 2",sans-serif;color:' + C.SKY + ';background:#fff;border:2px solid rgba(111,168,220,.35);border-radius:11px;padding:6px 14px;}'
        + '.pcm-opts{display:flex;flex-direction:column;gap:clamp(8px,2.2vw,12px);align-items:stretch;width:100%;max-width:320px;}'
        + '.pcm-opt{min-height:54px;padding:13px 18px;border-radius:13px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:800 clamp(18px,4.8vw,23px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(120,120,90,.16);touch-action:manipulation;text-align:center;}'
        + '.pcm-opt.pcm-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.pcm-opt:active{transform:translateY(1px);}'
        + '.pcm-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.pcm-root{gap:clamp(7px,1.7vw,11px);}.pcm-pig{width:clamp(42px,8vw,52px);}.pcm-opt{min-height:50px;}}'
        + '@media (max-height:700px){.pcm-root{gap:7px;padding:12px;}.pcm-row{display:none;}.pcm-opt{min-height:46px;padding:10px 15px;font-size:19px;}}'
        + '@media (max-height:640px){.pcm-root{gap:6px;padding:10px;}.pcm-letterlab{padding:4px 11px;}.pcm-opt{min-height:44px;padding:9px 14px;font-size:18px;}}'
        + '@media (max-width:380px){.pcm-opt{font-size:18px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-pim-comma-mail', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'pim-comma-mail.' + round.id, band: round.band || 1, promptKey: round.kind === 'greeting' ? 'promptGreeting' : 'promptClosing', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel != null ? 'hintWrong' : 'hintPick'; }
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
