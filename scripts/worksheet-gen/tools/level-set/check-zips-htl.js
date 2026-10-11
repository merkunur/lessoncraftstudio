// Pre-upload check of the How to Draw Level Set waves (2026-10-11; htl): every ZIP marked indexable:false, PDF ONLY
// (printable.pdf, no answer key, no screen bundle), title <= 100 and description 120-170, the title names the drawing of
// its unit (data/htdx/names.js title form), every copy a different page (thumbnail) with a different title inside its
// (face, level), no title repeated across a face's levels, every copy on its pinned drawing (data/htdx/allocation.json).
//   node tools/level-set/check-zips-htl.js [--locales=en,de]   (--poison: corrupt one manifest in memory, expect a FAIL)
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const ROOT = path.join(__dirname, '..', '..');
const root = path.join(ROOT, 'out', 'staging');
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'htdx', 'allocation.json'), 'utf8'));
const { UNITS } = require(path.join(ROOT, 'data', 'htdx', 'units.js'));
const { NAMES } = require(path.join(ROOT, 'data', 'htdx', 'names.js'));
const poison = process.argv.includes('--poison');
const only = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || '').split(',').filter(Boolean);
const want = {}; let wantN = 0;
for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) for (const c of list) { want[id + ' d' + lv + ' c' + c.copy] = c.unit; wantN++; }
const unitKey = new Map(UNITS.map((u) => [u.slug, u.key]));
const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
let bad = 0, total = 0, poisoned = false;
const waves = fs.readdirSync(root).filter((d) => /^wave-htl-[a-z]{2}$/.test(d) && (!only.length || only.includes(d.slice(-2)))).sort();
if (!waves.length) { console.log('FAIL no wave-htl-* staging folder'); process.exit(1); }
for (const w of waves) {
  const loc = w.slice(-2);
  const dir = path.join(root, w);
  const groups = {}; const seen = new Set();
  const zips = fs.readdirSync(dir).filter((x) => x.endsWith('.zip'));
  if (zips.length !== wantN) { bad++; console.log(`FAIL ${w}: ${zips.length} ZIPs, expected ${wantN}`); }
  for (const f of zips) {
    total++;
    const z = new AdmZip(path.join(dir, f));
    const m = JSON.parse(z.readAsText('manifest.json'));
    if (poison && !poisoned) { m.indexable = true; poisoned = true; }
    const html = z.readAsText('deck.html');
    const thumb = crypto.createHash('sha1').update(z.getEntry('thumbnail.png').getData()).digest('hex');
    const title = unescape((/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '');
    const desc = (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
    const probs = [];
    if (m.indexable !== false) probs.push('NOT marked indexable:false');
    if (!z.getEntry('printable.pdf')) probs.push('no printable.pdf');
    if (z.getEntry('answer-key.pdf') || m.interactive || /window\.DECK_BUNDLE=/.test(html)) probs.push('not PDF only (answer key / screen present)');
    if (title.length > 100) probs.push('title ' + title.length + ' > 100');
    if (desc.length < 120 || desc.length > 170) probs.push('desc ' + desc.length);
    const key = m.settings.worksheet_type + ' d' + m.settings.difficulty + ' c' + m.variant;
    const unit = m.unit;
    if (!(key in want)) probs.push('copy not in the allocation: ' + key);
    else if (want[key] !== unit) probs.push(`drawing ${unit} but the allocation pins ${want[key]}`);
    const nm = NAMES[unitKey.get(unit)] && NAMES[unitKey.get(unit)][loc];
    if (!nm) probs.push('no name for ' + unit);
    else if (!title.toLocaleLowerCase(loc).includes(nm.n.toLocaleLowerCase(loc))) probs.push(`title "${title}" does not name "${nm.n}"`);
    if (/\{[LUN]\}|undefined|null/.test(title + desc)) probs.push('unresolved token in title/description');
    if (seen.has(key)) probs.push('duplicate copy ' + key); seen.add(key);
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
  console.log(`${w}: ${zips.length} zips, ${Object.keys(groups).length} (face, level) groups`);
}
console.log(`\n${total} ZIPs checked, ${bad} problems${poison ? ' (POISON run: expect ≥ 1)' : ''}`);
process.exit(poison ? (bad ? 0 : 1) : (bad ? 1 : 0));
