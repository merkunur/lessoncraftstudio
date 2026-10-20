#!/usr/bin/env node
/* =====================================================================
   mutate-marble-run.js — does verify-marble-run-core.js BITE?
   Run: node scripts/mutate-marble-run.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The rolling marble, the jar, the strip's letters and the shadow
   outlines are rendering properties, gated by local-test-marble-run.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'marble-run-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-marble-run-core.js');
const MUTATIONS = [
  /* the design's list */
  ['lands with a wrong order',                 "landed: read === r.w.word && entered.every(function (id, i) { return byId(st, id).own === i; }) };", "landed: entered.every(function (id) { return byId(st, id).own >= 0; }) };"],
  ['the marble climbs a step of 2',            "if (k > 0 && pc.step >= 2) {", "if (false) {"],
  ['the step capped at 1',                     "return Math.min(2, n); }", "return Math.min(1, n); }"],
  ['a gap ignored',                            "if (!id) { events.push({ place: k, kind: 'gap' });", "if (!id) { continue; events.push({ place: k, kind: 'gap' });"],
  ['y ä ö counted as consonants',              "VOWELS = 'aeiouyäö'", "VOWELS = 'aeiou'"],
  ['a decoy equal to a syllable of the word',  "['auto', ['ko', 'aurinko']]", "['auto', ['to', 'kettu']]"],
  ['the tray in word order',                   "if (n === 2) shuffle(p, rnd);\n    else if (n > 2) for (var t = 0; t < 400; t++) { shuffle(p, rnd); if (isDerangement(p)) break; }", ""],
  ['the shadow before miss 2',                 "return !st.done && st.show && st.help >= 2;", "return !st.done && st.show && st.help >= 1;"],
  ['the help kept after a move',               "function moved(st) { st.ride = null; st.show = false; st.last = null; }", "function moved(st) { st.ride = null; st.last = null; }"],
  ['pass 2 order = pass 1',                    "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['a legacy word dropped',                    ", ['sateenkaari', ['var', 'sateenvarjo']]", ""],
  /* found in this build */
  ['two pieces always swapped (a tell)',       "if (n === 2) shuffle(p, rnd);", "if (n === 2) p.reverse();"],
  ['the teddy back as karhu',                  "karhu|camping/bear|kar-hu", "karhu|forest creatures/bear|kar-hu"],
  ['the cake slice back',                      "kakku|4th of July/cake|kak-ku", "kakku|bakery/cake|kak-ku"],
  ['a loanword in the rule level',             "['sukka', 'su-kka']];", "['sukka', 'su-kka'], ['seepra', 'see-pra']];"],
  ['Houkutuspala ei still deals the decoy',    "else if (opts.decoy !== false) extra.push(", "else extra.push("],
  ['Houkutuspala ei removes the wrong split',  "if (r.level === 'guard') r.extra.forEach(", "if (r.level === 'guard' && opts.decoy !== false) r.extra.forEach("],
  ['an empty place 1 counted as a miss',       "if (!st.places[0]) { st.show = true; st.last = { result: 'nostart' };", "if (!st.places[0]) { st.misses++; st.show = true; st.last = { result: 'nostart' };"],
  ['too short reported as order',              "else if (ride.entered.length < n) kase = 'short';", ""],
  ['a swap loses the other piece',             "if (from >= 0) st.places[from] = occ;", "if (from >= 0) st.places[from] = null;"],
  ['every decoy called a length difference',   "kase = lengthOnly(ride.read, r.w.word) ? 'length' : 'other';", "kase = 'length';"],
  ['the pancake stack back',                   "mansikka|fruits/strawberry|man-sik-ka;", "pannukakku|breakfast/pancake|pan-nu-kak-ku;"],
  ['the first wrong letter one off',           "if (rd.read[i] !== w[i]) return Math.min(i, rd.read.length - 1);", "if (rd.read[i] !== w[i]) return Math.min(i + 1, rd.read.length - 1);"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tmr-mut-'));
  fs.writeFileSync(path.join(dir, 'marble-run-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TMR_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-marble-run: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
