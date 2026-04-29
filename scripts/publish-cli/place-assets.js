/**
 * Asset placement + temp-staging + atomic symlink swap + chown +
 * version-pruning to archive.
 *
 * Per Brief B Phase 3 v4 Surface 1 + Surface 3.
 *
 * Layout:
 *   /var/www/lcs-media/decks/<locale>/<slug>-v<N>/                  (5 assets, version N)
 *   /var/www/lcs-media/decks/<locale>/<slug>                        (symlink → <slug>-v<N>)
 *   /var/www/lcs-media/decks/.archived/<locale>/<slug>-pruned-<ts>/ (archived aged versions)
 *
 * Atomicity (per amendment A1):
 *   fs.symlinkSync(targetName, linkPath + '.new');
 *   fs.renameSync(linkPath + '.new', linkPath);
 * rename(2) on a symlink-onto-symlink is atomic — single inode-table update.
 * No no-symlink window. NOT `ln -sfn` which is unlink + symlink (2 syscalls).
 *
 * Pruning (per amendment A3):
 *   mv <slug>-v<N-3>... to .archived/<locale>/<slug>-pruned-<ts>/<slug>-v<X>/
 * NOT rm. §A.3 spirit; consistent with Phase 5 unpublish archive posture.
 *
 * Permissions (per amendment A4):
 *   chown -R lcs-media:lcs-media on the placed version dir post-rename.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var child = require('child_process');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ARCHIVE_ROOT = '/var/www/lcs-media/decks/.archived';
var KEEP_VERSIONS = 3;  // retain last 3 versions; older mv to archive

function localeRoot(locale) { return path.join(DECKS_ROOT, locale); }
function versionDir(locale, slug, n) { return path.join(localeRoot(locale), slug + '-v' + n); }
function stagingDir(locale, slug, n) { return versionDir(locale, slug, n) + '.staging'; }
function symlinkPath(locale, slug) { return path.join(localeRoot(locale), slug); }
function archiveLocaleRoot(locale) { return path.join(ARCHIVE_ROOT, locale); }

/**
 * Find the current max version number for a given (locale, slug).
 * Returns 0 if no version exists.
 */
function maxVersion(locale, slug) {
  var dir = localeRoot(locale);
  if (!fs.existsSync(dir)) return 0;
  var entries = fs.readdirSync(dir);
  var prefix = slug + '-v';
  var max = 0;
  entries.forEach(function (e) {
    if (e.indexOf(prefix) === 0 && !e.endsWith('.staging')) {
      var rest = e.slice(prefix.length);
      var n = parseInt(rest, 10);
      if (!isNaN(n) && n > max) max = n;
    }
  });
  return max;
}

/**
 * Compute next version. New deck → 1; existing deck → max + 1.
 */
function nextVersion(locale, slug) {
  return maxVersion(locale, slug) + 1;
}

/**
 * mkdir -p with mode 755 (default).
 */
function mkdirP(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Ensure the per-locale subdir at /var/www/lcs-media/decks/<locale>/ exists with
 * lcs-media:lcs-media ownership matching existing /var/www/lcs-media/* siblings.
 *
 * Idempotent: skips chown when the dir already exists (preserves operator-set
 * ownership; avoids overriding on every re-publish). The pre-Phase-4 hygiene
 * commit one-time-chowns existing en/ + de/ via plink; this helper handles
 * future tier-launch locale creation (es, nl when Tier 2; sv, fi, no when
 * Tier 3; etc.) at first-publish time.
 *
 * Shells out to `chown` (matches existing chownVersionDir pattern at line 113).
 * No programmatic uid/gid resolution needed.
 */
function ensureLocaleDir(locale) {
  var dir = localeRoot(locale);
  var existed = fs.existsSync(dir);
  if (!existed) {
    fs.mkdirSync(dir, { recursive: true });
    child.execFileSync('chown', ['lcs-media:lcs-media', dir], { stdio: 'pipe' });
  }
  return dir;
}

/**
 * Place the 5 assets into the staging directory <slug>-v<N>.staging/.
 * assets is a map of filename → Buffer or string.
 */
function placeStaging(locale, slug, n, assets) {
  var dir = stagingDir(locale, slug, n);
  // If staging dir exists from a prior failed run, error out — caller decides recovery.
  if (fs.existsSync(dir)) {
    throw new Error('place-assets.placeStaging: staging dir already exists at ' + dir +
      '; previous publish attempt may have failed mid-write. Manual cleanup required: rm -rf ' + dir);
  }
  mkdirP(dir);
  Object.keys(assets).forEach(function (filename) {
    var content = assets[filename];
    if (Buffer.isBuffer(content) || typeof content === 'string') {
      fs.writeFileSync(path.join(dir, filename), content);
    } else {
      throw new Error('place-assets.placeStaging: invalid asset content type for ' + filename);
    }
  });
  return dir;
}

/**
 * Atomic rename .staging → versioned dir.
 */
function commitStaging(locale, slug, n) {
  var staging = stagingDir(locale, slug, n);
  var live = versionDir(locale, slug, n);
  fs.renameSync(staging, live);
  return live;
}

/**
 * chown -R lcs-media:lcs-media on the version dir.
 * Per amendment A4. Synchronous; throws on failure.
 */
function chownVersionDir(locale, slug, n) {
  var dir = versionDir(locale, slug, n);
  child.execFileSync('chown', ['-R', 'lcs-media:lcs-media', dir], { stdio: 'pipe' });
}

/**
 * Atomic symlink swap per amendment A1.
 *   1. Create temp symlink at <slug>.new pointing at <slug>-v<N>.
 *   2. fs.renameSync onto <slug>. rename(2) on symlink-onto-symlink is atomic.
 *
 * For new-deck case (no prior symlink), the rename onto non-existent path also works.
 */
function swapSymlink(locale, slug, n) {
  var link = symlinkPath(locale, slug);
  var tempLink = link + '.new';
  var target = slug + '-v' + n;  // relative target

  // Cleanup any leftover .new from prior failed run.
  if (fs.existsSync(tempLink) || isSymlink(tempLink)) {
    fs.unlinkSync(tempLink);
  }

  fs.symlinkSync(target, tempLink);
  fs.renameSync(tempLink, link);
}

function isSymlink(p) {
  try {
    return fs.lstatSync(p).isSymbolicLink();
  } catch (e) {
    return false;
  }
}

/**
 * Prune aged versions per amendment A3: mv to archive folder.
 * Keeps last KEEP_VERSIONS versions; mv older versions to
 * .archived/<locale>/<slug>-pruned-<timestamp>/<slug>-v<X>/.
 *
 * Returns array of {from, to} pairs for reporting.
 */
function pruneAgedVersions(locale, slug, currentN) {
  var dir = localeRoot(locale);
  var entries = fs.readdirSync(dir);
  var prefix = slug + '-v';
  var versionsToKeep = [];
  for (var i = 0; i < KEEP_VERSIONS; i++) {
    versionsToKeep.push(currentN - i);
  }

  var pruned = [];
  entries.forEach(function (e) {
    if (e.indexOf(prefix) !== 0 || e.endsWith('.staging')) return;
    var rest = e.slice(prefix.length);
    var n = parseInt(rest, 10);
    if (isNaN(n)) return;
    if (versionsToKeep.indexOf(n) !== -1) return;  // keep
    if (n >= currentN) return;  // safety: never prune current or newer
    // Prune this version.
    var ts = utcStamp();
    var archiveDir = path.join(archiveLocaleRoot(locale), slug + '-pruned-' + ts);
    mkdirP(archiveDir);
    var from = path.join(dir, e);
    var to = path.join(archiveDir, e);
    fs.renameSync(from, to);
    pruned.push({ from: from, to: to });
  });
  return pruned;
}

function utcStamp() {
  var d = new Date();
  function p(n) { return n < 10 ? '0' + n : '' + n; }
  return '' + d.getUTCFullYear() +
    p(d.getUTCMonth() + 1) +
    p(d.getUTCDate()) +
    p(d.getUTCHours()) +
    p(d.getUTCMinutes()) +
    p(d.getUTCSeconds());
}

/**
 * Unpublish all FS assets for (locale, slug) per Brief B Phase 5 Sub-phase 5.4.
 *
 * Atomically:
 *   1. Read symlink existence (defensive — at least ONE of versioned dir or symlink must exist).
 *   2. mkdir -p .archived/<locale>/<slug>-unpublished-<utc>/.
 *   3. Remove the canonical symlink — immediate 404 for the canonical URL.
 *   4. mv every <slug>-v<N>/ versioned dir (excluding any .staging) into the
 *      archive subdir. Same prefix-based scan as pruneAgedVersions, just
 *      unconditional (every version moves, not just aged).
 *
 * Symlink-removal-first ordering: ensures no broken-symlink window
 * (symlink pointing at moved/missing target). Once symlink is gone, dirs
 * can be moved freely without serving-state implications.
 *
 * Pattern matches existing place() architecture (sibling helper in same
 * module; uses utcStamp + mkdirP + isSymlink helpers). No new dependency.
 *
 * Returns: { archiveDir, symlinkRemoved, movedVersions: [{from, to}] }.
 */
function unpublishAssets(locale, slug) {
  var dir = localeRoot(locale);
  var link = symlinkPath(locale, slug);
  var prefix = slug + '-v';

  if (!fs.existsSync(dir)) {
    throw new Error('place-assets.unpublishAssets: locale dir does not exist: ' + dir);
  }

  // Collect versioned dirs matching slug (exclude .staging).
  var entries = fs.readdirSync(dir);
  var versionedDirs = [];
  entries.forEach(function (e) {
    if (e.indexOf(prefix) !== 0 || e.endsWith('.staging')) return;
    var rest = e.slice(prefix.length);
    var n = parseInt(rest, 10);
    if (isNaN(n)) return;
    versionedDirs.push({ name: e, version: n, path: path.join(dir, e) });
  });

  var symlinkPresent = isSymlink(link);
  if (versionedDirs.length === 0 && !symlinkPresent) {
    throw new Error(
      'place-assets.unpublishAssets: nothing to unpublish for ' + locale + '/' + slug +
      ' (no versioned dirs at ' + dir + ', no symlink at ' + link + ')'
    );
  }

  var ts = utcStamp();
  var archiveDir = path.join(archiveLocaleRoot(locale), slug + '-unpublished-' + ts);
  mkdirP(archiveDir);

  // Step 3: remove canonical symlink first (immediate 404 — no broken-symlink window).
  if (symlinkPresent) {
    fs.unlinkSync(link);
  }

  // Step 4: move every versioned dir to archive.
  var movedVersions = [];
  versionedDirs.forEach(function (vd) {
    var to = path.join(archiveDir, vd.name);
    fs.renameSync(vd.path, to);
    movedVersions.push({ from: vd.path, to: to });
  });

  return {
    archiveDir: archiveDir,
    symlinkRemoved: symlinkPresent,
    movedVersions: movedVersions
  };
}

/**
 * Full pipeline for a single deck publish.
 * Returns: { versionDir, version, prunedVersions, symlinkSwapped: true }
 */
function place(locale, slug, assets) {
  // Pre-flight: ensure locale dir exists with lcs-media:lcs-media ownership.
  ensureLocaleDir(locale);

  var n = nextVersion(locale, slug);

  // Step 2-3: write to staging then atomic rename to versioned dir.
  placeStaging(locale, slug, n, assets);
  var versionPath = commitStaging(locale, slug, n);

  // Step 4 (amendment A4): chown.
  chownVersionDir(locale, slug, n);

  // Step 5 (amendment A1): atomic symlink swap.
  swapSymlink(locale, slug, n);

  // Step 6 (amendment A3): prune aged versions to archive.
  var pruned = pruneAgedVersions(locale, slug, n);

  return {
    versionDir: versionPath,
    version: n,
    prunedVersions: pruned,
    symlinkSwapped: true
  };
}

module.exports = {
  place: place,
  unpublishAssets: unpublishAssets,
  maxVersion: maxVersion,
  nextVersion: nextVersion,
  versionDir: versionDir,
  stagingDir: stagingDir,
  symlinkPath: symlinkPath,
  isSymlink: isSymlink,
  utcStamp: utcStamp,
  ensureLocaleDir: ensureLocaleDir,
  KEEP_VERSIONS: KEEP_VERSIONS,
  DECKS_ROOT: DECKS_ROOT,
  ARCHIVE_ROOT: ARCHIVE_ROOT,
  // Internal helpers exposed for testing
  _placeStaging: placeStaging,
  _commitStaging: commitStaging,
  _chownVersionDir: chownVersionDir,
  _swapSymlink: swapSymlink,
  _pruneAgedVersions: pruneAgedVersions
};
