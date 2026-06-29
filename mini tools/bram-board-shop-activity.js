/* =====================================================================
   BRAM'S BOARD SHOP — ACTIVITY  (bram-board-shop-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.B.5 — model a LENGTH word problem within 100 (combine / cut /
   compare) with the unknown in ANY position, on a tape/ruler drawing. An
   order ticket arrives; the story is read; the child MODELS it on Bram's
   measuring tape — tap a length tile, tap a tape SEGMENT to place it, mark
   the mystery segment "?", LEAVE the magnitude-decoy in the tray; then dial
   the DERIVED length in cm and "Measure it". Correct → the board is cut.
   Wrong → gentle (no red), tiles reshuffle (anti-brute-force), retry.

   The tape draws known segments PROPORTIONAL (flex-grow ∝ value) on a ruler
   baseline — the "drawing of a ruler" the standard names, and the visible
   differentiator from the vet bar-model. All grading from length-tape-core.js
   (the number is DERIVED — no `answer` field). 0 lines to any protected core
   + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.LengthTapeCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A', WOOD: '#C9A86B' };

  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  global.BramBoardShopActivity = {
    id: 'bram-board-shop-activity',

    strings: {
      title: { en: "Bram's Board Shop", de: 'Brams Bretter-Werkstatt' },
      prompt: { en: 'Measure the order.', de: 'Miss die Bestellung aus.' },
      measure: { en: 'Measure it 📏', de: 'Ausmessen 📏' },
      replay: { en: '🔊 Read again', de: '🔊 Noch einmal vorlesen' },
      sayWelcome: { en: 'A new order! Show me the lengths.', de: 'Eine neue Bestellung! Zeig mir die Längen.' },
      sayModel: { en: 'Put each length on its piece. One piece is the mystery — mark it.', de: 'Leg jede Länge auf ihr Stück. Ein Stück ist das Rätsel – markiere es.' },
      sayDial: { en: 'Now — how many centimetres? Dial it in!', de: 'Und jetzt – wie viele Zentimeter? Tippe es ein!' },
      sayWin: { en: 'Measured and cut! Perfect fit. 🪵', de: 'Gemessen und gesägt! Passt genau. 🪵' },
      sayWait: { en: "Hmm, let's measure again.", de: 'Hmm, lass uns noch einmal messen.' },
      pickTile: { en: 'Now tap the piece where it belongs.', de: 'Tippe nun auf das Stück, wo sie hingehört.' },
      hintCheck: { en: 'Place the lengths, mark the mystery, dial the cm.', de: 'Leg die Längen hin, markiere das Rätsel, tippe die cm ein.' },
      ariaMystery: { en: 'mystery length', de: 'Rätsel-Länge' },
      ariaHolds: { en: 'holds {n} centimetres', de: 'ist {n} Zentimeter lang' },
      ariaEmpty: { en: 'empty piece — tap to place a length or mark the mystery', de: 'leeres Stück – tippe, um eine Länge zu platzieren oder das Rätsel zu markieren' },
      ariaTileCm: { en: '{n} centimetres', de: '{n} Zentimeter' },
      ariaRecap: { en: 'your model: {eq} centimetres', de: 'dein Modell: {eq} Zentimeter' },
      ariaClear: { en: 'clear', de: 'löschen' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.binding = {}; this.dialed = null; this._selected = null; this.msg = null; this._tray = null; this.cutCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.binding = {}; this.dialed = null; this._selected = null; this.msg = null; this._spoke = false;
      this._tray = shuffle(this.snap.tiles.map(function (t) { return t.id; }));
    },

    /* ---------- helpers ---------- */
    _tileById: function (id) { for (var i = 0; i < this.snap.tiles.length; i++) { if (this.snap.tiles[i].id === id) return this.snap.tiles[i]; } return null; },
    _val: function (role) { var b = this.binding[role]; if (b && b !== '?') { var t = this._tileById(b); return t ? t.value : null; } return null; },
    _boundTiles: function () { var s = this, out = {}; this.snap.roles.forEach(function (role) { var b = s.binding[role]; if (b && b !== '?') out[b] = role; }); return out; },
    _isFullyBound: function () { var s = this; return this.snap.roles.every(function (role) { return s.binding[role] != null; }); },
    /* render-mapping: change/bracket → a part-whole tape {whole, partA, partB roles}; compare → bars */
    _partWhole: function () {
      var d = this.snap.diagram, r = this.round;
      if (d === 'bracket') return { whole: 'whole', partA: 'partA', partB: 'partB' };
      if (d === 'change') return (r.op === 'add')
        ? { whole: 'result', partA: 'start', partB: 'change' }
        : { whole: 'start', partA: 'result', partB: 'change' };
      return null;
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'bbs-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this;

      var say = api.el('div', 'bbs-saytop');
      say.innerHTML = '<span class="bbs-bram' + (this.solved ? ' bbs-bounce' : '') + '">🦫</span><span class="bbs-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      var phase = this.solved ? 'solved' : (this._isFullyBound() ? 'dial' : 'model');

      if (phase === 'model') {
        var story = api.el('div', 'bbs-story');
        var stext = api.el('p', 'bbs-storytext'); stext.textContent = this.round.story; story.appendChild(stext);
        var replay = api.el('button', 'bbs-replay'); replay.type = 'button'; replay.textContent = api.t('replay');
        replay.addEventListener('click', function () { speak(self.round.story); });
        story.appendChild(replay);
        root.appendChild(story);

        var cols = api.el('div', 'bbs-cols');
        var left = api.el('div', 'bbs-left'); var right = api.el('div', 'bbs-right');
        this._renderTape(left); this._renderTray(right);
        cols.appendChild(left); cols.appendChild(right); root.appendChild(cols);
      } else if (phase === 'dial') {
        this._renderRecap(root, false);
        this._renderDial(root);
      } else {
        this._renderRecap(root, true);
        var done = api.el('div', 'bbs-done'); done.innerHTML = '<span class="bbs-sticker">🪵</span><span class="bbs-donetext">' + esc(api.t('sayWin')) + '</span>'; root.appendChild(done);
      }
      stage.appendChild(root);
      if (!this._spoke && !this.solved) { this._spoke = true; setTimeout(function () { speak(self.round.story); }, 260); }
    },

    /* ---- the TAPE (proportional known segments on a ruler baseline) ---- */
    _renderTape: function (parent) {
      var api = this.api, self = this, d = this.snap.diagram;
      var wrap = api.el('div', 'bbs-tape bbs-' + d);
      // a decorative ruler strip (ticks 0..100 by 10)
      var ruler = api.el('div', 'bbs-ruler'); ruler.setAttribute('aria-hidden', 'true');
      for (var k = 0; k <= 10; k++) { var tk = api.el('span', 'bbs-tick' + (k % 5 === 0 ? ' bbs-tickbig' : '')); ruler.appendChild(tk); }
      wrap.appendChild(ruler);

      if (d === 'compare') { this._renderCompare(wrap); }
      else { this._renderPartWhole(wrap); }
      parent.appendChild(wrap);
    },
    _segSlot: function (role, kind) {
      // kind: 'seg' (in-row board piece) | 'whole' (brace label) | 'bar' (compare value)
      var api = this.api, self = this;
      var b = this.binding[role];
      var slot = api.el('button', 'bbs-slot bbs-' + (kind || 'seg') + (b === '?' ? ' bbs-unknown' : (b ? ' bbs-filled' : ' bbs-empty')));
      slot.type = 'button'; slot.setAttribute('data-role', role);
      slot.textContent = (b === '?') ? '?' : (b ? (this._tileById(b) || {}).value : '');
      slot.setAttribute('aria-label', b === '?' ? this.api.t('ariaMystery') : (b ? this.api.t('ariaHolds').replace('{n}', (this._tileById(b) || {}).value) : this.api.t('ariaEmpty')));
      if (!this.solved) slot.addEventListener('click', function () { self._tapSlot(role); });
      // proportional growth for in-row segments (known → ∝ value; unknown/empty → fixed)
      if (kind === 'seg' || kind === 'bartrack') {
        var v = (b && b !== '?') ? (this._tileById(b) || {}).value : null;
        slot.style.flexGrow = v != null ? String(Math.max(1, v)) : '14';
      }
      return slot;
    },
    _renderPartWhole: function (wrap) {
      var api = this.api, pw = this._partWhole();
      // whole brace + label on top
      var top = api.el('div', 'bbs-pw-top'); top.appendChild(this._segSlot(pw.whole, 'whole'));
      var brace = api.el('div', 'bbs-brace'); brace.setAttribute('aria-hidden', 'true');
      // two parts end-to-end (proportional)
      var bot = api.el('div', 'bbs-pw-bot'); bot.appendChild(this._segSlot(pw.partA, 'seg')); bot.appendChild(this._segSlot(pw.partB, 'seg'));
      wrap.appendChild(top); wrap.appendChild(brace); wrap.appendChild(bot);
    },
    _renderCompare: function (wrap) {
      var api = this.api;
      var bars = api.el('div', 'bbs-bars');
      ['bigger', 'smaller'].forEach((function (role) {
        var row = api.el('div', 'bbs-bar');
        row.appendChild(this._segSlot(role, 'bartrack'));      // the proportional bar body (holds the value)
        var spacer = api.el('span', 'bbs-barspace'); spacer.setAttribute('aria-hidden', 'true'); row.appendChild(spacer);
        bars.appendChild(row);
      }).bind(this));
      wrap.appendChild(bars);
      var diff = api.el('div', 'bbs-diffwrap');
      var lab = api.el('span', 'bbs-difflab'); lab.textContent = '↔'; lab.setAttribute('aria-hidden', 'true');
      diff.appendChild(lab); diff.appendChild(this._segSlot('difference', 'bar2')); wrap.appendChild(diff);
    },

    _renderTray: function (parent) {
      var api = this.api, self = this;
      var hint = api.el('div', 'bbs-trayhint'); hint.textContent = this._selected != null ? api.t('pickTile') : api.t('sayModel');
      parent.appendChild(hint);
      var tray = api.el('div', 'bbs-tray');
      var bound = this._boundTiles();
      this._tray.forEach(function (id) {
        if (id in bound) return;
        var t = self._tileById(id); if (!t) return;
        var sel = (self._selected === id);
        var b = api.el('button', 'bbs-tile' + (sel ? ' bbs-sel' : '')); b.type = 'button'; b.setAttribute('data-id', id);
        b.textContent = t.value; b.setAttribute('aria-label', api.t('ariaTileCm').replace('{n}', t.value));
        b.addEventListener('click', function () { self._tapTile(id); });
        tray.appendChild(b);
      });
      parent.appendChild(tray);
    },

    _renderRecap: function (parent, withAnswer) {
      var api = this.api, self = this, r = this.round;
      var val = function (role) {
        if (role === r.unknownRole) return (withAnswer && self.dialed != null) ? self.dialed : '?';
        var v = self._val(role); return v == null ? '?' : v;
      };
      var eq;
      if (r.diagram === 'change') eq = val('start') + ' ' + (r.op === 'sub' ? '−' : '+') + ' ' + val('change') + ' = ' + val('result');
      else if (r.diagram === 'bracket') eq = val('partA') + ' + ' + val('partB') + ' = ' + val('whole');
      else eq = val('smaller') + ' + ' + val('difference') + ' = ' + val('bigger');
      var box = api.el('div', 'bbs-recap'); box.textContent = eq + ' cm'; box.setAttribute('aria-label', api.t('ariaRecap').replace('{eq}', eq));
      parent.appendChild(box);
    },

    _renderDial: function (parent) {
      var api = this.api, self = this;
      var row = api.el('div', 'bbs-disprow');
      var disp = api.el('div', 'bbs-disp'); disp.textContent = (this.dialed == null ? '?' : this.dialed) + ' cm'; row.appendChild(disp);
      var rep = api.el('button', 'bbs-replay bbs-replaymini'); rep.type = 'button'; rep.textContent = '🔊'; rep.setAttribute('aria-label', api.t('replay'));
      rep.addEventListener('click', function () { speak(self.round.story); });
      row.appendChild(rep); parent.appendChild(row);
      var pad = api.el('div', 'bbs-keypad');
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(function (n) {
        var key = api.el('button', 'bbs-key'); key.type = 'button'; key.textContent = n; key.setAttribute('aria-label', String(n));
        key.addEventListener('click', function () { self._pushDigit(n); });
        pad.appendChild(key);
      });
      var clr = api.el('button', 'bbs-key bbs-keyclear'); clr.type = 'button'; clr.textContent = '⌫'; clr.setAttribute('aria-label', api.t('ariaClear'));
      clr.addEventListener('click', function () { self._clearDial(); }); pad.appendChild(clr);
      parent.appendChild(pad);
      var go = api.el('button', 'bbs-measure'); go.type = 'button'; go.textContent = api.t('measure');
      go.disabled = (this.dialed == null);
      go.addEventListener('click', function () { self._commit(); });
      parent.appendChild(go);
    },

    /* ---------- interaction ---------- */
    _tapTile: function (id) { this._selected = (this._selected === id) ? null : id; this.api.sound && this.api.sound(this._selected ? 560 : 400); this.msg = null; this.render(); },
    _tapSlot: function (role) {
      var prev = this.binding[role];
      if (this._selected != null) { this.binding[role] = this._selected; this._selected = null; this.api.sound && this.api.sound(640); }
      else if (prev && prev !== '?') { this.binding[role] = undefined; this.api.sound && this.api.sound(400); }
      else { this.binding[role] = (prev === '?') ? undefined : '?'; this.api.sound && this.api.sound(prev === '?' ? 400 : 520); }
      this._dedupeTile(role); this.msg = null; this.render();
    },
    _dedupeTile: function (keepRole) {
      var s = this, id = this.binding[keepRole];
      if (!id || id === '?') return;
      this.snap.roles.forEach(function (role) { if (role !== keepRole && s.binding[role] === id) s.binding[role] = undefined; });
    },
    _pushDigit: function (d) { var next = (this.dialed == null) ? d : (this.dialed * 10 + d); if (next > 100) next = d; this.dialed = next; this.api.sound && this.api.sound(600); this.render(); },
    _clearDial: function () { this.dialed = null; this.api.sound && this.api.sound(400); this.render(); },
    _dial: function (n) { this.dialed = (n == null) ? null : Math.max(0, Math.min(100, n)); this.render(); },   /* test seam */

    _commit: function () {
      var api = this.api;
      if (this.dialed == null) return;
      if (Core.gradeAttempt(this.round, this.binding, this.dialed)) { this._correct(); return; }
      this.msg = api.t('sayWait');
      this.binding = {}; this.dialed = null; this._selected = null;
      this._tray = shuffle(this.snap.tiles.map(function (t) { return t.id; }));
      api.sound && api.sound(360); this.render(); api.announce && api.announce(api.t('sayWait'));
    },
    _correct: function () {
      var api = this.api;
      this.solved = true; this.cutCount = Math.min(this.cutCount + 1, (this._pool && this._pool.length) || 9);
      this.msg = api.t('sayWin'); api.sound && api.sound(880); this.render(); api.announce && api.announce(api.t('sayWin'));
    },

    isCorrect: function () { return this.solved; },
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
      fetch('/mini-tools/bram-board-shop-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[bram-board-shop] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.bbs-root{position:relative;width:100%;max-width:min(96vw,700px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#F1E7D6);border-radius:16px;padding:clamp(7px,1.6vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);box-sizing:border-box;}'
        + '.bbs-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.bbs-saytext{min-width:0;overflow-wrap:break-word;}.bbs-bram{font-size:clamp(19px,4.6vw,26px);flex:0 0 auto;}.bbs-bounce{animation:bbsBounce .5s ease;}'
        + '@keyframes bbsBounce{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.bbs-story{background:#fff;border-radius:11px;padding:clamp(5px,1.4vw,8px) clamp(7px,1.8vw,10px);box-shadow:inset 0 0 0 2px rgba(160,120,60,.14);display:flex;align-items:flex-start;gap:6px;}'
        + '.bbs-storytext{margin:0;font:600 clamp(11.5px,2.9vw,14px)/1.28 "Nunito",sans-serif;color:' + C.INK + ';flex:1 1 auto;min-width:0;overflow-wrap:break-word;}'
        + '.bbs-replay{border:0;background:rgba(20,107,94,.1);color:' + C.T + ';border-radius:12px;padding:4px 8px;min-height:34px;font:700 clamp(10px,2.4vw,12px)/1 "Baloo 2",sans-serif;cursor:pointer;flex:0 0 auto;white-space:nowrap;}.bbs-replay:active{transform:translateY(1px);}'
        + '.bbs-cols{display:flex;flex-direction:row;gap:clamp(8px,2vw,14px);align-items:center;justify-content:center;min-width:0;}'
        + '.bbs-left{flex:1 1 56%;min-width:0;}.bbs-right{flex:1 1 40%;min-width:0;display:flex;flex-direction:column;gap:clamp(5px,1.2vw,8px);}'
        + '@media (max-width:540px){.bbs-cols{flex-direction:column;align-items:stretch;}.bbs-left,.bbs-right{flex:1 1 auto;width:100%;}}'
        /* the tape */
        + '.bbs-tape{background:rgba(160,120,60,.08);border-radius:12px;padding:clamp(7px,1.8vw,11px);display:flex;flex-direction:column;gap:5px;min-width:0;}'
        + '.bbs-ruler{display:flex;justify-content:space-between;align-items:flex-end;height:9px;padding:0 2px;border-bottom:2px solid rgba(160,120,60,.5);}'
        + '.bbs-tick{width:1.5px;height:5px;background:rgba(160,120,60,.55);}.bbs-tickbig{height:9px;width:2px;background:rgba(160,120,60,.8);}'
        + '.bbs-pw-top,.bbs-pw-bot{display:flex;}.bbs-pw-top{justify-content:center;}.bbs-pw-bot{gap:5px;}'
        + '.bbs-brace{height:8px;border:2.5px solid ' + C.WOOD + ';border-top:0;border-radius:0 0 8px 8px;margin:1px clamp(10px,8%,40px) 3px;position:relative;}'
        + '.bbs-brace::before{content:"";position:absolute;left:50%;top:-6px;width:2.5px;height:6px;background:' + C.WOOD + ';transform:translateX(-50%);}'
        + '.bbs-slot{border:2.5px dashed rgba(160,120,60,.55);background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.T + ';box-sizing:border-box;touch-action:manipulation;}'
        + '.bbs-seg{height:clamp(40px,10vw,48px);min-width:46px;border-radius:9px;flex:1 1 0;}'   /* flexGrow set inline ∝ value */
        + '.bbs-whole{min-width:52px;height:clamp(38px,9vw,46px);border-radius:11px;padding:0 12px;}'
        + '.bbs-bars{display:flex;flex-direction:column;gap:6px;}.bbs-bar{display:flex;align-items:center;}'
        + '.bbs-bartrack{height:clamp(34px,8vw,42px);min-width:46px;border-radius:9px;flex:1 1 0;}'   /* flexGrow inline */
        + '.bbs-barspace{flex:0 0 14px;}'
        + '.bbs-diffwrap{display:flex;align-items:center;justify-content:center;gap:6px;border-top:2px dashed rgba(160,120,60,.4);padding-top:5px;}.bbs-difflab{font:800 16px/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.bbs-bar2{min-width:50px;height:clamp(34px,8vw,42px);border-radius:9px;padding:0 12px;}'
        + '.bbs-slot.bbs-filled{border-style:solid;border-color:' + C.CORAL + ';background:#FFF1EA;color:' + C.CORAL2 + ';box-shadow:0 2px 0 rgba(217,87,47,.18);}'
        + '.bbs-slot.bbs-unknown{border-style:solid;border-color:' + C.T + ';background:#E7F1EE;color:' + C.T + ';}'
        + '.bbs-slot:active{transform:translateY(1px);}'
        + '.bbs-slot:focus-visible,.bbs-tile:focus-visible,.bbs-key:focus-visible,.bbs-measure:focus-visible,.bbs-replay:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* tray */
        + '.bbs-trayhint{text-align:center;font:700 clamp(11px,2.9vw,13px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';overflow-wrap:break-word;}'
        + '.bbs-tray{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,11px);justify-content:center;}'
        + '.bbs-tile{min-width:clamp(48px,12vw,60px);height:clamp(48px,12vw,60px);border-radius:13px;border:2px solid rgba(242,120,75,.5);background:#fff;box-shadow:0 2px 0 rgba(160,120,60,.16);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0 6px;box-sizing:border-box;color:' + C.CORAL2 + ';font:800 clamp(17px,4.4vw,21px)/1 "Baloo 2",sans-serif;touch-action:manipulation;}'
        + '.bbs-tile.bbs-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.32);transform:translateY(-2px);}.bbs-tile:active{transform:translateY(1px);}'
        /* dial */
        + '.bbs-recap{align-self:stretch;text-align:center;font:800 clamp(19px,5vw,26px)/1.1 "Baloo 2",sans-serif;color:' + C.T + ';padding:clamp(4px,1.2vw,7px);background:rgba(20,107,94,.07);border-radius:11px;}'
        + '.bbs-disprow{display:flex;align-items:center;justify-content:center;gap:8px;}.bbs-replaymini{min-height:34px;min-width:38px;padding:4px 8px;font-size:15px;}'
        + '.bbs-disp{min-width:64px;height:clamp(30px,6.5vw,36px);padding:0 14px;border-radius:11px;background:#fff;box-shadow:inset 0 0 0 2px ' + C.T + ';display:inline-flex;align-items:center;justify-content:center;font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.bbs-keypad{display:grid;grid-template-columns:repeat(6,clamp(42px,8.5vw,48px));gap:clamp(4px,1.1vw,6px);justify-content:center;}'
        + '.bbs-key{width:100%;aspect-ratio:1;border-radius:9px;border:0;background:#fff;box-shadow:0 2px 0 rgba(20,107,94,.16);cursor:pointer;font:800 clamp(13px,3.4vw,17px)/1 "Baloo 2",sans-serif;color:' + C.T + ';touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;}.bbs-key:active{transform:translateY(1px);}'
        + '.bbs-measure{align-self:center;min-height:46px;padding:0 clamp(16px,4.6vw,26px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.bbs-measure:disabled{opacity:.45;cursor:default;box-shadow:none;}.bbs-measure:active:not(:disabled){transform:translateY(2px);}'
        + '.bbs-done{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px;}.bbs-sticker{font-size:clamp(32px,8vw,48px);animation:bbsBounce .6s ease;}.bbs-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '@media (min-width:760px){.bbs-root{padding:14px 16px;}}'
        + '@media (max-width:480px){.bbs-root{gap:5px;padding:8px;}.bbs-storytext{font-size:12px;}.bbs-seg{height:42px;}.bbs-tile{min-height:46px;}}'
        + '@media (max-height:680px){.bbs-root{gap:3px;}.bbs-bram{font-size:20px;}.bbs-story{padding:4px 8px;}.bbs-storytext{font-size:11.5px;line-height:1.18;}.bbs-tape{padding:5px;gap:3px;}.bbs-seg{height:36px;}.bbs-bartrack{height:30px;}.bbs-trayhint{font-size:10.5px;}.bbs-tile{min-width:46px;height:46px;}.bbs-recap{font-size:19px;padding:3px;}.bbs-measure{min-height:44px;}}'
        /* very short (320×640): trim every model-phase band so the tape + tray + shell Check clear the fold */
        + '@media (max-height:640px){.bbs-root{gap:2px;padding:4px;}.bbs-saytop{font-size:9.5px;}.bbs-bram{font-size:17px;}.bbs-story{padding:2px 6px;}.bbs-storytext{font-size:10px;line-height:1.06;}.bbs-cols{gap:4px;}.bbs-tape{padding:3px;gap:1px;}.bbs-ruler{height:6px;}.bbs-seg{height:30px;min-width:40px;}.bbs-whole{height:30px;}.bbs-bartrack{height:24px;}.bbs-bars{gap:4px;}.bbs-diffwrap{padding-top:3px;}.bbs-brace{height:4px;margin:1px clamp(10px,8%,40px) 1px;}.bbs-trayhint{font-size:9.5px;}.bbs-tray{gap:5px;}.bbs-tile{min-width:44px;height:44px;font-size:16px;}.bbs-keypad{gap:4px;}}'
        + '@media (prefers-reduced-motion: reduce){.bbs-bounce,.bbs-sticker{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-bram-board-shop', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'bram-board-shop.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
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
