// Pre-upload check of the Picture Tracing Level Set waves (2026-10-22; ptl): every ZIP marked indexable:false, PDF ONLY
// (printable.pdf, no answer key, no screen), title <= 70 and description 120-170, no visible "free", every copy a
// different page (thumbnail) with a different title inside its face, every copy on its pinned scene
// (tools/level-set/ptl-waves.js allocation: unit), 300 per locale.
//   node tools/level-set/check-zips-ptl.js [--locales=en,de]
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const { allocation } = require('./ptl-waves.js');
const root = path.join(__dirname, '..', '..', 'out', 'staging');
const only = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || '').split(',').filter(Boolean);
const A = allocation(); const want = {}; let wantN = 0;
for (const [id, lvs] of Object.entries(A)) for (const [lv, list] of Object.entries(lvs)) for (const c of list) { want[id + ' d' + lv + ' c' + c.copy] = c.unit; wantN++; }
const FREE = /\b(free|kostenlos|gratis|gratuit|gratuite|gratuito|gratuita|grátis|gratuiti|ilmainen|ilmaiset)\b/i;
let bad = 0, total = 0;
const waves = fs.readdirSync(root).filter((d) => /^wave-ptl-[a-z]{2}$/.test(d) && (!only.length || only.includes(d.slice(-2)))).sort();
if (!only.length && waves.length !== 11) { bad++; console.log(`FAIL ${waves.length} wave folders, expected 11`); }
for (const w of waves) {
  const dir = path.join(root, w);
  const byFace = {}; const seen = new Set();
  const zips = fs.readdirSync(dir).filter((x) => x.endsWith('.zip'));
  if (zips.length !== wantN) { bad++; console.log(`FAIL ${w}: ${zips.length} ZIPs, expected ${wantN}`); }
  for (const f of zips) {
    total++;
    const z = new AdmZip(path.join(dir, f));
    const m = JSON.parse(z.readAsText('manifest.json'));
    const html = z.readAsText('deck.html');
    const thumb = crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex');
    const title = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
    const desc = (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
    const h1 = (/<h1[^>]*>([^<]*)<\/h1>/.exec(html) || [])[1] || '';
    const probs = [];
    if (m.indexable !== false) probs.push('NOT marked indexable:false');
    if (!z.getEntry('printable.pdf')) probs.push('no printable.pdf');
    if (z.getEntry('answer-key.pdf') || m.interactive) probs.push('not PDF only (answer key / screen present)');
    if (title.length > 70) probs.push('title ' + title.length + ' > 70');
    if (desc.length < 120 || desc.length > 170) probs.push('desc ' + desc.length);
    if (FREE.test(h1) || FREE.test(title.replace(/\|.*$/, ''))) probs.push('visible "free": ' + title);
    const key = m.settings.worksheet_type + ' d' + m.settings.difficulty + ' c' + m.variant;
    if (!(key in want)) probs.push('copy not in the allocation: ' + key);
    else if (want[key] !== m.unit) probs.push(`scene ${m.unit} but the allocation pins ${want[key]}`);
    if (seen.has(key)) probs.push('duplicate copy ' + key); seen.add(key);
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
    (byFace[m.settings.worksheet_type] = byFace[m.settings.worksheet_type] || []).push({ f, thumb, title });
  }
  for (const [k, list] of Object.entries(byFace)) {
    if (new Set(list.map((x) => x.thumb)).size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: two copies render the same page`); }
    if (new Set(list.map((x) => x.title)).size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: duplicate titles`); }
  }
  console.log(`${w}: ${zips.length} zips, ${Object.keys(byFace).length} faces`);
}
console.log(`\n${total} ZIPs checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
