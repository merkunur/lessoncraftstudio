/**
 * Deck-end suggestion selection per Commission B Phase 2.
 *
 * Public API:
 *   warmUpIndices()                                                     — async; load all published decks into pre-computed indices once per batch
 *   selectDeckEndSuggestions(locale, completedDeckSlug, count = 6)      — async; returns up to N suggested deck metadata
 *   disconnect()                                                        — async; release Prisma client
 *
 * Architecture per Phase 1 recon §3:
 *   - Imports Prisma via scripts/publish-cli/db.js (same client publish-cli already uses).
 *   - Pre-computed indices loaded once per batch via warmUpIndices().
 *   - selectDeckEndSuggestions reads from warm indices; per-call O(1) plus 4-strategy iteration bounded by index size.
 *   - At 55K-deck scale: indices = ~27MB module state; per-call wall-time bounded.
 *
 * 4-strategy slot allocation per Commission B spec §"Slot count and distribution":
 *   - 2 slots: same-app, theme-variety (different subjectTag, same exerciseType + locale)
 *   - 2 slots: same-theme, app-variety (different exerciseType, same subjectTag + locale)
 *   - 1 slot: same-app difficulty-progression (different ageRange, same exerciseType + locale)
 *             OR cross-app complementary-skill (different exerciseType, same theme + ageRange)
 *   - 1 slot: random from same locale (pre-computed per-locale shuffled list with rotating cursor)
 *
 * Hard contracts:
 *   - Deduplication mandatory across slots. Same deck never appears twice.
 *   - Locale match hard-required. Never surface cross-locale decks.
 *   - Fallback chain: if a strategy yields zero candidates, fall through to next strategy.
 *   - Returns empty array if no published decks in locale (caller substitutes empty placeholders).
 */

'use strict';

var db = require('./db');

// Module-level cache. Set by warmUpIndices(); read by selectDeckEndSuggestions().
var _indices = null;

/**
 * Pre-computed indices structure:
 *   bySlug:        Map<`${language}/${slug}`, DeckMeta>      — completed-deck lookup
 *   byLocaleApp:   Map<`${language}/${exerciseType}`, DeckMeta[]>
 *   byLocaleTheme: Map<`${language}/${themeAxisKey}`, DeckMeta[]>
 *   byLocaleLevel: Map<`${language}/${ageRange}`, DeckMeta[]>
 *   byLocaleAll:   Map<language, DeckMeta[]>
 *   randomCursor:  Map<language, number>                     — rotating cursor for random-strategy slot
 *   randomSeq:     Map<language, DeckMeta[]>                 — pre-shuffled per-locale sequence
 *
 * DeckMeta shape:
 *   {
 *     id, slug, language, title, exerciseType, exerciseMode,
 *     subjectTags, ageRange, thumbnailUrl,
 *     canonicalURL  (computed: https://www.lessoncraftstudio.com/<lang>/decks/<slug>/)
 *   }
 */

var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';

function buildCanonicalURL(language, slug) {
  return CANONICAL_URL_BASE + '/' + language + '/decks/' + slug + '/';
}

function deckToMeta(deck) {
  return {
    id: deck.id,
    slug: deck.slug,
    language: deck.language,
    title: deck.title,
    exerciseType: deck.exerciseType,
    exerciseMode: deck.exerciseMode,
    subjectTags: deck.subjectTags || [],
    ageRange: deck.ageRange,
    thumbnailUrl: deck.thumbnailUrl,
    canonicalURL: buildCanonicalURL(deck.language, deck.slug),
  };
}

/**
 * Deterministic shuffle seeded by locale + day-of-week.
 * Day-of-week rotation per breadth-grid-selection.ts pattern.
 * Same-day callers get same shuffle order; cross-day rotates.
 */
function dayOfWeekRotation() {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % 7;
}

function seededShuffle(arr, seed) {
  // Fisher-Yates with deterministic LCG seeded from string.
  var s = 0;
  for (var i = 0; i < seed.length; i++) {
    s = ((s << 5) - s + seed.charCodeAt(i)) | 0;
  }
  // Make seed positive
  s = Math.abs(s) || 1;
  var result = arr.slice();
  for (var j = result.length - 1; j > 0; j--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    var k = s % (j + 1);
    var tmp = result[j];
    result[j] = result[k];
    result[k] = tmp;
  }
  return result;
}

/**
 * Load all published decks + build indices. Called once per publish-cli batch.
 *
 * Performance: 1 prisma.deck.findMany call returning ~55K rows max. Memory:
 * ~500 bytes/deck × 55K = ~27MB peak. Acceptable.
 *
 * Replaces per-call DB queries with module-level in-memory state. Per-call
 * cost in selectDeckEndSuggestions becomes O(log N) (Map lookups) plus
 * O(K) iteration over the candidate list returned (K bounded by 4-strategy
 * slot allocation = up to ~20 candidates examined per strategy).
 */
async function warmUpIndices() {
  var prisma = db.client();
  var allDecks = await prisma.deck.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      language: true,
      title: true,
      exerciseType: true,
      exerciseMode: true,
      subjectTags: true,
      ageRange: true,
      thumbnailUrl: true,
    },
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  });

  var bySlug = new Map();
  var byLocaleApp = new Map();
  var byLocaleTheme = new Map();
  var byLocaleLevel = new Map();
  var byLocaleAll = new Map();

  for (var i = 0; i < allDecks.length; i++) {
    var d = allDecks[i];
    var meta = deckToMeta(d);

    bySlug.set(d.language + '/' + d.slug, meta);

    var appKey = d.language + '/' + d.exerciseType;
    if (!byLocaleApp.has(appKey)) byLocaleApp.set(appKey, []);
    byLocaleApp.get(appKey).push(meta);

    for (var t = 0; t < (d.subjectTags || []).length; t++) {
      var themeKey = d.language + '/' + d.subjectTags[t];
      if (!byLocaleTheme.has(themeKey)) byLocaleTheme.set(themeKey, []);
      byLocaleTheme.get(themeKey).push(meta);
    }

    var levelKey = d.language + '/' + d.ageRange;
    if (!byLocaleLevel.has(levelKey)) byLocaleLevel.set(levelKey, []);
    byLocaleLevel.get(levelKey).push(meta);

    if (!byLocaleAll.has(d.language)) byLocaleAll.set(d.language, []);
    byLocaleAll.get(d.language).push(meta);
  }

  // Pre-shuffle per-locale lists for random-strategy slot.
  var randomSeq = new Map();
  var randomCursor = new Map();
  var rotation = String(dayOfWeekRotation());
  byLocaleAll.forEach(function (decks, lang) {
    randomSeq.set(lang, seededShuffle(decks, lang + ':' + rotation));
    randomCursor.set(lang, 0);
  });

  _indices = {
    bySlug: bySlug,
    byLocaleApp: byLocaleApp,
    byLocaleTheme: byLocaleTheme,
    byLocaleLevel: byLocaleLevel,
    byLocaleAll: byLocaleAll,
    randomSeq: randomSeq,
    randomCursor: randomCursor,
    deckCount: allDecks.length,
    warmedAt: new Date(),
  };

  return _indices;
}

function getIndices() {
  if (_indices === null) {
    throw new Error('deck-end-suggestions: warmUpIndices() must be called before selectDeckEndSuggestions().');
  }
  return _indices;
}

/**
 * Strategy 1: same-app, theme-variety (2 slots).
 * Same exerciseType + same locale, different subjectTags from completed deck.
 */
function pickSameAppThemeVariety(idx, completed, picked, count) {
  var picks = [];
  var key = completed.language + '/' + completed.exerciseType;
  var pool = idx.byLocaleApp.get(key) || [];
  var completedThemes = new Set(completed.subjectTags || []);
  for (var i = 0; i < pool.length && picks.length < count; i++) {
    var d = pool[i];
    if (d.id === completed.id) continue;
    if (picked.has(d.id)) continue;
    // Theme-variety: skip decks with overlapping subjectTags (require at least 1 different theme).
    var sharesAllThemes = (d.subjectTags || []).every(function (t) { return completedThemes.has(t); });
    if (sharesAllThemes && completedThemes.size > 0) continue;
    picks.push(d);
    picked.add(d.id);
  }
  return picks;
}

/**
 * Strategy 2: same-theme, app-variety (2 slots).
 * Same first-subjectTag + same locale, different exerciseType from completed deck.
 */
function pickSameThemeAppVariety(idx, completed, picked, count) {
  var picks = [];
  var themes = completed.subjectTags || [];
  if (themes.length === 0) return picks;
  var key = completed.language + '/' + themes[0];
  var pool = idx.byLocaleTheme.get(key) || [];
  for (var i = 0; i < pool.length && picks.length < count; i++) {
    var d = pool[i];
    if (d.id === completed.id) continue;
    if (picked.has(d.id)) continue;
    if (d.exerciseType === completed.exerciseType) continue;
    picks.push(d);
    picked.add(d.id);
  }
  return picks;
}

/**
 * Strategy 3: same-app difficulty-progression OR cross-app complementary-skill (1 slot).
 * Tries same exerciseType + different ageRange first; falls back to different exerciseType + same theme + same ageRange.
 */
function pickProgressionOrComplementary(idx, completed, picked) {
  // First try: same-app difficulty-progression.
  var appKey = completed.language + '/' + completed.exerciseType;
  var appPool = idx.byLocaleApp.get(appKey) || [];
  for (var i = 0; i < appPool.length; i++) {
    var d = appPool[i];
    if (d.id === completed.id) continue;
    if (picked.has(d.id)) continue;
    if (d.ageRange !== completed.ageRange) {
      picked.add(d.id);
      return d;
    }
  }
  // Fallback: cross-app complementary-skill.
  var themes = completed.subjectTags || [];
  if (themes.length > 0) {
    var themeKey = completed.language + '/' + themes[0];
    var themePool = idx.byLocaleTheme.get(themeKey) || [];
    for (var j = 0; j < themePool.length; j++) {
      var d2 = themePool[j];
      if (d2.id === completed.id) continue;
      if (picked.has(d2.id)) continue;
      if (d2.exerciseType !== completed.exerciseType && d2.ageRange === completed.ageRange) {
        picked.add(d2.id);
        return d2;
      }
    }
  }
  return null;
}

/**
 * Strategy 4: random from same locale (1 slot).
 * Pre-computed per-locale shuffled sequence + rotating cursor.
 */
function pickRandomFromLocale(idx, completed, picked) {
  var seq = idx.randomSeq.get(completed.language);
  if (!seq || seq.length === 0) return null;
  var cursor = idx.randomCursor.get(completed.language) || 0;
  for (var attempt = 0; attempt < seq.length; attempt++) {
    var i = (cursor + attempt) % seq.length;
    var d = seq[i];
    if (d.id === completed.id) continue;
    if (picked.has(d.id)) continue;
    idx.randomCursor.set(completed.language, (i + 1) % seq.length);
    picked.add(d.id);
    return d;
  }
  return null;
}

/**
 * Final fallback: any deck from same locale not yet picked, regardless of strategy match.
 * Used when 4-strategy chain produces fewer than `count` slots.
 */
function pickAnyFromLocale(idx, completed, picked, count) {
  var picks = [];
  var pool = idx.byLocaleAll.get(completed.language) || [];
  for (var i = 0; i < pool.length && picks.length < count; i++) {
    var d = pool[i];
    if (d.id === completed.id) continue;
    if (picked.has(d.id)) continue;
    picks.push(d);
    picked.add(d.id);
  }
  return picks;
}

/**
 * Main entry point. Returns array of up to `count` DeckMeta objects.
 *
 * @param {string} locale - 2-letter ISO 639-1 locale code.
 * @param {string} completedDeckSlug - slug of the deck the kid just completed.
 * @param {number} count - desired number of suggestions (default 6).
 * @returns {Promise<Array<DeckMeta>>}
 */
async function selectDeckEndSuggestions(locale, completedDeckSlug, count) {
  if (count === undefined) count = 6;
  if (typeof locale !== 'string' || !locale) {
    throw new Error('selectDeckEndSuggestions: locale must be a non-empty string.');
  }
  if (typeof completedDeckSlug !== 'string' || !completedDeckSlug) {
    throw new Error('selectDeckEndSuggestions: completedDeckSlug must be a non-empty string.');
  }

  var idx = getIndices();
  var completedKey = locale + '/' + completedDeckSlug;
  var completed = idx.bySlug.get(completedKey);

  // If completed-deck is not in indices (e.g., publishing first deck of locale, or
  // edge case where the deck was archived between batches), return empty array.
  // Caller substitutes empty placeholders gracefully.
  if (!completed) {
    return [];
  }

  var picked = new Set();
  var results = [];

  // Strategy 1: same-app theme-variety (2 slots).
  var s1 = pickSameAppThemeVariety(idx, completed, picked, 2);
  results.push.apply(results, s1);

  // Strategy 2: same-theme app-variety (2 slots).
  var s2 = pickSameThemeAppVariety(idx, completed, picked, 2);
  results.push.apply(results, s2);

  // Strategy 3: progression OR complementary (1 slot).
  var s3 = pickProgressionOrComplementary(idx, completed, picked);
  if (s3) results.push(s3);

  // Strategy 4: random from locale (1 slot).
  var s4 = pickRandomFromLocale(idx, completed, picked);
  if (s4) results.push(s4);

  // Final fallback: pad with any decks from same locale if strategies underfilled.
  if (results.length < count) {
    var fillNeeded = count - results.length;
    var fill = pickAnyFromLocale(idx, completed, picked, fillNeeded);
    results.push.apply(results, fill);
  }

  return results.slice(0, count);
}

async function disconnect() {
  return db.disconnect();
}

// Reset indices cache. Used by tests.
function _resetIndices() {
  _indices = null;
}

// Allow tests to inject indices directly (bypass DB).
function _setIndicesForTest(indices) {
  _indices = indices;
}

module.exports = {
  warmUpIndices: warmUpIndices,
  selectDeckEndSuggestions: selectDeckEndSuggestions,
  disconnect: disconnect,
  buildCanonicalURL: buildCanonicalURL,
  // Test-only:
  _resetIndices: _resetIndices,
  _setIndicesForTest: _setIndicesForTest,
};
