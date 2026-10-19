#!/usr/bin/env node
/* =====================================================================
   mutate-post-slot.js — does verify-post-slot-core.js BITE?
   Run: node scripts/mutate-post-slot.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the rules, the data, the stage.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'post-slot-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-post-slot-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a sphere marked flat',                       "var FLAT = { circle: 1, square: 1,", "var FLAT = { sphere: 1, circle: 1, square: 1,"],
  ['a solid edge-on has no thickness',           "    if (isFlat(kind)) return 0;\n", "    if (isFlat(kind) || kind === 'cube') return 0;\n"],
  ['the cylinder counted 3 faces',               "if (kind === 'cylinder') return 2;", "if (kind === 'cylinder') return 3;"],
  ['a cube counted by its visible faces',        "function facesOf(kind) { if (kind === 'cylinder') return 2; var P = poly(kind); return P ? P.F.length : 0; }", "function facesOf(kind) { if (kind === 'cylinder') return 2; var P = poly(kind); return P ? (kind === 'cube' ? 3 : P.F.length) : 0; }"],
  ['the triangular pyramid built on a square',   "tripyr: function () { return pyramid(ngon(3, 1.3, Math.PI / 2), 1.9); }", "tripyr: function () { return pyramid(ngon(4, 1.3, Math.PI / 4), 1.9); }"],
  ['a sphere in a counting round',               "{ id: 'F3', kind: 'cylinder', pose: { yaw: 0, pitch: 22 }, s: 0.85 },", "{ id: 'F3', kind: 'sphere', pose: { yaw: 0, pitch: 22 }, s: 0.85 },"],
  ['the net fits the slot with a face unstamped', "function netFitsSlot(st) { return st.net.faces.every(function (f, i) { return f.curved || st.stamps.indexOf(i) >= 0; }); }", "function netFitsSlot(st) { return st.stamps.length >= st.net.faces.length - 2; }"],
  ['the curved sheet takes a stamp',             "    if (f.curved) return 'curl';\n", ""],
  ['turning loses the stamps',                   "st.pose.yaw = (st.pose.yaw + 90) % 360; return true;", "st.pose.yaw = (st.pose.yaw + 90) % 360; st.stamps = []; st.chip = null; return true;"],
  ['a bag with only one kind',                   "if (!alternates(o.map(function (id) { return byId(r, id).flat; }))) return o;", "if (!alternates(o.map(function (id) { return byId(r, id).flat; }))) return o.filter(function (id) { return byId(r, id).flat; });"],
  ['a tap turns a shape edge-on before Check',   "function edgeOnAllowed(st) { return !!st.done; }", "function edgeOnAllowed(st) { return true; }"],
  ['the showing survives a new stamp',           "    st.show = false; st.last = null;\n    return k >= 0 ? 'off' : 'on';", "    st.last = null;\n    return k >= 0 ? 'off' : 'on';"],
  /* the rules */
  ['Check with shapes in the bag is a miss',     "if (st.bag.length) { st.last = { result: 'empty', why: 'bag' }; return st.last; }", "if (st.bag.length) { st.misses++; st.last = { result: 'empty', why: 'bag' }; return st.last; }"],
  ['the bounced shapes stay on their trays',     "bounced.forEach(function (id) { st.bag.push(id); });", "void 0;"],
  ['no second level of help',                    "st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.last = { result: 'wrong', bounced: bounced };", "st.misses++; st.help = Math.min(1, st.help + 1); st.show = true; st.last = { result: 'wrong', bounced: bounced };"],
  ['help resets on a new move',                  "    var b = st.bounced.indexOf(id); if (b >= 0) st.bounced.splice(b, 1);\n", "    var b = st.bounced.indexOf(id); if (b >= 0) st.bounced.splice(b, 1); st.help = 0;\n"],
  ['the right number posts an unstamped net',    "    if (!netFitsSlot(st)) { st.show = true; st.last = { result: 'unpaid' }; return st.last; }\n", ""],
  ['an unpaid net counts as a miss',             "if (!netFitsSlot(st)) { st.show = true; st.last = { result: 'unpaid' }; return st.last; }", "if (!netFitsSlot(st)) { st.misses++; st.show = true; st.last = { result: 'unpaid' }; return st.last; }"],
  ['a wrong number posts the net',               "if (st.chip !== r.answer) {", "if (st.chip == null) {"],
  ['a tray holds seven',                         "var TRAY_MAX = 6;", "var TRAY_MAX = 7;"],
  ['the order repeats the last pass',            "if (prev && n > 1 && o.join() === prev.join()) continue;", ""],
  ['the same answer three rounds running',       "if (a != null && a === pool[o[q - 1]].answer && a === pool[o[q - 2]].answer) { bad = true; break; }", "if (false) { bad = true; break; }"],
  ['every face is visible (none hidden)',        "vis: n[2] > 1e-6,", "vis: true,"],
  ['the cylinder hides nothing',                 "if (kind === 'cylinder') return (pose.pitch || 0) > 0 ? 1 : 0;", "if (kind === 'cylinder') return 0;"],
  /* the pictures */
  ['the book from a theme that does not exist',  "book: { dir: 'classroom', solid: 'box',", "book: { dir: 'Classroom', solid: 'box',"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ps-mut-'));
  fs.writeFileSync(path.join(dir, 'post-slot-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PS_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-post-slot: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
