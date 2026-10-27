#!/usr/bin/env node
/* =====================================================================
   mutate-snow-stack.js — proves verify-snow-stack-core.js can fail (ACTIVITY #140, The Snow-Lid Stack).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-snow-stack.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'snow-stack-core.js'), act: path.join(MINI, 'snow-stack-activity.js'), man: path.join(MINI, 'winter-piles-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['an unequal stack lies flat', 'core', "for (var i = 1; i < sz.length; i++) if (sz[i] !== sz[0]) return false;", ""],
  ['one pile counts as fair', 'core', "if (sz.length < 2 || sz[0] < 1) return false;", "if (sz[0] < 1) return false;"],
  ['a twig outside the gaps', 'core', "g < 1 || g >= st.rd.r ||", "g < 0 ||"],
  ['a fix preset already fair', 'core', "{ id: 'fix-4x3', r: 4, c: 3, n: 2, kind: 'fix', preset: [1] }", "{ id: 'fix-4x3', r: 4, c: 3, n: 2, kind: 'fix', preset: [2] }"],
  ['Level 2 takes a pile bigger than the hole', 'core', "if (sz[i] !== rd.k) return miss(st, 'mould'", "if (sz[i] < rd.k) return miss(st, 'mould'"],
  ['Level 3 takes unequal holes', 'core', "if (!isFair(sz)) return miss(st, 'unfair', { sizes: sz });", "if (!isFair(sz) && st.level !== '3') return miss(st, 'unfair', { sizes: sz });"],
  ['the number of piles typed for the pile size', 'core', "return level === '1' ? rd.r * rd.c / rd.n :", "return level === '1' ? rd.n :"],
  ['a twig does not slide the stack off', 'core', "function touch(st) { st.stacked = false; st.help = false; }", "function touch(st) { st.help = false; }"],
  ['a fair share with acorns left is finished', 'core', "if (st.level === '3' && st.heap > 0) return miss(st, 'heapLeft', { left: st.heap });", ""],
  ['fair but the wrong number of piles passes', 'core', "if (st.level === '1' && sz.length !== rd.n) return miss(st, 'wrongCount', { n: rd.n });", ""],
  ['miss 2 never deals one round', 'core', "if (st.help && kind === 'unfair' && st.level === '3') {", "if (false) {"],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['the same order every pass', 'core', "var o = shuffle(ids, rnd);", "var o = ids.slice();"],
  ['a 0 key', 'core', "!/^[1-9]$/.test(String(d))", "!/^[0-9]$/.test(String(d))"],
  ['a hole size equal to its answer', 'core', "{ r: 5, c: 4, k: 4 }", "{ r: 4, c: 4, k: 4 }"],
  ['a share equal to its holes', 'core', "{ total: 16, n: 2 }", "{ total: 16, n: 4 }"],
  ['a round that makes a bot win', 'core', "{ id: 'match-4x3', r: 4, c: 2, n: 4, kind: 'match' }", "{ id: 'match-4x3', r: 4, c: 2, n: 2, kind: 'match' }"],
  ['a tidy heap', 'core', "out.push([0.5 + Math.cos(a) * d * 0.46, 0.55 + Math.sin(a) * d * 0.4]);", "out.push([i / rd.total, 0.5]);"],
  ['the match round prints the answer', 'act', "a.push('▢');", "a.push(rd.r * rd.c / rd.n);"],
  ['a digit in a hint', 'act', 'hCut: {"en":"Tap a gap between two rows to put in a twig."', 'hCut: {"en":"Tap a gap between 2 rows to put in a twig."'],
  ['a prompt loses its number', 'act', '"de":"Teile die Reihen in {n} gleich große Häufchen."', '"de":"Teile die Reihen in gleich große Häufchen."'],
  ['a false success line', 'act', 'okHoles: {"en":"{total} acorns make {piles} holes of {k}: {eq} = {total}."', 'okHoles: {"en":"{total} acorns make {k} holes of {piles}: {eq} = {total}."'],
  ['the word free in a string', 'act', 'aDel: {"en":"Delete"', 'aDel: {"en":"Free delete"'],
  ['es without its opening mark', 'act', '"es":"¡Iguales! Pero', '"es":"Iguales! Pero'],
  ['a 0 read aloud in the hollow', 'act', "this._stored > 0 ? this._t('aStore'", "this._stored >= 0 ? this._t('aStore'"],
  ['a role="img" label', 'act', "var wrapEl = this.api.el('div', 'ws-stumpbox');", "var wrapEl = this.api.el('div', 'ws-stumpbox'); wrapEl.setAttribute('role', 'img');"],
  ['the squirrel picture missing', 'act', "SQUIRREL: 'forest creatures/squirrel'", "SQUIRREL: 'forest-creatures/squirrel'"],
  ['a frozen slug edited', 'man', '"en": "fair-winter-piles"', '"en": "fair-winter-piles-2"'],
  ['the manifest still on the old params', 'man', '"eq": [', '"equation": [']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ws-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { WS_CORE: files.core, WS_ACT: files.act, WS_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-snow-stack-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name + ' — ' + mod[1].slice(0, 60)); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
let killed = 0;
const control = run(write('control', ['core', "'use strict';", "'use strict';  "]));
console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
for (const [name, file, a, b] of M) {
  const r = run(write(name, [file, a, b]));
  const dead = r.status !== 0; if (dead) killed++;
  const why = ((r.stdout || '') + (r.stderr || '')).split('\n').find(x => /FAIL|Error/.test(x)) || '';
  console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + name + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`mutate-snow-stack: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
