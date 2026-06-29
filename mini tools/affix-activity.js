/* =====================================================================
   MARIGOLD'S KNOWING MACHINE — ACTIVITY SKIN  (affix-activity.js)
   ---------------------------------------------------------------------
   L.2.4.b/c · affix word-meaning — CLARITY-FIRST. The lcs-shell skin over
   affix-core.js. answerType:'state'. EN-ONLY pilot.

   Marigold the mole's Knowing Machine: a root word + an affix-cog → the new
   word. Two cogs:
     • apply — the affixed word shows in the machine (e.g. "unkind"); the
       child taps the MEANING from 3 stacked text cards.
     • which — a root + a target meaning; the child taps the affix-cog
       (un-/re-/-ful/-less) that makes it.
   The question flows through the SHELL prompt banner (one prompt). A correct
   tap → the answer lights + Marigold wiggles + a brief "what the cog does"
   reveal (resolve; shell Check hidden until `.lcs-app.marigold-resolved`). A
   wrong tap → a warm nudge, no advance. 0 lines to any core / lcs-shell /
   game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.AffixCore;
  var LANG = 'en';
  var SENSE = {
    en: { un: 'NOT', re: 'AGAIN', ful: 'FULL OF', less: 'WITHOUT' },
    de: { un: 'NICHT', ful: 'VOLLER', less: 'OHNE' }
  };
  var LABEL = {
    en: { un: 'un-', re: 're-', ful: '-ful', less: '-less' },
    de: { un: 'un-', ful: '-voll', less: '-los' }
  };
  function label(a) { return (LABEL[LANG] || LABEL.en)[a] || (LABEL.en[a] || a); }
  function sense(a) { return (SENSE[LANG] || SENSE.en)[a] || (SENSE.en[a] || ''); }

  var L = {
    en: {
      win: 'Yes! {note}',
      winApply: '“{label}” means {sense}.',
      winWhich: '“{label}” means {sense} — that makes it!',
      nApply: 'Read the word: what does the cog do to it?',
      nWhich: 'Which cog gives that meaning?'
    },
    de: {
      win: 'Ja! {note}',
      winApply: '‚{label}‘ bedeutet {sense}.',
      winWhich: '‚{label}‘ bedeutet {sense} – so entsteht das Wort!',
      nApply: 'Lies das Wort: Was macht das Zahnrad damit?',
      nWhich: 'Welches Zahnrad ergibt diese Bedeutung?'
    }
  };
  function txt(k, a) {
    var s = (L[LANG] && L[LANG][k]) || L.en[k] || k;
    return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; });
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  var C = { T: '#146B5E', INK: '#0F4A40', CORAL: '#F2784B', BRASS: '#D8B26A', BRASSDK: '#A07C3A', CREAM: '#FBF3E4' };

  function marigoldSVG() {
    return '<svg class="af-mari-svg" viewBox="0 0 56 52" width="36" height="34" aria-hidden="true">' +
      '<ellipse cx="28" cy="34" rx="17" ry="15" fill="#8C6E5A" stroke="#6B5240" stroke-width="2"/>' +
      '<ellipse cx="14" cy="40" rx="6" ry="4" fill="#9C7E68"/><ellipse cx="42" cy="40" rx="6" ry="4" fill="#9C7E68"/>' +
      '<ellipse cx="28" cy="40" rx="6.5" ry="5" fill="#E7A6A0"/>' +   /* snout */
      '<circle cx="28" cy="38" r="1.8" fill="#5A3F33"/>' +
      '<g class="af-eyes-open"><circle cx="23" cy="31" r="2" fill="#2B2B2B"/><circle cx="33" cy="31" r="2" fill="#2B2B2B"/></g>' +
      '<g class="af-eyes-happy"><path d="M20 31 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M30 31 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M22 14 l3 8 M34 14 l-3 8" stroke="#6B5240" stroke-width="2" stroke-linecap="round"/></svg>';
  }

  /* a cog (gear + the operator symbol) centered at (cx,cy), radius r */
  function cogInner(affix, cx, cy, r) {
    var teeth = '';
    for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4, tx = cx + Math.cos(a) * r, ty = cy + Math.sin(a) * r; teeth += '<circle cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="' + (r * 0.16).toFixed(1) + '" fill="' + C.T + '"/>'; }
    var gear = teeth + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + C.T + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.66) + '" fill="' + C.CREAM + '"/>';
    var s = r * 0.42, sym = '';
    if (affix === 'un') sym = '<circle cx="' + cx + '" cy="' + cy + '" r="' + s + '" fill="none" stroke="' + C.CORAL + '" stroke-width="' + (r * 0.16) + '"/><line x1="' + (cx - s * 0.72) + '" y1="' + (cy + s * 0.72) + '" x2="' + (cx + s * 0.72) + '" y2="' + (cy - s * 0.72) + '" stroke="' + C.CORAL + '" stroke-width="' + (r * 0.16) + '" stroke-linecap="round"/>';
    else if (affix === 're') sym = '<path d="M' + (cx + s) + ' ' + cy + ' A' + s + ' ' + s + ' 0 1 1 ' + (cx) + ' ' + (cy - s) + '" fill="none" stroke="' + C.CORAL + '" stroke-width="' + (r * 0.16) + '" stroke-linecap="round"/><path d="M' + (cx - 1) + ' ' + (cy - s - r * 0.28) + ' l' + (r * 0.3) + ' ' + (r * 0.28) + ' l-' + (r * 0.34) + ' ' + (r * 0.16) + ' z" fill="' + C.CORAL + '"/>';
    else if (affix === 'ful' || affix === 'less') {
      var cup = 'M' + (cx - s) + ' ' + (cy - s * 0.85) + ' v' + (s * 1.15) + ' a' + s + ' ' + (s * 0.9) + ' 0 0 0 ' + (2 * s) + ' 0 v-' + (s * 1.15);   /* shared cup outline */
      var rim = '<line x1="' + (cx - s - r * 0.12) + '" y1="' + (cy - s * 0.85) + '" x2="' + (cx + s + r * 0.12) + '" y2="' + (cy - s * 0.85) + '" stroke="' + (affix === 'ful' ? C.CORAL : C.BRASSDK) + '" stroke-width="' + (r * 0.14) + '" stroke-linecap="round"/>';
      sym = (affix === 'ful')
        ? '<path d="' + cup + ' z" fill="' + C.CORAL + '"/>' + rim                                                   /* full cup (filled) */
        : '<path d="' + cup + '" fill="none" stroke="' + C.BRASSDK + '" stroke-width="' + (r * 0.14) + '" stroke-linecap="round" stroke-linejoin="round"/>' + rim;   /* empty cup (outline) */
    }
    return gear + sym;
  }

  var AffixActivity = {
    id: 'affix-activity',
    strings: {
      title: { en: "Marigold's Knowing Machine", de: 'Marigolds Wortmaschine' },
      instruction: { en: 'Help Marigold the mole figure out what the new word means!', de: 'Hilf dem Maulwurf Marigold herauszufinden, was das neue Wort bedeutet!' },
      qapply: { en: 'What does {word} mean?', de: 'Was bedeutet ‚{word}‘?' },
      qwhich: { en: 'Which cog makes a word meaning “{meaning}”?', de: 'Welches Zahnrad macht ein Wort, das ‚{meaning}‘ bedeutet?' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._choiceOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('af-style')) return;
      var s = el('style'); s.id = 'af-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.af-root{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;max-width:min(96vw,600px);margin:0 auto;}',
        '.af-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.af-mari{flex:0 0 auto;}',
        '.af-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.af-line-msg.miss{color:#C2410C;}',
        '.af-scene{width:100%;max-width:min(92vw,420px);height:auto;display:block;}',
        '.af-board{width:100%;max-width:min(96vw,600px);display:flex;flex-direction:column;gap:12px;align-items:center;}',
        /* apply = a row of readable meaning cards (text wraps within each) */
        '.af-row{display:flex;justify-content:center;gap:12px;width:100%;align-items:stretch;}',
        '.af-row .af-cand{flex:1 1 0;min-width:0;min-height:clamp(64px,11vw,116px);padding:8px 10px;font:700 clamp(1.05rem,3.6vw,1.6rem)/1.18 Nunito,system-ui,sans-serif;overflow-wrap:break-word;}',
        /* which = a row of cog buttons */
        '.af-cogrow{display:flex;justify-content:center;gap:14px;width:100%;}',
        '.af-cogrow .af-cand{flex:1 1 0;min-width:0;max-width:138px;min-height:clamp(104px,17vw,134px);flex-direction:column;gap:3px;padding:6px 4px;}',
        '.af-cog-label{font:800 clamp(1.05rem,3.6vw,1.5rem)/1 Baloo 2,Nunito,sans-serif;color:#0F4A40;}',
        '.af-cog-sense{font:700 clamp(.7rem,2.2vw,.84rem)/1 Nunito,sans-serif;color:#146B5E;letter-spacing:.02em;}',
        '.af-cand{border:3px solid #146B5E;border-radius:15px;background:#fff;color:#0F4A40;cursor:pointer;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;}',
        '.af-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.af-cand.dim{opacity:.4;}',
        '.af-mari-svg .af-eyes-happy{display:none;}.af-mari[data-pose=happy] .af-eyes-open{display:none;}.af-mari[data-pose=happy] .af-eyes-happy{display:block;}',
        '.af-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.af-root{gap:9px;}.af-cogrow .af-cand{min-height:88px;}}',
        '.lcs-app:not(.marigold-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'affix.apply.l-2-4-b';
      var tries = ['/mini-tools/affix-activities.json', 'affix-activities.json', '../mini tools/affix-activities.json'];
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
      var pk = round.cog === 'which' ? 'qwhich' : 'qapply';
      return {
        id: round.id, promptKey: pk, promptArgs: { word: round.word, meaning: round.meaning }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {};
      this._choiceOrder = this._shuffle((round.options || []).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('marigold-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'af-root');

      var say = el('div', 'af-say');
      var ma = el('div', 'af-mari'); ma.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); ma.innerHTML = marigoldSVG();
      var msg = el('p', 'af-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(ma, msg); root.appendChild(say); this._mari = ma;

      this._renderScene(root);
      this._renderOptions(root);
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    /* the brass Knowing Machine: the affixed word (apply) or the root + a cog
       slot (which), with the cog glyph. The word is real DOM/SVG <text>. */
    _renderScene: function (root) {
      var r = this._round, W = 360, H = 96;
      var frame = '<rect x="10" y="14" width="' + (W - 20) + '" height="' + (H - 34) + '" rx="14" fill="' + C.BRASS + '" stroke="' + C.BRASSDK + '" stroke-width="3"/>' +
        '<rect x="22" y="26" width="' + (W - 44) + '" height="' + (H - 58) + '" rx="9" fill="#FFFDF6" stroke="' + C.BRASSDK + '" stroke-width="1.5"/>' +
        '<line x1="0" y1="' + (H - 8) + '" x2="' + W + '" y2="' + (H - 8) + '" stroke="' + C.BRASSDK + '" stroke-width="4" stroke-dasharray="10 7"/>';
      var content;
      if (r.cog === 'which') {
        content = cogInner('q', W * 0.26, (H - 14) / 2 + 4, 18) +
          '<text x="' + (W * 0.26) + '" y="' + ((H - 14) / 2 + 9) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="22" fill="' + C.CORAL + '" text-anchor="middle">?</text>' +
          '<text x="' + (W * 0.6) + '" y="' + ((H - 14) / 2 + 9) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="30" fill="' + C.INK + '" text-anchor="middle">' + r.root + '</text>';
      } else {
        content = cogInner(r.affix, W * 0.2, (H - 14) / 2 + 4, 18) +
          '<text x="' + (W * 0.58) + '" y="' + ((H - 14) / 2 + 10) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="30" fill="' + C.INK + '" text-anchor="middle">' + r.word + '</text>';
      }
      var svg = '<svg class="af-scene" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + frame + content + '</svg>';
      var wrap = el('div'); wrap.style.width = '100%'; wrap.style.maxWidth = '440px'; wrap.style.display = 'flex'; wrap.style.justifyContent = 'center'; wrap.innerHTML = svg;
      root.appendChild(wrap);
    },

    _renderOptions: function (root) {
      var self = this, r = this._round, tok = this._token, opts = r.options || [];
      var board = el('div', 'af-board');
      if (r.cog === 'which') {
        var rowc = el('div', 'af-cogrow');
        this._choiceOrder.forEach(function (oi) {
          var affix = opts[oi];
          var b = el('button', 'af-cand af-cog' + (self._nonConf[affix] ? ' dim' : ''));
          b.type = 'button'; b.setAttribute('aria-label', label(affix) + (LANG === 'de' ? ' bedeutet ' : ' meaning ') + sense(affix));
          b.innerHTML = '<svg viewBox="0 0 48 48" width="78" height="78" aria-hidden="true">' + cogInner(affix, 24, 24, 19) + '</svg>' +
            '<span class="af-cog-label">' + label(affix) + '</span><span class="af-cog-sense">' + sense(affix) + '</span>';
          b.addEventListener('click', function () { self._pick(affix, tok); });
          rowc.appendChild(b);
        });
        board.appendChild(rowc);
      } else {
        var rowm = el('div', 'af-row');
        this._choiceOrder.forEach(function (oi) {
          var o = opts[oi];
          var b = el('button', 'af-cand' + (self._nonConf[o.affix] ? ' dim' : ''));
          b.type = 'button'; b.textContent = o.text; b.setAttribute('aria-label', o.text);
          b.addEventListener('click', function () { self._pick(o.affix, tok); });
          rowm.appendChild(b);
        });
        board.appendChild(rowm);
      }
      root.appendChild(board);
    },

    _pick: function (affix, tok) {
      if (this._resolved || this._nonConf[affix] || this._token !== tok) return;
      if (Core.isAnswer(this._round, affix)) this._resolve();
      else { this._nonConf[affix] = 1; this._nudge(this._round.cog === 'which' ? 'nWhich' : 'nApply'); }
    },

    _resolve: function () {
      var r = this._round;
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('marigold-resolved');
      this.render();
      var note = txt(r.cog === 'which' ? 'winWhich' : 'winApply', { label: label(r.affix), sense: sense(r.affix) });
      var line = this._api.stage.querySelector('.af-line-msg');
      if (line) { line.textContent = txt('win', { note: note }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: note }));
    },
    _nudge: function (key) {
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.af-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, snap = Core.snapshot(r), wrap = el('div', 'af-sronly'); wrap.setAttribute('aria-live', 'polite');
      var msg;
      if (r.cog === 'which') {
        var opts = snap.options.map(function (a) { return label(a) + ' (' + sense(a) + ')'; }).join(', ');
        msg = LANG === 'de'
          ? ('Das Grundwort ist ‚' + r.root + '‘. Welcher Wortbaustein macht ein Wort, das ‚' + r.meaning + '‘ bedeutet? Auswahl: ' + opts + '.')
          : ('The root word is ' + r.root + '. Which affix makes a word meaning "' + r.meaning + '"? Choices: ' + opts + '.');
      } else {
        var texts = snap.options.map(function (o) { return o.text; }).join('; ');
        msg = LANG === 'de'
          ? ('Das Wort ist ‚' + r.word + '‘. Was bedeutet es? Auswahl: ' + texts + '.')
          : ('The word is ' + r.word + '. What does it mean? Choices: ' + texts + '.');
      }
      wrap.innerHTML = '<p>' + msg + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.AffixActivity = AffixActivity;

}(typeof window !== 'undefined' ? window : this));
