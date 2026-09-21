#!/usr/bin/env node
/**
 * summarize-candidate-harvest.js — writes the per-candidate × per-locale table of a
 * harvest-candidates.js run to <records>/harvest-candidates-summary.md.
 * Usage: node scripts/seo-research/summarize-candidate-harvest.js [--records=docs/worksheet-gen/b4-designs/_records] [--round=1]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const argVal = (n, d) => { const a = process.argv.find((x) => x.startsWith(`--${n}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const dir = path.resolve(ROOT, argVal('records', 'docs/worksheet-gen/b4-designs/_records'));
const round = argVal('round', '1');
const L = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const seeds = JSON.parse(fs.readFileSync(path.join(dir, 'candidate-seeds.json'), 'utf8'));
const C = seeds.candidates;
const data = {};
for (const l of L) data[l] = JSON.parse(fs.readFileSync(path.join(dir, `harvest-candidates.${l}.json`), 'utf8'));
const bt = '`';
let md = `# Seeded autocomplete harvest — candidate genre heads × 11 locales (round ${round}, ${new Date().toISOString().slice(0, 10)})\n\n`;
md += 'Script: scripts/seo-research/harvest-candidates.js (Google suggest, client=firefox, per-market hl/gl: es=MX, pt=BR, no=bokmål). Seeds: _records/candidate-seeds.json (2 heads per candidate × {bare, +worksheet noun, +print word, +4 grade words} = 14 requests per candidate, 182 per locale, 0 errors in all 11). Cell = distinct suggestion strings returned for that candidate. A LOW cell means the SEED was un-native OR the genre is thin; the native panels decide which (the Nordic panel re-probes with corrected seeds → _records/v2/). Absolute numbers are not comparable across markets (autocomplete depth scales with market size); compare candidates WITHIN a column.\n\n';
md += '| candidate | ' + L.join(' | ') + ' | sum |\n|---|' + L.map(() => '---').join('|') + '|---|\n';
const sums = {};
for (const c of C) {
  let s = 0;
  const row = L.map((l) => { const u = data[l].perCandidate[c].unique; s += u; return u; });
  sums[c] = s;
  md += `| ${bt}${c}${bt} | ${row.join(' | ')} | ${s} |\n`;
}
md += '\nRanked by sum (round ' + round + '): ' + C.slice().sort((a, b) => sums[b] - sums[a]).map((c) => `${c} ${sums[c]}`).join(' · ') + '\n\n';
md += '## Telling suggestions per candidate (first 6 per locale, verbatim, lower-cased)\n';
for (const c of C) {
  md += `\n### ${c}\n`;
  for (const l of L) {
    const s = data[l].perCandidate[c].suggestions;
    md += `- ${l} (${s.length}): ` + s.slice(0, 6).map((x) => `"${x}"`).join(' · ') + '\n';
  }
}
const out = path.join(dir, 'harvest-candidates-summary.md');
fs.writeFileSync(out, md, 'utf8');
console.log('wrote', path.relative(ROOT, out), md.length, 'chars');
