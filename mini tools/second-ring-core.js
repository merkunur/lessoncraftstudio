/* =====================================================================
   second-ring-core.js — the model of ACTIVITY #159 of the one-by-one
   rebuild: "Sprocket's Clock — 12-Hour & 24-Hour" → THE SECOND RING
   (2.MD.C.7, extended to the 24-hour form). Pure, no DOM.
   Design: docs/activities-rebuild/designs/159-clock-convert.md
   ---------------------------------------------------------------------
   One time of day, two ways of writing it. The open card shows a time one
   way; the child WRITES it the other way (an hour box, a minute box and —
   for the 12-hour way — a day-part chip). On Check the clock runs to the
   CHILD's time from midnight: the hour hand carries a counting tag that
   says the face's numbers on the first lap and keeps counting 13, 14, 15…
   on the second, dropping each number into an empty socket under the
   face's own numeral. The given time stays on the face as dashed
   outlines, so the run's hands land in them only when the answer is right.
   The answer is never stored: it is the round's own 24-hour time.
   ===================================================================== */
(function (root) {
  'use strict';
  /* [direction, hour (24 h), minute]: 'to24' — the open card is 12-hour, write it 24-hour; 'to12' — the reverse */
  var TABLE = {
    '1': [['to24', 15, 0], ['to12', 20, 0], ['to24', 21, 30], ['to12', 14, 0], ['to24', 8, 0], ['to12', 10, 30], ['to24', 18, 0], ['to12', 23, 0], ['to24', 19, 30], ['to12', 7, 0]],
    '2': [['to12', 14, 15], ['to24', 13, 20], ['to12', 23, 45], ['to24', 16, 5], ['to12', 12, 0], ['to24', 0, 0], ['to24', 9, 5], ['to12', 17, 50], ['to12', 11, 35], ['to24', 22, 40]]
  };
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var R = function (a, b) { var o = []; for (var i = a; i <= b; i++) o.push(i); return o; };
  /* the day-part chips: each locale's own words; every chip names the 24-hour hours it can mean ('both' laps only for the night words) */
  var CHIPS = {
    en: [['am', 'a.m.', R(0, 11)], ['pm', 'p.m.', R(12, 23)]],
    es: [['am', 'a. m.', R(0, 11)], ['pm', 'p. m.', R(12, 23)]],
    fi: [['ap', 'ap.', R(0, 11)], ['ip', 'ip.', R(12, 23)]],
    sv: [['fm', 'fm', R(0, 11)], ['em', 'em', R(12, 23)]],
    de: [['morgens', 'morgens', R(5, 9)], ['vormittags', 'vormittags', R(9, 11)], ['mittags', 'mittags', [12, 13]], ['nachmittags', 'nachmittags', R(13, 17)], ['abends', 'abends', R(17, 23)], ['nachts', 'nachts', [22, 23, 0, 1, 2, 3, 4]]],
    fr: [['matin', 'du matin', R(1, 11)], ['midi', 'midi', [12]], ['apm', 'de l’après-midi', R(13, 17)], ['soir', 'du soir', R(18, 23)]],
    it: [['mattina', 'di mattina', R(5, 11)], ['mezzogiorno', 'mezzogiorno', [12]], ['pomeriggio', 'del pomeriggio', R(13, 17)], ['sera', 'di sera', R(18, 23)], ['notte', 'di notte', [23, 0, 1, 2, 3, 4]]],
    pt: [['manha', 'da manhã', R(5, 11)], ['meiodia', 'meio-dia', [12]], ['tarde', 'da tarde', R(13, 18)], ['noite', 'da noite', R(18, 23)]],
    nl: [['ochtend', '’s ochtends', R(6, 11)], ['middag', '’s middags', R(12, 17)], ['avond', '’s avonds', R(18, 23)], ['nacht', '’s nachts', R(0, 5)]],
    da: [['morgen', 'om morgenen', R(5, 9)], ['formiddag', 'om formiddagen', R(9, 11)], ['middag', 'midt på dagen', [12]], ['eftermiddag', 'om eftermiddagen', R(13, 17)], ['aften', 'om aftenen', R(18, 23)], ['nat', 'om natten', [23, 0, 1, 2, 3, 4]]],
    no: [['morgen', 'om morgenen', R(5, 9)], ['formiddag', 'på formiddagen', R(9, 11)], ['middag', 'midt på dagen', [12]], ['ettermiddag', 'på ettermiddagen', R(13, 17)], ['kveld', 'om kvelden', R(18, 23)], ['natt', 'om natta', [23, 0, 1, 2, 3, 4]]]
  };
  /* noon and midnight written the 12-hour way */
  var NOON = { en: '12:00 p.m. (noon)', es: '12:00 p. m. (mediodía)', fi: '12.00 ip. (keskipäivä)', sv: 'klockan tolv mitt på dagen', de: '12 Uhr mittags', fr: 'midi', it: 'mezzogiorno', pt: 'meio-dia', nl: '12 uur ’s middags', da: 'klokken tolv midt på dagen', no: 'klokka tolv midt på dagen' };
  var MIDNIGHT = { en: '12:00 a.m. (midnight)', es: '12:00 a. m. (medianoche)', fi: '12.00 ap. (keskiyö)', sv: 'midnatt', de: 'Mitternacht', fr: 'minuit', it: 'mezzanotte', pt: 'meia-noite', nl: 'middernacht', da: 'midnat', no: 'midnatt' };
  var DOT = ['nl', 'sv', 'da', 'no', 'fi'];

  function levelOf(v) { return String(v) === '2' ? '2' : '1'; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function chips(loc) { return CHIPS[locOf(loc)].map(function (c) { return { key: c[0], label: c[1], hours: c[2].slice() }; }); }
  function chip(loc, key) { var c = chips(loc).filter(function (x) { return x.key === key; })[0]; return c || null; }
  /* the chips that may name a 24-hour hour (the round's accepted set) and the canonical one (the first) */
  function accepted(loc, h24) { return chips(loc).filter(function (c) { return c.hours.indexOf(h24) >= 0; }).map(function (c) { return c.key; }); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  /* the 24-hour form: "15:00" · "15.00" · fr « 15 h 00 » (the hour as the locale writes it: "08:00", fi "8.00") */
  function fmt24(loc, h, m) { var l = locOf(loc); if (l === 'fr') return h + ' h ' + pad2(m); return (l === 'fi' ? String(h) : pad2(h)) + (DOT.indexOf(l) >= 0 ? '.' : ':') + pad2(m); }
  /* the 12-hour form with its day-part: "3:00 p.m." · « 9 h 30 du soir » · noon and midnight by name */
  function fmt12(loc, h, m) {
    var l = locOf(loc);
    if (h === 12 && m === 0) return NOON[l];
    if (h === 0 && m === 0) return MIDNIGHT[l];
    var h12 = h % 12 === 0 ? 12 : h % 12, c = chip(l, accepted(l, h)[0]);
    if (l === 'fr') return h12 + ' h' + (m ? ' ' + pad2(m) : '') + ' ' + c.label;
    return h12 + (DOT.indexOf(l) >= 0 ? '.' : ':') + pad2(m) + ' ' + c.label;
  }
  function rounds(level, loc) {
    level = levelOf(level); loc = locOf(loc);
    return TABLE[level].map(function (x, i) {
      var t = x[1] * 60 + x[2];
      return { k: i, level: level, dir: x[0], h24: x[1], m: x[2], t: t, given: x[0] === 'to24' ? fmt12(loc, x[1], x[2]) : fmt24(loc, x[1], x[2]), accepted: accepted(loc, x[1]) };
    });
  }
  function newState(level, k, loc) {
    var pool = rounds(level, loc), r = pool[k] || pool[0];
    return { level: levelOf(level), loc: locOf(loc), k: r.k, round: r, h: '', m: '', part: null, focus: 'h', misses: 0, help: false, verdict: null, done: false };
  }
  function clear(st) { if (!st.done) st.verdict = null; }
  function focus(st, box) { if (st.done || (box !== 'h' && box !== 'm')) return false; st.focus = box; return true; }
  /* two digits per box; a third replaces; a full hour box moves on to the minutes */
  function typeDigit(st, d) {
    if (st.done || !/^[0-9]$/.test(String(d))) return false;
    var b = st.focus, v = st[b];
    st[b] = v.length >= 2 ? String(d) : v + d;
    if (b === 'h' && st.h.length === 2) st.focus = 'm';
    clear(st); return true;
  }
  function back(st) {
    if (st.done) return false;
    if (!st[st.focus] && st.focus === 'm') st.focus = 'h';
    if (!st[st.focus]) return false;
    st[st.focus] = st[st.focus].slice(0, -1); clear(st); return true;
  }
  function setPart(st, key) {
    if (st.done || st.round.dir !== 'to12') return false;
    if (key !== null && !chip(st.loc, key)) return false;
    st.part = st.part === key ? null : key; clear(st); return true;
  }
  /* the child's written time as minutes from midnight (null when it names no time of day) */
  function childMinutes(st) {
    var r = st.round, h = parseInt(st.h, 10), m = parseInt(st.m, 10);
    if (!(h === h) || !(m === m) || m > 59) return null;
    if (r.dir === 'to24') return h <= 23 ? h * 60 + m : null;
    if (h < 1 || h > 12 || !st.part) return null;
    var c = chip(st.loc, st.part), lo = h % 12, hi = lo + 12;
    var h24 = c.hours.indexOf(lo) >= 0 ? lo : c.hours.indexOf(hi) >= 0 ? hi : null;
    return h24 === null ? null : h24 * 60 + m;
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round;
    if (st.h === '' || st.m === '') return { result: 'note', key: 'hintBlank' };
    if (r.dir === 'to12' && !st.part) return { result: 'note', key: 'hintPart' };
    var t = childMinutes(st);
    if (t === r.t) { st.done = true; st.verdict = null; return { result: 'ok', t: t }; }
    st.misses++; st.help = st.misses >= 2;
    var h = parseInt(st.h, 10), m = parseInt(st.m, 10), kind;
    if (r.t === 0 && r.dir === 'to24' && (h === 24 || h === 12) && m === 0) kind = 'midnight';
    else if (r.t === 720 && r.dir === 'to12' && h === 12 && m === 0) kind = 'noon';
    else if (r.dir === 'to12' && (h < 1 || h > 12)) kind = 'twelve';
    else if (t === null && r.dir === 'to12' && m <= 59) kind = 'part';
    else if (t === null) kind = 'hour';
    else if ((t >= 720) !== (r.t >= 720)) kind = t >= 720 ? 'pastNoon' : 'beforeNoon';
    else if (Math.floor(t / 60) !== r.h24) kind = 'hour';
    else kind = 'minute';
    st.verdict = { kind: kind, t: t };
    return { result: 'miss', kind: kind, t: t };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    if (v.kind === 'midnight') return 'hintMidnight';
    if (v.kind === 'noon') return 'hintNoon';
    if (v.kind === 'twelve') return 'hintTwelve';
    /* the hour was right: the help about counting hours would point the wrong way — the minutes hint stays */
    if (v.kind === 'minute') return 'hintMinute';
    if (st.help) return st.round.t < 720 ? 'hintHelpAm' : 'hintHelpPm';
    if (v.kind === 'part') return 'hintPartFit';
    if (v.kind === 'pastNoon') return 'hintPastNoon';
    if (v.kind === 'beforeNoon') return 'hintBeforeNoon';
    if (v.kind === 'hour') return 'hintHour';
    return 'hintMinute';
  }
  /* the run to a time: the tag's count at the end, and the tokens dropped into the second ring on the way (13 … the hour) */
  function run(t) {
    var h = Math.floor(t / 60), toks = [];
    for (var x = 13; x <= h; x++) toks.push(x);
    return { tag: h, tokens: toks, pastNoon: t >= 720 };
  }
  /* the token a SUCCESSFUL run keeps in the ring: its hour on the second lap, or 0 at midnight; none in the morning or at noon */
  function keepToken(t) { var h = Math.floor(t / 60); return t === 0 ? 0 : h >= 13 ? h : null; }
  /* the socket a token sits in: under the face's own numeral (13 under 1 … 23 under 11, 0 under 12) */
  function socketOf(token) { return token === 0 ? 12 : token - 12; }
  function okKey(r) { return r.t === 0 ? 'ok_midnight' : r.t === 720 ? 'ok_noon' : r.h24 < 12 ? 'ok_am' : r.dir === 'to24' ? 'ok_to24' : 'ok_to12'; }
  function okArgs(r, loc) { var h12 = r.h24 % 12 === 0 ? 12 : r.h24 % 12; return { open: r.given, ans: r.dir === 'to24' ? fmt24(loc, r.h24, r.m) : fmt12(loc, r.h24, r.m), h12: h12, h24: r.h24 }; }

  function passSize(level) { return TABLE[levelOf(level)].length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* never three rounds of one direction in a row */
  function runsOk(level, o) { var T = TABLE[levelOf(level)]; for (var i = 2; i < o.length; i++) if (T[o[i]][0] === T[o[i - 1]][0] && T[o[i]][0] === T[o[i - 2]][0]) return false; return true; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, pass, rnd, prev) {
    var ks = TABLE[levelOf(level)].map(function (x, i) { return i; });
    for (var tries = 0; tries < 800; tries++) { var c = shuffle(ks.slice(), rnd); if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c; }
    return ks.slice();
  }

  var api = { LOCALES: LOCALES, levelOf: levelOf, locOf: locOf, chips: chips, chip: chip, accepted: accepted, fmt24: fmt24, fmt12: fmt12, rounds: rounds, newState: newState,
    focus: focus, typeDigit: typeDigit, back: back, setPart: setPart, childMinutes: childMinutes, check: check, hint: hint, run: run, keepToken: keepToken, socketOf: socketOf,
    okKey: okKey, okArgs: okArgs, passSize: passSize, runsOk: runsOk, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SecondRingCore = api;
})(typeof window !== 'undefined' ? window : this);
