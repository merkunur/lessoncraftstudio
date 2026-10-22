#!/usr/bin/env node
/* =====================================================================
   mutate-rewind-rail.js — does verify-rewind-rail-core.js BITE?
   Run: node scripts/mutate-rewind-rail.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first. CRLF collapsed before
   searching. (The replay drawing, the rail drag and the pads are rendering
   properties, gated by local-test-rewind-rail.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'rewind-rail-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'rewind-rail-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-rewind-rail-core.js');
const MUTATIONS = [
  ['a backwards stroke accepted',                 "var reversed = !L.isDot && walk < 0;", "var reversed = false;"],
  ['a wrong start accepted',                      "var startOk = dist(raw[0], L.pts[0]) <= START_TOL;", "var startOk = true;"],
  ['the order ignored',                           "      if (a.match > want) return { ok: false, kind: 'order', child: i, model: want, al: al };\n", ""],
  ['matched by drawing order, not by the path',   "      var a = al[i];\n", "      var a = Object.assign({}, al[i], al[i].match >= 0 ? { match: Math.min(i, n - 1) } : {});\n"],
  ['the start named before the direction',        "      if (a.reversed) return { ok: false, kind: 'direction', child: i, model: want, al: al };\n      if (!a.startOk) return { ok: false, kind: 'start', child: i, model: want, al: al };", "      if (!a.startOk) return { ok: false, kind: 'start', child: i, model: want, al: al };\n      if (a.reversed) return { ok: false, kind: 'direction', child: i, model: want, al: al };"],
  ['a stroke stopped short accepted',             "var COVER_MIN = 0.75;", "var COVER_MIN = 0;"],
  ['a ring not unwrapped',                        "if (ring && Math.abs(du) > L.total / 2)", "if (false && Math.abs(du) > L.total / 2)"],
  ['a far-off letter accepted',                   "var MATCH = 14;", "var MATCH = 40;"],
  ['the rewind never stops at the slip',          "    if (g.ok) return 1;\n    var tl = timeline(rec);", "    return 1;\n    var tl = timeline(rec);"],
  ['bands coloured by drawing order',             "color: a && a.match >= 0 ? COLORS[a.match % COLORS.length] : null", "color: a && a.match >= 0 ? COLORS[s.i % COLORS.length] : null"],
  ['a wrong-end line keeps its credit',           "        cur.pale = true; st.last = { reason: 'wrongEnd' };", "        st.last = { reason: 'wrongEnd' };"],
  ['an empty Check counts as a miss',             "    if (!drawn) { st.last = { reason: 'empty' };", "    if (!drawn) { st.misses++; st.last = { reason: 'empty' };"],
  ['a second miss stays on my own',               "    if (st.tries >= 2) {", "    if (st.tries >= 3) {"],
  ['Rub out dodges the second-miss help',         "var t = st.tries; newStep(st); st.tries = t;", "newStep(st);"],
  ['the spark stays after the road step',         "    st.shown = null; st.help = 0; st.ghost = false;", "    st.shown = null; st.help = 0;"],
  ['on my own: the start dots numbered',          "if (!out.some(function (q) { return dist(q, p) < 4; })) out.push({ x: p.x, y: p.y });", "if (!out.some(function (q) { return dist(q, p) < 4; })) out.push({ x: p.x, y: p.y, n: out.length + 1 });"],
  ['guided: the dot unnumbered',                  "n: k === 'guided' ? st.tr.idx + 1 : null", "n: null"],
  ['on my own: the road shown',                   "    if (st.done || st.shown || kind(st) === 'own') return [];\n    var Ls = lanes(st.r.strokes), out = [];", "    if (st.done || st.shown) return [];\n    if (!st.tr) return lanes(st.r.strokes).map(function (L, i) { return i; });\n    var Ls = lanes(st.r.strokes), out = [];"],
  ['the next pass starts with the last letter',   "(prev.join() === o.join() || prev[prev.length - 1] === o[0])", "(prev.join() === o.join())"],
  ['the locale letters dropped',                  "return S0.base.concat(S0.extra.filter(function (c) { return alpha.indexOf(c) >= 0; }));", "return S0.base.slice();"],
  ['ß left out of de',                            "extra: ['ä', 'å', 'æ', 'ß']", "extra: ['ä', 'å', 'æ']"],
  ['the phone pad too short',                     "(wide ? 300 : tiny ? 180 : 214) / 102", "(wide ? 300 : tiny ? 150 : 160) / 102"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rr-mut-'));
  fs.writeFileSync(path.join(dir, 'rewind-rail-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'rewind-rail-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RR_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-rewind-rail: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
