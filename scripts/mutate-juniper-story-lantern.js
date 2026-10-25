#!/usr/bin/env node
/* =====================================================================
   mutate-juniper-story-lantern.js — does verify-juniper-story-lantern-core.js
   BITE? Run: node scripts/mutate-juniper-story-lantern.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the panes, the beam, the new story — is gated by local-test-juniper-story-lantern.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'juniper-story-lantern-core.js', act: 'juniper-story-lantern-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-juniper-story-lantern-core.js');
const MUTATIONS = [
  ['a detail lights all the panes', 'core', "if (kind === 'detail') return { panes: [pane === 0, pane === 1, pane === 2]", "if (kind === 'detail') return { panes: [true, true, true]"],
  ['a wrong lesson lights the ending', 'core', "if (kind === 'wrong') return { panes: [true, true, false], ending: 'cold'", "if (kind === 'wrong') return { panes: [true, true, true], ending: 'warm'"],
  ['the beam reaches the new story on a detail', 'core', "ending: pane === 2 ? 'warm' : 'dark', beam: 'half' }", "ending: pane === 2 ? 'warm' : 'dark', beam: 'reaches' }"],
  ["another fable's lesson is accepted", 'core', "if (c.kind === 'moral') { st.done = true;", "if (c.kind === 'moral' || c.kind === 'other') { st.done = true;"],
  ['Retell accepts a wrong order', 'core', 'if (same(st.order, [0, 1, 2])) { st.retold = true;', 'if (true) { st.retold = true;'],
  ['Retell may start in order', 'core', 'if (!p || p.length !== 3 || same(p, [0, 1, 2])) p = [2, 0, 1];', 'if (!p || p.length !== 3) p = [2, 0, 1];'],
  ['the lesson always in the first slot', 'core', 'slot = opts.slot == null ? SLOTS[n][r] : opts.slot % n;', 'slot = 0;'],
  ['the light shows before Check', 'core', 'st.lantern = st.lantern === i ? null : i; help0(st);', 'st.lantern = st.lantern === i ? null : i; help0(st); if (st.lantern != null) st.light = lightOf(st.cards[i].kind, st.F.pane);'],
  ['the same order every pass', 'core', 'if (!same(c, prev)) { o = c; break; }', 'if (!same(c, prev)) { o = prev || c; break; }'],
  ['the first card stays in the lantern', 'core', 'st.lantern = st.lantern === i ? null : i;', 'st.lantern = st.lantern == null ? i : st.lantern;'],
  ['the help before miss 2', 'core', "return !st.done && st.show >= 2 && ['detail', 'wrong', 'other']", "return !st.done && st.show >= 1 && ['detail', 'wrong', 'other']"],
  ['the slot table does not move with the pass', 'core', 'return (SLOTS[n][r] + pass) % n;', 'return SLOTS[n][r] % n;'],
  ['a hint prints a digit', 'act', 'en:"Put a card in the lantern."', 'en:"Put 1 card in the lantern."'],
  ['an unused variable (control)', 'core', "  var TASKS = ['lesson', 'retell']", "  var UNUSED_CONTROL = 0; var TASKS = ['lesson', 'retell']"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jl-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { JL_CORE_DIR: dir, JL_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-juniper-story-lantern: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
