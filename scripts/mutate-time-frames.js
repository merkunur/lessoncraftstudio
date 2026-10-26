#!/usr/bin/env node
/* =====================================================================
   mutate-time-frames.js — does verify-time-frames-core.js BITE?
   Run: node scripts/mutate-time-frames.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the cards, the gap, the frames, the tower — is gated
   by local-test-time-frames.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'time-frames-core.js', act: 'time-frames-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-time-frames-core.js');
const MUTATIONS = [
  ['a shutter fits the album', 'core', "(fr === 'shutter' && (opening === 'window' || opening === 'post'))", "(fr === 'shutter')"],
  ['fi: the present is a plain window', 'core', "locale(loc) === 'fi' ? 'shutter' : 'window'", "'window'"],
  ['a future round offers the present', 'core', "if (!fi && x.time === 'future' && t === 'present') return;", ''],
  ['a present sentence is offered tomorrow', 'core', "if (x.tense === 'present' && t === 'future') return;", ''],
  ['fi: tomorrow wants a future card', 'core', "rd.right = x.time === 'future' && fi ? 'present' : x.time;", 'rd.right = x.time;'],
  ['sv/da/no: a present round deals the ska/skal card', 'core', "if (modal(loc) && x.time === 'present' && t === 'future') return;", ''],
  ['sv/da/no: a future sentence is offered "now"', 'core', "if (modal(loc) && x.tense === 'future' && t === 'present') return;", ''],
  ['the withheld card is dealt', 'core', "if (x.drop === t) return;\n        cards.push", '        cards.push'],
  ['every bump gives the album hint', 'core', "reason = d.opening === 'album' ? 'album' : d.opening === 'post' ? 'post' : 'window';", "reason = 'album';"],
  ['wrong photos stay on', 'core', 'else { st.link[p] = null; wrong++; }', 'else { wrong++; }'],
  ['any word is the verb', 'core', 'if (rd.words[st.sel].verb) {', 'if (true) {'],
  ['the base form must match case', 'core', 'if (lc(st.typed) === lc(rd.base)) return ok(st);', 'if (st.typed === rd.base) return ok(st);'],
  ['an empty gap is a miss', 'core', "if (st.gap == null) { st.last = 'empty';", "if (st.gap == null) { st.misses++; st.last = 'empty';"],
  ['the glow from miss 1', 'core', "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 2; }", "function glow(st) { return !st.done && st.last === 'miss' && st.show >= 1; }"],
  ['the same order every pass', 'core', 'var c = shuffle(ids, rnd);', 'var c = ids.slice();'],
  ['three alike in a row', 'core', 'if (!same(c, prev) && !runs(loc, lvl, c))', 'if (!same(c, prev))'],
  ['the right card always first', 'core', 'var at = (start + (seen[n] = (seen[n] || 0) + 1) - 1) % n;', 'var at = 0;'],
  ['en: a bare "now"', 'core', '"tw":{"past":"Yesterday","present":"Right now","future":"Tomorrow"}', '"tw":{"past":"Yesterday","present":"Now","future":"Tomorrow"}'],
  ['de: a future without werden', 'core', 'werden … streichen', 'streichen'],
  ['fi: a plural subject', 'core', '{"s":"[Eilen] vene {g} järvellä.","time":"past","p":"sailboat","n":1', '{"s":"[Eilen] vene {g} järvellä.","time":"past","p":"sailboat","n":2'],
  ['en: rode → rode', 'core', '"base":"ride"', '"base":"rode"'],
  ['en: a pair spelt the same', 'core', '"pairs":[["go","went"]', '"pairs":[["go","go"]'],
  ['a picture that is not there', 'core', '"duck":"farm animals/duck"', '"duck":"farm animals/ducks"'],
  ['a hint prints a digit', 'act', 'en:"Read the time word. When does it happen?"', 'en:"Read the 1 time word. When does it happen?"'],
  ['an unused variable (control)', 'core', "  var KINDS = ['pick', 'pick', 'time', 'pair', 'find', 'write'];", "  var UNUSED_CONTROL = 0; var KINDS = ['pick', 'pick', 'time', 'pair', 'find', 'write'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vt-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { VT_CORE_DIR: dir, VT_ACT_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-time-frames: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
