#!/usr/bin/env node
/* Wave 5 picture-sort coordinate enumeration (READ-ONLY): picture-sort/(null) × EN K — the "-vs-" PAIRS.
 * subjectTags[0] = "X-vs-Y" (single combined key). Parse into left/right themes. 1:1 kept pairs (no collapse).
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave5-picturesort.js
 */
'use strict';
var db = require('../publish-cli/db');
(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'picture-sort' },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });
  var coords = rows.map(function (r) {
    var key = (r.subjectTags && r.subjectTags[0]) || '';
    var m = key.split('-vs-');
    return { pairKey: key, left: m[0] || '', right: m[1] || '', slug: r.slug, age: r.ageRange, n: 1 };
  }).filter(function (x) { return x.left && x.right; });
  console.log(JSON.stringify({
    rawRowCount: rows.length, pairCount: coords.length,
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    leftThemes: Array.from(new Set(coords.map(function (x) { return x.left; }))).sort(),
    rightThemes: Array.from(new Set(coords.map(function (x) { return x.right; }))).sort(),
    pairs: coords.map(function (x) { return { left: x.left, right: x.right, pairKey: x.pairKey, slug: x.slug }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
