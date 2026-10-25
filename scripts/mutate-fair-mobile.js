#!/usr/bin/env node
/* =====================================================================
   mutate-fair-mobile.js — does verify-fair-mobile-core.js BITE? Run:
   node scripts/mutate-fair-mobile.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the swing, the springs against the fair line, the
   glows, help taken away after a new move — is gated by
   local-test-fair-mobile.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'fair-mobile-core.js', act: 'fair-mobile-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-fair-mobile-core.js');
const MUTATIONS = [
  ['the bars have mass (the empty ⅓ mobile tips)', 'core', 'return { top: tilt(d * S - 2 * d * w[0], w[0] + S),', 'return { top: tilt(d * S - 2 * d * w[0] + 4, w[0] + S + 0.2),'],
  ['the ⅓ mobile is a symmetric three-hook bar', 'core', 'return { top: tilt(d * S - 2 * d * w[0], w[0] + S),', 'return { top: tilt(d * (w[2] - w[0]), w[0] + S),'],
  ['the fourths mobile ignores its top bar (pairs balanced = level)', 'core', 'return { top: tilt(a * (R - L), L + R),', 'return { top: 0,'],
  ['a piece weighs by count, not area', 'core', 'return { poly: p, w: area(p) / tot,', 'return { poly: p, w: 1 / parts.length,'],
  ['the springs stretch the same for every piece', 'core', 'function stretch(w, type) { return 40 * w * HOOKS[type]; }', 'function stretch(w, type) { return 40; }'],
  ['spare pieces are hung anyway', 'core', "    if (H.spare.length) return 'many';\n", ''],
  ['bare hooks are ignored', 'core', "    if (H.empty) return 'few';\n", ''],
  ['a 6° tilt reads as level', 'core', 'if (Math.abs(ang[k]) >= 0.5) return false;', 'if (Math.abs(ang[k]) >= 7) return false;'],
  ['level 3 counts the cuts, not the shares', 'core', "HOOKS[st.mobiles[st.on]] === n ? 'ok'", "HOOKS[st.mobiles[st.on]] === n - 1 ? 'ok'"],
  ['the fair card is always in slot 0', 'core', 'cards: rest.slice(0, p).concat([R[2][0]], rest.slice(p))', 'cards: [R[2][0]].concat(rest)'],
  ['a new card leaves the pin out', 'core', 'st.pin = !st.done ? true : false;', 'st.pin = st.pin;'],
  ['Check with nothing hung counts a miss', 'core', "if (k === 'tray') return { result: 'tray' };", "if (k === 'tray') { st.misses++; return { result: 'tray' }; }"],
  ['hooks are filled in cut order, not left to right', 'core', '.sort(function (a, b) { return (Math.abs(a.cx - b.cx) > 0.5 ? a.cx - b.cx : a.cy - b.cy); });', ';'],
  ['#1 no longer opens the first pass', 'core', "if (!prev && level === 'hf') { c.splice(c.indexOf(0), 1); c.unshift(0); }", ''],
  ['the leftover slots always go to the first slots', 'core', 'pool.concat(shuffle(left, rnd).slice(0, n % slots))', 'pool.concat(left.slice(0, n % slots))'],
  ['the unequal halves chord is cut through the middle', 'core', "'circle-halves-uneq': ['circle', { lines: [V(50 - 0.4 * 46)] }]", "'circle-halves-uneq': ['circle', { lines: [V(50 - 0.04 * 46)] }]"],
  ['the triangle thirds meet off the centre', 'core', 'var TRI_C = [50, 50 - HT / 2 + 2 * HT / 3];', 'var TRI_C = [50, 50];'],
  ['the help never steps up to the springs', 'core', "if (st.show >= 2) return { key: k === 'uneq' ? 'hintSprings' : 'hintCount2' };", ''],
  ['a hint prints a count', 'act', "en:'Some pieces have no hook. This card has too many pieces for this mobile.'", "en:'Some pieces have no hook. This card has 2 pieces too many.'"],
  ['a card label tells whether it is equal', 'act', "en:'card {n}: {shape}, cut into {k} pieces'", "en:'card {n}: {shape}, cut into {k} equal pieces'"],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fm-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FM_CORE_DIR: dir, FM_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-fair-mobile: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
