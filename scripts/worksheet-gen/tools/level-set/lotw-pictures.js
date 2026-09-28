#!/usr/bin/env node
/**
 * lotw-pictures.js — Level Set 2026-09-28: every picture the NEW letter blocks would print (items + foils, all
 * reviewed locales), minus the pictures published letter blocks already carry (opened at the nt20-C build).
 *   node tools/level-set/lotw-pictures.js <dir> [--exclude=<file>] [--out=<list.json>]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { bank } = require('../../lib/b3-common.js');
const { assemble } = require('./lotw-common.js');
const dir = process.argv[2];
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const exclude = new Set(arg('exclude') ? JSON.parse(fs.readFileSync(arg('exclude'), 'utf8')) : []);
const opened = new Set(), want = new Map();
for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
  for (const l of bank('letter-of-the-week', loc).letters) for (const x of [...l.items, ...l.foils]) opened.add(x.theme + '/' + x.noun);
  const tf = path.join(dir, `lotw-text-${loc}.json`);
  if (!fs.existsSync(tf)) continue;
  const { blocks } = assemble(loc, JSON.parse(fs.readFileSync(path.join(dir, `lotw-cand-${loc}.json`), 'utf8')), JSON.parse(fs.readFileSync(tf, 'utf8')), exclude);
  for (const b of blocks) for (const x of [...b.items, ...b.foils]) { const r = x.theme + '/' + x.noun; if (!opened.has(r)) (want.get(r) || want.set(r, new Set()).get(r)).add(loc + ':' + x.word); }
}
const list = [...want.entries()].sort().map(([ref, ws]) => ({ ref, words: [...ws].slice(0, 6) }));
if (arg('out')) fs.writeFileSync(arg('out'), JSON.stringify(list, null, 1));
console.log(`${list.length} pictures to open (${opened.size} already opened on published pages)`);
