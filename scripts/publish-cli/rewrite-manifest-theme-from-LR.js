#!/usr/bin/env node
/**
 * Salvage script for catalog-export ZIPs whose exercise schema is
 * `{L, R, ...}` (paired-image comparison) rather than `{image, ...}`.
 *
 * Sibling to scripts/publish-cli/rewrite-manifest-theme.js (§15.17 origin
 * for code-addition's wave). That script's classifyZip dispatches on
 * `exercises[0].image / .path / .theme` — the standard single-image-per-
 * exercise schema. more-less (and any future paired-image-comparison app
 * if added) carries `exercises[0].L` instead, with no `image` field. The
 * §A.13 reconciliation gate's predicate is schema-bound the same way, so
 * the gate marks paired-image manifests CLEAN even when manifest.theme is
 * incorrectly null — see the more-less defect surfaced 2026-05-06.
 *
 * This script:
 *   1. Reads exercises[0].L (with .R fallback) as the primary signal.
 *   2. Extracts the second path segment.
 *   3. Resolves the segment to a canonical theme axis-key:
 *      - If it's a clean theme name (matches axes.theme or KNOWN_THEME_NAMES)
 *        — use directly.
 *      - If it's a CUID-shaped image_themes.id — resolve via the inlined
 *        CUID_TO_THEME_NAME map (queried from production
 *        image_themes table at script-authoring time, 100 entries).
 *      - Otherwise halt-ambiguous (defensive — the ZIP's first image lives
 *        outside any registered theme directory).
 *   4. Writes the resolved theme into manifest.theme; repacks ZIP in-place
 *      with backup per the same backup-then-rewrite pattern as the parent
 *      script (§15.17 step 2).
 *
 * Authoring-side root-cause fix is committed alongside this script as a
 * Shape A application in REFERENCE APPS/more-less.html (per §A.13.5 Shape A
 * canonical authoring pattern + reconciliation gate as structural
 * complement). This script salvages the present staged ZIP wave; the
 * authoring-app fix prevents the defect for future waves.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-manifest-theme-from-LR.js <directory> [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

// -------------------------------------------------------------------------
// Inlined CUID_TO_THEME_NAME map.
//
// Generated 2026-05-06 from production `image_themes` table:
//   SELECT id, name FROM image_themes WHERE type='images' ORDER BY name;
//
// CUIDs are stable identifiers; this map is correct as long as the row
// id of an image_theme doesn't change (which it doesn't — Prisma cuids are
// permanent). Re-run the query if image_themes gains rows for new themes.
// -------------------------------------------------------------------------
var CUID_TO_THEME_NAME = {
  cmjt5xd5h0000gx851nwfhtqn: '4th_of_july',
  cmhlu0k5a0008gx0f6x6tsep3: 'accessories',
  cmjt6vu1y0000gxe8dn1ao2m4: 'activities',
  cmkuesvi30000gxa3t9b8i597: 'animals',
  cmjt7qs3c0000gx48hhrtmexe: 'animals_bw',
  cmjt7xlba0000gxi0ap0tnvhb: 'animals_bw_2',
  cmjt84usc0000gxwajiknni32: 'animals_bw_3',
  cmjt8c2xc0000gxbek2d9a4jd: 'animals_bw_4',
  cmjt8jvvs0000gxr0y3mo7re4: 'animals_bw_5',
  cmjt8pwlc0000gx4uw85g1sjr: 'apparel_bw',
  cmjt8z21r0000gxk1j6roke56: 'around_the_house',
  cmjt98yy20000gxzobsdhze38: 'at_the_supermarket',
  cmkuevd3e0000gxxzh1y6kgv5: 'bakery',
  cmkuevhay0000gx098u2rf6ih: 'beach',
  cmkuevq8a0000gx305pnuvw6l: 'beach_bw',
  cmkuevw330000gx5bbz6a20h3: 'beach_bw_2',
  cmjtbfokx0000gx5iphe5x3by: 'birds',
  cmjtbxo4l0000gxvphcsob8vu: 'birds_2',
  cmjtc49um0000gxcfjhlafiy2: 'birds_bw',
  cmjtc9z8d0000gxs0i29q9bmt: 'birds_bw_2',
  cmjtcidlj0000gx9ldhueujir: 'body_parts',
  cmjtcqig00000gxpoecr47cay: 'breakfast',
  cmjtcxub00000gx47ijuig3s6: 'camping',
  cmjtd4ets0000gxi3z7jddote: 'christmas',
  cmjtda3020000gxupkrthvmyu: 'christmas_bw',
  cmjtdffoe0000gx645lxhe2fz: 'christmas_bw_2',
  cmjtdnbk60000gxjiqx7pyzrd: 'classroom',
  cmjtdu8e10000gxyfwakkmc7v: 'classroom_bw',
  cmjtdzonb0000gxc7qfdkllbn: 'classroom_bw_2',
  cmjte8s0n0000gxsk07bjq1il: 'clothing',
  cmjtedw2y0000gx6kjwnwsmu5: 'colors',
  cmjtejlhm0000gxkoe54njz76: 'dessert_bw',
  cmjter7ww0000gx092vn3nyd2: 'desserts_and_sweets',
  cmjtexn480000gxloqymo1s6s: 'dinosaurs',
  cmjtf2tc80000gx02ff2tdjzr: 'easter',
  cmjtf7u840000gxdpdb12f78b: 'easter_bw',
  cmjtfcqvu0000gxrf8bl4h9sq: 'easter_bw_2',
  cmjtfhirg0000gx4gkwyo3upd: 'education_bw',
  cmjtfmjaq0000gxil0zka6ih1: 'emotions',
  cmjtftu8j0000gxy8ede07b4b: 'faces_bw',
  cmjtfzh3u0000gxctkpvdwxpn: 'farm_animals',
  cmjtg6ig00000gxsmy0te96pn: 'farm_animals_bw',
  cmjtgbrcw0000gx76gucfd30h: 'farm_bw',
  cmjtghael0000gxkc0gfq9x59: 'flowers',
  cmjtgmwl50000gxxoruw5u6jz: 'food_bw',
  cmjtgs2t80000gxalelrnbib0: 'food_bw_2',
  cmjtgxssv0000gxnkljeqhbif: 'food_bw_3',
  cmjth4wb10000gx3wrd5m0xbv: 'forest_creatures',
  cmjthakye0000gxhbfg3uohps: 'fruits',
  cmjthmxt60000gxzzwg062h2b: 'fruits_bw',
  cmjthsrgm0000gxd8t6hu0c9j: 'furniture',
  cmjthxqs40000gxpyo4kc6nwa: 'furniture_bw',
  cmjti3h030000gx2odl9do30c: 'home_and_nature_bw',
  cmjti8rk70000gxe74tp7ydas: 'home_bw',
  cmjtidw260000gxpttydmodwp: 'home_bw_2',
  cmjtiktk50000gx328j15o0yi: 'hospital',
  cmjtir44k0000gxf5hn9gszf6: 'household_bw',
  cmjtix4y00000gxrtx5yys65o: 'insects_and_bugs',
  cmjtj27o70000gx3db0ysln45: 'kitchen_bw',
  cmjtj7kzi0000gxfsvsuceh23: 'kitchen_tools',
  cmjtjf7ll0000gxu3wee9oert: 'miscellaneous',
  cmjtjj9730000gx5i1ovh6hnf: 'music',
  cmjtjndtq0000gxitgzybu0oo: 'nature_bw',
  cmjtjuwmc0000gxwg216sr6oh: 'objects_bw',
  cmjtk0vsx0000gxazgdgliqs5: 'occupations',
  cmjtk6ies0000gxnmk0nt8srk: 'ocean_life',
  cmjtkch950000gxzvfoxoic80: 'pets',
  cmjtkgs970000gxcbdrc3j5ky: 'post_office',
  cmjtkkudf0000gxnpt8ashua2: 'reptiles_and_amphibians',
  cmjtkplkr0000gxzzbfx8ybdy: 'sea_life_bw',
  cmjtkvgyx0000gxcvnpd42wic: 'sea_life_bw_2',
  cmjtl042y0000gxomjan77871: 'shapes',
  cmjtl4vyt0000gx0c68gktto8: 'space',
  cmjtl9rn00000gxc7x6o1b5yc: 'space_bw',
  cmjtlfj8y0000gxpeqnqrq40h: 'sports_bw',
  cmjtlkp120000gx1d7epwd72t: 'sports_bw_2',
  cmjtlpqpx0000gxdg1sd85d3p: 'spring',
  cmjtlwq180000gxyen5igkh9y: 'summer',
  cmjtmbimy0000gxmx5sgn9f59: 'thanksgivinng',
  cmjtmizpy0000gx10d0dm9nu9: 'things_that_fly',
  cmjtmsd5x0000gxfi1vvtlgwz: 'tools',
  cmjtmyn4q0000gxrkbkmq8ks4: 'tools_bw',
  cmjtn7uho0000gx69bpma4pwg: 'toys',
  cmjtnhrf90000gxkfetsa0h6p: 'toys_bw',
  cmjtnr20v0000gxytzlkyh4ee: 'toys_bw_2',
  cmjto13t50000gxceh2ad3lxf: 'travel_and_holiday_bw',
  cmjto7dzr0000gxo3lb69d91p: 'tree',
  cmjtoc8o40000gxz692dxw46a: 'valentine_bw',
  cmjtohap20000gxa2hwc6svwa: 'valentine_bw_2',
  cmjtomgkg0000gxli7lz2bg2t: 'vegetables',
  cmjtorprb0000gxwgmyvzqv98: 'vegetables_bw',
  cmjtowphm0000gx7mj21pf1fs: 'vegetables_bw_2',
  cmjtp4zv30000gxk30twsbofr: 'vehicles',
  cmjtpafyq0000gxv6dk74i48q: 'vehicles_bw',
  cmjtpfk8z0000gx68b6uqgwyx: 'vehicles_bw_2',
  cmjtpk72x0000gxgsvg5a106b: 'vehicles_bw_3',
  cmjtpq72y0000gxsmiby0peib: 'weather',
  cmjtpveol0000gx4yftd6wvyv: 'winter',
  cmjtq15nb0000gxgljwj5ihyf: 'zoo_animals',
  cmjtq7hfv0000gxtbwhz2rljp: 'zoo_animals_bw',
};

// All recognized canonical theme axis-keys (for path-segment validation
// when the segment is a clean name rather than a CUID). Identical to the
// values of CUID_TO_THEME_NAME plus any additional axes.theme keys the
// taxonomy could carry but the cuid map doesn't (defensive — none expected
// today since the cuid map is the SoT for image_themes type='images').
var KNOWN_THEME_NAMES = new Set(Object.values(CUID_TO_THEME_NAME));

// CUID-shape recognition: starts with `cm` + 22+ alphanumerics. Prisma cuids
// are 25 chars total; we match conservatively.
var CUID_PATTERN = /^cm[a-z0-9]{20,}$/;

// -------------------------------------------------------------------------
// Path-segment extraction
// -------------------------------------------------------------------------

function extractFirstPath(manifest) {
  var ex = manifest.exercises;
  if (!Array.isArray(ex) || ex.length === 0) return null;
  var e0 = ex[0];
  if (!e0 || typeof e0 !== 'object') return null;
  // Paired-comparison schemas (more-less + check-cross variant):
  //   - L / R              (standard image-to-image / image-to-number modes)
  //   - imageA / imageB    (check-cross variant — same paired-image semantic,
  //                        different field names per the more-less app's
  //                        comparisonMode === 'check-cross' branch)
  if (typeof e0.L === 'string' && e0.L.startsWith('/images/')) return e0.L;
  if (typeof e0.R === 'string' && e0.R.startsWith('/images/')) return e0.R;
  if (typeof e0.imageA === 'string' && e0.imageA.startsWith('/images/')) return e0.imageA;
  if (typeof e0.imageB === 'string' && e0.imageB.startsWith('/images/')) return e0.imageB;
  // Fallback: standard image-bearing exercise (parity with the parent script's predicate)
  if (typeof e0.image === 'string' && e0.image.startsWith('/images/')) return e0.image;
  if (e0.image && typeof e0.image === 'object' && typeof e0.image.path === 'string' && e0.image.path.startsWith('/images/')) {
    return e0.image.path;
  }
  if (typeof e0.path === 'string' && e0.path.startsWith('/images/')) return e0.path;
  return null;
}

function resolveThemeFromPath(p) {
  // /images/<seg>/<filename> → seg
  var parts = p.split('/').filter(Boolean);
  if (parts.length < 2 || parts[0] !== 'images') return null;
  var seg = parts[1];
  if (KNOWN_THEME_NAMES.has(seg)) return seg;
  if (CUID_PATTERN.test(seg)) {
    var resolved = CUID_TO_THEME_NAME[seg];
    return resolved || null;
  }
  return null;
}

// -------------------------------------------------------------------------
// Per-ZIP classification — pure function; no FS writes
// -------------------------------------------------------------------------

function classifyZip(zipPath) {
  var basename = path.basename(zipPath);
  var result = { file: basename, action: null, oldTheme: null, newTheme: null, note: null };
  var zip;
  try { zip = new AdmZip(zipPath); }
  catch (e) { result.action = 'halt-unparseable'; result.note = 'failed to open ZIP: ' + e.message; return result; }
  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) { result.action = 'halt-unparseable'; result.note = 'ZIP missing manifest.json'; return result; }
  var manifest;
  try { manifest = JSON.parse(manifestEntry.getData().toString('utf8')); }
  catch (e) { result.action = 'halt-unparseable'; result.note = 'manifest.json parse error: ' + e.message; return result; }

  result.oldTheme = manifest.theme == null ? null : String(manifest.theme);

  var firstPath = extractFirstPath(manifest);
  if (!firstPath) {
    result.action = 'halt-unparseable';
    result.note = 'exercises[0] has no L/R/image path';
    return result;
  }

  var resolved = resolveThemeFromPath(firstPath);
  if (!resolved) {
    result.action = 'halt-ambiguous';
    result.note = 'path 2nd segment is neither a known theme name nor a known CUID (path=' + JSON.stringify(firstPath) + ')';
    return result;
  }

  result.newTheme = resolved;
  if (result.oldTheme === resolved) { result.action = 'skip-clean'; return result; }
  result.action = 'rewrite';
  return result;
}

// -------------------------------------------------------------------------
// In-place rewrite — same shape as parent script
// -------------------------------------------------------------------------

function rewriteZip(zipPath, newTheme) {
  var zip = new AdmZip(zipPath);
  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) {
    throw new Error('rewriteZip: manifest.json missing inside ' + zipPath +
      ' (classification would have caught this; reaching here means concurrent modification)');
  }
  var manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  manifest.theme = newTheme;
  var newBuf = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');
  if (typeof zip.updateFile === 'function') {
    zip.updateFile(manifestEntry, newBuf);
  } else {
    zip.deleteFile('manifest.json');
    zip.addFile('manifest.json', newBuf);
  }
  var tmpPath = zipPath + '.tmp';
  zip.writeZip(tmpPath);
  fs.renameSync(tmpPath, zipPath);
}

// -------------------------------------------------------------------------
// Backup + report helpers — same shape as parent script
// -------------------------------------------------------------------------

function backupDirFor(workingDir) {
  var parent = path.dirname(workingDir);
  var name = path.basename(workingDir);
  return path.join(parent, name + '.original');
}

function ensureBackup(workingDir, zipFilenames) {
  var backupDir = backupDirFor(workingDir);
  if (fs.existsSync(backupDir)) {
    throw new Error(
      'Backup directory already exists at ' + backupDir + '. ' +
      'A prior run may have left it in place; refusing to overwrite a known-good backup. ' +
      'Manual cleanup required: rm -rf "' + backupDir + '"'
    );
  }
  fs.mkdirSync(backupDir, { recursive: true });
  zipFilenames.forEach(function (f) {
    fs.copyFileSync(path.join(workingDir, f), path.join(backupDir, f));
  });
  return backupDir;
}

function pad(s, n) { s = String(s); return s.length >= n ? s : s + ' '.repeat(n - s.length); }

function printDiffTable(classifications, opts) {
  var maxFile = 0, maxOld = 0, maxNew = 0;
  classifications.forEach(function (c) {
    if (c.file.length > maxFile) maxFile = c.file.length;
    var o = c.oldTheme == null ? '(none)' : c.oldTheme;
    var n = c.newTheme == null ? '(none)' : c.newTheme;
    if (o.length > maxOld) maxOld = o.length;
    if (n.length > maxNew) maxNew = n.length;
  });
  console.log('  ' + pad('filename', maxFile) + '  ' + pad('old_theme', maxOld) + '  ' + pad('new_theme', maxNew) + '  action');
  console.log('  ' + '-'.repeat(maxFile) + '  ' + '-'.repeat(maxOld) + '  ' + '-'.repeat(maxNew) + '  ' + '-'.repeat(20));
  classifications.forEach(function (c) {
    if (opts && opts.filter && !opts.filter(c)) return;
    var o = c.oldTheme == null ? '(none)' : c.oldTheme;
    var n = c.newTheme == null ? '(none)' : c.newTheme;
    console.log('  ' + pad(c.file, maxFile) + '  ' + pad(o, maxOld) + '  ' + pad(n, maxNew) + '  ' + c.action +
      (c.note ? '  // ' + c.note : ''));
  });
}

function printSummary(classifications, mode) {
  var counts = { rewrite: 0, 'skip-clean': 0, 'halt-unparseable': 0, 'halt-ambiguous': 0 };
  classifications.forEach(function (c) { counts[c.action]++; });
  var themeDist = {};
  classifications.forEach(function (c) {
    if (c.action === 'rewrite' || c.action === 'skip-clean') {
      var t = c.newTheme || c.oldTheme || '(unknown)';
      themeDist[t] = (themeDist[t] || 0) + 1;
    }
  });
  console.log('');
  console.log('=== ' + mode + ' summary ===');
  console.log('  Total ZIPs:        ' + classifications.length);
  console.log('  rewrite:           ' + counts.rewrite);
  console.log('  skip-clean:        ' + counts['skip-clean']);
  console.log('  halt-unparseable:  ' + counts['halt-unparseable']);
  console.log('  halt-ambiguous:    ' + counts['halt-ambiguous']);
  console.log('');
  console.log('=== Resolved-theme distribution (' + Object.keys(themeDist).length + ' unique) ===');
  Object.entries(themeDist).sort(function (a, b) { return b[1] - a[1]; }).forEach(function (e) {
    console.log('  ' + String(e[1]).padStart(4) + '  ' + e[0]);
  });
  return counts;
}

// -------------------------------------------------------------------------
// Main
// -------------------------------------------------------------------------

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var workingDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (args[i].startsWith('--')) {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (workingDir == null) { workingDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!workingDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-manifest-theme-from-LR.js <directory> [--dry-run]');
    process.exit(2);
  }
  if (!fs.existsSync(workingDir) || !fs.statSync(workingDir).isDirectory()) {
    console.error('ERROR: not a directory: ' + workingDir);
    process.exit(2);
  }

  var zipFilenames = fs.readdirSync(workingDir).filter(function (f) { return f.endsWith('.zip'); }).sort();
  if (zipFilenames.length === 0) {
    console.error('ERROR: no .zip files found in ' + workingDir);
    process.exit(2);
  }

  console.log('=== rewrite-manifest-theme-from-LR — Phase 1 classification (' + zipFilenames.length + ' ZIPs) ===');
  var classifications = zipFilenames.map(function (f) { return classifyZip(path.join(workingDir, f)); });
  var counts = printSummary(classifications, dryRun ? 'DRY-RUN' : 'PHASE 1');

  // Halt-class check
  if (counts['halt-unparseable'] > 0 || counts['halt-ambiguous'] > 0) {
    console.error('');
    console.error('=== HALT — classification surfaced halt-classes ===');
    printDiffTable(classifications, { filter: function (c) { return c.action.indexOf('halt') === 0; } });
    process.exit(1);
  }

  if (dryRun) {
    console.log('');
    console.log('=== DIFF (rewrite candidates) ===');
    printDiffTable(classifications, { filter: function (c) { return c.action === 'rewrite'; } });
    console.log('');
    console.log('=== DRY-RUN complete; no FS state changed ===');
    return;
  }

  // Apply
  console.log('');
  console.log('=== Phase 2 backup ===');
  var backupDir = ensureBackup(workingDir, zipFilenames);
  console.log('  Backup at: ' + backupDir);

  console.log('');
  console.log('=== Phase 3 in-place rewrite ===');
  var done = 0;
  classifications.forEach(function (c) {
    if (c.action !== 'rewrite') return;
    rewriteZip(path.join(workingDir, c.file), c.newTheme);
    done++;
  });
  console.log('  Rewrote: ' + done + ' / ' + counts.rewrite);
  console.log('');
  console.log('=== Apply complete ===');
}

main();
