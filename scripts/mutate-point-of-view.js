#!/usr/bin/env node
/* =====================================================================
   mutate-point-of-view.js — does verify-point-of-view-core.js
   BITE? Run: node scripts/mutate-point-of-view.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the lighthouse, the windows, the views, the parts hanging beside their windows — is gated by local-test-point-of-view.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'point-of-view-core.js', act: 'point-of-view-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-point-of-view-core.js');
const MUTATIONS = [
  ['the middle window never answers', 'core', "if (st.sel === st.R.view) { st.done = true;", "if (st.sel === st.R.view && st.sel !== 'mid') { st.done = true;"],
  ['any window answers', 'core', "if (st.sel === st.R.view) { st.done = true;", "if (st.sel) { st.done = true;"],
  ['a part on a creature without it is accepted', 'core', "right = self.lines.map(function (l, i) { return st.hang[i] === winOf(self.chars, l.teller); });", "right = self.lines.map(function (l, i) { return !!st.hang[i]; });"],
  ['the right parts come back too', 'core', "if (ok) st.locked[i] = true; else { st.wrong.push({ i: i, win: at[i] }); st.hang[i] = null; }", "st.wrong.push({ i: i, win: at[i] }); st.hang[i] = null; if (ok) st.wrong.pop();"],
  ['the hint names the right creature, not the wrong one', 'core', "var w = st.wrong[0], l = st.R.lines[w.i], who = st.R.chars[w.win];", "var w = st.wrong[0], l = st.R.lines[w.i], who = l.teller;"],
  ['the views side by side before miss 2', 'core', "function help(st) { return !st.done && st.show >= 2 && st.last === 'miss'; }", "function help(st) { return !st.done && st.show >= 1 && st.last === 'miss'; }"],
  ['a new choice keeps the help', 'core', "function moved(st) { st.last = null; if (st.wrong) st.wrong = []; }", "function moved(st) { }"],
  ['an empty Check counts a miss', 'core', "if (!st.sel) { st.last = 'empty'; return { result: 'empty' }; }", "if (!st.sel) { st.last = 'empty'; st.misses++; return { result: 'empty' }; }"],
  ['one window three rounds in a row', 'core', "if (!same(c, prev) && (level !== 'window' || !threeInRow(c))) { o = c; break; }", "if (!same(c, prev)) { o = c; break; }"],
  ['the same order every pass', 'core', "if (!same(c, prev) && (level !== 'window' || !threeInRow(c))) { o = c; break; }", "if (!same(c, prev) && (level !== 'window' || !threeInRow(c))) { o = prev || c; break; }"],
  ['a line carries the words of another view', 'core', 'The boat looked like a tiny dot, far below me.', 'The boat looked like a tiny dot, far below me, straight across.'],
  ['a story line names a shared part', 'core', 'I curled my long thin tail and squeaked at the smell of cheese.', 'I curled my long thin tail and twitched my whiskers.'],
  ['the crab looks out at its own event', 'core', '"view":"low","chars":{"high":"rabbit","mid":"gull","low":"mouse"}},{"id":"jelly"', '"view":"low","chars":{"high":"rabbit","mid":"gull","low":"crab"}},{"id":"jelly"'],
  ['a hint prints a digit', 'act', 'en:"Tap a window to see what that creature sees."', 'en:"Tap 1 window to see what that creature sees."'],
  ['an unused variable (control)', 'core', "  var LEVELS = ['window', 'tellers'];", "  var UNUSED_CONTROL = 0; var LEVELS = ['window', 'tellers'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pv-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PV_CORE_DIR: dir, PV_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-point-of-view: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
