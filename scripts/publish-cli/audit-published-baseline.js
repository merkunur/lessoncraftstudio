/**
 * Phase 0 baseline audit for the en/es/pt SEO-100pct commission.
 *
 * Queries published decks across requested locales (default en,es,pt) and dumps
 * a per-deck JSON capturing every field needed downstream: SEO hash columns,
 * content_family_id state, timestamp-stratified NULL classification per
 * §A.13.26 (pre vs post 20260509083000_add_seo_hash_columns), plus the
 * locale-keyed title/description JSON for downstream collision detection
 * (Phase 3 (μ) work).
 *
 * Read-only — does not write to DB. Output:
 *   docs/audit-results/seo-100pct-baseline-<utc>.json
 *   docs/audit-results/seo-100pct-baseline-<utc>.md  (per-locale summary)
 *
 * Run on Hetzner where DATABASE_URL points at local production Postgres.
 *
 * Usage:
 *   node scripts/publish-cli/audit-published-baseline.js
 *   node scripts/publish-cli/audit-published-baseline.js --locales=en,es,pt
 *   node scripts/publish-cli/audit-published-baseline.js --out-dir=docs/audit-results
 */

'use strict';

var path = require('path');
var fs = require('fs');
var db = require('./db');

// Migration that added titleHash + descriptionHash columns.
// Decks created before this are pre-migration cohort and NULL by definition (§A.13.26).
var SEO_HASH_MIGRATION_AT = new Date('2026-05-09T08:30:00.000Z');

function parseArgs(argv) {
  var out = {
    locales: ['en', 'es', 'pt'],
    outDir: path.resolve(__dirname, '..', '..', 'docs', 'audit-results')
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) {
      out.locales = a.slice('--locales='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    } else if (a.indexOf('--out-dir=') === 0) {
      out.outDir = path.resolve(a.slice('--out-dir='.length));
    } else if (a === '--help' || a === '-h') {
      console.log('Usage: node audit-published-baseline.js [--locales=en,es,pt] [--out-dir=docs/audit-results]');
      process.exit(0);
    }
  });
  return out;
}

function utcStamp() {
  var d = new Date();
  return d.toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
}

function pickTitle(titleJson, locale) {
  if (!titleJson || typeof titleJson !== 'object') return null;
  return titleJson[locale] || null;
}

function pickDescription(descJson, locale) {
  if (!descJson || typeof descJson !== 'object') return null;
  return descJson[locale] || null;
}

function deckCohort(deck) {
  if (!deck.createdAt) return 'unknown';
  return new Date(deck.createdAt) < SEO_HASH_MIGRATION_AT ? 'pre-migration' : 'post-migration';
}

function summarizeLocale(decks) {
  var total = decks.length;
  var nullTitleHashPre = 0;
  var nullTitleHashPost = 0;
  var nullDescriptionHashPre = 0;
  var nullDescriptionHashPost = 0;
  var nullContentFamilyId = 0;
  var distinctSlugs = new Set();
  var distinctTitleStrings = new Map();
  var distinctDescriptionStrings = new Map();
  var apps = new Map();
  var earliestPublish = null;
  var latestPublish = null;

  decks.forEach(function (d) {
    distinctSlugs.add(d.slug);
    var cohort = deckCohort(d);
    if (!d.titleHash) cohort === 'pre-migration' ? nullTitleHashPre++ : nullTitleHashPost++;
    if (!d.descriptionHash) cohort === 'pre-migration' ? nullDescriptionHashPre++ : nullDescriptionHashPost++;
    if (!d.contentFamilyId) nullContentFamilyId++;
    var t = d.titleLocalized || '';
    distinctTitleStrings.set(t, (distinctTitleStrings.get(t) || 0) + 1);
    var ds = d.descriptionLocalized || '';
    distinctDescriptionStrings.set(ds, (distinctDescriptionStrings.get(ds) || 0) + 1);
    var ax = d.exerciseType + (d.exerciseMode ? '/' + d.exerciseMode : '');
    apps.set(ax, (apps.get(ax) || 0) + 1);
    if (d.publishedAt) {
      var p = new Date(d.publishedAt);
      if (!earliestPublish || p < earliestPublish) earliestPublish = p;
      if (!latestPublish || p > latestPublish) latestPublish = p;
    }
  });

  var titleCollisions = 0;
  var titleCollisionSetCount = 0;
  distinctTitleStrings.forEach(function (count) {
    if (count > 1) {
      titleCollisions += count;
      titleCollisionSetCount += 1;
    }
  });

  var descCollisions = 0;
  var descCollisionSetCount = 0;
  distinctDescriptionStrings.forEach(function (count) {
    if (count > 1) {
      descCollisions += count;
      descCollisionSetCount += 1;
    }
  });

  return {
    total: total,
    distinctSlugs: distinctSlugs.size,
    distinctTitleStrings: distinctTitleStrings.size,
    distinctDescriptionStrings: distinctDescriptionStrings.size,
    titleCollisions: { decks: titleCollisions, sets: titleCollisionSetCount },
    descriptionCollisions: { decks: descCollisions, sets: descCollisionSetCount },
    nullTitleHash: { preMigration: nullTitleHashPre, postMigration: nullTitleHashPost, total: nullTitleHashPre + nullTitleHashPost },
    nullDescriptionHash: { preMigration: nullDescriptionHashPre, postMigration: nullDescriptionHashPost, total: nullDescriptionHashPre + nullDescriptionHashPost },
    nullContentFamilyId: nullContentFamilyId,
    distinctApps: apps.size,
    apps: Array.from(apps.entries()).map(function (e) { return { key: e[0], count: e[1] }; }).sort(function (a, b) { return b.count - a.count; }),
    earliestPublish: earliestPublish ? earliestPublish.toISOString() : null,
    latestPublish: latestPublish ? latestPublish.toISOString() : null
  };
}

function renderSummaryMd(summaries, locales, runStamp) {
  var lines = [];
  lines.push('# SEO-100pct Phase 0 Baseline — ' + runStamp);
  lines.push('');
  lines.push('Read-only DB snapshot of published decks in `' + locales.join(', ') + '`.');
  lines.push('');
  lines.push('Cohort split: pre-migration = `createdAt < 2026-05-09T08:30:00Z` (§A.13.26 boundary).');
  lines.push('');
  lines.push('## Per-locale summary');
  lines.push('');
  locales.forEach(function (loc) {
    var s = summaries[loc] || {};
    lines.push('### ' + loc.toUpperCase() + ' (' + (s.total || 0) + ' published)');
    lines.push('');
    lines.push('| Metric | Count |');
    lines.push('|---|---:|');
    lines.push('| Total published | ' + (s.total || 0) + ' |');
    lines.push('| Distinct slugs | ' + (s.distinctSlugs || 0) + ' |');
    lines.push('| Distinct rendered titles | ' + (s.distinctTitleStrings || 0) + ' |');
    lines.push('| Distinct rendered descriptions | ' + (s.distinctDescriptionStrings || 0) + ' |');
    lines.push('| Title-collision decks (in ≥2-set collision groups) | ' + ((s.titleCollisions || {}).decks || 0) + ' |');
    lines.push('| Title-collision sets | ' + ((s.titleCollisions || {}).sets || 0) + ' |');
    lines.push('| Description-collision decks | ' + ((s.descriptionCollisions || {}).decks || 0) + ' |');
    lines.push('| Description-collision sets | ' + ((s.descriptionCollisions || {}).sets || 0) + ' |');
    lines.push('| NULL titleHash (pre-migration) | ' + ((s.nullTitleHash || {}).preMigration || 0) + ' |');
    lines.push('| NULL titleHash (post-migration) | ' + ((s.nullTitleHash || {}).postMigration || 0) + ' |');
    lines.push('| NULL titleHash (total) | ' + ((s.nullTitleHash || {}).total || 0) + ' |');
    lines.push('| NULL descriptionHash (pre-migration) | ' + ((s.nullDescriptionHash || {}).preMigration || 0) + ' |');
    lines.push('| NULL descriptionHash (post-migration) | ' + ((s.nullDescriptionHash || {}).postMigration || 0) + ' |');
    lines.push('| NULL descriptionHash (total) | ' + ((s.nullDescriptionHash || {}).total || 0) + ' |');
    lines.push('| NULL content_family_id | ' + (s.nullContentFamilyId || 0) + ' |');
    lines.push('| Distinct (exerciseType, exerciseMode) | ' + (s.distinctApps || 0) + ' |');
    lines.push('| Earliest publish | ' + (s.earliestPublish || 'n/a') + ' |');
    lines.push('| Latest publish | ' + (s.latestPublish || 'n/a') + ' |');
    lines.push('');
    lines.push('Top exercise (type/mode) cohorts:');
    lines.push('');
    (s.apps || []).slice(0, 12).forEach(function (a) {
      lines.push('- `' + a.key + '` — ' + a.count);
    });
    lines.push('');
  });
  return lines.join('\n') + '\n';
}

async function main() {
  var args = parseArgs(process.argv);
  if (!fs.existsSync(args.outDir)) {
    fs.mkdirSync(args.outDir, { recursive: true });
  }

  var stamp = utcStamp();
  var jsonOut = path.join(args.outDir, 'seo-100pct-baseline-' + stamp + '.json');
  var mdOut = path.join(args.outDir, 'seo-100pct-baseline-' + stamp + '.md');

  console.log('[audit-published-baseline] querying locales=' + args.locales.join(',') + ' status=published ...');
  var t0 = Date.now();

  var rows = await db.client().deck.findMany({
    where: {
      status: 'published',
      language: { in: args.locales }
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      exerciseType: true,
      exerciseMode: true,
      language: true,
      subjectTags: true,
      topicSlugs: true,
      ageRange: true,
      htmlUrl: true,
      thumbnailUrl: true,
      manifestUrl: true,
      publishedAt: true,
      status: true,
      version: true,
      contentFamilyId: true,
      titleHash: true,
      descriptionHash: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: [{ language: 'asc' }, { publishedAt: 'asc' }, { id: 'asc' }]
  });

  console.log('[audit-published-baseline] ' + rows.length + ' rows fetched in ' + (Date.now() - t0) + 'ms');

  // Decorate each row with localized title/description strings for downstream.
  var decks = rows.map(function (r) {
    return {
      id: r.id,
      language: r.language,
      slug: r.slug,
      exerciseType: r.exerciseType,
      exerciseMode: r.exerciseMode,
      ageRange: r.ageRange,
      subjectTags: r.subjectTags,
      topicSlugs: r.topicSlugs,
      titleLocalized: pickTitle(r.title, r.language),
      descriptionLocalized: pickDescription(r.description, r.language),
      titleAllLocales: r.title,
      descriptionAllLocales: r.description,
      titleHash: r.titleHash,
      descriptionHash: r.descriptionHash,
      contentFamilyId: r.contentFamilyId,
      htmlUrl: r.htmlUrl,
      thumbnailUrl: r.thumbnailUrl,
      manifestUrl: r.manifestUrl,
      version: r.version,
      status: r.status,
      publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
      createdAt: r.createdAt ? r.createdAt.toISOString() : null,
      updatedAt: r.updatedAt ? r.updatedAt.toISOString() : null,
      cohort: deckCohort(r)
    };
  });

  // Per-locale summaries.
  var byLocale = {};
  decks.forEach(function (d) {
    if (!byLocale[d.language]) byLocale[d.language] = [];
    byLocale[d.language].push(d);
  });

  var summaries = {};
  args.locales.forEach(function (loc) {
    summaries[loc] = summarizeLocale(byLocale[loc] || []);
  });

  // Write per-deck JSON.
  fs.writeFileSync(jsonOut, JSON.stringify({
    runStamp: stamp,
    runAt: new Date().toISOString(),
    locales: args.locales,
    seoHashMigrationAt: SEO_HASH_MIGRATION_AT.toISOString(),
    counts: Object.keys(summaries).reduce(function (a, k) { a[k] = summaries[k].total; return a; }, {}),
    summaries: summaries,
    decks: decks
  }, null, 2));

  console.log('[audit-published-baseline] wrote JSON: ' + jsonOut);

  // Write markdown summary.
  fs.writeFileSync(mdOut, renderSummaryMd(summaries, args.locales, stamp));
  console.log('[audit-published-baseline] wrote summary: ' + mdOut);

  // Print quick per-locale summary to stdout.
  console.log('');
  console.log('--- summary ---');
  args.locales.forEach(function (loc) {
    var s = summaries[loc] || {};
    console.log('  ' + loc + ': ' + (s.total || 0) +
      ' published; titleHash NULL ' + ((s.nullTitleHash || {}).total || 0) +
      ' (pre=' + ((s.nullTitleHash || {}).preMigration || 0) +
      ', post=' + ((s.nullTitleHash || {}).postMigration || 0) + ');' +
      ' descHash NULL ' + ((s.nullDescriptionHash || {}).total || 0) +
      '; contentFamilyId NULL ' + (s.nullContentFamilyId || 0) +
      '; title-collision sets ' + ((s.titleCollisions || {}).sets || 0) +
      ' (' + ((s.titleCollisions || {}).decks || 0) + ' decks)');
  });
  console.log('');

  await db.disconnect();
}

main().catch(function (err) {
  console.error('[audit-published-baseline] FATAL:', err && err.stack || err);
  process.exit(1);
});
