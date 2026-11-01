#!/usr/bin/env node
/**
 * guessfix-compare.js <live.jsonl> <liveDir> [--apply]
 *
 * Companion of guessfix-regen.js. For every live deck: pdftotext the live PDF (<liveDir>/<loc>/<slug>/<slug>-printable.pdf)
 * and the regenerated one (out/staging/_guessfix/<loc>-<kind>/<deck_id>.zip → printable.pdf) and compare.
 *   • same words AND the same pictures in the same places (tools/pdf-pictures.js) → the page did not change: drop it
 *     from the republish (ZIP + updates.json entry). The pictures matter: an array choice or a counting picture is an
 *     image, so a page whose only change is a picture moving has the same text.
 *   • otherwise → keep
 * Titles: the regenerated manifest title must equal the live one; a different one is replaced by the live title
 * (manifest + deck.html) so the republish never moves a page's title.
 * Without --apply it only reports.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const AdmZip = require('adm-zip');
const { pdfpics } = require('./pdf-pictures.js');

const WG = path.resolve(__dirname, '..');
const [LIVE, LIVEDIR] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const APPLY = process.argv.includes('--apply');
const TAG = (process.argv.find((a) => a.startsWith('--tag=')) || '--tag=guess').slice(6);   // as guessfix-regen.js --tag
if (!LIVE || !LIVEDIR) throw new Error('usage: guessfix-compare.js <live.jsonl> <liveDir> [--apply]');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guessfix-'));
const text = (pdf) => execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8', maxBuffer: 64 << 20 })
  .split(/\r?\n/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);

const live = fs.readFileSync(LIVE, 'utf8').trim().split(/\r?\n/).map((l) => JSON.parse(l));
const stats = {};
const drop = [];
let retitled = 0;
(async () => {
for (const d of live) {
  const kind = d.indexable === false ? 'noidx' : 'idx';
  const dir = path.join(WG, 'out', 'staging', '_' + TAG + 'fix', d.loc + '-' + kind);
  const zf = path.join(dir, d.deck_id + '.zip');
  const k = d.type + (kind === 'noidx' ? ' (set)' : '');
  const s = (stats[k] = stats[k] || { changed: 0, same: 0, missing: 0 });
  if (!fs.existsSync(zf)) { s.missing++; continue; }
  const zip = new AdmZip(zf);
  const fresh = path.join(tmp, 'f.pdf');
  fs.writeFileSync(fresh, zip.readFile('printable.pdf'));
  const old = path.join(tmp, 'l.pdf');   // a short path: some live paths pass the Windows 260-character limit
  fs.copyFileSync(path.join(LIVEDIR, d.loc, d.slug, d.slug + '-printable.pdf'), old);
  const a = text(old), b = text(fresh);
  // content, not layout: a title that wraps on another line, or French spacing before ':' (a later typography fix), is not a
  // change of the page — compare the sorted words with the space before : ? ! ; removed
  const words = (ls) => ls.join(" ").replace(/[\s\u00A0\u202F]+([:?!;])/g, "$1").split(/\s+/).filter(Boolean).sort().join(" ");
  // pictures: image + x + size, y relative to the first picture (a title wrapping one line lower shifts everything alike)
  const pics = (list) => {
    const y0 = list.length ? +list[0].split(",")[3] : 0;
    return list.map((p) => { const [h, xy] = p.split("@"); const v = xy.split(","); return h + "@" + v[0] + "," + v[1] + "," + v[2] + "," + (+v[3] - y0); }).join(" ");
  };
  const same = words(a) === words(b) && pics(await pdfpics(fs.readFileSync(old))) === pics(await pdfpics(fs.readFileSync(fresh)));
  if (same) { s.same++; drop.push({ dir, d }); continue; }
  s.changed++;
  const m = JSON.parse(zip.readAsText('manifest.json'));
  const liveM = JSON.parse(fs.readFileSync(path.join(LIVEDIR, d.loc, d.slug, 'manifest.json'), 'utf8'));
  if (JSON.stringify(m.title) !== JSON.stringify(liveM.title)) {
    retitled++;
    console.log('title ' + d.deck_id + ': ' + JSON.stringify(m.title) + ' -> live ' + JSON.stringify(liveM.title));
    if (APPLY) {
      const oldT = m.title[d.loc], newT = liveM.title[d.loc];
      m.title = liveM.title;
      zip.updateFile('manifest.json', Buffer.from(JSON.stringify(m, null, 2)));
      const html = zip.readAsText('deck.html');
      zip.updateFile('deck.html', Buffer.from(html.split(oldT).join(newT)));
      zip.writeZip(zf);
    }
  }
}
for (const [k, s] of Object.entries(stats).sort()) console.log(k.padEnd(14) + ' changed ' + s.changed + '  unchanged ' + s.same + (s.missing ? '  MISSING ' + s.missing : ''));
console.log('unchanged pages to drop: ' + drop.length + ', titles restored: ' + retitled);
if (APPLY) {
  for (const { dir, d } of drop) {
    fs.unlinkSync(path.join(dir, d.deck_id + '.zip'));
    const mf = path.join(dir, 'updates.json');
    const m = JSON.parse(fs.readFileSync(mf, 'utf8'));
    delete m[d.deck_id + '.zip'];
    fs.writeFileSync(mf, JSON.stringify(m, null, 1) + '\n');
  }
  console.log('applied');
}
fs.rmSync(tmp, { recursive: true, force: true });
})();
