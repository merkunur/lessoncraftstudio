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

  // The deck's own claimed level, for comparison only.
  var taggedLevel = null;
  try {
    var html = path.join(deckDir, 'deck.html');
    if (fs.existsSync(html)) {
      var head = fs.readFileSync(html, 'utf8').slice(0, 60000);
      var m = head.match(/"educationalLevel"\s*:\s*"([^"]+)"/);
      if (m) taggedLevel = m[1];
    }
  } catch (e) { /* comparison is optional */ }

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
    if (f.type !== type) continue;
    results.push(f);
    if (limit && results.length >= limit) break;
  }

  fs.writeFileSync(outPath, JSON.stringify(results, null, 1));

  // Summary that says what was MEASURED, so the numbers can be argued with.
  var byMode = {}, byBand = {}, disagree = 0, noOps = 0, crossing = 0;
  results.forEach(function (r) {
    byMode[r.mode] = (byMode[r.mode] || 0) + 1;
    var b = r.band ? r.band.ceiling : 'none';
    byBand[b] = (byBand[b] || 0) + 1;
    if (r.levelDisagreement) disagree++;
    if (!r.operationCount) noOps++;
    if (r.regrouping.anyCrossing) crossing++;
  });
  console.log(locale + ' / ' + type + ': ' + results.length + ' decks');
  console.log('  by mode:            ' + JSON.stringify(byMode));
  console.log('  by measured ceiling:' + JSON.stringify(byBand));
  console.log('  crosses the ten:    ' + crossing + '  (rest stay inside the ten)');
  console.log('  no parsable ops:    ' + noOps);
  console.log('  measured band DISAGREES with the deck tag: ' + disagree);
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
