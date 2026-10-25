/* =====================================================================
   pinch-teams-core.js — the model for ACTIVITY #112 of the one-by-one
   rebuild: "Build Vowel-Team Words" → THE TALKING CLASP (RF.1.3;
   en de nl fr).
   Design: docs/activities-rebuild/designs/112-syllable-builder.md
   ---------------------------------------------------------------------
   The word's consonants are seated on a rail; each vowel team has a wide
   TEAM SOCKET. The child pinches the team in the socket: the first vowel
   sits, the second either LOCKS beside it under a brass clasp (a real
   team of the language, in that order — oa locks, ao does not) or bumps
   back to the tray. A locked English team lights its talker (oa → the o
   says its name) and dims its partner; elsewhere the whole team lights as
   one sound. Clues (en): Build the word · Same sound? (ee or ea — the
   sound is the same, the word decides the spelling).
   · Every word is typed here in a small notation: b[oa]t — a team in
     brackets, a quiet (silent) letter in parentheses: l[ou](p). Words
     that are sound-boxes bank rows must agree with the bank (the gate
     re-reads it); the rest were read by the review.
   · Shipped: en de nl fr. no (one bank row) is hidden; fi / es / it / pt /
     sv / da are refused (no vowel-team convention, or it would contradict
     the language's own spelling of long vowels).
   Pure and DOM-free; UMD (window.PinchTeamsCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PinchTeamsCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'fr'];
  /* word id → [notation, picture (library theme/noun)]; every picture viewed on a contact sheet 2026-10-25 */
  var WORDS = {
    en: {
      boat: ['b[oa]t', 'beach/boat'], goat: ['g[oa]t', 'farm animals/goat'], coat: ['c[oa]t', 'clothing/coat'], train: ['tr[ai]n', 'toys/train'],
      snail: ['sn[ai]l', 'insects and bugs/snail'], bee: ['b[ee]', 'farm animals/bee'], sheep: ['sh[ee]p', 'farm animals/sheep'], leaf: ['l[ea]f', 'miscellaneous/leaf'],
      seal: ['s[ea]l', 'ocean life/seal'], jeep: ['j[ee]p', 'vehicles/jeep'], nail: ['n[ai]l', 'body parts/nail'], teapot: ['t[ea]pot', 'kitchen tools/teapot'],
      eagle: ['[ea]gle', '4th of July/eagle'], beaver: ['b[ea]ver', 'forest creatures/beaver'], toaster: ['t[oa]ster', 'around the house/toaster'],
      mailbox: ['m[ai]lbox', 'post office/mailbox'], oatmeal: ['[oa]tm[ea]l', 'breakfast/oatmeal'], sailboat: ['s[ai]lb[oa]t', 'beach/sailboat'],
      cheese: ['ch[ee]s(e)', 'At the Supermarket/cheese'], peacock: ['p[ea]cock', 'birds/peacock']
    },
    de: {
      pig: ['Schw[ei]n', 'animals/pig'], leg: ['B[ei]n', 'body parts/leg'], mouse: ['M[au]s', 'pets/mouse'], house: ['H[au]s', 'miscellaneous/house'],
      fence: ['Z[au]n', 'around the house/fence'], car: ['[Au]to', 'toys/car'], owl: ['[Eu]le', 'animals/owl'], dress: ['Kl[ei]d', 'clothing/dress'],
      bee: ['B[ie]ne', 'farm animals/bee'], goat: ['Z[ie]ge', 'farm animals/goat'], boat: ['B[oo]t', 'beach/boat']
    },
    nl: {
      maan: ['m[aa]n', 'space/moon'], boot: ['b[oo]t', 'beach/boat'], boek: ['b[oe]k', 'classroom/book'], muis: ['m[ui]s', 'pets/mouse'], uil: ['[ui]l', 'animals/owl'],
      deur: ['d[eu]r', 'around the house/door'], kaas: ['k[aa]s', 'At the Supermarket/cheese'], huis: ['h[ui]s', 'miscellaneous/house'], vaas: ['v[aa]s', 'around the house/vase'],
      roos: ['r[oo]s', 'flowers/rose'], neus: ['n[eu]s', 'body parts/nose'], voet: ['v[oe]t', 'body parts/foot'], duif: ['d[ui]f', 'birds 2/dove'], kool: ['k[oo]l', 'vegetables/cabbage']
    },
    fr: {
      loup: ['l[ou](p)', 'animals/wolf'], chou: ['ch[ou]', 'vegetables/cabbage'], souris: ['s[ou]ri(s)', 'pets/mouse'], poule: ['p[ou]l(e)', 'birds 2/hen'],
      bouche: ['b[ou]ch(e)', 'body parts/mouth'], poire: ['p[oi]r(e)', 'fruits/pear'], etoile: ['ét[oi]l(e)', 'christmas/star'], four: ['f[ou]r', 'around the house/oven'],
      ours: ['[ou]rs', 'camping/bear']
    }
  };
  /* Build the word: one or two sets per locale (a locale with one set repeats it in a fresh order) */
  var BUILD = {
    en: [['boat', 'goat', 'coat', 'train', 'snail', 'bee', 'sheep', 'leaf', 'seal'], ['jeep', 'nail', 'teapot', 'eagle', 'beaver', 'toaster', 'mailbox', 'oatmeal', 'sailboat']],
    de: [['pig', 'leg', 'mouse', 'house', 'fence', 'car', 'owl', 'dress', 'bee', 'goat', 'boat']],
    nl: [['maan', 'boot', 'boek', 'muis', 'uil', 'deur', 'kaas'], ['huis', 'vaas', 'roos', 'neus', 'voet', 'duif', 'kool']],
    fr: [['loup', 'chou', 'souris', 'poule', 'bouche', 'poire', 'etoile', 'four', 'ours']]
  };
  /* Same sound? (en): long-E words — ee or ea, the sound is the same, the word decides */
  var SAME = ['bee', 'sheep', 'jeep', 'cheese', 'leaf', 'seal', 'teapot', 'eagle', 'peacock'];
  /* the ordered pairs that lock — real vowel teams of the language (order matters: oa locks, ao does not) */
  var TEAMS = {
    en: ['oa', 'ai', 'ee', 'ea', 'oo', 'ie', 'ue', 'oe', 'ou', 'au', 'oi', 'ei', 'ui'],
    de: ['ie', 'au', 'eu', 'ei', 'ai', 'oo', 'aa', 'ee'],
    nl: ['aa', 'ee', 'oo', 'uu', 'oe', 'ui', 'eu', 'ie', 'ei', 'ou', 'au', 'ai', 'oi'],
    fr: ['ou', 'oi', 'ai', 'au', 'ei', 'eu']
  };
  /* English, the four taught teams: the FIRST vowel talks (says its name), the second stays quiet */
  var TALK = { oa: 'o', ai: 'a', ee: 'e', ea: 'e' };
  /* the vowels always in the tray (a word's team letters are added when the base lacks them) */
  var TRAY = { en: 'aeeioou', de: 'aeioou', nl: 'aaeioou', fr: 'aeiou' };
  var VOWEL = /[aeiouäöüéèêàâîôûy]/i;

  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function clues(loc) { return locale(loc) === 'en' ? ['build', 'same'] : ['build']; }
  function clueOf(loc, v) { var c = clues(loc); return c.indexOf(v) >= 0 ? v : c[0]; }
  function sets(loc) { return BUILD[locale(loc)].length; }
  /* parse the notation into cells: seat (a seated letter), quiet (a silent letter, seated hollow), team (a socket) */
  function parse(note) {
    var cells = [], i = 0, display = '', sounds = [];
    while (i < note.length) {
      var ch = note[i];
      if (ch === '[') { var j = note.indexOf(']', i), t = note.slice(i + 1, j); cells.push({ kind: 'team', team: t }); display += t; sounds.push(t); i = j + 1; }
      else if (ch === '(') { var k = note.indexOf(')', i), q = note.slice(i + 1, k); q.split('').forEach(function (c) { cells.push({ kind: 'quiet', c: c }); }); display += q; i = k + 1; }
      else { cells.push({ kind: 'seat', c: ch }); display += ch; sounds.push(ch); i++; }
    }
    return { cells: cells, display: display, teams: cells.filter(function (c) { return c.kind === 'team'; }).map(function (c) { return c.team; }), sounds: sounds };
  }
  function word(loc, id) { var W = WORDS[locale(loc)][id], p = parse(W[0]); p.id = id; p.note = W[0]; p.pic = W[1]; return p; }
  function rounds(loc, clue, set) { loc = locale(loc); return clueOf(loc, clue) === 'same' ? SAME.slice() : BUILD[loc][(set || 0) % sets(loc)].slice(); }
  function isTeam(loc, pair) { return TEAMS[locale(loc)].indexOf(String(pair).toLowerCase()) >= 0; }
  /* the talker of a locked team: English, the four taught teams only; elsewhere the whole team is one sound */
  function talker(loc, team) { return locale(loc) === 'en' ? TALK[String(team).toLowerCase()] || null : null; }
  /* en: ee and ea say the same long E — the right sound with the other spelling */
  function homophones(loc, a, b) { a = String(a).toLowerCase(); b = String(b).toLowerCase(); return locale(loc) === 'en' && a !== b && (a === 'ee' || a === 'ea') && (b === 'ee' || b === 'ea'); }

  /* ---------------- the tray ---------------- */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  /* never a team's two letters side by side in the tray in team order */
  function trayFair(tray, teams) { for (var k = 1; k < tray.length; k++) for (var t = 0; t < teams.length; t++) if (tray[k - 1].c.toLowerCase() === teams[t][0].toLowerCase() && tray[k].c.toLowerCase() === teams[t][1].toLowerCase()) return false; return true; }
  function tray(loc, w, rnd) {
    rnd = rnd || Math.random; loc = locale(loc);
    var base = TRAY[loc].split(''), need = {}, have = {};
    w.teams.forEach(function (t) { t.split('').forEach(function (c) { var l = c.toLowerCase(); need[l] = (need[l] || 0) + 1; }); });
    base.forEach(function (c) { have[c] = (have[c] || 0) + 1; });
    Object.keys(need).forEach(function (c) { while ((have[c] || 0) < need[c]) { base.push(c); have[c] = (have[c] || 0) + 1; } });
    /* a team at the very start of a capitalised word (de Auto, Eule) is pinched from capital vowel tiles */
    w.teams.forEach(function (t) { t.split('').forEach(function (c) { if (c !== c.toLowerCase()) { var i = base.indexOf(c.toLowerCase()); if (i >= 0) base[i] = c; } }); });
    var tiles = base.map(function (c) { return { c: c }; });
    for (var k = 0; k < 400; k++) { var s = shuffle(tiles, rnd); if (trayFair(s, w.teams)) return s; }
    return tiles;
  }

  /* ---------------- the state ---------------- */
  function newState(loc, clue, set, id, opts) {
    opts = opts || {}; loc = locale(loc); clue = clueOf(loc, clue);
    var w = word(loc, id), st = { loc: loc, clue: clue, set: set || 0, id: id, w: w, misses: 0, show: 0, last: null, marks: null, reveal: null, done: false };
    st.sockets = w.teams.map(function () { return { tiles: [], locked: false }; });
    if (clue === 'same') { var left = opts.pos === 1 ? 'ea' : 'ee'; st.tray = [{ c: left, team: true }, { c: left === 'ee' ? 'ea' : 'ee', team: true }]; }
    else st.tray = tray(loc, w, opts.rnd);
    return st;
  }
  function usedAt(st, t) { for (var s = 0; s < st.sockets.length; s++) if (st.sockets[s].tiles.indexOf(t) >= 0) return s; return -1; }
  function sockTeam(st, s) { return st.sockets[s].tiles.map(function (t) { return st.tray[t].c; }).join(''); }
  /* the socket a tap goes to: one holding a single unlocked vowel, else the first empty one */
  function nextSock(st) {
    for (var s = 0; s < st.sockets.length; s++) if (st.sockets[s].tiles.length === 1 && !st.sockets[s].locked && !st.tray[st.sockets[s].tiles[0]].team) return s;
    for (var e = 0; e < st.sockets.length; e++) if (!st.sockets[e].tiles.length) return e;
    return -1;
  }
  /* drop tile t into socket s (null = where a tap goes): an empty socket takes it; a socket with one vowel PINCHES —
     the pair locks under the clasp when it is a real team in that order, else the new vowel is refused */
  function drop(st, t, s) {
    if (st.done || t == null || t < 0 || t >= st.tray.length || usedAt(st, t) >= 0) return 'no';
    var tile = st.tray[t];
    if (s == null) s = tile.team ? 0 : nextSock(st);
    if (s < 0 || s >= st.sockets.length) return 'full';
    var S = st.sockets[s];
    if (tile.team) { S.tiles = [t]; S.locked = true; st.marks = null; st.last = null; st.reveal = null; return 'placed'; }
    if (S.locked || S.tiles.length >= 2) return 'full';
    if (S.tiles.length && st.tray[S.tiles[0]].team) return 'full';
    st.marks = null; st.last = null; st.reveal = null;
    if (!S.tiles.length) { S.tiles.push(t); return 'placed'; }
    var pair = st.tray[S.tiles[0]].c + tile.c;
    if (isTeam(st.loc, pair)) { S.tiles.push(t); S.locked = true; return 'locked'; }
    return 'refused';
  }
  /* a tap on a filled socket opens the clasp and sends its tiles back to the tray */
  function clearSock(st, s) { if (st.done || !st.sockets[s] || !st.sockets[s].tiles.length) return 'no'; st.sockets[s] = { tiles: [], locked: false }; st.marks = null; st.last = null; return 'cleared'; }

  function judge(st) {
    if (st.sockets.some(function (S) { return !S.tiles.length; })) return { kind: 'tray', socks: null };
    var socks = st.sockets.map(function (S, i) {
      var got = sockTeam(st, i), want = st.w.teams[i];
      if (got.toLowerCase() === want.toLowerCase()) return 'ok';
      if (S.tiles.length === 1 && !st.tray[S.tiles[0]].team) return 'single';
      if (homophones(st.loc, got, want)) return 'spelling';
      return 'wrong';
    });
    var kind = socks.indexOf('wrong') >= 0 ? 'wrong' : socks.indexOf('single') >= 0 ? 'single' : socks.indexOf('spelling') >= 0 ? 'spelling' : 'ok';
    return { kind: kind, socks: socks };
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var j = judge(st); st.last = j.kind;
    if (j.kind === 'tray') return { result: 'tray' };
    if (j.kind === 'ok') { st.done = true; st.marks = j; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(3, st.misses); st.marks = j;
    /* right sound, other spelling: the word's own spelling card shows the team, and the child's team goes back to the tray */
    if (j.kind === 'spelling') { st.reveal = []; j.socks.forEach(function (k, i) { if (k === 'spelling') { st.reveal.push(i); st.sockets[i] = { tiles: [], locked: false }; } }); }
    return { result: 'miss', kind: j.kind };
  }
  /* the first socket that is not right (its team is what the help is about) */
  function focus(st) { var m = st.marks; if (!m || !m.socks) return 0; for (var i = 0; i < m.socks.length; i++) if (m.socks[i] !== 'ok') return i; return 0; }
  function hint(st) {
    var k = st.last;
    if (k === 'tray') return { key: st.clue === 'same' ? 'hintSameEmpty' : 'hintEmpty' };
    if (!st.show || !k || k === 'ok') return null;
    var want = st.w.teams[focus(st)];
    if (k === 'spelling') return { key: 'hintSpelling', args: { team: want } };
    if (st.show >= 2) { var t = talker(st.loc, want); return t ? { key: 'hintWrong2', args: { N: t.toUpperCase() } } : { key: 'hintWrong2Team' }; }
    return { key: k === 'single' ? 'hintSingle' : 'hintWrong' };
  }
  /* miss 2 (en): the picture's sound badge shows the long sound's letter; never at rest, never for a spelling slip */
  function badge(st) { if (st.show < 2 || (st.last !== 'wrong' && st.last !== 'single')) return null; var t = talker(st.loc, st.w.teams[focus(st)]); return t ? t.toUpperCase() : null; }
  /* miss 2: only the letters of the right team stay bright in the tray */
  function bright(st) { if (st.show < 2 || (st.last !== 'wrong' && st.last !== 'single') || st.clue !== 'build') return null; return st.w.teams[focus(st)].toLowerCase().split(''); }
  /* miss 3+: the right teams float as ghosts over their sockets */
  function ghosts(st) { return st.show >= 3 && !st.done && st.last !== 'spelling' ? st.w.teams.slice() : null; }

  /* ---------------- the plan ---------------- */
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function noThree(p) { for (var q = 2; q < p.length; q++) if (p[q] === p[q - 1] && p[q] === p[q - 2]) return false; return true; }
  /* fair: the same (first) team never runs longer than it must — two in a row at most, unless one team fills so much
     of the set that a longer run cannot be avoided (fr: seven ou in nine → three) */
  function maxRun(t) { var c = {}, m = 0; t.forEach(function (x) { c[x] = (c[x] || 0) + 1; if (c[x] > m) m = c[x]; }); return Math.max(2, Math.ceil(m / (t.length - m + 1))); }
  function fair(loc, o) {
    var t = o.map(function (id) { return word(loc, id).teams[0].toLowerCase(); }), lim = maxRun(t), run = 1;
    for (var i = 1; i < t.length; i++) { run = t[i] === t[i - 1] ? run + 1 : 1; if (run > lim) return false; }
    return true;
  }
  function plan(loc, clue, rnd, prev, pass) {
    rnd = rnd || Math.random; loc = locale(loc); clue = clueOf(loc, clue);
    var set = clue === 'build' ? (pass || 0) % sets(loc) : 0, ids = rounds(loc, clue, set), o = null;
    for (var k = 0; k < 600; k++) { var c = shuffle(ids, rnd); if (!eq(c, prev) && fair(loc, c)) { o = c; break; } }
    if (!o) o = ids;
    var pos = null;
    if (clue === 'same') { var n = o.length, f0 = rnd() < 0.5 ? Math.floor(n / 2) : Math.ceil(n / 2); for (var t = 0; t < 300; t++) { var p = shuffle(o.map(function (x, i) { return i < f0 ? 0 : 1; }), rnd); if (noThree(p)) { pos = p; break; } } }
    return { order: o, pos: pos, set: set };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    LOCALES: LOCALES, WORDS: WORDS, BUILD: BUILD, SAME: SAME, TEAMS: TEAMS, TALK: TALK, TRAY: TRAY,
    locale: locale, clues: clues, clueOf: clueOf, sets: sets, parse: parse, word: word, rounds: rounds, isTeam: isTeam, talker: talker, homophones: homophones,
    tray: tray, trayFair: trayFair, newState: newState, usedAt: usedAt, sockTeam: sockTeam, nextSock: nextSock, drop: drop, clearSock: clearSock,
    judge: judge, check: check, focus: focus, hint: hint, badge: badge, bright: bright, ghosts: ghosts, plan: plan, fair: fair, band: band
  };
});
