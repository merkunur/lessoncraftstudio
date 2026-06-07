#!/usr/bin/env node
/* Wave 7 coupled-K enum (READ-ONLY): grid-match/(null) + missing-pieces/one-missing × EN K (readiness; part-to-whole).
 * Per type: group by theme; canonical = earliest publishedAt; siblings = rest. missing-pieces ~6x (heaviest in program).
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave7-visualperception.js
 */
'use strict';
var db = require('../publish-cli/db');
function enumType(c, type) {
  return c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: type },
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
      return { mode: members[0].exerciseMode || 'null', theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
        canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }) };
    });
    var valid = coords.filter(function (x) { return x.theme !== '(none)'; });
    var totalDecks = rows.length, totalSibs = valid.reduce(function (s, x) { return s + x.siblings.length; }, 0);
    return {
      type: type, rawRowCount: rows.length, validCount: valid.length,
      modesSeen: Array.from(new Set(rows.map(function (r) { return r.exerciseMode; }))),
      ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
      collapses: valid.filter(function (x) { return x.n > 1; }).length,
      collapseSizes: Array.from(new Set(valid.map(function (x) { return x.n; }))).sort(function (a, b) { return a - b; }),
      orphanCheck: (totalSibs + valid.filter(function(x){return false;}).length), // sum of siblings = decks accounted
      decksAccounted: totalSibs, bareOrNone: coords.filter(function (x) { return x.theme === '(none)'; }).map(function (x) { return x.canonical + '(n=' + x.n + ')'; }),
      sample: valid.slice(0, 3).map(function (x) { return x.canonical + ' (n=' + x.n + ')'; }),
      validCoordinates: valid.map(function (x) { return { mode: x.mode, theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings }; })
    };
  });
}
(async function () {
  var c = db.client();
  var gm = await enumType(c, 'grid-match');
  var mp = await enumType(c, 'missing-pieces');
  console.log(JSON.stringify({ gridmatch: gm, missingpieces: mp }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
