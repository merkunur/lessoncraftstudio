// Pre-upload check of the Find the Differences Level Set waves (2026-10-10; fdl): every ZIP marked indexable:false, PDF +
// interactive + answer key, title <= 100 and description 120-170, every copy a different page (thumbnail) with a
// different title inside its (face, level), no title repeated across a face's levels, every copy on its pinned scene
// (data/fdx/allocation.json: unit + painted flag), and the batch half colour / half B&W.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging');
const A = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'fdx', 'allocation.json'), 'utf8'));
const want = {}; let wantN = 0;
for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) for (const c of list) { want[id + ' d' + lv + ' c' + c.copy] = c.unit; wantN++; }
let bad = 0, total = 0;
const waves = fs.readdirSync(root).filter((d) => /^wave-fdl-[a-z]{2}$/.test(d)).sort();
if (waves.length !== 11) { bad++; console.log(`FAIL ${waves.length} wave folders, expected 11`); }
for (const w of waves) {
  const dir = path.join(root, w);
  const groups = {}; const seen = new Set(); let colour = 0;
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
    const probs = [];
    if (m.indexable !== false) probs.push('NOT marked indexable:false');
    if (!m.interactive || !z.getEntry('answer-key.pdf') || !z.getEntry('printable.pdf') || !/window.DECK_BUNDLE=/.test(html)) probs.push('not PDF + interactive + answer key');
    if (title.length > 100) probs.push('title ' + title.length + ' > 100');
    if (desc.length < 120 || desc.length > 170) probs.push('desc ' + desc.length);
    const key = m.settings.worksheet_type + ' d' + m.settings.difficulty + ' c' + m.variant;
    const unit = m.unit;
    if (!(key in want)) probs.push('copy not in the allocation: ' + key);
    else if (want[key] !== unit) probs.push(`scene ${unit} but the allocation pins ${want[key]}`);
    if (seen.has(key)) probs.push('duplicate copy ' + key); seen.add(key);
    if (/@c/.test(String(unit)) || m.settings.worksheet_type === 'K-398') colour++;
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
    const g = m.settings.worksheet_type + ' d' + m.settings.difficulty;
    (groups[g] = groups[g] || []).push({ f, thumb, title });
  }
  for (const [k, list] of Object.entries(groups)) {
    if (new Set(list.map((x) => x.thumb)).size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: two copies render the same page`); }
    if (new Set(list.map((x) => x.title)).size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: duplicate titles`); }
  }
  const byType = {};
  for (const [k, list] of Object.entries(groups)) { const t = k.split(' ')[0]; (byType[t] = byType[t] || []).push(...list.map((x) => x.title)); }
  for (const [t, ts] of Object.entries(byType)) if (new Set(ts).size !== ts.length) { bad++; console.log(`FAIL ${w} ${t}: a title repeats across levels`); }
  const line = zips.length - colour;
  if (Math.abs(colour - line) > 2) { bad++; console.log(`FAIL ${w}: ${colour} colour vs ${line} B&W`); }
  console.log(`${w}: ${zips.length} zips (${colour} colour, ${line} B&W), ${Object.keys(groups).length} (face, level) groups`);
}
console.log(`\n${total} ZIPs checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
