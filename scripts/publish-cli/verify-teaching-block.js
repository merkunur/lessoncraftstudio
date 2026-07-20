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

  /* Families whose content is not a list of two-operand sums are checked by their own rules
   * and return here. Running the math-puzzle assertions over them would not merely be
   * useless — `f.band.maxSeen` and `f.regrouping` do not exist on those records, so the
   * gate would crash rather than report, which is the worst failure mode a gate has. */
  if (f.worksheetType) return checkPrintable(slug, block, f, add, text);
  if (f.type === 'math-worksheet' || f.type === 'more-less' || f.type === 'code-addition') {
    return checkSpecialFamily(slug, block, f, add, text);
  }

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
  // the ten-crossing assertions below only make sense for families that can cross
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

  /* F2. PICTURE-ARITHMETIC FAMILY — two claims it must never make.
   *
   * These sheets are not jigsaws. They have no reveal picture, so nothing on the paper tells
   * a child they are wrong; there is an answer key and a browser version that checks. And no
   * deck in the family contains a ten-crossing, so any crossing language would be describing
   * a difficulty that is not there — the same overstatement that had to be corrected on 390
   * math-puzzle decks. Both practitioners ruled on this independently. */
  if (f.type === 'addition' || f.type === 'subtraction') {
    if (/selbst (kontrolliert|korrigiert)|kontrolliert sich selbst|self-correct|corrects itself|Lösungsbild|reveal picture/i.test(text)) {
      add('overclaim', 'claims self-correction on a sheet that has no reveal picture');
    }
    if (/Zehnerübergang|tienoverschrijding|passage de la dizaine|pasar de la decena|passaggio della decina|passar do dez|tiotalsövergång|tierovergang|kymmenalitus|crosses 10|crossing 10/i.test(text)) {
      add('overclaim', 'uses ten-crossing language on a family where no deck crosses ten');
    }
    /* Every object named must actually be pictured on THIS sheet — asserted against the
     * list the builder RECORDED, not by scanning prose.
     *
     * The first version matched capitalised words and flagged anything that merely PREFIXED
     * an object name: "Sechs" (the first word of the German sentence) collided with the
     * pictured "Sechseck", and "Flip" with "Flip Flops" — 228 false failures. It was also
     * trying to catch something the generator cannot do, since the copy only ever draws from
     * depictedNouns. Comparing the two lists is exact and cannot be fooled by prose. */
    /* Normalise the trailing filename number on BOTH sides, per §20.5. The image library
     * names the second postman picture in a theme `Cartero 2`, and the copy strips that,
     * because no Spanish teacher would write it. Comparing raw labels against stripped ones
     * reported 41 correct blocks across five locales as naming an object that is not on the
     * sheet — the copy was right and the measure was wrong.
     *
     * The strip also collapses `Dress 4` and `Dress 2` to one `Dress`, which is what a reader
     * wants: the sheet shows two dresses, not two different garments. */
    var strip = function (n) { return String(n).replace(/\s+\d+$/, '').toLowerCase(); };
    var pictured = {};
    (f.depictedNouns || []).forEach(function (n) { pictured[strip(n)] = true; });
    (block.namedObjects || []).forEach(function (n) {
      if (!pictured[strip(n)]) {
        add('objects', 'names ' + n + ' which is not pictured on this sheet');
      } else if (text.indexOf(n) === -1) {
        add('objects', 'records ' + n + ' as named but it does not appear in the text');
      }
    });
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

/**
 * math-worksheet, more-less and code-addition.
 *
 * THE ASSERTION THAT MATTERS HERE IS THE ANSWER LEAK, and it is why these three needed a
 * gate of their own rather than a looser version of the existing one. In this batch the same
 * FIELD changes class between modes: a more-less count is printed beside the pictures in the
 * relation mode and is the answer in check-cross. A rule written per family would have been
 * right half the time. So the deriver marks the answers per deck in `answersDoNotPrint`, and
 * this asserts their absence per deck.
 *
 * The numbers are matched as whole tokens. Substring matching would flag the "10" inside
 * "0-10" and the gate would fail on the very band sentence it exists to permit.
 */
function checkSpecialFamily(slug, block, f, add, text) {
  var ans = f.answersDoNotPrint || {};

  /* Whole-token match. Substring matching would find the "10" inside "0-10" and fail the
   * gate on the very band sentence it exists to allow. */
  var bandCeiling = f.band ? f.band.ceiling : null;

  /* ORDINALS ARE NOT VALUES. Danish, German and Norwegian write the school year as `1. klasse`
   * / `2. trinn`, and the Danish reviewer ties each band to its year — a true and useful
   * sentence. A symbol worth 1 on such a sheet made the leak test fire on 22 correct blocks.
   *
   * The strip is narrow deliberately: a digit, a period, then a LOWER-CASE word. A leaked
   * value at the end of a sentence is followed by a capital or by nothing, so it still
   * trips the assertion. */
  function deordinal(s) { return String(s).replace(/(\d+)\.\s+(\p{Ll})/gu, ' $2'); }

  function leaks(values, what, haystack) {
    haystack = deordinal(haystack);
    var seen = {};
    (values || []).forEach(function (v) {
      if (v === null || v === undefined || v === '' || (typeof v === 'number' && isNaN(v))) return;
      /* An answer that HAPPENS to equal the band is not a leak. A German check-cross deck
       * whose count is 10, on a page saying "Zahlenraum bis 10", and a code-addition deck
       * whose total is 20 under "bis 20", both tripped this. The band sentence says only
       * that nothing exceeds that number — a reader cannot tell which row it belongs to,
       * and the band is printed by design on every deck at that level. Excluding it keeps
       * the assertion pointed at real leaks instead of at a coincidence. */
      if (bandCeiling !== null && Number(v) === bandCeiling) return;
      var s = String(v);
      if (seen[s]) return;
      seen[s] = true;
      var rx = new RegExp('(?:^|[^\\d\\p{L}])' + s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\d\\p{L}])', 'u');
      if (rx.test(haystack)) add('answer-leak', 'prints ' + s + ', which is ' + what + ' on this sheet');
    });
  }

  if (f.type === 'math-worksheet') {
    /* The equations are printed on the sheet and may be quoted; what each picture is WORTH
     * is the answer. A literal inside a quoted equation may legitimately equal a symbol
     * value, so the leak test runs over the prose with the equations removed. */
    var prose = (f.equations || []).reduce(function (acc, eq) {
      return acc.split(eq).join(' ');
    }, text);
    leaks(ans.symbolValues, 'what a picture is worth', prose);

    var own = {};
    (f.equations || []).forEach(function (e) { own[e.replace(/\s+/g, '')] = true; });
    (text.match(/[^,.]+ = \d+/g) || []).forEach(function (q) {
      var t = q.trim();
      if (!own[t.replace(/\s+/g, '')]) add('equation', 'prints "' + t + '" which is not on this sheet');
    });
  }

  if (f.type === 'more-less') {
    // In check-cross the counts ARE the answer; in relation the same field is printed on the
    // sheet and may be quoted. Same field, different class, one mode apart.
    leaks(ans.crossCounts, 'a count the child has to work out', text);
    var ownPairs = {};
    (f.pairs || []).forEach(function (p) { ownPairs[p.replace(/\s+/g, '')] = true; });
    (text.match(/\d+ \/ \d+/g) || []).forEach(function (p) {
      if (!ownPairs[p.replace(/\s+/g, '')]) add('pair', 'prints ' + p + ' which is not on this sheet');
    });
  }

  if (f.type === 'code-addition') {
    // Every total is an answer, and the addends live only in the key baked into the image.
    leaks(ans.sums, 'a total the child has to work out', text);
    /* Nothing above the band may appear either. Numbers BELOW it are left alone because
     * several locales name the year alongside the band — the Danish `som svarer til
     * 1. klasse` is a level reference, not a leaked total, and banning every numeral would
     * have failed a true and useful sentence. Hyphenated ranges (`0-10`) are skipped: both
     * halves belong to the band phrase. */
    var band = f.band ? f.band.ceiling : null;
    if (band) {
      (text.match(/(?<![\d-])\d+(?![\d-])/g) || []).forEach(function (s) {
        var n = Number(s);
        if (n > band) add('numeric', 'prints ' + n + ', above the band (' + band + ') this sheet stays inside');
      });
    }
  }

  /* The mode claim must match the mode MEASURED from the content. The manifest tag is wrong
   * on 303 math-worksheet decks and 100 more-less decks, so a block built from the tag would
   * describe the wrong mechanic — the shape key records what was actually used. */
  var shape = (block.shapes && block.shapes.block1) || '';
  var claimed = shape.split('/')[1];
  if (claimed && f.derivedMode && claimed !== f.derivedMode) {
    add('mode', 'block built for ' + claimed + ' but the content measures as ' + f.derivedMode);
  }

  /* Named objects must be on this sheet (§20.5 duplicate-marker normalisation on both sides). */
  var strip = function (n) { return String(n).replace(/\s+\d+$/, '').toLowerCase(); };
  var pictured = {};
  (f.depictedNouns || []).forEach(function (n) { pictured[strip(n)] = true; });
  (block.namedObjects || []).forEach(function (n) {
    if (!pictured[strip(n)]) add('objects', 'names ' + n + ' which is not pictured on this sheet');
  });
}

/**
 * The printable worksheet-generator decks.
 *
 * Their sentences are not authored downstream — they are resolved from the generator's own
 * i18n files — so the question here is not "is this claim true of the sheet" but "is this
 * THIS sheet's entry". A block carrying another worksheet type's title would be the failure
 * mode, and it is checked by identity rather than by parsing prose.
 */
function checkPrintable(slug, block, f, add, text) {
  if (f.typeTitle && text.indexOf(f.typeTitle) === -1) {
    add('type', 'does not carry its own worksheet title (' + f.typeTitle + ')');
  }
  if (f.instruction && text.indexOf(f.instruction) === -1) {
    add('type', 'does not carry its own instruction');
  }
  if (f.skillSentence && text.indexOf(f.skillSentence) === -1) {
    add('skill', 'does not carry its own family skill sentence');
  }
  /* The block's shape key records which worksheet type it was built for. If that disagrees
   * with the deck, two different sheets are sharing one description. */
  var shape = (block.shapes && block.shapes.block1) || '';
  // shape is `pr/<worksheetType>/<difficultyLabel|->`
  var claimed = shape.indexOf('pr/') === 0 ? shape.split('/')[1] : null;
  if (claimed && f.worksheetType && claimed !== f.worksheetType) {
    add('type', 'built for worksheet type ' + claimed + ' but the deck is ' + f.worksheetType);
  }

  /* NO NUMERAL MAY APPEAR that is not the grade band or the difficulty step.
   *
   * There is nothing to leak today — these decks have no answer key and mostly no exercises —
   * so this is a forward guard rather than a fix: if the generator ever starts putting
   * quantities into the title or instruction, they arrive on the page automatically, and this
   * is what would notice. Hyphenated ranges and ordinals are skipped for the same reasons as
   * the other families. */
  var allowed = {};
  if (f.gradeBand) String(f.gradeBand).replace(/\d+/g, function (n) { allowed[n] = true; return n; });
  if (f.difficulty) allowed[String(f.difficulty)] = true;
  if (f.ageRange) String(f.ageRange).replace(/\d+/g, function (n) { allowed[n] = true; return n; });

  /* The resolved sentences are removed before counting. The generator's own instructions
   * carry numbers as a matter of course — "Kreise 5 Bilder ein", a bar-chart scale — and
   * those are part of the worksheet's identity, not something a child works out. Counting
   * them reported 57 correct German blocks as leaking. What remains after the removal is
   * anything THIS code added, which is what the guard is actually for. */
  var residue = [f.typeTitle, f.instruction, f.skillSentence].filter(Boolean)
    .reduce(function (acc, s) { return acc.split(s).join(' '); }, String(text));
  var deordinaled = residue.replace(/(\d+)\.\s+(\p{Ll})/gu, ' $2');
  (deordinaled.match(/(?<![\d-])\d+(?![\d-])/g) || []).forEach(function (n) {
    if (!allowed[n]) add('numeric', 'prints the number ' + n + ' outside its own title, instruction and skill sentence');
  });

  var strip = function (n) { return String(n).replace(/\s+\d+$/, '').toLowerCase(); };
  var pictured = {};
  (f.depictedNouns || []).forEach(function (n) { pictured[strip(n)] = true; });
  (block.namedObjects || []).forEach(function (n) {
    if (!pictured[strip(n)]) add('objects', 'names ' + n + ' which is not on this sheet');
  });
}

if (require.main === module) {
  var args = process.argv.slice(2);
  function arg(n, d) { var h = args.find(function (a) { return a.indexOf('--' + n + '=') === 0; }); return h ? h.split('=')[1] : d; }
  var n = run(arg('blocks', '/tmp/teaching-blocks-de.json'), arg('facts', '/tmp/teaching-facts-de-math-puzzle.json'));
  process.exit(n === 0 ? 0 : 1);
}

module.exports = { checkOne: checkOne, run: run };
