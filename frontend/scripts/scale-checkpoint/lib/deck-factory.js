// Synthetic Deck row factory.
//
// Generates rows that pass schema constraints (Deck.@@unique([language, slug])
// + non-null required fields). Distribution shape per lib/distribution.js.

const {
  ALL_LOCALES,
  APPS,
  THEME_KEYS,
  THEME_WEIGHTS,
  AGE_RANGE_WEIGHTS,
  LOCALE_WEIGHTS,
  weightedPick,
} = require('./distribution');

const SYNTH_USER_ID = 'synth-loadtest-operator';

/**
 * Generates an array of N synthetic Deck rows ready for prisma.deck.createMany.
 *
 * Each row passes schema constraints:
 * - Unique (language, slug) via per-locale slug counter
 * - Non-null required fields (htmlUrl, pdfUrl, thumbnailUrl, manifestUrl, title, description, ageRange, status, createdBy)
 * - Realistic JSONB content (small but representative)
 * - subjectTags from registered theme axis-key set OR empty for themeless
 * - publishedAt distributed across the past 18 months (representative production timeline)
 *
 * @param {number} target — total deck count to generate
 * @param {() => number} rand — seeded RNG
 * @returns {Array<object>} — Deck row data ready for createMany
 */
function generateDecks(target, rand) {
  const rows = [];
  const slugCounters = new Map(); // (language, exerciseType, theme) → counter

  // publishedAt range: past 18 months
  const now = Date.now();
  const eighteenMonthsAgo = now - 18 * 30 * 24 * 3600 * 1000;
  function randomPublishedAt() {
    return new Date(eighteenMonthsAgo + rand() * (now - eighteenMonthsAgo));
  }

  for (let i = 0; i < target; i++) {
    const language = weightedPick(LOCALE_WEIGHTS, rand);
    const app = APPS[Math.floor(rand() * APPS.length)];
    const themeKey = weightedPick(THEME_WEIGHTS, rand);
    const isThemed = themeKey !== '__themeless__';
    const ageRange = weightedPick(AGE_RANGE_WEIGHTS, rand);

    const slugBase = `synth-${app.exerciseType}-${isThemed ? themeKey : 'themeless'}`;
    const counterKey = `${language}|${slugBase}`;
    const counter = (slugCounters.get(counterKey) ?? 0) + 1;
    slugCounters.set(counterKey, counter);
    const slug = `${slugBase}-${counter}`;

    rows.push({
      slug,
      title: { [language]: `Synthetic ${app.exerciseType} ${counter}` },
      description: {
        [language]: `Synthetic ${app.exerciseType} deck for load-test purposes. Theme: ${isThemed ? themeKey : 'none'}. Age range: ${ageRange}.`,
      },
      exerciseType: app.exerciseType,
      exerciseMode: null,
      language,
      subjectTags: isThemed ? [themeKey] : [],
      topicSlugs: [],
      ageRange,
      htmlUrl: `/decks/${language}/${slug}-v1/deck.html`,
      pdfUrl: `/decks/${language}/${slug}-v1/printable.pdf`,
      answerKeyUrl: `/decks/${language}/${slug}-v1/answer-key.pdf`,
      thumbnailUrl: `/decks/${language}/${slug}-v1/thumbnail.png`,
      manifestUrl: `/decks/${language}/${slug}-v1/manifest.json`,
      publishedAt: randomPublishedAt(),
      status: 'published',
      createdBy: SYNTH_USER_ID,
      version: 1,
      contentFamilyId: null,
    });
  }

  return rows;
}

module.exports = { generateDecks, SYNTH_USER_ID };
