/* =====================================================================
   QUILL'S MIRROR MARKET — ACTIVITY SKIN  (opposites-activity.js)
   ---------------------------------------------------------------------
   K.L.5.b · antonyms. The lcs-shell activity skin over opposites-core.js.
   answerType:'state'. EN-ONLY pilot. MOSTLY CODE-DRAWN SVG glyphs (no library
   photos); MEANING game → mute-safe + SR-first (print + glyph carry it; color
   rounds also LABEL the color in text → not color-only). TTS is optional support.

   7 distinct child-ACTIONS: pick / generate / balance / verb (select the
   opposite) · route (send a stream to the Opposite door or the Same-kind door)
   · oddpair (tap the pair that is NOT opposites) · scene (flip the backwards
   world). A correct act → resolve (shell Check = post-resolve advance, hidden
   until resolved via `.lcs-app.quill-resolved`); a WRONG act → a RELATION-
   BRANCHED warm nudge (same-dim sibling → "same KIND — but the OTHER end?";
   friend → "that's a friend — find its opposite"), the choice eases back,
   order reshuffles. The receive-only MIRROR-BOOK abundance vessel. Per-round
   token guard. 0 lines to ANY core / lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.OppositesCore;

  var L = {
    en: {
      pick: 'Tap the OPPOSITE — the other end!',
      generate: 'Tap the opposite. The other end!',
      balance: 'Balance the scale — tap the opposite!',
      verb: 'Tap the REVERSED action!',
      route: 'Opposite of {a}, or just the same KIND? Send each one!',
      oddpair: 'One pair is NOT opposites — tap it!',
      scene: 'Everything is backwards — tap each thing to FLIP it!',
      doorOpp: 'Opposite', doorSame: 'Same kind', trade: 'Trade it!',
      win: 'A perfect opposite! Into the Mirror-Book.',
      winScene: 'All fixed — goodnight! Into the Mirror-Book.',
      nudgeSibling: 'That’s the same KIND — but the OTHER end?',
      nudgeRelated: 'That’s a friend — find its opposite!',
      nudgeUnrelated: 'Not the opposite — look for the other end!'
    }
  };
  function txt(k, a) {
    var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
    var s = (L[lang] || L.en)[k] || L.en[k] || k;
    if (a) for (var p in a) s = s.replace('{' + p + '}', a[p]);
    return s;
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- CODE-DRAWN GLYPHS (no library photos) ---------- */
  function gly(g, size) {
    size = size || 48; g = g || {};
    var t = g.type, p = g.param, vb = '0 0 48 48';
    var open = '<svg viewBox="' + vb + '" width="' + size + '" height="' + size + '" aria-hidden="true" focusable="false">';
    var body = '';
    switch (t) {
      case 'swatch': {
        /* a neutral backing plate sits BEHIND the colour rect so a WHITE swatch
           reads on a white/cream card (the plate frames it); for dark colours
           the plate is hidden under the fill */
        var isWhite = (p === '#ffffff' || p === '#fff');
        body = '<rect x="4" y="4" width="40" height="40" rx="9" fill="#E4E4E4"/>' +
          '<rect x="6" y="6" width="36" height="36" rx="7" fill="' + (p || '#999') + '" stroke="#3a3a3a" stroke-width="' + (isWhite ? 2.5 : 1.5) + '"/>';
        break;
      }
        break;
      case 'arrow': {
        var rot = { up: 0, right: 90, down: 180, left: 270 }[p] || 0;
        body = '<g transform="rotate(' + rot + ' 24 24)"><path d="M24 8 L38 26 H30 V40 H18 V26 H10 Z" fill="#2A9D8F" stroke="#0F4A40" stroke-width="1.5" stroke-linejoin="round"/></g>';
        break;
      }
      case 'motion': {
        /* a hand-block + a directional arrow: push→ pull← lift↑ spin↻ drop↓ */
        var blk = '<rect x="6" y="18" width="14" height="14" rx="3" fill="#E9C46A" stroke="#9a7d2e" stroke-width="1.5"/>';
        var ar;
        if (p === 'push') ar = '<path d="M24 25 H42 M36 19 L43 25 L36 31" fill="none" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
        else if (p === 'pull') ar = '<path d="M44 25 H26 M32 19 L25 25 L32 31" fill="none" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
        else if (p === 'lift') ar = '<path d="M33 40 V14 M27 20 L33 13 L39 20" fill="none" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
        else if (p === 'drop') ar = '<path d="M33 8 V34 M27 28 L33 35 L39 28" fill="none" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
        else ar = '<path d="M40 24 a9 9 0 1 1 -3 -7 M37 11 V18 H30" fill="none" stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
        body = blk + ar;
        break;
      }
      case 'door':
        body = '<rect x="10" y="8" width="28" height="34" rx="2" fill="#caa472" stroke="#6e5326" stroke-width="2"/>' +
          (p === 'open'
            ? '<path d="M12 10 L26 6 V44 L12 40 Z" fill="#8a6a36" stroke="#5a4220" stroke-width="1.5"/><rect x="20" y="24" width="3" height="3" rx="1.5" fill="#2b2b2b"/>'
            : '<rect x="30" y="24" width="3.5" height="3.5" rx="1.7" fill="#3a2c14"/><line x1="14" y1="8" x2="14" y2="42" stroke="#6e5326" stroke-width="2"/>');
        break;
      case 'lamp': {
        var on = p === 'on';
        body = (on ? '<g stroke="#E9B100" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="3" x2="24" y2="9"/><line x1="8" y1="12" x2="12" y2="15"/><line x1="40" y1="12" x2="36" y2="15"/></g>' : '') +
          '<circle cx="24" cy="22" r="12" fill="' + (on ? '#FFD83B' : '#D9D9D9') + '" stroke="#8a8a8a" stroke-width="1.5"/>' +
          '<rect x="19" y="33" width="10" height="8" rx="2" fill="#9a9a9a"/>';
        break;
      }
      case 'celestial':
        body = (p === 'sun')
          ? '<g stroke="#F2A03B" stroke-width="2.6" stroke-linecap="round"><line x1="24" y1="4" x2="24" y2="11"/><line x1="24" y1="37" x2="24" y2="44"/><line x1="4" y1="24" x2="11" y2="24"/><line x1="37" y1="24" x2="44" y2="24"/><line x1="9" y1="9" x2="14" y2="14"/><line x1="34" y1="34" x2="39" y2="39"/><line x1="39" y1="9" x2="34" y2="14"/><line x1="14" y1="34" x2="9" y2="39"/></g><circle cx="24" cy="24" r="11" fill="#FFD83B" stroke="#E9A100" stroke-width="1.5"/>'
          : '<path d="M32 8 a17 17 0 1 0 8 28 A14 14 0 1 1 32 8 Z" fill="#CFE0F2" stroke="#7E94B0" stroke-width="1.5"/><circle cx="20" cy="16" r="1.6" fill="#9fb2cd"/><circle cx="17" cy="26" r="1.2" fill="#9fb2cd"/>';
        break;
      case 'fill': {
        var full = p === 'full';
        body = '<path d="M14 8 H34 L31 42 H17 Z" fill="none" stroke="#5a7d99" stroke-width="2"/>' +
          (full ? '<path d="M15.4 14 H32.6 L31 42 H17 Z" fill="#7EC8E3"/>' : '<path d="M18.2 38 H29.8 L31 42 H17 Z" fill="#cfe5ef"/>');
        break;
      }
      case 'size':
        body = (p === 'big')
          ? '<circle cx="24" cy="24" r="19" fill="#C2569B" stroke="#7c2e63" stroke-width="2"/>'
          : '<circle cx="24" cy="24" r="8" fill="#C2569B" stroke="#7c2e63" stroke-width="2"/>';
        break;
      case 'temp':
        body = '<rect x="20" y="6" width="8" height="26" rx="4" fill="#fff" stroke="#888" stroke-width="1.5"/><circle cx="24" cy="36" r="7" fill="' + (p === 'hot' ? '#E23B2E' : '#2F6FD0') + '"/>' +
          '<rect x="22.5" y="' + (p === 'hot' ? 10 : 22) + '" width="3" height="' + (p === 'hot' ? 26 : 14) + '" rx="1.5" fill="' + (p === 'hot' ? '#E23B2E' : '#2F6FD0') + '"/>';
        break;
      case 'face':
        body = '<circle cx="24" cy="24" r="19" fill="#FFD83B" stroke="#E9A100" stroke-width="2"/><circle cx="17" cy="20" r="2.4" fill="#3a3a3a"/><circle cx="31" cy="20" r="2.4" fill="#3a3a3a"/>' +
          (p === 'happy'
            ? '<path d="M15 29 q9 9 18 0" fill="none" stroke="#3a3a3a" stroke-width="2.6" stroke-linecap="round"/>'
            : '<path d="M15 33 q9 -9 18 0" fill="none" stroke="#3a3a3a" stroke-width="2.6" stroke-linecap="round"/>');
        break;
      default:
        body = '<rect x="8" y="8" width="32" height="32" rx="6" fill="#EAF5F1" stroke="#146B5E" stroke-width="1.5"/>';
    }
    return open + body + '</svg>';
  }

  /* a teal balance scale; the TARGET glyph rides the left (heavy) pan, the
     chosen opposite drops on the right pan + the beam LEVELS on resolve */
  function scaleSVG(targetGlyph, rightGlyph, leveled) {
    var ang = leveled ? 0 : 12;   /* +deg = clockwise → left (target) pan down */
    function onPan(g, cx) { return '<g transform="translate(' + (cx - 13) + ',57)">' + gly(g, 26) + '</g>'; }
    return '<svg class="op-scale" viewBox="0 0 200 134" aria-hidden="true">' +
      '<rect x="82" y="122" width="36" height="9" rx="3" fill="#0F4A40"/>' +
      '<polygon points="100,48 86,122 114,122" fill="#146B5E"/>' +
      '<g transform="rotate(' + ang + ' 100 48)">' +
      '<rect x="20" y="44" width="160" height="7" rx="3.5" fill="#146B5E"/>' +
      '<circle cx="100" cy="47" r="4.5" fill="#0F4A40"/>' +
      '<line x1="30" y1="51" x2="30" y2="62" stroke="#146B5E" stroke-width="2.5"/>' +
      '<line x1="170" y1="51" x2="170" y2="62" stroke="#146B5E" stroke-width="2.5"/>' +
      '<ellipse cx="30" cy="72" rx="17" ry="9" fill="#FCEDE4" stroke="#146B5E" stroke-width="2.5"/>' +
      '<ellipse cx="170" cy="72" rx="17" ry="9" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.5"/>' +
      onPan(targetGlyph, 30) +
      (rightGlyph ? onPan(rightGlyph, 170) : '') +
      '</g></svg>';
  }

  function quillSVG() {
    return '<svg class="op-quill" viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">' +
      '<ellipse cx="24" cy="30" rx="15" ry="13" fill="#C7A579"/>' +
      '<g fill="#8A6A3E"><path d="M10 22 L4 14 L13 18 Z"/><path d="M16 16 L12 6 L21 13 Z"/><path d="M24 13 L24 3 L31 12 Z"/><path d="M33 16 L40 8 L37 18 Z"/></g>' +
      '<circle cx="19" cy="29" r="2.3" fill="#2B2B2B"/><circle cx="29" cy="29" r="2.3" fill="#2B2B2B"/>' +
      '<ellipse cx="24" cy="34" rx="3" ry="2.2" fill="#3a2c1a"/>' +
      '<path d="M40 12 a5 5 0 1 0 .1 0 M44 16 l4 4" fill="none" stroke="#146B5E" stroke-width="2"/></svg>';
  }
  function bookSVG(n) {
    var cap2 = Math.min(n, 12), mirrors = '';
    for (var i = 0; i < cap2; i++) {
      var r = Math.floor(i / 3), c = i % 3, x = 13 + c * 9, y = 13 + r * 8;
      mirrors += '<ellipse cx="' + x + '" cy="' + y + '" rx="3" ry="3.6" fill="#EAF3F1" stroke="#146B5E" stroke-width="1.2"/>';
    }
    return '<svg class="op-book" viewBox="0 0 54 48" width="34" height="30" aria-hidden="true">' +
      '<path d="M6 10 Q27 4 27 9 Q27 4 48 10 V42 Q27 37 27 42 Q27 37 6 42 Z" fill="#FBF3E4" stroke="#146B5E" stroke-width="2"/>' +
      '<line x1="27" y1="9" x2="27" y2="42" stroke="#146B5E" stroke-width="1.5"/>' + mirrors + '</svg>';
  }

  var OppositesActivity = {
    id: 'opposites',
    strings: {
      title: { en: "Quill's Mirror Market" },
      instruction: { en: 'Bring Quill the OPPOSITE — the other end, not just a friend!' },
      qPick: { en: 'Find the opposite!' },
      qGenerate: { en: 'What is the opposite?' },
      qBalance: { en: 'Balance the scale!' },
      qVerb: { en: 'Do the opposite action!' },
      qRoute: { en: 'Opposite, or just the same kind?' },
      qOddpair: { en: 'Which pair is NOT opposites?' },
      qScene: { en: 'Flip the backwards world!' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._pending = null; this._nonConf = {};
      this._routeLocked = {}; this._sceneFlipped = {};
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('op-style')) return;
      var s = el('style'); s.id = 'op-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.op-root{display:flex;flex-direction:column;align-items:center;gap:7px;width:100%;max-width:560px;margin:0 auto;}',
        '.op-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.op-quill,.op-book{flex:0 0 auto;}',
        '.op-line{flex:1 1 auto;min-height:1.05em;text-align:center;font:700 .82rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.op-line.miss{color:#C2410C;}',
        /* target card */
        '.op-target{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 12px;border-radius:13px;background:#FFFDF7;border:2.5px dashed #C9B68C;}',
        '.op-target .op-w{font:800 1rem/1 Baloo 2,Nunito,sans-serif;color:#0F4A40;}',
        '.op-prompt{font:800 1.05rem/1.15 Baloo 2,Nunito,sans-serif;color:#0F4A40;text-align:center;background:#EAF5F1;border-radius:11px;padding:6px 14px;}',
        /* content-sized glyph tiles in a flex-wrap centred row (§A.13.62) */
        '.op-grid{display:flex;flex-wrap:wrap;gap:8px;width:100%;justify-content:center;}',
        '.op-card{display:flex;flex-direction:column;align-items:center;gap:1px;border:2.5px solid #146B5E;border-radius:13px;background:#fff;cursor:pointer;padding:4px 8px 3px;min-height:48px;flex:0 0 auto;}',
        '.op-card svg{pointer-events:none;}',
        '.op-card .op-w{font:700 .82rem/1 Nunito,sans-serif;color:#0F4A40;}',
        '.op-card.sel{border-color:#F2784B;background:#FCEDE4;}',
        '.op-card.dim{opacity:.4;}',
        '.op-card.lock{opacity:.55;border-style:dashed;cursor:default;}',
        '.op-card.flip{border-color:#2A9D8F;background:#EAF5F1;}',
        /* route = a vertical list of ALIGNED 3-col rows: [swatch+word] [Opposite]
           [Same-kind]. ONE border level (only the door pills are bordered — the
           row itself is borderless on a faint cream backing) so doors line up in
           clean vertical columns + carry a pre-reader icon. */
        '.op-rgrid{display:flex;flex-direction:column;gap:6px;width:100%;max-width:392px;}',
        '.op-rcard{display:grid;grid-template-columns:92px 1fr 1fr;align-items:center;gap:6px;width:100%;padding:2px 5px;min-height:46px;border:none;background:#FFFDF7;border-radius:13px;}',
        '.op-rlabel{display:flex;align-items:center;gap:5px;min-width:0;}',
        '.op-rlabel .op-w{font:700 .8rem/1 Nunito,sans-serif;color:#0F4A40;}',
        '.op-door{width:100%;min-height:44px;border-radius:10px;border:2px solid #146B5E;background:#fff;color:#146B5E;font:800 .74rem/1.05 Baloo 2,Nunito,sans-serif;cursor:pointer;padding:3px 5px;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:3px;text-align:center;}',
        '.op-dmark{font:800 .98rem/1 Baloo 2,Nunito,sans-serif;color:#146B5E;}',
        '.op-door.opp{border-color:#F2784B;color:#C2410C;}',
        '.op-door.opp .op-dmark{color:#F2784B;}',
        '.op-rdone{grid-column:2 / 4;justify-self:center;color:#2A9D8F;font:800 1rem/1 Baloo 2,sans-serif;}',
        /* oddpair */
        '.op-pair{display:flex;flex-direction:row;align-items:center;gap:3px;border:2.5px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;padding:5px 9px;min-height:48px;}',
        '.op-pair .op-x{color:#9a8a66;font-weight:800;}',
        '.op-pair.sel{border-color:#F2784B;background:#FCEDE4;}',
        /* balance scale */
        '.op-scalewrap{display:flex;flex-direction:column;align-items:center;gap:3px;}',
        '.op-scale{width:208px;height:138px;}',
        '.op-scap{font:800 .98rem/1 Baloo 2,Nunito,sans-serif;color:#0F4A40;background:#FFFDF7;border-radius:9px;padding:2px 12px;}',
        /* shared controls */
        '.op-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;width:100%;}',
        '.op-btn{min-height:46px;border-radius:13px;border:none;font:800 1rem/1 Baloo 2,Nunito,sans-serif;cursor:pointer;padding:7px 20px;background:#F2784B;color:#fff;}',
        '.op-btn[disabled]{opacity:.45;cursor:default;}',
        '.op-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.op-scale{width:170px;height:113px;}.op-root{gap:6px;}}',
        '.lcs-app:not(.quill-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'opposites.antonyms.k-l-5-b';
      var tries = ['/mini-tools/opposites-activities.json', 'opposites-activities.json', '../mini tools/opposites-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && row.params.rounds) || [];
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
      var pk = { pick: 'qPick', generate: 'qGenerate', balance: 'qBalance', verb: 'qVerb', route: 'qRoute', oddpair: 'qOddpair', scene: 'qScene' }[round.cog] || 'qPick';
      return {
        id: round.id, promptKey: pk, promptArgs: {}, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1;
      this._pending = null; this._nonConf = {}; this._routeLocked = {}; this._sceneFlipped = {};
      this._displayOrder = round.choices ? this._shuffle(round.choices.map(function (_, i) { return i; })) : null;
      this._streamOrder = round.stream ? this._shuffle(round.stream.map(function (_, i) { return i; })) : null;
      this._pairOrder = round.pairs ? this._shuffle(round.pairs.map(function (_, i) { return i; })) : null;
      if (this._app) this._app.classList.remove('quill-resolved');
    },

    _speak: function (token) {
      if (!global.LCSAudio || !global.LCSAudio.speak || !token || !token.word) return;
      global.LCSAudio.speak({ type: 'word', text: String(token.word), lang: 'en', rate: 0.95 });
    },

    _card: function (token, opts) {
      opts = opts || {}; var self = this;
      var b = el('button', 'op-card' + (opts.extra ? ' ' + opts.extra : ''));
      b.type = 'button'; b.setAttribute('aria-label', cap(token.word));
      if (opts.selected) b.classList.add('sel');
      if (opts.dim) b.classList.add('dim');
      if (opts.lock) b.classList.add('lock');
      if (opts.flip) b.classList.add('flip');
      b.innerHTML = gly(token.glyph, 52) + '<span class="op-w">' + esc(cap(token.word)) + '</span>';
      if (opts.onTap) b.addEventListener('click', function () { self._speak(token); opts.onTap(); });
      return b;
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'op-root');

      var say = el('div', 'op-say');
      var q = el('div'); q.innerHTML = quillSVG();
      var line = el('p', 'op-line'); line.setAttribute('aria-live', 'polite');
      line.textContent = txt(round.cog, round.anchor ? { a: cap(round.anchor.word) } : null);
      var bk = el('div'); bk.innerHTML = bookSVG(this._finds);
      say.append(q, line, bk); root.appendChild(say); this._line = line;

      ({ pick: '_renderSelect', generate: '_renderSelect', verb: '_renderSelect', balance: '_renderBalance', route: '_renderRoute', oddpair: '_renderOddpair', scene: '_renderScene' }[round.cog] &&
        this[{ pick: '_renderSelect', generate: '_renderSelect', verb: '_renderSelect', balance: '_renderBalance', route: '_renderRoute', oddpair: '_renderOddpair', scene: '_renderScene' }[round.cog]](root));

      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    /* ---------- resolve / nudge ---------- */
    _resolve: function (sceneWin) {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('quill-resolved');
      this.render();
      if (this._line) { this._line.textContent = txt(sceneWin ? 'winScene' : 'win'); this._line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
    },
    _nudge: function (relation) {
      var key = relation === 'same-dim-sibling' ? 'nudgeSibling' : (relation === 'related' || relation === 'synonym') ? 'nudgeRelated' : 'nudgeUnrelated';
      this._api.sound && this._api.sound(440);
      this.render();   /* render FIRST (it resets the line), then set the nudge */
      if (this._line) { this._line.textContent = txt(key); this._line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    /* ---------- pick / generate / verb : select + Trade ---------- */
    _renderSelect: function (root) {
      var self = this, r = this._round, tok = this._token;
      if (r.cog === 'generate') {
        var pr = el('div', 'op-prompt'); pr.textContent = 'Opposite of ' + cap(r.target.word) + '?'; root.appendChild(pr);
      } else {
        var tg = el('div', 'op-target'); tg.innerHTML = gly(r.target.glyph, 50) + '<span class="op-w">' + esc(cap(r.target.word)) + (r.cog === 'verb' ? ' …?' : '') + '</span>'; root.appendChild(tg);
      }
      var grid = el('div', 'op-grid');
      this._displayOrder.forEach(function (oi) {
        grid.appendChild(self._card(r.choices[oi], {
          selected: self._pending === oi, dim: !!self._nonConf[oi],
          onTap: function () { if (self._resolved || self._nonConf[oi] || self._token !== tok) return; self._pending = oi; self.render(); }
        }));
      });
      root.appendChild(grid);
      var row = el('div', 'op-row');
      var commit = el('button', 'op-btn'); commit.type = 'button'; commit.textContent = txt('trade');
      commit.disabled = (this._pending == null);
      commit.addEventListener('click', function () {
        if (self._resolved || self._pending == null || self._token !== tok) return;
        if (Core.isAnswer(r, self._pending)) self._resolve();
        else {
          var w = self._pending; self._nonConf[w] = 1; self._pending = null;
          self._displayOrder = self._shuffle(r.choices.map(function (_, i) { return i; }));
          self._nudge(r.choices[w].relation);
        }
      });
      row.appendChild(commit); root.appendChild(row);
    },

    /* ---------- balance : tap the opposite to level the scale ---------- */
    _renderBalance: function (root) {
      var self = this, r = this._round, tok = this._token, lvl = this._resolved;
      var rightGlyph = lvl ? (Core.correctChoice(r) || {}).glyph : null;
      var see = el('div', 'op-scalewrap');
      see.innerHTML = scaleSVG(r.target.glyph, rightGlyph, lvl) +
        '<div class="op-scap">' + esc(cap(r.target.word)) + '</div>';
      root.appendChild(see);
      var grid = el('div', 'op-grid');
      this._displayOrder.forEach(function (oi) {
        grid.appendChild(self._card(r.choices[oi], {
          dim: !!self._nonConf[oi],
          onTap: function () {
            if (self._resolved || self._nonConf[oi] || self._token !== tok) return;
            if (Core.isAnswer(r, oi)) self._resolve();
            else { self._nonConf[oi] = 1; self._nudge(r.choices[oi].relation); }
          }
        }));
      });
      root.appendChild(grid);
    },

    /* ---------- route : each stream token → Opposite door | Same-kind door ---------- */
    _renderRoute: function (root) {
      var self = this, r = this._round, tok = this._token;
      var anchor = el('div', 'op-target');
      anchor.innerHTML = gly(r.anchor.glyph, 44) + '<span class="op-w">' + esc(cap(r.anchor.word)) + '</span>';
      root.appendChild(anchor);
      var grid = el('div', 'op-rgrid');
      var ans = Core.oracle(r);   /* per-token correct door [0|1] */
      this._streamOrder.forEach(function (si) {
        var t = r.stream[si], locked = !!self._routeLocked[si];
        var card = el('div', 'op-card op-rcard' + (locked ? ' lock' : ''));
        card.setAttribute('aria-label', cap(t.word));
        var lab = el('div', 'op-rlabel');
        lab.innerHTML = gly(t.glyph, 40) + '<span class="op-w">' + esc(cap(t.word)) + '</span>';
        card.appendChild(lab);
        if (locked) { var d = el('span', 'op-rdone'); d.textContent = '✓'; card.appendChild(d); }
        else {
          /* the two doors are appended DIRECTLY to the grid card → they land in
             grid cells 2 & 3 (clean vertical columns across rows). `op-door-card`
             marks them as the measured answer controls for the visual-qa harness
             (route's tap surface is the doors, not the row). */
          [[0, 'doorOpp', 'opp'], [1, 'doorSame', '']].forEach(function (dd) {
            var btn = el('button', 'op-door op-door-card' + (dd[2] ? ' ' + dd[2] : '')); btn.type = 'button';
            /* a unicode mark (pre-reader cue: ↔ opposite-ends / = same) + the
               word. A TEXT symbol, not an <svg> — so the visual-qa harness does
               NOT content-measure the door as a sparse image-tile (it's a
               labeled control). The word text is preserved for SR + the test. */
            btn.innerHTML = '<span class="op-dmark" aria-hidden="true">' + (dd[2] ? '↔' : '=') + '</span><span>' + txt(dd[1]) + '</span>';
            btn.addEventListener('click', function () {
              if (self._resolved || self._routeLocked[si] || self._token !== tok) return;
              self._speak(t);
              if (Number(ans[si]) === dd[0]) {
                self._routeLocked[si] = 1;
                if (Object.keys(self._routeLocked).length === r.stream.length) self._resolve();
                else self.render();
              } else self._nudge(t.relation);
            });
            card.appendChild(btn);
          });
        }
        grid.appendChild(card);
      });
      root.appendChild(grid);
    },

    /* ---------- oddpair : tap the pair that is NOT opposites ---------- */
    _renderOddpair: function (root) {
      var self = this, r = this._round, tok = this._token;
      var grid = el('div', 'op-grid');
      this._pairOrder.forEach(function (pi) {
        var pr = r.pairs[pi];
        /* `op-pair-card` is a harness-match marker (the visual-qa card selector
           keys on a `-card` substring + role=button); op-pair carries styling */
        var card = el('div', 'op-pair op-pair-card' + (self._nonConf[pi] ? ' dim' : ''));
        card.setAttribute('role', 'button'); card.tabIndex = 0;
        card.setAttribute('aria-label', cap(pr.a.word) + ' and ' + cap(pr.b.word));
        card.innerHTML = gly(pr.a.glyph, 46) + '<span class="op-x">↔</span>' + gly(pr.b.glyph, 46);
        card.addEventListener('click', function () {
          if (self._resolved || self._nonConf[pi] || self._token !== tok) return;
          if (Core.isAnswer(r, pi)) self._resolve();
          else { self._nonConf[pi] = 1; self._nudge('related'); }   /* a non-odd tap = an opposite-pair, framed as "those ARE opposites" */
        });
        grid.appendChild(card);
      });
      root.appendChild(grid);
    },

    /* ---------- scene : tap each backwards element to flip it ---------- */
    _renderScene: function (root) {
      var self = this, r = this._round, tok = this._token;
      var grid = el('div', 'op-grid');
      r.elements.forEach(function (e, k) {
        var flipped = !!self._sceneFlipped[k];
        var cur = flipped ? e.flipGlyph : e.glyph, word = flipped ? e.flipWord : e.word;
        var card = el('button', 'op-card' + (flipped ? ' flip' : ''));
        card.type = 'button'; card.setAttribute('aria-label', cap(word) + (flipped ? ' (fixed)' : ' — tap to flip'));
        card.innerHTML = gly(cur, 50) + '<span class="op-w">' + esc(cap(word)) + '</span>';
        card.addEventListener('click', function () {
          if (self._resolved || self._token !== tok) return;
          self._sceneFlipped[k] = self._sceneFlipped[k] ? 0 : 1;
          self._speak({ word: word });
          var all = r.elements.every(function (_, j) { return self._sceneFlipped[j]; });
          if (all) self._resolve(true); else self.render();
        });
        grid.appendChild(card);
      });
      root.appendChild(grid);
    },

    _srMirror: function () {
      var round = this._round, toks = Core.allTokens(round);
      var wrap = el('div', 'op-sronly'); wrap.setAttribute('aria-live', 'polite');
      wrap.innerHTML = '<ul>' + toks.map(function (t) { return '<li>' + esc(cap(t.word)) + '</li>'; }).join('') + '</ul>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.OppositesActivity = OppositesActivity;

}(typeof window !== 'undefined' ? window : this));
