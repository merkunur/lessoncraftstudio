/* =====================================================================
   hour-ball-core.js — the model of ACTIVITY #162 of the one-by-one
   rebuild: "Sprocket's Clock — Read the Clock to the Quarter-Hour" → THE
   HOUR BALL (2.MD.C.7). Pure, no DOM.
   Design: docs/activities-rebuild/designs/162-clock-digital.md
   ---------------------------------------------------------------------
   Sprocket's clock drops a numbered ball into its cup every time the long
   hand reaches the 12, so the ball in the cup is always the hour that has
   begun: at quarter to four the 4-ball is still waiting at the top of the
   chute and the cup still holds the 3. Four flip-clock cards per round —
   the 2 × 2 of hour {right, its neighbour} × minutes {right, the mirror
   60 − m} — so every wrong card is a named reading error. A card posts its
   hour as a marble over the cup's closed lid and its minutes as a pin in
   the rim; Check opens the lid.
   ===================================================================== */
(function (root) {
  'use strict';
  /* [h, m, the neighbour hour's side: -1 the hour before, +1 the hour after] */
  var TABLE = {
    '1': [[3, 15, -1], [9, 45, 1], [6, 15, 1], [1, 45, -1], [11, 15, -1], [4, 45, 1], [8, 15, 1], [2, 45, -1], [7, 15, -1], [12, 45, 1]],
    '2': [[3, 20, -1], [7, 40, 1], [10, 5, 1], [6, 35, -1], [8, 25, 1], [4, 55, -1], [11, 45, 1], [9, 15, -1], [1, 50, 1], [5, 10, -1]]
  };
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var DOT = ['nl', 'sv', 'da', 'no', 'fi'];
  /* the spoken time, byte-faithful from the native-reviewed tables in learning-clock.js (positions + hour words) — never re-derived */
  /*PHRASES-BEGIN*/var PHRASES = {"en":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":null,"positions":{"0":"{H} o'clock","5":"five past {H}","10":"ten past {H}","15":"quarter past {H}","20":"twenty past {H}","25":"twenty-five past {H}","30":"half past {H}","35":"twenty-five to {N}","40":"twenty to {N}","45":"quarter to {N}","50":"ten to {N}","55":"five to {N}"},"specials":[]},"de":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":null,"positions":{"0":"{H} Uhr","5":"fünf nach {H}","10":"zehn nach {H}","15":"Viertel nach {H}","20":"zwanzig nach {H}","25":"fünf vor halb {N}","30":"halb {N}","35":"fünf nach halb {N}","40":"zwanzig vor {N}","45":"Viertel vor {N}","50":"zehn vor {N}","55":"fünf vor {N}"},"specials":[]},"fr":{"hourWords":["une heure","deux heures","trois heures","quatre heures","cinq heures","six heures","sept heures","huit heures","neuf heures","dix heures","onze heures","midi"],"hourWordsAlt":null,"positions":{"0":"{H}","5":"{H} cinq","10":"{H} dix","15":"{H} et quart","20":"{H} vingt","25":"{H} vingt-cinq","30":"{H} et demie","35":"{N} moins vingt-cinq","40":"{N} moins vingt","45":"{N} moins le quart","50":"{N} moins dix","55":"{N} moins cinq"},"specials":[{"h":12,"m":30,"text":"midi et demi"}]},"it":{"hourWords":["l'una","le due","le tre","le quattro","le cinque","le sei","le sette","le otto","le nove","le dieci","le undici","mezzogiorno"],"hourWordsAlt":null,"positions":{"0":"{H}","5":"{H} e cinque","10":"{H} e dieci","15":"{H} e un quarto","20":"{H} e venti","25":"{H} e venticinque","30":"{H} e mezza","35":"{N} meno venticinque","40":"{N} meno venti","45":"{N} meno un quarto","50":"{N} meno dieci","55":"{N} meno cinque"},"specials":[{"h":12,"m":30,"text":"mezzogiorno e mezzo"}]},"es":{"hourWords":["la una","las dos","las tres","las cuatro","las cinco","las seis","las siete","las ocho","las nueve","las diez","las once","las doce"],"hourWordsAlt":null,"positions":{"0":"{H} en punto","5":"{H} y cinco","10":"{H} y diez","15":"{H} y cuarto","20":"{H} y veinte","25":"{H} y veinticinco","30":"{H} y media","35":"veinticinco para {N}","40":"veinte para {N}","45":"un cuarto para {N}","50":"diez para {N}","55":"cinco para {N}"},"specials":[]},"pt":{"hourWords":["uma","duas","três","quatro","cinco","seis","sete","oito","nove","dez","onze","meio-dia"],"hourWordsAlt":["a uma","as duas","as três","as quatro","as cinco","as seis","as sete","as oito","as nove","as dez","as onze","o meio-dia"],"positions":{"0":"{H} horas","5":"{H} e cinco","10":"{H} e dez","15":"{H} e quinze","20":"{H} e vinte","25":"{H} e vinte e cinco","30":"{H} e meia","35":"vinte e cinco para {N2}","40":"vinte para {N2}","45":"quinze para {N2}","50":"dez para {N2}","55":"cinco para {N2}"},"specials":[{"h":1,"m":0,"text":"uma hora"},{"h":12,"m":0,"text":"meio-dia"}]},"nl":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["een","twee","drie","vier","vijf","zes","zeven","acht","negen","tien","elf","twaalf"],"positions":{"0":"{H} uur","5":"vijf over {H}","10":"tien over {H}","15":"kwart over {H}","20":"tien voor half {N}","25":"vijf voor half {N}","30":"half {N}","35":"vijf over half {N}","40":"tien over half {N}","45":"kwart voor {N}","50":"tien voor {N}","55":"vijf voor {N}"},"specials":[]},"sv":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":null,"positions":{"0":"{H}","5":"fem över {H}","10":"tio över {H}","15":"kvart över {H}","20":"tjugo över {H}","25":"fem i halv {N}","30":"halv {N}","35":"fem över halv {N}","40":"tjugo i {N}","45":"kvart i {N}","50":"tio i {N}","55":"fem i {N}"},"specials":[]},"da":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["et","to","tre","fire","fem","seks","syv","otte","ni","ti","elleve","tolv"],"positions":{"0":"klokken {H}","5":"fem over {H}","10":"ti minutter over {H}","15":"kvart over {H}","20":"ti i halv {N2}","25":"fem i halv {N}","30":"halv {N}","35":"fem over halv {N}","40":"ti over halv {N2}","45":"kvart i {N}","50":"ti i {N}","55":"fem i {N}"},"specials":[]},"no":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["ett","to","tre","fire","fem","seks","sju","åtte","ni","ti","elleve","tolv"],"positions":{"0":"klokka {H}","5":"fem over {H}","10":"ti over {H}","15":"kvart over {H}","20":"ti på halv {N}","25":"fem på halv {N}","30":"halv {N}","35":"fem over halv {N}","40":"ti over halv {N}","45":"kvart på {N}","50":"ti på {N}","55":"fem på {N}"},"specials":[]},"fi":{"hourWords":["1","2","3","4","5","6","7","8","9","10","11","12"],"hourWordsAlt":["yksi","kaksi","kolme","neljä","viisi","kuusi","seitsemän","kahdeksan","yhdeksän","kymmenen","yksitoista","kaksitoista"],"positions":{"0":"kello {H}","5":"viisi yli {H2}","10":"kymmenen yli {H2}","15":"vartti yli {H2}","20":"kymmentä vaille puoli {N2}","25":"viittä vaille puoli {N2}","30":"puoli {N}","35":"viisi yli puoli {N2}","40":"kymmenen yli puoli {N2}","45":"varttia vaille {N2}","50":"kymmentä vaille {N2}","55":"viittä vaille {N2}"},"specials":[],"hourWordsAlt2":["yhtä","kahta","kolmea","neljää","viittä","kuutta","seitsemää","kahdeksaa","yhdeksää","kymmentä","yhtätoista","kahtatoista"]}};/*PHRASES-END*/

  function levelOf(v) { return String(v) === '2' ? '2' : '1'; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function wrap(h) { return ((h - 1) % 12 + 12) % 12 + 1; }
  function fmt(loc, h, m) { var l = locOf(loc), mm = (m < 10 ? '0' : '') + m; if (l === 'fr') return h + ' h ' + mm; return h + (DOT.indexOf(l) >= 0 ? '.' : ':') + mm; }
  function hourAngle(h, m) { return ((h % 12) * 30 + m / 2) % 360; }
  function minuteAngle(m) { return m * 6; }
  /* the locale's own spoken phrase for h:m (m a multiple of 5) */
  function phrase(loc, h, m) {
    var R = PHRASES[locOf(loc)], i, sp;
    for (i = 0; i < (R.specials || []).length; i++) { sp = R.specials[i]; if (sp.h === h && sp.m === m) return sp.text; }
    var tpl = R.positions[m], n = h % 12 + 1, out = tpl;
    if (R.hourWordsAlt2) out = out.split('{N3}').join(R.hourWordsAlt2[n - 1]);
    var alt = R.hourWordsAlt || R.hourWords;
    out = out.split('{N2}').join(alt[n - 1]).split('{H2}').join(alt[h - 1]);
    return out.split('{N}').join(R.hourWords[n - 1]).split('{H}').join(R.hourWords[h - 1]);
  }
  /* the four cards: {h, its neighbour} × {m, 60 − m} — exactly one is the clock */
  function cardsFor(h, m, side) { var H = wrap(h + side), mm = 60 - m; return [{ h: h, m: m }, { h: h, m: mm }, { h: H, m: m }, { h: H, m: mm }]; }
  function rounds(level) {
    level = levelOf(level);
    return TABLE[level].map(function (x, i) { return { k: i, level: level, h: x[0], m: x[1], side: x[2], cards: cardsFor(x[0], x[1], x[2]) }; });
  }
  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0];
    return { level: levelOf(level), k: r.k, round: r, posted: null, misses: 0, help: false, verdict: null, done: false, free: null };
  }
  /* post a card's guess: its hour as a marble over the lid, its minutes as a pin in the rim (nothing is judged yet) */
  function post(st, i) { if (st.done || i < 0 || i > 3 || st.posted === i) return false; st.posted = i; st.verdict = null; return true; }
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.posted === null) return { result: 'note', key: 'hintEmpty' };
    /* Check again with nothing changed: a reminder, never a second miss */
    if (st.verdict) return { result: 'note', key: 'hintChange' };
    var r = st.round, c = r.cards[st.posted], hourOk = c.h === r.h, minOk = c.m === r.m;
    if (hourOk && minOk) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { hourOk: hourOk, minOk: minOk, card: c, hourSide: hourOk ? null : c.h === wrap(r.h + 1) ? 'later' : 'earlier' };
    return { result: 'miss', hourOk: hourOk, minOk: minOk };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    if (st.help) return st.round.level === '1' && st.round.m === 45 ? 'hintHelpTo' : 'hintHelp';
    if (!v.hourOk && !v.minOk) return 'hintBoth';
    if (!v.minOk) return 'hintMinutes';
    return v.hourSide === 'later' ? 'hintLater' : 'hintEarlier';
  }
  /* the numbers a hint needs */
  function hintArgs(st) {
    var r = st.round, v = st.verdict, c = v ? v.card : r.cards[0];
    return { h: r.h, h1: wrap(r.h + 1), g: c.h, n: r.m / 5 || 12, p: c.m / 5 || 12, mm: (r.m < 10 ? '0' : '') + r.m };
  }
  /* the run-on of miss 2: the clock steps forward a quarter (level 1) or five minutes (level 2) at a time to the next 12; the ball drops only at the last step */
  function runOn(r) {
    var step = r.level === '1' ? 15 : 5, out = [], t = r.h * 60 + r.m, end = (r.h + 1) * 60;
    while (t < end) { t += step; out.push({ h: t >= end ? wrap(r.h + 1) : r.h, m: t % 60, cup: t >= end ? wrap(r.h + 1) : r.h }); }
    return out;
  }
  /* free play, once solved: the long hand is dragged round; the ball in the cup is the hour that began at the last 12 */
  function freeAt(st) { return st.free === null ? st.round.h * 60 + st.round.m : st.free; }
  function freeClock(st) { var t = freeAt(st), hh = Math.floor(t / 60); return { h: wrap(hh), m: ((t % 60) + 60) % 60, cup: wrap(hh) }; }
  /* turn the long hand by d minutes (either way); a crossing of the 12 drops a ball (forward) or rolls it back up (backward) */
  function turn(st, d) {
    if (!st.done) return { drops: 0 };
    var a = freeAt(st), b = a + d, drops = Math.floor(b / 60) - Math.floor(a / 60);
    st.free = b; return { drops: drops };
  }
  /* release snaps to the nearest quarter (level 1) or five-minute mark (level 2) */
  function snap(st) { if (!st.done) return; var s = st.level === '1' ? 15 : 5, t = freeAt(st); st.free = Math.round(t / s) * s; }
  /* the ball still in the hopper behind the gate, and the two in the tray of past hours */
  function waiting(h) { return wrap(h + 1); }
  function tray(h) { return [wrap(h - 1), wrap(h - 2)]; }
  /* the success line's parts */
  function okKey(r) { return r.level === '2' ? 'okFive' : r.m === 45 ? 'okTo' : 'okPast'; }
  function okArgs(r, loc) { return { time: fmt(loc, r.h, r.m), phrase: phrase(loc, r.h, r.m), h: r.h, h1: wrap(r.h + 1) }; }

  function passSize(level) { return TABLE[levelOf(level)].length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the cards' screen positions: a fresh shuffle every showing, never the right card in one place three showings running */
  function cardOrder(rnd, lastTwo) {
    for (var tries = 0; tries < 50; tries++) {
      var o = shuffle([0, 1, 2, 3], rnd), at = o.indexOf(0);
      if (!(lastTwo && lastTwo.length === 2 && lastTwo[0] === at && lastTwo[1] === at)) return o;
    }
    return [1, 0, 2, 3];
  }
  /* an order-only reshuffle per pass, never the previous order; never three :45-type (or :15-type) rounds in a row */
  function late(level, k) { return TABLE[levelOf(level)][k][1] > 30; }
  function runsOk(level, o) { for (var i = 2; i < o.length; i++) if (late(level, o[i]) === late(level, o[i - 1]) && late(level, o[i]) === late(level, o[i - 2])) return false; return true; }
  function plan(level, pass, rnd, prev) {
    var ks = TABLE[levelOf(level)].map(function (x, i) { return i; });
    for (var tries = 0; tries < 800; tries++) { var c = shuffle(ks.slice(), rnd); if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c; }
    return ks.slice();
  }

  var api = { LOCALES: LOCALES, levelOf: levelOf, locOf: locOf, wrap: wrap, fmt: fmt, hourAngle: hourAngle, minuteAngle: minuteAngle, phrase: phrase, cardsFor: cardsFor,
    rounds: rounds, newState: newState, post: post, check: check, hint: hint, hintArgs: hintArgs, runOn: runOn, freeClock: freeClock, turn: turn, snap: snap,
    waiting: waiting, tray: tray, okKey: okKey, okArgs: okArgs, passSize: passSize, cardOrder: cardOrder, runsOk: runsOk, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HourBallCore = api;
})(typeof window !== 'undefined' ? window : this);
