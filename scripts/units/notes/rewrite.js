#!/usr/bin/env node
/**
 * Applies a set of corrections to the teacher-note files of this folder and writes them back in the same shape
 * (Daily Teaching System, Part 4.2: a reviewer's findings are fixed at the source, here).
 *
 *   node scripts/units/notes/rewrite.js <corrections.json>
 *
 * corrections.json: { "<point id>": { "title"?, "objective"?, "mistake"?, "words"?, "watch"? }, … }
 * Each point is looked up in the note files (<loc>-<subject>-<grade>.js); a point that lives only in
 * frontend/content/units/points/<loc>.json (the first pilot notes) is corrected there. A point found nowhere, or a
 * key that is none of the five, stops the run with nothing written. A NEW note carries "__file": the note file it joins.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const patch = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'));
const KEYS = ['title', 'objective', 'mistake', 'words', 'watch'];
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
// The language of a corrections file is the start of its name (en-….review.json, de-….review.json): the same teaching
// point has a note in every language, and a correction must reach the note of its own language only.
const LOC = (/^([a-z]{2})-/.exec(path.basename(process.argv[2])) || [])[1];
if (!LOC) { console.log('ERROR  the corrections file must be named <loc>-….json'); process.exit(1); }
const files = fs.readdirSync(__dirname).filter((x) => /^[a-z]{2}-[a-z]+-[a-z0-9]+\.js$/.test(x) && x.startsWith(LOC + '-')).sort().map((f) => ({ f, file: path.join(__dirname, f), mod: require(path.join(__dirname, f)), dirty: false }));
const pointsFile = (loc) => path.join(REPO, 'frontend', 'content', 'units', 'points', loc + '.json');
const direct = {}; // loc → { json, dirty }
let n = 0;
const problems = [];
for (const [id, c] of Object.entries(patch)) {
  for (const k of Object.keys(c)) if (!KEYS.includes(k) && k !== '__file') problems.push(id + ': ' + k + ' is not a part of a note');
  let home = files.find((x) => x.mod.points[id]);
  // a NEW note names the file it belongs to (__file) and brings all five texts
  if (!home && c.__file) {
    home = files.find((x) => x.f === c.__file);
    if (!home) { problems.push(id + ': no note file ' + c.__file); continue; }
    if (KEYS.some((k) => !c[k])) { problems.push(id + ': a new note needs all five texts'); continue; }
    home.mod.points[id] = { title: '', objective: '', note: { mistake: '', words: '', watch: '' } };
  }
  let target;
  if (home) { target = home.mod.points[id]; home.dirty = true; }
  else {
    const loc = LOC;
    direct[loc] = direct[loc] || { json: JSON.parse(fs.readFileSync(pointsFile(loc), 'utf8')), dirty: false };
    target = direct[loc].json.points[id];
    if (!target) { problems.push(id + ': no note in a note file or in points/' + loc + '.json'); continue; }
    direct[loc].dirty = true;
  }
  for (const k of KEYS) if (c[k] != null) { if (k === 'title' || k === 'objective') target[k] = c[k]; else target.note[k] = c[k]; n++; }
}
if (problems.length) { for (const p of problems) console.log('ERROR  ' + p); process.exit(1); }
for (const x of files.filter((y) => y.dirty)) {
  const src = fs.readFileSync(x.file, 'utf8').replace(/\r\n/g, '\n');
  const head = src.slice(0, src.indexOf('module.exports'));
  let out = head + 'module.exports = {\n  loc: ' + q(x.mod.loc) + ',\n  points: {\n';
  for (const [id, p] of Object.entries(x.mod.points)) {
    out += '    ' + q(id) + ': {\n      title: ' + q(p.title) + ',\n      objective: ' + q(p.objective) + ',\n      note: {\n        mistake: ' + q(p.note.mistake) + ',\n        words: ' + q(p.note.words) + ',\n        watch: ' + q(p.note.watch) + ',\n      },\n    },\n';
  }
  out += '  },\n};\n';
  fs.writeFileSync(x.file, out);
  console.log('rewritten  ' + x.f);
}
for (const loc of Object.keys(direct)) if (direct[loc].dirty) { fs.writeFileSync(pointsFile(loc), JSON.stringify(direct[loc].json, null, 1) + '\n'); console.log('corrected  points/' + loc + '.json (notes that live only there)'); }
console.log(n + ' text(s) corrected in ' + Object.keys(patch).length + ' teaching point(s)');
