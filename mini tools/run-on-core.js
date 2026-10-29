/* =====================================================================
   run-on-core.js — the model of ACTIVITY #163 of the one-by-one rebuild:
   "Tell Time to the Nearest 5 Minutes — Set the Clock" → THE RUN-ON TEST
   (2.MD.C.7). Pure, no DOM.
   Design: docs/activities-rebuild/designs/163-clock.md
   ---------------------------------------------------------------------
   The child sets both hands of a clock, loose (each moves alone). Check
   gears them together and runs the clock on to the next o'clock: a clock
   set right arrives square — the short hand on its number — and the bell
   strikes; a short hand put in the wrong place arrives crooked, between
   two numbers. The readout (shown only at Check) reads the minutes off the
   long hand and the hour off the last number the short hand has passed.
   ===================================================================== */
(function (root) {
  'use strict';
  var T = function (h, m) { return [h, m]; };
  var TABLE = {
    oh: [T(4, 0), T(9, 30), T(12, 0), T(6, 30), T(2, 0), T(11, 30), T(7, 0), T(1, 30)],
    q: [T(5, 15), T(10, 45), T(2, 15), T(8, 45), T(11, 15), T(3, 45), T(6, 15), T(12, 45)],
    five: [T(3, 15), T(7, 45), T(6, 10), T(9, 20), T(4, 40), T(1, 50), T(10, 5), T(12, 25), T(2, 35), T(11, 55)],
    mixed: [T(8, 0), T(5, 30), T(3, 45), T(10, 15), T(6, 25), T(1, 40), T(12, 5), T(9, 50), T(4, 35), T(7, 10)]
  };
  var LEVELS = ['oh', 'q', 'five', 'mixed'];
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var DOT = ['nl', 'sv', 'da', 'no', 'fi'];
  /* the spoken time, byte-faithful from the native-reviewed tables in learning-clock.js (positions + hour words) — never re-derived */
  /*PHRASES-BEGIN*/var PHRASES = {"en":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":null,"positions":{"0":"{H} o'clock","5":"five past {H}","10":"ten past {H}","15":"quarter past {H}","20":"twenty past {H}","25":"twenty-five past {H}","30":"half past {H}","35":"twenty-five to {N}","40":"twenty to {N}","45":"quarter to {N}","50":"ten to {N}","55":"five to {N}"},"specials":[]},"de":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":null,"positions":{"0":"{H} Uhr","5":"fünf nach {H}","10":"zehn nach {H}","15":"Viertel nach {H}","20":"zwanzig nach {H}","25":"fünf vor halb {N}","30":"halb {N}","35":"fünf nach halb {N}","40":"zwanzig vor {N}","45":"Viertel vor {N}","50":"zehn vor {N}","55":"fünf vor {N}"},"specials":[]},"fr":{"hourWords":["une heure","deux heures","trois heures","quatre heures","cinq heures","six heures","sept heures","huit heures","neuf heures","dix heures","onze heures","midi"],"hourWordsAlt":null,"positions":{"0":"{H}","5":"{H} cinq","10":"{H} dix","15":"{H} et quart","20":"{H} vingt","25":"{H} vingt-cinq","30":"{H} et demie","35":"{N} moins vingt-cinq","40":"{N} moins vingt","45":"{N} moins le quart","50":"{N} moins dix","55":"{N} moins cinq"},"specials":[{"h":12,"m":30,"text":"midi et demi"}]},"it":{"hourWords":["l'una","le due","le tre","le quattro","le cinque","le sei","le sette","le otto","le nove","le dieci","le undici","mezzogiorno"],"hourWordsAlt":null,"positions":{"0":"{H}","5":"{H} e cinque","10":"{H} e dieci","15":"{H} e un quarto","20":"{H} e venti","25":"{H} e venticinque","30":"{H} e mezza","35":"{N} meno venticinque","40":"{N} meno venti","45":"{N} meno un quarto","50":"{N} meno dieci","55":"{N} meno cinque"},"specials":[{"h":12,"m":30,"text":"mezzogiorno e mezzo"}]},"es":{"hourWords":["la una","las dos","las tres","las cuatro","las cinco","las seis","las siete","las ocho","las nueve","las diez","las once","las doce"],"hourWordsAlt":null,"positions":{"0":"{H} en punto","5":"{H} y cinco","10":"{H} y diez","15":"{H} y cuarto","20":"{H} y veinte","25":"{H} y veinticinco","30":"{H} y media","35":"veinticinco para {N}","40":"veinte para {N}","45":"un cuarto para {N}","50":"diez para {N}","55":"cinco para {N}"},"specials":[]},"pt":{"hourWords":["uma","duas","três","quatro","cinco","seis","sete","oito","nove","dez","onze","meio-dia"],"hourWordsAlt":["a uma","as duas","as três","as quatro","as cinco","as seis","as sete","as oito","as nove","as dez","as onze","o meio-dia"],"positions":{"0":"{H} horas","5":"{H} e cinco","10":"{H} e dez","15":"{H} e quinze","20":"{H} e vinte","25":"{H} e vinte e cinco","30":"{H} e meia","35":"vinte e cinco para {N2}","40":"vinte para {N2}","45":"quinze para {N2}","50":"dez para {N2}","55":"cinco para {N2}"},"specials":[{"h":1,"m":0,"text":"uma hora"},{"h":12,"m":0,"text":"meio-dia"}]},"nl":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["een","twee","drie","vier","vijf","zes","zeven","acht","negen","tien","elf","twaalf"],"positions":{"0":"{H} uur","5":"vijf over {H}","10":"tien over {H}","15":"kwart over {H}","20":"tien voor half {N}","25":"vijf voor half {N}","30":"half {N}","35":"vijf over half {N}","40":"tien over half {N}","45":"kwart voor {N}","50":"tien voor {N}","55":"vijf voor {N}"},"specials":[]},"sv":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":null,"positions":{"0":"{H}","5":"fem över {H}","10":"tio över {H}","15":"kvart över {H}","20":"tjugo över {H}","25":"fem i halv {N}","30":"halv {N}","35":"fem över halv {N}","40":"tjugo i {N}","45":"kvart i {N}","50":"tio i {N}","55":"fem i {N}"},"specials":[]},"da":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["et","to","tre","fire","fem","seks","syv","otte","ni","ti","elleve","tolv"],"positions":{"0":"klokken {H}","5":"fem over {H}","10":"ti minutter over {H}","15":"kvart over {H}","20":"ti i halv {N2}","25":"fem i halv {N}","30":"halv {N}","35":"fem over halv {N}","40":"ti over halv {N2}","45":"kvart i {N}","50":"ti i {N}","55":"fem i {N}"},"specials":[]},"no":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["ett","to","tre","fire","fem","seks","sju","åtte","ni","ti","elleve","tolv"],"positions":{"0":"klokka {H}","5":"fem over {H}","10":"ti over {H}","15":"kvart over {H}","20":"ti på halv {N}","25":"fem på halv {N}","30":"halv {N}","35":"fem over halv {N}","40":"ti over halv {N}","45":"kvart på {N}","50":"ti på {N}","55":"fem på {N}"},"specials":[]},"fi":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["yksi","kaksi","kolme","neljä","viisi","kuusi","seitsemän","kahdeksan","yhdeksän","kymmenen","yksitoista","kaksitoista"],"positions":{"0":"kello {H}","5":"viisi yli {H2}","10":"kymmenen yli {H2}","15":"vartti yli {H2}","20":"kymmentä vaille puoli {N2}","25":"viittä vaille puoli {N2}","30":"puoli {N}","35":"viisi yli puoli {N2}","40":"kymmenen yli puoli {N2}","45":"varttia vaille {N2}","50":"kymmentä vaille {N2}","55":"viittä vaille {N2}"},"specials":[],"hourWordsAlt2":["yhtä","kahta","kolmea","neljää","viittä","kuutta","seitsemää","kahdeksaa","yhdeksää","kymmentä","yhtätoista","kahtatoista"]}};/*PHRASES-END*/

  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : 'five'; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function wrap(h) { return ((h - 1) % 12 + 12) % 12 + 1; }
  function norm(d) { return ((d % 360) + 360) % 360; }
  function fmt(loc, h, m) { var l = locOf(loc), mm = (m < 10 ? '0' : '') + m; if (l === 'fr') return h + ' h ' + mm; return h + (DOT.indexOf(l) >= 0 ? '.' : ':') + mm; }
  function phrase(loc, h, m) {
    var R = PHRASES[locOf(loc)], i, sp;
    for (i = 0; i < (R.specials || []).length; i++) { sp = R.specials[i]; if (sp.h === h && sp.m === m) return sp.text; }
    var tpl = R.positions[m], n = h % 12 + 1, out = tpl;
    if (R.hourWordsAlt2) out = out.split('{N3}').join(R.hourWordsAlt2[n - 1]);
    var alt = R.hourWordsAlt || R.hourWords;
    out = out.split('{N2}').join(alt[n - 1]).split('{H2}').join(alt[h - 1]);
    return out.split('{N}').join(R.hourWords[n - 1]).split('{H}').join(R.hourWords[h - 1]);
  }
  function rounds(level) { level = levelOf(level); return TABLE[level].map(function (x, i) { return { k: i, level: level, h: x[0], m: x[1] }; }); }
  /* the rest pose is never right: the long hand half a lap from the minutes, the short hand on the hour six hours away (five, if that would lay it on top of the long hand) */
  function restPose(r) { var L = norm((r.m + 30) * 6), S = norm(wrap(r.h + 6) * 30); if (Math.abs(((L - S + 540) % 360) - 180) < 30) S = norm(wrap(r.h + 5) * 30); return { long: L, short: S }; }
  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0], rest = restPose(r);
    return { level: levelOf(level), k: r.k, round: r, long: rest.long, short: rest.short, moved: false, misses: 0, help: false, verdict: null, done: false };
  }
  /* the long hand snaps to the twelve five-minute marks, the short hand to 2.5° steps (five minutes of its travel) */
  function snapLong(d) { return norm(Math.round(norm(d) / 30) * 30); }
  function snapShort(d) { return norm(Math.round(norm(d) / 2.5) * 2.5); }
  function setLong(st, d) { if (st.done) return false; var s = snapLong(d); if (s === st.long) return false; st.long = s; st.moved = true; st.verdict = null; return true; }
  function setShort(st, d) { if (st.done) return false; var s = snapShort(d); if (s === st.short) return false; st.short = s; st.moved = true; st.verdict = null; return true; }
  /* what the hands say: minutes off the long hand; the hour is the last number the short hand has passed (on the hour, the number it is on) */
  function readout(longDeg, shortDeg) {
    var m = Math.round(norm(longDeg) / 6) % 60, a = norm(shortDeg);
    var h = m === 0 ? Math.round(a / 30) % 12 : Math.floor(a / 30 + 1e-9) % 12;
    return { h: h || 12, m: m };
  }
  /* the run-on: gear the hands, run to the next o'clock; the short hand turns 0.5° a minute */
  function runOn(longDeg, shortDeg) {
    var m = Math.round(norm(longDeg) / 6) % 60, steps = m === 0 ? 0 : (60 - m) / 5;
    /* square means: arrived ON the next o'clock of the time the hands show (the number after the one the short hand has passed) — not just on any number */
    var a = norm(shortDeg), goal = m === 0 ? Math.round(a / 30) : Math.floor(a / 30 + 1e-9) + 1;
    var arrive = norm(a + 0.5 * (m === 0 ? 0 : 60 - m)), near = Math.round(arrive / 30), off = Math.abs(((arrive - goal * 30 + 540) % 360) - 180);
    var square = off <= 5;
    return { steps: steps, arrive: arrive, square: square, struck: (near % 12) || 12, between: [Math.floor(arrive / 30) % 12 || 12, (Math.floor(arrive / 30) + 1) % 12 || 12] };
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    if (!st.moved) return { result: 'note', key: 'hintEmpty' };
    /* Check again with nothing changed: a reminder, never a second miss */
    if (st.verdict) return { result: 'note', key: 'hintChange' };
    var r = st.round, rd = readout(st.long, st.short), run = runOn(st.long, st.short);
    var longOk = rd.m === r.m, right = longOk && rd.h === r.h && run.square;
    if (right) { st.done = true; st.verdict = null; return { result: 'ok', readout: rd, run: run }; }
    /* the short hand judged for the TARGET's minutes: has passed h (on h at :00) and sits within one step of 30h + m/2 */
    var target = norm(r.h * 30 + r.m / 2), a = norm(st.short), dd = Math.abs(((a - target + 540) % 360) - 180);
    var shortOk = dd <= 5 && (r.m === 0 || Math.floor(a / 30 + 1e-9) % 12 === r.h % 12);
    st.misses++; st.help = st.misses >= 2;
    var kind = longOk ? 'short' : run.square ? (shortOk ? 'long' : 'real') : shortOk ? 'long' : 'both';
    st.verdict = { kind: kind, readout: rd, run: run, longOk: longOk, shortOk: shortOk };
    return { result: 'miss', kind: kind, readout: rd, run: run };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    var m = st.round.m;
    if (st.help) return m === 0 ? 'helpOn' : m === 5 ? 'helpFive' : m <= 10 ? 'helpJust' : m === 15 ? 'helpQuarter' : m < 30 ? 'helpLess' : m === 30 ? 'helpHalf' : m <= 50 ? 'helpMore' : 'helpNearly';
    if (v.kind === 'real') return 'hintReal';
    if (v.kind === 'long') return m === 0 ? 'hintLongOn' : 'hintLong';
    if (v.kind === 'both') return 'hintBoth';
    return m === 0 ? 'hintShortOn' : 'hintShort';
  }
  function okKey(r) { var m = r.m; return m === 0 ? 'okOn' : m <= 10 ? 'okJust' : m === 15 ? 'okQuarter' : m < 30 ? 'okLess' : m === 30 ? 'okHalf' : m <= 50 ? 'okMore' : 'okNearly'; }
  function args(st, loc) {
    var r = st.round, v = st.verdict, rd = v ? v.readout : { h: r.h, m: r.m };
    return { time: fmt(loc, r.h, r.m), phrase: phrase(loc, r.h, r.m), h: r.h, h1: wrap(r.h + 1), mm: (r.m < 10 ? '0' : '') + r.m, mi: r.m, n: r.m / 5 || 12, readout: fmt(loc, rd.h, rd.m) };
  }
  /* the right pose (the slots of miss 2) */
  function slots(r) { return { long: norm(r.m * 6), short: norm(r.h * 30 + r.m / 2) }; }

  function passSize(level) { return TABLE[levelOf(level)].length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, pass, rnd, prev) {
    var ks = TABLE[levelOf(level)].map(function (x, i) { return i; });
    for (var tries = 0; tries < 200; tries++) { var c = shuffle(ks.slice(), rnd); if (!prev || prev.join() !== c.join()) return c; }
    return ks.slice().reverse();
  }

  var api = { LEVELS: LEVELS, LOCALES: LOCALES, levelOf: levelOf, locOf: locOf, wrap: wrap, fmt: fmt, phrase: phrase, rounds: rounds, restPose: restPose, newState: newState,
    snapLong: snapLong, snapShort: snapShort, setLong: setLong, setShort: setShort, readout: readout, runOn: runOn, check: check, hint: hint, okKey: okKey, args: args,
    slots: slots, passSize: passSize, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RunOnCore = api;
})(typeof window !== 'undefined' ? window : this);
