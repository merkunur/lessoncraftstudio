#!/usr/bin/env node
/* Wave 3 slice C coordinate enumeration (READ-ONLY): code-addition × {null, secret-word} × EN published.
 * Group by (mode, theme); mode = exerciseMode || 'null'; canonical = earliest publishedAt; siblings = rest
 * (null mode has heavy collapse + -v1 republish variants). slugTheme theme-derived. Validity-gated.
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave3-codeC.js
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'en', status: 'published', exerciseType: 'code-addition' },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });
  var groups = {};
  rows.forEach(function (r) {
    var mode = r.exerciseMode || 'null';
    var theme = (r.subjectTags && r.subjectTags[0]) || '(none)';
    var key = mode + '::' + theme;
    (groups[key] = groups[key] || []).push(r);
  });
  var coords = Object.keys(groups).sort().map(function (key) {
    var parts = key.split('::'), mode = parts[0], theme = parts[1];
    var members = groups[key].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb; return a.id < b.id ? -1 : 1;
    });
    var modeForGate = mode === 'null' ? null : mode;
    var v = validateCoordinate ? validateCoordinate('code-addition', modeForGate, theme, {}) : { valid: true, warn: null };
    return { mode: mode, theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
      canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))),
      collective: !!(v.warn), valid: v.valid, reason: v.valid ? undefined : v.reason };
  });
  var valid = coords.filter(function (x) { return x.valid && x.theme !== '(none)'; });
  var byMode = {}; valid.forEach(function (x) { byMode[x.mode] = (byMode[x.mode] || 0) + 1; });
  console.log(JSON.stringify({
    rawRowCount: rows.length, validByMode: byMode, validCount: valid.length,
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).map(function (x) { return x.mode + '/' + x.theme + ' n=' + x.n; }),
    retired: coords.filter(function (x) { return !x.valid; }).map(function (x) { return x.mode + '/' + x.theme; }),
    validCoordinates: valid.map(function (x) { return { mode: x.mode, theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings, collective: x.collective }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
