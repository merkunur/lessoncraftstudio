#!/usr/bin/env node
/* Wave 2 subtraction coordinate enumeration (READ-ONLY).
 * Published EN subtraction × {cross-out, image-number} decks → group by (mode, theme); canonical =
 * earliest publishedAt; collapseSiblings = rest. theme from subjectTags[0]; validity-gated
 * (subtraction = countability gate). MUST run on Hetzner. Mirror of enum-wave1b-coords.js.
 * Usage: node scripts/seo-landing/enum-wave2-subtraction.js
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

function slugTheme(mode, slug) {
  var prefix = 'subtraction-' + mode + '-';
  if (slug === 'subtraction-' + mode) return '(bare)';
  if (slug.indexOf(prefix) !== 0) return '(unexpected:' + slug + ')';
  return slug.slice(prefix.length).replace(/-\d+$/, '');
}

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'subtraction', exerciseMode: { in: ['cross-out', 'image-number'] } },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ exerciseMode: 'asc' }, { slug: 'asc' }]
  });

  var groups = {};
  rows.forEach(function (r) {
    var theme = (r.subjectTags && r.subjectTags[0]) || slugTheme(r.exerciseMode, r.slug).replace(/-/g, '_');
    var key = r.exerciseMode + '::' + theme;
    (groups[key] = groups[key] || []).push(r);
  });

  var coords = Object.keys(groups).sort().map(function (key) {
    var parts = key.split('::'), mode = parts[0], theme = parts[1];
    var members = groups[key].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb;
      return a.id < b.id ? -1 : 1;
    });
    var v = validateCoordinate ? validateCoordinate('subtraction', mode, theme, {}) : { valid: true, warn: null };
    // slugTheme derives from the THEME (hyphenated), not the canonical slug — a collapse whose canonical is the
    // bare slug (e.g. animals: canonical `subtraction-cross-out`) still gets a real slugTheme (`animals`).
    return {
      mode: mode, theme: theme, slugTheme: theme.replace(/_/g, '-'),
      n: members.length, canonical: members[0].slug,
      siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))),
      collective: !!(v.warn), valid: v.valid, reason: v.valid ? undefined : v.reason
    };
  });

  var valid = coords.filter(function (x) { return x.valid && x.theme !== '(none)' && x.theme !== '(bare)' && x.theme.indexOf('(unexpected') !== 0; });
  var byMode = {}; valid.forEach(function (x) { byMode[x.mode] = (byMode[x.mode] || 0) + 1; });
  console.log(JSON.stringify({
    rawRowCount: rows.length,
    validByMode: byMode,
    validCount: valid.length,
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).map(function (x) { return x.mode + '/' + x.theme + ' n=' + x.n + ' [' + x.siblings.join(', ') + ']'; }),
    retired: coords.filter(function (x) { return !x.valid; }).map(function (x) { return x.mode + '/' + x.theme; }),
    collectiveWarn: Array.from(new Set(valid.filter(function (x) { return x.collective; }).map(function (x) { return x.theme; }))),
    bwThemes: Array.from(new Set(valid.filter(function (x) { return /_bw$/.test(x.theme); }).map(function (x) { return x.theme; }))),
    bareOrNone: coords.filter(function (x) { return x.theme === '(none)' || x.slugTheme === '(bare)'; }).map(function (x) { return x.canonical; }),
    validCoordinates: valid.map(function (x) { return { mode: x.mode, theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings, collective: x.collective }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
