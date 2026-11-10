#!/usr/bin/env node
/** fl-strings.js — the flagship templates' titles and instructions into i18n/strings.<loc>.json (docs/makers/FLAGSHIP.md). Safe to run again. */
'use strict';
const fs = require('fs'); const path = require('path');
const { ORDER, S } = require('../data/fl/new-strings.js');
const { G, F } = require('../data/fl/new-templates.js');
const I = path.join(__dirname, '..', 'i18n');
const EN = {};
for (const r of [...G, ...F]) EN[r[0]] = [r[6], r[7]];
const dirOf = (id) => path.join(__dirname, '..', 'types', id.startsWith('K-') ? 'k' : id.slice(0, 2).toLowerCase());
for (const id of Object.keys(S)) if (!EN[id]) { const d = dirOf(id), t = require(path.join(d, fs.readdirSync(d).find((f) => f.startsWith(id + '-')))); EN[id] = [t.i18n.en.title, t.i18n.en.instruction]; }
for (const r of [...G, ...F]) if (!S[r[0]]) throw new Error('no strings for ' + r[0]);
const put = (loc, get) => {
  const f = path.join(I, 'strings.' + loc + '.json'), j = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const id of Object.keys(S)) { const [title, instruction] = get(id); j[id] = { ...(j[id] || {}), title, instruction }; }
  fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
};
put('en', (id) => EN[id]);
ORDER.forEach((l, i) => put(l, (id) => S[id][i]));
console.log('strings written', Object.keys(S).length, 'templates ×', ORDER.length + 1);
