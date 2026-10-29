/* =====================================================================
   day-wheel-core.js — the model of ACTIVITY #158 of the one-by-one
   rebuild: "Sprocket's Clock — A.M. or P.M.?" → THE DAY WHEEL (2.MD.C.7,
   the a.m./p.m. clause). Pure, no DOM.
   Design: docs/activities-rebuild/designs/158-clock-ampm.md
   ---------------------------------------------------------------------
   The clock's hands go round TWICE a day; the day wheel behind the face
   goes round ONCE (geared at half speed), gold for the lap from midnight
   to noon, violet for the lap from noon to midnight. Every round starts
   at midnight; the child winds the hour hand forward to the card's time
   in the right lap. The state is one number: the minutes since midnight.
   The answer is never stored: it is the card's 24-hour time.
   ===================================================================== */
(function (root) {
  'use strict';
  /* [event key, picture theme, picture key, hour (24 h), minute] — a riddle has no picture */
  var TABLE = {
    '1': [['wake', 'furniture', 'bed', 6, 0], ['breakfast', 'breakfast', 'cereal', 7, 0], ['school', 'classroom', 'backpack', 8, 0], ['apple', 'breakfast', 'apple', 10, 0],
      ['playground', 'activities', 'playground', 15, 0], ['bike', 'activities', 'biking', 16, 0], ['dinner', 'around-the-house', 'pot', 18, 0], ['story', 'activities', 'reading', 19, 0], ['bed', 'furniture', 'bed', 20, 0]],
    '2': [['breakfast', 'breakfast', 'croissant', 6, 30], ['brushAm', 'around-the-house', 'toothbrush', 7, 30], ['school', 'classroom', 'backpack', 8, 30], ['apple', 'breakfast', 'apple', 10, 30],
      ['riddleAm', null, null, 0, 30], ['riddlePm', null, null, 12, 30], ['piano', 'activities', 'piano', 16, 30], ['campfire', 'camping', 'campfire', 19, 30], ['brushPm', 'around-the-house', 'toothbrush', 20, 30]]
  };
  /* the evening comes an hour later in Mexico and Italy (dinner 7, story 8, bed 9 — the native reviewer's times): the lap never changes, only the printed hour */
  var LATE = { dinner: 19, story: 20, bed: 21 };
  var OVERRIDE = { es: LATE, it: LATE };
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

  function levelOf(v) { return String(v) === '2' ? '2' : '1'; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function step(level) { return levelOf(level) === '2' ? 30 : 60; }
  /* the day ends at the second midnight's stop pin: the last stop is one step before it */
  function maxMinutes(level) { return 1440 - step(level); }
  function rounds(level, loc) {
    level = levelOf(level); var ov = OVERRIDE[locOf(loc)] || {};
    return TABLE[level].map(function (x, i) {
      var h = x[0] in ov ? ov[x[0]] : x[3], ans = h * 60 + x[4];
      return { k: i, level: level, key: x[0], pic: x[1] ? [x[1], x[2]] : null, h24: h, m: x[4], answer: ans, lap: ans < 720 ? 'am' : 'pm' };
    });
  }
  function lapOf(min) { return ((min % 1440) + 1440) % 1440 < 720 ? 'am' : 'pm'; }
  /* the 12-hour face time: what the hands show (the same twice a day) */
  function face(min) { var h = Math.floor(min / 60) % 12; return { h: h === 0 ? 12 : h, m: min % 60 }; }
  function sameFace(a, b) { var x = face(a), y = face(b); return x.h === y.h && x.m === y.m; }
  /* the angles: the hour hand turns once in 12 h, the minute hand once an hour, the wheel once a day */
  function hourAngle(min) { return (min % 720) / 720 * 360; }
  function minuteAngle(min) { return (min % 60) / 60 * 360; }
  function wheelAngle(min) { return min / 1440 * 360; }

  /* the printed time, 12-hour, in the locale's own form */
  function fmt(loc, min) {
    var f = face(min), l = locOf(loc), mm = f.m < 10 ? '0' + f.m : String(f.m);
    if (l === 'fr') return f.h + ' h' + (f.m ? ' ' + mm : '');
    return f.h + (['nl', 'sv', 'da', 'no', 'fi'].indexOf(l) >= 0 ? '.' : ':') + mm;
  }
  /* the day-part word for the CURRENT hour — true at night too; en/es/fi have two-lap words */
  var PARTS = {
    en: [[0, 'a.m.'], [12, 'p.m.']],
    es: [[0, 'a. m.'], [12, 'p. m.']],
    fi: [[0, 'ap.'], [12, 'ip.']],
    de: [[0, 'nachts'], [5, 'morgens'], [10, 'vormittags'], [12, 'mittags'], [14, 'nachmittags'], [18, 'abends']],
    fr: [[0, 'du matin'], [12, 'de l’après-midi'], [18, 'du soir']],
    it: [[0, 'di notte'], [5, 'di mattina'], [12, 'del pomeriggio'], [18, 'di sera']],
    pt: [[0, 'da madrugada'], [5, 'da manhã'], [12, 'da tarde'], [18, 'da noite']],
    nl: [[0, '’s nachts'], [6, '’s ochtends'], [12, '’s middags'], [18, '’s avonds']],
    sv: [[0, 'på natten'], [5, 'på morgonen'], [10, 'på förmiddagen'], [12, 'mitt på dagen'], [13, 'på eftermiddagen'], [18, 'på kvällen']],
    da: [[0, 'om natten'], [5, 'om morgenen'], [10, 'om formiddagen'], [12, 'midt på dagen'], [13, 'om eftermiddagen'], [18, 'om aftenen']],
    no: [[0, 'om natta'], [5, 'om morgenen'], [10, 'på formiddagen'], [12, 'midt på dagen'], [13, 'på ettermiddagen'], [18, 'om kvelden']]
  };
  /* half past midnight and half past noon are said, not printed, in most languages: "minuit et demi", "halb eins nachts" */
  var HALF12 = {
    fr: { 30: 'minuit et demi', 750: 'midi et demi' }, it: { 30: 'mezzanotte e mezza', 750: 'mezzogiorno e mezza' }, pt: { 30: 'meia-noite e meia', 750: 'meio-dia e meia' },
    de: { 30: 'halb eins nachts', 750: 'halb eins mittags' }, nl: { 30: 'half een ’s nachts', 750: 'half een ’s middags' },
    sv: { 30: 'halv ett på natten', 750: 'halv ett mitt på dagen' }, da: { 30: 'halv et om natten', 750: 'halv et midt på dagen' }, no: { 30: 'halv ett om natta', 750: 'halv ett midt på dagen' }
  };
  /* a time as the locale says it with its part of the day (the label-mode card, the success line) */
  function spoken(loc, min) { var l = locOf(loc), h = HALF12[l]; if (h && h[min]) return h[min]; return fmt(l, min) + ' ' + part(l, min); }
  function part(loc, min) { var t = PARTS[locOf(loc)], h = Math.floor((((min % 1440) + 1440) % 1440) / 60), w = t[0][1]; for (var i = 0; i < t.length; i++) if (h >= t[i][0]) w = t[i][1]; return w; }

  function newState(level, k, loc) {
    var pool = rounds(level, loc), r = pool[k] || pool[0];
    return { level: levelOf(level), loc: locOf(loc), k: r.k, round: r, minutes: 0, misses: 0, help: false, verdict: null, done: false };
  }
  /* wind the hands: the stop pins hold the day between the two midnights; the hand snaps to the level's step */
  function snap(level, min) { var s = step(level); return Math.max(0, Math.min(maxMinutes(level), Math.round(min / s) * s)); }
  function wind(st, min) {
    if (st.done) return false;
    var v = snap(st.level, min);
    if (v === st.minutes) return false;
    st.minutes = v; st.verdict = null; return true;
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round;
    if (st.minutes === 0) return { result: 'note', key: 'hintIdle' };
    if (st.minutes === r.answer) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    if (!sameFace(st.minutes, r.answer)) { st.verdict = { kind: 'time', set: st.minutes }; return { result: 'miss', kind: 'time' }; }
    st.verdict = { kind: 'lap', set: st.minutes, dir: r.answer > st.minutes ? 'more' : 'back' };
    return { result: 'miss', kind: 'lap', dir: st.verdict.dir };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    if (v.kind === 'time') return 'hintTime';
    if (!st.help) return 'hintLap';
    return v.dir === 'more' ? 'hintMore' : 'hintBack';
  }
  function storyKey(r) { return 's_' + r.key; }
  function okKey(r) { return 'ok_' + r.key; }

  function passSize(level) { return TABLE[levelOf(level)].length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* never three rounds of one lap in a row */
  function runsOk(level, o) { var R = rounds(level, 'en'); for (var i = 2; i < o.length; i++) if (R[o[i]].lap === R[o[i - 1]].lap && R[o[i]].lap === R[o[i - 2]].lap) return false; return true; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, pass, rnd, prev) {
    var ks = TABLE[levelOf(level)].map(function (x, i) { return i; });
    for (var tries = 0; tries < 800; tries++) { var c = shuffle(ks.slice(), rnd); if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c; }
    return ks.slice();
  }

  var api = { LOCALES: LOCALES, levelOf: levelOf, locOf: locOf, step: step, maxMinutes: maxMinutes, rounds: rounds, lapOf: lapOf, face: face, sameFace: sameFace,
    hourAngle: hourAngle, minuteAngle: minuteAngle, wheelAngle: wheelAngle, fmt: fmt, part: part, spoken: spoken, newState: newState, snap: snap, wind: wind, check: check, hint: hint,
    storyKey: storyKey, okKey: okKey, passSize: passSize, runsOk: runsOk, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DayWheelCore = api;
})(typeof window !== 'undefined' ? window : this);
