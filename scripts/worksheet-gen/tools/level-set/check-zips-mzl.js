#!/usr/bin/env node
/**
 * check-zips-mzl.js — pre-upload check of the Maze Puzzles Level Set waves (2026-10-12; mzl), every locale in
 * out/staging/wave-mzl-<loc>/. Every ZIP: marked indexable:false; exercise_type maze-puzzles; PDF + answer key + a
 * trace-path screen whose DECK_BUNDLE carries a route graph; title ≤ 70 and the SEO description 120-170 (publish-bulk
 * refuses the band on the SERVER, so it is checked here); the copy is in the allocation (data/hmx/allocation.json) and on
 * its pinned scene; every copy of a locale renders a different page (thumbnail) under a different title; the pool holds
 * exactly the allocation's count. Exit 1 on any finding.
 *   node tools/level-set/check-zips-mzl.js [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const AdmZip = require('adm-zip');
const ROOT = path.join(__dirname, '..', '..');
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'hmx', 'allocation.json'), 'utf8'));
const LOCALES = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const want = {}; let wantN = 0;
for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) for (const c of list) { want[id + ' d' + lv + ' c' + c.copy] = c.unit; wantN++; }
const descOf = (html) => { const d = html.match(/<meta name="description" content="([^"]*)"/); return d ? d[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'") : null; };
const REFUSED = require('../../data/hmx/refusals.js');
let bad = 0, total = 0;
for (const loc of LOCALES) {
  const dir = path.join(ROOT, 'out', 'staging', 'wave-mzl-' + loc);
  const zips = fs.existsSync(dir) ? fs.readdirSync(dir).filter((x) => x.endsWith('.zip')) : [];
  const F = (m) => { bad++; console.log('FAIL ' + loc + ' ' + m); };
  const wantLoc = wantN - Object.keys(REFUSED[loc] || {}).length;   // a page refused in this locale is absent
  if (zips.length !== wantLoc) F(`${zips.length} ZIPs, the allocation holds ${wantLoc} for ${loc}`);
  const thumbs = new Map(), titles = new Map(), seen = new Set();
  for (const f of zips) {
    total++;
    const z = new AdmZip(path.join(dir, f)); const names = new Set(z.getEntries().map((e) => e.entryName));
    const m = JSON.parse(z.readAsText('manifest.json')); const html = names.has('deck.html') ? z.readAsText('deck.html') : '';
    const p = [];
    if (m.indexable !== false) p.push('NOT marked indexable:false');
    if (m.exercise_type !== 'maze-puzzles') p.push('exercise_type ' + m.exercise_type);
    for (const need of ['deck.html', 'printable.pdf', 'answer-key.pdf', 'thumbnail.png']) if (!names.has(need)) p.push('no ' + need);
    if (!m.interactive || m.interactive.kind !== 'trace-path') p.push('no trace-path interactive block');
    if (!/"nodes":\[/.test(html) || !/"edges":\[/.test(html) || !/"routes":\[\{/.test(html)) p.push('DECK_BUNDLE carries no route graph');
    const title = typeof m.title === 'string' ? m.title : (m.title && (m.title[loc] || Object.values(m.title)[0]));
    const desc = descOf(html);
    if (!title || [...title].length > 70) p.push('title ' + (title ? [...title].length : 0) + ': ' + title);
    if (!desc || [...desc].length < 120 || [...desc].length > 170) p.push('description ' + (desc ? [...desc].length : 0) + ': ' + desc);
    const key = m.settings.worksheet_type + ' d' + m.settings.difficulty + ' c' + m.variant;
    if (!(key in want)) p.push('copy not in the allocation: ' + key); else if ((REFUSED[loc] || {})[want[key]]) p.push('a page refused in ' + loc + ': ' + want[key]); else if (want[key] !== m.unit) p.push(`scene ${m.unit} but the allocation pins ${want[key]}`);
    if (seen.has(key)) p.push('duplicate copy ' + key); seen.add(key);
    if (names.has('thumbnail.png')) { const h = crypto.createHash('sha1').update(z.readFile('thumbnail.png')).digest('hex'); if (thumbs.has(h)) p.push('same page as ' + thumbs.get(h)); thumbs.set(h, f); }
    if (title) { if (titles.has(title)) p.push('title also on ' + titles.get(title)); titles.set(title, f); }
    if (p.length) F(f + ': ' + p.join('; '));
  }
  console.log(`${loc}: ${zips.length} ZIPs`);
}
console.log(`\n${total} ZIPs checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
