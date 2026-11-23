// Pre-upload check of the Year pages science and health Level Set waves (Stage D-2, 2026-11-23; prefixes ysa themeless,
// ysb themed; Stage D-5 batch K: ydk), cloned from check-zips-ylr.js: marker, level word, distinct copies, title and
// description band. Some of these types have a screen version and an answer key (the sorts, the puzzles): allowed here.
//   node tools/level-set/check-zips-ysd.js [--prefixes=ysa,ysb] [--locales=en] [--poison]
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging');
const LOCS = ((process.argv.find((a) => a.startsWith('--locales=')) || '').split('=')[1] || '').split(',').filter(Boolean);
const POISON = process.argv.includes('--poison');
const PREFIXES = ((process.argv.find((a) => a.startsWith('--prefixes=')) || '').split('=')[1] || 'ysa,ysb').split(',');
function check(entries) {
  // entries: [{ wave, f, m, title, desc, thumb, hasPdf }]
  const out = [];
  const groups = {};
  for (const e of entries) {
    const { m, title, desc } = e; const probs = [];
    if (m.indexable !== false) probs.push('NOT marked indexable:false');
    if (!e.hasPdf) probs.push('no printable PDF');
    if (m.settings.difficulty === 2 ? (m.exercise_mode != null && m.exercise_mode !== 'core') : !['easy', 'hard'].includes(m.exercise_mode)) probs.push('level ' + m.settings.difficulty + ' carries the level word "' + m.exercise_mode + '"');
    if (title.length > 100) probs.push('title ' + title.length + ' > 100');
    if (desc.length < 120 || desc.length > 170) probs.push('desc ' + desc.length);
    if (probs.length) out.push('FAIL ' + e.wave + '/' + e.f + ': ' + probs.join('; '));
    const key = e.wave + ' ' + m.settings.worksheet_type + ' d' + m.settings.difficulty;
    (groups[key] = groups[key] || []).push(e);
  }
  for (const [k, list] of Object.entries(groups)) {
    if (new Set(list.map((x) => x.thumb)).size !== list.length) out.push(`FAIL ${k}: ${list.length} copies but only ${new Set(list.map((x) => x.thumb)).size} different pages`);
    if (new Set(list.map((x) => x.title)).size !== list.length) out.push(`FAIL ${k}: duplicate titles`);
  }
  return out;
}
const waveRe = PREFIXES.map((p) => new RegExp('^wave-' + p + '-[a-z]{2}$'));
const entries = [];
const waves = fs.readdirSync(root).filter((d) => waveRe.some((r) => r.test(d)) && (!LOCS.length || LOCS.includes(d.slice(-2)))).sort();
for (const w of waves) for (const f of fs.readdirSync(path.join(root, w)).filter((x) => x.endsWith('.zip'))) {
  const z = new AdmZip(path.join(root, w, f));
  const html = z.readAsText('deck.html');
  entries.push({ wave: w, f, m: JSON.parse(z.readAsText('manifest.json')), html,
    title: (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '', desc: (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '',
    thumb: crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex'), hasPdf: !!z.getEntry('printable.pdf') });
}
if (POISON) {
  const clone = (e) => Object.assign({}, e, { m: JSON.parse(JSON.stringify(e.m)) });
  const base = entries.slice(0, 40).map(clone);
  const cases = [
    ['an indexable copy', (es) => { es[0].m.indexable = true; }],
    ['a level-1 copy without its level word', (es) => { const e = es.find((x) => x.m.settings.difficulty === 1); e.m.exercise_mode = null; }],
    ['a description out of the band', (es) => { es[0].desc = 'short'; }],
    ['two copies that print one page', (es) => { const same = (a, x) => x !== a && x.m.settings.worksheet_type === a.m.settings.worksheet_type && x.m.settings.difficulty === a.m.settings.difficulty && x.wave === a.wave; const a = es.find((y) => es.some((x) => same(y, x))); const b = es.find((x) => same(a, x)); b.thumb = a.thumb; }],
  ];
  let miss = 0;
  if (check(base).length) { console.log('control not clean: ' + check(base)[0]); miss++; }
  for (const [name, spoil] of cases) { const es = base.map(clone); try { spoil(es); } catch (e) { console.log('poison could not be applied: ' + name); miss++; continue; } if (!check(es).length) { miss++; console.log('POISON NOT CAUGHT: ' + name); } }
  console.log(miss ? miss + ' poison problem(s)' : 'all ' + cases.length + ' poisons caught, the control is clean');
  process.exit(miss ? 1 : 0);
}
const probs = check(entries);
for (const p of probs) console.log(p);
const per = {}; for (const e of entries) per[e.wave] = (per[e.wave] || 0) + 1;
console.log(JSON.stringify(per));
if (!waves.length) { console.log('FAIL no wave folder of ' + PREFIXES.join(', ')); process.exit(1); }
console.log(`\n${entries.length} ZIPs checked in ${waves.length} waves, ${probs.length} problems`);
process.exit(probs.length ? 1 : 0);
