'use strict';
const fs = require('fs'), path = require('path');
const I = __dirname, ROOT = path.join(I, '..', '..', '..');
const LOCALES = ['de','es','fr','it','pt','nl','sv','da','no','fi'];
const rj = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const wj = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');

// type -> family (from specs) + family -> [types]
const fam2types = {};
const scifileByType = {};
for (const dir of ['k', 'g1', 'g2', 'g3']) {
  const d = path.join(I, '..', 'types', dir); if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    const src = fs.readFileSync(path.join(d, f), 'utf8');
    const spec = require(path.join(d, f));
    if (!spec.id || !spec.exerciseType) continue;
    (fam2types[spec.exerciseType] = fam2types[spec.exerciseType] || []).push(spec.id);
    const m = src.match(/data\/science\/([a-z0-9-]+\.json)/);
    if (m) scifileByType[m[1]] = spec.id;
  }
}

const taxPath = path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json');
const tax = rj(taxPath); const axis = tax.axes['exercise-type'];
const catPath = path.join(I, '..', 'data', 'literacy', 'category-vocab.json'); const cat = rj(catPath);
const lkPath = path.join(I, '..', 'data', 'literacy', 'letter-knowledge.json'); const lk = rj(lkPath);
const sciDir = path.join(I, '..', 'data', 'science');

const affected = {}; const slugChanges = []; const familyNameChanges = []; let applied = 0;
const addAff = (loc, id) => { (affected[loc] = affected[loc] || new Set()).add(id); };

for (const loc of LOCALES) {
  const cf = path.join(I, '.nsr-' + loc + '-corrections.json');
  if (!fs.existsSync(cf)) continue;
  const c = rj(cf); const t = c.text || {};
  // strings
  if (t.strings) { const S = rj(path.join(I, 'strings.' + loc + '.json')); for (const [id, v] of Object.entries(t.strings)) { if (v.title) S[id].title = v.title; if (v.instruction) S[id].instruction = v.instruction; applied++; addAff(loc, id); } wj(path.join(I, 'strings.' + loc + '.json'), S); }
  // skill
  if ((t.skillFull && Object.keys(t.skillFull).length) || (t.skillShort && Object.keys(t.skillShort).length)) {
    const sk = rj(path.join(I, 'skill-sentences.' + loc + '.json'));
    for (const [f, v] of Object.entries(t.skillFull || {})) { sk[f].full = v; applied++; (fam2types[f] || []).forEach((id) => addAff(loc, id)); }
    for (const [f, v] of Object.entries(t.skillShort || {})) { sk[f].short = v; applied++; (fam2types[f] || []).forEach((id) => addAff(loc, id)); }
    wj(path.join(I, 'skill-sentences.' + loc + '.json'), sk);
  }
  // familyName (taxonomy) -> hub only (no deck regen), but track
  for (const [f, v] of Object.entries(t.familyName || {})) { axis[f].name[loc] = v; applied++; familyNameChanges.push(loc + '/' + f); }
  // categoryLabels -> category-vocab bins; affects K-235 (category type)
  for (const [k, v] of Object.entries(t.categoryLabels || {})) { const bin = cat.bins.find((b) => b.key === k); if (bin) bin.label[loc] = v; applied++; (fam2types['picture-vocabulary'] || []).filter((id) => id === 'K-235').forEach((id) => addAff(loc, id)); }
  // vcLabels -> letter-knowledge; affects K-230 (vowel/consonant)
  if (t.vcLabels && (t.vcLabels.vowels || t.vcLabels.consonants)) { if (t.vcLabels.vowels) lk.vcLabels.vowels[loc] = t.vcLabels.vowels; if (t.vcLabels.consonants) lk.vcLabels.consonants[loc] = t.vcLabels.consonants; applied++; addAff(loc, 'K-230'); }
  // sciBinLabels -> data/science/<file>; affects the type using that file
  for (const [file, bins] of Object.entries(t.sciBinLabels || {})) { const dp = path.join(sciDir, file); if (!fs.existsSync(dp)) { console.error('sciBin file missing: ' + file); continue; } const d = rj(dp); for (const [bk, v] of Object.entries(bins)) { const bin = d.bins.find((b) => b.key === bk); if (bin) { bin.label[loc] = v; applied++; } } wj(dp, d); if (scifileByType[file]) addAff(loc, scifileByType[file]); }
  // slug (taxonomy) -> re-slug all types in family
  for (const [f, v] of Object.entries(c.slug || {})) {
    // collision check
    for (const [k, e] of Object.entries(axis)) { if (k !== f && e.slug && e.slug[loc] === v) throw new Error('slug collision ' + loc + ' ' + f + ' wants ' + v + ' (owned by ' + k + ')'); }
    const old = axis[f].slug[loc]; axis[f].slug[loc] = v; applied++; slugChanges.push({ loc, fam: f, old, new: v, types: fam2types[f] || [] });
    (fam2types[f] || []).forEach((id) => addAff(loc, id));
  }
}
wj(taxPath, tax); wj(catPath, cat); wj(lkPath, lk);

const affOut = {}; for (const [loc, s] of Object.entries(affected)) affOut[loc] = [...s].sort();
fs.writeFileSync(path.join(I, '.nsr-affected.json'), JSON.stringify({ affected: affOut, slugChanges, familyNameChanges }, null, 2) + '\n');
console.log('applied ' + applied + ' corrections.');
console.log('affected (type,locale) to regenerate:');
let total = 0; for (const [loc, ids] of Object.entries(affOut)) { console.log('  ' + loc + ' (' + ids.length + '): ' + ids.join(',')); total += ids.length; }
console.log('total affected type-locale pairs: ' + total + ' (×5 variants where applicable)');
console.log('slug changes: ' + slugChanges.length + (slugChanges.length ? ' ' + JSON.stringify(slugChanges.map(s => s.loc + '/' + s.fam + ':' + s.old + '->' + s.new)) : ''));
console.log('family-name (hub-only) changes: ' + familyNameChanges.length + ' ' + JSON.stringify(familyNameChanges));
