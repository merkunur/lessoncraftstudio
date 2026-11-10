#!/usr/bin/env node
/**
 * art-guard.js — the flagship drawings are protected the way the image library is (operator 2026-11-08: "you should also
 * protect all the new images in the same way you protect the image library images. No changes on the website or new
 * deployments or anything else shouldn't effect them").
 *
 * The image library's layers (server-scripts/protect-image-library.sh) and their counterparts here:
 *   1. isolated storage            → server-scripts/protect-flagship-art.sh: /var/www/lcs-media/flagship-art/drawn
 *   2. reached only by a link      → the makers read the renders in makers-assets/, never the masters
 *   3. owned by lcs-media          → the same script
 *   4. immutable files (chattr +i) → the same script, masters and their served renders; on the PC every locked drawing
 *                                    is read-only (this tool), so no tool or agent can overwrite it by accident
 *   5. deploy guards               → deploy.sh runs `art-guard.js --verify --dir=/var/www/lcs-media/flagship-art/drawn`
 *                                    (a locked master missing or changed stops the deploy) and counts them before and after
 *   6. never in git                → art-src/ is git-ignored and the commit hook refuses any image (operator 2026-11-08:
 *                                    "images should never be pushed to git"); only the lock below (names + SHA-1) is
 *                                    committed. The masters reach the server by upload, as the image library did.
 *   7. written rules               → CLAUDE.md §A.1 / §A.3
 *   plus the off-host copy: scripts/ops/pull-deck-backup.sh pulls the isolated masters to the PC weekly, and --lock
 *   mirrors each locked drawing to C:/Users/rkgen/lcs-backups/flagship-art at once.
 *
 * The lock (docs/makers/art-lock.json) lists every drawing the owner accepted (docs/makers/art-accepted.json) with the
 * SHA-1 of its source. A deliberate fix to a locked drawing: --unlock=<noun>, change it, --lock again.
 *   node scripts/worksheet-gen/tools/art-guard.js --verify [--dir=D]  (default) every locked drawing present and unchanged in D
 *                                                                     (art-src/drawn on the PC; the isolated masters on the server)
 *   node scripts/worksheet-gen/tools/art-guard.js --lock              lock every accepted drawing (read-only + SHA-1 + PC mirror)
 *   node scripts/worksheet-gen/tools/art-guard.js --unlock=<noun>     release one drawing for a deliberate fix
 *   node scripts/worksheet-gen/tools/art-guard.js --poison            prove --verify fails on a missing and on a changed drawing
 *   node scripts/worksheet-gen/tools/art-guard.js --list-renders      the served renders of the locked drawings as `sha1  path` lines
 *                                                                     (for server-scripts/protect-flagship-art.sh)
 *   --verify --dir=D --lock=F                                         check D against an installed copy F of the lock (deploy.sh)
 * Upload + server protection: scripts/ops/upload-flagship-art.sh (PC) → server-scripts/protect-flagship-art.sh;
 * a deliberate fix on the server: server-scripts/update-flagship-art.sh.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const WG = path.join(__dirname, '..');
const REPO = path.join(WG, '..', '..');
const DRAWN = path.join(WG, 'art-src', 'drawn');
const LOCK = path.join(REPO, 'docs', 'makers', 'art-lock.json');
const ACCEPTED = path.join(REPO, 'docs', 'makers', 'art-accepted.json');
const MIRROR = process.env.LCS_ART_MIRROR || 'C:/Users/rkgen/lcs-backups/flagship-art';
const sha1 = (f) => crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const readLock = () => (fs.existsSync(LOCK) ? JSON.parse(fs.readFileSync(LOCK, 'utf8')) : { note: '', files: {} });

/** the faults of the drawings in dir against the lock: [] when every locked drawing is present and unchanged */
function verify(dir, lock) {
  const out = [];
  for (const [noun, want] of Object.entries(lock.files)) {
    const f = path.join(dir, noun + '.svg');
    if (!fs.existsSync(f)) { out.push(`MISSING ${noun}.svg`); continue; }
    const got = sha1(f);
    if (got !== want) out.push(`CHANGED ${noun}.svg (sha1 ${got.slice(0, 10)}, locked ${want.slice(0, 10)})`);
  }
  return out;
}

function writeLock(lock) {
  const sorted = Object.fromEntries(Object.entries(lock.files).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(LOCK, JSON.stringify({ note: 'The flagship drawings the owner accepted, locked like the image library (tools/art-guard.js). Never delete, move or overwrite one; a deliberate fix goes --unlock=<noun> → change → --lock.', count: Object.keys(sorted).length, files: sorted }, null, 1) + '\n');
}

function lock() {
  const accepted = JSON.parse(fs.readFileSync(ACCEPTED, 'utf8'));
  const l = readLock();
  let added = 0, mirrored = 0;
  const canMirror = (() => { try { fs.mkdirSync(MIRROR, { recursive: true }); return true; } catch (e) { return false; } })();
  for (const noun of accepted) {
    const f = path.join(DRAWN, noun + '.svg');
    if (!fs.existsSync(f)) { console.log(`not found, not locked: ${noun}`); continue; }
    if (l.files[noun] && l.files[noun] !== sha1(f)) { console.log(`CHANGED since it was locked, left as locked: ${noun} (unlock it first if the change is deliberate)`); continue; }
    if (!l.files[noun]) { l.files[noun] = sha1(f); added++; }
    try { fs.chmodSync(f, 0o444); } catch (e) { /* a file system without modes */ }
    if (canMirror) { const m = path.join(MIRROR, noun + '.svg'); if (!fs.existsSync(m) || sha1(m) !== l.files[noun]) { try { if (fs.existsSync(m)) fs.chmodSync(m, 0o644); } catch (e) { /* */ } fs.copyFileSync(f, m); fs.chmodSync(m, 0o444); mirrored++; } }
  }
  writeLock(l);
  console.log(`locked ${Object.keys(l.files).length} drawings (${added} new), mirrored ${mirrored} to ${canMirror ? MIRROR : '(no mirror folder)'}`);
}

function unlock(noun) {
  const l = readLock();
  if (!l.files[noun]) { console.log(`${noun} is not locked`); return; }
  delete l.files[noun];
  writeLock(l);
  try { fs.chmodSync(path.join(DRAWN, noun + '.svg'), 0o644); } catch (e) { /* */ }
  console.log(`unlocked ${noun}: change it on purpose, then run --lock (it is still in art-accepted.json)`);
}

function poison() {
  const l = readLock();
  const names = Object.keys(l.files);
  if (names.length < 2) { console.log('POISON NOT APPLIED: fewer than two locked drawings'); process.exit(1); }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'art-guard-'));
  for (const n of names) { const c = path.join(tmp, n + '.svg'); fs.copyFileSync(path.join(DRAWN, n + '.svg'), c); fs.chmodSync(c, 0o644); }
  let bad = 0;
  if (verify(tmp, l).length) { console.log('FAIL: an untouched copy is refused'); bad++; } else console.log('ok   an untouched copy passes');
  fs.unlinkSync(path.join(tmp, names[0] + '.svg'));
  if (verify(tmp, l).some((x) => x.startsWith('MISSING'))) console.log('ok   a deleted drawing is caught'); else { console.log('FAIL: a deleted drawing passes'); bad++; }
  fs.appendFileSync(path.join(tmp, names[1] + '.svg'), '\n');
  if (verify(tmp, l).some((x) => x.startsWith('CHANGED'))) console.log('ok   a changed drawing is caught'); else { console.log('FAIL: a changed drawing passes'); bad++; }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(bad ? 'art-guard poison: FAILING' : 'art-guard poison: all caught');
  process.exit(bad ? 1 : 0);
}

/** the served renders of the locked drawings, in sha1sum format relative to /var/www/lcs-media (the maker release copies
 *  cache/themes-512 byte for byte into makers-assets/themes-512, so the server can check them with `sha1sum -c`) */
function listRenders() {
  const l = readLock();
  const man = JSON.parse(fs.readFileSync(path.join(WG, 'cache', 'manifest.json'), 'utf8'));
  const out = [];
  let stale = 0;
  for (const [theme, t] of Object.entries(man.themes)) for (const [noun, e] of Object.entries(t.nouns)) {
    if (!e.fl || !l.files[noun]) continue;
    const f = path.join(WG, 'cache', 'themes-512', theme, noun + '@3x.webp');
    if (!fs.existsSync(f)) { console.error(`no render yet for locked drawing ${noun} (${theme})`); stale++; continue; }
    // a render older than its drawing is the picture that drawing replaced: it must never be locked on the server
    if (fs.statSync(f).mtimeMs < fs.statSync(path.join(DRAWN, noun + '.svg')).mtimeMs) { console.error(`render older than its drawing (re-render first): ${noun} (${theme})`); stale++; continue; }
    out.push(`${sha1(f)}  makers-assets/themes-512/${theme}/${noun}@3x.webp`);
  }
  process.stdout.write(out.join('\n') + (out.length ? '\n' : ''));
  if (stale) { console.error(`art-guard: ${stale} locked drawing(s) without a current render`); process.exitCode = 1; }
}

if (process.argv.includes('--lock')) lock();
else if (arg('unlock')) unlock(arg('unlock'));
else if (process.argv.includes('--poison')) poison();
else if (process.argv.includes('--list-renders')) listRenders();
else {
  // --lock=F: check against an installed copy of the lock (the server checks the drawings it was given, so a drawing
  // accepted on the PC but not uploaded yet never fails a deploy)
  if (arg('lock') && !fs.existsSync(arg('lock'))) { console.log(`art-guard: ${arg('lock')} does not exist yet (no drawings installed on this machine): nothing to check`); process.exit(0); }
  const l = arg('lock') ? JSON.parse(fs.readFileSync(arg('lock'), 'utf8')) : readLock();
  const dir = arg('dir') || DRAWN;
  if (arg('dir') && !fs.existsSync(dir)) { console.log(`art-guard: ${dir} does not exist yet (the drawings are not installed on this machine): nothing to check`); process.exit(0); }
  const f = verify(dir, l);
  if (f.length) { console.log(`⛔ art-guard: ${f.length} locked flagship drawing(s) missing or changed:\n  ` + f.slice(0, 20).join('\n  ')); process.exit(1); }
  console.log(`✅ art-guard: ${Object.keys(l.files).length} locked flagship drawings present and unchanged in ${dir}`);
}
module.exports = { verify };
