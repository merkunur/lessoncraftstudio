#!/usr/bin/env node
/**
 * ptl-text-dump.js — every visible string of the Picture Tracing Level Set copies, per locale (the native + pedagogy
 * reviewer's compact input): face, level, unit, catalogue title, printed heading, instruction, picture words; plus the
 * mechanical checks (title ≤ 60 before the worksheet word, heading ≤ 40, instruction ≤ 130, titles unique per locale,
 * no visible "free") → out/ptl/_text-<loc>.tsv and a summary line per locale.
 *   node tools/level-set/ptl-text-dump.js [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { catalog } = require('../../lib/ptx.js');
const { loadType } = require('../../lib/load-types.js');
const { resolveStrings } = require('../../i18n/strings.js');
const { WORDS } = require('../../data/ptx/names-i18n.js');
const LOCS = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const FREE = /\b(free|kostenlos|gratis|gratuit|gratuite|gratuito|gratuita|grátis|gratuiti|ilmainen|ilmaiset)\b/i;
let bad = 0;
for (const loc of LOCS) {
  const rows = [['face', 'level', 'unit', 'title', 'printTitle', 'instruction', 'words'].join('\t')], titles = new Map(), probs = [];
  for (const e of [...catalog().values()].sort((a, b) => a.face.localeCompare(b.face) || a.level - b.level || a.id.localeCompare(b.id))) {
    const type = loadType(e.face); let s;
    try { s = type.copyStrings(resolveStrings(type.id, loc, type), { locale: loc, difficulty: e.level, unit: e.id }); } catch (x) { probs.push(e.id + ': ' + x.message); continue; }
    const w = ((WORDS[e.id] || {})[loc] || []).join(' ');
    rows.push([e.face, e.level, e.id, s.title, s.printTitle || '', s.instruction, w].join('\t'));
    if (s.title.length > 60) probs.push(`${e.id}: title ${s.title.length} > 60`);
    if ((s.printTitle || '').length > 40) probs.push(`${e.id}: heading ${s.printTitle.length} > 40`);
    if (s.instruction.length > 130) probs.push(`${e.id}: instruction ${s.instruction.length} > 130`);
    if (FREE.test(s.title + ' ' + (s.printTitle || '') + ' ' + s.instruction)) probs.push(`${e.id}: visible "free"`);
    if (titles.has(s.title)) probs.push(`${e.id}: title repeats ${titles.get(s.title)}`); titles.set(s.title, e.id);
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'out', 'ptl', '_text-' + loc + '.tsv'), rows.join('\n') + '\n');
  console.log(loc + ': ' + (rows.length - 1) + ' copies, ' + probs.length + ' problems' + (probs.length ? '\n  ' + probs.slice(0, 12).join('\n  ') : ''));
  bad += probs.length;
}
process.exit(bad ? 1 : 0);
