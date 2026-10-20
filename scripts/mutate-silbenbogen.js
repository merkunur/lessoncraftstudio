#!/usr/bin/env node
/* =====================================================================
   mutate-silbenbogen.js — does verify-silbenbogen-core.js BITE?
   Run: node scripts/mutate-silbenbogen.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip; the
   gate must be green on the CLEAN core first. CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'silbenbogen-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-silbenbogen-core.js');
const MUTATIONS = [
  /* the design's list */
  ['ride accepts bows ≠ syllables',               "    if (st.tray.length) reason = 'tooFew';\n    else if (empty) reason = 'tooMany';\n    else {", "    {"],
  ['ride accepts the wrong order',                 "if (card(st, st.beds[i]).s !== i) { stopAt = i; break; }", "void 0;"],
  ['2-syllable trays always reversed',             "    p = (r.k + (pass || 0)) % n;\n", "    p = n - 1;\n"],
  ['a hand split replaces a gated split (Bäk-ker)', "'baker|occupations/baker|Bäcker|bä-cker'", "'baker|occupations/baker|Bäcker|bäk-ker'"],
  ['a capitalised first card',                     "'cat|animals/cat|Katze|kat-ze'", "'cat|animals/cat|Katze|Kat-ze'"],
  ['the tray already in order',                    "    p = (r.k + (pass || 0)) % n;\n    rest = idx.slice(1);\n    if (n >= 3) { var rot = (r.k + (pass || 0)) % rest.length; rest = rest.slice(rot).concat(rest.slice(0, rot)); }\n    out = rest.slice(); out.splice(p, 0, 0);\n    if (n >= 3) {", "    out = idx.slice();\n    if (false) {"],
  ['a filled bow removable',                       "if (st.done || b < 0 || b >= st.bows || st.beds[b] !== null) return false;\n    st.beds.splice", "if (st.done || b < 0 || b >= st.bows) return false;\n    st.beds.splice"],
  ['the help persists after a move',               "  function moved(st) { st.show = false; st.last = null; }", "  function moved(st) { }"],
  ['a word without an approved entry',             "'scarf|accessories/scarf|Schal|schal'", "'scarf|accessories/scarf|Tuch|tuch'"],
  ['a picture whose label is not the word',        "'pear|fruits/pear|Birne|bir-ne'", "'peach|fruits/peach|Birne|bir-ne'"],
  /* the hand, the ladder, the order */
  ['no limit on bows',                             "if (st.done || st.bows >= MAX_BOWS) return false;", "if (st.done) return false;"],
  ['a wrong count is no miss',                     "      st.misses++; st.help = Math.min(2, st.misses); st.show = true;\n", "      st.show = true;\n"],
  ['an empty ride counts a miss',                  "if (st.bows === 0) { st.show = true; st.last = { reason: 'noBows' };", "if (st.bows === 0) { st.misses++; st.show = true; st.last = { reason: 'noBows' };"],
  ['a full bow overwrites instead of swapping',    "if (from >= 0) { st.beds[from] = there; }", "if (from >= 0) { st.beds[from] = null; }"],
  ['Kurz never alternates 1 and 2',                "for (var i = 1; i < 4; i++) if (pool[o[i]].n === pool[o[i - 1]].n) ok = false;", "void 0;"],
  ['a pass may repeat the previous order',         "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['the order help shown for a count miss',        "st.helpKind = reason === 'order' ? 'order' : 'count';", "st.helpKind = 'order';"],
  /* both guards test `rev`; weakening only the first is an EQUIVALENT mutation (the second still catches it) — mutate rev itself */
  ['3+ syllables may lie reversed',                "rev = idx.slice().reverse();", "rev = idx.slice();"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-mut-'));
  fs.writeFileSync(path.join(dir, 'silbenbogen-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SB_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-silbenbogen: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
