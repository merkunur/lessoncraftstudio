/* =====================================================================
   harbor-machines-core.js — the model of ACTIVITY #174 of the one-by-one
   rebuild: "The Harbor Post" (RI.2.6) → THE THREE HARBOR MACHINES.
   Pure, no DOM. Design: docs/activities-rebuild/designs/174-author-purpose.md
   Notes: harbor-machines-data.js (window.HarborMachinesData).
   ---------------------------------------------------------------------
   Every sentence of a note has a role: a FACT (true about the world), a
   bit of STORY (something that happens to a character), a STEP (it tells
   the reader what to do) or NONE (a hook such as a question). Each
   machine runs only on its own kind of sentence — the lighthouse on facts,
   the stage on story, the crane on steps — and it RUNS when more than half
   of the note's sentences are its kind. So a note proves its author's main
   purpose by the machine it powers.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var LEVELS = ['first', 'mostly'];
  var MACHINES = ['inform', 'entertain', 'instruct'];
  var ROLE_OF = { inform: 'fact', entertain: 'story', instruct: 'step' };
  /* Level 1 "First look": six kept notes + six new two-sentence notes that break the kept notes' surface cues.
     Level 2 "Mostly …": three kept notes + nine new notes whose main purpose is clear while one sentence may differ. */
  var IDS = {
    first: ['i1', 'i2', 'i7', 'i8', 'e1', 'e2', 'e7', 'e8', 's2', 's3', 's7', 's8'],
    mostly: ['i3', 'i4', 'i5', 'i6', 'e3', 'e4', 'e5', 'e6', 's1', 's4', 's5', 's6']
  };

  function data() { return (root && root.HarborMachinesData) || null; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(String(v)) >= 0 ? String(v) : 'first'; }
  function machinesOf(v) { return String(v) === 'two' ? 'two' : 'three'; }
  function machineList(m) { return machinesOf(m) === 'two' ? MACHINES.slice(0, 2) : MACHINES.slice(); }

  /* the notes of a level: { id, p, s:[{t, r}], w }; "two" machines keeps the facts and story notes only */
  function rounds(loc, level, machines, D) {
    D = D || data(); loc = locOf(loc); level = levelOf(level);
    var L = D[loc], list = machineList(machines);
    return IDS[level].map(function (id) { var n = L.notes[id]; return { id: id, p: n.p, s: n.s, w: n.w }; })
      .filter(function (n) { return list.indexOf(n.p) >= 0; });
  }
  function passSize(level, machines) { return machinesOf(machines) === 'two' ? 8 : 12; }

  /* a machine reads the note sentence by sentence: its own kind powers a part, any other kind fizzes */
  function read(note, machine) {
    var role = ROLE_OF[machine], powered = [], fizz = [];
    note.s.forEach(function (x, i) { (x.r === role ? powered : fizz).push(i); });
    return { machine: machine, powered: powered, fizz: fizz, n: note.s.length, runs: powered.length * 2 > note.s.length };
  }
  function mainMachine(note) {
    var ok = MACHINES.filter(function (m) { return read(note, m).runs; });
    return ok.length === 1 ? ok[0] : null;
  }
  /* the machine a sentence WOULD power (null for a hook) — the coloured dots of a miss */
  function dotOf(x) { for (var m in ROLE_OF) if (ROLE_OF[m] === x.r) return m; return null; }
  /* the parts a machine shows lit: one per powered sentence (at most 3); a machine that runs lights all three */
  function partsLit(rd) { return rd.runs ? 3 : Math.min(3, rd.powered.length); }
  /* a note with one sentence of another kind: { kind: its main purpose, pos: 'first' | 'last' } */
  function mostly(note) {
    var main = mainMachine(note); if (!main) return null;
    var odd = []; note.s.forEach(function (x, i) { if (x.r !== ROLE_OF[main]) odd.push(i); });
    if (odd.length !== 1) return null;
    return { kind: main, pos: odd[0] === 0 ? 'first' : odd[0] === note.s.length - 1 ? 'last' : 'middle' };
  }

  function range(n) { var o = []; for (var i = 0; i < n; i++) o.push(i); return o; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function threeInARow(order, pool) {
    for (var i = 2; i < order.length; i++) { var p = pool[order[i]].p; if (pool[order[i - 1]].p === p && pool[order[i - 2]].p === p) return true; }
    return false;
  }
  /* an order-only reshuffle per pass: never the previous order, never three notes of one purpose in a row */
  function plan(pool, rnd, prev) {
    rnd = rnd || Math.random;
    for (var t = 0; t < 500; t++) {
      var c = shuffle(range(pool.length), rnd);
      if (threeInARow(c, pool)) continue;
      if (prev && prev.join() === c.join()) continue;
      return c;
    }
    /* a fixed fallback: purposes interleaved, rotated away from the previous order */
    var by = {}; pool.forEach(function (n, i) { (by[n.p] = by[n.p] || []).push(i); });
    var keys = Object.keys(by), o = [], k = 0;
    while (o.length < pool.length) { var b = by[keys[k % keys.length]]; if (b.length) o.push(b.shift()); k++; }
    if (prev && prev.join() === o.join()) o = o.slice(1).concat(o.slice(0, 1));
    return o;
  }

  /* ---- a round ---- */
  function newState(loc, level, machines, k, D) {
    var pool = rounds(loc, level, machines, D), note = pool[((k % pool.length) + pool.length) % pool.length];
    return { level: levelOf(level), machines: machinesOf(machines), list: machineList(machines), k: k, note: note, posted: null, verdict: null, misses: 0, help: false, done: false };
  }
  /* posting is the Check: the note goes into one machine, which reads it */
  function post(st, machine) {
    if (st.done) return { result: 'no' };
    if (st.list.indexOf(machine) < 0) return { result: 'note', key: 'hintEmpty' };
    var rd = read(st.note, machine);
    st.posted = machine; st.verdict = rd;
    if (rd.runs) { st.done = true; return { result: 'ok', read: rd }; }
    st.misses++; st.help = st.misses >= 2;
    return { result: 'miss', read: rd };
  }
  function hint(st, res) { if (!res || res.result !== 'miss') return null; return st.help ? 'hintMiss2' : 'hintMiss1'; }

  var api = { LOCALES: LOCALES, LEVELS: LEVELS, MACHINES: MACHINES, ROLE_OF: ROLE_OF, IDS: IDS, locOf: locOf, levelOf: levelOf, machinesOf: machinesOf, machineList: machineList,
    rounds: rounds, passSize: passSize, read: read, mainMachine: mainMachine, dotOf: dotOf, partsLit: partsLit, mostly: mostly, threeInARow: threeInARow, plan: plan,
    newState: newState, post: post, hint: hint };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HarborMachinesCore = api;
})(typeof window !== 'undefined' ? window : this);
