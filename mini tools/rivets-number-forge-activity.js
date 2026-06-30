/* =====================================================================
   RIVET'S NUMBER FORGE — ACTIVITY  (rivets-number-forge-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.3 — represent a counted quantity WITH a written numeral 0-20
   (0 = a count of none). Rivet the raccoon's junk-shop forge: tear a foil pack,
   the treasure tumbles, COUNT each object once (tap each), and the press MINTS
   the numeral FROM the count — the "3" is built from the three things. Fill the
   binder page → it gilds.

   THE COUNT-ENACTED PRODUCTION (the locked rework): there is NO 0-9 glyph menu
   to select/match/brute-force; the numeral is manufactured only by counting
   every object then pulling the lever. Seven distinct child-acts: count-mint /
   zero / parade / subset / verify / build-mint / reverse.

   Production cognition + the anti-cheat SOLVERS live in mini tools/
   numeral-album-core.js (pure). answerType:'state'. Rivet + treasure = SVG
   STUBS for CA5 (NO image-library → no 404). No timer/score/streak; a wrong
   forge is a no-shame re-count. 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.NumeralAlbumCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', GOLD2: '#c8841f', INK: '#2A2A35', BROWN: '#9A6B3F' };
  var WORDS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty' };
  var WORDS_DE = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn', 11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn', 15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn', 20: 'zwanzig' };
  var KIND_DE = {
    acorn:   { art: 'eine Eichel',        bare: 'Eichel',        pl: 'Eicheln' },
    button:  { art: 'ein Knopf',          bare: 'Knopf',         pl: 'Knöpfe' },
    firefly: { art: 'ein Glühwürmchen',   bare: 'Glühwürmchen',  pl: 'Glühwürmchen' },
    marble:  { art: 'eine Murmel',        bare: 'Murmel',        pl: 'Murmeln' }
  };
  var LANG = 'en';
  function numWord(n) { return (LANG === 'de' ? WORDS_DE : WORDS)[n] || n; }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function rivetSVG(mood) {
    var happy = mood === 'happy';
    return '<svg class="nf-rivet-svg" viewBox="0 0 100 100" role="img" aria-label="Rivet">'
      + '<ellipse cx="50" cy="60" rx="30" ry="28" fill="#8a8f96"/><ellipse cx="50" cy="62" rx="20" ry="18" fill="#cfd4da"/>'
      + '<circle cx="34" cy="34" r="11" fill="#8a8f96"/><circle cx="66" cy="34" r="11" fill="#8a8f96"/>'
      + '<path d="M30 50 q-12 -4 -14 4 q10 3 14 -1z" fill="#5a5f66"/><path d="M70 50 q12 -4 14 4 q-10 3 -14 -1z" fill="#5a5f66"/>'   // mask
      + '<circle cx="41" cy="50" r="7" fill="#2A2A35"/><circle cx="59" cy="50" r="7" fill="#2A2A35"/><circle cx="43" cy="48" r="2.4" fill="#fff"/><circle cx="61" cy="48" r="2.4" fill="#fff"/>'
      + '<circle cx="50" cy="60" r="4" fill="#2A2A35"/>'
      + (happy ? '<path d="M44 68 q6 6 12 0" stroke="#2A2A35" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<path d="M45 67 q5 3 10 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>')
      + '</svg>';
  }
  /* treasure tokens — pure geometry stubs (NO image-library). */
  function treasureSVG(kind) {
    if (kind === 'button') return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="38" fill="' + C.T + '"/><circle cx="50" cy="50" r="38" fill="none" stroke="' + C.T2 + '" stroke-width="5"/><circle cx="40" cy="40" r="5" fill="#fff"/><circle cx="60" cy="40" r="5" fill="#fff"/><circle cx="40" cy="60" r="5" fill="#fff"/><circle cx="60" cy="60" r="5" fill="#fff"/></svg>';
    if (kind === 'firefly') return '<svg viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="54" rx="22" ry="30" fill="' + C.GOLD + '"/><ellipse cx="50" cy="70" rx="14" ry="14" fill="#FFF3C4"/><circle cx="50" cy="32" r="13" fill="#7a6a3a"/><path d="M40 26 l-10 -10M60 26 l10 -10" stroke="#7a6a3a" stroke-width="3" stroke-linecap="round"/></svg>';
    if (kind === 'marble') return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="38" fill="' + C.CORAL + '"/><circle cx="50" cy="50" r="38" fill="none" stroke="' + C.CORAL2 + '" stroke-width="4"/><path d="M30 42 q20 -16 40 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/></svg>';
    /* acorn (default) */
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M28 44 q22 38 44 0z" fill="' + C.BROWN + '"/><ellipse cx="50" cy="40" rx="24" ry="14" fill="#C28E54"/><rect x="46" y="20" width="8" height="10" rx="3" fill="#7a5630"/></svg>';
  }
  function shuffled(arr, seed) { var a = arr.slice(), i, j, t, s = seed || 1; for (i = a.length - 1; i > 0; i--) { s = (s * 1103515245 + 12345) & 0x7fffffff; j = s % (i + 1); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  global.RivetsNumberForgeActivity = {
    id: 'rivets-number-forge-activity',
    reward: { id: 'rivets-album', label: "Rivet's Album", emoji: '📒' },

    /* child-facing copy below — MORE/FEWER not relevant; numerals are produced, never selected */
    strings: {
      title: { en: "Rivet's Number Forge", de: 'Rivets Zahlen-Schmiede' },
      instruction: { en: 'Count the treasure and forge its number.', de: 'Zähle die Schätze und schmiede ihre Zahl.' },
      prompt: { en: 'Count it, then forge!', de: 'Zähl sie, dann schmiede!' },
      promptZero: { en: 'Empty pack — what number is that?', de: 'Leeres Päckchen — welche Zahl ist das?' },
      promptParade: { en: 'Count them as they march past!', de: 'Zähle sie, während sie vorbeiziehen!' },
      promptSubset: { en: 'Count only the {kind}s!', de: 'Zähle nur die {kind}!' },
      promptVerify: { en: 'Rivet wrote {claim}. Count again — is it right?', de: 'Rivet hat {claim} geschrieben. Zähl noch einmal — stimmt das?' },
      promptBuild: { en: 'Fill the pack to match the dots, then forge!', de: 'Fülle das Päckchen, bis es zu den Punkten passt, dann schmiede!' },
      promptReverse: { en: 'The ticket says {n} — pouch up that many!', de: 'Auf dem Zettel steht {n} — fülle so viele in den Beutel!' },
      hintIdle: { en: 'Tap each treasure to count it, then pull the lever.', de: 'Tippe jeden Schatz an, um ihn zu zählen, dann zieh am Hebel.' },
      hintParade: { en: 'Tap the one on the forge — here comes the next!', de: 'Tippe den auf dem Amboss an — der nächste kommt schon!' },
      hintBuild: { en: 'Tap +Add until the pack matches the dots.', de: 'Tippe auf ＋Hinzufügen, bis das Päckchen zu den Punkten passt.' },
      hintReverse: { en: 'Tap +Add until the pouch holds that many.', de: 'Tippe auf ＋Hinzufügen, bis der Beutel so viele hält.' },
      hintCheck: { en: 'Count every treasure, then pull the lever to forge!', de: 'Zähle jeden Schatz, dann zieh am Hebel zum Schmieden!' },
      lever: { en: 'Forge it! 🔨', de: 'Schmiede sie! 🔨' },
      add: { en: '＋ Add', de: '＋ Hinzufügen' },
      undo: { en: '－ Take one', de: '－ Eins wegnehmen' },
      forging: { en: 'Forging…', de: 'Wird geschmiedet …' },
      made: { en: 'made of {n}', de: 'aus {n} gemacht' },
      minted: { en: 'Forged a {numeral}! 🪙', de: 'Eine {numeral} geschmiedet! 🪙' },
      mintedZero: { en: 'No treasure at all — that is ZERO! Zero is a number too. 🪙', de: 'Gar kein Schatz — das ist die NULL! Null ist auch eine Zahl. 🪙' },
      wheeze: { en: "Not hot enough — let's count them again!", de: 'Nicht heiß genug — zählen wir noch einmal!' },
      pageDone: { en: 'Page complete — gilded! 📒✨', de: 'Seite geschafft — vergoldet! 📒✨' },
      countOnly: { en: 'only count the {kind}s', de: 'zähle nur die {kind}' },
      ticket: { en: 'Ticket', de: 'Zettel' },
      rivetClaim: { en: 'Rivet says', de: 'Rivet sagt' },
      nextNudge: { en: 'Tap Check! ✓', de: 'Tippe auf Prüfen! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.solvedCount = 0; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null;
      this.act = round.act_type; this.paradeIdx = 0; this.shuffleSeed = (round.id.length * 7 + 3);
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },
    _frame: function () { return Core.currentFrame(this.cstate); },
    _isProduce: function () { return Core.isProduceAct(this.round); },
    _got: function () { return this._isProduce() ? this.cstate.produced : Core.countedSize(this.cstate); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'nf-wrap'); var root = api.el('div', 'nf-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'nf-head' + (this.solved ? ' nf-head-win' : ''));
      var rv = api.el('span', 'nf-rivet'); rv.innerHTML = rivetSVG(this.solved ? 'happy' : 'idle');
      var say = api.el('span', 'nf-say'); say.textContent = this.msg || this._hint();
      head.appendChild(rv); head.appendChild(say); root.appendChild(head);

      if (this.solved) this._renderDone(root);
      else this._renderForge(root);

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _hint: function () {
      var api = this.api, f = this._frame();
      if (this.act === 'zero' && (f.count | 0) === 0) return api.t('promptZero');
      if (this.act === 'parade') return api.t('promptParade');
      if (this.act === 'subset') return api.t('promptSubset').replace('{kind}', LANG === 'de' ? (KIND_DE[f.kind] && KIND_DE[f.kind].pl) || f.kind : f.kind);
      if (this.act === 'verify') return api.t('promptVerify').replace('{claim}', f.claimNumeral);
      if (this.act === 'build-mint') return api.t('promptBuild');
      if (this.act === 'reverse') return api.t('promptReverse').replace('{n}', f.numeral);
      return api.t('hintIdle');
    },

    /* ----- the forging surface: page strip + bench + forge + lever ----- */
    _renderForge: function (root) {
      root.appendChild(this._pageStrip());
      var main = this.api.el('div', 'nf-main');
      main.appendChild(this._benchCol());
      main.appendChild(this._forgeCol());
      root.appendChild(main);
    },
    _pageStrip: function () {
      var api = this.api, s = this.cstate, n = this.round.page.frames.length, strip = api.el('div', 'nf-strip');
      for (var i = 0; i < n; i++) {
        var done = i < s.frameIdx, cur = i === s.frameIdx;
        var slot = api.el('div', 'nf-slot' + (done ? ' nf-slot-done' : '') + (cur ? ' nf-slot-cur' : ''));
        if (done) { var m = s.minted[i]; slot.textContent = (m && m.numeral != null) ? m.numeral : '✓'; }
        else if (cur) slot.textContent = '…';
        else slot.textContent = '';
        strip.appendChild(slot);
      }
      return strip;
    },

    /* LEFT: the bench (act-specific tappable treasure / produce controls) */
    _benchCol: function () {
      var col = this.api.el('div', 'nf-bench');
      if (this._isProduce()) col.appendChild(this._produceBench());
      else if (this.act === 'parade') col.appendChild(this._paradeBench());
      else if (this._frame().arrangement === 'tenframe') col.appendChild(this._tenframeBench());
      else col.appendChild(this._tapBench());
      return col;
    },
    /* the ten-frame carton (teens): a PRE-GROUPED sealed ten (one tap recognizes
       the whole ten — the ten-frame scaffold) + the loose ones counted singly.
       Keeps a teen to ~2 rows + makes the ten + ones visible (the spec's carton). */
    _tenframeBench: function () {
      var self = this, api = this.api, f = this._frame(), s = this.cstate, count = f.count | 0;
      var tens = Math.floor(count / 10), ones = count % 10;
      var box = api.el('div', 'nf-pack nf-lay-tenframe');
      for (var b = 0; b < tens; b++) {
        (function (base) {
          var on = true; for (var k = 0; k < 10; k++) if (!s.counted['t' + (base + k)]) on = false;
          var blk = api.el('button', 'nf-tenblock' + (on ? ' nf-tenblock-on' : '')); blk.type = 'button';
          blk.setAttribute('aria-label', LANG === 'de' ? 'ein voller Zehner — tippe, um alle zehn zu zählen' : 'a full ten — tap to count all ten');
          for (var d = 0; d < 10; d++) { var dot = api.el('span', 'nf-tendot' + (s.counted['t' + (base + d)] ? ' nf-tendot-on' : '')); dot.innerHTML = treasureSVG(f.kind); blk.appendChild(dot); }
          if (on) { var ck = api.el('span', 'nf-check'); ck.textContent = '✓'; blk.appendChild(ck); }
          blk.addEventListener('click', function () { self._tapBlock(base); });
          box.appendChild(blk);
        }(b * 10));
      }
      for (var i = 0; i < ones; i++) {
        (function (id) {
          var counted = !!s.counted[id];
          var ob = api.el('button', 'nf-obj' + (counted ? ' nf-counted' : '')); ob.type = 'button'; ob.innerHTML = treasureSVG(f.kind);
          ob.setAttribute('aria-label', (LANG === 'de' ? ((KIND_DE[f.kind] && KIND_DE[f.kind].art) || f.kind) + (counted ? ', gezählt' : '') : f.kind + (counted ? ', counted' : '')));
          ob.addEventListener('click', function () { self._tap(id, true); });
          if (counted) { var c2 = api.el('span', 'nf-check'); c2.textContent = '✓'; ob.appendChild(c2); }
          box.appendChild(ob);
        }('t' + (tens * 10 + i)));
      }
      return box;
    },
    _tapBlock: function (base) {
      var s = this.cstate, any = false;
      for (var k = 0; k < 10; k++) { if (!s.counted['t' + (base + k)]) { Core.tapObject(s, 't' + (base + k)); any = true; } }
      if (any) { this.api.sound && this.api.sound(720); speak(Core.countedSize(s)); this.msg = null; this.render(); }
    },
    _tapBench: function () {
      var self = this, api = this.api, f = this._frame(), s = this.cstate;
      var box = api.el('div', 'nf-pack nf-lay-' + (f.arrangement || 'scatter'));
      var objs = Core.frameObjects(f);
      if (objs.length === 0) { var e = api.el('div', 'nf-empty'); e.textContent = '✨'; box.appendChild(e); return box; }
      objs = shuffled(objs, this.shuffleSeed);
      objs.forEach(function (o) {
        var counted = !!s.counted[o.id];
        var b = api.el('button', 'nf-obj' + (counted ? ' nf-counted' : '') + (o.target ? '' : ' nf-decoy'));
        b.type = 'button'; b.innerHTML = treasureSVG(o.kind);
        b.setAttribute('aria-label', (LANG === 'de' ? ((KIND_DE[o.kind] && KIND_DE[o.kind].art) || o.kind) + (counted ? ', gezählt' : '') : o.kind + (counted ? ', counted' : '')));
        b.addEventListener('click', function () { self._tap(o.id, o.target); });
        if (counted) { var ck = api.el('span', 'nf-check'); ck.textContent = '✓'; b.appendChild(ck); }
        box.appendChild(b);
      });
      return box;
    },
    _paradeBench: function () {
      var self = this, api = this.api, f = this._frame(), n = f.count | 0, box = api.el('div', 'nf-parade');
      if (this.paradeIdx < n) {
        var lab = api.el('div', 'nf-paradelab'); lab.textContent = (this.paradeIdx + 1) + ''; lab.setAttribute('aria-hidden', 'true'); // running position
        var b = api.el('button', 'nf-obj nf-obj-big'); b.type = 'button'; b.innerHTML = treasureSVG(f.kind);
        b.setAttribute('aria-label', LANG === 'de' ? ((KIND_DE[f.kind] && KIND_DE[f.kind].bare) || f.kind) + ' zieht vorbei — tippe zum Zählen' : f.kind + ' marching past — tap to count');
        b.addEventListener('click', function () { self._tapParade(); });
        box.appendChild(b);
        var hint = api.el('div', 'nf-paradehint'); hint.textContent = '➡'; box.appendChild(hint);
      } else { var done = api.el('div', 'nf-empty'); done.textContent = '🔨'; box.appendChild(done); }
      return box;
    },
    _produceBench: function () {
      var self = this, api = this.api, f = this._frame(), s = this.cstate, box = api.el('div', 'nf-produce');
      // the target (dots for build-mint; a ticket numeral for reverse)
      var tgt = api.el('div', 'nf-target');
      if (this.act === 'reverse') { var tk = api.el('div', 'nf-ticket'); tk.innerHTML = '<span class="nf-ticket-lab">' + api.t('ticket') + '</span><span class="nf-ticket-n">' + (f.numeral | 0) + '</span>'; tgt.appendChild(tk); }
      else { var need = f.count | 0; var dots = api.el('div', 'nf-dots'); for (var i = 0; i < need; i++) { var d = api.el('span', 'nf-dot' + (i < s.produced ? ' nf-dot-on' : '')); dots.appendChild(d); } tgt.appendChild(dots); }
      box.appendChild(tgt);
      // the pack/pouch with the produced tokens
      var pack = api.el('div', 'nf-pack nf-lay-scatter');
      for (var k = 0; k < s.produced; k++) { var o = api.el('span', 'nf-obj nf-obj-static'); o.innerHTML = treasureSVG(f.kind); pack.appendChild(o); }
      if (s.produced === 0) { var ph = api.el('div', 'nf-empty'); ph.textContent = '👜'; pack.appendChild(ph); }
      box.appendChild(pack);
      // +/- controls
      var ctr = api.el('div', 'nf-adders');
      var plus = api.el('button', 'nf-add'); plus.type = 'button'; plus.textContent = api.t('add'); plus.addEventListener('click', function () { self._add(); });
      ctr.appendChild(plus);
      if (s.produced > 0) { var minus = api.el('button', 'nf-add nf-minus'); minus.type = 'button'; minus.textContent = api.t('undo'); minus.addEventListener('click', function () { self._remove(); }); ctr.appendChild(minus); }
      box.appendChild(ctr);
      return box;
    },

    /* RIGHT: the forge (the forming numeral, built FROM the count) + the lever */
    _forgeCol: function () {
      var self = this, api = this.api, col = api.el('div', 'nf-forgecol');
      var got = this._got(), minting = (this.act !== 'reverse');
      var forge = api.el('div', 'nf-forge');
      if (this.act === 'verify') { var claim = api.el('div', 'nf-claim'); claim.innerHTML = '<span class="nf-claim-lab">' + api.t('rivetClaim') + '</span><span class="nf-claim-n">' + (this._frame().claimNumeral | 0) + '</span>'; forge.appendChild(claim); }
      if (minting) {
        var num = api.el('div', 'nf-forming'); num.textContent = (got > 0 || this.act === 'zero') ? String(got) : '?'; forge.appendChild(num);
      } else { var pn = api.el('div', 'nf-forming nf-forming-pouch'); pn.textContent = got; forge.appendChild(pn); }
      col.appendChild(forge);
      var lever = api.el('button', 'nf-lever'); lever.type = 'button'; lever.textContent = api.t('lever');
      lever.addEventListener('click', function () { self._pull(); });
      col.appendChild(lever);
      return col;
    },

    /* ----- interactions ----- */
    _tap: function (id, isTarget) {
      var s = this.cstate;
      if (s.counted[id]) return;                                  // re-tap inert
      if (Core.tapObject(s, id)) { this.api.sound && this.api.sound(540 + Core.countedSize(s) * 22); speak(Core.countedSize(s)); this.msg = null; this.render(); }
      else { this.api.sound && this.api.sound(300); var dk = this._frame().kind; this.msg = this.api.t('promptSubset').replace('{kind}', LANG === 'de' ? ((KIND_DE[dk] && KIND_DE[dk].pl) || dk) : dk); this.render(); } // a decoy tap
    },
    _tapParade: function () {
      var s = this.cstate, id = 't' + this.paradeIdx;
      if (Core.tapObject(s, id)) { this.paradeIdx++; this.api.sound && this.api.sound(540 + this.paradeIdx * 22); speak(this.paradeIdx); this.msg = null; this.render(); }
    },
    _add: function () { if (Core.addObject(this.cstate)) { this.api.sound && this.api.sound(560 + this.cstate.produced * 20); speak(this.cstate.produced); this.msg = null; this.render(); } },
    _remove: function () { if (Core.removeObject(this.cstate)) { this.api.sound && this.api.sound(360); this.msg = null; this.render(); } },

    _pull: function () {
      var api = this.api, r = Core.pullLever(this.cstate);
      if (r === 'minted') {
        var m = this.cstate.minted[this.cstate.minted.length - 1];
        this.api.sound && this.api.sound(900);
        if (m.numeral === '0') { this.msg = api.t('mintedZero'); speak(LANG === 'de' ? 'null' : 'zero'); }
        else if (m.numeral != null) { this.msg = api.t('minted').replace('{numeral}', m.numeral); speak(numWord(m.count)); }
        else { this.msg = api.t('pageDone'); speak(numWord(m.count)); }
        this.paradeIdx = 0;
        if (Core.isComplete(this.round, this.cstate)) this._win(); else this.render();
      } else {
        this.api.sound && this.api.sound(320); this.msg = api.t('wheeze');
        this.cstate.counted = {}; this.cstate.produced = 0; this.paradeIdx = 0; this.shuffleSeed = (this.shuffleSeed * 31 + 7) & 0x7fffffff; // keep treasure, re-arrange, re-count
        this.render();
      }
    },
    _win: function () { this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9); this.api.sound && this.api.sound(960); this.msg = api_t(this, 'pageDone'); this.render(); this.announce(this.msg); speak(LANG === 'de' ? 'Seite geschafft' : 'page complete'); },

    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9, album = api.el('div', 'nf-album');
      for (var i = 0; i < n; i++) { var sp = api.el('span', 'nf-spine' + (i < this.solvedCount ? ' nf-spine-on' : '')); sp.textContent = '📒'; album.appendChild(sp); }
      root.appendChild(album);
      var nudge = api.el('div', 'nf-nextnudge'); nudge.textContent = api.t('nextNudge'); root.appendChild(nudge);
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
      fetch('/mini-tools/rivets-number-forge-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[rivets-number-forge] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.nf-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.nf-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(4px,1.3vw,8px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(7px,1.6vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.nf-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.nf-rivet{width:clamp(26px,6vw,36px);flex:0 0 auto;}.nf-rivet-svg{width:100%;height:auto;display:block;}'
        + '.nf-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.nf-head-win .nf-say{color:' + C.CORAL2 + ';}'
        /* page strip */
        + '.nf-strip{display:flex;gap:5px;justify-content:center;flex-wrap:wrap;}'
        + '.nf-slot{min-width:28px;height:34px;padding:0 6px;border-radius:8px;border:2px dashed rgba(20,107,94,.3);background:#fff;display:flex;align-items:center;justify-content:center;font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.nf-slot-done{border-style:solid;border-color:' + C.GOLD + ';background:#FFF8E8;box-shadow:0 2px 0 ' + C.GOLD2 + ';}'
        + '.nf-slot-cur{border-color:' + C.CORAL + ';color:#b9b0a0;}'
        /* main: bench + forge */
        + '.nf-main{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.8vw,12px);width:100%;}'
        + '@media (min-width:680px){.nf-main{flex-direction:row;align-items:flex-start;justify-content:center;gap:18px;}.nf-bench,.nf-forgecol{flex:0 1 auto;}}'
        + '.nf-bench{display:flex;flex-direction:column;align-items:center;width:100%;}'
        + '.nf-pack{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:clamp(3px,1.3vw,7px);min-height:46px;background:#fff;border:2px solid rgba(20,107,94,.13);border-radius:14px;padding:4px clamp(6px,2vw,12px);width:100%;max-width:340px;}'
        + '.nf-lay-row{flex-wrap:nowrap;}.nf-lay-tenframe{max-width:286px;}'
        + '.nf-obj{position:relative;min-width:44px;min-height:44px;width:44px;height:44px;padding:0;border:0;background:transparent;cursor:pointer;border-radius:50%;touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;}'
        + '.nf-obj svg{width:clamp(26px,6.6vw,33px);height:clamp(26px,6.6vw,33px);display:block;}'
        + '.nf-obj-static{cursor:default;}.nf-obj-big{min-width:64px;min-height:64px;width:64px;height:64px;}.nf-obj-big svg{width:48px;height:48px;}'
        + '.nf-counted svg{opacity:.5;}.nf-check{position:absolute;top:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:' + C.T + ';color:#fff;font:800 12px/18px "Baloo 2",sans-serif;text-align:center;}'
        + '.nf-decoy svg{opacity:.92;}'
        /* the ten-frame carton: a pre-grouped sealed ten (one tap = the whole ten) + loose ones */
        + '.nf-tenblock{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:2px;padding:5px 6px;min-height:46px;border:2px solid ' + C.GOLD + ';border-radius:12px;background:#FFF8E8;cursor:pointer;touch-action:manipulation;align-items:center;}.nf-tenblock-on{background:#FBEFD0;border-color:' + C.GOLD2 + ';}'
        + '.nf-tendot{width:13px;height:13px;display:inline-flex;align-items:center;justify-content:center;}.nf-tendot svg{width:13px;height:13px;}.nf-tendot-on svg{opacity:.5;}'
        + '.nf-tenblock:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.nf-obj:focus-visible,.nf-lever:focus-visible,.nf-add:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.nf-empty{font-size:30px;opacity:.6;padding:6px 14px;}'
        /* parade */
        + '.nf-parade{display:flex;flex-direction:column;align-items:center;gap:4px;background:#fff;border:2px solid rgba(20,107,94,.13);border-radius:14px;padding:8px 16px;min-height:90px;justify-content:center;}'
        + '.nf-paradelab{font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}.nf-paradehint{font-size:20px;color:' + C.T + ';opacity:.5;}'
        /* produce (build-mint / reverse) */
        + '.nf-produce{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;}'
        + '.nf-target{display:flex;justify-content:center;}'
        + '.nf-dots{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:240px;background:#FFF8E8;border:2px dashed ' + C.GOLD + ';border-radius:12px;padding:7px 10px;}'
        + '.nf-dot{width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid ' + C.GOLD + ';}.nf-dot-on{background:' + C.GOLD + ';}'
        + '.nf-ticket{display:flex;flex-direction:column;align-items:center;background:#FFF8E8;border:2px solid ' + C.GOLD + ';border-radius:12px;padding:2px 14px;}.nf-ticket-lab{font:700 10px/1.1 "Nunito",sans-serif;color:' + C.GOLD2 + ';text-transform:uppercase;letter-spacing:.05em;}.nf-ticket-n{font:800 clamp(22px,6vw,28px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.nf-adders{display:flex;gap:8px;justify-content:center;}'
        + '.nf-add{min-height:48px;padding:0 clamp(12px,3.5vw,18px);border-radius:13px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.T2 + ';touch-action:manipulation;}.nf-add:active{transform:translateY(2px);}.nf-minus{background:#fff;color:' + C.T + ';box-shadow:0 3px 0 rgba(20,107,94,.2);}'
        /* forge */
        + '.nf-forgecol{display:flex;flex-direction:column;align-items:center;gap:7px;}'
        + '.nf-forge{display:flex;flex-direction:column;align-items:center;gap:2px;background:#fff;border:3px solid ' + C.T + ';border-radius:16px;padding:clamp(6px,1.6vw,10px) clamp(14px,4vw,24px);min-width:96px;box-shadow:inset 0 2px 6px rgba(20,107,94,.1);}'
        + '.nf-claim{display:flex;flex-direction:column;align-items:center;margin-bottom:1px;}.nf-claim-lab{font:700 9px/1.1 "Nunito",sans-serif;color:' + C.CORAL2 + ';text-transform:uppercase;letter-spacing:.05em;}.nf-claim-n{font:800 18px/1 "Baloo 2",sans-serif;color:#c0392b;text-decoration:line-through;text-decoration-color:rgba(192,57,43,.6);}'
        + '.nf-forming{font:800 clamp(40px,10vw,56px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}.nf-forming-pouch{color:' + C.CORAL2 + ';}'
        + '.nf-made{font:700 clamp(10px,2.5vw,12px)/1 "Nunito",sans-serif;color:#9a8f78;}'
        + '.nf-lever{min-height:50px;padding:0 clamp(18px,5vw,28px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.nf-lever:active{transform:translateY(3px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}'
        /* album done */
        + '.nf-album{display:flex;gap:2px;flex-wrap:wrap;justify-content:center;}.nf-spine{font-size:clamp(15px,3.6vw,19px);filter:grayscale(1) opacity(.4);}.nf-spine-on{filter:none;}'
        + '.nf-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* phone / single-column compaction — the bench + forge stack, so shrink the hero numeral, drop the secondary subtext, tighten the produce stack */
        /* phone: stack bench above a HORIZONTAL forge (numeral beside the lever) so the forge is ~one row tall, not a column */
        + '@media (max-width:680px){.nf-main{gap:6px;}.nf-forgecol{flex-direction:row;justify-content:center;align-items:center;gap:10px;width:100%;}.nf-forming{font-size:clamp(32px,8.5vw,44px);}.nf-made{display:none;}.nf-forge{padding:4px 14px;}.nf-obj-static svg{width:26px;height:26px;}.nf-obj-big{min-width:56px;min-height:56px;width:56px;height:56px;}.nf-obj-big svg{width:40px;height:40px;}.nf-parade{min-height:78px;padding:6px 14px;}.nf-produce{gap:4px;}.nf-dots{padding:5px 9px;}}'
        + '@media (max-height:720px){.nf-rivet{width:26px;}.nf-forming{font-size:clamp(30px,8vw,42px);}}'
        + '@media (max-height:640px){.nf-root{gap:2px;padding:5px;}.nf-head{gap:5px;}.nf-obj{min-width:42px;min-height:40px;width:40px;height:40px;}.nf-obj svg{width:24px;height:24px;}.nf-pack{min-height:40px;padding:3px 7px;gap:3px;}.nf-forming{font-size:clamp(28px,7.5vw,38px);}.nf-forge{padding:3px 12px;border-width:2px;}.nf-lever{min-height:46px;}.nf-add{min-height:46px;}.nf-slot{height:32px;}.nf-parade{min-height:64px;padding:4px 12px;}.nf-claim-n{font-size:16px;}.nf-ticket{padding:1px 12px;}.nf-ticket-n{font-size:22px;}.nf-produce{gap:3px;}.nf-dots{padding:4px 8px;}.nf-empty{font-size:24px;padding:3px 12px;}}'
        + '@media (max-width:340px){.nf-root{padding:4px;}.nf-pack{padding:4px 5px;gap:3px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-rivets-number-forge', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function api_t(self, key) { return self.api.t(key); }

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'rivets-number-forge.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
