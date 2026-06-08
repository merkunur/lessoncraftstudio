#!/usr/bin/env node
/* DE addition coordinate enumeration (READ-ONLY) — STEP 1 of the de landing fan-out.
 * Dumps published DE addition decks for modes image-image + image-number + mixed so the
 * canonicalDeckSlug<->published-deck join + theme grouping can be ground-truthed before
 * authoring de.json. Groups by (exerciseMode, subjectTags[0]) — the language-AGNOSTIC
 * theme axis-key (NOT the native slug, which differs per locale); canonical = earliest
 * publishedAt; siblings = the rest. Drops 4th_of_july (STEP-0 locale-validity exclusion).
 *
 * MUST run on Hetzner (DATABASE_URL -> local production Postgres).
 * Usage: node scripts/seo-landing/enum-addition-coords-de.js > scripts/seo-landing/de-addition-coordinates.json
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

var DROP_THEMES = { '4th_of_july': true }; // STEP-0 de drop-list (US-specific, ~0 de demand)

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: {
      language: 'de',
      status: 'published',
      exerciseType: 'addition',
      exerciseMode: { in: ['image-image', 'image-number', 'mixed'] }
    },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ exerciseMode: 'asc' }, { slug: 'asc' }]
  });

  // group by (mode, theme=subjectTags[0])  — axis-key, locale-agnostic
  var groups = {}, noTag = [];
  rows.forEach(function (r) {
    var theme = (r.subjectTags && r.subjectTags[0]) || null;
    if (!theme) { noTag.push(r.slug); return; }
    if (DROP_THEMES[theme]) return;
    var key = r.exerciseMode + '::' + theme;
    (groups[key] = groups[key] || []).push(r);
  });

  var coords = Object.keys(groups).sort().map(function (key) {
    var parts = key.split('::');
    var mode = parts[0], theme = parts[1];
    var members = groups[key].slice().sort(function (a, b) {
      var ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      var tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb;
      return a.id < b.id ? -1 : 1;
    });
    var v = validateCoordinate ? validateCoordinate('addition', mode, theme, {}) : { valid: true, warn: null };
    return {
      mode: mode,
      theme: theme,
      slugTheme: theme.replace(/_/g, '-'), // placeholder; generator resolves the native de slug from topics-taxonomy.json
      multiTag: (members[0].subjectTags || []).length > 1 ? members[0].subjectTags : undefined,
      n: members.length,
      canonical: members[0].slug,
      siblings: members.map(function (m) { return m.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.ageRange; }))),
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
    locale: 'de',
    exerciseType: 'addition',
    rawRowCount: rows.length,
    rowsWithoutSubjectTag: noTag.length,
    droppedThemes: Object.keys(DROP_THEMES),
    coordinateCountByMode_ALL: byModeAll,
    coordinateCountByMode_VALID: byModeValid,
    totalValidNew: validCoords.length,
    distinctThemes: Array.from(new Set(coords.map(function (c) { return c.theme; }))).sort(),
    multiTagRows: coords.filter(function (c) { return c.multiTag; }).map(function (c) { return c.mode + '/' + c.theme + ':' + JSON.stringify(c.multiTag); }),
    collapsedFamilies: coords.filter(function (c) { return c.n > 1; }).map(function (c) { return c.mode + '/' + c.theme + ' n=' + c.n + ' [' + c.siblings.join(', ') + ']'; }),
    warnings: coords.filter(function (c) { return c.warn; }).map(function (c) { return c.mode + '/' + c.theme + ' — ' + c.warn; }),
    invalidRetired: invalid,
    coordinates: validCoords
  }, null, 2));

  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
