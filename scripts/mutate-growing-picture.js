#!/usr/bin/env node
/* =====================================================================
   mutate-growing-picture.js — proves verify-growing-picture-core.js can
   fail (ACTIVITY #154, The Growing Picture). Each mutation breaks the
   core, the activity or the manifest in one way a real bug would (the
   design's §12 list first); the gate must reject every one. A control
   (whitespace) must pass. A needle no longer in its file THROWS. Needles
   are matched after collapsing \r\n.
   Usage: node scripts/mutate-growing-picture.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'growing-picture-core.js'), act: path.join(MINI, 'growing-picture-activity.js'), man: path.join(MINI, 'gauge-good-guess-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the benchmark keyed to the right answer', 'core', "[round.unit === 'm' ? 'stick' : 'ruler']", "[round.answer > 10 ? 'stick' : 'ruler']"],
  ['the ghost shows the number', 'act', "'\" rx=\"4\"/>'\n                : '<rect class=\"gp-ghost\"", "'\" rx=\"4\"/><text>' + ghostCm + '</text>'\n                : '<rect class=\"gp-ghost\""],
  ['the options are not shuffled', 'core', 'cards[r.k] = shuffle([0, 1, 2], rnd);', 'cards[r.k] = [0, 1, 2];'],
  ['two options equal the answer', 'core', "['pencil', 'cm', [2, 17, 90], 17", "['pencil', 'cm', [17, 17, 90], 17"],
  ['the scale is not proportional', 'core', 's = Math.min(s, 0.9 * lenPx / it.cm);', 's = Math.min(s, 0.9 * lenPx / 100);'],
  ['the level-2 cm card always on the left', 'core', 'cards[k] = left.indexOf(k) >= 0 ? [0, 1] : [1, 0];', 'cards[k] = [0, 1];'],
  ['the rounds are not shuffled', 'core', 'var c = shuffle(ks.slice(), rnd);', 'var c = ks.slice();'],
  ['a picture drawn below the floor instead of a bar', 'act', 'if (along >= floorPx) this._pic(', 'if (true) this._pic('],
  /* the rest of the model */
  ['the same order every pass', 'core', 'if (!prev || prev.join() !== c.join()) { o = c; break; }', 'o = c; break;'],
  ['too big and too small swapped', 'core', "st.verdict = { kind: sizeOf(r, c) > trueCm(r) ? 'big' : 'small' };", "st.verdict = { kind: sizeOf(r, c) < trueCm(r) ? 'big' : 'small' };"],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['level 2 shows only the ruler', 'core', "return round.level === 'unit' ? ['ruler', 'stick']", "return round.level === 'unit' ? ['ruler']"],
  ['the stick hint on a ruler round', 'core', "(stick ? 'hintBigStick' : 'hintBigRuler')", "(stick ? 'hintBigRuler' : 'hintBigStick')"],
  ['a two-metre stick', 'core', 'var RULER = 30, STICK = 100;', 'var RULER = 30, STICK = 200;'],
  ['the ant ink box is not the pixels', 'core', 'ant: { theme: \'insects and bugs\', axis: \'long\', ang: 0, l: -0.4785,', 'ant: { theme: \'insects and bugs\', axis: \'long\', ang: 0, l: -0.4385,'],
  ['the truck drawn at a bus\'s 12 m (5 m tall in the art)', 'core', "['truck', 'm', [2, 8, 60], 8, [500, 1200]]", "['truck', 'm', [2, 12, 90], 12, [500, 1500]]"],
  ['a turned animal', 'core', "snail: { theme: 'insects and bugs', axis: 'long', ang: 0,", "snail: { theme: 'insects and bugs', axis: 'long', ang: 20,"],
  ['no card chosen counts as a miss', 'core', "if (st.chosen === null) return { result: 'note', key: 'hintPick' };", "if (st.chosen === null) { st.misses++; return { result: 'note', key: 'hintPick' }; }"],
  ['a new card keeps the old verdict', 'core', 'st.chosen = i; st.verdict = null; return true;', 'st.chosen = i; return true;'],
  ['the rank balance broken', 'core', "['whale', 'm', [1, 3, 15], 15", "['whale', 'm', [15, 60, 150], 15"],
  /* the activity */
  ['the ghost before any miss', 'act', 'ghostCm = st.verdict ? C.trueCm(r) : null', 'ghostCm = st.chosen !== null ? C.trueCm(r) : null'],
  ['a win never reaches the album', 'act', "if (!this._album.some(function (x) { return x.id === id; })) this._album.push(", "if (false) this._album.push("],
  ['the frame draws the benchmark from the answer', 'act', 'var bs = C.benches(r), tall', "var bs = [r.answer > 10 ? 'stick' : 'ruler'], tall"],
  ['fr loses a narrow space', 'act', '"fr":"Quelle est à peu près la longueur d’une fourmi ?"', '"fr":"Quelle est à peu près la longueur d’une fourmi ?"'],
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['a comparison names the answer', 'act', '"en":"A door is a little taller than a grown-up."', '"en":"A door is a little taller than a grown-up, about 2 m."'],
  ['a success line drops the number', 'act', '"en":"Yes — a door is about 2 m tall."', '"en":"Yes — a door is that tall."'],
  ['a level-2 sentence gives the unit away', 'act', '"en":"A key is about 6 {gap} long."', '"en":"A key is about 6 {gap} long, in cm."'],
  ['an inch in a string', 'act', '"en":"A door is a little taller than a grown-up."', '"en":"A door is a little taller than a grown-up, about 80 inches."'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  /* the manifest */
  ['the row still points at the old gauge activity', 'man', '"tool": "growing-picture-activity"', '"tool": "gauge-good-guess-activity"'],
  ['a new locale without its page title', 'man', '"da": "Skøn over længder i cm og meter – 2. klasse"', '"da": ""']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gp-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-growing-picture-core.js')], { env: Object.assign({}, process.env, { GP_CORE: files.core, GP_ACT: files.act, GP_MANIFEST: files.man }), encoding: 'utf8', timeout: 180000 });
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
for (const [name, file, a] of M) { if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name); }
let killed = 0;
const control = run(write('control', ['core', "'use strict';", "'use strict';  "]));
console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
for (const [name, file, a, b] of M) {
  const r = run(write(name, [file, a, b]));
  const dead = r.status !== 0; if (dead) killed++;
  const why = ((r.stdout || '') + (r.stderr || '')).split('\n').find((x) => /FAIL|Error/.test(x)) || '';
  console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + name + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`mutate-growing-picture: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
