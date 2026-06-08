#!/usr/bin/env node
/* DE picture-sort coordinate enumeration (READ-ONLY): picture-sort/(null) × de — the "-vs-" PAIRS.
 * subjectTags[0] = "X-vs-Y" (single combined key). Parse into left/right themes. Mirror of enum-wave5-picturesort.js.
 * MUST run on Hetzner (DB). Usage: node scripts/seo-landing/enum-de-picturesort.js
 */
'use strict';
var db = require('../publish-cli/db');
(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'de', status: 'published', exerciseType: 'picture-sort' },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });
  var coords = rows.map(function (r) {
    var key = (r.subjectTags && r.subjectTags[0]) || '';
    var m = key.split('-vs-');
    return { pairKey: key, left: m[0] || '', right: m[1] || '', slug: r.slug, age: r.ageRange, n: 1 };
  }).filter(function (x) { return x.left && x.right; });
  // count pairs anchored on each demand theme (animals / at_the_supermarket / bakery)
  var ANCHORS = ['animals', 'at_the_supermarket', 'bakery'];
  var byAnchor = {};
  ANCHORS.forEach(function (a) { byAnchor[a] = coords.filter(function (x) { return x.left === a || x.right === a; }).length; });
  console.log(JSON.stringify({
    rawRowCount: rows.length, pairCount: coords.length,
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    leftThemes: Array.from(new Set(coords.map(function (x) { return x.left; }))).sort(),
    rightThemes: Array.from(new Set(coords.map(function (x) { return x.right; }))).sort(),
    anchorPairCounts: byAnchor,
    pairs: coords.map(function (x) { return { left: x.left, right: x.right, pairKey: x.pairKey, slug: x.slug }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
