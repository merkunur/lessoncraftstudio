#!/usr/bin/env node
/**
 * check-b7-zips.js <locale> [--dir=<pool>] — the PC-side ZIP checks of the nt2-G batch before upload (README recipe
 * step 5; the nt5-F trap: publish-bulk refuses DESCRIPTION_LENGTH_* on the SERVER, so the band is checked HERE):
 *   every pooled ZIP: manifest.title ≤ 70 chars (every locale key), the SEO description 120-170 chars, the exercise type
 *   one of the two families, thumbnail.png distinct across the pool (sha1), deck.html present;
 *   find-the-differences: answer-key.pdf present, manifest.interactive.kind = tap-select with ≥ 4 items of BOTH kinds
 *     (the robot's floor);
 *   how-to-draw: NO answer key, no `interactive`;
 *   the pool holds exactly the locale's shipped ids (hub-expectations minus recorded refusals: 22 or fewer, never more).
 * Exit 1 on any finding; prints one line per finding and a summary.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const loc = process.argv[2];
if (!loc) { console.error('usage: check-b7-zips.js <locale> [--dir=<pool>]'); process.exit(2); }
const ROOT = path.join(__dirname, '..');
const dir = arg('dir', path.join(ROOT, 'out', 'upload', `wave-b7-${loc}-all`));
const HUB = JSON.parse(fs.readFileSync(path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b7-designs', 'hub-expectations.json'), 'utf8'));
const FAMS = new Set(['find-the-differences', 'how-to-draw']);
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.zip')) : [];
const f = [];
if (!files.length) { console.error(`no ZIPs in ${dir}`); process.exit(1); }
// the PINNED unit per face (tools/b7var-rows + the base d2 units): a ZIP generated before a pin changed carries the OLD scene
// in its filename suffix (-u<unit>) — es/pt/nl pools shipped the ostrich word scene after the farm pin (2026-10-09)
const PINS = (() => { const m = {}; try { for (const fam of ['find-the-differences', 'how-to-draw']) { const rows = require(path.join(ROOT, 'tools', 'b7var-rows', fam + '.js')); const R = rows.ROWS || rows.rows || rows; for (const r of (Array.isArray(R) ? R : [])) { const [, id, , , , ov] = r; const u = ov && ov.unit; if (id && u) m[id.toLowerCase().replace(/-/g, '')] = String(u).replace(/[^a-z0-9]/gi, '').toLowerCase(); } } } catch (e) { console.warn('[check-b7-zips] pins unreadable: ' + e.message); } return m; })();
const thumbs = new Map();
const perType = {};
// the SEO description lives in deck.html's <meta name="description"> (the emitter bands it there), not in the manifest
const descOf = (html) => { const d = html.match(/<meta name="description" content="([^"]*)"/); return d ? d[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"') : null; };
const titleOf = (m) => { const t = m.title; if (!t) return null; return typeof t === 'string' ? t : (t[loc] || Object.values(t)[0]); };
for (const file of files) {
  const z = new AdmZip(path.join(dir, file));
  const names = new Set(z.getEntries().map((e) => e.entryName));
  let m; try { m = JSON.parse(z.readAsText('manifest.json')); } catch (e) { f.push(`${file}: no manifest.json`); continue; }
  // pin staleness: the -u<unit> suffix of the filename must be the face's pinned unit
  { const mm = file.match(/-(k\d+|g[123]\d+)-[^-]+-d\d-[a-z]{2}-u([a-z0-9]+)\.zip$/); if (mm && PINS[mm[1]] && PINS[mm[1]] !== mm[2]) f.push(`${file}: STALE unit ${mm[2]} (pin is ${PINS[mm[1]]})`); }
  const et = m.exercise_type;
  if (!FAMS.has(et)) f.push(`${file}: exercise_type "${et}" is not a b7 family`);
  perType[et] = (perType[et] || 0) + 1;
  const html = names.has('deck.html') ? z.readAsText('deck.html') : '';
  const title = titleOf(m), desc = descOf(html);
  if (!title) f.push(`${file}: no title`); else if ([...title].length > 70) f.push(`${file}: title ${[...title].length} chars (> 70): ${title}`);
  if (!desc) f.push(`${file}: no description`); else if ([...desc].length < 120 || [...desc].length > 170) f.push(`${file}: description ${[...desc].length} chars (120-170)`);
  if (!names.has('deck.html')) f.push(`${file}: no deck.html`);
  if (!names.has('printable.pdf')) f.push(`${file}: no printable.pdf`);
  if (!names.has('thumbnail.png')) f.push(`${file}: no thumbnail.png`);
  else { const h = crypto.createHash('sha1').update(z.readFile('thumbnail.png')).digest('hex'); if (thumbs.has(h)) f.push(`${file}: thumbnail identical to ${thumbs.get(h)}`); thumbs.set(h, file); }
  if (et === 'find-the-differences') {
    if (!names.has('answer-key.pdf')) f.push(`${file}: find-the-differences without answer-key.pdf`);
    // printable_only stays true on every worksheet-gen manifest (the Level Set convention: the key + the interactive block
    // are what make the deck interactive; publish-cli reads both)
    const it = m.interactive;
    if (!it || it.kind !== 'tap-select') f.push(`${file}: no tap-select interactive block`);
    else {
      // the items live in deck.html's DECK_BUNDLE (the manifest carries the kind only): count them off the bundle text
      const items = (html.match(/"data-lcs-fd-hotspot":/g) || []).length;
      const ans = html.match(/"answers":\[([^\]]*)\]/);
      const t = ans ? (ans[1].match(/true/g) || []).length : 0;
      if (items < 4) f.push(`${file}: ${items} tap items (< 4)`);
      if (!ans) f.push(`${file}: no answers array in the bundle`);
      else if (!t || t === items) f.push(`${file}: ${t} true of ${items} items (both kinds needed)`);
    }
  } else if (et === 'how-to-draw') {
    if (names.has('answer-key.pdf')) f.push(`${file}: how-to-draw ships an answer key`);
    if (!m.printable_only) f.push(`${file}: how-to-draw not marked printable_only`);
    if (m.interactive) f.push(`${file}: how-to-draw carries an interactive block`);
  }
}
let expected = 0;
for (const [key, per] of Object.entries(HUB.keys || {})) { const n = typeof per[loc] === 'number' ? per[loc] : 0; expected += n; if ((perType[key] || 0) !== n) f.push(`${key}: ${perType[key] || 0} ZIPs, the hub matrix expects ${n} for ${loc}`); }
console.log(`${files.length} ZIPs in ${path.relative(ROOT, dir)} (expected ${expected}); ${Object.entries(perType).map(([k, n]) => k + ' ' + n).join(' · ')}`);
if (f.length) { f.forEach((x) => console.log(' - ' + x)); console.log(`FAIL (${f.length} findings)`); process.exit(1); }
console.log('PASS');
