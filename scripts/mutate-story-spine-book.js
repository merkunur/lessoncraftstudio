#!/usr/bin/env node
/* =====================================================================
   mutate-story-spine-book.js — does verify-story-spine-book-core.js BITE?
   Run: node scripts/mutate-story-spine-book.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The pennant, the crack, the bandage that seals or peels, the book
   closing onto the shelf are rendering properties, gated by
   local-test-story-spine.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'story-spine-book-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-story-spine-book-core.js');
const MUTATIONS = [
  ['a page that is not the start plants the pennant',   "if (k[0] !== 'start') return { ok: false, stopAt: 0, wrongAt: 0, reason: 'no-start' };", ""],
  ['a calm page cracks',                                "function cracks(kind) { return kind === 'trouble' || kind === 'tother'; }", "function cracks(kind) { return kind === 'trouble' || kind === 'tother' || kind === 'tcalm'; }"],
  ['the fix mends a different trouble',                 "function mends(fixKind, troubleKind) { return fixKind === 'fix' && troubleKind === 'trouble'; }", "function mends(fixKind, troubleKind) { return fixKind === 'fix'; }"],
  ['the something-else bandage sticks',                 "return fixKind === 'fix' && troubleKind === 'trouble';", "return (fixKind === 'fix' || fixKind === 'fother') && troubleKind === 'trouble';"],
  ['a nothing-changed page sends a bandage',            "function sendsBandage(kind) { return kind === 'fix' || kind === 'fother'; }", "function sendsBandage(kind) { return kind === 'fix' || kind === 'fother' || kind === 'fsame'; }"],
  ['the different trouble blamed on the end page',      "wrongAt: k[1] === 'tother' ? 1 : 2, reason: 'bandage-misfit'", "wrongAt: 2, reason: 'bandage-misfit'"],
  ['Name pages may lie in story order',                 "var NAME_ARR = [[0, 2, 1], [2, 1, 0], [1, 0, 2]];", "var NAME_ARR = [[0, 1, 2], [2, 1, 0], [1, 0, 2]];"],
  ['Name arrangements may repeat twice running',        "var arr = balanced(n, 3, 1, rnd)", "var arr = balanced(n, 3, 3, rnd)"],
  ['the right candidate three times running',           "if (same) ok = false;", ""],
  ['the right candidate always in the first place',     "t.push(s === slot[p] ? right : dec[di++]);", "t.push(s === 0 ? right : dec[di++]);"],
  ['the tab tray always in one order',                  "tabs: perms[p % 6].map(", "tabs: perms[0].map("],
  ['the strips lie under their own pictures',           "(rnd() < .5 ? [1, 2, 0] : [2, 0, 1])", "(rnd() < .5 ? [1, 2, 0] : [0, 1, 2])"],
  ['the next pass starts with the story just played',   " || pool[prev[prev.length - 1]].story === pool[o[0]].story", ""],
  ['a tab dropped on a tabbed page loses the old tab',  "if (from) { delete st.tabs[from]; if (there) st.tabs[from] = there; }", "if (from) { delete st.tabs[from]; }"],
  ['no tabs counts a miss',                             "if (st.tray.length || Object.keys(st.tabs).length < 3) { st.show = true;", "if (st.tray.length || Object.keys(st.tabs).length < 3) { st.misses++; st.show = true;"],
  ['miss 2 glows the wrong candidate',                  "out.ringFix = r.pages[2].id; out.glow = r.cands[0].id;", "out.ringFix = r.pages[2].id; out.glow = r.cands[1].id;"],
  ['the miss-2 hints swapped',                          "return h.tt ? TEXT[loc].tt[h.tt] : TEXT[loc].tb[h.tb];", "return h.tt ? TEXT[loc].tb[h.tt] : TEXT[loc].tt[h.tb];"],
  ['the faint mark on the wrong page',                  "out.mark = { page: r.pages[ROLES.indexOf(st.last.role)].id, role: st.last.role };", "out.mark = { page: r.pages[0].id, role: st.last.role };"],
  ['the retell glues the starter to the caption',       "return { starter: S[i], caption: p.caption };", "return { starter: S[i], caption: S[i] + ', ' + p.caption };"],
  ['a candidate shows a different actor',               '"tcalm":{"t":[["forest creatures/mouse",70,0,1]', '"tcalm":{"t":[["forest creatures/squirrel",70,0,1]'],
  ['a B&W picture swapped in',                          '["forest creatures/fox",26,0,1],["toys/kite",72,0.3,1,10]', '["animals bw/fox",26,0,1],["toys/kite",72,0.3,1,10]'],
  ['card pictures below the floor at 704',              "L.unit = wide ? 96 : 64;", "L.unit = wide ? 90 : 64;"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ssb-mut-'));
  fs.writeFileSync(path.join(dir, 'story-spine-book-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SSB_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-story-spine-book: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
