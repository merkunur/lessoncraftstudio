#!/usr/bin/env node
/* Wave 8 LEAD enum (READ-ONLY): math-puzzle/mixed × EN — ALL coordinates (full-corpus re-grade input).
 * Group by theme; canonical = earliest publishedAt; siblings = rest. Output feeds check-sum-ceiling.js for the
 * per-coordinate quantity re-grade (<=20 Gr1-skip / 21-100 Gr2-author / >100 Gr3-remove).
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave8-mathpuzzle.js
 */
'use strict';
var db = require('../publish-cli/db');
(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'math-puzzle', exerciseMode: 'mixed' },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });
  var groups = {};
  rows.forEach(function (r) { var t = (r.subjectTags && r.subjectTags[0]) || '(none)'; (groups[t] = groups[t] || []).push(r); });
  var coords = Object.keys(groups).sort().map(function (theme) {
    var members = groups[theme].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb; return a.id < b.id ? -1 : 1;
    });
    return { mode: 'mixed', theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
      canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }) };
  });
  var valid = coords.filter(function (x) { return x.theme !== '(none)'; });
  console.log(JSON.stringify({ count: valid.length, rawRowCount: rows.length, coordinates: valid }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
