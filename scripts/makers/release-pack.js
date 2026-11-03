#!/usr/bin/env node
/**
 * Pack a worksheet-makers RELEASE on the PC (ARCHITECTURE §5.2, §13; task 3 of the ten): exactly the files the site
 * serves, from the gated build tree, into one folder that mirrors /var/www/lcs-media/ and is uploaded as a whole:
 *
 *   node scripts/makers/release-pack.js [--out=out/makers-release] [--all-versions]
 *
 *   <out>/makers/versions.json · data/current.txt · <maker>/current.txt · play/current.txt       the POINTERS (mutable)
 *   <out>/makers/play/strings.json · play/landings.json  (copies of the current play version's — the maker screen
 *                                                          fetches them unversioned at /makers/play/)
 *   <out>/makers/app/  index.html shell.js shell.css recipe.js resolve-version.js export.js ui-strings.js vendor/pdf-lib.js
 *   <out>/makers/migrations/<maker>.json                (docs/makers/migrations, content-fix records)
 *   <out>/makers/<maker>/<hash>/ · data/<hash>/ · play/<hash>/   the CURRENT version folders (immutable once
 *                                                          installed); --all-versions packs every folder in the tree
 *   <out>/makers-assets/themes-512/ · fonts/              the reviewed pictures (512 px) and the fonts
 *   <out>/RELEASE.json                                    { at, versions, pointers, files: { path: { sha256, size } } }
 *
 * The server never builds a maker: install-release.js (run by deploy.sh) verifies every sha256, copies version folders
 * only where they do not exist yet, then the pointers. Upload: rsync/scp the folder to
 * /var/www/lcs-media/_staging/makers-release/ (CLAUDE.md §A.14.12: staging lives under _staging/, never /tmp).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const REPO = path.resolve(__dirname, '..', '..');
const SRC = path.join(REPO, 'out', 'makers');
const SHELL = path.join(REPO, 'scripts', 'makers', 'shell');
const SHELL_FILES = ['index.html', 'shell.js', 'shell.css', 'recipe.js', 'resolve-version.js', 'export.js'];
const HASH_DIR = /^[a-f0-9]{12,24}$/;

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const OUT = path.resolve(REPO, args.out || 'out/makers-release');

function sha256(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
function copyTree(from, to, files, rel) {
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const f = path.join(from, e.name), t = path.join(to, e.name), r = rel + '/' + e.name;
    if (e.isDirectory()) { fs.mkdirSync(t, { recursive: true }); copyTree(f, t, files, r); continue; }
    fs.mkdirSync(to, { recursive: true });
    fs.copyFileSync(f, t);
    files[r] = { sha256: sha256(f), size: fs.statSync(f).size };
  }
}

function main() {
  if (!fs.existsSync(path.join(SRC, 'versions.json'))) throw new Error('no build tree: ' + SRC);
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
  const files = {}, versions = [], pointers = [];
  const put = (rel, from) => { const to = path.join(OUT, rel); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); files[rel] = { sha256: sha256(from), size: fs.statSync(from).size }; pointers.push(rel); };
  const ledger = JSON.parse(fs.readFileSync(path.join(SRC, 'versions.json'), 'utf8'));

  // version folders: the CURRENT one of every maker, of data and of play (current.txt + the ledger's currentData), or
  // every hash-named folder with --all-versions (needed only once teachers' saved recipes pin older versions — none
  // exists before the first release; the build tree keeps 30+ historical folders per maker from the pilot)
  const current = new Set();
  for (const [id, v] of Object.entries(ledger)) { current.add(`${id}/${v.current}`); if (v.currentData) current.add(`data/${v.currentData}`); }
  for (const top of [...Object.keys(ledger), 'data', 'play']) {
    const cur = path.join(SRC, top, 'current.txt');
    if (fs.existsSync(cur)) current.add(`${top}/${fs.readFileSync(cur, 'utf8').trim()}`);
  }
  for (const top of [...Object.keys(ledger), 'data', 'play']) {
    const d = path.join(SRC, top);
    if (!fs.existsSync(d)) { if (top !== 'play') throw new Error('ledger names a maker with no folder: ' + top); continue; }
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory() || !HASH_DIR.test(e.name)) continue;
      if (!args['all-versions'] && !current.has(`${top}/${e.name}`)) continue;
      const rel = `makers/${top}/${e.name}`;
      copyTree(path.join(d, e.name), path.join(OUT, rel), files, rel);
      versions.push(rel);
    }
    const cur = path.join(d, 'current.txt');
    if (fs.existsSync(cur)) put(`makers/${top}/current.txt`, cur);
  }
  put('makers/versions.json', path.join(SRC, 'versions.json'));
  // the play pointers the maker screen fetches unversioned
  const playCur = fs.existsSync(path.join(SRC, 'play', 'current.txt')) ? fs.readFileSync(path.join(SRC, 'play', 'current.txt'), 'utf8').trim() : null;
  if (!playCur) throw new Error('no play tree — node scripts/makers/build-play.js');
  for (const f of ['strings.json', 'landings.json']) put(`makers/play/${f}`, path.join(SRC, 'play', playCur, f));
  // the app shell + generated files
  for (const f of SHELL_FILES) put(`makers/app/${f}`, path.join(SHELL, f));
  put('makers/app/ui-strings.js', path.join(SRC, 'ui-strings.js'));
  put('makers/app/vendor/pdf-lib.js', path.join(SRC, 'vendor', 'pdf-lib.js'));
  // content-fix records
  const mig = path.join(REPO, 'docs', 'makers', 'migrations');
  if (fs.existsSync(mig)) for (const f of fs.readdirSync(mig)) if (f.endsWith('.json')) put(`makers/migrations/${f}`, path.join(mig, f));
  // the pictures and the fonts (unversioned asset base, scripts/worksheet-gen/lib/platform/browser.js ASSET_BASE)
  for (const [rel, from] of [['makers-assets/themes-512', path.join(REPO, 'scripts', 'worksheet-gen', 'cache', 'themes-512')], ['makers-assets/fonts', path.join(REPO, 'scripts', 'worksheet-gen', 'assets', 'fonts')], ['makers-assets/family-portraits', path.join(REPO, 'scripts', 'worksheet-gen', 'data', 'b5', 'family-portraits')]]) {
    if (!fs.existsSync(from)) throw new Error('assets missing: ' + from);
    copyTree(from, path.join(OUT, rel), files, rel);
  }
  const bytes = Object.values(files).reduce((n, f) => n + f.size, 0);
  const manifest = { at: new Date().toISOString(), from: path.relative(REPO, SRC).replace(/\\/g, '/'), makers: Object.keys(ledger), versions: versions.sort(), pointers: pointers.sort(), files };
  fs.writeFileSync(path.join(OUT, 'RELEASE.json'), JSON.stringify(manifest, null, 1));
  console.log(`release: ${Object.keys(files).length} files, ${(bytes / 1048576).toFixed(1)} MB, ${versions.length} version folders, ${Object.keys(ledger).length} makers → ${OUT}`);
  return manifest;
}

if (require.main === module) { try { main(); } catch (e) { console.error('release-pack: ' + e.message); process.exit(1); } }
module.exports = { main, OUT };
