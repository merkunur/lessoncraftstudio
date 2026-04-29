/**
 * Read frontend/config/topics-taxonomy.json + axis-key dispatch.
 *
 * Per CLAUDE.md §16.4 + §16.5: two layers.
 *   - apps.<app-name>.{default_subject, default_age_range, exercise_type_axis_key}
 *   - axes.<axis>.<axis-key>.{slug.<locale>, name.<locale>}
 *
 * The `name` field is a Brief B Phase 2 schema extension (per the
 * Phase 2 brief's surfacing of the i18n {type}/{theme}/{level}
 * interpolation needing localized human-readable axis-key names).
 *
 * Used by substitute.js for placeholders 5-10 (end-of-deck links).
 *
 * Per §16.5 missing-locale handling: if locale not in axis-key.slug or
 * .name, return null. Caller (substitute.js) policy: skip end-of-deck
 * link emission for that link variant + emit warning.
 */

'use strict';

var fs = require('fs');
var path = require('path');

var TAXONOMY_FILE = path.join(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');

// Per CLAUDE.md §17.8.6 mapping table.
var AGE_RANGE_TO_LEVEL_AXIS_KEY = {
  '3-5':  'preschool',
  '5-7':  'kindergarten',
  '6-8':  'grade-1',
  '7-9':  'grade-2',
  '8-10': 'grade-3'
};

// Per CLAUDE.md §17.8.6 mapping table (English form for __EDUCATIONAL_LEVEL__).
var AGE_RANGE_TO_LEVEL_EN = {
  '3-5':  'Preschool',
  '5-7':  'Kindergarten',
  '6-8':  'Grade 1',
  '7-9':  'Grade 2',
  '8-10': 'Grade 3'
};

// Per CLAUDE.md §17.8.6 mapping table (i18n key for __EDUCATIONAL_LEVEL_LOCALIZED__).
var AGE_RANGE_TO_LEVEL_I18N_KEY = {
  '3-5':  'preschool',
  '5-7':  'kindergarten',
  '6-8':  'grade_1',
  '7-9':  'grade_2',
  '8-10': 'grade_3'
};

var _cache = null;

function load() {
  if (_cache) return _cache;
  if (!fs.existsSync(TAXONOMY_FILE)) {
    throw new Error('taxonomy.load: ' + TAXONOMY_FILE + ' missing');
  }
  var raw = fs.readFileSync(TAXONOMY_FILE, 'utf8');
  try {
    _cache = JSON.parse(raw);
  } catch (e) {
    throw new Error('taxonomy.load: invalid JSON in ' + TAXONOMY_FILE + ': ' + e.message);
  }
  return _cache;
}

function appConfig(appName) {
  var t = load();
  if (!t.apps || !t.apps[appName]) {
    throw new Error('taxonomy.appConfig: app "' + appName + '" not in taxonomy.apps');
  }
  return t.apps[appName];
}

/**
 * Returns {slug, name} for (axis, axisKey, locale), or null on miss.
 * Missing axis-key throws (taxonomy gap is an error per §16.5).
 * Missing locale on a present axis-key returns null (skip-and-warn per §16.5).
 */
function axisLookup(axis, axisKey, locale) {
  var t = load();
  if (!t.axes || !t.axes[axis]) {
    throw new Error('taxonomy.axisLookup: axis "' + axis + '" not in taxonomy.axes');
  }
  var entry = t.axes[axis][axisKey];
  if (!entry) {
    throw new Error('taxonomy.axisLookup: axis-key "' + axisKey + '" not in taxonomy.axes.' + axis);
  }
  var slug = (entry.slug && entry.slug[locale]) || null;
  var name = (entry.name && entry.name[locale]) || null;
  if (!slug) return null;
  return { slug: slug, name: name };
}

function exerciseTypeFor(appName, locale) {
  var cfg = appConfig(appName);
  return axisLookup('exercise-type', cfg.exercise_type_axis_key, locale);
}

function themeFor(themeKey, locale) {
  if (themeKey == null) return null;
  return axisLookup('theme', themeKey, locale);
}

function levelFor(ageRange, locale) {
  var levelAxisKey = AGE_RANGE_TO_LEVEL_AXIS_KEY[ageRange];
  if (!levelAxisKey) {
    throw new Error('taxonomy.levelFor: invalid age_range "' + ageRange + '"; expected one of ' +
      Object.keys(AGE_RANGE_TO_LEVEL_AXIS_KEY).join(', '));
  }
  return axisLookup('educational-level', levelAxisKey, locale);
}

function clearCache() { _cache = null; }

module.exports = {
  load: load,
  appConfig: appConfig,
  axisLookup: axisLookup,
  exerciseTypeFor: exerciseTypeFor,
  themeFor: themeFor,
  levelFor: levelFor,
  clearCache: clearCache,
  AGE_RANGE_TO_LEVEL_AXIS_KEY: AGE_RANGE_TO_LEVEL_AXIS_KEY,
  AGE_RANGE_TO_LEVEL_EN: AGE_RANGE_TO_LEVEL_EN,
  AGE_RANGE_TO_LEVEL_I18N_KEY: AGE_RANGE_TO_LEVEL_I18N_KEY,
  TAXONOMY_FILE: TAXONOMY_FILE
};
