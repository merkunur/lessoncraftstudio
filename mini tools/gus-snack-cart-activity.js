/* =====================================================================
   GUS'S SNACK CART — ACTIVITY  (gus-snack-cart-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.NBT.B.5 — fluently add & subtract within 100. Gus the gopher restocks
   and sells; the child reads a little story + number sentence and types the
   answer on the shell keypad. Validity DERIVED by add-sub-100-core.js
   (answer = a+b or a−b). answerType:'number' (shell renders the keypad; this
   tool's stage = the story + big number sentence). On correct, the "?" reveals
   the answer. SVG/drawn art only — no image-library, no audio dependency. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.AddSub100Core;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A', GREEN: '#2FA56A' };

  var LANG = 'en';

  function gopherSVG() {
    return '<svg class="gsc-go-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'es' ? 'Gus la ardilla' : LANG === 'pt' ? 'Gus o esquilo' : 'Gus the gopher') + '">' +
      '<ellipse cx="50" cy="64" rx="22" ry="22" fill="#B98A5E"/>' +                /* body */
      '<circle cx="50" cy="36" r="16" fill="#CBA070"/>' +                          /* head */
      '<circle cx="38" cy="24" r="6" fill="#CBA070"/><circle cx="62" cy="24" r="6" fill="#CBA070"/>' + /* ears */
      '<circle cx="44" cy="35" r="2.4" fill="#2A2A35"/><circle cx="56" cy="35" r="2.4" fill="#2A2A35"/>' + /* eyes */
      '<ellipse cx="50" cy="42" rx="4" ry="3" fill="#7A5638"/>' +                  /* nose/muzzle */
      '<rect x="46" y="44" width="3" height="6" rx="1.2" fill="#fff"/><rect x="51" y="44" width="3" height="6" rx="1.2" fill="#fff"/>' + /* teeth */
      '<path d="M36 60 q-9 5 -3 14 M64 60 q9 5 3 14" stroke="#A87B50" stroke-width="5" stroke-linecap="round" fill="none"/>' + /* arms */
      '</svg>';
  }

  global.GusSnackCartActivity = {
    id: 'gus-snack-cart-activity',

    strings: {
      title: { en: "Gus's Snack Cart", de: "Gus' Snackwagen", fr: 'Le stand de snacks de Gus', es: 'El carrito de Gus', pt: 'O carrinho de lanches do Gus' },
      instruction: { en: 'Add or subtract within 100 and type the answer.', de: 'Rechne plus oder minus bis 100 und tippe die Antwort ein.', fr: 'Additionne ou soustrais jusqu’à 100, puis tape la réponse.', es: 'Suma o resta hasta 100 y escribe la respuesta.', pt: 'Some ou subtraia até 100 e escreva a resposta.' },
      prompt: { en: 'Add or subtract. Type the answer below.', de: 'Rechne plus oder minus. Tippe die Antwort unten ein.', fr: 'Additionne ou soustrais.', es: 'Suma o resta. Escribe tu respuesta abajo.', pt: 'Some ou subtraia. Digite a resposta.' },
      gusIntro: { en: 'Help Gus count his snacks — add what he gets, take away what he sells!', de: 'Hilf Gus, seine Snacks zu zählen – rechne dazu, was er bekommt, und weg, was er verkauft!', fr: 'Aide Gus à compter ses snacks — ajoute ce qu’il récolte, enlève ce qu’il vend !', es: '¡Ayúdale a Gus a contar sus botanas: suma lo que recibe y quita lo que vende!', pt: 'Ajude o Gus a contar os lanches: some o que chega e tire o que ele vende!' },
      hintAdd: { en: 'He got MORE — add the two numbers together.', de: 'Er hat MEHR bekommen – zähle die beiden Zahlen zusammen.', fr: 'Il en a eu PLUS — additionne les deux nombres.', es: 'Recibió MÁS: suma los dos números.', pt: 'Recebeu MAIS: some os dois números.' },
      hintSub: { en: 'Some are gone — take the second number away.', de: 'Einige sind weg – ziehe die zweite Zahl ab.', fr: 'Il en manque — enlève le second nombre.', es: 'Ya vendió algunas: resta el segundo número.', pt: 'Já vendeu alguns: subtraia o segundo número.' },
      win: { en: 'Yes! That adds up. 🥜', de: 'Stimmt genau! 🥜', fr: 'Oui ! Le compte est bon. 🥜', es: '¡Justo! 🥜', pt: 'Certinho! 🥜' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this._ans = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) { this.round = round; this.solved = false; this._ans = null; },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'gsc-wrap'); var root = api.el('div', 'gsc-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var r = this.round, opSym = r.op === '+' ? '+' : '−';

      var row = api.el('div', 'gsc-row');
      var go = api.el('div', 'gsc-go'); go.innerHTML = gopherSVG(); row.appendChild(go);
      var say = api.el('div', 'gsc-say'); say.textContent = api.t('gusIntro'); row.appendChild(say);
      root.appendChild(row);

      var story = api.el('div', 'gsc-story');
      var st = r.story;   /* localized full sentence (e.g. de) if present; else build the EN template */
      if (!st) st = r.op === '+'
        ? 'Gus had ' + r.a + ' ' + r.item + '. He ' + r.verb + ' ' + r.b + ' more.'
        : 'Gus had ' + r.a + ' ' + r.item + '. He ' + r.verb + ' ' + r.b + '.';
      story.textContent = st;
      root.appendChild(story);

      var eq = api.el('div', 'gsc-eq' + (this.solved ? ' gsc-solved' : ''));
      var aEl = api.el('span', 'gsc-num'); aEl.textContent = r.a;
      var opEl = api.el('span', 'gsc-op'); opEl.textContent = opSym;
      var bEl = api.el('span', 'gsc-num'); bEl.textContent = r.b;
      var eqEl = api.el('span', 'gsc-op'); eqEl.textContent = '=';
      var ansEl = api.el('span', 'gsc-ans'); ansEl.textContent = this.solved ? String(this._ans) : '?';
      eq.appendChild(aEl); eq.appendChild(opEl); eq.appendChild(bEl); eq.appendChild(eqEl); eq.appendChild(ansEl);
      root.appendChild(eq);

      wrap.appendChild(root); stage.appendChild(wrap);
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
      fetch('/mini-tools/gus-snack-cart-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[gus-snack-cart] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.gsc-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.gsc-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,14px);background:linear-gradient(180deg,#FBF3E4,#F3EAD6);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(170,130,80,.1);}'
        + '.gsc-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.gsc-go{width:clamp(46px,10vw,60px);flex:0 0 auto;}.gsc-go-svg{width:100%;height:auto;display:block;}'
        + '.gsc-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.gsc-story{text-align:center;font:700 clamp(13px,3.3vw,17px)/1.35 "Nunito",sans-serif;color:' + C.INK + ';background:#FFFDF8;border:2px dashed rgba(20,107,94,.22);border-radius:13px;padding:9px 14px;max-width:94%;}'
        + '.gsc-eq{display:flex;align-items:center;gap:clamp(7px,2.4vw,14px);justify-content:center;background:#fff;border:3px solid rgba(20,107,94,.2);border-radius:16px;padding:clamp(9px,2.4vw,16px) clamp(14px,4vw,26px);box-shadow:0 3px 0 rgba(160,120,60,.16);}'
        + '.gsc-num{font:800 clamp(30px,8vw,46px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.gsc-op{font:800 clamp(24px,6vw,36px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.gsc-ans{min-width:clamp(38px,10vw,58px);text-align:center;font:800 clamp(30px,8vw,46px)/1 "Baloo 2",sans-serif;color:' + C.GOLD + ';border-bottom:4px solid rgba(232,165,58,.5);}'
        + '.gsc-eq.gsc-solved .gsc-ans{color:' + C.GREEN + ';border-bottom-color:' + C.GREEN + ';}'
        /* the 921–1024 height band (e.g. portrait tablet 768×1000) keeps the gopher row but trims the story/equation so the longer German stories clear the fold (§A.13.62) */
        + '@media (min-height:921px) and (max-height:1024px){.gsc-root{gap:11px;}.gsc-story{font-size:15px;line-height:1.3;padding:7px 12px;}.gsc-eq{padding:12px 20px;}}'
        + '@media (max-height:920px){.gsc-row{display:none;}.gsc-root{gap:clamp(7px,1.7vw,12px);padding:clamp(10px,2.2vw,14px);}.gsc-story{font-size:clamp(13px,3vw,15px);padding:7px 12px;}.gsc-eq{padding:clamp(8px,2vw,12px) clamp(12px,3.4vw,20px);}.gsc-num,.gsc-ans{font-size:clamp(26px,6.4vw,34px);}.gsc-op{font-size:clamp(20px,5vw,28px);}}'
        + '@media (max-height:700px){.gsc-root{gap:7px;padding:11px;}.gsc-story{font-size:12.5px;padding:6px 10px;}.gsc-num,.gsc-ans{font-size:29px;}.gsc-op{font-size:23px;}}'
        + '@media (max-height:640px){.gsc-root{gap:4px;padding:7px;}.gsc-story{font-size:11px;padding:5px 9px;}.gsc-eq{padding:5px 11px;}.gsc-num,.gsc-ans{font-size:22px;}.gsc-op{font-size:17px;}}'
        + '@media (max-width:380px){.gsc-num,.gsc-ans{font-size:28px;}.gsc-op{font-size:22px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-gus-snack-cart', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'gus-snack-cart.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'number', answerMin: 0, answerMax: 100,
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool, answer) { var ok = Core.grade(round, answer); if (ok) { tool.solved = true; tool._ans = Core.answerValue(round); tool.render(); } return ok; },
        hintKey: function () { return round.op === '+' ? 'hintAdd' : 'hintSub'; }
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
