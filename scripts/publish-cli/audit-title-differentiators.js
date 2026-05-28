#!/usr/bin/env node
/**
 * audit-title-differentiators.js — READ-ONLY pre-flight for the deck-title
 * overhaul (CLAUDE.md plan §3.1). Run BEFORE `republish-seo --confirm` to learn,
 * without writing anything, what the new titles will be and whether any collide.
 *
 * For every published deck it composes the PROJECTED new title using the exact
 * production path (republish-seo.computeNewHtml — zero drift), then:
 *   - groups by (language, titleHash) to find COLLISIONS (two decks that would
 *     share a title → would HALT at the @@unique([language, titleHash]) constraint
 *     during --confirm);
 *   - sub-classifies each collision: TRUE_DUPLICATE (members share the same
 *     content `raw` → genuinely identical content; operator should merge/noindex)
 *     vs ACCIDENTAL (different content but coincidentally same title → widen the
 *     differentiator) vs HASH_FALLBACK_COLLISION (kind:'none' decks whose
 *     content-hash disambiguator itself collided — should be vanishingly rare);
 *   - reports the displayed-length distribution (target 50-70) + out-of-band decks;
 *   - reports the differentiator-kind coverage (vocab / numeric / mode / none).
 *
 * NOTHING is written to deck.html or the DB. Output: a console summary + a JSON
 * report (--out). Resolve every COLLISION before running --confirm.
 *
 * Usage:
 *   node scripts/publish-cli/audit-title-differentiators.js \
 *     --locales=en[,es,pt] [--base-dir=/var/www/lcs-media/decks] \
 *     [--out=docs/audit-results/title-preflight-<utc>.json] [--samples=20]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var rs = require('./republish-seo');
var seoDifferentiator = require('./seo-differentiator');

function parseArgs(argv) {
  var out = { locales: ['en'], baseDir: rs.DEFAULT_DECKS_DIR, out: null, samples: 15 };
  argv.slice(2).forEach(function (a) {
    var m = /^--([^=]+)=(.*)$/.exec(a);
    if (!m) return;
    var k = m[1], v = m[2];
    if (k === 'locales') out.locales = v.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (k === 'base-dir') out.baseDir = v;
    else if (k === 'out') out.out = v;
    else if (k === 'samples') out.samples = parseInt(v, 10) || 15;
  });
  return out;
}

function titleFromHtml(html) {
  var m = /<title>([\s\S]*?)<\/title>/i.exec(html || '');
  return m ? m[1].trim() : '';
}

// Displayed length = what Google renders: decode the HTML entities the title is
// stored with (& -> &amp;, etc.) back to single characters before counting.
function displayedLength(title) {
  return decodeEntities(title).length;
}
function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// walkDecks returns EVERY <slug>-v<N> version dir; the same slug can have v1/v2/v3
// (KEEP_VERSIONS=3 per §15.14). Only the CURRENT version (highest -vN ≈ the
// <slug> symlink target) is the live deck — collisions must be measured across
// distinct SLUGS, not version dirs (else 3 versions of one deck look like a
// 3-way collision). Dedupe to one entry per slug, keeping the highest version.
function dedupeToCurrentVersion(entries) {
  var bySlug = {};
  entries.forEach(function (e) {
    var dir = path.basename(path.dirname(e.deckHtml));
    var vm = /-v(\d+)$/.exec(dir);
    var v = vm ? parseInt(vm[1], 10) : 0;
    var prev = bySlug[e.slug];
    if (!prev || v > prev._v) { e._v = v; bySlug[e.slug] = e; }
  });
  return Object.keys(bySlug).map(function (s) { return bySlug[s]; });
}

function auditLocale(locale, baseDir, samples) {
  var entries = dedupeToCurrentVersion(rs.walkDecks(baseDir, { language: locale }));
  var rows = [];
  var errors = [];
  var kindCounts = { vocab: 0, numeric: 0, mode: 0, none: 0 };

  for (var i = 0; i < entries.length; i++) {
    var c;
    try {
      c = rs.classifyDeck(entries[i]);
    } catch (e) {
      errors.push({ slug: entries[i].slug, stage: 'classify', error: e.message });
      continue;
    }
    if (c.classification !== 'rewrite') continue;

    var beforeTitle = titleFromHtml(c.html);
    var afterTitle;
    try {
      // Lightweight: composes ONLY the <title> (no substitute / full-HTML
      // rewrite) — the new title bakes the resolved level so substitute isn't
      // needed to finalize it. Shares buildSeoOpts() with computeNewHtml (zero drift).
      afterTitle = rs.composeProjectedTitle(c);
    } catch (e) {
      errors.push({ slug: c.slug, stage: 'composeProjectedTitle', error: e.message });
      continue;
    }

    // Recompute the differentiator for richer collision context (matches what
    // computeNewHtml used internally).
    var diff = { kind: 'none', raw: null };
    var disambiguator = null;
    try {
      var seoOpts = rs.resolveSeoOpts(c);
      var cfg = rs.resolveTitleConfig(c.manifest.language);
      diff = seoDifferentiator.deriveDifferentiator(c.manifest, c.manifest.language, {
        config: cfg, exerciseModeName: seoOpts.exerciseModeName
      }) || diff;
      if ((!diff || diff.kind === 'none') && seoOpts.variantId) disambiguator = seoOpts.variantId;
    } catch (e) { /* context-only; non-fatal */ }

    if (kindCounts[diff.kind] === undefined) kindCounts[diff.kind] = 0;
    kindCounts[diff.kind]++;

    var hash = rs.computeSeoHashes(afterTitle, '').titleHash;
    rows.push({
      slug: c.slug,
      before: beforeTitle,
      after: afterTitle,
      afterDisplay: decodeEntities(afterTitle),
      len: displayedLength(afterTitle),
      titleHash: hash,
      diffKind: diff.kind,
      raw: diff.raw || null,
      disambiguator: disambiguator,
      theme: c.manifest.theme || null
    });
  }

  // Group by titleHash → collisions.
  var byHash = {};
  rows.forEach(function (r) {
    if (!r.titleHash) return;
    (byHash[r.titleHash] = byHash[r.titleHash] || []).push(r);
  });
  var collisions = [];
  Object.keys(byHash).forEach(function (h) {
    var grp = byHash[h];
    if (grp.length < 2) return;
    var raws = {};
    grp.forEach(function (r) { raws[r.raw == null ? '∅' : r.raw] = 1; });
    var allNone = grp.every(function (r) { return r.diffKind === 'none'; });
    var sameRaw = Object.keys(raws).length === 1;
    var klass = allNone ? 'HASH_FALLBACK_COLLISION' : (sameRaw ? 'TRUE_DUPLICATE' : 'ACCIDENTAL');
    collisions.push({
      titleHash: h, class: klass, count: grp.length,
      title: grp[0].afterDisplay,
      members: grp.map(function (r) { return { slug: r.slug, raw: r.raw, diffKind: r.diffKind }; })
    });
  });
  collisions.sort(function (a, b) { return b.count - a.count; });

  var outOfBand = rows.filter(function (r) { return r.len < 50 || r.len > 70; });
  var over70 = rows.filter(function (r) { return r.len > 70; });

  return {
    locale: locale,
    totalRewriteDecks: rows.length,
    errors: errors,
    kindCounts: kindCounts,
    lengthStats: {
      min: rows.reduce(function (m, r) { return Math.min(m, r.len); }, 9999),
      max: rows.reduce(function (m, r) { return Math.max(m, r.len); }, 0),
      under50: rows.filter(function (r) { return r.len < 50; }).length,
      in50to70: rows.filter(function (r) { return r.len >= 50 && r.len <= 70; }).length,
      over70: over70.length
    },
    collisions: collisions,
    collisionCount: collisions.length,
    outOfBandSamples: outOfBand.slice(0, samples).map(function (r) { return { slug: r.slug, len: r.len, title: r.afterDisplay }; }),
    over70Samples: over70.slice(0, samples).map(function (r) { return { slug: r.slug, len: r.len, title: r.afterDisplay }; }),
    samples: rows.slice(0, samples).map(function (r) { return { slug: r.slug, len: r.len, before: r.before, after: r.afterDisplay, diffKind: r.diffKind }; })
  };
}

function main() {
  var args = parseArgs(process.argv);
  console.log('[audit-title-differentiators] base-dir=' + args.baseDir + ' locales=' + args.locales.join(','));
  var report = { generatedAt: new Date().toISOString(), baseDir: args.baseDir, locales: {} };
  var anyCollision = false;

  args.locales.forEach(function (loc) {
    var r = auditLocale(loc, args.baseDir, args.samples);
    report.locales[loc] = r;
    if (r.collisionCount > 0) anyCollision = true;

    console.log('');
    console.log('=== ' + loc + ' ===');
    console.log('rewrite decks: ' + r.totalRewriteDecks + (r.errors.length ? ('  (errors: ' + r.errors.length + ')') : ''));
    console.log('differentiator kinds: vocab=' + (r.kindCounts.vocab || 0) +
      '  numeric=' + (r.kindCounts.numeric || 0) +
      '  mode=' + (r.kindCounts.mode || 0) +
      '  none=' + (r.kindCounts.none || 0));
    console.log('length: min=' + r.lengthStats.min + ' max=' + r.lengthStats.max +
      '  | <50: ' + r.lengthStats.under50 + '  50-70: ' + r.lengthStats.in50to70 + '  >70: ' + r.lengthStats.over70);
    console.log('COLLISIONS: ' + r.collisionCount + (r.collisionCount ? '  *** must resolve before --confirm ***' : '  ✓'));
    r.collisions.slice(0, 25).forEach(function (col) {
      console.log('  [' + col.class + ' ×' + col.count + '] ' + col.title);
      col.members.slice(0, 6).forEach(function (m) { console.log('      - ' + m.slug + '  (raw=' + (m.raw || '∅') + ', ' + m.diffKind + ')'); });
    });
    console.log('sample new titles:');
    r.samples.forEach(function (s) { console.log('  [' + s.len + '] ' + s.after + '   (' + s.diffKind + ')'); });
  });

  if (args.out) {
    try {
      fs.mkdirSync(path.dirname(args.out), { recursive: true });
      fs.writeFileSync(args.out, JSON.stringify(report, null, 2));
      console.log('\n[audit-title-differentiators] full report → ' + args.out);
    } catch (e) {
      console.error('[audit-title-differentiators] could not write --out: ' + e.message);
    }
  }

  console.log('\n[audit-title-differentiators] ' + (anyCollision
    ? 'RESULT: collisions present — resolve before republish-seo --confirm.'
    : 'RESULT: no collisions — safe to proceed to dry-run/confirm.'));
  process.exit(anyCollision ? 2 : 0);
}

if (require.main === module) main();
module.exports = { auditLocale: auditLocale, displayedLength: displayedLength, decodeEntities: decodeEntities };
