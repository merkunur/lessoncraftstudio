/**
 * English teaching-block copy for math-puzzle deck pages.
 *
 * Authored from a K-3 / KS1 practitioner ruling (US + UK/international). Structurally a
 * sibling of teaching-copy/de.js, but the CONTENT rules are different — in two places they
 * are the exact opposite, which is why each locale gets its own ensemble rather than a
 * translation:
 *
 *   German                                    English
 *   -------------------------------------     -----------------------------------------
 *   NEVER state an age in years. Material      LEAD with ages. US Grade 1 (6-7) equals UK
 *   is banded by Klasse; "für 6-Jährige"       YEAR 2, and UK Year 1 (5-6) equals US
 *   marks a page as a translated foreign       KINDERGARTEN. A page printing "Grade 1 /
 *   site.                                      Year 1" is wrong for one audience by a full
 *                                              year — and this site's audience is
 *                                              international and bilingual schools.
 *
 *   Zahlenraum is a curricular BAND            Print the TRUE measured maximum. "Numbers to
 *   (10/20/100). A max-17 sheet is "im         20" on a sheet whose max is 12 is a small lie
 *   Zahlenraum bis 20"; "bis 17" marks the     that costs trust. A teacher scanning ten
 *   text as machine-written.                   sheets wants the real ceiling.
 *
 * TERMINOLOGY, and why each was chosen over the obvious alternative:
 *   crossing 10   NOT "regrouping" (US-only, and pedagogically wrong — regrouping belongs to
 *                 column algorithms with place-value exchange; 7+5 done mentally is not
 *                 regrouping), NOT "borrowing/carrying" (dated, disliked in both countries),
 *                 NOT "bridging through ten" (correct UK/NCETM term, reads distinctly
 *                 British to an American).
 *   makes 10      NOT "complement to ten" (mathematician's word, no primary teacher says it).
 *                 "number bonds to 10" is a safe secondary.
 *   problems      NOT "sums". In the UK "sums" means any calculation; in the US a sum is
 *                 strictly an addition result, so "9 subtraction sums" reads as illiterate to
 *                 an American and normal to a Briton.
 *   within 20     NOT "number range" — a translation artefact; no anglophone teacher says it.
 *
 * "Math" appears in the title (US spelling, larger search volume) and is deliberately NOT
 * repeated in the body: one "Math Puzzle" at the top reads as a product name, six "math"s in
 * a paragraph reads as American to a Briton.
 */
'use strict';

/* ------------------------------------------------------------------ slots */

var MODE_NOUN = {
  addition: 'addition problems',
  subtraction: 'subtraction problems',
  mixed: 'mixed addition and subtraction problems',
};

var SKILL = {
  addition: 'adding',
  subtraction: 'taking away',
  mixed: 'switching between adding and subtracting',
};

/**
 * Best-fit level, derived from the arithmetic rather than asserted.
 *
 * The practitioner's construction is deliberately a SUGGESTION with its evidence attached:
 * teachers will overrule it for their own class, and saying so is what makes it credible.
 */
function level(max, crossesTen) {
  if (max <= 10 && crossesTen === 0) {
    return { ages: 'Ages 5-6', us: 'US Kindergarten', uk: 'UK Year 1' };
  }
  if (max <= 20) {
    return { ages: 'Ages 6-7', us: 'US Grade 1', uk: 'UK Year 2' };
  }
  return { ages: 'Ages 7-8', us: 'US Grade 2', uk: 'UK Year 2-3' };
}

/**
 * The sentence that reconciles the catalog tag with the measured content, WITHOUT touching
 * the tag. Every deck in this set is filed as Grade 1; roughly a third are Kindergarten work
 * and roughly a third are Grade 2 work. Showing a level that silently contradicts the tag
 * reads as a bug, so the disagreement is named — and the sheet is given a second legitimate
 * use rather than an apology.
 */
function reconcile(max, crossesTen, variant) {
  var LOW = [
    'Filed under Grade 1, though everything here stays within 10 and nothing crosses it — '
      + 'most teachers will reach for it in Kindergarten or Year 1, or in Grade 1 as review.',
    'The catalog files this as Grade 1. The arithmetic on it is Kindergarten and Year 1 work, '
      + 'which also makes it useful for early-in-year revision higher up.',
    'Filed as Grade 1, but nothing on this sheet crosses 10, so it sits more naturally with '
      + 'younger children or as consolidation.',
  ];
  var HIGH = [
    'Filed under Grade 1, though the numbers here go above 20 — closer to Grade 2 or Year 3. '
      + 'In Grade 1 it suits children already secure within 20.',
    'The catalog says Grade 1; the numbers say otherwise, reaching past 20. Treat it as Grade 2 '
      + 'work, or as a stretch for confident Grade 1 children.',
    'Numbers on this sheet pass 20, which is beyond the Grade 1 tag it carries. Best used in '
      + 'Grade 2, or with children who no longer need to count on.',
  ];
  if (max <= 10 && crossesTen === 0) return LOW[variant % LOW.length];
  if (max > 20) return HIGH[variant % HIGH.length];
  return null;
}

/** "5 of 9 problems cross 10" — the practitioner's single most decision-relevant number. */
function crossingPhrase(c, total) {
  if (c === 0) return 'No problem crosses 10';
  if (c === total) return 'Every problem crosses 10';
  return c + ' of ' + total + ' problems cross 10';
}

/* ------------------------------------------------- block 1: what it practises */

var BLOCK1 = {
  A1: function (f, s) {
    return 'Nine ' + s.modeNoun + ' in a 3x3 grid, all within ' + s.max + '. '
      + s.crossing + '. ' + s.makesTenClause;
  },
  A2: function (f, s) {
    return 'This sheet practises ' + s.skill + ' with numbers up to ' + s.max + '. '
      + s.crossing + ', which is what makes one sheet harder than another at this stage.';
  },
  A3: function (f, s) {
    return s.ex[0] + ' and ' + s.ex[1] + ': every number on this sheet stays within '
      + s.max + '. ' + s.crossing + '. ' + s.makesTenClause;
  },
  A4: function (f, s) {
    return 'For practice after crossing 10 has been taught: the nine ' + s.modeNoun
      + ' reach ' + s.max + ', and ' + s.crossingLower + '. The focus is the crossing, '
      + 'not calculating inside a single ten.';
  },
  A6: function (f, s) {
    return 'Nine problems, none of them crossing 10 — ' + s.ex[0] + ' and ' + s.ex[1]
      + ' are typical. This is consolidation of ' + s.skill + ' rather than new ground.';
  },
  A7: function (f, s) {
    return 'Numbers on this sheet go up to ' + s.max + ', and ' + s.crossingLower
      + '. That combination is what decides whether it fits your class this week.';
  },
  // mixed only — the sign-switch is itself the skill
  A5: function (f, s) {
    return 'Addition and subtraction are mixed on the same sheet, so a child has to read the '
      + 'sign each time: ' + s.ex[0] + ', then ' + s.ex[1] + '. Switching between the two is '
      + 'a separate difficulty from the arithmetic itself.';
  },
};

/* ------------------------------------------------- block 2: self-checking + limits */

var BLOCK2 = {
  // Each shape pairs the real affordance with ONE honest limitation. The practitioner was
  // explicit that naming the weaknesses buys more credibility than hiding them — and each
  // comes with a fix a teacher can apply in ten seconds, which turns a confession into advice.
  B1: function (f, s) {
    return 'A wrong answer breaks the picture, so a child sees the mistake straight away and '
      + 'can fix it without waiting for an adult. It shows where they went wrong, not why. '
      + s.elimination;
  },
  B2: function (f, s) {
    return 'The picture is the check: it only completes when all nine answers are right. '
      + 'That is what makes the sheet work without an adult standing over it. '
      + s.elimination;
  },
  B4: function (f, s) {
    return 'No timer and no score — a child works at their own pace and the picture is the '
      + 'only judge. ' + s.elimination;
  },
  B3: function (f, s) {
    return 'Because the sheet corrects itself, a child can fail privately and try again — '
      + 'which matters for children who are anxious about getting maths wrong. '
      + 'One mistake does leave the picture incomplete, so for children who find that '
      + 'discouraging it works better in pairs, or checked after every three pieces.';
  },
};

/* ------------------------------------------------- block 3: how to use it */

var BLOCK3 = {
  C1: function (f, s) {
    return 'Best suited to a math center or station rotation, where a child needs to finish '
      + 'something without an adult and without anyone marking it. A complete picture is a '
      + 'five-metre glance-check across the room.';
  },
  C2: function (f, s) {
    return 'Nine problems is about five to ten minutes for a secure child, which fits early '
      + 'finishers and morning work. It practises something already taught rather than '
      + 'introducing anything new.';
  },
  C3: function (f, s) {
    return 'Useful as cover or substitute work: the sheet corrects itself and the answer key '
      + 'is included, so an adult who does not know the class can run it.';
  },
  C4: function (f, s) {
    return 'Sent home, it works best after the strategy has been taught in class — a parent '
      + 'can support a method the child already knows, but will confidently teach a different '
      + 'one if they are guessing.';
  },
};

/* ------------------------------------------------------------------ selection */

// Three shapes per band, not two: with 2 x 3 x 2 = 12 tuples against a 58-deck group,
// collisions were guaranteed and the gate found 92 of them.
var FAMILY = { low: ['A1', 'A3', 'A6'], mid: ['A2', 'A1', 'A7'], high: ['A2', 'A4', 'A7'] };

function digits(ordinal, radices) {
  var out = [];
  var n = ordinal;
  for (var i = 0; i < radices.length; i++) { out.push(n % radices[i]); n = Math.floor(n / radices[i]); }
  return out;
}

function build(f, ordinal) {
  var mode = f.mode || 'mixed';
  var max = f.band.maxSeen;
  var reg = f.regrouping;
  var c = reg.crossesTen;
  var total = reg.total || 9;
  var lvl = level(max, c);
  var ops = (f.operations || []).map(function (o) { return o.text; });

  // the mode a reader would infer from the sheet, which is the only one we may assert
  var effectiveMode = (reg.additions > 0 && reg.subtractions > 0) ? 'mixed'
    : (reg.subtractions > 0 ? 'subtraction' : 'addition');
  var crossing = crossingPhrase(c, total);
  var famPeek = FAMILY[(max <= 10 && c === 0) ? 'low' : (max <= 20 ? 'mid' : 'high')];
  var elimIdx = (ordinal % famPeek.length) % 3;
  var s = {
    modeNoun: MODE_NOUN[effectiveMode],
    skill: SKILL[effectiveMode],
    max: max,
    ex: f.examples || [],
    crossing: crossing,
    crossingLower: crossing.charAt(0).toLowerCase() + crossing.slice(1),
    // stated only when there are enough of them to matter, per the German rule about
    // labelling a sheet by a skill that only one task exercises
    makesTenClause: reg.resultIsTen >= 2
      ? reg.resultIsTen + ' problems make exactly 10, so the sheet also revisits number bonds to 10.'
      : '',
    // The structural weakness, disclosed with its fix. Both the German teacher and the
    // English practitioner raised this independently; the first German build omitted it.
    // Trimmed from 40 words to 24 after measuring: identical text on every page is what
    // pushes near-duplicate pages together, and the fix is the load-bearing half.
    // Three phrasings, rotated — one identical sentence on every page is precisely what
    // pushes near-duplicate pages together (measured on the German set: 0 failures became 5
    // the moment this was added as fixed text).
    elimination: [
      'The answers are always 2 to 10, one per piece, so ask children to solve all nine before '
        + 'placing any — otherwise the last few can be found by elimination.',
      'Because each answer from 2 to 10 appears exactly once, a child who has placed six pieces '
        + 'can deduce the rest. Having them write the answers first keeps it arithmetic.',
      'Every sheet uses the same nine answers, 2 to 10. Some children will match by piece shape '
        + 'instead of calculating — asking them to read two facts aloud settles it.',
    ][elimIdx],
  };

  var famKey = (max <= 10 && c === 0) ? 'low' : (max <= 20 ? 'mid' : 'high');
  var fam = FAMILY[famKey];
  var b2 = ['B1', 'B2', 'B3', 'B4'];
  var uses = (max <= 10 && c === 0) ? ['C1', 'C2'] : (max > 20 ? ['C2', 'C3'] : ['C1', 'C3', 'C4']);
  // radices multiply to 3 x 4 x |uses| x 3 = 108-plus, comfortably above the largest
  // per-band group (~58). The last digit varies the tag-reconciliation sentence, which was
  // otherwise one identical paragraph across every deck in a band.
  var d = digits(ordinal, [fam.length, b2.length, uses.length, 3]);

  /* The mixed claim comes from the OPERATIONS, not the manifest's mode.
   *
   * Found by reading two colliding blocks: both were tagged `exercise_mode: mixed` and both
   * contained nine additions and no subtraction — so the page asserted "addition and
   * subtraction are mixed on the same sheet" about a pure addition sheet. Trusting a label
   * over the content is the exact failure this whole pipeline exists to correct.
   */
  var trulyMixed = reg.additions > 0 && reg.subtractions > 0;
  var key1 = (trulyMixed && s.ex.length >= 2) ? 'A5' : fam[d[0]];

  var taskList = ops.length
    ? 'The nine problems on this sheet: ' + ops.join(', ') + '.'
    : '';

  var rec = reconcile(max, c, d[3]);

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: 'Numbers to ' + max,
    chipMode: trulyMixed ? 'Addition and subtraction'
      : (reg.subtractions > 0 ? 'Subtraction' : 'Addition'),
    chipTen: crossing,
    // ages first — the only honest statement for a mixed-system audience
    chipLevel: lvl.ages + ' · ' + lvl.us + ' · ' + lvl.uk,
    taskList: taskList,
    heading1: 'What this sheet practises',
    heading2: 'How it checks itself',
    heading3: 'Using it in class',
    block1: BLOCK1[key1](f, s) + (rec ? ' ' + rec : ''),
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'The answer key lists all nine results, which is the quickest way to check '
      + 'the level before printing.'
      // Verified across the corpus: 0 crossing additions, 266 crossing subtractions. Because
      // every answer is 2-10, a SUM can never pass ten on this worksheet type — so the
      // hardest early skill, addition over ten, is simply not practised here. No competitor
      // states this, and a teacher planning that week needs it before printing.
      + (c > 0 ? ' Note that crossing 10 only comes up in the subtraction here; adding over ten '
        + 'does not appear on this type of sheet.' : '')
      // Do not case-fold a proper noun. Blanket .toLowerCase() turned "4th of July" into
      // "a 4th of july scene" on six live pages. An internal capital (or a leading digit)
      // marks a name that must keep its own casing.
      + (f.themeName ? ' The completed picture shows a '
        + (/\s\p{Lu}|^\d/u.test(f.themeName) ? f.themeName : String(f.themeName).toLowerCase())
        + ' scene.' : ''),
  };
}

module.exports = { build: build, level: level, crossingPhrase: crossingPhrase };
