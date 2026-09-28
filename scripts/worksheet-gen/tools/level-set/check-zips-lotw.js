// Pre-upload check of the Letter of the Week waves (PDF only, whole alphabet): marker, distinct copies, title/description band.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging'); // Level Set ZIP check (prefix below)
let bad = 0, total = 0;
for (const w of fs.readdirSync(root).filter((d) => d.startsWith('wave-lotw-')).sort()) {
  const dir = path.join(root, w);
  const groups = {};
  const units = {};   // (type, copy) → the letter, from the wave the ZIPs were generated from
  const wave = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'waves', w + '.json'), 'utf8'));
  for (const [t, lv] of Object.entries(wave.levels)) for (const list of Object.values(lv)) for (const c of list) units[t + '#' + c.copy] = c.unit;
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
    // PDF only: no screen version, no answer key (operator ruling 2026-09-28: PDF only)
    if (m.interactive || z.getEntry('answer-key.pdf') || /window.DECK_BUNDLE=/.test(html)) probs.push('carries a screen version or an answer key (must be PDF only)');
    if (!z.getEntry('printable.pdf')) probs.push('no printable.pdf');
    if (title.length > 80) probs.push("title " + title.length + " > 80");
    if (desc.length < 120 || desc.length > 170) probs.push('desc ' + desc.length);
    // the letter the copy teaches must be printed in its title, either case, alone or doubled ("Mm"; the es/fr
    // sentence-case title formula prints "nn" / "l", as on the published pages) — a teacher finds the letter by it
    const vm = /-(\d+)-[^-]+$/.exec(m.variant_id || '');
    const unit = vm && units[m.settings.worksheet_type + '#' + vm[1]];
    if (!unit) probs.push('no wave unit for ' + m.variant_id);
    else if (m.settings.worksheet_type !== 'G1-311' && !new RegExp('(^|[^\\p{L}])(' + unit + '){1,2}([^\\p{L}]|$)', 'iu').test(title)) probs.push('title does not name the letter ' + unit);
    if (probs.length) { bad++; console.log('FAIL ' + w + '/' + f + ': ' + probs.join('; ')); }
    const key = m.settings.worksheet_type + ' d' + m.settings.difficulty;
    (groups[key] = groups[key] || []).push({ f, thumb, title });
  }
  for (const [k, list] of Object.entries(groups)) {
    const th = new Set(list.map((x) => x.thumb)), ti = new Set(list.map((x) => x.title));
    if (th.size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: ${list.length} copies but only ${th.size} different pages`); }
    if (ti.size !== list.length) { bad++; console.log(`FAIL ${w} ${k}: duplicate titles`); }
  }
  // themeless: copies of one type share everything but "Set N", so a title may not repeat ACROSS levels either
  const byType = {};
  for (const [k, list] of Object.entries(groups)) for (const x of list) (byType[k.split(' ')[0]] = byType[k.split(' ')[0]] || []).push(x.title);
  for (const [t, ts] of Object.entries(byType)) if (new Set(ts).size !== ts.length) { bad++; console.log(`FAIL ${w} ${t}: a title repeats across levels`); }
  console.log(`${w}: ${Object.values(groups).flat().length} zips, ${Object.keys(groups).length} (type, level) groups`);
}
console.log(`\n${total} ZIPs checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
