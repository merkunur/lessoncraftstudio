/* =====================================================================
   THE DOUBLING POND — ACTIVITY SKIN  (plural-activity.js)
   ---------------------------------------------------------------------
   L.2.1.b · irregular plural nouns — CLARITY-FIRST redesign of #79. The lcs-
   shell skin over plural-core.js. answerType:'state'. EN-ONLY-by-design (404).

   Pearl the pond-moon reflects the TRUE plural, never the lazy +s. Each round
   shows a singular noun; the child taps the correct plural from three chips —
   the correct irregular (feet), the +s overregularization (foots), and the
   unchanged singular (foot) [or, for no-change words, the +s/-es forms]. Correct
   = the chip string === the core's derived plural, DERIVED not stored. Correct →
   the singular → plural reveal + a note show + Pearl glows (resolve; shell Check
   hidden until `.lcs-app.pearl-resolved`). Wrong → a warm nudge, no advance.
   0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PluralCore;
  var LANG = 'en';

  var L = {
    en: {
      q: '{q}',
      win: 'Yes! {note}', winNote: 'a special word, not the lazy +s!',
      hear: '🔊 Hear it',
      nChange: '"{sing}" is a special word — it changes, and it does NOT just add an s. Look again!',
      nNoChange: '"{sing}" stays the SAME for many — don\'t add an s! Look again!',
      srMirror: '{q} The word is {sing}. Choices: {chips}.'
    },
    de: {
      q: '{q}',
      win: 'Ja! {note}', winNote: 'ein Umlaut-Wort – nicht unverändert und nicht einfach mit -s!',
      hear: '🔊 Anhören',
      nChange: '‚{sing}‘ ist ein besonderes Wort – es bekommt einen Umlaut. Schau noch mal!',
      nNoChange: '‚{sing}‘ bleibt gleich – häng kein -s an! Schau noch mal!',
      srMirror: '{q} Das Wort ist ‚{sing}‘. Auswahl: {chips}.'
    },
    fr: {
      q: '{q}',
      win: 'Oui ! {note}', winNote: 'un pluriel spécial — ni le mot inchangé, ni juste un -s !',
      hear: '🔊 Écoute',
      nChange: '« {sing} » est un mot spécial — son pluriel change. Regarde bien !',
      nNoChange: '« {sing} » ne prend pas juste un -s. Regarde encore !',
      srMirror: '{q} Le mot est « {sing} ». Choix : {chips}.'
    },
    es: {
      q: '{q}',
      win: '¡Sí! {note}', winNote: '¡el plural no era solo con -s!',
      hear: '🔊 Escúchalo',
      nChange: '«{sing}» es una palabra especial: cambia, y NO basta con agregarle una s. ¡Vuelve a mirar!',
      nNoChange: '«{sing}» se queda IGUAL para muchos. ¡No le agregues una s! Vuelve a mirar.',
      srMirror: '{q} La palabra es {sing}. Opciones: {chips}.'
    },
    pt: {
      q: '{q}',
      win: 'Isso! {note}', winNote: 'uma palavra especial, não é só juntar um s!',
      hear: '🔊 Ouvir',
      nChange: '“{sing}” é uma palavra especial — ela muda, e não é só juntar um s. Olhe de novo!',
      nNoChange: '“{sing}” fica IGUAL para muitas — não junte um s! Olhe de novo!',
      srMirror: '{q} A palavra é {sing}. Opções: {chips}.'
    },
    /* it (Indicazioni nazionali, classe seconda; strand «Language» → «Riflessione linguistica» via strand-names.ts):
       mascot «Perla» (localize «Pearl», fr/pt precedent). ⚠ THE +s FRAMING: Italian NEVER forms plurals with -s,
       so the hard-coded +s chip is the FOREIGN plural (amicos) — the nudge/win reframe it «in italiano il plurale
       non si fa con la -s: cambia in modo speciale». Quotes = «...» caporali. ⚠ «Qual è» NEVER «qual'è». */
    it: {
      q: '{q}',
      win: 'Sì! {note}', winNote: 'In italiano il plurale non si fa con la -s: cambia in modo speciale!',
      hear: '🔊 Ascolta',
      nChange: '«{sing}» è una parola speciale: cambia, e in italiano non si aggiunge la -s! Guarda di nuovo!',
      nNoChange: '«{sing}» resta uguale per tanti: non aggiungere la -s! Guarda di nuovo!',
      srMirror: '{q} La parola è «{sing}». Scelte: {chips}.'
    },
    /* nl (SLO-kerndoelen, Groep 4; leergebied Taal / meervoudsspelling; strand «Language» → «Taal» via
       strand-names.ts, GEEN override): mascotte «Parel» (localize «Pearl»). ⚠ Nederlands gebruikt WÉL -s voor
       een hele woordklasse (tafels, auto's), dus de framing is WOORD-SPECIFIEK — «dit woord krijgt een bijzonder
       meervoud, niet zomaar met -s», NOOIT «een meervoud is nooit -s». roundsL10n.nl = 9 bijzondere meervouden
       (3 verenkeling boom→bomen / 3 verdubbeling man→mannen / 1 f→v brief→brieven / 1 s→z huis→huizen / 1 -eren
       kind→kinderen); elk +s-tegel is een echt-fout niet-woord. Aanhalingstekens ‚…' = U+201A + U+2019 (veilig
       in JS single-quoted literals). GRADE Groep 4 auto (grade '2'). */
    nl: {
      q: '{q}',
      win: 'Ja! {note}', winNote: 'een bijzonder meervoud, niet zomaar met -s!',
      hear: '🔊 Beluisteren',
      nChange: '‘{sing}’ krijgt een bijzonder meervoud: je verandert iets in het woord en zet er niet zomaar een -s achter. Kijk nog eens!',
      nNoChange: '‘{sing}’ blijft hetzelfde — er komt geen -s bij! Kijk nog eens!',
      srMirror: '{q} Het woord is ‘{sing}’. Keuze: {chips}.'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function pearlSVG() {
    /* Pearl — a round pale pond-moon with a gentle face + a ripple */
    return '<svg class="pl-pearl-svg" viewBox="0 0 48 50" width="36" height="38" aria-hidden="true">' +
      '<circle cx="24" cy="20" r="18" fill="#FBEFC4" opacity=".4"/>' +   /* glow */
      '<circle cx="24" cy="20" r="13" fill="#FDF3D0" stroke="#D9C27A" stroke-width="1.8"/>' +
      '<circle cx="29" cy="15" r="2.4" fill="#F3E6B4"/><circle cx="19" cy="24" r="1.6" fill="#F3E6B4"/>' +   /* craters */
      '<g class="pl-eyes-open"><circle cx="20" cy="20" r="1.8" fill="#7A6A2A"/><circle cx="28" cy="20" r="1.8" fill="#7A6A2A"/></g>' +
      '<g class="pl-eyes-happy"><path d="M17.5 20 q2.5 -2.5 5 0" stroke="#7A6A2A" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M25.5 20 q2.5 -2.5 5 0" stroke="#7A6A2A" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M20 25 q4 3 8 0" stroke="#C7A94E" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M6 42 q9 -4 18 0 q9 4 18 0" stroke="#8FC3CF" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/></svg>';   /* pond ripple */
  }

  var PluralActivity = {
    id: 'plural-activity',
    strings: {
      title: { en: 'The Doubling Pond', de: 'Pearls Mehrzahl-Teich', fr: 'L’étang de Perle : les pluriels', es: 'El estanque de Pearl', pt: 'O Lago da Pérola', it: 'Lo stagno di Perla', nl: 'Parels meervoud-vijver' },
      instruction: { en: 'Pick the right plural — the special word, not the lazy +s!', de: 'Tippe die richtige Mehrzahl – das besondere Wort mit Umlaut, nicht einfach mit -s!', fr: 'Touche le bon pluriel — la forme spéciale, pas seulement un -s !', es: 'Elige el plural correcto: la palabra especial, ¡no siempre basta con -s!', pt: 'Escolha o plural certo — a palavra especial, não é só juntar um s!', it: 'Scegli il plurale giusto: la parola cambia in modo speciale, non con la -s!', nl: 'Tik op het juiste meervoud — dit woord krijgt een bijzonder meervoud, niet zomaar met -s!' },
      q: { en: '{q}', de: '{q}', fr: '{q}', pt: '{q}', it: '{q}', nl: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = null; this._chipOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('pl-style')) return;
      var s = el('style'); s.id = 'pl-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.pl-root{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;max-width:min(96vw,620px);margin:0 auto;}',
        '.pl-single{font:800 clamp(1.3rem,5.2vw,1.7rem)/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#2A3A36;}',
        '.pl-reveal{min-height:1.2em;font:800 clamp(1.15rem,4.8vw,1.6rem)/1.1 "Baloo 2",Nunito,sans-serif;color:#146B5E;}',
        '.pl-reveal .pl-arrow{color:#9a8a6a;margin:0 8px;}.pl-reveal .pl-plural{color:#C2410C;}',
        '.pl-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.pl-pearl{flex:0 0 auto;}',
        '.pl-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.22 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.pl-line-msg.miss{color:#C2410C;}',
        '.pl-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.pl-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;width:100%;}',
        '.pl-cand{display:flex;align-items:center;justify-content:center;text-align:center;padding:12px 20px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:52px;min-width:104px;font:800 clamp(1.05rem,4vw,1.28rem)/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.pl-cand.dim{opacity:.4;}',
        '.pl-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.pl-pearl-svg .pl-eyes-happy{display:none;}.pl-pearl[data-pose=happy] .pl-eyes-open{display:none;}.pl-pearl[data-pose=happy] .pl-eyes-happy{display:block;}',
        '.pl-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.pl-root{gap:7px;}.pl-single{font-size:1.2rem;}.pl-reveal{font-size:1.18rem;}.pl-cand{padding:10px 14px;min-width:88px;}}',
        '.lcs-app:not(.pearl-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'plural.irregular.l-2-1-b';
      var tries = ['/mini-tools/plural-activities.json', 'plural-activities.json', '../mini tools/plural-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds)) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var self = this, order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = self._shuffle(pool.map(function (_, i) { return i; })); }
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
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: round.q }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = null;
      this._chipOrder = this._shuffle(Core.chipStrings(round));   /* shuffle the 3 derived strings; position ≠ answer */
      if (this._app) this._app.classList.remove('pearl-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'pl-root');

      /* the singular (→ plural reveal on resolve) */
      if (this._resolved) {
        var rev = el('div', 'pl-reveal');
        var a = el('span'); a.textContent = round.singular;
        var ar = el('span', 'pl-arrow'); ar.textContent = '→';
        var p = el('span', 'pl-plural'); p.textContent = Core.derivePlural(round);
        rev.append(a, ar, p); root.appendChild(rev);
      } else {
        var sg = el('div', 'pl-single'); sg.textContent = round.singular; root.appendChild(sg);
      }

      /* Pearl + live line */
      var say = el('div', 'pl-say');
      var pr = el('div', 'pl-pearl'); pr.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); pr.innerHTML = pearlSVG();
      var msg = el('p', 'pl-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(pr, msg); root.appendChild(say); this._pearl = pr;

      /* Hear it */
      var self = this, hear = el('button', 'pl-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = LANG === 'de' ? ('Mehr als ein ‚' + round.singular + '‘. Welche Mehrzahl ist richtig?') : LANG === 'fr' ? ('Plus d’un « ' + round.singular + ' ». Quel est le bon pluriel ?') : LANG === 'es' ? ('«' + round.singular + '» en plural. ¿Cuál es el correcto?') : LANG === 'pt' ? ('Mais de um “' + round.singular + '”. Qual é o plural certo?') : LANG === 'it' ? ('Il plurale di «' + round.singular + '». Qual è quello giusto?') : LANG === 'nl' ? ('Meer dan één ' + round.singular + '. Welk meervoud is juist?') : ('More than one ' + round.singular + '. Which one is right?');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.92 }); } catch (e) { } }
      });
      root.appendChild(hear);

      this._renderChips(root, round);
      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _renderChips: function (root, round) {
      var self = this, tok = this._token;
      var strip = el('div', 'pl-strip');
      var order = this._chipOrder || Core.chipStrings(round);
      order.forEach(function (str) {
        var b = el('button', 'pl-cand' + (self._nonConf[str] ? ' dim' : '') + (self._lit === str ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-str', str);
        b.textContent = str;
        b.setAttribute('aria-label', str);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[str] || self._token !== tok) return;
          if (Core.isAnswer(round, str)) { self._lit = str; self._resolve(); }
          else { self._nonConf[str] = 1; self._nudge(round); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('pearl-resolved');
      this.render();
      var note = this._round.rule === 'no-change' ? (LANG === 'de' ? ('‚' + this._round.singular + '‘ bleibt gleich – schon viele!') : LANG === 'fr' ? ('« ' + this._round.singular + ' » ne change pas — déjà plusieurs !') : (this._round.singular + ' stays the same — already many!')) : txt('winNote');
      var line = this._api.stage.querySelector('.pl-line-msg');
      if (line) { line.textContent = txt('win', { note: note }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: note }));
    },
    _nudge: function (round) {
      var msgText = round.rule === 'no-change' ? txt('nNoChange', { sing: round.singular }) : txt('nChange', { sing: round.singular });
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.pl-line-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'pl-sronly'); wrap.setAttribute('aria-live', 'polite');
      var chips = Core.chipStrings(round).join(', ');
      wrap.innerHTML = '<p>' + txt('srMirror', { q: round.q, sing: round.singular, chips: chips }) + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.PluralActivity = PluralActivity;

}(typeof window !== 'undefined' ? window : this));
