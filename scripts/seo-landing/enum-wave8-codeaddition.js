#!/usr/bin/env node
/* Wave 8 coupled enum (READ-ONLY): code-addition/{null,secret-word} × EN — ALL coords (full-corpus re-grade input).
 * Per submode: group by theme; canonical = earliest publishedAt; siblings = rest. Feeds check-sum-ceiling.js
 * (--source=deck-html, running-SUM) for the per-coordinate Gr1/Gr2/Gr3 re-grade.
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave8-codeaddition.js
 */
'use strict';
var db = require('../publish-cli/db');
function enumMode(c, mode) {
  var where = { language: 'en', status: 'published', exerciseType: 'code-addition' };
  where.exerciseMode = (mode === 'null') ? null : mode;
  return c.deck.findMany({
    where: where,
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  }).then(function (rows) {
    var groups = {};
    rows.forEach(function (r) { var t = (r.subjectTags && r.subjectTags[0]) || '(none)'; (groups[t] = groups[t] || []).push(r); });
    var coords = Object.keys(groups).sort().map(function (theme) {
      var members = groups[theme].slice().sort(function (a, b) {
        var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
        var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
        if (ta !== tb) return ta - tb; return a.id < b.id ? -1 : 1;
      });
      return { mode: mode, theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
        canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }) };
    });
    return coords.filter(function (x) { return x.theme !== '(none)'; });
  });
}
(async function () {
  var c = db.client();
  var nul = await enumMode(c, 'null');
  var sw = await enumMode(c, 'secret-word');
  // combined coords array (check-sum-ceiling reads .coordinates)
  console.log(JSON.stringify({ nullCount: nul.length, secretWordCount: sw.length, coordinates: nul.concat(sw) }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
