/* =====================================================================
   sentence-clinic-core.js — the model of ACTIVITY #176 of the one-by-one
   rebuild: "Dr. Plume's Sentence Clinic" (L.2.1 · L.2.2) → THE LISTENING
   LINE. Pure, no DOM. Design: docs/activities-rebuild/designs/176-sentence-clinic.md
   Patients: sentence-clinic-data.js (window.SentenceClinicData).
   ---------------------------------------------------------------------
   A patient is a card of words. Level 1 (Which mark?): three sentences,
   each needing its end mark. Level 2 (Where does it end?): two sentences
   run together — the stop goes in the seam and at the end. Level 3 (Does
   it sound right?): one trouble — a verb form, a missing word, a word too
   many, a muddled order, or a missing "!".
   The Listening Line is listen(): one event per gap/word — a mark that
   matches the sentence's tune RESTS (.), HOLDS OPEN (?) or SPIKES (!); a
   mark that fights the tune KINKS; no mark at the end RUNS OFF; two
   thoughts with no stop between them KNOT; a stop inside a thought SAGS;
   a missing word leaves a FLAT gap, an extra word a DOUBLE beat, a word
   out of place a BACKWARD beat, a wrong form an OFF-KEY beat.
   Capitals are never a task (row 182 owns them): after a stop the next
   word's capital rises by itself. es: a sentence ending in ? / ! opens
   with ¿ / ¡ by itself. fr: a narrow no-break space before ? and !.
   The cured text is DERIVED from the units and their tunes, never stored.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var LEVELS = ['one', 'two', 'three'];
  var MARK = { T: '.', A: '?', E: '!' };
  var NNBSP = ' ';

  function data() { return (root && root.SentenceClinicData) || null; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : 'two'; }
  function pool(loc, level, D) { D = D || data(); var L = D[locOf(loc)]; level = levelOf(level); return level === 'one' ? L.L1 : level === 'two' ? L.L2 : L.L3; }
  function cap(s, loc) { return s ? s.charAt(0).toLocaleUpperCase(loc) + s.slice(1) : s; }
  function tuneOfMark(m) { for (var k in MARK) if (MARK[k] === m) return k; return null; }

  function range(n) { var o = []; for (var i = 0; i < n; i++) o.push(i); return o; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* order-only reshuffle per pass, never the previous order */
  function plan(n, rnd, prev) {
    rnd = rnd || Math.random;
    for (var t = 0; t < 200; t++) { var c = shuffle(range(n), rnd); if (!prev || prev.join() !== c.join()) return c; }
    return prev ? prev.slice(1).concat(prev.slice(0, 1)) : range(n);
  }

  /* ---------------- a patient in play ---------------- */
  function newState(loc, level, k, D) {
    level = levelOf(level); loc = locOf(loc);
    var P = pool(loc, level, D), r = P[((k % P.length) + P.length) % P.length];
    var st = { loc: loc, level: level, k: k, round: r, misses: 0, help: false, done: false, shown: null };
    if (level === 'three') {
      st.words = r.words.map(function (w, i) { return { w: w, id: i }; });
      st.mark = r.mark0 || null; st.lifted = [];
    } else { st.marks = {}; st.cuts = {}; }
    return st;
  }
  /* the gaps a mark may go into: Level 1 the sentence ends; Level 2 every gap */
  function targets(st) {
    var r = st.round;
    if (st.level === 'one') return r.units.map(function (u) { return u.to; });
    if (st.level === 'two') return range(r.tokens.length);
    return [];
  }
  function canMark(st, m) { return st.level === 'three' || m === '.' || m === '?'; }
  /* a mark into a gap; the same mark again takes it away */
  function setMark(st, g, m) {
    if (st.done) return false;
    if (st.level === 'three') { if (g !== 'end') return false; st.mark = st.mark === m ? null : m; st.shown = null; return true; }
    if (targets(st).indexOf(g) < 0 || !canMark(st, m)) return false;
    if (st.marks[g] === m) delete st.marks[g]; else { st.marks[g] = m; delete st.cuts[g]; }
    st.shown = null; return true;
  }
  /* scissors (Level 2): a pause with no mark yet; cutting again closes it */
  function cut(st, g) {
    if (st.done || st.level !== 'two' || targets(st).indexOf(g) < 0 || g === st.round.tokens.length - 1) return false;
    if (st.cuts[g]) delete st.cuts[g]; else { st.cuts[g] = true; delete st.marks[g]; }
    st.shown = null; return true;
  }
  /* ---- Level 3 tools ---- */
  function wheelAt(st) { var r = st.round; if (r.kind !== 'form') return -1; for (var i = 0; i < st.words.length; i++) if (st.words[i].id === r.at) return i; return -1; }
  function setForm(st, word) { var i = wheelAt(st); if (st.done || i < 0 || st.round.options.indexOf(word) < 0) return false; st.words[i] = { w: word, id: st.words[i].id }; st.shown = null; return true; }
  function insertAt(st, g, word) {
    if (st.done || st.round.kind !== 'ins' || st.round.options.indexOf(word) < 0 || g < -1 || g >= st.words.length) return false;
    for (var i = 0; i < st.words.length; i++) if (st.words[i].ins) st.words.splice(i, 1);
    st.words.splice(g + 1, 0, { w: word, id: 'ins', ins: true }); st.shown = null; return true;
  }
  function lift(st, i) { if (st.done || !st.words[i] || st.words.length < 2) return false; var w = st.words.splice(i, 1)[0]; if (!w.ins) st.lifted.push({ w: w.w, id: w.id, at: i }); st.shown = null; return true; }
  function unlift(st, j) { var x = st.lifted[j]; if (st.done || !x) return false; st.lifted.splice(j, 1); st.words.splice(Math.min(x.at, st.words.length), 0, { w: x.w, id: x.id }); st.shown = null; return true; }
  function swap(st, i, j) { if (st.done || i === j || !st.words[i] || !st.words[j]) return false; var t = st.words[i]; st.words[i] = st.words[j]; st.words[j] = t; st.shown = null; return true; }
  function touched(st) {
    if (st.level !== 'three') return Object.keys(st.marks).length + Object.keys(st.cuts).length > 0;
    return st.words.map(function (w) { return w.w; }).join(' ') !== st.round.words.join(' ') || st.mark !== (st.round.mark0 || null) || st.lifted.length > 0;
  }

  /* ---------------- the text, as it reads ---------------- */
  /* sentences as the child has marked them: each segment ends at a placed mark (or the end) */
  function render(st) {
    var loc = st.loc;
    if (st.level === 'three') return join(loc, [{ words: st.words.map(function (w) { return w.w; }), mark: st.mark }]);
    var r = st.round, segs = [], cur = [];
    r.tokens.forEach(function (t, i) {
      var start = i === 0 || st.marks[i - 1];
      cur.push(start ? cap(t, loc) : t);
      if (st.marks[i] || i === r.tokens.length - 1) { segs.push({ words: cur, mark: st.marks[i] || null }); cur = []; }
    });
    return join(loc, segs);
  }
  function join(loc, segs) {
    return segs.map(function (s) {
      var w = s.words.slice();
      if (loc === 'es' && (s.mark === '?' || s.mark === '!')) w[0] = (s.mark === '?' ? '¿' : '¡') + w[0];
      var t = w.join(' ');
      if (s.mark) t += (loc === 'fr' && (s.mark === '?' || s.mark === '!') ? NNBSP : '') + s.mark;
      return t;
    }).join(' ');
  }
  /* the cured text, derived from the units and their tunes */
  function cured(loc, level, r) {
    loc = locOf(loc);
    if (levelOf(level) === 'three') return join(loc, [{ words: r.cured, mark: r.mark }]);
    return join(loc, r.units.map(function (u) { var w = r.tokens.slice(u.from, u.to + 1); w[0] = cap(w[0], loc); return { words: w, mark: MARK[u.tune] }; }));
  }

  /* ---------------- the Listening Line ---------------- */
  var TROUBLE = { kink: 1, runoff: 1, knot: 1, sag: 1, flatgap: 1, doublebeat: 1, backbeat: 1, offkey: 1 };
  function endEvent(want, m, at, last) {
    if (!m) return { type: last ? 'runoff' : 'knot', at: at, want: want };
    if (m === want) return { type: m === '.' ? 'rest' : m === '?' ? 'hook' : 'spike', at: at };
    return { type: 'kink', at: at, want: want, got: m };
  }
  function listen(st) {
    var r = st.round, ev = [], n;
    if (st.level !== 'three') {
      n = r.tokens.length;
      var endOf = {}; r.units.forEach(function (u) { endOf[u.to] = MARK[u.tune]; });
      for (var g = 0; g < n; g++) {
        var m = st.marks[g] || null;
        if (endOf[g]) {
          if (!m && st.cuts[g]) ev.push({ type: 'runoff', at: g, want: endOf[g], cut: true });
          else ev.push(endEvent(endOf[g], m, g, g === n - 1));
        } else if (m || st.cuts[g]) ev.push({ type: 'sag', at: g });
      }
      return ev;
    }
    /* Level 3: compare the words with the cured words */
    var w = st.words.map(function (x) { return x.w; }), c = r.cured, i;
    if (w.length < c.length) { for (i = 0; i < c.length; i++) if (w[i] !== c[i]) break; ev.push({ type: 'flatgap', at: i - 1 }); }
    else if (w.length > c.length) { for (i = 0; i < w.length; i++) if (w[i] !== c[i]) break; ev.push({ type: 'doublebeat', at: i }); }
    else for (i = 0; i < w.length; i++) if (w[i] !== c[i]) ev.push({ type: c.indexOf(w[i]) >= 0 ? 'backbeat' : 'offkey', at: i });
    ev.push(endEvent(r.mark, st.mark, 'end', true));
    return ev;
  }
  function troubles(ev) { return ev.filter(function (e) { return TROUBLE[e.type]; }); }
  /* the tool that mends a trouble (the second miss wiggles it) */
  function toolFor(st, e) {
    if (!e) return null;
    if (e.type === 'kink' || e.type === 'runoff') return e.want;
    if (e.type === 'knot') return st.level === 'two' ? 'cut' : e.want;
    if (e.type === 'sag') return null;
    if (e.type === 'flatgap') return 'ins';
    if (e.type === 'doublebeat') return 'lift';
    if (e.type === 'backbeat') return 'swap';
    if (e.type === 'offkey') return st.round.kind === 'form' ? 'wheel' : 'lift';
    return null;
  }
  /* the first trouble, ends before sags (a sag next to a knot is the knot's doing) */
  function first(st, ev) { var t = troubles(ev); var hard = t.filter(function (e) { return e.type !== 'sag'; }); return hard[0] || t[0] || null; }

  /* Check = the listen */
  function check(st) {
    if (st.done) return { result: 'no' };
    if (!touched(st)) return { result: 'empty' };
    var ev = listen(st); st.shown = ev;
    if (!troubles(ev).length) { st.done = true; return { result: 'ok', events: ev }; }
    st.misses++; st.help = st.misses >= 2;
    return { result: 'miss', events: ev, first: first(st, ev) };
  }
  function isCured(st) { return render(st) === cured(st.loc, st.level, st.round); }

  var api = { LOCALES: LOCALES, LEVELS: LEVELS, MARK: MARK, NNBSP: NNBSP, locOf: locOf, levelOf: levelOf, pool: pool, plan: plan, cap: cap, tuneOfMark: tuneOfMark,
    newState: newState, targets: targets, canMark: canMark, setMark: setMark, cut: cut, wheelAt: wheelAt, setForm: setForm, insertAt: insertAt, lift: lift, unlift: unlift, swap: swap, touched: touched,
    render: render, cured: cured, listen: listen, troubles: troubles, toolFor: toolFor, first: first, check: check, isCured: isCured };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SentenceClinicCore = api;
})(typeof window !== 'undefined' ? window : this);
