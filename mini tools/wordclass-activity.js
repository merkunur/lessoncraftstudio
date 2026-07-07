/* =====================================================================
   GLIM'S DESCRIBING WORDS — ACTIVITY SKIN  (wordclass-activity.js)
   ---------------------------------------------------------------------
   L.2.1.e · adjective vs adverb (choose by what is modified) — CLARITY-FIRST
   redesign of #73. The lcs-shell skin over wordclass-core.js. answerType:
   'state'. EN-ONLY pilot (non-EN 404-by-design).

   Glim the light-wisp helps finish sentences. Each round shows a sentence with
   a blank; the SHELL prompt names what the blank describes (a thing / an
   action); the child taps one of two word chips — the same word's adjective and
   adverb forms. Correct = the chip whose class matches the modified target's
   kind (noun→adjective, verb→adverb), DERIVED not stored. Correct → the blank
   fills with the chosen word + Glim glows (resolve; shell Check hidden until
   `.lcs-app.glim-resolved`). Wrong → a warm function nudge, no advance.
   0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.WordclassCore;

  var LANG = 'en';   /* content locale, set from api.lang in init() */

  var L = {
    en: {
      q: '{q}',
      win: 'Yes! {note}', winNote: 'That word fits!',
      hear: '🔊 Hear it',
      nNoun: '"{adv}" tells how an ACTION happens. The blank describes {target} — a THING. Pick the describing word!',
      nVerb: '"{adj}" describes a THING. The blank tells HOW {target} happened — an ACTION. Pick the -ly word!',
      blankWord: 'blank', srSentence: 'Sentence:', srChoices: 'Choices:'
    },
    fr: {
      q: '{q}',
      win: 'Oui ! {note}', winNote: 'Ce mot va bien !',
      hear: '🔊 Écouter',
      nNoun: '« {adv} » dit COMMENT on fait une action. Mais ici, le mot décrit « {target} ». Choisis le mot qui décrit !',
      nVerb: '« {adj} » décrit quelque chose ou quelqu’un. Mais ici, le mot dit COMMENT l’action « {target} » se passe. Choisis le mot en « -ment » !',
      blankWord: 'trou', srSentence: 'Phrase :', srChoices: 'Choix :'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function glimSVG() {
    /* Glim — a luminous little light-wisp (teardrop + glow + face) */
    return '<svg class="wc-glim-svg" viewBox="0 0 50 52" width="38" height="40" aria-hidden="true">' +
      '<circle cx="25" cy="28" r="20" fill="#FCE7A8" opacity=".35"/>' +   /* halo */
      '<path d="M25 6 C33 18 38 26 38 33 a13 13 0 0 1 -26 0 C12 26 17 18 25 6z" fill="#FBD96B" stroke="#E0A93A" stroke-width="2"/>' +
      '<g class="wc-eyes-open"><circle cx="20" cy="31" r="2.1" fill="#5A4A22"/><circle cx="30" cy="31" r="2.1" fill="#5A4A22"/></g>' +
      '<g class="wc-eyes-happy"><path d="M17.5 31 q2.5 -2.5 5 0" stroke="#5A4A22" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M27.5 31 q2.5 -2.5 5 0" stroke="#5A4A22" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M21 37 q4 3 8 0" stroke="#E0A93A" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';
  }

  var WordclassActivity = {
    id: 'wordclass-activity',
    strings: {
      title: { en: "Glim's Describing Words", fr: 'Glim et les mots qui décrivent' },
      instruction: { en: 'Read the sentence, then pick the describing word that fits!', fr: 'Lis la phrase, puis touche le mot qui va bien dans le trou.' },
      q: { en: '{q}', fr: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = null; this._chipOrder = null; this._filled = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('wc-style')) return;
      var s = el('style'); s.id = 'wc-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.wc-root{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;max-width:min(96vw,620px);margin:0 auto;}',
        '.wc-sentence{width:100%;text-align:center;font:700 clamp(1.05rem,4.2vw,1.4rem)/1.45 Nunito,system-ui,sans-serif;color:#2A3A36;}',
        '.wc-blank{display:inline-block;min-width:62px;border-bottom:3px solid #146B5E;margin:0 4px;color:#146B5E;font-weight:800;}',
        '.wc-blank.filled{border-bottom-color:#F2784B;color:#C2410C;}',
        '.wc-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.wc-glim{flex:0 0 auto;}',
        '.wc-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.22 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.wc-line-msg.miss{color:#C2410C;}',
        '.wc-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.wc-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;width:100%;}',
        '.wc-cand{display:flex;align-items:center;justify-content:center;text-align:center;padding:12px 22px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:52px;min-width:108px;font:800 clamp(1rem,3.8vw,1.18rem)/1.1 Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.wc-cand.dim{opacity:.42;}',
        '.wc-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.wc-glim-svg .wc-eyes-happy{display:none;}.wc-glim[data-pose=happy] .wc-eyes-open{display:none;}.wc-glim[data-pose=happy] .wc-eyes-happy{display:block;}',
        '.wc-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.wc-root{gap:8px;}.wc-cand{padding:10px 16px;min-width:92px;}}',
        '.lcs-app:not(.glim-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'wordclass.adjective-adverb.l-2-1-e';
      var tries = ['/mini-tools/wordclass-activities.json', 'wordclass-activities.json', '../mini tools/wordclass-activities.json'];
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
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = null; this._filled = null;
      this._chipOrder = this._shuffle(Core.CLASSES.slice());   /* shuffle form display order so position ≠ answer */
      if (this._app) this._app.classList.remove('glim-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'wc-root');

      /* the sentence with a blank slot */
      var sent = el('div', 'wc-sentence');
      var parts = String(round.sentence).split('___');
      sent.appendChild(document.createTextNode(parts[0] || ''));
      var blank = el('span', 'wc-blank' + (this._filled ? ' filled' : ''));
      blank.textContent = this._filled ? this._filled : '    ';
      sent.appendChild(blank);
      sent.appendChild(document.createTextNode(parts[1] || ''));
      root.appendChild(sent);

      /* Glim + live line */
      var say = el('div', 'wc-say');
      var gl = el('div', 'wc-glim'); gl.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); gl.innerHTML = glimSVG();
      var msg = el('p', 'wc-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(gl, msg); root.appendChild(say); this._glim = gl;

      /* Hear it */
      var self = this, hear = el('button', 'wc-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = String(round.sentence).replace('___', txt('blankWord')) + ' ' + round.q;
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: LANG === 'fr' ? 'fr-FR' : 'en', rate: 0.92 }); } catch (e) { } }
      });
      root.appendChild(hear);

      this._renderChips(root, round);
      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _renderChips: function (root, round) {
      var self = this, tok = this._token, f = round.forms || {};
      var strip = el('div', 'wc-strip');
      var order = this._chipOrder || Core.CLASSES.slice();
      order.forEach(function (cls) {
        var b = el('button', 'wc-cand' + (self._nonConf[cls] ? ' dim' : '') + (self._lit === cls ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-class', cls);
        b.textContent = f[cls];
        b.setAttribute('aria-label', f[cls]);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[cls] || self._token !== tok) return;
          if (Core.isAnswer(round, cls)) { self._lit = cls; self._filled = f[cls]; self._resolve(); }
          else { self._nonConf[cls] = 1; self._nudge(round); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('glim-resolved');
      this.render();
      var line = this._api.stage.querySelector('.wc-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function (round) {
      var f = round.forms || {};
      var msgText = round.targetKind === 'noun'
        ? txt('nNoun', { adv: f.adverb, target: round.target })
        : txt('nVerb', { adj: f.adjective, target: round.target });
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.wc-line-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var f = round.forms || {}, wrap = el('div', 'wc-sronly'); wrap.setAttribute('aria-live', 'polite');
      wrap.innerHTML = '<p>' + txt('srSentence') + ' ' + String(round.sentence).replace('___', txt('blankWord')) + ' ' + round.q + ' ' + txt('srChoices') + ' ' + f.adjective + ', ' + f.adverb + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.WordclassActivity = WordclassActivity;

}(typeof window !== 'undefined' ? window : this));
