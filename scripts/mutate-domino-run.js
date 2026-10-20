#!/usr/bin/env node
/* =====================================================================
   mutate-domino-run.js — does verify-domino-run-core.js BITE?
   Run: node scripts/mutate-domino-run.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (The no-strip rule — the fallen tiles carry the syllables — is a
   rendering property, gated by local-test-domino-run.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'domino-run-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-domino-run-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the fallen overlap does not shrink',            "out.push(n < 3 ? 12 : Math.round(20 - 16 * (i - 1) / (n - 2)));", "out.push(12);"],
  ['an empty gap does not stop the run',            "    if (gap >= 0) { st.show = true; st.last = { result: 'stop', stoppedAt: gap }; return { right: false, kase: 'stop', stoppedAt: gap }; }\n", ""],
  ['an empty gap counted as a miss',                "    if (gap >= 0) { st.show = true; st.last = { result: 'stop', stoppedAt: gap };", "    if (gap >= 0) { miss(st, { result: 'stop', stoppedAt: gap });"],
  ['candidates without a same-word syllable',       "['mariposa', 2, 'ma', 'cle']", "['mariposa', 2, 'lu', 'cle']"],
  ['the gap always last',                           "['luna', 0, 'na', 'fa']", "['luna', 1, 'lu', 'fa']"],
  ['Ordena accepts any order',                      "    row.forEach(function (d, i) { if (d.s === i) stay.push(i); else bounced.push(i); });", "    row.forEach(function (d, i) { if (d.s >= 0) stay.push(i); else bounced.push(i); });"],
  ['the trick domino stays',                        "row.forEach(function (d, i) { if (d.s === i) stay.push(i); else bounced.push(i); });", "row.forEach(function (d, i) { if (d.s === i || d.s === -1) stay.push(i); else bounced.push(i); });"],
  ['the box starts in word order',                  "        if (n < 3 || (!inOrder(seq) && !reversed(seq))) break;", "        st.box = st.dominoes.map(function (d) { return d.id; }); break;"],
  ['count, too few: the syllables spread evenly',   "if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1);", "if (k > 0 && k < syl.length) out[0] = syl.slice(0, syl.length - k + 1);"],
  ['count, too many: blanks throw syllables',       "for (var i = 0; i < k; i++) out.push(i < syl.length ? [syl[i]] : []);", "for (var i = 0; i < k; i++) out.push([syl[i % syl.length]]);"],
  ['the spacing tied to something other than n',   "step = (x1 - x0) / Math.max(1, n);", "step = (x1 - x0) / 5;"],
  ['the fall interval constant',                    "out.push(n < 2 ? 260 : Math.round(260 - 140 * i / (n - 1)));", "out.push(200);"],
  ['sapo back on a toad',                           "luna|space/moon|lu-na;", "luna|space/moon|lu-na;sapo|forest creatures/toad|sa-po;"],
  ['an accent dropped from a tile',                 "avión|vehicles/airplane|a-vión;", "avión|vehicles/airplane|a-vion;"],
  ['the reshuffle may repeat an order',             "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  /* found in this build */
  ['a fixed domino can be moved',                   "    if (occ && domino(st, occ).fixed) return false;\n", ""],
  ['miss 2 does not pin the first syllable',        "    if (st.help >= 2 && st.marks[0] === null) {", "    if (false) {"],
  ['a pinned domino can be taken off',              "if (!id || domino(st, id).fixed || st.pinned.indexOf(mark) >= 0) return false;", "if (!id || domino(st, id).fixed) return false;"],
  ['more than six blanks',                          "st.blanks >= MAX_BLANKS", "st.blanks >= 9"],
  ['the wrong candidate stays on the gap',          "      st.marks[r.gap] = null; st.box.push(d0.id);\n", ""],
  ['a trick domino that is the word\'s own syllable', "['tortuga', 'bi']", "['tortuga', 'tu']"],
  ['the manzana trick domino back',               "['zanahoria', 'go']", "['zanahoria', 'man']"],
  ['the tortura trick domino back',               "['tortuga', 'bi']", "['tortuga', 'ra']"],
  ['the perita candidate back',                   "['pelota', 1, 'ta', 'za']", "['pelota', 1, 'ta', 'ri']"],
  ['pez back in the oral count',                  "var COUNT = ['sol', 'tigre', 'caracol', 'flor',", "var COUNT = ['sol', 'tigre', 'caracol', 'pez',"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'drn-mut-'));
  fs.writeFileSync(path.join(dir, 'domino-run-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { DRN_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-domino-run: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
