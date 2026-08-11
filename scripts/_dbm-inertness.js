/* Is a surviving mutation a GATE HOLE or an INERT GUARD?
   ------------------------------------------------------
   ⭐ The house rule is that an inert mutation is a BAD MUTATION, not a
   gate hole — but that must be PROVEN, never asserted. This walks every
   reachable state under the original tool and asks each mutated mutator
   for its answer, comparing against the original's. If they agree on
   every reachable state, the guard cannot be observed by any test,
   because there is nothing to observe.

   ⚠ It walks the ORIGINAL tool's reachable states. A mutation that
   ADDS reachable states would escape that, so it also walks the MUTATED
   tool's own frontier and fails if the two state sets differ.

   Run: node scripts/_dbm-inertness.js
*/
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const SRC = path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js');

/* ⚠ the tool is a CommonJS module — a bare vm context gives it no
   `module`, so it exports nothing and every mutant reads as identical
   to every other. A loader that silently yields null would have
   reported all four guards INERT for the wrong reason. */
function load(src) {
  const mod = { exports: {} };
  const ctx = { module: mod, exports: mod.exports, window: {}, console, require };
  ctx.window.LCS = { register: function () {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  const T = mod.exports;
  if (!T || typeof T.newState !== 'function') throw new Error('loader produced no tool');
  return T;
}

const base = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* the four survivors, each a defensive guard */
const GUARDS = [
  ['close: an empty tray shuts', 'if (s.near < 1) return null;', ''],
  ['close: a shut tray shuts again', 'if (s.shut) return null;\n      if (s.near < 1)', 'if (s.near < 1)'],
  ['open: an unshut tray opens', 'if (!s.shut) return null;', ''],
  ['claim: a third numeral latches', 'if (s.claim.length >= 2) return null;', '']
];

const T0 = load(base);
const key = s => [s.cap, s.inTray, s.near, s.far, s.odd, s.shut, s.claim.join('.')].join('|');

function states(T) {
  const out = [];
  [['ten', 5], ['twenty', 9]].forEach(([reach]) => {
    const seen = {}, q = [T.newState(reach, 'on')];
    let n = 0;
    while (q.length && ++n < 20000) {
      const s = q.shift();
      if (seen[key(s)]) continue;
      seen[key(s)] = 1; out.push(s);
      [T.place(s, -1), T.place(s, 1), T.close(s), T.open(s), T.give(s), T.fetch(s)]
        .forEach(x => { if (x) q.push(x); });
      for (let v = 1; v <= s.cap * 2; v++) { const x = T.claimNum(s, v); if (x) q.push(x); }
    }
  });
  return out;
}

const S0 = states(T0);
const set0 = new Set(S0.map(key));
console.log('reachable states under the unmutated tool: ' + S0.length);

let holes = 0;
GUARDS.forEach(function ([label, from, to]) {
  if (base.split(from).length - 1 !== 1) {
    console.log('  ! NEEDLE not unique — cannot judge: ' + label); holes++; return;
  }
  const T1 = load(base.replace(from, to));

  /* (a) does any mutator DISAGREE on a state reachable in the original? */
  let diff = 0;
  S0.forEach(function (s) {
    const pairs = [
      [T0.place(s, -1), T1.place(s, -1)], [T0.place(s, 1), T1.place(s, 1)],
      [T0.close(s), T1.close(s)], [T0.open(s), T1.open(s)],
      [T0.give(s), T1.give(s)], [T0.fetch(s), T1.fetch(s)]
    ];
    for (let v = 1; v <= s.cap * 2; v++) pairs.push([T0.claimNum(s, v), T1.claimNum(s, v)]);
    pairs.forEach(([a, b]) => {
      if ((a === null) !== (b === null)) diff++;
      else if (a && b && key(a) !== key(b)) diff++;
    });
  });

  /* (b) does the mutant reach a state the original cannot? */
  const extra = states(T1).map(key).filter(k => !set0.has(k));

  if (diff === 0 && extra.length === 0) {
    console.log('  INERT  ' + label + '  (identical over all ' + S0.length + ' states; 0 new states)');
  } else {
    console.log('  ⚠ GATE HOLE  ' + label + '  (' + diff + ' disagreements, ' + extra.length + ' new states)');
    holes++;
  }
});

process.exit(holes ? 1 : 0);
