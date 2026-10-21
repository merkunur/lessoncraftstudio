#!/usr/bin/env node
/* =====================================================================
   mutate-word-keys.js — does verify-word-keys-core.js BITE?
   Run: node scripts/mutate-word-keys.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (The key's turn, the drag and the pager are rendering properties,
   gated by local-test-word-keys.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'word-keys-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-word-keys-core.js');
const MUTATIONS = [
  ['the lock opens for the right letters in the wrong order', "function opens(key, answer) { return String(key).normalize('NFC') === String(answer).normalize('NFC'); }", "function opens(key, answer) { return Array.from(String(key)).sort().join() === Array.from(String(answer)).sort().join(); }"],
  ['the lock opens for a key one tooth too long',            "function opens(key, answer) { return String(key).normalize('NFC') === String(answer).normalize('NFC'); }", "function opens(key, answer) { return String(key).indexOf(String(answer)) === 0; }"],
  ['the lock opens for a key one tooth too short',           "function opens(key, answer) { return String(key).normalize('NFC') === String(answer).normalize('NFC'); }", "function opens(key, answer) { return String(key).length && String(answer).indexOf(String(key)) === 0; }"],
  ['accents ignored (é = e)',                                 "function opens(key, answer) { return String(key).normalize('NFC') === String(answer).normalize('NFC'); }", "function opens(key, answer) { return base(key) === base(answer); }"],
  ['the glass lock at miss 1',                                "glass: st.help >= 2, ghost: st.help >= 3", "glass: st.help >= 1, ghost: st.help >= 3"],
  ['ghost letters at miss 2',                                 "glass: st.help >= 2, ghost: st.help >= 3", "glass: st.help >= 2, ghost: st.help >= 2"],
  ['Turn with no key counts a miss',                          "if (!tried.length) { st.show = true; st.last = { result: 'empty' };", "if (!tried.length) { st.misses++; st.show = true; st.last = { result: 'empty' };"],
  ['the right key always on the middle peg',                  "keys.push(s === pegs[k] ? r.target : looks[li++]);", "keys.push(s === 1 ? r.target : looks[li++]);"],
  ['the ring rail in the order of the locks',                 "var forms = [[1, 2, 0], [2, 0, 1]], start", "var forms = [[0, 1, 2], [2, 0, 1]], start"],
  ['the tray may spell the word',                             "if (!spellsInOrder(tiles, need)) break; }", "break; }"],
  ['the tray drops a letter of the word',                     "var tiles = need.concat(extra.slice(0, Math.max(0, TRAY - need.length)));", "var tiles = need.slice(1).concat(extra.slice(0, Math.max(0, TRAY - need.length + 1)));"],
  ['the help kept after a move',                              "function moved(st) { st.show = false; st.last = null; }", "function moved(st) { }"],
  ['an opened lock takes another key',                        "li >= st.r.locks.length || st.opened[li] || st.keys.indexOf(key) < 0) return false;", "li >= st.r.locks.length || st.keys.indexOf(key) < 0) return false;"],
  ['the first-letter look-alike may be left out',             "if (!cand.length) cand = [0, 1, 2];", "cand = [0, 1, 2];"],
  ['more than 7 teeth cut',                                   "st.cut.length >= 7 ||", "st.cut.length >= 9 ||"],
  ['an old target dropped',                                   "'who|how why hot'", "'how|who why hot'"],
  ['a rejected frame shipped',                                "'animals/cat|The cat _ on the bed.'", "'animals/cat|The cat is _ the bed.'"],
  ['a sentence picture in black and white',                   "'animals/duck|One _ the ducks can swim.'", "'animals bw/duck|One _ the ducks can swim.'"],
  ['a look-alike the middle-length bot reads (fr son)',       "'son|salon sol sont'", "'son|sel sol sont'"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wky-mut-'));
  fs.writeFileSync(path.join(dir, 'word-keys-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { WKY_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-word-keys: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
