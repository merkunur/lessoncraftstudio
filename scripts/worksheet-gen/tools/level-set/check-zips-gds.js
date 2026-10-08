// Pre-upload check of the Graphs and Data Level Set waves (2026-10-08; gds): marker, distinct copies, title/description band.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging'); // Level Set ZIP check (prefix below)
let bad = 0, total = 0;
for (const w of fs.readdirSync(root).filter((d) => (d.startsWith('wave-gds-'))).sort()) {
  const dir = path.join(root, w);
  const groups = {};
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.zip'))) {
    total++;
    const z = new AdmZip(path.join(dir, f));
    const m = JSON.parse(z.readAsText('manifest.json'));
    const html = z.readAsText('deck.html');
    const thumb = crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex');
    const title = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
    const desc = (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
    const probs = [];
    if (m.indexable !== false) probs.push('NOT marked indexable:false');
    if (!m.interactive || !z.getEntry('answer-key.pdf') || !/window.DECK_BUNDLE=/.test(html)) probs.push('not interactive or no answer key');
    if (title.length > 100) probs.push('title ' + title.length + ' > 100');
    if (desc.length < 120 || desc.length > 170) probs.push('desc ' + desc.length);
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
    const key = m.settings.worksheet_type + ' d' + m.settings.difficulty;
    (groups[key] = groups[key] || []).push({ f, thumb, title });
  }
  for (const [k, list] of Object.entries(groups)) {
    const th = new Set(list.map((x) => x.thumb)), ti = new Set(list.map((x) => x.title));
    if (th.size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: ${list.length} copies but only ${th.size} different pages`); }
    if (ti.size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: duplicate titles`); }
  }
  // titles carry "Set N" but not the level: a title may never repeat inside one PAGE across its levels
  const byType = {};
  for (const [k, list] of Object.entries(groups)) { const t = k.split(' ')[0]; (byType[t] = byType[t] || []).push(...list.map((x) => x.title)); }
  for (const [t, ts] of Object.entries(byType)) if (new Set(ts).size !== ts.length) { bad++; console.log(`FAIL ${w} ${t}: a title repeats across levels`); }
  console.log(`${w}: ${Object.values(groups).flat().length} zips, ${Object.keys(groups).length} (type, level) groups`);
}
console.log(`\n${total} ZIPs checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
