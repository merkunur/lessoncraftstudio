#!/usr/bin/env node
/* =====================================================================
   mutate-mending-basket.js — does verify-mending-basket-core.js BITE? Run:
   node scripts/mutate-mending-basket.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the thread, the rings, the stickers, the page — is gated by local-test-mending-basket.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'mending-basket-core.js', act: 'mending-basket-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-mending-basket-core.js');
const MUTATIONS = [
  ['a wrong piece holds', 'core', "if (k === 'fill' || k === 'who') { if (st.pieces[st.hole] !== R.ans) snap = { a: R.key, b: 'hole' }; }", "if (k === 'fill' || k === 'who') { }"],
  ['the thread snaps at the neighbour, not the keystone', 'core', "if (k === 'fill' || k === 'who') { if (st.pieces[st.hole] !== R.ans) snap = { a: R.key, b: 'hole' }; }", "if (k === 'fill' || k === 'who') { if (st.pieces[st.hole] !== R.ans) snap = { a: R.gap - 1, b: 'hole' }; }"],
  ['three rings pass for "two"', 'core', 'if (mine.length === o.count) continue;', 'if (mine.length >= o.count) continue;'],
  ['ordinals counted from the right', 'core', 'if (st.rings[o.index] === o.colour && mine.length === 1) continue;', 'if (st.rings[S.row.length - 1 - o.index] === o.colour && mine.length === 1) continue;'],
  ['a sticker anywhere passes', 'core', 'if (st.placed[o.sticker] !== o.zone) return', "if (!(o.sticker in st.placed)) return"],
  ['the keystone glows before a miss', 'core', "return !st.done && st.show >= 2 && st.last === 'snap';", 'return !st.done;'],
  ['the right piece always in the middle', 'core', 'pos = opts.pos == null ? 0 : opts.pos % 3;', 'pos = 1;'],
  ['every True round is true', 'core', "if (st.tool !== (st.S.truth ? 'sew' : 'cut'))", "if (st.tool !== 'sew')"],
  ['a story answer without its proof', 'core', "else if (k === 'story') { if (st.pieces[st.hole] !== R.ans) snap = { a: 'proof', b: 'hole' }; }", "else if (k === 'story') { }"],
  ['the help stays after a new move', 'core', 'function help0(st) { st.last = null; st.snap = null; }', 'function help0(st) { }'],
  ['the crayon recolours the picture', 'act', "+ '.mb-ring.is-ringed{box-shadow:0 0 0 6px var(--mb-ring),0 0 0 9px #FFFDF6;}", "+ '.mb-ring.is-ringed{filter:hue-rotate(90deg);}"],
  ['Fix: any word may be unpicked', 'core', "if (st.picked !== R.wrong) snap = { a: R.key, b: st.picked, kind: 'word' };", "if (false) snap = { a: R.key, b: st.picked, kind: 'word' };"],
  ['a hint prints a digit', 'act', 'en:"Choose a piece for the torn hole."', 'en:"Choose 1 piece for the torn hole."'],
  ['a sticker that was not asked for passes', 'core', "if (extra) return { op: 0, part: 'extra', thing: extra };", ''],
  ['story questions out of order', 'core', "if (clue === 'story') { var st3", "if (false) { var st3"],
  ['an unused variable (control)', 'core', "  var CLUES = ['fill', 'fix', 'who', 'do', 'true', 'story']", "  var UNUSED_CONTROL = 0; var CLUES = ['fill', 'fix', 'who', 'do', 'true', 'story']"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { MB_CORE_DIR: dir, MB_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-mending-basket: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
