/* =====================================================================
   THE WOBBLE MUSEUM — ACTIVITY SKIN  (wobble-museum-activity.js)
   ---------------------------------------------------------------------
   W.K.2 · informative-writing topic focus (catch-the-drift) — CLARITY-FIRST
   redesign of #85, the program's FIRST writing game. The lcs-shell skin over
   wobble-museum-core.js. answerType:'state'. EN-ONLY-by-design (404).

   Bram the magpie keeps a museum where every room is about ONE thing. Each round
   shows a room-sign ("This room is all about frogs.") + 4 short fact sentences
   (3 on-topic + 1 off-topic-but-TRUE). The child taps the sentence that wandered
   in. Correct = the tapped line is the drift (about !== topic), DERIVED not
   stored. Correct → the line glows + a "for-later" note + Bram happy (resolve;
   shell Check hidden until `.lcs-app.bram-resolved`). Wrong → a warm nudge, no
   advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.WobbleMuseumCore;
  var LANG = 'en';

  var L = {
    en: {
      q: 'What wandered in?',
      sign: 'This room is all about {topic}.',
      win: 'Yes! That is true — but it is a {about} fact. It wandered in!',
      hear: '🔊 Hear',
      nudge: 'That one IS about {topic} — it belongs here! Find the label that wandered in.'
    },
    de: {
      q: 'Welcher Satz passt nicht zum Thema?',
      sign: 'Thema: {topic}',
      win: 'Richtig! Der Satz stimmt zwar, aber er gehört zum Thema {about}. Er ist hier reingewandert!',
      hear: '🔊 Vorlesen',
      nudge: 'Der Satz gehört zum Thema {topic} – er passt hierher. Suche den Satz, der reingewandert ist!'
    },
    fr: {
      q: 'Quelle phrase s’est trompée de salle ?',
      sign: 'Le thème de cette salle : {topic}.',
      win: 'Oui ! C’est vrai, mais c’est une info sur {about}. Elle s’est trompée de salle !',
      hear: '🔊 Écouter',
      nudge: 'Non, cette phrase est dans la bonne salle : {topic}. Cherche celle qui s’est trompée !'
    },
    es: {
      q: '¿Cuál oración no va con el tema?',
      sign: 'Tema: {topic}',
      win: '¡Muy bien! Es cierto, pero se coló del tema {about}.',
      hear: '🔊 Escuchar',
      nudge: 'Esa sí es del tema {topic}. Busca la que se coló.'
    },
    /* pt-BR. §A.13.54: win/nudge agreement is anchored on «a frase» (fixed feminine) —
       «essa frase»/«a que entrou» stay feminine-singular no matter what topic the room names.
       BR curly quotes; você-form; 🔊 Ouvir. */
    pt: {
      q: 'Qual frase não é do tema?',
      sign: 'Tema: {topic}',
      win: 'Isso! É verdade, mas essa frase é sobre {about}. Ela entrou na sala errada!',
      hear: '🔊 Ouvir',
      nudge: 'Essa é do tema {topic}, ela pertence aqui! Ache a que entrou na sala errada.'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function bramSVG() {
    /* Bram — a magpie curator (black + white, long tail, tiny glasses + bow tie) */
    return '<svg class="wm-bram-svg" viewBox="0 0 54 52" width="40" height="38" aria-hidden="true">' +
      '<path d="M30 30 q16 4 20 18 q-14 -2 -22 -10z" fill="#2B2B3A"/>' +   /* long tail */
      '<ellipse cx="24" cy="30" rx="13" ry="13" fill="#F3F1EC" stroke="#2B2B3A" stroke-width="2"/>' +
      '<path d="M24 18 a13 13 0 0 1 13 12 a13 13 0 0 1 -13 1z" fill="#2B2B3A"/>' +   /* dark back/wing */
      '<circle cx="20" cy="16" r="8" fill="#2B2B3A"/>' +   /* head */
      '<path d="M12 16 l-8 2 l8 2z" fill="#E8A93A" stroke="#C2790F" stroke-width="1"/>' +   /* beak */
      '<g class="wm-eyes-open"><circle cx="18" cy="15" r="2.2" fill="#fff"/><circle cx="18" cy="15" r="1.2" fill="#2B2B2B"/></g>' +
      '<g class="wm-eyes-happy"><path d="M15.5 15 q2.5 -2.5 5 0" stroke="#fff" stroke-width="1.9" fill="none" stroke-linecap="round"/></g>' +
      '<circle cx="18" cy="15" r="5" fill="none" stroke="#C7B36A" stroke-width="1.2"/>' +   /* glasses ring */
      '<path d="M20 38 l4 -3 l4 3 l-4 2z" fill="#F2784B"/></svg>';   /* bow tie */
  }

  var WobbleMuseumActivity = {
    id: 'wobble-museum-activity',
    strings: {
      title: { en: 'The Wobble Museum', de: 'Brams Themen-Museum', fr: 'Le musée de Bram', es: 'El museo de temas de Ula', pt: 'O museu de temas da Prata' },
      instruction: { en: 'Every room is about ONE thing. Tap the fact that wandered in!', de: 'In jedem Raum geht es um EIN Thema. Ein Satz ist reingewandert und passt nicht dazu. Tippe ihn an!', fr: 'Chaque salle parle d’UNE seule chose. Touche la phrase qui s’est trompée de salle !', es: 'Ula la urraca ordenó su museo: cada sala tiene un solo tema. Pero una oración se coló y no va con las demás. Tócala para sacarla del museo.', pt: 'A pega Prata é a curadora deste museu, e ela adora coisas brilhantes! Cada sala tem um só tema. Mas uma frase entrou na sala errada. Toque na frase que não é do tema.' },
      q: { en: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = -1; this._lineOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('wm-style')) return;
      var s = el('style'); s.id = 'wm-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.wm-root{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:min(96vw,640px);margin:0 auto;}',
        '.wm-sign{width:100%;text-align:center;font:800 clamp(.98rem,3.8vw,1.2rem)/1.18 "Baloo 2",Nunito,system-ui,sans-serif;color:#0F4A40;background:#EAF4F1;border:2.5px solid #146B5E;border-radius:12px;padding:5px 12px;}',
        '.wm-lines{display:flex;flex-direction:column;gap:5px;width:100%;}',
        '.wm-line{display:flex;align-items:center;justify-content:center;text-align:center;padding:7px 14px;border:3px solid #C9B98E;border-radius:12px;background:#FFFDF6;cursor:pointer;min-height:44px;font:700 clamp(.94rem,3.6vw,1.08rem)/1.18 Nunito,system-ui,sans-serif;color:#2A3A36;}',
        '.wm-line.dim{opacity:.4;}',
        '.wm-line.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.wm-say{display:flex;align-items:center;gap:7px;width:100%;}',
        '.wm-bram{flex:0 0 auto;}',
        '.wm-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .84rem/1.16 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.wm-line-msg.miss{color:#C2410C;}',
        '.wm-hear{flex:0 0 auto;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .8rem/1 Nunito,sans-serif;padding:6px 14px;min-height:44px;cursor:pointer;}',
        '.wm-bram-svg .wm-eyes-happy{display:none;}.wm-bram[data-pose=happy] .wm-eyes-open{display:none;}.wm-bram[data-pose=happy] .wm-eyes-happy{display:block;}',
        '.wm-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.wm-root{gap:5px;}.wm-sign{padding:4px 10px;font-size:.94rem;}.wm-lines{gap:4px;}.wm-line{padding:5px 10px;min-height:44px;font-size:.92rem;}.wm-say{gap:6px;}}',
        '@media (max-width:340px){.wm-hear{display:none;}}',
        '.lcs-app:not(.bram-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'wobble-museum.catch-drift.w-k-2';
      var tries = ['/mini-tools/wobble-museum-activities.json', 'wobble-museum-activities.json', '../mini tools/wobble-museum-activities.json'];
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
        id: round.id, promptKey: 'q', promptArgs: { q: txt('q') }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = -1;
      this._lineOrder = this._shuffle((round.sentences || []).map(function (_, i) { return i; }));   /* shuffle row display so drift position ≠ answer */
      if (this._app) this._app.classList.remove('bram-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'wm-root');

      var sign = el('div', 'wm-sign'); sign.textContent = txt('sign', { topic: round.topic }); root.appendChild(sign);

      var self = this, tok = this._token;
      var lines = el('div', 'wm-lines');
      var order = this._lineOrder || (round.sentences || []).map(function (_, i) { return i; });
      order.forEach(function (oi) {
        var sObj = round.sentences[oi];
        var b = el('button', 'wm-line' + (self._nonConf[oi] ? ' dim' : '') + (self._lit === oi ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-oi', oi); b.textContent = sObj.text;
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[oi] || self._token !== tok) return;
          if (Core.isDrift(round, oi)) { self._lit = oi; self._resolve(); }
          else { self._nonConf[oi] = 1; self._nudge(round); }
        });
        lines.appendChild(b);
      });
      root.appendChild(lines);

      /* Bram + live msg + Hear all in ONE compact footer row (saves a row of fold budget) */
      var say = el('div', 'wm-say');
      var br = el('div', 'wm-bram'); br.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); br.innerHTML = bramSVG();
      var msg = el('p', 'wm-line-msg'); msg.setAttribute('aria-live', 'polite');
      var hear = el('button', 'wm-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = txt('sign', { topic: round.topic }) + ' ' + (round.sentences || []).map(function (x) { return x.text; }).join(' ');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.92 }); } catch (e) { } }
      });
      say.append(br, msg, hear); root.appendChild(say); this._bram = br;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('bram-resolved');
      this.render();
      var line = this._api.stage.querySelector('.wm-line-msg');
      var note = txt('win', { about: Core.driftAbout(this._round) });
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function (round) {
      var msgText = txt('nudge', { topic: round.topic });
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.wm-line-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'wm-sronly'); wrap.setAttribute('aria-live', 'polite');
      var facts = (round.sentences || []).map(function (x) { return x.text; }).join(' ');
      wrap.innerHTML = '<p>' + txt('sign', { topic: round.topic }) + ' ' + facts + ' ' + txt('q') + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.WobbleMuseumActivity = WobbleMuseumActivity;

}(typeof window !== 'undefined' ? window : this));
