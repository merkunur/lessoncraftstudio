#!/usr/bin/env node
/* =====================================================================
   mutate-flip-card.js — does verify-flip-card-core.js BITE?
   Run: node scripts/mutate-flip-card.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (The flip, the tumbling tile and the drag are rendering properties,
   gated by local-test-flip-card.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'flip-card-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-flip-card-core.js');
const enWord = (w) => { const m = SRC.match(new RegExp("'" + w + "': '[^']*'")); if (!m) throw new Error('no en word ' + w); return m[0]; };
const MUTATIONS = [
  /* the design's list */
  ['the swap adds instead of replacing',            "else { tiles[slot] = t.g; keys[slot] = t.k; }", "else { tiles.splice(slot, 0, t.g); keys.splice(slot, 0, t.k); }"],
  ['letters compared, not sounds (c/k)',            "else { tiles[slot] = t.g; keys[slot] = t.k; }", "else { tiles[slot] = t.g; keys[slot] = t.g; }"],
  ['the card flips to the goal whatever the tiles say', "function face(loc, card) { var w = lookup(loc, card.keys); return w ? { word: w.word, pic: w.pic, tail: w.tail } : null; }", "function face(loc, card) { var w = lookup(loc, card.keys) || word(loc, Object.keys(DATA[locale(loc)].words)[0]); return w ? { word: w.word, pic: w.pic, tail: w.tail } : null; }"],
  ['a blank face for a lexicon word',               "for (var w in ws) if (ws[w].split('|')[2] === want) return word(loc, w);", "for (var w in ws) if (ws[w].split('|')[2] === want && false) return word(loc, w);"],
  ['the nearly choice accepted',                    "if (same(g.keys, res.keys)) {", "if (same(g.keys, res.keys) || g === r.choices[1]) {"],
  ['the tile goes to the wrong slot',               "var t = trayOf(st)[ti]; if (!t || st.card.keys[slot] === t.k && st.card.tiles[slot] === t.g) return false;\n    st.card = apply(st.card, slot, t);", "var t = trayOf(st)[ti]; if (!t || st.card.keys[slot] === t.k && st.card.tiles[slot] === t.g) return false;\n    st.card = apply(st.card, (slot + 1) % st.card.tiles.length, t);"],
  ['the add level inserts at the end',              "if (slot === 'start') { tiles.unshift(t.g); keys.unshift(t.k); }", "if (slot === 'start') { tiles.push(t.g); keys.push(t.k); }"],
  ['the answer always in slot 1',                   "var slots = []; for (var i = 0; i < n; i++) slots.push(i % 3);", "var slots = []; for (var i = 0; i < n; i++) slots.push(1);"],
  ['the help at miss 1',                            "function helpOn(st) { return !st.done && st.show && st.help >= 2; }", "function helpOn(st) { return !st.done && st.show && st.help >= 1; }"],
  ['the help kept after a move',                    "function moved(st) { st.show = false; st.last = null; }", "function moved(st) { }"],
  ['pass 2 order = pass 1',                         "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['a legacy round dropped',                        "'cat|h=h|0|hat|bat|dog', ", ""],
  /* found in this build */
  ['the goal tile in the tray always first',        "return pos.map(function (p) { var o = shuffle([1, 2, 3], rnd); o.splice(p, 0, 0); return o; });", "return pos.map(function (p) { var o = shuffle([1, 2, 3], rnd); o.unshift(0); return o; });"],
  ['a chain stops after its first step',            "if (r.level === 'chain' && st.step < r.words.length - 2) {", "if (false) {"],
  ['an unchanged card counted as a miss',           "st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }\n    if (same(st.card.keys, st.goal.keys)) {", "st.misses++; st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }\n    if (same(st.card.keys, st.goal.keys)) {"],
  ['a refused picture back (the water bottle)',     enWord('sun'), enWord('sun').replace('beach/sun', 'At the Supermarket/water')],
  ['a tile split from its sound (kite-style mismatch)', enWord('duck'), enWord('duck').replace('d.u.ck|d u k', 'd.u.c.k|d u k')],
  ['a tray tile that shows a picture under the wrong spelling', "'hat|ham|m=m b=b t=t c=k'", "'hat|ham|m=m b=b t=t c=c'"],
  ['a tray tile that reaches a rude word (the critic’s k on sock)', "'sock|lock|l=l r=r d=d a=a'", "'sock|lock|l=l r=r k=k a=a'"],
  ['the help points at the wrong slot',             "function needSlot(st) { var r = st.r; if (r.choices) return r.slot;", "function needSlot(st) { var r = st.r; if (r.choices) return 0;"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fcd-mut-'));
  fs.writeFileSync(path.join(dir, 'flip-card-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FCD_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-flip-card: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
