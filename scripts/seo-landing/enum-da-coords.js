#!/usr/bin/env node
/* Generic DA coordinate enumeration (READ-ONLY) — the da fan (STEP 2), any non-picture-sort type.
 * Clone of enum-sv-coords.js with language='da'. Dumps published da decks for an exercise-type,
 * grouped by (exerciseMode, subjectTags[0]) — the language-agnostic theme axis-key. exerciseMode may
 * be null (single-mode types). canonical = earliest publishedAt; siblings = the rest. Drops 4th_of_july
 * (locale-validity exclusion; a US holiday Dutch teachers don't search). NOT for picture-sort (its
 * "-vs-" grouping is a separate sub-slice — use enum-da-picturesort.js).
 *
 * Emits `level` per coordinate ONLY when --level=<key> is passed (readiness types: --level=boernehaveklasse).
 * Numeric/banded types (addition/subtraction/code-addition/math-puzzle) omit level here and get a
 * per-coordinate re-grade pass (by child-seen quantity, split-at-20: ≤20 1-klasse / 21-100 2-klasse)
 * before gen — DO NOT default their level.
 *
 * MUST run on Hetzner (DATABASE_URL -> local production Postgres).
 * Usage: node scripts/seo-landing/enum-da-coords.js --type=grid-match --level=boernehaveklasse > scripts/seo-landing/da-grid-match-coordinates.json
 */
'use strict';
var db = require('../publish-cli/db');
var validateCoordinate;
try { validateCoordinate = require('./validity-gate').validateCoordinate; } catch (e) { validateCoordinate = null; }

var argv = process.argv.slice(2);
var arg = function (k, d) { var a = argv.find(function (s) { return s.indexOf('--' + k + '=') === 0; }); return a ? a.slice(k.length + 3) : d; };
var TYPE = arg('type', null);
var LEVEL = arg('level', null); // emit this level on every coord (readiness types); omit for banded math (re-grade later)
if (!TYPE) { console.error('ENUM-ERROR: --type=<exerciseType> required'); process.exit(1); }
var DROP_THEMES = { '4th_of_july': true };

(async function () {
  var c = db.client();
  var rows = await c.deck.findMany({
    where: { language: 'da', status: 'published', exerciseType: TYPE },
    select: { slug: true, exerciseMode: true, ageRange: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }]
  });

  var groups = {}, noTag = [];
  rows.forEach(function (r) {
    var theme = (r.subjectTags && r.subjectTags[0]) || null;
    if (!theme) { noTag.push(r.slug); return; }
    if (DROP_THEMES[theme]) return;
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
    var co = {
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
    if (LEVEL) co.level = LEVEL;
    return co;
  });

  var byModeAll = {}, invalid = [];
  coords.forEach(function (co) {
    var mk = co.mode === null ? '(null)' : co.mode;
    byModeAll[mk] = (byModeAll[mk] || 0) + 1;
    if (!co.valid) invalid.push(mk + '/' + co.theme + ' — ' + co.reason);
  });
  var validCoords = coords.filter(function (c) { return c.valid; });

  console.log(JSON.stringify({
    locale: 'da',
    exerciseType: TYPE,
    level: LEVEL || '(per-coordinate re-grade)',
    rawRowCount: rows.length,
    rowsWithoutSubjectTag: noTag.length,
    droppedThemes: Object.keys(DROP_THEMES),
    coordinateCountByMode_ALL: byModeAll,
    totalValid: validCoords.length,
    distinctThemes: Array.from(new Set(coords.map(function (c) { return c.theme; }))).sort(),
    distinctModes: Array.from(new Set(coords.map(function (c) { return c.mode; }))),
    collapsedFamilies: coords.filter(function (c) { return c.n > 1; }).length,
    invalidRetired: invalid,
    coordinates: validCoords
  }, null, 2));

  await db.disconnect();
})().catch(function (e) { console.error('ENUM-ERROR:', e && e.message); process.exit(1); });
