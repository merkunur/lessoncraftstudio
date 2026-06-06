#!/usr/bin/env node
/* Wave 1b coordinate enumeration (READ-ONLY).
 * Dumps published EN addition decks for modes image-number + mixed so the
 * canonicalDeckSlug<->published-deck join + theme grouping can be ground-truthed
 * before authoring. Groups by (mode, theme); canonical = earliest publishedAt;
 * collapseSiblings = the rest. theme is derived from the native slug
 * (strip `addition-<mode>-` prefix + trailing `-<digits>` disambiguator),
 * cross-printed against subjectTags so we can see if they agree.
 *
 * MUST run on Hetzner (DATABASE_URL -> local production Postgres).
 * Usage: node scripts/seo-landing/enum-wave1b-coords.js
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

function themeFromSlug(mode, slug) {
  var prefix = 'addition-' + mode + '-';
  if (slug === 'addition-' + mode) return '(bare)';
  if (slug.indexOf(prefix) !== 0) return '(unexpected:' + slug + ')';
  var rest = slug.slice(prefix.length);
  rest = rest.replace(/-\d+$/, ''); // strip trailing numeric disambiguator
  return rest;
}

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: {
      language: 'en',
      status: 'published',
      exerciseType: 'addition',
      exerciseMode: { in: ['image-number', 'mixed'] }
    },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ exerciseMode: 'asc' }, { slug: 'asc' }]
  });

  // group by (mode, theme)
  var groups = {};
  rows.forEach(function (r) {
    var theme = themeFromSlug(r.exerciseMode, r.slug);
    var key = r.exerciseMode + '::' + theme;
    (groups[key] = groups[key] || []).push(r);
  });

  var coords = Object.keys(groups).sort().map(function (key) {
    var parts = key.split('::');
    var members = groups[key].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb;
      return a.id < b.id ? -1 : 1;
    });
    var themeKey = (members[0].subjectTags && members[0].subjectTags[0]) || parts[1].replace(/-/g, '_');
    var v = validateCoordinate ? validateCoordinate('addition', parts[0], themeKey, {}) : { valid: true, warn: null };
    return {
      mode: parts[0],
      theme: themeKey,
      slugTheme: parts[1],
      multiTag: (members[0].subjectTags || []).length > 1 ? members[0].subjectTags : undefined,
      n: members.length,
      canonical: members[0].slug,
      siblings: members.map(function (m) { return m.slug; }),
      valid: v.valid,
      warn: v.warn || undefined,
      reason: v.valid ? undefined : v.reason
    };
  });

  var byModeAll = {}, byModeValid = {}, invalid = [];
  coords.forEach(function (co) {
    byModeAll[co.mode] = (byModeAll[co.mode] || 0) + 1;
    if (co.valid) byModeValid[co.mode] = (byModeValid[co.mode] || 0) + 1;
    else invalid.push(co.mode + '/' + co.theme + ' — ' + co.reason);
  });
  var validCoords = coords.filter(function (c) { return c.valid; });

  console.log(JSON.stringify({
    rawRowCount: rows.length,
    coordinateCountByMode_ALL: byModeAll,
    coordinateCountByMode_VALID: byModeValid,
    totalValidNew: validCoords.length,
    projectedTotalWithLive43ImageImage: validCoords.length + 43,
    multiTagRows: coords.filter(function (c) { return c.multiTag; }).map(function (c) { return c.mode + '/' + c.theme + ':' + JSON.stringify(c.multiTag); }),
    collapsedFamilies: coords.filter(function (c) { return c.n > 1; }).map(function (c) { return c.mode + '/' + c.theme + ' n=' + c.n + ' [' + c.siblings.join(', ') + ']'; }),
    warnings: coords.filter(function (c) { return c.warn; }).map(function (c) { return c.mode + '/' + c.theme + ' — ' + c.warn; }),
    invalidRetired: invalid,
    validCoordinates: validCoords
  }, null, 2));

  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
