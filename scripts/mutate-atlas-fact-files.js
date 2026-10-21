#!/usr/bin/env node
/* =====================================================================
   mutate-atlas-fact-files.js — does verify-atlas-fact-files-core.js BITE?
   Run: node scripts/mutate-atlas-fact-files.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The highlighter stripe, the lifted words, the drawers and the roll are
   rendering properties, gated by local-test-atlas-fact-files.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'atlas-fact-files-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-atlas-fact-files-core.js');
const MUTATIONS = [
  ['any highlight inside the span is right (no core word)', "if (i >= a && j === b) return 'right';", "if (i >= a && j <= b) return 'right';"],
  ['a highlight that runs past the span is right',          "if (i >= a && j === b) return 'right';", "if (i >= a && j >= b) return 'right';"],
  ['an echo across both sentences accepted',                "if (i <= a && j >= b && r.toks[i].s === r.toks[b].s && r.toks[j].s === r.toks[b].s) return 'echo';", "if (i <= a && j >= b) return 'echo';"],
  ['the bare core word reads alone on the card',            "res.card = frameFill(r.frame, res.ok ? words(r, r.span) : res.caught);", "res.card = frameFill(r.frame, res.caught);"],
  ['every pass asks the same question',                     "qs[k] = was ? 1 - was.q : 0;", "qs[k] = was ? was.q : 0;"],
  ['the first pass always asks sentence 2',                 "if (first) qs[k] = first.indexOf(k) >= 0 ? 0 : 1;", "if (first) qs[k] = 1;"],
  ['any drawer takes any strip',                            "var ok = st.r.sents[strip].heading === heading;", "var ok = true;"],
  ['the claim not in the file accepted as in it',           "var c = st.r.claims[st.claims[st.ci]], ok = c.truth === !!inFile;", "var c = st.r.claims[st.claims[st.ci]], ok = c.truth || !!inFile;"],
  ['any tile fits any sentence',                            "var ok = tile === frame;", "var ok = tile < 5;"],
  ['two picks finish the summary',                          "if (st.picks.length === 3) { st.phase = 'done'; st.done = true; }", "if (st.picks.length === 2) { st.phase = 'done'; st.done = true; }"],
  ['the trap tile may come last',                           "while (d.tiles[5] === 5 || d.tiles.join() === '0,1,2,3,4,5');", "while (d.tiles.join() === '0,1,2,3,4,5');"],
  ['miss 2 brightens the wrong sentence',                   "sentence: r.toks[r.span[0]].s, sign:", "sentence: 1 - r.toks[r.span[0]].s, sign:"],
  ['pictures below the floor at 704',                       "pic: wide ? 110 :", "pic: wide ? 90 :"],
  ['a sentence holds its own drawer word',                  '["Its home is a hole in the ground.","a hole in the ground"]', '["It lives in a hole in the ground.","a hole in the ground"]'],
  ['an answer in the wrong sentence',                       '["Where do bees live?","Bees live ___.","in a hive"]', '["Where do bees live?","Bees live ___.","sweet honey"]'],
  ['a claim not in the file that IS in the text',           '["A rabbit lives in the sea.",0,"lives"]', '["A rabbit hops.",0,"lives"]']
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'af-mut-'));
  fs.writeFileSync(path.join(dir, 'atlas-fact-files-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { AF_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-atlas-fact-files: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
