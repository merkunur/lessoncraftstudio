#!/usr/bin/env node
/* Wave 4 lead+coupled coordinate enumeration (READ-ONLY): word-guess/easy + find-and-count/letter-spotting × EN K.
 * Group by (type, mode, theme); canonical = earliest publishedAt; siblings = rest (find-and-count heavy collapse).
 * slugTheme theme-derived. Literacy gates (none/phonetic) → no theme retirement (warn-only).
 * MUST run on Hetzner. Usage: node scripts/seo-landing/enum-wave4-literacyA.js
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: {
      language: 'en', status: 'published',
      OR: [
        { exerciseType: 'word-guess', exerciseMode: 'easy' },
        { exerciseType: 'find-and-count', exerciseMode: 'letter-spotting' }
      ]
    },
    select: { slug: true, exerciseType: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ exerciseType: 'asc' }, { slug: 'asc' }]
  });
  var groups = {};
  rows.forEach(function (r) {
    var theme = (r.subjectTags && r.subjectTags[0]) || '(none)';
    var key = r.exerciseType + '::' + r.exerciseMode + '::' + theme;
    (groups[key] = groups[key] || []).push(r);
  });
  var coords = Object.keys(groups).sort().map(function (key) {
    var parts = key.split('::'), type = parts[0], mode = parts[1], theme = parts[2];
    var members = groups[key].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb; return a.id < b.id ? -1 : 1;
    });
    var v = validateCoordinate ? validateCoordinate(type, mode, theme, {}) : { valid: true, warn: null };
    return { type: type, mode: mode, theme: theme, slugTheme: theme.replace(/_/g, '-'), n: members.length,
      canonical: members[0].slug, siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))),
      warn: v.warn || null, valid: v.valid, gate: v.gate, reason: v.valid ? undefined : v.reason };
  });
  var valid = coords.filter(function (x) { return x.valid && x.theme !== '(none)'; });
  var byType = {}; valid.forEach(function (x) { byType[x.type] = (byType[x.type] || 0) + 1; });
  console.log(JSON.stringify({
    rawRowCount: rows.length, validByType: byType, validCount: valid.length,
    gates: Array.from(new Set(coords.map(function (x) { return x.type + ':' + x.gate; }))),
    ageRangeValues: Array.from(new Set(rows.map(function (r) { return r.exerciseType + ':' + r.ageRange; }))),
    collapses: coords.filter(function (x) { return x.n > 1; }).map(function (x) { return x.type + '/' + x.theme + ' n=' + x.n; }),
    warns: valid.filter(function (x) { return x.warn; }).map(function (x) { return x.type + '/' + x.theme + ' (' + x.warn + ')'; }),
    sampleSlugs: valid.slice(0, 4).map(function (x) { return x.type + ' -> ' + x.canonical; }),
    validCoordinates: valid.map(function (x) { return { type: x.type, mode: x.mode, theme: x.theme, slugTheme: x.slugTheme, canonical: x.canonical, siblings: x.siblings }; })
  }, null, 2));
  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
