#!/usr/bin/env node
/**
 * Prove no teaching block can misstate its own worksheet.
 *
 * A page that tells a teacher the wrong number range, or claims a skill the sheet does not
 * practise, wastes the prep time of someone who had little to spare — on our promise. That
 * is worse than saying nothing, so every claim is traced back to the deck's own manifest and
 * anything untraceable is a FAILURE, not a warning.
 *
 * Seven assertions per block:
 *   A. OPERATIONS   every `a + b` / `a - b` printed appears in that deck's own operations
 *   B. MAXIMUM      any `bis N` claim matches the measured maximum or its curricular band
 *   C. COUNTS       any `N der neun Aufgaben` matches the measured crossing count
 *   D. CROSSING     `ohne Zehnerübergang` only when nothing crosses; `mit` only when it does
 *   E. ERGAENZUNG   the Zehnerergänzung LABEL only at T3, and never on a subtraction sheet
 *   F. THEME        the theme named is this deck's theme, in `zum Thema X` form only
 *   G. FORBIDDEN    no quotation marks, no Common Core, no age-in-years, no diagnostic claim
 *
 * Usage:
 *   node verify-teaching-block.js --blocks=<blocks.json> --facts=<facts.json> [--poison]
 */
'use strict';

var fs = require('fs');

/** German curricular bands. `im Zahlenraum bis 20` is legitimate for a max of 17. */
function bandFor(max) { return max <= 10 ? 10 : (max <= 20 ? 20 : null); }

function checkOne(slug, block, f, fails) {
  var text = block.text;
  var add = function (kind, msg) { fails.push({ slug: slug, kind: kind, msg: msg }); };

  /* A. every operation printed must be one of this deck's own */
  var own = {};
  (f.operations || []).forEach(function (o) { own[o.text.replace(/\s+/g, '')] = true; });
  /* Operations carry SINGLE SPACES around the operator, exactly as derive-teaching-facts.js
   * normalises them (`a + ' ' + op + ' ' + b`). Matching `\s*` instead let hyphenated RANGE
   * notation through as if it were arithmetic — `talområdet 0-20`, `Lukualue 0-23`,
   * `10-15 minuutin` — and reported 680 false failures across the four Nordic locales at
   * once. The earlier seven wrote their ranges as words (bis 20, up to 20, t/m 20), so the
   * bug was invisible until a locale used a dash. */
  var printed = text.match(/\d+ [+\-] \d+/g) || [];
  printed.forEach(function (p) {
    if (!own[p.replace(/\s+/g, '')]) add('operation', 'prints ' + p + ' which is not on this sheet');
  });

  /* B. any range claim must be the measured max or its band */
  var max = f.band.maxSeen;
  var band = bandFor(max);
  /* Only RANGE claims, not every "bis N".
   *
   * The first version matched any `bis (\d+)` and reported 97 false failures on the sentence
   * `Auf jedem Blatt kommen die Ergebnisse 2 bis 10 je einmal vor.` — a true statement about
   * the ANSWER SET, not a claim about the sheet's ceiling. Anchor on the words that actually
   * introduce a range claim. */
  var claims = text.match(/(?:Zahlenraum bis|Zahlen bis|reichen bis|Summen bis|bis zur) (\d+)/g) || [];
  claims.forEach(function (c) {
    var n = parseInt(c.replace(/\D/g, ''), 10);
    // `Zahlenraum bis <band>` or `Zahlen bis <exact max>` are the only truthful forms
    if (n !== max && n !== band) add('range', 'claims "' + c + '" but the largest number is ' + max);
  });
  // and a `Zahlenraum bis N` must never quote a non-band number (rule 1 of the copy system)
  var zr = text.match(/Zahlenraum bis (\d+)/g) || [];
  zr.forEach(function (c) {
    var n = parseInt(c.replace(/\D/g, ''), 10);
    if ([10, 20, 100, 1000].indexOf(n) === -1) {
      add('zahlenraum', '"' + c + '" — Zahlenraum names a band (10/20/100/1000), not a maximum');
    }
  });

  /* C. counted claims must match the measurement — in EVERY locale.
   *
   * These patterns were German-only, so a Dutch or English block could have miscounted and
   * still passed: the gate would simply never have looked. A locale-shaped assertion that
   * silently does nothing on other locales is worse than no assertion, because it reports
   * PASS. Each locale's counting phrase is listed explicitly; adding a locale means adding
   * its phrase here. */
  var COUNT_PATTERNS = [
    /(\d+) der neun Aufgaben/,          // de
    /(\d+) of (?:9|nine) problems cross/, // en
    /(\d+) van de negen sommen/,        // nl
  ];
  COUNT_PATTERNS.forEach(function (re) {
    var m = text.match(re);
    if (!m) return;
    var n = parseInt(m[1], 10);
    if (n !== f.regrouping.crossesTen) {
      add('count', 'claims ' + n + ' of nine cross the ten; measured ' + f.regrouping.crossesTen);
    }
  });

  /* C2. English and Dutch range claims — only where the phrase predicates THE SHEET.
   *
   * A looser version matched any "within 20" / "t/m 20" and reported 65 false failures. Both
   * came from clauses about the CHILD's prior competence, not the sheet:
   *   en  "...suits children already secure within 20."
   *   nl  "...bij kinderen die de sommen t/m 20 al vlot maken."
   * Those sentences are true and necessary — they are the honest level advice for a deck whose
   * numbers exceed the band. So the assertion has to name the sheet-predicating forms rather
   * than hunt for a number near a preposition. */
  var SHEET_RANGE = [
    /(?:all|stays?|stay) within (\d+)/gi,            // en: "all within 18", "stays within 18"
    /[Nn]umbers (?:to|up to) (\d+)/g,                // en: "Numbers to 18"
    /sommen t\/m (\d+)/g,                            // nl: "sommen t/m 20"
    /blijven t\/m (\d+)/g,                           // nl: "De sommen blijven t/m 20"
    /getallen (?:tot|lopen tot) (\d+)/gi,            // nl: "getallen tot 24"
  ];
  SHEET_RANGE.forEach(function (re) {
    var m;
    var rx = new RegExp(re.source, re.flags.indexOf('g') === -1 ? re.flags + 'g' : re.flags);
    while ((m = rx.exec(text)) !== null) {
      var n = parseInt(m[1], 10);
      // 10 is always legitimate: every deck's answers top out at 10.
      if (n === 10 || n === max || n === band) continue;
      add('range', 'claims "' + m[0] + '" but the largest number is ' + max);
    }
  });

  /* D. the crossing claim must match reality in both directions */
  var c = f.regrouping.crossesTen;
  if (/ohne Zehnerübergang/.test(text) && c > 0 && !/überwiegend ohne/.test(text)) {
    add('crossing', 'claims "ohne Zehnerübergang" but ' + c + ' operations cross the ten');
  }
  if (/Ein Zehnerübergang kommt nicht vor/.test(text) && c > 0) {
    add('crossing', 'states no crossing occurs, but ' + c + ' operations cross');
  }
  if (/durchgehend mit Zehnerübergang/.test(text) && c < (f.regrouping.total || 9)) {
    add('crossing', 'claims every task crosses; only ' + c + ' do');
  }

  /* D3. the crossing count must be justified by the operations THEMSELVES, recomputed here
   * rather than trusted from the facts file.
   *
   * The shipped measure counted `10 - 7` as crossing the ten, because 10 % 10 = 0 is below
   * any subtrahend's units. It is not a crossing — it decomposes the ten, the precursor
   * skill. 472 operations across 390 live decks claimed a difficulty their sheet does not
   * have. Recomputing independently means a future regression in the deriver shows up here
   * instead of shipping. */
  var recount = 0;
  var citedAsCrossing = [];
  (f.operations || []).forEach(function (o) {
    var m = String(o.text).match(/^(\d+) ([+\-]) (\d+)$/);
    if (!m) return;
    var a = parseInt(m[1], 10), op = m[2], b = parseInt(m[3], 10);
    if (op === '+') { if ((a % 10) + (b % 10) > 10) recount++; return; }
    if (o.solution !== null && o.solution % 10 === 0 && o.solution !== 0) return;
    if (a === 10) return;                       // decomposition, not a crossing
    if ((a % 10) < (b % 10)) recount++;
  });
  if (recount !== f.regrouping.crossesTen) {
    add('crossing', 'facts say ' + f.regrouping.crossesTen + ' crossings; the operations give ' + recount);
  }
  // and a 10 - n operation must never be quoted as the crossing example
  var exCross = (f.tenExample || {}).crossing;
  if (exCross && /^10 - /.test(exCross) && text.indexOf(exCross) !== -1) {
    citedAsCrossing.push(exCross);
  }
  if (citedAsCrossing.length) {
    add('crossing', 'cites ' + citedAsCrossing[0] + ' as a crossing; subtracting from ten decomposes it');
  }

  /* D2. a mixed claim requires BOTH operations to be present on the sheet.
   *
   * Added after finding two live-candidate blocks asserting "Addition and subtraction are
   * mixed on the same sheet" about sheets containing nine additions and no subtraction. The
   * manifest said mixed; the operations said otherwise. Labels are not evidence. */
  var mixedClaim = /mixed on the same sheet|Plus und Minus wechseln|Addition and subtraction are mixed/.test(text);
  if (mixedClaim && (!f.regrouping.additions || !f.regrouping.subtractions)) {
    add('mode', 'claims the sheet mixes operations, but it has '
      + f.regrouping.additions + ' additions and ' + f.regrouping.subtractions + ' subtractions');
  }

  /* E. the Zehnerergänzung LABEL is only earned at T3, and is an ADDITION concept */
  if (/Übung zur Zehnerergänzung|üben damit die Zehnerergänzung|Aufgaben zur Zehnerergänzung/.test(text)) {
    if (f.tenCase !== 'T3') {
      add('ergaenzung', 'labels the sheet a Zehnerergänzung exercise at ' + f.tenCase
        + ' (only T3 earns the label; below that state the observation, not the purpose)');
    }
    if (f.mode === 'subtraction') {
      add('ergaenzung', 'Zehnerergänzung used on a subtraction sheet — ergänzen is an addition verb');
    }
  }

  /* F. the theme, if named, is this deck's, and only in the case-safe frame
   *
   * Asserted by PRESENCE, not by extraction. The first version pulled the theme out with
   * /zum Thema ([^.]+)\./ and reported 33 false failures: a period-terminated match reads
   * `zum Thema 4. Juli` as the theme "4", and a sentence-final `... zum Thema Aktivitäten
   * vollständig.` as "Aktivitäten vollständig". The copy was right both times; the measure
   * was wrong. Checking that this deck's own theme name follows the phrase avoids inventing
   * a parser for German theme names. */
  if (/zum Thema /.test(text)) {
    if (!f.themeName) {
      add('theme', 'names a theme but this deck has no resolved theme name');
    } else if (text.indexOf('zum Thema ' + f.themeName) === -1) {
      add('theme', 'the phrase after "zum Thema" is not this deck\'s theme (' + f.themeName + ')');
    }
  }
  if (/Motiv mit [A-ZÄÖÜ]/.test(text)) {
    add('theme', 'uses "mit <Thema>" which needs a dative plural; only "zum Thema X" is case-safe');
  }

  /* G. things the ensemble ruled out entirely */
  /* Quotation marks break the SWC build inside single-quoted strings — but U+2019 is also
   * the correct French apostrophe (`jusqu’à`, `l’addition`), and blanket-banning it reported
   * all 146 French blocks as defective. An apostrophe sits BETWEEN letters; an opening quote
   * never does. So U+2019 is only a violation in quote position. */
  if (/["„“”‘]/.test(text)) add('forbidden', 'contains a quotation mark (breaks the SWC build)');
  if (/(^|[\s(])[’]/.test(text)) add('forbidden', 'U+2019 in opening-quote position (an apostrophe never starts a word)');
  if (/Common Core/i.test(text)) add('forbidden', 'mentions Common Core on a German page');
  if (/\d+\s*[-–]\s*\d+\s*Jahre|für \d+-Jährige/.test(text)) add('forbidden', 'states an age in years; German material is banded by Klasse');
  if (/Lernstandserhebung|Diagnose|Förderbedarf|Lernzielkontrolle/i.test(text)) {
    add('forbidden', 'makes a diagnostic claim — the self-correction destroys the evidence');
  }
  if (/lehrplankonform|lehrplangerecht/i.test(text)) add('forbidden', 'claims Lehrplan alignment without naming a Bundesland');
  if (/selbstkorrigierend/i.test(text)) add('forbidden', 'uses the calque "selbstkorrigierend"; the German term is Selbstkontrolle');
}

function run(blocksPath, factsPath) {
  var blocks = JSON.parse(fs.readFileSync(blocksPath, 'utf8'));
  var facts = JSON.parse(fs.readFileSync(factsPath, 'utf8'));
  var bySlug = {};
  facts.forEach(function (f) { bySlug[f.slug] = f; });

  var fails = [];
  var checked = 0;
  Object.keys(blocks).forEach(function (slug) {
    var f = bySlug[slug];
    if (!f) { fails.push({ slug: slug, kind: 'orphan', msg: 'block with no facts' }); return; }
    f.themeName = blocks[slug].facts.themeName;
    checkOne(slug, blocks[slug], f, fails);
    checked++;
  });

  console.log('checked ' + checked + ' blocks');
  if (!fails.length) { console.log('PASS — every claim traces to its own worksheet.'); return 0; }
  var byKind = {};
  fails.forEach(function (x) { (byKind[x.kind] = byKind[x.kind] || []).push(x); });
  Object.keys(byKind).forEach(function (k) {
    console.log('  ' + k + ': ' + byKind[k].length);
    byKind[k].slice(0, 4).forEach(function (x) { console.log('     ' + x.slug + ' — ' + x.msg); });
  });
  console.log(fails.length + ' FAILURES — do not ship.');
  return fails.length;
}

if (require.main === module) {
  var args = process.argv.slice(2);
  function arg(n, d) { var h = args.find(function (a) { return a.indexOf('--' + n + '=') === 0; }); return h ? h.split('=')[1] : d; }
  var n = run(arg('blocks', '/tmp/teaching-blocks-de.json'), arg('facts', '/tmp/teaching-facts-de-math-puzzle.json'));
  process.exit(n === 0 ? 0 : 1);
}

module.exports = { checkOne: checkOne, run: run };
