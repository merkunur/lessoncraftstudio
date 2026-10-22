#!/usr/bin/env node
/**
 * b9-text-dump.js [--locales=a,b] — the compact text of the b9 Picture Tracing family for ONE native + pedagogy
 * reviewer (CLAUDE.md rule #2): per face, per locale, the printed heading, the instruction, the catalog title and the
 * landing h1 / title / meta / strand — no files, no screenshots. Written to out/b9/_text-dump.md.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { FACES, EN_STRINGS } = require('../data/b9/picture-tracing.js');
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = (process.argv.find((a) => a.startsWith('--locales=')) || '').split('=')[1];
const locs = arg ? arg.split(',') : ALL;
const REC = path.join(__dirname, '..', '..', '..', 'docs', 'worksheet-gen', 'b9-designs', '_records');
const strings = (l) => {
  if (l === 'en') return { strings: EN_STRINGS, words: ['sun', 'fish', 'cat', 'apple'] };
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'b9', 'locales', 'picture-tracing.' + l + '.json'), 'utf8'));
};
const land = (l) => JSON.parse(fs.readFileSync(path.join(REC, 'landings.' + l + '.json'), 'utf8')).landings;
let out = '# b9 Picture Tracing — every page string and landing head, ' + locs.join(' ') + '\n\n';
const B = {}, Lg = {};
for (const l of locs) { B[l] = strings(l); Lg[l] = land(l); }
out += '## F17 words\n' + locs.map((l) => l + ': ' + (B[l].words || []).join(', ')).join('\n') + '\n\n';
for (const [mode, { id, band }] of Object.entries(FACES)) {
  out += '## ' + id + ' ' + mode + ' (' + band + ')\n';
  for (const l of locs) {
    const s = (B[l].strings || {})[mode] || {}; const g = Lg[l][id] || {};
    out += '- ' + l + ' PAGE: «' + s.printTitle + '» — ' + s.instruction + '\n';
    out += '  ' + l + ' TITLE: ' + s.title + ' | H1: ' + g.h1 + ' | META: ' + g.metaDescription + ' | STRAND: ' + g.strand + '\n';
  }
  out += '\n';
}
const p = path.join(__dirname, '..', 'out', 'b9', '_text-dump.md'); fs.writeFileSync(p, out);
console.log('wrote ' + p + ' (' + out.length + ' chars, ' + locs.length + ' locales)');
