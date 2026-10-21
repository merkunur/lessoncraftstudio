#!/usr/bin/env node
/* =====================================================================
   mutate-nila-pond.js — does verify-nila-pond-core.js BITE?
   Run: node scripts/mutate-nila-pond.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (The canopy colour by peg, the rain and the pad drag are rendering
   properties, gated by local-test-nila-pond.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'nila-pond-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'nila-pond-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-nila-pond-core.js');
const MUTATIONS = [
  ['the big idea covers only two pads',            '{"id":"bear-warm","group":"bear","cog":"nest-reject","cover":[[0,1,2],', '{"id":"bear-warm","group":"bear","cog":"nest-reject","cover":[[0,1],'],
  ['a not-in-text idea covers all three pads',     '{"id":"bee-hive","group":"bee","cog":"reject-narrow","cover":[[0,1,2],[1],[2],[]]', '{"id":"bee-hive","group":"bee","cog":"reject-narrow","cover":[[0,1,2],[1],[2],[0,1,2]]'],
  ['a detail covers the wrong pad',                '{"id":"swan-neck","group":"swan","cog":"reject-narrow","cover":[[0,1,2],[0],[1],[]]', '{"id":"swan-neck","group":"swan","cog":"reject-narrow","cover":[[0,1,2],[0],[2],[]]'],
  ['the canopy width is fixed',                    "return { x: (PAD_X[lo] + PAD_X[hi]) / 2, w: Math.min(FULL, PAD_X[hi] - PAD_X[lo] + PAD_W + 0.04) };", "return { x: (PAD_X[lo] + PAD_X[hi]) / 2, w: FULL };"],
  ['the canopy shows its true width on hang',      "if (!st.rained) return { x: 0.5, w: FULL };", "if (!st.rained && st.hung === 0) return { x: 0.5, w: FULL };"],
  ['the rain wets the covered pads',               "wet = [0, 1, 2].filter(function (p) { return cov.indexOf(p) < 0; });", "wet = [0, 1, 2].filter(function (p) { return cov.indexOf(p) >= 0; });"],
  ['step 2 accepts the stranger under',            "function belongs(r, pad) { return pad < 3 ? true : r.extra[pad - 3].belongs; }", "function belongs(r, pad) { return true; }"],
  ['no sibling swap after a third miss',           "res.swap = st.misses >= 3;", "res.swap = false;"],
  ['the tags hang in the same order every round',  "var rest = shuffle([1, 2, 3].slice(0, n - 1), rnd), rail = [];", "var rest = [1, 2, 3].slice(0, n - 1), rail = [];"],
  ['the big idea always on one peg',               "for (var i = 0; i < len; i++) a.push(i % n);", "for (var i = 0; i < len; i++) a.push(0);"],
  ['one animal three times in a row',              "if (BYID[o[i]].group === BYID[o[i - 1]].group && BYID[o[i]].group === BYID[o[i - 2]].group) bad = true;", "if (false) bad = true;"],
  ['the next pass repeats the order',              "if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;", "if (false) continue;"],
  ['miss 2 dims nothing',                          "return st.rail.indexOf(3) >= 0 ? [3] : st.tried.slice();", "return [];"],
  ['an empty Check counts as a miss',              "if (st.hung === null) { st.show = true; st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }", "if (st.hung === null) { st.misses++; st.show = true; st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }"],
  ['pictures below the floor at 704',              "pic: wide ? 96 : 64", "pic: wide ? 90 : 64"],
  ['the big idea longest in many rounds',          '"swan-lunch":{"p":["A hungry swan looks for lunch in the pond."', '"swan-lunch":{"p":["A hungry swan looks for lunch in the pond."'],
  ['a wrong tag shape in en',                      '"t":["finding its lunch",', '"t":["to find its lunch",']
];
MUTATIONS.splice(MUTATIONS.findIndex(m => m[0] === 'the big idea longest in many rounds'), 1);
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'np-mut-'));
  fs.writeFileSync(path.join(dir, 'nila-pond-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'nila-pond-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { NP_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-nila-pond: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
