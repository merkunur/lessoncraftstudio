#!/usr/bin/env node
/**
 * extract-b2var-sweep.js — refresh out/b2var-sweep/ from the staged EN ZIPs.
 *
 * The sweep render a panel is briefed from is byte-identical to the ZIP's own
 * thumbnail.png (verified), so there is nothing to re-render: unzip it under the
 * name gen-b2var-faces.js expects, `<id>-<theme|nothm>.png`.
 *
 * ⚠ Run this after ANY change that alters what a face draws or which theme it
 * carries. A panel briefed from a stale render describes a page that no longer
 * exists, which is the exact failure that produced 74 false claims once already.
 * Stale files for a face whose theme changed are removed, so a repin cannot
 * leave the old theme's picture on disk beside the new one.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const ROOT = path.join(__dirname, '..');

const stagingDir = path.join(ROOT, 'out', 'staging', 'wave-b2var-en');
const outDir = path.join(ROOT, 'out', 'b2var-sweep');
if (!fs.existsSync(stagingDir)) { console.error('no staged en wave at ' + stagingDir); process.exit(2); }
fs.mkdirSync(outDir, { recursive: true });

const zips = fs.readdirSync(stagingDir).filter((f) => f.endsWith('.zip'));
if (!zips.length) { console.error('refusing to run: 0 staged ZIPs'); process.exit(2); }

let wrote = 0, removed = 0;
const want = new Set();
for (const f of zips) {
  // wsg-<wave>-<typeid>-<theme>-d<n>-<locale>.zip
  const m = /^wsg-[^-]+-([a-z0-9]+)-(.+)-d\d+-[a-z]{2}\.zip$/.exec(f);
  if (!m) { console.error('  ? unparsed zip name: ' + f); continue; }
  const name = m[1] + '-' + m[2] + '.png';
  want.add(name);
  const z = new AdmZip(path.join(stagingDir, f));
  const t = z.getEntry('thumbnail.png');
  if (!t) { console.error('  ! no thumbnail in ' + f); continue; }
  fs.writeFileSync(path.join(outDir, name), z.readFile(t));
  wrote++;
}
// drop renders for a theme this wave no longer produces
for (const f of fs.readdirSync(outDir)) {
  if (!f.endsWith('.png')) continue;
  const id = f.split('-')[0];
  if (![...want].some((w) => w.split('-')[0] === id)) continue; // face not in this wave at all
  if (!want.has(f)) { fs.unlinkSync(path.join(outDir, f)); removed++; }
}
console.log(`b2var-sweep: wrote ${wrote} renders, removed ${removed} stale`);
