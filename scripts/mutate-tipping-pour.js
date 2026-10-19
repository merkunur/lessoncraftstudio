#!/usr/bin/env node
/* =====================================================================
   mutate-tipping-pour.js — does verify-tipping-pour-core.js BITE?
   Run: node scripts/mutate-tipping-pour.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The first eleven are the design's list (§12); the rest guard the berry,
   the order, the outcomes and the stage. CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'tipping-pour-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-tipping-pour-core.js');
const MUTATIONS = [
  /* the design's list */
  ['capacity from the 2D area',            "    return PI * t / 3 * (r0 * r0 + r0 * r1 + r1 * r1);", "    return t * (r0 + r1);"],
  ['capacity from the outer outline',      "  function capacity(v) { return volumeAt(v, cavTop(v)); }", "  function capacity(v) { return v.thick ? PI * v.thick.r * v.thick.r * v.thick.h : volumeAt(v, cavTop(v)); }"],
  ['the pour creates juice',               "    st.vol[from] -= out; st.vol[to] += out;", "    st.vol[from] -= out; st.vol[to] += out * 1.01;"],
  ['the spill never triggers',             "    if (st.vol[to] > cap) { st.spilled += st.vol[to] - cap; st.vol[to] = cap; }\n", ""],
  ['truth read from a stored field',       "    { id: 'E1', A: 'cup15',  B: 'jug34' },", "    { id: 'E1', A: 'cup15',  B: 'jug34', more: 'B' },"],
  ['the tap fills before the prediction',  "    if (!st.berry) throw new Error('predict first: the berry goes down before the juice');\n", ""],
  ['the swap is not applied to the truth', "    var s = sides(r, swap), a = capacity(V[s.L]), b = capacity(V[s.R]);", "    var s = sides(r, false), a = capacity(V[s.L]), b = capacity(V[s.R]);"],
  ['the same round solved to 2 %',         "V.tub30.cav = cyl(30, target / (PI * 900));", "V.tub30.cav = cyl(30, target * 1.02 / (PI * 900));"],
  ['the question is ignored',              "    if (c === 'SAME' || polarity !== 'less') return c;\n    return c === 'A' ? 'B' : 'A';\n  }\n  function polarityAt", "    return c;\n  }\n  function polarityAt"],
  ['the tilt does not change the flow',    "    var h = hold(vf, st.tilt, dir), extra = st.vol[from] - h;", "    var h = hold(vf, st.tilt > 0 ? MAX_TILT : 0, dir), extra = st.vol[from] - h;"],
  ['the live region omits the outcome',    "  function aria(st) { return st.outcome ? ({ spill: 'ariaSpill', gap: 'ariaGap', brim: 'ariaBrim' })[st.outcome] : null; }", "  function aria(st) { return null; }"],
  /* the berry */
  ['no glow at miss 2',                    "  function glow(st) { return !st.done && st.help >= 2 ? want(st) : null; }", "  function glow(st) { return null; }"],
  ['a wrong berry stays put',              "    st.misses++; st.help++; st.berry = null;", "    st.misses++; st.help++;"],
  ['miss 1 forgets the evidence',          "({ spill: 'hintSpill', gap: 'hintGap', brim: 'hintBrim' })[L.outcome]", "'hintHere'"],
  ['a brim read as a gap',                 "Math.abs(st.vol.R - capR) <= SAME_TOL * capR * 2 + 1e-6 ? 'brim' : 'gap';", "'gap';"],
  ['the last drops vanish',                "st.vol.R += st.vol.L; st.vol.L = 0;", "st.vol.L = 0;"],
  ['the fit round answered backwards',     "    if (r.fit) return c === 'B' || c === 'SAME' ? 'FITS' : 'SPILLS';\n    if (c === 'SAME' || polarity", "    if (r.fit) return c === 'B' || c === 'SAME' ? 'SPILLS' : 'FITS';\n    if (c === 'SAME' || polarity"],
  /* the order */
  ['the same order twice',                 "      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;\n", ""],
  ['the fit round opens a pass',           "      if (tricky && (pool[a[0]].fit || pool[a[0]].cog === 'same')) continue;\n", ""],
  ['one berry place three times running',  "      if (!runOk(pool, a, pass || 0, polQ)) continue;\n", ""],
  ['the first pass replayed every visit',  "    var n = pool.length, tricky = pool[0] && pool[0].id.charAt(0) === 'T';\n", "    var n = pool.length, tricky = pool[0] && pool[0].id.charAt(0) === 'T';\n    if (!prev && !pass) return pool.map(function (_, i) { return i; });\n"],
  ['the sides never swap',                 "  function swapOf(i, pass) { if (pass % 2 === 0) return false;", "  function swapOf(i, pass) { return false;"],
  /* the physics and the stage */
  ['tipping left is not the mirror',       "  function upIn(deg, dir) { var a = deg * PI / 180; return [-dir * Math.sin(a), Math.cos(a)]; }", "  function upIn(deg, dir) { var a = deg * PI / 180; return [-Math.sin(a), Math.cos(a)]; }"],
  ['the handle left out of the look',      "    var w = 2 * o.r + (hasHandle(v) ? HANDLE : 0);", "    var w = 2 * o.r;"],
  ['the phone stage too narrow',           "    var wide = W >= 560, SW = wide ? 280 : 240, u = W / SW, pic = wide ? 96 : 64;", "    var wide = W >= 560, SW = wide ? 280 : 190, u = W / SW, pic = wide ? 96 : 64;"],
  ['the sky forgets the pour back',        "    if (both) m = Math.max(m, reach(b, a, lay.X.R, lay.X.L).top);\n", ""],
  ['a kite-shaped stretch: the stoneware bowl thinner', "    stone:      { kind: 'stone',  cav: cyl(31, 32), thick: { r: 45, h: 50 } },", "    stone:      { kind: 'stone',  cav: cyl(36, 32), thick: { r: 45, h: 50 } },"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tp-mut-'));
  fs.writeFileSync(path.join(dir, 'tipping-pour-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TP_CORE_DIR: dir }), timeout: 240000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-tipping-pour: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
