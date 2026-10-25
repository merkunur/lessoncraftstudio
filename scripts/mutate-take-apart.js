#!/usr/bin/env node
/* =====================================================================
   mutate-take-apart.js — does verify-take-apart-core.js BITE? Run:
   node scripts/mutate-take-apart.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. Mutations hit the core OR the activity (the
   words live in the activity). CRLF collapsed.
   (What is DRAWN — the empty cup dashed, the help taken away by a new
   move, the prototype row at miss 2 — is gated by local-test-take-apart.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'take-apart-core.js', act: 'take-apart-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-take-apart-core.js');
const MUTATIONS = [
  ['an open corner counted as a joint', 'core', 'var filled = sh.open.indexOf(k) < 0, lines = true;', 'var filled = true, lines = true;'],
  ['a circle shows an empty cup', 'core', "cups: [], ends: 0 };", "cups: [{ filled: false, square: false }], ends: 0 };"],
  ['a bent stick counted straight', 'core', 'curved: !!e.sag, chord', 'curved: false, chord'],
  ['turning takes a stick away', 'core', 'var e = sh.e[i], ab = ends(sh, e), c = len(sub(ab[1], ab[0]));', 'if (it.r >= 90 && i === 0) continue; var e = sh.e[i], ab = ends(sh, e), c = len(sub(ab[1], ab[0]));'],
  ['"rectangle" offered as a wrong tile for a square', 'core', "tiles: ['square', 'triangle', 'hexagon', 'circle']", "tiles: ['square', 'rectangle', 'hexagon', 'circle']"],
  ['every equal-sided corner is a square corner (rhombus = square)', 'core', 'square: filled && lines && Math.abs(interior(sh, k) - 90) < 2', 'square: filled && lines'],
  ['a reflex corner read as a square corner', 'core', 'return (cross * sa < 0) ? 360 - ang : ang;', 'return ang;'],
  ['level 1 accepts the curved "triangle"', 'core', 'return c.closed && c.curved === 0 && c.straight === TARGETS[target];', 'return c.closed && c.straight + c.curved === TARGETS[target];'],
  ['the disguise taken out of round 1', 'core', "'tri_right r90 s0.55', 'tri_obtuse r180 s0.8'", "'tri_right r0 s1.0', 'tri_obtuse r0 s1.0'"],
  ['the open corner closed (the sticks meet)', 'core', 'var GAP = 10;', 'var GAP = 0;'],
  ['Check with shapes on the shelf counts a miss', 'core', "if (k === 'tray') return { result: 'tray' };", "if (k === 'tray') { st.misses++; return { result: 'tray' }; }"],
  ['the true shapes are always orange', 'core', 'p.colour = cols[i % cols.length];', "p.colour = belongs(p, T) ? 'coral' : cols[i % cols.length];"],
  /* (removing only the loop's eq-check is an equivalent mutant: this fallback still prevents a repeat) */
  ['the same order twice (no fallback when the shuffles keep repeating)', 'core', '    if (eq(o, prev)) o = base.slice(1).concat(base[0]);\n', ''],
  ['level 1 no longer opens on round 1', 'core', "if (!prev && level === 'real') { o.splice(o.indexOf(0), 1); o.unshift(0); }", ''],
  ['the right name tile always first', 'core', 'st.tiles = rest.slice(0, pos).concat([N.tiles[0]], rest.slice(pos));', 'st.tiles = [N.tiles[0]].concat(rest);'],
  ['the riddle answer always in the first slot', 'core', 'for (var j = 0; j < n; j++) q.push(j % 3);', 'for (var j = 0; j < n; j++) q.push(0);'],
  ['the second miss never escalates', 'core', "if (st.show >= 2) return { key: st.level === 'riddle' ? 'hintRiddle2' : 'hintBoth' };", ''],
  ['level 3 miss 2 lays the answer\'s prototype', 'core', "if (st.level === 'name' && st.choice) return PROTO[st.choice] + ' r0 s1.0';\n    return null;", "if (st.level === 'name' && st.choice) return PROTO[st.choice] + ' r0 s1.0';\n    return PROTO[st.name] + ' r0 s1.0';"],
  ['the small size floor ignored', 'core', 'var lo = Math.max(0.55, Math.min(0.95, floor / box));', 'var lo = 0.55;'],
  ['a hint prints a count', 'act', "en:'Count the sticks on the tray, then choose the name again.'", "en:'Count the sticks on the tray: 3, then choose the name again.'"],
  ['fi: the quadrilateral box says "square"', 'act', "fi:'Nelikulmio'", "fi:'Neliö'"],
  ['de: riddle 2 asks for 3 square corners', 'act', 'lang, und 4 rechte Winkel. Wer bin ich?', 'lang, und 3 rechte Winkel. Wer bin ich?'],
  ['a tap on a shown-but-unchosen tray shape snaps it back (the child cannot move it)', 'core', 'if (st.tray === i && st.sel === i) {', 'if (st.tray === i) {'],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ta-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TA_CORE_DIR: dir, TA_ACT_DIR: dir }), timeout: 180000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-take-apart: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
