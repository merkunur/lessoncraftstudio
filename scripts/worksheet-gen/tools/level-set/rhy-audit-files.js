/**
 * Rhyming Words Level Set — extract the files a native audit panel reads, from the generated ZIPs.
 *   node tools/level-set/rhy-audit-files.js <loc> <outDir>
 * Per page × level: the two lowest copy numbers → <ID>-L<l>-c<N>.pdf (printed page), -key.pdf (answer key, when the
 * ZIP carries one) and -screen.jpg (the screen image deck.html embeds as the tap layer's backdrop).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const [loc, out] = process.argv.slice(2);
if (!loc || !out) throw new Error('usage: rhy-audit-files.js <loc> <outDir>');
const dir = path.join(__dirname, '..', '..', 'out', 'staging', `wave-rhy-${loc}`);
fs.mkdirSync(out, { recursive: true });
const zips = fs.readdirSync(dir).filter((f) => f.endsWith('.zip'));
const byKey = new Map();
for (const z of zips) {
  const m = /-(k|g1)(\d+)-nothm-d(\d)-\w\w-v(\d+)(?:-u[^.]+)?\.zip$/.exec(z);
  if (!m) continue;
  const id = `${m[1].toUpperCase()}-${m[2]}`;
  const k = `${id}-L${m[3]}`;
  (byKey.get(k) || byKey.set(k, []).get(k)).push({ z, copy: +m[4] });
}
let n = 0;
for (const [k, list] of byKey) {
  for (const { z, copy } of list.sort((a, b) => a.copy - b.copy).slice(0, 2)) {
    const zp = path.join(dir, z);
    const names = execFileSync('unzip', ['-Z1', zp], { encoding: 'utf8' }).split('\n').filter(Boolean);
    const base = path.join(out, `${k}-c${copy}`);
    const pdf = names.find((x) => x.endsWith('.pdf') && !/answer/i.test(x));
    const key = names.find((x) => /answer/i.test(x) && x.endsWith('.pdf'));
    if (pdf) fs.writeFileSync(base + '.pdf', execFileSync('unzip', ['-p', zp, pdf], { maxBuffer: 1 << 28 }));
    if (key) fs.writeFileSync(base + '-key.pdf', execFileSync('unzip', ['-p', zp, key], { maxBuffer: 1 << 28 }));
    const html = execFileSync('unzip', ['-p', zp, 'deck.html'], { maxBuffer: 1 << 28 }).toString('utf8');
    const imgs = [...html.matchAll(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/g)].map((x) => x[1]).sort((a, b) => b.length - a.length);
    if (imgs.length && key) fs.writeFileSync(base + '-screen.jpg', Buffer.from(imgs[0], 'base64'));
    n++;
  }
}
console.log(`${loc}: ${n} copies extracted to ${out}`);
