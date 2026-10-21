#!/usr/bin/env node
/**
 * check-b9-zips.js <locale> [--dir=<pool>] — the PC-side ZIP checks of the b9 Picture Tracing (picture-tracing) batch before
 * upload (the nt5-F trap: publish-bulk refuses DESCRIPTION_LENGTH_* on the SERVER, so the band is checked HERE). Every pooled ZIP:
 *   manifest.title ≤ 70 chars, the SEO description 120-170 chars, exercise_type picture-tracing, thumbnail.png distinct across the
 *   pool (sha1), deck.html + printable.pdf present, PDF ONLY (no answer-key.pdf, no interactive block, printable_only true —
 *   no page may promise a key or a screen), manifest.variant_id = the bare face id (k418, g1429 …: the waves set
 *   unitInSlug:false, so the deck slug is <family-slug>-<id>, the landing's canonicalDeckSlug), and the pool holds exactly the
 *   locale's hub-matrix count (20). Exit 1 on any finding; prints one line per finding and a summary.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const loc = process.argv[2];
if (!loc) { console.error('usage: check-b9-zips.js <locale> [--dir=<pool>]'); process.exit(2); }
const ROOT = path.join(__dirname, '..');
const dir = arg('dir', path.join(ROOT, 'out', 'upload', `wave-b9-${loc}-all`));
const HUB = JSON.parse(fs.readFileSync(path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b9-designs', 'hub-expectations.json'), 'utf8'));
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
  if (m.exercise_type !== 'picture-tracing') f.push(`${file}: exercise_type "${m.exercise_type}" is not picture-tracing`); else n++;
  const idm = file.match(/-(k\d+|g[123]\d+)-/);
  const id = idm ? idm[1] : null;
  if (!id) f.push(`${file}: no face id in the filename`);
  else { if (ids.has(id)) f.push(`${file}: face ${id} twice in the pool`); ids.add(id); if (String(m.variant_id) !== id) f.push(`${file}: variant_id "${m.variant_id}" (the deck slug would not be <family>-${id})`); }
  const html = names.has('deck.html') ? z.readAsText('deck.html') : '';
  const title = titleOf(m), desc = descOf(html);
  if (!title) f.push(`${file}: no title`); else if ([...title].length > 70) f.push(`${file}: title ${[...title].length} chars (> 70): ${title}`);
  if (!desc) f.push(`${file}: no description`); else if ([...desc].length < 120 || [...desc].length > 170) f.push(`${file}: description ${[...desc].length} chars (120-170): ${desc}`);
  for (const need of ['deck.html', 'printable.pdf', 'thumbnail.png']) if (!names.has(need)) f.push(`${file}: no ${need}`);
  if (names.has('answer-key.pdf')) f.push(`${file}: carries an answer key (Picture Tracing is PDF only)`);
  if (names.has('thumbnail.png')) { const h = crypto.createHash('sha1').update(z.readFile('thumbnail.png')).digest('hex'); if (thumbs.has(h)) f.push(`${file}: thumbnail identical to ${thumbs.get(h)}`); thumbs.set(h, file); }
  if (m.interactive) f.push(`${file}: carries an interactive block (Picture Tracing is PDF only)`);
  if (m.printable_only !== true) f.push(`${file}: printable_only is not true`);
  if (/answer key|answer-key|solution/i.test(desc || '')) f.push(`${file}: the description promises an answer key`);
}
const expected = Object.values(HUB.keys || {}).reduce((s, per) => s + (typeof per[loc] === 'number' ? per[loc] : 0), 0);
if (n !== expected) f.push(`picture-tracing: ${n} ZIPs, the hub matrix expects ${expected} for ${loc}`);
console.log(`${files.length} ZIPs in ${path.relative(ROOT, dir)} (expected ${expected})`);
if (f.length) { f.forEach((x) => console.log(' - ' + x)); console.log(`FAIL (${f.length} findings)`); process.exit(1); }
console.log('PASS');
