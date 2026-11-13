// Pre-upload check of the Year pages H Level Set waves (2026-11-13; ymh; Daily Teaching System Part 12.2), cloned (via check-zips-ymb.js) from
// check-zips-yma.js: marker, distinct copies, title/description band. PDF only: these eight new types have no screen
// adapter yet, so a deck with a screen or an answer key would be a surprise and fails too.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging'); // Level Set ZIP check (prefix below)
const EXPECT = Number((process.argv.find((a) => a.startsWith('--per-locale=')) || '').split('=')[1] || 0);
let bad = 0, total = 0, waves = 0;
for (const w of fs.readdirSync(root).filter((d) => (/^wave-ymh-[a-z]{2}$/.test(d))).sort()) {
  waves++;
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
    if (m.interactive || z.getEntry('answer-key.pdf') || /window.DECK_BUNDLE=/.test(html)) probs.push('has a screen or an answer key, which this set does not make');
    if (m.printable_only !== true || !z.getEntry('printable.pdf')) probs.push('no printable PDF');
    if (m.settings.difficulty === 2 ? (m.exercise_mode != null && m.exercise_mode !== 'core') : !['easy', 'hard'].includes(m.exercise_mode)) probs.push('level ' + m.settings.difficulty + ' carries the level word "' + m.exercise_mode + '"');
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
  // titles carry "Set N" but not always the level: a title may never repeat inside one PAGE across its levels
  const byType = {};
  for (const [k, list] of Object.entries(groups)) { const t = k.split(' ')[0]; (byType[t] = byType[t] || []).push(...list.map((x) => x.title)); }
  for (const [t, ts] of Object.entries(byType)) if (new Set(ts).size !== ts.length) { bad++; console.log(`FAIL ${w} ${t}: a title repeats across levels`); }
  const n = Object.values(groups).flat().length;
  if (EXPECT && n !== EXPECT) { bad++; console.log(`FAIL ${w}: ${n} zips, ${EXPECT} expected`); }
  console.log(`${w}: ${n} zips, ${Object.keys(groups).length} (type, level) groups`);
}
if (!waves) { bad++; console.log('FAIL no wave-ymh-<loc> folder under out/staging'); }
console.log(`\n${total} ZIPs checked in ${waves} waves, ${bad} problems`);
process.exit(bad ? 1 : 0);
