#!/usr/bin/env node
/* Wave 2 chart-count coordinate enumeration (READ-ONLY).
 * Published EN chart-count (null mode) decks → group by (theme); canonical = earliest publishedAt;
 * collapseSiblings = rest. theme from subjectTags[0] (underscored axis-key), cross-checked vs the
 * native slug (strip `chart-count-` prefix + trailing `-<digits>`). Validity-gated (chart-count =
 * countability gate with the colors/shapes override-whitelist). MUST run on Hetzner.
 * Usage: node scripts/seo-landing/enum-wave2-chartcount.js
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

function slugTheme(slug) {
  if (slug === 'chart-count') return '(bare)';
  if (slug.indexOf('chart-count-') !== 0) return '(unexpected:' + slug + ')';
  return slug.slice('chart-count-'.length).replace(/-\d+$/, '');
}

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'chart-count' },
    select: { slug: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });

  var groups = {};
  rows.forEach(function (r) {
    var theme = (r.subjectTags && r.subjectTags[0]) || slugTheme(r.slug).replace(/-/g, '_');
    (groups[theme] = groups[theme] || []).push(r);
  });

  var coords = Object.keys(groups).sort().map(function (theme) {
    var members = groups[theme].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb;
      return a.id < b.id ? -1 : 1;
    });
    var v = validateCoordinate ? validateCoordinate('chart-count', null, theme, {}) : { valid: true, warn: null };
    return {
      mode: null, theme: theme, slugTheme: slugTheme(members[0].slug),
      n: members.length, canonical: members[0].slug,
      siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))),
      collective: !!(v.warn), valid: v.valid, reason: v.valid ? undefined : v.reason
    };
  });

  var valid = coords.filter(function (x) { return x.valid && x.theme !== '(none)' && x.slugTheme !== '(bare)'; });
  console.log(JSON.stringify({
    rawRowCount: rows.length,
    totalThemes: coords.length,
    validCount: valid.length,
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).map(function (x) { return x.theme + ' n=' + x.n; }),
    retired: coords.filter(function (x) { return !x.valid; }).map(function (x) { return x.theme + ' — ' + x.reason; }),
    collectiveWarn: valid.filter(function (x) { return x.collective; }).map(function (x) { return x.theme; }),
    bareOrNone: coords.filter(function (x) { return x.theme === '(none)' || x.slugTheme === '(bare)'; }).map(function (x) { return x.canonical; }),
    validCoordinates: valid.map(function (x) { return { mode: null, theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings, collective: x.collective }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
