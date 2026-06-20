#!/usr/bin/env node
/* Cross-language coordinate enumeration (READ-ONLY) — the /learn landing fan-out.
 * Dumps published CROSS-LANGUAGE decks (a target language taught with page-locale clues) for one
 * (page-locale, target, exercise-type), grouped by (exerciseMode, subjectTags[0]) — the language-
 * AGNOSTIC theme axis-key. Each coordinate carries `target` (the taught language ISO) so the landing
 * coordKey never collides with the monolingual coordinate of the same (type, mode, theme).
 * canonical = earliest publishedAt; siblings = the rest of the same-coordinate decks (collapse group).
 *
 * Unlike enum-coords-de.js this does NOT drop 4th_of_july — for an English-learning deck that theme
 * is legitimate vocabulary (it only yields a landing if the locale theme-table has copy data for it).
 *
 * MUST run on Hetzner (DATABASE_URL -> local production Postgres).
 * Usage: node scripts/seo-landing/enum-crosslang.js --locale=de --target=en --type=crossword \
 *          > scripts/seo-landing/de-en-crossword-coordinates.json
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

var argv = process.argv.slice(2);
var arg = function (k, d) { var a = argv.find(function (s) { return s.indexOf('--' + k + '=') === 0; }); return a ? a.slice(k.length + 3) : d; };
var LOCALE = arg('locale', null);
var TARGET = arg('target', null);
var TYPE = arg('type', null);
if (!LOCALE || !TARGET || !TYPE) { console.error('ENUM-ERROR: --locale, --target and --type all required'); process.exit(1); }

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: LOCALE, status: 'published', exerciseType: TYPE, contentLanguage: TARGET },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });

  // group by (mode, theme=subjectTags[0]); mode null -> "null" group key
  var groups = {}, noTag = [];
  rows.forEach(function (r) {
    var theme = (r.subjectTags && r.subjectTags[0]) || null;
    if (!theme) { noTag.push(r.slug); return; }
    var mode = (r.exerciseMode == null) ? null : r.exerciseMode;
    var key = (mode === null ? 'null' : mode) + '::' + theme;
    (groups[key] = groups[key] || []).push({ r: r, mode: mode });
  });

  var coords = Object.keys(groups).sort().map(function (key) {
    var members = groups[key].slice().sort(function (a, b) {
      var ta = a.r.publishedAt ? new Date(a.r.publishedAt).getTime() : Infinity;
      var tb = b.r.publishedAt ? new Date(b.r.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb;
      return a.r.id < b.r.id ? -1 : 1;
    });
    var mode = members[0].mode;
    var theme = key.split('::')[1];
    var v = validateCoordinate ? validateCoordinate(TYPE, mode, theme, {}) : { valid: true, warn: null };
    return {
      target: TARGET,
      mode: mode,
      theme: theme,
      slugTheme: theme.replace(/_/g, '-'),
      multiTag: (members[0].r.subjectTags || []).length > 1 ? members[0].r.subjectTags : undefined,
      n: members.length,
      canonical: members[0].r.slug,
      siblings: members.map(function (m) { return m.r.slug; }),
      ageRanges: Array.from(new Set(members.map(function (m) { return m.r.ageRange; }))),
      valid: v.valid,
      gate: v.gate,
      warn: v.warn || undefined,
      reason: v.valid ? undefined : v.reason
    };
  });

  var byModeAll = {}, invalid = [];
  coords.forEach(function (co) {
    var mk = co.mode === null ? '(null)' : co.mode;
    byModeAll[mk] = (byModeAll[mk] || 0) + 1;
    if (!co.valid) invalid.push(mk + '/' + co.theme + ' — ' + co.reason);
  });
  var validCoords = coords.filter(function (c) { return c.valid; });

  console.log(JSON.stringify({
    locale: LOCALE,
    target: TARGET,
    exerciseType: TYPE,
    rawRowCount: rows.length,
    rowsWithoutSubjectTag: noTag.length,
    coordinateCountByMode_ALL: byModeAll,
    totalValid: validCoords.length,
    gateClasses: Array.from(new Set(coords.map(function (c) { return c.gate; }))),
    distinctThemes: Array.from(new Set(coords.map(function (c) { return c.theme; }))).sort(),
    distinctModes: Array.from(new Set(coords.map(function (c) { return c.mode; }))),
    collapsedFamilies: coords.filter(function (c) { return c.n > 1; }).length,
    invalidRetired: invalid,
    coordinates: validCoords
  }, null, 2));

  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
