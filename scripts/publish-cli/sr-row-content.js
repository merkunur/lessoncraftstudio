/**
 * Per-deck content for the screen-reader question rows.
 *
 * WHAT THIS FIXES. Five exercise types emit one sentence per exercise that says nothing about
 * the exercise — "Question 1: Add the picture values together and write the total." five times
 * over. A screen-reader user learns the exercise TYPE and nothing else, and the pages of a type
 * end up near-identical to one another.
 *
 * Simulated on 30 real decks per type before any of this was written, replacing the repeated
 * rows with these and re-measuring whole-page similarity:
 *
 *   pattern-train   0.828 -> 0.624   96% of pairs at or above 0.80 -> 0%
 *   code-addition   0.807 -> 0.509   64% -> 0%
 *   big-small       0.848 -> 0.533   95% -> 0%
 *   picture-sort    0.782 -> 0.478   26% -> 0%
 *   word-guess      0.827 -> 0.722   91% -> 2%
 *
 * TWO TYPES WERE DROPPED ON EVIDENCE, not skipped for convenience:
 *
 *   grid-match   Its grid is ONE picture cut into tiles. The tiles are referenced by number,
 *                `imageRefs` is empty and `paletteReveals` carries base64 rather than a
 *                filename — there is no image identity anywhere in the deck. A simulation
 *                that mapped `images_used` onto rows positionally scored 0.310, but it was
 *                inventing the mapping, so that number is meaningless and the type is out.
 *   odd-one-out  Naming a row's pictures reveals which one is unique. Structure alone
 *                ("Row 1: four pictures") barely moves it: 0.852 -> 0.820, still 88% failing.
 *
 * NOTHING HERE PRINTS AN ANSWER. Per type: code-addition's sums live in the key and are never
 * quoted; picture-sort's `correctCategory` is not named; pattern-train's `fullSequence` — the
 * rule the child must infer — is never stated, only which pictures the train uses;
 * word-guess names neither the word nor the pictured object, only how many letters it has;
 * big-small's `order` is not quoted.
 */
'use strict';

var V = require('./teaching-vocab.js');
var T = require('./sr-row-templates.js');

/** "A, B and C" using the locale's own final conjunction. */
var CONJUNCTION = {
  en: ' and ', de: ' und ', nl: ' en ', fr: ' et ', es: ' y ', it: ' e ',
  pt: ' e ', sv: ' och ', da: ' og ', no: ' og ', fi: ' ja ',
};
function joinNames(a, locale) {
  if (!a.length) return '';
  if (a.length === 1) return a[0];
  return a.slice(0, -1).join(', ') + (CONJUNCTION[locale] || ' & ') + a[a.length - 1];
}

function clean(n) { return String(n || '').replace(/\s+\d+$/, '').trim(); }

function dedupe(a) {
  var seen = {};
  return a.filter(function (x) {
    if (!x) return false;
    var k = x.toLowerCase();
    if (seen[k]) return false;
    seen[k] = true;
    return true;
  });
}

/**
 * `<existing row> <Label>: A, B and C.` — the existing sentence is reused, not rewritten.
 *
 * The base row is read back out of the live page, so on a second run it ALREADY ENDS with a
 * picture label. Any existing one is stripped before the new one is appended; without that the
 * rows grew a second copy every run ("... Bilder: Grill. Bilder: Grill."), which is exactly
 * what the idempotency check caught on 522 pages.
 */
function withPictures(baseRow, names, locale) {
  var t = T[locale];
  var label = t && t.srPicturesLabel;
  if (!label || !names.length) return null;
  var stem = String(baseRow);
  var at = stem.indexOf(' ' + label + ':');
  if (at !== -1) stem = stem.slice(0, at);
  return stem + ' ' + label + ': ' + joinNames(names, locale) + '.';
}

/* ------------------------------------------------------------------ builders */

/**
 * Each row adds three pictures together. `exercises[i]` IS that row's image list, with names
 * already in the deck's language, so the row can name exactly what is in it.
 */
function codeAddition(manifest, locale, baseRows) {
  var ex = manifest.exercises || [];
  if (!ex.length || ex.length !== baseRows.length) return null;
  var out = [];
  for (var i = 0; i < ex.length; i++) {
    if (!Array.isArray(ex[i])) return null;
    var names = dedupe(ex[i].map(function (img) { return clean(img && (img.name || img.word)); }));
    var row = withPictures(baseRows[i], names, locale);
    if (!row) return null;
    out.push(row);
  }
  return out;
}

/**
 * One row per picture in the pile. This type currently emits NO rows at all, so its whole
 * per-deck description is new.
 */
function pictureSort(manifest, locale) {
  var t = T[locale];
  if (!t || !t.srRowPictureSort) return null;
  var ex = manifest.exercises || [];
  if (!ex.length) return null;
  var out = [];
  for (var i = 0; i < ex.length; i++) {
    var name = clean(ex[i] && ex[i].name);
    if (!name) return null;              // a nameless item would make the row a lie
    out.push(t.srRowPictureSort.replace(/\{n\}/g, String(i + 1)).replace(/\{name\}/g, name));
  }
  return out;
}

/**
 * The train repeats a pattern of two or three pictures. Naming the PICTURES is safe — they are
 * printed in the filled wagons. Naming the SEQUENCE is not: that is the rule the child has to
 * work out, and it sits in `fullSequence` and the bundle's per-cell `expectedNumber`.
 */
function patternTrain(manifest, locale, baseRows) {
  var e = (manifest.exercises || [])[0];
  if (!e || !e.elementToImage) return null;
  var names = dedupe(Object.keys(e.elementToImage).sort().map(function (k) {
    return clean(e.elementToImage[k] && (e.elementToImage[k].name || e.elementToImage[k].word));
  }));
  if (!names.length) return null;
  var out = [];
  for (var i = 0; i < baseRows.length; i++) {
    var row = withPictures(baseRows[i], names, locale);
    if (!row) return null;
    out.push(row);
  }
  return out;
}

/* word-guess is DROPPED, and the reason is worth keeping.
 *
 * The plan had it at 0.827 -> 0.722 on the strength of "the letter count is not the answer and
 * varies per row". Both halves of the sourcing turned out to be wrong:
 *
 *   manifest.vocabulary is SPACE-SPLIT TOKENS, not words — ten entries for eight problems,
 *   because "Pommes Frites" and "Onkel Sam" each count twice. `vocabulary[i]` is therefore not
 *   problem i's word, and the simulated 0.722 was built on that wrong mapping.
 *
 *   The bundle's letter slots are only the BLANK positions and are non-contiguous
 *   (problem 0: [1,2,4]), so they give a lower bound on the word's length, not its length.
 *
 * A letter count that is quietly wrong is worse than no letter count, so the type is out until
 * a real source appears. The srWordLength strings stay in the templates for that day. */

/**
 * Each problem shows the SAME object at three sizes, so the object can be named per row.
 *
 * The correspondence is not in the manifest — it is in the bundle's `imagePlacements`, three
 * consecutive entries per problem sharing one image key. That was verified across 40 decks
 * (40/40 hold) with a negative control that rejects a perturbed order, because naming the
 * wrong object in a row would be worse than naming none.
 */
function bigSmall(manifest, locale, baseRows, bundle) {
  if (!bundle) return null;
  var per = bundle.imagesPerProblem || 0;
  var ip = bundle.imagePlacements || [];
  var nEx = (manifest.exercises || []).length;
  if (!per || !ip.length || ip.length !== per * nEx || nEx !== baseRows.length) return null;

  var out = [];
  var resolved = 0;
  for (var i = 0; i < nEx; i++) {
    var group = ip.slice(i * per, (i + 1) * per).map(function (p) { return p.key; });
    var uniq = {};
    group.forEach(function (k) { uniq[k] = true; });
    if (Object.keys(uniq).length !== 1) return null;      // the assumption does not hold here
    /* A picture the image library cannot name leaves that row exactly as it is today, rather
     * than forfeiting the whole deck. One missing key — `hotdog` is absent from the library,
     * `hot-dog` is not — was costing every deck that used it, and a row without the label is
     * still a correct row. */
    var name = clean(V.localizedNoun(group[0], locale));
    var row = name ? withPictures(baseRows[i], [name], locale) : null;
    out.push(row || baseRows[i]);
    if (row) resolved++;
  }
  // Nothing resolved means nothing was added; leave the deck alone.
  return resolved ? out : null;
}

var BUILDERS = {
  'code-addition': codeAddition,
  'picture-sort': pictureSort,
  'pattern-train': patternTrain,
  'big-small': bigSmall,
};

/**
 * Enriched rows for this deck, or null.
 *
 * Null is the normal answer for anything unsupported and for any deck whose data does not hold
 * up — the existing rows are then left exactly as they are. Every builder returns all-or-
 * nothing: a page with three enriched rows and two generic ones would be worse than either.
 */
function enrichedRows(type, manifest, locale, baseRows, bundle) {
  var fn = BUILDERS[type];
  if (!fn) return null;
  try { return fn(manifest, locale, baseRows || [], bundle) || null; } catch (e) { return null; }
}

module.exports = { enrichedRows: enrichedRows, TYPES: Object.keys(BUILDERS), joinNames: joinNames };
