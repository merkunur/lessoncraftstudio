#!/usr/bin/env node
/**
 * Merges the teacher-note files of this folder (<loc>-<subject>-<grade>.js) into
 * frontend/content/units/points/<loc>.json (Daily Teaching System, Part 4.2).
 *
 *   node scripts/units/notes/apply.js            writes
 *   node scripts/units/notes/apply.js --check    exit 1 when the committed points file differs from the note files
 *
 * A note file owns its points: its text replaces what the points file holds for the same teaching point. A point the
 * points file holds and no note file names is kept (the first notes were written straight into the points file).
 * Refused: a point two files both name, an id that is no teaching point, a note without all five texts.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const CHECK = process.argv.includes('--check');
const known = new Set(JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'), 'utf8')).points.map((p) => p.id));
const byLoc = {};
let bad = 0;
for (const f of fs.readdirSync(__dirname).filter((x) => /^[a-z]{2}-[a-z]+-[a-z0-9]+\.js$/.test(x)).sort()) {
  const m = require(path.join(__dirname, f));
  const L = (byLoc[m.loc] = byLoc[m.loc] || { points: {}, from: {} });
  for (const [id, n] of Object.entries(m.points)) {
    if (!known.has(id)) { bad++; console.log('ERROR  ' + f + ': ' + id + ' is no teaching point'); continue; }
    if (L.from[id]) { bad++; console.log('ERROR  ' + id + ' is in ' + L.from[id] + ' and in ' + f); continue; }
    if (!n.title || !n.objective || !n.note || !n.note.mistake || !n.note.words || !n.note.watch) { bad++; console.log('ERROR  ' + f + ': ' + id + ' lacks a title, an objective or a part of its note'); continue; }
    L.from[id] = f; L.points[id] = { title: n.title, objective: n.objective, note: { mistake: n.note.mistake, words: n.note.words, watch: n.note.watch } };
  }
}
if (bad) { console.log(bad + ' problem(s); nothing written'); process.exit(1); }
let stale = 0;
for (const loc of Object.keys(byLoc)) {
  const file = path.join(REPO, 'frontend', 'content', 'units', 'points', loc + '.json');
  // a language's first notes: its points file starts empty and holds only what the note files give it
  const raw = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const j = raw ? JSON.parse(raw) : { $comment: 'Teacher notes of the units, language ' + loc + ': the merge of scripts/units/notes/' + loc + '-*.js (node scripts/units/notes/apply.js). Do not edit by hand.', locale: loc, points: {} };
  for (const [id, n] of Object.entries(byLoc[loc].points)) j.points[id] = n;
  const text = JSON.stringify(j, null, 1) + '\n';
  if (CHECK) { if (text !== raw.replace(/\r\n/g, '\n')) { stale++; console.log('STALE  ' + path.relative(REPO, file)); } }
  else { fs.writeFileSync(file, text); console.log(loc + ': ' + Object.keys(byLoc[loc].points).length + ' notes from the note files; the points file holds ' + Object.keys(j.points).length); }
}
if (CHECK) { console.log(stale ? 'the points file is not the merge of the note files: node scripts/units/notes/apply.js' : 'teacher notes: the points files are the merge of the note files'); process.exit(stale ? 1 : 0); }
