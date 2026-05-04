// Synthetic LessonPlan row factory.
//
// Generates ~50 LessonPlan rows (in-flight cap per Pillar 1 launch state;
// 156 is the Path A target). Each row tied to an existing Topic.slug via FK.
// Distribution: locale-balanced across 4 launched-Tier locales (en/de/es/nl)
// matching Pillar 1 production cadence at the cooperation-pattern Phase 1c-e
// authoring milestone.

const PILLAR_1_LOCALES = ['en', 'de', 'es', 'nl'];

/**
 * Generates synthetic LessonPlan rows. Selects axis-keys from `topicSlugs` array
 * (must reference Topic.slug PKs that exist in the DB).
 *
 * @param {string[]} topicSlugs — existing Topic.slug values (FK targets)
 * @param {number} target — total LessonPlan count to generate (default 50)
 * @param {() => number} rand — seeded RNG
 * @returns {Array<object>} ready for prisma.lessonPlan.createMany
 */
function generateLessonPlans(topicSlugs, target, rand) {
  const rows = [];
  const seen = new Set(); // (topicSlug, language) tuples — enforces @@unique
  let attempts = 0;
  const maxAttempts = target * 10;

  while (rows.length < target && attempts < maxAttempts) {
    attempts += 1;
    const slug = topicSlugs[Math.floor(rand() * topicSlugs.length)];
    const language = PILLAR_1_LOCALES[Math.floor(rand() * PILLAR_1_LOCALES.length)];
    const key = `${slug}|${language}`;
    if (seen.has(key)) continue;
    seen.add(key);

    rows.push({
      topicSlug: slug,
      language,
      durationMinutes: 30 + Math.floor(rand() * 16), // 30-45 min realistic K-3 plan
      structure: {
        warmup: { duration: 4, body: 'Synthetic warmup content for load-test.' },
        contentActivity: { duration: 12, body: 'Synthetic content-language activity body.' },
        scaffold: { duration: 9, body: 'Synthetic language-scaffold body.' },
        closure: { duration: 5, body: 'Synthetic closure body.' },
      },
      recommendedDeckIds: [],
      recommendedPdfDeckIds: [],
      generatedBy: 'synth-loadtest',
      generationVersion: 1,
    });
  }

  return rows;
}

module.exports = { generateLessonPlans, PILLAR_1_LOCALES };
