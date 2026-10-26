/* =====================================================================
   pinch-teams-activity.js — ACTIVITY #112 of the one-by-one rebuild:
   "Build Vowel-Team Words" → THE TALKING CLASP (RF.1.3; en de nl fr).
   Design: docs/activities-rebuild/designs/112-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: vowels you pinch together that only lock when they are a
   real team — and the locked team lights the letter whose name you hear
   while its partner goes quiet. The word's consonants are seated on a
   rail; each team has a wide socket. Tap (or drag) a vowel in: it sits.
   Put a second vowel in: a real team, in that order, slides beside it and
   a brass clasp snaps over both (oa locks, ao bumps back to the tray). In
   English the first vowel of oa / ai / ee / ea lights gold — it says its
   name — and its partner dims; in German, Dutch and French the whole team
   lights as one sound. Finished words pin under their team on the team
   board. Clue "Same sound?" (en): ee or ea — the sound is the same, the
   word decides; the right sound with the other spelling turns the word's
   own spelling card over, gently, instead of a plain miss.
   ACTIVITY LAYER ONLY: the model is pinch-teams-core.js; pictures are the
   library's; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity when right).
   Test seams: window.PinchTeamsActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var PinchTeamsActivity = {
  id: 'pinch-teams',
  apparatusClasses: ['pt-'],

  /*STRINGS-BEGIN*/strings: {
    title:          {en:'Build Vowel-Team Words',de:'Die Laut-Klammer',nl:'De klankklem',fr:'Le fermoir des sons'},
    instrBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',fr:'{msg}'},
    okBubble:       {en:'{msg}',de:'{msg}',nl:'{msg}',fr:'{msg}'},
    check:          {en:'Check',de:'Prüfen',nl:'Controleer',fr:'Vérifier'},
    tBuild:         {en:'Pinch two vowels into a team, then build the word for the picture.',de:'Klemm zwei Vokale zu einem Paar zusammen und bau das Wort für das Bild.',nl:'Klik twee klinkers samen tot één klank en bouw het woord bij het plaatje.',fr:'Accroche deux voyelles pour faire un son, puis construis le mot de l’image.'},
    tSame:          {en:'Both say long E. Which team spells this word?',de:'Both say E. Which team spells this word?',nl:'Both say E. Which team spells this word?',fr:'Both say E. Which team spells this word?'},
    nudge:          {en:'Put two vowels in the wide socket. Do they lock?',de:'Leg zwei Vokale in das breite Fach. Rasten sie ein?',nl:'Leg twee klinkers in het brede vakje. Klikken ze vast?',fr:'Mets deux voyelles dans la grande case. Est-ce qu’elles s’accrochent ?'},
    hintEmpty:      {en:'Pinch two vowels into a team in the wide socket.',de:'Klemm zwei Vokale im breiten Fach zu einem Paar zusammen.',nl:'Klik twee klinkers samen in het brede vakje.',fr:'Accroche deux voyelles dans la grande case.'},
    hintSameEmpty:  {en:'Say the word. Then put ee or ea in the socket.',de:'Say the word. Then put ee or ea in the socket.',nl:'Say the word. Then put ee or ea in the socket.',fr:'Say the word. Then put ee or ea in the socket.'},
    hintWrong:      {en:'Say the picture\'s name slowly. Which vowel sound do you hear?',de:'Sprich das Wort langsam. Welchen Vokallaut hörst du?',nl:'Zeg het woord langzaam. Welke klank hoor je?',fr:'Dis le mot lentement. Quel son entends-tu ?'},
    hintSingle:     {en:'One vowel alone is too small for this socket. Which two vowels make the sound?',de:'Ein Vokal allein ist zu klein für dieses Fach. Welche zwei Vokale machen den Laut?',nl:'Eén klinker is te klein voor dit vakje. Welke twee klinkers maken de klank?',fr:'Une voyelle seule, c’est trop petit pour cette case. Quelles deux voyelles font le son ?'},
    hintWrong2:     {en:'You hear {N} in this word. Which team says {N}?',de:'The picture says {N}. Which team says {N}?',nl:'The picture says {N}. Which team says {N}?',fr:'The picture says {N}. Which team says {N}?'},
    hintWrong2Team: {en:'Only the letters you need are still bright. Which one goes first?',de:'Nur die Buchstaben, die du brauchst, leuchten noch. Welcher kommt zuerst?',nl:'Alleen de letters die je nodig hebt zijn nog fel. Welke komt eerst?',fr:'Seules les lettres dont tu as besoin restent allumées. Laquelle vient en premier ?'},
    hintSpelling:   {en:'That\'s the right sound! This word spells it with {team}.',de:'That\'s the right sound! This word spells it with {team}.',nl:'That\'s the right sound! This word spells it with {team}.',fr:'That’s the right sound! This word spells it with {team}.'},
    okTalk:         {en:'{sounds}: {word}! In {team}, the {t} says its name and the {q} stays quiet.',de:'{word}: {team} ist ein Laut!',nl:'{word}: {team} is één klank!',fr:'{word} : {team} fait un seul son !'},
    okTalkSame:     {en:'{sounds}: {word}! In {team}, the first e says its name and the second stays quiet.',de:'{word}: {team} ist ein Laut!',nl:'{word}: {team} is één klank!',fr:'{word} : {team} fait un seul son !'},
    okSame:         {en:'{word} spells its E with {team}!',de:'{word} spells its E with {team}!',nl:'{word} spells its E with {team}!',fr:'{word} spells its E with {team}!'},
    okOne:          {en:'{word}: {team} is one sound!',de:'{word}: {team} ist ein Laut!',nl:'{word}: {team} is één klank!',fr:'{word} : {team} fait un seul son !'},
    aBoard:         {en:'Team board: the words you built',de:'Paar-Tafel: deine fertigen Wörter',nl:'Bord met de woorden die je hebt gebouwd',fr:'Tableau des sons : les mots que tu as construits'},
    aPic:           {en:'Picture: {name}. Tap to hear it.',de:'Bild: {name}. Tippen zum Anhören.',nl:'Plaatje: {name}. Tik om het te horen.',fr:'Image : {name}. Touche pour l’entendre.'},
    aSock:          {en:'Team socket {n}: {team}. Tap to open the clasp.',de:'Paar-Fach {n}: {team}. Tippen öffnet die Klammer.',nl:'Vakje {n}: {team}. Tik om de klem te openen.',fr:'Case {n} : {team}. Touche pour ouvrir le fermoir.'},
    aSockEmpty:     {en:'Team socket {n}: empty',de:'Paar-Fach {n}: leer',nl:'Vakje {n}: leeg',fr:'Case {n} : vide'},
    aTile:          {en:'Vowel {v}',de:'Vokal {v}',nl:'Klinker {v}',fr:'Voyelle {v}'},
    aTeamTile:      {en:'Team {team}',de:'Paar {team}',nl:'Klankgroep {team}',fr:'Son {team}'},
    aRefused:       {en:'{a} and {b} are not a team.',de:'{a} und {b} sind kein Paar.',nl:'{a} en {b} horen niet samen.',fr:'{a} et {b} ne vont pas ensemble.'},
    aLocked:        {en:'{team} locked: the {t} says its name.',de:'{team} rastet ein: ein Laut.',nl:'{team} klikt vast: één klank.',fr:'{team} s’accroche : un seul son.'},
    aLockedOne:     {en:'{team} locked: one sound.',de:'{team} rastet ein: ein Laut.',nl:'{team} klikt vast: één klank.',fr:'{team} s’accroche : un seul son.'},
    setClue:        {en:'Clue',de:'Aufgabe',nl:'Opdracht',fr:'Consigne'},
    cBuild:         {en:'Build the word',de:'Wort bauen',nl:'Bouw het woord',fr:'Construis le mot'},
    cSame:          {en:'Same sound?',de:'Same sound?',nl:'Same sound?',fr:'Same sound?'}
  },/*STRINGS-END*/

  defaults: { clue: 'build' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'build', labelKey: 'cBuild' }, { value: 'same', labelKey: 'cSame' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._board = {}; this._drag = null; this._dragEl = null; this._dragEnd = 0; this._nudged = false;
    /* Same sound? is English only (ee / ea): elsewhere there is no clue to choose */
    if (PinchTeamsCore.clues(this._loc()).length < 2) { this.settings = []; if (api.settings) api.settings.clue = 'build'; }
    injectPinchTeamsCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return PinchTeamsCore.locale(((this.api && this.api.lang) || 'en')); },
  _clue: function () { return PinchTeamsCore.clueOf(this._loc(), this._setting('clue')); },
  _key: function () { return this._loc() + '/' + this._clue(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = PinchTeamsCore.rounds(this._loc(), this._clue(), 0).map(function (x, i) { return i; }); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._ids = null; this._R = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = PinchTeamsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._clue(), Math.random, fresh ? null : this._ids, pass), R = C.rounds(this._loc(), this._clue(), P.set);
      this._ids = P.order; this._R = R; this._order = P.order.map(function (x) { return R.indexOf(x); }); this._pos = P.pos; this._set = P.set; this._orderForPool = pool; this._pass = pass;
    }
    var r = this._roundAt(at), pa = { msg: '' }; this._pa = pa;
    return {
      id: 'pinchteams.' + this._key() + '.' + (this._set || 0) + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* _order holds POSITIONS into the rounds of the pass's set */
  _roundAt: function (at) { var R = this._R || PinchTeamsCore.rounds(this._loc(), this._clue(), this._set || 0); return R[this._order ? this._order[at] : at]; },
  _setPrompt: function () { var line = this._t(this.st.clue === 'same' ? 'tSame' : 'tBuild'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (id, at) {
    this._clearTimers(); this._endDrag(); this._at = at || 0;
    var pos = this._pos ? this._pos[this._at] : null;
    this.st = PinchTeamsCore.newState(this._loc(), this._clue(), this._set || 0, id, { pos: pos, rnd: Math.random });
    this._view = { note: '', ok: '', bump: -1, snap: -1 };
    /* the nudge stays until the child's first move or Check retires it */
    if (!this._nudged && this.st.clue === 'build') { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._roundAt(0), 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'pt-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="pt-board" role="list"></div><div class="pt-top"></div><div class="pt-railbox"></div><div class="pt-tray"></div><div class="pt-foot"></div><p class="pt-note" aria-live="polite"></p><p class="pt-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* sockets share the rail width: a seated letter is one unit, a team socket 1.9 */
  _dims: function () {
    var W = this._width(), w = Math.min(W, 700), B = PinchTeamsCore.band(W), gap = B.wide ? 6 : 4, st = this.st;
    var cells = st ? st.w.cells : [], units = 0; cells.forEach(function (c) { units += c.kind === 'team' ? 1.9 : 1; });
    var room = w - 28 - gap * Math.max(0, cells.length - 1), cell = Math.max(30, Math.min(B.wide ? 66 : 56, Math.floor(room / Math.max(units, 1))));
    var pic = B.wide ? 150 : B.tiny ? 96 : Math.max(96, Math.min(116, Math.floor(w * 0.34)));
    var tile = B.wide ? 60 : B.tiny ? 46 : 50, tileH = B.wide ? 68 : B.tiny ? 54 : 58;
    return { w: w, wide: B.wide, tiny: B.tiny, gap: gap, cell: cell, team: Math.round(cell * 1.9), cellH: Math.max(52, Math.round(cell * 1.18)), pic: pic, tile: tile, tileH: tileH };
  },
  _img: function (w) { return '/image-library-webp/themes/' + w.pic + '@2x.webp'; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.85 }); } catch (e) {} },
  _sr: function (s) { var el = this._qs('.pt-sr'); if (el) el.textContent = s; },
  /* the board's columns: the teams this locale's rounds use, in their first-met order */
  _teams: function () {
    var C = PinchTeamsCore, loc = this._loc(), out = [];
    C.BUILD[loc].forEach(function (set) { set.forEach(function (id) { C.word(loc, id).teams.forEach(function (t) { t = t.toLowerCase(); if (out.indexOf(t) < 0) out.push(t); }); }); });
    return out;
  },
  /* one team drawn as a double tile: en four teams light the talker gold and dim the partner; elsewhere both glow */
  _teamHtml: function (team, locked) {
    var C = PinchTeamsCore, loc = this.st.loc, t = locked ? C.talker(loc, team) : null, lt = team.split('');
    return '<span class="pt-clasp' + (locked ? ' is-shut' : '') + '" aria-hidden="true"></span>' + lt.map(function (c, i) {
      var cls = 'pt-v' + (locked ? (t ? (i === 0 ? ' is-talk' : ' is-quiet') : ' is-one') : '');
      return '<span class="' + cls + '">' + (locked && t && i === 0 ? '<i class="pt-wave"></i>' : '') + esc(c) + '</span>';
    }).join('');
  },

  _paint_: function () {
    var C = PinchTeamsCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'pt-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' clue-' + st.clue + ' loc-' + st.loc;
    ['cell', 'team', 'cellH', 'tile', 'tileH', 'gap'].forEach(function (k) { self._wrap.style.setProperty('--pt-' + k, D[k] + 'px'); });
    /* the team board: one column per team, finished words pinned under it */
    var board = this._qs('.pt-board'), teams = this._teams(), B = this._board; board.innerHTML = ''; board.setAttribute('aria-label', this._t('aBoard'));
    teams.forEach(function (t) {
      var col = document.createElement('div'); col.className = 'pt-col'; col.setAttribute('role', 'listitem');
      col.innerHTML = '<span class="pt-colhead">' + esc(t) + '</span>' + (B[t] || []).slice(-3).map(function (w) { return '<span class="pt-wtag">' + esc(w) + '</span>'; }).join('');
      board.appendChild(col);
    });
    var top = this._qs('.pt-top'); top.innerHTML = '';
    var card = document.createElement('div'); card.className = 'pt-card';
    var pic = this._btn('pt-pic', 'pic', this._t('aPic', { name: st.w.display }), '<img src="' + this._img(st.w) + '" alt="" width="' + D.pic + '" height="' + D.pic + '" draggable="false">');
    pic.style.width = pic.style.height = (D.pic + 10) + 'px';
    pic.addEventListener('click', function () { self._speak(st.w.display); });
    card.appendChild(pic);
    if (st.loc === 'en') { var bd = C.badge(st), badge = document.createElement('span'); badge.className = 'pt-badge' + (bd ? ' is-on' : ''); badge.setAttribute('aria-hidden', 'true'); badge.textContent = bd || ''; card.appendChild(badge); }
    if (st.done) { var tag = document.createElement('span'); tag.className = 'pt-wordtag'; tag.textContent = st.w.display; card.appendChild(tag); }
    top.appendChild(card);
    this._paintRail(D);
    var tray = this._qs('.pt-tray'); tray.innerHTML = '';
    var bright = C.bright(st);
    st.tray.forEach(function (x, t) {
      var used = C.usedAt(st, t) >= 0, dim = bright && !x.team && bright.indexOf(x.c.toLowerCase()) < 0;
      var b = self._btn('pt-tile' + (x.team ? ' is-team' : '') + (used ? ' is-used' : '') + (dim ? ' is-dim' : '') + (v.bump === t ? ' is-bump' : ''), 'tile-' + t,
        x.team ? self._t('aTeamTile', { team: x.c }) : self._t('aTile', { v: x.c }), used ? '' : (x.team ? self._teamHtml(x.c, true) : '<span class="pt-v">' + esc(x.c) + '</span>'));
      b.disabled = used || st.done;
      self._wireDrag(b, t);
      b.addEventListener('click', function () { if (self._afterDrag(b)) return; self._drop(t, null); });
      tray.appendChild(b);
    });
    var foot = this._qs('.pt-foot'); foot.innerHTML = '';
    var chk = this._btn('pt-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.pt-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'pt-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'pt-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'pt-note'; }
  },
  _paintRail: function (D) {
    var C = PinchTeamsCore, st = this.st, v = this._view, self = this, box = this._qs('.pt-railbox'); box.innerHTML = '';
    var rail = document.createElement('div'); rail.className = 'pt-rail'; rail.setAttribute('role', 'group');
    var marks = st.marks && st.marks.socks, ghosts = C.ghosts(st), s = -1;
    st.w.cells.forEach(function (c) {
      if (c.kind !== 'team') { var e = document.createElement('span'); e.className = 'pt-cell is-' + c.kind; e.textContent = c.c; e.setAttribute('aria-hidden', 'true'); rail.appendChild(e); return; }
      s++;
      var S = st.sockets[s], m = marks ? marks[s] : null, team = C.sockTeam(st, s), revealed = st.reveal && st.reveal.indexOf(s) >= 0 && !S.tiles.length, i = s;
      var html = '';
      if (S.locked) html = '<span class="pt-dbl' + (v.snap === s ? ' is-snap' : '') + '">' + self._teamHtml(team, true) + '</span>';
      else if (S.tiles.length) html = '<span class="pt-v pt-lone">' + esc(team) + '</span>';
      else if (revealed) html = '<span class="pt-spell" aria-hidden="true">' + esc(st.w.teams[s]) + '</span>';
      else if (ghosts) html = '<span class="pt-ghost" aria-hidden="true">' + esc(ghosts[s]) + '</span>';
      var b = self._btn('pt-sock' + (S.tiles.length ? '' : ' is-empty') + (m && m !== 'ok' && S.tiles.length ? ' is-' + m : '') + (st.done ? ' is-done' : '') + (revealed ? ' is-reveal' : '') + (!S.tiles.length && st.last === 'tray' ? ' is-pulse' : ''), 'sock-' + s,
        S.tiles.length ? self._t('aSock', { n: s + 1, team: team }) : self._t('aSockEmpty', { n: s + 1 }), html);
      b.setAttribute('data-sock', String(s));
      b.disabled = st.done || !S.tiles.length;
      b.addEventListener('click', function () { if (self._afterDrag(b)) return; if (PinchTeamsCore.clearSock(st, i) === 'cleared') { self.api.sound(300); self._clearHelp(); v.bump = -1; self._paint(); } });
      rail.appendChild(b);
    });
    box.appendChild(rail);
  },

  /* ---------------- the hand ---------------- */
  _drop: function (t, s) {
    var C = PinchTeamsCore, st = this.st, v = this._view, self = this, sockBefore = s == null ? (st.tray[t].team ? 0 : C.nextSock(st)) : s;
    var first = sockBefore >= 0 && st.sockets[sockBefore] && st.sockets[sockBefore].tiles.length === 1 ? st.tray[st.sockets[sockBefore].tiles[0]].c : null;
    var r = C.drop(st, t, s);
    if (r === 'no' || r === 'full') { this.api.sound(200); this._paint(); return; }
    this._clearHelp(); v.bump = -1; v.snap = -1;
    if (r === 'refused') {
      this.api.sound(180); v.bump = t; this._sr(this._t('aRefused', { a: first, b: st.tray[t].c }));
      this._paint(); if (!this.FAST) this._later(function () { v.bump = -1; if (self._wrap) self._paint(); }, 480); return;
    }
    if (r === 'locked' || (r === 'placed' && st.tray[t].team)) {
      var at = C.usedAt(st, t), team = C.sockTeam(st, at), tk = C.talker(st.loc, team);
      this.api.sound(900); v.snap = at;
      this._sr(tk ? this._t('aLocked', { team: team, t: tk }) : this._t('aLockedOne', { team: team }));
      if (tk) this._speak(tk);
      this._later(function () { v.snap = -1; }, 400);
    } else this.api.sound(420);
    this._paint();
  },
  _wireDrag: function (el, t) {
    var self = this;
    el.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return; if (el.disabled || self.st.done) return;
      var dr = { el: el, t: t, x: e.clientX, y: e.clientY, moved: false, ghost: null };
      self._endDrag(); self._drag = dr;
      dr.move = function (ev) {
        if (!dr.moved && Math.abs(ev.clientX - dr.x) + Math.abs(ev.clientY - dr.y) < 8) return;
        if (!dr.moved) { dr.moved = true; el.classList.add('is-dragging'); var g = document.createElement('div'); g.className = 'pt-dragtile'; g.textContent = self.st.tray[t].c; document.body.appendChild(g); dr.ghost = g; }
        ev.preventDefault(); dr.ghost.style.left = ev.clientX + 'px'; dr.ghost.style.top = ev.clientY + 'px';
      };
      dr.up = function (ev) {
        var moved = dr.moved, s = moved ? self._sockAt(ev.clientX, ev.clientY) : -1; self._endDrag();
        if (!moved) return; self._dragEl = el; self._dragEnd = Date.now();
        if (s >= 0) self._drop(t, s); else self._paint();
      };
      window.addEventListener('pointermove', dr.move, { passive: false }); window.addEventListener('pointerup', dr.up); window.addEventListener('pointercancel', dr.up);
    });
  },
  _afterDrag: function (el) { return this._dragEl === el && Date.now() - this._dragEnd < 400; },
  _endDrag: function () {
    var dr = this._drag; if (!dr) return;
    window.removeEventListener('pointermove', dr.move); window.removeEventListener('pointerup', dr.up); window.removeEventListener('pointercancel', dr.up);
    if (dr.ghost && dr.ghost.parentNode) dr.ghost.parentNode.removeChild(dr.ghost);
    if (dr.el) dr.el.classList.remove('is-dragging'); this._drag = null;
  },
  _sockAt: function (x, y) { var els = this._wrap ? this._wrap.querySelectorAll('[data-sock]') : []; for (var i = 0; i < els.length; i++) { var r = els[i].getBoundingClientRect(); if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 10 && y <= r.bottom + 10) return +els[i].getAttribute('data-sock'); } return -1; },

  /* ---------------- Check ---------------- */
  _check: function () {
    var C = PinchTeamsCore, st = this.st, v = this._view;
    if (st.done) return;
    this._nudged = true;
    var a = C.check(st);
    if (a.result === 'tray') { this.api.sound(200); v.nudge = false; v.note = this._t(C.hint(st).key); this._paint(); this.api.announce(v.note); return; }
    if (a.result === 'ok') { this._success(); return; }
    var h = C.hint(st); this.api.sound(a.kind === 'spelling' ? 520 : 220); v.nudge = false; v.note = this._t(h.key, h.args);
    this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = PinchTeamsCore, st = this.st, v = this._view, w = st.w, team = w.teams[0], tl = team.toLowerCase(), tk = C.talker(st.loc, team);
    if (st.clue === 'same') v.ok = this._t('okSame', { word: w.display, team: team });
    else if (tk) v.ok = this._t(team[0] === team[1] ? 'okTalkSame' : 'okTalk', { sounds: w.sounds.join('–'), word: w.display, team: team, t: team[0], q: team[1] });
    else v.ok = this._t('okOne', { word: w.display, team: team });
    (this._board[tl] = this._board[tl] || []).push(w.display);
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3600);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectPinchTeamsCSS() {
  if (typeof document === 'undefined' || document.getElementById('pt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.pt-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .pt-wrap:focus{outline:none;} .pt-wrap.is-narrow{gap:9px;}'
  + '.pt-board{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:100%;max-width:560px;} .pt-col{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:52px;padding:3px 4px 4px;border-radius:8px;background:rgba(255,248,236,.7);box-shadow:inset 0 0 0 1.5px #E2CFAE;}'
  + '.pt-colhead{padding:0 6px;border-radius:6px;background:#146B5E;color:#FFF8EC;font-family:' + H + ';font-weight:800;font-size:16px;line-height:1.3;} .pt-wtag{font-family:' + H + ';font-weight:700;font-size:13px;line-height:1.15;color:#3A2E1F;} .pt-wrap.is-tiny .pt-board{display:none;}'
  + '.pt-top{display:flex;justify-content:center;width:100%;} .pt-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.pt-pic{display:flex;align-items:center;justify-content:center;padding:0;border:3px solid #3A2E1F;border-radius:18px;background:#FFF8EC;cursor:pointer;} .pt-pic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.pt-badge{position:absolute;right:-8px;top:-8px;width:36px;height:36px;border-radius:50%;box-sizing:border-box;border:2px dashed #C9B48F;background:#FFFDF6;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:20px;color:#3A2E1F;} .pt-badge.is-on{border:3px solid #C9A54E;background:#FFE9A8;}'
  + '.pt-wordtag{padding:2px 12px;border-radius:8px;background:#FFF1C9;box-shadow:0 0 0 2px #3A2E1F;font-family:' + H + ';font-weight:800;font-size:22px;color:#2B1D0E;animation:ptDrop .3s ease-out;} .pt-wrap.is-fast .pt-wordtag{animation:none;} @keyframes ptDrop{from{transform:translateY(-12px);opacity:0;}}'
  + '.pt-railbox{display:flex;justify-content:center;width:100%;} .pt-rail{display:flex;align-items:stretch;gap:var(--pt-gap);padding:10px 12px;border-radius:16px;background:linear-gradient(#C99560,#A8743F);box-shadow:inset 0 -4px 0 rgba(58,46,31,.35),0 2px 0 #6B4A26;}'
  + '.pt-cell{display:flex;align-items:center;justify-content:center;width:var(--pt-cell);height:var(--pt-cellH);border-radius:10px;background:#FFF8EC;box-shadow:inset 0 0 0 2px #6B4A26;font-family:' + H + ';font-weight:700;font-size:calc(var(--pt-cell) * .62);line-height:1;color:#2B1D0E;} .pt-cell.is-quiet{background:rgba(255,248,236,.45);color:#8C7A5B;box-shadow:inset 0 0 0 2px rgba(107,74,38,.55);}'
  + '.pt-sock{position:relative;width:var(--pt-team);height:var(--pt-cellH);box-sizing:border-box;padding:0;border:0;border-radius:12px;background:#FFF8EC;box-shadow:inset 0 0 0 2px #6B4A26;display:flex;align-items:center;justify-content:center;gap:2px;font-family:' + H + ';cursor:pointer;} .pt-sock:disabled{cursor:default;}'
  + '.pt-sock.is-empty{background:rgba(255,248,236,.55);outline:2px dashed #FFF8EC;outline-offset:-7px;} .pt-sock.is-pulse{animation:ptPulse 1s ease-in-out 2;} @keyframes ptPulse{50%{transform:scale(1.06);}}'
  + '.pt-sock.is-wrong,.pt-sock.is-single{transform:translateY(-6px);box-shadow:inset 0 0 0 2px #6B4A26,0 0 0 4px #E0503C;} .pt-sock.is-reveal{box-shadow:inset 0 0 0 2px #6B4A26,0 0 0 4px #3BAA72;} .pt-sock.is-done{box-shadow:inset 0 0 0 2px #6B4A26,0 0 0 3px #3BAA72;}'
  + '.pt-v{position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:.9em;font-family:' + H + ';font-weight:800;font-size:calc(var(--pt-cell) * .62);line-height:1;color:#0E3B34;}'
  + '.pt-lone{font-size:calc(var(--pt-cell) * .5);opacity:.85;}'
  + '.pt-dbl{position:relative;display:flex;align-items:center;justify-content:center;gap:2px;width:92%;height:84%;border-radius:10px;background:#E3F2EF;box-shadow:inset 0 0 0 2px #146B5E;} .pt-dbl.is-snap{animation:ptSnap .3s ease-out;} .pt-wrap.is-fast .pt-dbl{animation:none;} @keyframes ptSnap{0%{transform:scaleX(1.25);}100%{transform:none;}}'
  + '.pt-clasp{position:absolute;left:18%;right:18%;top:-6px;height:9px;border-radius:5px 5px 2px 2px;background:linear-gradient(#E9C46A,#B08A2E);box-shadow:0 0 0 1.5px #7A5B14;display:none;} .pt-clasp.is-shut{display:block;}'
  + '.pt-v.is-talk{color:#2B1D0E;background:#F2C230;border-radius:6px;padding:0 3px;} .pt-v.is-quiet{color:rgba(14,59,52,.3);} .pt-v.is-one{color:#2B1D0E;background:#F2C230;border-radius:6px;padding:0 2px;}'
  + '.pt-wave{position:absolute;top:-10px;left:50%;width:14px;height:6px;margin-left:-7px;border:2px solid #C9A54E;border-color:#C9A54E transparent transparent transparent;border-radius:50%;}'
  + '.pt-spell{display:flex;align-items:center;justify-content:center;width:86%;height:80%;border-radius:8px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #3BAA72;font-family:' + H + ';font-weight:800;font-size:calc(var(--pt-cell) * .55);color:#2E7D4F;animation:ptFlip .35s ease-out;} .pt-wrap.is-fast .pt-spell{animation:none;} @keyframes ptFlip{0%{transform:rotateY(90deg);}100%{transform:none;}}'
  + '.pt-ghost{font-family:' + H + ';font-weight:800;font-size:calc(var(--pt-cell) * .55);color:rgba(43,29,14,.28);}'
  + '.pt-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:560px;} .pt-wrap.is-narrow .pt-tray{gap:6px;max-width:300px;}'
  + '.pt-tile{position:relative;width:var(--pt-tile);height:var(--pt-tileH);padding:0;border:0;border-radius:12px;background:#FFF8EC;box-shadow:inset 0 0 0 2.5px #146B5E,0 3px 0 #0E3B34;display:flex;align-items:center;justify-content:center;gap:2px;cursor:grab;touch-action:none;--pt-cell:var(--pt-tile);}'
  + '.pt-tile.is-team{width:calc(var(--pt-tile) * 1.9);} .pt-tile.is-team .pt-v{font-size:calc(var(--pt-tile) * .55);} .pt-tile.is-used{background:transparent;box-shadow:inset 0 0 0 2px #E2CFAE;cursor:default;} .pt-tile.is-dim{opacity:.28;} .pt-tile.is-dragging{opacity:.4;}'
  + '.pt-tile.is-bump{animation:ptBump .45s ease-in-out;} .pt-wrap.is-fast .pt-tile.is-bump{animation:none;} @keyframes ptBump{20%{transform:translateY(-16px) rotate(-8deg);}50%{transform:translateY(-6px) rotate(10deg);}100%{transform:none;}}'
  + '.pt-dragtile{position:fixed;z-index:9999;pointer-events:none;min-width:46px;height:52px;margin:-26px 0 0 -23px;padding:0 8px;box-sizing:border-box;border-radius:10px;background:#FFF8EC;box-shadow:inset 0 0 0 2.5px #146B5E,0 4px 10px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:28px;color:#0E3B34;}'
  + '.pt-foot{display:flex;justify-content:center;width:100%;}'
  + '.pt-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .pt-check:disabled{opacity:.5;cursor:default;}'
  + '.pt-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .pt-note.is-hint{color:#8A3B1F;} .pt-note.is-nudge{color:#5E6770;} .pt-wrap.is-narrow .pt-note{font-size:17px;}'
  + '.pt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.pt-wrap.is-tiny .pt-check{min-width:112px;padding:8px 14px;font-size:20px;} .pt-wrap.is-tiny .pt-rail{padding:8px 10px;}'
  + '.pt-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'pt-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.PinchTeamsActivity = PinchTeamsActivity;
