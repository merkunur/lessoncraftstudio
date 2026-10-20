#!/usr/bin/env node
/* =====================================================================
   mutate-stepping-stones.js — does verify-stepping-stones-core.js BITE?
   Run: node scripts/mutate-stepping-stones.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate must
   be green on the CLEAN core first. CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'stepping-stones-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-stepping-stones-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the paintbrush shown as borste',                "borste||bors-te;", "borste|around the house/brush|bors-te;"],
  ['a written word shown as no word',               "return { kind: w.pic ? 'picture' : 'word', word: made, pic: w.pic };", "return { kind: w.pic ? 'picture' : 'none', word: made, pic: w.pic };"],
  ['the spacing tied to something other than n',   "step = (x1 - x0) / Math.max(1, n);", "step = (x1 - x0) / 4;"],
  ['too few stones: the syllables spread evenly',  "if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1);", "if (k > 0 && k < syl.length) out[0] = syl.slice(0, syl.length - k + 1);"],
  ['blank stones hold the frog',                    "      if (k === n) return win(st);", "      if (k >= n) return win(st);"],
  ['build accepts any order',                       "      if (prefix === st.row.length) {\n        if (prefix === n) return win(st);", "      if (st.row.length === n && st.row.every(function (id) { return stone(st, id).s >= 0; })) return win(st);\n      if (prefix === st.row.length) {\n        if (prefix === n) return win(st);"],
  ['the trick stone accepted',                      "while (prefix < st.row.length && stone(st, st.row[prefix]).s === prefix) prefix++;", "while (prefix < st.row.length && (stone(st, st.row[prefix]).s === prefix || stone(st, st.row[prefix]).s === -1)) prefix++;"],
  ['hidden accepts lifting any stone',              "if (what.kind === 'target') return win(st);", "if (what.kind === 'target' || st.lifted.length) return win(st);"],
  ['hidden "made" read from the target',            "var made = kept(st).map(function (s) { return s.text; }).join(''), what", "var made = r.target.word, what"],
  ['flicka back on toys/girl',                      "katt|animals/cat|katt;", "flicka|toys/girl|flick-a;"],
  ['sol back on weather/sun',                       "sol|beach/sun|sol;", "sol|weather/sun|sol;"],
  ['a sound-out split made typographic',            "klocka|christmas/bell|klock-a;", "klocka|christmas/bell|klo-cka;"],
  ['the reshuffle may repeat an order',             "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['miss 2 glows every pile stone',                 "if (st.r.level === 'build') return st.last.next ? [st.last.next] : [];", "if (st.r.level === 'build') return st.pile.slice();"],
  /* found in this build */
  ['the teddy bear back',                           "katt|animals/cat|katt;", "björn|camping/bear|björn;"],
  ['the maning trick stone back',                   "['klänning', 'tor']", "['klänning', 'ma']"],
  ['fladder shown as no word',                      "others: ['fladder'] }", "others: [] }"],
  ['te (tea) shown as no word',                     "others: ['borste', 'te'] }", "others: ['borste'] }"],
  ['hop shown as no word',                          "others: ['hoppa', 'hop'] }", "others: ['hoppa'] }"],
  ['the orange fish as fisk',                       "fisk|At the Supermarket/fish|fisk;", "fisk|animals/fish|fisk;"],
  ['three stones may lie reversed in the pile',     "if (!inOrder(seq) && !reversed(seq)) return o;", "if (!inOrder(seq)) return o;"],
  ['the lifted stones stay lifted after a miss',    "    st.lifted = [];  /* the lifted stones splash back into place */\n", ""],
  ['hidden miss 2 glows the stones to lift',        "return st.stones.filter(function (s, i) { return st.r.lift.indexOf(i) < 0; })", "return st.stones.filter(function (s, i) { return st.r.lift.indexOf(i) >= 0; })"],
  ['more than six stones',                          "st.laid >= MAX_STONES", "st.laid >= 9"],
  ['a right beginning counted as a miss',           "        st.show = true; st.last = { result: 'more', prefix: prefix }; return { right: false, kase: 'more' };", "        miss(st, { result: 'more', prefix: prefix }); return { right: false, kase: 'more' };"],
  ['the nod comes a miss late',                     "if (L === 'count') return st.help >= 2 ? 'hintNod' :", "if (L === 'count') return st.help >= 3 ? 'hintNod' :"],
  ['the tipped stones stay in the row',             "st.row = st.row.slice(0, prefix); st.pile = st.pile.concat(tipped);", "st.pile = st.pile.concat([]);"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sst-mut-'));
  fs.writeFileSync(path.join(dir, 'stepping-stones-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SST_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-stepping-stones: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
