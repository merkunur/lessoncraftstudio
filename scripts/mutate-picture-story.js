#!/usr/bin/env node
/* =====================================================================
   mutate-picture-story.js — does verify-picture-story-core.js BITE?
   Run: node scripts/mutate-picture-story.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The ribbon, the page curl, the dots on the page edge and the scene
   actions are rendering properties, gated by local-test-picture-story.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'picture-story-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-picture-story-core.js');
const N = ' ';
const MUTATIONS = [
  ['a why/where question accepts any phrase on its page', "if (t.kind === 'phrase') return t.page === r.page && t.key === r.key;", "if (t.kind === 'phrase') return t.page === r.page;"],
  ['who/what REFUSES the right thing on another page',    "if (r.kind === 'thing') return t.kind === 'thing' && t.pic === r.pic;", "if (r.kind === 'thing') return t.kind === 'thing' && t.pic === r.pic && t.page === r.page;"],
  ['"first" accepts a later page',                         "if (r.kind === 'page') return t.kind === 'page' && t.page === r.page;", "if (r.kind === 'page') return t.kind === 'page' && t.page >= r.page;"],
  ['the place picture accepted on another page',         "return !!r.also && t.kind === 'thing' && t.page === r.page && t.pic === r.also;", "return !!r.also && t.kind === 'thing' && t.pic === r.also;"],
  ['Caption accepts any page',                            "if (p === want) {", "if (p === want || p > 0) {"],
  ['the decoy mitten on one page only',                   '["accessories/mitten",50,96,0.92]', '["toys/ball",50,96,0.92]'],
  ['an answer moved to page 2',                           '{"key":"hWho","story":"hat","kind":"thing","pic":"winter/penguin","page":3}', '{"key":"hWho","story":"hat","kind":"thing","pic":"winter/penguin","page":2}'],
  ['two pages of a book act the same',                    '["winter/penguin",88,98,0.92,"wave"]', '["winter/penguin",88,98,0.92]'],
  ['the same book twice in a row',                        "if (adj) continue;", ""],
  ['the answer pages unbalanced in a half',               "if (pool.length === 18 && !balanced(pool, o))", "if (false && !balanced(pool, o))"],
  ['the next pass may repeat the order',                  "if (prev && prev.join() === o.join()) continue;", ""],
  ['Caption sentences in the book’s own order',          "while (a.join() === range(n).join());", "while (false);"],
  ['the page lifts at miss 1',                            "curl: st.help >= 2 ? st.r.page : 0", "curl: st.help >= 1 ? st.r.page : 0"],
  ['an empty Check counts a miss',                        "if (st.r.mode === 'caption') return capCheck(st);\n    if (st.mark === null) { st.show = true;", "if (st.r.mode === 'caption') return capCheck(st);\n    if (st.mark === null) { st.misses++; st.show = true;"],
  ['a placed sentence keeps the misses',                  "st.placed[p] = true; st.k++; st.misses = 0; st.help = 0;", "st.placed[p] = true; st.k++;"],
  ['a captioned page takes another sentence',             "|| st.placed[p]) return false;", ") return false;"],
  ['miss 2 lights words on a 3-letter stem',              "var stem = function (w) { return Array.from(w).slice(0, 4).join(''); };", "var stem = function (w) { return Array.from(w).slice(0, 3).join(''); };"],
  ['the bear called Ben in Swedish',                      '"Bruno björnen [byggde en snögubbe]."', '"Ben björnen [byggde en snögubbe]."'],
  ['a plain space before ? in French',                    'Qui a sauté dans la neige' + N + '?', 'Qui a sauté dans la neige ?'],
  ['the answering phrase tag on the wrong phrase',        '"She [pulled and pulled], but [it was stuck#cWhy]."', '"She [pulled and pulled#cWhy], but [it was stuck]."'],
  ['Fable inside a scene',                                '["forest creatures/owl",36,94,1.1,"doze"]', '["forest creatures/fox",36,94,1.1,"doze"]']
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'psc-mut-'));
  fs.writeFileSync(path.join(dir, 'picture-story-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PSC_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-picture-story: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
