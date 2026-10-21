#!/usr/bin/env node
/* =====================================================================
   mutate-otto-pins.js — does verify-otto-pins-core.js BITE?
   Run: node scripts/mutate-otto-pins.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (The pins flying, the dangling, the strips and the paint are rendering
   properties, gated by local-test-otto-picture-book.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'otto-pins-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-otto-pins-core.js');
const MUTATIONS = [
  ['a pin sticks whatever the picture shows',            "stuck: t.tag in f,", "stuck: true,"],
  ['Which accepts any panel',                            "res.ok = res.strips.every(function (ps) { return ps.every(function (p) { return p.stuck; }); });", "res.ok = true;"],
  ['Which checks only the first strip',                  "res.ok = res.strips.every(function (ps)", "res.ok = res.strips.slice(0, 1).every(function (ps)"],
  ['Fill accepts any word',                              "res = { pins: pinsAgainst(toks, r.scene.f) }; res.ok = res.pins.every(function (p) { return p.stuck; });", "res = { pins: pinsAgainst(toks, r.scene.f) }; res.ok = true;"],
  ['a wrong spelling accepted',                          "blankTag = spelled(st) === r.word ? r.bank[0].tag : '__none';", "blankTag = r.bank[0].tag;"],
  ['the letter tiles can spell the word in order',       "} while (lt.slice(0, w.length).join('') === w.join(''));", "} while (false);"],
  ['True or false always says true',                     "res.truth = r.truth; res.ok = st.choice === r.truth;", "res.truth = r.truth; res.ok = st.choice === true;"],
  ['the truth ignores the pins',                         "truth: tags(tokens).every(function (g) { return g in sc.f; })", "truth: tags(tokens).some(function (g) { return g in sc.f; })"],
  ['color: a place ignored',                             "if (P.kind === 'at') { if (P.at.some(function (i) { return paint[i] !== P.col; }))", "if (P.kind === 'at') { if (false)"],
  ['color: too many accepted',                           "if (hits.length !== want)", "if (hits.length < want)"],
  ['color: an extra tile accepted',                      "if (!ok) { var same", "if (false) { var same"],
  ['color: all means one',                               "var want = P.kind === 'all' ? r.tiles.filter(function (n) { return n === P.noun; }).length : P.n;", "var want = P.kind === 'all' ? 1 : P.n;"],
  ['the bank never moves the right word',                "for (var s = 0, k = 0; s < 3; s++) b.push(s === slot[p] ? 0 : wrong[k++]);", "for (var s = 0, k = 0; s < 3; s++) b.push(s === 0 ? 0 : wrong[k++]);"],
  ['the next pass may repeat the last',                  "if (prev && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;", ""],
  ['three true answers running',                         "if (pool[0].task === 'tf') {", "if (false) {"],
  ['no miss-2 hint for Which',                           "if (T === 'which') return two ? 'hintWhich2' : 'hintWhich';", "if (T === 'which') return 'hintWhich';"],
  ['miss 2 points at the wrong panel',                   "if (d) return { panel: r.strips[k].target, strip: k, tag: d.tag };", "if (d) return { panel: (r.strips[k].target + 1) % 4, strip: k, tag: d.tag };"],
  ['an empty check counts as a miss',                    "function empty(st) { st.show = true;", "function empty(st) { st.misses++; st.show = true;"],
  ['pictures below the floor at 704',                    "L.unit = wide ? 96 : 64;", "L.unit = wide ? 90 : 64;"],
  ['the snow story\'s sled gone from the right panel',   '"sled":', '"sledX":'],
  ['the miss-2 rings ignore what the child painted',      'return { rings: rightTiles(r, st.paint) };', 'return { rings: rightTiles(r) };'],
  ['two strips in one story share a panel',              '"target":2,"target2":3', '"target":2,"target2":2']
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'op-mut-'));
  fs.writeFileSync(path.join(dir, 'otto-pins-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { OP_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-otto-pins: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
