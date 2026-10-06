// Pre-upload check of the Dot-to-Dot waves (PDF only, 2026-10-06): marker, distinct copies, title/description band,
// and no picture twice inside one face (rebuilt from the wave: the scene id is not in the ZIP).
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const root = path.join(__dirname, '..', '..', 'out', 'staging'); // Level Set ZIP check (prefix below)
let bad = 0, total = 0;
for (const w of fs.readdirSync(root).filter((d) => d.startsWith('wave-d2d-')).sort()) {
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
    // PDF only: no screen version, no answer key (a pencil task)
    if (m.interactive || z.getEntry('answer-key.pdf') || /window.DECK_BUNDLE=/.test(html)) probs.push('carries a screen version or an answer key (must be PDF only)');
    if (!z.getEntry('printable.pdf')) probs.push('no printable.pdf');
    if (title.length > 80) probs.push("title " + title.length + " > 80");
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
  // themeless: copies of one type share everything but "Set N", so a title may not repeat ACROSS levels either
  const byType = {};
  for (const [k, list] of Object.entries(groups)) for (const x of list) (byType[k.split(' ')[0]] = byType[k.split(' ')[0]] || []).push(x.title);
  for (const [t, ts] of Object.entries(byType)) if (new Set(ts).size !== ts.length) { bad++; console.log(`FAIL ${w} ${t}: a title repeats across levels`); }
  console.log(`${w}: ${Object.values(groups).flat().length} zips, ${Object.keys(groups).length} (type, level) groups`);
}
// no picture twice inside one face (all levels): rebuild every copy of the wave and read meta.scene
const { loadType } = require('../../lib/load-types.js');
const WAVES = path.join(__dirname, '..', '..', 'waves');
for (const f of fs.readdirSync(WAVES).filter((x) => /^wave-d2d-[a-z]{2}\.json$/.test(x))) {
  const wave = JSON.parse(fs.readFileSync(path.join(WAVES, f), 'utf8'));
  const loc = wave.locales[0];
  for (const [id, levels] of Object.entries(wave.levels)) {
    const spec = loadType(id), seen = {};
    for (const [lv, copies] of Object.entries(levels)) for (const c of copies) {
      const b = spec.build({ difficulty: +lv, locale: loc }, { variant: c.copy, seedVariant: c.seedVariant, rng: Math.random });
      const sc = b.meta.scene;
      if (!sc) { bad++; console.log(`FAIL ${f} ${id} L${lv}: copy ${c.copy} has no scene`); continue; }
      if (seen[sc]) { bad++; console.log(`FAIL ${f} ${id}: ${sc} at ${seen[sc]} and L${lv}`); } else seen[sc] = 'L' + lv;
    }
  }
}
console.log(`\n${total} ZIPs checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
