#!/usr/bin/env node
/* Wave 6 lead enum (READ-ONLY): pattern-train × {ab(null), aab, aabb, abb, abc} × EN K (readiness).
 * Group by (mode, theme); canonical = earliest publishedAt; siblings = rest.
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave6-patterntrain.js
 */
'use strict';
var db = require('../publish-cli/db');
(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'pattern-train' },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ exerciseMode: 'asc' }, { slug: 'asc' }]
  });
  var groups = {};
  rows.forEach(function (r) {
    var mode = r.exerciseMode || 'null';
    var theme = (r.subjectTags && r.subjectTags[0]) || '(none)';
    (groups[mode + '::' + theme] = groups[mode + '::' + theme] || []).push(r);
  });
  var coords = Object.keys(groups).sort().map(function (key) {
    var parts = key.split('::'), mode = parts[0], theme = parts[1];
    var members = groups[key].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb; return a.id < b.id ? -1 : 1;
    });
    return { mode: mode, theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
      canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))) };
  });
  var valid = coords.filter(function (x) { return x.theme !== '(none)'; });
  var byMode = {}; valid.forEach(function (x) { byMode[x.mode] = (byMode[x.mode] || 0) + 1; });
  console.log(JSON.stringify({
    rawRowCount: rows.length, validByMode: byMode, validCount: valid.length,
    modesSeen: Array.from(new Set(rows.map(function (r) { return r.exerciseMode; }))),
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).length,
    bareOrNone: coords.filter(function (x) { return x.theme === '(none)'; }).map(function (x) { return x.mode + ':' + x.canonical; }),
    sampleSlugs: ['null','aab','aabb','abb','abc'].map(function (m) { var s = valid.find(function (x){return x.mode===m;}); return m + ' -> ' + (s ? s.canonical : 'NONE'); }),
    validCoordinates: valid.map(function (x) { return { mode: x.mode, theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
