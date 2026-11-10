#!/usr/bin/env node
/**
 * Install a staged worksheet-makers release on the server (run by deploy.sh BEFORE the Next build, CLAUDE.md §20.4;
 * task 3 of the ten). The PC packs it (scripts/makers/release-pack.js) and uploads it to the staging folder; this
 * script:
 *
 *   1. does nothing, successfully, when there is no staged release (the makers stay unreleased until the operator
 *      uploads one — operator 2026-10-31: nothing goes live before all 60 are built)
 *   2. VERIFIES every file against RELEASE.json (sha256 + size) — a partial or corrupted upload installs nothing
 *   3. copies every VERSION folder that does not exist yet (makers/<maker>/<hash>, makers/data/<hash>,
 *      makers/play/<hash>); an existing one is never touched (immutable per version, ARCHITECTURE §5.2) and must be
 *      byte-identical to the staged one, else the install refuses
 *   4. copies the assets (makers-assets/…) without overwriting an existing file
 *   5. writes the POINTERS last (versions.json, current.txt ×N, play/strings.json, play/landings.json, app/*,
 *      migrations/*) — so a reader never sees a pointer to a folder that is not there yet
 *   6. chowns the trees to lcs-media (when running as root on the server) and removes the staging folder
 *      (CLAUDE.md §A.14.12: the server hosts only what it serves)
 *
 *   node scripts/makers/install-release.js [--stage=/var/www/lcs-media/_staging/makers-release] [--root=/var/www/lcs-media] [--dry-run] [--keep-stage]
 *
 * Idempotent: a second run with the same release reports every version as already installed and rewrites only the
 * pointers (byte-identical). Exit 1 on any refusal; nothing is written before the whole release verified.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const STAGE = path.resolve(String(args.stage || process.env.MAKERS_STAGE || '/var/www/lcs-media/_staging/makers-release'));
const ROOT = path.resolve(String(args.root || process.env.MAKERS_ROOT || '/var/www/lcs-media'));
const DRY = !!args['dry-run'];
const SAFE_REL = /^(makers|makers-assets)\/[^\0]+$/;

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const inside = (base, p) => { const r = path.relative(base, p); return r && !r.startsWith('..') && !path.isAbsolute(r); };

function listFiles(dir) { const out = []; const walk = (d, rel) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const r = rel ? rel + '/' + e.name : e.name; if (e.isDirectory()) walk(path.join(d, e.name), r); else out.push(r); } }; walk(dir, ''); return out; }

function main() {
  if (!fs.existsSync(path.join(STAGE, 'RELEASE.json'))) { console.log('makers: no staged release at ' + STAGE + ' — nothing to install'); return 0; }
  const m = JSON.parse(fs.readFileSync(path.join(STAGE, 'RELEASE.json'), 'utf8'));
  if (!m || !m.files || !Array.isArray(m.versions) || !Array.isArray(m.pointers)) throw new Error('RELEASE.json is not a release manifest');
  // 2. verify: every manifest file present and intact; no stray file in the stage
  const rels = Object.keys(m.files);
  if (!rels.length) throw new Error('RELEASE.json lists no file');
  for (const rel of rels) {
    if (!SAFE_REL.test(rel) || rel.split('/').includes('..')) throw new Error('unsafe path in RELEASE.json: ' + rel);
    const f = path.join(STAGE, rel);
    if (!inside(STAGE, f) || !fs.existsSync(f)) throw new Error('staged file missing: ' + rel);
    const st = fs.statSync(f);
    if (st.size !== m.files[rel].size || sha256(f) !== m.files[rel].sha256) throw new Error('staged file does not match RELEASE.json: ' + rel);
  }
  const stray = listFiles(STAGE).filter((r) => r !== 'RELEASE.json' && !m.files[r]);
  if (stray.length) throw new Error('files in the stage that RELEASE.json does not list: ' + stray.slice(0, 5).join(', '));
  for (const v of m.versions) if (!/^makers\/[a-z0-9-]+\/[a-f0-9]{12,24}$/.test(v)) throw new Error('not a version folder: ' + v);
  for (const p of m.pointers) if (!m.files[p]) throw new Error('pointer not in files: ' + p);
  const byVersion = (rel) => m.versions.find((v) => rel.startsWith(v + '/'));
  const assets = rels.filter((r) => r.startsWith('makers-assets/'));
  const pointers = m.pointers;
  const classified = new Set([...pointers, ...assets]);
  for (const rel of rels) if (!classified.has(rel) && !byVersion(rel)) throw new Error('a file that is neither a version file, a pointer nor an asset: ' + rel);
  console.log(`makers: release of ${m.at} verified — ${rels.length} files, ${m.versions.length} version folders, ${pointers.length} pointers, ${assets.length} asset files`);

  // 3. version folders: new ones copied, existing ones must be identical
  let copied = 0, kept = 0;
  for (const v of m.versions) {
    const dest = path.join(ROOT, v);
    const members = rels.filter((r) => r.startsWith(v + '/'));
    if (fs.existsSync(dest)) {
      for (const r of members) { const f = path.join(ROOT, r); if (!fs.existsSync(f) || sha256(f) !== m.files[r].sha256) throw new Error(`installed version ${v} differs from the staged one at ${r} — a version is never rewritten; pack a new version instead`); }
      kept++;
      continue;
    }
    if (!DRY) for (const r of members) { const to = path.join(ROOT, r); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(path.join(STAGE, r), to); }
    copied++;
  }
  // 4. assets, never overwriting
  let newAssets = 0;
  for (const r of assets) { const to = path.join(ROOT, r); if (fs.existsSync(to)) continue; if (!DRY) { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(path.join(STAGE, r), to); } newAssets++; }
  // 5. pointers, last, atomically each
  for (const r of pointers) {
    const to = path.join(ROOT, r);
    if (DRY) continue;
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(path.join(STAGE, r), to + '.tmp');
    fs.renameSync(to + '.tmp', to);
  }
  console.log(`makers: ${copied} version folders installed, ${kept} already present (identical), ${newAssets} new asset files, ${pointers.length} pointers ${DRY ? 'would be ' : ''}written → ${ROOT}`);
  if (DRY) return 0;
  // 6. ownership + the stage
  if (process.platform !== 'win32' && process.getuid && process.getuid() === 0) {
    // only what is not lcs-media's yet: the protected flagship renders are immutable (chattr +i), and a chown -R over them
    // would fail (server-scripts/protect-flagship-art.sh)
    for (const d of ['makers', 'makers-assets']) if (fs.existsSync(path.join(ROOT, d))) { try { execFileSync('find', [path.join(ROOT, d), '(', '!', '-user', 'lcs-media', '-o', '!', '-group', 'lcs-media', ')', '-exec', 'chown', 'lcs-media:lcs-media', '{}', '+']); } catch (e) { console.log('makers: chown failed (' + e.message + ')'); } }
  }
  if (!args['keep-stage']) { fs.rmSync(STAGE, { recursive: true, force: true }); console.log('makers: staging folder removed'); }
  return 0;
}

if (require.main === module) { try { process.exit(main()); } catch (e) { console.error('install-release: REFUSED — ' + e.message); process.exit(1); } }
module.exports = { main };
