/**
 * Phase 3 (μ) algorithmic title disambiguator for the SEO-100pct commission.
 *
 * Resolves title-collision sets that prevent Phase 4a/republish-seo from
 * updating DB titleHash (unique constraint @@unique([language, titleHash])
 * rejects collision-duplicates → DB stays stale on SHA-256 while HTML carries
 * the new rendered title). Empirical: 1082 en + 42 es stuck on TITLE_HASH_MISMATCH
 * post 2026-05-19 republish-seo run.
 *
 * Algorithm (chosen at SEO-100pct commission decision lock):
 *   Group all en + es published decks by (language, exercise_type, exercise_mode,
 *   theme, age_range) — the same axes that drive the rendered base title per
 *   §17.8.1. For each group with >1 member:
 *     Sort by createdAt ASC (operator authoring order; stable).
 *     The first member keeps canonical slug + title (no variant_id needed if
 *       not already set). If the first member ALREADY has variant_id, leave it.
 *     Members 2..N get sequential ordinal variant_id = '002', '003', '004', ...
 *       only when manifest.variant_id is currently null/empty. Existing
 *       variant_ids are preserved to avoid retro-changing operator-visible URLs.
 *
 * After running this, follow-up:
 *   node scripts/publish-cli/index.js republish-seo --language en --confirm
 *   node scripts/publish-cli/index.js republish-seo --language es --confirm
 *
 * republish-seo reads manifest.variant_id and appends the localized variantLabel
 * (en: 'Set', es: 'Conjunto') to title + description → unique rendered string →
 * new SHA-1 hash → DB update succeeds → invariant 1+2 satisfied.
 *
 * Read-only (manifests only) until --confirm. --dry-run shows the per-group
 * assignment plan + halt-class detection.
 *
 * Usage:
 *   node scripts/publish-cli/disambiguate-titles-mu.js --locales=en,es --dry-run
 *   node scripts/publish-cli/disambiguate-titles-mu.js --locales=en,es --confirm
 */

'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';

function parseArgs(argv) {
  var out = {
    locales: ['en', 'es'],
    decksRoot: DEFAULT_DECKS_DIR,
    dryRun: false,
    confirm: false,
    outDir: path.resolve(__dirname, '..', '..', 'docs', 'audit-results')
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',');
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--confirm') out.confirm = true;
  });
  if (!out.dryRun && !out.confirm) {
    console.error('USAGE: --dry-run (no FS writes) OR --confirm (real-mode). Aborting.');
    process.exit(2);
  }
  if (out.dryRun && out.confirm) {
    console.error('USAGE: --dry-run and --confirm are mutually exclusive.');
    process.exit(2);
  }
  return out;
}

function utcStamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
}

function readManifest(decksRoot, locale, slug) {
  var manifestPath = path.join(decksRoot, locale, slug, 'manifest.json');
  try {
    return { ok: true, manifest: JSON.parse(fs.readFileSync(manifestPath, 'utf8')), path: manifestPath };
  } catch (e) {
    return { ok: false, error: e.message, path: manifestPath };
  }
}

function writeManifestAtomic(manifestPath, manifestObj) {
  var json = JSON.stringify(manifestObj, null, 2);
  var tmpPath = manifestPath + '.new';
  fs.writeFileSync(tmpPath, json);
  fs.renameSync(tmpPath, manifestPath);
}

function groupKey(deck, manifest) {
  return [
    deck.language,
    deck.exerciseType,
    deck.exerciseMode || '',
    manifest && manifest.theme || '',
    deck.ageRange || ''
  ].join('|');
}

async function main() {
  var args = parseArgs(process.argv);
  var stamp = utcStamp();

  console.log('[disambiguate-titles-mu] querying published decks for locales=' + args.locales.join(','));
  var dbRows = await db.client().deck.findMany({
    where: { status: 'published', language: { in: args.locales } },
    select: {
      id: true, slug: true, language: true,
      exerciseType: true, exerciseMode: true,
      ageRange: true, subjectTags: true,
      titleHash: true, descriptionHash: true,
      createdAt: true, publishedAt: true
    },
    orderBy: [{ language: 'asc' }, { createdAt: 'asc' }]
  });
  console.log('[disambiguate-titles-mu] ' + dbRows.length + ' rows');

  // Load each deck's manifest. Skip decks whose manifest can't be read (FS gone).
  var decks = [];
  var fsErrors = 0;
  for (var i = 0; i < dbRows.length; i++) {
    var r = dbRows[i];
    var m = readManifest(args.decksRoot, r.language, r.slug);
    if (!m.ok) {
      fsErrors++;
      continue;
    }
    decks.push({ db: r, manifest: m.manifest, manifestPath: m.path });
  }
  console.log('[disambiguate-titles-mu] loaded manifests for ' + decks.length + ' decks (FS errors: ' + fsErrors + ')');

  // Group by (language, app, mode, theme, age_range).
  var groups = new Map();
  decks.forEach(function (d) {
    var k = groupKey(d.db, d.manifest);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(d);
  });

  // For each group with >1 member: sort by createdAt; assign ordinals.
  var collisionGroups = [];
  var assignments = []; // { manifestPath, slug, oldVariantId, newVariantId, language }
  var skippedExisting = 0;

  groups.forEach(function (members, key) {
    if (members.length < 2) return;
    collisionGroups.push({ key: key, count: members.length });
    members.sort(function (a, b) {
      return new Date(a.db.createdAt) - new Date(b.db.createdAt);
    });
    // Members 1..N (0-indexed) get sequential 002, 003, etc.
    // The first member (index 0) keeps no-variant or its existing variant.
    for (var j = 0; j < members.length; j++) {
      var d = members[j];
      var ordinal = j + 1; // 1-based
      var current = d.manifest.variant_id;
      if (j === 0) {
        // First member: only assign if currently null (will read better in URL)
        if (!current) continue;
        continue;
      }
      if (current && current !== '') {
        skippedExisting++;
        continue; // preserve existing variant_id
      }
      // Assign sequential ordinal 002, 003, ...
      var newVariantId = String(ordinal).padStart(3, '0');
      assignments.push({
        manifestPath: d.manifestPath,
        slug: d.db.slug,
        language: d.db.language,
        oldVariantId: current || null,
        newVariantId: newVariantId,
        groupKey: key
      });
    }
  });

  console.log('[disambiguate-titles-mu] collision groups: ' + collisionGroups.length);
  console.log('[disambiguate-titles-mu] assignments planned: ' + assignments.length);
  console.log('[disambiguate-titles-mu] skipped (variant_id already set): ' + skippedExisting);

  // Report path
  if (!fs.existsSync(args.outDir)) fs.mkdirSync(args.outDir, { recursive: true });
  var reportPath = path.join(args.outDir, 'seo-100pct-mu-disambiguation-' + stamp + (args.dryRun ? '-dryrun' : '-applied') + '.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    stamp: stamp,
    dryRun: args.dryRun,
    locales: args.locales,
    decksScanned: decks.length,
    collisionGroupCount: collisionGroups.length,
    assignmentsPlanned: assignments.length,
    skippedExisting: skippedExisting,
    groups: collisionGroups,
    assignments: assignments
  }, null, 2));
  console.log('[disambiguate-titles-mu] report: ' + reportPath);

  if (args.dryRun) {
    console.log('[disambiguate-titles-mu] DRY-RUN — no manifest writes.');
    await db.disconnect();
    return;
  }

  // Real-mode: apply assignments.
  var applied = 0;
  var failed = 0;
  for (var k = 0; k < assignments.length; k++) {
    var asg = assignments[k];
    try {
      var raw = JSON.parse(fs.readFileSync(asg.manifestPath, 'utf8'));
      raw.variant_id = asg.newVariantId;
      writeManifestAtomic(asg.manifestPath, raw);
      applied++;
    } catch (e) {
      failed++;
      console.error('[disambiguate-titles-mu] WRITE-FAIL ' + asg.slug + ' (' + asg.language + '): ' + e.message);
    }
  }
  console.log('[disambiguate-titles-mu] applied: ' + applied + ', failed: ' + failed);
  console.log('[disambiguate-titles-mu] Next step: run');
  args.locales.forEach(function (loc) {
    console.log('  node scripts/publish-cli/index.js republish-seo --language ' + loc + ' --confirm');
  });

  await db.disconnect();
}

main().catch(function (err) {
  console.error('[disambiguate-titles-mu] FATAL:', err && err.stack || err);
  process.exit(1);
});
