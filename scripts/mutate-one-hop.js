#!/usr/bin/env node
/* =====================================================================
   mutate-one-hop.js — does verify-one-hop-core.js BITE? Run:
   node scripts/mutate-one-hop.js — every mutation must be KILLED; a needle
   found other than once is a harness FAULT (never skipped); the gate must
   be green on the CLEAN core first; the last needle is a control that must
   SURVIVE. CRLF collapsed before searching.
   (The bed, helpers, keypad and labels as DRAWN are gated by local-test-one-hop.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'one-hop-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-one-hop-core.js');
const MUTATIONS = [
  ['the hop ignores gaps under half a unit', [['for (var i = 0; i < H.length; i++) if (H[i].p === a) { i0 = i; break; }', 'for (var i = 0; i < H.length; i++) if (Math.abs(H[i].p - a) < 4) { i0 = i; break; }'], ["if (H.some(function (h) { return h.p === b; })) return { status: 'seam' };", "if (H.some(function (h) { return Math.abs(h.p - b) < 4; })) return { status: 'seam' };"]]],
  ['an overlap counted as clean', 'for (var j = 0; j < H.length; j++) if (j !== i0', 'for (var j = 0; j < 0; j++) if (j !== i0'],
  ['a helper of another size accepted', "if (h0.w !== U) return { status: 'inside', bad: [i0] };", ''],
  ['a start off the stone accepted', 'if (first && (!H.some', 'if (false && (!H.some'],
  ['a helper behind the stone accepted', '|| H.some(function (h) { return h.p < 0; }))) return', ')) return'],
  ['a helper past the end counted', 'if (H[k].p + H[k].w > E) return', 'if (false) return'],
  ['a row that stops short of the end accepted', "if (H.some(function (h) { return h.p > b; })) return { status: 'gap', at: b };\n    return { status: 'short' };", "if (H.some(function (h) { return h.p > b; })) return { status: 'gap', at: b };\n    return { status: 'end' };"],
  ['Check accepts L + 1', 'if (+st.typed !== target(st))', 'if (+st.typed !== target(st) && +st.typed !== target(st) + 1)'],
  ['the flush click raised to half a unit (hides gaps)', 'bd = 1.0001;', 'bd = 4.0001;'],
  ['judge accepts the first row', 'if (st.track === rightTrack(st))', 'if (st.track === rightTrack(st) || st.track === 0)'],
  ['order accepts longest first', 'return i === 0 || r.objs[st.perm[st.slots[i - 1]]].L <= r.objs[st.perm[x]].L;', 'return true;'],
  ['the big hop stays one unit', "function unit(st) { return st.r.kind === 'big' && st.phase === 0 ? 2 * E8 : E8; }", 'function unit(st) { return E8; }'],
  ['the keypad wakes before the end', "function canType(st) { return st.status === 'end' && !fixed(st); }", "function canType(st) { return !!st.status && !fixed(st); }"],
  ['Check without the hops', "if (st.status !== 'end') { st.last", "if (false) { st.last"],
  ['the second miss never says more', "return { key: st.show >= 2 ? 'hintCount2' : 'hintCount1' };", "return { key: 'hintCount1' };"],
  ['the same order twice', 'if (!bad && !same(o, prev)) return { order: o };', 'if (!bad) return { order: o };'],
  ['three judge rounds in a row', "if (o[i][0] === 'J' && o[i - 1][0] === 'J' && o[i - 2][0] === 'J') bad = true;", ''],
  ['B3 laid clean', "['B3', 'caterpillar', 3, 'gap', [[0, 8], [8, 8], [18, 8]]]", "['B3', 'caterpillar', 3, 'gap', [[0, 8], [8, 8], [16, 8]]]"],
  ['a big round with an odd length', "['D3', 'skateboard', 6]", "['D3', 'skateboard', 5]"],
  ['J2 with two clean rows', "[[0, 8], [8, 8], [20, 8], [28, 8]]]]", "[[0, 8], [8, 8], [16, 8], [24, 8]]]]"],
  ['an unused variable (control)', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle0, repl0] of MUTATIONS) {
  /* a mutation is one [needle, replacement] or a list of pairs applied together (one bug that touches two lines) */
  const pairs = Array.isArray(needle0) ? needle0 : [[needle0, repl0]];
  const bad = pairs.find(([nd, rp]) => SRC.split(nd).length - 1 !== 1 || nd === rp);
  if (bad) { faults++; console.log(`FAULT  needle found ${SRC.split(bad[0]).length - 1}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oh-mut-'));
  fs.writeFileSync(path.join(dir, 'one-hop-core.js'), pairs.reduce((t, [nd, rp]) => t.replace(nd, () => rp), SRC));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { OH_CORE_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-one-hop: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
