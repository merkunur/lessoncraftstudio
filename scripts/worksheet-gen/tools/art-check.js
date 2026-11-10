#!/usr/bin/env node
/**
 * art-check.js: the artist's and reviewer's look at new drawings (docs/makers/ART-BRIEF.md).
 *   node scripts/worksheet-gen/tools/art-check.js <noun,noun,...> [--out=<name>]   (--out: a folder of its own, when two artists work at once)
 * big.png shows every drawing at 520 px, six to a sheet (big1.png, big2.png...): the size at which a face is judged.
 * For each art-src/drawn/<noun>.svg it prints a technical check (colors, forbidden elements, margins, fill, tiny regions), and writes to
 * $TEMP/fl/art: pair.png (the library's nearest picture beside the drawing, 290 px) and small.png (every drawing at 96 px, unnamed).
 */
'use strict';
const path = require('path'), fs = require('fs'), os = require('os');
const sharp = require('sharp');
const rig = require('./art-rig.js');
const W = path.join(__dirname, '..'), DIR = path.join(W, 'art-src', 'drawn');
const OUT = path.join(process.env.TEMP || os.tmpdir(), 'fl', 'art', (process.argv.find((a) => a.startsWith('--out=')) || '--out=').slice(6));
const man = JSON.parse(fs.readFileSync(path.join(W, 'cache', 'manifest.json'), 'utf8'));
const S = 290, LAB = 24;

/** the library's nearest picture: the noun, then its last word */
function refOf(noun) {
  const base = noun.replace(/_friend$/, ''), wants = [noun, base, base.split('_').pop()];
  for (const want of wants) for (const [theme, t] of Object.entries(man.themes)) {
    if (!t.bw || t.fl) continue;
    for (const [n, e] of Object.entries(t.nouns)) if (n === want || n.startsWith(want + '_')) return path.join(W, 'cache', 'themes-512', theme, e.files[0]);
  }
  return null;
}
const label = (s, w) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${LAB}"><rect width="${w}" height="${LAB}" fill="#eee"/><text x="${w / 2}" y="17" font-family="Arial" font-size="15" text-anchor="middle">${s}</text></svg>`);
const png = (src, px) => sharp(src, src.endsWith('.svg') ? { density: 200 } : {}).flatten({ background: '#fff' }).resize(px, px, { fit: 'contain', background: '#fff' }).png().toBuffer();

/** closed white regions at 600 px (the outside is the one that touches the edge): the counts a colouring page depends on */
async function regions(file) {
  const { data, info } = await sharp(file, { density: 72 }).flatten({ background: '#fff' }).resize(600, 600).greyscale().raw().toBuffer({ resolveWithObject: true });
  const n = info.width, seen = new Uint8Array(n * n), sizes = [];
  let box = [n, n, 0, 0], ink = 0;
  for (let i = 0; i < n * n; i++) if (data[i] < 128) { ink++; seen[i] = 1; const x = i % n, y = (i / n) | 0; box = [Math.min(box[0], x), Math.min(box[1], y), Math.max(box[2], x), Math.max(box[3], y)]; }
  const st = new Int32Array(n * n);
  for (let i = 0; i < n * n; i++) {
    if (seen[i]) continue;
    let top = 0, size = 0, edge = false; st[top++] = i; seen[i] = 1;
    while (top) {
      const p = st[--top], x = p % n, y = (p / n) | 0; size++;
      if (x === 0 || y === 0 || x === n - 1 || y === n - 1) edge = true;
      if (x > 0 && !seen[p - 1]) { seen[p - 1] = 1; st[top++] = p - 1; }
      if (x < n - 1 && !seen[p + 1]) { seen[p + 1] = 1; st[top++] = p + 1; }
      if (y > 0 && !seen[p - n]) { seen[p - n] = 1; st[top++] = p - n; }
      if (y < n - 1 && !seen[p + n]) { seen[p + n] = 1; st[top++] = p + n; }
    }
    if (!edge) sizes.push(size);
  }
  return { regions: sizes.length, pinholes: sizes.filter((s) => s < 25).length, small: sizes.filter((s) => s >= 25 && s < 120).length, box, fill: Math.max(box[2] - box[0], box[3] - box[1]) / n, ink: ink / (n * n) };
}
function lint(src) {
  const f = [];
  for (const bad of ['<text', '<image', '<filter', 'Gradient', '<pattern', 'transform=']) if (src.includes(bad)) f.push('has ' + bad);
  const colours = new Set((src.match(/#[0-9a-fA-F]{3,6}\b/g) || []).map((c) => c.toLowerCase()));
  for (const c of colours) if (!['#141414', '#fff', '#ffffff'].includes(c)) f.push('colour ' + c);
  if (!/viewBox="0 0 600 600"/.test(src)) f.push('viewBox');
  const prims = (src.match(/<(circle|ellipse|rect)\b/g) || []).length - 1;
  if (prims > 6) f.push(prims + ' circles/ellipses/rects: is this assembled from primitives?');
  return f;
}
(async () => {
  const nouns = (process.argv[2] || '').split(',').filter(Boolean);
  if (!nouns.length) { console.log('usage: art-check.js noun,noun'); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const have = nouns.filter((n) => { const ok = fs.existsSync(path.join(DIR, n + '.svg')); if (!ok) console.log(n + ': no file'); return ok; });
  for (const n of have) {
    const file = path.join(DIR, n + '.svg'), r = await regions(file), f = lint(fs.readFileSync(file, 'utf8'));
    if (r.box[0] < 12 || r.box[1] < 12 || r.box[2] > 588 || r.box[3] > 588) f.push('too near the edge');
    if (r.fill < 0.72) f.push('small in the box (' + Math.round(r.fill * 100) + '%)');
    if (r.pinholes) f.push(r.pinholes + ' pinholes under 25 px: seal them');
    const faults = await rig.check(fs.readFileSync(file, 'utf8'));
    if (faults) f.push(...faults.map((x) => 'CONSTRUCTION: ' + x));
    else if (process.argv.includes('--rig')) f.push('CONSTRUCTION: no construction sheet');
    console.log(`${n}: regions ${r.regions}, under 120 px ${r.small}, fills ${Math.round(r.fill * 100)}%, ink ${Math.round(r.ink * 100)}%${f.length ? ' | ' + f.join('; ') : ' | clean'}`);
  }
  const PAIRS = 2, rows = Math.ceil(have.length / PAIRS), comps = [];
  for (let i = 0; i < have.length; i++) {
    const n = have[i], x = (i % PAIRS) * S * 2, y = Math.floor(i / PAIRS) * (S + LAB), ref = refOf(n);
    if (ref) comps.push({ input: await png(ref, S - 10), left: x + 5, top: y + 4 });
    comps.push({ input: label(ref ? 'library' : 'no library picture', S), left: x, top: y + S });
    comps.push({ input: await png(path.join(DIR, n + '.svg'), S - 10), left: x + S + 5, top: y + 4 });
    comps.push({ input: label(n, S), left: x + S, top: y + S });
  }
  await sharp({ create: { width: PAIRS * 2 * S, height: rows * (S + LAB), channels: 3, background: '#fff' } }).composite(comps).png().toFile(path.join(OUT, 'pair.png'));
  const T = 96, cols = 8, sm = [];
  for (let i = 0; i < have.length; i++) sm.push({ input: await png(path.join(DIR, have[i] + '.svg'), T - 6), left: (i % cols) * T + 3, top: Math.floor(i / cols) * T + 3 });
  await sharp({ create: { width: cols * T, height: Math.ceil(have.length / cols) * T, channels: 3, background: '#fff' } }).composite(sm).png().toFile(path.join(OUT, 'small.png'));
  const B = +((process.argv.find((a) => a.startsWith('--big=')) || '--big=520').slice(6)), per = B > 600 ? 4 : 6, bc = B > 600 ? 2 : 3;
  for (let p = 0; p * per < have.length; p++) {
    const list = have.slice(p * per, p * per + per), big = [];
    for (let i = 0; i < list.length; i++) {
      big.push({ input: await png(path.join(DIR, list[i] + '.svg'), B - 8), left: (i % bc) * B + 4, top: Math.floor(i / bc) * (B + LAB) + 4 });
      big.push({ input: label(list[i], B), left: (i % bc) * B, top: Math.floor(i / bc) * (B + LAB) + B });
    }
    await sharp({ create: { width: bc * B, height: Math.ceil(list.length / bc) * (B + LAB), channels: 3, background: '#fff' } }).composite(big).png().toFile(path.join(OUT, `big${p + 1}.png`));
  }
  console.log(`pair.png, small.png, big1.png... in ${OUT}`);
})();
