#!/usr/bin/env node
/* SV picture-sort "-vs-" PAIR enumeration (READ-ONLY). subjectTags[0]="X-vs-Y" combined key.
 * Group by pairKey; canonical = earliest publishedAt; siblings = rest. Parse left/right themes.
 * MUST run on Hetzner (DB). Usage: node scripts/seo-landing/enum-sv-picturesort.js > scripts/seo-landing/sv-picture-sort-coordinates.json
 */
'use strict';
var db = require('../publish-cli/db');
(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'sv', status: 'published', exerciseType: 'picture-sort' },
    select: { slug: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });
  var groups = {};
  rows.forEach(function (r) {
    var key = (r.subjectTags && r.subjectTags[0]) || '';
    if (key.indexOf('-vs-') === -1) return;
    (groups[key] = groups[key] || []).push(r);
  });
  var coords = Object.keys(groups).sort().map(function (key) {
    var mem = groups[key].slice().sort(function (a, b) {
      var ta = a.publishedAt ? +new Date(a.publishedAt) : Infinity, tb = b.publishedAt ? +new Date(b.publishedAt) : Infinity;
      return ta !== tb ? ta - tb : (a.id < b.id ? -1 : 1);
    });
    var m = key.split('-vs-');
    return { pairKey: key, left: m[0] || '', right: m[1] || '', canonical: mem[0].slug, siblings: mem.map(function (x) { return x.slug; }), n: mem.length };
  }).filter(function (x) { return x.left && x.right; });
  console.log(JSON.stringify({
    locale: 'sv', exerciseType: 'picture-sort', rawRowCount: rows.length, pairCount: coords.length,
    leftThemes: Array.from(new Set(coords.map(function (x) { return x.left; }))).sort(),
    rightThemes: Array.from(new Set(coords.map(function (x) { return x.right; }))).sort(),
    coordinates: coords
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
