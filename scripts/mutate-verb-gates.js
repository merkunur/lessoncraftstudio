#!/usr/bin/env node
/* =====================================================================
   mutate-verb-gates.js — does verify-verb-gates-core.js BITE?
   Run: node scripts/mutate-verb-gates.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the house, the gateway, the walk, the garden — is
   gated by local-test-verb-gates.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'verb-gates-core.js', act: 'verb-gates-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-verb-gates-core.js');
const MUTATIONS = [
  ['the turnstile lets a crowd through', 'core', "if (N >= 2) { out.through = 1; out.stuck = N - 1; out.reason = 'one'; }", 'if (N >= 2) { out.through = N; }'],
  ['the double gate opens for one', 'core', 'if (N >= 2) out.through = N; else {', 'if (N >= 1) out.through = N; else {'],
  ['the star door opens for a picture', 'core', 'if (rd.crowd.star && rd.crowd.n === 0) out.through = 1;', 'if (N === 1) out.through = 1;'],
  ['the turnstile takes the star in the present', 'core', "if (rd.starDoor) { out.bounce = 1; out.reason = 'me'; }", 'if (false) {}'],
  ['the t-turnstile turns for an en-word', 'core', "else if (rd.hasT && (shape === 'oneT') !== rd.neuter)", 'else if (false)'],
  ['en: the dogs are → is', 'core', '"sign":"The dogs","right":"many","pic":"dog","n":3', '"sign":"The dogs","right":"one","pic":"dog","n":3'],
  ['de: hat and haben swapped', 'core', '"s":"Der Hund {g} einen Ball.","sign":"Der Hund","right":"one","pic":"dog","n":1,"w":{"one":"hat","many":"haben"}', '"s":"Der Hund {g} einen Ball.","sign":"Der Hund","right":"one","pic":"dog","n":1,"w":{"one":"haben","many":"hat"}'],
  ['sv: a wrong neuter form', 'core', '"s":"Huset är {g}.","sign":"Huset","right":"oneT","pic":"cabin","n":1,"t":true,"w":{"one":"fin","oneT":"fint"', '"s":"Huset är {g}.","sign":"Huset","right":"oneT","pic":"cabin","n":1,"t":true,"w":{"one":"stor","oneT":"finet"'],
  ['a plural crowd of one', 'core', '"sign":"The pigs","right":"many","pic":"pig","n":4', '"sign":"The pigs","right":"many","pic":"pig","n":1'],
  ['fr: no star door in the past', 'core', '{"star":"étais","one":"était","many":"étaient"}', '{"one":"était","many":"étaient"}'],
  ['fr: a "nous" round on the plural gate', 'core', '"s":"Les filles {g} au parc.","sign":"Les filles","right":"many","pic":"girl","n":3', '"s":"Nous {g} au parc.","sign":"Nous","right":"many","star":true,"pic":"girl","n":1'],
  ['en: I in level four', 'core', '"s":"The dog {g} a ball.","sign":"The dog","right":"one","pic":"dog","n":1', '"s":"I {g} a ball.","sign":"I","right":"one","star":true'],
  ['a black-and-white picture', 'core', '"dog":"pets/dog"', '"dog":"animals bw/dog"'],
  ['no clue at miss 1', 'core', 'function clue(st) { return !st.done', 'function clue(st) { return false && !st.done'],
  ['the success line always "just one"', 'core', 'function okKey(rd) { return', "function okKey(rd) { return 'okOne'; return"],
  ['the glow from miss 1', 'core', "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 2; }", "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 1; }"],
  ['an empty Check is a miss', 'core', "if (st.hung === null) { st.last = 'empty';", "if (st.hung === null) { st.misses++; st.last = 'empty';"],
  ['hanging a gate twice keeps it', 'core', "if (st.hung === shape) { st.hung = null; return 'removed'; }", ''],
  ['the hints swapped', 'core', "one: 'missOne', two: 'missTwo'", "one: 'missTwo', two: 'missOne'"],
  ['three alike in a row', 'core', 'if (!same(c, prev) && !runs(loc, lvl, c))', 'if (!same(c, prev))'],
  ['the same order every pass', 'core', 'var c = shuffle(ids, rnd);', 'var c = ids.slice();'],
  ['a hint prints a digit', 'act', 'en:"The star door is only for I."', 'en:"The star door is only for 1."'],
  ['an unused variable (control)', 'core', "  var ORDER = ['star', 'one', 'oneT', 'many'];", "  var UNUSED_CONTROL = 0; var ORDER = ['star', 'one', 'oneT', 'many'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { VG_CORE_DIR: dir, VG_ACT_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-verb-gates: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
