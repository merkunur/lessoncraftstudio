#!/usr/bin/env node
/* =====================================================================
   mutate-paint-wells.js — does verify-paint-wells-core.js BITE? Run:
   node scripts/mutate-paint-wells.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the swirl, the stripes and crack, the lean, the dimmed
   droppers, the dried strip — is gated by local-test-paint-wells.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'paint-wells-core.js', act: 'paint-wells-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-paint-wells-core.js');
const MUTATIONS = [
  ['f and r in one well mix (a blend counted as one sound)', 'core', "else { out[f.w] = 'split'; split = true; }", "else out[f.w] = 'ok';"],
  ['s and h in two wells pass', 'core', "if (ia < 0 || ib < 0) { out[f.w] = 'lean'; lean = true; }", "if (ia < 0 || ib < 0) { out[f.w] = 'ok'; }"],
  ['ch accepted for sh (only the length is compared)', 'core', 'if (S !== T) {', 'if (S.length !== T.length) {'],
  ['a tap pours into a filled well', 'core', "if (w == null || w === 'next') { w = firstEmpty(st); if (w < 0) return 'full'; }", "if (w == null || w === 'next') { w = 0; }"],
  ['the jars always stand in team order', 'core', 'pos = opts.pos == null ? right : opts.pos;', 'pos = right;'],
  ['a sentence counts words with an s', 'core', 'has: /sh/i.test(t)', 'has: /s/i.test(t)'],
  ['the help stays after a new pour', 'core', "st.wells[w].push(d); st.marks = null; st.last = null;", 'st.wells[w].push(d);'],
  ['es ll is a doubled l, not a sound of its own', 'core', "OWN_SOUND_DOUBLES = { es: ['ll', 'rr'], pt: ['rr'] }", "OWN_SOUND_DOUBLES = { es: ['rr'], pt: ['rr'] }"],
  ['the given first letter can be taken out', 'core', "if (st.wells[w][k] === st.locked) return 'locked';\n    st.wells[w].splice(k, 1);", 'st.wells[w].splice(k, 1);'],
  ['the tray may read the word in order', 'core', 'if (trayFair(t)) return t;', 'return t;'],
  ['the plan ignores the fairness rule', 'core', 'if (!eq(c, prev) && fair(loc, clue, c))', 'if (!eq(c, prev))'],
  ['miss 2 leaves only the right dropper bright', 'core', 'var a = st.marks.want, b = st.marks.got;', 'var a = st.marks.want, b = null;'],
  ['Check with nothing poured counts a miss', 'core', "if (j.kind === 'tray') return { result: 'tray' };", "if (j.kind === 'tray') { st.misses++; return { result: 'tray' }; }"],
  ['a hint prints a count', 'act', "en:'Say the word slowly. Pour one well for each sound.'", "en:'Say the word slowly. Pour 3 wells.'"],
  ['fi ships', 'core', '"LOCALES":["en",', '"LOCALES":["fi","en",'],
  ['the success line names a double before a team', 'core', "t = s.filter(function (x) { return x.kind === 'team'; })[0] || s.filter(function (x) { return x.kind === 'double'; })[0];", "t = s.filter(function (x) { return x.kind === 'double'; })[0] || s.filter(function (x) { return x.kind === 'team'; })[0];"],
  ['the right jar may stand in one place twice running', 'core', 'for (var q = 1; q < p.length; q++) if (p[q] === p[q - 1]) ok = false;', ''],
  ['a well holds four letters', 'core', 'var WELLS = 6, WELL_MAX = 3;', 'var WELLS = 6, WELL_MAX = 4;'],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pw-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PW_CORE_DIR: dir, PW_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-paint-wells: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
