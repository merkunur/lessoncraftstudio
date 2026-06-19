#!/usr/bin/env node
/* enum (READ-ONLY): alphabet-train / mode=letter-hint × PRESCHOOL (readiness; ABC-order with printed letter cues).
 * Group by theme; canonical = earliest publishedAt; siblings = the rest (variant-suffixed deck slugs).
 * MUST run on Hetzner (needs the published-deck DB). Usage: node scripts/seo-landing/enum-alphabet-train-letterhint.js --locale=en
 */
'use strict';
var db = require('../publish-cli/db');
var localeArg = (process.argv.find(function (a) { return a.indexOf('--locale=') === 0; }) || '--locale=en').split('=')[1];
(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: localeArg, status: 'published', exerciseType: 'alphabet-train', exerciseMode: 'letter-hint' },
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
    return { mode: 'letter-hint', theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
      canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))) };
  });
  var valid = coords.filter(function (x) { return x.theme !== '(none)'; });
  console.log(JSON.stringify({
    locale: localeArg, exerciseType: 'alphabet-train', exerciseMode: 'letter-hint',
    rawRowCount: rows.length, validCount: valid.length,
    modesSeen: Array.from(new Set(rows.map(function (r) { return r.exerciseMode; }))),
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).length,
    collapseSizes: Array.from(new Set(valid.map(function (x) { return x.n; }))).sort(function (a, b) { return a - b; }),
    bareOrNone: coords.filter(function (x) { return x.theme === '(none)'; }).map(function (x) { return x.canonical; }),
    sampleSlugs: valid.slice(0, 3).map(function (x) { return x.canonical + ' (n=' + x.n + ')'; }),
    coordinates: valid.map(function (x) { return { mode: x.mode, theme: x.theme, slugTheme: x.slugTheme, n: x.n, canonical: x.canonical, siblings: x.siblings, ageRanges: x.ageRanges }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
