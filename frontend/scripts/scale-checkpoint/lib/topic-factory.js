// Synthetic Topic row factory.
//
// Topic.slug is @id (single PK); Topic.language='en' on all canonical rows
// per SCHEMA-INTENT-B (2026-05-03). One row per axis-key (canonical English
// form). Per-locale URL rendering happens at URL layer via topics-taxonomy.json.
//
// Mirrors prod Topic seeding pattern: 39 rows currently in prod (29 exercise-
// types + ~10 popular axis-keys). For load-test, we generate 134 axis-keys
// (29 exercise-type + 100 theme + 5 educational-level) so the Topic table is
// at full-taxonomy scale rather than in-flight scale.

const path = require('path');
const taxonomy = require(path.join(__dirname, '..', '..', '..', 'config', 'topics-taxonomy.json'));
const { APPS } = require('./distribution');

const LEVEL_TO_AGE_RANGE = {
  preschool: '3-5',
  kindergarten: '5-7',
  'grade-1': '6-8',
  'grade-2': '7-9',
  'grade-3': '8-10',
};

/**
 * Generates synthetic Topic rows matching the full taxonomy. One row per
 * axis-key, language='en' canonical.
 *
 * @returns {Array<object>} ready for prisma.topic.createMany
 */
function generateTopics() {
  const rows = [];

  // 1. exercise-type axes — one Topic per app
  for (const app of APPS) {
    rows.push({
      slug: app.exerciseType,
      title: { en: app.exerciseType.replace(/-/g, ' ') },
      description: { en: `Topic page for ${app.exerciseType} worksheets.` },
      subject: app.defaultSubject,
      ageRange: app.defaultAgeRange,
      language: 'en',
      curriculumTags: [],
      parentSlug: null,
      isHighPriority: false,
    });
  }

  // 2. theme axes — one Topic per theme axis-key (slug = axis-key, English form)
  for (const themeKey of Object.keys(taxonomy.axes.theme)) {
    rows.push({
      slug: `theme-${themeKey}`,
      title: { en: themeKey.replace(/_/g, ' ') },
      description: { en: `Topic page for ${themeKey}-themed worksheets.` },
      subject: 'mixed',
      ageRange: '5-7',
      language: 'en',
      curriculumTags: [],
      parentSlug: null,
      isHighPriority: false,
    });
  }

  // 3. educational-level axes — one Topic per level
  for (const levelKey of Object.keys(taxonomy.axes['educational-level'])) {
    rows.push({
      slug: `level-${levelKey}`,
      title: { en: levelKey.replace(/-/g, ' ') },
      description: { en: `Topic page for ${levelKey} worksheets.` },
      subject: 'mixed',
      ageRange: LEVEL_TO_AGE_RANGE[levelKey] ?? '5-7',
      language: 'en',
      curriculumTags: [],
      parentSlug: null,
      isHighPriority: false,
    });
  }

  return rows;
}

module.exports = { generateTopics };
