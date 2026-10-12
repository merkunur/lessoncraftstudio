#!/usr/bin/env node
/**
 * check-b8-zips.js <locale> [--dir=<pool>] — the PC-side ZIP checks of the b8 Handmade Mazes (maze-puzzles) batch before
 * upload (the nt5-F trap: publish-bulk refuses DESCRIPTION_LENGTH_* on the SERVER, so the band is checked HERE). Every pooled ZIP:
 *   manifest.title ≤ 70 chars, the SEO description 120-170 chars, exercise_type maze-puzzles, thumbnail.png distinct across the
 *   pool (sha1), deck.html + printable.pdf + answer-key.pdf present, manifest.interactive.kind = trace-path and a DECK_BUNDLE in
 *   deck.html that carries a route graph (nodes + edges, ≥ 1 route), manifest.variant_id = the bare face id (k405, g1420 …: the
 *   waves set unitInSlug:false, so the deck slug is <family-slug>-<id>, the landing's canonicalDeckSlug), and the pool holds
 *   exactly the locale's hub-matrix count (20). Exit 1 on any finding; prints one line per finding and a summary.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const loc = process.argv[2];
if (!loc) { console.error('usage: check-b8-zips.js <locale> [--dir=<pool>]'); process.exit(2); }
const ROOT = path.join(__dirname, '..');
const dir = arg('dir', path.join(ROOT, 'out', 'upload', `wave-b8-${loc}-all`));
const HUB = JSON.parse(fs.readFileSync(path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b8-designs', 'hub-expectations.json'), 'utf8'));
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.zip')) : [];
const f = [];
if (!files.length) { console.error(`no ZIPs in ${dir}`); process.exit(1); }
const thumbs = new Map();
const ids = new Set();
let n = 0;
const descOf = (html) => { const d = html.match(/<meta name="description" content="([^"]*)"/); return d ? d[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'") : null; };
const titleOf = (m) => { const t = m.title; if (!t) return null; return typeof t === 'string' ? t : (t[loc] || Object.values(t)[0]); };
for (const file of files) {
  const z = new AdmZip(path.join(dir, file));
  const names = new Set(z.getEntries().map((e) => e.entryName));
  let m; try { m = JSON.parse(z.readAsText('manifest.json')); } catch (e) { f.push(`${file}: no manifest.json`); continue; }
  if (m.exercise_type !== 'maze-puzzles') f.push(`${file}: exercise_type "${m.exercise_type}" is not maze-puzzles`); else n++;
  const idm = file.match(/-(k\d+|g[123]\d+)-/);
  const id = idm ? idm[1] : null;
  if (!id) f.push(`${file}: no face id in the filename`);
  else { if (ids.has(id)) f.push(`${file}: face ${id} twice in the pool`); ids.add(id); if (String(m.variant_id) !== id) f.push(`${file}: variant_id "${m.variant_id}" (the deck slug would not be <family>-${id})`); }
  const html = names.has('deck.html') ? z.readAsText('deck.html') : '';
  const title = titleOf(m), desc = descOf(html);
  if (!title) f.push(`${file}: no title`); else if ([...title].length > 70) f.push(`${file}: title ${[...title].length} chars (> 70): ${title}`);
  if (!desc) f.push(`${file}: no description`); else if ([...desc].length < 120 || [...desc].length > 170) f.push(`${file}: description ${[...desc].length} chars (120-170): ${desc}`);
  for (const need of ['deck.html', 'printable.pdf', 'answer-key.pdf', 'thumbnail.png']) if (!names.has(need)) f.push(`${file}: no ${need}`);
  if (names.has('thumbnail.png')) { const h = crypto.createHash('sha1').update(z.readFile('thumbnail.png')).digest('hex'); if (thumbs.has(h)) f.push(`${file}: thumbnail identical to ${thumbs.get(h)}`); thumbs.set(h, file); }
  if (!m.interactive || m.interactive.kind !== 'trace-path') f.push(`${file}: no trace-path interactive block`);
  // the route graph rides in deck.html's DECK_BUNDLE: a deck without nodes/edges/routes cannot be played (the robot's floor)
  if (!/"nodes":\[/.test(html) || !/"edges":\[/.test(html) || !/"routes":\[\{/.test(html)) f.push(`${file}: DECK_BUNDLE carries no route graph`);
}
const expected = Object.values(HUB.keys || {}).reduce((s, per) => s + (typeof per[loc] === 'number' ? per[loc] : 0), 0);
if (n !== expected) f.push(`maze-puzzles: ${n} ZIPs, the hub matrix expects ${expected} for ${loc}`);
console.log(`${files.length} ZIPs in ${path.relative(ROOT, dir)} (expected ${expected})`);
if (f.length) { f.forEach((x) => console.log(' - ' + x)); console.log(`FAIL (${f.length} findings)`); process.exit(1); }
console.log('PASS');
