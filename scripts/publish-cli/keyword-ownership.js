'use strict';

/**
 * keyword-ownership.js — shared loader + collision helpers for the per-page
 * primary-keyword ownership map (docs/audit-results/keyword-ownership-map.json).
 *
 * The map guarantees that no two pages in the same locale target the same
 * primary keyword (anti-cannibalization), mirroring the DB-level
 * @@unique([language, titleHash]) discipline on deck pages. Built by
 * build-keyword-ownership-map.js; consumed by build-time validation and (in
 * Phase 5) the reconcileThinPage gate predicate.
 *
 * pageKey convention: "<locale>|<pageType>|<axisKey>"
 *   - topic-single        axisKey = "<axis>:<key>"   (e.g. "exercise-type:addition")
 *   - topic-intersection  axisKey = "<key1>__<key2>" (alpha-sorted)
 *   - activity            axisKey = "<engine>:<id>"
 *   - hub                 axisKey = "worksheets" | "topic" | "activities"
 *
 * Read-only / pure (loadOwnershipMap does a single fs.readFileSync).
 */

var fs = require('fs');

function loadOwnershipMap(filePath) {
  var raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

// Normalize a keyword for collision comparison: trim, lowercase, collapse
// internal whitespace. Matches the sha1Normalized normalization used for
// deck title/description hashing so the two stay conceptually aligned.
function normalizeKeyword(kw) {
  return String(kw || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * detectPrimaryCollisions(map) -> [{ locale, primaryKeyword, pageKeys: [...] }]
 * A collision is ≥2 pages in the SAME locale sharing a normalized primary.
 */
function detectPrimaryCollisions(map) {
  var byLocale = {}; // locale -> normPrimary -> [pageKey]
  var pages = (map && map.pages) || {};
  Object.keys(pages).forEach(function (pageKey) {
    var p = pages[pageKey];
    if (!p || !p.primaryKeyword) return;
    var loc = p.locale;
    var norm = normalizeKeyword(p.primaryKeyword);
    if (!norm) return;
    byLocale[loc] = byLocale[loc] || {};
    byLocale[loc][norm] = byLocale[loc][norm] || { primaryKeyword: p.primaryKeyword, pageKeys: [] };
    byLocale[loc][norm].pageKeys.push(pageKey);
  });
  var collisions = [];
  Object.keys(byLocale).forEach(function (loc) {
    Object.keys(byLocale[loc]).forEach(function (norm) {
      var entry = byLocale[loc][norm];
      if (entry.pageKeys.length >= 2) {
        collisions.push({ locale: loc, primaryKeyword: entry.primaryKeyword, pageKeys: entry.pageKeys });
      }
    });
  });
  return collisions;
}

function lookupOwnership(map, pageKey) {
  var pages = (map && map.pages) || {};
  var p = pages[pageKey];
  if (!p) return null;
  return { primaryKeyword: p.primaryKeyword, secondaryKeywords: p.secondaryKeywords || [] };
}

/**
 * isPrimaryTaken(map, locale, primaryKeyword, exceptPageKey)
 * -> conflicting pageKey | null
 * Returns the pageKey already owning this normalized primary in the locale
 * (excluding exceptPageKey), or null if free.
 */
function isPrimaryTaken(map, locale, primaryKeyword, exceptPageKey) {
  var norm = normalizeKeyword(primaryKeyword);
  if (!norm) return null;
  var pages = (map && map.pages) || {};
  var hit = null;
  Object.keys(pages).forEach(function (pageKey) {
    if (hit) return;
    if (pageKey === exceptPageKey) return;
    var p = pages[pageKey];
    if (!p || p.locale !== locale || !p.primaryKeyword) return;
    if (normalizeKeyword(p.primaryKeyword) === norm) hit = pageKey;
  });
  return hit;
}

module.exports = {
  loadOwnershipMap: loadOwnershipMap,
  normalizeKeyword: normalizeKeyword,
  detectPrimaryCollisions: detectPrimaryCollisions,
  lookupOwnership: lookupOwnership,
  isPrimaryTaken: isPrimaryTaken,
};
