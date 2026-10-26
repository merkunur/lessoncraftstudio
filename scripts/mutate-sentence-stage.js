#!/usr/bin/env node
/* =====================================================================
   mutate-sentence-stage.js — does verify-sentence-stage-core.js BITE?
   Run: node scripts/mutate-sentence-stage.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the theatre, the curtains, the spotlights, the actors —
   is gated by local-test-sentence-stage.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'sentence-stage-core.js', act: 'sentence-stage-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-sentence-stage-core.js');
const MUTATIONS = [
  ['the stage skips any word, not only describing words', 'core', "rd.blocks[rd.canon[q]].r === 'a' && k > 0", 'k > 0'],
  ['a wrong first word is just "order"', 'core', "var reason = f === 0 ? 'start'", "var reason = f === 0 ? 'order'"],
  ['a part script is a miss', 'core', "if (st.rd.kind === 'build' && f.length < st.rd.n)", 'if (false)'],
  ['nothing on the line is a miss', 'core', "if (!f.length) { st.last = 'empty'; return { result: 'empty' }; }", ''],
  ['the start may lead the tray', 'core', 'if (tray[0] === rd.canon[0]) return false;', ''],
  ['the end may close the tray', 'core', 'if (tray[tray.length - 1] === rd.canon[rd.n - 1]) return false;', ''],
  ['level 5 (en de nl sv da no): the describing word after the noun', 'core', "dan: ['d', 'a*', 'n', 'v', 'e']", "dan: ['d', 'n', 'a*', 'v', 'e']"],
  ['"capital first, end last" may win', 'core', 'if (same(B[1], rd.canon)) return false;', ''],
  ['level 5 accepts a false describing word', 'core', 'if (bj.t === false)', "if (bj.t === false && bj.r !== 'a')"],
  ['level 5: the false naming word counts as true', 'core', "add(y.fnoun, 'n', { t: false", "add(y.fnoun, 'n', { t: true"],
  ['fr writes in the English order', 'core', '"tpl":"dna","rounds":[{"det":"Une"', '"tpl":"dan","rounds":[{"det":"Une"'],
  ['fr: no narrow space before ? and !', 'core', "b.w !== '.' ? ' ' : ''", "b.w !== '.' ? ' ' : ''"],
  ['es: a question without ¿', 'core', '{"w":"¿","r":"o"},{"w":"El","r":"d"},{"w":"gato"', '{"w":"El","r":"d"},{"w":"gato"'],
  ['de: the yellow bus returns', 'core', '{"w":"blaue","r":"a","a":"blue"}', '{"w":"gelbe","r":"a","a":"yellow"}'],
  ['the glow from miss 1', 'core', 'st.show >= 2 && st.freeze ? st.freeze.want : null', 'st.show >= 1 && st.freeze ? st.freeze.want : null'],
  ['a picture in the wrong case', 'core', '"apple":"At the Supermarket/apple"', '"apple":"at the Supermarket/apple"'],
  ['a hint prints a digit', 'act', 'missWho: {en:"Who is doing it? The actor comes on before the doing word."', 'missWho: {en:"Who is doing it? The 1 actor comes on before the doing word."'],
  ['an unused variable (control)', 'core', "  function levels() { return ['1', '2', '3', '4', '5']; }", "  var UNUSED_CONTROL = 0; function levels() { return ['1', '2', '3', '4', '5']; }"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ss-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SS_CORE_DIR: dir, SS_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-sentence-stage: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
