#!/usr/bin/env node
/* =====================================================================
   mutate-marlo-magnifier.js — does verify-marlo-magnifier-core.js
   BITE? Run: node scripts/mutate-marlo-magnifier.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the lens, the fog, the ring, the board — is gated by local-test-marlo-magnifier.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'marlo-magnifier-core.js', act: 'marlo-magnifier-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-marlo-magnifier-core.js');
const MUTATIONS = [
  ['a did-not-happen card lights a sentence', 'core', 'st.found = c.s; st.fog = c.s == null;', 'st.found = c.s == null ? 0 : c.s; st.fog = false;'],
  ['an in-story card brings focus', 'core', 'st.focus = !!c.ok && c.s != null;', 'st.focus = c.s != null;'],
  ['an in-story detail is accepted as proof', 'core', 'if (c.ok) { st.done = true;', 'if (c.ok || c.s != null) { st.done = true;'],
  ['Questions accepts another answer', 'core', "others = F.wr.map(function (w) { return { t: w.t, s: w.s, ok: false, kind: 'other' }; });", "others = F.wr.map(function (w) { return { t: w.t, s: w.s, ok: true, kind: 'other' }; });"],
  ['the detail case has no in-story card', 'core', "others = level === 'detail' ?", "others = level === 'nope' ?"],
  ['the right card always in the first slot', 'core', 'slot = opts.slot == null ? SLOTS[level][r] : opts.slot % 3;', 'slot = 0;'],
  ['the lens finds before Check', 'core', "st.clip = st.clip === i ? null : i; help0(st);", "st.clip = st.clip === i ? null : i; help0(st); if (st.clip != null) st.found = st.cards[st.clip].s;"],
  ['the first card stays under the lens', 'core', 'st.clip = st.clip === i ? null : i;', 'st.clip = st.clip == null ? i : st.clip;'],
  ['the help before miss 2', 'core', "return !st.done && st.show >= 2 && ['fog'", "return !st.done && st.show >= 1 && ['fog'"],
  ['the sweep jumps straight to the sentence', 'core', 'for (var i = 0; i <= st.found; i++) p.push(i);', 'p.push(st.found);'],
  ['the same order every pass', 'core', 'if (!same(c, prev)) { o = c; break; }', 'if (!same(c, prev)) { o = prev || c; break; }'],
  ['the slot table does not move with the pass', 'core', 'return (SLOTS[level][r] + pass) % 3;', 'return SLOTS[level][r] % 3;'],
  ['a hint prints a digit', 'act', 'en:"Put a clue under the magnifier."', 'en:"Put 1 clue under the magnifier."'],
  ['an unused variable (control)', 'core', "  var LEVELS = ['proof', 'detail', 'questions'];", "  var UNUSED_CONTROL = 0; var LEVELS = ['proof', 'detail', 'questions'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mm-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { MM_CORE_DIR: dir, MM_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-marlo-magnifier: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
