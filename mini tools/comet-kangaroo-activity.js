/* =====================================================================
   COMET THE KANGAROO — ACTIVITY  (comet-kangaroo-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.NBT.B.8 — mentally add/subtract 10 or 100 (three-digit numbers).
   Comet the kangaroo makes BIG leaps along the numbers; the child reads the
   START number + the leap (10 or 100, more or less) and types where Comet
   lands on the shell keypad (answerType:'number'; the stage is display-only).
   Validity DERIVED by jump-tens-core.js (oracle = start+delta; never a stored
   result; the ones digit never changes). Per-pass reshuffle. Text + SVG char
   stub (CA5 later). No timer/score/streak. 0 lines to any core + lcs-shell.

   NOTE: this is the Grade-2 EXTENSION of the existing Grade-1 1.NBT.C.5 "Ten
   More, Ten Less" (which is ±10 on two-digit only). Comet adds 100-more/100-
   less AND three-digit numbers — hence "Big Leaps", a distinct surface.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.JumpTensCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A', SKY: '#EAF2EE' };

  var LANG = 'en';
  /* German hop rebuilt from childView's dir+deltaAbs (no core change); the core's hopWord is English */
  function ckgHop(v) { return LANG === 'de' ? (v.deltaAbs + (v.dir === 'more' ? ' mehr' : ' weniger')) : LANG === 'fr' ? (v.deltaAbs + (v.dir === 'more' ? ' de plus' : ' de moins')) : LANG === 'es' ? (v.deltaAbs + (v.dir === 'more' ? ' más' : ' menos')) : LANG === 'pt' ? (v.deltaAbs + (v.dir === 'more' ? ' a mais' : ' a menos')) : v.hop; }
  function ckgQuestion(v, full) {
    var h = ckgHop(v);
    return LANG === 'de' ? ((full ? 'Wie viel ist ' : '') + h + ' als ' + v.start + '?') : LANG === 'fr' ? ((full ? 'Combien font ' : '') + h + ' que ' + v.start + ' ?') : LANG === 'es' ? ((full ? '¿Cuánto es ' : '') + h + ' que ' + v.start + '?') : LANG === 'pt' ? ((full ? 'Quanto é ' : '') + h + ' que ' + v.start + '?') : ((full ? 'What is ' : '') + v.hop + ' than ' + v.start + '?');
  }

  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }

  function kangarooSVG() {
    return '<svg class="ckg-roo-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Komet das Känguru' : LANG === 'fr' ? 'Comète le kangourou' : LANG === 'es' ? 'Cometa el canguro' : LANG === 'pt' ? 'Cometa, o canguru' : 'Comet the kangaroo') + '">' +
      '<path d="M30 80 q-6 -2 -2 -10 q4 -2 10 2 Z" fill="#B06A38"/>' +              /* tail */
      '<ellipse cx="50" cy="64" rx="20" ry="18" fill="#C77E45"/>' +                 /* body */
      '<ellipse cx="50" cy="70" rx="12" ry="10" fill="#E6C39B"/>' +                 /* belly */
      '<path d="M40 80 q4 10 -4 12 q-3 -1 -3 -6 l3 -7 Z" fill="#B06A38"/>' +        /* leg */
      '<circle cx="64" cy="44" r="11" fill="#C77E45"/>' +                            /* head */
      '<path d="M60 34 q-3 -12 1 -14 q4 1 3 13 Z" fill="#C77E45"/>' +               /* ear */
      '<path d="M68 34 q3 -12 -1 -14 q-4 1 -3 13 Z" fill="#C77E45"/>' +             /* ear */
      '<circle cx="67" cy="43" r="2.4" fill="#2A2A35"/>' +                           /* eye */
      '<path d="M73 46 l5 1 l-5 2 Z" fill="#8A4F28"/>' +                             /* snout */
      '</svg>';
  }

  global.CometKangarooActivity = {
    id: 'comet-kangaroo-activity',

    strings: {
      title: { en: "Comet the Kangaroo", de: 'Komet das Känguru', fr: 'Comète le kangourou', es: 'Cometa el canguro', pt: 'Cometa, o canguru' },
      instruction: { en: 'Comet makes a big leap of 10 or 100. Work out where she lands and type the number.', de: 'Komet macht einen großen Sprung von 10 oder 100. Finde heraus, wo es landet, und tippe die Zahl ein.', fr: 'Comète fait un grand bond de 10 ou 100. Trouve où elle atterrit et tape le nombre.', es: 'Cometa da un gran salto de 10 o de 100. Descubre dónde cae y escribe el número.', pt: 'O Cometa dá um grande salto de 10 ou de 100. Descubra onde ele cai e digite o número.' },
      prompt: { en: 'What is {hop} than {start}?', de: 'Wie viel ist {hop} als {start}?', fr: 'Combien font {hop} que {start} ?', es: '¿Cuánto es {hop} que {start}?', pt: 'Quanto é {hop} que {start}?' },
      hint: { en: 'Only the tens or hundreds change — the ones digit stays the same.', de: 'Nur die Zehner oder die Hunderter ändern sich – die Einer bleiben gleich.', fr: 'Seuls les dizaines ou les centaines changent — le chiffre des unités reste le même.', es: 'Solo cambian las decenas o las centenas; las unidades se quedan igual.', pt: 'Só mudam as dezenas ou as centenas; as unidades ficam iguais.' }
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
      var wrap = api.el('div', 'ckg-wrap'); var root = api.el('div', 'ckg-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var v = this.view, self = this;
      var moreClass = v.dir === 'more' ? ' ckg-up' : ' ckg-down';

      var row = api.el('div', 'ckg-row');
      var roo = api.el('div', 'ckg-roo'); roo.innerHTML = kangarooSVG(); row.appendChild(roo);

      var line = api.el('div', 'ckg-line');
      var startN = api.el('div', 'ckg-node ckg-start'); startN.textContent = String(v.start); line.appendChild(startN);
      var hop = api.el('div', 'ckg-hop' + moreClass);
      var hopArrow = api.el('div', 'ckg-arrow'); hopArrow.textContent = v.dir === 'more' ? '↗' : '↘'; hop.appendChild(hopArrow);
      var hopLabel = api.el('div', 'ckg-hoplabel'); hopLabel.textContent = (v.dir === 'more' ? '+' : '−') + v.deltaAbs; hop.appendChild(hopLabel);
      line.appendChild(hop);
      var endN = api.el('div', 'ckg-node ckg-end'); endN.textContent = '?'; line.appendChild(endN);
      row.appendChild(line);
      root.appendChild(row);

      var read = api.el('button', 'ckg-read'); read.type = 'button'; read.setAttribute('aria-label', LANG === 'de' ? 'Frage anhören' : LANG === 'fr' ? 'écouter la question' : LANG === 'es' ? 'escuchar la pregunta' : LANG === 'pt' ? 'ouvir a pergunta' : 'hear the question');
      read.innerHTML = '<span class="ckg-read-ic">🔊</span> ' + ckgQuestion(v, false);
      read.addEventListener('click', function () { speak(ckgQuestion(v, true)); });
      root.appendChild(read);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(ckgQuestion(v, true)); }, 320); }
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
      fetch('/mini-tools/comet-kangaroo-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[comet-kangaroo] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ckg-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.ckg-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,2vw,12px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(9px,2.2vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.ckg-row{display:flex;align-items:center;gap:clamp(8px,2.4vw,16px);justify-content:center;flex-wrap:wrap;}'
        + '.ckg-roo{width:clamp(48px,11vw,64px);flex:0 0 auto;}.ckg-roo-svg{width:100%;height:auto;display:block;}'
        + '.ckg-line{display:flex;align-items:center;gap:clamp(6px,1.8vw,12px);}'
        + '.ckg-node{min-width:clamp(56px,15vw,82px);text-align:center;border-radius:14px;padding:clamp(8px,2vw,14px) clamp(6px,1.6vw,12px);font:800 clamp(24px,7vw,38px)/1 "Baloo 2",sans-serif;}'
        + '.ckg-start{background:#fff;border:3px solid ' + C.GOLD + ';color:' + C.INK + ';}'
        + '.ckg-end{background:#FFF6F1;border:3px dashed ' + C.CORAL + ';color:' + C.CORAL2 + ';}'
        + '.ckg-hop{display:flex;flex-direction:column;align-items:center;gap:2px;}'
        + '.ckg-arrow{font-size:clamp(20px,5.5vw,30px);line-height:1;}'
        + '.ckg-up .ckg-arrow{color:' + C.T + ';}.ckg-down .ckg-arrow{color:' + C.CORAL2 + ';}'
        + '.ckg-hoplabel{font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;padding:3px 9px;border-radius:10px;background:' + C.SKY + ';color:' + C.T + ';}'
        + '.ckg-down .ckg-hoplabel{background:#FBE7DE;color:' + C.CORAL2 + ';}'
        + '.ckg-read{display:inline-flex;align-items:center;gap:7px;border:2px solid rgba(20,107,94,.22);background:#FFFDF6;border-radius:13px;padding:8px 14px;font:700 clamp(13px,3.3vw,16px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';cursor:pointer;touch-action:manipulation;}'
        + '.ckg-read-ic{font-size:16px;}'
        + '.ckg-read:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.ckg-root{gap:clamp(5px,1.4vw,9px);}.ckg-roo{width:clamp(44px,8vw,54px);}.ckg-node{font-size:clamp(22px,6vw,32px);}}'
        + '@media (max-height:700px){.ckg-root{gap:5px;padding:9px;}.ckg-roo{width:clamp(40px,7vw,48px);}.ckg-node{font-size:26px;padding:8px 8px;}.ckg-read{padding:7px 11px;font-size:13px;}}'
        + '@media (max-height:640px){.ckg-root{gap:4px;padding:7px;}.ckg-roo{display:none;}.ckg-node{font-size:24px;}}'
        + '@media (max-width:380px){.ckg-node{min-width:54px;font-size:24px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-comet-kangaroo', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round, i) {
      return {
        id: 'comet-kangaroo.round-' + i, band: round.band || 1,
        promptKey: 'prompt', promptArgs: { hop: (LANG === 'de' ? (Math.abs(round.delta) + (round.delta > 0 ? ' mehr' : ' weniger')) : LANG === 'fr' ? (Math.abs(round.delta) + (round.delta > 0 ? ' de plus' : ' de moins')) : LANG === 'es' ? (Math.abs(round.delta) + (round.delta > 0 ? ' más' : ' menos')) : LANG === 'pt' ? (Math.abs(round.delta) + (round.delta > 0 ? ' a mais' : ' a menos')) : Core.hopWord(round)), start: round.start },
        answerType: 'number', answerMin: 0, answerMax: 1000,
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
