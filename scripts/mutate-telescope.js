#!/usr/bin/env node
/* =====================================================================
   mutate-telescope.js — does verify-telescope-core.js BITE?
   Run: node scripts/mutate-telescope.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (Equal ring sizes — the design's "segments taper by index" — is a
   rendering property, gated by local-test-telescope.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'telescope-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-telescope-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the view sharpens before Kig!',                 "function sharp(st) { return !!st.done; }", "function sharp(st) { return st.r.level === 'pull' ? st.out === st.r.w.syl.length : !!st.done; }"],
  ['sharp with one extra ring',                     "      if (st.out === n) return win(st);", "      if (st.out === n || st.out === n + 1) return win(st);"],
  ['the short case spreads syllables evenly',       "if (k > 0 && k < syl.length) out[k - 1] = syl.slice(k - 1);", "if (k > 0 && k < syl.length) out[0] = syl.slice(0, syl.length - k + 1);"],
  ['the telescope starts extended',                 "if (r.level === 'pull') st.out = 0;", "if (r.level === 'pull') st.out = 1;"],
  ['the collapse ignores order',                    "var right = st.segs.map(function (x, i) { return !!x && sOf(st, x) === i; });", "var right = st.segs.map(function (x) { return !!x; });"],
  ['the decoy accepted',                            "      if (decoys.length) {\n", "      if (false) {\n"],
  ['the rack starts in word order',                 "    if (extra) out.splice((r.i + p) % (n + 1), 0, -1);", "    out = idx.slice(); if (extra) out.splice((r.i + p) % (n + 1), 0, -1);"],
  ['the gap accepts any syllable of the word',      "if (s === r.gap) return win(st);", "if (s === r.gap || s === -2) return win(st);"],
  ['a policy_managed word allowed (kat)',           "hus|miscellaneous/house|hus;", "kat|pets/cat|kat;"],
  ['klokke on the clock picture',                   "klokke|christmas/bell|klok-ke", "klokke|around the house/clock|klok-ke"],
  ['the reshuffle may repeat an order',             "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['miss 2 locks the LAST syllable',                "var want = st.all.filter(function (x) { return x.s === 0; })[0].id", "var want = st.all.filter(function (x) { return x.s === st.r.w.syl.length - 1; })[0].id"],
  /* the deal, the hand, the feedback */
  ['the answer\'s rack slot never moves',           "at = (r.i + (pass || 0)) % 3;", "at = 0;"],
  ['three rings may lie reversed',                  "rev = idx.slice().reverse();", "rev = idx.slice();"],
  ['push shuts only one ring',                      "st.out = i; moved(st); return true; }", "st.out = st.out - 1; moved(st); return true; }"],
  ['wrong rings stay in',                           "wrong.forEach(function (x) { st.segs[st.segs.indexOf(x)] = null; st.rack.push(x); });", "void 0;"],
  ['a same-word ring reported as foreign',          "result: s === -2 ? 'sameword' : 'foreign'", "result: 'foreign'"],
  ['taking a ring off leaves a hole',               "if (r.level === 'build') { st.segs.splice(i, 1); st.segs.push(null);", "if (r.level === 'build') { st.segs[i] = null;"],
  ['a decoy that makes a word (finke)',             "['delfin', 'nan']", "['delfin', 'ke']"],
  ['the stork-like pelican back',                 ";spøgelse|miscellaneous/ghost|spø-gel-se;", ";pelikan|beach/pelican|pe-li-kan;spøgelse|miscellaneous/ghost|spø-gel-se;"],
  ['the hint glows when nothing stayed',            "st.last.right.some(Boolean) ? 'hintGlow' : 'hintNoneRight'", "'hintGlow'"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-mut-'));
  fs.writeFileSync(path.join(dir, 'telescope-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TS_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-telescope: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
