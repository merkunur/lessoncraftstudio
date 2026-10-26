#!/usr/bin/env node
/* =====================================================================
   mutate-event-tunnel.js — does verify-event-tunnel-core.js BITE?
   Run: node scripts/mutate-event-tunnel.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the road, the tunnels, the lantern, the cards — is
   gated by local-test-event-tunnel.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'event-tunnel-core.js', act: 'event-tunnel-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-event-tunnel-core.js');
const MUTATIONS = [
  ['any phrase passes', 'core', "reason = st.chosen === rd.stretch ? null : 'lit-' + st.chosen;", 'reason = null;'],
  ['level 3 accepts the wrong stretch', 'core', "reason = st.at === rd.stretch ? null : 'place';", 'reason = null;'],
  ['wrong plan cards stay on the road', 'core', 'if (st.at[i] !== rd.items[i].target) { st.at[i] = null; wrong++; }', 'if (st.at[i] !== rd.items[i].target) { wrong++; }'],
  ['during lights the front stretch', 'core', "target: (it.w === 'b' ? 'b' : it.w === 'a' ? 'a' : 'd') + (it.ev + 1)", "target: (it.w === 'a' ? 'a' : 'b') + (it.ev + 1)"],
  ['a stretch holds two cards', 'core', 'var j = st.at.indexOf(z); if (j >= 0 && j !== st.sel) st.at[j] = null;', ''],
  ['the rack in fixed road order', 'core', 'slots[w] = shuffle([0, 1, 2], rnd);', 'slots[w] = [0, 0, 0].map(function () { return WORDS.indexOf(w); });'],
  ['three alike in a row', 'core', 'if (!same(c, prev) && !runs(loc, lvl, c))', 'if (!same(c, prev))'],
  ['the glow from miss 1', 'core', "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 2; }", "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 1; }"],
  ['nothing chosen is a miss', 'core', "if (st.chosen == null) { st.last = 'empty'; return { result: 'empty' }; }", "if (st.chosen == null) { st.misses++; st.last = 'empty'; return { result: 'empty' }; }"],
  ['es: antes de el (unfused)', 'core', '"[antes del] viaje"', '"[antes de] el viaje"'],
  ['de: während with the dative', 'core', '"[während] des Laufs"', '"[während] dem Lauf"'],
  ['fi: aikana after the partitive', 'core', '"juoksun [aikana]"', '"juoksua [aikana]"'],
  ['it: prima di (no article)', 'core', '"[prima della] corsa"', '"[prima di] corsa"'],
  ['balance broken', 'core', '{"ev":"rain","tpl":"We put on our boots {g}.","s":"b"}', '{"ev":"rain","tpl":"We put on our boots {g}.","s":"d"}'],
  ['level 4: after T1 written', 'core', '{"tpl":"We dream {g}.","ev":1,"w":"d"}', '{"tpl":"We dream {g}.","ev":0,"w":"a"}'],
  ['a picture in the wrong case', 'core', '"bath":"around the house/bathtub"', '"bath":"Around the house/bathtub"'],
  ['a hint prints a digit', 'act', 'hintPick: {en:"Look where the card stands on the road. Is it before the tunnel, inside it, or after it?"', 'hintPick: {en:"Look where the 1 card stands on the road. Is it before the tunnel, inside it, or after it?"'],
  ['an unused variable (control)', 'core', "  var WORDS = ['b', 'd', 'a'];", "  var UNUSED_CONTROL = 0; var WORDS = ['b', 'd', 'a'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'et-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { ET_CORE_DIR: dir, ET_ACT_DIR: dir }), timeout: 180000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-event-tunnel: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
