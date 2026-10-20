#!/usr/bin/env node
/* =====================================================================
   mutate-lacing-board.js — does verify-lacing-board-core.js BITE?
   Run: node scripts/mutate-lacing-board.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (The DOM order of the buttons — cell order, never word order — is a
   rendering property, gated by local-test-lacing-board.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'lacing-board-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-lacing-board-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a shown split differs from the gated split',    "klokke|around the house/clock|klok-ke;", "klokke|around the house/clock|klo-kke;"],
  ['tannbørste shown',                              "traktor|vehicles/tractor|trak-tor;", "traktor|vehicles/tractor|trak-tor;tannbørste|around the house/toothbrush|tann-børs-te;"],
  ['the blueberry (read as a ball) back',           "'snømann', 'traktor', 'solsikke'", "'snømann', 'blåbær', 'solsikke'"],
  ['tighten keeps every right-in-place button',     "    st.path = st.path.slice(0, prefix);\n", "    st.path = st.path.filter(function (id, i) { return button(st, id).s === i; });\n"],
  ['tighten accepts any order',                     "    if (prefix === st.path.length) {", "    if (st.path.length === n && st.path.every(function (id) { return button(st, id).s >= 0; })) return win(st);\n    if (prefix === st.path.length) {"],
  ['a decoy accepted',                              "while (prefix < st.path.length && button(st, st.path[prefix]).s === prefix) prefix++;", "while (prefix < st.path.length && (button(st, st.path[prefix]).s === prefix || button(st, st.path[prefix]).s === -1)) prefix++;"],
  ['buttons laid out in word order',                "      if (st.r.level === 'count' || n < 3) return st;", "      st.buttons.forEach(function (b, q) { b.cell = q; });\n      if (st.r.level === 'count' || n < 3) return st;"],
  ['the nearest-next path may spell the word',      "if (!inOrder(ro) && !reversed(ro) && !inOrder(go)) return st;", "if (!inOrder(ro) && !reversed(ro)) return st;"],
  ['three syllables may lie reversed',              "if (!inOrder(ro) && !reversed(ro) && !inOrder(go)) return st;", "if (!inOrder(ro) && !inOrder(go)) return st;"],
  ['unthread removes any button',                   "st.path.pop(); moved(st); return true; }", "st.path.shift(); moved(st); return true; }"],
  ['count, too few: syllables spread evenly',       "if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1);", "if (k > 0 && k < syl.length) out[0] = syl.slice(0, syl.length - k + 1);"],
  ['count, too many: the extras printed',           "for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []);", "for (var i = 0; i < k; i++) out.push([syl[i % syl.length]]);"],
  ['miss 2 glows from miss 1',                      "st.show && st.help >= 2 && st.last && st.last.next", "st.show && st.help >= 1 && st.last && st.last.next"],
  ['the reshuffle may repeat an order',             "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  /* the deal, the levels, the feedback */
  ['the merke decoy back',                          "['sommerfugl', 'tor', 'ply']", "['sommerfugl', 'ke', 'ply']"],
  ['the vannfugl decoy back',                       "['vannmelon', 'ger', 'kop']", "['vannmelon', 'ger', 'fugl']"],
  ['fugl beside the penguin',                       "['pingvin', 'lon', 'ra']", "['pingvin', 'fugl', 'ra']"],
  ['the teddy-like bear back',                      "gris|animals/pig|gris;", "bjørn|camping/bear|bjørn;"],
  ['a decoy that is the word\'s own syllable',      "['gresskar', 'ply', 'ti']", "['gresskar', 'kar', 'ti']"],
  ['a right beginning counted as a miss',           "      st.show = true; st.last = { result: 'more', prefix: prefix }; return { right: false, kase: 'more' };", "      miss(st, { result: 'more', prefix: prefix }); return { right: false, kase: 'more' };"],
  ['the count level obeys "in a row"',              "row: r.level !== 'count' && opts.row === true", "row: opts.row === true"],
  ['the thread level carries decoys',               "var d = r.level === 'decoy' ? Math.max(0,", "var d = r.level !== 'count' ? Math.max(0,"],
  ['two syllables always reversed (a tell)',        "      if (st.r.level === 'count' || n < 3) return st;", "      if (st.r.level === 'count') return st;\n      if (n < 3) { if (inOrder(readingOrder(st))) continue; return st; }"],
  ['the count hint ladder skips the clap',          "if (L === 'count') return st.help >= 2 ? 'hintClap' :", "if (L === 'count') return st.help >= 3 ? 'hintClap' :"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lc-mut-'));
  fs.writeFileSync(path.join(dir, 'lacing-board-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LC_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-lacing-board: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
