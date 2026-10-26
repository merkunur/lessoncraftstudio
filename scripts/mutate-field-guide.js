#!/usr/bin/env node
/* =====================================================================
   mutate-field-guide.js — does verify-field-guide-core.js BITE?
   Run: node scripts/mutate-field-guide.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the book, the riffle, the flaps, the leader lines, the
   tabs and the screen book — is gated by local-test-field-guide.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'field-guide-core.js', act: 'field-guide-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-field-guide-core.js');
const MUTATIONS = [
  ['a wrong line opens the right page', 'core', '    st.opened = part;\n    if (part === st.rd.part) { clear(st); return \'right\'; }', '    st.opened = st.rd.part;\n    if (part === st.rd.part) { clear(st); return \'right\'; }'],
  ['any sentence on the right page ends the round', 'core', 'if (part === st.rd.part && i === FACT)', 'if (part === st.rd.part)'],
  ['the fact is the page\'s first sentence', 'core', 'var FACT = 1;', 'var FACT = 0;'],
  ['the index is not alphabetical', 'core', '.sort(function (a, b) { return col.compare(plain(a.topic), plain(b.topic)); })', ''],
  ['the glossary is not alphabetical', 'core', '.sort(function (a, b) { return col.compare(a.name, b.name); })', ''],
  ['es/pt books get an index tab', 'core', 'function hasIndex(loc) { return !!DATA[locale(loc)].feat.index; }', 'function hasIndex(loc) { return true; }'],
  ['a picture\'s answer label moves to the middle', 'core', '"pic":"pelican","order":["beak","wings","feet"]', '"pic":"pelican","order":["beak","feet","wings"]'],
  ['a label points at empty space', 'core', '"antennae":[0.441,0.36]', '"antennae":[0.441,0.2]'],
  ['an invented name is a real word (sv sten)', 'core', '"plib":["Plib","allt om att [gömma sig]"', '"plib":["Sten","allt om att [gömma sig]"'],
  ['the index lists part names, not topics', 'core', '"Frell","all about [glowing]","[glowing]"', '"Frell","all about [glowing]","[Frell]"'],
  ['a sibling\'s fact carries another part\'s job', 'core', 'The Gribbet digs in the mud with its mipp.', 'The Gribbet digs and glows in the mud with its mipp.'],
  ['a question asks for another part\'s job', 'core', 'Which chapter is about how the Gribbet can [glow]?', 'Which chapter is about how the Gribbet can [swim]?'],
  ['the same order every pass', 'core', 'var c = shuffle(ids, rnd);', 'var c = ids.slice();'],
  ['Level D draws the same picture round twice', 'core', "refs[7] = { lvl: 'C', r: cs[1] };", "refs[7] = { lvl: 'C', r: cs[0] };"],
  ['the same wrong choice counts as a new miss', 'core', 'if (!st.tried[choice]) { st.tried[choice] = true; st.misses++; }', 'st.misses++;'],
  ['help from the start marks the match', 'core', "function marksMatch(st) { return !st.done && st.show >= 2 && st.last === 'miss'; }", "function marksMatch(st) { return !st.done && (st.helpStart || (st.show >= 2 && st.last === 'miss')); }"],
  ['the glossary opens without the bold word', 'core', "(st.kind === 'bold' && !st.glossOpen)", 'false'],
  ['a closed caption can be chosen', 'core', "if (st.done || st.kind !== 'label' || !st.labels[key]) return 'no';", "if (st.done || st.kind !== 'label') return 'no';"],
  ['a hint prints a digit', 'act', 'en:"Find the line with the same words as the question. Then tap it."', 'en:"Find the 1 line with the same words as the question. Then tap it."'],
  ['an unused variable (control)', 'core', "  var LEVELS = ['A', 'B', 'C', 'D'];", "  var UNUSED_CONTROL = 0; var LEVELS = ['A', 'B', 'C', 'D'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fg-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FG_CORE_DIR: dir, FG_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-field-guide: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
