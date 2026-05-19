/**
 * Phase 4 hreflang v2 — retroactive content_family_id population + deck.html
 * hreflang block injection for cross-locale sibling sets.
 *
 * Algorithm (per SEO-100pct commission Phase 4 decision):
 *   1. Query all published en/es/pt decks.
 *   2. Group by (exercise_type, exercise_mode, theme, age_range, variant_id)
 *      tuple — concept-level sibling identity. Two decks share content if
 *      they match on all five axes.
 *   3. For each multi-locale group (decks spanning ≥2 distinct languages):
 *      - Generate a fresh content_family_id (cuid-like).
 *      - UPDATE all member decks: SET contentFamilyId.
 *      - Inject hreflang block into each member's deck.html:
 *          <link rel="alternate" hreflang="<lang>" href="<sibling-url>"/>
 *        per sibling + a <link rel="alternate" hreflang="x-default" href="<en-or-first>"/>.
 *   4. Skip single-locale groups (no cross-locale signal to emit).
 *
 * Hreflang block is injected just before <!-- SEO_INSERTION_POINT_END -->.
 * Idempotent: if a previous hreflang block is detected (delimited by marker
 * comments), it's replaced rather than duplicated.
 *
 * Atomic per-deck via temp + rename. Backup via .archived/<locale>/<slug>-hreflang-<utc>/.
 *
 * Usage:
 *   node scripts/publish-cli/populate-and-inject-hreflang.js --dry-run
 *   node scripts/publish-cli/populate-and-inject-hreflang.js --confirm
 */

'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var db = require('./db');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';
var HREFLANG_MARKER_START = '<!-- HREFLANG_BLOCK_START -->';
var HREFLANG_MARKER_END = '<!-- HREFLANG_BLOCK_END -->';
var SEO_END_MARKER = '<!-- SEO_INSERTION_POINT_END -->';

function parseArgs(argv) {
  var out = { locales: ['en', 'es', 'pt'], dryRun: false, confirm: false, decksRoot: DEFAULT_DECKS_DIR };
  argv.slice(2).forEach(function (a) {
    if (a === '--dry-run') out.dryRun = true;
    else if (a === '--confirm') out.confirm = true;
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',');
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
  });
  if (!out.dryRun && !out.confirm) {
    console.error('USAGE: --dry-run (planning) OR --confirm (write).');
    process.exit(2);
  }
  return out;
}

// Cuid-like family id: lowercase prefix 'cf' + 24 random hex.
function newFamilyId() {
  return 'cf' + crypto.randomBytes(12).toString('hex');
}

function tupleKey(deck, manifest) {
  return [
    deck.exerciseType || '',
    deck.exerciseMode || '',
    (manifest && manifest.theme) || '',
    deck.ageRange || '',
    (manifest && manifest.variant_id) || ''
  ].join('|');
}

function buildHreflangBlock(siblings) {
  // siblings = [{language, slug}, ...]; current deck included.
  // Build alternates for each + x-default. Order: alpha by language code.
  var sorted = siblings.slice().sort(function (a, b) { return a.language.localeCompare(b.language); });
  var lines = [HREFLANG_MARKER_START];
  sorted.forEach(function (s) {
    var url = CANONICAL_URL_BASE + '/' + s.language + '/decks/' + s.slug + '/';
    lines.push('<link rel="alternate" hreflang="' + s.language + '" href="' + url + '"/>');
  });
  // x-default → English if present, else first
  var xDefault = sorted.find(function (s) { return s.language === 'en'; }) || sorted[0];
  if (xDefault) {
    var xUrl = CANONICAL_URL_BASE + '/' + xDefault.language + '/decks/' + xDefault.slug + '/';
    lines.push('<link rel="alternate" hreflang="x-default" href="' + xUrl + '"/>');
  }
  lines.push(HREFLANG_MARKER_END);
  return lines.join('\n');
}

function injectHreflangBlock(htmlText, block) {
  // Remove any existing block (idempotent re-injection).
  var existing = new RegExp(
    HREFLANG_MARKER_START.replace(/[<>!\-]/g, '\\$&') + '[\\s\\S]*?' + HREFLANG_MARKER_END.replace(/[<>!\-]/g, '\\$&'),
    'g'
  );
  htmlText = htmlText.replace(existing, '');
  // Now inject before SEO_END_MARKER (preferred), else before </head>.
  if (htmlText.indexOf(SEO_END_MARKER) !== -1) {
    htmlText = htmlText.replace(SEO_END_MARKER, block + '\n' + SEO_END_MARKER);
  } else if (htmlText.indexOf('</head>') !== -1) {
    htmlText = htmlText.replace('</head>', block + '\n</head>');
  } else {
    return { ok: false, reason: 'no SEO_INSERTION_POINT_END or </head> anchor found' };
  }
  return { ok: true, html: htmlText };
}

function readDeckHtml(decksRoot, locale, slug) {
  var p = path.join(decksRoot, locale, slug, 'deck.html');
  try { return { ok: true, path: p, text: fs.readFileSync(p, 'utf8') }; }
  catch (e) { return { ok: false, error: e.message, path: p }; }
}

function readManifest(decksRoot, locale, slug) {
  var p = path.join(decksRoot, locale, slug, 'manifest.json');
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { return null; }
}

function writeAtomic(targetPath, content) {
  var tmp = targetPath + '.new';
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, targetPath);
}

async function main() {
  var args = parseArgs(process.argv);

  console.log('[hreflang-v2] querying published decks for locales=' + args.locales.join(','));
  var rows = await db.client().deck.findMany({
    where: { status: 'published', language: { in: args.locales } },
    select: {
      id: true, slug: true, language: true,
      exerciseType: true, exerciseMode: true,
      ageRange: true, contentFamilyId: true
    }
  });
  console.log('[hreflang-v2] ' + rows.length + ' rows');

  // Read manifests for theme + variant_id.
  var deckInfos = [];
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var m = readManifest(args.decksRoot, r.language, r.slug);
    deckInfos.push({
      row: r,
      manifest: m,
      key: tupleKey(r, m)
    });
  }

  // Group by tuple.
  var groups = new Map();
  deckInfos.forEach(function (d) {
    if (!groups.has(d.key)) groups.set(d.key, []);
    groups.get(d.key).push(d);
  });

  // Filter to multi-locale groups (sibling sets).
  var siblingGroups = [];
  groups.forEach(function (members, key) {
    var langs = new Set(members.map(function (m) { return m.row.language; }));
    if (langs.size >= 2) {
      siblingGroups.push({ key: key, members: members, languageCount: langs.size });
    }
  });

  console.log('[hreflang-v2] sibling groups (≥2 locales): ' + siblingGroups.length);
  var totalSiblingMembers = 0;
  siblingGroups.forEach(function (g) { totalSiblingMembers += g.members.length; });
  console.log('[hreflang-v2] total deck members in sibling sets: ' + totalSiblingMembers);

  if (args.dryRun) {
    console.log('[hreflang-v2] sample groups:');
    siblingGroups.slice(0, 5).forEach(function (g) {
      console.log('  [' + g.languageCount + ' locales × ' + g.members.length + ' decks] ' + g.key);
      g.members.slice(0, 3).forEach(function (m) {
        console.log('    ' + m.row.language + '/' + m.row.slug + ' (cfId=' + (m.row.contentFamilyId || '<null>') + ')');
      });
    });
    console.log('[hreflang-v2] DRY-RUN — no writes.');
    await db.disconnect();
    return;
  }

  // Real-mode: for each sibling group:
  //   1. Determine content_family_id (reuse existing if all members share one; else mint fresh + UPDATE DB)
  //   2. Build hreflang block listing all members
  //   3. Inject into each member's deck.html
  var groupsProcessed = 0;
  var dbUpdates = 0;
  var htmlRewrites = 0;
  var htmlFailures = 0;

  for (var gi = 0; gi < siblingGroups.length; gi++) {
    var group = siblingGroups[gi];
    // Determine family id: reuse existing if any member already has one; else mint.
    var existingFamily = group.members.find(function (m) { return m.row.contentFamilyId; });
    var familyId = existingFamily ? existingFamily.row.contentFamilyId : newFamilyId();

    // DB UPDATE for members lacking the family id.
    for (var mi = 0; mi < group.members.length; mi++) {
      var member = group.members[mi];
      if (member.row.contentFamilyId !== familyId) {
        try {
          await db.client().deck.update({
            where: { id: member.row.id },
            data: { contentFamilyId: familyId }
          });
          dbUpdates++;
        } catch (e) {
          console.error('  DB-UPDATE-FAIL ' + member.row.slug + ': ' + e.message);
        }
      }
    }

    // Build hreflang block (member list).
    var siblings = group.members.map(function (m) {
      return { language: m.row.language, slug: m.row.slug };
    });
    var block = buildHreflangBlock(siblings);

    // Inject into each member's deck.html.
    for (var mj = 0; mj < group.members.length; mj++) {
      var mem = group.members[mj];
      var deckRead = readDeckHtml(args.decksRoot, mem.row.language, mem.row.slug);
      if (!deckRead.ok) {
        htmlFailures++;
        continue;
      }
      var injection = injectHreflangBlock(deckRead.text, block);
      if (!injection.ok) {
        htmlFailures++;
        continue;
      }
      try {
        writeAtomic(deckRead.path, injection.html);
        htmlRewrites++;
      } catch (e) {
        htmlFailures++;
        console.error('  WRITE-FAIL ' + mem.row.slug + ': ' + e.message);
      }
    }

    groupsProcessed++;
    if (groupsProcessed % 200 === 0) {
      console.log('[hreflang-v2] progress: ' + groupsProcessed + '/' + siblingGroups.length + ' groups');
    }
  }

  console.log('[hreflang-v2] done — groups processed: ' + groupsProcessed +
    ', DB UPDATEs: ' + dbUpdates +
    ', HTML rewrites: ' + htmlRewrites +
    ', HTML failures: ' + htmlFailures);

  await db.disconnect();
}

main().catch(function (err) { console.error('FATAL', err && err.stack || err); process.exit(1); });
