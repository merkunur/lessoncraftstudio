#!/usr/bin/env node
/**
 * Read what a worksheet actually teaches, out of its own manifest.
 *
 * WHY THIS EXISTS
 * A deck page carries ~130 visible words, of which the only "content" is screen-reader text
 * reading "Frage 1: 4 + 4 Leerzeichen." Nothing tells a teacher what skill the sheet
 * practises, what number range it stays inside, which year it suits, or how to use it in a
 * lesson — even though all of that is sitting in the manifest.
 *
 * The mistake this corrects: an earlier pass looked for image nouns, found none on
 * math-puzzle, and concluded the deck had "no data". It has nine operations with their
 * solutions. The teaching content was never in the nouns.
 *
 * WHAT IT REFUSES TO DO
 * Nothing here is inferred, rounded or assumed. Every field traces to a value in the
 * manifest, because a page that misstates its own level or contents is worse than a page
 * that says nothing — a teacher who prints it for the wrong year has wasted their prep time
 * on our promise.
 *
 * In particular the GRADE IS MEASURED, never taken from the tag. §22.1 doctrine: a
 * generated quantity, not the mechanic, sets the band, and measuring it caught 71
 * mis-graded coordinates that the tag, the ledger and the similarity gate all missed.
 * Where measured and tagged disagree, both are reported — this script never picks a winner.
 *
 * READ-ONLY. Writes nothing but its own output file.
 *
 * Usage:
 *   node derive-teaching-facts.js --locale=de --type=math-puzzle [--out=facts.json] [--limit=N]
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DECKS_ROOT = '/var/www/lcs-media/decks';
/* The generator's i18n bundles live in the repo, not beside the decks. Resolved from this
 * file's own location so the script works from a checkout as well as from the server. */
var REPO_ROOT = path.resolve(__dirname, '..', '..');

/* ---------------------------------------------------------------- operations */

/**
 * Parse one operation cell, e.g. {text: "18 - 9", solution: 9}.
 * Returns null for anything that is not a clean two-operand statement — a partial parse
 * would understate the range and could mis-grade the sheet.
 */
function parseOperation(op) {
  if (!op || typeof op.text !== 'string') return null;
  // normalise the unicode minus / times signs the generators emit
  var text = op.text.replace(/−/g, '-').replace(/×/g, '*').replace(/÷/g, '/');
  var m = text.match(/^\s*(\d+)\s*([+\-*/])\s*(\d+)\s*$/);
  if (!m) return null;
  var a = parseInt(m[1], 10);
  var b = parseInt(m[3], 10);
  var solution = (typeof op.solution === 'number') ? op.solution : null;
  return { a: a, b: b, operator: m[2], solution: solution, text: a + ' ' + m[2] + ' ' + b };
}

/**
 * Per-type adapters. Each worksheet family stores its arithmetic differently, and the mode
 * name in the manifest does not say what the child does — so the shape is read directly.
 *
 *   math-puzzle   exercises[].operations[].{text, solution}
 *   addition      exercises[].{operandA, operandB, image:{name}}
 *   subtraction   exercises[].{minuend, subtrahend, image:{name}}
 *
 * addition and subtraction differ from math-puzzle in a way that changes the copy, not just
 * the parsing: EVERY operation carries a depicted object (measured 1,374/1,374 and
 * 1,272/1,272), and every deck stays within 10 with no ten-crossing anywhere. So those decks
 * are described by their mode and their pictured objects, never by a crossing count.
 */
function collectOperations(manifest) {
  var out = [];
  var exercises = manifest.exercises || [];
  var type = manifest.exercise_type;

  for (var i = 0; i < exercises.length; i++) {
    var e = exercises[i];

    if (type === 'addition' && typeof e.operandA === 'number') {
      out.push({
        a: e.operandA, b: e.operandB, operator: '+',
        solution: e.operandA + e.operandB,
        text: e.operandA + ' + ' + e.operandB,
        noun: (e.image && e.image.name) || null,
      });
      continue;
    }

    if (type === 'subtraction' && typeof e.minuend === 'number') {
      out.push({
        a: e.minuend, b: e.subtrahend, operator: '-',
        solution: e.minuend - e.subtrahend,
        text: e.minuend + ' - ' + e.subtrahend,
        noun: (e.image && e.image.name) || null,
      });
      continue;
    }

    var ops = e.operations || [];
    for (var j = 0; j < ops.length; j++) {
      var p = parseOperation(ops[j]);
      if (p) out.push(p);
    }
  }
  return out;
}

/** The distinct objects pictured on this sheet, in sheet order, English library names. */
function collectDepictedNouns(ops) {
  var seen = {};
  var out = [];
  for (var i = 0; i < ops.length; i++) {
    var n = ops[i].noun;
    if (!n) continue;
    var k = String(n).toLowerCase();
    if (seen[k]) continue;
    seen[k] = true;
    out.push(n);
  }
  return out;
}

/* ------------------------------------------------------- math-worksheet family */

/**
 * Symbol substitution. Each picture stands for a number; the child works out which.
 *
 * WHAT IS PRINTED AND WHAT IS THE ANSWER — the distinction that governs this whole family.
 * The sheet shows the EQUATIONS with their results (`A + B = 6`), where A and B are pictures.
 * The slots are `slotType:"symbol"` and their `expected` is what each picture is worth. So:
 *
 *   equations + results   printed on the sheet  ->  quotable, and per-deck unique
 *   symbol values         the answer            ->  MUST NOT appear anywhere in the copy
 *
 * The values are carried in `answersDoNotPrint` so the verifier can assert their ABSENCE.
 * Nothing in the build path may read that field. (§17.8.9 answer-bearing-field hygiene.)
 *
 * MODE IS DERIVED, NOT READ. 404 decks are tagged `exercise_mode: null` while carrying two,
 * three or four symbols, and the three-symbol tag is worn by decks with two and four. The
 * symbol count is the honest mode, so it is measured from `symbolsUsed`.
 */
function deriveMathWorksheet(manifest) {
  var exercises = manifest.exercises || [];
  var symbols = {};        // letter -> picture name
  var values = {};         // letter -> value   (ANSWER-BEARING)
  var equations = [];      // rendered with picture names
  var results = [];
  var plus = 0, minus = 0;

  exercises.forEach(function (e) {
    var map = e.imageMap || {};
    Object.keys(map).forEach(function (letter) {
      var n = map[letter] && (map[letter].name || map[letter].word);
      if (n) symbols[letter] = String(n).replace(/\s+\d+$/, '');
    });
    var v = e.values || {};
    Object.keys(v).forEach(function (letter) { values[letter] = v[letter]; });

    (e.equations || []).forEach(function (eq) {
      if (!eq || typeof eq.expr !== 'string') return;
      if (eq.expr.indexOf('+') !== -1) plus++;
      if (eq.expr.indexOf('-') !== -1) minus++;
      // Substitute the picture name for its letter. A letter with no picture would make the
      // line meaningless to a reader, so the whole equation is dropped rather than half-named.
      var missing = false;
      var rendered = eq.expr.replace(/[A-Z]/g, function (L) {
        if (!symbols[L]) { missing = true; return L; }
        return symbols[L];
      });
      if (missing) return;
      if (typeof eq.result !== 'number') return;
      equations.push(rendered + ' = ' + eq.result);
      results.push(eq.result);
      /* Numeric LITERALS inside the expression count toward the band too. Many equations
       * mix pictures with plain numbers — `Grill + 13 = 14` — and 13 is on the page in front
       * of the child. §22.1's strict reading: "within N" governs operands AND results, so
       * reading only results would launder a within-20 sheet into a within-10 one. */
      (eq.expr.match(/\d+/g) || []).forEach(function (d) { results.push(parseInt(d, 10)); });
    });
  });

  var symbolCount = Object.keys(symbols).length;
  var maxResult = results.length ? Math.max.apply(null, results) : 0;
  var ceiling = maxResult <= 10 ? 10 : (maxResult <= 20 ? 20 : (maxResult <= 100 ? 100 : null));

  return {
    derivedMode: symbolCount === 2 ? 'two-symbols'
      : symbolCount === 3 ? 'three-symbols'
        : symbolCount === 4 ? 'four-symbols' : null,
    symbolCount: symbolCount,
    equationCount: equations.length,
    equations: equations,
    operators: { plus: plus, minus: minus },
    mixesOperations: plus > 0 && minus > 0,
    depictedNouns: Object.keys(symbols).sort().map(function (L) { return symbols[L]; }),
    band: results.length ? {
      maxSeen: maxResult,
      minSeen: Math.min.apply(null, results),
      ceiling: ceiling,
      impliedLevel: ceiling === 10 ? 'kindergarten'
        : ceiling === 20 ? 'grade-1' : ceiling === 100 ? 'grade-2' : 'above-k3',
    } : null,
    // ANSWER-BEARING — for the verifier's absence assertion only. Never read by the builder.
    answersDoNotPrint: { symbolValues: Object.keys(values).sort().map(function (L) { return values[L]; }) },
  };
}

/* ----------------------------------------------------------- more-less family */

/**
 * Two genuinely different mechanics ship under the single type name `more-less`, and the
 * field that is safe to print in one is the ANSWER in the other. This is the reason the
 * family gets its own adapter rather than a mode switch in the copy.
 *
 *   relation      Same object on BOTH sides — 384 of 384 sampled pairs — with a different
 *                 number of it each side, and the child writes >, < or =. Holding the object
 *                 constant is the pedagogical point: only the quantity differs, so the
 *                 comparison cannot be answered by looking at WHAT the things are.
 *                 The counts are printed on the sheet, so they may be quoted.
 *                 `rel` is the answer and may not.
 *
 *   check-cross   TWO DIFFERENT objects scattered together (~16 items), and the child counts
 *                 each kind and ticks the larger. Here the slots are `countA`/`countB`, so
 *                 THE COUNTS ARE THE ANSWER and must not be printed — the same numbers that
 *                 were quotable a paragraph ago.
 *
 * MODE IS DERIVED. Decks tagged `image-image` contain 396 image-to-number exercises and 100
 * check-cross ones, and one deck whose slug says image-image renders check-cross. The
 * per-exercise `comparisonMode` is the only truthful source.
 */
function deriveMoreLess(manifest, locale) {
  var vocab = require('./teaching-vocab.js');
  var exercises = manifest.exercises || [];
  var kinds = {};
  var pairs = [];            // printable: relation counts as the child sees them
  var relations = [];        // ANSWER-BEARING
  var crossCounts = [];      // ANSWER-BEARING (check-cross only)
  var totals = [];
  var sameObject = 0, differentObject = 0;
  var nouns = [];
  var seenNoun = {};

  function addNoun(p) {
    var n = vocab.localizedNoun(p, locale);
    if (!n) return;
    var k = n.toLowerCase();
    if (seenNoun[k]) return;
    seenNoun[k] = true;
    nouns.push(n);
  }

  exercises.forEach(function (e) {
    var cm = e.comparisonMode || 'unknown';
    kinds[cm] = (kinds[cm] || 0) + 1;

    if (cm === 'check-cross') {
      addNoun(e.imageA); addNoun(e.imageB);
      if (typeof e.countA === 'number') crossCounts.push(e.countA);
      if (typeof e.countB === 'number') crossCounts.push(e.countB);
      if (typeof e.totalCount === 'number') totals.push(e.totalCount);
      if (e.moreImage) relations.push(e.moreImage);
      return;
    }

    addNoun(e.L); addNoun(e.R);
    if (e.L && e.R) { if (e.L === e.R) sameObject++; else differentObject++; }
    if (typeof e.nL === 'number' && typeof e.nR === 'number') pairs.push([e.nL, e.nR]);
    if (e.rel) relations.push(e.rel);
  });

  var counts = [];
  pairs.forEach(function (p) { counts.push(p[0], p[1]); });

  var hasRelation = !!(kinds['image-to-image'] || kinds['image-to-number']);
  var hasCross = !!kinds['check-cross'];

  return {
    derivedMode: hasRelation && hasCross ? 'mixed' : hasCross ? 'check-cross'
      : hasRelation ? 'relation' : null,
    comparisonKinds: kinds,
    comparisonCount: exercises.length,
    // relation only — printed on the sheet, safe to quote
    pairs: pairs.map(function (p) { return p[0] + ' / ' + p[1]; }),
    countMin: counts.length ? Math.min.apply(null, counts) : null,
    countMax: counts.length ? Math.max.apply(null, counts) : null,
    sameObjectBothSides: differentObject === 0 && sameObject > 0,
    // one side shows a numeral instead of a group — a real step up in abstraction
    hasNumeralSide: !!kinds['image-to-number'],
    hasPictureBothSides: !!kinds['image-to-image'],
    scatterTotal: totals.length ? Math.max.apply(null, totals) : null,
    depictedNouns: nouns,
    /* The band covers BOTH mechanics' counts, not just the quotable relation ones.
     *
     * Relation counts run 1-6, so "the groups stay within ten" looked safe. Check-cross
     * counts reach 12 — measured, not assumed — which would have made that sentence false on
     * 85 decks. The band is therefore null above ten and the copy omits the claim rather
     * than softening it. Counting only the printable counts would have hidden this, because
     * the ones that break it are the ones that may not be printed. */
    band: (function () {
      var all = counts.concat(crossCounts);
      if (!all.length) return null;
      var m = Math.max.apply(null, all);
      return m <= 10 ? { maxSeen: m, ceiling: 10, impliedLevel: 'kindergarten' } : null;
    }()),
    // ANSWER-BEARING — verifier absence assertion only, never read by the builder.
    answersDoNotPrint: { relations: relations, crossCounts: crossCounts },
  };
}

/* ------------------------------------------------------- code-addition family */

/**
 * Picture-code addition: each picture stands for a number given in a key, and the child adds
 * the pictures in each row.
 *
 * THE MANIFEST HOLDS NO NUMBERS AT ALL — only the image groups. The sums live in the baked
 * `deck.html` as `slots[].slotType === "sum"`, which is the §22.1 precedent for reading the
 * rendered file when the manifest cannot answer the question.
 *
 * And every one of those sums is the ANSWER the child writes. So unlike every other family
 * here, NOTHING numeric may be quoted per problem. What may be said is the BAND the totals
 * stay inside — a band is a property of the sheet, a maximum is one of its answers. That
 * distinction is why `band` carries a ceiling and deliberately does not carry `maxSeen`.
 *
 * The secret-word variant additionally maps each answer to a letter that spells a word; the
 * letters are answers too, and the word length is the only safe fact about them.
 */
function deriveCodeAddition(manifest, deckDir) {
  var exercises = manifest.exercises || [];
  var settings = manifest.settings || {};
  var nouns = [];
  var seen = {};
  var addends = [];

  exercises.forEach(function (row) {
    if (!Array.isArray(row)) return;
    addends.push(row.length);
    row.forEach(function (img) {
      var n = img && (img.name || img.word);
      if (!n) return;
      n = String(n).replace(/\s+\d+$/, '');
      var k = n.toLowerCase();
      if (seen[k]) return;
      seen[k] = true;
      nouns.push(n);
    });
  });

  var sums = [], letters = [];
  try {
    var bundle = require('./teaching-vocab.js')
      .readDeckBundle(fs.readFileSync(path.join(deckDir, 'deck.html'), 'utf8'));
    ((bundle && bundle.slots) || []).forEach(function (s) {
      if (s.slotType === 'sum') sums.push(parseInt(s.expected, 10));
      else if (s.slotType === 'letter') letters.push(s.expected);
    });
  } catch (e) { /* a deck whose sums cannot be read simply gets no band */ }

  var maxSum = sums.length ? Math.max.apply(null, sums.filter(function (n) { return !isNaN(n); })) : 0;
  var ceiling = !maxSum ? null : (maxSum <= 10 ? 10 : maxSum <= 20 ? 20 : maxSum <= 100 ? 100 : null);

  return {
    derivedMode: letters.length ? 'secret-word' : 'plain',
    problemCount: exercises.length,
    symbolCount: parseInt(settings.symbol_count, 10) || null,
    addendsMin: addends.length ? Math.min.apply(null, addends) : null,
    addendsMax: addends.length ? Math.max.apply(null, addends) : null,
    secretWordLength: letters.length || null,
    depictedNouns: nouns,
    // NOTE the absent maxSeen: the largest total IS an answer. Only the band may be printed.
    band: ceiling ? { ceiling: ceiling, impliedLevel: ceiling === 10 ? 'kindergarten'
      : ceiling === 20 ? 'grade-1' : 'grade-2' } : null,
    // ANSWER-BEARING — verifier absence assertion only, never read by the builder.
    answersDoNotPrint: { sums: sums, letters: letters },
  };
}

/* --------------------------------------------------------- printable family */

/**
 * The headless worksheet generator's printable decks — 30 collapsed family keys, ~240
 * worksheet types, 11 locales, and the thinnest pages on the site: 68-78 visible words with
 * no description of their content at all.
 *
 * NOTHING HERE IS AUTHORED. Every sentence already exists, natively, in the generator's own
 * i18n files, and this adapter only resolves the keys:
 *
 *   strings.<locale>.json          worksheet_type -> {title, instruction}
 *                                  the instruction IS "what the child does", in the right
 *                                  register, written when the worksheet was designed
 *   skill-sentences.<locale>.json  exercise_type  -> {full, short}
 *                                  the pedagogical rationale for the whole family
 *
 * Coverage was verified before this was written rather than assumed: 738/738 German printable
 * decks resolve both keys, 0 misses.
 *
 * There is no answer to leak — these decks are `printable_only`, carry no answer key, and most
 * have no `exercises[]` at all. The numbers that do appear are the grade band and the
 * difficulty step, neither of which a child has to work out.
 */
function derivePrintable(manifest, locale, repoRoot) {
  var vocab = require('./teaching-vocab.js');
  var settings = manifest.settings || {};
  var strings = loadGenStrings(repoRoot, 'strings', locale);
  var skills = loadGenStrings(repoRoot, 'skill-sentences', locale);

  var wt = settings.worksheet_type || null;
  var entry = (wt && strings[wt]) || null;
  var skill = skills[manifest.exercise_type] || null;

  /* The nouns are English library keys in every locale (`sheep`, `duck`), exactly as
   * build-deck-vocab.js found for thumbnail alt text, so they are translated here. */
  var nouns = [];
  var seen = {};
  (manifest.vocabulary || []).forEach(function (k) {
    var n = vocab.localizedNoun(String(k), locale);
    if (!n) return;
    var key = n.toLowerCase();
    if (seen[key]) return;
    seen[key] = true;
    nouns.push(n);
  });

  return {
    derivedMode: manifest.exercise_type || null,   // the collapsed family key IS the mode
    worksheetType: wt,
    // Native, already-authored, per worksheet type — the block's distinguishing content.
    typeTitle: entry ? entry.title : null,
    instruction: entry ? entry.instruction : null,
    skillSentence: skill ? skill.full : null,
    gradeBand: settings.grade_band || null,
    difficulty: settings.difficulty || null,
    /* The generator maps difficulty 1/2/3 to an `easy`/null/`hard` exercise_mode, which is
     * already a user-facing slug component (`brueche-leicht-...`). Two decks of the same
     * worksheet type and theme differ ONLY in this, so without it their blocks come out
     * byte-identical — measured at Jaccard 1.000 on the first German run. The localized word
     * is read from the taxonomy rather than re-authored (§10.4 read-from-SoT). */
    difficultyLabel: localizedDifficulty(manifest.exercise_mode, locale),
    ageRange: (manifest.metadata && manifest.metadata.age_range) || manifest.age_range || null,
    depictedNouns: nouns,
    band: null,                                    // no arithmetic band in this family
    answersDoNotPrint: {},                         // nothing to leak: no answer key exists
  };
}

/**
 * `Leicht` / `Schwer` in the deck's own language, from `topics-taxonomy.json`
 * `axes.exercise-mode`, which is where the slug already gets them. Returns null for the
 * default difficulty, which has no mode and needs no label.
 */
var _taxonomy = null;
function localizedDifficulty(mode, locale) {
  if (mode !== 'easy' && mode !== 'hard') return null;
  if (!_taxonomy) {
    var candidates = [
      path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json'),
      '/opt/lessoncraftstudio/frontend/config/topics-taxonomy.json',
    ];
    for (var i = 0; i < candidates.length && !_taxonomy; i++) {
      try { _taxonomy = JSON.parse(fs.readFileSync(candidates[i], 'utf8')); } catch (e) { /* next */ }
    }
    if (!_taxonomy) _taxonomy = {};
  }
  var axis = (_taxonomy.axes && _taxonomy.axes['exercise-mode']) || {};
  var entry = axis[mode];
  return (entry && entry.name && (entry.name[locale] || entry.name.en)) || null;
}

/** Cache the generator's i18n bundles: one read per (file, locale) instead of per deck. */
var _genCache = {};
function loadGenStrings(repoRoot, name, locale) {
  var key = name + '/' + locale;
  if (_genCache[key]) return _genCache[key];
  /* Candidates, not one path: this script is run both from a repo checkout and from a
   * scratch directory on the server, where a __dirname-relative root resolves to `/`. */
  var candidates = [
    repoRoot && path.join(repoRoot, 'scripts', 'worksheet-gen', 'i18n'),
    '/opt/lessoncraftstudio/scripts/worksheet-gen/i18n',
  ].filter(Boolean);
  var out = {};
  for (var i = 0; i < candidates.length; i++) {
    var p = path.join(candidates[i], name + '.' + locale + '.json');
    if (!fs.existsSync(p)) continue;
    try { out = JSON.parse(fs.readFileSync(p, 'utf8')); break; } catch (e) { /* try next */ }
  }
  _genCache[key] = out;
  return out;
}

/* ---------------------------------------------------------------- grade band */

/**
 * Grade from the largest number a child actually SEES — operand or result, whichever is
 * bigger. "Within N" governs both: 18 − 9 is a within-20 sheet even though the answer is 9,
 * and reading only results would launder it into a within-10 sheet (§22.1, strict reading).
 *
 * Bands are the platform's own (§17.8.6 age ranges), expressed as the ceiling the sheet
 * stays inside.
 */
function measureBand(ops) {
  if (!ops.length) return null;
  var maxSeen = 0;
  var minSeen = Infinity;
  for (var i = 0; i < ops.length; i++) {
    var o = ops[i];
    var vals = [o.a, o.b];
    if (o.solution !== null) vals.push(o.solution);
    for (var k = 0; k < vals.length; k++) {
      if (vals[k] > maxSeen) maxSeen = vals[k];
      if (vals[k] < minSeen) minSeen = vals[k];
    }
  }
  var ceiling = maxSeen <= 10 ? 10 : (maxSeen <= 20 ? 20 : (maxSeen <= 100 ? 100 : null));
  return {
    // The number to PRINT. A bucket lies in both directions: calling a max-21 sheet
    // "Zahlenraum bis 100" overstates it as badly as calling it "bis 20" understates it.
    // The measured maximum is exactly true and is what distinguishes one sheet from
    // another — across this pilot it takes 13 distinct values.
    maxSeen: maxSeen,
    minSeen: minSeen === Infinity ? null : minSeen,
    ceiling: ceiling,                       // null = above the K-3 product ceiling
    // Band for REPORTING a tag disagreement only — never for page copy, and never
    // auto-applied (§22.1: surface it, let the operator rule).
    impliedLevel: ceiling === 10 ? 'kindergarten'
      : ceiling === 20 ? 'grade-1'
        : ceiling === 100 ? 'grade-2' : 'above-k3',
  };
}

/**
 * Where each operation sits relative to the ten — the distinction German primary teachers
 * actually plan around, and search for ("ohne Zehnerübergang").
 *
 * THREE cases, not two. The first version of this collapsed the first two and was wrong:
 *
 *   makes ten        1 + 9 = 10, 10 - 4      units land exactly ON ten. This is
 *                                            Zehnerergänzung, the precursor skill — easier
 *                                            than crossing, and taught before it.
 *   crosses ten      7 + 5 = 12, 13 - 8      units go PAST ten. Zehnerübergang proper.
 *   inside the ten   3 + 4, 8 - 2            never touches the boundary.
 *
 * Counting 1 + 9 as "crossing" would have labelled the whole easiest tier as the hardest
 * skill — the exact opposite of the truth, on the pages meant to help a teacher choose.
 */
function measureRegrouping(ops) {
  var adds = 0, subs = 0, makesTen = 0, crossesTen = 0, insideTen = 0;
  for (var i = 0; i < ops.length; i++) {
    var o = ops[i];
    if (o.operator === '+') {
      adds++;
      var units = (o.a % 10) + (o.b % 10);
      if (units === 10) makesTen++;
      else if (units > 10) crossesTen++;
      else insideTen++;
    } else if (o.operator === '-') {
      subs++;
      // landing exactly on a ten (12 - 2 = 10) is the mirror of Zehnerergänzung
      if (o.solution !== null && o.solution % 10 === 0 && o.solution !== 0) makesTen++;
      // SUBTRACTING FROM EXACTLY TEN IS NOT A CROSSING.
      //
      // 10 - 7 starts ON the ten and decomposes it — the precursor skill every practitioner
      // in this project named as the EASIER one (Zerlegung der 10 / splitsingen van 10 /
      // tiervenner). It is not Zehnerübergang. The units test alone called it one, because
      // 10 % 10 = 0 is below any subtrahend's units.
      //
      // 20 - 13 is different and IS a crossing: you break a ten you actually hold.
      //
      // Shipped before this fix: 472 operations across 390 live decks were counted as
      // crossings that are not, so those pages claimed a difficulty the sheet does not have.
      else if (o.a === 10) makesTen++;
      else if ((o.a % 10) < (o.b % 10)) crossesTen++;
      else insideTen++;
    }
  }
  // Zahlzerlegung der 10 — operations whose ANSWER is exactly ten. German Klasse-1
  // teachers drill "Zehnerfreunde" deliberately, so a sheet carrying three of them is a
  // targeted sheet, not a random one, and that is worth stating as a count.
  // Distinct from makesTen above: 17 + 3 = 20 has units summing to ten but is not a
  // decomposition of ten.
  var resultIsTen = 0;
  for (var n = 0; n < ops.length; n++) if (ops[n].solution === 10) resultIsTen++;

  return {
    total: ops.length,
    additions: adds, subtractions: subs,
    makesTen: makesTen, crossesTen: crossesTen, insideTen: insideTen,
    resultIsTen: resultIsTen,
    // Both operations present means the child must also switch operation mid-sheet
    // (Operationswechsel) — a separate difficulty from the arithmetic itself.
    mixesOperations: adds > 0 && subs > 0,
    // "ohne Zehnerübergang" may only be claimed when NOTHING crosses.
    anyCrossing: crossesTen > 0,
  };
}

/* ---------------------------------------------------------------- examples */

/**
 * Two or three operations to quote on the page, chosen to SHOW the range rather than
 * repeat it: the smallest, the largest, and (for mixed sheets) one of the other operator
 * so the reader sees both. Quoting the first three would make every deck of a mode read
 * alike, which is the templating failure this whole exercise exists to avoid.
 */
function pickExamples(ops, mode) {
  if (!ops.length) return [];
  var byMagnitude = ops.slice().sort(function (x, y) {
    return Math.max(x.a, x.b) - Math.max(y.a, y.b);
  });
  var chosen = [byMagnitude[0]];
  var largest = byMagnitude[byMagnitude.length - 1];
  if (largest.text !== chosen[0].text) chosen.push(largest);

  if (mode === 'mixed') {
    var haveOps = {};
    chosen.forEach(function (c) { haveOps[c.operator] = true; });
    for (var i = 0; i < ops.length; i++) {
      if (!haveOps[ops[i].operator]) { chosen.push(ops[i]); break; }
    }
  } else if (chosen.length < 3 && byMagnitude.length > 2) {
    var mid = byMagnitude[Math.floor(byMagnitude.length / 2)];
    if (chosen.every(function (c) { return c.text !== mid.text; })) chosen.push(mid);
  }
  return chosen.slice(0, 3).map(function (c) { return c.text; });
}

/**
 * The ten-case T0..T7 — the pedagogically salient fact, and the primary selector for
 * which sentence shape a deck gets. Boundaries are the German linguist's, keyed on how
 * many of the nine operations cross the ten (c) and how many land exactly on it (m).
 *
 * The honesty rule lives here: a sheet may only be LABELLED a Zehnerergänzung exercise
 * when the skill actually carries it (m >= 4). Below that we may state the observation
 * ("one task fills the ten exactly") but never the purpose.
 */
function tenCase(reg) {
  var c = reg.crossesTen, m = reg.makesTen;
  if (c === 0) {
    if (m === 0) return 'T0';
    if (m === 1) return 'T1';
    if (m <= 3) return 'T2';
    return 'T3';                 // m >= 4: the sheet really is a Zehnerergänzung exercise
  }
  if (c <= 2) return 'T4';
  if (c <= 5) return 'T5';
  if (c <= 8) return 'T6';
  return 'T7';
}

/**
 * An example that actually demonstrates the ten-relationship being described, taken from
 * THIS deck. Quoting a within-the-ten sum next to a claim about crossing the ten would be
 * a small lie of exactly the kind these pages exist to stop telling.
 */
function pickTenExample(ops) {
  var crossing = null, making = null;
  for (var i = 0; i < ops.length; i++) {
    var o = ops[i];
    if (o.operator === '+') {
      var u = (o.a % 10) + (o.b % 10);
      if (u > 10 && !crossing) crossing = o.text;
      if (u === 10 && !making) making = o.text;
    } else if (o.operator === '-') {
      if (o.solution !== null && o.solution % 10 === 0 && o.solution !== 0 && !making) making = o.text;
      // must mirror measureRegrouping exactly: 10 - 7 decomposes the ten, it does not cross it,
      // so it can never be quoted as the crossing example
      else if (o.a === 10) { if (!making) making = o.text; }
      else if ((o.a % 10) < (o.b % 10) && !crossing) crossing = o.text;
    }
  }
  return { crossing: crossing, making: making };
}

/* ---------------------------------------------------------------- mechanic */

/**
 * How the sheet behaves in a child's hands. For math-puzzle the answer placement reveals
 * a picture, which is the pedagogically interesting part: the sheet marks itself, so a
 * wrong answer is visible to the CHILD without a teacher checking it.
 */
function describeMechanic(manifest) {
  var exercises = manifest.exercises || [];
  var first = exercises[0] || {};
  var pieces = (first.scrambledPieces || []).length;
  var rows = first.rows || null;
  var cols = first.cols || null;
  return {
    kind: pieces > 0 ? 'jigsaw-reveal' : 'plain',
    pieces: pieces || null,
    rows: rows, cols: cols,
    // A jigsaw only self-corrects if every cell must be right for the picture to form.
    selfChecking: pieces > 0 && rows && cols && pieces === rows * cols,
  };
}

/* ---------------------------------------------------------------- per deck */

function deriveOne(deckDir) {
  var manifestPath = path.join(deckDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) return null;
  var manifest;
  try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch (e) { return null; }

  var ops = collectOperations(manifest);
  var mode = manifest.exercise_mode || null;
  var band = measureBand(ops);
  var mechanic = describeMechanic(manifest);
  var regrouping = measureRegrouping(ops);

  /* Families whose content is not a list of two-operand sums get their own adapter and
   * return early: forcing them through collectOperations would yield zero operations and
   * the "no data" conclusion this script exists to correct. */
  var special = null;
  /* printable_only is checked FIRST and by the flag, not by a type list: the generator adds
   * worksheet types over time, and a list would silently drop each new one into the
   * math-puzzle path where it would produce nothing. */
  if (manifest.printable_only) special = derivePrintable(manifest, manifest.language || 'en', REPO_ROOT);
  else if (manifest.exercise_type === 'math-worksheet') special = deriveMathWorksheet(manifest);
  else if (manifest.exercise_type === 'more-less') special = deriveMoreLess(manifest, manifest.language || 'en');
  else if (manifest.exercise_type === 'code-addition') special = deriveCodeAddition(manifest, deckDir);

  if (special) {
    special.slug = path.basename(deckDir).replace(/-v\d+$/, '');
    special.language = manifest.language || null;
    special.type = manifest.exercise_type;
    special.mode = mode;                 // the tag, kept only so a disagreement is visible
    special.theme = manifest.theme || null;
    special.taggedLevel = readTaggedLevel(deckDir);
    special.modeDisagreement = modeTagDisagrees(mode, special.derivedMode);
    special.levelDisagreement = (special.band && special.taggedLevel)
      ? !levelMatches(special.band.impliedLevel, special.taggedLevel) : null;
    return special;
  }

  var taggedLevel = readTaggedLevel(deckDir);

  return {
    slug: path.basename(deckDir).replace(/-v\d+$/, ''),
    language: manifest.language || null,
    type: manifest.exercise_type || null,
    mode: mode,
    theme: manifest.theme || null,
    operationCount: ops.length,
    operations: ops.map(function (o) { return { text: o.text, solution: o.solution }; }),
    band: band,
    // The objects pictured on this sheet. Present for addition/subtraction (every operation
    // carries one); empty for math-puzzle, which has no images in its exercises.
    depictedNouns: collectDepictedNouns(ops),
    regrouping: regrouping,
    tenCase: tenCase(regrouping),
    tenExample: pickTenExample(ops),
    examples: pickExamples(ops, mode),
    mechanic: mechanic,
    taggedLevel: taggedLevel,
    // Surfaced, never resolved here (§22.1): the operator decides what a disagreement means.
    levelDisagreement: (band && taggedLevel)
      ? !levelMatches(band.impliedLevel, taggedLevel) : null,
  };
}

/**
 * Does the manifest's mode tag contradict the mode measured from the content?
 *
 * A null tag is not a contradiction — it says nothing. A tag that names a different shape is:
 * `three-symbols-add-sub` on a two-symbol sheet, `image-image` on a check-cross sheet. Only
 * the measured value is ever used for copy; this exists so the scale of the drift is visible
 * rather than silently absorbed.
 */
function modeTagDisagrees(tag, derived) {
  if (!tag || !derived) return null;
  var t = String(tag).toLowerCase();
  if (derived === 'plain' || derived === 'mixed') return null;   // no single tag to compare
  if (derived === 'relation') return t.indexOf('image') !== 0;
  return t.indexOf(derived) !== 0;
}

/** The deck's own claimed level, read from its JSON-LD. For comparison only, never copy. */
function readTaggedLevel(deckDir) {
  try {
    var html = path.join(deckDir, 'deck.html');
    if (!fs.existsSync(html)) return null;
    var head = fs.readFileSync(html, 'utf8').slice(0, 60000);
    var m = head.match(/"educationalLevel"\s*:\s*"([^"]+)"/);
    return m ? m[1] : null;
  } catch (e) { return null; }
}

/** Tolerant comparison between our band keys and the deck's own educationalLevel string. */
function levelMatches(implied, tagged) {
  var t = String(tagged).toLowerCase();
  if (implied === 'kindergarten') return /kinder|vorschul|preschool|k\b/.test(t);
  if (implied === 'grade-1') return /grade\s*1|1\.\s*klasse|klasse\s*1|groep\s*3|first/.test(t);
  if (implied === 'grade-2') return /grade\s*2|2\.\s*klasse|klasse\s*2|groep\s*4|second/.test(t);
  return false;
}

/* ---------------------------------------------------------------- main */

function main() {
  var args = process.argv.slice(2);
  function arg(name, dflt) {
    var hit = args.find(function (a) { return a.indexOf('--' + name + '=') === 0; });
    return hit ? hit.split('=').slice(1).join('=') : dflt;
  }
  var locale = arg('locale', 'de');
  var type = arg('type', 'math-puzzle');
  var limit = parseInt(arg('limit', '0'), 10);
  var outPath = arg('out', '/tmp/teaching-facts-' + locale + '-' + type + '.json');

  var localeDir = path.join(DECKS_ROOT, locale);
  if (!fs.existsSync(localeDir)) {
    console.error('no such locale dir: ' + localeDir); process.exit(2);
  }

  var entries = fs.readdirSync(localeDir).filter(function (n) { return /-v\d+$/.test(n); });
  var results = [];
  var skipped = 0;
  for (var i = 0; i < entries.length; i++) {
    var dir = path.join(localeDir, entries[i]);
    var f = deriveOne(dir);
    if (!f) { skipped++; continue; }
    /* `--type=printable` selects the whole printable_only population in one pass. It spans 30
     * exercise types that share one content source, so deriving them one type at a time would
     * be 30 runs per locale for no gain. */
    if (type === 'printable' ? !f.worksheetType : f.type !== type) continue;
    results.push(f);
    if (limit && results.length >= limit) break;
  }

  fs.writeFileSync(outPath, JSON.stringify(results, null, 1));

  // Summary that says what was MEASURED, so the numbers can be argued with.
  var byMode = {}, byBand = {}, disagree = 0, noOps = 0, crossing = 0, modeWrong = 0;
  results.forEach(function (r) {
    // Families with a derived mode are summarised by the MEASURED mode, since the tag is
    // what the derivation exists to distrust.
    byMode[r.derivedMode || r.mode] = (byMode[r.derivedMode || r.mode] || 0) + 1;
    var b = r.band ? r.band.ceiling : 'none';
    byBand[b] = (byBand[b] || 0) + 1;
    if (r.levelDisagreement) disagree++;
    if (r.modeDisagreement) modeWrong++;
    if (!(r.operationCount || r.equationCount || r.comparisonCount || r.problemCount)) noOps++;
    if (r.regrouping && r.regrouping.anyCrossing) crossing++;
  });
  console.log(locale + ' / ' + type + ': ' + results.length + ' decks');
  console.log('  by mode:            ' + JSON.stringify(byMode));
  console.log('  by measured ceiling:' + JSON.stringify(byBand));
  if (crossing) console.log('  crosses the ten:    ' + crossing + '  (rest stay inside the ten)');
  console.log('  nothing parsable:   ' + noOps);
  console.log('  measured band DISAGREES with the deck tag: ' + disagree);
  if (modeWrong) console.log('  measured mode DISAGREES with the deck tag: ' + modeWrong);
  console.log('  -> ' + outPath);
}

if (require.main === module) main();

module.exports = {
  parseOperation: parseOperation,
  measureBand: measureBand,
  measureRegrouping: measureRegrouping,
  pickExamples: pickExamples,
  describeMechanic: describeMechanic,
  deriveOne: deriveOne,
};
