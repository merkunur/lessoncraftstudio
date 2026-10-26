#!/usr/bin/env node
/* =====================================================================
   mutate-pronoun-prism.js — does verify-pronoun-prism-core.js BITE?
   Run: node scripts/mutate-pronoun-prism.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the prisms, the gap, the arrow, the threads, the bins
   — is gated by local-test-pronoun-prism.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'pronoun-prism-core.js', act: 'pronoun-prism-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-pronoun-prism-core.js');
const MUTATIONS = [
  ['the wrong person passes', 'core', 'if (st.placed === rd.person && (fi === rd.ji ||', 'if ((fi === rd.ji ||'],
  ['the wrong face passes', 'core', 'if (st.placed === rd.person && (fi === rd.ji ||', 'if (st.placed === rd.person && (true ||'],
  ['one-or-more never told apart', 'core', "reason = COUNT[st.placed] !== COUNT[rd.person] ? 'count' : 'who';", "reason = 'who';"],
  ['no cover-the-name test', 'core', "else if (rd.comp && rd.ji === 0 && fi === 1) reason = 'cover';", ''],
  ['the owner-alone level shows the owner face', 'core', 'lv.alone ? ((x.a && x.a[p]) || f[3])', 'lv.alone ? f[2]'],
  ['the owner word ignores the thing', 'core', '((x.o && x.o[p]) || f[2])', 'f[2]'],
  ['en: "Pat saw ___" asks for she', 'core', '"s":"Pat [saw] {p} at the park.","ref":"Ben","person":"he"', '"s":"Pat [saw] {p} at the park.","ref":"Ben","person":"she"'],
  ['de: the she- and they-prisms in one tray', 'core', '"s":"{p} [fand] eine Muschel.","ref":"Mia","person":"she","job":"doer","tray":["he","she","I"]', '"s":"{p} [fand] eine Muschel.","ref":"Mia","person":"she","job":"doer","tray":["she","they","I"]'],
  ['en: a unisex referent', 'core', '"s":"{p} [ran] to the den.","ref":"Ben"', '"s":"{p} [ran] to the den.","ref":"Sam"'],
  ['fr: son on two prisms', 'core', '"s":"C’est {p} <ballon> rouge.","ref":"Léo","person":"he","job":"own","tray":["he","they","I"]', '"s":"C’est {p} <ballon> rouge.","ref":"Léo","person":"he","job":"own","tray":["he","she","they"]'],
  ['fi: a girl sorted as more than one', 'core', '{"n":"Venla","b":"he"}', '{"n":"Venla","b":"they"}'],
  ['en: the thread to the wrong boy', 'core', '"s2":"Tom gave *him* a pencil.","ans":["Leo"]', '"s2":"Tom gave *him* a pencil.","ans":["Tom"]'],
  ['de: the owner word in the wrong case', 'core', '"o":{"he":"seine","they":"ihre","I":"meine"}', '"o":{"he":"seine","they":"ihren","I":"meine"}'],
  ['wrong cards stay in their bins', 'core', 'wrong.forEach(function (i) { st.at[i] = null; });', ''],
  ['the glow from miss 1', 'core', "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 2; }", "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 1; }"],
  ['an empty gap is a miss', 'core', "if (st.placed == null) { st.last = 'empty';", "if (st.placed == null) { st.misses++; st.last = 'empty';"],
  ['the same order every pass', 'core', 'var c = shuffle(ids, rnd);', 'var c = ids.slice();'],
  ['three alike in a row', 'core', 'if (!same(c, prev) && !runs(loc, lvl, c))', 'if (!same(c, prev))'],
  ['turning does not roll round', 'core', 'st.face[p] = (st.face[p] + (dir < 0 ? 2 : 1)) % 3;', 'st.face[p] = Math.min(2, st.face[p] + 1);'],
  ['placing a prism twice keeps it', 'core', "if (st.placed === p) { st.placed = null; return 'out'; }", ''],
  ['a thread never unties', 'core', "if (i >= 0) { st.tied.splice(i, 1); return 'untied'; }", ''],
  ['a hint prints a digit', 'act', 'en:"Put a prism in the gap. Who is it, and what is their job?"', 'en:"Put 1 prism in the gap. Who is it, and what is their job?"'],
  ['an unused variable (control)', 'core', "  var JOBS = ['doer', 'obj', 'own'],", "  var UNUSED_CONTROL = 0; var JOBS = ['doer', 'obj', 'own'],"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vp-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { VP_CORE_DIR: dir, VP_ACT_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-pronoun-prism: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
