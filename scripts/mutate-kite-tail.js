#!/usr/bin/env node
/* =====================================================================
   mutate-kite-tail.js — does verify-kite-tail-core.js BITE?
   Run: node scripts/mutate-kite-tail.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'kite-tail-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-kite-tail-core.js');
const MUTATIONS = [
  /* the design's list */
  ['steady with an extra blank bow',                "      if (st.bows === n) return win(st);", "      if (st.bows >= n) return win(st);"],
  ['steady with two beats on one bow',              "      if (st.bows === n) return win(st);", "      if (st.bows >= n - 1) return win(st);"],
  ['the short case spreads beats over all bows',    "if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1);", "if (k > 0 && k < syl.length) out[0] = syl.slice(0, syl.length - k + 1);"],
  ['the tail starts at the word\'s count',          "if (r.level === 'count') { st.bows = 1; }", "if (r.level === 'count') { st.bows = n; }"],
  ['two-beat box always in word order',             "if (n === 2) out = (r.k + (pass || 0)) % 2 ? [1, 0] : [0, 1];", "if (n === 2) out = [0, 1];"],
  ['any order steady (tangle ignores order)',       "var right = st.knots.map(function (x, i) { return !!x && sOf(x) === i; });", "var right = st.knots.map(function (x) { return !!x; });"],
  ['the foreign bow accepted',                      "      if (foreign.length) {\n", "      if (false) {\n"],
  ['the bare knot always last',                     "{ k: 'mitten', t: 'a', bare: 0,", "{ k: 'mitten', t: 'a', bare: 1,"],
  ['a scramble start leaves a bow in place',        "{ k: 'umbrella', t: 'b', start: [2, 0, 1] }", "{ k: 'umbrella', t: 'b', start: [0, 2, 1] }"],
  ['the fence accepts any kite',                    "if (bows === n) { st.done = true;", "if (bows) { st.done = true;"],
  ['the tassel check ignores extra tassels',        "if (per.every(function (p) { return !p.missing && !p.extra; })) return win(st);", "if (per.every(function (p) { return !p.missing; })) return win(st);"],
  ['r-controlled counted as two sounds',            "tractor: [['t', 'r', 'a', 'c'], ['t', 'or']]", "tractor: [['t', 'r', 'a', 'c'], ['t', 'o', 'r']]"],
  ['write accepts any split of the word',           "var ok = st.typed.every(function (t, i) { return t === r.w.syl[i]; });", "var ok = st.typed.join('') === r.w.word;"],
  ['a non-TeX split shown (star-fish)',             "fish|animals/fish|fish;", "fish|animals/fish|fi-sh;"],
  ['the kite picture used as a word',               ";balloon|toys/balloon|bal-loon", ";balloon|toys/kite|bal-loon"],
  ['the reshuffle may repeat an order',             "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  /* the deal, the ladder */
  ['three beats may lie reversed',                  "rev = idx.slice().reverse();", "rev = idx.slice();"],
  ['the answer\'s box slot never moves',            "at = (r.k + (pass || 0)) % r.box.length;", "at = 0;"],
  ['a same-word bow is accepted in the gap',        "if (r.level === 'fix' && bow(st, st.knots[r.bare]).s === -2) {", "if (false) {"],
  ['miss 2 does not fly the bow home',              "if (st.help >= 2) { var at = inPlace.indexOf(false),", "if (false) { var at = inPlace.indexOf(false),"],
  ['the soccer ball back on the fence',             "var FENCE = ['bus', 'frog',", "var FENCE = ['drum', 'frog',"],
  ['a doubled consonant counted twice (ot|t-er)',  "monkey: [['m', 'o', 'n'], ['k', 'ey']] };", "monkey: [['m', 'o', 'n'], ['k', 'ey']], otter: [['o', 't'], ['t', 'er']] };"],
  ['basketball back on the fence',                "'pizza', 'butterfly', 'dragonfly', 'strawberry'];\n", "'pizza', 'basketball', 'dragonfly', 'strawberry'];\n"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kt-mut-'));
  fs.writeFileSync(path.join(dir, 'kite-tail-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { KT_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-kite-tail: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
