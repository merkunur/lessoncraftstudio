// Synthetic Bundle / BundleDeck / BundleLessonPlan factory.
//
// Generates ~7 Bundle rows (in-flight Pillar 2 cap; 14-bundle full launch).
// Each Bundle:
//  - tied to a theme axis-key via Bundle.themeAxisKey (soft FK)
//  - 1 locale per Bundle row per @@unique([themeAxisKey, language])
//  - holds 5-15 BundleDeck join rows referencing real Deck.id from synth set
//  - holds 1 BundleLessonPlan join row referencing a synth LessonPlan.id

const HEAVY_THEMES = ['animals', 'vehicles', 'food', 'fruits', 'shapes', 'colors', 'numbers'];

/**
 * Generates synthetic Bundle rows + BundleDeck + BundleLessonPlan join rows.
 *
 * @param {Array<{id: string, language: string, subjectTags: string[]}>} decks — already-inserted Deck rows
 * @param {Array<{id: string, topicSlug: string, language: string}>} lessonPlans — already-inserted LessonPlan rows
 * @param {number} target — Bundle count (default 7)
 * @param {() => number} rand — seeded RNG
 * @returns {{ bundles: Array, bundleDecks: Array, bundleLessonPlans: Array }}
 */
function generateBundles(decks, lessonPlans, target, rand) {
  const bundles = [];
  const bundleDecks = [];
  const bundleLessonPlans = [];
  const seen = new Set(); // (themeAxisKey, language) per @@unique

  // Group decks by (subjectTag, language) for efficient theme-matched picking
  const decksByThemeLocale = new Map();
  for (const d of decks) {
    if (!d.subjectTags || d.subjectTags.length === 0) continue;
    const theme = d.subjectTags[0];
    const key = `${theme}|${d.language}`;
    if (!decksByThemeLocale.has(key)) decksByThemeLocale.set(key, []);
    decksByThemeLocale.get(key).push(d);
  }

  const lpByTopicLocale = new Map();
  for (const lp of lessonPlans) {
    const key = `${lp.topicSlug}|${lp.language}`;
    lpByTopicLocale.set(key, lp);
  }

  let attempts = 0;
  const maxAttempts = target * 5;

  while (bundles.length < target && attempts < maxAttempts) {
    attempts += 1;
    const theme = HEAVY_THEMES[Math.floor(rand() * HEAVY_THEMES.length)];
    const language = ['en', 'de'][Math.floor(rand() * 2)]; // Tier 1 locales
    const uniqueKey = `${theme}|${language}`;
    if (seen.has(uniqueKey)) continue;

    const themedDecks = decksByThemeLocale.get(uniqueKey) ?? [];
    if (themedDecks.length === 0) continue; // skip themes with no decks in this locale

    seen.add(uniqueKey);

    const bundleId = `synth-bundle-${theme}-${language}-${bundles.length + 1}`;
    const slug = `${theme}-bundle`;

    bundles.push({
      id: bundleId,
      slug,
      themeAxisKey: theme,
      language,
      title: { [language]: `Synthetic ${theme} Bundle` },
      description: { [language]: `Synthetic bundle for ${theme} theme load-test.` },
      thumbnailUrl: `/bundles/${language}/${slug}-v1/thumbnail.png`,
      status: 'published',
      publishedAt: new Date(Date.now() - Math.floor(rand() * 90 * 24 * 3600 * 1000)),
    });

    // Pick 5-15 decks from the themed pool
    const numDecks = 5 + Math.floor(rand() * 11);
    const pickedDecks = [...themedDecks]
      .sort(() => rand() - 0.5)
      .slice(0, Math.min(numDecks, themedDecks.length));
    pickedDecks.forEach((d, idx) => {
      bundleDecks.push({
        bundleId,
        deckId: d.id,
        position: idx + 1,
      });
    });

    // Tie the bundle's lesson plan: pick a LessonPlan in the same locale (any axis-key)
    const lpInLocale = lessonPlans.filter(lp => lp.language === language);
    if (lpInLocale.length > 0) {
      const lp = lpInLocale[Math.floor(rand() * lpInLocale.length)];
      bundleLessonPlans.push({
        bundleId,
        lessonPlanId: lp.id,
      });
    }
  }

  return { bundles, bundleDecks, bundleLessonPlans };
}

module.exports = { generateBundles };
