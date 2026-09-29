// Pre-upload check of the Picture Word Cards waves (Level Set 2026-09-29; cloned from check-zips-pron.js).
// PDF only: every ZIP must be noindex, printable-only (no screen bundle, no answer key), carry a unique
// title and a 120-170 description, and each (type, level) group's copies must be different pages.
// Also: the ZIP count must equal the wave's enumerated plan (nothing silently dropped).
// `--poison` proves every per-ZIP rule fires on a mutated copy of the first ZIP, then exits.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging');
const wavesDir = path.join(__dirname, '..', '..', 'waves');

function check(m, html, entries) {
  const title = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
  const desc = (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
  const probs = [];
  if (m.indexable !== false) probs.push('NOT marked indexable:false');
  if (m.printable_only !== true) probs.push('not printable_only');
  if (m.interactive) probs.push('manifest interactive');
  if (entries.includes('answer-key.pdf')) probs.push('carries an answer key');
  if (/window\.DECK_BUNDLE=/.test(html)) probs.push('carries a screen bundle');
  if (!entries.includes('printable.pdf')) probs.push('no printable.pdf');
  if (title.length > 80) probs.push('title ' + title.length + ' > 80');
  if (desc.length < 120 || desc.length > 170) probs.push('desc ' + desc.length);
  return { probs, title };
}

const waves = fs.readdirSync(root).filter((d) => d.startsWith('wave-pwc-')).sort();
if (!waves.length) { console.log('no wave-pwc-* staging dirs — nothing measured'); process.exit(1); }

if (process.argv.includes('--poison')) {
  const dir = path.join(root, waves[0]);
  const f = fs.readdirSync(dir).find((x) => x.endsWith('.zip'));
  const z = new AdmZip(path.join(dir, f));
  const m = JSON.parse(z.readAsText('manifest.json'));
  const html = z.readAsText('deck.html');
  const entries = z.getEntries().map((e) => e.entryName);
  const base = check(m, html, entries).probs;
  if (base.length) { console.log('POISON: the clean ZIP already fails: ' + base.join('; ')); process.exit(1); }
  const cases = [
    ['indexable', { ...m, indexable: true }, html, entries],
    ['printable_only', { ...m, printable_only: false }, html, entries],
    ['interactive', { ...m, interactive: true }, html, entries],
    ['answer key', m, html, entries.concat('answer-key.pdf')],
    ['screen bundle', m, html.replace('</body>', '<script>window.DECK_BUNDLE={}</script></body>'), entries],
    ['no pdf', m, html, entries.filter((e) => e !== 'printable.pdf')],
    ['long title', m, html.replace(/<title>[^<]*<\/title>/, '<title>' + 'x'.repeat(90) + '</title>'), entries],
    ['short desc', m, html.replace(/name="description" content="[^"]*"/, 'name="description" content="short"'), entries],
  ];
  let miss = 0;
  for (const [name, mm, hh, ee] of cases) {
    const p = check(mm, hh, ee).probs;
    console.log((p.length ? 'fires ' : 'MISSED ') + name + (p.length ? ' — ' + p.join('; ') : ''));
    if (!p.length) miss++;
  }
  process.exit(miss ? 1 : 0);
}

let bad = 0, total = 0;
for (const w of waves) {
  const dir = path.join(root, w);
  const groups = {};
  const zips = fs.readdirSync(dir).filter((x) => x.endsWith('.zip'));
  const plan = JSON.parse(fs.readFileSync(path.join(wavesDir, w + '.json'), 'utf8'));
  const planned = Object.values(plan.levels || {}).reduce((n, byLv) => n + Object.values(byLv).reduce((k, l) => k + l.length, 0), 0);
  if (planned && zips.length !== planned) { bad++; console.log(`FAIL ${w}: ${zips.length} ZIPs but the plan has ${planned} copies`); }
  for (const f of zips) {
    total++;
    const z = new AdmZip(path.join(dir, f));
    const m = JSON.parse(z.readAsText('manifest.json'));
    const html = z.readAsText('deck.html');
    const { probs, title } = check(m, html, z.getEntries().map((e) => e.entryName));
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
    const thumb = crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex');
    const key = m.settings.worksheet_type + ' d' + m.settings.difficulty;
    (groups[key] = groups[key] || []).push({ f, thumb, title });
  }
  const allTitles = Object.values(groups).flat().map((x) => x.title);
  if (new Set(allTitles).size !== allTitles.length) { bad++; console.log(`FAIL ${w}: a title repeats within the locale`); }
  for (const [k, list] of Object.entries(groups)) {
    const th = new Set(list.map((x) => x.thumb));
    if (th.size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: ${list.length} copies but only ${th.size} different pages`); }
  }
  console.log(`${w}: ${zips.length} zips, ${Object.keys(groups).length} (type, level) groups`);
}
console.log(`\n${total} ZIPs checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
