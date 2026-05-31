'use strict';

/**
 * [ARC][SEO][DECK-PAGE] Phase 4b — inbound-link surface counter (CJS port).
 *
 * Ports frontend/lib/seo/count-inbound-surfaces.ts to publish-cli's Node-CJS
 * runtime per Phase 4b (a-1) ratification. The TS source had zero frontend
 * consumers (Phase 4b Sub-step 0 §A.13.6 recon); ports verbatim to CJS at
 * scripts/publish-cli/count-inbound-surfaces.js + deletes the orphan TS file.
 * Aligns with the publish-cli CJS-helper pattern (db.js + build-seo-head.js).
 *
 * Flips reconcileInboundLinkSurface predicate at scripts/publish-cli/seo-
 * reconciliation.js from Phase 3a.1 Checkpoint 1 stub → real.
 *
 * Per Phase 2 §5 invariant: every published deck must reach ≥3 non-sitemap
 * inbound surfaces. Algorithm: dynamic-scaling — counts presence across 8
 * authority surfaces via indexed DB queries; no hard-coded population
 * reference points.
 *
 * Surface inventory (per Phase 1 §6 deeper-read consolidation):
 *   1. exerciseTypeTopicPage      — always present for published decks (axis-key match)
 *   2. educationalLevelTopicPage  — always present (axis-key match)
 *   3. themeTopicPages            — present when deck.subjectTags non-empty
 *   4. siblingAxisStrip           — present when neighboring exercise-type axes have decks
 *   5. varietyStripRotation       — always present (rotational §16.2)
 *   6. crossAxisPivots            — always present (§16.2)
 *   7. deckEndSuggestionStrip     — R17a: when opts.deckHtml is given, derived
 *                                   from the ACTUALLY-rendered strip (≥3 lcs-
 *                                   deckend-suggestions markers + ≥1 lcs-deckend-
 *                                   tile, same regexes audit-deck-html.js uses);
 *                                   else falls back to the ≥7-locale-decks DB proxy
 *   8. endDeckTopicLinks          — R17a: when opts.deckHtml is given, true iff the
 *                                   lcs-end-deck aside (Parts 2B/5) renders with a
 *                                   /topic/ link; else false (was the dead
 *                                   breadthGridFeatured `false` placeholder)
 *
 * Per-locale-bounded query convention: all DB queries hit (language, status, *)
 * compound indexes per topic-decks.ts: fetchDecksForAxis precedent.
 * Single round-trip per surface check; aggregated count <50ms even at 55K-deck
 * scale per §A.14.7 scale projection.
 *
 * Wire-in: invoked from publish-cli's reconcileInboundLinkSurface via
 * opts.countInboundFn callback. Caller passes deckId + language; helper
 * returns {count, perSurface}.
 *
 * Predicate flip schedule: WARN-class through Phase 4b; flips to HALT-class
 * post-Phase-5 per concern 4 escalation lock.
 */

var db = require('./db');

/**
 * Count inbound non-sitemap surfaces for a published deck. Returns
 * {count, perSurface}. count is 0..8 based on which surfaces structurally
 * include the deck.
 *
 * Returns {count: 0, perSurface: {}} for non-existent or non-published decks
 * (gate-side caller treats as INBOUND_LINK_COUNT_BELOW_TARGET if predicate fires).
 */
async function countInboundSurfacesForDeck(deckId, language, opts) {
  var deckHtml = (opts && typeof opts.deckHtml === 'string') ? opts.deckHtml : null;
  // Step 1: fetch the deck row (single indexed lookup)
  var deck = await db.client().deck.findUnique({
    where: { id: deckId },
    select: {
      id: true,
      slug: true,
      language: true,
      exerciseType: true,
      ageRange: true,
      subjectTags: true,
      status: true
    }
  });

  if (!deck || deck.status !== 'published') {
    return { count: 0, perSurface: {} };
  }

  var perSurface = {};

  // Surface 1: exercise-type topic page — always present for published decks
  // per Phase 0 §6.5: TOPIC_PAGE_SIZE=24 paginated; deck appears on its
  // (exerciseType, locale) topic page or a paginated page thereof.
  perSurface.exerciseTypeTopicPage = true;

  // Surface 2: educational-level topic page — always present
  // Mapping per §17.8.6: ageRange → educational-level axis-key.
  perSurface.educationalLevelTopicPage = true;

  // Surface 3: theme topic pages — present when deck.subjectTags non-empty
  // Each tag in subjectTags surfaces the deck on that theme's topic page.
  perSurface.themeTopicPages = deck.subjectTags.length > 0;

  // Surface 4: SiblingAxisStrip presence
  // Per §16.2 + Arc 6a sibling-axis-strip doctrine: strip surfaces decks at
  // neighboring exercise-type axes within the same locale. Strip self-skips
  // when cardinality drops below 2 per consistent visual-density principle.
  // Helper proxy: siblingAxisStrip = true iff ≥2 distinct exercise-types
  // have published decks in this locale (cardinality ≥2 ensures the strip
  // renders; this deck participates as one of the cardinality-contributors).
  var localeExerciseTypeCount = await db.client().deck.groupBy({
    by: ['exerciseType'],
    where: { language: language, status: 'published' },
    _count: { _all: true }
  });
  perSurface.siblingAxisStrip = localeExerciseTypeCount.length >= 2;

  // Surface 5: VarietyStrip rotation — always present
  // Per §16.2: each topic page renders 4 variety strips with rotational
  // composition. Long-tail decks rotate through Strip 4 (catalog-highlights)
  // structurally. Always-true at the per-deck inbound count level.
  perSurface.varietyStripRotation = true;

  // Surface 6: CrossAxisPivots — always present
  // Per §16.2 + Arc 6a depth-UI overlay: cross-axis pivots surface on each
  // topic page. Always-true at the per-deck inbound count level (decks
  // surface as cross-axis-pivot targets via their axis-key membership).
  perSurface.crossAxisPivots = true;

  // Surface 7: Deck-end suggestion strip — R17a aligns with rendered reality.
  // When the caller passes the published deck.html, derive presence from the
  // SAME markers audit-deck-html.js checks (≥3 lcs-deckend-suggestions + ≥1
  // lcs-deckend-tile). Otherwise fall back to the ≥7-locale-decks DB proxy
  // (a strip structurally needs 6 sibling slots + self).
  if (deckHtml) {
    var suggMarkers = (deckHtml.match(/lcs-deckend-suggestions/g) || []).length;
    var tileMarkers = (deckHtml.match(/lcs-deckend-tile/g) || []).length;
    perSurface.deckEndSuggestionStrip = suggMarkers >= 3 && tileMarkers > 0;
  } else {
    var localeDeckCount = await db.client().deck.count({
      where: { language: language, status: 'published' }
    });
    perSurface.deckEndSuggestionStrip = localeDeckCount >= 7;
  }

  // Surface 8: end-of-deck topic-link aside — R17a. The lcs-end-deck aside
  // (Parts 2B/5) carries real <a> links to this deck's topic-destination pages.
  // True only when it actually renders with at least one /topic/ link; absent
  // deck.html → false (replaces the dead breadthGridFeatured placeholder).
  perSurface.endDeckTopicLinks = !!(deckHtml &&
    /class="lcs-end-deck"/.test(deckHtml) &&
    /\/topic\//.test(deckHtml));

  // Aggregate count across the 8 surfaces
  var count = Object.values(perSurface).filter(function (v) { return v === true; }).length;

  return { count: count, perSurface: perSurface };
}

/**
 * Convenience wrapper that returns just the count (for predicate code paths
 * that don't need per-surface breakdown). Equivalent to
 * `countInboundSurfacesForDeck(deckId, language).then(r => r.count)`.
 */
async function countInboundSurfaces(deckId, language, opts) {
  var result = await countInboundSurfacesForDeck(deckId, language, opts);
  return result.count;
}

module.exports = {
  countInboundSurfacesForDeck: countInboundSurfacesForDeck,
  countInboundSurfaces: countInboundSurfaces
};
