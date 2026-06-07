#!/usr/bin/env node
/* Wave 6 enum (READ-ONLY): picture-trail/pathway × EN K (readiness; the EN emission of picture-path, §15.10).
 * Group by theme; canonical = earliest publishedAt; siblings = rest (~2.0x collapse expected).
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave6-picturetrail.js
 */
'use strict';
var db = require('../publish-cli/db');
(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'picture-trail' },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });
  var groups = {};
  rows.forEach(function (r) {
    var theme = (r.subjectTags && r.subjectTags[0]) || '(none)';
    (groups[theme] = groups[theme] || []).push(r);
  });
  var coords = Object.keys(groups).sort().map(function (theme) {
    var members = groups[theme].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb; return a.id < b.id ? -1 : 1;
    });
    return { mode: 'pathway', theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
      canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))) };
  });
  var valid = coords.filter(function (x) { return x.theme !== '(none)'; });
  console.log(JSON.stringify({
    rawRowCount: rows.length, validCount: valid.length,
    modesSeen: Array.from(new Set(rows.map(function (r) { return r.exerciseMode; }))),
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).length,
    collapseSizes: Array.from(new Set(coords.filter(function (x){return x.theme!=='(none)';}).map(function (x) { return x.n; }))),
    bareOrNone: coords.filter(function (x) { return x.theme === '(none)'; }).map(function (x) { return x.canonical; }),
    sampleSlugs: valid.slice(0, 4).map(function (x) { return x.canonical + ' (n=' + x.n + ', sibs:' + x.siblings.join(',') + ')'; }),
    validCoordinates: valid.map(function (x) { return { mode: x.mode, theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
