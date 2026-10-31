#!/usr/bin/env node
/**
 * Build sweep for new maker templates: every theme the template can take × every level × 11 languages × 3 copies, in
 * Node (makePage, the per-level strings applied). Catches a build that throws for some theme / language / level before
 * the live gate samples a few — a theme with too few pictures, two number words that look alike, a level's range.
 *
 *   node scripts/makers/sweep-templates.js K-448,K-449,…
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const { makePage } = require('./runtime.js');
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
const man = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'cache', 'manifest.json'), 'utf8')).themes;
const L = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const ids = (process.argv[2] || '').split(',').filter(Boolean);
if (!ids.length) { console.error('usage: sweep-templates.js K-448,K-449'); process.exit(2); }

let n = 0;
const bad = {};
for (const id of ids) {
  const dir = path.join(REPO, 'scripts', 'worksheet-gen', 'types', id.startsWith('K-') ? 'k' : id.slice(0, 2).toLowerCase());
  const file = fs.readdirSync(dir).find((f) => f.startsWith(id + '-'));
  if (!file) throw new Error('no type file for ' + id);
  const type = require(path.join(dir, file));
  const themes = type.themeAxis && type.themeAxis.applicable ? Object.keys(man).filter((t) => Object.values(man[t].nouns).filter((x) => x.vocabKey).length >= (type.themeAxis.minNouns || 6)) : [null];
  for (const loc of L) for (const d of Object.keys(type.difficulty || { 2: 1 }).map(Number)) {
    const s = withLevelInstruction(resolveStrings(id, loc, type), id, d, loc);
    for (const theme of themes) for (const v of [1, 2, 3]) {
      n++;
      try { makePage({ type, strings: s, locale: loc, difficulty: d, theme, variant: v }); }
      catch (e) { const k = id + ': ' + String(e.message).slice(0, 100); (bad[k] = bad[k] || []).push(`${loc}/L${d}/${theme}`); }
    }
  }
}
const failing = Object.values(bad).reduce((a, x) => a + x.length, 0);
console.log(`sweep: ${n} builds, ${failing} failing`);
for (const [k, v] of Object.entries(bad)) console.log(`FAIL ${k} × ${v.length} (${v.slice(0, 4).join(' ')})`);
if (failing) process.exitCode = 1;
