/* =====================================================================
   SKIP'S WORD-WELDING YARD — ACTIVITY SKIN  (compound-meaning-activity.js)
   ---------------------------------------------------------------------
   L.2.4.d · predict the meaning of compound words. The lcs-shell activity skin
   over compound-meaning-core.js. answerType:'state'. EN-ONLY pilot.

   A MEANING game (mute-safe, SR-first): the child reads the compound + the two
   PART pictures and COMPOSES the meaning (no whole-compound picture to read).
   5 distinct ACTIONS — predict (form→meaning) · ticket (meaning→form) · supply
   (the missing part) · head (kind-of MEANING) · build (weld → then mean). A
   correct answer → resolve (the shell Check = post-resolve advance, hidden until
   resolved via `.lcs-app.skip-resolved`) + a model parks on the BUILD BOARD
   (abundance vessel, never a count). A WRONG tap → a RELATION-BRANCHED warm
   scaffold (DIM the wrong choice + highlight the part-pictures, "is it MADE of
   it or FOR it?"), no advance, reshuffle. Per-round token guard. 0 lines to any
   core / lcs-shell. Part pictures = real `/image-library-webp/themes/<dir>/<noun>@2x.webp`.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CompoundMeaningCore;

  var L = {
    en: {
      predict: 'What does it mean?',
      ticket: 'Which word means this?',
      supply: 'Which part finishes it?',
      head: 'What kind of thing is it?',
      build: 'Weld the two words — then what does it mean?',
      buildMean: 'Now — what does it mean?',
      weld: 'Weld!',
      win: 'Yes! Into the yard it goes.',
      nudgeMadeOf: 'Look again — is it MADE of it, or FOR it?',
      nudgeReversed: 'Which word is it really a kind of?',
      nudgeWrong: 'Not quite — what do the two parts make?',
      nudgeHead: 'Think: what KIND of thing is it?'
    },
    de: {
      predict: 'Was bedeutet dieses Wort?',
      ticket: 'Welches Wort passt zu dieser Bedeutung?',
      supply: 'Welches Bild fehlt?',
      head: 'Was für ein Ding ist es?',
      build: 'Setz die zwei Wörter zusammen!',
      buildMean: 'Und jetzt — was bedeutet es?',
      weld: 'Zusammensetzen!',
      win: 'Super! Das hast du geknackt!',
      nudgeMadeOf: 'Schau noch mal — ist es daraus gemacht oder dafür da?',
      nudgeReversed: 'Achtung: Welches Wort steht hinten? Das sagt, was es ist.',
      nudgeWrong: 'Fast! Welches Wort passt wirklich dazu?',
      nudgeHead: 'Denk dran: Das letzte Wort sagt, was es ist.'
    },
    nl: {
      predict: 'Wat betekent dit woord?',
      ticket: 'Welk woord past bij deze betekenis?',
      supply: 'Welk deel maakt het af?',
      head: 'Wat voor ding is het?',
      build: 'Zet de twee woorden samen!',
      buildMean: 'En wat betekent het nu?',
      weld: 'Maak er één woord van!',
      win: 'Hoera! Naar de werkplaats ermee!',
      nudgeMadeOf: 'Kijk nog eens — is het ervan gemaakt of is het ervoor?',
      nudgeReversed: 'Welk woord staat achteraan? Dat zegt wat het is.',
      nudgeWrong: 'Bijna! Kijk goed naar het eerste woord — welk ding hoort erbij?',
      nudgeHead: 'Het laatste woord zegt wat het echt is. Kijk daar eens naar.'
    }
  };
  /* image-key -> German display word (the parts are language-neutral images; only the shown word localizes) */
  var PART_DE = {
    hand: 'Hand', shoe: 'Schuh', tooth: 'Zahn', brush: 'Bürste', bag: 'Tasche', milk: 'Milch', jug: 'Kanne',
    dog: 'Hund', bed: 'Bett', book: 'Buch', foot: 'Fuß', ball: 'Ball', egg: 'Ei', cup: 'Becher',
    apple: 'Apfel', cake: 'Kuchen', rain: 'Regen', umbrella: 'Schirm'
  };
  /* image-key -> Dutch display word (Netherlands standard; only the shown word localizes) */
  var PART_NL = {
    hand: 'Hand', shoe: 'Schoen', tooth: 'Tand', brush: 'Borstel', bag: 'Tas', milk: 'Melk', jug: 'Kan',
    dog: 'Hond', bed: 'Bed', book: 'Boek', foot: 'Voet', ball: 'Bal', egg: 'Ei', cup: 'Beker',
    apple: 'Appel', cake: 'Taart', rain: 'Regen', umbrella: 'Paraplu'
  };
  function lang() { return (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en'; }
  function txt(k) { var lg = lang(); return (L[lg] || L.en)[k] || L.en[k] || k; }
  function partWord(noun) { var lg = lang(); return lg === 'de' ? (PART_DE[noun] || cap(noun)) : lg === 'nl' ? (PART_NL[noun] || cap(noun)) : cap(noun); }
  /* grade by the stored `kind` tag for de/nl (bypasses the EN composeMeaning string-match); EN stays on Core.isAnswer */
  function cmIsAnswer(round, oi) {
    if (lang() !== 'de' && lang() !== 'nl') return Core.isAnswer(round, oi);
    var c = round.choices[oi];
    return round.cog === 'head' ? c.kind === 'head' : c.kind === 'correct';
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function imgUrl(p) { return '/image-library-webp/themes/' + p.themeDir + '/' + p.noun + '@2x.webp'; }

  function skipSVG() {
    return '<svg class="cm-skip" viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">' +
      '<path d="M30 40 q14 -2 14 -16 q0 -10 -8 -8 q4 6 -2 12 q3 -12 -6 -14 q2 8 -4 12 z" fill="#7E8B92"/>' +
      '<ellipse cx="20" cy="30" rx="13" ry="12" fill="#9C6B43"/>' +
      '<path d="M10 20 q-3 -7 4 -8 q3 3 2 9 z" fill="#7A5230"/><path d="M28 20 q3 -7 -4 -8 q-3 3 -2 9 z" fill="#7A5230"/>' +
      '<circle cx="15" cy="29" r="2.2" fill="#2B2B2B"/><circle cx="25" cy="29" r="2.2" fill="#2B2B2B"/>' +
      '<ellipse cx="20" cy="34" rx="2.6" ry="2" fill="#3a2c1a"/>' +
      '<path d="M40 12 a5 5 0 1 0 .1 0 M44 16 l4 4" fill="none" stroke="#146B5E" stroke-width="2"/></svg>';
  }
  /* the Build Board — a growing shelf of built models (abundance, never a count) */
  function boardSVG(n) {
    var cap2 = Math.min(n, 10), models = '', cols = ['#F2784B', '#2A9D8F', '#E9C46A', '#C2569B', '#5AA469'];
    for (var i = 0; i < cap2; i++) {
      var r = Math.floor(i / 5), c = i % 5, x = 9 + c * 9, y = 30 - r * 11;
      models += '<rect x="' + x + '" y="' + y + '" width="6.5" height="8" rx="1.6" fill="' + cols[i % 5] + '"/>';
    }
    return '<svg class="cm-board" viewBox="0 0 54 44" width="34" height="28" aria-hidden="true">' +
      '<rect x="4" y="6" width="46" height="30" rx="4" fill="#EAF3F1" stroke="#146B5E" stroke-width="2"/>' +
      '<g>' + models + '</g>' +
      '<line x1="6" y1="24" x2="48" y2="24" stroke="#146B5E" stroke-width="1.2" opacity=".5"/>' +
      '<line x1="6" y1="35" x2="48" y2="35" stroke="#146B5E" stroke-width="1.2" opacity=".5"/></svg>';
  }
  /* the welded compound as inline text — the HEAD (what it IS) tinted teal */
  function weldedHTML(entry) {
    var headIs2 = entry.head === 'part2';
    var loc = lang() !== 'en';   /* de + nl show both parts via partWord (localized display words) */
    var p1 = loc ? partWord(entry.part1.noun) : cap(entry.part1.noun);
    var p2 = loc ? partWord(entry.part2.noun) : entry.part2.noun;
    var a = '<span class="cm-blk' + (headIs2 ? '' : ' cm-head') + '">' + esc(p1) + '</span>';
    var b = '<span class="cm-blk' + (headIs2 ? ' cm-head' : '') + '">' + esc(p2) + '</span>';
    return a + '<span class="cm-seam">·</span>' + b;
  }

  var CompoundMeaningActivity = {
    id: 'compound-meaning',
    strings: {
      title: { en: "Skip's Word-Welding Yard", de: 'Skips Wortwerkstatt', nl: 'De Woordenwerkplaats van Nootje' },
      instruction: { en: 'Bring Skip two words — then figure out what the new word MEANS!', de: 'Skip setzt zwei Wörter zu einem zusammen. Finde heraus, was das neue Wort bedeutet!', nl: 'Nootje maakt van twee woorddelen één nieuw woord. Ontdek wat het betekent!' },
      qpredict: { en: 'What does it mean?', de: 'Was bedeutet dieses Wort?', nl: 'Wat betekent dit woord?' },
      qticket: { en: 'Which word means this?', de: 'Welches Wort passt zu dieser Bedeutung?', nl: 'Welk woord past bij deze betekenis?' },
      qsupply: { en: 'Which part finishes it?', de: 'Welches Bild fehlt?', nl: 'Welk deel maakt het af?' },
      qhead: { en: 'What KIND of thing is it?', de: 'Was für ein Ding ist es?', nl: 'Wat voor ding is het?' },
      qbuild: { en: 'Weld it — then what does it mean?', de: 'Setz die zwei Wörter zusammen!', nl: 'Zet de twee woorden samen!' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._pending = null; this._nonConf = {}; this._welded = false;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('cm-style')) return;
      var s = el('style'); s.id = 'cm-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.cm-root{display:flex;flex-direction:column;align-items:center;gap:7px;width:100%;max-width:min(96vw,560px);margin:0 auto;}',
        '.cm-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.cm-skip,.cm-board{flex:0 0 auto;}',
        '.cm-line{flex:1 1 auto;min-height:1.05em;text-align:center;font:700 .82rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.cm-line.miss{color:#C2410C;}',
        /* the welded compound word (head tinted) */
        '.cm-word{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:2px;font:800 clamp(1.1rem,5.5vw,1.6rem)/1 Baloo 2,Nunito,sans-serif;color:#3a3a3a;}',
        '.cm-blk{background:#FFFDF7;border:2px solid #C9B68C;border-radius:9px;padding:2px 9px;}',
        '.cm-blk.cm-head{color:#0F4A40;border-color:#146B5E;background:#EAF5F1;}',
        '.cm-seam{color:#F2784B;font-weight:800;}',
        /* the meaning banner (ticket) */
        '.cm-mean{font:800 clamp(1rem,4.6vw,1.3rem)/1.15 Baloo 2,Nunito,sans-serif;color:#0F4A40;text-align:center;background:#EAF5F1;border-radius:12px;padding:6px 16px;}',
        '.cm-frame{font:800 clamp(1rem,4.6vw,1.35rem)/1.2 Baloo 2,Nunito,sans-serif;color:#0F4A40;text-align:center;}',
        '.cm-frame .cm-blank{color:#F2784B;border-bottom:3px solid #F2784B;padding:0 14px;}',
        /* part-picture context strip (the two parts) */
        '.cm-parts{display:flex;align-items:flex-start;justify-content:center;gap:12px;}',
        '.cm-part{display:flex;flex-direction:column;align-items:center;gap:1px;}',
        '.cm-part img{width:clamp(54px,16vw,84px);height:clamp(54px,16vw,84px);object-fit:contain;}',
        '.cm-part .cm-pw{font:700 .76rem/1 Nunito,sans-serif;color:#0F4A40;}',
        '.cm-part.lit img{filter:drop-shadow(0 0 6px #F2784B);}',
        '.cm-plus{align-self:center;font:800 1.3rem/1 Baloo 2,sans-serif;color:#9a8a66;}',
        /* meaning / form / word choice buttons — TEXT (no image → never sparse) */
        '.cm-choices{display:flex;flex-direction:column;gap:7px;width:100%;max-width:min(94vw,400px);}',
        '.cm-card{width:100%;min-height:48px;border:2.5px solid #146B5E;border-radius:13px;background:#fff;color:#0F4A40;cursor:pointer;padding:8px 12px;font:700 .95rem/1.2 Nunito,system-ui,sans-serif;text-align:center;}',
        '.cm-card.form{font:800 1rem/1 Baloo 2,Nunito,sans-serif;}',
        '.cm-card.dim{opacity:.4;}',
        '.cm-choices.two{flex-direction:row;justify-content:center;}',
        '.cm-choices.two .cm-card{width:auto;min-width:120px;flex:0 1 auto;}',
        /* supply: part-picture choice tiles (content-sized, §A.13.62 not-sparse) */
        '.cm-pgrid{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;width:100%;}',
        '.cm-tile{display:flex;flex-direction:column;align-items:center;gap:1px;border:2.5px solid #146B5E;border-radius:13px;background:#fff;cursor:pointer;padding:5px 9px 4px;min-height:48px;flex:0 0 auto;}',
        '.cm-tile img{width:clamp(52px,15vw,64px);height:clamp(52px,15vw,64px);object-fit:contain;pointer-events:none;}',
        '.cm-tile .cm-pw{font:700 .8rem/1 Nunito,sans-serif;color:#0F4A40;}',
        '.cm-tile.dim{opacity:.4;}',
        '.cm-btn{min-height:46px;border-radius:13px;border:none;font:800 1rem/1 Baloo 2,Nunito,sans-serif;cursor:pointer;padding:8px 22px;background:#F2784B;color:#fff;}',
        '.cm-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        /* short/narrow trim so the tallest state (predict resolved: word + 2
           part-pics + 3 wrapping glosses + the shell Check) clears the 320×640 fold */
        '@media (max-width:380px){.cm-root{gap:5px;}.cm-parts{gap:8px;}.cm-part img{width:44px;height:44px;}.cm-part .cm-pw{font-size:.7rem;}.cm-card{min-height:44px;padding:4px 9px;font-size:.84rem;line-height:1.12;}.cm-choices{gap:5px;}.cm-word{font-size:1.02rem;}.cm-mean,.cm-frame{font-size:1rem;}}',
        '.lcs-app:not(.skip-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'compound-meaning.predict.l-2-4-d';
      var tries = ['/mini-tools/compound-meaning-activities.json', 'compound-meaning-activities.json', '../mini tools/compound-meaning-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            var rp = (row && row.params) || {};
            self._pool = ((rp.roundsL10n && rp.roundsL10n[lang()]) || rp.rounds) || [];
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
      var pk = { predict: 'qpredict', ticket: 'qticket', supply: 'qsupply', head: 'qhead', build: 'qbuild' }[round.cog] || 'qpredict';
      return {
        id: round.id, promptKey: pk, promptArgs: {}, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1;
      this._pending = null; this._nonConf = {}; this._welded = (round.cog !== 'build');
      this._displayOrder = this._shuffle((round.choices || []).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('skip-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'cm-root');

      var say = el('div', 'cm-say');
      var sk = el('div'); sk.innerHTML = skipSVG();
      var line = el('p', 'cm-line'); line.setAttribute('aria-live', 'polite'); line.textContent = txt(round.cog === 'build' && !this._welded ? 'build' : round.cog);
      var bd = el('div'); bd.innerHTML = boardSVG(this._finds);
      say.append(sk, line, bd); root.appendChild(say); this._line = line;

      ({ predict: '_renderPredict', ticket: '_renderTicket', supply: '_renderSupply', head: '_renderHead', build: '_renderBuild' }[round.cog] &&
        this[{ predict: '_renderPredict', ticket: '_renderTicket', supply: '_renderSupply', head: '_renderHead', build: '_renderBuild' }[round.cog]](root));

      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    /* ---------- shared bits ---------- */
    _partsStrip: function (root, litWhich) {
      if (this._resolved) return;   /* once answered, the part-pics are context no longer needed (reclaims the fold) */
      var e = this._round.entry;
      var strip = el('div', 'cm-parts');
      [e.part1, e.part2].forEach(function (p, i) {
        var pc = el('div', 'cm-part' + (litWhich === i + 1 ? ' lit' : ''));
        pc.innerHTML = '<img src="' + imgUrl(p) + '" alt="' + esc(partWord(p.noun)) + '" onerror="this.style.visibility=\'hidden\'"><span class="cm-pw">' + esc(partWord(p.noun)) + '</span>';
        strip.appendChild(pc);
      });
      root.appendChild(strip);
    },
    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('skip-resolved');
      this.render();
      if (this._line) { this._line.textContent = txt('win'); this._line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
    },
    _nudge: function (kind) {
      var key = kind === 'made-of' ? 'nudgeMadeOf' : kind === 'reversed' ? 'nudgeReversed' : kind === 'mod' ? 'nudgeHead' : 'nudgeWrong';
      this._api.sound && this._api.sound(440);
      this.render();   /* render FIRST (resets the line) then set the scaffold + light the parts */
      var litParts = this._api.stage.querySelectorAll('.cm-part');
      for (var i = 0; i < litParts.length; i++) litParts[i].classList.add('lit');
      if (this._line) { this._line.textContent = txt(key); this._line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    /* the text-gloss / form / word choice list (predict / ticket / build-mean / head) */
    _choiceList: function (root, opts) {
      var self = this, r = this._round, tok = this._token;
      var box = el('div', 'cm-choices' + (opts.two ? ' two' : ''));
      this._displayOrder.forEach(function (oi) {
        var c = r.choices[oi];
        var lg = lang();
        var label = c.text || ((lg === 'de' || lg === 'nl') ? partWord(c.word) : c.word);
        var b = el('button', 'cm-card cm-card' + (opts.form ? ' form' : '') + (self._nonConf[oi] ? ' dim' : ''));
        b.type = 'button'; b.textContent = label; b.setAttribute('aria-label', label);
        if (opts.form) b.classList.add('form');
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[oi] || self._token !== tok) return;
          if (cmIsAnswer(r, oi)) self._resolve();
          else { self._nonConf[oi] = 1; self._nudge(c.kind); }
        });
        box.appendChild(b);
      });
      root.appendChild(box);
    },

    _renderPredict: function (root) {
      var w = el('div', 'cm-word'); w.innerHTML = weldedHTML(this._round.entry); root.appendChild(w);
      this._partsStrip(root);
      this._choiceList(root, {});
    },
    _renderTicket: function (root) {
      var e = this._round.entry;
      var m = el('div', 'cm-mean'); m.textContent = (lang() === 'de' && e.meaningDE) ? e.meaningDE : (lang() === 'nl' && e.meaningNL) ? e.meaningNL : Core.composeMeaning(e); root.appendChild(m);
      this._partsStrip(root);
      this._choiceList(root, { form: true });
    },
    _renderHead: function (root) {
      var e = this._round.entry, ch = this._round.choices;
      var w = el('div', 'cm-word'); w.innerHTML = weldedHTML(e); root.appendChild(w);
      var q = el('div', 'cm-line'); q.style.color = '#0F4A40'; q.style.font = '700 .92rem/1.2 Nunito,sans-serif';
      q.textContent = lang() === 'de'
        ? 'Ist ' + (e.artikel || 'ein') + ' ' + e.compound + ' eine Art ' + partWord(ch[0].word) + ' oder eine Art ' + partWord(ch[1].word) + '?'
        : lang() === 'nl'
        ? 'Is ' + (e.artikel || 'de') + ' ' + e.compound + ' een soort ' + partWord(ch[0].word).toLowerCase() + ' of een soort ' + partWord(ch[1].word).toLowerCase() + '?'
        : 'Is a ' + e.compound + ' a kind of ' + ch[0].word + ' or a kind of ' + ch[1].word + '?';
      root.appendChild(q);
      this._choiceList(root, { two: true });
    },
    _renderSupply: function (root) {
      var self = this, r = this._round, tok = this._token;
      var fr = el('div', 'cm-frame');
      fr.innerHTML = esc(r.frame).replace('___', '<span class="cm-blank">?</span>');
      root.appendChild(fr);
      var grid = el('div', 'cm-pgrid');
      this._displayOrder.forEach(function (oi) {
        var c = r.choices[oi];
        var b = el('button', 'cm-tile cm-img-card' + (self._nonConf[oi] ? ' dim' : ''));
        b.type = 'button'; b.setAttribute('aria-label', partWord(c.noun));
        b.innerHTML = '<img src="' + imgUrl(c) + '" alt="' + esc(partWord(c.noun)) + '" onerror="this.style.visibility=\'hidden\'"><span class="cm-pw">' + esc(partWord(c.noun)) + '</span>';
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[oi] || self._token !== tok) return;
          if (cmIsAnswer(r, oi)) self._resolve();
          else { self._nonConf[oi] = 1; self._nudge(c.kind); }
        });
        grid.appendChild(b);
      });
      root.appendChild(grid);
    },
    _renderBuild: function (root) {
      var self = this, r = this._round, tok = this._token;
      if (!this._welded) {
        /* phase 1: show the two parts + a Weld button (the formation on-ramp) */
        var pz = el('div', 'cm-parts');
        [r.entry.part1, r.entry.part2].forEach(function (p, i) {
          var pc = el('div', 'cm-part');
          pc.innerHTML = '<img src="' + imgUrl(p) + '" alt="' + esc(partWord(p.noun)) + '" onerror="this.style.visibility=\'hidden\'"><span class="cm-pw">' + esc(partWord(p.noun)) + '</span>';
          pz.appendChild(pc);
          if (i === 0) { var plus = el('div', 'cm-plus'); plus.textContent = '+'; pz.appendChild(plus); }
        });
        root.appendChild(pz);
        var row = el('div'); row.style.textAlign = 'center';
        var weld = el('button', 'cm-btn'); weld.type = 'button'; weld.textContent = txt('weld');
        weld.addEventListener('click', function () { if (self._token !== tok) return; self._welded = true; self.render(); });
        row.appendChild(weld); root.appendChild(row);
      } else {
        /* phase 2: the welded compound + "now what does it mean?" gloss choices */
        var w = el('div', 'cm-word'); w.innerHTML = weldedHTML(r.entry); root.appendChild(w);
        if (this._line) this._line.textContent = txt('buildMean');
        this._partsStrip(root);
        this._choiceList(root, {});
      }
    },

    _srMirror: function () {
      var r = this._round, e = r.entry;
      var wrap = el('div', 'cm-sronly'); wrap.setAttribute('aria-live', 'polite');
      var parts = partWord(e.part1.noun) + (lang() === 'de' ? ' und ' : lang() === 'nl' ? ' en ' : ' and ') + partWord(e.part2.noun);
      wrap.innerHTML = '<p>' + esc(e.compound) + ' — ' + esc(parts) + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.CompoundMeaningActivity = CompoundMeaningActivity;

}(typeof window !== 'undefined' ? window : this));
