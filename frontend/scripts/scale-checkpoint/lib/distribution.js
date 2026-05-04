// Distribution model for synthetic catalog generation.
//
// Maps the operator's stated 55K-deck target shape onto weighted
// distributions across 11 locales × 29 exercise-types × theme axis-keys
// × 5 educational-level age-ranges. Derived from current 291-deck shape
// per Phase 1 inventory + projected to 55K.

const path = require('path');
const taxonomy = require(path.join(__dirname, '..', '..', '..', 'config', 'topics-taxonomy.json'));

const ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

// 29 §14.10 canonical apps + their per-app config (default_subject, default_age_range,
// exercise_type_axis_key). Drives Deck.exerciseType + Deck.ageRange assignment.
const APPS = Object.entries(taxonomy.apps).map(([appName, cfg]) => ({
  appName,
  exerciseType: cfg.exercise_type_axis_key,
  defaultSubject: cfg.default_subject,
  defaultAgeRange: cfg.default_age_range,
}));

// 100 theme axis-keys + themeless. Theme weights modeled to match operator's
// stated heavy-publishing patterns: animals dominates (current catalog state),
// vehicles/food/fruits secondary, long-tail at low share.
const THEME_KEYS = Object.keys(taxonomy.axes.theme);

function buildThemeWeights() {
  const heavy = {
    animals: 0.25,
    vehicles: 0.10,
    food: 0.08,
    fruits: 0.06,
  };
  const heavySum = Object.values(heavy).reduce((a, b) => a + b, 0); // 0.49
  const themedTotal = 0.70; // 70% themed / 30% themeless
  const longTailTotal = themedTotal - heavySum * themedTotal; // ~36.7% across long-tail
  // Long-tail = themes other than the 4 heavy ones; spread evenly.
  const longTailThemes = THEME_KEYS.filter(k => !(k in heavy));
  const longTailEach = longTailTotal / longTailThemes.length;

  const weights = new Map();
  for (const [k, w] of Object.entries(heavy)) {
    weights.set(k, w * themedTotal);
  }
  for (const k of longTailThemes) {
    weights.set(k, longTailEach);
  }
  weights.set('__themeless__', 1 - themedTotal);
  return weights;
}

const THEME_WEIGHTS = buildThemeWeights();

// Age-range distribution per §17.8.6. K-3 audience naturally peaks at kindergarten.
// grade-3 (8-10) defined-but-near-empty per Pass 7a corpus ceiling note.
const AGE_RANGE_WEIGHTS = new Map([
  ['3-5', 0.15],   // preschool
  ['5-7', 0.50],   // kindergarten (dominant)
  ['6-8', 0.20],   // grade-1
  ['7-9', 0.12],   // grade-2
  ['8-10', 0.03],  // grade-3 (corpus ceiling; rare)
]);

// Locale distribution. Even split across 11 locales = 1/11 each. Adjustable.
function buildLocaleWeights() {
  const m = new Map();
  for (const loc of ALL_LOCALES) m.set(loc, 1 / ALL_LOCALES.length);
  return m;
}

const LOCALE_WEIGHTS = buildLocaleWeights();

/**
 * Weighted-random pick from a Map<key, weight>. Weights need not sum to 1.
 */
function weightedPick(weightsMap, rand = Math.random) {
  const total = Array.from(weightsMap.values()).reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (const [k, w] of weightsMap) {
    r -= w;
    if (r <= 0) return k;
  }
  // Fallback for floating-point drift — return last key
  let lastKey;
  for (const k of weightsMap.keys()) lastKey = k;
  return lastKey;
}

/**
 * Deterministic seeded RNG. Mulberry32 algorithm. Stable across runs given
 * the same seed — important for reproducible synthetic datasets and EXPLAIN
 * comparison across checkpoint runs.
 */
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6D2B79F5) >>> 0;
    let s = Math.imul(t ^ (t >>> 15), 1 | t);
    s = (s + Math.imul(s ^ (s >>> 7), 61 | s)) ^ s;
    return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
  };
}

module.exports = {
  ALL_LOCALES,
  APPS,
  THEME_KEYS,
  THEME_WEIGHTS,
  AGE_RANGE_WEIGHTS,
  LOCALE_WEIGHTS,
  weightedPick,
  mulberry32,
};
