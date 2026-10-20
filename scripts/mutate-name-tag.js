#!/usr/bin/env node
/* =====================================================================
   mutate-name-tag.js — does verify-name-tag-core.js BITE?
   Run: node scripts/mutate-name-tag.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (The press, the peel animation and the drag are rendering properties,
   gated by local-test-name-tag.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'name-tag-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-name-tag-core.js');
const line = (re) => { const m = SRC.match(re); if (!m) throw new Error('no needle ' + re); return m[0]; };
const syl = line(/'pen·cil\|pen·guin\|[^']*'/);
const MUTATIONS = [
  /* the design's list */
  ['sticks on a first-letter match only',           "var full = k === tagUnits.length && k === nameUnits.length;", "var full = k >= 1;"],
  ['sticks fully when all but one letter match',    "var full = k === tagUnits.length && k === nameUnits.length;", "var full = k >= tagUnits.length - 1 && tagUnits.length === nameUnits.length;"],
  ['compares right to left',                        "var k = 0; while (k < tagUnits.length && k < nameUnits.length && tagUnits[k] === nameUnits[k]) k++;", "var k = 0; while (k < tagUnits.length && k < nameUnits.length && tagUnits[tagUnits.length - 1 - k] === nameUnits[nameUnits.length - 1 - k]) k++;"],
  ['peels at the right letter but reports one more', "return { stuck: k, full: full, peelAt: full ? -1 : k, short: !full && k === tagUnits.length };", "return { stuck: full ? k : k + 1, full: full, peelAt: full ? -1 : k, short: !full && k === tagUnits.length };"],
  ['case-sensitive (de Ball ≠ ball)',               "function units(w) { return Array.from(String(w).normalize('NFC').toLocaleLowerCase()); }", "function units(w) { return Array.from(String(w).normalize('NFC')); }"],
  ['a mark folded away (ö = o)',                    "function units(w) { return Array.from(String(w).normalize('NFC').toLocaleLowerCase()); }", "function units(w) { return Array.from(String(w).normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLocaleLowerCase()); }"],
  ['a family extra accepted (a wrong tag locks)',   "tests.forEach(function (x, t) { if (x.full) st.locked[t] = true;", "tests.forEach(function (x, t) { if (x.full || x.stuck >= 1) st.locked[t] = true;"],
  ['a syllable split not from the file',            syl, syl.replace('pen·cil|', 'pe·ncil|')],
  ['the target always top-left',                    "var lay = [0, 0, 0, 0]; lay[t] = 0; lay[nf] = 1;", "t = 0; nf = side[i] ? 1 : 3; var lay = [0, 0, 0, 0]; lay[t] = 0; lay[nf] = 1;"],
  ['the help at miss 1',                            "function helpOn(st) { return !st.done && st.show && st.help >= 2 && st.last && st.last.result === 'peel'; }", "function helpOn(st) { return !st.done && st.show && st.help >= 1 && st.last && st.last.result === 'peel'; }"],
  ['the help kept after a move',                    "function moved(st) { st.show = false; st.last = null; }", "function moved(st) { }"],
  ['pass 2 order = pass 1',                         "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  /* found in this build */
  ['the nearest look-alike never beside the target', "var nf = side[i] ? NEIGH[t][Math.floor(rnd() * 2)] : DIAG[t];", "var nf = DIAG[t];"],
  ['a wrong family tag stays on its picture',       "peels.forEach(function (p) { st.hung[p.tag] = -1; });", "void peels;"],
  ['a memory pair accepted by kind alone',          "if (a.kind !== b.kind && a.i === b.i) {", "if (a.kind !== b.kind) {"],
  ['a half-built syllable tag can hang',            " || t < 0 || t >= st.hung.length || !tagReady(st)) return false;", " || t < 0 || t >= st.hung.length) return false;"],
  ['a refused picture back (the ox)',               "'cat': 'animals/cat'", "'cat': 'farm animals/ox'"],
  ['a German noun printed lower-case',              "return loc === 'de' ? key.charAt(0).toLocaleUpperCase('de') + key.slice(1) : key;", "return key;"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ntg-mut-'));
  fs.writeFileSync(path.join(dir, 'name-tag-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { NTG_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-name-tag: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
