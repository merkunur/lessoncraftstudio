/* =====================================================================
   THE SHARING JAR — ACTIVITY  (sharing-jar-activity.js)   ·   social-fair HEAD
   ---------------------------------------------------------------------
   CCSS 1.OA.D.8 — determine the UNKNOWN in a single-unknown add/sub relation.
   A jar of moon-beads spills; Pim & Bo scoop different amounts and one jar ends
   up fuller. The child makes it fair: DETERMINES how many the quiet friend needs
   and PRODUCES that numeral by tapping a number-tile (0-10). Only on a correct
   numeral do the beads float from the neutral floor-pile into the quiet jar —
   the give is the CELEBRATION, not the input (no fill-against-a-target surface).

   5 distinct CGI schemas: equalize-add / compare-diff / restore / reduce-to-
   target / start-unknown. The social-fair family head — every game starts from a
   felt social wrong, resolved by PRODUCING the equalizing number.

   Determine-the-unknown cognition + the anti-cheat SOLVERS live in mini tools/
   make-fair-core.js (pure). answerType:'state'. Pim/Bo + beads = SVG STUBS for
   CA5 (NO image-library → no 404). No timer/score/streak; a wrong numeral is a
   warm NON-DIRECTIONAL re-pose (never sad-at-the-child). 0 lines to the protected
   cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MakeFairCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35', GLOW: '#7FD1C0' };
  var WORDS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve' };
  /* German cardinals 0-12, STANDALONE form (the reveal speaks the bare number → 1 = „eins", not „ein"). */
  var WORDS_DE = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn', 11: 'elf', 12: 'zwölf' };
  /* French cardinals 0-12, STANDALONE form (the reveal speaks the bare number). */
  var WORDS_FR = { 0: 'zéro', 1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf', 10: 'dix', 11: 'onze', 12: 'douze' };
  var LANG = 'en';
  function numWord(n) { var w = (LANG === 'de' ? WORDS_DE : LANG === 'fr' ? WORDS_FR : WORDS)[n]; return (w != null) ? w : String(n); }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function friendSVG(which, mood) {
    var col = which === 'pim' ? '#F2A65A' : '#8FB8DE', col2 = which === 'pim' ? '#D9842F' : '#5C8CB8';
    var quiet = mood === 'quiet', happy = mood === 'happy';
    var earY = quiet ? 18 : 8;
    return '<svg viewBox="0 0 100 100" role="img" aria-label="' + (which === 'pim' ? 'Pim' : 'Bo') + '">'
      + '<ellipse cx="50" cy="62" rx="28" ry="30" fill="' + col + '"/><ellipse cx="50" cy="62" rx="28" ry="30" fill="none" stroke="' + col2 + '" stroke-width="3"/>'
      + '<ellipse cx="34" cy="' + (28 + earY) + '" rx="7" ry="14" fill="' + col + '" transform="rotate(' + (quiet ? 18 : -10) + ' 34 ' + (28 + earY) + ')"/>'
      + '<ellipse cx="66" cy="' + (28 + earY) + '" rx="7" ry="14" fill="' + col + '" transform="rotate(' + (quiet ? -18 : 10) + ' 66 ' + (28 + earY) + ')"/>'
      + '<circle cx="42" cy="56" r="4.5" fill="#2A2A35"/><circle cx="58" cy="56" r="4.5" fill="#2A2A35"/>'
      + (happy ? '<path d="M42 70 q8 8 16 0" stroke="#2A2A35" stroke-width="3" fill="none" stroke-linecap="round"/>' : quiet ? '<path d="M44 72 q6 -2 12 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>' : '<path d="M44 70 q6 4 12 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>')
      + '</svg>';
  }
  function beadSVG() { return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="38" fill="' + C.GLOW + '"/><circle cx="50" cy="50" r="38" fill="none" stroke="#4FB5A0" stroke-width="4"/><circle cx="38" cy="38" r="10" fill="#fff" opacity=".5"/></svg>'; }

  global.SharingJarActivity = {
    id: 'sharing-jar-activity',
    reward: { id: 'friendship-string', label: 'Friendship String', emoji: '💛' },

    strings: {
      title: { en: 'The Sharing Jar', de: 'Das faire Perlenglas', fr: 'Le pot de perles juste' },
      instruction: { en: 'Make it fair — say the kind number.', de: 'Mach es fair – sag die richtige Zahl.', fr: 'Rends le partage juste : dis le bon nombre.' },
      prompt: { en: 'Make it fair!', de: 'Mach es fair!', fr: 'Rends le partage juste !' },
      qEqualize: { en: 'How many MORE beads does Pim need to match Bo?', de: 'Wie viele Perlen braucht Pim NOCH, um genauso viele wie Bo zu haben?', fr: 'Combien de perles Pim doit-il ajouter pour en avoir autant que Bo ?' },
      qCompare: { en: "How many MORE beads does Bo's jar have?", de: 'Wie viele Perlen hat Bos Glas MEHR?', fr: 'Combien de perles le pot de Bo a-t-il de plus ?' },
      qRestore: { en: 'Some got knocked into the spill! How many to give Pim back?', de: 'Ein paar sind verschüttet! Wie viele bekommt Pim zurück?', fr: 'Quelques perles sont tombées ! Combien Pim en récupère-t-il ?' },
      qReduce: { en: 'Pim scooped too many! How many to put back so each has {T}?', de: 'Pim hat zu viele Perlen genommen! Wie viele müssen zurück, damit jeder {T} hat?', fr: 'Pim a pris trop de perles ! Combien doit-il en remettre pour que chacun en ait {T} ?' },
      qStart: { en: 'Bo gave {k} away and now has {r}. How many did Bo START with?', de: 'Bo hat {k} verschenkt und hat jetzt {r}. Wie viele hatte Bo am ANFANG?', fr: 'Bo a donné {k} perles et il en a {r} maintenant. Combien Bo en avait-il au DÉPART ?' },
      qZero: { en: 'How many more does Pim need to match Bo?', de: 'Wie viele braucht Pim noch, um genauso viele wie Bo zu haben?', fr: 'Combien de perles Pim doit-il ajouter pour en avoir autant que Bo ?' },
      hint: { en: 'Work it out, then tap that number.', de: 'Rechne es aus und tippe dann auf die Zahl.', fr: 'Réfléchis, puis touche le bon nombre.' },
      hintZero: { en: 'Look closely — maybe it is already fair!', de: 'Schau genau hin – vielleicht ist es schon fair!', fr: 'Regarde bien… c’est peut-être déjà juste !' },
      had: { en: 'had {n}', de: 'hatte {n}', fr: 'en avait {n}' },
      fairIs: { en: 'fair = {n}', de: 'fair = {n}', fr: 'juste = {n}' },
      gaveAway: { en: 'gave {k} away', de: '{k} verschenkt', fr: 'a donné {k}' },
      lookAgain: { en: 'Look again — how many more does Pim need?', de: 'Schau noch mal – wie viele braucht Pim noch?', fr: 'Regarde encore : combien Pim doit-il en ajouter ?' },
      revealEqualize: { en: 'Yes! Now both have {n} — fair! 💛', de: 'Ja! Jetzt haben beide {n} – fair! 💛', fr: 'Oui ! Maintenant chacun en a {n} — c’est juste ! 💛' },
      revealCompare: { en: "Right! Bo's jar has {u} more. That's the gap.", de: 'Richtig! Bos Glas hat {u} mehr. Das ist der Unterschied.', fr: 'Bravo ! Le pot de Bo en a {u} de plus. C’est l’écart.' },
      revealRestore: { en: 'Restored to {n} — Pim is happy again! 💛', de: 'Wieder bei {n} – Pim freut sich! 💛', fr: 'De retour à {n} — Pim est content ! 💛' },
      revealReduce: { en: 'Now each can have {n} — fair! 💛', de: 'Jetzt hat jeder {n} – fair! 💛', fr: 'Maintenant chacun en a {n} — c’est juste ! 💛' },
      revealStart: { en: 'Yes! Bo started with {u} beads.', de: 'Ja! Bo hatte am Anfang {u} Perlen.', fr: 'Oui ! Bo en avait {u} au départ.' },
      revealZero: { en: "They're already the SAME — that's fair! Give none. 💛", de: 'Sie haben schon GLEICH viele – das ist fair! Gib keine. 💛', fr: 'Ils en ont déjà AUTANT — c’est juste ! N’en ajoute aucune. 💛' },
      tapCheck: { en: 'Tap Check! ✓', de: 'Tippe auf Prüfen! ✓', fr: 'Touche Vérifier ! ✓' },
      pim: { en: 'Pim', de: 'Pim', fr: 'Pim' }, bo: { en: 'Bo', de: 'Bo', fr: 'Bo' }, fairBridge: { en: 'fair', de: 'fair', fr: 'juste' }
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
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this.schema = round.schema;
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },
    _u: function () { return Core.unknownFor(this.schema, this.round.nums); },
    _ceiling: function () { return (this.round.tier || 'floor') === 'ceiling'; },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'sj-wrap'); var root = api.el('div', 'sj-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'sj-head' + (this.solved ? ' sj-head-win' : ''));
      var saywrap = api.el('div', 'sj-say'); saywrap.textContent = this.msg || this._question();
      head.appendChild(saywrap); root.appendChild(head);

      if (this.solved) this._renderReconcile(root); else this._renderDecide(root);

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _question: function () {
      var api = this.api, n = this.round.nums;
      switch (this.schema) {
        case 'compare-diff': return api.t('qCompare');
        case 'restore': return api.t('qRestore');
        case 'reduce-to-target': return api.t('qReduce').replace('{T}', n.T);
        case 'start-unknown': return api.t('qStart').replace('{k}', n.k).replace('{r}', n.r);
        default: return (this._u() === 0) ? api.t('qZero') : api.t('qEqualize');
      }
    },

    /* ----- the read/decide stage: the scene + the number-tile row ----- */
    _renderDecide: function (root) {
      root.appendChild(this._scene(false));
      root.appendChild(this._tileRow());
    },
    _scene: function (reconcile) {
      var api = this.api, n = this.round.nums, box = api.el('div', 'sj-scene');
      var u = this._u();
      if (this.schema === 'equalize-add' || this.schema === 'compare-diff') {
        var pimCount = reconcile && this.schema === 'equalize-add' ? n.a : n.b;
        box.appendChild(this._jar('bo', 'bo', n.a, { full: true, hideCount: this._ceiling() && !reconcile, highlight: (reconcile && this.schema === 'compare-diff') ? u : 0 }));
        box.appendChild(this._bridge(reconcile, u));
        box.appendChild(this._jar('pim', 'pim', pimCount, { quiet: !reconcile && (n.b | 0) < (n.a | 0), newBeads: reconcile && this.schema === 'equalize-add' ? u : 0 }));
      } else if (this.schema === 'restore') {
        box.appendChild(this._jar('pim', 'pim', reconcile ? n.s : n.r, { quiet: !reconcile, newBeads: reconcile ? u : 0, badge: api.t('had').replace('{n}', n.s), ghost: reconcile ? 0 : u }));
        if (reconcile) box.appendChild(this._bridge(true, u));
      } else if (this.schema === 'reduce-to-target') {
        box.appendChild(this._jar('pim', 'pim', reconcile ? n.T : n.a, { full: !reconcile, hideCount: this._ceiling() && !reconcile, badge: api.t('fairIs').replace('{n}', n.T), removed: reconcile ? u : 0 }));
        if (reconcile) box.appendChild(this._bridge(true, u));
      } else if (this.schema === 'start-unknown') {
        box.appendChild(this._jar('bo', 'bo', reconcile ? u : n.r, { quiet: !reconcile, full: reconcile, badge: api.t('gaveAway').replace('{k}', n.k), newBeads: reconcile ? n.k : 0 }));
      }
      return box;
    },
    _jar: function (which, nameKey, count, opts) {
      opts = opts || {};
      var api = this.api, jar = api.el('div', 'sj-jar' + (opts.dim || opts.quiet ? ' sj-dim' : '') + (opts.full ? ' sj-full' : ''));
      var friend = api.el('div', 'sj-friend'); friend.innerHTML = friendSVG(which, this.solved ? 'happy' : (opts.quiet ? 'quiet' : 'idle')); jar.appendChild(friend);
      var nm = api.el('div', 'sj-jarname'); nm.textContent = api.t(nameKey); jar.appendChild(nm);
      var body = api.el('div', 'sj-jarbody');
      var beads = api.el('div', 'sj-beads'); var total = count | 0, base = total - (opts.newBeads || 0);
      for (var i = 0; i < total; i++) { var b = api.el('span', 'sj-bead' + (opts.newBeads && i >= base ? ' sj-new' : '') + (opts.highlight && i >= total - opts.highlight ? ' sj-hi' : '')); b.innerHTML = beadSVG(); beads.appendChild(b); }
      for (var g = 0; g < (opts.ghost || 0); g++) { var gb = api.el('span', 'sj-bead sj-ghost'); gb.innerHTML = beadSVG(); beads.appendChild(gb); }
      body.appendChild(beads); jar.appendChild(body);
      var cnt = api.el('div', 'sj-count'); cnt.textContent = opts.hideCount ? '?' : total; if (opts.hideCount) cnt.classList.add('sj-qcount'); jar.appendChild(cnt);
      if (opts.badge) { var bd = api.el('div', 'sj-badge'); bd.textContent = opts.badge; jar.appendChild(bd); }
      return jar;
    },
    _bridge: function (on, u) {
      var api = this.api, br = api.el('div', 'sj-bridge' + (on ? ' sj-bridge-on' : ''));
      if (on && this.schema === 'compare-diff') br.textContent = '+' + u; else br.textContent = on ? '=' : '?';
      return br;
    },
    _tileRow: function () {
      var self = this, api = this.api, wrap = api.el('div', 'sj-tiles'); var lab = api.el('div', 'sj-tilelab'); lab.textContent = api.t('hint'); wrap.appendChild(lab);
      var row = api.el('div', 'sj-tilerow');
      for (var i = 0; i <= 10; i++) { (function (v) { var t = api.el('button', 'sj-tile'); t.type = 'button'; t.textContent = v; t.addEventListener('click', function () { self._produce(v); }); row.appendChild(t); })(i); }
      wrap.appendChild(row); return wrap;
    },

    _produce: function (n) {
      Core.produceNumeral(this.cstate, n);
      var r = Core.commit(this.cstate);
      if (r === 'sealed') { this._reconcile(); }
      else { this.api.sound && this.api.sound(330); this.msg = this.api.t('lookAgain'); speak(LANG === 'de' ? 'schau noch mal' : LANG === 'fr' ? 'regarde encore' : 'look again'); this.render(); }
    },
    _reconcile: function () {
      var api = this.api, u = this._u();
      this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      var n = this.round.nums;
      if (u === 0) this.msg = api.t('revealZero');
      else switch (this.schema) {
        case 'compare-diff': this.msg = api.t('revealCompare').replace('{u}', u); break;
        case 'restore': this.msg = api.t('revealRestore').replace('{n}', n.s); break;
        case 'reduce-to-target': this.msg = api.t('revealReduce').replace('{n}', n.T); break;
        case 'start-unknown': this.msg = api.t('revealStart').replace('{u}', u); break;
        default: this.msg = api.t('revealEqualize').replace('{n}', n.a);
      }
      this.api.sound && this.api.sound(940); this.render(); this.announce(this.msg);
      speak(numWord(u));
    },
    _renderReconcile: function (root) {
      root.appendChild(this._scene(true));
      var bank = this.api.el('div', 'sj-bank'); var nb = (this._pool && this._pool.length) || 9;
      for (var i = 0; i < nb; i++) { var sp = this.api.el('span', 'sj-string' + (i < this.solvedCount ? ' sj-string-on' : '')); sp.textContent = '💛'; bank.appendChild(sp); }
      root.appendChild(bank);
      var nudge = this.api.el('div', 'sj-nextnudge'); nudge.textContent = this.api.t('tapCheck'); root.appendChild(nudge);
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
      fetch('/mini-tools/sharing-jar-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[sharing-jar] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.sj-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.sj-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(7px,1.6vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.sj-head{display:flex;align-items:center;justify-content:center;width:100%;}'
        + '.sj-say{font:700 clamp(12px,3vw,14.5px)/1.25 "Nunito",sans-serif;color:' + C.T + ';text-align:center;max-width:94%;}.sj-head-win .sj-say{color:' + C.CORAL2 + ';}'
        /* scene */
        + '.sj-scene{display:flex;align-items:flex-end;justify-content:center;gap:clamp(6px,2vw,16px);width:100%;flex-wrap:wrap;}'
        + '.sj-jar{display:flex;flex-direction:column;align-items:center;gap:2px;}'
        + '.sj-friend{width:clamp(34px,8vw,46px);}.sj-friend svg{width:100%;height:auto;display:block;}'
        + '.sj-jarname{font:800 clamp(11px,2.8vw,13px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.sj-jarbody{background:rgba(127,209,192,.14);border:2px solid rgba(20,107,94,.18);border-radius:10px 10px 14px 14px;padding:4px;min-width:clamp(68px,20vw,96px);min-height:46px;display:flex;align-items:center;justify-content:center;}'
        + '.sj-dim .sj-jarbody{background:rgba(150,150,150,.1);border-color:rgba(120,120,120,.25);}.sj-full .sj-jarbody{box-shadow:0 0 10px rgba(127,209,192,.5);}'
        + '.sj-beads{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-items:center;max-width:clamp(64px,18vw,92px);}'
        + '.sj-bead{width:clamp(13px,3.4vw,17px);height:clamp(13px,3.4vw,17px);display:inline-flex;}.sj-bead svg{width:100%;height:100%;}'
        + '.sj-new svg{animation:sjFloat .5s ease both;}.sj-ghost{opacity:.28;}.sj-hi svg circle:first-child{fill:' + C.GOLD + ';}'
        + '@keyframes sjFloat{0%{opacity:0;transform:translateY(-22px) scale(.6);}60%{opacity:1;}100%{opacity:1;transform:translateY(0) scale(1);}}'
        + '@media (prefers-reduced-motion:reduce){.sj-new svg{animation:none;}}'
        + '.sj-count{font:800 clamp(20px,5.5vw,28px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}.sj-qcount{color:' + C.CORAL2 + ';}'
        + '.sj-badge{font:700 clamp(10px,2.5vw,12px)/1.1 "Nunito",sans-serif;color:#9a8f78;background:#FFF7E8;border-radius:8px;padding:2px 7px;}'
        + '.sj-bridge{align-self:center;font:800 clamp(20px,5.5vw,28px)/1 "Baloo 2",sans-serif;color:#b9b0a0;min-width:24px;text-align:center;margin-bottom:18px;}.sj-bridge-on{color:' + C.T + ';}'
        /* tile row */
        + '.sj-tiles{display:flex;flex-direction:column;align-items:center;gap:4px;width:100%;}'
        + '.sj-tilelab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';opacity:.85;}'
        + '.sj-tilerow{display:flex;flex-wrap:wrap;gap:clamp(4px,1.4vw,7px);justify-content:center;max-width:460px;}'
        + '.sj-tile{min-width:48px;min-height:48px;border-radius:12px;border:2px solid rgba(242,120,75,.3);background:#fff;color:' + C.CORAL2 + ';font:800 clamp(16px,4.4vw,20px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;box-shadow:0 2px 0 rgba(242,120,75,.18);}.sj-tile:active{transform:translateY(1px);}.sj-tile:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* done */
        + '.sj-bank{display:flex;gap:1px;flex-wrap:wrap;justify-content:center;}.sj-string{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.sj-string-on{filter:none;}'
        + '.sj-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* short-height compaction */
        + '@media (max-height:700px){.sj-friend{width:clamp(30px,7vw,40px);}.sj-count{font-size:clamp(18px,5vw,24px);}}'
        + '@media (max-height:640px){.sj-root{gap:1px;padding:4px;}.sj-friend{width:26px;}.sj-jarbody{min-height:30px;padding:2px;}.sj-bead{width:10px;height:10px;}.sj-count{font-size:15px;}.sj-jarname{font-size:10px;}.sj-scene{gap:6px;}.sj-say{font-size:11.5px;}.sj-tile{min-height:40px;min-width:40px;font-size:16px;}.sj-tilerow{gap:4px;}.sj-tilelab{display:none;}.sj-tiles{gap:2px;}.sj-bridge{margin-bottom:8px;font-size:18px;}.sj-badge{font-size:9px;padding:1px 5px;}}'
        + '@media (max-width:340px){.sj-root{padding:4px;}.sj-tilerow{gap:4px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-sharing-jar', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'sharing-jar.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
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
