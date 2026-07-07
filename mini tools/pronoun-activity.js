/* =====================================================================
   THE BORROWED HAT — ACTIVITY SKIN  (pronoun-activity.js)
   ---------------------------------------------------------------------
   L.1.1.d · personal pronouns by case — CLARITY-FIRST redesign of #84. The
   lcs-shell skin over pronoun-core.js. answerType:'state'. EN-ONLY-by-design.

   Hattie the hare runs the Lost-and-Found Hat Shop. Each round shows a sentence
   with a blank; the child picks the right pronoun "word-hat" from two chips —
   the two case forms of the SAME pronoun (he/him, I/me, his/him). Correct = the
   chip string === the core's role-derived form, DERIVED not stored. Correct →
   the blank fills + a role note + Hattie glows (resolve; shell Check hidden
   until `.lcs-app.hattie-resolved`). Wrong → a warm role nudge, no advance.
   0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PronounCore;
  var LANG = 'en';

  var L = {
    en: {
      q: 'Which word fits the sentence?',
      win: 'Yes! {note}', hear: '🔊 Hear it',
      noteSubject: 'It is DOING the action!',
      noteObject: 'The action happens TO it!',
      notePossessive: 'It shows what BELONGS to someone!',
      nSubject: 'Who is DOING it? Use the doing-word. Look again!',
      nObject: 'The action happens TO them — use the getting-word. Look again!',
      nPossessive: 'It shows what BELONGS to them — use the owning-word. Look again!'
    },
    de: {
      q: 'Welches Wort passt in den Satz?',
      win: 'Ja! {note}', hear: '🔊 Anhören',
      noteSubject: 'Hier TUT jemand etwas!',
      noteObject: 'Hier passiert etwas mit jemandem!',
      notePossessive: 'Das zeigt, wem etwas GEHÖRT!',
      nSubject: 'Fast! Frag: Wer TUT etwas? Dann passt das andere Wort.',
      nObject: 'Fast! Frag: Wen meint der Satz? Dann passt das andere Wort.',
      nPossessive: 'Fast! Frag: Wem GEHÖRT das? Dann passt das andere Wort.'
    },
    fr: {
      q: 'Quel mot va dans la phrase ?',
      win: 'Bravo ! {note}', hear: '🔊 Écouter',
      noteSubject: 'Ici, quelqu’un FAIT l’action !',
      noteObject: 'Ici, il arrive quelque chose à quelqu’un !',
      notePossessive: 'Ça montre à qui c’est !',
      nSubject: 'Presque ! Demande-toi : qui FAIT l’action ?',
      nObject: 'Presque ! Demande-toi : de qui parle la phrase ?',
      nPossessive: 'Presque ! Demande-toi : c’est à qui ?'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  /* German + French rounds carry their own forms (the protected core's CASE_TABLE is EN-only) */
  function pnChips(r) { var loc = r && r[LANG]; return (loc && loc.correct) ? [loc.correct, loc.wrong] : Core.chipStrings(r); }
  function pnIsAnswer(r, s) { var loc = r && r[LANG]; return (loc && loc.correct) ? s === loc.correct : Core.isAnswer(r, s); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function hattieSVG() {
    /* Hattie — a tan hare with long ears + a little shop hat */
    return '<svg class="pn-hat-svg" viewBox="0 0 50 54" width="38" height="40" aria-hidden="true">' +
      '<ellipse cx="16" cy="9" rx="3.5" ry="11" fill="#D8C3A6" stroke="#9C8666" stroke-width="1.5"/>' +
      '<ellipse cx="27" cy="9" rx="3.5" ry="11" fill="#D8C3A6" stroke="#9C8666" stroke-width="1.5"/>' +   /* long ears */
      '<ellipse cx="16" cy="9" rx="1.4" ry="7" fill="#E6C9C2"/><ellipse cx="27" cy="9" rx="1.4" ry="7" fill="#E6C9C2"/>' +
      '<ellipse cx="22" cy="30" rx="14" ry="13" fill="#D8C3A6" stroke="#9C8666" stroke-width="2"/>' +
      '<path d="M9 18 h26 l-3 -5 h-20z" fill="#146B5E"/><rect x="6" y="18" width="32" height="3.5" rx="1.5" fill="#0F4A40"/>' +   /* little hat */
      '<g class="pn-eyes-open"><circle cx="17" cy="29" r="2" fill="#2B2B2B"/><circle cx="27" cy="29" r="2" fill="#2B2B2B"/></g>' +
      '<g class="pn-eyes-happy"><path d="M14.5 29 q2.5 -2.5 5 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M24.5 29 q2.5 -2.5 5 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<circle cx="22" cy="34" r="1.6" fill="#E7A6A0"/><path d="M18 37 q4 3 8 0" stroke="#9C8666" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>';
  }

  var PronounActivity = {
    id: 'pronoun-activity',
    strings: {
      title: { en: 'The Borrowed Hat', de: 'Hatties Hutladen', fr: 'La boutique de Hattie' },
      instruction: { en: 'Give the character the right word — the one that fits its job!', de: 'Gib Hattie das richtige Wort — das, das in den Satz passt!', fr: 'Donne à Hattie le bon mot — celui qui va dans la phrase !' },
      q: { en: '{q}', de: '{q}', fr: '{q}' }
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
      if (document.getElementById('pn-style')) return;
      var s = el('style'); s.id = 'pn-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.pn-root{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;max-width:min(96vw,620px);margin:0 auto;}',
        '.pn-sentence{width:100%;text-align:center;font:700 clamp(1.1rem,4.4vw,1.42rem)/1.45 Nunito,system-ui,sans-serif;color:#2A3A36;}',
        '.pn-blank{display:inline-block;min-width:58px;border-bottom:3px solid #146B5E;margin:0 4px;color:#146B5E;font-weight:800;}',
        '.pn-blank.filled{border-bottom-color:#F2784B;color:#C2410C;}',
        '.pn-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.pn-hat{flex:0 0 auto;}',
        '.pn-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.22 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.pn-line-msg.miss{color:#C2410C;}',
        '.pn-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.pn-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;width:100%;}',
        '.pn-cand{display:flex;align-items:center;justify-content:center;text-align:center;padding:12px 24px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:52px;min-width:104px;font:800 clamp(1.05rem,4vw,1.28rem)/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.pn-cand.dim{opacity:.4;}',
        '.pn-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.pn-hat-svg .pn-eyes-happy{display:none;}.pn-hat[data-pose=happy] .pn-eyes-open{display:none;}.pn-hat[data-pose=happy] .pn-eyes-happy{display:block;}',
        '.pn-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.pn-root{gap:8px;}.pn-sentence{font-size:1.08rem;}.pn-cand{padding:10px 16px;min-width:90px;}}',
        '.lcs-app:not(.hattie-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'pronoun.case.l-1-1-d';
      var tries = ['/mini-tools/pronoun-activities.json', 'pronoun-activities.json', '../mini tools/pronoun-activities.json'];
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
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = null; this._filled = null;
      this._chipOrder = this._shuffle(pnChips(round));   /* shuffle the 2 forms; position ≠ answer */
      if (this._app) this._app.classList.remove('hattie-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'pn-root');

      /* the sentence with a blank slot */
      var sent = el('div', 'pn-sentence');
      var parts = String(round.sentence).split('___');
      sent.appendChild(document.createTextNode(parts[0] || ''));
      var blank = el('span', 'pn-blank' + (this._filled ? ' filled' : ''));
      blank.textContent = this._filled ? this._filled : '   ';
      sent.appendChild(blank);
      sent.appendChild(document.createTextNode(parts[1] || ''));
      root.appendChild(sent);

      /* Hattie + live line */
      var say = el('div', 'pn-say');
      var ht = el('div', 'pn-hat'); ht.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); ht.innerHTML = hattieSVG();
      var msg = el('p', 'pn-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(ht, msg); root.appendChild(say); this._hat = ht;

      /* Hear it */
      var self = this, hear = el('button', 'pn-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        var t = String(round.sentence).replace('___', LANG === 'de' ? 'Lücke' : LANG === 'fr' ? 'trou' : 'blank') + ' ' + txt('q');
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: t, lang: LANG, rate: 0.92 }); } catch (e) { } }
      });
      root.appendChild(hear);

      this._renderChips(root, round);
      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _renderChips: function (root, round) {
      var self = this, tok = this._token;
      var strip = el('div', 'pn-strip');
      var order = this._chipOrder || pnChips(round);
      order.forEach(function (str) {
        var b = el('button', 'pn-cand' + (self._nonConf[str] ? ' dim' : '') + (self._lit === str ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-str', str);
        b.textContent = str; b.setAttribute('aria-label', str);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[str] || self._token !== tok) return;
          if (pnIsAnswer(round, str)) { self._lit = str; self._filled = str; self._resolve(); }
          else { self._nonConf[str] = 1; self._nudge(round); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('hattie-resolved');
      this.render();
      var note = this._round.role === 'subject' ? txt('noteSubject') : this._round.role === 'object' ? txt('noteObject') : txt('notePossessive');
      var line = this._api.stage.querySelector('.pn-line-msg');
      if (line) { line.textContent = txt('win', { note: note }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: note }));
    },
    _nudge: function (round) {
      var key = round.role === 'subject' ? 'nSubject' : round.role === 'object' ? 'nObject' : 'nPossessive';
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.pn-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function (round) {
      var wrap = el('div', 'pn-sronly'); wrap.setAttribute('aria-live', 'polite');
      var chips = pnChips(round).join(LANG === 'de' ? ' oder ' : LANG === 'fr' ? ' ou ' : ' or ');
      var sent = String(round.sentence).replace('___', LANG === 'de' ? 'Lücke' : LANG === 'fr' ? 'trou' : 'blank');
      wrap.innerHTML = '<p>' + sent + ' ' + txt('q') + ' ' + chips + '?</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.PronounActivity = PronounActivity;

}(typeof window !== 'undefined' ? window : this));
