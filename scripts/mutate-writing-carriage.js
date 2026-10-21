#!/usr/bin/env node
/* =====================================================================
   mutate-writing-carriage.js — does verify-writing-carriage-core.js BITE?
   Run: node scripts/mutate-writing-carriage.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The glide, the ink, the wall and the pointer are rendering properties,
   gated by local-test-writing-carriage.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'writing-carriage-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'writing-carriage-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-writing-carriage-core.js');
const SV = '"sv":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Å","Ä","Ö"]';
const MUTATIONS = [
  ['the paper moves on an unfinished letter',     "    if (res === 'incomplete') {", "    if (false) {"],
  ['a backwards O is not a wrong-end line',       "(cur.far || wrongWay(cur, Ln, cur.from))", "(cur.far)"],
  ['a wrong-end line keeps its credit',          "        st.tr.u = cur.from; while (st.tr.i > 0 && Ln.cum[st.tr.i] > cur.from) st.tr.i--; if (!cur.from) st.tr.n = 0;", ""],
  ['writing judged as tightly as tracing',        "var WRITE_CORRIDOR = Math.round(S.CORRIDOR * 1.3 * 10) / 10;", "var WRITE_CORRIDOR = S.CORRIDOR;"],
  ['the write step skipped',                      ": practice === 'tww' ? ['trace', 'write', 'write'] : ['trace', 'write'];", ": practice === 'tww' ? ['trace', 'write', 'write'] : ['trace'];"],
  ['a pad round is traced too',                   ": pad ? ['write']", ": pad ? ['trace', 'write']"],
  ['the mark written first',                      "return EXTRA[ch] || (A.GLYPHS", "return (EXTRA[ch] && EXTRA[ch].slice().reverse()) || (A.GLYPHS"],
  ['sv: Ä before Å',                              SV, SV.replace('"Å","Ä","Ö"]', '"Ä","Å","Ö"]')],
  ['es: Ñ dropped',                               '"M","N","Ñ","O","P","Q","R","S"', '"M","N","O","P","Q","R","S"'],
  ['it: Y not a foreign letter',                  '"foreign":["J","K","W","X","Y"]', '"foreign":["J","K","W","X"]'],
  ['the ruling ignored (one default for all)',    "function ruling(loc) { return RULING[locale(loc)] || RULING['default']; }", "function ruling(loc) { return RULING['default']; }"],
  ['pass 2 repeats pass 1',                       "      if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;", "      if (false) continue;"],
  ['pass 1 not in alphabet order',                "    if (!pass) return all.slice();", "    if (!pass) return shuffle(all.slice(), rnd);"],
  ['a short vowel set not padded',                "while (out.length < 7)", "while (out.length < 5)"],
  ['an empty Check counts as a miss',             "    if (!drawn) { st.show = true;", "    if (!drawn) { st.misses++; st.show = true;"],
  ['a second write miss stays a write',           "    if (st.help >= 2 && kind(st) === 'write') {", "    if (false) {"],
  ['a new stroke keeps the help',                 "    st.ink.push(st.cur); st.show = false; st.last = null;", "    st.ink.push(st.cur);"],
  ['the eraser counts a miss',                    "  function erase(st) { if (st.done) return false; newStep(st);", "  function erase(st) { if (st.done) return false; st.misses++; newStep(st);"],
  ['the write help is the light, not the shadow', "    return kind(st) === 'write' ? { shadow: true } : { light: true, stroke: st.tr.idx };", "    return { light: true, stroke: st.tr.idx };"],
  ['the x-height below its floor at 704',         "var xh = wide ? 84 : tiny ? 58 : 64", "var xh = wide ? 80 : tiny ? 58 : 64"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wc-mut-'));
  fs.writeFileSync(path.join(dir, 'writing-carriage-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'writing-carriage-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { WC_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-writing-carriage: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
