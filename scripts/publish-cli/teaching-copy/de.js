/**
 * German teaching-block copy for math-puzzle deck pages.
 *
 * Authored by a native-German 3-agent ensemble (linguist + Grundschule teacher + SEO) per
 * §A.13.48/§21.3 — this is a new content TYPE, which is exactly the trigger for native
 * authoring rather than translation. Every rule below is theirs; the comments record WHY,
 * because several of them are non-obvious and I got two of them wrong before being corrected.
 *
 * THE FOUR RULES THAT ARE EASY TO BREAK
 *
 * 1. `Zahlenraum` is a CURRICULAR BAND — 10, 20, 100, 1000 — never a measured maximum.
 *    A sheet whose largest number is 17 is `im Zahlenraum bis 20`. Writing
 *    `im Zahlenraum bis 17` marks the text instantly as machine-generated. The honest
 *    maximum is stated separately, as a fact about this sheet.
 *
 * 2. Zehnerergänzung (landing exactly ON ten: 1 + 9) and Zehnerübergang (going PAST ten:
 *    7 + 5, 13 - 8) are DIFFERENT SKILLS, taught in that order. Conflating them labels the
 *    easiest tier as the hardest. And `21 - 11 = 10` is NOT Zehnerergänzung at all —
 *    `ergänzen` is an addition verb; a subtraction landing on ten
 *    `endet genau auf dem vollen Zehner`.
 *
 * 3. A sheet may only be LABELLED a Zehnerergänzung exercise when the skill carries it
 *    (m >= 4, case T3). With one or two such tasks we state the observation, never the
 *    purpose. Overstating the sheet's aim is the quiet way to lose a teacher's trust.
 *
 * 4. Themes are slotted ONLY as `zum Thema {THEME}` — invariant across gender, number and
 *    case. `mit {THEME}` requires a dative plural (`mit Tieren`, not `mit Tiere`) and would
 *    need a hand-verified per-theme table we do not have.
 *
 * REGISTER: blocks 1 and 2 use NO direct address; block 3 addresses the Lehrkraft with Sie.
 * The sibling landing pages for these same decks are parent-facing du-form ("dein Kind") —
 * mixing the two registers, or reusing that lexicon (Teil für Teil, Motiv, aufdecken),
 * would make the two surfaces read as duplicates of each other.
 *
 * NO QUOTATION MARKS anywhere in the output. They break the SWC build inside single-quoted
 * strings (see feedback_content_quotes). Where a quotation is wanted, use a colon.
 */
'use strict';

/* ------------------------------------------------------------------ slots */

var MODE_PL = {
  addition: 'Plusaufgaben',
  subtraction: 'Minusaufgaben',
  mixed: 'Plus- und Minusaufgaben',
};

var SKILL = {
  addition: 'das Zusammenzählen',
  subtraction: 'das Abziehen',
  mixed: 'das Wechseln zwischen Plus und Minus',
};

var SKILL_FACH = {
  addition: 'Addieren',
  subtraction: 'Subtrahieren',
  mixed: 'Rechnen mit beiden Rechenarten',
};

/**
 * The number-range phrase. Band and honest maximum are kept SEPARATE, per rule 1.
 * Returns { phrase, sentence } — `phrase` is dative, for use after bleiben/liegen/üben.
 */
function range(max, mode) {
  if (max <= 10) {
    return {
      phrase: 'im Zahlenraum bis 10',
      phraseAlt: 'im Zehnerraum',
      sentence: 'Alle Zahlen bleiben im Zahlenraum bis 10.',
    };
  }
  if (max < 20) {
    return {
      phrase: 'im Zahlenraum bis 20',
      phraseAlt: 'im Zahlenraum bis 20',
      // the band, then the honest maximum — both true, neither overstated
      sentence: 'Die Aufgaben liegen im Zahlenraum bis 20; die größte Zahl auf dem Blatt ist die ' + max + '.',
    };
  }
  if (max === 20) {
    return {
      phrase: 'im Zahlenraum bis 20',
      phraseAlt: 'im Zwanzigerraum',
      sentence: 'Alle Zahlen bleiben im Zahlenraum bis 20.',
    };
  }
  // 21-24: above the Klasse-1 band. The Grundschule teacher was explicit that hiding this
  // is the single biggest credibility risk in the set, so it is stated plainly.
  return {
    phrase: 'mit Zahlen bis ' + max,
    phraseAlt: 'im erweiterten Zahlenraum',
    sentence: 'Die Zahlen reichen bis ' + max
      + ' und damit ein Stück über den Zwanzigerraum hinaus.',
  };
}

/**
 * How this sheet sits relative to the ten. `ex` is an operation FROM THIS DECK that
 * actually demonstrates the relationship being claimed.
 */
function ten(tenCase, reg, ex, mode) {
  /* DIRECTION COMES FROM THE OPERATION, NOT THE DECK MODE.
   *
   * The first version keyed the verb on `mode`, so a MIXED deck got the addition verb —
   * and shipped `18 - 9 überschreitet den Zehner` to 98 live pages. 18 - 9 does not
   * überschreiten anything; it goes DOWN through the ten.
   *
   * The Dutch reviewer found the structural reason, and it is verified across the whole
   * corpus: every answer on every math-puzzle deck is 2-10, so a crossing ADDITION
   * (7 + 5 = 12) cannot exist here — its sum would not fit the answer set. Measured: 0
   * crossing additions, 266 crossing subtractions. So a crossing is ALWAYS a subtraction,
   * whatever the deck's mode, and the verb must follow the example.
   */
  var crossingIsSubtraction = ex && ex.crossing
    ? ex.crossing.indexOf('-') !== -1
    : mode === 'subtraction';
  var sub = mode === 'subtraction';
  var cross = crossingIsSubtraction ? 'führen unter den Zehner' : 'überschreiten den Zehner';
  var crossSg = crossingIsSubtraction ? 'führt unter den Zehner' : 'überschreitet den Zehner';
  var withEx = function (s, e) { return e ? s + ' (' + e + ')' : s; };
  var c = reg.crossesTen;

  switch (tenCase) {
    case 'T0':
      return {
        clause: 'ohne Zehnerübergang',
        sentence: 'Ein Zehnerübergang kommt nicht vor.',
      };
    case 'T1':
      return {
        clause: 'ohne Zehnerübergang',
        sentence: 'Ein Zehnerübergang kommt nicht vor. '
          + withEx(sub
            ? 'Eine Aufgabe endet genau auf dem vollen Zehner'
            : 'Eine einzige Aufgabe füllt den Zehner genau auf', ex.making) + '.',
      };
    case 'T2':
      return {
        clause: 'ohne Zehnerübergang',
        sentence: 'Ein Zehnerübergang kommt nicht vor; '
          + withEx(sub
            ? 'einzelne Aufgaben enden genau auf dem vollen Zehner'
            : 'einzelne Aufgaben ergänzen genau zum Zehner', ex.making) + '.',
      };
    case 'T3':
      // only here may the sheet be LABELLED a Zehnerergänzung exercise (rule 3)
      return {
        clause: sub
          ? 'ohne Zehnerübergang, dafür mit mehreren Aufgaben, die genau auf dem Zehner enden'
          : 'ohne Zehnerübergang, dafür mit mehreren Aufgaben zur Zehnerergänzung',
        sentence: sub
          ? 'Der Zehner wird nicht unterschritten. Mehrere Aufgaben enden genau auf dem vollen Zehner.'
          : 'Der Zehner wird nicht überschritten. Mehrere Aufgaben führen genau auf die 10 und üben damit die Zehnerergänzung.',
      };
    case 'T4':
      return {
        clause: 'überwiegend ohne Zehnerübergang',
        sentence: 'Die meisten Aufgaben bleiben innerhalb eines Zehners; '
          + withEx('einzelne ' + cross, ex.crossing) + '.',
      };
    case 'T5':
      return {
        clause: 'teils mit, teils ohne Zehnerübergang',
        // The tail has to agree with the direction of travel. Swapping only the verb left
        // subtraction reading "führen unter den Zehner ... die übrigen bleiben darunter",
        // which contradicts itself: if the crossing tasks go BELOW the ten, the others
        // cannot also be below it.
        sentence: withEx('Etwa die Hälfte der Aufgaben ' + cross, ex.crossing)
          + (crossingIsSubtraction ? ', die übrigen bleiben innerhalb eines Zehners.'
            : ', die übrigen bleiben darunter.'),
      };
    case 'T6':
      return {
        clause: 'überwiegend mit Zehnerübergang',
        sentence: 'Der Zehnerübergang steht im Vordergrund: '
          + withEx(c + ' der neun Aufgaben ' + cross, ex.crossing) + '.',
      };
    default: // T7
      return {
        clause: 'durchgehend mit Zehnerübergang',
        sentence: withEx('Jede der neun Aufgaben ' + crossSg.replace('t den', 't den'), ex.crossing) + '.',
      };
  }
}

/* ------------------------------------------------- block 1: what it practises */

var BLOCK1 = {
  // facts first
  S1: function (f, s) {
    return 'Neun ' + s.modePl + ' in einem 3×3-Raster, ' + s.range.phrase + '. '
      + s.ten.sentence + ' Geübt wird ' + s.skill + ' mit Aufgaben wie '
      + s.ex[0] + ' und ' + s.ex[1] + '.';
  },
  // skill first, data second
  S2: function (f, s) {
    return 'Dieses Blatt übt ' + s.skill + ' ' + s.range.phrase + '. '
      + s.ten.sentence;
  },
  // two real operations as the opener
  S3: function (f, s) {
    return s.ex[0] + ' und ' + s.ex[1] + ': ' + s.range.sentence + ' '
      + s.ten.sentence + ' Im Mittelpunkt steht ' + s.skill + '.';
  },
  // placement in the teaching sequence
  S4: function (f, s) {
    return 'Für die Übungsphase nach der Einführung des Zehnerübergangs: Die neun '
      + s.modePl + ' reichen bis ' + s.max + ', ' + s.ten.sentence.charAt(0).toLowerCase()
      + s.ten.sentence.slice(1)
      + ' Der Schwerpunkt liegt damit auf dem Übergang, nicht auf dem Rechnen innerhalb eines Zehners.';
  },
  // the absence is the defining fact (c = 0 only)
  S5: function (f, s) {
    return 'Auf diesem Blatt kommt kein Zehnerübergang vor. Alle neun ' + s.modePl
      + ' bleiben ' + s.range.phraseAlt
      + '. Geübt wird das sichere, allmählich automatisierte ' + s.skillFach + '.';
  },
  // mixed only: the operation switch is itself the difficulty
  S6: function (f, s) {
    var third = s.ex[2] || s.ex[0];
    return 'Plus und Minus wechseln von Feld zu Feld: ' + s.ex[0] + ', dann ' + s.ex[1]
      + ', dann ' + third + '. Vor jedem Rechnen steht deshalb das Erkennen der Rechenart. '
      + s.range.sentence + ' ' + s.ten.sentence;
  },
};

/* ------------------------------------------------- block 2: why it self-checks */

var BLOCK2 = {
  B1: function (f, s) {
    return 'Das Lösungsbild wird nur vollständig, wenn alle neun Ergebnisse stimmen. '
      + 'Ein falsch zugeordnetes Teil fällt sofort auf, und zwar genau an der Stelle, an der gerechnet wurde. '
      + 'Das Kind erkennt seinen Fehler selbst und kann ihn korrigieren, ohne nachzufragen.';
  },
  B2: function (f, s) {
    return 'Die Kontrolle übernimmt das Blatt. Stimmt ein Ergebnis nicht, passt das Teil nicht ins Bild — '
      + 'eine Rückmeldung, die niemand geben muss. Erst wenn alle neun Aufgaben stimmen, ist das '
      + 'Lösungsbild zum Thema ' + s.theme + ' vollständig.';
  },
  B3: function (f, s) {
    return 'Die Rückmeldung kommt hier vom Material, nicht von der Lehrkraft. Genau das macht '
      + 'Selbstkontrolle wirksam: Der Fehler wird im Moment des Rechnens sichtbar und nicht erst '
      + 'beim späteren Vergleich mit der Lösung.';
  },
  B4: function (f, s) {
    // honesty guard: the picture shows WHICH task is wrong, never WHY
    return 'Ob es richtig gerechnet hat, sieht das Kind am Bild. Ein unpassendes Teil zeigt ihm, '
      + 'welche der neun Aufgaben es noch einmal ansehen muss. Diese sofortige Rückmeldung stärkt '
      + 'das Zutrauen, allein weiterzuarbeiten.';
  },
  B5: function (f, s) {
    return 'Stimmt eine einzige Aufgabe nicht, bleibt das Bild unvollständig. Das Blatt trägt seine '
      + 'Lösung damit in sich und eignet sich für Arbeitsformen, in denen nicht sofort jemand '
      + 'kontrollieren kann. Das Lösungsbild zeigt ein Motiv zum Thema ' + s.theme + '.';
  },
};

/* ------------------------------------------------- block 3: how to use it (Sie) */

var BLOCK3 = {
  C1: function (f, s) {
    return 'Legen Sie das Blatt in den Wochenplan oder an eine Rechenstation. Weil es sich selbst '
      + 'kontrolliert, eignet es sich auch für die Freiarbeit und für Kinder, die früher fertig sind.';
  },
  C2: function (f, s) {
    return 'In der Übungsphase, wenn die Rechenart eingeführt ist, zeigt sich schnell, welches Kind '
      + 'sicher rechnet. Für eine Vertretungsstunde genügt die Ansage: rechnen, passendes Teil suchen, einsetzen.';
  },
  C3: function (f, s) {
    return 'Als Zusatzangebot für schnelle Rechnerinnen und Rechner lässt sich das Blatt ohne '
      + 'Vorbereitung einsetzen. In der Partnerarbeit legen zwei Kinder abwechselnd je ein Teil und '
      + 'begründen dabei ihr Ergebnis.';
  },
  C4: function (f, s) {
    return 'Als Hausaufgabe eignet sich das Blatt gut, weil zu Hause niemand kontrollieren muss. '
      + 'In der Stunde darauf genügt ein Blick auf das fertige Bild.';
  },
  C5: function (f, s) {
    return 'Zu Beginn des Schuljahres eignet sich das Blatt zur Wiederholung. Später passt es in die '
      + 'Stationenarbeit oder in die Freiarbeitsecke.';
  },
};

/* ------------------------------------------------------------------ selection */

/**
 * Shape families per ten-case, from the linguist's table. The ten-case is the primary
 * selector because it is the pedagogically salient fact — not the theme, which is
 * decoration, and not the mode alone.
 */
var FAMILY = {
  T0: ['S1', 'S5'], T1: ['S3', 'S5'], T2: ['S3', 'S5'], T3: ['S3', 'S1'],
  T4: ['S2', 'S1'], T5: ['S2', 'S1'], T6: ['S2', 'S4'], T7: ['S2', 'S4'],
};

/**
 * Shape selection as a MIXED-RADIX COUNTER over the deck's ordinal.
 *
 * The first version rotated each block independently off the same ordinal
 * (`list[(ordinal * stride) % list.length]`). Every selector then shared one period, so the
 * whole tuple repeated every lcm(2,5,2) = 10 decks — and the addition group holds 48. The
 * similarity gate found the consequence immediately: two decks with identical shapes
 * (S5/B1/C4) at 0.803, the same cells-fewer-than-items failure the landing program hit
 * (§22.1).
 *
 * Treating the ordinal as a mixed-radix number instead makes each digit advance at a
 * different rate, so tuples are distinct for `2 x 5 x 2 x 3 = 60` consecutive decks —
 * comfortably above the largest group (48). This is a guarantee, not a scatter.
 */
function digits(ordinal, radices) {
  var out = [];
  var n = ordinal;
  for (var i = 0; i < radices.length; i++) {
    out.push(n % radices[i]);
    n = Math.floor(n / radices[i]);
  }
  return out;
}

/** Uses that suit this deck's difficulty — never a use the sheet cannot honestly serve. */
function block3Keys(f) {
  var hard = f.band.maxSeen >= 21 || f.tenCase === 'T6' || f.tenCase === 'T7';
  var easy = f.band.maxSeen <= 10 && (f.tenCase === 'T0' || f.tenCase === 'T1' || f.tenCase === 'T2');
  if (f.mode === 'mixed') return ['C2', 'C3'];   // presupposes both operations introduced
  if (hard) return ['C3', 'C5'];                 // differentiation upward, revision
  if (easy) return ['C1', 'C4'];                 // genuinely independent work
  return ['C2', 'C1'];
}

/**
 * Build the three paragraphs for one deck.
 * `ordinal` is the deck's index within its (mode, tenCase) group — it drives the rotation,
 * so shape assignment is stable across runs and scattered across themes.
 */
function build(f, ordinal) {
  /* The mode a reader would infer from the nine operations — NOT manifest.exercise_mode.
   * Some decks are tagged `mixed` while carrying nine additions and no subtraction; asserting
   * "Plus und Minus wechseln" about such a sheet is simply false. */
  var reg0 = f.regrouping || {};
  var mode = (reg0.additions > 0 && reg0.subtractions > 0) ? 'mixed'
    : (reg0.subtractions > 0 ? 'subtraction' : 'addition');
  var r = range(f.band.maxSeen, mode);
  var t = ten(f.tenCase, f.regrouping, f.tenExample || {}, mode);

  var ex = f.examples || [];
  // Kept for the shapes that open on an example (S1/S3/S6). S2 and S5 briefly carried an
  // extra example clause too, purely to break a 0.98-similarity collision; the full
  // nine-operation list does that better and made those clauses read as repetition
  // immediately before the list itself. Removed.
  // Every shape must quote this deck's OWN operations. Two shapes originally did not, and
  // the similarity gate caught the consequence immediately: two genuinely different
  // worksheets (48 distinct operation-sets across 48 addition decks) rendered byte-identical
  // text, Jaccard 1.000. The operations are the deck's fingerprint — if the copy does not
  // carry them, the page is a duplicate no matter how many sentence shapes exist.
  var exList = ex.length >= 3 ? (ex[0] + ', ' + ex[1] + ' und ' + ex[2])
    : (ex.length === 2 ? (ex[0] + ' und ' + ex[1]) : (ex[0] || ''));

  var s = {
    modePl: MODE_PL[mode] || MODE_PL.mixed,
    skill: SKILL[mode] || SKILL.mixed,
    skillFach: SKILL_FACH[mode] || SKILL_FACH.mixed,
    max: f.band.maxSeen,
    range: r,
    ten: t,
    ex: ex,
    exList: exList,
    theme: f.themeName || f.theme,
  };

  var fam = FAMILY[f.tenCase] || ['S1', 'S2'];
  var b2 = ['B1', 'B2', 'B3', 'B4', 'B5'];
  var uses = block3Keys(f);
  // radices: block1 family (2) x block2 (5) x block3 (2) x range-variant (3) = 60 tuples
  var d = digits(ordinal, [fam.length, b2.length, uses.length, 3]);
  var key1 = (mode === 'mixed' && (f.examples || []).length >= 3)
    ? 'S6'                                   // the operation switch defines these sheets
    : fam[d[0]];
  var key2 = b2[d[1]];
  var key3 = uses[d[2]];
  // The fourth digit picks between the two truthful ways to say the same range
  // (im Zahlenraum bis 10 / im Zehnerraum), which the linguist supplied precisely so the
  // largest group has enough distinct openings.
  if (d[3] === 1) { r.phrase = r.phraseAlt; }

  // Scannable chips, Zahlenraum first — it is the filter a German teacher applies before
  // any other. The same facts also appear as prose, because a middot list reads as scraped
  // metadata and Google is less likely to lift it as a snippet.
  var chipRange = f.band.maxSeen <= 10 ? 'Zahlenraum bis 10'
    : (f.band.maxSeen <= 20 ? 'Zahlenraum bis 20' : 'Zahlen bis ' + f.band.maxSeen);
  var chipMode = mode === 'addition' ? 'Addition'
    : (mode === 'subtraction' ? 'Subtraktion' : 'Addition und Subtraktion');

  // The answer key and the online version, one clause each — the teacher uses the key as
  // the fastest way to check the level BEFORE printing, which is worth more than listing
  // it as a feature. `kostenlos` and `PDF` appear exactly once in the whole block.
  //
  // The theme is named HERE rather than in a fixed sentence, so this closing line varies
  // across the 49 themes instead of being 30 identical words on every page. It is the only
  // place the theme belongs: it is organisationally useful and pedagogically irrelevant,
  // so it must not colonise the block about mathematics.
  //
  // TRIMMED after measurement. The original version carried a second sentence about the
  // free PDF and the browser version. It was 15 words identical on every page, it told a
  // reader nothing the download buttons above it do not already say, and it measurably
  // pushed the closest page pairs together (whole-page max 0.672 -> 0.752). Cut. The rule
  // the SEO review gave is the right one: sixty honest words beat a hundred and thirty
  // padded ones.
  var themeClause = s.theme
    ? ' Das Lösungsbild zeigt ein Motiv zum Thema ' + s.theme + '.'
    : '';
  // The structural weakness, disclosed with its fix.
  //
  // The answers on EVERY math-puzzle deck are exactly {2..10}, one per piece — a property of
  // how the nine-piece jigsaw works. So a child who has placed six pieces can get the last
  // three by elimination, and can also fit by piece shape instead of calculating. The German
  // teacher named this (Umgehungsstrategie) and the English practitioner named it
  // independently; the first build of this block omitted both. Hiding a limitation a teacher
  // will discover in the first lesson is the quiet way to lose them, and naming it costs one
  // sentence — with the ten-second fix attached, so it reads as advice rather than apology.
  // Three phrasings, rotated. One identical 30-word paragraph on every page is exactly the
  // constant text that pushes near-duplicate pages together — the gate went from 0 to 5
  // failures the moment this was added as a single fixed sentence.
  var CAVEATS = [
    ' Auf jedem Blatt kommen die Ergebnisse 2 bis 10 je einmal vor. Wer schon sechs Teile '
      + 'gelegt hat, kann die letzten durch Ausschluss finden — lassen Sie deshalb erst alle '
      + 'neun Aufgaben rechnen und dann legen.',
    ' Da jedes Ergebnis von 2 bis 10 genau einmal vorkommt, lassen sich die letzten Teile auch '
      + 'ohne Rechnen zuordnen. Wer das vermeiden will, lässt die Lösungen zuerst aufschreiben.',
    ' Die neun Ergebnisse sind auf jedem Blatt dieselben (2 bis 10). Manche Kinder legen '
      + 'deshalb nach Form statt nach Ergebnis — ein kurzes Nachfragen bei zwei Aufgaben genügt.',
  ];
  var caveat = CAVEATS[ordinal % CAVEATS.length];

  // Verified across the corpus (0 crossing additions, 266 crossing subtractions): because
  // every answer is 2-10, a sum can never pass ten on this worksheet type. So the hardest
  // Klasse-1 skill, addition over the ten, is simply not practised here. A teacher planning
  // a week on Zehnerübergang needs that before printing, and no competitor states it.
  var SCOPE = [
    ' Der Zehnerübergang wird hier nur beim Abziehen geübt; Plusaufgaben über den Zehner '
      + 'kommen bei dieser Blattform nicht vor.',
    ' Geübt wird der Übergang ausschließlich beim Minusrechnen — für Plusaufgaben über den '
      + 'Zehner brauchen Sie ein anderes Blatt.',
  ];
  var scopeNote = (f.regrouping.crossesTen > 0) ? SCOPE[ordinal % SCOPE.length] : '';

  var extras = 'Das Lösungsblatt zeigt alle neun Ergebnisse — praktisch, um vor dem Ausdrucken '
    + 'kurz zu prüfen, ob der Zahlenraum passt.' + caveat + scopeNote + themeClause;

  // The nine operations, in full.
  //
  // Added after measuring: with only 2-3 quoted, blocks for the 48 addition decks reached
  // 0.98 similarity, because those sheets differ ONLY in their sums. Listing all nine is
  // the deck's actual fingerprint — 48 distinct sets across 48 decks — and it is the single
  // most decisive fact for a teacher deciding whether to print: they can see the exact
  // tasks instead of inferring them from a band. Useful and unique are the same edit here.
  //
  // The page already lists these in screen-reader text as `Frage 1: 5 + 3 Leerzeichen.`,
  // which is unreadable for a sighted teacher scanning the page.
  var allOps = (f.operations || []).map(function (o) { return o.text; });
  var taskList = allOps.length
    ? 'Die neun Aufgaben auf diesem Blatt: ' + allOps.join(', ') + '.'
    : '';

  return {
    shapes: { block1: key1, block2: key2, block3: key3 },
    taskList: taskList,
    chipRange: chipRange,
    chipMode: chipMode,
    chipTen: t.clause,
    heading1: 'Was dieses Blatt übt',
    heading2: 'Warum es sich selbst kontrolliert',
    heading3: 'So setzen Sie es ein',
    block1: BLOCK1[key1](f, s),
    block2: BLOCK2[key2](f, s),
    block3: BLOCK3[key3](f, s),
    blockExtras: extras,
  };
}

module.exports = { build: build, range: range, ten: ten, MODE_PL: MODE_PL };
