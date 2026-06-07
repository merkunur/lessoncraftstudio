#!/usr/bin/env node
/* Wave 3 math-puzzle coordinate enumeration (READ-ONLY).
 * Published EN math-puzzle (mode 'mixed', the lone published mode) → group by theme; canonical = earliest
 * publishedAt; collapseSiblings = rest. slugTheme from the THEME (the collapse canonical can be the bare
 * `math-puzzle`, like subtraction-cross-out). Validity-gated (countability). MUST run on Hetzner.
 * Usage: node scripts/seo-landing/enum-wave3-mathpuzzle.js
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'math-puzzle' },
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
      if (ta !== tb) return ta - tb;
      return a.id < b.id ? -1 : 1;
    });
    var v = validateCoordinate ? validateCoordinate('math-puzzle', 'mixed', theme, {}) : { valid: true, warn: null };
    return {
      mode: 'mixed', theme: theme, slugTheme: theme.replace(/_/g, '-'),
      n: members.length, canonical: members[0].slug,
      siblings: members.map(function (m) { return m.slug; }),
      modes: Array.from(new Set(members.map(function (m) { return m.exerciseMode; }))),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))),
      collective: !!(v.warn), valid: v.valid, reason: v.valid ? undefined : v.reason
    };
  });

  var valid = coords.filter(function (x) { return x.valid && x.theme !== '(none)'; });
  console.log(JSON.stringify({
    rawRowCount: rows.length,
    validCount: valid.length,
    modesSeen: Array.from(new Set(rows.map(function (r) { return r.exerciseMode; }))),
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).map(function (x) { return x.theme + ' n=' + x.n; }),
    retired: coords.filter(function (x) { return !x.valid; }).map(function (x) { return x.theme; }),
    bareOrNone: coords.filter(function (x) { return x.theme === '(none)'; }).map(function (x) { return x.canonical; }),
    validCoordinates: valid.map(function (x) { return { mode: 'mixed', theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings, collective: x.collective }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
